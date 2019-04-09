
<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegister">
        <p class="yq_phone" v-if="this.$route.query.userPhone">您的好友{{userPhone}}，邀请您助力！</p>
		<invite-register :toMark="'1'" :channel="channel" :inviterId="inviterId"></invite-register>
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
                userPhone:'',  // 邀请人手机号
				isIOS:false,
				timer:null,
				inviterId:'',	//获取邀请人ID
				channel:'',   //活动注册得活动来源名称
			}
		},
		methods: {
		},
		components:{
			inviteRegister,
		},
		created(){
			this.change();
			if(this.$route.query.ui){
				this.inviterId = Base64.encode(this.$route.query.ui);	//获取邀请人id;
            } 
			this.userPhone = this.$route.query.userPhone;
			this.channel = this.$route.query.channel;  // 活动注册得活动来源名称
		},
		mounted(){
			// 友盟数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1273338531&web_id=1273338531 '
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		destroyed(){
		},
		watch:{
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
		background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/bg_zc.png?v=1.2') no-repeat;
		background-size: 100%;
		height: 17.786667rem;
		padding-top: 5.665rem;
        .yq_phone{
            width: 6.026667rem;
            height: .52rem;
            line-height: .52rem;
            font-size: .346667rem;
            color: #fff;
            text-align: center;
            position: absolute;
            top: 6.906667rem;
            left: 0;
            right: 0;
            margin: auto;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/mra.png?v=1.1') no-repeat;
            background-size:cover; 
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
                    margin-left: .6rem;
			   	 }
			   	 .msgBtn.active{
			   	 	color: #FFFFFF;
                    background: transparent;
			   	 }
			   } 
			   .btn{
                   height: 1.426667rem;
			   	   margin-top: 0.43rem;
			   }
			   .gou{
                    margin: 0.25rem 0 0 0.053333rem;
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