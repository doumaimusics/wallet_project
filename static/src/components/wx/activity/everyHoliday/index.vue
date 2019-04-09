<template>
	<div class="holiday" :style="{background: 'url('+ bgSrc +') no-repeat center center / 10rem 43.96rem'}">
		<div v-title>{{activityName}}</div>
		<div class="banner"></div>
		<div class="gameBox" v-if="gameTimeBox" @click="ActivityPrompt"></div>
		<!-- 规则按钮 -->
		<div class="rule" @click="layerBoxRule = true"></div>
		<!-- 滚动信息 -->
		<div class="k_scroll_box">
			<div class="scroll_box clear" v-if="isShowNotice">
	        	<span class="tip_ico fl"></span>
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
			<div class="inner clear">
				<div class="fl">
				{{amountNine | moneyFormat(1)}}元
			</div>
				<div class="fl">
				{{amountEight | moneyFormat(1)}}元
			</div>
				<div class="fl">
				{{amountSix | moneyFormat(1)}}元
			</div>
			</div>
			<div class="btn" v-if="userId || getCookie('userToken')" :class="{hasLogin:userId || getCookie('userToken')}" @click="toWxUrl('/everyHoliday/changeRecord','activityId',activityIds)"></div>
			<div class="btn" v-else @click="toLogin"></div>
		</div>

		<!-- 商品列表 -->
		<ul class="goods_list clear">
			<li v-for="item in goodsList">
				<div class="doBtn toComplete" @click="toComplete(item)" v-if="item.btnStatus == 0"></div>
				<div class="doBtn toChange" @click="toComplete(item)" v-else></div>
			</li>
		</ul>
		
		<!-- 任务完成情况 -->
		<task :getGoodCondition="checkList" v-if="taskBox.isShow" :taskBox="taskBox"></task>
		<!-- 可兑换弹框 -->
		<div class="rule_box" v-if="changeBox.isShow">
			<div class="task">
				<div class="goods_title txt2">确认兑换<i @click="changeBox.isShow = false"></i></div>
				<div class="task_contain2 clear">
					<div class="box1">
						<p>兑换商品</p>
						<p>兑换方式</p>
					</div>
					<div class="box2">
						<p>{{checkList.goodTitle}}</p>
						<div class="dis" @click="checked(checkList.checkBtnStatus,1)" :class="{red:checkList.checkBtnStatus == 1 || checkList.checkBtnStatus == 4 || checkList.checkBtnStatus == 6 || checkList.checkBtnStatus == 9,pad:checkList.checkBtnStatus != 1 && checkList.checkBtnStatus != 4 && checkList.checkBtnStatus != 6 && checkList.checkBtnStatus != 9}">消耗90天项目 {{checkList.amount90 | moneyFormat(1)}}元 
							<img :src="checkBg[indexOne]" v-if="checkList.checkBtnStatus == 1 || checkList.checkBtnStatus == 4 || checkList.checkBtnStatus == 6 || checkList.checkBtnStatus == 9"></img>
						</div>
						<div class="dis" @click="checked(checkList.checkBtnStatus,2)" :class="{red:checkList.checkBtnStatus == 2 || checkList.checkBtnStatus == 4 || checkList.checkBtnStatus == 5 || checkList.checkBtnStatus == 9,pad:checkList.checkBtnStatus != 2 && checkList.checkBtnStatus != 4 && checkList.checkBtnStatus != 5 && checkList.checkBtnStatus != 9}">消耗180天项目 {{checkList.amount180 | moneyFormat(1)}}元 
							<img :src="checkBg[indexTwo]" v-if="checkList.checkBtnStatus == 2 || checkList.checkBtnStatus == 4 || checkList.checkBtnStatus == 5 || checkList.checkBtnStatus == 9"></img>
						</div>
						<div @click="checked(checkList.checkBtnStatus,3)" :class="{red:checkList.checkBtnStatus == 3 || checkList.checkBtnStatus == 5 || checkList.checkBtnStatus == 6 || checkList.checkBtnStatus == 9,pad:checkList.checkBtnStatus != 3 && checkList.checkBtnStatus != 5 && checkList.checkBtnStatus != 6 && checkList.checkBtnStatus != 9}">消耗360天项目 {{checkList.amount360 | moneyFormat(1)}}元 
							<img :src="checkBg[indexThree]" v-if="checkList.checkBtnStatus == 3 || checkList.checkBtnStatus == 5 || checkList.checkBtnStatus == 6 || checkList.checkBtnStatus == 9"></img>
						</div>
					</div>
				</div>
				<div class="btns clear">
					<div class="btn_box invest_btn_box" @click="toInvestBtn"></div>
					<div class="btn_box change_btn_box" @click="doChange(checkList.id)"></div>
				</div>
			</div>
		</div>

		<!-- 规则 -->
		<div class="rule_box" v-if="layerBoxRule">
			<div class="rule_wrap">
				<div class="close_btn"  @click="layerBoxRule = false"></div>
				<div class="content" v-if="osType != 'IOS'"></div>
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
			<div class="hasChange_box">
				<div class="close_change_btn" @click="hasChange.isShow = false"></div>
				<div class="game_btn top2" @click="toWxUrl('/everyHoliday/changeRecord','activityId',activityIds)"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import wxToapp from '../../../../common/wx/wxToapp';
	import task from './task'; //任务弹框组件
	export default {
		mixins:[wxToapp],
		data() {
			return {
				activityName:'',
				bgSrc:'',//背景图
				goodsList:[],//商品列表
				scrollInfo:[],//用户兑换记录
				amountNine:'',//用户投资90天金额
				amountEight:'',//用户投资180天金额
				amountSix:'',//用户投资360天金额
				datainfo:{},//页面信息
				checkList:{},//去兑换弹框
				loginStatus:false,//登陆状态
				isShowNotice:false,//是否显示用户兑换记录

				layerBoxRule:false,//规则弹框
				layerBoxTip:false,//兑换规则弹框

				taskBox:{//去完成任务弹框
					isShow:false
				},
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
				checkStatus:{//选择兑换 1,消耗90天 2,消耗180天
					status:''
				},
				indexOne:0,
				indexTwo:0,
				indexThree:0,
				checkBg:[
					'https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/uncheck.png',
					'https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/checked.png'
				],
				activityIds:'',//活动ID
				redText1:0,
				timer:null,
				checkLists:[]
				// checkBtnStatus:'',//当前满足的条件
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
				    this.gameTimeBox = true;
					this.gameUnstart = true;
			  	} else if (this.activityStatus == 3) {
				    this.gameTimeBox = true;
					this.gameover = true;
			  	}
			},
			
			// 点击去完成按钮显示弹框
			toComplete(item){
				if(this.userId || this.getCookie('userToken')){
					this.checkList.goodTitle = item.name;
					this.checkList.amount90 = item.amount90;
					this.checkList.amount180 = item.amount180;
					this.checkList.amount360 = item.amount360;
					this.checkList.amountOne = parseInt(item.amount90) - parseInt(this.amountNine);
					this.checkList.amountTwo = parseInt(item.amount180) - parseInt(this.amountEight);
					this.checkList.amountThree = parseInt(item.amount360) - parseInt(this.amountSix);

					this.checkList.btnStatus = item.btnStatus;
					this.checkList.id = item.id;

					if(item.btnStatus == 0){//打开任务完成进度弹框
						this.taskBox.isShow = true;
					}else{//打开兑换弹框
						this.changeBox.isShow = true;
						this.indexOne = 0;
						this.indexTwo = 0;
						this.indexThree = 0;
						// 任务完成状态判断
						if( this.checkList.amountOne <= 0 ){
							this.checkList.checkBtnStatus = 1;

						}
						if ( this.checkList.amountTwo <= 0 ){
							this.checkList.checkBtnStatus = 2;

						}
						if ( this.checkList.amountThree <= 0 ){
							this.checkList.checkBtnStatus = 3;

						}
						if( this.checkList.amountOne <= 0 && this.checkList.amountTwo <= 0 ){
							this.checkList.checkBtnStatus = 4;

						}
						if( this.checkList.amountTwo <= 0 && this.checkList.amountThree <= 0 ){
							this.checkList.checkBtnStatus = 5;

						}
						if( this.checkList.amountOne <= 0 && this.checkList.amountThree <= 0 ){
							this.checkList.checkBtnStatus = 6;

						}
						if( this.checkList.amountOne <= 0 && this.checkList.amountTwo <= 0 && this.checkList.amountThree <= 0 ){
							this.checkList.checkBtnStatus = 9;
						}

						// 默认选中状态
						if(this.checkList.checkBtnStatus == 1 || this.checkList.checkBtnStatus == 4 || this.checkList.checkBtnStatus == 6 || this.checkList.checkBtnStatus == 9){
							this.indexOne = 1;
							this.checkStatus.status = 1;
						}else if(this.checkList.checkBtnStatus == 2 || this.checkList.checkBtnStatus == 5){
							this.indexTwo = 1;
							this.checkStatus.status = 2;
						}else if(this.checkList.checkBtnStatus == 3){
							this.indexThree = 1;
							this.checkStatus.status = 3;
						}
						// console.log('状态:'+this.checkList.checkBtnStatus)
						// console.log('金额差90:'+this.checkList.amountOne)
						// console.log('金额差180:'+this.checkList.amountTwo)
						// console.log('金额差360:'+this.checkList.amountThree)
						// console.log('选择:'+this.checkStatus.status)
					}
				}else{
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
				}
				
			},
			toInvestBtn () {
				if(this.userId || this.getCookie('userToken')){
					this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
				}else{
					this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
				}
			},
			// 单选判断
			checked(status,type){
				if(type == 1){
					if(status == 1){
						this.indexOne = 1;
						this.checkStatus.status = 1;
					}else if(status == 4 || status == 6 || status == 9){
						this.indexOne = 1;
						this.indexTwo = 0;
						this.indexThree = 0;
						this.checkStatus.status = 1;
					}
				}else if(type == 2){
					if(status == 2){
						this.indexTwo = 1;
						this.checkStatus.status = 2;
					}else if(status == 4 || status == 5 || status == 9){
						this.indexOne = 0;
						this.indexThree = 0;
						this.indexTwo = 1;
						this.checkStatus.status = 2;
					}
				}else if(type == 3){
					if(status == 3){
						this.indexThree = 1;
						this.checkStatus.status = 2;
					}else if(status == 5 || status == 6 || status == 9){
						this.indexOne = 0;
						this.indexThree = 1;
						this.indexTwo = 0;
						this.checkStatus.status = 3;
					}
				}
			},
			
			// 确认兑换
			doChange(id){
				this.changeBox.isShow = false;
				this.getAppData('/activity/fest/exchange',(data) => {
					if(data.resCode == 1){
						this.hasChange.isShow = true;
						this.getData();
					}
				},{commodityId:id,exchangeType:this.checkStatus.status,activityId:this.activityIds})
			},

			// 初始化数据
			getData(){
				this.getNotlogData('/activity/fest/init',(res) => {
					if(res.resCode == 1){
						this.bgSrc = (res.resData.headerImg.toString()).split(',')[0];
						this.amountNine = res.resData.amountSum90;
						this.amountEight = res.resData.amountSum180;
						this.amountSix = res.resData.amountSum360
						this.goodsList = res.resData.commodities;
						this.scrollInfo = res.resData.records;

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
				},{activityId:this.activityIds})
			},
		},
		components:{
			task
		},
		created(){
			if(this.$route.query.activityId){
				this.activityIds = this.$route.query.activityId;
				if(this.$route.query.activityId == 'activity_fest2'){
					this.activityName = '每逢佳节（二）';
				}else if(this.$route.query.activityId == 'activity_fest3'){
					this.activityName = '每逢佳节（三）';
				}
			}
			this.getCookie('userToken') || this.userId ? this.loginStatus = true : this.loginStatus = false;
			this._getActivityTime();
			this.getData();
		},
		mounted(){
			setTimeout(() =>{
				document.body.scrollTop = 1+'px'
			},500)

			if(this.$route.query.activityId){
				if(this.$route.query.activityId == 'activity_fest2'){
					this.PassValue('NavWhite_每逢佳节（二）');
				}else if(this.$route.query.activityId == 'activity_fest3'){
					this.PassValue('NavWhite_每逢佳节（三）');
				}
			}
		},
		destroyed(){
			clearInterval(this.timer);
		}
	}
</script>
<style lang="scss" scoped>
	.holiday{
		position: relative;
		height: 43.96rem;
		// background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/holiday_bag.png) no-repeat;
		background-size: 100% 43.96rem;
		background-repeat: no-repeat;
		.banner{
			height: 18.493333rem;
		}
		.k_scroll_box{
			position: relative;
			height: 0.773333rem;
			margin-bottom: 0.33333rem;
		}
		.scroll_box{
			position: relative;
			height: 0.773333rem;
			width: 8.88rem;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/scroll_bg.png) no-repeat;
			background-size: 8.88rem 0.773333rem;
			padding-top: .03rem;
		}
		.tip_ico{
			display: inline-block;
			width: 0.306667rem;
			height: 0.28rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/tip_ico.png) no-repeat;
			background-size: 0.306667rem 0.28rem;
			position: relative;
			margin-left: .5rem;
			top: 0.183333rem;
		}
		.scroll-div{
			position: relative;
			width: 7.6rem;
            height: .613333rem;
            padding: .13rem .213333rem .12rem;
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
			height: 4.186667rem;
			width: 100%;
			padding-top:0.533333rem;
			position: relative;
			margin-bottom: 1.653333rem;
			.change_rule{
				position: absolute;
				width: 0.653333rem;
				height: 0.653333rem;
				top: 0.12rem;
				right: 0.68rem;
			}
			.inner{
				width: 8.72rem;
				height: 1.893333rem;
				margin: 0 auto;
				padding-top: 0.586667rem;
				margin-bottom: 0.413333rem;
				div{
					width: 33.3%;
					text-align: center;
					font-family: SourceHanSansCN-Medium;
					font-size: 0.4rem;
					color: #2f2f2f;
				}
			}
			.btn{
				width: 2.56rem;
				height: 0.653333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/login_ico.png) no-repeat;
				background-size: 2.56rem 0.653333rem;
				margin: 0 auto;
			}
			.btn.hasLogin{
				background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/mychange_ico.png) no-repeat;
				background-size: 2.56rem 0.653333rem;
			}
		}
		ul.goods_list{
			position: relative;
			margin-left: 1.12rem;
			li{
				width: 3.72rem;
				height: 4.826667rem;
				float: left;
				margin-right: 0.306667rem;
				float: left;
				position: relative;
				margin-bottom: 0.906667rem;
				.doBtn{
					width: 2.56rem;
					height: 0.653333rem;
					position: relative;
					top: 4.0rem;
					margin:0 auto; 
				}
				.doBtn.toComplete{
					background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/complete_ico.png) no-repeat;
					background-size: 2.56rem 0.653333rem;
				}
				.doBtn.toChange{
					background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/change_ico.png) no-repeat;
					background-size: 2.56rem 0.653333rem;
				}
			}
		}
		.rule{
			position: fixed;
			right: 0;
			top: 1.0rem;
			width: 2.04rem;
			height: 0.68rem;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/rule_ico.png) no-repeat;
			background-size: 2.04rem 0.68rem;
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
				width: 8.133333rem;
				height: 9.173333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/rule.png?v1.2) no-repeat;
				background-size: 8.133333rem 9.173333rem;
				margin: 0 auto;
			}
			.close_btn{
				width: 1.3rem;
			    height: 1.2rem;
			    position: relative;
			    left: 7.1rem;
			}
			.content{
				width: 5.666667rem;
			    height: 0.666667rem;
			    position: relative;
			    margin: 0 auto;
			    background: #ffdab1;
			    top: 5.85rem;

			}
			.tip_box{
				width: 8.133333rem;
				height: 5.933333rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/change_rule.png?v1.2) no-repeat;
				background-size: 8.133333rem 5.933333rem;
				margin: 0 auto;
				position: relative;
				.know_btn{
					width: 100%;
					height: 1.12rem;
					position: relative;
					top: 4.186667rem;
				}
			}
		}
		.task{
			position: absolute;
			width: 100%;
			bottom: 0;
			background: #fff;
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
					background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/close_ico.png) no-repeat;
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
				padding: 0.533333rem 0.666667rem;
				.box1{
					width: 2.666667rem;
					float: left;
					p{
						font-size: 0.373333rem;
						color: #333333;
						margin-bottom: 0.533333rem;
						text-align: left;
					}
				}
				.box2{
					text-align: right;
					p{
						font-size: 0.346667rem;
						color: #666666;
						margin-bottom: 0.533333rem;
						text-align: right;
					}
					div{
						font-size: 0.346667rem;
						color: #C5C5C5;
						img{
							width: 0.293333rem;
							height: 0.293333rem;
							position: relative;
						    top: -.02rem;
						}
					}
					div.pad{
						padding-right: .36rem;
					}
					div.dis{
						margin-bottom: 0.12rem;
					}
					div.red{
						color: #FF5B4C;
					}
				}
			}
			.btns{
				width: 100%;
				padding-bottom: 0.653333rem;
				.btn_box{
					width:3.466667rem;
					height: 0.933333rem;
					float: left;
				}
				.invest_btn_box{
					background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/toInvest.png) no-repeat;
					background-size: 3.466667rem 0.933333rem;
					margin-left: 1.2rem;
					margin-right: 0.666667rem;
				}
				.change_btn_box{
					background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/comfirm.png) no-repeat;
					background-size: 3.466667rem 0.933333rem;
				}
			}
		}
		.gameBox{
			position: absolute;
			z-index: 10;
			width: 100%;
			height: 17.52rem;
			left: 0;
			top: 25.066667rem;
		}
		.game_box{
			width: 7.013333rem;
			height: 4.986667rem;
			margin: 0 auto;
		}
		.game_btn{
			width: 100%;
			height: 1.333333rem;
			position: relative;
			top: 3.333333rem;
		}
		.game_box.unOPen{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/gameUnopen.png) no-repeat;
			background-size: 7.013333rem 4.986667rem;
		}
		.game_box.over{
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/gameOver.png) no-repeat;
			background-size: 7.013333rem 4.986667rem;
		}
		.hasChange_box{
			width: 8.133333rem;
			height: 7.506667rem;
			margin: 0 auto;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/change_success.png) no-repeat;
			background-size: 8.133333rem 7.506667rem;
			position: relative;
			.close_change_btn{
				width: 1.066667rem;
				height: 1.066667rem;
				position: absolute;
				right: 0;
				top: 0;
			}
			.top2{
				top: 5.633333rem;
			}
		}
	}
</style>