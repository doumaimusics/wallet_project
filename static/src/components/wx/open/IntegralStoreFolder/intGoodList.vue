<template>
	<div class="goods_listss" id="goods_listss">
		<title v-title>兑换商品</title>
		<div class="title clear bdr-b">
			<div class="type" @click="showMenu" :class="{tab:popupVisible}">{{checkTitle.title}} 
				<i v-if="popupVisible" class="el-icon-caret-bottom"></i>
				<i v-else class="el-icon-caret-top"></i>
			</div>
			<div class="type ml-30" @click="showSort" :class="{tab:popupSort}">{{sortList[popupSortIndex]}} 
				<i v-if="popupSort" class="el-icon-caret-bottom"></i>
				<i v-else class="el-icon-caret-top"></i>
			</div>
			<div class="check_box" :class="{active:cheak.isCheak}">
				<img @click="changeBox" :src="cheak.isCheak ? 'https://aliyunsso.edspay.com/web/wx/integralStroe/didYes.png':'https://aliyunsso.edspay.com/web/wx/integralStroe/didNot.png'" alt="">
				我可兑换
			</div>
		</div>
		<!-- 分类选项 -->
		<mt-popup
		v-model="popupVisible"
		position="top"	
		:closeOnClickModal="false">
			<div class="modal" :class="{active:popupVisible}">
				<li class="bdr-b ModelsList" @click="allGoods" :class="{check:popupVisibleIndex == 0}">全部分类</li>
				<li class="bdr-b ModelsList" :class="{check:popupVisibleIndex == index+1 && popupVisibleIndex != 0}" v-for="(item,index) in goodsCategoryModels" @click="checkMenu(item,index+1)">{{item.categoryName}}</li>
			</div>
		</mt-popup>
		
		<!-- 排序选项 -->
		<mt-popup
		v-model="popupSort"
		position="top"	
		:closeOnClickModal="false">
			<div class="modal" :class="{active:popupSort}">
				<li class="bdr-b ModelsList" :class="{check:popupSortIndex == index}" v-for="(item,index) in sortList" @click="checkSort(item,index)">{{item}}</li>
			</div>
		</mt-popup>

		<div class="good_list" ref="scrollTopBox" v-if="listData.length != 0">
			<mt-loadmore class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
				<ul class="clear" :class="{noMars:osType}">
					<goodItem :item='item'  v-for="(item,index) in listData"></goodItem>
					<div v-if="!allLoaded" class="tips">上划查看更多</div>
					<div v-else class="tips">没有更多了</div>
				</ul>
			</mt-loadmore>
		</div>
		<wx-null v-else-if="isGetData && imgCheckBox == 1" :text="'暂无可兑换商品！'" :btnText="'赚取积分'" :linkUrl="'/intEarn'" :btnType="1"></wx-null>
		<wx-null v-else-if="isGetData" :text="'暂无该分类商品！'"></wx-null>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import wxNull from './null';       //空状态
	import { Loadmore, Popup} from 'mint-ui';			//上拉下拉
	import goodItem from './goodItem';	
	export default {
		mixins:[wxToapp],
		data(){
			return{
				bottomFont: false,     // 底部文字显示内容
				popupVisible: false,   // 商品分类开关
				popupVisibleIndex: 0,  // 选中商品分类的下标
				popupSortIndex: 0,     // 排序分类的下标
				descType: 0,           // 选中排序分类的ID
				popupSort: false,      // 排序分类开关
				sortList:['综合排序','积分从高到低','积分从低到高','销量最火','最新上架'],     // 排序列表
				pageNum:1,
				pages:1,
				allLoaded:false,
				autoFill:false,
				cheak:{
					isCheak:false	   //是否勾选
				},
				checkTitle:{           //分类标题
					title:'全部分类'
				},
				checkId:{              //分类id
					calssifyId:0
				},                     //当前选择的类别id
				imgCheckBox:2,         //是否勾选
				listData:[],           //接口数据
				loginStatus:0,         //登陆判断
				goodsCategoryModels:[],//分类接口数据
				isGetData:false,       //接口数据还没加载出来
			}
		},
		methods:{
			getMenuData(){			// 类别接口
				this.notLogPost('/goods/classList',(data)=>{
					console.log(data);
					if(data.resCode){
						this.goodsCategoryModels = data.resData.data.list;
						//返回类目以后初始化接口
						if(this.$route.query.classify != undefined && this.$route.query.classify != null){
							let i = this.$route.query.classify
							this.queryMenu(this.goodsCategoryModels[i-1], i)
							this.popupVisibleIndex = i
						}else{
							this.getData(this.pageNum);
						}
					}
				},{categoryType:1},1)
			},

			showMenu(){			 //展示类别列表
				if(!this.popupVisible){
					this.popupSort = false
					this.popupVisible = true;
				}else{
					this.popupVisible = false;
				}
			},

			showSort(){			 //展示排序列表
				if(!this.popupSort){
					this.popupVisible = false
					this.popupSort = true;
				}else{
					this.popupSort = false;
				}
				
			},

			checkMenu(item,index){			//切换类别
				if(this.popupVisibleIndex == index) {
					this.popupVisible = false
					return
				}
				this.pageNum = 1;
				this.checkTitle.title = item.categoryName;
				this.checkId.calssifyId = item.categoryId;
				this.getData(this.pageNum)
				this.popupVisibleIndex = index
				this.popupVisible = false
			},

			checkSort(v, i){   // 排序事件
			    // let j;
				// i == 0 ? j=5 : j=i
				this.descType = i;
				this.pageNum = 1;
				this.getData(this.pageNum)
				this.popupSortIndex = i;
				this.popupSort = false
			},

			queryMenu(item,index){			// 切换到指定类别
				this.pageNum = 1;
				this.popupVisibleIndex = index
				this.checkTitle.title = item.categoryName;
				this.checkId.calssifyId = item.categoryId;
				this.getData(this.pageNum)
			},

			changeBox(){			//勾选我可兑换
				if(this.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else if(this.loginStatus == 1){
					this.popupVisible = false
					this.popupSort = false
					this.pageNum = 1;
					if(this.cheak.isCheak){
						this.cheak.isCheak = false;
						this.imgCheckBox = 2
						this.getData(this.pageNum)
					}else{
						this.cheak.isCheak = true;
						this.imgCheckBox = 1
						this.getData(this.pageNum)
					}
				}
				
			},

			allGoods(){			//选择全部分类
				if(this.popupVisibleIndex == 0) {
					this.popupVisible = false
					return
				}
				this.pageNum = 1;
				this.checkTitle.title = '全部分类';
				this.checkId.calssifyId = 0;
				this.getData(this.pageNum)
				this.popupVisibleIndex = 0
				this.popupVisible = false
			},

			getData(num){			//获取数据
				this.getNotlogData('/goods/table',(data) =>{
					
					if(data.resCode == 1) {
						this.loginStatus = data.resData.loginStatus;
						this.pages = data.resData.scoreGoosPageInfo.pages;
						if (num == 1){
							this.listData = data.resData.scoreGoosPageInfo.list;
							console.log(this.listData)
							// 每次筛选都让容器置顶
							this.$refs.scrollTopBox.scrollTop = 0
							this.$refs.scrollTopBox.pageYOffset = 0
						} else {
							this.listData = this.listData.concat(data.resData.scoreGoosPageInfo.list);
						}
						this.listData.length == 0 ? this.isGetData = true : this.isGetData = false;
						this.pages <= num ? this.allLoaded = true : this.allLoaded = false;
					}

				},{categoryId:this.checkId.calssifyId,showUserExchange:this.imgCheckBox,pageNum:num,pageSize:10,descType:this.descType})
			},

			loadBottom(){			//上拉加载
				var that = this;
				this.pageNum += 1;
				var timer = setTimeout(function(){
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
					}
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},500)
			},
		},
		components:{
			wxNull,
			goodItem
		},
		mounted() {
			//给app传值标题名
			this.PassValue('NavWhite_兑换商品');
			if(this.osType){
				this.$route.query.classify ? this.PassValue('GoodsList_'+this.$route.query.classify) : this.PassValue('GoodsList');
			}
	    },
		created(){
			this.getMenuData();
		}
	}
</script>
<style lang="scss" scoped>
	.goods_listss{
		font-family: PingFangSC-Regular;
	    position: relative;
	    background: #ffffff;
		// 分类下拉选项开始
		.modal{
			// -webkit-transform: translate3d(0, -102%, 0);
			// transform: translate3d(0, -102%, 0);
			// -webkit-backface-visibility: hidden;
			// backface-visibility: hidden;
			// -webkit-transition: .2s ease-out;
			// transition: .2s ease-out;
			// left: 0;
			// right: 0;
			// margin: 0 auto;
			top: 1.066667rem !important;
			// z-index: 999;
			position: fixed;
			width: 10rem;
			li{
				width: 100%;
				height: 1.066667rem;
				line-height:1.066667rem;
				font-family: PingFangSC-Regular;
				font-size: .373333rem;
				color: #333333;
				background: #fff;
				text-align: center;
			}
		}
		// .modal.active{
		// 	-webkit-transform: translate3d(0, 0, 0);
		// 	transform: translate3d(0, 0, 0);
		// }
		// .v-modal{
		// 	top: 1.066667rem;
		// }
		.ModelsList{
			position: relative;
			width: 100%;
			height: 1.066667rem;
			line-height:1.066667rem;
			font-family: PingFangSC-Regular;
			font-size: .373333rem;
			color: #333333;
		}
		.ModelsList.check{
			color: #FF5C4B;
		}
		// 分类下拉选项结束
		.menu_list{
			height: auto;
			width: 100%;
			background: #ffffff;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 999;
			box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
			-moz-box-shadow:0 0 12px 0 rgba(0,0,0,0.12);
			-webkit-box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
			.content{
				padding: 0.666667rem 0.8rem 0.266667rem;
				
				li{
				 	width: 1.4rem;
			 	    margin-right: 0.35rem;
					margin-bottom: 0.4rem;
					float: left;
					.img{
						width: 1.2rem;
						height: 1.2rem;
						border-radius: .6rem;
						overflow: hidden;
						margin: 0 auto 0.186667rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
					p{
						text-align: center;
						font-size: 0.32rem;
						color: #808080;
						width: 100%;
						white-space: nowrap;
						// text-overflow:ellipsis;
						overflow: hidden;
					}
					p.activeTxt{
						color: #333333;
					}
				}
				li.noMar{
					margin-right: 0;
				}
			}
			.icon_btn{
				width: 8.933333rem;
				height: 1.333333rem;
				position: relative;
				line-height: 1.32rem;
				text-align: center;
				font-size: 0.533333rem;
				color: #333333;
				margin: 0 auto;
			}
		}
		.title{
			width: 100%;
			height: 1.066667rem;
			background: #ffffff;
			position: fixed;
		    top: 0;
		    left: 0;
		    z-index: 9999;
			padding: 0 .533333rem;
			div{
				
				width: 30%;
			}
			.type{
				font-family: PingFangSC-Regular;
				float: left;
				font-size: .4rem;
				color: #333333;
				line-height: 1.066667rem;
				i{
					// display: inline-block;
					font-size: .186667rem;
					vertical-align: bottom;
					line-height: 1.066667rem;
				}
			}
			.type.tab{
				color: #FF5C4B;
			}
			.type.ml-30{
				width: 42%;
				text-align: center;
			}
			.check_box{
				width: 25%;
				float: right;
				text-align: right;
				font-size: .32rem;
				color: #333;
				line-height: 1.066667rem;
				img{
					width: 0.4rem;
					height: 0.4rem;
					position: relative;
				    top: -0.05rem;
				}
			}
			.check_box.active{
				color: #608DFF;
			}
		}
		.good_list{
			width: 100%;
			height: 100%;
		    padding: .266667rem .4rem;
			background:#ffffff; 
			position: fixed;
			z-index: 98;
		    top: 1.066667rem;
		    overflow-y: auto;
			ul{
				position: relative;
				margin-bottom: .5rem;
				li{
					width: 4.466667rem;
					height: 6.08rem;
					float: left;
					background:#ffffff; 
					margin-bottom: .266667rem;
					border: 1px solid #E5E5E5;
					p{
						width: 100%;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.good_name{
						font-family: PingFangSC-Medium;
						font-size: 0.373333rem;
						color: #333333;
						// margin-bottom: .04rem;
						padding-left: .4rem;
					}
					.int{
						font-family: DIN-Regular;
						font-size: 0.4rem;
						color: #FF5B4C;
						padding-left: .4rem;
						span{
							font-family: PingFangSC-Regular;
							font-size: 0.32rem;
							color: #808080;
						}
					}
					.img{
						width: 100%;
						height: 4.266667rem;
						background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/goods_default_img.png) no-repeat center center;
						background-size: 100%;
						margin-bottom: 0.4rem;
						.goodsPath{
							width: 100%;
							height: 100%;
						}
						.goodsIcon {
							width: 1.28rem;
							height: 1.28rem;
							background: black;
						}
					}
				}
				li:nth-child(odd){
					margin-right: .266667rem;
				}
				.tips{
					float: left;
					width: 100%;
					height: auto;
					text-align: center;
					margin-bottom: .4rem;
					color:#999;
					font-size: .38rem;
				}
			}
			ul.noMars{
				margin-bottom: 0.4rem;
			}
		}
	}
</style>
<style lang="scss">
    #goods_listss{
        .mint-popup-top{
            top:0;
			left: 0;
        }
        .mint-swipe-indicator.is-active{
            width: 0.32rem;
            height: 0.106667rem;
            opacity: 1;
            border-radius: 0.053333rem;
        }
        .mint-indicator-wrapper{
            z-index: 9999;
            
        }
        .mint-swipe-indicators{
            bottom:1.653333rem;
            width: 50%;
            -webkit-transform: translateX(0);
            transform: translateX(0);
            display: flex;
            justify-content: flex-end;
            padding-right:.4rem;
        }    
    }
</style>
