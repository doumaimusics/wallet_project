<template>
	<div id="safe">
		<div v-title>{{logoMsg}}</div>
		<div v-if="showCentent">
			<div class="portrait bdr-b">
				<input type="file" id="upload1" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg" capture="camera" style="opacity:0;" @change="onFileChange">
				<img :src="userData.avatarUrl ? userData.avatarUrl:userImg" alt="">
				<div class="name">{{userData.hidePhone | appPhoneNum}}</div> 
			</div>
			<div class="level_int clear">
				<router-link to="/wxMyAccount/vipUser" class="bdr-r" tag="div">
					<img src="https://aliyunsso.edspay.com/web/wx/account/accountModify/account_vip_ico.png" alt=""><span class="span1">会员等级</span><span class="span2">{{userData.vipLevel == -1 ? '' : 'V'+userData.vipLevel}}</span>
				</router-link>
				<router-link to="/intRecordDetail" class="" tag="div">
					<img src="https://aliyunsso.edspay.com/web/wx/account/accountModify/account_int.png" alt=""><span class="span1">我的积分</span><span class="span2">{{userData.useScore | moneyFormat(1)}}</span>
				</router-link>
				<!-- <li class="clear" >
					<h4 class="fl">手机号</h4>
					<h5 class="fr">{{userData.hidePhone}}</h5>
				</li> -->
				<!-- <li class="clear realName" @click="goReal" v-if="isCertification">
					<h4 class="fl">实名认证</h4>
					原来的信息userData.realnameStatus ? userData.hideRealname:"去认证"
					<h5 class="fr">已认证</h5>
				</li> -->
			</div>
			<ul class="mt10">
				<router-link to="/wxMyAccount/wxMyCard" class="clear bdr-b hasRight" tag="li">
					<h4 class="fl">银行卡</h4>
				</router-link>
				<li @click="toZS" class="clear zsCard hasRight">
					<h4 class="fl">存管账户</h4>
					<h5 class="fr" :class="{'blue-text':!userData.eCardNo}" v-clipboard:copy="userData.eCardNo" v-clipboard:success="onCopy">{{userData.eCardNo ? '':"未开通"}}</h5>
				</li>
			</ul>
			<ul class="mt10">
				<router-link :to="{path:'/wxRiskAssessment'}" class="clear hasRight" tag="li">
					<h4 class="fl">风险测评</h4>
					<h5 class="fr" :class="{'blue-text':userData.riskLevel=='未测评'}">{{userData.riskLevel}}</h5>
				</router-link>
			</ul>
			<ul class="mt10">
				<!-- 微信客服 -->
					<a :href="hrers">
						<li class="clear bdr-b hasRight">
							<h4 class="fl">意见反馈</h4>
						</li>
					</a>
					<router-link :to="{path:'/wxMyAccount/wxSetting'}" class="clear hasRight" tag="li">
						<h4 class="fl">设置</h4>
					</router-link>
			</ul>
			<div @click="quit" class="btn">安全退出</div>
		</div>
	</div>
</template>

<script>
	import lrz from 'lrz'
	import wxToast from '../../../../common/wx/wxToast';
	import { MessageBox } from 'mint-ui';	//引入带有按钮的提示框
	export default {
		mixins:[wxToast],

		data(){
			return {
				showCentent:false,
				logoMsg:'账户设置',
				// userImg:'https://aliyunsso.edspay.com/web/wx/account/bigPortrait.png',
				userImg:'https://aliyunsso.edspay.com/web/wx/account/head.png',
				userData:{},
				zsCode:'',
				isCertification:0,  // 是否显示实名认证0、 不显示 1、 显示
				hrers:''
			}
		},
		methods:{
			toZS(){
				if(!this.userData.eCardNo){
					if(this.userData.czbShowFlag){
						this.$router.push('/wxDepository');
					}else{
						this.$router.push('/wxMyAccount/wxZSwait')
					}
				}else{
					this.$router.push('/wxMyAccount/wxRealMsg');
				}
			},
			onFileChange(e){
				var files = e.target.files || e.dataTransfer.files;
				lrz(files[0], { width: 480 }).then((rst) => {
				    this.postData('/user/uploadUserHeadImage',(res,data) =>{
				      if(data.resCode){
				        this.toast({text:'修改头像成功'});
						this.userData.avatarUrl = rst.base64
				      }
				    },{image:rst.base64},1)
				}).always(function() {
				    // 清空文件上传控件的值
				    e.target.value = null;
				});
			},
			goReal(){
				if(!this.userData.realnameStatus){
					this.$router.push('/wxMyAccount/wxRealname');
				}else{
					this.$router.push('/wxMyAccount/wxRealMsg');
				}
			},
			quit(){
				var that = this;

				MessageBox.confirm('确定要登出当前账号?').then(action => {
					
					this.$http.post(that.ajaxUrl.getUrl(2)+'/user/logout',{token:that.getCookie('userToken')})
	      			.then((res) => {   
	      				console.log(res)
				        that.delCookie('userToken')
				        that.delCookie('zsOpenStatus')
				        that.delCookie('bkOpenStatus')
				        that.delCookie('generalSw')
				        that.delCookie('nickname')
				        that.delCookie('userId')
				        if(res.body.resCode == 1){
	 						that.$router.push({path:'/wxLogin'})
				        }else{
				        	that.toast({text:'退出登录失败'})
				        }
				    }, (response) => {    
				        // 响应错误回调
				    }); 
				  	
				});
			},
			goCard(){
				if(1) this.$router.push('/wxMyAccount/wxMycard');
				else this.$router.push('/wxMyAccount/wxBindingCard')
			},
			onCopy (e) {
				if(this.zsCode){
					this.toast({
						text: '复制成功'
					})
				}
			},
		},
		components:{
			
		},
		created(){
			var that = this;
			this.postData('/account/securityInfo',function(res){
				console.log(res)
				that.showCentent = true;
				if(res.body.resCode == 1){
					that.userData = res.body.resData.model;
					that.zsCode = res.body.resData.model.eCardNo;
					if(that.userData.bankOpenStatus == 2 || that.userData.bankOpenStatus == 3){  // 是否显示实名认证0、 不显示 1、 显示
						that.isCertification = 1;
					} else {
						that.isCertification = 0;
					}
				}else{
					that.$router.push('/wxLogin')
				}
			},{},1)

			//客服
			var timeamp = new Date().getTime()
            if(this.getCookie('nickname')){
              var qiMoName = this.getCookie('nickname') ? this.getCookie('nickname') : "游客"
              var qiMoId = this.getCookie('userId') ? this.getCookie('userId') : timeamp;
              this.hrers = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":'+qiMoName +'}&customField={"nickName":'+ qiMoName +'}&clientId='+ qiMoId;
            }else{
              this.hrers = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":"游客"}&customField={"nickName":"游客"}&clientId='+timeamp;
            }
		}
	}
</script>

<style lang="scss" scoped>
	#safe{
		color:#333;
		.blue-text {
			color: #FF5B4C;
		}
		.portrait{
			margin:0.266667rem 0 0;
			height:1.866667rem;
			background:#fff;
			padding:0 0.4rem;
			background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9.3rem .8rem  no-repeat;
			background-size:0.213333rem 0.346667rem;
			position:relative;
			img{
				float: left;
				height:1.066667rem;
				width:1.066667rem;
				margin:0.48rem 0.293333rem 0 0;
				border-radius: 50%;
			}
			.name{
				line-height:1.866667rem;
				font-size:0.426667rem;
			}
			input{
				height:1.866667rem;
				width:93%;
				position:absolute;
				border:1px solid #000;
				z-index:10;
			}
		}
		.level_int{
			height: 1.333333rem;
			padding-top: 0.293333rem;
			background: #ffffff;
			div{
				width: 50%;
				float: left;
				height: 0.733333rem;
				line-height: 0.733333rem;
				position: relative;
				padding-left: 0.4rem;
				img{
					width: 0.373333rem;
					height: 0.373333rem;
					display: inline-block;
					margin-right: 0.213333rem
				}
				span.span1{
					font-size: 0.32rem;
					color: #808080;
					margin-right: 0.213333rem;
				}
				span.span2{
					font-size: 0.373333rem;
					color: #333333;
				}
			}
		}
		.mt10 {
			margin-top:0.266667rem;
		}
		ul{
			background:#fff;
			padding-left:0.4rem;
			li{
				height:1.466667rem;
				font-size: 0.426667rem;
				color: #333333;
				line-height:1.466667rem;
				padding-right: 0.4rem;
				position: relative;
				h5{
					font-size: 0.346667rem;
					color: #808080;
					padding-right:0.466667rem;
				}
			}
			.realName{
				background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9rem 0.55rem  no-repeat;
				background-size:0.213333rem 0.346667rem;
			}
			.hasRight{
				background:#fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 9rem 0.55rem  no-repeat!important;
				background-size:0.213333rem 0.346667rem!important;
				a {
					display: inline-block;
				}
			}
			.zsCard{
				background:#fff;
				padding-right:0.4rem;
			}

		}
		.btn{
			margin-top: 0.533333rem;
			height:1.386667rem;
			background:#fff;
			text-align: center;
			font-size:0.426667rem;
			line-height:1.386667rem;
			color: #333;
		}
	}
</style>