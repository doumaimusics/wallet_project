<!-- E友课堂 -->
<template>
	<div id="class">
		<mt-loadmore v-if="p2pKnowledge.length" class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
		    <div class="knowledge tabs" id="tab1">
		         <div class="video" v-if="p2pKnowledge.length > 0" v-for="(item,index) in p2pKnowledge">
		         	  <!-- @pause="onPlay(index)" -->
		             <video ref="myVideo" @click="pause(index)" :src="item.appVideo" @pause="onPlay(index)" :poster="item.picPath">
		             Your browser does not support the video tag.
		             </video>
		             <div ref="Vplay" class="play playBck" @click="play(item,index)"></div>
		              <!-- :class="{playBck:osType == 'Android'}" -->
		             <div ref="videoTitle" class="video_title">{{item.title}}</div>
		             <div ref="videoTime" class="video_time">{{item.addTime ? item.addTime:'0' | divisionTime}}</div>
		             <div class="share-bottom">
		             	<span class="class-name">{{item.labelName}}</span>
		             	<span class="video-share-btn" @click="toShare(item.title,item.id,item.smallPicPath,item.titleName)"><img src="https://aliyunsso.edspay.com/web/riskEducation/share_btn.png" alt="">分享</span>
		             </div>
		         </div>
		    </div>
		</mt-loadmore>
		<!-- 底部文字 -->
		<div class="nav" v-if="allLoaded">
		    <div class="navBox">
		        <div class="navLeft fl"></div>
		        <div class="navFont fl">没有更多了</div>
		        <div class="navRight fl"></div>
		    </div>
		</div>

		<!-- H5分享蒙层 -->
		<div @click="close" v-if="showLayer" v-layer class="layer">
		    <img src="https://aliyunsso.edspay.com/web/riskEducation/vedio_share_tip.png" alt="">
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp.js';   // 与app交互
	import wxShare from '../../../../common/wx/wxShare';
    export default {
        mixins: [wxToapp,wxShare],
        data() {
            return {
                // tabList: ['E友课堂','行业新闻','法律法规'],
                tabIndex: 0,
                p2pKnowledge: [],       // E友课堂
                Vplay: true,
                No: true,
                pageNum:1,
                pages:1,
                allLoaded:false,
                autoFill:false,
                onOff:false,
    			shareObj:{
    				title: 'E都市钱包E友学院开课啦！学点知识，多点保障', //标题
                    desc: "",//内容
    				link: global.host+"/risk/shareVedio", //链接
    				imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
    			},
    			showLayer:false,
    			dataListLen:'',
    			flag:true,
    			AppShare: ''
            }
        },
        methods: {
            play(ite,i){
	            this.$refs.myVideo.map((item, index) => {
	                if(index == i){//播放
	                	_czc.push(﻿["_trackEvent",'视频播放',ite.titleName,]);
	                    item.play()
	                    this.$refs.Vplay[i].style.display ="none"; 
	                    this.$refs.videoTitle[i].classList.add("playFont"); 
	                    this.$refs.videoTime[i].classList.add("playFont"); 
	                }else{//暂停
	                    item.pause()
	                    this.$refs.Vplay[index].style.display ="block"; 
	                    this.$refs.videoTitle[index].classList.remove("playFont");
	                    this.$refs.videoTime[index].classList.remove("playFont");
	                }
	            })
	        },
	        pause(i){  //暂停
	            this.$refs.myVideo[i].pause()
                this.$refs.Vplay[i].style.display ="block"; 
                this.$refs.videoTitle[i].classList.remove("playFont");
                this.$refs.videoTime[i].classList.remove("playFont");
	        },

	        onPlay(i){
	            this.$refs.Vplay[i].style.display ="block"; 
	            this.$refs.videoTitle[i].classList.remove("playFont");
	            this.$refs.videoTime[i].classList.remove("playFont");
	        },

            close(){
            	this.showLayer = false;
            },
    		toShare(titleN,id,pic,shareName){    //分享事件
                _czc.push(﻿["_trackEvent",'视频分享',shareName,]);
                // 微信传值
                this.shareObj.title = titleN;
                this.shareObj.desc = '学点网贷知识，多点财富保障。'
                this.shareObj.link = global.host+"risk/shareVedio?vedioId="+id;
                this.shareObj.imgUrl = pic;
                // app传值
                this.AppShare = '1|' + titleN + '|学点网贷知识，多点财富保障。|'+ global.host + 'risk/shareVedio?vedioId=' +  id + '|'+ pic;

    			if(this.osType){
    				this.PassValue(this.AppShare);
    			}else{
    				this.getWxShareData(this.shareObj);
    				this.showLayer = true;
    			}
    		},
            postFun(n){    // nid参数  返回条数
                this.notLogPost('/index/getLawRuleList',(data) =>{
					if(data.resCode){
                        this.pages = data.resData.data.pages;
                        if(n == 1){
                        	this.p2pKnowledge = data.resData.data.list;
                        }else{
                        	this.p2pKnowledge = this.p2pKnowledge.concat(data.resData.data.list);
                        }
                        n == data.resData.data.pages ? this.allLoaded = true :  this.allLoaded = false

					}
				},(this.osType ? {oauthToken:this.token, nid: 'p2pKnowledge', pageNum: n, pageSize: 10}:{nid: 'p2pKnowledge', pageNum: 1, pageSize: 10}),1)
            },

            loadBottom(){
                this.pageNum++
                setTimeout(() => {
					this.postFun(this.pageNum);
					this.$refs.loadmore.onBottomLoaded();
				},500)

            }
        },
        created: function() {
            // this.PassValue('NavWhite_E友学院');
        },
        mounted() {
        	this.postFun(this.pageNum);
        	var that = this;
        	// 数据统计
        	const script = document.createElement('script')
        	script.src = 'https://s13.cnzz.com/z_stat.php?id=1274763120&web_id=1274763120 '
        	script.language = 'JavaScript'
        	document.body.appendChild(script)

        },
        watch: {
        	'$route'() {
        		if (window._czc) {
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
	#class{
		position: relative;
		font-family: PingFangSC-Regular;
		.layer{
	        img{
	            height:5.44rem;
	            width:6.093333rem;
	            position: relative;
	            left: 2.6rem;
	            top: 0.32rem;
	        }
	    }
		.tabs{
		    .nav{
		        position: relative;
		        width: 100%;
		        height: 1.066667rem;
		        padding: 0 .533333rem;
		        background: #fff;
		        .title,.more{
		            height: 100%;
		            font-family: PingFangSC-Medium;
		            font-size: .373333rem;
		            color: #333333;
		            letter-spacing: .021333rem;
		            line-height: 1.066667rem;
		            float: left;
		        }
		        .more{
		            float: right;
		            font-family: PingFangSC-Regular;
		            font-size: .346667rem;
		            color: #999999;
		            em{
		                font-size: .373333rem;
		                margin-left: .066667rem;
		            }
		        }
		    }
		}
		.knowledge{
		    width: 100%;
		    // margin-bottom: .386667rem;
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
		           
		        }
		        .play.playBck{
		        	background: url(https://aliyunsso.edspay.com/web/riskEducation/vedio_pause_btn.png) no-repeat center center / 1.093333rem 1.093333rem;
		        }
		        .share-bottom{
		        	width: 100%;
		        	height: 1.173333rem;
		        	background:#fff;
		        	position: absolute;
		        	bottom: 0;
		        	left: 0;
		        	padding: 0.333333rem 0.533333rem;
		        	.class-name{
		        		height: 0.506667rem;
		        		display: inline-block;
						padding: 0.053333rem 0.213333rem;
						background: #F2F2F2;
						border-radius: 0.253333rem;
						font-size: 0.293333rem;
						color: #333333;
		        	}
		        	.video-share-btn{
		        		display: inline-block;
		        		float: right;
		        		font-size: 0.32rem;
		        		color: #808080;
	        		    line-height: 0.5rem;
	        		    position: relative;
        		        top: .03rem;
		        		img{
		        			width: 0.48rem;
		        			height: 0.48rem;
		        			margin-right: 0.213333rem;
		        			position: relative;
        			        top: -0.03rem;
		        		}
		        	}
		        }
		    }
		}
		.nav{
		    width: 100%;
		    height: 1.706667rem;
		    text-align: center;
		    .navBox{
		        // height: 1010%;
		        margin: 0 auto;
		        display: inline-block;
		        .navLeft,.navRight{
		            width: 0.32rem;
		            height: 0.026667rem;
		            background: #c1c1c1;
		            margin-top: .84rem;
		            opacity: .8;
		        }
		        .navFont{
		            font-family: PingFangSC-Regular;
		            font-size: 0.293333rem;
		            color: #C1C1C1;
		            line-height: 1.706667rem;
		            margin: 0 .266667rem;
		        }
		    }
		}
	}
</style>