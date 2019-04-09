<template>
	<div class="packet_data">
		<title v-title>请选择</title>
		<wx-tab :tabList="titleList"></wx-tab>
		<mt-loadmore :top-method="loadTop" ref="loadmore" :auto-fill="autoFill">
			<mt-tab-container v-model="titleList.selected" :swipeable="true">
			    <mt-tab-container-item id="tab-container1">
			    	<invest-red :flag="0" :dataList="dataList" :useMoney="transmit.investAccount" :redItems="redItems" :isRedIsAll="isRedIsAll" :isgetData="isgetData"></invest-red>
			    </mt-tab-container-item>
			    <mt-tab-container-item id="tab-container3">
			    	<invest-apr :upRateList="upRateList" :useMoney="transmit.investAccount" :redItems="redItems" :isUpRateIsAll="isUpRateIsAll" :isgetData="isgetData"></invest-apr>
			    </mt-tab-container-item>
			    <div class="nothing"></div>
			</mt-tab-container>
		</mt-loadmore>
		<div class="unsed" @click="unsedRedPacket">不使用我的红包</div>
	</div>
</template>
<script>
	import wxTab from '../../../public/wx/wxTab'
	import investRed from '../invest/wxNewInvestRed';//红包
	import investApr from '../invest/wxNewInvestUpApr';//红包
	export default{
		data(){
			return{
				autoFill:false,
				isgetData:false,
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'红包'
						},
						{
							tabId:'tab-container3',
							text:'加息券'
						}
					],
					selected:'tab-container1'
				},
				dataList:[],//红包数据
				upRateList:[],//加息券数据
				redPacketData:{},//优惠券数据
				transmit:{},	//发送请求要传递的参数
				hrefData:{},	//是上个页面传过来的值
				redItems:{
					redItem:{
						uuid:this.$route.query.uuid
					}
				},		//被点击的红包
				useMoney:'',
				isRedIsAll:'',//该标的红包不可以使用
				isUpRateIsAll:'',//该标的加息卷不可以

			}
		},
		methods:{
			getData(){
				var that = this;
				this.transmit.assetManageType = this.assetManageType;
				this.postData('/financePlan/checkRedAndUprate',(res,data) => {
					if(res.body.resCode == 1){
						this.isgetData = true;
						for(var i=0;i<data.resData.redList.length;i++){
							data.resData.redList[i].checkImg = 0;
						}
						for(var i=0;i<data.resData.upRateList.length;i++){
							data.resData.upRateList[i].checkImg = 0;
						}
						this.isRedIsAll = res.body.resData.isRedIsAll;
						this.isUpRateIsAll = res.body.resData.isUpRateIsAll;

						this.redPacketData = data.resData;
						this.dataList = data.resData.redList;
						this.upRateList = data.resData.upRateList;
					}

				},this.transmit,1)
			},
			loadTop(){
				var that = this;
				var timer = setTimeout(function(){
					that.getData();
					that.$refs.loadmore.onTopLoaded();
					clearTimeout(timer)
				},1500)
			},

			//不使用优惠券
			unsedRedPacket(){
				this.delCookie('upApr');
				this.delCookie('upAprId');
				this.delCookie('upAprEarnings');
				this.delCookie('amount');
				this.delCookie('type');
				this.delCookie('redId');
				this.setCookie('unsedPacket',1)
				this.$router.replace({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:this.$route.query.uuid}})	
			},
		},
		components:{
			wxTab,
			investRed,
			investApr
		},
		activated(){
			if(this.hrefData.useMoney != this.$route.query.useMoney || this.getCookie('unsedPacket')){
				this.hrefData = this.$route.query;
				this.transmit.investAccount = this.hrefData.useMoney;
				this.transmit.planId = this.hrefData.uuid;
				this.getData();
				this.redItems.redItem = {}
			}
			
		},
		created(){
			this.assetManageType = this.$route.query.assetManageType;
			this.hrefData = this.$route.query;
			this.transmit.investAccount = this.hrefData.useMoney;
			this.transmit.planId = this.hrefData.uuid;
			this.getData();
			
		}
	}
</script>
<style lang="scss" scoped>
	.packet_data{
		position: relative;
		.nothing{
			width: 100%;
			height: 1.333333rem;
			position: relative;
		}
		.unsed{
			width: 100%;
			height: 1.333333rem;
			position: fixed;
			text-align: center;
			line-height: 1.333333rem;
			font-size: 0.4rem;
			color: #808080;
			background: #FFFFFF;
			box-shadow: 0 0 16px 0 rgba(0,0,0,0.18);
			left: 0;
			bottom: 0;
		}
	}
</style>