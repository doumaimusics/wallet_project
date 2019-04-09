<template>
	<div class="records">
		<title v-title>积分明细</title>
		<div class="allInt">
			<div class="banner bdr-t bdr-b-20">
				<!-- <p class="name">我的可用积分</p> -->
				<p class="integral">{{intRecord.useScore ? intRecord.useScore:0 | moneyFormat(1)}}<em>积分</em></p>
			
				<div class="iconList">
					<div class="buttonList fl" v-for=" (v, i) in iconListBtn" @click="firstPageLink(i)"><i :style="{background:'url(https://aliyunsso.edspay.com/web/wx/integralStroe/topLinkIcon' + (i+1) + '.png?v=1.0)no-repeat center center / .32rem .32rem'}"></i><span>{{v}}</span></div>
				</div>
			</div>
			<div class="menu bdr-b">
				<span class="menu_check" @click="choiceShow">{{menuName}}</span><i :class="{up:!showList}"></i>
			</div>
		</div>

		<div class="none"></div>
		 <!-- v-if="intList.length" -->
		<div class="score" v-if="menuNum == 1">获得:<span class="span2">{{(intRecord.totalScore ? intRecord.totalScore:0) | moneyFormat(1)}}</span>(积分)</div>
		<div class="score" v-if="menuNum == 2">消耗:<span>{{(intRecord.hisScore ? intRecord.hisScore:0) | moneyFormat(1)}}</span>(积分)</div>
		<div class="records_list" v-if="intList.length">
			<mt-loadmore class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
				<ul>
					<int-list v-for="item in intList" :listData="item"></int-list>
				</ul>
			</mt-loadmore>
		</div>
		<wx-null v-else-if="isGetData" :text="nullText" :classType="1"></wx-null>
		<div v-layer v-if="showList"></div>
		<div class="menu_list" v-if="showList">
			<div class="icons bdr-b">
				<ul class="content clear">
					<li class="all" @click="activeLi('all',0)">
						<div class="img" :class="{active:screen.all}"></div>
						<p :class="{actveTxt:screen.all}">全部</p>
					</li>
					<li class="has" @click="activeLi('has',1)">
						<div class="img" :class="{active:screen.has}"></div>
						<p :class="{actveTxt:screen.has}">获得</p>
					</li>
					<li class="used nomar" @click="activeLi('used',2)">
						<div class="img" :class="{active:screen.used}"></div>
						<p :class="{actveTxt:screen.used}">消耗</p>
					</li>
				</ul>
			</div>
			<div class="icon_btn" @click="cancel">取消</div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import intList from './public/intList';//积分
	import wxNull from './null';//空状态
	export default {
		mixins:[wxToapp],
		data(){
			return{
				iconListBtn: ['兑换商品','赚取积分','兑换记录'], //  icon按钮名字
				iconListSrc:['https://aliyunsso.edspay.com/web/wx/integralStroe/topLinkIcon1.png','',''],
				lostStatus:0,//是否登陆
				pageNum:1,	//当前页数
				pages:0,	//总页数
				menuNum:0,
				allLoaded:false,	//是否允许加载
				autoFill:false,		//是否默认加载
				menuName:'全部', //选择类别
				showList:false,//选项展示
				status:0,//接口传参
				screen:{//分类显示隐藏切换
					all:true,
					has:false,
					used:false
				},
				intRecord:{ //积分明细数据
					hisScore:'',
					totalScore:'',
					useScore:'',
					paymentsType:0,
					pageInfo:{
						list:[
							// {
							// 	addTime:'2018.05.03',
							// 	id:11,
							// 	name:'翻牌',
							// 	remark:'爱奇艺2个月黄金会员',
							// 	score:'-10',
							// 	paymentsType:2,
							// }
						]
					}
				},
				intList:[],//积分明细列表
				nullText:'您目前暂无积分记录！',//空状态的文案
				isGetData:false,//接口数据还没加载出来
				emWidth: 0,//带边框的ico设置
				spanWidth:0
			}
		},
		methods:{
			firstPageLink(n){    // 头部跳转的三个icon
				if(!this.hasLogin){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					return
				}
				if(n==0){
					if(this.osType && !this.versionfunegt(this.vcode,'3.6.3')){
						this.toApp('GoodsList',{path:'/intGoodList',query:this.$route.query})
					}else{
						this.$router.push({path:'/intGoodList',query:this.$route.query})
					}
				} else if(n==1){
					this.$router.push({path:'/intEarn',query:this.$route.query})
				} else if(n==2){
					this.$router.push({path:'/intExchRecords',query:this.$route.query})
				}
				
			},
			//显示类别
			choiceShow(){
				this.showList = true;
			},
			cancel(){
				this.showList = false;
			},
			//切换类别
			activeLi(num,index){
				for(var item in this.screen){
					this.screen[item] = false;
				}
				this.screen[num] = true;
				this.menuNum = index;
				if(index == 0){
					this.menuName = '全部';
					this.nullText = '您目前暂无积分记录！';
				}else if(index == 1){
					this.menuName = '获得';
					this.nullText = '您目前暂无获得积分记录！';
				}else if(index == 2){
					this.menuName = '消耗';
					this.nullText = '您目前暂无消耗积分记录！';
				}
				this.showList = false;
				this.intList=[];//数据初始化
				this.pageNum = 1;//当前页初始化
				this.allLoaded = false;//上拉加载初始化
				this.isGetData = false;
				this.getIntData(index,this.pageNum)
				//发送请求
			},

			//列表数据
			getIntData(statusType,num){
				this.getAppData('/score/userScoreList',(data) =>{
					if(data.resCode == 1){
						this.isGetData = true;
						this.intRecord = data.resData;

						if(num == 1){
							this.intList = data.resData.pageInfo.list;
							this.pages = data.resData.pageInfo.pages;
						}else{
							this.intList = this.intList.concat(data.resData.pageInfo.list)
						}
					}

				},{paymentsType:statusType,pageNum:num,pageSize:10},1)
			},

			//上拉加载
			loadBottom(){
				var that = this;
				this.showList = false;
				this.pageNum += 1;
				this.allLoaded = true;
				var timer = setTimeout(function(){
					if(that.pages >= that.pageNum){
						that.getIntData(that.menuNum,that.pageNum);
						that.allLoaded = false;
					}
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},500)
			},
		},
		components:{
			wxNull,
			intList
		},
		mounted() {
			//给app传值标题名
			this.PassValue('NavWhite_积分明细');
	    },
		created(){
			this.getIntData(0,this.pageNum)
		}
	}
</script>
<style lang="scss" scoped>
	.records{
		font-family: PingFangSC-Regular;
		.allInt{
			width: 100%;
			height: 4.933333rem;
			position: fixed;
			left: 0;
			top: 0;
			z-index: 99;
			background: rgb(248, 248, 248);
			.banner{
				width: 100%;
				height: 3.6rem;
				padding-top:.72rem;
				background: #fff;
				margin-bottom: .266667rem;
				.integral{
					position: relative;
					left: 0;
					right: 0;
					margin: 0 auto 0.72rem;
					height: 36px;
					margin-right: -0.666667rem;
					font-family: DIN-Medium;
					font-size: .666667rem;
					color: #333;
					line-height: .8rem;
					em{
						width: .666667rem;
						font-size: .32rem;
						color: #808080;
					}
				}
				.iconList{
					width: 100%;
					height: .666667rem;
					justify-content: center;
					display: -webkit-flex;
					display: flex;
					justify-content:space-between;
					flex-grow:0;
					padding: 0 1.453333rem;
					margin-bottom: .533333rem;
					.buttonList{
						width: 2.08rem;
						height: .666667rem;
						// line-height: .693333rem;
						text-align: center;
						border: 1px solid #E5E5E5;
						border-radius: 2px;
						i{
							// margin-top: .173333rem;
							width: .32rem;
							height: .32rem;
							display: inline-block;
							vertical-align: middle;
							margin-right: .133333rem;
						}
						span{
							display: inline-block;
							font-size: .293333rem;
							color: #4A4A4A;
							line-height: .64rem;
							vertical-align: middle;
						}
					}
				}
			}
			p{
				text-align: center;

			}
		}
		.menu{
			height: 1.066667rem;
			background:#ffffff;
			line-height: 1.066667rem;
			padding-left: 0.533333rem;
			position: relative;
			.menu_check{
				font-size: 0.4rem;
				color: #333333;
			}
			i{
				width: 0.4rem;
				height: 0.4rem;
				background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/up.png) no-repeat;
				background-size:100%; 
				display: inline-block;
				position: relative;
				top: .08rem;
			}
			i.up{
				background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/down.png) no-repeat;
				background-size:100%; 
			}
			
		}
		.score{
			height: 0.666667rem;
			line-height: 0.666667rem;
			padding-left: 0.533333rem;
			font-size: 0.32rem;
			color: #808080;
			span{
				font-size: 0.32rem;
				color: #FF5B4C;
				margin-left: 0.133333rem;
				margin-right: 0.133333rem;
			}
			span.span2{
				color: #508CEE;
			}
		}
		.menu_list{
			width: 100%;
			height: 4.48rem;
			background: #ffffff;
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 9999;
			box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
			-moz-box-shadow:0 0 12px 0 rgba(0,0,0,0.12);
			-webkit-box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);

			.icons{
				width: 8.933333rem;
				height: 3.16rem;
				position: relative;
				margin: 0 auto;
				padding-top: 0.666667rem;
				.content{
					padding-left: 1.066667rem;
					li{
						width: 1.2rem;
						float: left;
						margin-right: 1.56rem;
						p{
							text-align: center;
							font-size: 0.32rem;
							color: #808080;
						}
						p.actveTxt{
							color: #333333;
						}
					}
					li.nomar{
						margin-right: 0;
					}
					.img{
						margin-bottom: 0.186667rem;
					}
					.all{
						.img{
							width: 1.2rem;
							height: 1.2rem;
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/quanbuhui.png) no-repeat;
							background-size: 100%;
							margin-bottom: 0.186667rem;
						}
						.img.active{
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/bottonIcon1.png) no-repeat;
							background-size: 100%;
						}
					}
					.has{
						.img{
							width: 1.2rem;
							height: 1.2rem;
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/checkTab1.png) no-repeat;
							background-size: 100%;
						}
						.img.active{
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/bottonIcon2.png) no-repeat;
							background-size: 100%;
						}
					}
					.used{
						.img{
							width: 1.2rem;
							height: 1.2rem;
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/checkTab2.png) no-repeat;
							background-size: 100%;
						}
						.img.active{
							background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/bottonIcon3.png) no-repeat;
							background-size: 100%;
						}
					}
				}
			}
			.icon_btn{
				width: 100%;
				line-height: 1.32rem;
				text-align: center;
				font-size: 0.533333rem;
				color: #333333;
			}
		}
		.none{
			// height: 6.4rem;
			height: 4.933333rem;
			background: #ffffff;
			// margin-bottom: 0.266667rem;
		}
		.records_list{
			width: 100%;
			position: relative;
			z-index: 9;
			background: #ffffff;
			ul{
				width: 100%;
				padding-left: 0.533333rem;
				
			}
		}
	}
</style>