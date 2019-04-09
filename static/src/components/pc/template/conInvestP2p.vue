<!-- 浙商标的出借确认页 -->
<template>
  <div id="conInvestP2p">
    <div type="primary" @click="openFullScreen" element-loading-text="小E正在拼命加载中" v-loading.fullscreen.lock="fullscreenLoading">
    </div>
    <div class="bg"></div>
    <!-- 出借确认框 -->
    <div class="xubox_layer" v-if="state==0">
      <div class="title">确认出借
        <div class="del reg" @click='close'>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="xubox_page">
        <!-- <h3>{{json.name}}</h3> -->
        <!-- <div class="denailTime">(项目期限： -->
          <!-- <em>{{json.timeLimit}}{{json.Company}}</em>) -->
        <!-- </div> -->
        <!-- <div class="denail">预期年化：
          <em>{{json.apr | returnFloat1}}%</em><em v-if="json.addApr || json.vipUprateApr">+{{ json | allApr}}%</em>
        </div> -->
        <div class="denail">剩余金额：
          <em>{{json.remainAmount | moneyFormat(1)}}元</em>
        </div>
        <div class="denail">可用余额：
          <em>{{json.useMoney | moneyFormat(1)}}元</em>
        </div>
      </div>
      <div class="investDetail">
        <!-- <div class="denail">出借金额：
          <em>{{json.money}}</em>元</div> -->
        <div class="salf">
          <i></i>浙商资金存管系统,保障您的资金安全
        </div>
        <div class="denail">参考年化收益：
          <em>{{json.investProfitWhole}}元</em>
            <!-- <el-tooltip class="item" effect="dark" placement="right" popper-class="aprTooltip">
              <span class="wenhao" style="margin-bottom:3px;"></span>
							<div slot="content">
								<div class="money">项目预期收益</br>
									<span>{{investProfit}}</span>
								</div>
								<div class="money">项目加息预期收益</br>
									<span>{{addAprProfit}}</span>
								</div>
								<div class="money">加息券预期收益</br>
									<span>{{voucherAddApr}}</span>
								</div>
								<div class="money1">Vip预期收益</br>
									<span>{{vipInvestProfit}}</span>
								</div>
								<div class="tip">真实收益以实际到账为准</div>
							</div>
						</el-tooltip> -->
          </div>
        <div class="denail">红包抵扣：
          <em>{{json.redMoney}}元</em></div>
        <div class="denail fz">还需支付：
          <em>{{(json.money*100-json.redMoney*100)/100}}<em>元</em></em></div>
        <!-- 未授权 -->
        <div class="inputBox noTender" v-if="!autoTenderStatus">
          <div class="phoneCode">
            <i class="iconfont" id="icon">&#xe602;</i>
            <el-input type="text" v-model="mobleCode" maxlength="6" @input="inputIcon(1)" placeholder="请输入6位手机验证码" class="inputLeft"></el-input>
            <el-button @click="resetCode(1)" ref="resetPhoneCode" class="inputRight">{{codeText}}</el-button>
          </div>
          <div class="moble">验证码已发送至手机：
            <em>{{json.phone | phoneNumber}}</em>
          </div>
          <p>为了方便您的出借，首次出借、购买债权或开启自动出借前需要先进行短信验证，然后开启支付授权。</p>
        </div>

        <!-- 已授权未设置过交易密码 -->
        <div class="inputBox noPass" v-else-if="autoTenderStatus && !falg">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="为了账户安全，请设置交易密码：" prop="pass">
              <el-input type="password" maxlength="6" v-model="ruleForm.pass" auto-complete="off" placeholder="请设置六位数字交易密码"></el-input>
          </el-form-item>
          <el-form-item label="请确认交易密码：" prop="checkPass">   
              <el-input type="password" maxlength="6" @input="inputIcon(3)" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请确认交易密码"></el-input>
          </el-form-item>
              <!-- <el-button type="danger" @click="submitForm('ruleForm')">提交</el-button> -->
          </el-form>
        </div>

        <!-- 已授权却设置过交易密码 -->
        <div class="inputBox" v-else-if="autoTenderStatus && falg">
          <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
          <el-form-item label="输入交易密码：" prop="pass">
              <el-input type="password" maxlength="6" @input="inputIcon(4)" v-model="ruleForm1.pass" auto-complete="off" placeholder="请输入六位数字交易密码"></el-input>
          </el-form-item>
              <div class="backPass" @click="forgetPassword">忘记密码？</div>
          </el-form>
        </div>
        <el-button type="info" disabled v-if="!isCheck || !rescode">立即支付</el-button>
        <el-button type="danger" @click='openAutoInvestCheck' v-else>立即支付</el-button>
        <div class="xieyi">
          <el-checkbox v-model="isCheck" ></el-checkbox>
            <em>我已同意</em>
            <span>
              <router-link :to="'/agree/services?planId='+json.uuid" target="_blank">《用户出借服务协议》</router-link>
            </span>
            <span>
              <router-link to="/agree/authorizedAgree" target="_blank">《授权委托书》</router-link>
            </span>
            <span>
              <router-link to="/agree/riskNote" target="_blank">《风险提示书》</router-link>
            </span>
            <span>
              <router-link to="/agree/digitalCertificate" target="_blank">《数字证书服务协议》</router-link>
            </span>
            <br/>
            <span>
              <router-link to="/agree/electronicSeal" target="_blank">《电子签章风险提示》</router-link>
            </span>
        </div>
      </div>
    </div>
    <!-- 设置交易密码框 -->
    <div class="xubox_layer alert1" v-else-if="state==1">
      <div class="title">设置交易密码
        <div class="del reg" @click='close'>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="xubox_page1">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="交易密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" auto-complete="off" placeholder="请设置六位数字交易密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">   
            <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off" placeholder="请确认交易密码"></el-input>
        </el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')">提交</el-button>
        </el-form>
      </div>
    </div>
    <!-- 输入交易密码框 -->
    <!-- <div class="xubox_layer alert2" v-else-if="state==2">
      <div class="title">输入交易密码
        <div class="del reg" @click='close'>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="xubox_page1">
        <el-form :model="ruleForm1" status-icon :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="输入交易密码" prop="pass">
            <el-input type="password" v-model="ruleForm1.pass" auto-complete="off" placeholder="请输入六位数字交易密码"></el-input>
        </el-form-item>
            <div class="backPass" @click="forgetPassword">忘记密码？</div>
            <el-button type="danger" @click="submitForm1('ruleForm1')">提交</el-button>
        </el-form>
      </div>
    </div> -->
    <!-- 忘记交易密码框 -->
    <div class="xubox_layer alert3" v-else-if="state==3">
      <div class="title">忘记交易密码框
        <div class="del reg" @click='close'>
          <i class="el-icon-close"></i>
        </div>
      </div>
      <div class="xubox_page1">
        <el-form :model="ruleForm2" status-icon :rules="rules1" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="身份证" prop="ID">
                <el-input type="text" v-model="ruleForm2.ID" auto-complete="true" placeholder="请填写您的身份证验证身份"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <span class="phone">{{phone | phoneNumber}}</span>
            </el-form-item>
            <el-form-item label="短信验证码" prop="code">
                <el-input type="text" class="inputLeft" v-model="ruleForm2.code" auto-complete="off" placeholder="请输入验证码"></el-input>
                <el-button @click="resetCode(0)" class="inputRight">{{codeText}}</el-button>
            </el-form-item>
            <el-form-item label="新交易密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入六位数字交易密码"></el-input>
            </el-form-item>
            <el-form-item label="确认交易密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入新交易密码"></el-input>
            </el-form-item>
            <el-button type="danger" @click="submitForm2('ruleForm2')">提交</el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "conInvest",
  props: ["json", "paw","investProfit","addAprProfit","voucherAddApr","vipInvestProfit"],
  data() {
      var validateID = (rule, value, callback) => {
          if (value === '') {
          callback(new Error('请输入你的身份证号码'));
        } else {
            var reg=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; 
            if(reg.test(value)){ 
                let _this = this
                global.http.post(_this, "/user/validateIdCard", {idCard:this.ruleForm2.ID}, function(data) {
                    if (data.body.resCode == 1) {
                       callback() 
                    } else {
                        callback(new Error(data.body.resMsg))
                    }
                })
            }else{
                callback(new Error('身份证号码格式不正确'))
            }
        }
      };
      var validateCode = (rule, value, callback) => {
          if (value === '') {
          callback(new Error('请输入短信验证码'));
        } else { 
            if(value.length == 6){
                let _this = this
                global.http.post(_this, "/user/validatePhoneCode", {code:this.ruleForm2.code}, function(data) {
                    if (data.body.resCode == 1) {
                       callback() 
                    } else {
                        callback(new Error(data.body.resMsg))
                    }
                })
            } else{
                callback(new Error('短信验证码格式不正确'))
            }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
            var reg=/^\d{6}$/; 
            reg.test(value) ? callback() : callback(new Error('请输入6位纯数字交易密码'))
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      state: 0,                // 弹出框的显示  0 ：确定交易框  1 ：设置交易密码 2:输入交易密码 3:忘记交易密码
      ruleForm: {              // 设置交易密码
        pass: '',
        checkPass: ''
      },
      ruleForm1: {              // 输入交易密码
        pass: ''
      },
      ruleForm2: {              // 忘记交易密码
        ID: '',                 // 身份证
        code: '',               // 短信验证码
        pass: '',               // 密码
        checkPass: ''
      },
      codeText:'获取验证码',
      codeFlag:true,
      falg: true,             // 是否设置支付密码
      autoTenderStatus:false,   // 是否开通授权支付
      rescode: false,          // 按钮是否可以点击
      mobleCode: "",           // 手机验证码
      phone:'',                //  平台绑定的手机号码
      fullscreenLoading: false,
      ss: function() {},       // 接口三秒之内不反会的方法
      rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        },
      rules1: {
          ID: [
            { validator: validateID, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass3, trigger: 'blur' }
          ]
        },
        isCheck:false,
    };
  },
  methods: {
      forgetPassword(){
        let _this = this
        _this.fullscreenLoading = true;
        _this.state=7
        setTimeout(function() {
          _this.fullscreenLoading = false;
          _this.state=3
        },1000)
      },
      openAutoInvestCheck(){   // 点击出借校验短信接口
      let _this = this
          if(this.json.autoTenderStatus==1 && this.json.isSetTradePass==1){     // 已经自动出借状态
              this.invest(2)
          }else if(this.json.autoTenderStatus==1 && this.json.isSetTradePass==0){    // 未设置了支付密码
              this.setTradePass(0)
          }else if(this.json.autoTenderStatus==0){    // 未设置自动出借状态
              global.http.post_(this, "/openAutoInvestCheck", {mobileCode:this.mobleCode,flag:1}, function(data) {
                if (data.body.resCode == 1) {   // 未设置了支付密码
                  _this.state = 1;
                } else {
                    _this.$message({ message: data.body.resMsg, type: "warning" });
                }
            });
          } 
      },
      setTradePass(n){      // n=1 忘记密码  其他 设置密码
          let _this = this
          let passType = ""
          let formJson = {};
          if(n==1){
              formJson = {
                  pass:_this.ruleForm2.pass,
                  confirmPass:_this.ruleForm2.checkPass,
                  setPassType:1
              };
          } else{
              formJson = {
                  pass:_this.ruleForm.pass,
                  confirmPass:_this.ruleForm.checkPass,
                  setPassType:''
              };
          } 
          global.http.post(_this, "/user/setTradePass", formJson, function(data) {
             if (data.body.resCode == 1) {
                 if(n==1){
                   _this.$confirm('你已成功找回密码。', '温馨提示', {
                    confirmButtonText: '确定',
                    showCancelButton:false,
                    type: 'success'
                  }).then(() => {
                    _this.$emit("conInvest", false);
                  })
                 }else{
                     _this.invest(1)
                 }
             } else {
                _this.$message({ message: data.body.resMsg, type: "warning" });
             }
          });
      },
      submitForm(formName) {    // 设置交易密码
        this.$refs[formName].validate((valid) => {
            if (valid) {
                this.setTradePass(0)
            } else {
                console.log('error submit!!');
                return false;
            }
        });
      },
      // submitForm1(formName) {     // 输入交易密码
      //   this.$refs[formName].validate((valid) => {
      //     if (valid) {
      //       this.invest(2)
      //     } else {
      //       console.log('error submit!!');
      //       return false;
      //     }
      //   });
      // },
      submitForm2(formName) {      // 修忘记交易密码
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.setTradePass(1)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 3000);
    },
    inputIcon(n) {  // 1:授权的手机验证码 2:设置密码 3:确认设置密码 4:输入密码
      //  input输入框的icon颜色变化
      if( n == 1 ){
        this.mobleCode == "" ? $("#icon").css({ color: "#ccc" }) : $("#icon").css({ color: "#42d469" });
        let a = this.mobleCode +'';
        a.length == 6 ? (this.rescode = true) : (this.rescode = false);
      } else if( n == 2 ){
        let b = this.ruleForm.pass +'';
        b.length == 6 ? (this.rescode = true) : (this.rescode = false);
      } else if( n == 3 ){
        let b = this.ruleForm.pass +'';
        let d = this.ruleForm.checkPass +'';
        b.length == 6 && d.length == 6 ? (this.rescode = true) : (this.rescode = false);
      } else if( n == 4 ){
        let e = this.ruleForm1.pass +'';
        e.length == 6 ? (this.rescode = true) : (this.rescode = false);
      }
      
    },
    close() {
      // 点击右上角返回按钮
      this.$emit("conInvest", false);
    },
    resetCode(n) {
      //  获取手机验证码
      let _this = this;
      let wait = 60;
      function get_code_time( ) {
        if (wait == 0) {
          _this.codeFlag = true
          _this.codeText = "重新发送";
          wait = 60;
        } else {
          _this.codeFlag = false
          _this.codeText = "(" + wait + "s)后重发";
          wait--;
          setTimeout(function() {
            get_code_time();
          }, 1000);
        }
      }

      if (!_this.codeFlag) {
        this.$message({ message: "验证码已发送，请60s后再次获取", type: "warning" });
      } else {
        //  手机验证码请求
        if(n==1){    // 授权自动出借
            global.http.post(_this, "/openAutoInvest", {}, function(data) {
            if (data.body.resCode == 1) {
                get_code_time(); //倒计时
            } else {
                _this.$message({ message: data.body.resMsg, type: "warning" });
            }
            });
        }else{     // 忘记交易密码     
            global.http.post(_this, "/user/sendPhoneCode", {}, function(data) {
            if (data.body.resCode == 1) {
                get_code_time(); //倒计时
            } else {
                _this.$message({ message: data.body.resMsg, type: "warning" });
            }
            });
        }
      }
    },
    invest(n) {    // 1 设置交易密码 2 输入交易密码
      let _this = this
      let psw = '';
      n==1 ? psw = this.ruleForm.pass : psw = this.ruleForm1.pass
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
      // 提交请求
      let json = {
        money: _this.json.money,  //
        planId: _this.json.uuid,   //
        rateInterestStr: _this.json.rateInterestStr,  //
        redEnvelopeStr: _this.json.redEnvelopeStr,  //
        mobileType: 4,   //
        tradePass: psw,    // 交易密码
        vipRateId: _this.json.vipRateId
      }
      _this.ajaxData('/financePlan/investPlan', json)
    },
    ajaxData(url, data){
      let _this = this
      global.http.post(_this, url, data, function(data) {
          if (data.body.resCode == 1) {
            _this.fullscreenLoading = false;
            _this.state = 0;
            clearInterval(_this.ss)
            _this.$router.push({ path: '/invest/result', query: { radomStr: data.body.resData.radomStr,uuid:_this.json.uuid,assetManageType:1 }})
          } else {
            clearInterval(_this.ss)
            _this.ruleForm1.pass = ''
            // _this.$emit("conInvest", false);  // 关闭弹窗
            _this.fullscreenLoading = false;
            _this.$message({ message: data.body.resMsg, type: 'warning' });
          }
        })
    }
  },
  created(){
    this.phone = this.getCookie('userName')
    if(this.paw) this.state=3
  },
  mounted: function() {
      this.falg = this.json.isSetTradePass
      this.json.autoTenderStatus == 1 ? this.autoTenderStatus = true : this.autoTenderStatus = false
      this.json.isShowAgree == 1 ? this.isCheck = true : this.isCheck = false
      if(this.state == 0 && !this.autoTenderStatus) this.resetCode(1)
  },
  components: {

  }
};
</script>

<style lang="scss">
/*tooltip箭头*/
  .aprTooltip[x-placement^=right] .popper__arrow {
    border-right-color: #999 ;
  }

.aprTooltip[x-placement^=right] .popper__arrow::after {
    border-right-color: #999 ;
  }

.aprTooltip[x-placement^=bottom] .popper__arrow {
    border-bottom-color: #999 ;
  }

.aprTooltip[x-placement^=bottom] .popper__arrow::after {
    border-bottom-color: #999 ;
  }
#conInvestP2p {
    .el-tag {
      padding: 0px;
    }
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
    width: 640px;
    height: 620px;
    background-color: #fff;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 200;
    border-radius: 5px;
    .title {
      font-family: PingFangSC-Regular;
      width: 100%;
      height: 68px;
      border-top-radius: 5px;
      border-bottom: 1px solid #e7e7e7;
      font-size: 18px;
      line-height: 68px;
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
      height: 56px;
      border-bottom: 1px solid #e7e7e7;
      // padding-top: 17px;
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
        font-family: PingFangSC-Regular;
        font-size: 16px;
        text-align: center;
        color: #666666;
        height: 100%;
        line-height: 56px;
        em {
          color: #151515;
        }
      }
    }
    .investDetail {
      width: 100%;
      height: 373px;
      .salf{
        width: 100%;
        padding-left: 60px;
        margin-top: 30px;
        font-size: 14px;
        color: #333;
        i{
          width: 16px;
          height: 17px;
          background: url(https://aliyunsso.edspay.com/web/invest/safe2.png);
          display: inline-block;
          vertical-align: middle;
          margin-top: 1px;
          margin-right: 5px;
        }
      }
      .denail {
        font-family: PingFangSC-Regular;
        width: 100%;
        height: 32px;
        text-align: left;
        font-size: 14px;
        line-height: 32px;
        color: #666;
        margin-top: 13px;
        padding: 0 80px;
        em {
          font-family: DIN-Bold;
          float: right;
          font-size: 14px;
          color: #666;
        }
      }
      .denail:nth-child(3){
        margin-top: 4px;
      }
      .denail.fz {
        margin-top: 0;
        height: 40px;
        width: 500px;
        line-height: 40px;
        background: #f2f2f2;
        margin-left: 70px;
        padding: 0 10px;
        em {
          font-size: 18px;
          color: #ff3e41;
          em{
            font-size: 14px;
            color: #333;
          }
        }
      }
      .phoneCode {
        width: 100%;
        height: 40px;
        padding: 0;
        margin-top: 25px;
        position: relative;
        i.iconfont {
          color: #ccc;
          position: absolute;
          left: 10px;
          top: 8px;
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

      .inputBox{
        width: 100%;
        height: 197px;
        padding-left: 80px;
        padding-top: 57px;
        .el-form-item{
          width: 247px;
        }
        .el-input__inner{
          width: 237px;
          height: 40px;
          border: 1px solid #ccc;
          border-radius: 0px;
        }
        .el-input{
          display: inline-block;
        }
        .el-form-item__content{
          margin-left: 0px !important;
        }
        .el-form-item__label{
          display: block;
          text-align: left;
          padding: 0;
          line-height: 20px;
          margin-bottom: 10px;
          width: 100% !important;
        }
        .backPass{
          height: 40px;
          line-height: 40px;
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #5396FF;
          display: inline-block;
          float: left;
          margin-left: 247px;
          margin-top: -62px;
          cursor: pointer;
        }
      }
      .inputBox.noTender{
        padding-left: 80px;
        padding-top: 23px;
      }
      .inputBox.noPass{
        padding-left: 80px;
        padding-top: 20px;
        .el-form-item{
          margin-bottom: 20px;
        }
        .el-form-item__label{
          margin-bottom: 3px;
        }
      }
    }
    .moble {
      width: 100%;
      // padding-left: 95px;
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
      // margin: 0 auto;
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
      // height: 17px;
      line-height: 17px;
      padding-left: 80px;
      em{
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
      }
      span {
        cursor: pointer;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #7ac5ff;
      }
      span.el-checkbox__inner{
        width: 16px;
        height: 16px;
      }
      span.el-checkbox__inner::after{
        top: 0;
        left: 4px;
      }
    }
    .el-button--danger {
      width: 250px;
      height: 40px;
      margin-top: 15px;
      border-radius: 4px;
      background-color: #ff3e41;
      margin: 0 auto;
      display: block;
      margin-bottom: 15px;
    }
    .el-button--info {
      width: 250px;
      height: 40px;
      margin-top: 20px;
      border-radius: 4px;
      margin: 0 auto;
      display: block;
      margin-bottom: 15px;
    }
  }
  // .xubox_layer.active {
  //   height: 548px;
  //   .el-button--danger {
  //     margin-top: 45px;
  //   }
  // }
  // .xubox_layer.mt45 {
  // height: 548px;
  //    .el-button--info {
  //     margin-top: 45px;
  //   }
  // }
  .xubox_layer.alert1 {
    height: 317px;
    .xubox_page1 {
      padding: 36px 95px;
      width: 100%;
      height: 248px;
      .el-form-item__label{
          text-align: center;
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
        margin-top: 20px;
      }
    }
  }
  .xubox_layer.alert2 {
    height: 257px;
    .xubox_page1 {
      padding: 36px 95px 0;
      width: 100%;
      height: 188px;
      position: relative;
      .el-form-item__label{
          text-align: center;
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
        margin-top: 20px;
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
  .xubox_layer.alert3 {
    height: 479px;
    .xubox_page1 {
      padding: 30px 95px 0;
      width: 100%;
      height: 410px;
      position: relative;
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
<style lang="scss" scoped>
.wenpop {
    font-size: 12px;
    color: #666666;
  }
</style>
