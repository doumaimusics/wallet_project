<template>
  <div>
    <ac-option :type=2 title="提现失败，请稍后重试" :btnNumber=1 btnOne="重试" reason="失败原因失败原因失败原因"></ac-option>
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
</style>
