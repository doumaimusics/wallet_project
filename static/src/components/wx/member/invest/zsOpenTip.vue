<template>
	<div id="recharge" v-if="!showlayer.getMessage">
		<div id="layer">
			<div class="content">
				<div class="title">温馨提示</div>
				
				<p>您尚未开通浙商存管账户，开通后才能出借存管标 </p>
				<div class="btns">
					<span @click="showThis.isShow = false">取消</span>
					<span @click="goRecharge">去开通</span>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
import popMessage from './popupMessage';
	export default {
		data(){
			return {
				showlayer:{
					getMessage:false
				},
			}
		},
		props:['showThis','borrow','assetManageType'],
		methods:{
			goRecharge(){
				this.$router.push({path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}});
				// if (this.assetManageType == 3) {
				// 	this.$router.push({path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}});
				// } else {
				// 	if(this.borrow.csbFlag){	//是否在白名单
				// 		this.$router.push({path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}});
				// 	}else{
				// 		this.$router.push({path:'/wxMyAccount/wxZSwait',query:{uuid:this.uuid}});
				// 	}
				// } 

			}
		},
		components:{
			popMessage
		},
		created(){

		}
	}
	
</script>

<style lang="scss" scoped>
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		top:0;
		z-index:999;
		.content{
			box-sizing:border-box;
			padding-bottom:  0.64rem;
			position:absolute;
			top:45%;
			left:50%;
			margin:-2.8rem 0 0 -3.8rem;
			width:7.493333rem;
			border-radius:0.266667rem;
			background:#fff;
			font-size:0.373333rem;
			line-height:0.533333rem;
			.title{
				border-top-right-radius: 0.266667rem;
				border-top-left-radius: 0.266667rem;
				height:1.2rem;
				line-height:1.2rem;
				text-align:center;
				color:#333;
				background:#f3f3f3;
				font-size: 0.4rem;
			}
		}
	}
	#recharge{
		p{
			padding:1.12rem 0.4rem 0.933333rem;
			text-align:center;
			font-size:0.426667rem;
			color:#333;
		}
		.money{
			padding: 0 0.4133rem;
			color:#333;
			span{
				color:#508cee;
			}
		}
		.btns{
			padding:0 0.4133rem 0.506667rem;
			span{
				float:left;
				height:0.96rem;
				width:2.986667rem;
				font-size: 0.426667rem;
				line-height:0.96rem;
				text-align:center;
				color:#ff5b4c;
				border:1px solid #ff5b4c;
				border-radius:0.106667rem;
			}
			span:last-child{
				float:right;
				background:#ff5b4c;
				color:#fff;
			}
		}
	}
</style>