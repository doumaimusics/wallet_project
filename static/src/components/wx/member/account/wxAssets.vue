<template>
	<div id="assets">
		<wx-header :logo="logoMsg"></wx-header>
		<wx-tab :tabList="titleList"></wx-tab>
		<mt-tab-container v-model="titleList.selected" :swipeable="true">
		  <mt-tab-container-item id="tab-container1">
		    <div class="echarts">
		    	<div id="myChart">
		  	
		    	</div>
		    	<ul>
		    		<li v-for=" item in assetList" class="clear">
		    			<div class="title"><i class="ic-2" :style="{background:item.color}"></i>{{item.title}}</div>
		    			<div class="money">{{item.money}}</div>
		    		</li>
		    	</ul>
		    </div>
		  </mt-tab-container-item>
		  <mt-tab-container-item id="tab-container2">
		    <div class="echarts">
		    	<div id="earnings">
		  	
		    	</div>
		    	<ul>
		    		<li v-for=" item in assetList" class="clear">
		    			<div class="title"><i class="ic-2" :style="{background:item.color}"></i>{{item.title}}</div>
		    			<div class="money">{{item.money}}</div>
		    		</li>
		    	</ul>
		    </div>
		  </mt-tab-container-item>
		</mt-tab-container>
	</div>
</template>

<script>

	import wxHeader from '../../../wxHeader';
	import wxTab from '../../../public/wx/wxTab';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				logoMsg:'我的资产',
				selected:'1',
				option:null,
				selected:'tab-container1',
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'资产'
						},
						{
							tabId:'tab-container2',
							text:'收益'
						}
					],
					selected:'tab-container1'
				},
				assetList:[
					{
						title:'存钱罐(元)',
						color:'#FFA500',
						money:5895.25
					},
					{
						title:'E起赚(元)',
						color:'#FC7A3E',
						money:5895.25
					},
					{
						title:'冻结金额(元)',
						color:'#69BCEE',
						money:5895.25
					},
					{
						title:'代收金额(元)',
						color:'#FF5A4A',
						money:5895.25
					}	
				],
				earnings:[
					{
						title:'定期回款',

					}
				]
			}
		},
		methods:{
			activeTwo(){
				
			},
			drawGraph(){
				var earnings = echarts.init(document.getElementById('earnings'));
				var myChart = echarts.init(document.getElementById('myChart'));
				
				var option = {
					  title: {
					      text: '3857354',
					      subtext: '总资产(元)',
					      x: 'center',
					      y: '40%',
					      itemGap:10,  // 主副标题纵向间隔
					      textStyle:{   //主标题字体样式
					        fontSize:15,
					        color:"#FF9E00",
					        lineHeight:20
					      },
					      subtextStyle:{  // 副标题字体样式
					        color: "#919191",
					        fontSize: 15
					      }
					},
					color:["#FFA500","#FC7A3E","#69BCEE","#FF5A4A"],
					series: [
					    {
					        name:'资产分布',
					        type:'pie',
					        radius: ['50%', '65%'],
					        avoidLabelOverlap: false,
					        default: true ,
					        animation:true,
					        label: {
					            normal: {
					                show: false,
					                position: 'center'
					            }
					        },
					        labelLine: {
					            normal: {
					                show: false
					            }
					        },
					        data:[
					            {value:335,},
					            {value:310,},
					            {value:234,},
					            {value:1548,}
					        ]
					    }
					]
				}
				
				myChart.setOption(option);
				earnings.setOption(option);

			}
		},
		components:{
			wxHeader,
			wxTab
		},
		mounted(){
			this.drawGraph();
		}
	}
</script>

<style lang="scss" scoped>
	#assets{
		
		#earnings{
			height:5.866667rem;
			background:#fff!important;

		}
		#earnings>div{
			width:100%!important;
			
		}
		#myChart{
			height:5.866667rem;
			background:#fff!important;

		}
		ul{
			background:#fff;
			padding-left:0.186667rem;
			li{
				border-top: 0.026667rem solid #ECECEC;
				height:1.413333rem;
				line-height:1.413333rem;
				padding-right: 1.12rem;
				.title{
					float:left;
					color:#616161;
					i{
						display:inline-block;
						width:0.493333rem;
						height:0.493333rem;
						margin-right: 0.56rem;
						margin-left: 0.213333rem;
					}
				}
				.money{
					float:right;
					color: #909090;
				}
			}
		}
		
	}
</style>