<template>
	<div class="threeCard">
		<wx-header v-if="!osType" :logo="logoMsg"></wx-header>
	    <div class="title">快捷充值</div>
	    <div class="bank-wrap">
	    	<div class="bank-cont">
	            <div class="fl">50,000</div><div class="fr">100,000</div>
	            <div class="fl">50,000</div><div class="fr">100,000</div>
	            <div class="fl">50,000</div><div class="fr">500,000</div>
	            <div class="fl">5,000</div><div class="fr">5,000</div>
	            <div class="fl">50,000</div><div class="fr">50,000</div>
	            <div class="fl">50,000</div><div class="fr">50,000</div>
	            <div class="fl">50,000</div><div class="fr">50,000</div>
	            <div class="fl">50,000</div><div class="fr">50,000</div>
	            <div class="fl">5,000</div><div class="fr">日1w/月2w</div>
	            <div class="fl">50,000</div><div class="fr">1000,000</div>
	            <div class="fl">9,999</div><div class="fr">500,000</div>
	            <div class="fl">50,000</div><div class="fr">500,000</div>
	            <div class="fl">50,000</div><div class="fr">300,000</div>
	            <div class="fl">5,000</div><div class="fr">10,000</div>
	            <div class="fl">50,000</div><div class="fr">50,000</div>
	            <div class="fl">50,000</div><div class="fr">50,000</div>
	            <div class="fl">5,000</div><div class="fr">日2w/月5w</div>
	        </div>
	    </div>
	    <div class="text-wrap">
	        <p style="margin: .2rem 0;">网银充值请通过电脑登陆<span style="color: #ff5a4a">www.edspay.com</span>，具体限额以各家银行网银充值为主。</p>
	        <p>银行卡限额详情文案：</p>
	        <p>1）关于“汇添富基金”</p>
	        <p>汇添富基金由东方证券有限公司、文汇新民联合报业集团、东航金控有限责任公司三家实力雄厚、声誉卓越的集团联合发起设立，基金代码000330，汇添富的资产管理规模自成立以来保持了较好的稳健快速增长，稳定位于业内排名前列。</p>
	        <p>2）为什么充值显示“汇添富基金”？</p>
	       <p> E都市钱包现已对接“汇添富基金”，用户在E都市钱包的帐户余额将通过“汇添富基金”自动享有基金带来的收益，完美解决资金站岗无收益问题，且用户无需支付交易服务费，功能类似余额宝，随存随取，收益高于余额宝！</p>
	        <p>收益计算时间规则请参见帮助中心。</p>
	        <p>3）支持银行卡及银行限额表</p>
	        <p>快捷类充值支持银行限额表</p>
			<p>4）<router-link :to="{path:'/wxKnowCard',query:this.$route.query}" class="text_bottom" tag="span">了解银行卡三类账户</router-link></p>
	    </div>
	    
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';
	import wxToapp from '../../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{logoMsg:'银行卡限额及相关说明'}
		},
		components:{
			wxHeader
		}
	}
</script>

<style lang="scss" scoped>
	.threeCard{
		background:#fff;
		font-size: 0.373333rem;
		padding-left:0.3rem;
		.title{
			padding: 0.266667rem 0;
			color: #333333;
		}
		.color{
			color:#808080;
		}
		.bank-wrap{
			height: 24.186667rem;
			width:9.2rem;
			background: url(https://aliyunsso.edspay.com/web/wx/account/bank_cz.png);
			background-size:100% 100%;
		}
		.text {
		    padding: 0.266667rem 0 0;
		    color: #999999;
		}
		.text_bottom{
			color:#ff5808;
		}

		.bank-cont{
			padding:1.066667rem 0 0 3.066667rem;
			div{
				height:1.093333rem;
				width:3.04rem;
				text-align: center;
				line-height:1.1rem;
				font-size:0.346667rem;
			}
		}
		.text-wrap{
			color:#999;
			font-size:0.32rem;
			line-height:0.506667rem;
			padding-right:0.4rem;
			text-align: justify;
			padding-bottom:0.4rem;
		}
	}
</style>