<template>
	<div class="get_value">
		<wx-header v-if="!osType" :logo="'获取贡献值'"></wx-header>
		<div class="wrapper">
			<div class="nothing"></div>
			<div class="main">
				<p class="contri">您共获得<span>{{con}}</span>贡献值</p>
				<ul class="contain">
					<li v-for="item in getCon">
						<span class="sp1">{{item.name}}</span>
						<span class="sp2" v-if="item.count == 86">非新用户</span>
						<span class="sp2" v-else-if="item.count == 87">未实名</span>
						<span class="sp2" v-else-if="item.count == 88">已实名</span>
						<span class="sp2" v-else>{{item.count}}</span>
						<span class="sp3">{{item.contribution}}</span>
					</li>
				</ul>
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
				con: 0, //获得贡献值
				getCon: [],//获得贡献值列表 
			}
		},
		methods: {
			getData() {
				this.getAppData('/index/getContribution', (res) => {
					if ( res.resCode == 1 ) {
						this.getCon = res.resData.data.deaileList;
						this.con = res.resData.data.conCount;
					}

				},( this.osType ? { oauthToken:this.token } : {}),1);
			}
		},
		components: {
			wxHeader,
		},
		created() {
			this.getData();
		}
	}
</script>
<style lang="scss" scoped>
	.get_value{
		position: relative;
		.wrapper{
			width: 100%;
			height: 17.786667rem;
			background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/contribt-bg2.png?v1.0) no-repeat;
			background-size: 100% 100%;
			font-family: PingFangSC-Regular;
			.nothing{
				height: 0.8rem;
				width: 100%;
			}
			.main{
				width: 9.2rem;
				height: 6.08rem;
				background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/contribt-bg.png?v1.0) no-repeat;
				background-size: 100% 100%;
				margin: 0 auto;
				.contri{
					height: 0.96rem;
					width: 100%;
					text-align: center;
					font-size: 0.373333rem;
					color: #56349A;
					margin-bottom: 1.24rem;
					line-height: 0.9rem;
					span{
						font-size: 0.48rem;
						color: #D83400;
						padding: 0 .05rem;
					}
				}
				.contain{
					width: 8.906667rem;
					height: 3.733333rem;
					margin: 0 auto;
					background: #ffffff;
					li{
						width: 100%;
						height: 0.933333rem;
						font-size: 0;
						span{
							display: inline-block;
						    position: relative;
						    height: 0.933333rem;
							font-size: 0.32rem;
							line-height: 0.933333rem;
						}
						.sp1{
							font-size: .32rem;
							width: 4.8rem;
							text-indent: 0.12rem;
							color: #3A1289;
							letter-spacing: -1px;
						}
						.sp2{
							width: 1.8rem;
							text-align: center;
							color: #D95600;
						}
						.sp3{
							width: 2.2rem;
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
	}
</style>