<template>
    <div id="treasureRult">
        <a href="tel:400-135-3388">400-135-3388</a>
        <p v-if="osType == 'IOS'">本活动与苹果公司无关</p>
    </div>
</template>

<script>
    import wxToapp from '../../../../../../common/wx/wxToapp.js';
    export default{
        mixins:[wxToapp],
    	data(){
    		return{

    		}
    	},
    	methods:{

    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #treasureRult{
        width: 100%;
        height:36.68rem;
        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/rult.png') no-repeat;
        background-size: 100% 100%;
        position: relative;
        font-size:0.32rem;
        line-height:0.4rem;
        a{
            position: absolute;
            bottom:3.02rem;
            right:5.0rem;
            color:#7f00ff;
        }
        p{
            position: absolute;
            bottom:2.3rem;
            text-align:center;
            width:100%;
        }

    }
</style>