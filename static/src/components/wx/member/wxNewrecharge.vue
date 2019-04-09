<template>
	<div id="newRecharge">
		<wx-header :logo="logoMsg"></wx-header>
		<router-link :to="{path:'/wxMoneyRecord',query:{title:'tab-container1'}}" class="record" tag="div">记录</router-link>
		<div class="padTop">
			<div class="money clear">
				<!-- <span class="fl">金额</span> -->
				<input @keyup="greater($event)" class="fl" type="number" v-model="rushMoney" :placeholder="'请输入充值金额('+(userData.minReAmount ? userData.minReAmount:0)+'元起充)'"/>
			</div>
			<div class="money clear">
				<span class="fl">可用余额</span>
				<i class="fr">{{userData.useMoney ? userData.useMoney:0 | moneyFormat}}元</i>
			</div>
		</div>
		<div class="padBottom">
			<a href="javaScript:;" @click="moneyActive" class="goBtn" :class="{activeBtn:(rushMoney-userData.minReAmount)>=0}">充值</a>	
			<div v-if="userData.fluxStatus == 1" class="agreement">同意<span><router-link to="/wxInvestAgreement" tag="span">《出借服务协议》</router-link><router-link to="/wxValueAgreement" tag="span">《增值服务协议》</router-link></span></div>
			<div class="text">温馨提示：</div>
			<div class="text">
				<span>1、</span>
				<p>充值手续费由E都市钱包为您缴纳，用户无需承担。</p>
			</div>
			<div class="text">
				<span>2、</span>
				<p>大额充值，建议登录<i>www.edspay.com</i>使用网银充值。</p>
			</div>
			<div class="text">
				<span>3、</span>
				<p>充值资金首先进入“汇添富基金”，第二天即开始计息，随存随取，余额不出借也可以产生收益。</p>
			</div>
			<router-link to="/wxShortcutCard" class="text" tag="div">
				<span>4、</span>
				<p><i>银行卡限额及相关说明</i></p>
			</router-link>
		</div>
		<!-- <img class="img1" src="https://aliyunsso.edspay.com/web/wx/account/wxNewrecharge.png" alt=""> -->
	</div>
</template>

<script>

	import wxHeader from '../../wxHeader';
	import verify from '../../../common/wx/verification';	//引入表单验证
	import { MessageBox } from 'mint-ui';
	export default {
		mixins:[verify],
		data(){
			return{
				logoMsg:'充值',
				lastMony:'1,234.80',
				rushMoney:null,
				formToken:'',	//初始化获取的值
				lastUrl:'',		//上个页面的地址
				userData:{},
				bank:{
					imgSrc:'',
					name:'工商银行',
					cardNum:'3143',
					hasCard:true,
					todayMax:10000,
					thisMax:5000,
					sumMax:20000
				},
			}
		},
		methods:{
			moneyActive(){
				if(this.isFormat(this.rushMoney,'请输入正确格式的金额','hasDecimals',1)) return;
				if(this.rushMoney < this.userData.minReAmount){
					this.toast({text:'请输入大于'+this.userData.minReAmount+'元的金额'})
					return;
				}
				if((this.rushMoney-this.userData.minReAmount)<0) return;
				this.postData('/recharge/doRechargeSina',(res,data) => {
					if(data.resCode){
						this.setCookie('newrechargeUrl',this.lastUrl);
						// window.location.replace(data.resData.url);
						window.location.href = data.resData.url;
					}else{
						MessageBox.confirm(data.resMsg,{
							showCancelButton: false,
							closeOnClickModal: false,
							showConfirmButton: true,
						}).then(action => {
							this.$router.go(-1)
						});
					}
				},{money:this.rushMoney,reqType:'WX',formToken:this.userData.formToken})
			},
			greater(ev){
				if(this.rushMoney >999999999){
					this.rushMoney = 10000000000;
				}
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.lastUrl = this.$route.query.thisUrl;
			this.postData('/recharge/toRechargeSina',(res,data) => {
				if(data.resCode){
					this.userData = data.resData.model;
				}else{
					MessageBox.confirm(data.resMsg,{
						showCancelButton: false,
						closeOnClickModal: false,
						showConfirmButton: true,
					}).then(action => {
						this.$router.go(-1)
					});
				}
			},{reqType:'WX'})
		},
		mounted(){
			this.postData('/account/banklist',(res,data) =>{
				if(data.resData){
					if(data.resData.bankNum==0){
						this.toast({text:'您尚未绑卡'});
						this.$router.replace({path:'/wxMyAccount/wxBindingCard',query:{thisUrl:this.$route.fullPath}});
					}
				}
			},{})
		}
	}
</script>

<style lang="scss" scoped>
	#newRecharge{
		line-height:0.44rem;
		font-size:0.32rem;
		.record{
			height:1.333333rem;
			font-size:0.36rem;
			line-height:1.333333rem;
			padding: 0 0.4rem;
			color:#ff5b4c;
			position: fixed;
			z-index:100;
			top:0;
			right:0;
		}
		.padTop{
			padding-bottom:0.546667rem;
			.bank{
				height:2.0rem;
				padding:0.4rem 0 0.3rem 0.4rem;
				background:#fff;
				.bankLogo{
					height:1.2rem;
					width:1.2rem;
					margin-right:0.133333rem;
				}
				.bankInfo{
					line-height:0.6rem;
					.name{
						font-size:0.4rem;

						color:#333;
					}
					span{
						display:block;
						color:#808080;
					}
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
				padding: 0.373333rem 0.4rem;
				background:#fff;
				margin-top:0.4rem;
				span{
					color:#333;
					padding-right:0.4rem;
				}
				i{
					color:#808080;
				}
				input{
					height:0.44rem;
					width:70%;
				}
				::-webkit-input-placeholder { /* WebKit browsers */ 
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
			.time{
				color:#ff5d42;
			}

		}
		.agreement{
			height:1rem;
			color:#808080;
			font-size:0.346667rem;
			line-height:1rem;
			span{
				color:#508cee;
			}
		}
		.padBottom{
			width:8.773333rem;
			margin: 0 auto;
			.text{
				color:#9b9b9b;
				padding-bottom:0.133333rem;
				span{
					float: left;
					padding-right:0.08rem;
					width:7%;
				}
				i{color:#ff5b4c;}
				.text{
					width:94%;
				}
			}
		}
		.goBtn{
			display:block;
			text-align:center;
			width:8.773333rem;
			margin: 0 auto;
			margin-bottom:0.4rem;
			height:1.066667rem;
			border-radius:0.106667rem;
			background:#E5E5E5;
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
		.activeBtn{
			background:#ff5b4c;
		}
		.img1{
			margin:0.266667rem;
			width:95%;
		}
	}
</style>
<style>
.mint-msgbox-message{
	line-height: .64rem;
}
.mint-msgbox-content {
    padding: .666667rem;
	min-height: 2.133333rem;
	font-size: .373333rem
}
</style>
