<template>
	<div id="operData">
		<!-- <wx-header v-if="!osType" :logo="'2017年度运营报告'"></wx-header> -->
		<!-- swiper -->
		<swiper :options="swiperOption" :style="fullHeight">
			<swiper-slide v-for="(v,index) in mySwiper">
				<div class="imgBox" :style="[{background: 'url('+ v +') center center'},imgBox]">
					<!-- <img :src="v"/>  为适配iPhoneX 不能用img只能用背景图片-->
                	<div class="shareBtn" @click="invitation" v-if="index == 16"></div>
				</div>
			</swiper-slide>	
		</swiper>
		<div class="slide-icon" v-if="last"></div>
        <div v-if="showLayer" @click="showLayer = false" v-layer class="layer"></div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; // 头部引入	
    import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
    import wxShare from '../../../../common/wx/wxShare';   // 分享组件
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		mixins: [wxToapp,wxShare],
		data() {
			let that = this;
			return {
				last: true, // 最后一屏的尖头消失
                swiperIndex: 0, // swiperd的下标
                showLayer: false,
				swiperOption: {
					pagination: '.swiper-pagination',
					notNextTick: true,
					paginationClickable: true,
					direction: 'vertical',
					onSlideChangeEnd: function(swiper) {
						that.swiperIndex = swiper.activeIndex;
						that.swiperIndex == 16 ? that.last = false : that.last = true;
					}
				},
				mySwiper:[
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData3.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData4.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData5.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData6.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData7.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData8.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData9.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData10.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData11.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData12.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData13.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData14.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData15.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData16.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/2017yearData17.png'	
                ],
                shareObj: { //分享标题内容配置
                    title: "E都市钱包2017年度运营报告来啦！", //标题
                    desc: "快快点击查看吧",//内容
                    link: global.host+"data/2017YearData", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				},

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
            invitation() {   // 邀请按钮
                let _this = this
                _this.islogin(isInvitation)
                function isInvitation() {
                    if (!_this.osType) {
                        _this.showLayer = true;
                    } else {
                        _this.isLogPassValue(_this.appShare)
                    }
                } 
            }
		},
		mounted: function() {
			this.getWxShareData(this.shareObj); //分享调用
			// MessageBox.confirm( this.fullHeight ).then(action => { }, action => { });
			// alert(this.fullHeight)
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
		.layer {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
            background-size: 100%;
        }
		.slide-icon{
			width: .72rem;
			height: .4rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/operationalData/slide_icon4.png?v=1.0) no-repeat;
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
                .shareBtn{
                    position: absolute;
                    z-index: 99;
                    width: 4.266667rem;
                    height: 1.25rem;
                    top: 9.2rem;
                    left: 50%;
                    margin-left: -2.133333rem;
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