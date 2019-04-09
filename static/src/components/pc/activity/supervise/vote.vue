<!-- 投票阶段PC -->
<template>
    <div id="vote">
        <div class="data">{{time}}</div>
        <div class="explain" v-html="explain"></div>
        <div class="selected">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(v, i) in voteQA" :title="v[0]" :name="i">
                    <div v-for="(item, index) in v" v-if="index>0" :class="{mt: index == 1}" v-html="item"></div>
                </el-collapse-item>
            </el-collapse>
        </div> 
        <div class="mtContent">
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
            <div class="nav">没有更多了～</div>
            <div class="null"></div>
        </div>
        <!-- 获取候选人简绍 -->
        <div v-if="candidateUser" class="mintPopup">
            <div class="popupCenTop bdr-b">
                <img :src="detailed.imageUrl?detailed.imageUrl:'https://aliyunsso.edspay.com/web/wx/account/head.png'" alt="">
                <div class="vip fl">{{detailed.vipLevel}}</div>
                <div class="proe">
                    <p class="name">{{detailed.realName}}</p>
                    <p class="city">{{detailed.province}}<em></em>{{detailed.city}}</p>
                </div>
                <div class="voteR">
                    <p class="voteNumber">共获得<em>{{detailed.voteNumber?detailed.voteNumber:0}}</em>票</p>
                    <p class="btn" @click="candidateUser = false" v-if="detailed.isVoteStatus == 1">前往投票</p>
                </div>
            </div>
            <div class="photoUrl">
                <img :src="detailed.photoUrl" alt="">
            </div>
            <div class="introduction" v-html="detailed.introduction"></div>
        </div>
        <!-- 投票确认弹框 -->
        <div v-if="confirmVote || candidateUser" v-layer @click="candidateUser = false"></div>
        <div v-if="confirmVote" class="confirmVote">
            <div class="item">您是否确认为{{voteUser.topId}}号{{voteUser.realName}}投票？</div>
            <div class="close" @click="confirmVote = false"></div>
            <div class="confirm" @click="confirm"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time:'',
                explain: '',
                activeName: '1',
                voteQA: [['评选规则','本次监督委员会选举按照满分10分的评分制进行评选，以最终得分确定入选的10名成员。','一、初选面试环节占比50%<em>（满分5分）</em>','此环节将根据报名用户出借年限、在投金额、累计出借金额、行业知识储备、平台产品熟悉度、独立撰写报告能力等维度进行综合打分，采取电话面试、视频面试或受邀至公司面谈的形式，最终确定进入投票阶段的候选人。','二、投票环节的票数占比50%<em>（满分5分）</em>','通过初选面试环节的用户将晋级到投票环节，根据最终票数确定用户本轮的得分。','例：若本次投票总票数为5000，张三得到1200票，参与初选面试成绩为4分，则张三的最终得分为：（1200 /5000）*5 + 4=5.2分']],
                list: '',
                sumCount:'',
                candidateCount:'',
                isVotes: 0,
                timeFlag: true,   // 投票时间是否结束
                confirmVote:false,   // 投票弹框
                voteUser :{},  // 保存被投票用户信息用户
                candidateUser: false,    // 获取候选人简绍开关
                detailed:'',
            }
        },
        methods: {
            getData(){
                global.http.investPost(this, "/activity/candidateUser/getList", {pageNumber:1, pageSize:1000}, data => {
                    if(data.body.resCode == 1){
                        let res = data.body
                        this.list = res.resData.list;
                        this.sumCount = res.resData.sumCount;
                        this.isVotes = res.resData.isVote;
                        this.candidateCount = res.resData.candidateCount; 
                        this.explain = '<p>在激烈的报名结束后，经过面试环节多维度评分筛选，我们从<em>' + res.resData.sumCount + '位</em>报名用户中选出<em>' + res.resData.candidateCount + '位</em>候选人进行投票评选，最终将根据初选面试环节和投票环节的总得分确定监督委员会10名成员</p><p>投票期间每人只有一次投票机会，每次仅限为一位候选人投票，希望各位E友在投票时仔细查看每位候选人相关信息，选出最具公信力的10名成员</p>'
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
                    }else{
                        this.notify(data.body.resMsg, 2);
                    }
                })
            },
            introductionBtn(n){
                global.http.investPost(this, '/activity/candidateUser/detailed', {id:n}, data =>{
                    if(data.body.resCode == 1){
                        this.detailed = data.body.resData
                        this.candidateUser = true
                    }else{
                        this.notify(data.body.resMsg, 2);
                    }
                })
            },
            isVote(id, realName, topId){
                if (!this.getCookie('token')) {
                    this.$router.push('/login');
                    return;
                }
                if(!this.timeFlag){
                   this.notify('已过投票时间！', 2);
                    return
                }
                if(this.isVotes == 1){
                    this.notify('您的投票机会已用完！', 2);
                    return
                }
                this.voteUser.realName = realName;
                this.voteUser.id = id;
                this.voteUser.topId = topId;
                this.confirmVote = true;
            },
            confirm(){
                global.http.post(this, '/activity/candidateUser/toVote',{id: this.voteUser.id}, data => {
                    if(data.body.resCode == 1){
                        this.confirmVote = false;
                        this.notify(data.body.resData.popUpWriter, 1);
                        this.getData()
                    }else{
                        this.notify(data.body.resMsg, 2);
                    }
                })
            },
            formatTime(value) {   // 时间转换 
                let day = Math.floor((value / 3600) / 24);
                let hour = Math.floor((value / 3600) % 24);
                let minute = Math.floor((value / 60) % 60);
                this.time = day+"天"+hour+"时"+minute+"分";
            },
        },
        created: function() {
            this.getData()
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #vote{
        font-family: PingFang-SC-Medium;
        width: 100%;
        min-height: 1500px;
        overflow: hidden;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteBgPc.png) top left no-repeat;
        background-color: #F7F0FF;
        background-size: 100% 2818px;
        .data{
            width: 441px;
            height: 75px;
            font-family: PingFang-SC-Bold;
            font-size: 42px;
            color: #FFFFFF;
            text-align: center;
            line-height: 75px;
            margin: 0 auto;
            margin-top: 656px;
        }
        .explain{
            width: 936px;
            height: 190px;
            margin: 0 auto;
            margin-top: 104px;
            font-size: 26px;
            color: #7051D0;
            line-height: 36px;
            text-indent: 2em;
        }
        .selected{
            margin-top: 125px;
            overflow: hidden;
        }
        .mtContent{
            .logChild{
                width: 100%;
                height: auto;
                overflow: hidden;
                padding: 0 86px;
                li{
                    float: left;
                    width: 244px;
                    height: 320px;
                    margin-bottom: 30px;
                    margin-right: 17px;
                    .imgBox{
                        height: 258px;
                        width: 230px;
                        position: relative;
                        top: 4px;
                        background: #fff;
                        border-radius: 6px;
                        box-shadow: 0 6px 10px 0 #E7D2FF;
                        padding: 10px 10px 0;
                        margin-left: 7.2px;
                        .No{
                            width: 38px;
                            height: 37px;
                            position: absolute;
                            top: -4px;
                            left: 14.5px;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteNoPc.png) top left no-repeat;
                            background-size: 100%;
                            font-family: DIN-Bold;
                            font-size: 22px;
                            color: #FFFFFF;
                            padding-left: 5px;
                            line-height: 37px;
                        }
                        img{
                            pointer-events: none; 
                            width: 210px;
                            height: 206px;
                        }
                        .introductionBtn{
                            width: 111px;
                            height: 25px;
                            position: absolute;
                            top: 186px;
                            left: 106px;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/introductionBtnPc.png) top left no-repeat;
                            background-size: 100%;
                            cursor: pointer;
                        }
                        .namebox{
                            width: 100%;
                            height: 42px;
                            background: #fff;
                            .name{
                                font-family: PingFang-SC-Bold;
                                font-size: 20px;
                                color: #515151;
                                line-height: 42px;
                                margin-left: 5px;
                            }
                            .vip{
                                width: 29px;
                                height: 16px;
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBg.png) top left no-repeat;
                                background-size: 100%;
                                font-family: DIN-Medium;
                                font-size: 14px;
                                color: #FFFFFF;
                                text-align: center;
                                line-height: 15px;
                                margin-top: 17px;
                                margin-left: 5px;
                            }
                            .voteNumber{
                                font-family: DIN-Bold;
                                font-size: 26px;
                                color: #674EC4;
                                letter-spacing: 0;
                                line-height: 42px;
                                margin-right: 5px;
                                em{
                                    font-family: PingFang-SC-Medium;
                                    font-size: 16px;
                                    color: #2A2A2A;
                                    line-height: 42px;
                                    display: inline-block;
                                }
                            }
                        }
                    }
                    .voteBtn{
                        width: 100%;
                        height: 65px;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBottomBgPc.png) top left no-repeat;
                        background-size: 100%;
                        position: relative;
                        top: -7px;
                        .btn{
                            position: absolute;
                            top: 17px;
                            left: 42px;
                            width: 166px;
                            height: 45px;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteBtnPc.png) top left no-repeat;
                            background-size: 100%;
                            cursor: pointer;
                        }
                        .btn.over{
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteBtnOverPc.png) top left no-repeat;
                            background-size: 100%;
                            cursor: auto;
                        }
                    }
                }
                li:nth-child(4n){
                    margin-right: 0;
                }
            }
            .nav{
                width: 100%;
                height: 30px;
                text-align: center;
                font-size: 22px;
                color: #9469D6;
            }
            .null{
                width: 100%;
                height: 50px;
            }
        }
        .confirmVote{
            width: 430px;
            height: 272px;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/confirmVotePC.png) top left no-repeat;
            background-size: 100%;
            position: fixed;
            top: 50%;
            left: 50%;
            z-index: 99999;
            margin-top: -215px;
            margin-left: -136px;
            .item{
                width: 100%;
                line-height: 176px;
                font-size: 24px;
                color: #FFFFFF;
                text-align: center;
            }
            .close, .confirm{
                width: 50%;
                height: 95px;
                float: left;
                cursor: pointer;
            }
        }
        .mintPopup{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 560px;
            min-height: 540px;
            max-height: 627px;
            background: #fff;
            border-radius: 6px;
            padding: 30px 30px 15px;
            z-index: 99999;
            .popupCenTop{
                width: 100%;
                height: 77px;
                position: relative;
                border-bottom: 1px solid #E5E5E5;
                img{
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    pointer-events: none; 
                    margin-right: 12px;
                    float: left;
                }
                .vip{
                    position: absolute;
                    top: 44px;
                    left: 33px;
                    width: 29px;
                    height: 16px;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBg.png) top left no-repeat;
                    background-size: 100%;
                    font-family: DIN-Medium;
                    font-size: 16px;
                    color: #FFFFFF;
                    text-align: center;
                    line-height: 16px;
                }
                .proe{
                    height: 49px;
                    margin-top: 11px;
                    float: left;
                    p.name{
                        font-family: PingFang-SC-Bold;
                        font-size: 16px;
                        color: #333333;
                        margin-bottom: 7px;
                        line-height: 22px;
                    }
                    p.city{
                        max-width: 200px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #808080;
                        line-height: 20px;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        em{
                            padding-left: 10px;
                        }
                    }
                }
                .voteR{
                    height: 55px;
                    margin-top: 5px;
                    float: right;
                    .voteNumber{
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        margin-bottom: 4px;
                        line-height: 25px;
                        text-align: right;
                        em{
                            font-size: 18px;
                            color: #FF5B4C;
                        }
                    }
                    .btn{
                        width: 94px;
                        height: 26px;
                        background: #FF5B4C;
                        border-radius: 13px;
                        font-size: 14px;
                        color: #FFFFFF;
                        line-height: 26px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
            .photoUrl{
                width: 340px;
                height: 340px;
                margin: 15px auto;
                img{
                    width: 100%;
                    height: 100%;
                    pointer-events: none; 
                }
            }
            .introduction{
                width: 495px;
                max-height: 132px;
                min-height: 44px;
                margin: 0 auto;
                overflow: hidden;
                overflow-y: auto;
                font-size: 14px;
                color: #666666;
                line-height: 22px;
                text-indent: 2em;
            }
        }
    }
</style>
<style lang="scss">
    #vote{
        font-family: PingFang-SC-Medium;
        .el-collapse{
            border: 0;
        }
        .el-collapse-item{
            margin-bottom: 24px;
           .el-collapse-item__header{
                position: relative;
                z-index: 2;
                width: 1028px;
                height: 75px;
                margin: 0 auto;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/voteListBgPc.png) center center no-repeat;
                background-size: 100% 100%;
                border: none;
                line-height: 75px;
                font-family: PingFang-SC-Bold;
                font-size: 26px;
                color: #FFFFFF;
                text-shadow: 0 2px 4px #453893;
                padding-left: 65px;
            } 
            i.el-collapse-item__header__arrow{
                float: right;
                margin-top: 23px;
                font-size: 26px;
                margin-right: 40px;
                transform: rotate(90deg);
            }
            .el-collapse-item__wrap{
                width: 1028px;
                margin: 0 auto;
                position: relative;
                top: -16px;
                border: 6px solid #6323B7;
                border-radius: 8px;
                .el-collapse-item__content{
                    padding: 30px 30px 15px;
                    font-family: PingFangSC-Regular;
                    font-size: 20px;
                    color: #818181;
                    line-height: 38px;
                    text-align: justify;
                    div{
                        margin-bottom: 10px;
                        color: #666;
                        em{
                            color: #999;
                        }
                    }
                    div.mt{
                        text-indent: 2em;
                    }
                }
            }
        }
        .el-collapse-item.is-active>.el-collapse-item__header .el-collapse-item__header__arrow{
            transform: rotate(-90deg);
        }
    }
    #enrol .enrol .selected .collapse p em{
        color: #999;
    } 
    #vote .explain em{
        color: #FF5B4C;
    }
    #vote .explain p{
        margin-bottom: 10px;
        text-indent: 2em;
    }
</style>
