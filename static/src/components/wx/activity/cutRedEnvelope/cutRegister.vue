<template>
	<div class="from" :class={isBackground:isBackground,isBlue:isBlue} ref="registeDiv">
		<div class="phone input">
			<i  class="icon phone-icon" v-if="isBackground"></i>
			<input v-model="mobilePhone" type="text" placeholder="请输入常用手机号">
		</div>
		<div class="code input short">
			<i  class="icon pcode-icon" v-if="isBackground"></i>
			<input class="fl" v-model="validCode" type="text" placeholder="请输入图片验证码">
			<span class="fl"><img @click="change" :src="codeImg" class="valicode_img fr"></span>
		</div>
		<div class="message input short">
			<i  class="icon mcode-icon" v-if="isBackground"></i>
			<input class="fl" v-model="code" type="text" placeholder="请输入短信验证码">
			<span v-if="showBtn" @click="send" class="fl msgBtn" ref="btnColor">{{btnText}}</span>
			<span v-else class="fl msgBtn" :class="{active:!showBtn}">{{time}}秒</span>
		</div>
		<div class="pwd input">
			<i  class="icon psw-icon" v-if="isBackground"></i>
			<input class="fl" v-model="pwd" type="password" placeholder="请设置8——16位密码">
			<span class="fl"></span>
		</div>
		<div @click="isGou = !isGou" class="gou"><img :src="isGou ? ( gouLists[0] ? gouLists[0]:gouList[0] ):( gouLists[1] ? gouLists[1]:gouList[1] )" alt=""></div>
		<p v-if="isBackground" class="xieyi">我已阅读并同意<span id="service_contract" @click="show">《E都市钱包用户使用协议》</span></p>
		<p v-else @click="show" :style="{height:'0.426667rem;',width:'6rem'}" class="xieyi"></p>

		<div @click="goReg" class="btn"></div>
		<ui-dialog @close="closeDialog" v-if="showXY"></ui-dialog>
	</div>
</template>

<script>	
	import getData from '../../../../common/router/getData';		//引入发送请求
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import dialog from '../../../public/wx/wxdialog';	//弹出框
	import wxToast from '../../../../common/wx/wxToast';	//引入toast提示
		export default{
		mixins:[getData,verify,wxToast],
		data(){
			return{
				btnText:'获取验证码',	//获取验证码文本
				time:60,	//倒计时60秒
				showBtn:true,	//显示获取验证码按钮
				mobilePhone:'',	//手机号
				isGou:true,	//是否勾选协议
				validCode:'',
				code:'',	//短信验证码
				pwd:'',	//密码
				tokenId:'',	//获取验证码时返回，防止重复提交
				gouList:[
					'https://aliyunsso.edspay.com/web/wx/activity/invitation/isGou.png',
					'https://aliyunsso.edspay.com/web/wx/activity/invitation/notGou.png'
				],	//勾选图片
				showXY: false,//显示协议
				newInvitedId: '',
				uuid: '',
				wdzjType: '',
				toPage:2,//注册成功后操作，1为弹框，2为跳转到活动页
				userMobile:'',//用户名
			}
		},
		props:[
			'channel', // 渠道名称
			'inviterId', // 邀请人id
			'btnColor', // 获取验证码按钮颜色
			'gouLists',  //勾选的
			'thisTiShow',//结束弹框
			'thisFaShow',// 帮砍失败
			'thisSuShow',//帮砍成功
			'failMsg',//失败原因
			'isBackground', // 是否需要注册框背景
			'isBlue',  // 是否为蓝色系注册框
		],
		methods:{
			checkInput(){//验证手机号与图片验证码
				if(this.isEmpty(this.mobilePhone,'手机号不能为空！',1)) return false;
				if(this.isFormat(this.mobilePhone,'手机号格式不正确！','mobileReg',1)) return false;
				if(this.isEmpty(this.validCode,'请输入验证码！',1)) return false;
				return true;
			},
			send(){//点击获取验证码事件
				var that = this;
				if(this.checkInput()){
					this.notLogPost('/user/getPhoneCode',(data) =>{
						if(data.resCode==1){
							this.codeSuc();
						}
					},{mobilePhone:this.mobilePhone,validCode:this.validCode,tokenId:this.fingerprint,captchaId:this.captchaId},1)
				}
			},
			// 显示协议
			show () {
				this.showXY = true
				this.$emit('isoverflow',true)
			},
			// 关闭协议
			closeDialog (val) {
				this.showXY=val
				this.$emit('isoverflow',false)
			},
			codeSuc(){
				let that = this;
				this.showBtn = false;
		    	this.toast({text:'发送成功',position:'top'})
				let timer = window.setInterval(function(){
					if((that.time--) <= 0) {
						that.time = 60;
						that.showBtn = true;
						that.btnText = '重新获取';
						window.clearInterval(timer);
						that.change();
					}
				},1000)
			},
			goReg(){//点击注册事件
				var that = this;
				this.newInvitedId = this.inviterId
				if(!this.newInvitedId){
					this.newInvitedId = '';
				}
				if(!this.checkInput()) return;
				if(this.isEmpty(this.code,'短信验证码不能为空！',1)) return false;
				if(this.isEmpty(this.pwd,'请输入8-16位字符，其中包括至少一个字母和一个数字！',1)) return false;
				if(this.isFormat(this.pwd,'密码格式不正确！','passwordReg',1)) return false;
				if(!this.isGou){
					this.toast({text:'请勾选服务条款'});
					return;
				}
				
				this.notLogPost('/user/oprCutRed',(data) =>{//发送注册请求
					if(data.resCode==1){
						this.thisSuShow.cutSucess = true;
					}else if( data.resCode == 0 ){
						this.toast({text:data.resMsg});
					}else if( data.resCode == '-1' ){
						this.thisFaShow.failTime = true;
						this.failMsg.failMessage = data.resMsg
					}
				},{activityId:'cut_red_activity',tokenId:this.fingerprint,source:6,code:this.code,pwd:this.pwd,channel:this.channel,ui:this.newInvitedId,phone:this.mobilePhone})
			},
			checkXY () {
				MessageBox.alert(
					'<p>E都市钱包注册协议（以下简称本协议）由浙江楚橡信息科技有限公司（以下简称本公司）和您签订。本协议在用户和E都市钱包间具有合同上的法律效力。请用户认真阅读、充分理解本协议各条款，特别是其中所涉及的免除、减轻E都市钱包责任的条款、对用户权利限制条款、争议解决和法律适用等。</p><h3>一、声明与承诺</h3><p>（一）在接受本协议或您以本公司允许的其他方式实际使用E都市钱包服务之前，请您仔细阅读本协议的全部内容。如果您不同意本协议的任意内容，或者无法准确理解本公司对条款的解释，请不要进行后续操作，包括但不限于不要接受本协议，不使用本服务。如果您对本协议的条款有疑问，请通过本公司客服渠道进行询问,本公司将向您解释条款内容。<br> （二）如本公司需要对本协议进行变更或修改的，须通过网站公告的方式提前予以公布，公告期限届满后即时生效；若您在本协议内容公告变更生效后继续使用E都市钱包服务的，表示您已充分阅读、理解并接受变更后的协议内容，也将遵循变更后的协议内容使用E都市钱包服务；若您不同意变更后的协议内容，您应在变更生效前停止使用E都市钱包服务。<br> （三）如您为无民事行为能力人或为限制民事行为能力人，例如您未满18周岁，则您应在监护人监护、指导下阅读本协议和使用本服务。若您非自然人，则您确认，在您取得E都市钱包账户时，或您以其他本公司允许的方式实际使用E都市钱包服务时，您为在中国大陆地区合法设立并开展经营活动或其他业务的法人或其他组织，且您订立并履行本协议不受您所属、所居住或开展经营活动或其他业务的国家或地区法律法规的排斥。不具备前述条件的，您应立即终止注册或停止使用E都市钱包服务。<br> （四）您在使用E都市钱包服务时，应自行判断交易对方是否具有完全民事行为能力并自行决定是否使用E都市钱包服务与对方进行交易，且您应自行承担与此相关的所有风险。 </p><h3>二、E都市钱包账户注册相关</h3><p>除本协议另有规定或相关产品另有规则外，您须在本网站注册并取得本公司提供给您的E都市钱包账户，或在您于其他阿拉丁旗下网站完成E都市钱包登录名注册，取得E都市钱包账户，并且按照本公司要求提供相关信息完成激活后方可使用本服务。您需使用作为E都市钱包登录名的本人电子邮箱或手机号码，或者本公司允许的其它方式（例如通过扫描二维码、识别生物特征的方式）登录E都市钱包账户，并且您应当自行为E都市钱包账户设置密码。</p><p>您同意：<br>1、按照E都市钱包要求准确提供并在取得该账户后及时更新您正确、最新及完整的身份信息及相关资料。若本公司有合理理由怀疑您提供的身份信息及相关资料错误、不实、过时或不完整的，本公司有权暂停或终止向您提供部分或全部E都市钱包服务。本公司对此不承担任何责任，您将承担因此产生的任何直接或间接支出。若因国家法律法规、部门规章或监管机构的要求，本公司需要您补充提供任何相关资料时，如您不能及时配合提供，本公司有权暂停或终止向您提供部分或全部E都市钱包服务。<br>2、您应当准确提供并及时更新您提供的电子邮件地址、联系电话、联系地址、邮政编码等联系方式，以便本公司与您进行及时、有效联系。您应完全独自承担因通过这些联系方式无法与您取得联系而导致的您在使用本服务过程中遭受的任何损失或增加任何费用等不利后果。您理解并同意，您有义务保持您提供的联系方式的有效性，如有变更需要更新的，您应按本公司的要求进行操作。<br>3、您应及时更新资料（包括但不限于身份证、户口本、护照等证件或其他身份证明文件、联系方式、作为E都市钱包账户登录名的邮箱或手机号码、 与E都市钱包账户绑定的邮箱、手机号码等），否则E都市钱包有权将E都市钱包登录名、E都市钱包账户绑定的邮箱、手机号码开放给其他用户注册或使用。因您未及时更新资料导致的一切后果，均应由您自行承担，该后果包括但不限于导致 本服务无法提供或提供时发生任何错误、E都市钱包账户及该账户内余额被别人盗用，且您不得将此作为取消交易、拒绝付款的理由。<br>4、若您为个人用户, 您确认, 本公司有权在出现下列情形时要求核对您的有效身份证件或其他必要文件, 留存有效身份证件的彩色扫描件, 且完成本公司要求的相关身份认证。您应积极配合，否则本公司有权限制或停止向您提供部分或全部E都市钱包服务：<br>A.您使用E都市钱包服务买卖金融产品或服务的；<br>B.您购买我公司记名预付卡或办理记名预付卡充值的;<br>C.您购买不记名预付卡或通过不记名预付卡为E都市钱包账户单笔充值超过人民币1万元的;<br>D.您要求变更身份信息或您身份信息已过有效期的;<br>E.本公司认为您的交易行为或交易情况出现异常的;<br>F.本公司认为您的身份资料存在疑点或本公司在向您提供服务的过程中认为您已经提供的身份信息或相关资料存在疑点的;<br>G.本公司认为应核对或留存您身份证件或其他必要文件的其他情形的。<br>本条款所称“以上”,包括本数。<br> 5、您在E都市钱包账户中设置的昵称、头像等必须遵守法律法规、公序良俗、社会公德，且不会侵害其他第三方的合法权益，否则E都市钱包有权对您的E都市钱包账户采取限制措施，包括但不限于屏蔽、撤销您E都市钱包账户的昵称、头像，停止提供部分或全部E都市钱包服务。</p>',
					 '用户使用协议');
			},
		},
		created(){
			this.change();
		},
		mounted () {
			this.$emit('getRegisteDiv',this.$refs.registeDiv)
			this.$nextTick(function () {
				this.$refs.btnColor.style.backgroundColor = ""+this.btnColor+""
			})
		},
		watch : {
			'showBtn' (val) {
		        if (this.btnColor) {
		          if (val) {
		            this.$nextTick(function () {
		                this.$refs.btnColor.style.backgroundColor = ""+this.btnColor+""
		            })
		          } else {
		            this.$nextTick(function () {
		                this.$refs.btnColor.style.backgroundColor = "#fff"
		            })
		          }
		        }
		    }
		},
		components:{
           'ui-dialog': dialog
		},
	}
</script>

<style lang="scss" scoped>

		.from{
			padding: 0.106667rem 0 0 1.013333rem;
		    width: 100%;
		    height: 10.53rem;
			.un_login{
				width: 70%;
			    height: 0.833333rem;
				background: #56ADFF;
				margin: 0 auto;
			}
			.input{
				height:1.173333rem;
				margin-bottom:0.435rem;
				padding-left:1.6rem;
				line-height:0.52rem;
				font-size:0.373333rem;
				input{
					margin-top:0.32rem;
					height:0.506667rem;
					font-size: .32rem ;
				}
			}
			.pwd{
				margin-bottom:0;
			}
			.short{
				input{
					width:3.2rem;
				}
				span{
					margin-left:0.67rem;
					width:2.5rem;
					height:100%;
					color:#FB6A65;
					text-align:center;
					.valicode_img{
						margin:0.16rem 0 0 0.213333rem;
						width: 2.323333rem;
						height: 0.966667rem;
						float: left;
					}
				}
				.msgBtn{
					font-size:0.373333rem;
					line-height:1.173333rem;
					width:2.666667rem;
					background:#FFCD00;
					border-radius:0.133333rem;
					color:#fff;
				}
				.active{
					color:#ef5d36;
					background:#fff;
				}
			}
			.gou{
				height:0.453333rem;
				margin:0.3rem 0 0 0.053333rem;
				display: inline-block;
				img{
					display:inline-block;
					vertical-align: text-top;
					height:100%;
					width:0.453333rem;
				}
			}
			.btn{
				height:8.4rem;
				width:1.453333rem;
				margin-top: 0.32rem;
				margin-bottom: .1rem;
				-webkit-animation: ripple 2s infinite;
				-moz-animation: ripple 2s infinite;
				-ms-animation: ripple 2s infinite;
				animation: ripple 2s infinite;
				background:url(https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/cut_help_btn.png) no-repeat; 
				background-size: 100% 100%;
				position: relative;
			}
			@-moz-keyframes ripple {
			    0% {
			    	width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
				50% {
					width:7.6rem;
					height: 1.32rem;
					top: 0.066667rem;
					margin-left: 0.4rem;
				}
				100% {
					width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
			}
			@-ms-keyframes ripple {
			  0% {
					width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
				50% {
					width:7.6rem;
					height: 1.32rem;
					top: 0.066667rem;
					margin-left: 0.4rem;
				}
				100% {
					width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
			}
			@-webkit-keyframes ripple {
			  0% {
					width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
				50% {
					width:7.6rem;
					height: 1.32rem;
					top: 0.066667rem;
					margin-left: 0.4rem;
				}
				100% {
					width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
			}
			@keyframes ripple {
			  0% {
					width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
				50% {
					width:7.6rem;
					height: 1.32rem;
					top: 0.066667rem;
					margin-left: 0.4rem;
				}
				100% {
					width: 8.4rem;
					height: 1.453333rem;
					top: 0rem;
					margin-left: 0rem;
				}
			}

			.login{
				margin-top:0.2rem;
				height:0.533333rem;
				width:1.5rem;
				margin-left:4.106667rem;
			}
			.xieyi {
				display: inline-block;
				height:0.426667rem;
				font-size:.32rem ;
				color: white;
				vertical-align: text-top;
				padding-left: .066667rem;
				span {
					color: #FFF300;
				}
			}
		}
		/*如果没有背景图片*/
		.isBackground {
			.icon {
				width:1.173333rem;
				height: .933333rem;
				position: absolute;
				left: 0rem;
				top:0.1rem;
				border-right:1px solid #F75E58;
			}
			.phone-icon {
				background: url('https://aliyunsso.edspay.com/web/channel/phone.png') no-repeat;
				background-size: contain;
			}
			.pcode-icon {
				background: url('https://aliyunsso.edspay.com/web/channel/pcode.png') no-repeat;
				background-size: contain;
			}
			.mcode-icon {
				background: url('https://aliyunsso.edspay.com/web/channel/code.png') no-repeat;
				background-size: contain;
			}
			.psw-icon {
				background: url('https://aliyunsso.edspay.com/web/channel/psw.png') no-repeat;
				background-size: contain;
			}
			.input {
				padding-left: 0rem;
				margin-bottom: 0.215rem;
				position: relative;
			}
			.input input {
				margin-top: 0rem;
				border: .013333rem solid white;
				border-radius: .133333rem;
				background-color: white;
				width:8rem;
				font-size: .32rem ;
				height:1.173333rem;
				padding-left: 1.6rem;
			}
			.short {
				input{
					width:5.066667rem;;
					font-size: .32rem ;
				}
				.valicode_img {
					width: 2.533333rem;
					height:1.066667rem;
					border-radius: .133333rem;
				}
			}
			.short span .valicode_img {
			   margin:0rem
			}
			.short .msgBtn {
				height: 1.173333rem;
				line-height: 1.173333rem;
				width: 2.613333rem;
			}
			.short span {
				margin-left: 0.27rem;
			}
			.btn{
				height: 1.333333rem;
				width: 8rem;
				margin-top: 0.3rem;
				background: url('https://aliyunsso.edspay.com/web/channel/Group.png') no-repeat;
				background-size: contain;
			}
			.pwd {
				margin-bottom: 0rem;
			}
			.login {
				text-align: center;
				width:8rem;
				margin-left:0rem;
				font-size: .346667rem;
				color: white;
				span {
					color:#FFF300;
				}
			}
		}
		/*如果为蓝色背景*/
		.isBlue{
			.login {
				margin-top: 0px;
			}
			.input input {
				font-size: .32rem ;
			}
			.xieyi {
				vertical-align: super;
			}
			.short{
			   	span .valicode_img{
			    	margin: 0;
					width: 100%;
					height: 95%;
			    }
			   	 .msgBtn{
			   	 	background: #3A8AFF;
			   	 }
			   } 
			.gou img{
				display: none;
				}
		}
</style>
