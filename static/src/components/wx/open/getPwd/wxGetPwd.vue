<template>
	<div id="wxPhone">
		<div v-title>忘记密码</div>
		<div class="form">
			<div class="log-input bdr-b">
				<input @focus="inputFocus('phone')" v-model="userPhone" type="tel" class="input" maxlength="11" placeholder="请输入手机号码"  name="userPhone" id="userPhone" autocomplete="off"
				@blur="inputBlur1"
				@input="onKeyUp"
				>
				<div class="clear_icon" v-if="(userPhone && typeShow1 == true)" @click="clearValue(1)"></div>
			</div>
			<div class="log-input bdr-b">
				<input @focus="inputFocus('Pcode')" v-model="message" type="number" class="input-message" placeholder="手机验证码"  name="message" id="message" autocomplete="off"
				@blur="inputBlur2"
				onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode) ) )'
				>	
				<div class="clear_icon mes" v-if="(message && typeShow2 == true)" @click="clearValue(2)"></div>
				<div class="line fl bdr-r"></div>
				<div class="message fr" v-if="showBtn" @click="send">{{btnText}}</div>
				<div class="message fr" v-else @click="sendCoures">{{time}}秒后重发</div>
			</div>
		</div>
		<!--  && validCode -->
		<div  @click="emergencysub" :class="{isGray:!(userPhone && message)}" class="btn">下一步</div>
	</div>
</template>

<script>
	import verify from '../../../../common/wx/verification';	//引入表单验证
	export default {
		mixins:[verify],
		data(){
			return {
				typeShow1:false,// 清除按钮判断当有焦点和有内容同时成立才显示
				typeShow2:false,	// 清除按钮判断当有焦点和有内容同时成立才显示			
				logoMsg:'找回登录密码',
				tipShow:false,
				time:60,
				showBtn:true,
				btnText:'获取验证码',
				errorMsg:'',
				userPhone:'',
				validCode:'',
				message:'',
				valideToken:'',
				inputActive:{
					phone:false
					// validCode:false
				}
			}
		},
		methods:{
			// 添加获取焦点效果
			inputFocus(nameInput){
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
				this.inputActive[nameInput] = true;
				if(nameInput == "phone"){
					this.typeShow1 = true;
				} else {
					this.typeShow1 = false;
				}

				if(nameInput == "Pcode"){
					this.typeShow2 = true;
				} else {
					this.typeShow2 = false;
				}
			},
			inputBlur1(){   // 失去焦点事件
			   setTimeout(() => {this.typeShow1 = false;}, 100);
			},
			inputBlur2(){   // 失去焦点事件
				setTimeout(() => {this.typeShow2 = false;}, 100);
			},
			clearValue(n){  // 点击清空内容
                if(n == 1){
					this.userPhone = "";
                    $("#userPhone").focus();
				} else if(n == 2){
					this.message = "";
					$("#message").focus();
				}
			},
			onKeyUp(){  // 输入手机号优化
                var self = this;
                self.userPhone=self.userPhone.replace(/[^\d]/g,'');
            },
			send(){	//重新获取
				let that = this;
				if(this.isEmpty(that.userPhone,'请输入手机号！',1)) return;
			    if(this.isFormat(that.userPhone,'请输入正确手机号码！','mobileReg',1)) return;

				  // // if(this.isEmpty(this.validCode,'请输入图片验证码')) return;
				
				this.notLogPost('/user/getpwd',(data) =>{
          			if(data.resCode){   
						that.valideToken = data.resData.valideToken;
						that.toast({  // 发送成功
							text:data.resMsg,
							time:2000,
							place:'center'
						});
							codeSuc();   // 发送验证码倒计时调用
	    				// that.$router.push({path:'/wxGetMessage',query:{phone:that.userPhone,captchaId:that.captchaId,valideToken:that.valideToken}})
					  } else {  // 信息不对的时候
						  that.toast({
							text:data.resMsg,
							time:2000,
							place:'center'
							});
					  }
					//   ,validCode:this.validCode
          		},{captchaId:this.captchaId,getType:2,step:1,mobilePhone:this.userPhone})

			    function codeSuc(){ //发送验证码倒计时
			    	that.showBtn = false;
			    	// that.toast({text:'发送成功',position:'top'})
					let timer = window.setInterval(function(){
						if((that.time--) <= 0) {
							that.time = 60;
							that.showBtn = true;
							that.btnText = '重新获取';
							window.clearInterval(timer);
						}
					},1000)
			    }
			},
			sendCoures(){   // 短信正在发送中的事件
                this.toast({text:"短信验证码正在发送中，请耐心等待！",time:2000})
			},
			emergencysub(){
				var that = this;
				// this.$route.query.valideToken = this.valideToken;
				this.$route.query.userPhone = this.userPhone;
				// userPhone:'',
				// message:'',
				if (that.userPhone == '' || that.message == '') {
					return;
				} else {
					//  if(this.isEmpty(that.userName,'用户名不能为空！'))	return;  // 空状态
					// if(this.isEmpty(that.userPhone,'请输入手机号'))
					this.notLogPost('/user/getpwd',(data) => {
						if(data.resCode){
							this.$route.query.valideToken = data.resData.valideToken;
							this.$router.replace({
								path:'/wxSetPwd',
							    query:this.$route.query})
						} else {
							this.toast({text:data.resMsg,time:2000})
						}
					},{mobilePhone:this.userPhone,code:this.message,getType:2,step:2})
				}
				
			}
		},
		components:{
			// inputTip
		},
		created(){
			// this.change();
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			$('#wxPhone').height(height)
		}
	}
</script>

<style lang="scss" scoped>
	.el-icon-circle-cross{
		color:#ff5a4a;
	}
	#wxPhone{
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
				color:#333;
				font-size:0.426667rem;
				line-height:1.333rem;
			}
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
			.clear_icon{
				width: .533333rem;
				height: .533333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0) no-repeat;
				background-size: cover; 
				position: absolute;
				top: .68rem;
				right: 0;
			}
			.clear_icon.mes{
                right: 2.8rem;
			}
			input{
				height:1.066667rem;
				font-size:.72rem;
				color: #333;
				width:90%;
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
				margin-left: 1rem;
			}
			.bor-r{border-right:1px solid #E5E5E5;}
			.input-code{
				width:65%;
				float: left;
			}
			.input-message{
				width:55%;
				float: left;
			}
			.message{
				color:#508CEE;
				font-size:.4rem;
				padding-right: 0.266667rem;
				margin-top: .2rem;
			}
			.message.second{
                color: #AEAEAE;
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
	}
</style>