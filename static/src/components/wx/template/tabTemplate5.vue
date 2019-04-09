<template>
	<div id="tabTemplate5">
		<wxReport v-for="list in reportList" :list="list"></wxReport>
	</div>
</template>
<script>
	import wxReport from '../../public/wx/wxReport'; // 引入媒体报道组件
	export  default {
		name: 'tabTemplate4',
		data() {
			return {
				reportList: []
			}
		},
		components:{
			wxReport
		},
		created () {
			this.getMedia()
		},
		methods: {
			// 获取媒体信息
			getMedia () {
				this.notLogPost('/index/newsReport',(data) => {
					if(data.resCode == 1){
      					 this.reportList = data.resData.data.list;
      				}
				},{pageNum:1,pageSize:1000,token:this.getCookie('userToken')})
			}
		},
	}
</script>
<style lang="scss">
	#tabTemplate5 {
		width: 100%;
		background: white;
	}
</style>