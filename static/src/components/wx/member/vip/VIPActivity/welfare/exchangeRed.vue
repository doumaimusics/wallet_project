<template>
    <div ref="redBox" id="exchangeRed">
        <div v-title class="pageTitle">出海寻宝</div>
        <div class="top">
            <div class="level fl">
                <div class="num">V{{userData.level}}</div>
                <div @click="toInvest" class="btn"></div>
            </div>
            <div class="distance fr">
                <div class="num">{{userData.canCoin | moneyFormat}}元</div>
                <div @click="appRouter('/vip/redRecord')" class="btn"></div>
            </div>
        </div>
        <div @click="showLayer.showExplain = true;" class="tipsBox"></div>
        <ul class="redList clear">
            <li v-for="(item,index) in redList" class="fl">
                <div class="levText">V{{item.level}}及以上专享</div>
                <div class="name"><span><i>￥</i>{{item.amount}}</span></div>
                <div class="redType">{{item.awardType == 5 ? "现金红包":"抵扣红包"}}</div>
                <div class="distance">需{{item.needSail}}元海盗币</div>
                <div v-if="userData.level >= item.level && userData.canCoin >= item.needSail && item.residue>0" @click="toRedAward(item,index)" class="btn"></div>
                <div v-else class="btn grey-btn"></div>
                <div class="portion">今日还剩{{item.residue}}份</div>
            </li>
        </ul>
        <div v-if="showLayer.showExplain" v-layer class="explain">
            <div class="content">
                <div @click="showLayer.showExplain = false" class="closeBtn"></div>
                <ul>
                    <li v-for="(item,index) in redList" class="bdr-b">
                        <div class="fl name">{{item.amount + '元' + (item.awardType == 1 ? '抵扣红包':'现金红包')}}</div>
                        <div class="fl level">V{{item.level}}级以上</div>
                        <div class="fl needSail">{{item.needSail}}元</div>
                        <div class="fl num">{{item.residueSum}}份</div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="showLayer.showAward" v-layer class="award">
            <div class="content">
                <!-- <div class="name">{{activeRed.awardName}}</div> -->
                <div class="name">{{activeRed.amount + '元' + (activeRed.awardType == 1 ? '抵扣红包':'现金红包')}}</div>
                <div class="tips">已自动发放至“我的红包”中</div>
                <!-- <div @click="toApp('RP','/wxMyAccount/wxRedPacket?bankOpenStatus=3&sinaBankCardCount=1')" class="btn"></div> -->
                <div @click="showLayer.showAward = false" class="close"></div>
            </div>
        </div>
        <div v-layer v-if="showLayer.showExchangTip" class="toExchange">
            <div class="content">
                <p class="tips">确认使用海盗币兑换{{activeRed.awardType == 1 ? '抵扣红包':'现金红包'}}？</p>
                <div @click="getRedAward" class="ok"></div>
                <div @click="showLayer.showExchangTip = false" class="close"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../../common/wx/wxToapp.js';
    export default{ 
        mixins:[wxToapp],
    	data(){
    		return{
                showLayer:{
                    showExplain:false,
                    showAward:false,
                    showExchangTip:false,
                },
                activeRed:{

                },
                redList:[],
                userData:{}
    		}
    	},
    	methods:{
            toInvest(){
                window._czc.push(['_trackPageview', '出海2-兑换红包', '去升级按钮（投资）']);
                this.toApp('WIP','/wxInvest')
            },
            getRedData(){
                this.getAppData('/sail/award/list',(data) =>{
                    if(data.resCode){
                        this.redList = data.resData.sailAwardRules;
                        this.userData = data.resData.sailUserModel;
                    }
                },{});
            },
            toRedAward(item,index){
                this.showLayer.showExchangTip = true;
                this.activeRed = item;
                this.activeIndex = index;
                
            },
            getRedAward(){
                this.showLayer.showExchangTip = false;
                this.getAppData('/sail/award/exchange',(data) =>{
                    if(data.resCode){
                        this.showLayer.showAward = true;
                        this.activeRed.residue --;
                        this.$set(this.redList,this.activeIndex,this.activeRed)
                        this.userData.canCoin -= this.activeRed.needSail;
                    }
                },{id:this.activeRed.id})
            }
    	},
    	created(){
    		this.getRedData();
    	},
        mounted(){
            var height = document.documentElement.clientHeight; //获取设备的宽度
            this.$refs.redBox.style.minHeight = height + 'px';

            // 数据统计
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275252198&web_id=1275252198';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        }
    }
</script>

<style lang="scss">
    body,html{
        height:100%;
    }
</style>

<style lang="scss" scoped>
    #exchangeRed{
        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/exchangeBg.png') no-repeat;
        background-size: 100%;
        font-family: PingFangSC-Regular;
        .toExchange{
            padding-top: 4.106667rem;
            .tips{
                font-size:0.373333rem;
                line-height:0.533333rem;
                color:#333;
                margin-bottom: 0.893333rem;
                text-align:center;
            }
            .content{
                height:9.333333rem;
                width:6.933333rem;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/toExchangeTip.png') no-repeat;
                background-size: 100% 100%;
                margin: 0 auto;
                padding-top: 4.106667rem;
                .ok{
                    margin: 0 auto;
                    height:1.36rem;
                    width:4.0rem;
                }
                .close{
                    height:1rem;
                    width: 1.333333rem;
                    margin: 1.45rem auto 0;
                }
            }
        }
        .award{
            padding-top: 3.653333rem;
            background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/length.png') center 1.333333rem no-repeat;
            background-size: 10.0rem 10rem;
            .content{
                height:10.08rem;
                width:7.44rem;
                margin:0 auto;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/exchangeSucc.png') no-repeat;
                background-size:100% 100%;
                text-align:center;
                .name{
                    font-size:0.56rem;
                    line-height:0.8rem;
                    color:#AE5F00;
                    font-family: PingFang-SC-Medium;
                    padding-top: 5.6rem;
                }
                .tips{
                    font-size:0.346667rem;
                    line-height:0.506667rem;
                    padding:0.106667rem 0 0.293333rem;
                    color: #333;
                }
                .close{
                    height:1.333333rem;
                    width:1.333333rem;
                    margin:1.5rem auto 0;
                }
            }
        }
        .tipsBox{
            height:0.8rem;
            width:1.333333rem;
            position: absolute;
            top:5.066667rem;
            left:6.666667rem;
            z-index:10;
        }
        .explain{
            padding-top: 2.933333rem;
            background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/explain.png') no-repeat!important;
            background-size:100%!important;
            .closeBtn{
                height:1.5rem;
                width:1.5rem;
                position: absolute;
                right:0;
                top:-0.35rem;
                z-index:99;
            }
            .content{
                margin:0 auto;
                height:14.533333rem;
                width:100%;
                position: absolute;
                top:46%;
                margin-top: -7.266667rem;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/explainContnet.png') no-repeat;
                background-size: 100% 100%;
                ul{
                    padding: 3.733333rem 1.133333rem 0;
                    li{
                        font-size:0.32rem;
                        line-height:0.8rem;
                        height:0.8rem;
                        color:#612D17;
                        position: relative;
                        // width:7rem;
                        overflow: hidden;
                        .name{
                            width:2.506667rem;
                            overflow: hidden;
                        }
                        .level{
                            width:1.86rem;
                        }
                        .needSail{
                            width:1.8rem;
                        }
                    }
                    .bdr-b:after{
                        background: -webkit-linear-gradient(left, #FFE0AA , #F8CA7D,#FBDBA4); /* Safari 5.1 - 6.0 */
                        background: -o-linear-gradient(right, #FFE0AA, #F8CA7D,#FBDBA4); /* Opera 11.1 - 12.0 */
                        background: -moz-linear-gradient(right, #FFE0AA, #F8CA7D,#FBDBA4); /* Firefox 3.6 - 15 */
                        background: linear-gradient(to right, #FFE0AA , #F8CA7D,#FBDBA4); /* 标准的语法 */
                        border-top: 1px solid #fff;
                        border-bottom: 1px solid rgba(0,0,0,0);
                    }
                }
                .close{
                    position: absolute;
                    bottom:0;
                    left:0;
                    height:1.333333rem;
                    width:1.333333rem;
                    margin-left:3.68rem;
                }
            }
        }
        .top{
            height: 4.64rem;
            padding-top: 1.946667rem;
            color:#9A4100;
            font-size:0.48rem;
            line-height:0.56rem;
            font-family: DINAlternate-Bold;
            .btn{
                margin-top: 0.33rem;
                width: 2.0rem;
                height: 0.693333rem;
            }
            .level{
                .num{
                    padding-left: 1.2rem;
                }
                .btn{
                    margin-left: 0.426667rem;
                }
            }
            .distance{
                width:2.666667rem;
                text-align:center;
                .btn{
                    margin-right:0.586667rem;
                }
            }
        }
        .redList{
            padding: 1.6rem 0.266667rem 0;
            display:flex;
            flex-direction: row;
            flex-wrap: wrap ;
            justify-content:center ;
            li{
                height:3.866667rem;
                width:2.933333rem;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/redBg.png') no-repeat;
                background-size:100% 100%;
                margin-bottom: 1.293333rem;
                .levText{
                    font-size:0.24rem;
                    line-height:0.333333rem;
                    color:#fff;
                    padding-top: 0.426667rem;
                    height:0.8rem;
                    // width:3.2rem;
                    overflow: hidden;
                    text-align:center;
                }
                .name{
                    padding-top: 0.24rem;
                    font-size:0.32rem;
                    font-family: PingFangSC-Semibold;
                    text-align: center;
                    color: #FF2413;
                    span{
                        letter-spacing: 0;
                        font-size:0.8rem;
                        line-height: 0.84rem;
                        font-family: 'DIN-Bold';
                        i{
                            font-size:0.533333rem;
                        }
                    }
                }
                .redType{
                    font-size:0.293333rem;
                    line-height:0.4rem;
                    text-align:center;
                    color:#FF2413;
                    padding-bottom: 0.16rem;
                }
                .distance{
                    font-size:0.32rem;
                    line-height:0.44rem;
                    text-align:center;
                    color: #7C4226;
                }
                .btn{
                    height:0.773333rem;
                    width:1.733333rem;
                    margin: 0.56rem auto 0;
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/exchangeBTn1.png') no-repeat;
                    background-size:100% 100%!important;
                }
                .grey-btn{
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/exchangeBTn2.png') no-repeat;

                }
                .portion{
                    padding-top: 0.1rem;
                    color:#fff;
                    text-align:center;
                    font-size:0.266667rem;
                    line-height:0.373333rem;
                }
            }
            li:nth-child(3n-1){
                margin: 0 0.32rem;
            }   
        }
    }
</style>