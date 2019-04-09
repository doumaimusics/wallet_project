<template>
    <div id="account">
        <div v-title>开户教学</div>
        <div @click="appRouter('/wxMyAccount/wxHelpCenters')" class="help"></div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp';
    export default{
        mixins:[wxToapp],
    	data(){
    		return{

    		}
    	},
    	methods:{

    	},
    	created(){
    		
    	},
        mounted(){
            this.PassValue('NavWhite_开户教学')
        }
    }
</script>

<style lang="scss" scoped>
    #account{
        height: 85.68rem;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/account.png') no-repeat;
        background-size: 100%;
        position: relative;
        .help{
            position: absolute;
            bottom:0.36rem;
            left:0;
            width:100%;
            height:1.333333rem;
        }
    }
</style>