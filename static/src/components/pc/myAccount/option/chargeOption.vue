<template>
  <div>
    <div v-if="backType==1">
      <ac-option :type=1 title="恭喜您, 充值请求提交成功" :btnNumber=2 btnOne="完成" btnTwo="去出借" sucReason="充值请求已成功提交，请注意查看普通账户资金"
                 clickOne="/myAccount/accountHome" clickTwo="/invest"></ac-option>
    </div>
    <div v-if="backType==2">
      <ac-option :type=2 title="充值失败，请稍后重试" :btnNumber=1 btnOne="重试" reason="失败原因失败原因失败原因"></ac-option>
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
