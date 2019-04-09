<!-- 移动端视频播放 -->
<template>
    <div v-if="showVideo.showVideo" v-layer @click.self="closeVideo" class="layerVideo">
        <div @click="closeVideo" class="close"></div>
        <div class="video">
            <video width="100%" autoplay="autoplay" controls="controls" :poster="videoCover" ref="videos" id="vid">
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
    .layerVideo{
        padding-top:4.8rem;
        background:rgba(0,0,0,1)!important;
        position: relative;
        .close{
            position: absolute;
            right:0.4rem;
            top:0.4rem;
            height:0.773333rem;
            width:0.773333rem;
            background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/closeIcon.png') no-repeat;
            background-size:100% 100%;
        }
        .video{
            video{
                height:5.626667rem;
            }
        }
    }
</style>