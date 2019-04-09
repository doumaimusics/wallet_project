<template>
	<div id="wx-login">
		<!--  $route.query.authorization == 1 为服务号授权登录状态码 -->
		<div v-title v-if="$route.query.authorization == 1">绑定账户</div>
		<div v-title v-else>快速注册</div>
		<div class="form">
			<div class="log-input bdr-b">
				<label for="" :class="{labels:className1}">{{labelText}}</label>
				<input @focus="inputFocus('phone')" v-model="userPhone" type="tel" class="input" maxlength="11"  name="userPhone" id="userPhone" autocomplete="off"
				@blur="inputBlur('userPhone')"
                @input="onKeyUp"
				>
				<div class="clear_icon" v-if="(userPhone && typeShow == true)" @click="clearValue(1)"></div>
			</div>			
		</div>
		<!--  && validCode && message -->
		<div @click="emergencysub"   :class="{isGray:!(userPhone)}" class="btn">下一步</div>
		<!-- 已有账号登录 -->
		<div class="login_btn_box">
			<p  v-if="$route.query.authorization != 1">已有帐号?<span @click="toLongin">登录</span></p>
		</div>
		<!-- 已注册手机号弹框 -->
		<div class="hint_pop" v-if="popUpBox == 1">
            <h3 class="hint_top">温馨提示</h3>
			<p>亲！此手机号码已注册，请直接登录。</p>
			<div class="btn1" @click="popUpBox = 0">取消</div>
			<div class="btn2" @click="toLongin">登录</div>
		</div>
		<!--遮罩-->
		<div class="mark_box" v-if="popUpBox"></div>
		
	</div>
</template>

<script>
	
	import { Toast } from 'mint-ui';	
	import { Indicator } from 'mint-ui';    //引入加载中组件	

	import wxToast from '../../../common/wx/wxToast';	//引入toast提示
	import verify from '../../../common/wx/verification';	//引入表单验证
	import inputTip from '../../public/wx/wxInputTip';	//引入报错组件
	export default {
		mixins: [wxToast,verify],
		data(){
			return {
				typeShow:false,   // 清楚按钮判断当有焦点和有内容同时成立才显示
				popUpBox:0,  // 0、遮罩 1、已注册手机号弹窗
                className1:false,   // 控制占位符得动画样式
                labelText:'请输入手机号码',
				inputActive:{	//控制焦点效果
					phone:false,
				},
				errorMsg:'',	//提示文字
				userPhone:'',
				message:'',
				messPhone:'',
				lasturl:'',	//上个页面的Url
				fullPath:'',  // 入口页面的路由
				urls:'',
				inviterId:''
			}
		},
		methods:{
			toLongin(){   // 跳转登录
				if(this.$route.query.thisUrl == '/wxLogin'){
                    this.$router.push({path:this.$route.query.allUrl});
				}else this.$router.push({path:'/wxLogin', query: this.$route.query});
            },
            onKeyUp(){  // 输入手机号优化
                var self = this;
                self.userPhone=self.userPhone.replace(/[^\d]/g,'');
            },
			// 添加获取焦点效果
			inputFocus(nameInput){
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
				this.inputActive[nameInput] = true;
				if(nameInput == "phone"){
                    this.className1 = true;
					this.labelText = "手机号码";
					this.typeShow = true;
				} else {
                    this.typeShow = false;
				}
			},
			inputBlur(val){   // 失去焦点事件
               if(!this.userPhone){
                   this.className1 = false;
                   this.labelText = "请输入手机号码";
			   }
			   setTimeout(()=>{this.typeShow = false;},100)
			},
			clearValue(n){   //点击清空内容
                  if(n == 1){
					  this.userPhone = '';
					  $('#userPhone').focus();
				  }
			},
			// 下一步按钮事件
			emergencysub:function () {
				  var that = this;
				  this.$route.query.userPhone = this.userPhone;
				  this.$route.query.fullPath = this.fullPath;
				  this.$route.query.inviterId = this.inviterId;
                 if(that.userPhone == ''){
                    return;
				 } else {
                    if(this.isFormat(that.userPhone,'请输入正确手机号！','mobileReg',1)) return;
                    this.notLogPost('/app/user/doJudgePhone',(data) => {
                        if(data.resCode == 1){  // 未注册
                            this.$router.replace({   //跳转注册设置页面
                                path:'/wxRegisterSet',
                                query:this.$route.query
                            })
                        } else { // 已经注册状态
                            this.popUpBox = 1;
                            this.setCookie('userName',that.userPhone);  // 通过cookie把手机号带过登录页面
                        }
                    },{phone:this.userPhone})
				 }
          		
			    
      		}
		},
		components:{
			inputTip
		},
		 beforeRouteEnter: (to, from, next) => { //获取当前页面路由
				next(vm => {                 // vm相当于this
					vm.urls = from.urls;
					if(vm.$route.query.fullPath){    //  当有入口页面
						vm.fullPath = vm.$route.query.fullPath;   // 入口页面路由
					} else {   // 如果没有入口页自动获取
						vm.fullPath = from.fullPath;
					}
				}
            )
        },
		created(){
			if(this.$route.query.thisUrl)  this.lastUrl = this.$route.query.thisUrl;
			if(this.$route.query.ui) this.inviterId = Base64.encode(this.$route.query.ui);	//获取邀请人id;
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
            $('#wx-login').height(height)
		}
	}
</script>

<style lang="scss" scoped>

	#wx-login{
		background:#fff;
		overflow: hidden;
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
		.form{
			padding:1.6rem 1.066667rem 0;
            margin-bottom: .933333rem;
			.log-input{
				position:relative;
				height:1.413333rem;
				margin-bottom: .333333rem;
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
			.clear_icon{
				width: .533333rem;
				height: .533333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0) no-repeat;
				background-size: cover; 
				position: absolute;
				top: .6rem;
				right: 0;
			}
		}
		.btn{
			// margin-top:1.066667rem!important;
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
		.login_btn_box{
			padding: 0 1.066667rem;
			text-align: right;
			font-size: .32rem;
			font-family: PongFangSC-Regular;
			p{
				color: #333;
				
				span{
					border: 1px solid #FF6F5D;
					color: #FF3334;
					padding: .093333rem .373333rem;
					margin-left: .133333rem;
                    border-radius: .04rem;
				}
			}
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
			    p{
					font-size: .373333rem;
					color: #333;
					margin: .986667rem .5rem;
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
						padding-left: .3rem;
					}
					img{
						height: 100%;
						margin-right: .1rem;
					}
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