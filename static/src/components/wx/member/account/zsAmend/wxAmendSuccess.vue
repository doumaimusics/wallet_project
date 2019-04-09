<template>
	<div id="success">
		<wx-header v-if="!osType" :type="0" :redType="1" :logo="$route.query.logoMsg"></wx-header>
		<div @click="finish"  class="finish">完成</div> 
		<div class="content">
			<img src="https://aliyunsso.edspay.com/web/wx/account/amend/amendSuc.png" alt="">
		</div>
		<p class="tips">{{textTips[this.result]}}</p>
	</div>
</template>

<script>
	import wxHeader from '../../../../wxHeader'
	import wxToapp from '../../../../../common/wx/wxToapp';    //引入表单验证
	export default {
		mixins:[wxToapp],
		data(){
			return {
				logoMsg:'出借',
				result:'',
				investStr:'',
				textTips:{
					card:'恭喜您！成功修改存管账户的银行卡',
					phone:'恭喜您，成功修改存管账户的预留手机号'
				}
			}
		},
		methods:{
			finish(){
				// 移动端关闭 微信端回到入口页
				if (this.osType) {
					this.PassValue('REBANK');
				} else {
					this.$router.go(-this.$route.query.goNum);
				}
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.result = this.$route.query.result;
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度

			//动态的为根元素设置字体的大小
			$('#success').height(height)
		}
	}
</script>

<style lang="scss" scoped>
	#success{
		background:#fff;
		.finish{
			position:absolute;
			z-index:100;
			top:0;
			right:0.4rem;
			line-height:1.333333rem;
			font-size:0.373333rem;
			color:#fff;
		}
		.content{
			height:5.733333rem;
			padding-top:0.666667rem;
			background:url(https://aliyunsso.edspay.com/web/wx/invest/investResult.png) no-repeat;
			background-size: 100%;
			img{
				display:block;
				width:2.773333rem;
				height:2.773333rem;
				margin: 0 auto;
			}
		}
		.tips{
			font-size:0.4rem;
			line-height:0.56rem;
			height:0.56rem;
			color:#333;
			padding: 0.266667rem 0 1.2rem;
			text-align:center;
		}
	}

</style>