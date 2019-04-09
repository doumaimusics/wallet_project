<template>
	<div id="wxPhone">
		<wx-header :logo="logoMsg"></wx-header>
		<form action="">
			<div class="content">
				<div class="title">
					验证码已发送至您的手机:{{userPhone}}
				</div>		
				<div class="input-row clear" :class="{inputActive:inputActive.message}">
					<i class="iconCode"></i>
					<i class="iconCodeClick"></i>
					<input @focus="inputFocus('message')" v-model="message" type="text" class="input-message" placeholder="手机验证码"  name="message" id="message" autocomplete="off">	
					<div class="message fl" v-if="showBtn" @click="send">{{btnText}}</div>
					<div class="message second fl" v-else>{{time}}秒</div>
				</div>
				<div class="regTips" :class="{tipShow:tipShow}">
					<i class="el-icon-circle-cross"> </i>
					{{errorMsg}}
				</div>

			</div>
			<div @click="next" class="loginBtn" >下一步</div>
		</form>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';	//引入头部
	import wxToast from '../../../../common/wx/wxToast';	//引入toast提示
	import verify from '../../../../common/wx/verification';	//引入表单验证
	export default {
		mixins:[wxToast,verify],
		data(){
			return {
				logoMsg:'找回登录密码',
				tipShow:false,
				errorMsg:'',
				time:60,
				userPhone:'',
				message:'',
				btnText:'重新发送',
				showBtn:true,
				inputActive:{
					message:false
				},
				captchaId:'',
				valideToken:''
			}
		},
		methods:{
			// 添加获取焦点效果
			inputFocus(nameInput){
				for( var item in this.inputActive){
					this.inputActive[item]=false;
				}
				this.inputActive[nameInput] = true;
			},
			send(){	//重新获取
				let that = this;
				this.$http.post(that.ajaxUrl.getUrl(1)+'/user/getpwd',{mobilePhone:that.userPhone,valideToken:that.valideToken,getType:'2',step:'4'},{emulateJSON: true})
      			.then((res) => {   
      				if(res.body.resCode == 1){
      					codeSuc()
      				}else{
      					that.toast({text:'发送失败',position:'top'})
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
							window.clearInterval(timer);
						}
					},1000)
			    }
			},
			next(){
				var that = this;

			    if(tool.isEmptyString(that.message)) {
          			that.popModal({str:'请输入验证码'})
          			return;
          		}
          		//发送请求
			     this.$http.get(that.ajaxUrl.getUrl(1)+'/user/getpwd?&mobilePhone='+that.userPhone+'&code='+that.message+'&getType=2&step=2')
      			.then((res) => {   
      				console.log(res);
      				console.log(that.message)
      				if(res.body.resCode == 1){
      					that.valideToken = res.body.resData.valideToken;
          				that.$router.replace({path:'/wxSetPwd',query:{valideToken:that.valideToken,userPhone:this.userPhone}})	
      				}else{
      					that.popModal({str:res.body.resMsg})
      				}
			    }, (response) => {    
			        // 响应错误回调
			    });
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.userPhone = this.$route.query.phone;
			this.captchaId = this.$route.query.captchaId;
			this.valideToken = this.$route.query.valideToken;

			var that = this;
	    	that.showBtn = false;
			let timer = window.setInterval(function(){
				if((that.time--) <= 0) {
					that.time = 60;
					that.showBtn = true;
					that.btnText = '重新获取';
					window.clearInterval(timer);
				}
			},1000)
		}
	}
</script>

<style lang="scss" scoped>
	.el-icon-circle-cross{
		color:#ff5a4a;
	}
	#wxPhone{
		.regTips{
			position:absolute;
			bottom:-1.5rem;
			left:0.533333rem;
			padding-left: 0.266667rem;
			line-height: 0.906667rem;
			width:88%;
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
		form{
			margin-top:0.533333rem;
			.title{
				width: 90%;
				font-size:0.373333rem;
				display: block;
				margin: 0 auto;
				color: #999999;
				margin-bottom: 0.533333rem;
			}
			.content{
				position:relative;
			}
			.input-row{
				box-sizing:border-box;
				width:90%;
				margin: 0 auto 0.4rem;
				padding: 8px 2%;
				border: 1px solid #DDDDDD;
				border-radius: 4px;
				background:#fff;
				input{
					float:left;
					width: 88%;
				    margin-left: 2%;
				    font-size: 0.373333rem;
				    line-height:0.693333rem;
				}
				.message{
					background:#FF5A54;
					color:#fff;
					float:right;
					border-radius:4px;
					font-size: 0.373333rem;
					line-height:0.693333rem;
					padding: 0 0.16rem;
				}
				.second{
					background:#f3f3f3;
					color:#508cee;
				}
				
				i{
					height:0.693333rem;
					width:0.693333rem;
					float: left;
				}
				i:nth-of-type(2){
					display:none;
				}
				.iconPhone{
					background:url(https://aliyunsso.edspay.com/web/wx/login/register_phone_normal.png);
					background-size: 100%;
				}
				.iconPhoneClick{
					background:url(https://aliyunsso.edspay.com/web/wx/login/register_phone_click.png);
					background-size: 100%;
					display:none;
				}	
				.iconCode{
					background:url(https://aliyunsso.edspay.com/web/wx/login/login_code_normal.png);
					background-size: 100%;
				}
				.iconCodeClick{
					background:url(https://aliyunsso.edspay.com/web/wx/login/login_code_click.png);
					background-size: 100%;
				}
				.input-code{
					width:50%;
				}
				.valicode_img{
					width: 1.333333rem;
					height:0.64rem;
				}	
				.input-message{
					width:50%;
				}
			}
			.inputActive{
				border:1px solid rgb(255,90,74);
				i:nth-of-type(1){
					display:none;
				}
				i:nth-of-type(2){
					display:block;
				}
			}
			.loginBtn{
				width:90%;
				display:block;
				margin:0 auto;
				background:#ff5a4a;
				font-size: 0.426667rem;
				height:1.066667rem;
				text-align: center;
				line-height:1.066667rem;
				border-radius:4px;
				color:#fff;
				margin-top:1.233333rem;
			}
		}
	}
</style>