<template>
	<div id="regAgreement">
		<div v-title>风险提示书</div>
		<!-- isTab不显示头部 -->
		<div style="width:100%;height:100%;overflow-x:hidden; overflow-y:auto;">
			<!-- <h1 v-if="isTab" style="text-align:center;font-size:.5rem;margin-bottom:0.1rem">风险提示书</h1> -->
			<p style="text-indent: 2em">您通过在页面类似点击确认的方式确认本《风险提示书》时，即视为您已完全知悉本《风险提示书》内容，并自愿承担出借可能带来的风险。</p>
			<h3 style="font-weight:bold">尊敬的用户，您好：</h3>
			<p style="text-indent: 2em;font-weight:bold">由于资金出借过程中，可能将面临多重风险因素，在做出接受网络借款信息中介机构服务和出借决策之前，请仔细阅读以下内容，谨慎做出接受服务和出借的决策：市场有风险、出借需谨慎，您应充分认识以下风险：</p>
			<h3>一、出借风险</h3>
			<p style="text-indent: 2em">您通过E都市钱包平台向借款人出借资金不同于银行储蓄，您既可能分享出借所产生的收益，也可能承担出借所带来的损失（如借款人未能按时足额还款）。您应判断借款项目及相关定期出借计划与您自身风险承受能力、资金管理需求是否相匹配后，自行决定是否接受服务和出借资金。</p>
			<h3>二、市场风险</h3>
			<p style="text-indent: 2em">E都市钱包平台将基于诚实信用、勤勉尽责的原则协助您将资金出借给借款客户，但借款及相关定期出借计划在运作过程中受宏观经济周期和金融市场环境影响较大。在经济下行压力下，可能导致借款项目逾期概率增大，E都市钱包平台并不保证借款项目及相关定期出借计划一定会产生预期收益，亦不保证最低收益，也不为出借人提供任何形式的直接或间接的担保。</p>
			<h3>三、政策风险</h3>
			<p style="text-indent: 2em">本平台提供的服务依据现行相关法律法规和政策设计，如相关法律法规、政策等发生变化，可能影响本平台系统实时匹配交易功能的正常进行。</p>
			<h3>四、信息传递风险</h3>
			<p style="text-indent: 2em">借款项目及相关定期出借计划存续期内， E都市钱包平台可根据协议约定对协议及相关规则进行调整，甚至提前结清或转让借款项目或终止定期出借计划。届时， E都市钱包平台将进行公布（包括但不限于官网公告、站内提示、手机客户端等方式）。您应根据及时查询相关信息，如因您未及时查询，或通讯故障、系统故障以及其他不可抗力等因素的影响导致您未能及时了解到相关调整，由此产生的责任和风险由您自行承担。</p>
			<h3>五、借款项目及相关定期出借计划不成立风险</h3>
			<p style="text-indent: 2em">自您向借款项目或相关定期出借计划出借资金（具体以网站、手机客户端及微信公众号显示为准）之日起至募集期届满前，募集总金额未达到约定或相关法律法规、政策等发生变化，经E都市钱包平台合理判断难以按照约定向您提供服务的， E都市钱包财平台有权宣布借款项目或相关定期出借计划不成立， E都市钱包平台对由此产生的损失不承担任何责任。</p>
			<h3>六、流动性风险</h3>
			<p style="text-indent: 2em">在借款项目及相关定期出借计划存续期内，用户提前退出或到期退出的申请经E都市钱包平台确认后方可进行，经确认后用户持有的出借项目将以债权转让方式通过E都市钱包平台进行转让。E都市钱包平台不对债权转让完成的时间以及能否全部成功实现做出任何承诺，用户因债权转让申请未成功完成将面临资金不能迅速变现、丧失其他出借机会的风险。</p>
			<h3>七、不可抗力及意外事件风险</h3>
			<p style="text-indent: 2em">由于自然灾害、战争、社会动乱、罢工等不可抗力因素的出现，将严重影响相关定期出借计划的正常运行， E都市钱包平台对由此产生的损失不承担任何责任。</p>
			<h3>八、特别提示</h3>
			<p style="text-indent: 2em">前述风险提示不能穷尽全部风险及市场的全部情形。</p>
			<h3>客户确认:</h3>
			<p class="bold" style="text-indent: 2em">本人确认向 E都市钱包平台上的借款项目及相关定期出借计划出借资金，该行为是本人真实的意思表示,并认为该借款项目及相关定期出借计划完全适合本人的出借目标、出借预期以及风险承受能力，本人自愿承担由此带来的一切后果。</p>
			<p class="bold">本人同时承诺出借资金为来源合法的自有资金，且不以洗钱、恐怖融资或其他金融违法犯罪等为目的出借 E都市钱包平台的借款项目及相关定期出借计划。</p>
			<p class="bold" :class="{isTab:isTab}">本《风险提示书》经客户在 E都市钱包平台（包括但不限于网站、手机客户端及微信公众号）以线上确认的方式签署。</p>
			<p style="text-align:right" v-if="!isTab">签署日期：{{agreement.date ? agreement.date:'【】'}} </p>
		</div>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp'
	export default{
		mixins:[wxToapp],
		props:{
			isTab: Boolean, // 是否在tab页中显示
		},
		data(){
			return{
				agreement: {},
			}
		},
		components:{
			
		},
		created(){
			if (!this.isTab) {
				this.getAppData('/protocol/p2p/riskInformProtocol',(data) =>{
					if (data.resCode) {
						this.agreement = data.resData;
					}
				},{},1)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#regAgreement{
		font-size:.346667rem;
		line-height:0.506667rem;
		background:#fff;
		color:#333;
		padding:0.266667rem;
		text-align:justify;
		/*isTab*/
		.isTab {
			padding-bottom: 1.866667rem;
		}
		.bold {
			font-weight: bold;
		}
		h3 {
			font-weight: bold;
		}
		p{
			font-size:0.346667rem;
			line-height:0.586667rem;
			padding:0.133333rem;
		}
		h3{
			font-size:0.373333rem;
		}
		h4{
			font-size:0.4rem;
			line-height:0.64rem;
			text-align:center;
		}
	}
</style>