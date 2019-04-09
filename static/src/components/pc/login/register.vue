<template>
   <div id="register" :style="fullHeight">
       <div class="header">
           <div class="conent">
               <router-link to="/home"><img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png" alt=""></router-link>
               <i></i>
               <span>欢迎注册</span>
               <div class="black">
                   <p>已有账户？<router-link to="/login" replace>登录</router-link></p>
                </div>
           </div>
       </div>

        <div class="register" :style="{background: 'url('+ loginPic +') center center / 1920px 520px'}">
            <div class="conter">
                <div class="registerBox" :class="[{AddInviter:InviterFalg}]">
                    <label>角色选择</label>
                    <el-radio-group v-model="role">
                        <el-radio :label="1">我要出借</el-radio>
                        <el-radio :label="2">我要借款</el-radio>
                    </el-radio-group>
                    <label>注册手机号</label>
                    <input type="text" :class="{empty: !phone}" v-model="phone" maxlength="11" @blur="inputBlur('phone')" @focus="inputFocus('phone')" placeholder="请输入手机号码">
                    <i v-show="phone && phoneFalg" class="icon del phone" @click="phone = ''"></i>
                    <label>设置密码</label>
                    <input type="password" :class="{empty: !pass}" maxlength="16" v-model="pass" @blur="inputBlur('pass')" @focus="inputFocus('pass')" placeholder="设置8-16位数字与字母组合密码" id="pass">
                    <i v-show="pass && passFalg" class="icon del pass" @click="pass = ''"></i>
                    <i v-show="pass && passFalg" class="icon display" @click="passwordDisplay"></i>
                    <input type="text" :class="{empty: !code}" maxlength="4" class="small" v-model="code" placeholder="输入图形验证码">
                    <el-button class="validCodeRight" @click="change"><img :src="codeImg" title="点击刷新" /></el-button>
                    <input type="text" :class="{empty: !validCode}" maxlength="6" class="small" v-model="validCode" placeholder="请输入手机验证码">
                    <el-button class="validCodeRight phone" :class="{active:!phoneCode}" @click="resetCode">{{time}}</el-button>
                    <label class="col" @click="InviterFalg = !InviterFalg">
                        <i class="el-icon-arrow-up" :class="{active: InviterFalg}"></i>
                    填写邀请码(选填)</label>
                    <el-collapse-transition>
                        <div v-show="InviterFalg" class="transition-box">
                            <input type="text" :class="{empty: !Inviter}" v-model="Inviter" @blur="inputBlur('Inviter')" @focus="inputFocus('Inviter')" placeholder="请输入邀请人手机号码/邀请码">
                        </div>
                    </el-collapse-transition>
                    <i v-show="Inviter && inviterFalgs" class="icon del invite" @click="Inviter = ''"></i>
                    <button v-if="phone && pass && code && validCode" @click="submitForm" class="hov btnBg btn"></button>
                    <button v-else class="btnBg btn out"></button>
                    <div class="xieyi">注册即表示同意<span @click="enroll = true">《E都市钱包注册协议》</span></div>
                </div>
            </div>
        </div>
        <div class="success_box" v-if="isShow">
            <div class="myBorrowRegisterSuccess_box">
                <div class="close_btn" @click="isShow = false"></div>
                <div class="imgBox"></div>
                <h3>恭喜您注册成功</h3>
                <div class="btn_box">
                    <div class="btn" @click="skipPage(1)">去借钱</div>
                    <div class="btn" @click="skipPage(2)">去购物</div>
                </div>
            </div>
        </div>
        <div class="foot">
            <div class="conter">
                <p>Copyright@2018 版权所有：浙江楚橡信息科技有限公司
                    <em></em>ICP备案号：浙ICP备16001312号-3
                    </br>
                    <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502002733">
                        <span>浙公网安备 33010502002733号</span>
                    </a>
                    <em></em>
                    <a target="_blank" href="/#/license">
                        <span>ICP经营许可证编号：浙B2-20170412</span>
                    </a>
                    <em></em>预计收益不代表实际收益 出借需谨慎
                </p>
            </div>
        </div>
       <enroll v-if='enroll==true' @enroll="enroll = $event" clarity=0.15></enroll>
   </div>
</template>

<script>
    import enroll from "../../pc/template/Protocol/enrollReg"; // 协议组件
    import getData from "../../../common/router/getData"; // 获取图片验证码
    import getUrl from "../../../common/router/getUrl"; // 获取登录信息验证
    export default {
        mixins: [getData, getUrl],
        data() {
            let _this = this;
            return {
                loginPic: 'https://aliyunsso.edspay.com/web/login/registerBg3.png?v1.1',
                enroll:false,
                InviterFalg:false,   // 邀请人框展示
                phoneCode: false,    // 手机验证码框点击
                phoneFalg: false,    // 手机号码删除icon
                passFalg: false,    // 密码删除icon
                inviterFalgs: false,    // 邀请人删除icon
                role: '',
                phone: "",          // 手机号
                code: "",           // 图片验证码 
                pass: "",           // 密码
                validCode: "",      // 手机验证码
                Inviter: "",        // 邀请人
                time:'获取验证码',   //倒计时文子
                wait:60,     // 倒计时时间
                fanliData:{},//返利数据
                fullHeight:{
                    height: window.innerHeight+"px",  //获取浏览器可视区域的的高度
                    minHeight: 704+ "px"
				},
                qiMo:false,//七陌
                isShow:false
            }
        },
        methods: {
            inputFocus(val){
                if(val == "phone"){
					this.phoneFalg = true;
				} else {
					this.phoneFalg = false;
				}
				if(val == "pass"){
					this.passFalg = true
				} else {
					this.passFalg = false;
                }
                if(val == "Inviter"){
					this.inviterFalgs = true
				} else {
					this.inviterFalgs = false;
				}
            },
            inputBlur(val){
                if(val == 'phone'){
                    setTimeout(()=>{this.phoneFalg = false;},200)
                } else if(val == 'pass'){
                    setTimeout(()=>{this.passFalg = false;},200)
                }else{
                    setTimeout(()=>{this.inviterFalgs = false;},200)
                }
            },
            passwordDisplay() {      // 密码输入框是否可见密码
                if ($(".display").hasClass("active")) {
                    $(".display").removeClass("active");
                    $("#pass").attr("type", "password");
                } else {
                    $(".display").addClass("active");
                    $("#pass").attr("type", "text");
                }
            },
            get_code_time(){    //   倒计时
                if (this.wait == 0) {
                    this.phoneCode = false;
                    this.time = "重新发送";
                    this.wait = 60;
                } else {
                    this.phoneCode = true
                    this.time = "(" + this.wait + "s)重发";
                    this.wait--;
                    setTimeout(()=> {
                        this.get_code_time();
                    }, 1000);
                }
            },
            resetCode(){      // 手机验证码
                let _this = this
                if(this.checkEmpty(this.role, '请选择用户角色！')) return false
                if(this.checkEmpty(this.phone, '请输入手机号！')) return false
                if(this.checkEmpty(this.pass, '请输入密码！')) return false
                if(this.checkEmpty(this.code, '请输入图文验证码！')) return false
                if(this.regCheck(this.phone, '请输入正确手机号！','mobileReg' )) return false
                if(this.regCheck(this.pass, '设置密码格式错误，请重新输入！','passwordReg' )) return false
                if(this.phoneCode){
                    this.notify("短信验证码正在发送中，请耐心等待");
                }else{
                    this.$http.post(this.ajaxUrl.getUrl(1) + "/user/getPhoneCode", {
                        mobilePhone: _this.phone,
                        validCode: _this.code,
                        captchaId: _this.captchaId,
                        tokenId: _this.fingerprint
                    }).then(data => {
                        if (data.body.resCode == 1) {
                            _this.get_code_time() //倒计时
                            _this.notify(data.body.resMsg,1);
                            localStorage.setItem('userPhone',_this.phone)
                        } else {
                            _this.change(); //重新加载图片验证码
                            _this.validCode = "";
                            _this.notify(data.body.resMsg, 2);
                        }
                    }); 
                }
            },
            submitForm(){
                let _this = this
                if(this.checkEmpty(this.pass, '请输入密码！')) return false
                if(this.checkEmpty(this.code, '请输入图文验证码！')) return false
                if(this.checkEmpty(this.validCode, '请输入手机验证码！')) return false
                if(this.checkEmpty(this.pass, '设置密码格式错误，请重新输入！', 'passwordReg')) return false
                let json = {}
                let loginData = {}
                if(this.fanliData.tc){
                    json = {
                        code: _this.validCode,
                        pwd: _this.pass,
                        tokenId: _this.fingerprint,
                        inviteMobilePhone: _this.Inviter,
                        source: 4,
                        uid:_this.fanliData.uid,
                        target_url:_this.fanliData.target_url,
                        tc:_this.fanliData.tc,
                        tracking_id:_this.fanliData.tracking_id,
                        action_time:_this.fanliData.action_time,
                        flCode:_this.fanliData.code
                    }
                    loginData = {
                        userName: localStorage.userPhone,
                        pwd: _this.pass,
                        uid:_this.fanliData.uid,
                        target_url:_this.fanliData.target_url,
                        tc:_this.fanliData.tc,
                        tracking_id:_this.fanliData.tracking_id,
                        action_time:_this.fanliData.action_time,
                        flCode:_this.fanliData.code,
                        tokenId: _this.fingerprint,
                    }
                } else {
                    json = {
                        code: _this.validCode,
                        pwd: _this.pass,
                        tokenId: _this.fingerprint,
                        inviteMobilePhone: _this.Inviter,
                        source: 4,
                        userRole: _this.role,
                    }
                    loginData = {
                        userName: localStorage.userPhone,
                        pwd: _this.pass,
                        tokenId: _this.fingerprint,
                    }
                }
                _this.$http.post(_this.ajaxUrl.getUrl(1) + "/user/doRegister", json).then(res => {
                    // 响应成功回调
                    if (res.body.resCode == 1) {
                        // 登录
                        _this.$http.post(_this.ajaxUrl.getUrl(2) + "/user/doLogin", loginData).then(res => {
                            if (res.body.resCode == 1) {
                                _this.qiMo = true;
                                _this.setCookie("token",res.body.resData.token,1000 * 60 * 20);
                                 _this.setCookie("userName",res.body.resData.user.mobilePhone,1000 * 60 * 20);
                                 _this.setCookie("userId",res.body.resData.user.userId,1000 * 60 * 20);
                                 _this.setCookie("nickname",res.body.resData.user.userName,1000 * 60 * 20);//在线客服用户昵称
                                localStorage.setItem('userPhone',_this.phone);
                                if(_this.role == 1){
                                    _this.registerSuccess(); // 弹出成功页
                                } else {
                                    _this.isShow = true;
                                }
                                
                            } else {
                                _this.notify(res.body.resMsg, 2);
                                _this.$router.replace('/login')
                            }
                        })
                    } else {
                        _this.notify(res.body.resMsg);
                    }
                });
            },
            registerSuccess() {
                // 选择要出借注册成功和开通存管成功的弹框
                let introduce, determine, tips;
                introduce = "1118元红包已发送您的账户中";
                determine = "开通存管 使用红包";
                // tips = "为了积极响应国家政策，E都市钱包个人账户将全面升级为银行存款账户"
                const h = this.$createElement;
                this.$msgbox({
                    customClass: 'register-div',
                    title: " ",
                    message: h("div", { class: "alert1" }, [
                        h("div", { class: "imgBox" }, ""),
                        // h("div", { class: "money" }, "1118"),
                        h("b", { class: "status" }, " 恭喜您注册成功"),
                        h("span", { class: "introduce" }, introduce),
                        // h("span", { class: "tips" }, tips)
                    ]),
                    closeOnClickModal: false,
                    showCancelButton: false,
                    confirmButtonText: determine,
                    confirmButtonClass: "determine",
                    beforeClose: (action, instance, done) => {
                        if (action === "confirm") {
                            this.$router.push('/myAccount/openAccount')
                            done();
                            //  确定按钮回调
                        } else {
                            //  返回按钮回调
                            done(); // 返回方法
                        }
                    }
                });
            },
            skipPage(n){    // 我要借款注册成功弹窗按钮点击跳转
               if(n == 1){
                  this.$router.push({
                      path:'/drainage/lendIndex'
                  })
               } else {
                  this.$router.push({
                      path:'/drainage/spendIndex'
                  })
               }
            }
            
        },
        created: function() {
            this.change()
            if(!this.$route.query.tc){
                this.fanliData = {};
            }else{
                this.fanliData = this.$route.query;
            }
        },
        mounted: function() {
            document.getElementsByClassName("onlineService")[0].style.display = "none";//隐藏右侧工具栏

            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1273780038&web_id=1273780038'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        destroyed(){
            document.getElementsByClassName("onlineService")[0].style.display = "block";
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

            'qiMo'(val){
                if(val){
                    window.qimoClientId = {
                        userId: this.getCookie('userId'),
                        nickName:this.getCookie('nickname'),
                        customField: {"nickName":this.getCookie('nickname')}
                    }

                    const script = document.createElement('script')
                    script.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&autoShow=false&language=ZHCN'
                    script.language = 'JavaScript'
                    script.async='async'
                    document.body.appendChild(script)
                }
            }
        },
        components: {
            enroll: enroll
        }
   }
</script>

<style lang="scss" scoped>
    #register{
        width: 100%;
        min-width: 1200px;
        background: #fff;
        position: absolute;
        top: 0;
        z-index: 500;
        // 头部
        .header{
            width: 100%;
            height: 100px;
            background: #fff;
            border-bottom: 1px solid #f5f5f5;
            .conent{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                padding-left: 40px;
                img{
                    width: 204px;
                    height: 44px;
                    margin: 26px 22px 0 0;
                    float: left;
                    cursor: pointer;
                }
                i{
                    width: 2px;
                    height: 29px;
                    background: #979797;
                    margin-top: 36px;
                    display: block;
                    float: left;
                    margin-right: 11px;
                }
                span{
                    height: 40px;
                    display: block;
                    float: left;
                    margin-top: 30px;
                    line-height: 40px;
                    font-family: PingFang-SC-Medium;
                    font-size: 28px;
                    color: #666666;
                }
                .black{
                    height: 100%;
                    background: #fff;
                    float: right;
                    margin-right: 40px;
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
                    color: #666666;
                    padding-top: 16px;
                    line-height: 84px;
                    a{
                        color: #508CEE;
                    }
                    a:hover{
                        color: #f75a31;
                    }
                }
            } 
        }

        .register{
            width: 100%;
            height: 520px;
            .conter{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                .registerBox{
                    transition: all 0.8s ease;
                    position: relative;
                    width: 330px;
                    background: #FFFFFF;
                    float: right;
                    margin: 40px 60px 0 0;
                    padding: 20px;
                    label{
                        display: block;
                        font-family: PingFang-SC-Medium;
                        font-size: 12px;
                        color: #666666;
                        margin-bottom: 4px;
                        line-height: 18px;
                        i{
                        transform: rotate(180deg);
                        transition: all 1s ease;
                    }
                    i.active{
                        transform: rotate(0deg);
                    }
                    }
                    label.col{
                        width: 100%;
                        color: #508CEE;
                        cursor: pointer;
                        margin-bottom: 4px;
                    }
                    label.col:hover{
                        color: #f75a31;
                    }
                    input{
                        width: 290px;
                        height: 42px;
                        background: #FFFFFF;
                        border: 1px solid #DDDDDD;
                        border-radius: 2px;
                        padding-left: 16px;
                        margin-bottom: 10px;
                        font-family: DIN-Medium;
                        font-size: 20px;
                        color: #333333;
                        // outline:none;
                        line-height: 42px;
                    }
                    input.empty{
                        font-size: 14px;
                    }
                    input.small{
                        width: 190px;
                    }
                    .validCodeRight{
                        width: 90px;
                        height: 42px;
                        border: 1px solid #DDDDDD;
                        border-radius: 2px;
                        padding: 0;
                        vertical-align: top;
                        cursor: pointer;
                        float: right;
                        span{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        img{
                            width: 88px;
                            height: 40px;
                        }
                    }
                    .validCodeRight.phone.active{
                        background: #FF3E41;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: 42px;
                        border: 0;
                    }
                    .validCodeRight.phone.active:hover{
                        background: #FF6D70;
                    }
                    .validCodeRight.phone{
                        background: #999999;
                        color: #FFFFFF;
                    }
                    input:last-child{
                        margin-bottom: 0px;
                    }
                    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999;
                    } 
                    input:-moz-placeholder, textarea:-moz-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999; 
                    } 
                    input::-moz-placeholder, textarea::-moz-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999; 
                    } 
                    input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999;
                    } 
                    input:focus{
                        border: 1px solid #FFC5B1;
                    }
                    i.icon{
                        cursor: pointer;
                        background: url(https://aliyunsso.edspay.com/web/login/pictureSetIcon.png) no-repeat;
                    }
                    i.display{
                        display: block;
                        width: 32px;
                        height: 40px;
                        position: absolute;
                        top: 124px;
                        right: 21px;
                        background-position: 0px -168px;
                    }
                    i.display:hover{
                        background-position: 0px -210px;
                    }
                    i.display.active{
                        background-position: 0px -84px;
                    }
                    i.display.active:hover{
                        background-position: 0px -126px;
                    }
                    i.del{
                        display: block;
                        width: 32px;
                        height: 40px;
                        position: absolute;
                        
                    }
                    i.del.phone{
                        top: 50px;
                        right: 21px;
                        background-position: 0 0;
                    }
                    i.del.pass{
                        top: 124px;
                        right: 53px;
                    }
                    i.del.invite{
                        top: 302px;
                        right: 21px
                    }
                    i.del.invite:hover,i.del.pass:hover,i.del.phone:hover{
                        background-position: 0 -42px;
                    }
                    .btnBg{
                        background: url(https://aliyunsso.edspay.com/web/login/pictureSet.png) no-repeat;
                        background-size: 290px 324px;
                        background-position: 0px 0px;
                    }
                    button.btn{
                        width: 290px;
                        height: 40px;
                        border-radius: 4px;
                        margin-bottom:6px;
                        cursor: pointer;
                        outline:none;
                        margin-top: 20px;
                        border:0;
                        background-position: 0px -160px;
                    }
                    button.btn.hov:hover{
                        background-position: 0px -200px;
                    }
                    button.btn.out{
                        background-position: 0px -120px;
                    }
                    .xieyi{
                        width: 100%;
                        text-align: center;
                        font-family: PingFang-SC-Regular;
                        font-size: 12px;
                        color: #999999;
                        span{
                            color: #508CEE;
                            cursor: pointer;
                        }
                        span:hover{
                            color: #f75a31;
                        }
                    }
                }
                .AddInviter{
                    margin-top: 16px;
                }
            }
        }
        .success_box{
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6);
            z-index: 501;
            position: fixed;
            top: 0;
            left: 0;
        .myBorrowRegisterSuccess_box{
            position: fixed;
            top:0;bottom: 0;
            left: 0;right: 0;
            margin: auto;
            width: 360px;
            height: 351px;
            background: #FFFFFF;
            border-radius: 8px;
            padding: 20px  33px 0;
            text-align: center;
            z-index: 502;
            .close_btn{
                width: 30px;
                height: 30px;
                position: absolute;
                top: 10px;
                right: 10px;
                cursor: pointer;
                background: url(https://aliyunsso.edspay.com/web/login/guanbi.png?v=1.0) no-repeat;
                background-size: cover;
                transition: all 0.5s linear;
                -webkit-transition: all 0.5s linear;
                -o-transition: all 0.5s linear;
                -moz-transition: all 0.5s linear;
                -ms-transition:all 0.5s linear;
                &:hover{
                   transform: rotate(180deg);
                   -webkit-transform: rotate(180deg);
                   -moz-transform: rotate(180deg);
                   -ms-transform: rotate(180deg);
                   -o-transform: rotate(180deg);
                }
            }
            .imgBox {
                width: 259px;
                height: 178px;
                margin: 0 auto;
                background: url(https://aliyunsso.edspay.com/web/login/jk_registerSuccess.png?v=1.1)
                center center;
                background-size: 100% 100%;
                margin-bottom: 10px;
            }
            h3{
                font-size: 24px;
                color: #000000;
                margin-bottom: 30px;
            }
            .btn_box{
                position: relative;
                .btn{
                    width: 135px;
                    height: 50px;
                    float: left;
                    border: 1px solid #FF5B4C;
                    border-radius: 28px;
                    font-size: 18px;
                    color: #FF5B4C;
                    line-height: 50px;
                    cursor: pointer;
                    &:hover{
                        color: #fff;
                       background: #FF5B4C;
                    }
                }
                .btn:nth-child(2){
                    float: right;
                }
            }
        }
        }
        //脚步
        .foot{
            width: 100%;
            height: 84px;
            background: #fff;
            padding: 22px 0;
            .conter{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                p{
                    width: 100%;
                    line-height: 20px;
                    font-family: PingFang-SC-Medium;
                    font-size: 12px;
                    color: #666666;
                    letter-spacing: 0;
                    text-align: center;
                    em{
                        margin-right: 20px;
                    }
                }
                a:hover{
                    color: #f75a31;
                }
            }
        }
    }
    
</style>
<style lang="scss">
#register{
    .register .conter .registerBox{
        .el-radio-group{
            .el-radio__inner{
                width: 14px;
                height: 14px;
                border: 1px solid #FFC5B1;
            }
            .el-radio__input.is-checked .el-radio__inner {
                border: 0px solid #FFC5B1;
                width: 14px;
                height: 14px;
                background:url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/checked.png);
                background-size:100% 100%;
                
            }
            .el-radio__input.is-checked .el-radio__inner::after{
                width: 0px; 
                height: 0px;
            }
            label{
                display: inline-block;
            }
            .el-radio__label{
                font-size:12px;
            }
            .el-radio+.el-radio {
                margin-left: 30px;
            }
        }
    }
    
}
</style>
