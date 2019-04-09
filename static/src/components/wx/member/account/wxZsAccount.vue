<!-- 普通账户，存管账户 -->
<template>
	<div id="safe">
		<wx-header :logo = "logoMsg"></wx-header>
		<div class="topRecord">资金记录</div>
		<div class="top">
			<img :src="eyeImg" alt="" class="eye" @click="changeEye">
			<div class="sumMoney">
				<h4>账户总额(元):</h4>
				<div v-if="showMoney" class="money">{{account.totalMoney ? account.totalMoney:0 | moneyFormat}}</div>
				<div v-else class="money">***</div>
			</div>
			<div class="earnings fl">
				<h4>昨日收益(元)</h4>
				<div v-if="showMoney" class="money">{{account.todayEarnings ? account.todayEarnings:0 | moneyFormat}}</div>
				<div v-else class="money">***</div>
			</div>
			<div class="earnings fl">
				<h4>累计收益(元)</h4>
				<div v-if="showMoney" class="money">{{account.earnAmount ? account.earnAmount:0 | moneyFormat}}</div>
				<div v-else class="money">***</div>
			</div>
		</div>
		<wxTab :tabList="titleList"></wxTab>
		<mt-tab-container v-model="titleList.selected" :swipeable="true">
		    <mt-tab-container-item id="tab-container1">
				<ul class="capital">
					<li>
						<h4>可用余额</h4>
						<h5>{{account.useMoney ?  account.useMoney:0 | moneyFormat}}元</h5>
					</li>
					<li>
						<div class="line"></div>
						<h4>待收金额</h4>
						<h5>{{account.collection ?  account.collection:0 | moneyFormat}}元</h5>
					</li>
					<li>
						<div class="line"></div>
						<h4>冻结金额</h4>
						<h5>{{account.noUseMoney ?  account.noUseMoney:0 | moneyFormat}}元</h5>
					</li>
				</ul>
		    </mt-tab-container-item>
		    <mt-tab-container-item id="tab-container2">
		    	<ul class="earnings">
		    		<li>
		    			<div class="line"></div>
		    			<h4>定期回款</h4>
		    			<h5>{{capital.collectionTodayEarnMoney ?  capital.collectionTodayEarnMoney:0 | moneyFormat}}元</h5>
		    		</li>
		    	</ul>
		    </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>

	import wxHeader from '../../../wxHeader';
	import wxTab from '../../../public/wx/wxTab';	//引入头部tab
	import { MessageBox } from 'mint-ui';	//引入带有按钮的提示框
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				logoMsg:'普通账户',
				showMoney:true,		//显示金额
				eyeImg:'https://aliyunsso.edspay.com/web/wx/account/openEyes.png',		//眼睛图片
				account :{},
				capital:{
					
				},
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'账户资金'
						},
						{
							tabId:'tab-container2',
							text:'收益'
						}
					],
					selected:'tab-container1'
				},
			}
		},
		methods:{
			changeEye(){
				this.showMoney = !this.showMoney;
				if(this.eyeImg == 'https://aliyunsso.edspay.com/web/wx/account/openEyes.png'){
					this.eyeImg = 'https://aliyunsso.edspay.com/web/wx/account/closeEye.png'
				}else{
					this.eyeImg = 'https://aliyunsso.edspay.com/web/wx/account/openEyes.png'
				}
			},
			getData(){
				this.postData('/account/detail/basic',(res,data) => {
					if(data.resCode){
						this.account = data.resData.basicModel
					}	
				},{assetManageType:2},1)
			}
		},
		components:{
			wxHeader,
			wxTab
		},
		created(){
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	#safe{
		font-size: 0.346667rem;
		line-height: 0.493333rem;
		color:#333;
		.topRecord{
			position: absolute;
			font-size:0.373333rem;
			line-height:1.333333rem;
			top: 0;
			right: 0;
			z-index: 999;
			color:#ff5b4c;
			padding-right: 0.4rem;
		}
		.top{
			height:4.266667rem;
			padding: 0.266667rem 0.4rem 0;
			color:#fff;
			background:#ff5b4c;
			position:relative;
			img{
				position:absolute;
				height:0.266667rem;
				width:0.506667rem;
				margin:0.426667rem 0.4rem 0 0;
				top:0;
				right:0;
			}
			.sumMoney{
				padding-bottom: 0.666667rem;
				.money{
					font-size:0.8rem;
					line-height:1.12rem;
				}
			}
			.earnings{
				width:50%;
				.money{
					font-size:0.4rem;
					line-height:0.56rem;
				}
			}
		}
		ul{
			li{
				height:1.466667rem;
				background:#fff;
				line-height:1.466667rem;
				padding-left:0.4rem;
				h4{
					float: left;
				}
				h5{
					float: right;
					padding-right:0.933333rem;
				}
				.line{
					height:1px;
					background:#e5e5e5;
				}
			}
		}
		.capital{
			li:nth-child(2){
				background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9.3rem 0.55rem  no-repeat;
				background-size:0.213333rem 0.4rem;
			}
		}
		.earnings{
			li:nth-child(1),li:nth-child(2){
				background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9.3rem 0.55rem  no-repeat;
				background-size:0.213333rem 0.4rem;
			}
		}

	}
</style>