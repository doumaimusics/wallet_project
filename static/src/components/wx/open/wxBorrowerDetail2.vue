<template>
	<div id="borrowerDetail">
		<wx-header v-if="!osType" :logo="'借款编号'+orderNosId"></wx-header>
		<div class="detail_wrapper">
			<div class="borrower_info clear">
				<div class="borrow_title bdr-b">借款人信息</div>
				<div class="info_left">
					<p>姓名</p>
					<p>证件号码</p>
					<p>手机号码</p>
					<p>借款人主体性质</p>
					<p>借款人收入及负债情况</p>
					<p>借款人前6个月征信报告逾期情况</p>
				</div>
				<div class="info_right">
					<p>{{borrower.hideUserName}}</p>
					<p>{{borrower.hideCardId}}</p>
					<p>{{borrower.hideMobile}}</p>
					<p>{{borrower.loanerType == 0 ? '个人':'公司'}}</p>
					<p>{{borrower.incomeLiabilities}}</p>
					<p>{{borrower.creditReportOverdue}}</p>
				</div>
			</div>
			<div class="borrower_info clear">
				<div class="borrow_title bdr-b">借款信息</div>
				<div class="info_left">
					<p>借款时间</p>
					<p>借款金额(元)</p>
					<!-- <p>借款期限(天)</p> -->
					<p>借款用途</p>
					<p>还款来源</p>
					<p>还款状态</p>
				</div>
				<div class="info_right">
					<p>{{borrower.loanStartDateStr}}</p>
					<p>{{borrower.money}}</p>
					<!-- <p>{{borrower.timeLimit}}</p> -->
					<p>{{borrower.purpose}}</p>
					<p>{{borrower.repaymentSource}}</p>
					<p v-if="borrower.repaymentStatus == 0">还款中</p>
					<p v-else-if="borrower.repaymentStatus == 1">已还款</p>
				</div>
			</div>
			<div class="borrower_info no_border clear">
				<div class="borrow_title bdr-b">风控信息</div>
				<div class="risk_info">
					<p class="p1"><span class="span1">公安部认证</span><span class="span2">芝麻信用认证</span><span class="span3">生物指纹认证</span></p>
					<p class="p2"><span class="span1">身份证信息认证</span><span class="span2">社保和公积金认证</span><span class="span3">通讯录认证</span></p>
				</div>
			</div>
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
				orderNosId:'',
				borrower: {},
				// formBorrowDetail:''
			}
		},
		methods: {
			getDetailData() {
				this.notLogPost('/p2p/getDebtOrderInfo',(res) =>{
					if ( res.resCode ) {
						this.borrower = res.resData.data[0];
					}
				},{orderNo:this.orderNosId})
			},
		},
		components: {
			wxHeader,
		},

		created() {
			this.orderNosId = this.$route.query.orderNoss;
			// this.formBorrowDetail = this.$route.query.formBorrowDetail;
			this.getDetailData();
		},
	}
</script>
<style lang="scss" scoped>
	#borrowerDetail{
		font-family: PingFangSC-Regular;
		width: 100%;
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
		.detail_wrapper{
			p{
				height: 0.6rem;
			}
			h3{
				font-size: 0.4rem;
			}
			.borrower_info{
				margin-bottom: 0.266667rem;
				background: #ffffff;
				padding: 0 0.4rem 0.893333rem;
			    .borrow_title{
			    	height: 1.466667rem;
			    	line-height: 1.466667rem;
			    	font-size: 0.373333rem;
			    	color: #333333;
			    	position: relative;
			    }
				.info_left,.info_right{
					float: left;
					font-size: 0.373333rem;
					color: #8E8E8E;
					p{
						margin-top:0.466667rem;
					}
				}

				.info_left{
					width: 60%;
					text-align: left;
				}
				.info_right{
					width: 40%;
					text-align: right;
				}
				.risk_info{
					p{
						span{
							display: inline-block;
							font-size: 0.32rem;
							color: #8E8E8E;
							background: url(https://aliyunsso.edspay.com/web/wx/invest/re_check.png) 0rem 0.1rem no-repeat;
							background-size: 0.4rem 0.28rem;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							text-indent: 0.5rem;
						}
						.span1{
							width: 3.1rem;
						}
						.span2{
							width: 3.4rem;
						}
						.span3{
							width: 2.666667rem;
						}
					}
					.p1{
						padding-top: 0.533333rem;
					}
					.p2{
						padding-top: 0.426667rem;
					}
				}
			}
			.no_border{
				border-bottom: none;
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
	}
</style>