<!-- 出借详情页面 -->
<template>
	<div id="wxInvestDescribe">
		<div class="reques">
			<div v-for="(item,index) in question" class="noraml_info">
				<p class="question">Q{{index+1}}:{{item[0]}}</p>
				<p class="ansower" v-html="'A:'+item[1]"></p>
			</div>	
		</div>
	</div>
</template>
	
<script>
	import wxToapp from '../../../common/wx/wxToapp';	//适配app
	export default {
		mixins:[wxToapp],
		props:['fullHeight'],
		data(){
			return {
				question:[],
				uuid:'',
				borrow:{},
				
			}
		},
		methods:{
			
		},
		created() {
			this.uuid = this.$route.query.uuid;
			this.notLogPost('/financePlan/questionAnwser',(res) =>{
				if (res.resCode) {
					this.question = res.resData.questionAnwser;
				}
			},{},1);
		}
	}
</script>

<style lang="scss" scoped>
	#wxInvestDescribe{
		font-family: PingFangSC-Regular;
		.nothing{
			height: 1.173333rem;
			width: 100%;
		}
		
		.title{
				width: 100%;
				height: 0.346667rem;
				line-height: 0.4rem;
				border-left: 4px solid #ff5b4c;
				font-size: 0.373333rem;
				color: #333333;
				text-indent: 0.28rem;
				margin-bottom: 0.346667rem;
			}
		.main_wrap{
			padding: .4rem 0.4rem;
			background: #ffffff;
			// .title{
			// 	width: 100%;
			// 	height: 0.346667rem;
			// 	border-left: 4px solid #ff5b4c;
			// 	font-size: 0.373333rem;
			// 	color: #333333;
			// 	text-indent: 0.28rem;
			// 	margin-bottom: 0.346667rem;
			// }
			.p1{
				font-size: 0.346667rem;
				color: #8D8D8D;
				text-align: justify;
			    line-height: .55rem;
			    margin-bottom: 0.52rem;
			}
			.line{
				width: 100%;
				height: 1px;
				border-bottom: 1px solid #e5e5e5;
				margin-bottom: 0.613333rem;
			}
			.img1{
				text-align: center;
				width: 8.586667rem;
				height: 5.146667rem;
				margin-bottom: 1.16rem;
			}
			.noraml_info{
				font-size: 0.346667rem;
				text-align: justify;
				margin-bottom: 0.666667rem;
				.question{
					color: #333333;
					margin-bottom: 0.32rem;
				}
				.ansower{
					color: #8D8D8D;
				}
			}
		}
		.reques{
			background: #ffffff;
			padding:.4rem .4rem;
		}
		.noraml_info{
			font-size: 0.346667rem;
			text-align: justify;
			margin-bottom: 0.666667rem;
			.question{
				color: #333333;
				margin-bottom: 0.32rem;
			}
			.ansower{
				color: #8D8D8D;
			}
		}
	}
</style>