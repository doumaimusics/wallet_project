<!-- wxAuthorizeIntroduction.vue -->
<template>
	<div class="introdution">
		<div v-title>账号绑定</div>
		<!-- <div class="step step1"></div>
		<div class="step step2"></div> -->
		<!-- 底部按钮 -->
		<div class="bottom clear">
			<div class="shareBtn" @click="toShare"></div>
			<div class="bingWx" @click="bindWx" v-clipboard:copy="'EDSpay'"></div>
		</div>
		<!-- 活动须知按钮 -->
		<div class="ruleBtn" @click="showRule"></div>
		<!-- 蒙层 -->
		<div class="layer" v-if="layerBox"></div>
		<!-- 打开微信弹框 -->
		<div class="dialog" v-if="isShow">
			<div class="btns clear">
				<div class="btn cancel" @click="cancelDialog"></div>
				<div class="btn" @click="openWx"></div>	
			</div>
			
		</div>
		<!-- 活动须知弹框 -->
		<div v-if="rule" class="rules">
			<a href="tel:400-135-3388"></a>
			<div v-if="osType != 'IOS'" class="iosShow"></div>
			<div class="closeBtn" @click="closeRule"></div>
		</div>
		<!-- wx显示分享蒙层 -->
		<div v-if="showShare" v-layer @click="showShare = false" class="showShare">
		    <img src="https://aliyunsso.edspay.com/web/wx/activity/authorize/wx_share.png" alt="">
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';     // APP交互函数
	import wxShare from '../../../../common/wx/wxShare';
	export default {
		mixins:[wxToapp,wxShare],
		data() {
			return {
				isShow:false,//打开微信弹框
				layerBox:false,//蒙层
				rule:false,//活动须知弹框
                shareObj: {              //分享标题内容配置
					title: "定情礼请收下！", //标题
				    desc: "送100积分+100元红包，100%有礼！", // 内容
					link: global.host + "wxAuthorizeIntroduction", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/authorize/shareIcon.png" //图片链接
                },
                showShare:false,
			}
		},
		methods:{
			// 打开微信弹框
			openWx(){
				_czc.push(﻿["_trackEvent", "打开微信", "打开微信"]);
				this.PassValue('AwakeWx');
				this.isShow = false;
				this.layerBox = false;
			},
			// 去分享
			toShare(){
				if(this.osType){
					this.PassValue(this.appShare);
				}else{
					this.showShare = true;
				}
			},
			// 关系打开微信弹框
			cancelDialog(){
				this.isShow = false;
				this.layerBox = false;
			},
			// 点击立即绑定按钮
			bindWx(){
				if(this.osType){
					this.layerBox = true;
					this.isShow = true;
				}else{
					window.location.href = '/#/register/wxAuthorizeBind?redirectUrL=/register/wxAuthorizeBind'
					// this.$router.replace({path:'/register/wxAuthorizeBind',query:{redirectUrL:'/register/wxAuthorizeBind'}})
				}
				
			},
			// 点击活动须知按钮
			showRule(){
				this.layerBox = true;
				this.rule = true;
			},
			//关闭活动须知
			closeRule(){
				this.layerBox = false;
				this.rule = false;
			}
		},
		mounted() {
			this.PassValue('NavWhite_账号绑定')
			this.getWxShareData(this.shareObj); //分享调用
			//友盟数据
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275096339&web_id=1275096339'
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
	    watch: {
	    	'$route'() {
	    		if (window._czc) {
	    			let location = window.location
	    			let contentUrl = location.pathname + location.hash
	    			let refererUrl = '/'
	    			window._czc.push(['_trackPageview', contentUrl, refererUrl])
	    		}
	    	}
	    },
	    created(){
	    	
	    }
	}
</script>
<style lang="scss" scoped>
	.introdution{
		position: relative;
		width: 100%;
		height: 33.586667rem;
		background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/introdution_bg.png) no-repeat;
		background-size: cover;
		.step{
			width: 5.293333rem;
			height: 9.413333rem;
			position: relative;
			margin: 0 auto;
		}
		.step1{
			top: 17.506667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/step1.gif) no-repeat;
			background-size: cover;
		}
		.step2{
			top: 22.44rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/step2.gif) no-repeat;
			background-size: cover;
		}
		.layer{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			bottom: 0;
			right: 0;
			margin: auto;
			background: rgba(0,0,0,.6);
			z-index: 99;
		}
		.dialog{
			position: fixed;
			width: 9.92rem;
			height: 7.373333rem;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/open_wx.png) no-repeat;
			background-size: cover;
			margin: auto;
            z-index: 100;
			text-align: center;
		}

		.ruleBtn{
			position: fixed;
			width: 1.48rem;
			height: 1.48rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/ruleBtn.png) no-repeat;
			background-size: cover;
			right: 0.373333rem;
			top: 0rem;
		}
		.rules{
			position: fixed;
			width: 8.653333rem;
			height: 13.08rem;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			background:url(https://aliyunsso.edspay.com/web/wx/activity/authorize/rule_dialog.png?v1.1) no-repeat;
			background-size: cover;
			margin: auto;
            z-index: 100;
			text-align: center;
			padding-top: 9rem;
			a{
				display: inline-block;
			    width: 3rem;
			    height: .5rem;
			    position: relative;
			    left: 2.8rem;
			}
			.iosShow{
				width: 7.5rem;
			    background: #fff;
				height: 1.2rem;
				margin: 0 auto;
			}
			.closeBtn{
				position: absolute;
				top: 11.1rem;
				width: 7.333333rem;
				height: 1.333333rem;
				left: 1rem;
			}
		}
		.btns{
			width: 7.333333rem;
			height: 0.96rem;
			margin: 0 2.146667rem;
			position: relative;
			top: 4.6rem;
		}
		.cancel{
			margin-right: 0.533333rem;
		}
		.btn{
			width: 2.986667rem;
			height: 0.96rem;
			float: left;
		}
		.bottom{
			width: 100%;
			height: 1.253333rem;
			left: 0;
			bottom: 0;
			position: fixed;
			z-index: 98;
			.shareBtn{
				width: 3.466667rem;
				height: 1.253333rem;
				position: relative;
				float: left;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/share.png) no-repeat;
				background-size: cover;
			}
			.bingWx{
				width: 6.533333rem;
				height: 1.253333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/authorize/bind_info.png) no-repeat;
				background-size: cover;
				float: left;
			}
		}
		.showShare{

		    img{
		        display:block;
		        width:6.093333rem;
		        height: 5.44rem;
		        top: 0.32rem;
		        position: relative;
		        left: 2.6rem;
		    }
		}
	}
</style>