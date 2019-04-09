<template>
	<div id="cut">
		<div v-title>砍红包</div>
		<!-- <div class="game_time" v-if="gameTime" @click="activityTime"></div> -->
		<div class="top"></div>
		<div class="rule_btn" @click="gameRule = true"></div>
		<!-- 倒计时 -->
		<div class="count_down">
			<div v-if=" loginStatus == 0 || status == 0 " class="unbegin">分享后开始计时</div>
			<div v-else>
				<div class="over_time" v-if=" status == 1 && activityStatus == 1"><span class="mr">{{countdownTime.hr}}</span>:<span class="ml mr">{{countdownTime.min}}</span>:<span class="ml">{{countdownTime.secd}}</span></div>
				<div class="over_time" v-else><span class="mr">00</span>:<span class="ml mr">00</span>:<span class="ml">00</span></div>
			</div>
		</div>
		<!-- 帮砍按钮 -->
		<div class="btns">
			<div class="share_btn game_time_limit" v-if="gameTimeLimit" @click="unBeginning"></div>
			<!-- 喊好友砍一刀 -->
			<div class="share_btn share_on" v-if=" loginStatus == 0 || status == 0 || status == 1 " @click="toInvite"></div>
			<!-- 已砍至最低，请尽快领取红包 -->
			<div class="share_btn share_off" v-else-if=" status == 2 "></div>
			<!-- 时间结束，请尽快领取红包 -->
			<div class="share_btn share_over" v-else-if=" status == 3 "></div>
			<!-- 已领取 -->
			<div class="share_btn share_has_over" v-else-if=" status == 4 "></div>
		</div>
		<!-- 帮砍人数 -->
		<div class="cut_num">{{cutNum}}人帮砍成功</div>
		<!-- 帮砍进度 -->
		<div class="cut_progress clear">
			<div class="red_list" v-for=" (item,index) in redList ">
				<div class="has_list" :style="{background:'url('+ redBg[index] +') center center / 1.733333rem 2.8rem'}" v-if="item.status == 1">
					<div class="get_btn" @click="getRed(item.id,item.minInvestAccount)"></div>
					<p v-if="index < 2">不限量</p>
					<p v-else>剩{{item.remainRed}}个</p>
				</div>
				<div class="has_list" :style="{background:'url('+ takedBg[index] +') center center / 1.733333rem 2.8rem'}" v-else-if="item.status == 2">
					<div class="get_btn"></div>
					<p v-if="index < 2">不限量</p>
					<p v-else>剩{{item.remainRed}}个</p>
				</div>
				<div class="has_list" v-else>
					<div class="get_btn"></div>
					<p v-if="index < 2">不限量</p>
					<p v-else>剩{{item.remainRed}}个</p>
				</div>
				 
			</div>
			<div class="progress_line clear">
				<div class="squre fl"></div>
				<div class="color_line fl">
					<div class="yellow_line" :style="{width:0}" v-if=" status == 0 "></div>
					<div class="yellow_line" :style="{width:colorLine[cutNum]}" v-else></div>
				</div>
			</div>
		</div>
		<!-- 帮砍列表 -->
		<div class="tab_banner">
			<ul class="clear">
				<li class="lf1" @click="tabChange('friends')" :class="{active1:tabActive.friends}"></li>
				<li class="rt1" @click="tabChange('rule')" :class="{active2:tabActive.rule}"></li>
			</ul>
			<div class="main">
				<div class="friend_list" v-show="tabActive.friends">
					<ul v-if="recordList.length">
						<li class="bdr-b" v-for="item in recordList">
							<div class="clear"><span class="fl">{{item.name}}</span><span class="fr">砍了一刀</span></div>
							<p>{{item.addTime}}</p>
						</li>
					</ul>
					<img src="https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/null.png?v1.1" alt="" v-else>
				</div>
				<div class="strategy" v-show="tabActive.rule"></div>
			</div>
		</div>
		<!-- 领取成功 -->
		<div class="layer_box" v-if="takeRedEnvelope">
			<div class="dialog_commom sucess_dialog">
				<p>任意项目满{{takedRed | changeWan}}元可用</p>
				<div class="take_btns clear">
					<div @click="beginTake" class="div1"></div>
					<div @click="takeRedEnvelope = false"></div>
				</div>
				
			</div>
		</div>
		<!-- 领取失败 -->
		<div class="layer_box" v-if="takefail">
			<div class="dialog_commom fali_dialog">
				<p class="p2">{{failMeg}}</p>
				<div class="take_btns take_btns2" @click="takefail = false">
				</div>
				
			</div>
		</div>
		
		<!-- 活动未开始 -->
		<div class="layer_box" v-if="gameUnstart">
			<div class="game_box unOPen">
				<div class="game_btn" @click="gameUnstart = false"></div>
			</div>
		</div>

		<!-- 活动以结束 -->
		<div class="layer_box" v-if="gameover">
			<div class="game_box over">
				<div class="game_btn" @click="gameover = false"></div>
			</div>
		</div>

		<!-- 活动规则 -->
		<div class="layer_box" v-if="gameRule">
			<div class="dialog_commom game_rule">
				<a href="tel:400-135-3388"></a>
				<div class="tip" v-if=" osType != 'IOS' "></div>
				<div class="close_btn" @click="gameRule = false"></div>
			</div>
		</div>

		<!-- 微信分享 -->
		<div class="layer_box" v-if="wxShareBg" @click="wxShareBg = false">
			<img src="https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/wx_share.png" alt="">
		</div>
	</div>
</template>
<script>
	import wxShare from '../../../../common/wx/wxShare';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui'
	export default {
		mixins:[wxShare],
		data(){
			return{
				recordList:[],//帮砍好友列表
				redList:[],//红包列表
				loginStatus:0,//登陆状态
				activityStatus:'',//活动状态
				gameUnstart:false,//活动未开始
				gameover:false, //活动已结束
				takeRedEnvelope:false,//红包领取
				status:'',//倒计时时间
				timeStatus:0,//到计时时间与按钮的状态 0：未分享 1：已分享且时间和帮砍未过 2：帮砍结束 3：倒计时时间结束
				wxShareBg:false,
				MobilePhone:'',//用户手机号
				interval:null,//倒计时
				cutNum:0,//帮砍人数
				takedRed:'',//已领取的红包
				gameRule:false,//活动规则
				redId:'',//红包Id
				takefail:false,//失败弹框
				cutHelpId:'',//点击分享传值
				userId:'',
				// countDownTimenN:'',//倒计时时间
				gameTimeLimit:false,//活动开始结束
				shareObj: { //分享标题内容配置
					title: "送你20元现金（可提现），帮忙砍个红包吧！", //标题
					desc: "我在E都市钱包参加砍红包活动，需要你的支持。去帮忙>", //内容
					link: global.host + "cutRedEnvelope/cutHelp", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				},
				countdownTime:{//倒计时
					hr:'00',
					min:'00',
					secd:'00',
				},
				tabActive:{//切换
					friends:false,
					rule:false,
				},
				redBg:[
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/light0.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/light1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/light2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/light3.png',
				],
				takedBg:[
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/hased0.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/hased1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/hased2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/hased3.png',
				],
				colorLine:['0.7rem','2.72rem','4.75rem','6.96rem'],
				flag:true,//领取冒泡控制
				failMeg:'',//领取失败原因
				acTimeOut:null,
				timeDl:null,

			}
		},
		methods:{
			tabChange(me){
				for(var x in this.tabActive){
					this.tabActive[x] = false
				}
				this.tabActive[me] = true
			},
			//初始化数据
			getData(){
				this.getNotlogData('/cutRed/initCutRedMes', (data) => {
					if(data.resCode == 1){
						clearInterval(this.interval);
						this.loginStatus = data.resData.loginStatus;
						this.status = data.resData.model.status;
						this.recordList = data.resData.model.recordList;
						this.redList = data.resData.model.ruleList;
						this.cutNum = data.resData.model.cutNum;
						this.userId = data.resData.ui;
						this.cutHelpId = data.resData.model.ruleList[0].id;

						this.appShare = '1';
						this.shareObj.link = global.host + "cutRedEnvelope/cutHelp";
						this.getWxShareData(this.shareObj); //分享调用

						//tab初始化切换
						if( this.cutNum > 0 ){
							this.tabActive.friends = true;
							this.tabActive.rule = false;
						}else{
							this.tabActive.rule = true;
							this.tabActive.friends = false;
						}

						//倒计时
						if( this.loginStatus == 1 && this.status == 1 ){
							this.startDate(data.resData.model.countDown)
						}else{
							clearInterval(this.interval);
						}
					}
				},{activityId:'cut_red_activity'},1)
			},

			//领@取红包
			getRed(redId,minAmount){
				if(this.loginStatus == 0){
					this.toLogin()
				}else if( this.activityStatus != '1' ){
					this.ActivityPrompt()
				}else{
					this.redId = redId;
					this.takedRed = minAmount;
					if(this.takedRed == '5000'){
						if(this.flag){
							this.flag = false;
							this.takeRed();
						}
						
					}else{
						//领取成功弹框
						this.takeRedEnvelope = true;
					}
					
				}
			},

			//领红包接口
			takeRed(){
				this.getAppData('/cutRed/getRed',(res) => {
					if(res.resCode == 1){
						this.flag = true;
						this.redId = '';
						Toast({
						    message: res.resMsg,
						    duration: 3000,
						    className: 'toastTip'
						});
						this.getData();
					}else{
						this.flag = true;
						this.failMeg = res.resMsg;
						this.redId = '';
						this.takefail = true;
						this.getData();
					}
				},{id:this.redId},1)
			},

			//立即领取按钮
			beginTake(){
				if(this.flag){
					this.flag = false;
					this.takeRedEnvelope = false;
					this.takeRed();
				}
			},
			// 活动时间
			_getActivityTime(){// 获取活动时间状态
				this.notLogPost('/activity/two/getActivityTime',data => {
					if(data.resCode){
						this.activityStatus = data.resData.active;
						if(data.resData.active != 1){
							this.gameTimeLimit = true
						}
						this.ActivityPrompt()
					}
				},{activityId:'cut_red_activity'})
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

			//活动未开始和已结束
			unBeginning(){
				if( this.loginStatus == 0 ){
					this.toLogin()
				}else{
					this.ActivityPrompt()
				}
			},

			// 邀请砍红包
			toInvite(){
				if( this.loginStatus == 0 ){
					this.toLogin()
				}else {
					_czc.push(["_trackEvent", "砍红包", '喊好友帮砍']);
					if( this.status == 0 ){
						// 访问接口开始计时
						this.getAppData('/cutRed/recordShow',(data) =>{
							if( data.resCode == 1 ){
								this.getData();
		      					if( this.osType ){
		      						this.PassValue(this.appShare)
		      					}else{
		      						this.wxShareBg = true;
		      					}
							}

						},{cutId:this.cutHelpId},1)
					}else if( this.status == 1 ){
						if( this.osType ){
							this.PassValue(this.appShare)
						}else{
							this.wxShareBg = true;
						}
					}
				}
			},

            countDown(val){   // 倒计时
				let t = Math.floor(val / 1000);  // 毫秒 => 秒
				let h = Math.floor(t / 3600)  // 时
				let m = Math.floor(t % 3600 / 60)  // 分
				let s = t % 60;  // 秒
				this.countdownTime.hr = h < 10 ? '0' + h : h;
				this.countdownTime.min = m < 10 ? '0' + m : m;				
				this.countdownTime.secd = s < 10 ? '0' + s : s;
            },
            startDate(T){
                this.interval = setInterval(() => {   // 倒计时
                    if(T < 1000){
                        clearInterval(this.interval);
                        this.getData();
                        this.acTimeOut = setTimeout(() => {
							this._getActivityTime('cut_red_activity')
                        },1000)
                        
                    }
                    this.countDown(T);
                    T -= 1000;
                }, 1000);
            },
		},
		mounted(){
			this.PassValue('navWhite_砍红包');
			this.getData();

			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275391896&web_id=1275391896 '
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		beforeDestory(){
			clearInterval(this.interval)
		},
		created(){
			this._getActivityTime('cut_red_activity')
			
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
<style lang="scss" scoped>
	#cut{
		position: relative;
		width: 100%;
		height: 24.88rem;
		background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/bg_h5.png?v1.4) no-repeat;
		background-size: cover;
		font-family: PingFang-SC-Regular;
		.top{
			width: 100%;
			height: 5.39rem;
			position: relative;
		}
		.rule_btn{
			width: 1.066667rem;
			height: 1.066667rem;
			position: fixed;
			right: 0.133333rem;
			top: 4.933333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/rule_btn.png) no-repeat;
			background-size: cover;
			z-index: 100;
		}
		.count_down{
			width: 100%;
			height: 0.9rem;
			margin-bottom: 1rem;
			padding-left: 4.8rem;
			padding-top: .15rem;
			.unbegin{
				height: 0.55rem;
			    line-height: 0.53rem;
				font-family: PingFangSC-Semibold;
				font-size: 0.373333rem;
				color: #FFFFFF;
			}
			.over_time{
				font-family: PingFangSC-Semibold;
				font-size: 0.4rem;
				color: #FFFFFF;
				span{
					display: inline-block;
					width: 0.533333rem;
					height: 0.533333rem;
					font-family: DIN-Medium;
					font-size: 0.4rem;
					color: #FF342B;
					line-height: 0.533333rem;
					text-align: center;
					background: #fff;
					border-radius: 0.066667rem;
				}
				span.ml{
					margin-left: 0.16rem
				}
				span.mr{
					margin-right: 0.16rem
				}
			}
		}
		.cut_num{
			width: 100%;
			height: 0.64rem;
			text-align: center;
			line-height: 0.7rem;
			font-family: PingFangSC-Semibold;
			font-size: 0.373333rem;
			color: #FFFFFF;
		}
		.btns{
			width: 100%;
			height: 4.2rem;
			position: relative;
		    padding-top: 0.5rem;
		}
		.share_btn{
			width: 2.88rem;
			height: 1.946667rem;
			margin: 0 auto;
		}

		.share_btn.share_on{
			-webkit-animation: ripple 2s infinite;
			-moz-animation: ripple 2s infinite;
			-ms-animation: ripple 2s infinite;
			animation: ripple 2s infinite;
			background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/help_cut.png) no-repeat; 
			background-size: 100% 100%;
			position: relative;
		}
		.share_btn.game_time_limit{
			position: absolute;
		    top: .5rem;
		    left: 3.6rem;
		    z-index: 99;
		}
		@-moz-keyframes ripple {
		    0% {
		    	width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
			50% {
				width:2.666667rem;
				height: 1.733333rem;
				top: 0.16rem;
			}
			100% {
				width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
		}
		@-ms-keyframes ripple {
		  0% {
				width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
			50% {
				width:2.666667rem;
				height: 1.733333rem;
				top: 0.16rem;
			}
			100% {
				width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
		}
		@-webkit-keyframes ripple {
		  0% {
				width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
			50% {
				width:2.666667rem;
				height: 1.733333rem;
				top: 0.16rem;
			}
			100% {
				width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
		}
		@keyframes ripple {
		  0% {
				width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
			50% {
				width:2.666667rem;
				height: 1.733333rem;
				top: 0.16rem;
			}
			100% {
				width: 2.88rem;
				height: 1.946667rem;
				top: 0rem;
			}
		}
		.share_btn.share_off{
			background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/cut_over.png) no-repeat; 
			background-size: 2.88rem 1.946667rem; 
		}
		.share_btn.share_hased{
			background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/help_cut_off.png) no-repeat; 
			background-size: 2.88rem 1.946667rem; 
		}
		.share_btn.share_over{
			background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/time_out.png) no-repeat; 
			background-size: 2.88rem 1.946667rem; 
		}
		.share_btn.share_has_over{
			background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/taked.png) no-repeat; 
			background-size: 2.88rem 1.946667rem; 
		}
		.cut_progress{
			width: 100%;
			height: 4.79rem;
		    margin-bottom: .75rem;
		    position: relative;
		    padding-top: 0.8rem;
		    padding-left: 1.23rem;
		    .red_list{
		    	width: 1.733333rem;
	    	    height: 2.8rem;
	    	    position: relative;
	    	    float: left;
    	        margin-right: 0.32rem;
    	        .has_list{
    		    	width: 1.733333rem;
    	    	    height: 2.8rem;
    	    	    padding-top: 1.55rem;
    	    	    p{
    	    	    	font-size: 0.266667rem;
    	    	    	color: #E81C38;
    	    	    	text-align: center;
    	    	    	position: relative;
    	    	    	// top: 4.05rem;
    	    	    }
    	        }
	    	    .get_btn{
	    	    	width: 1.4rem;
    	    	    height: 1rem;
    	    	    margin: 0 auto;
	    	        margin-bottom: 0.6rem;
	    	    }
		    }
		    .progress_line{
		    	width: 8.0rem;
		    	height: 1.04rem;
		    	position: absolute;
		    	top: 3.23rem;
	    	    margin-left: -0.613333rem;
	    	    overflow: hidden;
	    	    .squre{
	    	    	width: 1.013333rem;
	    	    	height: 1.04rem;
	    	    	background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/progress_btn.png) no-repeat; 
	    	    	background-size: 1.013333rem 1.04rem;
	    	    	position: relative;
	    	    	z-index: 96;
	    	    }
	    	    .color_line{
	    	    	width: 6.96rem;
	    	    	height: 0.266667rem;
	    	    	background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/progress_line.png) no-repeat; 
	    	    	background-size: 6.96rem 0.266667rem;
	    	    	position: relative;
	    	    	padding-top: 0.04rem;
	    	    	margin-top: 0.386667rem;
	    	    	left: -0.15rem;
	    	    	overflow: hidden;
	    	    	.yellow_line{
	    	    		width: 0rem;//2.72rem,4.75rem,6.9rem
	    	    		height: 0.186667rem;
	    	    		border-radius: 0.093333rem;
						background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/yellow_line.png); 
	    	    	}
	    	    }
		    }
		}
		.tab_banner{
			width: 100%;
			position: relative;
			ul{
				width: 9.066667rem;
				height: 0.933333rem;
				margin: 0 auto;
				li{
					width: 4.533333rem;
					height: 0.933333rem;
					float: left;
				}
				li.lf1{
					background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/tab1.png) no-repeat; 
	    	    	background-size: 4.533333rem 0.933333rem;
				}
				li.rt1{
					background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/tab2.png) no-repeat; 
	    	    	background-size: 4.533333rem 0.933333rem;
				}
				li.active1{
					background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/tab1_actived.png) no-repeat; 
	    	    	background-size: 4.533333rem 0.933333rem;
				}
				li.active2{
					background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/tab2_actived.png) no-repeat; 
	    	    	background-size: 4.533333rem 0.933333rem;
				}
			}
			.main{
				width: 9.066667rem;
				height: 4.533333rem;
				margin: 0 auto;
				background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/tab_bg.png) no-repeat; 
    	    	background-size: 9.066667rem 4.533333rem;
				.friend_list{
					width: 100%;
					height: 100%;
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
				}
				.strategy{
					width: 100%;
					height: 100%;
					background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/cut_rule.png?v1.1) no-repeat center center; 
	    	    	background-size: 8.8rem 3.333333rem; 
				}
			}
		}
		.layer_box{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.6);
			z-index: 999;
			img{
                height:4.8rem;
                width:100%;
            }
		}
		.game_time{
			position: fixed;
			width: 100%;
			height: 100%;
			z-index: 100;
			left: 0;
			top: 0;
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
			    width: 2.5rem;
			    height: 0.6rem;
			    position: relative;
			    top: 8.3rem;
			}
			.tip{
				width: 80%;
			    height: 0.7rem;
			    background: #fff;
			    position: relative;
			    margin: 0 auto;
			    top: 8.2rem;
			}
			.close_btn{
				width: 1.333333rem;
			    height: 1.333333rem;
			    position: relative;
			    margin: 0 auto;
			    top: 8.6rem;
			}
		}
		.sucess_dialog{
			width: 7.733333rem;
			height: 7.333333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/sucess_red.png) no-repeat;
			background-size: 100% 100%;
			p{
				font-family: PingFangSC-Semibold;
				font-size: 0.266667rem;
				color: #FFF3CF;
				text-align: center;
				position: relative;
			    top: 4.1rem;
			}
		}
		.take_btns{
			width: 100%;
			height: 1.066667rem;
			position: relative;
		    top: 5.4rem;
			div{
				float: left;
				width: 3.333333rem;
				height: 1.066667rem;
			}
			div.div1{
				margin-left: 0.4rem;
				margin-right: 0.266667rem;
			}
		}
		.fali_dialog{
			width: 7.733333rem;
			height: 6.026667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/false_red.png) no-repeat;
			background-size: 7.733333rem 6.026667rem;
			.p2{
				position: relative;
				text-align: center;
				font-size: 0.346667rem;
				color: #666666;
				font-family: PingFangSC-Semibold;
				top: 3.8rem;
			}
			.take_btns2{
				top: 4rem;
			}
		}
		.game_box{
			width: 7.013333rem;
			height: 4.986667rem;
		}
		.game_rule{
			width: 7.733333rem;
			height: 10.88rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/rule_info.png?v1.5) no-repeat;
			background-size: 100% 100%;
		}
		.game_btn{
			width: 100%;
			height: 1.333333rem;
			position: relative;
			top: 3.333333rem;
		}
		.game_box.unOPen{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/gameUnopen.png) no-repeat;
			background-size: 7.013333rem 4.986667rem;
		}
		.game_box.over{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/gameOver.png) no-repeat;
			background-size: 7.013333rem 4.986667rem;
		}
	}
</style>