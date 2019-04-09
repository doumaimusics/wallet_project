<template>
	<!-- 服务号授权登录中间页面  https://www.edspay.com/#/authorization?sOpenId=openId&allowLogin=/index  allowLogin 为相对地址  地址栏#以后的部分 -->
	<div id="authorization">
		<div v-title>授权登录</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				endUrl: '',
				sOpenId: '',
			}
		},
		methods: {
			autoLogin(){    //自动授权登陆
				let _this = this;
				_this.$http.post(_this.ajaxUrl.getUrl(2)+'/user/autoLogin',{sOpenId: _this.sOpenId}, {emulateJSON: true}).then((res) => {
					if(res.body.resCode == 1){  // 授权成功
						_this.setCookie('userToken',res.body.resData.token,(1000 * 60 * 10));
						_this.setCookie('zsOpenStatus',res.body.resData.zsOpenStatus);
						_this.setCookie('userId',res.body.resData.user.userId);
						_this.setCookie('userName',(res.body.resData.user.userName).substring(0,3)+"****"+(res.body.resData.user.userName).substring(7,11));   
						_this.setCookie('nickname',res.body.resData.user.userName,(1000 * 60 * 10));//在线客服用户昵称
						// 设置cookie得手机号和用户名
						localStorage.setItem('userPhone',res.body.resData.user.userName);
						_this.$router.replace(_this.endUrl);
					}else{    // 授权失败或者解绑授权
						_this.$router.replace(_this.endUrl);
					}
				}, (response) => {   
					// 响应错误回调
				});
			}
		},
		created: function() {
			this.sOpenId = this.$route.query.sOpenId;     // 保存openID值
			this.endUrl = this.$route.query.allowLogin;   // 保存需要打开的地址（相对地址）
			if(this.endUrl && this.sOpenId){
				this.autoLogin();
			} else {
				alert('请检查你的链接地址');
			};
		},
		mounted: function() {

		},
		components: {

		}
   }
</script>

<style lang="scss" scoped>
	#authorization{

	}
</style>
