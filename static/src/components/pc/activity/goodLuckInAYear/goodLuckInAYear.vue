<template>
	<div id="nianyKindPc">
		<div class="main" @click="isOpenTwo=true">
		</div>
		<el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" custom-class="dialogclass" center>
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
				isOpenTwo: false, //  弹框
			}
		},
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
			height: 3210px;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/pc_bg.png?v=1.2);
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