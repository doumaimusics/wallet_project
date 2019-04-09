<template>
	<div id="knowmore">
		<wx-header :logo="title"></wx-header>
		<div class="wrap">
			<div class="top_img">
			<img src="https://aliyunsso.edspay.com/web/wx/index/more_head.png" alt="">
			<p>E起赚是E都市钱包推出的灵活存取项目，当存钱罐资金竞购E起赚后，用户即享年化{{interest.fluxIncome | returnFloat}}%左右收益。账户资金由新浪支付全程托管，风险准备金由招商银行监管。出借资金小额分散，多方位保障用户资金安全。</p>
			</div>
			<div class="common_title">
				<div class="line">什么是E起赚</div>
			</div>
			<div class="text">
				<p>1.自动竞购，让闲置资金享受更高收益</p>
				<img src="https://aliyunsso.edspay.com/web/wx/index/e1.png" alt="">
				<p>用户充值后，资金进入存钱罐享存钱罐收益。（年化率：{{interest.cqgIncome | returnFloat}}%）。1小时后，存钱罐的资金自动进入E起赚排队竞购队列。当有新的E起赚标的或有出借人发起债权转让时，系统将自动为用户竞购E起赚债权（年化率：{{interest.fluxIncome | returnFloat}}%），用户无需手动抢购。</p>
			</div>
			<div class="text tx">
				<p>3.无需等待，收益每日到账</p>
				<img src="https://aliyunsso.edspay.com/web/wx/index/e2.png" alt="">
				<p>用户成功竞购E起赚后，当天即开始计算收益，收益将在第二天2:00~6:00发放到用户的E起赚账户。</p>
			</div>
			<div class="common_title">
				<div class="line">什么人更适合E起赚</div>
			</div>
			<div class="box">
				<div class="box1"><img src="https://aliyunsso.edspay.com/web/wx/index/1.png" alt=""></div>
				<div class="box2">
					<p class="p1">1.理财小白</p>
					<p>刚开始学理财的用户，不知道该如何选择项目。可以选择E起赚，低风险、收益稳健、随时可存取，迈出理财的第一步。</p>
				</div>
			</div>
			<div class="box">
				<div class="box1"><img src="https://aliyunsso.edspay.com/web/wx/index/2.png" alt=""></div>
				<div class="box2">
					<p class="p1">2.有闲钱暂无出借计划的人</p>
					<p>有闲置的钱又暂无确认出借计划的人，可以开通E起赚享受比余额更高的收益。等有出借计划时资金可随时取出去出借。</p>
				</div>
			</div>
			<div class="box">
				<div class="box1"><img src="https://aliyunsso.edspay.com/web/wx/index/3.png" alt=""></div>
				<div class="box2">
					<p class="p1">3.不想操心的忙人、懒人</p>
					<p>如果你想有较高收益，有保障，方便便利，又不想花太多时间关注。可以选择E起赚为你自动竞购债权，坐享每日收益。</p>
				</div>
			</div>
			<div class="box">
				<div class="box1"><img src="https://aliyunsso.edspay.com/web/wx/index/4.png" alt=""></div>
				<div class="box2">
					<p class="p1">4.对资金流动性有较高要求的人</p>
					<p>很多年轻人经常会有购物、聚餐等活动时，有资金需求。E起赚中资金可随时提现，方便周转。</p>
				</div>
			</div>
			<div class="common_title">
				<div class="line">e起赚开通流程</div>
			</div>
			<div class="text tx">
				<img class="tx2" src="https://aliyunsso.edspay.com/web/wx/index/5.png" alt="">
				<p>开通流程中已完成的步骤，可直接跳过。如已绑定银行卡的用户，将从步骤3开始操作。用户根据页面引导，即可成功开通。</p>
			</div>
			<div class="common_title">
				<div class="line">更多常见问题</div>
			</div>
			<div class="text">
				<p>1.什么是存钱罐？</p>
				<p>存钱罐为稳健的货币基金理财。用户充值时，E都市钱包平台接受用户的指令，委托新浪支付在基金公司开户，并且购买基金公司的货币基金，年化收益</p>
				<div class="x_line"></div>
				<p>2.竞购E起赚是否有金额的限制？</p>
				<p>是的，只有用户存钱罐金额大于10元时才会进入排队队列。E起赚收益稳定存取灵活，该债权数量有限为了让更多的用户能竞购E起赚，每个用户自动竞购金额不得超过10000元。当用户E起赚中的资金已大于10000元，即使存钱罐中还有余额也不再为该用户竞购E起赚。</p>
				<div class="x_line"></div>
				<p>3.存钱罐资金什么时候进入排队队列？</p>
				<p>当存钱罐有资金入账（如充值、本金回收、利息回收等），资金将在1小时后进入排队竞购队列。之所以等待1小时，是为了不影响用户进行出借或者提现操作。</p>
				<div class="x_line"></div>
				<p>4.排队资金什么时候能竞购成功？</p>
				<p>当有借贷用户发起借款或有出借人发起债权转让时，系统将为在队首的用户竞购E起赚债权。具体时间无法确定可能进入队列几分钟就成功竞购，也可能需要等1-2天。用户不用着急，排队中的资金仍享存钱罐收益。</p>
				<div class="x_line"></div>
				<p> 5.什么时候开始计算收益？</p>
				<p class="p2">E起赚：竞购成功，当天有收益。</p>
				<p class="p2">存钱罐：T日申购，T+1日开始计算收益</p>
				<p class="p3">E起赚收益</p>
				<img class="img1" src="https://aliyunsso.edspay.com/web/wx/index/table1.png" alt="">
				<p class="p3">存钱罐收益</p>
				<img class="img1" src="https://aliyunsso.edspay.com/web/wx/index/table2.png" alt="">
				<div class="x_line"></div>
				<p> 6.收益什么时候发放?</p>
				<p>存钱罐收益会在每天 10:00~15:00 间发放至您账户,E起赚收益会在每天2:00~6:00 间发放至您账户。</p>
				<div class="x_line"></div>
				<p>7.为什么我每天的收益有时多有时少？</p>
				<p>E起赚年化收益约为{{interest.fluxIncome | returnFloat}}%左右，每天可能会有细微的波动。在计算每日收益的时候，可能出现无法除尽的情况，程序舍去小数点二位后的金额，几天下来当舍去的金额总和达到0.01元以上时才会补偿给用户。每个借款人都会有上述情况，每天的舍去的金额一多就会出现收益率下降，当某天的补偿的收益一多，收益率就会上涨。</p>
			</div>
			<div class="write"></div>
		</div>
		
		<div class="foot_bottom">
			<div class="agreement">
				<div class="check" :class='{checked:isActive}' @click="isActive = !isActive"></div>
				<div>同意<span>《出借服务协议》</span><span>《出借服务协议》</span></div>
			</div>
			<div class="btn">
				<div class="input" :class='{inputActive:!isActive}'>立即开通</div>
			</div>

		</div>
	</div>
</template>
<script>
	import wxHeader from '../../wxHeader';
	export default{
		data(){
			return{
				title:'1分钟了解E起赚',
				isActive:true,
				interest:{
					fluxIncome:'6.6',
					cqgIncome:'2.3'
				}
			}
		},
		methods:{

		},
		components:{
			wxHeader
		}
	}
</script>
<style lang="scss">
	.wrap{
		position: relative;
		display: block;
		z-index: 9;
	}
	.top_img{
		position: relative;
		margin-bottom:0.346667rem; 
		position: relative;
		display: block;
		img{
			width: 100%;
			height: 3.333333rem;
		}
	}
	.common_title{
		height: 1.173333rem;
		position: relative;
		display: block;
		.line{
			border-left: 4px solid #ff5a4a;
			height: 0.56rem;
			margin: 0.306667rem 0 0.306667rem 0.4rem;
			font-size:0.4rem;
			color:#333333;
			text-indent: 0.266667rem;
			display: inline-block;
			position: relative;
		}
	}
	.text{
		position: relative;
		display: block;
		margin-top:0.293333rem; 
		img{
			width: 100%;
		}
		.img1{
			width: 9.2rem;
			margin: 0 auto;
			position: relative;
			display: block;
		}
	}
	.tx{
		margin-bottom:0.266667rem; 
	}
	.tx2{
		padding-top: 0.133333rem;
	}
	.box{
		display: flex;
		position: relative;
		padding: 0.533333rem 0.4rem;
		margin-top:0.266667rem; 
		.box1{
			width: 2.666667rem;
			height: 2.666667rem;
			img{
				width: 100%;
			}
		}
		.box2{
			width: 6.133333rem;
			.p1{
				padding-top: 0rem;
				padding-bottom: 0rem;
			}
			p{
				padding-right: 0;
			}
		}
	}
	.box, .top_img,.common_title,.text{
		background: #ffffff;
	}
	.x_line{
		border:1px solid #f5f5f5;
		width:9.173333rem;
		margin: 0.266667rem auto;
		height:1px;
	}
	.p2{
		padding-bottom: 0;
	}
	.p3{
		text-align: center;
	}

	p{
		font-size: 0.346667rem;
		color: #333333;
		text-align:justify;
		padding: 0.186667rem 0.4rem;
	}
	.foot_bottom{
		height: 3.2rem;
		position: fixed;
		z-index: 99;
		bottom: 0;
		width: 100%;
		background: #f5f5f5;
		.agreement{
			display: flex;
			font-size:0.32rem;
			color:#3d3d3d;
			margin-top: 0.32rem;
			padding-left: 0.4rem;
		}
		.agreement div:nth-child(1){
			width: 0.466667rem;
		}
		.agreement div:nth-child(2){
			width: 8.0rem;
			text-indent: 0.16rem;
		}
		.check{
			width: 0.453333rem;
			height: 0.453333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/index/checkbox.png) no-repeat;
			background-size: 100% 100%;
		}
		.checked{
			background: url(https://aliyunsso.edspay.com/web/wx/index/checkbox_active.png) no-repeat;
			background-size: 100% 100%;	
		}
		.btn{
			width: 100%;
			.input{
				width: 8.666667rem;
				height: 1.2rem;
				background:#fc7a3e;
				border-radius:8px;
				margin: 0 auto;
				position: relative;
				display: block;
				text-align: center;
				font-size:0.4rem;
				color:#ffffff;
				margin-top: 0.533333rem;
				line-height: 1.2rem;	
			}
			.inputActive{
				background: #ccc;
			}
		}
	}
	.write{
		height: 3.2rem;
	}
</style>