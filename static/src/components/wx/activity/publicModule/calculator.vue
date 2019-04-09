<!--年化计算器-->
<template>
    <div v-if="showCalculator.showCalculator" v-layer class="calculator">
        <div class="bottom">
            <div class="title bdr-b">年化计算器<div @click="showCalculator.showCalculator = false;" class="close fr"></div></div>
            <div class="content">
                <div class="li li1">
                    <div class="name fl">年化金额：</div>
                    <div class="input fl">
                        <input v-model="setYearMoney" v-on:input="getMoney"  type="text" placeholder="请输入年化金额">
                    </div>
                </div>
                <div class="li li2">
                    <div class="name fl">出借期限：</div>
                    <div class="input fl">
                        <span>{{(12/selectValue)*30}}天</span>
                        <div class="right fr"></div>
                        <el-select v-model="selectValue" placeholder="请选择">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="li li3">
                    <div class="name fl">需要出借：</div>
                    <div class="input fl">
                        <span>{{investMoney}}</span>元
                    </div>
                </div>
                <div class="tips">注：年化金额=出借金额÷360*出借期限（天）</div>
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
                        value: 12,
                        label: '30天'
                    }, {
                        value: 6,
                        label: '60天'
                    }, {
                        value: 4,
                        label: '90天'
                    }, {
                        value: 2,
                        label: '180天'
                    }, {
                        value: 1,
                        label: '360天'
                    }
                ],
                setYearMoney:null,//年化金额
                selectValue: 12,
    		}
    	},
    	props:['showCalculator'],
    	computed:{
            investMoney:{//年化金额
                get:function(){
                    return parseInt(this.setYearMoney*this.selectValue);
                },
                set:function(value){
                }
            }
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
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    .calculator{
        .bottom{
            height:6.346667rem;
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
                    margin-bottom: 0.4rem;
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