<template>
	<div id="operData">
		<!-- <wx-header v-if="!osType" :logo="'9月运营报告'"></wx-header> -->
		<!-- swiper -->
		<swiper :options="swiperOption" :style="fullHeight">
			<swiper-slide v-for="(v,index) in mySwiper">
				<div class="imgBox" :style="[{background: 'url('+ v +') center center'},imgBox]">
                	<div class="slide-icon"></div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; // 头部引入	
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		mixins: [wxToapp],
		data() {
			
			return {
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					direction: 'vertical'
				},
				mySwiper:[
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData1.png?v=1.2',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData2.png?v=1.2',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData3.png?v=1.3',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData4.png?v=1.3',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData5.png?v=1.2',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData6.png?v=1.3',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData7.png?v=1.2',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData8.png?v=1.3',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/9yData9.png?v=1.1'	
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
		.swiper-container {
			height: 16.5rem;
			.swiper-slide {
				width: 10rem;
				position:relative;
				img {
					width: 100%;
					height: 100%;
				}				
				@-moz-keyframes slide{
					0%{bottom: 1.2rem; opacity: 1;}
					50%{bottom: 1.7rem; opacity: .5;}
					100%{bottom: 1.2rem;opacity: 1;}
				}
				@-ms-keyframes slide{
					0%{bottom: 1.2rem; opacity: 1;}
					50%{bottom: 1.7rem; opacity: .5;}
					100%{bottom: 1.2rem;opacity: 1;}
				}
				@-webkit-keyframes slide{
					0%{bottom: 1.2rem; opacity: 1;}
					50%{bottom: 1.7rem; opacity: .5;}
					100%{bottom: 1.2rem;opacity: 1;}
				}
				@keyframes slide{
					0%{bottom: 1.2rem; opacity: 1;}
					50%{bottom: 1.7rem; opacity: .5;}
					100%{bottom: 1.2rem;opacity: 1;}
				}
				.slide-icon{
					width: 0.613333rem;
					height: 0.453333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/operationalData/slide_icon2.png?v=1.0) no-repeat;
				    background-size:cover ;
					position: absolute;
					bottom: 1.2rem;
					left: 0;right: 0;
					margin: auto;
					-webkit-animation: slide 1.5s infinite;	
					-moz-animation: slide 1.5s infinite;	
					-ms-animation: slide 1.5s infinite;					
					animation:slide 1.5s infinite;					
				}				
			}
			.swiper-slide:nth-child(1) .slide-icon{
				background: url(https://aliyunsso.edspay.com/web/wx/activity/operationalData/slide_icon1.png?v=1.0) no-repeat;
				background-size:cover ;
			}
			.swiper-slide:nth-child(9) .slide-icon{
				background: transparent;
			}
		}
	}
</style>