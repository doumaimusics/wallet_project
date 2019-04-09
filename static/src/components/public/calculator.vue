<template>
    <div class="calculator-div">
        <!-- 头部 -->
        <div class="calculator-title">
            收益计算
            <span @click="close" class="iconfont">&#xe615;</span>
        </div>
        <!-- 表单验证 -->
        <div class="cal-form">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <!-- 出借金额 -->
                <el-form-item  prop="money" class="money-input">
                    <el-input v-model="ruleForm.money" 
                        style="width:178px;height:30px;" 
                        size="small" 
                        placeholder="输入出借金额"
                        @change="income = ''">
                        <template slot="append">元</template>
                    </el-input>
                </el-form-item>
                <!-- 天数 -->
                <el-form-item  prop="income">
                    <el-select v-model="ruleForm.income" placeholder="请选择项目期限" 
                    style="width:178px;height:30px;" 
                    size="small" 
                    popper-class="cal-pop-class"
                    @change="selectChange"> 
                        <el-option :label="item.lockTimeStr" :value="item.planApr" v-for="item in limit"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 约定年化 -->
                <div class="cal-year">参考年化: <span class="cal-per">{{ruleForm.income?ruleForm.income:0}}%</span></div>
                <!-- 按钮 -->
                <div class="cal-btn" @click="submitForm('ruleForm')">开始计算</div>
                <!-- 预计收益 -->
                <div class="cal-get">
                    参考年化收益<span>{{income | moneyFormat}}</span>元
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return{
            ruleForm: {
                money: '',
                income: ''
            },
            rules: {
                money: [
                    { required: true, message: '请填写出借金额', trigger: 'blur' }
                ],
                income: [
                    { type:'number',required: true, message: '请选择项目期限', trigger: 'change' }
                ],
            },
            days: '', // 天数
            income: '', //预计收益
        }
    },
    props: {
        limit : Array
    },
    methods: {
        close () {
            this.$emit('closeCal',false)
        },
        // 计算
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.income = (this.ruleForm.money * (this.ruleForm.income * 0.01)) / 360 * this.days
                } else {
                    return false;
                }
            });
        },
        // 查找所选天数
        getDay (val) {
            this.limit.forEach(x=>{
                if(x.planApr==val) {
                    let dayStr = x.lockTimeStr
                    this.days = dayStr.slice(0,-1)
                }
            })
        },
        selectChange (val) {
            this.getDay (val)
            this.income = ''
        }
    },
}
</script>
<style lang="scss" scoped>
    .calculator-div {
        position: absolute;
        left: -230px;
        top: 0px;
        width: 200px;
        height: 260px;
        border: 1px solid #4CB1FF;
        border-radius: 2px;
        background: white;
        .calculator-title {
            width: 100%;
            height: 30px;
            background: #58B6FF;
            font-size: 14px;
            color: #FFFFFF;
            line-height: 30px;
            padding: 0px 10px;
            span {
                 color: #FFFFFF;
                 float: right;
                 font-size: 8px;
                 cursor: pointer;
            }
        }
        .cal-form {
            width: 178px;
            margin:14px auto;
            .cal-year {
                width: 178px;
                font-size: 14px;
                color: #333333;
                padding-left: 5px;
                .cal-per {
                    font-size: 14px;
                    color: #58B6FF;
                    line-height: 20px;
                }
            }
            .cal-btn {
                border: 1px solid #F31B23;
                border-radius: 2px;
                font-size: 12px;
                color: #F31B23;
                width: 178px;
                height: 30px;
                text-align: center;
                line-height: 28px;
                margin-top: 15px;
                cursor: pointer;
            }
            .cal-btn:hover {
                color: white;
                background: #F31B23;
            }
            .cal-get {
                width: 178px;
                font-size: 14px;
                color: #333333;
                text-align: center;
                margin-top: 10px;
                line-height: 20px;
                span {
                    font-size: 14px;
                    color: #F31B23;
                    padding: 0px 2px;
                }
            }
        }
    }
</style>
<style lang="scss">
/*饿了么表单样式修改*/
    /*下拉框层级*/
    .cal-pop-class {
        z-index: 1000000 !important;
    }
    .calculator-div {
        .el-form-item__content{
            line-height: 28px;
        }
        .el-input__inner {
            border: 1px solid #4CB1FF;
            border-radius: 0px;
            font-size: 12px;
        }
        .el-input-group__append, .el-input-group__prepend {
            border: 1px solid #4CB1FF;
            border-radius: 0px;
            border-left:0px;
            color: #333333;
        }
        .el-select .el-input .el-input__icon {
            color:#4CB1FF;
            font-size:10px;
        }
        /*错误验证的单位*/
        .is-error .el-input-group__append, .el-input-group__prepend {
            border-color: #ff4949;
        }
         .money-input {
             .el-input__inner {
                border-right: 0px;
            }
        }
    }
</style>
