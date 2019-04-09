<template>
	<div class="detail">
		<borrowing v-if="borrowing" @borrowing="borrowing = $event" :uuid="uuid"></borrowing>
		<con-invest v-if="conInvest" @conInvest="conInvest = $event" :json='investDetail'></con-invest>
		<con-invest-P2p v-if="conInvestP2p" @conInvest="conInvestP2p = $event" @sigeinfo="sigeinfo" 
		:json='investDetailP2p' :investProfit="investProfit" :addAprProfit="addAprProfit" :voucherAddApr="voucherAddApr" :vipInvestProfit="vipInvestProfit">
		</con-invest-P2p>
		<div class="topDetail">
			<div class="topLeft">
				
				<div class="topTitle" v-if="p2p">
					<div class="BDname">{{borrowDetail.name}}</div>
					<!-- icons -->
					<div class="borrowtype">
						<div class="new-icon" v-if='borrowDetail.newbieOnly'>新手专享</div>
						<div class="ai-icon" v-if='!borrowDetail.newbieOnly&&borrowDetail.recommneded'>智能推荐</div>
						<div class="addApr-icon" v-if='borrowDetail.addApr'>平台加息</div>
						<div class="vipApr-icon" v-if='borrowDetail.vipUprateApr>0'>V{{borrowDetail.vipLevel}}加息</div>
					</div>
				</div>

				<div class="topTitle" v-else>
					<div class="BDname">{{borrowDetail.name}}</div>
					<div class="number">借款编号：
						<em>{{borrowDetail.bidNo}}</em>
					</div>
					<div class="protocol" @click="borrowing=true">
						<i class="log iconfont">&#xe621;</i>协议预览</div>
				</div>

				<div class="middle">
					<span>
						<div class="topVal cl">
							{{borrowDetail.apr?borrowDetail.apr: 0 | returnFloat1}}%<em v-if='borrowDetail.addApr || borrowDetail.vipUprateApr'>+{{borrowDetail | allApr}}%</em>
						</div>
						<div class="butttomKey">预期年化收益率</div>
					</span>
					<span>
						<div class="topVal">{{borrowDetail.timeLimit}}<em style="font-size:26px;margin-left:4px">{{Company}}</em>
						</div>
						<div class="butttomKey">项目期限</div>
					</span>
					<span>
						<div class="topVal" style="font-size:30px;margin-top:45px">{{borrowDetail.remainAmount| moneyFormat(2)}}元
						</div>
						<div class="butttomKey">剩余金额</div>
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
			<div class="topRight land" v-if="login|investStatus == 1|investStatus ==2" :class='{fixed:investStatus == 4}'>
				<div class="money">
					<!-- 已登录且未满标 -->
					<div class="investName" v-if="investStatus != 2">
						<span>账户余额: <span class="redText">{{borrowDetail.useMoney}}元</span></span>
						<span class="blueText" @click="goCharge">充值</span>
					</div>
					<!-- 已登录已满标 -->
					<div class="investName" v-else>
						<span >剩余金额: <span class="redText">{{borrowDetail.remainAmount| changeWan}}元</span></span>
					</div>
					<div class="balance" v-if="investStatus == 4|investStatus == 3">
						<el-tooltip class="item" effect="dark" placement="bottom" v-if='borrowDetail.assetManageType == 1 && borrowDetail.isOpenFlux == 1'>
							<el-button>
								<i class="iconfont">&#xe622;</i>
							</el-button>
							<div slot="content">
								<div class="money">存钱罐金额:</br>
									<span>{{borrowDetail.cqgMoney}}元</span>
								</div>
								<div class="money1">E起赚金额:</br>
									<span>{{borrowDetail.fluxMoney}}元</span>
								</div>
							</div>
						</el-tooltip>
					</div>
				</div>
				<div v-if="investStatus == 3|investStatus == 4">
					<input type="text" id='investPwd' v-model.number="investPwd" placeholder="请输入定向标密码" onkeyup="value=value.replace(/[^0-9]/g,'')" v-if='investStatus == 4'>
					<!-- input -->
					<div class="invest-input">
						<input v-if="borrowDetail.maxAmount" name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
						:placeholder="borrowDetail.minAmount+'元起，限额'+borrowDetail.maxAmount+'元'" autocomplete="off" maxlength="7" tabindex="1">
						<input v-else name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
						:placeholder="'请输入出借金额('+borrowDetail.minAmount+'元起)'" autocomplete="off" maxlength="7" tabindex="1">
						<div class="lend-btn btn" type="danger" @click='investment' v-if="sum">立即出借</div>
						<div class="lend-btn btn greyBtn" v-else>立即出借</div>
					</div>
					<div class="discount">

						<span class="form-red" v-if='redUseStatus == 2' :class="{active:sum != ''&&redUseStatus==2}">
							<a href="javascript:;" @click="choic('choiceRed',$event)">请选择红包</a>
						</span>
						<span class="form-red" v-else-if='redUseStatus == 1'>
							<a href="javascript:;">暂无红包可用</a>
						</span>

						<span class="form-addApr" v-if='uprateUserStatus == 2' :class="{active:sum != ''&&uprateUserStatus==2}">
							<a href="javascript:;" @click="choic('choiceUprate',$event)">请选加息券</a>
						</span>
						<span class="form-addApr" v-else-if='uprateUserStatus == 1'>
							<a href="javascript:;">暂无加息券可用</a>
						</span>

						<span class="form-coupon" v-if='experienceUseStatus == 2' :class="{active:sum != ''&&experienceUseStatus==2}">
							<a href="javascript:;" @click="choic('choiceExperience',$event)">请选体验券</a>
						</span>
						<span class="form-coupon" v-else-if='experienceUseStatus == 1'>
							<a href="javascript:;">暂无体验券可用</a>
						</span>

					</div>
					<p class="select-tip">*红包与加息券不可同时使用</p>
					<div class="form-finalActualPayment">

						<el-tooltip class="item" effect="dark" placement="left">
							<img src="https://aliyunsso.edspay.com/web/invest/buble.png" style="padding-bottom:3px;"/>
							<div slot="content">
								<div class="money">项目预期收益</br>
									<span>{{investProfit}}</span>
								</div>
								<div class="money">项目加息预期收益</br>
									<span>{{addAprProfit}}</span>
								</div>
								<div class="money">加息券预期收益</br>
									<span>{{voucherAddApr}}</span>
								</div>
								<div class="money1">Vip预期收益</br>
									<span>{{vipInvestProfit}}</span>
								</div>
								<div class="tip">真实收益以实际到账为准</div>
							</div>
						</el-tooltip>

						<a href="javascript:;" class="finalActualPayment">预期收益:
							<em>{{investProfitWhole? investProfitWhole : 0}}元</em>
						</a>
						<a href="javascript:;" class="finalInvestMoney">红包抵扣：
							<em>{{redMoney}}元</em>
						</a>
					</div>
				</div>
				<!-- 满标状态 -->
				<div v-else-if='investStatus == 2' class="over-status">
					<img src="https://aliyunsso.edspay.com/web/invest/overicon.png"/>
					<router-link to="/invest"><div class="btn big-btn">查看其他项目</div></router-link>
					<p class="tip">预期收益不代表实际收益 出借需谨慎</p>
				</div>
				<!-- 倒计时状态 -->
				<div v-else-if='investStatus == 1'>
					<div class="countdown">开抢倒计时</div>
					<div class="showTime1" id='showTime1'></div>
				</div>
				<!-- 新手标状态 -->
				<div v-else-if='investStatus == 5'>
					<div class="newInvest">该项目仅限新手专享</div>
				</div>
			</div>
			<!-- 未登录状态 -->
			<div class="topRight" v-else>
				<div class="top">
					<!-- left -->
					<div class="right-left">
						<div class="investName">账户余额:  登录后查看</div>
						<div class="lend-div mt80">
							<span>出借金额：</span>
							<span class="right-amount">{{sum? sum : 0}}元</span>
						</div>
						<div class="lend-div">
							<span>预期收益：</span>
							<span class="right-amount">{{investProfitWhole? investProfitWhole : 0}}元</span>
						</div>
					</div>
					<!-- right -->
					<div class="right-right">
						<router-link to="/login"><div class="right-btn btn">立即登录</div></router-link>
					</div>
				</div>
				<!-- input -->
				<div class="invest-input">
					<input name="money" type="text" id="moneyIuput" size="11"  :value="sum" @input='investMoney' 
					placeholder="请输入出借金额（100元起）" autocomplete="off" maxlength="7" tabindex="1">
					<router-link to="/login" v-if="sum"><div class="lend-btn btn" type="danger" @click='investment'>立即出借</div></router-link>
					<div class="lend-btn btn greyBtn" v-else>立即出借</div>
				</div>
			</div>
		</div>

		<!-- 中间内容内宽 -->
		<div class="investContent">
			<!-- p2p项目 -->
			<div class="detailsItems" v-if="p2p" style="margin:30px 0 40px;">
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
					<el-tab-pane label="安全保障" name="second">
						<img  src="https://aliyunsso.edspay.com/web/invest/safe1.png"/>
					</el-tab-pane>
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
							<div class="fenye frBor" v-if='borrowTotalStatus'>
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
							<div class="fenye fr" v-if='invesTotalStatusP2p'>
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

			<!-- 非p2p项目 -->
			<div class="detailsItems" v-else>
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane label="项目详情" name="first">
						<!-- 项目详情 -->
						<information></information>
					</el-tab-pane>
					<el-tab-pane label="安全保障" name="second">
						<!-- 安全保障 -->
						<guarantee></guarantee>
					</el-tab-pane>
					<el-tab-pane label="风险提示" name="third">
						<risk-tip></risk-tip>
						<!-- 风险提示over -->
					</el-tab-pane>
					<el-tab-pane label="借款人列表" name="fourth" v-if='borrower&&borrowDetail.isShowBorrower != 0'>
						<!-- 借款人列表 -->
						<div class="borrowerList">
							<el-table :data="tableData" style="width: 100%;">
								<el-table-column prop="realName" align="center" label="姓名">
								</el-table-column>
								<el-table-column prop="cardId" align="center" label="身份证">
								</el-table-column>
								<el-table-column prop="money" align="center" label="金额(元)">
								</el-table-column>
								<el-table-column prop="timeLimit" align="center" label="期限(月)">
								</el-table-column>
							</el-table>
							<!-- 分页 -->
							<div class="fenye frBor" v-if='borrowTotalStatus'>
								<el-pagination @current-change="borrowerList" layout="prev, pager, next" :total="borrowTotal" :page-size='5'>
								</el-pagination>
							</div>
						</div>

					</el-tab-pane>
				</el-tabs>
			</div>

			<!-- 出借记录 -->
			<!-- title -->
			<div class="investTitle" v-if="!p2p">
				<i></i>出借记录
				<span>Investment record</span>
				<!-- <router-link to="/myAccount/investRecord" >查看更多<i class="el-icon-arrow-right"></i></router-link> -->
			</div>
			<div class="invest-record" v-if="!p2p">
				<el-table :data="investorsList" style="width: 100%">
					<div slot="empty" class="table-empty">
						<img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png" />
					</div>
					<el-table-column type="index" label="序号" align='center' width="150px">
					</el-table-column>
					<el-table-column prop="userName" label="出借人" align='center' width="170px">
					</el-table-column>
					<el-table-column prop="money" label="出借金额" align='center' width="180px">
					</el-table-column>
					<el-table-column label="使用奖励" align='center' width="365px">
						<template scope="scope">
							<el-popover trigger="hover" placement="bottom-start">
								<p>红包: ￥{{scope.row.usedRedMoney}}元</p>
								<div slot="reference" class="name-wrapper">
									<el-tag color='#fc4147' v-if="scope.row.usedRedMoney">红包</el-tag>
									<el-tag color='#ccc' v-else>红包</el-tag>
								</div>
							</el-popover>
							<!-- <el-popover trigger="hover" placement="bottom-start">
								<p>体验券: ￥{{scope.row.usedExperienceMoney}}元</p>
								<div slot="reference" class="name-wrapper">
									<el-tag color='#fc4147' v-if="scope.row.usedExperienceMoney">体验券</el-tag>
									<el-tag color='#ccc' v-else>体验券</el-tag>
								</div>
							</el-popover> -->
							<el-popover trigger="hover" placement="bottom-start">
								<p>加息券: {{scope.row.usedUpRate}}%</p>
								<div slot="reference" class="name-wrapper">
									<el-tag color='#fc4147' v-if="scope.row.usedUpRate">加息券</el-tag>
									<el-tag color='#ccc' v-else>加息券</el-tag>
								</div>
							</el-popover>
						</template>
					</el-table-column>
					<el-table-column prop="tenderTime" label="出借时间" align='center' width="242px">
					</el-table-column>
				</el-table>

				<!-- 分页 -->
				<div class="fenye fr" v-if='invesTotalStatus'>
					<el-pagination @current-change="InvestorList" layout="prev, pager, next" :total="invesTotal" :page-size='5'>
					</el-pagination>
				</div>
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
		<el-dialog	title="温馨提示"	:visible.sync="noRisk"	size="tiny"  top="300px"
						:show-close="false" :close-on-click-modal="false" custom-class="riskDialog">
			<div>
					<span>{{riskMsg1}}</span>
					<p style="color: grey;marginTop:20px">{{riskMsg2}}</p>
					<div slot="footer" class="dialog-footer">
						<el-button @click="openInvest">去出借</el-button>
						<router-link to="/riskAssessment/riskAssessment"><el-button type="primary">去测评</el-button></router-link>
					</div>
			</div>
		</el-dialog>
		<choice-red v-if='choiceRed' @choiceRed='choiceRed=$event' @submitRed='selectedRed' :redId="redId" :redMoney="redMoney" @sigeinfo="sigeinfo" :uuid='uuid' :investAccount='sum' :assetManageType='assetManageType'>
		</choice-red>
		<!-- <choice-experience v-if='choiceExperience' @experience='choiceExperience=$event' @submitCoupon='selectedCoupon' @sigeinfo="sigeinfo" :uuid='uuid' :investAccount='sum' :assetManageType='assetManageType'> -->
		</choice-experience>
		<choice-uprate v-if='choiceUprate' @uprate='choiceUprate=$event' @submitUprate='selectedAddApr' @sigeinfo="sigeinfo" :addAprId="addAprId" :addApr="addApr"  :uuid='uuid' :investAccount='addAprAccount' :assetManageType='assetManageType'>
		</choice-uprate>
		<code-dialog v-if="showMessage.openClose" title="债转通知短信关闭验证" :phone="borrowDetail.zsBindPhone" :getCode="changePhone" :confirm="closeMessage" :code="code" @closeDialog="closeDialog" ></code-dialog>
	</div>
</template>

<script>
import getUrl from '../../../common/router/getUrl.js'         // 获取登录信息验证
import information from '../template/information.vue';        // 出借详情table基本信息
import informationP2p from '../template/informationP2p.vue';        // 出借详情table基本信息
import conInvest from '../template/conInvest.vue';            // 浙商标的出借弹出框
import conInvestP2p from '../template/conInvestP2p.vue';            // p2p标的出借弹出框
import guarantee from '../template/guarantee.vue';            // 出借详情table安全保障
import riskTip from '../template/riskTip.vue';                // 出借详情table风险提示
import borrowing from '../template/Protocol/borrowingReg';                  // 出借协议
import choiceRed from '../template/invest/choiceRed.vue';                   // 红包弹框
import choiceExperience from '../template/invest/choiceExperience.vue';     // 体验券弹框
import choiceUprate from '../template/invest/choiceUprate.vue';             // 加息券弹框
import codeDialog from '../template/getCodeDialog.vue';            // 获取验证码弹框
export default {
	mixins: [getUrl],
	props: ['sign'],  // 登录框状态
	name: 'detail',
	data() {
		return {
			isSetTradePass:true,          // 是否开通自动出借
			questionAnwser:[],          // 常见问题
			borrowTotalStatus:'',
			p2p: true,                 // 是否点对点标的
			tableData: [],              // 借款人列表
			tableDataP2p: [],              // P2P借款人列表
			borrowTotal: 0,             // 出借人列表总条数
			borroeTotalStatus: true,    // 出借人列表分页是否显示
			activeName: 'first',        // 借款项目详情选项卡默认选第一项
			borrowing: false,           // 协议弹框显示
			conInvest: false,           // 浙商标的出借框开关
			conInvestP2p: false,           // p2p标的出借框开关
			first: "",                  // 首投奖状态
			king: "",                   // 标王奖状态
			last: '',                   // 标尾奖状态
			ruleTxt: '',                // 三重礼规则
			choiceRed: false,           // 红包弹窗打开状态
			choiceExperience: false,    // 体验卷弹窗打开状态
			choiceUprate: false,        // 加息券弹窗打开状态
			experienceUseStatus: '',    // 体验卷可否使用状态
			redUseStatus: '',           // 红包可否使用状态
			uprateUserStatus: '',       // 加息券可否使用状态
			addAprAccount: '',          // 给加息券组件传入的值
			sum: '',                    // 出借输入框金额
			sumMoney: '',               // 使用优惠以后的出借金额
			redId: '',                  // 选取的红包id
			redMoney: 0,                // 选取的红包金额
			addAprId: '',               // 选取的加息券id
			addApr: 0,                 // 选取的加息券加息比例
			voucherAddApr: 0,          // 选取的加息券加息收益
			couponId: '',               // 选取的体验券id
			couponMoney: 0,             // 选取的体验券值

			uuid: '',                   // 当前标的uuid
			fromToken: '',              // 出借的时候防止用户频繁点击token
			borrower: '',               // 借款人有数据就展示  没数据就隐藏
			investorsList: [],          // 出借人列表
			investorsListP2p: [],          // p2p出借人列表
			invesTotal: 0,              // 出借人列表总条数
			invesTotalP2p: 0,              // 出借人列表总条数
			invesTotalStatus: true,     // 出借人列表分页是否显示
			invesTotalStatusP2p: true,     // p2p出借人列表分页是否显示

			investPwd: "",              // 定向标密码
			investDetail: "",           //  浙商标的的弹框传值
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
			urlHref: '',                // 保存当前的url信息传给后台margin-right:22px;
			assetManageType:'',         // 标的类型  1 sina 2 存管 3 p2p
			showMessage:{openClose:false},// 显示弹出关闭债券弹窗
     		code:{msgCode:''}, // 关闭债权验证码
			timer2:null,
			icons:[
				{
					pic:'https://aliyunsso.edspay.com/web/invest/investicon1.png',
					text:'浙商银行存管'
				},
				{
					pic:'https://aliyunsso.edspay.com/web/invest/investicon2.png',
					text:'真实借款人'
				},
				{
					pic:'https://aliyunsso.edspay.com/web/invest/investicon3.png',
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
		// threeRight(n){     //  出借三重礼的hover事件
		// 	if(n==1){      // 移入
		// 		document.getElementsByTagName("body")[0].style.overflow = 'hidden'
		// 		document.getElementsByTagName("body")[0].style.marginRight = '15px'
		// 	}else{         // 移出
		// 		document.getElementsByTagName("body")[0].style.overflow = 'auto'
		// 		document.getElementsByTagName("body")[0].style.marginRight = '0'
		// 	}
		// },
		sigeinfo(val1,val2){
          this.$emit('sigeinfo',val1,val2)
        },
		deleteRow(id){
			this.$router.push({ path: '/invest/leakage', query: { Id: id }})
		},
		handleClick(tab, event) {  // 借款项目详情选项卡切换
			console.log(tab, event);
		},
		choic(val, event) {    // 点击使用优惠券的事件
			if (this.sum != '') {

				// 加息券组件的变量赋值
				this.addAprAccount = {
					sum: this.sum,
					timeType: this.borrowDetail.timeType,
					timeLimit: this.borrowDetail.timeLimit
				}

				val == 'choiceRed' ? this.choiceRed = true : ''
				val == 'choiceExperience' ? this.choiceExperience = true : ''
				val == 'choiceUprate' ? this.choiceUprate = true : ''
			} else {
				this.$message({ message: '请先输入你要出借的金额', type: 'warning' });
			}
		},
		selectedRed(id, money) {  // 接收红包弹框传回的数值
			this.redId = id
			this.redMoney = money
			this.sumMoney = this.sum - money
			$(".form-red a").html('红包：' + this.redMoney + '元')
		},
		selectedAddApr(id, addApr, voucherAddApr) {  // 接收加息券弹框传回的数值
			this.addAprId = id
			this.addApr = addApr
			this.voucherAddApr = voucherAddApr
			$(".form-addApr a").html('加息券：' + this.addApr + '%')
			this.investProfitWhole = 0
			let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100 + this.voucherAddApr * 100) / 100
			this.investProfitWhole = Math.floor(profit * 100) / 100
		},
		selectedCoupon(id, coupon) {  // 接收体验卷弹框传回的数值
			this.couponId = id
			this.couponMoney = coupon
			$(".form-coupon a").html('体验券：' + this.couponMoney + '元')
		},
		investMoney(e) {     // 出借input框的值发生改变触发的事件
			// 正则过滤除了数字的字符
			e.target.value=e.target.value.replace(/[^\d]/g,'');
			e.target.value > this.borrowDetail.remainAmount ? this.sum = this.borrowDetail.remainAmount : this.sum = e.target.value.replace(/[^\d]/g,'');

			this.redId = ''
			this.redMoney = 0
			this.addAprId = ''
			this.addApr = 0
			this.couponId = ''
			this.couponMoney = 0
			this.sumMoney = this.sum
			this.redUseStatus == 1 ? $(".form-red a").html("暂无红包可用") : $(".form-red a").html("请选择红包")
			this.uprateUserStatus == 1 ? $(".form-addApr a").html("暂无加息券可用") : $(".form-addApr a").html("请选加息券")
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
			this.vipAddApr = this.borrowDetail.vipUprateApr
			this.borrowDetail.timeType == 0 ? this.vipInvestProfit = ((this.sum * this.vipAddApr / 100) / 12) * this.borrowDetail.timeLimit : this.vipInvestProfit = ((this.sum * this.vipAddApr / 100) / 360) * this.borrowDetail.timeLimit
			this.vipInvestProfit = Math.floor(this.vipInvestProfit * 100) / 100
			this.investProfitWhole = 0
			let profit = (this.addAprProfit * 100 + this.investProfit * 100 + this.vipInvestProfit * 100) / 100
			this.investProfitWhole = Math.floor(profit * 100) / 100
		},
		investVerification() {
			if (this.sumMoney > this.borrowDetail.useMoney) {     // 出借金额大于账户余额
				this.flag = false
				if (this.borrowDetail.assetManageType == 1) {  // sina的账户余额不足
					if (this.borrowDetail.realNameStatus == 0) {   // 未实名 
						this.$confirm('您尚未开通支付账户，请开通', '出借提示', {
							confirmButtonText: '去开通',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							window.open('/#/myAccount/sinaRealName')
							this.$confirm('亲！当前绑卡成功还是失败', '出借提示', {
								confirmButtonText: '绑卡成功',
								cancelButtonText: '遇到问题',
								type: 'warning'
							}).then(() => {
								this.$router.go(0)
							}).catch(() => {
								this.$router.go(0)
							});
						})
					} else if (this.borrowDetail.bindCardIdStatus == 0) {      // 未绑卡
						this.$confirm('您尚未绑定银行卡，请先绑卡', '出借提示', {
							confirmButtonText: '去绑卡',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							window.open('/#/myAccount/sinaBindCard')
							this.$confirm('亲！当前绑卡成功还是失败', '出借提示', {
								confirmButtonText: '绑卡成功',
								cancelButtonText: '遇到问题',
								type: 'warning'
							}).then(() => {
								this.$router.go(0)
							}).catch(() => {
								this.$router.go(0)
							});
						})
					} else {     // sina的账户余额不足
						this.$confirm('账户余额不足，请先充值', '出借提示', {
							confirmButtonText: '去充值',
							cancelButtonText: '调整金额',
							type: 'warning'
						}).then(() => {
							window.open('/#/myAccount/sinaCharge')
							this.$confirm('请您在打开的新页面中完成充值，完成之前请不要关闭此页面', '出借提示', {
								confirmButtonText: '充值成功',
								cancelButtonText: '遇到问题',
								type: 'warning'
							}).then(() => {
								this.$router.go(0)
							}).catch(() => {
								this.$router.go(0)
							});
						})
					}
				} else {      // 存管标
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
									this.$router.go(0)
								}).catch(() => {
									this.$router.go(0)
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
								this.$router.go(0)
							}).catch(() => {
								this.$router.go(0)
							});
						})
					}
				}
			} else if(this.sumMoney <= 0){
				this.$message({ message: "对不起！实际支付金额不能小于0元", type: 'warning' });
				this.flag = false
			} else {      // 出借金额小于账户余额
				if (this.borrowDetail.remainAmount > this.borrowDetail.minAmount) {   // 剩余金额大于最低可投	
					if (this.sum < this.borrowDetail.minAmount) {   // 出借金额小于最低可投
						this.$message({ message: "出借金额不能小于最低出借(" + this.borrowDetail.minAmount + "元)", type: 'warning' });
						this.flag = false
					} else {  // 出借金额大于最低可投
						if (this.sum > this.borrowDetail.remainAmount) {      // 出借金额大于最低可投
							this.flag = false
							this.$message({ message: "出借金额不能大于剩余金额金额(" + this.borrowDetail.remainAmount + "元)", type: 'warning' });
						} else {  // 出借金额小于最低可投
							if (this.borrowDetail.maxAmount == 0) {
								this.flag = true
							} else {
								if (this.sum > this.borrowDetail.maxAmount) {     // 出借金额大于最高可投
									this.flag = false
									this.$message({ message: "出借金额不能大于出借上限金额(" + this.borrowDetail.maxAmount + "元)", type: 'warning' });
								} else {
									this.flag = true
								}
							}
						}
					}

				} else {   // 剩余金额大于最低可投	
					if (this.sum > this.borrowDetail.remainAmount) {     // 出借金额大于剩余金额
						this.$message({ message: "出借金额不能大于剩余金额(" + this.borrowDetail.remainAmount + "元)", type: 'warning' });
						this.flag = false
					} else if (this.sum < this.borrowDetail.remainAmount) {       // 剩余金额小于最低出借
						this.$message({ message: "剩余金额金额小于最低出借(" + this.borrowDetail.minAmount + "元)，需全部投满", type: 'warning' });
						this.flag = false
					} else {
						this.flag = true
					}
				}
			}
			return this.flag
		},
		investment() {   // 立即出借按钮
			if(this.addAprId && this.redId){
				this.$message({ message: '红包与加息券不可同时使用', type: 'warning' });
				return
			}
			if (this.sum != 0) {
				this.getPhoneStatus()
			} else {
				this.$message({ message: '请先输入你要出借的金额', type: 'warning' });
			}
		},
		// 判断出借
		checkInvest () {
			var _this = this
			if (this.investVerification()) {
					if (_this.investStatus == 4 && !_this.investPwd) {
						_this.$confirm('当前为定向标，请输入定向标密码', '温馨提示', {
							confirmButtonText: '确定',
							showCancelButton: false,
							closeOnClickModal:false,
							type: 'warning'
						}).then(() => {

						})
					} else {
						if (this.borrowDetail.assetManageType == 1) { // sina的标的
							//  防止出借请求重复提交 获取FormToken
							global.http._post(_this, '/getFormToken', { tokenId: _this.fingerprint }, function(data) {
								if (data.body.resCode == 1) {
									_this.fromToken = data.body.resData.formToken
									_this.borrowTenderToken()
									// 提交请求
									let json = {
										borrowTenderToken: _this.getCookie('borrowTenderToken'),
										money: _this.sum,
										uuid: _this.uuid,
										tokenId: _this.fingerprint,
										formToken: data.body.resData.formToken,
										experienceStr: _this.couponId,
										rateInterestStr: _this.addAprId,
										redEnvelopeStr: _this.redId,
										source: 'pc',
										mobileType: 4,
										successRedirectUrl: _this.urlHref,
										pwd: _this.investPwd
									}
									global.http.post(_this, '/sina/invest/tender', json, function(res) {
										if (res.body.resCode == 1) {
											//  弹框提示跳转新的页面
											_this.$confirm('出借需支付金额' + (_this.sum - _this.redMoney) + '元，请前往新浪支付页面，完成支付操作。', '温馨提示', {
												confirmButtonText: '去支付',
												showCancelButton: false,
												closeOnClickModal:false,
												type: 'warning'
											}).then(() => {     //确定
												window.open(res.body.resData.url)
												_this.$confirm('当前出借支付成功还是失败', '温馨提示', {
													confirmButtonText: '出借成功',
													cancelButtonText: '出借失败',
													type: 'warning'
												}).then(() => {
													_this.$router.go(0)
												}).catch(() => {
													_this.$router.go(0)
												});

											})

										} else {
											_this.$message({ message: res.body.resMsg, type: 'warning' });
										}
									})

								} else {
									_this.$message({ message: data.body.resMsg, type: 'warning' });
								}
							})
						// } else if(_this.p2p){ // p2p的标的  
						} else {
							if(this.borrowDetail.isRiskTest == 0){
								this.noRisk = true
								this.riskMsg1 = this.borrowDetail.riskMes.split('|')[0]
								this.riskMsg2 = this.borrowDetail.riskMes.split('|')[1]
							}else if (this.borrowDetail.conformRiskTest == 1){
								this.openRisk = true
								// 用户不符合风险评测结果
							}else{
								this.investDetailP2p = {
									assetManageType:this.assetManageType,
									autoTenderStatus:this.borrowDetail.autoTenderStatus,          // 是否开通自动出借
									isSetTradePass:this.borrowDetail.isSetTradePass,              // 是否设置交易密码
									p2p: _this.p2p,                                   // 是否点对点标的
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
									experienceStr: _this.couponId,                     // 体验券id数组
									rateInterestStr: _this.addAprId,                   // 加息券id
									redEnvelopeStr: _this.redId,                       // 红包id数组
									pwd: _this.investPwd,                              // 定向标的密码
									uuid: _this.uuid,                                   // 标的id	
									isShowAgree:this.borrowDetail.isShowAgree   // 是否勾选协议
								}
								this.conInvestP2p = true
							}
						}
						// }else{  // 浙商的标的   // p2p上线被废弃
						// 	this.investDetail = {
						// 		assetManageType:assetManageType,
						// 		name: this.borrowDetail.name,                     // 标的名称
						// 		timeLimit: this.borrowDetail.timeLimit,           // 借款期限
						// 		apr: this.borrowDetail.apr,                       // 标的年化利率
						// 		addApr: this.borrowDetail.addApr,                 // 标的加息年化利率
						// 		remainAmount: this.borrowDetail.remainAmount,     // 剩余金额
						// 		money: this.sum,                                  // 出借金额
						// 		phone: this.borrowDetail.zsBindPhone,             // 浙商绑定的手机号码
						// 		investProfitWhole: Math.floor(this.investProfitWhole * 100) / 100,        // 预期收益
						// 		redMoney: this.redMoney,                          // 红包金额
						// 		experienceStr: _this.couponId,                     // 体验券id数组
						// 		rateInterestStr: _this.addAprId,                   // 加息券id
						// 		redEnvelopeStr: _this.redId,                       // 红包id数组
						// 		pwd: _this.investPwd,                              // 定向标的密码
						// 		uuid: _this.uuid                                   // 标的id	
						// 	}
						// 	this.conInvest = true
						// }
					}
				}
		},
		// 默认用户评测保守型，打开出借弹窗
		openInvest () {
			this.noRisk = false
			global.http.post(this, "/app/risk/defaultRiskReview", {}, data => {
						if (data.data.resCode == 1) {
								this.borrowDetail.isRiskTest = 1
								if (data.data.resData.maxTimeRiskTest <= this.borrowDetail.timeLimit){
									this.openRisk = true
									this.riskInfo = data.data.resData
									}else {
										this.investDetailP2p = {
											assetManageType:this.assetManageType,
											autoTenderStatus:this.borrowDetail.autoTenderStatus,          // 是否开通自动出借
											isSetTradePass:this.borrowDetail.isSetTradePass,              // 是否设置交易密码
											p2p: this.p2p,                                   // 是否点对点标的
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
											experienceStr: this.couponId,                     // 体验券id数组
											rateInterestStr: this.addAprId,                   // 加息券id
											redEnvelopeStr: this.redId,                       // 红包id数组
											pwd: this.investPwd,                              // 定向标的密码
											uuid: this.uuid,                                   // 标的id	
											isShowAgree: this.borrowDetail.isShowAgree   // 是否勾选协议
									}
									this.conInvestP2p = true
									}
						}else{
							this.$message({ message: data.data.resMsg, type: 'error' });
						}
					})
		},
		init() {
			// 检查token是否过期
			if (!this.getCookie('token')) {
				this.login = false
			} else {
				this.login = true
			}
			let _this = this;

			//查看标的信息
			this.uuid = this.$route.query.uuid
			this.assetManageType == 3 ? this.p2p = true : this.p2p = false
			if (!this.uuid) {
				this.$confirm('当前标的不存在，确认返回出借列表页', '温馨提示', {
					confirmButtonText: '确定',
					showCancelButton: false,
					type: 'warning'
				}).then(() => {
					this.$router.push({ path: '/invest' })
				})
			}

			// 初始化三重礼接口
			this.$http.post(this.ajaxUrl.getUrl(1) + "/tender/rewardInfo", { uuid: this.uuid, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					this.ruleTxt = data.body.resData.ruleTxt
					let lists = data.body.resData.pageInfo.list
					if (lists.length == 0) {
						this.first = false
						this.king = false
						this.last = false
					}
					for (var i = 0; i < lists.length; i++) {
						if (lists[i].type == 0) {
							this.first = lists[i]
						} else if (lists[i].type == 1) {
							this.king = lists[i]
						} else if (lists[i].type == 2) {
							this.last = lists[i]
						}
					}
				} else {

				}
			}, (rest) => {
				// 响应错误回调
			})

			//常见问题
			this.$http.post(this.ajaxUrl.getUrl(1) + "/financePlan/questionAnwser", { uuid: this.uuid, token: this.token }).then((data) => {
				if (data.body.resCode == 1) {
					_this.questionAnwser = data.body.resData.questionAnwser
				} else {

				}
			}, (rest) => {
				// 响应错误回调
			})

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
					if (borrowDetailList.timeToStart > 0) {
						this.showListCountDownTimeFun1(borrowDetailList.timeToStart)
					}
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
					if (borrowDetailList.timeToStart > 0) {  // 倒计时标的状态
						_this.investStatus = 1
					} else if (status == 6 || status == 7 || status == 8 || status == 9) { // 满标状态
						_this.investStatus = 2
					} else if (borrowDetailList.newbieOnly && !borrowDetailList.canTender) {   // 老用户进入新手标的状态
						_this.investStatus = 5
					} else if (status == 1 && borrowDetailList.progress != 100) {  // 正常可出借
						if (borrowDetailList.directional) {  // 定向标状态
							_this.investStatus = 4
						} else {
							_this.investStatus = 3
						}
					} else if (status == 1 && borrowDetailList.progress == 100) {
						_this.investStatus = 2
					}
				} else {
					this.$message({ message: data.body.resMsg, type: 'warning' });
				}
			}, (rest) => {
				// 响应错误回调
			})

			// 检查标的是否可以使用优惠券
			if(this.p2p){
				this.$http.post(this.ajaxUrl.getUrl(1) + "/financePlan/checkCoupon", { planId: this.uuid, token: this.token }).then((data) => {
					if (data.body.resCode == 1) {
						// 体验券使用状态
						_this.experienceUseStatus = data.body.resData.experienceUseStatus
						// 红包使用状态
						_this.redUseStatus = data.body.resData.redUseStatus
						// 加息券使用状态
						_this.uprateUserStatus = data.body.resData.uprateUserStatus
					} else {

					}
				})
			}else{
				this.$http.post(this.ajaxUrl.getUrl(1) + "/borrow/check/favorable", { uuid: this.uuid, token: this.token }).then((data) => {
					if (data.body.resCode == 1) {
						// 体验券使用状态
						_this.experienceUseStatus = data.body.resData.experienceUseStatus
						// 红包使用状态
						_this.redUseStatus = data.body.resData.redUseStatus
						// 加息券使用状态
						_this.uprateUserStatus = data.body.resData.uprateUserStatus
					} else {

					}
				})
			}
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
			let _this = this
			if(this.p2p){    // p2p标列表
				this.$http.post(this.ajaxUrl.getUrl(1) + "/financePlan/tenderList", { planId: this.uuid, pageNum: n, pageSize: 5, token: this.token }).then((data) => {
					if (data.body.resCode == 1) {
						_this.investorsListP2p = data.body.resData.pageInfo.list
						_this.invesTotalP2p = data.body.resData.pageInfo.total
						data.body.resData.pageInfo.total > 4 ? _this.invesTotalStatus = true : _this.invesTotalStatus = false
					} else {
						_this.$message({ message: data.body.resMsg, type: 'warning' });
					}
				})
			}else{
				this.$http.post(this.ajaxUrl.getUrl(1) + "/sina/invest/tenderList", { uuid: this.uuid, pageNum: n, pageSize: 5, token: this.token }).then((data) => {
					if (data.body.resCode == 1) {
						_this.investorsList = data.body.resData.pageInfo.list
						_this.invesTotal = data.body.resData.pageInfo.total
						data.body.resData.pageInfo.total > 4 ? _this.invesTotalStatus = true : _this.invesTotalStatus = false
					} else {
						_this.$message({ message: data.body.resMsg, type: 'warning' });
					}
				})
			}
			
		},

		borrowList(n) {  //  借款人列表
			let _this = this
			if(this.p2p){  //this.uuid
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
			}else{
				this.$http.post(this.ajaxUrl.getUrl(1) + "/borrow/user/list", { uuid: this.uuid, pageNum: n, pageSize: 5, token: this.token }).then((data) => {
					if (data.body.resCode == 1) {
						_this.tableData = data.body.resData.pageInfo.list
						_this.borrowTotal = data.body.resData.pageInfo.total
						data.body.resData.pageInfo.total > 5 ? _this.borrowTotalStatus = true : _this.borrowTotalStatus = false
						data.body.resData.pageInfo.list.length == 0 ? this.borrower = false : this.borrower = true

					} else {
						_this.$message({ message: data.body.resMsg, type: 'warning' });
					}
				})
			}
		},
		borrowTenderToken() {     //  保存本地生成的随机数
			this.setCookie('borrowTenderToken', (new Date()).getTime(), (1000 * 60 * 1000))
		},
		showListCountDownTimeFun1(sys_second2) { // 倒计时标的的显示
			let _this = this
			clearInterval(_this.timer2);
			_this.timer2 = setInterval(function() {
				if (sys_second2 > 1) {
					sys_second2 -= 1;
					var day2 = Math.floor((sys_second2 / 3600) / 24);
					var hour2 = Math.floor((sys_second2 / 3600) % 24);
					var minute2 = Math.floor((sys_second2 / 60) % 60);
					var second2 = Math.floor(sys_second2 % 60);
					var showDay2 = day2;
					var showHour2 = hour2 < 10 ? "0" + hour2 : hour2; //计算小时
					var showMinute2 = minute2 < 10 ? "0" + minute2 : minute2; //计算分钟
					var showSecond2 = second2 < 10 ? "0" + second2 : second2; //计算秒杀
					$("#showTime1").eq(0).html('<span>' + showDay2 + '天：</span><span>' + showHour2 + '时：</span><span>' + showMinute2 + '分：</span><span>' + showSecond2 + '秒</span>');
				} else {
					clearInterval(_this.timer2);
					_this.investStatus = 3
					// var paths = window.location.pathname;
					// var sear = window.location.search;
					// window.location.href = paths + sear; // 获取当前路由
				}
			}, 1000);
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
		this.$route.query.assetManageType ? this.assetManageType = this.$route.query.assetManageType : this.assetManageType = ""
	},
	mounted: function() {
		this.init()
		this.borrowList(1)
		this.listOfInvestors(1)
		this.urlHref = window.location.href
	},
	beforeDestroy: function() {
		clearInterval(this.timer2)
		$(".showTime1").eq(0).html("")
	},
	components: {
		'information': information,
		'informationP2p': informationP2p,
		"conInvest": conInvest,
		"conInvestP2p": conInvestP2p,
		'guarantee': guarantee,
		'riskTip': riskTip,
		'borrowing': borrowing,
		'choiceRed': choiceRed,
		'choiceExperience': choiceExperience,
		'choiceUprate': choiceUprate,
		'code-dialog': codeDialog,
	},
}
</script>

<style lang="scss">
/*表格*/
.invest-record,.borrowerList{
	.el-table th {
		background-color: #F5FAFF;
	}
	.el-table td, .el-table th.is-leaf {
		border-bottom: 1px solid #F5FAFF;
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
		color: #666666;
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
.fr {
	text-align: right;
	margin: 35px 0 0 -40px;
	float: none;
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
	padding-top: 30px;
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
		width: 1194px;
		height: 330px;
		margin: 0 auto;
		box-shadow: 0 2px 12px 0 rgba(150,150,150,0.23);
		border: solid 1px rgba(0, 0, 0, 0.05);
		.topLeft {
			width: 776px;
			height: 330px;
			float: left;
			padding: 0 20px;
			.borrowtype {
				margin-left: 60px;
				div{
					padding: 0px 9px;
					font-size: 14px;
					text-align: center;
					display: inline-block;
					border-radius: 2px;
					margin-right: 15px;
				}
				.investStatus {
					color: #FFFFFF;
					background-color: #7ac5ff;
				}
			}
			.topTitle {
				width: 100%;
				height: 80px;
				padding: 15px 35px;
				box-sizing: border-box;
				border-bottom: solid 1px rgba(0, 0, 0, 0.05);
				display: flex;
				flex-direction: row;
				align-items: center;
				.BDname {
					float: left;
					width: auto;
					height: 50px;
					font-size: 22px;
					line-height: 50px;
					text-align: center;
					color: #333333;
					margin: 0 10px;
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
					text-align: center;
					color: #666;
					font-size: 14px;
					.topVal {
						width: 100%;
						font-size: 52px;
						text-align: center;
						color: #333333;
						margin-top: 25px;
						font-family: DIN-Bold;
						em {
							font-size: 32px;
						}
					}
					.cl {
						font-size: 52px;
						color: #fc4147
					}
					.butttomKey {
						width: 100%;
						font-size: 16px;
						text-align: center;
						color: #999;
						margin-top: 5px;
					}
				}
			}
			.bottomList {
				width: 100%;
				padding: 0 35px;
				display: flex;
				flex-direction: row;
				font-size: 14px;
				color: #333333;
				margin-top: 68px;
				.icon-div {
					margin-right: 64px;
					span {
						margin-left: 8px;
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
			padding: 32px 30px 40px 22px;
			float: left;
			background: #fff;
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
						font-size: 16px;
						color: #333333;
						.right-amount {
							color: #EF4B31;
						}
					}
					.mt80 {
						margin-top:80px;
						margin-bottom: 10px;
					}
				}
				.right-right {
					.right-btn {
						border: 1px solid #EF4B31;
						color: #EF4B31;
					}
			}
			}
			.invest-input {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin-top: 60px;
				.lend-btn {
					background: #EF4B31;
					color: #FFFFFF;
				}
			}
			
			#moneyIuput {
				border: 1px solid #DDD;
				width: 210px;
				height: 40px;
				padding-left: 10px;
				font-size: 14px;
			}
			#investPwd {
				border: 1px solid #eee;
				width: 351px;
				height: 40px;
				margin-left: 20px;
				padding-left: 15px;
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
			.discount {
				width: 100%;
				margin-top: 30px;
				height: 40px;
				span {
					width: 134px;
					height: 40px;
					border-radius: 4px;
					float: left;
					margin-right: 10px;
					background: url(https://aliyunsso.edspay.com/web/invest/nocheck.png) center center no-repeat;
					a {
						line-height: 40px;
						text-align: center;
						font-size: 16px;
						color: #ccc;
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				span.active {
					background: url(https://aliyunsso.edspay.com/web/invest/check.png) center center no-repeat;
					a {
						color: #fc4147;
					}
				}
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
				font-size: 18px;
				color: #333333;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				em {
					font-size: 20px;
					color: #333;
				}
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
			.balance {
				width: 100%;
				font-size: 14px;
				text-align: center;
				color: #666666;
				margin: 4px auto 13px;
				em {
					font-size: 14px;
					color: #333;
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
							font-size: 30px;
							color: #7ac5ff;
						}
					}
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


		.topRight.fixed {
			.investName {
				margin-top: 24px;
			}
			#investPwd {
				margin-bottom: 9px;
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
				border: 0;
				margin-bottom: 40px;
			}
			.el-table::after {
				background-color: #fff;
			}
			.el-table::before {
				background-color: #F5FAFF;
			}
		}
		.detailsItems {
			width: 1196px;
			height: auto;
			padding: 0 40px 0px;
			background-color: #ffffff;
			box-shadow: 0 2px 12px 0 rgba(150, 150, 150, 0.23);
			border: solid 1px rgba(0, 0, 0, 0.05);
			overflow: hidden;
			.el-tabs__nav {
				width: 400px;
				.el-tabs__active-bar {
					background: #fc4147;
				}
				.el-tabs__item {
					height: 70px;
					line-height: 70px;
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
				padding: 0 0 0 15px;
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
				border: 0;
			}
			.el-table::after {
				background-color: #fff;
			}
			.el-table::before {
				background-color: #F5FAFF;
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
		margin-left: -15px;
		overflow: hidden;
		ul{
			width: 100%;
			height: auto;
			overflow: hidden;
			padding-bottom:50px;
			li{
				width: 100%;
				border-bottom: 1px dashed  #E7E7E7;
				padding: 30px 0 20px;
				p.q{
					width: 100%;
					line-height: 25px;
					font-family: PingFangSC-Regular;
					font-size: 18px;
					color: #333333;
					margin-bottom: 22px;
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
					line-height: 25px;
					font-family: PingFangSC-Regular;
					font-size: 14px;
					color: #999;
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
