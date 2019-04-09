<template>
	<div class="landPage" :style="fullHeight">
		<title v-title>邀请重磅升级</title>
		<div v-show="firstPage" class="bg1">
			<div class="contain">
				<div class="first_page clear">
					<div class="box"><img class="img1" src="https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/text1.png" alt=""></div>
					<div class="box"><img class="img2" src="https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/text2.png" alt=""></div>
				</div>
			</div>
		</div>
		<div v-show="secondPage" class="bg2">
			<div class="contain">
				<div class="second_page">
					<div class="box"><img class="img3" src="https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/text3.png" alt=""></div>
					<div class="box"><img class="img4" src="https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/text4.png" alt=""></div>
					<div class="box"><img class="img5" src="https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/text5.png" alt=""></div>
				</div>
			</div>
		</div>
		<div v-show="thirdPage" class="bg3">
			<div class="contain">
				<div class="third_page">
					<div class="box"><img class="img6" src="https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/text6.png" alt=""></div>
					<div class="box"><img class="img7" src="https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/text7.png" alt=""></div>
				</div>
			</div>
		</div>
		<div class="click_btn clear">
			<div class="middle" @click="toInvite">
				<div class="left_hand"></div>
				<div class="move_btn"></div>
				<div class="right_hand"></div>
			</div>
			
		</div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'; //头部引入
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins: [wxToapp],
		data() {
			return {
				firstPage:true,
				secondPage:false,
				thirdPage:false,

				fullHeight:{
					height: ''
				},
				imgBox: {
					width: "100%",
					height: "100%",
					backgroundSize: "10rem 20.56rem"   // 背景图片的大小以iPhoneX适配的尺寸为准  
				},
				bg:[
					'https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/first_page.png',
					'https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/second_page.png',
					'https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/third_page.png'
				],
				timer:{
					time1:null,
					time2:null,
					time3:null,
					time4:null,
					time5:null,
					time6:null,
					time7:null,
					time8:null,
					time9:null,
					time10:null,
					time11:null,
				}
			}
		},
		components: {
			wxHeader,
		},
		methods:{
			toInvite() {
				_czc.push(﻿["_trackEvent", "邀请落地页", "邀请跳转"]);
				this.toWxUrl('/inviteIndex');
			},

		},
		mounted() {
			var that = this;
			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1273545919&web_id=1273545919'
			script.language = 'JavaScript'
			document.body.appendChild(script)

			if(that.osType == "Android"){
				that.fullHeight.height = (document.documentElement.clientHeight+10)+"px"  //获取手机可视区域的的高度
			}else{
				that.fullHeight.height =  document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度	
			}

			$(document).ready(function () {
				//第一页加载
				for (var i=0; i<2; i++){
					(function(j){
						that.timer.time1 = window.setTimeout(function() {
							console.log(j)
							$(".first_page .box").eq(j).addClass('opacty')
						}, 1400*(j+1));
					})(i) 
				}
				//第二页加载
				that.timer.time2 = window.setTimeout(function() {
					
					// $(".first_page").addClass('unopacty');
					that.timer.time3 = window.setTimeout(function() {$(".bg1").addClass('unopacty')},300)
					that.timer.time4 = window.setTimeout(function() {
						that.firstPage = false;
						that.secondPage = true;
						$(".second_page").addClass('opacty')
					},550)
					that.timer.time5 = window.setTimeout(function() {$(".bg2").addClass('opacty')},900)
					for (var i=0; i<3; i++){
						(function(j){
							that.timer.time6 = window.setTimeout(function() {
								console.log(j)
								$(".second_page .box").eq(j).addClass('opacty')
							}, 1400*(j+1));
						})(i) 
					}
				},4801)
				//第三页加载
				that.timer.time7 = window.setTimeout(function() {
					// $(".second_page").addClass('unopacty');
					that.timer.time8 = window.setTimeout(function() {$(".bg2").addClass('unopacty')},300)
					that.timer.time9 = window.setTimeout(function() {
						that.firstPage = false;
						that.secondPage = false;
						that.thirdPage = true;
						
					$(".third_page").addClass('opacty')
					},550)
					that.timer.time10 = window.setTimeout(function() {$(".bg3").addClass('opacty')},900)
					for (var i=0; i<2; i++){
						(function(j){
							that.timer.time11 = window.setTimeout(function() {
								console.log(j)
								$(".third_page .box").eq(j).addClass('opacty')
							}, 1400*(j+1));
						})(i) 
					}
				},10501)
			})
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
		},
		destroyed(){
			clearInterval(this.timer.time1)
			clearInterval(this.timer.time2)
			clearInterval(this.timer.time3)
			clearInterval(this.timer.time4)
			clearInterval(this.timer.time5)
			clearInterval(this.timer.time6)
			clearInterval(this.timer.time7)
			clearInterval(this.timer.time8)
			clearInterval(this.timer.time9)
			clearInterval(this.timer.time10)
			clearInterval(this.timer.time11)
		}

	}
</script>
<style lang="scss" scoped>
	.landPage {
		width: 100%;
		height: 100%;
		position: relative;
		background-color: #360e57;
		position: relative;
		.contain{
			transition:.8s all; 
		    -webkit-transition:.8s all;
		}
		.click_btn{
			position: fixed;
			left: 0;
			bottom: 0.4rem;
			width: 100%;
			height: 1.413333rem;
			clear: both;
			.middle{
				width: 8.586667rem;
				height: 1.413333rem;
				margin: 0 auto;
				position: relative;
				div{
					float: left;
				}
			}
			
			.left_hand{
				width: 1.413333rem;
				height: 1.413333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/left.png) no-repeat;
				background-size: 1.413333rem;
			}
			.right_hand{
				width: 1.413333rem;
				height: 1.413333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/right.png) no-repeat;
				background-size: 1.413333rem;
			}
			@-moz-keyframes slide {
				0% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
				50% {
					-moz-transform: translateY(-0.4rem);
					-ms-transform: translateY(-0.4rem);
					-webkit-transform: translateY(-0.4rem);
					transform: translateY(-0.4rem);
					// opacity: .5;
				}
				100% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
			}
			@-ms-keyframes slide {
				0% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
				50% {
					-moz-transform: translateY(-0.4rem);
					-ms-transform: translateY(-0.4rem);
					-webkit-transform: translateY(-0.4rem);
					transform: translateY(-0.4rem);
					// opacity: .5;
				}
				100% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
			}
			@-webkit-keyframes slide {
				0% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
				50% {
					-moz-transform: translateY(-0.4rem);
					-ms-transform: translateY(-0.4rem);
					-webkit-transform: translateY(-0.4rem);
					transform: translateY(-0.4rem);
					// opacity: .5;
				}
				100% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
			}
			@keyframes slide {
				0% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
				50% {
					-moz-transform: translateY(-0.4rem);
					-ms-transform: translateY(-0.4rem);
					-webkit-transform: translateY(-0.4rem);
					transform: translateY(-0.4rem);
					// opacity: .5;
				}
				100% {
					-moz-transform: translateY(0rem);
					-ms-transform: translateY(0rem);
					-webkit-transform: translateY(0rem);
					transform: translateY(0rem);
					// opacity: 1;
				}
			}		
			.move_btn{
				width: 5.52rem;
				height: 1.253333rem;
				margin-top: 0.133333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/btn.png) no-repeat;
				background-size: 5.52rem 1.253333rem;
				-webkit-animation: slide 1.5s infinite;
				-moz-animation: slide 1.5s infinite;
				-ms-animation: slide 1.5s infinite;
				animation: slide 1.5s infinite;
			}
		}
		.first_page{
			padding-top: 1rem;
			opacity: 1;
			transition:.8s all; 
			-webkit-transition:.8s all;
			.box{
				margin-bottom: 0.8rem;
			}
			.img1{
				width: 7.88rem;
				height: 3.106667rem;
				margin-left: 0.92rem;
				// margin-bottom: 6.4rem;
			}
			.img2{
				width: 7.213333rem;
				height: 1.333333rem;
				position: fixed;
				left: 0.92rem;
				bottom: 3rem;
				// margin-left: 0.92rem;
			}
		}
		.box{
			font-size: 0.4rem;
		    padding: 0.133333rem 0.4rem;
		    line-height: 0.6rem;
		    opacity: 0;
		    transition:.8s all; 
		    -webkit-transition:.8s all;
		}
		.second_page{
			padding-top: 0.733333rem;
			opacity: 0;
			transition:.8s all; 
			-webkit-transition:.8s all;
			img{
				margin-left: 0.853333rem;
			}
			.img3{width:4.306667rem;height: 1.24rem;margin-bottom: 0.613333rem}
			.img4{width:5.52rem;height: 1.173333rem;margin-bottom:0.586667rem}
			.img5{width: 5.026667rem;height: 1.933333rem;}
		}
		.third_page{
			padding-top: 0.733333rem;
			opacity: 1;
			transition:.8s all; 
			-webkit-transition:.8s all;
			.img6{width:7.786667rem;height:3.293333rem;margin-left: 0.76rem;margin-bottom: 7.0rem}
			.img7{width:5.653333rem;height: 1.533333rem; position: fixed; left: 3.733333rem; bottom: 3.333333rem}
		}
		.btn{
			width: 6.4rem;
			height: 3.693333rem;
			margin: 0 auto;
			opacity: 0;
			transition:.8s all; 
			-webkit-transition:.8s all;
			img{
				width: 100%;
			}
		}
		
		.bg1{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/first_page.png) center center no-repeat;
			background-size: 10rem 20.56rem;
			width: 100%;
			height: 100%;
			opacity: 1;
			transition:.8s all; 
			-webkit-transition:.8s all;
		}
		.bg2{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/second_page.png) center center no-repeat;
			background-size: 10rem 20.56rem;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition:.8s all; 
			-webkit-transition:.8s all;
		}
		.bg3{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteLandPage/third_page.png?v1.1) center center no-repeat;
			background-size: 10rem 20.56rem;
			width: 100%;
			height: 100%;
			opacity: 0;
			transition:.8s all; 
			-webkit-transition:.8s all;
		}
		.opacty{
			opacity: 1 !important;
		}
		.unopacty{
			opacity: 0 !important;
		}
	}
</style>