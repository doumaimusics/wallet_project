<template>
    <div ref="myPrecious" id="myPrecious">
        <div v-title class="pageTitle">出海寻宝</div>
    	<div class="groupPhoto">
            <ul class="clear">
                <li class="list1 list fl">
                    <img v-if="sailSum>=seaTerminus[0]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz1_bright.png" alt="">
                </li>
                <li class="list2 list fl">
                    <img v-if="sailSum>=seaTerminus[1]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz2_bright.png" alt="">
                </li>
                <li class="list3 list fl">
                    <img v-if="sailSum>=seaTerminus[2]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz3_bright.png" alt="">
                </li>
                <li class="list4 list fl">
                    <img v-if="sailSum>=seaTerminus[3]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz4_bright.png" alt="">
                </li>
            </ul>   
            <div @click="toApp('WIP','/wxInvest')" class="btn"></div>
        </div>
        <div class="preciousList">
            <ul v-if="preciousList.length != 0">
                <li v-for="item in preciousList">
                    <img v-if="item.awardType == 4" :src="(item.redAmount == 500 ? listImg[4]:listImg[5])" alt="" class="imgLeft fl">
                    <img v-else :src="listImg[item.awardType]" alt="" class="imgLeft fl">
                    <div class="content fl">
                        <div class="name">{{item.awardName}}</div>
                        <div v-if="item.awardType == 4" class="tips">{{listTips[4]+item.redAmount}}积分</div>
                        <div v-else class="tips">{{listTips[item.awardType]}}</div>
                        <div class="getTime">获取时间：{{item.addTime | divisionTime}}</div>
                        <!-- 自动使用按钮 -->
                        <div v-if="item.status == 0 && item.awardType == 3" class="cardBtn btn"></div>
                        <!-- 使用按钮 -->
                        <div @click="openCard(item)" v-else-if="item.status == 0" class="useBtn btn"></div>
                        <div v-else-if="item.status != 0" class="usedBtn btn"></div>
                    </div>
                </li>
            </ul>
            <div v-else-if="getUrlData" class="null">
                <img src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/kong.png" alt="">
                <div class="text">真遗憾，你还没有获得任何宝藏哦！</div>
            </div>
        </div>
        <div @click="showExplain = true" class="explain"></div>
        <div v-if="successTips" v-layer class="success">
            <div class="content">
                <img :src="activeAward" alt="">
                <div @click="successTips = false" class="close"></div>
            </div>
        </div>
        <div v-if="showExplain" v-layer class="explainTips">
            <div class="content">
                <img src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/ExplainTips1.png" alt="">
                <div @click="showExplain = false" class="close"></div>
            </div>
        </div>
        <!-- 确认使用卡片弹框 -->
        <div v-if="confirmCard" v-layer class="confirmLayer">
            <div class="content">
                <img v-if="confirmInfo.awardType == 4" :src="(confirmInfo.redAmount == 500 ? cardImg[1]:cardImg[2])" alt="">
                <img v-else :src="cardImg[0]"  alt="">
                <div class="cancleBtn btn" @click="confirmCard = false"></div>
                <div class="confirmBtn btn" @click="useCard(confirmInfo)"></div>
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
                getUrlData:false,
                seaTerminus:[5000,15000,30000,48000],//每个海域的终点
                preciousList:[],
                showExplain:false,
                successTips:false,
                confirmCard:false,
                confirmInfo:{},
                awardImg:[
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/award2.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/award4-500.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/award4-1000.png',
                ],
                activeAward:'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/award2.png',
                listImg:[
                    '','',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/precious2.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/precious3.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/precious4_500.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/precious4_1000.png'
                ],
                cardImg:[
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/levelCard.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/500Card.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/1000Card.png',
                ],
                listTips:[
                    '','',
                    '提升一个等级，维持30天',
                    '降级时自动延长有效期30天',
                    '立即使用后用户增加'
                ],
                sailSum:0,//航行总数
    		}
    	},
    	methods:{
            getPrecious(){
                this.getAppData('/sail/myTreasure',(data)=>{
                    if(data.resCode){
                        this.getUrlData = true;
                        this.sailSum = data.resData.sailSum;
                        console.log(this.sailSum)
                        this.preciousList = data.resData.sailAwardUserList;
                    }
                },{})
            },
            openCard (item) {
                this.confirmCard = true,
                this.confirmInfo = item
            },
            useCard(item){
                this.getAppData('/sail/useTreasure',(data)=>{
                    if(data.resCode){
                        console.log('132');
                        this.confirmCard = false
                        item.status = 1;
                        this.successTips = true;
                        if(item.awardType == 2){
                            this.activeAward = this.awardImg[0];
                        }else if(item.awardType == 4 && item.redAmount == 500){
                            this.activeAward = this.awardImg[1];
                        }else if(item.awardType == 4 && item.redAmount == 1000){
                            this.activeAward = this.awardImg[2];
                        }
                    }
                },{id:item.id});
            }
    	},
    	created(){
    	   this.getPrecious();	
    	},
        mounted(){
            var height = document.documentElement.clientHeight; //获取设备的宽度
            this.$refs.myPrecious   .style.minHeight = height + 'px';
        }
    }
</script>

<style lang="scss">
    body,html{
        height:100%;
    }
</style>

<style lang="scss" scoped>
    #myPrecious{
        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/myPrecious/precious_bg.png') no-repeat;
        background-size: 100%;
        background-color:#7D312D;
        font-family: PingFangSC-Regular;
        .explainTips{
            .content{
                padding-top:3.5rem;
                position: relative;
                img{
                    display:block;
                    height:9.8rem;
                    width:7.906667rem;
                    margin:0 auto;
                }
                .close{
                    position: absolute;
                    bottom:0;
                    left: 50%;
                    margin-left:-0.666667rem;
                    height:1.333333rem;
                    width:1.333333rem;
                }
            }
        }
        .confirmLayer {
            .content{
                position: relative;
                margin:3.5rem auto 0 auto;
                height:8.266667rem;
                width:7.706667rem;
                img{
                    display:block;
                    height:8.266667rem;
                    width:7.706667rem;
                }
                .btn {
                    position: absolute;
                    width:2.586667rem;
                    height: 1.066667rem;
                }
                .confirmBtn {
                    top:6.8rem;
                    left: 4.16rem;
                }
                .cancleBtn {
                    top:6.8rem;
                    left: .96rem;
                }
            }
        }
        .success{
            .content{
                padding-top:4.4rem;
                position: relative;
                img{
                    display:block;
                    height:8.88rem;
                    width:7.92rem;
                    margin:0 auto;
                }
                .close{
                    position: absolute;
                    bottom:0;
                    left: 50%;
                    margin-left:-0.666667rem;
                    height:1.333333rem;
                    width:1.333333rem;
                }
            }
        }
        .explain{
            position: fixed;
            right:0;
            top:6.4rem;
            height:2.0rem;
            width:0.88rem;
            background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/shuoming.png') no-repeat;
            background-size:100% 100%;
        }
        .groupPhoto{
            height:5.68rem;
            ul{
                padding-top: 0.72rem;
                li{
                    height: 2.533333rem;
                    width: 2.133333rem;
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz1_grey.png');
                    background-size: 100% 100%!important;
                    margin-left: 0.293333rem;
                    img{
                        height:100%;
                        width:100%;
                    }
                }
                .list2{
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz2_grey.png');
                }
                .list3{
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz3_grey.png');
                }
                .list4{
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/hz4_grey.png');
                }
            }
            .btn{
                height:1.013333rem;
                width:6.533333rem;
                margin: 0.96rem auto 0;
            }
        }
        .preciousList{
            padding-top: 0.64rem;
            .null{
                padding-top: 2.4rem;
                img{
                    height:3.68rem;
                    width:5.28rem;
                    display: block;
                    margin:0 0 0.1rem 2rem;
                }
                .text{
                    text-align:center;
                    color:#fff;
                    font-size:0.32rem;
                    line-height:0.533333rem;
                }
            }
            ul{
                padding-bottom: 0.1rem;
                li{
                    height:4.0rem;
                    width: 9.36rem;
                    margin: 0 auto;
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/myPrecious/kapian_bg.png') no-repeat;
                    background-size:100% 100%;
                    margin-bottom: 0.32rem;
                    img{
                        height:3.04rem;
                        width:2.56rem;
                        margin:0.48rem 0 0 0.666667rem;
                    }
                    .content{
                        padding-left: 1.04rem;
                        font-size: 0.32rem;
                        color: #FFE1AC;
                        .name{
                            font-size:0.48rem;
                            line-height: 0.666667rem;
                            font-family: PingFangSC-Regular;
                            padding: 0.346667rem 0 0.213333rem 0;
                            color:#F9E3BC;
                        }
                        .getTime,.tips{
                            line-height:0.48rem;
                        }
                        .btn{
                            margin-top: 0.32rem;
                            height:1.013333rem;
                            width:3.2rem;
                            background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/myPrecious/use.png') no-repeat;
                            background-size:100% 100%!important;
                        }
                        .usedBtn{
                            background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/myPrecious/used.png') no-repeat;
                        }
                        .cardBtn{
                            background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/myPrecious/cardBtn.png') no-repeat;
                        }
                    }
                }
            }
        }
    }
</style>