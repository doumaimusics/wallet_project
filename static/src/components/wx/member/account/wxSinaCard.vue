<!-- 新浪绑卡 -->
<template>
	<div id="depository">
		<wx-header :logo="logoMsg"></wx-header>
		<div id="nextContent">
			<ul id="show">
				<li>
					<span>银行卡号</span>
					<input v-model="cardId" type="text"  placeholder="请输入您本人银行卡号">
					<img v-if="cardId" @click="cardId = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
				</li>
				<router-link :to="{path:'/wxMyAccount/wxBindingCard/wxAddBank',query:{entrance:'sina',dataUrl: '/account/bank/list'}}" tag="li" replace>
					<span>开户银行</span>
					<i></i>
					<em>{{bankName}}</em>
				</router-link>
				<router-link :to="{path:'/wxMyAccount/wxBindingCard/wxGetCity',query:{entrance:'sina'}}" tag="li" replace>
					<span>开户城市</span>
					<i></i>
					<em>{{cityName}}</em>
				</router-link>
				<li>
					<span>银行预留手机号</span>
					<input v-model="phone" type="number"  placeholder="请输入银行预留手机号">
					<img v-if="phone" @click="phone = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
				</li>
				<li>
					<span>验证码</span>
					<input v-model="code" type="text"  placeholder="请输入短信验证码">
					<img v-if="code" @click="code = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
					<div class="message fl" v-if="showBtn" @click="send">{{btnText}}</div>
					<div class="message second fl" v-else>{{time}}秒</div>
				</li>
			</ul>
		</div>
		<div class="ok" v-btn :class="{isRed:!isRed}" @click="dredge">确定</div>
		<div class="tips">
			<span class="fl">建议您绑定1类卡</span>
			<router-link to="/wxMyAccount/wxThreeCard" class="QRB fr" tag="span">了解银行三类账户</router-link>
		</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';
	import cheakImg from '../../../public/wx/wxCheakImg'	//引入图片Cheak
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import wxToast from '../../../../common/wx/wxToast'; //引入toast提示
	import { Indicator } from 'mint-ui';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins:[wxToast,verify],
		data(){
			return {
				logoMsg:'借记卡绑定',
				tipShow:false,	//显示提示
				errorMsg:'',	//错误提示
				showNext:true,	//显示下一步
				showBtn:true,	//显示‘获取验证码’按钮
				btnText:'获取验证码',	//按钮文字
				cardId:'',	//卡号
				phone:'',	//手机号
				code:'',	//短信验证码
				bankName:'请选择银行',
				cityName:'请选择开户城市',
				time:60,
				province:'',
				bankCode:'',
				ticket:'',	//获取短信验证码返回值
				lastUrl:'',	//上一个页面的地址
			}
		},
		computed:{
			isRed:function(){
				if(this.bankName != '请选择银行' && this.cardId && this.cityName != '请选择开户城市' && this.phone && this.code) return true;
				else return false;
			},
		},
		methods:{
			verifyText(){
				var that = this;
				if(this.isEmpty(that.cardId,'请输入银行卡号',1)) return
				if(this.isFormat(this.cardId,'银行卡号格式错误','cardnoReg',1)) return
				if(this.bankName == '请选择银行'){
					this.toast({text:'请选择银行'});
					return
				}
				if(this.cityName == '请选择开户城市'){
					this.toast({text:'请选择开户城市'});
					return;
				}
				if(this.isEmpty(this.phone,'请输入手机号',1)) return
				if(this.isFormat(this.phone,'手机号格式错误','mobileReg',1)) return
				return true;

			},
			dredge(){			//发送绑定银行卡请求
				var that = this;
				if(!this.isRed) return;		//判断是否填写完毕
				
				if(this.isEmpty(that.code,'请输入短信验证码',1)) return

				this.postData('/account/addBankAdvance',(res) => {
					if(res.body.resCode == 1){
						that.$router.replace({path:'/wxMyAccount/wxBindingCard/wxBindingSucc',query:{goUrl:that.lastUrl}})
					}else{
						MessageBox.confirm(res.body.resMsg,{
							showCancelButton: false,
							closeOnClickModal: false,
							showConfirmButton: true,
						}).then(action => {
							this.$router.go(-1)
						});
					}
				},{bankCode:this.bankCode,bankNo:this.cardId,city:this.cityName,province:this.province,phoneNo:this.phone,validCode:this.code,ticket:this.ticket})

					
			},
			send(){			//获取短信验证码
				var that = this;
				if(this.verifyText()){
					this.postData('/account/addBank',function(res){
						if(res.body.resCode){
							that.ticket = res.body.resData.ticket;
							codeSuc();
						}else{
							MessageBox.confirm(res.body.resMsg,{
								showCancelButton: false,
								closeOnClickModal: false,
								showConfirmButton: true,
							}).then(action => {
								this.$router.go(-1)
							});
						}
					},{bankCode:this.bankCode,bankNo:this.cardId,city:this.cityName,province:this.province,phoneNo:this.phone})
				}
				function codeSuc(){
			    	that.showBtn = false;
			    	that.toast({text:'发送成功',position:'top'})
					let timer = window.setInterval(function(){
						if((that.time--) <= 0) {
							that.time = 60;
							that.showBtn = true;
							that.btnText = '重新获取';
							window.clearInterval(timer);
						}
					},1000)
			    }
			}

		},
		components:{
			wxHeader,
			cheakImg
		},
		mounted(){
			
		},
		activated(){
			if(this.$route.query.subbranch) this.subbranch=this.$route.query.subbranch;
			if(this.$route.query.bankName) this.bankName=this.$route.query.bankName;
			if(this.$route.query.value) this.bankCode=this.$route.query.value;
			if(this.$route.query.cityName) this.cityName=this.$route.query.cityName;
			if(this.$route.query.province) this.province=this.$route.query.province;
		},
		created(){
			this.lastUrl=this.$route.query.thisUrl;
		}

	}
</script>

<style lang="scss" scoped>
	#depository{
		.isRed{
			background:#d8d8d8!important;
		}
		#nextContent{
			position:relative;
			margin-bottom: 1.2rem;
		}
		.message{
			background:#FF5A54;
			margin:0.266667rem 0.4rem 0 0;
			height:0.96rem;
			color:#fff;
			float:right;
			border-radius:4px;
			font-size: 0.373333rem;
			line-height:0.96rem;
			padding: 0 0.16rem;
		}
		.second{
			background:#f3f3f3;
			color:#508cee;
		}
		ul{
			margin-top: 0.8rem;
			padding-left: 0.4rem;
			background:#fff;
			li{
				height: 1.466667rem;
				line-height: 1.413333rem;
				font-size: 0.346667rem;
				color: #333;
				border-bottom: 1px solid #e5e5e5;
				position: relative;
				span{
					padding-right: 0.4rem;
					float: left;
				}
				input{
					margin: 0.5rem 0;
					line-height:0.4rem;
					width: 60%;
					background:#fff;
					font-size:0.373333rem;
					float:left;
				}
				em{
					float:right;
					padding-right:0.346667rem;
					color:#808080;
					font-size:0.32rem;
				}
				img{
					float:right;
					margin: 0.533333rem 0.4rem 0 0;
					height:0.4rem;
					width:0.4rem;
				}
				i{
					height:0.4rem;
					width:0.266667rem;
					float:right;
					margin-right:0.4rem;
					margin-top: 0.51rem;
					background:url(https://aliyunsso.edspay.com/web/wx/depository/right.png);
					background-size:100% 100%;
				}
			}
			li:last-child{
				input{
					width:48%;
				}
				img{
					float: left;
				}
				border:0;
			}
		}
		.tips{
			padding: 0.666667rem 0.266667rem 0;
			span{
				color:#808080;
				font-size:0.346667rem;
				line-height:0.4rem;
			}
			.QRB{
				color:#00BDFF;
			}
		}
	}
</style>