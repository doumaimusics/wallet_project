<template>
  <div class="charge-sum">
    <!-- 顶部提示 -->
    <div class="transfer-p">
      <!-- <i class="bang"></i>
      如遇快捷充值限额较低或充值异常问题，您可以使用开通存管时绑定的银行卡，转账到您的浙商银行存管小账户，完成充值。 -->
      <img src="https://aliyunsso.edspay.com/web/about/pcRevisionSevenThree/pcRechargeOne.png" alt="">
    </div>
    <!-- 卡片 -->
    <div class="transfer-card">
      <!-- left -->
      <div class="card-l">
        <div class="card-img">
          <img class="bank-img"  :src="info.bankPicPath"/>
          <span>{{info.bankName}}</span>
        </div>
        <div class="card-detail"><span>姓名</span>{{info.realNameHide}}</div>
        <div class="card-detail exp-fm"><span>银行账号</span>{{info.bankNo}}</div>
      </div>
      <!-- right -->
      <div class="card-r">
        <div class="card-detail"><span>姓名</span>{{info.userName}}</div>
        <div class="card-detail exp-fm"><span>存管账户</span>{{info.virEcardNo}}<span v-clipboard:copy="info.virEcardNo" v-clipboard:success="onCopy"><img class="copy-btn" src="https://aliyunsso.edspay.com/web/about/pcRevisionSevenThree/cocyBtn.png" alt=""></span></div>
        <div class="card-detail"><span>开户支行</span>{{info.branch}}</div>
        <!-- <div class="bank-name">
          <p>浙商银行</p>
          <p>{{info.userName}}</p>
        </div>
        <div class="cunguan">
          <p>存管帐户<span>{{info.virEcardNo}}</span></p>
          <p>开户银行<span>{{info.branch}}</span></p>
        </div> -->
        <!-- <p class="r-tip">注: 该账号为浙商银行为E都市钱包分配的存管小账户，专用于平台的转账充值。</p> -->
      </div>
    </div>
    <div class="recharge-detail"><img src="https://aliyunsso.edspay.com/web/about/pcRevisionSevenThree/pcRechargeTwo.png" alt=""></div>
    <div class="recharge-ways">
      <h3>转账流程示例</h3>
      <div class="process-btns clear">
        <router-link :to="{path:'/myAccount/RechargeProcess',query:{imgType:'mobile'}}" tag="div">手机银行转账流程</router-link>
        <router-link :to="{path:'/myAccount/RechargeProcess',query:{imgType:'online'}}" tag="div">网上银行转账流程</router-link>
      </div>
    </div>
    <!-- 温馨提示 -->
    <div class="tip-div">
      <h1>温馨提示：</h1>
      <p>1、仅支持使用存管账户绑定的银行卡进行转账充值；</p>
      <p>2、具体各银行卡的转账限额与到账时间取决于对应银行；</p>
      <p>3、充值过程中，转账手续费以银行规定为准，E都市钱包不收取任何手续费。</p>
    </div>
  </div>
</template>
<script>
  import wxToast from '../../../../common/wx/wxToast'
  export default {
    mixins:[wxToast],
    data () {
      return{
        info:[],
      }
    },
    created () {
      this.getInfo ()
    },
    methods: {
      // 获取银行信息
      getInfo () {
        global.http.post(this,"/recharge/transferRecharge",{},data => {
          this.info = data.data.resData
        })
      },
      onCopy (e) {
        this.toast({
          text: '复制成功'
        })
      },

    }
  }
  </script>
<style lang="scss" scoped>
  .transfer-p {
    font-size: 14px;
    color: #666666;
    margin-top: 15px;
    img{
      width: 555px;
      height: 410px;
    }
  }
  // .card-l > p, .card-l >img,.card-l >div,.card-r > p, .card-r >img,.card-r >div {
  //     position: absolute;
  //   }
  .transfer-card {
    width: 968px;
    height: 172px;
    margin-top: 50px;
    background: url(https://aliyunsso.edspay.com/web/about/pcRevisionSevenThree/pcRechargeCard.png);
    background-size: cover;
    position: relative;
    font-size: 14px;
    color: #FFFFFF;
    .account-name {
      font-size: 14px;
      color: #333333;
      top: -25px;
    }
    .bank-name {
      top: 16px;
      left: 57px;
    }
    /* left*/
    .card-l {
      position: relative;
      float: left;
      width: 400px;
      height: 172px;
      padding: 20px 0 0 20px;
        .card-img{
          width: 100%;
          height: 36px;
          position: relative;
          margin-bottom: 38px;
          .bank-img {
            width: 28px;
            height: 28px;
            margin-left: 4px;
            margin-right: 14px;
            top: 4px;
            position: relative;
          }
          span{
            font-size: 16px;
            color: #FFFFFF;
            display: inline-block;
            position: relative;
            top: 10px;
          }
        }
        .card-detail{
          font-size: 16px;
          color: #FFFFFF;
          line-height: 0.213333rem;
          margin-bottom: 10px;
          span{
            font-size: 14px;
            margin-right: 10px;
            font-family: PingFangSC-Regular;
          }
        }
        .card-detail.exp-fm{
          font-family: DIN-Medium;
        }
    }
    /* middle*/
    .card-m {
      position: absolute;
      top: 35px;
      left: 338px;
      font-size: 14px;
      line-height: 14px;
      color: #333333;
      p:nth-of-type(1) {
        margin-bottom: 19px;
      }
      p {
        margin-bottom: 10px;
      }
    }
    /* right*/
    .card-r {
      float: right;
      position: relative;
      width: 400px;
      height: 172px;
      padding-top: 74px;
      padding-left: 20px;
      .copy-btn{
        width: 88px;
        height: 58px;
        position: absolute;
        right: 6px;
        bottom: 28px;
      }
      .card-detail{
        font-size: 16px;
        color: #FFFFFF;
        line-height: 0.213333rem;
        margin-bottom: 10px;
        span{
          font-size: 14px;
          margin-right: 10px;
          font-family: PingFangSC-Regular;
        }
      }
      .card-detail.exp-fm{
        font-family: DIN-Medium;
      }
    }
  }
  .recharge-detail{
    margin-top: 80px;
    img{
      width: 954px;
      height: 343px;
    }
  }
  .recharge-ways{
    padding: 40px 0 50px 20px;
    h3{
      font-family: PingFangSC-Medium;
      font-size: 22px;
      color: #333333;
      margin-bottom: 37px;
    }
    .process-btns{
      width: 100%;
      div{
        width: 262px;
        height: 64px;
        text-align: center;
        line-height: 64px;
        border: 1px solid #E5E5E5;
        color: #508CEE;
        float: left;
        cursor: pointer;
      }
      div:nth-child(1){
        margin-right: 20px;
      }
    }
  }
  .clear{zoom:1;}
  .clear:after{content:"";display:block;clear:both;}
  .tip-div {
    // margin-top: 80px;
    border-top: 1px solid #e5e5e5;
    h1 {
      margin: 48px 0px 20px 20px;
      font-size: 16px;
      color: #333333;
    }
    p {
      margin-bottom: 14px;
      margin-left: 20px;
      font-size: 14px;
      line-height: 14px;
      color: #666666;
    }
  }
</style>
