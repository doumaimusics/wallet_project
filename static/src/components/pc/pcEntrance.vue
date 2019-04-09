<template>
	<div id="entrance" :style="{height:fullHeight + 'px'}">
		<div v-keywords>E都市钱包、投资理财、个人理财、P2P理财、P2P网贷、小额贷款、信用贷款、消费分期、消费分期付款</div>
		<div class="wrapper">
			<div class="ul-nav clear">
				<div class="logos">
			            <img src="https://aliyunsso.edspay.com/web/newIndex/logo.png">
			    </div>
			    <div class="navBar">
			    	<ul class="clear">
			    		<li @click="toDetail(1)">
			    			<a href="javascript:;" :class="{activeLi:activeIndex == 1 || activeIndex == 2 }">公司介绍</a>
			    		</li>
			    		<li @click="toDetail(3)">
			    			<a href="javascript:;" :class="{activeLi:activeIndex == 3}">备案进程</a>
			    		</li>
			    		<li @click="toDetail(4)">
			    			<a href="javascript:;" :class="{activeLi:activeIndex == 4}">安全保障</a>
			    		</li>
			    		<li @click="toDetail(5)">
			    			<a href="javascript:;" :class="{activeLi:activeIndex == 5}">新闻动态</a>
			    		</li>
			    	</ul>
			    </div>
			</div>

			<swiper  :options="indexSwiper" ref="indexSwiper" :style="{height:fullHeight + 'px',marginTop:'-'+(fullHeight/2)+'px'}">
		        <swiper-slide>
					<swiper :options="swiperOption" ref="mySwiper" :style="{height:fullHeight + 'px',marginTop:'-'+(fullHeight/2)+'px'}">
					    <swiper-slide class="stop-swiping swipe-bg1" >
					    	<div class="texts text1"></div>
					    </swiper-slide>
					    <swiper-slide class="stop-swiping swipe-bg2">
					    	<div class="texts text2"></div>
					    </swiper-slide>
					    <swiper-slide class="stop-swiping swipe-bg3">
					    	<div class="texts text3"></div>
					    </swiper-slide>
					    <div class="center_btn goaway clear">
							<div class="btn invest_btn" @mouseover="changeImg(1)" @mouseout="goOn()" ref="toInvest">
						    	<router-link to="/invest" >我要出借</router-link>
						    </div>
					    	<div class="btn borrow_btn" @mouseover="changeImg(0)" @mouseout="goOn()" ref="toBorrow">
					    		<router-link to="/drainage/lendIndex" >我要借款</router-link>
					    	</div>
						    <div class="btn spend_btn" @mouseover="changeImg(2)" @mouseout="goOn()" ref="toInvest">
						    	<router-link to="/drainage/spendIndex" >我要分期</router-link>
						    </div>
					    </div>
					</swiper>
		        </swiper-slide>
		        <swiper-slide class="swiper2">
					<div class="page2" ref="page2" :style="{marginTop: (fullHeight-480)/2+'px',transform:'scale('+ (fullHeight<850 ? (fullHeight/850):1) +')'}">
						<div class="topContent">
							<img src="https://aliyunsso.edspay.com/web/newIndex/pageImg2.jpg" alt="" class="leftImg">
							<div class="text">
								<div class="title">平台简介</div>
								<p>E都市钱包（www.edspay.com），浙江阿拉丁控股集团有限公司旗下控股子公司，是浙江领先的互联网金融服务平台。</p>
								<p>E都市钱包，专注消费金融小额分散债权，坚持互联网技术与人工智能相结合，为用户提供消费分期类金融资产信息和借贷信息的撮合。我们坚信，只有真正优质的资产才能为用户带来更高的收益，也只有“好资产”才能让出借更稳健。</p>
								<p>秉承安全、专业、便捷、规范的服务理念，钱包为广大中产及白领用户提供出借、借款及分期等全方位的互联网金融服务，让更多人享受普惠金融发展带来的时代红利。</p>
								<p>E份初心，笃行致远。现在，未来，E都市钱包都将全心全意给用户产品及合规的信赖。</p>
							</div>
						</div>
						<ul class="clear">
							<li :style="{background: 'url(https://aliyunsso.edspay.com/web/newIndex/info'+1+'.png) center no-repeat'}"></li>
							<li :style="{background: 'url(https://aliyunsso.edspay.com/web/newIndex/info'+2+'.png) center no-repeat'}"></li>
							<li :style="{background: 'url(https://aliyunsso.edspay.com/web/newIndex/info'+3+'.png) center no-repeat'}"></li>
							<li :style="{background: 'url(https://aliyunsso.edspay.com/web/newIndex/info'+4+'.png) center no-repeat'}"></li>
						</ul>
					</div>
		        </swiper-slide>
		        <swiper-slide class="swiper3">
					<div class="page3" :style="{marginTop: (fullHeight-480)/2+'px',transform:'scale('+ (fullHeight<680 ? (fullHeight/680):1) +')'}">
						<div class="title">管理团队</div>
						<ul>
							<li>
								<img src="https://aliyunsso.edspay.com/web/newIndex/team1.png" alt="">
								<div class="name">吴宇青</div>
								<div class="info">阿拉丁集团董事长<br/>E都市钱包法定代表人</div>
							</li>
							<li>
								<img src="https://aliyunsso.edspay.com/web/newIndex/team2.png" alt="">
								<div class="name">刘涛</div>
								<div class="info">E都市钱包CEO</div>
							</li>
							<li>
								<img src="https://aliyunsso.edspay.com/web/newIndex/team3.png" alt="">
								<div class="name">陈雷</div>
								<div class="info">E都市钱包CRO</div>
							</li>
							<li>
								<img src="https://aliyunsso.edspay.com/web/newIndex/team4.png" alt="">
								<div class="name">胡继业</div>
								<div class="info">E都市钱包CTO</div>
							</li>
							<li>
								<img src="https://aliyunsso.edspay.com/web/newIndex/team5.png" alt="">
								<div class="name">李时德</div>
								<div class="info">E都市钱包CPO</div>
							</li>
						</ul>
					</div>
		        </swiper-slide>
		        <swiper-slide class="swiper4">
					<div class="page4" :style="{marginTop: (fullHeight-500)/2+'px'}">
						<div class="leftBox fl">
							<ul>
								<li>
									<div class="list">
										<div class="time">2018年10月</div>
										<div class="text">完成由杭州市互联网金融协会及浙江泰杭律师事务所入场自律检查工作</div>
										<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
									</div>
								</li>
								<li>
									<div class="list">
										<div class="time">2018年3月</div>
										<div class="text">获得杭州市萧山区防范处置非法金融活动领导小组办公室发放的整改意见书</div>
										<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
									</div>
								</li>
								<li>
									<div class="list">
										<div class="time">2017年12月</div>
										<div class="text">出借人风险测评正式上线</div>
										<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
									</div>
								</li>
								<li>
									<div class="list">
										<div class="time">2017年8月</div>
										<div class="text">电子签章上线</div>
										<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
									</div>
								</li>
							</ul>
						</div>
						<div class="line fl"></div>
						<div class="rightBox fl">
							<li>
								<div class="list">
									<div class="time">2018年11月</div>
									<div class="text">正式接受由各方监管机构、自律检查指定律师事务所及会计师事务所实地举行的行政核查</div>
									<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
								</div>
							</li>
							<li>
								<div class="list">
									<div class="time">2018年9月</div>
									<div class="text">正式向萧山区金融办提交《E都市钱包合规自查报告》</div>
									<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
								</div>
							</li>
							<li>
								<div class="list">
									<div class="time">2017年12月</div>
									<div class="text">获得公安部信息安全等级保护三级备案证明 </div>
									<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
								</div>
							</li>
							<li>
								<div class="list">
									<div class="time">2017年10月</div>
									<div class="text">银行资金存管正式上线</div>
									<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
								</div>
							</li>
							<li>
								<div class="list">
									<div class="time">2017年6月</div>
									<div class="text">获批ICP经营许可证</div>
									<img src="https://aliyunsso.edspay.com/web/newIndex/blueTriangle.png" alt="">
								</div>
							</li>
						</div>
					</div>
		        </swiper-slide>
		        <swiper-slide class="swiper5">
		        	<div class="page5" :style="{marginTop: (fullHeight-500)/2+'px',transform:'scale('+ (fullHeight<780 ? (fullHeight/780):1) +')'}">
		        		<ul>
		        			<li v-for="i in 6" :style="{background: 'url(https://aliyunsso.edspay.com/web/newIndex/security'+ i +'.png) no-repeat'}"></li>
		        		</ul>
		        	</div>
		        </swiper-slide>
		        <swiper-slide class="swiper6">
		        	<div class="page6" :style="{marginTop: (fullHeight-450)/2+'px',transform:'scale('+ (fullHeight<740 ? (fullHeight/740):1) +')'}">
		        		<div class="leftBtn fl">
		        			<div @click="activeBtn(0)" :class="{active:page6[0]}" class="btn">媒体报道<img v-if="page6[0]" src="https://aliyunsso.edspay.com/web/newIndex/redTriangle.png" alt=""></div>
		        			<div @click="activeBtn(1)" :class="{active:page6[1]}" class="btn">发展大事件<img v-if="page6[1]" src="https://aliyunsso.edspay.com/web/newIndex/redTriangle.png" alt=""></div>
		        		</div>
		        		<div class="content fl">
		        			<div :class="{activeContent:page6[1]}" class="contentBox">
			        			<div class="media">
			        				<ul class="clear">
			        					<li v-if="index<3" v-for="(item,index) in newsData" class="newsList fl">
			        						<div class="imgBox">
			        							<img :src="item.picPath" alt="">
			        						</div>
			        						<div class="title hidden">{{item.title}}</div>
			        						<div class="info">{{item.introduction}}<span v-if="item.introduction.length > 70">&nbsp;. . .</span></div>
			        						<div class="time">{{item.addTime}}</div>
			        					</li>
			        				</ul>
			        				<router-link to="/info/dynamic/coverage?num=0" tag="div" class="more">查看更多媒体报道 <span>></span></router-link>
			        			</div>
			        			<div @mouseenter="enterIn()" @mouseleave="leaveOut()" class="progress swiper-no-swiping">
			        				<ul>
										<li>2018年11月，E都市钱包完成由各方监管机构、律师事务所及会计师事务所实地开展的行政核查</li>
										<li>2018年10月，E都市钱包完成由杭州互联网金融协会及律师事务所入驻开展的自律检查</li>
										<li>2018年9月，E都市钱包正式向监管机构提交企业自查报告，完成合规自查</li>
										<li>2018年7月，“掷地有声，大有可为”E都市钱包喜迎两周年庆典</li>
			        					<li>2018年5月，累计交易额突破30亿，E都市钱包“E公益”基金正式上线</li>
			        					<li>2017年12月，获得公安部信息安全等级保护三级备案证明</li>
			        					<li>2017年10月，浙商银行资金存管系统正式上线</li>
			        					<li>2017年8月，吉祥物“钱宝宝”正式上线，银行存管系统正式进入内测阶段</li>
			        					<li>2017年7月，点对点信息匹配系统初步上线，累计交易额突破10亿</li>
			        					<li>2017年6月，获批ICP经营许可证</li>
			        					<li>2017年3月，E都市钱包成为浙江投融资协会理事单位</li>
			        				</ul>
			        			</div>
		        			</div>
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
		        </swiper-slide>
		    </swiper>
		    <div v-if="activeIndex != 5" class="bottomTips">
		    	<img src="https://aliyunsso.edspay.com/web/addBorrow/pull-down.png" alt="">
		    	<p>滑动下拉</p>
		    </div>
		    <div v-if="activeIndex >2" @click="toTop" class="toTop">
		    	
		    </div>
		</div>
    	
	</div>
</template>

<script>
	export default {
		data() {
			let that = this;
			return {
				scrollImg:[
					'https://aliyunsso.edspay.com/web/addBorrow/pc_bg2.jpg?v1.4',
					'https://aliyunsso.edspay.com/web/addBorrow/pc_bg1.jpg?v1.4',
				],
				swiperOption: {
	                effect: 'fade',//渐变效果
	                autoplay: 3000,//自动播放
	                speed:1500,
	                autoplayDisableOnInteraction:false,//点击下一页后还会继续自动滚动效果
	                noSwiping : true,//禁止鼠标滑动切换
	                noSwipingClass : 'stop-swiping',//禁止鼠标滑动切换
	            },
	            indexSwiper: {
			        direction: 'vertical',
			        initialSlide: 0,
			        mousewheelControl: true,
			        speed: 500,
			        noSwiping : true,
			        noSwipingClass : 'swiper-no-swiping',//禁止鼠标滑动切换
			        onSlideChangeEnd(swiper){
			        	that.activeIndex = swiper.activeIndex;
			        }
	            },
				fullHeight:window.innerHeight,//当前屏幕高度
				newsData:[],
				page6:[1,0],
				activePage: 0,
				activeIndex: 0,
			}
		},
		computed: {
			pcSwiper() {
				return this.$refs.mySwiper.swiper;
			}
		},
		methods: {
			enterIn(){
				this.$refs.indexSwiper.swiper.disableMousewheelControl();
			},
			leaveOut(){
				this.$refs.indexSwiper.swiper.enableMousewheelControl();
			},
			toTop(){
				this.$refs.indexSwiper.swiper.slideTo(0, 1000, false);
				this.activeIndex = 0
			},
			toDetail(index){
				this.$refs.indexSwiper.swiper.slideTo(index, 1000, false);
				this.activeIndex = index;
			},
			changeImg(n){
				if(this.$refs.mySwiper.swiper.activeIndex != n){
					this.$refs.mySwiper.swiper.slideTo(n, 1000, false);
				}else{
					return
				}
				this.$refs.mySwiper.swiper.stopAutoplay();
			},
			goOn(){
				//鼠标移出开始自动切换
				this.$refs.mySwiper.swiper.startAutoplay();
				// console.log('我要出借34')
			},
			goPage(n){
				if( n == 1 ){
					this.$router.push('/pcBorrow')
				}else if( n == 2 ){
					this.$router.push('/home')
				}
			},
			getNewsReport(){
				this.notLogPost('/index/newsReport',(data) =>{
					if(data.resCode){
						console.log(data)
						this.newsData = data.resData.data.list;
					}
				},{pageNum:1,pageSize:6})
			},
			activeBtn(index){
				this.$set(this.page6,0,0);
				this.$set(this.page6,1,0);
				this.$set(this.page6,index,1);

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
		created(){
			this.getNewsReport();
		},
		mounted(){
			this.verify();

			const that = this
			console.log(that.$refs.mySwiper.swiper.activeIndex)
			window.onresize = () => {
			    return (() => {
			      window.fullHeight = document.documentElement.clientHeight;
			      that.fullHeight = window.fullHeight
			    })()
			}
		},
		watch: {

        },
	}  
</script>
<style lang="scss">
	#entrance{
		.swiper-slide {
			width: 100%;
			height: 100%;
		    background-position: center;
		    background-repeat: no-repeat;
	        background-position: 50%;
	        background-size: cover;
	        overflow: hidden;
		}
		.swiper-container{
			height: 900px;
	        width: 1920px;
	        position: absolute;
	        left: 50%;
	        top: 50%;
	        margin-top: -450px;
	        margin-left: -960px;
		}
		.swiper-wrapper{
			-webkit-box-orient: vertical;
			-moz-box-orient: vertical;
		}
	}
	
</style>
<style lang="scss" scoped>
	#entrance{
		position: absolute;
		top:0;
		width: 100%;
		overflow: hidden;
		.bottomTips{
			position: fixed;
			width: 75px;
			left: 50%;
			bottom: 40px;
			margin-left: -32px;
			color: #fff;
			z-index: 999;
			-webkit-animation: fixedSlide 2s infinite;
            -moz-animation: fixedSlide 2s infinite;
            -ms-animation: fixedSlide 2s infinite;
            animation: fixedSlide 2s infinite;
			img{
				height: 26px;
				width: 26px;
				margin-bottom: 10px;
				display: block;
				margin: 0 auto;
			}
			p{
				font-family: PingFangSC-Medium;
				font-size: 16px;
				line-height: 25px;
				text-align: center;
			}
		}
		.toTop{
			height:50px;
			width: 50px;
			background: url('https://aliyunsso.edspay.com/web/newIndex/toTop.png') no-repeat;
			background-size: 100% 100%;
			position: absolute;
			z-index:999;
			left: 50%;
			bottom: 120px;
			margin-left: 600px;
		}
		.ul-nav{
			position: fixed;
			width: 1200px;
			height: 100px;
			margin: 0 auto;
			text-align: center;
			z-index: 501;
			left: 0;
			top: 36px;
			right: 0;
			bottom: 0;
			.logos{
				width: 209px;
				height: 45px;
				float: left;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.navBar{
				height: 20px;
				width: 500px;
				margin-left: 88px;
				position: relative;
				float: left;
				top: 21px;
				ul{
					width: 100%;
					li{
						font-family: PingFangSC-Medium;
						font-size: 16px;
						color: #FFFFFF;
						margin-left: 58px;
						float: left;
						cursor: pointer;
					}
					li:hover{
						opacity: 0.7;
					}
					.activeLi{
						color: #FF5B4C;
						display:inline-block;
						height:24px;
						line-height: 22px;
						border-bottom: 2px solid #FF5B4C;
					}
				}
			}
		}
		.parallax-bg{

		}
		.wrapper{
			position: fixed;
			left: 50%;
			margin-left: -960px;
			width: 1920px;
			z-index: 500;
			height: 100%;
			top: 0;
			background: #fff;
			.swiper2{
				background: url('https://aliyunsso.edspay.com/web/newIndex/pageBG2.jpg') center no-repeat;
				.page2{
					height:528px;
					width: 1200px;
					margin: 0 auto;
					background: url('https://aliyunsso.edspay.com/web/newIndex/pageContent2.jpg') no-repeat;
					background-size: 100% 100%;
					position: relative;
					top: 0;
					.topContent{
						height: 316px;
						position: relative;
						.leftImg{
							height: 375px;
							width: 380px;
							position: absolute;
							top: -59px;
							left: 30px;
							margin: 0 40px 0 0;
							float: left;
						}
						.text{
							float: left;
							width:700px;
							padding-top: 28px;
							margin-left: 450px;
							font-family: PingFangSC-Regular;
							font-size: 14px;
							color: #4A4A4A;
							letter-spacing: 0;
							line-height: 27px;
							.title{
								font-family: PingFangSC-Semibold;
								font-size: 24px;
								color: #4A4A4A;
								padding-bottom: 18px;
							}
						}	
					}
					ul{
						padding: 40px 0 0 50px;
						li{
							height:135px;
							width: 250px;
							background: url('https://aliyunsso.edspay.com/web/newIndex/info1.png') center no-repeat;
							float: left;
							margin-right: 30px;
						}
					}
				}
				.activePage2{
					top:0;
					transition: all 1s ease;
				}
			}
			.swiper3{
				background: url('https://aliyunsso.edspay.com/web/newIndex/pageBG3.jpg') center no-repeat;
				.page3{
					height: 520px;
					width: 1220px;
					margin: 0 auto;
					.title{
						font-family: PingFangSC-Semibold;
						font-size: 24px;
						color: #FFFFFF;
						text-align:center;
						padding-bottom: 62px;
					}
					ul{
						li{
							float: left;
							width: 231px;
							margin: 0 6px;
							text-align:center;
							img{
								position: relative;
								height:315px;
								width: 231px;
								display: block;
							}
							img:hover{
								top: -10px;
								transition: all 0.8s;
							}
							.name{
								padding-top: 20px;
								font-family: PingFangSC-Medium;
								font-size: 18px;
								color: #FFFFFF;
								line-height: 28px;
								padding-bottom: 4px;
							}
							.info{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								line-height: 20px;
								color: #FFFFFF;
							}
						}
					}
				}
			}
			.swiper4{
				background: url('https://aliyunsso.edspay.com/web/newIndex/pageBG4.jpg')  center no-repeat;
				.page4{
					width: 1090px;
					height: 590px;
					margin: 0 auto;
					font-family: PingFangSC-Regular;
					font-size: 12px;
					color: #FFFFFF;
					li{
						margin-bottom: 52px;
						.list{
							border-radius: 4px;
							background: #4681F6;
							display:inline-block;
							padding: 4px 10px 5px;
							position: relative;
							img{
								height: 12px;
								width: 7px;
								position: absolute;
								top: 6px;
								right: -7px;
							}
						}
					}
					.leftBox{
						width: 520px;
						text-align:right;
						padding-right: 17px;
						padding-top: 131px;
					}
					.line{
						width:10px;
						height: 434px;
						background: url('https://aliyunsso.edspay.com/web/newIndex/line.png') no-repeat;
						margin-top: 68px;
					}
					.rightBox{
						padding-top: 82px;
						width: 550px;
						padding-left: 17px;
						.list{
							img{
								transform:rotate(180deg);
								left: -7px;
							}
						}
					}
				}
			}
			.swiper5{
				background: url('https://aliyunsso.edspay.com/web/newIndex/pageBG5.jpg')  center no-repeat;
				.page5{
					height:564px;
					width: 1200px;
					background: url('https://aliyunsso.edspay.com/web/newIndex/pageContent5.jpg') no-repeat;
					background-size: 100% 100%;
					margin: 0 auto;
					ul{
						padding-top: 88px;
						li{
							width: 266px;
							height: 183px;
							float: left;
							margin: 0 28px 28px 33px;
						}
						
					}
				}
			}
			.swiper6{
				background: url('https://aliyunsso.edspay.com/web/newIndex/pageBG6.jpg') no-repeat;
				.page6{
					width: 1150px;
					height: 450px;
					margin: 0 auto;
					position: relative;
					.leftBtn{
						padding-top: 147px;
						margin-right: 30px;
						cursor: pointer;
						.btn{
							height: 45px;
							width: 116px;
							color: #fff;
							margin-bottom: 100px;
							line-height: 45px;
							text-align:  center;
							position: relative;
							img{
								position: absolute;
								top: 12px;
								right:-8px;
								width: 8px;
								height: 20px;
							}
						}
						.active{
							background: #FF5B4C;
							border-radius: 4px;
						}
					}
					.content{
						height: 451px;
						width: 995px;
						// opacity: 0.38;
						background: #1F126C;
						border-radius: 2px;
						overflow: hidden;
						position: relative;
						color: #fff;
						.contentBox{
							position: absolute;
							top:0;
							left:0;
							height: 904px;
							width: 995px;
							transition: all 0.4s;
							.media{
								height: 451px;
								width: 995px;
								padding: 40px 0 0 30px;
								.newsList{
									width: 285px;
									margin-right: 36px;
									font-family: PingFangSC-Regular;
									font-size: 12px;
									.imgBox{
										height: 160px;
										width: 285px;
										overflow: hidden;
									}
									img{
										height:160px;
										width: 285px;
										display: block;
									}
									img:hover{
										transform: scale(1.2,1.2);
										transition: all 0.4s;
									}
									.title{
										font-family: PingFangSC-Medium;
										font-size: 16px;
										line-height: 22px;
										padding: 20px 0 10px;
									}
									.info{
										height: 58px;
										line-height:20px;
										margin-bottom: 22px;
										opacity: 0.6;
										overflow: hidden;
										position: relative;
										span{
											position: absolute;
											bottom:0;
											right:0;
											height:19px;
											width: 26px;
											background: #1F126C;
											color: #fff;
										}
									}
									.time{
										opacity: 0.6;
									}
								}
								.more{
									text-align:center;
									color: #fff;
									font-family: PingFangSC-Regular;
									font-size: 16px;
									padding-top: 50px;
									margin-left: -56px;
									cursor: pointer;
									span{
										display: inline-block;
										height:12px;
										width:12px;
										font-size: 10px;
										line-height: 12px;
										border-radius: 6px;
										background:#fff;
										color: #2A1989;
										position: relative;
										top: -2px;
									}
								}
							}
							.progress{
								height: 451px;
								width: 995px;
								padding: 38px 0 0 40px;
								ul{
									height:375px;
									overflow-y: auto;
									width: 1000px;
									li{
										font-family: PingFangSC-Regular;
										font-size: 16px;
										line-height: 22px;
										color: #FFFFFF;
										padding-bottom: 20px;
									}
								}
							}
						}
						.activeContent{
							top: -451px;
							transition: all 0.4s;
						}
					}
					
				}
			}
		}
		.swipe-bg1{
			background: url(https://aliyunsso.edspay.com/web/newIndex/pcIndex_bg1.jpg) no-repeat;
			background-size: cover;
		}
		.swipe-bg2{
			background: url(https://aliyunsso.edspay.com/web/newIndex/pcIndex_bg2.jpg) no-repeat;
			background-size: cover;
		}
		.swipe-bg3{
			background: url(https://aliyunsso.edspay.com/web/newIndex/pcIndex_bg3.jpg) no-repeat;
			background-size: cover;
		}
		.center_btn{
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			margin: auto;
            z-index: 501;
            text-align: center;
		}
		.texts{
			width: 1200px;
			height: 250px;
			// width: 700px;
			// height: 250px;
			position: absolute;
			top: 44%;
			left: 50%;
			transform: translate(-50%,-50%);
			z-index: 502;
		}
		.text1{
			height: 192px;
			width: 890px;
			top: 47%;
			background: url(https://aliyunsso.edspay.com/web/addBorrow/text2.png?v1.2) no-repeat;
			background-size:100% 100%;
		}
		.text2{
			height: 231px;
			width: 718px;
			top: 45%;
			background: url(https://aliyunsso.edspay.com/web/addBorrow/text4.png) no-repeat;
			background-size:100% 100%; 
		}
		.text3{
			height:217px;
			width: 684px;
			top: 46%;
			background: url(https://aliyunsso.edspay.com/web/addBorrow/text3.png?1.2) no-repeat;
			background-size:100% 100%; 
		}
		.goaway{
        	width: 1200px;
        	height: 200px;
        	text-align: center;
        	padding-top:12%;
        	padding-left: 90px;
        	.btn{
        		width: 320px;
        		height: 80px;
        		cursor: pointer;
        		margin: 0 auto;
        		border-radius: 2px;
        		font-family: PingFangSC-Medium;
        		font-size: 22px;
        		color: #FFFFFF;
        		text-align: center;
        		line-height: 80px;
        		float: left;
        		a{
        			display: inline-block;
        			width: 100%;
        			height: 100%;
        		}
        	}
        	.borrow_btn{
				margin: 0 30px;
        		background: rgb(8,135,248);
        	}
        	.borrow_btn:hover{
        		background: rgba(8,135,248,.7);
        	}
        	.invest_btn{
        		background: rgb(234,90,77);
        	}
        	.invest_btn:hover{
        		background: rgba(234,90,77,.7);
        	}
        	.spend_btn{
        		background: rgb(245,166,35);
        	}
        	.spend_btn:hover{
        		background: rgba(245,166,35,.7);
        	}
        }
		.clear{zoom:1;}
		.clear:after{content:"";display:block;clear:both;}
		@-moz-keyframes fixedSlide {
		  0% {
		    bottom: 10px;
		  }
		  50% {
		    bottom: 40px;
		  }
		  100% {
		    bottom: 10px;
		  }
		}
		@-ms-keyframes fixedSlide {
		  0% {
		    bottom: 10px;
		  }
		  50% {
		    bottom: 40px;
		  }
		  100% {
		    bottom: 10px;
		  }
		}
		@-webkit-keyframes fixedSlide {
		  0% {
		    bottom: 10px;
		  }
		  50% {
		    bottom: 40px;
		  }
		  100% {
		    bottom: 10px;
		  }
		}
		@keyframes fixedSlide {
		  0% {
		    bottom: 10px;
		  }
		  50% {
		    bottom: 40px;
		  }
		  100% {
		    bottom: 10px;
		  }
		}
	}

	.footerBottom {
		width: 100%;
		background-color: #333;
		height: 130px;
		padding-top: 20px;
		position: absolute;
		bottom:0;
		left: 0;
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
							width: 87px!important;
						    height: 31px!important;
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
</style>
<style lang="scss">
	#entrance{
		#kx_verify{
			img{
				width: 87px;
				height: 31px;
			}
		}
	}
</style>
