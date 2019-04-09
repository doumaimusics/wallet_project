<template>
	<div id="log">
		<div v-title>{{logoMsg}}</div>
		<div v-if="dataList.length">
			<div class="all_money">
				<div class="money">
					<p>累计提现</p>
					<div class="show_money"><span>￥</span>{{totalCash ? totalCash:0 | moneyFormat}}</div>
				</div>
			</div>
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
				<record-child :dataList="dataList" :curMonth="curMonth"></record-child>
				<!-- <ul>
					<li class="list" v-for="item in dataList">
						<div class="time" v-if="item.title == curMonth">当月</div>
						<div class="time" v-else>{{item.title}}</div>
						<div v-if="dataList" class="main_wrapper">
							<div class="mounth bdr-b clear" v-for="(list,index) in item.list">
								<div class="fl">
									<p class="title" :class="{fall:list.status==2,stay:list.status==0}">{{charge[list.status]}}</p>
									<p class="re_time">{{list.addTime}}</p>
								</div>
								<div class="fr" :class="{falls:list.status==2}">
									{{list.money | moneyFormat}}
								</div>
							</div>
						</div>
					</li>
				</ul> -->
			</mt-loadmore>
		</div>
		<account-null v-else-if="isGetData" :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂时没有账单'"></account-null>
		<div class="footer-div" v-if="onOff">
			没有更多数据了
		</div>
	</div>
</template>

<script>
	import accountNull from '../account/wxNull';
	import recordChild from './wxZsMoneyNewReChild';//记录组件
	export default {
		data(){
			return {
				logoMsg:'提现记录',
				allLoaded:false,
				autoFill:false,
				pageNum:1,
				pages:1,
				dataList:[],//筛选后数据
				curMonth:null,//当前月
				totalCash:0,//累计充值金额
				onOff:false,//显示列表最后一句提示语
				isGetData:false,//接口数据还没加载出来
				// charge:['银行处理中','提现成功','提现失败'],
			}
		},
		methods:{
			getData(num){
				this.postData('/cash/cashListCzb',(res,data) =>{
					if(data.resCode && data.resData.pageInfo.list){
						this.isGetData = true;
						this.pages = data.resData.pageInfo.pages;
						var getList = data.resData.pageInfo.list;

						console.log(getList)
						if(num == 1){
							document.body.scrollTop = 0;
							this.dataList = [];
							this.curMonth = data.resData.curMonth;
							this.totalCash = data.resData.totalCash
						}
						if(this.pages<=1 && this.pages!=0){
							this.onOff = true;
						}else{
							this.onOff = false
						}
						for(var i=0; i<getList.length; i++){
							var lenStr = this.dataList.length;
							
							if(!(i == 0)){
							     if(this.dataList[lenStr-1].list[(this.dataList[lenStr-1].list.length)-1].verifyRemark != getList[i].verifyRemark){
							          console.log(getList[i].verifyRemark)
							          this.dataList.push({});
							          this.dataList[lenStr].title = getList[i].verifyRemark;
							          this.dataList[lenStr].list = []
							          this.dataList[lenStr].list.push(getList[i]);
							     }else{
							        this.dataList[lenStr-1].list.push(getList[i]);
							     }
							}else{
							     this.dataList.push({});
							     this.dataList[lenStr].title = getList[i].verifyRemark;
							     this.dataList[lenStr].list = [];
							     this.dataList[lenStr].list.push(getList[i]);
							     console.log(this.dataList)
							}
						}
						console.log(this.dataList)
						
					}
				},{pageNum:num,pageSize:10},1)
			},
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					this.autoFill = true;
					that.allLoaded = false;
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
				},800)
			},
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				this.allLoaded = true;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
						that.allLoaded = false;
					}else{
						that.onOff = true;
					}
					clearTimeout(timer)
				},500)
			},
		},
		components:{
			accountNull,
			recordChild
		},
		created(){
			this.getData(this.pageNum)
		}

	}
</script>

<style lang="scss" scoped>
	#log{
		font-family: PingFangSC-Regular;
		.all_money{
			width: 100%;
			height: 2.8rem;
			position: relative;
			.money{
				width: 100%;
				height: 2.8rem;
				position: fixed;
				background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/rechargeTop.png) no-repeat;
				background-size: 100%;
				z-index: 12;
				left: 0;
				top: 0;
				color: #ffffff;
				text-align: center;
				padding-top: 0.666667rem;
				p{
					font-size: 0.373333rem;
					margin-bottom: 0.133333rem;
				}
				.show_money{
					font-family: DIN-Medium;
					font-size: 0.666667rem;
					span{
						font-size: 0.48rem;
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
		ul{
			background: #ffffff;
			li.list{
			    background:#fff;
			    width: 100%;
			    position: relative;
			    .time{
			        padding-left:0.4rem;
			        height:1.066667rem;
			        line-height:1.066667rem;
			        font-size: 0.373333rem;
			        color: #333333;
			        background: #F8F8F8;
			    }
			    .main_wrapper{
			    	padding-left: 0.4rem;
			    	.mounth{
			    		background: #ffffff;
			    		width: 100%;
			    		height: 1.573333rem;
			    		position: relative;
			    		p{
			    			color: #333;
			    		}
			    		.fl{
			    			width: 60%;
			    			.title{
			    				font-size: 0.373333rem;
			    				color: #333333;
			    				padding-top: 0.32rem;
			    			}
			    			.re_time{
			    				font-size: 0.293333rem;
			    				color: #8E8E8E;
			    			}
			    			.title.fall{
			    				color: #FF5B4C;
			    			}
			    			.title.stay{
			    				color: #3B99FC;
			    			}
			    		}
			    		.fr{
			    			width: 40%;
			    			font-size: 0.373333rem;
			    			color: #333333;
			    			line-height: 1.573333rem;
			    			text-align: right;
			    			padding-right: 0.4rem;
			    		}
			    		.fr.falls{
			    			color: #C5C5C5;
			    		}
			    		
			    	}
			    } 
			     
			}
		}
	}
	
</style>