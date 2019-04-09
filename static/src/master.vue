<template>
  <div id="master">
    <head-table :showHeader="showHeader" :sign='sign' :activeName='activeName' @activeName='sigeinfo'></head-table>
    <div id="contentAll">
      <router-view :sign='sign' @sigeinfo="sigeinfo" @isShowHeader="getShowHeader"></router-view>
    </div>
    <right-table></right-table>
    <footer-content :showHeader="showHeader"></footer-content>
  </div>
</template>

<script>
import header from '../src/components/header';
import footer from '../src/components/footer';
import rightTable from '../src/components/rightTable';

export default {
  name: 'master',
  data() {
    return {
      sign: false,               // 登录框状态
      activeName: 'second',      // 注册登录选项卡默认显示登录
      showHeader:null,    //是否展示头部
    }
  },
  methods: {
    sigeinfo(val1, val2) {
      this.sign = val1
      this.activeName = val2
    },
    getShowHeader(data){//首页传值到头部
      this.showHeader = data
    },
    // 封装的客服聊天方法
    appendScript(id,src) {
      const script = document.createElement('script')
      script.src = src
      script.id = id
      script.language = 'JavaScript'
      script.async  = 'defer'
      document.body.appendChild(script)
    },

  },
  created: function() {
  },
  mounted: function() {
    this.sign = global.alertBox
    this.activeName = global.alertTable

    // 企点客服  已停止使用
    // this.appendScript('qd2852155165400c98d17825b22ecb28ee67d4512bb0',"https://wp.qiye.qq.com/qidian/2852155165/400c98d17825b22ecb28ee67d4512bb0" )
    // this.appendScript('qd28521551656b8e51bf1c011496cc2295614a4297f0','https://wp.qiye.qq.com/qidian/2852155165/6b8e51bf1c011496cc2295614a4297f0')
    // this.appendScript('qd285215516599c2d10080a17fb93f44317e6c97f13b','https://wp.qiye.qq.com/qidian/2852155165/99c2d10080a17fb93f44317e6c97f13b')
    // this.appendScript('qd2852155165e140a006e6e768fcfaba98d82eec1292','https://wp.qiye.qq.com/qidian/2852155165/e140a006e6e768fcfaba98d82eec1292')



     // 小能客服
    // var NTKF_PARAM = {
    //   "siteid": "kf_9511" /*网站siteid*/,
    //   "settingid": "kf_9511_1488165613968" /*代码ID*/,
    //   "uid": "" /*会员ID*/,
    //   "uname": ""/*会员名*/,
    //   "userlevel": "0"/*会员等级*/
    // }
    // const script = document.createElement('script')
    // script.src = 'https://dl.ntalker.com/js/xn6/ntkfstat.js?siteid=kf_9511'
    // script.language = 'JavaScript'
    // document.body.appendChild(script)


    // 七陌客服
    if(this.getCookie('token')){
      window.qimoClientId = {
        userId: this.getCookie('userId'),
        nickName:this.getCookie('nickname'),
        customField: {"nickName":this.getCookie('nickname')}
      }
    }else{
      window.qimoClientId = {
        userId: new Date().getTime(),
        nickName:"游客",
        customField: {"nickName":"游客"}
      }
    }
    
    const script = document.createElement('script')
    script.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&autoShow=false&language=ZHCN'
    script.language = 'JavaScript'
    script.async='async'
    document.body.appendChild(script)
  },

  // watch : {      // 企点客服  已停止使用
  //      // 监听是否显示头部 如果显示添加客服方法
  //   'showHeader' (val) {
  //     if (!val) {
  //       let thisNode = document.getElementById('qd2852155165400c98d17825b22ecb28ee67d4512bb0')
  //       thisNode.parentNode.removeChild(thisNode);
  //       this.appendScript('qd2852155165400c98d17825b22ecb28ee67d4512bb0',"https://wp.qiye.qq.com/qidian/2852155165/400c98d17825b22ecb28ee67d4512bb0" )
  //     }
  //   }
  // },
  components: {
    'headTable': header,
    "rightTable": rightTable,
    'footerContent': footer
  },
}
</script>

<style scoped>
.block {
  position: fixed;
  left: 50%;
  bottom: 50px;
  margin-left: -50px;
}

.placeHolder {
  width: 15%;
  max-width: 182px;
  float: left;
  height: 900px;
}

el-select {
  margin: 20px 0;
}

.twty {
  width: 20%;
}

.thrthr {
  width: 33.3%
}

.twfive {
  width: 25%
}

.twelve {
  width: 12.5%
}

.forty {
  width: 14.2%
}

.eleven {
  width: 11.1%
}

.el-form {
  width: 540px;
  overflow: hidden;
}

a .el-button {
  margin-left: 78px;
  margin-top: 24px;
}

li.el-menu-item {
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
}

li.el-menu-item.is-active {
  background-color: #151515;
  border-left-color: #00cd9a;
}

li.el-menu-item {
  height: 40px;
  line-height: 40px;
}

ul .el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}

* {
  font-family: "PingFang SC",'Microsoft Yahei', '微软雅黑', arial, 'Hiragino Sans GB', Tahoma, Arial, Helvetica, '宋体';
  box-sizing: border-box;
}

body {
  font-family: "microsoft yahei";
  word-wrap: break-word;
}

a {
  text-decoration: none
}

i,em,b {
  font-style: normal;
  font-weight: 100;
}

li {
  list-style: none
}

img {
  vertical-align: middle
}

table {
  border-collapse: collapse;
}

input,textarea {
  outline: none;
}

textarea {
  resize: none;
}

mark {
  background: none;
}
</style>
<style>
  input::-ms-clear{
    display:none;
  }
  input::-ms-reveal{
    display:none;
  }
  .el-message{
    border-radius: 4px;
    /* top:null; */
    height: 40px;
    top: 300px;
    box-shadow: 0 2px 4px rgba(0,0,0,.22), 0 0 6px rgba(0,0,0,.14);
  }
  .el-notification{
    /* bottom:10px !important;
    top:0 !important;
    margin: auto 0;
    min-height: 93px;
    max-height:114px; */ 
  }
</style>

