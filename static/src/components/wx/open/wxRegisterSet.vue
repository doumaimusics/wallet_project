<template>
	<div id="wx-login">
		<!--  $route.query.authorization == 1 为服务号授权登录状态码 -->
		<div v-title v-if="$route.query.authorization == 1">绑定账户</div>
		<div v-title v-else>设置登录密码</div>
		<div class="form">
			<div class="log-input bdr-b">
                <label for="" :class="{labels:className1}">{{labelTxt1}}</label>
				<input @focus="inputFocus('Pcode')" v-model="message" type="number" class="input-message" name="message" id="message" autocomplete="off"
                @blur="inputBlur1"
				onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'
                >	
                <div class="clear_icon mes" v-if="(message && typeShow1 == true)" @click="clearValue(1)"></div>
				<div class="line bdr-r"></div>
				<div class="message fr" v-if="showBtn" @click="clickFun">{{btnText}}</div>
				<div class="message fr" v-else @click="sendCoures">{{time}}秒后重发</div>
			</div>
			<div class="log-input bdr-b">
                <label for="" :class="{labels:className2}">{{labelTxt2}}</label>
				<input @focus="inputFocus('pwd')" v-model="password" :type="typeVal" class="input" id="password" maxlength="16" name="password" autocomplete="off"
                @blur="inputBlur2"
                >
                <div class="clear_icon pasw" v-if="(password && typeShow2 == true)" @click="clearValue(2)"></div>
                <div class="examine_icon" @click.stop="changePassTyp" :style="{background:'url('+examineIcon+')'}"></div>
			</div>
            <p @click="inviteFn" :style="{background:'url('+Group+')'}">填写邀请码(选填)</p>
			<div class="log-input bdr-b" v-if="inviteBox">
				<input @focus="inputFocus('invite')" v-model="inviteName" type="text" class="input input-code" placeholder="请输入邀请人手机号码/邀请码" name="inviteName"  autocomplete="off"
				@blur="inputBlur3"
				>
                <div class="clear_icon inv" v-if="(inviteName && typeShow3 == true)"  @click="clearValue(3)"></div>
			</div>
			
		</div>
		<div v-if="$route.query.authorization == 1" @click="emergencysub"  :class="{isGray:!(message && password)}" class="btn">立即绑定</div>
		<div v-else @click="emergencysub"  :class="{isGray:!(message && password)}" class="btn">提交注册</div>
		<input-tip v-if="tipShow" :errorMsg="errorMsg"></input-tip>
		<div class="agreement">
			<!-- <cheak-img :cheak="isImg" class="ic_1"></cheak-img> -->
			<p class="xieyi">注册即表示同意<router-link :to="{path:'/wxRegisterAgreement'}" id="service_contract" tag="span">《E都市钱包注册协议》</router-link></p>
		</div>
        <!--  图形验证码 -->
        <div class="hint_pop" v-if="popUpBox == 1">
            <h3 class="hint_top">图形验证码</h3>
			<div class="input_box">
			    <input @focus="codeTS = false"  v-model="validCode" type="text" class="input_code"  placeholder="请输入图形验证码" name="validCode" autocomplete="off" id="validCode"/>
				<img @click="change()" :src="codeImg" class="valicode_img fr">
			</div>
			<h3 class="ts" v-if="codeTS">{{reeorText}}</h3>
			<div class="btn1" @click="[popUpBox = 0,validCode = '',codeTS = false]">取消</div>
			<div class="btn2" @click="verificationFn">确定</div>
		</div>

        <!-- 返回时得提示框 -->
		<div class="hint_pop" v-if="popUpBox == 2">
			<h3 class="hint_top">温馨提示</h3>
			<p>离1118元红包仅一步之遥，确定放弃吗？</p>
			<div class="btn1" @click="$router.go(-1)">放弃</div>
			<div class="btn2" @click="popUpBox = 0">继续注册</div>
		</div>
		<!--遮罩-->
		<div class="mark_box" v-if="popUpBox"></div>

		<wx-authorize v-if='evaluation.isShow' :showThis="evaluation" :text="evaluationText1" :btnText="evaluationBtn" :confirm="evaluationFun" :textShow="2"></wx-authorize>

	</div>
</template>

<script>
	import wxAuthorize from '../../public/wx/wxPublicDialog'; //授权弹框
	import { Toast } from 'mint-ui';	
	import { Indicator } from 'mint-ui';    //引入加载中组件	
	import jiami from 'js-base64';
	import wxToast from '../../../common/wx/wxToast';	//引入toast提示
	import getData from '../../../common/router/getData';		//引入发送请求
	import verify from '../../../common/wx/verification';	//引入表单验证
	import inputTip from '../../public/wx/wxInputTip';	//引入报错组件
	import cheakImg from '../../public/wx/wxCheakImg';	//引入图片Cheak
	export default {
		mixins: [wxToast,getData,verify],
		data(){
			return {
				typeShow1:false,   // 清楚按钮判断当有焦点和有内容同时成立才显示
				typeShow2:false,   // 清楚按钮判断当有焦点和有内容同时成立才显示
				typeShow3:false,   // 清楚按钮判断当有焦点和有内容同时成立才显示
				popUpBox:0,  //0、遮罩  1、弹窗1  2、弹窗2
				reeorText:'',   // 验证码弹框的提示语句
                inviteBox:false,   // 填写邀请人输入框
                Group:'https://aliyunsso.edspay.com/web/wx/login/login_1/Group1.png?v=1.0',
                examineIcon:'https://aliyunsso.edspay.com/web/wx/login/login_1/close_eye.png?v=1.0',  // 查看密码icon
                className1:false,   // 控制占位符得动画样式
                className2:false,   // 控制占位符得动画样式
                typeVal:'password',  // 密码输入框类型
                labelTxt1:'请输入短信验证码',  // 输入框提示语1
                labelTxt2:'设置8-16个字母与数字的组合密码', // 输入框提示语2
                codeTS:false,  // 图形验证码错误提示
				btnText:'获取验证码',
				time:60,
				showBtn:true,
				imgSrc:'https://aliyunsso.edspay.com/web/wx/login/sel1.png',
				inputActive:{	//控制焦点效果
					phone:false,  // 手机号码
					Pcode:false,  // 短信验证码
					pwd:false,    // 密码
					code:false,   // 图形验证码
					invite:false, // 邀请手机号码
				},
				logoMsg:'注册',
				tipShow:false,
				errorMsg:'',	//提示文字
				userPhone:'',  // 手机号和用户名
				message:'',    // 短信验证码
				password:'',   // 密码
				validCode:'',  // 用户输入的图形验证码
				inviteName:'', // 邀请人
                messPhone:'',
                captchaId:'',  // 图形验证码ID
				lasturl:'',	//上个页面的Url
				isImg:{
					isCheak:true	//是否勾选
				},
				fullPath:'', //入口页面的路由
				doRegisterData:{},//注册数据
				fanliData: {},//返利数据
				evaluation:{   // 授权成功的弹框
					isShow: false,
				},
				evaluationText1:'您已成功绑定账户',  //授权成功的弹框提示
				evaluationBtn: '去出借',
				sOpenId: '',
			}
		},
		methods:{
			toLongin(){
				if(this.$route.query.thisUrl == '/wxLogin'){
					this.$router.push({path:this.$route.query.allUrl})
				}else this.$router.push('/wxLogin');
			},
			evaluationFun(){    // 跳转出借页面
				this.$router.replace('/wxInvest');
			},
            inviteFn(){  // 填写邀请码icon
                this.inviteBox = !this.inviteBox;
                if(this.inviteBox == false){
                    this.Group = 'https://aliyunsso.edspay.com/web/wx/login/login_1/Group1.png?v=1.0';
                } else {
                    this.Group = 'https://aliyunsso.edspay.com/web/wx/login/login_1/Group2.png?v=1.0';
                }
            },
			// 添加获取焦点效果
			inputFocus(nameInput){
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
                this.inputActive[nameInput] = true;
                if(nameInput == "Pcode"){
                    this.className1 = true;
					this.labelTxt1 = "短信验证码";
					this.typeShow1 = true;
                } else {
					this.typeShow1 = false;
				}
                if(nameInput == "pwd"){
                    this.className2 = true;
					this.labelTxt2 = "登录密码";
					this.typeShow2 = true;
                } else {
					this.typeShow2 = false;
				}
				if(nameInput == 'invite') {
					this.typeShow3 = true;
				} else {
					this.typeShow3 = false;
				}
            },
            inputBlur1(){   // 失去焦点事件
                if(!this.message){
                   this.className1 = false;
                   this.labelTxt1 = "请输入短信验证码";
				}
				setTimeout(() => {this.typeShow1 = false;},100)			
			},
			inputBlur2(){   // 失去焦点事件				
                if(!this.password){
                   this.className2 = false;
                   this.labelTxt2 = "设置8-16个字母与数字的组合密码";
				}
				setTimeout(() => {this.typeShow2 = false;},100)				
			},
			inputBlur3(){   // 失去焦点事件
				setTimeout(() => {this.typeShow3 = false;},100)				
			},
			clickFun(){   // 点击发送验证码事件
			    this.validCode = '';
				this.popUpBox = 1;
				this.change();
			},
            changePassTyp(){
               if(this.typeVal == "password"){
                    this.examineIcon = 'https://aliyunsso.edspay.com/web/wx/login/login_1/open_eye.png?v=1.0';
                    this.typeVal = "text";
               } else {
                    this.examineIcon = 'https://aliyunsso.edspay.com/web/wx/login/login_1/close_eye.png?v=1.0';
                    this.typeVal = "password";
               }
            },
            clearValue(n){   // 点击清空事件
                if(n == 1){
                   this.message = '';
                   $("#message").focus();
                } else if(n == 2){
                   this.password = '';
                   $("#password").focus();
                } else if(n == 3){
                   this.inviteName = '';
                   $("#inviteName").focus();
                }
            },
            // 图形验证码点击确定事件
            verificationFn(){
                let that = this;
                if(this.isEmpty(this.validCode,'请输入验证码！',1)) return
                this.notLogPost('/app/user/doJudgeCode',(data) => {
                    if (data.resCode == 1) {
                        this.popUpBox = 0; 
                        this.toast({text:data.resMsg});
                        codeSuc()
                    } else {
						this.validCode = '';
                        this.change();
						this.codeTS = true;
						this.reeorText = data.resMsg;
                    }
                },{
                    phone:this.userPhone,   // 电话号码
                    captchaId:this.captchaId,  // 图形验证码id
                    validCode:this.validCode   // 用户输入验证码
                })

                function codeSuc(){   // 倒计时
                    that.showBtn = false;
                    let timer = window.setInterval(function(){
                    if((that.time--) <= 0) {
                        that.time = 60;
                        that.showBtn = true;
                        that.btnText = '重新获取';
                        that.change();
                        window.clearInterval(timer);
                    }
                },1000)
                }
            },
            sendCoures(){   // 短信正在发送中的事件
                this.toast({text:"短信验证码正在发送中，请耐心等待！",time:2000})
            },
            cancel(){   // 点击取消事件
               this.popUpBox = 0;
               this.validCode = '';
               this.codeTS = false;
            },
			toNext(){
				if(this.isEmpty(this.userPhone,'手机号不能为空！')) return;
			    if(this.isFormat(this.userPhone,'手机号格式不正确！','mobileReg')) return;

          		if(this.isEmpty(this.validCode,'请输入验证码！')) return;
          		if(this.isEmpty(this.message,'请输入短信验证码！')) return;

			},
            // 原来接口
			// code:that.message,    用户ID
			// pwd:that.password,    密码
			// tokenId:this.fingerprint,   
			// mobilePhone:that.messPhone,  用户名和手机号
			// inviteMobilePhone:this.inviteName,   邀请人
			// source:5     注册来源

            // 新接口 
			// phone   电话号码
			// smsCode 短信验证码
			// pwd    密码
			// channel  渠道  传空
			// inviter  邀请人号码
			// inviteMobilePhone  邀请人
            // mobileType  注册来源 
			// 登录正则判断 与发生请求
			emergencysub:function () {
      			var that = this;		    
          		if(this.isEmpty(that.message,'手机验证码不能为空！',1)) return
          		if(this.isEmpty(that.password,'请输入8-16位字符，其中包括至少一个字母和一个数字！',1)) return
				if(this.isFormat(that.password,'密码格式错误，请重新输入！','passwordReg',1)) return;
				  
			    // if(!this.isImg.isCheak){
				// 	that.toast({text:'请勾选服务协议条款'});
				// 	return;
				// }
			    Indicator.open();	//加载中
				//发送注册请求
				let inviterId;
				if(that.inviteName == '' && that.$route.query.ui){
					inviterId = Base64.encode(that.$route.query.ui);
				}else{
					inviterId = that.inviteName
				}
				if(this.$route.query.tc){
					this.doRegisterData = {   // 返利数据
						phone:that.userPhone,
						smsCode:that.message,
						pwd:that.password,
						inviter:inviterId,
						inviteMobilePhone:inviterId,
						mobileType:5,
						uid:that.fanliData.uid,
						target_url:that.fanliData.target_url,
						tc:that.fanliData.tc,
						tracking_id:that.fanliData.tracking_id,
						action_time:that.fanliData.action_time,
						flCode:that.fanliData.code,
						tokenId: that.fingerprint,
					}
				}else{
					this.doRegisterData = {   // 没有返利数据
						phone:that.userPhone,
						smsCode:that.message,
						pwd:that.password,
						inviter:inviterId,
						inviteMobilePhone:inviterId,
						mobileType:5,
						channel: that.$route.query.channel ? that.$route.query.channel:'',
						tokenId: that.fingerprint,
					}
				}

			    this.$http.post(that.ajaxUrl.getUrl(1)+'/app/user/userRegister',this.doRegisterData,{emulateJSON: true})
      			.then((res) => {   
      				Indicator.close();
      				if(res.body.resCode == 1){
						  this.$http.post(that.ajaxUrl.getUrl(2)+'/user/doLogin',{userName:that.userPhone,pwd:that.password,sOpenId: that.sOpenId,tokenId: that.fingerprint}).then((res) => {
							  if(res.body.resCode == 1){
								    that.setCookie('userToken',res.body.resData.token,(1000 * 60 * 10))
									that.setCookie('zsOpenStatus',res.body.resData.zsOpenStatus)
									that.setCookie('userId',res.body.resData.user.userId,(1000 * 60 * 10))
									that.setCookie('nickname',res.body.resData.user.userName,(1000 * 60 * 10))
									that.setCookie('userName',that.userPhone);   // 设置cookie得手机号和用户名
									if(that.$route.query.authorization == 1){
										that.evaluation.isShow = true;
									}else{
										that.$router.replace({  // 注册成功跳转成功页面
										path:'/wxRegisterSucc',
										query:{
											phone:that.userPhone,
											thisUrl:that.lastUrl,
											allUrl:that.$route.fullPath,
											fullPath:that.fullPath   // 入口页的路由
										}});
									}
							   } else {
								   that.toast({text:res.body.resMsg,time:2000});
							   }
						  })
						  
      				}else{
      					that.change();
			        	// that.popModal({str: res.body.resMsg});
						that.toast({text:res.body.resMsg,time:2000});
      				}
			    }, (response) => {
			        // 响应错误回调
			        that.change();
			    });
			    
      		}
		},
		components:{
			inputTip,
			cheakImg,
			wxAuthorize
		},
		created(){
			this.change()
			if(this.$route.query.thisUrl)  this.lastUrl = this.$route.query.thisUrl;        
			if(this.$route.query.sOpenId)  this.sOpenId = this.$route.query.sOpenId;        
			this.userPhone = this.$route.query.userPhone;   //获取上个页面连接带过来的电话号码参数
			this.fullPath = this.$route.query.fullPath;   // //入口页面的路由
			if(this.$route.query.tc){
				this.fanliData = this.$route.query;
			}
		},
		mounted(){
			this.$route.query.fullPath = this.fullPath;//入口页地址
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#wx-login').height(height);
        },
        watch:{
        //    'validCode'(){  // 监听验证码输入框的变化
        //        if (this.validCode == '') {
        //            this.codeTS = false;
        //        }
        //    }
        }
	}
</script>

<style lang="scss" scoped>

	#wx-login{
		background:#fff;
		overflow: hidden;
		.agreement{
			margin-top: .4rem;
            text-align: center;
		}
		.xieyi {
			font-size: .293333rem;
			color: #333;
			
			span {
				color: #508cee;
			}
		}
		.bdr-b{
			color:#E5E5E5;
		}
		.top{
			height:1.333333rem;
			text-align: center;
			position: relative;
			img{height:.666667rem;width:.666667rem;position: absolute;top:0.35rem; left:0.533333rem;}
			span{
				color:#B8B8B8;
				font-size:.453333rem;
				line-height:1.333rem;
				color:#333;
			}
			em{float: right;line-height:1.333333rem;font-size:0.373333rem;padding-right: 0.4rem;color:#B8B8B8;}
		}
		.img{
			display:block;
			height:1.333333rem;
			width:1.333333rem;
			margin:0.773333rem auto 1.24rem;
		}
		.form{
			padding:1.44rem 1.066667rem 0;
			.log-input{
				position:relative;
				height:1.413333rem;
				margin-bottom: .333333rem;
			}
            .clear_icon{
				width: .533333rem;
				height: .533333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0) no-repeat;
				background-size: cover; 
				position: absolute;
				top: .54rem;
			}
            .clear_icon.mes{
                right:3.2rem;
            }
            .clear_icon.pasw{
                right:1.2rem;
            }
            .clear_icon.inv{
                right:0rem;
            }
            .examine_icon{
				width: .533333rem;
				height: .533333rem;
				background-size: cover!important; 
				position: absolute;
				top: .54rem;
				right: 0;
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
			label{
				position: absolute;
				top: .6rem;
				left: 0;
				line-height: .346667rem;
				-webkit-transition: .6s;
				-ms-transition: .6s;
				-o-transition: .6s;
				-moz-transition: .6s;
				transition: .6s;
				font-size: .346667rem;
				color: #808080;
			}
			.labels{
				font-size: .293333rem;
				top:0;
				-webkit-transition: .6s;
				-ms-transition: .6s;
				-o-transition: .6s;
				-moz-transition: .6s;
				transition: .6s;
			}
            ::-webkit-input-placeholder { /* WebKit browsers */ 
					font-size: .346667rem;
				} 
				:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
					font-size: .346667rem;
				} 
				::-moz-placeholder { /* Mozilla Firefox 19+ */ 
					font-size: .346667rem;
				} 
				:-ms-input-placeholder { /* Internet Explorer 10+ */ 
					font-size: .346667rem;
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
                top: .45rem;
                left: 5.2rem;
				height:0.666667rem;
				width:1px;
			}
			.bor-r{border-right:1px solid #E5E5E5;}
			.input-code{
				width:80%;
				float: left;
			}
			.input-message{
				width:50%;
				float: left;
			}
			.message{
				color:#508CEE;
				font-size:.4rem;
				padding-right: 0.266667rem;
				position: absolute;
				right: 0;
				top: .5rem;
			}
            .message.second{
                color: #aeaeae;
            }
            p{
               font-size: .32rem; 
               color: #508CEE;
               margin: .453333rem 0 0 0;
               background-repeat: no-repeat!important;
               background-size:.48rem .48rem!important;
               background-position: 2.5rem center!important; 
            }
		}
		.btn{
			width: 7.866667rem;
			height: 1.2rem;
			margin: .4rem auto 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/login_button.png?v=1.0) no-repeat;
			background-size: cover; 
			text-align: center;
			line-height: 1.2rem;
			font-size: .426667rem;
			color: #fff;
			margin-bottom: .533333rem;
		}
		.isGray{
			background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/login_null_xhdpi.png?v=1.0) no-repeat;
			background-size: cover; 
		}
        .mark_box{
			width: 100%;
			height: 100%;
		    background: #000;
			opacity: .5;
			z-index: 99;
			position: fixed;
			left: 0; top: 0;
			right: 0; bottom: 0;
			margin: auto;

		}
		.hint_pop{   // 弹窗样式
               width: 7.493333rem;
			   height: 5.733333rem;
			   position: fixed;
			   top: 0;left: 0;
			   bottom: 0; right: 0;
			   margin: auto;
			   background:#fff;
			   border-radius: .266667rem;
			   z-index: 100;
			   font-family: PingFangSC-Regular;
			   .hint_top{
				   width: 100%;
				   height: 1.2rem;
				   border-top-left-radius: .266667rem;
				   border-top-right-radius: .266667rem;
				   background: #F3F3F3;
				   line-height: 1.2rem;
				   text-align: center;
				   font-size: .4rem;
				   color: #333;
			   }
				.input_box{
				    width: 6.666667rem;
					height: 1.173333rem;
					border: 1px solid #c8c7cc;
					border-radius: .106667rem;
					margin: .733333rem auto .093333rem auto;
					.input_code{
						width: 55%;
						height: 100%;
						padding-left: .2rem;
						font-size: .426667rem;
					}
					img{
						height: 100%;
						margin-right: .1rem;
					}
				}
                p{
                    text-align: center;
                    font-size: .373333rem;
                    color: #333;
                    margin: .986667rem .5rem;
                }
				h3.ts{
                    font-size: .293333rem;
					color: #ff5b4c;
					padding: 0 .413333rem 0 .8rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/jinggao.png) no-repeat .413333rem center;
					background-size: .293333rem .293333rem ;
				}
				.btn1,.btn2{
					width: 2.986667rem;
					height: .96rem;
					border-radius: .106667rem;
					position: absolute;
					bottom: .52rem;
					font-size: .426667rem;
					line-height: .96rem;
					text-align: center;
				}
				.btn1{
					border: 1px solid #FF5B4C;
					color: #FF5B4C;
					left: .426667rem;
				}
				.btn2{
					background: #FF5B4C;
					color: #fff;
					right: .426667rem;
				}
		}
	}
</style>
