<template>
	<div id="nianyKind">
		<wx-header v-if="!osType" :logo="'年货盛宴 约战新年'"></wx-header>
		<div class="main">
			<!--规则按钮-->
			<div class="rule_btn" @click="[markBox = true,ruleBox = true]"></div>

			<!--规则弹窗-->
			<div class="rule_box" v-if="ruleBox">
				<div class="close_btn" @click="[markBox = false,ruleBox = false]"></div>
				<p v-if="osType == 'IOS'">8、本活动与苹果公司无关。</p>
			</div>

			<!--生成红包区域-->
			<div class="get_red_box">
				<div class="select_box">
					<select name="" id="sel1">
						<option :value="v" v-for="(v,index) in moneyList">{{v}}</option>
					</select>
				</div>
				<div class="select_box">
					<select name="" id="sel2">
						<option :value="v" v-for="(v,index) in biaoList">{{v}}月标</option>
					</select>
				</div>

				<div class="getBtn" @click="getRed"></div>
			</div>

			<!--红包机弹窗-->
			<div class="red_popUp_box" v-if="redPopUpBox">
				<div class="close_btn" @click="[redPopUpBox=false,markBox=false,lock = true]"></div>
				<p class="text_box">恭喜您生成出借红包</p>
				<p class="money_box">{{amount}}<span>元</span></p>
				<p class="range_box" v-if="redState==1">红包领取后，使用掉才能领取下一个！</p>
				<p class="range_box" v-else-if="redState==2">上个红包还没使用，请使用后领取！</p>
				<!--取消按钮-->
				<div class="cancel_btn" @click="clickReset" style="color: #940F0F;">重置</div>
				<!--领取按钮-->
				<div class="confirm_btn" @click="lqRed" v-if="redState==1">领取</div>
				<!--去出借按钮-->
				<div class="invest_btn" @click="goInvest" v-else-if="redState==2">去出借</div>
			</div>

			<!--出借领取福袋区域-->
			<ul class="getLucky">
				<li v-for="getValue in getList">
					<!--能领取按钮-->
					<div class="btn" v-if="getValue.isBright == 1" @click="getIncident(getValue.id)"></div>
					<!--已领取按钮-->
					<div class="btn yes_btn" @click="yetGetIncident" v-else-if="getValue.isBright == 2"></div>
					<!--不能领取按钮-->
					<div class="btn not_btn" @click="noGetIncident" v-else-if="getValue.isBright == 3"></div>
				</li>
			</ul>

			<!--出借兑换区域-->
			<!--我的年华出借和去出借按钮-->
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
					<i v-for="(val,index) in sumoList" :class="{active:val <= myInvestment}" :style="{left:leftList[index],marginLeft:-0.293333+'rem'}">
					</i>
				</div>
				<!--圆点下面的金额-->
				<ol class="sumo_box clear">
					<!--正式上线的时候改/10000 加上单位万-->
					<li v-for="(val,index) in giftTwoList" :style="{left:leftList[index],marginLeft:-0.293333+'rem'}">{{val.changeValue/10000}}万</li>	
				</ol>
			</div>

			<!--兑换列表-->
			<div class="prize_list_box">
				<ul class="clear">
					<li v-for="(prizeValue,index) in giftTwoList">
						<div class="img_name">
							<img alt="" :src="imgName+(index+1)+'.png?v=1.0'" />
						</div>
						<p>商品价值<span>{{prizeValue.awardValue}}元</span></p>
						<!--正式上线的时候改/10000  <p>年化出借金额：{{prizeValue.changeValue/100}}万</p>-->
						<p>年化出借金额：{{prizeValue.changeValue/10000}}万</p>
						<!--可以兑换的按钮-->
						<div class="convert_btn" @click="clickDh(prizeValue.awardName,prizeValue.typeId)" v-if="prizeValue.isChange == 1 && prizeValue.changeValue <= myInvestment || prizeValue.isChange == 1"></div>
						<!--不可以兑换的按钮  当有not_convert_btn类名按钮置灰-->
						<div class="convert_btn not_convert_btn" @click="notConvertBtn" v-else></div>
					</li>
				</ul>
			</div>

			<!--我的兑换奖励按钮-->
			<div class="look_duihuan_btn" @click="dhShow"></div>

			<!--我的兑换奖励列表弹框-->
			<div class="my_dh_box" v-if="myDhBox">
				<div class="close_btn" @click="[markBox = false,myDhBox = false]"></div>
				<div class="my_convert_box">
					<ul>
						<li class="clear" v-for="vlaueDh in dhList">
							<span>{{vlaueDh.changeNum}}次</span>
						</li>
					</ul>
				</div>
			</div>

			<!--我的话费奖励按钮-->
			<div class="look_huafei_btn" @click="hfShow"></div>

			<!--我的话费奖励弹框-->
			<div class="my_hf_box" v-if="myHfBox">
				<div class="close_btn" @click="[markBox = false,myHfBox = false]"></div>
				<div class="my_award_list">
					<div class="null_show" v-if="myAwardList.length == 0">
						<p>您还未获得话费奖励，赶快分享邀请好友吧！</p>
					</div>
					<ul>
						<li class="clear" v-for="myHfData in myAwardList">
							<span>{{myHfData.inviteTimeStr}}</span>
							<span>{{myHfData.userName}}</span>
							<span>10元话费</span>
						</li>
					</ul>

				</div>
			</div>

			<!--邀请有礼按钮-->
			<div class="invitation_btn" @click="goInvitation"></div>
		</div>

		<!--遮罩-->
		<div class="mark_box" v-if="markBox"></div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; // 头部
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxToapp],
		data() {
			return {
				activityTime: '', // 活动开始结束时间
				yesNoLog: 0, // 是否登录
				ruleBox: false, // 规则弹框
				redPopUpBox: false, // 生成红包弹窗
				markBox: false, // 遮罩
				myDhBox: false, // 我的兑换奖励弹窗
				myHfBox: false, // 我的话费奖励弹窗
				lock: true, // 开关
				moneyList: [ // 出借金额区间
					"5000-19999（元）",
					"20000-39999（元）",
					"40000-59999（元）",
					"60000-69999（元）",
					"70000-79999（元）",
					"80000-99999（元）",
					"100000-（元）以上"
				],
				biaoList: [ // 标的名字
					1, 2, 3, 6, 12
				],
				optionIndex: 0, //  金额的下标
				biaoListIndex: 0, // 标的的下标
				redState: 0, // 点击生成红包弹窗里  按钮状态 1 领取  2去出借
				amount: '', // 获取红包的金额
				redEnvelopeId: null, // 红包id
				myInvestment: 0, // 我的年华出借总额
				getList: '', //领取列表
				getId: null, // 领取列表id
				giftTwoList: [], // 兑换列表                
				sumoList:[50000,100000,200000,300000,500000],  // 进度条后台返回金额列表  正式上线改回来的
//				sumoList: [500, 1000, 2000, 3000, 5000],
				leftPrice: 0, // 圆点的left距离
				marginLeft: 0, //  圆点的margin值
				leftList: [], //存放圆点距离的空数组
				width: 0, // 进度条的宽度
				imgName: 'https://aliyunsso.edspay.com/web/wx/activity/nianyKind/dhList', // 兑换区域图片
				typeId: null, // 兑换类型的id
				awardName: '', // 兑换的奖励名字
				dhList: [], // 兑换奖励列表弹窗数据
				myAwardList: [], // 话费奖励列表弹窗数据
				upRateId: null, //  加息券ID

			}
		},
		methods: {
			timeLimit() {
				this.notLogPost('/activity/stockingFeast/judgeInActivityPeriod', (data) => {
					if(data.resCode == 1) {
						this.activityTime = data.resData.active;
						if(data.resData.active == 2) {
							MessageBox.alert(data.resMsg, '提示', {
								confirmButtonClass: 'confirmButton'
							})
						} else if(data.resData.active == 3) {
							MessageBox.alert(data.resMsg, '提示', {
								confirmButtonClass: 'confirmButton'
							})
						}
					}
				}, {}, 1)
			},

			initData() { //   初始化接口
				this.notLogPost('/activity/stockingFeast/showAnnualInvestmentAmount', (data) => {
					this.yesNoLog = data.resCode; // 是否登录
					this.getList = data.resData.upRateRuleModels; //领取列表	
					this.giftTwoList = data.resData.activityExchangeRecordModels; // 兑换列表
					if(data.resCode == 1) {
						this.myInvestment = parseInt(data.resData.annualInvestment); // 年华出借总额
						this.getWidth(this.myInvestment); // 进度条
					}

				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1);

				for(var i = 0; i < this.sumoList.length; i++) { //  计算圆点和原点下面的数字距离
					if(i == 0) {
						this.leftList.push(0 + '%');
					} else if(0 < i && i < this.sumoList.length - 1) {
						this.leftList.push((this.sumoList[i] - this.sumoList[0]) / (this.sumoList[this.sumoList.length - 1] - this.sumoList[0]) * 100 + '%');
					} else if(i == this.sumoList.length - 1) {
						this.leftList.push(100 + '%');
					}
				}
			},
			
			getWidth(num) { // 进度条事件
				let listLength = this.sumoList.length;
				if(num < this.sumoList[0]) {
					this.width = 0;
				} else if(num > this.sumoList[listLength - 1]) {
					this.width = 100;
				} else {
					this.width = (num - this.sumoList[0]) / (this.sumoList[listLength - 1] - this.sumoList[0]) * 100;
				}
			},

			getIncident(n) { //  点击领取按钮可以领取的事件
				if(this.userId || this.getCookie('userToken')) { //已经登录
					if(this.activityTime == 2) {
						MessageBox.alert('亲，活动尚未开始哦！', '提示', {
							confirmButtonClass: 'confirmButton'
						})
					} else if(this.activityTime == 3) {
						MessageBox.alert('亲，活动已经结束！', '提示', {
							confirmButtonClass: 'confirmButton'
						})
					} else { // 在活动时间内
						this.getAppData('/activity/stockingFeast/receiveUpRate', (data) => {
							if(data.resCode == 1) {
								if(data.resData.draw == 1) {
									MessageBox.alert(data.resMsg, '提示', {
										confirmButtonClass: 'confirmButton'
									}, );	
									this.getList = data.resData.upRateRuleModels; //领取列表	状态
								}		
								
							} else if(data.resCode == 0) {
								MessageBox.alert('请求失败', '提示', {
									confirmButtonClass: 'confirmButton'
								}, );
							} else if(data.resCode == -1) {
								MessageBox.confirm('登录信息失效，请登录。', {
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

						}, (this.osType ? {
							upRateId: this.upRateId = n
						} : {
							upRateId: this.upRateId = n
						}))
					}
				} else { //  未登录
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

			noGetIncident() { // 点击领取年化出借额不足的事件
				MessageBox.alert("您的年化出借额不足，不能领取哦", '提示', {
					confirmButtonClass: 'confirmButton'
				}, );
			},

			yetGetIncident() { // 点击领取领取过事件
				MessageBox.alert("您已领取过此加息券", '提示', {
					confirmButtonClass: 'confirmButton'
				}, );
			},

			notConvertBtn() { // 当不能兑换时，点击触发的事件
				MessageBox.alert('亲！您年化出借额不足，无法兑换。', '提示', {
					confirmButtonClass: 'confirmButton',
				});
			},

			clickDh(name,i) { // 点击兑换按钮提示的弹框
				if(this.userId || this.getCookie('userToken')) { //已经登录
					if(this.activityTime == 2) {
						MessageBox.alert('亲，活动尚未开始哦！', '提示', {
							confirmButtonClass: 'confirmButton'
						})
					} else if(this.activityTime == 3) {
						MessageBox.alert('亲，活动已经结束！', '提示', {
							confirmButtonClass: 'confirmButton'
						})
					} else { // 在活动时间内
						let awardName = this.awardName = name
						MessageBox.confirm('您是否兑换' + awardName, {
							confirmButtonText: '确定',
							confirmButtonClass: 'confirmButton',
							cancelButtonClass: 'cancelButton',
						}).then(action => {
							this.getAppData('/activity/stockingFeast/annualInvestmentAmountExchange', (data) => {
								if(data.resCode == 1) {
									this.myInvestment = parseInt(data.resData.annualInvestment); // 年华出借总额
									this.getWidth(this.myInvestment); // 进度条调用
									this.giftTwoList = data.resData.activityExchangeRecordModels; //兑换列表
									Toast({ //    小黑快
										message: '兑换成功',
										iconClass: 'icon icon-success',
										duration: 500
									});
								} else if(data.resCode == 0) {
									MessageBox.alert('请求失败', '提示', {
										confirmButtonClass: 'confirmButton'
									}, );
								} else if(data.resCode == -1) {
									MessageBox.confirm('登录信息失效，请登录。', {
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

							}, (this.osType ? {
								typeId: this.typeId = i
							} : {
								typeId: this.typeId = i
							}));
						})			
					}
					
				} else { //  未登录
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

			dhShow() { // 点击我的兑换奖励按钮事件
				if(this.userId || this.getCookie('userToken')) { //已经登录
					this.notLogPost('/activity/stockingFeast/exchangeRewards', (data) => { // 福利2兑换列表显示的内容
						if(data.resCode == 1) {
							this.myDhBox = true;
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

			hfShow() { // 点击我的我的话费奖励按钮事件
				if(this.userId || this.getCookie('userToken')) { //已经登录
					this.notLogPost('/activity/stockingFeast/inviteRewards', (data) => { // 福利2兑换列表显示的内容
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
					this.myHfBox = true;
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

			goInvest() { // 跳转出借页面
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
			timeFun() { // 时间函数
				setTimeout(function() {
					this.lock = true; //开关关闭
				}, 2000)
			},
			getRed() { // 点击生成红包
				if(this.activityTime == 2) { // 未开始
					MessageBox.alert("亲，活动未开始！", '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else if(this.activityTime == 3) { // 已经结束
					MessageBox.alert("亲，活动已经结束！", '提示', {
						confirmButtonClass: 'confirmButton'
					})
				} else {
					if(this.userId || this.getCookie('userToken')) { // 已登录
						this.optionIndex = $("#sel1").val(); // 金额区间
						var optionValue = this.optionIndex.split('-')[0]; // 金额区间截取
						var biaoListIndex = $("#sel2").val(); // 标的参数
						if(!this.lock) {
							return;
						}
						this.lock = false;
						this.getAppData('/activity/stockingFeast/createRedEnvelope', (data) => {							
							if(data.resCode == 1) { // 可以领取
								this.redState = data.resData.create; // 点击生成红包弹窗里  按钮状态 1 领取  2去出借
								if(data.resData.create == 1) {									
									this.amount = data.resData.amount + ''; // 生成红包的金额
									this.redEnvelopeId = data.resData.redEnvelopeId; // 红包Id
									this.redPopUpBox = true; // 红包弹窗弹出
									this.markBox = true; //  遮罩出来
									this.timeFun() //开关关闭
								} else if(data.resData.create == 2) { // 存在未使用的红包
									this.amount = data.resData.amount + '';
									this.redEnvelopeId = data.resData.redEnvelopeId; // 红包Id
									this.redPopUpBox = true; // 红包弹窗弹出
									this.markBox = true; //  遮罩出来
									this.timeFun() //开关关闭 
								} else if(data.resData.create == 3) { // 非法选择
									MessageBox.alert(data.resData.msg, {
										confirmButtonClass: 'confirmButton',
									}).then(action => {
										this.lock = true; //开关关闭
									});
								}
							} else if(data.resCode == 0) { // 请求失败
								MessageBox.alert(data.resMsg, {
									confirmButtonClass: 'confirmButton',
								})
							} else if(data.resCode == -1) { // 未登录
								MessageBox.confirm('登录信息失效，请重新登录', {
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
								this.lock = true; //开关关闭
							}
						}, {
							money: optionValue,
							month: biaoListIndex
						}, 1)

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
			lqRed() { //  点击领取按钮 执行的事件
				this.lock = true; //开关关闭
				this.getAppData('/activity/stockingFeast/receiveRedEnvelope', (data) => {
					if(data.resCode == 0) {
						MessageBox.alert("请求失败", {
							confirmButtonClass: 'confirmButton'
						}, ).then(action => {});
					} else if(data.resCode == 1) {
                        if(data.resData.receive == 1) {
                          	Toast({ //    小黑快
								message: '领取成功',
								iconClass: 'icon icon-success',
								duration: 500
							});
                        } 
					}
				}, {
					redEnvelopeId: this.redEnvelopeId
				});
				this.redPopUpBox = false; // 红包弹窗消失
				this.markBox = false; //  遮罩消失
				$('#sel1').val('5000-19999（元）');
				$('#sel2').val('1');
				$("select:first option:first").attr("selected", true);
			},

			clickReset() { // 点击重置按钮的事件
				this.redPopUpBox = false; // 红包弹窗消失
				this.markBox = false; //  遮罩消失
				this.lock = true; //开关关闭
				$('#sel1').val('5000-19999（元）');
				$('#sel2').val('1');
				$("select:first option:first").attr("selected", true);
			},
		},
		created: function() {
			this.timeLimit(); // 活动时间调用
			this.initData(); // 初始化
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
	#nianyKind {
		font-family: DIN-Medium;
		.main {
			width: 100%;
			height: 55.666666rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/bg.png?v=1.2) no-repeat;
			background-size: cover;
			position: relative;
			.rule_btn {
				width: 0.84rem;
				height: 1.973333rem;
				position: fixed;
				top: 3.866666rem;
				right: 0;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/ruleBtn.png?v=1.1) no-repeat;
				background-size: cover;
				z-index: 99;
			}
			.rule_box {
				width: 7.066666rem;
				height: 11.146666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/ruleBox.png?v=1.1) no-repeat;
				background-size: cover;
				color: #363636;
				padding-top: 10.4rem;
				padding-left: 0.373333rem;
				font-size: 0.293333rem;
			}
			.get_red_box {
				width: 100%;
				padding: 11.179rem 0.266666rem 0.306666rem 2.706666rem;
				box-sizing: border-box;
				position: relative;
				margin-bottom: 2.106666rem;
				.select_box {
					width: 4.533333rem;
					height: 0.8rem;
					margin-bottom: 0.306666rem;
					background: #fff;
					border-radius: 1.333333rem;
					select {
						width: 100%;
						height: 100%;
						display: block;
						border: none;
						outline: none;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/down_icon.png?v=1.1) no-repeat scroll 3.9rem center #fff;
						background-size: 0.306666rem 0.173333rem;
						line-height: .8rem;
						border-radius: 1.333333rem;						
						padding-left: .2rem;
						color: #999;
						font-size: .4rem;
						-webkit-appearance: none;
						-moz-appearance: none;
						-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
						-webkit-tap-highlight-color: transparent;
					}
				}
				.select_box:nth-child(2){
					width: 4.08rem;
					select{
						background-position:3.5rem center ;
					}
				}
				.getBtn {
					width: 1.973333rem;
					height: 1.973333rem;
					position: absolute;
					right: 0.4rem;
					top: 11.15rem;
				}
			}
			.red_popUp_box,
			.rule_box,
			.my_dh_box,
			.my_hf_box {
				/*弹窗定位样式*/
				position: fixed;
				left: 0;
				right: 0;
				top: 0;
				bottom: 0;
				margin: auto;
				z-index: 100;
				.close_btn {
					width: 0.613333rem;
					height: 0.613333rem;
					position: absolute;
					top: 0;
					right: 0;
				}
			}
			.red_popUp_box {
				width: 6.933333rem;
				height: 8.186666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/getRedBox.png?v=1.1) no-repeat;
				background-size: cover;
				padding-top: 2.586666rem;
				box-sizing: border-box;
				text-align: center;
				.close_btn {
					right: 0.12rem;
				}
				.text_box {
					font-size: 0.48rem;
					color: #F84426;
					margin-bottom: 0.35rem;
				}
				.money_box {
					font-size: 1.066666rem;
					color: #F84426;
					margin-bottom: 0.4rem;
					font-weight: 700;
					span {
						font-size: 0.613333rem;
						font-weight: normal;
					}
				}
				.range_box {
					font-size: 0.32rem;
					color: #F84426;
					margin-bottom: 0.89rem;
				}
				.cancel_btn,
				.confirm_btn,
				.invest_btn {
					width: 2.38rem;
					height: 0.87rem;
					position: absolute;
					top: 6rem;
					line-height: 0.87rem;
					text-align: center;
					color: #fff;
					font-weight: 700;
				}
				.cancel_btn {
					left: 0.8rem;
				}
				.confirm_btn,
				.invest_btn {
					right: 0.8rem;
				}
			}
			.getLucky {
				width: 100%;
				position: relative;
				margin-bottom: 4.15rem;
				padding-top: .8rem;
				li {
					width: 100%;
					padding: 0.75rem 0rem 0.746666rem 6.6rem;
					margin-bottom: 1rem;
					.btn {
						width: 2.4rem;
						height: 0.8rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/lqBtn1.png?v=1.0) no-repeat;
						background-size: cover;
					}
					.btn.not_btn {
						width: 2.4rem;
						height: 0.8rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/lqBtn2.png?v=1.1) no-repeat;
						background-size: cover;
					}
					.btn.yes_btn {
						width: 2.4rem;
						height: 0.8rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/lqBtn3.png?v=1.0) no-repeat;
						background-size: cover;
					}
				}
			}
			.money_box {
				width: 100%;
				height: 0.7rem;
				position: relative;
				line-height: 0.7rem;
				p {
					width: 2.7rem;
					height: 100%;
					padding-left: .1rem;
					position: absolute;
					left: 4rem;
					top: 0;
					color: #EE3836;
					font-size: 0.426666rem;
				}
				.go_invest_btn {
					width: 2.25rem;
					height: 0.7rem;
					position: absolute;
					right: 1.1rem;
					top: 0;
				}
			}
			.plan_conter_box {
				width: 8.7rem;
				padding: 0.493333rem 0.466666rem 0 0.466666rem;
				margin: 0 auto 1.8rem auto;
				position: relative;
				.plan_line_box {
					width: 8.066666rem;
					height: 0.08rem;
					background: #fff;
					border-radius: 1.333333rem;
					position: relative;
					.plan_line_color {
						width: 0%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
						background: #E23B18;
					}
				}
				.vNum {
					width: 8.066666rem;
					height: 0.533333rem;
					position: relative;
					top: -0.32rem;
					i {
						display: inline-block;
						width: 0.533333rem;
						height: 0.533333rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/dian2.png?v=1.0) no-repeat;
						background-repeat: no-repeat;
						background-size: cover;
						position: absolute;
						top: 0;
					}
					i.active {
						background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/dian1.png?v=1.0) no-repeat;
						background-repeat: no-repeat;
						background-size: cover;
					}
				}
				ol.sumo_box {
					width: 8.066666rem;
					height: 0.4rem;
					position: relative;
					top: -.2rem;
					left: -.1rem;
					li {
						display: inline-block;
						font-size: 0.346666rem;
						color: #4E433E;
						position: absolute;
						top: 0;
					}
					li:last-child {
						width: 1rem;
					}
				}
			}
			.prize_list_box {
				width: 100%;
				padding: 0 0.693333rem;
				ul {
					li {
						width: 4.026666rem;
						height: 5.76rem;
						float: left;
						margin-bottom: 0.533333rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/dhBg.png?v=1.0) no-repeat;
						background-size: cover;
						.img_name {
							width: 3.106666rem;
							height: 2.68rem;
							margin: 0.346666rem auto 0.266666rem auto;
							img {
								width: 100%;
							}
						}
						p {
							text-align: center;
							color: #432A2A;
							font-size: 0.346666rem;
							margin-bottom: 0.186666rem;
							span {
								color: #D00302;
							}
						}
						.convert_btn {
							width: 2.4rem;
							height: 0.8rem;
							background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/dhBtn1.png?v=1.0) no-repeat;
							background-size: cover;
							margin: 0.32rem auto 0 auto;
						}
						.convert_btn.not_convert_btn {
							background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/dhBtn2.png?v=1.1) no-repeat;
							background-size: cover;
						}
					}
					li:nth-child(even) {
						margin-left: 0.56rem;
					}
				}
			}
			.look_duihuan_btn {
				width: 2.88rem;
				height: 1.506666rem;
				position: absolute;
				top: 42.84rem;
				right: 1.28rem;
			}
			.my_dh_box {
				width: 7.2rem;
				height: 10.853333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/dhBox.png?v=1.0) no-repeat;
				background-size: cover;
				padding-top: 3.3rem;
				padding-left: 5rem;
				overflow: hidden;
				.my_convert_box {
					width: 100%;
					height: 4.5rem;
					ul {
						li {
							width: 100%;
							margin-bottom: 1.08rem;
							span {
								width: 50%;
								height: 0.533333rem;
								font-size: 0.346666rem;
								color: #333;
								text-align: center;
								display: block;
								float: left;
							}
						}
					}
				}
				.close_btn {
					right: 0.28rem;
				}
			}
			.look_huafei_btn {
				width: 2.7rem;
				height: 0.65rem;
				position: absolute;
				left: 3.6rem;
				top: 51rem;
			}
			.my_hf_box {
				width: 7.066666rem;
				height: 8.706666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/nianyKind/hfBox.png?v=1.0) no-repeat;
				background-size: cover;
				padding-top: 3.2rem;
				overflow: hidden;
				.close_btn {
					right: 0.2rem;
				}
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
							color: #333333;
							text-align: center;
						}
					}
					.null_show {
						width: 100%;
						height: 100%;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/NewYearDay/empty_bg.png?v=1.0) no-repeat;
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
			.invitation_btn {
				width: 2.666666rem;
				height: 0.83rem;
				position: absolute;
				right: .6rem;
				top: 52.73rem;
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