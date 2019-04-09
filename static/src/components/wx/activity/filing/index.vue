<template>
    <div id="filing">
        <div v-title>备案进程</div>
        <div class="filingBox" :class="[{active: look}]" ref="offsetH">
            <div class="filing">
                <div class="music" :class="[{rotate: isMusic}]" @click="play"></div>
                <div class="car" :class="'car'+stat"></div>
                <div class="start" :class="[{opacity: islick}]"></div>
                <div class="bg1"></div>
                <div class="bg2"></div>
                <div class="bg3"></div>
                <div class="bg4"></div>

                <div class="ICP leftBtn" @click="icpFile"></div>
                <div class="electronicSignature rightBtn" @click="cnzzTrack('电子签章上线按钮', '/filing/electronicSignature')"></div>
                <div class="bankDeposit leftBtn" @click="cnzzTrack('银行存管上线按钮', '/filing/bankDeposit')"></div>
                <div class="commitment rightBtn" @click="cnzzTrack('自查自纠按钮', '/filing/commitment')"></div>
                <div class="filingFile" @click="cnzzTrack('尽调资料清单按钮', '/filing/filingFile')"></div>
                <div class="look" @click="see"></div>
                <div class="share" :class="[{opacity: shareShow}]" @click="toShare"></div>
                <!-- <div class="lamp"></div> -->
            </div>
        </div>
        
        <!-- 遮罩 -->
        <div class="icpImg" v-if="layer1" v-layer @click="layer1 = false">
            <img class="icp" src="https://aliyunsso.edspay.com/web/wx/activity/filing/ICP.png" alt="">
        </div>
        <!--点击分享的-->
        <div v-layer @click.stop="layer2 = false" class="zIndex" v-if="layer2"></div>
		<div  :class="{layer:layer2}" @click.stop="layer2 = false" v-if="layer2"></div>
        <!-- 刚进入时候的音乐 -->
        <audio autoplay="autoplay" ref="audio">  
            <source src="https://aliyunsso.edspay.com/web/wx/activity/filing/whistle.mp3" type="audio/mpeg"> 
            <source src="https://aliyunsso.edspay.com/web/wx/activity/filing/whistle.ogg" type="audio/mpeg"> 
        </audio>
        <!-- 开车以后的音乐 -->
        <audio ref="bgMusic" loop="loop">
            <source src="https://aliyunsso.edspay.com/web/wx/activity/filing/slide.mp3" type="audio/mpeg"> 
            <source src="https://aliyunsso.edspay.com/web/wx/activity/filing/slide.ogg" type="audio/mpeg">
        </audio>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'
    import wxShare from '../../../../common/wx/wxShare'
    export default {
        mixins: [wxToapp, wxShare],
        data() {
            let that = this;
            return {
                isMusic: true,
                islick: false,
                isPlay: false,
                look: false,
                stat: 0,
                speed: 1,
                scrollTop: 0,
                layer1:false,
                layer2:false,
                shareShow: false,
                shareObj: { //分享标题内容配置
					title: "这可能是地表最强的合规之旅！", //标题
				    desc: "坐稳了，老司机要发车了", // 内容
					link: global.host + "filing", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/filing/shareIcon.png" //图片链接
                }
            }
        },
        methods: {
            cnzzTrack(text, path){
                window._czc.push(["_trackEvent", "备案进程", text]); //  友盟统计配置
                this.$router.push({path: path, query:this.$route.query})
            },
            icpFile(){
                window._czc.push(["_trackEvent", "备案进程", "获得ICP经营许可证按钮"]); //  友盟统计配置
                this.layer1 = true;
            },
            toShare(){    //分享事件
                window._czc.push(["_trackEvent", "备案进程", "分享按钮"]); //  友盟统计配置    
                if(this.osType){
                    this.PassValue(this.appShare);
                } else {
                    this.layer2 = true
                }
            },
            see(){
                window._czc.push(["_trackEvent", "备案进程", "点击预览"]); //  友盟统计配置  
                if(this.look){
                    return;
                }
                this.shareShow = true;
                this.look = true;
                let CH = document.documentElement.clientHeight;
                let H = 200000;
                    let timer = window.setInterval(() => {
                        let bgTop = parseInt(sessionStorage.getItem("scrollTop"));
                        if(bgTop < H) {
                            document.body.scrollTop = bgTop + 4;
                            document.documentElement.scrollTop = bgTop + 4;
                        }else{
                            window.clearInterval(timer);
                        }
                    },10)
                    setTimeout(() => {    // 部分手机太卡  不能立马获取改变高度的dome元素高度
                        H = this.$refs.offsetH.offsetHeight - CH;
                    }, 3000);
            },
            play(){
                this.isMusic = !this.isMusic;
                let bgMusic = this.$refs.bgMusic;
                let audio = this.$refs.audio;
                if(this.scrollTop > 100*this.speed){
                    audio.pause();
                    if (bgMusic.paused) {    
                        bgMusic.play();
                    }else{
                        bgMusic.pause();
                    }
                }else{
                    bgMusic.pause();
                    if (audio.paused) {
                        audio.play();
                    }else{
                        audio.pause();
                    }
                }
            },
            handleScroll(){
                let CW = document.documentElement.clientWidth;
                let S = CW/375;  // 兼容不同的屏幕宽度
                this.speed = S;
                this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
                sessionStorage.setItem("scrollTop",this.scrollTop);
                // console.log(this.scrollTop)
                if(this.scrollTop > 100*S){
                    if(this.isMusic && !this.isPlay) {
                        this.isPlay = true;
                        this.$refs.bgMusic.play();
                    }
                    this.$refs.audio.pause()
                    this.islick = true
                    this.look ? this.shareShow = true : '';
                } else{
                    if(this.isMusic && !this.$refs.audio.paused) {
                       this.$refs.audio.play() 
                    }
                    this.$refs.bgMusic.pause()
                    this.islick = false;
                    this.shareShow = false;
                    this.isPlay = false;
                }
                console.log(this.scrollTop)
                console.log(S)
                if(this.scrollTop < 100*S){
                    this.stat = 0
                }else if(this.scrollTop > 99*S  && this.scrollTop < 340*S) {
                    this.stat = 1
                }else if(this.scrollTop > 340*S  && this.scrollTop < 750*S) {
                    this.stat = 2
                }else if(this.scrollTop > 750*S  && this.scrollTop < 1150*S) {
                    this.stat = 3
                }else if(this.scrollTop > 1150*S  && this.scrollTop < 1750*S) {
                    this.stat = 4
                }else if(this.scrollTop > 1750*S  && this.scrollTop < 2250*S) {
                    this.stat = 5
                }else if(this.scrollTop > 2250*S  && this.scrollTop < 2750*S) {
                    this.stat = 6
                }else if(this.scrollTop > 2750*S  && this.scrollTop < 3250*S) {
                    this.stat = 7
                }else if(this.scrollTop > 3250*S  && this.scrollTop < 4050*S) {
                    this.stat = 8
                }else if(this.scrollTop > 4050*S  && this.scrollTop < 5000*S) {
                    this.stat = 9
                }else if(this.scrollTop > 5000*S  && this.scrollTop < 5600*S) {
                    this.stat = 10
                }else if(this.scrollTop > 5600*S  && this.scrollTop < 6300*S) {
                    this.stat = 11
                }else if(this.scrollTop > 6300*S  && this.scrollTop < 7000*S ) {
                    this.stat = 12
                } else if(this.scrollTop > 7000*S && this.scrollTop < 7500*S ){
                    this.stat = 13
                }else if(this.scrollTop > 7500*S){
                    this.stat = 14
                }
            },
        },
        created: function() {
            window.addEventListener('scroll', this.handleScroll)
            let ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipad|ipod/.test(ua)) {
                document.addEventListener('WeixinJSBridgeReady', () => {
                    this.$refs.audio.play();
                    this.$refs.bgMusic.play();
                }, false)
            };
            this.PassValue('NavWhite_备案进程');
            this.getWxShareData(this.shareObj); //分享调用
            parseInt(sessionStorage.getItem("scrollTop")) > 100 ? this.islick = true : this.islick = false;
        },
        mounted: function() { 
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274934338&web_id=1274934338';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        },
        beforeDestroy:function (){
            window.removeEventListener("scroll",this.handleScroll);
            this.$refs.bgMusic.pause();
            this.$refs.audio.pause();
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
        }
   }
</script>

<style lang="scss" scoped>
    #filing{
        width: 100%;
        overflow: hidden;
        .filingBox{
            width: 10rem;
            height: 230rem;
            overflow: hidden;
            .filing{
                position: relative;
                top: 0;
                left: 0;
                width: 10rem;
                height: 266.666667rem;
                background: url(https://aliyunsso.edspay.com/web/approval/wxbg.png);
                background-size: 100% 266.666667rem;
                background-position: 0 0;
                z-index: 1;
                .music{
                    position: fixed;
                    width: 1.066667rem;
                    height: 1.066667rem;
                    right: .5rem;
                    top: .5rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/music.png?v=1.0);
                    background-size: 100%;
                    z-index: 100;
                }
                .music.rotate{
                    animation: myMusic 2.5s linear infinite;
                    -moz-animation: myMusic 2.5s linear infinite; /* Firefox */
                    -webkit-animation: myMusic 2.5s linear infinite; /* Safari and Chrome */
                    -o-animation: myMusic 2.5s linear infinite; /* Opera */
                }
                .share{
                    position: fixed;
                    width: 10rem;
                    height: 2.933333rem;
                    left: 0;
                    bottom: -7rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/share.png?v=1.0);
                    background-size: 100%;
                    z-index: 100;
                    transition: all 2s ease;
                }
                .share.opacity{
                    bottom: 0;
                }
                .car{
                    width: 6.533333rem;
                    height: 4.533333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/car.png);
                    background-size: 200% 100%;
                    background-position: 0 0;
                    position: relative;
                    left: 30%;
                    top: 6rem;
                    z-index: 2;
                }
                .start{
                    width: 10rem;
                    height: 2.933333rem;
                    position: absolute;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/start.png?v=1.0);
                    background-size: 100% 100%;
                    top: 11rem;
                    z-index: 9;
                    opacity: 1;
                    transition: opacity 1s ease;
                }
                .start.opacity{
                    opacity: 0;
                }
                .bg1, .bg2, .bg3, .bg4{
                    position: absolute;
                    z-index: 5;
                    width: 10rem;
                    right: 0;
                    background-size: 100% 100%;
                }
                .bg1{
                    top: 0;
                    width: 9.906667rem;
                    height: 13.28rem;
                    background-image: url(https://aliyunsso.edspay.com/web/wx/activity/filing/bg1.png?v=1.0);
                }
                .bg2{
                    top: 13.72rem;
                    height: 26.4rem;
                    background-image: url(https://aliyunsso.edspay.com/web/wx/activity/filing/bg2.png?v=1.0);
                }
                .bg3{
                    top: 54.013333rem;
                    height: 26.96rem;
                    background-image: url(https://aliyunsso.edspay.com/web/wx/activity/filing/bg3.png?v=1.0);
                }
                .bg4{
                    top: 139.146667rem;
                    height: 48.213333rem;
                    background-image: url(https://aliyunsso.edspay.com/web/wx/activity/filing/bg4.png?v=1.0);
                }
                .look{
                    position: absolute;
                    width: .8rem;
                    height: .8rem;
                    left: 4rem;
                    top: 227.6rem;
                    z-index: 99;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/look.png) no-repeat center center;
                    background-size: .533333rem .533333rem;
                    animation:move 2s linear infinite;
                    -moz-animation:move 2s linear infinite; /* Firefox */
                    -webkit-animation:move 2s linear infinite; /* Safari and Chrome */
                    -o-animation:move 2s linear infinite; /* Opera */
                }
                .leftBtn{
                    position: absolute;
                    z-index: 99;
                    width: 2.986667rem;
                    height: 2.826667rem;
                    background-image: url(https://aliyunsso.edspay.com/web/wx/activity/filing/leftBtn.gif);
                    background-size: 100% 100%;
                }
                .rightBtn{
                    position: absolute;
                    z-index: 99;
                    width: 2.986667rem;
                    height: 2.826667rem;
                    background-image: url(https://aliyunsso.edspay.com/web/wx/activity/filing/rightBtn.gif);
                    background-size: 100% 100%;
                }
                .ICP{
                    top: 19.973333rem;
                    left: 4.36rem;
                }
                .electronicSignature{
                    top: 36.33333rem;
                    right: 0;
                }
                .bankDeposit{
                    top: 47.3rem;
                    left: 3.8rem;
                }
                .commitment{
                    top: 87.306667rem;
                    left: .333333rem;
                }
                .filingFile{
                    position: absolute;
                    z-index: 99;
                    width: 4.986667rem;
                    height: 3.733333rem;
                    top: 150.3rem;
                    left: 2.746667rem;
                    background-image: url(https://aliyunsso.edspay.com/web/wx/activity/filing/filingFile.gif?v=1.0);
                    background-size: 100% 100%;
                }
            }
        }
        .filingBox.active{
            height: 266.666667rem;
        }
        .icpImg .icp{
            width: 100%;
            height: 14.306667rem;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        .icpImg .certific{
            width: 100%;
            height: 6.173333rem;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        .lamp{
            width: 2.4rem;
            height: 3.866667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/lamp.gif?v=1.0) no-repeat;
            background-size: 100%;
            position: absolute;
            top: 21.5rem;
            left: -.7rem;
            z-index: 100;
        }
        .layer {
            width: 10rem;
            height: 4rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/shareLayer.png?v=1.0) no-repeat;
            background-size: cover;
            z-index: 102;
            position: fixed;
            top:0;left: 0;
        }
        .zIndex{
            z-index: 100 !important;
        }
    }
</style>
<style>
 @import '../../../../style/filing.css';
</style>