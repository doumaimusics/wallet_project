<template>
    <div class="page page3">
        <div class="textBox">
            <div v-if="showText" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/page3text.gif?v='+random+') no-repeat'}" class="text"></div>
        </div>
		<div class="green">
			<div :style="{background:'url('+peopleImg+') no-repeat'}" ref="people" class="people">
                <div :style="{background:'url('+faceImg+') no-repeat'}" class="face"></div>         
            </div>
		</div>
		<div class="greens">
			<div v-if="guidance" class="guidance">
	            <div class="arrows"></div>
	            <div class="hand"></div>
	        </div>
            <div v-if="guidance" @touchstart.prevent="touchVege" ref="dish" class="dish"></div>
			<div v-else ref="dish" class="dish"></div>
		</div>
		<div @touchstart.prevent="touchVege" v-show="vege" ref="vegetable" id="vegetable" class="vegetable"></div>
    </div>
    
</template>

<script>
    export default{
    	data(){
    		return{
                showText:false,
                random:Math.random()*100,
                start:false,
                vege:false,
                guidance:false,
                showEgg:true,
                eggImg:false,
                vegeX:0,
                vegeY:0,
                peopleImg:'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/people.png',
                faceImg:'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/face1.png'
    		}
    	},
        props:['swiper','swiperOption','showBottom'],
    	methods:{
            touchVege(even){
                this.vege = true;
                var that = this;
                this.eggImg = true;
                that.$refs.vegetable.style.left = even.changedTouches[0].clientX - (that.$refs.vegetable.offsetHeight)/2 + 'px';
                that.$refs.vegetable.style.top = even.changedTouches[0].clientY - (that.$refs.vegetable.offsetWidth)/2 + 'px';


                $('#vegetable').animate({
                    // height:1.4 + 'rem',
                    // width:0.97 + 'rem',
                    // top:11.1 + 'rem',
                    // left:4.82 + 'rem',
                },'slow',function(){
                    that.guidance = false;
                    that.$refs.vegetable.addEventListener('touchmove', (e) => {
                        that.vegeX = e.changedTouches[0].clientX - (that.$refs.vegetable.offsetHeight)/2;
                        that.vegeY = e.changedTouches[0].clientY - (that.$refs.vegetable.offsetWidth)/2;
                        that.$refs.vegetable.style.top = that.vegeY + 'px';
                        that.$refs.vegetable.style.left = that.vegeX  + 'px';
                        
                        var people = that.$refs.people.getBoundingClientRect();
                        var vegetable = that.$refs.vegetable.getBoundingClientRect();

                        if(vegetable.top <= (people.top + that.$refs.people.offsetHeight*(4/10)) && vegetable.top >= (people.top + that.$refs.people.offsetHeight*0.26) && vegetable.left >= (people.left + that.$refs.people.offsetWidth*0.43) && vegetable.left <= (people.left + that.$refs.people.offsetWidth*0.65)){
                            that.vege = false;
                            that.faceImg = 'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/face2.png';

                            that.swiperOption.onlyExternal = false;
                            that.swiper.swiper.lockSwipeToPrev();
                            that.showBottom.show = true;
                        }

                    })
                    that.$refs.dish.addEventListener('touchmove', (e) => {
                        that.vegeX = e.changedTouches[0].clientX - (that.$refs.vegetable.offsetHeight)/2;
                        that.vegeY = e.changedTouches[0].clientY - (that.$refs.vegetable.offsetWidth)/2;
                        that.$refs.vegetable.style.top = that.vegeY + 'px';
                        that.$refs.vegetable.style.left = that.vegeX  + 'px';

                        var people = that.$refs.people.getBoundingClientRect();
                        var vegetable = that.$refs.vegetable.getBoundingClientRect();

                        if(vegetable.top <= (people.top + that.$refs.people.offsetHeight*(4/10)) && vegetable.top >= (people.top + that.$refs.people.offsetHeight*0.26) && vegetable.left >= (people.left + that.$refs.people.offsetWidth*0.43) && vegetable.left <= (people.left + that.$refs.people.offsetWidth*0.65)){
                            that.vege = false;
                            that.faceImg = 'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/face2.png';
                            setTimeout( ()=>{
                                that.swiperOption.onlyExternal = false;
                                that.swiper.swiper.lockSwipeToPrev();
                                that.showBottom.show = true;

                            },600)

                        }

                    })
                    
                });
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
    .page3{
        .text{
            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/page3text.gif') no-repeat;
            background-size: 100% 100%!important;
        }
		.green{
			width:9.066667rem;
			margin:0 auto;
			background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/green.png') no-repeat;
            background-size: 100%;
            .people{
            	width:7.733333rem;
            	height:8.293333rem;
            	margin: 0 auto;
            	background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/page3before.png') no-repeat;
            	background-size: 100% 100%!important;
                .face{
                    height:1.2rem;
                    width:1.306667rem;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/face1.png') no-repeat;
                    background-size: 100% 100%!important;
                    position: relative;
                    top:1.813333rem;
                    left:3.36rem;
                }
            }
		}
		.greens{
			height:3.146667rem;
			width:100%;
			margin: -0.533333rem auto 0;
			background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/greens.png') no-repeat;
            background-size: 100% 100%;
            position: relative;
            .dish{
            	position: absolute;
            	top:0.6rem;
            	left:3.36rem;
            	z-index:300;
            	height:1.6rem;
            	width:3.2rem;
            }
		}
		.guidance{
			position: relative;
            top:-1.6rem;
			margin: 0 4.533333rem;
			.arrows{
				background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/arrows.png') no-repeat;
            	background-size: 100% 100%;
            	height:2.613333rem;
            	width:3.2rem;
			}
			.hand{
				position: absolute;
				top:1.706667rem;
				left:0.266667rem;
				background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/hand.png') no-repeat;
            	background-size: 100% 100%;
            	height:1.013333rem;
            	width:0.853333rem;
            	animation: vegehand 1.6s linear infinite;
			}
		}
		.vegetable{
			position: absolute;
			top:0;
			left:50%;
			z-index:360;
			height:0.906667rem;
			width:0.533333rem;
			background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page3/vegetable.png') no-repeat;
            background-size: 100% 100%;
		}
		@keyframes vegehand{
            0%,50%{
                top:0.706667rem;
                left:0.466667rem;
            }
            50%,100%{
                top:-3.1rem;
                left:0.86rem;
            }
        }
    }
</style>