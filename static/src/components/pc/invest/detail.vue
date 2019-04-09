<template>
	<div class="detail">
		<borrowing v-if="borrowing" @borrowing="borrowing = $event" :uuid="uuid"></borrowing>
		<con-invest-P2p v-if="conInvestP2p" @conInvest="conInvestP2p = $event" @sigeinfo="sigeinfo" 
		:json='investDetailP2p' :investProfit="investProfit" :addAprProfit="addAprProfit" :voucherAddApr="voucherAddApr" :vipInvestProfit="vipInvestProfit">
		</con-invest-P2p>
		<div class="topDetail">
			<div class="topLeft">	
				<div class="topTitle">
					<div class="BDname">{{borrowDetail.name}}</div>
					<!-- icons -->
					<div class="borrowtype">
						<div class="new-icon" v-if='borrowDetail.newbieOnly'></div>
						<div class="ai-icon" v-if='!borrowDetail.newbieOnly&&borrowDetail.recommneded'>智能推荐</div>
						<div class="addApr-icon" v-if='borrowDetail.addApr'>平台加息</div>
						<div class="vipApr-icon" v-if='borrowDetail.vipUprateApr>0'>V{{borrowDetail.vipLevel}}加息</div>
					</div>
				</div>

				<div class="middle">
					<span>
						<div class="topVal cl" style="padding-left: 45px;">
							{{borrowDetail.apr?borrowDetail.apr: 0 | returnFloat1}}%<em v-if='borrowDetail.addApr || borrowDetail.vipUprateApr'>+{{borrowDetail | allApr}}%</em>
						</div>
						<div class="butttomKey" style="padding-left: 52px;">参考年化</div>
					</span>
					<span>
						<div class="topVal" style="padding-left: 62px;">{{borrowDetail.timeLimit}}<em style="font-size:18px;margin-left:4px">{{Company}}</em>
						</div>
						<div class="butttomKey" style="padding-left: 57px;">授权服务期</div>
					</span>
					<span>
						<div class="topVal" style="font-size:26px;margin-top:53px; padding-left: 4px;">{{borrowDetail.remainAmount| moneyFormat(2)}} <i style="font-size: 18px;">元</i>
						</div>
						<div class="butttomKey" style="margin-top:9px;">剩余金额</div>
					</span>
				</div>
				<div class="bottomList">
					<div v-for="item in icons" class="icon-div">
						<img :src="item.pic"/>
						<span>{{item.text}}</span>
					</div>
				</div>
			</div>

			<!-- 已 登录状态-->
			<!-- @@@@@@@@@@@@@ -->
			<div class="topRight land" :class="{isLogin: login, ings:investStatus == 3, vip0: !borrowDetail.vipUprateApr}" v-if="login">
				 <!-- 浙商维护 -->
				<div class="zs-defend" v-if="borrowDetail.isSysProtect == 1">
					<img src="https://aliyunsso.edspay.com/web/myAccount/gonggaoIcon.png"/>
					<span>{{borrowDetail.protectMes}}</span>
				</div>
				<div class="money">
					<!-- 已登录已满标 -->
					<div class="investName overs" v-if="investStatus == 2">
						<span >剩余金额: <span class="redText">{{borrowDetail.remainAmount| changeWan}}元</span></span>
						<span class="blueText" @click="goCharge">充值</span>
						<div class="over-status">
							<img src="https://aliyunsso.edspay.com/web/invest/overicon.png"/>
							<router-link to="/invest"><div class="btn big-btn">查看其他项目</div></router-link>
							<p class="tip">预期收益不代表实际收益 出借需谨慎</p>
						</div>
					</div>
					<!-- 新手标状态 -->
					<div class="investName news" v-else-if='investStatus == 5'>
						<span >剩余金额: <span class="redText">{{borrowDetail.remainAmount| changeWan}}元</span></span>
						<span class="blueText" @click="goCharge">充值</span>
						<div class="newInvest">该项目仅限新手专享</div>
					</div>


					<!-- 已登录且未满标 -->
					<div class="investName active" v-else-if="investStatus == 3">
						<span>可用余额: <span class="redText">{{borrowDetail.useMoney | moneyFormat(2)}}元</span></span>
						<span class="blueText" @click="goCharge">充值</span>
						<div class="invest-input">
							<span class="input">出借金额：</span>
							<input v-if="borrowDetail.maxAmount" name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
							:placeholder="borrowDetail.minAmount+'元起，限额'+borrowDetail.maxAmount+'元'" autocomplete="off" maxlength="7" tabindex="1">
							<input v-else name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
							:placeholder="borrowDetail.minAmount+'元起'" autocomplete="off" maxlength="7" tabindex="1">
							<i class="inputDel el-icon-circle-close" v-if="sum" @click="delMoney"></i>
						</div>

						<div class="discount red">
							<span>我的红包: <em v-if="expireCount">(共{{expireCount}}张)</em></span>
							<span class="form-red fr">
								<a v-if="!redUseStatus && expireCount" href="javascript:;" @click="choic('choiceRed')">该项目不可用<i class="el-icon-arrow-right" style="font-size:14px;"></i></a>
								<a v-else-if="!redUseStatus" href="javascript:;">该项目不可用</a>
								<a v-else-if="expireCount" href="javascript:;" @click="choic('choiceRed',$event)">{{redText}}<i class="el-icon-arrow-right" style="font-size:14px;"></i></a>
								<a v-else href="javascript:;">暂无红包和加息券</a>
							</span>
						</div>
						<!-- @@@@@@2 -->


						<div class="vip discount" v-if="borrowDetail.vipUprateApr || gift">
							<span>会员加息: <em>(V{{borrowDetail.vipLevel}})</em></span>
							<span class="form-vip fr color cursor" v-if="borrowDetail.vipUprateApr" @click="choic('choiceUprate')">{{AprText}}<i class="el-icon-arrow-right" style="font-size:14px;"></i>
							</span>

							<span class="form-vip fr color VipBenefitsBtn cursor" v-else @click="$router.push('/myAccount/VipBenefits')">
							</span>
						</div>


						<div class="lack">
							<span>还需支付：</span>
							<span class="form-vip fr">¥{{sumMoney ? sumMoney : 0}}</span>
						</div>
						<div class="form-finalActualPayment">
							<el-tooltip class="item" effect="dark" placement="left" v-if="vipInvestProfit || addAprProfit || voucherAddApr">
								<img src="https://aliyunsso.edspay.com/web/invest/buble.png" style="padding-bottom:3px;"/>
								<div slot="content">
									<div class="money" v-if="investProfit">项目基础收益</br>
										<span>{{investProfit}}</span>
									</div>
									<div class="money1" v-if="vipInvestProfit">Vip加息收益</br>
										<span>{{vipInvestProfit}}</span>
									</div>
									<div class="money" v-if="addAprProfit">项目加息收益</br>
										<span>{{addAprProfit}}</span>
									</div>
									<div class="money" v-if="voucherAddApr">加息券加息收益</br>
										<span>{{voucherAddApr}}</span>
									</div>
									<div class="tip">真实收益以实际到账为准</div>
								</div>
							</el-tooltip>
							<a href="javascript:;" class="finalActualPayment">参考年化收益(元):
								<em>{{investProfitWhole? investProfitWhole : 0}}</em>
							</a>
						</div>
						<div class="lend-btn btn" :class="{Arrears: Arrears}" type="danger" @click='investment' v-if="sum">{{btnText}}</div>
						<div class="lend-btn btn greyBtn" @click='investment' v-else>授权出借</div>
					</div>
				</div>
			</div>
			<!-- 未登录状态 -->
			<div class="topRight" v-else>
				<!-- 浙商维护 -->
				<div class="zs-defend" v-if="borrowDetail.isSysProtect == 1">
					<img src="https://aliyunsso.edspay.com/web/myAccount/gonggaoIcon.png"/>
					<span>{{borrowDetail.protectMes}}</span>
				</div>
				<div class="top">
					<!-- left -->
					<div class="right-left">
						<div class="investName"><em class="fl">账户可用余额:</em>
							<div class="right-right fl">
								<router-link to="/login"><div class="right-btn btn">登录可见</div></router-link>
							</div>
						</div>
						<div class="lend-div">
							<span>出借金额：</span>
						</div>
						<input v-if="borrowDetail.maxAmount" name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
						:placeholder="borrowDetail.minAmount+'元起，限额'+borrowDetail.maxAmount+'元'" autocomplete="off" maxlength="7" tabindex="1">
						<input v-else name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
						:placeholder="+borrowDetail.minAmount+'元起'" autocomplete="off" maxlength="7" tabindex="1">元
						<!-- <input name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
						placeholder="请输入出借金额（100元起）" autocomplete="off" maxlength="7" tabindex="1"> -->
						<div class="tips">
							<el-tooltip class="item" effect="dark" placement="left" v-if="vipInvestProfit || addAprProfit || voucherAddApr">
								<img src="https://aliyunsso.edspay.com/web/invest/buble.png" style="padding-bottom:3px;"/>
								<div slot="content">
									<div class="money" v-if="investProfit">项目基础收益</br>
										<span>{{investProfit}}</span>
									</div>
									<div class="money1" v-if="vipInvestProfit">Vip加息收益</br>
										<span>{{vipInvestProfit}}</span>
									</div>
									<div class="money" v-if="addAprProfit">项目加息收益</br>
										<span>{{addAprProfit}}</span>
									</div>
									<div class="money" v-if="voucherAddApr">加息券加息收益</br>
										<span>{{voucherAddApr}}</span>
									</div>
									<div class="tip">真实收益以实际到账为准</div>
								</div>
							</el-tooltip>
							<div class="lend-div2">
								<span>参考年化收益(元)：</span>
								<span class="right-amount">{{investProfitWhole? investProfitWhole : 0}}</span>
							</div>
						</div>
						<router-link to="/login"><div class="lend-btn btn" type="danger">授权出借</div></router-link>
						<!-- <div class="lend-btn btn" v-else>授权出借</div> -->
					</div>
				</div>
			</div>
		</div>

		<!-- 中间内容内宽 -->
		<div class="investContent">
			<!-- p2p项目 -->
			<div class="detailsItems" style="margin:20px 0 0px;">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="项目概况" name="first">
						<!-- 项目详情 -->
						<information-p2p 
						:name='borrowDetail.name' 
						:timeLimit='borrowDetail.timeLimit+Company'
						:minAmount='borrowDetail.minAmount'
						:uuid='uuid'
						:detail = "borrowDetail"
						:method = 'borrowDetail.style'>
						</information-p2p>
					</el-tab-pane>
					<!-- <el-tab-pane label="安全保障" name="second">
						<img  src="https://aliyunsso.edspay.com/web/invest/pcPageRevision/safe1.png"/>
					</el-tab-pane> -->
					<el-tab-pane label="债权组成" name="third">
						<!-- 债权明细 -->
						<div class="borrowerList">
							<p class="zq_text" v-if="tableDataP2p.length">仅展示部分数据，以最终匹配到的借款人为准</p>
							<el-table :data="tableDataP2p" style="width: 100%;">
								<div slot="empty" class="table-empty null_state_04">
									<img src="https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/null_state_04.png" />
									<p>债权信息正在获取中...</p>
								</div>
								<el-table-column prop="orderNo" align="center" label="借款编号" width="280">
								</el-table-column>
								<el-table-column prop="name" align="center" label="借款人">
								</el-table-column>
								<el-table-column prop="cardId" align="center" label="身份证">
								</el-table-column>
								<el-table-column align="center" label="借款金额">
									<template scope="scope">{{scope.row.money | moneyFormat}}元</template>
								</el-table-column>
								<el-table-column align="center" label="操作">
									<template scope="scope">
										<router-link :to="{ path: '/invest/leakage', query: { orderNo: scope.row.orderNo}}"><span style="color: #7AC5FF">查看详情</span></router-link>
									</template>
								</el-table-column>
							</el-table>
							<!-- 分页 -->
							<div class="fenye" v-if='tableDataP2p.length'>
								<el-pagination @current-change="borrowerList" layout="prev, pager, next" :total="borrowTotal" :page-size='5'>
								</el-pagination>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="出借记录" name="fourth">
						<div class="invest-record p2p" >
							<el-table :data="investorsListP2p" style="width: 100%">
								<div slot="empty" class="table-empty">
									<img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png" />
								</div>
								<el-table-column prop="userName" label="出借用户" align='center' >
								</el-table-column>
								<el-table-column label="出借金额(元)" align='center'>
									<template scope="scope">{{scope.row.money | moneyFormat}}</template>	
								</el-table-column>
								<el-table-column prop="addTime" label="出借时间" align='center'>
								</el-table-column>
							</el-table>

							<!-- 分页 -->
							<div class="fenye fr" v-if='investorsListP2p.length'>
								<el-pagination @current-change="InvestorList" layout="prev, pager, next" :total="invesTotalP2p" :page-size='5'>
								</el-pagination>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="常见问题" name="fifth">
						<div class="qa">
							<ul>
								<li v-for="item in questionAnwser">
									<p class="q"><i>问</i><span>{{item[0]}}</span></p>
									<p class="a"><i>答</i><span v-html="item[1]"></span></p>
								</li>
							</ul>
						</div>
					</el-tab-pane>
					<el-tab-pane label="风险提示" name="sixth">
						<!-- 债权明细 -->
						<risk-tip></risk-tip>
					</el-tab-pane>
				</el-tabs>
			</div>
		</div>
		<!-- 是否符合风险评测弹窗 -->
		<el-dialog	title="温馨提示"	:visible.sync="openRisk"	size="tiny"  top="300px"
						:show-close="false" :close-on-click-modal="false" custom-class="riskDialog">
			<div>
					<span v-if="riskInfo.maxTimeRiskTest <= borrowDetail.timeLimit">根据您的风险测评结果，我们建议您加入{{riskInfo.minTimeRiskTest}}天-{{riskInfo.maxTimeRiskTest}}天的E计划</span>
					<span v-else>根据您的风险测评结果，我们建议您加入{{borrowDetail.minTimeRiskTest}}天-{{borrowDetail.maxTimeRiskTest}}天的E计划</span>
					<div slot="footer" class="dialog-footer">
						<router-link to="/riskAssessment/riskAssessment"><el-button>重新评测</el-button></router-link>
						<router-link to="/invest"><el-button type="primary">确 定</el-button></router-link>
					</div>
			</div>
		</el-dialog>
		<!-- 没有评测的用户强制评测 -->
		<el-dialog	title="温馨提示"	:visible.sync="noRisk"	size="tiny"  top="300px" :show-close="false" :close-on-click-modal="false" custom-class="riskDialog">
			<div>
				<span>{{riskMsg1}}</span>
				<p style="color: grey;marginTop:20px">{{riskMsg2}}</p>
				<div slot="footer" class="dialog-footer">
					<el-button @click="openInvest">去出借</el-button>
					<router-link to="/riskAssessment/riskAssessment"><el-button type="primary">去测评</el-button></router-link>
				</div>
			</div>
		</el-dialog>

		<choice-red v-if='choiceRed' @choiceRed='closeRed' @submitRed='selectedRed' @submitUprate='selectedAddApr' @sigeinfo="sigeinfo" :uuid='uuid' :investAccount='sum ? sum : 0' :timeLimit='borrowDetail.timeLimit' :redId='redId?redId:0' :addAprId='addAprId?addAprId:0' :isRed='isRed'>
		</choice-red>

		<choice-uprate v-if='choiceUprate' @choiceUprate='closeUprate' @VipSubmitUprate='VipSelectedAddApr' @sigeinfo="sigeinfo" :timeLimit='borrowDetail.timeLimit' :uuid='uuid' :investAccount='sum ? sum : 0' :VipaddAprId="VipaddAprId" :vipIsApr='vipIsApr'></choice-uprate>
		
		<code-dialog v-if="showMessage.openClose" title="债转通知短信关闭验证" :phone="borrowDetail.zsBindPhone" :getCode="changePhone" :confirm="closeMessage" :code="code" @closeDialog="closeDialog" ></code-dialog>
	</div>
</template>

<script>
import getUrl from '../../../common/router/getUrl.js'         // 获取登录信息验证
import informationP2p from '../template/informationP2p.vue';        // 出借详情table基本信息
import conInvestP2p from '../template/conInvestP2p.vue';            // p2p标的出借弹出框
import riskTip from '../template/riskTip.vue';                // 出借详情table风险提示
import borrowing from '../template/Protocol/borrowingReg';                  // 出借协议
import choiceRed from '../template/invest/choiceRed.vue';                   // 红包弹框
import choiceUprate from '../template/invest/choiceUprate';                   // Vip加息弹框
import codeDialog from '../template/getCodeDialog.vue';            // 获取验证码弹框
export default {
	mixins: [getUrl],
	props: ['sign'],  // 登录框状态
	name: 'detail',
	data() {
		return {
			vipIsApr:false,    // vip加息是否选择不使用红包
			VipaddAprId:'',    // vip选择的加息ID
			gift: 0,  // 是否有待领取福利，
			AprText: '请选择',
			VipApr:0,
			limitUpMoneyNumb:0,  // 所选加息限额。


			isRed:false,                // 用户是否选择不使用红包
			Arrears: false,             // 判断余额
			btnText: '授权出借',         // 按钮文字
			isSetTradePass:true,        // 是否开通自动出借
			questionAnwser:[],          // 常见问题
			borrowTotalStatus:'',
			tableDataP2p: [],           // P2P借款人列表
			borrowTotal: 0,             // 出借人列表总条数
			activeName: 'first',        // 借款项目详情选项卡默认选第一项
			borrowing: false,           // 协议弹框显示
			conInvestP2p: false,           // p2p标的出借框开关
			choiceRed: false,           // 红包弹窗打开状态
			redUseStatus: '',           // 红包可否使用状态
			expireCount: 0,             // 红包可使用数量
			sum: '',                    // 出借输入框金额
			sumMoney: '',               // 使用优惠以后的出借金额
			redId: '',                  // 选取的红包id
			redMoney: 0,                // 选取的红包金额
			addAprId: '',               // 选取的加息券id
			addApr: 0,                 // 选取的加息券加息比例
			voucherAddApr: 0,          // 选取的加息券加息收益

			choiceUprate: false,        //Vip加息开关

			uuid: '',                   // 当前标的uuid
			fromToken: '',              // 出借的时候防止用户频繁点击token
			borrower: '',               // 借款人有数据就展示  没数据就隐藏
			investorsList: [],          // 出借人列表
			investorsListP2p: [],          // p2p出借人列表
			invesTotal: 0,              // 出借人列表总条数
			invesTotalP2p: 0,              // 出借人列表总条数
			invesTotalStatus: true,     // 出借人列表分页是否显示
			invesTotalStatusP2p: true,     // p2p出借人列表分页是否显示
			investDetailP2p: "",        //  p2p标的的弹框传值
			borrowDetail: '',           //  标的信息(是一个json)
			addAprProfit: 0,            // 标的加息预计收益
			investProfit: 0,            // 标的预计收益
			vipInvestProfit: 0,         // 标的Vip预计收益
			vipAddApr: 0,               // 标的VIP等级
			investProfitWhole: 0,       // 标的预计总收益

			status: "",                 // 标的状态
			Company: '',                // 标的时间期限单位转化（个月/天）
			investStatus: '',           // 不同标的状态渲染不同的页面
			flag: false,               // 出借金额规则判断开关
			assetManageType:'',         // 标的类型  1 sina 2 存管 3 p2p
			showMessage:{openClose:false},// 显示弹出关闭债券弹窗
     		code:{msgCode:''}, // 关闭债权验证码
			timer2:null,
			redText: '请选择',

			
			icons:[
				{
					pic:'https://aliyunsso.edspay.com/web/invest/pcPageRevision/investicon1.png',
					text:'浙商银行存管'
				},
				{
					pic:'https://aliyunsso.edspay.com/web/invest/pcPageRevision/investicon2.png',
					text:'真实借款人'
				},
				{
					pic:'https://aliyunsso.edspay.com/web/invest/pcPageRevision/investicon3.png',
					text:'系统分散出借'
				},
			],
			openRisk: false, // 控制用户是否符合评测
			noRisk: false, // 控制用户是否评测过
			riskMsg1: '', // 风险评测信息1
			riskMsg2:'', // 风险评测信息2
			riskInfo:{},
		}
	},
	methods: {
		sigeinfo(val1,val2){
          this.$emit('sigeinfo',val1,val2)
        },
		handleClick(tab, event) {  // 借款项目详情选项卡切换
			console.log(tab, event);
		},
		choic(val) {    // 点击使用优惠券的事件	
			val == 'choiceRed' ? this.choiceRed = true : this.choiceUprate = true
		},
		closeRed(f, n){  // 普通红包
			this.choiceRed = f
			if(n){
				this.isRed = true
				this.redText = '不使用我的红包'
				this.addAprId = ''
				// 不使用我的红包的时候清空已选加息信息
				this.addApr = 0
				this.voucherAddApr = 0
				this.investProfitWhole = 0
				let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100 + this.voucherAddApr * 100) / 100
				this.investProfitWhole = Math.floor(profit * 100) / 100
				// 不使用我的红包的时候清空已选红包信息
				this.redId = ''
				this.redMoney = 0
				this.sumMoney = this.sum
			}
		},
		closeUprate(f, n){    // VIP加息
			this.choiceUprate = f;
			if(n){
				this.vipIsApr = true;
				this.AprText = '不使用我的红包';
				this.VipaddAprId = '';
				// 不使用我的红包的时候清空已选加息信息
				this.addApr = 0;
				this.vipInvestProfit = 0;
				this.investProfitWhole = 0;
				let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100 + this.voucherAddApr * 100) / 100;
				this.investProfitWhole = Math.floor(profit * 100) / 100;	
			}
		},		
		selectedRed(id, money, type) {  // 接收红包弹框传回的数值
			this.addAprId = ''
			this.addApr = 0
			this.voucherAddApr = 0
			this.investProfitWhole = 0
			let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100 + this.voucherAddApr * 100) / 100
			this.investProfitWhole = Math.floor(profit * 100) / 100

			this.isRed = false
			this.redId = id
			this.redMoney = money
			if(money){
				type == 1 ? this.redText = money+"元现金红包" : this.redText = money+"元抵扣红包"
			}else{
				this.redText = '不使用我的红包'
			}
			this.sumMoney = this.sum - money
			if(this.sumMoney > this.borrowDetail.useMoney){
				this.Arrears = true
				this.btnText = '余额不足,先充值'
			}else{
				this.Arrears = false
				this.btnText = '授权出借'
			}
		},
		selectedAddApr(id, addApr, voucherAddApr) {  // 接收加息券弹框传回的数值
			this.redId = ''
			this.redMoney = 0
			this.sumMoney = this.sum
			
			this.isRed = false
			this.addAprId = id
			this.addApr = addApr
			addApr ? this.redText = addApr+"%加息券" : this.redText = '不使用我的红包'
			this.voucherAddApr = voucherAddApr
			this.investProfitWhole = 0
			let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100 + this.voucherAddApr * 100) / 100
			this.investProfitWhole = Math.floor(profit * 100) / 100
		},
		VipSelectedAddApr(id, VipApr, voucherAddApr, limitUpMoneyNumb){    // VIP福利的弹框传回的值
			this.VipaddAprId = id;
			this.VipApr = VipApr;
			VipApr ? this.AprText = VipApr+"%加息券" : this.AprText = '不使用VIP福利'
			this.vipIsApr = false;
			this.limitUpMoneyNumb = limitUpMoneyNumb;
			this.vipInvestProfit = voucherAddApr;
			let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100 + this.voucherAddApr * 100) / 100
			this.investProfitWhole = Math.floor(profit * 100) / 100;
		},
		Calculation(){  // 预计收益计算
			this.redId = ''
			this.redMoney = 0
			this.addAprId = ''
			this.addApr = 0
			this.sumMoney = this.sum
			this.redText = "请选择"
			this.VipaddAprId = '';
			this.VipApr = 0;
			this.vipInvestProfit = 0;
			this.AprText = "请选择";
			this.limitUpMoneyNumb = 0;
			//  标加息预计收益  0为月标
			if (this.borrowDetail.addApr > 0){
			    this.borrowDetail.timeType == 0 ? this.addAprProfit = ((this.sum * this.borrowDetail.addApr / 100) / 12) * this.borrowDetail.timeLimit : this.addAprProfit = ((this.sum * this.borrowDetail.addApr / 100) / 360) * this.borrowDetail.timeLimit
			} else {
				this.addAprProfit = 0
			}
			this.addAprProfit = Math.floor(this.addAprProfit * 100) / 100 

			// 标预计收益  0为月标
			this.borrowDetail.timeType == 0 ? this.investProfit = ((this.sum * this.borrowDetail.apr / 100) / 12) * this.borrowDetail.timeLimit : this.investProfit = ((this.sum * this.borrowDetail.apr / 100) / 360) * this.borrowDetail.timeLimit
			this.investProfit = Math.floor(this.investProfit * 100) / 100

			// Vip预计收益  0为月标
			this.vipAddApr = this.borrowDetail.vipUprateApr;
			// vip福利改为加息券时注释的；
			// this.borrowDetail.timeType == 0 ? this.vipInvestProfit = ((this.sum * this.vipAddApr / 100) / 12) * this.borrowDetail.timeLimit : this.vipInvestProfit = ((this.sum * this.vipAddApr / 100) / 360) * this.borrowDetail.timeLimit
			// this.vipInvestProfit = Math.floor(this.vipInvestProfit * 100) / 100;

			this.vipInvestProfit = 0;
			this.investProfitWhole = 0
			let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100) / 100
			this.investProfitWhole = Math.floor(profit * 100) / 100
		},
		investMoney(e) {     // 出借input框的值发生改变触发的事件
			// 正则过滤除了数字的字符
			e.target.value=e.target.value.replace(/[^\d]/g,'');
			e.target.value > this.borrowDetail.remainAmount ? this.sum = this.borrowDetail.remainAmount : this.sum = e.target.value.replace(/[^\d]/g,'');

			this.isRed = false;
			this.Calculation();
			if(this.sumMoney > this.borrowDetail.useMoney){
				this.Arrears = true
				this.btnText = '余额不足,先充值'
			}else{
				this.Arrears = false
				this.btnText = '授权出借'
			}
		},
		delMoney(){   // 删除输入框金额
			this.sum = ''
			this.voucherAddApr = 0
			this.redMoney = 0
			this.Calculation()
		},
		investVerification() {
			if (this.sumMoney > this.borrowDetail.useMoney) {     // 出借金额大于账户余额
				this.flag = false
				// 存管标
				if (this.borrowDetail.bindCardIdStatus == 0) {      // 未绑卡
					this.$confirm('您尚未开通浙商存管账户，开通后才能出借存管标', '出借提示', {
						confirmButtonText: '去开通',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						if (this.borrowDetail.csbFlag == 1) {    // 当前用户在白名单之中
							window.open('/#/myAccount/openAccount')
							this.$confirm('亲！当前绑卡成功还是失败', '出借提示', {
								confirmButtonText: '绑卡成功',
								cancelButtonText: '遇到问题',
								type: 'warning'
							}).then(() => {
								this.gitBorrowDetail()
							}).catch(() => {
								this.gitBorrowDetail()
							});
						} else {
							window.open('/#/info/census')     // 跳转到白名单统计页面
						}
					})
				} else {    // zs的账户余额不足
					this.$confirm('账户余额不足，请先充值', '出借提示', {
						confirmButtonText: '去充值',
						cancelButtonText: '调整金额',
						type: 'warning'
					}).then(() => {
						window.open('/#/myAccount/accountCharge')
						this.$confirm('请您在打开的新页面中完成充值，完成之前请不要关闭此页面', '出借提示', {
							confirmButtonText: '充值成功',
							cancelButtonText: '遇到问题',
							type: 'warning'
						}).then(() => {
							this.gitBorrowDetail()
						}).catch(() => {
							this.gitBorrowDetail()
						});
					})
				}
			} else if(this.sumMoney <= 0){
				this.$message({ message: "对不起！实际支付金额不能小于0元", type: 'warning' });
				this.flag = false
			} else {      // 出借金额小于账户余额
				if (this.borrowDetail.remainAmount > this.borrowDetail.minAmount) {   // 剩余金额大于最低可投	
					if (this.sum < this.borrowDetail.minAmount) {   // 出借金额小于最低可投
						this.$message({ message: "最低出借金额" + this.borrowDetail.minAmount + "元", type: 'warning' });
						this.flag = false
					} else {  // 出借金额大于最低可投
						if (this.sum > this.borrowDetail.remainAmount) {      // 出借金额大于最低可投
							this.flag = false
							this.$message({ message: "剩余金额只有" + this.borrowDetail.remainAmount + "元", type: 'warning' });
						} else {  // 出借金额小于最低可投
							if (this.borrowDetail.maxAmount == 0) {
								this.flag = true
							} else {
								if (this.sum > this.borrowDetail.maxAmount) {     // 出借金额大于最高可投
									this.flag = false
									this.$message({ message: "该项目最多出借" + this.borrowDetail.maxAmount + "元", type: 'warning' });
								} else {
									this.flag = true
								}
							}
						}
					}
				} else {   // 剩余金额大于最低可投	
					if (this.sum > this.borrowDetail.remainAmount) {     // 出借金额大于剩余金额
						this.$message({ message: "剩余金额只有" + this.borrowDetail.remainAmount + "元", type: 'warning' });
						this.flag = false
					} else if (this.sum < this.borrowDetail.remainAmount) {       // 剩余金额小于最低出借
						this.$message({ message: "剩余金额只有" + this.borrowDetail.minAmount + "元", type: 'warning' });
						this.flag = false
					} else {
						this.flag = true
					}
				}
			}
			return this.flag
		},
		investment() {   // 授权出借按钮
			if(this.addAprId && this.redId){
				this.$message({ message: '红包与加息券不可同时使用', type: 'warning' });
				return
			}
			if(this.Arrears){
				if(this.borrowDetail.bindCardIdStatus == 0){
					this.goCharge()
				} else{
					let num1 = parseInt(this.sumMoney-this.borrowDetail.useMoney)
					let num2 = this.sumMoney-this.borrowDetail.useMoney
					if(num2.toString().indexOf(".") >= 0) {
						if (num2.toString().split(".")[1].length<=2) {
							window.open('/#/myAccount/accountCharge?money='+ num2)
						} else {
							window.open('/#/myAccount/accountCharge?money='+ (parseInt(num2*100)+1)/100)
						}
					} else {
						window.open('/#/myAccount/accountCharge?money='+ num2)
					}
					this.$confirm('请您在打开的新页面中完成充值，完成之前请不要关闭此页面', '出借提示', {
						confirmButtonText: '充值成功',
						cancelButtonText: '遇到问题',
						type: 'warning'
					}).then(() => {
						this.gitBorrowDetail()
					}).catch(() => {
						this.gitBorrowDetail()
					});
				} 
				return
			}
			if (this.sum != 0) {
				this.getPhoneStatus()
			} else {
				this.$message({ message: '请先输入你要出借的金额', type: 'warning' });
			}
		},
		checkVipWelfare(){   // VIP福利使用验证
			if(this.borrowDetail.vipUprateApr || this.gift){  // 有会员加息或者有未领取福利
				if(this.VipaddAprId == 0){   // 未选择加息券
					this.$confirm('确认不使用会员加息券？', '出借提示', {
						type: 'warning'
					}).then(() => {
						this.assignment();
					}).catch(() => {
						
					});
				} else if(this.limitUpMoneyNumb > 0 && this.sum > this.limitUpMoneyNumb){
					const h = this.$createElement;
					this.$msgbox({ title: '出借提示', message: h('p', null, [
						h('p', null, '当前会员加息券最高加息'+ this.limitUpMoneyNumb +'元, '),
						h('p', null, '确认加息？ ')
					]),
					showCancelButton: true,
					type: 'warning',
					}).then(action => {
						this.assignment();
					});
				} else{
					this.assignment();
				}
			}else{
				this.assignment();
			}
		},
		assignment(){   //赋值
			this.investDetailP2p = {
				useMoney: this.borrowDetail.useMoney,                    // 用户可用余额
				assetManageType:this.assetManageType,
				autoTenderStatus:this.borrowDetail.autoTenderStatus,          // 是否开通自动出借
				isSetTradePass:this.borrowDetail.isSetTradePass,              // 是否设置交易密码
				name: this.borrowDetail.name,                     // 标的名称
				timeLimit: this.borrowDetail.timeLimit,           // 借款期限
				Company: this.Company,                            // 借款期限单位
				apr: this.borrowDetail.apr,                       // 标的年化利率
				addApr: this.borrowDetail.addApr,                 // 标的加息年化利率
				vipUprateApr:this.borrowDetail.vipUprateApr,         // vip加息年化利率
				remainAmount: this.borrowDetail.remainAmount,     // 剩余金额
				money: this.sum,                                  // 出借金额
				phone: this.borrowDetail.zsBindPhone,             // 浙商绑定的手机号码
				investProfitWhole: this.investProfitWhole,        // 预期收益
				redMoney: this.redMoney,                          // 红包金额
				rateInterestStr: this.addAprId,                   // 加息券id
				redEnvelopeStr: this.redId,                       // 红包id数组
				uuid: this.uuid,                                   // 标的id	
				isShowAgree: this.borrowDetail.isShowAgree,   // 是否勾选协议
				vipRateId: this.VipaddAprId
			}
			this.conInvestP2p = true;
		},
		// 判断出借
		checkInvest () {
			let _this = this
			if (this.investVerification()) {
				if(this.borrowDetail.isRiskTest == 0){
					this.noRisk = true
					this.riskMsg1 = this.borrowDetail.riskMes.split('|')[0]
					this.riskMsg2 = this.borrowDetail.riskMes.split('|')[1]
				}else if (this.borrowDetail.conformRiskTest == 1){
					this.openRisk = true
					// 用户不符合风险评测结果
				}else{
					this.checkVipWelfare();
				}
			}
		},
		// 默认用户评测保守型，打开出借弹窗
		openInvest () {
			let _this = this
			this.noRisk = false
			global.http.post(this, "/app/risk/defaultRiskReview", {}, data => {
				if (data.data.resCode == 1) {
					this.borrowDetail.isRiskTest = 1
					if (data.data.resData.maxTimeRiskTest <= this.borrowDetail.timeLimit){ // 用户测评的可投资最大月份和当前标的的借款期限做比较
						this.openRisk = true
						this.riskInfo = data.data.resData
					}else {
						this.checkVipWelfare();
					}
				}else{
					this.$message({ message: data.data.resMsg, type: 'error' });
				}
			})
		},
		init() {
			// 检查token是否过期
			if (!this.getCookie('token')) {
				this.login = false;
			} else {
				this.login = true;
			}
			let _this = this;

			//查看标的信息
			this.uuid = this.$route.query.uuid
			if (!this.uuid) {
				this.$confirm('当前标的不存在，确认返回出借列表页', '温馨提示', {
					confirmButtonText: '确定',
					showCancelButton: false,
					type: 'warning'
				}).then(() => {
					this.$router.push({ path: '/invest' })
				})
			}

			//常见问题
			this.$http.post(this.ajaxUrl.getUrl(1) + "/financePlan/questionAnwser", { uuid: this.uuid, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					_this.questionAnwser = data.body.resData.questionAnwser
				} else {

				}
			}, (rest) => {
				// 响应错误回调
			})

			this.gitBorrowDetail()

			// 检查标的是否可以使用优惠券
			this.$http.post(this.ajaxUrl.getUrl(1) + "/financePlan/checkCoupon", { assetManageType:3,planId: this.uuid, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					// 红包可使用条数
					data.body.resData.expireCount == 0 ? _this.redText = '暂无优惠券' : _this.expireCount = data.body.resData.expireCount
					// 红包使用状态
					if(data.body.resData.redUseStatus || data.body.resData.uprateUserStatus){
						_this.redUseStatus = 1
					}else{
						_this.redUseStatus = 0
					}
				} else {

				}
			})

			// 检查是否有可领取福利
			this.$http.post(this.ajaxUrl.getUrl(1) + "/vip/gift/isNewGift", { mobileType:3, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					_this.gift = data.body.resData.gift;
					console.log(_this.gift)
				}
			})
		},
		gitBorrowDetail(){
			let _this = this
			//  标的详情请求
			this.$http.post(this.ajaxUrl.getUrl(1) + "/borrow/borrowDetail", { assetManageType:this.assetManageType,uuid: this.uuid, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					if (_this.login == true) {
						if (data.body.resData.borrowDetail.isLogin == 1) {
							_this.login == true
						} else {
							_this.delCookie('userName')
							_this.delCookie('token')
							_this.login == false
						}
					}
					let borrowDetailList = data.body.resData.borrowDetail
					this.borrowDetail = borrowDetailList
					let status = borrowDetailList.status
					if (status == 0) {
						_this.status = "等待初审";
					} else if (status == 1 && borrowDetailList.progress != 100) {
						_this.status = "初审通过";
					} else if (status == 1 && borrowDetailList.progress == 100) {
						_this.status = "满标待审";
					} else if (status == 2) {
						_this.status = "初审未通过";
					} else if (status == 3) {
						_this.status = "复审通过";
					} else if (status == 4 || status == 49) {
						_this.status = "复审未通过";
					} else if (status == -2) {
						_this.status = "撤回处理中";
					} else if (status == 5 || status == 59) {
						_this.status = "管理员撤回";
					} else if (status == 6) {
						_this.status = "还款中";
					} else if (status == 7) {
						_this.status = "部分还款";
					} else if (status == 8) {
						_this.status = "还款成功";
					} else if (status == 9) {
						_this.status = "申请还款中";
					} else {
						_this.status = "已撤回";
					}
					// 标的时间期限单位转化
					borrowDetailList.timeType == 0 ? _this.Company = "个月" : _this.Company = "天"

					// 标的状态转化
					if (status == 6 || status == 7 || status == 8 || status == 9) { // 满标状态
						_this.investStatus = 2
					} else if (borrowDetailList.newbieOnly && !borrowDetailList.canTender) {   // 老用户进入新手标的状态
						_this.investStatus = 5
					} else if (status == 1 && borrowDetailList.progress != 100) {  // 正常可出借
						_this.investStatus = 3
					} else if (status == 1 && borrowDetailList.progress == 100) { // 满标状态
						_this.investStatus = 2
					}
					if(_this.sumMoney > _this.borrowDetail.useMoney){
						_this.Arrears = true
						_this.btnText = '余额不足,先充值'
					}else{
						_this.Arrears = false
						_this.btnText = '授权出借'
					}
				} else {
					_this.$message({ message: data.body.resMsg, type: 'warning' });
				}
			})
		},
		borrowerList(val) {   // 借款人列表分页
			var i = `${val}`
			this.borrowList(i)
		},
		InvestorList(val) {   // 出借人列表分页
			var i = `${val}`
			this.listOfInvestors(i)
		},
		listOfInvestors(n) {  //  出借人列表
			let _this = this   // p2p标列表
			this.$http.post(this.ajaxUrl.getUrl(1) + "/financePlan/tenderList", { planId: this.uuid, pageNum: n, pageSize: 5, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					_this.investorsListP2p = data.body.resData.pageInfo.list
					_this.invesTotalP2p = data.body.resData.pageInfo.total
					data.body.resData.pageInfo.total > 4 ? _this.invesTotalStatus = true : _this.invesTotalStatus = false
				} else {
					_this.$message({ message: data.body.resMsg, type: 'warning' });
				}
			})
		},

		borrowList(n) {  //  借款人列表
			let _this = this   //this.uuid
			this.$http.post(this.ajaxUrl.getUrl(1) + "/financePlan/borrowList", { planId: this.uuid, pageNum: n, pageSize: 5, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					_this.tableDataP2p = data.body.resData.pageInfo.list
					_this.borrowTotal = data.body.resData.pageInfo.total
					data.body.resData.pageInfo.total > 5 ? _this.borrowTotalStatus = true : _this.borrowTotalStatus = false
					data.body.resData.pageInfo.list.length == 0 ? this.borrower = false : this.borrower = true

				} else {
					_this.$message({ message: data.body.resMsg, type: 'warning' });
				}
			})
		},
		sigeinfo(val1, val2) {
			this.$emit('sigeinfo', val1, val2)
		},
		// 获取是否关闭债转短信
		getPhoneStatus() {
			global.http.post_(this, "/planTender/getNotifyStatus", {}, data => {
				if (data.data.resData.notifyStatus) {
					this.$alert('为了避免您在债权转让的时候收到短信，造成困扰，请放心关闭债转短信并验证短信验证码，具体项目进度我们另有短信通知', '温馨提示', {
						confirmButtonText: '确定',
						showClose: false,
						callback: action => {
							this.changePhone()
						}
					});
				} else {
					this.checkInvest()
				 }
			})
		},
	// 获取关闭债券验证码
	changePhone(){
         global.http.post_(this, "/getCloseMsgCode", {}, data => {
              if(data.data.resCode){
                  this.showMessage.openClose = true;
                  this.$message({
                    message: data.data.resMsg,
                    type: 'success'
                  });
              } else {
                this.$message.error(data.data.resMsg);
                this.showMessage.openClose = false;
              }
          })
		},
	// 关闭债权
	closeMessage () {
        global.http.post_(this, "/closeNotify", {mobileCode:this.code.msgCode}, data => {
          if(data.data.resCode){
                this.showMessage.openClose = false;
                this.$message({
                  message: data.data.resMsg,
                  type: 'success'
                });
              }else{
                this.showMessage.openClose = true;
              }
        })
      },
      // 关闭弹窗
      closeDialog (val) {
          this.showMessage.openClose = val;
	  },
	//   去充值
	goCharge () {
		if (this.borrowDetail.bindCardIdStatus == 0 && this.borrowDetail.assetManageType != 1) {
			 this.$confirm('您尚未开通存管账户，请开通', '提示', {
				confirmButtonText: '去开通',
				cancelButtonText: '取消',
				type: 'warning'
				}).then(() => {
				this.$router.push('/myAccount/openAccount')
				}).catch(() => {
			});
        } else {
         	this.$router.push('/myAccount/accountCharge')
        }
	}
	},
	created: function() {
		this.$route.query.assetManageType ? this.assetManageType = this.$route.query.assetManageType : this.assetManageType = 3
	},
	mounted: function() {
		this.init()
		this.borrowList(1)
		this.listOfInvestors(1)
	},
	components: {
		'informationP2p': informationP2p,
		"conInvestP2p": conInvestP2p,
		'borrowing': borrowing,
		'riskTip': riskTip,
		'choiceRed': choiceRed,
		'code-dialog': codeDialog,
		'choice-uprate':choiceUprate
	},
}
</script>
<style lang="scss" scoped>
	.zs-defend {
		position: absolute;
		font-size: 12px;
		top: -5px;
		padding: 5px;
	}
	
</style>
<style lang="scss">
/*表格*/

.invest-record,.borrowerList{
	.el-table{
		border: none;
		border: 1px solid #F4F4F4;
		border-bottom:none;
	}
	
	.el-table th {
		background-color: #F5FAFF;
	}
	.el-table td, .el-table th.is-leaf {
		border-bottom: 1px solid #F9F9F9;
	}
	.el-table__footer-wrapper thead div, .el-table__header-wrapper thead div {
		background-color: #F5FAFF;
	}
	.el-table th>.cell{
		background: #F5FAFF;
	}
	.el-table__body, .el-table__footer, .el-table__header {
		background: #F5FAFF;
	}
	tbody {
		color: #333;
	}
	.el-table__body-wrapper .el-table__row{
              height: 60px;
	}
}
/*风险dialog*/
.detail .el-dialog {
  border-radius: 10px;
}
.detail .riskDialog {
	width: 400px;
}
.detail .riskDialog .dialog-footer{
	text-align: right;
    margin-top: 20px;
}
.frBor {
	text-align: right;
	margin: 25px 0 0 -40px;
	float: none;
	margin-bottom: 40px;
}
.table-empty.null_state_04{
	img{
		width: 120px;
		height: 120px;
		margin-bottom: 5px;
	}
	p{
		font-size: 16px;
		color: #999;
		
	}
}
.detail {
	width: 100%;
	height: auto;
	padding-top: 20px;
	padding-bottom: 30px;
	background: #F8F8F8;
	.cursor{
		cursor: pointer;
	}
	.select-tip {
		margin-top: 5px;
		font-size: 12px;
		color: #999999;
	}
	.greyBtn {
		background: #FFD5CE !important;
		cursor: not-allowed;
	}
	.redText {
		color: #EF4B31;
	}
	.blueText {
		color: #5396FF;
		cursor: pointer;
	}
	.topDetail {
		width: 1200px;
		height: 330px;
		margin: 0 auto;
		background: #fff;
		// box-shadow: 0 2px 12px 0 rgba(150,150,150,0.23);
		.topLeft {
			width: 776px;
			height: 330px;
			float: left;
			// padding: 0 20px;
			border-right: 1px solid #e5e5e5;
			.borrowtype {
				margin-left: 10px;
				div{
					width: 80px;
					height: 26px;
					line-height: 26px;
					padding: 0px 9px;
					font-size: 14px;
					text-align: center;
					display: inline-block;
					border-radius: 2px;
					margin-right: 15px;
					color: #FFFFFF;
					text-align: center;
				}
				.new-icon{
					    width: 74px;
						height: 24px;
						border: none;
						background: url(https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/newIcon.png?v=1.1) no-repeat;
						background-size: cover;
				}
				div.addApr-icon,.ai-icon{
					background: #5CA9F1;
					border:none;
				}
				div.vipApr-icon{
					background: #D3BA81;
					font-size: 14px;
					color: #FFFFFF;
					border:none;
				}
				.investStatus {
					color: #FFFFFF;
					background-color: #7ac5ff;
				}
			}
			.topTitle {
				height: 80px;
				padding: 15px 40px;
				box-sizing: border-box;
				border-bottom: solid 1px #E5E5E5;
				display: flex;
				flex-direction: row;
				align-items: center;
				width: 776px;
				padding-left: 40px;
				.BDname {
					float: left;
					width: auto;
					height: 50px;
					font-size: 26px;
					font-family: PingFangSC-Medium;
					line-height: 50px;
					text-align: center;
					color: #333333;
				}
				.number {
					height: 50px;
					font-size: 12px;
					line-height: 50px;
					text-align: center;
					color: #999999;
					margin: 0 10px;
					float: left;
				}
				.protocol {
					cursor: pointer;
					float: left;
					height: 50px;
					font-size: 12px;
					line-height: 50px;
					text-align: center;
					color: #7dc6fd;
					i {
						font-size: 22px;
						vertical-align: middle;
					}
				}
			}
			.middle {
				width: 100%;
				overflow: hidden;
				span {
					width: 33.333%;
					height: 100%;
					float: left;
					color: #666;
					font-size: 14px;
					.topVal {
						width: 100%;
						font-size: 40px;
						color: #333333;
						margin-top: 40px;
						font-family: DIN-Medium;
						em {
							font-size: 32px;
						}
					}
					.cl {
						font-size: 40px;
						color: #FF5B4C;
					}
					.butttomKey {
						width: 100%;
						font-size: 16px;
						color: #999;
						margin-top: 10px;
						margin-bottom: 10px;
					}
				}
				span:nth-child(2) .butttomKey,span:nth-child(3) .butttomKey{
					// padding-left: 60px;
				}
			}
			.bottomList {
				width: 100%;
				padding: 0 36px;
				display: flex;
				flex-direction: row;
				font-size: 14px;
				color: #333333;
				margin-top: 61px;
				.icon-div {
					margin-right: 64px;
					img{
						 vertical-align:text-top;
					}
					span{
						margin-left: 3px;
					}
				}
			}
		}
		.btn {
			border-radius: 4px;
			width: 120px;
			height: 40px;
			line-height: 38px;
			text-align: center;
			font-size: 16px;
			cursor: pointer;
		}
		.topRight {
			width: 416px;
			height: 330px;
			padding: 23px 20px 49px 20px;
			float: left;
			background: #fff;
			position: relative;
			/*已售罄*/
			.over-status {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				img {
					width: 140px;
					height: 140px;
					margin-top: 10px;
				}
				.big-btn {
					width: 364px;
					height: 40px;
					color: white;
					background: #EF4B31;
					margin-top: 12px;
				}
				.tip {
					font-size: 12px;
					color: #999999;
					line-height: 12px;
					margin-top: 20px;
				}
			}
			.top {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.right-left {
					padding-left: 8px;
					.lend-div {
						height: 52px;
						font-size: 16px;
						color: #333333;
						padding-left: 10px;
						line-height: 52px;
						.right-amount {
							color: #EF4B31;
						}
					}
					.lend-div2 {
						display: inline-block;
						height: 36px;
						font-size: 16px;
						color: #999;
						padding-left: 10px;
						line-height: 36px;
						margin-bottom: 10px;
						.right-amount {
							color: #EF4B31;
						}
					}
				}
				.right-right {
					.right-btn {
						border: 1px solid #EF4B31;
						color: #EF4B31;
					}
					.right-btn:hover {
						background: #f31b23;
    					color: #fff;
					}
				}
			}
			.invest-input {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 60px;
			}
			.lend-btn {
				width: 336px;
				background: #EF4B31;
				color: #FFFFFF;
				letter-spacing: 2px;
			}
			// .lend-btn.Arrears {
			// 	background: #DDDDDD;
			// 	color: #FFFFFF;
			// 	letter-spacing: 2px;
			// 	letter-spacing: 2px;
			// }
			#moneyIuput {
				border: 1px solid #DDD;
				width: 320px;
				height: 40px;
				padding-left: 10px;
				font-size: 16px;
				color:#333;
				line-height: 40px;
				margin-bottom: 40px;
				margin-right: 8px;
			}
			.el-button.el-button--danger {
				width: 100px;
				height: 40px;
				margin-right: 18px;
				text-align: center;
				font-size: 18px;
				color: #fff;
				border-radius: 0;
				padding: 0;
			}
			.form-finalActualPayment {
				clear: both;
				font-size: 14px;
				margin-top: 15px;
				a {
					color: #999;
					width: 130px;
					display: inline-block;
					em,
					b {
						color: #fc4147;
						font-weight: normal;
					}
				}
				.el-button {
					border: 0;
					padding: 0;
					span {
						width: 100%;
						height: 100%;
						font-size: 30px;
						line-height: 25px;
						color: #fe9169;
						i {
							width: 100%;
							height: 100%;
							font-size: 20px;
							color: #7ac5ff;
						}
					}
				}
			} //  未登录状态
			.investName {
				width: 100%;
				height: 40px;
				padding-left: 10px;
				em {
					font-size: 16px;
					color: #333;
					line-height: 40px;
					margin-right: 15px;
				}
				a{
					width: 100%;
					height: 100%;
				}
			}
			.investName.news {
				line-height: 40px;
				margin-top: 10px;
				.blueText{
					float: right;
   	 				margin-right: 30px;
				}
			}
			.investName.overs {
				line-height: 40px;
				margin-top: 10px;
				.blueText{
					float: right;
   	 				margin-right: 20px;
				}
			}
			.investName.ings {
				line-height: 40px;
				margin-top: 10px;
				span.blueText{
					float: right;
   	 				margin-right: 20px;
				}
			}
			.investName .blueText:hover{
				color:	#f75a31;
			}
			.investName.mt {
				margin-top: 47px;
			}
			.investName.mt-25 {
				margin-top: 25px;
			}
			.quantum {
				width: 256px;
				height: 33px;
				background: url(https://aliyunsso.edspay.com/web/invest/speed.png);
				position: relative;
				margin: 49px auto 0;
				.speed {
					height: 17px;
					border-radius: 8px;
					background: url(https://aliyunsso.edspay.com/web/invest/speedBg.png) left top;
					background-size: 256px 17px;
					position: absolute;
					left: 8px;
					top: 7px;
					color: #333;
				}
				.bubble {
					width: 44px;
					height: 52px;
					background: url(https://aliyunsso.edspay.com/web/invest/bubble.png) center center;
					background-size: 44px 52px;
					position: absolute;
					margin-left: -15px;
					top: -44px;
					color: #fff;
					font-size: 12px;
					font-weight: 600;
					line-height: 40px;
					text-align: center;
				}
			}
			.status {
				width: 100%;
				font-size: 16px;
				font-weight: 500;
				text-align: center;
				color: #333;
				margin-top: 27px;
			}
			.el-button.el-button--danger {
				width: 310px;
				height: 40px;
				margin: 0 auto;
				font-size: 18px;
				font-weight: 500;
				background: #fc4147;
				text-align: center;
				color: #fff;
				line-height: 40px;
				margin-top: 33px;
				display: block;
				float: none;
			}
			.newInvest {
				width: 100%;
				font-size: 30px;
				text-align: center;
				color: #EF4B31;
				margin: 70px auto 0px;
				border: 2px solid #EF4B31;
				border-radius: 2px;
				width: 310px;
				height: 70px;
				line-height: 64px;
			}
			.showTime1 {
				width: 312px;
				height: 72px;
				margin: 0 auto;
				font-size: 28px;
				font-family: DIN-Bold;
				span {
					display: inline-block;
					color: #0083FF;
					text-align: center;
					line-height: 36px;
				}
				span:nth-child(4) {
					margin-right: 0;
				}
			}
			.countdown {
				width: 100%;
				text-align: center;
				font-size: 30px;
				color: #666666;
				margin-top: 54px;
				margin-bottom: 32px;
			}
		}
		.topRight.ings{
			font-family: PingFangSC-Regular;
			padding: 25px 40px 19px 20px;
			.investName.active{
				height: 36px;
				line-height: 36px;
				padding-left: 10px;
				span{
					display: inline-block;
					height: 36px;
					line-height: 36px;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #333333;
					margin-bottom: 3px;
				}
				span.input{
					margin-bottom: 0px;
					height: 40px;
					line-height: 40px;
				}
				.redText{
					color: #EF4B31;
				}
				.blueText{
					float: right;
					margin-right: 10px;
					margin-bottom: 3px;
					color: #5396FF;
				}
				.invest-input{
					margin-top: 0px;
					margin-bottom: 2px;
					position: relative;
				}
				i.inputDel{
					position: absolute;
					right: 20px;
					top: 12px;
					color: #999;
					cursor: pointer;
				}
				#moneyIuput{
					width: 224px;
					margin-bottom: 0px;
				}
				.discount{
					height: 40px;
					line-height: 40px;
					width: 356px;
					padding: 0 10px;
					margin-left: -10px;
					background: #FFFFFF;
					box-shadow: 2px 2px 4px 0 rgba(228,228,228,0.50);
					margin-bottom: 1px;
					.form-red{
						font-family: PingFangSC-Regular;
						font-size: 16px;
						color: #333333;
						margin-bottom: 0;
					}
					span{
						em{
							color: #5396FF;
						}
					}
					.VipBenefitsBtn{
						width: 75px;
						height: 20px;
						margin-top: 10px;
						cursor: pointer;
						background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/VipBenefits.png);
						background-size: 100% 100%;
					}
				}
				.discount.red{
					margin-bottom: 2px;
				}
				.discount.vip{
					margin-bottom: 3px;
					span.fr{
						font-family: PingFangSC-Regular;
						color: #EF4B31;
					}
					span.fr.color{
						color: #333333;;
					}
				}
				.lack{
					width: 100%;
					height: 36px;
					line-height: 36px;
					margin-bottom: 10px;
					span{
						font-family: PingFangSC-Regular;
						height: 40px;
						line-height: 40px;
						margin-bottom: 0px;
					}
					span.fr{
						color: #EF4B31;
						margin-right: 10px;
					}
				}
				.form-finalActualPayment{
					margin-top: -5px;
					.finalActualPayment{
						display: inline;
					}
				}
				
			}
		}
		.topRight.vip0{
			padding: 25px 40px 19px 20px;
			.investName.active{
				span{
					margin-bottom: 8px;
				}
				span.input{
					margin-bottom: 0px;
				}
				.invest-input{
					margin-bottom: 6px;
				}
				.discount{
					margin-bottom: 6px;
				}
				.blueText:hover{
					color:	#f75a31 !important;
				}
			}
		}

		.topRight.fixed {
			.investName {
				margin-top: 24px;
			}
			.discount {
				margin-top: 9px;
			}
		}


		.topRight.land .el-button.el-button--danger {
			width: 96px;
			height: 40px;
			margin-right: 18px;
			text-align: center;
			font-size: 18px;
			color: #fff;
			border-radius: 0;
			padding: 0;
			margin-top: 0;
			float: right;
		}
	.blueText:hover{
		color:	#f75a31 !important;
	}
	} // 出借三重礼一下
	.investContent {
		width: 1190px;
		height: auto;
		margin: 0 auto;
		
		.investTitle {
			width: 100%;
			height: 80px;
			font-size: 22px;
			color: #333;
			font-weight: 600;
			i {
				display: inline-block;
				width: 4px;
				height: 24px;
				background: #fc4147;
				margin-top: 50px;
				margin-right: 15px;
				vertical-align: sub;
			}
			span {
				font-weight: 300;
				width: 115px;
				font-size: 14px;
				margin-left: 10px;
			}
			a {
				float: right;
				display: block;
				width: 80px;
				font-size: 12px;
				color: #666;
				margin-top: 55px;
				font-family: Adobe Heiti Std R;
				i {
					width: 15px;
					height: 15px;
					background: #fff;
					margin: 0;
					vertical-align: middle;
					margin-left: 12px;
				}
			}
			a:hover {
				color: #fc4147;
			}
		}
		.threeRites {
			width: 1190px;
			height: 230px;
			background-color: #ffffff;
			box-shadow: 0px 6px 20px 0 rgba(204, 204, 204, 0.26);
			border: solid 1px rgba(0, 0, 0, 0.05);
			.threeLeft {
				width: 50%;
				height: 100%;
				float: left;
				padding: 34px 21px 45px;
				span {
					display: block;
					float: left;
					width: 120px;
					height: 195px;
					margin-right: 20px;
					img {
						display: block;
						width: 100%;
						height: 120px;
					}
					b,
					p {
						display: block;
						width: 100%;
						text-align: center;
						font-size: 14px;
						color: #666;
						font-weight: 300;
					}
					p {
						margin-top: 10px;
					}
				}
			}
			.threeRight {
				width: 50%;
				height: 180px;
				float: right;
				overflow: hidden;
				overflow-y: auto;
				h3 {
					width: 100%;
					font-size: 16px;
					text-align: left;
					color: #333333;
					font-weight: 600;
					margin-top: 26px;
				}
				p {
					font-size: 12px;
					text-align: left;
					color: #666;
					margin-top: 12px;
				}
			}
		} // 借款人列表
		.borrowerList {
			width: 100%;
			height: auto;
			padding-top: 40px;
			background-color: #ffffff;
			overflow: hidden;
			
			.zq_text{
				text-align: right;
				color: #999;
				font-size: 12px;
				margin-bottom: 14px;
			}
			.el-table {
				margin-bottom: 40px;
			}
			.el-table::after {
				background-color: #fff;
			}
			.el-table::before {
				background-color: transparent;
			}
		}
		.detailsItems {
			width: 1196px;
			height: auto;
			padding: 0 40px 0px;
			background-color: #ffffff;
			// box-shadow: 0 2px 12px 0 rgba(150, 150, 150, 0.23);
			// border: solid 1px rgba(0, 0, 0, 0.05);
			overflow: hidden;
			.el-tabs__nav {
				width: 400px;
				.el-tabs__active-bar {
					background: #fc4147;
					height: 2px;
				}
				.el-tabs__item {
					height: 70px;
					line-height: 70px;
					color: #333;
					font-size: 16px;
				}
				.el-tabs__item.is-active {
					color: #fc4147;
				}
				.el-tabs__item:hover {
					color: #fc4147;
				}
			}
			.el-tabs__content {
				// padding: 0 0 0 15px;
			}
			.el-tabs__content .el-carousel.el-carousel--card {
				width: 1000px;
				margin: 0 auto;
			}
			.el-carousel__arrow {
				width: 30px;
				height: 70px;
				font-size: 26px;
				border-radius: 0;
			}
			.el-carousel__arrow--right {
				right: 0;
			}
			.el-carousel__arrow--left {
				left: 0;
			}
		}
		.invest-record {
			width: 100%;
			height: auto;
			padding: 40px;
			background-color: #ffffff;
			box-shadow: 0px 6px 20px 0 rgba(204, 204, 204, 0.26);
			border: solid 1px rgba(0, 0, 0, 0.05);
			margin-bottom: 40px; // 以下三个样式是去掉表格边框的样式
			.el-table {
				// border: 0;
			}
			.el-table::after {
				background-color: #fff;
			}
			.el-table::before {
				background-color: transparent;
			}
		}
		.invest-record.p2p{
			padding: 40px 0;
			border: 0;
			box-shadow:none;
		}
	}
	.cell {

		margin: 0 auto;
		span {
			display: inline-block;
			margin-left: 5px;
			.name-wrapper {}
		}
	}
	.el-tag {
		border-radius: 0;
		padding: 0 10px;
	}
	.el-popover {
		min-width: 0;
		height: auto;
	}
	.el-carousel {
		padding: 50px 0;
	}
	.el-tabs__header {
		margin: 0;
		border-bottom: 1px solid #e5e5e5;
	}
	.el-carousel__item--card.is-in-stage {
		background-color: #ffffff;
		box-shadow: 0px 6px 20px 0 rgba(204, 204, 204, 0.26);
		border: solid 1px rgba(0, 0, 0, 0.08);
	}
	.qa{
		width: 1155px;
		height: auto;
		margin-top: 10px;
		// margin-left: -15px;
		overflow: hidden;
		ul{
			width: 100%;
			height: auto;
			overflow: hidden;
			padding-bottom:50px;
			li{
				width: 100%;
				border-bottom: 1px dashed  #E7E7E7;
				padding: 28px 0 30px;
				p.q{
					width: 100%;
					line-height: 25px;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #000000;
					margin-bottom: 20px;
					i{
						display: block;
						float: left;
						background: url(https://aliyunsso.edspay.com/web/help/icon_wen_normal%40x2.png) no-repeat;
						background-size: contain;
						width: 22px;
						height: 22px;
						line-height: 22px;
						color: #fff;
						text-align: center;
						margin-right: 14px;
						font-size: 14px;
					}
					span{
						display: block;
						text-align: justify;
						padding-left: 35px;
					}
				}
				p.a{
					width: 100%;
					line-height: 22px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #888;
					i{
						display: block;
						float: left;
						background: url(https://aliyunsso.edspay.com/web/help/icon_da_normal%402x.png) no-repeat;
    					background-size: cover;
						background-size: contain;
						width: 22px;
						height: 22px;
						line-height: 22px;
						color: #fff;
						text-align: center;
						margin-right: 14px;
						font-size: 14px;
					}
					span{
						display: block;
						text-align: justify;
						padding-left: 35px;
					}
				}
			}
		}
	}
} //提示框样式
.el-tooltip__popper[x-placement^=left] .popper__arrow {
	border-left-color: #999 ;
}

.el-tooltip__popper[x-placement^=left] .popper__arrow::after {
	border-left-color: #999 ;
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow {
	border-bottom-color: #999 ;
}

.el-tooltip__popper[x-placement^=bottom] .popper__arrow::after {
	border-bottom-color: #999 ;
}

.el-tooltip__popper.is-dark {
	width: auto;
	background: #999;
	.money {
		width: auto;
		height: 65px;
		border-bottom: 1px dashed #ccc;
		text-align: center;
		padding-top: 15px;
		span {
			margin-top: 10px;
			display: block;
		}
	}
	.money1 {
		width: auto;
		height: 65px;
		text-align: center;
		padding-top: 15px;
		span {
			margin-top: 5px;
			display: block;
		}
	}
	.tip {
		width: 100%;
		font-size: 12px;
		text-align: center;
		color: #fff;
	}
}

.el-table__empty-block {
	height: 250px;
}

.el-popover {
	min-width: 0;
}
</style>
