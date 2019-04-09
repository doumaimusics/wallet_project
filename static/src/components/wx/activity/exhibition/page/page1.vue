<template>
	<div :style="fullHeight" class="page page1">
	    <div :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page1/page1text.gif?v='+random+') no-repeat'}" class="text"></div>
	    <div class="salesclerk">
	        <div v-if="page1.showPer" class="talk">
	            <div v-if="page1.perTalk1" class="perTalk1"></div>
	            <div v-if="page1.perTalk2" class="perTalk2"></div>
	            <div v-if="page1.perTalk3" class="perTalk3"></div>
	        </div>
	    </div>
	    <div class="miss">
	        <div ref="package" class="package"></div>
	        <div v-if="page1.showMiss" class="talk">
	            <div v-if="page1.missTalk1" class="talk1"></div>
	            <div v-if="page1.missTalk1" class="talk2"></div>
	        </div>
	    </div>
	    <div v-if="page1.showPage1" id="perfume" @touchstart.prevent="movePerfume" @touchend="moveFinish" :class={per:page1_isTouch} :style="{position:'absolute'}" ref="perfume" class="perfume"></div>
	    <div v-if="page1.guidance" class="guidance move">
	        <div class="arrows"></div>
	        <div class="hand"></div>
	    </div>
	</div>
</template>


<script> 
    export default{
    	data(){
    		return{
                random:Math.random()*100,
                showLayer:{
                    show:false,
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
        props:['swiper'],
    	methods:{
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
                            top:11.1 + 'rem',
                            left:4.82 + 'rem',
                        },800,function(){
                            that.page1.perX = even.changedTouches[0].clientX - that.$refs.perfume.getBoundingClientRect().left;
                            that.page1.perY = even.changedTouches[0].clientY - that.$refs.perfume.getBoundingClientRect().top;
                            that.$refs.perfume.style.zIndex = 999;
                            that.page1.firstMove = false;
                            that.page1.guidance = false;
                            that.$refs.perfume.addEventListener('touchmove', (e) => {
                                that.$refs.perfume.style.top = (e.changedTouches[0].clientY - that.page1.perY) + 'px';
                                that.$refs.perfume.style.left = (e.changedTouches[0].clientX - that.page1.perX)  + 'px';
                                
                                var perfume = that.$refs.perfume.getBoundingClientRect();
                                var pack = that.$refs.package.getBoundingClientRect();

                                if(perfume.left <= (pack.left + that.$refs.package.offsetWidth) && perfume.left >= (pack.left) && (perfume.top + that.$refs.perfume.offsetHeight - 10) >= pack.top && perfume.top <= (pack.top + that.$refs.package.offsetHeight)){
                                    that.page1.showPage1 = false;

                                    setTimeout( () =>{
                                    	console.log(that.swiper)
                                        
                                    },1000)
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
    	created(){
    		
    	},
        mounted(){
            setTimeout(() =>{
                this.page1.showMiss = true;
            },2000)
            setTimeout(() =>{
                this.page1.missTalk1 = true;
            },2200)
            setTimeout(() =>{
                this.page1.missTalk2 = true;
            },2200)
            setTimeout(() =>{
                this.page1.showPer = true;
            },2400)
            setTimeout(() =>{
                this.page1.perTalk1 = true;
            },2600)
            setTimeout(() =>{
                this.page1.perTalk2 = true;
            },3100)
            setTimeout(() =>{
                this.page1.perTalk3 = true;
            },3700)
            setTimeout(() =>{
                this.page1.guidance = true;
            },3800)

        }
    }
</script>

<style lang="scss" scoped>
        .layer{
            img{
                height:2.64rem;
                width:6.133333rem;
                position: absolute;
                right:0.666667rem;
                top:0.666667rem;
            }
        }
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
            background-size: 100% 100%;
        }
        .page1{
                    .text{
                        height:5.333333rem;
                        width:100%;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/page1Text.png') no-repeat;
                        background-size:100% 100%!important;
                        position: relative;
                        left:1.066667rem;
                        top:0.88rem;
                    }
                    .miss{
                        position: absolute;
                        top:7.733333rem;
                        left:-3.8rem;;
                        height:9.12rem;
                        width:3.706667rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/missBefore.png') no-repeat;
                        background-size:100% 100%;
                        animation: miss 2s linear forwards;
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
                        top:6.533333rem;
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
                        top:9.333333rem;
                        left:3.84rem;
                        height:4.273333rem;
                        width:2.9rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/perfume.png') no-repeat;
                        background-size:100% 100%;
                    }
                    .guidance{
                        position: relative;
                        top:5.28rem;
                        left:3.333333rem;
                        width:2.666667rem;
                        .arrows{
                            height:1.093333rem;
                            width:2.4rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/arrows.png') no-repeat;
                            background-size:100% 100%;
                        }
                        .hand{
                            height:0.88rem;
                            width:0.64rem;
                            background: url('https://aliyunsso.edspay.com/web/wx/activity/exhibition/hand.png') no-repeat;
                            background-size:100% 100%;
                            position: absolute;
                            top:0.48rem;
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
                top:0.8rem;
                left:1.12rem;
            }
            90%,100%{
                top:1.226667rem;
                left:0;
            }
        }
</style>