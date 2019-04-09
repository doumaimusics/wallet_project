<template>
	<div id="recharge">
		<div id="layer">
			<div class="content">
				<div class="title">温馨提示</div>
				<div v-if="textShow == 1" class="tx1">
					<p class="pp1" :class="{addP:textShow == 1}">{{text1}}</p>
					<p class="pp2" :class="{addPP:textShow == 1}">{{text2}}</p>
				</div>
				<p v-else :class="{pp3:textShow == 2}">{{text}}</p>
				<div v-if="btn == 1" class="btns1">
					<span v-if="btnCli == 1" @click="doOther">{{btnText[0]}}</span>
					<span v-else @click="showThis.isShow = false">{{btnText[0]}}</span>
					<span @click="confirmBtn">{{btnText[1]}}</span>
				</div>
				<div v-else class="btns2" @click="confirmBtn">{{btnText}}</div>
			</div>
		</div>	
	</div>
</template>

<script>
	export default {
		data(){
			return {
			}
		},
		props:['showThis','text','btn','btnText','confirmBtn','btnCli','doOther','textShow','text1','text2'],
		//展示弹框，弹框文本，按钮类型 eg:1,2,按钮文本，方法
		methods:{
		},
		created(){

		}
	}
	
</script>

<style lang="scss" scoped>
	#layer{
		font-family: PingFangSC-Regular;
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
				background:#f3f3f3;
				font-size: 0.4rem;
				color: #333333;
			}
		}
	}
	#recharge{
		p{
			padding:0.8rem 0.4rem 0.813333rem;
			text-align:justify;
			font-size:0.346667rem;
			color:#333;
			line-height: .65rem;
		}
		.tx1{
			p{
				
				text-align:justify;
			}
			p.pp1{
				font-size:0.346667rem;
				color:#333;
				line-height: .65rem;
				padding: 0.8rem 0.4rem 0rem;
			}
			p.pp2{
				
				font-size: 0.346667rem;
				color: #808080;
				line-height: .65rem;
				padding: 0rem 0.4rem 0.813333rem;
			}
			p.addP{
				text-align: center;
				font-size: 0.373333rem;
				color: #333333;
			}
			p.addPP{
				text-align: center;
			}
		}
		.money{
			padding: 0 0.4133rem;
			color:#333;
			span{
				color:#508cee;
			}
		}
		.btns1{
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
		.btns2{
			width: 6.666667rem;
			height:0.96rem;
			border-radius: 0.48rem;
			margin:0 auto;
			text-align:center;
			// border-radius:0.106667rem;
			background:#F14B4B;
			font-size:0.426667rem;
			line-height:0.933333rem;
			color:#fff;
		}
		p.pp3{
			text-align: center;
		}
	}
</style>