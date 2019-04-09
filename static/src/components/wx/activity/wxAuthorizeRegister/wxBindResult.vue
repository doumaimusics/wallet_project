<template>
	<div id="result">
		<div v-title>账号绑定成功</div>
		<div class="main">
			<div class="time">奖励发放时间：{{awardTime}}</div>
			<div class="know_btn" @click="closeWebPage"></div>
		</div>
		
	</div>
</template>
<script>
	import wxShare from '../../../../common/wx/wxShare';
	export default {
		mixins:[wxShare],
		data() {
			return {
				awardTime:''
			}
		},
		methods:{
			closeWind(){
				// this.closeWebPage()
				WeixinJSBridge.call('closeWindow');
			}
		},
		created(){
			this.awardTime = sessionStorage.getItem("awardTime");

		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#result').height(height);
			
		}
	}
</script>
<style lang="scss" scoped>
	#result{
		position: relative;
		width: 100%;
		background: #FBE7C7;
		.main{
			width: 100%;
			height: 16.08rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/result_bg.png) no-repeat;
			background-size: cover;
			.time{
				font-family: PingFangSC-Regular;
				font-size: 0.32rem;
				color: #333333;
				text-align: center;
				position: relative;
				top: 8.706667rem;
			}
			.know_btn{
				width: 6.666667rem;
			    height: 1.266667rem;
			    position: relative;
			    margin: 0 auto;
			    top: 10.453333rem;
			}
		}
	}
</style>