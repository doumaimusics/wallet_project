<template>
  <div>
    <ac-option :type=3 title="银行处理中" :btnNumber=1 btnOne="完成"
    sucReason="5万以下提现当日到账,5万以上大额提现需在工作日9:00-16:30银行受理后到账" 
    clickOne="/myAccount">
    </ac-option>
  </div>
</template>
<script>
  import option from '../../../public/account-option.vue'
  export default {
    data () {
      return{}
    },
    components: {
      'ac-option': option
    },
    methods: {}
  }</script>
<style scoped>
  .single-main {
    height: 500px !important;
  }
</style>
