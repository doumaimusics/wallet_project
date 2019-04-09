<template>
    <div id="lendIndex">
    	<div v-title>借吧</div>
    	<div class="swiper">
    		<mt-swipe @change="handleChange" :auto="3000" :showIndicators="true">
    			<mt-swipe-item v-for="item in swiper">
    				<div class="img">
    					<img :src="item.swiper" alt="">
    				</div>
    			</mt-swipe-item>
    		</mt-swipe>
    	</div>
    	<div class="textBox">
    		<div v-for="(item,index) in swiper" :style="{background: 'url('+item.text+') center no-repeat'}" :class="{showText:activeIndex == index}" class="swiperText"></div>
    	</div>
    	<a class="tel" href="tel:400-135-338"></a>
    	<div class="bottom">
    		<div @click="toAppStore" v-btn class="btn">立即借款</div>
    	</div>
    </div>
</template>

<script>
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
    export default{
    	data(){
    		return{
    			swiper:[
    				{
    					swiper:'https://aliyunsso.edspay.com/web/wx/activity/drainage/swiper1.png',
    					text:'https://aliyunsso.edspay.com/web/wx/activity/drainage/swiperText1.png'
    				},
    				{
    					swiper:'https://aliyunsso.edspay.com/web/wx/activity/drainage/swiper2.png',
    					text:'https://aliyunsso.edspay.com/web/wx/activity/drainage/swiperText2.png'
    				},
    				{
    					swiper:'https://aliyunsso.edspay.com/web/wx/activity/drainage/swiper3.png',
    					text:'https://aliyunsso.edspay.com/web/wx/activity/drainage/swiperText3.png'
    				},
    			],
    			activeIndex:0,
    		}
    	},
    	methods:{
    		handleChange(index){
    			this.activeIndex = index;
    		},
            toAppStore(){
                window._czc.push(["_trackEvent",'H5借吧','下载按钮']);
                window.location.href = 'https://a.app.qq.com/o/simple.jsp?pkgname=com.rd.chux&ADTAG=mobile';
            }
    	},
    	created(){
    		
    	},
    	mounted(){
    		// 数据统计
    		const script = document.createElement('script')
    		script.src = 'https://s13.cnzz.com/z_stat.php?id=1275841040&web_id=1275841040'
    		script.language = 'JavaScript'
    		document.body.appendChild(script);
    	}
    }
</script>

<style lang="scss" scoped>
    #lendIndex{
    	height: 37.586667rem;
    	background: url('https://aliyunsso.edspay.com/web/wx/activity/drainage/lendBg.png') no-repeat;
    	background-size: 100% 100%;
		padding-top: 6.946667rem;
    	.swiper{
			height: 3.893333rem;
			width: 8.24rem;
			margin: 0 auto;
			img{
				width:100%;
				height:3.893333rem;
			}
		}
		.textBox{
    		height: 4.3rem;
			width: 6.12rem;
			overflow: hidden;
			margin-left: 0.88rem;
			position: relative;
			.swiperText{
				height:2.2rem;
				width:6.12rem;
				position: absolute;
				top: 0.4rem;
				left: 0;
				z-index:2;
				opacity: 0;
			}
			.showText{
				opacity: 1;
				transition: all 0.6s;
				background-size: 100% 100%!important;
			}
		}
		.tel{
			height: 0.6rem;
			width: 2.666667rem;
			display: block;
			position: fixed;
			bottom: 2.35rem;
			left: 3.626667rem;
		}
		.bottom{
			background: #FFFFFF;
			box-shadow: 0 0 12px 0 rgba(0,0,0,0.10);
			height: 1.306667rem;
			width:100%;
			position: fixed;
			bottom: 0;
			left: 0;
			padding-top: 0.12rem;
			.btn{
				a{
					display:block;
					height: 100%;
					width: 100%;
					color: #fff;
				}
			}
		}
    }
</style>