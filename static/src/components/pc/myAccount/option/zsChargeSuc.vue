<template>
  <div>
    <div>
      <ac-option :type=1 title="充值成功" :btnNumber=2 btnOne="继续充值" btnTwo="立即出借" sucReason=""
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
