<template>
    <div id="thanksgivingPc">
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
        </div>
    </div>
</template>

<script>
    export default{
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
                loginStatus: false, // 0未登录，1已登录
                state: 1,        // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                timer: null,
            }
        },
        methods: {
            getData(){
                this.getCookie('token')? this.loginStatus = 1 : this.loginStatus = 0;
                global.http.investPost(this, "/activity/gratitude/initReceiveGift", {}, data => {
                    console.log(data)
                    if (data.data.resCode == 1) {
                        this.loginStatus = data.data.resData.haveLogin;
                        this.state = data.data.resData.time;
                        if(this.state == 1){
                            data.data.resData.receive ? this.btnState = 3 : this.btnState = 2;
                        } else if(this.state == 2) {
                            this.btnState = 1;
                        }else if(this.state == 3) {
                            this.timeOver = true;
                            data.data.resData.receive ? this.btnState = 3 : this.btnState = 2;
                        };
                        if(data.data.resData.receive){  // 如果已经领取
                            this.redIndex = this.matching(data.data.resData.redList, data.data.resData.haveRed);
                            this.draw = true;
                            this.receive = true;
                            this.complete = true;
                        };
                    }
                })
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
                    this.$router.push('/login');
                    return;
                };
                if(this.btnState == 1){
                    return;
                } else if(this.btnState == 3){
                    this.$router.push('/invest');
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
                global.http.post(this, "/activity/gratitude/receiveGift", {}, data => {
                    if(data.body.resCode == 1){
                        let res = data.body;
                        if(res.resData.redFlag){
                            this.lend = true;
                            this.repeat = true;
                            return;
                        }
                        let No = this.matching(res.resData.redList, res.resData.haveRed);
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
                    }else{
                        this.repeat = true;
                    }
                })
            },
            toinvest(){
                this.$router.push('/invest');
                this.lend = false;
            }
        },
        created: function() {
            this.getData();
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275258944&web_id=1275258944';
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
    #thanksgivingPc{
        width: 1200px;
        height: 1375px;
        margin: 30px auto 40px;
        position: relative;
        .main{
            width: 1200px;
            height: 1375px;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/beforePc.png) no-repeat top left;
            background-size: 100%;
            .k_scroll_box{
                position: absolute;
                height: 258px;
                width: 612px;
                left: 304px;
                top: 738px;
                .red{
                    width: 190px;
                    height: 100%;
                    margin-right: 11px;
                    border-radius: 16px;
                    .shadow{
                        width: 100%;
                        height: 100%;
                        background: rgba(0,0,0,0.60);
                        border-radius: 16px;
                    }
                    .shadow1{
                        width: 100%;
                        height: 100%;
                        background: rgba(255,255,255,0.46);
                        border-radius: 16px;
                    }
                    .shadow1.active{
                        width: 100%;
                        height: 100%;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/receive.png) no-repeat 21px 76px;
                        background-size: 145px 110px;
                        background-color: rgba(255, 255, 255, 0.46);
                        border-radius: 16px;
                    }
                }
            }
            .start{
                width: 546px;
                height: 85px;
                position: absolute;
                top: 1070px;
                left: 326px;
            }
            .start.state1{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/preheat.png) no-repeat top left;
                background-size: 100%;
            }
            .start.state2{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/receiveBtn.png) no-repeat top left;
                background-size: 100%;
                cursor: pointer;
            }
            .start.state3{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/usedBtn.png) no-repeat top left;
                background-size: 100%;
                cursor: pointer;
            }
            .aperture{
                width: 475px;
                height: 475px;
                position: absolute;
                left: 362px;
                top: 614px;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/aperture.png) no-repeat top left;
                background-size: 100%;
                z-index: 99;
                -webkit-transform: scale(0, 0);
                transform: scale(0, 0);
                animation: myAperture 2.64s linear;
                -webkit-animation: myAperture 2.64s linear;
                
            }
            .Subtitle{
                width: 350px;
                height: 125px;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/Subtitle.png) no-repeat top left;
                background-size: 100%;
                position: absolute;
                left: 422px;
                top: 791px;
                z-index: 100;
                -webkit-transform:scale(0, 0);
                transform:scale(0, 0);
                animation: mySubtitle 2.64s linear;
                -webkit-animation: mySubtitle 2.64s linear;
            }
            .timeOver{
                width: 400px;
                height: 289px;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/timeOverPc.png) no-repeat;
                background-size: 100%;
                z-index: 100;
                position: fixed;
                top:0;left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                .close{
                    position: absolute;
                    bottom: 10px;
                    width: 280px;
                    height: 80px;
                    left: 15%;
                    cursor: pointer;
                }
            }
            .zIndex{
                z-index: 99!important;
            }
            .toinvest{
                width: 400px;
                height: 289px;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/investPc.png) no-repeat;
                background-size: 100%;
                z-index: 100;
                position: fixed;
                top:0;left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                .btn{
                    position: absolute;
                    bottom: 10px;
                    width: 280px;
                    height: 80px;
                    left: 15%;
                    cursor: pointer;
                }
            }
        }
        .main.active{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgiving/beginPc.png) no-repeat top left;
            background-size: 100%;
        }
    }

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
