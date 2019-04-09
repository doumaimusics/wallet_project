<template>
	<div class="mobile">
		<div class="contain">
			<img class="img1" v-if="img1Show" src="https://aliyunsso.edspay.com/web/about/pcRevisionSevenThree/mobileRecharge.png" alt="">
			<img class="img2" v-if="img2Show" src="https://aliyunsso.edspay.com/web/about/pcRevisionSevenThree/webRecharge.png" alt="">
			<div class="tips" :class="{top2:img2Show}"><span></span>如有疑问，请前往<router-link to="/help" tag="i">帮助中心</router-link></div>
		</div>
		
	</div>
</template>
<script>
	export default {
		data () {
			return {
				img1Show:true,
				img2Show:false
			}
		},
		created(){
			console.log(this.$route.query.imgType)
			if(this.$route.query.imgType){
				if(this.$route.query.imgType == 'mobile'){
					this.img1Show = true;
					this.img2Show = false;
				}else if(this.$route.query.imgType == 'online'){
					this.img1Show = false;
					this.img2Show = true;
				}
			}
		},
	}
</script>
<style lang="scss" scoped>
	.mobile{
		background:#F9F9F9;
		.contain{
			padding: 40px 0 70px 0;
			width: 1190px;
			-ms-flex-pack: start;
			justify-content: flex-start;
			-ms-flex-align: start;
			align-items: flex-start;
			margin: 0 auto 40px auto;
			box-shadow: none;
			text-align: center;
			background: #ffffff;
			position: relative;
			.img1{
				width: 1122px;
			    height: 1979px;
			}
			.img2{
				width: 1122px;
				height: 1633px;
			}
			.tips{
				width: 100%;
				position: absolute;
				text-align: center;
				top: 2054px;
				left: 0;
				font-size: 18px;
				color: #333333;
				span{
					width: 18px;
					height: 18px;
					display: inline-block;
					background-image: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/questionIco.png);
					background-repeat: no-repeat;
					background-size: 18px 18px;
					margin-right: 10px;
					position: relative;
				    top: 2px;
				}
				i{
					color: #508CEE;
					margin-left: 6px;
					cursor: pointer;
				}
			}
			.tips.top2{
				top: 1711px;
			}
		}
	}
</style>