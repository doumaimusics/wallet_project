<template>
	<div id="drawingParent">
		<div v-title>{{logoMsg}}</div>
		<div class="tab_menu clear">
			<div class="menu_list bdr-b clear">
				<div class="fl" @click="activeIndex(0)" :class="{actives:activeBar[0]}">快捷充值<span v-if="activeBar[0]"></span></div>
				<div class="fl" @click="activeIndex(1)" :class="{actives:activeBar[1]}">转账充值<span v-if="activeBar[1]"></span></div>
			</div>
		</div>
		<div class="content" :class="{rightH:activeBar[1]}" :style="screenHight">
			<div :class="{activeRight:activeBar[1],rightH:activeBar[1]}" :style="screenHight" class="main_wrapper activeLeft clear">
				<recharge-child class="fl" :goBigRecharge = "goBigRecharge"></recharge-child>
				<big-recharge class="fl"></big-recharge>
			</div>
		</div>
		<!-- <div class="zs_tip" v-if="activeBar[0]"><span></span>账户资金由浙商银行存管</div> -->
	</div>
</template>

<script>
	import wxHeader from '../../../wxHeader';
	import rechargeChild from './wxZsNewrechargeChild';//正常充值页面
	import bigRecharge from './transferRecharge';//大额充值
	import wxToapp from '../../../../common/wx/wxToapp';
	export default {
		mixins:[wxToapp],
		data(){
			return{
				logoMsg:'充值',
				activeBar:[true,false],
				screenHight:{
					height:''
				}
			}
		},
		methods:{
			activeIndex(index){
				this.$set(this.activeBar,0,false);
				this.$set(this.activeBar,1,false);
				this.$set(this.activeBar,index,true);
				document.body.scrollTop = 0
			},

			//跳转大额转账
			goBigRecharge(){
				this.$set(this.activeBar,0,false);
				this.$set(this.activeBar,1,true);
			}
		},
		mounted(){
			var that = this
			if(that.osType == "Android"){
				that.screenHight.height = (document.documentElement.clientHeight+10)+"px"  //获取手机可视区域的的高度
			}else{
				that.screenHight.height = (document.documentElement.clientHeight)+"px"  //获取手机可视区域的的高度	
			}
		},
		components:{
			wxHeader,
			rechargeChild,
			bigRecharge
		},
		created(){
			if(this.$route.query.title) {
				this.goBigRecharge()
			};
		},
	}
</script>

<style lang="scss" scoped>
	#drawingParent{
		line-height:0.44rem;
		font-size:0.32rem;
		position: relative;
		.tab_menu{
			width: 100%;
			height: 1.093333rem;
			background: #ffffff;
			position: relative;
			.menu_list{
				position: fixed;
				width: 100%;
				height: 1.093333rem;
				background: #ffffff;
				left: 0;
				top: 0;
			    z-index: 2;
				.fl{
					width: 50%;
					height: 100%;
					line-height: 1.093333rem;
					text-align: center;
					font-size: 0.4rem;
					color: #333333;
					position: relative;
				}
				.actives{
					color:#4C7DE9;
					font-family: PingFangSC-Medium;
					// border-bottom: 1px solid #ff5a4a;
					span{
						height:0.053333rem;
						width: 0.666667rem;
						background: #4C7DE9;
						border-radius: 0.026667rem;
						position: absolute;
						bottom:0;
						left: 50%;
						margin-left: -0.333333rem;
					}
				}
			}
			
		}
		.content{
			width: 100%;
			overflow:hidden;
			position: relative;
			.main_wrapper{
				width: 200%;
				position: absolute;
				left: 0;
				top: 0;
			}
			.activeLeft{
				transition:all 0.4s;
				left:0;
			}
			.activeRight{
				transition:all 0.4s;
				left: -10.0rem;
			}
		}
		.rightH{
			height:34.5rem !important;
		}
		.zs_tip{
			width: 100%;
			text-align: center;
			position: fixed;
			bottom: 0.4rem;
			left: 0;
			line-height: 0.8rem;
			font-size: 0.293333rem;
			color: #A3A3A4;
			span{
				width: 0.373333rem;
				height: 0.373333rem;
				display: inline-block;
				position: relative;
				background: url(https://aliyunsso.edspay.com/web/wx/account/accountModify/safe.jpg) no-repeat;
				background-size: 100% 100%;
				top: .05rem;
				margin-right: .1rem;
			}
		}

	}
</style>