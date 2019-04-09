<template>
	<div id="carnival">
		<wx-header v-if="!osType" :logo="'冰雪嘉年华'"></wx-header>
		<div class="main">

			<!-- 历程展示部分-->
			<div class="show_course_box">
				<div class="route_text">{{meterData}}米</div>
				<div class="go_invest_btn" @click="goInvest"></div>
			</div>

			<!--赛道部分-->
			<div class="run_box">
				<div class="run_bg">
					<!--小人-->
					<div class="person_box" id="personBox"></div>
					<ul>
						<!--activeBg可以领取的类名-->
						<li v-for="(listVal,index) in getRedList">
							<!--不能兑换的按钮-->
							<div class="get_btn" @click="notGetRedEvent" v-if="listVal.isChange == 2"></div>
							<!--可以兑换的按钮-->
							<div class="get_btn activeBg" @click="getRedEvent(listVal.awardValue,listVal.typeId,index)" v-else></div>

						</li>
					</ul>
				</div>
			</div>

			<!--规则按钮-->
			<div class="rule_btn" @click="btnAlert = 1"></div>



			<!--规则弹窗-->
			<div class="rule_popUp" v-if="btnAlert == 1">
				<!-- <div class="close_btn" @click="btnAlert = 0"></div> -->
				<p v-if="osType == 'IOS'">6、本活动奖励与苹果公司无关</p>
			</div>


			<!--兑换奖励弹框-->
			<div class="dhBox" v-if="btnAlert == 6">
				<!-- <div class="close_btn" @click="cancelBtn"></div> -->
				<p class="p1">恭喜您获得现金红包</p>
				<p class="p2"><span>{{awardName}}</span>元</p>
				<div class="btn1" @click="cancelBtn"></div>
				<div class="btn2" @click="dhListShow"></div>
			</div>

			<!--计算器按钮@click="calculatorBtn"-->
			<div class="calculator_box_btn" @click="btnAlert = 2"></div>
			<!--计算器弹框-->
			<div class="calculator_popUp" v-if="btnAlert == 2">
				<!-- <div class="close_btn" @click="jisuanqi"></div> -->
				<div class="input_box">
					<!--数字输入框按钮-->
					<input type="text" placeholder="请输入出借金额" v-model="inputNumber" id="inputNumber" />
				</div>
				<div class="select_box">
					<!--标选择框-->
					<select name="" id="sel">
						<option :value="v.meter" v-for="(v,$index) in biaoList">冰雪产品期限{{v.limit}}/{{v.meter}}米</option>
					</select>
				</div>
				<div class="result_text">{{investmentMoney}}</div>
				<div class="calculator_btn" @click="checkInput"></div>
			</div>

			<!--查看兑换奖励按钮-->
			<div class="look_award_btn" @click="dhListShow"></div>
			<!--查看兑换奖励弹框-->
			<div class="look_award_popUp" v-if="btnAlert == 3">
				<!-- <div class="close_btn" @click="closeBtn"></div> -->
				<div class="my_dh_list">
					<div class="null_show" v-if="myDhList.length == 0">
						<p>您还未兑换奖励，快去兑换吧！</p>
					</div>
					<ul>
						<li class="clear" v-for="myDhData in myDhList">
							<span>{{myDhData.addTimeStr}}</span>
							<span>{{myDhData.changeValue}}米</span>
							<span>{{myDhData.awardValue}}元</span>
						</li>
					</ul>
				</div>
			</div>

			<!--好友助力奖励按钮-->
			<div class="friend_help_btn" @click="friendListShow"></div>
			<!--好友助力奖励弹窗-->
			<div class="friend_help_popUp" v-if="btnAlert == 4">
				<!-- <div class="close_btn" @click="btnAlert = 0"></div> -->
				<div class="my_friend_list">
					<div class="null_show" v-if="friendList.length == 0">
						<p>您还未获得好友助力，赶快分享邀请好友吧！</p>
					</div>
					<ul>
						<li class="clear" v-for="friendData in friendList">
							<span>{{friendData.inviteTimeStr}}</span>
							<span>{{friendData.userName}}</span>
							<span>{{friendData.inviteAward}}米</span>
							<span>{{friendData.inviteAwardName}}</span>
						</li>
					</ul>
				</div>
			</div>

			<!--邀请按钮-->
			<div class="invitation_btn" @click="invite"></div>

			<div :class="{layer1:btnAlert == 2,layer2:btnAlert == 3,layer3:btnAlert == 4,layer4:btnAlert == 5,layer5:btnAlert == 6}" v-if="btnAlert" class="close-btn" @click="hideBtnAlert(btnAlert)"></div>
			
			<!--点击分享的-->
			<div :class="{layer:btnAlert == 5}" v-if="btnAlert" class="zIndex" v-layer></div>
		</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; // 头部
//	import wxToapp from '../../../../common/wx/wxToapp'; // app交互
    import wxShare from '../../../../common/wx/wxShare';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxShare],
		data() {
			return {
				btnAlert:0,   // 弹框  1:规则 2:计算器按钮 3:查看兑换奖励 4:好友助力奖励 5:分享 6:兑换奖励
				activityTime: '', // 活动时间
				logLose: '', // 登录信息失效
				meterData: 0, // 滑雪路程米数
				meterDataLength: 0, // 米数长度显示动画
				getRedList: [], // 领取红包列表
				awardName: '', // 红包名字
				typeId: null, // 红包id
				inputNumber: '', //    计算器的输入框
				className: '', //  小人的类名
				biaoList: [{
						limit: '30天',
						meter: '0.5'
					},
					{
						limit: '60天',
						meter: '1'
					},
					{
						limit: '90天',
						meter: '1.5'
					},
					{
						limit: '180天',
						meter: '3'
					},
					{
						limit: '360天',
						meter: '6'
					},
				],
				investmentMoney: 0, //  计算后展示的金额
				myDhList: [], // 我的兑换列表数据
				friendList: [], // 好友助力列表数据
				shareObj: { //分享标题内容配置
					title: "极速前进，帮我助力一程!", //标题
					desc: "冰雪狂欢季，海量现金免费领，注册享365红包，快来与我极速前进！", //内容
					link: global.host + "wx/iceSnowCarnivalInvitation", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				}
			}
		},

		methods: {
			hideBtnAlert(n){ // 关闭弹窗
				if(n==1 || n==2 || n==5 || n==4){
					this.btnAlert = 0
				}else if(n==3){
					this.closeBtn()
				}else if(n==6){
					this.cancelBtn()
				}
			},
			jisuanqi(){    // 关闭计算器
				this.btnAlert = 0
				this.inputNumber = ''
				this.investmentMoney = 0
			},
			timeLimit() {
				this.notLogPost('/activity/iceCarnival/judgeInActivityPeriod', (data) => {
					if(data.resCode == 1) {
						this.activityTime = data.resData.active;
						if(data.resData.active == 2) {
							MessageBox.alert('亲，活动尚未开始哦!', '提示', {
								confirmButtonClass: 'confirmButton'
							})
						} else if(data.resData.active == 3) {
							MessageBox.alert('亲，活动已经结束啦!', '提示', {
								confirmButtonClass: 'confirmButton'
							})
						}
					}
				}, {}, 1)
			},

			initData() { // 初始化接口/activity/iceCarnival/showIceCarnival -1用户未登录0请求失败1请求成功
				this.notLogPost('/activity/iceCarnival/showIceCarnival', (data) => {
					this.getRedList = data.resData.activityExchangeRecordModels; // 红包列表
					this.logLose = data.resCode; // 活动状态
					if(data.resCode == 1) {
						this.meterData = data.resData.meter; // 我的米数
					}
				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1)
			},

			getRedEvent(name, i, index) { //   点击领取红包按钮事件
				let _this = this;
				if(this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else if(this.activityTime == 3) {
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else {
					$('.person_box').addClass('person' + (index + 1));
					_this.className = "person" + (index + 1)
					setTimeout(function() {
						let awardName = _this.awardName = name;
						MessageBox.confirm('您是否兑换' + awardName+'元现金红包', {
							confirmButtonText: '确定',
							confirmButtonClass: 'confirmButton',
							cancelButtonClass: 'cancelButton',
						}).then(action => {
							_this.getAppData('/activity/iceCarnival/meterExchange', (data) => {
								if(data.resCode == 1) { // 领取成功
									_this.btnAlert = 6;
									_this.meterData = data.resData.meter; // 我的米数
									_this.getRedList = data.resData.activityExchangeRecordModels; // 红包列表
								} else if(data.resCode == -1) {
									MessageBox.confirm('亲！登录信息失效重新登录', {
										confirmButtonText: '登录',
										confirmButtonClass: 'confirmButton',
										cancelButtonClass: 'cancelButton',
									}).then(action => {
										_this.toApp('LG', {
											path: '/wxLogin',
											query: {
												thisUrl: _this.$route.fullPath
											}
										})
									})
								}
							}, (_this.osType ? {
								typeId: _this.typeId = i
							} : {
								typeId: _this.typeId = i
							}));
						}, action => { // 点击取消事件
							$('.person_box').removeClass('person' + (index + 1));
						})
					}, 1500)

				}
			},

			cancelBtn() { // 点击路程兑换奖励弹框取消的按钮
				this.btnAlert = 0
				$('.person_box').removeClass(this.className);
			},
			
			closeBtn(){    // 查看兑换奖励弹框关闭按钮事件
				this.btnAlert = 0
				$('.person_box').removeClass(this.className);
			},

			notGetRedEvent() { // 不能领取红包点击按钮事件
				if(this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else if(this.activityTime == 3) {
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else {
					if(this.userId || this.getCookie('userToken')) { // 已经登录
						if(this.logLose == -1) {
							MessageBox.confirm('亲！登录信息失效重新登录', {
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
						} else {
							MessageBox.alert('您尚未达到当前滑雪路程', '提示', {
								confirmButtonClass: 'confirmButton'
							})
						}

					} else { // 未登录
						MessageBox.confirm('亲！你还未登录喔，请登录后参与活动。', {
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

			dhListShow() { // 我的兑换奖励列表
				if(this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else if(this.activityTime == 3) {
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else {
					if(this.userId || this.getCookie('userToken')) { // 已经登录
						this.notLogPost('/activity/iceCarnival/iceCarnivalExchangeRewards', (data) => { // 我的兑换奖励列表显示的内容
							if(data.resCode == 1) {
								this.myDhList = data.resData.activityExchangeRecordModels; // 兑换列表数据
							}
						}, (this.osType ? {
							oauthToken: this.token
						} : {

						}));
						this.btnAlert = 3
					} else { // 未登录
						MessageBox.confirm('亲！你还未登录喔，请登录后查看。', {
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

			friendListShow() { // 好友助力奖励列表
				if(this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else if(this.activityTime == 3) {
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else {
					if(this.userId || this.getCookie('userToken')) { // 已经登录
						this.notLogPost('/activity/iceCarnival/iceCarnivalInviteRewards', (data) => { // 好友助力奖励列表显示的内容
							if(data.resCode == 1) {
								this.friendList = data.resData.inviteUserModels; // 好友助力列表数据
							}
						}, (this.osType ? {
							oauthToken: this.token
						} : {

						}));
						this.btnAlert = 4;
					} else { // 未登录
						MessageBox.confirm('亲！你还未登录喔，请登录后查看。', {
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

			invite() { // 邀请还有助力按钮事件
				if(this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else if(this.activityTime == 3) {
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else {
					if(this.userId || this.getCookie('userToken')) { // 已经登录
						if(this.osType) {
							this.isLogPassValue(this.appShare)
						} else {
							this.btnAlert = 5;
						}
					} else { // 未登录
						MessageBox.confirm('亲！你还未登录喔，请登录后参与活动。', {
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

			goInvest() { // 去出借
				this.toApp('WIP', {
					path: '/wxInvest',
					query: {
						thisUrl: this.$route.funllPath
					}
				})
			},

			checkInput() { // 点击计算按钮事件  
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
					this.investmentMoney = 0;
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
					this.investmentMoney = 0;
					return;
				}
				//限制只能输入一个小数点  
				if(str.indexOf(".") != -1) {
					var str_ = str.substr(str.indexOf(".") + 1);
					//限制只能输入一个小数点  
					if(str_.indexOf(".") != -1) {
						//str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
						Toast({ //    小黑快
							message: '请输入正确的格式',
							iconClass: 'icon icon-success',
							duration: 1000
						});
						this.inputNumber = '';
						this.investmentMoney = 0;
						return;
					}
				}
				if(parseInt(Number(str)) >= 1 && parseInt(Number(str)) <= 999999999) {
					let num = parseFloat(this.inputNumber / 100 * oSel);
					//四舍五入保留两位小数
                  this.investmentMoney =Math.round(num*100)/100;     
				} else {
					Toast({ //    小黑快
						message: '最多只能输入九位数哦，请重新输入！',
						iconClass: 'icon icon-success',
						duration: 1000
					});
					this.inputNumber = '';
					this.investmentMoney = 0;
					return;
				}
			},
		},

		created: function() {
			this.timeLimit(); // 活动时间调用
			this.initData(); // 初始化接口
		},
		components: {
			wxHeader,
		},
		mounted: function() {
			this.getWxShareData(this.shareObj); //分享调用
		},
		watch: {
			'btnAlert'(val) {
				if (val==2) {
					this.inputNumber = ''
					this.investmentMoney = 0
				}
			}
		}

	}
</script>

<style>
	.confirmButton,
	.cancelButton {
		font-size: 0.48rem !important;
	}
	.zIndex{
		z-index: 99 !important;
	}
</style>
<style lang="scss" scoped>
	/*人的动画*/
	@-webkit-keyframes name1X {
		/*48米动画调好*/
		0% {
			left: 0;
		}
		100% {
			left: 3rem;
		}
	}
	
	@-moz-keyframes name1X {
		0% {
			left: 0;
		}
		100% {
			left: 3rem;
		}
	}
	
	@-ms-keyframes name1X {
		0% {
			left: 0;
		}
		100% {
			left: 3rem;
		}
	}
	
	@-o-keyframes name1X {
		0% {
			left: 0;
		}
		100% {
			left: 3rem;
		}
	}
	
	@keyframes name1X {
		0% {
			left: 0;
		}
		100% {
			left: 3rem;
		}
	}
	/***************************************************/
	
	@-webkit-keyframes name2X {
		/*120米调好*/
		0% {
			left: 3rem;
		}
		45% {
			top: -1rem;
		}
		100% {
			top: 0rem;
			left: 6.6rem;
		}
	}
	
	@-moz-keyframes name2X {
		0% {
			left: 3rem;
		}
		45% {
			top: -1rem;
		}
		100% {
			top: 0rem;
			left: 6.6rem;
		}
	}
	
	@-ms-keyframes name2X {
		0% {
			left: 3rem;
		}
		45% {
			top: -1rem;
		}
		100% {
			top: 0rem;
			left: 6.6rem;
		}
	}
	
	@-o-keyframes name2X {
		0% {
			left: 3rem;
		}
		45% {
			top: -1rem;
		}
		100% {
			top: 0rem;
			left: 6.6rem;
		}
	}
	
	@keyframes name2X {
		0% {
			left: 3rem;
		}
		45% {
			top: -1rem;
		}
		100% {
			top: 0rem;
			left: 6.6rem;
		}
	}
	/***************************************************/
	
	@-webkit-keyframes name3X {
		/*288米*/
		0% {
			top: 0;
			left: 6.6rem;
		}
		50% {
			left: 6.6rem;
		}
		100% {
			top: 2.4rem;
			left: 5.5rem;
		}
	}
	
	@-moz-keyframes name3X {
		0% {
			top: 0;
			left: 6.6rem;
		}
		50% {
			left: 6.6rem;
		}
		100% {
			top: 2.4rem;
			left: 5.5rem;
		}
	}
	
	@-ms-keyframes name3X {
		0% {
			top: 0;
			left: 6.6rem;
		}
		50% {
			left: 6.6rem;
		}
		100% {
			top: 2.4rem;
			left: 5.5rem;
		}
	}
	
	@-o-keyframes name3X {
		0% {
			top: 0;
			left: 6.6rem;
		}
		50% {
			left: 6.6rem;
		}
		100% {
			top: 2.4rem;
			left: 5.5rem;
		}
	}
	
	@keyframes name3X {
		0% {
			top: 0;
			left: 6.6rem;
		}
		50% {
			left: 6.6rem;
		}
		100% {
			top: 2.4rem;
			left: 5.5rem;
		}
	}
	/***************************************************/
	
	@-webkit-keyframes name4X {
		/*1188米*/
		0% {
			top: 2.4rem;
			left: 5.5rem;
		}
		100% {
			top: 2.4rem;
			left: 2rem;
		}
	}
	
	@-moz-keyframes name4X {
		0% {
			top: 2.4rem;
			left: 5.5rem;
		}
		100% {
			top: 2.4rem;
			left: 2rem;
		}
	}
	
	@-ms-keyframes name4X {
		0% {
			top: 2.4rem;
			left: 5.5rem;
		}
		100% {
			top: 2.4rem;
			left: 2rem;
		}
	}
	
	@-o-keyframes name4X {
		0% {
			top: 2.4rem;
			left: 5.5rem;
		}
		100% {
			top: 2.4rem;
			left: 2rem;
		}
	}
	
	@keyframes name4X {
		0% {
			top: 2.4rem;
			left: 5.5rem;
		}
		100% {
			top: 2.4rem;
			left: 2rem;
		}
	}
	/***************************************************/
	
	@-webkit-keyframes name5X {
		/*1980米*/
		0% {
			top: 2.4rem;
			left: 2rem;
		}
		50% {
			left: 0rem;
		}
		100% {
			top: 5rem;
			left: 0rem;
		}
	}
	
	@-moz-keyframes name5X {
		0% {
			top: 2.4rem;
			left: 2rem;
		}
		50% {
			left: 0rem;
		}
		100% {
			top: 5rem;
			left: 0rem;
		}
	}
	
	@-ms-keyframes name5X {
		0% {
			top: 2.4rem;
			left: 2rem;
		}
		50% {
			left: 0rem;
		}
		100% {
			top: 5rem;
			left: 0rem;
		}
	}
	
	@-o-keyframes name5X {
		0% {
			top: 2.4rem;
			left: 2rem;
		}
		50% {
			left: 0rem;
		}
		100% {
			top: 5rem;
			left: 0rem;
		}
	}
	
	@keyframes name5X {
		0% {
			top: 2.4rem;
			left: 2rem;
		}
		50% {
			left: 0rem;
		}
		100% {
			top: 5rem;
			left: 0rem;
		}
	}
	/***************************************************/
	
	@-webkit-keyframes name6X {
		/*4080米*/
		0% {
			top: 5rem;
			left: 0rem;
		}
		100% {
			top: 6.3rem;
			left: 2rem;
		}
	}
	
	@-moz-keyframes name6X {
		0% {
			top: 5rem;
			left: 0rem;
		}
		100% {
			top: 6.3rem;
			left: 2rem;
		}
	}
	
	@-ms-keyframes name6X {
		0% {
			top: 5rem;
			left: 0rem;
		}
		100% {
			top: 6.3rem;
			left: 2rem;
		}
	}
	
	@-o-keyframes name6X {
		0% {
			top: 5rem;
			left: 0rem;
		}
		100% {
			top: 6.3rem;
			left: 2rem;
		}
	}
	
	@keyframes name6X {
		0% {
			top: 5rem;
			left: 0rem;
		}
		100% {
			top: 6.3rem;
			left: 2rem;
		}
	}
	/***************************************************/
	
	@-webkit-keyframes name7X {
		/*8880米*/
		0% {
			top: 6.3rem;
			left: 2rem;
		}
		100% {
			top: 6.3rem;
			left: 5.3rem;
		}
	}
	
	@-moz-keyframes name7X {
		0% {
			top: 6.3rem;
			left: 2rem;
		}
		100% {
			top: 6.3rem;
			left: 5.3rem;
		}
	}
	
	@-ms-keyframes name7X {
		0% {
			top: 6.3rem;
			left: 2rem;
		}
		100% {
			top: 6.3rem;
			left: 5.3rem;
		}
	}
	
	@-o-keyframes name7X {
		0% {
			top: 6.3rem;
			left: 2rem;
		}
		100% {
			top: 6.3rem;
			left: 5.3rem;
		}
	}
	
	@keyframes name7X {
		0% {
			top: 6.3rem;
			left: 2rem;
		}
		100% {
			top: 6.3rem;
			left: 5.3rem;
		}
	}
	/***************************************************/
	
	@-webkit-keyframes name8X {
		/*12000*/
		0% {
			top: 6.3rem;
			left: 5.3rem;
		}
		100% {
			top: 6.3rem;
			left: 7.7rem;
		}
	}
	
	@-moz-keyframes name8X {
		0% {
			top: 6.3rem;
			left: 5.3rem;
		}
		100% {
			top: 6.3rem;
			left: 7.7rem;
		}
	}
	
	@-ms-keyframes name8X {
		0% {
			top: 6.3rem;
			left: 5.3rem;
		}
		100% {
			top: 6.3rem;
			left: 7.7rem;
		}
	}
	
	@-o-keyframes name8X {
		0% {
			top: 6.3rem;
			left: 5.3rem;
		}
		100% {
			top: 6.3rem;
			left: 7.7rem;
		}
	}
	
	@keyframes name8X {
		0% {
			top: 6.3rem;
			left: 5.3rem;
		}
		100% {
			top: 6.3rem;
			left: 7.7rem;
		}
	}
	/****************************************************/
	/****************************************************/
	/*球球 动画*/
	
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
	
	#carnival {
		font-family: DIN-Medium;
		.main {
			width: 100%;
			height: 45.933333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/bg.png?v=1.5) no-repeat;
			background-size: cover;
			overflow: hidden;
			position: relative;
			.close-btn{
				width: 1.413333rem;
				height: 1.413333rem;
				position: fixed;
				top: 3.04rem;
				right:1.25rem;
				z-index: 199;
			}
			.close-btn.layer1{
				top: 4.63rem;
				right:1.25rem;
			}
			.close-btn.layer2{
				top: 3.78rem;
    			right: 1rem;
			}
			.close-btn.layer3{
				top: 3.78rem;
    			right: 1rem;
			}
			.close-btn.layer4{
				width: auto;
				height: auto;
				left: 0;
				bottom: 0;
				top: 0;
    			right: 0;
				margin: auto;
			}
			.close-btn.layer5{
				top: 4.5rem;
    			right: 1.25rem;
			}
			.rule_btn {
				width: 0.906666rem;
				height: 1.973333rem;
				position: fixed;
				right: 0rem;
				top: 2rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/rule_btn.png?v=1.1) no-repeat;
				background-size: cover;
				z-index: 99;
			}
			.rule_popUp,
			.calculator_popUp,
			.look_award_popUp,
			.friend_help_popUp,
			.dhBox {
				/*弹窗的样式*/
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				z-index: 100;
				.close_btn {
					width: .613333rem;
					height: .613333rem;
					position: absolute;
					right: .13rem;
					top: 0;
				}
				.close_btn.alert1{

				}
			}
			.rule_popUp {
				width: 6.933333rem;
				height: 11.106666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/rule_box.png?v=1.7) no-repeat;
				background-size: cover;
				color: #333;
				padding-top: 10.3rem;
				font-size: 0.32rem;
				padding-left: .3rem;				
			}
			.dhBox {
				width: 6.933333rem;
				height: 8.186666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/dhBox.png?v=1.0) no-repeat;
				background-size: cover;
				padding-top: 3rem;
				color: #FF4242;
				text-align: center;
				.p1 {
					font-size: 0.56rem;
					margin-bottom: .1rem;
				}
				.p2 {
					font-size: 0.72rem;
					span {
						font-size: 1.28rem;
					}
				}
				.btn1,
				.btn2 {
					width: 2.4rem;
					height: 0.8rem;
					position: absolute;
					top: 6.586666rem;
				}
				.btn1 {
					left: 0.8rem;
				}
				.btn2 {
					right: 0.8rem;
				}
			}
			.calculator_popUp {
				width: 6.933333rem;
				height: 7.92rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/calculatorBox.png?v=1.0) no-repeat;
				background-size: cover;
				color: #363636;
				font-size: .293333rem;
				.input_box {
					width: 4.24rem;
					height: 0.65rem;
					position: absolute;
					top: 2.86rem;
					left: 2.4rem;
					input {
						width: 100%;
						height: 100%;
						padding-left: .2rem;
						color: #1F2176;
						font-size: 0.32rem;
						border: none;
						outline: none;
					}
				}
				.select_box {
					width: 4.8rem;
					height: 0.666666rem;
					position: absolute;
					left: 1.9rem;
					top: 3.9rem;
					select {
						width: 100%;
						height: 100%;
						display: block;
						border: none;
						background: transparent;
						color: #1F2176;
						outline: none;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/icon.png?v=1.0) no-repeat scroll 4.3rem center;
						background-size: 0.306666rem 0.186666rem;
						padding-left: .2rem;
						-webkit-appearance: none;
						-moz-appearance: none;
						-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
						-webkit-tap-highlight-color: transparent;
					}
				}
				.result_text {
					width: 3.5rem;
					height: 0.6rem;
					color: #F24D42;
					font-size: 0.426666rem;
					position: absolute;
					left: 3rem;
					top: 5rem;
					line-height: .6rem;
					overflow: hidden;
				}
				.calculator_btn {
					width: 4.8rem;
					height: 1.066666rem;
					position: absolute;
					left: 0;
					right: 0;
					bottom: 0.64rem;
					margin: auto;
				}
			}
			.look_award_popUp {
				width: 7.2rem;
				height: 9.64rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/awardBox.png?v=1.0) no-repeat;
				background-size: cover;
				color: #363636;
				font-size: .293333rem;
				padding-top: 3.066666rem;
				overflow: hidden;
				.close_btn {
					right: 0rem;
				}
				.my_dh_list {
					width: 100%;
					height: 6.5rem;
					overflow: auto;
					li {
						margin-bottom: 0.266666rem;
						span {
							width: 33.33%;
							height: 0.4rem;
							display: inline-block;
							float: left;
							font-size: 0.32rem;
							color: #333333;
							text-align: center;
						}
					}
					.null_show {
						width: 100%;
						height: 100%;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/kong.png?v=1.0) no-repeat;
						background-size: 2.08rem 2.08rem;
						background-position: center 0.5rem;
						padding-top: 3rem;
						p {
							font-size: 0.32rem;
							color: #5B5B5B;
							text-align: center;
						}
					}
				}
			}
			.friend_help_popUp {
				width: 7.2rem;
				height: 9.64rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/friendBox.png?v=1.0) no-repeat;
				background-size: cover;
				color: #363636;
				font-size: .293333rem;
				padding-top: 3.066666rem;
				overflow: hidden;
				.close_btn {
					right: 0rem;
				}
				.my_friend_list {
					width: 100%;
					height: 6.5rem;
					overflow: auto;
					li {
						margin-bottom: 0.266666rem;
						span {
							height: 0.4rem;
							display: inline-block;
							float: left;
							font-size: 0.32rem;
							color: #333333;
							text-align: center;
						}
						span:nth-child(1) {
							width: 30%;
						}
						span:nth-child(2) {
							width: 30%;
						}
						span:nth-child(3) {
							width: 20%;
						}
						span:nth-child(4) {
							width: 20%;
						}
					}
					.null_show {
						width: 100%;
						height: 100%;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/kong.png?v=1.0) no-repeat;
						background-size: 2.08rem 2.08rem;
						background-position: center 0.5rem;
						padding-top: 3rem;
						p {
							font-size: 0.32rem;
							color: #5B5B5B;
							text-align: center;
						}
					}
				}
			}
			.show_course_box {
				width: 100%;
				height: 2.533333rem;
				margin: 12.586666rem 0 0.373333rem 0;
				position: relative;
				.route_text {
					width: 1.9rem;
					height: 0.4rem;
					position: absolute;
					left: 4.4rem;
					top: 1.15rem;
					color: #FFEF5E;
					font-size: 0.346666rem;
					line-height: .4rem;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal;
				}
				.go_invest_btn {
					width: 2.24rem;
					height: 0.7rem;
					position: absolute;
					right: 1.306666rem;
					top: 1.25rem
				}
			}
			.run_box {
				width: 100%;
				height: 9.733333rem;
				position: relative;
				padding-top: 0.87rem;
				.run_bg {
					width: 100%;
					height: 8.866666rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/run_bg.png?v=1.2) no-repeat;
					background-size: cover;
					position: relative;
					.person_box {
						width: 2.266666rem;
						height: 2.266666rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/person1.png?v=1.0) no-repeat;
						background-size: cover;
						text-align: center;
						line-height: 1rem;
						position: absolute;
						top: -1rem;
						left: 0rem;
						z-index: 98;
					}
					.person1 {
						-webkit-animation: name1X 2s linear forwards;
						-ms-animation: name1X 2s linear forwards;
						-moz-animation: name1X 2s linear forwards;
						-o-animation: name1X 2s linear forwards;
						animation: name1X 2s linear forwards;
					}
					.person2 {
						-webkit-animation: name2X 1.8s linear forwards;
						-ms-animation: name2X 1.8s linear forwards;
						-moz-animation: name2X 1.8s linear forwards;
						-o-animation: name2X 1.8s linear forwards;
						animation: name2X 1.8s linear forwards;
					}
					.person3 {
						-webkit-animation: name3X 1.6s linear forwards;
						-ms-animation: name3X 1.6s linear forwards;
						-moz-animation: name3X 1.6s linear forwards;
						-o-animation: name3X 1.6s linear forwards;
						animation: name3X 1.6s linear forwards;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/person2.png?v=1.0) no-repeat;
						background-size: cover;
					}
					.person4 {
						-webkit-animation: name4X 1.5s linear forwards;
						-ms-animation: name4X 1.5s linear forwards;
						-moz-animation: name4X 1.5s linear forwards;
						-o-animation: name4X 1.5s linear forwards;
						animation: name4X 1.5s linear forwards;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/person2.png?v=1.0) no-repeat;
						background-size: cover;
					}
					.person5 {
						-webkit-animation: name5X 1.2s linear forwards;
						-ms-animation: name5X 1.2s linear forwards;
						-moz-animation: name5X 1.2s linear forwards;
						-o-animation: name5X 1.2s linear forwards;
						animation: name5X 1.2s linear forwards;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/person2.png?v=1.0) no-repeat;
						background-size: cover;
					}
					.person6 {
						-webkit-animation: name6X 1s linear forwards;
						-ms-animation: name6X 1s linear forwards;
						-moz-animation: name6X 1s linear forwards;
						-o-animation: name6X 1s linear forwards;
						animation: name6X 1s linear forwards;
					}
					.person7 {
						-webkit-animation: name7X 0.8s linear forwards;
						-ms-animation: name7X 0.8s linear forwards;
						-moz-animation: name7X 0.8s linear forwards;
						-o-animation: name7X 0.8s linear forwards;
						animation: name7X 0.8s linear forwards;
					}
					.person8 {
						-webkit-animation: name8X 0.6s linear forwards;
						-ms-animation: name8X 0.6s linear forwards;
						-moz-animation: name8X 0.6s linear forwards;
						-o-animation: name8X 0.6s linear forwards;
						animation: name8X 0.6s linear forwards;
					}
					ul {
						width: 100%;
						height: 100%;
						position: relative;
						li {
							.get_btn {
								position: absolute;
							}
						}
						.activeBg {
							width: 1.693333rem;
							height: 1.826666rem;
						}
						li:nth-child(1) {
							.get_btn {
								width: 1.893333rem;
								height: 0.866666rem;
								left: 4.333333rem;
								top: -.88rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash1.png?v=1.0) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(2) {
							.get_btn {
								width: 1.986666rem;
								height: 1.386666rem;
								left: 7.48rem;
								top: -.8rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash2.png?v=1.0) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(3) {
							.get_btn {
								width: 1.92rem;
								height: 1.013333rem;
								left: 5.266666rem;
								top: 2.65rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash3.png?v=1.1) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(4) {
							.get_btn {
								width: 1.973333rem;
								height: 0.946666rem;
								left: 2.693333rem;
								top: 2.75rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash4.png?v=1.0) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(5) {
							.get_btn {
								width: 1.866666rem;
								height: 1.413333rem;
								left: 0;
								top: 3.45rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash5.png?v=1.0) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(6) {
							.get_btn {
								width: 2.106666rem;
								height: 0.946666rem;
								left: 2.453333rem;
								top: 6.45rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash6.png?v=1.0) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(7) {
							.get_btn {
								width: 2.146666rem;
								height: 0.946666rem;
								left: 5rem;
								top: 6.45rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash7.png?v=1.0) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(8) {
							.get_btn {
								width: 2.146666rem;
								height: 0.96rem;
								left: 7.6rem;
								top: 6.45rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/cash8.png?v=1.0) no-repeat;
								background-size: cover;
							}
						}
						li:nth-child(1) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get1.png?v=1.0) no-repeat;
								background-size: cover;
								left: 3.6rem;
								top: -1.2rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(2) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get2.png?v=1.0) no-repeat;
								background-size: cover;
								left: 6.8rem;
								top: -1.5rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}
						li:nth-child(3) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get3.png?v=1.1) no-repeat;
								background-size: cover;
								left: 5.5rem;
								top: 2.1rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(4) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get4.png?v=1.0) no-repeat;
								background-size: cover;
								left: 2.7rem;
								top: 2.4rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}
						li:nth-child(5) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get5.png?v=1.0) no-repeat;
								background-size: cover;
								left: 0;
								top: 3.7rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(6) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get6.png?v=1.0) no-repeat;
								background-size: cover;
								left: 3rem;
								top: 6rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}
						li:nth-child(7) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get7.png?v=1.0) no-repeat;
								background-size: cover;
								left: 5.5rem;
								top: 6rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(8) {
							.get_btn.activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get8.png?v=1.0) no-repeat;
								background-size: cover;
								left: 8.2rem;
								top: 6rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}
					}
				}
			}
			.calculator_box_btn {
				width: 2.2rem;
				height: 0.666666rem;
				position: absolute;
				top: 26.413333rem;
				left: 0.933333rem;
			}
			.look_award_btn {
				width: 2.6rem;
				height: 0.666666rem;
				position: absolute;
				top: 26.413333rem;
				right: 0.6rem;
			}
			.friend_help_btn {
				width: 2.6rem;
				height: 0.7rem;
				position: absolute;
				top: 35.1rem;
				right: 0.6rem;
			}
			.invitation_btn {
				width: 3.6rem;
				height: 0.83rem;
				position: absolute;
				top: 39.6rem;
				right: 0;
				left: 0;
				margin: auto;
			}
			// .mark_box {
			// 	width: 100%;
			// 	height: 100%;
			// 	position: fixed;
			// 	left: 0;
			// 	top: 0;
			// 	right: 0;
			// 	bottom: 0;
			// 	margin: auto;
			// 	background: #000;
			// 	opacity: .5;
			// 	z-index: 99;
			// }
			.layer {
				background: url(https://aliyunsso.edspay.com/web/wx/activity/CustomRedEnvelope/fenxiang.png?v=1.0) no-repeat;
				background-size: 100%;
			}
		}
	}
</style>