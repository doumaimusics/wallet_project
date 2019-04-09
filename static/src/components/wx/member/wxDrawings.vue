<template>
	<div id="drawings">
		<div v-title>{{logoMsg}}</div>
		<wx-header :logo="logoMsg"></wx-header>
		<router-link :to="{path:'/wxSinaMoneyRecord'}" class="record">记录</router-link>
		<div class="padTop">
			<div @click="cardList" class="money card clear">
				<span class="fl">银行卡</span>
				<img class="fl" :src="thisCard.logoPicUrl" alt="">
				<span class="fl">尾号({{thisCard.hiddenCardNumber}})</span>
			</div>
			<div class="money clear">
				<input @keyup="greater($event)" class="fl" type="number" v-model="addMoney" :placeholder="'请输入提现金额('+(drawings.minCashAmount ? drawings.minCashAmount:0)+'元起提)'">
			</div>
			<div class="withdrawals clear">
				<span class="fl">可提现：{{drawings.useMoney ? drawings.useMoney:0 | moneyFormat}}元</span>
				<h4 v-if="balance" class="fr moneyBtn" @click="confirmBtn">余额转移<i></i></h4>
			</div>
		</div>
		<div v-if="addMoney" class="tips">单笔手续费:{{drawings.cashFee}}元/笔，<i v-if="(addMoney-drawings.cashFee)>0">实际到账金额:<span>{{(addMoney-drawings.cashFee) | moneyFormat}}元</span></i><i v-else>提现金额不足支付手续费</i></div>
		<div class="padBottom">
			<a @click="goDrawings" href="javaScript:;" class="goBtn" :class="{activeBtn:(addMoney-drawings.cashFee)>0}">提现</a>
			<div class="text">温馨提示：</div>
			<div class="text">
				<span>1、</span>
				<p>到账时间:当天15:00前发起提现，次日到账；15:00后发起提现，隔一天到账。因托管账户（新浪支付独立托管账户）到不同提现银行有所差异，以实际到账时间为准。</p>
			</div>
			<div class="text">
				<span>2、</span>
				<p>限额：单笔最高5万，每日累计提现不超过50万（无提现次数限制）。</p>
			</div>
			<div class="text">
				<span>3、</span>
				<p>手续费：{{drawings.cashFee ? drawings.cashFee:0}}元/笔</p>
			</div>
			<router-link to="/wxThreeCard" class="text" tag="div">
				<span>4、</span>
				<p><i>了解银行卡三类账户</i></p>
			</router-link>
		</div>
		<mt-popup
		  v-model="popupVisible"
		  position="bottom">
		  <div class="btns clear">
		  	<span @click="popupVisible = false" class="fr">关闭</span>
		  </div>
		  <mt-picker :slots="slots" @change="onValuesChange" valueKey="hiddenCardNumber"></mt-picker>
		</mt-popup>
		<public-dialog v-if='showThis.isShow' :confirmBtn="confirmBtn" :showThis="showThis" :btn="1" :text="openZcText" :btnText="btnText"></public-dialog>
	</div>
</template>

<script>
	import { Popup } from 'mint-ui';
	import { Picker } from 'mint-ui';
	import wxHeader from '../../wxHeader';
	import verify from '../../../common/wx/verification';	//引入表单验证
	import publicDialog from '../../wx/member/invest/wxPublicDialog.vue'; //弹框组件
	export default {
		mixins:[verify],
		data(){
			return{
        		balance: sessionStorage.getItem("balance") == "true" ? true : false,       //  余额转移开关
				showThis: {
					isShow: false,
				},
				openZcText:'余额转移功能上线，可将普通账户余额转移到存管账户，免手续费哦！',
				btnText: ['取消','立即转移'],
				logoMsg:'提现',
				lastMony:'1,234.80',
				popupVisible:false,
				addMoney:null,
				drawings:{},
				formToken:'',		//初始化token
				lastUrl:'',		//上个页面的地址
				slots: [
			        {
			            values: [{name:'2015-04'}, {name:'2015-05'}, {name:'2015-06'}],
			            className: 'slot1',
			            textAlign: 'center',
			        }
				],
				thisCard:{logoPicUrl:''},
			}
		},
		methods:{
			confirmBtn() {
				this.$router.push("/moneyTransfer");
			},
			greater(){
				if(this.addMoney>this.drawings.useMoney){
					this.addMoney = this.drawings.useMoney;
				}
				
			},
			onValuesChange(picker, values){
				this.thisCard = values[0];
				console.log(this.thisCard)
			},
			goDrawings(){
				if(this.addMoney<=this.drawings.cashFee) return;
				if(this.isFormat(this.addMoney,'请输入正确的提现金额','hasDecimals',1)) return;
				if((this.addMoney-this.drawings.minCashAmount)<0){
					this.toast({text:'提现金额小于最小提现金额'});
					return;
				}
				if(this.addMoney>this.drawings.useMoney){
					this.toast({text:'提现金额不能超过可用余额'});
					return;
				}
				this.postData('/cash/doCashSina',(res,data) =>{
					if(data.resCode){
						// window.location.replace(data.resData.url);
						window.location.href = data.resData.url;
					}
				},{money:this.addMoney,reqType:'WX',sinaBankId:this.thisCard.sinaBankId,formToken:this.formToken},1)
			},
			getData(){
				this.postData('/cash/toCashSina',(res,data) => {
					if(data.resCode){
						this.drawings = data.resData;
						this.slots[0].values = data.resData.bankList;
						this.thisCard = data.resData.bankList[0];
						this.formToken = data.resData.formToken;
					}
				},{},1)
			},
			cardList(){
				this.popupVisible = true;
			}
		},
		components:{
			wxHeader:wxHeader,
			publicDialog
		},
		created(){
			this.lastUrl = this.$route.thisUrl;
			this.getData();
			if(this.balance){
				this.showThis.isShow = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mint-popup-bottom{
		width:100%;
	}
	#drawings{
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
		min-height:17.786667rem;
		background:#f5f5f5;
		line-height:0.44rem;
		font-size:0.32rem;
		.btns{
			height:0.8rem;
			line-height:0.8rem;
			padding:0 0.4rem;
			font-size:0.346667rem;
			/* span{
				padding: 0 0.4rem;
			} */
		}
		.padTop{
			padding-top:0.3rem;
			.usable{
				padding-left:0.4rem;
				padding-bottom:0.24rem;
				color:#808080;
				line-height:0.44rem;
			}
			.money{
				
				padding:0.35rem 0.4rem;
				margin-bottom:0.266667rem;
				background:#fff;
				img{
					margin-top:-0.28rem;
					height:0.95rem;
					width:0.95rem;
					margin-right:0.266667rem;
				}
				span{
					color:#333;
					padding-right:0.4rem;
				}
				input{
					height:0.44rem;
					width:70%;
				}
				h4{
					color:#808080;
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
			.withdrawals{

				margin-bottom: .76rem;
				width: 100%;
				padding:0 0.4rem; 
				font-family: PingFangSC-Regular;
				font-size: .32rem;
				color: #808080;
				.moneyBtn{
					font-family: PingFangSC-Regular;
					font-size: .346667rem;
					color: #608DFF;
					letter-spacing: 0;
					i{
						display: inline-block;
						width: 0;
						height: 0;
						border-width: .16rem 0 .16rem .16rem;
						border-style: solid;
						border-color: transparent transparent transparent #608DFF;
						vertical-align: middle;
						margin-left: .05rem;
						margin-top: -0.066667rem;
					}
				}
			}
			.time{
				padding:0.213333rem 0 0 0.4rem;
				color:#ff5d42;
			}

		}
		.tips{
			text-align: center;
			padding-right:0.4rem;
			color:#808080;
			span{
				color:#ff5a4a;
			}
		}
		.padBottom{
			padding-top:0.4rem;
			width:8.773333rem;
			margin: 0 auto;
			.text{
				color:#9b9b9b;
				padding-bottom:0.133333rem;
				span{
					float: left;
					padding-right:0.08rem;
				}
				i{color:#ff5b4c;}
				.text{
					width:95%;
				}
			}
		}
		.goBtn{
			display:block;
			text-align:center;
			width:8.773333rem;
			margin: 0 auto 0.8rem;
			height:1.066667rem;
			border-radius:0.106667rem;
			background:#d8d8d8;
			color:#fff;
			line-height:1.066667rem;
			font-size:0.426667rem;
		}
		.activeBtn{
			background:#ff5b4c
		}
	}
</style>