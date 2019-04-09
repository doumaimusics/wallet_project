<template>
  <div class="single-mask">
    <div class="single-main">
      <!--左上角标题-->
      <p class="single-title">普通账户-提现</p>
      <router-link to="/myAccount/accountDetail"><span class="single-rtitle">提现记录</span></router-link>
      <div class="bind-input-div charge-form">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
          <!--银行卡-->
          <el-form-item label="银行卡：" prop="bankCard">
            <el-select v-model="ruleForm.bankCard" class="pcaSelect" placeholder="请选择银行卡" style='width: 316px'>
              <el-option :value="bank.sinaBankId" :label="bank.hiddenCardNumber" v-for="bank in bankList">
                <span style="float: left"><img :src="bank.logoPicUrl" style="width: 20px;height: 20px;"/></span>
                <span style="float: right;">{{ bank.hiddenCardNumber }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <!--提现金额-->
          <el-form-item label="提现金额：" prop="money">
            <el-input v-model="ruleForm.money" style="width: 350px" :placeholder="minAmount" @change="showTip(ruleForm)"></el-input>
          </el-form-item>
          <p class="input-tip">可提现余额:{{restMoney | moneyFormat}}元<em v-if="balance" class="fr" @click="$router.push('/moneyTransfer')">余额转移></em> </p>
          <p class="withTip" v-if="showFee">提现手续费{{info.cashFee}}元, 实际到账<span>{{ruleForm.money-info.cashFee| moneyFormat}}</span>元</p>
          <div class="confirm-btn" @click="submitForm('ruleForm')" v-loading.body="loading">提现</div>
        </el-form>
      </div>
      <div class="charge-foot"><i></i>您的资金安全由新浪支付为您保驾护航</div>
      <div class="border"></div>
      <div class="single-icon">
        <p class="sina-tip">温馨提示:</p>
        <div class="sina-tipdiv">
          <div>
            1、到账时间:当天15:00前发起提现，次日到账；15:00后发起提现，隔一天到账。因托管
            账户（新浪支付独立托管账户）到不同提现银行有所差异，以实际到账时间为准
          </div>
          <div>
            2、限额：单笔最高5万，每日累计提现不超过50万（无提现次数限制）
            <router-link class="router-color" to="/bankLimit" target="_blank">银行卡限额说明</router-link>
          </div>
          <div>
            3、手续费：{{info.cashFee?info.cashFee:0}}元/笔
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
          // 数字验证
          var validateBank = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入提现金额'));
            }

            if (value < this.info.minCashAmount) {
              callback(new Error('输入金额不能少于起提金额'+this.info.minCashAmount+'元'));
            }

            if (parseInt(value) > parseInt(this.info.useMoney)) {
              callback(new Error('输入金额不能超过提现余额'));
            } else {
              var tel=/^\d+(\.\d{1,2})?$/;
              tel.test(value)?callback() : callback(new Error('只能输入数字，最多可输入两位小数'));
            }
          };
          return{
            balance: sessionStorage.getItem("balance") == "true" ? true : false,       //  余额转移开关
            bankList: [],
            info: {},
            ruleForm:{
              money: '',
              bankCard: ''
            },
            rules: {
              money: [
                { required: true, message: '请输入提现金额', trigger: 'change' },
                { validator: validateBank,trigger: 'blur' }
              ],
              bankCard: [
                { required: true, message: '请选择银行卡', trigger: 'change' }
              ]
            },
            bankId: '',
            restMoney: '',
            minAmount: '',
            showFee: false,
            count: 0,
            loading:false,
            formToken: ''
          }
        },
        created () {
          this.getInfo()
          if(this.balance){
            this.$confirm('余额转移功能上线，可将普通账户余额转移到存管账户，免手续费哦！', '温馨提示', {
              confirmButtonText: '立即转移',
              closeOnClickModal: false,
              showCancelButton: true,
              type: 'warning'
            }).then(() => {
                this.$router.push('/moneyTransfer')
            });
          } 
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                 this.loading = true
                global.http.post(this,"/cash/doCashSina",{
                  money: this.ruleForm.money,
                  reqType: 'PC',
                  formToken: this.formToken,
                  sinaBankId: this.ruleForm.bankCard
                },data => {
                  if (data.data.resCode == 1) {
                  window.location = data.data.resData.url
                } else {
                  this.loading = false
                  this.$message({message:data.data.resMsg,type: 'error'});
                }
              })
              } else {
                return false;
            }
          });
          },
          // 获取信息
          getInfo () {
            global.http.post(this,"/cash/toCashSina",{},data => {
              if (data.data.resCode ==1) {
                let info = data.data.resData
                this.info = data.data.resData
                this.formToken = info.formToken
                this.restMoney = info.useMoney
                this.bankList = info.bankList
                this.ruleForm.bankCard = info.bankList[0].sinaBankId
                info.minCashAmount ? this.minAmount = "请输入提现金额 ("+info.minCashAmount+"元起提) " : this.minAmount = "请输入提现金额"
                }
            })
          },
          // 是否显示手续费
          showTip (ruleForm) {
            this.$refs.ruleForm.validateField('money', (msg) => {
              if (msg == '') {
                this.showFee = true
              } else {
                this.showFee = false
              }
            })
          }
        },
    }</script>
<style scoped>
  .single-main{
    height: 766px;
    padding:40px 60px 70px 60px;
    justify-content:flex-start;
    align-items: center;
    margin-top: 0%;
    position: relative;
    padding-bottom: 0px;
  }
  .charge-form {
    clear: both;
    margin-top: 50px;
  }
  .border {
    width:100%;
    height: 1px;
    border-bottom: dashed 1px #e7e7e7;
    margin-top: 90px;
  }
  /*btn*/
  .confirm-btn {
    width: 350px;
    height: 50px;
    line-height: 50px;
    margin-bottom: 50px;
    float: right;
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
  .single-icon {
    width: 443.3px;
    height: 297.8px;
  }
  .sina-tip{
    font-size: 14px;
    line-height: 20px;
    color: #333333;
    margin-top: 20px;
  }
  .sina-tipdiv {
    width: 580px;
    height: 98px;
    padding: 9px 14px;
    border: solid 1px #e7e7e7;
    overflow: hidden;
    margin-top: 17px;
  }
  .sina-tipdiv div{
    font-size: 13px;
    line-height: 20px;
    color: #666666;
  }
  .sina-tipdiv div:nth-of-type(2) span{
    color: #7ac5ff;
    cursor: pointer;
  }
  .router-color {
    color: #1c8de0;
  }
  .input-tip{
  margin-bottom:50px;
  margin-left: 115px;
}
.input-tip em{
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #55B4FD;
  cursor: pointer;
}
.confirm-btn{
  margin-top: -22px;
  margin-bottom: 0px;
}
.withTip{
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
  margin-left: 55px;
}
</style>
<style rel="stylesheet/less">
  @import "../../../../style/account.less";
</style>


