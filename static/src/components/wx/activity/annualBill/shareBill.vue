<template>
	<div class="share-bill">
		<div v-title>E都市钱包年度账单</div>
		<div class="dialog_commom middle">
			<p>{{userData.userName}}财富关键词</p>
			<img class="share-img" :src="luckImg[userData.vipLevel]" alt="">
			<img class="code-img" :src="codeImgURL" alt="">
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import jiami from 'js-base64';
	export default {
		mixins:[wxToapp],
		data () {
			return {
				userId:'',
				useId:'',
				userData:{},
				luckImg:[
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/share0.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/share1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/share2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/share3.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/share4.png'
				],
				codeImgURL:'',
				MobilePhone:''
			}
		},
		methods:{
			getData(){
				this.getNotlogData('/activity/annualSpendingReport/getFXList',(data) => {
					if( data.resCode == 1 ){
						this.userData = data.resData;
						this.MobilePhone = data.resData.userName
						this.getImgUrl();
					}

				},{userId:this.useId},1)
			},

			getImgUrl(){    //生成二维码图片
			    var that = this;
			    var QRCode = require('qrcode');
			    QRCode.toDataURL(global.host+"invite/inviteRegister?ui=" + this.userId + "&userName="+ Base64.encode(this.MobilePhone) , {errorCorrectionLevel: 'H'}, function (err, url) {
			        that.codeImgURL = url;
			    })
			},
			
		},
		mounted(){
			this.PassValue('NavWhite_E都市钱包年度账单');
		},
		created(){
			this.useId = this.$route.query.ui;
			this.userId = this.$route.query.ui
			if(this.useId){
				this.useId = Base64.decode(this.useId)
			}
			this.getData()
		}
	}
</script>
<style lang="scss">
	.share-bill{
		width: 10.0rem;
		height: 100%;
		position: absolute;
		background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/share_bg.jpg) no-repeat;
		background-size: 100%;
		text-align: center;
		.middle{
			width: 9.32rem;
			height: 13.88rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/share_middle.png) no-repeat;
			background-size: 100%;
			padding-top: .3rem;
		}
		.dialog_commom{
		    position: fixed;
		    left: 0;
		    right: 0;
		    bottom: 0;
		    top: 0;
		    margin: auto;
		    text-align: center;
		    z-index: 1000;
		}
		p{
			font-family: STSongti-SC-Bold;
			font-size: 0.466667rem;
			color: #FFDBC8;
			text-align: center;
			height: 1.133333rem;
			line-height: 1.133333rem;
			margin-bottom: 0.333333rem;
		}
		.share-img{
			width: 7.733333rem;
			height: 7.12rem;
			margin-bottom: 1.55rem;
		}
		.code-img{
			width: 2.633333rem;
			height: 2.633333rem;
			border-radius: 0.2rem;
		}

	}
</style>