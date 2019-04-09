<template>
	<div class="holiday" :class="{'six-holiday' : info.quantity <= 6}" ref="holiday">
		<div v-title v-if="titleName">{{titleName}}</div>
		<!-- 规则按钮 -->
		<div class="rule" @click="layerBoxRule = true"></div>
		<!-- 滚动 -->
		<div class="k_scroll_box">
			<div class="scroll_box clear" v-if="isShowNotice">
	        	<div class="scroll-div fl">
	                <ul>
	                    <li v-for="item in scrollInfo" ref="messageList">用户{{item.mobilePhone}}成功兑换{{item.name}}</li>
	                </ul>
	            </div>
	        </div>
		</div>
        <!-- 我的投资金额 -->
		<div class="investMoney">
			<div class="change_rule" @click="layerBoxTip = true"></div>
			<!-- <div class="btn" v-if="userId || getCookie('userToken')" @click="toWxUrl('/festMain/record','activityId',activityIds)">我的兑换</div> -->
			<div class="btn" v-if="!loginStatus" @click="toLogin"></div>
			<div class="my-exchange" v-else>
				<img src="https://aliyunsso.edspay.com/web/wx/activity/11assist/myExchange.png" @click="appRouter('/festMain2/record',{'activityId':activityIds})"/>
				<p>{{ info.annuaAmount ? Math.floor(info.annuaAmount*100)/100 : 0 | moneyFormat}}</p>
			</div>
			<!-- 计算器按钮 -->
			<div class="caculator-btn" @click="showCalculator=true"></div>
		</div>

		<!-- 商品列表 -->
		<ul class="goods_list clear">
			<li v-for="item in goodsList">
				<div class="subscript" v-if="item.times !== 999999">
					<span>限兑{{item.times}}次</span>
				</div>
				<!-- 0去完成,1去兑换(满足任意1项) 2置灰 -->
				<div class="doBtn toComplete" @click="toComplete(item,1)" v-if="item.btnStatus == 0"></div>
				<div class="doBtn toChange" @click="toComplete(item,2)" v-else-if="item.btnStatus == 1"></div>
				<div class="doBtn greyBtn"  v-else></div>
			</li>
		</ul>
		
		<!-- 可兑换弹框 -->
		<div class="rule_box" v-if="changeBox.isShow">
		<!-- <div class="rule_box"> -->
			<div class="task">
				<div class="goods_title txt2">确认兑换<i @click="closeChange"></i></div>
				<div class="task_contain2 clear">
					<div class="box1">
						<p>兑换商品<span class="fr">{{itemInfo.name ? itemInfo.name  : ''}}</span></p>
						<p>兑换方式<span class="fr">消耗{{itemInfo.annualAmount ? itemInfo.annualAmount  : ''}}累计年化</span></p>
                        <div class="task-addr" v-if="itemInfo.type == 1">收货地址
							<span class="fr" v-if="info.hasDefaultAddr == 0" @click="toAddr">去添加</span>
							<span class="fr addr-span" @click="toAddr"  v-else>
								<p>{{info.address}}</p>
								<p>
									<span>收货人：{{info.realName}}</span>
									<span class="fr">{{info.telPhone}}</span>
								</p>
							</span>
							<img @click="toAddr" src="https://aliyunsso.edspay.com/web/wx/activity/11assist/addrArrow.png" :class="{'hasArrow':info.hasDefaultAddr !== 0}"/>
						</div>
					</div>
				</div>
				<div class="btns">
					<div class="change_btn_box changeGrey-btn" v-if="info.hasDefaultAddr == 0&&itemInfo.type == 1">确认兑换</div>
					<div class="change_btn_box" v-else @click="doChange">确认兑换</div>
				</div>
			</div>
		</div>

		<!-- 规则 -->
		<div class="rule_box" v-if="layerBoxRule">
			<div class="rule_wrap">
				<div class="close_btn"  @click="layerBoxRule = false"></div>
				<a href="tel:4001353388"></a>
				<div class="content" v-if="osType == 'IOS'">本活动与苹果公司无关！</div>
			</div>
		</div>

		<!-- 提示规则 -->
		<div class="rule_box" v-if="layerBoxTip">
			<div class="tip_box">
				<div class="know_btn" @click="layerBoxTip = false"></div>
			</div>
		</div>

		<!-- 活动未开始 -->
		<div class="rule_box" v-if="gameUnstart">
			<div class="game_box unOPen">
				<div class="game_btn" @click="gameUnstart = false"></div>
			</div>
		</div>

		<!-- 活动以结束 -->
		<div class="rule_box" v-if="gameover">
			<div class="game_box over">
				<div class="game_btn" @click="gameover = false"></div>
			</div>
		</div>

		<!-- 兑换成功弹框 -->
		<div class="rule_box" v-if="hasChange.isShow">
			<div class="hasChange_box"  :class="{'redChange-box' : itemInfo.type == 2}">
				<div class="close_change_btn" @click="hasChange.isShow = false"></div>
				<div class="game_btn top2" @click="appRouter('/festMain2/record',{'activityId':activityIds})"></div>
			</div>
		</div>

        <!-- 年化计算器 -->
        <calculator :showCalculator="showCalculator" @closeCal="closeCal"></calculator>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
    import calculator from './festCalculator'; // 年化计算器组件
	export default {
		mixins:[wxToapp],
		data() {
			return {
				activityName:'',
				titleName:'',
				goodsList:[],//商品列表
				info:{},
				itemInfo:{
					btnStatus: 0
				},
				scrollInfo:[],//用户兑换记录
				loginStatus:false,//登陆状态
				isShowNotice:false,//是否显示用户兑换记录

				layerBoxRule:false,//规则弹框
				layerBoxTip:false,//兑换规则弹框
				changeBox:{//去兑换弹框
					isShow:false
				},
				gameTimeBox:false,//活动未开始和已结束蒙层
				gameUnstart:false,//活动未开始
				gameover:false,//活动已结束
				activityStatus:'',//活动状态
				hasChange:{//兑换成功弹框
					isShow:false
				},
				activityIds:'',//活动ID
				timer:null,
				showCalculator:false,// 计算器开关
				addrId:'',
			}
		},
		methods:{
			// 活动时间
			_getActivityTime(){// 获取活动时间状态
				this.notLogPost('/activity/two/getActivityTime',data => {
					if(data.resCode){
						this.activityStatus = data.resData.active;
						this.ActivityPrompt()
					}
				},{activityId:this.activityIds})
			},
			ActivityPrompt() { //显示弹框方法,判断活动结束
			  	if (this.activityStatus == 2) {
					this.gameUnstart = true;
			  	} else if (this.activityStatus == 3) {
					this.gameover = true;
				  }
			},
			
			// 点击去完成按钮显示弹框
			toComplete(item,type){
				if(this.userId || this.getCookie('userToken')){
					if (this.activityStatus !== 1) {
						this.ActivityPrompt()
						return
					}
					this.itemInfo = item;
					if (type == 1) {
						this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
					} else {
						this.changeBox.isShow = true;
					}
				}else{
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
				}
			},
			
			// 确认兑换
			doChange(id){
				this.changeBox.isShow = false;
				if(this.$route.query.addrId){
					this.addrId = this.$route.query.addrId
				} else {
					this.info.addrId ? this.addrId = this.info.addrId : this.addrId = ''
				}
				this.getAppData('/activity/fest/annualExchange',(data) => {
					if(data.resCode == 1){
						this.getData();
						this.hasChange.isShow = true;
						this.changeBox.isShow = false;
						this.addrId = ''
						if(this.getCookie('festShow')) {this.delCookie('festShow')}
					}
				},{addressId:this.addrId,commodityId:this.itemInfo.id})
			},

			// 初始化数据
			getData(){
				this.getNotlogData('/activity/annualActInit',(res) => {
					if(res.resCode == 1){
						this.$refs.holiday.style.backgroundImage = "url("+"'"+ (res.resData.headerImg.toString()).split(',')[0]+"'"+")"
						this.titleName = res.resData.actName;
						this.PassValue('NavWhite_'+res.resData.actName);
						this.goodsList = res.resData.commodities;
						this.scrollInfo = res.resData.records;
						this.info = res.resData
						res.resData.addrId ? this.addrId = res.resData.addrId : this.addrId = ''
						// 从地址页面跳回来，兑换弹框自动弹出
						if (this.getCookie('festShow')) {
							this.checkInfo(res.resData.commodities)
							this.changeBox.isShow = true
						} 

						if (res.resData.records.length ==0) {
						    this.isShowNotice = false
						} else {
						    this.isShowNotice = true
						    let that  = this
						    if (this.isShowNotice){
						    	$(document).ready(function(){
						    		clearInterval(that.timer)
						    	    that.timer = window.setInterval(function(){
						    	        if (that.isShowNotice){
						    	            $('.scroll-div').find("ul:first").animate({
						    	                marginTop: -that.$refs.messageList[0].offsetHeight + 'px'
						    	            },500,function(){
						    	                $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
						    	            });
						    	        }else{
						    	            clearInterval(that.timer)
						    	        }
						    	    },3000);
						    	});
						    }
						}
					}
				},{activityId:this.activityIds,addrId:this.addrId})
            },
            // 关闭计算器
            closeCal () {
                this.showCalculator = false
			},
			// 跳转地址列表
			toAddr () {
				if (this.info.hasDefaultAddr == 1) {
                    this.appRouter('/intAddressList',{source:'fest',festId:this.itemInfo.id,_type:1})
                } else {
                    this.appRouter('/intAddress',{_type:1})
                }
			},
			// 查询商品信息
			checkInfo (data) {
				data.forEach(item => {
					if(item.id == this.$route.query.festId) {
						this.itemInfo = item
					}
				});
				this.addrId = this.$route.query.addrId
			},
			// 关闭兑换弹框
			closeChange () {
				this.changeBox.isShow = false
				this.addrId = ''
				if(this.getCookie('festShow')) {this.delCookie('festShow')}
			}
		},
		components:{
            calculator
		},
		beforeRouteEnter: (to, from, next) => {
				next(vm => {               
					if (from.path == '/intAddressList') {
						vm.$route.query.addrId ? vm.addrId = vm.$route.query.addrId : vm.addrId = ''
					} else {
						vm.addrId = ''
					}
					vm.getData()
				}
			)
        },
		created(){
			this.activityIds = this.$route.query.activityId;
			this.getCookie('userToken') || this.userId ? this.loginStatus = true : this.loginStatus = false;
			this.getCookie('festShow') ? this.changeBox.isShow = true : this.changeBox.isShow = false
			this._getActivityTime();
		},
		mounted(){
			setTimeout(() =>{
				document.body.scrollTop = 1+'px'
			},500)
		},
		destroyed(){
			clearInterval(this.timer);
			this.addrId = ''
			if(this.getCookie('festShow')) {this.delCookie('festShow')}
		},
	}
</script>
<style lang="scss" scoped>
	.holiday{
		position: relative;
		/*3053px*/
		height: 40.7rem;
		// background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/main.png) no-repeat;
		background-size: 100% 40.7rem;
		background-repeat: no-repeat;
		overflow: hidden;
		.k_scroll_box{
			position: relative;
			height: 0.773333rem;
			margin-top: 9.8rem;
		}
		.scroll_box{
			position: relative;
			height: .693333rem;
			width: 8.266667rem;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/notice.png) no-repeat;
			background-size: 8.266667rem .693333rem;
			padding-top: .03rem;
		}
		.scroll-div{
			position: relative;
			width: 8rem;
            height: .613333rem;
            padding: .1rem .213333rem 0  1.4rem;
            font-family: SourceHanSansCN-Normal;
        	font-size: 0.32rem;
            color: #ffffff;
            overflow: hidden;
            li{
            	width: 100%;
            	white-space: nowrap;
            	overflow: hidden;
        	    height: .613333rem;
        	    text-overflow: ellipsis;
            }
		}
		.investMoney{
			height: 3.413333rem;
			width: 9.066667rem;
			margin: .556667rem auto .64rem auto;
			position: relative;
			overflow: hidden;
			.caculator-btn {
				width: 1.066667rem;
				height: 1.066667rem;
				position: absolute;
				right: .266667rem;
				bottom: 0;
			}
			.change_rule{
				position: absolute;
				width: .5rem;
				height: .5rem;
				top: 1.546667rem;
				left: 5.706667rem;
			}
			.my-exchange {
				img {
					display: inline-block;
					width: 1.546667rem;
					height: .306667rem;
					position: absolute;
					top: .2rem;
					right: .46rem;
				}
				p {
					font-family: DIN-Bold;
					font-size: .613333rem;
					color: #FF3419;
					text-align: center;
					position: absolute;
					width:100%;
					height: .746667rem;
					top: .62rem;
				}
			}
			.inner{
				width: 8.72rem;
				height: .6rem;
				line-height: .6rem;
				margin: 0 auto;
				margin: .853333rem auto 0.413333rem auto;
				div{
					width: 33.3%;
					text-align: center;
					font-family: SourceHanSansCN-Medium;
					font-size: 0.4rem;
					color: #2f2f2f;
				}
			}
			.btn{
				width: 2.853333rem;
				height: .866667rem;
				font-size: .346667rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/loginBtn.png) no-repeat;
				background-size: 2.853333rem .866667rem;
				margin: .42rem auto 0 auto;
			}
		}
		ul.goods_list{
			position: relative;
			margin-left:.533333rem;
			li{
				width: 3.733333rem;
				height: 5.066667rem;
				float: left;
				margin:.666667rem 0  0 .44rem;
				float: left;
				position: relative;
				.subscript {
					width: 1.56rem;
					height: 1.56rem;
					position: absolute;
					right: -0.05rem;
					top:-0.1rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/subscript.png) no-repeat;
					background-size: 1.56rem 1.56rem;
					span {
						display: inline-block;
						transform: rotate(44deg);
						-ms-transform:rotate(44deg);
						-moz-transform:rotate(44deg); 
						-webkit-transform:rotate(44deg);
						-o-transform:rotate(44deg); 
						font-size: .293333rem;
						color: #FFFFFF;
						position: absolute;
						right: 0rem;
						top: .35rem;
					}
				}
				.doBtn{
					width: 3.346667rem;
					height: .746667rem;
					position: relative;
					top: 4.053333rem;
					margin:0 auto; 
				}
				.doBtn.toComplete{
					background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/comBtn.png) no-repeat;
					background-size: 3.346667rem .746667rem;
				}
				.doBtn.toChange{
					background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/ExchangeBtn.png) no-repeat;
					background-size: 3.346667rem .746667rem;
				}
				.greyBtn {
					background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/greyBtn.png) no-repeat;
					background-size: 3.346667rem .746667rem;
				}
			}
			li:nth-of-type(2n) {
				margin-left: .56rem
			}
		}
		.rule{
			position: fixed;
			right: .3rem;
			top: 0;
			width: 1.133333rem;
			height: 1.2rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/rule2.png) no-repeat;
			background-size: cover;
			z-index: 11;
		}
		.rule_box{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
			position:fixed;
			top:0;
			z-index:100;
			padding-top: 2.666667rem;
			.rule_wrap{
				width: 7.866667rem;
				height: 9.8rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/rulePic2.png) no-repeat;
				background-size: 7.866667rem 9.68rem;
				margin: 0 auto;
				position: relative;
				a {
					    display: inline-block;
						width: 2.2rem;
						height: .606667rem;
						position: absolute;
						top: 6.35rem;
						left: 1rem;
				}
			}
			.close_btn{
				width:1.566667rem;
			    height: 1.266667rem;
			    position: absolute;
			    bottom: 0;
				left: 3.3rem;
			}
			.content{
				width:100%;
				position: absolute;
				font-size: .32rem;
				color: #999999;
				text-align: center;
			    top: 7.466667rem;
			}
			.tip_box{
				width: 7.213333rem;
				height: 3.653333rem ;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/tip2.png) no-repeat;
				background-size: 7.213333rem 3.653333rem;
				margin: 0 auto;
				position: relative;
				.know_btn{
					width: 100%;
					height: 1.52rem;
					position: relative;
					top: 1.86667rem;
				}
			}
		}
		.task{
			position: absolute;
			width: 100%;
			bottom: 0;
			background: #fff;
			.greyExchange-btn {
				
			}
			.goods_title{
				width: 100%;
				height: 1.173333rem;
				background: #ffffff;
				line-height: 1.173333rem;
				border-bottom: 1px solid #E5E5E5;
				position: relative;
				i{
					width: 0.48rem;
					height: 0.48rem;
					background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/closeBtn.png) no-repeat;
					background-size: 0.48rem 0.48rem;
					position: absolute;
					top: 0.36rem;
					right: 0.4rem;
				}
			}
			.goods_title.txt2{
				text-align: center;
			}
			
			.task_contain2{
				font-family: PingFang-SC-Medium;
				padding: 0.533333rem 0.666667rem .4rem 0.666667rem;
				.box1{
					p{
						font-size: 0.373333rem;
						color: #333333;
						margin-bottom: .38rem;
						line-height: .533333rem;
						span {
							font-size: .346667rem;
							color: #808080;
						}
					}
					.task-addr {
						position: relative;
						font-size: 0.373333rem;
						color: #333333;
						margin-bottom: .38rem;
						line-height: .533333rem;
						span {
							font-size: .346667rem;
							color: #333333;
							padding-right: .2rem;
						}
						img {
							width: .153333rem;
							height: .35rem;
							position: absolute;
							right: -.1rem;
							top: .125rem;
						}
						.hasArrow {
							position: absolute;
							right: -.1rem;
							top: .45rem;
						}
						.addr-span {
							width: 6.5rem;
							font-size: .346667rem;
							letter-spacing: -.01rem;
							p:nth-of-type(1) {
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							p {
								margin-bottom: .133333rem;
								overflow: hidden;
								span:nth-of-type(2) {
									color: #808080;
								}
							}
						}
					}
				}
			}
			.btns{
				width: 100%;
				padding-bottom: 0.653333rem;
				overflow: hidden;
				.btn_box{
					width:3.466667rem;
					height: 0.933333rem;
					float: left;
				}
				.change_btn_box{
					width: 5.333333rem;
					height: .933333rem;
					line-height: .933333rem;
					background: #FF5B4C;
					border-radius: .533333rem;
					font-size: .373333rem;
					color: #FFFFFF;
					text-align: center;
					margin: 0 auto;
				}
				.changeGrey-btn {
					background: #A6A6A6;
				}
			}
		}
		.game_box{
			width: 7.44rem;
			height: 5.693333rem;
			margin: 0 auto;
		}
		.game_btn{
			width: 100%;
			height: 1.333333rem;
			position: relative;
			top: 1.733333rem;
		}
		.game_box.unOPen{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/unstart2.png) no-repeat;
			background-size: 7.226667rem 3.653333rem;
		}
		.game_box.over{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/start2.png) no-repeat;
			background-size: 7.226667rem 3.653333rem;
		}
		.hasChange_box{
			width: 7.213333rem;
			height: 6.32rem;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/exchange1.png) no-repeat;
			background-size: 7.213333rem 6.32rem;
			position: relative;
			.close_change_btn{
				width: 1rem;
				height: 1.2rem;
				position: absolute;
				bottom: 0;
				left: 3.2rem;
			}
			.top2{
				top: 3.1rem;
			}
		}
		.redChange-box {
			background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/exchange2.png) no-repeat;
			background-size: 7.213333rem 6.32rem;
		}
	}
	.six-holiday {
		/*2580px*/
		// 3053 40.7
		height: 34.4rem;
		// background: url(https://aliyunsso.edspay.com/web/wx/activity/11assist/main.png) no-repeat;
		background-size: 100% 34.4rem;
		background-repeat: no-repeat;
	}
</style>