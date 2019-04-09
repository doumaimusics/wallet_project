<template>
	<div id="guide">
		<div v-title>新手指引_E都市钱包_让您安心的出借理财平台</div>
    	<div v-keywords>E都市钱包、新手指引、个人理财、新手福利、P2P理财、互联网金融</div>
		<div class="banner">
		</div>
		<div class="topIcon">
			<div class="title1"></div>
			<div class="span">
				<p>E都市钱包（www.edspay.com），是浙江领先的互联网金融服务平台，办公地址位于杭州市滨江区，运营主体为浙江楚橡信息科技有限公司，注册资本一亿元人民币（实缴）。</p>
				<p>E都市钱包是一家专注消费金融小额分散债权、为用户提供消费分期类金融资产信息中介和借贷信息撮合的互联网金融服务平台，致力于为中产及白领提供小额分散安全的互联网金融服务。</p>
				<p>E都市钱包借款人全部来源于浙江阿拉丁电子商务股份公司旗下运营的消费金融平台爱上街，通过基于电商消费的金融服务撮合，共同构建具备金融生态的业务闭环。E都市钱包坚持互联网技术与人工智能相结合，为用户提供全方位的互联网金融服务，让所有人都能享受普惠金融发展带来的时代红利。</p>
			</div>
			<div class="title2"></div>
			<div class="icon">
				<div class="icon1"></div>
				<div class="icon2"></div>
				<div class="icon3"></div>
			</div>
			<div class="btn1" @click="enroll"></div>
		</div>
		<div class="theme">
			<div class="title3"></div>
			<div class="span1">E都市钱包所有出借标的均为消费分期类业务资产债权包，所有用户的出借资金将分散至多个借款人的借款项目中，将因借款人逾期而产生的坏账风险率降至最低，从平台业务模式上全方位确保出借人的出借安全。</div>
			<div class="title4"></div>
			<div class="imgBox"><img src="https://aliyunsso.edspay.com/web/credibility/chart1.png" alt=""></div>
			<div class="title5"></div>
			<div class="span2">
				<p> E都市钱包专注于消费金融小额分散债权，出借人与借款人均为真实有效用户，所有资金均由全国性股份制商业银行浙商银行存管，平台仅提供信息撮合服务。</p>
				<p> E都市钱包基于大数据与金融科技自主研发蜂巢风控系统，通过200多个风险数据全方位分析，保障用户资金、数据安全。</p>
				<!-- <p>E都市钱包建立了总额3000万元的风险备付金制度，对逾期项目先行垫付或赔付，降低出借风险，保障用户权益。</p> -->
			</div>
			<div class="rotate">
				<ul>
					<li>
						<div class="pic guide1"></div>
						<h3>浙商银行存管</h3>
					</li>
					<li>
						<div class="pic guide2"></div>
						<h3>消费分期类资产</h3>
					</li>
					<li>
						<div class="pic guide3"></div>
						<h3>智能小额分散出借</h3>
					</li>
					<li>
						<div class="pic guide4"></div>
						<h3>蜂巢风控系统</h3>
					</li>
					<li>
						<div class="pic guide5"></div>
						<h3>信息披露透明</h3>
					</li>
				</ul>
			</div>
		</div>
		<div class="financial">
			<div class="title6"></div>
			<div class="title7"></div>
			<div class="swripe">
				<div class="el-carousel__arrow el-carousel__arrow--left" @click="$refs.swipe.prev()">
					<i class="el-icon-arrow-left"></i>
				</div>
				<el-carousel :autoplay="false" height="420px" ref="swipe">
					<el-carousel-item v-for="item in guideSwipe">
						<img :src="item" alt="">
					</el-carousel-item>
				</el-carousel>
				<div class="el-carousel__arrow el-carousel__arrow--right" @click="$refs.swipe.next()">
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
			<div class="btn2" @click="enroll"></div>
		</div>
		<div class="erweima">
			<ul>
				<li><h3>微信公众号</h3></li>
				<li><h3>下载E都市钱包</h3></li>
				<li><h3>下载爱上街</h3></li>
			</ul>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			guideSwipe:['https://aliyunsso.edspay.com/web/credibility/guideSwipe1.png','https://aliyunsso.edspay.com/web/credibility/guideSwipe2.png','https://aliyunsso.edspay.com/web/credibility/guideSwipe3.png','https://aliyunsso.edspay.com/web/credibility/guideSwipe4.png','https://aliyunsso.edspay.com/web/credibility/guideSwipe5.png','https://aliyunsso.edspay.com/web/credibility/guideSwipe6.png','https://aliyunsso.edspay.com/web/credibility/guideSwipe7.png'],
		}
	},
	methods: {
		enroll(){
			this.$router.push("/register")
		}
	},
}  
</script>

<style lang="scss">
#guide {
	width: 100%;
	height: auto;
	background: #fff;
	position: relative;
	z-index: 500;
	.banner {
		width: 100%;
		height: 956px;
		background: url("https://aliyunsso.edspay.com/web/credibility/bannerBg1.png") center center;
		background-size: 1920px 100%;
		min-width: 1200px;
	}
	.topIcon {
		width: 100%;
		height: 1320px;
		.title1 {
			width: 1200px;
			height: 62px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title1.png") center center no-repeat;
			background-size: 334px 62px;
		}
		div.span {
			width: 1200px;
			height: 265px;
			margin: 0 auto;
			padding: 0 35px;
			margin-top: 40px;
			margin-bottom: 115px;
			p {
				font-family: PingFangSC;
				font-size: 18px;
				letter-spacing: 0.9px;
				text-align: justify;
				color: #666666;
				text-indent: 2em;
				line-height: 38px;
				margin-top: 36px;
			}
			p:nth-child(1) {
				margin-top: 0;
			}
		}
		.title2 {
			width: 1200px;
			height: 138px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title2.png") center center no-repeat;
			background-size: 448px 138px;
			margin-bottom: 70px;
		}
		.icon {
			width: 1200px;
			height: 255px;
			margin: 0 auto 138px;
			padding: 0 25px;
			.icon1,
			.icon2,
			.icon3 {
				float: left;
				width: 259px;
				height: 255px;
				background: url("https://aliyunsso.edspay.com/web/1118/new1118.png") center center no-repeat;
				background-size: 100% 100%;
			}
			.icon2 {
				background: url("https://aliyunsso.edspay.com/web/credibility/icon22.png") center center no-repeat;
				background-size: 100% 100%;
				margin-left: 186.5px;
			}
			.icon3 {
				background: url("https://aliyunsso.edspay.com/web/credibility/icon3.png") center center no-repeat;
				background-size: 100% 100%;
				float: right;
			}
		}
		.btn1 {
			width: 1200px;
			height: 127px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/btn1.png") center center no-repeat;
			background-size: 441px 127px;
		}
	}
	.theme {
		width: 100%;
		height: 1817px;
		background: #fffaf4;
		padding-top: 90px;
		.title3 {
			width: 1200px;
			height: 60px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title3.png") center center no-repeat;
			background-size: 405px 60px;
			margin-bottom: 50px;
		}
		.span1 {
			width: 1120px;
			height: 67px;
			margin: 0 auto;
			margin-bottom: 35px;
			font-family: PingFangSC;
			font-size: 20px;
			letter-spacing: 1px;
			color: #666666;
			text-indent: 2em;
			line-height: 33px;
		}
		.title4 {
			width: 1200px;
			height: 129px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title4.png") center center no-repeat;
			background-size: 330px 129px;
			margin-bottom: 97px;
		}
		.imgBox {
			width: 796px;
			height: 408px;
			margin: 0 auto;
			margin-bottom: 70px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.title5 {
			width: 1200px;
			height: 129px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title5.png") center center no-repeat;
			background-size: 330px 129px;
			margin-bottom: 90px;
		}
		.span2 {
			width: 1115px;
			height: 183px;
			margin: 0 auto;
			margin-bottom: 90px;
			p {
				font-family: PingFangSC;
				font-size: 20px;
				letter-spacing: 1px;
				color: #666666;
				text-indent: 2em;
				line-height: 36px;
			}
		}
		.rotate {
			width: 1115px;
			height: 200px;
			margin: 0 auto;
			ul {
				width: 100%;
				height: 100%;
				li {
					float: left;
					width: 20%;
					height: 100%;
					.pic {
						width: 100%;
						height: 138px;
						background: url("https://aliyunsso.edspay.com/web/credibility/guide1.png") center center no-repeat;
						background-size: 138px 138px;
						transition: all 1s ease;
					}
					.guide2 {
						background: url("https://aliyunsso.edspay.com/web/credibility/guide2.png") center center no-repeat;
						background-size: 138px 138px;
					}
					.guide3 {
						background: url("https://aliyunsso.edspay.com/web/credibility/guide3.png") center center no-repeat;
						background-size: 138px 138px;
					}
					.guide4 {
						background: url("https://aliyunsso.edspay.com/web/credibility/guide4.png") center center no-repeat;
						background-size: 138px 138px;
					}
					.guide5 {
						background: url("https://aliyunsso.edspay.com/web/credibility/guide5.png") center center no-repeat;
						background-size: 138px 138px;
					}
					h3 {
						width: 100%;
						height: 28px;
						font-family: PingFangSC;
						font-size: 20px;
						text-align: center;
						line-height: 28px;
						color: #666666;
						margin-top: 33px;
					}
				}
				li:hover .pic {
					transform: rotateY(180deg);
				}
			}
		}
	}
	.financial {
		width: 100%;
		height: auto;
		padding-top: 90px;
		.title6 {
			width: 1200px;
			height: 60px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title6.png") center center no-repeat;
			background-size: 508px 60px;
			margin-bottom: 53px;
		}
		.title7 {
			width: 1200px;
			height: 71px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title7.png") center center no-repeat;
			background-size: 349px 71px;
			margin-bottom: 60px;
		}
		.swripe {
			width: 1150px;
			height: 420px;
			margin: 0 auto;
			position: relative;
			margin-bottom: 88px;
			.el-carousel__arrow {
				width: 59px;
				height: 123px;
				background-color: #ffc73c;
				border-radius: 0;
				i {
					height: 100%;
					width: 100%;
					text-align: center;
					line-height: 123px;
					font-size: 32px;
				}
			}
			.el-carousel {
				width: 903px;
				height: 420px;
				margin: 0 auto;
				img{
					height: 100%;
					width: 100%;
				}
			}
			.el-carousel__arrow,
			.el-carousel__indicators {
				/** 切换箭头和指示器的层级调低让其不出现 **/
				z-index: 1;
			}
		}
		.title8 {
			width: 1200px;
			height: 71px;
			margin: 0 auto;
			background: url("https://aliyunsso.edspay.com/web/credibility/title8.png") center center no-repeat;
			background-size: 376px 71px;
			margin-bottom: 70px;
		}
		.introduction {
			width: 1200px;
			height: 520px;
			padding-top: 60px;
			margin: 0 auto;
			margin-bottom: 87px;
			ul {
				width: 100%;
				height: 415px;
				margin-top: 35px;
				background-color: #ffffff;
				li {
					width: 300px;
					height: 100%;
					padding: 0 33px;
					float: left;
					position: relative;
					top: 0;
					left: 0;
					.lable {
						width: 70px;
						height: 32px;
						position: absolute;
						top: -6px;
						left: 217px;
						background: url(https://aliyunsso.edspay.com/web/home/lable.png) center center no-repeat;
						font-size: 14px;
						text-align: center;
						color: #ffffff;
						line-height: 32px
					}
					.icon {
						width: 120px;
						height: 120px;
						margin: 55px auto 0;
						img {
							width: 100%;
							height: 100%;
						}
					}
					.financialName {
						width: 100%;
						height: 33px;
						font-family: PingFangSC;
						font-size: 24px;
						font-weight: 500;
						letter-spacing: 0.2px;
						text-align: center;
						color: #333333;
						margin-top: 30px;
					}
					.explain {
						width: 100%;
						font-size: 16px;
						line-height: 25px;
						letter-spacing: 0.2px;
						text-align: center;
						color: #333333;
						margin-top: 24px;
						padding: 0 12px
					}
				}
				li:hover {
					width: 288px;
					height: 415px;
					padding: 0 33px;
					margin: 10px 6px;
					background-color: #ffffff;
					box-shadow: 0 4px 30px 0 rgba(83, 180, 255, 0.16);
				}
			}
		}
		.btn2 {
			width: 1200px;
			height: 127px;
			margin: 0 auto 78px;
			background: url("https://aliyunsso.edspay.com/web/credibility/btn2.png") center center no-repeat;
			background-size: 441px 127px;
		}
	}
	.erweima {
		width: 100%;
		height: 420px;
		background-color: #fffaf4;
		ul {
			width: 1150px;
			height: 420px;
			position: relative;
			left: 50%;
			margin-left: -575px;
			li {
				float: left;
				width: 33.33%;
				height: 100%;
				background: url("https://aliyunsso.edspay.com/web/credibility/wx1.png") center center no-repeat;
				background-size: 246px 246px;
				position: relative;
				h3 {
					position: absolute;
					top:355px;
					width: 100%;
					height: 28px;
					font-family: PingFangSC;
					font-size: 20px;
					font-weight: 600;
					text-align: center;
					color: #333333;
				}
			}
			li:nth-child(2) {
				background: url("https://aliyunsso.edspay.com/web/credibility/edsApp1.png") center center no-repeat;
				background-size: 246px 246px;
			}
			li:nth-child(3) {
				background: url("https://aliyunsso.edspay.com/web/credibility/ashangjie.png") center center no-repeat;
				background-size: 246px 246px;
			}
		}
	}
	/** 临时样式 **/
	.el-carousel__item h3 {
		color: #475669;
		font-size: 18px;
		opacity: 0.75;
		line-height: 420px;
		margin: 0;
	}

	.el-carousel__item:nth-child(2n) {
		background-color: #99a9bf;
	}

	.el-carousel__item:nth-child(2n+1) {
		background-color: #d3dce6;
	}
}
</style>