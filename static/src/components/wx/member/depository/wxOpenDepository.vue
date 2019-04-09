<template>
	<div id="depository">
		<pop-message :logo="'开通存管验证码'" :confirm="confirm" v-if="showlayer.getMessage" :phone="phone" :num="1" :type="1" :showMessage="showlayer" :dataUrl="'sdf'" :code="code" :again="dredge"></pop-message>
		<ul>
			<li>
				<span>真实姓名</span>
				<input v-model="userName" type="text"  placeholder="请输入您的真实姓名"  :disabled="disabled">
				<img v-if="(userName && type == 0)" @click="userName = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
			</li>	
			<li>
				<span>身份证号</span>
				<input v-model="identity" type="text"  placeholder="请输入您的证件号码" :disabled="disabled">
				<img v-if="(identity && type == 0)" @click="identity = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
				<div class="marBot"></div>
			</li>
		</ul>
		<div id="nextContent" :class="{isblock:1}">
			<div class="bankNo"><span v-if="bankNo">{{'请填写'+bankNo+'的完整卡号'}}</span></div>
			<ul id="show">
				<li>
					<span>银行卡号</span>
					<input v-model="cardId" type="number"  placeholder="请输入您本人银行卡号">
					<img v-if="cardId" @click="cardId = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
				</li>
				<li v-if="!isOpen"  @click="goMsg({path:'/wxDepository/wxAddBank',query:{entrance:'/wxDepository',dataUrl:'/account/zsbank/list'}})">
					<span>开户银行</span>
					<i></i>
					<em class="hidden">{{bankName}}</em>
				</li>
				<li v-if="!isOpen" @click="goMsg({path:'/wxDepository/wxGetCity',query:{entrance:'/wxDepository',province:province,cityName:cityName}})">
					<span>开户城市</span>
					<i></i>
					<em class="hidden">{{cityName}}</em>
				</li>
				<li @click="goSubbranch">
					<span>开户支行</span>
					<i></i>
					<em class="hidden">{{subbranch}}</em>
				</li>
				<li>
					<span>银行预留手机号</span>
					<input v-model="phone" type="number"  placeholder="请输入银行预留手机号" :disabled="isOpen">
					<img v-if="phone && !isOpen" @click="phone = ''" src="https://aliyunsso.edspay.com/web/wx/depository/clear.png" alt="">
				</li>
			</ul>
			<div class="protocol">
				<cheak-img :cheak="isImg"></cheak-img>
			我已阅读并同意<router-link :to="{path:'/wxDepository/wxZSentrustAgreement',query:{cardID:identity,realName:userName,phoneNum:phone}}" tag="span">《浙商银行委托扣款业务服务协议》</router-link><router-link :to="{path:'/wxDepository/wxZSdealAgreement',query:{cardID:identity,realName:userName}}" class="zsAgree" tag="span">《浙江银行网络借贷交易资金存管业务三方协议》</router-link></div>
		</div>
		<div v-if="showNext" @click="toNext" :class="{isRed:!isRed}" class="btn btn1">下一步</div>
		<div v-else class="btn ok" :class="{isRed:((!isover && !isOpen) || !cardId)}" @click="dredge">确定开户</div>
		<def-tip v-if="showThis.isShow" :cause="cause" :showThis="showThis"></def-tip>
	</div>
</template>

<script>
	import cheakImg from '../../../public/wx/wxCheakImg'	//引入图片Cheak
	import verify from '../../../../common/wx/verification';	//引入表单验证
	import wxToast from '../../../../common/wx/wxToast'; //引入toast提示
	import popMessage from '../invest/popupMessage';
	import defTip from './wxDefTip';
	export default {
		mixins:[wxToast,verify],
		data(){
			return {
				showNext:true,	//显示下一步
				userName:'',	//真实姓名
				identity:'',	//身份证号
				cardId:'',		//银行卡号
				bank:'',		//银行名
				city:'',		//城市名
				phone:'',		//手机号
				unionLineNo:'',	//人行联行号	
				code:{
					msgCode:''	//短信验证码
				},
				bankName:'请选择开户银行',
				bankCode:'',			//银行ID
				cityName:'请选择开户城市',
				gbAreaId:'',			//城市编号
				province:'',			//省份
				subbranch:'请选择开户支行',
				type:0,			//是否已开通
				disabled:false,	//是否可点击
				isImg:{
					isCheak:true
				},		//是否勾选
				showlayer:{
					getMessage:false
				},
				showThis:{
					isShow:false,
				},
				cause:'',
				lastUrl:'',		//上一个页面的路由
				bankNo:'',		//返回的不完整卡号
				isOpen:false,	//是否在其他平台开通浙商
				isBack:{
					bankName:false,
					cityName:false,
					subbranch:false,
					phone:false,
				}
			}
		},
		computed:{
			isRed:function(){
				if(this.userName && this.identity) return true;
				else return false;
			},
			isover:function(){
				if(this.userName &&this.identity && this.cardId && this.bankName != '请选择开户银行' && this.cityName != '请选择开户城市' && this.subbranch != '请选择开户支行' && this.phone){
					return true;	
				}else return false;
			}
		},
		methods:{
			goMsg(goUrl){
				this.subbranch = '请选择开户支行';
				this.$router.replace(goUrl);
			},
			confirm(){   //发送开通存管请求
				if(this.isEmpty(this.code.msgCode,'短信验证码不能为空',1)) return;
				var that = this;
				this.showlayer.getMessage = false;
				this.postData('/openZsAcc',(res,data) => {
					if(res.body.resCode){
						that.$router.replace({path:'/wxDepository/wxDepositorySucc',query:{result:1,cause:res.body.resMsg}})
						this.setCookie('zsOpenStatus',1)
					}else{
						this.showThis.isShow = true;
						this.cause = data.resMsg;
					}
				},{authCode:this.code.msgCode,bankCode:this.bankCode,bankName:(this.bankName == '请选择开户银行' ? '':this.bankName),bankNo:this.cardId,branch:this.subbranch,cardId:this.identity,city:(this.cityName == '请选择开户城市' ? '':this.cityName),phone:this.phone,province:this.province,realName:this.userName,unionBankNo:this.unionLineNo})
			},
			toNext(){
				if(!this.isRed) return;
				if(this.isFormat(this.userName,'姓名格式错误！','other_user_nameReg',1)) return;
				if(this.isFormat(this.identity,'身份证格式错误！','other_id_cardReg',1)) return;
				if(!this.disabled){
					this.postData('/getAccBankInfo',(res,data) => {
						console.log(data);
						if(res.data){
							if(data.resData.unionBankNo){
								this.isOpen = true;
								this.subbranch = data.resData.branch;
								this.bankNo = data.resData.bankNo;
								this.phone = data.resData.phone;
								this.bankCode = data.resData.bankCode;
								this.bankName = data.resData.bankName;
								this.unionLineNo = data.resData.unionBankNo;
							}
						}
						this.showNext = false;
						this.slideDown()
					},{cardId:this.identity})
				}
				this.showNext = false;
				this.slideDown()
			},
			slideDown(){
				$("#nextContent").slideDown("slow",function(){
				   
				});
			},
			goSubbranch(){
				if(!this.isOpen){
					if(this.bankName == '请选择开户银行'){
						this.toast({text:'请先选择开户银行'});
						return;
					}
					if(this.cityName == '请选择开户城市'){
						this.toast({text:'请先选择开户城市'})
						return;
					}
					this.$router.replace({path:'/wxDepository/wxSearch',query:{entrance:'/wxDepository',bankCode:this.bankCode,gbAreaId:this.gbAreaId}})
				}
			},
			dredge(){
				var that = this;
				if(!this.isover && !this.isOpen) return;		//判断是否填写完毕
				if(!this.isImg.isCheak){				//判断是否勾选
					this.toast({text:'请勾选服务协议条款'})
					return;
				}
				if(this.isFormat(this.cardId,'银行卡号格式错误！','cardnoReg',1)) return;
				if(this.isFormat(this.phone,'手机号格式错误！','mobileReg',1)) return;
				this.code.msgCode = '';
				this.postData('/getOpenAccCode',function(res){		//获取短信验证码请求
					if(res.body.resCode){
						that.showlayer.getMessage = true;
					}else{
						that.toast({text:res.body.resMsg});
					}
				},{bankNo:this.cardId,cardId:this.identity,phone:this.phone,realName:this.userName})
					
			},
		},
		components:{
			popMessage,
			cheakImg,
			defTip,
		},
		activated(){
			document.title = ''
			document.title = '开通存管'
			if(this.$route.query.subbranch) this.subbranch=this.$route.query.subbranch;	//支行
			if(this.$route.query.unionLineNo) this.unionLineNo=this.$route.query.unionLineNo;	//支行
			if(this.$route.query.bankName) this.bankName=this.$route.query.bankName;	//银行名
			if(this.$route.query.bankCode) this.bankCode=this.$route.query.bankCode;	//银行ID

			if(this.$route.query.province) this.province=this.$route.query.province;	//省份
			if(this.$route.query.cityName) this.cityName=this.$route.query.cityName;	//城市名
			if(this.$route.query.gbAreaId) this.gbAreaId=this.$route.query.gbAreaId;	//城市编号
		},
		created(){
			this.lastUrl = this.$route.query.thisUrl;

			this.$route.query.subbranch =''
			this.$route.query.unionLineNo =''
			this.$route.query.bankName =''
			this.$route.query.bankCode =''
			this.$route.query.province =''
			this.$route.query.cityName =''
			this.$route.query.gbAreaId =''

			var that = this;
			this.postData('/toOpenZsAcc',(res,data) => {		//处理初始化返回的值(待处理)
				if(res.body.resCode == 1){  // 添加风车理财的判断
					if(data.resData.unionBankNo){
						this.isOpen = true;
						this.subbranch = data.resData.branch;
						this.bankNo = data.resData.bankNo;
						this.phone = data.resData.phone;
						this.bankCode = data.resData.bankCode;
						this.bankName = data.resData.bankName;
						this.unionLineNo = data.resData.unionBankNo;
					}
					if(data.resData.channel=='fclc') {
						that.userName = data.resData.realName;
						that.identity = data.resData.cardId;
						that.disabled = true;
						that.type = 1;
					} else if(data.resData.cardId){
						that.userName = data.resData.realName;
						that.identity = data.resData.cardId;
						that.disabled = true;
						that.type = 1;
						that.toNext();
					}
				}else{
					that.$router.go(-1);
				}
			},{},1)
			if(this.type == 1){
				this.disabled = true;
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	#depository{
		input{
			font-size: 0.373333rem;
		}
		.isRed{
			background:#d8d8d8!important;
		}
		.isblock{
			display: none
		}
		.bankNo{
			font-size:0.346667rem;
			line-height:0.533333rem;
			padding: 0.6rem 0.4rem 0.2rem;
			color:#808080;
		}
		#nextContent ul{margin-top: 0;}
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
					font-size: 0.373333rem;
					float:left;
				}
				em{
					float:right;
					padding-right:0.346667rem;
					color:#808080;
					font-size:0.32rem;
					width:72%;
					text-align:right;
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
				border:0;
			}
		}
		.protocol{
			padding:0.2rem 0 0rem 0.373333rem;
			font-size:0.293333rem;
			color:#a3a3a4;
			line-height:0.75rem;
			
			span{
				color:#508cee;
			}
		}
		.btn{
			width:8.773333rem;
			height:1.066667rem;
			color:#fff;
			line-height:1.066667rem;
			font-size:0.426667rem;
			text-align:center;
			border-radius: 0.106667rem;
			background:#ff5b4c;
			margin: 0.8rem auto 0;
		}
		.ok{
			margin-top:0.8rem;
		}
		.zsAgree{
			line-height:0.4rem;
			width: 87.3%;
			text-align:right;
			display:block;
		}
	}
</style>