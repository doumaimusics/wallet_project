<template>
	<div class="packet_info" :style="fullHeight">
		<div v-title>使用说明</div>
		<div class="top bdr-b">
			<p>平台红包是E都市钱包奖励给用户的电子虚拟礼金，一般可以通过新用户注册、邀请好友、参加平台活动、会员升级等方式获得。</p>
			<p class="p2">当前红包包括：抵扣红包、现金红包、加息券。每次可根据红包具体规则使用。</p>
		</div>
		<div class="contain">
			<div class="box1">
				<div class="box1_title bdr-b" :class="{ico:boxShow.box1}" @click="mainInfoShow('box1')">抵扣红包</div>
				<div v-if="boxShow.box1" class="box1_main">
					<div class="info_title"><span></span>抵扣红包是什么？</div>
					<p>抵扣红包是提供给E都市钱包用户的优惠福利，满足出借条件即可在出借时抵扣现金。</p>
					<div class="info_title"><span></span>抵扣红包如何获取？</div>
					<p>抵扣红包将通过E都市钱包各类活动进行发放，用户可通过参与活动获取。</p>
					<div class="info_title"><span></span>领取抵扣红包后多久到账？</div>
					<p>抵扣红包在领取成功后实时到账。</p>
					<div class="info_title"><span></span>抵扣红包如何使用？</div>
					<p>用户在出借项目时，选择满足使用条件的抵扣红包即可直接抵扣现金，例如：用户出借1万元3个月的项目，同时用户选择了符合条件的100元抵扣红包，则该用户只需支付9900元即可<br>每张抵扣红包仅可使用一次，每次限用一张，仅限本人使用<br>每张抵扣红包均标注有效期，请在有效期内使用，过期讲失效。</p>
				</div>
			</div>
			<div class="box1">
				<div class="box1_title bdr-b" :class="{ico:boxShow.box2}" @click="mainInfoShow('box2')">现金红包</div>
				<div v-if="boxShow.box2" class="box1_main">
					<div class="info_title"><span></span>现金红包是什么？</div>
					<p>现金红包可以点击立即兑换，直接兑换到账户余额，也可以同抵扣红包在出借时使用，抵扣出借金额。</p>
				</div>
			</div>
			<div class="box1">
				<div class="box1_title bdr-b" :class="{ico:boxShow.box3}" @click="mainInfoShow('box3')">加息券</div>
				<div v-if="boxShow.box3" class="box1_main">
					<div class="info_title"><span></span>加息券是什么？</div>
					<p>加息券是提供给E都市钱包用户的优惠福利，满足出借条件即可在项目中获得收益率加成。</p>
					<div class="info_title"><span></span>加息券如何获取？</div>
					<p>加息券将通过E都市钱包各类活动进行发放，用户可通过参与活动获取或兑换。</p>
					<div class="info_title"><span></span>领取加息券后多久到账？</div>
					<p>加息券在领取成功后实时到账 。</p>
					<div class="info_title"><span></span>加息券如何使用？</div>
					<p>用户在出借项目时，选择满足使用条件的加息券即可直接获得加息。<br>每张加息券仅可使用一次，每次限用一张。<br>每张加息券均标注有效期，请在有效期内使用，过期将失效。</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import wxHeader from '../../../../wxHeader';
	import wxToapp from '../../../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				//  适配iPhoneX 添加的行内样式fullHeight imgBox
				fullHeight:{
					height: ''
				},
				boxShow:{
					box1:false,
					box2:false,
					box3:false
				}
			}
		},
		methods:{
			mainInfoShow(name){
				if(this.boxShow[name]){
					for(var x in this.boxShow){
						this.boxShow[x] = false
					}
					this.boxShow[name] = false
				}else{
					for(var x in this.boxShow){
						this.boxShow[x] = false
					}
					this.boxShow[name] = true
				}
				
				
			}

		},
		components:{
			wxHeader
		},
		mounted() {
			var that = this;
			that.fullHeight.height =  document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
	    },
		created() {

		}
	}
</script>
<style lang="scss" scoped>
	.packet_info{
		width: 100%;
		height: 100%;
		background: #ffffff;
		font-family: PingFangSC-Regular;
		.top{
			width: 100%;
			height: 4.4rem;
			padding: 0.4rem;
			position: relative;
			p{
				font-size: 0.373333rem;
				color: #333333;
				text-align: justify;
				text-indent: 0.746667rem;
				line-height: 0.64rem;
			}
			.p2{
				font-family: PingFangSC-Medium;
				padding-top: .4rem;
			}
		}
		.contain{
			position: relative;
			.box1{
				width: 100%;
				background: #ffffff;
				position: relative;
				transition:all 1s ease-in-out; 
				-webkit-transition:all 1s ease-in-out;
				.box1_title{
					width: 9.6rem;
					height: 1.466667rem;
					position: relative;
					font-size: 0.373333rem;
					color: #333333;
					line-height: 1.466667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/v3.3.5/down.png) 8.85rem .55rem no-repeat;
					background-size:0.4rem 0.4rem;
					margin-left: .4rem;
				}
				.box1_title.ico{
					background: url(https://aliyunsso.edspay.com/web/wx/v3.3.5/up.png) 8.85rem .55rem no-repeat;
					background-size:0.4rem 0.4rem;
				}
				.box1_main{
					background: #f8f8f8;
					padding:0.4rem;
					position: relative;
					transition:all 1s ease-in-out; 
					-webkit-transition:all 1s ease-in-out;
					// p{
					// 	font-size: 26px;
					// 	color: #333333;
					// }
					p{
						font-size: 0.346667rem;
						color: #8D8D8D;
						text-align: justify;
						line-height: .6rem;
						margin-bottom: .4rem
					}
					.info_title{
						font-size: 0.373333rem;
						color: #333333;
						height: 0.373333rem;
						margin-bottom: 0.3rem;
						span{
							display: inline-block;
							width: 0.08rem;
							height: 0.266667rem;
							background: #FF5B4C;
							border-radius: 0.04rem;
							margin-right: 0.293333rem;
						}
					}
				}
				
			}

		}
	}
</style>