<template>
    <div id="VipBenefits">
        <div class="investRecord">
            <ui-title title="会员福利"></ui-title>
            <div class="investTab">
            <ul>
                <!-- {{notReceive?'('+notReceive+')':''}} -->
                <li :class="{activeTab:1 === isActive}" @click="tabList(1, 0)">未领取</li>
                <!-- {{haveReceived?'('+haveReceived+')':''}} -->
                <li :class="{activeTab:2 === isActive}" @click="tabList(2, 1)">已领取</li>
                <!-- {{failure?'('+failure+')':''}} -->
                <li :class="{activeTab:3 === isActive}" @click="tabList(3, -1)">已失效</li>
            </ul>
            </div>
            <div class="investTabDiv">
                <ul>
                    <li v-for="(v,i) in Viplist">
                        <div class="topBg">
                            <div class="icon fl" :class="[{over: v.status != 0}]"></div>
                            <div class="content fl">
                                <div class="ruleName">{{v.ruleName}}</div>
                                <div class="vipWealDetails">{{v.vipWealDetails}}</div>
                            </div>
                            <div class="btn fr" :class="[{over: v.status != 0}]" @click="isReceive(v.id, v.status)">立即领取</div>
                        </div>
                        <div class="topBottom">
                            <div class="time" v-if="v.status == 0">领取截至：{{v.deadTime}}</div>
                            <div class="time" v-else-if="v.status == -1">失效时间：{{v.invalidTime}}</div>
                            <div class="time" v-else-if="v.status == 1" >领取时间：{{v.getTime}}</div>
                        </div>
                        <div class="Mark" v-if="v.status != 0"  :class="[{Receive: v.status == 1}]"></div>
                    </li>

                </ul>
                <div v-if="Viplist.length == 0" class="empty-div">
                    <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
                </div>
            </div>
        </div>
        <div class="layer" v-if="Receive || ReceiveSucc" v-layer></div>
        <!-- 确认领取 -->
        <div class="isReceive" v-if="Receive">
            <div class="close" @click="Receive = false"></div>
            <div class="success" @click="getGift"></div>
        </div>
        <!-- 领取成功弹框 -->
        <div class="ReceiveSucc" v-if="ReceiveSucc">
            <div class="close" @click="ReceiveSucc = false"></div>
            <div class="list">
                <ul>
                    <li v-for="v in pageInfo">
                        <div class="welfareLeft" :class="[{active:v.type != 1}]">
                            <div class="tips" v-if="v.type == 1">可兑换现金</div>
                            <div class="limit">{{v.limitInvertMoney}}</div>
                        </div>
                        <div class="welfareRight">
                            <div class="money">{{v.amount}}<span>{{v.type == 3 ? '%' : '元'}}</span></div>
                            <div class="type">{{v.type == 1 ? '现金红包' : v.type == 2 ? '抵扣红包' : v.type ==3 ? '加息券' :''}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="ReceiveBtn">
                <div class="ToLook" @click="$router.push('/myAccount/myCoupon')"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import title from "../../public/account-title.vue"
    export default {
        data() {
            return {
                isActive: 1,
                notReceive: 0,
                haveReceived: 0,
                failure: 0,
                Viplist:[],
                Receive:false,
                getGiftId:0,
                ReceiveSucc:false,
                pageInfo:[],
            }
        },
        methods: {
            tabList (val, j) {
                this.isActive = val
                this.getRate(j);
            },
            getRate (n) {
                global.http.post(this,"/vip/gift/giftList",{
                status: n
                },data => {
                    if (data.data.resCode == 1){
                        this.Viplist = data.data.resData.giftList;
                        this.notReceive = this.haveReceived = this.failure = 0;
                        n==0 ? this.notReceive = this.Viplist.length : n==1 ? this.haveReceived = this.Viplist.length : this.failure = this.Viplist.length;
                    }
                })
            },
            isReceive(ReceiveId, str){
                if(str == 1 || str == -1){
                    return;
                };
                this.Receive = true;
                this.getGiftId = ReceiveId;
            },
            getGift(){
                this.Receive = false;
                global.http.post(this,"/vip/gift/getGift",{
                id: this.getGiftId
                },data => {
                    if (data.data.resCode == 1){
                        this.pageInfo = data.data.resData.pageInfo;
                        this.ReceiveSucc = true;
                        this.getRate(0);

                    }
                })
            }
        },
        created: function() {
            this.getRate(0);
        },
        mounted: function() {

        },
        components: {
        'ui-title': title,
      }
   }
</script>

<style lang="scss" scoped>
    #VipBenefits{
        background: #fff;
        padding: 43px 20px 0;
        .investTabDiv{
            margin-top: .533333rem;
            ul{
                li{
                    position: relative;
                    float: left;
                    width: 397px;
                    height: 134px;
                    background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/VipBenefitsBg.png);
                    background-size: 100% 100%;
                    margin-bottom: 17px;
                    margin-right: 21px;
                    padding: 15px 15px 12px 20px;
                    .topBg{
                        height: 55px;
                        margin-bottom: 23px;
                        .icon{
                            width: 48px;
                            height: 48px;
                            margin-top: 4px;
                            background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/redIcon.png);
                            background-size: 100% 100%;
                        }
                        .content{
                            margin-left: 15px;
                            .ruleName{
                                height: 28px;
                                line-height: 28px;
                                color: #333333;
                                font-size: 20px;
                                margin-bottom: 5px;
                                max-width: 210px;
                                overflow: hidden;
                            }
                            .vipWealDetails{
                                height: 22px;
                                line-height: 22px;
                                color: #808080;
                                font-size: 16px;
                                max-width: 210px;
                                overflow: hidden;
                            }
                        }
                        .btn{
                            width: 87px;
                            height: 29px;
                            border-radius: 17px;
                            background: #FF5B4C;
                            line-height: 29px;
                            text-align: center;
                            color: #FFFFFF;
                            font-size: 12px;
                            margin-top: 10px;
                            cursor: pointer;
                        }
                        .btn.over{
                            background: #C8C8C8;
                            color: #FFFFFF;
                        }
                        .icon.over{
                            background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/redIconOver.png);
                            background-size: 100% 100%;
                        }
                    }
                    .topBottom{
                        .time{
                            height: 40px;
                            line-height: 40px;
                            font-size: 12px;
                            color: #808080;

                        }
                    }
                    .Mark{
                        position: absolute;
                        width: 106px;
                        height: 105px;
                        background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/Invalid.png);
                        background-size: 100% 100%;
                        top: 15px;
                        right: 80px;
                    }
                    .Mark.Receive{
                            background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/Receive.png);
                            background-size: 100% 100%;
                    }
                }
            }
            .empty-div {
                display: -ms-flexbox;
                display: flex;
                -ms-flex-direction: row;
                flex-direction: row;
                -ms-flex-pack: center;
                justify-content: center;
                -ms-flex-align: center;
                align-items: center;
                height: 200px;
                margin-top: 100px;
            }
        }
        .isReceive{
            width: 338px;
            height: 407px;
            background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/isReceive.png);
            background-size: 100% 100%;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            z-index: 999;
            .close, .success{
                width: 40%;
                float: left;
                height: 44px;
                margin-top: 332px;
                cursor: pointer;
                margin-left: 23px;
            }
        }
        .ReceiveSucc{
            width: 390px;
            height: 548px;
            background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/ReceiveSuccBg.png);
            background-size: 100% 100%;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            z-index: 999;
            .close{
                width: 48px;
                height: 48px;
                position: absolute;
                top: 0;
                right: 0;
                z-index: 99;
                cursor: pointer;
            }
            .list{
                width: 347px;
                height: 328px;
                overflow: hidden;
                overflow-y: auto;
                margin-left: 21px;
                margin-top: 150px;
                ul{
                    li{
                        width: 348px;
                        height: 90px;
                        margin-bottom: 23px;
                        background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/welfare.png);
                        background-size: 100% 100%;
                        .welfareLeft{
                            float: left;
                            width: 215px;
                            font-size: 20px;
                            color: #808080;
                            padding-left: 20px;
                            padding-top: 19px;
                            .tips{
                                width:100%;
                                height:28px;
                                font-family:PingFangSC-Medium;
                                font-weight:500;
                                line-height:28px;
                                color: #333;
                            }
                            .limit{
                                width:100%;
                                height:26px;
                                font-family:PingFangSC-Regular;
                                font-weight:400;
                                line-height:26px;
                                span{
                                    font-family:PingFangSC-Medium;
                                    font-weight:500;
                                    color:#FF5D5F;
                                }
                            }
                        }
                        .welfareLeft.active{
                            padding-top: 31px;
                        }
                        .welfareRight{
                            float: left;
                            width: 132px;
                            color: #fff;
                            text-align: center;
                            .money{
                                width:100%;
                                height:59px;
                                font-size:42px;
                                font-family:PingFangSC-Semibold;
                                font-weight:600;
                                line-height:59px;
                                span{
                                    font-size:20px;
                                    font-family:PingFangSC-Medium;
                                }
                            }
                            .type{
                                width:86px;
                                height:23px;
                                border-radius:15px;
                                border:1px solid #fff;
                                display: inline-block;
                                margin-top: -4px;
                                font-size:16px;
                                font-family:PingFangSC-Regular;
                            }
                        }
                    }
                }
            }
            .ReceiveBtn{
                width: 390px;
                height: 110px;
                background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/ReceiveSuccBtn.png);
                background-size: 100% 100%;
                position: absolute;
                bottom: 0;
                left: 0;
                z-index: 99;
            }
            .ToLook{
                width: 288px;
                height: 55px;
                margin-top: 40px;
                margin-left: 50px;
                cursor: pointer;
            }
        }
    }
</style>

<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
