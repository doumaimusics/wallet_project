<!-- 出借详情页面 -->
<template>
	<div id="wxInvestDescribe">
		<ul class="describeChoice clear" :class="{dis:floatP.show1,top1:floatP.show2,top2:floatP.show3}">
			<li @click="clickMe('basic')" :class="{ active: describe.basic }" class="bdr-b">项目概况</li>
			<li @click="clickMe('details')" :class="{ active: describe.details }" class="bdr-b">债权明细</li>
			<li @click="clickMe('records')" :class="{ active: describe.records }" class="bdr-b">出借记录</li>
			<li @click="clickMe('risk')" :class="{ active: describe.risk }" class="bdr-b">风险提示</li>
		</ul>
		<div class="describe-wrapper" :class="{top3:showTop}">
			<article class="jkms" :class="{showMe:describe.basic}">
				<!-- <img src="https://aliyunsso.edspay.com/web/wx/pointToPoint/decribe.png"> -->
				<div class="main_wrap">
					<div class="title">项目介绍</div>
					<p class="p1">E计划是本平台推出的对借款项目进行本金循环自动出借及项目期限届满时自动转让债权的出借工具。在项目期限内，系统智能分散匹配小额消费债权；项目到期后，系统协助出借人完成债权转让，本金和利息一次性回款到您的账户。网贷有风险，出借需谨慎。</p>
					<div class="line"></div>
					<!-- <div class="title">业务模式</div>
					<img class="img1" src="https://aliyunsso.edspay.com/web/wx/pointToPoint/process_bg.png" alt=""> -->
					<div class="title">产品详情</div>
					<table cellspacing="0" cellpadding="0">
						<tr>
							<td class="td1">产品名称</td>
							<td class="td2">{{borrow.name}}</td>
						</tr>
						<tr>
							<td class="td1">还款方式</td>
							<td class="td2">{{borrow.style}}</td>
						</tr>
						<tr>
							<td class="td1">项目期限</td>
							<td class="td2">{{borrow.timeLimit}}{{borrow.timeType == '1' ? '天':'个月'}}</td>
						</tr>
						<!-- <tr>
							<td class="td1">最低出借</td>
							<td class="td2">{{borrow.minAmount}}元</td>
						</tr> -->
						<tr>
							<td class="td1">预期收益</td>
							<td class="td2">以实际收益为准</td>
						</tr>
						<tr>
							<td class="td1">起息日</td>
							<td class="td2">出借成功后次日计息</td>
						</tr>
						<tr>
							<td class="td1">退出说明</td>
							<td class="td2">锁定期结束后退出，未到期债权以债权转让的方式退出，当全部债权转让成功后，方可视为退出</td>
						</tr>
						<tr>
							<td class="td1">回款时间</td>
							<td class="td2">锁定期满成功退出后预计1-3天内回款</td>
						</tr>
						<tr>
							<td class="td1">复投方式</td>
							<td class="td2">本金复投（该期计划持有债权在借款人还款时，将对还款的本金做自动复投处理）</td>
						</tr>
						<tr>
							<td class="td1">利息管理费</td>
							<td class="td2">项目到期基础收益的3%</td>
						</tr>
						<tr>
							<td class="td1">协议</td>
							<td class="td2"><span @click="goAgreement">《用户出借服务协议》</span></td>
						</tr>
					</table>
					<div class="line"></div>
					<div class="title">常见问题</div>
					<div v-for="(item,index) in question" class="noraml_info">
						<p class="question">Q{{index+1}}:{{item[0]}}</p>
						<p class="ansower" v-html="'A:'+item[1]"></p>
					</div>
				</div>
				<div class="nothing"></div>
			</article>
			<article class="jkzl" :class="{showMe:describe.details}">
				<!-- <p class="tips" >注：出借人以最终智能匹配到的借款人为准</p> -->
				<borrower-list></borrower-list>
			</article>
			<article class="jkms" :class="{showMe:describe.records}">
				<invest-record></invest-record>
			</article>
			<article class="jkzl" :class="{showMe:describe.risk}">
				<risk-Disclosure :isTab="true"></risk-Disclosure>
			</article>
		</div>
		
	</div>
</template>
	
<script>
	import wxToapp from '../../../common/wx/wxToapp';	//适配app
	import borrowerList from './wxFinaPlanBorrowers2';  //借款人列表引入
	import investRecord from './wxInvestRecordPoint2';  //出借列表列表引入
	import riskDisclosure from './agreement/wxRiskDisclosureBook';  //风险提示书引入
	export default {
		mixins:[wxToapp],
		props:['fullHeight'],
		data(){
			return {
				describe:{
					basic:true,
					details:false,
					records:false,
					risk:false,
				},
				question:[],
				uuid:'',
				borrow:{},
				floatP:{
					show1:false,
					show2:false,
					show3:false
				},
				showTop:false
				
			}
		},
		methods:{
			clickMe(me){	//tab切换
				for(var x in this.describe){
					this.describe[x]=false;
				}
				this.describe[me]=true;
				if (this.osType) {
					document.body.scrollTop = 0;
				} else {
					let _height = $(window).scrollTop();
					if (_height < this.fullHeight) {
						document.body.scrollTop = _height;
					} else {
						document.body.scrollTop = this.fullHeight-1
					}
				}
			},
			goBorrowerDetail(goUrl) {
				this.$router.push(goUrl);
			},
			goAgreement() {
				this.toApp('toWeb|用户出借服务协议|https://'+ window.location.host +'/#/wxDcPlanServiceAgreement?uuid='+this.uuid,{path:'/wxDcPlanServiceAgreement',query:{uuid:this.uuid}})
			},
			getborrow(){	//获取标的详情
				this.notLogPost('/borrow/borrowDetail',(data) =>{
					if(data.resCode){
						this.borrow = data.resData.borrowDetail;
					}
				},{uuid:this.uuid,assetManageType:3},1)
			},
			tabPostion() {  //tab定位
				var that = this;
				if (this.osType) {
					this.floatP.show1 = true;
					this.floatP.show2 = false;
					this.floatP.show3 = true;
					this.showTop = true;
				} else {
					$(document).scroll(function(event) {
						let _height = $(window).scrollTop();
						that.showTop = false;
						if ( _height >= that.fullHeight ) {
							that.floatP.show1 = true;
							that.floatP.show2 = true;
							that.floatP.show3 = false;
						}else if ( _height < that.fullHeight ) {
							that.floatP.show1 = false;
							that.floatP.show2 = false;
							that.floatP.show3 = false;
						}
					});
				}
			}
		},
		components: {
			borrowerList,
			investRecord,
			riskDisclosure
		},
		created() {
			this.uuid = this.$route.query.uuid;
			this.getborrow();
			this.tabPostion();
			this.notLogPost('/financePlan/questionAnwser',(res) =>{
				if (res.resCode) {
					this.question = res.resData.questionAnwser;
				}
			},{},1);
		}
	}
</script>

<style lang="scss" scoped>
	#wxInvestDescribe{
		font-family: PingFangSC-Regular;
		.nothing{
			height: 1.173333rem;
			width: 100%;
		}
		.describeChoice li{
			padding: 0.266667rem 0;
			background:#fff;
			float:left;
			width:25%;
			text-align:center;
			color:#666;
			font-size:0.4rem;
			position: relative;
		}
		li.bdr-b:after{
				border-bottom:1px solid #e5e5e5;
		}
		li.active:after{
			border-bottom: 1px solid #ff5a54;
    		
		}
		li.active{
			color: #ff5a54;
		}
		.describe-wrapper{
			position:relative;
			.showMe{
				display:block;
			}
			article{
				position:absolute;
				top:0;
				left:0;
				display:none;
				width:100%;
				img{
					vertical-align: middle;
					width:100%;
				}
				// .tips{
				// 	padding: 0.266667rem 0.8rem;
				// 	font-size: 0.32rem;
				// 	color: #8D8D8D;
				// 	line-height: .6rem;
				// }
				ul{
					width: 100%;
					li{
						width: 100%;
						background: #ffffff;
						padding: 0 0.4rem;
						margin-bottom: 0.266667rem;
						.borrow_number{
							width: 100%;
							height: 1.333333rem;
							line-height: 1.333333rem;
							font-size: 0.373333rem;
							color: #494743;
							border-bottom: 1px solid #e5e5e5;
						}
						.borrower_detail{
							padding: 0.333333rem 0;
							p{
								font-size: 0;
								span{
									display: inline-block;
									width: 50%;
									font-size: 0.373333rem;
									line-height: 0.666667rem;
								}
								.span1{
									text-align: left;
									color: #8E8E8E;
								}
								.span2{
									text-align: right;
									color: #333333;
								}
							}
						}
					}
				}
				
			}
		}
		.main_wrap{
			padding: .4rem 0.4rem;
			background: #ffffff;
			.title{
				width: 100%;
				height: 0.346667rem;
				border-left: 4px solid #ff5b4c;
				font-size: 0.373333rem;
				color: #333333;
				text-indent: 0.28rem;
				margin-bottom: 0.346667rem;
			}
			.p1{
				font-size: 0.346667rem;
				color: #8D8D8D;
				text-align: justify;
			    line-height: .55rem;
			    margin-bottom: 0.52rem;
			}
			.line{
				width: 100%;
				height: 1px;
				border-bottom: 1px solid #e5e5e5;
				margin-bottom: 0.613333rem;
			}
			.img1{
				text-align: center;
				width: 8.586667rem;
				height: 5.146667rem;
				margin-bottom: 1.16rem;
			}
			table{
				border: 1px solid #FFE1DB;
				width: 100%;
				margin-bottom: 0.533333rem;
				td{
					border: 1px solid #FFE1DB;
					text-align: center;
					padding: 0.346667rem 0;
				}
				.td1{
					width: 2.746667rem;
					font-size: 0.373333rem;
					color: #8D8D8D;
				}
				.td2{
					font-size: 0.346667rem;
					color: #333333;
					padding-right: 0.3rem;
					padding-left: 0.3rem;
				}
				span{
					color: #508cee;
					font-size: 0.346667rem;
				}
			}
			.noraml_info{
				font-size: 0.346667rem;
				text-align: justify;
				margin-bottom: 0.666667rem;
				.question{
					color: #333333;
					margin-bottom: 0.32rem;
				}
				.ansower{
					color: #8D8D8D;
				}
			}
		}
		.describeChoice.dis{
			position: fixed;
			width: 100%;
			left: 0;
			height: 1.04rem;
			z-index: 99;
		}
		.top1{
			top: 1.333333rem;
		}
		.top2{
			top: 0;
		}
		.top3{
			top: 1.04rem;
		}
	}
</style>