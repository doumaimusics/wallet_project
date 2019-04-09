<template>
    <div class="command-root">
        <div v-title>福袋领取详情</div>
        <!-- 头部 -->
        <div class="command-top">
            <div class="command-duce">
                <!-- 商品图片 -->
                <img v-if="info.type == -1" class="object" :src="info.picPath" />
                <img v-else-if="info.isFinish == 1&&info.isGet == 0" class="object" src="https://aliyunsso.edspay.com/web/activity/command/fd_kong.png"/>
                <div v-else class="fictitious">
                    <span>{{info.denomination}}<i v-if="info.type == 0">元</i><i v-else-if="info.type == 1">%</i><i  v-else>积分</i></span>
                    <span>{{info.sufName}}</span>
                </div>
                <!-- 商品tip -->
                <p v-if="info.isFinish == 1&&info.isGet == 0" class="out-tip">口令福袋奖励被人抢光了！</p>
                <p v-else-if="info.type == -1 && info.isAddress == 1">请及时在【我的福袋记录-<span @click="appRouter('/command/myRecordDetail',{orderId:info.orderId})">福袋奖励详情</span>】中查看！</p>
                <p v-else-if="info.type == -1 && info.isAddress == 0">请及时在【我的福袋记录-<span @click="appRouter('/command/myRecordDetail',{orderId:info.orderId})">福袋奖励详情</span>】中填写收货地址！</p>
                <p v-else-if="info.type != -1" class="fictitious-tip">福袋奖励已放入账户：{{info.phone}}</p>
            </div>
            <!-- tip -->
            <div class="tip-div">
                <p class="command-tip" v-if="info.isFinish == 1">该福袋共有<span>{{info.totalReward}}</span>个奖励，{{info.useTime}}内被抢光！</p>
                <p class="command-tip" v-else>该福袋共有<span>{{info.totalReward}}</span>个奖励，还剩余<span>{{info.surplusReward}}</span>个奖励未领取！</p>
            </div>
        </div>
        <div class="fic-div"></div>
        <command-list :rewardList="rewardList" :isGet="info.isGet" @refreshInfo="getInfo" :pageNum="pageNum" :pages="pages"></command-list>
    </div>
</template>
<script>
import list from './allList.vue'
import wxToapp from '../../../../common/wx/wxToapp'
export default {
    mixins: [wxToapp],
    data () {
        return {
            info:{},
            rewardList:[],
            status: 0,
            pages:1, // 总页数
            pageNum:1, // 当前页
            // tipText: '10分钟内被抢光！'
        }
    },
    methods: {
        getInfo (now) {
            this.pageNum = now
            this.getAppData('/fudai/fudaiDetail',(data) =>{
                if(data.resCode){
                     this.info = data.resData
                    if (now == 1) {
                        this.rewardList = data.resData.rewardList
                        this.pages = data.resData.rewardList.pages;
                    } else {
                        this.rewardList.list = this.rewardList.list.concat(data.resData.rewardList.list)
                    }
                }
            },{fudaiId:this.$route.query.orderId,pageSize:6,pageNum:now})
        }
    },
    created () {
        this.getInfo(1)
    },
    components: {
        'command-list': list
    }
}
</script>
<style lang="scss" scoped>
    .command-root {
        width: 100%;
        height: 100vh;
        background: #F8F8F8;
        overflow: auto;
        .command-top {
            overflow: hidden;
            height: 6rem;
            width: 100%;
            position: fixed;
            z-index: 999;
        }
        .fic-div {
            height: 6rem;
            width: 100%;
        }
        .command-duce {
            height: 5.12rem;
            text-align: center;
            background: url(https://aliyunsso.edspay.com/web/activity/command/fdlqxq_bg.png) top center no-repeat;
            background-size: cover;
            overflow: hidden;
            img {
                display: block;
            }
            .object {
                width: 2.933333rem;
                height: 2.933333rem;
                margin: .906667rem auto 0 auto;
            }
            .fictitious {
                height:2.16rem;
                width: 6.56rem;
                margin: 1.333333rem auto 0 auto;
                background: url(https://aliyunsso.edspay.com/web/activity/command/xuni_bg.png) top center no-repeat;
                background-size: cover;
                span {
                    line-height:2.16rem;
                    display: inline-block;
                    float: left;
                    font-size: .666667rem;
                }
                span:nth-of-type(1) {
                    width:  3.8rem;
                    font-family: DIN-Medium;
                    color: #333;
                    i{
                        font-size: .426667rem;
                        margin-left: .04rem;
                    }
                }
                span:nth-of-type(2) {
                    font-size: .426667rem;
                    width: 2.73rem;
                    color: white;
                }
            }
            p {
                font-size: .32rem;
                color: #FFFFFF;
                margin-top: .233333rem;
                span {
                    color:  #0048FF;
                }
            }
            .fictitious-tip {
                margin-top: .666667rem;
            }
            .out-tip {
                font-size: .48rem;
                color: #FFFFFF;
                margin-top: 0rem;
            }
        }
        .tip-div {
            width:100%;
            padding: .186667rem .4rem;
            background: #F8F8F8;
                .command-tip {
                    font-size: .32rem;
                    color: #666666;
                    letter-spacing: .018667rem;
                    line-height: .44rem;
                span{
                    color: #FF0000;
                }
            }
        }
        
    }
</style>


