<template>
	<div>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
	     	<ul>
	     		<li v-for="item in dataList" class="clear" :style="{background:'url('+redBg[item.status]+')'}">
	     			<div class="title fl">
	     				<div class="money">+<span>{{item.upApr}}%</span></div>
	     				<div class="condition">{{item.limitInvestAccount}}</div>
	     			</div>
	     			<div class="content fl">
	     				<div class="name">{{item.name}}</div>
	     				<div class="text" v-if="item.type != 1">适用项目：{{item.limitMouthTime}}</div>
	     				<div class="text">有效期至：{{item.expireTime}}</div>
	     				<div v-if="!item.hasConversion"  class="text lastTime">剩余11天过期<span @click="goConversion(item)" v-if="item.status == 0&&item.type == 1">兑换现金</span></div>
	     				<div v-else class="text lastTime">兑换处理中... </div>
	     			</div>
	     		</li>
	     	</ul>
	    </mt-loadmore>
	    <red-tips :showlayer="showlayer" :item="thisItem"></red-tips>
	</div>
</template>

<script>

	import wxHeader from '../../../../wxHeader';
	import wxTab from '../../../../public/wx/wxTab';
	import redTips from './redTips'

	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				pageNum:1,
				autoFill:false,
				thisList:'',
				showlayer:{
					isShow:false	
				},
				dataList:[],
				thisItem:{},	//当前点击红包数据
				redBg:[
					'https://aliyunsso.edspay.com/web/wx/account/cashRed.png',
					'https://aliyunsso.edspay.com/web/wx/account/used.png',
					'https://aliyunsso.edspay.com/web/wx/account/past.png'
				]
			}
		},
		props:['redList','titleList','flag','resData'],
		computed:{
            allLoaded:{
            	get(){
                    console.log(this.flag+'=='+this.titleList.selected)
                    if(this.flag ==1 && this.titleList.selected == 'tab-container1') return false  
                    else if(this.flag ==2 && this.titleList.selected == 'tab-container2') return false;   
                    else if(this.flag ==3 && this.titleList.selected == 'tab-container3') return false;   
                    else return true;
                },
                set(){}
            }
        },
		methods:{
			goConversion(item){
				item.hasConversion = false;
				this.thisItem = item
				console.log(item)
				this.showlayer.isShow = true;
			},
			getData(){
				var that = this;
				this.postData(this.resData,function(res){
					if(res.body.resCode == 1){
						if(that.pageNum == 1){
							that.dataList = res.body.resData.pageInfo.list;
						}else{
							that.dataList = that.dataList.concat(res.body.resData.pageInfo.list);
						}
						that.pageNum += 1
					}

				},{pageNum:this.pageNum,pageSize:10})
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
				var timer = setTimeout(function(){
					that.getData();
					that.$refs.loadmore.onBottomLoaded();
					that.allLoaded = false;
					clearTimeout(timer)
				},1500)
			}
		},
		components:{
			wxHeader,
			wxTab,
			redTips,
		},
		created(){
			this.getData();
		}

	}
</script>

<style lang="scss" scoped>
	ul{background:#fff;margin-top: 0.266667rem;padding-top:0.533333rem;}
	ul li{
		background: #fff url(https://aliyunsso.edspay.com/web/wx/account/cashRed.png) no-repeat;
		background-size: 100% 100%!important;
		height:3.466667rem;
		width:9.2rem;
		margin:0 auto;
		margin-bottom: 0.4rem;
		font-size:0.346667rem;
		line-height:0.506667rem;
		.title{
			text-align:center;
			color:#fff;
			width:3.333333rem;
			.money{
				padding-top:0.533333rem;
				font-size:0.4rem;
				line-height:0.56rem;
				span{
					padding-left:0.08rem;
					font-size:1.173333rem;
					line-height:1.653333rem;
				}
			}
		}
		.content{
			height:3.466667rem;
			padding-left:0.266667rem;
			position: relative;
			.name{
				font-size:0.373333rem;
				line-height:0.533333rem;
				padding: 0.4rem 0;
			}
			.text{
				font-size:0.32rem;
				line-height:0.44rem;
				color:#afafaf;
			}
			.lastTime{
				color:#ff6e30;
				line-height:0.666667rem;
				position:absolute;
				width:100%;
				bottom: 0.4rem;
				span{
					position:absolute;
					height:0.666667rem;
					width:2.133333rem;
					border: 1px solid #ff5b4c;
					border-radius: 0.333333rem;
					font-size:0.346667rem;
					line-height:0.586667rem;
					text-align:center;
					right: 0;
					bottom:0;
				}
			}
		}
	}
	
</style>