<template>
  <div>
    <div class="bank-main">
      <h1>银行卡限额说明</h1>
      <h2>Ⅰ类卡限额如下:</h2>
      <div class="bank-pic"></div>
      <h2>Ⅱ类卡限额：单日最高额度不超过10000元。</h2>
      <h2>Ⅲ类卡账户余额不得超过1000元。</h2>
      <h2>
        <router-link to="/threeCardPc" target="_blank" class="router-color">
        了解银行卡三类账户
        </router-link>
      </h2>
    </div>
  </div>
</template>
<script>
    export default {
        methods: {}
    }</script>
<style scoped>
  .bank-main {
    padding: 50px;
    color: #666666;
    text-align: center;
  }
  .bank-main h1 {
    font-size: 30px;
  }
  .bank-main h2 {
    text-align: left;
    margin-left: 25vw;
    margin-top: 20px;
  }
  .bank-pic {
    margin: 20px auto 0px auto;
    width: 1100px;
    min-height: 1500px;
    background: url("https://aliyunsso.edspay.com/web/myAccount/declaration.png") no-repeat;
    background-size: contain;
    background-position: center;
  }
  .router-color {
    color: #1c8de0;
  }
</style>
