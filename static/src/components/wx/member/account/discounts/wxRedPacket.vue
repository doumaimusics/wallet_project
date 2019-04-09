<template>
	<div id="repayPlan">
		<div v-title>{{logoMsg}}</div>
		<wx-header :logo="logoMsg"></wx-header>
		    
		    <router-link to="/wxMyAccount/redpacketUseInstruction" tag="div" class="rules" ></router-link>
		<wx-tab :tabList="titleList"></wx-tab>
		<div class="screen bdr-b" @click = "showList = !showList">
			{{checkTitle}}
			 <span :class="{trans:showList}"></span>
		</div>
		<mt-tab-container v-model="titleList.selected" :swipeable="true">
		    <mt-tab-container-item id="tab-container1">
		    	<wx-child :flag="flag[0]" :titleList="titleList" :resData="dataUrl[0]" :status="status" :account="account"></wx-child>
		    </mt-tab-container-item>
			<!-- 撤掉体验金 先注销 -->
		    <!-- <mt-tab-container-item id="tab-container2">
		    	<wx-child :flag="flag[1]" :titleList="titleList" :resData="dataUrl[1]"  :status="status"></wx-child>
		    </mt-tab-container-item> -->
		    <mt-tab-container-item id="tab-container3">
		    	<wx-child :flag="flag[2]" :titleList="titleList" :resData="dataUrl[2]"  :status="status"></wx-child>
		    </mt-tab-container-item>
		</mt-tab-container>
		<div id="layer" v-if="showList" @click="showList = false">
			<ul class="content">
				<li :class="{active:screen.use}" @click="activeLi('use',0)">未使用</li>
				<li :class="{active:screen.used}" @click="activeLi('used',1)">已使用</li>
				<li :class="{active:screen.has}" @click="activeLi('has',-1)">已失效</li>
			</ul>
		</div>
		<div class="floating" v-if="suspend"><a :href="suspend.url"><img :src="suspend.picUrl" alt=""></a></div>
	</div>
</template>

<script>

	import wxHeader from '../../../../wxHeader';
	import wxTab from '../../../../public/wx/wxTab';
	import wxChild from './wxRedChild';
	import wxInterest from './wxInterest';

	import { Indicator } from 'mint-ui';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				logoMsg:'我的红包',
				showLayer:false,	//显示筛选列表
				status:0,		//红包类型
				account:{},		//用户信息
				flag:[1,2,3],
				showList:false,
				screen:{
					use:true,
					used:false,
					has:false
				},
				screenText:{
					"tab-container1":'红包',
					// 'tab-container2':'体验金',
					'tab-container3':'加息券'
				},
				dataUrl:[
					'/red/envelope/list',
					'/experience/list',
					'/uprate/list'
				],
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'红包'
						},
						// {
						// 	tabId:'tab-container2',
						// 	text:'体验金'
						// },
						{
							tabId:'tab-container3',
							text:'加息券'
						}
					],
					selected:'tab-container1'
				},
				checkTitle:'未使用',
				suspend:{}   // 悬浮窗数据
			}
		},
		methods:{
			activeLi(num,index){
				console.log(num)
				for(var item in this.screen){
					this.screen[item] = false;
				}
				this.screen[num] = true;
				this.showList = false;
				this.status = index;
				//发送请求
				if(index == 0){
                   this.checkTitle = "未使用"
				} else if(index == 1){
                   this.checkTitle = "已使用"
				} else {
                   this.checkTitle = "已失效"
				}
			},
			
			floatingWin(){   // 悬浮窗接口
				this.notLogPost('/index/redSuspend', (data) => {
					console.log(data)
                    if(data.resData){
                       this.suspend = data.resData.data.suspend;
					}
				},{})
			}
		},
		components:{
			wxHeader,
			wxTab,
			wxChild,
			wxInterest
		},
		created(){
			Indicator.open({ spinnerType: 'fading-circle' });
			this.postData('/account/basic',(res,data) => {
				Indicator.close();
				if(data.resCode){
					this.account = data.resData.basicModel;
				}
			},{},1)
			if(!this.account.bankOpenStatus) this.account = this.$route.query;
			this.floatingWin();
		}
	}
</script>

<style lang="scss" scoped>
.mint-tab-container{
	margin-top: 1.066667rem;
}
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:999;
		top:3.55rem;
		.content li{
			background:#fff;
			height:1.066667rem;
			border-bottom:1px solid #e5e5e5;
			font-size:0.4rem;
			line-height:1.066667rem;
			text-align:center;
		}
		li.active{
			color:#ff5b4c;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/account/active.png) 9rem 0.346667rem no-repeat;
			background-size:0.4rem 0.266667rem;
		}
	}
	#repayPlan{
		.screen{
			width: 100%;
			height: 1.066667rem;
			position: fixed;
			top: 2.43rem;
			left: 0;
			z-index: 999;
			color: #333333;
			padding-right: 0.4rem;
			text-align: center;
			line-height: 1.066667rem;
			background: #fff;
			span{
				background:url(https://aliyunsso.edspay.com/web/wx/invest/back_money_ico.png) no-repeat;
				background-size: 0.4rem 0.4rem;
				width: 0.4rem;
				height: 0.4rem;
				position: relative;
				top: .08rem;
				display: inline-block;
				transform: rotate(0deg);
				transition: all 1s ease;
			}
			span.trans{
				transform:rotate(-180deg);
				-ms-transform:rotate(-180deg); /* Internet Explorer */
				-moz-transform:rotate(-180deg); /* Firefox */
				-webkit-transform:rotate(-180deg); /* Safari 和 Chrome */
				-o-transform:rotate(-180deg); /* Opera */
				transition: all 1s ease;
			}
		}
		.rules{
			position: fixed;
			width: 0.666667rem;
			height: 0.666667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/v3.3.5/icon2.png) no-repeat;
			background-size: 100%;
			top: .3rem;
			right: 0.466667rem;
			z-index: 999;
			color: #ff5b4c;
			padding-right: 0.4rem;
			
		}
		.floating{
			    width: 1.48rem;
				height: 1.6rem;
				position: fixed;
				right: .2rem;
				top: 11rem;
				z-index: 100;
				a{
					width: 100%;
					height: 100%;
					display: block;
				}
				img{
					width: 100%;
					height: 100%;
				}
		}
	}
	
</style>