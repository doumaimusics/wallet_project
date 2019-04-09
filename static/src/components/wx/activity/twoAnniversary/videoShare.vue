<template>
   <div id="videoShare" :style="fullHeight">
       <div v-title>E都市钱包两周年宣传片</div>
       <div class="box">
            <video ref="myVideo" @click="pause" src="https://aliyunsso.edspay.com/images/video/1000000545206970AAwxAnniversaryVideoAA.mp4" @play="Vplay = false" @pause="Vplay = true" poster="https://aliyunsso.edspay.com/web/wx/activity/anniversary/firstVideo.png">
            Your browser does not support the video tag.
            </video>
            <div v-if="Vplay" class="play" @click="play"></div>
       </div>
   </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare.js';   // 分享
    export default {
        mixins: [wxShare],
        data() {
            return {
                Vplay: true,
                shareObj: { //分享标题内容配置
					title: "E都市钱包2周年宣传片《不忘初心 不负雄心》", //标题
					desc: "我们从未止步！", //内容
                    link: global.host + "videoShare", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/twoYeay/2yearIcon.png" //图片链接
                },
                fullHeight:{
					minHeight: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
				},
            }
        },
        methods: {
            play(){
                this.$refs.myVideo.play()
                this.Vplay = false
            },
            pause(){
                this.$refs.myVideo.pause()
                this.Vplay = true
            },
            isPause(){    // 适配三星手机
                this.Vplay = false
            },
        },
        created: function() {
            this.getWxShareData(this.shareObj); //分享调用
        },
        mounted: function() {
            document.addEventListener("WeixinJSBridgeReady", () => { 
                document.getElementById('video').play(); 
            }, false); 
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #videoShare{
        width: 100%;
        height: 100%;
        background: #000;
        .box{
            width: 100%;
            height: 5.64rem;
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            margin: auto;
            video{
                width: 100%;
                height: 100%;
            }
            .play{
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                z-index: 9;
                background: url(https://aliyunsso.edspay.com/web/riskEducation/moble_play.png) no-repeat center center / 1.24rem 1.24rem;
            }
        }
    }
</style>
