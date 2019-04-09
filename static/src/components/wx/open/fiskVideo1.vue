<template>
   <div id="riskVideo1">
       <div v-title>E友课堂第三期《问题平台频出，P2P网贷何去何从》</div>
       <div class="video">
            <video ref="myVideo" @click="pause" :src="videoUrl" @play="isPause" @pause="Vplay = true" :poster="picPath">
            Your browser does not support the video tag.
            </video>
            <div v-if="Vplay" class="play" @click="play"></div>
        </div>
   </div>
</template>

<script>
    import wxShare from '../../../common/wx/wxShare.js';
    export default {
        mixins:[ wxShare ],
        data() {
            return {
                Vplay: true,
                videoUrl: 'https://aliyunsso.edspay.com/images/video/1000000303096575AAE%E5%8F%8B%E8%AF%BE%E5%A0%82264%20%20%E4%B8%AD%E7%AD%89%E6%AF%94%E7%89%B9%E7%8E%87AA.mp4',
                picPath: 'https://aliyunsso.edspay.com/web/threeVideo.jpg',
                No: true,
                shareObj: { //分享标题内容配置
					title: "E友课堂第三期《问题平台频出，P2P网贷何去何从》", //标题
				    desc: "E都市钱包创始人吴宇青为你解答", // 内容
					link: global.host + "risk/fiskVideoTwo", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/wuBoss.png" //图片链接
                }
            }
        },
        methods: {
             isPause(){    // 适配三星手机
                if(this.No){
                    this.Vplay = false
                } 
            },
            play(){
                this.$refs.myVideo.play()
                this.Vplay = false
            },
            pause(){
                this.$refs.myVideo.pause()
                this.Vplay = true
            },
        },
        created: function() {
            
        },
        mounted: function() {
            this.getWxShareData(this.shareObj); //分享调用
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #riskVideo1{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: #000;
        .video{
            width: 100%;
            height: 5.64rem;
            position: absolute;
            top: 0;
            bottom: 0;
            margin: auto 0;
            video{
                width: 100%;
                height: 100%;
            }
            .playFont{
                opacity: 0;
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
