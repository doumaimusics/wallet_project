<template>
    <div id="zqFestival">
		<div v-title>E都市钱包_备案进程披露</div>
    	<div v-keywords>E都市钱包、投资理财、个人理财、P2P理财、互联网金融</div>
    	<div class="pace1">
    		<div class="btn btn1" @click="showImg(0)"></div>
    	</div>
    	<div class="pace2">
    		<div class="btn btn2" @click="showImg(1)"></div>
    	</div>
    	<div class="pace3">
    		<div class="btn btn1" @click="showImg(2)"></div>
    	</div>
    	<div class="pace4">
    		<div class="btn btn2" @click="showImg(3)"></div>
    	</div>
    	<div class="pace5">
    		<div class="btn btn3" @click="showImg(4)"></div>
    	</div>
    	<!--弹出框-->
    	<div class="showPic" v-if="imgShow">
    	    <div :class="{ imgBox1: imgIndex == 0,imgBox: imgIndex != 0, imgBox2: imgIndex == 4 }">
    	    	<img :src="images[imgIndex]" v-if="imgIndex == 0">
    	    	<div class="inner" v-else>
    	    		<img :src="images[imgIndex]">
    	    	</div>
    	        <div class="del" @click="imgShow = !imgShow"></div>
    	    </div>
    	</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            	images:[
            		'https://aliyunsso.edspay.com/web/approval/process1.png',
            		'https://aliyunsso.edspay.com/web/approval/process2.png',
            		'https://aliyunsso.edspay.com/web/approval/process3.png',
            		'https://aliyunsso.edspay.com/web/approval/process4.png',
            		'https://aliyunsso.edspay.com/web/approval/process5.jpg'
            	],
            	imgIndex:0,
            	imgShow:false
            }
        },
        methods: {
        	showImg(n){
        		this.imgShow = true;
        		this.imgIndex = n
        	}
        },
        created() {
           
        },
    }
</script>

<style lang="scss" scoped>
    #zqFestival{
        background:url('https://aliyunsso.edspay.com/web/approval/pcbg.jpg') no-repeat;
        background-size: 100% 100%;
        height:6672px;
        width:931px;
        margin:20px auto;
        position: relative;
        .pace1,.pace2,.pace3,.pace4,.pace5{
        	position: relative;
        	height: 156px;
        }
        .pace1{
        	top: 426px;
        }
        .pace2{
        	top: 695px;
        }
        .pace3{
        	top: 787px;
        }
        .pace4{
        	top: 1605px;
        }
        .pace5{
        	top: 2368px;
        }
        @-moz-keyframes slide {
            0% {
              top: -20px;
            }
            50% {
              top: -10px;
            }
            100% {
              top: -20px;
            }
        }
        @-ms-keyframes slide {
            0% {
              top: -20px;
            }
            50% {
              top: -10px;
            }
            100% {
              top: -20px;
            }
        }
        @-webkit-keyframes slide {
           0% {
             top: -20px;
           }
           50% {
             top: -10px;
           }
           100% {
             top: -20px;
           }
        }
        @keyframes slide {
           0% {
             top: -20px;
           }
           50% {
             top: -10px;
           }
           100% {
             top: -20px;
           }
        }
        .btn{
        	width: 90px;
        	height: 72px;
        	position: absolute;
        	-webkit-animation: slide 1.5s infinite;
        	-moz-animation: slide 1.5s infinite;
        	-ms-animation: slide 1.5s infinite;
        	animation: slide 1.5s infinite;
        }
        .btn1{
        	top:0;
        	left:113px;
        	background:url("https://aliyunsso.edspay.com/web/approval/btn1.png") no-repeat;
        	background-size: 100% 100%;
        }
        .btn2{
        	top:0;
        	left:668px;
        	background:url("https://aliyunsso.edspay.com/web/approval/btn2.png") no-repeat;
        	background-size: 100% 100%;
        }
        .btn3{
        	top:0;
        	left:65px;
        	width: 221px;
        	height: 156px;
        	background:url("https://aliyunsso.edspay.com/web/approval/btn3.png") no-repeat;
        	background-size: 100% 100%;
        }
        .showPic{
        	position: fixed;
        	left: 0;
        	top: 0;
        	right: 0;
        	bottom: 0;
        	background: rgba(0,0,0,0.6);
        	margin:auto;
        	z-index: 999;
        	.del{
    	        width: 24px;
    	        height: 24px;
    	        background: url(https://aliyunsso.edspay.com/web/approval/closeBtn.png);
    	        position: absolute;
    	        top: -29px;
    	        right: 0px;
    	        cursor: pointer;
    	    }
        	.imgBox {
        	    position: absolute;
        	    width: 750px;
        	    height: 550px;
        	    margin: auto;
        	    top: 50px;
        	    bottom: 50px;
        	    left: 50%;
        	    transform: translateX(-50%);
        	    text-align: center;
        	    img {
        	    	width: 100%
        	    }
        	}
        	.inner{
        		width: 100%;
        		height: 550px;
        		overflow: auto;
        	}
        	.imgBox2 {
        	    width: 1000px;
        	}
        	.imgBox1{
        		position: absolute;
        		top: 50px;
        		bottom: 50px;
        		left: 50%;
        		transform: translateX(-50%);
        		img {
        	        height: 100% !important;
        	    }
        	}

        }
    }
</style>