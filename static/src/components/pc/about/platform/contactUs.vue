<template>
	<div class="contactUs">
		<!-- <div class="banner"></div> -->
		<div class="title" style="margin-top: 40px;">人工服务</div>
		<div class="service">
			<p>
				<span>咨询、投诉、举报电话：{{hotLine}}</span>
				<span class="span_text1">工作日9:00-20:30 法定节假日9:00-17:30</span>
			</p>

			<p>
				<span>客服邮箱：edskf@edspay.com</span>
				<!-- <span>收到邮件后，我们的工作人员会尽快与您联系</span> -->
			</p>
			<!-- <p>
				<span>官方QQ交流群：</span>
				<span>
					<el-tooltip effect="light" placement="right-start">
						<div slot="content"><img :src="qrCode.qqUrl" alt="" id="QQ"></div>
						<el-button>E都市钱包VIP客户群</el-button>
					</el-tooltip>
				</span>
			</p> -->
		</div>
		<div class="title">官方渠道</div>
		<div class="platform">
			<!-- <p>您也可以通过平台的官方渠道随时关注E都市钱包动态或与我们互动</p> -->
			<div class="website">
				公司官方网址：
				<a href="https://www.edspay.com">www.edspay.com</a>
			</div>
			<div class="APP">
				移动app应用：
				<el-tooltip effect="light" placement="right-start">
					<div slot="content"><img :src="qrCode.appUrl" alt="" id="QQ"></div>
					<el-button>E都市钱包APP</el-button>
				</el-tooltip>
			</div>
			<div class="WX">
				微信订阅号：
				<el-tooltip effect="light" placement="right-start">
					<div slot="content"><img :src="qrCode.weixinUrl" alt="" id="QQ"></div>
					<el-button>E都市钱包</el-button>
				</el-tooltip>
			</div>
			<div class="weibo">
				官方微博：
				<a href="https://weibo.com/EDSpay">https://weibo.com/EDSpay</a>
			</div>
			<div class="weibo">
				官方QQ群：
				<span>823115779、823074419</span>
			</div>
		</div>
		<div class="title">商务合作</div>
		<p class="business">如果您有意向与我们合作，请将采访提纲或合作方式等资料发送到下方邮箱，我们的工作人员会尽快与您联系；</p>
		<p class="business">商务合作邮箱：edshz@edspay.com</p>
		<!-- <div class="title">运营地址</div>
		<p class="business">地址：杭州市滨江区西兴街道江陵路2028号星耀城1幢402室</p>
		<p class="business">电话：{{hotLine}}</p>
		<img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/map.png" alt="" id="map"> -->
	</div>
</template>

<script>
export default {
	name: 'contactUs',
	// metaInfo: {
    //     title: '联系我们_E都市钱包联系我们_E都市钱包_让您安心的出借理财平台', // set a title
    //     meta: [{                 // set meta
    //       name: 'keywords',
    //       content: 'E都市钱包，联系我们，E都市钱包官网，E都市钱包客服电话，E都市钱包地址，出借理财,个人理财,互联网金融，出借，P2P理财'
    //     },{
    //         name: 'description',
    //         content: 'E都市钱包联系地址：浙江省杭州市滨江区星耀城，E都市钱包客服电话：400-135-3388'
    //     },{
    //         name: 'baidu-site-verification',
    //         content: 'ASl9m3ghF3'
    //     }]
    // },
	data() {
		return {
			qrCode: {},                // 后台返回的头部脚步信息
			hotLine: ''
		}
	},
	methods: {
		linkes() { // 头部和脚步的二维码和友情链接地址
			let _this = this
			this.$http.post(this.ajaxUrl.getUrl(1) + "/index/links").then((data) => {
				if (data.body.resCode == 1) {
					_this.qrCode = data.body.resData.data.qrCode
					_this.hotLine = data.body.resData.data.hotLine
				} else {

				}
			}, (rest) => {
				// 响应错误回调
			})
		},
	},
	mounted: function() {
		this.linkes()
	}
}  
</script>

<style lang="scss">
.contactUs {
	width: 100%;
	height: auto;
	padding-bottom: 35px;
	.banner {
		width: 900px;
		height: 219px;
		background: url(https://aliyunsso.edspay.com/web/about/contactBanner.png);
		background-size: 100% 100%;
		margin-left: -6px;
	}
	.title {
		width: 100%;
		height: 34px;
		font-family: PingFangSC-Semibold;
		line-height: 34px;
		font-size: 20px;
		font-weight: 500;
		text-align: left;
		color: #333333;
		margin: 80px 0 30px 35px;
		i {
			display: inline-block;
			width: 4px;
			height: 24px;
			background: #fc4147;
			margin-top: 4px;
			margin-right: 10px;
			vertical-align: top;
		}
	}
	.title.b-8 {
		margin-bottom: 8px;
	}
	.title.t-30 {
		margin-top: 30px;
	}
	.service {
		width: 100%;
		padding: 0 35px;
		overflow: hidden;
		p {
			// width: 50%;
			// height: 52px;
			// float: left;
			margin-bottom: 20px;
			font-family: PingFangSC;
			font-size: 16px;
			color: #333333;
			span {
			
				.el-button {
					border: 0px;
					padding: 0;
					color: #7ac5ff;
				}
			}
			span.span_text1{
				color: #999;
				margin-left: 20px;
			}
			img {
				width: 100px;
			}
		}
		p:nth-child(3) {
			margin-bottom: 0px;
		}
	}
	.platform {
		width: 100%;
		padding: 0 36px;
		overflow: hidden;
		p {
			width: 100%;
			height: 17px;
			font-family: PingFangSC;
			font-size: 12px;
			text-align: left;
			color: #666666;
			margin-bottom: 30px;
		}
		.website,
		.APP,
		.WX,
		.weibo {
			width: 100%;
			height: 20px;
			font-family: PingFangSC;
			font-size: 16px;
			text-align: left;
			color: #333333;
			margin-bottom: 12px;
			span{
				height: 20px;
				color: #5496E3;
				font-size: 14px;
			}
			.el-button {
				border: 0px;
				padding: 0;
				color: #5496E3;
			}
			a {
				height: 20px;
				color: #5496E3;
				font-size: 14px;
			}
		}
	}
	p.business {
		width: 100%;
		font-size: 16px;
		color: #333333;
		line-height: 30px;
		font-family: PingFangSC;
		text-align: left;
		margin-bottom: 12px;
		padding: 0 40px;
	}
	#map {
		display: block;
		width: 845px;
		height: 362px;
		// margin: 0 auto;
		margin-top: 32px;
		margin-left: 40px;
	}
}

#QQ {
	width: 100px;
}
</style>