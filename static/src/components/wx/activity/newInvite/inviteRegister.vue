
<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegisterBox">
		<div class="haoyouphone">{{userName  ? userName : ''}}</div>
		<div class="top"></div>
		<!-- <div class="list">
			<ul class="redList" ref="ulList">
				<li class="fl" v-for="item in redList" ref="redItem">{{item}}</li>
			</ul>
		</div> -->
		<channels-register
				id="box"
				toLink="/invite/inviteResult"
				channel="lbyq01"
				:inviterId="inviterId" 
				:isInvitation="1"
				:isCnzz="1"
				btnColor="#ffba25"
				registerCodeTimeColor="#ffe09e"
				registerCodeConfirmColor="#ffba25"
				@isoverflow="isflow=$event" 
				@getRegisteDiv="getRegisteDiv"
			></channels-register>
		<!-- <invite-register :channel="'lbyq01'" :toLink="'/invite/inviteResult'" :inviterId="inviterId" :gouLists="gouList"></invite-register> -->
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
		background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/inviteRegister2.png') no-repeat;
		background-size: 100%;
		height: 45.133333rem;
		.haoyouphone{
			position: absolute;
			top:2.48rem;
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