<!-- 分享出去的页面 -->
<template>
	<div class="open">
		<div v-title>好友红包</div>
		<!-- 滚动信息 -->
		<div class="k_scroll_box" :class="{top1:!showOpenRed}">
		    <div class="scroll_box clear">
		        <div class="scroll-div fl">
		            <ul>
		                <li v-for="item in scrollInfo" ref="messageList">{{item}}</li>
		            </ul>
		        </div>
		    </div>
		</div>
		<div v-if="showOpenRed" class="open_red" :style="{height:fullHeight.minHeight}">
			<div class="haoyouphone">Hi:{{userName | phoneNumber}}</div>
			<div class="btn" @click="toRegister"></div>
		</div>
		<div v-else id="inviteRegisterBox">
			<channels-register
				id="box"
				toLink="/wx/friendTask"
				channel="lbzn01"
				:inviterId="inviterId" 
				:isInvitation="1"
				:isCnzz="1"
				btnColor="#ffba25"
				registerCodeTimeColor="#ffe09e"
				registerCodeConfirmColor="#ffba25"
				@isoverflow="isflow=$event" 
				@getRegisteDiv="getRegisteDiv"
			></channels-register>
		</div>
		
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import jiami from 'js-base64';
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import getData from '../../../../common/router/getData';//引入发送请求
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import inviteRegister from '../wxNewActivityRegister';	//老的渠道注册模板
	import channelsRegister from './sendRegister';	//新的渠道注册模板
	export default{
		mixins:[wxToapp,getData,verify],
		data(){
			return{
				friendId:'',
				isIOS:false,
				registeRef: {}, // 注册框dom
				inviterId:'',	//获取邀请人ID
				colors:'#3A8AFF',
				// activityStatus:1,
				scrollInfo:[
					'186****1930 获得30元现金',
					'185****9834 获得50元现金',
					'134****4839 获得100元现金',
					'135****2038 获得100元现金',
					'136****4320 获得50元现金',
					'137****4732 获得30元现金',
					'138****4938 获得100元现金',
					'130****2839 获得50元现金',
					'131****2098 获得100元现金',
					'132****2349 获得50元现金',
					'155****2930 获得30元现金',
					'156****2231 获得50元现金',
					'139****3940 获得50元现金',
					'150****4024 获得30元现金',
					'151****2034 获得50元现金',
					'152****3029 获得50元现金',
					'157****2158 获得100元现金',
					'159****0098 获得50元现金',
					'182****4572 获得50元现金',
					'183****3424 获得30元现金',
					'188****5384 获得50元现金',
					'187****4839 获得50元现金',
					'186****3408 获得50元现金',
					'185****5932 获得30元现金'
				],
				timer:null,
				userUi:'',
				fullHeight:{
					minHeight : document.documentElement.clientHeight+'px'
				},
				userName:'',
				activityStatus:'',//活动时间状态
				gameTimeLimit:false,//活动结束或未开始展示
				showOpenRed:true,//初始页面展示
				beforeEndSt:true,//活动提前结束标注
			}
		},
		methods:{
			toRegister(){
				if(this.beforeEndSt){
					MessageBox.alert('亲，猪年红包已发完，活动结束！', '提示', {
					    confirmButtonClass: 'confirmButtonClass'
					})
				}else{
					window._czc.push(﻿["_trackEvent",'好友红包','马上拆开按钮']);
					if(this.gameTimeLimit){
						this.ActivityPrompt()
					}else{
						this.showOpenRed = false;
						// this.$router.push({path:'/wx/shareFriends',query:{ui:this.userUi}})
					}
				}
				
			},

			// 获取注册框dom
			getRegisteDiv (val) {
				this.registeRef = val
				this.$nextTick(function () {
					this.registeRef.style.top = '2.05rem'
				})
			},
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
						// if(data.resData.active != 1){
						// 	this.gameTimeLimit = true
						// }
						// this.ActivityPrompt()
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
		},
		mounted() {
			// 友盟数据统计
			const script = document.createElement('script');
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275923127&web_id=1275923127';
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
		created(){
			this._getActivityTime();
			if(this.$route.query.ui) {
				// this.userUi = this.$route.query.ui;
				this.inviterId =this.$route.query.ui;	//获取邀请人id;
			}
			this.userName = this.$route.query.userName;
			this.userName = Base64.decode(this.userName);
		},
		destroyed(){
		    clearInterval(this.timer);
		},
		components:{
			inviteRegister,
			channelsRegister
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
	.open{
		position: relative;
		width: 100%;
		.open_red{
			width: 100%;
			min-height: 16.08rem;
			background:url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/chai_bg.jpg) no-repeat;
			background-size: 100%;
			padding-top: 3.95rem;
		}
		.haoyouphone{
			font-family: SourceHanSansCN-Medium;
			font-size: 0.44rem;
			color: #956a0c;
			text-align: center;
			margin-bottom: 2.52rem;
		}
		.k_scroll_box{
		    position: absolute;
		    height: 0.506667rem;
	        margin-bottom: 0.81rem;
	        height: 0.69rem;
            margin-bottom: 0.72rem;
            left: 2.8rem;
            top: 2.63rem;
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
		.btn{
			width: 1.84rem;
			height: 1.84rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/chai.gif) no-repeat;
			background-size: 100%;
			position: relative;
		    left: 4.05rem;
		}
		#inviteRegisterBox{
			background: url('https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/register.jpg?v1.1') no-repeat;
			background-size: 100%;
			height: 30.253333rem;
		    padding-top: 4.30rem;
			.top{
				height: 0.2rem;
			}
		}
		.top1{
			top: 2.86rem;
		}
	}
</style>