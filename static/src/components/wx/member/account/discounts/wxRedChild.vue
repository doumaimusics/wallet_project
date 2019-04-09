<template>
	<div v-if="flag == 1" class="red1">
		<mt-loadmore v-if="dataList.length != 0" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
	     	<ul class="list">
	     		<li v-for="(item,index) in dataList" class="clear" :class="{over:item.status == -1 || item.status == 1}">
	     			<!-- <span class="img img1" v-if="item.limitMouthTime != '无限制' && item.status == 0">{{item.limitMouthTime}}</span>
	     			<span class="img img2" v-else-if="item.limitMouthTime != '无限制'">{{item.limitMouthTime}}</span> -->
	     			<img class="past_used" :src="redBg[item.status == -1 ? 2:item.status]" alt="" v-if="item.status != 0">
	     			<div class="title fr">
	     				<!-- :class="{tilte2:status != 0}" -->
	     				<div class="text">{{item.limitInvestAccount}}</div>
	     				<div class="money">¥<span>{{item.amount}}</span></div>
	     				<div class="usePacket" @click="toInvestList" v-if="status == 0">点击使用</div>
	     				<!-- <div v-if="item.remainDays<1" class="condition">即将过期</div>
	     				<div v-else-if="item.remainDays<=7" class="condition">剩余{{item.remainDays}}天过期</div> -->
	     			</div>
	     			 <!-- :style="{background:'url('+redBg[item.status == -1 ? 2:item.status]+') 4.346667rem 0.666667rem no-repeat'}" -->
	     			<div class="content fr">
	     				<div class="name">{{item.name}}
	     					<!-- <span class="cash_packet" v-if="item.type == 1">现金红包</span> -->
	     				</div>
	     				
	     				<p class="p_limit" v-if="item.limitMouthTime != '无限制' && item.status == 0 &&  item.type != 1">{{item.limitMouthTime}}</p>
	     				<p class="p_limit" v-else-if="item.limitMouthTime != '无限制' && item.status != 0 &&  item.type != 1">{{item.limitMouthTime}}</p>
		     			<p class="p_limit" v-else-if="item.limitMouthTime != '无限制' && !item.canExcharge && item.type != 1">{{item.limitMouthTime}}</p>
	     				
	     				<div class="text lastTime" @click="goConversion(item,index)" v-if="item.status == 0 && item.type == 1 && item.canExcharge">兑换现金</div>
	     				<!-- <div class="text lastTime2" @click="goConversion(item,index)" v-else-if="item.status == 0 && item.type == 1 && !item.canExcharge"></div> -->

	     				<!-- <div v-else-if="item.status == 0 && item.type == 1" :style="{background:'#fff'}" class="text lastTime">兑换处理中... </div> -->

	     				<div v-if="status != 1" class="text" :class="{hasCsh: item.status != 0 &&  item.type == 1}">{{status == -1 ? '已失效':'有效期至'}}：{{item.expiredTime}}
	     					<span v-if="item.remainDays<1" class="condition">(即将过期)</span>
	     					<span v-else-if="item.remainDays<=7" class="condition">({{item.remainDays}}天后失效)</span>
	     				</div>	
	     				<div v-else class="text" :class="{hasCsh: item.status != 0 &&  item.type == 1}">使用时间：{{item.usedTime}}
	     					<span v-if="item.remainDays<1" class="condition">(即将过期)</span>
	     					<span v-else-if="item.remainDays<=7" class="condition">({{item.remainDays}}天后失效)</span>
	     				</div>
	     				
	     				
	     			</div>
	     		</li>
	     	</ul>
	    </mt-loadmore>
	    <account-null v-else-if="isgetData"  :img="'https://aliyunsso.edspay.com/web/wxUpdate/money_null.png'" :text="'您还没有红包记录哦'"></account-null>
	   
	    <red-tips :showlayer="showlayer" :conversion="conversion" :redIndex="redIndex" :item="thisItem" :msgTips="msgTips"></red-tips>
	</div>
	<div v-else-if="flag == 3" class="red3">
		<mt-loadmore  v-if="dataList.length != 0" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
	     	<ul class="list">
	     		<li v-for="item in dataList" class="clear" :class="{over:item.status == -1 || item.status == 1}">
	     			<!-- <span class="img img1" v-if="item.limitMouthTime != '无限制' && item.status == 0">{{item.limitBorrowTime}}</span>
	     			<span class="img img2" v-else-if="item.limitMouthTime != '无限制'">{{item.limitMouthTime}}</span> -->
	     			 <!-- :class="{tilte2:status != 0}" -->
	     			<img class="past_used" :src="redBg[item.status == -1 ? 2:item.status]" alt="" v-if="item.status != 0">
	     			<div class="title fr">
						<div class="text">{{item.limitInvestAccount}}</div>
	     				<div class="money">+<span>{{item.upApr}}</span><i>%</i></div>
	     				<div class="usePacket" @click="toInvestList" v-if="status == 0">点击使用</div>
	     				<!-- <div v-if="item.remainDays<1" class="condition">即将过期</div>
	     				<div v-else-if="item.remainDays<=7" class="condition">剩余{{item.remainDays}}天过期</div> -->
	     			</div>
	     			 <!-- :style="{background:'url('+redBg[item.status == -1 ? 2:item.status]+') 4.346667rem 0.666667rem no-repeat'}" -->
	     			<div class="content fr">
	     				<div class="name name3">{{item.name | strNum}}
	     					<span class="cash_packet" :class="{past:item.status != 0}" v-if="item.limitUptime != '无限制'">{{item.limitUptime}}</span>
	     				</div>
	     				
	     				<p class="p_limit p_limit2" v-if="item.limitMouthTime != '无限制' && item.status == 0">{{item.limitBorrowTime}}</p>
	     				<p class="p_limit p_limit2" v-else-if="item.limitMouthTime != '无限制'">{{item.limitBorrowTime}}</p>
	     				<div class="text text2">{{item.limitUpMoney}}</div>
	     				<div v-if="status != 1" class="text">{{status == -1 ? '已失效':'有效期至'}}：{{item.expiredTime}}
	     					<span v-if="item.remainDays<1" class="condition">(即将失效)</span>
	     					<span v-else-if="item.remainDays<=7" class="condition">({{item.remainDays}}天后失效)</span>
	     				</div>
	     				<div v-else class="text">使用时间：{{item.usedTime}}
	     					<span v-if="item.remainDays<1" class="condition">(即将失效)</span>
	     					<span v-else-if="item.remainDays<=7" class="condition">({{item.remainDays}}天后失效)</span>
	     				</div>
	     			</div>
	     		</li>
	     	</ul>
	    </mt-loadmore>
	    <account-null v-else :img="'https://aliyunsso.edspay.com/web/wxUpdate/money_null.png'" :text="'您还没有加息券记录哦'"></account-null>
	</div>
</template>

<script>

	import wxHeader from '../../../../wxHeader';
	import wxTab from '../../../../public/wx/wxTab';
	import redTips from './redTips'
	import accountNull from '../wxNull'
	import Toast from '../../../../../common/wx/wxToast';

	import { MessageBox } from 'mint-ui';		//弹框
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		mixins:[Toast],
		data(){
			return {
				isgetData:false,
				pageNum:1,
				pages:1,
				autoFill:false,
				changeLoading:true,		//是否可加载
				clickFlag:true,
				thisList:'',
				showList:false,	//显示列表
				msgTips:'存管',		//提示
				redIndex:null,
				screen:{
					use:false,
					used:false,
					has:false
				},
				screenText:[
					'红包',
					'体验券',
					'加息券'
				],
				showlayer:{ 
					isShow:false	
				},
				dataList:[],
				thisItem:{},	//当前点击红包数据
				redBg:[
					'',
					'https://aliyunsso.edspay.com/web/wx/v3.3.5/used.png',
					'https://aliyunsso.edspay.com/web/v5.1.0/invalidation.png',
				]
			}
		},
		props:['redList','titleList','flag','resData','status','account'],
		watch:{
			status(curVal,oldVal){
				if(curVal != oldVal){
					this.pageNum = 1;
					this.getData(this.pageNum);
				}
			}
		},
		computed:{
            allLoaded:{
            	get(){
                    if(this.flag ==1 && this.titleList.selected == 'tab-container1' && this.changeLoading) return false  
                    else if(this.flag ==2 && this.titleList.selected == 'tab-container2'  && this.changeLoading) return false;   
                    else if(this.flag ==3 && this.titleList.selected == 'tab-container3'  && this.changeLoading) return false;   
                    else return true;
                },
                set(){}
            }
        },
		methods:{
			toInvestList(){
				this.$router.push('/wxInvest');
			},
			activeLi(num,index){
				console.log(num)
				for(var item in this.screen){
					this.screen[item] = false;
				}
				this.screen[num] = true;
				this.showList = false;
				this.status = index;
				this.pageNum = 1;
				//发送请求
				this.getData(this.pageNum);
			},
			goConversion(item,index){
				this.thisItem = item;
				this.redIndex = index;
				if(this.account.zsBankCardCount == 0 ){
					MessageBox.confirm('你尚未开通存管，请开通存管').then(action => {
						this.$router.replace({path: '/wxDepository', query: {thisUrl:this.$route.fullPath}});
					},action =>{});
				}else if(this.account.bankOpenStatus == 2){
					// this.msgTips = '存管';
					// this.showlayer.isShow = true;
					this.conversion();
				}else if(this.account.bankOpenStatus == 3){
					this.conversion();
				}
			},
			conversion(){	//去兑换红包
				//发送请求
				this.thisItem.canExcharge = false;
				this.postData('/red/envelope/exchangeMoney',(res,data) => {
					if(data.resCode){
						if(this.msgTips == '存管'){
							this.toast({text:'兑换成功，约5分钟后到账'+this.msgTips+'账户余额',place:'middle'});
						}
						this.dataList.splice(this.redIndex,1) //删除已兑换红包
					}else{
						this.thisItem.canExcharge = true;
					}
				},{redEnvelopeId:this.thisItem.id},1)
				// this.showlayer.isShow = false;
			},
			getData(num){
				this.changeLoading = true;
				var that = this;
				this.postData(this.resData,(res,data) =>{
					if(res.body.resCode){
						if(num == 1){
							this.isgetData = true;
							that.dataList =[]
							that.dataList = res.body.resData.pageInfo.list;
						}else{
							that.dataList = that.dataList.concat(res.body.resData.pageInfo.list);
						}
						console.log(num+'======='+res.body.resData.pageInfo.pages)
						if(num >= data.resData.pageInfo.pages){
							console.log('lsss')
							that.changeLoading = false;
						}
					}
					console.log(this.changeLoading+"========="+this.allLoaded)
				},{pageNum:this.pageNum,pageSize:10,status:this.status},1)
			},
			loadTop(){
				var that = this;
				this.pageNum = 1
				that.changeLoading = true;
				var timer = setTimeout(function(){
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					clearTimeout(timer)
				},1500)
			},
			loadBottom(){
				var that = this;
				that.changeLoading = false;
				that.pageNum += 1
				var timer = setTimeout(function(){
					that.changeLoading = true;
					that.getData(that.pageNum);
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},1500)
			}
		},
		components:{
			wxHeader,
			wxTab,
			redTips,
			accountNull,
		},
		created(){
			this.getData(this.pageNum);
		}

	}
</script>

<style lang="scss" scoped>
	.red3{
		
	}
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
			.tilte2{
				color: #ffffff;
				span{
					color: #ffffff;
				}
			}
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
	ul.list{background:#fff;padding-top:0.533333rem;padding-bottom: 0.026667rem;}
	ul.list li.over{
		background: #fff url(https://aliyunsso.edspay.com/web/wx/v3.3.5/packetrt_off.png?v1.0) no-repeat;
		background-size: 100% 100%!important;
		width: 9.2rem;
		height: 3.0rem;
	}
	ul.list li{
		background: #fff url(https://aliyunsso.edspay.com/web/wx/v3.3.5/packetrt_on.png?v1.0) no-repeat;
		background-size: 100% 100%!important;
		width: 9.2rem;
		height: 3.0rem;
		// height:3.013333rem;
		// width:9.2rem;
		margin:0 auto;
		margin-bottom: 0.4rem;
		font-size:0.346667rem;
		line-height:0.506667rem;
		position:relative;
		.past_used{
			position: absolute;
			width: 2.346667rem;
			height: 2.346667rem;
			left: 4.6rem;
		    top: .3rem;
		}
		.img{
			position:absolute;
			height:0.533333rem;
			width:2.3rem;
			top:0.213333rem;
			left:-0.08rem;
			overflow: hidden;
			font-size:0.266667rem;
			line-height: 0.48rem;
			padding-left:0.106667rem;
			color:#fff;
		}
		.p_limit{
			font-size: 0.32rem;
			color: #808080;
			padding-bottom: 0.5rem;
			// border-bottom: 1px dashed #e5e5e5;
		}
		.p_limit2{
			padding-bottom: 0rem;
		}
		.img1{
			background:url(https://aliyunsso.edspay.com/web/wx/account/jiaobiaoRed.png);
			background-size:100% 100%;
		}
		.img2{
			background:url(https://aliyunsso.edspay.com/web/wx/account/jiaobiaoGray.png);
			background-size:100% 100%;
		}
		.usePacket{
			width: 1.6rem;
			height: 0.453333rem;
			border-radius: 0.226667rem;
			border: 1px solid #ffffff;
			text-align: center;
			font-size: 0.266667rem;
			color: #FFFFFF;
			margin: 0 auto;
			line-height: 0.453333rem;
		}
		.text2{
			padding-bottom: .26rem;
		    padding-top: 0rem !important;
		}
		
		.title{
			text-align:center;
			color:#ffffff;
			width: 2.893333rem;
			height: 3.0rem;
			// background: url(https://aliyunsso.edspay.com/web/wx/v3.3.5/packetrt_on.png)no-repeat;
			// background-size:2.893333rem 3.0rem; 
			.text{
				padding-top: 0.466667rem;
				font-size: 0.32rem;
				color: #FFFFFF;
			}
			.money{
				// padding-top:0.88rem;
				font-size:0.4rem;
				line-height:0.56rem;
				span{
					padding-left:0.08rem;
					font-size: 0.933333rem;
					line-height:1.2rem;
				}
				i{
					font-size:0.6rem;

				}
			}
		}
		.tilte2{
			color:#ccc;
		}
		.content{
			// height:3.013333rem;
			width: 6.306667rem;
		    height: 3.0rem;
		    padding-left: 0.266667rem;
		    position: relative;
		    padding-top: .35rem;
			// background: url(https://aliyunsso.edspay.com/web/wx/v3.3.5/packetlt.png) no-repeat !important;
			// background-size: 100% !important;
			// background-size:2.506667rem 2.4rem!important;
			.name{
				font-size:0.4rem;
				line-height:0.533333rem;
			    margin-bottom: .38rem;
			    height: 0.533rem;
				overflow: hidden;
				// padding: 0.4rem 0 0.386667rem 0;
				.cash_packet{
					display: inline-block;
				    border: 1px solid #FF5D5F;
				    border-radius: 2px;
				    font-size: 0.293333rem;
				    color: #FF5D5F;
				    padding: 0rem 0.08rem;
				    margin-left: 0.03rem;
				}
				.cash_packet.past{
					color: #808080;
					border: 1px solid #808080;
				}
			}
			.name2{
				// padding: .3rem 0 .1rem 0;
			}
			.name3{
				height: .63rem;
			    margin-bottom: .1rem;
			}
			.text{
				line-height:0.44rem;
				padding-top: .1rem;
				font-size: 0.266667rem;
				color: #808080;
			}
			.text.hasCsh{
				padding-top: 1.1rem;
			}
			.lastTime{
				color: #FF5B4C;
				text-align:center;
				line-height:0.6rem;
				position:relative;
				font-size: 0.373333rem;
				// right:0.35rem;
				// top:0.9rem;
				width:2.266667rem;
				height:0.8rem;
				// color:linear-gradient(-135deg, #FF764C 0%, #FF734C 11%, #FF734C 11%, #FF5B4C 100%);
				// border-radius:0.333333rem;
				bottom: 0.4rem;
				background:url(https://aliyunsso.edspay.com/web/wx/v3.3.5/change_packet.png) no-repeat;
				background-size:100% 100%;
				margin-top: .6rem;
			}
			.lastTime2{
				color: #FF5B4C;
				text-align:center;
				line-height:0.8rem;
				position:relative;
				font-size: 0.373333rem;
				// right:0.35rem;
				// top:0.9rem;
				width:2.266667rem;
				height:0.8rem;
				color:linear-gradient(-135deg, #FF764C 0%, #FF734C 11%, #FF734C 11%, #FF5B4C 100%);
				border-radius:0.333333rem;
				bottom: 0.4rem;
				// background:url(https://aliyunsso.edspay.com/web/wx/account/rebBtn.png) no-repeat;
				// background-size:100% 100%;
				margin-top: .3rem;
			}

		}
	}
	
</style>