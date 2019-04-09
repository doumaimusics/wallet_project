<template>
	<div id="thanksgLastPage">
		<div class="main-bg">
			<!--领取按钮-->
			<div class="btn1" :class="{activeBg:alreadyLq==true}" @click="getRedPacket"></div>
			<!--领取弹框-->
			<div class="pop-up2" v-show="popUp1">
				<div  class="close-btn" @click="popUpHide1"></div>
				<div class="lq-btn" @click="tz">去出借</div>
			</div>	
			<!--规则按钮-->
			<div class="btn2" @click="popUpShow2"></div>
			<!--邀请按钮-->
			<div class="btn3" @click="invite"></div>
			<!--规则弹框-->
			<div class="pop-up1" v-show="popUp2">
				<div class="close-btn" @click="popUpHide2"></div>
				<h3>活动规则</h3>
				<h4>520元感恩大礼包组成：</h4>
				<p>390元红包：6月标及以上，满38000元可用</p>
				<p>100元红包：3月标及以上，满20000元可用</p>
				<p>30元红包：2月标及以上，满8000元可用</p>
				<p>（所有红包有效期截止11月30日）</p>
				<p>1%加息券（1月标及以上可用，金额无限制，有效期：3天）</p>
				<p>10%加息券（2月标及以上可用，加息10天，金额无限制，有效期：3天）</p>
				<h4>1118元红包送朋友：</h4>
				<p>为那些年遇到的每一位朋友，送上祝福</p>
				<p>现在邀请有机会拿现金红包和出借大礼包哦</p>
				<h4>最终解释权归E都市钱包所有</h4>
			</div>
			
			<!--遮罩-->
			<div class="layer" v-show="showLayer"  v-layer></div>
			<div class="tishi" v-show="tishi" @click="[showLayer=false,tishi=false]"></div>
		</div>
	</div>
</template>

<script>
	import dialog from '../../../public/wx/wxdialog'; //弹出框
	import wxShare from '../../../../common/wx/wxShare';   // 分享的
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxShare],
		data() {
			return {
				popUp1:false,    //  领奖弹框
				popUp2:false,    //  规则弹框
				showLayer: false,  // 遮罩
				tishi: false,  //  提示图片
				shareObj: { //分享标题内容配置
					title: "E都市钱包", //标题
					desc: "感恩遇见，一个小小的关怀,一份温暖的体贴,感谢有你!", //内容
					link: "https://www.edspay.com/#/wxInviteRegister", //活动邀请链接
//                  link: "https://test1static.edspay.com/#/wxInviteRegister", //活动邀请链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				},
				alreadyLq:false   //  已经领取红包按钮状态
			}
		},
		methods: {
			popUpShow1() {    //  领奖弹框出现
				this.popUp1 = true;
				this.showLayer = true;
			},
			popUpHide1() {    //  领奖弹框消失 
				this.popUp1 = false;
				this.showLayer = false;
				this.alreadyLq = true;
			},
			popUpShow2() {    //  规则弹框出现
				this.notLogPost('/activity/gnjhk/isFeedbackRedEnvelope', (data) => {
					if (data.resCode == 1 || data.resCode == 2) {
						 this.popUp2 = true;
				         this.showLayer = true;
                  } else if (data.resCode == -3) {
						MessageBox.alert(data.resMsg).then(action => {});
					}
					 
				}, (this.osType ? {
						oauthToken: this.token
					} : {}), 1);
				
				
			},
			popUpHide2() {    // 规则弹框消失
				this.popUp2 = false;
				this.showLayer = false;
			},
			invite() { //  点击分享的
				this.notLogPost('/activity/gnjhk/isFeedbackRedEnvelope', (data) => {
					if (data.resCode == 1 || data.resCode == 2) {
						if(this.osType) {
							this.isLogPassValue(this.appShare)
						} else {
							this.showLayer = true;
							this.tishi = true;
						}
                  } else if (data.resCode == -3) {
						MessageBox.alert(data.resMsg).then(action => {});
					}
					 
				}, (this.osType ? {
						oauthToken: this.token
					} : {}), 1);
				
			},
			tz() { //   跳转出借
				this.toApp('WIP', {
					path: '/wxInvest',
					query: {
						thisUrl: this.$route.fullPath
					}
				})
			},
			statePort() {    //  是否能领取的接口		
					this.notLogPost('/activity/gnjhk/isFeedbackRedEnvelope', (data) => {
						console.log(data);
						if (data.resCode == 1) {  //  可以领取
							this.alreadyLq = false;
						} else if (data.resCode == 2){   // 已领取
							this.alreadyLq = true;
						} else if (data.resCode == -2){  // 活动未开始 
							MessageBox.alert(data.resMsg).then(action => {});
						} else if (data.resCode == -3){   // 活动结束							
							MessageBox.alert(data.resMsg).then(action => {});
						} else if (data.resCode == 0){   // 请求失败							
							MessageBox.alert(data.resMsg).then(action => {});
						} 
					}, (this.osType ? {
						oauthToken: this.token
					} : {}), 1);
				
								
			},
			getRedPacket() {     //  获取红包
				if (this.userId || this.getCookie('userToken')) {   //  已经登录  
					this.notLogPost('/activity/gnjhk/lqFeedbackRedEnvelope', (data) => {
						console.log(data);
						if (data.resCode == 1) {
							this.popUpShow1();
						} else if(data.resCode == 2){
							this.alreadyLq = true;
							MessageBox.alert(data.resMsg).then(action => {});
						} else if(data.resCode == -2){
							MessageBox.alert(data.resMsg).then(action => {});
						} else if(data.resCode == -3){
							MessageBox.alert(data.resMsg).then(action => {});
						} else if(data.resCode == 0){
							MessageBox.alert(data.resMsg).then(action => {});
						}
					}, (this.osType ? {
						oauthToken: this.token
					} : {}), 1);
				} else{   //  未登录
					MessageBox.confirm('快去登录,领取红包哦 ！', {
						confirmButtonText: '登录',
						confirmButtonClass: 'confirmButton',
						cancelButtonClass: 'cancelButton',
					}).then(action => {
						this.toApp('LG', {
							path: '/wxLogin',
							query: {
								thisUrl: this.$route.fullPath
							}
						})
					})
				}
			}
			
		},
		mounted(){
			this.getWxShareData(this.shareObj); //分享调用
		},
		created: function() {   //  调用函数
			this.statePort();
		}
	}
</script>

<style lang="scss" scoped>
	 @-moz-keyframes bounce{
	 	0% {
	 		-moz-transform: translateY(0rem);
	 	}
	 	50% {
	 		-moz-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-moz-transform: translateY(0rem);
	 	}
	 }
	 @-ms-keyframes bounce{
	 	0% {
	 		-ms-transform: translateY(0rem);
	 	}
	 	50% {
	 		-ms-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-ms-transform: translateY(0rem);
	 	}
	 }
	 @-webkit-keyframes bounce{
	 	0% {
	 		-webkit-transform: translateY(0rem);
	 	}
	 	50% {
	 		-webkit-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-webkit-transform: translateY(0rem);
	 	}
	 }
	 @-o-keyframes bounce{
	 	0% {
	 		-o-transform: translateY(0rem);
	 	}
	 	50% {
	 		-o-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-o-transform: translateY(0rem);
	 	}
	 }
	 @keyframes bounce{
	 	0% {
	 		transform: translateY(0rem);
	 	}
	 	50% {
	 		transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		transform: translateY(0rem);
	 	}
	 }
	#thanksgLastPage{
		font-family: DIN-Medium;
		.main-bg{
			width: 10rem;
			height: 16.5rem;
			background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/last.png?v=1.0') no-repeat;
			background-size: cover;
			position: relative;
			.btn1,.btn2,.btn3{
				width: 1.666666rem;
				height: 1.946666rem;
				position: absolute;
			}
			.btn1{
				top: 4rem;
				left: 4.986666rem;
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/Group1.png?v=1.0') no-repeat;
			    background-size: cover;
			    -webkit-animation: bounce 2.5s infinite;
			    -ms-animation: bounce 2.5s infinite;
			    -moz-animation: bounce 2.5s infinite;
			    animation: bounce 2.5s infinite;
			}.btn2{
				top: 10rem;
				right: 0.5rem;
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/Group2.png?v=1.0') no-repeat;
			    background-size: cover;
			    -webkit-animation: bounce 3s infinite;
			    -ms-animation: bounce 3s infinite;
			    -moz-animation: bounce 3s infinite;
			    animation: bounce 3s infinite;
			}.btn3{
				top: 9.2rem;
				left: 1.1rem;
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/Group3.png?v=1.0') no-repeat;
			    background-size: cover;
			    -webkit-animation: bounce 3.5s infinite;
			    -ms-animation: bounce 3.5s infinite;
			    -moz-animation: bounce 3.5s infinite;
			    animation: bounce 3.5s infinite;
			}
			.btn1.activeBg{
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/Group4.png?v=1.0') no-repeat;
			    background-size: cover;
			}
			.pop-up1{
				width: 7.733333rem;
				height: 10rem;
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/pop_up1.png?v=1.0') no-repeat;
				background-size: cover;
				color: #FFf;
				padding: 1.5rem 0.426666rem 0 0.426666rem;
				h3{
					font-size: 0.426666rem;
					text-align: center;
				}
				h4{
					font-size: 0.373333rem;
					margin-bottom: 0.1rem;
				}
				p{
					font-size: 0.32rem;
					margin-bottom: 0.15rem;
					padding-left: .44rem;
				}
			}
			.pop-up2{
				width: 7.733333rem;
				height: 9.453333rem;
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/pop_up2.png?v=1.0') no-repeat;
				background-size: cover;
				.lq-btn{
					width: 6.52rem;
					height: 1.14rem;
					position: absolute;
					left: 0;right: 0;
					bottom: 0.48rem;
					margin: auto;
					text-align: center;
					line-height: 1.14rem;
					font-size: 0.453333rem;
					color: #fff;
				}
			}
			.pop-up1,.pop-up2{
				position: fixed;
				left: 0;top: 0;
				right: 0;bottom: 0;
				margin: auto;
				z-index: 1000;
				.close-btn{
					width: 0.613333rem;
					height: 0.613333rem;
					position: absolute;
					top: 0;right: 0;
				}
			}
			.tishi {
				width: 10rem;
				height: 4.88rem;
				position: absolute;
				left: 0;top: 0;
				z-index: 1000;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/CustomRedEnvelope/fenxiang.png?v=1.0) no-repeat;
			background-size: 100%;
		}
		}
	}
</style>