<template>
	<div id="bank">
		<div class="top" v-show="entrance != 'sina'">
			<div class="name fl">银行名称</div>
			<div class="once fl">单笔转入限额</div>
			<div class="oneDay fl">单日累计限额</div>
		</div>
		<div class="tiTop"  v-show="entrance != 'sina'"></div>
		<ul>
			<li v-for="item in bankList" @click="getBank((item.bankName ? item.bankName:item.name),item)">
				<div class="title fl">
					<img :src="item.picPath" alt="">
					<div class="name fl">{{item.bankName ? item.bankName:item.name}}</div>
					<div class="line fr"  v-show="entrance != 'sina'"></div>
				</div>
				<div class="once fl">{{item.singleLimit | changeWan}}</div>
				<div class="oneDay fl">{{item.dailyLimit | changeWan}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp';    
	export default {
		mixins:[wxToapp],
		data(){
			return {
				bankList:[],
				entrance:'',
				dataUrl:'',		//获取数据接口
				toUrl:'',
			}
		},
		methods:{
			getBank(name,item){
				if(this.entrance == 'sina'){
					this.appRouter(this.toUrl,{bankName:name,value:item.value},1)
				}else if(this.entrance == 'zsAmendCard'){
					this.appRouter(this.toUrl,{bankName:name,bankCode:item.bankCode},1)
				}else{
					this.appRouter(this.toUrl,{bankName:name,bankCode:item.bankCode},1)
				}
			}
		},
		components:{
			
		},
		activated(){
			document.title = ''
			document.title = '开户银行'
			var that = this;
			this.entrance = this.$route.query.entrance;
			this.dataUrl = this.$route.query.dataUrl;
			this.notLogPost(this.dataUrl,function(res){
				if(res.resCode){
					if(that.entrance == 'sina'){
						that.bankList = res.resData.accountBankList
					}else{
						that.bankList = res.resData.bankList
					}
				}
			},{})
			if(this.entrance == 'sina'){this.toUrl = '/wxMyAccount/wxBindingCard'}
			else if(this.entrance == 'zsAmendCard'){this.toUrl = '/wxMyAccount/wxAmendCard'}
			else{this.toUrl = '/wxDepository'}
		}
	}
</script>

<style lang="scss" scoped>
	#bank{
		color:#808080;
		.top{
			position:fixed;
			top:0;
			left:0;
			width:100%;
			height:0.8rem;
			font-size:0.32rem;
			line-height:0.8rem;
			border-bottom:1px solid #e5e5e5;
			background: #fff;
			.name{
				width:5.333333rem;
				padding-left:0.4rem;
				color:#333;
			}
			.once{
				width:2.466667rem;
				padding-left:0.226667rem;	
			}
		}
		.tiTop{
			height:0.8rem;
		}
		ul{
			background:#fff;
			padding-left:0.4rem;
			li{
				padding: 0.266667rem 0 0.24rem 0;
				border-bottom:1px solid #e5e5e5;
				height:1.333333rem;
				line-height:0.8rem;
				.title{
					width:4.933333rem;
					img{
						float:left;
						height:0.773333rem;
						width: 0.773333rem;
					}
					.name{
						padding-left:0.133333rem;
						color:#333;
					}
					.line{
						height:0.8rem;
						width:1px;
						background:#e5e5e5;
						margin-right:0;
					}
				}
				.once{
					width:2.3rem;
					text-align:center;
				}
				.oneDay{
					width:2.133333rem;
					text-align:center;
				}
			}
		}
	}
	
</style>