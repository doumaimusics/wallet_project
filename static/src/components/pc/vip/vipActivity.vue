<template>
    <div id="vipActivity">
        <swiper :options="swiperOption">
            <swiper-slide>
                <img class="page1 page" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/pcPage1.png?" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="page2 page" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/pcPage2.png?" alt="">
            </swiper-slide>
            <swiper-slide>
                <img class="page3 page" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/pcPage3.png?" alt="">
            </swiper-slide>
            <swiper-slide>
                <div @click="showQcode" class="btn"></div>
                <img class="page4 page" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/pcPage4.png?" alt="">
            </swiper-slide>
        </swiper>   
        <div v-if="swiperIndex != 3" class="slide-icon"></div>
        <el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" custom-class="dialogclass" center>
            <div class="erMa"></div>
            <p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP查看详情</p>
        </el-dialog>
    </div>
</template>

<script>
    import { MessageBox } from 'element-ui';
    export default{
    	data(){
            let that = this;
    		return{
                isOpenTwo:false,
                randomNum:0,
                swiperIndex:0,
                swiperOption: {
                    direction: 'vertical',
                    pagination: '.swiper-pagination',
                    paginationClickable :true,
                    mousewheelControl : true,
                    onSlideChangeEnd: function(swiper) {
                      that.swiperIndex = swiper.activeIndex;
                      that.randomNum = that.getRandom(0,120);
                    }
                },
    		}
    	},
    	methods:{
            getRandom(start,end){//生成随机数
                var length = end - start;
                var num = parseInt(Math.random() * (length) + start);
                return num;
            },
            showQcode(){ //显示弹框
                this.isOpenTwo = true;
            }
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #vipActivity{
        height:760px;
        width:1200px;
        margin:0 auto;
        padding: 20px 0;
        position: relative;
        .erMa {
            width: 230px;
            height: 230px;
            margin: 0 auto;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/erweimaxin.png?v=1.1) no-repeat;
            background-size: cover;
            margin-bottom: 20px;
        }
        .main{
            width: 1200px;
            margin: 0 auto;
            img{
                display: block;
                width: 100%;
                margin:30px 0 40px 0;
            }
        }
        .inioP {
            text-align: center;
        }
        .el-message-box__content .el-message-box__message p{
            text-align: center;
        }
        .swiper-container{
            height:720px;
            width:1200px;
            .swiper-slide{
                height:720px!important;
                width:1200px;
                position: relative;
                .btn{
                    height:90px;
                    width:499px;
                    position: absolute;
                    top:534px;
                    left:64px;
                }
            }
            .page{
                height:720px;
                width:1200px;
                display:block;
            }
        }
        @-moz-keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        @-ms-keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        @-webkit-keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        @keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        .slide-icon {
            width: 60px;
            height: 36px;
            background: url(https://aliyunsso.edspay.com/web/wx/vip/vipActivity/pcIcon.png) no-repeat;
            background-size: 100%;
            position: absolute;
            bottom: 10px;
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
</style>