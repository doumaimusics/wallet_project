<template>
    <div class="page page5">
        <div class="textBox">
            <div v-if="showText" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/page5text.gif?v='+random+') no-repeat'}" class="text"></div> 
        </div>
		<div class="calculate">
            <div v-if="guidance" class="guidance">
                <div class="arrows"></div>
                <div class="hand"></div>
            </div>
            <div :style="{background:'url('+equaImg+') no-repeat'}" ref="equation" class="equation"></div>
        </div>
        <div v-if="guidance" @touchstart.prevent="touchEraser" id="eraser" ref="eraser" class="eraser"></div>
        <div v-else id="eraser" ref="eraser" class="eraser"></div>
    </div>
    
</template>

<script>
    export default{
    	data(){
    		return{
                showText:false,
                random:Math.random()*100,
                start:false,
                guidance:false,
                showEraser:true,
                eggImg:false,
                vegeX:0,
                vegeY:0,
                firstMove:true,
                equaImg:'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/before.png'
    		}
    	},
        props:['swiper','swiperOption','showBottom'],
    	methods:{
            touchEraser(even){
                var that = this;

                setTimeout( () =>{
                    if(this.firstMove){
                        $('#eraser').animate({
                            // height:1.4 + 'rem',
                            // width:0.97 + 'rem',
                            // top:11.1 + 'rem',
                            // left:4.82 + 'rem',
                        },'slow',function(){
                            that.guidance = false;
                            that.$refs.eraser.addEventListener('touchmove', (e) => {
                                that.guidance = false;
                            	that.vegeX = e.changedTouches[0].clientX - (that.$refs.eraser.offsetHeight)/2;
                        		that.vegeY = e.changedTouches[0].clientY - (that.$refs.eraser.offsetWidth)/2;
                                that.$refs.eraser.style.top = that.vegeY + 'px';
                                that.$refs.eraser.style.left = that.vegeX  + 'px';

                                var eraser = that.$refs.eraser.getBoundingClientRect();
                                var equation = that.$refs.equation.getBoundingClientRect();

                                if(eraser.top >= (equation.top +20) && eraser.top <= (equation.top +that.$refs.equation.offsetHeight) && eraser.left <= (that.$refs.equation.offsetWidth + equation.left - 20) && (that.$refs.eraser.offsetWidth + eraser.left - 20) >= equation.left){

                                    that.equaImg = 'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/after.png'

                                        that.start = false;
                                    setTimeout( ()=>{

                                        that.$refs.eraser.style.top = 12.2 +'rem';
                                        that.$refs.eraser.style.left = 4.366 +'rem';

                                        that.swiperOption.onlyExternal = false;
                                        that.showBottom.show = true;
                                    },600)
                                    setTimeout( ()=>{
                                        that.swiperOption.onlyExternal = false;
                                        that.swiper.swiper.lockSwipeToPrev();
                                    },1000)
                                }

                            })
                        });
                    }
                    
                },300)
            }
    	},
    	created(){
    		
    	},
        mounted(){
            var that = this;
            setTimeout( ()=>{
                this.showText = true;
            },500)
            setTimeout( ()=>{
                this.start = true;
            },1200)
            setTimeout( ()=>{
                that.guidance = true;
            },3600)
        }
    }
</script>

<style lang="scss" scoped>
@import "../public.scss";
    .page5{
    	position: relative;
        .text{
            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/page5text.gif') no-repeat;
            background-size: 100% 100%!important;
        }
        .calculate{
            position: relative;
            margin: -1.64rem auto 0;
            height:12.446667rem;
            width:9.62rem;
            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/calculate.png') no-repeat;
            background-size: 100% 100%;
            .guidance{
                position: absolute;
                top:5.366667rem;
                left:4.2667rem;
                .arrows{
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/arrows.png') no-repeat;
                    background-size: 100% 100%;
                    height:1.866667rem;
                    width:3.333333rem;
                }
                .hand{
                    position: absolute;
                    top:2.8rem;
                    left:0.8rem;
                    z-index:100;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/hand.png') no-repeat;
                    background-size: 100% 100%;
                    height:1.013333rem;
                    width:0.853333rem;
                    animation: hand 1.6s linear infinite;
                }
            }
            .equation{
                height:1.333333rem;
                width:3.573333rem;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/before.png') no-repeat;
                background-size: 100% 100%!important;
                position: absolute;
                top:3.2rem;
                left:3.466667rem;
            }
        }
        .eraser{
            height:2.0rem;
            width:1.466667rem;
            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page5/eraser.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top:11.5rem;
            left:4.366667rem;
        }
		@keyframes hand {
			0%,30%{
				top:2.24rem;
				left:0.5rem;
			}
			30%,100%{
				top:-0.2rem;
				left:0.0rem;
			}
		}
    }
</style>