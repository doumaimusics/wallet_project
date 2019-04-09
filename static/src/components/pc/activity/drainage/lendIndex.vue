<template>
    <div id="lendIndex">
        <div v-keywords>都市E呗、E都市钱包、信用贷款、小额贷款、个人借款</div>
        <div v-title>借吧_E都市钱包_我要借款</div>
        <div class="banner"></div>
        <div class="swiper">
        	<el-carousel indicator-position="outside" arrow="hover" height="350px">
        	    <el-carousel-item v-for="item in 3" :key="item">
        	     	<div :style="{background:'url(https://aliyunsso.edspay.com/web/activity/drainage/swiper'+item+'.png) center no-repeat'}"></div>
        	    </el-carousel-item>
    	  	</el-carousel>
        </div>
        <div class="info">
            <div class="content"></div>  
        </div>
        <div class="flow"></div>
        
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                
    		}
    	},
    	methods:{
            moveIn(){

            },
            moveOut(){

            }
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss">
    #lendIndex{
    	.el-carousel__indicator{
    		height:10px;
    		width:10px;
    		margin: 50px 18px 0;
    		.el-carousel__button{
    			height: 10px;
    			width: 10px;
    			background:#FFDCD1;
    			border-radius: 50%;
    			opacity: 1;
    		}
    	}
    	.is-active{
    		.el-carousel__button{
    			background:#FF6456;
    		}
    	}
        
    }
</style>

<style lang="scss" scoped>
    #lendIndex{
    	background: #F8F8F8;
    	padding-bottom: 1px;
        .banner{
            height: 460px;
            width: 100%;
            min-width: 1200px;
            background: url('https://aliyunsso.edspay.com/web/activity/drainage/landBanner.png') center  no-repeat;
            margin-bottom: 20px;
        }
        .swiper{
			height:658px;
			width:1200px;
			margin: 0 auto;
			background:url('https://aliyunsso.edspay.com/web/activity/drainage/swiperBG.png') no-repeat;
			background-size: 100% 100%;
			padding-top: 208px;
			margin-bottom: 20px;
			.el-carousel{
				div{
					height:350px;
				}
			}
        }
        .info{
            width:1200px;
            height:549px;
            margin: 0 auto;
            background: url('https://aliyunsso.edspay.com/web/activity/drainage/lendInfo.png');
            background-size: 100% 100%;
            margin-bottom: 20px;
        }
        .flow{
        	width: 1200px;
        	height: 365px;
        	margin: 0 auto;
        	background: url('https://aliyunsso.edspay.com/web/activity/drainage/lendFlow.png');
            background-size: 100% 100%;
            margin-bottom: 20px;
        }
    }
</style>