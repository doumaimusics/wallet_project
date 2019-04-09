<template>
	<div id="wx-login">
		<div v-title>账号绑定</div>
		<div class="main_wrap">
			<div class="bind"></div>
			<div class="form">
				<div class="log-input">
					<input v-model="userName" :class="{top1:userName}" type="text" class="input"  name="userName" id="username" autocomplete="off" @blur="inputBlur1" placeholder="请输入手机号或用户名">
	                <div class="clear_icon" v-if="userName" @click="clearValue(1)"></div>
				</div>
				<div class="log-input">
					<input v-model="password" :class="{top1:password}" :type="typeVal" class="input" id="password" maxlength="16" name="password" autocomplete="off" @blur="inputBlur2" style="width: 75%;" placeholder="请输入登录密码">
					<div class="clear_icon" v-if="password" @click="clearValue(2)"></div>
				</div>
			</div>
			<!-- && validCode -->
			<div @click="emergencysub"  :class="{isGray:!(userName && password)}" class="btn"></div>

			<!-- 注册按钮 -->
			<div class="register_btn_box">
				还没账号？<span @click="doRegister">立即注册</span>
			</div>
			<div @click="knowShow" class="rule_know"><span></span>活动须知</div>
		</div>
		
		
		<!-- 登录次数用完提示弹框 -->
		<div class="hint_pop" v-if="pwWrong">
            <h3 class="hint_top">温馨提示</h3>
			<p>您绑定次数过多，账户已被锁定！请<span>{{overTinute}}</span>分钟后登录</p>
			<div class="hint_btn" @click="closePw">确认</div>
		</div>
		<!-- 活动须知 -->
		<div class="rules" v-if="showActivityInfo">
			<div v-if="osType != 'IOS'" class="iosShow"></div>
			<div class="closeBtn" @click="closeDialog"></div>
		</div>
		<!--遮罩-->
		<div class="mark_box" v-if="popUpBox"></div>
	</div>
</template>

<script>
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import wxToapp from '../../../../common/wx/wxToapp';     // APP交互函数
	export default {
		mixins: [wxToapp,verify],
		data(){
			return {
				labelTxt1:'请输入手机号码/用户名',
				labelTxt2:'请输入登录密码',
				popUpBox:false,  // 0、遮罩  1、登录次数用完弹框
				errorMsg:'',   // 表单验证提示框
				tipShow:false, 
				inputActive:{
					userName:false,  // 用户名
					pwd:false   // 密码
					// code:false       // 图片验证码
				},
				typeVal:'password',   // 密码框得样式
				className1:false,   // 控制占位符得动画样式
				className2:false,   // 控制占位符得动画样式
				examineIcon:'https://aliyunsso.edspay.com/web/wx/login/login_1/close_eye.png?v=1.0',
				logoMsg:'登录',
				userName:'',
				password:'',
				validCode:'',
				lastUrl:'',
				overTinute:'',  // 登录次数过多提示的话
				count:0,       // 登录次数
				fullPath:'',  // 入口页面的路由
				logData:{},
				showActivityInfo:false,
				pwWrong:false,//密码输入次数过多
				openId:sessionStorage.getItem("openId") ? sessionStorage.getItem("openId"):'',//授权用户唯一openId
				awardTimes:'',//绑定任务奖励发放时间
			}
		},
		methods:{
			doRegister(){    // 跳转注册页面
				this.$router.push({path:'/register/wxAuthorizeRegister',query: this.$route.query})
			},
			// 活动须知弹框
			knowShow(){
				this.popUpBox = true;
				this.showActivityInfo = true;
			},
			//关闭活动须知弹框
			closeDialog(){
				this.popUpBox = false;
				this.showActivityInfo = false;
			},
			inputBlur1(){   // 失去焦点事件
               if(!this.userName){
				 this.className1 = false;
				 this.labelTxt1 = '请输入手机号码/用户名';
			   }
			},
			// 关闭密码输入次数过多提示弹框
			closePw(){
				this.popUpBox = false;
				this.pwWrong = false;
			},
			inputBlur2(){   // 失去焦点事件
			   if(!this.password){
				 this.className2 = false;
				 this.labelTxt2 = '请输入登录密码';
			   }
			},
			clearValue(n){   // 点击input清空内容
				if(n == 1){
					this.userName = '';
				} else if(n == 2){
					this.password = '';
				}
			},
			emergencysub:function () {					//登录验证
				  var that = this;
				  if(that.userName == '' || that.password == ''){
                       return;
				  } else {
					if(this.isFormat(that.password,'密码格式错误,请重新输入！','passwordReg',1)) return;
					
					this.logData = {pwd:that.password,userName:that.userName,openId:that.openId,tokenId: that.fingerprint,};
					
					this.$http.post(that.ajaxUrl.getUrl(2)+'/user/doLogin',that.logData)
					.then((res) => {
						if(res.body.resCode == 1){
							that.awardTimes = res.body.resData.awardTime;				
							that.setCookie('userToken',res.body.resData.token,(1000 * 60 * 10))
							that.setCookie('zsOpenStatus',res.body.resData.zsOpenStatus)
							that.setCookie('userId',res.body.resData.user.userId,(1000 * 60 * 10))
							that.setCookie('nickname',res.body.resData.user.userName,(1000 * 60 * 10))//在线客服用户昵称
							that.setCookie('userName',that.userName.substring(0,3)+"****"+that.userName.substring(7,11));   
							sessionStorage.setItem("awardTime", res.body.resData.awardTime)
							// 设置cookie得手机号和用户名
							localStorage.setItem('userPhone',that.userName)
							that.$router.replace({path:'/register/wxBindResult',query:{awardTime:res.body.resData.awardTime}})
							
						} else {
							 that.count = res.body.resData.count
							if(that.count > 4){     // 判断登录次数输入错误超过五次锁定账户
								that.popUpBox = true;
								that.pwWrong = true;
								that.overTinute = res.body.resData.minute;
							} else {
								that.toast({
									text:res.body.resMsg
								})
							}
						}
					}, (response) => {    
						// 响应错误回调
					}); 
				  }
          		    			    
      		}
		},
		components:{
			
		},
		created(){
			if(sessionStorage.getItem("openId") && sessionStorage.getItem("awardTime")){
				this.$router.replace({path:'/register/wxBindResult',query:{awardTime:this.awardTimes}})
			}
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#wx-login').height(height);
			
		}
	}
</script>

<style lang="scss" scoped>

	.el-icon-circle-cross{
		color:#ff5a4a;
	}
	#wx-login{
		font-family: PingFangSC-Regular;
		background:#FFBAA6;
		position: relative;
		overflow: hidden;
		width: 100%;
		.main_wrap{
			width: 100%;
			height: 16.08rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/rg_bg.png) no-repeat;
			background-size: 100% 16.08rem; 
		}
		.top{
			height:1.333333rem;
			text-align: center;
			a{
				display:inline-block;
				float: left;
			}
			img{height:.666667rem;width:.666667rem;position: absolute;top:0.35rem; left:0.533333rem;}
			span{
				color:#B8B8B8;
				font-size:.453333rem;
				line-height:1.333rem;
				color:#333;
			}
		}
		.img{
			display:block;
			height:1.906667rem;width:2.64rem;
			margin:1rem auto 1.24rem;
			border-radius:50%; 
		}
		.form{
			padding:0 1.066667rem;
			margin-bottom: .533333rem;
			.log-input{
				position:relative;
				height:1.173333rem;
				margin-bottom: 0.533333rem;
				padding-bottom: .266667rem;
			}
			input{
				font-size:0.4rem;
				width:8.0rem;
				position: absolute;
				height: 0.6rem;
				top: 0.34rem;
				left: 0;
				font-size: 0.48rem;
				color: #333333;
				line-height: 0.48rem;
				text-indent: 1.293333rem;
				font-family: DIN-Medium;
			}
			input.top1{
				top: 0.28rem;
			}
			.clear_icon{
				width: .533333rem;
				height: .533333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0) no-repeat;
				background-size: cover; 
				position: absolute;
				top: .31rem;
				right: 0.56rem;
			}
			.clear_icon.pasw{
				top: .55rem;
				right: 1.2rem;
			}
			.examine_icon{
				width: .533333rem;
				height: .533333rem;
				background-size: cover!important; 
				position: absolute;
				top: .5rem;
				right: 0;
			}
			img{
				height:0.56rem;
				width:1.6rem;
				margin-top:0.3rem;
				margin-right: 20px;
				float: right;
			}
			.line{
				position:relative;
				margin-top:0.1rem;
				height:0.666667rem;
				width:1px;
			}
			.bor-r{border-right:1px solid #E5E5E5;}
			.input-code{
				width:65%;
				float: left;
			}
		}
		.btn{
			width: 7.973333rem;
			height: 1.626667rem;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/binded.png?v=1.1) no-repeat;
			background-size: cover;
		}
		.isGray{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/bind.png?v=1.1) no-repeat;
			background-size: cover; 
		}
		.wj_pass_box{
			width: 100%;
			height: .32rem;
			line-height: .32rem;
			font-size: .32rem;
			margin-bottom: .666667rem;
			span{padding:0 1.066667rem;}
			.forget{color:#508CEE;}
		}
		.register_btn_box{
			width: 100%;
			font-family: PingFangSC-Medium;
			font-size: 0.32rem;
			color: #FFFFFF;
			text-align: center;
			span{
				color: #F44111;
			}
		}
        // 遮罩
        .mark_box{
			width: 100%;
			height: 100%;
			position:fixed;
			top: 0;left: 0;
			bottom: 0;right:0;
			margin: auto;
			background: #000;
			opacity: .5;
			z-index: 99;
		}
		// 登录次数用完提示框
		.hint_pop{
            width: 7.493333rem;
			height: 5.706667rem;
            border-radius: .266667rem;
			background: #fff;
		    position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			margin: auto;
            z-index: 100;
			text-align: center;
			.hint_top{
				width: 100%;
				height: 1.2rem;
				background: #F3F3F3;
				color: #333;
				font-size: .4rem;
				line-height: 1.2rem;
				border-top-left-radius: .266667rem;
				border-top-right-radius: .266667rem;
			}
			p{
				color: #333;
				font-size: .373333rem;
				line-height: .533333rem;
				margin:.986667rem .8rem;
				span{
					color: #FF514A;
				}
			}
			.hint_btn{
				width: 6.666667rem;
				height: .96rem;
				background: #FF4A41;
				margin: 0 auto;
				border-radius: .106667rem;
				font-size: .426667rem;
				line-height: .96rem;
				color: #fff;
			}
		}
		.bind{
			height: 6.88rem;
		}
		.rules{
			position: fixed;
			width: 8.653333rem;
			height: 13.08rem;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background:url(https://aliyunsso.edspay.com/web/wx/activity/authorize/rule_dialog.png?v1.1) no-repeat;
			background-size: cover;
			margin: auto;
            z-index: 100;
			text-align: center;
			padding-top: 9.8rem;
			.iosShow{
				width: 7.5rem;
			    background: #fff;
				height: 1.2rem;
				margin: 0 auto;
			}
			.closeBtn{
				position: absolute;
				top: 11.1rem;
				width: 7.333333rem;
				height: 1.333333rem;
				left: 1rem;
			}
		}
		.rule_know{
			position: fixed;
			width: 100%;
			height: 0.533333rem;
			left: 0;
			bottom: 0.773333rem;
			text-align: center;
			font-family: PingFangSC-Medium;
			font-size: 0.32rem;
			color: #FFFFFF;
			z-index: 97;
			span{
				display: inline-block;
				width: 0.4rem;
				height: 0.4rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/tip.png) no-repeat;
				background-size: 0.4rem;
				position: relative;
				top: 0.05rem;
				margin-right: 0.16rem;
			}
		}
		::-webkit-input-placeholder { /* WebKit browsers */   //设置input placeholder字体颜色
		  	font-size: 0.346667rem;
		} 
		:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		  	font-size: 0.346667rem;
		} 
		::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		  	font-size: 0.346667rem;
		} 
		:-ms-input-placeholder { /* Internet Explorer 10+ */ 
		  	font-size: 0.346667rem;
		}
	}
</style>