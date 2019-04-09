<template>
	<div v-if="showCentent">
		<div v-if="cardList.length != 0">
			<!-- 存管卡 -->
			<div v-if="flag == 2">
				<ul class="zsCardList">
					<li v-for="item in cardList">
						<div class="cards_title clear">
							<div class="img1"><img :src="item.logoPicUrl" alt=""></div>
							<div class="name">{{item.bankName}}</div>
							<router-link to="/wxOpenBank" class="limit_info" tag="div">限额说明</router-link>
						</div>
						<div class="card_info"><span>姓名</span>{{item.realName}}</div>
						<div class="card_info"><span>银行账号</span>{{item.hiddenCardNumber}}</div>
					</li>
					<p class="change_tips">更换银行卡之前，请确认账户总资产为0</p>
				</ul>
				<div class="modify_info">
					<div @click="changeCard" class="clear bdr-b">
						<h4 class="fl">修改银行卡</h4>
					</div>
					<router-link to="/wxMyAccount/wxAmendPhone" tag="div" class="clear">
						<h4 class="fl">修改预留手机号</h4>
					</router-link>
				</div>
				<p class="zs_tips"><span></span>如有疑问，请前往 <router-link to="/wxMyAccount/wxHelpCenters" tag="i">帮助中心</router-link></p>
			</div>

			<!-- 新浪卡 -->
			<ul class="cardList" v-else>
				<li v-for="item in cardList" @click="unbind(item)">
					<div v-if="flag == 1 && item.canBeDisabled == true" @click="amend" class="amend">解绑</div>
					<div class="img">
						<img :src="item.logoPicUrl" alt="">
					</div>
					<div class="content">
						<div class="name">
							{{item.bankName}}
							<div v-if="!item.canBeDisabled && flag == 1" class="safety">
								<img class="ic_2" src="https://aliyunsso.edspay.com/web/wx/account/amend/safe.png" alt="">
								安全卡
							</div>
						</div>
						<div class="type">{{item.cardType}}储蓄卡</div>
						<div class="cardId">
							<span>****</span>
							<span>****</span>
							<span>****</span>
							<span class="ic_2">{{item.hiddenCardNumber}}</span>
						</div>
					</div>
				</li>
			</ul>
			<!-- <p>您成功绑定银行卡，如需帮助请联系客服</p> -->
			<div v-if="flag ==1" class="tips">
				<p>温馨提示：</p>
				<p><span>1.</span>若您需要更换银行卡，请解绑当前银行卡后，再绑定新的银行卡。</p>
				<p><span>2.</span>若您当前的银行卡为”安全卡“，需保证普通账户的可用余额为0后才能解绑。</p>
			</div>
		</div>
		<div class="addCard" v-else>
			<div v-if="flag ==2" @click="addCard" class="content">
				<span>+</span>添加银行卡
			</div>
			<div class="nocard-div">
				<img src="https://aliyunsso.edspay.com/web/wxUpdate/bankcard_null.png"/>
				<p>您的银行卡列表为空</p>
			</div>
		</div>
		<div id="layer" v-if="showlayer">
			<div v-if='flag == 1' class="content">
				<div @click="getCode" class="btn">解除绑定</div>
				<div class="btn" @click="showlayer = false">取消</div>
			</div>
			<div v-if='flag == 2' class="content2">
				<ul>
					<li @click="changeCard" class="bdr-b">修改存管银行卡</li>
					<router-link to="/wxMyAccount/wxAmendPhone" tag="li">修改预留手机号</router-link>
				</ul>
				<div class="btn" @click="showlayer = false">取消</div>
			</div>
		</div>
		<popup-message v-if="showMessage.getMessage" :again="getCode" :showMessage="showMessage" :confirm="confirm" :code="code" :flag="1" :logo="'解绑验证码'"></popup-message>
		<wx-authorize v-if='showZs.isShow' :showThis="showZs" :btn="1" :text="authorizeText" :btnText="btnTexts" :confirmBtn="confirmBtn"></wx-authorize>
	</div>
</template>

<script>
	import { Indicator } from 'mint-ui';    //引入加载中组件
	import { MessageBox } from 'mint-ui';		//弹框
	import popupMessage from '../invest/popupMessage';
	import wxAuthorize from '../invest/wxPublicDialog'; //授权弹框
	import verify from '../../../../common/wx/verification';	//引入表单验证
	export default {
		mixins:[verify],
		data(){
			return {
				showCentent:false,
				showlayer:false,
				cardList:[],
				activeItem:{},
				showMessage:{
					getMessage:false	//显示填写验证码弹框
				},
				code:{
					msgCode:'',	//短信验证码
				},	
				ticket:'',	//解绑下一步字段
				showZs:{
					isShow:false
				},//开通存管提醒
				authorizeText:'您尚未开通存管账户，请先开通',
				btnTexts:['取消','去开通'],
				mobilePhone:'',//手机号码
			}
		},
		props:['notice','flag','titleList','dataUrl','isReal','showThis','bankOpenStatus'],
		methods:{
			changeCard(){
				this.showlayer = false;
				this.postData('/toChangeAccount',(res,data)=>{
					if(data.resCode){
						if(data.resData.status == 1){this.$router.push('/wxMyAccount/wxAmendCard')}
						else if(data.resData.status == 2){this.$router.push({path:'/wxMyAccount/wxFailureAudit',query:{bankId:data.resData.bankNo,cause:data.resData.msg}})}
						else if(data.resData.status == 0){this.$router.push({path:'/wxMyAccount/wxAmendCheck',query:{bankNo:data.resData.bankNo,type:5}})}
					}
				},{})
			},
			amend(){
				
			},
			confirmBtn(){
				this.$router.push({path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}});
			},
			addCard(){
				if(this.flag == 2){
					// this.$router.push({path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}});
					this.showZs.isShow = true 

				}else if(this.flag == 1) {
					// MessageBox({
					// 	title: '',
					// 	message: '响应合规备案要求，平台将全面迁移到浙商存管账户。普通账户已停止开户。',
					// 	showCancelButton: false,
					// 	showConfirmButton: true,
					// });
					this.$router.push('/wxMyAccount/wxBindingCard');	//新浪绑卡路由wxMyCard
				}
			},
			getCode(){		//获取短信验证码
				var that = this;
				that.showlayer = false;
				this.postData('/account/disableBank',function(res){
					if(res.body.resCode){
						that.showMessage.getMessage = true;
						that.ticket = res.body.resData.ticket
					}
				},{bankNo:this.activeItem.cardNumber},1)

				this.showMessage.getMessage = false
			},
			confirm(){		//发送解绑请求
				var that = this;
				that.showMessage.getMessage = false;
				this.postData('/account/disableBankAdvance',function(res,data){
					if(res.body.resCode){
						that.getBank();
						that.$router.push('/wxMyAccount/wxmycard');
						that.toast({text:'解绑成功'})
					}else{
						that.toast({text:data.resMsg})
						that.$router.push('/wxMyAccount/wxmycard');
					}
				},{ticket:this.ticket,validCode:this.code.msgCode,bankNo:this.activeItem.cardNumber})
			},
			unbind(item){
				this.activeItem = item;

				/*if(!this.activeItem.canBeDisabled) this.toast({text:'该银行卡为安全卡，无法解绑。'})
				else this.showlayer = true;*/
				if(this.flag == 1 && item.canBeDisabled == false){
					this.showlayer = false;
				}else{
					this.showlayer = true;
				}
			},
			getBank(){
				var that = this;
				this.postData(this.dataUrl,function(res){
					Indicator.close();
					that.showCentent = true
					if(res.body.resCode){
						if(res.body.resData.bankNum != 0){
							console.log(that.dataUrl)
							that.cardList = res.body.resData.bankCardlist;
							that.mobilePhone = res.body.resData.mobilePhone
							if(that.flag == 1){
								for(var i=0;i<that.cardList.length;i++){
									var len = that.cardList[i].hiddenCardNumber.length
									that.cardList[i].hiddenCardNumber = that.cardList[i].hiddenCardNumber.substring(len-4,len)
								}
							}
							
						}else{
							that.cardList = [];
						}
					}else{
						//that.$router.push('/wxMyAccount');
					}
				},{},1)
			}
		},
		components:{popupMessage,wxAuthorize},
		created(){
			this.getBank();
			//发送请求
		}
	}
</script>

<style lang="scss" scoped>
	#layer{
		width:100%;
		height:100%;
		background:rgba(0,0,0,.5);
		position:fixed;
		top:0;
		z-index:100;
		.btn{
			height:1.52rem;
			width:9.466667rem;
			border-radius:0.32rem;
			background:#fff;
			font-size:0.533333rem;
			line-height:1.52rem;
			color:#ff3b30;
			margin:0 0.266667rem 0.266667rem;
			text-align:center;
		}
		.content{
			position:absolute;
			bottom: 0;
			.btn{
				height:1.52rem;
				width:9.466667rem;
				border-radius:0.32rem;
				background:#fff;
				font-size:0.533333rem;
				line-height:1.52rem;
				color:#ff3b30;
				margin:0 0.266667rem 0.266667rem;
				text-align:center;
			}
			.btn:last-child{
				color:#0076ff;
			}
		}
		.content2{
			position: absolute;
			bottom:0;
			width:100%;
			ul{
				width:9.466667rem;
				height:3.04rem;
				margin:0 auto;
				border-radius:0.32rem;
				text-align:center;
				margin-bottom: 0.24rem;
				background:rgba(252,252,252,0.9);
				li{
					font-size:0.533333rem;
					height:1.52rem;
					line-height:1.52rem;
					position: relative;
				}
				.bdr-b{
					border-bottom:1px solid #666
				}
			}
			.btn{
				margin-bottom:0.24rem;
				color:#0076FF;
				font-size:0.533333rem;
				font-weight: 600;
			}
		}
	}
	.addCard{
		height:100vh;
		width: 100%;
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
		.nocard-div {
			img {
				width: 6.4rem;
				height: 4.533333rem;
				margin:1.466667rem 1.72rem 0 1.88rem ;
			}
			p{
				font-size:.346667rem;
				color: #808080;
				margin-top: 20px;
				text-align: center
			}
		}
	}
	.zsCardList{
		padding:0.226667rem 0.4rem 0.533333rem;
	    background: #fff;
	    margin-bottom: 0.266667rem;
		li{
			position: relative;
			width: 9.253333rem;
			height: 3.893333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/default_card.png) no-repeat;
			background-size:100% 100%;
			border:0; 
			margin: 0 auto;
			padding:0.626667rem 0 0 0.693333rem;
			.img1{
				float: left;
				height:0.8rem;
				width:0.8rem;
				border-radius:50%;
				background: #FFFFFF;
				margin-right:0.266667rem;
				padding: 0.053333rem;
				img{
					
					height:0.693333rem;
					width:0.693333rem;	
				}
			}
			.cards_title{
				width: 100%;
				margin-bottom: 0.533333rem;
				.name{
					font-size: 0.373333rem;
					height: 0.8rem;
					line-height: 0.8rem;
					position: relative;
					color: #FFFFFF;
					float: left;
				}
				.limit_info{
					width: 1.44rem;
					height: 0.56rem;
					border-radius: 0.4rem;
					line-height: 0.56rem;
					text-align: center;
					background: rgba(255,255,255,0.5);
					font-family: PingFangSC-Regular;
					font-size: 0.266667rem;
					color: #FFFFFF;
					float: right;
					margin-right: .6rem;
				}
			}
			.card_info{
				font-family: PingFangSC-Regular;
				font-size: 0.346667rem;
				color: #FFFFFF;
				margin-bottom: 0.186667rem;
				span{
					font-size: 0.32rem;
					margin-right: 0.32rem;
				}
			}
		}
		.change_tips{
			font-family: PingFangSC-Regular;
			font-size: 0.293333rem;
			color: #808080;
			text-align: center;
			margin-top: .1rem;
		}
	}

	.modify_info{
		padding-left: 0.4rem;
		font-family: PingFangSC-Regular;
		background: #ffffff;
		div{
			height: 1.466667rem;
			line-height: 1.466667rem;
			position: relative;
			padding-right: 0.4rem;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9rem .55rem  no-repeat;
			background-size:0.213333rem 0.346667rem;
			h4{
				font-size: 0.426667rem;
				color: #333333;
			}
			h5{
				font-size: 0.32rem;
				color: #808080;
				padding-right: 0.533333rem;
				line-height: 1.466667rem;
			}
		}
	}
	p.zs_tips{
		font-size: 0.32rem;
		color: #808080;
		padding-top: 0.933333rem;
		// text-align: center;
		position: fixed;
		bottom: 0.8rem;
		left: 2.76rem;
		span{
			width: 0.32rem;
			height: 0.32rem;
			display: inline-block;
			position: relative;
			background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/questionIco.png) no-repeat;
			background-size: 100% 100%;
			top: .05rem;
			margin-right: .1rem;
		}
		i{
			color: #508CEE;
		}
	}
	.cardList{
		background:#fff;
		padding:0.133333rem 0.4rem 0.533333rem;
		li{
			position: relative;
			height:2.8rem;
			width:9.2rem;
			background:url(https://aliyunsso.edspay.com/web/wx/account/amend/sinaCard.png) no-repeat;
			background-size: 100% 100%;
			border:1px solid #ddd;
			border-radius:0.16rem;
			margin-top:0.4rem;
			.amend{
				position: absolute;
				height:0.533333rem;
				width:1.066667rem;
				line-height:0.533333rem;
				font-size:0.32rem;
				text-align:center;
				right: 0.4rem;
				border-radius:0.266667rem;
				border:1px solid #ccc;
				top:0.4rem;
			}
			.img{
				float: left;
				height:0.8rem;
				width:0.8rem;
				border-radius:50%;
				background:#f5f5f5;
				margin:0.533333rem 0.266667rem 0 0.4rem;
				padding: 0.066667rem;
				img{
					
					height:0.533333rem;
					width:0.533333rem;	
				}
			}
			.content{
				float: left;
				color:#333;
				padding-top:0.533333rem;
				font-size:0.373333rem;
				line-height:0.533333rem;
				.name{
					font-size:0.373333rem;
					line-height:0.533333rem;
					position: relative;
					.safety{
						display:inline-block;
						padding-left:0.08rem;
						img{
							height:0.346667rem;
							width:0.293333rem;
						}
					}
				}
				.type{
					font-size:0.32rem;
					line-height:0.44rem;
					color:#808080;
					padding:0.08rem 0 0.426667rem;
				}
				.cardId{
					color:#808080;
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
	.tips{
		padding:0.6rem 0.64rem 0;
		font-size:0.293333rem;
		color:#a3a3a4;
		p{
			padding-bottom: 0.186667rem;
		}
	}
</style>