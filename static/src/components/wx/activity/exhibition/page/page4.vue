<template>
    <div class="page page4">
        <div class="textBox">
            <div v-if="showText" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/page4text.gif?v='+random+') no-repeat'}" class="text"></div>
        </div>
		<div :style="{background:'url('+pigImg+') no-repeat'}" :class="{bigPig:bigPig}" class="pig" ref="pig" id="pig">
            <div v-if="money1" class="money1"></div>
			<div v-if="guidance" class="guidance">
	            <div class="arrows"></div>
	            <div class="hand"></div>
	        </div>
		</div>
        <div v-if="guidance" @touchstart.prevent="touchMoney" ref="money" id="money" class="money"></div>
		<div v-else-if="showMoney" ref="money" id="money" class="money"></div>
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
                showMoney:true,
                eggImg:false,
                bigPig:false,
                vegeX:0,
                vegeY:0,
                firstMove:true,
                money1:false,
                pigImg:'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/pigBefore.png'
    		}
    	},
        props:['swiper','swiperOption','showBottom'],
    	methods:{
            touchMoney(even){
                var that = this;

                if(this.firstMove){
                    $('#money').animate({
                        // height:1.4 + 'rem',
                        // width:0.97 + 'rem',
                        // top:11.1 + 'rem',
                        // left:4.82 + 'rem',
                    },'slow',function(){
                        that.guidance = false;
                        that.firstMove = false;
                        var fun = function (e){
                            that.vegeX = e.changedTouches[0].clientX - (that.$refs.money.offsetHeight)/2;
                            that.vegeY = e.changedTouches[0].clientY - (that.$refs.money.offsetWidth)/2;
                            that.$refs.money.style.top = that.vegeY + 'px';
                            that.$refs.money.style.left = that.vegeX  + 'px';

                            var pig = that.$refs.pig.getBoundingClientRect();
                            var money = that.$refs.money.getBoundingClientRect();

                            if((money.top + that.$refs.money.offsetHeight - 40) >= pig.top && money.left <= (pig.left + that.$refs.pig.offsetWidth*(4/7))){
                                that.$refs.money.removeEventListener('touchmove',fun)
                                that.showMoney = false;
                                // that.pigImg = 'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/pigZhong.png'
                                that.money1 = true;
                                setTimeout(function(){
                                    // that.pigImg = 'https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/pigBefore.png'
                                    that.bigPig = true;
                                    that.money1 = false;
                                    
                                },280)

                                setTimeout(function(){
                                    that.swiper.swiper.lockSwipeToPrev();
                                    that.swiperOption.onlyExternal = false;
                                    that.showBottom.show = true;
                                    
                                },700)

                            }
                        }
                        that.$refs.money.addEventListener('touchmove', fun)
                    });
                }
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
            },3900)
            setTimeout( ()=>{
                this.guidance = true;
            },3900)
        }
    }
</script>

<style lang="scss" scoped>
@import "../public.scss";
    .page4{
    	position: relative;
        .money1{
            height:1.44rem;
            width: 1.693333rem;
            background:url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/money1.png) no-repeat;
            background-size:100% 100%;
            position: absolute;
            top:-0.026667rem;
            left:3.146667rem;
        }
        .text{
            background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/page4text.gif') no-repeat;
            background-size: 100% 100%!important;
        }
        .bigPig{
            transform: scale(1.06);
            animation: pig 1.6s linear forwards;
        }
		.pig{
			margin: 2.2rem auto 0;
			width:9.226667rem;
			height:7.626667rem;
			background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/pigBefore.png') no-repeat;
            background-size: 100% 100%!important;
            position: relative;
            .guidance{
            	position: absolute;
            	top:-1.56rem;
            	left: 3.6rem;
            	.arrows{
					background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/arrows.png') no-repeat;
	            	background-size: 100% 100%;
	            	height:2.373333rem;
	            	width:2.026667rem;
				}
				.hand{
					position: absolute;
					top:0.44rem;
					left:2rem;
					background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/hand.png') no-repeat;
	            	background-size: 100% 100%;
	            	height:1.013333rem;
	            	width:0.853333rem;
	            	animation: pighand 1.6s linear infinite;
				}
            }
		}
		.money{
			height:1.626667rem;
			width:1.6rem;
			background:url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page4/money.png') no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top:5.52rem;
            left:6.0rem;
		}
        @keyframes pig {
            0%,30%{
                transform:scale(1.05);
            }
            30%,100%{
                transform:scale(1.14);
            }
        }
		@keyframes pighand {
			0%,10%{
				top:1rem;
				left:1.9rem;    
			}
            10%,40%{
                top:1.44rem;
                left:1.6rem;
            }
			40%,100%{
				top:2.44rem;
				left:0.2rem;
			}
		}
    }
</style>