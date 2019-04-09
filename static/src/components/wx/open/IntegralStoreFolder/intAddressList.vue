<template>
	<div class="address_list">
		<title v-if="$route.query._type == 3" v-title>收货地址</title>
		<title v-else v-title>请选择收货地址</title>
		<div class="nothing" v-if="addressList.length != 0"></div>
		<mt-loadmore v-if="addressList.length != 0" class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul>
				<li v-for="(item,index) in addressList">
					<div class="main_info" @click="checkAddress(item.addressId, index)">
						<div class="check" :class="{active:index == addressIndex}"></div>
						<div class="item">
							<p><span class="span1">{{item.realName}}<em></em>{{item.mobilePhone}}</span></p>
							<p class="contain">收货地址：{{item.fullAddress}}</p>
						</div>
						
					</div>
					<div class="modify_btn clear">
						<div class="default fl">
							<div v-if="item.isDefault == 0" class="uncheck_img" @click="setDefault(item,index)">
								<img src="https://aliyunsso.edspay.com/web/wx/integralStroe/nocheck.png" alt="">设置为默认地址
							</div>
							<div class="default_img" v-else-if="item.isDefault == 1">默认地址</div>
						</div>
						<div class="fl btns clear">
							<div class="btn_set editor" @click="toWxUrl('/intEditAddress','addressId',item.addressId)"><i class="iconfont">&#xe61c;</i>编辑</div>
							<div class="btn_set dele" @click="delAddress(item.addressId)"><i class="iconfont">&#xe6c4;</i>删除</div>
						</div>
					</div>
				</li>
			</ul>
		</mt-loadmore>
		<div class="none" v-if="addressList.length != 0"></div>
		<wx-null v-else-if="isGetData" :imgSrc="'https://aliyunsso.edspay.com/web/wx/integralStroe/none.png'" :text="'请认真添加有效收货地址'" :linkUrl="'/intAddress'" :smallText="smallText" :type="1"></wx-null>
		<div class="add_address">
			<div class="add_btn" @click="goAddr">添加收货地址</div>
		</div>
		<card-diallog v-if="dele.isShow" :showThis="dele" :btn="1" :confirm="toDele" :btnText="cardBtn" :text="'确定要删除此收货地址吗？'"></card-diallog>
	</div>
</template>
<script>
	import wxNull from './null';//空状态
	import wxToapp from '../../../../common/wx/wxToapp';
	import cardDiallog from '../../../public/wx/wxPublicDialog';//公用弹框
	export default {
		mixins:[wxToapp],
		data(){
			return{
				addressIndex:-1,
				pageNum:1,
				pages:1,
				allLoaded:false,
				autoFill:false,
				smallText:'为保障您的商品准确、快速送达您的手中。',
				loginStatus:0,
				addressList:[],//地址列表数据
				cheak:{
					isCheak:false
				},
				type:'',//判断来页
				source:'',//点解地址判断来源页
				isGetData:false,//控制空状态
				dele:{ //删除弹框
					isShow:false
				},
				cardBtn:['取消','确定'],
				deleOption:'',//删除项Id
				backQuery:{//选好地址返回来源页传参数
					addressId:''
				},
			}
		},
		methods:{
			//设置默认地址
			setDefault(item,index){
				for(var i=0; i<this.addressList.length; i++){
					this.addressList[i].isDefault = 0
				}
				this.addressList[index].isDefault = 1
				//访问接口
				this.setAddress(item.addressId,4)

			},

			//选择当前地址
			checkAddress(addrId, j){
				if(addrId){
					this.backQuery.addressId = addrId
				}
				this.addressIndex = j;
				setTimeout(() => {
					if(this.source == '1'){
						// this.appRouter('/intGoodDetail',this.backQuery,1)
						this.setCookie('addressId',addrId)
						this.$router.go(-1)
					}else if(this.$route.query._type == '2'){    // 翻牌奖励收获地址
						this.getAppData('/address/orderAddress',(data) =>{
							if(data.resCode){
								this.$router.go(-1)
							}
						},{addressId:addrId,orderId:this.$route.query.orderId});
					}else if (this.$route.query._type == '3') {   // 口令福袋
						this.getAppData('/address/dealOrderAddress',(data) =>{
							if(data.resCode){
								this.$router.go(-1)
							}
						},{addressId:addrId,orderId:this.$route.query.orderId});
					}else if (this.$route.query.source == 'fest') {   // 节日活动模板2 
						this.appRouter('/festMain2/index',{addrId:addrId,festId:this.$route.query.festId})
						this.setCookie('festShow',1)
					}else{
						return;
					}
				}, 300);
			},

			//删除地址
			delAddress(addrId){
				this.dele.isShow = true
				this.deleOption = addrId
			},
			toDele(){
				this.dele.isShow = false
				this.getAppData('/address/edit',(data) =>{
					if(data.resCode == 1){
						this.getAddressData(this.pageNum);
						if(this.$route.query.addressId){
							if(this.$route.query.addressId == this.deleOption){
								this.delCookie('addressId')
							}
						}
					}
				},{addressId:this.deleOption,editType:2,type:this.type})
			},
			//跳转添加地址
			goAddr(){
				this.$route.query._type = 1;
				this.appRouter('/intAddress',{thisUrl:this.$route.fullPath})
			},

			//地址列表
			getAddressData(num){
				this.getAppData('/address/table',(data) =>{
					if(data.resCode == 1){
						this.isGetData = true;
						if (num == 1){
							this.pages = data.resData.userAddressPageInfo.pages;
							this.addressList = data.resData.userAddressPageInfo.list;
						} else {
							this.addressList = this.addressList.concat(data.resData.userAddressPageInfo.list);
						}

						
					}
				},{pageSize:10,pageNum:num})
			},

			//地址相关操作请求
			setAddress(addrId,edType){
				this.getAppData('/address/edit',(data) =>{
					if(data.resCode == 1){
					}
				},{addressId:addrId,editType:edType,type:this.type})
			},

			//上拉加载
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				this.allLoaded = true;
				var timer = setTimeout(function(){
					if(that.pages >= that.pageNum){
						that.getAddressData(that.pageNum);
						that.allLoaded = false;
					}
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},500)
			},
		},
		components:{
			wxNull,
			cardDiallog
		},
		mounted() {
			//给app传值标题名
			this.PassValue('NavWhite_'+(this.$route.query._type == 3 ? '收货地址' : '请选择收货地址'));
	    },
		created(){
			this.type = this.$route.query._type;
			this.source = this.$route.query.source
			console.log(this.type)
			this.getAddressData(this.pageNum)
			if(this.$route.query.addressId){
				this.setCookie('addressId',this.$route.query.addressId)
			}
			

		}
	}
</script>
<style lang="scss" scoped>
	.address_list{
		font-family: PingFangSC-Regular;
		.nothing{
			height: .266667rem;
			width: 100%;
		}
		.none{
			width: 100%;
			height: 1.6rem;
		}
		ul{
			width: 100%;
			li{
				margin-bottom: 0.266667rem;
				background: #ffffff;
				// height: 3.2rem;
				.main_info{
					padding: .266667rem .4rem;
					// height: 2.2rem;
					display: flex;
					justify-content: space-around;
					position: relative;
					.check{
						width: .4rem;
						height: .4rem;
						border: 1px solid #FF4941;
						border-radius: .053333rem;
						align-self: center;
					}
					.check.active{
						width: .42rem;
    					height: .42rem;
						background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/addressCheck.png) no-repeat center center;
						background-size: 0.4rem 0.4rem;
						border:none;
					}
					p{
						margin-bottom: .133333rem;
						span{
							font-size: 0.373333rem;
							color: #333333;
							line-height: .533333rem;
							em{
								margin: 0 .08rem;
							}
						}
						// .span2{
						// 	display: inline-block;
						// 	font-size: 0.373333rem;
						// 	color: #808080;
						// 	float: right;
						// }
					}
					p.contain{
						width: 8.133333rem;
						font-size: 0.32rem;
						color: #808080;
						line-height: .506667rem;
						max-height: 1.013333rem;
						display: -webkit-box;
						-webkit-box-orient: vertical;
						-webkit-line-clamp: 2;
						overflow: hidden;
					}
				}
				.modify_btn{
					height: 1rem;
					border-top: 1px dashed #e5e5e5;
					padding: 0 0.4rem;
					.default{
						display: flex;
						width: 50%;
						height: 100%;
						line-height: 0.933333rem;
						font-size: 0.32rem;
						color: #808080;
						padding-left: .9rem;
						.uncheck_img img{
							width: .4rem;
							height: 0.4rem;
							display: inline-block;
							position: relative;
							// top: -0.306667rem;
							margin-right: .133333rem;
						}
						.default_img{
							width: 1.546667rem;
							height: .44rem;
							position: relative;
							text-align: center;
							line-height: .44rem;
							background: #F14B4B;
							border-radius: .066667rem;
							font-size: .293333rem;
							color: #FFFFFF;
							align-self: center;
						}
					}
					.btns{
						width: 50%;
						// padding-top: 0.133333rem;
						.btn_set{
							line-height: 1rem;
							font-size: .32rem;
							color: #808080;
							float: right;
							margin-left: .533333rem;
							i{
								margin-right: .066667rem;
								vertical-align: middle;
							}
						}
					}
				}
			}
		}
		.add_address{
			width: 100%;
			height: 1.6rem;
			background: #FFFFFF;
			box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
			position: fixed;
			left: 0;
			bottom: 0;
			padding-top: 0.266667rem;
			.add_btn{
				width: 8.933333rem;
				height: 1.066667rem;
				background: #F14B4B;
				border-radius: 0.5rem;
				text-align: center;
				line-height:1.066667rem;
				font-size: 0.426667rem;
				color: #FFFFFF;
				margin: 0 auto;
			}
		}
	}
</style>