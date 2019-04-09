<template>
    <div class="detail-main">
        <div v-title>兑换详情</div>
        <!-- 地址 -->
        <div class="detail-addr" v-if="info.address">
            <img class="fl" src="https://aliyunsso.edspay.com/web/wx/activity/11assist/addrIcon.png"/>
            <div class="detail-info fl">
                <p>
                    收货人：{{info.consigneeName}}
                    <span class="fr">{{info.telPhone}}</span>
                </p>
                <p>{{info.address}}</p>
            </div>
        </div>
        <!-- 物品 -->
        <div class="detail-title">
            <img class="detail-pic fl" :src="info.imgUrl" />
            <p class="fl">{{info.name}}</p>
        </div>
        <!-- 物品描述 -->
        <div class="detail-des">
            <p class="fl">
                兑换时间
                <span class="fr">{{info.exchangeTime}}</span>
            </p>
            <p class="fl">
                兑换方式
                <span class="fr">{{info.exchangeStr}}</span>
            </p>
            <p class="fl">
                发放时间
                <span class="fr">{{info.sendTime}}</span>
            </p>
        </div>
        <!-- 客服 -->
        <div class="detail-kefu" @click="goKefu">
            如有疑问，<span>请联系客服</span><img src="https://aliyunsso.edspay.com/web/wx/activity/11assist/kefuIcon.png"/>
        </div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
export default {
    mixins:[wxToapp],
    data () {
        return {
            info:{}
        }
    },
    methods: {
        getInfo () {
            this.getAppData('/activity/fest/recordDetail',(data) => {
                if(data.resCode == 1){
                    this.info = data.resData.record;
                }
            },{recordId:this.$route.query.itemId})
        },
        // 跳转客服
        goKefu () {
            if(this.osType){
                this.PassValue('Service');
            }else{
                var timeamp = new Date().getTime()
                if(this.getCookie('nickname')){
                    var qiMoName = this.getCookie('nickname') ? this.getCookie('nickname') : "游客"
                    var qiMoId = this.getCookie('userId') ? this.getCookie('userId') : ""
                    window.location.href = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":'+qiMoName +'}&customField={"nickName":'+ qiMoName +'}&clientId='+ qiMoId;
                }else{
                    window.location.href = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":"游客"}&customField={"nickName":"游客"}&clientId='+timeamp;
                }
            }
        }
    },
    created () {
        this.getInfo ()
        this.PassValue('NavWhite_兑换详情');
    }
}
</script>
<style lang="scss" scoped>
    .detail-main {
        .detail-addr {
            height: auto;
            background: white;
            padding: 0 .533333rem;
            overflow: hidden;
            img {
                width: .64rem;
                height: .64rem;
                margin: .6rem 0 0 0;
            }
            .detail-info {
                margin: .4rem 0 .4rem .4rem;
                width: 7.8rem;
                p:nth-of-type(1) {
                    font-size: .373333rem;
                    color: #333333;
                    span {
                        font-size: .373333rem;
                        color: #808080;
                        text-align: right;
                    }
                }
                p:nth-of-type(2) {
                    font-size: .346667rem;
                    color: #808080;
                    margin-top: .226667rem;
                }
            }
        }
        .detail-title {
            width: 100%;
            height: 2.266667rem;
            margin-top: .266667rem;
            background: white;
            .detail-pic {
                width: 1.466667rem;
                height: 1.466667rem;
                margin: .4rem .266667rem .4rem .533333rem;
            }
            p {
                line-height: 2.386667rem;
                font-size: .373333rem;
                color: #333333;
            }
        }
        .detail-des {
                height: 3.04rem;
                background: white;
                padding: 0 .533333rem;
                font-size: .373333rem;
                color: #333333;
                margin-top: .266667rem;
                p{
                    width: 100%;
                    margin-top: .4rem;
                    span{
                        color: #808080;
                    }
                }
        }
        .detail-kefu {
            font-size: .293333rem;
            color: #8E8E8E;
            position:absolute;
            bottom:.8rem;
            left: 3.426667rem;
            span {
                color: #508CEE;
            }
            img {
                display: inline-block;
                width:.32rem;
                height: .253333rem;
                margin: 0 0 .08rem .106667rem;
            }
        }
    }
</style>

