<template>
	<div id="wxIndex">
		<div v-title>E都市钱包</div>
		<mt-loadmore class="noLoading" :class="{loading: isLoading}" :top-method="loadTop" :bottom-all-loaded="allLoaded" :bottom-method="loadBottom" :topDistance="70" :bottomDropText="''" ref="loadmore" @top-status-change="topChange">
			<div slot="top" class="mint-loadmore-top">
				<div class="tTop">
					<img v-if="isDropOver" class="gif" src="https://aliyunsso.edspay.com/web/wxUpdate/dropgif.gif" alt="">
					<img  v-else class="topImg" src="https://aliyunsso.edspay.com/web/wxUpdate/drop.png" alt="">
				</div>
			</div>

			<wx-popup v-if="0" :btnType="btn"></wx-popup>
			<div class="swiper">
				<mt-swipe :auto="5000" :showIndicators="true">
					<mt-swipe-item v-for="item in indexData.topBanner">
						<div class="img">
							<a :href="item.url">
								<img :src="item.picUrl" alt="">
							</a>
						</div>
					</mt-swipe-item>
				</mt-swipe>
			</div>
			<!-- 运营配的首页icon -->
			<div class="info" ref="iconsBackground" @click="clickCount('首页','主题底图')">
				<a @click="statistics(item.url)" :href="item.url" class="terrace list" v-for="item in terrace">
					<img :src="item.picUrl" alt="">
					<p :class="{ whiteText: ifBackground }">{{item.title}}</p>
				</a>
			</div>
			<!-- 首页活动大图 -->
			<div v-if="indexData.indexActivity.picUrl" class="activity" @click="clickCount('首页','腰封底图')">
				<a :href="indexData.indexActivity.url" :style="{background:'url('+ indexData.indexActivity.picUrl +') no-repeat',backgroundSize:'contain'}">
					<!-- <img :src="indexData.indexActivity.picUrl" alt=""> -->
				</a>
			</div>
			<!-- 公告 -->
			<div class="headline clear" v-if="isShowNotice" @click="clickCount('首页','公告')">
				<div class="notice img">
					<!-- <router-link to="/wxMyAccount/wxMessage"> -->
						<img src="https://aliyunsso.edspay.com/web/wxUpdate/gongao.png" alt="">
					<!-- </router-link> -->
				</div>
				<div class="notice-line"></div>
				<div class="notice message">
					<ul>
						<li v-for="item in siteNotice" ref="messageList" class="hidden"><router-link :to="{path:'wxAnnouncement',query:{id:item.id}}">{{item.title}}</router-link></li>
					</ul>
				</div>
				<img src="https://aliyunsso.edspay.com/web/wxUpdate/close.png" alt="" class="close-icon" @click="closeNotice">
			</div>

			<div class="unLogin-div">
				<!-- 未登录显示注册365红包 -->
				<div class="registe-div" v-if="!isLogin">
					<div class="registe-left">
						<div class="registe-left-p">
							注册即得<span>1118元</span>红包
						</div>
						<span @click="goLogin" class="registe-left-img updateBtn" tag="div">立即领取</span>
					</div>
					<div class="registe-right">
						<img src="https://aliyunsso.edspay.com/web/wx/v3.3.5/Rectangle.png" alt="" >
					</div>
				</div>
				<!-- 登录且新手任务 -->
				<div class="registe-div-two" v-if="isLogin &&　(newTaskData.order != 0 || newTaskData.status != 0)">
					<div class="registe_top bdr-b" @click="goNewTaskList">新手任务<span>更多<i></i></span></div>
                    <div class="registe_task_box" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/newTask/newTaskBg/new_hand_task'+newTaskData.order+'.png) no-repeat'}">
                        <div class="task_btn" v-if="newTaskData.status == 2" @click="goNewTask">去完成</div>
						<div class="task_btn" v-else-if="newTaskData.status == 3" @click="goNewTaskList">领取</div>
					</div>
				</div>
				<!-- 标的 -->
				<div class="in-eqz" v-if="investList.newbieOnly"></div>
				<!-- <invest-item :item="investList" :showNew="investList.newbieOnly"
						:showAi="!investList.newbieOnly" :risk="risk" :typeNum="1"></invest-item> -->
						<!-- 推荐标 -->
				<div class="recommend mar">
					<div class="content" v-if="investList.recommended"  @click="gotoDetail(investList)" >
						<div  class="listTitle hidden clear">
							{{investList.name}}
							<div v-if="investList.newbieOnly" class="ic_4 ic">新手专享</div>
							<div class="ic_3 ic" v-else-if="investList.recommended && !investList.newbieOnly">智能推荐</div>
							<div v-if="investList.addApr" class="ic_5 ic">平台加息</div>
							<div v-if="investList.vipUprateApr" class="ic_6 ic">v{{investList.vipLevel}}加息</div>
							<div v-if="investList.redUseNum" class="ic_7 ic">{{investList.redUseNum}}张可用</div>
						</div>
						<div class="sepcial clear">
							<div class="percent">
								<div class="percentNum">{{investList.apr ? investList.apr:0 | returnFloat(1)}}<span>%</span>
									<span v-if="investList.addApr && investList.vipUprateApr">+{{(investList.addApr + investList.vipUprateApr)  | returnFloat(1)}}%</span>
									<span v-else-if="investList.addApr">+{{investList.addApr | returnFloat(1)}}%</span>
									<span v-else-if="investList.vipUprateApr">+{{investList.vipUprateApr | returnFloat(1)}}%</span>
								</div>
								<div class="text">参考年化</div>
							</div>
							<div class="recom_info">
								<p><span class="invest_remain">{{investList.remainAmount ? investList.remainAmount:0 | moneyWan}}</span>元</p>
								<p v-if="investList.newbieOnly">剩余金额(使用红包，回报更高)</p> 
								<p v-else>剩余金额</p>
							</div>
						</div>
						<img @click.stop="goDetail(investList)" v-if="investList.progress !== 100" src="https://aliyunsso.edspay.com/web/wxUpdate/big_button1.png" class="bigBtn"/>
						<img @click.stop="goDetail(investList)" v-else  src="https://aliyunsso.edspay.com/web/wxUpdate/lijichujie_hui.png" class="bigBtn"/>
						<div class="recomIcons" v-if="investList.newbieOnly">
							<span v-for="icon in recommendIcons" class="recomIcons-span">
								<img :src="icon.img"/>
								<span>{{icon.text}}</span>
							</span>
						</div>
					</div>
				</div>

			</div>
				<!-- 白拿商城 -->
				<!-- <div class="index-store" @click="clickCount('首页','白拿商城')">
					<div class="index-title">
						<span class="title-one">白拿商城</span>
						<router-link to="/storeIndex"><span class="title-two">千万好物，免费拿<i></i></span></router-link>
					</div>
					<div class="store-goods">
						<div class="store-item" v-for="item in goodList" @click="goStoreDetails(item)">
							<img :src="item.picPath ? item.picPath:'https://aliyunsso.edspay.com/web/wx/whiteStore/unsign.png'" alt="">
							<h1>{{item.name}}</h1>
							<div class="store-tip"><span class="store-tip-num red">{{item.money?item.money:0}}</span><span class="red">元</span>可拿</div>
						</div>
					</div>
				</div> -->
				<!-- 媒体报道 -->
				<div class="media-report" @click="clickCount('首页','媒体报道')">
					<div class="index-title bdr-b">
						<span class="title-one">媒体报道</span>
						<router-link :to="{path:'/tab/tabTemplate',query:{num:4}}"><span class="title-two">更多<i></i></span></router-link>
					</div>
					<wxReport  v-for="(list,index) in reportList" :list="list" :lastLi="index == (reportList.length-1)" v-if="index<2"></wxReport>
				</div>
				<!-- 安全运营 -->
				<div class="about" @click="clickCount('首页','底部宣传')">
					<div class="title">
						<img src="https://aliyunsso.edspay.com/web/wxUpdate/left_line.png" alt="">
						已安全运营<span class="day">{{about.openDays}}</span>天
						<img src="https://aliyunsso.edspay.com/web/wxUpdate/right_line.png" alt="">
					</div>
					<swiper :options="swiperOption" v-if="indexData.threeBottom.length !== 0">
						<swiper-slide v-for="item in indexData.threeBottom">
							<a :href="item.url">
								<img :src="item.picUrl" alt="">
								<p>{{item.title}}</p>
							</a>
						</swiper-slide>
					</swiper>
					<!-- 统计数据 -->
					<div class="number clear">
						<div class="people list">
							<p>平台注册人数(人)</p>
							<div class="num fs24"  v-html="$options.filters.changeBillion(about.userRegister)"></div>
						</div>
						<div class="money list">
							<p>累计交易额(元)</p>
							<div class="num fs24" v-html="$options.filters.changeBillion(about.tradeAmount)"></div>
						</div>
					</div>
				</div>
				<div class="falFooter"><img :src="indexData.gxl.picUrl ? indexData.gxl.picUrl:'https://aliyunsso.edspay.com/web/wx/index/bottomImg.png'" alt=""></div>
			</mt-loadmore>
			<div class="floating" v-if="indexData.suspend.url"><a :href="indexData.suspend.url"><img :src="indexData.suspend.picUrl" alt=""></a></div>
			<wx-footer></wx-footer>
		</div>
</template>

	<script>
	import wxFooter from '../../wxFooter';
	import wxPopup from '../member/popupBaohai';
	import cssCircle from '../../public/wx/v-circle';
	import fingerprintjs2 from 'fingerprintjs2';    //引入拼音组件
	import { Lazyload } from 'mint-ui';
	import {Indicator, Loadmore} from 'mint-ui';
	import { Popup } from 'mint-ui';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import wxReport from '../../public/wx/wxReport'; // 引入媒体报道组件
	import wxInvestItem from '../../public/wx/wxInvestItem'; // 引入列表组件
	import wxToapp from '../../../common/wx/wxToapp'

	export default {
		mixins:[wxToapp],
		data(){
			return {
				btn:'old',
				active:'tab-container1',
				allLoaded:false,
				topStatus:'drop',
				open:true,
				count:0,	//轮播图总数
				siteNotice:[],	//公告
				Eqz:{},	//E起赚信息
				swiper:[], //轮播数组
				about:{},	//平台数据
				platformInt:[], //平台介绍
				gxl:{}, 	//公信力
				floating:{}, 	//浮动
				indexData:{
					gxl:{},
					indexActivity:{},
					introduction:[],
					threeBottom: [],
					suspend:{},
					topBanner:[],
					walletSlider:[],
					subject: [],
				},	//首页数据
				showGif:false,	//显示头部gif
				timer:null,
				message:[
				{
					text:'银行存管系统初步对接中',
				}
				],
				swiperOption: {
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					paginationClickable: true,
					// width :120,
				},
				investList: {},
				userStatusInfo:0,
				isShowNotice:1,  // 公告是否显示  0不显示 1显示
				reportList: [], // 媒体报道列表
				goodList: [], // 白拿商品列表
				risk: 0, // 用户是否通过风险评测
				ifBackground: false, // info是否有背景图
				isDropOver: false, // 下拉刷新完成
				isLoading: false, // 下拉loading期间
				recommendIcons:[
					{img:'https://aliyunsso.edspay.com/web/wxUpdate/icon1.png',text:'智能推荐算法'},
					{img:'https://aliyunsso.edspay.com/web/wxUpdate/icon2.png',text:'结合风险测评'},
					{img:'https://aliyunsso.edspay.com/web/wxUpdate/icon3_copy.png?v1.1',text:'系统分散出借'},
				],
				newTaskData:{},   // 新手任务
			}
		},
		computed:{
			terrace:{
				set(){},
				get(){
					if(this.indexData.introduction.length>4) return this.indexData.introduction.slice(0,4) 
						else return this.indexData.introduction;
				}
			},
			isLogin:{
				get(){
					if(this.getCookie('userToken')) return true;
					else return false;
				},
				set(){}
			},
			isZsOpen:{
				get(){
					if(this.getCookie('zsOpenStatus')== 1) return true;
					else return false;
				},
				set(){}
			}
		},
		watch: {
			'$route'() {
				if (window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		},
		components:{
			wxFooter:wxFooter,
			wxPopup,
			cssCircle,
			swiper,
			swiperSlide,
			wxReport,
			'invest-item':wxInvestItem,
		},
		methods:{
			topChange (val){
				if (val == "loading")this.isLoading = true;
				if (val == "pull")this.isLoading = false;
			},
			statistics(urlData){
				if(urlData.indexOf('wxInvitationIndex') >= 0){
					this.clickCount('首页邀请入口','邀请按钮')
				}
			},
			loadTop(){
				this.getData('indexData','/index/common');
				this.isDropOver = true
				var that =this;
				window.setTimeout(function(){
					that.isDropOver = false
					that.$refs.loadmore.onTopLoaded();
					//that.$router.push({path:'/wxLogin'})
				},1000)
			},
			loadBottom(){
				this.$refs.loadmore.onBottomLoaded();
			},
			getSiteNotice(){
				this.notLogPost('/app/index/notice',(data) => {
					console.log(data.resData.list)
					if(data.resCode){
						this.siteNotice = data.resData.list;
						// if(this.siteNotice.length !=0 ){   // 公告是否显示  0不显示 1显示
						// 	this.isShowNotice = 1;
						// }
						this.ifShowNotice();
					}
				},{},1)
			},
			getEqz(){
				this.notLogPost('/index/ePlan',(data) => {
					if(data.resCode){
						this.Eqz = data.resData.data;
					}
				},{})
			},
			getInvestList () {
				this.notLogPost('/borrow/investListRecommand',(data) => {
					if(data.resCode == 1){
						this.userStatusInfo = data.resData.userStatusInfo;
						this.investList = data.resData.pageInfo.list[0];
						this.risk =data.resData.risk
						//遍历可用红包
						for(var j=0; j<data.resData.pageInfo.list.length; j++){
							var redUseNum = 0
							if(data.resData.pageInfo.list[j].isRedEnvelope == 0 && data.resData.pageInfo.list[j].isUpRate == 0){ //红包加息券都可用
								if(data.resData.pageInfo.list[j].newbieOnly){ //新手标
									for(var i=0; i<data.resData.redModel.length; i++){
										//优惠券为无限制和只为新手标可用
										if(data.resData.redModel[i].category != 1 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit){//没有时间上限
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit && data.resData.pageInfo.list[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}else{ //普通标
									for(var i=0; i<data.resData.redModel.length; i++){
										//优惠券为无限制和只为普通标可用
										if(data.resData.redModel[i].category != 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit){//没有时间上限
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit && data.resData.pageInfo.list[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}
							}else if(data.resData.pageInfo.list[j].isRedEnvelope == 0 && data.resData.pageInfo.list[j].isUpRate == 1){ //红包可用、加息券不可用
								if(data.resData.pageInfo.list[j].newbieOnly){
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 1 && data.resData.redModel[i].type != 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit && data.resData.pageInfo.list[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}else{
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 0 && data.resData.redModel[i].type != 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit && data.resData.pageInfo.list[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}
							}else if(data.resData.pageInfo.list[j].isRedEnvelope == 1 && data.resData.pageInfo.list[j].isUpRate == 0){ //红包不可用、加息券可用
								if(data.resData.pageInfo.list[j].newbieOnly){
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 1 && data.resData.redModel[i].type == 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit && data.resData.pageInfo.list[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}else{
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 0 && data.resData.redModel[i].type == 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= data.resData.pageInfo.list[j].timeLimit && data.resData.pageInfo.list[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}
							}
							
							data.resData.pageInfo.list[j].redUseNum = redUseNum
						}
      				}
				},{pageNum:1,pageSize:10,token:this.getCookie('userToken')})
			},
			getData(name,url){
				this.notLogPost(url,(data) => {
					if(data.resCode){
						this[name]=data.resData.data;
						if(name='indexData') {
							this.checkIcons()
						}
					}
				},{})
			},

			/*//去投资详情页
			goDetail(item){
				if (item.assetManageType == 3 ) {
					this.$router.push({path: '/wxDetailPoint',query: { uuid: item.uuid}})
				} else {
					this.$router.push({path: '/wxDetail',query: { uuid: item.uuid}})
				}
				// console.log(this.thisUrl)
				// this.$router.push(goUrl)
			},*/

			// 根据cookie是否关闭和列表是否等于0，来判断是否显示公告，如果关闭则第二天显示
			ifShowNotice(){
				// 判断公告时间是否失效
				if (this.getCookie('closeNotice') == null&& this.siteNotice.length !=0) {
					this.isShowNotice = 1;
				}else {
					this.isShowNotice = 0;
				}
			},
			// 关闭公告
			closeNotice () {
				this.isShowNotice = 0;
				var date = new Date().getTime();
				var today = new Date().setHours(0, 0, 0, 0)+86400000 //今天凌晨
				this.setCookie('closeNotice',today, today-date); // 0点失效
			},
			// 去登录
			goLogin () {
				this.clickCount('首页','注册领取365红包')
				this.$router.push({path: '/wxLogin', query: {thisUrl:this.$route.fullPath}});
			},
			// 去开通存管
			goOpenZs () {
				this.clickCount('首页','开通存管')
				this.$router.push({path: '/wxDepository', query: {thisUrl:this.$route.fullPath}});
			},

			// 获取白拿商城
			getStore () {
				this.notLogPost('/freemall/findThree',(data) => {
					if(data.resCode == 1){
      					 this.goodList = data.resData.data.slice(0,3)
      				}
				},{})
			},
			// 获取媒体信息
			getMedia () {
				this.notLogPost('/index/newsReport',(data) => {
					if(data.resCode == 1){
      					 this.reportList = data.resData.data.list;
      				}
				},{pageNum:1,pageSize:2,token:this.getCookie('userToken')})
			},
			// 跳转标详情页
			goDetail(item){
				this.clickCount('首页','推荐标')
				if (item.assetManageType == 3 ) {
					if(this.userStatusInfo){
						this.$router.push({path: '/wxInvestIn/wxInvestMoneyPoint',query: { uuid: item.uuid}})
					}else{
						this.$router.push({path: '/wxDetailPoint',query: { uuid: item.uuid}})
					}
				} else {
					this.$router.push({path: '/wxDetail',query: { uuid: item.uuid}})
				}
			},
			gotoDetail(item){
				this.clickCount('首页','推荐标')
				if (item.assetManageType == 3 ) {
					this.$router.push({path: '/wxDetailPoint',query: { uuid: item.uuid}})
				} else {
					this.$router.push({path: '/wxDetail',query: { uuid: item.uuid}})
				}
			},
			// 跳转到白拿商品详情
			goStoreDetails(item){
				this.skip({ path: '/storeDetail', query:{ goodsId: item.id} })
			},
			// 判断icons是否有底图
			checkIcons() {
				this.$nextTick(function () {
					if (this.indexData.subject.picUrl){
						this.ifBackground = true
						this.$refs.iconsBackground.style.backgroundImage = "url("+"'"+this.indexData.subject.picUrl+"'"+")"
					}
				})
			},
			// 数据统计
			init () {
				const script = document.createElement('script')
				script.src = 'https://s13.cnzz.com/z_stat.php?id=1272838094&web_id=1272838094 '
				script.language = 'JavaScript'
				document.body.appendChild(script)

				const script1 = document.createElement('script')
				script1.src = 'https://s13.cnzz.com/z_stat.php?id=1273551090&web_id=1273551090'
				script1.language = 'JavaScript'
				document.body.appendChild(script1)
			},
			// 点击事件统计
			clickCount (category,action) {
				window._czc.push(["_trackEvent",category,action]);
			},

			

			// 去新手任务
			goNewTaskList(){
               this.$router.push({
					path:'/newTask',
					query:{thisUrl:this.$route.fullPath}
                })
			},

             //新手任务活动接口
			newHandTask(){ 
				let that = this;
                that.getNotlogData('/activity/newHandTask.html', (data) => {
					if(data.resCode){
						this.newHandIndex();
					}
				},{})
			},

			// 新手任务接口需要登录
			newHandIndex(){
				this.notLogPost('/activity/newHandIndex.html', (data) => {
					if(data.resCode){
						this.newTaskData = data.resData;
					}
			    },{token:this.token})
			},
           
			 
			// 新手任务跳转任务
			goNewTask(){
				if(this.newTaskData.order == 1 ){
                   //开通存管
					this.$router.push({path: '/wxDepository', query: {thisUrl:this.$route.fullPath}});
				} else {
					//去投资列表页
					this.$router.push({path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
				}
			},


},
		beforeRouteLeave (to, from, next) {
			this.thisUrl = to.path;
			console.log(this.thisUrl)
			next();
		},
		created(){
			this.getSiteNotice();
			// this.getEqz();
			this.getInvestList();
			this.getMedia();
			// this.getStore();
			this.getData('about','/index/statistics');
			this.getData('indexData','/index/common');
			if(this.isLogin){
                this.newHandTask();
			}
			
			// this.ifShowNotice()
			if(this.$route.query.osType) this.setCookie('osType',this.$route.query.osType,(1000*60*20))	
		},
		mounted(){
			var that =this;
			this.init()
			if (this.isShowNotice){
				console.log(this.isShowNotice)
				$(document).ready(function(){
					console.log(that.isShowNotice,  "oopopopo")
					that.timer = window.setInterval(function(){
						if (that.isShowNotice){
							$('.message').find("ul:first").animate({
								marginTop: -that.$refs.messageList[0].offsetHeight + 'px'
							},500,function(){
								$(this).css({marginTop:"0"}).find("li:first").appendTo(this);
							});
						}else{
							clearTimeout(that.timer)
						}
					},3000);
				});
			}
		},
		destroyed(){
			clearInterval(this.timer)
		},
	}
	</script>
	<style>
		.noLoading {
			padding-top: 0rem;
		}
		.loading {
			padding-top: 1.333333rem;
		}
		.mint-swipe-indicator.is-active{opacity: 1;}
		.mint-swipe-indicator{background: #fff;}
		.mint-swipe-indicators{bottom: 15px;}
		.footerActive p{
			color: #FF5B4C !important;
		}
		.wxFooter .navbar-fixed-bottom li a{color: #BABFC9;}
		.fs24 span {
			font-size: .32rem;
			padding-left:.133333rem;
			padding-right:.133333rem;
		}
	</style>
	<style lang="scss" scoped>
	.mint-loadmore-top{
		margin-top: -4.32rem;
		background-size:100% 100%;
		height:4.32rem;
		.tTop{
			margin-top: -3.333333rem;
			padding-top:3.2rem;
			height: 1.333333rem;
			.gif{
				width: 1.52rem;
				height: 1.52rem;
				margin-top: -1rem;
			}
			.topImg{
				margin-top: -1rem;
				width: 1.52rem;
				height: 1.52rem;
			}
			img{
				display:block;
				margin: 0 auto;

			}
		}
		span{
			color:#fff;
		}
	}
	.falFooter{
		/* height:1.333333rem!important; */
		margin-bottom: 1.333333rem;
		img{
			width:100%;
		}
	}
	.whiteText {
		color: white !important;
	}
	
	#wxIndex{
		font-size:0.346667rem;
		line-height:0.493333rem;
		background: #F8F8F8;
		font-family: 'Microsoft Yahei';
		.swiper{
			height:5.066667rem;
			a{
				display:block;
			}
			img{
				width:100%;
				height:5.226667rem;
			}
		}
		/*公告*/
		.headline{
			height:.933333rem;
			overflow: hidden;
			display: flex;
			flex-direction: row;
			background: white;
			width: 9.466667rem;
			margin: .266667rem auto 0rem auto;
			border-radius: 1.333333rem;
			// background:#fff url(https://aliyunsso.edspay.com/web/wx/index/indexRight.png) 9.4rem 0.266667rem no-repeat ;
			// background-size:0.213333rem 0.346667rem;
			.notice{
				position:relative;
				float:left;
			}
			.img{
				padding:0.14rem .266667rem;
				text-align:center;
				img{
					height:.426667rem;
					width:1.573333rem;
				}
			}
			.notice-line {
				width: .026667rem;
				height:.4rem;
				background: #E5E5E5;
				margin-top: calc((.933333rem - .4rem) / 2);
			}
			.close-icon {
				width: .32rem;
				height: .32rem;
				margin-top: calc((.933333rem - 0.32rem) / 2);
			}
			.message{
				width:6.75rem;
				padding:0rem  .3667rem 0rem .266667rem;
				li{
					font-size:.346667rem;
					height:100%;
					line-height:.933333rem;
					color:#686868;
					a{
						display:inline-block;
						width:100%;
						color:#333;
					}
				}
			}
		}
		/*新手标*/
		.unLogin-div {
			// background: white;
			margin-top: .266667rem;
			.in-eqz {
				width: 8.933333rem;
				height: .023333rem;
				margin: 0 auto;
				position: relative;
			}
			.li{
				margin-top: 0px;
			}
			.registe-div {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				// margin:0rem 0rem  0rem .533333rem;
				background: #fff;
				padding:0 .4rem;
				margin-bottom: .266667rem;
				height: 3.28rem;
				.registe-left {
					display: flex;
					flex-direction: column;
					.registe-left-p {
						font-size: .373333rem;
						color: #333333;
						margin-top: .666667rem;
						font-family: DIN-Medium;
						span {
							font-size: .613333rem;
							padding: 0rem .066667rem;
							color: #FF5B4C;
						}
					}
					.registe-left-img {
						margin-top: .4rem;
						background: #FFFFFF;
						border: .026667rem solid #FF5B4C;
						color: #FF5B4C;
					}
				}
				.registe-right {
					img {
						width: 4rem;
						height: 3.013333rem;
					}
				}
			}
			.registe-div-two{
				background: #fff;
				padding:0 .4rem;
				margin-bottom: .266667rem;
				height: 3.28rem;
                .registe_top{
					width: 100%;
					height: 1.36rem;
					position: relative;
					font-family: PingFangSC-Regular;
					font-size: .4rem;
					color: #333333;
					line-height: 1.36rem;
					span{
						float: right;
						font-size: .346667rem;
						color: #808080;
						i{
							display: inline-block;
							width: .32rem;
							height: .32rem;
							background: url(https://aliyunsso.edspay.com/web/wxUpdate/next.png) no-repeat;
							background-size: contain;
							margin-left: .113333rem;
						}
					}
				}
				.registe_task_box{
					width: 100%;
					height: 1.92rem;
					position: relative;
					background-size: cover!important;
					.task_btn{
						width: 1.6rem;
						height: .666667rem;
						border-radius: 1.333333rem;
						font-size: .346667rem;
						color: #FFFFFF;
						line-height: .666667rem;
						text-align: center;
						position: absolute;
						top: 0;
						bottom: 0;
						right: .1rem;
						margin: auto;
					}
				}
			}
			
		}
		/*首页活动大图*/
		.activity{
			background:#fff;
			margin-bottom:0.266667rem;
			height:3.733333rem;
			.actop{
				line-height: 1.386667rem;
				font-size: 0.4rem;
				color: #333333;
			}
			a{
				display: block;
				height:3.733333rem;
			}
			img{
				width:100%;
			}
		}
		/*运营配的首页icon*/
		.info{
			background:#fff;
			height:3.066667rem;
			display: flex;
			flex-wrap: wrap;
			background-size: contain;
			.list{
				float: left;
				text-align:center;
				padding-top:.533333rem;
				img{
					display:block;
					margin:0 auto;
					width:1.066667rem;
					height:1.066667rem;
					margin-bottom:0.266667rem;
				}
				p{
					font-size:.346667rem; 
					line-height:0.44rem;
					height:0.44rem;
					overflow:hidden;
					color:#333;
					
				}
			}
			.terrace{
				display: block;
				flex:1;
				img{
					height:1.333333rem;
					width:1.333333rem;
				}
			}
		}
		/*白拿商城*/
		.index-store {
			height: 6.293333rem;
			margin-top:.266667rem;
			background: white;
			.store-goods {
				margin:.4rem .533333rem .76rem .533333rem;
				display: flex;
				flex-direction: row;
				.store-item {
					width: 2.826667rem;
					margin-right: .24rem;
					text-align: center;
					img {
						width: 2.826667rem;
						height: 2.826667rem;
					}
					h1 {
						font-size: .373333rem;
						color: #333333;
						margin-top: .266667rem;
					}
					.store-tip {
						color: #999999;
						font-size: .266667rem;
						margin-top: .026667rem;
						.store-tip-num {
							font-size: .4rem;
						}
					}
				}
			}
		}
		/*媒体报道*/
		.media-report {
			background: white;
			margin-top:.266667rem;
			a {
				display: block;
			}
			.last-li {
				border-bottom:none !important;
			}
		}
		/*安全运营*/
		.about{
			margin:.266667rem 0rem 0rem 0rem;
			background:#fff;
			overflow: hidden;
			.title{
				font-size:0.4rem;
				line-height: .533333rem;
				color:#333333;
				text-align: center;
				margin-top: .44rem;
				img {
					width: 1.573333rem;
					height: .56rem;
					margin: 0 .133333rem;
				}
			}
			.number {
				margin-top: .533333rem;
				margin-bottom:.533333rem;
				display: flex;
				flex-direction: row;
			}
			.people {
				margin-left: 1.613333rem;
				margin-right:1rem;
			}
			.list{
				text-align:center;
				height:1.36rem;
				.num{
					font-size:.453333rem;
					line-height:.56rem;
					margin-top: .16rem;
					color:#333333;
					font-family: DIN-Medium;
				}
				p{
					font-size: .32rem;
					color:#808080;
				}
			}
			.swiper-container{
				margin: .533333rem 1.2rem;
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				height: 1.866667rem;
				.swiper-slide {
					height:1.333333rem;
					width:1.333333rem!important;
					margin-right: 1.773333rem!important;
					text-align: center;
					p {
						font-size: .306667rem;
						color: #333333;
						margin-top: .133333rem;
					}
					img{
						display:block;
						width:1.333333rem;
						height:100%;
						border-radius:0.106667rem;
					}
				}
			}
		}
		/*底部图片*/
		.floating{
			width: 1.48rem;
			height: 1.6rem;
			position: fixed;
			right: .2rem;
			top: 11rem;
			z-index: 100;
			img{
				width:100%;
			}
		}
		/*首页改版后->通用标题*/
		.index-title {
			padding: 0rem .533333rem;
			height: 1.186667rem;
			line-height: 1.186667rem;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			position: relative;
			.title-one {
				font-size: .426667rem;
				font-weight: bold;
			}
			.title-two {
				font-size: .346667rem;
				color: #808080;
				display: flex;
				flex-direction: row;
				align-items: center;
				i {
					display: inline-block;
					width: .32rem;
					height: .32rem;
					background: url(https://aliyunsso.edspay.com/web/wxUpdate/next.png) no-repeat;
					background-size: contain;
					margin-left: .113333rem;
				}
			}
		}
		/*单独样式*/
		.updateBtn {
			border-radius: .106667rem;
			width: 2.133333rem;
			height: .8rem;
			font-size: .373333rem;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center
		}
		.red {
			color: #FF5B4C;
		}
		.day {
			font-size: .533333rem;
			line-height: .56rem;
			padding: 0rem .093333rem;
			font-family: DIN-Medium;
		}
		.no-border {
			border:none !important;
		}

		// 推荐标
		.recommend{
			background: #fff;
		}
		.recommend .content{
			margin: .266667rem  .213333rem .266667rem .213333rem;
			overflow: hidden;
			.hidden {
				align-items: center;
			}
			.ic {
				width: 1.54rem;
	        	height: .45rem;
				line-height: .46rem;
				font-size: .293333rem;
				color: white;
				text-align: center;
			}
			.ic_3 {
				background: #50B5EE;
				border: .013333rem solid #50B5EE;
				position: relative;
				top:0;
			}
			.ic_4{
				background: #7ED321;
				border: .013333rem solid #7ED321;
			}
			.ic_5{
				background: #5CA9F1;
				border: .013333rem solid #5CA9F1;
			}
			.ic_6{
				background: #D3BA81;
				border: .013333rem solid #D3BA81;
			}
			.ic_7{
				border: .013333rem solid #ff5b4c;
				color: #ff5b4c;
			}
			/*推荐icons*/
			.recomIcons {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				font-size: .32rem;
				color: #B5B5B5;
				height: .4rem;
				margin:0rem .266667rem .266667rem .266667rem;
				img {
					width: .4rem;
					height: .4rem;
				}
			}
		    .sepcial{
				height: 1.653333rem;
				margin-top:.666667rem;
				margin:.666667rem .32rem 0rem .32rem;
				display: flex;
				flex-direction: row;
				align-items: flex-end;
		    	.percent{
		    		text-align: left;
		    		width: 49.5%;
		    		float: left;
		    		.percentNum{
		    			font-family: DIN-Medium;
		    			font-size: 1.2rem;
		    			line-height: 1rem;
		    			color: #ff5b4c;
		    			height: 1.1rem;
						// margin-top: .666667rem;
		    		}
		    		span{
		    			font-size: 0.4rem;
		    		}
		    		.text{
		    			font-size:0.32rem;
		    			color:#808080;
		    			line-height: 0.38rem;
		    		}
		    	}
		    	.recom_info{
					text-align: left;
					width: 50.5%;
					float: left;
		    		p{
		    			font-size: .32rem;
		    			color: #808080;
						margin-top: .08rem;
						font-family: PingFangSC;
		    			.invest_remain{
							font-size: .48rem;
							color: #3a1111;
							font-family: DIN-Medium;
		    			}
		    		}
		    		.surplus{
		    			font-size:0.32rem;
		    			color:#808080;
		    			float: right;
		    			text-align: left;
		    			line-height: 0.64rem;
		    			span{
		    				color:#333;
		    			}
		    		}
		    	}
		    }
			.listTitle{
				font-size: .453333rem;
				height: .533333rem;
				line-height: .533333rem;
				margin: .4rem .32rem 0rem .32rem;
				display: flex;
				flex-direction: row;
				span{
					display: inline-block;
				}
				div{
					margin-left: .266667rem;
				}
			}
			.bigBtn {
				width: 9.573333rem;
				height: 1.76rem;
				margin-top: .506667rem;
				// margin-bottom: .306667rem;
			}
			.btn{
				width: 2.106667rem;
				height: 0.733333rem;
				line-height: 0.65rem;
				text-align: center;
				font-size: 0.373333rem;
				color: #FF5B4C;
				border: .013333rem solid #FF5B4C;
				position: absolute;
			    right: .3rem;
			    top: -.15rem;
			}

		}
	}
	</style>