<template>
	<div class="sign_temp">
		<div class="sign_line">
			<div class="line_box" :style="{width:lineWidth+'rem'}">
				<div class="line_process">
					<div class="line"></div>
					<!-- three:周三或者周日已签到状态 fixe：周三或者周日未签到状态  -->
					<div class="circle" v-for="(item,index) in 7" :class="{fixe:index == 6 || index == 2,three:(index == 2 && signData1[index] ==0) || (index == 6 && signData1[index] == 0)}" :style="{left:(distance*index)+'rem'}"></div>

					<div class="has_sign" v-if="loginStatus == 1" v-for="(item,index) in signData.signLog" :style="{left:(distance*index)+'rem'}" :class="{falses:item == 2,today:signData.week==index,NoIcon: index == 2 || index == 6}" @click="supple(item, index)">
						<i class="buqianIcon" v-if="item == 2"></i>
					</div>
				</div>
				<div class="week">
					<span v-for="(item,index) in week" :style="{left:(distance*index)+'rem'}" :class="{activeColor:signData.week==index}">{{item}}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props:['lineWidth','signData','loginStatus','supplement','signData1'],
		data(){
			return{
				// lineWidth:8.133333,
				distance:0,//总长度
				giftDis1:0,//第一个礼物的长度
				giftDis2:0,//第一个礼物的长度
				week:['周一','周二','周三','周四','周五','周六','周日'],
			}
		},
		methods: {
			supple(i, week){
				if(i==2){
					this.supplement(week)
				}
			}
		},
		mounted(){
			var that = this;
			that.distance = (that.lineWidth - 0.49)/6;
			that.giftDis1 = ((that.lineWidth - 0.4)/6)*2 + 0.4-0.40+0.493333/2;
			that.giftDis2 = ((that.lineWidth - 0.493333 - 0.4*2)/6)*6 + 0.4-0.4+0.493333/2;
		}
	}
</script>
<style lang="scss" scoped>
	.sign_temp{
		font-family: PingFangSC-Regular;
		padding-top: .68rem;
		.calendar_sign{
			width: 100%;
			margin-bottom: 0.8rem;
			.btnIco2{
				width: 2.986667rem;
				height: 1.173333rem;
				margin: 0 auto;
				clear: both;
				background-image: linear-gradient(-45deg, #FF6554 0%, #FF3F38 100%);
				border-radius: 0.586667rem;
				line-height: 1.173333rem;
				text-align: center;
				font-size: 0.373333rem;
				color: #FFFFFF;
			}
		}
		.sign_line{
			width: 100%;
			.line_box{
				margin: 0 auto;
				.gift{
					width: 100%;
					height: 0.746667rem;
					position: relative;
					margin-bottom: 0.053333rem;
					.gift_ico{
						width: 0.8rem;
						height: 0.746667rem;
						float: left;
						background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/liwu.png) no-repeat;
						background-size: 100%;
						position: absolute;
						left: -0.373333rem;	
					}
					.gift_ico.activeBg{
						width: 0.8rem;
						height: 0.746667rem;
						background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/giftActive.gif) no-repeat;
						background-size: 100%; 
					}
				}
				.line_process{
					width: 100%;
					height: 0.533333rem;
					position: relative;
					margin-bottom: 0.133333rem;
					.line{
						height: 0.053333rem;
						width: 99%;
						background: #FF5B4C;
						border-radius: 2px;
						position: relative;
				        top: 0.247rem;
					}
					.circle{
						width: .55rem;
						height: 0.55rem;
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/sign_uncheck.png) no-repeat;
						background-size: 0.48rem 0.48rem;
						float: left;
						position: absolute;
						top: .01rem;
						left: 0.4rem;

					}
					.signActiveM{
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/sign_chexked.png) no-repeat;
						background-size: 0.48rem 0.48rem;
					}
					.has_sign{
						width: 0.55rem;
						height: 0.55rem;
						float: left;
						position: absolute;
						top: .01rem;
						left: 0.4rem;
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/sign.png) no-repeat;
						background-size: 0.48rem 0.48rem;
						i.buqianIcon{
							position: absolute;
							width: .666667rem;
							height: .666667rem;
							top: -128%;
							left: -.09rem;
							background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/noSign1.png) no-repeat;
							background-size: 100%;
						}
					}
					.falses{
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/no-sign.png) no-repeat;
						background-size: 0.48rem 0.48rem;
					}
					.fixe{
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/fixeLiwu.png) no-repeat center center;
						background-size: 0.48rem 0.48rem;
					}
					.three{
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/liwuThree.png) no-repeat center center;
						background-size: 0.48rem 0.48rem;
					}
					.today{
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/sign_chexked.png) no-repeat;
						background-size: 0.48rem 0.48rem;
					}
					.NoIcon{
						background: none;
					}
				}
				.week{
					width: 104%;
					position: relative;
					overflow: hidden;
					height: 17px;
					left: -1%;
					span{
						font-size: 0.293333rem;
						color: #808080;
						display: inline-block;
						position: absolute;
						left: -0.293333rem;
					}
					span.activeColor{
						font-size: 0.32rem;
						color: #333333;
					}
				}
			}
		}
	}
</style>