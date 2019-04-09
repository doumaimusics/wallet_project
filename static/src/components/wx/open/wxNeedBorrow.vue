<template>
	<div class="borrow">
		<div v-title>我要借款</div>
		<div class="bg"></div>
		<div class="none" v-if="btnShow"></div>
		<div class="btn" v-if="btnShow">
			<a href="http://sftp.51fanbei.com/CityLoan-app.apk">立即借款</a>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data(){
			return{
				btnShow:false
			}
		},
		methods:{

		},
		mounted(){
			this.PassValue('NavWhite_我要借款');
		},
		created(){
			if(this.osType == "Android"){
				if(this.versionfunegt(this.vcode,'3.8.0')){
					this.btnShow = false
				}else{
					this.btnShow = true
				}
			}else{
				this.btnShow = false
			}
		}
	}
</script>
<style lang="scss" scoped>
	.borrow{
		position: relative;
		width: 100%;
		.bg{
			width: 100%;
			height: 39.013333rem;
			background: url(https://aliyunsso.edspay.com/web/addBorrow/h5_bg.png?v1.2) no-repeat;
			background-size: cover;
		}
		.none{
			width: 100%;
			height: 1.306667rem;
		}
		.btn{
			position: fixed;
			z-index: 99;
			width: 100%;
			height: 1.306667rem;
			background: #FF5B4C;
			font-family: PingFangSC-Regular;
			text-align: center; 
			left: 0;
			bottom: 0;
			a{
				text-decoration: none;
				color: #FFFFFF;
				display: inline-block;
				width: 100%;
				height: 1.306667rem;
				line-height: 1.306667rem;
			}
		}
	}
</style>