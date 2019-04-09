<template>
	<div class="setting">
		<div v-title>设置</div>
		<ul>
			<router-link to="/wxMyAccount/wxPwdIndex" class="bdr-b" tag="li">
				<h4 class="fl">密码管理</h4>
			</router-link>
			<router-link to="/wxMyAccount/wxAccountAddressList" tag="li">
				<h4 class="fl">收货地址</h4>
			</router-link>
		</ul>
		
	</div>
</template>
<script>
	export default{
		data(){
			return{
				
			}
		}
	}
</script>
<style lang="scss" scoped>
	.setting{
		position: relative;
		ul{
			background:#fff;
			padding-left:0.4rem;
			margin-top: 0.266667rem;
			li{
				height:1.466667rem;
				font-size:0.4rem;
				line-height:1.466667rem;
				padding-right: 0.293333rem;
				position: relative;
				background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9rem 0.55rem  no-repeat!important;
				background-size:0.213333rem 0.346667rem!important;
				h4{
					font-size: 0.426667rem;
					color: #333333;
				}
			}
		}
	}
</style>