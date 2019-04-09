<template>
  <div>
    <ac-option :type=2 title="很抱歉，浙商银行存管账户开通失败重试" :btnNumber=2
               btnOne="完成" btnTwo="重试" clickOne="myAccount/accountHome" clickTwo="myAccount/openAccount">
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
