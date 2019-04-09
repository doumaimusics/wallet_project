<template>
	<div id="knowCard">
		<wx-header v-if="!osType" :logo="'了解三类卡'"></wx-header>
		<img src="https://aliyunsso.edspay.com/web/wx/account/aboutCard/threeCard1.png" alt="">
		<img src="https://aliyunsso.edspay.com/web/wx/account/aboutCard/threeCard2.png" alt="">
		<img src="https://aliyunsso.edspay.com/web/wx/account/aboutCard/threeCard3.png" alt="">
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';	//引入头部
	import wxToapp from '../../../../common/wx/wxToapp'
	export default{
		mixins:[wxToapp],
		data(){
			return{

			}
		},
		components:{
			wxHeader,
		}
	}
</script>

<style lang="scss" scoped>
	#knowCard{
		img{
			width: 100%;
		}
	}
</style>