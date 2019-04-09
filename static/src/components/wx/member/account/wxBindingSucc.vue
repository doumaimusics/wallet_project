<template>
	<div id="success">
		<wx-header :logo="logoMsg"></wx-header>
		<div class="content">
			<img src="https://aliyunsso.edspay.com/web/wx/account/cardImg.png" alt="">
		</div>
		<p class="tips">恭喜你，绑卡成功</p>
		<!-- <router-link :to="goUrl ? goUrl:'/wxMyAccount'" v-btn tag="div" replace>完成</router-link> -->
		<div @click="toActive" v-btn>完成</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'
	export default {
		data(){
			return {
				logoMsg:'绑定银行卡',
				goUrl:'',	//点击完成跳转的地址
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
			this.goUrl = this.$route.query.goUrl;
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//设置高度
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
				margin: 0.9rem auto 0;
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
			padding-bottom:1.146667rem;
			text-align:center;
		}
	}

</style>