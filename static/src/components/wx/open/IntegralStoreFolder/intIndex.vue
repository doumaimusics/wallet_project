<template>
	<div class="stroeIndex">
		<title v-title>积分商城</title>
		<mt-loadmore class="noLoading" :class="{loading: isLoading}" :top-method="loadTop" :topDistance="70" :bottomDropText="''" ref="loadmore" @top-status-change="topChange">
			<div slot="top" class="mint-loadmore-top">
				<div class="tTop">
					<img v-if="isDropOver" class="gif" src="https://aliyunsso.edspay.com/web/wxUpdate/dropgif.gif" alt="">
					<img  v-else class="topImg" src="https://aliyunsso.edspay.com/web/wxUpdate/drop.png" alt="">
				</div>
			</div>
			<!-- 签到部分 -->
			<div class="signInBanner">
				<div class="singIn">
					<div class="weeks">
						<div class="week" v-for="(v, i) in isWeek" :class="{three:i == 2,threeY:i==2&&signData.wednesdayIfPrizeDraw,fixe:i == 6,fixeY:i==6&&signData.sundayIfPrizeDraw,active: i == signData.week}" @click="firstPageLink('签到日历','/signIn','/signIn',1)">{{v}} 
							<i v-if="integral.loginStatus == 1 && signData.signLog[i] == 2" class="iconfont falses"></i>
							<i v-else-if="integral.loginStatus == 1 && signData.signLog[i] == 0" class="iconfont hasSign"></i>
						</div>
					</div>
					<div class="integralBox">
						<div class="box_left fl" :class="{active:integral.loginStatus != 0 && integral.invalidScore != ''}">
							<div class="int">我的积分</div>
							<div class="integral" v-if="integral.loginStatus == 0" @click="toLogin">*** ***<i class="top_i"></i></div>
							<div class="integral" v-else-if="integral.loginStatus==1" @click="firstPageLink('积分明细','/intRecordDetail','/intRecordDetail',1)">{{integral.useScore | moneyFormat(1)}}<i></i></div>
							<p class="tips" v-if="integral.loginStatus != 0 && integral.invalidScore != ''">{{integral.invalidScore}}</p>
						</div>
						<div class="integralRight">
							<div class="btnIco tosign" v-if="!signData.ifSignIn || integral.loginStatus == 0" @click="toSignIn(1)"></div>
							<div class="btnIco overIco" v-else></div>
						</div>
					</div>
					<!-- 兑换记录 -->
					<div class="record_ico" @click="toLoginUrl('/intExchRecords')" v-if="!osType">兑换记录</div>
				</div>
			</div>
			<!-- 后台可配置的Icon -->
			<div class="iconLink" v-if="IconList.length != 0">
				<div class="item" v-for="v in IconList" @click="iconLists(v.introduction, v.title)"><img class="pic" :src="v.picPath" alt=""><p class="font">{{v.title}}</p></div>
			</div>
			<!-- 新任务 -->
			<div class="task" v-if="integral.taskName != '' && jumpPage"><span class="task_text">{{integral.taskName}}</span><span class="completeBtn" @click="comp_task">去完成</span></div>
			<!-- 轮播图 -->
			<div class="swipe" v-if="swipeBanner.length">
				<mt-swipe :auto="4000" :showIndicators="true">
				  <mt-swipe-item v-for="item in swipeBanner">
				  	<a v-if="osType" @click="swiperLinkApp(item.title,item.introduction)">
				  		<img :src="item.picPath" alt="">
				  	</a>
				  	<a v-else :href="item.introduction">
				  		<img :src="item.picPath" alt="">
				  	</a>
				  </mt-swipe-item>
				</mt-swipe>
			</div>
			<!-- 商品列表 -->
			<div class="good_list" v-if="goodsList.length">
				<div class="list_title">兑换商品<span @click="firstPageLink('兑换商品','/intGoodList','/intGoodList',0,1)">查看更多<i></i></span></div>
				<ul class="clear">
					<goodItem :item='item' v-for="(item,index) in goodsList"></goodItem>
				</ul>
			</div>
			<div class="rultTips" v-if="osType == 'IOS'">活动由E都市钱包提供，与设备生产商Apple.lnc.公司无关</div>
		</mt-loadmore>
		<div class="nothing" v-if="!osType"></div>
		<!-- 签到成功提示框 -->
		<div  v-layer class="successLayer" v-if="showSuccess">
			<div class="popUp_box">
				<div class="content">{{popNum}}</div>
				<div class="closeBtn" @click="showSuccess = false">确定</div>
				<router-link tag="div" :to="{path:'/vip/treasureIndex'}" class="chuhai">出海寻宝，立即出发</router-link>
			</div>
		</div>
		<!-- 签到成功y有翻牌的提示框 -->
		<div  v-layer class="successLayer btn" v-if="showThis.isShow">
			<div id="star1" class="star star1"></div>
			<div id="star2" class="star star2"></div>
			<div id="star3" class="star star3"></div>
			<div id="star4" class="star star4"></div>
		    <div class="content">{{popNum}}</div>
		    <div class="tips">{{drawText}}</div>
			<div class="closeBtn" @click="showThis.isShow = false"></div>
			<div class="successBtn" @click="firstPageLink('签到日历','/signIn','/signIn',1)"></div>
		</div>
		<wx-footer v-if="!osType"></wx-footer>
		<!-- <dia-logs v-if="showThis.isShow" :showThis="showThis" :text="hasSignData.message" :btn="1" :btnText="['取消','立即翻牌']" :confirm="popConfirm"></dia-logs> -->
	</div>
</template>
<script>
	import wxFooter from '../../../wxFooter';
	import { swiper, swiperSlide } from 'vue-awesome-swiper';
	import wxToapp from '../../../../common/wx/wxToapp';
	import goodItem from './goodItem';
	export default {
		mixins:[wxToapp],
		data(){
			return{
				jumpPage: true,
				popNum:'',
				drawText:'',
				integral:{//积分商城首页
					loginStatus:0,
					useScore: 2222,    // 用户积分
			        taskName: '新用户开户可奖励200积分',   
			        invalidScore: 1000,   // 即将失效积分
			        avatarPicPath: 'https://static.edspay.com/article/1802081010251973-89504E47/view.html'
				},
				goodsList:[],//商品列表
				swipeBanner:[],//轮播图
				hasSignData:{},//签到后数据
				showThis:{//去翻牌弹框
					isShow:false
				},
				cardText:'',//去翻牌弹框文案
				cardBtn:['取消','立即翻牌'],
				signData:{},//签到数据
				lineWidth:8.133333,//线长度
				showSuccess:false,//展示签到成功
				isDropOver: false, // 下拉刷新完成
				isLoading: false, // 下拉loading期间
				isWeek:['周一','周二','','周四','周五','周六',''],
				IconList:[],
			}
		},
		methods:{
			iconLists(link, title){    //4个ICON的跳转
				let i=link.indexOf("#")+1
				let tolink=link.substring(i,link.length)
				// this.firstPageLink(title, tolink, tolink, 0)
				this.toApp('toWeb|'+title+'|https://'+ window.location.host +'/#'+tolink,tolink,0)
			},
			buqian(i){     // 补签功能
				if(this.integral.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					return
				}else{
					// if(this.signData.signLog[i] == 2){

						this.toWxUrl('/signIn')
					// }
				}
			},
			//首页数据
			getInteData(){
				this.getNotlogData('/score/baseUserScore',(data)=>{
					if(data.resCode == 1){
						this.integral = data.resData;
					}
				},{},1)
			},
			//签到数据
			getSignData(){
				this.getNotlogData('/score/getUserSignList',(data) =>{
					if(data.resCode == 1){
						this.signData = data.resData;
					}
				},{})
			},
			//去签到
			toSignIn(n){
				if(this.integral.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					return
				}else{
					let types = 1
					n == 1 ? types = 0 : types = 1
					//添加友盟数据
					_czc.push(﻿["_trackEvent", "积分商城", "签到"]);

					this.getAppData('/score/userSignIn',(data) => {
						if(data.resCode){
							this.hasSignData = data.resData;
							this.getSignData();
							this.getInteData();
							this.drawText = data.resData.messagePrizeDraw;
							this.popNum = data.resData.message;
							if( data.resData.ifPrizeDraw ){
								this.showThis.isShow = true;
							}else{
	                            this.showSuccess = true;
	                            // setTimeout(() =>{
	                            //     this.showSuccess = false;
	                            // },3000)
							}
							setInterval(() =>{
                                $("#star1").animate({opacity:0.2},600).animate({opacity:1}, 600)
                            },1200);
                            setInterval(() =>{
                                $("#star2").animate({opacity:0.2},500).animate({opacity:1}, 600)
                            },1000);
                            setInterval(() =>{
                                $("#star3").animate({opacity:0.2},550).animate({opacity:1}, 450)
							},1000);
							setInterval(() =>{
                                $("#star4").animate({opacity:0.2},500).animate({opacity:1}, 450)
                            },1000);
						}
					},{signInNumber:this.integral.week,type:types})
				}
			},
			//首页与app交互跳转
			firstPageLink(title,appurl,wxUrl,num,type,paramName,param){//标题、链接、是否登陆、添加友盟、参数名、参数
				if(num == 1){
					if(this.integral.loginStatus == 0){
						this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
						return
					}else{
						this.toApp('toWeb|'+title+'|https://'+ window.location.host +'/#'+appurl+(param ? param:''),{path:wxUrl,query:{[paramName]:param}})
					}
				}else{

					if(type == 1){
						_czc.push(﻿["_trackEvent", "积分商城", "查看更多"]);
					}else if(type == 2){
						_czc.push(﻿["_trackEvent", "积分商城", "赚积分"]);
					}
					
					this.toApp('toWeb|'+title+'|https://'+ window.location.host +'/#'+appurl+(param ? param:''),{path:wxUrl,query:{[paramName]:param}})
				}
			},

			//首页轮播图与app交互跳转
			swiperLinkApp(title,appurl){
				this.toApp('toWeb|'+title +'|'+ appurl)
			},

			//轮播图
			swipeData(){
				this.notLogPost('/home/picList',(res) =>{
					if(res.resCode){
						this.swipeBanner = res.resData.data.picList
						this.IconList = res.resData.data.iconList
					}
				},{})
			},

			//商品列表
			goodsData(){
				this.notLogPost('/goods/recommend',(res) =>{
					if(res.resCode){
						this.goodsList = res.resData.scoreGoosModels
					}
				},{})
			},

			// 去翻牌
			// popConfirm(){
			// 	this.showThis.isShow = false
			// 	this.toApp('toWeb|签到日历'+'|https://'+ window.location.host +'/#/signIn',{path:'/signIn'})
			// },

			// 去登陆
			toLogin(){
				this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
			},

			//是否登陆相关判断
			toLoginUrl(realUrl){
				if(this.integral.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else{
					this.toWxUrl(realUrl)
				}
			},


			//去完成任务
			comp_task(){
				if(this.integral.loginStatus == 0){
					// this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					this.firstPageLink('赚取积分','/intEarn','/intEarn',0,2)
				}else{
					if(this.integral.jumpPage == 0){
						//去注册
						this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					}else if(this.integral.jumpPage == 1){
						//开通存管
						this.toApp('OpenDeposit',{path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}})
					}else if(this.integral.jumpPage == 2){
						//去投资列表页
						this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
					}else if(this.integral.jumpPage == 3){
						//赚取任务页面
						this.firstPageLink('赚取积分','/intEarn','/intEarn',0,2)
					}else if(this.integral.jumpPage == 4){
						this.jumpPage = false
					}
				}
			},

			//下拉加载
			loadTop(){
				this.getInteData();
				this.getSignData();
				this.swipeData();
				this.goodsData()
				this.isDropOver = true
				var that =this;
				window.setTimeout(function(){
					that.isDropOver = false
					that.$refs.loadmore.onTopLoaded();
				},1000)
			},

			topChange (val){
				if (val == "loading")this.isLoading = true;
				if (val == "pull")this.isLoading = false;
			},

		},
		components:{
			swiper,
			swiperSlide,
			wxFooter,
			goodItem
		},
		mounted() {
			//给app传值标题名
			this.PassValue('NavWhite_积分商城');
			// this.PassValue('operate|兑换记录|https://' + window.location.host + '/#/intExchRecords');

			//友盟数据
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1273720458&web_id=1273720458'
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		// beforeDestroy(){
        //     this.PassValue('operate');
		// },
		beforeRouteEnter(to, from, next) {
			next(vm => {
				if(from.name=='intExchRecords'){
					sessionStorage.removeItem('tabIndex')
				}
			})
		},
	    watch: {
	    	'$route'() {
	    		if (window._czc) {
	    			let location = window.location
	    			let contentUrl = location.pathname + location.hash
	    			let refererUrl = '/'
	    			window._czc.push(['_trackPageview', contentUrl, refererUrl])
	    		}
	    	},
            '$route.query.zhou'() {
            	this.getAppUserData();
            	this.getInteData();
				this.getSignData();
				this.swipeData();
				this.goodsData()
            }
	    },
		created(){
			this.getInteData();
			this.getSignData();
			this.swipeData();
			this.goodsData()
			this.versionfunegt('3.6.1', '3.6.2')
		}
	}
</script>
<style lang="scss" scoped>
	.stroeIndex{
		// padding-bottom: 1.33rem;
		font-family: PingFangSC-Regular;

		// 改版的内容
		.signInBanner{
			width: 100%;
			// height: 5.226667rem;
			height: 4.733333rem;
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/signInBanner.png) no-repeat;
			background-size: 100% 5.226667rem;
			padding: .733333rem .533333rem 0;
			.singIn{
				position: relative;
				width: 8.933333rem;
				height: 4rem;
				background: #fff;
				box-shadow: 0 2px 14px 0 rgba(0,0,0,0.11);
				.weeks{
					width: 100%;
					height: 1.2rem;
					justify-content:space-between;
					display: flex;
					background: #333;
					.week{
						width: 1.253333rem;
						height: 1.2rem;
						background-color: #444;
						text-align: center;
						font-size: .293333rem;
						padding: .2rem .48rem;
						color: #D3D3D3;
						position: relative;
						i{
							position: absolute;
							top: 0;
							right: 0;
							width: .533333rem;
							height: .346667rem;
						}
						i.falses{
							background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/falses.png) no-repeat;
							background-size: 100%;
						}
						i.hasSign{
							width: .56rem;
							height: .426667rem;
							background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/hasSign.png) no-repeat;
							background-size: 100%;
						}
					}
					.week.three, .week.fixe{
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/giftIcon1.png) no-repeat center center;
						background-size: .533333rem .533333rem;
						background-color: #444;
					}
					.week.threeY, .week.fixeY{
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/giftIcon.png) no-repeat center center;
						background-size: .533333rem .533333rem;
						background-color: #444;
					}
					.week.active{
						background-color: #fff;
						color: #333;
					}
				}
				.integralBox{
					width: 100%;
					height: 3.04rem;
					padding: .666667rem .466667rem 0;
					.box_left{
						width: 5.733333rem;
						height: auto;
						.int{
							font-size: .32rem;
							color: #808080;
							margin-top: .106667rem;
						}
						.integral{
							font-family: DIN-Medium;
							height: .906667rem;
							line-height: .906667rem;
							font-size: .746667rem;
							color: #333333;
							margin-bottom: .186667rem;
							i{
								display: inline-block;
								width: 0.346667rem;
								height: .906667rem;
								background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/next2.png) no-repeat center center;
								background-size:0.346667rem 0.346667rem; 
								top: .19rem;
								position: relative;
							}
							i.top_i{
								top: 0.03rem;
							}
						}
						.tips{
							opacity: 0.72;
							font-family: PingFangSC-Regular;
							font-size: .293333rem;
							color: #808080;
						}
					}
					.box_left.active{
						margin-top: -0.33333rem;
					}
					.integralRight{
						width: 2.24rem;
						float: right;
						padding-top: .45rem;
						.btnIco{
							width: 2.32rem;
							height: 1.066667rem;
						}
						.tosign{
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/to_sign1.png) no-repeat;
							background-size: 100%;
						}
						.overIco{
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/unsign1.png) no-repeat;
							background-size: 100%;
						}
					}
				}
				.record_ico{
					color: #333;
					font-size: .32rem;
					position: absolute;
					top: 1.533333rem;
					right: .666667rem;
				}
			}
		}
		.iconLink{
			width: 100%;
			background: #fff;
			padding: .346667rem 0 .533333rem 0;
			display: flex;
			justify-content:space-around;
			.item{
				width: 2.24rem;
				height: 1.906667rem;
				.pic{
					width: 100%;
					height: 1.44rem;
					margin-bottom: .026667rem;
				}
				.font{
					font-size: .32rem;
					color: #333333;
					width: 100%;
					height: .44rem;
					line-height: .44rem;
					text-align: center;
				}
			}
		}
		.rultTips{
			font-size:0.266667rem;
			color:#C1C1C1;
			padding:0.4rem 0;
			text-align:center;
		}
		.mint-loadmore-top{
			margin-top: -4.32rem;
			background-size:100% 100%;
			height:4.32rem;
			.tTop{
				margin-top: -3.333333rem;
				padding-top:3.2rem;
				height: 1.333333rem;
				.gif{
					width: 1.52rem;
					height: 1.52rem;
					margin-top: -1rem;
				}
				.topImg{
					margin-top: -1rem;
					width: 1.52rem;
					height: 1.52rem;
				}
				img{
					display:block;
					margin: 0 auto;

				}
			}
			span{
				color:#fff;
			}
		}
		.noLoading {
			padding-top: 0rem;
		}
		.loading {
			padding-top: 1.333333rem;
		}
		.successLayer{
			font-family: PingFangSC-Regular;
		    background-color:rgba(0,0,0,0.7)!important;
			.popUp_box{
				position: fixed;
				top: 0;
				left: 0;
				bottom: 0;
				right: 0;
				margin: auto;
				width: 7.493333rem;
				height: 8.493333rem;
				background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/newOneBtn.png?v=1.1) no-repeat center center;
			   background-size: 7.493333rem 8.493333rem; 
			   padding-top: 4rem;
			
				.content{
					height: .6rem;
					width: 100%;
					margin: 1rem auto 0;
					font-size: .426667rem;
					line-height: .6rem;
					text-align: center;
					color: #333;
				}
				.closeBtn{
					width: 6.666667rem;
					height: .96rem;
					margin:.666667rem auto .4rem auto;
					// background-image: linear-gradient(90deg, #FF6737 0%, #FF3934 100%);
					background: #F14B4B;
					border-radius: .106667rem;
					font-family: PingFangSC-Regular;
					font-size: .426667rem;
					color: #FFFFFF;
					text-align: center;
					line-height: .96rem;
					border-radius: .48rem;
				}
				.chuhai{
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: .32rem;
					color: #508CEE;
				}
			}
			.star{
				position: absolute;
				background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/smallStars.png) no-repeat;
				background-size:auto 100%!important;
			}
			.star1{
				height:.4rem;
				width:.493333rem;
				top:50%;
				left: 50%;
				margin: -3.2rem 0 0 -1.5rem;
			}
			.star2{
				height:.64rem;
				width:.506667rem;
				top:50%;
				right: 50%;
				margin: -3.4rem -1.6rem 0 0;
			}
			.star3{
				height:.64rem;
				width:.506667rem;
				top:50%;
				left: 50%;
				margin: -1.2rem 0 0 -2rem;
			}
			.star4{
				height:.346667rem;
				width:.44rem;
				top:50%;
				right: 50%;
				margin: -1.1rem -2.1rem 0 0;
			}
		
		}
		.successLayer.btn{
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/twoBtn.png) no-repeat center center;
			background-size: 7.493333rem 9.16rem; 
			.content{
				margin: .8rem auto 0;
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
		        height: .6rem;
		        width: auto;
		        font-size: .426667rem;
		        line-height: .6rem;
		        text-align: center;
		        color: #333;
			}
			.tips{
				position: absolute;
				top: 50%;
				left: 0;
				right: 0;
		        height: .6rem;
		        width: auto;
		        margin: 1.7rem auto 0;
		        font-size: .4rem;
		        line-height: .6rem;
		        text-align: center;
		        color: #808080;
			}
			.closeBtn{
				position: absolute;
				top: 50%;
				width: 2.986667rem;
				height: .96rem;
				left: 50%;
				margin: 3.08rem 0 0 -3.333333rem;
			}
			.successBtn{
				position: absolute;
				top: 50%;
				width: 2.986667rem;
				height: .96rem;
				right: 50%;
				margin: 3.08rem -3.333333rem 0 0 ;
			}

		}
		.main_wrap{
			position: relative;
		}
		.head{
			padding: 0.533333rem 0.613333rem 0 0.533333rem;
			height: 5.2rem;
			background: #FAFAFA;
			.box_left{
				width: 70%;
				.int{
					font-size: 0.346667rem;
					color: #333333;
					margin-bottom: 0.093334rem;
					i{
						width: 0.4rem;
						height: 0.4rem;
						background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/sig.png) no-repeat;
						background-size: 0.4rem 0.4rem;
						margin-left: 0.133333rem; 
						display: inline-block;
						position: relative;
					    top: .05rem;
					}
				}
				.integral{
					font-family: DIN-Medium;
					font-size: 0.666667rem;
					color: #333333;
					margin-bottom: 0.053333rem;
					i{
						display: inline-block;
						width: 0.346667rem;
						height: 0.346667rem;
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/next2.png) no-repeat;
						background-size:0.346667rem 0.346667rem; 
						top: -.05rem;
					    position: relative;
					}
					i.top_i{
						top: -0.18rem;
					}
				}
				.tips{
					font-size: 0.293333rem;
					color: #FF5B4C;
				}
			}
			.box_right{
				width: 30%;
				.record_ico{
					font-size: 0.4rem;
					color: #333333;
					text-align: right;
					padding-top: .4rem;
					i{
						display: inline-block;
						width: 0.4rem;
						height: 0.4rem;
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/next.png) no-repeat;
						background-size: 0.4rem 0.4rem;
						position: relative;
					    top: 0.05rem;
					}
				}
				.record_ico.common_question{
					padding-top: .3rem;
				}
				.record_ico.common_question i{
					width: 0.5rem;
					height: 0.5rem;
					background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/sig.png) right no-repeat;
					background-size: 0.4rem 0.4rem;
					margin-left: 0.033333rem; 
					display: inline-block;
					position: relative;
				    top: .12rem;
				}
			}
			.record_ico.noPadd{
				padding-top: 0rem;
				font-size:0.373333rem;
				color:#808080;
			}
		}
		.hei{
			height: 5.706667rem;
		}
		.none{
			width: 100%;
			height: 2.0266667rem;
			background:#ffffff;
		}
		.signIn{
			height: 5.066667rem;
			width: 100%;
			position: absolute;
			top: 2.186667rem;
			z-index: 10;
			.sign_box{
				width: 9.733333rem;
				height: 5.066667rem;
				background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/Rectangle15.png) no-repeat;
				background-size: 100%;
				margin: 0 auto;
				.sign_btn_box{
					width: 8.933333rem;
					margin: 0 auto;
					padding-top: 0.693333rem;
					.box_left{
						width: 60%;
						padding-left:0.533333rem; 
						margin-bottom: 0.233333rem;
						.big_title{
							font-size: 0.4rem;
							color: #333333;
							font-family: PingFangSC-Semibold;
							margin-bottom: 0.08rem;
						}
						.small_title{
							font-size: 0.32rem;
							color: #808080;
						}
					}
					.box_right{
						width: 40%;
						.btnIco{
							width: 2.266667rem;
							height: 1.066667rem;
							margin-right: 0.533333rem;
						    float: right;
						}
						.tosign{
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/to_sign.png) no-repeat;
							background-size: 2.266667rem 1.066667rem;
						}
						.overIco{
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/unsign.png) no-repeat;
							background-size: 2.266667rem 1.066667rem;
						}
					}
				}
			}
		}
		.top2{
			top: 6.506667rem;
		}
		.top1{
			top: 2.613333rem;
		}
		.enter{
			width: 100%;
			height: 1.333333rem;
			background: #ffffff; 
			font-size: 0.4rem;
			color: #333333;
			line-height: 0.933333rem;
			margin-bottom: 0.266667rem;
			padding-top: 0.066667rem;
			.enter_left{
				width: 49%;
				height: 0.933333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/enter_icon1.png) 0.666667rem 0 no-repeat;
				background-size: 0.88rem;
				text-indent: 1.946667rem;

			}
			.middle{
				width: 1%;
				height: 0.933333rem;
				position: relative;
				// border-left: 1px solid #e5e5e5;

			}
			.enter_right{
				width: 49%;
				height: 0.933333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/enter_icon2.png) 0.666667rem 0 no-repeat;
				background-size: 0.88rem;
				text-indent: 1.946667rem;
			}
		}
		.task{
			width: 100%;
			height: 1.45rem;
			font-size: 0.346667rem;
			color: #333333;
			margin-bottom: .266667rem;
			padding:0 0.533333rem 0 1.466667rem;
			line-height: 1.2rem;
			background:#ffffff url(https://aliyunsso.edspay.com/web/wx/integralStroe/renwu.png) 0.533333rem 0.266667rem no-repeat;
			background-size: 0.666667rem 0.666667rem; 
			.task_text{
				display: inline-block;
				width: 6.22rem;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
			}
			.completeBtn{
				display: inline-block;
				width: 1.6rem;
				height: 0.666667rem;
				font-size: 0.346667rem;
				color: #FFFFFF;
				background-image: linear-gradient(-45deg, #FF6554 0%, #FF3F38 100%);
				border-radius: 1.333333rem;
				float: right;
			    position: relative;
			    top: 0.266667rem;
			    line-height: 0.666667rem;
			    text-align: center;
			}
		}
		.swipe{
			height: 2.4rem;
			width: 100%;
			position: relative;
			clear: both;
			background:#ffffff;
			margin-bottom: 0.266667rem;
			a{
				display: block;
				width: 100%;
				height: 100%;
				img{
					width: 100%;
					height: 100%;
				}
			}

		}
		.good_list{
			width: 100%;
			height: auto;
			background: #ffffff;
			padding: .4rem .4rem;
			.list_title{
				width: 100%;
				font-size: 0.4rem;
				color: #333333;
				margin-bottom: 0.4rem;
				span{
					font-size: 0.346667rem;
					color: #808080;
					float: right;
					i{
						display: inline-block;
						width: 0.386667rem;
						height: 0.386667rem;
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/next3.png) no-repeat;
						background-size: 0.386667rem;
						position: relative;
					    top: 0.05rem;
					}
				}
			}
			ul{
				width: 100%;
				li:nth-child(odd){
					margin-right: .266667rem;
				}
			}
		}
		.nothing{
			height: 1.33rem;
		}
	}
</style>
<style lang="scss">
	.mint-swipe-indicator{
		opacity: 0.2;
		background: #000;
		border-radius: 0.053333rem;
		width: 0.106667rem;
		height: 0.106667rem;
	}
	.mint-swipe-indicator.is-active{
		width: 0.32rem;
		height: 0.106667rem;
		opacity: 0.3;
		background: #000000;
		border-radius: 0.053333rem;
	}
	.mint-indicator-wrapper{
		z-index: 9999;
	}
</style>