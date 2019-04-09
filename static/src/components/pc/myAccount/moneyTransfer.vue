<template>
   <div id="moneyTransfer">
       <div class="tipsTitle"><p class="fl">普通账户-余额转移</p><p class="fr" @click="$router.push({path:'/myAccount/accountDetail',query:{id:4}})"><img src="https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/tipsIcon.png" alt=""> 转移记录</p></div>
       <div class="icon">
           <img src="https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/moneyTransfer.png" alt="">
       </div>
       <div class="input">
           <span>转移金额：</span>
           <div class="br"></div>
           <input @keyup="greater($event)" type="number" v-model="addMoney" :placeholder="'请输入转移金额'"><em @click="addMoney = balance">全部转移</em>
       </div>
       <div class="money">普通账户可用余额：{{balance ? balance:0 | moneyFormat}}元</div>
       <div class="money">转移中金额：{{transferMoney ? transferMoney:0 | moneyFormat}}元
           <el-tooltip class="item" placement="bottom" effect="light">
                <img src="https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/tipsIcon.png" alt="">
                <div slot="content">
                    已发起申请，正在从普通账户转移到存管账户</br>的金额。
                </div>
            </el-tooltip>
        </div>
       <div class="xieyi">
           <img @click="isCheak = !isCheak" :src="isCheak ? 'https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/isGou.png':'https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/isNotGou.png'" alt="" class="ic_1">
           我已阅读并同意<em><router-link to="/agree/transferFund" target='_blank'>《余额转移授权委托书》</router-link></em>
        </div>
       <div class="btn" v-if="addMoney && isCheak" @click="sbmilt">提交申请</div>
       <div class="btnNo" v-else>提交申请</div> 
   </div>
</template>

<script>
    export default {
        data() {
            return {
                flag:true,     // 防止重复点击提交
                rollOutStr:'',
                tips:false,    //  tips提示
                isCheak:true,  //  勾选协议
                addMoney:'',  // 转移金额
                balance: 0,   // sina可用
                transferMoney: 0,   // 转移中的金额	
                toBalanceRemove:{},  //  保存数据
            }
        },
        methods: {
            greater(){
                let rule = /^\d+(?:\.\d{1,2})?$/
                if(!rule.test(this.addMoney)){
                    this.addMoney = this.addMoney.substr(0,this.addMoney.length-1)
                }
				if(this.addMoney > this.balance){
					this.addMoney = this.balance;
				}
            },
            sbmilt(){
                let _this = this
                if(this.addMoney == 0){
                    _this.$message({ message: '转移金额必须要大于0元', type: "warning" });
                } else if(this.toBalanceRemove.openCzbFlag != '1'){   // 判断开通存管
                    this.$confirm('您还没有开通存管账户，开通后才能将您的余额转移到存管账户', '温馨提示', {
                        confirmButtonText: '去开通',
                        cancelButtonText: '取消',
                        closeOnClickModal: false,
                        type: 'warning'
                    }).then(() => {
                        this.$router.push('/myAccount/openAccount')
                    }).catch(() => {
                                  
                    });
                } else if(this.toBalanceRemove.withholdFlag != '1'){   // 判断开通委托付款
                    this.$confirm('首次操作余额转移，需进行授权', '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal: false,
                        type: 'warning'
                    }).then(() => {
                        window.open(this.toBalanceRemove.url)
                    }).catch(() => {
                                  
                    });
                } else if(this.toBalanceRemove.rollOut == 1){
                    this.$confirm(_this.rollOutStr, '温馨提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        closeOnClickModal: false,
                        type: 'warning'
                    }).then(() => {
                        _this.getdata()
                    }).catch(() => {
                              
                    });
                } else{
                    _this.getdata()
                }
            },
            getdata(){
                let _this = this 
                if(_this.flag){
                    _this.flag = false
                    global.http.post(_this,"/account/doBalanceRemove",{applyMoney:_this.addMoney},data => {
                        if (data.body.resCode == 1) {
                            this.initData()
                            _this.flag = true
                            this.$router.push('/balance') 
                        }else{
                                _this.$message({ message: data.body.resMsg, type: "warning" });
                        } 
                    })
                }  
            },
            initData(){
                let _this = this
                global.http.post(_this,"/account/toBalanceRemove",{source:'h5'},data => {
                    if (data.body.resCode == 1) {
                        _this.balance = data.body.resData.balance
                        _this.transferMoney = data.body.resData.transferMoney
                        _this.toBalanceRemove = data.body.resData
                        _this.rollOutStr = data.body.resData.rollOutStr
                    }else{
                        _this.$message({ message: data.body.resMsg, type: "warning" });
                    }
                })
            },
        },
        created: function() {
            this.initData()
        },
        mounted: function() {

        },
        components:{
            
		}
   }
</script>

<style lang="scss">
@import '../../../style/iconFont.css';
    #moneyTransfer{
        width: 1200px;
        height: 660px;
        margin: 0 auto;
        margin-bottom: 62px;
        padding: 33px 35px 0 60px;
        background: #FFFFFF;
        box-shadow: 0 6px 20px 0 rgba(204,204,204,0.26);
        overflow: hidden;
        .fl{
            float: left;
        }
        .fr{
            float: right;
        }
        .tipsTitle{
            width: 100%;
            height: 30px;
            margin-bottom: 30px;
            p{
                font-family: PingFangSC-Regular;
                font-size: 22px;
                color: #EF4B31;
                letter-spacing: 0;
                line-height: 30px;
            }
            p:nth-child(2){
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #7AC5FF;
                cursor: pointer;
                img{
                    width: 16px;
                    height: 16px;
                }
            }
        }
        .icon{
            width: 237px;
            height: 82px;
            margin: 0 auto;
            margin-bottom: 50px;
            img{
                width: 100%;
            }
        }
        .input{
            width: 100%;
            height: 40px;
            background: #fff;
            padding-left: 280px;
            position: relative;
            // margin-bottom: 10px;
            span{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
                line-height: 40px;
                margin-right: 10px;
                display: inline-block;
            }
            .br{
                position: absolute;
                width: 30px;
                height: 35px;
                right: 50%;
                top: 3px;
                margin-right: -162px;
                z-index: 99;
                background: #fff;
            }
            input{
                height: 40px;
                width: 350px;
                font-family: DIN-Medium;
                font-size: 16px;
                color: #999;
                border: 1px solid #e7e7e7;
                line-height: 40px;
                margin-right: 14px;
                padding-left: 18px;
            }
            em{
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #7AC5FF;
                cursor: pointer;
            }
        }
        .money{
            width: 100%;
            height: 20px;
            line-height: 20px;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #666;
            padding-left: 365px;
            margin-top: 10px;
            img{
                width: 16px;
                height: 16px;
                margin-left: 5px;
                cursor: pointer;
            }
        }
        .btnNo{
            background: #FFC4C5;
            height: 50px;
            width: 350px;
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #FFFFFF;
            margin: 0px auto;
            border-radius: 4px;
            line-height: 50px;
            text-align: center;
            margin-left: 365px;
        }
        .btn{
            background: #FE3E41;
            height: 50px;
            width: 350px;
            font-family: PingFangSC-Medium;
            font-size: 18px;
            color: #FFFFFF;
            margin: 0px auto;
            border-radius: 4px;
            line-height: 50px;
            text-align: center;
            margin-left: 365px;
        }
        .xieyi{
            width: 100%;
            padding-left: 365px;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #333;
            margin-top: 54px;
            margin-bottom: 10px;
            img{
                width: 16px;
                height: 16px;
                margin-right: 7px;
                cursor: pointer;
            }
            em{
                font-family: PingFangSC-Regular;
                font-size: 12px;
                color: #7AC5FF;
                cursor: pointer;
            }
        }
    }
</style>
