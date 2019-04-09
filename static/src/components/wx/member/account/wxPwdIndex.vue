<template>
	<div id="wxPwdIndex">
		<div v-title>密码管理</div>
		<div class="nothing"></div>
		<ul>
			<router-link :to="{path:'/wxMyAccount/wxAlterPwd'}" tag='li'>修改登录密码</router-link>
			<li @click="goSetPwd">{{pwdText[isSetTradePass]}}</li>
		</ul>
		<public-dialog v-if='showThis.isShow' :confirmBtn="confirmBtn" :showThis="showThis" :btn="1" :text="openZcText" :btnText="btnText"></public-dialog>
	</div>
</template>
<script>
	import publicDialog from '../../member/invest/wxPublicDialog'; //授权弹框
	export default {
		data(){
			return {
				pwdText:['设置交易密码','修改交易密码'],
				isSetTradePass: '', //是否设置过密码0设置，1修改
				czbShow:'',//开通存管0未开通，1开通
				hideName:'',//加密真实姓名
				phoneNum:'',//手机号码
				showThis: {
					isShow: false,
				},
				openZcText:'您尚未开通浙商存管账户，开通后才能设置交易密码',
				btnText: ['取消','去开通'],
				userData:{},
				eCardNo:'',
			}
		},
		methods: {
			goSetPwd() {
				if ( this.userData.eCardNo ) {
					if ( this.isSetTradePass == 0 ) {
						this.$router.replace( { path:'/wxMyAccount/wxTradePwdNew',query:{thisUrl:this.$route.fullPath,pwdManage:0,typePwd:0} } )
					} else if ( this.isSetTradePass == 1 ) {
						this.$router.replace( { path:'/wxMyAccount/wxTradePwdNew',query:{thisUrl:this.$route.fullPath,pwdManage:1,typePwd:0} } )
					}
				} else {
					this.showThis.isShow = true
				}
			},
			confirmBtn() {
				this.$router.push({path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}});
			},
		},
		components:{
			publicDialog
		},
		created() {
			console.log(this.$route.path);
			var that = this;
			this.postData('/account/securityInfo',function(res){
				that.showCentent = true;
				if(res.body.resCode == 1){
					that.userData = res.body.resData.model;
					// that.eCardNo = that.userData.eCardNo;
					if (that.userData.isSetTradePass == 1) {
						that.isSetTradePass = 1;
					} else if (that.userData.isSetTradePass == 0) {
						that.isSetTradePass = 0;
					}

				}else{
					that.$router.push('/wxLogin')
				}
			},{},1)
		}
	}
</script>
<style lang="scss" scoped>
	#wxPwdIndex{
		font-family: PingFangSC-Regular;
		.nothing{
			height: 0.266667rem;
		}
		ul{
			width: 100%;
			background: #ffffff;
			padding-left: 0.4rem;
			li{
				width: 100%;
				height: 1.466667rem;
				line-height: 1.466667rem;
				font-size: 0.426667rem;
				color: #333333;
				background:url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 8.8rem 0.55rem no-repeat;
			    background-size: 0.213333rem 0.4rem;
			    border-bottom: 1px solid #e5e5e5;
			}
		}
	}
</style>