<template>
	<div id="share">
		<!-- <div v-title>{{videoTitle}}</div> -->
		<div class="video">
		    <video ref="myVideo" @click="pause" :src="p2pKnowledge.appVideo" @play="isPause" @pause="Vplay = true" :poster="p2pKnowledge.picPath">
		    Your browser does not support the video tag.
		    </video>
		    <div v-if="Vplay" class="play" @click="play"></div>
		    <div class="video_title" :class="{playFont: !Vplay}">{{p2pKnowledge.title}}</div>
		    <div class="video_time" :class="{playFont: !Vplay}">{{p2pKnowledge.addTime ? p2pKnowledge.addTime:'0' | divisionTime}}</div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp.js';   // 与app交互
	export default {
		data() {
			return {
				vedioId:'',//视频Id
				p2pKnowledge:{},
				Vplay:true,
				No:true,
				videoTitle:''
			}
		},
		methods:{
			play(){
			    this.$refs.myVideo.play()
			    this.Vplay = false
			},
			pause(){
			    this.$refs.myVideo.pause()
			    this.Vplay = true
			},
			isPause(){    // 适配三星手机
			    if(this.No){
			        // this.No = false
			        // this.pause()
			        this.Vplay = false
			    } 
			},
            postFun(){    // nid参数  返回条数
                this.notLogPost('/index/getOneArticle',(data) =>{
					if(data.resCode){
                        this.p2pKnowledge = data.resData.data.nowArticle
                        this.videoTitle = data.resData.data.nowArticle.title
					}
				},(this.osType ? {oauthToken:this.token, nid: 'p2pKnowledge',id:this.$route.query.vedioId}:{nid: 'p2pKnowledge',id:this.$route.query.vedioId}),1)
            }
		},
		created(){
			this.postFun();

		},
		mounted(){},
	}
</script>
<style lang="scss" scoped>
	#share{
		position: fixed;
		padding-top: 4.8rem;
	    background: #000!important;
	    height: 100%;
	    width: 100%;
		.video{
		    width: 100%;
	        height: 6.773333rem;
	        position: relative;
	        margin-bottom: 0.266667rem;
		    video{
		        width: 100%;
		        height: 5.6rem;		            
		    }
		    .video_title{
		        width: 100%;
	            height: 1.866667rem;
	            padding: 0.213333rem 0.4rem;
	            position: absolute;
	            top: 0;
	            left: 0;
	            font-family: PingFangSC-Medium;
	            font-size: 0.453333rem;
	            color: #FFFFFF;
	            text-align: justify;
	            line-height: .6rem;
	            letter-spacing: .021333rem;
	            background-image: linear-gradient(-180deg, #333333 0%, rgba(0,0,0,0.00) 100%);
	            display:-webkit-box; 
	            -webkit-box-orient:vertical;
	            -webkit-line-clamp:2; 
	            z-index: 2;
	            opacity: 1;
	            -webkit-transition: opacity 1s ease-in;
	            -moz-transition: opacity 1s ease-in;
	            -ms-transition: opacity 1s ease-in;
	            transition: opacity 1s ease-in;
		    }
		    .video_time{
		        width: 2.08rem;
	            height: 0.506667rem;
	            border-radius: 0.253333rem;
	            text-align: center;
	            line-height: 0.506667rem;
	            position: absolute;
	            top: 4.84rem;
	            right: 0.4rem;
	            color: #fff;
	            font-family: PingFangSC-Regular;
	            font-size: 0.293333rem;
	            letter-spacing: .0032rem;
	            z-index: 2;
	            opacity: 1;
	            background:rgba(0,0,0,.6);
	            -webkit-transition: opacity 1s ease-in;
	            -moz-transition: opacity 1s ease-in;
	            -ms-transition: opacity 1s ease-in;
	            transition: opacity 1s ease-in;
		    }
		    .playFont{
		        opacity: 0;
		    }
		    .play{
		        position: absolute;
	            width: 100%;
	            height: 5.6rem;
	            top: 0;
	            left: 0;
	            z-index: 9;
	            background: url(https://aliyunsso.edspay.com/web/riskEducation/vedio_pause_btn.png) no-repeat center center / 1.093333rem 1.093333rem;
		    }
		    // .play.playBck{
		    // 	background: url(https://aliyunsso.edspay.com/web/riskEducation/vedio_pause_btn.png) no-repeat center center / 1.093333rem 1.093333rem;
		    // }
		}
	}
</style>