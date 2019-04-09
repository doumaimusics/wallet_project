<template>
	<div class="password" v-layer>
		<div class="wrraper">
			<div class="calcular-title bdr-b">
				<div class="closeBtn" @click="calculator.isShow = false"></div>
				收益计算器
			</div>
			<div class="show-earn">
				<div class="small-tip">出借金额(元)</div>
				<div class="set bdr-b clear">
					<span>￥</span>
					<!-- <input type="number" maxlength="7" v-model="setNum" placeholder="请输入出借金额" disalbed> -->
					<div class="comm_box box1" v-if="setNum">{{setNum}}</div>
					<div class="comm_box box2" v-else>请输入出借金额</div>
					<span v-if='setNum' @click="clearNum"><img src="https://aliyunsso.edspay.com/web/wx/pointToPoint/close_icon.png" alt=""></span>
				</div>
				<div class="earn">
					参考年化收益：<span>{{earnning ? earnning:'0.00'}}</span> 元
				</div>
			</div>
			<key-boards :keyCheck="keyCheck" :delePwd="delePwd" :type="1"></key-boards>
		</div>
	</div>
</template>

<script>
	import keyBoards from './keyBoards';
	export default {
		data() {
			return {
				earnning:0.00,
				setNum:'',

			}
		},
		props:['calculator','apr','days','addApr','vipUprateApr'],
		methods: {
			// 清除输入
			clearNum(){
				this.setNum = '';
				this.earnning = 0.00
			},
			// 选择计算器
			keyCheck(index,item){
				if(this.setNum.length < 7){
					this.result(item)
				}
				
			},
			// 收益计算器
			result(item){
				this.setNum = this.setNum + item.keyText;
				this.earnning = ((parseInt(this.setNum) * ((this.apr + this.addApr + this.vipUprateApr) * 0.01)) / 360 * this.days).toFixed(2)
			},
			// 删除输入
			delePwd(){
				this.setNum = (this.setNum.toString()).substring(0, (this.setNum.toString()).length - 1);
				// console.log(this.setNum)
				this.earnning = ((parseInt(this.setNum) * ((this.apr + this.addApr + this.vipUprateApr) * 0.01)) / 360 * this.days) ? ((parseInt(this.setNum) * ((this.apr + this.addApr + this.vipUprateApr) * 0.01)) / 360 * this.days).toFixed(2):0
			}
		},
		components:{
			keyBoards
		},
		created() {
		}
	}
</script>

<style lang="scss" scoped>
	.password{
		font-family: PingFangSC-Regular;
		.wrraper{
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			height: 11.506667rem;
			background: #f8f8f8;
			.calcular-title{
				width: 100%;
				height: 1.2rem;
				line-height: 1.2rem;
				font-size: 0.346667rem;
				color: #333333;
				text-align: center;
				position: relative;
				background: #ffffff;
				.closeBtn{
					width: 1.5rem;
					height: 1.2rem;
					position: fixed;
					background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/close.png) 0.2rem 0.2rem no-repeat;
					background-size: 0.8rem 0.8rem;
				}
			}
			.show-earn{
				width: 100%;
				height: 4.1rem;
				padding-left: .4rem;
				background: #ffffff;
				.small-tip{
					height: 1.3rem;
					line-height: 1.3rem;
					font-size: 0.346667rem;
					color: #333333;
				}
				.set{
					padding-bottom: 0.5rem;
					position: relative;
					color: #333333;
					height: 1.5rem;
					span{
						font-size: 0.613333rem;
						float: left;
					    margin-top: .15rem;
						img{
							width: 0.4rem;
							height: 0.4rem;
						}
					}
					.comm_box{
						width: 7.5rem;
						float: left;
						height: 1rem;
						line-height: 1rem;
					}
					.box1{
						font-size: 1.146667rem;
						color: #333333;
					}
					.box2{
						font-size: 0.586667rem;
						color: #D8D8D8;
						line-height: 1.2rem;
					}
				}
				.earn{
					height: 0.92rem;
					line-height: 0.92rem;
					font-size: 0.32rem;
					color: #808080;
					span{
						font-size: 0.32rem;
						color: #FF8B20;
					}
				}
			}
		}
		// ::-webkit-input-placeholder { /* WebKit browsers */   //设置input placeholder字体颜色
		//     font-size: 0.586667rem;
		// } 
		// :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
		//   font-size: 0.586667rem;
		// } 
		// ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
		//   font-size: 0.586667rem;
		// } 
		// :-ms-input-placeholder { /* Internet Explorer 10+ */ 
		//   font-size: 0.586667rem;
		// }
	}
</style>