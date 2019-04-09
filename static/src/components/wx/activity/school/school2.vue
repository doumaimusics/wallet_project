<template>
    <div class="school-div2">
        <div class="school2-data">
            <!-- 年化 -->
            <span>{{info.totalYear}}</span>
            <!-- 可兑换金额 -->
            <span>{{info.totalMoney}}</span>
            <!-- 登录按钮 -->
            <img class="school2-btn" v-if="!login" @click="goLogin" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/2_lijidenglu.png"/>
            <!-- 出借按钮 -->
            <img class="school2-btn" v-else-if="info.totalYear==0" @click="goInvest" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/2-lijichujie.png"/>
            <!-- 可兑换按钮 -->
            <img class="school2-btn" v-else @click="comExchange" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/2-lijiduihuan.png"/>
            
        </div>
        <!-- 兑换提示 -->
        <p class="school2-tip" v-if="login">
            <i></i>
            活动期间只有一次兑换机会
        </p>
        <!-- 弹窗 -->
        <div class="school-mask" :style="fullHeight" v-if="isShow" @touchmove.prevent>
            <div class="school-dialog" ref="dialog">
                <!-- 关闭按钮 -->
                <div class="close-btn" @click="isShow = false"></div>
                <!-- 兑换按钮 -->
                <div class="exchange-btn" @click="goExchange" v-if="info.isExchange == 0"></div>
                <!-- 已兑换提示 -->
                <p v-if="isExchange">
                    您已兑换<span>{{info.useMoney | moneyFormat}}元</span>。如有疑问请联系客服
                </p>
            </div>
        </div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
import { MessageBox } from 'mint-ui';
export default {
    mixins: [wxToapp],
    props:['login','isOver'],
    data () {
        return {
            info:{
                totalYear:0,
                totalMoney:0
            },
            fullHeight:{
                height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
            },
            isShow:false,
            isExchange:false,
        }
    },
    methods: {
        getInfo () {
            this.getNotlogData('/kxj/getMyAccount',(data) => {
                if(data.resCode == 1){
                    this.info = data.resData
                }
            },{},)
        },
        // 去登陆
        goLogin () {
            this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
        },
        // 去投资
        goInvest () {
            if (this.isOver) {
                MessageBox('温馨提示', '该活动已结束！');
                return
            }
           this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
        },
        // 确认兑换
        comExchange () {
            if (this.isOver) {
                MessageBox('温馨提示', '该活动已结束！');
                return
            }
            this.isShow = true
            if (this.info.isExchange == 1) {
                this.isExchange = 1
                this.$nextTick(function () {
                    this.$refs.dialog.style.backgroundImage = "url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/wenxintishi.png)"
                })
            }
        },
        // 去兑换
        goExchange () {
            window._czc.push(["_trackEvent",'开学季','兑换']);
            this.getAppData('/kxj/exchange',(data) => {
                if(data.resCode == 1){
                    this.getInfo()
                    this.$refs.dialog.style.backgroundImage = "url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/tc_duihuanchengg.png)"
                }
            },{},)
        },
    }, 
    created () {
        this.getInfo()
    }
}
</script>
<style lang="scss" scoped>
    .school-div2 {
        width:100%;
        height:15.653333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/2_bg.png);
        background-size:100% 15.653333rem;
        overflow: hidden;
        .school2-data {
            width: 7.733333rem;
            height: 2.933333rem;
            margin: 1.466667rem auto 0 auto;
            span {
                display: inline-block;
                width: 48%;
                margin-top: .55rem;
                font-family: DIN-Bold;
                font-size: .533333rem;
                color: #FFFEFE;
                text-align: center;
                text-shadow: 0 .026667rem 0 #744727;
            }
             .school2-btn {
                display: block;
                width: 3.2rem;
                height: .88rem;
                margin: .866667rem auto 0 auto;
            }
        }
        .school2-tip {
            font-size: .32rem;
            color: #4D2100;
            text-align: center;
            margin-top: .133333rem;
            line-height: .44rem;
            i {
                display: inline-block;
                width: .16rem;
                height: .16rem;
                background: rgba(111,83,65,0.52);
                box-shadow: inset 0 1px 3px 0 #61391A;
                border-radius: 50%;
                margin: 0 .056667rem .038667rem 0;
            }
        }
        .school-mask {
            background: rgba(0,0,0,0.6);
            z-index: 1000;
            position: fixed;
            top: 0px;
            width: 100%;
            .school-dialog {
                width: 7.333333rem;
                height: 7.466667rem;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/tc_querenduihuan.png') no-repeat;
                background-size: 100%;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                p {
                    width: 100%;
                    position: absolute;
                    top: 4.373333rem;
                    text-align: center;
                    font-size: .32rem;
                    color: #333333;
                    span {
                        color: #FF2626;
                    }
                }
            }
            .close-btn {
                position: absolute;
                width: .666667rem;
                height: .666667rem;
                right: 0;
                top: 0;
            }
            .exchange-btn {
                position: absolute;
                width: 3.466667rem;
                height: 1rem;
                bottom: .466667rem;
                left: 1.933333rem;
            }
        }
    }
</style>

