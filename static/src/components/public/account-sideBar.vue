<template>
    <div class="account-sideBar">
        <!-- 侧边栏顶部 -->
        <div class="sideBar-top">
            <!-- 头像 -->
            <div class="sideBar-head" @mouseenter="headHover=true" @mouseleave="headHover=false" @click="changeHead"
                 :style="{backgroundImage:'url('+lastUrl+')',backgroundPosition: 'center center'}">
              <span v-if="headHover">更换头像</span>
            </div>
            <!-- 电话 -->
            <p class="sideBar-tel">{{info.hideMobilePhone}}</p>
            <!-- vip等级 -->
            <div class="sideBar-vip">
                <img src="https://aliyunsso.edspay.com/web/myAccount/vip_03.png">
                <span>VIP</span>
                <span>{{info.vipLevel}}</span>
            </div>
            <!-- 账户特权 -->
            <div class="sideBar-icon">
                <i :class="{vip: isVip}"></i>
                <i :class="{phone: user.mobilePhoneStatus}"></i>
                <i :class="{mail: user.emailStatus}"></i>
            </div>
            <div class="risk-result">
              <div class="result-box">
                <div class="result-title">风险测评:&nbsp;&nbsp;</div>
                <!-- <div>{{info.riskResult ? info.riskResult:'无'}}</div> -->
                <div class="result-style" v-if="info.riskResult == 0">无</div>
                <div class="result-style" v-if="info.riskResult == 1">保守型</div>
                <div class="result-style" v-if="info.riskResult == 2">稳健型</div>
                <div class="result-style" v-if="info.riskResult == 3">激进型</div>
                <div class="result-end" @click="goRisk">{{info.riskResult == 0 ? '去测评':'重新测评'}}
                  <!-- <i class="el-icon-arrow-right"></i> -->
                </div>
              </div>
            </div>
        </div>
        <!-- 侧边栏列表 -->
        <div class="sideBar-bottom">
            <ul class="sideBar-list">
              <!-- @click="chooseItem(index,item.route)" :class="{active:isActive == index}" -->
                <li v-for="(item,index) in list">
                  <!--跳转路由-->
                  <router-link :to="item.route" active-class="active">
                    <i class="title_icon iconfont" v-html="item.iconFont"></i>
                    <span class="side-title">{{item.title}}</span>
                    <!-- 如果type为coupon并且红包数>0 显示红色气泡 -->
                    <span v-if="item.type=='coupon'&&info.redNumber>0" class="redCount">{{info.redNumber<99?info.redNumber:99}}</span>
                    <!-- <i class="el-icon-arrow-right"></i> -->
                  </router-link>
                </li>
            </ul>
        </div>
      <!--上传头像弹出框-->
      <my-upload
        field="img"
       @crop-success="cropSuccess"
       @crop-upload-success="cropUploadSuccess"
       @crop-upload-fail="cropUploadFail"
       v-model="isUpload"
       :url="url+'/user/uploadUserHeadImage'"
       :width="300"
       :height="300"
       :params="params"
       img-format="png">
      </my-upload>
    </div>
</template>
<script>
  import myUpload from 'vue-image-crop-upload/upload-2.vue'
    export default {
        data () {
            return {
              imageUrl: '',
              isActive: 0,
              url: global.ajaxUrl,
              params: {},
              headHover: false, // 显示上传头像
              isUpload: false, // 上传窗口
              isVip: true,
              isPhone: false,
              isMail: false,
              myTel: '',
              headSrc:'https://aliyunsso.edspay.com/web/myAccount/%E5%8D%A1%E5%88%B8/liXocoRqA3AVo.jpg',
              bigHeadStyle: {background:'url(https://aliyunsso.edspay.com/web/myAccount/%E5%8D%A1%E5%88%B8/liXocoRqA3AVo.jpg) no-repeat'},
              list:[
                {
                        iconFont:'&#xe663;',
                        title: '账户主页',
                        route: '/myAccount/accountHome'
                    },
                    {
                       iconFont:'&#xe664;',
                        title: '我的资产',
                        route: '/myAccount/accountAsset'
                    },
                    // {
                    //     title: 'E起赚',
                    //     route: '/myAccount/current'
                    // },
                    {
                        iconFont:'&#xe665;',
                        title: '资金明细',
                        route: '/myAccount/accountDetail'
                    },
                    {
                        iconFont:'&#xe666;',
                        title: '出借记录',
                        route: '/myAccount/investRecord'
                    },
                    {
                        iconFont:'&#xe667;',
                        title: '回款计划',
                        route: '/myAccount/myBackPlan'
                    },
                    {
                        iconFont:'&#xe668;',
                        title: '银行卡',
                        route: '/myAccount/accountCard'
                    },
                    {
                        iconFont:'&#xe669;',
                        title: '账户设置',
                        route: '/myAccount/mySetting'
                    },
                    {
                        iconFont:'&#xe66a;',
                        type: 'coupon',
                        title: '我的红包',
                        route: '/myAccount/myCoupon'
                    },
                    {
                        iconFont:'&#xe61e;',
                        title: '会员福利',
                        route: '/myAccount/VipBenefits'
                    },
                    {
                        iconFont:'&#xe66b;',
                        title: '信息通知',
                        route: '/myAccount/myMessage'
                    },
                    // {
                    //     title: '活动专区',
                    //     route: '/myAccount/activityArea'
                    // },
                    {
                      iconFont:'&#xe66c;',
                      title: '好友邀请',
                      route: '/myAccount/myNewInvatation'
                    }
                ],
              info: {},
              user: {},
//              头像
              show: true,
              imgDataUrl: '',
              lastUrl : '',
            }
        },
        components: {
          'my-upload': myUpload
        },
        props: {
            myLevel: Number
        },
        created () {
          this.getInfo()
        },
        methods : {
          sigeinfo(val1,val2){
            this.$emit('sigeinfo',val1,val2)
          },
            // 侧边栏选中效果 跳转路由
            chooseItem(index,route) {
                this.isActive=index;
                this.$router.push(route)
            },
            // 显示换头像弹窗
            changeHead () {
              this.isUpload = true
            },
            // 获取信息
            getInfo () {
                global.http.post_(this,"/account/basic",{},data => {
                  if (data.data.resCode == 1) {
                  this.info = data.data.resData.basicModel
                  if(data.data.resData.basicModel.avatarUrl){
                    this.lastUrl = data.data.resData.basicModel.avatarUrl
                  } else {
                    this.lastUrl = 'https://aliyunsso.edspay.com/web/myAccount/header_bg.png';
                  }
                }
              })
              global.http.post_(this,"/member/security/settingInfo",{},data => {
                this.user = data.data.resData.userIdentify
              })
            },
          // 上传图片
          toggleShow() {
            this.show = !this.show;
          },
          cropSuccess(imgDataUrl, field){
            console.log(imgDataUrl)
            this.imgDataUrl = imgDataUrl;
            this.params = {
              image:imgDataUrl,
              token: this.getCookie('token')
            }
            global.http.post(this,"/user/uploadUserHeadImage",{
              image: imgDataUrl
            },data => {
              
            })
          },
          cropUploadSuccess(jsonData, field){
            this.lastUrl =  this.imgDataUrl
          },
          cropUploadFail(status, field){
          },
          //去测评
          goRisk() {
            this.$router.push('/riskAssessment/riskAssessment')
          }
        }
    }
</script>
<style scoped>
    .redCount {
      position: absolute;
      top: 14px;
      left: 105px;
      background: url(https://aliyunsso.edspay.com/web/myAccount/qp.png);
      width: 16px;
      height: 16px;
      line-height: 16px;
      font-size: 12px;
      color: #FFFFFF;
      text-align: center;
    }
    .confirm-btn{
      margin-top: 0px;
      margin-right: 30px;
    }
    .account-sideBar{
        width: 250px;
        min-height: 990px;
        margin-right: 20px;
    }
    .sideBar-top{
        height:275px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        background: #fff;
        margin-bottom: 20px;
        padding-bottom: 10px;
    }
    .sideBar-head{
        width: 72px;
        height: 72px;
        margin-top:20px;
        border-radius:50%;
        /* border:5px solid #ffffff; */
        background-color: #ccc;
        background-size: 72px 72px;
        /* box-shadow: 0px 2px 3px 0 rgba(0, 0, 0, 0.14); */
        
    }
    .sideBar-tel{
      font-size:16px;
      line-height: 22px;
      margin-top:8px;
    }
    .sideBar-vip{
      margin-top:9px;
      position:relative;
      color:white;
      font-size:10px;
      line-height: 10px;
    }
    .sideBar-vip span:nth-child(2){
        position:absolute;
        right:24px;
        top: 6px;
    }
     .sideBar-vip span:nth-child(3){
        position:absolute;
        left:45px;
        top: 6px;
    }
    .risk-result{
      width: 100%;
    }
    .result-box{
      width: 158px;
      height: 35px;
      margin: 0 auto;
      color: #333;
    }
    .result-box div{
      font-size: 12px;
      line-height: 35px;
      position: relative;
      float: left;
    }
    .result-box .result-end{
      float: right;
      color: #55B4FD;
      cursor: pointer;
    }
    .result-box .result-end .el-icon-arrow-right{
      right: -13px;
      color: #55B4FD;
    }
    .sideBar-icon{
        padding:24px 0px 16px 0;
    }
    .sideBar-icon i:nth-child(1) {
        margin-left:0px;
    }
    .sideBar-icon i {
       display:inline-block;
       width: 30px;
       height: 30px;
       margin-left:14px;
       
    }
    .sideBar-icon i:nth-child(1){
        background: url('https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/zhanghu_qietu.png');
    }
    .sideBar-icon i:nth-child(2){
        background: url('https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/zhanghu_qietu.png') 0px 135px;
    }
    .sideBar-icon i:nth-child(3){
        background: url('https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/zhanghu_qietu.png') 0px 65px;
    }
    .vip {
      background: url('https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/zhanghu_qietu.png') 0px -35px !important;
      background-size: 100% 100%;
    }
    .phone {
      background: url('https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/zhanghu_qietu.png') 0px 100px !important;
    }
    .mail {
      background: url('https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/zhanghu_qietu.png') 0px 30px !important;
    }
    .sideBar-bottom{
      background: #fff;
      padding: 0 30px;
    }
    .sideBar-list{
      height:100%;
      width:100%;
      font-size:20px;
    }

    .sideBar-list li {
        height:68px;
        line-height:68px;
        position:relative;
        cursor:pointer;
        width: 100%;
        border-bottom: 1px solid #E5E5E5;
        color: #333;
    }
    .sideBar-list li:last-child{
      border-bottom: none;
    }
    .sideBar-list li a span{
      margin-left: 20px;
    }
   .sideBar-list li a .title_icon{
          font-size: 18px;
          margin-left: 25px;
          
        }
    .sideBar-list li:hover a{
      display: block;
      width: 100%;
      height: 100%;
      background:#ffffff;
      /* text-align: center; */
     color: #FF5B4C;
    }
    .side-title {
        position: absolute;
        left:42px;
        top:0;
        font-size: 16px;
        height: 100%;
    }
    .el-icon-arrow-right{
        position:absolute;
        right:42.6px;
        font-size:2px;
        line-height:40px;
    }
    .href-div{
      width: 100%;
      height:100%;
    }

    .sideBar-list a{
      display: block;
      width:100%;
      height:100%;
      line-height: 68px;
    }
    .sideBar-list li a.active {
        display: block;
        width: 100%;
        height: 100%;
        color: #FF5B4C;
        background:#ffffff;
    }
    .active2 {
      border-left: 4px solid #fc4147;
      background:#ffffff;
    }
  /*头像*/
  .avatar-uploader {
    line-height: 80px;
    padding-left: 12px;
    color: white;
    font-size: 14px;
  }
  .sideBar-head:hover{
    opacity: 0.5;
    background-color: #000000;
    cursor: pointer;
  }
  .sideBar-head span {
    line-height: 80px;
    padding-left: 12px;
    color: white;
    font-size: 14px;
  }
  .upload-pic {
    display: flex;
    flex-direction: row;
    margin-top: 40px;
  }
  .upload-show{
    width: 320px;
    height: 320px;
    background: lightpink;
    margin-left: 20px;
    position: relative;
  }
  .upload-showPic{
    width: 320px;
    height: 320px;
    position: absolute;
    top: 0px;
    left:0;
    cursor: move;
  }
  .upload-preview{
    display: flex;
    flex-direction: column;
  }
  .upload-preview div{
    width: 120px;
    height: 120px;
    border-radius: 50%;
    background: lightpink;
    margin-left: 20px;
  }
  .upload-preview p {
    font-size: 16px;
    color: #333333;
    margin-top: 20px;
    text-align: center;
    margin-left: 20px;
  }
  .upload-option{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-left: 20px;
    width:320px;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .upload-option span {
    font-size: 14px;
    color: #fc4147;
  }
  .upload-buttons i {
    display: inline-block;
    background: url("https://aliyunsso.edspay.com/web/myAccount/buttons.png");
    width: 15px;
    height: 15px;
    cursor: pointer;
  }
  .upload-buttons i:nth-of-type(1){
    background-position: -2px -3px;
  }
  .upload-buttons i:nth-of-type(2){
    background-position: -2px -23px;
  }
  .upload-buttons i:nth-of-type(3){
    background-position: -2px -43px;
  }
</style>
<style rel="stylesheet/less">
  @import "../../style/account.less";
</style>
