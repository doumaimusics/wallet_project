<template>
	<div id="record">
		<ul>
			<li class="list" v-for="item in dataList">
				<div class="time" v-if="item.title == curMonth">当月</div>
				<div class="time" v-else>{{item.title}}</div>
				<div v-if="dataList" class="main_wrapper">
					<div class="mounth bdr-b clear" v-for="(list,index) in item.list">
						<div class="fl">
							<p class="title" :class="{fall:list.status==2,stay:list.status==0}">{{statusType == 1 ? charge[list.status]:drawings[list.status]}}</p>
							<p class="re_time">{{list.addTime}}</p>
						</div>
						<div class="fr" :class="{falls:list.status==2}">
							{{list.money | moneyFormat}}
						</div>
					</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import accountNull from '../account/wxNull'
	export default {
		props:['statusType','dataList','curMonth'],
		data(){
			return {
				charge:['银行处理中','充值成功','充值失败'],
				drawings:['银行处理中','提现成功','提现失败'],
			}
		},
		methods:{
			
		},
		components:{
		},
		created(){
			console.log(this.curMonth)
		}

	}
</script>

<style lang="scss" scoped>
	#record{
		
		ul{
			background: #ffffff;
			li.list{
			    background:#fff;
			    width: 100%;
			    position: relative;
			    .time{
			        padding-left:0.4rem;
			        height:1.066667rem;
			        line-height:1.066667rem;
			        font-size: 0.373333rem;
			        color: #333333;
			        background: #F8F8F8;
			    }
			    .main_wrapper{
			    	padding-left: 0.4rem;
			    	.mounth{
			    		background: #ffffff;
			    		width: 100%;
			    		height: 1.573333rem;
			    		position: relative;
			    		p{
			    			color: #333;
			    		}
			    		.fl{
			    			width: 60%;
			    			.title{
			    				font-size: 0.373333rem;
			    				color: #333333;
			    				padding-top: 0.32rem;
			    			}
			    			.re_time{
			    				font-size: 0.293333rem;
			    				color: #8E8E8E;
			    			}
			    			.title.fall{
			    				color: #FF5B4C;
			    			}
			    			.title.stay{
			    				color: #3B99FC;
			    			}
			    		}
			    		.fr{
			    			width: 40%;
			    			font-size: 0.373333rem;
			    			color: #333333;
			    			line-height: 1.573333rem;
			    			text-align: right;
			    			padding-right: 0.4rem;
			    		}
			    		.fr.falls{
			    			color: #C5C5C5;
			    		}
			    		
			    	}
			    } 
			     
			}
		}
	}
	
</style>