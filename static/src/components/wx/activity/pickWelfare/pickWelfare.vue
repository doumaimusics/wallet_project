<template>
	<div id="pickWelfare">
		<!--title-->
		<wx-header v-if="!osType" :logo="'摘福利冲榜大赛'"></wx-header>
		<!--大背景-->
		<div class="fl_bg">
			<!--球球未登陆的状态-->
			<div class="welfare_box">
				<section class="gs1" @click="redBox(1)">
					<p>{{redStatus}}元出借红包</p>
					<!--红包-->
				</section>
				<section class="gs2" @click="redBox(2)">
					<p>{{ticketStatus}}%加息券</p>
					<!--加息券-->
				</section>
			</div>
			<!--规则按钮-->
			<div class="rule_btn" @click="ruleBtn"></div>
			<!--规则弹框-->
			<div class="rule_box" v-show="ruleBox">
				<section class="rule_close_btn" @click="ruleClose"></section>
				<!--规则关闭按钮-->
				<p v-if="osType == 'IOS'"><span>8.</span>本活动奖励与苹果公司无关</p>
			</div>
			<!--计算机按钮-->
			<div class="calculator_box_btn" @click="calculatorBtn"></div>
			<!--计算机弹框-->
			<div class="calculator_box" v-show="calculatorBox">
				<!--计算机关闭按钮-->
				<section class="calculator_close_btn" @click="calculatorClose"></section>
				<!--计算按钮-->
				<section class="calculator_btn" @click="checkInput"></section>
				<section class="input_box">
					<!--数字输入框按钮-->
					<input type="text" placeholder="请输入出借金额" v-model="inputNumber" id="inputNumber" />
				</section>
				<section class="select_box">
					<!--标选择框-->
					<select name="" id="sel">
						<option :value="v" v-for="(v,$index) in biaoList">{{v}}月标</option>
					</select>
				</section>
				<section class="number_box">{{investmentMoney}}</section>

			</div>
			<!--排行榜区域-->
			<div class="ranking_box">
				<section class="ranking_text">{{myRanking}}</section>
				<!--排名的文字-->
				<section class="ranking_btn" @click="rankingPh"></section>
				<section class="money_text">{{myInvestment}}</section>
				<!--出借的文字-->

			</div>
			<!--未登录和未使用公用弹框关闭按钮-->
			<div class="public_box" v-if="publicBox || tabBox == 3">
				<section class="public_close_btn" @click="[publicBox=false,showLayer=false,tabBox = 0]"></section>
				<div v-if="tabBox==3">
					<section class="text_box">
						<h2>{{textMsg}}</h2>
						<h3>每次只可摘1个，使用掉后可采摘第2个</h3>
					</section>
					<div class="go_btn" @click="tz">去出借</div>
				</div>
				<div v-else>
					<section class="text_box">
						<h2 :style="[logInText]">亲！登录后才可以摘取福利喔！</h2>
					</section>
					<div class="go_btn" @click="goLogIn">去登录</div>
				</div>
			</div>

			<!--中奖的提示弹框-->
			<div class="zj_popup" v-show="zjBox">
				<div class="parent_box" v-if="tabBox==1">
					<div class="zj_close" @click="[zjBox=false,showLayer=false]"></div>
					<p>您发现一个出借红包<br/> <strong>{{redStatus}}元</strong><br/><span>{{redTextMsg}}</span></p>
					<div class="zj_btn" @click="gitRed(1)"></div>
				</div>
				<div class="parent_box" v-else-if="tabBox==2">
					<div class="zj_close" @click="[zjBox=false,showLayer=false]"></div>
					<p>您发现一个加息券<br/> <strong>{{ticketStatus}}%</strong><br/><span>{{upAppTextMag}}</span></p>
					<div class="zj_btn" @click="gitTicket(2)"></div>
				</div>
			</div>
			<!--第一次进来的指导弹框-->
			<div class="guidance_box" v-show="guidanceBox">
				<div class="guidance_close" @click="[guidanceBox=false,showLayer=false]"></div>
			</div>
			<!--遮罩-->
			<div class="layer" v-if="showLayer" v-layer></div>
		</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; //头部
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import verify from '../../../../common/wx/verification'; //引入表单验证
	import dialog from '../../../public/wx/wxdialog'; //弹出框
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxToapp, verify],
		data() {
			return {
				ruleBox: false, //    规则弹框
				calculatorBox: false, //    计算器弹框
				publicBox: false, //     登录和未使用弹框
				zjBox: false, //      中奖的提示弹框
				guidanceBox: false, //       第一次进来指导弹框
				showLayer: false, //    遮罩弹层
				tabBox: 0, //  tab默认红包弹窗
				inputNumber: '', //    计算器的输入框
				investmentMoney: 0, //  计算后展示的金额
				selNumber: 0, //  月份发下表
				redId: 0, //   红包id
				jxqId: 0, //加息券 id
				myRanking: 0, //  排名
				myInvestment: 0, //  出借金额
				logInText: { //   登录的提示文字样式   
					marginTop: '0.8rem'
				},
				biaoList: [ //   标期
					1, 2, 3, 6, 12
				],
				redStatus: 0, //   红包的状态
				ticketStatus: 0, //   券的状态 
				textMsg: '', //  已经存在的红包或者加息券提示语句
				redTextMsg: '', // 红包提示语
				upAppTextMag: '' //加息券提示语

			}
		},
		methods: {
			ruleBtn() { //  点击规则按钮弹出框
				this.ruleBox = true;
				this.showLayer = true;
			},
			ruleClose() { //    点击规则弹框关闭按钮
				this.ruleBox = false;
				this.showLayer = false;
			},
			/*将数字转换成金额显示*/
			toMoney(num) {
				num = num.toFixed(2);
				num = parseFloat(num)
				num = num.toLocaleString();
				return num; //返回的是字符串23,245.12保留2位小数
			},
			calculatorBtn() { //  点击计算器按钮弹出框
				this.calculatorBox = true;
				this.showLayer = true;
			},
			calculatorClose() { //  点击计算器弹框关闭按钮
				this.calculatorBox = false;
				this.showLayer = false;
				this.investmentMoney = 0;
				this.inputNumber = '';
			},
			checkInput() { //  点击计算按钮触发的事件        	 
				var oSel = document.getElementById('sel').value;
				var str = document.getElementById('inputNumber').value;
				var len1 = str.substr(0, 1);
				var len2 = str.substr(1, 1);
				//如果第一位是0，第二位不是点，就用数字把点替换掉  
				if(str.length > 1 && len1 == 0 && len2 != '.') {
					Toast({ //    小黑快
						message: '请输入正确的格式',
						iconClass: 'icon icon-success',
						duration: 1000
					});
					this.inputNumber = '';
					return;
				}
				//第一位不能是.  
				if(len1 == '.') {
					Toast({ //    小黑快
						message: '请输入正确的格式',
						iconClass: 'icon icon-success',
						duration: 1000
					});
					this.inputNumber = '';
					return;
				}
				//限制只能输入一个小数点  
				if(str.indexOf(".") != -1) {
					var str_ = str.substr(str.indexOf(".") + 1);
					//限制只能输入一个小数点  
					if(str_.indexOf(".") != -1) {
						//						str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
						Toast({ //    小黑快
							message: '请输入正确的格式',
							iconClass: 'icon icon-success',
							duration: 1000
						});
						this.inputNumber = '';
						return;
					}
				}
				if(parseInt(Number(str)) >= 1 && parseInt(Number(str)) <= 99999999) {
					this.investmentMoney = this.toMoney((parseInt(this.inputNumber) / 12) * oSel);
					console.log(this.investmentMoney);
				} else {
					Toast({ //    小黑快
						message: '请输入正确的格式',
						iconClass: 'icon icon-success',
						duration: 1000
					});
					this.inputNumber = '';
					return;
				}
				/*this.investmentMoney = this.toMoney((parseInt(this.inputNumber) / 12) * oSel);	
				console.log(this.investmentMoney);*/
			},
			goLogIn() { //去登陆的连接
				this.toApp('LG', {
					path: '/wxLogin',
					query: {
						thisUrl: this.$route.fullPath
					}
				})
			},

			initData() { //   红包和加息券的状态接口
				let _this = this;
				this.notLogPost('/activity/cbzfl/rollout', (data) => { // 红包和加息券的状态接口
					console.log(data);

					if(data.resCode == 1) { //  请求成功执行的事件
						if(data.success == true) {
							_this.redStatus = data.resData.amount; //  红包金额初始状态
							_this.redId = data.resData.redEnvelopeRuleId; //  红包ID的初始状态
							_this.redTextMsg = data.resData.redEnvelopeMsg; //  红包的初始提示语句
							_this.ticketStatus = data.resData.upApr; //  加息券的初始状态
							_this.jxqId = data.resData.upRateRuleId; //  加息券id的初始状态
							_this.upAppTextMag = data.resData.upRateMsg; //  加息券的初始提示语句
						} else if(data.success == false) { //   不在活动时间的弹窗
							MessageBox.alert(data.resMsg).then(action => {});
						}
					} else {
						MessageBox.alert(data.resMsg).then(action => {}); //  接口请求失败的提示
					}

				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1);
			},

			redBox(n) { //  点击红包或者加息券球球的接口

				if(n == 1) {
					this.tabBox = 1;
				} else if(n == 2) {
					this.tabBox = 2;
				}
				if(this.userId || this.getCookie('userToken')) { //  已经登录的情况	
					let _this = this;
					this.notLogPost('/activity/cbzfl/isRedEnvelopeOrUpRate', (data) => {
						console.log(data)
						if(data.resData.whethe == 1) {
							_this.zjBox = true;
							_this.showLayer = true;
						} else if(data.resData.whethe == 2) { //   存在未使用的红包
							_this.textMsg = data.resMsg //   已经存在的红包提示语句
							_this.tabBox = 3; //   去出借弹框出来
							_this.showLayer = true;
						} else if(data.resData.whethe == 3) { //   存在未使用的加息券
							_this.textMsg = data.resMsg //   已经存在的加息券提示语句
							_this.tabBox = 3; //   去出借弹框出来
							_this.showLayer = true;
						}

					}, (this.osType ? {
						oauthToken: this.token
					} : {}), 1)
				} else { //  未登录的情况
					this.publicBox = true; //  登录弹框出来    
					this.showLayer = true; //  遮罩出来					
				}
			},

			gitRed() { //  点击确定领红包
				this.notLogPost('/activity/cbzfl/lqRedEnvelope', (data) => {
					let _this = this;
					console.log(data.resCode)
					if(data.resCode == 1) { //   接口请求成的状态
						if(data.success == true) {
							if(data.resData.whethe == 0) {
								MessageBox.alert(data.resMsg).then(action => {});
							} else if(data.resData.whethe == 1) {
								_this.redStatus = data.resData.amount; //    新的红包金额
								_this.redId = data.resData.redEnvelopeRuleId; //    新的红包id
								_this.redTextMsg = data.resData.redEnvelopeMsg; //    新的提示语句
								Toast({ //    小黑快
									message: '领取成功',
									iconClass: 'icon icon-success'
								});
								_this.zjBox = false;
								_this.showLayer = false;
							} else if(data.resData.whethe == 2) {
								_this.textMsg = data.resMsg
								_this.tabBox = 3;
							}
						} else if(data.success == false) {
							MessageBox.alert(data.resMsg).then(action => {});
						}
					} else if(data.resCode == 0) { //  接口请求失败 的状态
						MessageBox.alert(data.resMsg).then(action => {});
					}
				}, (this.osType ? {
					oauthToken: this.token,
					redEnvelopeRuleId: this.redId
				} : {
					redEnvelopeRuleId: this.redId
				}))
			},

			gitTicket() { //  点击领加息券的接口
				if(this.userId || this.getCookie('userToken')) { //     已经登录的情况
					let _this = this;
					this.notLogPost('/activity/cbzfl/lqUpRate', (data) => {
						console.log(data.resCode);
						if(data.resCode == 1) {
							if(data.success == true) {
								if(data.resData.whethe == 0) {
									MessageBox.alert(data.resMsg).then(action => {});
								} else if(data.resData.whethe == 1) {
									_this.ticketStatus = data.resData.upApr; //    新的加息券
									_this.jxqId = data.resData.upRateRuleId; //    新的加息券id
									_this.upAppTextMag = data.resData.upRateMsg; //    新的加息券提示语
									Toast({
										message: '领取成功',
										iconClass: 'icon icon-success'
									});
									_this.zjBox = false;
									_this.showLayer = false;
								} else if(data.resData.whethe == 3) {
									_this.textMsg = data.resMsg
									_this.tabBox = 3;
								}
							} else if(data.success == false) {
								MessageBox.alert(data.resMsg).then(action => {});
							}
						} else {
							MessageBox.alert(data.resMsg).then(action => {});
						}

					}, (this.osType ? {
						oauthToken: this.token,
						upRateRuleId: this.jxqId

					} : {
						upRateRuleId: this.jxqId
					}))
				} else { //  未登录的情况
					this.publicBox = true; //  登录弹框出来    
					this.showLayer = true; //  遮罩出来					
				}
			},
			userRanking() { //  用户排名和出借的接口
				if(this.userId || this.getCookie('userToken')) {
					let _this = this;
					this.notLogPost('/activity/cbzfl/getActivityRankTop', (data) => {
						if(data.resCode == 1) {
							if(data.resData.whethe == 0) {
								_this.myRanking = 0;
								_this.myInvestment = 0;
							} else {
								_this.myRanking = data.resData.rank; // 排名
								_this.myInvestment = data.resData.tenderMoney; //  出借金额;
								console.log(_this.myInvestment)
							}

						} else {
							MessageBox.alert(data.resMsg).then(action => {});
						}
					}, (this.osType ? {
						oauthToken: this.token
					} : {

					}))
				} else {
					this.myRanking = 0;
					this.myInvestment = 0;
				}
			},
			rankingPh() { //   跳转排行榜连接
				this.$router.push({
					path: '/ranking/rankingList',
					query: this.$route.query
				});
			},
			tz() { //   跳转排行榜连接
				this.toApp('WIP', {
					path: '/wxInvest',
					query: {
						thisUrl: this.$route.fullPath
					}
				})
			},

			localTheFirst() { //判断用户第一次进来展示引导页
				if(localStorage.pagecount) {
					localStorage.pagecount = Number(localStorage.pagecount) + 1;
				} else {
					localStorage.pagecount = 1
				}
				if(localStorage.pagecount == 1) {
					this.guidanceBox = true;
					this.showLayer = true;
				}
			}
		},
		components: {
			wxHeader,
		},
		created: function() { //  调用函数
			this.initData(),
				this.userRanking(), //  用户排名和出借的接口
				this.localTheFirst()
		},
		mounted: function() {
			var lefts = Math.ceil(Math.random() * 10); //  0-10随机数
			var tops = Math.ceil(Math.random() * 5); //  0-5随机数
			$('.gs1').css({
				"left": lefts * lefts + 'px',
				'top': tops * tops + 'px'
			});
			$('.gs2').css({
				"right": lefts * lefts + 'px',
				"top": tops * tops + 'px'
			})
		}
	}
</script>

<style lang="scss" scoped>
	@-webkit-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-o-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-moz-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-ms-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	#pickWelfare {
		width: 100%;
		height: auto;
		.fl_bg {
			width: 10rem;
			height: 16.533333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/home_bg.png?v=1.2) no-repeat;
			background-size: cover;
			overflow: hidden;
			position: relative;
			.welfare_box {
				width: 100%;
				height: 5rem;
				margin-top: 6.8rem;
				position: relative;
				.gs1,
				.gs2 {
					width: 2.4rem;
					position: absolute;
					overflow: hidden;
					p {
						width: 2.36rem;
						height: 0.533333rem;
						font-size: 0.293333rem;
						color: #127500;
						line-height: 0.533333rem;
						text-align: center;
					}
				}
				.gs1 {
					height: 2.56rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/gs1.png?v=1.1) no-repeat;
					background-size: cover;
					-webkit-animation: sf 3.5s infinite;
					-moz-animation: sf 3.5s infinite;
					-ms-animation: sf 3.5s infinite;
					animation: sf 3.5s infinite;
					p {
						margin-top: 2.053333rem;
					}
				}
				.gs2 {
					height: 2.453333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/gs2.png?v=1.1) no-repeat;
					background-size: 100%;
					-webkit-animation: sf 3s infinite;
					-moz-animation: sf 3s infinite;
					-ms-animation: sf 3s infinite;
					animation: sf 3s infinite;
					p {
						margin-top: 1.95rem;
					}
				}
			}
			.rule_btn {
				width: 1.506666rem;
				height: 1.506666rem;
				position: absolute;
				right: 1.37rem;
				top: 2.63rem;
			}
			.rule_box {
				width: 9.106666rem;
				height: 14.186666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/rule_bg.png?v=1.2) no-repeat;
				background-size: cover;
				position: fixed;
				top: -0.1rem;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				padding: 13.5rem 0.866666rem 0 0.6rem;
				z-index: 1000;
				.rule_close_btn {
					width: 0.8rem;
					height: 0.8rem;
					position: absolute;
					right: 0.42rem;
					top: 4.7rem;
				}
				p {
					font-size: 0.293333rem;
					font-family: 'PingFangSC-Regular';
					color: #127500;
					line-height: 0.426666rem;
					margin-bottom: 0.2rem;
					padding-left: .4rem;
					position: relative;
					span {
						position: absolute;
						left: 0;
						top: 0;
					}
				}
			}
			.calculator_box_btn {
				width: 1.76rem;
				height: 1.04rem;
				position: absolute;
				right: .5rem;
				top: 5.55rem;
			}
			.calculator_box {
				width: 7.733333rem;
				height: 6.893333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/calculator_bg.png?v=1.2) no-repeat;
				background-size: cover;
				position: fixed;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				margin: auto;
				overflow: hidden;
				z-index: 1000;
				.calculator_close_btn {
					width: 0.8rem;
					height: 0.8rem;
					position: absolute;
					right: 0.188rem;
					top: 0.67rem;
				}
				.calculator_btn {
					width: 2.026666rem;
					height: 0.813333rem;
					position: absolute;
					top: 5.413333rem;
					right: 0.65rem;
				}
				.input_box,
				.select_box {
					width: 4.666666rem;
					height: 0.666666rem;
					border-radius: 0.053333rem;
					line-height: 0.666666rem;
				}
				.input_box {
					position: absolute;
					top: 3.2rem;
					bottom: 0.386666rem;
					left: 2.4rem;
					input {
						display: block;
						width: 100%;
						height: 100%;
						padding-left: .15rem;
						border: none;
						color: #238201;
					}
				}
				.select_box {
					position: absolute;
					left: 2.4rem;
					top: 4.25rem;
					padding-left: .1rem;
					select {
						width: 100%;
						height: 100%;
						display: block;
						border: none;
						background: transparent;
						color: #238201;
						outline: none;
					}
				}
				.number_box {
					width: 3rem;
					height: 0.6rem;
					font-size: 0.426666rem;
					color: #F24D42;
					position: absolute;
					left: 2.5rem;
					bottom: 0.72rem;
					overflow: hidden;
				}
			}
			.ranking_box {
				width: 8.773333rem;
				height: 1.8rem;
				position: absolute;
				bottom: .48rem;
				left: 0;
				right: 0;
				margin: auto;
				font-size: 0.48rem;
				color: #0D5B01;
				.ranking_text {
					width: 2.666666rem;
					height: 0.666666rem;
					position: relative;
					left: .3rem;
					top: .9rem;
					text-align: center;
					line-height: 0.666666rem;
				}
				.ranking_btn {
					width: 2.44rem;
					height: 0.933333rem;
					position: relative;
					top: -.24rem;
					left: 3.05rem;
				}
				.money_text {
					width: 2.666666rem;
					height: 0.666666rem;
					position: relative;
					left: 6rem;
					top: -0.7rem;
					text-align: center;
					line-height: 0.666666rem;
				}
			}
			.public_box {
				/*公用弹框*/
				width: 6.666666rem;
				height: 5.146666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/popup1.png?v=1.0) no-repeat;
				background-size: cover;
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				padding: 1.333333rem 0.2rem 0 0.2rem;
				z-index: 1000;
				.public_close_btn {
					width: 0.8rem;
					height: 0.8rem;
					position: absolute;
					right: 0.36rem;
					top: 0rem;
				}
				.go_btn {
					width: 3.733333rem;
					height: 0.88rem;
					position: absolute;
					bottom: 0.48rem;
					left: 0;
					right: 0;
					margin: auto;
					text-indent: 1rem;
					line-height: 0.88rem;
					color: #FFF;
					font-size: 0.373333rem;
					font-weight: 700;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/arrows.png?v=1.0) no-repeat;
					background-size: 0.306666rem 0.32rem;
					background-position: 2.3rem center;
				}
				.text_box {
					width: 6.266666rem;
					height: 2rem;
					color: #127500;
					text-align: center;
					overflow: hidden;
					h2 {
						font-size: 0.346666rem;
						font-weight: 700;
						margin-bottom: 0.2rem;
						margin-top: 0.533333rem;
					}
					h3 {
						font-size: 0.293333rem;
					}
				}
			}
			.zj_popup {
				/*中奖的弹框*/
				width: 6.666666rem;
				height: 7.28rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/popup2.png?v=1.0) no-repeat;
				background-size: cover;
				position: fixed;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				padding-top: 2.466666rem;
				text-align: center;
				color: #127500;
				font-size: 0.32rem;
				z-index: 1000;
				.zj_close {
					width: 0.8rem;
					height: 0.8rem;
					position: absolute;
					top: 0;
					right: 0.333333rem;
				}
				.zj_btn {
					width: 3.733333rem;
					height: 0.88rem;
					position: absolute;
					bottom: .75rem;
					left: 0;
					right: 0;
					margin: auto;
				}
				strong {
					font-size: 0.826666rem;
				}
				span {
					font-size: 0.266666rem;
				}
			}
			.guidance_box {
				/*第一次进来指导弹框*/
				width: 9.04rem;
				height: 10.946666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/hint_bg.png?v=1.0) no-repeat;
				background-size: cover;
				position: absolute;
				left: 0;
				top: .5rem;
				right: 0;
				margin: auto;
				z-index: 1000;
				.guidance_close {
					width: 0.8rem;
					height: 0.8rem;
					position: absolute;
					right: 0.04rem;
					top: 0rem;
				}
			}
		}
	}
</style>