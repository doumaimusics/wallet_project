
<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegister">
		<div class="top">
		</div>
		<!-- <div class="list">
			<ul class="redList" ref="ulList">
				<li class="fl" v-for="item in redList" ref="redItem">{{item}}</li>
			</ul>
		</div> -->
		<invite-register :type="'yx'" :toLink="'/wxMyNewInviteRegisterResult'" :inviterId="inviterId" :gouLists="gouList"></invite-register>
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
		},
		mounted() {
			// 友盟数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1272954709&web_id=1272954709 '
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
	#inviteRegister{
		background: url('https://static.edspay.com/article/1802260784679086-89504E47/view.html?v=1.0') no-repeat;
		background-size: 100%;
		height: 39.466667rem;
		.from{
			    margin-top: 16.46rem;
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
			    padding-top: 10.51rem;
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