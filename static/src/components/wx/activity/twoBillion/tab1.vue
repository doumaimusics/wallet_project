<template>
	<div id="tab1">
		<div class="main" v-if="listLength > 0">
			<div class="contain">
				<div class="title">
					<p class="account">总共消耗<span>{{con}}</span>贡献值</p>
				</div>
				<div class="main_text">
					<ul>
						<li v-for="item in changeList">
							<span class="span1">{{item.name}}</span>
							<span class="span2">{{item.count}}次</span>
							<span class="span3">{{item.contribution}}</span>
						</li>
					</ul>
				</div>
			</div>
			<div class="compute clear">
				<span>*</span>
				<div>
					<p>1.1000年化出借额=30贡献值</p>
					<p>2.年化出借额公式=出借金额÷12×项目期限(月份)</p>
					<p>(年化出借额：四舍五入取整数且天标与E起赚不计算年化出借额)</p>
				</div>
			</div>
		</div>
		<div v-else class="nothing_goods">
			<p>您尚未消耗贡献值喔，快去看看兑换奖品吧！</p>
		</div>
	</div>
</template>
<script type="text/javascript">
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		name: 'tab1',
		data() {
			return {
                con: 0,  // 总的消耗值
				listLength: 0, // 列表才长度
				changeList: [], //已兑换商品
				
			}
		},
		methods: {
			getData() {
				this.getAppData('/index/useContributionList', (res) => {
					console.log(res)
					
					if(res.resCode == 1) {
						this.con = res.resData.data.conCount;  // 总的消耗值
						this.changeList = res.resData.data.deaileList;  // 列表
						this.listLength = res.resData.data.deaileList.length; // 列表长度
					}
				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1)
			}
		},
		components: {
//			wxHeader,
		},
		created() {
			this.getData();
		}
	}
</script>
<style lang="scss" scoped>

	#tab1 {
		overflow: hidden;
		width: 100%;
		.main {
			width: 100%;
			height: auto;
			background: #4730ca;
			padding-top: 0.786667rem;
			padding-bottom: 0.746667rem;
			.contain {
				width: 9.2rem;
				height: auto;
				margin: 0 auto;
				.title {
					width: 9.2rem;
					height: 2.186667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/use_title.png) no-repeat;
					background-size: 100% 100%;
					.account {
						width: 100%;
						height: 0.933333rem;
						line-height: 0.933333rem;
						font-size: 0.373333rem;
						color: #56349A;
						text-align: center;
						span {
							color: #D83400;
							padding: 0 .1rem;
						}
					}
				}
				.main_text {
					width: 9.2rem;
					height: auto;
					background: -webkit-linear-gradient(left, #feb968, #FE6853);
					/* Safari 5.1 - 6.0 */
					background: -o-linear-gradient(right, #feb968, #FE6853);
					/* Opera 11.1 - 12.0 */
					background: -moz-linear-gradient(right, #feb968, #FE6853);
					/* Firefox 3.6 - 15 */
					background: linear-gradient(to right, #feb968, #FE6853);
					/* 标准的语法 */
					border-radius: 0px 0px 10px 10px;
					margin-bottom: 0.266667rem;
					ul {
						width: 8.906667rem;
						margin: 0 auto;
						padding-bottom: 0.2rem;
						li {
							width: 100%;
							background: #ffffff;
							font-size: 0;
							span {
								display: inline-block;
								font-size: 0.346667rem;
								height: 0.933333rem;
								line-height: 0.933333rem;
							}
							.span1 {
								width: 5.76rem;
								text-indent: 0.133333rem;
								color: #3A1289;
							}
							.span2 {
								width: 1.093333rem;
								text-align: left;
								color: #D95600;
							}
							.span3 {
								width: 2.0rem;
								text-align: center;
								color: #D95600;
							}
						}
						li:nth-child(even) {
							background: #ffffff;
						}
						li:nth-child(odd) {
							background: #fff8eb;
						}
					}
				}
			}
			.compute {
				padding: 0 0.386667rem;
				font-size: 0.346667rem;
				color: #FFFFFF;
				span {
					float: left;
					width: 0.48rem;
					display: inline-block;
					text-align: center;
				}
				div {
					float: left;
					width: 8.693333rem;
					p {
						line-height: .6rem;
					}
				}
			}
		}
		.nothing_goods {
			width: 100%;
			height: 6.293333rem;
			background: #4730ca url(https://aliyunsso.edspay.com/web/wx/twoBillon/nothing.png) no-repeat center center;
			background-size: 4.906667rem 2.666667rem;
			margin-top: 1rem;
			p {
				font-size: 0.4rem;
				color: #FFFFFF;
				text-align: center;
				padding-top: 5.133333rem;
			}
		}
	}
</style>