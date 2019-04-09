<template>
	<div>
		<div class="red1" style="padding: 0 0 1.3rem 0;">
	     	<ul class="list" v-if="dataList.length != 0">
	     		<li v-for="item in dataList" @click="activeLi(item,'amount')" class="clear" :class="{unable:!item.useable}">
	     			<img v-if="item.useable" class="isCheck" :src="isCheck[item.checkImg]" alt="">
	     			<div :class="{isGary:!item.useable}" class="title fr">
	     				<div class="text">{{item.limitInvertMoney}}</div>
	     				<div class="money">¥<span>{{item.amount}}</span></div>
	     			</div>
	     			<div class="content fr" :style="{background:'url('+redBg[item.status]+') 4.346667rem 0.666667rem no-repeat'}">
	     				<div class="name hidden">{{item.name}}</div>
	     				<p v-if="item.limitMouthTime != '无限制' && item.status == 0 && item.useable">{{item.limitMouthTime}}</p>
	     				<p v-else-if="item.limitMouthTime != '无限制'">{{item.limitMouthTime}}</p>
	     				<div class="text">有效期至：{{item.expiredTime}}</div>
	     			</div>
	     		</li>
	     	</ul>
	     	<account-null v-else-if="isgetData" :img="'https://aliyunsso.edspay.com/web/wxUpdate/money_null.png'" :text="'您没有可用红包'"></account-null>
		</div>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	import accountNull from '../account/wxNull'
	export default {
		props:['dataList','useMoney','redItems','isRedIsAll','isgetData'],
		data(){
			return {
				clickFlag:true,
				thisList:'',
				showList:false,	//显示列表
				status:null,
				redItem:{},		//被点击的红包
				total:0,	//总数
				isGary:false,	//是否置灰
				redBg:[],
				isCheck:[
					'https://aliyunsso.edspay.com/web/wx/invest/notCheck.png',
					'https://aliyunsso.edspay.com/web/wx/resultIcons/isCheck.png'
				],
				dataUrl:['/red/envelope/tenderList','/uprate/list','/experience/list'],
				transmit:{
					pageNum:1,
					pageSize:10,
					status:0,
				},	//发送请求要传递的参数
				assetManageType:'',
			}
		},
		methods:{
			activeLi(item,name){		//点击列表
				
				// if(this.isRedIsAll){
				// 	Toast({
				// 	  message: this.isRedIsAll,
				// 	  position: 'bottom',
				// 	  duration: 4000
				// 	});
				// 	return
				// }else{
				// 	this.delCookie('unsedPacket');
				// 	if(this.getCookie('upApr')){
				// 		this.delCookie('upApr');
				// 		this.delCookie('upAprId');
				// 		this.delCookie('upAprEarnings');
				// 		Toast({
				// 		  message: '红包与加息券不可同时使用！',
				// 		  position: 'middle',
				// 		  duration: 4000
				// 		});
				// 	}
				// }
				if(!item.useable){
					Toast({
					  message: item.useWarn,
					  position: 'bottom',
					  duration: 4000
					});
					return
				}
				if(item.useable){
					this.delCookie('unsedPacket');
					if(this.getCookie('upApr')){
						this.delCookie('upApr');
						this.delCookie('upAprId');
						this.delCookie('upAprEarnings');
						Toast({
						  message: '红包与加息券不可同时使用！',
						  position: 'middle',
						  duration: 4000
						});
					}
					if(this.redItems.redItem != item){
						this.redItems.redItem.checkImg = 0;
						item.checkImg = 1;
						this.redItems.redItem = item;
						this.redMoney = this.redItems.redItem[name];
					}else{
						item.checkImg = 1;
						this.redItems.redItem = item;
						this.redMoney = this.redItems.redItem[name];
					}
				}
				this.redItems.redItem.uuid = this.$route.query.uuid;
				this.setCookie('amount',this.redItems.redItem.amount);
				this.setCookie('type',this.redItems.redItem.type)
				this.setCookie('redId',this.redItems.redItem.id)
				//返回上一页跳转
				this.$router.go(-1)
				// this.$router.replace({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:this.$route.query.uuid}})
			},
			goInvest(){
				if (this.assetManageType ==3) {
					this.$router.replace({path:'/wxInvestIn/wxInvestMoneyPoint',query:{redMoney:this.redItems.redItem.amount,redId:this.redItems.redItem.id,uuid:this.transmit.uuid,redFlag:1}})
				} else {
					this.$router.replace({path:'/wxInvestIn',query:{redMoney:this.redItems.redItem.amount,redId:this.redItems.redItem.id,uuid:this.transmit.uuid,redFlag:1}})
				}
			},
		},
		components:{
			accountNull
		},
		activated(){
			if(this.useMoney != this.$route.query.useMoney){
				this.redItems.redItem = {};
			}
		},
		created(){
			this.assetManageType = this.$route.query.assetManageType;
			this.redItems.redItem = {};
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
	ul.list{margin-top: 0.266667rem;padding-bottom: 0.1rem;}
	ul.list li.unable{
		background: #fff url(https://aliyunsso.edspay.com/web/wx/resultIcons/packetrt_off.png) no-repeat;
		background-size: 100% 100%!important;
	}
	ul.list li{
		// background: #fff url(https://aliyunsso.edspay.com/web/wx/account/redBg.png) no-repeat;
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
			top:0.4rem;
			left:0.266667rem;
		}
		.img{
			position:absolute;
			height:0.533333rem;
			width:2.5rem;
			top:0.213333rem;
			left:-0.08rem;
			//overflow: hidden;
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
				padding-top:0.186667rem;
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
			.text{
				padding-top: 0.466667rem;
				font-size: 0.32rem;
			}
		}
		.isGary{
			color:#ffffff;
		}
		.content{
			height:3.013333rem;
			width:6.1rem;
			padding-left: 0.65rem;
			position: relative;
			background-size:2.506667rem 2.4rem!important;
			p{
				font-size: 0.32rem;
				color: #808080;
				margin-bottom: .55rem;
			}
			.name{
				width:93%;
				font-size: 0.4rem;
				color: #333333;
				line-height:0.533333rem;
				padding: 0.4rem 0;
			}
			.text{
				font-size:0.32rem;
				line-height:0.44rem;
				color:#afafaf;
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