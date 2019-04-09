<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegister">
		<div v-title>注册</div>
		<div class="top"></div>
		<invite-register :channel="'wxAuthorizeBind'" :toLink="'/register/wxAuthorizeBind'" :inviterId="inviterId" :gouLists="gouList"></invite-register>
	</div>
</template>

<script>
	import getData from '../../../../common/router/getData';		//引入发送请求
	import jiami from 'js-base64';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import inviteRegister from '../wxNewActivityRegister';	//引入表单验证
	export default{
		mixins:[getData,verify],
		data(){
			return{
				isIOS:false,
				inviterId:'',	//获取邀请人ID
				colors:'#3A8AFF',
				gouList:[
					'https://aliyunsso.edspay.com/web/wx/activity/myNewInvite/isGou.png',
					'https://aliyunsso.edspay.com/web/wx/activity/myNewInvite/notGou.png'
				]
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
		}
	}
</script>

<style lang="scss">
	#inviteRegister{
		background: url('https://aliyunsso.edspay.com/web/wx/activity/authorize/authRegister.png?v=1.2') no-repeat;
		background-size: 100%;
		height: 43.066667rem;
		.haoyouphone{
			position: absolute;
			top:1.28rem;
			left:5.1rem;
			font-size:0.36rem;
			line-height:0.4rem;
			height:0.4rem;
			color:#fff;
		}
		.from{
			    margin-top: 4.56rem;
			   .short{
			   	span .valicode_img{
			    	margin: 0;
					width: 100%;
					height: 95%;
			    }
			   	 .msgBtn{
			   	 	background: #3A8AFF;
			   	 	color: #fff;
			   	 }
			   	 
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