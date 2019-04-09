<template>
	<div id="money">
		<wx-header v-if="!osType" :logo="logoMsg" :type="0"></wx-header>
		<div @click="finish" v-if="!osType" class="finish">完成</div>
		<img src="https://aliyunsso.edspay.com/web/wx/dredge/dredgeSuccess.png" alt="">
		<p class="p1">充值请求已成功提交，请注意查看资金</p>
		<a @click="goInvest" href="javascript:;" class="goBtn">去出借</a>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'
	import wxToapp from '../../../../common/wx/wxToapp'
	export default{
		mixins:[wxToapp],
		data(){
			return{
				logoMsg:'充值',
				type:null,
				goUrl:null,
			}
		},
		methods:{
			goInvest(){
				this.toApp('WIP',{path:'/wxInvest'});
			},
			goAccount(){
				this.$router.push('/wxMyAccount');
			},
			finish(){
				this.$router.go(-4);
			}
		},
		components:{
			wxHeader,
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#money').height(height)
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
			color:#fff;
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
			background-image:-webkit-linear-gradient(45deg, #FF6554, #FF3E38);
			background-image:linear-gradient(45deg,#FF6554,#FF3E38);
			color:#fff;
			line-height:1.066667rem;
			font-size:0.426667rem;
		}
	}
</style>