<template>
	<div id="notice">
		<wx-header v-if="!osType" :logo="'常见问题'"></wx-header>
		<img src="https://aliyunsso.edspay.com/web/wx/index/notice.png" alt="">
	</div>
</template>

<script>
	import wxHeader from '../../wxHeader';	//引入头部
	import wxToapp from '../../../common/wx/wxToapp';
	export default{ 
		mixins:[wxToapp],
		data(){
			return{

			}
		},
		components:{
			wxHeader
		}
	}
</script>

<style lang="scss" scoped>
	#notice{
		img{
			width:100%;
		}
	}
</style>


<!-- <template>
	<div id="notice">
		<wx-header v-if="!osType" :logo="'常见问题'"></wx-header>
		<img class="img" src="https://aliyunsso.edspay.com/web/wx/index/notice.png" alt="">
		<ul>
			<router-link :to="{path:'/'}" class="bdr-b" tag="li">账户类</router-link>
			<router-link :to="{path:'/'}" class="bdr-b" tag="li">出借类</router-link>
			<router-link :to="{path:'/'}" class="bdr-b" tag="li">充值提现类</router-link>
			<router-link :to="{path:'/'}" class="bdr-b" tag="li">红包优惠类</router-link>
			<router-link :to="{path:'/'}" class="bdr-b" tag="li">费用类</router-link>
			<router-link :to="{path:'/'}" class="bdr-b" tag="li">存管类</router-link>
		</ul>
	</div>
</template>

<script>
	import wxHeader from '../../wxHeader';	//引入头部
	import wxToapp from '../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{

			}
		},
		components:{
			wxHeader
		}
	}
</script>

<style lang="scss" scoped>
	#notice{
		.img{
			width:100%;
		}
		ul{
			padding-left: 0.4rem;
			background:#fff;
			font-size: 0.373333rem;
			li{
				height: 1.466667rem;
				line-height: 1.466667rem;
				position: relative;
				background:url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 8.666667rem 0.48rem no-repeat;
				background-size: 0.32rem 0.5rem;
			}
			.bdr-b{
				border-bottom:1px solid #E5E5E5;
			}
		}
	}
</style> -->