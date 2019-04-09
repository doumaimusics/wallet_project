<template>
	<div class="send" :style="{height:fullHeight.minHeight}">
		<div v-title>猪年红包天天发</div>
		<!-- 滚动信息 -->
		<div class="k_scroll_box">
		    <div class="scroll_box clear">
		        <div class="scroll-div fl">
		            <ul>
		                <li v-for="item in scrollInfo" ref="messageList">{{item}}</li>
		            </ul>
		        </div>
		    </div>
		</div>

		<div class="middle_wrap">
			<p class="active_time">活动时间:2019.01.25-02.15</p>
			<div class="to_send" v-if="gameTimeLimit" @click="ActivityPrompt"></div>
			<div class="to_send" v-else @click="toSend"></div>
			<div class="user_info">
				<div class="money bdr-b" v-if="mainData.loginStatus == 1">{{mainData.getReward}}元</div>
				<div class="btn" v-else @click="toLogin"></div>
			</div>
		</div>

		<div class="rule" @click="gameRule = true"></div>
		<!-- 领取记录 -->
		<div class="tab_banner">
			<ul class="clear">
				<li class="lf1" @click="activeIndex(0)" :class="{active1:activeBar[0]}"></li>
				<li class="rt1" @click="activeIndex(1)" :class="{active2:activeBar[1]}"></li>
			</ul>
			<div class="main">
				<div class="friend_list" v-show="activeBar[0]">
					<div class="friend_info clear">
						<div class="see_btn see1">
							<span class="span1" v-if="mainData.loginStatus == 1">{{mainData.fireds}}人</span>
							<span class="span2" v-else @click="toLogin"></span>
						</div>
						<div class="see_btn see2">
							<span class="span1" v-if="mainData.loginStatus == 1">{{mainData.reward}}元</span>
							<span class="span2" v-else @click="toLogin"></span>
						</div>
					</div>
					<div class="progress_num">
						<div class="line_color" :style="{width:lineWidth + '%'}" v-if="mainData.loginStatus == 1"></div>
						<div class="line_color" v-else></div>
					</div>
				</div>
				<div class="strategy" v-show="activeBar[1]">
					<div class="dis"></div>
					<ul v-if="betweenTime.friendList.length">
						<li class="bdr-b" v-for="item in betweenTime.friendList">
							<span class="firend_span1">{{item.phone}}</span>
							<span class="firend_span2" v-if="item.status == 1 || item.status == 2">00时00分00秒</span>
							<span class="firend_span2" v-else>
								<time-down :lastTime="item" :getData="getData"></time-down>
							</span>
							<span class="firend_span3">
								<i class="btn_1" v-if="item.status == 1">{{item.timeStr}}</i>
								<i class="btn_2" v-else-if="item.status == 2"></i>
								<i class="btn_3" v-else-if="item.status == 3" @click="toRemind(item.friendId)"></i>
							</span>
						</li>
					</ul>
					<img v-else class="no_data" src="https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/no_data.png" alt="">
				</div>
			</div>
		</div>

		<!-- 活动规则 -->
		<div class="layer_box" v-if="gameRule">
			<div class="dialog_commom game_rule">
				<a href="tel:400-135-3388"></a>
				<div class="tip" v-if=" osType == 'IOS' ">本活动奖品与苹果公司无关！</div>
				<div class="close_btn" @click="gameRule = false"></div>
			</div>
		</div>
		<!-- 微信分享 -->
		<div class="layer_box" v-if="wxShareBg" @click="wxShareBg = false">
			<img src="https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/wx_share.png" alt="">
		</div>
	</div>
</template>
<script>
	import wxShare from '../../../../common/wx/wxShare';
	import jiami from 'js-base64';
	import timeDown from './arrTimeDown';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui'
	export default {
		mixins:[wxShare],
		data() {
			return {
				mainData:{},//页面数据
				betweenTime:{//好友领取列表
					friendList:[]
				},
				shareObj: { //分享标题内容配置
					title: "过年啦！给你发个大大的红包。", //标题
					desc: '最高可领100元（可提现），祝你猪年快乐，"猪"事顺利>>', //内容
					link: global.host + "wx/openRed", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				},
				gameRule:false,//规则
				tabActive:{//切换
					friends:true,
					rule:false,
				},
				lineColor:['10','17','25','48'],
				lineWidth:0,//进度条
				scrollInfo:[
					'130****2839 获得50元现金',
					'131****2098 获得200元现金',
					'132****2349 获得50元现金',
					'151****2034 获得50元现金',
					'152****3029 获得500元现金',
					'157****2158 获得50元现金',
					'159****0098 获得500元现金',
					'182****4572 获得1000元现金',
					'188****5384 获得50元现金',
					'187****4839 获得50元现金',
					'186****3408 获得50元现金',
					'185****5932 获得500元现金',
					'155****2930 获得50元现金',
					'156****2231 获得50元现金',
					'186****1930 获得500元现金',
					'185****9834 获得200元现金',
					'137****4732 获得500元现金',
					'156****2231 获得50元现金',
					'183****3424 获得200元现金',
					'150****4024 获得200元现金',
					'138****4938 获得50元现金',
					'134****4839 获得50元现金',
					'135****2038 获得200元现金',
					'136****4320 获得50元现金'
				],
				userIds:'',
				wxShareBg:false,//微信分享蒙层
				timer:null,
				countdownTime:{//倒计时
					hr:'00',
					min:'00',
					secd:'00',
				},
				MobilePhone:'',//用户手机号
				activityStatus:'',//活动时间状态
				gameTimeLimit:false,//活动结束或未开始展示
				activeBar:[true,false],//控制tab切换
				AppShare:'',
				fullHeight:{
					minHeight:document.documentElement.clientHeight+'px'
				},
				beforeEndSt:true,//活动提前结束标注
			}
		},
		methods:{
			// 活动时间
			_getActivityTime(){// 获取活动时间状态
				this.notLogPost('/activity/two/getActivityTime',data => {
					if(data.resCode){
						this.activityStatus = data.resData.active;
						if(data.resData.active != 1){
							this.gameTimeLimit = true;
							this.beforeEndSt = false;
							this.ActivityPrompt()
						}else if(data.resData.active == 1){ // 因为活动提前下线，所以增加这个else if判断，正常情况是直接走if中的代码
							this.beforeEndSt = true;
							MessageBox.alert('亲，猪年红包已发完，活动结束！', '提示', {
							  confirmButtonClass: 'confirmButtonClass'
							})
						}
						
					}
				},{activityId:'pig_red_everyday'})
			},
			ActivityPrompt(type) { //显示弹框方法 type = 3 不判断活动结束
			  if (this.activityStatus == 2) {
			    MessageBox.alert('亲，活动尚未开始哦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  } else if (this.activityStatus == 3 && type != 3) {
			    MessageBox.alert('亲，活动已经结束啦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  } else if (this.activityStatus == 4) {
			    MessageBox.alert('亲，活动已经失效啦!', '提示', {
			      confirmButtonClass: 'confirmButtonClass'
			    })
			  }
			},

			//发送好友
			toSend(){
				if(this.mainData.loginStatus == 1){
					if(this.beforeEndSt){ // 因为活动提前下线，所以增加这个if判断，正常情况是直接走else中的代码
						MessageBox.alert('亲，猪年红包已发完，活动结束！', '提示', {
						  confirmButtonClass: 'confirmButtonClass'
						})
					}else{
						this.AppShare = '';
						this.appShare = '';
						window._czc.push(﻿["_trackEvent",'猪年发红包','送给好友按钮']);
						this.userId = Base64.encode(this.userIds);
						this.shareObj.title = '过年啦！给你发个大大的红包。';
						this.shareObj.desc = '最高可领100元（可提现），祝你猪年快乐，"猪"事顺利>>';
						this.shareObj.link = global.host + "wx/openRed?userName="+Base64.encode(this.MobilePhone);
						this.userId = Base64.encode(this.userIds);
						this.AppShare = '1|过年啦！给你发个大大的红包。|最高可领100元（可提现），祝你猪年快乐，"猪"事顺利>>|'+ global.host + 'wx/openRed?ui='+ Base64.encode(this.userIds) +'&userName=' + Base64.encode(this.MobilePhone) + '|https://aliyunsso.edspay.com/web/icon.png';
						
						if(this.osType){
							this.PassValue(this.AppShare)
						}else{
							this.getWxShareData(this.shareObj)
							this.wxShareBg = true;
						}
					}
				}else{
					this.toLogin();
				}
			},

			//提醒好友
			toRemind(id){
				if(this.mainData.loginStatus == 1){
					if(this.beforeEndSt){ // 因为活动提前下线，所以增加这个if判断，正常情况是直接走else中的代码
						MessageBox.alert('亲，猪年红包已发完，活动结束！', '提示', {
						  confirmButtonClass: 'confirmButtonClass'
						})
					}else{
						this.AppShare = '';
						this.appShare = '';
						this.userId = Base64.encode(id);
						this.shareObj.title = '发你的100元红包（可提现）即将失效，快去领取吧!';
						this.shareObj.desc = '我在E都市钱包出借很久了,网贷50强平台，新人专享10%参考收益。';
						this.shareObj.link = global.host + "wx/friendTask?friendUi=" + Base64.encode(id);
						this.userId = Base64.encode(id);
						this.AppShare = '1|发你的100元红包（可提现）即将失效，快去领取吧!|我在E都市钱包出借很久了,网贷50强平台，新人专享10%参考收益。|'+ global.host + "wx/friendTask?friendUi=" + Base64.encode(id) + '|https://aliyunsso.edspay.com/web/icon.png';
						if(this.osType){
							this.PassValue(this.AppShare)
						}else{
							this.getWxShareData(this.shareObj)
							this.wxShareBg = true;
						}
					}
					
				}else{
					this.toLogin();
				}
			},

			//tab切换
			activeIndex(index){
				if(this.mainData.loginStatus == '1'){
					this.$set(this.activeBar,0,false)
				    this.$set(this.activeBar,1,false)
				    this.$set(this.activeBar,index,true)
				}else{
					this.toLogin();
				}
			    
			},

			tabChange(me){
				if(this.mainData.loginStatus == '1'){
					for(var x in this.tabActive){
						this.tabActive[x] = false
					}
					this.tabActive[me] = true
				}else{
					this.toLogin();
				}
				
			},
			getData(){
				this.getNotlogData('/pigred/index',(data) =>{
					if(data.resCode == 1){
						this.mainData = data.resData;
						this.betweenTime.friendList = data.resData.list;
						this.firdNum = data.resData.fireds;
					    this.userIds = data.resData.myUserId;
					    // console.log(Base64.encode(this.userIds))
					    this.MobilePhone = data.resData.myPhone;
					    for(var i=0; i<this.betweenTime.friendList.length; i++){
					    	this.betweenTime.friendList[i].timeToStart = this.betweenTime.friendList[i].endTimeLong/1000
					    }
					    console.log(this.betweenTime.friendList)
						if(this.firdNum == 0){
							this.lineWidth = 0
						}else if( this.firdNum > 0 && this.firdNum <= 2 ){
							this.lineWidth = (this.lineColor[0]*(this.firdNum/2)).toFixed(2)
							
						}else if( this.firdNum > 2 && this.firdNum <= 4 ){
							this.lineWidth = parseInt(this.lineColor[1]*((this.firdNum-2)/2)) + parseInt(10)
						}else if( this.firdNum > 4 && this.firdNum <= 8 ) {
							this.lineWidth = parseInt(this.lineColor[2]*((this.firdNum-4)/4)) + parseInt(27)
						}else if( this.firdNum > 8 && this.firdNum <= 20 ) {
							this.lineWidth = parseInt(this.lineColor[3]*((this.firdNum-8)/12)) + parseInt(52)
						}else if( this.firdNum > 20 ){
							this.lineWidth = 100
						}
					}
				},{},1)
			},
		},
		mounted() {
			// 友盟数据统计
			const script = document.createElement('script');
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275923096&web_id=1275923096';
			script.language = 'JavaScript'
			document.body.appendChild(script)

			var that = this;
			$(document).ready(function(){
			    clearInterval(that.timer)
			    that.timer = window.setInterval(function(){
		            $('.scroll-div').find("ul:first").animate({
		                marginTop: -that.$refs.messageList[0].offsetHeight + 'px'
		            },500,function(){
		                $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
		            });
			    },3000);
			});

		},
		components:{timeDown},
		created() {
			this.getData();
			this._getActivityTime();
		},
        destroyed(){
            clearInterval(this.timer);
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
<style lang="scss" scoped>
	.send{
		position: relative;
		width: 100%;
		min-height: 19.0rem;
		background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/h5Bg.jpg?v1.3) no-repeat;
		background-size: 100%;
		padding-top: 3.586667rem;
		.rule{
			width: 1.013333rem;
			height: 2.426667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/rule_btn.png?v1.1) no-repeat;
			background-size: 100%;
			position: fixed;
			top: 0;
			right: 0.293333rem;
		    z-index: 66;
		}
		.layer_box{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.6);
			z-index: 1000;
			img{
                height:8.493333rem;
                width:100%;
            }
		}
		.middle_wrap{
			width: 100%;
			height: 4.4rem;
			margin-bottom: .4rem;
			.active_time{
				font-family: SourceHanSansCN-Regular;
				font-size: 0.253333rem;
				text-align: center;
				color: #9f090e;
				margin-bottom: 0.346667rem;
			}
			.to_send{
				width: 4.493333rem;
				height: 1.24rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/to_share.gif) no-repeat;
				background-size: 100% 100%;
				margin: 0 auto;
			}
			.user_info{
				width: 100%;
				padding-top: 1.2rem;
				padding-left: 5.6rem;
				.money{
					width: 1.573333rem;
					height: 0.573333rem;
					position: relative;
					font-family: SourceHanSansCN-Medium;
					font-size: 0.346667rem;
					color: #e3b35b;
					text-align: center;
					line-height: 0.573333rem;
				}
				.bdr-b:after{
					border-color: #8b0202;
				}
				.btn{
					width: 1.466667rem;
					height: 0.573333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/to_view2.png) no-repeat;
					background-size: 100% 100%;
					position: relative;
				}
			}
		}
		.k_scroll_box{
		    position: relative;
		    height: 0.506667rem;
		    margin-bottom: 3.5rem
		}
		.scroll_box{
		    position: relative;
		    height: 0.506667rem;
		    width: 4.826667rem;
		    margin: 0 auto;
		    padding-top: .03rem;
		}
		.scroll-div{
		    position: relative;
		    width: 100%;
		    height: 0.506667rem;
		    text-align: center;
		    font-family: SourceHanSansCN-Regular;
		    font-size: 0.293333rem;
		    color: #fefefe;
		    overflow: hidden;
		    li{
		        width: 100%;
		        white-space: nowrap;
		        overflow: hidden;
		        height: .613333rem;
		        text-overflow: ellipsis;
		    }
		}
		.dialog_commom{
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			text-align: center;
			z-index: 1000;
			a{
				display: inline-block;
			    width: 3.5rem;
			    height: 0.6rem;
			    position: relative;
			    top: 8.5rem;
			}
			.tip{
				width: 80%;
			    height: 0.5rem;
			    position: relative;
			    margin: 0 auto;
			    top: 8.35rem;
			    font-size: 0.24rem;
			    color: #ffdaad;
			    text-align: left;
		        left: -0.1rem;
			}
			.close_btn{
				width: 1.333333rem;
			    height: 1.333333rem;
			    position: relative;
			    margin: 0 auto;
			    top: -1.4rem;
		        left: 3rem;
			}
		}
		.tab_banner{
			width: 10.0rem;
			height: 5.666667rem;
			position: relative;
			ul{
				width: 9.2rem;
				height: 0.946667rem;
				margin: 0 auto;
				position: relative;
				li{
					width: 4.493333rem;
					height: 0.946667rem;
					float: left;
					position: relative;
				}
				li.lf1{
					float: left;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/tab1.png) no-repeat; 
	    	    	background-size: 4.493333rem 0.946667rem;
				}
				li.rt1{
					float: right;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/tab2.png) no-repeat; 
	    	    	background-size: 4.493333rem 0.946667rem;
				}
				.left1{
					left: 4.7rem;
				}
				.left2{
					left: 4.53rem;
				}
				li.active1{
					width: 5.08rem;
					height: 0.946667rem;
					position: absolute;
					left: 0rem;
					top: 0;
					z-index: 99;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/tab1_actived.png) no-repeat; 
	    	    	background-size: 5.08rem 0.946667rem;
				}
				li.active2{
					width: 5.08rem;
					height: 0.946667rem;
					top: 0;
				    right: 0rem;
				    z-index: 99;
				    position: absolute;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/tab2_actived.png) no-repeat; 
	    	    	background-size: 5.08rem 0.946667rem;
				}
			}
			.main{
				width: 10.0rem;
				height: 4.746667rem;
				margin: 0 auto;
				
				.friend_list{
					width: 100%;
					height: 100%;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/tab_bg1.png) no-repeat; 
	    	    	background-size: 10.0rem 4.746667rem;
					ul{
						width: 100%;
						height: 100%;
						padding: 0.053333rem 0.4rem;
						li{
							width: 100%;
							height: 1.346667rem;
							padding-top: 0.16rem;
							position: relative;
							div{
								width: 100%;
								height: 0.453333rem;
								margin-bottom: 0.146667rem;
								span{
									display: inline-block;
								}
								.fl{
									font-family: DIN-Bold;
									font-size: 0.373333rem;
									color: #D91F07;
								}
								.fr{
									font-family: PingFang-SC-Medium;
									font-size: 0.346667rem;
									color: #D91F07;
								}
							}
							p{
								font-family: PingFang-SC-Regular;
								font-size: 0.32rem;
								color: #666666;
							}
						}
						.bdr-b:after {border-color: #F3C169}
					}
					img{
						width: 8.8rem;
						height: 3.333333rem;
						text-align: center;
						margin-top: 0.52rem;
						position: relative;
					    margin-left: .12rem;
					}
					.friend_info{
						width: 100%;
						height: 0.573333rem;
						padding-top: 0.58rem;
						margin-bottom: 1.81rem;
						.see_btn{
							width: 1.466667rem;
							height: 0.573333rem;
							float: left;
							position: relative;
							line-height: 0.573333rem;
							font-size: 0.346667rem;
							color: #f54239;
							.span2{
								width: 1.466667rem;
								height: 0.573333rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/toView.png) no-repeat;
								background-size: 1.466667rem 0.573333rem;
								display: inline-block;
							}
						}
						.see_btn.see1{
							left: 3.506667rem;
						}
						.see_btn.see2{
							left: 6.5rem;
						}

					}
					.progress_num{
						width: 8.786667rem;
						height: 0.306667rem;
						border-radius: 0.16rem;
						position: relative;
						left: 0.493333rem;
						overflow: hidden;
						.line_color{
							width: 100%;
							height: 0.306667rem;
							border-radius: 0.16rem;
							background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/line_bg.png) repeat;
							overflow: hidden;
						}
					}
				}
				.strategy{
					width: 100%;
					height: 100%;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/tab_bg2.png) no-repeat; 
	    	    	background-size: 10.0rem 4.746667rem;
	    	    	.dis{
	    	    		height: 0.986667rem;
	    	    	}
	    	    	.no_data{
	    	    		width: 1.786667rem;
	    	    		height: 1.893333rem;
	    	    		position: relative;
	    	    		top: 0.8rem;
    	    		    left: 3.8rem;
	    	    	}
	    	    	ul{
	    	    		width: 8.84rem;
	    	    		margin: 0 auto;
	    	    		height: 3.733333rem;
    	    		    overflow: auto;
	    	    		li{
	    	    			width: 100%;
	    	    			position: relative;
	    	    			height: 1.066667rem;
	    	    			line-height: 1.066667rem;
	    	    			span{
	    	    				display: inline-block;
	    	    				font-family: SourceHanSansCN-Normal;
    	    					font-size: 0.32rem;
    	    					color: #c17f26;
	    	    			}
	    	    			.firend_span1{
	    	    				width: 2.64rem;
	    	    				text-align: left;
	    	    			}
	    	    			.firend_span2{
	    	    				width: 2.853333rem;
	    	    				text-align: center;
	    	    			}
	    	    			.firend_span3{
	    	    				width: 2.65rem;
	    	    				text-align: right;
	    	    				float: right;
	    	    				padding-right: .1rem;
	    	    				i{
	    	    					display: inline-block;
	    	    				}
	    	    				.btn_2{
									width: 1.64rem;
									height: 0.573333rem;
									background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/off.png) no-repeat;
									background-size: 1.64rem 0.573333rem;
									position: relative;
								    top: .12rem;
	    	    				}
	    	    				.btn_3{
									width: 1.64rem;
									height: 0.573333rem;
									background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/remind.png) no-repeat;
									background-size: 1.64rem 0.573333rem;
									position: relative;
								    top: .12rem;
	    	    				}
	    	    			}
	    	    		}
	    	    		.bdr-b:after {border-color: #f2dfa3}
	    	    	}
				}
			}
		}
		.game_rule{
			width: 7.733333rem;
			height: 10.666667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/rule_bg.png?v1.2) no-repeat;
			background-size: 100% 100%;
		}
		.tab_bar{
			position: relative;
			ul.barrager {
				width:100%;
				background:rgba(0,0,0,.5);
				margin:0 auto;
				height:6.666667rem;
				overflow:hidden;
				position:relative;
				li{
					position: absolute;
				    padding: .2rem;
				    background: rgba(0,0,0,0.5);
				    border-radius: .6rem;
				    font-size: 0.373333rem;
				}
			}
		}
		
	}
</style>