<template>
	<div id="success">
		<wx-header v-if="!osType" :type="0" :redType="1" :logo="'余额转移'"></wx-header>
		<div @click="finish"  class="finish">完成</div> 
		<div class="content">
			<img src="https://aliyunsso.edspay.com/web/wx/account/amend/balance.png" alt="">
		</div>
		<p class="tips">转移申请提交成功</p>
		<p class="tips1">{{result}}</p>
	</div>
</template>

<script>
	import wxHeader from '../../../../wxHeader'
	import wxToapp from '../../../../../common/wx/wxToapp';    //引入表单验证
	export default {
		mixins:[wxToapp],
		data(){
			return {
				result:'',
			}
		},
		methods:{
			finish(){
				this.$router.go(-1);
			},
			initData(){
                let _this = this
                this.postData('/account/toBalanceRemove',function(res){
                    if(res.body.resCode){
						_this.result = res.body.resData.waitTime
                    }
                },{source:'h5'},1)
            },
		},
		components:{
			wxHeader
		},
		created(){
			this.initData()
		},
		mounted(){
			var height = document.documentElement.clientHeight; //获取设备的宽度

			//动态的为根元素设置字体的大小
			$('#success').height(height)
		}
	}
</script>

<style lang="scss" scoped>
	#success{
		background:#fff;
		.finish{
			position:absolute;
			z-index:100;
			top:0;
			right:0.4rem;
			line-height:1.333333rem;
			font-size:0.373333rem;
			color:#fff;
		}
		.content{
			height:5.733333rem;
			padding-top:0.666667rem;
			background:url(https://aliyunsso.edspay.com/web/wx/invest/investResult.png) no-repeat;
			background-size: 100%;
			img{
				display:block;
				width:2.773333rem;
				height:2.773333rem;
				margin: 0 auto;
			}
		}
		.tips{
			line-height:0.6rem;
			height:.6rem;
			color:#333;
			margin-top: .4rem;
            text-align:center;
            font-family: PingFangSC-Regular;
            font-size: .426667rem;
            letter-spacing: .007067rem;
            margin-bottom: .266667rem;
        }
        .tips1{
            width: 6.666667rem;
			line-height:.533333rem;
            text-align:center;
            font-family: PingFangSC-Regular;
            font-size: .373333rem;
            color: #808080;
            letter-spacing: .007067rem;
            margin: 0 auto;
		}
	}

</style>