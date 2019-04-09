<template>
	<div id="zsWait">
		<wx-header v-if="!osType" :logo="'存管账户'"></wx-header>
		<div :style="(osType ? {top:'4.53rem'}:{top:'5.866667rem'})" @click="apply" class="btn"></div>
		<img src="https://aliyunsso.edspay.com/web/wx/account/Rectangle.jpg" alt="">
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import wxHeader from '../../../wxHeader';
	import wxToapp from '../../../../common/wx/wxToapp';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				applyData:{visitId:''},
			}
		},
		methods:{
			getData(){
				this.notLogPost('/czb/applyLog/visit',(data) =>{
					if(data.resCode){
						this.applyData.visitId = data.resData.model.id;
					}
				},(this.osType ? {oauthToken:this.token}:{}),1)
			},
			apply(){
				if(this.osType) this.applyData.oauthToken = this.token;
				else this.applyData.token = this.getCookie('userToken');

				this.notLogPost('/czb/applyLog/apply',(data) =>{
					Toast(data.resMsg);
				},this.applyData)
			}
		},
		components:{
			wxHeader,
		},
		created(){
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	#zsWait{
		img{
			width:100%;
		}
		.btn{
			position: fixed;
			top: 5.866667rem;
			left:1.68rem;
			width:6.7rem;
			height:0.96rem;
			z-index:10;
		}
	}
</style>