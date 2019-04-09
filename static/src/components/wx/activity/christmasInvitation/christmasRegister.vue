<!-- 分享出去的注册页 -->
<template>
	<div id="christmasRegister">
        <wx-header v-if="!osType" :logo="'新用户礼物'"></wx-header>
         <div class="down">
		    <invite-register :toMark="'yes'" :inviterId='inviterId' isBackground="no" channel="ZQQ" @isoverflow="isflow=$event" ></invite-register>
        </div>
	</div>
</template>

<script>
    import wxHeader from '../../../wxHeader';	//引入头部
	import getData from '../../../../common/router/getData';		//引入发送请求
	import verify from '../../../../common/wx/verification';	//引入表单验证
    import inviteRegister from '../../activity/wxActivityRegister';	//引入注册组件
	import wxShare from '../../../../common/wx/wxShare';
	import jiami from 'js-base64';
	export default{
		mixins:[getData,verify,wxShare],
		data(){
			return{
				timer:null,
				isflow:false,
				inviterId:''
			}
		},
		components:{
            inviteRegister,
            wxHeader,
		},
		created(){
			this.change();
			if(this.$route.query.ui){
				this.inviterId = Base64.encode(this.$route.query.ui);	//获取邀请人id;
			} 
		},
		mounted(){
            // 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1271588176&web_id=1271588176 '
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
			},
			'isflow'(val) {
				if (val) {
					document.body.setAttribute("class","bodychannel");
				} else {
					document.body.removeAttribute("class","bodychannel");
				}
			}
		}
	}
</script>
<style>
	body.bodychannel {
			overflow: hidden;
	}
</style>
<style lang="scss" scoped>
	.top{
	}
    .down {
        background: url('https://aliyunsso.edspay.com/web/changeChannel/christmasRegister.png') no-repeat;
		background-size: 100%;
		height:46.6rem;
    }
	.from{
    	padding: 28.1rem 0 0 0.95333rem !important;
	}
</style>