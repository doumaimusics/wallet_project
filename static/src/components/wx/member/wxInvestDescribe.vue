<!-- 出借详情页面 -->
<template>
	<div id="wxInvestDescribe">
		<wx-header v-if="!osType" :logo="logoMsg"></wx-header>
		<ul class="describeChoice clear">
			<li @click="clickMe('basic')" :class="{ active: describe.basic }">基本信息</li>
			<li @click="clickMe('details')" :class="{ active: describe.details }">项目详情</li>
			<li @click="clickMe('safety')" :class="{ active: describe.safety }">安全保障</li>
			<li @click="clickMe('aptitude')" :class="{ active: describe.aptitude }">风险提示</li>
		</ul>
		<div class="describe-wrapper">
			<article class="jkms" :class="{showMe:describe.basic}">
				<img src="https://aliyunsso.edspay.com/web/wx/invest/details_1.png">
			</article>
			<article class="jkzl" :class="{showMe:describe.details}">
				<img src="https://aliyunsso.edspay.com/web/wx/invest/details_2a.png">
			</article>
			<article class="jkms" :class="{showMe:describe.safety}">
				<img src="https://aliyunsso.edspay.com/web/wx/invest/anquanbaozhang.jpg">
			</article>			
			<article class="jkzl" :class="{showMe:describe.aptitude}">
				<img src="https://aliyunsso.edspay.com/web/wx/invest/details_4.png">
			</article>
		</div>
	</div>
</template>
	
<script>
	import wxToapp from '../../../common/wx/wxToapp'	//适配app
	import wxHeader from '../../wxHeader';
	export default {
		mixins:[wxToapp],
		data(){
			return {
				logoMsg:'了解项目',
				describe:{
					basic:true,
					details:false,
					safety:false,
					aptitude:false
				}
			}
		},
		methods:{
			clickMe(me){	//tab切换
				for(var x in this.describe){
					this.describe[x]=false;
				}
				this.describe[me]=true;
			}

		},
		components:{
			wxHeader
		}
	}
</script>

<style lang="scss" scoped>
	#wxInvestDescribe{
		.describeChoice li{
			padding: 0.266667rem 0;
			background:#fff;
			float:left;
			width:25%;
			text-align:center;
			color:#666;
			font-size:0.4rem;
			border-bottom: 1px solid #ccc;
		}
		li.active{
			border-bottom: 1px solid #ff5a54;
    		color: #fe5b54;
		}
		.describe-wrapper{
			position:relative;
			.showMe{
				display:block;
			}
			article{
				position:absolute;
				top:0;
				left:0;
				display:none;
				width:100%;
				img{
					vertical-align: middle;
					width:100%;
				}
			}
		}
	}
</style>