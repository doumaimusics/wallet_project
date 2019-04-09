<!-- pc视频播放组件 -->
<template>
    <div v-if="showVideo.showVideo" @click.self="closeVideo" class="videoBox">

        <div class="video">
            <div @click="closeVideo" class="close"></div>
            <video autoplay="autoplay" x5-playsinline="" webkit-playsinline="true" webview.allowsInlineMediaPlayback = "YES" :poster="videoCover" playsinline preload="preload" controls="controls" id="vid">
                <source ref="source" :src="videoUrl" type="video/mp4">
            </video>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{

    		}
    	},
    	props:['showVideo','videoUrl','videoCover'],
    	methods:{
            closeVideo(){//关闭视频
                this.showVideo.showVideo = false;
                this.$refs.videos.pause();
            }
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    .videoBox{
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0,0,0,.7);
        z-index: 9999;
        .video{
            height:473px;
            width:842px;
            position: absolute;
            top: 130px;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
        }
        video{
            width:100%;
            height:100%;
        }
        .close{
            position: absolute;
            right:-50px;
            top:0px;
            height:30px;
            width:30px;
            background:url('https://aliyunsso.edspay.com/web/activity/anniversary/closeIcon_pc.png') no-repeat;
            background-size:100% 100%;
        }     
    }
</style>