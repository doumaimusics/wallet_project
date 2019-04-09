<template>
	<div>
		<wx-header :goBackUrl="{path:'/wxInvestIn/wxInvestMoney',query:{uuid:transmit.uuid}}" :goBackUrlPoint="{path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:transmit.uuid}}" :assetManageType="assetManageType" :logo="screenText[hrefData.flag-1]"></wx-header>
		<div class="red2">
			<mt-loadmore v-if="dataList.length != 0" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
		     	<ul class="list">
		     		<li v-for="item in dataList" @click="activeLi(item,'amount')" class="clear">
		     			<img v-if="item.useable" class="isCheck" :src="isCheck[item.checkImg]" alt="">
		     			<div class="title fl">
		     				<div class="money">¥<span>{{item.amount}}</span></div>
		     				<div v-if="item.remainDays<1" class="condition">即将过期</div>
		     				<div v-else-if="item.remainDays<8" class="condition">剩余{{item.remainDays}}天过期</div>
		     			</div>
		     			<div class="content fl" :style="{background:'url('+redBg[item.status]+') 4.346667rem 0.666667rem no-repeat'}">
		     				<div class="name">{{item.name}}</div>
		     				<div class="text">有效期至：{{item.expiredTime}}</div>
		     			</div>
		     		</li>
		     	</ul>
		    </mt-loadmore>
		    <div class="bottomTip">已选择体验金：{{redItem.amount ? redItem.amount:0}}.0元<span @click="goExperInvest" class="isOk">确定</span></div>
		</div>
	</div>
</template>

<script>

	import wxHeader from '../../../wxHeader';
	import { Toast } from 'mint-ui';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				pageNum:1,
				autoFill:false,
				allLoaded:false,
				clickFlag:true,
				thisList:'',
				showList:false,	//显示列表
				status:null,
				redMoney:0,
				redItem:{},		//被点击的红包
				total:0,	//总数
				upAprShow:0,	//已选加息券张数
				screenText:[
					'使用红包',
					'使用加息券',
					'使用体验券'
				],
				redBg:[],
				isCheck:[
					'https://aliyunsso.edspay.com/web/wx/invest/notCheck.png',
					'https://aliyunsso.edspay.com/web/wx/invest/isCheck.png'
				],
				dataUrl:['/red/envelope/tenderList','/uprate/list','/experience/list'],
				dataList:[],
				thisItem:{},	//当前点击红包数据
				hrefData:{},	//是上个页面传过来的值
				transmit:{
					pageNum:1,
					pageSize:10,
					status:0,
				},	//发送请求要传递的参数
				assetManageType:'',
			}
		},
		methods:{
			goConversion(){

			},
			getData(num){
				var that = this;
				this.transmit.assetManageType = this.assetManageType;
				this.postData('/experience/list',(res,data) => {
					if(res.body.resCode == 1){
						for(var i=0;i<res.body.resData.pageInfo.list.length;i++){
							res.body.resData.pageInfo.list[i].checkImg = 0;
							console.log()
						}
						if(num == 1){
							that.dataList = res.body.resData.pageInfo.list;
							this.total = data.resData.pageInfo.total;
						}else{
							that.dataList = that.dataList.concat(res.body.resData.pageInfo.list);
						}
						if(num >= res.body.resData.pageInfo.pages){
							that.allLoaded = false;
						}
					}

				},this.transmit,1)
			},
			activeLi(item,name){		//点击列表
				if(!item.useable){
					Toast({
					  message: item.useWarn,
					  position: 'bottom',
					  duration: 4000
					});
				}
				if(item.useable){
					if(this.redItem != item){
						this.redItem.checkImg = 0;
						item.checkImg = 1;
						this.redItem = item;
						this.redMoney = this.redItem[name];
						this.upAprShow = 1;
					}else{
						if(this.redItem.checkImg){
							this.redItem.checkImg = 0;
							this.redMoney = 0;
							this.redItem = {};
							this.upAprShow = 0;
						}else{
							item.checkImg = 1;
							this.redItem = item;
							this.redMoney = this.redItem[name];
							this.upAprShow = 1;
						}
					}
				}
			},
			goExperInvest(){
				if (this.assetManageType == 3) {
					this.$router.replace({path:'/wxInvestIn/wxInvestMoneyPoint',query:{experMoney:this.redItem.amount,experId:this.redItem.id,uuid:this.transmit.uuid,redFlag:3}})
				}else {
					this.$router.replace({path:'/wxInvestIn',query:{experMoney:this.redItem.amount,experId:this.redItem.id,uuid:this.transmit.uuid,redFlag:3}})
				}
				
			},
			loadTop(){
				var that = this;
				var timer = setTimeout(function(){
					that.getData();
					that.$refs.loadmore.onTopLoaded();
					clearTimeout(timer)
				},1500)
			},
			loadBottom(){
				var that = this;
				that.allLoaded = false;
				that.transmit.pageNum += 1
				var timer = setTimeout(function(){
					that.allLoaded = true;
					that.getData(that.transmit.pageNum);
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},1500)
			}
		},
		components:{
			wxHeader,
		},
		activated(){
			if(this.hrefData.useMoney != this.$route.query.useMoney){
				this.hrefData = this.$route.query;
				this.transmit.investAccount = this.hrefData.useMoney;
				this.transmit.uuid = this.hrefData.uuid;
				this.hrefData.urlData = this.dataUrl[this.hrefData.flag-1];
				this.getData(this.transmit.pageNum);
				this.redItem = {};
			}
		},
		created(){
			this.assetManageType = this.$route.query.assetManageType;
		}
	}
</script>

<style lang="scss" scoped>
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		z-index:999;
		top:1.333333rem;
		.content li{
			background:#fff;
			height:1.066667rem;
			border-bottom:1px solid #e5e5e5;
			font-size:0.4rem;
			line-height:1.066667rem;
			text-align:center;
		}
		li.active{
			color:#ff5b4c;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/account/active.png) 9rem 0.346667rem no-repeat;
			background-size:0.4rem 0.266667rem;
		}
	}
	.screen{
		position: fixed;
		font-size: 0.373333rem;
		line-height: 1.333333rem;
		top: 0;
		right: 0;
		z-index: 999;
		color: #fff;
		padding-right: 0.4rem;
	}
	ul.list{background:#fff;margin-top: 0.266667rem;padding-top:0.533333rem;}
	ul.list li{
		background: #fff url(https://aliyunsso.edspay.com/web/wx/account/redBg.png) no-repeat;
		background-size: 100% 100%!important;
		height:3.013333rem;
		width:9.2rem;
		margin:0 auto;
		margin-bottom: 0.4rem;
		font-size:0.346667rem;
		line-height:0.506667rem;
		position:relative;
		.isCheck{
			height:0.666667rem;
			width:0.666667rem;
			position:absolute;
			top:0.266667rem;
			right:0.266667rem;
		}
		.img{
			position:absolute;
			height:0.533333rem;
			width:2.133333rem;
			top:0.213333rem;
			left:-0.08rem;
			overflow: hidden;
			font-size:0.266667rem;
			line-height: 0.48rem;
			padding-left:0.106667rem;
			color:#fff;
		}
		.img1{
			background:url(https://aliyunsso.edspay.com/web/wx/account/jiaobiaoRed.png);
			background-size:100% 100%;
		}
		.img2{
			background:url(https://aliyunsso.edspay.com/web/wx/account/jiaobiaoGray.png);
			background-size:100% 100%;
		}
		.title{
			text-align:center;
			color:#ff5b4c;
			width:2.7rem;
			.money{
				padding-top:0.88rem;
				font-size:0.4rem;
				line-height:0.56rem;
				span{
					padding-left:0.08rem;
					font-size:0.8rem;
					line-height:1.2rem;
				}
				i{
					font-size:0.6rem;
				}
			}
		}
		.content{
			height:3.013333rem;
			width:6.1rem;
			padding-left:0.266667rem;
			position: relative;
			background-size:2.506667rem 2.4rem!important;
			.name{
				width:58%;
				font-size:0.373333rem;
				line-height:0.533333rem;
				padding: 0.4rem 0;
			}
			.text{
				font-size:0.32rem;
				line-height:0.44rem;
				color:#afafaf;
			}
			.expiredTime{
				position:absolute;
				top:1.76rem;	
			}
			.lastTime{
				color:#ff6e30;
				text-align:center;
				line-height:0.66rem;
				position:absolute;
				right:0.4rem;
				top:0.95rem;
				width:2.133333rem;
				height:0.666667rem;
				color:linear-gradient(-135deg, #FF764C 0%, #FF734C 11%, #FF734C 11%, #FF5B4C 100%);
				border-radius:0.333333rem;
				bottom: 0.4rem;
				background:url(https://aliyunsso.edspay.com/web/wx/account/rebBtn.png) no-repeat;
				background-size:100% 100%;
			}
		}
	}
	.bottomTip{
		height:1.166667rem;
		width:100%;
		line-height:1.166667rem;
		padding-left:0.266667rem;
		color:#666;
		position:fixed;
		bottom:0;
		background:#fff;
		.left{
			float: left;
			p{
				color:#676767;
				font-size:0.4rem;
				line-height:0.613333rem;
			}
		}
		
		span{
			height:0.666667rem;
			margin:0.2rem 0.533333rem;
			background:#ff5a4a;
			border-radius:0.106667rem;
			line-height:0.666667rem;
			color:#fff;
			padding: 0 0.133333rem;
			float:right;
		}
	}
	
</style>