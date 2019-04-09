<template>
	<div class="from" :class={isBackground:isBackground,isBlue:isBlue} ref="registeDiv">
		<!-- 手机号 -->
		<div class="phone input">
			<i  class="icon phone-icon" v-if="isBackground"></i>
			<i v-if="mobilePhone" @click="mobilePhone = ''" class="clear"></i>
			<input v-model="mobilePhone" @input="watchPhone" type="text" placeholder="请输入常用手机号">
		</div>
		<!-- 短信验证码 -->
		<div class="message input short">
			<i  class="icon mcode-icon" v-if="isBackground"></i>
			<input class="fl" v-model="messageCode" @input="watchCode" type="text" placeholder="请输入短信验证码">
			<span v-if="showBtn" @click="getImgCode" class="fl msgBtn" :style="{background:btnColor}" ref="btnColor">{{btnText}}</span>
			<span v-else class="fl msgBtn" :style="{background:registerCodeTimeColor}" :class="{active:!showBtn}">{{time}}秒后重发</span>
		</div>
		<!-- 协议 -->
		<div @click="isGou = !isGou" class="gou" :class="{'jb-gou':propInfo.channelCategory == 1}">
			<img :src="isGou ? (propInfo.channelCategory == 1 ? gouList[2] :gouList[0]):gouList[1]" alt="">
		</div>
		<p v-if="isBackground" class="xieyi">我已阅读并同意<span id="service_contract" @click="show">《E都市钱包用户使用协议》</span></p>
		<p v-else @click="show" :style="{height:'0.426667rem;',width:'6rem'}" class="xieyi" :class="{'jb-xieyi':propInfo.channelCategory == 1}"></p>
		<!-- 注册按钮 -->
		<div @click="goReg" class="btn" v-if="isBackground"></div>
		<div @click="goReg" class="btn" v-else></div>
		<!-- 立即登录 -->
		<div v-if="propInfo.channelCategory !== 1">
			<div class="login" tag="div" v-if="isBackground">
				已有账户，
				<router-link :to="isLoginPC ? {path:'/login'} : {path:'/wxLogin',query:$route.query}">
					<span>立即登录</span>
				</router-link>
			</div>
			<router-link :to="isLoginPC ? {path:'/login'} : {path:'/wxLogin',query:$route.query} " class="login" tag="div" v-else></router-link>
		</div>
		<ui-dialog @close="closeDialog" v-if="showXY"></ui-dialog>
		<!-- 图片验证码弹框 -->
		<div v-if="showImgCode" class="imgCode">
			<div class="content">
				<div class="imgCodeInput clear">
					<input v-model="validCode" @blur="inputBlur" type="text" class="fl" placeholder="请输入图形验证码">
					<img @click="getImgCodeAgain" :src="imgCodeData.validCode" alt="" class="fl">
				</div>
				<div class="tips"><span v-if="showCodeTip">{{imgCodeTip}}</span></div>
				<div class="btns clear">
					<div @click="showImgCode = false;validCode = ''" :style="{color:registerCodeConfirmColor,border:'1px '+ registerCodeConfirmColor + ' solid'}" class="close fl">取消</div>
					<div @click="getMessageCode" :style="{background:registerCodeConfirmColor}" class="getMessageCode fl">确定</div>
				</div>
				
			</div>
		</div>
		<!-- 提示黑框 -->
		<div v-if="showInputTip" class="tipBox" :class="{'pc-tipbox':propInfo.place == 3}">{{inputTip}}</div>
	</div>
</template>

<script>	
    import getData from '../../../common/router/getData';		//引入发送请求
	import verify from '../../../common/wx/verification';	//引入表单验证
	import gtInit from '../../../common/wx/gt.js';	//引入极速验证
	import dialog from '../../public/wx/wxdialog';	//弹出框
	import { Toast } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
		export default{
		mixins:[getData,verify],
		data(){
			return{
				btnText:'获取验证码',	//获取验证码文本
				time:60,	//倒计时60秒
				showBtn:true,	//显示获取验证码按钮
				mobilePhone:'',	//手机号
				isGou:true,	//是否勾选协议
				validCode:'',
				messageCode:'',	//短信验证码
				pwd:'',	//密码
				tokenId:'',	//获取验证码时返回，防止重复提交
				gouList:[
					'https://aliyunsso.edspay.com/web/activity/channel/gouxuan_y.png',
					'https://aliyunsso.edspay.com/web/activity/channel/gouxuan_w.png',
					'https://aliyunsso.edspay.com/web/activity/channel/jbGou.png'
				],	//勾选图片
				showXY: false,//显示协议
				newInvitedId: '',
				uuid: '',
				wdzjType: '',
				fanliData:{},//返利数据

				showImgCode:false,//显示图片验证码弹框
				imgCodeData:{},
				imgCodeTip: '',
				showCodeTip:false,

				inputTip:'',
				showInputTip:false,

				mobilePhoneLength:0,
				codeLength:0,
				source:6,
				mobileType:6,
				propInfo:{},
				verifyFun: null,
				isNeedCheck: true   // 是否开启极速验证
			}
		},
		props:[
			'info', // 渠道所有参数，保存在propInfo变量里，使用时用propInfo
			'channel', // 渠道名称
			'toLink', // 跳转链接 （只限路由）
			'isBackground', // 是否需要注册框背景
			'inviterId', // 邀请人id
			'toMark',  // 注册之后跳转到应用市场
			'isBlue',  // 是否为蓝色系注册框
			'isLoginPC', 
			'btnColor', // 获取验证码按钮颜色
			'registerCodeTimeColor',//获取验证码按钮倒计时颜色
			'registerCodeConfirmColor',//图片验证码弹框按钮颜色
			'channelData',//返利网返回数据
			'isInvitation',//区分渠道与邀请
			'isCnzz',       // 是否添加友盟统计
		],
		methods:{
			watchPhone(){
				if(!tool.regCheck(this.mobilePhone,'nonnegativeReg')){
					var phoneLength = this.mobilePhone.length - 1;
					this.mobilePhone = this.mobilePhone.substring(-1,this.mobilePhoneLength);

				}
					this.mobilePhoneLength = this.mobilePhone.length;
			},
			watchCode(){
				if(!tool.regCheck(this.messageCode,'nonnegativeReg')){
					var codeLength = this.messageCode.length - 1;
					this.messageCode = this.messageCode.substring(-1,this.codeLength);

				}
					this.codeLength = this.messageCode.length;
			},
			closeTip(){
				setTimeout(()=>{
					this.showInputTip = false;
					this.showCodeTip = false;
				},2000)
			},
			checkPhone(){
				if(tool.isEmptyString(this.mobilePhone)){
					this.getInputTip('手机号不能为空！');
					return false;
				}
				if(!tool.regCheck(this.mobilePhone, 'mobileReg')){
					this.getInputTip('请输入正确手机号码！');
					return false;
				}
				return true;
			},
			getInputTip(resMsg){
				this.showInputTip = true;
				this.inputTip = resMsg;
				this.closeTip();
			},
			getMessageCode(){
				if(this.isNeedCheck){
					if(tool.isEmptyString(this.validCode)){
						this.showCodeTip = true;
						this.imgCodeTip = '请输入图形验证码';
						this.closeTip();
						return false;
					} 

					if(this.validCode.length != 4){
						this.showCodeTip = true;
						this.imgCodeTip = '图形验证码错误，请重新输入！';
						this.closeTip();
						return;
					}
				};	
				if(this.isCnzz){
					window._czc.push(﻿["_trackEvent", this.channel, "获取验证码按钮"]); //  友盟事件统计
				};
				let dataJson = {
					mobilePhone:this.mobilePhone,
					tokenId: this.fingerprint,
					validCode: this.validCode,
					captchaId: this.imgCodeData.captchaId,
					userRole: this.propInfo.channelCategory,
					uuid: this.fingerprints
				};
				this.propInfo.channelCategory == 1 ? dataJson.userRole = 2 : dataJson.userRole = 1
				this.notLogPost('/user/getPhoneCode',(data) =>{
					if(data.resCode==1){
						this.showImgCode = false;
						this.getInputTip(data.resMsg);

						this.codeSuc();
					} else {
						this.imgCodeTip = data.resMsg;
						this.closeTip();
					}
					this.showCodeTip = true;
					this.validCode = '';
				},dataJson)
				
			},
			getImgCodeAgain(){
				this.notLogPost('/user/channel/verifyImage',(data) =>{
					if(data.resCode==1){
						this.imgCodeData = data.resData;
					}
				},{mobilePhone:this.mobilePhone})
			},
			initGee(json){   // 极速验证初始化
				let that = this;
				that.notLogPost('/geetest/init',(data) =>{
					if(data.resCode==1){
						initGeetest({
							challenge: data.resData.challenge,
							gt: data.resData.gt,
							offline: false,
							new_captcha: true,
							product: 'bind'
						}, function (captchaObj) {
							captchaObj.onReady(function(){
								that.verifyFun = function(){
									captchaObj.verify(); //显示验证码
								}
							})
							captchaObj.onSuccess(function(){
								var result = captchaObj.getValidate();
								that.notLogPost('/geetest/checkResult',(data) =>{
									if(data.resCode==1){
										that.getMessageCode();
									} else {
										that.getInputTip(data.resMsg);
									}
								},{clientType: 'H5',phone:that.mobilePhone,uuid: that.fingerprints, challenge: result.geetest_seccode, validate: result.geetest_validate, seccode: result.geetest_challenge})
							});
						})
					} else {
						that.getInputTip(data.resMsg);
					}
				},{clientType: 'H5', uuid: that.fingerprints})
			},
			getImgCode(){ 
				if(!this.checkPhone()) return;
				if(this.propInfo.channelCategory == 1){   // 借呗极速验证
				this.isNeedCheck = false;
					this.notLogPost('/geetest/isNeedCheck',(data) =>{
						if(data.resCode==1){
							if(data.resData.isExist == 1){
								MessageBox.confirm('亲！此手机号已注册，请直接登录。').then(action => {
									window.location="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"
								},action => {})
							}else if(data.resData.isOpen == 1){  // 需要极速验证
								this.verifyFun();
							}else{ // 不需要极速验证
								this.getMessageCode();
							}
						} else {
							this.getInputTip(data.resMsg);
						}
					},{clientType: 'H5',phone:this.mobilePhone,uuid: this.fingerprints})
				}else{
					this.isNeedCheck = true;
					//phoneIsPass  3：已注册 2：请输入正确手机号，1：账号可以注册
					this.notLogPost('/user/channel/verifyImage',(data) =>{
						if(data.resCode==1){
							this.imgCodeData = data.resData;
							this.showImgCode = true;
						} else {
							this.getInputTip(data.resMsg);
						}
					},{mobilePhone:this.mobilePhone})
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
			// 已经注册弹框
			logonBoxShow(){
				this.$emit('isShowBox',2)
			},
			codeSuc(){
				let that = this;
				this.showBtn = false;
		    	// this.toast({text:'发送成功',position:'top'})
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
				this.newInvitedId = this.inviterId
				if(!this.newInvitedId){
					this.newInvitedId = '';
				}
				
				if(this.isInvitation == 1){
					this.mobileType = 5;
					this.source = 5;
				}

				console.log(this.newInvitedId);
				//校验手机号
				if(!this.checkPhone()) return;
				//校验短信验证码
				if(tool.isEmptyString(this.messageCode)){
					this.getInputTip('请输入短信验证码！');
					return false;
				}
				if(!tool.regCheck(this.messageCode, 'mobcodeReg')){
					this.getInputTip('请输入正确短信验证码！');
					return false;
				}

				if(!this.isGou){
					this.toast({text:'请勾选服务条款'});
					return;
				}
				// 新增网贷之家判断
				let channelCode = this.$route.query.channelCode ? this.$route.query.channelCode : ''
				this.$route.query.uuid ? this.uuid = this.$route.query.uuid : this.uuid = ''
				this.$route.query.wdzjType ? this.wdzjType = this.$route.query.wdzjType : this.wdzjType = '';
				if(this.isCnzz){
					window._czc.push(﻿["_trackEvent", this.channel, "点击注册按钮"]); //  友盟事件统计
				};
				if(this.fanliData.tc){//从返利网入口进入
					this.notLogPost('/user/doRegister',(data) =>{//发送注册请求
						if(data.resCode==1){
							console.log(this.newInvitedId);
							if(this.toLink){
								this.$router.push(this.toLink);
							} else if (this.toMark) {
								window.location="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"
							}
						}else{
							this.getInputTip(data.resMsg);
						}
					},{isChannel:1,code:this.messageCode,tokenId:this.fingerprint,source:this.source,channel:this.channel,inviteUserCode:this.newInvitedId,uuid:this.uuid,wdzjType:this.wdzjType,  uid:this.fanliData.uid,target_url:this.fanliData.target_url,tc:this.fanliData.tc,tracking_id:this.fanliData.tracking_id,action_time:this.fanliData.action_time,flCode:this.fanliData.code,mobileType:this.mobileType})
				}else{
					this.notLogPost('/user/doRegister',(data) =>{//发送注册请求
						if(data.resCode==1){
							console.log(this.newInvitedId);
							if(this.toLink){
								this.$router.push(this.toLink);
							} else if (this.toMark) {
								window.location="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile"
							}
						}else{
							this.getInputTip(data.resMsg);
						}
					},{isChannel:1,code:this.messageCode,tokenId:this.fingerprint,source:this.source,channel:this.channel,inviteUserCode:this.newInvitedId,uuid:this.uuid,wdzjType:this.wdzjType,mobileType:this.mobileType, channelCode: channelCode})
					
				}
			},
			checkXY () {
				MessageBox.alert(
					'<p>E都市钱包注册协议（以下简称本协议）由浙江楚橡信息科技有限公司（以下简称本公司）和您签订。本协议在用户和E都市钱包间具有合同上的法律效力。请用户认真阅读、充分理解本协议各条款，特别是其中所涉及的免除、减轻E都市钱包责任的条款、对用户权利限制条款、争议解决和法律适用等。</p><h3>一、声明与承诺</h3><p>（一）在接受本协议或您以本公司允许的其他方式实际使用E都市钱包服务之前，请您仔细阅读本协议的全部内容。如果您不同意本协议的任意内容，或者无法准确理解本公司对条款的解释，请不要进行后续操作，包括但不限于不要接受本协议，不使用本服务。如果您对本协议的条款有疑问，请通过本公司客服渠道进行询问,本公司将向您解释条款内容。<br> （二）如本公司需要对本协议进行变更或修改的，须通过网站公告的方式提前予以公布，公告期限届满后即时生效；若您在本协议内容公告变更生效后继续使用E都市钱包服务的，表示您已充分阅读、理解并接受变更后的协议内容，也将遵循变更后的协议内容使用E都市钱包服务；若您不同意变更后的协议内容，您应在变更生效前停止使用E都市钱包服务。<br> （三）如您为无民事行为能力人或为限制民事行为能力人，例如您未满18周岁，则您应在监护人监护、指导下阅读本协议和使用本服务。若您非自然人，则您确认，在您取得E都市钱包账户时，或您以其他本公司允许的方式实际使用E都市钱包服务时，您为在中国大陆地区合法设立并开展经营活动或其他业务的法人或其他组织，且您订立并履行本协议不受您所属、所居住或开展经营活动或其他业务的国家或地区法律法规的排斥。不具备前述条件的，您应立即终止注册或停止使用E都市钱包服务。<br> （四）您在使用E都市钱包服务时，应自行判断交易对方是否具有完全民事行为能力并自行决定是否使用E都市钱包服务与对方进行交易，且您应自行承担与此相关的所有风险。 </p><h3>二、E都市钱包账户注册相关</h3><p>除本协议另有规定或相关产品另有规则外，您须在本网站注册并取得本公司提供给您的E都市钱包账户，或在您于其他阿拉丁旗下网站完成E都市钱包登录名注册，取得E都市钱包账户，并且按照本公司要求提供相关信息完成激活后方可使用本服务。您需使用作为E都市钱包登录名的本人电子邮箱或手机号码，或者本公司允许的其它方式（例如通过扫描二维码、识别生物特征的方式）登录E都市钱包账户，并且您应当自行为E都市钱包账户设置密码。</p><p>您同意：<br>1、按照E都市钱包要求准确提供并在取得该账户后及时更新您正确、最新及完整的身份信息及相关资料。若本公司有合理理由怀疑您提供的身份信息及相关资料错误、不实、过时或不完整的，本公司有权暂停或终止向您提供部分或全部E都市钱包服务。本公司对此不承担任何责任，您将承担因此产生的任何直接或间接支出。若因国家法律法规、部门规章或监管机构的要求，本公司需要您补充提供任何相关资料时，如您不能及时配合提供，本公司有权暂停或终止向您提供部分或全部E都市钱包服务。<br>2、您应当准确提供并及时更新您提供的电子邮件地址、联系电话、联系地址、邮政编码等联系方式，以便本公司与您进行及时、有效联系。您应完全独自承担因通过这些联系方式无法与您取得联系而导致的您在使用本服务过程中遭受的任何损失或增加任何费用等不利后果。您理解并同意，您有义务保持您提供的联系方式的有效性，如有变更需要更新的，您应按本公司的要求进行操作。<br>3、您应及时更新资料（包括但不限于身份证、户口本、护照等证件或其他身份证明文件、联系方式、作为E都市钱包账户登录名的邮箱或手机号码、 与E都市钱包账户绑定的邮箱、手机号码等），否则E都市钱包有权将E都市钱包登录名、E都市钱包账户绑定的邮箱、手机号码开放给其他用户注册或使用。因您未及时更新资料导致的一切后果，均应由您自行承担，该后果包括但不限于导致 本服务无法提供或提供时发生任何错误、E都市钱包账户及该账户内余额被别人盗用，且您不得将此作为取消交易、拒绝付款的理由。<br>4、若您为个人用户, 您确认, 本公司有权在出现下列情形时要求核对您的有效身份证件或其他必要文件, 留存有效身份证件的彩色扫描件, 且完成本公司要求的相关身份认证。您应积极配合，否则本公司有权限制或停止向您提供部分或全部E都市钱包服务：<br>A.您使用E都市钱包服务买卖金融产品或服务的；<br>B.您购买我公司记名预付卡或办理记名预付卡充值的;<br>C.您购买不记名预付卡或通过不记名预付卡为E都市钱包账户单笔充值超过人民币1万元的;<br>D.您要求变更身份信息或您身份信息已过有效期的;<br>E.本公司认为您的交易行为或交易情况出现异常的;<br>F.本公司认为您的身份资料存在疑点或本公司在向您提供服务的过程中认为您已经提供的身份信息或相关资料存在疑点的;<br>G.本公司认为应核对或留存您身份证件或其他必要文件的其他情形的。<br>本条款所称“以上”,包括本数。<br> 5、您在E都市钱包账户中设置的昵称、头像等必须遵守法律法规、公序良俗、社会公德，且不会侵害其他第三方的合法权益，否则E都市钱包有权对您的E都市钱包账户采取限制措施，包括但不限于屏蔽、撤销您E都市钱包账户的昵称、头像，停止提供部分或全部E都市钱包服务。</p>',
					 '用户使用协议');
			},
			// 兼容ios12键盘bug
			inputBlur () {
				if(this.propInfo.place !== 3) {
					window.scrollTo(0,0)
				}
			}
		},
		created(){
			this.change();
			this.$route.query.thisUrl = '/wxInvest';

			if(!this.channelData){
	            this.fanliData = {};
	        }else{
	            this.fanliData = this.channelData;
	        }
			if (!JSON.stringify(this.info)) {
				this.propInfo={
					channelCategory : 0,
					place: 1,
				}
			} else {
				this.propInfo = this.info
			}	
		},
		mounted () {
			this.initGee();
			this.$emit('getRegisteDiv',this.$refs.registeDiv)
			this.$nextTick(function () {
				if(this.btnColor) this.$refs.btnColor.style.backgroundColor = ""+this.btnColor+"";
			})
		},
		watch:{
			mobilePhone(curVal,oldVal){
				if(curVal.length >11){
					this.mobilePhone = oldVal;
				}
　　　　 	},
			messageCode(curVal,oldVal){
				
				if(curVal.length > 6){
					this.messageCode = oldVal;
				}
			},
			validCode(curVal,oldVal){
				if(curVal.length >4){
					this.validCode = oldVal;
				}
			}
		},
		components:{
           'ui-dialog': dialog
		},
	}
</script>

<style lang="scss" scoped>
	.imgCode{
		background-color: rgba(0, 0, 0, 0.5);
		height: 100%;
		width: 100%;
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 888;
		.content{
			height:4.32rem;
			width:8.533333rem;
			position: absolute;
			top:0;
			right:0;
			bottom:0;
			left:0;
			margin:auto;
			padding: 0.666667rem 0.266667rem 0;
			background: #fff;
			border-radius: 0.133333rem;
			overflow: hidden;
			.imgCodeInput{
				height: 1.2rem;
				/* margin-bottom: 0.746667rem; */
				input{
					height:1.2rem;
					width: 4.8rem;
					background: #F9F9F9;
					font-size: 0.373333rem;
					line-height: 1.2rem;
					color:#333;
					padding-left: 0.8rem;
					border-radius: 0.106667rem;
				}
				img{
					margin-left: 0.266667rem;
					height:1.2rem;
					width: 2.933333rem;
					border-radius: 0.08rem;
				}
			}
			.tips{
				padding-top: 0.106667rem;
				padding-left: 0.346667rem;
				font-size:0.293333rem;
				line-height: 0.4rem;
				color: #FF3D3D;
				height:0.746667rem;
			}
			.btns{
				.fl{
					height: 1.2rem;
					width: 3.866667rem;
					font-size: 0.373333rem;
					line-height: 1.2rem;
					text-align:center;
					border-radius: 0.106667rem;
				}
				.close{
					border: 1px solid #4473FF;
					color: #4473FF;
				}
				.getMessageCode{
					margin-left: 0.266667rem;
					background: #4473FF;
					color: #fff;
				}
			}
		}
	}
	.tipBox{
		height:0.8rem;
		margin-left: 1.666667rem;
		min-width:6.666667rem;
		background: rgba(0,0,0,0.6);
		padding: 0 0.26rem;
		position: fixed;
		top: 5rem;
		left: 0;
		border-radius: 0.4rem;
		font-size: 0.346667rem;
		line-height: 0.8rem;
		text-align: center;
		color: #fff;
	}
	.pc-tipbox {
		width: 8rem;
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		margin:0 auto;
	}
	.from{
		width: 100%;
		padding:  0 0.693333rem;
		position: relative;
		.input{
			height:1.2rem;
			margin-bottom: 0.266667rem;
			padding: 0.16rem 0 0 0.853333rem;
			line-height:0.52rem;
			font-size:0.373333rem;
			position: relative;
			input{

				padding-left: 0.586667rem;
				width:7.56rem;
				height:0.853333rem;
				line-height: 0.85rem;
				font-size: 0.373333rem;
				border-radius: 0.053333rem;
			}
			i.clear{
				background: url('https://aliyunsso.edspay.com/web/activity/channel/guanbi.png') no-repeat;
				background-size: 100% 100%;
				position: absolute;
				top: 0.4rem;
				right:0.266667rem;
				height: 0.4rem;
				width: 0.4rem;
			}
		}
		.pwd{
			margin-bottom:0;
			input{
				width:6rem;
			}
		}
		.short{
			input{
				width:4.746667rem
			}
			span{
				width: 2.613333rem;
				height:100%;
				color:#FB6A65;
				text-align:center;
				.valicode_img{
					border-radius: 0.133333rem;
					width: 2.613333rem;
					height:100%;
					float: left;
				}
			}
			.msgBtn{
				margin-top: -0.18rem;
				margin-left: 0.346667rem;
				font-size:0.373333rem;
				line-height:1.173333rem;
				width:2.666667rem;
				height:1.2rem;
				background:#FFCD00;
				border-radius:0.133333rem;
				color:#fff;
			}
		}
		.gou{
			height:0.533333rem;
			padding-left: 0.28rem;
			display: inline-block;
			img{
				margin-top: -0.026667rem;
				display:inline-block;
				vertical-align: text-top;
				height:100%;
				width:0.533333rem;
			}
		}
		.btn{
			height:1.333333rem;
			width:8.0rem;
			margin: 0.266667rem auto 0;
		}
		.login{
			margin-top:0.15rem;
			height:0.533333rem;
			width:1.5rem;
			margin-left:4.15rem;
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
		.jb-gou {
			margin-top: .3rem;
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

