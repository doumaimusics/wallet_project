<template>
	<div class="record" :class="{pad:recordList.length}">
		<div v-title>领取记录</div>
		<div v-if="recordList.length">
			<ul>
				<li class="bdr-b clear" v-for="item in recordList">
					<div class="pic" :style="{background: 'url(' + item.exchangeStr + ') no-repeat', backgroundSize: '100% 100%'}"></div>
					<div class="rightData">
						<div class="top clear">
							<div class="goodsName fl">{{item.name}}</div>
							<div class="marketPrice fr"><em>¥</em>{{item.marketPrice}}</div>
						</div>
						<div class="time">{{item.exchangeTime}}</div>
					</div>
				</li>
			</ul>
		</div>
		<wx-null v-else-if="isGetData" :img="'https://aliyunsso.edspay.com/web/wx/account/accountModify/null_bg.png'" :text="'暂无领取记录！'"></wx-null>
	</div>
</template>
<script>
	import wxNull from '../../member/account/wxNull';
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data() {
			return {
				recordList:[],
				isGetData:false,
				activityIds:'',
			}
		},
		methods:{
			getInfo () {
				this.getAppData('/activity/november/fest/record',(data) => {
					if(data.resCode == 1){
						this.isGetData = true;
						this.recordList = data.resData.activityThree
					}
				},{})
			},
		},
		components:{
			wxNull,
		},
		mounted(){
			this.PassValue('NavWhite_领取记录');
		},
		created(){
			if(this.$route.query.activityId){
				this.activityIds = this.$route.query.activityId;
			}
			this.getInfo ()
		}
	}
</script>
<style lang="scss" scoped>
	.record{
		position: relative;
		ul{
			background: #ffffff;
			padding: 0 .533333rem;
			li{
				position: relative;
				height: 2.4rem;
				padding: .266667rem 0;
				width: 100%;
				.pic{
					width: 1.866667rem;
					height: 1.866667rem;
					// background-color: #eee !important;
					margin-right: .4rem;
					float: left;
				}
				.rightData{
					width: 6.666667rem;
					height: 100%;
					float: left;
					.top{
						width: 100%;
						padding-top: .426667rem;
						padding-bottom: .253333rem;
						line-height: .56rem;
						.goodsName{   // 42
							font-family: PingFangSC-Regular;
							font-size: .4rem;
							color: #000000;
						}
						.marketPrice{   // 38
							font-family: DIN-Bold;
							font-size: .426667rem;
							color: #EB0000;
							em{
								font-size: .32rem;
							}
						}
					}
					.time{     // 34
						font-size: .32rem;
						color: #808080;
						line-height: .453333rem;
					}
				}
			}
		}
	}
</style>