<template>
	<div class="newPeople">
		<ul>
			<li class="clear" v-for="item in newPeopleData">
				<div class="btn" v-if="item.status == 0 || loginStatus == 0" @click="doSomething(item.jumpPage)">去完成</div>
				
				<div class="btn over" v-else-if="item.status == 2">已失效</div>
				<div class="btn over" v-else-if="item.status == 1">已完成</div>
				
			</li>
		</ul>
		<div class="tips">
			所有任务以积分上线后完成为准，即积分商城上线已完成注册开通存管户等的用户将不予发放积分。
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		props:['newPeopleData','loginStatus'],//新手成长记、登陆状态
		data(){
			return{
			}
		},
		methods:{
			//跳转
			doSomething(jumpPage){
				if(this.loginStatus == 0){
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
				}else{
					if(jumpPage == 0){
						//去注册
						this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
					}else if(jumpPage == 1){
						//开通存管
						this.toApp('OpenDeposit',{path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}})
					}else if(jumpPage == 2){
						//去投资列表页
						this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
					}else if(jumpPage == 3){
						//去绑定微信介绍页
						if(this.osType){
							this.toWxUrl('/wxAuthorizeIntroduction')
						}else{
							window.location.href = '/#/register/wxAuthorizeBind?redirectUrL=/register/wxAuthorizeBind';
							// this.$router.replace({path:'/register/wxAuthorizeBind',query:{redirectUrL:'/register/wxAuthorizeBind'}})
						}
						
					}
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
	.newPeople{
		font-family: PingFangSC-Regular;
		ul{
			width: 100%;
			height: 16.8rem;
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/newIntEarn/intEarn1_1.png?v1.1) no-repeat;
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