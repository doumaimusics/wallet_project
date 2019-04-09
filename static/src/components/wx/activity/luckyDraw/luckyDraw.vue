<template>
   <div id="luckyDraw">
       <div class="rules" @click="alert = 3"></div>
       <div class="swiper">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in record"><p>{{item.mobilePhone}}获得{{item.reward}}</p></swiper-slide>
            </swiper>
       </div>
       <div class="record" @click="myRecords"></div>
       <div class="pornter" :style="{transition:transitionStyleValue,transform: transformStyleValue}" @click="tate">
       </div>
       <div class="warp" v-if="alert">
           <div class="alert1" :class="{active:alert==2,active1:alert==3}">
                <div class="head" v-if="alert==3 ||alert == 1">
                    <h3 v-if="alert==3">活动规则</h3>
                    <h3 v-else-if="alert==1">我的中奖记录</h3>
                    <div class="del" @click="alert = 0"></div>
                </div>
                <div class="from" v-if="alert==1">
                    <ul class="testBox" v-if="myReward">
                        <li v-for="item in myRewards">
                            <p>{{item.rewardDate}}</p>
                            <p class="draw">{{item.reward}}</p>
                        </li>
                    </ul>
                    <ul class="testBox over" v-else>
                        <li>
                            <i></i>
                            <span>您还未有抽奖，赶快去抽奖吧！</span>
                        </li>
                    </ul>
                </div>
                <div class="from" v-else-if="alert==2">
                    <div class="leftCen" v-if="!over">
                        <i>恭喜您抽中</i>
                        <p>{{reward}}</p>
                    </div>
                    <div class="over" v-else>每天只能抽取一次哦，请明天继续！</div>
                    <div class="btn" @click="alert = 0"></div>
                </div>
                <div class="from" v-else-if="alert==3">
                    <p v-for="(item, index) in text" :class="{stong:index == 2}">{{item}}</p>
                </div>
            </div>
       </div>
   </div>
</template>            

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import wxToapp from '../../../../common/wx/wxToapp';
import { MessageBox } from 'mint-ui'
export default {
    mixins:[wxToapp],
    data() {
        return {
            reward:'',     //抽中的奖品名称 
            over:false,     // 模拟数据
            alert:0,  // 1 中奖纪律 2 中奖弹框  3 规则  4 当日第二次抽奖  
            transformStyleValue: 'rotate(0deg)',
            transitionStyleValue: 'transform 6s cubic-bezier(0.61, 0.04, 0, 0.81)',
            record:[], //平台中奖用户
            myReward:true, // 我的中奖记录有数据
            myRewards:[],  // 中奖记录列表
            swiperOption: {
                pagination: '.swiper-pagination',
                autoplay: 2000,//可选选项，自动滑动
                direction : 'vertical',
                loop : true,
            },
            text:['1.活动时间：12月1日-12月15日；','2.每天可进行一次大转盘抽奖，奖励直接发放到账户，现金可提现；','3.奖励使用规则：','1元奖金+10%加息券(加息10天，2月及以上标的可用)','3元奖金+10%加息券(加息10天，2月及以上标的可用)','5元现金（可提现）','1%加息券（无限制）','1.5%加息券(无限制)','15元红包(1月及以上标的单笔满15000元可用)','50元红包(2月及以上标的单笔满27000元可用)','80元红包(3月及以上标的单笔满30000元可用)','200元红包(6月及以上标的单笔满50000元可用)','350元红包(12月标的单笔满70000元可用)','4.出借红包与加息券有效期3天，请及时出借','5.本活动最终解释权归E都市钱包所有。','6.客服电话400-135-3388'],
            times:1        // 活动时间状态0：未开始  1：进行中 2：已结束
        }
    },
    methods: {
        initDate(){
            this.notLogPost("/index/getActivitStatus",data => {        // 活动时间验证
                if (data.resCode == 1) {
                    this.times = data.resData.data.activiti
                }
            },{},1);
        },
        initData(){     // 平台中奖记录
            this.notLogPost('/app/getAllRewardUsers',(data) =>{
                if(data.resCode){
                    this.record = data.resData.RewardUsers
                }
            },(this.osType ? {oauthToken:this.token}:{}),1);
        },
        tate(){      // 点击开始抽奖
            if(this.times == 2){
                MessageBox('温馨提示', '当前活动已过期');
                return
            }else if(this.times == 0){
                MessageBox('温馨提示', '当前活动未开始');
                return
            }
            let _this = this
            this.islogin(rotate)
            function rotate(){
                _this.notLogPost('/app/getLottery',(data) =>{
                    if(data.resCode){
                        let sum = data.resData.award
                        if(sum == -2){
                            _this.alert = 2
                            _this.over = true
                        }else if (sum >= 0){
                            _this.reward = data.resData.reward
                            _this.transformStyleValue = 'rotate('+(3618+36*sum)+'deg)'
                            _this.transitionStyleValue = 'transform 6s cubic-bezier(0.61, 0.04, 0, 0.81)'
                            setTimeout(() => {
                                _this.alert = 2
                                _this.over = false
                            }, 6100);
                        }
                    }
                },(_this.osType ? {oauthToken:_this.token}:{}),1);
            } 
        },
        myRecords(){      // 点击我的中奖记录
            let _this = this
            this.islogin(records)
            function records(){
                _this.notLogPost('/app/getMyRewards',(data) =>{
                if(data.resCode){
                    if(data.resData.myRewards == 0){
                        _this.myReward = false
                        _this.alert = 1
                    } else {
                        _this.myReward = true
                        _this.myRewards =  data.resData.myRewards
                        _this.alert = 1
                    }
                }
            },(_this.osType ? {oauthToken:_this.token}:{}),1);
            }
        }
    },
    created: function() {

    },
    mounted: function() {
        this.initDate()
        this.initData()
        // 数据统计
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1271212571&web_id=1271212571'
        script.language = 'JavaScript'
        document.body.appendChild(script)
    },
    components: {
        swiper,
        swiperSlide,
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
    }
}
</script>

<style lang="scss" scoped>
    #luckyDraw{
        width: 10rem;
        height: 21.573333rem;
        position: relative;
        top: 0;
        left: 0;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/luckyDraw.png);
        background-size: 100%;
        .rules{
            width: 1.33rem;
            height: 1.33rem;
            position: absolute;
            top: 0;
            left: 7.97rem;
        }
        .swiper{
            position: absolute;
            top: 8rem;
            left: 7%;
            border-radius: .7rem;
            width: 62%;
            height: 1.35rem;
            line-height: 1.35rem;
            text-align: center;
            .swiper-container{
                height: 1.35rem;
                p{
                    height: 1.35rem;
                    font-size: .293333rem;
                    color:#f8772a;
                }
            } 
        }
        .record{
            position: absolute;
            top: 8.2rem;
            left: 69%;
            width: 2.2rem;
            height: 1rem;
            border-radius: .5rem;
        }
        .pornter{
            position: absolute;
            top: 13.85rem;
            left: 50%;
            margin-left: -1.506667rem;
            width: 3.013333rem;
            height: 3.013333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/pointer.png);
            background-size: 3.013333rem 3.013333rem;
        }
        .warp {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background: rgba(0, 0, 0, 0.5);
            z-index: 99;
            .alert1 {
                width: 7.426667rem;
                height: 8.346667rem;
                position: relative;
                top: 5.333333rem;
                left: 1.146667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alert_2.png);
                background-size: 7.426667rem 8.346667rem;
                .head {
                    width: 100%;
                    height: 1.226667rem;
                    padding-top: 0.293333rem;
                    text-align: center;
                    h3 {
                    width: 100%;
                    height: 0.6rem;
                    font-family: PingFangSC-Semibold;
                    font-size: 0.426667rem;
                    color: #ffffff;
                    letter-spacing: 0;
                    line-height: 0.6rem;
                    }
                    .del{
                        width: .613333rem;
                        height: .613333rem;
                        position: absolute;
                        top: 0.3rem;
                        right: .4rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/del.png);
                        background-size: .613333rem .613333rem;
                    }
                }
                .from {
                    padding: .106667rem .2rem .106667rem .386667rem;
                    width: 100%;
                    height: 7.12rem;
                    overflow: hidden;
                    .testBox {
                        font-family: PingFangSC-Regular;
                        font-size: .346667rem;
                        color: #333333;
                        width: 100%;
                        height: 7.12rem;
                        line-height: .4rem;
                        overflow-y: auto;
                        padding-right: .733333rem;
                        li{
                            p{
                                width: 2.3rem;
                                height: .493333rem; 
                                margin-top:.306667rem;
                                float: left;
                            }
                            p.draw{
                                float: right;
                                width: 3.7rem;
                                text-align: right;
                            }
                        }
                    }
                    .testBox.over{
                        padding: 0;
                        li{
                            width:100%;
                            height:100%;
                            position:relative;
                            i{
                                display:block;
                                width:2.08rem;
                                height:2.08rem;
                                position:absolute;
                                top:1.466667rem;
                                left:2rem;
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/over.png);
                                background-size: 2.08rem 2.08rem;
                            }
                            span{
                                display: block;
                                width: 100%;
                                height:.493333rem;
                                position: absolute;
                                top: 4rem;
                                text-align: center;
                                font-family: PingFangSC-Regular;
                                font-size: .346667rem;
                                color: #999999;
                            }
                        }
                    }
                }
            }
            .alert1.active {
                width: 8.266667rem;
                height: 4.96rem;
                top: 5rem;
                left: .866667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alert_1.png);
                background-size: 8.266667rem 4.96rem;
                .from {
                    position: relative;
                    .leftCen{
                        position: absolute;
                        top: 3.066667rem;
                        left: 0;
                        height: 2.533333rem;
                        width: 5.653333rem;
                        i{
                            display: block;
                            width: 2.4rem;
                            height: .44rem;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alertMoney.png)no-repeat center left;
                            background-size: .413333rem .413333rem;
                            font-family: PingFangSC-Medium;
                            font-size: .32rem;
                            color: #FF732C;
                            padding-left: .533333rem;
                            margin-left: 1.6rem;
                            margin-bottom: .133333rem;
                        }
                        p{
                            width: 100%;
                            height: .666667rem;
                            text-align: center;
                            font-family: PingFangSC-Medium;
                            font-size: .48rem;
                            color: #FF732C;
                            line-height: .666667rem;
                        }
                    }
                    .over{
                        position: absolute;
                        top: 3.466667rem;
                        left: 0;
                        height: .44rem;
                        width: 5.653333rem;
                        font-family: PingFangSC-Medium;
                        font-size: .32rem;
                        color: #FF732C;
                        text-align: center;
                    }
                    .btn {
                        width: 2rem;
                        height: .7rem;
                        position: absolute;
                        top: 3.4rem;
                        left: 6rem;
                    }
                }
            }
            .alert1.active1 {
                width: 7.426667rem;
                height: 11.4rem;
                top: 2.666667rem;
                left: 1.293333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alert_3.png);
                background-size: 7.426667rem 11.4rem;
                padding: 0;

                .from {
                    padding: .293333rem .4rem 0 .373333rem;
                    height: 10rem;
                    p {
                    font-family: PingFangSC-Regular;
                    font-size: .293333rem;
                    color: #333333;
                    width: 100%;
                    line-height: .4rem;
                    margin-bottom:.133333rem;
                    letter-spacing: -0.5px;
                    }
                    p.stong{
                        font-family: PingFangSC-Medium;
                    }
                }
            }
        }
    }
</style>
