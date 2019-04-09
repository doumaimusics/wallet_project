<template>
	<div id="nothing">
		
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp.js';   // 与app交互
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			
		},
		created(){
			// this.$router.replace('/risk/EFriendClass');
			this.$router.replace({path:'/risk/riskEducation',query: this.$route.query})
		}
	}
</script>
<style lang="scss" scoped>
	#nothing{
	}
</style>