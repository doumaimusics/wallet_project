<template>
	<div id="Realname">
		<wx-header :logo="logoMsg"></wx-header>
		<p>为了保障您的资金安全，请提供真实信息</p>
		<div class="content">
			<div class="import">
				<img src="https://aliyunsso.edspay.com/web/wx/account/inputPeople.png" alt="">
				<input type="text" v-model="name" placeholder="请输入您的真实姓名" :disabled="disabled">
			</div>
			<div class="import">
				<img src="https://aliyunsso.edspay.com/web/wx/account/inputCard.png" alt="">
				<input type="text" v-model="cardId" placeholder="请输入您的身份证号" :disabled="disabled">
			</div>
		</div>
		<div class="btn" :class="{setRed:isRed}" @click="dredge">确认开通</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import { MessageBox } from 'mint-ui';
	export default {
		mixins:[verify],
		data(){
			return {
				logoMsg:'支付账户',
				name:'',
				cardId:'',
				disabled:false,
				lastUrl:'',
			}
		},
		computed:{
			isRed:function(){
				if(this.name && this.cardId) return true;
				else return false;
			}
		},
		methods:{
			dredge(){
				var that = this;
				if(!this.isRed) return;
				if(this.isFormat(that.name,'姓名格式错误！','other_user_nameReg',1)) return;
				if(this.isFormat(that.cardId,'身份证格式错误！','other_id_cardReg',1)) return;
				this.postData('/account/realnameIdentify',(res,data) =>{
					if(res.body.resCode){
						that.$router.replace({path:'/wxMyAccount/wxRealnameSucc',query:{result:1,goUrl:this.lastUrl}})
					}else{
						MessageBox.confirm(data.resMsg,{
							showCancelButton: false,
							closeOnClickModal: false,
							showConfirmButton: true,
						}).then(action => {
							this.$router.go(-1)
						});
					}
				},{realName:this.name,cardId:this.cardId})  

			}
		},
		components:{
			wxHeader,
		},
		created(){
			this.postData('/account/toRealnameIdentify',(res,data) =>{
				if(data.resCode){
					if(data.resData.cardId){
						this.name = data.resData.realName;
						this.cardId = data.resData.cardId;
						this.disabled = true;
						if (data.resData.channel) {
							if (data.resData.channel=='fclc') {
								this.name = data.resData.realName;
								this.cardId = data.resData.cardId;
							}
						}
					}
				}else{
					MessageBox.confirm(data.resMsg,{
						showCancelButton: false,
						closeOnClickModal: false,
						showConfirmButton: true,
					}).then(action => {
						this.$router.go(-1)
					});
				}
			},{})
			this.lastUrl = this.$route.query.thisUrl;
		}
	}
</script>

<style lang="scss" scoped>
	#Realname{
		p{
			padding-left:0.266667rem;
			height:1.066667rem;
			font-size: 0.373333rem;
			line-height:1.066667rem;
			background: #F8F8F8;
			color:#969696;
		}
		.content{
			padding-left: 0.4rem;
			background:#fff;
			.import{
				height:1.333333rem;
				font-size:0.4rem;
				line-height:1.333333rem;
				img{
					margin-right: 0.266667rem;
					height:0.826667rem;
					width:0.826667rem;
				}
			}
			.import:first-child{
				border-bottom: 1px solid #EEEEEE;
			}
		}
		.btn{
			width:90%;
			display:block;
			margin:0 auto;
			background:#DADADA;
			font-size: 0.426667rem;
			height:1.066667rem;
			text-align: center;
			line-height:1.066667rem;
			border-radius:4px;
			color:#fff;
			margin-top:1.333333rem;
		}
		.setRed{
			background:#ff5a4a;
		}

	}
</style>