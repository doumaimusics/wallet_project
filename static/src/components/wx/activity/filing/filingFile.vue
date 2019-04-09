<template>
    <div id="filingFile">
        <div v-title>尽调资料清单</div>
        <div class="proveBox">
            <!-- <swiper :options="swiperOption"> -->
            <swiper :options="swiperOption" ref="mySwiper" :style="[fullHeight,{background: '#fff'}]">
				<swiper-slide v-for="(kaValue,index) in 16">
                    <div class="imgBox" :style="[{background:'url(https://aliyunsso.edspay.com/web/wx/activity/filing/filePic'+kaValue+'.png)no-repeat center center / 10rem 17.786667rem'}]"></div>
                </swiper-slide>
			</swiper>
            <!-- <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div> -->
            <div class="scrollbar">{{swiperIndex+1}}/16张</div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'
    export default {
        mixins: [wxToapp],
        data() {
            let that = this;
            return {
                swiperIndex: 0, // swiperd的下标
                swiperOption: {      // 轮播配置
                    pagination: ".swiper-pagination",
                    direction: 'vertical',
                    slidesPerView: 'auto',
                    notNextTick: true,
                    paginationClickable: true,   // 点击分页器
                    longSwipesRatio: 0.2,        // 滑动距离比例
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    onSlideChangeEnd: function(swiper) {
                        that.swiperIndex = swiper.activeIndex;
                    }
                },
                fullHeight:{
                    height: document.documentElement.clientHeight+6+"px"  //获取手机可视区域的的高度
                },
            }
        },
        methods: {

        },
        created: function() {
            this.PassValue('NavWhite_尽调资料清单');
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #filingFile{
        width: 100%;
        overflow: hidden;
        .proveBox{
            .swiper-container{
                height: 16rem;
                .swiper-slide {
                    width: 10rem;
                    position: relative;
                    .imgBox{
                        width: 100%;
                        height: 100%;
                    }
                }
            }
		    .swiper-button-prev, .swiper-button-next {
                position: absolute;
                left: 50%;
                width: .933333rem;
                height: .533333rem;
                margin-left: -0.466667rem;
                margin-top: 0;
                z-index: 10;
                cursor: pointer;
                -moz-background-size: .933333rem .533333rem !important;
                -webkit-background-size: .933333rem .533333rem !important;
                background-size: .933333rem .533333rem !important;
                background-position: center;
                background-repeat: no-repeat;
            }
            .swiper-button-prev, .swiper-container-rtl .swiper-button-next {
                background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/prev.png);
                top: .666667rem;
            }
            .swiper-button-next, .swiper-container-rtl .swiper-button-prev {
                background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/next.png);
                top: 100%;
                margin-top: -1.253333rem;
            }
            .swiper-button-prev.swiper-button-disabled, .swiper-button-next.swiper-button-disabled {
                opacity: 0;
            }
            .scrollbar{
                width: 2rem;
                position: absolute;
                text-align: center;
                z-index: 11;
                transform: rotate(90deg);
                -webkit-transform: rotate(90deg);
                -moz-transform: rotate(90deg);
                -ms-transform: rotate(90deg);
                -o-transform: rotate(90deg);
                font-family: PingFang-SC-Regular;
                font-size: .346667rem;
                color: #666666;
                letter-spacing: .026667rem;
                top: 50%;
                margin-top: -1rem;
                margin-left: -.5rem;
            }
		}
    }
</style>
