
<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegister">
		<div v-title>邂逅618</div>
		<div class="haoyouphone">HI,您的好友{{$route.query.userName | phoneNumber}}邀您</div>
		<div class="top"></div>
		<invite-register :channel="'yaoqing'" :toLink="'/invite/inviteResult'" :inviterId="inviterId" :gouLists="gouList"></invite-register>
	</div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'
	import getData from '../../../../common/router/getData';		//引入发送请求
	import jiami from 'js-base64';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import inviteRegister from '../wxNewActivityRegisterLogIn';	//引入表单验证
	export default{
		mixins:[wxToapp,getData,verify],
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
				console.log(this.inviterId)
				// this.inviterId = this.$route.query.ui;	//获取邀请人id;
			} 
		},
		mounted() {
			//给app传值标题名
			 this.PassValue('NavWhite_邂逅618');
		},
		watch: { // 监听
		}
	}
</script>

<style lang="scss">
	#inviteRegister{
		background: url('https://aliyunsso.edspay.com/web/wx/activity/618Chance/share_bg.png?v=1.6') no-repeat;
		background-size: 100% 100%;
		// height: 44.693333rem;
        height: 42.746667rem;
		.haoyouphone{
			position: absolute;
			top:1.28rem;
			left:0;
            right: 0;
            margin: auto;
			font-size:.346667rem;
			line-height:0.4rem;
			height:0.4rem;
			color:#fff;
            text-align: center;
		}
		.from{
			    margin-top: 5.6rem;
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
               .login{
                   margin-top: 0rem;
               }
			   .pwd .widths{
				   width: 6.2rem;
			   }
		}
		input{
			font-size:0.4rem
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