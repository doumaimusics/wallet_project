<template>
	<div id="wx-login">
		<!-- https://www.edspay.com/#/wxLogin?authorization=1&sOpenId=openId -->
		<!--  $route.query.authorization == 1 为服务号授权登录状态码 -->
		<div v-title v-if="$route.query.authorization == 1">绑定账户</div>
		<div v-title v-else>登录</div>
		<img src="https://aliyunsso.edspay.com/web/wx/login/login_1/logo.png" alt="" class="img">
		<div class="form">
			<div class="log-input bdr-b">
				<label for="" :class="{labels:className1}">{{labelTxt1}}</label>
				<input @focus="inputFocus('userName')" v-model="userName" type="text" class="input"  name="userName" id="username" autocomplete="off" @blur="inputBlur1">
                <div class="clear_icon" v-if="(userName && typeShow1 == true)" @click="clearValue(1)"></div>
			</div>
			<div class="log-input bdr-b">
				<label for="" :class="{labels:className2}">{{labelTxt2}}</label>
				<input @focus="inputFocus('pwd')" v-model="password" :type="typeVal" class="input" id="password" maxlength="16" name="password" autocomplete="off" @blur="inputBlur2" style="width: 75%;">
				<div class="clear_icon pasw" v-if="(password && typeShow2 == true)" @click="clearValue(2)"></div>
				<div class="examine_icon" @click.stop="changePassTyp" :style="{background:'url('+examineIcon+')'}"></div>
			</div>
		</div>
        <!-- 忘记密码 -->
        <div class="wj_pass_box">
            <span @click="doGetPwd" class="forget" v-if="$route.query.authorization != 1">忘记密码?</span>
		</div>
		<!-- && validCode -->
		<div v-if="$route.query.authorization == 1" @click="emergencysub"  :class="{isGray:!(userName && password)}" class="btn">立即绑定</div>
		<div v-else @click="emergencysub"  :class="{isGray:!(userName && password)}" class="btn">登录</div>

		<!-- 注册按钮 -->
		<div class="register_btn_box">
			<div @click="doRegister"></div>
		</div>
		
		<!-- 登录次数用完提示弹框 -->
		<div class="hint_pop" v-if="popUpBox == 1">
            <h3 class="hint_top">温馨提示</h3>
			<p>您登录次数过多，账户已被锁定！请<span>{{overTinute}}</span>分钟后登录</p>
			<div class="hint_btn" @click="popUpBox = 0">确认</div>
		</div>
		<!--遮罩-->
		<div class="mark_box" v-if="popUpBox"></div>

		<wx-authorize v-if='evaluation.isShow' :showThis="evaluation" :text="evaluationText1" :btnText="evaluationBtn" :confirm="evaluationFun" :textShow="2"></wx-authorize>

	</div>
</template>

<script>
	import verify from '../../../common/wx/verification';	//引入表单验证
	import wxAuthorize from '../../public/wx/wxPublicDialog'; //授权弹框
	export default {
		mixins: [verify],
		data(){
			return {
				labelTxt1:'请输入手机号码/用户名',
				labelTxt2:'请输入登录密码',
				typeShow1:false,// 清楚按钮判断当有焦点和有内容同时成立才显示			
				typeShow2:false,// 清楚按钮判断当有焦点和有内容同时成立才显示
				popUpBox:0,  // 0、遮罩  1、登录次数用完弹框
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
				fanliData:{},//接收返利网信息
				logData:{},
				openId:sessionStorage.getItem("openId") ? sessionStorage.getItem("openId"):'',//授权用户唯一openId
				evaluation:{   // 授权成功的弹框
					isShow: false,
				},
				evaluationText1:'您已成功绑定账户',  //授权成功的弹框提示
				evaluationBtn: '去出借',
				sOpenId: '',
			}
		},
		methods:{
			doRegister(){    // 跳转注册页面
				let parameters = Object.assign(this.$route.query,{ fullPath: this.fullPath });
				this.$router.replace({path:'/wxRegisterNew',query: parameters})
			},
			evaluationFun(){    // 跳转出借页面
				this.$router.replace('/wxInvest');
			},
			doGetPwd(){
				this.$route.query.fullPath = this.fullPath;
                this.$router.replace({
					path:'/wxGetPwd',
					query:this.$route.query
				})
			},
			toAccount(){
				this.$router.replace({path:(this.lastUrl ? this.lastUrl : '/wxMyAccount')})
			},
			inputFocus(nameInput){			//添加获取焦点效果
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
				this.inputActive[nameInput] = true;
				if(nameInput == "userName"){
					this.className1 = true;
					this.labelTxt1 = '手机号码/用户名';
					this.typeShow1 = true;
				} else {
					this.typeShow1 = false;
				}
				if(nameInput == "pwd"){
					this.className2 = true
				    this.labelTxt2 = '登录密码';
					this.typeShow2 = true;
				} else {
					this.typeShow2 = false;
				}
			},
			inputBlur1(){   // 失去焦点事件
               if(!this.userName){
				 this.className1 = false;
				 this.labelTxt1 = '请输入手机号码/用户名';
			   }
			   setTimeout(()=>{this.typeShow1 = false;},100)
			},
			inputBlur2(){   // 失去焦点事件
			   if(!this.password){
				 this.className2 = false;
				 this.labelTxt2 = '请输入登录密码';
			   }
			   setTimeout(()=>{this.typeShow2 = false;},100)
			},
			clearValue(n){   // 点击input清空内容
				if(n == 1){
					this.userName = '';
					$('#username').focus();
				} else if(n == 2){
					this.password = '';
					$('#password').focus();
				}
			},
			changePassTyp(){   // 查看密码切换事件
                if(this.typeVal === "password"){
					this.examineIcon = 'https://aliyunsso.edspay.com/web/wx/login/login_1/open_eye.png?v=1.0';
					this.typeVal = "text";
				} else {
					this.examineIcon = 'https://aliyunsso.edspay.com/web/wx/login/login_1/close_eye.png?v=1.0';
					this.typeVal = "password";
				}
			},
			emergencysub:function () {					//登录验证
				  var that = this;
				  if(that.userName == '' || that.password == ''){
                       return;
				  } else {
					if(this.isFormat(that.password,'密码格式错误,请重新输入！','passwordReg',1)) return;
					if(this.fanliData.tc){
                        this.logData = {
							pwd:that.password,userName:that.userName,
							uid:that.fanliData.uid,
							target_url:that.fanliData.target_url,tc:that.fanliData.tc,tracking_id:that.fanliData.tracking_id,action_time:that.fanliData.action_time,flCode:that.fanliData.code,
							tokenId: that.fingerprint
						}
					} else {
					    this.logData = {
							pwd:that.password,
							userName:that.userName,
							openId:that.openId,
							sOpenId: that.sOpenId,
							tokenId: that.fingerprint
						};
					}
					this.$http.post(that.ajaxUrl.getUrl(2)+'/user/doLogin',that.logData)
					.then((res) => {
						if(res.body.resCode == 1){			
							that.setCookie('userToken',res.body.resData.token,(1000 * 60 * 10))
							that.setCookie('zsOpenStatus',res.body.resData.zsOpenStatus)
							that.setCookie('userId',res.body.resData.user.userId,(1000 * 60 * 10))
							that.setCookie('nickname',res.body.resData.user.userName,(1000 * 60 * 10))//在线客服用户昵称
							sessionStorage.setItem("awardTime", res.body.resData.awardTime)
							that.setCookie('userName',that.userName.substring(0,3)+"****"+that.userName.substring(7,11));   // 设置cookie得手机号和用户名
							localStorage.setItem('userPhone',that.userName)
							if(that.$route.query.authorization == 1){
								that.evaluation.isShow = true;
							}else{
								that.$router.replace({path:(that.lastUrl ? that.lastUrl : '/wxMyAccount')})
							}
						} else {

							// that.change();
							// that.popModal({   // 提示信息框旧
							// 	str: res.body.resMsg
							// });
							// that.toast({
							// 	text:res.body.resMsg
							// })
							 that.count = res.body.resData.count
							if(that.count > 4){     // 判断登录次数输入错误超过五次锁定账户
								that.popUpBox = 1;
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
		beforeRouteEnter: (to, from, next) => { //获取当前页面路由
				next(vm => {                 // vm相当于this
				console.log(vm.$route.query)
				if(from.path == '/wxSetPwd'){
                    vm.fullPath = vm.$route.query.fullPath;
				} else {
					vm.fullPath = from.fullPath;
				}
				
				}
			)
        },
		created(){       
			if(this.$route.query.sOpenId)  this.sOpenId = this.$route.query.sOpenId;
			if(this.$route.query.phone){
				this.userName = this.$route.query.phone;
			}
			this.lastUrl = this.$route.query.thisUrl;		//获取上一个页面的Url
			// this.change();		//第一次加载图片验证码
			if(this.$route.query.osType) this.setCookie('osType',this.$route.query.osType,(1000*60*20))
			if(this.getCookie('userName')){   // 获取cookie中的用户名和电话
				this.userName = localStorage.userPhone;
				this.className1 = true;
				this.labelTxt1 = '手机号码/用户名';
			}
			if(this.$route.query.tc){
				this.fanliData = this.$route.query;
			}
			this.$route.query.thisUrl = this.lastUrl;
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#wx-login').height(height);
			
		},
		components:{
			wxAuthorize,
		}
	}
</script>

<style>
.mint-toast{
		/* width: 90%!important;
		padding: 20px!important; */
	}
</style>

<style lang="scss" scoped>

	.el-icon-circle-cross{
		color:#ff5a4a;
	}
	#wx-login{
		font-family: PingFangSC-Regular;
		background:#fff;
		position: relative;
		overflow: hidden;
		.bdr-b{
			color:#E5E5E5;
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
			// height:1.333333rem;
			// width:1.333333rem;
			height:1.906667rem;width:2.64rem;
			margin:1rem auto 1.24rem;
			border-radius:50%; 
		}
		.form{
			padding:0 1.066667rem;
			margin-bottom: .533333rem;
			.log-input{
				position:relative;
				height:1.413333rem;
				margin-bottom: .333333rem;
				padding-bottom: .266667rem;
			}
			label{
				height: .346667rem;
				position: absolute;
				top: .6rem;
				left: 0;
				line-height: .346667rem;
				-webkit-transition:top .6s;
				-ms-transition:top .6s;
				-o-transition:top .6s;
				-moz-transition:top .6s;
				transition:top .6s;
				font-size: .346667rem;
				color: #808080;
			}
			.labels{
				height: .293333rem;
				font-size: .293333rem;
				top:0;
				// -webkit-transition: .6s;
				// -ms-transition: .6s;
				// -o-transition: .6s;
				// -moz-transition: .6s;
				// transition: .6s;
			}
			input{
				font-size:0.4rem;
				width:90%;
				position: absolute;
				top: .3rem;
				left: 0;
				font-size: .72rem;
				color: #333333;
				line-height: .72rem;
				font-family: DIN-Medium;
			}
			.clear_icon{
				width: .533333rem;
				height: .533333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0) no-repeat;
				background-size: cover; 
				position: absolute;
				top: .6rem;
				right: 0;
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
			width: 7.866667rem;
			height: 1.2rem;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/login_button.png?v=1.0) no-repeat;
			background-size: cover; 
			text-align: center;
			line-height: 1.2rem;
			font-size: .426667rem;
			color: #fff;
			margin-bottom: .5rem;
		}
		.isGray{
			background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/login_null_xhdpi.png?v=1.0) no-repeat;
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
			width: 7.866667rem;
			height: 1.2rem;
			background:url(https://aliyunsso.edspay.com/web/wx/v3.3.5/register_btn.png?v=1.0) no-repeat;
			background-size: cover; 
			margin: 0 auto;
			div{
				width: 100%;
				height: 100%;
			}
		}
		// .bottom{
		// 	width:100%;
		// 	position: absolute;
		// 	bottom:1.066667rem;
		// 	font-size:0.346667rem;
		// 	line-height:0.506667rem;
		// 	text-align:center;
		// 	span{padding:0 0.266667rem;}
		// 	.forget{color:#CCCCCC;}
		// 	.replace{color:#999999;}
		// }
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
			top: 0;left: 0;
			right: 0;bottom: 0;
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
	}
</style>