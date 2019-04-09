<template>
    <div ref="redRecord" id="redRecord">
        <div v-title class="pageTitle">出海寻宝</div>
        <div class="content">
        	<div class="tabbar clear">
                <div @click="activeIndex(0)" :class="{activeLeft:activeBar[0]}" class="coin list fl"></div>
                <div @click="activeIndex(1)" :class="{activeRight:activeBar[1]}" class="exchange list fl"></div>
            </div>
            <div v-if="activeBar[0]" class="sumCoin">已累计获取{{coinSum}}元海盗币</div>
            <div v-else class="sumCoin">已成功兑换{{sumSail}}元海盗币，{{countRed}}个红包，共计{{sumMoney}}元</div>
            <div class="activeList">
                <div :class="{activeExchange:activeBar[1]}" class="listBox activeCoin">
                    <div class="coinList list fl">
                        <ul v-if="coinList.length !=0" class="redList">
                            <li v-for="item in coinList" class="bdr-b">
                                <div class="left fl">
                                    <div class="name">{{item.remark}}</div>
                                    <div class="time">{{item.addTime}}</div>
                                </div>
                                <div class="coin fr">+{{item.coinSize}}元海盗币</div>
                            </li>
                            <li :class="{lastLi:coinList.length < 5}">
                                <div v-if="isOver" class="over">没有更多记录了！</div>
                                <!-- <div v-else >
                                    <img class="loading" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/exchange/loading.gif" alt="">
                                </div> -->
                            </li>
                        </ul>
                        <div v-else-if="hasGetData" class="null">
                            <img src="https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/coin_kong.png" alt="" class="nullImg">
                            <p>快去使用船桨航行获取海盗币！</p>
                        </div>
                    </div>
                    <div class="exchangeList list fl">
                        <ul v-if="redList.length !=0" class="redList">
                            <li v-for="item in redList" class="bdr-b">
                                <div class="left fl">
                                    <div class="name">{{item.exchangeCoin + '元' + (item.awardType == 1 ? '抵扣红包':'现金红包')}}</div>
                                    <div class="time">{{item.addTime}}</div>
                                </div>
                                <div class="coin fr">-{{item.exchangeCoin}}元海盗币</div>
                            </li>
                            <li :class="{lastLi:redList.length < 5}">
                                <div v-if="isOver" class="over">没有更多记录了！</div>
                                <!-- <div v-else >
                                    <img class="loading" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/exchange/loading.gif" alt="">
                                </div> -->
                            </li>
                        </ul>
                        <div v-else-if="hasGetData" class="null">
                            <img src="https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/exchange_kong.png" alt="" class="nullImg">
                            <p>真遗憾，你还没有成功兑换到福利哦！</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sumCoin"></div>
    </div>
</template>

<script>
	import { InfiniteScroll } from 'mint-ui';
    import wxToapp from '../../../../../../common/wx/wxToapp.js';
    export default{
        mixins:[wxToapp],
    	data(){
    		return{
    			listSum:30,
    			sumMoney:0,//总金额
                coinSum:0,//累计获取币数
    			countRed:0,//红包总个数
                sumSail:0,//兑换币数
                coinList:[],
    			redList:[],//红包列表
    			isOver:false,
    			hasGetData:false,
                activeBar:[true,false],//控制tab切换
    		}
    	},
    	methods:{
            activeIndex(index){
                this.$set(this.activeBar,0,false)
                this.$set(this.activeBar,1,false)
                this.$set(this.activeBar,index,true)
            },
			getListData(){
				this.getAppData('/sail/award/exchange/record',(data) => {
					if(data.resCode){
                        this.isOver = true;

						this.hasGetData = true;
						this.redList = data.resData.awardRecord;//红包列表

                        this.coinList = data.resData.sailCoinLogs;//金币列表

						this.sumMoney = data.resData.amountSum;//红包总金额
                        this.coinSum = data.resData.coinSum;//累计获取币数
                        this.countRed = data.resData.countRed;//累计获取红包个数
						this.sumSail = data.resData.sumSail;//累计兑换币数
					}
				},{})
			}
    	},
    	created(){
            this.getListData();
    	},
        mounted(){
            var height = document.documentElement.clientHeight; //获取设备的宽度
            this.$refs.redRecord.style.minHeight = height + 'px';
        }
    }
</script>

<style lang="scss">
    body,html{
        height:100%;
    }
</style>

<style lang="scss" scoped>
    #redRecord{
    	background:url(https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/redRecordBG.png) no-repeat;
    	background-size: 100%;
        font-family: PingFangSC-Regular;
        position: relative;
        .content{
            width:9.2rem;
            height:12.533333rem;
            position: absolute;
            top: 58%;
            left: 50%;
            margin: -6.266667rem 0 0 -4.6rem;
            // transform: translateX(-50%);
            background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/redRecordCon.png') no-repeat;
            background-size: 100% 100%;
        	.tabbar{
                width: 100%;
                .fl{
                    width:50%;
                    background-size: 100% 100%!important;
                    height:1.0rem;
                }
                .activeLeft{
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/getExchangeList.png');
                }
                .activeRight{
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/getCoinList.png');
                }
            }
            .sumCoin{
                font-size:0.346667rem;
                line-height:0.506667rem;
                text-align:center;
                color: #421E00;
                padding: 0.106667rem 0 0.533333rem;
            }
            .activeList{
                height:8.8rem;
                width: 8.0rem;
                margin:0 auto;
                overflow: hidden;
                position: relative; 
                .listBox{
                    height:100%;
                    width:16.1rem;
                    position: absolute;
                    top:0;
                    left:0;
                    .list{
                        width:8rem;
                        height: 100%;
                        overflow-y: auto;
                        ul {
                            position: relative;
                            li{
                                height:1.413333rem;
                                position: relative;
                                padding-left:0.213333rem;
                                .left{
                                    color: #612D17;
                                    .name{
                                        font-size:0.373333rem;
                                        line-height: 0.533333rem;
                                        padding:0.08rem 0 0.133333rem;
                                        font-family: PingFang-SC-Medium;
                                    }
                                    .time{
                                        font-size:0.32rem;
                                        line-height:0.453333rem;
                                    }
                                }
                                .coin{
                                    font-size:0.373333rem;
                                    line-height:0.533333rem;
                                    color: #D0021B;
                                    padding-top: 0.24rem;
                                    padding-right: 0.213333rem;
                                }
                            }
                            li:last-child{
                                color: #00B1FF ;
                                font-size:0.32rem;
                                line-height:0.453333rem;
                                height:0.453333rem;
                                width: 100%;
                                text-align:center;
                               
                                .over{
                                    padding: 0.266667rem 0 0.1rem;
                                }
                            }
                            .lastLi{
                                position: absolute;
                                top:8.0rem;
                            }
                        }
                        .null{
                            padding-top: 1.333333rem;
                            text-align:center;
                            .nullImg{
                                height:4.253333rem;
                                width:4.24rem;
                                display:block;
                                margin-left: 1.946667rem;
                            }
                            p{
                                padding-top: 0.346667rem;
                                font-size:0.373333rem;
                                line-height:0.453333rem;
                                color:#333;
                            }
                        }
                    }
                }
                .activeCoin{
                    transition: all 0.4s;
                    left: 0;
                }
                .activeExchange{
                    transition: all 0.4s;
                    left: -8rem;
                }
            }
        }
    }
</style>