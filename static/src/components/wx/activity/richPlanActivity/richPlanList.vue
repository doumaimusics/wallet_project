<template>
    <div id="richPlanList">
        <div v-title>中奖记录</div>
        <div class="header_box">
             <p>现金红包请在<span>【我的-我的红包】</span>中兑换，红包金额将会转入账户可用余额中！</p>
        </div>
        <div class="list_box">
            <div class="null_box" v-if="listData.length == 0">
                <img src="https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_icon_null.png?v=1.1" alt="">
                <p>暂无中奖记录</p>
            </div>
            <ul v-else>
                <li v-for="item in listData">
                    <div class="left_cent fl">
                        <h3>现金红包</h3>
                        <p>中奖时间：{{item.addTime}}</p>
                    </div>
                    <div class="right_cent fr"><span>{{item.amount}}</span>元</div>
                </li>
            </ul>
            
            <!-- <div class="null_more" v-if="">没有更多了</div> -->
        </div>

    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import {Toast} from 'mint-ui';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                listData:[],
                isShow:false
            }
        },
        methods:{
            initData(){
                this.getNotlogData('/activity/inviteNew/invite888init', (data) =>{
                    this.listData = data.resData.drawList;
                    if(data.resData.loginStatus != 1){
                        Toast({ //    小黑快
                            message: '登录信息失效',
                            iconClass: 'icon icon-success',
                            duration: 1000
                        });
                        this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    }
                },{})
            }
        },
        created() {
            this.initData()
        },
        mounted() {
            this.PassValue('NavWhite_中奖记录');
        },
    }
</script>

<style lang="scss" scoped>
    #richPlanList{
        position: relative;
        overflow: hidden;
        width: 100%;
        padding-top: 2.813333rem;
        .header_box{
            width: 100%;
            background: #FFFFFF;
            position: fixed;
            top: 0;
            left: 0;
            font-family: PingFangSC-Regular;
            font-size: .346667rem;
            color: #333333;
            text-align: center;
            padding: .533333rem .906667rem;
            text-align: center;
            line-height: .613333rem;
            z-index: 10;
            span{
                color: #FF6B5E;
            }
        }
        .list_box{
            padding: 0 .4rem;
            ul{
                margin-bottom: .533333rem;
                li{
                    margin-bottom: .4rem;
                    width: 9.2rem;
                    height: 2.346667rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_bg.png?v=1.1') no-repeat;
                    background-size: cover;
                    position: relative;
                    font-family: PingFangSC-Regular;
                    .left_cent{
                        padding:.64rem 0 0 .4rem;
                        width: 6.306667rem;
                        height: 100%;
                        h3{
                            font-size: .4rem;
                            color: #333;
                            font-family: PingFangSC-Semibold;
                            margin-bottom: .333333rem;
                        }
                        p{
                            font-size: .32rem;
                            color: #808080;
                        }
                    }
                    .right_cent{
                        width: 2.893333rem;
                        height: 100%;
                        line-height: 2.346667rem;
                        text-align: center;
                        font-size: .133333rem;
                        color: #fff;
                        font-size: .4rem;
                        span{
                            font-size: .933333rem;
                            font-family: DIN-Medium;
                        }
                    }
                }
            }
            .null_more{
                font-family: PingFangSC-Regular;
                font-size: .293333rem;
                color: #C5C5C5;
                text-align: center;
            }
            .null_box{
                position: relative;
                text-align: center;
                padding-top: 1.56rem;
                img{
                    width: 5.213333rem;
                    height: 3.626667rem;
                    margin-bottom: .333333rem;
                }
                p{
                    font-family: PingFangSC-Regular;
font-size: .346667rem;
color: #808080;
                }
            }
        }
    }
</style>