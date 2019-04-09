<template>
    <div id="register" :class={noBackground:noBack}>
        <enroll v-if='enroll==true' @enroll="enroll = $event" clarity=0.75></enroll>
        <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm">

            <!-- 输入手机号 -->
            <el-form-item prop="phone">
                <el-input type="text" v-model="ruleForm2.phone" placeholder="请输入您的常用手机号" class="phone longin"></el-input>
            </el-form-item>

            <!-- 图文验证码-->
            <el-form-item prop="validCode">
                <el-input type="text" v-model="ruleForm2.validCode" placeholder="请输入图文验证码" class="inputLeft validCode longin"></el-input>
                <el-button class="validCodeRight" @click="change()" id="codeImg"><img :src="codeImg" title="点击刷新" /></el-button>
            </el-form-item>

            <!-- 手机验证码-->
            <el-form-item prop="code">
                <el-input type="text" v-model="ruleForm2.code" placeholder="请输入手机验证码" class="inputLeft longin code"></el-input>
                <el-button @click="resetCode($event)" class="inputRight" id='mobilePhone'>获取验证码</el-button>
            </el-form-item>

            <!-- 输入密码-->
            <el-form-item prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" placeholder="请输入8-16位数字与字母组合" class="longin pass"></el-input>
            </el-form-item>

            <!-- 确定按钮-->
            <el-form-item>
                <el-button type="primary" @click="submitForm2('ruleForm2')" v-loading.body="loading">注册领红包</el-button>
            </el-form-item>

            <!-- 协议 -->
            <div class="xieyi">注册即视为同意
                <span @click="enroll=true">《E都市钱包用户注册协议》</span>
            </div>
        </el-form>
    </div>
</template>

<script>
import getData from '../../../common/router/getData.js'         // 获取图片验证码
import enroll from '../../pc/template/Protocol/enrollReg'  // 协议组件
export default {
    name: 'register',
    mixins: [getData],
    props: ['successUrl', 'ui', 'channel','isbackground','jumpUrl','channelData'],      // successUrl:注册成功以后到达的页面，ui:邀请人信息 source：注册埋点来源，channel: 注册渠道统计,isbackground:是否有背景,channelData:返利网信息
    data() {
        var checkPhone = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机号码不能为空'));
            }
            var rex = /^1\d{10}$/;
            rex.test(value) ? callback() : callback(new Error('非法手机号'));
        };
        var checkCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('手机验证码不能为空'));
            } else {
                callback();
            }
        };
        var checkPass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            }
            var pwdT = /^(?![^a-zA-Z]+$)(?!\D+$).{8,16}$/;
            pwdT.test(value) ? callback() : callback(new Error('密码格式错误'));
        };
        var checkValidCode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('图文验证码不能为空'));
            } else {
                callback()
            }
        }
        return {
            fanliData:{},//返利数据
            loading:false,
            enroll: false,
            noBack:false,
            ruleForm2: {  // 注册表单
                phone: '',
                code: '',
                pass: '',
                validCode: ''
            },
            rules2: {   //注册验证
                phone: [
                    { validator: checkPhone, trigger: 'blur' }
                ],
                code: [
                    { validator: checkCode, trigger: 'blur' }
                ],
                pass: [
                    { validator: checkPass, trigger: 'blur' }
                ],
                validCode: [
                    { validator: checkValidCode, trigger: 'blur' }
                ]
            },
            uuid: '',
            wdzjType: '',
        }
    },
    created () {
        this.isbackground=='no' ?this.noBack =  true : this.noBack = false
        console.log(this.channelData)
        if(!this.channelData){
            this.fanliData = {};
        }else{
            this.fanliData = this.channelData;
        }
    },
    methods: {
        resetCode(event) {    //获取手机验证码
            var v = event.target
            var _this = this
            var wait = 60
            function get_code_time(v) {
                if (wait == 0) {
                    v.classList.remove('disabled')
                    v.innerHTML = "重新发送";
                    wait = 60;
                    _this.change()
                } else {
                    v.classList.add('disabled')
                    v.innerHTML = "(" + wait + "s)后重发";
                    wait--;
                    setTimeout(function() {
                        get_code_time(v);
                    }, 1000)
                }
            }

            if (v.className == 'disabled') {
                this.$message({ message: '验证码已发送，请60s后再次获取', type: 'warning' });
            } else {
                var mobilePhone = _this.ruleForm2.phone;
                var validCode = _this.ruleForm2.validCode;
                var mobile = /^1\d{10}$/;
                if (mobilePhone != "" && mobile.test(mobilePhone)) {
                    if (validCode != null && validCode != "") {
                        this.$http.post(this.ajaxUrl.getUrl(1) + '/user/getPhoneCode', { mobilePhone: mobilePhone, validCode: validCode, captchaId: _this.captchaId, tokenId: _this.fingerprint,channel:this.channel }).then((data) => {  // 响应成功回调
                            if (data.body.resCode == 1) {
                                get_code_time(v)    //倒计时
                                _this.$message({ message: data.body.resMsg, type: 'success' });
                            } else {
                                _this.$message({ message: data.body.resMsg, type: 'warning' });
                            }
                        }, (response) => {
                            // 响应错误回调
                        });
                    } else {
                        _this.$message({ message: "请输入图片验证码", type: 'warning' });
                    }
                } else {
                    _this.$message({ message: "请输入手机号码", type: 'warning' });
                }
            }
        },
        submitForm2(formName) {   // 注册表单提交事件
            this.$refs[formName].validate((valid) => {
                let _this = this;
                // 新增网贷之家判断
				this.$route.query.uuid ? this.uuid = this.$route.query.uuid : this.uuid = ''
				this.$route.query.wdzjType ? this.wdzjType = this.$route.query.wdzjType : this.wdzjType = ''
                let jsonData = {};
                if(this.fanliData.tc){
                    jsonData = {
                        code: _this.ruleForm2.code,
                        pwd: _this.ruleForm2.pass,
                        tokenId: _this.fingerprint,
                        source: 4,
                        uuid: this.uuid,
                        wdzjType:this.wdzjType,
                        uid:this.fanliData.uid,target_url:this.fanliData.target_url,tc:this.fanliData.tc,tracking_id:this.fanliData.tracking_id,action_time:this.fanliData.action_time,flCode:this.fanliData.code
                    }
                }else{
                    jsonData = {
                        code: _this.ruleForm2.code,
                        pwd: _this.ruleForm2.pass,
                        tokenId: _this.fingerprint,
                        source: 4,
                        uuid: this.uuid,
                        wdzjType:this.wdzjType,
                    }
                }
                _this.ui ? jsonData.inviteUserCode = _this.ui : jsonData.inviteUserCode = ""          // 邀请信息
                _this.channel ? jsonData.channel = _this.channel : jsonData.channel = ""          // 渠道统计
                if (valid) {
                    this.loading = true
                    _this.$http.post(_this.ajaxUrl.getUrl(1) + "/user/doRegister", jsonData).then((res) => {
                        // 响应成功回调
                        if (res.body.resCode == 1) {
                            this.loading = false
                            this.$confirm('注册成功', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'success'
                            }).then(() => {
                                if (_this.successUrl) window.location.href = _this.successUrl
                                if (_this.jumpUrl) _this.$router.push(_this.jumpUrl)
                            }).catch(() => {});
                        } else {
                                this.loading = false 
                                _this.$message({ message: res.body.resMsg, type: 'warning' });
                        }
                        // if (res.body.resCode == 1) {
                        //     window.location.href = _this.successUrl
                        // }else{
                        //     _this.$message({message:res.body.resMsg,type: 'warning'});
                        // }
                    }, (response) => {
                        // 响应错误回调
                    });
                        
                } else {
                    return false;
                }
            });
        },
    },
    mounted: function() {
        this.change()
    },
    components: {
        'enroll': enroll
    }
}  
</script>

<style lang="scss">
.noBackground {
    background: none !important;
}
#register {
    background: url(https://aliyunsso.edspay.com/web/activity/register/Rectangle.png) no-repeat;
    background-size: 100% 100%;
    border-radius: 10px;
    width: 390px;
    height: 350px;
    margin: 0 auto;
    padding: 10px 30px;
    .el-form-item.is-error .el-input__inner,
    #headTable .el-form-item.is-error .el-textarea__inner {
        border-color: #bfcbd9;
    }
    .longin input {
        background: url(https://aliyunsso.edspay.com/web/activity/register/icon_shouji_normalp.png) no-repeat 20px center;
        background-size: 30px 30px;
    }
    .longin.validCode input {
        background: url(https://aliyunsso.edspay.com/web/activity/register/icon_yanzheng_normalp.png) no-repeat 20px center;
    }
    .longin.pass input {
        background: url(https://aliyunsso.edspay.com/web/activity/register/icon_duanxing_normalp.png) no-repeat 20px center;
    }
    .longin.code input {
        background: url(https://aliyunsso.edspay.com/web/activity/register/icon_mima_normalp.png) no-repeat 20px center;
    }
    .el-input__inner {
        height: 51px;
        font-size: 14px;
        line-height: 51px;
        border: 0 !important;
        color: #000;
        padding-left: 70px;
    }
    .el-input {
        color: #000;
        border-radius: 4px;
        background: #fff;
    }
    #codeImg,#mobilePhone {
        position: absolute;
        top: 0;
        right: 0;
        width: 98px;
        height: 40px;
        display: block;
        border-radius: 0;
        border: 0;
        padding: 0;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        border-left: 1px solid #e7e7e7;
        color: #7ac5ff;
        margin-top: 5px;
    }
    #codeImg {
        border: 0;
        img {
            width: 98px;
            height: 40px;
        }
    }
    .el-form-item {
        margin-bottom: 15px;
    }
    .el-form-item:nth-child(4) {
        margin-bottom: 10px;
    }
    .el-button--primary {
        display: block;
        margin: 0 auto;
        width: 264px;
        height: 40px;
        text-align: center;
        font-size: 24px;
        color: #fff;
        letter-spacing: 6px;
        border: 1px solid #fff;
        outline: none;
        border-radius: 2px;
        margin: 5px auto;
        cursor: pointer;
        background: transparent;
        font-family: "Microsoft YaHei";
        padding: 0;
    }
    .xieyi {
        margin-top: -15px;
        line-height: 25px;
        margin-left: 30px;
        font-size: 14px;
        color: #fff;
        span {
            cursor: pointer;
        }
    }
    .el-form-item__error {
        color: #ff4949;
        font-size: 12px;
        padding-top: 0;
        position: absolute;
        top: 20%;
        left: -45%;
        width: 126px;
        height: 30px;
        background: #000;
        border-radius: 4px;
        text-align: center;
        line-height: 30px;
    }
    .el-form-item__error:after {
        display: table;
        content: "";
        position: absolute;
        top: 41%;
        right: -5px;
        width: 10px;
        height: 10px;
        background: #000;
        transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
        -o-transform: rotate(45deg);
    }
}
</style>