<!--年化计算器-->
<template>
    <div v-if="showCalculator" v-layer class="calculator">
        <div class="bottom">
            <div class="title bdr-b">奖励计算器<div @click="closeCal" class="close fr"></div></div>
            <div class="content">
                <!-- 出借金额 -->
                <div class="li li1">
                    <div class="name fl">出借金额：</div>
                    <div class="input fl">
                        <input v-model="setYearMoney" v-on:input="getMoney"  type="text" placeholder="请输入出借金额">
                        <span class="fr">元</span>
                    </div>
                </div>
                <!-- 出借期限 -->
                <div class="li li2">
                    <div class="name fl">出借期限：</div>
                    <div class="input fl">
                        <span>{{selectValue}}天</span>
                        <div class="right fr"></div>
                        <el-select v-model="selectValue" placeholder="请选择" class="october-select">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <!-- 返现比例 -->
                <div class="li li3">
                    <div class="name fl">返现比例：</div>
                    <div class="input fl">
                        <el-radio v-model="radio" label="4">4%</el-radio>
                        <el-radio v-model="radio" label="2.5" style="margin-left:1.3rem">2.5%</el-radio>
                    </div>
                </div>
                <!-- 出借年化 -->
                <div class="li li3">
                    <div class="name fl">出借年化：</div>
                    <div class="input fl">
                        {{ Math.floor(investMoney*100)/100 | moneyFormat}}
                    </div>
                </div>
                <!-- 返现奖励 -->
                <div class="li li3" style="margin-bottom: .373333rem;">
                    <div class="name fl">返现奖励：</div>
                    <div class="input fl">
                        <span>{{Math.floor((investMoney*(radio/100))*100)/100 | moneyFormat}}</span>元
                    </div>
                </div>
                <div class="tips">注：出借年化=出借金额÷360*出借期限（天）<br/>返现奖励=出借年化*返现比例</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
    			options: [
                    {
                        value: 30,
                        label: '30天'
                    }, {
                        value: 60,
                        label: '60天'
                    }, {
                        value: 90,
                        label: '90天'
                    }, {
                        value: 180,
                        label: '180天'
                    }, {
                        value: 360,
                        label: '360天'
                    }
                ],
                setYearMoney:null,//年化金额
                selectValue: 30,
                radio:'4'
    		}
    	},
    	props:['showCalculator'],
    	computed:{
            investMoney:{//年化金额
                get:function(){
                    return (this.setYearMoney / 360) * this.selectValue;
                },
                set:function(value){
                }
            },
        },
    	methods:{
    		getMoney(){
                if(~~this.setYearMoney == 0){
                    this.setYearMoney = '';
                }
                if(this.setYearMoney.length > 8){
                    this.setYearMoney = this.setYearMoney.substring(0,8);
                }
                this.setYearMoney=this.setYearMoney.replace(/\D/g,"");
                this.setYearMoney=this.setYearMoney.replace('.','');

            },
            closeCal () {
                this.$emit('closeCal')
            }
    	},
    	created(){
    		
    	}
    }
</script>
<style lang="scss">
.october-select {
        .el-input__inner {
            width: 0rem;
        }
    }
</style>
<style lang="scss" scoped>
    .calculator{
        .bottom{
            height:8.4rem;
            background:#fff;
            position: absolute;
            bottom:0;
            left:0;
            width:100%;
            .title{
                font-family: PingFang-SC-Bold;
                font-size:0.426667rem;
                line-height:1.173333rem;
                padding-left: 0.533333rem;
                color:#333;
                position: relative;
                .close{
                    height:0.4rem;
                    width:0.4rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/calClose.png') no-repeat;
                    background-size: 100% 100%;
                    margin: 0.3rem 0.533333rem;
                }
            }
            .content{
                padding-top: 0.533333rem;
                .li{
                    padding: 0 0 0 0.533333rem;
                    font-size:0.373333rem;
                    height:0.8rem;
                    margin-bottom: 0.3rem;
                    .name{
                        line-height:0.8rem;
                        color:#333;
                    }
                    .input{
                        margin-left: 0.266667rem;
                        height:0.8rem;
                        width:6.8rem;
                        background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/inputBorder.png') no-repeat;
                        background-size: 100% 100%;
                    }

                }
                .li1{
                    .input{
                        height:0.8rem;
                        width:6.8rem;
                        background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/inputBorder.png') no-repeat;
                        background-size: 100% 100%;
                        padding: 0.133333rem 0.4rem;
                        input{
                            height:0.533333rem;
                            font-size:0.373333rem;
                            line-height:0.533333rem;
                        }
                    }
                }
                .li2{
                    .input{
                        padding-left: 0.4rem;
                        line-height:0.8rem;
                        color:#333;
                        position: relative;
                        .right{
                            height:0.8rem;
                            width:0.933333rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/cut.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .el-select{
                            position: absolute;
                            top:0;
                            left:0;
                            width:6.8rem;
                            opacity:0;
                        }
                    }
                }
                .li3{
                    margin-bottom:.186667rem;
                    .input{
                        background: rgba(0,0,0,0);
                        line-height:0.8rem;
                        font-size:0.373333rem;
                        padding-left: 0.266667rem;
                        span{
                            font-size:0.453333rem;
                            color:#FF2323;
                            font-family: PingFang-SC-Bold;
                            margin-right: 0.24rem;
                        }

                    }
                }
                .tips{

                }
                .tips{
                    color:#999;
                    font-size:0.32rem;
                    line-height:0.533333rem;
                    text-align:center;;
                }
            }
        }
    }
</style>