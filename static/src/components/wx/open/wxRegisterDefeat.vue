<template>
	<div id="success">
		<div class="header">
			<header>
				<div class="title" >注册</div>
				<router-link to="" tag="span">完成</router-link>
			</header>
			<div class="tidao"></div>
		</div>
		<img src="https://aliyunsso.edspay.com/web/wx/register/defeat.png" alt="">
		<p class="p1">注册失败</p>
		<p>原因：断网了</p>
		<router-link to="" class="goBtn">重新注册</router-link>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		methods:{
			rollback(){

			}
		}
	}
</script>

<style lang="scss" scoped>
	#success{
		img{
			width:10.0rem;
		}
		p{
			padding-bottom:1.2rem;
			text-align:center;
			font-size:0.373333rem;
			color:#808080;
		}
		.p1{
			padding-bottom:0;
			padding-top: 0.266667rem;
		}
		.goBtn{
			display:block;
			text-align:center;
			width:8.773333rem;
			margin: 0 auto;
			height:1.066667rem;
			border-radius:0.106667rem;
			background:#ff5b4c;
			color:#fff;
			line-height:1.066667rem;
			font-size:0.426667rem;
		}
		header{
			position: fixed!important;
			z-index: 999;
			top:0;
			left:0;
			width:100%;
			height:1.226667rem;
			background:#ff5a4a !important;
			position:relative;
			text-align:center;
			span{
				position:absolute;
				top:0.333333rem;
				right:0.533333rem;
				color:#fff;
				font-size:0.426667rem;
				line-height:0.533333rem;
			}
			.title{
			    width: auto;
				line-height:1.226667rem;
				color:#fff;

			}
		}
		.tidao{
			height:1.226667rem;
		}
	}
</style>