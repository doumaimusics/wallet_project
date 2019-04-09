<template>
	<div id="wxDetail">
		<div id="laymbox" :class="{showLaym:laym}">
			<div class="laymshade"></div>
			<div class="laymmain">
				<h3>出借三重礼规则<img @click="laym = !laym" src="https://aliyunsso.edspay.com/web/wx/invest/close.jpg" alt=""></h3>
				<div class="content" v-html="documentNode"></div>
				<!-- <p>1.活动时间：2017年8月1日——2017年8月31日</p>
				<p>2.除新手标和半月盈外，每个标的均设有首投奖、标王奖、满标奖；<br>
					首投奖：首个单笔出借新上标的3000元以上用户，奖励10元现金红包；<br>
					标王奖：每个标的出借额最高的用户，奖励20元现金红包，若出现出借金额相同的情况，只有最先出借的用户会获得奖励。<br>
					满标奖：完成每个标的最后一笔出借的用户，奖励20元现金红包</p>
				<p>3、活动奖励会在标的满标后由系统自动发放至用户个人红包账户；现金红包可作提现或出借使用，有效期为1个月，过期无效。</p>
				<p>4、禁止通过一切违规手段进行奖励获取，一经发现将取消获奖资格，涉嫌违法行为的，平台将依法追究法律责任</p>
				<p>5、本活动最终解释权归E都市钱包所有<br>
					客服咨询电话：400-135-3388</p> -->
			</div>
		</div>

		<wx-header :logo="borrow.name"></wx-header>
		
		<mt-loadmore :bottom-method="loadBottom" :bottomPullText="bottomText" :bottomDropText="bottomText" :bottom-all-loaded="allLoaded" :bottomLoadingText="bottomText" ref="loadmore">

		<div class="synopsis clear">
			<div class="clear">
				<div class="percent fl">
					<div v-if="borrow.limit" class="limit">+{{borrow.limit}}%</div>
					<div class="percentNum"><span>{{borrow.apr | returnFloat(1)}}</span>%<em v-if="borrow.addApr">+{{borrow.addApr | returnFloat(1)}}%</em></div>
					<div class="text">预期年化收益率</div>
				</div>
				<div class="info fl">
					<div class="wraTime">项目期限<span>{{borrow.timeLimit}}{{borrow.timeType == '1' ? '天':'个月'}}</span></div>
					<div class="surplus">项目总额&nbsp;&nbsp;{{borrow.amount}}元</div>
				</div>
			</div>
			<div class="sold">已售{{borrow.progress}}%</div>
			<div class="line">
				<div class="point" :style="{left:borrow.progress-0.5+'%'}"></div>
				<div class="whiteLine" :style="{width:borrow.progress+'%'}"></div>
			</div>
			<div class="surplus">剩余金额<span>{{borrow.remainAmount | changeWan}}</span>元</div>
		</div>
		<ul class="rule lists">
			<li>
				<div class="ruleTitle fl">预计起息</div>
				<div class="content fl">{{borrow.aprStyle}}</div>
			</li>
			<li>
				<div class="ruleTitle fl">还款方式</div>
				<div class="content fl">{{borrow.style}}</div>
			</li>
			<li>
				<div class="ruleTitle fl">最低出借</div>
				<div class="content fl">{{borrow.minAmount}}元起</div>
			</li>
		</ul>
		<ul class="infoList lists">
			<router-link v-if="borrow.isShowBorrower" :to="{path:'/wxBorrower',query:{uuid: borrow.uuid}}" tag="li">
				<div class="ruleTitle fl">借款人信息</div>
			</router-link>
			<li @click="toList">
				<div class="ruleTitle fl">出借记录</div>
				<div v-if="borrow.tenderTimes" class="details fr">{{borrow.tenderTimes}}条</div>
				<div v-else class="details fr">暂无记录</div>
			</li>
			<li @click="laym = !laym">
				<div class="ruleTitle fl">出借三重礼</div>
			</li>
		</ul>
		<div class="detailsTip"><i></i>向上拖动查看更多信息</div>
		<div class="touzi"></div>
		</mt-loadmore>
		<div v-if="borrow.progress !=100 && borrow.timeToStart <= 0" @click="goInvestMoney" class="btnLive btn"><span v-if="(borrow.newbieOnly && !borrow.canTender)">仅新手出借</span><span v-else>立刻出借</span></div>
		<div v-else-if="borrow.progress ==100" class="btnOver btn">{{btnText}}</div>
		<div v-else-if="borrow.timeToStart>0" class="btnCount btn"><time-down @timeEnd="timeEnd" :lastTime="borrow"  :endTime='borrow.endTime' :shartTime='borrow.shartTime'></time-down></div>
		<detail-tip v-if="showThis.isShow" :showThis="showThis"></detail-tip>
		<binding-tip v-if="showBinding.isShow" :showBinding="showBinding"></binding-tip>
		<zsopen-tip v-if="showZsOpne.isShow" :showThis="showZsOpne" :borrow="borrow"></zsopen-tip>
		<wx-directional v-if="showDirec.isShow" :confirm="toDirec" :direcPwd="direcPwd" :showDirec="showDirec"></wx-directional>
		<wx-authorize v-if='showAuth.isShow' :showThis="showAuth" :btn="1" :text="authorizeText" :btnText="btnTexts" :confirmBtn="confirmBtn"></wx-authorize>
		<wx-code v-if="showMessage.getMessage" :logo="'授权'" :num="2" :showMessage="showMessage" :code="code" :confirm="checkCode" :phone="borrow.zsBindPhone" :again="confirmBtn"></wx-code>
	</div>
</template>
<script>

	import wxHeader from '../../wxHeader';
	import timeDown from '../../public/wx/timeDown';
	import detailTip from './invest/detailTip';
	import bindingTip from './invest/toBindingTip';
	import zsopenTip from './invest/zsOpenTip';
	import wxDirectional from './invest/wxDirectional';	//定向标弹框
	import wxAuthorize from '../member/invest/wxPublicDialog'; //授权弹框
	import wxCode from '../member/invest/popupMessage';
	import wxToast from '../../../common/wx/wxToast'; //引入toast提示
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
				showAuth:{ //自动授权
					isShow:false,
				},
				showBinding:{
					isShow:false,
				},
				showZsOpne:{isShow:false},//展示开通浙商
				showDirec:{isShow:false},// 展示定向标密码
				direcPwd:{msgCode:''},//定向标密码
				authorizeText: '为了方便您的出借，首次出借、购买债权或开启自动出借前需要先开启支付授权，点击“确定”进行短信验证',
				btnTexts: ['取消','确定'],
				showMessage: {
					getMessage: false,
				},
				code:{
					msgCode:'',		//短信验证码
				},
			}
		},
		methods:{
			toList(){
				if(this.borrow.tenderTimes>0){
					this.$router.push({path:'/wxInvestRecord',query:{uuid:this.uuid}})
				}
			},
			confirmBtn() { //发送手机验证码
				this.showAuth.isShow = false;
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
				console.log(this.code.msgCode);
				this.postData('/openAutoInvestCheck',(res,data)=>{
					if (data.resCode) {
						this.$router.push({path:'/wxInvestIn',query:{uuid:this.uuid}})
					} else {
						this.toast({text:data.resMsg});
					}
				},{flag:1,mobileCode:this.code.msgCode})
			},
			timeEnd(data){
				this.type = data;
			},
			loadTop(){
				
			},
			loadBottom(){
				var that = this;
				this.allLoaded = true;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					that.$router.push('/wxInvestDescribe')
					that.allLoaded = false;
					clearTimeout(timer)
				},200)
			},
			goInvestMoney(){	//去出借页
				if(this.borrow.newbieOnly && !this.borrow.canTender) return;
				if(this.borrow.bankType == 1){	//新浪判断是否开户绑卡
					console.log(this.borrow.realNameStatus)
					if(!this.borrow.realNameStatus){
						this.showThis.isShow = true;
					}else if(this.borrow.bindCardIdStatus == 0){
						this.showBinding.isShow = true;
					}else{
						if(this.borrow.directional){	//判断是否是定向标
							this.showDirec.isShow = true;
							return;
						}
						this.$router.push({path:'/wxInvestIn',query:{uuid:this.uuid}})
					}
				}else{//存管标验证
					if(this.borrow.bindCardIdStatus){
						if (this.borrow.autoTenderStatus == 1) {
							this.$router.push({path:'/wxInvestIn',query:{uuid:this.uuid}})
						} else if (this.borrow.autoTenderStatus == 0) {
							this.showAuth.isShow = true;
						}
						
					}else{
						this.showZsOpne.isShow = true;
					}
				}
			},
			getBtnText(){
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
			toDirec(){	//输入定向标密码

				//判断定向标密码是否正确请求
				this.$router.push({path:'/wxInvestIn',query:{uuid:this.uuid,direcPwd:this.direcPwd.msgCode}})
			}
			
		},
		components:{
			wxHeader:wxHeader,
			timeDown,
			detailTip,
			bindingTip,
			wxDirectional,
			zsopenTip,
			wxAuthorize,
			wxCode,
		},
		created(){
			var that = this;
			this.uuid = this.$route.query.uuid;
			console.log(this.$route.query.uuid);
			this.postData('/borrow/borrowDetail',(res,data) =>{
				that.allLoaded = false;
				if(res.body.resCode){
					if(data.resData.borrowDetail.loginStatus == 0){
						this.$router.replace({path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
					}
					that.borrow = res.body.resData.borrowDetail;
					this.getBtnText();
				}
			},{uuid:this.uuid,assetManageType:1})
			this.postData('/tender/rewardInfo',(res,data) => {
				if(data.resCode){
					this.documentNode = data.resData.ruleTxt;
				}
			},{},1)
			
		}
	}
</script>
<style lang="scss" scoped>
	p{

	}
	#wxDetail ul .el-dialog--small{
		width:90%;
		p{
			padding:0.213333rem 0.613333rem 0  0.466667rem;
			font-size:0.346667rem;
			color:#333333;
			line-height:0.533333rem;
		}
	}
	#wxDetail{
		background:#f5f5f5;
		.header{
			height: 1.173333rem;
			background: #ff5b4c;
			text-align: center;
			font-size: 0.4rem;
			line-height: 1.17333rem;
			color: #fff;
		}
		.synopsis{
			padding: 0.583333rem 0.4rem 0.36rem;
			background: #ff5b4c;
			color:#ffdcdc;
			margin-bottom: 0.266667rem;
			position: relative;
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
			.percent{
				padding-left: 1rem;
				min-width: 4.066667rem;
				.percentNum{
					color: #fff;
					font-size: 0.373333rem;
					font-family: DIN-Regular;
					span{
						font-size: 1.066667rem;
						line-height: 1.333333rem;
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
		.lists{
			padding-left: 0.4rem;
			line-height: 1.346667rem;
			margin-bottom: 0.266667rem;
			background: #fff;
			li{
				height: 1.346667rem;
				border-bottom: 0.013333rem solid #c8c7cc;
			}
			li:last-child{
				border-bottom: 0;
			}
		}
		.rule li{
			.ruleTitle{
				font-size: 0.32rem;
				color: #808080;
				padding-right: 0.8rem;
			}
			.content{
				font-size: 0.346667rem;
				color: #333;
			}
			.el-dialog--small{
				width:90%;
			}
		}
		.infoList{
			li{
				background: url(../../../assets/wx/rightArrows.png) 8.586667rem 0.48rem no-repeat;
				background-size: 0.213333rem 0.4rem ;
				.details{
					font-size: 0.32rem;
					color: #808080;
					padding-right: 1.266667rem;
				}
			}
			.ruleTitle{
				font-size: 0.346667rem;
				color: #333;
				padding-right: 0.8rem;
			}
		}
		.detailsTip{
			text-align: center;
			font-size: 0.346667rem;
			line-height:0.346667rem;
			height: 0.53333rem;
			padding-top: 0.1rem;
			color: #b5b5b5;
			i{
				background:url(https://aliyunsso.edspay.com/web/wx/invest/toDetails.png) no-repeat;
				display:inline-block;
				height:0.333333rem;
				width:0.32rem;
				background-size:100%;
				margin-right:0.16rem;
			}
		}
		.btn{
			position: fixed;
			bottom: 0;
			width: 100%;
			height: 1.173333rem;
			font-size: 0.426667rem;
			line-height: 1.173333rem;
			color: #fff;
			text-align: center;
		}
		.touzi{
			width: 100%;
			height: 1.173333rem;
		}
		.btnLive{
			background: #ff5b4c;
		}
		.btnOver{
			background: #d8d8d8;
		}
		.btnCount{
			background: #d8d8d8;
		}
	}
	.showLaym{
		display:block!important;
	}
	#laymbox{
		position: absolute;
	    left: 0;
	    top: 0;
	    width: 100%;
	    height:100%;
    	z-index: 19891014;
    	background-color: rgba(0, 0, 0, .5);
    	display:none;
    	.laymshade{
    		position: fixed;
    		left: 0;
    		top: 0;
    		width: 100%;
    		height: 100%;
    		
    		pointer-events: auto;
    	}
		.laymmain{
			width:8.28rem;
			height:12.453333rem;
			border-radius:0.213333rem;
			margin: 2.666667rem auto 0;
			background:#fff;
			.content{
				font-size:0.346667rem;
				color:#333333;
				line-height:0.54rem;
				padding:0.3rem 0.613333rem;
				padding-top:0.3rem;
				p{
					padding:0.213333rem 0.613333rem 0  0.466667rem;
					font-size:0.346667rem;
					color:#333333;
					line-height:0.533333rem;
				}
			}
			h3{
				height:1.186667rem;
				background:#f3f3f3;
				text-align:center;
				font-size:0.373333rem;
				line-height:1.186667rem;
				position:relative;
				border-top-right-radius: 0.213333rem;
				border-top-left-radius: 0.213333rem;
				img{
					position:absolute;
					top:0.413333rem;
					right:0.426667rem;
					height:0.48rem;
					width:0.48rem;
				}
			}	
		}
	}
</style>