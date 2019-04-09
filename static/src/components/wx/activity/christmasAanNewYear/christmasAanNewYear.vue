<template>
	<div id="christmasNewYear">
		<wx-header v-if="!osType" :logo="'双“蛋”有好礼'"></wx-header>
		<div class="main">
			<!--红包机数字区域-->
			<ul class="red_machine_area clear">
				<li>
					<p>{{baiwei}}</p>
				</li>
				<li>
					<p>{{shiwei}}</p>
				</li>
				<li>
					<p>{{gewei}}</p>
				</li>
			</ul>

			<!--红包机下拉框-->
			<div class="selct_box">
				<select name="" id="sel">
					<option :value="v" v-for="(v,index) in moneyList">{{v}}</option>
				</select>
			</div>

			<!--红包机标的选择-->
			<ul class="obj_box clear">
				<li v-for="(v,index) in biaoList" @click="clickTab(index)" :class="{activeBg:index==numIndex}">
					{{v}}月标
					<i></i>
				</li>
			</ul>

			<!--红包机按钮-->
			<div class="red_btn_box" @click="getRed"></div>

			<!--红包弹窗-->
			<div class="red_popUp_box" v-if="redPopUpBox">
				<div class="close_btn" @click="[redPopUpBox=false,markBox=false]"></div>
				<p class="text_box">恭喜您获得出借红包</p>
				<p class="money_box">234<span>元</span></p>
				<p class="range_box">单笔出借满25000元，1月标起</p>
				<div class="receive_box"></div>
			</div>

			<!--福利二区域-->
			<!--年华出借和去出借按钮-->
			<div class="money_box">
				<p>{{myInvestment}}元</p>
				<div class="go_invest_btn" @click="goInvest"></div>
			</div>

			<!--年化出借进度条-->
			<div class="plan_conter_box">
				<!--线条-->
				<div class="plan_line_box">
					<div class="plan_line_color" :style="{width:width+'%'}"></div>
				</div>
				<!--线条上的圆点-->
				<div class="vNum">
					<i v-for="(val,index) in integral" :class="{active:val<=myInvestment}" :style="{left:leftList[index],marginLeft:-0.293333+'rem'}">
					</i>
				</div>
				<!--圆点下面的金额-->
				<ol class="sumo_box clear">
					<!--正式上线的时候改-->
					<li v-for="(val,index) in sumoList" :style="{left:leftList[index],marginLeft:-0.293333+'rem'}">{{val.changeValue/10000}}万</li>
				</ol>

			</div>

			<!--兑换列表-->
			<div class="prize_list_box">
				<ul class="clear">
					<li v-for="(item,index) in giftTwoList">
						<div class="img_name">
							<img :src="imgName+(index+1)+'.png'" alt="" />
						</div>
						<!--正式上线的时候改-->
						<p>年化出借金额：{{item.changeValue/10000}}万</p>
						<!--可以兑换的按钮-->
						<div class="convert_btn" @click="clickDh(item.awardValue,item.typeId)" v-if="item.isChange == 1 && item.changeValue <= myInvestment || item.isChange == 1"></div>
						<!--不可以兑换的按钮  当有not_convert_btn类名按钮置灰-->
						<div class="convert_btn not_convert_btn" @click="notConvertBtn" v-else></div>
					</li>
				</ul>
				<!--我的兑换奖励按钮-->
				<div class="look_duihuan_btn" @click="dhShow"></div>
			</div>

			<!--邀请按钮-->
			<div class="invitation_btn" @click="goInvitation"></div>

			<!--我的话费奖励按钮-->
			<div class="look_huafei_btn" @click="hfShow"></div>

			<!--规则按钮-->
			<div class="rule_btn" @click="[ruleBox=true,markBox=true]"></div>

			<!--规则弹框-->
			<div class="rule_box" v-if="ruleBox">
				<div class="close_btn" @click="[ruleBox=false,markBox=false]"></div>
				<p v-if="osType == 'IOS'">7、本活动与苹果公司无关。</p>
			</div>

			<!--我的兑换奖励列表弹框-->
			<div class="my_dh_box" v-if="dhBox">
				<div class="close_btn" @click="[dhBox=false,markBox=false]"></div>
				<div class="my_convert_box">
					<ul>
						<li class="clear" v-for="time in dhList">
							<span>{{time.awardValue}}元京东E卡</span>
							<span>{{time.changeNum}}次</span>
						</li>
					</ul>
				</div>
			</div>

			<!--我的话费奖励弹框-->
			<div class="my_hf_box" v-if="hfBox">
				<div class="close_btn" @click="[hfBox=false,markBox=false]"></div>
				<div class="my_award_list">
					<div class="null_show" v-if="myAwardList.length == 0">
						<p>您还未获得话费奖励，赶快分享邀请好友吧！</p>
					</div>
					<ul>
						<li class="clear" v-for="award in myAwardList">
							<span>{{award.inviteTimeStr}}</span>
							<span>{{award.userName}}</span>
							<span>10元话费</span>
						</li>
					</ul>

				</div>
			</div>

		</div>
		<!--遮罩-->
		<div class="mark_box" v-if="markBox"></div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; // 头部
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxToapp],
		data() { // 初始数据
			return {
				ruleBox: false, // 规则弹框
				dhBox: false, // 兑换弹窗
				dhList: [], // 兑换奖励列表弹窗
				hfBox: false, // 话费弹窗
				redPopUpBox: false, // 红包弹窗
				markBox: false, // 遮罩
				numIndex: 0, // 标的选择初始化
				moneyList: [ // 出借金额区间
					"5000-20000（元）",
					"20001-40000（元）",
					"40001-60000（元）",
					"60001-70000（元）",
					"70001-80000（元）",
					"80001-100000（元）",
					"100001-（元）以上"
				],
				biaoList: [1, 2, 3, 6, 12], // 标的名字
				biaoIndex: 0, // 标的的下标
				redList: [ //  标的期限列表和标的红包
					["10", "40", "90", "130", "155", "175", "210"], //  一月
					["25", "100", "200", "300", "350", "420", "520"], // 二月
					["45", "170", "350", "520", "610", "700", "888"], // 三月
					["60", "260", "500", "750", "880", "999", "999"], // 六月
					["120", "500", "999", "999", "999", "999", "999"] // 12月
				],
				redEnvelopeId: null, // 红包id
				baiwei: 0, // 百位
				timeLogin: 0, // /活动时间
				shiwei: 0, // 十位
				gewei: 0, // 个位
				interval: null, // 数字滚动开始时间
				countdown: null, // 数字滚动结束时间
				times: 0, // 数字滚动的时间
				lock: true, // 开关
				optionIndex: 0, //  金额的下标
				redPacketId: 0, //红包的id

				giftTwoList: [], // 福利二兑换列表
				imgName: 'https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/award', // 福利二礼物图片
				myAwardList: [], // 我的话费奖励列表
				myInvestment: 0, // 我的年华出借总额 
				activityTime: '', //活动开始结束时间
				awardName: '', // 兑换的奖励名字
				isChange: null, // 是否可以兑换奖品
				typeId: null, // 兑换类型的id
				width: 0, // 进度条的宽度
				amount: '', // 
				sumoList: [], // 进度条的后台返回金额数据
				//正式上线的时候改
				integral: [10000, 60000, 100000, 150000, 300000], // 进度条对应的金额
				leftPrice: 0, // 圆点的left距离
				marginLeft: 0, //  圆点的margin值
				leftList: [], //存放圆点距离的空数组
			}
		},
		methods: { // 事件函数

			goInvest() { // 去出借
				if(!this.osType) {
					$(document).scrollTop(0);
				}
				this.toApp('WIP', {
					path: '/wxInvest',
					query: {
						thisUrl: this.$route.fullPath
					}
				})
			},

			goInvitation() { // 邀请页面
				_czc.push(﻿["_trackEvent", "双蛋有礼活动", "邀请有礼按钮"]); //  友盟统计配置
				this.toWxUrl('/wxInvitationIndex'); // 跳转
				if(!this.osType) {
					$(document).scrollTop(0);
				}
			},

			//********************************************************************************
			clickTab(i) { // 标的选项卡
				this.numIndex = i;
				this.biaoIndex = i;
			},
			//红包机活动
			getRed() { // 点击生成红包按钮触发事件
				if(this.userId || this.getCookie('userToken')) { //已经登录
					var _this = this;
					_this.optionIndex = $("#sel").val(); // 金额区间
					var optionValue = _this.optionIndex.split("-")[0]; // 金额区间截取
					if(!this.lock) {
						return;
					}
					_this.lock = false;
					_this.getAppData('/activity/towEgg/createRedEnvelope', (data) => {
						if(data.resCode == 1) {
							this.amount = data.resData.amount + '';
							this.redEnvelopeId = data.resData.redEnvelopeId; // 红包Id
							if(!this.interval) {
								this.interval = setInterval(function() {
									_this.baiwei = Math.floor(Math.random() * 10);
									_this.shiwei = Math.floor(Math.random() * 10);
									_this.gewei = Math.floor(Math.random() * 10);
								}, 10)
							}
							this.countdown = setInterval(function() { //生成数字后
								_this.times++
									if(_this.times == 5) {
										clearInterval(_this.interval);
										clearInterval(_this.countdown);
										_this.interval = null;
										_this.countdown = null;
										_this.times = 0;
									}
							}, 200);
							redFn(1)
							setTimeout(function() {
								_this.lock = true; //开关关闭
							}, 2000)
						} else if(data.resCode == 2) { // 存在未使用红包
							this.amount = data.resData.amount + '';
							this.redEnvelopeId = data.resData.redEnvelopeId; // 红包Id
							if(!this.interval) {
								this.interval = setInterval(function() {
									_this.baiwei = Math.floor(Math.random() * 10);
									_this.shiwei = Math.floor(Math.random() * 10);
									_this.gewei = Math.floor(Math.random() * 10);
								}, 10)
							}
							this.countdown = setInterval(function() { //生成数字后
								_this.times++
									if(_this.times == 5) {
										clearInterval(_this.interval);
										clearInterval(_this.countdown);
										_this.interval = null;
										_this.countdown = null;
										_this.times = 0;
									}
							}, 200);
							redFn(0)
							setTimeout(function() {
								_this.lock = true; //开关关闭
							}, 2000)
						} else if(data.resCode == 3) { // 非法选择
							MessageBox.alert(data.resData.msg, {
								confirmButtonClass: 'confirmButton',
							}).then(action => {
								setTimeout(function() {
									_this.lock = true; //开关关闭
								}, 2000)
							});
						} else if(data.resCode == 0) { // 请求失败
							MessageBox.alert(data.resData.msg, {
								confirmButtonClass: 'confirmButton',
							}).then(action => {
								setTimeout(function() {
									_this.lock = true; //开关关闭
								}, 2000)
							});
						} else if(data.resCode == -1) { // 未登录
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
							setTimeout(function() {
								_this.lock = true; //开关关闭
							}, 2000)
						} else if(data.resCode == -2) { // 活动未开始
							MessageBox.alert(data.resData.msg, {
								confirmButtonClass: 'confirmButton',
							}).then(action => {
								setTimeout(function() {
									_this.lock = true; //开关关闭
								}, 2000)
							});
						} else if(data.resCode == -3) { // 活动结束
							MessageBox.alert(data.resData.msg, {
								confirmButtonClass: 'confirmButton',
							}).then(action => {
								setTimeout(function() {
									_this.lock = true; //开关关闭
								}, 2000)
							});
						} else if(data.resCode == -4) { // 活动已失效	
							MessageBox.alert(data.resData.msg, {
								confirmButtonClass: 'confirmButton',
							}).then(action => {
								setTimeout(function() {
									_this.lock = true; //开关关闭
								}, 2000)
							});
						}

					}, {
						money: optionValue,
						month: this.biaoList[this.biaoIndex]
					}, 1)
					$("#sel").change(function() {
						$("select:first option:first").attr("selected", false);
					})

					function redFn(n) {
						let btn;
						let texts;
						if(n == 1) {
							btn = '领取';
							texts = '<span style="color:#333;">恭喜您成功生成' + _this.amount + '元出借红包。</span><br/><span style="color:#F95E3F;font-size:14px;">红包领取后，使用掉才能领取下一个！</span>'
						} else if(n == 0) {
							btn = "去出借";
							texts = '<span style="color:#333;">恭喜您成功生成' + _this.amount + '元出借红包。</span><br/><span style="color:#F95E3F;font-size:14px;">上个红包还没使用，请使用后领取！</span>'
						}
						setTimeout(function() {
							if(parseInt(_this.amount) >= 100) {
								_this.baiwei = _this.amount.substr(0, 1);
								_this.shiwei = _this.amount.substr(1, 1);
								_this.gewei = _this.amount.substr(2, 1);
							} else {
								_this.baiwei = 0;
								_this.shiwei = _this.amount.substr(0, 1);
								_this.gewei = _this.amount.substr(1, 1);
							}
							MessageBox.confirm(texts, { //生成数字后弹框
								cancelButtonText: '重置红包',
								confirmButtonClass: 'confirmButton',
								cancelButtonClass: 'cancelButton',
								closeOnClickModal: false,
								confirmButtonText: btn
							}).then(action => { //点击领取执行的事件
								_this.lock = true;
								if(n == 1) {
									_this.getAppData('/activity/towEgg/receiveRedEnvelope', (data) => {
										if(data.resCode == 0) {
											MessageBox.alert("请求失败", {
												confirmButtonClass: 'confirmButton'
											}, ).then(action => {});
										} else if(data.resCode == 1) {
											MessageBox.alert("领取成功", {
												confirmButtonClass: 'confirmButton',
											}).then(action => {});
										} else if(data.resCode == 2) {
											MessageBox.alert("活动未开启，请等待", {
												confirmButtonClass: 'confirmButton'
											}, ).then(action => {});
										} else if(data.resCode == 3) {
											MessageBox.alert("活动已结束", {
												confirmButtonClass: 'confirmButton'
											}, ).then(action => {});
										} else if(data.resCode == 4) {
											MessageBox.alert("非法红包", {
												confirmButtonClass: 'confirmButton'
											}, ).then(action => {});
										}
									}, {
										redEnvelopeId: _this.redEnvelopeId
									});
								} else if(n == 0) {
									_this.toApp('WIP', {
										path: '/wxInvest',
										query: {
											thisUrl: _this.$route.fullPath
										}
									})
								}
								_this.baiwei = 0
								_this.shiwei = 0
								_this.gewei = 0
								_this.numIndex = 0;
								$('#sel').val('5000-20000（元）');
								$("select:first option:first").attr("selected", true);
							}, action => { //点击重置的按钮
								_this.lock = true;
								_this.baiwei = 0
								_this.shiwei = 0
								_this.gewei = 0
								_this.biaoIndex = 0 //  标的月份的下标置0
								_this.optionIndex = 0 //  金额的下标置0								
								_this.numIndex = 0;
								$('#sel').val('5000-20000（元）');
								$("select:first option:first").attr("selected", true);
							})
						}, 1100)
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
			},

			//********************************************************************************
			//兑换活动
			showInitial() { // 双蛋展示页面初始化接口
				this.notLogPost('/activity/towEgg/showAnnualInvestmentAmount', (data) => { // 福利2兑换列表显示的内容
					this.timeLogin = data.resCode;
					if(data.resCode == -1) {
						this.giftTwoList = data.resData.activityExchangeRecordModels; // 兑换奖励列表
						this.sumoList = data.resData.activityExchangeRecordModels; // 进度条列表

					} else if(data.resCode == 1) {
						this.myInvestment = parseInt(data.resData.annualInvestment); // 年华出借总额
						this.getWidth(this.myInvestment); // 进度条调用
						this.sumoList = data.resData.activityExchangeRecordModels; // 进度条列表
						this.giftTwoList = data.resData.activityExchangeRecordModels; // 兑换奖励列表
						this.awardName = data.resData.activityExchangeRecordModels.awardValue; // 兑换奖品的名字
						this.isChange = data.resData.activityExchangeRecordModels.isChange; //  是否可以兑换的状态
						this.typeId = data.resData.activityExchangeRecordModels.typeId; // 兑换类型的id
					} else if(data.resCode == 0) {
						MessageBox.alert(data.resMsg, '提示', {
							confirmButtonClass: 'confirmButton'
						}, );
						this.giftTwoList = data.resData.activityExchangeRecordModels; // 兑换奖励列表
					} else if(data.resCode == -2) {
						MessageBox.alert(data.resMsg, '提示', {
							confirmButtonClass: 'confirmButton'
						}, );
						this.giftTwoList = data.resData.activityExchangeRecordModels; // 兑换奖励列表
					} else if(data.resCode == -3) {
						MessageBox.alert(data.resMsg, '提示', {
							confirmButtonClass: 'confirmButton'
						}, );
						this.giftTwoList = data.resData.activityExchangeRecordModels; // 兑换奖励列表
					} else if(data.resCode == -4) {
						MessageBox.alert(data.resMsg, '提示', {
							confirmButtonClass: 'confirmButton'
						}, );
						this.giftTwoList = data.resData.activityExchangeRecordModels; // 兑换奖励列表
					}

				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1);

				for(var i = 0; i < this.integral.length; i++) { //  计算圆点和原点下面的数字距离
					if(i == 0) {
						this.leftList.push(0 + '%');
					} else if(0 < i && i < this.integral.length - 1) {
						this.leftList.push((this.integral[i] - this.integral[0]) / (this.integral[this.integral.length - 1] - this.integral[0]) * 100 + '%');
					} else if(i == this.integral.length - 1) {
						this.leftList.push(100 + '%');
					}
				}
			},

			getWidth(num) { // 进度条事件
				let listLength = this.integral.length;
				if(num < this.integral[0]) {
					this.width = 0;
				} else if(num > this.integral[listLength - 1]) {
					this.width = 100;
				} else {
					this.width = (num - this.integral[0]) / (this.integral[this.integral.length - 1] - this.integral[0]) * 100;
				}
			},

			dhShow() { // 点击我的兑换奖励按钮判断是否登录
				if(this.userId || this.getCookie('userToken')) { //已经登录
					this.notLogPost('/activity/towEgg/exchangeRewards', (data) => { // 福利2兑换列表显示的内容
						if(data.resCode == 1) {
							this.dhBox = true;
							this.markBox = true;
							this.dhList = data.resData.activityExchangeRecordModels;
						} else if(data.resCode == 0) {
							MessageBox.alert('请求失败', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						} else if(data.resCode == -1) {
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
						} else if(data.resCode == -2) {
							MessageBox.alert('活动未开始', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						} else if(data.resCode == -3) {
							MessageBox.alert('活动已结束', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						} else if(data.resCode == -4) {
							MessageBox.alert('活动已经失效', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						}

					}, (this.osType ? {
						oauthToken: this.token
					} : {

					}));

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
			},

			notConvertBtn() { // 当不能兑换时，点击触发的事件
				MessageBox.alert('亲！您年化出借额不足，无法兑换。', '提示', {
					confirmButtonClass: 'confirmButton',
				});
			},

			clickDh(name, i) { // 点击兑换按钮提示的弹框
				if(this.userId || this.getCookie('userToken')) { //已经登录
					if(this.timeLogin == -3) {
						MessageBox.alert('活动已结束', '提示', {
							confirmButtonClass: 'confirmButton'
						}, );
					} else if(this.timeLogin == -2) {
						MessageBox.alert('活动未开始', '提示', {
							confirmButtonClass: 'confirmButton'
						}, );
					} else if(this.timeLogin == 0) {
						MessageBox.alert('初始化失败，请刷新页面', '提示', {
							confirmButtonClass: 'confirmButton'
						}, );
					} else {
						let awardName = this.awardName = name
						MessageBox.confirm('您是否兑换' + awardName + '元京东E卡', {
							confirmButtonText: '确定',
							confirmButtonClass: 'confirmButton',
						}).then(action => { // 点击确定按钮请求的兑换接口
							this.notLogPost('/activity/towEgg/annualInvestmentAmountExchange', (data) => { // 福利2兑换列表显示的内容
								if(data.resCode == 1) {
									this.myInvestment = parseInt(data.resData.annualInvestment); // 总年华出借金额
									this.getWidth(this.myInvestment); // 进度条调用
									this.giftTwoList = data.resData.activityExchangeRecordModels; //兑换奖励列表
									MessageBox.alert('兑换成功', '提示', {
										confirmButtonClass: 'confirmButton'
									}, );
								} else if(data.resCode == 0) {
									MessageBox.alert('请求失败', '提示', {
										confirmButtonClass: 'confirmButton'
									}, );
								} else if(data.resCode == -1) {
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
								} else if(data.resCode == -4) {
									MessageBox.alert('活动已经失效', '提示', {
										confirmButtonClass: 'confirmButton'
									}, );
								}

							}, (this.osType ? {
								oauthToken: this.token,
								typeId: this.typeId = i
							} : {
								typeId: this.typeId = i
							}));
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
			},

			hfShow() { // 点击我的话费奖励按钮判断是否登录
				if(this.userId || this.getCookie('userToken')) { //已经登录
					this.notLogPost('/activity/towEgg/inviteRewards', (data) => { // 福利2兑换列表显示的内容
						if(data.resCode == 1) {
							this.myAwardList = data.resData.inviteUserModels;
						} else if(data.resCode == 0) {
							MessageBox.alert('请求失败', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						} else if(data.resCode == -1) {
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
						} else if(data.resCode == -2) {
							MessageBox.alert('活动未开始', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						} else if(data.resCode == -3) {
							MessageBox.alert('活动结束', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						} else if(data.resCode == -4) {
							MessageBox.alert('活动已经失效', '提示', {
								confirmButtonClass: 'confirmButton'
							}, );
						}

					}, (this.osType ? {
						oauthToken: this.token
					} : {

					}));
					this.hfBox = true;
					this.markBox = true;
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
			},

		},
		created: function() { // 初始调用
			this.showInitial(); //  双蛋展示页面接口调用
		},
		components: { // 组件调用
			wxHeader,
		},
		mounted() {
			// 友盟数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1271412092&web_id=1271412092 '
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		watch: { // 监听
			'$route' () {
				if(window._czc) { // 友盟数据统计监听
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
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
</style>

<style lang="scss" scoped>
	#christmasNewYear {
		font-family: DIN-Medium;
		.main {
			width: 100%;
			height: 54.946666rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/bg.png?v=1.3) no-repeat;
			background-size: cover;
			position: relative;
			overflow: hidden;
			.rule_btn {
				width: 0.84rem;
				height: 1.973333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/rule_btn.png?v=1.0);
				background-size: cover;
				position: fixed;
				top: 3.866666rem;
				right: 0;
			}
			.rule_box,
			.my_dh_box,
			.my_hf_box,
			.red_popUp_box {
				position: fixed;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				margin: auto;
				z-index: 100;
				.close_btn {
					width: 0.613333rem;
					height: 0.613333rem;
					position: absolute;
					right: 0.2rem;
					top: 0;
				}
			}
			.rule_box {
				width: 7.066666rem;
				height: 11.106666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/ruleBox.png?v=1.3) no-repeat;
				background-size: cover;
				padding-top: 9.95rem;
				p {
					font-size: 0.293333rem;
					color: #3D7E60;
					letter-spacing: 0;
					line-height: 35px;
					padding-left: 0.36rem;
				}
			}
			.my_dh_box {
				width: 7.066666rem;
				height: 8.44rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/lookDuihuanBox.png?v=1.0) no-repeat;
				background-size: cover;
				padding-top: 3.866666rem;
				overflow: hidden;
				.my_convert_box {
					width: 100%;
					height: 4.5rem;
					ul {
						li {
							width: 100%;
							margin-bottom: 0.36rem;
							span {
								width: 50%;
								height: 0.533333rem;
								font-size: 0.346666rem;
								color: #1A6A4C;
								text-align: center;
								display: block;
								float: left;
							}
						}
					}
				}
			}
			.my_hf_box {
				width: 7.066666rem;
				height: 8.44rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/lookHuafeiBox.png?v=1.1) no-repeat;
				background-size: cover;
				padding-top: 3.466666rem;
				overflow: hidden;
				.my_award_list {
					width: 100%;
					height: 5.066666rem;
					overflow: auto;
					li {
						margin-bottom: 0.266666rem;
						span {
							width: 33.33%;
							height: 0.4rem;
							display: inline-block;
							float: left;
							font-size: 0.293333rem;
							color: #1A6A4C;
							text-align: center;
						}
					}
					.null_show {
						width: 100%;
						height: 100%;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/null_icon.png?v=1.0) no-repeat;
						background-size: 2.08rem 2.08rem;
						background-position: center 0.5rem;
						padding-top: 3rem;
						p {
							font-size: 0.32rem;
							color: #1A6A4C;
							text-align: center;
						}
					}
				}
			}
			.red_popUp_box {
				width: 6.933333rem;
				height: 7.92rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/popUpBox.png?v=1.0) no-repeat;
				background-size: cover;
				padding-top: 2.586666rem;
				box-sizing: border-box;
				text-align: center;
				.close_btn {
					right: 0.12rem;
				}
				.text_box {
					font-size: 0.48rem;
					color: #F03630;
					margin-bottom: 0.35rem;
				}
				.money_box {
					font-size: 1.066666rem;
					color: #F03630;
					margin-bottom: 0.4rem;
					font-weight: 700;
					span {
						font-size: 0.613333rem;
						font-weight: normal;
					}
				}
				.range_box {
					font-size: 0.32rem;
					color: #F03630;
					margin-bottom: 0.89rem;
				}
				.receive_box {
					width: 4rem;
					height: 0.82rem;
					margin: 0 auto;
				}
			}
			.red_machine_area {
				width: 7.2rem;
				height: 2.24rem;
				margin: 9.813333rem auto 0.266666rem auto;
				padding-top: .1rem;
				box-sizing: border-box;
				li {
					width: 33.33%;
					float: left;
					height: 100%;
					text-align: center;
					line-height: 2.24rem;
					font-size: 1.84rem;
					color: #F95E3F;
				}
			}
			.selct_box {
				width: 5.066666rem;
				height: 0.8rem;
				background: #fff;
				border-radius: 1.32rem;
				margin-left: 2.64rem;
				margin-bottom: 0.3rem;
				select {
					width: 100%;
					height: 100%;
					display: block;
					border: none;
					outline: none;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/Triangle1.png) no-repeat scroll 4.4rem center #fff;
					background-size: 0.373333rem 0.253333rem;
					border-radius: 1.32rem;
					line-height: 0.8rem;
					padding-left: .2rem;
					color: #3B6B04;
					font-size: 0.4rem;
					-webkit-appearance: none;
					-moz-appearance: none;
					-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
					-webkit-tap-highlight-color: transparent;
					/* For some Androids */
				}
			}
			.obj_box {
				width: 100%;
				height: 0.68rem;
				padding-left: 2.65rem;
				margin-bottom: 0.933333rem;
				li {
					width: 1.186666rem;
					height: 0.68rem;
					background: #fff;
					float: left;
					border-radius: 0.12rem;
					margin-right: 0.173333rem;
					font-size: 0.36rem;
					color: #3B6B04;
					text-align: center;
					line-height: 0.68rem;
					position: relative;
				}
				li.activeBg {
					background: #3B6B04;
					color: #fff;
					i {
						display: block;
						width: 0.306666rem;
						height: 0.28rem;
						position: absolute;
						right: -0.066666rem;
						top: -0.1rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/icon1.png?v=1.0) no-repeat;
						background-size: cover;
					}
				}
			}
			.red_btn_box {
				width: 4.213333rem;
				height: 1.266666rem;
				margin: 0 auto 3.3rem auto;
			}
			.money_box {
				width: 100%;
				height: 0.7rem;
				position: relative;
				line-height: 0.7rem;
				p {
					width: 2.96rem;
					height: 100%;
					padding-left: .2rem;
					position: absolute;
					left: 3.45rem;
					top: 0;
					color: #EE3836;
					font-family: DIN-Medium;
					font-size: 0.426666rem;
				}
				.go_invest_btn {
					width: 1.693333rem;
					height: 0.7rem;
					position: absolute;
					top: 0;
					right: 1.9rem;
				}
			}
			.plan_conter_box {
				width: 8.7rem;
				padding: 0.493333rem 0.466666rem 0 0.466666rem;
				margin: 0 auto;
				position: relative;
				.plan_line_box {
					width: 7.466666rem;
					height: 0.08rem;
					background: #C4C4C4;
					position: relative;
					.plan_line_color {
						width: 0%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						background: #EE3331;
					}
				}
				.vNum {
					width: 7.466666rem;
					height: 0.533333rem;
					position: relative;
					top: -0.32rem;
					i {
						display: inline-block;
						width: 0.533333rem;
						height: 0.533333rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/hint2.png?v=1.0);
						background-repeat: no-repeat;
						background-size: cover;
						position: absolute;
						top: 0;
					}
					i.active {
						background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/hint1.png?v=1.0);
						background-repeat: no-repeat;
						background-size: cover;
					}
				}
				ol.sumo_box {
					width: 7.466666rem;
					height: 0.4rem;
					position: relative;
					top: -.2rem;
					li {
						display: inline-block;
						font-size: 0.346666rem;
						color: #25805E;
						position: absolute;
						top: 0;
					}
					li:last-child {
						width: 1rem;
					}
				}
			}
			.prize_list_box {
				width: 8.7rem;
				margin: 1.5rem auto 7.05rem 0.613333rem;
				padding: 0 0.6rem;
				position: relative;
				ul {
					li {
						width: 3.466666rem;
						height: 5.213333rem;
						background: #FFD65D;
						border-radius: 0.226666rem;
						float: left;
						margin-bottom: 0.626666rem;
						.img_name {
							width: 2.36rem;
							height: 2.986666rem;
							margin: 0.133333rem auto 0.266666rem auto;
							img {
								width: 100%;
							}
						}
						p {
							font-size: 0.32rem;
							color: #1A6A4C;
							text-align: center;
							margin-bottom: 0.306666rem;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.convert_btn {
							width: 2.6rem;
							height: 0.8rem;
							background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/get_btn1.png?v=1.0) no-repeat;
							background-size: cover;
							margin: 0 auto;
						}
						.convert_btn.not_convert_btn {
							background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/get_btn2.png?v=1.0) no-repeat;
							background-size: cover;
						}
					}
					li:nth-child(even) {
						margin-left: 0.55555rem;
					}
				}
				.look_duihuan_btn {
					width: 2.613333rem;
					height: 1.08rem;
					position: absolute;
					top: 11.65rem;
					right: 1.45rem;
				}
			}
			.invitation_btn {
				width: 4.2rem;
				height: 0.866666rem;
				position: absolute;
				left: 2.866666rem;
				top: 47.85rem;
			}
			.look_huafei_btn {
				width: 2.65rem;
				height: 0.65rem;
				position: absolute;
				left: 3.8rem;
				top: 49rem;
			}
		}
		.mark_box {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			background: #000;
			opacity: .5;
			z-index: 99;
		}
	}
</style>
