<template>
	<div id="investMoney">

		<!-- <router-view :phone="0" :showlayer="showlayer"></router-view> -->
		<wx-header :logo="logoMsg"></wx-header>
		<div class="top">
			<div class="name"><span v-if="borrow.bankType == 2" >存管</span><span>{{borrow.name}}</span></div>
			<div class="info clear">
				<div class="apr fl">预期年化收益：<span>{{borrow.apr ? borrow.apr:0}}</span>%<i v-if="borrow.addApr">+{{borrow.addApr}}%</i></div>
				<div class="time fr">项目期限 <span>{{borrow.timeLimit}}</span>{{borrow.timeType == '1' ? '天':'个月'}}</div>
			</div>
			<div class="money info">剩余金额金额：{{borrow.remainAmount ? borrow.remainAmount:0  | changeWan}}元</div>
		</div>
		<div class="hasMoney">可用余额：<span>{{hasMoney | moneyFormat}}</span>元</div>
		<div class="importMoney">
			<span>金额</span>
			<input @keyup="greater($event)" type="number" v-model="useMoney" placeholder="输入出借金额" :disabled="disabled">
		</div>
		<ul class="infoList lists">
			<li @click="redUsable('hasRed',1,'wxInvestRed')" :class="{bgimg:hasRed == 2}">
				<div class="ruleTitle fl">使用红包</div>
				<div v-if="hasRed == 2" class="tips fr">{{redMoney ? redMoney:'请选择'}}</div>
				<div v-else-if="hasRed == 1" class="tips fr">暂无可用</div>
				<div v-else class="tips fr">不可用</div>
			</li>
			<li @click="redUsable('hasUprate',2,'wxInvestUpApr')" :class="{bgimg:hasUprate == 2}">
				<div class="ruleTitle fl">使用加息券</div>
				<div v-if="hasUprate == 2" class="tips fr">{{upApr ? (upApr+'%'):'请选择'}}</div>
				<div v-else-if="hasUprate == 1" class="tips fr">暂无可用</div>
				<div v-else class="tips fr">不可用</div>
			</li>
			<li  @click="redUsable('hasExperience',3,'wxInvestExper')" :class="{bgimg:hasExperience == 2}">
				<div class="ruleTitle fl">使用体验金</div>
				<div v-if="hasExperience == 2" class="tips fr">{{experMoney ? experMoney:'请选择'}}</div>
				<div v-else-if="hasExperience == 1" class="tips fr">暂无可用</div>
				<div v-else class="tips fr">不可用</div>
			</li>
		</ul>
		<div class="earnings clear" @click="showEar.isShow = true" v-if="useMoney">
			<div class="fl">
				<img src="https://aliyunsso.edspay.com/web/wx/invest/question.png" alt="">
				预期收益：<span>{{expect | moneyFormat}}</span>元
			</div>
			<div class="red fr">你需要支付：<span>{{useMoney - (redMoney ? redMoney:0)}}</span>元</div>
		</div>
		<div class="loginBtn" :class="{activeBtn:useMoney}" @click="goInvest">立即出借</div>
		<!-- <div v-if="borrow.bankType == 2" class="btnTips">
			<cheak-img :cheak="isImg" class="ic_1"></cheak-img>点击出借表示同意
			<router-link :to="{path:'wxZSdealAgreement'}" class="protocol" tag="span">《资金存管服务协议》</router-link>
		</div> -->
		<pop-tips v-if="showlayer.tips" :bankType="borrow.bankType" :showThis="showlayer" :code="code" :money="useMoney-hasMoney"></pop-tips>
		<earnings-tips v-if="showEar.isShow" :earnings="earnings" :showThis="showEar"></earnings-tips>
		<pop-message v-if="showMessage.getMessage" :phone="borrow.zsBindPhone" :showMessage="showMessage" :num="1" :code="code" :confirm="toInvest" :again="goInvest"></pop-message>
		<wx-directional v-if="showDirec.isShow" :confirm="toInvest" :direcPwd="direcPwd" :showDirec="showDirec"></wx-directional>
		<password-dialog v-if="showList.isShow" :showList="showList" :borrow="borrow" :againPwd="againPwd" :pwdStr="pwdStr" :finalPwd="finalPwd" :toInvestPoint="toInvest" :hidePhone="borrow.hidePhone" :hideRealname="borrow.hideRealname" :isSetTradePass="borrow.isSetTradePass"></password-dialog>
	</div>
</template>

<script>
	import wxHeader from '../../wxHeader';
	import popTips from './invest/popupTips';
	import earningsTips from './invest/earningsTips';
	import popMessage from './invest/popupMessage';
	import wxDirectional from './invest/wxDirectional';	//定向标弹框
	import cheakImg from '../../public/wx/wxCheakImg';	//引入图片Cheak
	import verify from '../../../common/wx/verification';	//引入表单验证
	import passwordDialog from '../../public/wx/tradePassword';	//密码组件
	// import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';		//弹框

	export default {
		mixins:[verify],
		data(){
			return {
				showlayer:{
					layer:0,
					tips:false
				},
				investData:[
					'/sina/invest/tender',
					'/zs/invest/tender'
				],
				showEar:{
					isShow:false	//显示预期收益
				},	
				logoMsg:'出借',
				vipApr:[0,0.3,0.5,0.8,1,1.5,1.5,1.5,1.5],
				ischangeMoney:false,
				hasRed:false, 	//是否有可用红包
				hasUprate:false, 	//是否有可用加息券
				hasExperience:false, 	//是否有可用体验券
				useMoney:null,	//金额
				redMoney:0,		//使用红包金额
				redId:'',		//使用红包Id数组
				upApr:0,		//使用加息券额度
				upAprId:'',		//使用加息券Id
				experMoney:0,		//使用体验金金额
				experId:'',		//使用体验券Id数组
				uprate:null, 		//加息券
				upAprEarnings:null, 	//加息金额
				uuid:'',
				borrow:{},		//标的详情
				formToken:'',		//防止表单重复提交
				hasMoney:'',		//可用金额
				isImg:{
					isCheak:true	//是否勾选
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
				showList:{  //密码框展示
					isShow: false
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
				passValue:'',
			}
		},
		computed:{
			earnings(){		//计算预期收益
				var projectEar = 0,addEar = 0,uprateEar = 0,vipEar = 0;
				if(this.borrow.timeType == 1) projectEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.apr)/360)*this.borrow.timeLimit;
				else projectEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.apr)/12)*this.borrow.timeLimit;

				if(this.borrow.addApr){
					if(this.borrow.timeType == 1) addEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.addApr)/360)*this.borrow.timeLimit;
					else addEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.addApr)/12)*this.borrow.timeLimit;
				}
				if(this.upApr){
					/*if(this.borrow.timeType == 1) uprateEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.upApr)/360)*this.borrow.timeLimit;
					else uprateEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.upApr)/12)*this.borrow.timeLimit;*/
					if(this.$route.query.upAprEarnings) uprateEar = this.$route.query.upAprEarnings;
					else uprateEar = 0;
				}
				if(this.borrow.vipLevel){
					if(this.borrow.timeType == 1) vipEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.vipUprateApr)/360)*this.borrow.timeLimit;
					else vipEar = (((parseInt(this.useMoney) + (this.experMoney ? this.experMoney:0))*this.borrow.vipUprateApr)/12)*this.borrow.timeLimit;
				}
				return [
					{
						text:'项目预期收益：',
						money:(projectEar*0.01).toFixed(2),
					},
					{
						text:'项目加息预期收益：',
						money:((addEar ? addEar:0)*0.01).toFixed(2),
					},
					{
						text:'加息券预期收益：',
						money:((uprateEar ? uprateEar:0)).toFixed(2),
					},
					{
						text:'vip预期收益：',
						money:((vipEar ? vipEar:0)*0.01).toFixed(2),
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
		},
		methods:{
			getTwo(money){
				console.log(money);
				return money.toFixed(2);
				/*money =  Math.floor(money * 100) / 100 

				var n = 2;
				money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
				var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
				var t = "";
				for (var i = 0; i < l.length; i++) {
				t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "" : "");
				}
				return  t.split("").reverse().join("") + "." + r; */
			},
			getFavorable(){
				this.postData('/borrow/check/favorable',(res,data) =>{
					if(data.resCode){
						this.hasRed = data.resData.redUseStatus;
						this.hasExperience = data.resData.experienceUseStatus;
						this.hasUprate = data.resData.uprateUserStatus;
					}
				},{uuid:this.uuid},1)
			},
			redUsable(name,num,toUrl){	//使用优惠
				if(!(this[name] == 2)) return;

				if(!this.useMoney){
					this.tips('请输入金额')
					return
				}
				if(this.isFormat(this.useMoney,'输入金额格式错误！','positiveReg',1)) return;
				this.$router.replace({path:'/wxInvestIn/'+toUrl , query: { assetManageType:this.borrow.assetManageType,useMoney: this.useMoney, urlData:'/red/envelope/tenderList' ,uuid: this.uuid,flag:num,borrowDay:(this.borrow.timeType==0 ? (this.borrow.timeLimit*30):this.borrow.timeLimit)}})
			},
			greater(ev){	//判断是否大于剩余金额
				this.clearData();
				if(this.useMoney>this.borrow.remainAmount){
					this.useMoney = this.borrow.remainAmount;
				}
			},	
			goInvest(){
				var that = this;
				if(!this.useMoney){
					return
				}
				if(this.isFormat(this.useMoney,'输入金额格式错误！','positiveReg',1)) return;
				if((this.useMoney - this.redMoney)<=0){
					this.toast({text:'操作金额不能小于等于0'});
					return;
				}
				if(!this.isImg.isCheak){
					this.tips('请勾选服务协议条款');
					return;
				}
				if(this.useMoney < this.borrow.minAmount && !this.disabled){
					this.toast({text:'出借金额不能小于最低出借（'+ this.borrow.minAmount +'元）'})
					return;
				}
				if(this.borrow.maxAmount !=0 && (this.useMoney > this.borrow.maxAmount)){
					this.toast({text:'出借金额不能大于出借上限金额（'+ this.borrow.maxAmount +'元）'})
					return;
				}
				if((this.useMoney-this.redMoney)>this.hasMoney){	//判断是否显示弹出框
					this.showlayer.tips = true;
					return;
				}
				if(this.borrow.bankType == 1){
					this.toInvest()
				}else{
					this.showList.isShow = true;
					// this.postData('/zs/invest/sendPhone',(res,data) => {	//发送获取短信验证码请求
					// 	if(data.resCode){
					// 		this.formToken = data.resData.formToken;
					// 		this.showMessage.getMessage = true;
					// 	}
					// },{phone:this.borrow.borrowDetail},1)
				}
			},
			toInvest(){
				var borrowTenderToken = (new Date().getTime()+this.uuid);
				this.postData(this.investData[this.borrow.bankType-1],(res,data) => {		//发送出借请求
					if(this.borrow.bankType == 1){
						if(data.resCode){
							console.log(111)
							this.setCookie('borrowTenderToken',borrowTenderToken)
							this.setCookie('investUrl',this.$route.fullPath)
							// window.location.replace(data.resData.url);
							window.location.href = data.resData.url;
						}
					}else{
						if(data.resCode){
							this.postData('/zs/invest/qryTenderRes',(res,data) => {

								this.$router.replace({path:'/wxInvestIn/wxZsInvestResult',query:{result:data.resData.tenderCode,tenderMes:data.resData.tenderMes,thisUrl:this.$route.fullPath}});
								this.pwdStr.setTradePwd = '';
								this.againPwd.setTradePwd = '';
								this.finalPwd.setTradePwd = '';
								this.showList.isShow = false;
								
							},{radomStr:data.resData.radomStr})
						} else {
							this.pwdStr.setTradePwd = '';
							this.againPwd.setTradePwd = '';
							this.finalPwd.setTradePwd = '';
							this.showList.isShow = false;
						}
					}
				},{borrowTenderToken:borrowTenderToken,redEnvelopeStr:this.redId,experienceStr:this.experId,rateInterestStr:this.upAprId,money:this.useMoney,uuid:this.uuid,tokenId:this.fingerprint,pwd:this.$route.query.direcPwd,mobileCode:this.code.msgCode,formToken:this.formToken,tradePass:this.borrow.isSetTradePass == 0 ? this.againPwd.setTradePwd:this.finalPwd.setTradePwd},1)
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
						this.hasMoney = data.resData.borrowDetail.useMoney
						if(this.borrow.minAmount>this.borrow.remainAmount){
							this.useMoney = this.borrow.remainAmount;
							this.disabled = true;
						}
					}
				},{uuid:this.uuid,assetManageType:1},1)
			},
			getHrefData(name,num){
				if(this.$route.query[name]) this[name] = this.$route.query[name];
				else if(this.$route.query.redFlag == num) this[name] =''
			},
			clearData(){	//清理数据
				this.$route.query.redMoney = 0;
				this.$route.query.redId = null;
				this.$route.query.upApr =null;
				this.$route.query.upAprId =null;
				this.$route.query.experMoney =null;
				this.$route.query.experId =null;
				this.$route.query.upAprEarnings =null;

				this.redMoney = 0;
				this.redId = null;
				this.upApr =null;
				this.upAprId =null;
				this.experMoney =null;
				this.experId =null;
				this.upAprEarnings =null;
			},
		},
		components:{
			wxHeader,
			popTips,
			popMessage,
			cheakImg,
			earningsTips,
			wxDirectional,
			passwordDialog
		},
		activated(){
			this.uuid = this.$route.query.uuid;
			this.getHrefData('redMoney',1)
			this.getHrefData('redId',1)
			this.getHrefData('upApr',2)
			this.getHrefData('upAprId',2)
			this.getHrefData('experMoney',3)
			this.getHrefData('experId',3)
			this.getHrefData('upAprEarnings',3)
		},
		created(){
			this.uuid = this.$route.query.uuid;
			this.clearData();
			this.getborrow();
			this.getFavorable();
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
		
		letter-spacing:0.37px;
		background:#f5f5f5;
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
		line-height:0.44rem;
		font-size: 0.32rem;
		.top{
			height:3.733333rem;
			background:#ff5b4c;
			color:#fff;
			padding-left:0.4rem;
			padding-top:0.266667rem;
			.name{
				font-size:0.32rem;
				line-height:0.613333rem;
				padding-bottom:0.4rem;
				span{
					background:#e65245;
					display:inline-block;
					height:0.613333rem;
					border-radius:0.08rem;
					margin-right:0.133333rem;
					padding: 0 0.16rem 0;
				}
				
			}
			.info{
				padding-bottom:0.506667rem;
				font-size:0.346667rem;
				line-height:0.493333rem;
				font-family: DIN-Regular;
				.apr{
					span{
						font-size:0.613333rem;
					}
				}
				.time{
					padding: 0.053333rem 0.4rem 0 0;
					span{
						font-size:0.613333rem;
					}
				}
			}
		}
		.hasMoney{
			color:#808080;
			font-size: 0.32rem;
			padding: 0.32rem 0;
			padding-left:0.4rem;
		}
		.importMoney{
			padding:0.533333rem 0 0.533333rem 0.4rem;
			font-size:0.373333rem;
			line-height:0.533333rem;
			background:#fff;
			span{
				color:#808080;
				padding-right:0.186667rem;
			}
			input{
				height:0.533333rem;
				width:7.466667rem;
			}
			::-webkit-input-placeholder { /* WebKit browsers */ 	//设置input placeholder字体颜色
				color:#d8d8d8;
			} 
			:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
				color:#d8d8d8;
			} 
			::-moz-placeholder { /* Mozilla Firefox 19+ */ 
				color:#d8d8d8;
			} 
			:-ms-input-placeholder { /* Internet Explorer 10+ */ 
				color:#d8d8d8;
			}
		}
		.infoList{
			margin:0.533333rem 0 0.266667rem 0;
			padding-left:0.4rem;
			background:#fff;
			li{
				height:1.346667rem;
				line-height:1.346667rem;
				font-size:0.346667rem;
				color:#333;
				border-bottom:1px solid #c8c7cc;
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
			width:90%;
			display:block;
			margin:0 auto;
			margin-top:0.666667rem;
			background:#d8d8d8;
			font-size: 0.426667rem;
			height:1.066667rem;
			text-align: center;
			line-height:1.066667rem;
			border-radius:4px;
			color:#fff;
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

