<template>
  <div class="single-mask">
    <div class="single-main">
      <!--左上角标题-->
      <p class="single-title">普通账户-充值</p>
      <router-link to="/myAccount/accountDetail"><span class="single-rtitle">充值记录</span></router-link>
      <div class="bind-input-div charge-form">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
          <!--充值-->
          <el-form-item label="充值金额：" prop="money">
            <el-input v-model="ruleForm.money" style="width: 350px" :placeholder="minAmount"></el-input>
            <p class="input-tip"><i></i>可用余额:{{restMoney | moneyFormat}}元</p>
          </el-form-item>
          <div class="confirm-btn" @click="submitForm('ruleForm')" v-loading.body="loading">充值</div>
        </el-form>
      </div>
      <div class="charge-foot"><i></i>您的资金安全由新浪支付为您保驾护航</div>
      <div class="border"></div>
      <div class="single-icon">
        <p class="sina-tip">温馨提示:</p>
        <div class="sina-tipdiv">
          <div>
            1、充值/提现必须为开通网上银行的借记卡，不支持存折、信用卡充值
          </div>
          <div>
            2、充值期间，请勿关闭浏览器，待充值成功并返回后，可在E都市钱包系统中查看充值金额
          </div>
          <div>
            3、严禁信用卡套现、虚假交易等行为
          </div>
          <div>
            4、<router-link class="router-color" to="/bankLimit" target="_blank">充值限额说明</router-link>
          </div>
        </div>
      </div>
    </div>
    <ui-dialog :ifOpen="isDialog" type="充值"></ui-dialog>
  </div>
</template>
<script>
  import dialog from '../../../public/dialog.vue'
  export default {
    components: {
      'ui-dialog': dialog
    },
    data () {
      // 数字验证
      var validateBank = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入充值金额'));
        } else if (parseInt(value) < parseInt(this.info.minReAmount)) {
          callback(new Error('输入金额不能少于起充金额'+this.info.minReAmount+'元'));
        } else {
          var tel=/^\d+(\.\d{1,2})?$/;
          tel.test(value)?callback() : callback(new Error('只能输入数字，最多可输入两位小数'));
        }
      };
      return{
        ruleForm:{
          money: ''
        },
        rules: {
          money: [
            { required: true, message: '请输入充值金额', trigger: 'change' },
            { validator: validateBank,trigger: 'change' }
          ]
        },
        isDialog: false,
        formToken: '',
        restMoney: 0,
        minAmount: '',
        info: {},
        loading: false
      }
    },
    created () {
      this.getInfo()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true        
            global.http.post(this,"/recharge/doRechargeSina",{
              money: this.ruleForm.money,
              reqType: 'PC',
              formToken: this.formToken
            },data => {
              if (data.data.resCode == 1) {
              window.location = data.data.resData.url
            } else {
              this.$confirm(data.data.resMsg, '温馨提示', {
                confirmButtonText: '确定',
							  closeOnClickModal: false,
                showCancelButton: false,
                type: 'warning'
             }).then(() => {
                 this.$router.go(-1)
             });
              this.loading = false
            }
          })
          } else {
            return false;
          }
        });
      },
        getInfo () {
            global.http.post(this,"/recharge/toRechargeSina",{
              reqType: 'PC'
            },data => {
              if (data.data.resCode ==1)
          {
            this.info = data.data.resData.model
            let info = data.data.resData.model
            this.formToken = info.formToken
            this.restMoney = info.useMoney
            info.minReAmount ? this.minAmount = "请输入充值金额 ("+info.minReAmount+"元起充) " : this.minAmount = "请输入充值金额"
          }else{
            this.$confirm(data.data.resMsg, '温馨提示', {
              confirmButtonText: '确定',
							closeOnClickModal: false,
              showCancelButton: false,
              type: 'warning'
            }).then(() => {
                 this.$router.go(-1)
            });
          }
          })
        }
    }
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
    margin-left: 115px;
    height: 50px;
    line-height: 50px;
    margin-top: 50px;
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
    width: 528px;
    height: 119px;
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
</style>
<style rel="stylesheet/less">
  @import "../../../../style/account.less";
</style>
