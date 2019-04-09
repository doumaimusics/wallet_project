<template>
	<div v-if="type != 10" class="header">
		<header :class="{redHeader:redType == 1}">
			<span :class="{writeBack:wtShow}" v-if="type != 0" @click="rollback"></span>
			<div class="title" >{{logo}}</div>
			<router-link v-if="type == 2" to="/" tag="p">
				完成
			</router-link>
		</header>
		<div class="tidao"></div>
	</div>
</template>

<script>
	import toAPP from '../common/wx/wxToapp';
	export default {
		mixins:[toAPP],
		data(){
			return {
				
			}
		},

		props:['logo','type','goBackUrl','pageNum','redType','goBackUrlPoint','assetManageType','wtShow'],		//type 2 显示“完成”  1显示“去主页”  0不显示返回按钮

		methods:{
			// 回退到上一个页面
            rollback: function() {
            	if(this.assetManageType == 3){
            		if(this.goBackUrlPoint) this.$router.replace(this.goBackUrlPoint)
            	} else {
	            	if(this.goBackUrl) this.$router.replace(this.goBackUrl)
					else this.$router.go(this.pageNum ? this.pageNum:-1)               
            	}
            	
            },

		},
	}
</script>

<style lang="scss" scoped>
	.tidao{
		height:1.33rem;
	}
	.header{
		height:1.33rem;
	}
	.redHeader{
		background:rgb(255, 91, 76)!important;
		.title{
			color:#fff;
			border-bottom: 1px solid rgb(255, 91, 76);
		}
	}
	header{
		position: fixed!important;
		z-index: 99;
		top:0;
		left:0;
		width:100%;
		height:1.33rem;
		background:#ffffff ;
		position:relative;
		text-align:center;
		border-bottom: 1px solid #e5e5e5;
		a{
			display:inline-block;
		}
		span{
			width: 0.3rem;
			height: 0.533333rem;
			background:url(https://aliyunsso.edspay.com/web/wx/arrows/toleft2.png) no-repeat;
			background-size:100%;
			position: absolute;
			left: 0.5rem;
			top: 0.45rem;
		}
		span.writeBack{
			width: 0.3rem;
			height: 0.533333rem;
			background:url(https://aliyunsso.edspay.com/web/wx/arrows/toleft.png) no-repeat;
			background-size:100%;
		}
		.title{
		    width: auto;
		    font-size: 0.453333rem;
			line-height:1.333333rem;
			color:#333333;
			border-bottom: 1px solid #e5e5e5;
		}
		a{
			position:absolute;
			top:0.34rem;
			right:0.133333rem;
			width:0.48rem;
			height:0.453333rem;
			img{
				position:absolute;
				top:0;
				left:0;
				height:100%;
				width:100%;
			}
		}
		p{
			top:0;
			position:absolute;
			left:1.4rem;
			font-size:0.373333rem;
			color:#fff;
			line-height:1.333333rem;
		}
	}
</style>