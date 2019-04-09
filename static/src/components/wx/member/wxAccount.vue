<template>
	<div id="account">
		<div v-title>我的</div>
		<div class="accountTop">
			<div class="header">
				<img v-if="account.levelLittleUrl" :src="account.levelLittleUrl" alt="" class="vip-make">
				<img @click="statistics('/wxMyAccount/wxSafe', '左上角账户设置')" class="img1" :src="account.avatarUrl ? account.avatarUrl:'https://aliyunsso.edspay.com/web/wx/account/head.png'" alt="">
				<span @click="statistics('/wxMyAccount/wxMessage', '右上角通知按钮')"><img class="notice" src="https://aliyunsso.edspay.com/web/wx/account/newVersion/information1.png" alt="">
					<i v-if="account.unreadMessageCount>0 && account.unreadMessageCount<100" :class="{twoNum:10 <= account.unreadMessageCount && account.unreadMessageCount < 100}">{{account.unreadMessageCount}}</i>
					<i v-else-if="account.unreadMessageCount > 99" class="messegeMore">99+</i>
				</span>
			</div>

			<div class="top" v-if="flag">
				<div class="card" v-if="isLogin && hideMobilePhone">
					<!-- 卡片正面 -->
					<div class="Positive" :class="{active:cardFlog}">
						<!-- 已开通存管 -->
						<div class="openZS" v-if="account.bankOpenStatus == 3 || account.bankOpenStatus == 2">
							<img :src="eyeImg" alt="" class="eye"  @click="changeEye">
							<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/rotate.png" alt="" class="rotate" @click="cardFlog = !cardFlog">
							<div class="sumMoney" @click="goWxTotalAssets(1)">
								<div v-show="showMoney" class="money" id="box"></div>
								<div v-show="!showMoney" class="money">***</div>
								<h4>总资产(元)</h4>
							</div>
							<div class="earnings earnings2 fl" @click.stop="goWxTotalAssets(2)">
								<div v-show="showMoney" class="money" id="box2"></div>
								<div v-show="!showMoney" class="money">***</div>
								<h4>累计收益(元)</h4>
							</div>
							<div class="earnings earnings1 fl">
								<div v-show="showMoney" class="money" id="box1"></div>
								<div v-show="!showMoney" class="money">***</div>
								<h4>可用余额(元)</h4>
							</div>
						</div>
						<!-- 未开通存管 -->
						<div class="notOpenZS" v-else>
							<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/rotate.png" alt="" class="rotate" @click.stop="cardFlog = !cardFlog">
							<div class="logo"></div>
							<div class="toOpenZS">
								<div class="bank fl">您暂未开通银行存管账户</div>
								<div class="toBank fl" @click="statistics('/wxDepository','开通银行存管')">立即开户</div>
							</div>
						</div>
					</div>
					<!-- 卡片反面 -->
					<div class="negative" :class="{active:cardFlog}">
						<!-- 已开通存管 -->
						<div class="openZS1" v-if="account.bankOpenStatus == 3 || account.bankOpenStatus == 2">
							<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/rotate.png" alt="" class="rotate rotate2" @click.stop="cardFlog = !cardFlog">
							<div class="cardName">
								<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/ZSBank.png" alt="">
								<p>浙商银行</p>
							</div>
							<div class="cardRealName"><span>姓名</span>{{account.realName}}</div>
							
							<div class="number">
								<div class="fl cardTitle">存管账户</div>
								<div class="fl cardNumber">{{bankNumber(account.ecardNo)}}</div>
								<div class="fr copy" v-clipboard:copy="account.ecardNo" v-clipboard:success="onCopy"></div>
							</div>
							<div class="cardRealName clear"><span class="fl">开户支行</span><div class="fl branch_info">{{account.branch}}</div></div>
							<!-- <div class="tips">仅支持本人开户银行卡转账充值</div> -->
						</div>
						<!-- 未开通存管 -->
						<div class="notOpenZS1" v-else>
							<img :src="eyeImg" alt="" class="eye"  @click="changeEye">
							<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/rotate.png" alt="" class="rotate" @click="cardFlog = !cardFlog">
							<div class="sumMoney" @click="goWxTotalAssets(1)">
								<div v-show="showMoney" class="money">{{account.totalMoney ? account.totalMoney:0 | moneyFormat}}</div>
								<div v-show="!showMoney" class="money">***</div>
								<h4>总资产(元)</h4>
							</div>
							<div class="earnings earnings2 fl" @click="goWxTotalAssets(2)">
								<div v-show="showMoney" class="money">{{account.earnAmount ? account.earnAmount:0 | moneyFormat}}</div>
								<div v-show="!showMoney" class="money">***</div>
								<h4>累计收益(元)</h4>
							</div>
							<div class="earnings earnings1 fl">
								<div v-show="showMoney" class="money">0.00</div>
								<div v-show="!showMoney" class="money">***</div>
								<h4>可用余额(元)</h4>
							</div>
						</div>
					</div>
				</div>
				<div class="card notLog" v-else>
					<h3>注册即得1118元红包</h3>
					<p class="tips">您暂未登录无法查看账户</p>
					<router-link to="/wxLogin" class="btn" tag="div">登录/注册</router-link>
				</div>

				<div class="moneyBtn clear">
					<div @click="enchashment" class="withdraw btn">
						<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/get_money1.png" alt="">
						<div class="text">提现</div>
					</div>
					<div class="recharge btn" @click="reRechargeMoney('/wxDepository','/wxZsNewrecharge')">
						<img src="https://aliyunsso.edspay.com/web/wx/account/newVersion/charge_money1.png" alt="">
						<div class="text">充值</div>
					</div>
				</div>
			</div>
		</div>

		<!-- 新手任务模块需登录 -->
		<div class="new_hand_box" v-if="isLogin && (newTaskData.order != 0 || newTaskData.status != 0)">
			<div class="new_hand_top bdr-b" @click="goNewTaskList">
				新手任务
				<span>更多<i></i></span>
			</div>
			<div class="registe_task_cont" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/newTask/newTaskBg/new_hand_task'+newTaskData.order+'.png?v=1.1) no-repeat'}">
				<div class="task_btn" v-if="newTaskData.status == 2" @click="goNewTask">去完成</div>
				<div class="task_btn" v-else-if="newTaskData.status == 3" @click="goNewTaskList">领取</div>
			</div>
		</div>

		
		<ul class="function_list clear">
			<li v-if="index < 4" @click="statistics(item.goUrl,item.title)" v-for="(item,index) in accountList" :class="{'bdr-t': index == 3 || index == 2,'bdr-b': index == 3 || index == 2}">
				<div class="popmeng">
					<img :src="item.img" alt="">
					<span>{{item.title}}</span>
				</div>
				<div class="tips" v-if="(!showMoney && item.title=='出借记录') || (!showMoney && item.title=='回款计划')">
					<p v-if="item.title=='出借记录'">在投本金<span>***</span></p>
					<p v-if="item.title=='回款计划'">待回款利息<span>***</span></p>
				</div>
				<div class="tips" v-html="item.tips" v-else></div>
			</li>

			<!-- 余额智投要求登录都要进入页面，和其他的有区别所以单独写，到时候要是统一了在加在上面li数组里 -->
			<li @click="remainingToLogin(remainingZT.goUrl)" v-if="account.showAutoTender == 1">
				<div class="popmeng">
					<img :src="remainingZT.img">
					<span>{{remainingZT.title}}</span>
				</div>
				<div class="tips" v-if="account.aytoTenderStatus == 0">未开启服务</div>
				<div class="tips" v-else>已开启服务</div>
				<div class="hint_new"></div>
			</li>
             <!-- 我要借款不需要登录直接进入活动页面 -->
			<li @click="statistics(myBorrowMoney.goUrl,myBorrowMoney.title,1)" v-if="account.showButton == 1">
				<div class="popmeng">
					<img :src="myBorrowMoney.img">
					<span>{{myBorrowMoney.title}}</span>
				</div>
				<div class="tips">最高可贷5万</div>
			</li>
		</ul>
		<ul class="function_list clear">
			<li v-if="index > 3" @click="statistics(item.goUrl,item.title, 1)" v-for="(item,index) in accountList"  :class="{'bdr-t': index == 6 || index == 7}">
				<div class="popmeng">
					<img :src="item.img" alt="">
					<span>{{item.title}}</span>
				</div>
				<div class="tips" v-html="item.tips"></div>
			</li>
		</ul>
		<div class="falFooter"></div>
		<wx-footer></wx-footer>
		<!-- 获取短信验证码框 -->
		<pop-message v-if="showMessage.getMessage" :phone="account.zsBankPhone" :showMessage="showMessage"
		 :code="code" :confirm="closeMessage" :again="changePhone" :logo="'获取验证码'"></pop-message>
		 <account-dialog v-if="showRed.isShow" :showThis="showRed"></account-dialog>
	</div>
</template>

<script>
	
	import wxFooter from '../../wxFooter';
	import getUrl from '../../../common/router/getUrl' //引入跳转js
	import { MessageBox } from 'mint-ui';		//弹框
	import wxToapp from '../../../common/wx/wxToapp';
	import popMessage from './invest/popupMessage';
	import verify from '../../../common/wx/verification';
	import { Indicator } from 'mint-ui';
	import publicDialog from '../../wx/member/invest/wxPublicDialog.vue'; //弹框组件
	import accountDialog from '../../wx/member/invest/wxAccountDialog.vue'; //弹框组件
	export default {
		mixins: [getUrl,wxToapp,verify],
		data(){
			return {
				flag: false,
				cardFlog:false,
        		balance: sessionStorage.getItem("balance") == "true" ? true : false,       //  余额转移开关
				showThis: {      // 全部转移确认框
					isShow: false,
				},
				eyeImg:'https://aliyunsso.edspay.com/web/wx/account/openEyes.png',		//眼睛图片
				showMoney:true,		//显示金额
				hideMobilePhone:true,//保存登录信息
				showSinaCtr:{
					generalSw:0    
				},//普通账户展示 0 不展示 1展示
				account :{
					sinaTotalMoney:0,
					sinaUseMoney:0,//新浪可用余额
					yesterdayEarnAmount:0,
					totalMoney:0,
					czbTotalMoney:0,
					czbUseMoney:0,//存钱罐可用余额
					earnAmount:0,
					waitInterest:0,//待会款利息
					fluxUseMoney:0,//E起赚总钱数
				},
				accountList:[
					{
						title: '出借记录',
						img: 'https://aliyunsso.edspay.com/web/wxUpdate/accessList1.png',
						goUrl: '/wxMyAccount/wxInvestListIn/wxInvestManage',
						tips: ''
					},
					{
						title: '回款计划',
						img: 'https://aliyunsso.edspay.com/web/wxUpdate/accessList2.png',
						goUrl: '/wxMyAccount/wxRepayPlan',
						tips: ''
					},
					{
						title: '资金明细',
						img: 'https://aliyunsso.edspay.com/web/wxUpdate/accessList3.png',
						goUrl: '/wxMyAccount/wxLog',
						tips: '<p>账户资金动向</p>'
					},
					{
						title:'我的红包',
						img:'https://aliyunsso.edspay.com/web/wxUpdate/accessList4.png',
						goUrl:'/wxMyAccount/wxRedPacket',
						tips:''
					},
					// {
					// 	title:'余额智投',
					// 	img:'https://aliyunsso.edspay.com/web/wx/remainingInvest/money_icon.png',
					// 	goUrl:'/wxMyAccount/wxRemainingInvest',
					// 	tips:''
					// },
					{
						title:'vip会员',
						img:'https://aliyunsso.edspay.com/web/wxUpdate/accessList5.png',
						goUrl:'/wxMyAccount/vipUser',
						tips:'<p>出海寻宝领大礼</p>'
					},
					{
						title:'邀请有礼',
						img:'https://aliyunsso.edspay.com/web/wxUpdate/accessList6.png',
						goUrl:'/wxInvitationIndex',
						tips:'<p>可赚870元现金</p>'
					},
					{
						title:'活动专区',
						img:'https://aliyunsso.edspay.com/web/wxUpdate/accessList7.png',
						goUrl:'/wxFind',
						tips:'<p>精彩活动及公告</p>'
					},
					{
						title:'帮助中心',
						img:'https://aliyunsso.edspay.com/web/wxUpdate/accessList8.png',
						goUrl:'/wxMyAccount/wxHelpCenters',
						tips:'<p>在线客服及反馈</p>'
					},
				],
				remainingZT: {     // 余额智投数据
					title:'余额智投',
					img:'https://aliyunsso.edspay.com/web/wx/remainingInvest/money_icon.png',
					goUrl:'/wxMyAccount/wxRemainingInvest',
				},
				myBorrowMoney:{
					title:'我要借款',
					img:'https://aliyunsso.edspay.com/web/wxUpdate/my_jk_icon.png',
					goUrl:'/wxNeedBorrow'
				},
				showMessage:{getMessage:false},// 显示弹出关闭债券弹窗
				code:{msgCode:''}, // 关闭债权验证码
				showSina: false, // 是否显示普通账户
				options : {
					useEasing: true, 
					useGrouping: true, 
					separator: ',', 
					decimal: '.', 
				},
				showRed:{
					isShow:false,
					discounts:0,//红包加息券总和
				},
				toDayDialog:0,//今天是否弹框
				newTaskData:{},   // 新手任务
			}
		},
		computed:{
			isLogin:{
				get(){
					if(this.getCookie('userToken')) return true;
					else return false;
				},
				set(){}
			}
		},
		methods: {

			CountUp(id, num){   // 数字滚动
				this.$nextTick(() => {
					let demo = new CountUp(id, 0, num, 2, 1.5, this.options) // id qish
					if (!demo.error) {
						demo.start();
					} else {
						console.error(demo.error);
					}
				})
			},

			bankNumber(val){
				var ncard='';
				for(var n=0;n<val.length;n=n+4){
					ncard += val.substring(n,n+4)+" ";
				}
				return ncard
			},

			onCopy(){
				_czc.push(["_trackEvent", "我的页面", '复制存管账户号']);
				this.toast({ text: '复制成功' });
			},
			
			// 跳转做登录验证和友盟统计 title：友盟的按钮名字
            statistics(url, title, n){     
				if(!this.isLogin && n != 1){
					this.toLogin()
                    return
				}
				_czc.push(["_trackEvent", "我的页面", title]);
				this.$router.push(url)
			},
			
			remainingToLogin(url, title, n){     // 余额智投跳转
				if(!this.isLogin && n != 1){
					this.$router.push({
						path:'/wxLogin',
						query:{thisUrl:url}
					})
                    return
				}
				_czc.push(["_trackEvent", "我的页面", title]);
				this.$router.push(url)
			},
			
			// 获取当天时间
			getPresentTime(){
				var now = new Date().getTime();
				var val = Number(now);
				var d = new Date(val);
				var year=d.getFullYear();
				var month=((d.getMonth()+1)<10?'0':'')+(d.getMonth()+1);
				var day=(d.getDate()<10?'0':'')+d.getDate();
				var hour=d.getHours();
				return year+"-"+month+"-"+day+"-"+this.getCookie('userId');
			},

			enchashment(){    // 提现
				if(!this.isLogin){
                    this.toLogin();
                    return;
				};
				_czc.push(["_trackEvent", "我的页面", '提现']);
				if(this.account.czbOpenStatus == 1){   // 已经开通存管  czbOpenStatus 0未已经开通存管，1已经开通存管
					this.toDayDialog = this.getCookie('toDayDialog');
					console.log(this.toDayDialog +'-'+ this.getPresentTime())
					if(this.showRed.discounts>0 && this.toDayDialog != this.getPresentTime()){
						this.showRed.isShow = true;
						this.setCookie('toDayDialog',this.getPresentTime());
					}else{
						this.$router.push('/wxZsDrawings');
					};     // wxZsDrawings  提现   wxDepository 开通存管
				} else {    // 未开通存管
					MessageBox.confirm('您需要先开通银行存管的账户，才可以充值、提现、出借。', { 
						closeOnClickModal: false,
						confirmButtonText: '去开通'
					}).then(action => { 
						this.$router.push('/wxDepository');	//开通存管路由
					}, action => { 
					
					})
				}
			},

			reRechargeMoney(openCg,rechargeUrl){   // 充值
				if(!this.isLogin){
                    this.toLogin()
                    return
				}
				_czc.push(["_trackEvent", "我的页面", '充值']);
				if(this.account.bankOpenStatus != 2 && this.account.bankOpenStatus != 3){
					MessageBox.confirm('您需要先开通银行存管的账户，才可以充值、提现、出借。', { 
						closeOnClickModal: false,
						confirmButtonText: '去开通'
					}).then(action => { 
						this.$router.push(openCg);	//绑卡路由
					}, action => { 
					
					})
				}else{
					this.$router.push({path:rechargeUrl,query:{dataUrl:'/account/bank/list'}});
				}
			},

			changeEye(){	//小眼睛
				this.showMoney = !this.showMoney;
				if(this.eyeImg == 'https://aliyunsso.edspay.com/web/wx/account/openEyes.png'){
					this.eyeImg = 'https://aliyunsso.edspay.com/web/wx/account/closeEyes.png'
				}else{
					this.eyeImg = 'https://aliyunsso.edspay.com/web/wx/account/openEyes.png'
				}
			},

			getAccount(){		//获取信息
				this.notLogPost('/account/basic',(data) =>{
					if(data.resCode){
						if (data.resData.basicModel.notifyStatus && this.isLogin) {
							MessageBox.alert('为了避免您在债权转让的时候收到短信，造成困扰，请放心关闭债转短信并验证短信验证码，具体项目进度我们另有短信通知', '温馨提示', {
								confirmButtonText: '确定'
							}).then(action => {
								this.changePhone()
							});
						}
						this.account = data.resData.basicModel;
						this.flag = true;
						if(data.resData.basicModel.loginStatus){
							this.hideMobilePhone = true;
							if (data.resData.basicModel.sinaBankCardCount) {
								this.showSina = true;
							} else {
								this.showSina = false;
							}
						}else{
							this.showSina = false;
							this.hideMobilePhone = false;
						}
						/*if(data.resData.basicModel.hideMobilePhone) this.hideMobilePhone = true;
						else this.hideMobilePhone = false;*/
						this.setCookie('zsOpenStatus',data.resData.basicModel.czbOpenStatus)
						this.setCookie('bkOpenStatus',data.resData.basicModel.bankOpenStatus)   // 判断是否开通存管  0表示都未开通，1表示开通新浪，2表示开通浙商，3表示都开通
						this.setCookie('totalMoney',data.resData.basicModel.totalMoney);  // 总资产  新浪+存管
						this.setCookie('earnAmount',data.resData.basicModel.earnAmount);  // 累计收益
						this.setCookie('sinaTotalMoney',data.resData.basicModel.sinaTotalMoney);  // 新浪资金

						// 入口列表的动态赋值
						this.accountList[0].tips = '<p>在投本金<span>' + this.moneyFormat(this.account.investingAmount) + '</span></p>'

						this.accountList[1].tips = '<p>待回款利息<span>' + this.moneyFormat(this.account.waitInterest) + '</span></p>'

						this.accountList[3].tips = '<p><em>' + this.account.redNumber + '张</em>未使用</p>'
						this.accountList[3].goUrl = '/wxMyAccount/wxRedPacket?bankOpenStatus='+ this.account.bankOpenStatus + '&sinaBankCardCount=' + this.account.sinaBankCardCount;
						if(data.resData.basicModel.loginStatus){
							this.CountUp('box', this.account.totalMoney)
							this.CountUp('box1', this.account.czbUseMoney)
							this.CountUp('box2', this.account.earnAmount)
						};
						this.showRed.discounts = this.account.redNumber;
					}
				},{},1)
			},

			moneyFormat(money){
				money ? money : '0';
				if(money == 0){
					return "0.00";
				}else{
					var n = 2;
					money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
					var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
					var t = "";
					for (var i = 0; i < l.length; i++) {
					t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
					}
					return  t.split("").reverse().join("") + "." + r;
				}
			},

			//新浪是否展示
			getSinaShow(){
				this.notLogPost('/global/configSw',(data) =>{
					console.log(data)
					if(!this.account.hideMobilePhone  && this.getCookie('userToken')){
						Indicator.open({ spinnerType: 'fading-circle' });
					}
					if(data.resCode){
						this.showSinaCtr = data.resData;
						this.setCookie('generalSw',data.resData.generalSw);
						console.log(data.resData.generalSw+"关闭新浪");
						this.setCookie('showAutoTender',data.resData.showAutoTender);
					}
				},{},1)
			},

			closeMessage () {	// 关闭债权
				this.getAppData('/closeNotify',(data) => {
                    if(data.resCode){
						this.showMessage.getMessage = false;
                        this.toast({ text:data.resMsg });
                    }else{
                        this.showThis.isShow = true;
                    }
                },{mobileCode:this.code.msgCode},1)
			},

			changePhone(){ 	// 获取关闭债券验证码
                this.getAppData('/getCloseMsgCode',(data) =>{
                    if(data.resCode){
                        this.showMessage.getMessage = true;
                    }else{
						this.toast({ text:data.resMsg });
                    }
                },{},1)
			},

			//3.4.0跳转资产总揽页面
			goWxTotalAssets(n){
				n == 1 ? _czc.push(["_trackEvent", "我的页面", '总资产']) : _czc.push(["_trackEvent", "我的页面", '累计收益']);
				this.$router.push({path:'/wxMyAccount/wxTotalAssets',query:{num:n}});
			},

			// 去新手任务
			goNewTaskList(){
               this.$router.push({
					path:'/newTask',
					query:{thisUrl:this.$route.fullPath}
                })
			},
			
			             //新手任务活动接口
			newHandTask(){ 
				let that = this;
                that.getNotlogData('/activity/newHandTask.html', (data) => {
					if(data.resCode){
						that.newHandIndex();
					}
				},{})
			},

			// 新手任务接口需要登录
			newHandIndex(){
				this.notLogPost('/activity/newHandIndex.html', (data) => {
					if(data.resCode){
						this.newTaskData = data.resData;
					}
			    },{token:this.token})
			},
			
			// 新手任务跳转任务
			goNewTask(){
				if(this.newTaskData.order == 1 ){
                   //开通存管
					this.$router.push({path: '/wxDepository', query: {thisUrl:this.$route.fullPath}});
				} else {
					//去投资列表页
					this.$router.push({path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
				}
			},
		},
		mounted() {
			var that = this;
			// 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1274385512&web_id=1274385512'
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		watch: {
			'$route'() {
				if (window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		},
		components:{
			wxFooter,
			popMessage,
			publicDialog,
			accountDialog
		},
		created(){
			this.getAccount();
			this.getSinaShow();
			if(this.isLogin){
				this.newHandTask();
			}
			this.toDayDialog = this.getCookie('toDayDialog');
		}
	}
</script>

<style lang="scss" scoped>

.bdr-r:after, .bdr-b:after {
	z-index: 0 !important;
}
.pl12 {
	padding-left:0.12rem
}
.toLogin{background:rgba(0,0,0,0)!important;height:91%!important;z-index:888!important;}
.layer-vip,.help-Center{
	height:2.346667rem;
	width:3.333333rem;
	position: absolute;
	z-index:900;
}
.layer-vip{
    top:14.6rem;
	left:3.413333rem;
}
.help-Center{
   top:14.6rem;
	left:6.7rem;
}
#layer{
	width:100%;
	height:100%;
	background:rgba(0,0,0,.5);
	position:fixed;
	z-index:888;
	top:0;
	.content{
		position:absolute;
		bottom: 1.33rem;
		width:160%;
		margin-left:-30%;
		height:5.5rem;
		background:#fff;
		border-top-left-radius:70%;
		border-top-right-radius:70%;
		text-align:center;
		.title{
			font-size:0.4rem;
			line-height:0.56rem;
			padding:0.533333rem 0 0.8rem 0;
		}
		.sumCommon{
			padding: 0 30%;
			.account{
				float: left;
				width:50%;
				img{
					height:1.333333rem;
					width:1.333333rem;
					margin-bottom:0.133333rem;
				}
			}
			.account.active{
				img{
					width: 2rem;
    				height: auto;
				}
			}
		}
	}
	.close{
		display:block;
		margin:0.266667rem auto 0;
		height:0.666667rem;
		width:0.666667rem;
	}
}
#account{
	font-size:0.346667rem;
	line-height:0.493333rem;
	background: #f8f8f8;
	padding-bottom: 1.3rem;
	.alignL{
		text-align: left;
	}
	.DLK{
		display: inline-block;
	}
	.accountTop{
		height: 7.653333rem;
		.header{
			background: #fff;
			height:1.173333rem;
			padding: 0 0.533333rem;
			position: relative;
			.vip-make{
				position: absolute;
                height:0.32rem;
                width:0.533333rem;
				left: 1.1rem;
                top:.766667rem;
			}
			p{
				position:absolute;
				top:0.5rem;
				left:1.7rem;
				font-size:0.373333rem;
				color:#fff;
			}
			.img1{
				float: left;
				height:.933333rem;
				width:.933333rem;
				margin-top:.166667rem;
				border-radius:50%;
			}
			.img2{
				width: 0.106667rem;
				height: 0.586667rem;
				float: left;
				margin-right: 0.253333rem;
				margin-top: .45rem;
			}
			.notice{
				width: 0.666667rem;
				height: 0.666667rem;
				margin-top: .3em;
			}
			span{
				font-size:0.373333rem;
				line-height:1.1rem;
				color:#fff;
				float:right;
				position: relative;
				i{
					height:0.373333rem;
					width:0.373333rem;
					text-align: center;
					border-radius:0.186667rem;
					position:absolute;
					top:0.266667rem;
				    right: -0.35rem;
					background:#FF5B4C;
					font-family: PingFangSC-Medium;
					font-size: 0.293333rem;
					color: #FFFFFF;
					line-height: 0.373333rem;
				}
				i.twoNum{
					width: 0.573333rem;
					right:-0.5rem;
				}
				i.messegeMore{
					width: 0.7rem;
					right:-0.5rem;
					height: 0.4rem;
					line-height: 0.4rem;
				}

			}
		}

		.top{
			background: #fff;
			height:6.186667rem;
			color:#fff;
			text-align:center;
			position:relative;
			padding: .2rem .373333rem 0;
			margin-bottom: .266667rem;
			.card{
				width: 9.253333rem;
				height: 4.32rem;
				position: relative;
				perspective: 20rem;
				transform-style: preserve-3d;
				// 卡片正面
				.Positive{
					backface-visibility: hidden;
					transform-style: preserve-3d;
					position: absolute;
					width: 100%;
					height: 100%;
					background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/card.png) no-repeat;
					background-size: 100% 100%;
					transition: all 0.5s ease-out;
					transform: rotateY(0deg);
					z-index: 1;
					padding: .506667rem .693333rem 0;
					.openZS{
						overflow: hidden;
					}
					.logo{
						margin: .173333rem auto .56rem;
						width: 5.466667rem;
						height: 1.333333rem;
						background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/bankLogos.png) no-repeat;
						background-size: 100% 100%;
					}
					.toOpenZS{
						height: .533333rem;
						line-height: .533333rem;
						color: #fff;
						margin: 0 auto;
						display: inline-block;
						.bank{
							font-size: .346667rem;
						}
						.toBank{
							font-size: .32rem;
							width: 1.92rem;
							height: .533333rem;
							border-radius:.266667rem;
							border:.013333rem solid #fff;
							margin-left: .266667rem;
						}
					}
				}
				// 卡片反面
				.negative{
					backface-visibility: hidden;
    				transform-style: preserve-3d;
					position: relative;
					width: 100%;
					height: 100%;
					background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/card.png) no-repeat;
					background-size: 100% 100%;
					transition: all 0.5s ease-out;
					transform: rotateY(-180deg);
					z-index: 0;
					padding: .5rem .593333rem 0 .693333rem;
					text-align: left;
					.openZS1{
						.cardName{
							height: 0.666667rem;
							margin-bottom: 0.533333rem;
							img{
								width: .666667rem;
								height: .666667rem;
								float: left;
								margin-right: .266666rem;
							}
							p{
								font-size: .32rem;
								height: 0.666667rem;
								line-height: 0.666667rem;
							}
						}
						.cardRealName{
							font-family: PingFangSC-Regular;
							font-size: 0.293333rem;
							color: #FFFFFF;
							span{
								margin-right: 0.133333rem;
							}
							.branch_info{
								width: 5rem;
							}
						}
						.number{
							height: 0.786667rem;
							line-height: 0.786667rem;
							position: relative;
							.cardTitle{
								font-size: 0.293333rem;
								color: #FFFFFF;
								margin-right: 0.133333rem;
							}
							.cardNumber{
								font-family: DIN-Medium;
								font-size: .533333rem;
							}
							.copy{
								width: 1.653333rem;
								height: 0.986667rem;
								background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/versionSevenPointThree/copyBtn.png) no-repeat;
								background-size: 100% 100%;
								position: absolute;
								right: -0.15rem;
								top: -0.1rem;
							}
						}
						.tips{
							font-size: .266667rem;
							line-height: .373333rem;
						}
					}
				}
				.Positive.active{
					transform: rotateY(180deg);
					z-index: 0;
				}
				.negative.active{
					transform: rotateY(0deg);
					z-index: 1;
				}
			}
			.card.notLog{
				width: 9.253333rem;
				height: 4.32rem;
				background: url(https://aliyunsso.edspay.com/web/wx/account/newVersion/card.png) no-repeat;
				background-size: 100% 100%;
				padding:.64rem 0 0 0;
				h3{
					font-family: PingFangSC-Medium;
					font-size:.533333rem;
					line-height: 1.013333rem;
				}
				p.tips{
					font-size: .32rem;
					line-height: .44rem;
					margin-bottom: .32rem;
				}
				.btn{
					width:3.066667rem;
					height:1rem;
					border-radius:.5rem;
					border:.013333rem solid #fff;
					font-size:.426667rem;
					line-height:1rem;
					text-align:center;
					margin: 0 auto;
				}
			}
			img.eye{
				position:absolute;
				height:0.506667rem;
				width:0.506667rem;
				margin: .77rem .746667rem 0 0;
				top:0;
				right:0;
			}
			img.rotate{
				position:absolute;
				height:.506667rem;
				width:0.506667rem;
				margin: 0 .693333rem .7rem 0;
				bottom:0.1rem;
				right:0;
			}
			img.rotate2{
				margin: 0 .693333rem .55rem 0;
			}
			h4{
				line-height: .4rem;
				font-family: PingFangSC-Regular;
				font-size: .293333rem;
			}
			.sumMoney{
				text-align: left;
				float: left;
				min-width: 70%;
				.money{
					font-size:.773333rem;
					line-height:.933333rem;
					font-family: DIN-Medium;
					margin-bottom: .133333rem;
				}
				h4{
					background: url('https://aliyunsso.edspay.com/web/wx/account/arrows_right.png?v-1.0') no-repeat 1.45rem center;
					background-size: .346667rem .346667rem;
					width: 2rem;
				}
			}
			.earnings1{
				width: auto;
			}
			.earnings{
				margin-top: .76rem;
				text-align: left;
				.money{
					line-height:.48rem;
					font-family: DIN-Medium;
					font-size: .4rem;
					margin-bottom: .133333rem;
				}
			}
			.earnings2{
				h4{
					width: 3.8rem;
					background: url('https://aliyunsso.edspay.com/web/wx/account/arrows_right.png?v-1.0') no-repeat 1.77rem center;
					background-size: .346667rem .346667rem;
				}
			}
			.moneyBtn{
				height:1.76rem;
				width: 9.36rem;
				margin: 0 auto;
				margin-top: -0.08rem;
				left: 0.32rem;
				color: #333;
				.btn{
					float: left;
					width:49.6%;
					text-align:center;
					font-size:.4rem;
					line-height: 1.76rem;
					margin: 0;
					height: 100%;
					border: 0;
					border-radius: 0;
					img{
						position: relative;
						display:inline-block;
						height:.8rem;
						width:.8rem;
						margin: 0;
						margin-right: .2rem;
					}
					.text{
						display:inline-block;
						color: #333;
					}
				}
			}
		}

	}
    // 新手任务模块
	.new_hand_box{
		width: 100%;
		height: 3.28rem;
		background: #fff;
		padding: 0 .4rem;
		margin-bottom: .266667rem;
		.new_hand_top{
			width: 100%;
			height: 1.36rem;
			position: relative;
			font-family: PingFangSC-Regular;
			font-size: .4rem;
			color: #333333;
			line-height: 1.36rem;
			span{
				float: right;
				font-size: .346667rem;
				color: #808080;
				i{
					display: inline-block;
					width: .32rem;
					height: .32rem;
					background: url(https://aliyunsso.edspay.com/web/wxUpdate/next.png) no-repeat;
					background-size: contain;
					margin-left: .113333rem;
				}
			}
		}
		.registe_task_cont{
			width: 100%;
			height: 1.92rem;
			position: relative;
			background-size: cover!important;
			.task_btn{
				width: 1.6rem;
				height: .666667rem;
				border-radius: 1.333333rem;
				font-size: .346667rem;
				color: #FFFFFF;
				line-height: .666667rem;
				text-align: center;
				position: absolute;
				top: 0;
				bottom: 0;
				right: .1rem;
				margin: auto;
			}
		}
	}

	.moneyList{
		width: 100%;
		height: 1.88rem;
		background: #fff;
		padding: .4rem .533333rem;
		margin-bottom: .266667rem;
		.wrapper-left{
			width: 70%;
			.name{
				color: #333;
				font-size: .373333rem;
				line-height: .533333rem;
				margin-bottom: .106667rem;
			}
			.assetMoney{
				font-size: .32rem;
				color: #808080;
				span{
					font-family: DIN-Medium;
					font-size: .346667rem;
					color: #333333;
				}
			}
		}
		.wrapper-right{
			width: 30%;
			padding-top: .173333rem;
			.asset_btn{
				float: right;
				width: 1.933333rem;
				height: .733333rem;
				border: 1px solid #6CA6FF;
				border-radius: .066667rem;
				font-size: .346667rem;
				color: #508cee;
				line-height: .733333rem;
				text-align: center;
			}
		}
	}
	
	.Eqz{
		height:1.066667rem;
		font-size:0.346667rem;
		line-height:1.066667rem;
		color:#ff5b4c;
		padding-left:0.4rem;
		background:#fff1d7 url(https://aliyunsso.edspay.com/web/wx/account/EqzRight.png) 9.333333rem 0.346667rem  no-repeat;
		background-size: 0.36rem 0.4rem;
	}
	.main_wrapper{
		background: #ffffff;
		.recordBtn{
			background:#fff;
			padding-top: 2.0rem;
			.middle_line{
				float: left;
				width: 1px;
				height: 1.4rem;
				position: relative;
				margin-top: 0.6rem;
			}
			li{
				padding-top:0.533333rem;
				width:49.6%;
				height:auto;
				float: left;
				padding-left: 0.533333rem;
				.title{
					margin-bottom: 0.07rem;
					img{
						width: 0.666667rem;
						height: 0.666667rem;
						display: inline-block;
						margin-right: 0.253333rem;
					}
					span{
						font-family: PingFangSC-Regular;
						font-size: 0.4rem;
						color: #333333;
						display: inline-block;
						line-height: 0.666667rem;
					}
				}
				.record_money{
					padding-left: 0.89rem;
					div{
						float: left;
					}
					.small_title{
						font-family: PingFangSC-Light;
						font-size: .266667rem;
						color: #999999;
					}
					.all_money{
						font-family: DIN-Regular;
						font-size: 0.32rem;
						color: #151515;
					}
				}
			}
		}
	}
	
	.function_list{
		position: relative;
		margin-bottom: .266667rem;
		background: #fff;
		padding: 0 .533333rem;
		a{
			display: inline-block;
		}
		.popMeg{
			position: absolute;
			width: 0.613333rem;
			height: 0.48rem;
			background: url(https://aliyunsso.edspay.com/web/wx/v3.3.5/hongbao.png) no-repeat;
			background-size: 100%;
			right: 0.9rem;
			top: .2rem;
			font-size: 0.266667rem;
			color: #FFFFFF;
			text-align: center;
			line-height: 0.4rem;
		}
		li{
			position: relative;
			background: #fff;
			width: 50%;
			float: left;
			height:2.133333rem;
			text-align: center;
			padding: .533333rem 0;
			text-align: left;
			.popmeng{
				height: .533333rem;
				width: 100%;
				margin-bottom: .133333rem;
				img{
					width: .533333rem;
					height: .533333rem;
					vertical-align: bottom;
					margin-right: .133333rem;
				}
				span{
					font-size: .373333rem;
					color: #333;
					line-height: .533333rem;
				}
			}
			.tips{
				padding-left: .78rem;
				font-size: .293333rem;
				color: #808080;
				em{
					color: #FF5B4C;
				}
			}
		}
		li:nth-child(2n){
			padding-left: .5rem;
		}
		li:nth-child(3).bdr-b:after{
           bottom: .006667rem;
		//    background: red;
		}
	}
	.bottomPhone{
		height:1.8rem;
		font-size:0.32rem;
		position: relative;
    	z-index: 900;
		h4{
			padding-top:0.6rem;
			text-align:center;
			color:#808080;
			span{color:#508cee;}
		}
	}
	.actives{
		transition: all 1s ease;
    	transform: rotateY(180deg);
	}
}
</style>
<style>
.mint-msgbox-message{
	line-height: .64rem;
}
.mint-msgbox-content {
    padding: .666667rem;
	min-height: 2.133333rem;
	font-size: .373333rem
}
#account .function_list li .tips em{
	color: #FF5B4C;
}
#account .function_list li .tips span{
	font-family: DIN-Medium;
	font-size: .32rem;
	color: #333333;
	line-height: .48rem;
    display: inline-block;
}
#account .function_list li .hint_new{
     width: .8rem;
	 height: .8rem;
	 background: url(https://aliyunsso.edspay.com/web/wx/remainingInvest/new.png?v=1.0) no-repeat;
	 background-size: cover;
	 position: absolute;
    right: 1.3rem;
    top: .15rem;
}
</style>
