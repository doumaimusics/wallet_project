<template>
    <div class="school-div1">
        <!-- 视频点击区域 -->
        <div class="school-click" @click="clickVideo"></div>
        <div v-if="showVideo" v-layer @click.self="closeVideo" class="layerVideo videoClose">
            <div @click="closeVideo" class="close"></div>
    		<div class="video">
    			<video width="100%" autoplay="autoplay" controls="controls" poster="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/poster.jpg" ref="videos" id="vid">
    				<source ref="source" src="https://aliyunsso.edspay.com/images/video/1000000588940953AA开学季app端AA.mp4" type="video/mp4">
    			</video>
    		</div>
    	</div>
        <!-- 动图 -->
        <img class="school-intro" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_yaoqingdongtu.gif"/>
        <div class="school-data">
            <span>{{info.inviteNum}}</span>
            <span>{{info.teemBeginsNumMoney | moneyFormat}}</span>
             <!-- 查看详情 -->
            <div class="school-detail" v-if="login" @click="goDetail">查看详情></div>
            <!-- 登录按钮 -->
            <img class="school-login" v-if="!login" @click="goLogin" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/ljdl.png"/>
        </div>
        <!-- 前往邀请有礼 -->
        <img class="school-span" @click="goInvite" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_yaoqingyouli.gif"/>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
export default {
        mixins: [wxToapp],
        data () {
            return {
                info:{
                    inviteNum:0,
                    teemBeginsNumMoney:0
                },
                showVideo:false,
            }
        },
        props:['login','isOver'],
        methods: {
            getInfo () {
                this.getNotlogData('/activity/tremBegins/xfwcIndex',(data) => {
                    if(data.resCode == 1){
                        this.info = data.resData
                    }
                },{},)
            },
            // 去邀请
            goInvite () {
                window._czc.push(["_trackEvent",'开学季','邀请有礼']);
                this.appRouter('/wxInvitationIndex')
            },
            // 去登陆
            goLogin () {
                 this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
            },
            // 去详情页
            goDetail () {
                this.appRouter('/school/schoolDetail',{isOver:this.isOver})
            },
            // 播放视频
            clickVideo () {
                this.showVideo = true;
                window._czc.push(["_trackEvent",'开学季','视频']);
            },
            closeVideo(){
    			this.showVideo = false;
                this.$refs.videos.pause();
    		},
            // 暂停
            pause  () {
                this.$refs.videos.pause()
            },
        },
        created () {
            this.getInfo()
        }
}
</script>
<style lang="scss" scoped>
     .school-div1 {
        width:100%;
        height:23.6rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_bg.png);
        background-size:100% 23.6rem;
        position: relative;
        .school-data {
            position: absolute;
            width: 7.733333rem;
            height: 2.133333rem;
            top: 8.706667rem;
            left:1.106667rem;
            span {
                display: inline-block;
                width: 49%;
                margin-top: .6rem;
                text-align: center;
                font-family: DIN-Bold;
                font-size: .48rem;
                color: #FFFFFF;
            }
             .school-detail {
                 font-size: .32rem;
                color: #FFE488;
                letter-spacing: 0;
                text-shadow: 0 .013333rem .026667rem rgba(0,0,0,0.57);
                position: absolute;
                width: 1.55rem;
                height: .44rem;
                top: 0;
                right: 0;
            }
            .school-login {
                position: absolute;
                width: 2.666667rem;
                height: .8rem;
                bottom:-0.373333rem;
                left: 2.533333rem;
            }
        }
        .school-click {
            position: absolute;
            width:1.6rem;
            height: 1.6rem;
            left: 4.2rem;
            top: 3.066667rem;
        }
        .school-video {
            width: 7.933333rem;
            height: 4.5rem;
            margin-left: 1.133333rem;
            margin-top: 1.853333rem;
        }
        .school-intro {
            position: absolute;
            width: 8.08rem;
            height: 5.733333rem;
            left: .96rem;
            bottom: 6.533333rem;
        }
        .school-span {
            position: absolute;
            width: 3.466667rem;
            height: .533333rem;
            top: 19.36rem;
            left: 5.28rem;
        }
        .videoClose{
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
        }
    	.layerVideo{
	    	padding-top:4.8rem;
	    	background:rgba(0,0,0,1)!important;
    		.video{
	    		video{
	    			height:5.626667rem;
	    		}
    		}
    	}
    }
</style>

