<template>
	<div id="recharge">
		<div id="layer">
			<div class="content">
				<div class="title">修改{{cause == 'card' ? '银行卡':'手机号'}}失败</div>
				
				<img src="https://aliyunsso.edspay.com/web/wx/invest/default.png" alt="">
				<h3>{{tipText[result]}}</h3>
				<p>失败原因:{{cause}}</p>

				<div class="btns" @click="showThis.isShow = false">确认</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		data(){
			return {
				result:'',
				tipText:{
					card:'抱歉，修改存管银行卡失败',
					phone:'抱歉，修改预留手机号失败'
				}
			}
		},
		props:['cause','showThis','result'],
	}
	
</script>

<style lang="scss" scoped>
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:999;
		top:0;
		.content{
			box-sizing:border-box;
			padding-bottom:  0.64rem;
			position:absolute;
			top:45%;
			left:50%;
			margin:-5.066667rem 0 0 -3.8rem;
			width:7.493333rem;
			border-radius:0.266667rem;
			background:#fff;
			font-size:0.373333rem;
			line-height:0.533333rem;
			.title{
				border-top-right-radius: 0.266667rem;
				border-top-left-radius: 0.266667rem;
				height:1.2rem;
				line-height:1.2rem;
				text-align:center;
				color:#333;
				background:#f3f3f3;
				font-size: 0.4rem;
			}
		}
	}
	#recharge{
		img{
			display:block;
			width:3.533333rem;
			height:3.413333rem;
			margin:0.4rem auto 0.8rem;
		}
		h3{
			font-size:0.426667rem;
			line-height:0.613333rem;
			padding-bottom:0.266667rem;
			color:#333;
			text-align:center;
		}
		p{
			color:#808080;
			font-size:0.373333rem;
			line-height:0.533333rem;
			padding-bottom:0.773333rem;
			text-align:center;
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
		}
	}
</style>