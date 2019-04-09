<template>
    <div id="authorizedWx">
        <div class="bg">
            <!-- <div class="logo"></div> -->
            <div class="from">
                <div class="phone" v-if="isPhone">
                    {{mobilePhone}}
                </div>
                <div class="phone  pwd input" v-else>
                    <input class="fl" v-model="mobilePhone" type="text" placeholder="请输入手机号码/用户名">
                </div>
                <div class="pwd input">
                    <input class="fl" v-model="pwd" type="password" placeholder="请输入登录密码">
                </div>
                <!-- 协议 -->
                <div class="xieyi">
                    <i class="iconfont" :class="{active:icon}" @click="icon = !icon">&#xe628;</i>
                </div>
                <div @click="goReg" class="btn"></div>
                <!-- <router-link to="/wxGetPwd" class="login" tag="div"></router-link> -->
            </div>
        </div>

    </div>
</template>

<script>
import verify from '../../../../common/wx/verification';	//引入表单验证
import { MessageBox } from 'mint-ui'; //引入弹窗
export default {
    mixins: [verify],
    data() {
        return {
            icon: true,
            mobilePhone: '',
            pwd: '',
            sid: '',
            redirectFlag: '',
            isPhone: false,  // 是否返回了用户名
        }
    },
    methods: {
        goReg() {
            if (this.isEmpty(this.pwd, '请输入8-16位数字与字母组合!', 1)) return false;
            if (this.isFormat(this.pwd, '密码格式不正确！', 'passwordReg', 1)) return false;
            if (!this.icon) {
                this.toast({ text: '请点击确认绑定并授权账户相关信息' });
                return;
            }
            this.initAjax()
        },
        initAjax() {
            let _this = this
            _this.$http.post(global.tzjAjaxUrl + "/windmill/getbindCheck", { userName: _this.mobilePhone, password: _this.pwd, id: _this.sid }).then((res) => {
                if (res.body.resCode == 1) {
                    _this.setCookie('userToken', res.body.resData.token, (1000 * 60 * 15))
                    _this.setCookie('zsOpenStatus', res.body.resData.zsOpenStatus)
                    _this.setCookie('userId', res.body.resData.userId)
                    if (_this.redirectFlag) {
                         setTimeout(function() {
                             window.location.href = _this.redirectFlag;
                        }, 1000)
                    } else {
                        setTimeout(function() {
                            _this.$router.push("/wxIndex")
                        }, 1000)
                    }
                } else {
                    _this.toast({ text: res.body.resMsg });
                }
            })
        },
        initUserName() {
            let _this = this
            let userId = _this.$route.query.id
            _this.$http.post(global.tzjAjaxUrl + "/windmill/getBindInfo", { id: userId }).then((res) => {
                if (res.data.resCode == 1) {
                    _this.mobilePhone = res.data.resData.userName;
                    res.data.resData.userName? _this.isPhone = true : _this.isPhone = false;
                    _this.sid = res.data.resData.id;
                    _this.redirectFlag = res.data.resData.url
                } else {
                     _this.toast({ text: res.data.resMsg });
                }
            })
        }
    },
    created: function() {

    },
    mounted: function() {
        this.initUserName()
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
@import '../../../../style/iconFont.css';
#authorizedWx {
    background: #fff;
    height: 100vh;
    .bg {
        width: 10rem;
        height: 16.08rem;
        background: url(https://aliyunsso.edspay.com/web/credibility/fclc.png) center top no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        // .logo {
        //     width: 7.466667rem;
        //     height: 1.333333rem;
        //     background: url(https://aliyunsso.edspay.com/web/credibility/threelogo.png) center top no-repeat;
        //     background-size: cover;
        //     margin: 1.733333rem auto 0 auto;
        // }
        .from {
            width: 8.133333rem;
            height: 8rem;
            position: absolute;
            top: 6.24rem;
            left: 50%;
            margin-left: -4.066667rem;
            .phone {
                width: 100%;
                height: 1.2rem;
                padding-left: 0.933333rem;
                line-height: 1.4rem;
                margin-bottom: 0.506667rem;
                color: #666666;
                font-size: 0.386667rem;
            }
            .pwd {
                width: 100%;
                height: 1.2rem;
                padding-left: 0.933333rem;
                line-height: 1.4rem; // margin-bottom: 0.48rem;
                input {
                    width: 100%;
                    height: 100%;
                    color: #666666;
                    font-size: 0.386667rem;
                }
            }
            .xieyi {
                margin-top: 0.38rem;
                padding-left: 0.133333rem;
                i {

                    font-size: 0.4rem;
                    color: #ccc;
                    margin-bottom: 0.266667rem;
                }
                i.active {
                    color: #fc4147;
                }
            }
            .btn {
                width: 100%;
                height: 1.2rem;
                margin-top: 0.6rem;
            }
            // .login {
            //     width: 20%;
            //     height: 0.6rem;
            //     margin: 0 auto;
            //     margin-top: 0.4rem;
            // }
        }
    }
}
</style>
