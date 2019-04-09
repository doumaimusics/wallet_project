<template>
	<div class="borrower_list">
		<mt-loadmore class="mtContent" v-if="investRecord.length" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul>
				<li v-for="item in investRecord">
					<div class="borrower_detail">
						<p><span class="span1">出借用户</span><span class="span2">{{item.userName}}</span></p>
						<p><span class="span1">出借金额(元)</span><span class="span2">{{item.money}}</span></p>
						<p><span class="span1">出借时间</span><span class="span2">{{item.addTime}}</span></p>
					</div>
				</li>
				<div class="nothing"></div>
			</ul>
		</mt-loadmore>
		<wx-null v-else :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'"  :text="'暂无列表'"></wx-null>
	</div>
</template>
<script>
	import { Loadmore } from 'mint-ui';
	import wxNull from '../member/account/wxNull';
	export default {
		data() {
			return {
				pageNum:1,
				pages:1,
				allLoaded:false,
				autoFill:false,
				investRecord: [],
				uuid:'',
			}
		},
		methods: {
			getRecordData(num) {
				this.notLogPost('/financePlan/tenderList',(data) =>{
					if ( data.resCode ) {
						if (num == 1) {
							this.pages = data.resData.pageInfo.pages;
							this.investRecord = data.resData.pageInfo.list;
						} else {
							this.investRecord = this.investRecord.concat(data.resData.pageInfo.list);
						}
					}
				},{pageSize:10,pageNum:num,planId:this.uuid},1)
			},
			loadBottom(){
				this.allLoaded = true;
				var that = this;
				this.pageNum++
				var timer = setTimeout(function(){
					if ( that.pages >= that.pageNum ) {
						that.getRecordData(that.pageNum);
						that.allLoaded = false;
					}
					that.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},500)
			}
		},
		components: {
			wxNull,
		},
		created() {
			this.uuid = this.$route.query.uuid;
			this.getRecordData(this.pageNum);
		}
	}
</script>
<style scoped lang="scss">
	.borrower_list{
		font-family: PingFangSC-Regular;
		width: 100%;
		min-height:16.453333rem;
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
	}
</style>