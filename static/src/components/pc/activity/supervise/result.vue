<!-- 公布结果PC -->
<template>
   <div id="Result">
        <div class="mtContent">
            <ul class="logChild" v-if="getOverList.length">
                <li v-for="(item, index) in getOverList" class="list">
                    <div class="itemTop">
                        <div class="imgBox">
                            <img :src="item.photoUrl" alt="">
                            <div class="introductionBtn" @click="introductionBtn(item.id)"></div>
                            <div class="namebox">
                                <div class="name fl">{{item.realName}}</div>
                                <div class="voteNumber fr">{{item.voteNumber?item.voteNumber:0}}<em>票</em></div>
                            </div>
                        </div>
                        <div class="voteBtn">
                            <div class="Score">评选得分：<em>{{item.sunNumber}}</em></div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        <div class="selected">
            <el-collapse v-model="activeName" accordion>
                <el-collapse-item v-for="(v, i) in resultQA" :title="v[0]" :name="i">
                    <div v-for="(item, index) in v" v-if="index>0" v-html="item"></div>
                </el-collapse-item>
            </el-collapse>
        </div>

        <!-- 获取候选人简绍 -->
        <div v-if="candidateUser" v-layer @click="candidateUser = false"></div>
        <div v-if="candidateUser" class="mintPopup">
            <div class="popupCenTop bdr-b">
                <img :src="detailed.imageUrl?detailed.imageUrl:'https://aliyunsso.edspay.com/web/wx/account/head.png'" alt="">
                <div class="proe">
                    <p class="name">{{detailed.realName}}</p>
                    <p class="city">{{detailed.province}}<em></em>{{detailed.city}}</p>
                </div>
                <div class="voteR">
                    <p class="voteNumber">共获得{{detailed.voteNumber?detailed.voteNumber:0}}票</p>
                    <p class="score" @click="candidateUser = false">评选得分：<em>{{detailed.sunNumber}}</em></p>
                </div>
            </div>
            <div class="photoUrl">
                <img :src="detailed.photoUrl" alt="">
            </div>
            <div class="introduction" v-html="detailed.introduction"></div>
        </div> 
   </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: '1',
                candidateUser: false,    // 获取成员简绍开关
                detailed:'',
                resultQA: [['E都市钱包监督委员会权益','1.我们将定期邀请监督委员会成员来访考察，了解资产状况及E都市钱包运营发展状况；','2.监督委员会提出的关于E都市钱包的建议或疑问，平台会在3个工作日内给予回复；','3.E友见面会、高管面对面、公司年会等活动，享有优先邀请权；','4. 监督委员会成员考察期间的往返差旅费全部由E都市钱包承担。'],['监督委员会成员责任及义务','1.监督委员会会长应每季度至少一次安排成员去实地考察E都市钱包运营场所，可查平台资料真伪、标的真实性、财务状况等，以便多角度更好的了解E都市钱包；<em>（考察情况可以文字、图片或音频等形式发布在官方微信群和QQ群中，客观反馈给其他E友）</em>','2.监督委员会应及时处理其他E友的质询和疑义，并委派至少1位成员调查取证，独立负责给出调查结果，并将调查过程和结果公布于官方微信群和QQ群；<em>（为了保障E都市钱包数据及资料的保密性，监督委员会成员不得将E都市钱包的相关保密文件发给其他E友，非机密资料但涉及隐私请加注*号或隐藏，公布内容不得泄露平台商业秘密及个人隐私）</em>','3.监督委员会成员应客观真实反馈查验结果：不夸大、不掩饰、不诱导、不主观臆断，每次考察完毕后需填写评审报告，供广大出借人参考和查看；','4.监督委员会成员需和E都市钱包签订保密合同，不得透露除验证真伪外任何涉及E都市钱包经营机密及借贷双方的任何信息，并约定不得在将来开创或加入P2P网贷平台，以保障E都市钱包的权益。']],
                detail: -1,
                getOverList: [],
            }
        },
        methods: {
            dataInfo(){
                global.http.investPost(this,'/activity/candidateUser/getOverList',{}, data =>{
                    if(data.body.resCode == 1){
                        this.getOverList = data.body.resData.list;
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
        },
        created: function() {
            this.dataInfo()
        },
   }
</script>

<style lang="scss" scoped>
    #Result{
        font-family: PingFang-SC-Medium;
        width: 100%;
        overflow: hidden;
        .mtContent{
            width: 100%;
            height: 2075px;
            overflow: hidden;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/resultBgPc_new.png?v=1.1) top left no-repeat;
            background-color: #F7F0FF;
            background-size: 100%;
            padding-top: 925px;
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
                        img{
                            pointer-events: none; 
                            width: 210px;
                            height: 206px;
                        }
                        .introductionBtn{
                            width: 97px;
                            height: 25px;
                            position: absolute;
                            top: 186px;
                            left: 115px;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/introductionBtnPc1.png) top left no-repeat;
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
                            .voteNumber{
                                font-family: DIN-Bold;
                                font-size: 26px;
                                color: #FFA530;
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
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBottomBgPc1.png) top left no-repeat;
                        background-size: 100%;
                        position: relative;
                        top: -7px;
                        padding-top: 7px;
                        .Score{
                            width: 100%;
                            height: 58px;
                            line-height: 58px;
                            text-align: center;
                            color: #fff;
                            font-size: 20px;
                            font-family: PingFang-SC-Bold;
                            em{
                                font-family: DIN-Bold;
                                font-size: 28px;
                            }
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
        .selected{
            overflow: hidden;
            padding-bottom: 120px;
            width: 100%;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomStylePc.png) bottom left no-repeat;
            background-color: #fff;
            background-size: 100% 190px;
            margin-top: -1px;
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
                    height: 52px;
                    margin-top: 9px;
                    float: right;
                    .voteNumber{
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #666;
                        line-height: 20px;
                        text-align: right;
                    }
                    .score{
                        height: 32px;
                        font-size: 16px;
                        color: #333;
                        line-height: 32px;
                        text-align: center;
                        em{
                            font-family: PingFang-SC-Bold;
                            font-size: 18px;
                            color: #FF5B4C;
                        }
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
    #Result {    
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
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/resultListGgPc.png) center center no-repeat;
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
                border: 6px solid #537CFA;
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
                }
            }
        }
        .el-collapse-item.is-active>.el-collapse-item__header .el-collapse-item__header__arrow{
            transform: rotate(-90deg);
        }
        .selected .collapse p em{
            color: #999;
        }
    } 
</style>