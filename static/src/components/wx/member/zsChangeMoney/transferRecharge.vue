<template>
	<div class="transfer">
		<div class="wrapper">
			<div class="tips clear">
				<img class="img1" src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/stepsOne.png" alt="">
				<img class="img2" src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/stepsTwo.png" alt="">
				<!-- <span><img src="https://aliyunsso.edspay.com/web/wx/account/cardIcon/sig.png" alt=""></span>
				<p>如遇快捷充值限额较低或充值异常问题，您可以使用开通存管时绑定的银行卡，转账到您的浙商银行存管小账户，完成充值。</p> -->
			</div>
			<div class="card_info">
				<div class="card">
					<div class="fl ico1">
						<img :src="cardInfo.bankPicPath" alt="">
					</div>
					<div class="fl card_detail">{{cardInfo.bankName}}</div>
					<div class="card_name"><span>姓名</span>{{cardInfo.realNameHide}}</div>
					<div class="card_name"><span>银行账号</span>{{cardInfo.bankNo}}</div>
				</div>
				<div class="middle">
					<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/lowBtn.png" alt="">
				</div>
				<div class="zsCard">
					<div class="fl ico1 ico2"></div>
					<div class="fl card_detail">
						<p class="p_det1">浙商银行</p>
					</div>
					<div class="card_name no_btm"><span>姓名</span>{{cardInfo.userName}}</div>
					<div class="card_name no_btm epx_h">
						<span class="sp1">存管帐户</span><span class="span2">{{cardInfo.virEcardNo}}</span>
						<span class="sp3">
							<img v-clipboard:copy="cardInfo.virEcardNo" v-clipboard:success="onCopy" src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/copyBtn.png" alt="">
						</span>
					</div>
					<div class="card_name clear"><span class="span1">开户支行</span><div class="zsbox2">{{cardInfo.branch}}</div></div>
				</div>
			</div>
			<div class="step_three">
				<div><img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/stepsThree.png" alt=""></div>
				<p>转账成功后，自动增加账户可用余额可在<span>“我的”</span>页面中查看</p>
			</div>
		</div>
		<div class="demo">
			<div class="nothing"></div>
			<div class="demo_title"><img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/rechargeDemo.png" alt=""></div>
			<ul>
				<li class="bdr-b" @click="toRechageProcess('mobile')">手机银行转账流程</li>
				<li @click="toRechageProcess('online')">网上银行转账流程</li>
			</ul>
			<div class="nothing"></div>
		</div>
		<div class="last_tips">
			<p class="pp2"><img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/warnTips.png" alt=""></p>
			<p>1、仅支持使用存管账户绑定的银行卡进行转账充值；</p>
			<p>2、具体各银行卡的转账限额与到账时间取决于对应银行；</p>
			<p>3、充值过程中，转账手续费以银行规定为准，E都市钱包不收取任何手续费。</p>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import wxToast from '../../../../common/wx/wxToast'
	import wx from 'weixin-js-sdk'; //引入微信sdkwxIssueClassify
	export default{
		mixins:[wxToapp,wxToast],
		data(){
			return{
				cardInfo:{},
				officialAccountsData: {},
			}
		},
		methods:{
			getData(){
				this.getAppData('/recharge/transferRecharge',(data) =>{
					if (data.resCode) {
						this.cardInfo = data.resData;
					}
				},{},1)
			},
			onCopy (e) {
			  this.toast({
			  	text: '复制成功'
			  })
			},
			goAppFun(){
                if(this.osType){ // 移动端原生客服
                    this.PassValue('Service');
                } 
            },
            toRechageProcess(param) {
            	this.toApp('toWeb|转账充值|https://'+ window.location.host +'/#/TransferProcess?TransferProcessType='+param,{path:'/TransferProcess',query:{TransferProcessType:param}})
            },
		},
		components:{
			
		},
		created(){
			this.getData();
		}
	}
</script>
<style lang="scss" scoped>
	.transfer{
		font-family: PingFangSC-Regular;
		background: #ffffff;
		width: 10.0rem;
		height: 34.5rem;
		.wrapper{
			padding: 0.533333rem 0.613333rem 0.666667rem;
			.tips{
				width: 100%;
				background: #ffffff;
				text-align: center;
				position: relative;
				img.img1{
					width: 7.56rem;
					height: 5.973333rem;
					margin-bottom: 1.333333rem;
				}
				img.img2{
					width: 6.253333rem;
					height: 1.6rem;
				}
			}
			.card_info{
				position: relative;
				padding-top: 0.56rem;
				padding-bottom: 0.76rem;
				h3{
					font-size: 0.4rem;
					color: #333333;
					text-align: center;
				}
				.fl{
					float: left;
				}
				.ico1{
					text-align: center;
					width: 0.666667rem;
					height: 0.666667rem;
					border-radius: 50%;
					img{
						width: 0.533333rem;
						height: 0.533333rem;
						margin-top: 0.066667rem;
					}
				}
				.ico2{
					background: url(https://aliyunsso.edspay.com/web/wx/account/cardIcon/zsCard.png) center center no-repeat;
					background-size: 0.533333rem 0.533333rem;
				}
				.card_detail{
					width: 6.4rem;
					padding-left: 0.266667rem;
					height: 0.666667rem;
					line-height: 0.666667rem;
					font-size: 0.373333rem;
					color: #FFFFFF;
					margin-bottom: 0.533333rem;
				}
				.card_name{
					width: 100%;
					clear: both;
					font-family: PingFangSC-Regular;
					color: #FFFFFF;
					font-size: 0.346667rem;
					height: 0.493333rem;
					line-height: 0.493333rem;
					margin-bottom: 0.213333rem;
					span{
						font-size: 0.32rem;
						margin-right: 0.32rem;
					}
					span.span2{
						font-size: 0.346667rem;
						margin-right: 1.2rem;
					}
					span.sp3{
						font-size: 0.346667rem;
						margin-right: 0rem;
					}
					img{
						width: 1.653333rem;
						height: 0.986667rem;
					}
					span.span1{
						float: left;
					}
				}
				.card_name.no_btm{
					margin-bottom: 0;
				}
				.card_name.epx_h{
					height: 0.986667rem;
					line-height: 0.986667rem;
				}
				.card{
					width: 8.773333rem;
					height: 3.68rem;
					margin: 0 auto;
					background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/cardBlue.png) no-repeat;
					background-size: 100%;
					padding: 0.563rem 0.5rem 0 0.613333rem;
					
					.card_num{
						font-family: DIN-Regular;
						font-size: 0.48rem;
						color: #FFFFFF;
						text-align: right;
						width: 100%;
						clear: both;
					}
				}
				.middle{
					text-align: center;
					margin-top: 0.133333rem;
					margin-bottom: 0.24rem;
					img{
						width: 0.56rem;
						height: 1.173333rem;
					}
				}
				.zsCard{
					width: 8.773333rem;
					height: 4.48rem;
					margin: 0 auto;
					background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/cardRecharge.png) no-repeat;
					background-size: 100% 100%;
				    padding: 0.56rem 0.426667rem 0px 0.613333rem;
				}
			}
			.zsbox2{
			    float: left;
			    text-align: justify;
		        width: 5.8rem;
			}
			.step_three{
				width: 100%;
				text-align: center;
				img{
					width: 2.453333rem;
					height: 1.12rem;
				}
				p{
					font-family: PingFangSC-Regular;
					font-size: 0.373333rem;
					color: #333333;
					line-height: 0.733333rem;
					text-align: justify;
					span{
						color: #ff5b4c;
					}
				}
			}
		}
		.demo{
			width: 100%;
			.demo_title{
				width: 100%;
				text-align:center;
				margin-top: 0.4rem;
				margin-bottom: 0.133333rem;
				img{
					width: 4.346667rem;
					height: 0.56rem;
				}
			}
			ul{
				padding-left: 0.4rem;
				li{
					height: 1.333333rem;
					line-height: 1.333333rem;
					font-size: 0.373333rem;
					color: #333333;
					position: relative;
					background: #fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 8.9rem 0.52rem no-repeat;
					background-size: 0.133333rem 0.28rem;
				}
			}
			.nothing{
				width: 100%;
				height: 0.266667rem;
				background: #f8f8f8;
			}
		}
		.last_tips{
			position: relative;
			padding: 0.8rem 0.466667rem 0;
			p{
				font-size: 0.346667rem;
				color: #808080;
				text-align: justify;
				line-height: .55rem;
				margin-bottom: 0.306667rem;
			}
			p.pp2{
				text-align: center;
				margin-bottom: 0.2rem;
				img{
					width: 3.573333rem;
					height: 0.56rem;
				}
			}
		}
		.service{
			width: 100%;
			height: 0.533333rem;
			margin-bottom: 0.786667rem;
			div{
				width: 1.733333rem;
				height: 0.533333rem;
				margin:0 auto;
				background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/service.png) left center no-repeat;
				background-size: 0.4rem 0.4rem;
				text-align: right;
				font-size: 0.32rem;
				color: #508CEE;
				line-height: 0.533333rem;
			}
		}
	}
</style>