<template>
    <div id="awardDetails">
        <div v-title>{{$route.query._title == '1' ? '兑换详情':'奖励详情'}}</div>
        <div v-if="1" class="content1">
            <div :style="{background:'url('+activeStatus.imgSrc+') no-repeat'}" class="topBox">
                <div class="title">{{activeStatus.title}}</div>
                <div v-html="activeStatus.detail + ((goodsClass == 3 && goodsDetail.paymentsType == 2) ? '<span>'+goodsDetail.courierNumber+'</span>':'')" class="text"><i>{{goodsDetail.courierNumber}}</i></div>
                <div v-if="goodsClass == -1 && (goodsDetail.paymentsType == 2 || goodsDetail.paymentsType == 3)" class="toWuliu" @click="appRouter('/logistics')">查看物流</div>
            </div>
            <div v-if="goodsClass == -1" class="express">
                <!-- <div class="shipments clear bdr-b">
                    <div class="imgs fl"></div>
                    <div class="content fl">
                        <div class="name">{{goodsDetail.paymentsType == 2 ? '已发货':'备货中'}}</div>
                        <div class="num">{{goodsDetail.paymentsType == 2 ? '快递单号：'+goodsDetail.courierNumber:'小伙伴已经快马加鞭处理您的物品，请耐心等待！'}}</div>
                    </div>
                </div> -->
                <div class="address clear">
                    <div class="imgs fl"></div>
                    <div v-if="goodsDetail.add" class="content fl">
                        <div class="userData clear">
                            <div class="name fl">收货人：{{goodsDetail.realName}}</div>
                            <div class="name phone fr">{{goodsDetail.mobilePhone}}</div>
                        </div>
                        <div class="addDetail">收货地址：{{goodsDetail.add}}</div>
                    </div>
                    <div v-else @click="toAddress" class="content nullCon fl">
                        <div class="tips">为保障您的商品准确、快速送达！</div>
                        <div class="fillIn">请填写收货地址</div>
                    </div>
                </div>
            </div>
            <div class="commodity">
                <div class="title clear">
                    <div v-if="$route.query._title == '2'" class="type fl">翻牌奖励</div>
                    <div v-else-if="$route.query._title == '3'" class="type fl">抽奖奖励</div>
                    <div v-else-if="goodsClass == -1" class="type fl">{{goodsDetail.typeName}}</div>
                    <div v-else class="type fl">{{typeNameList[goodsClass]}}</div>
                    <div class="time fr">{{goodsDetail.date}}</div>
                </div>
                <div v-if="goodsClass == -1" class="content clear">
                    <img :src="goodsDetail.shopPath" alt="" class="fl goodImg">
                    <!-- 实物描述 -->
                    <div class="text fl">
                        <div class="name">
                            <span class="tips">包邮</span>{{goodsDetail.goodsName}}
                        </div>
                        <!-- 有折扣 -->
                        <div v-if="goodsClass == -1 && $route.query._title == '1'&&goodsDetail.discount!=0" class="price">
                            <div class="text-old">
                                <span class="old-int">{{goodsDetail.oldScore}}<span>积分</span></span>
                                <span class="money">￥{{goodsDetail.marketPrice}}</span>
                            </div>
                            <div class="integral">
                                <span>{{goodsDetail.score}}</span>
                                <span>积分</span>
                                <span>{{goodsDetail.discount}}折</span>
                            </div>
                        </div>
                        <!-- 无折扣 -->
                        <div v-if="goodsClass == -1 && $route.query._title == '1'&&goodsDetail.discount==0" class="price">
                            <div class="integral" style="margin-top:.35rem">
                                <span>{{goodsDetail.score}}</span>
                                <span>积分</span>
                                <i class="price-through">￥{{goodsDetail.marketPrice}}</i>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 红包样式 -->
                <div v-else class="packet">
                    <div v-if="goodsClass == 3" :style="{background:'url('+goodsDetail.shopPath+') no-repeat'}" class="vip"></div>
                    <div v-else class="ticket clear" :class="{crad: goodsClass == 4}">
                        <div class="num fl">
                            {{goodsDetail.denomination}}
                            <span class="ic_3">{{unitList[goodsClass]}}</span>
                            <p class="expire-time" :class="{'recome-time': goodsClass == 4}">有效期：{{goodsDetail.validTime}}</p>
                        </div>
                        <div class="type fl">{{goodsDetail.sufName}}</div> 
                    </div>
                    <!-- 红包名 -->
                    <div class="name">{{goodsDetail.goodsName}}</div>
                    <!-- 折扣 -->
                    <div class="ins-discount" v-if="goodsDetail.discount > 0">
                        <span class="new-ins">{{goodsDetail.score}}<span>积分</span></span>
                        <span>{{goodsDetail.discount}}折</span>
                        <span>|</span>
                        <span class="old-ins" >{{goodsDetail.oldScore}}<span>积分</span></span>
                    </div>
                    <div class="ins-discount" v-else-if="$route.query._title == '1'">
                        <span class="new-ins" v-if="goodsDetail.score">{{goodsDetail.score}}<span>积分</span></span>
                    </div>
                    <div v-if="goodsClass == 3" class="time money"><i>{{goodsDetail.score}}</i>积分 <span>￥{{goodsDetail.marketPrice}}</span></div>
                    <div v-else class="time">
                        <span  v-if="$route.query._title == '1' && goodsClass == -1">
                            <i>{{goodsDetail.score}}</i>积分
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="goodsClass == -1" class="bottomText">
            <p class="text">填写地址后，如有修改</p>
            <div @click="relation" class="kefu"><img src="https://aliyunsso.edspay.com/web/wx/integralStroe/kefu.png" alt="">请联系客服</div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp'
    export default {
        mixins:[wxToapp],
    	data() {
    		return {
                goodsClass:null,//商品类型
                unitList:['元','%','积分'],
                typeNameList:['红包兑换','加息券兑换','积分兑换','视频会员','平台福利'],
                status: [
                    {
                        title:'备货中…',
                        detail:'小伙伴已经快马加鞭处理您的物品，<br/>请耐心等待！',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner1.png'
                    },
                    {
                        title:'已发货…',
                        detail:'快递单号：',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner2.png'
                    },
                    {
                        title:'已发放',
                        detail:'请在<span>【我的红包-红包】</span>查看。',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner3.png'
                    },
                    {
                        title:'已发放',
                        detail:'请在<span>【我的红包-加息券】</span>查看。',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner3.png'
                    },
                    {
                        title:'已发放',
                        detail:'请在<span>【我的积分-积分明细-获得】</span>查看。',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner3.png'
                    },
                    {
                        title:'已生成',
                        detail:'爱奇艺2个月黄金会员<br/>激活码：',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner3.png'
                    },
                    {
                        title:'生成中…',
                        detail:'爱奇艺会员激活码生成中...',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner4.png'
                    },
                    {
                        title:'已发放',
                        detail:'补签卡仅限当周签到日历中补签！',
                        imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/banner3.png'
                    }
                ],
                activeStatus:{},
                goodsDetail:{},
                type:null
    		}
    	},
    	methods:{
            relation(){//跳转客服
                if(this.osType){
                    this.PassValue('Service');
                }else{
                    // window.location.href = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=test1static.edspay.com&urlTitle=E都市钱包';
                    var timeamp = new Date().getTime()
                    if(this.getCookie('nickname')){
                      var qiMoName = this.getCookie('nickname') ? this.getCookie('nickname') : "游客"
                      var qiMoId = this.getCookie('userId') ? this.getCookie('userId') : ""
                      window.location.href = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":'+qiMoName +'}&customField={"nickName":'+ qiMoName +'}&clientId='+ qiMoId;
                    }else{
                      window.location.href = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":"游客"}&customField={"nickName":"游客"}&clientId='+timeamp;
                    }
                }
            },
            getDoodData(){//获取订单详情
                this.getAppData('/reward/queryRewardDetail',(data) =>{
                    console.log(data)
                    if(data.resCode){
                        this.goodsDetail = data.resData.data;
                        this.getStatus(this.goodsDetail.paymentsType)
                    }
                },{goodsClass:this.goodsClass,id:this.$route.query.id})
            },
            getStatus(paymentsType){ //设置提示信息
                switch(this.goodsClass){
                    case -1:
                        if(paymentsType == 2){
                            this.status[1].detail = this.goodsDetail.expressInfo+'：<br/><span>'+this.goodsDetail.courierNumber+'</span>'
                            console.log(this.status[1].detail)
                            this.activeStatus = this.status[1];
                        }else{ 
                            this.activeStatus = this.status[0]
                        }
                        break;
                    case 0:
                        this.activeStatus = this.status[2];
                        break;
                    case 1:
                        this.activeStatus = this.status[3];
                        break;
                    case 2:
                        this.activeStatus = this.status[4];
                        break;
                    case 3:
                        if(paymentsType == 2){
                            this.status[5].detail = this.goodsDetail.goodsName + '<br/>激活码：';
                            this.activeStatus = this.status[5];
                            console.log(this.activeStatus)
                        }else{
                            this.status[6].detail = this.goodsDetail.goodsName + '激活码生成中...';
                            this.activeStatus = this.status[6];
                        }
                        break; 
                    case 4:
                        this.activeStatus = this.status[7];
                        break;     
                }
            },
            toAddress(){//跳转添加地址
                console.log(this.$route.query.hasAdd)
                if(this.$route.query.hasAdd == '1'){
                    this.appRouter('/intAddressList',{orderId:this.$route.query.id,goodsClass:this.goodsClass,_type:2});
                }else{
                    this.appRouter('/intAddress',{orderId:this.$route.query.id,goodsClass:this.goodsClass,_type:2})
                }
            }
    	},
    	created(){
    		this.goodsClass = parseInt(this.$route.query.goodsClass);
            // console.log(this.$route.query.goodsClass)
            this.getDoodData();
    	},
        mounted(){
            //给app传值标题名
            this.PassValue('NavWhite_'+(this.$route.query._title == '1' ? '兑换详情':'奖励详情'));
            this.type = parseInt(this.$route.query._type);
        }
    }
</script>

<style lang="scss" scoped>
    #awardDetails{
        font-size:0.293333rem;
        color:#333;
        .content1{
            .topBox{
                position: relative;
                height:3.333333rem;
                width:100%;
                background-size: 100% 100%!important;
                padding-left: 0.533333rem;
                margin-bottom: 0.266667rem;
                .title{
                    padding: 1rem 0 0.4rem;
                    font-size: 0.506667rem;
                    line-height: 0.506667rem;
                    color: #FF5B4C;
                }
                .text{
                    font-size:0.32rem;
                    line-height:0.48rem;
                    color:#808080;
                    font-family: PingFangSC-Medium;
                }
                .toWuliu{
                    position: absolute;
                    right: .4rem;
                    top: .4rem;
                    width: 1.973333rem;
                    height: .706667rem;
                    opacity: 0.35;
                    background: #333333;
                    border: 1px solid #FFFFFF;
                    border-radius: 100px;
                    font-size: .32rem;
                    color: #FFFFFF;
                    line-height:.706667rem;
                    text-align: center;
                }
            }
            .express{
                background:#fff;
                margin-bottom:0.266667rem;
                padding-bottom: 0.213333rem;
                padding-left:0.533333rem;
                .imgs{
                    height:0.666667rem;
                    width:0.666667rem;
                    margin: 0.533333rem 0.4rem 0 0;
                    background-size:100% 100%!important; 
                }
                .content{
                    .name{
                        font-size:0.373333rem;
                        line-height:0.533333rem;
                        color: #494743;
                        padding:0.32rem 0 0.106667rem;
                    }
                    .num{
                        line-height:0.4rem;
                        color:#808080;
                    }
                }
                .shipments{
                    height:1.706667rem;
                    position: relative; 
                    .imgs{
                        background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/beihuo.png) no-repeat;
                    }
                }
                .address{
                    .imgs{
                        background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/dizhi.png) no-repeat;
                    }
                    .content{
                        .userData{
                            width:8.266667rem;
                            // padding-bottom:0.16rem;
                            .phone{
                                color:#808080;
                                padding-right: 0.48rem;
                            }
                        }
                        .addDetail{
                            font-size:0.32rem;
                            line-height:0.506667rem;
                            color:#808080;
                            width:8rem;
                            text-align: justify;
                        }
                        .tips{
                            font-size:0.293333rem;
                            line-height:0.4rem;
                            padding:0.346667rem 0 0.133333rem;
                            color:#808080;
                        }
                        .fillIn{
                            font-size:0.346667rem;
                            line-height:0.506667rem;
                            color:#608DFF;
                        }
                    }
                    .nullCon{
                        width:8.0rem;
                        background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/signIn/back.png) no-repeat 7.64rem 0.6rem;
                        background-size: 0.4rem 0.4rem;
                    }
                }
            }
            .commodity{
                background:#fff;
                padding:0 0.533333rem 0.533333rem;
                .title{
                    line-height:1.2rem;
                    border-bottom: .013333rem solid #E5E5E5;
                    margin-bottom: .533333rem;
                    .type{
                        font-size:0.4rem;
                    }
                    .time{
                        font-size:0.346667rem;
                        color:#808080;
                    }
                }
                .content{
                    position: relative;
                    .goodImg{
                        height:2.4rem;
                        width:2.4rem;
                        margin-right: 0.4rem;
                    }
                    .text{
                        width:6.1rem;
                        .name{
                            font-size:0.373333rem;
                            line-height:0.5rem;
                            text-align:justify;
                        }
                        .tips{
                            display:inline-block;
                            height:.4rem;
                            line-height: .35rem;
                            width: .866667rem;
                            text-align: center;
                            background: rgba(255,170,50,0.20);
                            border-radius: .026667rem;
                            margin-right: .106667rem;
                            font-size:.293333rem;
                            color: #FFAA32;
                            border:.013333rem solid #FFAA32;
                            vertical-align: baseline;
                        }
                    }
                    .price{
                        .text-old {
                            color: #808080 !important;
                            font-size: .346667rem;
                            line-height: .4rem;
                            margin-top: .133333rem;
                            .old-int{
                                font-family: DIN-Regular;
                                color:#808080;   
                                span {
                                    color:#808080;   
                                    font-size: .266667rem;
                                    margin: 0 .2rem 0 .066667rem;
                                }
                            }
                             .money{
                                padding-top:0.08rem;
                                text-decoration:line-through;
                                color:#808080;
                                line-height:0.346667rem;
                                font-size: .293333rem;
                            }
                        }
                        .integral{
                            font-size:0.426667rem;
                            line-height:.64rem;
                            margin-top:.053333rem;
                            font-size: .32rem;
                            overflow: hidden;
                            span:nth-of-type(1) {
                                font-family: DIN-Medium;
                                height: .64rem;
                                font-size: .533333rem;
                                color: #FF5B4C;
                                line-height: .64rem;
                            }
                            span:nth-of-type(2) {
                                color:#808080;   
                            }
                            span:nth-of-type(3) {
                                display: inline-block;
                                padding: 0 .133333rem;
                                height: .356667rem;
                                line-height: .356667rem;
                                margin-left: .066667rem;
                                font-size: .293333rem;
                                color: #fff;
                                text-align: center;
                                background: #FF5B4C;
                                border-radius: .026667rem;
                            }
                            .price-through {
                                text-decoration: line-through;
                                font-size: .293333rem;
                                color: #808080;
                                line-height: .293333rem;
                            }
                        }
                    }
                }
                .packet{
                    .expire-time {
                        font-size: .266667rem;
                        color: #808080;
                        line-height: .373333rem;
                        font-family: PingFangSC-Regular;
                    }
                    .recome-time {
                        position: absolute;
                        font-size: .266667rem;
                        margin-top: .266667rem;
                        color: #FFFFFF;
                        margin: 1.066667rem 0 0 0.25rem;
                    }
                    .ins-discount {
                        color: #808080;
                        text-align: center;
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
                    .ticket{
                        background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/quan.png) no-repeat;
                        background-size:100% 100%;
                        height:2.186667rem;
                        width:7.36rem;
                        margin:0 auto;
                        text-align:center;
                        .ic_3 {
                            line-height: .933333rem;
                        }
                        .num{
                            height:2.186667rem;
                            width:4.5rem;
                            padding: .4rem 0rem .36rem .2rem;
                            font-size:0.666667rem;
                            font-family: DIN-Bold;
                            text-align: left;
                            span{
                                font-size:0.44rem;
                                font-weight:600;
                            }
                        }
                        .type{
                            width:2.86rem;
                            line-height:2.186667rem;
                            font-size:0.48rem;
                            color:#fff;
                        }
                    }
                    .ticket.crad{
                        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/patchCardLong.png);
                        background-size:100% 100%;
                    }
                    .vip{
                        height:2.986667rem;
                        width:5.6rem;
                        // background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/aiqiyi.png) no-repeat;
                        background-size: 100% 100%!important;
                        margin: 0 auto;
                    }
                    .name{
                        font-size:0.4rem;
                        line-height: 0.4rem;
                        font-family:DIN-Light;
                        text-align:center;
                        padding:0.4rem 0 0.186667rem 0;
                    }
                    .time{
                        font-size:0.32rem;
                        line-height:0.32rem;
                        text-align:center;
                        color:#808080;
                        i{
                            font-size:0.4rem;
                            color:#333;
                        }
                    }
                    .money{
                        i{
                            font-size:0.426667rem;
                        }
                        span{
                            text-decoration:line-through;
                            margin-left:0.266667rem;
                        }
                    }
                }
            }
        }
        .bottomText{
            width:100%;
            position: fixed;
            bottom: 0;
            left:0;
            text-align:center;
            padding-bottom:0.8rem;
            .text{
                font-size:0.293333rem;
                color:#8e8e8e;
                line-height:0.4rem;
                padding-bottom: 0.133333rem;
            }
            .kefu{
                color: #508CEE;
                img{
                    height:0.32rem;
                    line-height:0.32rem;
                    display:inline-block;
                    margin-top: -0.026667rem;
                    margin-right: 0.213333rem;
                }
            }
        }
    }
</style>

<style lang="scss">
    #awardDetails{
        .content1{
            .text{
                span{
                    color:#151515;
                }
                em{
                    background:#808080;
                    color:#fff;
                    display:inline-block;
                    height:0.346667rem;
                    line-height:0.346667rem;
                    padding:0 0.106667rem;
                    font-size:0.266667rem;
                }
            }
        }
    }
</style>