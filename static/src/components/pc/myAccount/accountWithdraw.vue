<template>
  <div class="single-mask">
    <div class="single-main">
        <span class="single-title">浙商存管账户-提现</span>
        <router-link to="/myAccount/accountDetail"><span class="single-rtitle">提现记录</span></router-link>
        <div class="charge-sum">
          <!-- 浙商维护 -->
          <div class="zs-defend" v-if="info.isSysProtect == 1">
            <img src="https://aliyunsso.edspay.com/web/myAccount/gonggaoIcon.png"/>
            <span>{{info.protectMes}}</span>
          </div>
        <!-- 银行卡 -->
        <div class="charge-allCard">
          <span class="charge-span">银行卡:</span>
          <account-card :name="info.bankName" :hideNo="lastNumber"  :logo="info.bankPicPath"></account-card>
        </div>
        <div class="bind-input-div charge-form withdraw-div">
          <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
            <!--提现金额-->
            <el-form-item label="提现金额：" prop="money" class="charge-error">
              <el-input v-model="ruleForm.money" style="width: 314px" :placeholder="minAmount" @input="checkMoney" :maxlength="8"></el-input>
              <!--<p class="input-tip"><i></i>可提现余额:{{info.withdrawMoney| moneyFormat}}元</p>-->
              <span class="unit">元</span>
              <p class="withNum">
                可提现余额(元)：{{info.withdrawMoney| moneyFormat}}
                <span  @click="allCash">全部提现</span>
              </p>
            </el-form-item>
            <!--手机验证码-->
            <el-form-item label="手机验证码：" prop="mark">
              <el-input v-model="ruleForm.mark" style="width: 180px" placeholder="请输入短信验证码" @input="checkNum" :maxlength="6"></el-input>
              <el-button class="editBtn" @click="getPhoneMark()">{{phoneText}}</el-button>
              <!--<p class="input-tip">验证码已发送至手机：153****0127</p>-->
            </el-form-item>

            <div class="confirm-btn btn" v-if="ruleForm.money&&ruleForm.mark" @click="submitForm('ruleForm')" v-loading.body="loading"> 提现</div>
            <div class="disable-btn btn" v-else>提现</div>
          </el-form>
        </div>
        <!-- footer -->
        <footer class="foot-div">
          <p>温馨提示：</p>
          <p>1.5万以下提现可当日到账，5万以上大额提现需在工作日7:00-16:00银行受理后到账;</p>
          <p>2.如提现金额较大，可拆分成多笔操作;</p>
          <p>3.当天充值金额不能立即提现，需要等待T+1个工作日，银行清算完成后才能提现;</p>
          <p class="foot-secu"><i></i>您的资金由浙商存管系统为您保驾护航</p>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from '../../public/accountCard.vue'
  export default {
     components : {
        'account-card': Card,
      },
    data () {
      // 数字验证
      var validateBank = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入提现金额！'));
        } else if(value < this.info.minCashAmount) {
          callback(new Error('提现金额最低'+this.info.minCashAmount+'元！'));
        } else if (parseInt(value) > parseInt(this.info.withdrawMoney)) {
          callback(new Error('提现金额不能大于可提现余额！'));
        }else {
          callback();
        }
      };
      return{
        bankList: [],
        phoneText:'获取手机验证码',
        phoneCount:60,
        info: {},
        lastNumber: '',
        minAmount: '',
        formToken: '',
        validateBank:validateBank,
        ruleForm:{
          money: '',
          mark: ''
        },
        rules: {
          money: [{ required: false}],
          mark: [{ required: false}],
        },
        loading: false,
      }
    },
    created () {
      this.getBank ()
      this.getInfo ()
    },
    methods: {
      allCash () {
        this.$nextTick(() => {
            this.ruleForm.money = this.info.withdrawMoney
          })
      },
      // input金额验证
      checkMoney (e) {
          this.$nextTick(() => {
            // 数字和小数点
            let value =  e.replace(/[^\d\.]/g,'');
            // 只能有一个小数点
            value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
            //小数点后两位
            this.ruleForm.money = value.replace(/([0-9]+\.[0-9]{2})[0-9]*/, "$1")
          })
        },
      // input数字验证
      checkNum (e) {
          this.$nextTick(() => {
            this.ruleForm.mark =  e.replace(/[^\d]/g,'')
          })
        },
      // 获取银行
      getBank () {
          global.http.post(this,"/account/zsbank/list",{},data => {
            this.bankList = data.data.resData.bankList
        })
      },
      // 获取手机验证码
      getPhoneMark (formName) {
        console.log(this.ruleForm.money)
        this.rules.money.push({ validator: this.validateBank })
        this.$refs.ruleForm.validateField('money', (msg) => {
            if (msg == ''){
            if (this.phoneCount == 60) {
              this.getMark()
            }
          }
        })
        this.rules.money.pop()
      },
      //获取验证码
      getMark() {
        global.http.post(this,"/cash/getVailcodeCzb",{
          money:this.ruleForm.money,
          bankCode:this.info.bankCode
        },data => {
          if (data.data.resCode == 1) {
            this.$message({message:'验证码已发送至手机:'+this.info.mobile.substring(0,3)+"****"+this.info.mobile.substring(7,11),type: 'success'});
            this.formToken = data.data.resData.formToken
            // 每隔60s
            let _this = this
            // 每隔60s
            var phoneInterval = setInterval(function () {
              _this.phoneCount--
              _this.phoneText = '('+_this.phoneCount + 's)后重发'
              if (_this.phoneCount === 0) {
                clearInterval(phoneInterval)
                _this.phoneText = '重发'
                _this.phoneCount = 60
              }
            }, 1000)
          } else {
            this.$message({message:data.data.resMsg,type: 'error'});
           }
        })
      },
      // 获取信息
      getInfo () {
        global.http.post(this,"/cash/toCashCzb",{},data => {
          if (data.data.resCode ==1){
          this.info = data.data.resData
          this.lastNumber = data.data.resData.bankNo.substr(-4)
          this.info.minCashAmount ? this.minAmount = "请输入提现金额 ("+this.info.minCashAmount+"元起提) " : this.minAmount = "请输入提现金额"
          }
       })
      },
      // 确认
      submitForm(formName) {
        this.rules.money.push({ validator: this.validateBank })
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (!this.formToken) {
                  this.$message({message:'请先获取验证码后再提现',type: 'error'});
                  return
              }
            this.loading = true
            global.http.post(this,"/cash/doCashCzb",{
              money:this.ruleForm.money,
              formToken:this.formToken,
              valicode:this.ruleForm.mark
            },data => {
              if (data.data.resCode == 1) {
                if (data.data.resData.status == 1) {    // 成功   
                    this.$router.push({ path: '/zsHandSuc', query: { num: this.ruleForm.money}})
                } else if(data.data.resData.status == 0) {   // 处理中
                  this.$router.push({ path: '/zsDraw/inhand', query: { num: this.ruleForm.money}})
                }
            }else {
              this.loading = false
              this.$message({message:data.body.resMsg,type: 'error'});
              }
            })
          } else {
            return false;
            }
        });
        this.rules.money.pop()
      }
    }
  }
</script>
<style  lang="scss">
    .charge-error {
      .el-form-item__error {
        top: 9px;
        left: 350px;
        min-width: 200px;
      }
    }
</style> 
<style lang="scss" scoped>
  .single-mask {
    background:#F9F9F9;;
  }
  .single-main{
    padding:40px 60px 70px 60px;
    box-shadow:none;
    justify-content:flex-start;
    align-items: flex-start;
    margin-top: 0%;
    position: relative;
  }
  .charge-span {
    display: inline-block;
    width: 115px;
    font-size: 14px;
    color: #333333;
    margin-top: 10px;
  }
  .charge-sum{
    margin-top: 70px;
  }
  .charge-allCard {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .charge-form {
    margin-top: 40px;
  }
  .unit {
    padding-left:8px;
    font-size: 15px;
    color: #5E5E5E;
  }
  .charge-foot {
    font-size: 12px;
    color: #999999;
    line-height: 12px;
    margin-top: 20px;
    margin-left: 115px;
  }
  .charge-foot i {
    display: inline-block;
    background: url("https://aliyunsso.edspay.com/web/myAccount/icon-anquan-normal.png") no-repeat;
    width: 16px;
    height: 19px;
    vertical-align: middle;
    margin-right: 10px;
  }
  .withDrawCard {
    background: url("https://aliyunsso.edspay.com/web/myAccount/img-yinhang-normal.png") no-repeat;
    width: 328px;
    height: 90px;
    position: relative;
  }
  .withDrawCard div {
    position: absolute;
    font-size: 14px;
    color: #ffffff;
  }
  .card-logo {
    width: 35px;
    height: 35px;
    background-color: white;
    left: 39px;
    top: 26px;
  }
  .card-logo img {
    width: 28px;
    height: 28px;
    margin: 3.5px;
  }
  .card-title {
    top: 31px;
    left: 83px;
  }
  .card-num {
    right: 38px;
    top: 31px;
  }
  .withdraw-record {
    font-size: 22px;
    color: #7ac5ff;
    position: absolute;
    top: 40px;
    right: 60px;
    cursor: pointer;
  }
  .foot-div {
    font-size: 12px;
    color: #9B9B9B;
    line-height: 12px;
    margin:30px 0 0 115px;
    letter-spacing: 0.5px;
    p {
      margin-bottom:9px;
    }
    .foot-secu {
      color: #A3A3A4;
      margin-top: 15px;
        i {
          display: inline-block;
          background: url("https://aliyunsso.edspay.com/web/myAccount/icon-anquan-normal.png") no-repeat;
          width: 16px;
          height: 19px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }   
  }
  /*btn*/
  .btn {
    width: 314px;
    margin-left: 110px;
    font-size:18px;
    height: 50px;
    line-height: 50px;
  }
  .editBtn{
    width: 130px;
  }
  .withNum {
    font-size: 13px;
    color: #5E5E5E;
    span {
      font-size: 12px;
      color: #0040FF;
      margin-left:110px;
      cursor: pointer;
    }
  }
  /*浙商维护*/
  .zs-defend {
    margin:0px 0px 25px 110px;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
