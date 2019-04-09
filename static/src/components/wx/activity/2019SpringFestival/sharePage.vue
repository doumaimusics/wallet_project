
<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegisterBox">
		<div class="haoyouphone">{{userName  ? userName : ''}}</div>
		<div class="top"></div>
		<!-- 
			'channel', // 渠道名称
			'toLink', // 注册完成跳转的页面 （只限路由）
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
		 -->
		<channels-register
				id="box"    
				channel="lbyq02"
				:toMark = "'1'"
				:inviterId="inviterId" 
				:isInvitation="1"
				btnColor="#ffba25"
				registerCodeTimeColor="#ffe09e"
				registerCodeConfirmColor="#ffba25"
				@isoverflow="isflow=$event" 
				@getRegisteDiv="getRegisteDiv"
			></channels-register>
	</div>
</template>

<script>
	import getData from '../../../../common/router/getData';//引入发送请求
	import jiami from 'js-base64';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import inviteRegister from '../wxNewActivityRegister';	//老的渠道注册模板
	import channelsRegister from '../wxChannelsRegister';	//新的渠道注册模板
	export default{
		mixins:[getData,verify],
		data(){
			return{
				isIOS:false,
				registeRef: {}, // 注册框dom
				inviterId:'',	//获取邀请人ID
				colors:'#3A8AFF',
				userName:'',
				activityStatus:1,
			}
		},
		methods:{
			// 获取注册框dom
			getRegisteDiv (val) {
				this.registeRef = val
				this.$nextTick(function () {
					this.registeRef.style.top = '6.506667rem'
				})
			},
		},
		components:{
			inviteRegister,
			channelsRegister
		},
		created(){
			this.change();
			this.getRegisteDiv()
			if(this.$route.query.ui){
				this.inviterId = this.$route.query.ui;	//获取邀请人id;
				console.log(this.inviterId)
			} 
			this.userName = this.$route.query.userName;
			this.userName = this.userName.replace(/\s+/g,"+")
			this.userName = Base64.decode(this.userName);
		},
		mounted() {
			// 友盟数据统计
			const script = document.createElement('script');
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275517978&web_id=1275517978';
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		watch: { // 监听
			'$route' () {
				if(window._czc) { // 友盟数据统计监听
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		}
	}
</script>


<style lang="scss">
	#inviteRegisterBox{
		background: url('https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/register_bg.png?v=1.0') no-repeat;
		background-size: 100%;
		height: 27.266667rem;
		.haoyouphone{
			position: absolute;
			top:3.9rem;
			left: 0;
			width: 100%;
			font-size:0.373333rem;
			line-height:0.4rem;
			height:0.4rem;
			color:#ef594b;
			text-align:center;

		}
		.top{
			height: 0.2rem;
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