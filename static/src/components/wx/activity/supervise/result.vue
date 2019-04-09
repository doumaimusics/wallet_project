<!-- 公布结果WX -->
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
            <div class="collapse" v-for="(v, i) in resultQA">
                <h1 @click="popo(i)">{{v[0]}}
                    <i class="iconfont" v-if="detail == i">&#xe61d;</i>
                    <i class="iconfont" v-else>&#xe600;</i>
                </h1>
                <p ref="conten" v-show="detail == i" v-for="(item, index) in v" :class="{mt: index == 1}" v-if="index>0" v-html="item"></p>
            </div>
        </div>
        <!-- 获取候选人简绍 -->
        <mt-popup v-model="candidateUser"  position="bottom" :closeOnClickModal="true">
            <div class="popupCenTop bdr-b">
                <img :src="detailed.imageUrl?detailed.imageUrl:'https://aliyunsso.edspay.com/web/wx/account/head.png'" alt="">
                <div class="proe">
                    <p class="name">{{detailed.realName}}</p>
                    <p class="city">{{detailed.province}}<em></em>{{detailed.city}}</p>
                </div>
                <div class="voteR">
                    <p class="voteNumber">共获得<em>{{detailed.voteNumber?detailed.voteNumber:0}}</em>票</p>
                    <p class="btn" @click="candidateUser = false">关闭简介</p>
                </div>
            </div>
            <div class="photoUrl" ref="scroollT">
                <img :src="detailed.photoUrl" alt="">
                <div class="scoreBg"><em>{{detailed.sunNumber?detailed.sunNumber:0}}</em></div>
                <div class="introduction" v-html="introduction"></div>
            </div>
        </mt-popup>
   </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';   // 与app交互
    import { Toast, Popup} from 'mint-ui';
    export default {
        mixins: [wxToapp],
        data() {
            return {
                candidateUser: false,    // 获取成员简绍开关
                detailed:'',
                resultQA: [['E都市钱包监督委员会权益','1.我们将定期邀请监督委员会成员来访考察，了解资产状况及E都市钱包运营发展状况；','2.监督委员会提出的关于E都市钱包的建议或疑问，平台会在3个工作日内给予回复；','3.E友见面会、高管面对面、公司年会等活动，享有优先邀请权；','4. 监督委员会成员考察期间的往返差旅费全部由E都市钱包承担。'],['监督委员会成员责任及义务','1.监督委员会会长应每季度至少一次安排成员去实地考察E都市钱包运营场所，可查平台资料真伪、标的真实性、财务状况等，以便多角度更好的了解E都市钱包；<em>（考察情况可以文字、图片或音频等形式发布在官方微信群和QQ群中，客观反馈给其他E友）</em>','2.监督委员会应及时处理其他E友的质询和疑义，并委派至少1位成员调查取证，独立负责给出调查结果，并将调查过程和结果公布于官方微信群和QQ群；<em>（为了保障E都市钱包数据及资料的保密性，监督委员会成员不得将E都市钱包的相关保密文件发给其他E友，非机密资料但涉及隐私请加注*号或隐藏，公布内容不得泄露平台商业秘密及个人隐私）</em>','3.监督委员会成员应客观真实反馈查验结果：不夸大、不掩饰、不诱导、不主观臆断，每次考察完毕后需填写评审报告，供广大出借人参考和查看；','4.监督委员会成员需和E都市钱包签订保密合同，不得透露除验证真伪外任何涉及E都市钱包经营机密及借贷双方的任何信息，并约定不得在将来开创或加入P2P网贷平台，以保障E都市钱包的权益。']],
                detail: -1,
                getOverList: [],
                introduction: '',
            }
        },
        methods: {
            dataInfo(){
                this.getNotlogData('/activity/candidateUser/getOverList',(res) =>{
                    if(res.resCode){
                        this.getOverList = res.resData.list;
                    }
                },{},1)
            },
            popo(i){
                this.detail == i ? this.detail = -1 : this.detail = i
            },
            introductionBtn(n){
                this.introduction = '';
                this.getNotlogData('/activity/candidateUser/detailed',(res) =>{
                    if(res.resCode){
                        this.candidateUser = true
                        this.detailed = res.resData
                        setTimeout(() => {    
                            this.introduction = res.resData.introduction;
                        }, 100);
                    }
                },{id:n},1)
            },
        },
        created: function() {
            this.dataInfo()
        },
        mounted: function() {

        },
        components: {

        },
        watch: {
            'candidateUser'(val){
                if(val){
                    document.title = '成员简介';
                    this.PassValue('NavWhite_成员简介');
                }else{
                    document.title = 'E都市钱包监督委员会';
                    this.PassValue('NavWhite_E都市钱包监督委员会');
                }
            }
        }
   }
</script>

<style lang="scss" scoped>
    #Result{
        font-family: PingFang-SC-Medium;
        width: 100%;
        overflow: hidden;
        .mtContent{
            width: 100%;
            height: 46.093333rem;
            overflow: hidden;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/resultBg_new.png?v=1.1) top left no-repeat;
            background-color: #F7F0FF;
            background-size: 100%;
            padding-top: 12.146667rem;
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
                    height: 5.826667rem;
                    margin-bottom: .533333rem;
                    .imgBox{
                        height: 4.786667rem;
                        width: 4.266667rem;
                        position: relative;
                        background: #fff;
                        border-radius: .106667rem;
                        box-shadow: 0 9px 15px 0 #E5CFFF;
                        padding: .186667rem .186667rem 0;
                        margin-left: .133333rem;
                        img{
                            pointer-events: none; 
                            width: 3.893333rem;
                            height: 3.813333rem;
                        }
                        .introductionBtn{
                            width: 1.786667rem;
                            height: .453333rem;
                            position: absolute;
                            top: 3.466667rem;
                            left: 2.186667rem;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/introductionBtn1.png) top left no-repeat;
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
                            .voteNumber{
                                font-family: DIN-Bold;
                                font-size: .506667rem;
                                color: #FFA530 ;
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
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/vipBottomBg1.png) top left no-repeat;
                        background-size: 100%;
                        position: relative;
                        top: -0.133333rem;
                        padding-top: 0.133333rem;
                        .Score{
                            width: 100%;
                            height: 1.04rem;
                            line-height: 1.04rem;
                            text-align: center;
                            color: #fff;
                            font-size: .4rem;
                            font-family: PingFang-SC-Bold;
                            em{
                                font-family: DIN-Bold;
                                font-size: .533333rem;
                            }
                        }
                    }
                }
            }
        }
        .selected{
            overflow: hidden;
            padding-bottom: 1.8rem;
            width: 100%;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomStyle.png) bottom left no-repeat;
            background-color: #fff;
            background-size: 100% 3.173333rem;
            margin-top: -1.333333rem;
            .collapse{
                width: 9rem;
                min-height: 1rem;
                margin: .4rem auto 0;
                position: relative;
                border-radius: .106667rem;
                border: .08rem solid #537CFA;
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
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/resultListGg.png) center center no-repeat;
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
                }
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
                position: relative;
                width: 100%;
                height: 10.293333rem;
                padding:  0 .266667rem 0;
                overflow: hidden;
                overflow-y: auto;
                margin-bottom: 1.2rem;
                margin-top: 0;
                img{
                    width: 6.133333rem;
                    height: 6.133333rem;
                    margin: 0 auto;
                    pointer-events: none; 
                    display: block;
                    margin-bottom: .48rem; 
                    margin-top: .48rem; 
                }
                .scoreBg{
                    width: 2rem;
                    height: 1.08rem;
                    position: absolute;
                    top: .4rem;
                    left: 5.333333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/Score.png) top left no-repeat;
                    background-size: 100%;
                    text-align: center;
                    padding-top: .333333rem;
                    em{
                        width: 100%;
                        font-family: DIN-Bold;
                        line-height: .746667rem;
                        color: #725524;
                        font-size: .506667rem;
                        vertical-align: sub;
                    }
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
    #Result .selected .collapse p em{
        color: #999;
    } 
</style>