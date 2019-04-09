<template>
    <div id="achieve">
        <div class="main">
            <div class="btn" @click="appRouter('/supervise/constitution')"></div>
        </div>
    </div>
</template>

<script>
import wxToapp  from '../../../../common/wx/wxToapp'
export default {
    mixins:[ wxToapp ],
    data(){
        return{

        }
    },
    methods: {
        
    },
   
}
</script>

<style lang="scss" scoped>
    #achieve{
        width: 100%;
        .main{
            height: 36.48rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/wx_achieve.png?v=1.2) no-repeat;
            background-size: cover;
            position: relative;
            .btn{
                width: 6.666667rem;
                height: 1.233333rem;
                position: absolute;
                top: 32.111111rem;
                left: 0;right: 0;
                margin: auto;
            }
        }
    }
</style>