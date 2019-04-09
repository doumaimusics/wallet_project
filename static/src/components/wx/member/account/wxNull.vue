<template>
	<div class="vacancy" :style="fullHeight">
		<img class="img" v-if="!img" src="https://aliyunsso.edspay.com/web/wx/account/redNull.png" alt="">
		<img class="img1" v-else :src="img ? img:'https://aliyunsso.edspay.com/web/wx/account/redNull.png'" alt="">
		<p>{{text}}</p>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				fullHeight:{
					height: ''
				},
			}
		},
		props:['text','img'],
		mounted() {
	    	var that = this;
	    	
			if(that.osType == "Android"){
				that.fullHeight.height = (document.documentElement.clientHeight+10)+"px"  //获取手机可视区域的的高度
			}else{
				that.fullHeight.height =  document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度	
			}
	    },
	}
</script>

<style lang="scss" scoped>
	.vacancy{
		height:16.453333rem;
		background:#fff;
		text-align:center;
		padding-top: 2.4rem;
		.img1{
			width:6.4rem;
			height:4.533333rem;
		}
		.img{
			width:2.746667rem;
			height:2.746667rem;
		}
		p{
			color:#bebebe;
			font-size:0.373333rem;
			line-height:1.066667rem;
			text-align:center;
		}
	}
	.specCl{
		top: 7rem;
		position: relative;
	}
</style>