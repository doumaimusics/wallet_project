<template>
	<div class="borrower_list">
		
		<mt-loadmore v-if="borrowList.length" class="mtContent" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<p class="tips" >注：出借人以最终智能匹配到的借款人为准</p>
			<ul>
				<li v-for="item in borrowList" @click="goBorrowerDetail(item)">
					<div class="borrow_number bdr-b">借款编号：{{item.orderNo}}</div>
					<div class="borrower_detail">
						<p><span class="span1">借款人</span><span class="span2">{{item.name}}</span></p>
						<p><span class="span1">身份证号</span><span class="span2">{{item.cardId}}</span></p>
						<p><span class="span1">借款金额(元)</span><span class="span2">{{item.money | moneyFormat}}</span></p>
					</div>
				</li>
			</ul>
		</mt-loadmore>		
		<wx-null v-else :img="'https://aliyunsso.edspay.com/web/wx/account/jinxingzhon_null.gif'" :text="'债权信息正在获取中...'"></wx-null>
		<!-- 底部文字 -->
		<div class="footer-div" v-if="onOff">
			<img src="https://aliyunsso.edspay.com/web/wxUpdate/left_line.png" alt="">
			数据过多，仅展示部分数据
			<img src="https://aliyunsso.edspay.com/web/wxUpdate/right_line.png" alt="">
		</div>
		<div class="nothing"></div>
	</div>
</template>
<script>
	import { Loadmore } from 'mint-ui';
	import wxToapp from '../../../common/wx/wxToapp';	//适配app
	import wxNull from '../member/account/wxNull';
	export default {
		mixins:[wxToapp],
		// props:['planId'],
		data() {
			return {
				pageNum:1,
				pages:1,
				allLoaded:false,
				autoFill:false,
				borrowList: [],
				uuid:'',
				onOff:false
			}
		},
		methods: {
			// toWxUrl('/wxBorrowerDetail','orderNoss',item.orderNo,'formBorrowDetail',1)
			goBorrowerDetail(item) {
				this.toApp('toWeb|'+ item.orderNo +'|https://'+ window.location.host +'/#/wxBorrowerDetail2?orderNoss='+ item.orderNo,{path:'/wxBorrowerDetail2',query:{orderNoss:item.orderNo}})
			},
			getBorrData(num) {
				this.notLogPost('/financePlan/borrowList',(data) =>{
					console.log(data);
					if ( data.resCode ) {
						if (num == 1) {
							this.pages = data.resData.pageInfo.pages;
							this.borrowList = data.resData.pageInfo.list	
						} else {
							this.borrowList = this.borrowList.concat(data.resData.pageInfo.list);
						}
					}//this.uuid
				},{pageNum:num,pageSize:10,planId:this.uuid},1)
				
			},
			loadBottom(){
				this.allLoaded = true;
				var that = this;
				this.pageNum++
				var timer = setTimeout(function(){
					if(that.pages>=that.pageNum){
						that.getBorrData(that.pageNum);
						that.allLoaded = false;
					} else {
						that.onOff = true;
					}
					that.$refs.loadmore.onBottomLoaded(); 
					clearTimeout(timer);
				},500)
			}
		},
		components: {
			wxNull,
		},
		created() {
			this.uuid = this.$route.query.uuid;
			this.getBorrData(this.pageNum);
		}
	}
</script>
<style scoped lang="scss">
	.borrower_list{
		font-family: PingFangSC-Regular;
		width: 100%;
		
		.tips{
				padding: 0.266667rem 0.8rem;
				font-size: 0.32rem;
				color: #8D8D8D;
				line-height: .6rem;
			}
		
		.nothing{
			height: 1.173333rem;
			width: 100%;
		}
		ul{
			width: 100%;
			li{
				width: 100%;
				background: #ffffff;
				padding: 0 0.4rem;
				background: #ffffff;
				margin-bottom: 0.266667rem;
				.borrow_number{
					width: 100%;
					height: 1.333333rem;
					line-height: 1.333333rem;
					font-size: 0.373333rem;
					color: #494743;
					position: relative;
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
						}
						.span1{
							text-align: left;
							color: #8E8E8E;
						}
						.span2{
							text-align: right;
							color: #333333;
						}
					}
				}
			}
		}
		.footer-div {
			font-size: .293333rem;
			color: #C1C1C1;
			line-height: .533333rem;
			text-align: center;
			margin: .44rem 0rem .44rem 0rem;
			img {
				width: 1.573333rem;
				height: .56rem;
				margin: 0 .133333rem;
			}
		}
	}
</style>