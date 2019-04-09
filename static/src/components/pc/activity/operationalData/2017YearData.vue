<template>
	<div id="yearData">
        <swiper :options="swiperOptions">
            <swiper-slide v-for="(v,index) in mySwipers">
            <img :src="v"/>
        </swiper-slide>	
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
	</div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	export default {
		data() {
			let that = this;
			return {
                swiperOptions: {
                    mousewheelControl : true,
                    pagination : '.swiper-pagination',
                    paginationClickable :true,
                    // paginationBulletRender: function (swiper, index, className) {
                    //     return '<span class="' + className + '">' + (index + 1) + '</span>';
                    // },
                    direction: 'vertical',
                },
				mySwipers:[
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc3.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc4.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc5.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc6.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc7.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc8.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc9.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc10.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc11.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc12.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc13.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc14.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc15.png',
					'https://aliyunsso.edspay.com/web/wx/activity/operationalData/yearDataPc16.png'
				]
			}
		},
		methods: {

		},
		mounted: function() {

		},
		components: {
			swiper,
			swiperSlide
		}
	}
</script>
<style lang="scss">
 #yearData {
        .swiper-pagination-switch {
            cursor: pointer;
        }
        .swiper-container-vertical > .swiper-pagination-bullets{
            right: 20px;
        }
        .swiper-pagination-bullet{
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background: #046A87;
            margin: 10px 0;
        }
        .swiper-pagination-bullet-active{
            background: #F4C98E;
            margin: 16px 0;
            width: 12px;
            height: 12px;
        }
        .swiper-active-switch {
        background: #fff;
        }
    .swiper-container{
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 9999999;
    }
        .swiper-slide{
            position: relative;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
        }
        img{
            width: 100%;
            height: 100%;
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