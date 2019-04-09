<template>
    <div class="vipUpdate-main">
        <div class="vip-detail">
            <!-- 登录按钮 -->
            <img class="login-btn" v-if="!login" @click="goLogin" src="https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/pcLogin.png"/>
            <!-- 等级表格 -->
            <div class="vip-table" v-else>
                <p>
                    <span>首次出借时间</span>
                    <span>{{info.firstDay ? info.firstDay : 0}}</span>
                </p>
                <p>
                    <span>基础VIP等级</span>
                    <span>{{info.oldVip ? info.oldVip : 0}}</span>
                </p>
                <p>
                    <span>待收本金</span>
                    <span>{{info.money ? info.money : 0}}</span>
                </p>
                <p>
                    <span>当前VIP等级</span>
                    <span>{{info.currentVip ? info.currentVip : 0}}</span>
                </p>
            </div>
        </div>
        <!-- 出借按钮 -->
        <div class="invest-btn" @click="goInvest"></div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            login:false,
            timeStatus:0,
            info: {
                firstDay: 0,
                oldVip:0,
                money:0,
                currentVip:0,
            }
        }
    },
    methods: {
        // 去出借
        goInvest () {
            window._czc.push(["_trackEvent",'vip专属活动','点击立即出借按钮']);
            if (this.login) {
                if (this.timeStatus == 2 || this.timeStatus == 3) {
                     this.checkTime()
                } else {
                    this.$router.push('/invest')
                }
            } else {
                this.$router.push({path:'/login'})
            }
        },
        // 去登陆
        goLogin  () {
            this.$router.push({path:'/login'})
        },
        // 获取信息
        getInfo () {
            global.http.investPost(this, "/vip/getMyVip", {}, data => {
                this.info = data.body.resData
            })
        },
        // 获取活动时间范围
        getTime () {
            global.http.investPost(this,'/activity/two/getActivityTime',{activityId:'vip_zhuli_activity'},(data) => {
                if(data.body.resCode == 1){
                    this.timeStatus = data.body.resData.active
                    this.checkTime()
                }
            },)
        },   
        // 判断活动时间
        checkTime () {
            if (this.timeStatus == 2) {
                this.$alert('该活动尚未开始！', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => { }
                });
            } else if (this.timeStatus == 3) {
                this.$alert('该活动已结束！', '温馨提示', {
                    confirmButtonText: '确定',
                    callback: action => { }
                });
            }
        }
    },
    created () {
        this.getCookie('userName')? this.login = true : this.login = false;
        this.getInfo()
        this.getTime()
    },
    mounted () {
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1275295446&web_id=1275295446'
        script.language = 'JavaScript'
        document.body.appendChild(script)
    },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .vipUpdate-main {
        width: 1200px;
        height: 1913px;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/vipUpdate/pcBg2.png);
        background-size: 1200px 1913px;
        margin: 0 auto;
        position: relative;
        .vip-detail {
            width: 940px;
            height: 114px;
            position: absolute;
            left: 130px;
            top: 641px;
        }
        .vip-table {
            p {
                float: left;
                height: 57px;
                line-height: 57px;
                width: 469px;
                background: #FAF2E0;
                font-size: 20px;
                span:nth-of-type(1) {
                    display: inline-block;
                    width: 210px;
                    color: #5B3E00;
                    padding-left: 40px;
                }
               span:nth-of-type(2) {
                    color: #333333;
                    padding-left: 38px;
                }
            }
            p:nth-of-type(2n) {
                margin-left: 2px;
            }
        }
        .login-btn {
            width: 400px;
            height: 60px;
            margin: 27px 270px;
        }
        .invest-btn {
            width: 700px;
            height: 80px;
            position: absolute;
            bottom: 40px;
            left: 250px;
        }
    }
</style>
