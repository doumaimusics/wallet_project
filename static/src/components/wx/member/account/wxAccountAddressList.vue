<template>
	<div class="address_list">
		<title v-title>收货地址</title>
		<div class="nothing" v-if="addressList.length != 0"></div>
		<mt-loadmore v-if="addressList.length != 0" class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul>
				<li v-for="(item,index) in addressList">
					<div class="main_info">
						<p><span class="span1">收件人：{{item.realName}}</span><span class="span2">{{item.mobilePhone}}</span></p>
						<p class="contain">收货地址：{{item.fullAddress}}</p>
					</div>
					<div class="modify_btn clear">
						<div class="default fl">
							<div class="default_img" v-if="item.isDefault == 1"><img src="https://aliyunsso.edspay.com/web/wx/integralStroe/default_ico.png" alt=""></div>
						</div>
						<div class="fl btns clear">
							<div class="btn_set dele" @click="delAddress(item.addressId)">删除</div>
							<div class="btn_set editor" @click="toWxUrl('/intEditAddress','addressId',item.addressId,'_type',1)">编辑</div>
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
	import wxNull from '../../open/IntegralStoreFolder/null';//空状态
	import wxToapp from '../../../../common/wx/wxToapp';
	import cardDiallog from '../../../public/wx/wxPublicDialog';//公用弹框
	export default {
		mixins:[wxToapp],
		data(){
			return{
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
					}
				},{addressId:this.deleOption,editType:2,type:1})
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
				},{addressId:addrId,editType:edType,type:1})
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
		created(){
			this.getAddressData(this.pageNum)
		}
	}
</script>
<style lang="scss" scoped>
	.address_list{
		font-family: PingFangSC-Regular;
		.nothing{
			height: 0.266667rem;
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
				.main_info{
					padding: 0.333333rem 0.4rem;
					p{
						margin-bottom: 0.266667rem;
						.span1{
							font-size: 0.373333rem;
							color: #333333;
						}
						.span2{
							display: inline-block;
							font-size: 0.373333rem;
							color: #808080;
							float: right;
						}
					}
					p.contain{
						font-size: 0.32rem;
						color: #808080;
						line-height: .55rem;
					}
				}
				.modify_btn{
					height: 0.933333rem;
					border-top: 1px dashed #e5e5e5;
					padding: 0 0.4rem;
					.default{
						width: 50%;
						height: 100%;
						line-height: 0.933333rem;
						font-size: 0.32rem;
						color: #808080;
						.uncheck_img img{
							width: 0.533333rem;
							height: 0.533333rem;
							display: inline-block;
							position: relative;
							top: -.06rem;
							margin-right: 0.266667rem;
						}
						.default_img img{
							width: 1.44rem;
							height: 0.4rem;
							position: relative;
						}
					}
					.btns{
						width: 50%;
						padding-top: 0.133333rem;
						.btn_set{
							width: 1.866667rem;
							height: 0.666667rem;
							text-align: center;
							line-height: 0.666667rem;
							border: 1px solid #808080;
							border-radius: 4px;
							font-size: 0.346667rem;
							color: #808080;
							float: right;

						}
						.btn_set{
							margin-left: 0.266667rem;
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