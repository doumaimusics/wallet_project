<template>
    <div id="borrow">
    	<div class="wrap">
            <div class="steps step1"></div>
            <div class="steps step2">
                <swiper :options="swiperOption">
                    <swiper-slide v-for="item in scrollImg" :style="{background:'url('+item+') no-repeat center center / 100% 100%'}">
                        
                    </swiper-slide>
                    <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
            <div class="steps step3"></div>
            <div class="steps step4"></div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                scrollImg:[
                    'https://aliyunsso.edspay.com/web/addBorrow/swipe1.png',
                    'https://aliyunsso.edspay.com/web/addBorrow/swipe2.png',
                    'https://aliyunsso.edspay.com/web/addBorrow/swipe3.png'
                ],
                swiperOption: {
                  pagination : '.swiper-pagination',
                  loop:true,
                  autoplay:3000,
                }
            }
        },
        methods: {
        },
        created() {
           
        },
    }
</script>
<style lang="scss">
    #borrow{
        .swiper-container{
            height: 464px;
        }
        .swiper-slide{
            width: 1200px;
            height: 350px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .swiper-pagination-bullet{
            width: 10px;
            height: 10px;
            display: inline-block;
            border-radius: 100%;
            background: #D08400;
            opacity: 0.5;
        }
        .swiper-pagination-bullet-active{
            background: #D08400;
            opacity: 1;
        }
        .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{
            bottom: 50px;
        }
    }
</style>
<style lang="scss" scoped>
    #borrow{
    	position: relative;
    	background: #f8f8f8;
    	.wrap{
			width:1200px;
			margin:0 auto;
			position: relative;
            padding-bottom: 1px;
            .steps{
                width: 100%;
                margin-bottom: 20px;
            }
            .step1{
                height: 420px;
                background: url(https://aliyunsso.edspay.com/web/addBorrow/head_bg.png?v1.1) no-repeat;
                background-size: cover;
            }
            .step2{
                height: 658px;
                background: url(https://aliyunsso.edspay.com/web/addBorrow/find.png) no-repeat;
                background-size: cover;
                padding-top: 193px;
            }
            .step3{
                height: 551px;
                background: url(https://aliyunsso.edspay.com/web/addBorrow/introdution.png?v1.1) no-repeat;
                background-size: cover;
            }
            .step4{
                height: 365px;
                background: url(https://aliyunsso.edspay.com/web/addBorrow/progress.png) no-repeat;
                background-size: cover;
            }
    	}
    }
</style>