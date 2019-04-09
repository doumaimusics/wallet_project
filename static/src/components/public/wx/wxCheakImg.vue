<template>
	<img @click="cheak.isCheak = !cheak.isCheak" :src="cheak.isCheak ? 'https://aliyunsso.edspay.com/web/wx/pointToPoint/check.png':'https://aliyunsso.edspay.com/web/wx/pointToPoint/uncheck.png'" alt="">
</template>

<script>
	export default {
		props:['cheak']
	}
</script>

<style lang="scss" scoped>
	img{
				//float:left;
				width:0.32rem;
				height:0.32rem;
				//background:url(https://aliyunsso.edspay.com/web/wx/depository/Cheak.png);
				background-size:100% 100%;
			}
</style>