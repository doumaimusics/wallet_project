<template>
	<div id="MaChlid">
		<!-- 没有余额智投顶部 -->
		<div v-if="flag == 2 && showAutoTender == 0" @click.self="showList = !showList" class="select bdr-b">
			{{activeList}}<img src="https://aliyunsso.edspay.com/web/wx/invest/back_money_ico.png" class="san_icon" :class="{trans:showList}" alt="">
		</div>
		<!-- 有余额智投顶部 -->
		<div class="top_select_box" :class="{fiedTop: positTop}" v-else-if="flag == 2 && showAutoTender == 1">
				<div class="select_box bdr-b">
					<div class="top_box">
								<!-- left -->
							<div  @click.self="ztEvent" class="select">
								{{ztText}}<img :src="ztShowList ? 'https://aliyunsso.edspay.com/web/wx/invest/back_money_ico.png' : 'https://aliyunsso.edspay.com/web/wx/invest/back_money_ico.png'" :class="{trans:ztShowList}" alt="">
							</div>
							<!-- right -->
							<div  @click.self="cjEvent" class="select">
								{{activeList}}<img :src="showListYue ? 'https://aliyunsso.edspay.com/web/wx/invest/back_money_ico.png' : 'https://aliyunsso.edspay.com/web/wx/invest/back_money_ico.png'" :class="{trans:showListYue}" alt="">
							</div>
					</div>
				</div>	
		</div>
		<!-- 没有余额智投下拉 -->
		<div id="layer" v-if="showList" @click="showList = false">
			<ul class="content">
				<li :class="{active:screen.use}" @click="activeLi('use',0)">出借中</li>
				<li :class="{active:screen.used}" @click="activeLi('used',1)">出借结束</li>
			</ul>
		</div>

		<!-- 有余额智投下拉 -->
		<div class="select_content_box">
			<div id="layer1" :class="{fixTop:positTop}" v-show="ztShowList" @click="ztShowList = false">
				<ul class="content">
					<li :class="{active:ztScreen.use}" @click="activeLiYue('use',0,1)">自选出借</li>
					<li :class="{active:ztScreen.used}" @click="activeLiYue('used',1,1)">余额智投</li>
				</ul>
			</div>

			<div id="layer2" :class="{fixTop:positTop}" v-show="showListYue" @click="showListYue = false">
				<ul class="content">
					<li :class="{active:screen.use}" @click="activeLiYue('use',0,2)">出借中</li>
					<li :class="{active:screen.used}" @click="activeLiYue('used',1,2)">出借结束</li>
				</ul>
			</div>
		</div>

		<div class="dingw" :class="{dingwTow:positTop}">
			<mt-loadmore class="mtContent" :top-method="loadTop" :bottom-method="loadBottom" :bottomPullText="''" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
				<ul class="manage" v-if="dataList.length > 0">
					<router-link v-for="item in dataList" v-if="((item.status == 0 || item.status == 2) && screen.use) || (item.status == 1 && screen.used || flag == 1)" :to="{path:'/wxMyAccount/wxInvestListin/wxInvestMaDetail',query:{tenderId:item.tenderId,borrowSystem:item.borrowSystem}}" class="projectList" tag="li">
						<div class="top clear">
							<div class="topConet fl">
								<div class="title">{{item.borrowName}}</div>
								<div class="time">{{item.addTime | transFormatDate}}</div>
							</div>
							<div class="more_info fr">查看详情</div>
						</div>
						<ul class="project-list">
							<img v-if="item.repaymentStatus&&flag==2" src="https://aliyunsso.edspay.com/web/wx/v3.3.5/gaizhang.png"/>
							<li class="clear">
								<div class="text fl">出借本金(元)</div>
								<div class="content fr">{{item.money | moneyFormat(1)}}</div>
							</li>
							<li class="clear">
								<div class="text fl">参考年化收益(元)</div>
								<div class="content fr">{{item.interest ? item.interest:0 | moneyFormat}}</div>
							</li>
							<li class="clear">
								<div class="text fl">授权服务期</div>
								<!-- <div class="content fr" v-if="item.borrowSystem == 3">{{item.timeLimit}}天</div> -->
								<div class="content fr">{{item.timeLimit}}{{item.borrowTimeType == 1 ? '天':'个月'}}</div>
							</li>
							<li class="clear">
								<div class="text fl">出借状态</div>
								<div class="state fr" v-if="item.status == 1" :class="{statusRed:item.status}">出借结束</div>
								<div class="state fr" v-else-if="item.status == 0" :class="{statusRed:item.status}">出借中</div>
								<div class="state fr" v-else-if="item.status == 2" :class="{statusRed:item.status}">转让中</div>
							</li>
						</ul>
					</router-link>
				</ul>
				<account-null v-else-if="shart" :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂无记录'"></account-null>
			</mt-loadmore>
		</div>
	</div>
</template>

<script>
    
	import { Loadmore } from 'mint-ui';
	import accountNull from './wxNull';
	export default {
		data(){
			return {
				autoFill:false,
				thisList:{},
				isover:true,
				pages:1,
				pageNum:1,
				dataList:[],
				sinaList:[],
				zsList:[],
				shart:false,
				screen:{
					use:true,
					used:false
				},
				activeList:'出借中',
				showList:false,
				showListYue:false,
				status:0,
				showAutoTender:0,

				// 余额智投数据
				ztScreen:{
					use:true,
					used:false
				},
				ztText:'自选出借',
				ztShowList:false,   // 自选出借和余额智投
				ztTenderType:0,    // 给后台传参数  0、自选出借  1、余额智投
				heig:0,
			}
		},
		props:['titleList','flag','positTop'],   //titleList 存管和普通顶部标题、   flag  1 普通  2存管   positTop  顶部自选出借tab样式
		computed:{
            allLoaded:{
            	get(){
	                if(this.flag ==2 && this.titleList.selected == 'tab-container1' && this.isover) return false;  
	                else if(this.flag ==1 && this.titleList.selected == 'tab-container2'  && this.isover) return false;   
	                else return true;
	            },
	            set(){}
	        }
	    },
		methods:{
			ztEvent(){
				this.ztShowList = !this.ztShowList;
				this.showListYue = false;
			},
			cjEvent(){
				this.showListYue = !this.showListYue;
				this.ztShowList = false;
			},

			activeLiYue(num,index,type){    // 有余额智投选择
				if(type == 1){     // 智投选择
					for(var item in this.ztScreen){
						this.ztScreen[item] = false;
					}
					if(index == 0){
						this.ztText = '自选出借';
						this.ztTenderType = 0;
					} else {
						this.ztText = '余额智投';
						this.ztTenderType = 1;
					}
					this.ztTenderType = index;
					this.ztScreen[num] = true;
					this.ztShowList = false;
					this.getData(1);
				} else if(type == 2) {   // 出借中和出借结束选择
					for(var item in this.screen){
						this.screen[item] = false;
					}
					if(index == 0){
						this.activeList = '出借中';
						this.status = 0;
					} else {
						this.activeList = '出借结束';
						this.status = 1;
					}
					this.status = index;
					this.screen[num] = true;
					this.showListYue = false;
					this.getData(1);
				}
			},

			activeLi(num,index){  // 没有余额智投选择
				for(var item in this.screen){
					this.screen[item] = false;
				}
				if(index == 0){
					this.activeList = '出借中';
					this.status = 0;
				}else{
					this.activeList = '出借结束';
					this.status = 1;
				}
				this.screen[num] = true;
				this.showList = false;
				this.status = index;
				//发送请求
				this.getData(1);

			},
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					that.isover = true;
				},800)
			},
			loadBottom(){
				var that = this;
				this.pageNum++;
				this.isover = false;
				var timer = setTimeout(function(){
					
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
						that.isover = true;
					}else{
						that.$refs.loadmore.onBottomLoaded();
					}
					clearTimeout(timer)
				},500)
			},
			getData(num,n){
				this.postData('/planTender/getUserPlanTenderList',(res,data) => {
					this.shart = true;
					if(data.resCode == 1){
						this.pages = data.resData.pageInfo.pages;
						if(num == 1){
							if(this.flag == 1)  this.$emit("getSinaList",data.resData.pageInfo.list)
							this.dataList = data.resData.pageInfo.list;
						}else{
							this.dataList = this.dataList.concat(data.resData.pageInfo.list);
						}
					}
					this.$refs.loadmore.onBottomLoaded();
				},{assetManageType:this.flag,pageNum:num,status:this.status,tenderType:this.ztTenderType},1)
			},
			// 遍历数组 分类
			getList (list) {
				list.forEach((item,index) => {
					if (item.assetManageType==2) {
						this.sinaList.push(item)
					} else {
						this.zsList.push(item)
					}
				});
			},

		},
		components:{
			accountNull,
		},
		created(){
			this.getData(this.pageNum);
			this.showAutoTender = this.getCookie('showAutoTender');
		},
		mounted(){
			setTimeout(()=>{
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
				window.pageYOffset = 0
			},100)

			if(this.$route.query.choose == 1){   //  choose跳转进来  1.余额智投  其他根据以后需求可以添加
				this.ztText = '余额智投';
				this.ztTenderType = 1;
				this.ztScreen.used = true;
				this.ztScreen.use = false;
				this.getData(1);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mtContent{
		min-height:15.3867rem;
	}
	// 没有余额智投下拉样式
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:999;
		// top:2.14rem;
		top: 1.066667rem;
		.content li{
			background:#fff;
			height:1.066667rem;
			border-bottom:1px solid #e5e5e5;
			font-size:0.4rem;
			line-height:1.066667rem;
			text-align: center;
		}
		li.active{
			color:#ff5b4c;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/account/active.png) 9rem 0.346667rem no-repeat;
			background-size:0.4rem 0.266667rem;
		}
	}

    // 有余额智投样式
	.select_content_box{
		width: 100%;
	}
	#layer1,#layer2{
		width:100%;
		height:100%;
		position: fixed;
		left: 0;
		top: 1.06rem;
		z-index: 999;
		background: rgba(0,0,0,0.5);
		.content li{
			background:#fff;
			height:1.066667rem;
			border-bottom:1px solid #e5e5e5;
			font-size:0.4rem;
			line-height:1.066667rem;
			padding-left: 0.533333rem;
			text-align: center;
		}
		li.active{
			color:#ff5b4c;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/account/active.png) 9rem 0.346667rem no-repeat;
			background-size:0.4rem 0.266667rem;
		}
	}
	#layer1.fixTop,#layer2.fixTop{
		top:2.15rem;
	}
	#MaChlid{
		overflow: hidden;
		position: relative;
		// 没有余额智投顶部样式
		.select{
			height:1.066667rem;
			background:#fff;
			text-align:center;
			line-height:1.066667rem;
			color:#333;
			position: relative;
			img.san_icon{
				width: 0.4rem;
				height: 0.4rem;
				transform: rotate(0deg);
				transition: all 1s ease;
			}
			img.san_icon.trans{
				transform: rotate(-180deg);
				-ms-transform: rotate(-180deg);
				-moz-transform: rotate(-180deg);
				-webkit-transform: rotate(-180deg);
				-o-transform: rotate(-180deg);
				transition: all 1s ease;
			}
		}
		// 有余额智投样式
			.top_select_box{
				width: 100%;
				position: fixed;
				left: 0;
				top: 0;
				z-index: 99;
			}
			.top_select_box.fiedTop{
				top:1.093333rem;
			}
			.select_box{
				width: 100%;
				position: relative;
				.top_box{
					height: 1.066667rem;
					.select{
						width: 50%;
						height:1.066667rem;
						background:#fff;
						text-align:center;
						line-height:1.066667rem;
						color:#333;
						position: relative;
						float: left;
						img{
							width: 0.4rem;
							height: 0.4rem;
							transform: rotate(0deg);
							transition: all 1s ease;
						}
						.trans{
							transform: rotate(-180deg);
							-ms-transform: rotate(-180deg);
							-moz-transform: rotate(-180deg);
							-webkit-transform: rotate(-180deg);
							-o-transform: rotate(-180deg);
							transition: all 1s ease;
						}
					}
				}
			}
			.manage{
			// overflow-y: auto;
			margin-bottom: 2rem;
		}
		.manage .projectList{
			background-color: #fff;
			margin-top: 0.266667rem;
			padding: 0.4rem 0.4rem;
			.project-list {
				position: relative;
				img {
					position: absolute;
					width: 2.413333rem;
					height: 2.413333rem;
					left: 6.1rem;
					top:.56rem;
					z-index: 10;
				}
			}
			.top{
				border-bottom: 1px solid #e5e5e5;
				height: 1.466667rem;
				background: url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 8.8rem 0.3rem no-repeat;
			    background-size: 0.213333rem 0.4rem;
				.topConet{
					.title{
						font-size:0.373333rem;
						line-height: 0.533333rem;
						color:#494743;
					}
					.time{
						font-size:0.32rem;
						line-height:0.44rem;
						color:#8e8e8e;
					}
				}
				.statusRed{
					color:#ff5a4a;
				}
			}
			.more_info{
				font-size: 0.32rem;
				color: #808080;
				line-height: 1rem;
				padding-right: .7rem;
			}
			.state{
					line-height:0.533333rem;
					font-size:0.346667rem;
					color:#508cee;
				}
			ul{
				padding-top: 0.4rem;
				li{
					font-size:0.373333rem;
					line-height:0.533333rem;
					color:#8e8e8e;
					padding-bottom: 0.133333rem;
				}
			}
		}
		.dingw{
			width: 100%;
			height: 100%;
			position: fixed;
			top: 1.1rem;
			left: 0;
			overflow-y: scroll;
			z-index: 900;
			margin-bottom: 1rem;
			
		}
		.dingwTow{
			top:2.5rem;
		}
	}
</style>
