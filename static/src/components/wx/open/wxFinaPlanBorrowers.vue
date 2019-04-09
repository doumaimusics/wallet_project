<template>
	<div class="borrower_list">
		<div v-title>债权组成</div>
		<!-- <p class="tips">注：出借人以最终智能匹配到的借款人为准</p> -->
		<div class="cash_distribotion" v-if="showHd">
			<div class="cash_tips">分散出借于多个借款项目中</div>
			<span class="echart_title">金额分布</span>
			<div class="cash_chart">

				<div class="echarts clear">
				  <div id="investPie" class="pie fl"></div>
				  <div class="content fl">
				  	<ul>
				  		<li><span class="span1 cl1"></span><span class="span2 cl11">{{pieData[0].name}}</span><span class="span3">{{moneyScat.thousandOne}}%</span></li>
				  		<li><span class="span1 cl2"></span><span class="span2 cl22">{{pieData[1].name}}</span><span class="span3">{{moneyScat.thousandTwo}}%</span></li>
				  		<li><span class="span1 cl3"></span><span class="span2 cl33">{{pieData[2].name}}</span><span class="span3">{{moneyScat.thousandThree}}%</span></li>
				  		<li><span class="span1 cl4"></span><span class="span2 cl44">{{pieData[3].name}}</span><span class="span3">{{moneyScat.thousandFour}}%</span></li>
				  		<li><span class="span1 cl5"></span><span class="span2 cl55">{{pieData[4].name}}</span><span class="span3">{{moneyScat.thousandFivene}}%</span></li>
				  		<li><span class="span1 cl6"></span><span class="span2 cl66">{{pieData[5].name}}</span><span class="span3">{{moneyScat.thousandSix}}%</span></li>
				  		<li><span class="span1 cl7"></span><span class="span2 cl77">{{pieData[6].name}}</span><span class="span3">{{moneyScat.thousandseven}}%</span></li>
				  	</ul>
				  </div>
				</div>
				<!-- <div class="echarts-ti echarts-ti5"></div> -->
			</div>
			<div class="cash_title">
				<div class="red_ico"></div>
				<span>债权明细</span>
			</div>
			<div class="tipsText">仅展示部分数据，以最终匹配到的借款人为准</div>
		</div>
		<div class="tidai" v-if="showHd"></div>
		<mt-loadmore v-if="borrowList.length" class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul>
				<li v-for="item in borrowList" @click="toWxUrl('/wxBorrowerDetail','orderNoss',item.orderNo)">
					<div class="borrow_number bdr-b"><span>借款编号：</span>{{item.orderNo}} <i>查看更多</i></div>
					<div class="borrower_detail">
						<p><span class="span1">借款人</span><span class="span2">{{item.name}}</span></p>
						<p><span class="span1">身份证号</span><span class="span2">{{item.cardId}}</span></p>
						<p><span class="span1">借款金额(元)</span><span class="span2">{{item.money | moneyFormat}}</span></p>
					</div>
				</li>
			</ul>
		</mt-loadmore>		
		<wx-null v-else :img="'https://aliyunsso.edspay.com/web/wx/account/jinxingzhon_null.gif'" :text="'债权信息正在获取中...'"></wx-null>
		<!-- 底部文字 -->
		<div class="footer-div" v-if="onOff">
			<img src="https://aliyunsso.edspay.com/web/wxUpdate/left_line.png" alt="">
			数据过多，仅展示部分数据
			<img src="https://aliyunsso.edspay.com/web/wxUpdate/right_line.png" alt="">
		</div>
		<!-- <div class="nothing"></div> -->
	</div>
</template>
<script>
	import { Loadmore } from 'mint-ui';
	import wxToapp from '../../../common/wx/wxToapp';	//适配app
	import wxNull from '../member/account/wxNull';
	export default {
		mixins:[wxToapp],
		// props:['planId'],
		data() {
			return {
				pageNum:1,
				pages:1,
				allLoaded:false,
				autoFill:false,
				borrowList: [],
				moneyScat:{}, //资金分散
				uuid:'',
				pieData:[
				  {value:'',name:'0-1000元'},
				  {value:'',name:'1001-2000元'},
				  {value:'',name:'2001-3000元'},
				  {value:'',name:'3001-4000元'},
				  {value:'',name:'4001-5000元'},
				  {value:'',name:'5001-6000元'},
				  {value:'',name:'6000元以上'}

				],
				onOff:false,
				showHd:true
			}
		},
		methods: {
			goBorrowerDetail(item) {
				this.toApp('toWeb|'+ item.orderNo +'|https://'+ window.location.host +'/#/wxBorrowerDetail?orderNoss='+ item.orderNo,{path:'/wxBorrowerDetail',query:{orderNoss:item.orderNo}})
			},
			getBorrData(num) {
				this.notLogPost('/financePlan/borrowList',(data) =>{
					console.log(data);
					if ( data.resCode ) {
						if(data.resData.pageInfo.list != ''){
							this.showHd = true;
						}else{
							this.showHd = false;
						}
						if (num == 1) {
							this.pages = data.resData.pageInfo.pages;
							this.borrowList = data.resData.pageInfo.list	
						} else {
							this.borrowList = this.borrowList.concat(data.resData.pageInfo.list);
						}
					}else{
						this.showHd = false;
					}
					if(this.pages == num){
						this.onOff = true;
					}
				},{pageNum:num,pageSize:10,planId:this.uuid},1)
				
			},
			circleData(num) {
				this.notLogPost('/financePlan/borrowListCapitalDistribution',(data) =>{
					if ( data.resCode ) {
						this.moneyScat = data.resData;
						this.pieData[0].value = data.resData.thousandOne;
						this.pieData[1].value = data.resData.thousandTwo;
						this.pieData[2].value = data.resData.thousandThree;
						this.pieData[3].value = data.resData.thousandFour;
						this.pieData[4].value = data.resData.thousandFivene;
						this.pieData[5].value = data.resData.thousandSix;
						this.pieData[6].value = data.resData.thousandseven;
						console.log(this.pieData[4].value)
					}
					this.getPie()
				},{planId:this.uuid},1)
				
			},
			loadBottom(){
				this.allLoaded = true;
				var that = this;
				this.pageNum++
				var timer = setTimeout(function(){
					if(that.pages>=that.pageNum){
						that.getBorrData(that.pageNum);
						that.allLoaded = false;
					} else {
						that.onOff = true;
					}
					that.$refs.loadmore.onBottomLoaded(); 
					clearTimeout(timer);
				},500)
			},
			getPie(){
			  var pie = echarts.init(document.getElementById('investPie'));

			  var pieOption = {
			    
			    series: [
			        {
			            name:'zijinfenbu',
			            type:'pie',
			            radius: ['58%', '70%'],
			            avoidLabelOverlap: false,
			            hoverAnimation:true,
			            color:['#BFDAF5','#84BCF5','#53A4F5','#B0B5F5','#7A83F5','#4550F5','#F4B649'],
			            hoverOffset:5,
			            label: {
			                normal: {
			                    show: false,
			                    position: 'center'
			                },
			                emphasis: {
			                    show: true,
			                    textStyle: {
			                        fontSize: '10',
			                        fontWeight: 'bold',
			                        color:'#4CB1FF'
			                    }
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:this.pieData
			        }
			    ]
			  }

			  pie.setOption(pieOption);
			}
		},
		components: {
			wxNull
		},
		mounted(){
			// this.getPieData(this.pieData,'/query/getEarnForUser',{},'investPie')
			// this.getPie();
		},
		created() {
			this.uuid = this.$route.query.uuid;
			this.getBorrData(this.pageNum);
			this.circleData();
			this.PassValue('NavWhite_'+'债权组成');
		}
	}
</script>
<style scoped lang="scss">
	.borrower_list{
		font-family: PingFangSC-Regular;
		width: 100%;
		position: relative;
		
		.tips{
				padding: 0.266667rem 0.8rem;
				font-size: 0.32rem;
				color: #8D8D8D;
				line-height: .6rem;
			}
		
		.nothing{
			height: 1.173333rem;
			width: 100%;
		}
		.tips{
			padding: 0.266667rem 0.8rem;
			font-size: 0.32rem;
			color: #8D8D8D;
			line-height: .6rem;
		}
		.tidai{
			height: 7.68rem;
		}
		.echart_title{
			position: absolute;
		    left: 1.8rem;
		    top:3.04rem;
		    font-family: PingFangSC-Regular;
		    font-size: 0.426667rem;
		    line-height:0.613333rem;
		    color: #333333;
		}
		.cash_distribotion{
			width: 100%;
			height: 7.066667rem;
			position: fixed;
			z-index: 20;
			left: 0;
			// top: 1.33rem;
			.cash_tips{
				width: 100%;
				height: 0.8rem;
				background-image: linear-gradient(-90deg, #8FB4FF 0%, #84ADFE 100%);
				text-align: center;
				line-height: 0.8rem;
				font-size: 0.373333rem;
				color: #FFFFFF;
			}
			.cash_chart{
				width: 100%;
				height: 5.066667rem;
				background: #ffffff;
			}
			.cash_title{
				width: 100%;
				height: 1.186667rem;
				background: #f8f8f8;
				.red_ico{
					width: 0.08rem;
					height: 0.266667rem;
					background: #ff5b4c;
					border-radius: 3px;
					position: relative;
				    top: .6rem;
				    left: .4rem;
				}
				span{
					font-size: .4rem;
				    color: #333333;
				    margin-left: .55rem;
				    top: .2rem;
				    position: relative;
				}
			}
			.tipsText{
				font-size:0.293333rem;
				line-height:0.4rem;
				padding-left: 0.613333rem;
				color:#A3A3A4;
				background:#f8f8f8;
			}
		}
		.mtContent{
		    // top: 7.1rem;
    		position: relative;
		}
		.echarts{
		  position:relative;
		  height: 100%;
		}
		.pie{
			width: 5.373333rem;
			height: 100%;
		}
		.fl{
			float: left;
		}
		.content{
			width: 4.533333rem;
			height: 100%;
			ul{
				width: 100%;
				padding-top: 0.5rem;
				li{
					width: 100%;
					height: 0.32rem;
					margin-bottom: .2rem;
					span{
						display: inline-block;
					}
					.span1{
					    width: .32rem;
					    height: .32rem;
					    background: #BFDAF5;
					    margin-right: 0.146667rem;
					}
					.span2{
						font-size: 0.32rem;
						color: #BFDAF5;
						line-height: 0.32rem;
						width: 2.5rem;
					}
					.span3{
						font-size: 0.32rem;
						color: #333333;
					}
					.cl1{background: #BFDAF5;color: #BFDAF5;}
					.cl11{color: #BFDAF5;}
					.cl2{background: #84BCF5;color: #84BCF5;}
					.cl22{color: #84BCF5;}
					.cl3{background: #53A4F5;color: #53A4F5;}
					.cl33{color: #53A4F5;}
					.cl4{background: #B0B5F5;color: #B0B5F5;}
					.cl44{color: #B0B5F5;}
					.cl5{background: #7A83F5;color: #7A83F5;}
					.cl55{color: #7A83F5;}
					.cl6{background: #4550F5;color: #4550F5;}
					.cl66{color: #4550F5;}
					.cl7{background: #F4B649;color: #F4B649;}
					.cl77{color: #F4B649;}
				}
			}
		}
		.echarts-ti{
		  height:7rem;
		}
		.echarts-ti5{
		  height:5.013333rem;
		  
		}
		.wrapper{
			ul{
				width: 100%;
				li{
					width: 100%;
					padding: 0 0.4rem;
					background: #ffffff;
					margin-bottom: 0.266667rem;
			    	clear: both;
		    	    background: #fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9.3rem 0.51rem no-repeat;
		    	    background-size: 0.18rem 0.3rem;
					.borrow_number{
						width: 100%;
						height: 1.333333rem;
						line-height: 1.333333rem;
						font-size: 0.373333rem;
						color: #494743;
						position: relative;
						span{
							font-size:0.346667rem;
							color: #808080;
						}
						i{
							float: right;
							font-size:0.346667rem;
							color:#808080;
							padding-right: 0.38rem;
						}
					}
					.borrower_detail{
						padding: 0.333333rem 0;
						p{
							font-size: 0;
							span{
								display: inline-block;
								width: 50%;
								font-size: 0.346667rem;
								line-height: 0.666667rem;
							}
							.span1{
								text-align: left;
								color: #8E8E8E;
							}
							.span2{
								text-align: right;
								color: #333333;
							}
						}
					}
				}
			}
		}
		.footer-div {
			font-size: .293333rem;
			color: #C1C1C1;
			line-height: .533333rem;
			text-align: center;
			// margin: .44rem 0rem .44rem 0rem;
		    margin: 0.44rem 0rem 0.4rem 0rem;
			img {
				width: 1.573333rem;
				height: .56rem;
				margin: 0 .133333rem;
			}
		}
	}
</style>