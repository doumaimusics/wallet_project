<template>
	<div id="safe">
		<div v-title>{{logoMsg}}</div>
		<ul>
			<li class="clear bdr-b">
				<h4 class="fl">真实姓名</h4>
				<h5 class="fl">{{realData.realName}}</h5>
			</li>
			<li class="clear bdr-b">
				<h4 class="fl">身份证号</h4>
				<h5 class="fl">{{realData.cardId}}</h5>
			</li>
			<li class="clear">
				<h4 class="fl">存管账户</h4>
				<h5 class="fl" v-clipboard:copy="realData.eCardNo" v-clipboard:success="onCopy">{{realData.eCardNo}}</h5>
			</li>
		</ul>
		<p>您已通过实名认证，如需帮助请联系客服</p>
	</div>
</template>

<script>
	import wxToast from '../../../../common/wx/wxToast'
	import { MessageBox } from 'mint-ui';	//引入带有按钮的提示框
	export default {
		mixins:[wxToast],
		data(){
			return {
				logoMsg:'实名信息',
				realData:{},
				zsCode:'',
			}
		},
		components:{
			
		},
		methods:{
			onCopy (e) {
				if(this.zsCode){
					this.toast({
						text: '复制成功'
					})
				}
			},
		},
		created(){
			var that = this;
			this.postData('/account/getZSAccount',function(res){
				if(res.body.resCode == 1){
					that.realData = res.body.resData
					that.zsCode = res.body.resData.eCardNo;
				}
			},{versionNumber:'V2.5.8'})
			// this.postData('/account/securityInfo',function(res){
			// 	if(res.body.resCode == 1){
			// 		that.realData = res.body.resData.model
			// 		that.zsCode = res.body.resData.model.eCardNo;
			// 	}
			// },{versionNumber:'V2.5.8'})
		}
	}
</script>

<style lang="scss" scoped>
	#safe{
		color:#333;
		ul{
			background:#fff;
			padding-left:0.4rem;
			li{
				height:1.466667rem;
				// border-bottom:0.026667rem solid #E9E9E9;
				font-size:0.426667rem;
				line-height:1.466667rem;
				padding-right: 0.293333rem;
				position: relative;
				h4{
					font-size: 0.346667rem;
					color: #333333;
					margin-right: 0.4rem;
				}
				h5{
					font-size: 0.4rem;
					color: #333333;
				}
			}
		}
		p{
			padding-top: 0.933333rem;
			font-size: 0.346667rem;
			color: #808080;
			text-align:center;
		}
	}
</style>