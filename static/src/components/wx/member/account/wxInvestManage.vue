<!-- 出借记录 -->
<template>
	<div id="investManage">
		<div v-title>{{logoMsg}}</div>
		<wx-tab v-if="(bkOpenStatus == 1 || bkOpenStatus == 3) && generalSw == 1&&(sinaList.length!=0)" :tabList="titleList"></wx-tab>
		<mt-tab-container v-model="titleList.selected" :swipeable="false">
		    
		    <mt-tab-container-item id="tab-container1">
		    	<!-- 存管 -->
			    <wx-child :titleList="titleList" :flag="flag[1]" :positTop="(bkOpenStatus == 1 || bkOpenStatus == 3) && generalSw == 1&&(sinaList.length!=0)"></wx-child>

		    </mt-tab-container-item>
		    <mt-tab-container-item id="tab-container2"> 
				<!-- 新浪 -->
			    <wx-child  :titleList="titleList" :flag="flag[0]" @getSinaList="getSinaList"></wx-child>

		    </mt-tab-container-item>
		    
		</mt-tab-container>
	</div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'
	import wxTab from '../../../public/wx/wxTab';	//引入头部tab
	import wxChild from './wxInvestMaChild';	//引入子组件

	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		mixins:[wxToapp],
		data(){
			return {
				logoMsg:'出借记录',
				flag:[1,2],
				zsOpenStatus:0,
				bkOpenStatus:0,//判断是否开通新浪、存管
				generalSw:0,//判断新浪是否展示
				sinaTotalMoney:0,   // 新浪总资产
				tabTop:null,
				sinaList:true, //是否有新浪数据
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'存管账户'
						},
						{
							tabId:'tab-container2',
							text:'普通账户'
						}
					],
					selected:'tab-container1'
				},
			}
		},
		components:{
			wxTab,
			wxChild
		},
		methods: {
			getSinaList(list) {
				this.sinaList = list
			}
		},
		created(){
			this.zsOpenStatus = this.getCookie('zsOpenStatus');
			this.bkOpenStatus = this.getCookie('bkOpenStatus');
			this.generalSw = this.getCookie('generalSw');
			this.sinaTotalMoney = this.getCookie('sinaTotalMoney');
			if(this.$route.query.tab) this.titleList.selected = this.$route.query.tab;
		},
		mounted() {
			// app title跳转变化
            this.PassValue('NavWhite_出借记录');
		},
		activated () {
			this.logoMsg = '出借记录'
		}

	}
</script>
<style scoped>
 
</style>

<style lang="scss" scoped>
//   body,html,#start,#wx,#investManage,.mint-tab-container,.mint-tab-container-wrap,#MaChlid{
// 	   height: 100%;
// 	   background: blue;
//    }
	#investManage{
		
	}
	
</style>