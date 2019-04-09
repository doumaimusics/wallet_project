<template>
    <div class="school-detail" :style="fullHeight">
        <div class="detail-top">
            <span>{{info.inviteNum}}</span>
            <span>{{info.teemBeginsNumMoney  | moneyFormat}}</span>
        </div>
        <!-- 表格 -->
        <div class="detail-table" ref="table">
            <div class="detail-btn" @click="goInvite" v-if="info.ModelListStatus==0"></div>
            <ul>
                <li v-for="item in info.userInviteModelList">
                    <span>{{item.userPhone}}</span>
                    <span>{{item.inviteTimeStr }}</span>
                    <span>{{item.nineTyMoneySum | moneyFormat}}元</span>
                    <span>{{item.awardMoney | moneyFormat}}元</span>
                </li>
            </ul>
        </div>
        <!-- 微信分享遮罩层 -->
        <div class="share-mask" :style="fullHeight" v-if="isShare">
            <div class="share-div">
                <div class="share-btn" @click="isShare=false"></div>
            </div>
        </div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
import wxShare from '../../../../common/wx/wxShare';
import { MessageBox } from 'mint-ui';
export default {
     mixins: [wxShare,wxToapp],
    data () {
        return {
            isShare:false,
            fullHeight:{
                height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
            },
            shareObj: {
                title: "又到九月开学季，赚钱养娃不容易", 
                desc: "暑假过完了，寒假还会远么？各类红包已备好，现金立返加冲榜，连邀友都有钱赚哦。",
                link: global.host+"school/appShare", 
                imgUrl: "https://aliyunsso.edspay.com/web/icon.png"
            },
            info:{
                inviteNum:0,
                teemBeginsNumMoney:0
            },
            isOver:false,
        }
    },
    methods: {
        getInfo () {
            this.getAppData('/activity/tremBegins/xfwcIndexDetails',(data) => {
                if(data.resCode == 1){
                    this.info = data.resData
                    if (data.resData.ModelListStatus) {
                        this.$refs.table.style.backgroundImage = "url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ckxq-bg.png)"
                    } else {
                        this.$refs.table.style.backgroundImage = "url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ckxq-kong.png)"
                    }
                }
            },{},)
        },
        // 去邀请
        goInvite () {
            if (this.isOver) {
                MessageBox('温馨提示', '该活动已结束！');
                return
            }
             if (this.osType) {
                this.PassValue(this.appShare);
            }else {
                this.isShare=true;
            }
        }
    },
    created () {
        this.getInfo()
        this.$route.query.isOver ? this.isOver = true : this.isOver = false
    },
    mounted () {
        this.getWxShareData(this.shareObj);
    }
}
</script>
<style lang="scss" scoped>
    .school-detail {
        width:100%;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/rule-bg.png);
        background-size:cover;
        position: relative;
        .detail-top {
            width: 9.52rem;
            height: 2.986667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ckxq_tou.png);
            background-size:9.52rem 2.986667rem;
            position: absolute;
            top: .746667rem;
            left: .24rem;
            span {
                display: inline-block;
                width: 49%;
                font-family: DIN-Bold;
                font-size: .56rem;
                color: #333333;
                text-align: center;
                margin-top: .746667rem;
            }
        }
        .detail-table {
            width: 9.52rem;
            height: 9.653333rem;
            // background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ckxq-bg.png);
            // background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ckxq-kong.png);
            background-size:9.52rem  9.653333rem;
            position: absolute;
            top: 4rem;
            left: .24rem;
            .detail-btn {
                 position: absolute;
                width: 5.2rem;
                height: 1.44rem;
                top: 5.986667rem;
                left: 2.16rem;
            }
            ul{
                font-size: .293333rem;
                color: #666666;
                margin: 1.6rem .36667rem 0 .356667rem;
                height: 7.8rem;
                overflow-y: scroll;
                li {
                    line-height: .6rem;
                    margin-bottom: .266667rem;
                    span {
                        display: inline-block;
                        text-align: center;
                    }
                    span:nth-of-type(1) {
                        width: 2rem;
                    }
                    span:nth-of-type(2) {
                        width:2.3rem;
                    }
                    span:nth-of-type(3) {
                        width: 2.333333rem;
                    }
                    span:nth-of-type(4) {
                        width: 1.6rem;
                    }
                }
            }
        }
        .share-mask {
            opacity: 0.6;
            background: #000000;
            z-index: 1000;
            position: fixed;
            top: 0px;
            width: 100%;
            .share-div {
                width: 100%;
                height: 4.266667rem;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/fxyd.png') no-repeat;
                background-size: 100%;
                overflow: hidden;
            }
            .share-btn {
                width: 2.613333rem;
                height: 1.093333rem;
                margin: 2.933333rem auto 0 auto;
            }
        }
    }
</style>
