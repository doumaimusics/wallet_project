<template>
	<div class="img">
		<wx-header v-if="!osType" :logo="'大额支付'"></wx-header>
		<img src="https://aliyunsso.edspay.com/web/wx/invest/bigMoney.png?v1.1" alt="">
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';
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
	.img{
		img{
			width:10.0rem;
		}
	}
</style>