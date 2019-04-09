<template>
	<div id="success">
		<wx-header :logo="logoMsg" :type="0"></wx-header>
		<router-link :to="{path:'/wxIndex'}" class="finish" tag="a">完成</router-link>
		<div class="content">
			<div class="img">
				<img src="https://aliyunsso.edspay.com/web/wx/account/trueGou.png" alt="">
				<p>开通成功</p>
			</div>
		</div>
		<p class="tips">恭喜您，成功开通浙商银行存管账户</p>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'
	export default {
		data(){
			return {
				logoMsg:'开通存管',
				result:null	,
				cause:'',
				goUrl:'',
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.result = this.$route.query.result
			this.cause = this.$route.query.cause
			this.goUrl = this.$route.query.goUrl
			
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度

			//动态的为根元素设置字体的大小
			$('#success').height(height)
		}
	}
</script>

<style lang="scss" scoped>
	#success{
		background:#fff;
		.finish{
			position:absolute;
			top:0;
			right:0.4rem;
			z-index:999;
			font-size:0.346667rem;
			line-height:1.2rem;
			color:#ff5b4c;
		}
		.content{
			height:5.733333rem;
			padding-top:0.666667rem;
			background:url(https://aliyunsso.edspay.com/web/wx/invest/investResult.png) no-repeat;
			background-size: 100%;
			.img{
				display:block;
				width:2.773333rem;
				height:2.773333rem;
				margin: 0.666667rem auto 0;
				padding-top:0.65rem;
				background:url(https://aliyunsso.edspay.com/web/wx/account/resultQuan.png);
				background-size:100% 100%;
				img{
					display:block;
					margin: 0 auto;
					width:1.013333rem;
					height:0.746667rem;
				}
				p{
					text-align:center;
					color:#fff;
					font-size:0.4rem;
					line-height:0.56rem;
				}
			}
		}
		.btns{
			padding:0 0 0 0.666667rem;
			span{
				float:left;
				border-radius:0.106667rem;
				border:0.013333rem solid #ff5b4c;
				width:3.973333rem;
				height:1.04rem;
				text-align:center;
				line-height:1.04rem;
				margin-right:0.6rem;
				color:#ff5b4c;
			}
			span:last-child{
				color:#fff;
				background:#ff5b4c;
			}
		}
		.tips{
			font-size:0.4rem;
			line-height:0.56rem;
			color:#808080;
			padding: 0.266667rem 0 1rem;
			text-align:center;
		}
	}

</style>