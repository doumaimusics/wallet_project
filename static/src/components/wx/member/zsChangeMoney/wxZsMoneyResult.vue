<template>
	<div id="success">
		<div v-title v-if="source == 1">充值结果</div>
		<div v-title v-else-if="source == 2">提现结果</div>
		<wx-header></wx-header>
		<router-link :to="{path:goUrl ? goUrl:'/wxMyAccount'}" class="finish" tag="div" replace>完成</router-link>
		<div class="main_contain">
			<div class="sucess_bg">
				<img :src="srcImg[result]" alt="">
			</div>
			<p class="tips">{{source==1 ? rechargeTip[result]:drawings[result]}}</p>
			<p class="invest_money" v-if="result ==1">￥<span>{{rechargeMoney | moneyFormat}}</span></p>
		</div>
		<!-- <a href="tel:400-135-3388">400-135-3388</a> -->
		<div class="haddle_tip" v-if="source==1 && result !=1">银行正在处理该笔交易，请耐心等待，预计30分钟内到账</div>
		<div class="haddle_tip" v-if="source==2">5万以下提现可当日到账，5万以上大额提现需在工作日7:00-16:00银行受理后到账。</div>
		<div class="result_btns clear" v-if="source==1">
			<div @click="recharge" class="doBtns goOnRecharge">继续充值</div>
			<router-link class="doBtns investBtn btns_color_on" :to="{path:investUrl ? investUrl:'/wxInvest',query:{}}" tag="div" replace>
				<span v-if="investUrl">继续出借</span>
				<span v-else>立即出借</span>
			</router-link>
		</div>
		<p class="zs_tips" v-if="source==1 && result !=1"><span></span>如有疑问，请前往 <router-link to="/wxMyAccount/wxHelpCenters" tag="i">帮助中心</router-link></p>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'
	export default {
		data(){
			return {
				logoMsg:'',
				headerType:2,
				result:0,	//0充值，1提现
				investStr:'',
				cause:'',
				srcImg:[
					'https://aliyunsso.edspay.com/web/wx/resultIcons/invest_waite.gif',
					'https://aliyunsso.edspay.com/web/wx/resultIcons/invest_success.gif',
					'https://aliyunsso.edspay.com/web/wx/resultIcons/invest_fail.gif',
				],
				drawings:['银行处理中','提现成功'],
				rechargeTip:['银行处理中','充值成功'],
				getTime:'',
				goUrl:'',	//完成跳入口路由
				investUrl:'',	//去出借路由
				rechargeMoney:'',//充值的金额
				source:'',//来源页
			}
		},
		components:{
			wxHeader
		},
		methods:{
			recharge(){
				this.$router.replace({path:'/wxZsNewrecharge',query:{dataUrl:'/account/bank/list'}})
			},
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度
			//动态的为根元素设置字体的大小
			$('#success').height(height)
		},
		created(){
			this.cause = this.$route.query.cause;
			this.result = this.$route.query.result;
			this.goUrl = this.$route.query.goUrl;
			this.investUrl = this.$route.query.investUrl;
			this.rechargeMoney = this.$route.query.rechargeMoney;
			this.source = this.$route.query.source;//来源页 1为充值 2为提现
		}
	}
</script>

<style lang="scss" scoped>
	#success{
		background:#fff;
		.finish{
			position:fixed;
			z-index:100;
			top:0;
			right:0.4rem;
			line-height:1.333333rem;
			font-size:0.373333rem;
			color:#ff5b4c;
		}
		.main_contain{
			position: relative;
			padding-top: 1.693333rem;
			.sucess_bg{
				width: 100%;
				height: 2.653333rem;
				margin-bottom: 0.4rem;
				img{
					width: 100%;
				}
			}
			.invest_money{
				color: #FF3434;
				font-family: PingFangSC-Medium;
				font-size: 0.4rem;
				text-align: center;
				// margin-bottom: 1.013333rem;
				span{
					font-family: PingFangSC-Medium;
					font-size: 0.48rem;
				}
			}
			
		}
		.content{
			height:5.733333rem;
			padding-top:0.666667rem;
			.img{
				display:block;
				width:2.773333rem;
				height:2.773333rem;
				margin: 0.666667rem auto 0;
				padding-top:0.65rem;
				background:url(https://aliyunsso.edspay.com/web/wx/account/resultQuan.png);
				background-size:100% 100%;
				img{
					display:block;
					margin: 0 auto;
					width:1.013333rem;
					height:0.746667rem;
				}
				p{
					text-align:center;
					color:#fff;
					font-size:0.4rem;
					line-height:0.56rem;
				}
			}
		}
		.result_btns{
			width: 100%;
			height: 1.04rem;
			padding-top: 1rem;
		}
		.haddle_tip{
			width: 8.226667rem;
			margin: 0 auto;
			font-size: 0.32rem;
			color: #808080;
			margin-bottom: 1.333333rem;
			line-height: .55rem;
			padding-top: 1.013333rem;
			a{
				color: #508CEE;
			}
		}
		.doBtns{
			width: 4.0rem;
			height: 1.066667rem;
			float: left;
			line-height: 1.066667rem;
			text-align: center;
			border-radius: 0.106667rem;
			font-size: 0.426667rem;
		}
		.goOnRecharge{
			border: 1px solid #FF5B4C;
			color: #FF5B4C;
			margin-left: 0.706667rem;
			margin-right: 0.6rem;
		}
		.investBtn{
			color: #ffffff;
		}
		.btns{
			padding:0 0 0 0.666667rem;
			span{
				float:left;
				border-radius:0.106667rem;
				border:0.013333rem solid #ff5b4c;
				width:100%;
				height:1.04rem;
				text-align:center;
				line-height:1.04rem;
				margin-right:0.6rem;
				color:#ff5b4c;
			}
			span:last-child{
				color:#fff;
				background:#ff5b4c;
			}
		}
		.tips{
			font-size: 0.48rem;
			color: #333333;
			line-height:0.56rem;
			text-align:center;
		}
		p.zs_tips{
			font-size: 0.32rem;
			color: #808080;
			padding-top: 0.933333rem;
			// text-align: center;
			position: fixed;
			bottom: 0.8rem;
			left: 2.76rem;
			span{
				width: 0.32rem;
				height: 0.32rem;
				display: inline-block;
				position: relative;
				background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/questionIco.png) no-repeat;
				background-size: 100% 100%;
				top: .05rem;
				margin-right: .1rem;
			}
			i{
				color: #508CEE;
			}
		}
	}

</style>