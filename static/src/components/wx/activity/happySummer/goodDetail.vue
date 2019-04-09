<template>
    <div id="goodDetail">
        <div @click="showCalculator = true;setYearMoney = null" class="calculatorbtn"></div>
    	<ul>
    		<li v-for="(item,index) in 2">
    			<div v-if="userData.myYearMoney >= goodsList[index].yearMoney && hotStatuss[index] == 0" @click="conversion((index+5),goodsList[index])" class="goodBtn"></div>
    			<div v-else-if="hotStatuss[index] == 1" class="goodBtn hasInvest"></div>
    			<div v-else @click="toApp('WIP','/wxInvest')" class="goodBtn toInvest"></div>
    		</li>
    		<li v-for="item in 12">
    			<div v-if="userData.myYearMoney >= goodsList[item+1].yearMoney"  @click="conversion((item+6),goodsList[item+1])" class="goodBtn"></div>
                <div v-else @click="toApp('WIP','/wxInvest')" class="goodBtn toInvest"></div>
    		</li>
    	</ul>
    	<div v-if="showGoodSucc" v-layer class="goodSuccess">
    	    <div :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/happySummer/goodSucc/goodSucc'+goodSuccImgId+'.png) no-repeat'}" class="content">
    	        <div @click="showGoodSucc = false;" class="close"></div>
    	    </div>
    	</div>

        <div v-if="showCalculator" v-layer class="calculator">
            <div class="bottom">
                <div class="title bdr-b">年化计算器<div @click="showCalculator = false;" class="close fr"></div></div>
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
                            <span>{{selectValue}}天</span>
                            <div class="right fr"></div>
                            <el-select v-model="selectValue" @change="selectDay" placeholder="请选择">
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
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'; // app交互 
    export default{
    	mixins:[wxToapp],
    	data(){
    		return{
    			userData:[],
    			goodsList:[],
    			hotStatuss:[],
    			showGoodSucc:false,
    			goodSuccImgId:0,
                showCalculator:false,
                options: [{
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
                }],
                setYearMoney:null,//年化金额
                selectValue: 30,
    		}
    	},
        computed:{
            investMoney:{
                get:function(){
                    return Math.ceil((this.setYearMoney/this.selectValue) * 360);
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
                this.setYearMoney=this.setYearMoney.replace(/[^\.\d]/g,'');
                this.setYearMoney=this.setYearMoney.replace('.','');
                // this.setYearMoney = ~~this.setYearMoney;

            },
            selectDay(selVal){
                console.log(this.selectValue)
            },
    		getUserData(){//初始化数据
    		    this.getAppData('/activity/happy/init',(data) =>{
    		        if(data.resCode){
    		            this.userData = data.resData.happyUser;
    		            this.goodsList = data.resData.happyCommodities;
    		            this.hotStatuss = data.resData.hotStatuss;
    		        }
    		    },{})
    		},
    		conversion(goodsId,item){//领取商品
                this.getAppData('/activity/happy/getComm',(data)=>{
                    if(data.resCode){
                        this.userData.myYearMoney -= item.yearMoney;
                        this.showGoodSucc = true;
                        this.goodSuccImgId = goodsId
                        console.log(this.goodSuccImgId)
                    }
                },{commodityId:goodsId})
                if(goodsId == 5){
                    this.$set(this.hotStatuss,0,1);
                }else if(goodsId == 6){
                    this.$set(this.hotStatuss,1,1);
                }
            },
    	},
    	created(){
    		this.getUserData();
    	}
    }
</script>

<style lang="scss" scoped>
    #goodDetail{
        position: relative;
        .calculatorbtn{
            position: absolute;
            right:0.28rem;
            top:1.6rem;
            padding: 0.12rem 0 0 0.026667rem;
            font-family: PingFang-SC-Bold;
            height:1.2rem;
            width:1.2rem;
            font-size:0.32rem;
            color:#FF5231;
            text-align:center;
        }
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
    	.goodSuccess{
    	    padding-top: 2.133333rem;
    	    .content{
    	        height:9.6rem;
    	        width:7.2rem;
    	        margin: 0 auto;
    	        background-size: 100% 100%!important;
    	        position: relative;
    	        .close{
    	            position: absolute;
    	            bottom:0;
    	            left: 50%;
    	            height:1.333333rem;
    	            width:1.333333rem;
    	            margin-left: -0.666667rem;
    	        }
    	    }
    	}
		ul{
			background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/goodDetail.png') no-repeat;
			background-size: 100% 100%;
			height: 50.373333rem;
			padding-top: 3.84rem;
			li{
				height:3.266667rem;
				position: relative;
				.goodBtn{
					position: absolute;
					bottom: 0.506667rem;
					right: 1.093333rem;
					height:0.666667rem;
					width: 1.76rem;
					background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/goodDeatilBtn2.png') no-repeat;
					background-size:100% 100%!important;
				}
				.toInvest{
					background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/goodDeatilBtn1.png') no-repeat;
				}
				.hasInvest{
					background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/goodDeatilBtn3.png') no-repeat;
				}

			}
		}
    }
</style>