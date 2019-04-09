<template>
	<div id="wxTradePwd">
		<wx-header :logo="headTitle[hasPwd]"></wx-header>
		<form action="" v-if="hasPwd == 0">
			<div class="wrraper">
				<div class="input_row clear" :class="{active:pwdBg[0]}">
					<label for="">交易密码</label>
					<ul @click="setNewPwd">
						<li v-if="newPwd[0].flag"></li>
						<li v-if="newPwd[1].flag"></li>
						<li v-if="newPwd[2].flag"></li>
						<li v-if="newPwd[3].flag"></li>
						<li v-if="newPwd[4].flag"></li>
						<li v-if="newPwd[5].flag"></li>
					</ul>
				</div>
				<div class="tips">
					<p class="tip_message">请输入由6位数字组成的新交易密码</p>
				</div>
				<div class="input_row clear" :class="{active:pwdBg[1]}">
					<label for="">确认密码</label>
					<ul @click="setAgainPwd">
						<li v-if="againPwd[0].flag"></li>
						<li v-if="againPwd[1].flag"></li>
						<li v-if="againPwd[2].flag"></li>
						<li v-if="againPwd[3].flag"></li>
						<li v-if="againPwd[4].flag"></li>
						<li v-if="againPwd[5].flag"></li>
					</ul>
				</div>
				<div class="tips">
					<p class="tip_message">请再次输入新交易密码</p>
				</div>
			</div>
			<div class="regTips" :class="{tipShow:tipShow}">
				<i class="el-icon-circle-cross"> </i>
				{{errorMsg}}
			</div>
			<div class="loginBtn active" v-if="againPwd[0].value && newPwd[0].value" @click="setComfirm">确认</div>
			<div class="loginBtn" v-else>确认</div>
		</form>
		<form action="" v-else-if="hasPwd == 1">
			<div class="wrraper">
				<div class="input_row clear" :class="{active:pwdBg[2]}">
					<label for="">原交易密码</label>
					<ul @click="setOldPwd">
						<li v-if="oldPwd[0].flag"></li>
						<li v-if="oldPwd[1].flag"></li>
						<li v-if="oldPwd[2].flag"></li>
						<li v-if="oldPwd[3].flag"></li>
						<li v-if="oldPwd[4].flag"></li>
						<li v-if="oldPwd[5].flag"></li>
					</ul>
				</div>
				<div class="tips">
					<p class="tip_message">请输入原交易密码</p>
				</div>
				<div class="input_row clear" :class="{active:pwdBg[0]}">
					<label for="">新交易密码</label>
					<ul @click="setNewPwd">
						<li v-if="newPwd[0].flag"></li>
						<li v-if="newPwd[1].flag"></li>
						<li v-if="newPwd[2].flag"></li>
						<li v-if="newPwd[3].flag"></li>
						<li v-if="newPwd[4].flag"></li>
						<li v-if="newPwd[5].flag"></li>
					</ul>
				</div>
				<div class="tips">
					<p class="tip_message">请输入由6位数字组成的新交易密码</p>
				</div>
				<div class="input_row clear" :class="{active:pwdBg[1]}">
					<label for="">确认密码</label>
					<ul @click="setAgainPwd">
						<li v-if="againPwd[0].flag"></li>
						<li v-if="againPwd[1].flag"></li>
						<li v-if="againPwd[2].flag"></li>
						<li v-if="againPwd[3].flag"></li>
						<li v-if="againPwd[4].flag"></li>
						<li v-if="againPwd[5].flag"></li>
					</ul>
				</div>
				<div class="tips">
					<p class="tip_message">请再次输入新交易密码</p>
				</div>
			</div>
			<div class="regTips" :class="{tipShow:tipShow}">
				<i class="el-icon-circle-cross"> </i>
				{{errorMsg}}
			</div>
			<div class="loginBtn active" v-if="againPwd[0].value && newPwd[0].value && oldPwd[0].value" @click="modifyComfirm">确认</div>
			<div class="loginBtn" v-else>确认</div>
			<p class="forget_pwd"><span @click="toSetForPwd">忘记密码</span></p>
			
		</form>
		<key-boards v-if="closeBth.isShow" :closeBth="closeBths" :keyCheck="keyCheck" :delePwd="delePwd"></key-boards>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader';
	import keyBoards from '../../../public/wx/keyBoards';	//密码组件
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import wxToapp from '../../../../common/wx/wxToapp';
	import wxToast from '../../../../common/wx/wxToast'; //引入toast提示
	export default {
		mixins: [verify,wxToapp,wxToast],
		data(){
			return {
				headTitle: ['设置交易密码','修改交易密码'],
				tipShow: false,
				errorMsg:'',
				hasPwd: '',//1为修改密码，0为设置密码
				checkPwd: 0,
				closeBth: {
					isShow: false,
				},
				newPwd: [
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
				],
				againPwd: [
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
				],
				oldPwd: [
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
					{
						value: '',
						flag: false,
					},
				],
				keyNum: { //密码输出下标
					newNum: 0,
					againNum: 0,
					oldNum: 0,
				},
				pwdType: 0,//三种密码形式
				newPwdStr: '',//设置密码输出
				againPwdStr: '',//确认密码输出
				oldPwdStr: '',//原来密码输出
				apiSetArry:{}, //设置密码传参后台
				apiModifyArry:{}, //修改密码传参后台
				realHideName:'',//加密姓名
				hidePhone:'',//加密电话号码
				setTypePwd:['',1],//空为正常设置密码，1忘记密码后设置密码
				typeIndex:'',
				openZsShow:'',
				thisUrl:'',
				pwdBg:[
					false,
					false,
					false,
				],
			}
		},
		methods: {
			bgLight() { //点击当前输入密码框变量
				for(let i=0;i<this.pwdBg.length;i++){
					this.$set(this.pwdBg,i, false);
				}
			},

			setNewPwd() { //点击设置新密码输入框
				this.bgLight();
				this.$set(this.pwdBg, 0, true);
				if ( this.hasPwd == 1 ) {
					if ( this.oldPwd[5].value !='' ){
						this.pwdType = 0;
						this.closeBth.isShow = true;
					} else if ( this.oldPwd[5].value =='' ) {
						this.closeBth.isShow = false;
						this.pwdType = 2;
						this.tipShow = true;
						this.popModal({str:'请完成上面交易密码输入!'},2000);
					}
				} else if ( this.hasPwd == 0 ) {
					this.closeBth.isShow = true;
					this.pwdType = 0;
				}
				
			},

			toSetForPwd() { //忘记密码
				this.$router.replace({path:'/wxMyAccount/wxForgetPwd',query:{ thisUrl:this.thisUrl}})
			},

			setAgainPwd() { //点击再次确认密码输入框
				this.bgLight();
				this.$set(this.pwdBg, 1, true);
				if ( this.newPwd[5].value !='' ) {
					this.closeBth.isShow = true;
					this.pwdType = 1;
				}else if ( this.newPwd[5].value =='' ) {
					this.closeBth.isShow = false;
					this.pwdType = 0;
					this.tipShow = true;
					this.popModal({str:'请完成上面交易密码输入!'},2000);
				}
			},

			setOldPwd() { //点击原密码输入框
				this.bgLight();
				this.$set(this.pwdBg, 2, true);
				this.closeBth.isShow = true;
				this.pwdType = 2;
			},

			keyCheck(index,item){  //设置密码
				if ( item.keyText != '' ) {
					if ( this.keyNum.newNum < 5 && this.pwdType == 0 ) {
						console.log(this.keyNum.newNum);
						this.newPwd[this.keyNum.newNum].value = item.keyText;
						this.newPwd[this.keyNum.newNum].flag = true;
						this.keyNum.newNum++
					} else if ( this.keyNum.newNum == 5 && this.pwdType == 0 ) {
						console.log(this.keyNum.newNum);
						this.newPwd[this.keyNum.newNum].value = item.keyText;
						this.newPwd[this.keyNum.newNum].flag = true;
						this.keyNum.newNum++
						this.closeBth.isShow = false;
						this.bgLight();
					}else if ( this.keyNum.againNum < 5 && this.pwdType == 1 ) {
						console.log(this.keyNum.againNum);
						this.againPwd[this.keyNum.againNum].value = item.keyText;
						this.againPwd[this.keyNum.againNum].flag = true;
						this.keyNum.againNum++
					} else if ( this.keyNum.againNum == 5 && this.pwdType == 1 ) {
						console.log(this.keyNum.againNum);
						this.againPwd[this.keyNum.againNum].value = item.keyText;
						this.againPwd[this.keyNum.againNum].flag = true;
						this.keyNum.againNum++
						this.closeBth.isShow = false;
						this.bgLight();
					} else if ( this.keyNum.oldNum < 5 && this.pwdType == 2 ) {
						console.log(this.keyNum.oldNum);
						this.oldPwd[this.keyNum.oldNum].value = item.keyText;
						this.oldPwd[this.keyNum.oldNum].flag = true;
						this.keyNum.oldNum++
					} else if ( this.keyNum.oldNum == 5 && this.pwdType == 2 ) {
						console.log(this.keyNum.oldNum);
						this.oldPwd[this.keyNum.oldNum].value = item.keyText;
						this.oldPwd[this.keyNum.oldNum].flag = true;
						this.keyNum.oldNum++
						this.closeBth.isShow = false;
						this.bgLight();
					}
				}
			},

			pwdStrs() { //设置密码
				this.newPwdStr = '';
				for ( var i=0; i<this.newPwd.length; i++ ) {
					this.newPwdStr = this.newPwdStr + this.newPwd[i].value;
					console.log(this.newPwdStr)
				}
			},

			againPwdStrs() { //确认密码
				this.againPwdStr = '';
				for ( var i=0; i<this.againPwd.length; i++ ) {
					this.againPwdStr = this.againPwdStr + this.againPwd[i].value
					console.log(this.againPwdStr)
				}
			},

			oldPwdStrs() { //原密码
				this.oldPwdStr = '';
				for ( var i=0; i<this.oldPwd.length; i++ ) {
					this.oldPwdStr = this.oldPwdStr + this.oldPwd[i].value
					console.log(this.oldPwdStr)
				}
			},

			delePwd() {  //删除
				if ( this.pwdType == 0 ) {
					// console.log(this.num+'当前');
					this.newPwd[this.keyNum.newNum-1].value = '';
					this.newPwd[this.keyNum.newNum-1].flag = false;
					this.keyNum.newNum--
					console.log(this.keyNum.newNum);
				} else if ( this.pwdType == 1 ) {
					this.againPwd[this.keyNum.againNum-1].value = '';
					this.againPwd[this.keyNum.againNum-1].flag = false;
					this.keyNum.againNum--
					console.log(this.keyNum.againNum);
				} else if ( this.pwdType == 2 ) {
					this.oldPwd[this.keyNum.oldNum-1].value = '';
					this.oldPwd[this.keyNum.oldNum-1].flag = false;
					this.keyNum.oldNum--
					console.log(this.keyNum.oldNum);
				}
			},

			closeBths() {
				this.closeBth.isShow = false;
			},

			modifyComfirm() { //修改密码
				this.pwdStrs();
				this.againPwdStrs();
				if ( parseInt(this.newPwdStr) != parseInt(this.againPwdStr) ) {
					this.popModal({str:'两次密码输入不一致!'},2000);
					for( var i=0; i<=5; i++ ) {
						this.newPwd[i].value = '';
						this.newPwd[i].flag = false;
						this.againPwd[i].value = '';
						this.againPwd[i].flag = false;
					}
					this.newPwdStr = '';
					this.againPwdStr = '';
					this.closeBth.isShow = false;
					this.keyNum.newNum = 0;
					this.keyNum.againNum = 0;
				} else if ( parseInt(this.newPwdStr) == parseInt(this.againPwdStr ) ) {
					this.oldPwdStrs();
					this.apiModifyArry.newPass = this.newPwdStr.substring(0,6);
					this.apiModifyArry.confirmPass = this.againPwdStr.substring(0,6);
					this.apiModifyArry.oldPass = this.oldPwdStr.substring(0,6);
					this.postData('/user/updateTradePass', (res,data) => {  
						if ( data.resCode == 1 ) {

							this.$router.replace({path:this.thisUrl});
							this.toast({text:'密码修改成功'});
						} else {
							this.newPwdStr = '';
							this.againPwdStr = '';
							this.oldPwdStr = '';
							this.keyNum.newNum = 0;
							this.keyNum.againNum = 0;
							this.keyNum.oldNum = 0;
							for( var i=0; i<=5; i++ ) {
								this.newPwd[i].value = '';
								this.newPwd[i].flag = false;
								this.againPwd[i].value = '';
								this.againPwd[i].flag = false;
								this.oldPwd[i].value = '';
								this.oldPwd[i].flag = false;
							}
						}
					}, this.apiModifyArry, 1);
				}
			},
			setComfirm() {  //设置密码
				this.pwdStrs();
				this.againPwdStrs();
				if ( parseInt(this.newPwdStr) != parseInt(this.againPwdStr) ) {
					this.popModal({str:'两次密码输入不一致!'},2000);
					for( var i=0; i<=5; i++ ) {
						this.newPwd[i].value = '';
						this.newPwd[i].flag = false;
						this.againPwd[i].value = '';
						this.againPwd[i].flag = false;
					}
					this.newPwdStr = '';
					this.againPwdStr = '';
					this.closeBth.isShow = false;
					this.keyNum.newNum = 0;
					this.keyNum.againNum = 0;
				} else if ( parseInt(this.newPwdStr) == parseInt(this.againPwdStr ) ) {
					this.apiSetArry.pass = this.newPwdStr.substring(0,6);
					this.apiSetArry.confirmPass = this.againPwdStr.substring(0,6);
					this.apiSetArry.setPassType = this.setTypePwd[this.typeIndex];
					this.postData('/user/setTradePass', (res,data) => { // /user/updateTradePass
						if ( data.resCode == 1 ) {
							this.toast({text:'密码设置成功'});
							this.$router.replace({path:this.thisUrl,query:{isSetTradePass:1,czbShowFlag:this.openZsShow,hideRealname:this.realHideName,phoneNum:this.hidePhone}})
						} else {
							this.newPwdStr = '';
							this.againPwdStr = '';
							this.keyNum.newNum = 0;
							this.keyNum.againNum = 0;
							for( var i=0; i<=5; i++ ) {
								this.newPwd[i].value = '';
								this.newPwd[i].flag = false;
								this.againPwd[i].value = '';
								this.againPwd[i].flag = false;
							}
						}
					}, this.apiSetArry, 1);
				}
			},
		},
		components:{
			wxHeader,
			keyBoards,
		},
		created() {
			this.hasPwd = this.$route.query.pwdManage;
			this.typeIndex = this.$route.query.typePwd;
			this.thisUrl = this.$route.query.thisUrl;
		}
	}
</script>
<style lang="scss" scoped>
	#wxTradePwd{
		font-family: PingFangSC-Regular;
		min-height: 17.786667rem;
		width: 100%;
		background: #ffffff;
		.wrraper{
			width: 100%;
			margin: 0 auto;
		    padding-top: 0.4rem;
			.input_row{
				width: 9.6rem;
				height: 1.4rem;
				background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/pwd_bg.png) no-repeat;
				background-size: 9.2rem 1.306667rem;
				margin-left: 0.4rem;
				label{
					width: 2.466667rem;
					height: 1.306667rem;
					line-height: 1.306667rem;
					font-size: 0.426667rem;
					color: #333333;
					text-align: center;
					display: inline-block;
					float: left;
				}
				ul{
					width: 7.1rem;
					height: 1.306667rem;
					float: left;
					li{
						width: 0.16rem;
						height: 0.16rem;
						background: #333333;
						border-radius:0.08rem;
						margin: .6rem .48rem;
						float: left;
					}
				}
				.input{
					width: 7.2rem;
					float: left;
					letter-spacing: 0.96rem;
					text-indent: .45rem;
					height: 1.306667rem;
					overflow: hidden;
				}
			}
			.input_row.active{
				background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/pwd_bg_active.png) no-repeat;
				background-size: 9.2rem 1.306667rem;
			}
			.tips{
				height: 0.7rem;
				font-size: 0.293333rem;
				padding-left: .4rem;
				p{
					height: .7rem;
					line-height: .7rem;
				}
			}
		}
		.loginBtn{
			width:9.2rem;
			display:block;
			margin:0 auto;
			background:#E4E4E4;
			font-size: 0.426667rem;
			height:1.066667rem;
			text-align: center;
			line-height:1.066667rem;
			border-radius:4px;
			color:#fff;
			margin-top:.4rem;
		}
		.loginBtn.active{
			background:#ff5a4a;
		}
		.forget_pwd{
			text-align: right;
			width: 9.2rem;
			margin: 0 auto;
			margin-top: .3rem;
			span{
				font-size: 0.373333rem;
				color: #508CEE;
			}
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