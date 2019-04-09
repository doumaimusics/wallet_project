<!-- 出借详情页面 -->
<template>
	<div id="wxInvestDescribe">
		<ul class="describeChoice clear" :class="{dis:floatP.show1,top1:floatP.show2,top2:floatP.show3}">
			<li @click="clickMe('basic')" :class="{ active: describe.basic }" class="bdr-b">项目概况<span v-if="describe.basic"></span></li>
			<li @click="clickMe('details')" :class="{ active: describe.details }" class="bdr-b">常见问题<span v-if="describe.details"></span></li>
			<!-- <li @click="clickMe('records')" :class="{ active: describe.records }" class="bdr-b">安全保障</li> -->
			<li @click="clickMe('risk')" :class="{ active: describe.risk }" class="bdr-b">风险提示<span v-if="describe.risk"></span></li>
		</ul>
		<div class="describe-wrapper" :class="{top3:showTop}">
			<article class="jkms" :class="{showMe:describe.basic}">
				<div class="main_wrap">
					<div class="title">项目介绍</div>
					<p class="p1">E计划是E都市钱包新推出的一款高效、自动投标工具，通过系统为用户完成自动出借，在授权服务期内，系统智能分散匹配小额消费债权；授权服务期结束，系统协助出借人完成债权转让，满足了用户方便快捷的完成出借的需求，进而达到高效出借目的。</p>
					<p class="p1">项目借款人均来自真实的消费场景，由平台合作的优质资产推荐机构在消费场景对借款人进行了解，收集真实身份，工作状况，家庭状况，收入负债等情况，用以证明用户身份和消费行为，并经过E都市钱包风控系统+人工两道风险审核，方可获得借款资格，实际借款人收入稳定 ，具备较强还款能力。</p>
					<p class="p1">出借人资金在出借成功后处于冻结状态，待债权匹配完成后，出借人资金从其存管账户通过浙商银行存管系统转至借款人账户，整个资金流程在银行存管下完全透明。参考收益不代表实际收益，网贷有风险，出借需谨慎！</p>
					<div class="line"></div>
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
							<td class="td1">授权服务期</td>
							<td class="td2">{{borrow.timeLimit}}{{borrow.timeType == '1' ? '天':'个月'}}（授权服务期结束可发起债权转让）</td>
						</tr>
						<!-- <tr>
							<td class="td1">最低出借</td>
							<td class="td2">{{borrow.minAmount}}元</td>
						</tr> -->
						<tr>
							<td class="td1">参考年化收益</td>
							<td class="td2">以实际收益为准</td>
						</tr>
						<tr>
							<td class="td1">发布日期</td>
							<td class="td2">{{borrow.publishTime}}</td>
						</tr>
						<tr>
							<td class="td1">募集期</td>
							<td class="td2">1-3天<span class="tips_ico" @click="tipsShow"></span></td>
						</tr>
						<tr>
							<td class="td1">起息日</td>
							<td class="td2">出借成功后次日计息</td>
						</tr>
						<tr>
							<td class="td1">退出方式</td>
							<td class="td2">授权服务期结束后退出，未到期债权以债权转让的方式退出，当全部债权转让成功后，方可视为退出</td>
						</tr>
						<tr>
							<td class="td1">回款时间</td>
							<td class="td2">预计1-3天内到账，最快当天到账，具体时间视债权转让情况而定</td>
						</tr>
						<tr>
							<td class="td1">复投方式</td>
							<td class="td2">本金复投（该期计划持有债权在借款人还款时，将对还款的本金做自动复投处理）</td>
						</tr>
						<tr>
							<td class="td1">利息管理费</td>
							<td class="td2">项目到期基础收益的3%</td>
						</tr>
					</table>
					<!-- <div class="line"></div> -->
					
				</div>
				<div class="nothing"></div>
			</article>
			<article class="jkzl" :class="{showMe:describe.details}">
				<normal-question></normal-question>
				<!-- <div class="reques">
					<div class="title">常见问题</div>
					<div v-for="(item,index) in question" class="noraml_info">
						<p class="question">Q{{index+1}}:{{item[0]}}</p>
						<p class="ansower" v-html="'A:'+item[1]"></p>
					</div>	
				</div> -->
				<div class="nothing"></div>
			</article>
			<!-- 安全保障 -->
			<article class="jkzl" :class="{showMe:describe.records}">
				<img class="safe-img" src="https://aliyunsso.edspay.com/web/wx/pointToPoint/safeguard_h5.png" alt="">
				<div class="nothing"></div>
			</article>
			<!-- 风险提示 -->
			<article class="jkzl" :class="{showMe:describe.risk}">
				<risk-Disclosure :isTab="true"></risk-Disclosure>
			</article>
		</div>
		<tip-dialog :showThis="tipShow" v-if="tipShow.isShow" :text="'项目募集开始的1-3天内将完成本次资金的所有出借及划转。如3天未完成上述操作，则平台将相应资金退回至出借人的平台账户，资金加入至划转期间、资金加入至退回期间不计收益。'" :btn="2" :btnText="'确定'" :confirmBtn="closeDialog"></tip-dialog>
	</div>
</template>
	
<script>
	import wxToapp from '../../../common/wx/wxToapp';	//适配app
	import borrowerList from './wxFinaPlanBorrowers';  //借款人列表引入
	import investRecord from './wxInvestRecordPoint';  //出借列表列表引入
	import riskDisclosure from './agreement/wxRiskDisclosureBook';  //风险提示书引入
	import normalQuestion from './wxNormalQuestion';  //常见问题
	import tipDialog from '../member/invest/wxPublicDialog'; //授权弹框; //公用弹框
	export default {
		mixins:[wxToapp],
		props:['fullHeight'],
		data(){
			return {
				describe:{
					basic:true,
					details:false,
					records:false,
					risk:false
				},
				question:[],
				uuid:'',
				borrow:{},
				floatP:{
					show1:false,
					show2:false,
					show3:false
				},
				showTop:false,
				tipShow:{
					isShow:false
				}
				
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
							that.showTop = true;
						}else if ( _height < that.fullHeight ) {
							that.floatP.show1 = false;
							that.floatP.show2 = false;
							that.floatP.show3 = false;
							that.showTop = false;
						}
					});
				}
			},
			tipsShow(){
				this.tipShow.isShow = true;
			},
			closeDialog() {
				this.tipShow.isShow = false;
			},
		},
		components: {
			borrowerList,
			investRecord,
			riskDisclosure,
			normalQuestion,
			tipDialog
		},
		created() {
			this.uuid = this.$route.query.uuid;
			if(this.vcode <= '3.3.3'){
				this.$router.replace({path:'/wxIdpoint2',query: this.$route.query})
			}
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
			// width:25%;
			width:33.333%;
			text-align:center;
			color:#666;
			font-size:0.4rem;
			position: relative;
			span{
				position: absolute;
				width: 0.666667rem;
				height:2px;
				left:50%;
				bottom: 1px;
				margin-left: -0.333333rem;
				background: #4C7DE9;
			}
		}
		.safe-img{
			width: 10.0rem;
			height: 30.533333rem;
			position: relative;
		}
		li.bdr-b:after{
				border-bottom:1px solid #e5e5e5;
		}
		// li.active:after{
		// 	border-bottom: 4px solid #ff5a54;
    		
		// }
		li.active{
			color: #4C7DE9;
			font-family: PingFangSC-Medium;
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
		.title{
			width: 100%;
			height: 0.346667rem;
			line-height: 0.4rem;
			border-left: 4px solid #ff5b4c;
			font-size: 0.373333rem;
			color: #333333;
			text-indent: 0.28rem;
			margin-bottom: 0.346667rem;
		}
		.main_wrap{
			padding: .4rem 0.4rem;
			background: #ffffff;
			// .title{
			// 	width: 100%;
			// 	height: 0.346667rem;
			// 	border-left: 4px solid #ff5b4c;
			// 	font-size: 0.373333rem;
			// 	color: #333333;
			// 	text-indent: 0.28rem;
			// 	margin-bottom: 0.346667rem;
			// }
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
				width: 100%;
				margin-bottom: 0.533333rem;
				tr{
					padding-bottom: 0.52rem;
				}
				td{
					padding: 0.346667rem 0;
					line-height:0.533333rem;
				}
				.tips_ico{
					height: 0.4rem;
					width: 0.4rem;
					display: inline-block;
					background: url(https://aliyunsso.edspay.com/web/wxUpdate/for_popwindow.png) no-repeat;
					background-size: 0.4rem 0.4rem;
					position: relative;
				    top: .08rem;
				    margin-left: .1rem;
				}
				.td1{
					width: 2.8rem;
					font-size: 0.373333rem;
					color: #8D8D8D;
				}
				.td2{
					font-size: 0.346667rem;
					color: #333333;
					width:6.2rem;
					letter-spacing: 0;
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
		.reques{
			background: #ffffff;
			padding:.4rem .4rem;
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
		.describeChoice.dis{
			position: fixed;
			width: 100%;
			left: 0;
			height: 1.04rem;
			z-index: 99;
		}
		.top1{
			top: 0;
		}
		.top2{
			top: 0;
		}
		.top3{
			top: 1.04rem;
		}
	}
</style>