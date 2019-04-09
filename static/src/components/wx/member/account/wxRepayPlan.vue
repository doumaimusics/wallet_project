<!--回款计划 -->
<template>
	<div id="repayPlan">
		<div v-title>{{logoMsg}}</div>
		<!-- <wx-header :logo="logoMsg"></wx-header> -->
		<!-- <div class="screen" @click = "showLayer = !showLayer">筛选</div> -->
		<wx-tab v-if="(bkOpenStatus == 1 && generalSw == 1 && sinaTotalMoney != 0) || (bkOpenStatus == 3 && generalSw == 1 && sinaTotalMoney != 0)" :tabList="titleList"></wx-tab>
		<div class="filter" @click = "showLayer = !showLayer">
			<div class="back_filter bdr-b">
				{{checkTitle}} <span :class="{trans:showLayer}"></span>
				<!-- <div class="middle_text"> -->
			</div>
		</div>
		<mt-tab-container v-model="titleList.selected">
			<mt-tab-container-item id="tab-container1">
		    	<wx-child  :flag="flag[1]" :titleList="titleList" :status="status" :checkTitle="checkTitle"></wx-child>
		    </mt-tab-container-item>
		    <mt-tab-container-item id="tab-container2" v-if="(bkOpenStatus == 1 && generalSw == 1) || (bkOpenStatus == 3 && generalSw == 1)">
				<wx-child  :flag="flag[0]" :titleList="titleList" :status="status"></wx-child>
		    </mt-tab-container-item>
		    
		</mt-tab-container>
		<div id="layer" v-show="showLayer" @click="showLayer = false" :class="{layerTop1:(bkOpenStatus == 1 && generalSw == 1 && sinaTotalMoney != 0) || (bkOpenStatus == 3 && generalSw == 1 && sinaTotalMoney != 0)}">
			<ul class="content">
				<li :class="{active:screen.awai}" @click="activeLi('awai',0)">待回款</li>
				<li :class="{active:screen.has}" @click="activeLi('has',1)">已回款</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import wxChild from './wxRepayplanChild';
	import wxTab from '../../../public/wx/wxTab';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				logoMsg:'回款计划',
				allLoaded:true,
				flag:[1,2],
				showLayer:false,	//显示弹框
				zsOpenStatus:0,
				bkOpenStatus:0,//是否开通新浪、浙商
				status:0,	//回款状态
				sinaTotalMoney:0,   // 新浪总资产
				generalSw:0,//判断新浪是否展示
				checkTitle:'待回款',//选中的已回款、待回款文案
				screen:{
					awai:true,
					has:false,
				},
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'存管项目'
						},
						{
							tabId:'tab-container2',
							text:'普通项目'
						}
					],
					selected:'tab-container1'
				},
			}
		},
		methods:{
			activeLi(num,index){
				this.status = index;
				for(var item in this.screen){
					this.screen[item] = false;
				}
				this.screen[num] = true;
				this.showLayer = false;
				if(index == 0){
					this.checkTitle = '待回款'
				}else if(index == 1){
					this.checkTitle = '已回款'
				}
				//发送请求
			},
		},
		components:{
			wxTab,
			wxChild
		},
		created(){
			this.zsOpenStatus = this.getCookie('zsOpenStatus');
			this.bkOpenStatus = this.getCookie('bkOpenStatus');
			this.generalSw = this.getCookie('generalSw');
			this.sinaTotalMoney = this.getCookie('sinaTotalMoney');  // 新浪总资产
		}
	}
</script>

<style lang="scss" scoped>
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:999;
		top:1.08rem;
		.content li{
			background:#fff;
			height:1.066667rem;
			border-bottom:1px solid #e5e5e5;
			font-size:0.4rem;
			line-height:1.066667rem;
			text-align:center;
			// padding-left: 0.533333rem;
			color: #333333;
		}
		li.active{
			color:#ff5b4c;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/account/active.png) 9rem 0.346667rem no-repeat;
			background-size:0.4rem 0.266667rem;
		}
	}
	.layerTop1{
	    top: 2.16rem !important;
	}
	#repayPlan{
		.screen{
			position: fixed;
			font-size: 0.373333rem;
			line-height: 1.333333rem;
			top: 0;
			right: 0;
			z-index: 999;
			color: #ff5b4c;
			padding-right: 0.4rem;
		}
		.top{
			height:3.466667rem;
			text-align:center;
			background:#fff;
			.title{
				font-size: 0.373333rem;
				line-height:1.76rem;
				padding-bottom:0.533333rem;
			}
			.money{
				color:#ff5b4c;
				font-size:0.666667rem;
				line-height: 0.666667rem;
			}
		}
		.filter{
			position: relative;
			height: 1.066667rem;
			.back_filter{
				width: 100%;
				height: 1.08rem;
				position: fixed;
				left: 0;
				z-index: 98;
			    background: #ffffff;
			    text-align: center;
		        line-height: 1.08rem;
		        font-size: 0.4rem;
		        padding-left: 0.4rem;
			    .middle_text{
			    	width: 2.0rem;
			    	height: 1.066667rem;
			    	margin: 0 auto;
			    	font-size: 0.4rem;
			    	color: #333333;
			    	line-height: 1.066667rem;
		    	    padding-left: .35rem;
			    }
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
		}
		ul{
			background:#fff;
			.title{
				height:1.386667rem;
				line-height:1.386667rem;
				padding-left:0.426667rem;
				background:#F0EFF5;
				color:#969696;
				font-size:0.426667rem;
			}
			.plan{
				padding:0.88rem 0 0 0.426667rem;
				
				.name{
					height:0.373333rem;
					font-size:0.373333rem;
					line-height:0.373333rem;
					padding-left:0.266667rem;
					margin-bottom:0.453333rem;
					border-left: 0.08rem solid #ff5a4a;
					span{
						color:#9A9A9A;
						padding-left:0.2rem;
					}
				}
				.principal{
					font-size:0.4rem;
					line-height:0.453333rem;
					padding-bottom:0.32rem;
					padding-top:0.48rem;
					border-bottom:0.026667rem solid #F0F0F4;
					h4{
						float:left;
						width:60%;
					}
					h6{
						float:left;

					}
				}
			}
		}
	}
	
</style>