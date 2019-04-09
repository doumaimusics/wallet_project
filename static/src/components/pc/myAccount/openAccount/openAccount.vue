<template>
  <div class="single-mask">
    <div class="single-main">
      <!--左上角标题-->
      <p class="single-title" v-if="!ifRealName">实名认证</p>
      <!--表单-->
      <div class="bind-input-div">
        <!--判断是否实名-->
        <el-form :model="realForm" ref="realForm" class="demo-ruleForm" :rules="realRules" v-if="!ifRealName">
          <!--姓名-->
          <el-form-item label="真实姓名：" prop="name">
            <el-input v-model="realForm.name" style="width: 180px" placeholder="请输入真实姓名" v-if="!ruleForm.name"></el-input>
            <span v-if="ruleForm.name">{{ruleForm.name}}</span>
          </el-form-item>
          <!--身份证号-->
          <el-form-item label="身份证号：" prop="id">
            <el-input v-model="realForm.id" style="width: 440px" placeholder="请输入证件号码" v-if="!ruleForm.id"></el-input>
            <span v-if="ruleForm.id">{{ruleForm.id}}</span>
          </el-form-item>
          <div class="confirm-btn" @click="realSubmit('realForm')">下一步</div>
        </el-form>

        <!--获取信息-->
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules" v-if="ifRealName">
          <!--姓名-->
          <el-form-item label="真实姓名：" prop="name">
            <el-input v-model="ruleForm.name" style="width: 180px" placeholder="请输入真实姓名" v-if="noSina"></el-input>
            <span v-if="!noSina">{{ruleForm.name}}</span>
          </el-form-item>
          <!--身份证号-->
          <el-form-item label="身份证号：" prop="id">
            <el-input v-model="ruleForm.id" style="width: 440px" placeholder="请输入证件号码" v-if="noSina"></el-input>
            <span v-if="!noSina">{{ruleForm.id}}</span>
          </el-form-item>
          <!--银行卡号-->
          <el-form-item label="银行卡号：" prop="bankId">
            <el-input v-model="ruleForm.bankId" style="width: 440px" placeholder="请输入本人的银行卡号"></el-input>
            <p class="have-account" v-if="bankNo">
              <i></i>请填写{{bankNo}}的完整银行卡号</p>
          </el-form-item> 
          <!--开户银行-->
          <!--没新浪实名过或者后台没返回银行 要选-->
          <!--返回联行号的基础上，在判断是否显示银行-->
          <el-form-item label="开户银行：" prop="bank" v-if="ifCity || (!ifCity&&bankName)">
            <!--选择开户银行改变支行信息-->
            <el-select v-model="ruleForm.bank" style='width: 316px' placeholder="请选择开户银行" v-if="ifCity ||(!ifCity&&!bankName)" @change="getBranchBank">
              <el-option :label="bank.bankName" :value="bank.bankCode" v-for="bank in bankList"></el-option>
            </el-select>
            <!--后台已返回银行-->
            <span v-if="!ifCity&&bankName">{{bankName}}</span>
            <!--后台没返回银行的时候显示-->
            <el-popover v-if="!ifBank" popper-class="realNamePopover" placement="bottom-start" trigger="hover" width="340" height="190" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
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
              <div slot="reference" class="name-wrapper">
                <el-tag>
                  <span class="tip">支持银行和限额
                    <i></i>
                  </span>
                </el-tag>
              </div>
            </el-popover>
          </el-form-item>
          <!--省-->
          <el-form-item label="省份：" prop="province" v-if="infoList.province || ifCity">
            <el-select v-model="ruleForm.province" class="pcaSelect" placeholder="请选择省份" @change="getCity" v-if="!infoList.province">
              <el-option :label="province.provinceName" :value="province.provinceId" v-for="province in provinceList"></el-option>
            </el-select>
            <span v-if="infoList.province">{{ruleForm.province}}</span>
          </el-form-item>
          <!--市-->
          <el-form-item label="城市：" prop="city" v-if="infoList.city || ifCity">
            <el-select v-model="ruleForm.city" class="pcaSelect" placeholder="请选择城市" @change="getBranchBank" v-if="!infoList.city && !infoList.branch">
              <el-option :label="city.cityName" :value="city.gbAreaId" v-for="city in cityList"></el-option>
            </el-select>
            <el-select v-model="ruleForm.city" class="pcaSelect" placeholder="请选择城市" v-if="infoList.branch">
              <el-option :label="city.cityName" :value="city.gbAreaId" v-for="city in cityList"></el-option>
            </el-select>
            <span v-if="infoList.city">{{ruleForm.city}}</span>
          </el-form-item>
          <!--开户支行-->
          <el-form-item label="开户支行：" prop="branchBank">
            <el-input v-if="!infoList.branch" v-model="ruleForm.branchBank" style="width: 316px" placeholder="请选择开户行网点" @focus="isSelectBranch = true;searchBranch = ''"></el-input>
            <span v-if="infoList.branch">{{ruleForm.branchBank}}</span>
          </el-form-item>
          <!--银行预留手机-->
          <el-form-item label="银行预留手机：" prop="bankTel">
            <el-input v-model="ruleForm.bankTel" style="width: 316px" placeholder="请输入银行预留手机号" v-if="!infoList.phone"></el-input>
            <span v-if="infoList.phone">{{ruleForm.bankTel | phoneNumber}}</span>
          </el-form-item>
          <!--手机验证码-->
          <el-form-item label="手机验证码：" prop="telMark">
            <el-input v-model="ruleForm.telMark" style="width: 180px" placeholder="请输入短信验证码"></el-input>
            <el-button class="editBtn" @click="getPhoneMark('ruleForm')">{{phoneText}}</el-button>
          </el-form-item>
           <div class="xieyi">
             <i class="iconfont active" @click='xieyiIcon($event)'>&#xe628;</i>
             同意<em @click='accountReg=true'>《浙商银行网络借贷交易资金存管业务三方协议》</em>
             <em @click='chargeBack=true' >《浙商银行委托扣款业务服务协议》</em>
             </div>
          <div class="confirm-btn" @click="submitForm('ruleForm')" v-loading.body="loading">确认</div>
        </el-form>
      </div>
      <div class="single-icon"></div>
    </div>
    <!--弹出窗-->
    <el-dialog :visible.sync="isSelectBranch" size="tiny" class="branchBank-dialog">
      <h1>选择开户支行</h1>
      <div class="dialog-main">
        <div class="branchBank-search">
          <el-input placeholder="搜索" icon="search" v-model="searchBranch" :on-icon-click="getBranchBank" @change="getBranchBank"></el-input>
        </div>
        <div class="branBank-list">
          <ul>
            <li v-for="branch in branchBank" @click="isSelectBranch=false;ruleForm.branchBank=branch.bankName">
              {{branch.bankName}}
            </li>
          </ul>
        </div>
      </div>
    </el-dialog>
    <!-- 协议弹出窗 -->
    <openAccount-reg v-if="accountReg"  
    @close="accountReg = $event" 
     :name='realForm.name'
     :id='realForm.id'
     ></openAccount-reg>

    <chargeBack-reg v-if="chargeBack" 
    @close="chargeBack = $event"
     :name='ruleForm.name'
     :id='ruleForm.id'
     :tel = 'ruleForm.bankTel'
     :account =  'ruleForm.bankId'
     :branch = 'ruleForm.branchBank'
     ></chargeBack-reg>
  </div>
</template>
<script>
import openAccountReg from '../../template/Protocol/openAccountReg.vue'    // 存管业务第三方协议
import chargeBackReg from '../../template/Protocol/chargeBackReg.vue'    // 扣款业务协议
export default {
  data() {
    //  身份证验证
    var validateId = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入身份证号'));
      }
      var id = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      id.test(value) ? callback() : callback(new Error('身份证格式错误'));
    };
    //  手机号验证
    var validateTel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入银行预留手机号'));
      }
      var tel = /^1\d{10}$/;
      tel.test(value) ? callback() : callback(new Error('手机号格式错误'));
    };
    // 数字验证
    var validateBank = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入银行卡号'));
      }
      var tel = /^[0-9]*$/;
      tel.test(value) ? callback() : callback(new Error('银行卡格式错误'));
    };
    return {
      accountReg: false,
      chargeBack: false,
      isInfo: false,
      ticket: '',
      realForm: {
        name: '',
        id: '',
      },
      ruleForm: {
        name: '',
        id: '',
        bankId: '',
        bank: '',
        province: '',
        city: '',
        branchBank: '',
        bankTel: '',
        telMark: ''
      },
      realRules: {
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '真实姓名至少两个汉字', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateId, trigger: 'blur' }
        ],
      },
      rules: {
        name: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' },
          { min: 2, max: 10, message: '真实姓名至少两个汉字', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入身份证号', trigger: 'blur' },
          { validator: validateId, trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择省', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择市', trigger: 'change' }
        ],
        branchBank: [
          { required: true, message: '请选择开户行网点', trigger: 'change' }
        ],
        bankId: [
          { required: true, message: '请输入银行卡号', trigger: 'blur' },
          { validator: validateBank, trigger: 'blur' }
        ],
        bank: [
          { required: true, message: '请选择开户银行', trigger: 'change' }
        ],
        bankTel: [
          { required: true, message: '请输入银行预留手机', trigger: 'blur' },
          { validator: validateTel, trigger: 'blur' }
        ],
        telMark: [
          { required: true, message: '请输入手机验证码', trigger: 'blur' },
          { validateField: validateTel, trigger: 'blur' }
        ]
      },
      searchBranch: '',
      phoneText: '获取手机验证码',
      phoneCount: 60,
      provinceList: [],
      cityList: [],
      bankList: [],
      bankNo: '',
      branchBank: [],
      infoList: {},
      branchName: '',
      bankName: '',
      branchNo: '',
      provinceName: '',
      cityName: '',
      isSelectBranch: false,
      ifRealName: false,
      ifBank: true, // 判断是否返回开户银行
      ifCity: true, // 判断在已在其他平台开通浙商的账户信息，是否显示省市
      noSina: false, // 判断姓名身份证是否可修改
      loading: false
    }
  },
  components: {
    'openAccount-reg': openAccountReg,
    'chargeBack-reg': chargeBackReg
  },
  created() {
    this.getProvince()
    this.getBank()
    this.getInfo()
  },
  methods: {
    xieyiIcon(event){         // 点击同意协议按钮
				let v = event.target
				if(v.className == 'iconfont active'){
					v.classList.remove('active')
				}else{
					v.classList.add('active')
				}
			},
    realSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.getZS()
        } else {
          return false;
        }
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if($(".xieyi i").hasClass('active')){
            this.loading = true
           this.getBranchNo()
          this.getBankName()
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
          global.http.post(this, "/openZsAcc", {
            authCode: this.ruleForm.telMark,
            bankCode: this.ruleForm.bank,
            bankName: this.bankName,
            bankNo: this.ruleForm.bankId,
            branch: this.ruleForm.branchBank,
            cardId: this.ruleForm.id,
            city: this.cityName,
            phone: this.ruleForm.bankTel,
            province: this.provinceName,
            realName: this.ruleForm.name,
            unionBankNo: this.branchNo
          }, data => {
            if (data.data.resCode == 1) {
              this.$router.push('/openAccountSuc')
            } else {
              this.loading = false
              this.$message({ message: data.body.resMsg, type: 'error' });
            }
          })
				}else{
					this.$confirm('请先查看并点击勾选同意协议内容', '温馨提示', {
		    			confirmButtonText: '确定',
		    			showCancelButton:false,
		    			type: 'warning'
		    		}).then(() => {
                
              })
          }
        } else {
          return false;
        }
      });
    },
    // 获取手机验证码
    getPhoneMark(formName) {
      this.$refs.ruleForm.validateField('bankTel', (msg) => {
        if (msg == '') {
          if (this.phoneCount == 60) {
            this.getMark()
          }
        }
      })
    },
    // 获取省
    getProvince() {
      global.http.post(this, "/zsbank/province", {}, data => {
        this.provinceList = data.data.resData.provinceList
      })
    },
    // 获取市
    getCity() {
      this.ruleForm.city = ''
      global.http.post(this, "/zsbank/city", { province: this.ruleForm.province }, data => {
        this.cityList = data.data.resData.cityList
      })
    },
    // 获取银行
    getBank() {
      global.http.post(this, "/account/zsbank/list", {}, data => {
        this.bankList = data.data.resData.bankList
      })
    },
    // 获取支行
    getBranchBank() {
      this.ruleForm.branchBank = ''
      global.http.post(this, "/zsbank/branch", {
        bankCode: this.ruleForm.bank,
        gbAreaId: this.ruleForm.city,
        name: this.searchBranch
      }, data => {
        this.branchBank = []
        if (this.ruleForm.city) {
          this.branchBank = data.data.resData.branchList
        } else {
          this.branchBank = []
        }
      })
    },
    // 获取信息
    getInfo() {
      global.http.post(this, "/toOpenZsAcc", {}, data => {
        if (data.data.resCode == 1) {
          let info = data.data.resData
          this.infoList = data.data.resData
          info.realName ? this.ifRealName = true : this.ifRealName = false
          if (this.ifRealName) {
            info.realName ? this.ruleForm.name = info.realName : this.ruleForm.name = ''
            info.bankNo ? this.ruleForm.bankId = '' : this.ruleForm.bankId = ''
            info.bankNo ? this.bankNo = info.bankNo : this.bankNo = ''
            info.cardId ? this.ruleForm.id = info.cardId : this.ruleForm.id = ''
            info.province ? this.provinceName = info.province : this.provinceName = ''
            info.city ? this.cityName = info.city : this.cityName = ''
            info.unionBankNo ? this.branchNo = info.unionBankNo : this.branchNo = ''
            info.unionBankNo ? this.ifCity = false : this.ifCity = true
            info.phone ? this.ruleForm.bankTel = info.phone : this.ruleForm.bankTel = ''
            info.branch ? this.ruleForm.branchBank = info.branch : this.ruleForm.branchBank = ''
            info.bankCode ? this.ruleForm.bank = info.bankCode : this.ruleForm.bank = ''
            info.bankName ? this.bankName = info.bankName : this.bankName = ''
            info.bankName ? this.ifBank = true : this.ifBank = false
          }
        }
      })
    },
    // 获取手机验证码
    getMark() {
      global.http.post(this, "/getOpenAccCode", {
        bankNo: this.ruleForm.bankId,
        cardId: this.ruleForm.id,
        phone: this.ruleForm.bankTel,
        realName: this.ruleForm.name
      }, data => {
        if (data.data.resCode == 1) {
          this.$message({ message: data.data.resMsg, type: 'success' });
          // 每隔60s
          let _this = this
          var phoneInterval = setInterval(function() {
            _this.phoneCount--
            _this.phoneText = '(' + _this.phoneCount + 's)后重发'
            if (_this.phoneCount === 0) {
              clearInterval(phoneInterval)
              _this.phoneText = '重发'
              _this.phoneCount = 60
            }
          }, 1000)
        } else {
          this.$message({ message: data.data.resMsg, type: 'error' });
        }
      })
    },
    // 获取支行编码
    getBranchNo() {
      this.branchBank.forEach((item) => {
        if (item.bankName == this.ruleForm.branchBank) {
          this.branchNo = item.unionLineNo
        }
      });
    },
    // 获取银行名字
    getBankName() {
      this.bankList.forEach((item) => {
        if (item.bankCode == this.ruleForm.bank) {
          this.bankName = item.bankName
        }
      });
    },
    // 是否在其他平台开通过浙商
    getZS() {
      global.http.post(this, "/getAccBankInfo", {
        cardId: this.realForm.id,
      }, data => {
        if (data.data.resCode == 1) {
          this.ifRealName = true
          this.noSina = true
          this.infoList = data.data.resData
          var info = data.data.resData
          info.realName ? this.ruleForm.name = info.realName : this.ruleForm.name = this.realForm.name
          info.bankNo ? this.ruleForm.bankId = '' : this.ruleForm.bankId = ''
          info.bankNo ? this.bankNo = info.bankNo : this.bankNo = ''
          info.cardId ? this.ruleForm.id = info.cardId : this.ruleForm.id = this.realForm.id
          info.province ? this.provinceName = info.province : this.provinceName = ''
          info.city ? this.cityName = info.city : this.cityName = ''
          info.unionBankNo ? this.ifCity = false : this.ifCity = true
          info.unionBankNo ? this.branchNo = info.unionBankNo : this.branchNo = ''
          info.phone ? this.ruleForm.bankTel = info.phone : this.ruleForm.bankTel = ''
          info.branch ? this.ruleForm.branchBank = info.branch : this.ruleForm.branchBank = ''
          info.bankCode ? this.ruleForm.bank = info.bankCode : this.ruleForm.bank = ''
          info.bankName ? this.bankName = info.bankName : this.bankName = ''
          info.bankName ? this.ifBank = true : this.ifBank = false
        } else {
          this.$message({ message: data.body.resMsg, type: 'error' });
        }
      })
    },
  }
}</script>
<style scoped  lang="scss">
.single-main {
  justify-content: flex-start;
  height: auto;
}

.single-icon {
  background-position: -135px 0px;
}

.bind-input-div {
  margin-top: 80px;
}

.pcaSelect {
  width: 180px !important;
}

.tip {
  font-size: 12px;
  color: #7ac5ff;
  padding-left: 13px;
}

.tip i {
  display: inline-block;
  vertical-align: baseline;
  margin-left: 5px;
  width: 15px;
  height: 10px;
  background: url("https://aliyunsso.edspay.com/web/myAccount/btn-see-normal.png") no-repeat;
}

.name-wrapper:hover {
  cursor: pointer;
}

.realName-table {
  width: 340px;
}

.have-account {
  font-size: 12px;
  color: #5e5e5e;
  line-height: 14px;
  margin-top: 12px;
}

.have-account i {
  background: url("https://aliyunsso.edspay.com/web/myAccount/icon-prompt-normal.png") no-repeat;
  width: 16px;
  height: 16px;
  margin-right: 5px;
  display: inline-block;
  vertical-align: top;
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
  margin: 50px auto 0 auto;
}




/*选择支行弹出窗*/

.branchBank-dialog .dialog-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.branchBank-dialog h1 {
  font-size: 18px;
  color: #333333;
  text-align: center;
  width: 100%;
  border-bottom: 1px solid #e7e7e7;
  height: 40px;
}

.branchBank-search {
  margin-top: 20px;
}

.branBank-list {
  margin-top: 20px;
  width: 100%;
  text-align: center;
  max-height: 360px;
  overflow-y: auto;
  font-size: 14px;
  color: #333333;
}

.branBank-list ul li {
  height: 60px;
  line-height: 60px;
  width: 100%;
  cursor: pointer;
}

.branBank-list ul li:hover {
  background: #e7e7e7;
}

/*协议*/
.xieyi{
					width: 100%;
					height: 20px;
          font-size: 14px;
					text-align: left;
					color: #666;
					margin-top:15px;
					i{
            cursor: pointer;
						vertical-align: bottom;
						display: inline-block;
    					font-size: 21px;
						margin-right:5px;
						width:  20px;
						height: 20px;
						color:#666;
					}
					i.active{
						color:#7ed321;
					}
					em{
              cursor: pointer;
					}
				}
</style>
<style rel="stylesheet/less">
@import "../../../../style/account.less";
</style>

