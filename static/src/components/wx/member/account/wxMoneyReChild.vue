<template>
	<div class="content">
		<div class="top">
			<span class="fl">充值状态</span>
			<span class="fr">交易时间/金额</span>
		</div>
		<div class="topTi"></div>
		<ul>
			<li v-for="item in dataList">
				<div class="result fl">{{textList[item.status]}}</div>
				<div class="right fr">
					<div class="money">+{{item.money}}元</div>
					<div class="time">{{item.addTime}}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		props:['flag','dataUrl','titleList']
	}
</script>

<style lang="scss" scoped>
	.top{
		height:1.066667rem;
		width:100%;
		top:0;
		position:fixed;
		top:2.626667rem;
		z-index: 100;
		background: #F8F8F8;
		span{
			text-align:center;
			width:50%;
			line-height:1.066667rem;
			color:#333;
		}
	}
	.topTi{
		height:1.066667rem;
	}
	ul{
		background:#fff;
		padding-left:0.266667rem;
		li{
			padding-top:0.4rem;
			border-bottom: 1px solid #F2F2F2;
			font-size:0.426667rem;
			line-height:0.48rem;
			height:1.946667rem;
			.result{
				color:#333;
			}
			.right{
				text-align:right;
				padding-right:0.4rem;
				.money{
					color:#FFA500;
					padding-bottom:0.35rem;
				}
				.time{
					color:#888888;
				}
			}
		}
	}
</style>