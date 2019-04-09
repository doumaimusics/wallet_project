<template>
    <div class="mid-main">
        <div v-title>中秋加场福利</div>
        <div class="mid-goods">
            <div :class="['btn'+index+' btn']" :style="{'margin-left':index%2==0 ? '1.466667rem':'.573333rem'}" @click="showPop(index)" v-for="index in 8"></div>
        </div>
        <!-- 规则 -->
        <div class="mid-icon" @click="isRule=true"></div>
        <!-- 规则弹框 -->
        <div v-layer v-if="isRule">
            <div class="mid-tule">
                <div class="rule-main">
                    <p><i>1.</i>本活动福利可与平台其他活动福利叠加</p>
                    <p><i>2.</i>活动结束后15个工作日内由客户经理联系奖品发放</p>
                    <p><i>3.</i>个别商品如iPhone可能出现缺货情况，则视具体情况发货，日期待定</p>
                    <p><i>4.</i>本活动解释权在法律允许范围内归E都市钱包所有，如有疑问请致电客服
                        <a href="tel:400-135-3388">4001353388</a>
                    </p>
                    <p v-if="osType=='IOS'"><i>5.</i>本活动与苹果公司无关</p>
                </div>
                <div class="rule-close" @click="isRule=false"></div>
            </div>
        </div>
        <!-- 活动结束弹框 -->
        <div v-layer v-if="isOpenEnd">
            <div class="mid-end">
                <div class="endBtn" @click="isOpenEnd=false"></div>
            </div>
        </div>
        <!-- 投资框-->
        <midPop :isUp="isUp" :id="id" :isEnd="isEnd" @close="close" @showEnd="isOpenEnd = true"></midPop>
    </div>
</template>
<script>
import midPop from './midPop';
import wxToapp from '../../../../common/wx/wxToapp';
export default {
    mixins:[wxToapp],
    data () {
        return {
            isUp:false,
            isRule:false,
            id:1,
            isOpenEnd:false,
            isEnd:false,
        }
    },
    methods: {
        // 弹出pop
        showPop (val) {
            this.isUp = true
            this.id = val - 1
        },
        // 关闭pop
        close () {
            this.isUp = false
        },
        // 判断活动时间
        getTime () {
            this.notLogPost('/activity/two/getActivityTime',(data) =>{
                if(data.resCode == 1){
                    if (data.resData.active == 3) {
                        this.isOpenEnd = true
                        this.isEnd = true
                    }
                }
            },{activityId:'con_zq_activity'})
        },
        // 友盟数据统计
        init(id) {
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=' + id + '&web_id=' + id
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
    },
    created () {
        this.getTime()
    },
    mounted(){
        this.init(1274856930)
    },
    watch:{
        '$route' () {
            if(window._czc) { // 友盟数据统计监听
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        }
    },
    components: {
        midPop
    }
}
</script>
<style lang="scss" scoped>
    .mid-main {
        width: 100%;
        height: 38.8rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/zqFestival/main.png) no-repeat;
        background-size: 100% 38.8rem;
        .mid-goods {
            position: absolute;
            top: 12.753333rem;
            left: 1.106667rem;
            width: 7.786667rem;
            height: 23.4rem;
            overflow: hidden;
            .btn {
                width: 2.586667rem;
                height: .64rem;
                margin-top: 5.16rem;
                margin-left: .573333rem;
                float: left;
            }
        }
    }
    .mid-icon {
        position: fixed;
        right: 0;
        top: 4.56rem;
        width: .626667rem;
        height: 1.866667rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/zqFestival/ruleIcon.png) no-repeat;
        background-size: .626667rem 1.866667rem;
    }
    .mid-tule {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 8.133333rem;
        height: 10.253333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/zqFestival/addRule.png) no-repeat;
        background-size: 8.133333rem 10.253333rem;
        .rule-main {
            width: 7.43333rem;
            height: 6.72rem;
            margin: 1.506667rem .44rem 1.206667rem .44rem;
            padding: .666667rem .366667rem;
            p{
                font-size: .346667rem;
                color: #666666;
                margin-bottom: .2rem;
                line-height: 0.5rem;
                i{
                    font-family: DIN-Medium;
                    font-size: .346667rem;
                    color: #BA3300;
                    padding-right: .066667rem;
                }
            }
            a {
                color: #004D88;
            }
        }
        .rule-close {
            width: .8rem;
            height: .9rem;
            margin: 0 auto;
        }
    }
    .mid-end {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 7.44rem;
        height: 5.693333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/zqFestival/end.png) no-repeat;
        background-size: 7.44rem 5.693333rem;
        .endBtn {
            width: 5.173333rem;
            height: .946667rem;
            margin: 3.933333rem 1.133333rem;
        }
    }
</style>

