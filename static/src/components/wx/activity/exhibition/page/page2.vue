<template>
    <div class="page page2">
        <div class="textBox">
            <div v-if="showText" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/page2text.gif?v='+random+') no-repeat'}" class="text"></div>
        </div>
        <div class="baskets">
            <div :class="{hasEgg:edsBasket}" ref="basket" class="edsBasket"></div>
        </div>
        <div :style="{background:'url('+peopleImg+') no-repeat'}" class="people">
            <div v-if="showHand" class="peopleHand"></div>
        </div>
        <div v-if="guidance" class="guidance">
            <div class="arrows"></div>
            <div class="hand"></div>
        </div>
        <div v-if="showEgg && start"  @touchstart.prevent="touchEgg"  id="egg" ref="egg" class="egg">
            <img v-if="eggImg" src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/egg.png" alt="">
        </div>
        <div v-else-if="!start"  :class="{showEgg:eggImg}" id="egg" ref="egg" class="egg"></div>

    </div>
    
</template>

<script>
    export default{
        data(){
            return{
                showText:false,
                random:Math.random()*100,
                start:false,
                showHand:false,
                firstMove:true,//是否第一次移动
                edsBasket:false,
                guidance:false,
                showEgg:true,
                eggImg:false,
                eggX:0,
                eggY:0,
                peopleImg:'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/peopleBefore.png'
            }
        },
        props:['swiper','swiperOption','showBottom'],
        methods:{
            touchEgg(even){

                this.eggImg = true;
                var that = this;
                that.eggX = even.changedTouches[0].clientX - this.$refs.egg.getBoundingClientRect().left;
                that.eggY = even.changedTouches[0].clientY - this.$refs.egg.getBoundingClientRect().top;
                setTimeout( () =>{
                    if(this.firstMove){
                        this.pageTimer = setTimeout(() => {
                            $('#egg').animate({
                                // height:1.266667 + 'rem',
                                // width:0.9 + 'rem',
                                // left:5.74 + 'rem',
                                // top:12.8 + 'rem'
                            },10).animate({
                                    // height:1.066667 + 'rem',
                                    // width:0.7466 + 'rem',
                                    // top:12.906667+ 'rem',
                                    // left:5.813333+ 'rem'
                                },10,function(){
                                    that.showHand = true;
                                    // that.peopleImg ='https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/peopleMiddle.png';
                                    that.guidance = false;
                                    that.eggX = even.changedTouches[0].clientX - that.$refs.egg.getBoundingClientRect().left;
                                    that.eggY = even.changedTouches[0].clientY - that.$refs.egg.getBoundingClientRect().top;
                                    that.$refs.egg.addEventListener('touchmove', (e) => {
                                        that.firstMove = false;
                                        that.guidance = false;

                                        that.$refs.egg.style.top = e.changedTouches[0].clientY - that.eggY-5 + 'px';
                                        that.$refs.egg.style.left = e.changedTouches[0].clientX - that.eggX-5  + 'px';

                                        var egg = that.$refs.egg.getBoundingClientRect();
                                        var basket = that.$refs.basket.getBoundingClientRect();


                                        if(egg.top <= (basket.top + that.$refs.basket.offsetHeight) && egg.top >= basket.top && egg.left >= basket.left && egg.left <= (basket.left + that.$refs.basket.offsetWidth-20)){
                                            that.showEgg = false;
                                            that.edsBasket = true;
                                            that.showHand = false;
                                            that.peopleImg = 'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/peopleAfter.png';
                                            that.swiperOption.onlyExternal = false;
                                            that.swiper.swiper.lockSwipeToPrev();
                                            that.showBottom.show = true;

                                        }

                                    })
                                
                            });
                        },200)
                    }   
                },300)
            }
        },
        created(){
            
        },
        mounted(){
            setTimeout( ()=>{
                this.showText = true;
            },500)
            setTimeout( ()=>{
                this.start = true;
            },4500)
            setTimeout( ()=>{
                this.guidance = true;
            },4500)
        }
    }
</script>

<style lang="scss" scoped>
@import "../public.scss";
    .page2{
        .text{
            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/page2text.gif') no-repeat;
            background-size: 100% 100%!important;
        }
        .peopleHand{
            height:1.24rem;
            width:0.946667rem;
            background:url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/peoHand.png) no-repeat;
            background-size:100% 100%;
            position: absolute;
            left:4.0rem;
            top:1.6rem;
        }
        .baskets{
            height:9.493333rem;
            width:9.066667rem;
            background:url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/baskets.png) no-repeat;
            background-size:100% 100%;
            margin:0 auto;
            position: relative;
            top:-1.5rem;
            .edsBasket{
                width:2.413333rem;
                height:2.813333rem;
                position: absolute;
                top:5.1rem;
                left:1.066667rem;
                z-index: 10;
            }
            .hasEgg{
                background:url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/basket.png) no-repeat;
                background-size:100% 100%;
            }
        }
        .people{
            height:5rem;
            width:6.8rem;
            background:url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/peopleBefore.png) no-repeat;
            background-size:100% 100%!important;
            position: absolute;
            left:1.6rem;
            top:9.7rem;
        }
        .guidance{
            position: absolute;
            top:10.573333rem;
            left:4.0rem;
            .arrows{
                height:1.413333rem;
                width:1.813333rem;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/arrows.png');
                background-size:100% 100%;
            }
            .hand{
                height:1.013333rem;
                width:0.8rem;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/hand.png');
                background-size:100% 100%;
                position: absolute;
                top:1.653333rem;
                left:1.653333rem;
                animation: pgHand 1.6s linear infinite;
            }
            .moveHand{
            }
        }
        .egg{
            position:absolute;
            top:11.306667rem;
            left:5.613333rem;
            height:1.566667rem;
            width:1.146667rem;
            z-index: 100;
            background-size:0.75rem 1.06rem!important;
            padding: 0.2rem 0 0 0.2rem;
            img{
                height:1.06rem;
                width:0.75rem;
            }
        }
        .showEgg{
            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page2/egg.png');
            background-size:0.75rem 1.06rem!important;
        }
        @keyframes pgHand{
            0%,30%{
                top:1.32rem;
                left:0.82rem;
            }
            30%,100%{
                top:0.5rem;
                left:-1rem;
            }
        }
    }
</style>