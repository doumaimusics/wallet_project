<template>
    <!-- 物流详情 -->
    <div id="logistics">
        <div v-title>物流详情</div>
        <div class="goods">
            <div class="topinfo bdr-b">
                <div class="userName" v-if="$route.query._title == '1'">{{getExpressLogisticsInfo.categoryName}}</div>
                <div class="userName" v-else-if="$route.query._title == '2'">翻牌奖励</div>
                <div class="userName" v-else>抽奖奖励</div>
                <div class="addTime">{{getExpressLogisticsInfo.addTime | divisionTime}}</div>
            </div>
            <div class="item">
                <img class="fl"  :src="getExpressLogisticsInfo.shopPath" alt="">
                <div class="fl righttext">
                    <div class="goodName"><i>包邮</i>{{getExpressLogisticsInfo.goodsName}}</div>
                    <!-- 没折扣 -->
                    <div class="money" v-if="$route.query._title == '1'&&getExpressLogisticsInfo.discount==0">{{getExpressLogisticsInfo.expendAmount}}<em>积分</em><i>¥{{getExpressLogisticsInfo.marketPrice}}元</i></div>
                    <!-- 有折扣 -->
                    <div class="money ins-discount" v-if="$route.query._title == '1'&&getExpressLogisticsInfo.discount!=0">
                        <span class="new-ins">{{getExpressLogisticsInfo.expendAmount}}<span>积分</span></span>
                        <span>{{getExpressLogisticsInfo.discount}}折</span>
                        <span>|</span>
                        <span class="old-ins" >{{getExpressLogisticsInfo.oldScore}}<span>积分</span></span>
                        </div>
                </div>
            </div>
        </div>
        <div class="logistics">
            <img class="fl" src="https://aliyunsso.edspay.com/web/wx/integralStroe/wuliuIcon.png" alt="">
            <div class="fl">
                <div class="logisticsName">{{getExpressLogisticsInfo.expressInfo}}</div>
                <div class="logisticsNo">运单号 {{getExpressLogisticsInfo.courierNumber}}<i class="iconfont"  v-clipboard:copy="getExpressLogisticsInfo.courierNumber" v-clipboard:success="onCopy">&#xe63c;</i></div>
            </div>
        </div>
        <div class="logisticsInif">
            <div class="address">
                <div class="fl addressIcon">收</div>
                <div class="deails fl">[收货地址]{{getExpressLogisticsInfo.address}}</div>
            </div>
            <ul>
                <li v-for="(v,i) in getExpressLogisticsInfo.infoList">
                    <div class="box">
                        <div class="context" :class="{active:i == 0}">{{v.context}}</div>
                        <div class="time">{{v.time}}</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp';
    import { Toast } from 'mint-ui';
    export default {
        mixins:[wxToapp],
        data() {
            return {
                getExpressLogisticsInfo:'',
                // infoList: [
                //     {
                //         context: '配送员开始配送，请您准备收货，配送员，咸文苗，手机号13456789876',
                //         time: '2018-07-12 12:23:23'
                //     },
                //     {
                //         context: '配送员开始配送，请您准备收货，配送员，咸文苗，手机号13456789876',
                //         time: '2018-07-12 12:23:23'
                //     },
                //     {
                //         context: '配送员开始配送，请您准备收货，配送员，咸文苗，手机号13456789876',
                //         time: '2018-07-12 12:23:23'
                //     },
                //     {
                //         context: '配送员开始配送，请您准备收货，配送员，咸文苗，手机号13456789876',
                //         time: '2018-07-12 12:23:23'
                //     },
                //     {
                //         context: '配送员开始配送，请您准备收货，配送员，咸文苗，手机号13456789876',
                //         time: '2018-07-12 12:23:23'
                //     },
                //     {
                //         context: '配送员开始配送，请您准备收货，配送员，咸文苗，手机号13456789876',
                //         time: '2018-07-12 12:23:23'
                //     },
                // ]
            }
        },
        methods: {
            dataInfo(){//获取订单详情
                this.getAppData('/reward/getExpressLogisticsInfo',(data) =>{
                    if(data.resCode){
                        this.getExpressLogisticsInfo = data.resData;
                    }
                },{id:this.$route.query.id})
            },
            onCopy(){
                Toast({
                    message: '复制成功',
                    position: 'bottom',
                    duration: 3000
                });
            }
        },
        created: function() {
            this.PassValue('NavWhite_物流详情');
        },
        mounted: function() {
            this.dataInfo()
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #logistics{
        font-family: PingFangSC-Regular;
        .goods{
            width: 100%;
            background: #fff;
            margin-top: .266667rem;
            .topinfo{
                width: 100%;
                height: .973333rem;
                line-height: .973333rem;
                padding: 0 .533333rem;
                position: relative;
                display: flex;
                justify-content: space-between;
                font-size: .32rem;
                color: #333333;
                .addTime{
                    color: #9B9B9B;
                }
            }
            .item{
                overflow: hidden;
                padding: .266667rem .266667rem .266667rem .533333rem;
                img{
                    width: 1.466667rem;
                    height: 1.466667rem;
                }
                .righttext{
                    width: 80%;
                    // padding-top: .1rem;
                    .goodName{
                        font-size: .373333rem;
                        color: #333;
                        i{
                            position: relative;
                            display: inline-block;
                            height: .8rem;
                            width: 1.733333rem;
                            padding: 0 0.2rem;
                            background: rgba(255, 170, 50, 0.2);
                            border-radius: 0.053333rem;
                            line-height: 0.72rem;
                            font-size: 0.586667rem;
                            color: #FFAA32;
                            border: 1px solid #FFAA32;
                            transform: scale(0.5);
                            -webkit-transform: scale(0.5);
                        }
                    }
                    .money{
                        font-size: .426667rem;
                        color: #333333;
                        padding-left: 0.4rem;
                        em{
                            font-size: .32rem;
                            color: #808080;
                            margin-right: .173333rem;
                        }
                        i{
                            font-size: .32rem;
                            color: #808080;
                            text-decoration: line-through;
                        }
                    }
                    .ins-discount {
                        color: #808080;
                        text-align: left;
                        .new-ins {
                            font-family: DIN-Medium;
                            font-size: .533333rem;
                            color: #FF5B4C;
                            line-height: .64rem;
                            span {
                                color: #808080;
                                font-size: .32rem;
                                margin-left: .066667rem;
                            }
                        }
                        span:nth-of-type(2) {
                            display: inline-block;
                            padding: 0 .133333rem;
                            height: .366667rem;
                            line-height: .366667rem;
                            text-align: center;
                            background: #FF5B4C;
                            border-radius: .026667rem;
                            font-size: .293333rem;
                            color: #FFFFFF;
                        }
                        span:nth-of-type(3) {
                            color: #D0D0D0;
                            margin: 0 .103333rem;
                        }
                        .old-ins {
                            font-family: DIN-Regular;
                            font-size: .346667rem;
                            line-height: .4rem;
                            span {
                                font-size: .266667rem;
                                line-height: .293333rem;
                                margin-left: .066667rem;
                            }
                        }
                    }
                }
            }
        }
        .logistics{
            width: 100%;
            height: 1.733333rem;
            margin-top: .266667rem;
            background: #fff;
            padding: .4rem .533333rem;
            img{
                width: .933333rem;
                height: .933333rem;
                margin-right: .266667rem;
            }
            .logisticsName{
                font-size: .32rem;
                color: #333333;
            }
            .logisticsNo{
                font-size: .293333rem;
                margin-top: .08rem;
                color: #333333;
                // transform: scale(0.5);
                // -webkit-transform: scale(0.5);
                // position: relative;
                // left: -25%;
                i{
                    font-size: .32rem;
                    margin-left: .2rem
                }
            }
        }
        .logisticsInif{
            width: 100%;
            height: auto;
            margin-top: .266667rem;
            padding-top: .533333rem;
            background: #fff;
            overflow: hidden;
            .address{
                width: 100%;
                padding-left: .533333rem;
                padding-right: .666667rem;
                overflow: hidden;
                margin-bottom: .6rem;
                .addressIcon{
                    width: .666667rem;
                    height: .666667rem;
                    margin-right: .266667rem;
                    background: #FFCECC;
                    border-radius: 50%;
                    font-size: .32rem;
                    color: #fff;
                    line-height: .666667rem;
                    text-align: center;
                }
                .deails{
                    font-size: .293333rem;
                    color: #333333;
                    line-height: .4rem;
                    width: 7.666667rem;
                }
            }
            ul{
                padding: 0 .666667rem;
                padding-left: .8rem;
                li{
                    padding-bottom: .666667rem;
                    border-left: 1px solid #d9d9d9;
                    .context{
                        font-size: .32rem;
                        color: #9B9B9B;
                        line-height: .466667rem;
                        margin-bottom: .053333rem;
                        padding-left: .533333rem;
                        // margin-top: -.2rem;
                    }
                    .context.active{
                        color: #333333;
                    } 
                    .context:before {
                        content: '';
                        border: 3px solid #f3f3f3;
                        background-color: #d9d9d9;
                        display: inline-block;
                        width: 5px;
                        height: 5px;
                        border-radius: 5px;
                        margin-left: -.7rem;
                        margin-right: .433333rem;
                        position: absolute;
                        top: .07rem;
                    }
                    .context.active:before {
                        border: 3px solid #FFCECC;
                        background-color: #FF5458;
                    }
                    .time{
                        padding-left: .533333rem;
                        font-size: .266667rem;
                        color: #9B9B9B;
                        line-height: .373333rem;
                    }
                    .box{
                        position: relative;
                        top: -.133333rem;
                    }
                }
                li:last-child{
                    border-left: none;
                }
            }
        }
    }
</style>
