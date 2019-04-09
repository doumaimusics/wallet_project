<template>
	<div id="layerBox">
		<div class="task">
			<div class="goods_title clear"><div class="txt fl">以下任意达标可领取</div><div class="redColor fl">{{getGoodCondition.goodTitle}}</div>
				<i @click="taskBox.isShow = false"></i>
			</div>
			<div class="task_contain">
				<div class="div_box bdr-b">
					<p class="p1">
						<span>90天</span>
						<span>{{getGoodCondition.amount90 | moneyFormat(1)}}</span>
						<span class="sp3">{{getGoodCondition.amountOne | moneyFormat(1)}}</span>
					</p>
					<p class="p2">
						<span>出借项目</span>
						<span>累计出借满</span>
						<span>还需出借</span>
					</p>
				</div>
				<div class="div_box bdr-b">
					<p class="p1">
						<span>180天</span>
						<span>{{getGoodCondition.amount180 | moneyFormat(1)}}</span>
						<span class="sp3">{{getGoodCondition.amountTwo | moneyFormat(1)}}</span>
					</p>
					<p class="p2">
						<span>出借项目</span>
						<span>累计出借满</span>
						<span>还需出借</span>
					</p>
				</div>
				<div class="div_box">
					<p class="p1">
						<span>360天</span>
						<span>{{getGoodCondition.amount360 | moneyFormat(1)}}</span>
						<span class="sp3">{{getGoodCondition.amountThree | moneyFormat(1)}}</span>
					</p>
					<p class="p2">
						<span>出借项目</span>
						<span>累计出借满</span>
						<span>还需出借</span>
					</p>
				</div>
				<div class="toInvestBtn" @click="toInvestBtn"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		props:['getGoodCondition','taskBox'],
		data () {
			return {
				// dataList:[
				// 	{
				// 		investTitle:'出借项目',
				// 		investFull:'累计出借满',
				// 		investNeed:'还需出借',
				// 		investMoney:getGoodCondition.amount90,
				// 	}
				// ],
			}
		},
		methods:{
			//去投资
			toInvestBtn () {
				if(this.userId || this.getCookie('userToken')){
					this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
				}else{
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
				}
			}
		},
	}
</script>
<style lang="scss" scoped>
	#layerBox{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		top:0;
		z-index:100;
		padding-top: 2.666667rem;
		.task{
			position: absolute;
			width: 100%;
			bottom: 0;
			background: #fff;
			.goods_title{
				width: 100%;
				height: 1.173333rem;
				background: #ffffff;
				line-height: 1.173333rem;
				border-bottom: 1px solid #E5E5E5;
				position: relative;
				div{
					font-size: 0.373333rem;
				}
				.txt{
					color: #333333;
					margin-left: 0.4rem;
					position: relative;
				}
				.redColor{
					color: #FF5B4C;
				    display: inline-block;
				    width: 5.2rem;
				    text-align: left;
				    white-space: nowrap;
				    overflow: hidden;
				    text-overflow: ellipsis;
				}
				i{
					display: inline-block;
					width: 0.48rem;
					height: 0.48rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/close_ico.png) no-repeat;
					background-size: 0.48rem 0.48rem;
					position: absolute;
					top: 0.36rem;
					right: 0.4rem;
				}
			}
			.goods_title.txt2{
				text-align: center;
			}
			.task_contain{
				background: #ffffff;
				padding: 0 0.533333rem;
				.div_box{
					position: relative;
					height: 1.693333rem;
					padding-top: 0.266667rem;
					p{
						position: relative;
						font-size: 0;
						span{
							display: inline-block;
							width: 33%;
							text-align: center;
						}
					}
					.p1{
						span{
							font-family: DIN-Medium;
							font-size: 0.48rem;
							color: #333333;
						}
						.sp3{
							color: #FF5B4C;
						}
					}
					.p2{
						span{
							font-family: PingFang-SC-Medium;
							font-size: 0.32rem;
							color: #808080;
						}
					}
				}
				.toInvestBtn{
					width: 4.8rem;
					height: 0.933333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/invest.png) no-repeat;
					background-size: 4.8rem 0.933333rem;
					margin: 0.266667rem auto 0.666667rem;
				}
			}
		}
	}
</style>