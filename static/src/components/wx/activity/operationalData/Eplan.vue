<template>
	<div id="operData">
		<!-- <wx-header v-if="!osType" :logo="'风险评测过度页'"></wx-header> -->
		<!-- swiper -->
		<swiper :options="swiperOption" :style="fullHeight">
			<swiper-slide v-for="(v,index) in mySwiper">
				<div class="imgBox" :style="[{background: 'url('+ v +') center center'},imgBox]">
					<!-- <img :src="v"/>  为适配iPhoneX 不能用img只能用背景图片-->
				</div>
			</swiper-slide>	
		</swiper>
		<div class="slide-icon" v-if="last"></div>
		<div class="slide-btn">
			<div class="leftBtn" @click="leftBtn"></div>
			<div class="rightBtn" @click="rightBtn"></div>
		</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; // 头部引入	
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		mixins: [wxToapp],
		data() {
			let that = this;
			return {
				last: true, // 最后一屏的尖头消失
				swiperIndex: 0, // swiperd的下标
				swiperOption: {
					pagination: '.swiper-pagination',
					notNextTick: true,
					paginationClickable: true,
					direction: 'vertical',
					onSlideChangeEnd: function(swiper) {
						that.swiperIndex = swiper.activeIndex;
						that.swiperIndex == 3 ? that.last = false : that.last = true;
					}
				},
				mySwiper:[
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/wxEplan1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/wxEplan2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/wxEplan3.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/wxEplan4.png'	
				],

				//  适配iPhoneX 添加的行内样式fullHeight imgBox
				fullHeight:{
					height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
				},
				imgBox: {
					width: "100%",
					height: "100%",
					backgroundSize: "10rem 20.56rem"   // 背景图片的大小以iPhoneX适配的尺寸为准  
				}


			}
		},
		methods: {
			leftBtn (){
				this.$router.push({ path: '/wxRiskAssessment', query: this.$route.query})
			},
			rightBtn (){
				this.toApp('WIP', '/wxInvest')
			},
			Trim (str,is_global){
				let result;
 				result = str.replace(/(^\s+)|(\s+$)/g,"");
				if(is_global.toLowerCase()=="g"){
					result = result.replace(/\s/g,"");
				}
				return result;
			}
		},
		mounted: function() {
			
		},
		components: {
			wxHeader,
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="scss" scoped>
 #operData {
		width: 10rem;
		.header{
		     position: fixed;
		     top: 0;left: 0;
		     z-index: 10;
		     
		}
		.slide-btn{
			width: 10rem;
			height: 1.333333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/operationalData/slide_btn.png) no-repeat;
			background-size:cover ;
			position: fixed;
			bottom: 0;
			margin: auto;
			z-index: 999;
			.leftBtn,.rightBtn{
				width: 50%;
				height: 100%;
				float: left;
			}
		}
		.slide-icon{
			width: 1.066667rem;
			height: .533333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/operationalData/slide_icon3.png?v=1.0) no-repeat;
			background-size:cover ;
			position: fixed;
			bottom: 1.5rem;
			left: 0;right: 0;
			margin: auto;
			z-index: 999;
			-webkit-animation: slide 1.5s infinite;	
			-moz-animation: slide 1.5s infinite;	
			-ms-animation: slide 1.5s infinite;					
			animation:slide 1.5s infinite;					
		}
		.swiper-container {
			height: 16.5rem;
			.swiper-slide {
				width: 10rem;
				position:relative;
				img {
					width: 100%;
					height: 100%;
				}				
			}
			.swiper-slide:last-child .slide-icon{
				background: transparent;
			}
		}
		@-moz-keyframes slide{
			0%{bottom: 1.5rem; opacity: 1;}
			50%{bottom: 2rem; opacity: .5;}
			100%{bottom: 1.5rem;opacity: 1;}
		}
		@-ms-keyframes slide{
			0%{bottom: 1.5rem; opacity: 1;}
			50%{bottom: 2rem; opacity: .5;}
			100%{bottom: 1.5rem;opacity: 1;}
		}
		@-webkit-keyframes slide{
			0%{bottom: 1.5rem; opacity: 1;}
			50%{bottom: 2rem; opacity: .5;}
			100%{bottom: 1.5rem;opacity: 1;}
		}
		@keyframes slide{
			0%{bottom: 1.5rem; opacity: 1;}
			50%{bottom: 2rem; opacity: .5;}
			100%{bottom: 1.5rem;opacity: 1;}
		}
	}
</style>