<template>
    <div id="thanksgiving" :style="fullHeight">
        <div v-title>感恩有礼</div>
        <div class="main" :class="[{active: state == 1 || state == 3}]">
            <!-- 滚动信息 -->
            <div class="k_scroll_box">
                <div class="red fl" v-for="(item, index) in 3" :style="{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/red' + item + '.png) no-repeat', backgroundSize: '100% 100%'}">
                    <div class="shadow" v-if="redIndex != index && draw"></div>
                    <div class="shadow1" :class="[{active: complete}]" v-if="redIndex == index && (animation || receive)"></div>
                </div>
            </div>
            <div class="start" @click="start" :class="'state'+btnState"></div>
            <div class="tips" v-if="tipsState"></div>
            <div class="aperture" v-if="animation"></div>
            <div class="Subtitle" v-if="animation"></div>
            <div class="timeOver" v-if="timeOver">
                <div class="close" @click.stop="timeOver = false"></div>
            </div>
            <div class="toinvest" v-if="lend">
                <div class="btn" @click.stop="toinvest"></div>
            </div>
            <!-- 遮罩 -->
		    <div v-if="timeOver" class="zIndex" v-layer @click="timeOver = false"></div>
		    <div v-if="lend" class="zIndex" v-layer @click="lend = false"></div>
            <div class="tel"><a href="tel:400-135-3388"></a></div>
        </div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    export default{
        mixins:[ wxShare ],
        data() {
            return {
                receive: false,
                lend: false, 
                draw: false,
                timeOver: false,
                complete: false,   // 抽奖完成状态
                animation: false,
                repeat: true,   // 防止重复提交
                redIndex: 0,
                btnState: 1,  // 按钮状态 1:未开始 2:领取 3:去使用
                time: true,   // 预热为false  当天为true;
                tipsState: false,
                loginStatus: false, // 0未登录，1已登录
                state: 1,        // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                timer: null,
                shareObj: { //分享标题内容配置
					title: "感恩有礼", //标题
				    desc: "E都市钱包邀您来领取感恩大礼包", // 内容
					link: global.host + "activity/thanksgiving", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                },
                //  适配iPhoneX 添加的行内样式fullHeight
                fullHeight: {
                  height: document.documentElement.clientHeight+2+"px"  //获取手机可视区域的的高度
                },
            }
        },
        methods: {
            initData(){
                // 获取数据
                this.getNotlogData('/activity/gratitude/initReceiveGift', (data) => {
                    if(data.resCode == 1){
                        this.loginStatus = data.resData.haveLogin;
                        this.state = data.resData.time;
                        if(this.state == 1){    
                            data.resData.receive ? this.btnState = 3 : this.btnState = 2;
                        } else if(this.state == 2) {
                            this.btnState = 1;
                        }else if(this.state == 3) {
                            this.timeOver = true;
                            data.resData.receive ? this.btnState = 3 : this.btnState = 2;
                        };
                        if(data.resData.receive){  // 如果已经领取
                            this.redIndex = this.matching(data.resData.redList, data.resData.haveRed);
                            this.draw = true;
                            this.receive = true;
                            this.complete = true;
                        };
                    }
                }, {},1)
            },
            matching(arr, item){   // 匹配数组中元素的位置 用于抽奖ID匹配；
                let n;
                arr.map((v, i) => {
                    if(v == item){
                        n = i;
                    }
                });
                return n;
            },          
            start(){
                if(!this.loginStatus){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                    return;
                };
                if(this.btnState == 1){
                    this.tipsState = true;
                    setTimeout(() => {
                        this.tipsState = false;
                    }, 3000);
                    return;
                } else if(this.btnState == 3){
                    this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
                    return;
                };
                if(this.state == 3){
                    this.timeOver = true;
                    return; 
                }
                if(!this.repeat){   // 防止重复提交
                    return;
                }
                this.repeat = false;
                this.getAppData('/activity/gratitude/receiveGift',(data) => {
					if(data.resCode == 1){
                        if(data.resData.redFlag){
                            this.lend = true;
                            this.repeat = true;
                            return;
                        }
                        let No = this.matching(data.resData.redList, data.resData.haveRed);
                        let t = 540;    //540 560 580
                        if(No == 1){
                            t = 560;
                        } else if(No == 2){
                            t = 580;
                        }
                        this.draw = true;
                        this.redIndex = 0;
                        
                        this.timer = setInterval(() => {
                            t-= 20;
                            if (t > 50){
                                this.redIndex += 1;
                                if(this.redIndex > 2){
                                    this.redIndex = 0;
                                }
                            }else{
                                this.animation = true;
                                clearInterval(this.timer);
                                setTimeout(() => {
                                    this.repeat = true;
                                    this.complete = true;
                                    this.btnState = 3;
                                }, 2640);
                            }
                        },180);
					} else {
                        this.repeat = true;
                    }
				},{})
            },
            toinvest(){
                this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
                this.lend = false;
            }
        },
        created: function() {
            this.hasLogin ? this.loginStatus = true : this.loginStatus = false;
            this.PassValue('NavWhite_感恩有礼');
            this.getWxShareData(this.shareObj); //分享调用
            this.initData();
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275257976&web_id=1275257976';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        },
        mounted: function() {

        },
        beforeDestroy() {
			clearInterval(this.timer);
        },
        watch: {
            '$route' () {
				if(window._czc) { // 友盟数据统计监听
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
        }
   }
</script>

<style lang="scss" scoped>
    #thanksgiving{
        width: 10rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/line.png);
        background-size: 100%;
        position: relative;
        .main{
            width: 100%;
            height: 17.786667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/beforeWx.png) no-repeat top left;
            background-size: 100%;
            .k_scroll_box{
                position: absolute;
                height: 3.44rem;
                width: 8.24rem;
                left: 1.053333rem;
                top: 9.84rem;
                .red{
                    width: 2.533333rem;
                    height: 100%;
                    margin-right: .146667rem;
                    border-radius: .213333rem;
                    .shadow{
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.60);
                        border-radius: .213333rem;
                    }
                    .shadow1{
                        width: 100%;
                        height: 100%;
                        background: rgba(255,255,255,0.46);
                        border-radius: .213333rem;
                    }
                    .shadow1.active{
                        width: 100%;
                        height: 100%;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/receive.png) no-repeat .28rem 1.013333rem;
                        background-size: 1.933333rem 1.466667rem;
                        background-color: rgba(255, 255, 255, 0.46);
                        border-radius: .213333rem;
                    }
                }
            }
            .start{
                width: 7.28rem;
                height: 1.133333rem;
                position: absolute;
                top: 14.266667rem;
                left: 1.346667rem;
            }
            .start.state1{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/preheat.png) no-repeat top left;
                background-size: 100%;
            }
            .start.state2{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/receiveBtn.png) no-repeat top left;
                background-size: 100%;
            }
            .start.state3{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/usedBtn.png) no-repeat top left;
                background-size: 100%;
            }
            .tips{
                width: 2.4rem;
                height: .733333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/tips.png) no-repeat top left;
                background-size: 100%;
                position: absolute;
                left: 3.8rem;
                top: 15.466667rem;
            } 
            .aperture{
                width: 6.333333rem;
                height: 6.333333rem;
                position: absolute;
                left: 1.826667rem;
                top: 8.186667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/aperture.png) no-repeat top left;
                background-size: 100%;
                z-index: 99;
                -webkit-transform: scale(0, 0);
                transform: scale(0, 0);
                animation: myAperture 2.64s linear;
                -webkit-animation: myAperture 2.64s linear;
                
            }
            .Subtitle{
                width: 4.666667rem;
                height: 1.666667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/Subtitle.png) no-repeat top left;
                background-size: 100%;
                position: absolute;
                left: 2.666667rem;
                top: 10.653333rem;
                z-index: 100;
                -webkit-transform:scale(0, 0);
                transform:scale(0, 0);
                animation: mySubtitle 2.64s linear;
                -webkit-animation: mySubtitle 2.64s linear;
            }
            .timeOver{
                width: 7.44rem;
                height: 5.36rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/timeOverWx.png) no-repeat;
                background-size: 100%;
                z-index: 100;
                position: fixed;
                top:0;left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                .close{
                    position: absolute;
                    bottom: 0.3rem;
                    width: 5.5rem;
                    height: 1.3rem;
                    left: 13%;
                }
            }
            .zIndex{
                z-index: 99!important;
            }
            .tel{
                width: 3rem;
                height: .5rem;
                position: absolute;
                left: 1rem;
                top: 17rem;
                a{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
            }
            .toinvest{
                width: 7.44rem;
                height: 5.36rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/investWx.png) no-repeat;
                background-size: 100%;
                z-index: 100;
                position: fixed;
                top:0;left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                .btn{
                    position: absolute;
                    bottom: 0.3rem;
                    width: 5.5rem;
                    height: 1.3rem;
                    left: 13%;
                }
            }
        }
        .main.active{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/beginWx.png) no-repeat top left;
            background-size: 100%;
        }
    }

</style>
<style>
@-webkit-keyframes myAperture {
    0% {
        -webkit-transform: scale(0,0) rotateZ(0deg);
    }
    15% {
        -webkit-transform: scale(0,0) rotateZ(0deg);
    }
    27% {
        -webkit-transform: scale(1,1) rotateZ(0deg);
    }
    30% {
        -webkit-transform: scale(1,1) rotateZ(0deg);
    }
    68% {
        -webkit-transform: scale(1,1) rotateZ(360deg);
    }
    80% {
        -webkit-transform: scale(1,1) rotateZ(360deg);
    }
    100% {
        -webkit-transform: scale(0,0) rotateZ(360deg);
    }
}

@keyframes myAperture {
    0% {
        transform: scale(0,0) rotateZ(0deg);
    }
    15% {
        transform: scale(0,0) rotateZ(0deg);
    }
    27% {
        transform: scale(1,1) rotateZ(0deg);
    }
    30% {
        transform: scale(1,1) rotateZ(0deg);
    }
    68% {
        transform: scale(1,1) rotateZ(360deg);
    }
    80% {
        transform: scale(1,1) rotateZ(360deg);
    }
    100% {
        transform: scale(0,0) rotateZ(360deg);
    }
}

@-webkit-keyframes mySubtitle {
    0% {
        -webkit-transform:scale(0, 0);
    }
    15% {
        -webkit-transform:scale(1, 1);
    }
    80% {
        -webkit-transform:scale(1, 1);
    }
    100% {
        -webkit-transform:scale(0, 0);
    }
}

@keyframes mySubtitle {
    0% {
        transform:scale(0, 0);
    }
    15% {
        transform:scale(1, 1);
    }
    80% {
        transform:scale(1, 1);
    }
    100% {
        transform:scale(0, 0);
    }
}
</style>
