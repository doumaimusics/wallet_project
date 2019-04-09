<template>
    <div id="authorized">
        <img src="https://aliyunsso.edspay.com/web/tzj/tzjBg.jpg" alt="">
        <div class="mobile"></div>
        <div class="car"></div>
        <div class="login">
            <div class="watermark"></div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <!--不可修改的手机号码-->
                <div id="phone">{{mobilePhone}}</div>
                <!-- 输入密码-->
                <el-form-item prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" placeholder="请输入8-16位数字与字母组合" class="longin pass"></el-input>
                    <i class="display" @click="passwordDisplay"></i>
                </el-form-item>

                <!-- 协议 -->
                <div class="xieyi">
                    <i class="iconfont" :class="{active:icon}" @click="icon = !icon">&#xe628;</i>
                </div>

                <!-- 确定按钮-->

                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')" id="sub"></el-button>
                </el-form-item>

                <!--忘记密码-->
                <div class="forget" @click="forget"></div>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var checkPass = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            }
            var pwdT = /^(?![^a-zA-Z]+$)(?!\D+$).{8,16}$/;
            pwdT.test(value) ? callback() : callback(new Error('密码格式错误'));
        }
        return {
            icon: true,
            mobilePhone: ' ',
            sid: '',
            loan_id:'',
            ruleForm: {  // 注册表单
                pass: ''
            },
            rules: {   //注册验证
                pass: [
                    { validator: checkPass, trigger: 'blur' }
                ]
            },
        }
    },
    methods: {
        forget() {
            this.$router.push('/wdty/authorized?pop=paw')
        },
        passwordDisplay() {
            if ($(".display").hasClass("active")) {
                $(".display").removeClass('active');
                $(".pass input").attr('type', 'password');
            } else {
                $(".display").addClass('active')
                $(".pass input").attr('type', 'text');
            }
        },
        submitForm(formName) {   // 注册表单提交事件
            this.$refs[formName].validate((valid) => {
                var _this = this;
                if (valid) {
                    _this.icon ? _this.initAjax() : _this.$message({ message: "请点击确认绑定并授权账户相关信息", type: 'warning' });
                } else {
                    return false;
                }
            });
        },
        initAjax() {
            let _this = this
            _this.$http.post(global.tzjAjaxUrl+"/p2peye/bindCheck", { userName: _this.mobilePhone, password: _this.ruleForm.pass, sid: _this.sid }).then((res) => {
                if (res.body.resCode == 1) {
                    _this.setCookie('token', res.body.resData.token, (1000 * 60 * 15))
                    _this.setCookie('userName', _this.mobilePhone, (1000 * 60 * 15))
                    if (_this.loan_id) {
                         setTimeout(function() {
                            _this.$router.push({ path: '/invest/detail', query: { uuid: _this.loan_id,assetManageType:3 } })
                        }, 1000)
                    } else {
                        setTimeout(function() {
                            _this.$router.push("/home") 
                        }, 1000)
                    }
                } else {
                    _this.$message({ message: res.body.resMsg, type: 'warning' });
                }
            })
        },
        initUserName() {
            let _this = this
            let userId = _this.$route.query.id
            _this.$http.post(global.tzjAjaxUrl+"/p2peye/getBindInfo", { id: userId }).then((res) => {
                _this.mobilePhone = res.body.resData.userName;
                _this.sid = res.body.resData.sid;
                _this.loan_id = res.body.resData.loan_id
            })
        }
    },
    created: function() {

    },
    mounted: function() {
        this.initUserName()
        $(".el-input__inner").css({ height: "50px", background: "none", paddingLeft: "40px", borderColor: "#eee" })
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
#authorized {
    position: absolute;
    width: 100%;
    min-width: 1200px;
    z-index: 500;
    top: 0;
    overflow: hidden;
    img {
        width: 100%;
    }
    .el-form-item {
        margin-bottom: 20px;
        margin-top: 20px;
    }
    .mobile {
        width: 325px;
        height: 557px;
        position: absolute;
        top: 25%;
        left: 10%;
        z-index: 99999;
        background: url(https://aliyunsso.edspay.com/web/tzj/mobile.png);
        background-size: 100% 100%;
        transition: all 2s ease;
    }
    .mobile:hover {
        transform: rotateY(20deg);
    }
    .car {
        width: 351px;
        height: 321px;
        position: absolute;
        top: 47%;
        left: 30%;
        z-index: 99999;
        background: url(https://aliyunsso.edspay.com/web/tzj/car.png);
        background-size: 100% 100%;
        transition: all 2s ease;
    }
    .car:hover {
        transform: rotateX(30deg);
    }
    .watermark {
        width: 725px;
        height: 182px;
        position: absolute;
        z-index: 99999;
        background: url(https://aliyunsso.edspay.com/web/tzj/watermark.png);
        background-size: 100% 100%;
        top: -25%;
        left: 3%;
    }
    .login {
        width: 445px;
        height: 492px;
        position: absolute;
        z-index: 2001;
        background: url(https://aliyunsso.edspay.com/web/tzj/wdtyLogin.png);
        background-size: 100% 100%;
        top: 20%;
        left: 62%;
        .el-form {
            width: 340px;
            margin: 0 auto;
            padding-top: 172px;
            #phone {
                margin-bottom: 20px;
                border: 0;
                background: none;
                padding-left: 40px;
                line-height: 50px;
                height: 50px;
                font-size: 16px;
                color: #666;
                .el-input__inner {
                    border: 0;
                    background: none;
                    padding: 0;
                    line-height: 50px;
                }
            }
            i.display {
                width: 50px;
                height: 50px;
                position: absolute;
                top: 6px;
                right: 0;
                background: url(https://aliyunsso.edspay.com/web/login/longin.png) no-repeat center center;
                background-position: 0 -190px;
            }
            i.display.active {
                background-position: 0 -152px;
            }
            #sub {
                display: block;
                background: none;
                border: none;
                padding: 0;
                width: 100%;
                height: 55px;
                margin: 0 auto;
            }
            .forget {
                width: 30%;
                height: 25px;
                margin: 0 auto;
                margin-top: -5px;
            }
            .xieyi {
                i {

                    font-size: 20px;
                    color: #ccc;
                    margin-bottom: 20px;
                }
                i.active {
                    color: #fc4147;
                }
            }
        }
    }
}
</style>
