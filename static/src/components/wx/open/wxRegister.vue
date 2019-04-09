<template>
	<div id="wx-login">
		<div class="top">
			<img @click="$router.go(-1)" src="https://aliyunsso.edspay.com/web/wx/login/login_1/close.png" alt="">
			<span>手机号快速注册</span>
			<em @click="toLongin">登录</em>
		</div>
		<div class="form">
			<div class="log-input bdr-b">
				<input @focus="inputFocus('phone')" v-model="userPhone" type="number" class="input" placeholder="请输入您的常用手机号"  name="userPhone" id="userPhone" autocomplete="off">
			</div>
			<div class="log-input bdr-b">
				<input @focus="inputFocus('code')" v-model="validCode" type="text" class="input input-code" placeholder="请输入验证码" name="validCode"  autocomplete="off">
				<div class="line fl bdr-r"></div>
				<img @click="change()" :src="codeImg" class="valicode_img fr">
			</div>
			<div class="log-input bdr-b">
				<input @focus="inputFocus('Pcode')" v-model="message" type="text" class="input-message" placeholder="手机验证码"  name="message" id="message" autocomplete="off">	
				<div class="line fl bdr-r"></div>
				<div class="message fr" v-if="showBtn" @click="send">{{btnText}}</div>
				<div class="message second fr" v-else>{{time}}秒</div>
			</div>
			<div class="log-input bdr-b">
				<input @focus="inputFocus('pwd')" v-model="password" type="password" class="input" placeholder="请输入8-16位字符密码" id="password" maxlength="16" name="password" autocomplete="off">
			</div>
			<div class="log-input bdr-b">
				<input @focus="inputFocus('invite')" v-model="inviteName" type="text" class="input input-code" placeholder="请输入邀请人(选填)" name="inviteName"  autocomplete="off">
			</div>
			
		</div>
		<div @click="emergencysub"  v-btn :class="{isGray:!(userPhone && validCode && message)}" class="btn">下一步</div>
		<input-tip v-if="tipShow" :errorMsg="errorMsg"></input-tip>
		<div class="agreement">
			<cheak-img :cheak="isImg" class="ic_1"></cheak-img>
			<p class="xieyi">我已阅读并同意<router-link :to="{path:'/wxRegisterAgreement'}" id="service_contract" tag="span">《E都市钱包注册服务协议》</router-link></p>
		</div>
	</div>
</template>

<script>
	
	import { Toast } from 'mint-ui';	
	import { Indicator } from 'mint-ui';    //引入加载中组件	

	import wxToast from '../../../common/wx/wxToast';	//引入toast提示
	import getData from '../../../common/router/getData';		//引入发送请求
	import verify from '../../../common/wx/verification';	//引入表单验证
	import inputTip from '../../public/wx/wxInputTip';	//引入报错组件
	import cheakImg from '../../public/wx/wxCheakImg';	//引入图片Cheak
	export default {
		mixins: [wxToast,getData,verify],
		data(){
			return {
				btnText:'获取验证码',
				time:60,
				showBtn:true,
				imgSrc:'https://aliyunsso.edspay.com/web/wx/login/sel1.png',
				inputActive:{	//控制焦点效果
					phone:false,
					Pcode:false,
					pwd:false,
					code:false,
					invite:false,
				},
				logoMsg:'注册',
				tipShow:false,
				errorMsg:'',	//提示文字
				userPhone:'',
				message:'',
				password:'',
				validCode:'',
				inviteName:'',
				messPhone:'',
				lasturl:'',	//上个页面的Url
				isImg:{
					isCheak:true	//是否勾选
				},
				fanliData:{},//返利网数据
			}
		},
		methods:{
			toLongin(){
				if(this.$route.query.thisUrl == '/wxLogin'){
					this.$router.push({path:this.$route.query.allUrl})
				}else this.$router.push('/wxLogin');
			},
			// 添加获取焦点效果
			inputFocus(nameInput){
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
				this.inputActive[nameInput] = true;
			},
			//获取短信验证码
			send(){	
				let that = this;	
          		if(this.isEmpty(this.userPhone,'手机号不能为空！')) return
			    if(this.isFormat(this.userPhone,'手机号格式不正确！','mobileReg')) return

          		if(this.isEmpty(this.validCode,'请输入验证码！')) return
				this.$http.post(that.ajaxUrl.getUrl(1)+'/user/getPhoneCode',{mobilePhone:that.userPhone,validCode:that.validCode,tokenId:this.fingerprint,captchaId:that.captchaId})
      			.then((res) => {   
      				if(res.body.resCode == 1){
      					that.messPhone = that.userPhone;
      					codeSuc()
      				}else{
      					that.toast({text:res.body.resMsg});
      					this.change();
      				}
      				console.log(res) 
			    }, (response) => {    
			        // 响应错误回调
			    });
			    function codeSuc(){
			    	that.showBtn = false;
			    	that.toast({text:'发送成功',position:'top'})
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
			toNext(){
				if(this.isEmpty(this.userPhone,'手机号不能为空！')) return;
			    if(this.isFormat(this.userPhone,'手机号格式不正确！','mobileReg')) return;

          		if(this.isEmpty(this.validCode,'请输入验证码！')) return;
          		if(this.isEmpty(this.message,'请输入短信验证码！')) return;

			},
			// 登录正则判断 与发生请求
			emergencysub:function () {
      			var that = this;

          		if(this.isEmpty(that.userPhone,'手机号不能为空！')) return
			    if(this.isFormat(that.userPhone,'手机号格式不正确！','mobileReg')) return
			    
          		if(this.isEmpty(that.validCode,'请图片输入验证码！')) return
			    
          		if(this.isEmpty(that.message,'手机验证码不能为空！')) return

          		if(this.isEmpty(that.password,'请输入8-16位字符，其中包括至少一个字母和一个数字！')) return
				  if(this.isFormat(that.password,'密码格式错误！','passwordReg')) return;
				  
			    if(!this.isImg.isCheak){
					that.toast({text:'请勾选服务协议条款'});
					return;
				}
			    Indicator.open();	//加载中
			    //发送注册请求
			    if(this.fanliData.tc){
			    	this.$http.post(that.ajaxUrl.getUrl(1)+'/user/doRegister',{code:that.message,pwd:that.password,tokenId:this.fingerprint,mobilePhone:that.messPhone,inviteMobilePhone:this.inviteName,source:5,  uid:this.fanliData.uid,target_url:this.fanliData.target_url,tc:this.fanliData.tc,tracking_id:this.fanliData.tracking_id,action_time:this.fanliData.action_time,flCode:this.fanliData.code},{emulateJSON: true})
	      			.then((res) => {   
	      				Indicator.close();
	      				console.log(res);
	      				if(res.body.resCode == 1){
	      					that.$router.replace({path:'/wxLogin',query:{phone:that.userPhone,thisUrl:this.lastUrl}});
	      				}else{
	      					that.change();
				        	that.popModal({str: res.body.resMsg});
	      				}
				    }, (response) => {
				        // 响应错误回调
				        that.change();
				    });
			    }else{
			    	this.$http.post(that.ajaxUrl.getUrl(1)+'/user/doRegister',{code:that.message,pwd:that.password,tokenId:this.fingerprint,mobilePhone:that.messPhone,inviteMobilePhone:this.inviteName,source:5},{emulateJSON: true})
	      			.then((res) => {   
	      				Indicator.close();
	      				console.log(res);
	      				if(res.body.resCode == 1){
	      					that.$router.replace({path:'/wxLogin',query:{phone:that.userPhone,thisUrl:this.lastUrl}});
	      				}else{
	      					that.change();
				        	that.popModal({str: res.body.resMsg});
	      				}
				    }, (response) => {
				        // 响应错误回调
				        that.change();
				    });
			    }
			    
			    
      		}
		},
		components:{
			inputTip,
			cheakImg
		},
		created(){
			this.change()
			if(this.$route.query.thisUrl)  this.lastUrl = this.$route.query.thisUrl;
			
			if(this.$route.query.tc){
				this.fanliData = this.$route.query;
			}
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
		.agreement{
			margin-top: .133333rem;
			padding-left: 0.6rem;
			display: flex;
			flex-direction: row;
			align-items: flex-end;
		}
		.xieyi {
			font-size: 0.293333rem;
			color: #A3A3A4;
			padding-left: .066667rem;
			width: 6.706667rem;
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
			img{float: left;height:0.48rem;width:0.48rem;margin:0.35rem 0 0 0.533333rem;}
			span{
				color:#B8B8B8;
				font-size:0.426667rem;
				line-height:1.333rem;
				color:#B8B8B8;
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
			padding:1.44rem 0.533333rem 0;
			.log-input{
				position:relative;
				height:1.493333rem;
				padding-top: 0.426667rem;
			}
			input{
				height:1.066667rem;
				width:90%;
				font-size:0.4rem;
				line-height:1.066667rem;
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
		}
		.btn{
			margin-top:1.066667rem!important;
		}
		.isGray{background:#E4E4E4!important;}
	}
</style>
