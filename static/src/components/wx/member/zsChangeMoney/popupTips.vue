<template>
	<div id="recharge">
		<div id="layer">
			<div class="content">
				<div class="title">关于可提现余额</div>
				
				<ul>
					<li>浙商存管账户当天充值的金额不能立即提现，需等待T+1个工作日，银行清算完成后才能提现哦</li>
					
				</ul>

				<div class="btns" @click="showThis.isShow = false">我知道了</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		props:['showThis'],
	}
	
</script>

<style lang="scss" scoped>
	@import "../../../../style/wxLayer.scss";
	#recharge{
		
		ul{
			padding: 0.32rem 0.4rem 0;
			li{
				font-size:0.346667rem;
				line-height:0.493333rem;
				padding-bottom:0.133333rem;
				color:#808080;;
			}
		} 
		.btns{
			width: 6.666667rem;
			height:0.96rem;
			margin:0 auto;
			text-align:center;
			border-radius:0.106667rem;
			background:#ff5b4c;
			font-size:0.426667rem;
			line-height:0.933333rem;
			color:#fff;
			margin-top:0.4rem;
		}
	}
</style>