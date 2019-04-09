<template>
	<div class="log">
		<div class="classify" v-if="flag == 2" @click="showList = !showList">
			<div class="classify_title bdr-b" :class="{top1:generalSw == 1 && sinaTotalMoney != 0}">{{checkTitle}} <span :class="{trans:showList}"></span>
				<!-- <i :class="{trans:showList}" class="el-icon-caret-bottom"></i> -->
			</div>
		</div>
		<mt-loadmore class="mtContent" :top-method="loadTop" :bottom-method="loadBottom" :bottomPullText="''" :bottomDropText="''" :bottomLoadingText="''" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
		 	<ul class="logChild" v-if="dataList.length">
				<li v-for="item in dataList" v-if="item.paymentsType != 0" class="list">
					<div class="title" v-if="item.title == curMonth">当月</div>
					<div class="title" v-else>{{item.title}}</div>
					<ul v-if="dataList" class="ulList">
						<li v-for="(list,index) in item.list" class="bdr-b clear">
							<div class="ico_img fl" v-if="tabType==1">
								<!-- 还款本金 -->
								<img v-if="list.type == 'czb_repay_capital'" :src="icoImg[0]" alt="">
								<!-- 充值 -->
								<img v-else-if="list.type == 'czb_recharge_success'" :src="icoImg[1]" alt="">
								<!-- 出借 -->
								<img v-else-if="list.type == 'czbTenderPlan'" :src="icoImg[2]" alt="">
								<!-- 还款利息 -->
								<img v-else-if="list.type == 'czb_repay_interest'" :src="icoImg[3]" alt="">
								<!-- 利息管理费 -->
								<img v-else-if="list.type == 'czb_repay_manage_fee'" :src="icoImg[4]" alt="">
								<!-- 提现 -->
								<img v-else-if="list.type == 'czb_cash_success'" :src="icoImg[6]" alt="">
								<!-- 其他 -->
								<img v-else :src="icoImg[5]" alt="">
							</div>
							<div class="content fl">
								<div class="name">{{list.typeName}}</div>
								<div class="time">{{list.addTime }}</div>
							</div>
							<div class="money fr"><span v-if="list.paymentsType == 1 || list.paymentsType == 3 ">+{{list.money | moneyFormat}}</span><span v-else-if="list.paymentsType == 2 || list.paymentsType == 4" class="fall">-{{list.money | moneyFormat}}</span></div>
						</li>
					</ul>
				</li>
			</ul>
			<account-null v-else-if="isGetData" :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂时没有账单'"></account-null>
		 </mt-loadmore>
		 <div class="footer-div" v-if="onOff">
		 	<img src="https://aliyunsso.edspay.com/web/wxUpdate/left_line.png" alt="">
		 	只展示最近100条记录
		 	<img src="https://aliyunsso.edspay.com/web/wxUpdate/right_line.png" alt="">
		 </div>
		 <!-- 分类列表 -->
		 <div  id="layer" v-if="showList" @click="showList = false" :class="{top2:generalSw == 1 && sinaTotalMoney != 0}">
		 	<ul class="content clear">
		 		<!-- -->
		 		<li v-for="(item,index) in classifyMenu" class="bdr-b" @click="checkMenu(item,index)" :class="{active:activeShow[index]}">
		 			{{item.value}}
		 		</li>
		 	</ul>
		 </div>
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import accountNull from './wxNull'
	import wxLoading from '../../../public/wx/wxLoading';
	export default {
		data(){
			return{
				// page:1,
				autoFill:false,
				thisList:'',
				pageNum:1,
				pages:1,
				dataList:[],
				classifyMenu:[],//分类数据
				isover:true,
				onOff:false,
				checkTitle:'全部',
				showList:false,//分类弹框
				isGetData:false,
				activeShow:[],
				calssifyId:'all',
				curMonth:'',//当月
				icoImg:[
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/ico1.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/ico2.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/ico3.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/ico4.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/ico5.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/ico6.png',
					'https://aliyunsso.edspay.com/web/wx/account/accountModify/ico7.png'
				],//图标ico
			}
		},
		props: ['listImg','dataUrl','flag','titleList','tabType','generalSw','sinaTotalMoney'],
		computed:{
            allLoaded:{
            	get(){
	                console.log(this.flag+'=='+this.titleList.selected)
	                if(this.flag ==2 && this.titleList.selected == 'tab-container1' && this.isover) return false  
	                else if(this.flag ==1 && this.titleList.selected == 'tab-container2' && this.isover) return false;   
	                else return true;
	            },
	            set(){}
            },
        },
		methods:{
			//类别接口
			classifyData(){
				this.postData('/account/logType',(res,data) => {
					if(data.resCode){
						this.classifyMenu = data.resData.list;
						for (var i=0; i < this.classifyMenu.length; i++){
							this.$set(this.activeShow, i, false);
						}
						this.$set(this.activeShow, 0, true);
					}
				},{})
			},

			//切换类别
			checkMenu(item,index){
				this.pageNum = 1;
				this.allLoaded = false;
				this.dataList = [];//初始化数据
				this.isGetData = false;

				for (var i=0; i < this.classifyMenu.length; i++){
					this.$set(this.activeShow, i, false);
				}
				this.$set(this.activeShow, index, true);
				this.checkTitle = item.value;
				this.calssifyId = item.type;
				this.showList = false;
				this.getData(this.pageNum,item.type)
			},

			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					if(that.flag == 2){
						that.getData(that.pageNum,that.calssifyId);
					}else{
						that.getData(that.pageNum);
					}
					// that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					that.isover = true;
				},800)
			},
			loadBottom(){
				var that = this;
				this.isover = false;
				this.pageNum += 1;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					if(that.pages >= that.pageNum){
						if(that.flag == 2){
							that.getData(that.pageNum,that.calssifyId);
						}else{
							that.getData(that.pageNum);
						}
						
						that.isover = true;
					}else {
						that.onOff = true;
						console.log(1)
					}
					clearTimeout(timer)
				},500)
			},
			getData(num,typeId){
				this.postData('/account/logList',(res,data) => {
					if(data.resCode && data.resData.data.list){
						this.pages = data.resData.data.pages;
						this.curMonth = data.resData.curMonth;
						var getList = data.resData.data.list;
						this.isGetData = true;
						if(num ==1){
                            this.dataList = [];
                        }
                        if(this.pages <=1 && this.pages != 0){
                        	this.onOff = true
                        }else{
                        	this.onOff = false
                        }
						for(var i=0;i<getList.length;i++){
						     var lenStr = this.dataList.length;
						     if(!(i == 0)){
						          //console.log(this.dataList[lenStr-1][(this.dataList[lenStr-1].length)-1])
						          if(this.dataList[lenStr-1].list[(this.dataList[lenStr-1].list.length)-1].monthly != getList[i].monthly){
						               console.log(getList[i].monthly)
						               this.dataList.push({});
						               this.dataList[lenStr].title = getList[i].monthly;
						               this.dataList[lenStr].list = []
						               this.dataList[lenStr].list.push(getList[i]);
						          }else{
						               this.dataList[lenStr-1].list.push(getList[i]);
						          }
						     }else{
						          this.dataList.push({});
						          this.dataList[lenStr].title = getList[i].monthly;
						          this.dataList[lenStr].list = [];
						          this.dataList[lenStr].list.push(getList[i]);
						          console.log(this.dataList)
						     }
						}
						console.log(this.dataList)
					}
				},{assetManageType:this.flag,page:this.pageNum,pageSize:12,type:this.flag==2 ? typeId:''})
			}
		},
		components:{
			wxLoading,
			accountNull
		},
		created(){
			console.log(this.tabType+'tabType..')
			this.classifyData();
			if(this.tabType == 1){
				this.getData(this.pageNum,'all');
			}else{
				this.getData(this.pageNum);
			}
		}
	}
	
</script>

<style lang="scss" scoped>
	.mtContent{
		// min-height:16.453333rem;
	}
	
	.log{
		font-family: PingFangSC-Regular;
	}
	.classify{
		width: 100%;
		height: 1.066667rem;
		position: relative;
		.classify_title{
			width: 100%;
			height: 1.066667rem;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 12;
			background: #ffffff;
			font-size: 0.373333rem;
			color: #333333;
			line-height: 1.066667rem;
			text-align: center;
			top:0;
			padding-left: 0.373333rem;
		}
		i{
			font-size: 0.226667rem;
			color: #333333;
			
		}
		span.trans{
			transform: rotate(180deg);
		    transition: all 1s ease;
		}
		span{
			display: inline-block;
			width: 0.346667rem;
			height: 0.346667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/down.png) no-repeat;
			background-size: 100% 100%;
			position: relative;
		    top: .08rem;
	    	transform: rotate(0deg);
	        transition: all 1s ease;
		}
		.top1{
			top:1.093333rem;
		}
	}
	.top2{
		top: 2.16rem !important;
	}
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:999;
		top: 1.066667rem;
		.content li{
			background:#fff;
			height:1.066667rem;
			font-size: 0.373333rem;
			color: #333333;
			line-height:1.066667rem;
			text-align:center;
			position: relative;
		}
		li.active{
			color:#ff5b4c;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/account/active.png) 9rem 0.346667rem no-repeat;
			background-size:0.4rem 0.266667rem;
		}
	}
	.logChild{
		.title{
			height:1.066667rem;
			line-height:1.066667rem;
			font-size: 0.373333rem;
			color: #333333;
			padding-left:0.4rem;
		}
		ul{ 
			padding-left: 0.4rem;
			background: #ffffff;
			li{
				background:#fff;
				height:1.573333rem;
				position: relative;
				.name{
					padding: 0.2rem 0 0.08rem;
					font-size: 0.373333rem;
					color: #333333;
				}
				.time{
					font-size: 0.293333rem;
					color: #8E8E8E;
					line-height:0.44rem;
				}
				.money{
					line-height:1.466667rem;
					font-size: 0.346667rem;
					color: #FF5B4C;
					padding-right: 0.4rem;
				}
				.fall{
					color: #333333;
				}
				.ico_img{
					width: 0.933333rem;
					height: 0.933333rem;
				    padding-top: .27rem;
				    margin-right: 0.4rem;
					img{
						width: 0.933333rem;
						height: 0.933333rem;
					}
				}
				// .line{
				// 	height:1px;
				// 	background:#e5e5e5;
				// }
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
		
</style>
<style>
	.mint-tab-item-label{
	    font-size: .4rem;
	}
</style>