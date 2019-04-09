<template>
	<div id="thanksgHome">
		<div class="main-bg">
	          <div class="open-btn" @click="yesNoLogIn"></div>
		</div> 
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import dialog from '../../../public/wx/wxdialog'; //弹出框
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxToapp],
		data() {
			return {
				showLayer: false,
			}
		},
		methods: {
			nextPage() { //   跳转下一页
				this.$router.push({
					path: '/thanksgiving/thanksgivingDayPage',
					query: this.$route.query
				});
			},
			yesNoLogIn() {    //  判断用户是否登录
				if (this.userId || this.getCookie('userToken')) {   //  已经登录
					this.nextPage();
				} else{
					MessageBox.confirm('快去登录,参加活动 ！').then(action => {
                    this.toApp('LG', { path: '/wxLogin', query: { thisUrl: this.$route.fullPath } })
                });
				}				
			}
		},
		mounted(){
			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1271041811&web_id=1271041811 '
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
		}
	}
</script>

<style lang="scss" scoped>
	#thanksgHome{
		font-family: DIN-Medium;
		.main-bg{
			width: 10rem;
			height: 16.5rem;
			position: relative;
			background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/home.png?v=1.0') no-repeat;
			background-size: cover;
			.open-btn {
				    width: 5.544rem;
				    height: 1.176rem;
				    position: absolute;
				    left: 2.52rem;
				    top: 13.29rem;
			}
		}
	}
</style>