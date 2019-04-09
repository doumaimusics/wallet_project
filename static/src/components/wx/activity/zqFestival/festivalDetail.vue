<template>
    <div id="festivalDetail">
        <div v-title>中秋献礼</div>
        <div class="detail">
            <div class="userData">
                <div class="moonNum fl">{{moonSize}}</div>
                <div class="money fl">{{redSum}}</div>
            </div>
            <div class="content">
                <div class="topName clear">
                    <div @click="clickName(1)" :class="{activeName:activeName == 1}" class="leftName name fl">饼制作记录</div>
                    <div @click="clickName(2)" :class="{activeName:activeName == 2}" class="rightName name fl">奖励兑换记录</div>
                    <div :class="{toRight:activeName == 2}" class="sanjiao toLeft"></div>
                </div>
                <div class="listHidden">
                    <div :class="{activeRight:activeName == 2}" class="listBox clear activeLeft">
                        <div class="leftList list fl">
                            <div class="listTop clear bdr-b">
                                <div class="li fl">日期</div>
                                <div class="li fl">制作月饼数</div>
                            </div>
                            <div v-if="moonMakes.length != 0" class="ulBox">
                                <ul>
                                    <li v-for="item in moonMakes">
                                        <span>{{item.addTime}}</span>
                                        <span>+{{item.moonSize}}</span>  
                                    </li>
                                    
                                </ul>
                            </div>
                            <div v-else-if="hasGetDta" class="null">
                                <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/null.png" alt="">
                                <p>暂无记录</p>
                            </div>
                        </div>
                        <div class="rightList list fl">
                            <div class="listTop clear bdr-b">
                                <div class="li fl">日期</div>
                                <div class="li fl">兑换月饼数量</div>
                                <div class="li fl">兑换奖励</div>
                            </div>
                            <div v-if="moonRecords.length != 0" class="ulBox">
                                <ul>
                                    <li v-for="item in moonRecords">
                                        <span>{{item.addTime}}</span>
                                        <span>-{{item.moonSize}}</span>
                                        <span>{{item.name}}</span>
                                    </li>
                                    
                                </ul>
                            </div>
                            <div v-else-if="hasGetDta" class="null">
                                <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/null.png" alt="">
                                <p>暂无记录</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';     // APP交互函数
    export default {
        mixins:[wxToapp],
        data() {
            return {
                moonSize:0,
                redSum:0,
                moonMakes:[],//制作月饼记录
                moonRecords:[],//兑换记录
                activeName:1,
                hasGetDta:false,
            }
        },
        methods: {
            getUserData(){
                this.getAppData('/activity/moon/detail',(data)=>{
                    if(data.resCode){
                        this.hasGetDta = true;

                        this.moonSize = data.resData.moonSize;
                        this.redSum = data.resData.redSum;

                        this.moonMakes = data.resData.moonMakes;
                        this.moonRecords = data.resData.moonRecords;
                    }
                },{})
            },
            clickName(index){
                if(index != this.activeName){
                    this.activeName = index;
                }
            }
        },
        created() {
            this.getUserData();
        },
        mounted(){
            this.PassValue('NavWhite_中秋献礼');
            document.getElementById('festivalDetail').style.minHeight= document.documentElement.clientHeight +'px';
        }
    }
</script>

<style lang="scss" scoped>
    #festivalDetail{
        background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/dteailBG.png') no-repeat;
        background-size: 100%;
        font-family: PingFangSC-Regular;
        .detail{
            .userData{
                height:3.213333rem;
                margin: 0 0.373333rem 0.333333rem;
                padding-top: 1.106667rem;
                .fl{
                    width:50%;
                    text-align:center;
                    font-size: 0.533333rem;
                    line-height:0.64rem;
                    font-family: DIN-Medium;
                }
            }
            .content{
                height:12.48rem;
                width:8.106667rem;
                margin: 0 auto;
                .topName{
                    padding-top: 0.133333rem;
                    position: relative;
                    .name{
                        width:50%;
                        text-align:center;
                        font-size:0.373333rem;
                        line-height:1.0rem;
                        color:#D3B3FF;
                        font-family: PingFangSC-Semibold;
                    }
                    .activeName{
                        color:#fff;
                    }
                    .sanjiao{
                        height:0.133333rem;
                        width:0.266667rem;
                        background:url(https://aliyunsso.edspay.com/web/wx/activity/zqFestival/sanjiao.png) no-repeat;
                        background-size:100% 100%;
                        position: absolute;
                        bottom:-0.04rem;
                        left:1.813333rem;
                    }
                    .toLeft{
                        left:1.8133rem;
                        transition: all 0.4s;
                    }
                    .toRight{
                        left:5.866667rem;
                        transition: all 0.4s;
                    }
                }
                .listHidden{
                    width: 8.106667rem;
                    height:10.933333rem;
                    margin: 0 auto;
                    overflow: hidden;
                    position: relative;
                    .listBox{
                        width:16.213333rem;
                        height:100%;
                        position: absolute;
                        top:0;
                        left:0;
                        .list{
                            width:8.093333rem;
                            height:100%;
                            .listTop{
                                height:0.826667rem;
                                color: #333;
                                font-size:0.346667rem;
                                line-height:0.8266rem;
                                position: relative;
                                margin-bottom: 0.213333rem;
                            }
                            ul{
                                height:100%;
                                overflow-y: auto;
                                li{
                                    height:0.453333rem;
                                    margin-bottom: 0.226667rem;
                                    span{
                                        display:inline-block;
                                        color:#666;
                                        font-size:0.32rem;
                                        line-height:0.453333rem;
                                    }
                                }
                            }
                            .ulBox{
                                height:10.0rem;
                                overflow: hidden;
                            }
                            .null{
                                img{
                                    height:2.933333rem;
                                    width:2.933333rem;
                                    display:block;
                                    margin: 1.6rem auto 0;
                                }
                                p{
                                    font-size:0.4rem;
                                    line-height:0.56rem;
                                    color:#979797;
                                    text-align:center;
                                }
                            }
                            .bdr-b:after{
                                border-bottom: 1px solid #B00987;
                            }
                        }
                        .leftList{
                            .listTop .li,li span{
                                width:48%;
                                text-align:center;
                            }
                        }
                        .rightList{
                            .listTop .li,li span{
                                width:31.6%;
                                text-align:center;
                            }
                        }
                    }
                    .activeLeft{
                        transition: all 0.4s;
                        left: 0;
                    }
                    .activeRight{
                        transition: all 0.4s;
                        left: -8.093333rem;
                    }
                }
            }
        }
    }
</style>