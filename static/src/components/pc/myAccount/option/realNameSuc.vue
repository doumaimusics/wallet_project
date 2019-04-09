<template>
  <div>
    <ac-option :type=1 title="恭喜您，实名认证成功" :btnNumber=2 btnOne="完成"
               btnTwo="去绑卡" clickOne="/myAccount/accountHome" clickTwo="/myAccount/sinaBindCard">
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
<style scoped></style>
