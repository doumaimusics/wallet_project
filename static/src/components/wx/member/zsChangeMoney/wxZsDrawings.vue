<template>
	<div id="zsdrawings">
		<div v-title>{{logoMsg}}</div>
		<div class="mg_tips clear" v-if="userData.isSysProtect == 1">
			<div class="div_ico"></div>
			<div class="div_tip" id="scrollDiv">
				<div style="main_info">
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
					<div class="name">{{userData.bankName}}</div>
					<span>尾号{{userData.bankNo ? userData.bankNo:0 | lastFour}}</span>
				</div>
			</div>
			<!-- <p class="tips">保障您的资金安全，提现遵守同卡进出原则。<span></span></p> -->
			<div class="money clear">
				<span class="fl">提现金额(元)</span>
				<input  @keyup="checkMoney" class="fl" v-model="rushMoney" :placeholder="'请输入提现金额('+(userData.minCashAmount ? userData.minCashAmount:0)+'元起提)'" :maxlength="8">
				<i v-if="rushMoney" @click="deleAmount"></i>
				<span class="all_drawing" @click="allDrawing">全部提现</span>
			</div>
			<p class="tips">
				<!-- <img src="https://aliyunsso.edspay.com/web/wxUpdate/for_popwindow.png" alt="" style="vertical-align:text-bottom"> -->
				可提现余额(元)：<span>{{userData.withdrawMoney ? userData.withdrawMoney:0 | moneyFormat}}</span>
				<router-link :to="{path:'/wxZsNewDrawingsRecord'}" class="record" tag="span">提现记录</router-link>
			</p>
		</div>
		<div class="padBottom">
			<div @click="moneyActive" class="goBtn btns_color_on" :class="{btns_color_off:!rushMoney}">提现</div>
			<div class="sweet_tips">
				<p>温馨提示：</p>
				<p>1. 5万以下提现可当日到账，5万以上大额提现需在工作日7:00-16:30银行受理后到账；</p>
				<p>2. 若提现金额较大，可拆分成多笔操作；</p>
				<p>3. 当天充值金额不能立即提现，需要等待T+1个工作日，银行清算完成后才能提现；</p>
			</div>
		</div>
		<div class="zs_tip"><span></span>如有疑问，请前往 <router-link to="/wxMyAccount/wxHelpCenters" tag="i">帮助中心</router-link></div>
		<pop-tips v-if="showThis.isShow" :showThis="showThis"></pop-tips>
		<wx-message v-if="showMessage.getMessage" :again="moneyActive" :logo="logo" :phone="userData.mobile" :showMessage="showMessage" :code="code" :confirm="confirm"></wx-message>
		<def-tip v-if="showTip.isShow" :showTip="showTip" :cause="cause" :flag="1"></def-tip>
	</div>
</template>

<script>
    import wxHeader from '../../../wxHeader';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import popTips from './popupTips';	//弹框提示
	import wxMessage from './wxAddMessage';	//输入短信验证码
	import defTip from './wxDefTip';	//失败弹框
	export default {
		mixins:[verify],
		data(){
			return{
				logoMsg:'提现',
				lastMony:'1,234.80',
				rushMoney:null,
				logo:'提现验证码',	//弹框头部
				code:{
					msgCode:'',
				},
				formToken:'',	//初始化获取的值
				userData:{},
				showThis:{
					isShow:false,	//显示提示弹框
				},
				showMessage:{
					getMessage:false,  	//显示短信框
				},
				showTip:{
					isShow:false,	//显示失败弹框
				},
				lastUrl:'', 	//上个页面的地址
			}
		},
		methods:{
			//清除输入
			deleAmount(){
				this.rushMoney = ''
			},
			//全部提现
			allDrawing(){
				this.rushMoney = this.userData.withdrawMoney;
			},

			checkMoney (e) {
				this.rushMoney=this.rushMoney.replace(/[^\d\.]/g,'');
				this.rushMoney = this.rushMoney.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
				this.rushMoney = this.rushMoney.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1")
		    	// if(this.rushMoney>this.userData.withdrawMoney){
		    	// 	this.rushMoney = this.userData.withdrawMoney;
		    	// }
			  },
			getMsg(){
				this.postData('/recharge/getVailcodeCzb',(res,data) => {
					if(data.resCode){
						this.showMessage.getMessage = true;
					}
				},{money:this.rushMoney})
			},
			confirm(){		//提现请求
				this.showMessage.getMessage = false;
				this.postData('/cash/doCashCzb',(res,data) => {
					if(data.resCode){
						this.cause = data.resMsg;
						this.$router.push({path:'/wxZsMoneyResult',query:{cause:this.cause,result:data.resData.status,goUrl:this.lastUrl,source:2,rechargeMoney:this.rushMoney}})
					}else{
						this.showTip.isShow = true;
						this.cause = data.resMsg;
					}
				},{money:this.rushMoney,formToken:this.userData.formToken,valicode:this.code.msgCode})
			},
			moneyActive(){		
				console.log(this.userData.minCashAmount)
				if(!this.rushMoney) return;
				if(this.isFormat(this.rushMoney,'请输入正确格式的金额','hasDecimals',1)) return;
				if((this.rushMoney-this.userData.minCashAmount)<0){
					this.toast({text:'提现金额最低'+this.userData.minCashAmount+'元'});
					return;
				}
				if(this.rushMoney>this.userData.withdrawMoney){
					this.toast({text:'提现金额不能大于可提现金额'});
					return;
				}
				this.postData('/cash/getVailcodeCzb',(res,data) => {	//获取短信验证码
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
			wxHeader,
			popTips,
			defTip,
			wxMessage,
		},
		created(){
			this.lastUrl = this.$route.query.thisUrl;
			this.postData('/cash/toCashCzb',(res,data) => {
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
		}
	}
</script>

<style lang="scss" scoped>
	#zsdrawings{
		line-height:0.44rem;
		font-size:0.32rem;
		position: relative;
		.none{
			width: 100%;
			height: 0.4rem;
		}
		.mg_tips{
			width: 100%;
			height: 0.84rem;
			background: #FFF7EA;
			padding-left: 0.4rem;
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
		.padTop{
			padding-bottom:0.2rem;
			.bank{
				height:1.866667rem;
				padding:0.4rem 0 0.3rem 0.4rem;
				background:#fff;
				margin-bottom: 0.4rem;
				.bankLogo{
					height:0.92rem;
					width:0.92rem;
					margin-right:0.133333rem;
					img{
						width:100%;
					}
				}
				.bankInfo{
					line-height:0.6rem;
					.name{
						font-size:0.426667rem;
						color:#494743;
					}
					span{
						display:block;
						font-size:0.32rem;
						color:#808080;
					}
				}
			}
			.tips{
				padding:0 0.4rem;
				font-size:0.32rem;
				color:#808080;
				margin-bottom: 0.933333rem;
				img{
					height:0.4rem;
					width:0.4rem;
					margin-right:0.133333rem;
				}
				span{
					color: #333333;
				}
				span.record{
					float: right;
					font-size: 0.32rem;
					color: #508CEE;
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
				margin-bottom: 0.266667rem;
				span{
					color:#333;
					padding-right:0.4rem;
				}
				span.all_drawing{
					font-size: 0.32rem;
					color: #508CEE;
					padding-right: 0 !important;
				    float: right;
				}
				i{
					width: 0.4rem;
					height: 0.4rem;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/delete.png) no-repeat;
					background-size: 0.4rem 0.4rem;
					float: left;
					position: relative;

				}
				i{
					color:#808080;
				}
				input{
					height:0.44rem;
					width:52%;
					font-size: 0.346667rem;
				}
			}
			.time{
				color:#ff5d42;
			}
		}
		.padBottom{
			width:9.2rem;
			margin: 0 auto;
		    margin-bottom: 3rem;
			.text{
				color:#9b9b9b;
				padding-bottom:0.133333rem;
				span{
					float: left;
					padding-right:0.08rem;
					width:7%;
				}
				.text{
					width:93%;
				}
			}
		}
		.goBtn{
			display:block;
			text-align:center;
			width:9.2rem;
			margin: 0 auto;
			margin-bottom:0.666667rem;
			height:1.066667rem;
			border-radius: 0.533333rem;
			color:#fff;
			line-height:1.066667rem;
			font-size:0.426667rem;
		}
		.tips{
			padding-top: 0.533333rem;
		}
		.sweet_tips{
			font-size: 0.32rem;
			color: #9B9B9B;
			p{
				// margin-bottom: 0.133333rem;
				line-height: .57rem;
			}
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
			background:#d8d8d8!important;
		}
		.zs_tip{
			width: 100%;
			text-align: center;
			position: relative;
			// bottom: 0.4rem;
			// left: 0;
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
	}
</style>