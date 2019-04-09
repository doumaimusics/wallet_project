<template>
	<div class="has_use">
		<wx-header v-if="!osType" :logo="'贡献值消耗'"></wx-header>
		<div class="wrapper">
			<ul class="title_box">
				<li
					v-for="(item,index) in listName"
					@click="num=index"
					:class="{active:index==num}"
					>{{item}}</li>
			</ul>
			<div class="tabContent">
				<tab1 v-if="num==0" :class="{slideActive:num==0}"></tab1>
				<tab2 v-else-if="num==1" :class="{slideActive:num==1}"></tab2>				
			</div>

		</div>
		</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'; //头部引入
	import wxToapp from '../../../../common/wx/wxToapp';
	import tab1 from './tab1.vue';
	import tab2 from './tab2.vue';
	
	export default {
		mixins:[wxToapp],
		data() {
			return {
				listName:["福利一","福利二"],
				num:0
			}
		},
		methods: {
			getQuert() {
				let tab = this.$route.query.num;
				this.num = tab;
			}
		},
		components: {
			wxHeader,
			"tab1":tab1,
			"tab2":tab2,
			
		},
		created() {	
		}
	}
</script>

<style lang="scss" scoped>
	.has_use{
		position: relative;
		width: 100%;
		height: 17.786667rem;
		background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/has_change.png) no-repeat;
	    background-size: 100% 100%;
	    font-family: PingFangSC-Regular;
		.wrapper{
			font-family: PingFangSC-Regular;
			.title_box{
				width: 100%;
				height: 0.933333rem;
				background: #5E42FF;
				li{
					width: 50%;
					height: 100%;
					float: left;
					text-align: center;
					color: #fff;
					font-size: 0.4rem;
					line-height: 0.933333rem;
				}
				li.active{
					color: #FEE779;
					border-bottom: 0.053333rem solid #FEE779;
					
				}
			}
			.main{
				width: 100%;
				height: auto;
				background: #4730ca;
				padding-top: 0.786667rem;
				padding-bottom: 0.746667rem;
				.contain{
					width: 9.2rem;
					height: auto;
					margin: 0 auto;
					.title{
						width: 9.2rem;
						height: 2.186667rem;
						background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/use_title.png) no-repeat;
						background-size: 100% 100%;
						.account{
							width: 100%;
							height: 0.933333rem;
							line-height: 0.933333rem;
							font-size: 0.373333rem;
							color: #56349A;
							text-align: center;
							span{
								color: #D83400;
								padding: 0 .1rem;
							}
						}
					}
					.main_text{
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
									width: 5.76rem;
									text-indent: 0.133333rem;
									color: #3A1289;
								}
								.span2{
									width: 1.093333rem;
									text-align: left;
									color: #D95600;
								}
								.span3{
									width: 2.0rem;
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
				.compute{
					padding: 0 0.386667rem;
					font-size: 0.346667rem;
					color: #FFFFFF;
					span{
						float: left;
						width: 0.48rem;
						display: inline-block;
						text-align: center;
					}
					div{
						float: left;
						width: 8.693333rem;
						p{
							line-height: .6rem;
						}
					}
				}
			}
			.nothing_goods{
				width: 100%;
				height: 6.293333rem;
				background: #4730ca url(https://aliyunsso.edspay.com/web/wx/twoBillon/nothing.png) no-repeat center center;
				background-size: 4.906667rem 2.666667rem;
				p{
					font-size: 0.4rem;
					color: #FFFFFF;
					text-align: center;
					padding-top: 5.133333rem;
				}
			}
			.rule{
				width: 100%;
				height: 13.12rem;
				background: url(https://aliyunsso.edspay.com/web/wx/twoBillon/uselist.png) no-repeat;
				background-size: 100% 100%;
			}
			
		}
		
	}
/*	#tab1.slideActive,#tab2.slideActive{
	-webkit-transform: translate3d(0%, 0, 0);
	    -moz-transform: translate3d(0%, 0, 0);
	    -ms-transform: translate3d(0%, 0, 0);
	    -o-transform: translate3d(0%, 0, 0);
	    transform: translate3d(0%, 0, 0);
}*/
</style>