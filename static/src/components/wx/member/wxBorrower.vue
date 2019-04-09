<template>
	<div id="borrower">
		<wx-header v-if="!osType" :logo="logoMsg"></wx-header>
		<div :style="(osType ? {top:'0'}:{top:'top:1.333333rem'})" class="headerTitle">
			<div class="name fl">姓名</div>
			<div class="identity fl">身份证</div>
			<div class="money fl">借款金额(元)</div>
			<div class="deadline fl">期限</div>
		</div>
		<div class="tiTitle"></div>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul>
				<li v-for="item in investorList">
					<span class="name">{{item.realName}}</span>
					<span class="identity">{{item.cardId}}</span>
					<span class="money">{{item.money | moneyFormat}}</span>
					<span class="deadline">{{item.timeLimit}}</span>
				</li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	import wxToapp from '../../../common/wx/wxToapp'
	import wxHeader from '../../wxHeader';
	export default {
		mixins:[wxToapp],
		data(){
			return {
				uuid:'',
				logoMsg:'借款人信息',
				investorList:[],
				allLoaded:false,
				pageNum:1,
				pages:1,
				autoFill:false,
			}
		},
		computed:{
			dataContent:{
				get(){
					if(osType) return {uuid:this.uuid,pageNum:this.pageNum,pageSize:13,oauthToken:this.token}
					else return {uuid:this.uuid,pageNum:this.pageNum,pageSize:13}
				},
				set(){}
			}
		},
		methods:{
			loadTop(){
				var that = this;
				this.pageNum = 1;
				setTimeout(function(){
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					that.allLoaded = false;
				},800)
			},
			loadBottom(){
				var that = this;
				this.pageNum += 1;
				this.allLoaded = true;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
						that.allLoaded = false;
					}
					clearTimeout(timer)
				},500)
			},
			getData(num){
				this.notLogPost('/borrow/user/list',(data) => {
					console.log(data)
					if(data.resCode == 1){
						this.pages = data.resData.pageInfo.pages;
						if(num == 1){
							this.investorList = data.resData.pageInfo.list;
						}else{
							this.investorList = this.investorList.concat(data.resData.pageInfo.list);
							console.log(this.investorList)
						}
					}
				},{uuid:this.uuid,pageNum:num,pageSize:13,},1)
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.uuid = this.$route.query.uuid;
			console.log(this.uuid)
			if(this.uuid.length == 2){
				this.uuid = this.uuid[0];
			}
			console.log(this.uuid)
			this.getData(this.pageNum)
		}
	}
</script>

<style lang="scss" scoped>
	#borrower{
		.headerTitle{
			box-sizing:border-box;
			position: fixed;
			
			z-index: 10;
			left:0;
			width:100%;
			background: #f3f3f3;
			height: 1.173333rem;
			padding: 0.333333rem 0;
			color: #808080;
			text-align: center;
			font-size: 0.346667rem;
			line-height: 0.493333rem;
			border-bottom: 0.013333rem solid #c8c7cc;
			div{
				border-right: 0.013333rem solid #c8c7cc;
				width: 2.0rem;
			}
			.identity{
				width: 2.94rem;
			}
			.money{
				width: 2.94rem;
			}
			div:last-child{
				border-right: 0;
			}
		}
		.tiTitle{
			height:1.173333rem;;
		}
		ul li{
			background:#fff;
			height: 1.36rem;
			line-height: 1.36rem;
			border-bottom: 0.013333rem solid #c8c7cc;
			font-size: 0.346667rem;
			color: #333;
			span{
				box-sizing:border-box;
				display: inline-block;
				width: 2rem;
			}
			.name{
				padding-left: 0.4rem;
			}
			.identity{
				padding-left: 0.2rem;
				width: 3.1rem;
			}
			.money{
				padding-left: 0.36rem;
				width: 2.7rem;
			}
			.deadline{
				padding-left: 0.546667rem;
				width: auto;
			}
		}
	}
</style>