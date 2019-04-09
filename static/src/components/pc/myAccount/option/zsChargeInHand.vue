<template>
  <div>
    <div>
      <ac-option :type=3 title="银行处理中" :btnNumber=2 btnOne="继续充值" btnTwo="立即出借" 
      sucReason="银行正在处理该笔交易,请耐心等待,预计30分钟内到账;如有疑问,请拨打客服热线: <span style='color:#008FFF'>400-135-3388</span>" 
      clickOne="/myAccount/accountCharge" clickTwo="/invest"></ac-option>
    </div>
  </div>
</template>
<script>
  import option from '../../../public/account-option.vue'
  export default {
    components: {
      'ac-option': option
    },
  }
  </script>
<style scoped>
  .single-main {
    height: 500px !important;
  }
  
</style>
