<template>
	<div id="depositoryDef">
		<div class="header">
			<header>
				<div class="title" >开通存管账号</div>
				<a href="">完成</a>
			</header>
			<div class="falTop"></div>
		</div>
		<img src="https://aliyunsso.edspay.com/web/wx/dredge/defeat.png" alt="">
		<p class="p1">开通银行存管失败</p>
		<p>原因：{{cause}}</p>
		<a href="" class="goBtn">重新开通</a>
	</div>
</template>

<script>
	export default {
		data(){
			return {
				cause:'',
			}
		},
		created(){
			this.cause = this.$route.query.cause;
		},
	}
</script>

<style lang="scss" scoped>
	#depositoryDef{
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
		}
		header a{
			position:absolute;
			top:0.333333rem;
			right:0.533333rem;
			color:#fff;
			font-size:0.373333rem;
			line-height:0.533333rem;
		}
		header .title{
			font-size: 0.426667rem;
		    width: auto;
			line-height:1.226667rem;
			color:#fff;
		}
		.falTop{
			height:1.226667rem;
		}
	}
</style>