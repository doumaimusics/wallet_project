<template>
	<div class="null" :class="{padT:classType==1}" :style="fullHeight">
		<img :src="imgSrc ? imgSrc:'https://aliyunsso.edspay.com/web/wx/integralStroe/groups.png'" alt="">
		<p :class="{text1:type == 1}">{{text}}</p>
		<p v-if="type == 1" class="small_tips">{{smallText}}</p>
		<div v-if="btnType == 1" class="btn" @click="toWxUrl(linkUrl)">{{btnText}}</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		props:['text','btnText','linkUrl','type','smallText','btnType','classType','imgSrc'],//空状态文案、按钮文案、按钮跳转url、a两行文案、第二条文案、是否有按钮、样式添加、空状态图片

		data(){
			return{
				fullHeight:{
					height: ''
				},
			}
		},
		methods:{
		},
		mounted() {
	    	var that = this;
			if(that.osType == "Android"){
				that.fullHeight.height = (document.documentElement.clientHeight+10)+"px"  //获取手机可视区域的的高度
			}else{
				that.fullHeight.height =  document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度	
			}
	    },
		components:{
		},
		created(){
			console.log(this.imgSrc)
		}
	}
</script>
<style lang="scss" scoped>
	.null{
		font-family: PingFangSC-Regular;
		text-align: center;
		padding-top: 3.493333rem;
		// height: 17.52rem;
		background: #ffffff;
		img{
			width: 6.4rem;
			height: 4.533333rem;
			margin-bottom: 0.4rem;
		}
		p{
			font-size: 0.346667rem;
			color: #808080;
			margin-bottom: 0.266667rem;
		}
		p.text1{
			font-size: 0.346667rem;
			color: #333333;
			margin-bottom: 0.08rem;
		}
		p.small_tips{
			font-size: 0.32rem;
			color: #808080;
			margin-bottom: 0.48rem;
		}
		.btn{
			width: 5.44rem;
			height: 1.92rem;
			font-size: 0.853333rem;
			color: #FF5B4C;
			text-align: center;
			line-height: 1.92;
			background: #FFFFFF;
			border: 1px solid #FF5B4C;
			border-radius: 0.106667rem;
			margin: 0 auto; 
			transform: scale(0.5);
		    -webkit-transform: scale(0.5);
		}
	}
	.null.padT{
		padding-top: 2.0rem;
	}
</style>