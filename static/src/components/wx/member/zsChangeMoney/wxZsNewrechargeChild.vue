<template>
	<div id="drawings">
		<div class="mg_tips clear" v-if="userData.isSysProtect == 1">
			<div class="div_ico"></div>
			<div class="div_tip" id="scrollDiv">
				<div>
					<div id="td1">{{userData.protectMes}}</div>
					<div id="td2"></div>
				</div>
			</div>
		</div>
		<div class="none" v-else></div>
		<div class="padTop">
			<div class="bank clear">
				<div class="bankLogo fl"><img :src="userData.bankPicPath" alt=""></div>
				<div class="bankInfo fl">
					<div class="name">{{userData.bankName}}(尾号{{userData.bankNo ? userData.bankNo:0 | lastFour}})</div>
					<span class="card_tip">单笔限额{{userData.singleLimit | changeWan}}，单日限额{{userData.dailyLimit | changeWan}}</span>
				</div>
				<router-link to="/wxOpenBank" tag="span" class="fr">限额说明</router-link>
			</div>
			<div class="money clear">
				<span class="fl">充值金额(元)</span>
				<input @keyup="greater($event)" class="fl" v-model="rushMoney" :placeholder="'请输入充值金额('+(userData.minReAmount ? userData.minReAmount:0)+'元起充)'" :maxlength="8">
				<i v-if="rushMoney" @click="deleAmount"></i>
				
			</div>
			<div class="tips">
				可用余额(元)：<span class="span1">{{userData.useMoney ? userData.useMoney:0 | moneyFormat}}</span>
				<router-link :to="{path:'/wxZsNewRechargeRecord'}" tag="span" class="span2">充值记录</router-link>
			</div>
		</div>
		<div class="padBottom">
			<div @click="moneyActive" class="goBtn btns_color_on" :class="{btns_color_off:!rushMoney}">充值</div>	
		</div>
		<div class="sweet_tips">
			<p>温馨提示：</p>
			<p>1.当天充值的金额，T+1（T为工作日）才能发起提现；</p>
			<p>2.充值金额超过单笔/单日限额，请使用转账充值；</p>
			<p>3.充值手续费由E都市钱包为您缴纳；</p>
		</div>
		<div class="zs_tip"><span></span>如有疑问，请前往 <router-link to="/wxMyAccount/wxHelpCenters" tag="i">帮助中心</router-link></div>
		<wx-wholesale v-if="showThis.isShow" :showThis="showThis" :cardId="userData.bankNo | lastFour" :bankName="userData.bankName" :goRecharge="goRecharge"></wx-wholesale>
		<wx-message v-if="showMessage.getMessage" :again="moneyActive" :logo="logo" :phone="userData.mobile" :showMessage="showMessage" :code="code" :confirm="confirm"></wx-message>
		<def-tip v-if="showTip.isShow" :showTip="showTip" :cause="cause" :flag="0" :goRecharge="goRecharge"></def-tip>
	</div>
</template>

<script>
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import wxWholesale from './wxWholesale';	//大额弹框
	import wxMessage from './wxAddMessage';	//输入短信验证码
	import defTip from './wxDefTip';	//失败弹框
	export default {
		mixins:[verify],
		props:['goBigRecharge'],
		data(){
			return{
				lastMony:'1,234.80',
				rushMoney:null,
				formToken:'',	//初始化获取的值
				cause:'', 	//失败原因
				lastUrl:'', 	//上一个页面的路由
				investUrl:null,
				minReAmount:0, 	//最小提现金额
				userData:{},
				showThis:{
					isShow:false,	//大额提示弹框
				},
				showMessage:{
					getMessage:false,	//短信验证码弹框
				},
				showTip:{
					isShow:false,	//显示失败弹框
				},
				code:{
					msgCode:'',
				},
				logo:'充值验证码',
				minRechargeMoney:'',//上个页面传来需要充值的最小金额
				mgTip:true,//浙商系统维护提醒
				timer:{
					time1:null
				}
			}
		},
		methods:{
			//清除已输入金额
			deleAmount(){
				this.rushMoney = null
			},
			//大额转账跳转
			goRecharge(){
				this.goBigRecharge();
				this.showThis.isShow = false;
				this.showTip.isShow = false;
			},
			//输入位数控制
			greater(){
				this.rushMoney=this.rushMoney.replace(/[^\d\.]/g,'');
				this.rushMoney = this.rushMoney.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
				this.rushMoney = this.rushMoney.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1")
				// if(this.rushMoney.length > 8){
				// 	this.rushMoney=this.rushMoney.substr(0,8)
				// }
			},
			getMsg(){
				this.postData('/recharge/getVailcodeCzb',(res,data) => {
					if(data.resCode){
						this.showMessage.getMessage = true;
					}
				},{money:this.rushMoney})
			},
			confirm(){		//充值请求
				this.showMessage.getMessage = false;
				this.postData('/recharge/doRechargeCzb',(res,data) => {
					if(data.resCode){
						this.cause = data.resMsg;
						this.$router.replace({path:'/wxZsMoneyResult',query:{cause:this.cause,result:data.resData.status,rechargeMoney:this.rushMoney,goUrl:this.lastUrl,investUrl:this.investUrl,source:1}})
					}else{
						this.showTip.isShow = true;
						this.cause = data.resMsg;
					}
				},{money:this.rushMoney,formToken:this.userData.formToken,valicode:this.code.msgCode})
			},
			moneyActive(){		
				if(!this.rushMoney) return;
				if(this.isFormat(this.rushMoney,'请输入正确格式的金额','hasDecimals',1)) return;
				if(parseInt(this.rushMoney) < this.userData.minReAmount){
					this.toast({text:'单笔充值，需'+this.userData.minReAmount+'元起充！'});
					return;
				}
				if(parseInt(this.rushMoney) < this.userData.minReAmount){
					this.toast({text:'充值金额要大于起充金额'});
					return;
				}
				if(parseInt(this.rushMoney)>this.userData.singleLimit){
					this.showThis.isShow = true;
					return;
				}
				this.postData('/recharge/getVailcodeCzb',(res,data) => {	//获取短信验证码
				    console.log(res,data)
					if(data.resCode){
						this.showMessage.getMessage = true;
						this.userData.formToken = data.resData.formToken;
					}
				},{money:this.rushMoney,bankCode:this.userData.bankCode},1)
				
			},

			//维护提示
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
			}
		},
		components:{
			wxWholesale,
			wxMessage,
			defTip,
		},
		created(){
			this.postData('/recharge/toRechargeCzb',(res,data) => {
				if(data.resCode){
					this.userData = data.resData;

					//维护提示
					if(data.resData.isSysProtect == 1){
						setTimeout(()=>{
							this.scrollTexts()
						},100)
					}
				}
			},{},1)
			this.lastUrl = this.$route.query.thisUrl;	//获取上个页面的地址

			if(this.$route.query.investUrl) this.investUrl = this.$route.query.investUrl;	//获取上个页面的地址
			if(this.$route.query.minRechargeMoney){
				this.rushMoney = this.$route.query.minRechargeMoney
			}
		},
	}
</script>

<style lang="scss" scoped>
	#drawings{
		line-height:0.44rem;
		font-size:0.32rem;
		width: 10.0rem;
		position: relative;
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
		.none{
			width: 100%;
			height: 0.4rem;
		}
		.padTop{
			padding-bottom:0.933333rem;
			.bank{
				height:1.866667rem;
				padding:0.4rem 0 0.3rem 0.4rem;
				background:#fff;
				margin-bottom: 0.4rem;
				.bankLogo{
					height:0.92rem;
					width:0.92rem;
					margin-right:0.266667rem;
					img{
						width:100%;
					}
				}
				.bankInfo{
					line-height:0.6rem;
					.name{
						font-size:0.426667rem;
						color:#333333;
					}
					span{
						display:block;
						font-size:0.32rem;
						color:#808080;
					}
					.card_tip{
						font-size: 0.32rem;
						color: #808080;
					}
				}
				.fr{
					font-size: 0.32rem;
					color: #608DFF;
					padding-top: 0.3rem;
					padding-right: 0.4rem;
				}
			}
			.tips{
				padding:0 0.4rem;
				font-size:0.32rem;
				color:#808080;
				overflow: hidden;
				span{
					font-size: 0.32rem;
				}
				span.span2{
					float: right;
					color: #508CEE;
				}
				span.span1{
					color: #333333;
				}
			}
			.usable{
				padding-left:0.4rem;
				color:#808080;
				height:1.066667rem;
				line-height:1.066667rem;
				font-size:0.346667rem;
			}
			.money{
				padding: 0.493333rem 0.4rem;
				background:#fff;
				margin-bottom: 0.266667rem;
				span{
					color:#333;
					padding-right:0.4rem;
				}
				input{
					height:0.44rem;
					width:45%;
					font-size: 0.346667rem;
				}
				i{
					width: 0.4rem;
					height: 0.4rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/delete.png) no-repeat;
					background-size: 0.4rem 0.4rem;
					float: right;
					position: relative;
					margin-right: 0.16rem;
				}
			}
			.time{
				color:#ff5d42;
			}

		}
		.padBottom{
			width:9.2rem;
			margin: 0 auto 0.666667rem;
			.text{
				color:#9b9b9b;
				padding-bottom:0.133333rem;
				span{
					float: left;
					padding-right:0.08rem;
					width:5%;
				}
				.text{
					width:95%;
				}
			}
		}
		.sweet_tips{
			padding: 0 0.4rem;
			font-size: 0.32rem;
			color: #9B9B9B;
			margin-bottom: 2.8rem;
			p{
				margin-bottom: 0.133333rem;
			}
		}
		.zs_tip{
			width: 100%;
			text-align: center;
			position: relative;
			line-height: 0.8rem;
			font-size: 0.293333rem;
			color: #A3A3A4;
			
			span{
				width: 0.32rem;
				height: 0.32rem;
				display: inline-block;
				position: relative;
				background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/questionIco.png) no-repeat;
				background-size: 100% 100%;
				top: .05rem;
				margin-right: .1rem;
			}
			i{
				color: #508CEE;
			}
		}
		.goBtn{
			display:block;
			text-align:center;
			width:9.2rem;
			margin: 0 auto;
			margin-bottom:0.4rem;
			height:1.066667rem;
			border-radius:0.533333rem;
			color:#fff;
			line-height:1.066667rem;
			font-size:0.426667rem;
		}
		.btnTips span{
			display:block;
			text-align:center;
			font-size:0.266667rem;
			line-height:0.8rem;
			color: #9b9b9b;

		}
		.btnTips .protocol{
			color:#508cee;
			padding-bottom:0.666667rem;
		}
		// .activeBtn{
		// 	background:#d8d8d8!important;
		// }
	}
</style>