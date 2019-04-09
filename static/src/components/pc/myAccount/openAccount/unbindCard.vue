<template>
  <div class="single-mask">
    <div class="single-main">
    <!--左上角标题-->
    <p class="single-title">解绑银行卡</p>
    <div class="input-div">
      <div class="input-group unbind-group">
        <span class="input-title unbind-input">解绑银行卡:</span>
        <span>
          <ui-card :type="3" :carNum="hideBankNo" :logo="logo"></ui-card>
        </span>
      </div>
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
        <el-form-item label="手机验证码:" class="input-group" prop="telMark">
          <el-input v-model="ruleForm.telMark" placeholder="请输入短信验证码" class="input-in bind-input-div"></el-input>
          <el-button class="num-btn editBtn" @click="getTelMark">{{phoneText}}</el-button>
        </el-form-item>
      <div class="confirm-btn" @click="submitForm('ruleForm')" v-loading.body="loading">确认</div>
      </el-form>
    </div>
    <div class="single-icon"></div>
  </div>
  </div>
</template>
<script>
    import card from '../../../public/bankCard.vue'
    export default {
        data () {
          return {
            phoneText: '获取手机验证码',
            phoneCount: 60,
            input: '',
            ticket: '',
            bankNo: this.$route.params.id.substr(2,100),
            hideBankNo: '',
            logo: '',
            ruleForm: {
              telMark: ''
            },
            rules: {
              telMark: [
                { required: true, message: '请输入手机验证码', trigger: 'blur' }
              ]
            },
            loading:false,
          }
        },
        components : {
          'ui-card': card
        },
        created () {
          this.getBank()
        },
        methods: {
          // 验证
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.loading = true
                global.http.post(this,"/account/disableBankAdvance",{
                  bankNo: this.bankNo,
                  ticket: this.ticket,
                  validCode: this.ruleForm.telMark
                },data => {
                  if (data.data.resCode == 1) {
                    this.$router.push('/myAccount/accountCard')
                  } else {
                    this.loading = false
                    this.$message({message:data.body.resMsg,type: 'error'});
                  }
                })
              } else {
            return false;
          }
          });
          },
          // 获取手机验证
          getTelMark () {
            if (this.phoneCount == 60) {
              // 每隔60s
              this.getMark ()
            }
          },
          // 获取验证码
          getMark (){
            global.http.post(this,"/account/disableBank",{
              bankNo: this.bankNo
            },data => {
              let _this = this
              if (data.data.resCode == 1) {
                this.$message({message:data.data.resMsg,type: 'success'});
                this.ticket = data.data.resData.ticket
                var phoneInterval = setInterval(function () {
                  _this.phoneCount--
                  _this.phoneText = '('+_this.phoneCount + 's)后重发'
                  if (_this.phoneCount === 0) {
                    clearInterval(phoneInterval)
                    _this.phoneText = '重新发送'
                    _this.phoneCount = 60
                  }
                }, 1000)
              } else {
              this.$message({message:data.data.resMsg,type: 'error'});
            }
            })
          },
          // 获取银行卡信息
          getBank () {
            if (this.$route.params.id.substr(0,2) == 'xl') {
              global.http.post(this,"/account/banklist",{},data => {
                let sinaList = data.data.resData.bankCardlist
                sinaList.forEach((item) => {
                    if (item.cardNumber == this.bankNo) {
                  this.hideBankNo = item.hiddenCardNumber
                  this.logo = item.logoPicUrl
                  }
                });
              })
            } else {
              global.http.post(this,"/account/zsbanklist",{},data => {
                let zsList = data.data.resData.bankCardlist
                sinaList.forEach((item) => {
                if (item.cardNumber == this.bankNo) {
                  this.hideBankNo = item.hiddenCardNumber
                  this.logo = item.logoPicUrl
                  }
                });
              })
            }
          }
        }
    }</script>
<style scoped>
  /*表单*/
  .unbind-input {
    margin-top:40px;
  }
  .unbind-group {
    align-items: flex-start !important;
    margin-top: 140px;
  }
  .input-group {
    font-size: 14px;
    color: #666666;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  .input-group:nth-of-type(2) {
    margin-top: 30px;
  }
  .input-group span {
    display: inline-block;
    text-align: left;
  }
  .input-title {
    width:84px;
    line-height: 20px;
    margin-right: 15px;
  }
  .input-in {
    width:185px;
    margin-right: 10px;
    height: 40px;
  }
  .single-main{
    height: 900px;
  }
  /*按钮*/
  .num-btn {
    width: 130px;
    height: 40px;
  }
  .confirm-btn {
      width: 350px;
      height: 50px;
      line-height: 50px;
      margin-top: 50px;
      float: right;
    }
</style>
<style rel="stylesheet/less">
  @import "../../../../style/account.less";
</style>
