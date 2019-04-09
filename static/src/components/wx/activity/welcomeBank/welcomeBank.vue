<template>
    <div id="welcomeBank">
        <wx-header v-if="!osType" :logo="'迎存管送现金福利'"></wx-header>
        <div class="body">
            <!--福利一界面-->
            <div class="fuli1">
                <ul>
                    <li v-for="(v, index) in status" :class="{over:v.count==2}">
                        <div class="btn" @click="investRed" v-if="v.count==0">出借领红包</div>
                        <div class="btn" @click="gitRed(index)" v-else-if="v.count==1">领红包</div>
                    </li>
                </ul>
            </div>
            <div class="fuli2">
                <!--展示红包部分-->
                <ul>
                    <li v-for="(v, index) in status">
                        <div :style="{backgroundImage: 'url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/icon'+ (index+1) + '.png)'}" v-if="v.count != 2"></div>
                        <div class="over" :style="{backgroundImage: 'url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/icon'+ (index+6) + '.png)'}" v-else-if="v.count == 2"></div>
                    </li>
                </ul>
                <!--兑换部分-->
                <div class="change ">
                    <div class="dh_btn" v-if="leng<3" @click="change(0)">兑换</div>
                    <div class="dh_btn active" v-else @click="change(1)">兑换</div>
                    <div class="dh_btn" v-if="leng<4" @click="change(0)">兑换</div>
                    <div class="dh_btn active" v-else @click="change(2)">兑换</div>
                    <div class="dh_btn" v-if="leng<5" @click="change(0)">兑换</div>
                    <div class="dh_btn active" v-else @click="change(3)">兑换</div>
                </div>
                <!--展示奖品部分-->
                <div class="dh_jg ">
                    <div class="dh_btn " v-for="(v, index) in model">已兑换{{v.num}}次</div>
                </div>
            </div>
            <!--规则部分-->
            <section class="rule_box ">
                <h1></h1>
                <p>活动时间：2017.10.12-2017.10.25。</p>
                <p>用户完成出借任务后，可领取对应现金红包奖励。若用户多次完成同一出借任务，将获得多次领红包机会，必须在活动页面兑换奖品后才能再次进行领取；</p>
                <p>特殊标的(不包含白拿标)不计入该活动。</p>
                <p>活动期间禁止任何作弊和刷单行为，一经发现平台将取消参与资格，并有权追回所发奖励；</p>
                <p>现金红包将在出借成功之后由系统自动发放，有效期为30天。额外实物奖励，会在每日结束后的1个工作日内联系获奖用户，7个工作日内发出。</p>
            </section>
            
        </div>
    </div>
</template>

<script>
import wxHeader from '../../../wxHeader';                // 头部引入
import wxToapp from '../../../../common/wx/wxToapp';     // APP交互函数
import { MessageBox } from 'mint-ui';
export default {
    mixins: [wxToapp],
    data() {
        return {
            time: true,      // 活动是否过期
            status: [],    // 红包领取状态
            model: [],  // 礼物领取个数
            leng: 0,    // 红包领取个数
            money: ['18', '40', '100', '350', '616'],    // 奖励金额列表
            account: ['7200', '8000', '15000', '28000', '36000'],    // 标的金额列表
            timeLimit: ['1', '2', '3', '6', '12']          // 标的期限列表
        }
    },
    methods: {
        initData() {                                                        // 初始化红包状态
            let _this = this
            this.notLogPost('/activity/welcome/getButtonStatus', (data) => {    // 红包状态
                if (data.resCode) {
                    _this.status = [
                        { count: data.resData.data.count1 },
                        { count: data.resData.data.count2 },
                        { count: data.resData.data.count3 },
                        { count: data.resData.data.count4 },
                        { count: data.resData.data.count5 },
                    ]
                    _this.leng = 0
                    for (var i = 0; i < 5; i++) {
                        if (_this.status[i].count == 2) {
                            _this.leng++
                        }
                    }
                } else {
                    this.status = [
                        { count: 0 },
                        { count: 0 },
                        { count: 0 },
                        { count: 0 },
                        { count: 0 },
                    ]
                    this.model = [
                        { num: 0 },
                        { num: 0 },
                        { num: 0 }
                    ]
                    _this.time = false
                }
            }, (this.osType ? { oauthToken: this.token } : {}), 1);

            this.notLogPost('/activity/welcome/getConversion', (data) => {    // 领取礼物个数
                if (data.resCode) {
                    _this.model = [
                        { num: data.resData.data.conversionRecordCount1 },
                        { num: data.resData.data.conversionRecordCount2 },
                        { num: data.resData.data.conversionRecordCount3 }
                    ]
                }
            }, (this.osType ? { oauthToken: this.token } : {}));
        },
        investRed() {                                      // 出借领红包按钮
            if (this.userId || this.getCookie('userToken')) {
                if (this.time) {
                    this.toApp('WIP', { path: '/wxInvest', query: { thisUrl: this.$route.fullPath } })
                } else {
                    MessageBox.alert('对不起！当前活动已经结束').then(action => { });
                }
            } else {
                MessageBox.confirm('快去登录,领取红包哦 ！').then(action => {
                    this.toApp('LG', { path: '/wxLogin', query: { thisUrl: this.$route.fullPath } })
                });
            }
        },
        gitRed(i) {                                             // 领红包按钮
            if (this.userId || this.getCookie('userToken')) {
                if (this.time) {
                    let _this = this
                    this.notLogPost('/activity/welcome/toGiveRedEnvelope', (data) => {
                        if (data.resCode) {
                            let message = '恭喜您领取' + _this.money[i] + '元现金红包，请在我的-我的红包中查看。'
                            MessageBox.alert(message).then(action => {
                                this.initData()
                            });
                        } else {
                            MessageBox.alert('亲！您已领取，不能再领取喽!').then(action => { });
                        }
                    }, (this.osType ? { oauthToken: this.token, account: _this.account[i], borrowTimeType: 0, timeLimit: _this.timeLimit[i] } : { account: _this.account[i], borrowTimeType: 0, timeLimit: _this.timeLimit[i] }), 1);
                } else {
                    MessageBox.alert('对不起！当前活动已经结束').then(action => { });
                }
            } else {
                MessageBox.confirm('快去登录,领取红包哦 ！').then(action => {
                    this.toApp('LG', { path: '/wxLogin', query: { thisUrl: this.$route.fullPath } })
                });
            }
        },
        change(n) {                                // 兑换红包按钮
            if (this.time) {
                if (n == 0) {
                    MessageBox.alert('亲！请集齐兑换红包条件后，才能兑换商品喔。').then(action => { });
                } else {
                    MessageBox.confirm('亲！兑换后您积累红包将清零。', {
                        confirmButtonText: '兑换',
                        cancelButtonText: '取消'
                    }).then(action => {
                        this.notLogPost('/activity/welcome/addConversionRecords', (data) => {
                            if (data.resCode) {
                                MessageBox.alert('亲！你的礼物已兑换成功').then(action => { this.initData() });
                            } else {
                                MessageBox.alert(data.resData.msg).then(action => { });
                            }
                        }, (this.osType ? { oauthToken: this.token, conversionType: n } : { conversionType: n }), 1);
                    });
                }
            } else {
                MessageBox.alert('对不起！当前活动已经结束').then(action => { });
            }
        }
    },
    created: function() {
        if (this.userId || this.getCookie('userToken')) {
            this.initData()
        } else {
            this.status = [
                { count: 0 },
                { count: 0 },
                { count: 0 },
                { count: 0 },
                { count: 0 },
            ]
            this.model = [
                { num: 0 },
                { num: 0 },
                { num: 0 }
            ]
        }
    },
    mounted: function() {


    },
    components: {
        wxHeader,
    }
}
</script>

<style lang="scss" scoped>
#welcomeBank {
    width: 10rem;
    height: auto;
    .body {
        width: 10rem;
        height: 52.666667rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/welcomeBank.jpg) no-repeat;
        background-size: 100% 100%;
        position: relative;
        top: 0;
        left: 0;
        .fuli1 {
            width: 8.933333rem;
            height: 13.48rem;
            padding: .4rem .266667rem 0;
            position: absolute;
            top: 12.453333rem;
            left: .533333rem;
            ul {
                overflow: hidden;
                li {
                    width: 100%;
                    height: 1.973333rem;
                    position: relative;
                    .btn {
                        width: 2.586667rem;
                        height: 1.12rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/lq_icon.png) no-repeat;
                        background-size: cover;
                        position: absolute;
                        top: .466667rem;
                        right: .133333rem;
                        font-size: .373333rem;
                        color: #fff;
                        text-align: center;
                        line-height: 1.12rem;
                        display: block;
                    }
                }
                li:not(:last-child) {
                    margin-bottom: .533333rem;
                }
                li.over {
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/ylq.png) top right no-repeat;
                    background-size: 2.253333rem 1.826667rem;
                    .btn {
                        display: none;
                    }
                }
            }
        }
        .fuli2 {
            width: 8.933333rem;
            height: 18.04rem;
            padding: .413333rem .346667rem 0;
            position: absolute;
            top: 28.7rem;
            left: .533333rem;
            ul {
                overflow: hidden;
                li {
                    float: left;
                    width: 1.12rem;
                    height: 1.333333rem;
                    div {
                        width: 100%;
                        height: 100%;
                        background-size: 100% 100%;
                    }
                }
                li:not(:first-child) {
                    margin-left: .653333rem;
                }
            }
            .change {
                width: 3rem;
                height: 5.3rem;
                position: relative;
                top: 2.5rem;
                left: 5.7rem;
                .dh_btn {
                    width: 100%;
                    height: 33.333333%;
                    line-height: 1.79rem;
                    text-align: center;
                    color: #999999;
                    font-size: .4rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/over.png) center center no-repeat;
                    background-size: 2.586667rem 1.12rem;
                }
                .dh_btn.active {
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/lq_icon.png) center center no-repeat;
                    background-size: 2.586667rem 1.12rem;
                    color: #fff;
                }
            }
            .dh_jg {
                width: 8.78rem;
                height: .64rem;
                margin: 0 auto;
                position: relative;
                top: 6.09rem;
                left: -0.27rem;
                .dh_btn {
                    width: 2.66rem;
                    height: .64rem;
                    line-height: .64rem;
                    text-align: center;
                    font-size: .346667rem;
                    color: #fff;
                    background: #FF916E;
                    border-radius: .32rem;
                    float: left;
                    margin-right: 0.4rem;
                }
                .dh_btn:nth-child(3) {
                    margin-right: 0;
                }
            }
        }
        .rule_box {
            padding: 0 .693333rem;
            position: absolute;
            top: 44.7rem;
            left: 0;

            p {
                padding-left: .4rem;
                font-size: .346667rem;
                margin-bottom: .19rem;
                color: #fff;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/welcomeBank/dian.png) no-repeat;
                background-size: .213333rem .213333rem;
                line-height: .533333rem;
                background-position: left .133333rem;
            }
        }
    }
}
</style>
