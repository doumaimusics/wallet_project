<template>
	<div id="tranksgivingPc">

		<!--未登录-->
		<div class="rightStatus1" v-if="!login">
			<!--领红包按钮-->
			<div class="getRedPack" @click="logIn"></div>
			<!--规则按钮-->
			<div class="rule-btn" @click="isOpen=true"></div>
			<!--分享按钮-->
			<div class="fx-btn" @click="isOpenTwo=true"></div>
			<!--规则弹框-->
			<el-dialog title="活动规则" :visible.sync="isOpen" width="30%" custom-class="dialogclass" center>
				<div class="text-div">
					<h3>520元感恩大礼包组成：</h3>
					<p>390元红包：6月标及以上，满38000元可用</p>
					<p>100元红包：3月标及以上，满20000元可用</p>
					<p>30元红包：2月标及以上，满8000元可用</p>
					<p>（所有红包有效期截止11月30日）</p>
					<p>1%加息券（1月标及以上可用，金额无限制，有效期：3天）</p>
					<p>10%加息券（2月标及以上可用，加息10天，金额无限制，有效期：3天）</p>
					<h3>1118元红包送朋友：</h3>
					<p>为那些年遇到的每一位朋友，送上祝福</p>
					<p>现在邀请有机会拿现金红包和出借大礼包哦</p>
					<h3>最终解释权归E都市钱包所有</h3>
				</div>
			</el-dialog>
			<!--二维码弹框-->
			<el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" custom-class="dialogclass" center>
				<div class="erMa"></div>
				<p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
			</el-dialog>
		</div>
		<!--已登录-->
		<div class="rightStatus2" v-else>
			<div class="getRedPack" @click="getRedPacket" :class="{activeBg:alreadyLq==true}"></div>
			<div class="rule-btn" @click="isOpen=true"></div>
			<div class="fx-btn" @click="isOpenTwo=true"></div>
			<div class="top-text top-text1">
				<p class="time">{{zcTime}}</p>
				<p>您通过<span>{{zcChannel}}</span></p>
				<p>成为了E都市钱包大家庭一员</p>
			</div>
			<div class="bottom-text bottom-text1">
				<p class="time">{{tzTime}}</p>
				<p>您出借了<span>{{tzSignName}} {{tzMoney}}元</span></p>
				<p>从此江湖上又多了一名出借小能手</p>
			</div>
			<div class="top-text top-text2">
				<p class="time">截至目前</p>
				<p>您共使用了<span>{{totalRed}}张</span>红包</p>
				<p>额外赚取<span>{{earnMoney}}元</span></p>
				<p>给您发了那么多红包 ，您有认真用吗？</p>
			</div>
			<div class="bottom-text bottom-text2">
				<p>您总计出借<span>{{totalInvest}}笔</span></p>
				<p>累计收益<span>{{totalRevenue}}元</span></p>
				<p>{{totalText}}</p>
			</div>
			<!--规则弹框-->
			<el-dialog title="活动规则" :visible.sync="isOpen" width="30%" custom-class="dialogclass" center>
				<div class="text-div">
					<h3>520元感恩大礼包组成：</h3>
					<p>390元红包：6月标及以上，满38000元可用</p>
					<p>100元红包：3月标及以上，满20000元可用</p>
					<p>30元红包：2月标及以上，满8000元可用</p>
					<p>（所有红包有效期截止11月30日）</p>
					<p>1%加息券（1月标及以上可用，金额无限制，有效期：3天）</p>
					<p>10%加息券（2月标及以上可用，加息10天，金额无限制，有效期：3天）</p>
					<h3>1118元红包送朋友：</h3>
					<p>为那些年遇到的每一位朋友，送上祝福</p>
					<p>现在邀请有机会拿现金红包和出借大礼包哦</p>
					<h3>最终解释权归E都市钱包所有</h3>
				</div>
			</el-dialog>
			<!--规则弹框-->
			<el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" custom-class="dialogclass" center>
				<div class="erMa"></div>
				<p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
			</el-dialog>
			<!--领取弹框-->
			<el-dialog :visible.sync="isOpenSan" width="10%" custom-class="dialogclass" center>
				<div class="redText">
					<p>恭喜您已领取</p>
					<p>520元感恩大礼包</p>
					<div class="tz-btn" @click="regularInvest">去出借</div>
				</div>
			</el-dialog>

		</div>
	</div>
</template>
<script>
	import { MessageBox } from 'element-ui';
	export default {
		name: 'tranksgivingPc',

		data() {
			return {
				isOpen: false, //  规则弹框
				isOpenTwo: false, //  邀请弹框
				login: false, // 已经登录
				isOpenSan: false, // 领取红包弹框

				zcTime: '', //   注册时间
				zcChannel: '', //    注册渠道
				tzTime: '', //     首次出借时间
				tzSignName: '', //     首次出借标名
				tzMoney: 0, //      首次出借金额
				totalRed: 0, //      累计使用红包数
				earnMoney: 0, //      额外赚取金额
				totalInvest: 0, //      累计出借笔数
				totalRevenue: 0, //      累计出借总收益
				alreadyLq: false, //  已经领取红包按钮状态
				totalText:'',     //  根据出借笔数显示的文案
			}
		},
		methods: {
			logIn() { //  登录框
				this.$router.push({
					path: '/thanksgiving/thanksgivingDayPc',
					query: {
						pop: 'LG'
					}
				});
			},
			regularInvest() { // 立即出借
				this.$router.push({
					path: '/invest'
				});
			},
			dataAtatistisc() { //  用户数据
				var _this = this;
				global.http.post_(this, "/activity/gnjhk/thanksgivingFeedbackRollout", {
					oauthToken: this.token
				}, data => {
					if(data.body.resCode == 1) {
						_this.zcTime = data.body.resData.registerTime; //   注册时间 
						//  注册渠道
						if(data.body.resData.registerSource == '1') {
							_this.zcChannel = 'E都市钱包APP IOS'
						} else if(data.body.resData.registerSource == '2') {
							_this.zcChannel = 'E都市钱包APP Android'
						} else if(data.body.resData.registerSource == '3') {
							_this.zcChannel = 'E都市钱包公众号'
						} else if(data.body.resData.registerSource == '4') {
							_this.zcChannel = 'E都市钱包官网  PC'
						} else {
							_this.zcChannel = 'E都市钱包平台活动'
						}
						_this.tzTime = data.body.resData.firstAddTime; //  首次出借时间
						_this.tzSignName = data.body.resData.firstName; //  首次出借标名
						_this.tzMoney = data.body.resData.firstRealAmount //  首次出借金额

						// 第二页数据
						_this.totalRed = data.body.resData.redEnvelopeNum; // 使用红包数
						_this.earnMoney = data.body.resData.redEnvelopeRevenue; // 额外赚取金额
						_this.totalInvest = data.body.resData.borrowTenderNum; // 累计出借笔数
						_this.totalRevenue = data.body.resData.totalRevenue; // 累计总收益
						if (_this.totalRevenue == 0) {
							_this.totalText = '好伤心，您在平台尚未有累计收益记录！';
						} else if (_this.totalRevenue<1000){
							_this.totalText = '距离理财达人还差一步，继续加油哦~ ';
						} else if(_this.totalRevenue >=1000) {
							_this.totalText = '论理财技巧，我甘拜下风！';
						}
					}
				})

			},
			statePort() { //  是否能领取的接口			
				var _this = this;
				global.http.post_(this, "/activity/gnjhk/isFeedbackRedEnvelope", {
					oauthToken: this.token
				}, data => {
					if(data.body.resCode == 1) { //  可以领取
						_this.alreadyLq = false;
					} else if(data.body.resCode == 2) { // 已领取
						_this.alreadyLq = true;
					} else if(data.body.resCode == -2) { // 活动未开始 
						MessageBox.alert(data.body.resMsg).then(action => {});
					} else if(data.body.resCode == -3) { // 活动结束
						MessageBox.alert(data.body.resMsg).then(action => {});
					}

				})

			},
			getRedPacket() { //  获取红包
				var _this = this;
				global.http.post_(this, "/activity/gnjhk/lqFeedbackRedEnvelope", {
					oauthToken: this.token
				}, data => {
					if(data.body.resCode == 1) {
						_this.isOpenSan = true;
					} else if(data.body.resCode == 2) {
						_this.alreadyLq = true;
						MessageBox.alert(data.body.resMsg).then(action => {});
					} else if(data.body.resCode == -2) {
						MessageBox.alert(data.body.resMsg).then(action => {});
					} else if(data.body.resCode == -3) {
						MessageBox.alert(data.body.resMsg).then(action => {});
					} else if(data.body.resCode == 0) {
						MessageBox.alert(data.body.resMsg).then(action => {});
					}
				})
			}

		},
		mounted: function() {
			this.userPhone = this.getCookie('userName')
			this.getCookie('token') ? this.login = true : this.login = false
		},
		created: function() { //  调用函数
			this.dataAtatistisc();
			this.statePort();
		}
	}
</script>
<style lang="scss">
	@-moz-keyframes bounce {
		0% {
			-moz-transform: translateY(0px);
		}
		50% {
			-moz-transform: translateY(-25px);
		}
		100% {
			-moz-transform: translateY(0px);
		}
	}
	
	@-ms-keyframes bounce {
		0% {
			-ms-transform: translateY(0px);
		}
		50% {
			-ms-transform: translateY(-25px);
		}
		100% {
			-ms-transform: translateY(0px);
		}
	}
	
	@-webkit-keyframes bounce {
		0% {
			-webkit-transform: translateY(0px);
		}
		50% {
			-webkit-transform: translateY(-25px);
		}
		100% {
			-webkit-transform: translateY(0px);
		}
	}
	
	@-o-keyframes bounce {
		0% {
			-o-transform: translateY(0px);
		}
		50% {
			-o-transform: translateY(-25px);
		}
		100% {
			-o-transform: translateY(0px);
		}
	}
	
	@keyframes bounce {
		0% {
			transform: translateY(0px);
		}
		50% {
			transform: translateY(-25px);
		}
		100% {
			transform: translateY(0px);
		}
	}
	
	#tranksgivingPc {
		width: 1200px;
		margin: 0 auto;
		.rightStatus1 {
			width: 100%;
			height: 1972px;
			background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/noLogIn.png) no-repeat;
			background-size: 1200px 1972px;
			position: relative;
			.getRedPack,
			.rule-btn,
			.fx-btn {
				width: 149px;
				height: 175px;
				position: absolute;
				cursor: pointer;
			}
			/*领红包按钮*/
			.getRedPack {
				background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/Group1.png) no-repeat;
				background-size: cover;
				top: 900px;
				left: 610px;
				-webkit-animation: bounce 2.5s infinite;
				-ms-animation: bounce 2.5s infinite;
				-moz-animation: bounce 2.5s infinite;
				animation: bounce 2.5s infinite;
			}
			/*规则按钮*/
			.rule-btn {
				background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/Group2.png) no-repeat;
				background-size: cover;
				top: 1450px;
				right: 180px;
				-webkit-animation: bounce 3s infinite;
				-ms-animation: bounce 3s infinite;
				-moz-animation: bounce 3s infinite;
				animation: bounce 3s infinite;
			}
			/*分享按钮*/
			.fx-btn {
				background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/Group3.png) no-repeat;
				background-size: cover;
				top: 1370px;
				left: 285px;
				-webkit-animation: bounce 3.5s infinite;
				-ms-animation: bounce 3.5s infinite;
				-moz-animation: bounce 3.5s infinite;
				animation: bounce 3.5s infinite;
			}
		}
		.rightStatus2 {
			height: 5069px;
			background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/logIn.png) no-repeat;
			background-size: 1200px 5069px;
			position: relative;
			.getRedPack,
			.rule-btn,
			.fx-btn {
				width: 149px;
				height: 175px;
				position: absolute;
				cursor: pointer;
			}
			/*领红包按钮*/
			.getRedPack {
				background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/Group1.png) no-repeat;
				background-size: cover;
				top: 3985px;
				left: 610px;
				-webkit-animation: bounce 2.5s infinite;
				-ms-animation: bounce 2.5s infinite;
				-moz-animation: bounce 2.5s infinite;
				animation: bounce 2.5s infinite;
			}
			.getRedPack.activeBg {
				background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/Group4.png) no-repeat;
				background-size: cover;
			}
			/*规则按钮*/
			.rule-btn {
				background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/Group2.png) no-repeat;
				background-size: cover;
				top: 4540px;
				right: 180px;
				-webkit-animation: bounce 3s infinite;
				-ms-animation: bounce 3s infinite;
				-moz-animation: bounce 3s infinite;
				animation: bounce 3s infinite;
			}
			/*分享按钮*/
			.fx-btn {
				background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/Group3.png) no-repeat;
				background-size: cover;
				top: 4465px;
				left: 285px;
				-webkit-animation: bounce 3.5s infinite;
				-ms-animation: bounce 3.5s infinite;
				-moz-animation: bounce 3.5s infinite;
				animation: bounce 3.5s infinite;
			}
			.top-text,
			.bottom-text {
				width: 100%;
				position: absolute;
				p {
					font-size: 26px;
					color: #fff;
					margin-bottom: 10px;
					span {
						font-size: 28px;
						color: #FFE80E;
					}
				}
				p.time {
					font-size: 44px;
					color: #FFE80E;
				}
			}
			.top-text.top-text1 {
				left: 120px;
				top: 1138px;
			}
			.bottom-text.bottom-text1 {
				right: 90px;
				top: 2040px;
				text-align: right;
			}
			.top-text.top-text2 {
				left: 120px;
				top: 2380px;
			}
			.bottom-text.bottom-text2 {
				right: 90px;
				top: 3370px;
				text-align: right;
			}
		}
	}
	
	.dialogclass {
		width: 600px;
		top: 25% !important;
	}
	
	.el-dialog__header {
		text-align: center;
		border-bottom: 1px solid #FF6A54;
		padding-bottom: 20px;
		span {
			color: #FF6A54;
			font-size: 24px;
		}
		
	}
	
	.text-div {
		width: 90%;
		margin: 0 auto;
		line-height: 20px;
		h3 {
			font-size: 22px;
			color: #333;
			margin-bottom: 26px;
		}
		p {
			font-size: 20px;
			margin-top: 5px;
			margin-bottom: 22px;
			padding-left: 30px;
		}
	}
	
	.redText {
		width: 90%;
		margin: 0 auto;
		line-height: 20px;
		p {
			font-size: 34px;
			text-align: center;
			color: #F86345;
			margin-bottom: 30px;
		}
		.tz-btn {
			width: 40%;
			height: 50px;
			line-height: 50px;
			text-align: center;
			border-radius: 30px;
			background: #F86345;
			margin: 0 auto;
			font-size: 28px;
			color: #fff;
			cursor: pointer;
		}
	}
	
	.erMa {
		width: 280px;
		height: 280px;
		margin: 0 auto;
		background: url(https://aliyunsso.edspay.com/web/activity/thanksgivingDay/erweima.png) no-repeat;
		background-size: cover;
		margin-bottom: 20px;
	}
	
	.inioP {
		text-align: center;
	}
	.el-message-box__content .el-message-box__message p{
		text-align: center;
	}
</style>