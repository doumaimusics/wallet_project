<template>
	<div class="security">
		<wx-header v-if="!osType" :logo="'安全保障'"></wx-header>
		<img src="https://aliyunsso.edspay.com/web/wx/index/safe.png" alt="">
	</div>
</template>
<script>
	import wxHeader from '../../wxHeader';	//引入头部
	import wxToapp from '../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data() {
			return {}
		},
		components:{
			wxHeader,
		},
	}
</script>
<style lang="scss" scoped>
	.security{
		width: 100%;
		img{
			width: 100%;
		}
	}
</style>
