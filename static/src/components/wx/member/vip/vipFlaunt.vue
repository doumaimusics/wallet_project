<template>
    <div :style="{background:'url('+$route.query.bgUrl+') bottom no-repeat'}" id="flaunt">
        <img :src="$route.query.imgUrl" alt="">
    </div>
</template>

<script>
    export default{
    	data(){
    		return{

    		}
    	},
    	methods:{

    	},
    	created(){
    		
    	},
        mounted(){
            $('#flaunt').height(document.documentElement.clientHeight);
        }
    }
</script>

<style lang="scss" scoped>
    #flaunt{
        background-size: 100%!important;
        img{
            width: 100%;
        }
    }
</style>