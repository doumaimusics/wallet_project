<template>
	<div id="nianyKindPc">
		<el-dialog title="温馨提示" :visible.sync="showtips.qrCode" width="30%" custom-class="dialogclass" center>
				<div class="erMa"></div>
				<p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
		</el-dialog>
	</div>
</template>

<script>
	import { MessageBox } from 'element-ui';
	export default {
		name: 'christmasNewYearPc',

		data() {
			return {
				isOpenTwo: true, //  弹框
			}
		},
		props:['showtips','tipData'],
		methods: {
			

		},
		mounted: function() {
			
		},
		created: function() { //  调用函数
			
		}
	}
</script>

<style lang="scss" scoped>
	#nianyKindPc {
		font-family: DIN-Medium;
		.main{
			width: 1200px;
			height: 3855px;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/pc_bg.jpg?v=1.3) no-repeat;
			background-size: cover;
			margin: 0 auto;
			position: relative;
		}
		.erMa {
			width: 230px;
			height: 230px;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/erweimaxin.png?v=1.1) no-repeat;
			background-size: cover;
			margin-bottom: 20px;
	}
	
	.inioP {
		text-align: center;
	}
	.el-message-box__content .el-message-box__message p{
		text-align: center;
	}
	}
</style>