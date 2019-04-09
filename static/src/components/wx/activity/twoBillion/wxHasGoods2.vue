<template>
	<div class="get_value">
		<wx-header v-if="!osType" :logo="'已兑换福利二奖品'"></wx-header>
		<div class="wrapper">
			<div class="main" v-if="exchangList.length > 0">
				<div class="no"></div>
				<div class="title"></div>
				<div class="contain">
					<ul>
						<li v-for="val in exchangList">
							<span class="span1">{{val.reward}}</span>
							<span class="span2">{{val.times}}次</span>
						</li>
					</ul>
				</div>
			</div>
			<div v-else class="nothing">
				<p>您还未兑换奖品，快去兑换吧！</p>
			</div>
		</div>
		</div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'; //头部引入
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data() {
			return {
				exchangList: [],//已兑换商品
			}
		},
		methods: {
			getData() {
				this.getAppData('/sudoku/exchangeList',(res) => {
					console.log(res)
					if ( res.resCode == 1 ) {
						this.exchangList = res.resData.exchangList;
					}
				},(this.osType ? {oauthToken:this.token}:{}),1)
			}
		},
		components: {
			wxHeader,
		},
		created() {
			this.getData()
		}
	}
</script>
<style lang="scss" scoped>
	.get_value{
		position: relative;
		.wrapper{
			width: 10.0rem;
			height: 17.786667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/has_change.png) no-repeat;
			background-size: 100% 100%;
			font-family: PingFangSC-Regular;
			.main{
				width: 9.2rem;
				height: auto;
				margin: 0 auto;
				.no{
					width: 100%;
					height: 1.013333rem;
				}
				.title{
					width: 9.2rem;
					height: 0.986667rem;
					background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/has_title.png) no-repeat;
					background-size: 100% 100%;
				}
				.contain{
					width: 9.2rem;
					height: auto;
					background: -webkit-linear-gradient(left, #feb968 , #FE6853); /* Safari 5.1 - 6.0 */
					background: -o-linear-gradient(right, #feb968, #FE6853); /* Opera 11.1 - 12.0 */
					background: -moz-linear-gradient(right, #feb968, #FE6853); /* Firefox 3.6 - 15 */
					background: linear-gradient(to right, #feb968, #FE6853); /* 标准的语法 */
					border-radius: 0px 0px 10px 10px; 
					margin-bottom: 0.266667rem;
					ul{
						width: 8.906667rem;
						margin: 0 auto;
						padding-bottom: 0.2rem;
						li{
							width: 100%;
							background: #ffffff;
							font-size: 0;
							span{
								display: inline-block;
								font-size: 0.346667rem;
								height: 0.933333rem;
								line-height: 0.933333rem;
							}
							.span1{
								width: 5.973333rem;
								text-indent: 0.386667rem;
								color: #3A1289;
							}
							.span2{
								width: 2.92rem;
								text-align: center;
								color: #D95600;
							}
						}
						li:nth-child(even){
							background: #ffffff;
						}
						li:nth-child(odd){
							background: #fff8eb;
						}
					}
				}
			}
			.nothing{
				width: 100%;
				height: 100%;
				background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/nothing.png) center 4rem no-repeat;
				background-size: 4.906667rem 2.666667rem;
				p{
					font-size: 0.4rem;
					color: #FFFFFF;
					text-align: center;
					padding-top: 7rem;
				}
			}
		}
	}
</style>