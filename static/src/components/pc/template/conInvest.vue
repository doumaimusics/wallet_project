<!-- 浙商标的出借确认页 -->
<template>
  <div class="conInvest">
    <div type="primary" @click="openFullScreen" element-loading-text="小E正在拼命加载中" v-loading.fullscreen.lock="fullscreenLoading">
    </div>
    <div class="bg"></div>
    <div class="xubox_layer">
      <div class="title">确认出借
        <div class="del reg" @click='close'>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="xubox_page">
        <h3>{{json.name}}</h3>
        <div class="denailTime">(项目期限：
          <em>{{json.timeLimit}}个月</em>)</div>
        <div class="denail">预期年化：
          <em>{{json.apr}}%</em>
          <em v-if="json.addApr">+{{json.addApr}}%</em>
        </div>
        <div class="denail">剩余金额：
          <em>{{json.remainAmount | changeWan}}元</em>
        </div>
      </div>
      <div class="investDetail">
        <div class="denail">出借金额：
          <em>{{json.money}}</em>元</div>
        <div class="denail">预计收益：
          <em>{{json.investProfitWhole}}</em>元</div>
        <div class="denail">红包抵扣：
          <em>{{json.redMoney}}</em>元</div>
        <div class="denail fz">还需支付：
          <em>{{(json.money*100-json.redMoney*100)/100}}</em>元</div>
        <div class="phoneCode">
          <i class="iconfont" id="icon">&#xe602;</i>
          <el-input type="text" v-model="mobleCode" @input="inputIcon" placeholder="请输入手机验证码" class="inputLeft"></el-input>
          <el-button @click="resetCode($event)" class="inputRight">获取验证码</el-button>
        </div>
        <div class="moble">验证码已发送至手机：
          <em>{{json.phone | phoneNumber}}</em>
        </div>
        <el-button type="danger" @click='invest'>出借</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'conInvest',
  props: ['json'],
  data() {
    return {
      mobleCode: '',     // 手机验证码
      formToken: '',     // 出借防止重复提交
      fullscreenLoading: false,
      ss: function() { }
    }
  },
  methods: {
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 3000);
    },
    inputIcon() {
      if (this.mobleCode != "") {    //  input输入框的icon颜色变化
        $("#icon").css({ color: "#42d469" })
      } else {
        $("#icon").css({ color: "#ccc" })
      }
    },
    close() {          // 点击右上角返回按钮
      this.$emit('conInvest', false);
    },
    resetCode(event) {     //  获取手机验证码
      var v = event.target
      var _this = this
      var wait = 60
      function get_code_time(v) {
        if (wait == 0) {
          v.classList.remove('disabled')
          v.innerHTML = "重新发送";
          wait = 60;
        } else {
          v.classList.add('disabled')
          v.innerHTML = "(" + wait + "s)后重发";
          wait--;
          setTimeout(function() {
            get_code_time(v);
          }, 1000)
        }
      }

      if (v.className == 'disabled') {
        this.$message({ message: '验证码已发送，请60s后再次获取', type: 'warning' });
      } else {
        //  手机验证码请求
        global.http.post(_this, '/zs/invest/sendPhone', {}, function(data) {
          if (data.body.resCode == 1) {
            get_code_time(v)    //倒计时
            _this.formToken = data.body.resData.formToken
          } else {
            _this.$message({ message: data.body.resMsg, type: 'warning' });
          }
        })
      }
    },
    borrowTenderToken() {     //  保存本地生成的随机数
      this.setCookie('borrowTenderToken', (new Date()).getTime(), (1000 * 60 * 1000))
    },
    invest() {
      let _this = this
      if (this.mobleCode == "") {
        this.$message({ message: '请输入手机验证码', type: 'warning' });
      } else {
        _this.borrowTenderToken()
        // 提交请求
        let json = {
          borrowTenderToken: _this.getCookie('borrowTenderToken'),
          money: _this.json.money,
          uuid: _this.json.uuid,
          // tokenId: _this.fingerprint,
          mobileCode: _this.mobleCode,
          formToken: _this.formToken,
          experienceStr: _this.json.experienceStr,
          rateInterestStr: _this.json.rateInterestStr,
          redEnvelopeStr: _this.json.redEnvelopeStr,
          mobileType: 4,
          // source:'pc',
          // successRedirectUrl:window.location.href,
          pwd: _this.json.pwd
        }
        this.fullscreenLoading = true;
        let t = 0
        _this.ss = setInterval(function() {
          if (t < 3) {
            t++;
          } else {
            _this.fullscreenLoading = false;
            clearInterval(_this.ss)
            _this.$router.push({ path: '/invest/result', query: { radomStr: 0 }})
          }
        }, 1000)
        global.http.post(_this, '/zs/invest/tender', json, function(data) {
          if (data.body.resCode == 1) {
            _this.fullscreenLoading = false;
            clearInterval(_this.ss)
            _this.$router.push({ path: '/invest/result', query: { radomStr: data.body.resData.radomStr,uuid:_this.json.uuid,assetManageType:_this.json.assetManageType }})
          } else {
            setTimeout(() => {
              _this.fullscreenLoading = false;
              _this.$message({ message: data.body.resMsg, type: 'warning' });
            }, 3000);
          }
        })
      }
    }
  },
}  
</script>

<style lang="scss">
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
    position: absolute;
    width: 540px;
    height: 562px;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 200;
    border-radius: 5px;
    .title {
      width: 100%;
      height: 67px;
      border-top-radius: 5px;
      border-bottom: 2px solid #e7e7e7;
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
        transition: transform .3s;
      }
      .del:hover i.el-icon-close {
        transform: rotate(90deg);
      }
    }
    .xubox_page {
      width: 100%;
      height: 118px;
      border-bottom: 2px solid #e7e7e7;
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
    .el-button--danger {
      width: 350px;
      height: 40px;
      margin-left: 95px;
      margin-top: 20px;
      border-radius: 4px;
      background-color: #ff3e41;
      padding: 0;
    }
  }
}
</style>