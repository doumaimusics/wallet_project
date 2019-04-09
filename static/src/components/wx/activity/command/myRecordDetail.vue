<template>
    <div class="command-root">
        <div v-title>福袋奖励详情</div>
        <!-- top -->
        <div v-if="info.type!=-1">
            <div class="command-top">
                <div class="top-left fl">
                    <p>已发放</p>
                    <p v-if="info.type == 2">该奖励为平台积分，<br/>请在<span >【我的可用积分-积分明细-获得】</span>查看。</p>
                    <p v-if="info.type == 0">请在APP中<span>【我的红包-红包】</span>查看。</p>
                    <p v-if="info.type == 1">请在APP中<span >【我的红包-加息券】</span>查看。</p>
                </div>
            </div>
            <!-- 虚拟详情 -->
            <div class="command-btm" >
                <p class="command-title">福袋奖励<span class="fr">{{info.addTime}}</span></p>
                <div class="command-coupon">
                    <p class="fl">{{info.denomination}}<i v-if="info.type == 0">元</i><i v-else-if="info.type == 1">%</i><i  v-else>积分</i></p>
                    <p class="fl">{{info.sufName}}</p>
                </div>
                <p class="command-name">{{info.rewardName}}</p>
                <p class="command-time">有效期：{{info.validTime}}</p>
            </div>
        </div>
        <!-- 实物详情 -->
        <div v-else>
            <div class="command-btm">
                <p class="command-title">福袋奖励<span class="fr">{{info.addTime}}</span></p>
                <div class="command-item">
                    <img class="fl" :src='info.picpath'/>
                    <div class="item-right fl">
                        <p>{{info.rewardName}}</p>
                        <p>包邮</p>
                    </div>
                    <p class="command-tip">该奖励为实物，将于10个工作日内由客户经理主动确认收货地址并邮寄。请耐心等待！</p>
                </div>
            </div>
            <!-- 有收货地址 -->
            <div class="command-btm mt20" v-if="info.isAddress == 1">
                <p class="command-title">收货人：{{info.realName}}<span class="fr">{{info.mobilePhone}}</span></p>
                <p class="command-addr">收货地址：{{info.address}}</p>
            </div>
            <!-- 没有收货地址 -->
            <div class="command-btm mt20" v-else>
                <i class="no-icon fl"></i>
                <div class="addr-tip fl">
                    <p>为保障您的商品准确、快速送达！</p>
                    <p @click="addAddr()">请填写收货地址<i></i></p>
                </div>
            </div>
            <!-- 联系客服 -->
            <p class="addr-kefu" v-if ="info.isAddress == 1">更换收货地址，<a :href="hrers">请联系客服</a></p>
            <p class="addr-kefu" v-else>填写地址后，如有修改，<a :href="hrers">请联系客服</a></p>
        </div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp'
export default {
        mixins: [wxToapp],
        data () {
            return{
                info:{},
                hrers:''
            }
        },
        methods: {
            // 获取信息
            getInfo () {
                this.getAppData('/fudai/rewardDetail',(data) =>{
                    if(data.resCode){
                        this.info = data.resData
                    }
                },{id:this.$route.query.orderId})
            },
            // 添加地址
            addAddr (id) {
                if (this.info.add == 1) {
                    this.appRouter('/intAddressList',{_type:3,orderId:this.$route.query.orderId})
                } else {
                    this.appRouter('/intAddress',{_type:3,orderId:this.$route.query.orderId})
                }
            },
        },
        created () {
            this.getInfo();
            
            //客服
            var timeamp = new Date().getTime()
            if(this.getCookie('nickname')){
              var qiMoName = this.getCookie('nickname') ? this.getCookie('nickname') : "游客"
              var qiMoId = this.getCookie('userId') ? this.getCookie('userId') : timeamp;
              this.hrers = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":'+qiMoName +'}&customField={"nickName":'+ qiMoName +'}&clientId='+ qiMoId;
            }else{
              this.hrers = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":"游客"}&customField={"nickName":"游客"}&clientId='+timeamp;
            }
        }
}
</script>
<style lang="scss" scoped>
    .command-root {
        width: 100%;
        height: 100vh;
        background: #F8F8F8;
        .command-top {
            height: 3.333333rem;
            background: url(https://aliyunsso.edspay.com/web/activity/command/fahuo.png) top right no-repeat white;
            background-size: 3.333333rem 3.333333rem;
            .top-left {
                margin: .72rem 0 0 .533333rem;
                p:nth-of-type(1) {
                    font-size: .506667rem;
                    color: #FF5B4C;
                }
                p:nth-of-type(2) {
                    font-size: .32rem;
                    color: #808080;
                    line-height: .506667rem;
                    margin-top: .4rem;
                    span {
                        color: #151515;
                    }
                }
            }
        }
        .command-btm {
            background: white;
            margin-top: .266667rem;
            padding: 0 .533333rem;
            overflow: hidden;
            .command-title {
                height: 1.2rem;
                line-height: 1.2rem;
                font-size: .4rem;
                color: #333333;
                span {
                    font-size: .346667rem;
                    color: #808080;
                }
            }
            .command-addr {
                font-size: .32rem;
                margin-bottom: .346667rem;
                color: #808080;
            }
            .command-coupon {
                width: 7.373333rem;
                height: 2.286667rem;
                background: url(https://aliyunsso.edspay.com/web/activity/command/jlbg.png);
                background-size:cover;
                margin: 0 auto;
                font-family: DIN-Medium;
                p {
                    line-height: 2.173333rem;
                    text-align: center;
                }
                p:nth-of-type(1) {
                    width: 4.433333rem;
                    font-size: .666667rem;
                    color: #333333;
                    i {
                        font-size: .426667rem;
                        margin-left: .036667rem;
                        font-family: DIN-Medium;
                    }
                }
                p:nth-of-type(2) {
                    width: 2.8rem;
                    font-size: .426667rem;
                    color: #FFFFFF;
                }
            }
            .command-name {
                font-size: .4rem;
                color: #333333;
                text-align: center;
                line-height: .4rem;
                margin-top: .4rem;
            }
            .command-time {
                font-size: .32rem;
                margin: .2rem 0 .533333rem 0;
                color: #808080;
                text-align: center;
            }
            /*实物*/
            .mt20 {
                margin-top: .266667rem;
            }
            .no-icon {
                width: 1.2rem;
                height: 1.2rem;
                background: url(https://aliyunsso.edspay.com/web/activity/command/addricon.png);
                background-size:cover;
                display: inline-block;
                margin: .266667rem 0;
            }
            .addr-tip {
                margin: .293333rem 0 0 0;
                    p:nth-of-type(1){
                        font-size: .373333rem;
                        color: #808080;
                    }
                    p:nth-of-type(2){
                        font-size: .32rem;
                        color: #608DFF;
                        margin-top: .17rem;
                        i {
                            display: inline-block;
                            width: .346667rem;
                            height: .346667rem;
                            background: url(https://aliyunsso.edspay.com/web/activity/command/lansanjiao.png);
                            background-size: cover;
                            vertical-align: sub;
                        }
                    }
                } 
            .command-item {
                overflow:hidden;
                img {
                    width:1.733333rem;
                    height:1.733333rem;
                }
                .item-right {
                    height:1.733333rem;
                    margin-left: .266667rem;
                    p:nth-of-type(1) {
                        font-size: .426667rem;
                        color: #333333;
                        line-height: .533333rem;
                    }
                    p:nth-of-type(2) {
                        font-size: .32rem;
                        margin-top: .293333rem;
                        color: #808080;
                    }
                }
                .command-tip {
                    font-size: .32rem;
                    color: #808080;
                    padding: .213333rem 0 .453333rem 0;
                    clear: both;
                }
                
            }
        }
        .addr-kefu {
            font-size: .293333rem;
            color: #333333;
            margin: .133333rem .533333rem 0 0;
            text-align: right;
            a {
                color: #608DFF;
                margin-left: .133333rem;
            }
        }
    }
</style>


