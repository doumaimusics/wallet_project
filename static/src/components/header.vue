<template>
<!-- // @mouseover="init" @mouseout="out" :class="{active:showHeader == 1,bag:classStr}" -->
  <div id="headTable">
    <div id="header_info">
      <div class="clearfix header_top">
        <div class="attention float_right">
            <div v-if="login" class="loginStatus" style="float:left">
            <div class="loginInformation">
              <a>您好，{{userName}}
                <i class="el-submenu__icon-arrow el-icon-caret-bottom" style="font-size: 12px;line-height: 15px;"></i>
            <div class="clert"></div>
            <ul class="public">
              <i class="sanjiao"></i>
              <li>
                <router-link to="/myAccount/accountHome" active-class="table">
                  <i class="personal "></i>
                  个人中心
                </router-link>
              </li>
              <li>
                <router-link to="/myAccount/mySetting" active-class="table">
                  <i class="accountSetting"></i>
                  账户设置
                </router-link>
              </li>
              <li>
                <router-link to="/myAccount/accountDetail" active-class="table">
                  <i class="record"></i>
                  资金明细
                </router-link>
              </li>
              <li>
                <a @click="signOut" class="leftLine leftLine1">
                  <i class="exit"></i>
                  安全退出
                </a>
              </li>
            </ul>
           </a>
          </div>
          </div>
          <div class="float_left logins" v-else>
            <span class="float_left cur" @click="enrolls">请注册</span>
            <span class="float_left cur" @click="signIn">-登录</span>
          </div>
          <i class="line float_left"></i>
          <div class="float_left" style="margin-right:0;cursor: pointer;">
            <router-link to="/guide">
              <span>新手指引</span>
            </router-link>
          </div>
          <i class="line float_left"></i>
          <div class="float_left" style="cursor: pointer;">
            <router-link :to="{path: '/help', query: {sideBarType: '1' }}">
              <span>帮助中心</span>
            </router-link>
          </div>
          <i class="line float_left"></i>
          <em class="i_APP guanzhu float_left">
            下载APP
            <div class="topTipsWrap" style="left:-35px;top:20px;">
              <i style="left:55px;">
              </i>
              <div class="topTips" style="width: 124px;height: 130px;">
                <img :src="qrCode.appUrl" />
                <p>E都市钱包APP</p>
              </div>
            </div>
          </em>
          <i class="line float_left"></i>
          <span class="kefu float_left" @click="kefu">
          <i class="iconfont">&#xe618;</i>
          在线客服
          </span>
        <i class="line float_left"></i>
          <em class="sprite i_weixin guanzhu" style="width:auto;">
            <i class="iconfont">&#xe613;</i>
            关注我们
            <div class="topTipsWrap" style="left:-150px;">
              <i style="left:160px;">
              </i>
              <div class="topTips" style="width: 238px;height: 130px;">
                <img :src="qrCode.weixinUrl" />
                <img :src="qrCode.weiboUrl" style="margin-left:19px;margin-right:19px; " />
                <!-- <img :src="qrCode.qqUrl" style="margin-left:0;"/> -->
                <p class="stree"><span>微信公众号</span><span>官方微博</span>
                <!-- <span>QQ服务号</span> -->
                </p>
              </div>
            </div>
          </em>
        <i class="line float_left"></i>
        <span class="float_left" style="cursor: default;">
          客服热线：<em style="width:auto;">{{codeHref.hotLine}}</em>
        </span>
        </div>
      </div>
    </div>

    <!-- 一级导航栏目 -->
    <div class="titleTable">
      <div class="logos">
        <router-link to="/home" href="#">
        <!-- :src="showHeader != 1 || classStr?'https://aliyunsso.edspay.com/web/home/pcHome/logo_PC.png':'https://aliyunsso.edspay.com/web/home/pcHome/logo.png'" -->
          <img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png">
        </router-link>
      </div>
      <div class="table float_right" id="navig">
        <ul>
          <li style="float: right;">
            <router-link to="/myAccount" active-class="table" tag="a">
              <i class="iconfont" style="vertical-align: bottom;">&#xe614;</i>
              我的账户
            </router-link>
          </li>
          <li>
            <router-link to="/home" active-class="table">
              首页
            </router-link>
          </li>
          <li>
            <router-link to="/invest" active-class="table">
              <!-- 我要出借 -->
              我要出借
            </router-link>
          </li>
          <li>
            <router-link to="/drainage/lendIndex" active-class="table">
              我要借款
            </router-link>
          </li>
          <li>
            <router-link to="/drainage/spendIndex" active-class="table">
              我要分期
            </router-link>
          </li>

          <!-- <li>
            <router-link to="/pcBorrow" active-class="table">
              我要借款
            </router-link>
          </li> -->
          <li>
            <router-link to="/info" active-class="table">
              信息披露
            </router-link>
          </li>
          <!-- <li>
            <router-link to="/registrationProcess" active-class="table">
              备案进程
            </router-link>
          </li>
          <li>
            <router-link to="/risk" active-class="table">
              风险教育
            </router-link>
          </li> -->
          <li>
            <router-link to="/vip" active-class="table">
              VIP会员
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import getUrl from "../common/router/getUrl"; // 获取登录信息验证
export default {
  name: "headTable",
  mixins: [getUrl],
  props: ["sign", "activeName", "showHeader"], // 登录框状态
  data() {
    return {
      classStr:false,
      isAccount: false,
      userName: "", //  用户的手机号码
      codeHref: {}, // 公司信息
      qrCode: {}, // 公司信息
      sessionId: "", // 同盾调用参数
      fanliData:{}, //返利网数据
    };
  },
  methods: {
    // 客服系统
    kefu() {
      // NTKF.im_openInPageChat("kf_9511_1488165613968");// 小能客服系统
      qimoChatClick()//七陌客服
    },
    links() {
      // 头部和脚步的二维码和友情链接地址
      let _this = this;
      this.$http.post(this.ajaxUrl.getUrl(1) + "/index/links").then(data => {
        if (data.body.resCode == 1) {
          _this.codeHref = data.body.resData.data;
          _this.qrCode = data.body.resData.data.qrCode;
        } else {
        }
      });
    },
    signIn(){   // 点击登录
      let url = ''
      this.$route.query.pop ? url  ="/login?pop="+this.$route.query.pop : url = "/login"
      if(this.$route.path == "/register" || this.$route.path == "/login"){
        this.$router.replace(url)
      }else{
        this.$router.push(url)
      }
    },
    enrolls() {   // 点击注册
      let url = ''
      this.$route.query.pop ? url = "/register?pop="+this.$route.query.pop : url = "/register"
      if(this.$route.path == "/register" || this.$route.path == "/login"){
        this.$router.replace(url)
      }else{
        this.$router.push(url)
      }
    },
    // 跳转到找回密码页
    retrievePwd(){
        this.$router.push({path:"/retrievePwd",query:{url:this.$route.path}}) 
    },
    signOut() {
      // 退出登录
      var _this = this;
      _this.$http
        .post(_this.ajaxUrl.getUrl(2) + "/user/logout", { token: _this.token })
        .then(
          res => {
            this.delCookie("userName");
            this.delCookie("token");
            this.login = false;
            this.isAccount = false;
            window.location.href = "/";
          },
          response => {
            // 响应错误回调
            console.log(response);
          }
        );
    },
    queryUrlString() {
      if (!this.getCookie("token")) {
        this.login = false;
      } else {
        this.login = true;
        this.token = this.getCookie("token");
        this.userName = this.getCookie("userName");
        this.setCookie("token", this.token, 1000 * 60 * 20);
        this.setCookie("userName", this.userName, 1000 * 60 * 20);
      }
      document.getElementsByTagName("body")[0].style.overflow = "visible";
      $(document).scrollTop(0);
      this.$emit("activeName", false);
      this.$route.query.pop == "LG" ? this.signIn("LG") : ""; // 跳转到登录
      this.$route.query.pop == "reg" ? this.enrolls("reg") : ""; // 跳转到注册
      this.$route.query.pop == "paw" ? this.retrievePwd("paw") : ""; // 跳转到找回密码
    },
    init(){
      let _this = this
      if (_this.showHeader) _this.classStr = true
    },
    out(){
      let _this = this
      _this.classStr = false
    }
  },
  created: function() {
    this.links();
  },
  mounted: function() {
    this.queryUrlString();
  },
  watch: {
    "sign"(){
      if(this.sign && this.activeName == 'second'){    // 跳转到登录页
        this.signIn()
      }else if(this.sign && this.activeName == 'first'){   // 跳转到注册页
        this.enrolls()
      }
    },
    $route: "queryUrlString"
  }
};
</script>

<style lang="scss" scoped>
.header-top {
  position: absolute;
  width: 100%;
  z-index: 10;
  top: 0;
  z-index: 10;
  #top {
    color: #fff;
    width: 1200px;
    margin: 0 auto;
    .indexPublic {
      right: 0;
    }
    .logo {
      width: 210px;
      padding-top: 35px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .top-right {
      float: right;
    }
    .top-Tab {
      padding: 44px 0 0 0;
      li {
        padding: 0 20px;
        cursor: pointer;
        span {
          display: inline-block;
          padding-bottom: 9px;
          font-size: 18px;
        }
        .active {
          border-bottom: 3px solid #fff;
        }
      }
      li:hover {
        span {
          border-bottom: 3px solid #fff;
        }
      }
    }
    padding: 40px 0 0 22px;
    .cur {
      cursor: pointer;
      display: inline-block;
      font-size: 16px;
      line-height: 34px;
      text-align: center;
      margin-right: 24px;
      width: 74px;
      height: 34px;
      border: 1px solid #fff;
      border-radius: 18px;
    }
    .public {
      display: none;
    }
    .user:hover ul {
      display: block;
    }
    .user {
      border: 1px solid #fff;
      height: 36px;
      width: 180px;
      border-radius: 18px;
      margin: 40px 0 0 6px;
      text-align: center;
      position: relative;
      p {
        span {
          font-size: 15px;
          line-height: 36px;
        }
      }

      .public {
        width: 130px;
        height: 160px;
        background-color: #ffffff;
        border: solid 1px #d7d7d7;
        margin-left: 15px;
        border-bottom: 0;
        position: absolute;
        z-index: 990;
      }
      .public li {
        list-style: none;
        width: 100%;
        height: 40px;
        border-bottom: solid 1px #d7d7d7;
        text-align: center;
        line-height: 40px;
        color: #666;
        position: relative;
        z-index: 1;
      }
      .logins {
        cursor: pointer;
        span.cur{
          cursor: pointer;
        }
      }
      .public li:hover {
        background: #fc4147;
      }
      .public li a.table {
        background: #fc4147;
        color: #fff;
      }
      .public li:hover a {
        color: #fff;
      }
      .public li a {
        display: block;
        width: 100%;
        height: 100%;
      }
      .public li a i {
        background: url(https://aliyunsso.edspay.com/web/login/ststus.png)no-repeat;
        width: 20px;
        height: 20px;
        display: inline-block;
        vertical-align: sub;
      }
      .public li:hover a i.personal {
        background-position: 0 -20px;
      }
      .public li a i.accountSetting {
        background-position: 0 -40px;
      }
      .public li:hover a i.accountSetting {
        background-position: 0 -60px;
      }
      .public li a i.record {
        background-position: 0 -80px;
      }
      .public li:hover a i.record {
        background-position: 0 -100px;
      }
      .public li a i.exit {
        background-position: 0 -120px;
      }
      .public li:hover a i.exit {
        background-position: 0 -140px;
      }
      .public i.sanjiao {
        width: 10px;
        height: 10px;
        display: block;
        background: #fff;
        transform: rotateZ(45deg);
        margin: -5px auto 0;
        border-left: 1px solid #d7d7d7;
        border-top: 1px solid #d7d7d7;
        position: absolute;
        left: 83%;
      }
    }
  }
}
</style>

<style lang="scss">
@import "../style/iconFont.css";

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

* {
  box-sizing: border-box;
}

.float_left {
  float: left;
}

.float_right {
  float: right;
}



a {
  color: inherit;
  text-decoration: none;
}

#headTable {
  position: relative;
  background: #fff;
  border-bottom: 1px solid #e7e7e7;
  height: 90px;
  width: 100%;
  .titleTable #navig ul li a.table {
    color: #f75a31;
    font-weight: 400;
  }
  #header_info {
    width: 1200px;
    margin: 0 auto;
    color: #999;
  }
  .header_top {
    width: 1200px;
    margin: 0 auto;
    font-size: 12px;
    color: #999;
    float: left;
    padding-top: 14px;
  }
  .header_top .float_left.cur {
    cursor: pointer;
  }
  .header_top .loginInformation:hover .el-submenu__icon-arrow {
    ms-transform: rotateZ(180deg);
    transform: rotateZ(180deg);
  }
  .header_top .loginStatus ul {
    display: none;
  }
  .header_top .loginStatus:hover ul {
    display: block;
  }
  .header_top .loginStatus .public {
    width: 130px;
    height: 160px;
    background-color: #ffffff;
    border: solid 1px #d7d7d7;
    margin-left: 15px;
    border-bottom: 0;
    position: absolute;
    top: 30px;
    right: -10px;
    z-index: 990;
  }
  .header_top .loginStatus .public li {
    list-style: none;
    width: 100%;
    height: 40px;
    border-bottom: solid 1px #d7d7d7;
    text-align: center;
    line-height: 40px;
    color: #666;
    position: relative;
    z-index: 1;
  }
  i.rightLine {
    display: block;
    width: 2px;
    height: 20px;
    background: red;
    float: left;
    margin: 10px 10px 0;
  }
  .header_top .loginStatus .public li:hover {
    background: #fc4147;
  }
  .header_top .loginStatus .public li a.table {
    background: #fc4147;
    color: #fff;
  }
  .header_top .loginStatus .public li:hover a {
    color: #fff;
  }
  .header_top .loginStatus .public li a {
    display: block;
    width: 100%;
    height: 100%;
  }
  .header_top .loginStatus .public li a i {
    background: url(https://aliyunsso.edspay.com/web/login/ststus.png)no-repeat;
    width: 20px;
    height: 20px;
    display: inline-block;
    vertical-align: sub;
  }
  .header_top .loginStatus .public li:hover a i.personal {
    background-position: 0 -20px;
  }
  .header_top .loginStatus .public li a i.accountSetting {
    background-position: 0 -40px;
  }
  .header_top .loginStatus .public li:hover a i.accountSetting {
    background-position: 0 -60px;
  }
  .header_top .loginStatus .public li a i.record {
    background-position: 0 -80px;
  }
  .header_top .loginStatus .public li:hover a i.record {
    background-position: 0 -100px;
  }
  .header_top .loginStatus .public li a i.exit {
    background-position: 0 -120px;
  }
  .header_top .loginStatus .public li:hover a i.exit {
    background-position: 0 -140px;
  }
  .header_top .loginStatus .public i.sanjiao {
    width: 10px;
    height: 10px;
    display: block;
    background: #fff;
    transform: rotateZ(45deg);
    margin: -5px auto 0;
    border-left: 1px solid #d7d7d7;
    border-top: 1px solid #d7d7d7;
    position: absolute;
    left: 83%;
  }
  .header_top span {
    display: inline-block;
  }
  .header_top span.serviceTime {
    color: #5a5a5a;
    padding: 0 18px;
  }
  .header_top .home {
    background-position: 0 -926px;
    padding-left: 25px;
  }
  .header_top .tel {
    font-size: 12px;
  }
  .header_top .kefu {
    cursor: pointer;
  }
  .header_top i.line {
    height: 10px;
    width: 1px;
    background: #999;
    margin: 4px 10px 0;
    display: block;
  }
  .header_top .tel em {
    font-size: 12px;
    vertical-align: middle;
  }
  .header_top .attention em {
    position: relative;
    height: 24px;
    width: 24px;
    vertical-align: text-bottom;
    text-indent: 0px;
  }
  .header_top .attention em.i_APP {
    width: auto;
    cursor: pointer;
  }
  .el-icon-caret-bottom {
    right: 0;
    margin-left: 10px;
  }
  .header_top .attention em .topTipsWrap {
    display: none;
    position: absolute;
    line-height: normal;
    z-index: 100;
    width: 130px;
    top: 23px;
    padding-top: 20px;
    left: -50px;
    font-family: "Microsoft YaHei", "arial";
    text-indent: 0;
  }
  .header_top .attention em .topTips {
    box-sizing: initial;
    position: absolute;
    top: 13px;
    width: 90px;
    padding: 1px;
    font-size: 14px;
    background-color: #f5f5f5;
    border: 1px solid #e6e6e6;
    -moz-border-radius: 5px;
    -webkit-border-radius: 5px;
    border-radius: 5px;
    box-sizing: border-box;
  }
  .header_top .attention em .topTips img {
    width: 86px;
    height: 86px;
    margin-left: 19px;
    margin-top: 11px;
  }
  .header_top .attention em .topTips p{
    font-size: 14px;
    color: #333333;
    width: 100%;
    text-align: center;
    margin-top:5px;
  }
  .header_top .attention em .topTips p.stree{
    font-size: 14px;
    color: #333333;
    width: 100%;
    text-align: center;
    span{
      font-size: 14px;
      color: #333333;
      text-align: center;
      display: inline-block;
      width: 45%;
    }
  }
  .header_top .attention em .topTipsWrap i {
    position: absolute;
    top: 7px;
    left: 55px;
    display: inline-block;
    height: 7px;
    width: 11px;
    background: url(https://aliyunsso.edspay.com/web/login/hoveTips.png)
      no-repeat;
    z-index: 10;
  }
  .header_top .attention em .topTips h2 {
    padding-bottom: 12px;
    color: #333;
  }
  .header_top .attention em .topTips a {
    color: #fe673a;
  }
  .header_top .attention em .topTips span {
    line-height: 26px;
    color: #b7322c;
  }
  .header_top .attention em .topTips span b {
    font-weight: normal;
    font-size: 19px;
  }
  .header_top .attention em.i_weibo {
    background-position: -154px -462px;
  }
  .header_top .attention em.i_weixin {
    background-position: -154px -314px;
    float: left;
    top: -3px;
    line-height: 24px;
    cursor: pointer;
  }
  .header_top .attention em.i_qq {
    background-position: 0 -1872px;
  }
  .header_top .attention em.i_weibo:hover {
    background-position: -154px -536px;
  }
  .header_top .attention em.i_weixin:hover {
    background-position: -154px -388px;
  }
  .header_top .attention em.i_qq:hover {
    background-position: 0 -1946px;
  }
  .header_top .attention em:hover .topTipsWrap {
    display: block;
  }
  .header_top .float_right a {
    display: inline-block;
    zoom: 1;
    display: inline;
  }
  .header_top a:hover {
    color: #f75a31;
    text-decoration: none;
  }
  .header_top em:hover {
    color: #f75a31;
    text-decoration: none;
  }
  .header_top span:hover {
    color: #f75a31;
    text-decoration: none;
  }
  .header_top .loginInformation {
    position: relative;
    width: 138px;
    .clert{
      position: absolute;
      width: 100%;
      height: 40px;
      left: 0;
      top:0;
      z-index: 5;
    }
  }

  .header_con_wrapper {
    width: 100%;
    height: 70px;
    background: #fff;
    border-bottom: 1px solid #dcdcdc;
    min-width: 1190px;
  }
  .header_con {
    width: 1190px;
    margin: 0 auto;
  }
  /* 导航*/
  .titleTable {
    width: 1200px;
    height: 50px;
    margin: 0 auto;
    #navig {
      ul {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        li {
          color: #333;
          font-size: 16px;
          line-height: 50px;
          height: 100%;
          float: left;
          width: 120px;
          // width: 106px;
          padding: 0;
          text-align: center;
          a {
            display: block;
            width: 100%;
            height: 100%;
            min-width: 100px;
          }
          a.table {
            color: #f75a31;
          }
        }
        li:hover a {
          color: #f75a31;
        }
      }
    }
  }
  .logos {
    float: left;
    height: 43px;
    width: 210px;
    margin-top: -2px;
    a {
      display: block;
      width: 100%;
      height: 100%;
      img {
        width: 210px;
        height: 43px;
      }
    }
  }
  .table {
    width: 73%;
    height: 50px;
  }
  /* 登录注册*/
  .login {
    position: fixed;
    z-index: 999;
    width: 100%;
    height: 110%;
    top: -50px;
  }
  .loginBg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: #000;
    opacity: 0.6;
    z-index: 100;
  }
  .loginBox {
    width: 430px;
    height: 410px;
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    margin: auto;
    background: #fff;
    z-index: 101;
  }
  .xieyi {
    font-size: 12px;
    clear: #7dc6fd;
    height: 21px;
  }
  .xieyi span {
    color: #7dc6fd;
    cursor: pointer;
  }
  .el-tabs__item {
    width: 215px;
    height: 70px;
    text-align: center;
    line-height: 90px;
    font-size: 18px;
  }
  .el-tabs__active-bar {
    background-color: #fc4147;
  }
  .el-tabs__item.is-active {
    color: #fc4147;
  }
  .el-tabs__header {
    margin: 0;
  }
  .el-tabs__content {
    padding: 40px;
  }
  .el-input {
    width: 100%;
  }
  ::-ms-clear,
  ::-ms-reveal {
    display: none;
  }
  .el-input__inner {
    height: 40px;
    border: 1px solid #e7e7e7;
    padding-left: 40px;
    border-radius: 0;
  }
  .inputLeft {
    width: 240px;
    float: left;
  }
  .el-button {
    color: #333;
    width: 100px;
    line-height: 38px;
    border: 1px solid #e7e7e7;
    float: right;
    padding: 0;
  }
  .validCodeRight {
    width: 100px;
    height: 40px;
    float: right;
    margin-left: 10px;
  }
  .validCodeRight img {
    width: 98px;
    height: 38px;
    vertical-align: inherit;
    border: 1px solid #e7e7e7;
  }
  .el-button:focus,
  .el-button:hover {
    border: none;
  }
  .inputRight:focus,
  .inputRight:hover {
    border-color: #e5e5e5;
    color: #666;
    background: #e5e5e5;
  }
  .el-button--primary {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    background: #fc4147;
    color: #fff;
    font-size: 18px;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: #ff3e41;
    color: #fff;
    border-color: #ff3e41;
  }
  .el-collapse {
    border: 0;
    width: 100%;
    margin: -10px 0 10px;
  }
  .el-collapse-item__header {
    border: 0;
    padding-left: 0;
    color: #333;
    font-size: 12px;
    position: relative;
  }
  .loginBox .el-icon-arrow-right:before {
    content: "\E602";
    width: 20px;
    height: 20px;
    display: block;
    line-height: 20px;
    padding-left: 4px;
    border-radius: 50%;
    border: 1px solid #7dc6fd;
    box-sizing: border-box;
    font-size: 8px;
    color: #7dc6fd;
  }
  .el-form-item.is-error .el-input__inner,
  .el-form-item.is-error .el-textarea__inner {
    border-color: #bfcbd9;
  }
  .el-collapse-item__content {
    padding: 0;
  }
  .el-collapse-item__wrap {
    border: 0;
  }
  .longin input {
    background: url("https://aliyunsso.edspay.com/web/login/longin.png")
      no-repeat center left;
    background-position: 0 0;
  }
  .longin.code input {
    background-position: 0 -76px;
  }
  .longin.pass input {
    background-position: 0 -38px;
  }
  .longin.validCode input {
    background-position: 0 -114px;
  }
  i.display {
    width: 38px;
    height: 38px;
    position: absolute;
    top: 0;
    right: 0;
    background: url("https://aliyunsso.edspay.com/web/login/longin.png")
      no-repeat center center;
    background-position: 0 -190px;
  }
  i.display.active {
    background-position: 0 -152px;
  }
  .el-icon-date:before {
    content: " ";
  }
  .del {
    width: 38px;
    height: 38px;
    position: absolute;
    right: 0;
    top: 0;
    line-height: 38px;
    text-align: center;
    color: #999;
    z-index: 999;
  }
  .del i.el-icon-close {
    transition: transform 0.3s;
  }
  .del:hover i.el-icon-close {
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
  }
 
  /* 找回密码 1*/
  .recoverPass {
    width: 540px;
    height: 400px;
    border-radius: 5px;
    background-color: #ffffff;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0px;
    margin: auto;
    z-index: 102;
  }
  .recoverPass .title_item {
    width: 100%;
    height: 68px;
    text-align: center;
    line-height: 90px;
    font-size: 20px;
    font-weight: 500;
    color: #333;
    border-bottom: 2px solid #ddd;
  }
  .recoverPass .Instructions {
    width: 100%;
    height: 119px;
    padding: 0 30px;
  }
  .recoverPass .Instructions .progress {
    width: 160px;
    height: 100%;
    float: left;
  }
  .recoverPass .Instructions .progress i {
    width: 100%;
    height: 2px;
    background: #ccc;
    display: block;
    position: relative;
    top: 33px;
    left: 0;
  }
  .recoverPass .Instructions .progress i i {
    display: block;
    position: absolute;
    top: -4px;
    left: 50%;
    margin-left: -10px;
    width: 10px;
    height: 10px;
    border: 0;
    border-radius: 50%;
    background: #ccc;
  }
  .recoverPass .Instructions .progress.active i {
    background: #fc4147;
  }
  .recoverPass .Instructions .progress.active i i {
    width: 20px;
    height: 20px;
    top: -9px;
    border: 5px solid #fc4147;
    background: #fff;
  }
  .recoverPass .Instructions .progress p {
    width: 100%;
    height: 20px;
    font-family: PingFangSC;
    font-size: 14px;
    text-align: center;
    color: #cccccc;
    margin-top: 68px;
  }
  .recoverPass .Instructions .progress.active p {
    color: #fc4147;
  }
  .recoverPass .from1 {
    width: 100%;
    padding: 0 95px;
  }
  /* 找回密码 2*/
  .from2 {
    width: 100%;
    padding: 0 95px;
  }
  .from2 i.log,
  .from3 i.log {
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
    background: url(https://aliyunsso.edspay.com/web/login/success.png);
  }
  .from2 p {
    width: 420px;
    height: 24px;
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: #333333;
    letter-spacing: -1px;
    margin: 20px 0 30px -35px;
  }
  .from3 p {
    width: 100%;
    height: 28px;
    font-size: 20px;
    font-weight: 500;
    text-align: center;
    color: #333333;
    margin-top: 20px;
    margin-bottom: 30px;
  }
  span i.el-icon-date {
    font-size: 20px;
  }
}
#headTable.active {
  position: absolute;
  background: none;
  border-bottom: 0px solid #e7e7e7;
  z-index: 9;
  .titleTable #navig ul li{
    color: #fff;
  }
.titleTable #navig ul li a.table {
    color: #fff;
    font-weight: 600;
}
  .header_top{
    color: #fff;
  }
  .header_top i.line{
    background:#fff;
  }
}
#headTable.bag{
  background:#fff;
  .titleTable #navig ul li{
    color: #333;
  }
  .titleTable #navig ul li a.table {
    color: #f75a31;
    font-weight: 400;
  }
  .header_top{
    color: #999;
  }
  .header_top i.line{
    background:#999;
  }
}

/* 弹框样式开始 */

.el-message-box__headerbtn:focus .el-message-box__close,
.el-message-box__headerbtn:hover .el-message-box__close {
  transform: rotate(90deg);
  color: #999;
  transition: transform 0.3s;
}

.el-message-box {
  width: 360px;
}

/* 选择我要出借注册成功样式 */
.alert1 {
  // width: 390px;
  // height: 296px;
  margin: -39px auto;
  .money {
    position: absolute;
    top: 54px;
    width: 300px;
    font-size: 24px;
    text-align: center;
    color: #d5a54b;
  }
  .imgBox {
    width: 259px;
    height: 178px;
    margin: 0 auto;
    background: url(https://aliyunsso.edspay.com/web/login/cj_registerSuccess.png?v=1.1)
      center center;
    background-size: 100% 100%;
  }
  .status {
    display: block;
    margin-top: 9px;
    width: 100%;
    height: 36px;
    font-size: 24px;
    line-height: 36px;
    text-align: center;
    color: #000;
    margin-bottom: 16px;
  }
  .introduce {
    display: block;
    width: 100%;
    font-family: PingFangSC;
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    color: #666666;
    margin-top: 9px;
  }
  .tips{
    display: block;
    width: 100%;
    font-family: PingFangSC;
    font-size: 12px;
    font-weight: 500;
    text-align: center;
    color: #666666;
    margin-top: 5px;
    line-height: 20px;
  }
}
.el-button--primary.determine {
  /* 确定按钮样式 */
  border: 0;
  width: 280px;
  height: 50px;
  padding:0px;
  background: #FF5B4C;
  border: 0 solid #FF5B4C;
  border-radius: 28.8px;
  // background: url(https://aliyunsso.edspay.com/web/login/btn.png) center center;
  // background-size: 100% 100%;
  margin: 0;
  span {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 20px;
    line-height: 55px;
    text-align: center;
    color: #fff;
  }
}
.register-div  .el-message-box__btns{
     padding: 25px 20px 30px 20px;
    text-align:center;
}
.el-message-box__btns{
   padding: 10px 20px;
   button.determine {
    margin: 0;
  }
}


.el-button.goBorrowBtn,.el-button.goShoppingBtn{
     width: 135px;
     height: 50px;
     border: 1px solid #FF5B4C;
     border-radius: 28px;
     background: #fff;
     color: #FF5B4C;
     font-size: 20px;
     padding: 0;
     margin-bottom: 30px;
     &:hover{
        background: #FF5B4C;
        color: #fff;
     }
 }
 .el-message-box__btns{
   text-align:center;
 }
 .el-message-box__btns button:nth-child(2){
   margin-left: 24px;
 }

/* 开通存管样式 */

.alert2 {
  width: 300px;
  height: 322px;
  margin: -30px auto;
  .open {
    display: block;
    width: 100%;
    height: 22px;
    text-align: center;
    font-size: 20px;
    color: #333333;
  }
  i.line {
    display: block;
    width: 360px;
    height: 2px;
    background-color: #dddddd;
    margin-left: -30px;
    margin-top: 10px;
  }
  .imgBox {
    width: 281px;
    height: 174px;
    margin: 25px auto;
    background: url(https://aliyunsso.edspay.com/web/login/openBank.png) center
      center;
    background-size: 100% 100%;
  }
  i.copy {
    display: block;
    width: 260px;
    font-size: 16px;
    text-align: center;
    color: #333333;
    margin: 0px auto;
  }
}

.el-button--primary.openBtn {
  width: 281px;
  height: 80px;
  background: url(https://aliyunsso.edspay.com/web/login/openBankBtn.png) center
    center;
  background-size: 100% 100%;
  margin: 0;
  border: 0;
  margin-right: 20px;
}

/* 开通存管成功弹窗 */

.alert3 {
  width: 300px;
  height: 322px;
  margin: -30px auto;
  .open {
    display: block;
    width: 100%;
    height: 22px;
    text-align: center;
    font-size: 20px;
    color: #333333;
  }
  i.line {
    display: block;
    width: 360px;
    height: 2px;
    background-color: #dddddd;
    margin-left: -30px;
    margin-top: 10px;
  }
  .imgBox {
    width: 281px;
    height: 174px;
    margin: 25px auto;
    background: url(https://aliyunsso.edspay.com/web/login/openBank.png) center
      center;
    background-size: 100% 100%;
  }
  i.copy {
    display: block;
    width: 260px;
    font-size: 16px;
    text-align: center;
    color: #333333;
    margin: 0 auto;
  }
  i.falso {
    position: absolute;
    width: 300px;
    margin: 0 auto;
    text-align: center;
    top: 380px;
    font-size: 12px;
    color: #999999;
  }
}

.el-button--primary.openBtn1 {
  width: 130px;
  height: 40px;
  border: 0;
  background-color: #fc4147;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  padding: 0;
  margin: 0 20px 30px 0;
}

.el-button--default.cancel {
  width: 130px;
  height: 40px;
  margin: 0 10px 30px 0;
  background-color: #ffffff;
  border: solid 1px #fc4147;
  font-size: 18px;
  line-height: 40px;
  text-align: center;
  color: #fc4147;
  padding: 0;
}

/*  弹框样式结束 */

.fenye {
  margin-top: 30px;
  margin-bottom: 50px;
  width: 100%;
  height: 40px;
  text-align: center;

  /* 分页的效果规范开始 */
  .el-pagination button{
     width: 40px;
     height: 35px;
     border: 1px solid #E5E5E5;
    border-radius: 2px;
  }
  .el-pagination button.btn-prev{
    margin-right: 8px;
  }
  .el-pagination button.btn-next{
    margin-left: 8px;
  }
  .el-pager li {
    cursor: pointer;
    width: 35px;
    height: 35px;
    line-height: 35px;
    margin-right: 3px;
    border: 1px solid #E5E5E5;
    border-left:1px solid #E5E5E5!important;
    border-radius: 2px;
  }
  .el-pagination .btn-next .el-icon,
  .el-pagination .btn-prev .el-icon {
    font-size: 16px;
  }
/*   .el-pagination button.disabled {
    display: none;
  } */
  .el-pagination button:hover {
    color: #333;
    background-color: #eeeeee;
  }
  .el-pager li.active {
    border-color: #FF5B4C;
    background-color: #FF5B4C;
    color: #fff;
    border-radius: 2px;
  }
  .el-pager li:hover {
    border-color: #FF5B4C;
    background-color: #FF5B4C;
    color: #fff;
  }
  /*分页的效果规范结束 */
}
</style>
<style lang="scss" scoped>
em,
i {
  font-style: normal;
  vertical-align: middle;
}
</style>
