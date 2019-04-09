<template>
    <div class="approve-div">
        <img src="https://aliyunsso.edspay.com/web/about/wxDisclosure2.png"/>
        <div class="btn1" @click="proveVisibleTow = true"></div>
        <!-- 遮罩 -->
        <div v-layer class="proveBox" v-if="proveVisibleTow" @click="proveVisibleTow = false">
            <swiper :options="swiperOption">
				<swiper-slide v-for="(kaValue,index) in imageData" :style="{background:'url('+kaValue+')'}"></swiper-slide>
			</swiper>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return{
            proveVisibleTow:false,
            imageData:[
                'https://aliyunsso.edspay.com/web/about/wxDisclosure7.png',
                'https://aliyunsso.edspay.com/web/about/wxDisclosure9.png',
                'https://aliyunsso.edspay.com/web/about/wxDisclosure8.png',
            ],
            swiperOption: {      // 轮播配置
                slidesPerView: 'auto',
                centeredSlides: true,  //为中心的幻灯片
                spaceBetween: 0,    // 图片之间的间距
                initialSlide:0     // 初始化显示得张图片
                // loop:true   // 是否循环轮播
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .approve-div {
        img {
            width: 100%;
            height: 47.373333rem;
        }
        .btn1{
            position: absolute;
            left: 4.8rem;
            top: 7.2rem;
            width: 1.346667rem;
            height: .493333rem;
        }
        .proveBox{
		    .swiper-wrapper{
                margin: 0 auto;
				background:transparent;
			.swiper-slide{
				width: 7.746667rem;
				height: 10.933333rem;
				transform: scale(.8);
				background-size:100% 100%!important;
				position: relative;
                margin-top: 2rem;
			}
			.swiper-slide.swiper-slide-active{
				transform: scale(1);
				transition: all 0.7s;
			}

		} 
		.swiper-slide-active{
				background-size:cover; 
		}
		}	
    }
</style>

