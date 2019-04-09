<template>
	<div id="wxFind">
		<div v-title>活动专区</div>
		<wx-tab :tabList="titleList"></wx-tab>
		<mt-tab-container v-model="titleList.selected" :swipeable="true">
			<mt-tab-container-item id="tab-container1">
			  	<activie-on :flag="'activity_area'" :titleList="titleList"></activie-on>
		    </mt-tab-container-item>
			<mt-tab-container-item id="tab-container2">
			  	<activie-on :flag="'activity_announce'" :titleList="titleList"></activie-on>
			</mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>
	import activieOn from './wxFindChild';//精彩活动
	import wxTab from '../../public/wx/wxTab';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				tabBar:[true,false],
				allLoaded:false,
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'精彩活动'
						},
						{
							tabId:'tab-container2',
							text:'活动公告'
						},
					],
					selected:'tab-container1'
				},
			}
		},
		methods: {
			changeTabBar(index){
				this.$set(this.tabBar,0,false);
				this.$set(this.tabBar,1,false);
				this.$set(this.tabBar,index,true);
			}
		},
		components:{
			activieOn,
			wxTab
		},
		created(){
	    	
	    }
	}
</script>

<style lang="scss">
	#wxFind{
		background: #F0EFF5;
		.tabBar{
			width: 100%;
			height: 1.093333rem;
			background: #ffffff;
			position: relative;
			.menu{
				width: 100%;
				height: 1.093333rem;
				position: fixed;
				z-index: 2;
				left: 0;
				top: 0;
				background: #fff;
				.fl{
					width: 50%;
					height: 1.093333rem;
					text-align: center;
					line-height: 1.093333rem;
					font-size: 0.373333rem;
					float: left;
				}
				.actives{
					color:#ff5a4a;
					border-bottom: 1px solid #ff5a4a;
				}
			}
		}
		#navBar .mint-navbar .is-selected{
			color: #4C7DE9;
		}
	}  
	
</style>

