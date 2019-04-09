<template>
	<div id="entrust">
		<h3>浙商银行委托扣款业务服务协议</h3>
		<ul>
			<li class="clear">
				<div class="name fl">证件类型</div>
				<div class="content fl"><span>身份证</span></div>
			</li>
			<li class="clear">
				<div class="name fl">证件号码 </div>
				<div class="content fl">{{$route.query.cardID}}</div>
			</li>
			<li class="clear">
				<div class="name fl">客户名称 </div>
				<div class="content fl">{{$route.query.realName}}</div>
			</li>
			<li class="clear">
				<div class="name fl">手机号码 </div>
				<div class="content fl">{{$route.query.phoneNum}}</div>
			</li>
			<li class="clear">
				<div class="name fl">扣款账户户名</div>
				<div class="content fl"></div>
			</li>
			<li class="clear"> 
				<div class="name fl">账号 </div>
				<div class="content fl"></div>
			</li>
			<li class="clear">
				<div class="name fl">账户开户网点 </div>
				<div class="content fl"></div>
			</li>
			<li class="clear">
				<div class="name fl">合同号/协议编号/会员号 </div>
				<div class="content fl"></div>
			</li>
			<li class="clear">
				<div class="name fl">委托内容</div>
				<div class="content fl two">委托浙商银行接收E都市钱包平台指令后扣款</div>
			</li>
			<li class="clear">
				<div class="name fl">申请种类</div>
				<div class="content fl"><em><i>√</i>开办</em><em>□变更</em><em>□终止</em></div>
			</li>
		</ul>

		<p>本人自愿授权浙商银行有限公司（以下简称“贵行”）按上表授权委托内容中的平台（以下简称“该平台”）提供的金额，从上表所列扣款账户(以下简称“指定账户”)中以无卡（折）方式转账支付相关款项。</p>
		<p>授权声明：</p>
		<p>一、本人理解并同意开通贵行委托扣款业务，即授权贵行在本人向该平台提交充值出借等交易后，即可通过贵行或第三方支付机构等渠道，向指定账户发起扣款指令，并从该指定账户扣取对应的款项至该平台本人在贵行开立的账户;同一账户同时发生授权支付多笔款项时，贵行有权决定支付先后次序。</p>
		<p>二、指定账户在本人支付对应款项时应有足够的资金，若因存款不足导致扣款不成功，本人愿承担由此产生的责任，并授权贵行自动从指定账户中扣取该平台规定的滞纳金。</p>
		<p>三、若该平台与贵行终止委托扣款项目，本授权书自动失效。</p>
		<p>四、本人若对委托扣款项目的用户资料进行变更或终止授权，须由本人持有效证件到贵行指定网点（或电子银行渠道）办理变更或终止授权手续，贵行收到并受理变更或终止授权书（或数据报文）后生效。</p>
		<p>五、若因指定账户被挂失、冻结、止付、过期、超额度、销户、作废、余额不足及该平台的资料与本人在贵行的委托资料不符等导致扣款不成功，或因监管政策变化造成委托扣款不成功或项目终止，由此产生的责任由本人承担。</p>
		<p>六、本人如对委托扣款的金额有疑问，将直接与该平台联系，联系方式为：<i>400-135-3388</i> 。</p>
		<p>七、授权贵行在本人使用委托扣款相关服务期间及服务终止后，有权保留本人在使用服务期间所形成的相关数据信息，该授权不可撤销。</p>
		<p>八、贵行可根据有关法律法规向政府部门、司法机关、征信机构等第三方提供所获得的本人全部数据信息；并可用于贵行市场分析、案例分享及产品推广等活动。</p>
		<p>本人对所填资料的真实性、准确性负责，并知悉本授权书所列所有授权声明事项。</p>
		<p>本授权书通过电子银行渠道签订时：本授权书在客户通过校验□验证数字证书/□手机动态码/□小额扣款交易等方式确认后生效。</p>
		<p>本授权书通过现场方式签订时：公司客户授权时，本授权书在加盖企业公章与法定代表人名章后生效；个人客户授权时，本授权书在客户本人签字提交本行确认并录入系统后生效。浙商银行工作人员将通过□现场见证/□电话核实等方式确认本授权书的有效性。</p>
		<div class="time">授权日期：{{time | transFormatDate(2)}}</div>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return {
				time:0,
			}
		},
		components:{
			
		},
		created(){
			this.time = new Date().getTime();
		},
		activated () {
			document.title = ''
			document.title = '浙商银行委托扣款业务服务协议'
		}
	}
</script>

<style lang="scss" scoped>

	#entrust{
		padding: 0.4rem;
		background:#fff;
		h3{font-size:0.453333rem;text-align:center;padding-bottom:0.4rem;}
		ul{
			border-top: 1px solid #000;
			border-left: 1px solid #000;
			margin-bottom: 0.4rem;
			li{
				color:#333;
				div{
					border-right: 1px solid #000;
					border-bottom: 1px solid #000;
					height: 0.88rem;
					line-height:0.88rem;
					font-size:0.346667rem;
					text-align: center;
				}
				.name{
					width: 4.0rem;
				}
				.content{
					width:5.16rem;
					font-size:0.266667rem;
					span{color:#ff5b4c;}
					em{padding:0 0.133333rem;}
				}
				.two{
					line-height:0.426667rem;
				}
			}
		}
		i{text-decoration:underline;color:#ff5b4c;}
		p{
			font-size:0.346667rem;
			line-height:0.48rem;
			color:#333;
			text-indent:2em;
			padding:0.16rem 0;
			span{
				font-weight: 600;
			}
		}
		.time{padding:0.266667rem 0.533333rem;text-align:right;}
	}
	
</style>