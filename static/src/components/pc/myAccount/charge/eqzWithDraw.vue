<template>
  <div class="single-mask">
    <div class="single-main">
      <!--左上角标题-->
      <p class="single-title">e起赚-转出</p>
      <div class="bind-input-div charge-form">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
          <!--转出金额-->
          <el-form-item label="转出金额" prop="money">
            <el-input v-model="ruleForm.money" style="width: 350px" placeholder="请输入转出金额" ></el-input>
            <p class="tips">可转出金额: {{info.useMoney | moneyFormat}}元</p>
            <p class="tips">转出冻结金额: {{info.noUseMoney| moneyFormat}}元 </p>
            <!-- 弹出框 -->
            <el-popover popper-class=" flowPopover realNamePopover " placement="bottom" trigger="hover" width="260" height="190">
              <div class="inflow-main">
                  <p class="moneyout-tip">可转出金额：<span>当前可以自由转出的E起赚金额。</span></p>
                  <p class="moneyout-tip">转出冻结金额：<span>当前正在排队转出暂不能执行其他操作的E起赚金额。</span></p>
                  <p class="moneyout-tip">可转出金额+转出冻结金额=E起赚总额</p>
              </div>
              <div slot="reference" class="name-wrapper">
                <el-tag>
                  <i class="tips-icon"></i>
                </el-tag>
              </div>
				  </el-popover>
          </el-form-item>
          <div class="confirm-btn" @click="submitForm('ruleForm')" >转出</div>
        </el-form>
      </div>
      <div class="border"></div>
      <div class="single-icon">
        <p class="sina-tip">温馨提示:</p>
        <div class="sina-tipdiv">
          <div>
           1、转出时将根据用户输入的转出金额，匹配最适宜的几笔资金转出。实际转出金额通常会大于用户输入的转出金额哦。
          </div>
          <div>
            2、当用户发起转出请求后，24小时内系统将不再自动将可用余额转入E起赚。您有足够的时间自由操作资金。
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

            if (parseInt(value) > parseInt(this.info.useMoney)) {
              callback(new Error('输入的转出金额不能大于可转出金额'));
            } else if (this.info.useMoney == 0) {
              callback(new Error('可转出金额为0元，无法转出'));
            }else {
              var tel=/^\d+(\.\d{1,2})?$/;
              tel.test(value)?callback() : callback(new Error('只能输入数字，最多可输入两位小数'));
            }
          };
          return{
            bankList: [],
            info: {
              noUseMoney: 0,
              useMoney: 0,
            },
            tip: {
              rollCount: 0,
              rollMoney: 0,
              rollTime: 0,
            },
            ruleForm:{
              money: '',
            },
            rules: {
              money: [
                { required: true, message: '请输入提现金额', trigger: 'change' },
                { validator: validateBank,trigger: 'blur' }
              ]
            },
            bankId: '',
            restMoney: '',
            minAmount: '',
            showFee: false
          }
        },
        created () {
          this.getInfo()
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.getTips ()
              } else {
                return false;
            }
          });
          },
          // 获取信息
          getInfo () {
            // 獲取金額
            global.http.post(this,"/flux/toRollOut",{},data => {
              if (data.data.resCode ==1) {
                this.info = data.data.resData
                }
            })
          },
          // 獲取提示窗信息
          getTips () {
            global.http.post(this,"/flux/showRollOut",{
              money: this.ruleForm.money
            },data => {
              if (data.data.resCode ==1) {
                let tip = data.data.resData
                this.$confirm('本次转出为您匹配到E起赚金额'+tip.rollMoney+'元。前方排队转出资金共'+tip.rollCount+'笔，转出约需'+tip.rollTime+'分钟。是否确认转出？', 
                '转出提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          global.http.post(this,"/flux/doRollOut",{
                              money: this.ruleForm.money,
                            },data => {
                              if (data.data.resCode == 1) {
                              this.$confirm('转出请求已提交成功，请前往e起赚页面查看转出进度', '转出提示', {
                                confirmButtonText: '返回e起赚页面',
                                cancelButtonText: '取消',
                                type: 'warning'
                              }).then(() => {
                                this.$router.push('/myAccount/current')
                              }).catch(() => {      
                                 this.$message({message:data.data.resMsg,type: 'error'});
                              });
                            } else {
                              this.$message({message:data.data.resMsg,type: 'error'});
                            }
                          })
                        }).catch(() => {      
                        });
                } else {
                  this.$message({
                      type: 'error',
                      message: data.data.resMsg
                    });   
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
  .tips {
    font-size: 13px;
    color: #5e5e5e;
    line-height: 25px;
    margin-top: 5px;
  }
  .tips:nth-of-type(2) {
    display: inline-block;
  }
  .tips-icon{
  background: url("https://aliyunsso.edspay.com/web/myAccount/icon-prompt-normal.png") no-repeat;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  display: inline-block;
  vertical-align:sub;
}
.moneyout-tip:nth-of-type(1) {
  margin-top: 0px;
}
.moneyout-tip {
  font-size: 12px;
  color: #333333;
  line-height: 17px;
  margin-top: 10px;
}
.moneyout-tip span {
  color: #666666;
}
</style>
<style rel="stylesheet/less">
  @import "../../../../style/account.less";
</style>
