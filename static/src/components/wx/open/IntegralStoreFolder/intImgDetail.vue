<template>
	<div class="img_detail">
		<title v-title>图文详情</title>
		<ul>
			<li v-for="item in imgUrl">
				<img :src="item" alt="">
			</li>
		</ul>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				// 'https://aliyunsso.edspay.com/web/wx/integralStroe/3.png','https://aliyunsso.edspay.com/web/wx/integralStroe/2.png','https://aliyunsso.edspay.com/web/wx/integralStroe/1.png'
				imgUrl:[],
				goodsId:''
			}
		},
		methods:{
			getData(){
				this.notLogPost('/goods/detailsUrl',(data) => {
					if(data.resCode == 1) {
						this.imgUrl = data.resData.detailPaths
					}
				},{goodsId:this.goodsId})
			}
		},
		mounted() {
			//给app传值标题名
			this.PassValue('NavWhite_图文详情');
	    },
		created(){
			this.goodsId = this.$route.query.goodsId
			this.getData()
		}
	}
</script>
<style lang="scss" scoped>
	.img_detail{
		ul{
			width: 100%;
			li{
				width: 100%;
				// margin-bottom:0.4rem; 
				img{
					width: 100%;
				}
			}
			li:last-child{
				margin-bottom:0rem;
			}
		}
	}
</style>