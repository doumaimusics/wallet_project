<template>
  <div class="single-mask">
    <div class="single-main">
      <div type="primary" element-loading-text="小E正在拼命加载中" v-loading.fullscreen.lock="type==0">
      </div>
      <div class="option-center">
        <div class="option-text" :class="{'mb0':sucReason}">
          <img src="https://aliyunsso.edspay.com/web/myAccount/sucIcon.png" v-if="type==1"/>
          <i class="el-icon-circle-close" v-if="type==2"></i>
          <img src="https://aliyunsso.edspay.com/web/myAccount/hand.png" v-if="type==3"/>
          <div class="option-msg">
            <h1>{{title}}</h1>
            <h1 v-if="money>0">¥{{money | moneyFormat}}</h1>
            <!--原因-->
            <h2 class="suc-reason" v-if="sucReason" v-html="sucReason"></h2>
          </div>
        </div>
        <!--按钮-->
        <div class="option-buttons" v-if="btnNumber == 1">
          <option-button :text="btnOne" class="option-button" :click="goOne"></option-button>
        </div>
        <div class="option-buttons" v-if="btnNumber == 2">
          <div class="option-button cancel-btn" @click="goOne">{{btnOne}}</div>
          <div class="option-button  confirm-btn" @click="goTwo">{{btnTwo}}</div>
        </div>
      </div>
      <div class="tips" v-if="type==3"><span></span>如有疑问，请前往<router-link to="/help" tag="i">帮助中心</router-link></div>
    </div>
  </div>
</template>
<script>
  import button from './button.vue'
  import dialog from './dialog.vue'
  export default {
    components : {
      'option-button': button,
      'option-dialog': dialog
    },
    props: {
      type: Number,  // 1是成功页 2是失败页 3是处理中
      title: String,
      btnNumber: Number,
      btnOne:String,
      btnTwo:String,
      clickOne: String, // 第一个按钮跳转页面
      clickTwo:String, // 第二个按钮跳转页面
      sucReason: String  //成功提示
    },
    data () {
      return {
        ifOpen: false,
        money:0,
      }
    },
    methods: {
      dialogComfirm () {
        this.ifOpen = false
      },
      dialogClose () {
        this.ifOpen = false
      },
      goOne () {
        this.$router.push(this.clickOne)
      },
      goTwo () {
        this.$router.push(this.clickTwo)
      }
    },
    created () {
      this.$route.query.num ? this.money = this.$route.query.num : this.money =0
    }
  }
</script>
<style rel="stylesheet/less">
  @import "../../style/account.less";
</style>
<style lang="scss" scoped>
  .single-main {
    min-height: 431px;
  }
  .option-center{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .option-text{
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 250px;
    margin-bottom: 90px;
    img {
      width: 114px;
    }
  }
  .option-msg {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: center;
    margin-top: 20px;
  }
  .suc-reason {
    margin: 28px 0 40px 0;
    max-width: 900px;
    font-size: 16px;
    color: #999999;
  }
  .option-text h1{
    line-height: 30px;
    font-size: 22px;
    font-weight: 500;
    color: #333333;
  }
  .option-text h1:nth-of-type(2) {
    color: #EF4B31;
    margin-top: 5px;
  }
  .reason{
    font-size: 16px;
    color: #333333;
    margin-top:8px;
  }
  .el-icon-circle-check{
    font-size:40px;
    color:#73d24f;
    display:inline-block;
    text-align: center;
    vertical-align: bottom;
  }
  .el-icon-circle-close{
    font-size:40px;
    color:#e64d43;
    display:inline-block;
    text-align: center;
    vertical-align: bottom;
  }
  .el-icon-loading{
    font-size:40px;
    color:#e64d43;
    display:inline-block;
    text-align: center;
    vertical-align: bottom;
  }
  .option-button{
    display: inline-block;
  }
  .confirm-btn {
    margin-top: 0px;
  }
  .option-button:nth-of-type(2){
    margin-left:40px;
  }
  .option-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .btn2 {
    margin-left: 20px !important;
  }
  .single-icon {
    margin-top: 143px !important;
  }
  .mb0 {
    margin-bottom:0px;
  }
  .tips{
    width: 100%;
    position: relative;
    text-align: center;
    font-size: 16px;
    color: #333333;
    margin-top: 70px;
  }
  .tips span{
    width: 18px;
    height: 18px;
    display: inline-block;
    background-image: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/questionIco.png);
    background-repeat: no-repeat;
    background-size: 18px 18px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
  .tips i{
    color: #508CEE;
    margin-left: 6px;
    cursor: pointer;
  }
</style>

