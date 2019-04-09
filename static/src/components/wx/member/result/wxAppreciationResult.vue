<template>
	<div id="money">
		<wx-header v-if="!osType" :logo="logoMsg" :type="0"></wx-header>
		<div v-if="!osType" @click="goAccount" class="finish">完成</div>
		<img src="https://aliyunsso.edspay.com/web/wx/dredge/dredgeSuccess.png" alt="">
		<p class="p1">开通委托付款请求已成功提交</p>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp'
	import wxHeader from '../../../wxHeader'
	export default{
		mixins:[wxToapp],
		data(){
			return{
				logoMsg:'开通委托付款',
				type:null,
			}
		},
		methods:{
			goAccount(){
				this.$router.push({path:'/wxEqzAccount',query:{isOpenEqz:1,thisUrl:this.$route.path}});
			}
		},
		components:{
			wxHeader,
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#money').height(height);
		}
	}
</script>

<style lang="scss" scoped>
	#money{
		position:relative;
		background:#fff;
		height:17.786667rem;
		img{
			width:10.0rem;
		}
		.finish{
			position:absolute;
			z-index:100;
			top:0;
			right:0.4rem;
			line-height:1.333333rem;
			font-size:0.373333rem;
			color:#ff5b4c;
		}
		.finish{
			position:fixed;
			z-index:100;
			top:0;
			right:0.4rem;
			line-height:1.333333rem;
			font-size:0.373333rem;
			color:#ff5b4c;
		}
		p{
			padding-bottom:1.2rem;
			padding-top: 0.266667rem;
			text-align:center;
			font-size:0.373333rem;
			color:#808080;
		}
		.goBtn{
			display:block;
			text-align:center;
			width:8.773333rem;
			margin: 0 auto;
			height:1.066667rem;
			border-radius:0.106667rem;
			background:#ff5b4c;
			color:#fff;
			line-height:1.066667rem;
			font-size:0.426667rem;
		}
	}
</style>