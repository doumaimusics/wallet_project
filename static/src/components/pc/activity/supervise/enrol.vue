<template>
    <div id="enrol">
        <div v-title>E都市钱包监督委员会</div>
        <div class="navBar" :class="{active: TabUrl == 2, active1: TabUrl == 3, active2: TabUrl == 4}">
            <div class="nav" :class="{acc: v == 4}" v-for="v in 4" @click="navBar(v)"></div>
        </div>
        <!-- 报名阶段 -->
        <!-- <div class="none"></div> -->
        <div class="enrol" v-if='TabUrl == 1'>

            <div class="selected">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="(v, i) in QA" :title="v[0]" :name="i">
                        <div v-for="(item, index) in v" v-if="index>0" v-html="item"></div>
                    </el-collapse-item>
                </el-collapse>
            </div> 

            <div class="btn" :class="{active: isApply == 1}" @click="toInfo" v-if="activityStage == 1"></div>
            <div class="btn over" v-if="activityStage > 1"></div>
        </div>
        
        <!-- 投票阶段 -->
        <vote v-else-if="TabUrl == 2"></vote>
        <!-- 公布结果 -->
        <result v-else-if="TabUrl == 3"></result>
        <!-- 正式成立 -->
        <achieve v-else-if="TabUrl == 4"></achieve>
        <!-- 报名输入框 -->
        <div v-layer v-if="toForm"></div>
        <div class="from" v-if="toForm">
            <i class="del iconfont" @click="toForm = false">&#xe630;</i>
            <!-- <div style="margin: 20px;"></div> -->
            <el-form :label-position="labelPosition" label-width="80px">
                <el-form-item label="姓名：">
                    <el-input v-model="name" v-if="nameStr" :disabled="true"></el-input>
                    <el-input v-model="name" v-else placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号：">
                    <el-input v-model="mobile" @input="checkMoney" :maxlength="11" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="省、市：">
                    <v-distpicker :province="province" :city="city" hide-area @selected="onSelected" @province='onProvince'></v-distpicker>
                </el-form-item>
                <el-form-item class="block" label="自我介绍：">
                    <el-input type="textarea" v-model="introduction" placeholder="包括自我履历、出借经历、出借年限、对E都市钱包的看法、对行业的看法等内容!（请输入30字以上）！"></el-input>
                </el-form-item>
                <el-form-item class="block imgs" label="上传照片：">
                    <div class="imgBox">
                        <div class="img1">
                            <input type="file" id="upload" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" capture="camera" style="opacity:0;" @change="FileChange">
                            <img v-if="userImg" :src="userImg">
                            <p v-if="userImg">重新上传</p>
                        </div>
                        <div class="img1 bor" v-if="!userImg" @click="enlarge(1)" >
                            <img :src="'https://aliyunsso.edspay.com/web/wx/activity/supervise/examples.png?v=1'" alt="">
                            <p class="shili">示例图片</p>
                        </div>
                        <div @click="enlarge(2)" v-else class="yulan">预览图片</div>
                    </div>
                <div class="tips">* 尽量上传正式的上半身照片</div>
                </el-form-item>
                <div class="amplified" :class="{active:ifSelectTime}" v-if="layerImg">
                    <img :src="userImg?userImg:'https://aliyunsso.edspay.com/web/wx/activity/supervise/examples.png?v=1'" alt="">
                    <div class="close" @click="layerImg = false">关闭预览</div>
                </div>
            </el-form>
            <div class="sumibBtn" @click="submitForm">提交</div>
        </div>
    </div>
</template>

<script>
    import lrz from 'lrz'
    import result from './result'     // 公布结果
    import vote from './vote'     // 投票阶段
    import achieve from './achieve'  // 正式成立
    import VDistpicker from 'v-distpicker';//省市区组件
    export default {
        data() {
            return {
                toForm: false,
                activeName: '1',
                TabUrl:1,
                detail: 0,
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
                labelPosition: 'left',
                name:'',
                mobile:'',
                userImg:'',
                introduction:'',
                ifSelectTime:false,
                province: '',
                city: '市区',
                layerImg: false,
                nameStr: false,
                repeat: true,
            }
        },
        methods: {
            checkMoney(e){
                this.$nextTick(() => {
                    this.mobile =  e.replace(/^[0]+[0-9]*$/gi,"");
                })
            },
            gitData(){
                global.http.investPost(this, "/activity/candidateUser/getTime", {}, data => {
                    if(data.body.resCode == 1){
                        this.activityStage = data.body.resData.activityStage;
                        this.isApply = data.body.resData.isApply;
                        this.period = data.body.resData.period;
                        if(this.activityStage == 1 || this.activityStage == 4){
                            this.TabUrl = 1;
                        }else if(this.activityStage == 2 || this.activityStage == 5){
                            this.TabUrl = 2;
                        }else if(this.activityStage == 3){
                            this.TabUrl = 4;
                        }
                    }else{
                        this.notify(data.body.resMsg, 2);
                    }
                })
            },
            submitForm(){
                if(!this.repeat){
                    return;
                }
                if(this.name == ''){
                     this.notify('请填写姓名！',2);
                    return
                }
                if(this.mobile == ''){
                     this.notify('请填写手机号码！',2);
                    return
                }
                if(this.regCheck(this.mobile,'请填写正确手机号！','mobileReg',1)) return;
                if(!this.province || !this.city){
                    this.notify('请选择省、市！', 2);
                    return
                }
                if(!this.introduction){
                     this.notify('请填写自我介绍！', 2);
                    return
                }
                let delStr = this.introduction.replace(/\s+/g, "");  // 去除所有空格
                if(delStr.length < 30){
                     this.notify('自我介绍请至少填写30个字！', 2);
                    return
                }
                if(!this.userImg){
                     this.notify('请上传图片！', 2);
                    return
                }
                this.repeat = false;
                let isUpdateToAdd;  // 1:添加  2:修改
                this.isApply == 1 ? isUpdateToAdd = 2 : isUpdateToAdd = 1;
                global.http.investPost(this, "/activity/candidateUser/submit", {
                    photoUrl: this.userImg, 
                    realName: this.name, 
                    province: this.province, 
                    city: this.city, 
                    introduction: this.introduction, 
                    period: this.period, 
                    isUpdateToAdd: isUpdateToAdd, 
                    mobilePhone: this.mobile
                }, data => {
                    if(data.body.resCode == 1 && data.body.resData.status == 1){
                        this.notify(data.body.resData.popUpWriter, 1);
                        setTimeout(() => {
                            this.toForm = false;
                            this.repeat = true;
                            this.gitData();
                        }, 3000);
                    }else{
                        this.repeat = true;
                        this.notify(data.body.resMsg, 2);
                    }
                })
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
            popo(i){
                this.detail == i ? this.detail = -1 : this.detail = i
            },
            toInfo(){   // 打开输入框
                if (!this.getCookie('token')) {
                    this.$router.push('/login');
                    return;
                }
                let isUpdateToAdd;  // 1:添加  2:修改
                this.isApply == 1 ? isUpdateToAdd = 2 : isUpdateToAdd = 1;
                global.http.post(this, "/activity/candidateUser/getByAddOrUpdate", {isUpdateToAdd: isUpdateToAdd}, data => {
                    if(data.body.resCode == 1){
                        let res = data.body.resData
                        this.toForm = true;
                        this.name = res.realName;
                        res.isAccount == 1 ? this.nameStr = true : this.nameStr = false
                        this.mobile = res.mobilePhone;
                        this.province = res.province;
                        this.city = res.city;
                        this.userImg = res.photoUrl;
                        this.introduction =res.introduction;
                    }else{
                        this.notify(data.body.resMsg, 2);
                    }
                })
            },
            // 放大照片
            enlarge(n){
                n==1 ? this.ifSelectTime = true : this.ifSelectTime = false
                this.layerImg = true
            },
            FileChange(e){
                var files = e.target.files || e.dataTransfer.files;
				lrz(files[0], { width: 480 }).then((rst) => {
                    this.userImg = rst.base64
				}).always(function() {
				    // 清空文件上传控件的值
				    e.target.value = null;
				});
            },
            onProvince(data){  // 防护用户选择地址后又取消
                if(data.value == '省'){
                    this.province = ''
                }else{
                    this.city = ''
                }
            },
            //选择地址
			onSelected(data){
				if(data){
                    data.province.value == '省' ? this.province = '' : this.province = data.province.value;
                    data.city.value == '市' ? this.city = '' : this.city = data.city.value;
				}
            },
        },
        created: function() {
            this.gitData()
        },
        mounted: function() {

        },
        components: {
            result,
            vote,
            VDistpicker,
            achieve
        }
   }
</script>

<style lang="scss" scoped>
    #enrol{
        font-family: PingFang-SC-Medium;
        width: 1200px;
        margin: 20px auto 35px;
        position: relative;
        .navBar{
            cursor: pointer;
            position: absolute;
            top: 0;
            z-index: 2;
            width: 100%;
            height: 91px;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/pc_topTab1.png?v=1.0) center center no-repeat;
            background-size: 100% 100%;
            .nav{
                width: 295px;
                height: 100%;
                float: left;
            }
            .nav:nth-child(1){
               margin-right: 32px;
               
            }
            .nav:nth-child(2){
                width: 292px;
            }
            .nav:nth-child(3){
                width: 290px;
            }
            .nav:nth-child(4){
                width: 285px;
            }
            .nav.acc{
                margin-right: 0;
            }
        }
        .navBar.active{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/pc_topTab2.png?v=1.0) center center no-repeat;
            background-size: 100% 100%;
        }
        .navBar.active1{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/pc_topTab3.png?v=1.0) center center no-repeat;
            background-size: 100% 100%;
        }
        .navBar.active2{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/pc_topTab4.png?v=1.0) center center no-repeat;
            background-size: 100% 100%;
        }
        .enrol{
            width: 100%;
            min-height: 1500px;
            overflow: hidden;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/superviseBgPc.png) top left no-repeat;
            background-size: 100% 2520px;
            .selected{
                margin-top: 924px;
                overflow: hidden;
            }
            .btn{
                cursor: pointer;
                width: 597px;
                height: 129px;
                margin: 80px auto 90px;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomBtnPc1.png) center center no-repeat;
                background-size: 100% 100%;
            }
            .btn.active{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomBtnPc2.png) center center no-repeat;
                background-size: 100% 100%;
            }
            .btn.over{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/bottomBtnPc3.png) center center no-repeat;
                background-size: 100% 100%;
            }
        }
        .from{
            width: 560px;
            height: 630px;
            border-radius: 6px;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            background: #fff;
            z-index: 99999;
            padding: 32px 35px 0;
            i.del{
                cursor: pointer;
                width: 30px;
                height: 30px;
                position: absolute;
                top: -30px;
                right: -45px;
                font-size: 30px;
                color: #fff;
            }
            .sumibBtn{
                cursor: pointer;
                width: 250px;
                height: 42px;
                background: #FF6645;
                border-radius: 21px;
                font-family: PingFang-SC-Bold;
                font-size: 20px;
                color: #FFFFFF;
                text-align: center;
                line-height: 42px;
                margin: 0 auto;
            }
        }
    }
</style>

<style lang="scss">
    #enrol{
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
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/pcListBg.png) center center no-repeat;
                background-size: 100% 100%;
                border: none;
                line-height: 75px;
                font-family: PingFang-SC-Bold;
                font-size: 26px;
                color: #FFFFFF;
                text-shadow: 0 2px 4px #0083B0;
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
                border: 6px solid #007F98;
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
        .el-form{
            position: relative;
            .amplified{
                width: 294px;
                height: 312px;
                background: #FFFFFF;
                border-radius: 6px;
                padding:6px;
                position: absolute;
                top: 158px;
                left: 120px;
                box-shadow: 0px 0px 10px 0 #979797;
                img{
                    width: 282px;
                    height: 300px;
                }
                .close{
                    opacity: 0.25;
                    background: #000000;
                    border-radius: 14.63px;
                    width: 100px;
                    height: 28px;
                    text-align: center;
                    line-height: 28px;
                    font-size: 14px;
                    color: #FFFFFF;
                    position: absolute;
                    bottom: 12px;
                    right: 12px;
                }
            }
            .amplified.active{
                left: 250px;
            }
            .el-form-item{
                margin-bottom: 14px;
                .el-form-item__label{
                    width: 90px !important;
                }
                .el-form-item__content{
                    margin-left: 90px !important;
                    width: 398px;
                    .el-input.is-disabled .el-input__inner{
                        background: none;
                        cursor: text;
                    }
                    .el-input__inner{
                        border: 1px solid #E5E5E5;
                        font-size: 16px;
                        color: #333;
                        padding-left:10px;
                    }
                    .el-textarea{
                        width: 486px;
                        .el-textarea__inner{
                            height: 130px;
                            background: #F8F8F8;
                            font-size: 14px;
                            color: #333;
                            line-height: 20px;
                            border: 1px solid #E5E5E5;
                        }
                        .el-textarea__inner:hover {
                            border-color: #E5E5E5;
                        }
                        .el-textarea__inner:focus {
                            outline: 0;
                            border-color: #E5E5E5;
                        } 
                    }
                    input::-webkit-input-placeholder {
                        font-family: PingFangSC-Regular;
                        font-size: 16px;
                        color: #999;
                        line-height: 36px;
                    }
                    textarea::-webkit-input-placeholder{
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #999;
                        line-height: 20px;
                    }
                }
            }
            .el-form-item.block {
                width: 486px;
                .el-form-item__label{
                    width: 100% !important;
                    display: block;
                } 
                .el-form-item__content{
                    width: 486px;
                    margin-left: 0 !important;
                    .imgBox{
                        width: 100%;
                        height: 100px;
                        margin-bottom: 10px;
                        .img1{
                            width: 100px;
                            height: 100px;
                            float: left;
                            position: relative;
                            margin-right: 20px;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/upload.png)center center;
                            background-size: 100% 100%;
                            input{
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 4;
                                cursor: pointer;
                            }
                            img{
                                cursor: pointer;
                                width: 100%;
                                height: 100%;
                                position: absolute;
                                top: 0;
                                left: 0;
                                z-index: 2;
                            }
                            p{
                                width: 100%;
                                height: 26px;
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                z-index: 2; 
                                line-height: 26px;
                                font-family: PingFangSC-Medium;
                                font-size: 16px;
                                color: #FFFFFF;
                                opacity: 0.7;
                                background: #4A4A4A;
                                text-align: center;
                            }
                            p.shili{
                                background: #ff5228;
                                opacity: 0.4;
                            }
                        }
                        img{
                            // cursor: pointer;
                            float: left;
                            width: 100px;
                            height: 100px;
                        }
                        .yulan{
                            cursor: pointer;
                            font-family: PingFang-SC-Medium;
                            font-size: 16px;
                            color: #FF6645;
                            float: left;
                            line-height: 22px;
                            margin-top: 77px;
                        }
                        .bor{
                            border: 1px solid #e5e5e5;
                        }
                    }
                    
                    .tips{
                        // float: left;
                        width: 100%;
                        font-size: 14px;
                        color: #999999;
                        line-height: 20px;
                        margin-bottom: 14px;
                    }
                }
            }
            .el-form-item.block.imgs{
                .el-form-item__content{
                    width: 486px;
                    margin-left: 0 !important;
                    float: left;
                    }
            }
            
            .distpicker-address-wrapper select{
                font-size: 16px;
                color: #333;
                border: 1px solid #E5E5E5;
                border-radius: 4px;
                padding: 0;
                min-width: 150px;
            }
            .distpicker-address-wrapper select:focus{
                border: 1px solid #E5E5E5;
                outline: #E5E5E5 auto 1px;
                border-radius: 8px;
            }
        }
        
    }
    .el-notification{
        z-index: 99999 !important;
    }
</style>