<template>
    <div id="meetingOne">
        <div v-title>私人定制</div>
        <div class="toMain" @click="appRouter('/doubleEleven/main')"></div>
        <div class="inputBox"><input type="tel" :value="investMoney" @input='onInvestMoney' @blur="inputBlur"></div>
        <!-- 刻度 -->
        <div class="rulerBox">
            <div id='rulerWrapper'>
                <div class="shadow"></div>
            </div>
        </div>
        <div class="timeBox">
            <div class="time" v-for="(v, i) in timeist" :class="[{active: i == timeIndex}]" @click="onInvestTime(i)">{{v}}<span>天</span></div>
        </div>
        <div class="redMoney">{{redMoney}}</div>
        <!-- 生成红包按钮 -->
        <div class="generate" @click="generate"></div>
        <!-- 红包记录 -->
        <div class="record" @click="toRecord"></div>
        <!-- 活动规则 -->
        <div class="rule" @click="popUp = 1"></div>
        <!-- 红包动画 -->
        <div class="redAnimation" :class="[{active: redBg}]"></div>
        <!-- 抽奖次数 -->
        <div class="frequency" v-if="loginStatus == 1">您获得{{myChance}}次机会</div>
        <div class="frequency" v-else>您获得*次机会</div>
        <!-- 轮播图 -->
        <swiper :options="options">
            <swiper-slide v-for="(item, i) in 14">
                <img :src="'https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/prize' + i + '.png'" alt="">
            </swiper-slide>
        </swiper>
        <!-- 规则弹框 -->
        <div class="rule_box" v-if="popUp==1">
            <div class="close_btn" @click="popUp = 0"></div>
            <a href="tel:400-135-3388"></a>
            <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
            
        </div>
        <!-- 活动结束 -->
        <div class="activeOver layerBg" v-if="popUp==2">
            <div class="close_btn" @click="popUp = 0"></div>
        </div>
        <!-- 有未使用的红包 -->
        <div class="notRed layerBg" v-if="popUp==3">
            <div class="close_btn" @click="popUp = 0"></div>
            <div class="center">{{center}}</div>
            <div class="tips">{{tips}}</div>
            <div class="succ" v-if="toInvest" @click="toRed">去使用</div>
            <div class="succ" v-else @click="popUp = 0">确定</div>
        </div>
        <!-- 确认定制红包 -->
        <div class="istRed layerBg" v-if="popUp==4">
            <p>您是否要生成{{redMoney}}元红包！</p>
            <div class="closeBtn" @click="resetting">重置红包</div>
            <div class="succ" @click="generateRed">确定</div>
        </div>
        <div v-if="popUp" class="zIndex" v-layer @click="popUp=0"></div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import {Toast} from 'mint-ui';
    export default{
        mixins:[ wxToapp ],
        data() {
            return {
                loginStatus: 0, // 0未登录，1已登录
                myChance: 0,
                timeIndex: 2,
                timeist: ['30','60','90','180','360'],
                lockTime: 30,
                redMoney: 40,
                investMoney: 5000,
                redBg: false,
                start:1,        // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                popUp: 0,        // 弹窗  1、规则弹框  2、活动结束弹框 3、有未使用的红包 4、定制红包
                options: {//vip卡片数据
                    slidesPerView : 3.5,
                    centeredSlides : false,
                    spaceBetween: 12,     // slide的间距
                    initialSlide: 0,
                    // loop: true,
                    autoplay: 2000,
                },
                measureRuler: '',
                isNoUse: '',
                isCanCreate: '',
                center: '',
                tips: '',
                toInvest: false,
                redMoneyList: [[15,33,66,166],[20,40,86,208],[40,86,175,440],[60,128,250,628],[150,300,600,1500]],
                moneyIndex: 0,
            }
        },
        methods: {
            initData(n){
                // 获取数据
                this.getNotlogData('/activity/november/getMyChance', (data) => {
                    if(data.resCode == 1){
                        this.myChance = data.resData.myChance;
                        this.start = data.resData.active;
                        this.loginStatus = data.resData.loginStatus;
                        this.isNoUse = data.resData.isNoUse;
                        this.isCanCreate = data.resData.isCanCreate;
                        this.amount = data.resData.amount;
                        if(n == 1){
                            if(data.resData.isNoUse == 1){
                                this.center = '您有一张'+ this.amount +'元红包未使用！';
                                this.tips = '该红包使用后，才能继续生成红包噢!';
                                this.popUp = 3;
                                this.toInvest = true;
                            }
                            if(data.resData.active != 1){
                                this.popUp = 2;
                            }
                        }  
                    }else{
                        Toast(data.resMsg)
                    }
                }, {},1)
            },
            onInvestMoney(e) {     // 出借input框的值发生改变触发的事件
                // 正则过滤除了数字的字符
                this.investMoney = e.target.value=e.target.value.replace(/[^\d]/g,'');
                // this.isRed = false;
            },
            toRecord(){
                if(this.loginStatus == 0){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                }else{
                    this.appRouter('/doubleEleven/activityRedRecord')
                }

            },
            inputBlur(val){
                if(this.investMoney < 5000){
                    Toast('输入出借金额≥5000元！')
                    return;
                }
                this.measureRuler.setValue(this.investMoney)
            },
            generate(){
                if(this.start != 1){
                    this.popUp = 2;
                    return;
                }
                if(this.loginStatus == 0){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                    return;
                }
                if(this.isNoUse == 1){
                    this.center = '您有一张'+ this.amount +'元红包未使用！';
                    this.tips = '红包使用后，将获得一次11.11抽奖机会！';
                    this.popUp = 3;
                    this.toInvest = true;
                    return;
                }
                if(this.investMoney < 5000){
                    Toast('输入出借金额≥5000元！')
                    return;
                }
                if(this.isCanCreate == 0){
                    this.center = '您今天定制红包次数已用完！';
                    this.tips = '';
                    this.popUp = 3;
                    this.toInvest = false;
                    return;
                }
                this.popUp = 4;
            },
            generateRed(){
                this.getNotlogData('/activity/november/createRedBag', (data) => {
                    this.popUp = 0;
                    if(data.resCode == 1){
                        this.initData(0);
                        this.popUp = 3;
                        this.center = '恭喜您生成'+this.redMoney+'元红包';
                        this.tips = '红包使用后，将获得一次11.11抽奖机会！';
                        this.toInvest = this.redBg = true;
                    }else{
                        Toast(data.resMsg)
                    }
                }, {lockTime: this.timeist[this.timeIndex], redMoney: this.redMoney},1)
            },
            resetting(){
                this.popUp = 0;
                this.timeIndex = 2;
                this.redMoney = 40;
                this.measureRuler.setValue(5000);
            },
            toRed(){
                if (this.osType) {
                    this.PassValue('WIP')
                }else{
                    this.appRouter('/wxInvest')
                }
            },
            onInvestTime(i){
                this.timeIndex = i
                this.redMoney = this.redMoneyList[i][this.moneyIndex];
            },
        },
        created: function() {
            let that = this
            this.hasLogin ? this.loginStatus = 1 : this.loginStatus = 0;
            //给app传值标题名
            this.PassValue('NavWhite_私人定制');
            const script1 = document.createElement('script')
            script1.src = 'https://aliyunsso.edspay.com/web/js/jquery.js'
            script1.language = 'JavaScript'
            document.body.appendChild(script1)

            const script = document.createElement('script')
            script.src = 'https://aliyunsso.edspay.com/web/js/ruler.js'
            script.language = 'JavaScript'
            document.body.appendChild(script)

            const script2 = document.createElement('script');
            script2.src = 'https://s13.cnzz.com/z_stat.php?id=1275237354&web_id=1275237354';
            script2.language = 'JavaScript';
            document.body.appendChild(script2);

            //初始化尺子
            setTimeout(() => {
                this.measureRuler =new MeasureRuler({
                    wrapperId:"rulerWrapper",     //容器ID，页面中写一个DIV就行 (必须)
                    max:1000000,                     //刻度尺最大的刻度    (非必须，默认为1000)
                    minUnit:100,                    //刻度尺最小刻度    (非必须，默认为1)
                    unitSet:10,                   //刻度尺单元长度    (非必须，默认是10)
        　　　　　　　value:5000,                      //初始化数值       (非必须，默认为1)
                    mult:0.6,                       //刻度值倍数，默认是最小刻度值为10px，如果定mult为3则最小刻度为30px (非必须，默认为1)
                    callback: rulerSetValue,       //滑动尺子过程中的回调函数     (非必须)
                    min:5000                      //刻度尺最小刻度
                })
                function rulerSetValue(val){
                    that.investMoney = val
                    if(val > 4999 && val < 10000){
                        that.moneyIndex = 0;
                        that.redMoney = that.redMoneyList[that.timeIndex][0];
                    }else if(val > 9999 && val < 20000){
                        that.moneyIndex = 1;
                        that.redMoney = that.redMoneyList[that.timeIndex][1];
                    }else if(val > 19999 && val < 50000){
                        that.moneyIndex = 2;
                        that.redMoney = that.redMoneyList[that.timeIndex][2];
                    }else if(val > 49999){
                        that.moneyIndex = 3;
                        that.redMoney = that.redMoneyList[that.timeIndex][3];
                    }
                }
            }, 1000);
        },
        mounted: function() {
            this.initData(1);
            
        },
        watch: {
            '$route' () {
				if(window._czc) { // 友盟数据统计监听
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
    #meetingOne{
        width: 10rem;
        height: 25.4rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingOne.png);
        background-size: 100%;
        .toMain{
            width: 1.4rem;
            height: 1.786667rem;
            position: fixed;
            right: 0;
            bottom: 1rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/main.png);
            background-size: 100%;
            z-index: 99;
        }
        .inputBox{
            width: 100%;
            height: 0.8rem;
            position: absolute;
            top: 7.8rem;
            text-align: center;
            input{
                text-align: center;
                color: #f0ad2d;
                line-height: .7rem;
                font-size: .48rem;
                margin-top: .12rem;
                width: 2.666667rem;
                height: .7rem;
                // border-bottom: .026667rem solid #fff;
            }
        }
        .rulerBox{
            width: 60%;
            position: absolute;
            top: 9.2rem;
            margin-left: 20%;
        }
        .timeBox{
            width: 70%;
            height: .666667rem;
            position: absolute;
            margin-left: 1.5rem;
            top: 11.27rem;
            .time{
                height: .666667rem;
                width: 1.2rem;
                float: left;
                margin-right: 0.22rem;
                color: #c26f19;
                font-size: .346667rem;
                text-align: center;
                line-height: .666667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/time.png);
                background-size: 100%;
                span{
                   font-size: .266667rem; 
                }
            }
            .time.active{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/timeActive.png);
                background-size: 100%;
            }
            .time:nth-child(5){
                margin-right: 0rem;
            }
        }
        .redMoney{
            width: 35%;
            height: .8rem;
            position: absolute;
            margin-left: 65%;
            top: 12.3rem;
            line-height: .8rem;
            font-size: .48rem;
            color: #f0ad2d;
        }
        .generate{
            width: 3.5rem;
            height: 1.4rem;
            position: absolute;
            margin-left: 3.2rem;
            top: 13.3rem;
        }
        .record{
            width: 2.3rem;
            height: 1.5rem;
            position: absolute;
            margin-left: 10%;
            top: 14.5rem;
        }
        .rule{
            width: 2.5rem;
            height: 1.5rem;
            position: absolute;
            margin-left: 65%;
            top: 14.5rem;
        }
        .redAnimation{
            width: 7.76rem;
            height: 1.08rem;
            position: absolute;
            margin-left: 11%;
            top: 16.95rem;
        }
        .redAnimation.active{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/redBg.png);
            background-size: 100%;
        }
        .frequency{
            width: 3rem;
            height: .77rem;
            position: absolute;
            margin-left: 34%;
            top: 19.25rem;
            text-align: center;
            line-height: .77rem;
            color: #f0ad2d;
            font-size: .32rem;
        }
        .swiper-container {
            position: absolute;
            overflow: hidden;
            z-index: 1;
            top: 21.05rem;
            height: 2.2rem;
            width: 78%;
            margin-left: 11%;
            .swiper-slide{
                border-radius: .133333rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .rule_box{
            width: 7.12rem;
            height: 10.666667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/rule_center.png?v=1.0) no-repeat;
            background-size: 100% 100%;
            position:fixed;
            top:0;left: 0;
            right: 0;bottom: 0;
            margin: auto;
            z-index: 100;
            overflow: hidden;
            padding: 1.6rem .5rem 0;
            a{
                width: 2.5rem;
                height: .5rem;
                position: absolute;
                right: 1.2rem;
                top:8.7rem;
            }
            p{
                position: absolute;
                left: 0.6rem;
                top:9.3rem;
                font-size: .266667rem;
                color: red;
                margin-bottom: .2rem;
            }
            .close_btn{
                width: 1rem;
                height: 1rem;
                position: absolute;
                top: 0;
                right: 0rem;
            }
        }
        .activeOver{
            width: 7.12rem;
            height: 3.76rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/timeOver.png) no-repeat;
            background-size: 100% 100%;
            padding: 2.5rem .2rem 0;
            .close_btn{
                width: 3rem;
                height: 1rem;
                margin: 0 auto;
            }
        }
        .istRed{
            width: 7.12rem;
            height: 5.933333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/redBox.png) no-repeat;
            background-size: 100% 100%;
            padding: 2.4rem 0 0;
            p{
                width: 100%;
                font-size: .48rem;
                color: #fff;
                text-align: center;
            }
            .closeBtn, .succ{
                width: 50%;
                font-size: .426667rem;
                color: #e94225;
                text-align: center;
                float: left;
                position: absolute;
                left: 0;
                bottom: 1.2rem;
                height: 0.85rem;
                line-height: .85rem;
                padding-left: 0.2rem;
            }
            .succ{
                left: 50%;
                padding-right: 0.2rem;
                padding-left: 0;
            }
        }
        .notRed{
            width: 7.12rem;
            height: 9.733333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/notUsed.png) no-repeat;
            background-size: 100% 100%;
            padding: 2.9rem .5rem 0; 
            .close_btn{
                width: 1rem;
                height: 1rem;
                position: absolute;
                top: 0;
                right: 0rem;
            }
            .center{
                width: 100%;
                height: 1.333333rem;
                font-size: .48rem;
                color: #e94225;
                padding: 0 .9rem;
                text-align: center;
            }
            .tips{
                width: 100%;
                height: 1rem;
                font-size: .32rem;
                color: #6e442e;
                text-align: center;
                margin-top: .5rem;
            }
            .succ{
                width: 55%;
                margin: 1.95rem auto 0;
                height: 1rem;
                text-align: center;
                line-height: 1rem;
                font-size: .426667rem;
                color: #e94225;
            }
        }
        .layerBg{
            position:fixed;
            top:0;left: 0;
            right: 0;bottom: 0;
            margin: auto;
            z-index: 100;
        }
        .zIndex{
            z-index: 99!important;
        }
    }
</style>
<style lang="scss">
.rulerWrapper{
    // background: #f7704c;
    height: 1.6rem;
    overflow: hidden;
    position: relative;
    .shadow{
        height: 1.6rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/shadow.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        z-index: 9;
        width: 100%;
    }
    .rulerPointer{
        position: absolute;
        width: .04rem;
        background: #ff491c;
        // border-left: .026667rem solid #fce4b7;
        left: 50%;
        margin-left: -0.036666rem;
        height: 70%;
        top: 30%;
    }
    .rulerScroller{
        position: absolute;
        display: -webkit-flex;
        display: -webkit-box;
        display: flex;
        left:-0.266667rem;
        ul{
            margin:0;
            padding:0;
            box-sizing:border-box;
            padding:0;
            width:2.666667rem;
            height: 1.04rem;
            float:left;
            border-right: 1px solid #fce4b7;
            position: relative;
            margin-top: .55rem;
            li{
                margin:0;
                padding:0;
                box-sizing:border-box;
                list-style: none;
                width: .266667rem;
                float: left;
                border-right:1px solid #fce4b7;
                height: .64rem;
                margin-top: .426667rem;
            }
        }
    }
    .sizeNo{
        position:absolute;
        color: #fce4b7;
        top:0;
        display: block;
        text-align:center;
        font-size: .266667rem;
    }
} 
</style>
