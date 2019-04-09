<template>
   <div id="moneyTransfer">
       <div v-title>余额转移</div>
       <wx-header :logo="'余额转移'"></wx-header>
       <div class="transfeList"><router-link to="/moneyTransferList">转移记录</router-link></div>
       <div class="icon">
           <div class="leftIcon fl"><img src="https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/leftIcon.png" alt=""></div>
           <div class="arrowIcon fl">
               <p>余额转移</p><img src="https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/arrow.png" alt=""><p>(免手续费)</p>
            </div>
           <div class="rightIcon fr">
               <img src="https://aliyunsso.edspay.com/web/wx/account/moneyTransfer/rightIcon.png" alt="">
           </div>
           <div class="bankName">
               <p class="fl">普通账户</p><p class="fr">存管账户</p>
           </div>
       </div>
       <div class="input">
           <p>转移金额(元)</p>
           <i :class="{FS:addMoney}">¥</i>
           <i class="iconfont rightIcon" @click="addMoney = ''" v-if="addMoney">&#xe627;</i>
           <input @keyup="greater($event)" type="number" :class="{fontStyle:addMoney}" v-model="addMoney" :placeholder="'请输入转移金额'">
           <div class="money">
                普通账户可用余额：{{balance ? balance:0 | moneyFormat}}元<em @click="addMoney = balance">全部转移</em>
            </div>
       </div>
       <div class="moneying" v-if="transferMoney"><img data-v-0204493a="" src="https://aliyunsso.edspay.com/web/wxUpdate/for_popwindow.png" alt="" @click="tips = true">转移中金额：{{transferMoney ? transferMoney:0 | moneyFormat}}元
            <div id="tips" v-if="tips" @click="tips = false">已发起申请，正在从普通账户转移到存管账户。</div>
       </div>
       <div class="btn" v-btn v-if="addMoney && isCheak" @click="sbmilt">提交申请</div>
       <div class="btnNo" v-else>提交申请</div>
       <div class="xieyi"><img @click="isCheak = !isCheak" :src="isCheak ? 'https://aliyunsso.edspay.com/web/wx/pointToPoint/check.png':'https://aliyunsso.edspay.com/web/wx/pointToPoint/uncheck.png'" alt="" class="ic_1">我已同意<em><router-link to="/transferFund">《余额转移授权委托书》</router-link></em></div>
       <div class="tips">{{waitTime}}</div>
       <public-dialog v-if='showThis.isShow' :confirmBtn="getData" :showThis="showThis" :btn="1" :text="rollOutStr" :btnText="btnText"></public-dialog>
       <public-dialog v-if='showThis1.isShow' :confirmBtn="confirmBtn1" :showThis="showThis1" :btn="1" :text="openZcText1" :btnText="btnText1"></public-dialog>
       <public-dialog v-if='showThis2.isShow' :confirmBtn="confirmBtn2" :showThis="showThis2" :btn="1" :text="openZcText2" :btnText="btnText2"></public-dialog>
   </div>
</template>

<script>
    import publicDialog from '../../wx/member/invest/wxPublicDialog.vue'; //弹框组件
    import wxHeader from '../../../components/wxHeader';
    import { Toast } from 'mint-ui'
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
                waitTime:'',        // 预计资金转移时间到账时间	
                toBalanceRemove:{},  //  保存数据
                showThis: {      // 全部转移确认框
					isShow: false,
				},
                btnText: ['取消','确定'],
                showThis1: {      // 没有开通存管账户
					isShow: false,
				},
				openZcText1:'您还没有开通存管账户，开通后才能将您的余额转移到存管账户',
                btnText1: ['取消','去开通'],
                showThis2: {   // 余额转移开通委托付款
					isShow: false,
				},
				openZcText2:'首次操作余额转移，需进行授权',
				btnText2: ['取消','确定']
            }
        },
        methods: {
            greater(){
                let rule = /^\d+(?:\.\d{1,2})?$/
                if(!rule.test(this.addMoney)){
                    this.addMoney = this.addMoney.substr(0,this.addMoney.length-1)
                    console.log(1)
                }
				if(this.addMoney > this.balance){
					this.addMoney = this.balance;
				}
            },
            sbmilt(){
                let _this = this
                if(this.addMoney == 0){
                    Toast({
                        message: '转移金额必须要大于0元', position: 'bottom', duration: 2000, className: 'toastTip'
                    });
                } else if(this.toBalanceRemove.openCzbFlag != '1'){   // 判断开通存管
                    this.showThis1.isShow = true
                } else if(this.toBalanceRemove.withholdFlag != '1'){   // 判断开通委托付款
                    this.showThis2.isShow = true
                }else if(this.toBalanceRemove.rollOut == 1){
                    _this.showThis.isShow = true
                }else{
                    _this.getData()
                }
            },
            getData(){
                let _this = this
                if(_this.flag){
                    _this.flag = false
                    this.postData('/account/doBalanceRemove',function(res){
                        if(res.body.resCode){
                            _this.showThis.isShow = false
                            _this.initData()
                            _this.flag = true
                            _this.$router.push('/transferResult')
                        }
                    },{applyMoney:_this.addMoney},1)
                } 
            },
            initData(){
                let _this = this
                this.postData('/account/toBalanceRemove',function(res){
                    if(res.body.resCode){
                        _this.balance = res.body.resData.balance
                        _this.transferMoney = res.body.resData.transferMoney
                        _this.toBalanceRemove = res.body.resData
                        _this.rollOutStr = res.body.resData.rollOutStr
                        _this.waitTime = res.body.resData.waitTime
                    }
                },{source:'h5'},1)
            },
            // confirmBtn(){    // 全部转移确认框
            //     this.getData()
            //     this.showThis.isShow = false
                
            // },
            confirmBtn1(){    // 没有开通存管账户
                this.$router.push('/wxDepository/wxOpenDepository')
                this.showThis1.isShow = false
            },
            confirmBtn2(){    // 余额转移开通委托付款
                this.showThis2.isShow = false
                window.location.href = this.toBalanceRemove.url
            },

        },
        created: function() {
            this.initData()
        },
        mounted: function() {

        },
        components:{
            publicDialog,
            wxHeader
		}
   }
</script>

<style lang="scss">
@import '../../../style/iconFont.css';
    #moneyTransfer{
        #tips{
            position:absolute;
            width:5.6rem;
            background:rgba(0,0,0,.6);
            padding:0.4rem;
            border-radius:0.16rem;
            top:0rem;
            right:2.0rem;
            font-size:0.32rem;
            line-height:0.453333rem;
            color:#fff;
        }
        .transfeList{
            height: 1.33rem;
            line-height: 1.33rem;
            position: fixed;
            top: 0;
            right: .4rem;
            z-index: 999;
            font-family: PingFangSC-Regular;
            font-size: .373333rem;
            color: #333333;
        }
        #recharge p{
            text-align: center;
        }
        .fl{
            float: left;
        }
        .fr{
            float: right;
        }
        .icon{
            width: 10rem;
            height: 4rem;
            margin-bottom: .266667rem;
            background: #fff;
            padding: .693333rem .4rem 0;
            .leftIcon,.rightIcon{
                width: 3.466667rem;
                height: 2.2rem;
                img{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            .arrowIcon{
                width: 1.8rem;
                height: 2.2rem;
                margin-left: .266667rem;
                padding-top: .56rem;
                p{
                    font-family: PingFangSC-Regular;
                    font-size: .346667rem;
                    color: #333333;
                    letter-spacing: 0;
                    text-align: center;
                    -webkit-margin-before: -0.3em;
                    -webkit-margin-after: -0.3em;
                }
                p:last-child{
                    font-family: PingFangSC-Regular;
                    font-size: .293333rem;
                    color: #333333;
                    letter-spacing: 0;
                    text-align: center;
                }
                img{
                    width: 100%;
                }
            }
            .bankName{
                width: 100%;
                padding-top: .28rem;
                p{
                    width: 3.466667rem;
                    font-family: PingFangSC-Regular;
                    font-size: .346667rem;
                    color: #333333;
                    text-align: center;
                }
            }
        }
        .input{
            width: 10rem;
            height: 4rem;
            background: #fff;
            padding-left: .4rem;
            padding-top: .493333rem;
            position: relative;
            p{
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: .346667rem;
                color: #333333;
                letter-spacing: .007867rem;
                margin-bottom: 16px;
            }
            i{
                position: absolute;
                top: 1.733333rem;
                font-family: PingFangSC-Regular;
                font-size: .613333rem;
                color: #333333;
                left: .533333rem;
            }
            i.FS{
               top: 1.866667rem; 
            }
            i.rightIcon{
                top: 1.8rem;
                left: 8.933333rem;
                color: #D3D3D3;
            }
            input{
                height: 1.733333rem;
                padding-bottom: .346667rem;
                width: 100%;
                font-family: DIN-Medium;
                font-size: .586667rem;
                color: #333333;
                border-bottom: 1px solid #E5E5E5;
                padding-left: .746667rem;
            }
            .fontStyle{
                font-size: 1.146667rem;
            }
            .money{
                width: 100%;
                height: .933333rem;
                line-height: .933333rem;
                font-family: PingFangSC-Regular;
                font-size: .32rem;
                color: #808080;
                em{
                    color:  #508CEE;
                    margin-left: 20px;
                }
            }
        }
        .moneying{
            position: relative;
            height: .973333rem;
            width: 100%;
            padding-left: .4rem;
            font-family: PingFangSC-Regular;
            font-size: .32rem;
            color: #808080;
            line-height: .973333rem;
            margin-bottom: 1.293333rem;
            img{
                width: .4rem;
                height: .4rem;
                margin-right: .133333rem;
            }
        }
        .btnNo{
            background: #D8D8D8 !important;
            height: 1.06667rem;
            width: 8.77333rem;
            color: rgb(255, 255, 255);
            margin: 0px auto;
            border-radius: 0.106667rem;
            line-height: 1.06667rem;
            text-align: center;
            font-size: 0.426667rem;
            margin-bottom: .466667rem !important;
        }
        .btn{
            margin-bottom: .466667rem !important;
        }
        .xieyi{
            width: 100%;
            padding-left: .64rem;
            font-family: PingFangSC-Regular;
            font-size: .293333rem;
            color: #A3A3A4;
            letter-spacing: .004933rem;
            margin-bottom: .333333rem;
            img{
                width: .32rem;
                height: .32rem;
                margin-right: .28rem;
            }
            em{
                font-size: .293333rem;
                color: #508CEE;
                a{
                   font-size: .293333rem;
                   color: #508CEE; 
                }
            }
        }
        .tips{
            width: 100%;
            padding-left: .64rem;
            font-family: PingFangSC-Regular;
            font-size: .293333rem;
            color: #9B9B9B;
            // letter-spacing: .003733rem;
        }
    }
</style>
