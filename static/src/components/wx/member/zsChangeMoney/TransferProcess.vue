<template>
	<div class="online">
		<img v-if="imgType" src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/rechargeProgress.png" alt="">
		<img v-else src="https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/webRecharge.png" alt="">
		<div class="tips" :class="{top1:!imgType}"><span></span>如有疑问，请前往 <i @click="toHelpCenter">帮助中心</i></div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data () {
			return {
				imgType:true,
			}
		},
		methods:{
			toHelpCenter() {
				this.toApp('toWeb|帮助中心|https://'+ window.location.host +'/#/wxMyAccount/wxHelpCenters',{path:'/wxMyAccount/wxHelpCenters'})
			},
		},
		created(){
			if(this.$route.query.TransferProcessType){
				if(this.$route.query.TransferProcessType == 'mobile'){
					this.imgType = true
				}else{
					this.imgType = false
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.online{
		width: 100%;
		position: relative;
		img{
			width: 10.0rem;
		}
		.tips{
			width: 100%;
			text-align: center;
			position: absolute;
			top: 75.2rem;
			font-family: PingFangSC-Regular;
			font-size: 0.32rem;
			color: #FFFFFF;
			z-index: 99;
			span{
				width: 0.32rem;
				height: 0.32rem;
				display: inline-block;
				position: relative;
				background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/questionWhite.png) no-repeat;
				background-size: 100% 100%;
				top: 0.02rem;
				margin-right: 0.133333rem;
			}
			i{
				text-decoration: underline;
			}
		}
		.tips.top1{
			top: 68.293333rem
		}
	}
</style>