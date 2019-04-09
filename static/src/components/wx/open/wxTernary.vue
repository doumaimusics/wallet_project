<template>
	<div id="ternary">
		<div v-html="dataText" class="ternaryText"></div>
	</div>
</template>

<script>
	import wxToapp from '../../../common/wx/wxToapp'
	export default{
		mixins:[wxToapp],
		data(){
			return{
				dataText:''
			}
		},
		methods:{
			getData(){
				this.notLogPost('/tender/rewardInfo',(data) => {
					if(data.resCode){
						this.dataText = data.resData.ruleTxt;
					}
				},{oauthToken:this.token},1)
			}
		},
		created(){
			this.getData();
		}
	}
</script>

<style lang="scss">
	.ternaryText{
		font-size:13px;
		p{
			padding-bottom:5px;
			line-height:20px;
		}
	}
</style>