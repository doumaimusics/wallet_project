<template>
	<div id="nianyKindPc">
		<div class="main" @click="isOpenTwo=true">
			<div class="time_box">{{startTime}}-{{endTime}}</div>
			<div class="list_box">
				<ul class="clear">
					<li v-for="itme in listData">
						<div class="img_box" :style="{background:'url('+itme.picPath+') no-repeat center center / 100%'}"></div>
						<h3>{{itme.goodsName}}</h3>
						<p>
							<!-- {{item.discount}} -->
							<span class="discount_text">{{itme.discount}}折</span>
							<span class="int_text">{{itme.score |discountCount(itme.discount,10)}}<em>积分</em></span></p>
					</li>
				</ul>
			</div>
		</div>
		<el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" custom-class="dialogclass" center>
				<div class="erMa"></div>
				<p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
		</el-dialog>
	</div>
</template>

<script>
	import { MessageBox } from 'element-ui';
	export default {
		name: 'christmasNewYearPc',
		data() {
			return {
				isOpenTwo: false, //  弹框
				startTime:'',  // 开始时间
				endTime:'',    // 结束时间
				listData:[]
			}
		},
		methods: {
			getActiveTime(){    // 活动时间接口
			   let that = this;
			   that.$http.post(that.ajaxUrl.getUrl(1) + "/activity/two/getActivityTime", {activityId:'sc_gq_activity'}).then((res) => {
				   console.log(res)
				   if(res.body.resCode == 1){
					  that.startTime = res.body.resData.startTime.split(' ')[0].split('-').join('.');
					  that.endTime = res.body.resData.endTime.split(' ')[0].split('-').join('.').substr(-5);
				   }
			   })
			},

			initData(){   // 初始化接口
				let that = this;
				global.http.investPost(this, "/goods/activityGoods", {}, res => {
                    console.log(res);
					if(res.body.resCode == 1){
						that.listData = res.body.resData.scoreGoosModels;
					}
                })
			}

		},
		mounted: function() {
			
		},
		created: function() { //  调用函数
		    this.getActiveTime();
			this.initData();
		}
		
	}
</script>

<style lang="scss" scoped>
	#nianyKindPc {
		font-family: DIN-Medium;
		.main{
			width: 1200px;
			height: 1884px;
			background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/integralNationalDay/pc_bg.png?v=1.1);
			background-size: cover;
			margin: 0 auto;
			position: relative;
			cursor: pointer;
			padding-top: 1066px;
			.time_box{
				font-family: PingFang-SC-Bold;
				font-size: 26px;
				color: #fff;
				position: absolute;
				top: 525px;
				left: 132px;
			}
			.list_box{
				width: 100%;
				height: auto;
				padding: 0 40px;
				ul li{
					width: 202px;
					height: 308px;
					background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/integralNationalDay/list_pc_bg.png?v=1.1) no-repeat;
					background-size: cover;
					float: left;
					margin-left: 27px;
					margin-bottom: 40px;
					.img_box{
						width: 182px;
						height: 163px;
						margin:10px auto 22px;
						background: red;
					}
					h3{
						width: 100%;
						font-family: PingFang-SC-Bold;
						font-size: 18px;
						color: #333333;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						padding: 0 16px;
						margin-bottom: 7px;
					}
					p{
						font-family: PingFangSC-Regular;
						font-size: 14px;
						color: #808080;
						text-align: center;
						padding: 0 20px;
						
						.discount_text{
							width: 48px;
                            height:21px;
                            line-height:21px;
                            float: left;
                            font-size: 16px;
                            color: #FFFFFF;
                            text-align: center;
                            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/integralNationalDay/discount_bg_pc.png) no-repeat;
                            background-size: cover;
                            display: inline-block;
							margin-top: 3px;
							font-family: PingFang-SC-Medium;
						}
						.int_text{
							float: right;
							font-family: DIN-Bold;
							font-size: 20px;
							color: #FF5B4C;
							em{
								font-family: PingFangSC-Regular;
								font-size: 14px;
								color: #808080;
								margin-left: 4px;
							}
						}
					}
				}
				li:nth-child(1),li:nth-child(6){margin-left: 0;}
			}
		}
		.erMa {
			width: 230px;
			height: 230px;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/erweimaxin.png?v=1.1) no-repeat;
			background-size: cover;
			margin-bottom: 20px;
		}

		.inioP {
			text-align: center;
		}
		.el-message-box__content .el-message-box__message p{
			text-align: center;
		}
	}
</style>