<template>
   <div id="retrievePwd" :style="fullHeight">
       <div class="header">
           <div class="conent">
               <router-link to="/home"><img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png" alt=""></router-link>
               <div class="black">
                   <router-link to="/home">返回首页</router-link>
                </div>
           </div>
       </div>
       <div class="retrievePwd">
           <div class="conter">
               <div class="title">忘记密码</div>
               <div class="line"></div>
               <div class="steps">
                   <div class="step active" :class="{over:status==2 || status == 3}"><img src="https://aliyunsso.edspay.com/web/login/icon1.png" alt=""></div>
                   <div class="line" :class="{active: status == 2 || status == 3}"></div>
                   <div class="step" :class="{active: status == 2,over: status == 3}"><img src="https://aliyunsso.edspay.com/web/login/icon2.png" alt=""></div>
                   <div class="line" :class="{active: status == 3}"></div>
                   <div class="step" :class="{active: status == 3}"><img src="https://aliyunsso.edspay.com/web/login/icon3.png" alt=""></div>
               </div>
               <div class="description">
                   <span class="active">手机短信验证码</span>
                   <span class="title1" :class="{active: status == 2 || status == 3}">重置登录密码</span>
                   <span class="title2" :class="{active: status == 3}">完成</span>
               </div>
               <!-- 第一步 -->
               <div class="inputBox" style="marginTop:39px"  v-if="status == 1">
                    <label>手机号码</label>
                    <input type="text" :class="{empty: !phone}" v-model="phone"  maxlength="11" @blur="inputBlur('phone')" @focus="inputFocus('phone')" placeholder="请输入手机号码"/>
                    <i v-show="phone && phoneFalg" class="icon del phone" @click="phone = ''"></i>
                    <label>验证码</label>
                    <input type="text" :class="{empty: !validCode}" maxlength="6" class="small" v-model="validCode" placeholder="请输入手机验证码">
                    <el-button class="validCodeRight phone" :class="{active:!phoneCode}" @click="resetCode">{{time}}</el-button>
                    <button @click="submitForm(1)" v-if="phone && validCode" class="btn active">下一步</button>
                    <button v-else class="btn">下一步</button>
               </div>
               <!-- 第二步 -->
               <div class="inputBox" style="marginTop:50px" v-if="status == 2">
                    <label>输入密码</label>
                    <input type="password" :class="{empty: !pass}" v-model="pass" @blur="inputBlur('pass')" @focus="inputFocus('pass')" placeholder="含8-16位数字与字母组合密码" id="pass">
                    <i v-show="pass && passFalg" class="icon del pass" @click="pass = ''"></i>
                    <i v-show="pass && passFalg" class="icon display" @click="passwordDisplay"></i>
                    <button @click="submitForm(2)" v-if="pass" class="btn active" style="marginTop:25px;letter-spacing: 10px;">提交</button>
                    <button v-else class="btn" style="marginTop:25px;letter-spacing: 10px;">提交</button>
               </div>
               <!-- 第三步 -->
               <div class="inputBox3" style="marginTop:20px" v-if="status == 3">
                   <img src="https://aliyunsso.edspay.com/web/login/dagou.gif" alt="">
                   <p>密码设置成功！<em>{{countdown}}s</em>后进入登录页面</p>
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
   </div>
</template>

<script>
    import getData from "../../../common/router/getData"; // 获取图片验证码
    import getUrl from "../../../common/router/getUrl"; // 获取登录信息验证
    export default {
        mixins: [getData, getUrl],
        data() {
            let _this = this
            return {
                status: 1,
                time:'获取验证码',
                countdown:4,    // 成功后的3s倒计时
                wait:60,     // 倒计时时间
                phone:'',
                pass:'',
                validCode:'',
                phoneCode:false,
                valideToken:'',     // 效验码
                phoneFalg: true,    // 手机号码删除icon
                passFalg: true,    // 密码删除icon
                fullHeight:{
                    height: window.innerHeight+"px",  //获取浏览器可视区域的的高度
                    minHeight: 704+ "px"
				},
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
            },
            inputBlur(val){
                if(val == 'phone'){
                    setTimeout(()=>{this.phoneFalg = false;},200)
                } else {
                    setTimeout(()=>{this.passFalg = false;},200)
                }
            },
            black(){   // 返回上一页
                if(this.$route.query.url){
                    this.$router.replace(this.$route.query.url);
                }else{
                    this.$router.replace('/login')
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
            resetCode(){     // 手机验证码
                let _this = this
                if(this.checkEmpty(this.phone, '请输入手机号！')) return false
                if(this.regCheck(this.phone, '请输入正确手机号码！','mobileReg' )) return false
                if(this.phoneCode){
                    this.notify("短信验证码正在发送中，请耐心等待");
                }else{
                    this.$http.post(this.ajaxUrl.getUrl(1) + "/user/getpwd", {
                        getType: 2,
                        step: 1,
                        mobilePhone: _this.phone
                    }).then(res => {
                        if (res.body.resCode == 1) {
                        this.get_code_time(); //倒计时
                        _this.notify(res.body.resMsg, 1);
                        } else {
                        _this.notify(res.body.resMsg, 2);
                        }
                    });
                }
            },
            submitForm(n){
                let _this = this
                if(n == 1){    // 验证手机验证码正确性
                    if(this.checkEmpty(this.phone, '请输入手机号！')) return false
                    if(this.checkEmpty(this.validCode, '请输入手机验证码！')) return false
                    if(this.regCheck(this.phone, '请输入正确手机号码！','mobileReg' )) return false
                    this.$http.post(this.ajaxUrl.getUrl(1) + "/user/getpwd", {
                        code: _this.validCode,
                        getType: 2,
                        mobilePhone: _this.phone,
                        step: 2
                    }).then(res => {
                        if (res.body.resCode == 1) {
                            _this.valideToken = res.body.resData.valideToken
                            _this.status = 2
                        }else {
                            _this.notify(res.body.resMsg, 2);
                        }
                    })
                }else{   // 提交新密码
                    if(this.checkEmpty(this.pass, "请输入密码！")) return false
                    if(this.regCheck(this.pass, '设置密码格式错误，请重新输入！', 'passwordReg' )) return false
                    _this.$http .post(_this.ajaxUrl.getUrl(1) + "/user/getpwd", {
                        pwd: _this.pass,
                        confirmNewPwd: _this.pass,
                        getType: 2,
                        step: 3,
                        valideToken:  _this.valideToken
                    }).then(data => {
                        if (data.body.resCode == 1) {
                            localStorage.setItem('userPhone',_this.phone)
                            _this.status = 3
                        } else {
                            _this.notify(data.body.resMsg, 2);
                        }
                    });
                }
            }
        },
        created: function() {

        },
        mounted: function() {
            document.getElementsByClassName("onlineService")[0].style.display = "none";//隐藏右侧工具栏
            
        },
        destroyed(){
            document.getElementsByClassName("onlineService")[0].style.display = "block";
        },
        components: {

        },
        watch:{
            "status"(val){
                let that = this
                if(val == 3){
                    let countdown = () => {
                        if (that.countdown == 1) {
                            that.black()
                        } else {
                            that.countdown--;
                            setTimeout(()=> {
                                countdown();
                            }, 1000);
                        }
                    }
                    countdown() 
                }
            }
        }
   }
</script>

<style lang="scss" scoped>
    #retrievePwd{
        width: 100%;
        min-width: 1200px;
        height: auto;
        background: #fff;
        position: absolute;
        top: 0;
        z-index: 500;
         // 头部
        .header{
            width: 100%;
            height: 100px;
            background: #fff;
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
                .black{
                    height: 100%;
                    background: #fff;
                    float: right;
                    margin-right: 40px;
                    font-family: PingFang-SC-Medium;
                    font-size: 14px;
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

        .retrievePwd{
            width: 100%;
            height: 544px;
            background: #f2f2f2;
            padding: 20px 0;
            .conter{
                width: 1200px;
                height: 100%;
                background: #fff;
                margin: 0 auto;
                margin-bottom: 10px;
                padding: 30px 194px;
                .title{
                    width: 100%;
                    font-size: 30px;
                    color: #333333;
                    margin-bottom: 20px;
                }
                .line{
                    width: 100%;
                    height: 1px;
                    background: #f5f5f5;
                    margin-bottom: 19px;
                }
                .steps{
                    width: 100%;
                    height: 80px;
                    padding-left: 20px;
                    margin-bottom: 12px;
                    .step{
                        width: 80px;
                        height: 80px;
                        border-radius: 40px;
                        background: #d8d8d8;
                        float: left;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    .step.active{
                        background: #FF3E41;
                    }
                    .step.over{
                        background: #FF8284;
                    }
                    .line{
                        width: 270px;
                        height: 6px; 
                        float: left;
                        margin-top: 37px;
                        background: #d8d8d8;
                    }
                    .line.active{
                        background: #FF8284;
                    }
                }
                .description{
                    width: 100%;
                    // margin-bottom: 39px;
                    span{
                        font-family: PingFang-SC-Medium;
                        font-size: 18px;
                        color: #999999;
                        display: inline-block;
                    }
                    span.title1{
                        margin-left: 220px;
                    }
                    span.title2{
                        margin-left: 275px;
                    }
                    span.active{
                        color: #FF3E41;
                    }
                }
                .inputBox{
                    width: 420px;
                    margin: 0 auto;
                    position: relative;
                    label{
                        height: 50px;
                        width: 79px;
                        line-height: 50px;
                        font-size: 16px;
                        color: #333333;
                        float: left;
                    }
                    input{
                        width: 340px;
                        height: 50px;
                        background: #FFFFFF;
                        border: 1px solid #DDDDDD;
                        border-radius: 2px;
                        padding-left: 20px;
                        margin-bottom: 15px;
                        font-family: DIN-Medium;
                        font-size: 20px;
                        color: #333333;
                        outline:none;
                        line-height: 50px;
                        display: block;
                        float: left;
                    }
                    input.empty{
                        font-size: 14px;
                    }
                    input.small{
                        width: 220px;
                    }
                    .validCodeRight{
                        width: 110px;
                        height: 50px;
                        border-radius: 2px;
                        padding: 0;
                        vertical-align: top;
                        margin-left: 4px;
                        cursor: pointer;
                        color: #fff;
                        border:none;
                        display: block;
                        float: right;
                        span{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        img{
                            width: 110px;
                            height: 48px;
                        }
                    }
                    .validCodeRight.phone.active{
                        background: #FF3E41;
                    }
                    .validCodeRight.phone.active:hover{
                        background: #FF6D70;
                    }
                    .validCodeRight{
                        background: #999;
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
                        background-size: 160px 300px;
                    }
                    i.display{
                        display: block;
                        width: 50px;
                        height: 50px;
                        position: absolute;
                        top: 0;
                        right: 0px;
                        background-position: -110px -100px;
                    }
                    i.display:hover{
                        background-position: -110px -150px;
                    }
                    i.display.active{
                        background-position: -110px -200px;
                    }
                    i.display.active:hover{
                        background-position: -110px -250px;
                    }
                    i.del{
                        display: block;
                        width: 50px;
                        height: 50px;
                        position: absolute;
                    }
                    i.del.phone{
                        top: 0;
                        right: 0;
                        background-position: -110px 0px;
                    }
                    i.del.pass{
                        top: 0;
                        right: 50px;
                        background-position: -110px 0px;
                    }
                    i.del.pass:hover,i.del.phone:hover{
                        background-position: -110px -50px;
                    }
                    .forget{
                        width: 25%;
                        height: 20px;
                        text-align: right;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #508CEE;
                        cursor: pointer;
                        margin-top: -4px;
                        margin-bottom: 22px;
                        float: right;
                    }
                    button.btn{
                        width: 340px;
                        height: 48px;
                        background: #ffd8d9;
                        border-radius: 4px;
                        font-size: 18px;
                        color: #FFFFFF;
                        line-height: 48px;
                        letter-spacing: 2px;
                        outline:none;
                        margin: 15px 0 0 80px;
                        border:0;
                        background-color:none;
                    }
                    button.btn.active{
                        background: #FF3E41;
                        cursor: pointer;
                    }
                    button.btn.active:hover{
                        background: #FF6D70;
                    }
                }
                .inputBox3{
                    width: 100%;
                    img{
                        display: block;
                        margin: 0 auto;
                    }
                    p{
                        margin-top: -10px;
                        font-family: PingFangSC-Medium;
                        font-size: 14px;
                        color: #2A2A2A;
                        letter-spacing: 0;
                        width: 100%;
                        text-align: center;
                        line-height: 36px;
                        em{
                           color: #FF3E41; 
                        }
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
