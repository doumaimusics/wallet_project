<!-- 修改密码 -->
<template>
	<div id="wxLogin">
		<div v-title>{{logoMsg}}</div>
		<form action="">
			<div class="content">
				<!-- :class="{inputActive:inputActive.oldPwd}" -->
				<div class="input-box">
					<div class="input-row clear">
						<label for="">原登录密码</label>
						<input @focus="inputFocus('oldPwd')" @blur="inputBlur1" v-model="oldPwd" type="password" class="input" placeholder="请输入原登录密码"  name="oldPwd"
						id="oldPwd" autocomplete="off">	
						<div class="clear_icon" v-if="(oldPwd && clearBtn1 == true)" @click="clearValue(1)"></div>
					</div>
				</div>
				<!-- :class="{inputActive:inputActive.newPwd}" -->
				<div class="input-box">
					<div class="input-row bdr-b clear">
						<label for="">设置新密码</label>
						<input @focus="inputFocus('newPwd')" @blur="inputBlur2" v-model="newPwd" type="password" class="input" placeholder="输入新密码" id="newPwd" maxlength="16" name="newPwd" autocomplete="off">
						<div class="clear_icon" v-if="(newPwd && clearBtn2 == true)" @click="clearValue(2)"></div>
					</div>				
					<!--  :class="{inputActive:inputActive.pwdAgain}" -->
					<div class="input-row clear">
						<label for="">确认新密码</label>
						<input @focus="inputFocus('pwdAgain')" @blur="inputBlur3" v-model="pwdAgain" type="password" class="input input-code" placeholder="请再次输入密码" name="pwdAgain"  autocomplete="off">
						<div class="clear_icon" v-if="(pwdAgain && clearBtn3 == true)" @click="clearValue(3)"></div>
					</div>	
				</div>
			</div>
			<div class="regTips" :class="{tipShow:tipShow}">
				<i class="el-icon-circle-cross"> </i>
				{{errorMsg}}
			</div>
			<div class="loginBtn" :class="{isGray:(oldPwd && newPwd && pwdAgain)}" @click="emergencysub">确认</div>
		</form>
	</div>
</template>

<script>
	import getData from '../../../../common/router/getData';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import toast from '../../../../common/wx/wxToast';	//引入表单验证
	export default {
		mixins: [getData,verify,toast],
		data(){
			return {
				errorMsg:'',
				tipShow:false,
				inputActive:{
					oldPwd:false,
					newPwd:false,
					pwdAgain:false
				},
				logoMsg:'修改登录密码',
				oldPwd:'',
				newPwd:'',
				pwdAgain:'',
				clearBtn1:false,   // 输入框清除按钮，当光标和有内容同时成立才显示
				clearBtn2:false,   // 输入框清除按钮，当光标和有内容同时成立才显示
				clearBtn3:false,   // 输入框清除按钮，当光标和有内容同时成立才显示			
			}
		},
		methods:{
			
			inputFocus(nameInput){			//添加获取焦点效果
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
				this.inputActive[nameInput] = true;
				nameInput === 'oldPwd'? this.clearBtn1 = true:this.clearBtn1 = false; // 输入框清除按钮，当光标和有内容同时成立才显示
				nameInput === 'newPwd'? this.clearBtn2 = true:this.clearBtn2 = false;
				nameInput === 'pwdAgain'? this.clearBtn3 = true:this.clearBtn3 = false;
			},
			inputBlur1(){   // 失去焦点是清除按钮都隐藏
				setTimeout(() => {this.clearBtn1=false;}, 100);
			},
			inputBlur2(){   // 失去焦点是清除按钮都隐藏
				setTimeout(() => {this.clearBtn2=false;}, 100);
			},
			inputBlur3(){   // 失去焦点是清除按钮都隐藏
				setTimeout(() => {this.clearBtn3=false;}, 100);
			},
			clearValue(n){  // 清除输入框内容事件
               if(n==1){
				  this.oldPwd='';
				  $('#oldPwd').focus();
			   } else if(n==2){
				  this.newPwd='';
				  $('#newPwd').focus();
			   } else if(n==3){
				  this.pwdAgain='';
				  $('#pwdAgain').focus();
			   }
			},
			emergencysub:function () {					//登录验证
      			var that = this;
				//   if(this.isEmpty(that.oldPwd,'原密码不能为空！',1)) return
      			// if(this.isFormat(that.oldPwd,'原密码格式错误！','passwordReg',1)) return

      			// if(this.isEmpty(that.newPwd,'新密码不能为空！'),1) return
      			// if(this.isFormat(that.newPwd,'新密码格式错误！','passwordReg',1)) return

      			// if(this.isEmpty(that.pwdAgain,'请再输一次新密码！',1)) return
				
				if(that.oldPwd == '' || that.newPwd =='' || that.pwdAgain==''){
                     return;
				} else {

                    if(this.isFormat(that.newPwd,'设置新密码格式不正确','passwordReg',1)) return;

					if(!(that.newPwd == that.pwdAgain)){
						that.toast({text:'两次新密码输入不一致，请确认！',time:2000,place:'center'})
						return;
					} 	

					if(that.oldPwd == that.pwdAgain){
						that.toast({text:'新密码不能和原密码相同！',time:2000,place:'center'})
						return;
					}
					console.log(3984)
					this.postData('/user/modify/pwd',function(res){
						console.log(res)
						if(res.body.resCode == 1){
							that.toast({text:'修改成功',place:'center'})
							that.$router.push('/wxMyAccount/wxSafe')
						}
						else{
							that.toast({text:res.body.resMsg,time:2000,place:'center'})
						}
					},{pwd:this.oldPwd,newPwd:this.newPwd,confirmNewPwd:this.pwdAgain,})	
				}	    
      		}
		},
		components:{
			
		}
	}
</script>

<style lang="scss" scoped>

	.el-icon-circle-cross{
		color:#ff5a4a;
	}
	#wxLogin{
		.loginLogo{
			width: 40%;
		    margin: 0.8rem auto;
		    display: block;
		}
		form{
			position:relative;
			padding-top: .533333rem;
			font-family: PingFangSC-Regular;
			
			.regTips{
				position:absolute;
				bottom:0.88rem;
				left:5%;
				padding-left: 0.266667rem;
				line-height: 0.906667rem;
				width:90%;
				margin:0 auto;
				margin-top: -0.426667rem;
				margin-bottom: 0.4rem;
				border: 1px solid #ffd8d9;
	    		background-color: #fcebec;
	    		border-radius:0.133333rem;
	    		font-size:0.4rem;
	    		display:none;
			}
			.tipShow{
				display:block;
			}
			.input-box{
			  padding-left: .4rem;
			  background: #fff;
			  margin-bottom: .533333rem;
			}
			.input-row{
				box-sizing:border-box;
				width:100%;
				height: 1.466667rem;
				position: relative;
				label{
					width: 25%;
					height: 100%;
					float: left;
					line-height: 1.466667rem;
					font-size: .346667rem;
					color: #333;
				}
				input{
					float:left;
					width: 65%;
					height: 100%;
				    font-size: 0.373333rem;
				    line-height:0.693333rem;
				}
				.clear_icon{
					width: .533333rem;
					height: .533333rem;
					background: url('https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0') no-repeat;
					background-size: cover; 
					position: absolute;
					top: 0;
					bottom: 0;
					right: .3rem;
					margin: auto;
				}
				.inputActive{
					input{
						border:1px solid rgb(255,90,74);
					}
				}
				.input-code{
					width:50%;
				}
				.valicode_img{
					width: 1.333333rem;
					height:0.64rem;
				}	
			}
			.border-xian{
				position: relative;
			}		
			.inputActive{
				border:1px solid rgb(255,90,74);
			}
			.link{
				width:90%;
				margin: 0 auto;
				a{
					color:#FF5857;
					font-size:0.32rem;
					line-height:0.48rem;
					float:left;
				}
				.getpwdLink{
					float:right;
				}
			}
			.loginBtn{
				width:8.773333rem;
				display:block;
				margin:0 auto;
				background:url('https://aliyunsso.edspay.com/web/wx/account/btn_bg1.png?v=1.0') no-repeat;
				background-size: 8.773333rem 1.066667rem;
				font-size: 0.426667rem;
				height:1.066667rem;
				text-align: center;
				line-height:1.066667rem;
				border-radius:4px;
				color:#fff;
				margin-top:.933333rem;
			}
			.isGray{
				background:url('https://aliyunsso.edspay.com/web/wx/account/btn_bg2.png?v=1.0') no-repeat;
				background-size: 8.773333rem 1.066667rem;
			}
		}
	}
</style>