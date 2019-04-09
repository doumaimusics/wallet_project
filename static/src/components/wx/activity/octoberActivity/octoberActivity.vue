<template>
    <div class="october-main">
         <div v-title>十月活动</div>
        <!-- 返现奖励 -->
        <div class="reward-div">
            <div class="reward-text">返现奖励<span>(元)</span><span>{{info.awardMoney ? Math.floor(info.awardMoney*100)/100 : 0 |moneyFormat}}</span></div>
            <div class="login-btn reward-btn" v-if="!login" @click="goLogin"></div>
            <div class="detail-btn reward-btn" v-else @click="openDetail=true"></div>
        </div>
        <!-- 条件列表 -->
        <ul class="condition-list">
            <li :class="{'active-li':info.backScale == 1 || !login || activityStatus == 2}">
                <span>待收增加</span>
                <span>所有出借年化*4%</span>
                <img v-if="info.backScale == 1 || !login || activityStatus == 2" src="https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/check.png"/>
            </li>
            <li :class="{'active-li':info.backScale == 0 && login}">
                <span>待收未增</span>
                <span>所有出借年化*2.5%</span>
                <img v-if="info.backScale == 0 && login" src="https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/check.png"/>
            </li>
        </ul>
        <!-- 实例按钮 -->
        <div class="example-btn" @click="openExample=true"></div>
        <!-- 奖励计算器 -->
        <div class="calculate-btn" @click="showCalculator=true"></div>
        <!-- 独得恩宠礼 -->
        <div class="award2-div" :class="{'award3-div': login}">
            <div class="onList-text" v-if="login">
                <p :style="{marginTop:info.sort != -1?'0':'.4rem'}">今日净出借金额:  <span>{{info.myCleanMoney ? info.myCleanMoney : 0 |moneyFormat}}元</span></p>
                        <p v-if="info.sort != -1">昨日荣登榜单第{{info.sort}}名，获得<span>{{info.reward}}</span></p>
            </div>
            <!-- 每日净出借榜 -->
            <div class="onList-div">
                <!-- 净出借问号 -->
                <div class="question-btn" @click="openQuestion=true"></div>
                <!-- 筛选日期 -->
                <div class="select-div" @click="openPicker">
                    {{nowDateStr}}
                </div>
                <mt-datetime-picker
                        ref="datetimepicker"
                        type="date"
                        v-model="nowDate"
                        year-format="{value} 年"
                        month-format="{value} 月"
                        date-format="{value} 日"
                        @confirm="handleConfirm"
                        @cancel="handelClose"
                        :closeOnClickModal="false"
                        :startDate="startDate"
                        :endDate="endDate">
                </mt-datetime-picker>
                <!-- 排行榜 -->
                <div class="bottom-div" ref="table">
                    <!-- <i v-if="list.length==0">暂无数据</i>
                    <ul v-else>
                        <li v-for="item in list">
                            <span>{{item.phone}}<em v-if="item.isTodayTop">(我)</em></span>
                            <span>{{item.cleanMoney}}</span>
                            <span>{{item.reward}}</span>
                        </li>
                    </ul> -->
                    <ul>
                        <li v-for="item in info.sortList"><span>{{item.mobilePhone}}<em v-if="item.isme == 1">(我)</em></span><span>{{item.cleanMoney ? item.cleanMoney : '--' }}</span><span>{{item.reward}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="btm-pic"></div>
        </div>
        <!-- 底部按钮 -->
        <div class="btn-div">
            <div class="share-btn fl" @click="goShare"></div>
            <div class="invest-btn fl" @click="goInvest"></div>
        </div>
        <!--===============================弹框类 ==========================-->
        <!-- 活动结束弹框 -->
        <div  v-layer v-if="timeEnd" class="layer">
            <div class="end-div" :class="{'unStart-div': activityStatus==2}">
                <div class="end-close" @click="timeEnd=false"></div>
            </div>
        </div>
        <!-- 示例弹框 -->
        <div  v-layer v-if="openExample" class="layer">
            <div class="example-div">
                <div class="example-close" @click="openExample=false"></div>
            </div>
        </div>
        <!-- 净出借问号弹框 -->
        <div  v-layer v-if="openQuestion" class="layer">
            <div class="question-div">
                <div class="qeusiton-close" @click="openQuestion=false"></div>
            </div>
        </div>
        <!-- 返现详情弹框 -->
        <div  v-layer v-if="openDetail" class="layer">
            <div class="detail-div">
                <div class="detail-text">
                    <p>回款本金(元)：<span>{{info.returnCash ? info.returnCash : 0}}</span></p>
                    <p>出借金额(元)：<span>{{info.lendMoney ? info.lendMoney : 0}}</span></p>
                    <p>当前返现比例：<span>{{info.backScale == 1 ? '4%' : '2.5%'}}</span></p>
                    <p>累计出借年化：<span>{{Math.floor(info.yearMoey*100)/100 ?  Math.floor(info.yearMoey*100)/100 : 0| moneyFormat}}</span></p>
                </div>
                <div class="detail-close" @click="openDetail=false"></div>
            </div>
        </div>
        <!-- 分享弹框 -->
        <div  v-layer v-if="isShare" class="layer">
            <div class="share-div">
                <div class="share-close" @click="isShare=false"></div>
            </div>
        </div>
        <!-- 参加弹框 -->
        <div  v-layer v-if="isJoin&&login&&activityStatus==1" class="layer">
            <div class="join-div">
                <div class="join-btn" @click="goJoin"></div>
            </div>
        </div>
        <!-- 神券 -->
        <div class="quan-btn" @click="toGoogList"></div>
        <!-- 规则 -->
        <div class="rule-btn" @click="openRule=true"></div>
        <!-- 规则弹框 -->
        <div class="rule-mask layer" v-layer v-if="openRule">
            <div class="rule-div" >
                <div class="rule-text">
                    <div>
                        <a href="tel:400-135-3388"></a>
                        <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
                    </div>
                </div>
                <div class="rule-close" @click="openRule=false"></div>
            </div>
        </div>
        <!-- 计算器 -->
        <calculator :showCalculator="showCalculator" @closeCal="closeCal"></calculator>
    </div>
</template>
<script>
import calculator from './octoberCalculator'
import wxShare from '../../../../common/wx/wxShare';
import wxToapp from '../../../../common/wx/wxToapp'
export default {
    mixins: [wxShare,wxToapp],
    data () {
        return{
            login:false,
            openDate:false, // 日期选择器开关
            openRule:false, // 规则开关
            openDetail:false,
            timeEnd:false,
            activityStatus:1,
            showCalculator:false,// 计算器开关
            isShare:false,  // 分享开关
            isJoin:false,
            openExample:false,
            openQuestion:false,
            startDate: new Date('2018-10-12'),
            endDate:  new Date('2018-10-25'),
            nowDate:'',
            nowDateStr:'',
            info:{},
            shareObj: {
                title: "钱包长成计划", 
                desc: "节后回血，备战剁手节，返现最高4%",
                link: global.host+"activity/october", 
                imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/shareIcon.png"
            },
        }
    },
    components:{
        'calculator':calculator
    },
    methods: {
        defaltInfo () {
            this.getNotlogData('/getOctActivity',(data) => {
                if(data.resCode == 1){
                    this.activityStatus = data.resData.time
                    data.resData.time !== 1? this.timeEnd = true : this.timeEnd = false
                    data.resData.join == 1 ? this.isJoin = true : this.isJoin = false
                    this.info = data.resData
                }
            },{date:this.nowDateStr},)
        },
        getInfo () {
            this.getNotlogData('/getOctActivity',(data) => {
                if(data.resCode == 1){
                    this.info = data.resData
                }
            },{date:this.nowDateStr},)
        },
        // 获取当天日期字符串
        getDateStr (date) {
            var year=date.getFullYear();
            var month=((date.getMonth()+1)<10?'0':'')+(date.getMonth()+1);
            var day=(date.getDate()<10?'0':'')+date.getDate();
            return year+'-'+month+'-'+day
        },
        // 参加活动
        goJoin () {
            this.getAppData('/activity/haveJoin',(data) => {
                if(data.resCode == 1){
                    this.isJoin = false
                }
            },{},)
        },
        // 去分享
        goShare () {
            if (this.activityStatus==1) {
                if (this.osType) {
                    this.PassValue(this.appShare);
                }else {
                    this.isShare=true;
                }
            } else {
                this.timeEnd = true
            }
        },
        // 打开日期选择器
        openPicker () {
            let check = false
            this.openDate = true
            // Wed Aug 01 2018 00:00:00 GMT+0800 (中国标准时间)  0点！！！
            if (this.nowDate!=='') {
                if (this.nowDate.getTime() ==(this.startDate.getTime() - (8*60*60*1000))) {
                    check = true
                }
            } else {}
            if (check||!this.nowDate) {
                setTimeout(()=> {
                    this.$nextTick(function () {
                        this.$refs.datetimepicker.currentValue = new Date()
                    })
                },200)
            }
            this.$refs.datetimepicker.open()
        },
        // 日期选择器确认
        handleConfirm (data) {
            this.nowDate = data
            this.nowDateStr = this.getDateStr(data)
            this.openDate = false
            this.getInfo()
        },
        handelClose () {
            this.openDate = false
        },
        // 关闭计算器
        closeCal () {
            this.showCalculator = false
        },
        // 去投资
        goInvest  () {
            if (this.activityStatus==1) {
                if (this.login) {
                    this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
                } else {
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                }
            } else {
                this.timeEnd = true
            }
        },
        // 去登陆
        goLogin () {
             this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
        },
        // 跳积分商城兑换列表页
        toGoogList(){
            this.osType ? this.PassValue('GoodsList') : this.$router.push({ path: '/intGoodList', query: {thisUrl:this.$route.fullPath}});
        },
        isMove(e) {
            e.preventDefault();
        },
        closeTouch:function(){
            document.body.addEventListener('touchmove', this.isMove, { passive:false});
        },
        openTouch:function(){
            document.body.removeEventListener('touchmove', this.isMove,  { passive:false});
        },
    },
    created () {
        this.getCookie('userToken') || this.userId? this.login = true : this.login = false;
        this.nowDateStr = this.getDateStr(new Date())
        this.defaltInfo()
    },
    mounted () {
            this.getWxShareData(this.shareObj);
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274953153&web_id=1274953153'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        },
        'openDate'(val) {
            if (val) {
                this.closeTouch()
                document.body.setAttribute("class","bodychannel");
            } else {
                this.openTouch()
                document.body.removeAttribute("class","bodychannel");
            }
        },
        'openRule' (val) {
            if (val) {
                document.body.setAttribute("class","overflowRule");
            } else {
                document.body.removeAttribute("class","overflowRule");
            }
        }
    },
}
</script>
<style>
	body.bodychannel {
			overflow: hidden;
            height: 100%;
	}
    body.overflowRule {
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            overflow: hidden;
    }
</style>
<style lang="scss" scoped>
    .october-main{
        width: 100%;
        height: 43.146667rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/main.png) center center no-repeat;
        background-size: cover;
        position: relative;
        overflow: hidden;
        .layer {
            background-color: rgba(0, 0, 0, 0.7) !important;
        }
        .reward-div {
            position: absolute;
            width: 3.933333rem;
            height: 1.573333rem;
            top: 15.306667rem;
            left: 3.053333rem;
            .reward-text{
                font-size: .346667rem;
                height: .55rem;
                line-height: .5rem;
                font-weight: bold;
                color: #AC2829;
                margin: .189667rem 0 0 .07rem;
                span:nth-of-type(1) {
                    font-weight: normal;
                    font-size: .293333rem;
                }
                span:nth-of-type(2) {
                    font-weight: normal;
                    font-family: DIN-Regular;
                    display: inline-block;
                    text-align: center;
                    width: 1.75rem;
                    font-size: .346667rem;
                    margin-left: .136667rem;
                    color: #FFFFFF;
                }
            }
            .reward-btn {
                width: 2rem;
                height: .6rem;
                margin: .15rem 1.04rem 0 .933333rem;
            }
            .login-btn {
                background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/login.png);
                background-size:cover;
            }
            .detail-btn {
                background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/detail.png);
                background-size: cover;
            }
        }
        .condition-list {
            width: 7.146667rem;
            height: 1.6rem;
            position: absolute;
            top: 18.333333rem;
            left: 1.426667rem;
            color: #862E00;
            li {
                height: .733333rem;
                line-height: .733333rem;
                margin-bottom: .041667rem;
                font-size: .293333rem;
                span {
                    display: inline-block;
                }
                span:nth-of-type(1) {
                    width:2.566667rem;
                    padding-left: .6rem;
                }
                span:nth-of-type(2) {
                    width: 3rem;
                }
                img {
                    width: .946667rem;
                    height: .613333rem;
                    margin: 0 0 .2rem .2rem;
                }
            }
        }
        .example-btn {
            position: absolute;
            width: 2.266667rem;
            height: .8rem;
            top: 21.946667rem;
            left: 1.4rem;
        }
        .calculate-btn {
            position: absolute;
            width: 2.266667rem;
            height: .8rem;
            top: 21.946667rem;
            left: 6.466667rem;
        }
        .award2-div {
            width: 9.906667rem;
            height: 12.533333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/img2.png);
            background-size: cover;
            position: relative;
            overflow: hidden;
            margin: 26.133333rem 0 0 .116667rem;
            .btm-pic {
                position: absolute;
                width: 8.88rem;
                height: 3.173333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/bottomPic.png);
                background-size: cover;
                bottom: -0.466667rem;
                left: .266667rem;
            }
            .onList-text {
                width: 7.266667rem;
                height: 1.573333rem;
                margin: 2.266667rem auto 0 auto;
                font-size: .346667rem;
                color: #565656;
                text-align: center;
                overflow: hidden;
                p:nth-of-type(1){
                    line-height: .84rem;
                    span {
                        font-family: DIN-Bold;
                        font-size: .4rem;
                        color: #C63028; 
                    }
                }
                p:nth-of-type(2){
                    font-weight: bold;
                    span {
                        font-family: PingFang-SC-Bold;
                        font-size: .373333rem;
                        color: #C63028;
                    }
                }
            }
            .onList-div {
                position: relative;
                width: 8.213333rem;
                height: 7.426667rem;
                margin: 2.266667rem auto 0 auto; 
                .question-btn {
                    position: absolute;
                    width: .333333rem;
                    height: .333333rem;
                    top: .266667rem;
                    left: 5.44rem;
                }
                .select-div {
                    position: absolute;
                    top: 1.193333rem;
                    right: .103333rem;
                    font-size: .293333rem;
                    color: #C55854;
                }
                .bottom-div {
                    position: absolute;
                    width: 7.106667rem;
                    height: 4.186667rem;
                    top: 3.066667rem;
                    left: 1.04rem;
                    ul {
                        li {
                            height: .666667rem;
                            line-height: .666667rem;
                            width: 7.6rem;
                            margin-bottom: .173333rem;
                            font-size: .32rem;
                            color: #753D00;
                            span {
                                text-align: center;
                                display: inline-block;
                            }
                            span:nth-of-type(1) {
                                width: 2.6rem;
                            }
                            span:nth-of-type(2) {
                                width: 2rem;
                            }
                            span:nth-of-type(3) {
                                width: 2.666667rem;
                            }
                            em {
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
        .award3-div {
            width: 9.906667rem;
            height: 14.666667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/img1.png);
            background-size: cover;
            .onList-div {
                margin: .526667rem 0 0 .833333rem;
            }
        }
        .example-pop {
            width: 8.32rem;
            height: 4.826667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/etc.png);
            background-size: cover;
            position: absolute;
            top: 22.713333rem;
            left: 0.803333rem;
        }
        .rule-btn{
            width:.946667rem;
            height: 1.08rem;
            position: fixed;
            right: .4rem;
            top: 0;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/ruleBtn.png) center center no-repeat;
            background-size: cover;
        }
        .quan-btn {
            width:1.48rem;
            height: 1.6rem;
            position: fixed;
            right: 0;
            top: 10.666667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/quanBtn.gif) center center no-repeat;
            background-size: cover;
        }
        .btn-div {
            width: 100%;
            height: 1.306667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/bottomBtn.png);
            background-size: cover;
            position: fixed;
            bottom: 0;
            left: 0;
            .share-btn {
                width: 3.946667rem;
                height: 1.306667rem;
            }
            .invest-btn {
                    width: 6.053333rem;
                    height: 1.306667rem;
            }
        }
        .rule-div {
            width: 7.946667rem;
            height: 9.72rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/ruleDialog.png);
            background-size: cover;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin:auto;
            .rule-text {
                width: 6.826667rem;
                height: 5.893333rem;
                margin: 1.733333rem auto 0 auto;
                overflow: hidden;
                overflow-y: auto;
                div{
                    width: 6.826667rem;
                    height: 11.413333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/ruleText.png);
                    background-size: 6.826667rem 11.413333rem;
                    position: relative;
                     a {
                        display: inline-block;
                        width: 2.413333rem;
                        height: .44rem;
                        position: absolute;
                        margin: 10rem 0 0 .906667rem;
                    }
                    p {
                        font-size: .266667rem;
                        color: #999999;
                        text-align: center;
                        position: absolute;
                        bottom: 0;
                        left: 1.6rem;
                    }
                }
            }
            .rule-close {
                width: .8rem;
                height: .8rem;
                margin: 1.3rem auto 0 auto;
            }
        }
        .end-div {
            width: 8.226667rem;
            height: 5.626667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/end.png);
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin:auto;
            .end-close{
                width: 2.466667rem;
                height: .733333rem;
                margin: 4.346667rem auto 0 auto;
            }
        }
        .unStart-div {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/unStart.png);
            background-size: cover;
        }
        .example-div {
            width: 7.946667rem;
            height: 9.72rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/example.png);
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin:auto;
            .example-close {
                width: .8rem;
                height: .8rem;
                position: absolute;
                bottom: 0;
                 left: 3.533333rem;
            }
        }
        .question-div {
            width: 8.226667rem;
            height: 5.626667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/day.png);
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin:auto;
             .qeusiton-close {
                width: 2.466667rem;
                height: .733333rem;
                margin: 4.346667rem auto 0 auto;
            }
        }
        .detail-div {
            width: 8.226667rem;
            height: 7.106667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/detailDiv.png);
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin:auto;
            .detail-text {
                font-size: .32rem;
                color: #333333;
                margin:2.533333rem  0 0 2rem ;
                p {
                    line-height: .4rem;
                    margin-bottom: .106667rem;
                    span {
                        color: #666666;
                        font-family: DIN-Medium;
                        margin-left: .106667rem;
                    }
                }
                p:nth-of-type(3) {
                    span {
                        color: #D24138;
                    }
                }
            }
            .detail-close {
                width: 2.466667rem;
                height: .733333rem;
                margin: 1.373333rem auto 0 auto;
            }
        }
        .join-div {
            width: 6.413333rem;
            height: 7.453333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/join.gif);
            background-size: cover;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin:auto;
            .join-btn {
                width: 3.4rem;
                height: .833333rem;
                margin: 5.82rem 0 0 1.506667rem;
            }
            .join-close {
                width: .8rem;
                height: .8rem;
                margin: 1.303333rem auto 0 auto;
            }
        }
        .share-div {
            width: 100%;
            height: 4.32rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/share.png) no-repeat;
            background-size: cover;
            overflow: hidden;
            .share-close {
                width: 3.826667rem;
                height: 1.6rem;
                margin: 2.4rem auto 0 auto;
            }
        }
        .active-li {
            font-size: .32rem !important;
            font-weight: bold;
            color: #FF2C2F;
        }
    }
</style>

