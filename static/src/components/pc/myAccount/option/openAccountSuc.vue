<template>
  <div>
    <ac-option :type=1 title="恭喜您，成功开通浙商银行存管账户" :btnNumber=1 btnOne="完成" clickOne="myAccount/accountHome"></ac-option>
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
