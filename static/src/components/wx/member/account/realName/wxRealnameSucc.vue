<template>
	<div id="success">
		<wx-header :logo="logoMsg"></wx-header>
		<div class="content">
			<img :src="srcImg[result]" alt="">
		</div>
		<p class="tips" v-if="result">{{textTips[result]}}</p>
		<div class="btns clear" v-if="result ==1">
			<!-- <router-link :to="goUrl ? goUrl:'/wxMyAccount'" tag="span" replace>完成</router-link> -->
			<span @click="toActive">完成</span>
			<router-link :to="{ path: '/wxMyAccount/wxBindingCard',query:{thisUrl:goUrl}}" tag="span" replace>绑定银行卡</router-link>
		</div>
		<router-link to="/wxMyAccount" v-btn v-if="result == 0" tag="div" replace>完成</router-link>
	</div>
</template>

<script>
	import wxHeader from '../../../../wxHeader'
	export default {
		data(){
			return {
				logoMsg:'实名认证',
				result:null,
				cause:'',
				goUrl:'',	//跳转地址
				srcImg:[
					'https://aliyunsso.edspay.com/web/wx/account/realnameDef.png',
					'https://aliyunsso.edspay.com/web/wx/account/realnameSuc.png',
				],
				textTips:[
					'很抱歉，实名认证失败！',
					'恭喜你，实名认证成功！'
				]
			}
		},
		methods:{
			toActive(){
				this.$router.go(-1)
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.result = this.$route.query.result
			this.cause = this.$route.query.cause	//失败原因
			this.goUrl = this.$route.query.goUrl	//回去的路由
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度

			//动态的为根元素设置字体的大小
			$('#success').height(height)
		}
	}
</script>

<style lang="scss" scoped>
	#success{
		background:#fff;
		.content{
			height:5.733333rem;
			padding-top:0.666667rem;
			img{
				display:block;
				width:4.266667rem;
				height:3.6rem;
				margin: 1rem auto 0;
			}
		}
		.btns{
			padding:0 0 0 0.666667rem;
			span{
				float:left;
				border-radius:0.106667rem;
				border:0.013333rem solid #ff5b4c;
				width:3.973333rem;
				height:1.04rem;
				text-align:center;
				line-height:1.04rem;
				margin-right:0.6rem;
				color:#ff5b4c;
			}
			span:last-child{
				color:#fff;
				background:#ff5b4c;
			}
		}
		.tips{
			font-size:0.4rem;
			line-height:0.56rem;
			color:#808080;
			padding: 0.266667rem 0 1rem;
			text-align:center;
		}
	}

</style>