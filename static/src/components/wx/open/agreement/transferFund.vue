<template>
	<div id="transferFund">
		<div v-title>余额转移授权委托书</div>
		<p>委托人：<em>{{name}}</em></p>
		<p></p>
		<p>受托人：浙江楚橡信息科技有限公司</p>
		<p>地址：浙江省杭州市滨江区江陵路2028号星耀城1期</p>
		<p></p>
		<p>根据《关于促进互联网金融健康发展的指导意见》、《网络借贷信息中介机构业务活动管理暂行办法》、《网络借贷资金存管业务指引》及其他有关法律法规对网络借贷信息中介机构银行资金存管的要求。鉴于委托人为浙江楚橡信息科技有限公司运营的 E都市钱包平台的实名注册的用户，现拟通过E都市钱包平台对借款人进行银行存管系统内的资金出借，为优化用户体验，委托人就本次账户资金余额转移行为及相关事项向受托人做出如下不可撤销的授权：</p>
		<p>一、授权范围 </p>
		<p class="text">代委托人在本次账户资金余额转移过程中进行普通账户资金余额转出、存管账户资金余额转入及其他资金划转等转移过程中涉及的全部资金操作。</p>
		<p>二、授权期限</p>
		<p class="text">本授权期限自委托人与受托人间签署《余额转移授权委托书》之日起至委托人E都市钱包平台普通帐户资金余额转移至存管账户资金余额之日止。</p>
		<p>三、本委托书经委托人在E都市钱包平台以线上点击确认的方式签署。</p>
		<p class="text mb50">委托人知悉、了解并不可撤销的同意E都市钱包平台账户资金余额转移行为，且认同该转移行为为本人真实意思的表示，并对该等转移行为的效力无任何异议，无条件接受授权范围内签署的相关文件之约束。</p>
		<div class="time">委托人：<em>{{name}}</em></div>
		<div class="time">授权日期：<em>{{time}}</em></div>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return {
				time:'', 
				name:''
			}
		},
		components:{
			
		},
		created(){
			$("body").css({"background":"#fff"})
			let _this = this
			this.getAppData('/account/getNameAndTime',(data) =>{
				if (data.resCode) {
					_this.name = data.resData.name
					_this.time = data.resData.time
				}
			},{},1)
		},
		beforeDestroy(){
			$("body").css({"background":"rgb(245, 245, 245)"})
		}
	}
</script>

<style lang="scss" scoped>
	#transferFund{
		padding: 0.4rem;
		background:#fff;
		h3{font-size:0.453333rem;text-align:center;padding-bottom:0.4rem;}
		i{text-decoration:underline;color:#ff5b4c;}
		p{
			font-size:0.346667rem;
			line-height:0.48rem;
			min-height: 0.48rem;
			color:#333;
			padding-top:0.16rem;
			span{
				font-weight: 600;
			}
		}
		p.text{
			text-indent:2em;
		}
		p.mb50{
			margin-bottom: .666667rem
		}
		.time{
			padding:0.266667rem 0.3rem;
			text-align:right;
			font-size:.4rem;
			padding-top: 0;
			em{
				text-align: center;
				display: inline-block;
				width: 3.2rem;
			}
		}
	}
	
</style>