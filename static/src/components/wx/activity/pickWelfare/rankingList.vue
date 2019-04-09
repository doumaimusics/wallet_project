<template>
	<div id="rankingList">
		<!--title-->
		<wx-header v-if="!osType" :logo="'累计年化出借额排行榜'"></wx-header>
		<div class="ranking_bg">
			<!--奖品展示区域-->
			<div class="ranking_box">
				<section class="ranking_area"></section>
			</div>
			<!--排行榜列表-->
			<div class="ranking_list">
					<ul>
						<li v-for="(itme,index) in rankingList">
							<template v-if="index!='0' && index!='1' && index!='2'">
								<span class="order">{{itme.rank}}</span>
							</template>
							<template v-else>
								<span class="order"></span>
							</template>
							<span class="phone">{{itme.mobilePhone}}</span>
							<span class="money">{{itme.tenderMoney}}</span>
							<span class="ranking" v-if="index<11">{{rankingNape[index]}}</span>
							<span class="ranking" v-else-if="index<20">双11礼包套餐1</span>
							<span class="ranking" v-else-if="index<30">双11礼包套餐2</span>
							<span class="ranking" v-else-if="index<40">双11礼包套餐3</span>
							<span class="ranking" v-else-if="index<50">双11礼包套餐4</span>
						</li>
					</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import wxHeader from '../../../wxHeader'; //头部
	import wxToapp from '../../../../common/wx/wxToapp'; // APP交互函数
	import { MessageBox } from 'mint-ui';
	export default {
		mixins: [wxToapp],
		data() {
			return {
				rankingList: '', //  列表	
				rankingNape: ["iphoneX", "ipad", "南极人按摩椅", "扫地机器人", "奥克斯烘干机", "取暖器+188元", "取暖器+138元", "取暖器+78元", "取暖器+18元", "取暖器", "双11礼包套餐1", "双11礼包套餐2", "双11礼包套餐3", "双11礼包套餐4"]

			}
		},
		methods: {
			renkingData() {
				let _this = this;
				this.notLogPost('/activity/cbzfl/getActivityRankList', (data) => {
					console.log(data)
					if(data.resCode == 1) {
						if (data.success == true) {
							_this.rankingList = data.resData.borrowTenderYearModels;
						} else if(data.success == false){
							MessageBox.alert(data.resMsg).then(action => {});
						}
							
					} else {
						    MessageBox.alert(data.resMsg).then(action => {});
					}
				}, (this.osType ? {
					oauthToken: this.token
				} : {}), 1);
			}
		},
		components: {
			wxHeader,
		},
		mounted: function() {},
		created: function() { //  调用函数
			this.renkingData();
		}
	}
</script>

<style lang="scss" scoped>
	#rankingList {
		width: 100%;
		height: auto;
		.ranking_bg {
			width: 10rem;
			height: 16.533333rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/ranking_bg.png?v=1.3) no-repeat;
			background-size: cover;
			position: relative;
			overflow: hidden;
			.ranking_box {
				        width: 8.333333rem;
					    height: 4.5rem;
					    position: absolute;
					    left: 0;
					    right: 0;
					    top: 1.5rem;
					    margin: auto;
					    overflow: auto;
				.ranking_area {
					width: 100%;
					height: 17.76rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/prize_bg.png?v=1.2) no-repeat center center;
					background-size: cover;
				}
			}
		}
		.ranking_list {
			    width: 8.373333rem;
    height: 8.4rem;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    top: 7.5rem;
    margin: auto;
    overflow: hidden;
			ul {
				height: 100%;
				overflow: auto;
				li {
					width: 100%;
					height: 0.8rem;
					color: #127500;
					text-align: center;
					span {
						float: left;
						height: 100%;
						font-size: 0.293333rem;
						line-height: 0.8rem;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					.order {
						width: 17%;
						font-size: 0.346666rem;
						font-weight: 700;
						color: #127500;
						letter-spacing: 0;
					}
					.phone {
						width: 26%;
					}
					.money {
						width: 25%;
					}
					.ranking {
						width: 30%;
					}
				}
				li:nth-child(1) .order {
					background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/p_first1.png?v=1.0) no-repeat;
					background-size: 0.56rem 0.626666rem;
					background-position: center 0;
				}
				li:nth-child(2) .order {
					background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/p_second2.png?v=1.0) no-repeat;
					background-size: 0.56rem 0.626666rem;
					background-position: center 0;
				}
				li:nth-child(3) .order {
					background: url(https://aliyunsso.edspay.com/web/wx/activity/pickWelfare/p_thirdly.png?v=1.0) no-repeat;
					background-size: 0.56rem 0.626666rem;
					background-position: center 0;
				}
			}
		}
	}
</style>