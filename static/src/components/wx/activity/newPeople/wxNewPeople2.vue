<!-- 新手有礼 -->
<template>
	<div id="newPeople">
		<wx-header v-if="!osType" :logo="'新手有礼'"></wx-header>
		<div class="main">
			<div v-if="!isLogin" @click="getRed" class="getRed"></div>
			<div v-else class="getRed hasRed"></div>
			<div v-if="msg" @click="toInvest" class="toInvest"></div>
		</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';	//引入头部
	import wxToapp from '../../../../common/wx/wxToapp'
	
	import { MessageBox } from 'mint-ui';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				isLogin:false,
				borrow:{},
				msg:true
			}
		},
		methods:{
			getRed(){
				this.toApp('RE',{path:'/wxRegister',query:{thisUrl:this.$route.fullPath}})
			},
			toInvest(){
				this.toApp('WIP_'+this.borrow.uuid,{ path:'/wxDetailPoint', query:{uuid:this.borrow.uuid}},1)
			}
		},
		components:{
			wxHeader,
		},
		created(){
			if(this.osType){
				if(this.userId) this.isLogin = true;
			}else{
				if(this.getCookie('userToken')) this.isLogin = true;
			}
			this.notLogPost('/activity/newInvest',(data) => {
				if(data.resCode){
					if(data.resData){
					this.borrow = data.resData.data;
						
					}
				}
			},{},1)

			 var that = this;
			 window.alertName = function alertName(msg){
				if(msg){
					that.msg = false;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	#newPeople{
		.main{
			height: 53.28rem;
			padding-top:17.6rem;
			background:url(https://aliyunsso.edspay.com/web/wx/activity/newPeople/1214new2.png) no-repeat;
			background-size:100%;
			.getRed{
				background:url(https://aliyunsso.edspay.com/web/wx/activity/newPeople/getRed.png) no-repeat;
				background-size:100%;
				height:1.6rem;
				width:4.933333rem;
				margin:0 auto;
				
			}
			.hasRed{
				background:url(https://aliyunsso.edspay.com/web/wx/activity/newPeople/hasRed.png) no-repeat;
				background-size:100%;
			}
			.toInvest{
				background:url(https://aliyunsso.edspay.com/web/wx/activity/newPeople/invest.png) no-repeat;
				background-size:100%;
				margin:5.15rem auto;
				height:1.546667rem;
				width:4.933333rem;	
				
			}
		}
	}
</style>