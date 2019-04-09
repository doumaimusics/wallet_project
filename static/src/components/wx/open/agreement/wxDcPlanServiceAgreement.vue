<template>
	<div id="regAgreement">
		<div v-title>用户出借服务协议</div>
		<div style="width:100%;height:100%;overflow-x:hidden; overflow-y:auto;">
			<p style="text-align:right">协议编号：{{agreement.tenderNo ? 'fw'+agreement.tenderNo:'【】'}}</p>
			<h3>尊敬的客户：</h3>
			<p style="text-indent: 2em">参考年化收益不代表实际收益，出借需谨慎，为了维护您的自身权益、防范出借风险，请在出借前仔细阅读本协议各条款，以及与{{agreement.productName ? agreement.productName:'【】'}}定期出借计划（以下亦或简称"本计划"）相关的全部规则，以充分知悉、了解{{agreement.productName ? agreement.productName:'【】'}}定期出借计划的出借规则、出借对象以及协议双方的权利、义务和责任。一旦加入本计划即视为对本协议全部条款及相关业务规则已充分理解并完全接受。</p>
			<p>在乙方充分了解并清楚知晓本产品出借风险的前提下,双方签订《用户出借服务协议》（以下简称"本协议"）：</p>
			<p style="height:.55rem">甲方：浙江楚橡信息科技有限公司</p>
			<p>地址：浙江省杭州市滨江区江陵路2028号星耀城1期</p>
			<p style="height:.55rem">乙方：{{agreement.userName ? agreement.userName:'【】'}}</p>
			<p>联系电话：{{agreement.mobilePhone ? agreement.mobilePhone:'【】'}}</p>
			<p>甲乙双方经友好协商，本着平等自愿、诚实信用的原则，就{{agreement.productName ? agreement.productName:'【】'}}定期出借计划的相关事项订立有效合约，达成如下协议：</p>
			<h3>一、定义</h3>
			<p>除非本协议另有规定，以下词语在本协议中定义如下：</p>
			<p style="text-indent: 2em">1.  E都市钱包平台：指由浙江楚橡信息科技有限公司开发并运营的，向乙方提供网络借贷信息交互、撮合、资信评估等居间服务的网络借贷信息中介服务平台。</p><p style="text-indent:2em"> 2. 乙方（出借人）：乙方是具有完全民事权利能力和民事行为能力，能独立行使和承担本协议项下权利义务的自然人，是甲方旗下的网站、手机客户端或微信公众号（以下统称为“E都市钱包”）的注册用户，愿意出借其合法取得的自有资金，并充分知晓民间借贷行为可能存在的各类风险。</p><p style="text-indent:2em">3.合作机构：指与甲方建立合作关系的机构，包括但不限于第三方借款用户导流平台、第三方支付机构、资金存管银行等。</p><p style="text-indent:2em">4.借款人：指有一定的借款需求，经过甲方或甲方合作机构推荐到本平台的、发起借款申请的，充分知晓民间借贷行为可能存在的各类风险的，具有完全民事权利能力和民事行为能力，能独立行使和承担本协议项下权利义务的自然人。</p><p style="text-indent:2em">5.借款：出借人拟向借款人提供的出借资金。</p><p style="text-indent:2em">6.平台账户：指出借人以自身名义在本平台注册后系统自动产生的虚拟账户或甲方为其在合作机构存管银行开立的资金存管账户，并可通过第三方支付机构或其他通道进行充值或提现。</p><p style="text-indent:2em">7.借款合同及其相关协议：指出借人通过本平台完成撮合的借款所对应的借款合同及其配套协议（包括但不限于《用户出借服务协议》、《借款协议》、《债权转让协议》等）。</p><p style="text-indent:2em">8.债权：指乙方通过向借款人出借本金而在借款合同及其相关协议项下享有的所有权利。</p><p style="text-indent:2em">9. 募集期：指E都市钱包平台上基于借款人需求发布的出借计划的资金募集期限，该期限以E都市钱包平台具体展示及记录为准。</p>
			<h3>一、主要内容</h3>
			<p style="text-indent: 2em">1.1 {{agreement.productName ? agreement.productName:'【】'}}定期出借计划：是本平台推出的对借款项目（包括但不限于借款项目、债权转让项目等，下同）进行本金循环自动出借（包括但不限于将资金出借给借款人、将资金用于受让债权等，下同）、及项目期限届满时自动转让债权的出借计划，可通过系统实现分散量化出借。乙方期初出借本金以及获得的收益将在项目期限届满后通过授权甲方代为进行债权转让方式实现退出，退出资金将返还至乙方本平台账户。</p><p style="text-indent:2em"> 1.2 期初出借本金数额：乙方期初出借本金为人民币{{agreement.amount ? agreement.amount:'【】'}}元。</p><p style="text-indent:2em">1.3 期限：本次计划锁定期限为{{agreement.lockTime}}天。乙方知悉、了解并不可撤销地同意，自乙方在本次计划额度未届满前支付完毕加入资金的，即加入本次计划，且无论乙方加入本次计划时锁定期是否开始，一旦加入，乙方均不得撤销、取消本协议和/或撤销、取消加入本次计划，乙方加入本次计划的资金不能提现，并只能根据本协议第3.3款约定退出本次计划。乙方加入本次计划后，即可通过系统在本协议项下乙方认可的范围内进行优先自动出借。</p><p style="text-indent:2em">1.4 出借金额及参考收益：本次计划的参考年化收益率为{{agreement.planApr ? agreement.planApr:'【】'}}%。乙方知悉、了解并不可撤销地同意，本协议项下涉及的任何收益均为参考收益，并不代表乙方最终实际收益，甲方未以任何方式对本金及参考收益进行承诺或担保，乙方出借本金存在不能够按期收回的风险，同时，在实际收益未达到参考收益的情况下，乙方仅能收取其期初出借本金数额所对应的实际收益。</p><p style="text-indent:2em">1.5 循环自动出借方式：乙方不可撤销地授权甲方通过E都市钱包自动为其匹配借款人，将其加入{{agreement.productName ? agreement.productName:'【】'}}定期出借计划的资金出借给借款人，并在锁定期内将已投借款项目中到期回款的本金再次进行相同范围内的自动出借，直至本次计划锁定期结束。乙方知悉并同意，甲方通过E都市钱包自动为其匹配借款人进行资金出借的方式，可以是自动将乙方资金以匹配新的融资项目方式直接出借给借款人，也可以是自动为乙方自其它出借人处受让已有融资项目的债权，也可以是前述两种方式的结合。</p><p style="text-indent:2em">1.6 出借资金来源保证：乙方保证其所用于出借的资金为来源合法的自有资金，如果第三方对资金归属、合法性问题提出异议，由乙方自行解决。如未能解决，则乙方承诺放弃享有其所出借资金带来的利息等收益并自行承担因此造成的全部损失。</p>
			<h3>二、本协议的成立及生效</h3>
			<p style="text-indent: 2em">2.1 本协议成立：乙方按照本平台的规则，通过在本平台相关流程的跳转页面上勾选"我同意《用户出借服务协议》"以及点击"确认"按钮（具体按钮名称以本平台最新展示界面显示为准，下同）确认后，即视为乙方与甲方已达成本协议并同意接受本协议的全部约定以及本平台所包含的其他与本协议有关的各项规则的规定。</p><p style="text-indent:2em">2.2 乙方点击"确认"按钮确认后，即视为乙方承诺：在本平台账户、第三方支付机构账户或存管银行账户中存入等同于本协议第1.2款所列的“期初出借本金”数额的资金，且乙方在本协议1.3款指定的锁定期内不再挪作其他用途。</p><p style="text-indent:2em">2.3 资金划转：2.3.1 本次计划所对应的出借本金全部加入完成，且甲方E都市钱包平台完成所有资金的自动出借后，根据本期{{agreement.productName ? agreement.productName:'【】'}}定期出借计划所投特定项目的借款合同的相关约定，乙方及上述特定项目的借款人即不可撤销地授权甲方委托相应的第三方支付机构或银行等合作机构，将金额等同于本协议1.2款所列的"期初出借本金数额"的资金，逐笔按照借款合同所列的"借款本金数额"，划转至相应的借款人的指定银行账户，划转完毕即视为借款发放成功。2.3.2 甲方将在本期“E计划”定期出借计划所对应的出借本金完成加入后的1-3个自然日内完成本次计划资金的出借及划转。如3个自然日内未完成上述操作，则甲方将相应资金退回乙方的平台账户，资金加入至划转期间、资金加入至未完成退回期间退回期间不计收益。</p><p style="text-indent:2em">2.4 本协议生效：本协议于甲方完成本次计划所对应的资金划转当日立即生效，收益及相关费用自生效日次日开始计算。</p>
			<h3>三、出借及管理规则</h3>
			<p style="text-indent: 2em">3.1 乙方全权委托甲方按照本协议的约定，对等同于本协议1.2款所列的“期初出借本金”进行自动优先出借；同时，乙方授权甲方在完成上述自动优先出借后以乙方名义代为签署相应的借款协议及其相关协议。</p><p style="text-indent:2em">3.2 后续管理：在本次计划的存续期限内，乙方全权委托甲方对本次计划所出借的借款项目的后续回款进行如下处理，并以乙方名义代为签署相应的借款合同及其相关协议。3.2.1 甲方将把本次计划所出借的借款项目返还的本金循环自动出借到其他借款项目中。3.2.2 对于本次计划所出借借款项目产生的收益，甲方将根据第4.3款约定进行本金自动复投。</p><p style="text-indent:2em">3.3 在本次计划期限届满后，乙方全权委托甲方将乙方所持有的未到期的债权代为进行债权转让，并以乙方名义代为签署相应的《债权转让协议》等相关文件。</p><p style="text-indent:2em">3.4 本金及收益的返还时间：本次计划期限届满后1-3个自然日内（含3个自然日）。</p><p style="text-indent:2em">3.5 特殊处理方式：如本次计划期限届满后3个自然日后，甲方仍未能将乙方持有的本次计划中所对应的全部债权成功转让，则成功转让的债权所对应的资金，将显示在乙方平台账户中；未成功转让的债权在未转让期间正常计算收益，具体收益以借款协议展示利率为准，并将在债权转让成功后1-3个自然日内显示在乙方平台中。</p>
			<h3>四、收益及费用</h3>
			<p style="text-indent: 2em">4.1 收益来源：乙方委托甲方通过循环自动出借的方式将本金出借给本平台上的借款用户后，借款项目产生的利息在扣除管理服务费用后的剩余部分将作为本次计划的收益支付给乙方。</p><p style="text-indent:2em">4.2 收益起算时间：自本次计划出借资金自动出借成功后次日开始计算部分或全部收益。</p><p style="text-indent:2em">4.3 收益分配方式：本金自动复投、收益到期分配，即在{{agreement.productName ? agreement.productName:'【】'}}定期出借计划存续期限内，乙方加入{{agreement.productName ? agreement.productName:'【】'}}定期出借计划的期初出借本金将循环自动出借，完成的借款项目产生相应利息将在锁定期后显示在乙方平台账户中。</p><p style="text-indent:2em">4.4 管理服务费用：若锁定期内借款项目产生的利息小于或等于相应目标值，则E都市钱包不向用户收取平台管理服务费；若该借款项目在锁定期内获取的利息大于参考收益，则超出参考部分为E都市钱包收取的管理服务费用，在锁定期结束返还本息时予以扣除。</p>
			<p>管理服务费用的计算公式=锁定期内产生的利息-出借参考收益（若计算结果小于或等于0时，管理服务费计为0）。</p>
			<p style="text-indent: 2em">4.5 利息管理费：乙方同意并授权甲方直接从本次{{agreement.productName ? agreement.productName:'【】'}}定期出借计划的到期收益中收取{{agreement.interestManageFee ? agreement.interestManageFee:'3'}}%的利息管理费。</p>
			<h3>五、税费</h3>
			<p style="text-indent: 2em">乙方知悉和认可，因本协议项下的资金出借、债权转让过程中所产生的相关税费，应由乙方自行向其主管税务机关进行申报和缴纳，甲方不负责处理该等事宜。</p>
			<h3>六、本协议的修改及终止</h3>
			<p style="text-indent: 2em">6.1 本本协议以电子文本形式生成，本协议的任何修改、补充均须以本平台电子文本形式作出。</p><p style="text-indent:2em">6.2 双方均确认，本协议的签订、生效和履行以不违反法律为前提。如果本协议中的任何一条或多条被司法部门认定为违反所须适用的法律，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。</p><p style="text-indent:2em">6.3  乙方同意甲方有权根据国家法律法规、监管政策、自律规定、市场变化等对本协议及与本协议相关的规则进行调整，甚至终止本服务计划。</p><p style="text-indent:2em">6.4 调整或修改后的协议内容及相关业务规则将在本平台（包括但不限于官网公告、站内信、手机短信、邮件等方式）进行公布并立即生效，无需另行通知乙方。如果乙方不接受修改，可立即以退出本服务计划中全部出借本金的方式终止本服务；如乙方继续使用本服务计划即被视为接受修改，并受修改后的协议及相关业务规则约束。</p><p style="text-indent:2em">6.5 乙方同意，在甲方终止本协议时，乙方持有的本计划项下的借款项目将以借款协议的形式显示在乙方E都市钱包的出借详情中，乙方将按该借款项目的还款方式及债权转让协议的约定，获得相应的本金及利息回款。</p>
			<h3>七、其它</h3>
			<p style="text-indent: 2em">7.1 如双方在本协议履行过程中发生任何争议，应友好协商解决；如协商不成，则须提交甲方所在地人民法院诉讼解决。</p><p style="text-indent:2em">7.2 与本协议相关的其他具体操作规则以甲方网站、手机客户端或微信公众号展示为准，并作为本协议的附件，如具体规则与本协议不一致的，以具体规则为准。乙方同意本协议即视为同意本协议相关附件。</p>
			<p style="text-align:right;">签署日期：{{agreement.date ? agreement.date:'【】'}}</p>
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
				planId:'',
				tenderId:'',
				// formBorrowDetail:''
			}
		},
		components:{
			
		},
		created(){
			// this.formBorrowDetail = this.$route.query.formBorrowDetail;
			this.planId = this.$route.query.uuid;
			if(this.$route.query.tenderId){
				this.tenderId = this.$route.query.tenderId
			}
			if( !this.userId && !this.getCookie('userToken') ){
				this.notLogPost('/protocol/p2p/serviceProtocol',(data) =>{
					if (data.resCode) {
						this.agreement = data.resData;
					}
				},{planId:this.planId,tenderId:this.tenderId},1)
			} else if( this.userId || this.getCookie('userToken') ) {
				this.getAppData('/protocol/p2p/serviceProtocol',(data) =>{
					if (data.resCode) {
						this.agreement = data.resData;
					}
				},{planId:this.planId,tenderId:this.tenderId},1)
			}
			
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