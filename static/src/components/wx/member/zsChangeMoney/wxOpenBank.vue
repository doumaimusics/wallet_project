<template>
	<div class="openBank">
		<div v-title>{{logoMsg}}</div>
		<div class="head">
			<p>E都市钱包目前支持13家银行储蓄卡，支付限额如下（具体以实际支付为准）。</p>
			<!-- <div class="more_du">超过支付限额的大额支付请使用<span @click="toBig">转账充值</span></div> -->
		</div>
		<div class="card_info">
			<div class="cad_header">
				<p>银行名称</p><p>单笔限额</p><p>单日限额</p>
			</div>
			<ul>
				<li v-for="item in bankList" class="bdr-b">
					<div><img :src="item.picPath" alt=""><span>{{item.bankName}}</span></div>
					<div class="line"></div>
					<div>{{item.singleLimit | changeWan}}</div>
					<div class="line"></div>
					<div>{{item.dailyLimit | changeWan}}</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				logoMsg:'银行卡限额说明',
				bankList:[],
			}
		},
		methods:{
			getData(){
				var that = this;
				this.postData('/account/zsbank/list',(res) => {
					if(res.body.resCode == 1){
						var openBankList = res.body.resData.bankList;
						for(var i=0; i<openBankList.length; i++){
							that.bankList = openBankList;
						}
					}
				},{},1)
			},
			toBig(){
				if(this.osType) this.$router.push({path:'transferRecharge',query:{osType:this.osType}});
				else this.$router.push({path:'/wxZsNewrecharge',query:{title:'transfer'}});
			}
		},
		components:{
			
		},
		created(){
			this.getData()
		}
	}
</script>
<style lang="scss" scoped>
	.head{
		width: 10.0rem;
		height: 3.333333rem;
		background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/bg1.png) no-repeat;
		background-size: 10.0rem 3.333333rem;
		p{
			padding:0.666667rem 0.666667rem 0.35rem 0.666667rem;
			font-size: 0.346667rem;
			text-align: justify; 
			color: #ffffff;
		}
		.more_du{
			padding:0 0.666667rem;
			font-size: 0.346667rem;
			color: #ffffff;
			span{
				display: initial;
			    text-decoration:underline;
			    padding: 0.093333rem 0;
			}
		}
	}
	.card_info{
		width: 10.0rem;
		background:#fff;
		.cad_header{
			width: 10.0rem;
			height: 1.026667rem;
			background: #F8F8F8;
			display: flex;
		    display: -webkit-box;
		    display: -moz-box;
		    display: -ms-flexbox;
		    display: -webkit-flex;
			clear: both;
			p{
			    text-align: left;
			    line-height: 1.026667rem;
			    font-size: 0.346667rem;
			    color: #333333;
			}
			p:nth-of-type(1){width: 5.2rem; text-indent: 0.4rem;}
			p:nth-of-type(2){width: 2.4rem;color:#808080;}
			p:nth-of-type(3){width: 2.4rem;color:#808080;}
		}
		
		ul{
			clear: both;
			padding-left: 0.4rem;
			background: #ffffff;
			li{
				height: 1.6rem;
				position: relative;
				// border-top: 1px solid #e5e5e5;
				display: flex;
			    display: -webkit-box;
			    display: -moz-box;
			    display: -ms-flexbox;
			    display: -webkit-flex;
			    line-height: 1.6rem;
			    div:nth-of-type(1){
			    	width: 5.2rem; text-indent: 0.4rem;
			    	img{
			    		width: 0.773333rem;
			    		height: 0.773333rem;
			    		margin-right:0.133333rem;
			    	}
			    }
			    div:nth-of-type(2){width: 2px; border-left:1px solid #F2F2F2;height: 0.373333rem;margin-top: 0.613333rem;}
				div:nth-of-type(3){width: 2.4rem;color:#808080;text-align: center;}
				div:nth-of-type(4){width: 2px; border-left:1px solid #F2F2F2;height: 0.373333rem;margin-top: 0.613333rem;}
				div:nth-of-type(5){width: 2.4rem;color:#808080;text-align: center;}
			}
		}
	}
</style>