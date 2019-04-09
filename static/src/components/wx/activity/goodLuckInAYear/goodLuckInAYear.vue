<template>
	<div id="goodLuckInAYear">
		<wx-header v-if="!osType" :logo="'开年赢鸿运'"></wx-header>
		<div class="main">
			<!--领取红包区域-->
			<div class="red_packet_box">
				<ul class="clear">
					<li v-for="(redPackValue,index) in redPackgeList" :style="{background:'url('+redBgImg+(index+1)+'.png?v=1.0)',backgroundSize:'cover'}">
						<!--领取-->
						<div class="btn" v-if="redPackValue.receiveType == 1" @click="getRedPackageBox(redPackValue.amount,redPackValue.minDayTime,redPackValue.minInvestAccount,redPackValue.id)"></div>
						<!--去使用-->
						<div class="btn go_btn" v-else-if="redPackValue.receiveType == 2" @click="goInvest"></div>
						<!--已领完-->
						<div class="btn no_get_btn" v-else-if="redPackValue.receiveType == 3" @click="BroughtUp"></div>
						<!--存在未使用的红包-->
						<div class="btn no_btn" v-else-if="redPackValue.receiveType == 4" @click="unused"></div>
					</li>
				</ul>
			</div>
			<!--登录和数据展示区域-->
			<div class="show_box">				
				<div class="show_data_box" v-if="isLogin == 1">
					<div class="myData">
						<h3></h3>
					    <p>{{localLordData}}</p>
					</div>
					<div class="award_data_box clear">
						<div class="award_data">
							<h3 class="hqz"></h3>
							<p>{{localLordValue}}</p>
						</div>
						<div class="award_data">
							<h3 class="kdxj"></h3>
							<p>{{money}}</p>		
						</div>
					</div>		
				</div>
				<div class="logIn_box" v-else-if="isLogin == 2">
					<div class="logInText"></div>
					<div class="logIn_btn" @click="logInEvent"></div>
				</div>
			</div>
			
			<!--规则按钮-->
			<div class="rule_btn" @click="popUpBox = 1"></div>
			<!--规则弹窗-->	
			<div class="rule_box" v-if="popUpBox == 1">
				<div class="close_btn" @click="popUpBox = 0"></div>
				<a href="tel:400-135-3388">400-135-3388</a>
				<p v-if="osType == 'IOS'">5、本活动奖励与苹果公司无关</p>
				<div class="lantern_img1"></div>
				<div class="lantern_img2"></div>
			</div>
			<!-- 领取红包弹框 -->
	        <div class="redPackage_box" v-if="popUpBox == 2">
                 <div class="close_btn" @click="popUpBox = 0"></div>
				 <h3>恭喜您领取{{redPackgeAmount}}元出借红包</h3>
				 <p>投<span>≥</span>{{minDayTime}}天项目<br/>单笔满{{minInvestAccount}}元可用,次日失效</p>
				 <div class="qxBtn" @click="popUpBox = 0"></div>
				 <div class="lqBtn" @click="getRedPackage(redId)"></div>
				 <div class="lantern_img1"></div>
				<div class="lantern_img2"></div>	
			</div>
			<!-- 有未使用红包的弹框 -->
			<div class="go_box" v-if="popUpBox == 3">
                <p>尚有红包未使用，<br/>需要使用后才能领取下一个！</p>
				<div class="qxBtn" @click="popUpBox = 0"></div>
				 <div class="lqBtn" @click="goInvest"></div>
				 <div class="lantern_img1"></div>
				<div class="lantern_img2"></div>
			</div>
			<!-- 红包规则按钮 -->
			<div class="red_rule_btn" @click="popUpBox = 4"></div>
			<!-- 红包规则弹框 -->
			<div class="red_rule_box" v-if="popUpBox == 4">
                <div class="close_btn" @click="popUpBox = 0"></div>
				<div class="lantern_img1"></div>
				<div class="lantern_img2"></div>
				<div class="red_rule_text">
					<div class="red_urle_text_img"></div>
				</div>
			</div>
			<!-- 大背景的灯笼 -->
			<div class="dl1"></div>
			<div class="dl2"></div>
		</div>
		<!--遮罩-->
		<div class="mark_box" v-if="popUpBox"></div>
		
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';   // 头部
	import wxToapp from '../../../../common/wx/wxToapp'; // app交互
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [ wxToapp ],
		data(){
		    return{
				activityTime:0,  // 活动时间
				isLogin:0,  // 是否登录
		    	popUpBox:0,  // 弹窗变量  0、遮罩  1、规则弹窗  2、领红包弹窗  3、有未使用弹窗   4、红包规则
				redPackgeList:[],  // 红包列表
				redId:0,  // 红包id
				localLordData:0,   // 年华出借总额
				localLordValue:0, // 豪气值
				money:0, // 可得金额
				redPackgeAmount:0,  // 红包金额
				minDayTime:0,  // 最小项目期限
				minInvestAccount: 0,//最小出借金额
				redBgImg:"https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/red",  // 红包背景图片

		    }
		},
		methods:{
			timeLimit(){   // 活动时间
				this.notLogPost('/activity/openYear/judgeInActivityPeriod', (data) => {
					if(data.resCode == 1){
						this.activityTime = data.resData.active;
						if (data.resData.active == 2) {   // 活动未开始
							MessageBox.alert('亲，活动尚未开始哦!', '提示', {
								confirmButtonClass:'confirmButtonClass'
							})
						} else if(data.resData.active == 3){
							MessageBox.alert('亲，活动已经结束啦!', '提示', {
								confirmButtonClass:'confirmButtonClass'
							})
						}
					}
				}, {} ,1)
			},
			
			initData(){   //  活动初始化数据
				this.notLogPost('/activity/openYear/showGoodLuck', (data) => {
					console.log(data)
					this.redPackgeList = data.resData.redEnvelopeRuleModels;   // 红包列表
					this.isLogin = data.resData.isLogin;   // 活动时间 1已登录  2未登录
					this.logInLose = data.resCode;
					if (data.resCode == 1) {
						this.localLordData = data.resData.localLord;    // 年华出借总额
						this.localLordValue = data.resData.localLordValue;  // 豪气值
						this.money = data.resData.money; // 可得金额
					}
				}, (this.osType ? {
					oauthToken: this.token
				} : {}),1)
			},

			getRedPackageBox(amount,minDatTime,minInvestAccount,id){   // 点击领取的弹框
                if (this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass:'confirmButtom'
					})
				} else if(this.activityTime == 3){
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass:'confirmButtom'
					})
				} else {
					if (this.isLogin == 1) {
							this.redPackgeAmount = amount; // 红包金额
							this.minDayTime = minDatTime;  //最小项目期限（天）
							this.minInvestAccount = minInvestAccount; //最小出借金额
							this.redId = id;  // 红包id
							this.popUpBox = 2;    // 领红包弹窗出来
						
					} else if(this.isLogin == 2){
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
						},action => {})
					}
					
				}
			},

			getRedPackage(id){    //  点击弹窗里领取按钮事件
                 if (this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass:'confirmButtonClass'
					})
				} else if(this.activityTime == 3){
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass:'confirmButtonClass'
					})
				} else {
                    this.getAppData('/activity/openYear/getRedEnvelope', (data) => {
                        if (data.resCode == 1) {
							this.localLordData = data.resData.localLord;    // 年华出借总额
						    this.localLordValue = data.resData.localLordValue;  // 豪气值
							this.redPackgeList = data.resData.redEnvelopeRuleModels;   // 红包列表
							this.money = data.resData.money; // 可得金额
							this.popUpBox = 0;
							Toast({ //    小黑快
								message: '领取成功',
								iconClass: 'icon icon-success',
								duration: 500
							});
						} else if(data.resCode == -1){
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
					},(this.osType ? {
                        id:this.redId = id
					} : {
						id:this.redId = id
					}))
				}
			},

			goInvest() { // 去出借
				if (this.activityTime == 2) {
						MessageBox.alert('亲，活动尚未开始哦!', '提示', {
							confirmButtonClass:'confirmButtonClass'
						})
					} else if(this.activityTime == 3){
						MessageBox.alert('亲，活动已经结束啦!', '提示', {
							confirmButtonClass:'confirmButtonClass'
						})
					} else {
						this.toApp('WIP', {
							path: '/wxInvest',
							query: {
								thisUrl: this.$route.funllPath
							}
						})
					}
			},
            
			BroughtUp() {   // 已经领取完事件
				if (this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass:'confirmButtonClass'
					})
				} else if(this.activityTime == 3){
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass:'confirmButtonClass'
					})
				} else {
					MessageBox.alert('当前红包已领取完', '提示', {
						cancelButtonClass: 'mint-msgbox-confirm',
					})
				}
                
			},

			unused(){   // 从在未使用红包弹框
			if (this.activityTime == 2) {
					MessageBox.alert('亲，活动尚未开始哦!', '提示', {
						confirmButtonClass:'confirmButtonClass'
					})
				} else if(this.activityTime == 3){
					MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass:'confirmButtonClass'
					})
				} else {
					this.popUpBox = 3;
				}
                
			},

			logInEvent(){   // 点击登录按钮事件
                if(this.activityTime == 2){
                   MessageBox.alert('亲，活动尚未开始哦!', '提示', {
					  confirmButtonClass:'confirmButtonClass'
				   })
				} else if(this.activityTime == 3){
                   MessageBox.alert('亲，活动已经结束啦!', '提示', {
					  confirmButtonClass:'confirmButtonClass'
				   })
				} else {
					this.toApp('LG', {  // 跳转登录页面
						path: '/wxLogin',
						query: {
							thisUrl: this.$route.fullPath
						}
					})
				}
			}
		},
		created:function(){
			this.timeLimit();   // 活动时间
			this.initData();   // 初始化接口
		},
		components:{
			wxHeader,
		},
		mounted:function(){
			
		},
		watch:{
		}
	}
</script>

<style>
	.confirmButton,
	.cancelButton,.mint-msgbox-confirm {
		font-size: 0.48rem !important;
	}
</style>

<style lang="scss" scoped>
// 红包动画样式
    @-webkit-keyframes go {
        0% {
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-moz-keyframes go {
        0% {
			 -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
			-moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-o-keyframes go {
        0% {
			-o-transform: rotate(2deg);
			-o-transform: top center;
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-ms-keyframes go {
        0% {
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;			
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
    @keyframes go {
        0% {
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	#goodLuckInAYear{
		font-family: DIN-Medium;
		.main{
			width: 100%;
			height: 46.893333rem;
			padding-top: 13.4rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/bg.png?v=1.7) no-repeat;
			background-size: cover;
			overflow: hidden;
			position: relative;
			.rule_btn{
			    width: 0.613333rem;
			    height: 1.773333rem;
			    position: fixed;
			    right: 0;
			    top: 6.5rem;
			    background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/rule_btn.png?v=1.0) no-repeat;
			    background-size:cover ;
				z-index: 99;
			}
			.red_rule_btn{
				width: 1.146667rem;
				height:1.266667rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/red_rule_btn.png?v=1.0) no-repeat;
				background-size: cover;
				position: absolute;
				top: 13.35rem;
                right: 1rem;
				-webkit-animation: go 1s ease-in-out alternate infinite;
				-moz-animation: go 1s ease-in-out alternate infinite;
				-o-animation: go 1s ease-in-out alternate infinite;
				-ms-animation: go 1s ease-in-out alternate infinite;
				animation: go 1s ease-in-out alternate infinite;
			}
			.redPackage_box,.rule_box,.go_box,.red_rule_box{
                position: fixed;
			    left: 0;top: 0;
			    right: 0;bottom: 0;
			    margin: auto;
			    z-index: 100;
				.lantern_img1{
					width: .933333rem;
					height: 1.653333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/lantern_img.png?v=1.0) no-repeat;
					background-size:cover; 
					position: absolute;
					-webkit-animation: go .5s ease-in-out alternate infinite;
					-moz-animation: go .5s ease-in-out alternate infinite;
					-o-animation: go .5s ease-in-out alternate infinite;
					-ms-animation: go .5s ease-in-out alternate infinite;
					animation: go .5s ease-in-out alternate infinite;
				}
				.lantern_img2{
					width: .933333rem;
					height: 1.653333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/lantern_img.png?v=1.0) no-repeat;
					background-size:cover; 
					position: absolute;
					-webkit-animation: go .5s ease-in-out alternate infinite;
					-moz-animation: go .5s ease-in-out alternate infinite;
					-o-animation: go .5s ease-in-out alternate infinite;
					-ms-animation: go .5s ease-in-out alternate infinite;
					animation: go .5s ease-in-out alternate infinite;
				}
			}
			.rule_box,.red_rule_box{
				width: 8.96rem;
			    height: 10.88rem;
				.close_btn{
			    	width: .8rem;
			    	height: .8rem;
			    	position: absolute;
			    	right: 0;left: 0;
					top: 10.08rem;
					margin: auto;
			    }
				.lantern_img1{
					left: 0rem;
					top: 1.4rem;
				}
				.lantern_img2{
					right: 0rem;
					top: 1.4rem;
				}
			}
			.rule_box{
			    background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/rule_box.png?v=1.2) no-repeat;
			    background-size: cover;
			    padding-top: 8.5rem;
			    font-size: .36rem;
			    padding-left: 1.2rem;    
				color: #750D00;
				a{
					position: absolute;
					top: 7.68rem;
                    right: 1.8rem;
					color: #4731B7;
				}
			}
			.red_rule_box{
				width:8.96rem;
				height: 10.88rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/red_rule_Box.png?v=1.0) no-repeat;
				background-size:cover; 
				padding-top:2rem; 
				padding-bottom:2rem; 
				overflow: hidden;
				.red_rule_text{
					width: 100%;
					height:6.7rem;
					overflow: auto;
					.red_urle_text_img{
						width: 6.053333rem;
						height: 16.48rem;
						background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/red_rule_text.png?v=1.1) no-repeat;
					    background-size:cover; 
					   margin: 0 auto;
					}
				}
			}
			.redPackage_box,.go_box{
                  .qxBtn,.lqBtn{
                    width: 3.346667rem;
					height: 1.2rem;
					line-height: 1rem;
					position:absolute;	
				}
			}
			.redPackage_box{
				width:100%;
				height: 9.733333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/lqBox.png?v=1.2) no-repeat;
				background-size:cover; 
				text-align: center;
				padding: 4rem 1rem 0 1rem;
				h3{
					font-size: .533333rem;
					color: #8B2F1B;
					margin-bottom: .3rem; 
				}
				p{
					font-size: .346667rem;
					color: #4731B7 ;
					span{
						font-family: '微软雅黑';
					}
				}
				.qxBtn{
					top: 6.55rem;
                   left: 1.54rem;
				}.lqBtn{
					top: 6.55rem;
                    right: 1.54rem;
				}
				.lantern_img1{
					left: .53rem;
                     top: 3.2rem;
				}
				.lantern_img2{
					right: .53rem;
					 top: 3.2rem;
				}
			}
			.go_box{
				width: 8.96rem;
				height: 5.626667rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/qsyBox.png?v=1.1) no-repeat;
				background-size:cover; 
				text-align: center;
				font-size: .4rem;
				color: #4731B7;
				line-height: .6rem;
				padding-top:1.6rem; 
				.qxBtn{
					top: 3.63rem;
                   left: 1rem;
				}.lqBtn{
					top: 3.63rem;
                right: 1rem;
				}
				.lantern_img1{
					left: 0rem;
					top: .58rem;
				}
				.lantern_img2{
					right: 0rem;
					top: .56rem;
				}
			}
			.red_packet_box{
				width: 100%;
				padding:0 1rem 0 1.4rem;
				ul{
					position: relative;
					li{
						width: 2rem;
						height: 3.466667rem;
						float: left;
						margin-left: .586667rem;
						padding-top: 2.093333rem;
						background-size:cover; 
						.btn{
							width: 1.08rem;
							height: .88rem;
							background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/btn1.png?v=1.1) no-repeat;
							background-size: cover;
							margin: 0 auto;
						}
						.btn.no_btn{
							background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/btn2.png?v=1.1) no-repeat;
							background-size: cover;
						}
						.btn.go_btn{
							background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/btn3.png?v=1.1) no-repeat;
							background-size: cover;
						}
						.btn.no_get_btn{
							background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/btn4.png?v=1.1) no-repeat;
							background-size: cover;
						}
					}
					li:nth-child(1){
                        -webkit-animation: go 1.1s ease-in-out alternate infinite;
						-moz-animation: go 1.1s ease-in-out alternate infinite;
						-o-animation: go 1.1s ease-in-out alternate infinite;
						-ms-animation: go 1.1s ease-in-out alternate infinite;
						animation: go 1.1s ease-in-out alternate infinite;
					}
					li:nth-child(2){
						-webkit-animation: go 1.2s ease-in-out alternate infinite;
						-moz-animation: go 1.2s ease-in-out alternate infinite;
						-o-animation: go 1.2s ease-in-out alternate infinite;
						-ms-animation: go 1.2s ease-in-out alternate infinite;
						animation: go 1.2s ease-in-out alternate infinite;
					}
					li:nth-child(3){
						-webkit-animation: go 1.3s ease-in-out alternate infinite;
						-moz-animation: go 1.3s ease-in-out alternate infinite;
						-o-animation: go 1.3s ease-in-out alternate infinite;
						-ms-animation: go 1.3s ease-in-out alternate infinite;
						animation: go 1.3s ease-in-out alternate infinite;
					}
					li:nth-child(4){
						-webkit-animation: go 1.4s ease-in-out alternate infinite;
						-moz-animation: go 1.4s ease-in-out alternate infinite;
						-o-animation: go 1.4s ease-in-out alternate infinite;
						-ms-animation: go 1.4s ease-in-out alternate infinite;
						animation: go 1.4s ease-in-out alternate infinite;
					}
					li:nth-child(5){
						-webkit-animation: go 1.1s ease-in-out alternate infinite;
						-moz-animation: go 1.1s ease-in-out alternate infinite;
						-o-animation: go 1.1s ease-in-out alternate infinite;
						-ms-animation: go 1.1s ease-in-out alternate infinite;
						animation: go 1.1s ease-in-out alternate infinite;
					}
					li:nth-child(6){
						-webkit-animation: go 1.3s ease-in-out alternate infinite;
						-moz-animation: go 1.3s ease-in-out alternate infinite;
						-o-animation: go 1.3s ease-in-out alternate infinite;
						-ms-animation: go 1.3s ease-in-out alternate infinite;
						animation: go 1.3s ease-in-out alternate infinite;
					}

					li:nth-child(7){
						-webkit-animation: go 1.2s ease-in-out alternate infinite;
						-moz-animation: go 1.2s ease-in-out alternate infinite;
						-o-animation: go 1.2s ease-in-out alternate infinite;
						-ms-animation: go 1.2s ease-in-out alternate infinite;
						animation: go 1.2s ease-in-out alternate infinite;
					}
					li:nth-child(8){
						-webkit-animation: go 1s ease-in-out alternate infinite;
						-moz-animation: go 1s ease-in-out alternate infinite;
						-o-animation: go 1s ease-in-out alternate infinite;
						-ms-animation: go 1s ease-in-out alternate infinite;
						animation: go 1s ease-in-out alternate infinite;
					}
					li:nth-child(9){
						-webkit-animation: go 1s ease-in-out alternate infinite;
						-moz-animation: go 1s ease-in-out alternate infinite;
						-o-animation: go 1s ease-in-out alternate infinite;
						-ms-animation: go 1s ease-in-out alternate infinite;
						animation: go 1s ease-in-out alternate infinite;
					}
					li:nth-child(10){
						-webkit-animation: go 1.1s ease-in-out alternate infinite;
						-moz-animation: go 1.1s ease-in-out alternate infinite;
						-o-animation: go 1.1s ease-in-out alternate infinite;
						-ms-animation: go 1.1s ease-in-out alternate infinite;
						animation: go 1.1s ease-in-out alternate infinite;
					}
					li:nth-child(11){
						-webkit-animation: go 1.2s ease-in-out alternate infinite;
						-moz-animation: go 1.2s ease-in-out alternate infinite;
						-o-animation: go 1.2s ease-in-out alternate infinite;
						-ms-animation: go 1.2s ease-in-out alternate infinite;
						animation: go 1.2s ease-in-out alternate infinite;
					}
					li:nth-child(12){
						-webkit-animation: go 1.3s ease-in-out alternate infinite;
						-moz-animation: go 1.3s ease-in-out alternate infinite;
						-o-animation: go 1.3s ease-in-out alternate infinite;
						-ms-animation: go 1.3s ease-in-out alternate infinite;
						animation: go 1.3s ease-in-out alternate infinite;
					}
					li:nth-child(13){
						-webkit-animation: go 1s ease-in-out alternate infinite;
						-moz-animation: go 1s ease-in-out alternate infinite;
						-o-animation: go 1s ease-in-out alternate infinite;
						-ms-animation: go 1s ease-in-out alternate infinite;
						animation: go 1s ease-in-out alternate infinite;
					}
					li:nth-child(14){
						-webkit-animation: go 1.4s ease-in-out alternate infinite;
						-moz-animation: go 1.4s ease-in-out alternate infinite;
						-o-animation: go 1s ease-in-out alternate infinite;
						-ms-animation: go 1s ease-in-out alternate infinite;
						animation: go 1.4s ease-in-out alternate infinite;
					}
					li:nth-child(1),li:nth-child(2){
						margin-left: 1.195rem;
						margin-bottom: .2rem;

					}
					li:nth-child(3),li:nth-child(4),li:nth-child(5){
						margin-bottom: .42rem;
					}
					li:nth-child(6),li:nth-child(7),li:nth-child(8){
						margin-bottom: .42rem;
					}
					li:nth-child(9),li:nth-child(10),li:nth-child(11){
                        margin-bottom: .65rem;
					}
					li:nth-child(3),li:nth-child(6),li:nth-child(9),li:nth-child(12){
						margin-left: 0;
					}
					
				}
			}
			.logIn_box{
                width: 100%;
				position: relative;
				.logInText{
					width: 5.533333rem;
					height:.506667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/logInText.png?v=1.0) no-repeat;
					background-size: cover;
					margin: 0 auto .8rem;
				}
				.logIn_btn{
					width: 4.68rem;
					height: 1.306667rem;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/logInIcon.png?v=1.0) no-repeat;
					background-size: cover;
					text-align: center;
					margin: 0 auto
				}
			}
			.show_box{
				width: 100%;
				height: 6.173333rem;
				padding: 1.466666rem 1.36rem 0 1.36rem;
				text-align: center;
				position: absolute;
				top: 35.5rem;
				left: 0;
				.show_data_box{
					position:relative;
				      p{
				      	font-size:.88rem;
				      	color: #D1171A;
				      }
				      .myData{
						   margin-bottom: 0.3rem;
						   h3{
							   width: 6rem;
							   height:.52rem;
							   background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/text1.png?v=1.0) no-repeat center center;
							   background-size: 4.706667rem .52rem;
							   margin: 0 auto;
						   }
					  }
				      .award_data_box{
				      	width: 100%;
				      	.award_data{
				      		width: 50%;
				      		float: left;
							  .hqz{
								 width:100%; 
								 height: .493333rem;
								 background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/text2.png?v=1.0) no-repeat center center;
								 background-size: 2.493333rem .493333rem; 
								 margin: 0 auto;
							  }
							  .kdxj{
								 width:100%; 
								 height: .506667rem;
								 background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/text3.png?v=1.0) no-repeat center center;
								 background-size: 2.653333rem .506667rem; 
								 margin: 0 auto;
							  }
				      	}
				      }
				}
			}
			
			.dl1,.dl2{
				width: .933333rem;
				height: 1.653333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/goodLuckInAYear/lantern_img.png?v=1.0) no-repeat;
				background-size:cover; 
				position: absolute;
				top: 12.6rem;
			}
			.dl1{
                left: 0;
				-webkit-animation: go .5s ease-in-out alternate infinite;
				-moz-animation: go .5s ease-in-out alternate infinite;
				-o-animation: go .5s ease-in-out alternate infinite;
				-ms-animation: go .5s ease-in-out alternate infinite;
				animation: go .5s ease-in-out alternate infinite;
			}.dl2{
                right: 0;
				-webkit-animation: go .5s ease-in-out alternate infinite;
				-moz-animation: go .5s ease-in-out alternate infinite;
				-o-animation: go .5s ease-in-out alternate infinite;
				-ms-animation: go .5s ease-in-out alternate infinite;
				animation: go .5s ease-in-out alternate infinite;
			}
			
		}
		.mark_box{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 0;right: 0;
			left: 0;bottom: 0;
			margin: auto;
			background: #300707;
			opacity: .8;
			z-index: 99;
		}
	}
</style>