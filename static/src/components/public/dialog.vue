<template>
  <div class="dialog-div">
    <el-dialog
      :visible.sync="dialogVisible"
      size="tiny"
      title="提示"
      custom-class="public-dialog"
      :before-close="close">
      <div class="logo"></div>
      <h1 class="dialog-title">{{title}}</h1>
      <h1 class="dialog-content">是否{{type}}成功？</h1>
      <p class="dialog-p">请您在新打开的页面中完成提现，完成之前请不要关闭此页面！</p>
      <div class="dialog-buttons">
        <div class="cancel-btn" @click="clickOne">遇到问题</div>
        <div class="confirm-btn" @click="clickTwo">{{type}}成功</div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import button from './button.vue'
  export default {
    data() {
      return {
        dialogVisible: this.ifOpen
      }
    },
    components: {
      'dialog-button': button
    },
    props: {
      ifOpen: Boolean,
      clickTwo:  {      // 第二个按钮点击事件
        type: Function,
        default: function () {
          console.log('未定义点击事件')
        }
      },
      clickOne:  {   // 第一个按钮点击事件
        type: Function,
        default: function () {
          console.log('未定义点击事件')
        }
      },
      title: String,  // 标题
      type: String    //类型名字
    },
    watch: {
      ifOpen: function (val) {
        this.dialogVisible = val
      }
    },
    methods: {
      close () {
        this.dialogVisible = false
      }
    }
  }
</script>
<style scoped>
  .logo {
    background: url("https://aliyunsso.edspay.com/web/myAccount/icon-tixian-normal.png") no-repeat;
    width: 217px;
    height: 179px;
  }
  .el-dialog__header{
    background-color: grey;
  }
  .dialog-title{
    height: 43px;

  }
  .dialog-div{
    height:auto;
  }
  .dialog-p {
    font-size: 16px;
    color: #666666;
    margin-top: 16px;
    line-height: 22px;
  }
  .dialog-content{
    font-size: 24px;
    font-weight: 500;
    text-align: center;
    color: #333333;
  }
  .dialog-buttons{
    margin-top: 54px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .confirm-btn {
    margin-top: 0px;
    margin-left: 60px;
  }
  .dialog-button{
    margin-top:43px;
    display: inline-block;
  }
  .dialog-button:nth-of-type(2){
    margin-left:15px;
  }
</style>
<style rel="stylesheet/less">
  @import "../../style/account.less";
</style>
