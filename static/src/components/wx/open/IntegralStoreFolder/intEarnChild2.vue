<template>
	<div class="intInvest">
		<!-- <div class="banner"></div> -->
		<ul>
			<li class="clear" v-for="item in investData">
				<div class="btn" v-if="item.status == 0 || loginStatus == 0" @click="doSomething">去完成</div>
				<div class="btn over" v-else-if="loginStatus == 1 && item.status == 2">已失效</div>
				<div class="btn over" v-else-if="loginStatus == 1 && item.status == 1">已完成</div>
			</li>
		</ul>
		
		<div class="tips">
			用户累计出借金额以积分上线之后开始计算，每完成一笔任务，即可拿到相应积分。
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		props:['investData','loginStatus'],//出借里程碑、登陆状态
		data(){
			return{
			}
		},
		methods:{
			//跳转
			doSomething(){
				//去投资列表页
				if(this.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else{
					this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
				}
			}
		},
		components:{
		},
		created(){

		}
	}
</script>
<style lang="scss" scoped>
	.intInvest{
		font-family: PingFangSC-Regular;
		ul{
			width: 100%;
			height: 14.8rem;
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/newIntEarn/intEarn2_2.png?v1.1) no-repeat;
			background-size: 100%;
			margin-bottom: 0.36rem;
			padding-top: 2.8rem;
			li{
				height: 2rem;
				padding-top: .653333rem;
				padding-right: .4rem;
				.btn{
					width: 1.6rem;
					height: .706667rem;
					float: right;
					font-size: .346667rem;
					color: #FF5B4C;
					text-align: center;
					line-height: .706667rem;
					border: 1px solid #FF5B4C;
					background: #fff;
					border-radius: 0.4rem;
				}
				.btn.over{
					border: 1px solid #FFD1CC;
					color: #FFD1CC;
				}
			}
		}
		.tips{
			width: 7.5rem;
			margin: 0 auto;
			font-size: .266667rem;
			color: #C1C1C1;
			text-align: center;
			line-height: .4rem;
			margin-bottom: .666667rem;
		}
	}
</style>