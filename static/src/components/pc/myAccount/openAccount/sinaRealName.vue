<template>
  <div class="single-mask">
    <div class="single-main">
      <!--左上角标题-->
      <p class="single-title">实名认证</p>
      <!--表单-->
      <div class="bind-input-div">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :rules="rules">
          <!--姓名-->
          <el-form-item label="真实姓名：" prop="realName">
            <el-input v-model="ruleForm.realName" style="width: 180px" placeholder="请输入真实姓名" v-if="!isRealName"></el-input>
            <el-input v-model="ruleForm.realName" style="width: 180px"  v-if="isRealName" disabled>{{ruleForm.realName}}</el-input>
          </el-form-item>
          <!--身份证号-->
          <el-form-item label="身份证号：" prop="cardId">
            <el-input v-model="ruleForm.cardId" style="width: 440px" placeholder="请输入证件号码" v-if="!isRealName"></el-input>
            <el-input v-model="ruleForm.cardId" style="width: 440px"  v-if="isRealName" disabled>{{ruleForm.realName}}</el-input>
          </el-form-item>
          <div class="confirm-btn" @click="submitForm('ruleForm')" v-loading.body="loading">确认</div>
        </el-form>
      </div>
      <div class="single-icon"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      //          身份证验证
      var validateId = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入身份证号'));
        }
        var id=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        id.test(value)?callback() : callback(new Error('身份证格式错误'));
      };
      return{
        ruleForm: {
          cardId:'',
          realName: '',
        },
        rules: {
          realName: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' },
            { min: 2, max: 10, message: '真实姓名至少两个汉字', trigger: 'blur' }
          ],
          cardId: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
            { validator: validateId, trigger: 'blur' }
          ]
        },
        isRealName: false,
        loading: false,
      }
    },
    created () {
      this.checkRealName()
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.realName ()
          } else {
            return false;
          }
        });
      },
      realName () {
        this.loading = true
        global.http.post(this,"/account/realnameIdentify",this.ruleForm,data => {
          if (data.data.resCode ==1) {
            this.$router.push('/realNameSuc')
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
      },
      // 判断是否有实名
      checkRealName () {
        global.http.post(this,"/account/toRealnameIdentify",{},data => {
          if (data.data.resCode == 1) {
          this.ruleForm.realName = data.data.resData.realName
          this.ruleForm.cardId = data.data.resData.cardId
          data.data.resData.realName? this.isRealName = true :this.isRealName = false
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
    }
  }</script>
<style scoped>
  .single-main {
    justify-content: flex-start;
    height: 735px;
  }
  .bind-input-div {
    margin-top: 160px;
  }
  .confirm-btn {
    width: 350px;
    height: 50px;
    line-height: 50px;
    margin:50px auto 0 auto;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../../style/account.less";
</style>
