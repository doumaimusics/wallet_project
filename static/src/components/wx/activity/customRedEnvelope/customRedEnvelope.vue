<template>
	<div id="customRed">
		<!--title-->
		<wx-header v-if="!osType" :logo="'自定义红包机'"></wx-header>
		<div class="main">
			<!--显示数字区域-->
			<div class="number_box">
				<ul class="clear">
					<li>
						<p :key="baiwei">{{baiwei}}</p>
					</li>
					<li>
						<p :key="shiwei">{{shiwei}}</p>
					</li>
					<li>
						<p :key="gewei">{{gewei}}</p>
					</li>
				</ul>
			</div>
			<!--下拉框-->
			<div class="selct_box">
				<select name="" id="sel">
					<option :value="$index" v-for="(v,$index) in  moneyList">{{v}}</option>
				</select>
			</div>
			<!--标的选择-->
			<ul class="obj_box clear" id="objBox">
				<li v-for="(v,$index) in biaoList" :data-id="v[0]" @click="searchInvest($event,$index)">
					{{v}}月标
					<i></i>
				</li>
			</ul>
			<!--生成红包按钮-->
			<div @click="getRed()" class="red_btn_box"></div>
			<!--分享的按钮-->
			<div class="share_btn" @click="invite"></div>
			<!--规则-->
			<div class="rule_box">
				<p><i>1.</i>活动时间11月1日-11月10日；</p>
				<p><i>2.</i>用户根据自己的出借需要，选择“出借金额”和“项目期限”，点击生成按钮，系统会自动生成想用的红包，用户可点击领取；</p>
				<p><i>3.</i><span>用户在点击领取红包之前，可重复生成红包，</span>直到生成自己满意的定制红包为止；</p>
				<p><i>4.</i><span>用户点击领取红包后，需使用掉才能继续领取下一个定制的红包，</span>领取后的红包在次日的23:59:59失效；</p>
				<p><i>5.</i>生成的红包最高面额999元；</p>
				<p><i>6.</i>生成的定制红包可以分享，欢迎用户向好友分享定制红包的出借神器；</p>
				<p><i>7.</i>本活动最终解释权归E都市钱包所有,平台有权在充分告知用户情况下修改不合理规则。</p>
			</div>
			<!--点击分享的-->
			<div class="layer" v-if="showLayer" @click="showLayer=false" v-layer></div>
		</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'; //头部
	import wxShare from '../../../../common/wx/wxShare';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxShare],
		data() {
			return {
				baiwei: 0, //  数字滚动百位
				shiwei: 0, //  数字滚动十位
				gewei: 0, //  数字滚动个位
				interval: null, //  滚动时间间隔
				countdown: null, //  滚动时间结束
				times: 0, //  数字滚动的时间
				lock: true, //  点击开关				
				showLayer: false, // 遮罩弹层
				biaoIndex: 0, //  标的月份的下标
				optionIndex: 0, //  金额的下标
				redPacketId: 0, //红包的id
				moneyList: [ //  出借金额
					"5000元-20000元",
					"20001元-40000元",
					"40001元-60000元",
					"60001元-70000元",
					"70001元-80000元",
					"80001元-100000元",
					"100000元以上"
				],
				biaoList: [
					1, 2, 3, 6, 12
				],
				redList: [ //  标的期限列表和标的红包
					["10", "50", "100", "175", "205", "248", "318"],
					["23", "100", "215", "350", "420", "510", "580"],
					["40", "165", "330", "420", "520", "580", "666"],
					["75", "300", "700", "800", "888", "999", "999"],
					["125", "500", "999", "999", "999", "999", "999"]
				],
				redRuleId: [
					[907, 908, 909, 910, 911, 912, 913],
					[914, 915, 916, 917, 918, 919, 920],
					[921, 922, 923, 924, 925, 926, 927],
					[928, 929, 930, 931, 932, 933, 933],
					[934, 935, 936, 936, 936, 936, 936]
				],
				shareObj: { //分享标题内容配置
					title: "还在苦恼那些用不上的红包？", //标题
					desc: "我已经在定制专属红包啦！最高999元！你也快来试试吧！好资产真安全，浙商银行存管好平台", //内容
					link: "https://www.edspay.com/#/customRedShare", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				}
			}
		},
		methods: {
			searchInvest(event, index) { //  选项切换
				var _this = this;
				_this.biaoIndex = index;
				$("#objBox li").removeClass('activeBg');
				event.target.classList.add('activeBg');
			},
			invite() { //  点击分享的
				if(this.osType) {
					this.isLogPassValue(this.appShare)
				} else {
					this.showLayer = true;
				}
			},
			getRed() { // 点击生成红包的按钮，判断是否登录
				if(this.userId || this.getCookie('userToken')) { //已登录的状态
					let _this = this;
					_this.optionIndex = $("#sel").val();
					let money = this.redList[this.biaoIndex][this.optionIndex]; //取标的月份的下标和金额的下标
					this.redPacketId = this.redRuleId[this.biaoIndex][this.optionIndex]; //取标的月份的下标和金额的下标
					console.log(this.redPacketId);
					if(!this.lock) { //开关关闭
						return;
					}
					_this.lock = false; //开关关闭

					_this.getAppData('/activity/zdy/scRedEnvelope', (data) => { //点击生成红包的接口
						console.log(data);

						if(data.resCode == 1) { //活动进行中  请求成功								
							if(!this.interval) { //随机生成的数字
								this.interval = setInterval(function() {
									_this.baiwei = Math.floor(Math.random() * 10);
									_this.shiwei = Math.floor(Math.random() * 10);
									_this.gewei = Math.floor(Math.random() * 10);
								}, 10)
							}
							console.log(_this.times++)
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
							//								alert(data.resData.whethe);
							if(data.resData.whethe == 1) { //可领取
								redFn(1)
							} else if(data.resData.whethe == 0) { //用户有可用红包
								redFn(0)
							}
						} else if(data.resCode == 0) { //  输出错误的信息
							MessageBox.alert(data.resMsg).then(action => {});
						} else if(data.resCode == 2) {
							MessageBox.alert("活动未开始").then(action => {});
						} else if(data.resCode == 3) {
							MessageBox.alert("活动已结束").then(action => {});
						}
						_this.lock = false; //开关关闭
					}, {
						ruleId: _this.redPacketId
					}, 1);
					$("#sel").change(function() {
						$("select:first option:first").attr("selected", false);
					})

					function redFn(n) {
						let btn;
						let texts;
						if(n == 1) {
							btn = '领取';
							texts = '<span style="color:#333;">恭喜您成功生成' + money + '元出借红包。</span><br/><span style="color:#F95E3F;font-size:14px;">红包领取后，使用掉才能领取下一个！</span>'
						} else if(n == 0) {
							btn = "去出借";
							texts = '<span style="color:#333;">恭喜您成功生成' + money + '元出借红包。</span><br/><span style="color:#F95E3F;font-size:14px;">上个红包还没使用，请使用后领取！</span>'
						}
						setTimeout(function() {
							if(parseInt(money) >= 100) {
								_this.baiwei = money.substr(0, 1);
								_this.shiwei = money.substr(1, 1);
								_this.gewei = money.substr(2, 1);
							} else {
								_this.baiwei = 0;
								_this.shiwei = money.substr(0, 1);
								_this.gewei = money.substr(1, 1);
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
									console.log(_this.redPacketId);
									_this.getAppData('/activity/zdy/lqRedEnvelope', (data) => {
										if(data.resCode == 0) {
											MessageBox.alert("请求失败").then(action => {});
										} else if(data.resCode == 1) {
											MessageBox.alert("领取成功", {
												confirmButtonClass: 'confirmButton',
											}).then(action => {});
										} else if(data.resCode == 2) {
											MessageBox.alert("活动未开始").then(action => {});
										} else if(data.resCode == 3) {
											MessageBox.alert("活动结束").then(action => {});
										} else if(data.resCode == 4) {
											MessageBox.alert("非法红包").then(action => {});
										}
									}, {
										ruleId: _this.redPacketId
									}, 1); //  给后台传的参数
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
								$("#objBox li").removeClass('activeBg');
								$("#objBox li").eq(0).addClass("activeBg");
								$("select:first option:first").attr("selected", true);
							}, action => { //点击重置的按钮
								_this.lock = true;
								_this.baiwei = 0
								_this.shiwei = 0
								_this.gewei = 0
								_this.biaoIndex = 0 //  标的月份的下标置0
								_this.optionIndex = 0 //  金额的下标置0
								$("#objBox li").removeClass('activeBg');
								$("#objBox li").eq(0).addClass("activeBg");
								$("select:first option:first").attr("selected", true);
							})
						}, 900)
					}

				} else { //未登录的状态
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
		components: {
			wxHeader,
		},
		mounted: function() {
			$("#objBox li").eq(0).addClass("activeBg");
			this.getWxShareData(this.shareObj); //分享调用
			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1267307770&web_id=1267307770 '
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
        watch: {
			'$route'() {
				if (window._czc) {
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
		font-size: 0.5rem !important;
	}
</style>

<style lang="scss" scoped>
	#customRed {
		width: 10rem;
		height: auto;
		.main {
			width: 10rem;
			height: 36.266666rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/CustomRedEnvelope/bg.png?v=1.1) no-repeat;
			background-size: cover;
			position: relative;
			overflow: hidden;
		}
		.number_box {
			width: 100%;
			height: 2.533333rem;
			margin-top: 11rem;
			padding: 0 0.76rem 0 0.76rem;
			margin-bottom: 0.28rem;
			ul {
				li {
					width: 33.33%;
					float: left;
					height: 2.533333rem;
					text-align: center;
					font-size: 2.133333rem;
					color: #F95E3F;
					font-family: 'DINCond-Black';
					p {
						width: 100%;
						height: 100%;
						line-height: 2.533333rem;
					}
				}
			}
		}
		.selct_box {
			width: 4.133333rem;
			height: 0.533333rem;
			margin-left: 3.413333rem;
			margin-bottom: 0.266666rem;
			select {
				width: 100%;
				height: 100%;
				display: block;
				border: none;
				border-radius: 0.133333rem;
				outline: none;
				color: #f90;
				line-height: 0.533333rem;
			}
		}
		.obj_box {
			width: 100%;
			height: 0.533333rem;
			padding-left: 3rem;
			margin-bottom: 0.786666rem;
			li {
				width: 1.1rem;
				height: 0.506666rem;
				background: #fff;
				float: left;
				border-radius: 0.12rem;
				margin-left: 0.1rem;
				font-size: 0.293333rem;
				color: #FC5F41;
				text-align: center;
				line-height: 0.506666rem;
				position: relative;
			}
			li.activeBg {
				border: 1px solid #FF502D;
				i {
					display: block;
					background: #f90;
					width: 0.266666rem;
					height: 0.266666rem;
					position: absolute;
					right: -0.066666rem;
					top: -0.066666rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/CustomRedEnvelope/icon_gou_normal.png?v=1.0) no-repeat;
					background-size: cover;
				}
			}
		}
		.red_btn_box {
			height: 1.48rem;
			width: 5rem;
			margin: 0 auto 1.6rem auto;
		}
		.share_btn {
			width: 4.426666rem;
			height: 1.093333rem;
			margin: 0 auto 3.5rem auto;
		}
		.rule_box {
			padding: 0 0.586666rem 0 0.506666rem;
			p {
				font-size: 0.32rem;
				line-height: 0.7rem;
				color: #fff;
				padding-left: 0.35rem;
				position: relative;
				i {
					position: absolute;
					left: 0;
					top: 0;
				}
				span {
					font-weight: 700;
				}
			}
		}
		.layer {
			background: url(https://aliyunsso.edspay.com/web/wx/activity/CustomRedEnvelope/fenxiang.png?v=1.0) no-repeat;
			background-size: 100%;
		}
	}
</style>