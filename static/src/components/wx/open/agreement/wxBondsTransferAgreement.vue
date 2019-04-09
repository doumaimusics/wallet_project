<template>
	<div id="regAgreement">
		<wx-header v-if="!osType" :logo="'债权转让协议'"></wx-header>
		<div style="background:#fff;width:100%;height:100%;overflow-x:hidden; overflow-y:auto;">
			<img v-for="item in userData" :src="item" alt="">
		</div>
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';
	import wxToapp from '../../../../common/wx/wxToapp'
	import { MessageBox } from 'mint-ui';
	export default{
		mixins:[wxToapp],
		data(){
			return{
				userData:[],
				matchId:'',
				needData:{}
			}
		},
		components:{
			wxHeader,
		},
		created(){
			this.matchId = this.$route.query.matchId;
			if(this.osType) this.needData.oauthToken = this.token;
			this.needData.matchId = this.matchId
			this.notLogPost('/protocol/p2p/debtTransferProtocol',(data) => {
				if(data.resCode == 1){
					this.userData = data.resData.base64Images;
				} else {
					MessageBox.alert(data.resMsg, '提示');
				}
			},this.needData)
		}
	}
</script>

<style lang="scss" scoped>
	#regAgreement{
		img{
			width: 100%;
		}
	}
</style>