<template>
  <div class="charge-sum">
    <!-- 浙商维护 -->
    <div class="zs-defend" v-if="info.isSysProtect == 1">
      <img src="https://aliyunsso.edspay.com/web/myAccount/gonggaoIcon.png"/>
      <span>{{info.protectMes}}</span>
    </div>
    <!-- 银行卡 -->
    <div class="charge-allCard">
      <span class="charge-span">银行卡:</span>
      <account-card :name="info.bankName" :hideNo="hideBank" :singleLimit="info.singleLimit"
                    :dayLimit="info.dailyLimit" :logo="info.bankPicPath"></account-card>
    </div>
    <div class="charge-limit">
      <span class="limit-span fl">单笔限额{{info.singleLimit |changeWan}},单日限额{{info.dailyLimit  |changeWan}}</span>
      <el-popover popper-class="realNamePopover"  placement="bottom-start"  trigger="hover"
        width="340" height="190"  content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        <el-table :data="bankList" class="realName-table" height="190" width="340">
          <el-table-column width="100" prop="bankName" label="支持银行">
            <template scope="scope">
              {{ scope.row.bankName }}
            </template>
          </el-table-column>
          <el-table-column width="100" prop="singleLimit" label="单笔限额">
            <template scope="scope">
              {{scope.row.singleLimit |changeWan}}
            </template>
          </el-table-column>
          <el-table-column width="100" prop="dailyLimit" label="单日限额">
            <template scope="scope">
              {{scope.row.dailyLimit |changeWan}}
            </template>
          </el-table-column>
        </el-table>
        <div slot="reference" class="name-wrapper fr">
          <el-tag>
            <span class="tip">限额说明<i></i></span>
          </el-tag>
        </div>
      </el-popover>
    </div>
    <!-- 表单 -->
    <div class="bind-input-div charge-form">
      <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
        <!--充值金额-->
        <el-form-item label="充值金额：" prop="money" class="charge-error">
          <el-input v-model="ruleForm.money" style="width: 314px" :placeholder="minAmount" @input="checkMoney" :maxlength="8"></el-input>
          <span class="unit">元</span>
          <p class="input-tip">可用余额(元)：{{info.useMoney | moneyFormat}}</p>
        </el-form-item>
        <!--手机验证码-->
        <el-form-item label=" 手机验证码：" prop="mark">
          <el-input v-model="ruleForm.mark" style="width: 180px" placeholder="请输入短信验证码" @input="checkNum" :maxlength="6"></el-input>
          <el-button class="editBtn" @click="getPhoneMark()" v-loading.body = "phoneLoad">{{phoneText}}</el-button>
          <p class="input-tip big-charge">大额充值请使用 
            <span @click="goTransfer">转账充值</span>
          </p>
        </el-form-item>
        <div class="confirm-btn btn" v-if="ruleForm.money&&ruleForm.mark" @click="submitForm('ruleForm')" v-loading.body="loading">充值</div>
        <div class="disable-btn btn" v-else>充值</div>
      </el-form>
    </div>
    <!-- footer -->
    <footer class="foot-div">
      <p>温馨提示：</p>
      <p>1.当天充值的金额，T+1（T为工作日）才能发起提现;</p>
      <p>2.充值金额超过单笔／单日限额，请使用转账充值;</p>
      <p>3.充值手续费由E都市钱包为您缴纳;</p>
      <p class="foot-secu"><i></i>您的资金由浙商存管系统为您保驾护航</p>
    </footer>
  </div>
</template>
<script>
  import Card from '../../../public/accountCard.vue'
  export default {
        components : {
          'account-card': Card,
        },
        data () {
          // 数字验证
          var validateBank = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入充值金额！'));
            } else if (parseInt(value) < parseInt(this.info.minReAmount)) {
              callback(new Error('单笔充值，需'+this.info.minReAmount+'元起充'));
            } else {
              callback();
            }
          };
          return{
            phoneText:'获取手机验证码',
            phoneCount:60,
            bankList: [],
            hideBank: '',
            ruleForm:{
              money: '',
              mark: ''
            },
            validateBank:validateBank,
            rules: {
              money: [
                { required: false},
              ],
              mark: [
                { required: false}
              ],
            },
            info: {},
            formToken: '',
            minAmount: '',
            count: 0,
            loading: false,
            phoneLoad:false,
          }
        },
        props:['money'],
        created () {
          this.getBank()
          this.getInfo()
          this.money ? this.ruleForm.money = this.money : this.ruleForm.money = ''
        },
        methods: {
          // input金额验证
          checkMoney (e) {
              this.$nextTick(() => {
                // 数字和小数点
                let value =  e.replace(/[^\d.]/g,"");
                // 只能有一个小数点
                value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
                // 小数最多2位
                this.ruleForm.money = value.replace(/([0-9]\.[0-9]{2})[0-9]*/, "$1")
              })
            },
          // input数字验证
          checkNum (e) {
              this.$nextTick(() => {
                this.ruleForm.mark =  e.replace(/[^\d]/g,'')
              })
            },
          // 获取手机验证码
          getPhoneMark (formName) {
            this.rules.money.push({ validator: this.validateBank })
            this.$refs.ruleForm.validateField('money', (msg) => {
              if (msg == ''){
                if (this.info.singleLimit<this.ruleForm.money) {
                  this.$confirm('充值金额超过您的当前'+this.info.bankName+'（尾号'+this.info.bankNo.substr(-4,4)+'）最高单笔限额。需要大额充值请使用转账充值。', '充值超过限额', {
                    confirmButtonText: '转账充值',
                    cancelButtonText: '调整金额',
                    type: 'warning'
                  }).then(() => {
                     this.goTransfer ()
                    }).catch(() => {
                  });
                }else if (this.phoneCount == 60) {
                  this.getMark()
                  // 每隔60s
                }
              }
            })
            this.rules.money.pop()
          },
          //获取验证码
          getMark() {
              this.phoneLoad = true
              global.http.post(this,"/recharge/getVailcodeCzb",{
                money:this.ruleForm.money,
                bankCode:this.info.bankCode
              },data => {
              if (data.data.resCode == 1) {
                this.phoneLoad = false
                this.$message({message:'验证码已发送至手机:'+this.info.mobile.substring(0,3)+"****"+this.info.mobile.substring(7,11),type: 'success'});
                this.formToken = data.data.resData.formToken
                // 每隔60s
                let _this = this
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
                  this.phoneLoad = false
                  this.$message({message:data.data.resMsg,type: 'error'});
              }
            })
          },
          // 获取银行
          getBank () {
            global.http.post(this,"/account/zsbank/list",{},data => {
              this.bankList = data.data.resData.bankList
            })
          },
          sigeinfo(val1,val2){
            this.$emit('sigeinfo',val1,val2)
          },
          // 获取信息
          getInfo () {
            global.http.post(this,"/recharge/toRechargeCzb",{},data => {
              if (data.data.resCode ==1){
              this.info = data.data.resData
              this.hideBank = this.info.bankNo.substr(-4)
              this.info.minReAmount ? this.minAmount = "请输入充值金额 ("+this.info.minReAmount+"元起充) " : this.minAmount = "请输入充值金额！"
              }
            })
          },
          // 确认
          submitForm(formName) {
            this.rules.money.push({ validator: this.validateBank })
            this.$refs[formName].validate((valid) => {
              if (valid) {
                if (!this.formToken) {
                  this.$message({message:'请先获取验证码后再充值',type: 'error'});
                  return
                }
                if (this.info.singleLimit<this.ruleForm.money) {
                  this.$confirm('充值金额超过您的当前'+this.info.bankName+'（尾号'+this.info.bankNo.substr(-4,4)+'）最高单笔限额。需要大额充值请使用转账充值。', '充值超过限额', {
                    confirmButtonText: '转账充值',
                    cancelButtonText: '调整金额',
                    type: 'warning'
                  }).then(() => {
                     this.goTransfer ()
                    }).catch(() => {
                  });
                } else {
                  this.loading = true
                  global.http.post(this,"/recharge/doRechargeCzb",{
                    money:this.ruleForm.money,
                    formToken:this.formToken,
                    valicode:this.ruleForm.mark
                  },data => {
                    if (data.data.resCode == 1) {
                      this.loading = false
                      if (data.data.resData.status == 1) {    // 成功
                          this.$router.push({ path: '/zsChargeSuc', query: { num: this.ruleForm.money}})
                      } else if(data.data.resData.status == 0) {   // 处理中
                        this.$router.push({ path: '/zsCharge/inhand', query: { num: this.ruleForm.money}})
                      }
                  }else {
                    this.loading = false
                    this.$message({message:data.body.resMsg,type: 'error'});
                    }
                  })
                }
              } else {
                return false;
                }
            });
            this.rules.money.pop()
          },
          // 向父元素传递参数跳转转账充值
          goTransfer () {
            this.$emit('goTransfer',true)
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
  .charge-span {
    display: inline-block;
    width: 84px;
    font-size: 14px;
    margin-right:30px;
    color: #333333;
  }
  .charge-sum{
    margin-top: 10px;
  }
  .charge-allCard {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
  }
  .charge-tip h5{
    margin-top:40px;
    padding-bottom:7px;
    font-size:14px;
    color: #333333;
  }
  .charge-tip-content p:nth-child(1){
    margin-top:0px;
  }
  .charge-tip-content p{
    margin-top:30px;
  }
  .charge-limit {
    font-size:17px;
    color: #7ac5ff;
    width: 314px;
    line-height:35px;
    margin-left: 120px;
    display:inline-block;
    overflow: hidden;
    .limit-span {
      font-size: 12px;
      color: #808080;
    }
  }
  .charge-limit i {
    display: inline-block;
    vertical-align: baseline;
    margin-left: 5px;
    width: 15px;
    height: 10px;
    background: url("https://aliyunsso.edspay.com/web/myAccount/btn-see-normal.png") no-repeat;
  }
  .charge-form {
    margin-top: 20px;
    overflow: hidden;
  }
  .unit {
    padding-left:8px;
    font-size: 15px;
    color: #5E5E5E;
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
    font-size:18px;
    width: 314px;
    margin-left: 110px;
    height: 50px;
    line-height: 50px;
  }
  .editBtn {
    width: 130px;
  }
  .big-charge {
    font-size: 12px;
    color: #808080;
    span {
      font-size: 12px;
      color: #0040FF;
      cursor: pointer;
    }
  }
  /*浙商维护*/
  .zs-defend {
    margin:0px 0px 25px 110px;
  }
</style>
