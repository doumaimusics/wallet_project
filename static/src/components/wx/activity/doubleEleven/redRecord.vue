<template>
    <div id="redRecord">
        <div v-title>红包记录</div>
        <div class="heade">
            <div class="myChance">已获得11月11日<span>{{count}}</span><i>次</i>抽奖机会！</div>
            <div class="tips">使用定制红包，获取抽奖次数</div>
        </div>
        <div class="redList" v-if="list.length">
            <div class="list" v-for="(v, i) in list" :class="[{active: v.status == 0}]">
                <div class="redLeft">
                    <p class="name">{{v.name}}</p>
                    <p class="validity">有效期：当天有效</p>
                    <p class="rule">{{v.limitMouthTime}}，{{v.limitInvestAccount}}</p>
                    <div class="line"></div>
                    <p class="time">定制时间：{{v.addTime}}</p>
                </div>
                <div class="redRight">
                    <div class="money">{{v.amount}}<span>元</span></div>
                    <div class="button" v-if="v.status == 0" @click="toRed">去使用</div>
                    <div class="tips" v-else>{{v.status == -1 ? '未获得抽奖机会' : v.status == 1 ? '获得1次抽奖' : ''}}</div>
                    <div class="icon" v-if="v.status != 0" :class="[{over: v.status == -1,use: v.status == 1}]"></div>
                </div>
            </div>
        </div>
        <div class="null" v-else>
            <img src="https://aliyunsso.edspay.com/web/wx/integralStroe/groups.png" alt="">
            <p>暂无数据！</p>
            <div class="btn" @click="appRouter('/doubleEleven/meetingOne')">我要定制红包</div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import {Toast} from 'mint-ui';
    export default {
        mixins:[ wxToapp ],
        data() {
            return {
                count: '',
                list: [],

            }
        },
        methods: {
            initData(){
                this.getNotlogData('/activity/november/getMyRedList', (data) => {
                    if(data.resCode == 1){
                        this.count = data.resData.count;
                        this.list = data.resData.list.list;
                    }else{
                        Toast(data.resMsg)
                    }
                }, {pageSize:1000, pageNum:1},1)
            },
            toRed(){
                if (this.osType) {
                    this.PassValue('WIP')
                }else{
                    this.appRouter('/wxInvest')
                }
            },
        },
        created: function() {
            this.PassValue('NavWhite_红包记录');
        },
        mounted: function() {
            this.initData()
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #redRecord{
        font-family: PingFangSC-Regular;
        .heade{
            width: 100%;
            height: 2.266667rem;
            background: #fff;
            padding-top: .533333rem;
            margin-bottom: .533333rem;
            .myChance{
                width: 100%;
                text-align: center;
                height: .746667rem;
                line-height: .746667rem;
                font-size: .4rem;
                color: #333333;
                letter-spacing: .008933rem;
                margin-bottom: .106667rem;
                span{
                    font-size: .533333rem;
                    color: #F92A2E;
                    margin: 0 .133333rem;
                }
                i{
                    color: #F92A2E;
                }
            }
            .tips{
                width: 100%;
                text-align: center;
                font-size: .346667rem;
                color: #666666;
                letter-spacing: .007733rem;
            }
        }
        .redList{
            width: 100%;
            padding: 0 .4rem;
            .list{
                width: 9.2rem;
                height: 3rem;
                margin-bottom: .266667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/packetrt_off.png) no-repeat;
                background-size: 100%;
                font-size: .346667rem;
                line-height: .506667rem;
                position: relative;
                .redLeft{
                    width: 6.306667rem;
                    height: 100%;
                    float: left;
                    padding: .386667rem .4rem .266667rem;
                    .name{
                        margin-bottom: .333333rem;
                        height: .426667rem;
                        line-height: .426667rem;
                        font-size: .4rem;
                        color: #333333;
                        font-family: PingFangSC-Semibold;
                    }
                    .validity, .rule{
                        margin-bottom: .186667rem;
                        height: .32rem;
                        line-height: .32rem;
                        font-size: .32rem;
                        color: #808080;
                    }
                    .line{
                        width: 5.733333rem;
                        height: 0;
                        border-bottom: .013333rem dashed #E0E0E0;
                        margin-left: -0.106667rem;
                    }
                    .time{
                        height: .8rem;
                        line-height: .8rem;
                        font-size: .266667rem;
                        color: #808080;
                    }
                }
                .redRight{
                    width: 2.893333rem;
                    height: 100%;
                    float: left;
                    padding-top: .946667rem;
                    position: relative;
                    .money{
                        height: .8rem;
                        line-height: .8rem;
                        font-family: DIN-Medium;
                        font-size: .933333rem;
                        color: #FFFFFF;
                        text-align: center;
                        span{
                            font-family: PingFangSC-Regular;
                            font-size: .4rem;
                        }
                    }
                    .tips{
                        margin-top: .346667rem;
                        line-height: .373333rem;
                        font-size: .266667rem;
                        color: #FFFFFF;
                        text-align: center;
                    }
                    .button{
                        width: 1.6rem;
                        height: .453333rem;
                        border: .013333rem solid #FFFFFF;
                        border-radius: .226667rem;
                        margin: .4rem auto 0;
                        font-size: .266667rem;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: .453333rem;
                    }
                    .icon{
                        width: 1.266667rem;
                        height: 1.28rem;
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        z-index: 9;
                    }
                    .icon.over{
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/over.png) no-repeat;
                        background-size: 100%;
                    }
                    .icon.use{
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/use.png) no-repeat;
                        background-size: 100%;
                    }
                }
            }
            .list.active{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/packetrt_on.png) no-repeat;
                background-size: 100%;

            }
        }
        .null{
            img{
                width: 5.213333rem;
                height: 3.626667rem;
                display: block;
                margin: 1.506667rem auto 0;
                margin-bottom: .333333rem;
            }
            p{
                width: 100%;
                text-align: center;
                font-size: .346667rem;
                color: #808080;
                height: .493333rem;
                margin-bottom: .493333rem;
            }
            .btn{
                width: 4.8rem;
                height: .933333rem;
                line-height: .933333rem;
                text-align: center;
                margin: 0 auto;
                background: #FF5B4C;
                border-radius: .533333rem;
                font-size: .373333rem;
                color: #fff;
            }
        }
    }
</style>
