<template>
	<div class="password" v-layer>
		<div class="wrraper">
			<div class="title"><span class="span1" @click="showList.isShow = false"></span>确认支付</div>
			<p class="needs_invest_money">￥{{needsMoney | moneyFormat}}</p>
			<p class="small_tips">{{title}}</p>
			<ul class="p_box" :class="{err_show:errorMessage}">
				<li><i class="circle" v-if="ansowerList[0].flag"></i></li>
				<li><i class="circle" v-if="ansowerList[1].flag"></i></li>
				<li><i class="circle" v-if="ansowerList[2].flag"></i></li>
				<li><i class="circle" v-if="ansowerList[3].flag"></i></li>
				<li><i class="circle" v-if="ansowerList[4].flag"></i></li>
				<li><i class="circle" v-if="ansowerList[5].flag"></i></li>
			</ul>
			
			<p class="tips" v-if="errorMessage">{{errorMessage}}</p>
			<p class="forget_pwd" v-if="isSetTradePass == 1" @click="toModifyPwd">忘记密码</p>
			<p class="forget_pwd" v-else></p>
			<ul class="key">
				<li v-for="(item,index) in keyList" @click="keyCheck(index,item)">{{item.keyText}}</li>
				<li class="bg" @click="delePwd"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				errorMessage: '',
				keyList: [
					{keyText: '1'},
					{keyText: '2'},
					{keyText: '3'},
					{keyText: '4'},
					{keyText: '5'},
					{keyText: '6'},
					{keyText: '7'},
					{keyText: '8'},
					{keyText: '9'},
					{keyText: ''},
					{keyText: '0'},
				],
				ansowerList: [
					{
						value1: '',
						value2: '',
						value3:'',
						flag:false,
					},
					{
						value1: '',
						value2: '',
						value3:'',
						flag:false,
					},
					{
						value1: '',
						value2: '',
						value3:'',
						flag:false,
					},
					{
						value1: '',
						value2: '',
						value3:'',
						flag:false,
					},
					{
						value1: '',
						value2: '',
						value3:'',
						flag:false,
					},
					{
						value1: '',
						value2: '',
						value3:'',
						flag:false,
					},
				],
				num:0,
				pwdNum:0,

				pwdArry:{},//设置密码
			}
		},
		props:['showList','againPwd','pwdStr','finalPwd','borrow','toInvestPoint','hideRealname','hidePhone','isSetTradePass','needsMoney'],
		methods: {
			keyCheck(index,item) {
				if( item.keyText != '' ) {
					var that = this;
					this.errorMessage = '';
					if( this.num  < 5 && this.pwdNum == 0 ) {
						this.ansowerList[this.num].value1 = this.keyList[index].keyText;
						this.ansowerList[this.num].flag = true
						this.num = this.num+1
					}else if( this.num == 5 && this.pwdNum == 0 ) {
						this.ansowerList[this.num].value1 = this.keyList[index].keyText;
						this.ansowerList[this.num].flag = true;
						this.title = '确认密码';
						setTimeout(function(){
							for(var i=0; i<=5; i++){
								that.ansowerList[i].flag = false;
							}
						},100);
						this.pwdStrs();
						this.num = 0;
						this.pwdNum = 1;
					} else if( this.num  < 5 && this.pwdNum == 1 ) {
						this.ansowerList[this.num].value2 = this.keyList[index].keyText;
						this.ansowerList[this.num].flag = true
						this.num = this.num+1
					} else if( this.num == 5 && this.pwdNum == 1 ) {
						this.ansowerList[this.num].value2 = this.keyList[index].keyText;
						this.ansowerList[this.num].flag = true;
						this.num = 0;
						this.againPwdStr();
						setTimeout(function(){
							if ( that.pwdStr.setTradePwd == that.againPwd.setTradePwd ) {
								that.pwdArry.pass = that.pwdStr.setTradePwd.substring(0,6);
								that.pwdArry.confirmPass = that.againPwd.setTradePwd.substring(0,6);	
								that.postData('/user/setTradePass', (res,data) => {
									if ( data.resCode == 1 ) {
										that.showList.isShow = false;
										that.pwdNum = 2;
										for( var i = 0; i <= 5; i++ ){
											that.ansowerList[i].flag = false;
											that.ansowerList[i].value1 = '';
											that.ansowerList[i].value2 = '';
										};
										//答案组截取
										that.pwdStr.setTradePwd = that.pwdStr.setTradePwd.substring(0,6);
										that.againPwd.setTradePwd = that.againPwd.setTradePwd.substring(0,6);
										that.toInvestPoint();
									} else {
										for( var i = 0; i <= 5; i++ ){
											that.ansowerList[i].value1 = '';
											that.ansowerList[i].value2 = '';
											that.ansowerList[i].flag = false;
										};
										that.pwdNum = 0;
										that.title = '为了您账户安全，请设置账户密码';
										that.pwdStr.setTradePwd = '';
										that.againPwd.setTradePwd = '';
									}
								},that.pwdArry,1)
							} else {
								for( var i = 0; i <= 5; i++ ){
									that.ansowerList[i].value1 = '';
									that.ansowerList[i].value2 = '';
									that.ansowerList[i].flag = false;
								};
								that.errorMessage = '两次密码不一致，请重新输入';
								that.pwdNum = 0;
								that.title = '为了您账户安全，请设置账户密码';
								that.pwdStr.setTradePwd = '';
								that.againPwd.setTradePwd = '';
							}
							
						},100);
					}else if( this.num  < 5 && this.pwdNum == 2 ) {
						this.ansowerList[this.num].value3 = this.keyList[index].keyText;
						this.ansowerList[this.num].flag = true
						this.num = this.num+1
					}else if( this.num == 5 && this.pwdNum == 2 ) {
						this.ansowerList[this.num].value3 = this.keyList[index].keyText;
						this.ansowerList[this.num].flag = true;
						this.num = 0;
						this.showList.isShow = false;
						this.finalAnsower();
						setTimeout(() =>{
							for( var i = 0; i <= 5; i++ ){
								that.ansowerList[i].flag = false;
								that.ansowerList[i].value3 = '';
							};

							that.finalPwd.setTradePwd = (that.finalPwd.setTradePwd).substring(0,6);
							that.toInvestPoint();
						},50)
					}
				}					
			},
			pwdStrs() { //设置密码
				this.pwdStr.setTradePwd = '';
				for(var i=0; i<this.ansowerList.length; i++){
					this.pwdStr.setTradePwd = this.pwdStr.setTradePwd + this.ansowerList[i].value1;
					console.log(this.pwdStr.setTradePwd)
				}
			},
			againPwdStr() { //确认密码
				this.againPwd.setTradePwd = '';
				for(var i=0; i<this.ansowerList.length; i++){
					this.againPwd.setTradePwd = this.againPwd.setTradePwd + this.ansowerList[i].value2
					console.log(this.againPwd.setTradePwd)
				}
			},
			finalAnsower() { //输入交易密码
				this.finalPwd.setTradePwd = '';
				for(var i=0; i<this.ansowerList.length; i++){
					this.finalPwd.setTradePwd = this.finalPwd.setTradePwd + this.ansowerList[i].value3
					console.log(this.finalPwd.setTradePwd)
				}
			},
			delePwd() {
				if( this.pwdNum == 0 ) {
					this.ansowerList[this.num-1].value1 = '';
					this.ansowerList[this.num-1].flag = false;
					this.num--
					console.log(this.num);
				}else if( this.pwdNum ==1 ) {
					this.ansowerList[this.num-1].value2 = '';
					this.ansowerList[this.num-1].flag = false;
					this.num--
				} else if(this.pwdNum ==2) {
					this.ansowerList[this.num-1].value3 = '';
					this.ansowerList[this.num-1].flag = false;
					this.num--
				}
			},
			toModifyPwd() {
				this.$router.replace({path:'/wxMyAccount/wxForgetPwd',query:{thisUrl:this.$route.fullPath,realHideName:this.hideRealname,phoneNum:this.hidePhone}});
			},
		},
		created() {
			if (this.borrow.isSetTradePass == 0) {
				this.pwdNum = 0;
				this.title = '为了您账户安全，请设置账户密码';
			} else if (this.borrow.isSetTradePass == 1) {
				this.pwdNum = 2;
				this.title = '请输入交易密码';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.password{
		font-family: PingFangSC-Regular;
		.wrraper{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			// height: 10.4rem;
			background: #f8f8f8;
			.span1{
				position: fixed;
			    left: 0rem;
			    width: 2rem;
			    height: 1.2rem;
			}
			.title{
				text-align: center;
				height: 1.2rem;
				line-height: 1.2rem;
				background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/close.png) .2rem .2rem no-repeat;
				background-size: 0.8rem 0.8rem; 
				border-bottom: 1px solid #e5e5e5;
				margin-bottom: 0.4rem;
				font-size: 0.453333rem;
				color: #333333;
			}
			.needs_invest_money{
				font-family: PingFangSC-Medium;
				font-size: 0.533333rem;
				color: #333333;
				text-align: center;
				margin-bottom: 0.266667rem;
			}
			.small_tips{
				font-size: 0.293333rem;
				color: #808080;
				padding-left: 0.4rem;
				margin-bottom: 0.133333rem;
			}
			.tips{
				// height: .9rem;
				// line-height: .9rem;
				// text-align: center;
				text-align: left;
				color:#ff5b4c;
				font-size: 0.293333rem;
				color: #FF5B4C;
				padding-left: 0.4rem;
			}
			.forget_pwd{
				font-size: 0.32rem;
				color: #508CEE;
				padding-right: .4rem;
				text-align: right;
				height: .6rem;
			}
			.p_box{
				width: 9.2rem;
				height: 1.333333rem;
				border:1px solid #a3a3a3;
				margin: 0 auto;
				margin-bottom: 0.266667rem;
				li{
					width: 1.52rem;
					height: 100%;
					border-right: 1px solid #a3a3a3;
					float: left;
					-webkit-tap-highlight-color: #e5e5e5 !important;
					.circle{
						width: 0.16rem;
						height: 0.16rem;
						background: #333333;
						border-radius:0.08rem;
						display: block;
						margin: .55rem .65rem;
					}
				}
				li:last-child{
					border-right: 0;
				}
			}
			.p_box.err_show{
				border:1px solid #ff5c4e;
			}
			.key{
				width: 100%;
				height: 5.76rem;
				background: #ffffff;
				li{
					width: 33.3%;
					height: 1.44rem;
					text-align: center;
					line-height: 1.44rem;
					border-left:1px solid #a3a3a3;
					border-bottom: 1px solid #a3a3a3;
					float: left;
					font-size: 0.533333rem;
					color:#000000;
					-webkit-tap-highlight-color: #e5e5e5 !important;
				}
				li.bg,li:nth-child(10){
					background-color: #d1d5db;
					border-bottom: 0;
				}
				li.bg{
					background: #d1d5db url(https://aliyunsso.edspay.com/web/wx/pointToPoint/guanbi.png) center center no-repeat;
					background-size: 0.626667rem 0.453333rem;
				}
				li:nth-child(11){
					border-bottom: 0;
				}
				li:nth-child(1),li:nth-child(4),li:nth-child(7),li:nth-child(10){
					border-left:0;
				}
			}
		}
	}
</style>