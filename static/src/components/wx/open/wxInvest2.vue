<template>
	<div id="invest2">
		<wx-header :logo="'项目'" :type="0"></wx-header>
		<mt-loadmore v-if="sumBorrowList.length != 0" class="investContent" :top-method="loadTop" :bottomPullText="''" :topDistance="20" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomLoadingText="botText" :bottomDropText="botText" :auto-fill="autoFill" ref="loadmore">
			<div class="eqz">
				<div class="title bdr-b">灵活理财</div>
				<div class="eqz_wrap clear">
					<div class="apr">
						<p class="apr_show">{{eqz.fluxApr}}<span>%</span></p>
						<p class="p1">预期年化</p>
					</div>
					<div class="info">
						<p>项目期限<span>{{eqz.fluxTimeLimit}}</span></p>
						<p>最低出借<span>{{eqz.fluxMinAmount}}元</span></p>
						<p>出借方式<span>{{eqz.fluxStyle}}</span></p>
					</div>
				</div>
			</div>
			<div class="limit_finacial">
				<div class="limit_title bdr-b mar">定期项目</div>
				<div class="special_finacial" v-if="special.name != ''">
					<div class="icon"><img src="https://aliyunsso.edspay.com/web/wx/index/recomm.png" alt=""></div>
					<p class="p_title">{{special.name}} | {{special.timeLimit}}{{special.timeLimitTip}}</p>
					<div class="finacial_info clear">
						<div class="info_left">
							<p class="pp1"><span class="span1">{{special.apr}}</span>%<span v-if="special.addApr">+<i>{{special.addApr}}</i>%</span></p>
							<p class="pp2">预期年化</p>
						</div>
						<div class="line"></div>
						<div class="info_right">
							<p class="pp2"><span class="span2">{{special.remainAmount ? special.remainAmount:0 | moneyWan}}</span>元</p>
							<p class="pp2">剩余金额</p>
						</div>
					</div>
					<div class="icons"  v-if="special.assetManageType == 2 || special.newbieOnly || special.addApr">
						<span class="icon1" v-if="special.assetManageType == 2">存管</span>
						<span class="icon2" v-if="special.newbieOnly">新手标</span>
						<span class="icon2" v-if="special.addApr">加息标</span>
						<div class="invest_btn" @click="goDetail({path: '/wxDetail',query: { uuid: special.uuid}})">立即出借</div>
					</div>
				</div>
				<div class="invest_list"  v-if="regular.length !=0">
					<ul>
						<li @click="goDetail({path: '/wxDetail',query: { uuid: item.uuid}})" v-for="item in regular">
							<p class="invest_title">{{item.name}} | {{item.timeLimit}}{{item.timeLimitTip}}</p>
							<div class="invest_info clear">
								<div class="invest_left">
									<p class="invest_p1">{{item.apr | moneyFormat}}<span>%</span><span v-if="item.addApr">+<i>{{item.addApr}}</i>%</span></p>
									<p class="invest_p2">预期年化</p>
								</div>
								<div class="invest_right">
									<p class="invest_remain">{{item.remainAmount ? item.remainAmount:0 | moneyWan}}<span class="invest_p2">元</span></p>
									<p class="invest_p2">剩余金额</p>
								</div>
							</div>
							<div class="icons icon_corner" v-if="item.assetManageType == 2 || item.newbieOnly || item.addApr">
								<span class="icon1" v-if="item.assetManageType == 2">存管</span>
								<span class="icon2" v-if="item.newbieOnly">新手标</span>
								<span class="icon2" v-if="item.addApr">加息标</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<div class="limit_finacial" v-if="sellOut.length !=0">
				<div class="limit_title bdr-b">售罄</div>
				<div class="invest_list">
					<ul>
						<li @click="goDetail({path: '/wxDetail',query: { uuid: item.uuid}})" v-for="item in sellOut">
							<p class="invest_title">{{item.name}} | {{item.timeLimit}}{{item.timeLimitTip}}</p>
							<div class="invest_info clear">
								<div class="invest_left">
									<p class="invest_p1 sellOut">{{item.apr | moneyFormat}}<span class="sellOut">%</span><span class="sellOut" v-if="item.addApr">+<i>{{item.addApr}}</i>%</span></p>
									<p class="invest_p2">预期年化</p>
								</div>
								<div class="invest_right">
									<p class="invest_remain sellOut">{{item.remainAmount ? item.remainAmount:0 | moneyWan}}<span class="invest_p2">元</span></p>
									<p class="invest_p2">剩余金额</p>
								</div>
							</div>
							<div class="icons icon_corner" v-if="item.assetManageType == 2 || item.newbieOnly || item.addApr">
								<span class="icon1 over" v-if="item.assetManageType == 2">存管</span>
								<span class="icon2 over" v-if="item.newbieOnly">新手标</span>
								<span class="icon2 over" v-if="item.addApr">加息标</span>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</mt-loadmore>
		<wx-null v-else :text="'暂无标的'"></wx-null>
		<div class="falFooter"></div>
		<wx-footer></wx-footer>
	</div>
</template>
<script>
	import wxFooter from '../../wxFooter';
	import wxHeader from '../../wxHeader';
	import wxNull from '../member/account/wxNull';
	import { Loadmore } from 'mint-ui';			//上拉下拉
	import { InfiniteScroll } from 'mint-ui';	//
	import { Indicator } from 'mint-ui';	//Indicator
	import getUrl from '../../../common/router/getUrl'
	export default {
		mixins: [getUrl],
		data() {
			return {
				eqz:{}, //E起赚信息
				special: {}, //推荐标的
				regular:[], //定期理财
				sellOut:[], //售罄标的
				values:{}, //传值
				pageNum:1,  //当前页数
				sumBorrowList:[], //是否有标的信息展示
				pages:0, //总条数
				allLoaded:false,	//是否允许加载
				autoFill:false,		//是否默认加载
				botText:'',
			}
		},
		methods: {
			getListDate(num){
				this.values.token = this.getCookie('userToken');
				this.values.pageNum = num;
				this.values.pageSize = 10
				this.notLogPost('/borrow/investList',(data) =>{
					if(data.resCode){
						var that = this
						var pageList = data.resData.pageInfo.list
						if(num == 1){
							that.sumBorrowList = data.resData.pageInfo.list;
							that.regular = [];
							that.sellOut = [];
							if(data.resData.pageInfo.list[0].recommended){
								that.special = data.resData.pageInfo.list[0];
								data.resData.pageInfo.list.shift()
							}
							that.pages = data.resData.pageInfo.list;
							pageList = that.pages;

						}else{
							that.sumBorrowList = that.sumBorrowList.concat(data.resData.pageInfo.list)
						}
						for (var i=0; i < pageList.length; i++){
							if( pageList[i].progress == 100 ){
								that.sellOut.push(pageList[i]) 
							}else{
								that.regular.push(pageList[i])
							}
						}
					}
					this.$refs.loadmore.onBottomLoaded();
				},this.values,1)
			},
			getEqzData(){
				this.notLogPost('/index/ePlan',(data) =>{
					if(data.resCode){
						this.eqz = data.resData.data
					}
				},{isBorrowList:1})
			},
			goDetail(goUrl){
				console.log(this.thisUrl)
				this.$router.push(goUrl)
			},
			
			loadTop() {
			  // 加载更多数据
			  var that = this;
			  this.pageNum = 1;
			  setTimeout(function(){
			  	that.getListDate(that.pageNum);
			  	this.$refs.loadmore.onTopLoaded();
			  },500)
			  
			},
			loadBottom() {
			  // 加载更多数据
			  var that = this;
			  this.allLoaded = true;// 若数据已全部获取完毕
			  if(this.pages < this.pageNum) return
			  this.pageNum +=1;
			var timer = setTimeout(function(){
				that.getListDate(that.pageNum);
				that.allLoaded = false;
				clearTimeout(timer)
			},500)

			  
			},
		},
		components:{
			wxHeader,
			wxFooter:wxFooter,
			wxNull,
		},
		created(){
			this.getListDate(this.pageNum);
			this.getEqzData()
		}
	}
</script>
<style lang="scss" scoped>
	#invest2{
		.falFooter{
			height:1rem;
		}
		.mint-loadmore-content{
			.mint-loadmore-bottom{
				position:relative!important;
				top:-1.6rem!important;
			}
		}
		.icons{
			font-size: 0.293333rem;
			span{padding:0.066667rem 0.146667rem;}
			.icon1{
				color: #FFFFFF;
				background: #4CB1FF;
			}
			.icon2{
				color: #DEB96F;
				background: #FAF4E8;
				margin-left: 0.133333rem;
			}
			.over{
				background: #dddddd;
				color:#ffffff;
			}
			.invest_btn{
				padding: 0.15rem 0.333333rem;
				border: 1px solid #FF5B4C;
				position: absolute;
				right: 0.4rem;
				bottom: 0.2rem;
				color: #FF5B4C;
				font-size: 0.373333rem;
			}
		}
		.icon_corner{
			height: .9rem;
		}
		.eqz{
			background: #ffffff;
			padding:0.4rem;
			margin-bottom: 0.306667rem;
			.title{
				height: 1.173333rem;
				line-height: 1.173333rem;
				font-size: 0.506667rem;
				color: #333333;
				position: relative;
				margin-bottom: 0.52rem;
			}
			.eqz_wrap{
				position: relative;
				div{
					width: 49.5%;
					float: left;
					text-align: left;
					height: 1.866667rem;
					.pp2{
						font-size: 0.32rem;
						color: #808080;
					}
					.apr_show{
						font-size: 1.333333rem;
						color: #FF5B4C;
						line-height: 1.0rem;
						span{
							font-size: 0.453333rem;
							color: #FF5B4C;
						}
					}
					.p1{
						font-size: 0.32rem;
						color: #808080;
					}
				}
				.apr{
					border-right: 1px solid #E5E5E5;
				}
				.info{
					padding-left: 0.266667rem;
					p{
						font-size: 0.32rem;
						color: #808080;
						padding-top: 0.13rem;
						span{
							font-size: 0.32rem;
							color: #333333;
							padding-left: 0.173333rem;
						}
					}
				}
			}
		}
		.bdr-b:after {
			border-bottom: 1px solid #E5E5E5;
		}
		.limit_finacial{
			background: #ffffff;
			padding:0.4rem .4rem 0;
			margin-bottom: 0.306667rem;
			position: relative;
			
			.limit_title{
				height: 1.173333rem;
				line-height: 1.173333rem;
				font-size: 0.506667rem;
				color: #333333;
				position: relative;
				margin-bottom: 0.52rem;
			}
			.mar{
				margin-bottom: 0;
			}
			.special_finacial{
				background: #f5f8fc;
				padding:0.493333rem 0.4rem 0.4rem 0.533333rem; 
				position: relative;
				margin-top: .32rem;
				.p_title{
					margin-bottom: 0.693333rem;
				}
				.icon{
					position: absolute;
					top: 0;
				    right: 0;
					width: 1.04rem;
					height: 1.04rem;
					img{
						width: 100%;
					}

				}
				.finacial_info{
					border-bottom: 1px dashed #e5e5e5;
					padding-bottom: 0.6rem;
					margin-bottom: 0.4rem;
					div{
						float: left;
						width: 49.5%;
						.pp2{
							font-size: 0.32rem;
							color: #808080;
						}
					}
					.info_left{
						height: 1.44rem;
						.pp1{
							font-size: 0.453333rem;
							color: #FF5B4C;
							line-height: .9rem;
						    height: 1rem;
							.span1{
								font-size: 1.2rem;
								color: #FF5B4C;
							}
						}
					}
					.line{
						width: 2px ;
						height:1.44rem;
						border-right: 1px solid #e5e5e5;;
					}
					.info_right{
						height: 1.066667rem;
						p{
							padding-left: 0.266667rem;
						}
						.span2{
							font-size: 0.48rem;
							color: #333333;
						}
					}
				}
			}
			.invest_list{
				ul{
					li{
						border-bottom: 1px solid #E5E5E5;
						.invest_title{
							font-size: 0.373333rem;
							color: #333333;
							padding-top: 0.48rem;
							padding-bottom:0.533333rem; 
						}
						.invest_info{
							padding-bottom: 0.266667rem;
							div{
								float: left;
								width: 49.5%;
								height: 1.066667rem;
								.invest_p2{
									font-size: 0.32rem;
									color: #808080;
								}
							}
							.invest_left{
								.invest_p1{
									font-size: 0.666667rem;
									color: #FF5B4C;
								    line-height: .5rem;
									span{
										font-size: 0.453333rem;
										color: #FF5B4C;
									}
								}
							}
							.invest_right{
								border-left: 1px solid #e5e5e5;
								padding-left: 0.266667rem;
								.invest_remain{
									font-size: 0.48rem;
									color: #333333;
								}
							}
							.sellOut{
								color:#cccccc !important;
							}
						}
					}
				}
			}
		}
		
	}
</style>