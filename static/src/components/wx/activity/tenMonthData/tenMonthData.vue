<template>
	<div id="operData">
		<!-- swiper -->
		<swiper :options="swiperOption" :style="fullHeight">
			<swiper-slide v-for="(v,index) in mySwiper">
				<div class="imgBox" :style="[{background: 'url('+ v +') center center'},imgBox]">
					<!-- <img :src="v"/>  为适配iPhoneX 不能用img只能用背景图片-->
                	<div class="slide-icon"></div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
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
				mySwiper: [
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy3.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy4.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy5.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy6.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy7.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy8.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy9.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy10.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy11.png',
					'https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/tenyy12.png'

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
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="scss" scoped>
	#operData {
		width: 10rem;
		height: 16.5rem;
		.swiper-container {
			height: 100%;
			.swiper-slide {
				width: 10rem;
				position: relative;
				img {
					width: 100%;
					height: 100%;
				}
				@-moz-keyframes slide {
					0% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
					50% {
						-moz-transform: translateY(-0.8rem);
						-ms-transform: translateY(-0.8rem);
						-webkit-transform: translateY(-0.8rem);
						transform: translateY(-0.8rem);
						opacity: .5;
					}
					100% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
				}
				@-ms-keyframes slide {
					0% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
					50% {
						-moz-transform: translateY(-0.8rem);
						-ms-transform: translateY(-0.8rem);
						-webkit-transform: translateY(-0.8rem);
						transform: translateY(-0.8rem);
						opacity: .5;
					}
					100% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
				}
				@-webkit-keyframes slide {
					0% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
					50% {
						-moz-transform: translateY(-0.8rem);
						-ms-transform: translateY(-0.8rem);
						-webkit-transform: translateY(-0.8rem);
						transform: translateY(-0.8rem);
						opacity: .5;
					}
					100% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
				}
				@keyframes slide {
					0% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
					50% {
						-moz-transform: translateY(-0.8rem);
						-ms-transform: translateY(-0.8rem);
						-webkit-transform: translateY(-0.8rem);
						transform: translateY(-0.8rem);
						opacity: .5;
					}
					100% {
						-moz-transform: translateY(0rem);
						-ms-transform: translateY(0rem);
						-webkit-transform: translateY(0rem);
						transform: translateY(0rem);
						opacity: 1;
					}
				}
				.slide-icon {
					width: 0.613333rem;
					height: 0.453333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/Group1.png?v=1.0) no-repeat;
					background-size: cover;
					position: absolute;
					bottom: 1rem;
					left: 0;
					right: 0;
					margin: auto;
					z-index: 999;
					-webkit-animation: slide 1.5s infinite;
					-moz-animation: slide 1.5s infinite;
					-ms-animation: slide 1.5s infinite;
					animation: slide 1.5s infinite;
				}
				
			}
			.swiper-slide:nth-child(1) .slide-icon,
				.swiper-slide:nth-child(10) .slide-icon,
				.swiper-slide:nth-child(11) .slide-icon {
					background: url(https://aliyunsso.edspay.com/web/wx/activity/tenMonthData/Group2.png?v=1.0) no-repeat;
					background-size: cover;
				}
				.swiper-slide:nth-child(12) .slide-icon {
					background: transparent;
				}
		}
	}
</style>