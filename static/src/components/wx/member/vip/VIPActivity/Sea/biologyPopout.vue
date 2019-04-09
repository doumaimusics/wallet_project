<template>
    <div v-layer id="biologyPopout">
    	<div :style="{background:'url(https://aliyunsso.edspay.com/web/wx/vip/treasure2/biology'+seaData.seaLife+'.png) no-repeat'}" class="content">
    		<div @click="closeTip" class="close"></div>
    	</div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{

    		}
    	},
    	props:['seaData'],
    	methods:{
    		closeTip(){
    			this.$emit('changeTip',false);
    		}
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #biologyPopout{
		padding-top: 3.066667rem;
		.content{
			height: 9.413333rem;
			width: 7.2rem;
			margin: 0 auto;
			background-size: 100% 100%!important;
			padding-top: 8.53rem;
			.close{
				height:0.933333rem;
				width: 0.933333rem;
				margin: 0 auto;
			}

		}
    }
</style>