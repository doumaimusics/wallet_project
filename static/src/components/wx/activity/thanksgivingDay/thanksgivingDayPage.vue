<template>
	<div id="thanksgPage">
		<swiper :options="swiperOption">
			<swiper-slide>
				<div class="top-text">
					<p class="time">{{zcTime}}</p>
					<p>您通过<span>{{zcChannel}}</span></p>
					<p>成为E都市钱包大家庭一员</p>
				</div>
				<div class="bottom-text">
					<p class="time">{{tzTime}}</p>
					<p>您出借了<span>{{tzSignName}} {{tzMoney}}元</span></p>
					<p>从此江湖上又多了一名出借小能手</p>
				</div>
				<div class="slide_icon"></div>
			</swiper-slide>
			<swiper-slide>
				<div class="top-text">
					<p class="time">截至目前</p>
					<p>您共使用了<span>{{totalRed}}张</span>红包</p>
					<p>额外赚取<span>{{earnMoney}}元</span></p>
					<p>给您发了那么多红包 ，您有认真用吗？</p>
				</div>
				<div class="bottom-text">
					<p>您总计出借<span>{{totalInvest}}笔</span></p>
					<p>累计收益<span>{{totalRevenue}}元</span></p>
					<p>{{totalText}}</p>
				</div>
	            <div class="tz-btn" @click="lastPage"></div>
			</swiper-slide>
		</swiper>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import wxShare from '../../../../common/wx/wxShare';   // 分享的
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxShare],
		data() {
			return {
				swiperOption: {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					direction: 'vertical'
				},
				//  第一页数据
				zcTime:'',           //   注册时间
				zcChannel:'',       //    注册渠道
				tzTime:'',         //     首次出借时间
				tzSignName:'',     //     首次出借标名
				tzMoney:0,        //      首次出借金额
				//  第二页数据
				totalRed:0,      //      累计使用红包数
				earnMoney:0,     //      额外赚取金额
				totalInvest:0,   //      累计出借笔数
				totalRevenue:0,  //      累计出借总收益
				totalText:'',
				shareObj: { //分享标题内容配置
					title: "E都市钱包", //标题
					desc: "感恩遇见，一个小小的关怀,一份温暖的体贴,感谢有你!", //内容
					link: "https://www.edspay.com/#/thanksgiving/thanksgivingDayHome", //活动邀请链接
					imgUrl: "http://mystatic.edspay.com/web/webapp/images/edslogo.png" //图片链接
				}
			}
		},
		methods: {
				lastPage() { //   跳转下一页
				this.$router.push({
					path: '/thanksgiving/thanksgivingDayLastPage',
					query: this.$route.query
				});
			},
			dataAtatistisc() {    //  用户数据
				this.notLogPost('/activity/gnjhk/thanksgivingFeedbackRollout', (data) => {
						console.log(data);
						if (data.resCode == 1) {    //  接口请求成功
							// 第一页数据
							this.zcTime = data.resData.registerTime;     //   注册时间 
							                                            //  注册渠道
							if (data.resData.registerSource == '1') {
								this.zcChannel = 'E都市钱包APP IOS'
							} else if(data.resData.registerSource == '2') {
								this.zcChannel = 'E都市钱包APP Android'
							} else if(data.resData.registerSource == '3') {
								this.zcChannel = 'E都市钱包公众号'
							} else if(data.resData.registerSource == '4') {
								this.zcChannel = 'E都市钱包官网  PC'
							} else  {
								this.zcChannel = 'E都市钱包平台活动'
							} 
							this.tzTime = data.resData.firstAddTime;    //  首次出借时间
							this.tzSignName = data.resData.firstName;   //  首次出借标名
							this.tzMoney = data.resData.firstRealAmount //  首次出借金额
							
							// 第二页数据
							this.totalRed = data.resData.redEnvelopeNum;  // 使用红包数
							this.earnMoney = data.resData.redEnvelopeRevenue;  // 额外赚取金额
							this.totalInvest = data.resData.borrowTenderNum;   // 累计出借笔数
							this.totalRevenue = data.resData.totalRevenue;     // 累计总收益
							if (this.totalRevenue == 0) {
								this.totalText = '好伤心，您在平台尚未有累计收益记录！';
							} else if (this.totalRevenue<1000){
								this.totalText = '距离理财达人还差一步，继续加油哦~ ';
							} else if(this.totalRevenue >=1000) {
								this.totalText = '论理财技巧，我甘拜下风！';
							}
						}
					}, (this.osType ? {
						oauthToken: this.token
					} : {}), 1);
								
			}
		},
		components: {
			swiper,
			swiperSlide
		},
		mounted(){
			this.getWxShareData(this.shareObj); //分享调用
		},
		created: function() {   //  调用函数
			this.dataAtatistisc();
		}
	}
</script>

<style lang="scss" scoped>
 @-moz-keyframes bounce{
	 	0% {
	 		-moz-transform: translateY(0rem);
	 	}
	 	50% {
	 		-moz-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-moz-transform: translateY(0rem);
	 	}
	 }
	 @-ms-keyframes bounce{
	 	0% {
	 		-ms-transform: translateY(0rem);
	 	}
	 	50% {
	 		-ms-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-ms-transform: translateY(0rem);
	 	}
	 }
	 @-webkit-keyframes bounce{
	 	0% {
	 		-webkit-transform: translateY(0rem);
	 	}
	 	50% {
	 		-webkit-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-webkit-transform: translateY(0rem);
	 	}
	 }
	 @-o-keyframes bounce{
	 	0% {
	 		-o-transform: translateY(0rem);
	 	}
	 	50% {
	 		-o-transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		-o-transform: translateY(0rem);
	 	}
	 }
	 @keyframes bounce{
	 	0% {
	 		transform: translateY(0rem);
	 	}
	 	50% {
	 		transform: translateY(-0.8rem);
	 	}
	 	100% {
	 		transform: translateY(0rem);
	 	}
	 }
	#thanksgPage{
		width: 10rem;
		height: 16.5rem;
		font-family: DIN-Medium;
		.swiper-container {
			height: 100%;
			.swiper-slide{
				width: 10rem;
				position: relative;
				.top-text,.bottom-text{
					width: 100%;
					
					p{
						font-size: 0.346666rem;
						color: #fff;
							margin-bottom: 0.293333rem;
						span{
							font-size: 0.48rem;
							color: #FFE80E;
						}
					}
					p.time{
						font-size: 0.613333rem;
						color: #FFE80E;
					
					}
				}
				.top-text{
					position: absolute;
					top: 0.613333rem;
					left: 0.8rem;
					
				}.bottom-text{
					position: absolute;
					top: 11rem;
					right: 0.8rem;
					text-align: right;
				}
				.tz-btn{
					width: 6.88rem;
					height: 1.18rem;
					position: absolute;
					left: 1.56rem;
					top: 13.7733rem;
				}
				.slide_icon{
					width: 0.906666rem;
					height: 0.773333rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/slide.png?v=1.0);
					background-size: cover;
					position: absolute;
					left: 0;
					right: 0;
					bottom: 1rem;
					margin: auto;
					-webkit-animation: bounce 2s infinite;
			    -ms-animation: bounce 2s infinite;
			    -moz-animation: bounce 2s infinite;
			    animation: bounce 2s infinite;
				}
			}
			.swiper-slide:nth-child(1) {
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/page1.png?v=1.1') no-repeat;
				background-size: cover;
			}
			.swiper-slide:nth-child(2) {
				background: url('https://aliyunsso.edspay.com/web/wx/activity/thanksgivingDay/page2.png?v=1.0') no-repeat;
				background-size: cover;
				.bottom-text{
					top: 10rem;
				}
			}
		}
	}
</style>