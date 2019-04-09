<template>
	<div id="success">
		<wx-header :logo="logoMsg"></wx-header>
		<div @click="finish" class="finish">完成</div>
		<div class="main_contain">
			<div class="sucess_bg">
				<img :src="srcImg[result]" alt="">
			</div>
			<p class="tips">支付成功</p>
			<!-- <p class="tips">{{textTips[result]}}<span v-html="tenderMes"></span></p> -->
			<p class="invest_money" v-if="result ==1">￥<span>{{investMoney}}</span></p>
			<div class="jifen">出借获得{{this.$route.query.score}}积分</div>
			<div class="invest_progress" v-if="result ==1">
				<div class="detail">
					<p class="p1">成功购买</p>
					<p class="p2">{{addTime}}</p>
				</div>
				<div class="line"></div>
				<div class="detail">
					<p class="p1">开始计息</p>
					<p class="p2">{{upRateTime}}</p>
				</div>
				<div class="line"></div>
				<div class="detail">
					<p class="p1">发起债权转让</p>
					<p class="p2">{{repaymentTime}}</p>
				</div>
			</div>
		</div>

		<div class="btns clear" v-if="result ==1">
			<router-link :to="{ path: '/wxMyAccount/wxInvestListIn/wxInvestManage', query: {tab:'tab-container1'}}" tag="span" replace>查看出借记录</router-link>
			<router-link :to="{ path: '/wxInvest', query: {  }}" tag="span" replace>继续出借</router-link>
		</div>
		<div @click="toLast" v-btn v-if="result == 2">重试</div>
		<div class="toturntable" :style="{background:'url(' + $route.query.picPath + ') no-repeat 0 0 / 100%'}" v-if="$route.query.ifDisplay" @click="iconLists($route.query.introduction)"></div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader'
	export default {
		data(){
			return {
				logoMsg:'出借',
				result:2,
				investStr:'',
				tenderMes:'',//失败原因
				investMoney:'',//支付金额
				name:'',//理财项目名称
				addTime:'',//投资成功时间
				upRateTime:'',//起息时间
				repaymentTime:'',//预计还款时间
				srcImg:[
					'https://aliyunsso.edspay.com/web/wx/resultIcons/invest_waite.gif',
					'https://aliyunsso.edspay.com/web/wx/resultIcons/invest_success.gif',
					'https://aliyunsso.edspay.com/web/wx/resultIcons/invest_fail.gif',
				],
				textTips:[
					'',
					'',
					'原因：',
				]
			}
		},
		methods:{
			iconLists(link){    // 绝对地址截取域名
				let i=link.indexOf("#")+1
				let tolink=link.substring(i,link.length)
				this.$router.push(tolink)
			},
			toLast(){
				this.$router.replace(this.$route.query.thisUrl)
			},
			finish(){
				this.$router.push('/wxInvest')
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.result = this.$route.query.result;
			this.tenderMes = this.$route.query.tenderMes;
			this.name = this.$route.query.name;
			this.addTime = this.$route.query.addTime;
			this.repaymentTime = this.$route.query.repaymentTime;
			this.upRateTime = this.$route.query.upRateTime;
			
			if(this.$route.query.investMoney){
				this.investMoney = this.$route.query.investMoney
			};

		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度

			//动态的为根元素设置字体的大小
			$('#success').height(height)
		}
	}
</script>

<style lang="scss" scoped>
	#success{
		font-family: PingFangSC-Regular;
		.finish{
		    background:#fff;
			position:fixed;
			z-index:100;
			top:0;
			right:0.4rem;
			line-height:1.333333rem;
			font-size: 0.373333rem;
			color: #808080;
		}
		.content{
    		background:#fff;
			height:5.733333rem;
			padding-top:0.666667rem;
			background:url(https://aliyunsso.edspay.com/web/wx/invest/investResult.png) no-repeat;
			background-size: 100%;
			img{
				display:block;
				width:2.773333rem;
				height:2.773333rem;
				margin: 0 auto;
			}
		}
		.main_contain{
    		background:#fff;
			position: relative;
			padding-top: 0.9rem;
			.sucess_bg{
				width: 100%;
				height: 2.653333rem;
				// background:url(https://aliyunsso.edspay.com/web/wx/resultIcons/invest_success.gif) no-repeat;
				// background-size: 100%;
				margin-bottom: 0.2rem;
				img{
					width: 100%;
				}
			}
			.invest_money{
				font-size: 0.426667rem;
				color: #FF5B4C;
				text-align: center;
				margin-bottom: .533333rem;
				span{
					font-family: PingFangSC-Medium;
					font-size: .8rem;
				}
			}
			.jifen{
				font-size: .346667rem;
				color: #333333;
				line-height: .493333rem;
				text-align: center;
				margin-bottom: .666667rem;
			}
			.invest_progress{
				width: 8.933333rem;
				position: relative;
				top: 0;
				right: 0;
				padding-top:.506667rem;
				margin: 0 auto;
				display: flex;
				justify-content:space-between;
				.detail{
					text-align: left;
					width: 2.2rem;
					float: left;
				    text-align: center;
					.p1{
						font-family: PingFangSC-Medium;
						font-size: 0.346667rem;
						color: #333333;
						margin-bottom: 0.133333rem;
					}
					.p2{
						font-size: .293333rem;
						color: #808080;
					}
				}
				.line{
					float: left;
					width: 1rem;
					height: 1px;
					background: #e5e5e5;
					margin-top: .52rem;
				}
			}
			.invest_progress:before {
				height: 1px;
				content: '';
				width: 100%;
				border-top: 1px dashed #e5e5e5;
				position: absolute;
				top: 0;
				right: 0;
				transform: scaleY(0.5);
				-webkit-transform: scaleY(0.5);
				z-index: 10;
			}
		}
		.btns{
			padding:.8rem 0 .693333rem .666667rem;
			background: #ffffff;
			span{
				float:left;
				border-radius:0.106667rem;
				border:0.013333rem solid #ff5b4c;
				width:3.973333rem;
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
			font-size: .4rem;
			color: #333333;
			line-height:.533333rem;
			height:0.56rem;
			// margin-bottom: .133333rem;
			text-align:center;
		}
		.toturntable{
			width: 100%;
			height: 2.666667rem;
			margin-top: .266667rem;
			background-size: 100%;
		}
	}

</style>