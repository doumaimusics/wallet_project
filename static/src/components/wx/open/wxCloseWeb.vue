<template>
	<div id="closeWeb">

		<div @click="closeWeb" class="closeWeb">
			<img src="https://aliyunsso.edspay.com/web/wx/invest/Group.png" alt="">
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},
		methods:{
			closeWeb(){
				if(this.getCookie('osType') == 'Android') Android.getGoodsInfoFromJs("FINISH");
				else if(this.getCookie('osType') == 'IOS') passValue("FINISH");
			},
		}
	}
</script>

<style lang="scss" scoped>
	#closeWeb{
		.closeWeb{
			height:2.266667rem;
			width:1.3rem;
			padding-left:0.5rem;
			position:fixed;
			right:0;
			bottom:8.0rem;
			background-size:100%;
			z-index:999;
			img{
				height:2.266rem;
				width:0.8rem;
			}
		}
	}
</style>