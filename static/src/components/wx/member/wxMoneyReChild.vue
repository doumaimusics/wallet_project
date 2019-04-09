<template>
	<div class="content">
		<!-- <div class="top">
			<span class="fl">充值状态</span>
			<span class="fr">交易时间/金额</span>
		</div>
		<div class="topTi"></div> -->
		<mt-loadmore v-if="dataList.length != 0" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul>
				<li v-for="item in dataList">
					<div class="left fl">
						<div class="title">{{flag == 1 ? charge[item.status]:drawings[item.status]}}</div>
						<div class="time">{{item.addTime}}</div>
					</div>
					<div class="result fr"><span v-if="flag == 1">+</span><span v-else>-</span>{{item.money | moneyFormat}}元</div>
				</li>
			</ul>
		</mt-loadmore>
		<account-null v-else :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂时没有账单'"></account-null>
	</div>
</template>

<script>
	import accountNull from './account/wxNull'
	import { Loadmore } from 'mint-ui';
	export default{
		data(){
			return{
				isover:true,	//是否加载完
				autoFill:false,
				dataList:[],
				pageNum:1,
				pages:1,
				charge:['充值处理中','充值成功','充值失败'],
				drawings:['审核中','提现成功','提现失败','','提现申请','','','','提现处理中'],
			}
		},
		props:['flag','dataUrl','titleList'],
		computed:{
			allLoaded:{
	        	get(){
	                console.log(this.flag+'=='+this.titleList.selected)
	                if(this.flag ==1 && this.titleList.selected == 'tab-container1' && this.isover) return false;  
	                else if(this.flag ==2 && this.titleList.selected == 'tab-container2' && this.isover) return false;   
	                else return true;
	            },
	            set(){}
	        },
		},
		methods:{
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
				},800)
				console.log(this.allLoaded);
			},
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				this.isover = false;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
						that.isover = true;
					}
					clearTimeout(timer)
				},500)
			},
			getData(num){
				this.postData(this.dataUrl,(res,data) =>{
					if(data.resCode){
						this.pages = data.resData.pageInfo.pages;
						if(num == 1){
							this.dataList = data.resData.pageInfo.list;
						}else{
							this.dataList = this.dataList.concat(data.resData.pageInfo.list);
							console.log(this.dataList)
						}
					}
				},{pageNum:num,pageSize:10},1)
			}
		},
		components:{
			accountNull,
		},
		created(){
			this.getData(this.pageNum);
		}
	}
</script>

<style lang="scss" scoped>
	.top{
		height:1.066667rem;
		width:100%;
		top:0;
		position:fixed;
		top:2.626667rem;
		z-index: 100;
		background: #F8F8F8;
		span{
			text-align:center;
			width:50%;
			line-height:1.066667rem;
			color:#333;
		}
	}
	.topTi{
		height:1.066667rem;
	}
	ul{
		margin-top:0.266667rem;
		background:#fff;
		padding-left:0.266667rem;
		li{
			border-bottom: 1px solid #F2F2F2;
			font-size:0.426667rem;
			height:1.573333rem;
			.result{
				color:#808080;
				text-align:right;
				height:100%;
				width:48%;
				padding-right:0.4rem;
				line-height:1.573333rem;
				overflow: hidden;
			}
			.left{
				.title{
					color:#494743;
					font-size:0.373333rem;
					line-height:0.533333rem;
					padding-top:0.266667rem;
				}
				.time{
					color:#8e8e8e;
					line-height:0.65rem;
				}
			}
		}
	}
</style>