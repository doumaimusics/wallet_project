<template>
	<div id="regAgreement">
		<div v-title>授权委托书</div>
		<div style="width:100%;height:100%;overflow-x:hidden; overflow-y:auto;">
			<p style="height:.55rem">委托人：{{agreement.userName ? agreement.userName:'【】'}}</p>
			<p>身份证号码：{{agreement.cardId ? agreement.cardId:'【】'}}</p>
			<p style="height:.55rem">受托人：浙江楚橡信息科技有限公司</p>
			<p>地址：浙江省杭州市滨江区江陵路2028号星耀城1期</p>
			<p style="text-indent: 2em">鉴于委托人为浙江楚橡信息科技有限公司运营的 E都市钱包平台的实名注册的用户，现拟参与E都市钱包平台开发的{{agreement.productName ? agreement.productName:'【】'}}定期出借计划，为优化委托人的用户体验，委托人就本期{{agreement.productName ? agreement.productName:'【】'}}定期出借计划”的相关出借、资金划转、退出等相关事项向受托人做出如下不可撤销的授权:</p>
			<h3>一、授权范围</h3>
			<p style="text-indent: 2em">1.1 代委托人在指定的{{agreement.productName ? agreement.productName:'【】'}}定期出借计划的锁定期内点击确认出借、出借资金、借款协议、债权转让协议等循环自动出借过程中的全部协议。</p><p style="text-indent: 2em">1.2 代委托人在指定的{{agreement.productName ? agreement.productName:'【】'}}定期出借计划的锁定期内进行划转出借资金、收回借款本息、收取债权转让款项等循环自动出借过程中涉及的全部资金管理。</p>
			<h3>二、授权期限</h3>
			<p style="text-indent: 2em">本授权期限自委托人与受托人间签署《授权委托书》之日起至完全退出{{agreement.productName ? agreement.productName:'【】'}}定期出借计划之日止。</p>
			<h3>三、本委托书经委托人在E都市钱包平台以线上点击确认的方式签署</h3>
			<p style="text-indent: 2em">委托人知悉、了解并不可撤销的同意循环自动出借和自动签署的相关借款协议、债权转让协议；且认同该等自动签署的借款协议、债权转让协议均视为本人真实意思的表示，并对该等法律文件的效力无任何异议，无条件接受授权范围内签署的借款协议、债权转让协议之约束。</p>
			<p>委托人：{{agreement.userName ? agreement.userName:'【】'}}</p>
			<p style="text-align:right">签署日期：{{agreement.date ? agreement.date:'【】'}}</p>
			<img :src="'data:image/gif;base64,'+agreement.edspaySingImg" alt="" v-if="agreement.edspaySingImg">
		</div>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp'
	export default{
		mixins:[wxToapp],
		data(){
			return{
				agreement: {},
			}
		},
		components:{
			
		},
		methods:{
		},
		created(){
			this.getAppData('/protocol/p2p/userAuthorizedEntrustProtocol',(data) =>{
				if (data.resCode) {
					this.agreement = data.resData;
				}
			},{},1)
		}
	}
</script>

<style lang="scss" scoped>
	#regAgreement{
		font-size:0.32rem;
		line-height:0.506667rem;
		background:#fff;
		color:#333;
		padding:0.266667rem;
		text-align:justify;
		position: relative;
		p{
			font-size:0.346667rem;
			line-height:0.586667rem;
			padding:0.133333rem;
			position: relative;
		}
		h3{
			font-size:0.373333rem;
		}
		h4{
			font-size:0.4rem;
			line-height:0.64rem;
			text-align:center;
		}
		img{
			width: 2.5rem;
		    height: 2.5rem;
		    position: absolute;
		    right: .8rem;
		    bottom: 0
		}
	}
</style>