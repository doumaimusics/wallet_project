<template>
  <div v-loading.body="loading" class="mySetting">
    <ui-title title="账户设置" isBorder='have'></ui-title>
    <div class="setting-bottom">
      <ui-circle class="account-pic" :security="safeValue"></ui-circle>
      <!--<div class="account-pic"></div>-->
      <div class="setting-div">
        <!--绑定邮箱-->
        <div class="setting-item">
            <div> 
              <i class="icon_font iconfont">&#xe678;</i>
              <div class="setting-form">
                <h1>绑定邮箱
                  <span class="setting-isBind" v-if="isBindEmail">已绑定<span>({{bindEmail}})</span></span>
                  <span class="setting-isBind" v-else style="color:#FF5B4C;">未绑定</span>
                </h1>
                <h2>找回密码，接收最新消息</h2>
                <el-button class="editBtn mg20" @click="editInfo('mail','修改')" v-if="user.emailStatus">{{emailText}}</el-button>
                <el-button class="editBtn mg20" @click="editInfo('mail','去绑定')" style="color:#FF3A40;border:1px solid #ff3a40;" v-else>{{emailText}}</el-button>
              </div>
            </div>
            <!--修改邮箱-->
            <div v-if="editMail">
              <div class="editMail-form"  v-if="emailStatus">
                <el-form ref="emailedForm" :model="emailedForm">
                  <!--验证码-->
                  <div class="inputGroup">
                    <el-form-item
                      prop="mark"
                      :rules="[
                        { required: true, message: '验证码不能为空'}
                      ]"
                    >
                      <el-input v-model="emailedForm.mark" placeholder="请输入验证码" class="email-numInput"></el-input>
                      <i class="safe-icon input-icon"></i>
                      <el-button class="num-btn editBtn" @click="getOldEmailMark('emailedForm')">{{emailMark}}</el-button>
                    </el-form-item>
                  </div>
                  <el-form-item>
                    <div class="confirm-btn setting_btn" @click="emailNext('emailedForm')">下一步</div>
                  </el-form-item>
                </el-form>
              </div>
              <!--下一步-->
              <div class="editMail-form" v-show="!emailStatus">
                <el-form ref="emailValidateForm" :model="emailValidateForm">
                  <!--邮箱-->
                  <div class="inputGroup">
                    <el-form-item
                      prop="email"
                      :rules="[
                        { required: true, message: '邮箱地址不能为空'},
                        { type: 'email', message: '邮箱格式不正确'}
                      ]">
                      <el-input v-model="emailValidateForm.email" placeholder="请输入您的邮箱地址" class="email-input"></el-input>
                      <i class="mail-icon input-icon"></i>
                    </el-form-item>
                  </div>
                  <!--验证码-->
                  <div class="inputGroup">
                    <el-form-item
                      prop="mark"
                      :rules="[
                        { required: true, message: '验证码不能为空'}
                      ]"
                    >
                      <el-input v-model="emailValidateForm.mark" placeholder="请输入验证码" class="email-numInput"></el-input>
                      <i class="safe-icon input-icon"></i>
                      <el-button class="num-btn editBtn" @click="getEditEmailMark('emailValidateForm')">{{newEmailMark}}</el-button>
                    </el-form-item>
                  </div>
                  <el-form-item>
                    <div class="confirm-btn setting_btn" @click="editEmail('emailValidateForm')">确定</div>
                  </el-form-item>
                </el-form>
              </div>
            </div>
        </div>

 

        <!--绑定手机-->
        <div class="setting-item top20">
            <div>
              <i class="icon_font iconfont">&#xe679;</i>
              <div class="setting-form">
                <h1>绑定手机
                  <span class="setting-isBind">已绑定<span>({{bindPhone}})</span></span>
                </h1>
                <h2>账户资金变动，实时通知</h2>
                <el-button class="editBtn mg20" @click="editInfo('phone',phoneText)">{{phoneText}}</el-button>
              </div>
            </div>

            <!--修改手机-->
            <div v-if="editPhone">
              <div class="editPhone-form editMail-form" v-show="phoneStatus">
                <el-form ref="phoneValidateForm" :model="phoneValidateForm">
                  <!--图文验证码-->
                    <div class="inputGroup">
                      <el-form-item
                        prop="picmark"
                        :rules="[
                          { required: true, message: '图文验证码不能为空'}
                        ]">
                        <el-input v-model="phoneValidateForm.picmark" placeholder="请输入图文验证码" class="email-numInput"></el-input>
                        <img  :src="codeImg" class="mark-div" @click="change"/>
                        <i class="mark-icon input-icon"></i>
                      </el-form-item>
                    </div>
                    <!--验证码-->
                    <div class="inputGroup">
                      <el-form-item
                        prop="mark"
                        :rules="[
                          { required: true, message: '验证码不能为空'}
                        ]">
                          <el-input v-model="phoneValidateForm.mark" placeholder="请输入验证码" class="email-numInput"></el-input>
                          <i class="safe-icon input-icon"></i>
                          <el-button class="num-btn editBtn" @click="getPhoneMark(phoneValidateForm)">{{phoneMark}}</el-button>
                      </el-form-item>
                    </div>
                    <el-form-item>
                      <div class="confirm-btn setting_btn" @click="phoneNext('phoneValidateForm')">下一步</div>
                    </el-form-item>
                  </el-form>
                </div>
              <!--下一步-->
              <div class="editPhone-form editMail-form" v-show="!phoneStatus">
                <el-form ref="phoneForm" :model="phoneForm" :rules="phoneRule">
                  <!--手机号-->
                  <div class="inputGroup">
                    <el-form-item prop="phone">
                      <el-input v-model="phoneForm.phone" placeholder="请输入手机号" class="email-input"></el-input>
                      <i class="mail-icon input-icon"></i>
                    </el-form-item>
                  </div>
                  <!--图文验证码-->
                  <div class="inputGroup">
                    <el-form-item prop="picmark">
                      <el-input v-model="phoneForm.picmark" placeholder="请输入图文验证码" class="email-numInput"></el-input>
                      <img  :src="codeImg" class="mark-div" @click="change"/>
                      <i class="mark-icon input-icon"></i>
                    </el-form-item>
                  </div>
                  <!--验证码-->
                  <div class="inputGroup">
                    <el-form-item prop="mark">
                      <el-input v-model="phoneForm.mark" placeholder="请输入验证码" class="email-numInput"></el-input>
                      <i class="safe-icon input-icon"></i>
                      <el-button class="num-btn editBtn" @click="getEditPhoneMark(phoneForm)">{{newPhoneMark}}</el-button>
                    </el-form-item>
                  </div>
                  <el-form-item>
                    <div class="confirm-btn setting_btn" @click="editPhoneInfo('phoneForm')">确定</div>
                  </el-form-item>
                </el-form>
              </div>
              </div>

        </div>

        <!--登录密码-->
        <div class="setting-item top20">
            <div>
              <i class="icon_font iconfont">&#xe67b;</i>
              <div class="setting-form">
                <h1>
                  登录密码<span class="setting-isBind">已设置</span>
                </h1>
                <h2>登录时需要输入的密码</h2>
                <el-button class="editBtn mg20" @click="editInfo('psw',pswText)">{{pswText}}</el-button>
              </div>
            </div>
                  <!--修改密码模块-->
              <div v-if="editPsw">
                <div class="editMail-form">
                  <el-form ref="pswValidateForm" :model="pswValidateForm" :rules="rules2">
                    <div class="inputGroup">
                      <el-form-item
                        prop="old">
                        <el-input v-model="pswValidateForm.old" placeholder="请输入原始密码" class="email-input"></el-input>
                        <i class="psw-icon input-icon"></i>
                      </el-form-item>
                    </div>
                    <div class="inputGroup psw-input">
                      <el-form-item
                        prop="new">
                        <el-input v-model="pswValidateForm.new" placeholder="输入新密码,不少于8位" class="email-input"></el-input>
                        <i class="psw-icon input-icon"></i>
                      </el-form-item>
                    </div>
                    <div class="inputGroup psw-input">
                      <el-form-item
                        prop="checknew">
                        <el-input v-model="pswValidateForm.checknew" placeholder="再次输入新密码" class="email-input"></el-input>
                        <i class="psw-icon input-icon"></i>
                      </el-form-item>
                    </div>
                    <el-form-item>
                      <div class="confirm-btn setting_btn" @click="editPswInfo('pswValidateForm')">确定</div>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
        </div>
       
        
        <!--交易密码-->
        <div class="setting-item top20" style="border-bottom:none;">
            <div>
                <i class="icon_font iconfont">&#xe67a;</i>
                <div class="setting-form">
                  <h1>
                    交易密码
                    <span class="setting-isBind" v-if="dealPsw">已设置</span>
                    <span class="setting-isBind" v-else style="color:#FF5B4C;">未设置</span>
                  </h1>
                  <h2>交易时需要输入的密码</h2>
                  <el-button class="editBtn mg20" @click="editInfo('dealPsw','修改')" v-if="dealPsw">{{dealPswText}}</el-button>
                  <el-button class="editBtn mg20" @click="editInfo('dealPsw','去设置',1)" style="color:#FF3A40;border:1px solid #ff3a40;" v-else >{{dealPswText}}</el-button>
                  <p class="passWj" @click="retPass = true" v-if="dealPsw">忘记密码？</p>
                </div>
            </div>
                 <!--修改交易密码模块-->
                <div v-if="dealEditPsw">
                  <div class="editMail-form">
                    <el-form ref="dealPswValidateForm" :model="dealPswValidateForm" :rules="rules">
                      <div class="inputGroup">
                        <el-form-item
                          prop="old" v-if="dealPsw">
                          <el-input v-model="dealPswValidateForm.old" placeholder="请输入原交易密码" class="email-input"></el-input>
                          <i class="dealPsw-icon1 dealIcon input-icon"></i>
                        </el-form-item>
                      </div>
                      <div class="inputGroup psw-input">
                        <el-form-item
                          prop="new">
                          <el-input v-model="dealPswValidateForm.new" placeholder="请设置六位数字交易密码" class="email-input"></el-input>
                          <i class="dealPsw-icon2 dealIcon input-icon"></i>
                        </el-form-item>
                      </div>
                      <div class="inputGroup psw-input">
                        <el-form-item
                          prop="checknew">
                          <el-input v-model="dealPswValidateForm.checknew" placeholder="请确认交易密码" class="email-input"></el-input>
                          <i class="dealPsw-icon3 dealIcon input-icon"></i>
                        </el-form-item>
                      </div>
                      <el-form-item v-if="dealPsw">
                        <div class="confirm-btn setting_btn" @click="dealpass('dealPswValidateForm', 1)">确定修改</div>
                      </el-form-item>
                      <el-form-item v-else>
                        <div class="confirm-btn setting_btn" @click="dealpass('dealPswValidateForm', 2)">确定设置</div>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>


        </div>
        
      </div>
    </div>
    <con-invest-P2p v-if="retPass" @conInvest="retPass = $event" :json='retPassJson' :paw='true'></con-invest-P2p>
  </div>
</template>
<script>
    import getUrl from '../../../common/router/getUrl'           // 获取登录信息验证
    import title from '../../public/account-title.vue'
    import bigCircle from '../template/newSafe.vue'                 // 安全等级
    import getData from '../../../common/router/getData'         // 获取图片验证码
    import conInvestP2p from '../template/conInvestP2p.vue';            // p2p标的出借弹出框
    export default {
      mixins: [getUrl,getData],
      data () {
        // 验证
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          }
          var pwdT=/^(?![^a-zA-Z]+$)(?!\D+$).{8,16}$/;
          pwdT.test(value)?callback() : callback(new Error('密码格式错误'));
        };
        var dealValidatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          }
          var reg=/^\d{6}$/;
          reg.test(value)?callback() : callback(new Error('密码格式错误'));
        };
        var dealValidatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.dealPswValidateForm.new) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.pswValidateForm.new) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        //  手机号验证
        var validateTel = (rule, value, callback) => {
          let sign = 0
          if (value === '') {
            callback(new Error('请输入银行预留手机号'));
          }
          var tel=/^1\d{10}$/;
          tel.test(value)?callback() : callback(new Error('手机号格式错误'));
        };
        return {
          retPassJson:{
            phone:''
          },    // 传值给找回密码框
          retPass:false,     // 找回密码框
          dealPsw: false,    // 是否设置交易密码
          loading: true,
          info: {},
          user: {},
          type: '',
          input: '',
          emailText: '修改',
          phoneText: '修改',
          pswText: '修改',
          dealPswText: '修改',
          emailMark: '获取验证码',
          phoneMark: '获取验证码',
          newPhoneMark: '获取验证码',
          newEmailMark : '获取验证码',
          czbShowFlag:'',     //   是否白名单
          zsOpenStatus:'',    //  是否开通存管  1 开通
          emailCount: 60,
          phoneCount: 60,
          newPhoneCount: 60,
          newEmailCount: 60,
          editMail:false,
          editPhone: false,
          editPsw: false,
          dealEditPsw: false,
          emailStatus: 0,
          phoneStatus: 0,
          isBindEmail: 0,
          phoneSign: '',
          emailSign: '',
          bindPhone: '',
          bindEmail:　'',
          safeValue: '',
          emailValidateForm: {
            email: '',
            mark: ''
          },
          phoneValidateForm: {
            picmark: '',
            mark: ''
          },
          pswValidateForm: {
            old: '',
            new: '',
            checknew: ''
          },
          dealPswValidateForm: {
            old: '',
            new: '',
            checknew: ''
          },
          emailedForm : {
            mark: '',
          },
          phoneForm: {
            phone: '',
            picmark: '',
            mark: ''
          },
          rules: {        // 交易密码验证规则
            old: [
              { validator: dealValidatePass, trigger: 'blur' }
            ],
            new: [
              { validator: dealValidatePass, trigger: 'blur' }
            ],
            checknew: [
              { validator: dealValidatePass2, trigger: 'blur' }
            ],
          },
          rules2: {
            old: [
              { validator: validatePass, trigger: 'blur' }
            ],
            new: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checknew: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          },
          phoneRule: {
            phone: [
              { validator: validateTel, trigger: 'blur' }
            ],
            picmark: [
              { required: true, message: '图文验证码不能为空', trigger: 'change'},
            ],
            mark: [
              { required: true, message: '验证码不能为空', trigger: 'change'},
            ],
          }
        }
      },
      created () {
        this.getInfo ()
        this.change ()
        
      },
      methods: {
        getInfo () {
          global.http.post(this,"/member/security/settingInfo",{},data => {
            this.info = data.data.resData
            this.user = data.data.resData.userIdentify
            this.zsOpenStatus = data.data.resData.zsOpenStatus
            this.bindPhone = data.data.resData.hideMobilePhone
            this.retPassJson.phone = data.data.resData.hideMobilePhone
            this.bindEmail = data.data.resData.hideEmail
            this.emailStatus = data.data.resData.userIdentify.emailStatus
            this.isBindEmail = data.data.resData.userIdentify.emailStatus
            this.phoneStatus = data.data.resData.userIdentify.mobilePhoneStatus
            this.safeValue = parseFloat(data.data.resData.securityValue)   // 安全等级值
            data.data.resData.userIdentify.emailStatus == 0 ? this.emailText = '去绑定' : this.emailText = '修改'
            this.emailStatus ? this.emailText = '修改' : this.emailText = '去绑定'
            this.loading = false
            data.data.resData.isSetTradePass == 0 ? this.dealPsw = false : this.dealPsw = true
            this.dealPsw ? this.dealPswText = '修改' : this.dealPswText = '去设置'
          })
        },
        editInfo (val,text, n) {
          // 判断类型
          if (val == 'mail'){
            this.editMail = !this.editMail
            this.emailStatus = this.user.emailStatus
            this.editMail? this.emailText = '取消':this.emailText = text
          } else if (val == 'phone') {
            this.editPhone = !this.editPhone
            this.phoneStatus = this.user.mobilePhoneStatus
            text == '修改'? this.phoneText = '取消':this.phoneText = '修改'
          } else if (val == 'psw') {
            this.editPsw = !this.editPsw
            text == '修改'? this.pswText = '取消':this.pswText = '修改'
          }else if (val == 'dealPsw') {
            if(n==1 && this.zsOpenStatus==0){
              this.$confirm('您还未开通存管账户，请先开通存管', '温馨提示', {
                confirmButtonText: '开通',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push('/myAccount/openAccount')
              })
            }else{
              this.dealEditPsw = !this.dealEditPsw
              this.dealEditPsw ? this.dealPswText = '取消':this.dealPswText = text
            }
          }
        },
        // 获取旧手机验证码
        getPhoneMark (formName) {
          this.$refs.phoneValidateForm.validateField('picmark', (msg) => {
            if (msg == '') {
            if (this.phoneCount == 60) {
                this.getOldPhone()
              }
            }
          })
        },
        getOldPhone () {
          global.http.post(this,"/member/security/modifyPhoneCode",{
            captchaId:this.captchaId,
            validCode:this.phoneValidateForm.picmark,
          },data => {
            if (data.data.resCode == 1) {
            this.$message({message:data.data.resMsg,type: 'success'});
            let _this = this
            if (this.phoneCount == 60) {
              // 每隔60s
              var phoneInterval = setInterval(function () {
                _this.phoneCount--
                _this.phoneMark = _this.phoneCount + 's'
                if (_this.phoneCount === 0) {
                  clearInterval(phoneInterval)
                  _this.phoneMark = '重新发送'
                  _this.phoneCount = 60
                }
              }, 1000)
            }
          } else {
              this.change()
              this.$message({message:data.data.resMsg,type: 'error'});
            }
          })
        },
        // 手机下一步
        phoneNext (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              global.http.post(this,"/member/security/checkModifyPhoneCode",{
                code: this.phoneValidateForm.mark
              },data => {
                if (data.data.resCode == 1) {
                this.phoneSign = data.data.resData.modifyPhoneSign
                this.phoneStatus = 0
                this.phoneMark = '获取验证码'
                this.change()
              } else {
                this.$message({message:data.data.resMsg,type: 'error'});
              }
            })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        // 获取新手机验证码
        getEditPhoneMark () {
          this.$refs.phoneForm.validateField('phone', (msg) => {
            if (msg == '') {
            global.http.post(this,"/checkedMobilePhone",{
              mobilePhone: this.phoneForm.phone
            },data => {
              if (data.data.resCode == 0) {
                this.$message({message:data.data.resMsg,type: 'error'});
              } else {
                if (this.newPhoneCount == 60) {
                  this.getNewPhone()
                }
              }
            })
            }
          })
        },
        getNewPhone () {
          global.http.post(this,"/member/security/bindPhoneCode",{
            mobilePhone: this.phoneForm.phone,
            captchaId:this.captchaId,
            validCode:this.phoneForm.picmark,
          },data => {
            if (data.data.resCode == 1) {
            this.$message({message:data.data.resMsg,type: 'success'});
            let _this = this
            if (this.newPhoneCount == 60) {
              // 每隔60s
              var phoneInterval = setInterval(function () {
                _this.newPhoneCount--
                _this.newPhoneMark = _this.newPhoneCount + 's'
                if (_this.newPhoneCount === 0) {
                  clearInterval(phoneInterval)
                  _this.newPhoneMark = '重新发送'
                  _this.newPhoneCount = 60
                }
              }, 1000)
            }
          } else {
              this.change()
              this.$message({message:data.data.resMsg,type: 'error'});
            }
          })
        },
        // 修改手机
        editPhoneInfo (formName) {
          this.$refs[formName].validate((valid) => {
              if (valid) {
                global.http.post(this,"/member/security/doBindPhone",{
                  code: this.phoneForm.mark,
                  mobilePhone: this.phoneForm.phone,
                  modifyPhoneSign: this.phoneSign
                },data => {
                  if (data.data.resCode == 1) {
                  this.$message({message:data.data.resMsg,type: 'success'});
                  this.bindPhone = this.phoneForm.phone.substring(0,3)+"****"+this.phoneForm.phone.substring(7,11)
                  this.editPhone = false
                  this.phoneMark = '获取验证码'
                  this.phoneText = '修改'
                  this.phoneCount = 60
                } else {
                    this.$message({message:data.data.resMsg,type: 'error'});
                  }
                })
              } else {
                console.log('error submit!!');
            return false;
            }
          });
        },
        // 修改密码
        editPswInfo(formName) {
          this.inspectCookin(2)
          let _this = this
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post(this.ajaxUrl.getUrl(1) + "/user/modify/pwd", {
                pwd : _this.pswValidateForm.old,
                newPwd : _this.pswValidateForm.new,
                confirmNewPwd : _this.pswValidateForm.checknew,
                token : _this.token
              }).then((data) => {
                if (data.body.resCode == 1) {
                  _this.$confirm('修改密码成功。请重新登录', '温馨提示', {
                    confirmButtonText: '确定',
                    showCancelButton:false,
                    type: 'success'
                  }).then(() => {
                    _this.$emit('sigeinfo',true,'second');
                  })
                } else {
                  _this.$message({message:data.body.resMsg,type: 'error'});
                }
              }, (rest) => {
                // 响应错误回调
              })
            } else {
              return false;
            }
          });
        },
        // 修改或者设置交易密码
        dealpass(formName, n){      
            this.inspectCookin(2)
            let _this = this
            this.$refs[formName].validate((valid) => {
              let gitUrl=''
              let gitJson={}
              let confirmText=''
              if (valid) {
                if(n==1){     // 修改交易密码
                  gitUrl='/user/updateTradePass'
                  gitJson={
                    oldPass : _this.dealPswValidateForm.old,
                    newPass : _this.dealPswValidateForm.new,
                    confirmPass : _this.dealPswValidateForm.checknew,
                    token : _this.token
                  }
                  confirmText='修改交易密码成功'
                }else{       // 设置交易密码
                  gitUrl='/user/setTradePass'
                  gitJson={
                    pass : _this.dealPswValidateForm.new,
                    confirmPass : _this.dealPswValidateForm.checknew,
                    token : _this.token,
                    setPassType: ''
                  }
                  confirmText='设置交易密码成功'
                }
                this.$http.post(this.ajaxUrl.getUrl(1) + gitUrl, gitJson).then((data) => {
                  if (data.body.resCode == 1) {
                    _this.$confirm(confirmText, '温馨提示', {
                      confirmButtonText: '确定',
                      showCancelButton:false,
                      type: 'success'
                    }).then(() => {
                      this.dealEditPsw = false
                      this.dealPsw = false
                      this.getInfo()
                    })
                  } else {
                    _this.$message({message:data.body.resMsg,type: 'error'});
                  }
                }, (rest) => {
                  // 响应错误回调
                })
              } else {
                return false;
              }
            });
        },
        // 获取新邮箱验证码
        getEditEmailMark (ruleForm) {
          this.$refs[ruleForm].validateField('email', (msg) => {
            if (msg == '') {
            global.http.post(this,"/member/security/checkEmail",{
              email: this.emailValidateForm.email
            },data => {
              if (data.data.resCode == 0) {
              this.$message({message:data.data.resMsg,type: 'error'});
              } else {
                  if (this.newEmailCount == 60) {
                    this.getNewEmail()
                  }
                }
              })
            }
          })
        },
        getNewEmail () {
          global.http.post(this,"/member/security/bindEmailCode",{
            email: this.emailValidateForm.email
          },data => {
            if (data.data.resCode == 1) {
            this.$message({message:data.data.resMsg,type: 'success'});
            let _this = this
            if (this.newEmailCount == 60) {
              // 每隔60s
              var emailInterval = setInterval(function () {
                _this.newEmailCount--
                _this.newEmailMark = _this.newEmailCount + 's'
                if (_this.newEmailCount === 0) {
                  clearInterval(emailInterval)
                  _this.newEmailMark = '重新发送'
                  _this.newEmailCount = 60
                }
              }, 1000)
            }
          } else {
              this.$message({message:data.data.resMsg,type: 'error'});
            }
          })
        },
        // 修改邮箱
        editEmail (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
                global.http.post(this,"/member/security/doBindEmail",{
                  code:this.emailValidateForm.mark,
                  email:this.emailValidateForm.email,
                  modifyEmailSign:this.emailSign,
                },data => {
                  if(data.data.resCode == 1) {
                    this.$message({message:data.data.resMsg,type: 'success'});
                    this.emailStatus = 1
                    this.editMail = false
                    this.emailText = '修改'
                    this.isBindEmail = 1
                    let mailName = this.emailValidateForm.email.split('@')[0]
                    let mailLast = this.emailValidateForm.email.split('@')[1]
                    this.bindEmail = mailName.substring(0,1)+'****'+mailName.substr(-1)+'@'+mailLast
                  } else {
                    this.$message({message:data.data.resMsg,type: 'error'});
                  }
              })
            } else {
                console.log('error submit!!');
                return false;
              }
            });
        },
        // 获取老邮箱验证码
        getOldEmailMark () {
          if (this.emailCount == 60) {
              this.getOldEmail()
            }
          },
        getOldEmail () {
          global.http.post(this,"/member/security/modifyEmailCode",{},data => {
            if (data.data.resCode == 1) {
            this.$message({message:data.data.resMsg,type: 'success'});
            let _this = this
            if (this.emailCount == 60) {
              // 每隔60snewPhoneCount
              var emailInterval = setInterval(function () {
                _this.emailCount--
                _this.emailMark = _this.emailCount + 's'
                if (_this.emailCount === 0) {
                  clearInterval(emailInterval)
                  _this.emailMark = '重新发送'
                  _this.emailCount = 60
                }
              }, 1000)
            }
          } else {
              this.$message({message:data.data.resMsg,type: 'error'});
            }
          })
        },
        // 邮箱下一步
        emailNext (formName) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              global.http.post(this,"/member/security/checkModifyEmailCode",{
                code: this.emailedForm.mark
              },data => {
                if (data.data.resCode == 1) {
                  this.emailSign = data.data.resData.modifyEmailSign
                  this.emailStatus = 0
                  this.emailMark = '获取验证码'
                } else {
                  this.$message({message:data.data.resMsg,type: 'error'});
                }
              })
            } else {
              console.log('error submit!!');
              return false;
            }
          });
        },
      },
      mounted () {

      },
      components: {
        'ui-title': title,
        'ui-circle': bigCircle,
        "conInvestP2p": conInvestP2p
      }
    }
</script>
<style scoped>
.mySetting.account-route{
        padding:30px 30px;
}
.title-main.haveBorder{
  border-bottom: none;
  padding-left: 0;
} 
  .setting-bottom{
   /* margin-top: 50px;
     display: flex;
    flex-direction: row; */
  }
  .setting-item {
    position: relative;
    /* display: flex;
    flex-direction: row; */
    border-bottom: 1px dashed #e5e5e5;
    padding: 30px 10px 30px 0;   }
  .setting-item .icon_font{
     color: #3A9AFC;
     font-size: 18px;
     float: left;
  }
  .setting-form{
    margin-left: 35px;
    width: 100%;
  }
  .setting-isBind{
    font-size: 14px;
    padding-left: 8px;
  }
  .setting-isBind span{
    color: #999999;
  }
  .setting-form h1 {
    line-height: 20px;
    margin-bottom: 13px;
    font-size: 16px;
    color: #333333;
  }
  .setting-form p.passWj {
    font-family: PingFangSC-Regular;
    font-size: 12px;
    color: #7AC5FF;
    display: inline-block;
    margin-left: 12px;
    cursor: pointer;
  }
  .setting-form h2{
    font-size: 14px;
    color: #808080;
  }
  .setting_btn{
    width: 88px;
    height: 38px;
    font-size: 16px;
color: #FFFFFF;
  }
  .editBtn{
    /*margin-bottom: 20px;*/
  }
  .editBtn i{
    color: #999999;
  }
  .top20 {
  }
  .mg20 {
    width: 88px;
    height: 38px;
    margin-bottom: 20px;
    position: absolute;
    top: 35px;right: 40px;
    font-size: 16px;
    color: #333333;
  }
  /*icon*/
  .icon{
    display: inline-block;
    background: url("https://aliyunsso.edspay.com/web/myAccount/%E5%88%87%E5%9B%BE11.png") no-repeat;
  }
  .input-icon{
    display: inline-block;
    background: url("https://aliyunsso.edspay.com/web/myAccount/qietu2.png") no-repeat;
  }
  .mail-icon {
    top: 11px;
    left:7px;
    width: 23px;
    height: 16px;
    background-position: -7px -164px;
  }
  .safe-icon {
    top: 24px;
    left: 12px;
    width: 18px;
    height: 18px;
    background-position: -11px -86px;
  }
  .mark-icon {
    top: 24px;
    left: 12px;
    width: 18px;
    height: 18px;
    background-position: -11px -124px;
  }
  .psw-icon{
    top: 10px;
    left: 12px;
    width: 18px;
    height: 18px;
    background-position: -11px -49px;
   }
   .dealIcon{
      top: 12px;
      left: 15px;
      width: 12px;
      height: 15px;
      display: inline-block;
   }
   .dealPsw-icon1{
    background: url("https://aliyunsso.edspay.com/web/myAccount/dealPsw1.png") no-repeat;
      background-size: 12px 15px;
   }
   .dealPsw-icon2{
    background: url("https://aliyunsso.edspay.com/web/myAccount/dealPsw2.png") no-repeat;
      background-size: 12px 15px;
   }
   .dealPsw-icon3{
    background: url("https://aliyunsso.edspay.com/web/myAccount/dealPsw3.png") no-repeat;
      background-size: 12px 15px;
   }

  .mail{
    width: 50px;
    height: 35px;
    background-position: -1px -7px;
  }
  .phone{
    width: 35px;
    height: 45px;
    background-position: -7px -53px;
    margin-right: 15px;
  }
  .psw{
    width: 35px;
    height: 45px;
    background-position: -7px -102px;
    margin-right: 15px;
  }
  .dealPsw{
    width: 35px;
    height: 45px;
    margin-right: 15px;
    display: inline-block;
    background: url("https://aliyunsso.edspay.com/web/myAccount/dealPsw.png") no-repeat;
    background-size: 35px 45px;
  }
  /*邮箱编辑*/
  .editMail-form{
    padding: 20px 0px 0px 35px;
  }
  .editPhone-form {
    padding: 10px 35px 0 35px;
  }
  .inputGroup {
    position: relative;
  }
  .input-icon {
    position: absolute;
  }
  /*验证码*/
  .mark-div{
    width: 100px;
    height: 40px;
    background: lightpink;
    position: absolute;
    top: 15px;
    left: 190px;
    cursor: pointer;
    border: 1px solid #E7E7E7;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
