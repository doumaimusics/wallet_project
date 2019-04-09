<template>
  <div class="single-mask">
    <div class="single-main">
      <!--左上角标题-->
      <p class="single-title">绑定银行卡</p>
      <!--右上角提示-->
      <div class="tip">
        <i></i>
        建议添加I类卡
        <router-link to="/threeCardPc" target="_blank" class="router-color">
          （了解银行卡三类账户）
        </router-link>
      </div>
      <!--表单-->
      <div class="bind-input-div">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
          <!--姓名-->
          <el-form-item label="真实姓名：" prop="name">
            {{realName}}
          </el-form-item>
          <!--开户银行-->
          <el-form-item label="开户银行：" prop="bank">
            <el-select v-model="ruleForm.bank" placeholder="请选择开户银行">
              <el-option :label="bank.name" :value="bank.value" v-for="bank in bankList" ></el-option>
            </el-select>
          </el-form-item>
          <!--省-->
          <el-form-item label="省份：" prop="province">
            <el-select v-model="ruleForm.province" class="pcaSelect" placeholder="请选择省份" @change="getCity">
              <el-option :label="province.provinceName" :value="province.provinceName" v-for="province in provinceList" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市：" prop="city">
            <!--市-->
            <el-select v-model="ruleForm.city" class="pcaSelect" placeholder="请选择城市">
              <el-option :label="city.cityName" :value="city.cityName" v-for="city in cityList"></el-option>
            </el-select>
          </el-form-item>
          <!--银行卡号-->
          <el-form-item label="银行卡号：" prop="bankId">
            <el-input v-model="ruleForm.bankId" style="width: 316px" placeholder="请输入本人的银行卡号"></el-input>
          </el-form-item>
          <!--银行预留手机-->
          <el-form-item label="银行预留手机：" prop="bankTel">
            <el-input v-model="ruleForm.bankTel" style="width: 316px" placeholder="请输入银行预留手机号"></el-input>
          </el-form-item>
          <!--手机验证码-->
          <el-form-item label="手机验证码：" prop="telMark">
            <el-input v-model="ruleForm.telMark" style="width: 180px" placeholder="请输入短信验证码"></el-input>
            <el-button class="editBtn" @click="getPhoneMark('ruleForm')">{{phoneText}}</el-button>
          </el-form-item>
          <div class="confirm-btn"  @click="submitForm('ruleForm')" v-loading.body="loading">确认</div>
        </el-form>
      </div>
      <div class="single-icon"></div>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
//          手机号验证
          var validateTel = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入银行预留手机号'));
            }
            var tel=/^1\d{10}$/;
            tel.test(value)?callback() : callback(new Error('手机号格式错误'));
          };
//          数字验证
          var validateBank = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入银行卡号'));
            }
            var tel=/^[0-9]*$/;
            tel.test(value)?callback() : callback(new Error('银行卡格式错误'));
          };
          return{
            realName: '',
            provinceList: [],
            cityList:[],
            bankList:[],
            ticket: '',
            ruleForm: {
              bank: '',
              province: '',
              city: '',
              bankId: '',
              bankTel: '',
              telMark: ''
            },
            rules: {
              bank: [
                { required: true, message: '请选择开户银行', trigger: 'change' },
              ],
              province: [
                { required: true, message: '请选择省市区', trigger: 'change' }
              ],
              city: [
                { required: true, message: '请选择市', trigger: 'change' }
              ],
              bankId: [
                { required: true, message: '请输入银行卡号', trigger: 'blur' },
                { validator: validateBank,trigger: 'blur' }
              ],
              bankTel: [
                { required: true, message: '请输入银行预留手机', trigger: 'blur' },
                { validator: validateTel, trigger: 'blur'}
              ],
              telMark: [
                { required: true, message: '请输入手机验证码', trigger: 'blur' },
                { validateField: validateTel, trigger: 'blur' }
              ]
            },
            phoneText:'获取手机验证码',
            phoneCount: 60,
            loading: false,
          }
        },
        created () {
          this.getInfo()
          this.getProvince()
          this.getBank()
        },
        methods: {
          btn () {
            alert(1)
          },
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.loading = true
                //  省的名字
                this.provinceList.forEach((item) => {
                  if (item.provinceId == this.ruleForm.province) {
                  this.provinceName = item.provinceName
                }
                });
                  // 市的名字
                  this.cityList.forEach((item) => {
                    if (item.gbAreaId == this.ruleForm.city) {
                    this.cityName = item.cityName
                  }
                });
                global.http.post(this,"/account/addBankAdvance",{
                  bankCode: this.ruleForm.bank,
                  bankNo:this.ruleForm.bankId,
                  province:this.ruleForm.province,
                  city:this.ruleForm.city,
                  ticket:this.ticket,
                  validCode:this.ruleForm.telMark
                },data => {
                  if (data.data.resCode == 1) {
                    this.$router.push('/myAccount/accountCard')
                } else {
                  this.loading = false
                  this.$confirm(data.data.resMsg, '温馨提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    closeOnClickModal: false,
                    type: 'warning'
                  }).then(() => {
                      this.$router.go(-1)
                  });
                }
              })
              } else {
            return false;
          }
          });
          },
          // 获取手机验证码
          getPhoneMark (formName) {
            this.$refs.ruleForm.validateField('bankTel', (msg) => {
              if (msg == '') {
              if (this.phoneCount == 60) {
                // 每隔60s
                this.getMark()
              }
            }
          })
          },
          // 获取信息
          getInfo () {
            global.http.post(this,"/account/toAddBank",{},data => {
              if (data.data.resCode == 1) {
                this.realName = data.data.resData.realName
              }else{
                this.$confirm(data.data.resMsg, '温馨提示', {
                  confirmButtonText: '确定',
                  showCancelButton: false,
                  closeOnClickModal: false,
                  type: 'warning'
                }).then(() => {
                    this.$router.go(-1)
                });
              }
            })
          },
          // 获取省
          getProvince () {
            global.http.post(this,"/zsbank/province",{},data => {
              this.provinceList = data.data.resData.provinceList
          })
          },
          // 获取市
          getCity() {
            let provinceId
            this.ruleForm.city = ''
            //  查询省的id
            this.provinceList.forEach((item) => {
              if (item.provinceName == this.ruleForm.province) {
                provinceId = item.provinceId
              }
            });
            global.http.post(this,"/zsbank/city",{province:provinceId},data => {
            this.cityList = data.data.resData.cityList
          })
          },
          // 获取银行
          getBank() {
            global.http.post(this,"/account/bank/list",{},data => {
              this.bankList = data.data.resData.accountBankList
            })
          },
          // 获取手机验证码
          getMark () {
            global.http.post(this,"/account/addBank",{
              bankCode: this.ruleForm.bank,
              bankNo: this.ruleForm.bankId,
              province: this.ruleForm.province,
              city: this.ruleForm.city,
              phoneNo: this.ruleForm.bankTel
            },data => {
              if (data.data.resCode == 1) {
                this.$message({message:data.data.resMsg,type: 'success'});
                let _this = this
                this.ticket = data.data.resData.ticket
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
              this.$confirm(data.data.resMsg, '温馨提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                closeOnClickModal: false,
                type: 'warning'
              }).then(() => {
                  this.$router.go(-1)
              });
            }
            })
          },
        }
    }</script>
<style scoped>
  .single-main{
    position: relative;
    height: 900px;
  }
  .bind-input-div {
    margin-top: 100px;
  }
  .tip {
    position: absolute;
    right: 30px;
    top: 70px;
    font-size: 14px;
  }
  .tip i {
    display: inline-block;
    vertical-align: middle;
    width: 17px;
    height: 18px;
    background:url("https://aliyunsso.edspay.com/web/myAccount/icon-prompt-normal.png") no-repeat;
  }
  .tip span {
    color: #7ac5ff;
  }

  /*按钮*/
  .editBtn {
    border-radius: 0;
    height: 40px;
    width: 130px;
  }
  .confirm-btn {
    width: 350px;
    height: 50px;
    line-height: 50px;
    margin:50px auto 0 auto;
    float: right;
  }
  .router-color {
    color: #1c8de0;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../../style/account.less";
</style>
