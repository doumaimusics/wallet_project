<template>
    <div id="exhibition">
        <div v-title>不瞒你说，我真的不勇敢</div>
        <div id="mc_play" @click="play_music" :class="{clo:!isPlay}" class="music">
            <audio autoplay="autoplay" ref="audio" id="musicfx" loop="loop">  
                  <source src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/TKZC.mp3" type="audio/mpeg"> 
                  <source src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/TKZC.ogg" type="audio/mpeg"> 
              </audio>  
        </div>
        <swiper ref="mySwiper" :options="swiperOption" :style="[fullHeight,{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/BG.png) center center / 10rem 20.56rem'}]">
            <swiper-slide>
                <div :style="[fullHeight,{background:'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page0.gif?v='+random+') no-repeat'}]" class="page page0"></div>
            </swiper-slide>
            <swiper-slide>
                <div v-if="swiperIndex == 1" :style="fullHeight" class="page page1">
                    <div class="textBox">
                        <div v-if="showText" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page1Text.gif?v='+random+') no-repeat'}" class="text"></div>
                    </div>
                    <div class="salesclerk">
                        <div v-if="page1.showPer" class="talk">
                            <div v-if="page1.perTalk1" class="perTalk1"></div>
                            <div v-if="page1.perTalk2" class="perTalk2"></div>
                            <div v-if="page1.perTalk3" class="perTalk3"></div>
                        </div>
                    </div>
                    <div :style="{background:'url('+missImg+')'}" class="miss">
                        <!-- <div v-if="showFace" class="face"></div> -->
                        <div ref="package" class="package"></div>
                        <div v-if="page1.showMiss" class="talk">
                            <div v-if="page1.missTalk1" class="talk1"></div>
                            <div v-if="page1.missTalk1" class="talk2"></div>
                        </div>
                    </div>
                    <div v-if="page1.showPage1 && start" id="perfume" @touchstart.prevent="movePerfume" @touchend="moveFinish" :class={per:page1_isTouch} :style="{position:'absolute'}" ref="perfume" class="perfume"></div>
                    <div v-else-if="!start" id="perfume" :class={per:page1_isTouch} :style="{position:'absolute'}" ref="perfume" class="perfume"></div>
                    <div v-if="page1.guidance" class="guidance move">
                        <div class="arrows"></div>
                        <div class="hand"></div>
                    </div>
                </div>
            </swiper-slide>
            <swiper-slide>
                <page-two v-if="swiperIndex == 2" :showBottom="showBottom" :swiperOption="swiperOption" :swiper="$refs.mySwiper"></page-two>
            </swiper-slide>
            <swiper-slide>
                <page-three v-if="swiperIndex == 3" :showBottom="showBottom" :swiperOption="swiperOption" :swiper="$refs.mySwiper"></page-three>
            </swiper-slide>
            <swiper-slide>
                <page-four v-if="swiperIndex == 4" :showBottom="showBottom" :swiperOption="swiperOption" :swiper="$refs.mySwiper"></page-four>
            </swiper-slide>
            <swiper-slide>
                <page-five v-if="swiperIndex == 5" :showBottom="showBottom" :swiperOption="swiperOption" :swiper="$refs.mySwiper"></page-five>
            </swiper-slide>
            <swiper-slide>
               <page-six v-if="swiperIndex == 6" :showLayer="showLayer" :showBottom="showBottom" :swiperOption="swiperOption" :swiper="$refs.mySwiper"></page-six>
            </swiper-slide>
        </swiper>
        <div v-if="showBottom.show" class="slide-icon"></div>
        <div @click="close" v-if="showLayer.show" v-layer class="layer">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/page6/icon.png" alt="">
        </div>
    </div>
</template>

<script> 
    import pageTwo from './page/page2.vue';
    import pageThree from './page/page3.vue';
    import pageFour from './page/page4.vue';
    import pageFive from './page/page5.vue';
    import pageSix from './page/page6.vue';
    import wxShare from '../../../../common/wx/wxShare'
    export default{
        mixins:[wxShare],
        // metaInfo: {
        //     title: '不瞒你说，我真的不勇敢' // set a title
        // },
    	data(){
            let that = this;
    		return{
                shareObj: { //分享标题内容配置
                    title: "不瞒你说，我真的不勇敢", //标题
                    desc: "谁来帮帮我？",//内容
                    link: global.host+"exhibition", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/exhibition/fenxiang.png" //图片链接
                },
                isPlay:true,//是否在播放
                showText:false,
                random:Math.random()*100,
                showLayer:{
                    show:false,
                },
                missImg:'https://aliyunsso.edspay.com/web/wx/activity/exhibition/missBefore.png',
                showFace:false,
                showBottom:{show:false},
                start:false,
                swiperIndex:0,
                swiperOption: {
                  notNextTick:true,
                  direction: 'vertical',
                  onlyExternal : true, 
                  allowSlidePrev:false,
                  swipeToPrev:false,
                  initialSlide:0,
                  onSlideChangeEnd: function(swiper) {
                      that.swiperIndex = swiper.activeIndex;
                      that.swiperOption.onlyExternal = true;
                      that.swiperOption.allowSlidePrev = false;
                      that.swiperOption.swipeToPrev = false;
                      that.showBottom.show = false;
                      
                  },
                  pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                  },
                },
                //  适配iPhoneX 添加的行内样式fullHeight imgBox
                fullHeight:{
                  height: document.documentElement.clientHeight+2+"px"  //获取手机可视区域的的高度
                },
                page1:{
                    firstMove:true,
                    pageX:0,
                    pageY:0,
                    showPage1:true,
                    guidance:false,
                    showMiss:false,
                    missTalk1:false,
                    missTalk2:false,
                    showPer:false,
                    perTalk1:false,
                    perTalk2:false,
                    perTalk3:false,
                },
                page1_isTouch:false,
                pageTimer:null,
            }
    	},
        computed: {
            swiper() {
              return this.$refs.mySwiper.swiper
            },
            aa(){
                return 0;
            }
        },
    	methods:{
            play_music(){
                if(this.isPlay){
                    this.$refs.audio.pause();
                }else{
                    this.$refs.audio.play();
                }
                this.isPlay = !this.isPlay
            },
            close(){
                this.showLayer.show = false;
            },
            movePerfume(even){
                this.page1.guidance = false;
                var that = this;
                that.page1.perX = even.changedTouches[0].clientX - this.$refs.perfume.getBoundingClientRect().left;
                that.page1.perY = even.changedTouches[0].clientY - this.$refs.perfume.getBoundingClientRect().top;


                    if(this.page1.firstMove){

                        $('#perfume').animate({
                            height:1.4 + 'rem',
                            width:0.97 + 'rem',
                            top:10.1 + 'rem',
                            left:4.82 + 'rem',
                        },500,function(){
                            that.page1.perX = even.changedTouches[0].clientX - that.$refs.perfume.getBoundingClientRect().left;
                            that.page1.perY = even.changedTouches[0].clientY - that.$refs.perfume.getBoundingClientRect().top;
                            that.$refs.perfume.style.zIndex = 999;
                            that.page1.firstMove = false;
                            that.page1.guidance = false;

                            that.$refs.perfume.style.top = even.changedTouches[0].clientY + 'px';
                            that.$refs.perfume.style.left = even.changedTouches[0].clientX  + 'px';

                            that.$refs.perfume.addEventListener('touchmove', (e) => {
                                that.$refs.perfume.style.top = (e.changedTouches[0].clientY) + 'px';
                                that.$refs.perfume.style.left = (e.changedTouches[0].clientX)  + 'px';
                                
                                var perfume = that.$refs.perfume.getBoundingClientRect();
                                var pack = that.$refs.package.getBoundingClientRect();

                                if(perfume.left <= (pack.left + that.$refs.package.offsetWidth-10) && perfume.left >= (pack.left) && (perfume.top + that.$refs.perfume.offsetHeight - 10) >= pack.top && perfume.top <= (pack.top + that.$refs.package.offsetHeight)){
                                    that.page1.showPage1 = false;

                                    that.swiperOption.onlyExternal = false;
                                    that.swiper.lockSwipeToPrev();
                                    that.showBottom.show = true;
                                    that.page1.showMiss = false;
                                    that.page1.showPer = false;
                                    that.missImg = 'https://aliyunsso.edspay.com/web/wx/activity/exhibition/missAfter.png';
                                    that.showFace = true;
                                    console.log(that.swiperOption)

                                    // setTimeout( () =>{
                                    //     that.swiper.slideNext();
                                    // },1000)
                                }
                            })
                            
                        });  
                    }


            },
            moveFinish(){
                clearTimeout(this.pageTimer)
            },
            alterValue(key,value,time){
                setTimeout(() =>{
                    key = value;

                },time)
            }
    	},
        components:{
            pageTwo,
            pageThree,
            pageFour,
            pageFive,
            pageSix,
        },
    	created(){
    		
    	},
        watch:{
            'swiperIndex'(val){
                if(val == 0){
                    setTimeout( ()=>{
                        this.showBottom.show = true;
                        this.swiperOption.onlyExternal = false;
                        
                    },5600)
                }
                if(val == 1){

                    setTimeout( ()=>{
                        this.showText = true;
                    },500)
                    setTimeout(() =>{
                        this.page1.showMiss = true;
                    },4500)
                    setTimeout(() =>{
                        this.page1.missTalk1 = true;
                    },4500)
                    setTimeout(() =>{
                        this.page1.missTalk2 = true;
                    },4500)
                    setTimeout(() =>{
                        this.page1.showPer = true;
                    },5000)
                    setTimeout(() =>{
                        this.page1.perTalk1 = true;
                    },5000)
                    setTimeout(() =>{
                        this.page1.perTalk2 = true;
                    },5300)
                    setTimeout(() =>{
                        this.page1.perTalk3 = true;
                    },5600)
                    setTimeout(() =>{
                        this.page1.guidance = true;
                    },6200)
                    setTimeout( ()=>{
                        this.start = true;
                    },6200)
                }
            }
        },
        mounted(){
            this.getWxShareData(this.shareObj); //分享调用
            setTimeout( ()=>{
                this.showBottom.show = true;
                this.swiperOption.onlyExternal = false;
                
            },5600)
            console.log(this.swiper.activeIndex)

            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274227187&web_id=1274227187'
            script.language = 'JavaScript'
            document.body.appendChild(script)
            

        }
    }
</script>

<style lang="scss" scoped>
    #exhibition{
        width:100%;
            .music{
                
            }
            .clo{
                
            }
            .music{
                height: 0.8rem;
                width: 0.8rem;
                background: red;
                position: fixed;
                z-index:136;
                top: 0.6rem;
                right: 0.2rem;
                background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/open.png) no-repeat;
                background-size:100% 100%!important;
                -webkit-animation: rotating 1.5s linear infinite;animation: rotating 2s linear infinite;
            }
            .clo{
                background:url(https://aliyunsso.edspay.com/web/wx/activity/receiveRed/clase.png) no-repeat;
                animation:rotating;
            }
        @-webkit-keyframes rotating {
            from{
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -ms-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            to{
                -webkit-transform: rotate(360deg);
                -moz-transform: rotate(360deg);
                -ms-transform: rotate(360deg);
                -o-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        @keyframes rotating {
            from{
                -webkit-transform: rotate(0deg);
                -moz-transform: rotate(0deg);
                -ms-transform: rotate(0deg);
                -o-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            to{
                -webkit-transform: rotate(360deg);
                -moz-transform: rotate(360deg);
                -ms-transform: rotate(360deg);
                -o-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        .layer{
            img{
                height:2.64rem;
                width:6.133333rem;
                position: absolute;
                right:0.666667rem;
                top:0.666667rem;
            }
        }
        .swiper-container {
            height: 16rem;
            .swiper-slide {
                .page{
                    position: relative;
                    // height:17.733333rem;
                    width:100%;
                    top: 0;
                    bottom: 0;
                    margin: auto 0;
                }
                .page0{
                    background:url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page0.gif) no-repeat;
                    background-size: 100% 100%!important;
                }
                .page1{
                    .text{
                        height:4.8rem;
                        width: 8.16rem;
                        margin:0 auto;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page1Text.png') no-repeat;
                        background-size:100% 100%!important;
                        position: relative;
                        left:0.3rem;
                        // top:0.88rem;
                    }
                    .miss{
                        position: absolute;
                        top:6.1rem;
                        // left:-3.8rem;
                        left:0.7rem;
                        height:9.12rem;
                        width:3.706667rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/missBefore.png') no-repeat;
                        background-size:100% 100%!important;
                        // animation: miss 2s linear forwards;
                        .face{
                            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/face1.png') no-repeat;
                            background-size:100% 100%;
                            position: absolute;
                            top:0.8rem;
                            left:1.226667rem;
                            height:0.853333rem;
                            width:1.093333rem;
                        }
                        .package{
                            height:1.286667rem;
                            width:1.5rem;
                            margin:3.266667rem 0 0 1.3rem;
                        }
                        .talk{
                            position: absolute;
                            height:2.666667rem;
                            width:2.8rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/bubble2.png') no-repeat;
                            background-size:100% 100%;
                            top:5.3rem;
                            left:2.5rem;
                            z-index:123;
                        }
                        .talk1{
                            position: absolute;
                            height:0.586667rem;
                            width:0.96rem;
                            top:0.533333rem;
                            left:0.73rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/miss_1.png') no-repeat;
                            background-size:100% 100%;
                        }
                        .talk2{
                            position: absolute;
                            height:0.96rem;
                            width:2.186667rem;
                            top:1.093333rem;
                            left:0.41rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/miss_2.png') no-repeat;
                            background-size:100% 100%;
                        }
                    }
                    .salesclerk{
                        position: absolute;
                        top:5.2rem;
                        right:0.266667rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/salesclerk.png') no-repeat;
                        background-size:100% 100%;
                        height:9.733333rem;
                        width:5.52rem;
                        .talk{
                            width:2.933333rem;
                            height:2.88rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/bubble1.png') no-repeat;
                            background-size:100% 100%;
                            position: absolute;
                            top:-0.8rem;
                            left:-0.693333rem;
                            .perTalk1{
                                width:2.426667rem;
                                height:0.906667rem;
                                background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/sale_1.png') no-repeat;
                                background-size:100% 100%;
                                position: absolute;
                                top:0.586667rem;
                                left:0.293333rem;
                            }
                            .perTalk2{
                                width:2.426667rem;
                                height:0.906667rem;
                                background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/sale_2.png') no-repeat;
                                background-size:100% 100%;
                                position: absolute;
                                top:1.226667rem;
                                left:0.16rem;
                            }
                            .perTalk3{
                                width:1.653333rem;
                                height:0.64rem;
                                background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/sale_3.png') no-repeat;
                                background-size:100% 100%;
                                position: absolute;
                                top:1.95rem;
                                left:0.5rem;
                            }
                        }
                    }
                    .perfume{
                        position: absolute;
                        top:7.7rem;
                        left:3.94rem;
                        height:4.273333rem;
                        width:2.9rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/perfume.png') no-repeat;
                        background-size:100% 100%;
                    }
                    .guidance{
                        position: relative;
                        top:2.8rem;
                        left:3.1rem;
                        width:2.133333rem;
                        .arrows{
                            height:2.586667rem;
                            width:2.373333rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/arrows.png') no-repeat;
                            background-size:100% 100%;
                        }
                        .hand{
                            height:0.88rem;
                            width:0.64rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/hand.png') no-repeat;
                            background-size:100% 100%;
                            position: absolute;
                            top:0.6rem;
                            left:2.24rem;
                            animation: handMove 1.5s linear infinite;
                        }
                        .move{
                        }
                    }
                    .per{
                        animation: shrink 1s linear forwards;
                    }
                }
            }
        }
        @keyframes shrink{
            0%,50%{
                height:2.85rem;
                width:1.83rem;
                top:10.2rem;
                left:4.33rem;
            }
            50%,100%{
                height:1.4rem;
                width:0.97rem;
                top:11.1rem;
                left:4.82rem;
            }
        }
        @keyframes miss{
            0%,10%{
                left:-3.8rem;
            }
            10%,30%{
                left:-2.3rem;
            }
            30%,60%{
                left:-0.8rem;
            }
            60%,100%{
                left:0.8rem;
            }
        }
        @keyframes handMove{
            0%,90%{
                top:-0.05rem;
                left:2.3rem;
            }
            90%,100%{
                top:2.5rem;
                left:-0.6rem
            }
        }

        .slide-icon {
          width: 1.066667rem;
          height: 0.533333rem;
          background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/icon.png) no-repeat;
          background-size: 100%;
          position: absolute;
          bottom: 0.9rem;
          left: 0;
          right: 0;
          margin: auto;
          z-index: 9;
          -webkit-animation: slide 1.5s infinite;
          -moz-animation: slide 1.5s infinite;
          -ms-animation: slide 1.5s infinite;
          animation: slide 1.5s infinite;
        }
        .slide-icon.active {
          background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/icon.png) no-repeat;
          background-size: 100%;
        }
        .slide-icon.last {
          display: none;
        }
        @-moz-keyframes slide {
          0% {
            bottom: 0.8rem;
            opacity: 1;
          }
          50% {
            bottom: 1.3rem;
            opacity: 0.5;
          }
          100% {
            bottom: 0.8rem;
            opacity: 1;
          }
        }
        @-ms-keyframes slide {
          0% {
            bottom: 0.8rem;
            opacity: 1;
          }
          50% {
            bottom: 1.3rem;
            opacity: 0.5;
          }
          100% {
            bottom: 0.8rem;
            opacity: 1;
          }
        }
        @-webkit-keyframes slide {
          0% {
            bottom: 0.8rem;
            opacity: 1;
          }
          50% {
            bottom: 1.3rem;
            opacity: 0.5;
          }
          100% {
            bottom: 0.8rem;
            opacity: 1;
          }
        }
        @keyframes slide {
          0% {
            bottom: 0.8rem;
            opacity: 1;
          }
          50% {
            bottom: 1.3rem;
            opacity: 0.5;
          }
          100% {
            bottom: 0.8rem;
            opacity: 1;
          }
        }
    }
</style>