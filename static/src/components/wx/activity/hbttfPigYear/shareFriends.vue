
<!-- 分享出去的注册页 -->
<template>
	<div id="inviteRegisterBox">
		<div v-title>好友红包</div>
		<!-- 滚动信息 -->
		<div class="k_scroll_box">
		    <div class="scroll_box clear">
		        <div class="scroll-div fl">
		            <ul>
		                <li v-for="item in scrollInfo" ref="messageList">{{item}}</li>
		            </ul>
		        </div>
		    </div>
		</div>
		<!-- <div class="top"></div> -->
		<channels-register
				id="box"
				toLink="/wx/friendTask"
				channel="lbzn01"
				:inviterId="inviterId" 
				:isInvitation="1"
				:isCnzz="1"
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
	import channelsRegister from './sendRegister';	//新的渠道注册模板
	export default{
		mixins:[getData,verify],
		data(){
			return{
				isIOS:false,
				registeRef: {}, // 注册框dom
				inviterId:'',	//获取邀请人ID
				colors:'#3A8AFF',
				activityStatus:1,
				scrollInfo:[
					'130****2839 获得50元现金',
					'131****2098 获得200元现金',
					'132****2349 获得50元现金',
					'151****2034 获得50元现金',
					'152****3029 获得500元现金',
					'157****2158 获得50元现金',
					'159****0098 获得500元现金',
					'182****4572 获得1000元现金',
					'188****5384 获得50元现金',
					'187****4839 获得50元现金',
					'186****3408 获得50元现金',
					'185****5932 获得500元现金',
					'155****2930 获得50元现金',
					'156****2231 获得50元现金',
					'186****1930 获得500元现金',
					'185****9834 获得200元现金',
					'137****4732 获得500元现金',
					'156****2231 获得50元现金',
					'183****3424 获得200元现金',
					'150****4024 获得200元现金',
					'138****4938 获得50元现金',
					'134****4839 获得50元现金',
					'135****2038 获得200元现金',
					'136****4320 获得50元现金'
				],
				timer:null,
			}
		},
		methods:{
			// 获取注册框dom
			getRegisteDiv (val) {
				this.registeRef = val
				this.$nextTick(function () {
					this.registeRef.style.top = '2.05rem'
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
				this.inviterId =this.$route.query.ui;	//获取邀请人id;
				console.log(this.inviterId)
			}
		},
		mounted() {
			// 友盟数据统计
			const script = document.createElement('script');
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275956360&web_id=1275956360';
			script.language = 'JavaScript'
			document.body.appendChild(script)

			var that = this;
			$(document).ready(function(){
			    clearInterval(that.timer)
			    that.timer = window.setInterval(function(){
		            $('.scroll-div').find("ul:first").animate({
		                marginTop: -that.$refs.messageList[0].offsetHeight + 'px'
		            },500,function(){
		                $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
		            });
			    },3000);
			});
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
		},
		destroyed(){
		    clearInterval(this.timer);
		}
	}
</script>


<style lang="scss" scoped>
	#inviteRegisterBox{
		background: url('https://aliyunsso.edspay.com/web/wx/activity/sendRedPacket/register.jpg?v1.1') no-repeat;
		background-size: 100%;
		height: 30.253333rem;
	    padding-top: 2.85rem;
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
		.k_scroll_box{
		    position: relative;
		    height: 0.506667rem;
	        margin-bottom: 0.81rem;
	        height: 0.69rem;
		}
		.scroll_box{
		    position: relative;
		    height: 0.506667rem;
		    width: 4.826667rem;
		    margin: 0 auto;
		    padding-top: .03rem;
		}
		.scroll-div{
		    position: relative;
		    width: 100%;
		    height: 0.506667rem;
		    text-align: center;
		    font-family: SourceHanSansCN-Regular;
		    font-size: 0.293333rem;
		    color: #fefefe;
		    overflow: hidden;
		    li{
		        width: 100%;
		        white-space: nowrap;
		        overflow: hidden;
		        height: .613333rem;
		        text-overflow: ellipsis;
		    }
		}
	}
</style>