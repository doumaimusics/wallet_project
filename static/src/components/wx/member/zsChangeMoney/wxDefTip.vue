<template>
	<div id="recharge">
		<div id="layer">
			<div class="content">
				<div class="title">{{textList[flag]}}失败</div>
				
				<img v-if="textList[flag] == '提现'"  src="https://aliyunsso.edspay.com/web/wxUpdate/tixian_null.png" alt="">
				<img v-if="textList[flag] == '充值'" src="https://aliyunsso.edspay.com/web/wxUpdate/chonzhi_null.png" alt="">
				<h3>很抱歉，{{textList[flag]}}失败</h3>
				<!--  -->
				<p>{{cause}}</p>

				<div class="btns" @click="showTip.isShow = false">我知道了</div>
				<div class="goBtn" @click="goRecharge">使用转账充值</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		data(){
			return {
				textList:['充值','提现'],
				
			}
		},
		props:['cause','showTip','flag','goRecharge'],
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
			padding:0 0.266667rem;
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
			margin-bottom: .32rem;
		}
		.goBtn{
			font-family: PingFangSC-Regular;
			font-size: .346667rem;
			color: #4C7DE9;
			text-align: center;
			text-decoration:underline;
		}
	}
</style>