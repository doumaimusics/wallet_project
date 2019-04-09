<template>
	<div class="record">
		<div v-title>我的兑换</div>
		<ul class="record-list"  v-if="recordList.length">
			<li class="bdr-b" @click="goDetail(item.id)" v-for="item in recordList">
				<img class="good-img fl" :src="item.imgUrl"/>
				<div class="good-des fl">
					<p>{{item.name}}</p>
					<p>{{item.exchangeTime}}</p>
				</div>
				<img class="good-arrow fr" src="https://aliyunsso.edspay.com/web/wx/activity/11assist/addrArrow.png"/>
			</li>

		</ul>
		<wx-null v-else  :img="'https://aliyunsso.edspay.com/web/wx/account/accountModify/null_bg.png'" :text="'暂无兑换记录！'"></wx-null>
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
						this.recordList = data.resData.records;
					}
				},{activityId:this.activityIds})
			},
			goDetail (id) {
				this.appRouter('/festMain2/detail',{itemId:id})
			}
		},
		components:{
			wxNull,
		},
		mounted(){
			this.PassValue('我的兑换')
			this.PassValue('NavWhite_我的兑换');
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
		background: white;
		width: 100%;
		height: auto;
		.record-list {
			padding: 0 .533333rem;
			li {
				overflow: hidden;
				height: 2.4rem;
				border-bottom: .013333rem solid #E5E5E5;;
				.good-img {
					width: 1.866667rem;
					height: 1.86667rem;
					background: black;
					margin: .266667rem 0 .266667rem 0;
				}
				.good-des {
					margin: .8rem 0 0 .4rem;
					p:nth-of-type(1) {
						font-size: .4rem;
						color: #000000;
						letter-spacing: .013333rem;
						line-height: .346667rem;
					}
					p:nth-of-type(2) {
						font-size: .32rem;
						color: #808080;
						line-height: .32rem;
						margin-top: .266667rem;
					}
				}
				.good-arrow {
					width: .186667rem;
					height: .346667rem;
					margin-top: 1rem;
				}
			}
		}
	}
</style>