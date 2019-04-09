<template>
    <div class="signItem-root">
         <!-- awardType -1可领还没领 0已领取  1不可领 -2连续签到，当天还没领取奖励 -->
        <!-- complete 0可以补签 -1超过补签次数 -->
        <!-- sign true已经签到 false没签到 -->
        <!-- passCom 1超过可补签的时间 -->
        <!-- 已领奖品 -->
        <div class="lead-i"  v-if="info.awardType == 0"></div>
        <!-- 奖品不足但是签到成功 -->
        <div class="noaward-i"  v-else-if="(info.awardType == 1 || info.awardType == -1) && info.sign"></div>
        <!-- 奖品补签 -->
        <div class="comaward-i" v-else-if="info.complete == 0&&(info.awardType == 1 || info.awardType== -1)" @click="toCom"></div>
        <!-- 可领奖品 -->
        <div class="collar-i" v-else-if="info.awardType== -2"  @click="signIn(info.isNow)"></div>
        <!--不可领奖品 -->
        <div class="unclaimed-i" v-else-if="(info.awardType == 1 ||info.awardType == -1)&&info.passCom == 1" @click="showDialog('https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_qdsb.png')"></div>
        <div class="unclaimed-i" v-else-if="(info.awardType == 1 ||info.awardType == -1)&&info.complete == -1" @click="showDialog('https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_bqyw.png')"></div>
        <div class="unclaimed-i" v-else-if="info.awardType == 1 ||info.awardType == -1" @click="signIn(info.isNow)"></div>
        <!-- 未登录显示黄色 -->
        <div class="yellow-i"  v-else-if="!isLogin">{{info.date}}</div>
        <!-- 已签到 -->
        <div class="signed-i" v-else-if="info.sign">{{info.date}}</div>
        <!-- 超过可用补签次数 -->
        <div class="nocom-i" v-else-if="info.complete == -1" @click="showDialog('https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_bqyw.png')"></div>
        <!-- 超过可补签时间 -->
        <div class="unsign-i" v-else-if="info.passCom == 1" @click="showDialog('https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_qdsb.png')">{{info.date}}</div>
        <!-- 补签 -->
        <div class="comsign-i" v-else-if="info.complete == 0" @click="toCom"></div>
        <!-- 未签到 -->
        <div class="unsign-i" v-else-if="!info.sign" @click="signIn(info.isNow)">{{info.date}}</div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp'
export default {
    mixins: [wxToapp],
    data () {
        return {}
    },
    props:['info','signIn','isLogin'],
    methods:{
        // 去补签
        toCom () {
            this.appRouter('/signIn',{thisUrl: this.$route.fullPath});
        },
        // 显示弹窗
        showDialog (val) {
            this.$emit('showDialog',val)
        }
    }
}
</script>
<style lang="scss" scoped>
    .signItem-root {
        float: left;
        div {
            width: 1.066667rem;
            height: 1.12rem;
            margin-bottom: .133333rem;
            margin-right: .106667rem;
            float: left;
            font-size: .4rem;
            line-height: 1.35rem;
            text-align: center;
        }
        .yellow-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/huang.png);
            background-size: 1.066667rem 1.12rem;
            color: #FF7100;
        }
        .noaward-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/Icon2-2.png);
            background-size: 1.066667rem 1.12rem;
            color: #FF7100;
        }
        .unsign-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/weiqiandao.png);
            background-size: 1.066667rem 1.12rem;
            opacity: 0.9;
            color: #FFFFFF;
        }
        .signed-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/yiqian.png);
            background-size: 1.066667rem 1.12rem;
            color: #FF7100;
        }
        .comaward-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/giftbu.png);
            background-size: 1.066667rem 1.12rem;
        }
        .comsign-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/buqian.png);
            background-size: 1.066667rem 1.12rem;
        }
        .unclaimed-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/bukeling.png);
            background-size: 1.066667rem 1.12rem;
        }
       .collar-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/keling.png);
            background-size: 1.066667rem 1.12rem;
        }
       .lead-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/yiling.png);
            background-size: 1.066667rem 1.12rem;
        }
        .nocom-i {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/buqian_hui.png);
            background-size: 1.066667rem 1.12rem;
        }
    }
</style>
