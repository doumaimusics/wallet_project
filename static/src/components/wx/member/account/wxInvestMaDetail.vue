<template>
	<div id="MaDetail">
		<div class="top">
			<div class="title">{{investData.borrowName}}</div>
			<div class="basic_info clear">
				<div class="basic_left">
					<p class="p2">{{investData.apr | returnFloat(1)}}<span>%</span><span v-if="investData.addApr">+{{investData.addApr | returnFloat(1)}}%</span></p>
					<p class="p1">参考年化</p>
				</div>
				<div class="basic_right">
					<p class="p1"><i>授权服务期</i> <span>{{investData.timeLimit}}{{investData.borrowTimeType == 0 ? '个月':'天'}}</span></p>
					<p class="p1"><i>还款方式</i> <span>{{investData.styleStr}}</span></p>
				</div>
			</div>
		</div>
		<!-- <div class="top" v-else>
			<div class="title">{{investData.borrowName}}</div>
			<ul>
				<li class="apr fl">
					 <div class="liTop apr">{{investData.apr}}<span>%</span><span v-if="investData.addApr">+{{investData.addApr}}%</span></div>
					 <div class="liBottom">预期年化</div>
				</li>
				<li class="deadline fl">
					 <div class="liTop"><span>{{investData.timeLimit}}</span>{{investData.borrowTimeType == 0 ? '个月':'天'}}</div>
					 <div class="liBottom">项目期限</div>
				</li>
				<li class="way fr">
					 <div class="liTop">{{investData.styleStr}}</div>
					 <div class="liBottom">还款方式</div>
				</li>
			</ul>
		</div> -->
		<ul class="DetailList">
			<li class="clear">
				<div class="text fl">出借本金</div>
				<div class="listRight fr">{{investData.money ? investData.money:0 | moneyFormat}}元</div>
			</li>
			<li class="clear">
				<div class="text fl">使用红包</div>
				<div class="listRight fr">{{investData.redEnvelopeAmount ? investData.redEnvelopeAmount:0 | moneyFormat}}元</div>
			</li>
			<li class="clear" @click="investData.waitInterest ? showEar.isShow = true:0">
				<div class="text fl">参考年化收益<img src="https://aliyunsso.edspay.com/web/wxUpdate/for_popwindow.png" alt=""></div>
				<div class="listRight fr">{{investData.expectInterest ? investData.expectInterest:0 | moneyFormat}}元</div>
			</li>
			
		</ul>
		<ul class="DetailList">
			<li class="clear">
				<div class="text fl">出借时间</div>
				<div class="listRight fr">{{investData.trenderSuccessTime | transFormatDate}}</div>
			</li>
			<li class="clear">
				<div class="text fl">起息时间</div>
				<div class="listRight fr">{{investData.startDate | transFormatDate(1)}}</div>
			</li>
			<li class="clear" @click="dialogShow.isShow = true">
				<div class="text fl">预计回款时间<img src="https://aliyunsso.edspay.com/web/wxUpdate/for_popwindow.png" alt=""></div>
				<div class="listRight fr">{{investData.endDate | transFormatDate(1)}}</div>
			</li>
		</ul>
		<ul class="borrow_list" v-if="borrowSystem == 3">
			<router-link :to="{path:'/wxMyAccount/wxInvestListIn/wxInvestDetailBorrower',query:{tenderIds:tenderId}}" tag="li">借款人列表</router-link>
		</ul>
		<ul class="borrow_list" v-if="borrowSystem == 3 && investData.status >= 0">
			<li @click="showlayer = !showlayer">查看协议</li>
		</ul>
		<earnings-tips :earnings="earnings" v-if="showEar.isShow" :showThis="showEar"></earnings-tips>
		<public-dialog :showThis="dialogShow" v-if="dialogShow.isShow" :text="'预计回款时间以全部债权转让成功的时间为准!'" :btn="2" :btnText="'确定'" :confirmBtn="closeDialog"></public-dialog>
		<div id="layer" v-if="showlayer" @click.stop="showlayer = !showlayer">
			<div class="content2">
				<ul>
					<router-link :to="{path:'/wxDcPlanServiceAgreement',query:{uuid:investData.planId,tenderId:tenderId}}" class="bdr-b" tag="li">用户出借服务协议</router-link>
					<router-link :to="{path:'/wxUserAuthorizeProxy'}" tag="li">授权委托书</router-link>
				</ul>
				<div class="btn" @click.stop="showlayer = !showlayer">取消</div>
			</div>
		</div>
		<div class="bottomBtnTi"></div>
		<div class="bottomBtn">{{bottomBtnText[turnStatus]}}</div>
	</div>
</template>

<script>
	import earningsTips from '../invest/earningsTips';	//引入弹框
	import publicDialog from '../invest/wxPublicDialog'; //授权弹框; //公用弹框
	export default {
		data(){
			return {
				logMsg:'出借详情',
				falg:false,
				tenderId:'',
				showlayer:false,//协议弹框
				borrowSystem:'',//是否为点对点
				showEar:{
					isShow:false	//显示预期收益
				},
				point: {
					type: 1,
				},
				investData:{
					title:'我是一个出借名',
					apr:'16.5',
					timeyun:12,
					yun:'月',
					fangshi:'到期一次性还款',
					benjin:500,
					hongbao:500,
					shouyi:500,
					time:1501005636000,
					start:1501006536000,
					over:1501005736000
				},
				dialogShow:{
					isShow:false
				},
				earnings:[
					{
						text:'项目基础收益：',
						money:0.00+'(回款时扣除3%利息管理费)',
					},
					{
						text:'项目加息收益：',
						money:0.00,
					},
					{
						text:'加息券加息收益：',
						money:0.00,
					},
					{
						text:'VIP加息收益：',
						money:0.00,
					}
				],
				bottomBtnText:['服务期结束发起转让','出借结束','转让中'],
				turnStatus:0,//状态判断
			}
		},
		methods:{
			openDialog() {
				this.dialogShow.isShow = true;
			},
			closeDialog() {
				this.dialogShow.isShow = false;
			},
			closeDia(){
				this.showlayer = false
				console.log(1)
			}
		},
		components:{
			earningsTips,
			publicDialog,
		},
		activated(){
			document.title = ''
			document.title = '出借详情'
			this.thisList = this.regular;
			this.tenderId = this.$route.query.tenderId;
			this.borrowSystem = this.$route.query.borrowSystem;
			if (this.borrowSystem == 3) {
				this.postData('/planTender/getUserPlanTenderDetails',(res,data) =>{
					if (data.resCode) {
						this.falg = true
						this.investData = data.resData;
						this.earnings[0].money = data.resData.borrowInterest;
						this.earnings[1].money = data.resData.borrowUprateInterest;
						this.earnings[2].money = data.resData.upRateInterest;
						this.earnings[3].money = data.resData.vipUprateInterest;

						this.turnStatus = data.resData.turnStatus;
					}
				},{tenderId:this.tenderId},1)
			} else {
				this.postData('/app/invest/tenderDetail',(res,data) =>{
					if(data.resCode){
						this.falg = true
						this.investData = data.resData;
						this.earnings[0].money = data.resData.borrowInterest;
						this.earnings[1].money = data.resData.borrowUprateInterest;
						this.earnings[2].money = data.resData.upRateInterest;
						this.earnings[3].money = data.resData.vipUprateInterest;
					}
				},{tenderId:this.tenderId},1)
			}
			
		},
		deactivated(){
			this.investData = {}
		},
		watch: {
			// $route: "changeTitle"
		}
	}
</script>

<style>
	body,html{
		height: 100%;
	}
</style>

<style lang="scss" scoped>
	#MaDetail{
		.bottomBtn{
			height:1.173333rem;
			width:100%;
			background:#D0D0D0;
			text-align:center;
			color:#fff;
			font-size:0.4rem;
			line-height:1.173333rem;
			position: fixed;
			bottom:0;
			left:0;
		}
		.bottomBtnTi{
			height:1.17rem;
		}
		.top{
			background: #fff;
			height:3.466667rem;
			padding: 0.533333rem 0.466667rem 0;
			margin-bottom: 0.266667rem;
			.title{
				font-size:0.373333rem;
				color:#333;
				padding-bottom:0.453333rem;
			}
			ul li{
				text-align:center;
				.liTop{
					font-size:0.346667rem;
					line-height:0.506667rem;
					color:#333;
					font-family: DIN-Medium;
				}
				.liBottom{
					font-size:0.32rem;
					color:#808080;
				}
			}
			.apr{
				text-align:left;
				width:4rem;
				.liTop{
					
					padding-top: 0.106667rem;
					font-size:0.613333rem;
					line-height:0.613333rem;
					color:#ff5b4c;
					span{
						font-size:0.48rem;
					}
				}
			}
			.basic_info{
				width: 100%;
				div{
					// width: 50%;
					float: left;
					p{
						font-size: 0.32rem;
					}
					.p1{
						color: #808080;
						padding-bottom: 0.213333rem;
						span{
							color:#333333;
						}
						i{
							display:inline-block;
							width:1.813333rem;
						}
					}
					
				}
				.basic_left{
					width: 47%;
					.p2{
						font-size: 0.666667rem;
						color: #FF5B4C;
						font-family: DIN-Medium;
						span{
							font-size: 0.4rem;
						}
					}
				}
				.basic_right{
					width: 53%;
					height: 1.1rem;
					padding-left: 0.28rem;
					border-left: 1px solid #e5e5e5;
					margin-top: .3rem;
				}
			}
			.deadline{
				padding-top:0.08rem;
				color:#808080;
				span{
					font-size:0.48rem;
					color:#333;
					line-height:0.666667rem;
					font-family: DIN-Regular;
				}
			}
			.way{
				padding-top:0.24rem;
				width:3rem;
			}
		}
		.DetailList{
			background:#fff;
			padding-left: 0.4rem;
			margin-bottom: 0.266667rem;
			li{
				padding-right: 0.4rem;
				font-size:0.346667rem;
				line-height:1.466667rem;
				height:1.466667rem;
				border-bottom:1px solid #e5e5e5;
				color:#808080;
				.text{
					color:#333;
				}
				img{
					height:0.4rem;
					width:0.4rem;
					margin: -0.08rem 0.133333rem 0;
				}
			}
			li:nth-child(3){
				height:1.733333rem;
				border:0;
				position:relative;
			}
			li:last-child{
				border:0;
			}
			.line{
				height:0.266667rem;
				background:#f5f5f5;
				width:100%;
				margin-left: -0.4rem;
			}
		}
		.borrow_list{
			width: 100%;
			margin-bottom: 0.266667rem;
			li{
				height: 1.466667rem;
				line-height: 1.466667rem;
				padding-left: 0.4rem;
				background: #fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 8.8rem 0.55rem no-repeat;
			    background-size: 0.213333rem 0.4rem;
			    font-size: 0.373333rem;
			}
		}
		.agreement{
			font-family: PingFangSC-Regular;
			font-size: 0.346667rem;
			color: #608DFF;
			text-align: right;
		    padding-right: 0.4rem;
		    margin-top: 0.28rem;
		}
		#layer{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
			position:fixed;
			top:0;
			z-index:100;
			.btn{
				height:1.52rem;
				width:9.466667rem;
				border-radius:0.32rem;
				background:#fff;
				font-size:0.533333rem;
				line-height:1.52rem;
				color:#ff3b30;
				margin:0 0.266667rem 0.266667rem;
				text-align:center;
			}
			.content2{
				position: absolute;
				bottom:0;
				width:100%;
				ul{
					width:9.466667rem;
					height:2.773333rem;
					margin:0 auto;
					border-radius:0.346667rem;
					text-align:center;
					margin-bottom: 0.173333rem;
					background:#ffffff;
					li{
						height:1.373333rem;
						line-height:1.373333rem;
						position: relative;
						font-size: 0.48rem;
						color: #1A80FF;
					}
				}
				.btn{
					margin-bottom:0.293333rem;
					font-size: 0.48rem;
					color: #1A80FF;
				}
			}
		}
	}
</style>