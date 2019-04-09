<template>
	<div class="bill" id="bill">
		<div v-title>E都市钱包年度账单</div>
		<div class="annualIndex" v-if="coverShow">
			<div v-title>E都市钱包年度账单</div>
			<div class="dialog_commom middle">
				<div class="to-next" @click="toNext"></div>
			</div>
		</div>
		<div class="wrap-middle-bill" v-if="allShow">
			<div class="img-head"></div>
			<div class="flipbook-viewport">
				<div class="container">
					<div class="flipbook">
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_1.png)" v-if="sISt[0] != 3">
							<div class="page-common">
								<p class="p1"><span>{{getData.addTime}}</span>原本是个普通的日子</p>
								<p>一次回眸，你和E都市钱包相遇!</p>
								<p>当时你立下誓言，说要和我们携手走下去</p>
								<p>为此，你努力了<span>{{getData.day}}天</span>，不离不弃</p>
							</div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_bg.png)" v-if="sISt[1] != 3">
							<div v-if="sISt[1] == 1" class="page2 bg-img bg-img1 one">
								<div class="page-common dis">
									<p class="p1">2018，你收获了很多!</p>
									<p>但<span>{{getData.minTime}}</span>的那次出借，</p>
									<p>却承载着特殊的意义!</p>
									<p>从那天起，生活中有了新的憧憬!</p>
								</div>
							</div>
							<div v-else-if="sISt[1] == 2" class="page2 bg-img bg-img2 two">
								<div class="to-invest" @click="toInvest"></div>
							</div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_3.jpg)" v-if="sISt[2] != 3">
							<div class="page-common">
								<p class="p1">2018，你一共出借了<span>{{getData.investmentNumber}}次</span></p>
								<p>为此你付出了<span>{{getData.userMoney}}元</span></p>
								<p>超越了<span>{{getData.proportion}}</span>的E友！</p>
								<p>你相信，踏实付出，总能获得回报</p>
							</div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_4.png)" v-if="sISt[3] != 3">
							<div class="page-common">
								<p class="p1">2018，你一共用了<span>{{getData.redNumber}}个红包</span></p>
								<p v-if="getData.redMoney">到账红包收益<span>{{getData.redMoney}}元！</span></p>
								<p>别人都羡慕你的运气，</p>
								<p>但你知道，好运从来只属于一直努力的人</p>
							</div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_bg.png)" v-if="sISt[4] != 3">
							<div v-if="sISt[4] == 1" class="page2 bg-img bg-img1 three">
								<div class="page-common dis">
									<p class="p1"><span>2018，你不仅在钱包累计赚取</span></p>
									<p>收益<span>{{getData.sunMoney}}元！</span></p>
									<p>还成功邀请了<span>{{getData.inviteNumber}}位</span>好友</p>
									<p>好朋友，有福就要同享</p>
								</div>
							</div>
							<div v-else-if="sISt[4] == 2" class="page2 bg-img bg-img2 four">
								<p class="money"><span>{{getData.sunMoney}}元</span></p>
								<div class="to-invest t1" @click="toInvite"></div>
							</div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_6_bg.jpg)" v-if="sISt[5] != 3">
							<div class="page6" v-if="sISt[5] == 1">
								<div class="page6-img page6-img1"></div>
								<div class="page-common t2">
									<p class="p1"><span>2018，你一共获得了{{getData.sumScore}}积分！</span></p>
									<p v-if="getData.orderNumber">累计兑换了<span>{{getData.orderNumber}}</span>件商品!</p>
									<p v-if="getData.commonwealScore">为公益贡献了<span>{{getData.commonwealScore}}</span>积分!</p>
									<p>化收获为大爱，再小的力量也能改变世界</p>
								</div>
							</div>
							<div class="page6" v-if="sISt[5] == 2">
								<div class="page6-img page6-img2"></div>
								<div class="page-common t2">
									<p class="p1"><span>2018，你一共获得了{{getData.sumScore}}积分！</span></p>
									<p v-if="getData.scSign">在商城签到<span>{{getData.scSign}}次</span>！</p>
									<p>不积跬步无以至千里，积少成多才能致远</p>
								</div>
							</div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_7.png)" v-if="sISt[6] != 3">
							<div class="page-common">
								<p class="p1"><span>你花{{getData.userMoneyPrevious}}元出借了{{getData.investmentNumberPrevious}}个项目</span></p>
								<p>值得回味的，<i v-if="getData.moneyPrevious">不只是<span>{{getData.moneyPrevious}}元</span>的收益!</i></p>
								<p>还有一起走过的日日夜夜，</p>
								<p>我们一起携手，把做过的梦一一实现</p>
							</div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_8.png?v1.1)" v-if="sISt[7] != 3">
							<div class="to-invest" @click="toActivity"></div>
						</div>
						<div style="background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_9.png)" v-if="sISt[8] != 3">
							<div class="user-name">{{getData.userName}}的财富关键词</div>
							<img class="luck-img" :src="luckImg[getData.vipLevel]" alt="">
							<img class="code-img" :src="codeImgURL" alt="">
						</div>
					</div>
				</div>
			</div>
			<div class="img-shadow" v-if="flag"></div>
		</div>

		<div class="big-bg" v-for="(item,index) in useBigImg" :style="{background: 'url('+ item.bgImg +') no-repeat center center'}" :class="{opcity1:pageIndex == index}">
			
			<div class="btns clear" v-if="index == (useBigImg.length-1)">
				<div class="btn" @click="toShareBill"></div>
			</div>
		</div>
		<!-- 手势引导 -->
		<div class="layer_box" v-if="figure && allShow" @click="figure = false"  @touchstart.prevent="movePerfume" ref="figureDo">
			<div class="figure-do">
				<div class="move_btn"></div>
			</div>
		</div>
		<!-- 微信分享 -->
		<div class="layer_box" v-if="wxShareBg" @click="wxShareBg = false">
			<img src="https://aliyunsso.edspay.com/web/wx/activity/cutRedEnvelope/wx_share.png" alt="">
		</div>
	</div>
</template>
<script>
	import wxShare from '../../../../common/wx/wxShare';   // 分享组件
	import turn from './js/turn';//翻页组件js文件
	import jiami from 'js-base64';
	export default {
		mixins:[wxShare,turn],
		data () {
			return {
				coverShow:true,
				allShow:false,
				getData:{},//页面数据
				sISt:[],//日历页数的展示
				figure:true,//手势引导
				bigBg:[//初始化大背景
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big1.jpg'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big2.jpg'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big3.jpg'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big4.jpg'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big5.jpg'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big6.jpg'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big7.jpg'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big8.jpg?v1.1'},
					{bgImg:'https://aliyunsso.edspay.com/web/wx/activity/annualBill/big9.jpg?v1.1'}
				],
				luckImg:[//预测关键词
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/luck0.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/luck1.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/luck2.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/luck3.png',
					'https://aliyunsso.edspay.com/web/wx/activity/annualBill/luck4.png'
				],
				shareObj:{
				    title: 'E都市钱包2018年度账单', //标题
				    desc: "测一测你的2019财富关键字",//内容
				    link: global.host+"wx/bill", //链接
				    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				},
				useBigImg:[],//可展示底部大图
				pageIndex:0,//当前页下标
				AppShare:'',//app分享数据
				luckyText:['精','发','稳','赏','享'],//财富关键词
				wxShareBg:false,//微信分享蒙层
				codeImgURL:'',//邀请二维码
				userId:'',
				flag:false,//接口请求成功后展示
				loginCode:'',//登陆状态
				MobilePhone:'',//用户名
			}
		},
		methods:{
			getBillData(){
				var that = this;
				this.getNotlogData('/activity/annualSpendingReport/getList',(data) =>{
					this.loginCode = data.resCode;
					if(data.resCode == 1){
						this.allShow = true;
						this.useBigImg = [];
						this.getData = data.resData.annualSpendingReport;
						this.sISt = data.resData.statusList;
						this.getUI();
						this.flag = true;
						for(var i=0; i<this.sISt.length; i++){
							this.bigBg[i].imgStatus = this.sISt[i];
							if(this.sISt[i] != 3){
								this.useBigImg.push({bgImg:this.bigBg[i].bgImg,imgStatus:this.bigBg[i].imgStatus})
							}
						}
						
						
						this.$nextTick(() => {
						    $('.flipbook').turn({
						       width: 8.48+'rem',
						       height: 12.653333+'rem',
						       elevation: 50,
						       gradients: true,
						       autoCenter: true,
						       when: {
			                        turning: function (e, page, view) {
			                        	that.figure = false;
			                        	that.pageIndex = '';
			                        	console.log('当前页'+page)
			                        	that.pageIndex = page - 1;
			                        	console.log(that.pageIndex)
			                        },
			                    }
						    });
						});
					}

				},{},1)
			},

			toShareBill(){
				_czc.push(["_trackEvent", "年度账单", '晒财运']);
				if(this.getCookie('userToken') || this.userId){
					if(this.osType){
						this.PassValue(this.AppShare);
					}else{
						this.getWxShareData(this.shareObj);
						this.wxShareBg = true;
					}
				}else{
					this.toLogin();
				}
				
			},

			movePerfume(even){
				var that = this;
				that.$refs.figureDo.addEventListener('touchmove', (e) => {
					this.figure = false;
				})
			},

			getUI () {  //获取用户id(base64转码)
	            this.getAppData("/user/friend/userInvite",(data) =>{
	                this.userId = data.resData.ui;
	                this.MobilePhone = data.resData.realName ?  data.resData.realName:data.resData.MobilePhone;
	                this.getImgUrl();
	                this.AppShare = '1|' + '我的2019财运是"'+ this.luckyText[this.getData.vipLevel] + '"'+ '|点开分享财富|'+ global.host + 'wx/shareBill?ui=' + this.userId + '&userName=' + Base64.encode(this.MobilePhone)+'|'+ 'https://aliyunsso.edspay.com/web/icon.png';
	            },{})
	        },

			getImgUrl(){    //生成二维码图片
			    var that = this;
			    var QRCode = require('qrcode');
			    QRCode.toDataURL(global.host+"invite/inviteRegister?ui="+this.userId+"&userName="+ Base64.encode(this.MobilePhone) , {errorCorrectionLevel: 'H'}, function (err, url) {
			        that.codeImgURL = url;
			    })
			},

			toNext () {
				_czc.push(["_trackEvent", "年度账单", '立即开启']);
				if(this.loginCode == '-1'){
					this.toLogin();
					// this.$router.replace({ path: '/wx/bill' });
				}else{
					this.coverShow = false;
				}
				
			},

			goFirstPage(){
				_czc.push(["_trackEvent", "年度账单", '再看一次']);
				if(this.getCookie('userToken') || this.userId){
					this.$nextTick(() => {
					    $('.flipbook').turn('page', 1);
				    });
				}else{
					this.toLogin();
				}
			},

			toInvest(){
				_czc.push(["_trackEvent", "年度账单", '去出借']);
				this.toApp('WIP','/wxInvest');
			},

			toInvite(){
				_czc.push(["_trackEvent", "年度账单", '去邀请']);
				this.appRouter('/wxInvitationIndex')
			},

			toActivity(){
				_czc.push(["_trackEvent", "年度账单", '领取大礼包']);
				this.appRouter('/festMai3/index?activityId=new_year_plus')
			},

			appendScript(src) {
			  const script = document.createElement('script')
			  script.src = src
			  script.language = 'JavaScript'
			  script.async  = 'defer'
			  document.body.appendChild(script)
			},
		},
		mounted(){
			var that = this;
			this.PassValue('NavWhite_E都市钱包年度账单');
			this.getBillData();
			this.appendScript('https://aliyunsso.edspay.com/web/wx/activity/annualBill/modernizr.2.5.3.min.js');
			this.appendScript('https://aliyunsso.edspay.com/web/wx/activity/annualBill/turn.html4.min.js');	

			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275780656&web_id=1275780656 '
			script.language = 'JavaScript'
			document.body.appendChild(script)

			window.onload = function () {
			    //alert($(window).height());
			    var u = navigator.userAgent;
			    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {//安卓手机
				    } else if (u.indexOf('iPhone') > -1) {//苹果手机
				        //屏蔽ios下上下弹性
				        $(window).on('scroll.elasticity', function (e) {
				            e.preventDefault();
				        }).on('touchmove.elasticity', function (e) {
				            e.preventDefault();
				        });
				    } else if (u.indexOf('Windows Phone') > -1) {//winphone手机
			    }
			}
		},
		created(){
			
		},
		watch: {
			'$route'() {
				if (window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		}
	}
</script>
<style lang="scss">
	#bill{
		overflow:hidden;
		background-color:#fcfcfc;
		margin:0;
		padding:0;
		.wrap-middle-bill{
			width: 8.88rem;
			height: 15.133333rem;
			// background: rgba(0,0,0,.5);
			position: fixed;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			margin: auto;
			text-align: center;
			z-index: 98;
		}
		.flipbook-viewport{
			overflow:hidden;
			width:100%;
			height:100%;
			position: relative;
		    top: .25rem;
	        left: 0.03rem;
		}

		.flipbook-viewport .container{
			position:absolute;
			width: 1rem;
			height: 1rem;
			top:34%;
			left:50%;
			margin:auto;
		}

		.flipbook-viewport .flipbook{
			width:8.48rem;
			height:12.653333rem;
			left:-4.24rem;
			top:-4.833333rem;
			z-index: 999;
		}

		.flipbook-viewport .page{
			width:8.48rem;
			height:12.653333rem;
			background-color:white;
			background-repeat:no-repeat;
			background-size:100% 100% !important;
		}

		.flipbook-viewport .page img{
			-webkit-touch-callout: none;
			-webkit-user-select: none;
			-khtml-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			user-select: none;
			margin:0;
		}

		.flipbook-viewport .shadow{
			-webkit-transition: -webkit-box-shadow 0.5s;
			-moz-transition: -moz-box-shadow 0.5s;
			-o-transition: -webkit-box-shadow 0.5s;
			-ms-transition: -ms-box-shadow 0.5s;
		}
	}
</style>
<style lang="scss" scoped>
	.bill{
		overflow: hidden;
		.annualIndex{
			position: absolute;
			width: 10.0rem;
			height: 100%;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/cover-bg.jpg) no-repeat;
			background-size: 100%;
			z-index: 1001;
			.middle{
				width: 10.0rem;
				height: 14.4rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/cover-bg.gif) no-repeat;
				background-size: 100%;
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
			.to-next{
				width: 7rem;
			    height: 2.133333rem;
			    position: relative;
			    top: 12.2rem;
			    left: 1.5rem;
			}
		}
		.big-bg{
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			opacity: 0;
			background: #ff5b4c;
			background-size: 100% !important;
			overflow: hidden;
			transition:.8s all ease-in; 
			-webkit-transition:.8s all ease-in;
		}
		.opcity1{
			opacity: 1;
		}
		.figure-do{
			width: 3.2rem;
			height: 1.866667rem;
			overflow: hidden;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/fanye.png) no-repeat;
			background-size: 3.2rem 0.933333rem;
			position: relative;
		    top: 13rem;
		    left: 5.8rem;
		}
		@-moz-keyframes slide {
			0% {
				-moz-transform: translateX(0rem);
				-ms-transform: translateX(0rem);
				-webkit-transform: translateX(0rem);
				transform: translateX(0rem);
			}
			
			100% {
				-moz-transform: translateX(-1.8rem);
				-ms-transform: translateX(-1.8rem);
				-webkit-transform: translateX(-1.8rem);
				transform: translateX(-1.8rem);
			}
		}
		@-ms-keyframes slide {
			0% {
				-moz-transform: translateX(0rem);
				-ms-transform: translateX(0rem);
				-webkit-transform: translateX(0rem);
				transform: translateX(0rem);
			}
			
			100% {
				-moz-transform: translateX(-1.8rem);
				-ms-transform: translateX(-1.8rem);
				-webkit-transform: translateX(-1.8rem);
				transform: translateX(-1.8rem);
			}
		}
		@-webkit-keyframes slide {
			0% {
				-moz-transform: translateX(0rem);
				-ms-transform: translateX(0rem);
				-webkit-transform: translateX(0rem);
				transform: translateX(0rem);
			}
			
			100% {
				-moz-transform: translateX(-1.8rem);
				-ms-transform: translateX(-1.8rem);
				-webkit-transform: translateX(-1.8rem);
				transform: translateX(-1.8rem);
			}
		}
		@keyframes slide {
			0% {
				-moz-transform: translateX(0rem);
				-ms-transform: translateX(0rem);
				-webkit-transform: translateX(0rem);
				transform: translateX(0rem);
			}
			
			100% {
				-moz-transform: translateX(-1.8rem);
				-ms-transform: translateX(-1.8rem);
				-webkit-transform: translateX(-1.8rem);
				transform: translateX(-1.8rem);
			}
		}
		.move_btn{
			width: 0.8rem;
			height: 0.8rem;
			margin-top: 0.133333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/shou.png) no-repeat;
			background-size: 0.8rem 0.8rem;
			-webkit-animation: slide 2s infinite;
			-moz-animation: slide 2s infinite;
			-ms-animation: slide 2s infinite;
			animation: slide 2s infinite;
			position: relative;
		    left: 2.4rem;
		    top: 0.8rem;
		}
		.layer_box{
			position: fixed;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			background: rgba(0,0,0,.6);
			z-index: 1000;
			img{
                height:4.8rem;
                width:100%;
            }
		}
		.code-img{
			width: 2.526667rem;
			height: 2.526667rem;
			position: relative;
			top: 1.93rem;
		    border-radius: .15rem;

		}
		.img-shadow{
			position: absolute;
			width: 8.88rem;
			height: 13.386667rem;
			left: 0rem;
		    top: 0.3rem;
			z-index: 900;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_shadow.png) no-repeat;
			background-size: 100%;
		}
		.img-head{
			position: absolute;
			width: 8.546667rem;
			height: 0.8rem;
			left: 0.2rem;
		    top: 0rem;
			z-index: 1000;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/bg_head.png) no-repeat;
			background-size: 100%;
		}
		.page-common{
			width: 6.04rem;
			height: 2.826667rem;
			position: relative;
			top: 9.55rem;
			left: 1.833333rem;
			p{
				font-family: SourceHanSansCN-Normal;
				color: #394a64;
				font-size: 0.293333rem;
				line-height: 0.6rem;
				text-align: left;
				i{
					font-family: SourceHanSansCN-Normal;
					color: #394a64;
					font-size: 0.293333rem;
					line-height: 0.6rem;
					text-align: left;
				}
				span{
					font-size: 0.373333rem;
					font-family: SourceHanSansCN-Bold;
					font-size: 0.373333rem;
					font-weight: 600;
				}
			}
			.p1{
				line-height: 0.86rem;
				
			}
		}
		.page-common.dis{
			top: 8.45rem;
		    left: 1.62rem;
		}
		.page-common.t2{
			top: 2.1rem;
		}
		.page2{
			position: relative;
		}
		.bg-img{
			margin: auto;
			top: 1.14rem;
		}
		.bg-img.bg-img1{
			width: 7.933333rem;
			height: 11.266667rem;
			
		}
		.bg-img.bg-img2{
			width: 7.933333rem;
			height: 11.026667rem;
		}
		.to-invest{
			width: 4.853333rem;
			top: 9.3rem;
			margin: auto;
			height: 2.17rem;
			position: relative;
		}
		.to-invest.t1{
			top: 8.5rem;
		}
		.page2.one{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_2_1.png) no-repeat;
			background-size:100%;
		}
		.page2.two{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_2_2.png) no-repeat;
			background-size:100%;
		}
		.three{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_5_1.png) no-repeat;
			background-size:100%;
		}
		.four{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_5_2.png) no-repeat;
			background-size:100%;
		}
		.money{
			font-family: SourceHanSansCN-Normal;
			color: #394a64;
			line-height: 0.6rem;
			position: relative;
		    top: 3.05rem;
		    padding-left: 4.3rem;
		    text-align: left;
			span{
				font-size: 0.373333rem;
				font-family: SourceHanSansCN-Bold;
				font-size: 0.373333rem;
				font-weight: 600;
			}
		}
		.user-name{
			width: 100%;
			height: 1.04rem;
			position: relative;
			text-align: center;
			font-family: STSongti-SC-Bold;
			font-size: 0.426667rem;
			color: #FFDBC8;
			top: 0.77rem;
			line-height: 1.04rem;
		}
		.luck-img{
			width: 6.666667rem;
			height: 6.266667rem;
			position: relative;
		    top: 1.02rem;
		}
		.page6{
			width: 100%;
			.page6-img{
				width: 7.373333rem;
				height: 7.506667rem;
				margin: auto;
				position: relative;
				top: 1.435rem;
			}
			.page6-img1{
				background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_6_1.png) no-repeat;
				background-size: 100%;
			}
			.page6-img2{
				background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/small_6_2.png) no-repeat;
				background-size: 100%;
			}
		}
		.btns{
			width: 1.626667rem;
		    height: 1.973333rem;
		    position: fixed;
		    top: 9.2rem;
		    /* height: 1.8rem; */
		    z-index: 99;
		    right: .1rem;
			.btn{
				width: 1.626667rem;
				height: 1.973333rem;
				position: relative;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/annualBill/ico.gif) no-repeat;
				background-size: 100%;
			}
			// .see-again{
			// 	left: 0.8rem;
			// }
			.to-share{
				right: 0.133333rem;
			}
		}
	}
</style>