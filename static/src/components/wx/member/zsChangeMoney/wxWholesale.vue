<template>
	<div id="recharge">
		<div id="layer">
			<div class="content">
				<div class="title">充值超过限额</div>
					<p>充值金额超过您当前{{bankName}}(尾号{{cardId}})单笔最高限额。需要大额充值请使用转账充值。</p>				
				<div class="btns">
					<span @click="showThis.isShow = false">调整金额</span>
					<span @click="goRecharge">转账充值</span>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		props:['showThis','cardId','bankName','goRecharge'],
		methods:{
			// goRecharge(){
			// 	this.$router.push('/transferRecharge')
			// }
		}
	}
	
</script>

<style lang="scss" scoped>
	@import "../../../../style/wxLayer.scss";
	#recharge{
		p{
			font-size:0.346667rem;
			line-height:0.48rem;
			color:#808080;
			padding:0.48rem 0.4rem 0.773333rem;
		}
		.btns{
			padding:0 0.4133rem 0.506667rem;
			span{
				float:left;
				height:0.96rem;
				width:2.986667rem;
				font-size: 0.426667rem;
				line-height:0.96rem;
				text-align:center;
				color:#ff5b4c;
				border:1px solid #ff5b4c;
				border-radius:0.106667rem;
			}
			span:last-child{
				float:right;
				background:#ff5b4c;
				color:#fff;
			}
		}
	}
</style>