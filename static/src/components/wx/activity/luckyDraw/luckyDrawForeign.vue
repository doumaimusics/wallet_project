<template>
   <div id="luckyDrawForeign">
       <div class="rules" @click="alert = 3"></div>
       <div class="swiper">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in record"><p>{{item}}</p></swiper-slide>
            </swiper>
       </div>
       <div class="pornter" :style="{transition:transitionStyleValue,transform: transformStyleValue}" @click="tate">
       </div>
       <div class="warp" v-if="alert">
           <div class="alert1" :class="{active:alert==2,active1:alert==3}">
                <div class="head" v-if="alert==1 || alert==2">
                    <h3>中奖啦！</h3>
                    <p>恭喜您获得5元现金红包</p>
                    <p class="text" v-if="alert==1">（现金红包可直接提现，活动期间仅新用户参与）</p>
                    <p class="text" v-if="alert==2">（红包正在等你使用哦）</p>
                </div>
                <div class="head" v-else-if="alert==3" @click="alert = 0">
                    <h3>活动规则</h3>
                    <div class="del" @click="alert = 0"></div>
                </div>
                <div class="from" v-if="alert==1">
                    <div class="phone">
                        <i class="icon phone-icon"></i>
                        <input v-model="mobilePhone" type="text" placeholder="请输入常用手机号">
                    </div>
                    <div class="btn" @click="sendPhone">提交</div>
                </div>
                <div class="from" v-else-if="alert==2">
                    <div class="code input short">
                        <input class="fl" v-model="validCode" type="text" placeholder="请输入图片验证码">
                        <span class="fl"><img @click="change" :src="codeImg" class="valicode_img fr"></span>
                    </div>
                    <div class="message input short">
                        <input class="fl" v-model="code" type="text" placeholder="请输入短信验证码">
                        <span v-if="showBtn" @click="send" class="fl msgBtn">{{btnText}}</span>
                        <span v-else class="fl msgBtn" :class="{active:!showBtn}">{{time}}秒</span>
                    </div>
                    <div class="pwd input">
                        <input class="fl" v-model="pwd" type="password" placeholder="请设置8——16位密码">
                    </div>
                    <div class="gou iconfont"><img src="https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/gou.png" alt=""></div>
                    <p class="xieyi">我已阅读并同意<span id="service_contract" @click="showXY = true">《E都市钱包使用协议》</span></p>
                    <div class="btn" @click="goReg">赶快使用吧</div>
                </div>
                <div class="from" v-else-if="alert==3">
                    <p v-for="(item, index) in text" :class="{stong:index == 2}">{{item}}</p>
                </div>
            </div>
       </div>
       <ui-dialog @close="showXY = false" v-if="showXY"></ui-dialog>
   </div>
</template>            

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import verify from "../../../../common/wx/verification"; //引入表单验证
import getData from "../../../../common/router/getData"; //引入发送请求
import dialog from "../../../public/wx/wxdialog"; //弹出框
import { MessageBox } from 'mint-ui'
export default {
mixins: [getData, verify],
    data() {
        return {
            channel:'',   //  渠道分析
            new:true,
            alert: 0,
            btnText: "获取验证码", //获取验证码文本
            time: 60, //倒计时60秒
            showBtn: true, //显示获取验证码按钮
            mobilePhone: "", //手机号
            isGou: true, //是否勾选协议
            validCode: "",
            code: "", //短信验证码
            pwd: "", //密码
            tokenId: "", //获取验证码时返回，防止重复提交
            showXY: false, //显示协议
            transformStyleValue: "rotate(0deg)",
            transitionStyleValue: "transform 6s cubic-bezier(0.61, 0.04, 0, 0.81)",
            record: [
                "136****8734获得15元红包",
                "158****3928获得50元红包",
                "137****3874获得50元红包",
                "156****6543获得1元现金+10%加息券",
                "198****3099获得50元红包",
                "156****2395获得15元红包",
                "138****7758获得200元红包",
                "186****3987获得80元红包",
                "158****1934获得350元红包",
                "163****9457获得1元现金+10%加息券",
                "163****3745获得15元红包",
                "185****3234获得50元红包",
                "168****3978获得15元红包",
                "182****2987获得15元红包",
                "188****3748获得3元现金+10%加息券",
                "189****3097获得15元红包",
                "180****7845获得15元红包",
                "182****9438获得5元现金",
                "182****3674获得80元红包",
                "187****7823获得3元现金+10%加息券",
                "186****9009获得200元红包",
                "185****3453获得1元现金+10%加息券",
                "187****3098获得200元红包",
                "180****3587获得350元红包"
            ],
            swiperOption: {
                pagination: ".swiper-pagination",
                autoplay: 2000, //可选选项，自动滑动
                direction: "vertical",
                loop: true
            },
            text:['1.活动时间：12月1日-12月15日；','2.每天可进行一次大转盘抽奖，奖励直接发放到账户，现金可提现；','3.奖励使用规则：','1元奖金+10%加息券(加息10天，2月及以上标的可用)','3元奖金+10%加息券(加息10天，2月及以上标的可用)','5元现金（可提现）','1%加息券(无限制)','1.5%加息券(无限制)','15元红包(1月及以上标的单笔满15000元可用)','50元红包(2月及以上标的单笔满27000元可用)','80元红包(3月及以上标的单笔满30000元可用)','200元红包(6月及以上标的单笔满50000元可用)','350元红包(12月标的单笔满70000元可用)','4.出借红包与加息券有效期3天，请及时出借','5.本活动最终解释权归E都市钱包所有。','6.客服电话400-135-3388'],
            times:1   // 活动时间状态0：未开始  1：进行中 2：已结束
        };
    },
    methods: {
        initDate(){
            this.$route.query.channel ? this.channel = this.$route.query.channel : this.channel = '';
            this.notLogPost("/index/getActivitStatus",data => {        // 活动时间验证
                if (data.resCode == 1) {
                    this.times = data.resData.data.activiti
                }
            },{},1);
        },
        tate() {      // 转盘旋转度数
            if(this.times == 2){
                MessageBox('温馨提示', '当前活动已过期');
                return
            }else if(this.times == 0){
                MessageBox('温馨提示', '当前活动未开始');
                return
            }
            if(this.new){
                this.transformStyleValue = "rotate(3654deg)";
                this.transitionStyleValue =
                "transform 6s cubic-bezier(0.61, 0.04, 0, 0.81)";
                setTimeout(() => {
                    $(document).scrollTop(0)
                    this.alert = 1
                }, 6100);
            }else{
                this.toast({text:"当前活动只限新用户"})
            }   
        },
        checkInput() {      //验证手机号
        if (this.isEmpty(this.mobilePhone, "手机号不能为空！", 1)) return false;
        if (this.isFormat(this.mobilePhone, "手机号格式不正确！", "mobileReg", 1))
            return false;
        return true;
        },
        sendPhone() {      //点击验证手机号是否注册
            let _this = this
            let mesg = () => {
                MessageBox.confirm("亲！您已经是老用户了，该奖励留给新人吧。", {
                    cancelButtonText: '取消',
                    confirmButtonText: "打开APP",
                    closeOnClickModal:false
                }).then(action => { //点击打开APP执行的事件
                    window.location.href="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"
                }, action => { //点击重置的按钮
                    _this.alert = 0
                    _this.new = false
                    this.transformStyleValue = "rotate(0deg)";
                    this.transitionStyleValue = "transform 0s cubic-bezier(0.61, 0.04, 0, 0.81)";
                })
            }
            if (this.checkInput()) {
                _this.notLogPost("/app/getIsRegister",data => {        //验证手机号请求
                    if (data.resCode == 1) {
                        if(data.resData.msg == 0){
                            _this.alert = 2
                        }else if(data.resData.msg == 1){
                            mesg()
                        }
                        
                    }
                },{str:_this.mobilePhone},1);
            }
        },
        send(){     //点击获取验证码事件
            var that = this;
            if(this.checkInput()){
                this.notLogPost('/user/getPhoneCode',(data) =>{
                    if(data.resCode==1){
                        this.codeSuc();
                    }
                },{mobilePhone:this.mobilePhone,validCode:this.validCode,tokenId:this.fingerprint,captchaId:this.captchaId},1)
            }
        },
        codeSuc(){     //倒计时
            let that = this;
            this.showBtn = false;
            this.toast({text:'发送成功',position:'top'})
            let timer = window.setInterval(function(){
                if((that.time--) <= 0) {
                    that.time = 60;
                    that.showBtn = true;
                    that.btnText = '重新获取';
                    window.clearInterval(timer);
                    that.change();
                }
            },1000)
        },
        goReg() {     //点击注册事件
            let _this = this
            if (this.isEmpty(this.code, "短信验证码不能为空！", 1)) return false;
            if (this.isEmpty(this.pwd, "请输入8-16位字符，至少一个字母或数字！", 1))
                return false;
            if (this.isFormat(this.pwd, "密码格式不正确！", "passwordReg", 1)) return false;
            this.notLogPost("/user/doRegister",data => {        //发送注册请求
                if (data.resCode == 1) {
                    _this.notLogPost("/app/getRegisterEnvelop",res => {    //发红包请求
                        if (res.resCode == 1) {
                            window.location ="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile";
                        }
                    },{str:_this.mobilePhone},1);
                }
                },{mobilePhone:this.mobilePhone,code: this.code,pwd: this.pwd,tokenId: this.fingerprint,source: 6,channel: this.channel,inviteUserCode: ''},1);
            }
    },
    created: function() {
        this.change();
        this.initDate();
    },
    mounted: function() {
        // 数据统计
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1271212600&web_id=1271212600'
        script.language = 'JavaScript'
        document.body.appendChild(script)
    },
    components: {
        swiper,
        swiperSlide,
        "ui-dialog": dialog
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
    }
};
</script>

<style lang="scss" scoped>
#luckyDrawForeign {
    width: 10rem;
    height: 21.573333rem;
    position: relative;
    top: 0;
    left: 0;
    background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/luckyDrawForeign.png);
    background-size: 100%;
    .rules{
        width: 1.33rem;
        height: 1.33rem;
        position: absolute;
        top: 0;
        left: 7.97rem;
    }
    .swiper {
        position: absolute;
        top: 8.1rem;
        left: 11%;
        border-radius: 0.7rem;
        width: 77%;
        height: 1.35rem;
        line-height: 1.35rem;
        text-align: center;
        .swiper-container {
        height: 1.35rem;
        p {
            height: 1.35rem;
            font-size: .373333rem;
            color: #f8772a;
        }
        }
    }
    .pornter {
        position: absolute;
        top: 13.85rem;
        left: 50%;
        margin-left: -1.506667rem;
        width: 3.013333rem;
        height: 3.013333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/pointer.png);
        background-size: 3.013333rem 3.013333rem;
    }
    .warp {
        position: relative;
        top: 0;
        width: 100%;
        height: 21.573333rem;
        margin: auto;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
        .alert1 {
            width: 7.426667rem;
            height: 5.466667rem;
            position: absolute;
            top: 3rem;
            left: 1.146667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alert1.png);
            background-size: 7.426667rem 5.466667rem;
            .head {
                width: 100%;
                height: 2.24rem;
                padding-top: 0.293333rem;
                text-align: center;
                h3 {
                width: 100%;
                height: 0.6rem;
                font-family: PingFangSC-Semibold;
                font-size: 0.426667rem;
                color: #ffffff;
                letter-spacing: 0;
                line-height: 0.6rem;
                }
                p {
                width: 100%;
                height: 0.613333rem;
                font-family: PingFangSC-Semibold;
                font-size: 0.373333rem;
                color: #ffffff;
                letter-spacing: 0;
                line-height: 0.613333rem;
                }
                p.text {
                height: 0.506667rem;
                font-family: PingFangSC-Regular;
                font-size: 0.293333rem;
                line-height: 0.506667rem;
                }
            }
            .phone {
                width: 100%;
                height: 3.213333rem;
                padding-top: 0.58rem;
                input {
                margin-top: 0rem;
                border: 1px solid #f88936;
                border-radius: 0.066667rem;
                width: 6.133333rem;
                font-size: 0.32rem;
                height: 0.8rem;
                color: #999;
                padding-left: 0.293333rem;
                margin-left: 0.653333rem;
                }
            }
            .btn {
                width: 3.466667rem;
                height: 0.8rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alertBtn.png);
                background-size: 3.466667rem 0.8rem;
                position: absolute;
                top: 4.24rem;
                left: 2rem;
                font-family: PingFangSC-Semibold;
                font-size: 0.426667rem;
                color: #ffffff;
                text-align: center;
                line-height: 0.8rem;
            }
            .input {
                width: 100%;
                height: 0.8rem;
                border-radius: 5px;
                margin-bottom: 0.6rem;
                font-family: PingFangSC-Regular;
                font-size: 0.32rem;
                color: #999999;
            }
            .input.code {
                input {
                width: 3.733333rem;
                height: 0.8rem;
                border: 1px solid #f88936;
                float: left;
                padding-left: 0.266667rem;
                margin-right: 0.266667rem;
                border-radius: 0.066667rem;
                }
                span {
                float: left;
                width: 2.32rem;
                height: 0.773333rem;
                border: 1px solid #d8d8d8;
                img {
                    width: 100%;
                    height: 100%;
                }
                }
            }
            .input.message {
                input {
                width: 3.733333rem;
                height: 0.8rem;
                border: 1px solid #f88936;
                float: left;
                padding-left: 0.266667rem;
                margin-right: 0.266667rem;
                border-radius: 0.066667rem;
                }
                span {
                float: left;
                width: 2.32rem;
                height: 0.773333rem;
                font-family: PingFangSC-Medium;
                font-size: 0.293333rem;
                background: #F88936;
                border-radius: .16rem;
                color:#fff;
                text-align: center;
                line-height: 0.773333rem;
                }
                span.active{
                    background: #fff;
                    border: 1px solid #F88936;
                    font-family: PingFangSC-Medium;
                    font-size: .293333rem;
                    color: #F88936;
                }
            }
            .input.pwd {
                margin-bottom: 16px;
                input {
                width: 100%;
                height: 0.8rem;
                border: 1px solid #f88936;
                float: left;
                padding-left: 0.266667rem;
                margin-right: 0.266667rem;
                border-radius: 0.066667rem;
                }
                span {
                float: left;
                width: 2.32rem;
                height: 0.773333rem;
                border: 1px solid #d8d8d8;
                }
            }
            .gou {
                height: 0.4rem;
                display: inline-block;
                img {
                display: inline-block;
                vertical-align: top;
                height: 100%;
                width: 0.4rem;
                }
            }
            .xieyi {
                display: inline-block;
                height: 0.426667rem;
                font-size: 0.293333rem;
                color: #333;
                vertical-align: top;
                padding-left: 0.066667rem;
                span {
                color: #f88936;
                }
            }
        }
        .alert1.active {
            width: 7.426667rem;
            height: 8.8rem;
            top: 3rem;
            left: 1.293333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alert2.png);
            background-size: 7.426667rem 8.8rem;
            padding: 0 0.533333rem;
            .from {
                padding-top: 0.533333rem;
                .btn {
                top: 7.573333rem;
                }
            }
        }
        .alert1.active1 {
            width: 7.426667rem;
            height: 11.4rem;
            top: 3rem;
            left: 1.293333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/alert_3.png);
            background-size: 7.426667rem 11.4rem;
            padding: 0;
            .head{
                height: 1.226667rem;
            }
            h3{
                font-family: PingFangSC-Semibold;
                font-size: .426667rem;
                color: #FFFFFF;
            }
            .del{
                width: .613333rem;
                height: .613333rem;
                position: absolute;
                top: 0.3rem;
                right: .4rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/luckyDraw/del.png);
                background-size: .613333rem .613333rem;
            }
            .from {
                padding: .293333rem .4rem 0 .373333rem;
                p {
                font-family: PingFangSC-Regular;
                font-size: .293333rem;
                color: #333333;
                width: 100%;
                line-height: .4rem;
                margin-bottom:.133333rem;
                letter-spacing: -0.5px;
                }
                p.stong{
                    font-family: PingFangSC-Medium;
                }
            }
        }
    }
}
</style>
