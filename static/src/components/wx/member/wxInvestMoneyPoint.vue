<template>
	<div id="investMoney">
		<div v-if="borrow.name" v-title>{{borrow.name}}</div>
		<div class="mg_tips clear" v-if="borrow.isSysProtect == 1">
			<div class="div_ico"></div>
			<div class="div_tip" id="scrollDiv">
				<div>
					<div id="td1">{{borrow.protectMes}} </div>
					<div id="td2"></div>
				</div>
			</div>
		</div>
		<div class="remain_invest_money clear">
			<span class="title_left">剩余金额(元)</span>
			<span class="title_right">{{borrow.remainAmount ? borrow.remainAmount:0 | moneyFormat}}</span>
		</div>
		<div class="top">
			<p class="invest_title">出借金额(元)</p>
			<div class="importMoney">
				<span>￥</span>
				<input @keyup="greater($event)" v-if="borrow.maxAmount > 0" type="number" v-model="useMoney" :placeholder="(borrow.minAmount ? borrow.minAmount:'--')+'起 限额' + borrow.maxAmount + '元'" :disabled="disabled">
				<input @keyup="greater($event)" v-else type="number" v-model="useMoney" :placeholder="(borrow.minAmount ? borrow.minAmount:'--')+'起'" :disabled="disabled">
				<i v-if="useMoney && (borrow.minAmount <= borrow.remainAmount)" @click="deleAmount"></i>
			</div>
			<div class="zs_money bdr-t">可用余额（元）：<i>{{hasMoney | moneyFormat}}</i><span @click="toRecharge">充值</span></div>
		</div>
		<ul class="red_packet">
			<li class="bdr-b clear" :class="{bgIco:hasRed == 2 || (hasRed == 0 && hasUprate == 0 && expireCount) || hasUprate == 2 || expireCount || (hasRed == 1 && hasUprate == 1 && !expireCount) || (hasRed == 1 && hasUprate == 0 && !expireCount) || (hasRed == 0 && hasUprate == 1 && !expireCount)}">
				<div class="fl img_ico img_ico_redPacket"></div>
				<div class="fl middle_text">
					<!--  v-if="expireCount" -->
					<p class="big_title oneText">我的红包 <span class="red_mount">(共{{expireCount}}张)</span></p>
				</div>
				<div v-if="(hasRed == 2 && expireCount) || (hasUprate == 2 && expireCount)" class="fr show_next_ico has_red_use" @click="redUsable()">
					<span class="redText" v-if="type==1">{{amount}}元现金红包</span>
					<span class="redText" v-else-if="type==2">{{amount}}元抵扣红包</span>
					<span class="redText" v-else-if="upApr">{{upApr}}%加息券</span>
					<span v-else-if="!amount && !upApr && unsedPacket">不使用我的红包</span>
					<div v-else>请选择</div>
				</div>
				
				<!-- 红包可用，加息券可用，张数0  ||  红包可用，加息券不可用，张数0  || 红包不可用，加息券可用，张数0 这三个情况都跳转积分商城；
				     0 不允许使用  1允许使用，但用户无此优惠券  2允许使用，用户有优惠券
				 -->
				<div v-else-if="(hasRed == 1 && hasUprate == 1 && !expireCount) || (hasRed == 1 && hasUprate == 0 && !expireCount) || (hasRed == 0 && hasUprate == 1 && !expireCount)" class="fr show_next_ico no_red_use" @click="toShopping">去积分商城兑换</div>
				
				<div v-else-if="hasRed == 0 && hasUprate == 0 && expireCount" class="fr show_next_ico has_red_use" @click="redUsable()">
					<span v-if="unsedPacket">不使用我的红包</span>
					<span v-else>该项目不可用</span>
				</div>
				<!-- 红包可用，加息券不可以，张数0 -->
				<div v-else-if="hasRed == 1 && hasUprate == 0 && expireCount" class="fr show_next_ico has_red_use" @click="redUsable()">	
					<span v-if="unsedPacket">不使用我的红包</span>
					<span v-else>请选择</span>
				</div>
				<!-- 红包不可用，加息券可以，张数0 -->
				<div v-else-if="hasRed == 0 && hasUprate == 1 && expireCount" class="fr show_next_ico has_red_use" @click="redUsable()">
					<span v-if="unsedPacket">不使用我的红包</span>
					<span v-else>请选择</span>
				</div>
				<div v-else class="fr show_next_ico has_red_use">该项目不可用</div>
				<!-- <div v-else-if="hasRed == 0 && hasUprate == 0 && !expireCount" class="fr show_next_ico has_red_use">该项目不可用</div>
				<div v-else-if="hasRed == 1 && hasUprate == 0 && !expireCount" class="fr show_next_ico has_red_use">该项目不可用</div>
				<div v-else-if="hasRed == 0 && hasUprate == 1 && !expireCount" class="fr show_next_ico has_red_use">该项目不可用</div> -->
				<!-- <div v-else-if="!expireCount" class="fr show_next_ico no_red_use">暂无红包和加息券</div> -->
			</li>
			<!-- 选择vip加息券 -->
			<li class="clear" :class="{bgIco:vipUpRateNum}" v-if="vipUpRateNum || canReceive">
				<div class="fl img_ico img_ico_vip"></div>
				<div class="fl middle_text">
					<p class="big_title oneText">会员加息 <span class="red_mount">(v{{borrow.vipLevel}})</span></p>
				</div>
				<!-- <div class="fr show_next_ico no_red_use redText">{{borrow.vipUprateApr}}%</div> -->
				<div v-if="vipUpRateNum > 0" class="fr show_next_ico has_red_use" @click="vipUpaprUsable()">
					<span class="redText" v-if="vipUpApr">{{vipUpApr}}%加息券</span>
					<span v-else-if="unsedVipPacket">不使用我的会员加息</span>
					<div v-else>请选择</div>
				</div>
				<router-link v-else :to="{path:'/wxMyAccount/vipWelfare'}" class=" fr show_next_ico has_red_use getBtn"><i>领取福利</i></router-link>
			</li>
		</ul>
		<ul class="money_rate">
			<li class="bdr-b clear">
				还需支付(元)<i class="fr">{{useMoney - (amount ? amount:0) | moneyFormat}}</i>
			</li>
			<li class="clear" :class="{'bdr-b':showRateText}">
				参考年化收益(元)<span :class="{trans:!showRateText}" v-if="earnings[0].money > 0.009 && useMoney" @click="showRateText = !showRateText"></span><i class="black_text fr">{{expect ? expect:0 | moneyFormat}}</i>
			</li>
			<div class="rate_list clear" v-if="!showRateText && (earnings[0].money > 0.009 || earnings[1].money > 0.009 || earnings[2].money > 0.009 || earnings[3].money > 0.009)">
				<div class="rate_box fl" v-for="item in elist" v-if="item.money">{{item.text}}{{item.money | moneyTwo}}</div>
			</div>
		</ul>

		<!-- <div class="loginBtn" v-if="enough" :class="{btns_color_on:useMoney && isImg.isCheak}" @click="goInvest">授权出借</div> -->
		<div class="loginBtn" v-if="enough" :class="{btns_color_on:useMoney && isImg.isCheak}" @click="showVipPacketTip">授权出借</div>
		<div class="loginBtn btns_color_on" v-else @click="goRecharge">余额不足，先充值</div>
		
		<div class="agreement">
			<cheak-img :cheak="isImg" class="ic_1"></cheak-img>
			<p class="xieyi">我已同意<router-link :to="{path:'/wxDcPlanServiceAgreement',query:{uuid:uuid}}" id="service_contract" tag="span">《用户出借服务协议》</router-link>
				<router-link :to="{path:'/wxUserAuthorizeProxy'}" tag="span">《授权委托书》</router-link>
				<router-link :to="{path:'/wxRiskDisclosureBook'}" tag="span">《风险提示书》</router-link>
				<router-link :to="{path:'/digitalCertificate'}" tag="span">《数字证书服务协议》</router-link>
				<router-link :to="{path:'/electronicSeal'}" tag="span">《电子签章风险提示》</router-link></p>
		</div>

		<pop-tips v-if="showlayer.tips" :bankType="borrow.bankType" :showThis="showlayer" :code="code" :money="useMoney-hasMoney"></pop-tips>
		<earnings-tips v-if="showEar.isShow" :earnings="earnings" :showThis="showEar"></earnings-tips>
		<pop-message v-if="showMessage.getMessage" :phone="borrow.zsBindPhone" :showMessage="showMessage" :code="code" :confirm="toInvest" :again="goInvest"></pop-message>
		<wx-directional v-if="showDirec.isShow" :confirm="toInvest" :direcPwd="direcPwd" :showDirec="showDirec"></wx-directional>
		<password-dialog v-if="showList.isShow" :showList="showList" :borrow="borrow" :againPwd="againPwd" :pwdStr="pwdStr" :finalPwd="finalPwd" :toInvestPoint="toInvestPoint" :hidePhone="borrow.hidePhone" :hideRealname="borrow.hideRealname" :isSetTradePass="borrow.isSetTradePass" :needsMoney="useMoney - (amount ? amount:0)"></password-dialog>
		<pop-message v-if="showMessage2.getMessage" :phone="borrow.hidePhone" :showMessage="showMessage2" :code="code2" :confirm="closeMessage" :again="changePhone" :logo="'获取验证码'"></pop-message>
		<wx-authorize v-if='ristResult.isShow' :showThis="ristResult" :btn="1" :text="evaluationText" :btnText="evaluationBtn" :btnCli="1" :doOther="doOther" :confirmBtn="evaluationFun"></wx-authorize>
		<wx-authorize v-if='maxInvest.isShow' :showThis="maxInvest" :btn="1" :text="maxInvestText" :btnText="maxInvestBtn" :btnCli="1" :doOther="doOther" :confirmBtn="maxInvestFun"></wx-authorize>
		<wx-authorize v-if='useVipPacket.isShow' :showThis="useVipPacket" :btn="1" :text="'确定不使用会员加息券？'" :btnText="useVipPacketBtn" :btnCli="1" :doOther="allowVipPacket" :confirmBtn="goInvest"></wx-authorize>
		<wx-authorize v-if='useVipPacketTip.isShow' :showThis="useVipPacketTip" :btn="1" :text="'当前会员加息券最高加息' + limitUpMoneyNumb + '元，确认加息？'" :btnText="useVipPacketBtn" :btnCli="1" :doOther="closeVipPacket" :confirmBtn="goInvest"></wx-authorize>
	</div>
</template>

<script>
	import popTips from './invest/popupTips';
	import earningsTips from './invest/earningsTips';
	import popMessage from './invest/popupMessage';
	import wxDirectional from './invest/wxDirectional';	//定向标弹框
	import cheakImg from '../../public/wx/wxCheakImg';	//引入图片Cheak
	import verify from '../../../common/wx/verification';	//引入表单验证
	import passwordDialog from '../../public/wx/tradePassword';	//密码组件
	import wxAuthorize from '../member/invest/wxPublicDialog'; //弹框
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';		//弹框


	export default {
		mixins:[verify],
		data(){
			return {
				// title:'',
				showlayer:{
					layer:0,
					tips:false
				},
				againPwd:{
					setTradePwd:'', //确认密码
				},
				pwdStr:{
					setTradePwd:'',//确认密码
				},
				finalPwd:{
					setTradePwd:'',//输入密码
				},
				pwdNum:'',//密码类型
				investData:[
					'/sina/invest/tender',
					'/zs/invest/tender'
				],
				showEar:{
					isShow:false	//显示预期收益
				},	
				showList:{
					isShow:false //密码框
				},
				maxInvest:{//最高可投弹框
					isShow:false
				},
				useVipPacket:{ isShow: false },//提示 确认不使用vip加息券
				useVipPacketTip:{ isShow: false }, // 提示 vip加息券额度
				useVipPacketBtn:['取消','确定'],
				useVipPacketTipBtn:['取消','确定'],
				maxInvestText:'',//最高可投提示语
				maxInvestBtn:['重新测评','确定'],//按钮名字
				logoMsg:'出借',
				vipApr:[0,0.3,0.5,0.8,1,1.5,1.5,1.5,1.5],
				ischangeMoney:false,
				hasRed:false, 	//是否有可用红包
				hasUprate:false, 	//是否有可用加息券
				hasExperience:false, 	//是否有可用体验券
				expireCount:'',//可用红包个数
				useMoney:null,	//金额
				redMoney:0,		//使用红包金额
				redId:'',		//使用红包Id数组
				type:'',//红包类型
				upApr:0,		//使用加息券额度
				upAprId:'',		//使用加息券Id

				vipUpApr:0,		//vip加息券额度
				vipUpAprId:0,		//vip加息券Id
				vipUpAprEarnings:0,		//vip加息券加息金额
				unsedVipPacket:0,	//是否使用vip加息券 true-没使用
				limitUpMoneyNumb:'',

				experMoney:0,		//使用体验金金额
				amount:'',
				experId:'',		//使用体验券Id数组
				uprate:null, 		//加息券
				upAprEarnings:null, 	//加息金额
				uuid:'',
				borrow:{},		//标的详情
				formToken:'',		//防止表单重复提交
				hasMoney:'',		//可用金额
				isImg:{
					isCheak:false	//是否勾选
				},
				code:{
					msgCode:'',		//短信验证码
				},
				showMessage:{
					getMessage:false,
				},
				showDirec:{
					isShow:false,	//定向标判断
				},
				direcPwd:{
					msgCode:'',
				},
				disabled:false,		//出借金额是否可变
				// radomStr:''
				showMessage2:{getMessage:false},// 显示弹出关闭债券弹窗
				code2:{msgCode:''}, // 关闭债权验证码
				ristResult:{   // 风险评测
					isShow:false,
				},
				evaluationText:'',
				evaluationBtn:['重新测评','确定'],
				enough:true,//投资金额大于账户余额按钮切换
				minRechargeMoney:'',//需要充值的最小金额
				redGroup:[],//红包数组
				showRateIco:false,//展示显示收益的小ICO
				showRateText:false,//展示具体显示收益的
				unsedPacket:'',//不使用优惠券

				//5.1.0
				canReceive:0,//可领取福利
				vipUpRateNum:0//vip加息券数量
			}
		},
		computed:{
			earnings(){		//计算预期收益
				var projectEar = 0,addEar = 0,uprateEar = 0,vipEar = 0;
				//基础收益
				if(this.borrow.timeType == 1) projectEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.apr)/360)*this.borrow.timeLimit;
				else projectEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.apr)/12)*this.borrow.timeLimit;
				//项目加息收益
				if(this.borrow.addApr){
					if(this.borrow.timeType == 1) addEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.addApr)/360)*this.borrow.timeLimit;
					else addEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.addApr)/12)*this.borrow.timeLimit;
				}
				//加息券收益
				if(this.upApr){
					if(this.upAprEarnings) uprateEar = this.upAprEarnings;
					else uprateEar = 0;
				}
				//vip加息券收益
				if(this.vipUpApr){
					if(this.vipUpAprEarnings) vipEar = this.vipUpAprEarnings;
					else vipEar = 0;
				}
				/*if(this.borrow.vipLevel){
					if(this.borrow.timeType == 1) vipEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.vipUprateApr)/360)*this.borrow.timeLimit;
					else vipEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.vipUprateApr)/12)*this.borrow.timeLimit;
				}*/

				return [
					{
						text:'项目基础收益：',
						money:((projectEar ? projectEar:0) *0.01),
					},
					{
						text:'项目加息收益：',
						money:((addEar ? addEar:0)*0.01),
					},
					{
						text:'VIP加息收益：',
						money:(vipEar ? vipEar:0),
					},
					{
						text:'加息券加息收益：',
						money:(uprateEar ? uprateEar:0),
					}
				]
			},
			expect:{
				get(){
					var sum = 0;
					if(this.useMoney){
						for(var i=0;i<this.earnings.length;i++){
							if(this.earnings[i].money){
								sum += parseInt(this.earnings[i].money*100)/100;
							}
						}
						return sum;
					}
					
				},
				set(){}
			},
			elist(){
				var earList = [];
				for(var i = 0;i<this.earnings.length;i++){
					if(this.earnings[i].money != 0) earList.push(this.earnings[i]);
				}
				return earList;
			}
		},
		methods:{
			//正常充值
			toRecharge() {
				this.$router.push({path:'/wxZsNewrecharge',query:{investUrl:this.$route.fullPath,thisUrl:this.$route.fullPath}});
			},

			//投资时余额不足去充值
			goRecharge(){
				var num1 = this.useMoney-this.borrow.useMoney - (this.amount ? this.amount:0)
				if((num1.toString()).indexOf(".") >= 0){
					if((num1.toString()).split(".")[1].length > 2){
						this.$router.push({path:'/wxZsNewrecharge',query:{investUrl:this.$route.fullPath,thisUrl:this.$route.fullPath,minRechargeMoney:(parseInt((this.useMoney-this.borrow.useMoney - (this.amount ? this.amount:0))*100)+1)/100}});
					}else{
						this.$router.push({path:'/wxZsNewrecharge',query:{investUrl:this.$route.fullPath,thisUrl:this.$route.fullPath,minRechargeMoney:this.useMoney-this.borrow.useMoney - (this.amount ? this.amount:0)}});
					}
				}else{
					this.$router.push({path:'/wxZsNewrecharge',query:{investUrl:this.$route.fullPath,thisUrl:this.$route.fullPath,minRechargeMoney:this.useMoney-this.borrow.useMoney - (this.amount ? this.amount:0)}});
				}
			},
			//投资前判断是否使用vip加息券
			showVipPacketTip(){
				if((this.canReceive || this.vipUpRateNum)){//有vip加息券
					if(!this.vipUpAprId || this.canReceive){//不使用 或 有福利未领取
						this.useVipPacket.isShow = true;
						return;
					}else{
						if(this.limitUpMoneyNumb == 0 || this.useMoney <= this.getCookie('limitUpMoneyNumb')){//判断加息金额与投资金额
							this.goInvest();
						}else{
							this.useVipPacketTip.isShow = true;
							return;
						}
					}
					return;
				}else{
					this.goInvest();
				}
			},

			//删除输入的金额
			deleAmount(){
				this.useMoney = ''
				this.clearData();
				if((this.useMoney-(this.amount ? this.amount:0)) > this.borrow.useMoney){
					this.enough = false;
				}else{
					this.enough = true;
				}
			},

			getFavorable(){
				this.postData('/financePlan/checkCoupon',(res,data) =>{ //红包接口
					if(data.resCode){
						this.hasRed = data.resData.redUseStatus;    // 0 不允许使用  1允许使用，但用户无此优惠券  2允许使用，用户有优惠券
						this.hasUprate = data.resData.uprateUserStatus;  // 0 不允许使用  1允许使用，但用户无此优惠券  2允许使用，用户有优惠券
						this.expireCount = data.resData.expireCount;    // 红包数量
						this.hasExperience = data.resData.experienceUseStatus;						
					}
				},{planId:this.uuid,assetManageType:3},1)
			},
			redUsable(){	//使用优惠
				if(!this.expireCount) return;
				this.showRateText = false;

				this.$router.push({path:'/wxInvestIn/wxNewInvestRedPacket' , query: { useMoney: this.useMoney ? this.useMoney:0,uuid: this.uuid,borrowDay:(this.borrow.timeType==0 ? (this.borrow.timeLimit*30):this.borrow.timeLimit),assetManageType:this.borrow.assetManageType}})
			},
			vipUpaprUsable(){	//使用vip加息券
				this.showRateText = false;

				this.$router.push({path:'/wxInvestIn/wxVipTicket' , query: { useMoney: this.useMoney ? this.useMoney:0,uuid: this.uuid,borrowDay:(this.borrow.timeType==0 ? (this.borrow.timeLimit*30):this.borrow.timeLimit),assetManageType:this.borrow.assetManageType}})
			},
			greater(ev){	//判断是否大于剩余金额
				this.clearData();
				if(this.useMoney>this.borrow.remainAmount){
					this.useMoney = this.borrow.remainAmount;
					Toast({
					  message: '剩余金额只有'+this.borrow.remainAmount+'元',
					  position: 'middle',
					  duration: 4000
					});
				}
				// 余额不足判断
				if((this.useMoney-(this.amount ? this.amount:0)) > this.borrow.useMoney){
					this.enough = false;
				}else{
					this.enough = true;
				}
				// 收益展示
				if(this.earnings[1].money > 0 || this.earnings[2].money > 0  || this.earnings[3].money > 0){
					this.showRateIco = true
				}else{
					this.showRateIco = false
				}
				if(this.useMoney == ''){
					this.clearData();
				}
			},

			goInvest(){ //点击出借按钮校验
				var that = this;
				this.useVipPacketTip.isShow = false;
				this.useVipPacket.isShow = false;
				// if (this.checkRedItem.id&&this.upAprId) {
				// 	this.toast({text:'红包与加息券不可同时使用'});
				// 	return;
				// }
				if(!this.useMoney){
					return
				}
				if(this.isFormat(this.useMoney,'输入金额格式错误！','positiveReg',1)) return;
				if((this.useMoney - this.amount)<=0){
					this.toast({text:'操作金额不能小于等于0'});
					return;
				}
				if(!this.isImg.isCheak){
					this.tips('请勾选服务协议条款');
					return;
				}
				if(this.useMoney < this.borrow.minAmount && !this.disabled){
					this.toast({text:'最低出借金额（'+ this.borrow.minAmount +'元）'})
					return;
				}
				if(this.borrow.maxAmount !=0 && (this.useMoney > this.borrow.maxAmount)){
					this.toast({text:'该项目最多出借（'+ this.borrow.maxAmount +'元）'})
					return;
				}
				if(this.useMoney > this.borrow.canInvest){
					this.maxInvest.isShow = true;
					this.maxInvestText = '根据您的风险测评结果，待收限额为'+this.borrow.maxInvest+'元，您还可再出借'+this.borrow.canInvest+'元！'
					return;
				}
				if((this.useMoney-this.amount)>this.hasMoney){	//判断是否显示弹出框
					this.showlayer.tips = true;
					return;
				}
				if(this.borrow.bankType == 1){
					this.toInvest();
				}else{
					this.getPhoneStatus()
				}
			},
			toInvestPoint() {
				if(this.type){
					this.redId = this.getCookie('redId');
					this.experId = '';
					this.upAprId = '';
				}else if(this.upApr){
					this.redId = '';
					this.experId = '';
					this.upAprId = this.getCookie('upAprId');
				}else{
					this.redId = '';
					this.experId = '';
					this.upAprId = '';
				}
				this.showList.isShow = false;
				this.postData('/financePlan/investPlan',(res,data) =>{  //出借接口
					if (data.resCode) {
						let score = data.resData.score;
						let ifDisplay = data.resData.ifDisplay;
						let introduction = data.resData.introduction;
						let picPath = data.resData.picPath;
						this.postData('/zs/invest/qryTenderRes',(res,data) =>{  //出借成功掉
							if (data.resCode) {
								this.$router.replace({path:'/wxInvestIn/wxZsInvestResult',query:{result:data.resData.tenderCode,tenderMes:data.resData.tenderMes,thisUrl:this.$route.fullPath,investMoney:this.useMoney - (this.amount ? this.amount:0),addTime:data.resData.addTime,repaymentTime:data.resData.repaymentTime,upRateTime:data.resData.upRateTime,name:this.borrow.name,score:score,picPath:picPath,introduction:introduction,ifDisplay:ifDisplay}});
								this.pwdStr.setTradePwd = '';  //清空密码
								this.againPwd.setTradePwd = '';
								this.finalPwd.setTradePwd = '';
							} else {
								this.pwdStr.setTradePwd = '';
								this.againPwd.setTradePwd = '';
								this.finalPwd.setTradePwd = '';
							}
						},{radomStr:data.resData.radomStr,type:1});

						this.pwdStr.setTradePwd = '';
						this.againPwd.setTradePwd = '';
						this.finalPwd.setTradePwd = '';
						// this.showList.isShow = false;
						
					}else {
						this.pwdStr.setTradePwd = '';
						this.againPwd.setTradePwd = '';
						this.finalPwd.setTradePwd = '';
						this.getborrow()
					}
				},{experienceStr:this.experId,redEnvelopeStr:this.redId,rateInterestStr:this.upAprId,money:this.useMoney,planId:this.uuid,tradePass:this.borrow.isSetTradePass == 0 ? this.againPwd.setTradePwd:this.finalPwd.setTradePwd, vipRateId:this.vipUpAprId},1)
			},
			tips(str){		//提示方法
				Toast({
					message: str,position: 'bottom',duration: 3000
				});
			},
			getborrow(){	//获取标的详情
				this.postData('/borrow/borrowDetail',(res,data) =>{
					if(data.resCode){
						this.borrow = data.resData.borrowDetail;
						this.hasMoney = data.resData.borrowDetail.useMoney;
						if(this.borrow.minAmount>this.borrow.remainAmount){
							this.useMoney = this.borrow.remainAmount;
							this.disabled = true;
						}

						//协议勾选
						if(data.resData.borrowDetail.isShowAgree == 0){
							this.isImg.isCheak = false;
						}else if(data.resData.borrowDetail.isShowAgree == 1){
							this.isImg.isCheak = true;
						}

						if(data.resData.borrowDetail.conformRiskTest == 0){
							this.ristResult.isShow = false;
						}else if(data.resData.borrowDetail.conformRiskTest == 1){
							this.ristResult.isShow = true;
							this.evaluationText = '根据您的风险测评结果，我们建议您加入'+ data.resData.borrowDetail.minTimeRiskTest + '天-'+ data.resData.borrowDetail.maxTimeRiskTest + '天的E计划'
						}

						//维护提示
						if(data.resData.borrowDetail.isSysProtect == 1){
							setTimeout(()=>{
								this.scrollTexts()	
							},100)
						}
					}
				},{uuid:this.uuid,assetManageType:3},1)
			},
			getVipPacket(){
				this.postData('/vip/gift/isNewGift',(res,data)=>{
					if(data.resCode){
						this.canReceive = data.resData.gift;
						this.vipUpRateNum = data.resData.vipUpRate;
					}
				},{})
			},
			getHrefData(name){
				if(this.$route.query[name]) this[name] = this.$route.query[name];
				// else if(this.$route.query.redFlag == num) this[name] =''
			},
			clearData(){	//清理数据
				this.delCookie('amount');
				this.delCookie('type');
				this.delCookie('redId');
				this.delCookie('upApr');
				this.delCookie('upAprId');
				this.delCookie('upAprEarnings');
				this.delCookie('unsedPacket');

				this.delCookie('vipUpApr');
				this.delCookie('vipUpAprId');
				this.delCookie('vipUpAprEarnings');
				this.delCookie('unsedVipPacket');
				this.delCookie('limitUpMoneyNumb');

				this.amount = '';
				this.type = '';
				this.redId = '';
				this.upApr = '';
				this.upAprId = '';
				this.upAprEarnings = '';
				this.unsedPacket = '';

				this.vipUpApr = '';
				this.vipUpAprId = '';
				this.vipUpAprEarnings = '';
				this.unsedVipPacket = '';
				this.limitUpMoneyNumb = '';
			},
			// 获取是否关闭债转短信
			getPhoneStatus() {
				this.postData('/planTender/getNotifyStatus',(res,data)=>{
					if (data.resData.notifyStatus) {
						MessageBox.alert('为了避免您在债权转让的时候收到短信，造成困扰，请放心关闭债转短信并验证短信验证码，具体项目进度我们另有短信通知', '温馨提示', {
							confirmButtonText: '确定'
						}).then(action => {
							this.changePhone()
						});
					} else {
						this.showList.isShow = true;
					}
				},{})
			},
			// 获取关闭债券验证码
			changePhone(){
                this.postData('/getCloseMsgCode',(data) =>{
                    if(data.data.resCode){
                        this.showMessage2.getMessage = true;
                    }
                },{},1)
			},
			// 关闭债权
			closeMessage () {
				this.postData('/closeNotify',(data) => {
                    if(data.data.resCode){
						this.showMessage2.getMessage = false;
                        this.toast({ text:data.data.resMsg });
                    }else{
                        this.showMessage2.getMessage = true;
                    }
                },{mobileCode:this.code2.msgCode},1)
			},

			// 去测评
			doOther(){
				this.$router.push('/wxRiskAssessment')
			},

			closeVipPacket(){
				this.useVipPacket.isShow = false;
				this.useVipPacketTip.isShow = false;

			},
			allowVipPacket(){
				this.delCookie('unsedVipPacket');
				this.unsedVipPacket = 0;
				this.useVipPacket.isShow = false;
			},

			// 去列表页
			evaluationFun(){
				this.$router.replace('/wxInvest')
			},
			//隐藏弹框
			maxInvestFun(){
				this.maxInvest.isShow = false
			},
			scrollTexts(){
				var that = this
				var s_div = $("#scrollDiv");
				var s_td = $("#td1");
				var s_td2 = $("#td2");
				
				s_td2.html(s_td.html());
				
				var s_wdiv = parseInt(s_div.css("width"));
				var s_wtd =  parseInt(s_td2.css("width"));
				
				var s_iwtd =  s_wtd;
				var s_icontent = s_td.html();
				if(s_wtd > s_wdiv){
					setInterval(function(){
						if( s_wtd > s_wdiv && (s_wtd - s_wdiv) <= s_div[0].scrollLeft ){
							s_td.html(s_td.html() + s_icontent);
							s_wtd = s_wtd + s_iwtd;
						}
						s_div[0].scrollLeft++;
					},50);
				}
			},
			toShopping(){   // 跳转积分商城
            if(this.osType){
                this.PassValue('GoodsList_6');
            } else {
                this.$router.push({path:'/intGoodList',query:{classify:6}})
            }
        }
		},
		components:{
			popTips,
			popMessage,
			cheakImg,
			earningsTips,
			wxDirectional,
			passwordDialog,
			wxAuthorize
		},
		activated(){
			this.uuid = this.$route.query.uuid;
			this.amount = this.getCookie('amount')
			this.type = this.getCookie('type')
			this.redId = this.getCookie('redId')
			this.upApr = this.getCookie('upApr')
			this.upAprId = this.getCookie('upAprId')
			this.upAprEarnings = this.getCookie('upAprEarnings')
			this.unsedPacket = this.getCookie('unsedPacket')

			this.vipUpApr = this.getCookie('vipUpApr');
			this.vipUpAprId = this.getCookie('vipUpAprId');
			this.vipUpAprEarnings = this.getCookie('vipUpAprEarnings');
			this.unsedVipPacket = this.getCookie('unsedVipPacket');
			this.limitUpMoneyNumb = this.getCookie('limitUpMoneyNumb');

			if((this.useMoney-(this.amount ? this.amount:0)) > this.borrow.useMoney){
				this.enough = false;
			}else{
				this.enough = true;
			}

		},
		destroyed(){

			this.clearData();
		},
		created(){
			this.uuid = this.$route.query.uuid;
			this.clearData();
			this.getborrow();
			this.getFavorable();
			this.getVipPacket();
			this.postData('/getFormToken',(res,data) => {
				if(data.resCode){
					this.formToken = data.resData.formToken;
				}
			},{tokenId:this.fingerprint})	//设备id
		}
	}
</script>

<style lang="scss" scoped>
	
	#investMoney{
		font-family: PingFangSC-Regular;
		letter-spacing:0.37px;
		background:#f5f5f5;
		.nothing{
			height: 0.266667rem;
			width: 100%;
		}
		.mg_tips{
			width: 100%;
			height: 0.84rem;
			background: #FFF7EA;
			padding-left: 0.4rem;
			position: relative;
			.div_ico{
				width: 0.4rem;
				height: 0.84rem;
				background:url(https://aliyunsso.edspay.com/web/wx/account/accountModify/tip.png) left center no-repeat;
				background-size: 0.373333rem 0.373333rem;
				float: left;
				margin-right: 0.226667rem;
			}
			.div_tip{
				width: 8.733333rem;
				height: 0.84rem;
				font-size: 0.32rem;
				color: #FFB53F;
				line-height: 0.84rem;
				overflow: hidden;
				white-space: nowrap;
				position: relative;
				.main_info{
					width: 8.7rem;
					height: 0.84rem;
				}
			}
		}
		.select-tip {
			font-size: .293333rem;
			padding-right: 0.4rem;
			line-height: .4rem;
			margin-top: .133333rem;
			color: #808080;
		}
		.remain_invest_money{
			widows: 100%;
			height: 1.466667rem;
			background: #ffffff;
			line-height: 1.466667rem;
			line-height: 1.466667rem;
			padding-left: 0.4rem;
			padding-right: 0.533333rem;
			margin-bottom: 0.266667rem;
			span{
				display: inline-block;
				color: #333333;
			}
			.title_left{
				font-size: 0.346667rem;
				float: left;
			}
			.title_right{
				font-size: 0.32rem;
				float: right;
			}
		}
		.top{
			height: 3.866667rem;
			width: 100%;
			background: #ffffff;
			padding-left: 0.4rem;
			margin-bottom: 0.266667rem;
			.invest_title{
				font-size: 0.346667rem;
				color: #333333;
				padding-top: 0.586667rem;
				margin-bottom: 0.4rem;
			}
			.importMoney{
				height: 1.5rem;
				span{
					font-size: 0.613333rem;
					color: #333333;
					position: relative;
				    top: -.2rem;
				}
				input{
					font-family: DIN-Medium;
					font-size: 1.146667rem;
					color: #333333;
					width: 7.466667rem;
					line-height: 1.5rem;
				}
				i{
					display: inline-block;
					width: 0.4rem;
					height: 0.4rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/delete.png) no-repeat;
					background-size: 0.4rem 0.4rem;
					float: right;
					margin-right:0.4rem;
					position: relative;
					top: 0.546667rem;
				}
			}
			.zs_money{
				height: 0.933333rem;
				line-height: 0.933333rem;
				font-size: 0.32rem;
				color: #808080;
				position: relative;
				i{
					font-size: 0.32rem;
					color: #151515;
				}
				span{
					margin-left: 0.533333rem;
					color: #508CEE;
				}
			}
		}
		.available_money{
			height: 1.226667rem;
			width: 100%;
			line-height: 1.226667rem;
			font-size: 0.32rem;
			color: #808080;
			text-indent: 0.4rem;
		}
		::-webkit-input-placeholder { /* WebKit browsers */   //设置input placeholder字体颜色
		  font-size: 0.666667rem;
		} 
		:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		  font-size: 0.666667rem;
		} 
		::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		  font-size: 0.666667rem;
		} 
		:-ms-input-placeholder { /* Internet Explorer 10+ */ 
		  font-size: 0.666667rem;
		}
		.agreement{
			padding-left: 0.4rem;
			margin-bottom: 0.6rem;
		}
		.xieyi {
			display: inline-block;
			height:0.426667rem;
			font-size: 0.293333rem;
			color: #A3A3A4;
			vertical-align: text-top;
			padding-left: .066667rem;
			width: 8.36rem;
			span {
				color: #508cee;
			}
		}
		#layer{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
			position:fixed;
			z-index:999;
			.content{
				box-sizing:border-box;
				padding:0 0.413333rem 0.64rem;
				position:absolute;
				top:45%;
				left:50%;
				margin:-2.8rem 0 0 -3.8rem;
				width:7.493333rem;
				height:5.733333rem;
				border-radius:0.266667rem;
				background:#fff;
				font-size:0.373333rem;
				line-height:0.533333rem;
				.title{
					height:1.2rem;
					line-height:1.2rem;
					text-align:center;
					color:#333;
					font-size: 0.4rem;
				}

				p{
					padding:0.293333rem 0 0.133333rem;
					color:#808080;
				}
				.money{
					color:#333;
					span{
						color:#508cee;
					}
				}
				.btns{
					padding-top:1.44rem;
					span{
						float:left;
						height:0.96rem;
						width:2.986667rem;
						font-size: 0.426667rem;
						line-height:0.96rem;
						text-align:center;
						color:#ff5b4c;
						border:0.013333rem solid #ff5b4c;
						border-radius:0.106667rem;
					}
					span:last-child{
						float:right;
						background:#ff5b4c;
						color:#fff;
					}
				}
			}
		}
		// line-height:0.44rem;
		// font-size: 0.32rem;
		.hasMoney{
			color:#808080;
			font-size: 0.32rem;
			padding: 0.32rem 0;
			padding-left:0.4rem;
		}
		.red_packet{
			padding-left: 0.4rem;
			background: #ffffff;
			margin-bottom: 0.266667rem;
			li{
				position: relative;
				height: 1.586667rem;
				.img_ico{
					width: 0.8rem;
					height: 1.586667rem;
					margin-right: 0.4rem;
				}
				.img_ico_redPacket{
					background: url(https://aliyunsso.edspay.com/web/wx/invest/investRedPacket.png) center center no-repeat;
					background-size: 0.8rem 0.8rem;
				}
				.img_ico_vip{
					background: url(https://aliyunsso.edspay.com/web/wx/invest/investVipIco.png) center center no-repeat;
					background-size: 0.8rem 0.8rem;
				}
				.middle_text{
					width: 3.6rem;
					height: 100%;
					.big_title{
						font-family: PingFangSC-Medium;
						font-size: 0.373333rem;
						color: #333333;
						padding: 0.333333rem 0 0.213333rem 0;
					}
					.big_title.oneText{
						line-height: 1.586667rem;
						padding: 0;
					}
					.red_mount{
						font-size: 0.32rem;
						color: #808080;
					}
				}
				.show_next_ico{
					height: 100%;
					line-height:1.586667rem;
					font-size: 0.32rem;
					color: #808080;
				}
				.has_red_use{
					padding-right: 0.933333rem;
				}
				.show_next_ico.no_red_use{
					margin-right: 0.95rem;
					color: #4C7DE9;
				}
				.redText{
					color: #FF5B4C;
				}
				.getBtn{
					i{
						display:inline-block;
						height: 0.64rem;
						width: 1.666667rem;
						background: #DFC281;
						border-radius: 0.106667rem;
						line-height: 0.64rem;
						text-align:center;
						color: #fff;
					}
				}
			}
			li.bgIco{
				background: url(https://aliyunsso.edspay.com/web/wx/invest/investToNext.png) 8.8rem center no-repeat;
				background-size: 0.4rem 0.4rem;
			}
		}
		.money_rate{
			padding-left: 0.4rem;
			background: #ffffff;
			margin-bottom: 0.866667rem;
			li{
				position: relative;
				height: 1.466667rem;
				line-height: 1.466667rem;
				padding-right: 0.533333rem;
				font-size: 0.346667rem;
				color: #333333;
				i{
					display: inline-block;
					font-size: 0.32rem;
					color: #FF5B4C;
				}
				i.black_text{
					color: #333333;
				}
				span{
					background:url(https://aliyunsso.edspay.com/web/wx/invest/investToNext.png) center center no-repeat;
					background-size: 0.4rem 0.4rem;
					width: 0.4rem;
					height: 0.4rem;
					position: relative;
					top: .08rem;
					display: inline-block;
					margin-left: 0.133333rem;
				}
				span.trans{
					transform:rotate(90deg);
					-ms-transform:rotate(90deg); /* Internet Explorer */
					-moz-transform:rotate(90deg); /* Firefox */
					-webkit-transform:rotate(90deg); /* Safari 和 Chrome */
					-o-transform:rotate(90deg); /* Opera */
				}
			}
		}
		.rate_list{
			padding: 0.2rem 0.4rem 0.2rem 0;
			background:#ffffff;
			.rate_box{
				width:50%;
				font-size: 0.32rem;
				color: #808080;
				text-align: left;
				padding: 0.1rem 0;
			}
			.rate_box:nth-child(even){
				text-align: right;
			}
		}
		.infoList{
			margin-bottom:0.266667rem;
			padding-left:0.4rem;
			background:#fff;
			li{
				height:1.346667rem;
				line-height:1.346667rem;
				font-size:0.346667rem;
				color:#333;
				position: relative;
				.tips{
					padding-right:1.2rem;
					color:#808080;
				}
			}
			li.bgimg{
				background: url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 8.586667rem 0.5rem no-repeat;
				background-size: 0.213333rem 0.4rem ;
			}
			li:last-child{
				border-bottom:0;
			}
		}
		.earnings{
			padding: 0 0.4rem 0;
			color:#808080;
			img{
				height:0.4rem;
				width:0.4rem;
				margin-right:0.133333rem;
			}
			span{
				color:#508cee;
			}
		}
		.loginBtn{
			width:8.773333rem;
			display:block;
			margin:0 auto;
			margin-top:0.5rem;
			font-size: 0.426667rem;
			height:	1.066667rem;
			text-align: center;
			line-height:1.066667rem;
			border-radius:0.533333rem;
			color:#fff;
			margin-bottom: .35rem;
			background: #F9D8D8;
		}
		.btns_color_on{
		  background: #F14B4B !important;
		}
		.activeBtn{
			background:#ff5a4a;
		}
		.btnTips{
			margin-top:0.4rem;
			text-align:center;
			line-height:0.9rem;
			font-size:0.266667rem;
			color: #9b9b9b;
			.protocol{
				color:#508cee;
			}
		}
	}
</style>
