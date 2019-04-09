<template>
    <div class="information">
    	<div class="mationPre">
        <i>1</i><b>项目简介</b>
        <p>E都市钱包所有出借标的均为消费分期类业务资产债权包，资产来源于消费金融平台爱上街。所有用户的出借金额将分散至多个借款人的借款项目中，将因借款人逾期而产生的坏账风险率降至最低，从平台业务模式上全方位保障用户资金安全。</p>
        <i>2</i><b>借款用途</b>
        <p>爱上街优质借款人消费需求</p>
        <i>3</i><b>还款方式</b>
        <p>到期还本付息。利息计算公式为本金*标的年化收益/360*借款期限</p>
        <i>4</i><b>还款来源</b>
        <p>爱上街优质借款人到期还本付息</p>
        <i>5</i><b>还款保障</b>
        <p>消费金融平台优先进行赔付，同时对逾期项目进行合法催收</p>
        <i>6</i><b>业务模式</b>
        <img src="https://aliyunsso.edspay.com/web/invest/information.png" alt="">
        <!--<div class="notes">
          <span class="red">风险提示：理财有风险，出借需谨慎</span>
          <span>出借人需根据平台提供的信息进行独立判断，具有独自承担风险的能力。本项目存在一定的风险，包括但不限于政策风险、流动性风险、再出借风险、信息传递风险、兑付风险和不可抗力风险</span>
        </div>-->
      </div>
    </div>
</template>

<script>
  export default {
	name: 'information',
	data(){
      return {
        
      }
    },
    methods:{
      
    },
  }  
</script>

<style lang="scss" scoped>
    .information{
    	width:100%;
    	height:auto;
      .mationPre{
        padding:40px 0;
        i{
          display: inline-block;
          width:30px;
          height:30px;
          font-size: 16px;
          line-height: 30px;
          text-align: center;
          color: #ffffff;
          margin-right:10px;
          background:url(https://aliyunsso.edspay.com/web/invest/serial.png) center center no-repeat;
          background-size:30px 30px;
        }
        b{
          font-size: 16px;
          line-height: 30px;
          color: #333333;
        }
        p{
          width: 100%;
          height: auto;
          font-size: 14px;
          line-height: 19px;
          color: #333333;
          margin:5px 0 22px;
          padding-left: 40px;
        }
        img{
          display: block;
          height: 401px;
          margin-left: 75px;
        }
        .notes{
          width: 100%;
          padding-left: 40px;
          margin-top: 58px;
          span{
            display: block;
            width: 100%;
            font-size: 12px;
            color: #999;
            letter-spacing: 0px;
          }
          span.red{
            display: block;
            width: 100%;
            font-size: 14px;
            color: #fc4147;
            margin-bottom:10px;
          }
        }
      }
    }
</style>