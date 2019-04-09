<template>
	<div class="record" :class="{pad:recordList.length}">
		<div v-title>我的兑换</div>
		<div v-if="recordList.length">
			<div class="list_title">
				<span class="sp1">兑换日期</span>
				<span class="sp2">兑换方式</span>
				<span class="sp3">兑换商品</span>
			</div>
			<ul>
				<li class="bdr-b clear" v-for="item in recordList">
					<div class="sp1">{{item.exchangeTime}}</div>
					<div class="sp2">{{item.exchangeStr}}</div>
					<div class="sp3">{{item.name}}</div>
				</li>
			</ul>
		</div>
		<wx-null v-else-if="isGetData" :img="'https://aliyunsso.edspay.com/web/wx/account/accountModify/null_bg.png'" :text="'暂无兑换记录！'"></wx-null>
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
				this.getAppData('/activity/fest/record',(data) => {
					if(data.resCode == 1){
						this.isGetData = true;
						this.recordList = data.resData.records;

					}
				},{activityId:this.activityIds})
			},
		},
		components:{
			wxNull,
		},
		mounted(){
			this.PassValue('我的兑换')
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
		.list_title{
			width: 100%;
			height: 1.173333rem;
			line-height: 1.173333rem;
			font-size: 0;
			border-bottom: 1px solid #E5E5E5;
			background: #ffffff;
			span{
				display: inline-block;
				text-align: center;
				font-family: PingFang-SC-Medium;
				font-size: 0.4rem;
				color: #333333;
			}
			.sp1{
				width: 3.226667rem;
			}
			.sp2{
				width: 3.626667rem;
			}
			.sp3{
				width: 3.12rem;
			}
		}
		ul{
			padding-left: 0.4rem;
			background: #ffffff;
			li{
				font-size: 0;
				position: relative;
				height: 1.44rem;
				background: #ffffff;
				div{
					text-align: center;
					font-family: PingFangSC-Regular;
					float: left;
				}
				.sp1{
					width: 2.8rem;
					font-size: 0.346667rem;
					color: #999999;
					line-height: 1.44rem;
				}
				.sp2{
					width: 3.626667rem;
					font-size: 0.346667rem;
					color: #666666;
					line-height: 1.44rem;
					white-space: nowrap;
					// overflow: hidden;
				}
				.sp3{
					width: 2.693333rem;
					font-size: 0.32rem;
					height: 1.44rem;
					color: #666666;
					text-align: right;
					display: flex;
					// align-items: center;
					justify-content: center;
					flex-direction: column;
				}
				.sp3.top3{
					position: relative;
				    top: .18rem;
				}
			}
		}
	}
	.pad{
		padding-top: 0.266667rem;
	}
</style>