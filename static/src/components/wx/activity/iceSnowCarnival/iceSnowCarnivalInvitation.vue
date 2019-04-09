
<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegister">
		<div class="top">
			<!-- <router-link :to="{path:'wxRankingList'}" class="toList" tag="div"></router-link> -->
		</div>
		<!--<div class="list">
			<ul class="redList" ref="ulList">
				<li class="fl" v-for="item in redList" ref="redItem">{{item}}</li>
			</ul>
		</div>-->
		<div class="run_bg">
			<div class="person_box"></div>
			<ul>
				<li v-for="(listVal,index) in getRedList">
					<div class="activeBg" @click="slideFn"></div>
				</li>
			</ul>
		</div>
		<invite-register :toLink="'/wxLogin'" :inviterId="inviterId"></invite-register>
		<!-- <div class="from">
			<div class="phone input">
				<input v-model="mobilePhone" type="text" placeholder="请输入常用手机号">
			</div>
			<div class="code input short">
				<input class="fl" v-model="validCode" type="text" placeholder="请输入图片验证码">
				<span class="fl"><img @click="change" :src="codeImg" class="valicode_img fr"></span>
			</div>
			<div class="message input short">
				<input class="fl" v-model="code" type="text" placeholder="请输入短信验证码">
				<span v-if="showBtn" @click="send" class="fl msgBtn">{{btnText}}</span>
				<span v-else class="fl msgBtn" :class="{active:!showBtn}">{{time}}秒</span>
			</div>
			<div class="pwd input">
				<input class="fl" v-model="pwd" type="text" placeholder="请设置8——16位密码">
				<span class="fl"></span>
			</div>
			<div @click="isGou = !isGou" class="gou"><img :src="isGou ? gouList[0]:gouList[1]" alt=""></div>
			<div @click="goReg" class="btn"></div>
			<router-link :to="{path:'/wxLogin',query:{thisUrl:'/wxInvest'}}" class="login" tag="div"></router-link>
		</div> -->
	</div>
</template>

<script>
	import getData from '../../../../common/router/getData';		//引入发送请求
	import jiami from 'js-base64';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import inviteRegister from '../wxActivityRegister';	//引入表单验证
	export default{
		mixins:[getData,verify],
		data(){
			return{
				// btnText:'获取验证码',
				// time:60,
				// showBtn:true,
				// mobilePhone:'',
				// isGou:true,
				// validCode:'',
				// code:'',
				// pwd:'',
				// tokenId:'',
				// gouList:[
				// 	'https://aliyunsso.edspay.com/web/wx/activity/invitation/isGou.png',
				// 	'https://aliyunsso.edspay.com/web/wx/activity/invitation/notGou.png'
				// ],
				isIOS:false,
				timer:null,
				inviterId:'',	//获取邀请人ID
				getRedList: [  //球球列表
				    1,2,3,4,5,6,7,8
				],   
//				redList:[
//					'用户183****2039获得佣金40元',
//					'用户138****6155获得佣金40元',
//					'用户150****9246获得佣金150元',
//					'用户153****2470获得佣金60元',
//					'用户187****7978获得佣金80元',
//					'用户156****8660获得佣金150元',
//					'用户189****0219获得佣金200元',
//					'用户139****4533获得佣金80元',
//					'用户136****7337获得佣金100元',
//					'用户131****0990获得佣金150元',
//					'用户150****6315获得佣金80元',
//					'用户150****4476获得佣金500元',
//					'用户132****5288获得佣金300元',
//					'用户150****8130获得佣金180元',
//					'用户150****2349获得佣金500元',
//					'用户136****2067获得佣金200元',
//					'用户187****3539获得佣金40元',
//					'用户193****8769获得佣金150元',
//				]
			}
		},
		/*methods:{
			checkInput(){
				if(this.isEmpty(this.mobilePhone,'手机号不能为空！',1)) return false;
				if(this.isFormat(this.mobilePhone,'手机号格式不正确！','mobileReg',1)) return false;
				if(this.isEmpty(this.validCode,'请输入验证码！',1)) return false;
				return true;
			},
			send(){
				var that = this;
				if(this.checkInput()){
					this.notLogPost('/user/getPhoneCode',(data) =>{
						if(data.resCode){
							codeSuc();
						}
					},{mobilePhone:this.mobilePhone,validCode:this.validCode,tokenId:this.fingerprint,captchaId:this.captchaId},1)
				}

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
			goReg(){
				if(!this.checkInput()) return;
				if(this.isEmpty(this.code,'短信验证码不能为空！',1)) return false;
				if(this.isEmpty(this.pwd,'请输入8-16位字符，其中包括至少一个字母和一个数字！',1)) return false;
				if(this.isFormat(this.pwd,'密码格式不正确！','passwordReg',1)) return false;
				if(!this.isGou){
					this.toast({text:'请勾选服务条款'});
					return;
				}

				this.notLogPost('/user/doRegister',(data) =>{
					if(data.resCode){

					}
				},{code:this.code,pwd:this.pwd,tokenId:this.fingerprint,source:3,channel:null},1)
			}
		},*/
		methods: {
			slideFn(){
				if(!this.osType) {
					$(document).scrollTop(850);
				}
			}
		},
		components:{
			inviteRegister,
		},
		created(){
			this.change();
			if(this.$route.query.ui){
				this.inviterId = Base64.encode(this.$route.query.ui);	//获取邀请人id;
			} 
		},
		mounted(){
//			var that = this;
//			var index = 0;
//			var ulWidth = this.$refs.redItem[0].clientWidth*(this.redList.length-1)
//			this.$refs.ulList.style.width = (ulWidth+this.$refs.redItem[0].clientWidth) + 'px';
//			this.timer = window.setInterval(function(){
//				if(index >= ulWidth){
//					index = 0
//				}
//				that.$refs.ulList.style.left = -(ulWidth-(ulWidth - (index++))) + 'px';
//			},24)
//			const ua = navigator.userAgent.toLowerCase()
//			if(/iphone|ipad|ipod/.test(ua)){
//				this.isIOS = true;
//			}
		},
		destroyed(){
//			clearInterval(this.timer)
		}
	}
</script>

<style lang="scss">
		/*球球 动画*/
	
	@-webkit-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-o-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-moz-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-ms-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	#inviteRegister{
		background: url('https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/fx_bg.png?v=1.0') no-repeat;
		background-size: 100%;
		height: 43.8rem;
		padding-top: 6.8rem;
		.run_bg{
			    width: 100%;
			    height: 8.866666rem;
			    background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/run_bg.png?v=1.2) no-repeat;
			    background-size: cover;
			    position: relative;
			    .person_box{
			    	    width: 2.266666rem;
					    height: 2.266666rem;
					    background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/person1.png?v=1.0) no-repeat;
					    background-size: cover;
					    text-align: center;
					    line-height: 1rem;
					    position: absolute;
					    top: -1rem;
					    left: 0rem;
					    z-index: 98;
			    }
			    ul{
			    	 width: 100%;
				    height: 100%;
				    position: relative;
			   
			    li{
			    	.activeBg{
			    		position: absolute;
			    	}
			    }
			  li:nth-child(1) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get1.png?v=1.0) no-repeat;
								background-size: cover;
								left: 3.6rem;
								top: -1.2rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(2) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get2.png?v=1.0) no-repeat;
								background-size: cover;
								left: 6.8rem;
								top: -1.5rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}
						li:nth-child(3) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get3.png?v=1.0) no-repeat;
								background-size: cover;
								left: 5.5rem;
								top: 2.1rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(4) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get4.png?v=1.0) no-repeat;
								background-size: cover;
								left: 2.7rem;
								top: 2.4rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}
						li:nth-child(5) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get5.png?v=1.0) no-repeat;
								background-size: cover;
								left: 0;
								top: 3.7rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(6) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get6.png?v=1.0) no-repeat;
								background-size: cover;
								left: 3rem;
								top: 6rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}
						li:nth-child(7) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get7.png?v=1.0) no-repeat;
								background-size: cover;
								left: 5.5rem;
								top: 6rem;
								-webkit-animation: sf 3.5s infinite;
								-moz-animation: sf 3.5s infinite;
								-ms-animation: sf 3.5s infinite;
								animation: sf 3.5s infinite;
							}
						}
						li:nth-child(8) {
							    .activeBg {
								width: 1.693333rem;
								height: 1.826666rem;
								background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/get8.png?v=1.0) no-repeat;
								background-size: cover;
								left: 8.2rem;
								top: 6rem;
								-webkit-animation: sf 3s infinite;
								-moz-animation: sf 3s infinite;
								-ms-animation: sf 3s infinite;
								animation: sf 3s infinite;
							}
						}  
						 }
		}
		.from{
			    margin-top: 0.63rem;
			   .short{
			   	span .valicode_img{
			    	margin: 0;
					width: 100%;
					height: 95%;
			    }
			   	 .msgBtn{
			   	 	background: #3A8AFF!important;
			   	 	color: #fff;
			   	 }
			   	 .msgBtn.active{
			   	 	background: #fff!important;
			   	 	color: #ef5d36;
			   	 }
			   	 
			   	 
			   	 
			   } 
			   .btn{
			   	    margin-top: 0.2rem;
			   }
			   .gou img{
			   	 	display: none;
			   	 }
		}
		input{
			font-size:0.4rem;
		}
		.liStyle{
			font-size: 9px!important;
			line-height:16px!important;
		}
		.top{
			    height: 3.386667rem;
			    padding-top: 9.333333rem;
			.toList{
				height:2.0rem;
			}
		}
		.list{
			height:1.066666rem;
			width:7.5rem;
			overflow: hidden;
			margin:0 auto;
			ul{
				position:relative;
				left:0px;
				height: 100%;
				line-height: 1.066666rem;
				li{
					width:6rem;
					height: 100%;
					color:white;
					text-align: center;
					line-height: 1.066666rem!important;
					font-size: 0.346667rem;
				}
			} 
		}
	}
</style>