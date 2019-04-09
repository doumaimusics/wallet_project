<template>
    <div>
        <div v-title>开学季大狂欢</div>
        <!-- 规则 -->
        <img class="school-rule" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/guize.png" @click="openRule"/>
        <!-- 头部 -->
        <header>
            <!-- 滚动信息 -->
            <div class="scroll-div" v-if="isShowNotice">
                <ul>
                    <li v-for="item in scrollInfo" ref="messageList">{{item}}</li>
                </ul>
            </div>
            <!-- 导航 -->
            <div class="school-item1 school-item" :class="{'item1-active':active=='tab-container1'}" @click="changeTab('tab-container1')"></div>
            <div class="school-item2 school-item" :class="{'item2-active':active=='tab-container2'}" @click="changeTab('tab-container2')"></div>
            <div class="school-item3 school-item" :class="{'item3-active':active=='tab-container3'}" @click="changeTab('tab-container3')"></div>
        </header>
        <!-- 滑动区域 -->
        <div class="school-swiper" v-if="!isOpen" ref="swiper" :class="{'height1':active=='tab-container1','height2':active=='tab-container2','height3':active=='tab-container3'}">
            <ul class="school-list" ref="list" :class="{'schoolDiv1':active=='tab-container1','schoolDiv2':active=='tab-container2','schoolDiv3':active=='tab-container3'}">
                <li>
                    <school-item1 :login="login" :isOver="isOver"></school-item1>
                </li>
                <li>
                    <school-item2 :login="login" :isOver="isOver"></school-item2>
                </li>
                <li>
                    <school-item3 :login="login" :isOver="isOver"></school-item3>
                </li>
            </ul>
            <!-- 邀请按钮 -->
            <img class="school-invite" v-if="!isOpen" @click="goInvite" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ljyq.png"/>
        </div>
        <!-- 垃圾组件，闪屏 -->
        <!-- <mt-tab-container v-model="active" :swipeable="false" v-if="!isOpen">
            <mt-tab-container-item id="tab-container1">
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container2">
            </mt-tab-container-item>
            <mt-tab-container-item id="tab-container3">
            </mt-tab-container-item>
        </mt-tab-container> -->
        <!-- 微信分享遮罩层 -->
        <div class="share-mask" :style="fullHeight" v-if="isShare" @touchmove.prevent>
            <div class="share-div">
                <div class="share-btn" @click="isShare=false"></div>
            </div>
        </div>
        <!-- 规则遮罩层 -->
        <div class="rule-mask" v-if = "isOpen" ></div>
		<div class="rule-div" v-if = "isOpen" >
            <a href="tel:400-135-3388"></a>
            <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
            <i @click="isOpen=false"></i>
        </div>
    </div>
</template>
<script>
import school1 from './school1.vue';
import school2 from './school2.vue';
import school3 from './school3.vue';
import { TabContainer, TabContainerItem } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import wxToapp from '../../../../common/wx/wxToapp';
import wxShare from '../../../../common/wx/wxShare';
export default {
    mixins: [wxShare,wxToapp],
    data (){
        return {
            active: 'tab-container2',
            login: false,
            ifActivityTime:true,
            isOpen:false,
            scrollInfo:[],
            fullHeight:{
                height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
            },
            shareObj: {
                title: "又到九月开学季，赚钱养娃不容易", 
                desc: "暑假过完了，寒假还会远么？各类红包已备好，现金立返加冲榜，连邀友都有钱赚哦。",
                link: global.host+"school/appShare", 
                imgUrl: "https://aliyunsso.edspay.com/web/icon.png"
            },
            isShare:false, //是否展示分享
            isShowNotice:false, // 是否展示公告
            isOver:false // 活动时间结束
        }
    },
    methods: {
        // 判断活动开始结束
        getActivityTime () {
            this.getNotlogData('/activity/JudgeInActivityPeriod',(data) => {
                if(data.resCode == 1){
                    // this.active = data.resData.active
                    if (data.resData.active == 2) {
                        this.ifActivityTime = false
                        MessageBox('温馨提示', '该活动尚未开始！');
                    } else if (data.resData.active == 3) {
                        this.ifActivityTime = false
                        this.isOver = true
                        MessageBox('温馨提示', '该活动已结束！');
                    }
                }
            },{activityNid:'TREM_BEGINS_ID'},)
        },
        // 获取轮播信息
        getScroll () {
            this.getNotlogData('/kxj/getYearList',(data) => {
                if(data.resCode == 1){
                    this.scrollInfo = data.resData.list
                    if (data.resData.list.length ==0) {
                        this.isShowNotice = false
                    } else {
                        this.isShowNotice = true
                        let that  = this
                        $(document).ready(function(){
                            that.timer = window.setInterval(function(){
                                if (that.isShowNotice){
                                    $('.scroll-div').find("ul:first").animate({
                                        marginTop: -that.$refs.messageList[0].offsetHeight + 'px'
                                    },500,function(){
                                        $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
                                    });
                                }else{
                                    clearTimeout(that.timer)
                                }
                            },3000);
                        });
                    }
                }
            },{},)
        },
        // 切换导航
        changeTab (val) {
            window._czc.push(["_trackEvent",'开学季','导航']);
            this.active = val
        },
        // 邀请按钮
        goInvite () {
            if (this.isOver) {
                MessageBox('温馨提示', '该活动已结束！');
                return
            }
            if (this.login) {
                window._czc.push(["_trackEvent",'开学季','分享']);
                if (this.osType) {
                    this.PassValue(this.appShare);
                }else {
                    this.isShare=true;
                }
            } else {
                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
            } 
        },
        // 打开规则弹框
        openRule () {
            this.isOpen = true,
            window.scroll(0, 0);
        },
        // 友盟
        youmeng (id) {
            // 友盟数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id='+id+'&web_id='+id+''
            script.language = 'JavaScript'
            document.body.appendChild(script)
        }
    },
    created () {
        this.getCookie('userToken') || this.userId? this.login = true : this.login = false;
        this.getActivityTime()
        this.getScroll()
    },
    mounted(){
            this.getWxShareData(this.shareObj);
            this.$route.query.ym ? this.youmeng(this.$route.query.ym) : this.youmeng('1274525507')
		},
    destroyed(){
        clearInterval(this.timer)
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
    components: {
        'school-item1':school1,
        'school-item2':school2,
        'school-item3':school3,
    }
}
</script>
<style lang="scss" scoped>
    .school-rule {
        width: 1.12rem;
        height: .946667rem;
        position: fixed;
        top: 1.2rem;
        right: 0;
        z-index: 10;
    }
    .school-swiper {
        position: relative;
        overflow: hidden;
        height: 23.6rem;
        width: 100%;
         .school-list {
            height: 100%;
            width: 30rem;
            position: absolute;
            top: 0;
            left: 0;
            li {
                float: left;
                width: 10rem;
            }
        }
        .schoolDiv1 {
            transition: left .4s;
            left:0rem;
        }
        .schoolDiv2 {
            transition: left .4s;
            left:-10rem;
        }
        .schoolDiv3 {
            transition: left .4s;
            left:-20rem;
        }
    }
     .height1 {
        height: 23.6rem;
    }
    .height2 {
        height:15.653333rem;
    }
    .height3 {
        height:21.973333rem;
    }
    header{
        width: 100%;
        height: 7.866667rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/bg_tou.png);
        background-size: 100% 7.866667rem;
        position: relative;
        .scroll-div {
            position: absolute;
            width: 7.6rem;
            height: .613333rem;
            background: rgba(255,255,255,0.5);
            border-radius: .133333rem;
            top: .533333rem;
            left: 1.2rem;
            padding: .093333rem .213333rem;
            font-size: .32rem;
            color: #333333;
            overflow: hidden;
            li {
                margin-bottom: .066667rem;
            }
        }
        .school-item {
            width: 3.153333rem;
            height: 3.6rem;
            display: inline-block;
            margin-top: 4.133333rem;
        }
        .school-item1 {
            width: 3.333333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_wxz.gif);
            background-size: cover;
        }
        .school-item2 {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/2_wxz.gif);
            background-size: cover;
        }
        .school-item3 {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3_wxz.gif);
            background-size: cover;
        }
        .item1-active {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_xz.gif);
            background-size: cover;
        }
        .item2-active {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/2_xz.gif);
            background-size: cover;
        }
        .item3-active {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3_xz.gif);
            background-size: cover;
        }
    }
    .school-invite {
        position: fixed;
        bottom:0rem;
        width: 100%;
        height: 1.333333rem;
        z-index: 99;
    }
    .rule-mask {
        height: 20.56rem;
        position: absolute;
        top: 0;
        left: 0;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/rule-bg.png') no-repeat;
        background-size: 100%;
        width: 100vw;
         z-index: 102;
    }
	.rule-div {
        background: url('https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ruleDetail.png') no-repeat;
        background-size: 100%;
        width: 9.52rem;
        height: 15.253333rem;
        position: absolute;
        z-index: 103;
        top: .966667rem;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
            a {
                    width: 2.4rem;
                    height: .533333rem;
                    position: absolute;
                    bottom: 1.6rem;
                    right: .693333rem;
            }
            p {
                    font-size: .346667rem;
                    color: #555555;
                    width: 100%;
                    text-align: center;
                    position: absolute;
                    bottom: .786667rem;
            }
            i {
                position: absolute;
                display: inline-block;
                width: .866667rem;
                height: .666667rem;
                top: 0;
                right: 0;
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
</style>
