<template>
	<div id="money">
		<wx-header v-if="!osType" :logo="logoMsg" :type="0"></wx-header>
		<div v-if="!osType" @click="goAccount" class="finish">完成</div>
		<img src="https://aliyunsso.edspay.com/web/wx/dredge/dredgeSuccess.png" alt="">
		<p class="p1">出借请求已成功提交，请注意查看资金</p>
		<div class="btns clear" v-if="1">
			<span @click="goInvestRecord">出借记录</span>
			<span @click="goInvest">继续出借</span>
		</div>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp'
	import wxHeader from '../../../wxHeader'
	export default{
		mixins:[wxToapp],
		data(){
			return{
				logoMsg:'出借',
				type:null,
			}
		},
		methods:{
			goAccount(){
				this.$router.go(-4);
			},
			goInvest(){
				this.toApp('WIP',{path:'/wxInvest'},0,1);
			},
			goInvestRecord(){
				this.toApp('WIM',{path:'/wxMyAccount/wxInvestListIn/wxInvestManage',query:{thisUrl:this.$route.path}},0,1);
			},
		},
		components:{
			wxHeader,
		},
		mounted(){
			/*this.PassValue('DANG');
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#money').height(height)*/
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
		p{
			padding-bottom:1.2rem;
			padding-top: 0.266667rem;
			text-align:center;
			font-size:0.373333rem;
			color:#808080;
		}
		.btns{
			padding:0 0 0 0.666667rem;
			span{
				float:left;
				border-radius:0.106667rem;
				border:1px solid #ff5b4c;
				width:3.973333rem;
				height:1.04rem;
				text-align:center;
				line-height:1.04rem;
				margin-right:0.6rem;
				color:#ff5b4c;
			}
			span:last-child{
				color:#fff;
				background:#ff5b4c;
			}
		}
	}
</style>