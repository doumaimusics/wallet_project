<template>
	<div class="borrower_list">
		<div v-title>出借记录</div>
		<div class="data_list_title bdr-b">
			<ul>
				<li class="li1">出借用户</li>
				<li class="li2">出借金额(元)</li>
				<li class="li3">出借时间</li>
			</ul>
		</div>
		<mt-loadmore class="mtContent list-contain" v-if="investRecord.length" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul v-for="item in investRecord" class="bdr-b">
				<li class="li11">{{item.userName}}</li>
				<li class="li22">{{item.money | moneyFormat}}</li>
				<li class="li33">{{item.addTime}}</li>
				<!-- <li v-for="item in investRecord">
					<div class="borrower_detail">
						<p><span class="span1">出借用户</span><span class="span2">{{item.userName}}</span></p>
						<p><span class="span1">出借金额(元)</span><span class="span2">{{item.money}}</span></p>
						<p><span class="span1">出借时间</span><span class="span2">{{item.addTime}}</span></p>
					</div>
				</li> -->
				<!-- <div class="nothing"></div> -->
			</ul>
		</mt-loadmore>
		<wx-null v-else :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'"  :text="'暂无列表'"></wx-null>
	</div>
</template>
<script>
	import { Loadmore } from 'mint-ui';
	import wxNull from '../member/account/wxNull';
	import wxToapp from '../../../common/wx/wxToapp';	//适配app
	export default {
		mixins:[wxToapp],
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
				},{pageSize:15,pageNum:num,planId:this.uuid},1)
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
			wxNull
		},
		created() {
			this.uuid = this.$route.query.uuid;
			// if(this.vcode <= '3.3.3'){
			// 	this.$router.replace({path:'/wxInvestRecordPoint2',query: this.$route.query})
			// };
			this.getRecordData(this.pageNum);
		}
	}
</script>
<style scoped lang="scss">
	.borrower_list{
		font-family: PingFangSC-Regular;
		width: 100%;
		height: 100%;
		// min-height:16.453333rem;
		position: relative;
		.nothing{
			height: 1.173333rem;
			width: 100%;
		}
		.data_list_title{
			width: 100%;
			position: fixed;
			height: 0.813333rem;
			left: 0;
			// top: 1.33rem;
			z-index: 20;
			background: #fafafa;
			ul{
				width: 100%;
				height: 100%;
				// border-bottom: 1px solid #e5e5e5;
				position: relative;
				
				li{
					font-size: 0.346667rem;
					color: #333333;
					line-height: 0.813333rem;
					float: left;
				}
				.li1{
					width: 3.173333rem;
					text-indent: 0.4rem;
				}
				.li2{
					width:2.45rem;
					text-align: left;
				}
				.li3{
					width: 4.0rem;
					text-align: right;
				}
			}
		}
		.list-contain{
			position: relative;
			left: 0;
			top: 0.813333rem;
			padding-left: 0.4rem;
			background: #ffffff;
			ul{
				width: 100%;
				height: 1.333333rem;
				// border-bottom: 1px solid #e5e5e5;
				position: relative;
				li{
					width: 100%;
					float: left;
					height: 1.333333rem;
					line-height: 1.333333rem;
					font-size: 0.346667rem;
					color: #333333;
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
				.li11{
					width: 2.773333rem;
					text-align: left;
				}
				.li22{
					width:2.45rem;
					text-align: left;
				}
				.li33{
					width: 4.0rem;
					text-align: right;
				}
			}
		}
		
	}
</style>