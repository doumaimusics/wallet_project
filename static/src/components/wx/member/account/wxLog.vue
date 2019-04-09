<template>
	<div id="log">
		<div v-title>{{logoMsg}}</div>
		<wx-tab v-if="generalSw == 1 && sinaTotalMoney != 0" :tabList="titleList"></wx-tab>
		<mt-tab-container v-model="titleList.selected" :swipeable="true">
			<mt-tab-container-item id="tab-container1">
			  	<wx-child :listImg="listImg" :flag="flag[1]" :titleList="titleList" :tabType="1" :generalSw="generalSw" :sinaTotalMoney="sinaTotalMoney"></wx-child>
		    </mt-tab-container-item>
			<mt-tab-container-item id="tab-container2" v-if="generalSw == 1 && sinaTotalMoney != 0">
			  	<wx-child :listImg="listImg" :flag="flag[0]" :titleList="titleList"></wx-child>
			</mt-tab-container-item>
		    
		</mt-tab-container>
	</div>
</template>

<script>
	import wxTab from '../../../public/wx/wxTab';
	import wxChild from './wxLogChild';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				logoMsg:'资金明细',
				allLoaded:false,
				zsOpenStatus:0,
				bkOpenStatus:0,//是否开通新浪、浙商
				flag:[1,2],
				generalSw:0,//判断新浪是否展示 0、不展示   1、展示
				sinaTotalMoney:0, // 普通账户总资产
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'存管账户'
						},
						{
							tabId:'tab-container2',
							text:'普通账户'
						},
					],
					selected:'tab-container1'
				},
				listImg:[
					'https://aliyunsso.edspay.com/web/wx/account/ic_bill_detail_out.png',	//出-0
					'https://aliyunsso.edspay.com/web/wx/account/ic_bill_detail_in.png'	//进-1
				],
			}
		},
		methods:{
		},
		components:{
			wxTab,
			wxChild
		},
		created(){
			if(this.$route.query.title) this.titleList.selected = this.$route.query.title;
			this.zsOpenStatus = this.getCookie('zsOpenStatus');
			this.bkOpenStatus = this.getCookie('bkOpenStatus');
			this.generalSw = this.getCookie('generalSw');
			this.sinaTotalMoney = this.getCookie('sinaTotalMoney');   // 普通账户总资产是否未0 
			console.log(this.bkOpenStatus+'是否开通新浪')
		}
	}
</script>

<style lang="scss" scoped>
	#log{
		.noData{	
			img{
				margin:5rem auto 0;
				display:block;
				width:2.666667rem;
				height:2.366667rem;
			}
			p{
				text-align:center;
				font-size:0.426667rem;
				padding-top:0.4rem;
				color:#8B8B8B;
			}
		}
	}
	
</style>