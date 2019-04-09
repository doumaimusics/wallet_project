<template>
	<div class="threeCard">
		<div v-title>提现限额说明</div>
	    <div class="title">快捷提现</div>
	    <div class="title color">Ⅰ类卡限额如下：</div>
	    <div class="bank-wrap"></div>
	    <div class="text">Ⅱ类卡限额：单日最高额度不超过10000元。</div>
	    <div class="text">Ⅲ类卡账户余额不得超过1000元。</div>
	    <div @click="toWxUrl('/wxMyAccount/wxKnowCard')" class="text_bottom" >了解银行卡三类账户</div>
	</div>
</template>

<script>
	import wxToapp from '../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				
			}
		},
		methods:{
			aboutCard(){
				this.$router.push({path:'/wxMyAccount/wxKnowCard',query:this.$route.query})
			}
		},
		components:{
			
		},
		activated () {
			document.title = ''
			document.title = '提现限额说明'
		}
	}
</script>

<style lang="scss" scoped>
	.threeCard{
		background:#fff;
		font-size: 0.373333rem;
		padding-left:0.533333rem;
		.title{
			padding: 0.266667rem 0;
			color: #333333;
		}
		.color{
			color:#808080;
		}
		.bank-wrap{
			height: 19.68rem;
			width:9.2rem;
			background: url(https://aliyunsso.edspay.com/web/wx/account/bank_tx.png);
			background-size:100% 100%;
		}
		.text {
		    padding: 0.266667rem 0 0;
		    color: #999999;
		}
		.text_bottom{
			padding: 0.266667rem 0 0.666667rem;
			color:#ff5808;
		}
	}
</style>