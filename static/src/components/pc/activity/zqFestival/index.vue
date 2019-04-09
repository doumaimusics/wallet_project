<template>
    <div id="zqFestival">
        <div @click="playVideo" class="pageVideo"></div>
        <video-page :showVideo="showVideo" :videoUrl="'https://aliyunsso.edspay.com/images/video/1000001773958779AAzqFestivalAA.mp4'" :videoCover="'https://aliyunsso.edspay.com/web/wx/activity/zqFestival/zqVideoCover.png'" type="video/mp4'" ></video-page>
        <div @click="isOpenTwo = true" class="contentBottom"></div>
        <el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" custom-class="dialogclass" center>
            <div class="erMa"></div>
            <p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
        </el-dialog>
    </div>
</template>

<script>
    import videoPage from '../publicModule/videoPage'; // 播放视频组件
    export default {
        data() {
            return {
                isOpenTwo: false, //  弹框
                showVideo: {
                    showVideo: false
                },
            }
        },
        components:{
            videoPage
        },
        methods: {
            showQRcode(){//显示二维码方法
                this.isOpenTwo = true;
            },
            playVideo(){
                this.showVideo.showVideo = true;
                _czc.push(﻿["_trackEvent", "中秋节活动PC", "PC视频"]); //  友盟统计配置
            }
        },
        created() {

        },
        mounted(){
            // 友盟数据统计
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274750530&web_id=1274750530';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        }
    }
</script>

<style lang="scss" scoped>
    #zqFestival{
        background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/festivalPC.png') no-repeat;
        background-size: 100% 100%;
        height:4025px;
        width:1200px;
        margin:20px auto;
        padding-top: 710px;
        .contentBottom{
            height:2862px;
        }
        .pageVideo{
            height:450px;
            width:800px;
            margin: 0 auto;
        }
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
        .main{
            width: 1200px;
            margin: 0 auto;
            img{
                display: block;
                width: 100%;
                margin:30px 0 40px 0;
            }
        }
        .erMa {
            width: 230px;
            height: 230px;
            margin: 0 auto;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/erweimaxin.png?v=1.1) no-repeat;
            background-size: cover;
            margin-bottom: 20px;
        }

        .inioP {
            text-align: center;
        }
        .el-message-box__content .el-message-box__message p{
            text-align: center;
        }
    }
</style>