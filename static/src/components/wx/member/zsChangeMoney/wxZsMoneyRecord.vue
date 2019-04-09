<template>
	<div id="log">
		<div v-title>{{logoMsg}}</div>
		<wx-tab :tabList="titleList"></wx-tab>
		<mt-tab-container v-model="titleList.selected" :swipeable="true">
			<mt-tab-container-item id="tab-container1">
				<wx-child :flag="flag[0]" :titleList="titleList" :dataUrl="dataUrl[0]"></wx-child>
			</mt-tab-container-item>
		    <mt-tab-container-item id="tab-container2">
				<wx-child :flag="flag[1]" :titleList="titleList" :dataUrl="dataUrl[1]"></wx-child>
		    </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import wxTab from '../../../public/wx/wxTab';
	import wxChild from './wxZsMoneyReChild';

	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				logoMsg:'存管账户',
				allLoaded:false,
				pageNum:1,
				flag:[1,2],
				dataList:[],
				title:0,
				textList:['系统处理中','充值成功','充值失败'],
				dataUrl:[
					'/recharge/rechargeListCzb',
					'/cash/cashListCzb'
				],
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'充值记录'
						},
						{
							tabId:'tab-container2',
							text:'提现记录'
						},
					],
					selected:'tab-container1'
				},
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
		}

	}
</script>

<style lang="scss" scoped>
	#log{
		.top{
			height:1.066667rem;
			width:100%;
			top:0;
			position:fixed;
			top:2.626667rem;
			z-index: 100;
			background: #F8F8F8;
			span{
				text-align:center;
				width:50%;
				line-height:1.066667rem;
				color:#333;
			}
		}
		.topTi{
			height:1.066667rem;
		}
		ul{
			background:#fff;
			padding-left:0.266667rem;
			li{
				padding-top:0.4rem;
				border-bottom: 1px solid #F2F2F2;
				font-size:0.426667rem;
				line-height:0.48rem;
				height:1.946667rem;
				.result{
					color:#333;
				}
				.right{
					text-align:right;
					padding-right:0.4rem;
					.money{
						color:#FFA500;
						padding-bottom:0.35rem;
					}
					.time{
						color:#888888;
					}
				}
			}
		}
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