<template>
	<div id="wxDetailPoint">
		<div v-if="borrow.name" v-title>{{borrow.name}}</div>
		<div id="fullHeight">
			<div class="synopsis clear">
				<div class="det_lf">
					<p>
						<span class="det_span1">
							{{borrow.apr ? borrow.apr:0 | returnFloat(1)}}
							<span class="ico_1 ic" v-if="borrow.addApr">平台加息</span> 
							<span class="ico_3 ic" :class="{ico_2:borrow.addApr}" v-if="borrow.vipUprateApr && borrow.vipLevel>=1">v{{borrow.vipLevel}}加息</span>
						</span>
						<span class="det_span2">%</span>
						
						<span class="det_span3" v-if="borrow.addApr && borrow.vipUprateApr">+{{(borrow.addApr+borrow.vipUprateApr) | returnFloat(1)}}%</span>
						<span class="det_span3" v-else-if="borrow.addApr">+{{borrow.addApr | returnFloat(1)}}%</span>
						<span class="det_span3" v-else-if="borrow.vipUprateApr">+{{borrow.vipUprateApr | returnFloat(1)}}%</span>
					</p>
					<p class="det_p">参考年化</p>
				</div>
				<div class="det_bf bdr-t">
					<div class="lastMoney fl">
						<div class="num">{{borrow.remainAmount ? borrow.remainAmount:0  | moneyFormat(2)}}</div>
						<div class="text">剩余金额(元)</div>
					</div>
					<div class="day fl">
						<div class="num">{{borrow.timeLimit}}</div>
						<div class="text">授权服务期(天)</div>
					</div>
					<div class="starting fl">
						<div class="num">{{borrow.minAmount}}</div>
						<div class="text">最低出借金额(元)</div>
					</div>
				</div>
				<!-- <div class="det_rt">
					<div class="scricle_move">
						<div class="move_lf" :style="{left:borrow.progress+'%'}"><span class="det_span5">{{progressNum}}%</span></div>
					</div>
					<div class="progress_line">
						<div class="white_line" :style="{width:borrow.progress+'%'}"></div>
					</div>
					<p class="det_p det_p2">剩余金额: <span class="det_span4">{{borrow.remainAmount ? borrow.remainAmount:0  | moneyFormat(2)}}</span> 元</p>
				</div> -->
				<!-- <div class="clear">
					<div class="invest_type">
						<div class="type_tip">存管</div>
					</div>
					<div class="percent fl">
						<div v-if="borrow.limit" class="limit">+{{borrow.limit}}%</div>
						<div class="percentNum">
							<div class="add_apr"><em v-if="borrow.addApr">+{{borrow.addApr | returnFloat(1)}}%</em></div>
							<span>{{borrow.apr ? borrow.apr:0 | returnFloat(1)}}</span>%
						</div>
						<div class="text">预期年化收益率</div>
					</div>
					<div class="info fl">
						<div class="wraTime">项目期限<span>{{borrow.timeLimit}}{{borrow.timeType == '1' ? '天':'个月'}}</span></div>
						<div class="surplus">剩余金额&nbsp;&nbsp;{{borrow.remainAmount | changeWan}}元</div>
					</div>
				</div>
				<div class="sold">已售{{borrow.progress}}%</div>
				<div class="line">
					<div class="point" :style="{left:borrow.progress-0.5+'%'}"></div>
					<div class="whiteLine" :style="{width:borrow.progress+'%'}"></div>
				</div> -->
			</div>
			<div class="steps">
				<div class="back_progress clear">
					<div class="div_box">
						<img :src="progressImg[0]" alt="">
						<p class="p1">授权出借</p>
					</div>
					<div class="line"></div>
					<div class="div_box">
						<img :src="progressImg[1]" alt="">
						<p class="p1">预计起息</p>
					</div>
					<div class="line"></div>
					<div class="div_box">
						<img :src="progressImg[2]" alt="">
						<p class="p1">服务期结束</p>
					</div>
					<div class="line"></div>
					<div class="div_box">
						<img :src="progressImg[3]" alt="">
						<p class="p1">转让成功</p>
					</div>
				</div>
				<div class="data_text">
					<span class="span1">{{borrow.collectStartTime}}</span>
					<span class="span2">{{borrow.predStartInterestTime}}</span>
					<span class="span3">{{borrow.predEndInterestTime}}</span>
					<span class="span4">回款到账</span>
				</div>
			</div>
			<ul class="rule lists">
				<li  class="bdr-b">
					<div class="ruleTitle fl">项目特点</div>
					<div class="content fl">{{borrow.trait}}</div>
				</li>
				<li  class="bdr-b">
					<div class="ruleTitle fl">还款方式</div>
					<div class="content fl">{{borrow.style}}</div>
				</li>
				<li>
					<div class="ruleTitle fl">适宜出借人</div>
					<div class="content fl">{{borrow.availableBorrower}}</div>
				</li>
				<li  class="bdr-b">
					<div class="ruleTitle fl">安全等级</div>
					<div class="content fl"><img src="https://aliyunsso.edspay.com/web/wx/invest/star375.png" alt=""><span>(内部评价，仅供参考)</span></div>
				</li>
			</ul>
			<ul class="rule lists borrFor">
				<router-link class="bdr-b" :to="{path:'/wxFinaPlanBorrowers',query:{uuid:uuid}}" tag="li">
					<img class="leftImg fl" src="https://aliyunsso.edspay.com/web/invest/detailPoint/ruleTitle1.png" alt=""/>
					<span class="fl">债权组成</span>
				</router-link>
				<router-link :to="{path:'/wxInvestRecordPoint',query:{uuid:uuid}}" tag="li">
					<img class="leftImg fl" src="https://aliyunsso.edspay.com/web/invest/detailPoint/ruleTitle2.png" alt=""/>
					<span class="fl">出借记录</span>
				</router-link>
			</ul>
		</div>
		<wx-detail :fullHeight="fullHeight"></wx-detail>
		<div class="btn">
			<!-- 计算器 -->
			<div class="calculator" @click="wxCalculator"></div>

			<!-- 出借按钮 -->
			<div v-if="borrow.progress !=100 && borrow.timeToStart <= 0" @click="goInvestMoney" class="btns_color_on doBth"><span v-if="(borrow.newbieOnly && !borrow.canTender)">仅新手出借</span><span v-else>授权出借</span>
			</div>
			<div v-else-if="borrow.progress ==100" class="btns_color_off doBth">{{btnText}}</div>
			<div v-else-if="borrow.timeToStart>0" class="btns_color_off doBth"><time-down @timeEnd="timeEnd" :lastTime="borrow"  :endTime='borrow.endTime' :shartTime='borrow.shartTime'></time-down></div>
		</div>
		<wx-authorize v-if='showThis.isShow' :showThis="showThis" :btn="1" :text="authorizeText" :btnText="btnTexts" :confirmBtn="confirmBtn"></wx-authorize>

		<wx-code v-if="showMessage.getMessage" :logo="'授权'" :num="2" :showMessage="showMessage" :code="code" :confirm="checkCode" :phone="borrow.zsBindPhone" :again="confirmBtn"></wx-code>
		<zsopen-tip v-if="showZsOpne.isShow" :showThis="showZsOpne" :assetManageType="borrow.assetManageType" :borrow="borrow"></zsopen-tip>
		<wx-authorize v-if='evaluation.isShow' :showThis="evaluation" :btn="1" :text1="evaluationText1" :text2="evaluationText2" :btnText="evaluationBtn" :btnCli="1" :doOther="doOther" :confirmBtn="evaluationFun" :textShow="1"></wx-authorize>
		<wx-calculator v-if="calculator.isShow" :calculator="calculator" :apr="borrow.apr" :addApr="borrow.addApr" :days="borrow.timeLimit" :vipUprateApr="borrow.vipUprateApr"></wx-calculator>
	</div>
</template>
<script>
	import wxDetail from './wxIdpoint';      // 常见问题页面修改字 后台传
	import zsopenTip from '../member/invest/zsOpenTip';
	import wxAuthorize from '../member/invest/wxPublicDialog'; //授权弹框
	import wxCode from '../member/invest/popupMessage';
	import wxToast from '../../../common/wx/wxToast'; //引入toast提示
	import timeDown from '../../public/wx/timeDown';
	import wxCalculator from '../../public/wx/wxCalculator'; //计算机引入
	export default {
		mixins:[wxToast],
		data(){
			return {
				gridData:'出借三重礼',
				laym:false,
				type:3,
				uuid:null,
				allLoaded:true,
				btnText:'',
				bottomText:'',
				borrow :{},
				userData:{},	//用户信息
				documentNode:'',	//三重礼内容
				showThis:{
					isShow:false,
				},
				showRisk:{
					isShow:false,
				},
				riskBtn:'去测评',
				riskText:'根据存管要求，为了保障您的权益，出借前，您需要完成风险测评！',
				showBinding:{
					isShow:false,
				},
				evaluation:{   // 风险评测
					isShow:false,
				},
				evaluationText1:'',  //风险测评提示
				evaluationText2:'', //风险测评提示
				evaluationBtn:['去测评','去出借'],
				showZsOpne:{isShow:false},//展示开通浙商
				progressImg:[
					'https://aliyunsso.edspay.com/web/wx/pointToPoint/mujikaishi.png',
					'https://aliyunsso.edspay.com/web/wx/pointToPoint/yujiqixi.png',
					'https://aliyunsso.edspay.com/web/wx/pointToPoint/pingmingzhuanqian.png',
					'https://aliyunsso.edspay.com/web/wx/pointToPoint/yujidaoqi.png'
				],
				processText: {
					forbegin: '11月21日',
					forapr: '11月22日',
					increase: '收益增长中',
					forTime: '锁定期满后结束',
				},
				authorizeText: '为了方便您的出借，首次出借、购买债权或开启自动出借前需要先开启支付授权，点击“确定”进行短信验证',
				btnTexts: ['取消','确定'],
				showMessage: {
					getMessage: false,
				},
				code:{
					msgCode:'',		//短信验证码
				},
				loginStr:'',//登陆状态
				fullHeight:'',
				calculator:{
					isShow:false
				},
				incomes:'',  //预期收益
				progressNum:'',//显示进度
				progressLineNum:'', //进度
				evFlag:true,//测评冒泡

			}
		},
		methods:{
			getData(){
				var that = this;
				this.uuid = this.$route.query.uuid;
				this.notLogPost('/borrow/borrowDetail',(res,data) =>{
					that.allLoaded = false;
					if(res.resCode){
						this.loginStr = res.resData.borrowDetail.loginStatus;
						that.borrow = res.resData.borrowDetail;
						this.progressLineNum = res.resData.borrowDetail.progress;
						this.evaluationText1 = (res.resData.borrowDetail.riskMes).split("|")[0];
						this.evaluationText2 = (res.resData.borrowDetail.riskMes).split("|")[1];
						this.getBtnText();
						this.loader();
					}
				},{uuid:this.uuid,assetManageType:3});

				this.notLogPost('/tender/rewardInfo',(res,data) => {
					if(res.resCode){
						this.documentNode = res.resData.ruleTxt;
					}
				},{},1)
			},
			confirmBtn() { //发送手机验证码
				this.showThis.isShow = false;
				this.code.msgCode = '';
				this.postData('/openAutoInvest',(res,data)=>{
					if (data.resCode) {
						this.showMessage.getMessage = true;
					} else {
						this.toast({text:data.resMsg});
						this.code.msgCode = ''
					}
				},{})
			},
			checkCode() { //验证手机验证码
				this.postData('/openAutoInvestCheck',(res,data)=>{
					if (data.resCode) {
						this.getData()
						this.showMessage.getMessage = false
						// this.$router.push({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:this.uuid}})
					} else {
						this.toast({text:data.resMsg});
					}
				},{flag:1,mobileCode:this.code.msgCode})
			},
			
			goInvestMoney(){	//去出借页
				if (this.loginStr == 0){
					this.$router.replace({path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
					return
				}
				if(this.borrow.newbieOnly && !this.borrow.canTender) return;
				if(this.borrow.bindCardIdStatus){
					if (this.borrow.autoTenderStatus == 1) {
						if(this.borrow.isRiskTest == 0){
							this.evaluation.isShow = true
						}else{
							this.$router.push({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:this.uuid}})
						}
					} else {
						this.showThis.isShow = true;
					}
				}else{
					this.showZsOpne.isShow = true;
					return;
				}
				
			},
			evaluationFun(){
				if(this.evFlag){
					this.evFlag = false;
					this.postData('/app/risk/defaultRiskReview',(res,data)=>{
						this.evFlag = true;
						this.evaluation.isShow = false
						if (data.resCode) {
							this.$router.push({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:this.uuid}})
						} else {
							this.toast({text:data.resMsg});
						}
					},{})
				}  
				
			},
			doOther(){ // 去测评
				this.evaluation.isShow = false
				this.$router.push('/wxRiskAssessment')
			},
			timeEnd(data){
				this.type = data;
			},

			//计算器
			wxCalculator(){
				this.calculator.isShow = true;
			},

			getBtnText(){ //出借按钮的状态
				let status = this.borrow.status
					if(status == 0){
						this.btnText = "等待初审";
					}else if(status == 1 && this.borrow.progress!=100){
						this.btnText = "初审通过";
					}else if(status == 1 && this.borrow.progress == 100){
						this.btnText = "满标待审";
					}else if(status == 2){
						this.btnText = "初审未通过";
					}else if(status == 3){
						this.btnText = "复审通过";
					}else if(status == 4 || status == 49){
						this.btnText = "复审未通过";
					}else if(status == -2){
						this.btnText = "撤回处理中";
					}else if(status == 5 || status == 59){
						this.btnText = "管理员撤回";
					}else if(status == 6){
						this.btnText = "还款中";
					}else if(status == 7){
						this.btnText = "部分还款";
					}else if(status == 8){
						this.btnText = "还款成功";
					}else if(status == 9){
						this.btnText = "申请还款中";
					}else{
					this.btnText = "已撤回";
				 }
			},
			loader() {
				var that = this;   
				var k, i = 0,
			    counter = function () {
			        if (i <= that.progressLineNum) {   
			        	that.progressNum = i.toString();
			          i++;
			        } else {
			          window.clearInterval(k);
			        }
			    };
	      	    var interval = 1000/100;
	            k = window.setInterval(counter, interval); 
			}
			
		},
		components:{
			wxDetail,
			zsopenTip,
			wxAuthorize,
			wxCode,
			timeDown,
			wxCalculator
		},
		mounted() {
			var that = this;
			this.fullHeight = $("#fullHeight").height();
			
		},
		created(){ 
			this.uuid = this.$route.query.uuid;
			this.getData()
			
		}
	}
</script>
<style lang="scss" scoped>
	#wxDetailPoint{
		font-family: PingFangSC-Regular;
		#fullHeight{
		    // height: 14.8rem;
		}
		.synopsis{
			height: 4.4rem;
			background-image: linear-gradient(-180deg, #FF5E4C 0%, #FF4640 100%);
			color:#fff;
			position: relative;
			
			.det_lf{
				width: 4rem;
				font-family: DIN-Medium;
				padding-top: 0.533333rem;
				margin-left: 3.866667rem;
				position: relative;
				margin-bottom: 0.533333rem;
				.det_span1{
					font-size: 1.066667rem;
					color: #FFFFFF;
					position: relative;
				}
				.det_span2{
					font-size: 0.453333rem;
					color: #FFFFFF;
				}
				.det_span3{
					font-size: 0.346667rem;
					color: #FFFFFF;
				}
				.ic{
					position: absolute;
					background: #C84939;
					font-size: 0.266667rem;
					line-height:0.4rem;
					height:0.38rem;
					color: #FFFFFF;
					text-align:center;
					border-radius:0.026667rem;
				}
				.ico_1{
					width:1.4rem;
					top: 0.33rem;
				    right: -1.2rem;
				}
				.ico_2{
					right: -2.6rem !important;
				}
				.ico_3{
					width:1.193333rem;
					top: 0.33rem;
					right: -1.4rem;
				}
			}
			.det_bf{
				margin:0 0.266667rem;
				padding-top: 0.306667rem;
				position: relative;
				.fl{
					width:33%;
					text-align:center;
					.num{
						font-size:0.426667rem;
						line-height:0.533333rem;
						color: #fff;
						font-family:DIN-Light;
						margin-bottom: 0.053333rem;
					}
					.text{
						font-size:0.266667rem;
						line-height:0.373333rem;
						color:#FFDCDC;
					}
				}
			}
			.bdr-t:before{
				border: 1px solid #FFFFFF;
				opacity: 0.24;
				background: rgba(0,0,0,0);
			}
			.det_p{
				font-size: 0.32rem;
				color: #FFDCDC;
				width:2rem;
				text-align:center;
			}
			.det_p2{
				padding-left: .35rem;
			}
			
			.limit{
				position: absolute;
				top: 0.24rem;
				right: 50%;
				border-radius: 0.213333rem;
				width: 1.333333rem;
				height: 0.48rem;
				line-height: 0.48rem;
				background: #fff;
				font-size: 0.32rem;
				color: #ff5b4c;
				text-align: center;
			}
			.invest_type{
				height: 0.613333rem;
				width: 100%;
				margin-bottom: 0.133333rem;
				.type_tip{
					width: 1.013333rem;
					height: 0.613333rem;
					background: rgba(0,0,0,.2);
					text-align: center;
					font-size: 0.32rem;
					color: #FFFFFF;
					line-height: 0.613333rem;
					border-radius: 6px;
				}
			}
			.percent{
				padding-left: 1rem;
				min-width: 4.066667rem;
				.percentNum{
					color: #fff;
					font-size: 0.373333rem;
					font-family: DIN-Regular;
					.add_apr{
						em{
							position: relative;
							background: #ffffff;
							padding: 0 0.16rem;
							border-radius: .4rem;
							font-size: 0.32rem;
							color: #FF5B4C;
						    left: 1.5rem;
						}
					}
					span{
						font-size: 1.066667rem;
						line-height: 1.1rem;
					}
					
				}
				.text{
					font-size: 0.32rem;
					line-height: 0.44rem;
				}
			}
			.info{
				padding-left: 0.4rem;
				border-left: 0.03rem solid #ffdcdc;
				height: 1.066667rem;
				font-size:0.346667rem;
				color:#ffdcdc;
				margin-top: 0.64rem;
				.wraTime{
					padding-bottom: 0.133333rem;
					line-height: 0.423333rem;
					font-family: DIN-Regular;
					span{
						color: #fff;
						padding-left: 0.24rem;
						font-size: 0.453333rem;
					}
				}
			}
			.sold{
				text-align: right;
				font-size: 0.32rem;
				line-height: 0.44rem;
				padding: 0.693333rem 0 0.266667rem;
			}
			.line{
				margin-bottom: 0.413333rem;
				height: 0.05rem;
				width: 100%;
				background: #cd2525;
				position:relative;
				.point{
					width:0.266667rem;
					height:0.266667rem;
					position:absolute;
					top:-4px;
					background:url(https://aliyunsso.edspay.com/web/wx/point.png);
					background-size:100% 100%;
				}
				.whiteLine{
					background: #fff;
					height: 100%;
				}
			}
			.surplus{
				font-size: 0.346667rem;
				line-height: 0.533333rem;
				font-family: DIN-Regular;
				span{
					color: #fff;
					padding:  0.08rem;
				}
			}
		}
		.steps{
			height: 3.6rem;
			width: 100%;
			background: #ffffff;
			margin-bottom: 0.266667rem;
			.back_progress{
				width: 100%;
				padding: .84rem .4rem .1rem .5rem;
				.div_box,.line{
					float: left;
				}
				.div_box{
					width: 1.65rem;
					height: 1.5rem;
					text-align: center;
					img{
						width: 0.8rem;
						height: 0.8rem;
						margin-bottom: 0.213333rem
					}
					.p1{
						font-size: 0.32rem;
						color: #333333;
					}
					.p2{
						font-size: 0.293333rem;
						color: #808080;
						text-align:center;
					}
				}
				.line{
					width: 0.8rem;
					height: 3px;
					background: #ffe3e0;
					position: relative;
					top: 0.373333rem;
				}
			}
			.data_text{
				width: 100%;
				clear: both;
				font-size: 0;
				span{
					display: inline-block;
					font-size: 0.293333rem;
					text-align: center;
					color: #808080;
				}
				.span1{
					width: 1.6rem;
					margin-left: .5rem;
				}
				.span2{
					width: 1.6rem;
				    margin-left: .8rem;
				}
				.span3{
					width:2rem;
				    margin-left: 0.7rem;
				}
				.span4{
					width: 2.1rem;
				    margin-left: .4rem;
				}
			}
		}
		
		.lists{
			padding-left: 0.4rem;
			line-height: 1.48rem;
			margin-bottom: 0.266667rem;
			background: #fff;
			
			li{
				height: 1.48rem;
				position: relative;
				// border-bottom: 0.013333rem solid #c8c7cc;
			}
			li:last-child{
				border-bottom: 0;
			}
		}
		.rule li{
			.ruleTitle{
				font-size: 0.346667rem;
				color: #808080;
				width: 2.4rem;
			}
			span{
				font-size:0.293333rem;
				color: #808080;
			}
			img{
				display:inline-block;
				height:0.4rem;
				width:2.426667rem;
				position: relative;
				top:-0.04rem;
				margin-right: 0.133333rem;
			}
			.content{
				font-size: 0.346667rem;
				color: #333;
			}
			.el-dialog--small{
				width:90%;
			}
		}
		.borrFor{
			font-size: 0.373333rem;
		    color: #333;
		    li{
		    	clear: both;
	    	    background: #fff url(https://aliyunsso.edspay.com/web/wx/arrows/right.png) 8.8rem 0.55rem no-repeat;
	    	    background-size: 0.213333rem 0.4rem;
	    	    // border-bottom: 1px solid #e5e5e5;
	    	    line-height: 1.466667rem;
	    	    position: relative;
	    	    .leftImg{
					height:0.4rem;
					width:0.453333rem;
					margin: 0.506667rem 0.213333rem 0 0.373333rem;
				}
		    }
		}
		.btn{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 1.6rem;
			font-size: 0.426667rem;
			line-height: 1.173333rem;
			color: #fff;
			text-align: center;
			z-index: 20;
			background: #ffffff;
			padding-top: 0.266667rem;
			box-shadow: 0px -3px 15px #e5e5e5;
			.calculator{
				width: 1.866667rem;
				float: left;
				height: 100%;
				background: url(https://aliyunsso.edspay.com/web/wx/pointToPoint/calculate.png) top center no-repeat;
				background-size: 1.066667rem;
			}
		}
		.doBth{
			width: 7.733333rem;
			float: left;
			height: 1.066667rem;
			border-radius: 4px;
		}
		.touzi{
			width: 100%;
			height: 1.066667rem;
		}
		.btnLive{
			background: #ff5b4c;
		}
		.btnOver{
			background: #E5E5E5;
		}
		.btnCount{
			background: #E5E5E5;
		}
	}
	
</style>