<template>
	<div class="level">
		<div class="p-img">
			<div class="secure-scan" :class="{'secure-scan-low':grade=='低','secure-scan-middle':grade=='中'}">
				<div class="scan-wrap scan-bg bgimg"></div>
				<div class="scan-wrap scan-star bgimg"></div>
				<div class="scan-wrap scan-pie bgimg"></div>
				<div class="scan-wrap scan-shield bgimg"></div>
				<div class="scan-wrap scan-planet1 bgimg"></div>
				<div class="scan-wrap scan-planet2 bgimg"></div>
				<div class="scan-wrap scan-planet3 bgimg"></div>
				<div class="scan-wrap scan-text">{{grade}}</div>
				<div class="scan-wrap scan-info">安全等级</div>
			</div>
		</div>
		<div class="p-tips">
			<i class="arrow"></i>
			<span class="text">您的账号安全度{{security*100}}%</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'safe',
		props:['security'],    // 登录框状态
		data(){
			return {
				grade:'', // 安全等级
			}
		},
    watch: {
      security: function (val) {
          if(this.security == 1){
            this.grade = "高"
          }else if(this.security >= 0.6&&this.security < 1){
            this.grade = "中"
          }else{
            this.grade = "低"
          }
      },
    }
	}
</script>

<style lang="scss">
	.level{
		width: 500px;
		height: 390px;
		/*padding-top: 50px;*/
    	margin: 0 auto;
		overflow: hidden;
		.p-img{
			text-align: center;
			height: 320px;
			.bgimg{
				background-image: url(https://aliyunsso.edspay.com/web/myAccount/safe.png);
				background-repeat: no-repeat;
			}
			.secure-scan{
				width: 320px;
				height: 320px;
				position: relative;
        margin: 10px 0px 0px 10px;
				-moz-transition: all 4s ease-in;
				-o-transition: all 4s ease-in;
				-webkit-transition: all 4s ease-in;
				transition: all 4s ease-in;
				.scan-wrap{
					width: 100%;
					height: 320px;
					position: absolute;
					left: 0;
					top: 0;
				}
				.scan-bg{
					background-position: 0 -720px;
					-moz-animation: scan-bg 5s 0s linear forwards infinite;
					-webkit-animation: scan-bg 5s 0s linear forwards infinite;
					animation: scan-bg 5s 0s linear forwards infinite;
				}
				.scan-star {
					background-position: 0 -7200px;
				}
				.scan-pie {
					background-position: 0 -1800px;
					-moz-animation: scan-pie 2s 0s linear forwards infinite;
					-webkit-animation: scan-pie 2s 0s linear forwards infinite;
					animation: scan-pie 2s 0s linear forwards infinite;
				}
				.scan-shield {
					background-position: 0 -6120px;
				}
				.scan-planet1 {
					background-position: 0 -2880px;
					-moz-animation: scan-planet1 8s 0s linear forwards infinite;
					-webkit-animation: scan-planet1 8s 0s linear forwards infinite;
					animation: scan-planet1 8s 0s linear forwards infinite;
				}
				.scan-planet2 {
					background-position: 0 -3960px;
					-moz-animation: scan-planet2 7s 0s linear forwards infinite;
					-webkit-animation: scan-planet2 7s 0s linear forwards infinite;
					animation: scan-planet2 7s 0s linear forwards infinite;
				}
				.scan-planet3 {
					background-position: 0 -5040px;
					-moz-animation: scan-planet3 9s 0s linear forwards infinite;
					-webkit-animation: scan-planet3 9s 0s linear forwards infinite;
					animation: scan-planet3 9s 0s linear forwards infinite;
				}
				.scan-text {
					text-align: center;
					line-height: 320px;
					font-size: 38px;
					z-index: 1;
				}
				.scan-info {
					z-index: 2;
					color: #0a9980;
					margin-top: 234px;
				}
			}
			.secure-scan-low {
				.scan-bg {
					background-position: 0 -360px;
				}
				.scan-star {
					background-position: 0 -6840px;
				}
				.scan-pie {
					background-position: 0 -1440px;
				}
				.scan-shield {
					background-position: 0 -5760px;
				}
				.scan-planet1 {
					background-position: 0 -2520px;
				}
				.scan-planet2 {
					background-position: 0 -3600px;
				}
				.scan-planet3 {
					background-position: 0 -4680px;
				}
				.scan-info {
					color: #ffaf84;
				}
			}
			.secure-scan-middle{
				.scan-bg {
					background-position: 0 0px;
				}
				.scan-star {
					background-position: 0 -6480px;
				}
				.scan-pie {
					background-position: 0 -1080px;
				}
				.scan-shield {
					background-position: 0 -5400px;
				}
				.scan-planet1 {
					background-position: 0 -2160px;
				}
				.scan-planet2 {
					background-position: 0 -3240px;
				}
				.scan-planet3 {
					background-position: 0 -4320px;
				}
				.scan-info {
					color: #ff8e0b;
				}
			}
		}
		.p-tips{
			padding-top: 20px;
			position: relative;
			text-align: center;
			display: none;
			.arrow{
			    border: 1px solid #fcae52;
			    border-right:0;
			    border-bottom:0;
			    display: block;
			    width: 10px;
			    height: 10px;
			    position: absolute;
			    left: 50%;
			    top: 10px;
			    transform: rotate(45deg);
			    background: #fff;
			}
			.text {
				color: #fcae52;
				border: 1px solid #fcae52;
				-moz-border-radius: 3px;
				-webkit-border-radius: 3px;
				border-radius: 3px;
				line-height: 38px;
				padding: 12px 15px;
			}
		}
	}
	.level:hover .p-tips {
	    display: block;
	}
	@keyframes scan-bg{
		100% {
			-moz-transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-webkit-transform: rotate(-360deg);
			transform: rotate(-360deg);
		};
	}
	@keyframes scan-pie{
		100% {
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		};
	}
	@keyframes scan-planet1{
		100% {
			-moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		};
	}
	@keyframes scan-planet2{
		100% {
			moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		};
	}
	@keyframes scan-planet3{
		100% {
			moz-transform: rotate(360deg);
			-ms-transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		};
	}
</style>
