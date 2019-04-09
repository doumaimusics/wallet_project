<template>
	<div class="takeInt">
		<ul></ul>
		<div class="tips">
			积分上线后，用户每笔出借会根据不同的vip等级获得相应积分，Vip等级越高，所获得的积分越多。
		</div>
	</div>
	
</template>
<script>
	export default {

		data(){
			return{
			}
		},
		methods:{
		},
		components:{
		},
		created(){

		}
	}
</script>
<style lang="scss" scoped>
	.takeInt{
		font-family: PingFangSC-Regular;
		ul{
			width: 100%;
			height: 29.6rem;
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/newIntEarn/intEarn3_3.png) no-repeat;
			background-size: 100%;
			margin-bottom: 0.36rem;
			padding-top: 2.8rem;
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