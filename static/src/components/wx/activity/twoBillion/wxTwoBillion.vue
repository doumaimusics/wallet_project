<template>
	<div class="two_billion">
		<wx-header v-if="!osType" :logo="'跨越20亿 开启新征程'"></wx-header>
		<div class="wrapper">
			<div class="head">
				<div class="share" @click="activityShare"></div>
			</div>
			<div class="main">
				<div class="my_box" v-if="myShow">
					<p class="p1">{{value}}</p>
					<div class="btns clear">
						<div class="btn1" @click="toGet"></div>
						<div class="btn2" @click="toUse"></div>
					</div>
				</div>
				<!--福利一列表兑换-->
				<div class="gift_list">
					<ul class="main_list">
						<li class="clear" v-for='(item,index) in giftList'>
							<div class="gift_name">
								<p class="p5">{{item.name}}</p>
								<p class="p6">价值(￥)：{{item.money}}</p>
							</div>
							<div class="cons_value">{{item.contribution}}</div>
							<!--可以兑换的按钮-->
							<div class="exchange_btn" v-if="item.condition == 1 && item.contribution <= value || statusLogin == 0" @click="canExchange(item.name,index,1)">兑换</div>
							<!--不可以兑换的按钮-->
							<div class="exchange_btn no_click" v-else-if="item.condition == 0 && statusLogin == 1 || item.contribution > value && statusLogin == 1" @click="noExchange">兑换</div>
						</li>
					</ul>
				</div>
				<p @click="toHas" class="has_goods" v-if="myShow">已兑换福利一奖品></p>

				<!--福利二九宫格兑换-->
				<div class="gift_two">
					<ul>
						<li v-for="(val,index) in giftTwoList" :class="{active:val.condition == 0 && statusLogin == 1 || val.contribution > value && statusLogin == 1}">
							<div class="img_name">
								<img :src="imgName+(index+1)+'.png'" />
							</div>
							<p class="contribution_text">消耗{{val.contribution}}贡献值</p>
							<!--可以兑换-->
							<div class="convert_btn" @click="canExchange(val.reward,index,2,val.rule)" v-if="val.condition == 1 && val.contribution <= value || statusLogin == 0">立即兑换</div>
							<!--不可以兑换-->
							<div class="convert_btn" @click="noExchange" v-else-if="val.condition == 0 && statusLogin == 1 || val.contribution > value && statusLogin == 1">立即兑换</div>
						</li>
					</ul>
				</div>
				<div class="gift_btn_box">
					<!--九宫格2奖品详情按钮-->
					<div class="xq_btn" @click="[giftTwoDetails=true,shadeBox=true]">奖品详情></div>
					<!--已经兑换福利奖品跳转按钮-->
					<div @click="toHas2" class="skip_btn" v-if="myShow">已兑换福利二奖品></div>
				</div>
			</div>
			<!--福利2九宫格奖品详情-->
			<div class="gift_two_details" v-show="giftTwoDetails">
				<div class="close_btn" @click="[giftTwoDetails=false,shadeBox=false]"></div>
			</div>
			<div class="rule_btn" @click.stop="showModal"></div>
			<div class="modal_box" v-if="modalShow">
				<div class="contain">
					<div class="close">
						<div class="close_btn" @click.stop="sloseBtn"></div>
					</div>
					<div class="main_text">
						<p>1.活动时间：2017年12月1日—2017年12月18日；</p>
						<p>2.客户年化出借额满1000即可获得30贡献值，2000年化出借额可获得60贡献值，以此类推，年化出借额公式=出借金额÷12×项目期限(月份)(天标与E起赚不计入年化出借额)</p>
						<p>3.转盘与分享每天可各获得一次10贡献值奖励,活动期间内新用户实名认证可额外获得50贡献值；</p>
						<p>4.贡献值累计奖励可以进行重复兑换，实物兑换会消耗相应的贡献值，活动结束后所有实物奖品进行统一发放，奖品均不提供发票，未兑换的贡献值作废处理，不再进行奖励的兑换；</p>
						<p v-if="osType == 'IOS'">5. 本次活动与苹果公司无关，最终解释权归E都市钱包所有，客服电话400-135-3388；</p>
					</div>
				</div>
			</div>
			<!--贡献值不足的提示框-->
			<div class="change_modal" v-if="changeModal">
				<div class="small_modal">
					<p class="pp2">亲！您的贡献值不足，无法兑换。</p>
					<div class="sumbBtn" @click.stop="closeSmallDialog"></div>
				</div>
			</div>
			<!--可以兑换的提示弹框-->
			<div class="conversion_box" v-if="conditionPopUp">
				<!--显示兑换奖品内容区域-->
				<div class="text1" v-if="activity==1">
					<p class="pp1 pp2"><span>您是否兑换</span>{{changeGood}}</p>
				</div>
				<div class="text1" v-else>
					<p class="pp1"><span>您是否兑换</span>{{changeGood}}</p>
					<p style="color: #666;">{{ruleText}}</p>
				</div>
				<!--按钮-->
				<div class="cancel_btn" @click="[conditionPopUp=false,shadeBox=false]"></div>
				<div class="affirm_btn" @click="getAward(giftList[giftIndex].id,giftList[giftIndex].contribution,giftList[giftIndex].name,1)" v-if="activity==1"></div>
				<div class="affirm_btn" @click="getAward(giftTwoList[giftIndex].id,giftTwoList[giftIndex].contribution,giftTwoList[giftIndex].reward,giftTwoList[giftIndex].rule,2)" v-else></div>
			</div>
		</div>
		<div v-if="showLayer" @click="showLayer = false" v-layer class="layer"></div>
		<!--公用遮罩-->
		<div class="shade_box" v-show="shadeBox"></div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'; //头部引入
	import wxShare from '../../../../common/wx/wxShare';
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxShare],
		data() {
			return {
				activity: 1, // 活动  1、活动1， 2、九宫格活动
				value: 0, //贡献值
				myShow: false, //我的贡献值显示隐藏
				giftList: [], //活动一列表数据
				modalShow: false, //弹框展示
				arry: {}, //兑换传值
				changeGood: '', //奖品名字
				statusLogin: '', //判断是否登录
				activityTime: '', //活动开始结束时间
				shareData: { //分享字段
					title: 'E都市钱包交易额突破20亿，现金、实物等你拿',
					desc: 'E都市钱包交易额突破20亿，浙商银行存管，不仅有加息还有实物红包等着你',
					link: 'https://www.edspay.com/#/wxTwoBillion',
                    //link: 'https://test2static.edspay.com/#/wxTwoBillion',
					imgUrl: 'http://mystatic.edspay.com/web/webapp/images/edslogo.png',
				},
				showLayer: false,
				inviterId: '', //获取邀请人ID
				// 福利1，2公用的配置 
				changeModal: false, //贡献值不足提示弹框
				conditionPopUp: false, // 可以兑换的弹窗
				giftIndex: 0,   //  活动的id
				//福利2列表的配置
				giftTwoList: [],  // 活动二的数据列表
				giftTwoDetails: false, //  福利2奖励详情
				shadeBox: false, // 公用遮罩
				imgName: 'https://aliyunsso.edspay.com/web/wx/twoBillon/fl_ticket', // 券图片
				ruleText:'',   //  福利2使用条件语句
				lock: true, //  点击开关	
			}
		},
		components: {
			wxHeader,
		},
		methods: {
			tiemLimit() { // 判断是否在活动时间
				this.notLogPost('/index/getActivitStatus', (ress) => {
					console.log(ress);
					if(ress.resCode == 1) {
						this.activityTime = ress.resData.data.activiti;
						if(ress.resData.data.activiti == 0) {
							MessageBox.alert('亲，活动尚未开始哦！', '提示');
						} else if(ress.resData.data.activiti == 2) {
							MessageBox.alert('亲，活动已经结束，请参与平台其他活动！', '提示');
						}
					}
				}, {}, 1)
			},
			getListDate() { // 福利一兑换列表显示的内容
				this.notLogPost('/index/getPrizeRoadList', (reg) => {
					console.log(reg)
					if(reg.resCode) {
						this.giftList = reg.resData.data.data;
						this.statusLogin = reg.resData.data.status;
						if(reg.resData.data.status == 0) {
							this.myShow = false;
						} else if(reg.resData.data.status == 1) {
							this.myShow = true;
							this.value = reg.resData.data.con
						}
					}

				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1)
			},
			canExchange(name, i, n, txt) { //点击兑换按钮点击状态
				if(this.activityTime == 0) {
					MessageBox.alert('亲，活动尚未开始哦！', '提示');
				} else if(this.activityTime == 2) {
					MessageBox.alert('亲，活动已经结束！', '提示');
				} else {
					if(this.statusLogin == 0) {
						MessageBox.confirm('您尚未登录，请先登录 ！').then(action => {
							this.toApp('LG', {
								path: '/wxLogin',
								query: {
									thisUrl: this.$route.fullPath
								}
							})
						}, action => {});
					} else if(this.statusLogin == 1) {
						this.conditionPopUp = true; // 可以兑换的弹窗显示
						this.shadeBox = true; // 遮罩显示		
						this.changeGood = name; // 对应的奖品名字显示
						this.ruleText = txt;
						this.giftIndex = i;   //  对应活动
						if(n == 1) {   // 判断是那个活动
							this.activity = 1;
						} else {
							this.activity = 0;
						}
					}
				}
			},
			getAward(goodsId, price, name, n, txt) { //  点击确认兑换按钮请求的
				if(!this.lock){
					return;
				}
				this.lock = false;
				if(n == 1) { //  活动一的兑换接口
					this.getAppData('/index/useContribution', (res) => {
						if(res.resCode == 1) {
							this.value = this.value - price;
							Toast({ //    小黑快
								message: '兑换成功',
								iconClass: 'icon icon-success',
								duration: 500
							});
							this.conditionPopUp = false;
							this.shadeBox = false;
							
						}
						this.lock = true;
						
					}, {
						id: goodsId
					}, 1);
				} else { //  活动二的兑换接口
///sudoku/getExchange
                    this.lock = false;
                    this.getAppData('/sudoku/getExchange', (res) => {                    	
						if(res.resCode == 1) {
							this.value = this.value - price;
							Toast({ //    小黑快
								message: '兑换成功',
								iconClass: 'icon icon-success',
								duration: 500
							});
							this.conditionPopUp = false;
							this.shadeBox = false;
						}
						this.lock = true;
					}, {
						id: goodsId
					}, 1);
				}

			},
			noExchange(n) { //福利不能兑换点击的提示
				if(this.activityTime == 0) {
					MessageBox.alert('亲，活动尚未开始哦！', '提示');
				} else if(this.activityTime == 2) {
					MessageBox.alert('亲，活动已经结束！', '提示');
				} else if(this.activityTime == 1) {
					this.changeModal = true;
					this.conditionTwo = false;
					this.conditionOne = true;
				}
			},

			giftTwoData() { //   福利2兑换列表状态
				this.notLogPost('/sudoku/getSudoke', (reg) => { // 福利2兑换列表显示的内容
					if(reg.resCode == 1) {
						this.giftTwoList = reg.resData.data; //  福利2列表
					}

				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1);
			},
			showModal() { //弹框显示按钮
				this.modalShow = true;
			},
			sloseBtn() { //弹框关闭按钮
				this.modalShow = false;
			},
			closeSmallDialog() {
				this.changeModal = false
			},
			ruleShow() { //规则按钮
				$(document).scroll(function(event) {
					let _height = $(window).scrollTop();
					if(_height > 0) {
						$(".rule_btn").addClass('display');
					} else if(_height <= 0) {
						$(".rule_btn").removeClass('display');
					}
				});
			},
			activityShare() { //分享
				if(this.activityTime == 0) {
					MessageBox.alert('亲，活动尚未开始哦！', '提示');
				} else if(this.activityTime == 2) {
					MessageBox.alert('亲，活动已经结束！', '提示');
				} else {
					if(this.statusLogin == 0) {
						MessageBox.confirm('您尚未登录，请先登录 ！').then(action => {
							this.toApp('LG', {
								path: '/wxLogin',
								query: {
									thisUrl: this.$route.fullPath
								}
							})
						}, action => {});
						return
					} else if(this.statusLogin == 1) {
						if(this.osType) {
							this.isLogPassValue(this.appShare);
						} else {
							this.showLayer = true;
						};
						this.notLogPost('/index/share', (data) => {
							if(data.resCode == 1) {}
						}, (this.osType ? {
							oauthToken: this.token
						} : {}), 1);
					}
				}
			},
			toGet() {
				this.skip({
					path: '/wxGetValue',
					query: this.$route.query
				})
			},
			toUse() {
				this.skip({
					path: '/wxUseValue',
					query: this.$route.query
				})
			},
			toHas() {  // 跳转兑换福利1奖品页面
				this.skip({
					path: '/wxHasGoods',
					query: this.$route.query
				})
			},
			toHas2() {  // 跳转兑换福利2奖品页面
				this.skip({
					path: '/wxHasGoods2',
					query: this.$route.query
				})
			},
		},
		mounted() {
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1271228378&web_id=1271228378 '
			script.language = 'JavaScript'
			document.body.appendChild(script);

			this.getWxShareData(this.shareData);
		},
		created() {
			this.ruleShow();    //  规则按钮调用
			this.getListDate();  //福利一兑换列表显示的内容
			this.tiemLimit();    //  判断是否在活动时间
			this.giftTwoData(); // 福利2状态
		},
		watch: {
			'$route' () {
				if(window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		}

	}
</script>
<style lang="scss" scoped>
	.two_billion {
		/*公用遮罩*/
		.shade_box {
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 999;
			background: rgba(0, 0, 0, 0.5);
		}
		.layer {
			background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
			background-size: 100%;
		}
		background-color: #3a128a;
		height: 100%;
		width: 100%;
		font-family: PingFangSC-Regular;
		.wrapper {
			position: relative;
			background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/head_bg.png?v1.1) no-repeat;
			background-size: 100%;
			height: auto;
			.head {
				height: 1.333333rem;
				width: 100%;
				height: 12.64rem;
				.share {
					width: 1.6rem;
					height: 2.533333rem;
					position: relative;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/share.gif) no-repeat;
					background-size: 100% 100%;
					top: 10rem;
					left: 7.8rem;
				}
			}
			.main {
				height: auto;
				margin: 0 auto;
				width: 9.2rem;
				.my_box {
					height: 5.4rem;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/mine.png) no-repeat;
					background-size: 9.2rem 5.4rem;
					margin-bottom: 0.8rem;
					text-align: center;
					.p1 {
						font-family: PingFangSC-Semibold;
						font-size: 1.333333rem;
						color: #D83400;
						padding-top: 1.35rem;
						margin-bottom: 0.36rem;
						font-weight: 600;
					}
					.p2 {
						font-family: PingFangSC-Medium;
						font-size: 0.533333rem;
						color: #513BB1;
						margin-bottom: 0.48rem;
					}
					.btns {
						height: 1.7rem;
						div {
							float: left;
							width: 3.386667rem;
							height: 1.773333rem;
						}
						.btn1 {
							margin-left: .4rem;
							margin-right: 1.7rem;
						}
					}
				}
				.gift_list {
					height: 21.4rem;
					width: 9.2rem;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/gift1.png) no-repeat;
					background-size: 100% 100%;
					border-radius: 0.266667rem;
					padding-top: 2.346667rem;
					margin-bottom: 0.213333rem;
					position: relative;
					ul.main_list {
						width: 8.933333rem;
						margin: 0 auto;
						position: relative;
						li {
							width: 100%;
							height: 1.333333rem;
							padding: 0 0.266667rem;
							font-size: 0.346667rem;
							div {
								float: left;
								height: 1.333333rem;
							}
							.gift_name {
								width: 5.72rem;
								.p5 {
									color: #3A1289;
									padding-top: 0.24rem;
									padding-bottom: 0.093333rem;
								}
								.p6 {
									font-size: 0.32rem;
									color: #F6734D;
								}
							}
							.cons_value {
								width: 1.173333rem;
								color: #D95600;
								line-height: 1.333333rem;
							}
							.exchange_btn {
								width: 1.28rem;
								height: 0.666667rem;
								margin-top: 0.333333rem;
								background: #F6734D;
								line-height: 0.666667rem;
								text-align: center;
								font-size: 0.346667rem;
								color: #FFFFFF;
								border-radius: 0.133333rem;
							}
							.exchange_btn.no_click {
								background: #FFD8CC;
								color: rgba(255, 255, 255, .7);
							}
						}
						li:nth-child(odd) {
							background: #fff8eb;
						}
						li:nth-child(even) {
							background: #ffffff;
						}
					}
				}
				/*福利二样式*/
				.gift_two {
					width: 9.2rem;
					height: 9.733333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/fl_bg.png?v=1.1) no-repeat;
					background-size: cover;
					margin: 0.8rem auto 0.213333rem auto;
					padding: 1.96rem 0.213333rem 0 0.213333rem;
					position: relative;
					ul {
						overflow: hidden;
						li {
							width: 2.64rem;
							height: 2.24rem;
							float: left;
							text-align: center;
							background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/fl_bgx2.png) no-repeat;
							background-size: cover;
							margin-left: 0.213333rem;
							margin-bottom: 0.16rem;
							position: relative;
							.img_name {
								width: 2rem;
								height: 0.453333rem;
								margin: 0.25rem auto 0.25rem auto;
								img {
									width: 100%;
									height: 100%;
								}
							}
							.contribution_text {
								color: #666;
								font-size: 0.266666rem;
								text-align: center;
								margin-bottom: 0.16rem;
							}
							.convert_btn {
								width: 2.533333rem;
								height: 0.64rem;
								position: absolute;
								left: 0;right: 0;
								bottom: 0.08rem;
								margin: auto;
								font-size: 0.32rem;
								color: #FFFFFF;
								line-height: 0.64rem;
							}
						}
						li.active {
							background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/fl_bgx1.png) no-repeat;
							background-size: cover;
						}
					}
				}
				.gift_btn_box {
					width: 9.2rem;
					height: 0.773333rem;
					margin: 0 auto 1.066666rem auto;
					color: #DDCDFF;
					font-size: 0.346666rem;
					.xq_btn {
						width: 2.3rem;
						height: 0.773333rem;
						float: left;
					}
					.skip_btn {
						width: 4rem;
						height: 0.773333rem;
						float: right;
						text-align: right;
					}
				}
				.has_goods {
					text-align: right;
					font-size: 0.346666rem;
					color: #DDCDFF;
					margin-bottom: 0.213333rem;
				}
			}
			.gift_two_details {
				width: 8.4rem;
				height: 11.466666rem;
				position: fixed;
				top: 0;
				right: 0;
				left: 0;
				bottom: 0;
				margin: auto;
				background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/fl_xq.png) no-repeat;
				background-size: cover;
				z-index: 1000;
				.close_btn {
					width: 0.666666rem;
					height: 0.6rem;
					position: absolute;
					right: 0.346666rem;
					top: 0;
				}
			}
			.rule_btn {
				position: fixed;
				right: 0;
				top: 45%;
				width: 1.733333rem;
				height: 0.746667rem;
				background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/rule.png) no-repeat;
				background-size: 100% 100%;
				display: none;
			}
			.display {
				display: block
			}
			.modal_box {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 999;
				background: rgba(0, 0, 0, .5);
				.contain {
					width: 8.4rem;
					height: 11.466667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/modal_bg.png) no-repeat;
					background-size: 100% 100%;
					margin: 0 auto;
					top: 15%;
					position: relative;
					.close {
						height: 2.066667rem;
						width: 8.08rem;
						.close_btn {
							width: 1.546667rem;
							height: 0.76rem;
							float: right;
						}
					}
					.main_text {
						width: 8.08rem;
						height: 8.68rem;
						padding: 0 0.32rem;
						font-size: 0;
						p {
							font-size: 0.346667rem;
							color: #333333;
							text-align: justify;
							line-height: .6rem;
						}
					}
				}
			}
			/*贡献值不足的提示弹框*/
			.change_modal {
				width: 100%;
				height: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 999;
				background: rgba(0, 0, 0, .5);
				.small_modal {
					width: 8.4rem;
					height: 4.346667rem;
					position: relative;
					margin: 0 auto;
					top: 30%;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/dialog.png?v1.1) no-repeat;
					background-size: 100% 100%;
					.pp2 {
						padding-top: 1.08rem;
						text-align: center;
						font-size: 0.346667rem;
						color: #D83400;
						margin-bottom: 1rem;
					}
					.sumbBtn {
						width: 3.826667rem;
						height: 1.333333rem;
						margin: 0 auto;
						clear: both;
					}
				}
			}
			/*可以兑换的提示弹框*/
			.conversion_box {
				width: 8.4rem;
				height: 4.346666rem;
				background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/fl_tc.png?v1.1) no-repeat;
				background-size: cover;
				position: fixed;
				left: 0;
				top: 0;
				bottom: 0;
				right: 0;
				margin: auto;
				z-index: 1000;
				.text1 {
					width: 8.08rem;
					height: 1.666667rem;
					margin: 0 auto;
					margin-bottom: 0.44rem;
					clear: both;
					font-size: 0;
					padding-top: 0.466667rem;
					p {
						font-size: 0.346667rem;
						color: #D83400;
						text-align: center;
					}
					.pp1 {
						padding-top: 0.266667rem;
						padding-bottom: 0.28rem;
						span{
							color: #333;
						}
					}
					.pp1.pp2{
						padding-top: 0.65rem;
					}
				}
				.cancel_btn,
				.affirm_btn {
					width: 2.8rem;
					height: 1.186666rem;
					position: absolute;
				}
				.cancel_btn {
					top: 2.56rem;
					left: 0.666666rem;
				}
				.affirm_btn {
					top: 2.56rem;
					right: 0.666666rem;
				}
			}
		}
	}
</style>