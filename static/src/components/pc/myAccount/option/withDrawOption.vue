<template>
  <div>
    <div v-if="backType==1">
      <ac-option :type=1 title="恭喜您,  提现成功" :btnNumber=1 btnOne="完成" sucReason="提现请求已成功提交，15：00前发起的提现，T+1天到账；15：00后发起的提现，T+2天到账"
                 clickOne="/myAccount/accountHome"></ac-option>
    </div>
    <div v-if="backType==2">
      <ac-option :type=2 title="提现失败，请稍后重试" :btnNumber=1 btnOne="重试" reason="失败原因失败原因失败原因"></ac-option>
    </div>
    <div v-if="backType==3">
    <ac-option :type=1 title="恭喜您,  提现成功" :btnNumber=1 btnOne="完成" sucReason="提现成功，5万以下普通提现当日可到账，
    5万以上大额提现工作日9:00-16:30银行受理后到账" clickOne="/myAccount/accountHome"></ac-option>
    </div>
  </div>
</template>
<script>
  import option from '../../../public/account-option.vue'
  export default {
    data () {
      return{
        backType:1
      }
    },
    components: {
      'ac-option': option
    },
    methods: {},
  }</script>
<style scoped>
  .single-main {
    height: 500px !important;
  }
</style>
