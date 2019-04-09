<template>
	<div id="footerCon" :style="{marginTop:footTop+'px'}">
		<div id="footer" class="footer-content">
			<div class="footer-con clear">
				<ul class="link fl">
					<li class="link-list fl">
						<div class="title">关于我们<!-- <i></i> --></div>
						<ul class="text">
							<router-link to="/info/about/abstract?num=0" tag="li">平台简介</router-link>
							<router-link to="/info/disclosure?num=2" tag="li">基本信息</router-link>
							<router-link to="/info/about/abstract?num=2" tag="li">资质证书</router-link>
							<router-link to="/info/dynamic/coverage?num=0" tag="li">媒体报道</router-link>
							<router-link to="/info/notice/announcement?num=0" tag="li">网站公告</router-link>
						</ul>
					</li>
					<li class="link-list fl">
						<div class="title">信息披露<!-- <i></i> --></div>
						<ul class="text">
							<router-link to="/info/notice/laws" tag="li">法律法规</router-link>
							<router-link to="/info/security/custody?num=0" tag="li">银行存管</router-link>
							<router-link to="/info/security/custody?num=1" tag="li">保障措施</router-link>
						</ul>
					</li>
					<li class="link-list fl">
						<div class="title">用户中心<!-- <i></i> --></div>
						<ul class="text">
							<router-link to="/guide" tag="li">新手指引</router-link>
							<router-link to="/info/contactUs?num=0" tag="li">联系我们</router-link>
							<!-- <router-link to="/websiteMap" tag="li">网站地图</router-link> -->
							<li @click="toInvite">邀请有礼</li>
						</ul>
					</li>
					<li class="link-list fl friendship">
						<div class="title">友情链接<!-- <i></i> --></div>
						<ul class="text">
							<li v-for="(item, index) in links"><a :href="item.url" :title="item.title" v-if='index < 8'>{{item.title}}</a></li>
						</ul>
					</li>
					<li class="link-list fl friendship">
						<div class="title">全国热线：<!-- <i></i> --></div>
							<div class="phone">400-135-3388</div>
							<p class="workday">工作日：9:00-20:30</p>
							<p class="workday">法定节假日：9:00-17:30</p>
					</li>
				</ul>
				<!-- <div class="line fl"></div> -->
				<div class="attention fl">
					<div class="name clear">
						<span class="title">关注我们</span><span>E都市钱包 好资产 更分散</span>
					</div>
					<div class="imgs fl">
						<div class="img fl">
							<img src="https://aliyunsso.edspay.com/web/home/pcHome/wxCode.jpg" alt="">
							<p>官方微信</p>
						</div>
						<div class="img fl" style="margin-left: 10px;">
							<img src="https://aliyunsso.edspay.com/web/home/pcHome/donCode.png" alt="">
							<p>APP下载</p>
						</div>
					</div>	
				</div>
			<!--	<div class="line fl"></div>
			 	<div class="contact fl">
					<div class="contact-top clear">
						<i class="iconfont fl">&#xe672;</i>
						<div class="content fl">
							<div class="name">全国服务热线：</div>
							<div class="phone">400-135-3388</div>
							<p>工作日：9:00-20:30</p>
							<p>法定节假日：9:00-17:30</p>
						</div>
					</div>

					暂停的企点客服
					<div  class="botton" id="kefuYeJiao">在线客服</div>

					<div  @click='kefu' class="botton">在线客服</div>
				</div> -->
			</div>
		</div>
		<div class="footerBottom">
			<div class="InsideWidth">
				<div class="copyRight">
					<p>Copyright@2018 版权所有：浙江楚橡信息科技有限公司
						<em></em>ICP备案号：浙ICP备16001312号-3
						</br>
						<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33010502002733">
							<span>浙公网安备 33010502002733号</span>
						</a>
						<em></em>
						<a target="_blank" href="/#/license">
							<span>ICP经营许可证编号：浙B2-20170412</span>
						</a>
						<em></em>参考年化收益不代表实际收益，出借需谨慎
					</p>
				</div>
				<div class="qualifications">
					<ul id="aptitude">
						<li>
							<a id="_pingansec_bottomimagelarge_p2p" target="_blank" href="http://si.trustutn.org/info?sn=488160920000527012968&certType=4">
								<img src="https://aliyunsso.edspay.com/web/home/p2p_bottom_large_img.jpg" />
							</a>
						</li>
						<li>
							<a id='___szfw_logo___' href='https://credit.szfw.org/CX20161116027356551696.html' target='_blank' @contextmenu.prevent='context'><img src='https://aliyunsso.edspay.com/web/about/cert.png' border='0' /></a>
						</li>
						<li>
							<span id="kx_verify">

							</span>
						</li>
						<li id="anquan">
							<a target="_blank" href="https://v.pinpaibao.com.cn/cert/site/?site=www.edspay.com&at=realname"><img src="https://static.anquan.org/static/outer/image/sm_124x47.png"></a>
						</li>
						<li>
							<a target="_blank" href="https://sealsplash.geotrust.com/splash?&dn=*.edspay.com"><img src="https://aliyunsso.edspay.com/web/about/ssl-valid-en-M.gif"></a>
						</li>
					</ul>
				</div>
		
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'footerContent',
	data() {
		return {
			footTop:0,
			qrCode: [],                // 后台返回的脚步关注我们信息
			hotLine: '',
			links: '',
			tooltipbFooter:['E都市钱包app','E都市钱包微博','E都市钱包公众号','E都市钱包QQ群'],    // 关注我们

		}
	},
	props:['showHeader'],
	methods: {
		toInvite(){
			if(this.getCookie('token')){
			    this.$router.push({path:'/myAccount/myNewInvatation'});
			}else{
			    this.$router.push({path:'/login'});
			}
		},
		// 小能客服
		kefu: function() {
			NTKF.im_openInPageChat('kf_9511_1488165613968');
		},
		linkes() { // 头部和脚步的二维码和友情链接地址
			let _this = this
			this.$http.post(this.ajaxUrl.getUrl(1) + "/index/links").then((data) => {
				if (data.body.resCode == 1) {
					_this.qrCode.push(data.body.resData.data.qrCode.appUrl)
					_this.qrCode.push(data.body.resData.data.qrCode.weiboUrl)
					_this.qrCode.push(data.body.resData.data.qrCode.weixinUrl)
					_this.qrCode.push(data.body.resData.data.qrCode.qqUrl)
					_this.hotLine = data.body.resData.data.hotLine
					_this.links = data.body.resData.data.links
				} else {

				}
			}, (rest) => {
				// 响应错误回调
			})
		},
		context() {

		},
		fullScreen() {
			let fTopHeight = $("#footerCon").height()   // 底部高度
			let footVal = $("#footerCon").offset().top  // 底部相对顶部高度
			let allHeight = $(window).height()       // 浏览器屏幕可见高度
			let diffVal = (footVal + fTopHeight) - allHeight          //高度差
			Number(diffVal) < 0 ? this.footTop = -diffVal : this.footTop = 0
			if(this.$route.path == "/register" || this.$route.path == "/login" || this.$route.path == "/retrievePwd") this.footTop = 0
		},
		verify() {
			const _kxs = document.createElement('script');
			_kxs.id = 'kx_script';
			_kxs.async = true;
			_kxs.setAttribute('cid', 'kx_verify');
			_kxs.src = ('https:' == document.location.protocol ? 'https://ss.knet.cn' : 'http://rr.knet.cn') + '/static/js/icon3.js?sn=e16102833010065027o9jq000000&tp=icon3';
			_kxs.setAttribute('size', 0);
			var _kx = document.getElementById('kx_verify');
			_kx.parentNode.insertBefore(_kxs, _kx);
		}
	},
	mounted: function() {
		this.linkes()
		this.verify()
	},
	watch: {
		'$route'() {
			setTimeout(()=>{
				this.fullScreen()
			},500)
		}
    }
}  
</script>

<style lang="scss" scoped>
	.footer-content{
		height:281px;
		padding-top:49px;
		background:#F8F8F8;
		.footer-con{
			width:1200px;
			margin:0 auto;
			.title{
				font-size:16px;
				line-height:22px;
				padding-bottom:17px;
				color: #FFFFFF;
				// border-bottom: 1px dashed #ccc;
				position: relative;
				i{
					position: absolute;
					height:2px;
					width:30px;
					background:#FE3E41;
					bottom:0;
					left:0;
				}
			}
			.link{
				 width:960px;
				.link-list{
					width:76px;
					margin-right:65px;
					.text{
						li{
							cursor: pointer;
							font-size: 14px;
							line-height:20px;
							padding-top:8px;
							color: #C0C0C0;
						}
						 li:hover {
							color: #F31B23;
						}
					}
					.phone{
                         font-size: 20px;
						color: #FFFFFF;
					}
					.workday{
						font-size: 14px;
                        color: #C0C0C0;
						margin: 8px 0;
					}
				}
				.link-list:last-child{
					margin: 0;
				}
				.friendship{
					width:200px;
					li{
						float: left;
					}
					li:nth-of-type(odd){
						width:90px;
					}
				}
			}
			.line{
				height:180px;
				width:1px;
				background:#ccc;
			}
			.attention{
				// padding-left:50px;
				width:240px;
				.name{
					width: 100%;
					text-align: right;
					font-size: 12px;
						color: #C0C0C0;
					.title{
						font-size: 16px;
                        color: #FFFFFF;
						margin-right: 5px;
					}
				}
				.imgs{
					padding-top:14px;
					padding-left: 30px;
					width: 100%;
					.img{
						width: 96px;
						height: 96px;
						background: #fff;
						text-align:center;
						padding-top: 6px;
						img{
							height:84px;
							width:84px;
						}
						p{font-size:12px;
						margin-top: 15px;
						color: #C0C0C0;
						}
					}
				}
			}
			.contact{
				padding-left:39px;
				.contact-top{
					padding-bottom:10px;
					border-bottom: 1px dashed #CCCCCC;
					.iconfont{
						height:60px;
						width:60px;
						font-size:60px;
						color:#666;
						margin-right:14px;
						position: relative;
						top:-5px;
					}
					.content{
						color:#666;
						.name{font-size:16px;line-height:22px;}
						.phone{font-size:26px;line-height:38px;padding:1px 0 5px 0;}
						p{font-size:14px;line-height:20px;padding-bottom:5px;color:#999;}
					}
				}
				.botton{
					height:40px;
					width:192px;
					border:1px solid #F5343B;
					border-radius:20px;
					margin:18px auto;
					font-size:16px;
					line-height:38px;
					color:#F31B23;
					text-align:center;
					cursor:pointer;
				}
				.botton:hover{
					background:#F5343B;
					color:#fff;
				}
			}
		}
	}
</style>

<style lang="scss">
#footerCon {
	width: 100%;
	background-color: #333;
	height: 410px;
	min-width: 1190px;
	#footer {
		width: 100%;
		background-color: #333333;
		height: 280px;
		.InsideWidth {
			width: 1190px;
			height: 100%;
			margin: 0 auto;
			overflow: hidden;
			.footerLeft {
				width: 800px;
				height: 170px;
				margin: 60px auto 0;
				float: left;
				border-right: 1px solid #d7d7d7;
				.friendship {
					width: 210px;
					height: 100%;
					float: left;
					.titleName {
						width: 100%;
						height: 40px;
						font-size: 18px;
						text-align: left;
						color: #333333;
					}
					ul {
						border-top: 1px dashed #d7d7d7;
						margin-top: -1px;
						width: 100%;
						font-size: 14px;
						text-align: left;
						color: #999;
						line-height: 40px;
						li {
							width: 50%;
							height: 32px;
							float: left;
							font-family: PingFangSC;
							a {
								color: #999;
							}
						}
						li:nth-child(2n+1) {
							text-align: left;
						}
					}
				}
				.concern {
					width: 120px;
					height: 100%;
					margin: 0 100px;
					float: left;
					.titleName {
						width: 100%;
						height: 40px;
						font-size: 18px;
						text-align: left;
						color: #333333;
					}
					ul {
						border-top: 1px dashed #d7d7d7;
						margin-top: -1px;
						width: 100%;
						font-size: 14px;
						text-align: left;
						color: #999;
						cursor: pointer;
						li span {
							width: 100%;
							height: 32px;
							float: left;
							line-height: 32px;
						}
					}
				}
				.entrance {
					width: 170px;
					height: 100%;
					float: left;
					.titleName {
						width: 100%;
						height: 40px;
						font-size: 18px;
						text-align: left;
						color: #333333;
					}
					ul {
						border-top: 1px dashed #d7d7d7;
						margin-top: -1px;
						width: 100%;
						font-size: 14px;
						text-align: center;
						color: #fff;
						li {
							width: 80px;
							height: 32px;
							margin-top: 10px;
							float: right;
							background: #999999;
							line-height: 32px;
							a {
								color: #fff;
							}
						}
						li:nth-child(2n+1) {
							float: left;
						}
					}
				}
				i.redLine {
					display: block;
					width: 30px;
					height: 2px;
					background-color: #fc4147;
					position: relative;
				}
			}
			.footerRight {
				// float: left;
				display: flex;
				flex-direction: column;
				align-items: center;
				height: 170px;
				margin-top: 60px;
				.tel {
					width: 315px;
					height: 90px;
					margin-left: 80px;
					i {
						display: inline-block;
						font-size: 64px;
						color: #666;
						float: left;
					}
					.date {
					font-family: PingFangSC;
					font-size: 14px;
					text-align: left;
					color: #666666;
					line-height: 22px;
					margin-left: 15px;
					width: 235px;
					height: 88px;
					float: left;
					.tel-num {
						text-align: left;
						width: 235px;
						display: block;
						font-family: PingFangSC;
						font-size: 28px;
						color: #666666;
						line-height: 36px;
						margin-bottom: 5px;
					}
					p {
						display: block;
					}
				}
				}
				.kefu {
					width: 180px;
					height: 40px;
					border-radius: 20px;
					background-color: #fc4147;
					font-family: PingFangSC;
					font-size: 14px;
					text-align: center;
					line-height: 40px;
					color: #ffffff;
					margin: 43px 0 0 110px;
					cursor: pointer;
				}
			}
		}
	}
	.footerBottom {
		width: 100%;
		background-color: #333;
		height: 130px;
		padding-top: 20px;
		.InsideWidth {
			width: 1190px;
			height: 100%;
			margin: 0 auto;
			.qualifications {
				height: 50px;
				width: 100%;
				overflow: hidden;
				min-width: 500px;
				// margin: 0 auto 10px;
				display: inline-block;
				text-align: center;
				ul {
					display: inline-block;
					li {
						margin-right: 10px;
						width: 87px;
						height: 31px;
						float: left;
						overflow: hidden;
						a {
							display: block;
							height: 50px;
						}
						img {
							width: 87px;
						    height: 31px;
						}
						span {
							width: 100%;
							height: 100%;
							display: block;
						}
					}
					//  消除资质四个角的白边
					li:nth-child(1){   
						border-radius: 4px;
					}
					li:nth-child(3){
						border-radius: 6px;
					}
				}
			}
			.copyRight {
				font-family: PingFangSC;
				font-size: 12px;
				line-height: 19px;
				color: #666666;
				margin-bottom: 16px;
				p {
					width: 100%;
					height: 100%;
					text-align: center;
					em {
						margin-right: 20px;
					}
					span {
						color: #666;
					}
				}
			}
		}
	}
}
.tooltipbFooter{
	width: 100px;
	height: 100px;
	img{
		width: 80px;
		height: 80px;
	}
}
#kx_verify{
	width: 138px !important;
}
</style>
<style>

</style>
