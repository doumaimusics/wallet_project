<!-- 浙商标的出借确认页 -->
<template>
  <div class="conInvest">
    <div class="bg"></div>
    <div class="xubox_layer alert3">
      <div class="title">{{title}}
        <div class="del reg" @click='close'>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="xubox_page1">
        <el-form :model="ruleForm2" status-icon :rules="rules1" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <div class="phone-div">
                <span  class="phone">验证码已发送至手机{{phone?phone : '' | phoneNumber}}</span>
            </div>
            <el-form-item label="短信验证码" prop="code">
                <el-input type="text" class="inputLeft" v-model="ruleForm2.code" auto-complete="off" placeholder="请输入验证码"></el-input>
                <el-button @click="send(0)" class="inputRight">{{codeText}}</el-button>
            </el-form-item>
            <el-button type="danger" @click="submitForm2('ruleForm2')">提交</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: [,'title','phone','getCode','confirm','code'],
  data() {
    return {
      ruleForm2: {    
        code: '',               // 短信验证码
      },
      codeText:'获取验证码',
      time:60,
      codeFlag:true,
      rescode: false,          // 按钮是否可以点击
      mobleCode: "",           // 手机验证码
      rules1: {
          code: [
            { required: true, message: '验证码不能为空'},
          ]
        }
    };
  },
  methods: {
      submitForm2(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.code.msgCode = this.ruleForm2.code
            this.confirm()
          } else {
            return false;
          }
        });
      },
    close() {
        this.$emit('closeDialog', false)
    },
    send(val) {
        let that = this;
        // this.showBtn = false;
        if (this.time != 60) {
            return
        }
        val == 0? this.getCode() : ''
        let timer = window.setInterval(function(){
            if((that.time--) <= 0) {
                that.time = 60;
                that.codeText = '重新发送';
                window.clearInterval(timer);
            } else {
                that.codeText = that.time + '秒'
            }
        },1000)
    },
  },
  created(){ 
      this.send(1)
  }
};
</script>

<style lang="scss" scoped>
.conInvest {
  .bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: #000;
    z-index: 100;
    opacity: 0.6;
  }
  .xubox_layer {
    position: fixed;
    width: 540px;
    height: 400px;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
    border-radius: 5px;
    .title {
      width: 100%;
      height: 67px;
      border-top-radius: 5px;
      border-bottom: 1px solid #e7e7e7;
      font-size: 18px;
      line-height: 67px;
      text-align: center;
      color: #333;
      .del.reg {
        width: 50px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
        line-height: 50px;
        cursor: pointer;
        text-align: center;
        color: #999;
      }
      .del.reg i.el-icon-close {
        transition: transform 0.3s;
      }
      .del:hover i.el-icon-close {
        transform: rotate(90deg);
      }
    }
    .xubox_page {
      width: 100%;
      height: 118px;
      border-bottom: 1px solid #e7e7e7;
      padding-top: 17px;
      h3 {
        width: 100%;
        height: 30px;
        text-align: center;
        font-size: 22px;
        color: #333;
      }
      .denailTime {
        width: 100%;
        height: 20px;
        text-align: center;
        font-size: 14px;
        color: #333;
      }
      .denail {
        width: 50%;
        float: left;
        font-size: 16px;
        text-align: center;
        color: #666666;
        height: 22px;
        line-height: 22px;
        margin-top: 10px;
        em {
          color: #333;
        }
      }
    }
    .investDetail {
      width: 100%;
      height: 373px;
      .denail {
        width: 100%;
        height: 30px;
        text-align: left;
        font-size: 18px;
        color: #666;
        margin-top: 15px;
        padding-left: 175px;
        em {
          font-size: 22px;
          color: #333;
        }
      }
      .denail.fz {
        height: 33px;
        em {
          font-size: 24px;
          color: #ff3e41;
        }
      }
      .phoneCode {
        width: 100%;
        height: 40px;
        padding: 0;
        padding-left: 95px;
        margin-top: 25px;
        position: relative;
        i.iconfont {
          color: #ccc;
          position: absolute;
          left: 110px;
          top: 10px;
          width: 20px;
          height: 20px;
          display: block;
          font-size: 20px;
          z-index: 1;
        }
        .inputLeft {
          float: left;
          width: 210px;
          height: 40px;
          .el-input__inner {
            width: 210px;
            height: 40px;
            padding-left: 40px;
            border: solid 1px #e7e7e7; // background:url(&#xe602;) 14px center no-repeat;
          }
        }
      }
      .inputRight {
        width: 130px;
        height: 40px;
        margin-left: 10px;
        border: solid 1px #e7e7e7;
      }
      .inputRight:hover {
        color: #ff3e41;
      }
    }
    .moble {
      width: 100%;
      padding-left: 95px;
      font-size: 12px;
      text-align: left;
      height: 17px;
      margin-top: 11px;
      color: #666;
      em {
        color: #7ac5ff;
      }
    }
    p {
      width: 348px;
      height: 34px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      line-height: 17px;
      margin: 0 auto;
      margin-top: 8px;
    }
    p.info {
      width: 348px;
      height: 20px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #666666;
      text-align: center;
      margin: 9px auto 0;
    }
    .xieyi {
      width: 100%;
      height: 30px;
      line-height: 30px;
      text-align: center;
      span {
        cursor: pointer;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #7ac5ff;
      }
    }
    .el-button--danger {
      width: 350px;
      height: 40px;
      margin-left: 95px;
      margin-top: 20px;
      border-radius: 4px;
      background-color: #ff3e41;
      padding: 0;
    }
    .el-button--info {
      width: 350px;
      height: 40px;
      margin-left: 95px;
      margin-top: 20px;
      border-radius: 4px;
    }
  }
  .xubox_layer.active {
    height: 548px;
    .el-button--danger {
      margin-top: 45px;
    }
  }
  .xubox_layer.alert3 {
    height: 300px !important;
    .xubox_page1 {
      padding: 20px 95px 0;
      width: 100%;
      height: 200px;
      position: relative;
      .phone-div {
            line-height: 36px;
            font-size: 14px;
            margin-left: 20px;
            margin-bottom: 10px;
      }
      .inputLeft{
          float: left;
          width: 140px;
          margin-right: 10px;
          .el-input__inner {
            width: 100%;
            height: 40px;
            border: solid 1px #e7e7e7;
          }
      }
      .inputRight {
        border: 0;
        width: 100px;
        height: 40px;
        font-size: 14px;
        color: #CCCCCC;
        background: #EEEEEE;
        border: 1px solid #E7E7E7;
      }
      .inputRight:hover {
        color: #ff3e41;
      }
      .phone{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #666666;
      }
      .el-input__inner{
        border: 1px solid #E7E7E7;
        border-radius: 0;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #999999;
      }
      .el-button--danger{
        margin: 0 auto;
        width: 350px;
        margin-top: 5px;
      }
      .backPass{
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #7AC5FF;
            line-height: 20px;
            width: 70px;
            text-align: center;
            height: 20px;
            position: absolute;
            top: 45px;
            right:13px;
            cursor: pointer;
      }
    }
  }
}
</style>