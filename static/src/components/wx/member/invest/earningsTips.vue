<template>
	<div id="recharge">
		<div id="layer">
			<div class="content">
				<div class="title">温馨提示</div>
				
				<ul>
					<li v-for="(item,index) in elist" v-if="item.money">{{index+1}}、{{item.text}}{{item.money | moneyTwo}} <span v-if="index==0">(回款时扣除3%利息管理费)</span></li>
					<li>真实收益以实际到账为准</li>
				</ul>

				<div class="btns" @click="showThis.isShow = false">我知道了</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import popMessage from './popupMessage';
	export default {
		data(){
			return {
				
			}
		},
		props:['earnings','showThis'],
		computed:{
			elist(){
				var earList = [];
				for(var i = 0;i<this.earnings.length;i++){
					if(this.earnings[i].money != 0) earList.push(this.earnings[i]);
				}
				return earList;
			}
		},
		methods:{
			shijian(){
				console.log(this.elist)
			}
		},
		components:{
			popMessage
		}
	}
	
</script>

<style lang="scss" scoped>
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:999;
		top:0;
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
		
		ul{
			padding: 0.32rem 0.4rem 0;
			li{
				font-size:0.346667rem;
				line-height:0.493333rem;
				padding-bottom:0.133333rem;
				color:#333;
			}
			li:last-child{
				padding:0.266667rem 0 0.773333rem;
				color:#808080;
			}
		} 
		.btns{
			width: 6.666667rem;
			height:0.96rem;
			margin:0 auto;
			text-align:center;
			border-radius:0.106667rem;
			background:#ff5b4c;
			font-size:0.426667rem;
			line-height:0.933333rem;
			color:#fff;
		}
	}
</style>