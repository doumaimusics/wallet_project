<template>
	<div id="unbind">
		<div v-title>{{logoMsg}}</div>
		<div class="addCard" v-if="0">
			<router-link to="/wxMyAccount/wxBindingCard" class="content" tag="div">
				<span>+</span>添加银行卡
			</router-link>
		</div>
		<div>
			<wx-tab :tabList="titleList" v-if="generalSw == 1 && sinaTotalMoney != 0"></wx-tab>
			<mt-tab-container v-model="titleList.selected" :swipeable="true">
			    <mt-tab-container-item id="tab-container1">
				  	<wx-child :cardList="0" :dataUrl="cardUrl[1]" :flag="flag[1]"></wx-child>
			    </mt-tab-container-item>
				<mt-tab-container-item id="tab-container2" v-if="generalSw == 1 && sinaTotalMoney != 0">
					<wx-child :cardList="cardList" :dataUrl="cardUrl[0]" :flag="flag[0]" :showThis="showlayer" :isReal="isReal"></wx-child>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<div id="layer" v-if="showlayer.isShow">
			<div class="content">
				<div class="title">温馨提示</div>
				
				<p>您尚未进行实名认证</p>
				<div class="btns">
					<span @click="rollback">取消</span>
					<span @click="goReal">去认证</span>
				</div>
			</div>
		</div>	
	</div>
</template>

<script>
	import wxTab from '../../../public/wx/wxTab';
	import wxChild from './wxMyCardChild';
	import { MessageBox } from 'mint-ui';
	import { TabContainer, TabContainerItem } from 'mint-ui';
	export default {
		data(){
			return {
				logoMsg:'银行卡',
				name:'我的银行',
				cardId:'3734借记卡',
				flag:[1,2],
				zsOpenStatus:null,	//是否开通存管
				bkOpenStatus:0,//是否开通新浪、浙商
				cardList:[],
				massageCode:'',
				showlayer:{isShow:false}, 	//显示弹框
				isReal:true,	//是否实名
				ticket:'',	//后续推送需要的参数
				isopen:false,	//是否开通存管
				generalSw:0,//判断新浪是否展示
				cardUrl:[
					'/account/banklist',
					'/account/zsbanklist',
				],
				titleList:{
					list:[
						{
							tabId:'tab-container1',
							text:'存管账户'
						},
						{
							tabId:'tab-container2',
							text:'普通账户'
						},
					],
					selected:'tab-container1'
				},
			}
		},
		methods:{
			rollback(){
				this.showlayer.isShow = false;
			},
			goReal(){
				this.showlayer.isShow = false;
				this.$router.push({path:'/wxMyAccount/wxRealname',query:{thisUrl:this.$route.fullPath}})
			}
		},
		components:{
			wxChild,
			wxTab
		},
		mounted(){
            if(this.$route.query.num == 1){
				this.titleList.selected = 'tab-container2';
				MessageBox.confirm('您需要在新浪账户添加银行卡，才可以提现。','温馨提示', { 
					closeOnClickModal: false,
					confirmButtonText: '去添加'
				}).then(action => { 
					this.$router.push('/wxMyAccount/wxBindingCard');	//新浪绑卡路由
				}, action => { 
				
				})
			}
		},
		created(){
			this.zsOpenStatus = this.getCookie('zsOpenStatus');
			this.bkOpenStatus = this.getCookie('bkOpenStatus');
			this.generalSw = this.getCookie('generalSw');
			this.sinaTotalMoney = this.getCookie('sinaTotalMoney');   // 普通账户总资产是否为0 
			this.postData('/account/securityInfo',(res) => {
				if(res.body.resCode){
					if(res.body.resData.model.realnameStatus == 0){
						this.showlayer.isShow = 0;
						this.isReal = false;
					}
				}
			},{},1)
		}
	}
</script>

<style lang="scss" scoped>

	#unbind{
		.addCard{
			height:2.533333rem;
			background:#fff;
			padding-top:0.533333rem;
			.content{
				margin: 0 auto;
				text-align:center;
				line-height:1.413333rem;
				height:1.466667rem;
				width:9.2rem;
				border:1px solid  #dddddd;
				border-radius:0.16rem;
				font-size:0.373333rem;
				color:#999;
				span{
					font-size:0.56rem;
					margin:0.133333rem 0.106667rem;
				}
			}
		}
		.cardList{
			background:#fff;
			padding:0.133333rem 0.4rem 0.533333rem;
			li{
				height:2.8rem;
				width:9.2rem;
				background:url(https://aliyunsso.edspay.com/web/wx/account/cardBg.png) no-repeat;
				background-size: 100% 100%;
				margin-top:0.4rem;
				img{
					float: left;
					height:0.533333rem;
					width:0.533333rem;
					margin:0.666667rem 0.546667rem 0;
				}
				.content{
					float: left;
					color:#fff;
					padding-top:0.4rem;
					font-size:0.373333rem;
					line-height:0.533333rem;
					.name{
						font-size:0.373333rem;
						line-height:0.533333rem;
					}
					.type{
						font-size:0.32rem;
						line-height:0.44rem;
						padding:0.08rem 0 0.426667rem;
					}
					.cardId{
						span{
							padding-right:1.066667rem;
						}
						span:last-child{
							padding:0;
						}
					}
				}
			}
		}
		p{font-size:0.293333rem;color:#a3a3a4;text-align:center;padding-top: 0.4rem;}
	}
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		top:0;
		z-index:999;
		p{
			padding-bottom:0.4rem;
		}
		.content{
			box-sizing:border-box;
			padding-bottom:  0.64rem;
			position:absolute;
			top:45%;
			left:50%;
			margin:-2.8rem 0 0 -3.8rem;
			width:7.493333rem;
			border-radius:0.266667rem;
			background:#fff;
			font-size:0.373333rem;
			line-height:0.533333rem;
			.title{
				border-top-right-radius: 0.266667rem;
				border-top-left-radius: 0.266667rem;
				height:1.2rem;
				line-height:1.2rem;
				text-align:center;
				color:#333;
				background:#f3f3f3;
				font-size: 0.4rem;
			}
		}
		.btns{
			padding:0 0.4133rem 0.506667rem;
			span{
				float:left;
				height:0.96rem;
				width:2.986667rem;
				font-size: 0.426667rem;
				line-height:0.96rem;
				text-align:center;
				color:#ff5b4c;
				border:1px solid #ff5b4c;
				border-radius:0.106667rem;
			}
			span:last-child{
				float:right;
				background:#ff5b4c;
				color:#fff;
			}
		}
	}
	#recharge{
		input{
			display: block;
			width:6.52rem;
			height:1.146667rem;
			border-radius:0.106667rem;
			border:1px solid #c8c7cc;
			position:relative;
			font-size:0.373333rem;
			margin: .3rem 0.413333rem .6rem;
			padding:0 .4rem;
		}
		.btns{
			padding:0 0.4133rem 0.506667rem;
			span{
				float:left;
				height:0.96rem;
				width:2.986667rem;
				font-size: 0.426667rem;
				line-height:0.96rem;
				text-align:center;
				color:#ff5b4c;
				border:1px solid #ff5b4c;
				border-radius:0.106667rem;
			}
			span:last-child{
				float:right;
				background:#ff5b4c;
				color:#fff;
			}
		}
	}
	
</style>