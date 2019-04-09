<template>
	<div class="address">
		<v-distpicker type="mobile"></v-distpicker>
	</div>
</template>
<script>
	import VDistpicker from 'v-distpicker'
	export default{
		data(){
			return{

			}
		},
		components:{
			VDistpicker
		}
	}
</script>
<style lang="scss" scoped>
	.address{
		.address-container{
			ul:first-child{
				display: block;
			}
		}
	}
</style>