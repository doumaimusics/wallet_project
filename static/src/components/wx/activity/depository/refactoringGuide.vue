<template>
	<div id="guide">
		<wx-header v-if="!osType" :logo="'存管开通指引流程'"></wx-header>
		<div class="main"></div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader';
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data(){
			return {

			}
		},
		components: {
			wxHeader
		}
	}
</script>
<style lang="scss">
	#guide{
		.main{
			width: 100%;
			height: 83.04rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cgGuide/progressApp.jpg?v1.1) no-repeat;
			background-size:100%; 
		}
	}
</style>