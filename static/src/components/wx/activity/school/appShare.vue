<template>
        <div class="school-app">
            <invite-register class="app-register" channel="yaoqing" :inviterId="inviterId" :toLink="'/school/schoolMain'"></invite-register>
            <img class="app-gif" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_yaoqingdongtu.gif"/>
        </div>
</template>
<script>
import inviteRegister from '../wxActivityRegister';	//引入表单验证
import jiami from 'js-base64';
export default {
    data () {
        return {
            inviterId:0,
        }
    },
    created () {
        if(this.$route.query.ui){
            this.inviterId = Base64.encode(this.$route.query.ui);	//获取邀请人id;
        } 
    },
    components:{
        inviteRegister,
    },
}
</script>
<style lang="scss" scoped>
    .school-app {
        width:100%;
        height:50.12rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/fenx_bg.png);
        background-size:100% 50.12rem;
        position: relative;
        overflow: hidden;
        .app-register {
            margin-top: 6.23rem;
        }
        .app-gif {
            width: 8.08rem;
            height: 5.733333rem;
            position: absolute;
            top: 20.493333rem;
            left: 1rem;
        }
    }
</style>

