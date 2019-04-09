<template>
	<div id="recharge" v-if="showlayer.isShow">
		<div id="layer">
			<div class="content">
				<div class="title">确定兑换现金红包？</div>
				
				<p>兑换成功后资金将进入您的{{msgTips}}账户余额</p>
				<div class="btns">
					<span @click="showlayer.isShow = false">取消</span>
					<span @click="conversion">确定</span>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import Toast from '../../../../../common/wx/wxToast';
	export default {
		mixins:[Toast],
		data(){
			return {
				money:0,
			}
		},
		props:['item','showlayer','msgTips','conversion'],
		methods:{
			
		},
		components:{
			
		},
		created(){
			this.money = this.$route.query.money;
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