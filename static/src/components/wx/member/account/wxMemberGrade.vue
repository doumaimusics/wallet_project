<template>
	<div id="membership">
		<wx-header :logo="title"></wx-header>	
		<div class="top">
			<div class="head">
				<div class="headPortrait">
					<img :src="headImg" alt="">
				</div>
			</div>	
		</div>
		<div class="usename">{{useName}}</div>
		<div>我的成长值：{{growthValue}}</div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'
	export default{
		data(){
			return{
				title:'VIP会员',
				headImg:'https://aliyunsso.edspay.com/web/wx/account/people.png',
				useName:'18642561258',
				growthValue:'1000'
			}
		},
		components:{
			wxHeader,
		}
	}

</script>
<style lang="scss">
	.top{
		height: 2.053333rem;
		.head{
			height: 5.893333rem;
			width: 100%;
			background: url(https://aliyunsso.edspay.com/web/wx/account/account_bg.png) no-repeat;
			background-size: 100% 100%;
			padding-top: 0.373333rem;
			.headPortrait{
				width: 1.706667rem;
				height: 1.706667rem;
				border-radius: 50%;
				border:1px solid #fff;
				overflow: hidden;
				margin: 0 auto;
				img{
					width: 1.706667rem;
					height: 1.706667rem;
				}
			}
		}	
	}
	.usename{
		font-size: 0.386667rem;
		text-align: center;
		color: #ffffff;
		margin:0.44rem 0 0.76rem 0; 
	}
	
</style>