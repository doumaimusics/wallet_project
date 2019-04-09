<template>
    <div class="command-root" ref="root" :style="fullHeight">
        <div v-title>输口令 拿豪礼</div>
        <!-- 表单 -->
        <div class="command-center">
            <!-- 我的福袋记录 -->
            <router-link :to="{path:'/command/myRecords'}"  class="to-my"></router-link>
            <div class="command-form">
                <!-- 输入框 -->
                <input class="command-input" v-model="commandText" placeholder="请输入福袋口令"/>
                <!-- 拆福袋按钮 -->
                <div class="command-btn" @click="openConpon"></div>
                <!-- 规则 -->
                <p class="to-rule" @click="isOpen=true"></p>
            </div>
        </div>
        <!-- 口令获取方式 -->
        <!-- <div class="command-bottom"></div> -->
        <!-- 规则弹窗 -->
        <div class="rule-mask" v-if = "isOpen" ></div>
		<div class="rule-div" v-if = "isOpen" >
            <i @click="isOpen=false"></i>
            <a href="tel:400-135-3388"></a>
        </div>
    </div>
</template>
<script>
import wxShare from '../../../../common/wx/wxShare';
import wxToapp from '../../../../common/wx/wxToapp'
import { Toast } from 'mint-ui';
export default {
    mixins: [wxShare,wxToapp],
    data () {
        return{
            commandText:'', // 口令
            isOpen:false, // 是否弹出规则弹窗
            login:false, // 是否登录
            shareObj: {
                title: "输口令，拿豪礼！", 
                desc: "速领，E都市钱包塞了一份大礼给你！",
                link: global.host+"command/commandMain", 
                imgUrl: "https://aliyunsso.edspay.com/web/icon.png"
            },
            fullHeight:{
                height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
            },
            clickInit:0, // 领取按钮防刷
        }
    },
    methods: {
        // 开福袋
        openConpon () {
            if (!this.login) {
                sessionStorage.setItem("commandText", this.commandText);
                this.appRouter('/wxLogin',{thisUrl: this.$route.fullPath});
                return
            }
            // 校验是否输入口令
            if (!this.commandText) {
                Toast({ message: '亲！请输入福袋口令！',position: 'center',duration: 1500});
                return
            }
            this.clickInit++ 
            if (this.clickInit == 1) {
                this.getAppData('/fudai/openFudai',(data) =>{
                    if(data.resCode){
                        this.appRouter('/command/allRecord',{status:data.resData.status,orderId:data.resData.fudaiId})
                        this.clickInit = 0
                    } else {
                        this.clickInit = 0
                    }
                },{command:this.commandText.replace(/\s/g, "")})
            } 
        },
    },
    created () {
        this.getCookie('userToken')? this.login = true : this.login = false;
        sessionStorage.getItem("commandText")? this.commandText = sessionStorage.getItem("commandText") : this.commandText = ''
    },
    mounted () {
        this.getWxShareData(this.shareObj);
    },
    beforeRouteEnter (to, from, next) {
        if (from.path != '/wxLogin') {
            sessionStorage.removeItem('commandText')
        }
        next();
    },
}
</script>
<style lang="scss" scoped>
    .command-root {
        width: 100%;
        background: url(https://aliyunsso.edspay.com/web/activity/command/lkfdbg.png) center center no-repeat;
        background-size: cover;
        position: relative;
        overflow: hidden;
        .to-my {
            position: absolute;
            right: 0rem;
            margin: 0 0 0 0;
            width: 2.5rem;
            height: .8rem;
        }
        .command-center {
            width: 9.933333rem;
            height: 14.053333rem;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: url(https://aliyunsso.edspay.com/web/activity/command/klfd.png) no-repeat;
            background-size: cover;
            margin: auto;
        }
        .command-form {
            width: 6.4rem;
            margin: 8.25rem auto 0 auto;
            .command-input {
                width: 6.4rem;
                line-height: 1.066667rem;
                font-size: .4rem;
                color: #666666;
                letter-spacing: .021333rem;
                text-align: center;
            }
            .command-btn {
                width: 6.4rem;
                height: 1.333333rem;
                margin-top: .4rem;
            }
            .to-rule {
                width: 2.4rem;
                height: .493333rem;
                margin: .4rem auto 0 auto;
            }
        }
        .command-bottom {
            width: 8.84rem;
            height: 2.04rem;
            background: url(https://aliyunsso.edspay.com/web/activity/command/hqfs.png)  no-repeat;
            background-size: contain;
            position: absolute;
            bottom: 3.5rem;
            left: .586667rem;
        }
        .rule-mask {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color:#000; 
            filter:alpha(opacity=70); 
            -moz-opacity:0.7; 
            opacity:0.7; 
            z-index: 1;
        }
	.rule-div {
            background: url('https://aliyunsso.edspay.com/web/activity/command/tanchuang2.png') no-repeat;
            background-size: 100%;
            width: 7.733333rem;
            height: 11.88rem;
            position: fixed;
            z-index: 10;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            i {
                display: inline-block;
                width: .966667rem;
                height: .966667rem;
                margin: 11.033333rem 0 0 3.4rem;
            }
            a {
                    display: inline-block;
                    width: 2.813333rem;
                    height: .566667rem;
                    margin: 0 0 1.5rem 0;
            }
        }
    }
</style>


