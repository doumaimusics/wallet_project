<template>
    <div class="vipUpdate-main">
        <div v-title>VIP专属活动（一）</div>
        <!-- 等级详情 -->
        <div class="level-div" :class="{'login-level':login}">
            <img class="login-btn" @click="goLogin" v-if="!login" src="https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/denglu.png"/>
            <div v-else>
                <p>
                    <span>首次出借时间</span>
                    <span>{{info.firstDay ? info.firstDay : 0}}</span>
                </p>
                <p>
                    <span>待收本金</span>
                    <span>{{info.money ? info.money : 0}}</span>
                </p>
                <p>
                    <span>基础VIP等级</span>
                    <span>{{info.oldVip ? info.oldVip : 0}}</span>
                </p>
                <p>
                    <span>当前VIP等级</span>
                    <span>{{info.currentVip ? info.currentVip : 0}}</span>
                </p>
            </div>
        </div>
        <!-- 出借按钮 -->
        <img class="invest-btn" @click="goInvest"  src="https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/ljcj.png"/>
        <!-- 规则按钮 -->
        <img class="rule-btn" @click="openRule = true" src="https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/guize_icon.png"/>
        <!-- 规则弹框 -->
        <div v-layer v-if="openRule">
            <div class="rule-main">
                <a href="tel:400-135-3388"></a>
                <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
                <div class="rule-close" @click="openRule = false"></div>
            </div>
        </div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
import wxShare from '../../../../common/wx/wxShare';
import { MessageBox } from 'mint-ui';
export default {
    mixins: [wxToapp,wxShare],
    data () {
        return{
            login:false,
            openRule:false,
            timeStatus:0,
            info:{
                firstDay: 0,
                oldVip:0,
                money:0,
                currentVip:0,
            },
            shareObj: {
                title: "出借时长，助力VIP“升级”", 
                desc: "E都市钱包邀请您领取VIP福利",
                link: global.host+"activity/vipUpdate", 
                imgUrl: "https://aliyunsso.edspay.com/web/icon.png"
            },
        }
    },
    methods: {
        // 去理财列表页
        goInvest () {
            window._czc.push(["_trackEvent",'vip专属活动','点击立即出借按钮']);
            if (this.login) {
                if (this.timeStatus == 2 || this.timeStatus == 3) {
                     this.checkTime()
                } else {
                    this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
                }
            } else {
                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
            }
        },
        // 去登陆
        goLogin () {
            this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
        },
        // 获取信息
        getInfo () {
            this.getNotlogData('/vip/getMyVip',(data) => {
                if(data.resCode == 1){
                    this.info = data.resData
                }
            },{},)
        },
        // 获取活动时间范围
        getTime () {
            this.getNotlogData('/activity/two/getActivityTime',(data) => {
                if(data.resCode == 1){
                    this.timeStatus = data.resData.active
                    this.checkTime()
                }
            },{activityId:'vip_zhuli_activity'},)
        },
        // 判断活动时间
        checkTime () {
            if (this.timeStatus == 2) {
                MessageBox('温馨提示', '该活动尚未开始！');
            } else if (this.timeStatus == 3) {
                MessageBox('温馨提示', '该活动已结束！');
            }
        }
    },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        }
    },
    created () {
        this.getCookie('userToken') || this.userId? this.login = true : this.login = false;
        this.getInfo()
        this.getTime()
    },
    mounted () {
        this.getWxShareData(this.shareObj);
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1275291634&web_id=1275291634'
        script.language = 'JavaScript'
        document.body.appendChild(script)
    }
}
</script>
<style lang="scss" scoped>
    .vipUpdate-main {
        width: 100%;
        height: 32.373333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/wxBg2.png);
        background-size: 100% 32.373333rem;
        position: relative;
        .level-div {
            width: 8.133333rem;
            height: 3.2rem;
            position: absolute;
            top: 12.066667rem;
            left: .933333rem;
            .login-btn {
                display: inline-block;
                width: 5.013333rem;
                height: 1.2rem;
                margin: .9rem 1.4rem;
            }
            p {
                height: .8rem;
                width: 100%;
                line-height: .8rem;
                font-size: .373333rem;
                color: #775500;
                span {
                    display: inline-block;
                }
                span:nth-of-type(1) {
                    width: 40%;
                    padding-left: .4rem;
                }
                span:nth-of-type(2) {
                    width: 55%;
                    font-size: .346667rem;
                    color: #666666;
                    font-family: DIN-Bold;
                    padding-left: .533333rem;
                }
            }
        }
        .login-level {
            // background: url(https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/biaoge.png);
            // background-size: 8.133333rem 3.2rem;
        }
        .invest-btn {
            width: 9.333333rem;
            height: 1.333333rem;
            position: fixed;
            bottom: .266667rem;
            left: .333333rem;
        }
        .rule-btn {
            width: 1.066667rem;
            height: 1.066667rem;
            position: fixed;
            top: 5.333333rem;
            right: .133333rem;
        }
        .rule-main {
            width: 8rem;
            height: 12.026667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/wxGuize2.png);
            background-size: 8rem 12.026667rem;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            a {
                display: inline-block;
                width: 2.346667rem;
                height: .506667rem;
                margin: 9.586667rem 0 0 4.026667rem;
            }
            p {
                font-size: .293333rem;
                color: #666666;
                text-align: center;
            }
            .rule-close {
                width: .72rem;
                height: .72rem;
                position: absolute;
                bottom: 0;
                left: 3.65rem;
            }
        }
    }
</style>
