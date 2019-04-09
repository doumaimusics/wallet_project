<template>
	<div>
		<div v-title>我不知道怎么做活动了</div>
		<header></header>
		<div id="getRed">
			<div id="mc_play" @click="play_music" :class="{clo:!isPlay}" class="music">
		        <audio autoplay="autoplay" ref="audio" id="musicfx" loop="loop">  
		              <source src="https://aliyunsso.edspay.com/web/wx/activity/receiveRed/TKZC.mp3" type="audio/mpeg"> 
		              <source src="https://aliyunsso.edspay.com/web/wx/activity/receiveRed/TKZC.ogg" type="audio/mpeg"> 

		          </audio>  
			</div>
			<div :style="{opacity:opacity1}" class="text1">
				<img src="https://aliyunsso.edspay.com/web/wx/activity/receiveRed/text1.png" alt="">
			</div>
			<div :style="{opacity:opacity2}" class="text2">
				<img src="https://aliyunsso.edspay.com/web/wx/activity/receiveRed/text2.png" alt="">
			</div>
			<div :style="{opacity:opacity3}" class="text3">
				<img src="https://aliyunsso.edspay.com/web/wx/activity/receiveRed/text3.png" alt="">
			</div>
			<div v-if="btnType == 2">
				<div v-if="hasGetRed" class="conBtn" style="background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/hasGet.png)">
				</div>
				<div @click="getWelfare" v-else class="conBtn">
					<div class="slide-icon"></div>
				</div>
			</div>
			<div v-else-if="btnType == 1">
				<div :style="btnStyle" v-if="hasGetRed" class="btn greyBtn">
					<div class="hasContent"></div>
				</div>
				<div :style="btnStyle" @click="getWelfare" v-else class="btn">
					<div class="content">
						<div class="slide-icon"></div>
					</div>
				</div>
				
			</div>
			<red-pop :showRed="showRed" v-if="showRed.isShow" ></red-pop>
			<div v-if="activityStatus != 1" @click="ActivityPrompt" v-layer class="layer"></div>
		</div>
		
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import activityTime from '../publicJS/activityTime';
	import redPop from './redPopup';
    export default{
	mixins:[wxToapp,activityTime],
    	data(){
    		return{
    			hasGetRed:false,//是否领取红包
    			isPlay:true,//是否在播放
    			showRed:{
    				isShow:false,//显示弹框
    			},
    			btnStyle:{background:'rgba(255,255,255,'+0.9+')'},
    			btnType: 1,
		    	opacity1:0,
		    	opacity2:0,
		    	opacity3:0,
		    	timer1:null,
		    	timer2:null,
		    	timer3:null,
    		}
    	},
    	methods:{
    		play_music(){
    			if(this.isPlay){
    				this.$refs.audio.pause();
    			}else{
    				this.$refs.audio.play();
    			}
    			this.isPlay = !this.isPlay
    		},
    		getUserData(){
    			this.getAppData('/activity/smallActivity/judgeIsAchieveBenefit',data =>{
    				if(data.resCode){ 
    					this.hasGetRed = data.resData.isAchieveBenefit;
    				}
    			},{})
    		},
    		getWelfare(){
    			_czc.push(﻿["_trackEvent", "三月领红包活动", "领取红包按钮"]);
    			this.getAppData('/activity/smallActivity/achieveBenefit',data => {
    				if(data.resCode){
    					this.showRed.isShow = true;
    					this.hasGetRed = true;
    				}
    			},{})
    		},
    		showText1(){
    			var that = this;
    			this.timer1 = setInterval(function(){
    				if(that.opacity1 >= 1){
    					that.opacity1 = 1;
    					clearInterval(that.timer1);
    					return;
    				}
    				that.opacity1 = that.opacity1 + 0.05;

    			},80)
    		},
    		showText2(){
    			var that = this;
    			this.timer2 = setTimeout(function(){
    				that.opacity2 = that.opacity2 + 0.05;
    				if(that.opacity2 < 1){
    					that.showText2()
    				}else{
    					that.opacity2 = 1;
    				}

    			},100)
    		},
    		showText3(){
    			var that = this;
    			this.timer3 = setInterval(function(){
    				if(that.opacity3 >= 1){
    					that.opacity3 = 1;
    					clearInterval(that.timer3);
    					return;
    				}
    				that.opacity3 = that.opacity3 + 0.05;

    			},100)
    		}
    	},
    	components:{
    		redPop,
    	},
    	created(){
    		this._getActivityTime('/activity/smallActivity/judgeInActivityPeriod');
    		if(this.hasLogin){
    			this.getUserData();
    		}
    	},
    	mounted(){
    		var that = this;
    		this.showText1()
    		window.addEventListener("scroll",(e) => {
				var t = document.documentElement.scrollTop||document.body.scrollTop;
				if(t >= 220){
					if(this.opacity2 == 0){
						this.showText2()
					}
				}
				if(t>= 540){
					if(this.opacity3 == 0){
						this.showText3()
					}
				}
				if(t <= 670 && t >= 500){
					var num = (670 - t)/300;
					this.btnStyle = {background:'rgba(255,255,255,'+num+')'}

				}else{
					this.btnStyle = {background:'rgba(255,255,255,'+0.9+')'}
				}
				if(t >= 670){
					this.btnType = 2
				}else{
					this.btnType = 1;
				}
			});
			// 友盟数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1273261606&web_id=1273261606 '
			script.language = 'JavaScript'
			document.body.appendChild(script)
    	},
    	watch: { // 监听
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

<style lang="scss">
	html,body{
		height: 100%;
	}
</style>

<style lang="scss" scoped>
    header{
		background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/head.gif) no-repeat;
		background-size:100%;
		height:3.066667rem;
		width:10.0rem;
	}
	.music{
		-webkit-animation: rotating 1.5s linear infinite;animation: rotating 1.5s linear infinite;
	}
	.clo{
		animation:rotating;
	}
@-webkit-keyframes rotating {
	from{
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-o-transform: rotate(0deg);
    	transform: rotate(0deg);
	}
	to{
		-webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}
@keyframes rotating {
    from{
        -webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		-o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to{
        -webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-ms-transform: rotate(360deg);
		-o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
    #getRed{
    	background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/redBG.gif) no-repeat;
    	background-size: 100%;
    	height:35.76rem;
    	.layer{
    		background:rgba(0,0,0,0)!important;
    	}
    	.music{
    		height: 0.8rem;
    		width: 0.8rem;
    		background: red;
    		position: fixed;
    		top: 2.16rem;
    		right: 0.4rem;
    		background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/open.png) no-repeat;
    		background-size:100% 100%!important;
    	}
    	.clo{
    		background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/clase.png) no-repeat;
    	}
    	.text1{
    		padding: 8.8rem 0 0 0.4rem;
    		img{
    			height:	6.4rem;
    			width:6.013333rem;
    		}
    	}
    	.text2{
    		padding: 3.2rem 0 0 5.306667rem;
    		img{
    			height:6.986667rem;
    			width:3.866667rem;
    		}
    	}
    	.text3{
    		padding: 2.4rem 0 0 1.12rem;
    		img{
    			height:2.133333rem;
    			width:7.76rem;
    		}
    	}
    	.conBtn{
    		background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/getRed.png) no-repeat;
    		height:1.44rem;
    		width:8.066667rem;
			background-size:100% 100%!important;
			margin:1.066667rem auto 0;
			position: relative;
    	}
    	.btn{
    		position: fixed;
    		bottom: 0;
    		left: 0;
    		height:1.866667rem;
    		width:100%;
    		font-size: 0.613333rem;
    		line-height: 1.6rem;
    		text-align: center;
    		color: #fff;
    		background:rgba(255,255,255,.9);
    		.content{
    			height:1.44rem;
    			width:8.066667rem;
    			background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/getRed.png) no-repeat;
    			background-size:100% 100%;
    			margin:0.213333rem auto 0;
    			position: relative;
    		}
    	}
    	.greyBtn{
    		.hasContent{
    			height:1.44rem;
    			width:8.066667rem;
    			background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/hasGet.png) no-repeat;
    			background-size:100% 100%;
    			margin:0.213333rem auto 0;
    			position: relative;
    		}
    	}
@-moz-keyframes slide {
  0% {
    right: 2.1rem;
  }
  50% {
    right: 2.6rem;
  }
  100% {
    right: 2.1rem;
  }
}
@-ms-keyframes slide {
  0% {
    right: 2.1rem;
  }
  50% {
    right: 2.5rem;
  }
  100% {
    right: 2.1rem;
  }
}
@-webkit-keyframes slide {
  0% {
    right: 2.1rem;
  }
  50% {
    right: 2.5rem;
  }
  100% {
    right: 2.1rem;
  }
}
@keyframes slide {
  0% {
    right: 2.1rem;
  }
  50% {
    right: 2.5rem;
  }
  100% {
    right: 2.1rem;
  }
} 
    	.slide-icon {
    	  width: 0.64rem;
    	  height: 0.373333rem;
    	  background: url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/triangle.png)
    	    no-repeat;
    	  background-size: 0.64rem 0.373333rem;
    	  position: absolute;
    	  top: 0.5rem;
    	  right: 2.5rem;
    	  z-index: 9;
    	  -webkit-animation: slide 1.5s infinite;
    	  -moz-animation: slide 1.5s infinite;
    	  -ms-animation: slide 1.5s infinite;
    	  animation: slide 1.5s infinite;
    	}
    }
</style>