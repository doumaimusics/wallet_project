<template>
	<div id="wxInvest">
		<div v-title>项目</div>
		<mt-loadmore v-if="sumBorrowList.length != 0" class="investContent" :top-method="loadTop" :bottomPullText="''" :topDistance="20" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomLoadingText="botText" :bottomDropText="botText" :auto-fill="autoFill" ref="loadmore">
			<!-- 推荐标 新手和智能推荐 -->
			<div v-if="recommend.name != ''" class="recommend mar">
				<div class="content" @click="gotoDetail(recommend)" v-if="recommend.recommended">
					<div class="listTitle hidden">
						{{recommend.name}}
						<div v-if="recommend.newbieOnly" class="ic_4 ic">新手专享</div>
						<div class="ic_3 ic" v-else-if="recommend.recommended && !recommend.newbieOnly">智能推荐</div>
						<div v-if="recommend.addApr" class="ic_5 ic">平台加息</div>
						<div v-if="recommend.vipUprateApr" class="ic_6 ic">v{{recommend.vipLevel}}加息</div>
						<div v-if="recommend.redUseNum" class="ic_7 ic">{{recommend.redUseNum}}张可用</div>
					</div>
					<div class="sepcial">
						<div class="percent">
							<div class="percentNum">{{recommend.apr ? recommend.apr:0 | returnFloat(1)}}<span>%</span>
								<span v-if="recommend.addApr && recommend.vipUprateApr">+{{(recommend.addApr + recommend.vipUprateApr)  | returnFloat(1)}}%</span>
								<span v-else-if="recommend.addApr">+{{recommend.addApr | returnFloat(1)}}%</span>
								<span v-else-if="recommend.vipUprateApr">+{{recommend.vipUprateApr | returnFloat(1)}}%</span>
							</div>
							<div class="text">参考年化</div>
						</div>
						<div class="info">
							<p><span class="invest_remain">{{recommend.remainAmount ? recommend.remainAmount:0 | moneyWan}}</span>元</p>
							<p v-if="recommend.newbieOnly">剩余金额(使用红包，回报更高)</p> 
							<p v-else>剩余金额</p>
						</div>
					</div>
					<img @click.stop="goDetail(recommend)" v-if="recommend.progress !== 100" src="https://aliyunsso.edspay.com/web/wxUpdate/big_button1.png" class="bigBtn"/>
					<img @click.stop="goDetail(recommend)" v-else  src="https://aliyunsso.edspay.com/web/wxUpdate/lijichujie_hui.png" class="bigBtn"/>
					<div class="recomIcons" v-if="recommend.newbieOnly">
						<span v-for="icon in recommendIcons" class="recomIcons-span">
							<img :src="icon.img"/>
							<span>{{icon.text}}</span>
						</span>
					</div>
				</div>
			</div>
			<!-- 正常出借列表组件 -->
			<invest-item :typeNum="2" :item="item" :userStatusInfo="userStatusInfo" v-for="item in steady"></invest-item>
			<!-- 底部文字 -->
			<div class="footer-div">
				<img src="https://aliyunsso.edspay.com/web/wxUpdate/left_line.png" alt="">
				预计收益不代表实际收益，出借需谨慎
				<img src="https://aliyunsso.edspay.com/web/wxUpdate/right_line.png" alt="">
			</div>
		</mt-loadmore>
		<!-- 出借列表悬浮按钮 -->
		<div v-if="itemSuspend" class="floating">
			 <div >
				 <img :src="itemSuspend.picUrl" alt="" @click="toRemainingInvest()">
			 </div>
		</div>
		<div class="falFooter"></div>
		<wx-footer></wx-footer>
	</div>
</template>

<script>
	import wxFooter from '../../wxFooter';
	import CssCircle from '../../public/wx/v-circle';
	import wxNull from '../member/account/wxNull';
	import getUrl from '../../../common/router/getUrl'
	import { Loadmore } from 'mint-ui';			//上拉下拉
	import { InfiniteScroll } from 'mint-ui';	//
	import { Indicator } from 'mint-ui';	//Indicator
	import wxInvestItem from '../../public/wx/wxInvestItem'; // 引入列表组件
	export default {
		mixins: [getUrl],
		data(){
			return {
				allLoaded:false,	//是否允许加载
				autoFill:false,		//是否默认加载
				isnum:1,
				botText:'',
				pageNum:1,	//当前页数
				pages:0,	//总页数
				recommend:{},		//推荐标的
				steady :[],	//長期穩健
				sellOut :[],	//已售罄
				Eqz:false,		//一起赚
				sumBorrowList:[],
				hasGetData:false,
				text:'',
				recommendIcons:[
					{img:'https://aliyunsso.edspay.com/web/wxUpdate/icon1.png',text:'智能推荐算法'},
					{img:'https://aliyunsso.edspay.com/web/wxUpdate/icon2.png',text:'结合风险测评'},
					{img:'https://aliyunsso.edspay.com/web/wxUpdate/icon3_copy.png?v1.1',text:'系统分散出借'},
				],
				redNum:{
					thirtyDay:0,//30天可用
					sixtyDay:0,//60天可用
					ninetyDay:0,//90天可用
					OneHundredAndEightyDay:0,//180天可用
					threeHundredAndSixtyDay:0//360天可用
				},//红包个数
				userStatusInfo:0,//是否直接跳转投资页
				itemSuspend:{
					url:null,
					picUrl:null
				},
			}
		},
		methods: {
			toEqzAccount(){	//去一起赚首页
				this.postData('/index/ePlan',(res,data) =>{
					if(data.resCode){
						this.$router.push({path:'/wxEqzAccount',query:{isOpenEqz:data.resData.data.isOpen}})
					}
				},{},1)
			},
			goDetail(item){
				if (item.assetManageType == 3 ) {
					if(this.userStatusInfo){
						this.$router.push({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:item.uuid}})
					}else{
						this.$router.push({path: '/wxDetailPoint',query: { uuid: item.uuid}})
					}
				} else {
					this.$router.push({path: '/wxDetail',query: { uuid: item.uuid}})
				}
			},
			gotoDetail(item){
				if (item.assetManageType == 3 ) {
					this.$router.push({path: '/wxDetailPoint',query: { uuid: item.uuid}})
				} else {
					this.$router.push({path: '/wxDetail',query: { uuid: item.uuid}})
				}
			},
			getinvestList(num){		//获取列表数据
				var that = this;
				this.text = '列表加载中...';
				this.notLogPost('/borrow/investList',(data) =>{
					this.userStatusInfo = data.resData.userStatusInfo;
					that.hasGetData = true;
					this.text = '暂无列表';
					if(data.resCode == 1){
						var pageList = data.resData.pageInfo.list;
						//遍历可用红包
						for(var j=0; j<pageList.length; j++){
							var redUseNum = 0
							//红包和加息券 0可用 1不可用

							if(pageList[j].isRedEnvelope == 0 && pageList[j].isUpRate == 0){ //红包加息券都可用
								if(pageList[j].newbieOnly){ //新手标
									for(var i=0; i<data.resData.redModel.length; i++){
										//优惠券为无限制和只为新手标可用
										if(data.resData.redModel[i].category != 1 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit){//没有时间上限
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit && pageList[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}else{ //普通标
									for(var i=0; i<data.resData.redModel.length; i++){
										//优惠券为无限制和只为普通标可用
										if(data.resData.redModel[i].category != 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit){//没有时间上限
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit && pageList[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}
							}else if(pageList[j].isRedEnvelope == 0 && pageList[j].isUpRate == 1){ //红包可用、加息券不可用
								if(pageList[j].newbieOnly){
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 1 && data.resData.redModel[i].type != 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit && pageList[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}else{
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 0 && data.resData.redModel[i].type != 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit && pageList[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}
							}else if(pageList[j].isRedEnvelope == 1 && pageList[j].isUpRate == 0){ //红包不可用、加息券可用
								if(pageList[j].newbieOnly){
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 1 && data.resData.redModel[i].type == 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit && pageList[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}else{
									for(var i=0; i<data.resData.redModel.length; i++){
										if(data.resData.redModel[i].category != 0 && data.resData.redModel[i].type == 0 && data.resData.redModel[i].category != 2){
											if(data.resData.redModel[i].maxDayTime == 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit){
												redUseNum++
											}else if(data.resData.redModel[i].maxDayTime != 0 && data.resData.redModel[i].minDayTime <= pageList[j].timeLimit && pageList[j].timeLimit <= data.resData.redModel[i].maxDayTime){
												redUseNum++
											}
										}
									}
								}
							}

							//可用红包数量
							data.resData.pageInfo.list[j].redUseNum = redUseNum
						}

						if(num == 1){
							that.sumBorrowList = data.resData.pageInfo.list;
							that.steady = [];
							that.sellOut = [];
							if(data.resData.pageInfo.list[0].recommended){
								that.recommend = data.resData.pageInfo.list[0];
								data.resData.pageInfo.list.shift();
							}
							pageList = data.resData.pageInfo.list;
							that.pages = data.resData.pageInfo.pages;
						}else{
							that.sumBorrowList = that.sumBorrowList.concat(data.resData.pageInfo.list);
							that.$refs.loadmore.onBottomLoaded();
						}
						for(var i = 0 ;i<pageList.length ; i++ ){ 
							if(pageList[i].goodType == 3){
								that.sellOut.push(pageList[i]);
							}else{
								that.steady.push(pageList[i]);
							}
						}

						
						
					}
				},{pageNum:num,pageSize:10},1)  
			},
			getSuspend(){   // 悬浮按钮接口
				this.notLogPost('/index/itemSuspend',(data)=>{
					console.log(data)
					this.itemSuspend = data.resData.data.suspend;
				},{})
			},
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					that.getinvestList(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
				},500)
			},
			loadBottom(){
				var that = this;
				this.allLoaded = true;
				if(this.pages <= this.pageNum){
					that.$refs.loadmore.onBottomLoaded();
					return;
				}

				this.pageNum += 1;
				var timer = setTimeout(function(){
					that.getinvestList(that.pageNum);
					that.allLoaded = false;
					clearTimeout(timer)
				},500)
			},
			getEqz(){
				this.notLogPost('/index/ePlan',(data) => {
					if(data.resCode){
						this.Eqz = data.resData.data;
					}
				},{isBorrowList:1})
			},
			toRemainingInvest(){    // 跳转余额智投
				if(!this.isLogin){
                    this.$router.push({
						path:'/wxLogin',
						query:{thisUrl:'/wxMyAccount/wxRemainingInvest?sourceUrl='+1}
					})
				} else {
					window.location.href = this.itemSuspend.url;
				}
			}
		},
		computed:{
			isLogin:{
				get(){
					if(this.getCookie('userToken')) return true;
					else return false;
				},
				set(){}
			},
			isZsOpen:{
				get(){
					if(this.getCookie('zsOpenStatus')== 1) return true;
					else return false;
				},
				set(){}
			}
		},
		components:{
			wxFooter:wxFooter,
			cssCircle:CssCircle,
			'invest-item':wxInvestItem,
			wxNull,
		},
		created(){
            this.getinvestList(this.pageNum);
            this.getSuspend();
            // this.getRedpacktNum()
            // this.getEqz();
        }
	}
</script>

<style lang="scss" scoped>
	.investContent{
		min-height: 15.12rem;
	}
	.greyBtn {
		background: #DDDDDD !important;
	}
	.mint-loadmore-content{
		.mint-loadmore-bottom{
			position:relative!important;
			top:-1.6rem!important;
		}
	}
	.bdr-l:after {
	    height: 100%;
	    content: '';
	    width: 1px;
	    border-left: 1px solid #e5e5e5;
	    position: absolute;
	    top: 0;
	    left: -1px;
	    transform: scaleX(0.5);
	    -webkit-transform: scaleX(0.5);
	    z-index: 10;
	}
	#wxInvest{
		font-family: DIN-Medium;
		background:#f8f8f8;
		/*底部图片*/
		.floating{
			width: 1.48rem;
			height: 1.6rem;
			position: fixed;
			right: .2rem;
			top: 11rem;
			z-index: 100;
			img{
				width:100%;
			}
		}
		.ic {
			width: 1.54rem;
        	height: .45rem;
			line-height: .46rem;
			font-size: .293333rem;
			color: white;
			text-align: center;
		}
		.ic_3 {
			background: #50B5EE;
			border: .013333rem solid #50B5EE;
			position: relative;
			top:0;
		}
		.ic_4{
			background: #7ED321;
			border: .013333rem solid #7ED321;
		}
		.ic_5{
			background: #5CA9F1;
			border: .013333rem solid #5CA9F1;
		}
		.ic_6{
			background: #D3BA81;
			border: .013333rem solid #D3BA81;
		}
		.ic_7{
			border: .013333rem solid #ff5b4c;
			color: #ff5b4c;
		}
		.falFooter{
			height:1.333333rem;
		}
		.bid{	//右上标的
			width:1.04rem;
			height:1.04rem;
			position:absolute;
			top:0;
			right:0;
		}
		.icons{
			margin-left: .133333rem;
			margin-top: 0.06rem;
			span{
				padding: 0rem 0.133333rem;
				font-size:0.293333rem;
			}
			.ic_2{
				background: rgba(255,107,50,0.20);
				border: .013333rem solid #FF6B32;
				font-size: .293333rem;
				color: #FF6B32;
			}
			.ic_1{
				background: #4CB1FF;
				color: #ffffff;
			}
			.ic_3_off{
				background: rgba(197,197,197,0.20);;
				border: .013333rem solid #c5c5c5;
				color: #c5c5c5;
			}
		}
		.text{
			    font-size: .32rem;
				margin-top: .113333rem;
				color: #808080;
		}
		.Eqz{
			padding:0.426667rem 0 0.533333rem 0.4rem;
			.title{
				font-size: 0.373333rem;
				line-height: 0.493333rem;
				color: #333;
				padding-bottom: 0.32rem;
			}
			.wraApr{
				border-right:0.013333rem solid #e5e5e5;
			}
			.conter{
				float: left;
				.wraPercent{
					font-size:0.453333rem;
					line-height:0.373333rem;
					color:#ff5b4c;
					span{
						font-size:1.333333rem;
						line-height:1.306667rem;
					}
				}
				.text{
					font-size:0.32rem;
					line-height:0.453333rem;
					color:#808080;
				}
				p{
					font-size:0.32rem;
					line-height:0.44rem;
					color:#808080;
					padding: 0 0 0.26rem 0.4rem;
					span{color:#333;padding-left:0.266667rem;}
				}
			}
			.EqzContent{
				text-align:center;
				height:3.066667rem;
				.yesterday{
					font-size:0.933333rem;
					line-height:1.306667rem;
					color:#ff5b4c;
				}
				p{
					font-size:0.346667rem;
					line-height:0.533333rem;
					color: #808080;
					padding-bottom:0.693333rem;
				}
				.bottom{
					div{
						width:49.5%;
						font-size: 0.346667rem;
						text-align:center;
						color:#808080;
						span{
							padding-left:0.32rem;
							color:#333;
						}
					}
				}
			}
		}
		.invest-btn{
				background-image: linear-gradient(-45deg, #FF6554 0%, #FF3F38 100%);
				color: white;
			}
			.updateBtn {
				border-radius: .106667rem;
				width: 2.133333rem;
				height: .8rem;
				font-size: .373333rem;
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center
			}
		.recommend .content{
			margin: .266667rem  .213333rem .266667rem .213333rem;
			overflow: hidden;
			.hidden {
				align-items: center;
			}
			/*推荐icons*/
			.recomIcons {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				font-size: .32rem;
				color: #B5B5B5;
				height: .4rem;
				margin:0rem .266667rem .266667rem .266667rem;
				img {
					width: .4rem;
					height: .4rem;
				}
			}
		    .sepcial{
				height: 1.653333rem;
				margin-top:.666667rem;
				margin:.666667rem .32rem 0rem .32rem;
				display: flex;
				flex-direction: row;
				align-items: flex-end;
		    	.percent{
		    		text-align: left;
		    		width: 49.5%;
		    		float: left;
		    		.percentNum{
		    			font-size: 1.2rem;
		    			line-height: 1rem;
		    			color: #ff5b4c;
		    			height: 1.1rem;
						// margin-top: .666667rem;
		    		}
		    		span{
		    			font-size: 0.453333rem;
		    		}
		    		.text{
		    			font-size:0.32rem;
		    			color:#808080;
		    			line-height: 0.38rem;
		    		}
		    	}
		    	.info{
					text-align: left;
					width: 50.5%;
					float: left;
		    		p{
		    			font-size: .32rem;
		    			color: #808080;
						margin-top: .08rem;
						font-family: PingFangSC;
		    			.invest_remain{
							font-size: .48rem;
							color: #3a1111;
							font-family: DIN-Medium;
		    			}
		    		}
		    		.surplus{
		    			font-size:0.32rem;
		    			color:#808080;
		    			float: right;
		    			text-align: left;
		    			line-height: 0.64rem;
		    			span{
		    				color:#333;
		    			}
		    		}
		    	}
		    }
			.listTitle{
				font-size: .453333rem;
				height: .533333rem;
				line-height: .533333rem;
				margin: .4rem .32rem 0rem .32rem;
				display: flex;
				flex-direction: row;
				span{
					display: inline-block;
				}
				div{
					margin-left: .266667rem;
				}
			}
			.bigBtn {
				width: 9.573333rem;
				height: 1.76rem;
				margin-top: .506667rem;
				// margin-bottom: .306667rem;
			}
			.btn{
				width: 2.106667rem;
				height: 0.733333rem;
				line-height: 0.65rem;
				text-align: center;
				font-size: 0.373333rem;
				color: #FF5B4C;
				border: .013333rem solid #FF5B4C;
				position: absolute;
			    right: .3rem;
			    top: -.15rem;
			}

		}
		.investTitle{
			line-height: 1.333333rem;
			height: 1.6rem;
			padding-left: 0.4rem;
			padding-top:0.266667rem;
			font-size: 0.48rem;
			font-weight: 600;
			color: #333333;
			background: #fff;
			border-bottom:.013333rem solid #E5E5E5;
			position: relative;
		}
		.recommend{
			background:#fff;
			margin: .266667rem 0rem .266667rem 0rem;
			overflow: hidden;
		}
		.mar{
			margin-bottom: 0;
		}
		.footer-div {
			font-size: .266667rem;
			color: #C1C1C1;
			line-height: .533333rem;
			text-align: center;
			margin: .44rem 0rem .44rem 0rem;
			img {
				width: 1.573333rem;
				height: .56rem;
				margin: 0 .133333rem;
			}
		}
		.falFooter{
			padding-top:0.133333rem;
			text-align:center;
			width:32%;
			margin: 0 auto;
			line-height:0.746667rem;
			em{
				font-size:0.346667rem;
				position:relative;
				top:-0.22rem;
				margin-left:0.133333rem;
			}
			span{
				display: inline-block;
			}
		}
	}
</style>

