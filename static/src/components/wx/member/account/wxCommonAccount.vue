<!-- 普通账户，存管账户 -->
<template>
	<div id="safe">
		<div v-title>{{titleHeader[flag-1]}}</div>
		<div class="top">
			<img :src="eyeImg" alt="" class="eye" @click="changeEye">
			<div class="sumMoney">
				<h4>账户总额(元):</h4>
				<div v-if="showMoney" class="money">{{account.totalMoney ? account.totalMoney:0 | moneyFormat}}</div>
				<div v-else class="money">***</div>
			</div>
			<div class="earnings fl">
				<h4>今日收益(元)</h4>
				<div v-if="showMoney" class="money">{{account.todayEarnAmount ? account.todayEarnAmount:0 | moneyFormat}}</div>
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
						<h5 v-if="showMoney">{{account.useMoney ?  account.useMoney:0 | moneyFormat}}元</h5>
						<h5 v-else>***</h5>
					</li>
					<li>
						<div class="line"></div>
						<h4>待回款本金</h4>
						<h5 v-if="showMoney">{{account.principal ?  account.principal:0 | moneyFormat}}元</h5>
						<h5 v-else>***</h5>
					</li>
					<li>
						<div class="line"></div>
						<h4>待回款利息</h4>
						<h5 v-if="showMoney">{{account.waitInterest ?  account.waitInterest:0 | moneyFormat}}元</h5>
						<h5 v-else>***</h5>
					</li>
					<li v-if="flag == 1">
						<div class="line"></div>
						<h4>提现中</h4>
						<h5 v-if="showMoney">{{account.noUseMoney ?  account.noUseMoney:0 | moneyFormat}}元</h5>
						<h5 v-else>***</h5>
					</li>
					<li v-if="flag == 2">
						<div class="line"></div>
						<h4>提现冻结</h4>
						<h5 v-if="showMoney">{{account.noUseMoney ?  account.noUseMoney:0 | moneyFormat}}元</h5>
						<h5 v-else>***</h5>
					</li>
					<li v-if="flag == 1 && balance">
						<div class="line"></div>
						<h4>转移中金额</h4>
						<h5 v-if="showMoney">{{account.transferMoney ?  account.transferMoney:0 | moneyFormat}}元</h5>
						<h5 v-else>***</h5>
					</li>
				</ul>
				<div class="transfer" v-if="flag == 1 && balance">
					<span>使用余额转移功能，将普通账户余额转移到存管账户可免手续费哦！</span>
					<div @click="showExtractTip.isShow = true" class="transferBtn">余额转移</div>
				</div>
		    </mt-tab-container-item>
		    <mt-tab-container-item id="tab-container2">
		    	<ul class="earningsUl">
		    		<router-link v-if="flag == 1" :to="{path:'/wxMyAccount/wxFlowDetails',query:{logoMsg:'存钱罐收益',flag:1}}" tag="li">
		    			<h4>存钱罐</h4>
		    			<h5 v-if="showMoney">{{account.cqgEarnMoney ?  account.cqgEarnMoney:0 | moneyFormat}}元</h5>
		    			<h5 v-else>***</h5>
		    		</router-link>
		    		<router-link v-if="flag == 1 && account.fluxStatus == 99" :to="{path:(account.fluxStatus == 99 ? '/wxMyAccount/wxFlowDetails':'/wxEqzAccount'),query:{isOpenEqz:(account.fluxStatus == 9) ? 1:0}}" tag="li">
		    			<div class="line"></div>
		    			<h4>E起赚</h4>
		    			<h5 v-if="showMoney">{{account.fluxEarnMoney ?  account.fluxEarnMoney:0 | moneyFormat}}元</h5>
		    			<h5 v-else>***</h5>
		    		</router-link>
		    		<li>
		    			<div class="line" v-if="flag == 1"></div>
		    			<h4>定期回款</h4>
		    			<h5 v-if="showMoney">{{account.collectionEarnMoney ?  account.collectionEarnMoney:0 | moneyFormat}}元</h5>
		    			<h5 v-else>***</h5>
		    		</li>
		    	</ul>
		    </mt-tab-container-item>
		</mt-tab-container>
		<public-dialog 
		 	v-if="showExtractTip.isShow" 
		 	:showThis="showExtractTip" 
		 	:text="showExtractTip.text" 
		 	:btn="2"
		 	:btnText="'确定'"
		 	:confirmBtn="closeExtractTip">
		</public-dialog>
	</div>
</template>

<script>
	import wxTab from '../../../public/wx/wxTab';	//引入头部tab
	import { MessageBox } from 'mint-ui';	//引入带有按钮的提示框
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import publicDialog from '../../../wx/member/invest/wxPublicDialog.vue'; //弹框组件
	export default {
		data(){
			return {
        		balance: sessionStorage.getItem("balance") == "true" ? true : false,       //  余额转移开关
				logoMsg:'普通账户',
				showMoney:true,		//显示金额
				eyeImg:'https://aliyunsso.edspay.com/web/wx/account/openEyes.png',		//眼睛图片
				account :{},
				flag:1,
				topTitle:'',
				capital:{
					
				},
				titleHeader:['普通账户','存管账户'],
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
				showExtractTip:{//展示新浪提现 提示框
					isShow:false,
					text:'余额转移已停止使用，请登录pc端操作提现，如有疑问请联系客服'
				},
			}
		},
		methods:{
			changeEye(){
				this.showMoney = !this.showMoney;
				if(this.eyeImg == 'https://aliyunsso.edspay.com/web/wx/account/openEyes.png'){
					this.eyeImg = 'https://aliyunsso.edspay.com/web/wx/account/closeEyes.png'
				}else{
					this.eyeImg = 'https://aliyunsso.edspay.com/web/wx/account/openEyes.png'
				}
			},
			getData(){
				this.postData('/account/detail/basic',(res,data) => {
					console.log(data)
					if(data.resCode){
						this.account = data.resData.basicModel
					}	
				},{assetManageType:this.flag},1)
			},
			closeExtractTip(){
				this.showExtractTip.isShow = false;
			}
		},
		components:{
			wxTab,
			publicDialog
		},
		created(){
			this.flag = this.$route.query.flag;
			if(this.flag == 1){
				this.topTitle = 'tab-container2'
			}
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	#safe{
		font-size: 0.346667rem;
		line-height: 0.493333rem;
		color:#333;
		.transfer{
			width: 10rem;
			height: 1.466667rem;
			background: #fff;
			margin-top: .533333rem;
			padding: .253333rem .4rem;
			span{
				width: 5.133333rem;
				display: inline-block;
				float: left;
				line-height: .48rem;
				font-family: PingFangSC-Regular;
				font-size: .32rem;
				color: #333333;
				letter-spacing: 0;
			}
			.transferBtn{
				background-image: linear-gradient(-45deg, #FF5E4C 0%, #FF4640 100%);
				border-radius: 8px;
				width: 2.72rem;
				height: .96rem;
				float: right;
				display: block;
				font-family: PingFangSC-Regular;
				font-size: .426667rem;
				color: #FFFFFF;
				line-height: .96rem;
				text-align: center;
				
			}
		}
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
				height:0.506667rem;
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
					font-family: DIN-Medium;
				}
			}
			.earnings{
				width:50%;
				.money{
					font-size:0.4rem;
					line-height:0.56rem;
					font-family: DIN-Medium;
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
			margin-top: 0.266667rem;
			li.EqzLi{
				background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9.3rem 0.55rem  no-repeat;
				background-size:0.213333rem 0.4rem;
			}
		}
		.earningsUl{
			margin-top:0.266667rem;
			li{
				background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9.3rem 0.55rem  no-repeat;
				background-size:0.213333rem 0.4rem;
			}
			li:last-child{
				background:#fff;
			}
		}

	}
</style>