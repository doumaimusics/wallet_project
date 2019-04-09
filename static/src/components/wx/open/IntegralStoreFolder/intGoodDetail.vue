<template>
	<div class="detail" id="intgoodsDetailInfo">
		<title v-title>商品详情</title>
		<div class="good_title">
			<!-- 轮播部分 -->
			<div class="swipe">
				<mt-swipe :auto="3000" ref="swipe" :showIndicators="true">
				  <mt-swipe-item v-for="item in picPaths">
				  	<a>
						<i v-if="detailData.iconUrl" class="goodsIcon" :style="{'background-image':'url('+detailData.iconUrl+')'}"></i>
				  		<img :src="item" alt="">
				  	</a>
				  </mt-swipe-item>
				</mt-swipe>
				<span class="point">{{swiperIndex}}/{{allNum}}</span>
			</div>
            <!-- 1-有结束时间无秒 2-有开始时间无秒杀  13-距结束有秒杀   0-无时间无秒杀   23-距开始,力度，时间    -->
			<!-- 秒杀部分 -->
			<div class="seckill_box" v-if="detailData.discountStatus != 0">
                   <div class="seckull_left" :style="{background:'url(' + backgroundImg + ') no-repeat center center / 100% 100%'}">
                        <p class="integral_text" :class="{active:detailData.discountStatus == 0 || detailData.discountStatus == 23 || detailData.discountStatus == 13}">
							<span>{{detailData.score | discountCount(detailData.discount,10)}}</span>积分
							<span class="seckill_icon" v-if="detailData.discountType == 1">秒杀</span> 
						</p> 
						<div class="amount_box" v-if="detailData.discountStatus == 23">共{{detailData.discountTotal}}件</div>
						<div class="amount_box" v-else-if="detailData.discountStatus == 13">剩{{detailData.discountRemain}}件</div>
				   </div>
				   <div class="seckull_right">
					   <!-- 倒计时 -->
					   <div class="time_box">
						   <h3 v-if="detailData.discountStatus == 2 || detailData.discountStatus == 23">{{intervalText}}</h3>
						   <h3 v-else-if="detailData.discountStatus == 1 || detailData.discountStatus == 13">{{intervalText}}</h3>
						   <div class="content clear">
							    <div class="day">{{`${times.day}`}}</div>
								<div class="text">天</div>
								<div class="time_text">{{`${times.hr}`}}</div>
								<div class="text">时</div>
								<div class="time_text">{{`${times.min}`}}</div>
								<div class="text">分</div>
								<div class="time_text">{{`${times.sec}`}}</div>
								<div class="text">秒</div>
						   </div>
					   </div>
				   </div>
			</div>
			<!-- 商品说明部分 -->
			<div class="goods_info bdr-t">
				<div class="price clear">
					<div v-if="detailData.goodsClass == '-1'" class="tipBox fl">
					    <div class="tips">包邮</div>
					</div>
					<p class="titleName">{{detailData.goodsName}}</p>
				</div>	
				<p class="score" :class="{cut_style:detailData.discount != 0 && detailData.discountType != 1}">
					<span class="intText">{{detailData.score}}</span>积分
					<span v-if="detailData.goodsClass == '-1'" class="decoration">¥{{detailData.marketPrice}}</span>
					<em class='el-icon-information' v-if="detailData.discountType == 2 && detailData.curVipLevel == -1 && detailData.isVip == 0" style="color:#508CEE;font-size:.346667rem;margin-left: .066667rem;" @click="discountList = true"></em>
					<i class="fr" v-if="loginStatus == 1">可用积分：<span class="overall">{{usableScore}}</span></i>
				</p>


				<!-- detailData.discountType == 2 折扣商品 detailData.curVipLevel != -1 有对应的等级-->
				<p class="score" v-if="detailData.discountType == 2 && detailData.curVipLevel != -1 || !loginStatus && detailData.isVip == 1">
					<span class="intText">{{detailData.score | discountCount(detailData.discount,10)}}</span>积分
					<span v-if="detailData.isVip == 0" class="discount_text">{{detailData.discount}}折</span>
					<span  class="discount_level" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/arrows/v'+ detailData.curVipLevel +'.png) no-repeat center center',backgroundSize: 100+'%'+100+'%'}">V{{detailData.curVipLevel}}</span>
					<i class='el-icon-information' v-if="detailData.isVip == 0" style="color:#508CEE;font-size:.346667rem;margin-left: .066667rem;" @click="discountList = true"></i>
					<i class="fr" v-if="loginStatus == 1">可用积分：<span class="overall">{{usableScore}}</span></i>
				</p>


			</div>
		</div>
		<!-- 收货地址 -->
		<div class="address" v-if="(loginStatus == 0  && detailData.goodsClass== '-1') ||  (addressList.existAddress == 2 && detailData.goodsClass== '-1')" @click="goAddress">
			<div class="address_info"><i></i><span class="span1">收货地址</span><span class="span2">请认真添加有效收货地址！</span></div>
		</div>
		<div class="hasAddress clear" v-else-if="loginStatus==1 && addressList.existAddress==1 && detailData.goodsClass== '-1'">
			<div class="box1"></div>
			<div class="box2" @click="toAddressList">
				<p class="people_name">收货人：{{addressList.userAddressModel.realName}} <span>{{addressList.userAddressModel.mobilePhone}}</span></p>
				<p class="address_contain">{{addressList.userAddressModel.fullAddress}}</p>
			</div>
		</div>
		<!-- 商品详情 -->
		<div class="info" v-if="detailData.content">
			<div class="info_title bdr-b">商品详情</div>
			<div class="main_info" v-html="detailData.content">
			</div>
		</div>

		<div class="img_info" @click="toImgDetail" v-if="detailData.graphic == 1">
			产品图文详情<span>建议在WiFi下查看</span>
		</div>
		<div class="nothing" v-if="detailData.graphic == 2"></div>
		<!-- 兑换按钮 -->
		<div class="change">
			<div class="unchange_btn" v-if=" detailData.isSurplus != 1">已售罄</div>
			<!-- <div class="change_btn" v-else-if="loginStatus==1 && detailData.isSurplus == 1" @click="doChanges">立即兑换</div> -->
			<!-- detailData.isExchange 1可兑换  2不可兑换 -->
			<div class="integral" v-else-if="loginStatus==1 && detailData.isExchange == 2 && !VipStr">
				<div class="icon" @click.stop="openCalculator"></div>
				<div class="integralb_tn" @click.stop="$router.push({path:'/intEarn',query:$route.query})">赚取积分</div>
			</div>
			<!-- 是否会员专享 -->
			<div class="change_btn" :class="[{active:VipStr}]" v-else @click="doChanges">立即兑换</div>
		</div>
		<!-- 兑换成功提示框 -->
		<div v-if="showSuccess" v-layer class="successLayer">
		    <div class="content">
		    	<p class="p1">兑换成功！</p>
		    	<p class="p2">请在我的“兑换记录”查看！</p>
		    </div>
		</div>
		<!-- VIP专享 当前用户等级＞该商品要求等级时 -->
		<address-diallog v-if="VipBig.isShow" :showThis="VipBig" :confirmBtn="VipBigClick" btnText="确定" :text="VipBigText" :textShow="2"></address-diallog>
		<!-- VIP专享 当前用户等级＜该商品要求等级时 -->
		<address-diallog v-if="VipSmall.isShow" :textShow="2" :showThis="VipSmall" :btn="1"  :confirmBtn="VipSmallClick" :btnText="['取消','提升等级']" :text="VipSmallText"></address-diallog>

		<!-- 去添加地址弹框 -->
		<address-diallog v-if="dialog.isShow" :showThis="dialog" :btn="1" :confirmBtn="toAddress" :btnText="cardBtn" :text1="addrTextOne" :text2="addrTextTwo" :textShow="1"></address-diallog>
		<!-- 确认兑换弹框 -->
		<address-diallog v-if="changes.isShow" :textShow="2" :showThis="changes" :btn="1"  :confirmBtn="toChange" :btnText="changeBtn" :text="changeTxt"></address-diallog>
		<!-- 参与积分公益爱心弹框 -->
		<address-diallog v-if="publicBenefit.isShow" :textShow="2" :btn="1" :showThis="publicBenefit" :btnText="benefitBtn" :doOther="goConversion" :confirmBtn="goCharitable" :btnCli="1" :text="benefitText"></address-diallog>
		<!-- 秒杀活动尚未开始弹框 -->
		<address-diallog v-if="publicSeckill.isShow" :showThis="publicSeckill" :btn="1" :confirmBtn="seckillConversion" :textShow="1"   :btnText="seckilBtn" :doOther="waitSeckill"  :btnCli="1"  :text1="scrkilText1" :text2="scrkilText2"></address-diallog>
		<!-- 积分计算器 -->
		<mt-popup
		v-model="calculator"
		position="bottom">
		<!-- :closeOnClickModal="false"> -->
			<div class="calculatorBox">
				<div class="title">
					<div class="name fl">商品计算器
						<!-- <div class="jifen">兑换商品还需<em>{{detailData.discount > 0 && detailData.isExchange == 1 ? Math.round(detailData.score*(detailData.discount/10)) - usableScore : detailData.score-usableScore}}</em>积分</div> -->
						<div class="jifen">兑换商品还需<em>{{difference ? Math.round(detailData.score*(detailData.discount/10)) - usableScore : detailData.score-usableScore}}</em>积分</div>
					</div>
					<div class="del">
						<i @click="calculator = false" class="del el-icon-close"></i>
					</div>
				</div>
				<div class="investList">
					<div class="list" @click="computing(i)" v-for="(item, i) in investList" :class="{active: i == investIndex}">{{item}}<i></i></div>
					<div class="result">出借金额：<em>{{balance}}</em>元</div>
				</div>
			</div>
		</mt-popup>
		<!-- vip商品积分优惠列表 -->
		<div v-if="discountList" v-layer class="discountList">
		    <div class="content" :class="['H'+(list.length)]">
				<div class="title">该商品vip用户可享积分优惠</div>
				<div class="tips">原积分：{{detailData.score}}</div>
		    	<ul>
					<li :class="[{'bdr-b':i != (list.length-1)}]" v-for="(v, i) in list">
						<p class="discount fl">{{v.dis}}折</p>
						<p class="level fl" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/arrows/v'+ v.vip +'.png) no-repeat center center',backgroundSize: 100+'%'+100+'%'}">V{{v.vip}}</p>
						<p class="amount fr"><i>{{detailData.score | discountCount(v.dis,10)}}</i>积分</p>
					</li>
				</ul>
				<div class="btn" @click="discountList = false">确定</div>
		    </div>
		</div>
	</div>
</template>
<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { Popup } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import wxToapp from '../../../../common/wx/wxToapp';
	import addressDiallog from '../../member/invest/wxPublicDialog';
	// import changeDiallog from '../../member/invest/wxPublicDialog';
	export default {
		mixins:[wxToapp],
		data() {
			return{
				VipBig:{     //VIP专享 当前用户等级＞该商品要求等级时
					isShow:false
				},
				VipSmall:{   //VIP专享 当前用户等级＜该商品要求等级时
					isShow:false
				},
				VipBigText:'',
				VipSmallText:'',
				VipStr:false,   // VIP专享不符合要求的用户关闭弹框后按钮置灰
				discountList:false,  // 商品积分优惠列表icon开关
				list:[],
				difference:false,   // 商品是否针对该用户打折
				userVipLevel:0,     // 保存用户的VIP等级

				balance: 0,    // 出借金额差额
				calculator: false,
				investIndex: 0,
				vipLevel:0,     // 用户VIP区间等级 0～1 2～3 4～6三个等级
				investList: ['30天','60天','90天','180天','360天'],
				vipList:[[1, 1.2, 1.5],[2, 2.4, 3],[3, 3.6, 4.5],[6, 7.2, 9],[12, 14.4, 18]],   //  vip系数查询表
				goodsId:null,
				addressId:'',
				loginStatus:0,//登陆判断
				detailData:{},//接口数据
				picPaths:[],//顶部详情轮播图
				usableScore:0,//可用积分
				swiperIndex:1,//轮播当前index
				allNum:1,//总轮播图数量
				addressList:{
					existAddress:'',//1存在 2不存在
					userAddressModel:{},//获取地址
				},
				queryData:{   //接口传值
					addressId:'',
					goodsClass:'',
					goodsId:'',
				},
				dialog:{//去添加地址
					isShow:false
				},
				addrTextOne:'请添加有效收货地址',//去添加地址文案
				addrTextTwo:'为保证商品快速，准确送达至您的手中。',
				cardBtn:['取消','添加地址'],
				linkArm:{ //跳转传数据
					_type:1,
					thisUrl:this.$route.fullPath,
					source:1,//来源页 1 为来源商品详情
					addressId:''
				},
				changes:{//兑换提示弹框
					isShow:false
				},
				changeBtn:['取消','确定'],
				changeTxt:'',
				showSuccess:false,//展示签到成功
				addrQuery:{ //跳转传值
					_type:1,
					thisUrl:this.$route.fullPath
				},
				publicBenefit:{   // 参与积分公益，享优惠弹框
					isShow:false
				},
				benefitBtn:['直接兑换','参与捐献'],
				benefitText:'参与积分公益献爱心，立享八折优惠~',   //// 参与积分公益，享优惠文案

				backgroundImg:'https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/ms_bg1.png',  // 秒杀背景
				publicSeckill:{    // 是否参加秒杀活动弹框
                     isShow:false
				},
				seckilBtn:['等待秒杀','去兑换'], // 是否参加秒杀活动弹框按钮
				scrkilText1:'活动尚未开始',
				scrkilText2:'',
				intervalText:'距开始还剩',
				 //倒计时
				 times:{day:0,hr:0,min:0,sec:0},
				 _interval:null,
			}
		},
		methods:{
			VipBigClick(){   // 关闭VIP专享弹框
				this.VipBig.isShow = false;
				this.VipSmall.isShow = false;
			},
			VipSmallClick(){  // 跳转VIP首页
				this.toApp('VIP',{path:'/wxMyAccount/vipUser'})
			},
			countDown(val){   // 倒计时
				let t = Math.floor(val / 1000);  // 毫秒 => 秒
				let d = Math.floor(t / 86400);   // 天
				let h = Math.floor(t % 86400 / 3600)  // 时
				let m = Math.floor(t % 86400 % 3600 / 60)  // 分
				let s = t % 60;  // 秒
				this.times.day = d;
				this.times.hr = h < 10 ? '0' + h : h;
				this.times.min = m < 10 ? '0' + m : m;				
				this.times.sec = s < 10 ? '0' + s : s;
			},
			
			computing(n){     // 积分计算器
				this.investIndex = n;
				let VipState = this.vipList[n][this.vipLevel]  // vip系数 
				// let usableScore = 1000
				// this.detailData.discount == 0 没有折扣 按照正常积分计算，有折扣按照折扣后积分计算
				// this.balance = this.detailData.discount > 0 && this.detailData.isExchange == 1 ? Math.ceil((Math.round(this.detailData.score*(this.detailData.discount/10)) - this.usableScore)/VipState*100) : Math.ceil((this.detailData.score - this.usableScore)/VipState*100);
				this.balance = this.difference ? Math.ceil((Math.round(this.detailData.score*(this.detailData.discount/10)) - this.usableScore)/VipState*100) : Math.ceil((this.detailData.score - this.usableScore)/VipState*100);

			},
			openCalculator(){     // 打开计算器
				if(this.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else{
					this.calculator = true;
					this.computing(this.investList.length-1)
				}
			},
			//详情数据
			getDeteilData(){
				this.getNotlogData('/goods/details',(data) => {
					if(data.resCode == 1){
						this.loginStatus = data.resData.loginStatus;
						this.detailData = data.resData.scoreGoosModel;
						this.picPaths = data.resData.scoreGoosModel.picPaths;
						this.list = data.resData.scoreGoosModel.disList;
						data.resData.vipLevel ? this.userVipLevel = data.resData.vipLevel : '';
						if(data.resData.scoreGoosModel.picPaths){
							this.allNum = data.resData.scoreGoosModel.picPaths.length;
						}
						if(this.detailData.discountStatus == 2 || this.detailData.discountStatus == 23) {
							this.backgroundImg = 'https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/ms_bg2.png';
							this.intervalText='距开始还剩';
						} else {
							this.backgroundImg = 'https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/ms_bg1.png';
							this.intervalText='距结束还剩';
						}

						let level = data.resData.vipLevel;
						let curVipLevel = data.resData.scoreGoosModel.curVipLevel
						this.usableScore = data.resData.userUseScore;
						if(level < 2){
							this.vipLevel = 0
						} else if(level > 1 && level <4){
							this.vipLevel = 1
						} else if(level > 3){
							this.vipLevel = 2
						};  // vipLevel
						if(data.resData.scoreGoosModel.isVip == 1 && this.loginStatus == 1){
							if(level > curVipLevel){
								this.VipBig.isShow = true;
								this.VipBigText ='该商品仅限V'+ curVipLevel +'用户兑换！';
								this.VipStr = true;
							} else if(level < curVipLevel){
								this.VipSmall.isShow = true;
								this.VipSmallText = '您当前V'+ level +'等级，该商品仅限V'+ curVipLevel +'用户兑换！';
								this.VipStr = true;
							}
						};
						// 是打折商品 && （（不是专享商品 && 对应VIP等级不等于-1）||（是专享商品 && 对应VIP等级==用户VIP等级））
						if ( this.detailData.discount > 0 && ((!this.detailData.isVip && curVipLevel != -1) || (this.detailData.isVip && curVipLevel == level ))) {
							this.difference =true;
						}else{  // 不打折
							this.difference =false;
						}
					}
				},{goodsId:this.goodsId},1)
			},

			//地址接口
			getAddressData(){
				this.getNotlogData('/address/address',(data) => {
					if(data.resCode == 1){
						this.addressList = data.resData;
						this.addressList.userAddressModel = data.resData.userAddressModel;
						this.linkArm.addressId = data.resData.userAddressModel.addressId;
						this.delCookie('addressId')
					}
				},{addressId:this.getCookie('addressId') ? this.getCookie('addressId'):''},1)
			},

			//图文详情
			toImgDetail(){
				this.toWxUrl('/intImgDetail','goodsId',this.goodsId)
			},

			//去添加地址
			toAddress(){
				this.appRouter('/intAddress',this.addrQuery)
			},

			//去收货地址
			goAddress(){
				if(this.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else{
					this.toWxUrl('/intAddress','_type',1,'thisUrl',this.$route.fullPath)
				}
			},

			//去地址列表
			toAddressList(){

				if(this.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else{
					this.appRouter('/intAddressList',this.linkArm)
				}
			},

			//进行兑换
			toChange(){
				this.changes.isShow = false;
				this.queryData.goodsClass = this.detailData.goodsClass;
				if(this.addressList.userAddressModel.addressId){
					this.queryData.addressId = this.addressList.userAddressModel.addressId;
				}
				
				this.queryData.goodsId = this.goodsId;
				//兑换商品接口
				this.getAppData('/goods/exchangeShop',(data) =>{
					if(data.resCode){
						if(this.osType){
						    this.PassValue('signIn');
						}
						this.getDeteilData();
						// this.usableScore = this.usableScore - this.detailData.score;
						// if((this.usableScore - this.detailData.score)-this.detailData.score >=0 ){
						// 	this.detailData.isExchange = 1;
						// }else{
						// 	this.detailData.isExchange = 2;
						// }
						//兑换成功提示
						this.showSuccess = true;
						setTimeout(() =>{
						    this.showSuccess = false;
						},2000)
					}
				},this.queryData)
			},

			//点击兑换按钮
			doChanges(){
				if(this.VipStr){
					if(this.detailData.isVip == 1 && this.loginStatus == 1){
						if(this.userVipLevel > this.detailData.curVipLevel){
							this.VipBig.isShow = true;
							this.VipBigText ='该商品仅限V'+ this.detailData.curVipLevel +'用户兑换！';
						} else if(this.userVipLevel < this.detailData.curVipLevel){
							this.VipSmall.isShow = true;
							this.VipSmallText = '您当前V'+ this.userVipLevel +'等级，该商品仅限V'+ this.detailData.curVipLevel +'用户兑换！';
						}
					};
					return;
				}
				if(this.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else{
					if(this.detailData.discountStatus == 2 || this.detailData.discountStatus == 23){  //当未开始的时候提示活动为开始
						this.publicSeckill.isShow = true; 
						this.scrkilText2 = '您确定使用'+ this.detailData.score +'积分兑换该商品';     
					} else {
						if(this.detailData.limitTimes){
							Toast({message:'每人仅限兑换'+this.detailData.limitTimes+'件!',duration:2000})
						} else {
							if(this.detailData.ifPopup == true){      // true 弹出参与公益弹窗
								this.publicBenefit.isShow = true;
							} else if(this.detailData.ifPopup == false){  // false 不弹参与公益弹窗
								if(this.detailData.goodsClass== '-1'){   // goodsClass 是否是实物商品
									if(this.addressList.existAddress==2){   //  existAddress 1有地址  2无地址
										this.dialog.isShow = true;
										return
									}else if(this.addressList.existAddress==1){
										this.changes.isShow = true;
										let text = this.detailData.discount == 0 ? this.detailData.score : Math.round(this.detailData.score * (this.detailData.discount / 10));
										this.changeTxt = '确定使用 '+text+' 积分兑换？'
									}
								}else{
									this.changes.isShow = true;
									let text =this.detailData.discount == 0 ? this.detailData.score : Math.round(this.detailData.score * (this.detailData.discount / 10));
									this.changeTxt = '确定使用 '+text+' 积分兑换？'
								}
							}
						}
					}
				}
			},

			goCharitable(){    // 跳转积分公益
                this.$router.push({
					path:'/charitable',
					query:this.$route.query
				})
			},

			goConversion(){   // 点击直接兑换
			   this.publicBenefit.isShow = false;
			   this.changes.isShow = true;
			   let text = this.detailData.discount == 0 ? this.detailData.score : Math.round(this.detailData.score * (this.detailData.discount / 10));
			   this.changeTxt = '确定使用 '+text+' 积分兑换？';
			},
			
			waitSeckill(){    // 点击等待秒杀
                this.publicSeckill.isShow = false;
			},

			seckillConversion(){   // 秒杀弹框去兑换
				this.publicSeckill.isShow = false;
				this.toChange()
			},
			

			// //轮播条数切换
			// handleChange(index) {
			// 	if(this.swiperIndex == this.allNum){
			// 		this.swiperIndex = 0
			// 	}
			//     this.swiperIndex = this.swiperIndex + 1
			// }
		},
		beforeUpdate () {
		 this.swiperIndex = this.$refs.swipe.index+1
		},
		mounted(){
			// this.handleChange();

			//给app传值标题名
			this.PassValue('NavWhite_商品详情');
			this._interval = setInterval(() => {   // 倒计时
               if(this.detailData.discountStatus == 2 || this.detailData.discountStatus == 23){
					if(this.detailData.distanceTime<1000){
						this.intervalText='距结束还剩';
						this.getDeteilData();
					}
			   } else {
				   if(this.detailData.distanceTime<1000){
						this.detailData.discountStatus = 0;
						clearInterval(this._interval);
						this.getDeteilData();
					}
			   }
				this.countDown(this.detailData.distanceTime);
				this.detailData.distanceTime -= 1000;
            }, 1000);
		},
		destroyed() {
			clearInterval(this._interval);
		},
		components:{
			swiper,
			swiperSlide,
			addressDiallog,
			// changeDiallog
		},
		created(){
			this.goodsId = this.$route.query.goodsId;
			// if(this.$route.query.addressId){
			// 	this.addressId = this.$route.query.addressId;
			// 	this.setCookie('addressId',this.addressId)
			// }
			this.getDeteilData();
			this.getAddressData();
		},
		
	}	
</script>
<style lang="scss" scoped>
	.detail{
		font-family: PingFangSC-Regular;
		padding-bottom: 0.266667rem;
		.successLayer{
		    background:rgba(0,0,0,0)!important;
		    .content{
		        height:2.1rem;
		        width:7.333333rem;
		        margin:6.666667rem auto 0;
		        background:rgba(0,0,0,.8);
		        text-align:center;
		        color:#fff;
		        border-radius: 0.266667rem;
		        padding: 0.4rem 0;
		        font-family: PingFangSC-Medium;
	            .p1{
	            	font-size: 0.453333rem;
	            	color: #FFFFFF;
	            	margin-bottom: 0.2rem;
	            }
	            .p2{
					font-size: 0.346667rem;
					color: #FFFFFF;
	            }
		    }
		}
		.discountList{
			.content{
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				margin: auto;
				height: 10.4rem;
		        width: 7.493333rem;
		        background :#fff;
		        text-align: center;
		        border-radius: 0.266667rem;
		        padding: .666667rem .4rem .533333rem;
		        font-family: PingFangSC-Regular;
				.title{
					font-size: .4rem;
					color: #333333;
					line-height: .533333rem;
					margin-bottom: .213333rem;
					font-family: PingFangSC-Medium;
				}
				.tips{
					font-size: .346667rem;
					color: #808080;
					line-height: .493333rem;
					margin-bottom: .266667rem;
				}
				.btn{
					width: 6.653333rem;
					height: .96rem;
					background: #F14B4B;
					border-radius: .48rem;
					font-size: .426667rem;
					color: #FFFFFF;
					line-height: .96rem;
					margin-top: .4rem;
				}
				ul{
					overflow: hidden;
					li{
						position: relative;
						height: .906667rem;
						width: 100%;
						padding: 0 .533333rem;
						.discount{
							background: #FF5B4C;
							border-radius: .026667rem;
							// width: .706667rem;
							padding: 0 .106667rem;
							height: .346667rem;
							font-size: .32rem;
							color: #FFFFFF;
							line-height: .346667rem;
							margin-right: .266667rem;
							margin-top: .28rem;
						}
						.level{
							background: #FF5B4C;
							font-family: DIN-Medium;
							font-size: .32rem;
							color: #FFFFFF;
							width: .706667rem;
							height: .346667rem;
							line-height: .346667rem;
							margin-top: .28rem;
							border-radius: .026667rem;
						}
						.amount{
							line-height: .826667rem;
							text-align: right;
							font-size: .32rem;
							color: #808080;
							i{
								font-family: DIN-Medium;
								font-size: .48rem;
								color: #FF5B4C;
								vertical-align: bottom;
							}
						}
					}
				}
	            .p1{
	            	font-size: 0.453333rem;
	            	color: #FFFFFF;
	            	margin-bottom: 0.2rem;
	            }
	            .p2{
					font-size: 0.346667rem;
					color: #FFFFFF;
	            }
		    }
			.content.H6{
		        height: 9.493333rem;
			}
			.content.H5{
				height: 8.586667rem;
			}
			.content.H4{
				height: 7.68rem;
			}
			.content.H3{
				height: 6.773333rem;
			}
			.content.H2{
				height: 5.866667rem;
			}
		}
		.mint-swipe-indicators{
			display: none;
		}
		.pp1{
			text-align: center !important;
		}
		.pp2{
			text-align: center !important;
		}
		.swipe{
			height: 10.0rem;
			position: relative;
			clear: both;
			width: 100%;
			background: #f8f8f8;
			a{
				display: block;
				width: 100%;
			    height: 100%;
				img{
					width: 100%;
					height: 100%;
				}
				.goodsIcon {
					position: absolute;
					right: 0;
					top: 0;
					display: inline-block;
					width: 2.333333rem;
					height: 2.333333rem;
					background-size: 2.333333rem 2.333333rem;
				}
			}
		}
		.price{
			
			.tipBox{
			    height:0.64rem;
			    width:0.8533rem;
			    overflow: hidden;
			    display:inline-block;
				margin-left:0.213333rem;
				margin-right: .2rem;
			}
			.tips{
			    position: relative;
			    top:-0.08rem;
			    left:-0.4265rem;
			    display:inline-block;
			    height:0.8rem;
			    width: 1.706667rem;
			    padding:0 0.2rem;
			    background: rgba(255,170,50,0.20);
			    border-radius: 0.053333rem;
			    line-height: 0.72rem;
			    font-size:0.586667rem;
			    color: #FFAA32;
			    border:1px solid #FFAA32;
			    transform: scale(0.5);
				-webkit-transform: scale(0.5);
			}
			i{
				border: 1px solid #ccc;
			}
		}
		.score{
			position: relative;
			span{
				color: red;
			}
			span.overall{
				font-family: PingFangSC-Regular;
				font-size: .32rem;
				color: #000000;
			}
			.decoration{
				font-size: .32rem;
				color: #808080;
				text-decoration:line-through;
				margin-left: .266667rem;
			}
			.discount_text{
				// width: .706667rem;
				border-radius:.026667rem;
				height: .346667rem;
				line-height: .346667rem;
				background: #FF5B4C;
				font-family:PingFangSC-Medium;
				font-size: .32rem;
				color: #fff;
				text-align: center;
				padding: 0rem .106667rem;
				display: inline-block;
			}
			.discount_level{
				font-size:.32rem;
				font-family:DIN-Medium;
				color: #fff;
				text-align: center;
				line-height: .346667rem;
				border-radius:.026667rem;
				width: .706667rem;
				height: .346667rem;
				display: inline-block;
				margin-left: .066667rem;
			}
		}
		
		.address{
			background: #ffffff;
			padding: 0 0.4rem;
			margin-bottom:0.266667rem;
			.address_info{
				width: 100%;
				height: 1.44rem;
				background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/next3.png) right center no-repeat;
				background-size: 0.386667rem 0.386667rem;
				i{
					display: inline-block;
					width: 0.666667rem;
					height: 0.666667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/dizhi.png) no-repeat;
					background-size: 0.666667rem 0.666667rem;
					position: relative;
				    top: .35rem;
				}
				.span1{
					font-size: 0.373333rem;
					color: #333333;
					display: inline-block;
					margin-left: 0.4rem;
					position: relative;
					top: .2rem;

				}
				.span2{
					font-size: 0.346667rem;
					color: #808080;
					float: right;
					position: relative;
				    top: 0.48rem;
				    right: .3rem;
				}
				
			}
		}
		.hasAddress{
			background: #ffffff;
			padding: 0.333333rem 0;
			margin-bottom:0.266667rem;
			.box1{
				width: 1.2rem;
			    min-height: 1rem;
			    margin-left: .4rem;
			    background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/dizhi.png) 0 .3rem no-repeat;
			    background-size: 0.666667rem 0.666667rem;
			    float: left;
			}
			.box2{
				width: 8.0rem;
				float: left;
				.people_name{
					font-size: 0.373333rem;
					color: #333333;
					margin-bottom: 0.173333rem;
					span{
						font-size: 0.373333rem;
						color: #808080;
					    float: right;
					}
				}
				.address_contain{
					font-size: 0.32rem;
					color: #808080;
					text-align: justify;
					line-height: .55rem;
				}
			}
		}
		.info{
			background: #ffffff;
			margin-bottom: 0.266667rem;
			.info_title{
				height: 1.2rem;
				border-left: 0.106667rem solid #FF5B4C;
				line-height: 1.2rem;
				font-size: 0.4rem;
				color: #333333;
				padding-left: 0.4rem;
				position: relative;
			}
		}
		.img_info{
			background: #ffffff;
			width: 100%;
			height: 1.44rem;
			font-size: 0.373333rem;
			color: #333333;
			background: #fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9.2rem center no-repeat;
			background-size: 0.213333rem 0.4rem;
			position: relative;
			
			line-height: 1.44rem;
			padding: 0 0.4rem 0 0.506667rem;
			margin-bottom: 1.733333rem;
			span{
				display: inline-block;
				font-size: 0.346667rem;
				color: #808080;
				float: right;
				margin-right: 0.826667rem;
			}
		}
		.nothing{
			height: 1.45rem;
			width: 100%;
			clear: both;
		}
		.change{
			width: 100%;
			height: 1.6rem;
			position: fixed;
			background: #ffffff;
			text-align: center;
			line-height: 1.333333rem;
			left: 0;
		    bottom: 0;
		    z-index: 99;
		    box-shadow: 0 0 0.16rem 0 rgba(0,0,0,0.12);
		    font-size: .426667rem;
		    padding-top: 0.266667rem;
		    div{
		    	width: 8.933333rem;
		    	height: 1.066667rem;
		    	color: #FFFFFF;
		    	line-height: 1.066667rem;
		    	text-align: center;
		    	margin: 0 auto;
		    }
		    .unchange_btn{
		    	background-image: linear-gradient(-45deg, #FFD1CC 0%, #FFCECC 100%);
		    	border-radius: 0.106667rem;
		    	
		    }
		    .change_btn{
				border-radius: 0.106667rem;
				background: #F14B4B;
				border-radius: 0.533333rem;
			}
			.change_btn.active{
				background: #F9D8D8;
			}
			.integral{
				width: 9.2rem;
				margin: 0 auto;
				display: flex;
				justify-content: space-between;
				.icon{
					width: 1.066667rem;
					height: 1.066667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/jisuanqi.png);
					background-size: 100%;
				}
				.integralb_tn{
					width: 7.733333rem;
					height: 1.066667rem;
					background: #f14b4b;
					border-radius: .533333rem;
				}
			}
		}
		.point{
			font-family: PingFangSC-Regular;
			position: absolute;
		    top:9.066667rem;
		    right: 0.533333rem;
		    background: #FFFFFF;
		    border: 1px solid #808080;
		    padding: 0 .1rem;
		    font-size: 0.32rem;
		}
		.good_title{
			background: #ffffff;
			.goods_info{
				padding:.4rem .4rem .333333rem;
				margin-bottom: 0.266667rem;
				position: relative;
				.score{
					font-size: 0.32rem;
					color: #808080;
					margin-bottom: .2rem;
					.intText{
						font-family: DIN-Medium;
						font-size: .64rem;
						color: #FF5B4C;
						margin-right: 0.04rem;
					}

					i{
						margin-top: .28rem;
					}
				}
				.cut_style{
					.intText{
						font-size: .4rem;
						color: #808080;
						font-family: DIN-Regular;
					}
					i{
						display: none;
					}
				}
				.price{
					font-size: 0.346667rem;
					color: #808080;
					margin-bottom: .16rem;
					i{
						display: inline-block;
						background: rgba(255,170,50,0.20);
						border: 1px solid #FFAA32;
						border-radius: 2px;
						font-size: 0.293333rem;
						color: #FFAA32;
						padding: 0 0.133333rem;
						margin-left: 0.2rem;
					}
				}
				.titleName{
					font-family: PingFangSC-Medium;
					font-size: .453333rem;
					color: #333333;
					line-height: .64rem;
					margin-bottom: .413333rem;
				}
			}
			.seckill_box{   // 秒杀部分样式
                width: 100%;
				height: 1.2rem;
				background: #999;
				.seckull_left{
					width: 5.786667rem;
					height: 100%;
					float: left;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/ms_bg1.png) no-repeat;
					background-size: 100% 100%;
					padding-left: .4rem;
					
					.integral_text{
						font-family: PingFangSC-Regular;
						font-size: .32rem;
						color: #FFFFFF;
						line-height: .346667rem;
						margin-top: .4rem;
						span{
							font-size: .64rem;
							font-family: DIN-Medium;
							color: #FFFFFF;
							margin-right: .066667rem;
							margin-top: .133333rem;
						}
						.seckill_icon{
							padding: 0 .08rem;
							height: .346667rem;
							background: #fff;
							border-radius: .026667rem;
							font-family: PingFangSC-Medium;
							font-size: .266667rem;
							color: #FF4B42;
							line-height: .346667rem;
							margin-left: .133333rem;
						}
					}
					.integral_text.active{
						margin-top: .2rem;
					}
					.amount_box{
						font-family: PingFangSC-Regular;
						font-size: .266667rem;
						color: #fff;
					}
				}
				.seckull_right{
                    width: 4.213333rem;
					height: 100%;
					float: right;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/ms_bg3.png) no-repeat;
					background-size: 100% 100%;
					// 倒计时样式
					.time_box{
						position: relative;
						overflow: hidden;
						h3{
							font-family: PingFangSC-Medium;
							font-size: .266667rem;
							color: #FE4743;
							text-align: center;
							margin: .08rem auto .053333rem;
						}
						.content{
							text-align: center;
							font-family: PingFangSC-Medium;
							font-size: .266667rem;
							color: #F9474F;
							line-height: .373333rem;
							overflow: hidden;
							padding-left: .3rem;
							div{
								float: left;
							}
							.day{
								font-family: DIN-Bold;
								font-size: .453333rem;
								line-height: .55rem;
							}
							.text{
								line-height: .6rem;
								font-family: PingFangSC-Medium;
								font-size: .266667rem;
								color: #F9474F;
								letter-spacing: 0;
								margin:0 .106667rem;
							}
							.text:last-child{
								margin-right: 0;
							}
							.time_text{
								width: .453333rem;
								height: .586667rem;
								background: #F9474F;
								text-align: center;
								border-radius: .106667rem;
								color: #fff;
								font-family: DIN-Bold;
								font-size: .293333rem;
								line-height: .586667rem;
								
							}
						}
					}
				}
			}
		}
		.calculatorBox{
			width: 10rem;
			height: 4.773333rem;
			background: #fff;
			padding: .666667rem .4rem;
			.title{
				margin-bottom: .533333rem;
				.name{
					font-size: .426667rem;
					color: #333333;
					letter-spacing: 0.32;
					.jifen{
						font-size: .32rem;
						color: #808080;
						margin-left: .066667rem;
						display: inline-block;
						em{
							color: #FF5B4C;
						}
					}
				}
				.del{
					width: .666667rem;
					height: .666667rem;
					float: right;
					margin-top: -.2rem;
					i{
						text-align: center;
						line-height: .666667rem;
						font-size: .32rem;
						color: #979797;
					}
				}
			}
			.investList{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.list{
					width: 2.133333rem;
					height: .853333rem;
					line-height: .853333rem; 
					border: 1px solid #808080;
					text-align: center;
					color: #333333;
					font-size: .373333rem;
					margin-top: .533333rem;
					position: relative;
				}
				.list.active{
					border: 1px solid #FF5B4C;
					color: #FF5B4C;
					i{
						display: block;
						width: .413333rem;
						height: .413333rem;
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/checkIcon.png) center center no-repeat;
						background-size: 100%;
						position: absolute;
						top: -1px;
						right: -1px;
					}
				}
				.result{
					height: .56rem;
					line-height: .56rem;
					font-size: .32rem;
					color: #808080;
					margin-top: .826667rem;
					em{
						font-size: .4rem;
						color: #151515;
					}
				}
			}
		}
	}
</style>
<style lang="scss">
	#intgoodsDetailInfo{
		.mint-swipe-indicators{
			display: none;
		}
		.main_info{
			padding: 0.506667rem;
			p{
				zoom:1;
				// padding-bottom: 0.266667rem;
				strong{
					font-size: 0.346667rem;
					color: #8E8E8E;
					width: 2.2rem;
					font-weight:normal;
					// display: inline-block;
					float: left;
					line-height: .75rem;
				}
				span{
					// display: inline-block;
					font-size: 0.373333rem !important;
					color: #333333;
					line-height: .7rem;
					text-decoration:none !important;
					float: left;
					width:6.7rem;
				}
			}
			p:after{content:"";display:block;clear:both;}
			p em span{
				width: 100%;
				font-size: 0.293333rem !important;
				color: #8E8E8E;
				padding-top: 0.106667rem;
				line-height: .5rem;
				text-decoration: none !important;
				display: inline-block;
			}
		}
		
		// p span{
		// 	font-size: 0.293333rem !important;
		// 	color: #8E8E8E;
		// 	padding-top: 0.106667rem;
		// 	line-height: .5rem;
		// 	text-decoration: none !important;
		// 	display: inline-block;
		// }

	}
</style>