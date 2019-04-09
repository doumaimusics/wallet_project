<template>
	<div id="investRecord">
		<wx-header :logo="logoMsg"></wx-header>
		<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
			<ul class="awards clear">
				<li>
					<div class="firstAward award">首投奖</div>
					<div class="text" v-if="awards.first.userName">{{awards.first.userName}}</div>
					<div class="text" v-else>未开启</div>
				</li>
				<li>
					<div class="kingAward award">标王奖</div>
					<div class="text" v-if="awards.second.userName">{{awards.second.userName}}</div>
					<div class="text" v-else>未开启</div>
				</li>
				<li>
					<div class="lastAward award">尾投奖</div>
					<div class="text" v-if="awards.third.userName">{{awards.third.userName}}</div>
					<div class="text" v-else>未开启</div>
				</li>
			</ul>
			<ul class="listTitle clear">
				<li class="fl">出借用户</li>
				<li class="fl">出借金额(元)</li>
				<li class="fl">出借时间</li>
			</ul>
			<ul class="recordList">
				<li v-for="item in recordList">
					<div class="fl userPhone">{{item.userName}}</div>
					<div class="fl realAmount">{{item.money}}</div>
					<div class="fl trenderSuccessTime">{{item.tenderTime}}</div>
					<!-- <span class="bottomTime">{{item.time}}</span> -->
				</li>
			</ul>
		</mt-loadmore>
	</div>
</template>

<script>
	
	import wxHeader from '../../wxHeader';
	export default {
		data(){
			return {
				logoMsg:'出借记录',
				allLoaded:false,
				autoFill:false,
				uuid:'',
				pageNum:1,
				pages:1,
				awards:{
					first:{userName:''},
					second:{userName:''},
					third:{userName:''},
				},
				award:[],
				recordList:[],
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
				},500)
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
				this.postData('/sina/invest/tenderListApp',(res,data) => {
					if(data.resCode){
						this.pages = data.resData.pageInfo.pages;
						if(num == 1){
							this.recordList = data.resData.pageInfo.list;
						}else{
							this.recordList = this.recordList.concat(data.resData.pageInfo.list);
						}
					}
				},{uuid:this.uuid,pageNum:num})
			}
		},
		components:{
			wxHeader
		},
		created(){
			this.uuid = this.$route.query.uuid;
			this.getData(this.pageNum);
			this.postData('/tender/rewardInfo',(res,data) => {
				this.award = data.resData.pageInfo.list;
				if(this.award.length){
					for(var i=0;i<3;i++){
						if(this.award[i].type == 0){
							this.awards.first = this.award[i];
						}else if(this.award[i].type == 1){
							this.awards.second = this.award[i];
						}else if(this.award[i].type == 2){
							this.awards.third = this.award[i];
						}
					}
				}
			},{uuid:this.uuid},1);
		}
	}
</script>

<style lang="scss" scoped>
	#investRecord{
		.awards{
			background:#fff;
			li{
				float: left;
				padding: 0.533333rem 0 0.386667rem;
				text-align: center;
				.award{
					box-sizing:border-box;
					width: 2.133333rem;
					height: 1.786667rem;
					color: #fff;
					font-size: 0.293333rem;
					padding-top: 0.78rem;
					
				}
				.text{
					padding-top: 0.4rem;
					font-size: 0.346667rem;
					color:#ff5b4c;
				}
			}
			li:first-child{
				padding-left: 0.88rem;
				.award{
					background: url(https://aliyunsso.edspay.com/web/wx/invest/firstAward.png);
					background-size: 100%;
				}
			}
			li:nth-child(2){
				padding-left:0.92rem;
				.award{
					background: url(https://aliyunsso.edspay.com/web/wx/invest/kingAward.png);
					background-size: 100%;
				}
			}
			li:last-child{
				padding-left:0.866667rem;
				.award{
					background: url(https://aliyunsso.edspay.com/web/wx/invest/lastAward.png);
					background-size: 100%;
				}
			}
		}
		.listTitle{
			background: #f3f3f3;
			border-bottom: 0.013333rem solid #c8c7cc;
			li{
				box-sizing:border-box;
				width: 33.3%;
				border-right: 1px solid #c8c7cc;
				margin: 0.333333rem 0;
				text-align: center;
				font-size: 0.346667rem;
				color: #808080;
			}
			li:last-child{
				border-right: 0;
			}
		}
		.recordList li{
			background:#fff;
			position: relative;
			height: 1.36rem;
			font-size: 0.346667rem;
			line-height: 1.36rem;
			padding-left: 0.093333rem;
			border-bottom: 0.013333rem solid #c8c7cc;
			color: #333;
			div{
				box-sizing:border-box;
				width: 33.3%;
				padding-left: 0.666667rem;
			}
			.trenderSuccessTime{
				padding:0.266667rem 0.4rem 0 0;
				line-height:0.4rem;
			}
			.bottomTime{
				position: absolute;
				top: 0.906667rem;
				right: 0.653333rem;
				font-size: 0.266667rem;
				line-height: 0.386667rem;
				color:#9b9b9b;
			}
		}
		
	}
</style>