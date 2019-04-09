<template>
	<div id="test">
		<wx-header :logo="'活动'"></wx-header>
		<embed class="testWeb" type="text/html" :src="$route.query.toUrl" />
	</div>
</template>

<script>
	import wxHeader from '../../wxHeader';	//引入头部
	export default{
		data(){
			return{

			}
		},
		components:{
			wxHeader,
		},
	}
</script>

<style lang="scss" scoped>
	#test{
		.testWeb{
			width: 100%;
			height: 16.48rem;
		}
	}
</style>