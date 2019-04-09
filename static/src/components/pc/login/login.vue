<template>
   <div id="register" :style="fullHeight">
       <div class="header">
           <div class="conent">
               <router-link to="/home"><img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png" alt=""></router-link>
               <i></i>
               <span>欢迎登录</span>
               <div class="black">
                   <router-link to="/home">返回首页</router-link>
                </div>
           </div>
       </div>
       <div class="login" :style="{background: 'url('+ loginPic +') center center / 1920px 520px'}">
           <div class="conter">
               <div class="loginBox">
                   <label>手机号/用户名</label>
                   <input type="text" :class="{empty: !phone}" @blur="inputBlur(1)" @focus="inputFocus('userName')" v-model="phone" placeholder="请输入手机号/用户名">
                   <i v-show="phone && userNameFlag" class="icon del phone" @click="phone = ''"></i>
                   <label>登录密码</label>
                   <input type="password" :class="{empty: !pass}" @blur="inputBlur" @focus="inputFocus('password')" v-model="pass" placeholder="请输入登录密码" id="pass">
                   <i v-show="pass && pawFlag" class="icon del pass" @click="pass = ''"></i>
                   <i v-show="pass && pawFlag" class="icon display" @click="passwordDisplay"></i>
                    <div class="forget" @click="$router.replace('/retrievePwd')">忘记密码？</div>
                    <button v-if="phone && pass" @click="submitForm" class="btnBg btn hov"></button>
                    <button v-else class="btnBg btn out"></button>
                    <div class="registr" @click="$router.replace('/register')">注册</div>
                    <div class="ssl">
                        <img src="https://aliyunsso.edspay.com/web/login/sll.png" alt="">您的信息已使用ssl加密技术，数据传输安全</div>
                    
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
    import getUrl from "../../../common/router/getUrl"; // 获取登录信息验证
    export default {
        mixins: [getUrl],
        data() {
            return {
                loginPic:'https://aliyunsso.edspay.com/web/login/loginBg.png',
                phone: "",
                pass: "",
                fanliData:{},//返利数据
                userNameFlag: false,
                pawFlag: false,
                fullHeight:{
                    height: window.innerHeight+"px",  //获取浏览器可视区域的的高度
                    minHeight: 704+ "px"
				},
                qiMo:false,//七陌
            }
        },
        methods: {
            inputFocus(val){
                if(val == "userName"){
					this.userNameFlag = true;
				} else {
					this.userNameFlag = false;
				}
				if(val == "password"){
					this.pawFlag = true
				} else {
					this.pawFlag = false;
				}
            },
            inputBlur(val){
                if(val == 1){
                    setTimeout(()=>{this.userNameFlag = false;},200)
                } else {
                    setTimeout(()=>{this.pawFlag = false;},200)
                }
            },
            passwordDisplay() {
            // 密码输入框是否可见密码
                if ($(".display").hasClass("active")) {
                    $(".display").removeClass("active");
                    $("#pass").attr("type", "password");
                } else {
                    $(".display").addClass("active");
                    $("#pass").attr("type", "text");
                }
            },
            
            submitForm(){
                let _this = this
                if(this.checkEmpty(this.phone, "手机号/用户名不能为空！")) return false
                if(this.checkEmpty(this.pass, "请输入密码！")) return false
                if(this.regCheck(this.pass, '密码格式错误，请重新输入！', 'passwordReg' )) return false
                let json = {}
                if(this.fanliData.tc){
                    json = {
                        userName: _this.phone,
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
                        userName: _this.phone,
                        pwd: _this.pass,
                        tokenId: _this.fingerprint,
                    }
                }
                _this.$http.post(_this.ajaxUrl.getUrl(2) + "/user/doLogin", json).then(res => {
                    if (res.body.resCode == 1) {
                        this.qiMo = true
                        _this.setCookie("token",res.body.resData.token,1000 * 60 * 20);
                        _this.setCookie("userName",res.body.resData.user.mobilePhone,1000 * 60 * 20);
                        _this.setCookie("userId",res.body.resData.user.userId,1000 * 60 * 20);
                        _this.setCookie("nickname",res.body.resData.user.userName,1000 * 60 * 20);//在线客服用户昵称
                        localStorage.setItem('userPhone',_this.phone)
                        if (this.$route.query.pop == "LG" || this.$route.query.pop == "paw" || this.$route.path == '/login') {
                            _this.$router.push("/home");
                        } else {
                            _this.$router.go(-1);
                        }
                    } else {
                        _this.pass = ""
                        _this.notify(res.body.resMsg);
                    }
                });
            }
        },
        created: function() {
            console.log(this.$route.query)
            localStorage.userPhone ? this.phone = localStorage.userPhone : ''
            if(!this.$route.query.tc){
                this.fanliData = {};
            }else{
                this.fanliData = this.$route.query;
            };
            document.onkeydown = (e) => {    // enter按钮提交登录事件
                let key = window.event.keyCode
                if (key == 13) {
                    this.submitForm()
                }
            };
        },
        mounted: function() {
            document.getElementsByClassName("onlineService")[0].style.display = "none";//隐藏右侧工具栏

            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1273780032&web_id=1273780032'
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
                }
                .black a:hover{
                    color: #f75a31;
                }
            } 
        }

        // 登录部分
        .login{
            width: 100%;
            height: 520px;
            .conter{
                width: 1200px;
                height: 100%;
                margin: 0 auto;
                .loginBox{
                    position: relative;
                    width: 330px;
                    height: 366px;
                    background: #FFFFFF;
                    float: right;
                    margin: 80px 60px 0 0;
                    padding: 28px 20px 30px;
                    label{
                        display: block;
                        font-family: PingFang-SC-Medium;
                        font-size: 12px;
                        color: #666666;
                        margin-bottom: 4px;
                        line-height: 18px;
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
                        outline:none;
                        line-height: 42px;
                    }
                    input.empty{
                        font-size: 14px;
                    }
                    input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999;
                        line-height: 42px;
                    } 
                    input:-moz-placeholder, textarea:-moz-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999; 
                        line-height: 42px;
                    } 
                    input::-moz-placeholder, textarea::-moz-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999; 
                        line-height: 42px;
                    } 
                    input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
                        font-family: PingFang-SC-Medium;
                        font-size: 14px;
                        color: #999999;
                        line-height: 42px;
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
                        width: 32px;
                        height: 40px;
                        position: absolute;
                        top: 125px;
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
                        top: 51px;
                        right: 21px;
                        background-position: 0px 0px;
                    }
                    i.del.pass:hover,i.del.phone:hover{
                        background-position: 0px -42px;
                    }
                    i.del.pass{
                        top: 125px;
                        right: 53px;
                    }
                    .forget{
                        width: 25%;
                        height: 20px;
                        text-align: right;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        line-height: 18px;
                        color: #508CEE;
                        cursor: pointer;
                        margin-top: -4px;
                        margin-bottom: 18px;
                        float: right;
                    }
                    .forget:hover{
                        color: #f75a31;
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
                        margin-bottom:16px;
                        cursor: pointer;
                        outline:none;
                        border:0;
                        background-position: 0px -40px;
                    }
                    button.btn.hov:hover{
                        background-position: 0px -80px;
                    }
                    button.btn.out{
                        background-position: 0px 0px;
                    }
                    .ssl{
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        line-height: 18px;
                        color: #666666;
                        letter-spacing: 0;
                        margin-bottom: 21px;
                        img{
                            width: 12px;
                            height: 14px;
                            display: inline-block;
                            margin-right: 5px;
                        }
                    }
                    .registr{
                        width: 290px;
                        height: 40px;
                        cursor: pointer;
                        border: 1px solid #FF5638;
                        border-radius: 4px;
                        font-family: PingFangSC-Regular;
                        font-size: 18px;
                        color: #FF3E35;
                        text-align: center;
                        line-height: 40px;
                        margin-bottom: 10px;
                    }
                    // .registr:hover{
                    //     background-position: 0px -160px;
                    // }
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
