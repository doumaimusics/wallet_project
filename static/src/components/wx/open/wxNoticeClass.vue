<template>
	<div id="strategy">
		<wx-header v-if="!osType" :logo="name"></wx-header>
		<div class="main">
			<div class="wrap">
	            <div class="question">
	                <p class="p1" state="close">白拿商城是什么？<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p2">白拿商城是E都市钱包为本平台理财用户提供的额外福利活动，商城商品均来自兄弟单位“爱上街”合作商户，用户在本商城中按照活动规定完成出借即可获得对应商品；</p>
	                <p class="p3">白拿商品不支持退货或抵扣现金，但享受国家规定的三包标准。</p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">如何获得白拿商品？<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p3">用户进入白拿商城之后，选择对应商品，按照提示完成出借即可，请记得要填写个人真实收货地址哦。</p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">白拿商品如何处理售后问题？<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p3">白拿商城商品由兄弟单位“爱上街“合作商户提供，均为正品商品，如遇商品问题请于签收24小时内联系客服（400-135-3388）并告知具体原因，由E都市钱包协助用户进行协商解决 。逾期将不予受理，谢谢配合。</p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">什么时候可以收到白拿商品？<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p3">出借成功后7个工作日内进行发货，最终发货时间以具体发货时间为准，如有疑问可拨打E都市钱包客服电话进行咨询：400-135-3388。</p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">白拿活动能够与平台其他福利活动同享吗？<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p3">白拿活动不可与平台其他活动同享，也不可使用出借券、加息券等。出借记录查看与正常出借记录查看一致（APP-我的-出借管理）。</p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">关于出借<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p2">1. 本商城商品出借成功才可获得；</p>
	                <p class="p3">2. 出借仅限单笔出借，追加无效；</p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">关于商品<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p2">1. 本商城所有商品全部为兄弟单位“爱上街”合作单位商品，用户出借成功之后才可获得；</p>
	                <p class="p2">2. 有商品特殊要求请提前联系客服，仅限同一产品的尺寸、颜色要求；如需修改收货地址等特殊要求请在下单当天联系客服，逾期将不予受理；无特殊要求本商城商品进行随机发货；发货时间自出借成功起延长至7个工作日；</p>
	                <p class="p2">3. 用户进行换货请联系本平台客服（400-135-3388），并说明退换货原因；</p>
	                <p class="p3">4. E都市钱包拥有本活动的最终解释权；</p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">关于活期定投<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p3">“活期定投”参与白拿的商品是针对平台“E起赚”产品设定的定向商品，用户需先开通“E起赚”，按照具体商品下的获得规则进行操作即可。 <span>什么是E起赚>></span></p>
	            </div>
	            <div class="question">
	                <p class="p1" state="close">关于“活期定投”参与白拿指南<img class="open" src="https://aliyunsso.edspay.com/web/wx/whiteStore/open.png"/><img class="close" style="display: none" src="https://aliyunsso.edspay.com/web/wx/whiteStore/close.png"/></p>
	                <p class="p2">1. 用户进行“活期定投”白拿商品，需开通E起赚；</p>
	                <p class="p2">2. 用户在“活期定投”模块中，白拿商品下单过多导致E起赚可用白拿金额不足，导致无法下单。</p>
	            </div>
	        </div>
        </div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';	//引入头部
	export default {
		data(){
			return{
				name:'',
				noticeClass:[
					[
						{
							name:'普通账户是什么？',
							content:'普通账户即新浪托管账户。资金由新浪支付全程托管。'
						},
						{
							name:'存管账户是什么？',
							content:'存管账户为用户在浙商银行存管账户。账户设立在浙商银行下，平台不接触资金。当前只对部分用户开放了存管账户的权限。'
						},
						{
							name:'为什么会有两个账户？',
							content:'存管上线前，E都市钱包用户的资金由新浪支付全程托管。存管上线后资金由浙商账户存管。为了保证老用户的正常使用新浪托管账户更名为普通账户，仍可继续使用。而新接入的浙商存管账户命名为存管账户。两个账户的资金互不相通互不影响。'
						},
						{
							name:'存管账户和普通账户信息需要相同吗？',
							content:'存管账户和账户绑定的手机和银行卡可以不同，但实名信息必须一致同属于一个人。'
						},
						{
							name:'如何注册？',
							content:`PC端：进入官网www.edspay.com，点击网站首页右上角“注册”进入注册页面，按照提示输入手机号码、验证码、密码即可完成注册；
APP端：下载E都市钱包APP最新版，点击首页右下角“我的”进入新页面，点击“注册/登录”，按照提示输入手机号码与验证码等信息，即可完成注册。`
						},
						{
							name:'注册时的后不到短信怎么办？',
							content:`1、请确认手机是否安装短信拦截或者过滤软件<br/>2、请确认手机是否能否正常接收短信（停机、欠费、信号弱）<br/>3、手机接收短信出现延迟，请稍作等待<br/>4、请联系在线客服，或拨打400-135-3388电话咨询<br/>`
						},
						{
							name:'',
							content:''	
						},

					]
				]
			}
		},
		methods:{

		},
		components:{
			wxHeader,
		},
		mounted(){
			$('.question .p1').click(function(){
		    	if($(this).attr('state') == "close"){
		    		$(this).find('.open').hide().addClass("fadeIn");
		    		$(this).find('.close').show().addClass("fadeIn");
		    		$(this).parent('.question').siblings('.question').find('.p2,.open,.p3').hide().removeClass('fadeIn');
		    		$(this).parent('.question').siblings('.question').find('.open').show();
		    		$(this).parent('.question').siblings('.question').find('.close').hide();
		    		$(this).siblings('.p2,.p3').toggle().addClass('fadeIn');
		    		$(this).attr('state','open')
		    		$(this).parent('.question').siblings('.question').find('.p1').attr('state','close')
		    	}else{
		    		$(this).find('.open').show().addClass("fadeIn");
		    		$(this).find('.close').hide().addClass("fadeIn");
		    		$(this).siblings('.p2,.p3').toggle().removeClass('fadeIn');
		    		$(this).attr('state','close')
		    	}
		    })
		}
	}
</script>

<style lang="scss" scoped>
	#strategy{
		background:#fff;
	}
	.wrap{
    	margin-left: 0.4rem;
    	
    }
    .main .question{
    	background: #fff;
    }
    .main .p1{
        font-size: 0.426667rem;
        line-height: 1.2rem;
        position:relative;
        color: #666666;
        border-bottom: #e8e8e8 solid 1px;
    }
    .p1 img{
    	position: absolute;
	    left: 8.666667rem;
	    top: 50%;
	    margin-top: -.135rem;
	    width: 0.626667rem;
	    display: inline-block;
	    height: .27rem;
    }
    .main .p2,.main .p3{
        font-size:0.373333rem;
        line-height:0.6rem;
	    text-indent: 2em;
	    display: none;
	    color: #9b9b9b;
	    text-align: justify;
    }
    .main .p2{
    	padding: 0.4rem 0.266667rem 0.066667rem 0;
    }
 	.main .p3{
 		padding: 0.4rem 0.266667rem 0.466667rem 0;
 		border-bottom: #e8e8e8 solid 1px;
 	}
 	.p3 span{
 		color: #31a6fc
 	}
</style>