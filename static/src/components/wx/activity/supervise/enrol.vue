<template>
    <div id="enrol">
        <div class="navBar" :class="{active: TabUrl == 2, active1: TabUrl == 3, active2: TabUrl == 4}">
            <div class="nav" :class="{acc: v == 4}" v-for="v in 4" @click="navBar(v)"></div>
        </div>

        <div class="shareBtn" :class="'str'+activityStage" @click="toShare"></div>
        <!-- 报名阶段 -->
        <!-- <div class="none"></div> -->
        <div class="enrol" v-if='TabUrl == 1'>

            <div class="btn" :class="{active: isApply == 1}" @click="toInfo" v-if="activityStage == 1"></div>
            <div class="btn over" v-if="activityStage > 1"></div>

            <div class="selected">
                <div class="collapse" v-for="(v, i) in QA">
                    <h1 @click="popo(i)">{{v[0]}}
                        <i class="iconfont" v-if="detail == i">&#xe61d;</i>
                        <i class="iconfont" v-else>&#xe600;</i>
                    </h1>
                    <p ref="conten" v-show="detail == i" v-for="(item, index) in v" :class="{mt: index == 1}" v-if="index>0" v-html="item"></p>
                </div>
            </div> 
        </div>
        
        <!-- 投票阶段 -->
        <vote v-else-if="TabUrl == 2"></vote>
        <!-- 公布结果 -->
        <result v-else-if="TabUrl == 3"></result>
        <!-- 正式成立 -->
        <achieve v-else-if="TabUrl == 4"></achieve>
        <!-- 分享蔗罩 -->
        <div @click="showLayer = false" v-if="showLayer" v-layer class="shareLayer">
    	    <img :src="shareImg" alt="">
    	</div>
    </div>
</template>

<script>
	import wxToast from '../../../../common/wx/wxToast';
    import wxShare from '../../../../common/wx/wxShare';   // 与app交互
    import vote from './vote'     // 投票阶段
    import result from './result'     // 公布结果
    import achieve from './achieve'  // 正式成立
    export default {
        mixins: [wxShare,wxToast],
        data() {
            return {
                showLayer: false,
                shareObj: { //分享标题内容配置
					title: "快来助力，E都市钱包监督委员会即将成立！", //标题
				    desc: "你的权益，我的使命", // 内容
					link: global.host + "supervise/enrol", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                },
                shareImg:'https://aliyunsso.edspay.com/web/wx/activity/supervise/shareTips.png',
                TabUrl:1,
                detail: -1,
                isApply: false,
                period: 1,
                activityStage: 1,
                QA: [
                    ['什么是监督委员会','监督委员会，它可以对E都市钱包平台所发标的真实性进行独立的监督和质询。成立监督委员会目的是为了代表出借人对平台进行监察，保障出借人行使合理监督权，为更多的出借人传递平台真实信息，避免产生误解，为出借人创造一个良好的出借环境。'],
                    ['E都市钱包监督委员会组成','1、监督委员会成员共10名，会长、副会长各设1名，普通成员8名；','2、监督委员会成员任期为1年<em>（可申请连任）</em>，到期前一个月将进行下一届监督委员会成员选举。'],
                    ['E都市钱包监督委员会权益','1.我们将定期邀请监督委员会成员来访考察，了解资产状况及E都市钱包运营发展状况；','2.监督委员会提出的关于E都市钱包的建议或疑问，平台会在3个工作日内给予回复；','3.E友见面会、高管面对面、公司年会等活动，享有优先邀请权；','4. 监督委员会成员考察期间的往返差旅费全部由E都市钱包承担。'],
                    ['监督委员会成员责任及义务','1.监督委员会会长应每季度至少一次安排成员去实地考察E都市钱包运营场所，可查平台资料真伪、标的真实性、财务状况等，以便多角度更好的了解E都市钱包；<em>（考察情况可以文字、图片或音频等形式发布在官方微信群和QQ群中，客观反馈给其他E友）</em>','2.监督委员会应及时处理其他E友的质询和疑义，并委派至少1位成员调查取证，独立负责给出调查结果，并将调查过程和结果公布于官方微信群和QQ群；<em>（为了保障E都市钱包数据及资料的保密性，监督委员会成员不得将E都市钱包的相关保密文件发给其他E友，非机密资料但涉及隐私请加注*号或隐藏，公布内容不得泄露平台商业秘密及个人隐私）</em>','3.监督委员会成员应客观真实反馈查验结果：不夸大、不掩饰、不诱导、不主观臆断，每次考察完毕后需填写评审报告，供广大出借人参考和查看；','4.监督委员会成员需和E都市钱包签订保密合同，不得透露除验证真伪外任何涉及E都市钱包经营机密及借贷双方的任何信息，并约定不得在将来开创或加入P2P网贷平台，以保障E都市钱包的权益。'],
                    ['评选规则','本次监督委员会选举按照满分10分的评分制进行评选，以最终得分确定入选的10名成员。','一、初选面试环节占比50%<em>（满分5分）</em>','此环节将根据报名用户出借年限、在投金额、累计出借金额、行业知识储备、平台产品熟悉度、独立撰写报告能力等维度进行综合打分，采取电话面试、视频面试或受邀至公司面谈的形式，最终确定进入投票阶段的候选人。','二、投票环节的票数占比50%<em>（满分5分）</em>','通过初选面试环节的用户将晋级到投票环节，根据最终票数确定用户本轮的得分。','例：若本次投票总票数为5000，张三得到1200票，参与初选面试成绩为4分，则张三的最终得分为：（1200 /5000）*5 + 4=5.2分']
                ],
            }
        },
        methods: {
            gitData(){
                this.getNotlogData('/activity/candidateUser/getTime',(res) =>{
                    console.log(res)
                    if(res.resCode){
                        this.activityStage = res.resData.activityStage;
                        this.isApply = res.resData.isApply;
                        this.period = res.resData.period;
                        if(this.activityStage == 1){
                            this.TabUrl = 1;
                            this.shareObj.title = '快来报名，E都市钱包监督委员会即将成立！';
                            this.shareImg = 'https://aliyunsso.edspay.com/web/wx/activity/supervise/shareTips1.png'
                        }else if(this.activityStage == 2){
                            this.TabUrl = 2;
                            this.shareObj.title = '快来助力，E都市钱包监督委员会即将成立！';
                            this.shareImg = 'https://aliyunsso.edspay.com/web/wx/activity/supervise/shareTips2.png'
                        }else if(this.activityStage == 3){
                            this.TabUrl = 4;
                            this.shareObj.title = '快来关注，E委会正式成立！';
                            this.shareImg = 'https://aliyunsso.edspay.com/web/wx/activity/supervise/shareTips6.png'
                        }else if(this.activityStage == 4){
                            this.TabUrl = 1;
                            this.shareObj.title = '快来关注，E都市钱包监督委员会即将成立！';
                            this.shareImg = 'https://aliyunsso.edspay.com/web/wx/activity/supervise/shareTips4.png'
                        }else if(this.activityStage == 5){
                            this.TabUrl = 2;
                            this.shareObj.title = '快来关注，E都市钱包监督委员会即将成立！';
                            this.shareImg = 'https://aliyunsso.edspay.com/web/wx/activity/supervise/shareTips5.png'
                        }else{
                            this.TabUrl = 2;
                        }
                        this.getWxShareData(this.shareObj); //分享调用
                    }
                },{},1)
            },
            navBar(i){
                if(this.activityStage == 1 || this.activityStage == 4){
                    return
                }else if(this.activityStage == 2 || this.activityStage == 5){
                    i < 3 ? this.TabUrl = i : ''
                }else if(this.activityStage == 3){
                    this.TabUrl = i
                }
            },
            toShare(){
                if(this.osType){
    				this.PassValue(this.appShare);
    			}else{
    				this.showLayer = true;
    			}
            },
            toInfo(){
                if(!this.hasLogin){
                    this.toLogin()
                    return
                }
                this.appRouter('/supervise/enrol/info',{isApply: this.isApply, period: this.period})
            },
            popo(i){
                this.detail == i ? this.detail = -1 : this.detail = i
            },
        },
        activated(){
            this.gitData()
            document.title = 'E都市钱包监督委员会';
            this.PassValue('NavWhite_E都市钱包监督委员会');
        },
        created: function() {
            // this.PassValue('NavWhite_E都市钱包监督委员会');
            // this.gitData()
        },
        mounted: function() {
            
        },
        components: {
            vote,
            result,
            achieve
        }
   }
</script>

<style lang="scss" scoped>
    #enrol{
        width: 100%;
        .navBar{
            width: 100%;
            height: 1.253333rem;
            position: fixed;
            top: 0;
            z-index: 9;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/wx_topTab1.png?v=1.1) center center no-repeat;
            background-size: 100% 1.253333rem;
            .nav{
                width: 2.411111rem;
                height: 100%;
                float: left;
            }
            .nav:nth-child(1){
                 margin-right: .39rem;
            }
            .nav:nth-child(2){
                width: 2.353333rem;
            }
            .nav:nth-child(3){
                width: 2.487777rem;
            }
            .nav:nth-child(4){
                width: 2.355555rem;
            }
            .nav.acc{
                margin-right: 0;
            }
        }
        .navBar.active{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/wx_topTab2.png?v=1.1) center center no-repeat;
            background-size: 100% 1.253333rem;
        }
        .navBar.active1{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/wx_topTab3.png?v=1.1) center center no-repeat;
            background-size: 100% 1.253333rem;
        }
        .navBar.active2{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/wx_topTab4.png?v=1.1) center center no-repeat;
            background-size: 100% 1.253333rem;
        }
        .shareBtn{
                width: 1.773333rem;
                height: 1.6rem;
                position: fixed;
                top: 10rem;
                right: 0;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/sharebtn1.png) center center no-repeat;
                background-size: 100% 100%;
                z-index: 99;
            }
            .shareBtn.str2{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/sharebtn2.png) center center no-repeat;
                background-size: 100% 100%;
            }
            .shareBtn.str3{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/sharebtn3.png) center center no-repeat;
                background-size: 100% 100%;
            }
            .shareBtn.str4, .shareBtn.str5{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/sharebtn4.png) center center no-repeat;
                background-size: 100% 100%;
            }
        .enrol{
            width: 100%;
            min-height: 15rem;
            overflow: hidden;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/superviseBg.png?v=1.0) top left no-repeat;
            background-size: 100% 35.453333rem;
            .btn{
                width: 7.96rem;
                height: 1.72rem;
                position: fixed;
                bottom: .533333rem;
                right: 50%;
                margin-right: -3.98rem;
                z-index: 99;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomBtn1.png) center center no-repeat;
                background-size: 100% 100%;
            }
            .btn.active{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomBtn2.png) center center no-repeat;
                background-size: 100% 100%;
            }
            .btn.over{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomBtn3.png) center center no-repeat;
                background-size: 100% 100%;
            }
            .selected{
                margin-top: 12.586667rem;
                overflow: hidden;
                padding-bottom: 2.8rem;
                .collapse{
                    width: 9rem;
                    min-height: 1rem;
                    margin: 0 auto;
                    position: relative;
                    border-radius: .106667rem;
                    border: .08rem solid #007F98;
                    background: #fff;
                    margin-bottom: .2rem;
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
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/listGg.png) center center no-repeat;
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
                .collapse.active{
                    border: .08rem solid #02DBC0;
                }
            }
        }
        .shareLayer{
    		img{
                height: 5.013333rem;
                width:100%;
            }
    	}
    }
</style>
<style>
    #enrol .enrol .selected .collapse p em{
        color: #999;
    }
</style>

