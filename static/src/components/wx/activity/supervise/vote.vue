<!-- 投票阶段WX -->
<template>
    <div id="vote">
        <div class="data">{{time}}</div>
        <div class="explain" v-html="explain"></div>
        <div class="selected">
            <div class="collapse" v-for="(v, i) in voteQA">
                <h1 @click="popo(i)">{{v[0]}}
                    <i class="iconfont" v-if="detail == i">&#xe61d;</i>
                    <i class="iconfont" v-else>&#xe600;</i>
                </h1>
                <p ref="conten" v-show="detail == i" v-for="(item, index) in v" :class="{mt: index == 1}" v-if="index>0" v-html="item"></p>
            </div>
        </div> 
        <mt-loadmore class="mtContent" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
            <ul class="logChild" v-if="list.length">
                <li v-for="(item, index) in list" class="list">
                    <div class="itemTop">
                        <div class="imgBox">
                            <div class="No" v-if="item.topId < 10">0{{item.topId}}</div>
                            <div class="No" v-else>{{item.topId}}</div>
                            <img :src="item.photoUrl" alt="">
                            <div class="introductionBtn" @click="introductionBtn(item.id)"></div>
                            <div class="namebox">
                                <div class="name fl">{{item.realName}}</div>
                                <div class="vip fl">{{item.vipLevel}}</div>
                                <div class="voteNumber fr">{{item.voteNumber}}<em>票</em></div>
                            </div>
                        </div>
                        <div class="voteBtn">
                            <div class="btn" v-if="item.isVote == 0" @click="isVote(item.id, item.realName, item.topId)"></div>
                            <div class="btn over" v-else></div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="nav" v-if="allLoaded">没有更多了～</div>
            <div class="null"></div>
        </mt-loadmore>
        <!-- 获取候选人简绍 -->
        <mt-popup v-model="candidateUser"  position="bottom" :closeOnClickModal="true">
            <div class="popupCenTop bdr-b">
                <img :src="detailed.imageUrl?detailed.imageUrl:'https://aliyunsso.edspay.com/web/wx/account/head.png'" alt="">
                <div class="vip fl">{{detailed.vipLevel}}</div>
                <div class="proe">
                    <p class="name">{{detailed.realName}}</p>
                    <p class="city">{{detailed.province}}<em></em>{{detailed.city}}</p>
                </div>
                <div class="voteR">
                    <p class="voteNumber">共获得<em>{{detailed.voteNumber?detailed.voteNumber:0}}</em>票</p>
                    <p class="btn" @click="candidateUser = false">{{detailed.isVoteStatus == 1 ? '前往投票' : '关闭简介'}}</p>
                </div>
            </div>
            <div class="photoUrl" ref="scroollT">
                <img :src="detailed.photoUrl" alt="">
                <div class="introduction" v-html="introduction"></div>
            </div>
        </mt-popup>
        <!-- 投票确认弹框 -->
        <div v-if="confirmVote" v-layer></div>
        <div v-if="confirmVote" class="confirmVote">
            <div class="item">您是否确认为{{voteUser.topId}}号{{voteUser.realName}}投票？</div>
            <div class="close" @click="confirmVote = false"></div>
            <div class="confirm" @click="confirm"></div>
        </div>
   </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';   // 与app交互
    import { Toast, Loadmore, Popup} from 'mint-ui';
    export default {
        mixins: [wxToapp],
        data() {
            return {
                confirmVote:false,   // 投票弹框
                voteUser :{},  // 保存被投票用户信息用户
                autoFill: false,
                candidateUser: false,    // 获取候选人简绍开关
                detailed:'',
                time:'',
                list: [],
                allLoaded: false,
                pageNo: 1,
                backTopShow:false,   //  返回顶部按钮显示
                tt: function() { },
                timeFlag: true,   // 投票时间是否结束
                explain: '',
                voteQA: [['评选规则','本次监督委员会选举按照满分10分的评分制进行评选，以最终得分确定入选的10名成员。','一、初选面试环节占比50%<em>（满分5分）</em>','此环节将根据报名用户出借年限、在投金额、累计出借金额、行业知识储备、平台产品熟悉度、独立撰写报告能力等维度进行综合打分，采取电话面试、视频面试或受邀至公司面谈的形式，最终确定进入投票阶段的候选人。','二、投票环节的票数占比50%<em>（满分5分）</em>','通过初选面试环节的用户将晋级到投票环节，根据最终票数确定用户本轮的得分。','例：若本次投票总票数为5000，张三得到1200票，参与初选面试成绩为4分，则张三的最终得分为：（1200 /5000）*5 + 4=5.2分']],
                detail: -1,
                isVotes: 0,
                introduction: '',
                popup:true,
            }
        },
        methods: {
            getData(n){
                this.getNotlogData('/activity/candidateUser/getList',(res) =>{
                    if(res.resCode){
                        if(n == 1){
                           this.list = res.resData.list;
                        }else{
                            this.list = this.list.concat(res.resData.list)
                        }
                        this.isVotes = res.resData.isVote;
                        n == res.resData.total ? this.allLoaded = true :  this.allLoaded = false
                        this.explain = '<p>在激烈的报名结束后，经过面试环节多维度评分筛选，我们从<em>' + res.resData.sumCount + '位</em>报名用户中选出<em>' + res.resData.candidateCount + '位</em>候选人进行投票评选，最终将根据初选面试环节和投票环节的总得分确定监督委员会10名成员</p><p>投票期间每人只有一次投票机会，每次仅限为一位候选人投票，希望各位E友在投票时仔细查看每位候选人相关信息，选出最具公信力的10名成员</p>'
                        this.popup = true;
                        let t = res.resData.date;
                        t == 0 ? this.timeFlag = false : '';
                        this.formatTime(t);
                        this.tt = setInterval(() => {
                            t -= 60;
                            if(t<60){
                                this.timeFlag = false;
                                clearInterval(this.tt);
                            } else{
                                this.formatTime(t);
                            } 
                        }, 60000);
                    }
                },{pageNumber:n, pageSize:10},1)

            },
            loadBottom(){
                if(this.popup){
                    this.popup = false;
                    this.pageNo += 1;
                    setTimeout(() => {
                        this.getData(this.pageNo)
                        this.$refs.loadmore.onBottomLoaded();
                    },1500)
                }
            },
            loadTop(){
				this.pageNo = 1;
                setTimeout(() => {
					this.getData(this.pageNo)
                    this.$refs.loadmore.onBottomLoaded();
				},1500)
			},
            backTop(){
                let back = setInterval(() => {
                    if(document.body.scrollTop||document.documentElement.scrollTop){
                        document.body.scrollTop-=100;
                        document.documentElement.scrollTop-=100;
                    }else {
                        clearInterval(back)
                    }
                });
            },
            introductionBtn(n){
                this.introduction = '';
                this.getNotlogData('/activity/candidateUser/detailed',(res) =>{
                    if(res.resCode){
                        this.detailed = res.resData
                        this.candidateUser = true
                        setTimeout(() => {    
                            this.introduction = res.resData.introduction;
                        }, 100);
                    }
                },{id:n},1)
            },
            isVote(id, realName, topId){
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                if(!this.timeFlag){
                   Toast('已过投票时间！');
                    return
                }
                if(this.isVotes == 1){
                    Toast('您的投票机会已用完！');
                    return
                }
                this.voteUser.realName = realName;
                this.voteUser.id = id;
                this.voteUser.topId = topId;
                this.confirmVote = true;
            },
            confirm(){
                this.getAppData('/activity/candidateUser/toVote',(res) =>{
                    if(res.resCode){
                        this.confirmVote = false;
                        Toast(res.resData.popUpWriter);
                        this.pageNo = 1;
                        this.getData(this.pageNo)
                    }
                },{id: this.voteUser.id})
            },
            handleScroll(){
                if (document.documentElement.scrollTop > document.documentElement.clientHeight || document.body.scrollTop > document.documentElement.clientHeight) {
                    this.backTopShow=true;
                } else {
                    this.backTopShow=false;
                }
            },
            popo(i){
                this.detail == i ? this.detail = -1 : this.detail = i
            },
            formatTime(value) {   // 时间转换 
                let day = Math.floor((value / 3600) / 24);
                let hour = Math.floor((value / 3600) % 24);
                let minute = Math.floor((value / 60) % 60);
                this.time = day+"天"+hour+"时"+minute+"分";
            }
        },
        created: function() {
        },
        destroyed(){
    		clearInterval(this.tt);
    		window.removeEventListener('scroll',this.handleScroll );
    	},
        mounted: function() {
            this.getData(1);
            document.title = 'E都市钱包监督委员会';
            this.PassValue('NavWhite_E都市钱包监督委员会');
            window.addEventListener('scroll', this.handleScroll)
        },
        components: {

        },
        watch: {
            'candidateUser'(val){
                if(val){
                    document.title = '候选人简介';
                    this.PassValue('NavWhite_候选人简介');
                }else{
                    document.title = 'E都市钱包监督委员会';
                    this.PassValue('NavWhite_E都市钱包监督委员会');
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #vote{
        font-family: PingFang-SC-Medium;
        width: 100%;
        min-height: 30rem;
        overflow: hidden;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteBg.png) top left no-repeat;
        background-color: #F7F0FF;
        background-size: 100% 51.693333rem;
        .data{
            width: 5.333333rem;
            height: 1rem;
            margin: 0 auto;
            margin-top: 8.693333rem;
            font-family: PingFang-SC-Bold;
            font-size: .56rem;
            color: #FFFFFF;
            text-align: center;
            line-height: 1rem;
        }
        .explain{
            width: 8.613333rem;
            height: 4.106667rem;
            margin: .906667rem auto 1.24rem;
            padding: .213333rem .186667rem 0;
            text-align: justify;
            font-family: PingFang-SC-Medium;
            font-size: .346667rem;
            color: #7051D0;
            line-height: .533333rem;
            text-indent: 2em;
            em{
                font-family: PingFang-SC-Bold;
                color: #FF5B4C;
            }
        }
        .selected{
            overflow: hidden;
            margin-bottom: .666667rem;
            .collapse{
                width: 9rem;
                min-height: 1rem;
                margin: 0 auto;
                position: relative;
                border-radius: .106667rem;
                border: .08rem solid #6323B7;
                background: #fff;
                padding-bottom: .2rem;
                h1{
                    font-family: PingFang-SC-Bold;
                    font-size: .373333rem;
                    color: #FFFFFF;
                    position: absolute;
                    top: -0.08rem;
                    left: -0.08rem;
                    height: 1rem;
                    line-height: 1rem;
                    width: 9rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteListGg.png) center center no-repeat;
                    background-size: 100% 100%;
                    z-index: 1;
                    padding-left: .813333rem;
                    i{
                        font-size: .56rem;
                        float: right;
                        margin-right: .426667rem;
                    }
                }
                p{
                    width: 100%;
                    padding: 0 .2rem;
                    font-family: PingFangSC-Regular;
                    font-size: .32rem;
                    color: #666;
                    line-height: .506667rem;
                    text-align: justify;
                    margin-bottom: .133333rem;
                }
                p.mt{
                    margin-top: 1.2rem;
                    text-indent: 2em;
                }
            }
        }
        .mtContent{
            .logChild{
                width: 100%;
                height: auto;
                overflow: hidden;
                padding: 0 .32rem;
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;
                li{
                    width: 4.533333rem;
                    height: 5.906667rem;
                    margin-bottom: .533333rem;
                    .imgBox{
                        height: 4.786667rem;
                        width: 4.266667rem;
                        position: relative;
                        top: .08rem;
                        background: #fff;
                        border-radius: .106667rem;
                        box-shadow: 0 9px 15px 0 #E5CFFF;
                        padding: .186667rem .186667rem 0;
                        margin-left: .133333rem;
                        .No{
                            width: .68rem;
                            height: .693333rem;
                            position: absolute;
                            top: -0.08rem;
                            left: .266667rem;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteNo.png) top left no-repeat;
                            background-size: 100%;
                            font-family: DIN-Bold;
                            font-size: .4rem;
                            color: #FFFFFF;
                            padding-left: .066667rem;
                            line-height: .693333rem;
                        }
                        img{
                            pointer-events: none; 
                            width: 3.893333rem;
                            height: 3.813333rem;
                        }
                        .introductionBtn{
                            width: 2.026667rem;
                            height: .453333rem;
                            position: absolute;
                            top: 3.466667rem;
                            left: 1.973333rem;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/introductionBtn.png) top left no-repeat;
                            background-size: 100%;
                        }
                        .namebox{
                            width: 100%;
                            height: .786667rem;
                            background: #fff;
                            .name{
                                font-family: PingFang-SC-Bold;
                                font-size: .373333rem;
                                color: #515151;
                                line-height: .786667rem;
                            }
                            .vip{
                                width: .533333rem;
                                height: .293333rem;
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBg.png) top left no-repeat;
                                background-size: 100%;
                                font-family: DIN-Medium;
                                font-size: .266667rem;
                                color: #FFFFFF;
                                text-align: center;
                                line-height: .346667rem;
                                margin-top: .24rem;
                                margin-left: .066667rem;
                            }
                            .voteNumber{
                                font-family: DIN-Bold;
                                font-size: .506667rem;
                                color: #674EC4;
                                letter-spacing: 0;
                                line-height: .786667rem;
                                em{
                                    font-family: PingFang-SC-Medium;
                                    font-size: .32rem;
                                    color: #2A2A2A;
                                    line-height: .786667rem;
                                    display: inline-block;
                                }
                            }
                        }
                    }
                    .voteBtn{
                        width: 4.533333rem;
                        height: 1.173333rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBottomBg.png) top left no-repeat;
                        background-size: 100%;
                        position: relative;
                        top: -0.133333rem;
                        .btn{
                            position: absolute;
                            top: .32rem;
                            left: .773333rem;
                            width: 3.106667rem;
                            height: .8rem;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteBtn.png) top left no-repeat;
                            background-size: 100%;
                        }
                        .btn.over{
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteBtnOver.png) top left no-repeat;
                            background-size: 100%;
                        }
                    }
                }
            }
            .nav{
                width: 100%;
                height: .4rem;
                text-align: center;
                font-size: .293333rem;
                color: #9469D6;
            }
            .null{
                width: 100%;
                height: .666667rem;
            }
        }
        .confirmVote{
            width: 7.16rem;
            height: 4.52rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/confirmVote.png) top left no-repeat;
            background-size: 100%;
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 99999;
            margin-top: -2.266667rem;
            margin-left: -3.586667rem;
            .item{
                width: 100%;
                line-height: 2.933333rem;
                font-size: .426667rem;
                color: #FFFFFF;
                text-align: center;
            }
            .close, .confirm{
                width: 50%;
                height: 1.6rem;
                float: left;
            }
        }
        .mint-popup{
            width: 100%;
            height: 13.6rem; 
            background: #fff;
            border-top-left-radius: 0.4rem;
            border-top-right-radius: 0.4rem;
            padding: .533333rem;
            padding-bottom: 0;
            .popupCenTop{
                width: 100%;
                height: 1.893333rem;
                position: relative;
                img{
                    width: 1.333333rem;
                    height: 1.333333rem;
                    border-radius: .666667rem;
                    pointer-events: none; 
                    margin-right: .306667rem;
                    margin-left: .133333rem;
                    float: left;
                }
                .vip{
                    position: absolute;
                    top: .933333rem;
                    left: .853333rem;
                    width: .76rem;
                    height: .4rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBg.png) top left no-repeat;
                    background-size: 100%;
                    font-family: DIN-Medium;
                    font-size: .266667rem;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: .4rem;
                }
                .proe{
                    height: 1.133333rem;
                    margin-top: .213333rem;
                    float: left;
                    p.name{
                        font-family: PingFang-SC-Bold;
                        font-size: .373333rem;
                        color: #333333;
                        margin-bottom: .106667rem;
                        line-height: .533333rem;
                    }
                    p.city{
                        max-width: 4.533333rem;
                        font-family: PingFangSC-Regular;
                        font-size: .346667rem;
                        color: #808080;
                        line-height: .493333rem;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        em{
                            padding-left: .133333rem;
                        }
                    }
                }
                .voteR{
                    height: 1.226667rem;
                    margin-top: .12rem;
                    margin-right: .133333rem;
                    float: right;
                    .voteNumber{
                        font-family: PingFangSC-Regular;
                        font-size: .32rem;
                        color: #333333;
                        margin-bottom: .053333rem;
                        line-height: .6rem;
                        text-align: right;
                        em{
                            font-size: .426667rem;
                            color: #FF5B4C;
                        }
                    }
                    .btn{
                        width: 2.066667rem;
                        height: .573333rem;
                        background: #FF5B4C;
                        border-radius: .286667rem;
                        font-size: .32rem;
                        color: #FFFFFF;
                        line-height: .573333rem;
                        text-align: center;
                    }
                }
            }
            .photoUrl{
                width: 100%;
                height: 9.813333rem;
                padding: 0 .266667rem 0;
                overflow: hidden;
                overflow-y: auto;
                margin-bottom: 1.2rem;
                margin-top: .48rem;
                img{
                    width: 6.133333rem;
                    height: 6.133333rem;
                    margin: 0 auto;
                    pointer-events: none; 
                    display: block;
                    margin-bottom: .48rem;
                }
                .introduction{
                    width: 8.626667rem;
                    min-height: 3.2rem;
                    margin: 0 auto;
                    font-size: .346667rem;
                    color: #666666;
                    line-height: .533333rem;
                    text-indent: 2em;
                    text-align: justify;
                }
            }
        }
    }
</style>
<style lang="scss">
    #enrol .selected .collapse p em{
        color: #999;
    } 
    #vote .introduction p{
        margin-bottom:.106667rem;
    } 
    #vote .explain em{
        color: #FF5B4C;
    }
    #vote .explain p{
        margin-bottom: .066667rem;
        text-indent: 2em;
    }
</style>