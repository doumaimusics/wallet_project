<template>
    <div class="mid-pc">
        <div class="mid-btn" @click="goInvest"></div>
        <!-- 活动结束弹框 -->
        <div v-layer v-if="isOpenEnd">
            <div class="mid-end">
                <div class="endBtn" @click="isOpenEnd=false"></div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return{
            isOpenEnd:false,
            isEnd:false,
        }
    },
    methods: {
        getTime() {
            global.http._post(this, "/activity/two/getActivityTime", {
                activityId:'con_zq_activity'
            }, data => {
                if (data.data.resCode == 1) {
                    if (data.data.resData.active == 3) {
                        this.isOpenEnd = true
                        this.isEnd = true
                    }
                }
            })
        },
        // 去出借
        goInvest () {
            if (this.isEnd) {
                this.isOpenEnd = true
            } else {
                this.$router.push('/invest')
            }
        }
    },
    created () {
        this.getTime()
    }
}
</script>
<style lang="scss" scoped>
    .mid-pc{
        width: 1200px;
        height: 3342px;
        margin: 0 auto;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/zqFestival/pc.png);
        overflow: hidden;
        .mid-btn {
            display: block;
            width:388px;
            height: 70px;
            margin: 3201px auto 0 auto;
        }
        .mid-end {
             position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            width: 302px;
            height: 230px;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/zqFestival/pcEnd.png) no-repeat;
            background-size: 302px 230px;
            .endBtn {
                width: 210px;
                height: 38px;
                margin: 160px auto;
            }
        }
    }
</style>

