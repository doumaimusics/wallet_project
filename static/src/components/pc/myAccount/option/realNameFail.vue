<template>
  <div>
    <ac-option :type=2 title="很抱歉，实名认证失败" :btnNumber=2 btnOne="完成" btnTwo="重试"clickOne="/myAccount/accountHome" clickTwo="myAccount/sinaRealName">
    </ac-option>
  </div>
</template>
<script>
  import option from '../../../public/account-option.vue'
  export default {
    data () {
      return{
      }
    },
    components: {
      'ac-option': option
    },
    methods: {}
  }</script>
<style scoped></style>
