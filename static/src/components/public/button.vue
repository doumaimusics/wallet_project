<template>
    <el-button class="ui-button" :style="style" @click="click" type="text">{{text}}</el-button>
    <!--<div class="ui-button" :style="style" @click="click">{{text}}</div>-->
</template>
<script>
    export default {
        props: {
          text: String,
          click: {
            type: Function,
            default: function () {
              console.log('未定义点击事件')
            }
          },
          backgroundColor: {
            type: String,
            default: function () {
              if (this.backgroundColor === undefined) {
                return '#fc4147'
              }
              if (this.backgroundColor === 'white') {
                return 'white'
              }
              return this.backgroundColor
            }
          }
        },
        data: function () {
          let style= {}
          if (this.backgroundColor === 'white') {
            // 白底大按钮
            style.border = '1px solid #fc4147'
            style.color = '#fc4147'
          }
          if (this.backgroundColor === '#fc4147') {
            style.border = '1px solid #fc4147'
            style.color = 'white'
            style.backgroundColor = '#fc4147'
          }
          return {
            style
          }
        }
    }
</script>
<style scoped>
    .ui-button{
      width: 130px;
      height: 40px;
      font-size: 18px;
      margin-left: 0px;
    }
</style>
