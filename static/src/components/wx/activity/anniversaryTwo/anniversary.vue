<template>
    <div id="anniversary">
    	<div v-title>两周年庆典</div>
    	<ul  :class="{opac:!showHeaderTab}" ref="tabTop" class="tabTop clear">
    		<li @click="activeTab(0)" :style="{background:'url(' + tabActiveImg[0] + ') no-repeat'}" class="li1"></li>
    		<li @click="activeTab(1)" :style="{background:'url(' + tabActiveImg[1] + ') no-repeat'}" class="li2"></li>
    		<li @click="activeTab(2)" :style="{background:'url(' + tabActiveImg[2] + ') no-repeat'}" class="li3"></li>
    		<li @click="activeTab(3)" :style="{background:'url(' + tabActiveImg[3] + ') no-repeat'}" class="li4"></li>
    	</ul>
    	<ul v-if="!showHeaderTab" ref="tabTop2" class="tabTop headerTab clear">
            <li class="li1">
                <div @click="activeTab(0)" :style="{background:'url(' + tabImg[0].img1 + ') no-repeat'}" class="div1"></div>
        		<div @click="activeTab(0)" :style="{opacity:tabList[0],background:'url(' + tabImg[0].img2 + ') no-repeat'}" class="div2"></div>
                
            </li>
            <li class="li2">
                <div @click="activeTab(1)" :style="{background:'url(' + tabImg[1].img1 + ') no-repeat'}" class="div1"></div>
        		<div @click="activeTab(1)" :style="{opacity:tabList[1],background:'url(' + tabImg[1].img2 + ') no-repeat'}" class="div2"></div>
            </li>

            <li class="li3">
                <div @click="activeTab(2)" :style="{background:'url(' + tabImg[2].img1 + ') no-repeat'}" class="div1"></div>
        		<div @click="activeTab(2)" :style="{opacity:tabList[2],background:'url(' + tabImg[2].img2 + ') no-repeat'}" class="div2"></div>
            </li>

            <li class="li4">
                <div @click="activeTab(3)" :style="{background:'url(' + tabImg[3].img1 + ') no-repeat'}" class="div1"></div>
        		<div @click="activeTab(3)" :style="{opacity:tabList[3],background:'url(' + tabImg[3].img2 + ') no-repeat'}" class="div2"></div>
            </li>

    	</ul>
    	<!-- <div v-if="!showHeaderTab" class="tiTab"></div> -->

    	<div ref="together" class="together">
    		<div @click="playVideo" class="video">
    			
    		</div>
    		<div class="imgs clear">
    			<div class="img imgLeft">
    				<img id="left1"  class="left1" :src="activeImg[0].img1" alt="">
    				<img id="left2"  class="left2" :src="activeImg[1].img1" alt="">
    			</div>
    			<div class="img">
    				<img id="right1"  class="right1" :src="activeImg[0].img2" alt="">
    				<img id="right2"  class="right2" :src="activeImg[1].img2" alt="">
    			</div>
    		</div>
    	</div>
    	<div ref="activity" class="activity">
    		<div @click="toActivity" class="activityBtn"></div>
    		<div class="activityTitle"></div>
    	</div>
    	<div ref="blessing" class="blessing">
    		<div class="blessingBtn"></div>
    		<input v-if="hasLogin" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"  name="file_head" id="file_head" @change="setImageBlessing"/>
    		<div v-else class="input" @click="showTips"></div>
            <div @click="showRult2 = true" class="rult2"></div>
    	</div>
    	<div ref="praise" class="praise">
    		<div @click="showRult = true;" class="rultBtn"></div>
    		<div class="praiseBtn"></div>
    		<input v-if="hasLogin && !ifUpload" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"  name="file_head" id="file_head" @change="setImagePraise"/>
    		<div v-else class="input" @click="showTips(1)"></div>
    	</div>
		<div @click="toShare" class="yuanBtn"></div>
		<div class="tips">已有<span>{{sumPeople}}</span>人正在瓜分10万积分</div>
    	<div v-if="showVideo" v-layer @click.self="closeVideo" class="layerVideo videoClose">
            <div @click="closeVideo" class="close"></div>
    		<div class="video">
    			<!-- <video width="100%" autoplay="autoplay" x5-playsinline="" webkit-playsinline="true" webview.allowsInlineMediaPlayback = "YES" playsinline preload="preload" controls="controls" ref="videos" id="vid">
    			<source ref="source" src="https://aliyunsso.edspay.com/edspayKefu.mp4" type="video/mp4">
    			</video> -->
    			<video width="100%" autoplay="autoplay" controls="controls" poster="https://aliyunsso.edspay.com/web/wx/activity/anniversary/firstVideo.png" ref="videos" id="vid">
    				<source ref="source" src="https://aliyunsso.edspay.com/images/video/1000000545206970AAwxAnniversaryVideoAA.mp4" type="video/mp4">
    			</video>
    		</div>
    	</div>
    	<div @click="showLayer = false" v-if="showLayer" v-layer class="shareLayer">
    	    <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/shareLayer.png" alt="">
    	</div>
    	<div v-layer v-if="showRult" @click="showRult = false" class="showRult">
    		<img src="https://aliyunsso.edspay.com/web/wx/activity/anniversary/rult.png" alt="">
    	</div>
    	<div v-if="activityStatus != 1" @click.self="wxActivityPrompt" v-layer class="layer layerSuccess">
    		<div v-if="showTimeTips" class="content">
    			<p class="p1">{{textTips}}</p>
    			<div @click="showTimeTips = false" class="btn"></div>
    		</div>
    	</div>
    	<div v-if="showSuccess" v-layer class="layerSuccess">
    		<div class="content">
    			<p v-if="succText == 1" class="p1">上传成功！</p>
    			<p v-else-if="succText == 2" class="p2">您已上传点赞截图哦，审核通过即可瓜分10万积分。</p>
    			<div @click="showSuccess = false" class="btn"></div>
    		</div>
    	</div>
        <div v-if="showRult2" v-layer class="layerRult2 showRult">
            <div class="content">
                
                <div @click="showRult2 = false" class="btn"></div>
            </div>
        </div>
    	<div class="phone">
            <a href="tel:400-135-3388"></a>
            <p v-if="osType == 'IOS'" class="text">本活动与苹果公司无关</p>
        </div>
    </div>
</template>

<script>
	import wxShare from '../../../../common/wx/wxShare';
	import getActivityData from '../publicJS/getActivityData';
	import lrz from 'lrz';
    export default{
    	mixins:[wxShare,getActivityData],
    	data(){
    		return{
    			showVideo:false,
    			showHeaderTab:true,
    			showLayer:false,
    			showRult:false,
                showRult2:false,
    			showSuccess:false,
    			showTimeTips:false,
    			textTips:'',
    			ifUpload:false,
    			succText:1,
    			getPage:[],//福利三商品数组
    			swiperList:[],
    			boxHeight:[],
    			blessHeight:0,
    			prasieHeight:0,
    			activiHeight:0,
    			activeIndex:0,
    			timer:null,
    			sumPeople:0,//总人数
    			controlImg:[true,false],//图片轮换
    			activeImgNum:2,//下一个要展示的图片组
                tabList:[1,0,0,0],
    			imgList:[],
    			activeImg:[
    				{
    					img1:'',
    					img2:''
    				},
    				{
    					img1:'',
    					img2:''
    				}
    			],
    			refsHeight:{
    				tabTop:0,
    			},
    			tabActiveImg:[
    				'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_liang1.png',
    				'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_2.png',
    				'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_3.png',
    				'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_4.png'
    			],
    			tabImg:[
    				{
    					img1:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_1.png',
    					img2:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_liang1.png'
    				},
    				{
    					img1:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_2.png',
    					img2:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_liang2.png'
    				},
    				{
    					img1:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_3.png',
    					img2:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_liang3.png'
    				},
    				{
    					img1:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_4.png',
    					img2:'https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_liang4.png'
    				},
    			],
    			shareObj:{
    				title: '我在E都市钱包2周岁生日party抢到好礼，还不上车？', //标题
                    desc: "快来一起庆生吧！",//内容
    				link: global.host+"anniversary", //链接
    				imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
    			},
    		}
    	}, 
    	methods:{
            playVideo(){
                _czc.push(﻿["_trackEvent", "两周年主会场-移动端", "视频播放按钮"]); //  友盟统计配置
                this.showVideo = true
            },
    		wxActivityPrompt(){
                if (this.activityStatus == 2) {
                    this.showTimeTips = true;
                    this.textTips = '亲，活动尚未开始哦!';
                } else if(this.activityStatus == 3){
                    this.showTimeTips = true;
                    this.textTips = '亲，活动已经结束啦!';
                } else if(this.activityStatus == 4){
                    this.showTimeTips = true;
                    this.textTips = '亲，活动已经失效啦!';
                }
            },
    		toActivity(){
                this.toWxUrl('/twoAnniversary');
    			// this.$router.push({path:'/twoAnniversary'})
    		},
    		getBoxTop(refName){//获取板块距顶部高度
				this.boxHeight.push(this.$refs[refName].offsetTop);
    		},
    		closeVideo(){
    			this.showVideo = false;
                this.$refs.videos.pause();
    		},
    		activeTab(index){//点击头部tab
                clearInterval(this.timer);
    			if(this.activeIndex == index){
    				return;
    			}
    			this.setTabImg(index);
    			this.rollPage(index);
    			/*document.body.scrollTop = this.boxHeight[index] - (this.$refs.tabTop.offsetHeight - 60);
    			document.documentElement.scrollTop = this.boxHeight[index] - (this.$refs.tabTop.offsetHeight - 60);
    			window.pageYOffset = this.boxHeight[index] - (this.$refs.tabTop.offsetHeight - 60);*/
    		},
    		setTabImg(index){//修改头部icon图片
    			for(var i=0;i<4;i++){
                    this.$set(this.tabActiveImg,i,this.tabImg[i].img1);
    				this.$set(this.tabList,i,0);
    			}
                this.$set(this.tabActiveImg,index,this.tabImg[index].img2);
    			this.$set(this.tabList,index,1);
    		},
    		getPageData(){//获取数据
    			this.getNotlogData('/activity/2years/goodsList',(data) =>{
    				if(data.resCode){
    					this.getNotlogData = data.resData.data.list;
    				}
    			},{})
    			this.getNotlogData('/activity/two/getPicturePathList',(data) =>{
    				if(data.resCode){
    					this.sumPeople = data.resData.num;
    					this.ifUpload = data.resData.ifUpload;
    					this.swiperList = data.resData.list;
    					if(this.swiperList.length%2 == 0){

    					}else{
    						this.swiperList.push(this.swiperList[0])
    					}
    					if(this.swiperList.length == 2){
    						this.imgList.push({
    							img1:this.swiperList[0].path,
    							img2:this.swiperList[(1)].path
    						})
    						this.imgList.push({
    							img1:this.swiperList[0].path,
    							img2:this.swiperList[(1)].path
    						})
    						
    					}else{
    						for(var i=0;i<this.swiperList.length;i+=2){
    						this.imgList.push({
    							img1:this.swiperList[i].path,
    							img2:this.swiperList[(i+1)].path
    						})
    					}
    					}
    					this.$set(this.activeImg,0,this.imgList[0]);
    					this.$set(this.activeImg,1,this.imgList[1]);
    				}
    			},{})
    		},
    		setImageBlessing(e){ //上传合照
                _czc.push(﻿["_trackEvent", "两周年主会场-移动端", "上传祝福按钮"]); //  友盟统计配置
	            var files = e.target.files || e.dataTransfer.files;
				lrz(files[0], { width: 480 }).then((rst) => {
				    this.getAppData('/activity/two/savePicturePath',(data) =>{
				      if(data.resCode){
				      	this.succText = 1;
				      	this.showSuccess = true;
				      }
				    },{file:rst.base64,type:0},1)
				}).always(function() {
				    // 清空文件上传控件的值
				    e.target.value = null;
				});
    		},
    		setImagePraise(e){ //上传积攒
                _czc.push(﻿["_trackEvent", "两周年主会场-移动端", "上传集攒按钮"]); //  友盟统计配置
	            var files = e.target.files || e.dataTransfer.files;
				lrz(files[0], { width: 480 }).then((rst) => {
				    this.getAppData('/activity/two/savePicturePath',(data) =>{
				      if(data.resCode){
				      	this.ifUpload = true;
				      	this.succText = 1;
				        this.showSuccess = true;
				      }else{
				      	this.succText = 2;
				      }
				      this.showSuccess = true;
				    },{file:rst.base64,type:1},1)	
				}).always(function() {
				    // 清空文件上传控件的值
				    e.target.value = null;
				});
    		},
    		handleScroll () {//监听屏幕滚动
    			if(this.refsHeight.tabTop < window.scrollY){
    				this.showHeaderTab = false;
    			}else{
    				this.showHeaderTab = true;
    			}

		        this.setIconImg();
		    },
		    setImgShow(){//图片轮播
		    	this.timer =  setInterval(() =>{
		    		if(this.controlImg[0]){
		    			$('#left1').animate({opacity:0}, 800);
		    			$('#right1').animate({opacity:0}, 800,() =>{
		    				this.$set(this.controlImg,0,false);
		    				this.$set(this.controlImg,1,true);
		    				if(this.activeImgNum < this.imgList.length){
		    					this.$set(this.activeImg,0,this.imgList[this.activeImgNum]);
		    					this.activeImgNum++;
		    				}else{
		    					this.$set(this.activeImg,0,this.imgList[0]);
		    					this.activeImgNum = 1;
		    				}
		    			});
		    		}else{
		    			$('#left1').animate({opacity:1}, 800);
		    			$('#right1').animate({opacity:1}, 800,() =>{
		    				this.$set(this.controlImg,0,true);
		    				this.$set(this.controlImg,1,false);

		    				if(this.activeImgNum < this.imgList.length){
		    					this.$set(this.activeImg,1,this.imgList[this.activeImgNum]);
		    					this.activeImgNum++;
		    				}else{
		    					this.$set(this.activeImg,1,this.imgList[0]);
		    					this.activeImgNum = 1;
		    				}
		    			});
		    		}
		    	},5000)
		    },
		    toShare(){
                _czc.push(﻿["_trackEvent", "两周年主会场-移动端", "分享按钮"]); //  友盟统计配置
		    	if(this.osType){
    				this.PassValue(this.appShare);
    			}else{
    				this.showLayer = true;
    			}
		    },
		    setIconImg(){
		    	if(window.scrollY >this.boxHeight[0] -(this.$refs.tabTop.offsetHeight) && window.scrollY <this.boxHeight[1] -(this.$refs.tabTop.offsetHeight)){
		        	this.setTabImg(0);
		        	this.activeIndex = 0;
				}else if(window.scrollY > this.boxHeight[1] -(this.$refs.tabTop.offsetHeight) && window.scrollY < this.boxHeight[2] -(this.$refs.tabTop.offsetHeight)){
					this.setTabImg(1);
		        	this.activeIndex = 1;
				}else if(window.scrollY > this.boxHeight[2] -(this.$refs.tabTop.offsetHeight) && window.scrollY < this.boxHeight[3] -(this.$refs.tabTop.offsetHeight)){
					this.setTabImg(2);
		        	this.activeIndex = 2;
				}else if(window.scrollY > this.boxHeight[3] -(this.$refs.tabTop.offsetHeight)){
					this.setTabImg(3);
		        	this.activeIndex = 3;
				}
		    },
		    showTips(type){
		    	if(type == 1 && this.hasLogin){
		    		if(this.ifUpload){
		    			this.succText = 2;
		    			this.showSuccess = true;
		    			return;
		    		}
		    	}
		    	if(this.osType){
		    		this.PassValue('LG');
		    	}else{
		    		this.$router.push({path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
		    	}
		    },
		    rollPage(index){
		    	if(window.scrollY < this.boxHeight[index] - (this.$refs.tabTop.offsetHeight - 60)){
			    	this.timer = setInterval(() =>{
			    		if(window.scrollY >= this.boxHeight[index] - (this.$refs.tabTop.offsetHeight - 60)){
			    			clearInterval(this.timer);
			    			return;
			    		}

			    		document.body.scrollTop += 12
                        document.documentElement.scrollTop +=12
                        window.pageYOffset +=12
			    	},6)
		    	}else{
		    		this.timer = setInterval(() =>{
		    			if(window.scrollY <= this.boxHeight[index] - (this.$refs.tabTop.offsetHeight - 60)){
		    				clearInterval(this.timer);
		    				return;
		    			}
		    			document.body.scrollTop -= 12
                        document.documentElement.scrollTop -=12
                        window.pageYOffset -=12
		    		},6)
		    	}
		    }
    	},
    	created(){
    		this._getActivityTime('con_two_activity');
    		this.getPageData();
    	},
    	mounted(){
    		this.getBoxTop('together')
    		this.getBoxTop('activity');
    		this.getBoxTop('blessing');
    		this.getBoxTop('praise');
    		this.refsHeight.tabTop = this.$refs.tabTop.offsetTop;
    		
    		this.setIconImg();

    		window.addEventListener('scroll', this.handleScroll);


    		this.setImgShow();
    		this.getWxShareData(this.shareObj);

            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=' + 1274032965 + '&web_id=' + 1274032965
            script.language = 'JavaScript'
            document.body.appendChild(script)
    	},
    	destroyed(){
    		clearInterval(this.timer);
    		 window.removeEventListener('scroll',this.handleScroll );
    	}
    }
</script>

<style lang="scss" scoped>
    #anniversary{
    	font-family: PingFangSC-Regular;
    	background:url(https://aliyunsso.edspay.com/web/wx/activity/anniversary/anniverBg.png) no-repeat;
    	background-size: 100% 100%;
    	height:59.866667rem;
    	padding-top: 7.4rem;
    	.layerSuccess{
    		padding-top:5.333333rem;
    		.content{
    			height:4.666667rem;
    			width:7.733333rem;
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/success.png') no-repeat;
    			background-size:100% 100%;
    			margin:0 auto;
    			text-align:center;
    			color:#666;
    			position: relative;
    			.p1{
    				font-size:0.426667rem;
    				line-height:0.613333rem;
    				padding-top: 1.173333rem;

    			}
    			.p2{
    				font-size:0.373333rem;
    				line-height:0.533333rem;
    				padding-top: 1.186667rem;
    				width:4.88rem;
    				margin:0 auto;
    				text-align:left;
    			}
    			.btn{
					position: absolute;
					height:1.066667rem;
					width:3.333333rem;
					margin:0 auto;
					left:2.186667rem;
					bottom:0.8rem;
    			}
    		}
    	}
    	.showRult{
    		padding-top: 2.2rem;
    		img{
    			width:7.733333rem;
    			height:11.173333rem;
    			display:block;
    			margin: 0 auto;
    		}
    	}
        .layerRult2{
            padding-top: 2.4rem;
            .content{
                width:7.733333rem;
                height:7.706667rem;
                display:block;
                margin:0 auto;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/guize_pc.png') no-repeat;
                background-size:100%;
                padding-top: 6.266667rem;
                .btn{
                    height:1.333333rem;
                    width:1.333333rem;
                    margin:0 auto;
                }
            }
        }
    	.shareLayer{
    		img{
                height:4.8rem;
                width:100%;
            }
    	}
    	.layer{
    		background:rgba(0,0,0,0)!important;
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
    	.opac{
    		opacity: 0;
    	}
    	.tabTop{
    		background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_di.png') no-repeat;
    		background-size:100% 1.493333rem;
    		padding: 0 0 0 0.426667rem;
    		height:3.2rem;
    		li{
    			height:1.493333rem;
    			width:1.493333rem;
    			float: left;
    			background-size:1.493333rem 1.493333rem!important;
    			margin-right: 1.066667rem;
                position: relative;
                div{
                    position: absolute;
                    height:100%;
                    width:100%;
                    top:0;
                    left:0;
                    z-index:60;
                    background-size:100% 100%!important;
                }
                .div2{
                    z-index:100;
                }
    		}
    		.li1{
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_1.png') no-repeat;
    		}
    		.li2{
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_2.png') no-repeat;
    			margin-top: 0.533333rem;
    		}
    		.li3{
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_3.png') no-repeat;
    			margin-top: 0.533333rem;
    		}
    		.li4{
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_4.png') no-repeat;
    			margin-right: 0;
    		}
    	}
    	.tiTab{
    		height:3.2rem;
    	}
    	.headerTab{
    		position: fixed;
    		top:0;
    		left:0;
    		width:100%;
    		z-index:199
    	}
    	.together{
    		padding-top:3.173333rem;
    		.video{
    			width:100%;
    			height:4.5333rem;
    		}
	    	.imgs{
	    		padding-top: 1.27rem;
	    		height:7.28rem;
	    		padding-left:1.22rem;
	    		.img{
					width:3.466667rem;
					height:4.64rem;
					float: left;
					position: relative;
					img{
						width:100%;
						height:100%;
						position: absolute;
					}
					.left1,.right1{z-index:100;}
					.left2,.right2{z-index:60;}
					.imgNone{opacity:0;}
	    		}
	    		.imgLeft{
	    			margin-right: 0.63rem;
	    		}
	    	}
    	}
    	.activity{
    		height:7.4rem;
    		padding-top: 1.1rem;
    		padding-left: 6.506667rem;
    		.activityBtn{
    			height:2.933333rem;
    			width:3.066667rem;
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/activityBtn.png') no-repeat;
    			background-size:100% 100%;
    		}
    		.activityTitle{
    			height:1.066667rem;
    			width:5.866667rem;
    			margin-top: 2.413333rem;
    			margin-left: -4.426667rem;
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/juxian.png') no-repeat;
    			background-size:100% 100%;
    		}
    	}
    	.blessing{
    		height:9.3rem;
    		padding-top: 4.55rem;
    		position: relative;
    		.blessingBtn{
    			height:1.653333rem;
    			width:3.866667rem;
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/blessingBtn.png') no-repeat;
    			background-size:100% 100%;
    			margin-left: 0.213333rem;
    		}
            .rult2{
                height:1.6rem;
                width:1.6rem;
                margin:0 0 0 7.786667rem;
            }
    		input{
    			opacity: 0;
    			display: block;
    			height:1.653333rem;
    			width:4rem;
    			position: absolute;
    			top:4.55rem;
    			left:0;
    		}
    		.input{
    			display: block;
    			height:1.653333rem;
    			width:4rem;
    			position: absolute;
    			top:4.55rem;
    			left:0;
    			z-index:10;
    		}
			
    	}
    	.praise{
    		height:8.2rem;
    		padding-top: 4.766667rem;
    		padding-left: 5.333333rem;
    		position: relative;
    		.rultBtn{
    			height:1.333333rem;
    			width:1.333333rem;
    			position: absolute;
    			right:0.133333rem;
    			top:2.026667rem;
    		}
    		.praiseBtn{
    			height:2.08rem;
    			width:3.866667rem;
    			background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/praiseBtn.png') no-repeat;
    			background-size:100% 100%;
    		}
    		input{
    			height:2.08rem;
    			width:3.866667rem;
    			opacity:0;
    			position: absolute;
    			top:4.766667rem;
    			left:5.3333rem;
    		}
    		.input{
    			height:2.08rem;
    			width:3.866667rem;
    			position: absolute;
    			top:4.766667rem;
    			left:5.3333rem;
    			z-index:100;
    		}
    	}
    	.yuanBtn{
    		height:3.12rem;
    		background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/icon_btn.gif') no-repeat;
    		background-size:100% 100%;
    		margin-top: 2.3333rem;
    	}
    	.tips{
    		text-align: center;
    		font-size: 0.426667rem;
    		line-height: 0.613333rem;
    		padding-top: 0.64rem;
    		color: #666666;
    		span{
    			font-family: DIN-Medium;
    			padding:0 0.133333rem;
    		}
    	}
    	.phone{
            padding-top:1.066667rem;
            a{
                display:inline-block;
                width:100%;
                height:0.8rem;
            }
            .text{
                font-size:0.28rem;
                color:#fff;
                text-align:center;
                margin-left: -0.133333rem;
            }
        }
    }
</style>