<template>
	<div id="layer">
		<div class="content">
			<div @click="goAccount" v-if="btnType == 'old'" class="btn">激活存管账户</div>
			<div @click="goAccount" v-else class="btn">立刻开通</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return {

			}
		},
		props:['btnType','goHref'],	//接收按钮文字与链接
		methods:{
			goAccount(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	#layer{
		width:100%;
		height:100%;
		position:fixed;
		z-index:999;
		background:rgba(0,0,0,0.5);
		.content{
			position: absolute;
			top: 45%;
			left: 50%;
			margin:-5.34rem 0 0 -4.14rem;
			width:8.28rem;
			height:10.68rem;
			background:url(https://aliyunsso.edspay.com/web/wx/popup/popupBaohai.png);
			background-size:100%;
			.btn{
				margin:8.573333rem auto 0;
				width:7.2rem;
				height:1.706667rem;
				background:url(https://aliyunsso.edspay.com/web/wx/popup/redBtn.png);
				background-size:100%;
				text-align:center;
				line-height:1.6rem;
				font-size:0.426667rem;
				color:#fff;
			}
		}
	}
</style>