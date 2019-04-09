<template>
	<div id="recharge">
		<div id="layer">
			<div class="content">
				<div class="title">{{logo ? logo:'出借验证码'}}</div>
				<p v-if="flag != 1" class="text">{{tipsText}}</p>
				<div class="importCode">
					<input v-model="code.msgCode" type="text" placeholder="输入验证码">
					<span v-if="showBtn" @click="activeBtn">{{btnText}}</span>
					<em v-else>{{time}}秒</em>
					<p v-if="showTip" class="tip">{{errorMsg}}</p>
				</div>
				<div class="btns">
					<span @click="showMessage.getMessage = false">取消</span>
					<span @click="goClick">确定</span>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	import verify from '../../../../common/wx/verification';	//引入表单验证
	export default {
		mixins:[verify],
		data(){
			return {
				tipsText:'',
				btnText:'点击获取',
				showBtn:true,
				showTip:false,
				errorMsg:'',
				time:60,
				cause:'断网了吗？ok',
			}
		},
		computed:{

		},
		props:['phone','showMessage','confirm','code','flag','logo','again','num'],
		//手机号,是否显示,确认执行的方法,短信验证码,是否显示手机号,头部文字,再次发送手机验证码
		methods:{
			goClick(num){
				if(this.isEmpty(this.code.msgCode,'短信验证码不能为空！'))	return;
				if(this.isFormat(this.code.msgCode,'短信验证码格式错误','mobcodeReg',1)) return
				this.showMessage.getMessage = false;
				this.confirm();
				// if ( this.num == 1 ) {
				// 	if(this.isEmpty(this.code.msgCode,'短信验证码不能为空！'))	return;
				// 	this.showMessage.getMessage = false;
				// 	this.confirm();
				// } else if ( this.num == 2 ) {
				// 	console.log(this.code.msgCode+'验证码');
				// 	if(this.isEmpty(this.code.msgCode,'短信验证码不能为空！'))	return;
				// 	this.showMessage.getMessage = false;
				// 	this.confirm();
				// }
				
			},
			cancel(){
				this.showlayer.layer = false;
				if(this.num == 1){
					this.$router.push({path:'/wxInvestMoney'})
				} else if (this.num == 2) {
					this.$router.push({path:'/wxInvestMoneyPoint'})
				}
				
			},
			activeBtn(){
				this.again();
				this.send();
			},
			send(){
				let that = this;
				let hidePhone = this.phone;
				hidePhone ? hidePhone = hidePhone.substring(0,3)+"****"+hidePhone.substring(7,11) : 0
				this.tipsText='已发送到'+hidePhone+'手机号'
				this.showBtn = false;
				let timer = window.setInterval(function(){
					if((that.time--) <= 0) {
						that.time = 60;
						that.showBtn = true;
						that.btnText = '重新获取';
						window.clearInterval(timer);
					}
				},1000)
			},
			payment(){
				let that = this;
				if(tool.isEmptyString(that.code.msgCode)){
					that.popModal('验证码不能为空');
					return;
				}

				//发送充值请求传递uuid userid
				console.log(this.succUrl)
				this.$router.push({path:that.defUrl,query:{cause:that.cause}})
			},
			popModal(param){
      			var that = this;
      			that.showTip=true;
      			that.errorMsg=param.str;

      			setTimeout(function(){
      			    that.showTip = false;
      			    that.errorMsg = '';
      			}, 2000);
      		}
		},
		mounted(){
			this.send();
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
		z-index:101;
		.content{
			box-sizing:border-box;
			padding-bottom:  0.64rem;
			position:absolute;
			top:45%;
			left:50%;
			margin:-2.8rem 0 0 -3.8rem;
			width:7.493333rem;
			height:5.733333rem;
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
	}
	#recharge{
		.text{
			padding:0.293333rem 0.413333rem 0;
			color:#808080;
		}
		.importCode{
			width:6.52rem;
			height:1.146667rem;
			border-radius:0.106667rem;
			border:1px solid #c8c7cc;
			position:relative;
			font-size:0.373333rem;
			margin: 0.306667rem 0.413333rem 0;
			::-webkit-input-placeholder { /* WebKit browsers */ 
				color:#d8d8d8;
			} 
			:-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
				color:#d8d8d8;
			} 
			::-moz-placeholder { /* Mozilla Firefox 19+ */ 
				color:#d8d8d8;
			} 
			:-ms-input-placeholder { /* Internet Explorer 10+ */ 
				color:#d8d8d8;
			}
			input{
				float:left;
				padding-left:0.4rem;
				width:60%;
				line-height:1.1rem;
			}
			span{
				color:#fff;
				float:right;
				width: 1.8rem;
				height: 0.94rem;
				line-height:0.96rem;
				margin-right:0.133333rem;
				margin-top: 0.08rem;
				border-radius:0.106667rem;
				background:#ff5b4c;
				text-align:center;
			}
			em{
				color:#508cee;
				background:#d8d8d8;
				border-radius:0.106667rem;
				float:right;
				width:1.6rem;
				height:0.96rem;
				line-height:0.96rem;
				margin-right:0.133333rem;
				margin-top: 0.08rem;
				text-align:center;
			}
			p{
				position:absolute;
				bottom:-0.5rem;
				left:0;
				padding-left:0.4rem;
				font-size:0.293333rem;
				line-height:0.4rem;
				color:#ff5b4c;
				background:url(https://aliyunsso.edspay.com/web/wx/invest/errorTip.png) 0.04rem no-repeat;
				background-size:0.293333rem 0.293333rem;

			}
		}
		.btns{
			padding:0.626667rem 0.4133rem 0;
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