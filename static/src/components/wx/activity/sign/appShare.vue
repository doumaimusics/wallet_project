<template>
    <div class="sign-root" :style="fullHeight">
        <div v-title>签到有礼</div>
        <!-- 签到中心 -->
        <div class="sign-center">
            <div class="sign-go" @click="goSign"></div>
        </div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp'
export default {
    mixins: [wxToapp],
    data() {
        return{
             fullHeight:{
                height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
            },
        }
    },
    methods: {
        goSign () {
            this.appRouter('/sign/signMain',{thisUrl: this.$route.fullPath});
        }
    }
}
</script>
<style lang="scss" scoped>
    .sign-root {
        width: 100%;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/bg.png) center center no-repeat;
        background-size: cover;
        position: relative;
        overflow: hidden;
        .sign-center {
            width: 9.866667rem;
            height: 16.76rem;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/fenx1.png) no-repeat;
            background-size: cover;
            margin: auto;
            .sign-go {
                width: 6.666667rem;
                height: 1.466667rem;
                margin:11.02rem auto 0 auto;
            }
        }
    }
</style>
