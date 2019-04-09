<template>
	<div id="wxForgetPwd">
		<div v-if="cradShow" v-title>{{logoMsg}}</div>
		<div v-else-if="verifyShow" v-title>{{logoMsg}}</div>
		<div class="cardId" v-if="cradShow">
			<div class="title">请填写<span>{{userData.hideRealname}}</span>验证身份</div>
			<div class="input_row">
				<label for="">身份证号</label>
				<input type="text" v-model="cardId" id="cardId" name="cardId" placeholder="请输入已认证的身份证" class="input" maxlength="18">
				<i class="dele_icon" v-if="cardId" @click="deleNum"></i>
			</div>
			<div class="tips">
				<p v-if="errorMsg" class="error">
					<i class="tip_icon"> </i>
					{{errorMsg}}
				</p>
				<p v-else class="tip_message">请填写正确的身份证号码</p>
			</div>
			<div class="loginBtn active" v-if="cardId" @click="nextStep">下一步</div>
			<div class="loginBtn" v-else>下一步</div>
		</div>
		<div class="verify_code" v-if="verifyShow">
			<div class="title">手机号码<span>{{userData.hidePhone}}</span></div>
			<div class="input_row">
				<label for="">验证码</label>
				<input v-model="message" type="text" class="input-message" placeholder="手机验证码"  name="message" id="message">
				<div class="icon"><i class="del_ico" v-if="message" @click="deleCode"></i></div>
				<div class="line fl bdr-r"></div>
				<div class="message fr" v-if="showBtn" @click="send">{{btnText}}</div>
				<div class="message second fr" v-else>重发({{time}}秒)</div>
			</div>
			<div class="tips">
				<p v-if="errorMsg" class="error">
					<i class="tip_icon"> </i>
					{{errorMsg}}
				</p>
				<p v-else class="tip_message">请输入正确验证码</p>
			</div>
			<div class="loginBtn active" v-if="message" @click="toSetPwd">下一步</div>
			<div class="loginBtn"v-else>下一步</div>
		</div>
	</div>
</template>
<script>
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import wxToast from '../../../../common/wx/wxToast'; //引入toast提示
	// import { Toast } from 'mint-ui';
	export default {
		mixins:[verify,wxToast],
		data(){
			return {
				logoMsg:'身份验证',
				tipShow: false,
				errorMsg:'',
				realName: '',
				cradShow: true,
				verifyShow: false,
				cardId:'',
				btnText:'获取验证码',
				showBtn:true,
				message: '',
				hideNum:'',
				time:'60',
				thisUrl:'',
				userData:{},
			}
		},
		methods: {

			nextStep() {
				var that = this;
				 if ( this.isFormat(that.cardId,'身份证号格式错误！','other_id_cardReg') ) return;
				 this.postData('/user/validateIdCard',(res,data) => {
				 	if( data.resCode == 1 ) {
				 		this.cradShow = false;
						 this.verifyShow = true;
						 this.logoMsg = '短信验证'
				 	}
				 },{idCard:this.cardId},1)
			},
			toSetPwd() {
				this.postData('/user/validatePhoneCode',(res,data) => {
				 	if ( data.resCode == 1 ) {
				 		this.$router.replace({path:'/wxMyAccount/wxTradeSetPwdNew',query:{thisUrl:this.thisUrl,pwdManage:0,typePwd:1}})
				 	}
				 },{code:this.message},1)
			},
			send(){	//重新获取
				let that = this;
				this.postData('/user/sendPhoneCode',(res,data) =>{
          			if(data.resCode){
						// that.valideToken = data.resData.valideToken;
						that.toast({text:'发送成功',time:2000});
						codeSuc();
          			}
          		},{},1)

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
			deleNum() {
				this.cardId = "";
			},
			deleCode() {
				this.message = '';
			}
		},
		components:{
			
		},
		created() {
			this.thisUrl = this.$route.query.thisUrl;
			var that = this
			this.postData('/account/securityInfo',function(res){
				that.showCentent = true;
				if(res.body.resCode == 1){
					that.userData = res.body.resData.model;
				}else{
					that.$router.push('/wxLogin')
				}
			},{},1)
		},
	}
</script>
<style lang="scss" scoped>
	#wxForgetPwd{
		font-family: PingFangSC-Regular;
		min-height: 17.786667rem;
		width: 100%;
		background: #ffffff;
		.cardId,.verify_code{
			width: 9.2rem;
			margin: 0 auto;
			.title{
				font-size: 0.346667rem;
				color: #333333;
				padding: 0.8rem 0 .6rem 0;
				span{
					font-size: 0.4rem;
					color: #333333;
					font-weight: 600;
				}
			}
			.input_row{
				width: 100%;
				height: 1.04rem;
				line-height: 1.04rem;
				border-bottom: 1px solid #e5e5e5;
				label{
					width: 1.666667rem;
					font-size: 0.4rem;
					color: #333333;
				    float: left;
				}
				input{
					font-size: 0.4rem;
					color: #333333;
					text-indent: 0.4rem;
					float: left;
					line-height: 1.04rem;
					width: 6.493333rem;
				}
				.icon{
					margin-top: .3rem;
				    margin-right: .4rem;
				    width: 0.4rem;
					height: 0.4rem;
					float: left;
				}
				.del_ico{
				    width: 0.4rem;
					height: 0.4rem;
					background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/close_icon.png) no-repeat;
					background-size: 0.4rem 0.4rem;
					display: block;
				}
				.dele_icon{
					width: 0.4rem;
					height: 0.4rem;
					background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/close_icon.png) no-repeat;
					background-size: 0.4rem 0.4rem;
					float: left;
					margin-top: .3rem;
				    margin-right: .4rem;
				}
				.line{
					position:relative;
					// margin-top:0.1rem;
					height:.7rem;
					width:1px;
				}
				.bor-r{border-right:1px solid #000;}
				.input-message{
					width:3.9rem;
					float: left;
					line-height: 1.04rem;
				}
				.message{
					font-size: 0.4rem;
					color: #333333;
					padding-right: 0.266667rem;
				}
				.second{
					color: #808080;
				}
			}
			.tips{
				height: 0.8rem;
				font-size: 0.32rem;
				color: #808080;
				line-height: .8rem;
				.error{
					color: #FF5B4C;
				}
				.tip_icon{
					background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/gantan.png) no-repeat;
					background-size: 0.293333rem 0.293333rem;
					width: 0.293333rem;
					height: 0.293333rem;
					display: inline-block;
				}
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
		.loginBtn.active{
			background:url('https://aliyunsso.edspay.com/web/wx/account/btn_bg2.png?v=1.0') no-repeat;
				background-size: 8.773333rem 1.066667rem;
		}
		.regTips{
			position:relative;
			// bottom:0.88rem;
			left:0;
			padding-left: 0.266667rem;
			line-height: 0.906667rem;
			width:90%;
			margin:0 auto;
			margin-top: .3rem;
			// margin-bottom: 0.4rem;
			border: 1px solid #ffd8d9;
    		background-color: #fcebec;
    		border-radius:0.133333rem;
    		font-size:0.4rem;
    		display:none;
		}
		.tipShow{
			display:block;
		}
		.el-icon-circle-cross{
			color:#ff5a4a;
		}
	}
</style>