<template>
    <div class="sign-root">
        <div v-title>签到有礼</div>
        <!-- 签到中心 -->
        <div class="sign-center">
            <!-- 规则 -->
            <div class="sign-rule" @click="isOpen=true"></div>
            <!-- 奖品 -->
            <div class="sign-gift">
                <img :src="item.pic" v-for="item in awardList"/>
            </div>
            <!-- 第几天 -->
            <h1 class="sign-day">第{{info.activityDay}}天
                <span class="sign-count" v-if="login"> | 剩余 <i>{{8-info.useCardCount}}</i> 次补签机会</span>
            </h1>
            <!-- 签到日期 -->
            <div class="sign-date" @click="goLogin">
                <sign-item  :info="item" :signIn="signIn" :isLogin="login"  @showDialog="showDialog"  v-for="(item,index) in dateList" :ref="index == 0 ? 'firstItem' : ''"></sign-item>
            </div>
            <!-- 底部 -->
            <div class="sign-btm">
                <!-- 分享 -->
                <div class="sign-share" @click="shareSign"></div>
                <!-- 签到 -->
                <div class="sign-btn" @click="signIn" v-if="!info.ifSignIn||!login"></div>
                <div class="sign-btn nosign-btn"   v-else></div>
            </div>
        </div>
        <!-- 规则弹窗 -->
        <div class="rule-mask" v-if = "isOpen" :style="fullHeight" @click="isOpen=false"></div>
		<div class="rule-div" v-if = "isOpen" >
            <span>2018年8月{{startDate}}日-9月{{endDate}}日</span>
            <a href="tel:400-135-3388">400-135-3388</a>
            <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
            <i @click="isOpen=false"></i>
        </div>
        <!-- 微信分享遮罩层 -->
        <div class="sign-mask" :style="fullHeight" v-if="isShare"> 
            <div class="sign-share">
                <div class="sign-share-btn" @click="isShare=false"></div>
            </div>
        </div>
        <!-- 各种弹窗 -->
        <sign-dialog :info = 'dialogInfo' @closeDialog="closeDialog" v-if="dialogInfo.isShow" ></sign-dialog>
        <!-- 遮罩只能点击规则 -->
        <div class="sign-all-mask" :style="fullHeight" v-if="!ifActivityTime" @click="activityStatus"></div>
    </div>
</template>
<script>
import signItem from './signItem.vue';
import signDialog from './signDialog.vue';
import wxShare from '../../../../common/wx/wxShare';
import wxToapp from '../../../../common/wx/wxToapp'
import { MessageBox } from 'mint-ui'
export default {
    mixins: [wxShare,wxToapp],
    data () {
        return {
            shareObj: {
                title: "签到有礼", 
                desc: "积分商城连续签到就有机会领取定制好礼，零钱包，帆布袋，保温杯在向你召唤，快来参与吧！",
                link: global.host+"sign/appShare", 
                imgUrl: "https://aliyunsso.edspay.com/web/icon.png"
            },
            fullHeight:{
                height: document.documentElement.clientHeight+5+"px"  //获取手机可视区域的的高度
            },
            isOpen:false, // 规则开关
            isShare:false,  // 分享开关
            login:false, // 是否登录
            ifActivityTime:true,     //是否活动时间之内
            dialogInfo:{            // 弹框提示组件obj
                isShow:false,
                background:'',
            },
            info:{  // 签到日期组件obj
                useCardCount: 8,
                activityDay:0
            },
            startDate:8, // 开始日期
            endDate:0,  // 结束日期
            dateList:[],    // 模拟数据
            active:1,  // 活动状态
            awardList:[     // 奖励图片arr
                {pic:'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_8wdl.png'},
                {pic:'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_15wdl.png'},
                {pic:'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_28wdl.png'},
            ],
        }
    },
    methods: {
        // 获取日历信息 
        getInfo () {
            this.getNotlogData('/score/signActivityList', (data) => {
                if(data.resCode == 1){
                    this.info = data.resData
                    this.selectSigned(data.resData)
                    this.getStatus(data.resData)
                    console.log(this.dateList)
                    // 登陆后筛选补签
                    if (this.login) {
                        this.selectCom(data.resData)
                    }
                }
            }, {},1)
        },
        // 初始化日历数组
        createDate () {
            console.log(this.startDate)
            // 未登录显示黄色，已登录根据数据判断
            for (var i =this.startDate;i< (28+this.startDate);i++) {
                if (i<32) {
                    this.dateList.push({
                        month: 8,
                        date: i,
                        timeStr:this.createTimeStr(2018,8,i),
                        sign:false,
                    })
                } else {
                    this.dateList.push({
                        month: 9,
                        date: (i - 31),
                        timeStr:this.createTimeStr(2018,9,(i - 31)),
                        sign:false,
                    })
                }
            }
            this.$nextTick(() => {
                this.$refs.firstItem[0].$el.style.marginLeft=1.174 * ( this.startDate - 12 ) + 'rem'
            })
        },
        //日期补零
        createTimeStr (year,month,date) {
            if (month > 9) {
                if (date > 9) {
                    return year+'-'+month+'-'+date
                } else {
                    return year+'-'+month+'-0'+date
                }
            } else {
                 if (date > 9) {
                    return year+'-0'+month+'-'+date
                } else {
                    return year+'-0'+month+'-0'+date
                }
            }
        },
        // 奖励状态
        getStatus (info) {
            if (!this.login) {
                    this. awardList = [
                        {pic:'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_8wdl.png'},
                        {pic:'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_15wdl.png'},
                        {pic:'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_28wdl.png'},
                        ]   
                    this.$set(this.dateList[7], 'awardType', -2)
                    this.$set(this.dateList[14], 'awardType', -2)
                    this.$set(this.dateList[27], 'awardType', -2)
                } else {
                    // -1未领取,0已领取1奖品数据不足,领取失败-2连续签到，当天还没领取奖励
                        switch (info.eightPrizeDraw) {
                            case 0: 
                                this.$set(this.dateList[7], 'awardType', 0)
                                this.awardList[0].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_8ylq.png'
                                break;
                            case -1:
                                this.$set(this.dateList[7], 'awardType', -1)
                                this.awardList[0].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_8wlq.png'
                                break;
                            case -2:
                                this.$set(this.dateList[7], 'awardType', -2)
                                this.awardList[0].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_8wlq.png'
                                break;
                        }
                        switch (info.fifteenPrizeDraw) {
                            case 0: 
                                this.$set(this.dateList[14], 'awardType', 0)
                                this.awardList[1].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_15ylq.png'
                                break;
                            case 1:
                                this.$set(this.dateList[14], 'awardType', 1)
                                this.awardList[1].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_15qg.png'
                                break;
                            case -1:
                                this.$set(this.dateList[14], 'awardType', -1)
                                this.awardList[1].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_15wlq.png'
                                break;
                            case -2:
                                this.$set(this.dateList[14], 'awardType', -2)
                                this.awardList[1].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_15wlq.png'
                                break;
                        }
                        switch (info.twentyEightPrizeDraw) {
                            case 0: 
                                this.$set(this.dateList[27], 'awardType', 0)
                                this.awardList[2].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_28ylq.png'
                                break;
                            case 1:
                                 this.$set(this.dateList[27], 'awardType', 1)
                                this.awardList[2].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_28qg.png'
                                break;
                            case -1:
                                this.$set(this.dateList[27], 'awardType', -1)
                                this.awardList[2].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_28wlq.png'
                            break;
                            case -2:
                                this.$set(this.dateList[27], 'awardType', -2)
                                this.awardList[2].pic = 'https://aliyunsso.edspay.com/web/wx/activity/sign/jl_28wlq.png'
                                break;
                    }
                }
        },
        // 筛选签到日期
        selectSigned (info) {
            if(info.signList.length>0) {
                this.dateList.forEach((item,index)=>{
                    info.signList.forEach((item1,index1)=> {
                            if (item.date == info.signList[index1].day) {
                            this.dateList[index].sign = true
                        }
                    })
                })
            }
        },
        // 筛选补签日期
        selectCom (info) {
            let startDate = new Date(info.startTime).getTime(); // 当前周开始日期
            let nowDate =new Date(this.createTimeStr(2018,this.info.currentMonth,this.info.currentDay)).getTime(); // 当前日的日期
            let comArr,comArr2,comArr3;// 补签日期数组
            comArr2 = this.dateList.filter(item => new Date(item.timeStr).getTime()>=startDate)  // 筛选大于当周日期
            comArr = comArr2.filter(item => new Date(item.timeStr).getTime()<nowDate) // 筛选小于当前日期
            comArr3 = this.dateList.filter(item => new Date(item.timeStr).getTime()<startDate)
            console.log(comArr)
            console.log(this.dateList)
            this.dateList.forEach((item,index)=>{
                    nowDate == new Date(item.timeStr).getTime() ?  item.isNow = true :  item.isNow = false
                    comArr.forEach((item1)=>{
                    if (item.date == item1.date) {
                        // 补签次数只能用8次
                        if (info.useCardCount>7) {
                            this.$set(this.dateList[index], 'complete', -1)
                        } else{
                             this.$set(this.dateList[index], 'complete', 0)
                        }
                    }
                })
            })
            this.dateList.forEach((item,index)=> {
                comArr3.forEach((item1)=>{
                    if (item.date == item1.date) {
                        if (!item.sign) {
                            this.$set(this.dateList[index], 'passCom', 1)
                        }
                    }
                })
            })
        },
        // 签到
        signIn (isNow) {
            if (!this.login) {
                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
            } else {
                // 当天签到，非当天不请求接口
                if (!isNow) {
                    return
                }
                let day = 0
                new Date(this.createTimeStr(2018,this.info.currentMonth,this.info.currentDay)).getDay() == 0 ? day = 7 : day = new Date(this.createTimeStr(2018,this.info.currentMonth,this.info.currentDay)).getDay()
                this.getAppData('/score/activitySignIn',(data) => {
                    if(data.resCode == 1){
                        this.dialogInfo = {
                            isShow:true,
                        }
                        switch (data.resData.goodsRule) {
                            case 8 : this.dialogInfo.background = 'https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_8.png'
                                         this.dialogInfo.bottom = 0 
                                        break;
                            case 15 : this.dialogInfo.background = 'https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_15.png'
                                           this.dialogInfo.bottom = 0 
                                        break;
                            case 28 : this.dialogInfo.background = 'https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_28.png'
                                           this.dialogInfo.bottom = 0 
                                        break;
                            case -1 : this.dialogInfo.background = 'https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_jlqg.png'
                                         this.dialogInfo.bottom = 0 
                                        break;
                            default: this.dialogInfo.background ='https://aliyunsso.edspay.com/web/wx/activity/sign/tanc_qdcg.png'
                        }
                    }
                },{signInNumber:day,type:1},)
            }
        },
        // 分享
        shareSign () {
            if (this.login) {
                window._czc.push(["_trackEvent",'签到有礼','分享']);
                this.getAppData('/score/userShareScore',(data) => {
                    if(data.resCode == 1){
                        if (this.osType) {
                            this.PassValue(this.appShare);
                        }else {
                            this.isShare=true;
                        }
                    }
                },{},)
            } else {
                if (this.osType) {
                    this.PassValue(this.appShare);
                }else {
                    this.isShare=true;
                }
            } 
        },
        // 判断活动开始结束
        getActivityTime () {
            this.getNotlogData('/activity/two/getActivityTime',(data) => {
                if(data.resCode == 1){
                    this.active = data.resData.active
                    this.endDate = Number(data.resData.endTime.split(' ')[0].split('-')[2])
                    this.startDate = Number(data.resData.startTime.split(' ')[0].split('-')[2])
                    if (data.resData.active == 2) {
                        this.ifActivityTime = false
                        MessageBox('温馨提示', '该活动尚未开始！');
                    } else if (data.resData.active == 3) {
                        this.ifActivityTime = false
                        MessageBox('温馨提示', '该活动已结束！');
                    }
                    this.createDate()
                    this.getInfo()
                }
            },{activityId:'sign_in_activity'},)
        },
        // 活动状态弹框
        activityStatus () {
            if (this.active == 2) {
                MessageBox('温馨提示', '该活动尚未开始！');
            } else if(this.active ==3) {
                MessageBox('温馨提示', '该活动已结束！');
            }
        },
        // 显示dialog
        showDialog (val) {
            this.dialogInfo = {
                isShow:true,
                background: val,
            }
        },
        // 关闭dialog
        closeDialog (val) {
            this.dialogInfo.isShow = false
            this.getInfo()
        },
        // 去登陆
        goLogin () {
            if(!this.login) {
                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
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
        this.getActivityTime();
        this.getCookie('userToken') || this.userId? this.login = true : this.login = false;
    },
    mounted () {
        this.getWxShareData(this.shareObj);
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1274365123&web_id=1274365123'
        script.language = 'JavaScript'
        document.body.appendChild(script)
    },
    components: {
        signItem,
        signDialog
    }
}
</script>
<style lang="scss" scoped>
    .sign-root {
        width: 100%;
        height: 19.5rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/bg.png) center center no-repeat;
        background-size: cover;
        position: relative;
        // overflow: scroll;
        .sign-center {
            width: 9.933333rem;
            height: 17.133333rem;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            left: 0;
            margin: auto;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/bgcenter.png) no-repeat;
            background-size: cover;
            .sign-rule {
                position: absolute;
                right: 0px;
                width: 1.066667rem;
                height: 1.066667rem;
                z-index: 101;
            }
            .sign-gift {
                overflow: hidden;
                width: 7.573333rem;
                margin: 3.733333rem auto 0 auto;
                img{
                    width: 2.453333rem;
                    height: 1.866667rem;
                    float: left;
                }
            }
            .sign-day {
                font-family: PingFang-SC-Medium;
                font-size: .346667rem;
                color: #FFFFFF;
                letter-spacing: .026667rem;
                text-align: justify;
                text-shadow: 0 .026667rem .013333rem #00487D;
                text-align: center;
                margin-top: 1.195rem;
                line-height: .493333rem;
                .sign-count i {
                    font-size: .346667rem;
                    color: #FFCA00;
                    letter-spacing: .026667rem;
                    text-align: justify;
                    text-shadow: 0 .026667rem .053333rem rgba(0,72,125,0.50);
                }
            }
            .sign-date {
                height: 6.133333rem;
                width: 8.23333rem;
                margin: .286667rem auto 0 auto;
            }
            .sign-btm {
                height: 1.7rem;
                margin-top: .226667rem;
                div {
                    float: left;
                }
                .sign-share {
                    width: 1.493333rem;
                    height: 1.6rem;
                    margin-left: .56rem;
                }
                .sign-btn {
                    width: 6.826667rem;
                    height: 1.6rem;
                    margin-left: .453333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/qiandao.png) no-repeat;
                    background-size: 6.8rem 1.573333rem;
                }
                .nosign-btn {
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/sign/yiqiandao.png) no-repeat;
                    background-size: 6.8rem 1.573333rem;
                }
            }
        }
    .rule-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        background-color:#000; 
        filter:alpha(opacity=70); 
        -moz-opacity:0.7; 
        opacity:0.7; 
        z-index: 102;
    }
	.rule-div {
        background: url('https://aliyunsso.edspay.com/web/wx/activity/sign/guize.png') no-repeat;
        background-size: 100%;
        width: 8.266667rem;
        height: 12.746667rem;
        position: absolute;
        z-index: 103;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
            span {
                font-size: .346667rem;
                line-height: .493333rem;
                color: #066BB7;
                position: absolute;
                top: .99rem;
                left: 2.586667rem;
            }
            a {
                    line-height: .32rem;
                    position: absolute;
                    bottom: 2.013333rem;
                    left: 5.666667rem;
                    font-size: .266667rem;
                    color: #004D88;
            }
            p {
                    font-size: .266667rem;
                    width: 100%;
                    color: #FFFFFF;
                    text-align: center;
                    position: absolute;
                    bottom: 1.56rem;
            }
            i {
                position: absolute;
                bottom: 0;
                display: inline-block;
                width: 2.986667rem;
                height: 1.306667rem;
                left: 2.68rem;
            }
        }
        .sign-all-mask {
            position: fixed;
            top: 0px;
            width: 100%;
            z-index:100;
        }
        .sign-mask {
            opacity: 0.6;
            background: #000000;
            z-index: 1000;
            position: fixed;
            top: 0px;
            width: 100%;
            .sign-share {
                width: 100%;
                height: 5.333333rem;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/sign/fenxiangyindao.png') no-repeat;
                background-size: 100%;
                overflow: hidden;
            }
            .sign-share-btn {
                width: 2.613333rem;
                height: 1.093333rem;
                margin: 4.133333rem auto 0 auto;
            }
        }
    }
</style>

