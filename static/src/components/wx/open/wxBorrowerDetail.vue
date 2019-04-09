<template>
	<div id="borrowerDetail">
		<div v-title>债权明细</div>
		<div class="detail_wrapper">
			<!-- head区的信息 -->
			<div class="fl_head" :style="{top:0}">
				<div class="head_info clear">
					<div class="fl">
						<p class="j_p">借款总额(元)：</p>
						<p class="j_p3">{{borrower.money ? borrower.money:'0' | moneyFormat}}</p>
					</div>
					<div class="fl">
						<p class="j_p2">还款方式：<span>{{borrower.debtTypeStr}}</span></p>
						<p>债权状态：<span v-if="borrower.repaymentStatus == 0">还款中</span><span v-else-if="borrower.repaymentStatus == 1">已还款</span><span v-else-if="borrower.repaymentStatus == 2">匹配中</span></p>
					</div>
				</div>
				
				<!-- 零时隐藏掉的 -->
				<!--<ul class="describeChoice clear bdr-b">-->
				<!--	<li @click="clickMe('basic')" :class="{ active: describe.basic }" class="lione">债权信息</li>-->
				<!--	<li @click="clickMe('details')" :class="{ active: describe.details }" class="litwo">还款情况</li>-->
				<!--</ul>-->

			</div>

			<div class="main_contain">
				<!-- 债权信息 -->
				<div class="des_basic" :class="{showMe:describe.basic}">
					<div class="borrower_info no_border clear">
						<div class="borrow_title bdr-b">风控信息</div>
						<div class="risk_info clear">
							<div class="fl motion">
								<img src="https://aliyunsso.edspay.com/web/wx/pointToPoint/motion.gif" alt="">
							</div>
							<div class="fl motion_text">
								<img src="https://aliyunsso.edspay.com/web/wx/pointToPoint/motionInFo.png">
								<!-- <p class="p1"><span class="span1">身份认证</span><span class="span2">银行卡认证</span></p>
								<p class="p2"><span class="span1">运营商认证</span><span class="span2">通讯录认证</span></p> -->
							</div>
							
						</div>
					</div>
					<div class="borrower_info rz_bg clear">
						<div class="borrow_title bdr-b">借款人信息</div>
						<ul>
							<li class="clear">
								<div class="fl name">姓名</div>
								<div class="fl userData">{{borrower.hideUserName}}</div>
							</li>
							<li class="clear">
								<div class="fl name">性别</div>
								<div class="fl userData">{{borrower.sex}}</div>
							</li>
							<li class="clear">
								<div class="fl name">年龄</div>
								<div class="fl userData">{{borrower.age}}</div>
							</li>
							<li class="clear">
								<div class="fl name">证件号码</div>
								<div class="fl userData">{{borrower.hideCardId}}</div>
							</li>
							<li class="clear">
								<div class="fl name">手机号码</div>
								<div class="fl userData">{{borrower.hideMobile}}</div>
							</li>
							<li class="clear">
								<div class="fl name">主体性质</div>
								<div class="fl userData">个人</div>
							</li>
							<li class="clear">
								<div class="fl name">收入情况</div>
								<div class="fl userData">工资收入</div>
							</li>
							<li class="clear">
								<div class="fl name">所属职业/行业</div>
								<div class="fl userData">{{borrower.loanerType == 0 ? '个体':'公司'}}</div>
							</li>
							<li class="clear">
								<div class="fl name">负债情况</div>
								<div class="fl userData">无</div>
							</li>
							<li class="clear">
								<div class="fl name">征信情况</div>
								<div class="fl userData">借款人承诺近一年在金融机构无不良信用记录。</div>
							</li>
							<li class="clear">
								<div class="fl name">其他借款情况</div>
								<div class="fl userData">借款人承诺在本平台和其他网贷平台借款总额不超过人民币100万元，在其他平台借款无不良还款记录。</div>
							</li>
						</ul>
					</div>
					<div class="borrower_info clear">
						<div class="borrow_title bdr-b">基本信息</div>
						<ul>
							<li class="clear">
								<div class="fl name">项目名称</div>
								<div class="fl userData">{{borrower.orderNo}}</div>
							</li>
							<li class="clear">
								<div class="fl name">项目简介</div>
								<div class="fl userData">借款人出于资金周转需要平台出借人进行融资，还款来源为借款人日常收入以及持有资产的权益变现收入，经考察借款人收入稳定，具备还款能力，风险可控。</div>
							</li>
							<li class="clear">
								<div class="fl name">借款金额(元)</div>
								<div class="fl userData">{{borrower.money}}</div>
							</li>
							<li class="clear">
								<div class="fl name">借款用途</div>
								<div class="fl userData">个人消费</div>
							</li>
							<li class="clear">
								<div class="fl name">年化利率</div>
								<div class="fl userData">{{borrower.apr}}%</div>
							</li>
							<li class="clear">
								<div class="fl name">起息日</div>
								<div class="fl userData">放款成功后起息</div>
							</li>
							<li class="clear">
								<div class="fl name">还款来源</div>
								<div class="fl userData">工资收入</div>
							</li>
							<li class="clear">
								<div class="fl name">还款方式</div>
								<div class="fl userData">{{borrower.debtTypeStr}}（可提前还款）</div>
							</li>
							<li class="clear">
								<div class="fl name">还款日期</div>
								<div class="fl userData">{{borrower.repayEndDateStr}}{{borrower.repaymentStatus == 2 ? '(预计)':''}}</div>
							</li>
							<li class="clear">
								<div class="fl name">还款保障措施</div>
								<div class="fl userData">我司风控人员会定期进行贷后检查，核实资金使用情况，根据具体情况制定贷后监管的实施方案，及时披露项目最新情况。</div>
							</li>
						</ul>
					</div>
					<div class="borrower_info clear">
						<div class="borrow_title bdr-b">风险评估</div>
						<div class="text">根据借款人当前情况进行评估，借款人具有偿还贷款的能力；但不排除未来因借款人收入下降、过度举债等因素导致借款人财务状况恶化，从而发生逾期的可能。</div>
						<div class="tips">网贷有风险，出借需谨慎</div>
					</div>
					<div class="borrower_info clear">
						<div class="borrow_title bdr-b">其他信息</div>
						<ul class="other">
							<li class="clear">
								<div class="fl name">借款资金运用情况</div>
								<div class="fl userData">个人消费</div>
							</li>
							<li class="clear">
								<div class="fl name">借款人经营及财务情况</div>
								<div class="fl userData">良好</div>
							</li>
							<li class="clear">
								<div class="fl name">借款人还款能力变化</div>
								<div class="fl userData">暂无变化</div>
							</li>
							<li class="clear">
								<div class="fl name">借款人是否逾期</div>
								<div class="fl userData">否</div>
							</li>
							<li class="clear">
								<div class="fl name">借款人是否涉诉</div>
								<div class="fl userData">无诉讼记录</div>
							</li>
							<li class="clear">
								<div class="fl name">借款人是否受行政处罚</div>
								<div class="fl userData">否</div>
							</li>
						</ul>
					</div>
					<div class="borrower_info clear" v-if="borrower.behindCardUrl !== '' && borrower.frontCardUrl !== ''">
						<div class="borrow_title bdr-b">图片材料</div>
						<div class="borrow-idCard">
							<div class="borrow-cardItem">
								<div class="cardPic" @click="enlarge('font')">
									<img :src="borrower.frontCardUrl"/>
								</div>
								<p>身份证 (正面)</p>
							</div>
							<div class="borrow-cardItem">
								<div class="cardPic"  @click="enlarge('back')">
									<img :src="borrower.behindCardUrl"/>
								</div>
								<p>身份证 (反面)</p>
							</div>
						</div>
					</div>
				</div>
				
			</div>
			
			
		</div>
		<!-- 身份证放大弹框 -->
		<div v-layer v-if="ifIdCard" @click="ifIdCard = false">
			<img class="enlarge-idCard" :src="enLargeImg"/>
		</div>
	</div>
</template>
<script>
	import wxHeader from "../../wxHeader";
	import wxToapp from '../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data() {
			return {
				describe:{
					basic:true,
					details:false,
				},
				orderNosId:'',
				borrower: {
					repaymentData:[]
				},
				repaymentData:[],  //还款情况
				redType:1,   //头部改变颜色
				wtShow:true,
				ifIdCard:false,
				enLargeImg:''
			}
		},
		methods: {
			clickMe(me) {
				for(var x in this.describe) {
					this.describe[x] = false;
				}
				this.describe[me] = true;
			},
			getDetailData() {
				this.notLogPost('/p2p/getDebtOrderInfo',(res) =>{
					if ( res.resCode ) {
						this.borrower = res.resData.data[0];
						this.borrower.repaymentData = res.resData.debtOrderPeriods;
						this.repaymentData = res.resData.debtOrderPeriods[0];
					}
				},{orderNo:this.orderNosId})
			},
			enlarge (val) {
				this.ifIdCard = true
				if (val == 'font') {
					this.enLargeImg = this.borrower.frontCardUrl
				} else {
					this.enLargeImg = this.borrower.behindCardUrl
				}
			}
		},
		components: {
			wxHeader,
		},

		created() {
			this.orderNosId = this.$route.query.orderNoss;
			// this.formBorrowDetail = this.$route.query.formBorrowDetail;
			this.getDetailData();
			this.PassValue('NavRed_'+'债权明细');
		},
	}
</script>
<style lang="scss" scoped>
	#borrowerDetail{
		font-family: PingFangSC-Regular;
		width: 100%;
		position: relative;
		.fl_head{
			position: fixed;
			left: 0;
			// top: 1.33rem;
			width: 100%;
			z-index: 20;
		}
		.detail_header{
			height: 2.0rem;
			background: #ff5b4c;
			.detail_left,.detail_right{
				float: left;
				width: 49.5%;
				color:#ffffff;
				font-size: 0.373333rem;
			}
		}
		.fr{
			float: right;
		}
		.fl{
			float: left;
		}
		.describeChoice{
			position: relative;
			height: 1.066667rem;
			background:#fff;
			width: 100%;
		}
		.describeChoice li{
			height: 1.04rem;
			float:left;
			width:2.666667rem;
			text-align:center;
			color:#666;
			font-size:0.4rem;
			// border-bottom: 1px solid #ccc;
			line-height: 1.066667rem;
			position: relative;
		}
		.describeChoice li.lione{
			margin-left: 1.173333rem;
		}
		.describeChoice li.litwo{
			margin-right: 1.173333rem;
			float: right;
		}
		li.active{
			border-bottom: 2px solid #ff5a54;
    		color: #fe5b54;
		}
		.main_contain{
			position: relative;
			top: 2.773333rem;		
			// top: 4.05rem;
			z-index: 10;
			.des_basic,.des_detail{
				display: none;
			}
			.showMe{
				display: block;
			}
			.no_data{
				text-align: center;
				img{
					width:6.4rem;
					height:4.533333rem;
				    margin-top: 1rem;
				}
				p{
					color:#bebebe;
					font-size:0.373333rem;
					line-height:1.066667rem;
					text-align:center;
				}
			}
			.list_title{
				width: 100%;
				height: 1.066667rem;
				font-size: 0.346667rem;
				color: #333333;
				background: #fafafa;
			    position: fixed;
			    top:5.3rem;
			    left: 0;
			    z-index: 21;
				li{
					float: left;
					width: 25%;
					height: 1.066667rem;
					line-height: 1.066667rem;
					text-align: center;
				}
			}
			.repay_list{
				position: relative;
				top: 1rem;
				padding-left: .4rem;
			    background: #fff;
			}
			.list_contain{
				height: 1.333333rem;
				background: #ffffff;
				position: relative;
				li{
					width: 25%;
					height: 1.333333rem;
					float:left;
					line-height: 1.333333rem;
					font-size: 0.346667rem;
					color: #333333;
					text-align: center;
					// border-bottom: 1px solid #e5e5e5;
					position: relative;
				}
				.li1{
					width: 18%;
				}
				.li2{
					width: 30%;
				}
			}
		}
		.detail_wrapper{
			.head_info{
				width: 100%;
				height: 3.0rem;
				// background: linear-gradient(-180deg, #FF5E4C 0%, #FF4640 100%);
				background: #4C7DE9;
				div{
					width: 50%;
				}
				p{
					font-size: 0.32rem;
					color: #fff;
				}
				span{
					font-size: 0.346667rem;
					color: #FFFFFF;
				}
				.j_p{
					padding:1.026667rem 0 0.6rem 0.4rem;
				}
				.j_p2{
					padding-top: 1.146667rem;
					padding-bottom: 0.65rem;
				}
				.j_p3{
					font-family: DIN-Medium;
					font-size: 0.666667rem;
					color: #FFFFFF;
					padding-left: 0.4rem;
				}
			}
			p{
				height: 0.6rem;
			}
			h3{
				font-size: 0.4rem;
			}
			.borrower_info{
				margin-top: 0.266667rem;
				background: #ffffff;
				padding: 0 0.4rem 0.4rem;

			    .borrow_title{
			    	height: 1.466667rem;
			    	line-height: 1.466667rem;
			    	font-size: 0.373333rem;
			    	color: #333333;
			    	position: relative;
			    }
			    ul{
			    	padding-top: 0.4rem;
					li{
						line-height:0.533333rem;
						margin-bottom: 0.28rem;
						.name{
							width:3.2rem;
							font-size: 0.346667rem;
							color: #8E8E8E;
						}
						.userData{
							font-size:0.373333rem;
							color: #333;
							width:5.866667rem;
						}
					}
			    }
			    ul.other{
			    	.name{
			    		width:4.533333rem;
			    	}
			    	.userData{
			    		width:4.4rem;
			    	}
			    }
			    .text{
			    	font-size:0.373333rem;
			    	line-height:0.586667rem;
			    	color:#333;
			    	padding:0.373333rem 0 0.4rem;
			    }
			    .tips{
			    	font-size:0.293333rem;
			    	line-height:0.4rem;
			    	color:#C5C5C5;
			    	text-align:center;
			    }
				.risk_info{
					height: 4.533333rem;
					.motion{
						margin-top: .733333rem;
						img{
							width: 3.066667rem;
							height: 3.066667rem;
						}
					}
					.motion_text{
						margin-top: .4rem;
						float: right;
						img{
							width: 5.466667rem;
							height: 3.733333rem;
						}
					}
					p{
						span{
							display: inline-block;
							font-size: 0.32rem;
							color: #333333;
							background: url(https://aliyunsso.edspay.com/web/wx/invest/re_check.png) 0rem 0.1rem no-repeat;
							background-size: 0.4rem 0.28rem;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							text-indent: 0.5rem;
						}
						.span1{
							width: 2.6rem;
						}
						.span2{
							width: 2.4rem;
						}
						.span3{
							width: 2.666667rem;
						}
					}
					.p1{
						padding-top: 1.266667rem;
					}
					.p2{
						padding-top: 0.626667rem;
					}
				}
			}
			.rz_bg{
				background: #ffffff url(https://aliyunsso.edspay.com/web/wx/pointToPoint/checked.png) 6.4rem 6.9rem no-repeat;
				background-size: 2.426667rem;
			}
			.no_border{
				border-bottom: none;
				padding-bottom: 0;
			}
			
		}
		.payment_wrapper{
			width: 100%;
			background: #fff;
			.list_header{
				span{
					display: inline-block; 
					width: 25%;
					text-align: center;
					font-size: 0.346667rem;
				}
			}
			ul{
				width: 100%;
				li{
					width: 100%;
					font-size: 0;
					span{
						display: inline-block;
						width: 25%;
						text-align: center;
						font-size: 0.32rem;
					}
					span.active{
						color:red;
					}
				}
			}
		}
		.bdr-b:after {
		    height: 1px;
		    content: '';
		    width: 100%;
		    border-bottom: 1px solid #e5e5e5;
		    position: absolute;
		    bottom: 0;
		    right: 0;
		    transform: scaleY(0.5);
		    -webkit-transform: scaleY(0.5);
		    z-index: 10;
		}
		.borrow-idCard{
			margin-top: .4rem;
			.borrow-cardItem {
				float: left;
				margin-right: .266667rem;
				.cardPic {
					width: 3.626667rem;
					height: 2.24rem;
					background: #F7F8FA;
					border-radius: .106667rem;
					padding: .186667rem .16rem;
					img {
						width: 3.306667rem;
						height: 1.866667rem;
					}
				}
				p {
					font-size: .293333rem;
					text-align: center;
					margin-top: .333333rem;
					color: #808080;
				}
			}
		}
		.enlarge-idCard {
			width: 100%;
			height: 6rem;
			background: black;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			margin: auto;
		}
	}
</style>