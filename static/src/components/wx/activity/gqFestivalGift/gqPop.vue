<template>
    <div>
        <mt-popup v-model="isUp" position="bottom" :closeOnClickModal="false" style="width:100%">
            <div class="midPop-main">
                <!-- 标题 -->
                <div class="midPop-title">
                    以下任意达标可领取
                    <span>{{info[id].name}}</span>
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/close-icon.png" @click="close"/>
                </div>
                <!-- 投资列表 -->
                <ul class="midPop-list">
                    <li>
                        <div class="w50">
                            <p>90天</p>
                            <p>出借项目</p>
                        </div>
                        <div class="w50">
                            <p class="red-p">{{info[id].days[0] | moneyFormat}}元</p>
                            <p>累计出借满</p>
                        </div>
                    </li>
                    <li>
                        <div class="w50">
                            <p>180天</p>
                            <p>出借项目</p>
                        </div>
                        <div class="w50">
                            <p class="red-p">{{info[id].days[1] | moneyFormat}}元</p>
                            <p>累计出借满</p>
                        </div>
                    </li>
                    <li>
                        <div class="w50">
                            <p>360天</p>
                            <p>出借项目</p>
                        </div>
                        <div class="w50">
                            <p class="red-p">{{info[id].days[2] | moneyFormat}}元</p>
                            <p>累计出借满</p>
                        </div>
                    </li>
                </ul>
                <!-- 立即出借按钮 -->
                <div class="invest-btn" @click="goInvest">立即出借</div>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
export default {
    mixins:[wxToapp],
    data () {
        return {
            info:[
                {
                    name:'京东E卡500元（电子卡）',
                    days:[80000,40000,20000]
                },
                {
                    name:'小鸟看看 VR一体机',
                    days:[240000,120000,60000 ]
                },
                {
                    name:'京东E卡2000元（电子卡）',
                    days:[290000,145000,72500]
                },
                {
                    name:'极米Z6投影仪 1080P',
                    days:[390000,195000,97500]
                },
                {
                    name:'美的 双开门冰箱',
                    days:[500000,250000,125000]
                },
                {
                    name:'大疆（DJI）无人机',
                    days:[860000,430000,215000]
                },
            ]
        }
    },
    props: {
        'isUp': Boolean,
        'id':Number,
        'isEnd':Boolean
    },
    methods: {
        // 关闭pop
        close() {
            this.$emit('close')
        },
        // 去出借
        goInvest() {
            if (this.isEnd) {
                this.$emit('close')
                this.$emit('showEnd')
            } else {
                this.toApp('WIP', {
                    path: '/wxInvest',
                    query: {
                        thisUrl: this.$route.fullPath
                    }
                })
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .midPop-main {
        width: 100%;
        position: relative;
        .midPop-title {
            height: 1.2rem;
            line-height: 1.2rem;
            font-size: .4rem;
            color: #333333;
            width: 100%;
            padding: 0 .6rem 0 .4rem;
            border-bottom: 1px solid #E5E5E5;
            white-space: nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
             position: relative;
            span {
                font-size: .373333rem;
                color: #FF5B4C;
                
            }
            img {
                width: .36rem;
                height: .36rem;
                margin-top: .433333rem;
                position: absolute;
                top: 0.4rem;
                right: .3rem;
                margin: auto;
            }
        }
        .midPop-list {
            width: 8.933333rem;
            margin: 0 auto;
            li {
                width: 8.933333rem;
                height: 1.693333rem;
                border-bottom: 1px solid #E5E5E5;
                overflow: hidden;
                text-align: center;
            }
            li:nth-last-of-type(1){
                border-bottom: none;
            }
            .w50{
                width: 49%;
                float: left;
                margin-top: .266667rem;
                font-family: DIN-Medium;
                p:nth-of-type(1){
                    font-size: .48rem;
                    color: #333333;
                    line-height: .666667rem;
                }
                p:nth-of-type(2){
                    font-size: .32rem;
                    color: #808080;
                    margin-top: .053333rem;
                    line-height: .44rem;
                }
                .red-p {
                    font-size: .48rem;
                    color: #FF5B4C !important;
                }
            }
        }
        .invest-btn{
            width: 4.8rem;
            height: .933333rem;
            line-height:  .933333rem;
            font-size: .373333rem;
            color: #FFFFFF;
            text-align: center;
            background: #FF5B4C;
            border-radius: .533333rem;
            margin: .133333rem auto .533333rem auto;
        }
    }
</style>

