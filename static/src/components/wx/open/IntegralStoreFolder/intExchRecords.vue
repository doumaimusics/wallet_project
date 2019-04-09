<template>
	<div class="exchange">
		<title v-title>兑换记录</title>
		<div class="table bdr-b">
			<div v-for="(v, i) in titleName" class="tab" @click="paymentsType(i)" :class="{active: (i+1) == tabIndex}">{{v}}<span v-if="(i+1) == tabIndex"></span></div>
		</div>
		<div class="lists" v-if="listData.length">
			<mt-loadmore class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
				<ul>
					<li v-for="(item,index) in listData"  @click="toawarDetails(item)">
						<div class="stat">
							<div class="goodName">{{item.goodsCategoryName}}
								<!-- <i class="el-icon-arrow-right"></i> -->
							</div>
							<div class="arrows">
								<span v-if="item.goodsClass == -1">{{item.paymentsType == 1 ? '备货中':'已发货'}}</span>
								<span v-else>已发放</span>
							</div>
						</div>
						<div class="centens">
							<img :src="item.shopPath" alt="" class="imgs fl">
							<div class="content fl">
								<div class="name">{{item.goodsName}}</div>
								<div class="score">{{item.expendAmount}}<i>积分</i></div>
							</div>
						</div>
						<div class="addTime">{{item.addTime | divisionTime}}</div>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		<wx-null v-else-if="isGetData" :text="tabIndex == 1 ? '目前暂无备货中记录！' : '目前暂无已发货记录！'"></wx-null>
		<!-- 底部心愿商品 -->
        <div class="wish_goods_box">
			<div class="wish_goods_btn" @click="appRouter('/intWishFrom')">心愿商品</div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import wxNull from './null';//空状态
	export default {
		mixins:[wxToapp],
		data(){
			return{
				Not:'',
				tabIndex: 1,
				titleName:['备货中','已发货'],
				pageNum:1,
				pages:1,
				allLoaded:false,
				autoFill:false,
				add:'',//用户是否有收获地址
				listData:[],
				isGetData:false,//控制空状态
			}
		},
		methods:{
			toawarDetails(v){
				v.hasAdd = 1;
				v.listType = 2;
				v._title = 1;
				this.appRouter('/awardDetails',v)
			},
			paymentsType(n){
				this.allLoaded = false
				this.pageNum = 1
				this.tabIndex = n+1
				sessionStorage.setItem("tabIndex", this.tabIndex);
				this.getData(this.pageNum,this.tabIndex);//列表数组
				document.body.scrollTop = 1
				document.documentElement.scrollTop = 1
				window.pageYOffset = 1
			},
			//列表数组
			getData(num, n){
				this.getAppData('/reward/exchangeList',(data) =>{
					if (data.resCode == 1) {
						this.isGetData = true;
						this.add = data.resData.data.add;
						this.pages = data.resData.data.oldList.pages;
						num < this.pages ? this.allLoaded = false : this.allLoaded = true;
						if (num == 1){
							this.listData = data.resData.data.oldList.list;
						} else {
							this.listData = this.listData.concat(data.resData.data.oldList.list);
						}
					}

				},{type:0,pageSize:10,pageNum:num,orderType:0,paymentsType:n},1)
			},

			//上拉加载
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				// this.allLoaded = true;
				var timer = setTimeout(function(){
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum,that.tabIndex);
						// that.allLoaded = false;
					}
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},500)
			},
		},
		components:{
			wxNull
		},
		mounted() {
			//app在头部显示地址ico
			// this.PassValue('showAddr_兑换记录');
			// this.getData(this.pageNum, 1);//列表数组
			this.PassValue('NavWhite_兑换记录');
	    },
	    destroyed(){
	    	// this.PassValue('hideAddr_兑换记录');
	    },
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if(from.name=='awardDetails' && sessionStorage.getItem('tabIndex')){
					vm.tabIndex = sessionStorage.getItem('tabIndex')
					vm.getData(vm.pageNum, vm.tabIndex)
				}else{
					vm.tabIndex = 1
					vm.getData(vm.pageNum, 1)
				}
			})
		}
	}
</script>
<style lang="scss" scoped>
	.exchange{
		font-family: PingFangSC-Regular;
		.none{
			height: 1.066667rem;
			background: #ffffff;
			margin-bottom: 0.266667rem;
		}
		.table{
			background: #ffffff;
			width: 100%;
			height: 1.066667rem;
			position: fixed;
			top: 0;
			display: flex;
			justify-content: space-around;
			z-index: 99;
			.tab{
				width: 2.666667rem;
				height: 1.04rem;
				line-height: 1.04rem;
				text-align: center;
				font-size: .4rem;
				color: #7A8898;
				letter-spacing: .008933rem;
				position: relative;
				span{
					height:0.053333rem;
					width:0.666667rem;
					position: absolute;
					bottom: 0;
					left: 50%;
					margin-left: -0.306667rem;
					background: #4C7DE9;
				}
			}
			.tab.active{
				color: #4C7DE9;
				font-family: PingFangSC-Medium;
				// border-bottom: 2px solid #FF5B4C;
			}
		}
		.lists{
			margin-top: 1.333333rem;
			li{
				width: 100%;
				margin-top: .266667rem;
				.stat{
					width: 100%;
					height: .96rem;
					display: flex;
					justify-content: space-between;
					padding: 0 .533333rem;
					background: #fff;
					line-height: .96rem;
					.goodName,.arrows{
						font-size: .32rem;
						color: #333333;
						i{
							font-size: .25rem;
							margin-left: .133333rem;
						}
					}
				}
				.centens{
					width: 100%;
					overflow: hidden;
					padding: .293333rem .533333rem;
					.imgs{
						width: 1.466667rem;
						height: 1.466667rem;
						float: left;
						margin-right: .266667rem;
					}
					.content{
						overflow: hidden;
						width: 70%;
						padding-top: .2rem;
						font-size: .373333rem;
						color: #333333;
						line-height: .56rem;
						.score{
							font-size: .4rem;
							color: #FF5B4C;
							line-height: .56rem;
							i{
								font-size: .32rem;
							}
						}
					}
				}
				.addTime{
					width: 100%;
					height: 1.066667rem;
					background: #fff;
					line-height: 1.066667rem;
					text-align: right;
					padding-right: .533333rem;
					font-size: .32rem;
					color: #9B9B9B;
				}
			}
		}
		.wish_goods_box{
			width: 100%;
			height: 1.6rem;
			position: fixed;
			bottom: 0;
			left: 0;
			background: #fff;
			.wish_goods_btn{
				width: 5.333333rem;
				height: 1.066667rem;
				background: #333;
				margin: .266667rem auto;
				background:#F14B4B;
				border-radius: 1.333333rem;
				font-family: PingFangSC-Regular;
				font-size: .426667rem;
				color: #FFFFFF;
				text-align: center;
				line-height: 1.066667rem;
			}
		}
		
	}
</style>