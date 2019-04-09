<!--年化计算器-->
<template>
    <div v-if="showCalculator" v-layer class="calculator">
        <div class="bottom">
            <div class="title bdr-b">年化计算器<div @click="closeCal" class="close fr"></div></div>
            <div class="content">
                <!-- 出借金额 -->
                <div class="li li1">
                    <div class="name fl">年化金额：</div>
                    <div class="input fl">
                        <input v-model="setYearMoney" v-on:input="getMoney"  type="text" placeholder="请输入年化金额">
                        <span class="fr li1-close" v-if="investMoney!==0" @click="setYearMoney=''"></span>
                    </div>
                </div>
                <!-- 出借期限 -->
                <div class="li li2">
                    <div class="name fl">出借期限：</div>
                    <div class="fl select-div">
                        <span v-for="item in options" @click="selectTerm(item)" :class="{'select-cube' : item.isSelet}">{{item.label}}</span>
                    </div>
                </div>
                <!-- 出借年化 -->
                <div class="li li3">
                    <div class="name fl">需要出借：</div>
                    <div class="input fl">
                        <span>{{ Math.floor(investMoney*100)/100 | moneyFormat}}</span>元
                    </div>
                </div>
                <div class="tips">注：年化金额=出借金额*出借期限/360</div>
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
                        label: '30天',
                        isSelet:false,
                    }, {
                        value: 60,
                        label: '60天',
                        isSelet:false,
                    }, {
                        value: 90,
                        label: '90天',
                        isSelet:true,
                    }, {
                        value: 180,
                        label: '180天',
                        isSelet:false,
                    }, {
                        value: 360,
                        label: '360天',
                        isSelet:false,
                    }
                ],
                setYearMoney:10000,//年化金额
                selectValue: 90,
    		}
    	},
    	props:['showCalculator'],
    	computed:{
            investMoney:{//年化金额
                get:function(){
                    return this.setYearMoney / (this.selectValue / 360) ;
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
            // 关闭计算器
            closeCal () {
                this.$emit('closeCal')
            },
            // 选中期限
            selectTerm (item) {
                this.options.forEach((obj,index)=>{
                     this.$set(this.options[index], 'isSelet',false)
                });
                this.selectValue = item.value
                item.isSelet = !item.isSelet
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
            height:6.213333rem;
            background:#fff;
            position: absolute;
            bottom:0;
            left:0;
            width:100%;
            .title{
                font-family: PingFang-SC-Bold;
                text-align:center;
                font-family: PingFang-SC-Bold;
                font-size: .426667rem;
                color: #313131;
                height: 1.066667rem;
                line-height:1.066667rem;
                position: relative;
                .close{
                    height:0.4rem;
                    width:0.4rem;
                    position: absolute;
                    right:.586667rem;
                    top:.32rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/calClose.png') no-repeat;
                    background-size: 100% 100%;
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
                    .li1-close {
                        display: inline-block;
                        width: 0.4rem;
                        height: 0.4rem;
                        margin-top:.07rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/delete.png) no-repeat;
                        background-size: 0.4rem 0.4rem;
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
                    }
                    .select-div {
                        margin-top: .15rem;
                        span {
                            display:inline-block;
                            height: .666667rem;
                            width:1.146667rem;
                            line-height:.666667rem;
                            text-align:center;
                            font-size: .32rem;
                            color: #333333;
                            margin-left: 0.266667rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/11assist/cube.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        .select-cube {
                            color: #FFFFFF;
                            background: #FF4040;
                            border-radius: .08rem;
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
                            margin-right: 0.1rem;
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