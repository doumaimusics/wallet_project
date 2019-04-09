<!-- 普通账户，存管账户 -->
<template>
	<div id="borrower">
		<div class="title_top bdr-b" @click="showList = !showList" v-if="isStart == 1">
			{{titleText}} <span :class="{trans:showList}"></span>
		</div>
		<mt-loadmore v-if="borrowerListDetail.length > 0" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :auto-fill="autoFill" ref="loadmore">
			<ul class="load_list">
				<li v-for="item in borrowerListDetail">
					<div class="borrow_number">借款编号：{{item.orderNo}}</div>
					<div class="borrower_detail">
						<p><span class="span1">借款人</span><span class="span2">{{item.name}}</span></p>
						<p><span class="span1">匹配金额(元)</span><span class="span2">{{item.money}}</span></p>
						<p><span class="span1">相关协议</span><span class="span2"><router-link :to="{path:'/wxBorrowAgreement',query:{matchId:item.matchId,thisUrl:$route.fullPath}}" tag="i">《借款协议》</router-link><router-link :to="{path:'/wxBondsTransferAgreement',query:{matchId:item.matchId}}" v-if='item.agreementType == 2' tag="i">《债权转让协议》</router-link></span></p>
					</div>
				</li>
			</ul>
		</mt-loadmore>
		<!-- <account-null v-else :img="'https://aliyunsso.edspay.com/web/wx/account/InvestNull.png'" :text="'正在匹配借款人'"></account-null> -->
		<jklist-null v-else-if="isStart == 0" :text="'匹配中，请稍后查看...'"></jklist-null>
		<account-null v-else-if="borrowerListDetail.length == 0" :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂无记录'"></account-null>

		<div class="layer" v-if="showList" @click="showList = false">
			<ul>
				<li class="bdr-b" @click="activeLi('use', 0)" :class="{active:screen.use}">进行中</li>
				<li :class="{active:screen.used}" @click="activeLi('used',1)">已结束</li>
			</ul>
		</div>
	</div>
</template>

<script>
	// import accountNull from './wxNull';
	import jklistNull from './jklistNull';
	import accountNull from './wxNull';
	import wxHeader from '../../../wxHeader';
	export default {
		data(){
			return {
				listId:'',
				allLoaded:false,
				autoFill:false,
				pageNum:1,
				pages:1,
				borrowerListDetail: [],
				showList:false,
				titleText:'进行中',
                screen:{
					use:true,
					used:false
				},
				matchStatus:0,
				isStart:0
			}
		},
		methods:{
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					that.getBorrowerDetail(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					that.allLoaded = false;
				},800)
			},
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				this.allLoaded = true;
				var timer = setTimeout(function(){
					if(that.pages >= that.pageNum){
						that.getBorrowerDetail(that.pageNum);
						that.allLoaded = false;
					}
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},500)
			},
			getBorrowerDetail(num) {
				this.postData('/planTender/getUserDebtList',(res,data)=>{
					if (data.resCode) {
						this.isStart = data.resData.isStart;
						if (num == 1){
							this.pages = data.resData.pageInfo.pages;
							this.borrowerListDetail = data.resData.pageInfo.list;
						} else {
							this.borrowerListDetail = this.borrowerListDetail.concat(data.resData.pageInfo.list);
						}
					}
				},{tenderId:this.listId,pageSize:10,pageNum:num,matchStatus:this.matchStatus},1)
			},

			activeLi(num,index){
                for(let item in this.screen){
					this.screen[item] = false;
				}
				if(index == 0){
					this.titleText = "进行中";
					this.matchStatus = 0;
				} else {
					this.titleText = "已结束";
					this.matchStatus = 1;
				}
				this.matchStatus = index;
				this.screen[num] = true;
				this.showList = false;
				this.getBorrowerDetail(this.pageNum);
			}
		},
		components:{
			wxHeader,
			// accountNull,  // 出借人列表空状态旧
			jklistNull,  // 出借人列表进行中空状态新
			accountNull, // 出借人列表已结束空状态
		},
		activated() {
			document.title = ''
			document.title = '借款人列表'
			this.listId = this.$route.query.tenderIds;

			this.matchStatus = 0;
			this.screen.use=true;
			this.screen.used=false;
			this.titleText = "进行中";
			this.getBorrowerDetail(this.pageNum);
			
		},
		created(){
		},
		mounted() {
			
		},
	}
</script>

<style lang="scss" scoped>
	#borrower{
		.title_top{
			width: 100%;
			height: 1.066667rem;
			background: #fff;
			position: relative;
			text-align: center;
			font-size: .373333rem;
			color: #333;
			line-height: 1.066667rem;
			span{
				background:url(https://aliyunsso.edspay.com/web/wx/invest/back_money_ico.png) no-repeat;
				background-size: 0.4rem 0.4rem;
				width: 0.4rem;
				height: 0.4rem;
				position: relative;
				top: .06rem;
				display: inline-block;
				transform: rotate(0deg);
				transition: all 1s ease;
			}
			span.trans{
				transform:rotate(-180deg);
				-ms-transform:rotate(-180deg); /* Internet Explorer */
				-moz-transform:rotate(-180deg); /* Firefox */
				-webkit-transform:rotate(-180deg); /* Safari 和 Chrome */
				-o-transform:rotate(-180deg); /* Opera */
				transition: all 1s ease;
			}
		}
		ul.load_list{
			width: 100%;
			li{
				width: 100%;
				background: #ffffff;
				padding: 0 0.4rem;
				margin-top: 0.266667rem;
				.borrow_number{
					width: 100%;
					height: 1.333333rem;
					line-height: 1.333333rem;
					font-size: 0.373333rem;
					color: #494743;
					border-bottom: 1px solid #e5e5e5;
				}
				.borrower_detail{
					padding: 0.333333rem 0;
					p{
						font-size: 0;
						span{
							display: inline-block;
							width: 50%;
							font-size: 0.373333rem;
							line-height: 0.666667rem;
							i{
								font-size: 0.373333rem;
								color: #508CEE;
							}
						}
						.span1{
							text-align: left;
							color: #8E8E8E;
							width: 40%;
						}
						.span2{
							text-align: right;
							color: #333333;
							width: 60%;
						}
					}
				}
			}
			li:last-child{
				margin-bottom: 0.4rem;
			}
		}
		.layer{
			width: 100%;
			height: 100%;
			position: fixed;
			left: 0;
			top:1.066667rem;
			background: rgba(0, 0,  0, .5);
			ul{
				background: #fff;
				li{
					width: 100%;
					height: 1.066667rem;
					position: relative;
					line-height: 1.066667rem;
					text-align: center;
					font-size: .373333rem;
					font-family: PingFangSC-Regular;
					color: #333; 
				}
				li.active{
					color: #FF5B4C;
				}
			}
		}
	}
</style>