<template>
  <div class="coupon-div" :style="{background: 'url('+backgrounds[0]+')'}" >
    <!--{{backgrounds}}-->
    <div class="coupon-main">
      <!--左侧-->
        <div class="coupon-left">
        <div class="text-up">
          <span class="coupon-name">{{name}}</span>
          <span class="aprTime" v-if="couponType == 2&&limitUptime!='无限制'">{{limitUptime}}</span>
          </div>
        <div class="coupon-text">

          <p v-if="couponType == 1&&!isExchange">{{limitMonth}}</p>

          <div class="upgrate-div" v-if="couponType == 2">
            <p>{{limitBorrowTime}}</p>
            <p>{{limitUpMoney}}</p>
          </div>

        <div class="coupon-btn" v-if="isExchange&&!exchanging&&backgrounds[1]==1" @click="useCoupon">兑换现金</div> 

          <span class="expire-time">

            <p v-if="useType==1 ">使用时间：<span class="time-font">{{usedTime}}</span></p>  <!-- 已使用 -->
            <span v-else-if="useType==0">有效期至：<span class="time-font">{{endTime}}</span></span>
            <span v-else>失效时间：<span class="time-font">{{endTime}}</span></span>

            <span v-if="useType==0 && !(exchanging && isExchange) &&remainDays<1&&backgrounds[1]==1">(即将失效)</span>
            <span v-if="useType==0 && !(exchanging && isExchange)&&(remainDays>=1&&remainDays<=7&&backgrounds[1]==1)">({{remainDays}}天后失效)</span>
            <span v-if="useType==0 && !(exchanging && isExchange)&&remainDays&&backgrounds[1]==1>7"></span>

          </span>
        </div>
        <div class="coupon-option" v-if="backgrounds[1]==1">
        </div>
      </div>
      <!--右侧-->
      <div class="coupon-right">
        <p class="text-down">{{limitMoney}}</p>
        <div class="coupon-red" v-if="couponType==1"><span>¥</span>{{amount}}</div>
        <div class="coupon-red" v-if="couponType==2">{{upApr}}<span>%</span></div>
        <div class="coupon-red" style="font-size: 36px" v-if="couponType==3"><span>¥</span>{{amount}}</div>
        <router-link to="/invest"><div class="use-coupon" v-if="useType=='0'">点击使用</div></router-link>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          
        }
      },
      props: {
        //couponType 1.红包 2.加息券 3.体验券
        //useType -1.过期 0.未使用 1.已使用 2.无效
        couponType: Number,
        useType: String,
        isExchange: Boolean, // 红包是否可兑换
        exchanging:{         // 正在兑换
          type:Boolean,
          default: false
        },
        name: String, // 优惠券名字
        limitMoney: String,  // 限制金额
        limitMonth: String, // 月份
        endTime: String, // 结束时间
        id: '',  // id
        amount:{         // 总金额
          type:Number,
          default: 0
        },
        upApr:{         // 加息
          type:Number,
          default: 0
        },
        remainDays:{   // 剩余几天
          type:Number,
          default: 0
        },
        usedTime: {   // 使用时间
          type:String,
          default: ""
        },
        limitUptime: {   // 加息天数
          type:String,
          default: ""
        },
        limitUpMoney: {   // 最高加息
          type:String,
          default: ""
        },
        limitBorrowTime:{   // 加息期限方式
          type:String,
          default: ""
        },
      },
      methods: {
        useCoupon () {
          if (this.isExchange) {
            this.$emit("openDialog",this.id)
          } else if (this.useType == 3) {
          }
        }
      },
      computed: {
        //红包加息券背景图   type 1.立即 2.已使用 3.已过期
        backgrounds () {
          let background = ''
          let type = 0
          switch (this.useType) {
            case '1':
              background="https://aliyunsso.edspay.com/web/myAccount/ysybg.png";
              type = 2
              break;
            case '-1':
              background="https://aliyunsso.edspay.com/web/myAccount/Invalid.png";
              type = 3
              break;
            case '3':
              background="https://aliyunsso.edspay.com/web/myAccount/wsy.png";
              type = 1
              break;
            case '0':
              background="https://aliyunsso.edspay.com/web/myAccount/wsy.png";
              type = 1
              break;
          }
          return [background,type]
        }
      }
    }
</script>
<style scoped>
  .coupon-div{
    width: 394px;
    height: 135px;
    background-color: #ffffff;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 30px;
  }
  .aprTime {
    padding: 1px 6px;
    border: 1px solid #FF5D5F;
    border-radius: 2px;
    font-size: 12px;
    color: #FF5D5F;
    line-height: 20px;
  }
  .coupon-main{
    height:100%;
    position: relative;
    display: flex;
    flex-direction: row;
  }
  .coupon-left {
    width: 274px;
    padding: 17px 0px 14px 13px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap
  }
  .coupon-right {
    text-align: center;
    width: 120px;
    padding-top: 17px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .use-coupon {
    width: 72px;
    height: 22px;
    font-size: 14px;
    text-align:center;
    border: 1px solid #FFFFFF;
    border-radius: 100px;
    color: white;
    cursor: pointer;
    margin-top: 5px;
  }
  .coupon-text{
    font-size: 14px;
    color: #808080;
    height: 85px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  }
  .coupon-text p{
    line-height: 20px;
    margin-top: 10px;
  }
  .expire-time {
    font-size: 12px;
  }
  .time-font {
    font-size: 12px;
  }
  .coupon-option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 13.9px;
    letter-spacing: 0.4px;
    color: #ff6e30;
    margin-top: 15px;
    height: 30px;
  }
  .coupon-btn {
    width: 80px;
    height: 30px;
    background: white;
    border-radius: 4px;
    margin-top: 20px;
    border: solid 1px #ff5b4c;
    font-size: 14px;
    text-align: center;
    line-height: 28px;
    color: #ff5b4c;
    cursor: pointer;
  }
  /*介绍*/
  .coupon-title{
    /*position: relative;*/
    display: flex;
    flex-direction: row;
  }
  .coupon-red{
    font-size: 42px;
    line-height: 40px;
    color: #ffffff;
    margin: 13px 0 0 0;
    text-align: center;
  }
  .coupon-red span{
    vertical-align: baseline;
    font-size: 18px;
  }
  .text-up{
    font-size: 18px;
    line-height: 20px;
    letter-spacing: 0.5px;
    text-align: left;
    color: #333333;
  }
  .text-down{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.4px;
    color: #ffffff;
  }
  /*可用日期*/
  .coupon-time{
    position:absolute;
    bottom: 64px;
  }
  .coupon-time p{
    font-size: 14px;
    line-height: 14px;
    color: #999999;
  }
  .coupon-time p:nth-of-type(2){
    margin-top: 7px;
  }
  /*剩余日期*/
  .coupon-rest{
    position: absolute;
    bottom: 30px;
    font-size: 14px;
    line-height: 14px;
    color: #fd6e3b;
  }
  .mg20{
    margin-top: 20px;
  }
  /* 加息div */
  .upgrate-div {
    margin-top: 5px;
    line-height: 16px;
  }
  .upgrate-div p {
    line-height: 17px;
    margin-top: 3px;
  }
</style>
