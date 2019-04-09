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
                    name:'京东E卡 (电子卡)',
                    days:[82000,50000,25000]
                },
                {
                    name:'LUNA MINI2 洗脸仪',
                    days:[192000,118000,59000]
                },
                {
                    name:'周生生黄金转运珠手链',
                    days:[223000,138000,69000]
                },
                {
                    name:'小米九号平衡车/电动滑板车',
                    days:[325000,200000,100000]
                },
                {
                    name:'戴森 吹风机',
                    days:[485000,300000,150000]
                },
                {
                    name:'小米8 (6+128GB)',
                    days:[485000,300000,150000]
                },
                {
                    name:'iPhone XR(256GB)',
                    days:[1270000,790000,395000]
                },
                {
                    name:'iPhone Xs Max(256GB)',
                    days:[1770000,1100000,550000]
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
            padding: 0 .4rem;
            border-bottom: 1px solid #E5E5E5;
            span {
                font-size: .373333rem;
                color: #FF5B4C;
            }
            img {
                width: .36rem;
                height: .36rem;
                margin-top: .433333rem;
                float: right;
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

