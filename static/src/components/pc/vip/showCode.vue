<template>
	<div id="nianyKindPc">
		<el-dialog title="温馨提示" :visible.sync="showtips.qrCode" width="30%" custom-class="dialogclass" center>
				<div class="erMa"></div>
				<p class="inioP">扫一扫，下载app去分享</p>
		</el-dialog>
	</div>
</template>

<script>
	import { MessageBox } from 'element-ui';
	export default {
		name: 'christmasNewYearPc',

		data() {
			return {
				
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