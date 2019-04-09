<template>
	<div id="wxSetpwd">
		<div v-title>重置登录密码</div>
		<div v-if="setPwdSuccess">
			<div class="form">
				<div class="log-input bdr-b">
					<input @focus="inputFocus('pwd')" @blur="inputBlur" v-model="password" :type="typeVal" class="input" placeholder="设置8-16个字母与数字的组合密码" id="password" maxlength="16" name="password" autocomplete="off">	
					<div class="clear_icon" v-if="(password && typeShow == true)" @click="clearValue"></div>
					<div class="examine_icon" @click.stop="changePassTyp" :style="{background:'url('+examineIcon+')'}"></div>
				</div>
			</div>
			<div @click="emergencysub"  :class="{isGray:!(password)}" class="btn">提交</div>
			<input-tip v-if="tipShow" :errorMsg="errorMsg"></input-tip>
		</div>
		<div v-else class="success">
			<img src="https://aliyunsso.edspay.com/web/wx/success.gif" alt="">
			<!-- <div class="text">恭喜您，账户{{userPhone}}重置密码成功！</div> -->
			<div class="text">设置密码成功！</div>
			<p><span>{{goTime}}</span>秒后进入登录页面</p>
			<!-- <router-link to="/wxlogin" class="btn" tag="div" replace>马上登陆</router-link> -->
		</div>
		
		<!-- 返回时得提示框 -->
		<div class="hint_pop" v-if="popBox == 1">
			<h3 class="hint_top">温馨提示</h3>
			<p>亲！还差一步密码就回来了。</p>
			<div class="btn1" @click="$router.go(-1)">不找了</div>
			<div class="btn2" @click="popBox = 0">继续前行</div>
		</div>
		<!-- 遮罩 -->
		<div class="mark_box" v-if="popBox"></div>
	</div>
</template>

<script>
	import wxToast from '../../../../common/wx/wxToast';	//引入toast提示
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import inputTip from '../../../public/wx/wxInputTip';	//引入报错组件
	import { Button } from 'mint-ui';
	export default {
		mixins:[wxToast,verify],
		data(){
			return {
				typeShow:false,//清除按钮判断当有焦点和有内容同时成立才显示
				popBox:0,   // 0 遮罩  1 返回时得提示框
				examineIcon:'https://aliyunsso.edspay.com/web/wx/login/login_1/close_eye.png?v=1.0',
				typeVal:'password',   // 密码框得样式
				logoMsg:'重置登录密码',
				goTime:3,   //  修改密码成功的倒计时
				tipShow:false,
				errorMsg:'',
				time:60,
				userPhone:'',
				password:'',
				pwdAgain:'',
				btnText:'重新发送',
				showBtn:true,
				setPwdSuccess:true,		//显示成功
				inputActive:{
					pwd:false
				},
				valideToken:'',
			}
		},
		computed:{
			headerType(){
				if(!this.setPwdSuccess) return 0;
				else return null;
			}
		},
		methods:{
			returnPage(){
				if(!this.setPwdSuccess){
                    this.$router.replace({path:'/wxlogin'})
				} else {
					this.popBox = 1;
				}
				
			},
			// 添加获取焦点效果
			inputFocus(nameInput){
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
				this.inputActive[nameInput] = true;
				if(nameInput == 'pwd'){
					this.typeShow = true
				}
			},
			inputBlur(value){   // 失去焦点
				// this.popModal({ str:'sdfsdf' })
				setTimeout(()=>{this.typeShow = false;},100)
				
			},
			clearValue(){
				this.password = '';
				$('#password').focus();
			},
			changePassTyp(){
                if(this.typeVal === "password"){
					this.examineIcon = 'https://aliyunsso.edspay.com/web/wx/login/login_1/open_eye.png?v=1.0';
					this.typeVal = "text";
				} else {
					this.examineIcon = 'https://aliyunsso.edspay.com/web/wx/login/login_1/close_eye.png?v=1.0';
					this.typeVal = "password";
				}
			},
			emergencysub(){
				var that = this;
                if(that.password == ''){
                    return;
				} else {
					// if(this.isEmpty(that.password,'请输入新登录密码！')) return;
					if(this.isFormat(that.password,'设置新密码格式错误，请重新输入！','passwordReg',1)) return;
					//发送请求
					this.notLogPost('/user/getpwd',(data) =>{
						if(data.resCode){
							this.setPwdSuccess = false;
							this.goTimeFn();
							that.setCookie('userName',that.userPhone);   // 设置cookie得手机号和用户名
						}else{
							this.$router.replace({path:'/wxGetPwd',query:this.$route.query})
							this.toast({text:data.resMsg,time:2000})
						}
					},{confirmNewPwd:this.password,pwd:this.password,valideToken:this.valideToken,getType:2,step:3})
				}
				// 224556fd65144fef84f0952c6475cd3f
				// 86a499e7734e49948ff3ea53705ab203
				//224556fd65144fef84f0952c6475cd3f
			},
			goTimeFn(){    // 跳转登录了页面的倒计时
			   let that = this;
               let timer = window.setInterval(function(){
					if((that.goTime--) <= 0) {
						that.goTime = 3;
						that.$router.replace({
							path:'/wxlogin',
							query:that.$route.query
						})
						window.clearInterval(timer);
					}
				},1000)
			},
      		//修改提示信息
      		popModal:function(param){
      			var that = this;
      			that.tipShow=true;
      			that.errorMsg=param.str;

      			setTimeout(function(){
      			    that.tipShow = false;
      			    that.errorMsg = '';
      			}, 3000);
      		}
		},
		components:{
			inputTip
		},
		created(){
			this.userPhone = this.$route.query.userPhone;
			this.valideToken = this.$route.query.valideToken;
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			$('#wxSetpwd').height(height)
		}
	}
</script>

<style lang="scss" scoped>
	#wxSetpwd{
		font-family: PingFangSC-Regular;
		background:#fff;
		overflow: hidden;
		.bdr-b{
			color:#E5E5E5;
		}
		.top{
			height:1.333333rem;
			text-align: center;
			position: relative;
			img{height:.666667rem;width:.666667rem;position: relative;position: absolute; top:0.35rem;left: 0.533333rem;}
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
			margin-bottom: 1.146667rem;
			.log-input{
				position:relative;
				height:1.493333rem;
				padding-top: 0.426667rem;
			}
			input{
				height:1.066667rem;
				width:80%;
				font-size:.72rem;
				line-height:1.066667rem;
				font-family: DIN-Bold;
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
			.examine_icon{
				width: .533333rem;
				height: .533333rem;
				background-size: cover!important; 
				position: absolute;
				top: .72rem;
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
			.input-message{
				width:65%;
				float: left;
			}
			.message{
				color:#808080;
				font-size:0.4rem;
				padding-right: 0.266667rem;
			}
			.clear_icon{
				width: .533333rem;
				height: .533333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0) no-repeat;
				background-size: cover; 
				position: absolute;
				top: .72rem;
				right: .85rem;
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
			margin-bottom: .6rem;
		}
		.isGray{
			background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/login_null_xhdpi.png?v=1.0) no-repeat;
			background-size: cover; 
		}

		.success{
			img{
				width: 100%;
				// height: 5.306667rem;
				display: block;
				margin:2rem 0 1.253333rem 0;
			}
			.text{
			    text-align: center;
			    font-size:.426667rem;
				color: #333;
				margin-bottom: .266667rem; 
			}
			p{
				text-align: center;
				font-size: .373333rem;
				color: #808080;
			}
			// .btn{
			// 	width: 90%;
			// 	background:#ff5b4c;
			//     display: block;
			//     clear: both;
			//     margin: 0.533333rem auto;
			//     text-align: center;
			//     color: #fff;
			//     border-radius: 0.106667rem;
			//     font-size: 0.48rem;
			//     height: 1.066667rem;
			//     line-height:1.066667rem;
			//     -webkit-appearance: none;
			// }
		}
		.hint_pop{
			width: 7.493333rem;
			height: 5.706667rem;
			position: fixed;
			top: 0;left: 0;
			right: 0;bottom: 0;
			margin: auto;
			background: #fff;
			text-align: center;
			border-radius: .266667rem;
			z-index: 100;
			.hint_top{
               border-top-left-radius: .266667rem;
			   border-top-right-radius: .266667rem;
			   height: 1.2rem;
			   width: 100%;
			   color: #333;
			   font-size: .4rem;
			   background: #F3F3F3;
			   line-height: 1.2rem;
			}
			p{
               font-size: .373333rem;
			   color: #333;
			   margin: .986667rem .5rem;
			}
			.btn1,.btn2{
                 width: 2.986667rem;
				 height: .96rem;
				 border-radius: .106667rem;
				 position: absolute;
				 bottom: .52rem;
				 font-size: .426667rem;
				 line-height: .96rem;
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
		.mark_box{
			width: 100%;
			height: 100%;
			background: #000;
			opacity: .5;
			position: fixed;
			top: 0;left: 0;
			right: 0;bottom: 0;
			margin: auto;
			z-index: 99;
		}
	}
</style>