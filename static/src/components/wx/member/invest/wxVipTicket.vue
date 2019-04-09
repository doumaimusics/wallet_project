<template>
	<div class="packet_data">
		<title v-title>请选择</title>
		
		<!-- <invest-apr :upRateList="upRateList" :useMoney="transmit.investAccount" :redItems="redItems" :isUpRateIsAll="isUpRateIsAll" :isgetData="isgetData"></invest-apr> -->
		<div  class="red3" style="padding: 0 0 1.3rem 0;">
	     	<ul class="list" v-if="upRateList.length != 0">
	     		<li v-for="item in upRateList" @click="activeLi(item,'upApr')" class="clear" :class="{unable:!item.useable}">
	     			<img v-if="item.useable" class="isCheck" :src="isCheck[item.checkImg]" alt="">
	     			<div class="title fr" :class="{hasGray:!item.useable}">
	     				<div class="text">{{item.limitInvestAccount}}</div>
	     				<div class="money">+<span>{{item.upApr | returnFloat(1)}}</span><i>%</i></div>
	     				<div class="text text1" v-if="item.limitUptime != '无限制'">{{item.limitUptime}}</div>
	     			</div>
	     			<div class="content fr" :style="{background:'url('+redBg[item.status]+') 4.346667rem 0.666667rem no-repeat'}">
	     				<div class="name hidden">{{item.name}}</div>
	     				<p class="text" v-if="item.limitMouthTime != '无限制' && item.useable == 1">{{item.limitBorrowTime}}</p>
     					<p class="text" v-else-if="item.limitMouthTime != '无限制'">{{item.limitBorrowTime}}</p>
	     				<div class="text text1">{{item.limitUpMoney}}</div>
	     				<div class="text">有效期至：{{item.expiredTime}}</div>
	     			</div>
	     		</li>
	     	</ul>
		</div>
		<div class="unsed" @click="unsedRedPacket">不使用我的红包</div>
	</div>
</template>
<script>
	import { Toast } from 'mint-ui';
	export default{
		data(){
			return{
				autoFill:false,
				isgetData:false,
				upRateList:[],//加息券数据
				transmit:{},	//发送请求要传递的参数
				hrefData:{},	//是上个页面传过来的值
				redItems:{
					redItem:{
						uuid:this.$route.query.uuid
					}
				},		//被点击的红包
				useMoney:'',
				isUpRateIsAll:'',//该标的加息卷不可以
				isCheck:[
					'https://aliyunsso.edspay.com/web/wx/invest/notCheck.png',
					'https://aliyunsso.edspay.com/web/wx/resultIcons/isCheck.png'
				],


				status:null,
				upAprShow:0,	//已选加息券张数
				redBg:[],
				isCheck:[
					'https://aliyunsso.edspay.com/web/wx/invest/notCheck.png',
					'https://aliyunsso.edspay.com/web/wx/resultIcons/isCheck.png'
				],
				dataUrl:['/red/envelope/tenderList','/uprate/list','/experience/list'],
				dataList:[],
				thisItem:{},	//当前点击红包数据
				upaprMoney:0,//加息金额
				aprMoney:0,//最小金额
				aprDay:0,//最小天数
				upAprEarnings:0,//加息金额
				assetManageType:'',
			}
		},
		methods:{
			getData(){
				var that = this;
				this.transmit.assetManageType = this.assetManageType;
				this.postData('/vip/getUpRateList',(res,data) => {
					if(res.body.resCode == 1){
						this.isgetData = true;
						for(var i=0;i<data.resData.upRateList.length;i++){
							data.resData.upRateList[i].checkImg = 0;
						}
						this.isUpRateIsAll = res.body.resData.isUpRateIsAll;

						this.upRateList = data.resData.upRateList;
					}

				},this.transmit,1)
			},
			loadTop(){
				var that = this;
				var timer = setTimeout(function(){
					that.getData();
					that.$refs.loadmore.onTopLoaded();
					clearTimeout(timer)
				},1500)
			},

			activeLi(item,name){		//点击列表
				
				if(!item.useable){
					Toast({
					  message: item.useWarn,
					  position: 'bottom',
					  duration: 4000
					});
					return;
				}
				if(item.useable){
					this.delCookie('unsedPacket');
					this.delCookie('unsedVipPacket');
					
					if(this.redItems.redItem != item){
						this.redItems.redItem.checkImg = 0;
						item.checkImg = 1;
						this.redItems.redItem = item;
						this.upAprShow = 1;
					}else{
						item.checkImg = 1;
						this.redItems.redItem = item;
						this.upAprShow = 1;
					}
				}

				// 最小金额
				if(this.redItems.redItem.limitUpMoneyNumb == 0) this.aprMoney = this.useMoney;
				else if(parseInt(this.useMoney) > this.redItems.redItem.limitUpMoneyNumb) this.aprMoney = this.redItems.redItem.limitUpMoneyNumb;
				else this.aprMoney = parseInt(this.useMoney);
				console.log(this.aprMoney)
				//最小天数
				if(this.redItems.redItem.limitUptimeNumb == 0) this.aprDay = this.$route.query.borrowDay;
				else if(parseInt(this.$route.query.borrowDay) > this.redItems.redItem.limitUptimeNumb) this.aprDay = this.redItems.redItem.limitUptimeNumb;
				else this.aprDay = parseInt(this.$route.query.borrowDay);
				console.log(this.aprDay)
				//加息金额
				this.upAprEarnings = ((this.aprMoney * this.redItems.redItem.upApr) * this.aprDay * 0.01)/360;
				this.upAprEarnings.toFixed(2);
				console.log(this.upAprEarnings)


				this.redItems.redItem.upAprEarnings = this.upAprEarnings
				this.redItems.redItem.uuid = this.$route.query.uuid

				this.setCookie('vipUpApr',this.redItems.redItem.upApr);
				this.setCookie('vipUpAprId',this.redItems.redItem.id);
				this.setCookie('vipUpAprEarnings',this.upAprEarnings);
				this.setCookie('limitUpMoneyNumb',this.redItems.redItem.limitUpMoneyNumb);
				//返回上一页跳转
				this.$router.go(-1)
				// this.$router.replace({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:this.$route.query.uuid}})
			},

			//不使用优惠券
			unsedRedPacket(){
				this.delCookie('vipUpApr');
				this.delCookie('vipUpAprId');
				this.delCookie('vipUpAprEarnings');
				this.delCookie('limitUpMoneyNumb');

				this.setCookie('unsedVipPacket',1)
				this.$router.replace({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:this.$route.query.uuid}})	
				// this.upRateList = [];
			},
		},
		activated(){
			this.useMoney = this.$route.query.useMoney;

			if(this.hrefData.useMoney != this.$route.query.useMoney || this.getCookie('unsedVipPacket')){
				this.hrefData = this.$route.query;
				this.transmit.investAccount = this.hrefData.useMoney;
				this.transmit.planId = this.hrefData.uuid;
				this.getData();
				this.redItems.redItem = {}
			}
			
		},
		created(){
			this.assetManageType = this.$route.query.assetManageType;
			this.hrefData = this.$route.query;
			this.transmit.investAccount = this.hrefData.useMoney;
			this.transmit.planId = this.hrefData.uuid;
			this.getData();
			
		}
	}
</script>
<style lang="scss" scoped>
	.packet_data{
		position: relative;
		.nothing{
			width: 100%;
			height: 1.333333rem;
			position: relative;
		}
		.isCheck{
			height:0.666667rem;
			width:0.666667rem;
			position:absolute;
			top:0.4rem;
			right:0.266667rem;
		}
		.unsed{
			width: 100%;
			height: 1.333333rem;
			position: fixed;
			text-align: center;
			line-height: 1.333333rem;
			font-size: 0.4rem;
			color: #808080;
			background: #FFFFFF;
			box-shadow: 0 0 16px 0 rgba(0,0,0,0.18);
			left: 0;
			bottom: 0;
		}
	}
	.red3{
		ul.list{margin-top: 0.266667rem;padding-bottom: 0.1rem;}
		ul.list li.unable{
			background: #fff url(https://aliyunsso.edspay.com/web/wx/resultIcons/packetrt_off.png) no-repeat;
			background-size: 100% 100%!important;
		}
		ul.list li{
			background: #fff url(https://aliyunsso.edspay.com/web/wx/resultIcons/packetrt_on.png) no-repeat;
			background-size: 100% 100%!important;
			height:3.0rem;
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
				left:0.266667rem;
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
				color:#ffffff;
				width:2.7rem;
				.money{
					// padding-top:0.186667rem;
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
				.text{
					padding-top: 0.466667rem;
					font-size: 0.32rem;
				}
				.text1{
					padding-top: 0rem;
					width: 1.6rem;
					height: 0.453333rem;
					border-radius: 0.226667rem;
					border: 1px solid #ffffff;
					text-align: center;
					margin: 0 auto;
					line-height: 0.453333rem;
				}
			}
			.hasGray{
				color:#ffffff;
			}
			.content{
				height:3.013333rem;
				width:6.1rem;
				padding-left:0.65rem;
				position: relative;
				background-size:2.506667rem 2.4rem!important;
				.name{
					width:93%;
					font-size:0.4rem;
					color: #333333;
					line-height:0.533333rem;
					padding: 0.33rem 0 0.32rem 0;
					overflow: hidden;
					text-align: justify;
				}
				.text{
					font-size:0.32rem;
					line-height:0.44rem;
					color:#808080;
				}
				.text1{
					margin-bottom: .32rem;
				}
				// .expiredTime{
				// 	position:absolute;
				// 	top:1.76rem;	
				// }
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
			height:1.6rem;
			width:100%;
			line-height:1.166667rem;
			padding-left:0.4rem;
			padding-top: 0.16rem;
			color:#666;
			position:fixed;
			bottom:0;
			background:#fff;
			.left{
				float: left;
				p{
					color:#333;
					font-size:0.32rem;
					line-height:0.6rem;
					em{
						color:#FF5B4C;
					}
				}
			}
			span{
				height:0.96rem;
				width:2.186667rem;
				text-align:center;
				margin:0.1rem 0.4rem;
				background:#ff5a4a;
				border-radius:0.106667rem;
				line-height:0.96rem;
				color:#fff;
				padding: 0 0.133333rem;
				float:right;
			}
		}
	}
</style>