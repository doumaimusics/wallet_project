import Vue from 'vue'
import VueRouter from 'vue-router'


import fail from '../components/pc/404.vue' // 404页面
const master = r => require.ensure([], () => r(require('../../src/master.vue')), 'master')
const pcEntrance = r => require.ensure([], () => r(require('../components/pc/pcEntrance.vue')), 'pcEntrance') // 我的首页
const home = r => require.ensure([], () => r(require('../components/pc/home.vue')), 'home') // 我的首页
const myAccount = resolve => require(['../components/pc/myAccount/myAccount.vue'], resolve) // 我的账户
const riskEducation = resolve => require(['../components/pc/risk/riskEducation.vue'], resolve) // 风险教育二期
const approval = resolve => require(['../components/pc/approval/approval.vue'], resolve) // 备案进程
const legislation = resolve => require(['../components/pc/risk/legislation.vue'], resolve) // 法律法规
const knowledge = resolve => require(['../components/pc/risk/knowledge.vue'], resolve) // 网贷知识
const news = resolve => require(['../components/pc/risk/news.vue'], resolve) // 行业新闻
const video = resolve => require(['../components/pc/risk/video.vue'], resolve) // 视屏详情
const newsDetails = resolve => require(['../components/pc/risk/newsDetails.vue'], resolve) // 行业新闻详情
const openAccountSuc = resolve => require(['../components/pc/myAccount/option/openAccountSuc.vue'], resolve) // 开户成功
const openAccountFail = resolve => require(['../components/pc/myAccount/option/openAccountFail.vue'], resolve) // 开户失败
const realNameSuc = resolve => require(['../components/pc/myAccount/option/realNameSuc.vue'], resolve) // 实名成功
const realNameFail = resolve => require(['../components/pc/myAccount/option/realNameFail.vue'], resolve) // 实名失败
const unbindCard = resolve => require(['../components/pc/myAccount/openAccount/unbindCard.vue'], resolve) // 解绑银行卡
const sinaBindCard = resolve => require(['../components/pc/myAccount/openAccount/sinaBindCard.vue'], resolve) // 新浪绑卡
const sinaRealName = resolve => require(['../components/pc/myAccount/openAccount/sinaRealName.vue'], resolve) // 新浪实名
const openAccount = resolve => require(['../components/pc/myAccount/openAccount/openAccount.vue'], resolve) // 浙商开户

const sinaCharge = resolve => require(['../components/pc/myAccount/charge/sinaCharge.vue'], resolve) // 新浪
const sinaWithDraw = resolve => require(['../components/pc/myAccount/charge/sinaWithDraw.vue'], resolve) // 浙商开户

const accountCharge = resolve => require(['../components/pc/myAccount/accountCharge.vue'], resolve) // 账户充值
const RechargeProcess = resolve => require(['../components/pc/myAccount/RechargeProcess.vue'], resolve) // 手机转账流程
const accountWithdraw = resolve => require(['../components/pc/myAccount/accountWithdraw.vue'], resolve) // 账户提现
const accountHome = resolve => require(['../components/pc/myAccount/accountHome.vue'], resolve) // 账户首页
const accountAsset = resolve => require(['../components/pc/myAccount/accountAsset.vue'], resolve) // 我的资产
const accountDetail = resolve => require(['../components/pc/myAccount/accountDetail.vue'], resolve) // 资金记录
const investRecord = resolve => require(['../components/pc/myAccount/investRecord.vue'], resolve) // 出借记录
const investDetails = resolve => require(['../components/pc/myAccount/investRecordDetail.vue'], resolve) // p2p出借记录详情
const myBackPlan = resolve => require(['../components/pc/myAccount/myBackPlan.vue'], resolve) // 回款计划
const accountCard = resolve => require(['../components/pc/myAccount/accountCard.vue'], resolve) // 我的银行卡
const mySetting = resolve => require(['../components/pc/myAccount/mySetting.vue'], resolve) // 我的设置
const myCoupon = resolve => require(['../components/pc/myAccount/myCoupon.vue'], resolve) // 我的优惠券
const VipBenefits = resolve => require(['../components/pc/myAccount/VipBenefits.vue'], resolve) // 会员福利
const myMessage = resolve => require(['../components/pc/myAccount/myMessage.vue'], resolve) // 我的信息
const myInvatation = resolve => require(['../components/pc/myAccount/myInvatation.vue'], resolve) // 我的邀请
const myNewInvatation = resolve => require(['../components/pc/myAccount/myNewInvatation.vue'], resolve) // 我的邀请2.0
const activityArea = resolve => require(['../components/pc/myAccount/activityArea.vue'], resolve) // 活动专区
const chargeOption = resolve => require(['../components/pc/myAccount/option/chargeOption.vue'], resolve) // 充值中间页
const withDrawOption = resolve => require(['../components/pc/myAccount/option/withDrawOption.vue'], resolve) // 提现中间页
const zsHandSuc = resolve => require(['../components/pc/myAccount/option/zsHandSuc.vue'], resolve) // 浙商提现成功
const zsChargeSuc = resolve => require(['../components/pc/myAccount/option/zsChargeSuc.vue'], resolve) // 浙商充值成功
const zsChargeInHand = resolve => require(['../components/pc/myAccount/option/zsChargeInHand.vue'], resolve) // 浙商充值处理中
const zsDrawInHand = resolve => require(['../components/pc/myAccount/option/zsDrawInHand.vue'], resolve) // 浙商提现处理中
const drawFail = resolve => require(['../components/pc/myAccount/option/drawFail.vue'], resolve) // 提现失败
const drawHand = resolve => require(['../components/pc/myAccount/option/drawHand.vue'], resolve) // 提现进行中
const drawSuc = resolve => require(['../components/pc/myAccount/option/drawSuc.vue'], resolve) // 提现成功
const invest = resolve => require(['../components/pc/invest/invest.vue'], resolve) // 出借列表
const detail = resolve => require(['../components/pc/invest/detail.vue'], resolve) // 出借详情
const leakage = resolve => require(['../components/pc/invest/leakage.vue'], resolve) // p2p借款人详情页
const result = resolve => require(['../components/pc/invest/result.vue'], resolve) // 出借详情浙商结果页
const balance = resolve => require(['../components/pc/invest/balance.vue'], resolve) // 余额转移结果页

const notice = resolve => require(['../components/pc/about/platform/notice.vue'], resolve) // 网站公告详情页
const reportDetails = resolve => require(['../components/pc/about/platform/reportDetails.vue'], resolve) // 数据报告详情页
const newReportDetails = resolve => require(['../components/pc/template/newReport/new_reportDetails.vue'], resolve) // 新的数据报告详情页
const newsReport = resolve => require(['../components/pc/about/platform/newsReport.vue'], resolve) // 媒体报道详情页
const disclosure = resolve => require(['../components/pc/about/disclosure.vue'], resolve) // 信息披露二级
const registrationProcess = resolve => require(['../components/pc/about/platform/registrationProcess.vue'], resolve) // 查看备案信息
const aboutUs = resolve => require(['../components/pc/about/aboutUs.vue'], resolve) // 关于我们
const introduction = resolve => require(['../components/pc/about/introduction.vue'], resolve) // 平台介绍头部
const abstract = resolve => require(['../components/pc/about/platform/abstract.vue'], resolve) // 平台介绍
const team = r => require.ensure([], () => r(require('../components/pc/about/platform/team.vue')), 'team') // 管理团队
const information = resolve => require(['../components/pc/about/platform/information.vue'], resolve) // 基本信息
const teamMien = resolve => require(['../components/pc/about/platform/teamMien.vue'], resolve) // 团队风采
const certificate = resolve => require(['../components/pc/about/platform/certificate.vue'], resolve) // 资质证书
const coverage = resolve => require(['../components/pc/about/coverage.vue'], resolve) // 媒体报道
const history = r => require.ensure([], () => r(require('../components/pc/about/platform/history.vue')), 'history') // 发展历程
const Emeeting = resolve => require(['../components/pc/about/platform/Emeeting.vue'], resolve) // E友见面会
const matter = resolve => require(['../components/pc/about/platform/matter.vue'], resolve) // 重大事项
const contactUs = r => require.ensure([], () => r(require('../components/pc/about/contactUs.vue')), 'contactUs') // 基本信息
const commonProblem = r => require.ensure([], () => r(require('../components/pc/about/commonProblem.vue')), 'commonProblem') // 运营报告
const announcement = r => require.ensure([], () => r(require('../components/pc/about/announcement.vue')), 'announcement') // 网站公告
const laws = resolve => require(['../components/pc/about/platform/laws.vue'], resolve) // 法律法规
const security = r => require.ensure([], () => r(require('../components/pc/about/platform/security.vue')), 'security') // 银行存管
const control = r => require.ensure([], () => r(require('../components/pc/about/platform/control.vue')), 'control') // 风控体系
const activeArea = resolve => require(['../components/pc/about/platform/activeArea.vue'], resolve) // 活动专区模板
const guide = resolve => require(['../components/pc/about/guide.vue'], resolve); // 安全保障
const commitment = resolve => require(['../components/pc/about/platform/commitment.vue'], resolve) // 法人承诺函
const makePublic = r => require.ensure([], () => r(require('../components/pc/about/makePublic/makePublic.vue')), 'makePublic') // 信息披露
const websiteMap = resolve => require(['../components/pc/about/websiteMap.vue'], resolve); //网站地图
const pcBorrow = resolve => require(['../components/pc/borrow/pcBorrow.vue'], resolve); //我要借款

// 帮助中心
const help = resolve => require(['../components/pc/activity/help.vue'], resolve) // 帮助中心
const helpQA = resolve => require(['../components/pc/activity/helpQA.vue'], resolve) // 帮助中心-问答页
const Eplan = resolve => require(['../components/pc/activity/operationalData/Eplan.vue'], resolve); // E计划活动
const YearData = resolve => require(['../components/pc/activity/operationalData/2017YearData.vue'], resolve); // 2017年度运营报告
const largePay = resolve => require(['../components/pc/activity/largePay.vue'], resolve)

const threeCardPc = resolve => require(['../components/pc/myAccount/threePages/threeCardPc.vue'], resolve); // 银行卡三类
const bankLimit = resolve => require(['../components/pc/myAccount/threePages/bankLimit.vue'], resolve) // 限额说明

const myEnroll = resolve => require(['../components/pc/activity/myEnroll.vue'], resolve) // 新手专享
    // 活动页面邀请注册页面
const reg = resolve => require(['../components/pc/activity/invitePc.vue'], resolve); // PC邀请页



const refactoringGuide = resolve => require(['../components/pc/activity/despositiry/refactoringGuide.vue'], resolve) // 存管开通流程
const license = resolve => require(['../components/pc/activity/license.vue'], resolve) // 经营许可证
const mainVenuePc = resolve => require(['../components/pc/activity/mainVenue/mainVenuePc.vue'], resolve) // 主会场
const mainVenuePc2 = resolve => require(['../components/pc/activity/mainVenue/mainVenuePc2.vue'], resolve) // 主会场2
const mainVenuePc3 = resolve => require(['../components/pc/activity/mainVenue/mainVenuePc3.vue'], resolve) // 主会场2\
const riskAssessment = resolve => require(['../components/pc/activity/riskAssessment/riskAssessment.vue'], resolve) // 风险测评
const assessmentInfo = resolve => require(['../components/pc/risk/assessmentInfo.vue'], resolve) // 风险测评介绍

const luckyDrawForeign = resolve => require(['../components/pc/activity/luckyDraw/luckyDrawForeign.vue'], resolve) // 主会场2\
const pcVipLandPage = resolve => require(['../components/pc/activity/vipLandPage/pcVipLandPage.vue'], resolve) // vip落地页
const inviteIndex = resolve => require(['../components/pc/activity/newInvite/inviteIndex.vue'], resolve) // 邀请升级

// 渠道
const commonTemp = resolve => require(['../components/pc/activity/channel/commonTemp.vue'], resolve) // 统一pc端模板

// 活动
const guidance = resolve => require(['../components/pc/activity/activityPC/guidance.vue'], resolve) // pc

const authorized = resolve => require(['../components/pc/tzj/authorized.vue'], resolve) // 投之家授权页
const pageMiddle = resolve => require(['../components/pc/tzj/pageMiddle.vue'], resolve) // 投之家点对点跳转页面
const wdtyAuthorized = resolve => require(['../components/pc/wdty/authorized.vue'], resolve) // 网贷天眼授权页
const wdtyPageMiddle = resolve => require(['../components/pc/wdty/pageMiddle.vue'], resolve) // 网贷天眼点对点跳转页面

const toInvestMiddle = resolve => require(['../components/pc/xhzt/toInvestMiddle.vue'], resolve) // 网贷天眼点对点跳转页面

const census = resolve => require(['../components/pc/invest/census.vue'], resolve) // 白名单统计页面
const interestRaiseStandard = resolve => require(['../components/pc/activity/interestRaiseStandard.vue'], resolve) // 加息券活动
const thanksgivingDayPc = resolve => require(['../components/pc/activity/thanksgivingDay/thanksgivingDayPc.vue'], resolve) // 感恩节活动
const christmasAanNewYear = resolve => require(['../components/pc/activity/christmasAanNewYear/christmasAanNewYear.vue'], resolve) // 红包机圣诞活动
const newYearDay = resolve => require(['../components/pc/activity/newYearDay/newYearDay.vue'], resolve) // 红包机元旦活动
const nianyKind = resolve => require(['../components/pc/activity/nianyKind/nianyKind.vue'], resolve) // 红包机年货盛宴，约战新年活动PC
const iceSnowCarnival = resolve => require(['../components/pc/activity/iceSnowCarnival/iceSnowCarnival.vue'], resolve) // 冰雪嘉年华PC
const goodLuckInAYear = resolve => require(['../components/pc/activity/goodLuckInAYear/goodLuckInAYear.vue'], resolve) // 开年赢鸿运PC
const theNewYearAboutWar = resolve => require(['../components/pc/activity/theNewYearAboutWar/theNewYearAboutWar.vue'], resolve) // 约战新年PC
const pcComplianceDisclosure = resolve => require(['../components/pc/activity/complianceDisclosure/pcComplianceDisclosure.vue'], resolve) // 合规进程披露
const pcInviteTrave = resolve => require(['../components/pc/activity/pcInviteTravel/pcInviteTravel.vue'], resolve) // 邀请旅行
const commandPC = resolve => require(['../components/pc/activity/command/pcLinkPage.vue'], resolve) // 口令红包-pc引导页
const schoolPC = resolve => require(['../components/pc/activity/schoolOpen/pcLinkPage.vue'], resolve) // 开学季活动-pc引导页

const anniversary = resolve => require(['../components/pc/activity/anniversaryTwo/anniversary.vue'], resolve) // 两周年活动-品牌
const elevenPcGuide = resolve => require(['../components/pc/activity/eleven/elevenPcGuide_2018.vue'], resolve) // 钱包满血计划引导页
    // 协议分类
const riskNote = resolve => require(['../components/pc/template/Protocol/riskNote.vue'], resolve) // 风险提示书协议
const authorizedAgree = resolve => require(['../components/pc/template/Protocol/authorized.vue'], resolve) // 用户授权委托书
const transferFund = resolve => require(['../components/pc/template/Protocol/transferFund.vue'], resolve) // 余额转移授权委托书
const services = resolve => require(['../components/pc/template/Protocol/services.vue'], resolve) // 出借服务协议
const loanProtocol = resolve => require(['../components/pc/template/Protocol/loanProtocol.vue'], resolve) // 借款服务协议
const protocol = resolve => require(['../components/pc/template/Protocol/protocol.vue'], resolve) // 后台返回的协议模版
const digitalCertificate = resolve => require(['../components/pc/template/Protocol/digitalCertificate.vue'], resolve) //数字证书服务协议
const electronicSeal = resolve => require(['../components/pc/template/Protocol/electronicSeal.vue'], resolve) //电子签章风险提示
const moneyTransfer = resolve => require(['../components/pc/myAccount/moneyTransfer.vue'], resolve) // 余额转移
const login = resolve => require(['../components/pc/login/login.vue'], resolve) // 登录页面
const register = resolve => require(['../components/pc/login/register.vue'], resolve) // 注册页面
const retrievePwd = resolve => require(['../components/pc/login/retrievePwd.vue'], resolve) // 找回密码
const charity = resolve => require(['../components/pc/activity/charity/charity.vue'], resolve) // 爱心公益活动
const vip = resolve => require(['../components/pc/vip/vip.vue'], resolve); // vip首页
const vipActivity = resolve => require(['../components/pc/vip/vipActivity.vue'], resolve); // 出海寻宝
const chancePc = resolve => require(['../components/pc/activity/618ActivityPc/618ChancePc.vue'], resolve)
const enrol = resolve => require(['../components/pc/activity/supervise/enrol.vue'], resolve)  //  监督委员会报名阶段
const integralNationalDayPc = resolve => require(['../components/pc/activity/integralNationalDayPc/integralNationalDayPc.vue'], resolve)  //  积分商城国庆活动
const zqFestivalPC = resolve => require(['../components/pc/activity/zqFestival/index.vue'], resolve);  // 中秋节活动
const midAddPC = resolve => require(['../components/pc/activity/zqFestival/midAddPC.vue'], resolve);  // 中秋节加场
const gqFestivalGiftPc = resolve => require(['../components/pc/activity/gqFestivalGiftPc/gqFestivalGiftPc.vue'], resolve);  // 2018国庆送礼
const octoberActivity = resolve => require(['../components/pc/activity/octoberActivity/octoberActivity.vue'], resolve);  // 十月活动
const holidayIndex = resolve => require(['../components/pc/activity/everyHoliday/index.vue'], resolve);  // 每逢佳节
const festMain = resolve => require(['../components/pc/activity/festTemplate1/festMain.vue'], resolve);  // 双十一预热&&模板
const thanksgiving = resolve => require(['../components/pc/activity/thanksgiving/thanksgiving.vue'], resolve);  // 感恩有礼
const wdzjAuthorized = resolve => require(['../components/pc/wdzj/authorized.vue'], resolve) // 网贷之家授权页
const vipUpdate = resolve => require(['../components/pc/activity/vipUpdate/vipUpdate.vue'], resolve);  // Vip专属活动
const spendIndex = resolve => require(['../components/pc/activity/drainage/spendIndex.vue'], resolve);  // 花吧宣传页面
const lendIndex = resolve => require(['../components/pc/activity/drainage/lendIndex.vue'], resolve);  // 借吧宣传页面

Vue.use(VueRouter)

export default new VueRouter({
    history: false,
    base: __dirname,
    routes: [{
            path: '/',
            component: master,
            children: [
                { path: '/', redirect: '/pcEntrance' },
                { name: 'home', path: '/home', redirect: '/pcEntrance' },
                { name: 'pcEntrance', path: '/pcEntrance', component: pcEntrance },
                { path: '/risk', redirect: '/risk/riskEducation' },
                { name: 'riskEducation', path: '/risk/riskEducation', component: riskEducation }, // 风险教育二期
                { name: 'approval', path: '/approval', component: approval }, // 备案进程
                { name: 'legislation', path: '/risk/legislation', component: legislation }, // 法律法规
                { name: 'knowledge', path: '/risk/knowledge', component: knowledge }, // 网贷知识
                { name: 'video', path: '/risk/video', component: video }, // 视屏详情
                { name: 'videoShare', path: '/videoShare', component: video }, // 二周年庆典视频PC
                { name: 'news', path: '/risk/news', component: news }, // 行业新闻
                { name: 'newsDetails', path: '/risk/newsDetails', component: newsDetails }, // 行业新闻详情
                { name: 'fail', path: '/404', component: fail }, // 定义404路由
                { name: 'investRedirect', path: '/invest', component: home}, 
                { name: 'invest', path: '/investList', component: invest},
                { name: 'detail', path: '/invest/detail', component: detail },
                { name: 'leakage', path: '/invest/leakage', component: leakage },
                { name: 'pcBorrow', path: '/pcBorrow', component: pcBorrow },
                { path: '/chargeOption', component: chargeOption },
                { path: '/withDrawOption', component: withDrawOption },
                { path: '/withDrawOption', component: withDrawOption },
                { path: '/zsHandSuc', component: zsHandSuc },
                { path: '/zsChargeSuc', component: zsChargeSuc },
                { path: '/zsCharge/inhand', component: zsChargeInHand },
                { path: '/zsDraw/inhand', component: zsDrawInHand},
                { path: '/openAccountFail', component: openAccountFail },
                { path: '/openAccountSuc', component: openAccountSuc },
                { path: '/realNameSuc', component: realNameSuc },
                { path: '/realNameFail', component: realNameFail },
                { path: '/drawSuc', component: drawSuc },
                { path: '/drawHand', component: drawHand },
                { path: '/drawFail', component: drawFail },
                { path: '/guide', component: guide },
                { path: '/info/reportDetails', component: reportDetails },
                { path: '/about/newsReport', component: newsReport },
                { path: '/threeCardPc', component: threeCardPc },
                { path: '/bankLimit', component: bankLimit },
                { path: '/invest/result', component: result },
                { path: '/activityPC/guidance', component: guidance },
                { path: '/balance', component: balance },
                { path: '/tzj/authorized', component: authorized },
                { path: '/tzj/pageMiddle', component: pageMiddle },
                { path: '/wdty/authorized', component: wdtyAuthorized },
                { path: '/wdty/pageMiddle', component: wdtyPageMiddle },
                { path: '/xhzt/toInvestMiddle', component: toInvestMiddle },
                { path: '/interestRaiseStandard', component: interestRaiseStandard },
                { path: '/websiteMap', component: websiteMap },
                { path: '/thanksgiving/thanksgivingDayPc', component: thanksgivingDayPc }, // 感恩节活动
                { path: '/agree/riskNote', component: riskNote }, // 风险提示书协议
                { path: '/agree/authorizedAgree', component: authorizedAgree }, // 用户授权委托书        
                { path: '/agree/transferFund', component: transferFund }, // 余额转移授权委托书        
                { path: '/agree/services', component: services }, // 用户出借服务协议        
                { path: '/agree/loanProtocol', component: loanProtocol }, // 用户借款服务协议        
                { path: '/agree/protocol', component: protocol }, // 后台返回的协议模版 
                { path: '/agree/digitalCertificate', component: digitalCertificate }, // 数字证书服务协议 
                { path: '/agree/electronicSeal', component: electronicSeal }, // 电子签章风险提示 
                { path: '/pc/christmasAanNewYear', component: christmasAanNewYear }, // 红包机圣诞活动
                { path: '/pc/newYearDay', component: newYearDay }, // 红包机元旦活动
                { path: '/pc/nianyKind', component: nianyKind }, // 红包机元旦活动
                { path: '/myAccount/activeArea', component: activeArea }, // 活动专区模板
                { path: '/pc/iceSnowCarnival', component: iceSnowCarnival }, // 冰雪嘉年华活动
                { path: '/pc/goodLuckInAYear', component: goodLuckInAYear }, // 开年赢鸿运
                { path: '/moneyTransfer', component: moneyTransfer }, // 余额转移
                { path: '/pc/theNewYearAboutWar', component: theNewYearAboutWar }, // 约战新年pc
                { path: '/data/pcComplianceDisclosure', component: pcComplianceDisclosure }, // 合规进程披露
                { path: '/pc/pcInviteTravel', component: pcInviteTrave }, // 邀请旅行PC
                { path: '/618ChancePc', component: chancePc }, // 618PC
                { path: '/pc/commandPC', component: commandPC }, // 红包口令-pc引导页
                { path: '/pc/schoolPC', component: schoolPC }, // 开学季活动-pc引导页
                { path: '/activity/zqFestival', component: zqFestivalPC }, // 中秋节活动
                { path: '/zqFestival/add', component: midAddPC }, // 中秋加场
                { path: '/gq/gqFestivalGiftPc', component: gqFestivalGiftPc }, // 2018国庆送礼
                { path: '/pc/integralNationalDayPc', component: integralNationalDayPc }, // 开学季活动-pc引导页
                { path: '/activity/zqFestival', component: zqFestivalPC }, // 开学季活动-pc引导页

                { path: '/everyHoliday/holidayIndex', component: holidayIndex }, // 每逢佳节
                { path: '/registrationProcess', component: registrationProcess }, // 查看备案进程
                { path: '/activity/october', component: octoberActivity }, // 十月活动
                { path: '/festMain/index', component: festMain }, // 节日模板1
                { path: '/festMain2/index', component: festMain }, // 年化节日模板2
                { path: '/activity/vipUpdate', component: vipUpdate }, // Vip专属活动
                { path: '/drainage/spendIndex', component: spendIndex }, // 花吧宣传页面
                { path: '/drainage/lendIndex', component: lendIndex }, // 借吧宣传页面
                
                // 充值提现

                { path: '/myAccount/sinaCharge', component: sinaCharge },
                { path: '/myAccount/sinaWithDraw', component: sinaWithDraw },

                // 开户
                { path: '/myAccount/unbindCard/:id', component: unbindCard },
                { path: '/myAccount/sinaBindCard', component: sinaBindCard },
                { path: '/myAccount/sinaRealName', component: sinaRealName },
                { path: '/myAccount/openAccount', component: openAccount },
                { path: '/myAccount/accountCharge', component: accountCharge },
                { path: '/myAccount/RechargeProcess', component: RechargeProcess },
                { path: '/myAccount/accountWithdraw', component: accountWithdraw },
                { path: '/activity/myEnroll', component: myEnroll },
                { path: '/info/census', component: census },
                { path: '/activity/invitePc', component: reg },
                { path: '/help', component: help },
                { path: '/help/QA', component: helpQA },
                { path: '/largePay', component: largePay },
                { path: '/despositiry/refactoringGuide', component: refactoringGuide },
                { path: '/license', component: license },
                { path: '/mainVenue/mainVenuePc', component: mainVenuePc },
                { path: '/mainVenue/mainVenuePc2', component: mainVenuePc2 },
                { path: '/riskAssessment/riskAssessment', component: riskAssessment },
                { path: '/riskAssessment/assessmentInfo', component: assessmentInfo },//测评介绍页
                { path: '/wx/luckyDrawForeign', component: luckyDrawForeign },
                //vip
                { path: '/vip', component: vip },
                { path: '/vip/treasureIndex', component: vipActivity },
                { path: '/vipLandPage/pcVipLandPage', component: pcVipLandPage }, //vip落地页
                { path: '/inviteIndex', component: inviteIndex }, //邀请升级
                { path: '/mainVenue/mainVenuePc3', component: mainVenuePc3 },
                //  渠道推广链接
                { path: '/data/Eplan', component: Eplan },
                { path: '/channels/:id', component: commonTemp },
                { path: '/data/2017YearData', component: YearData },
                { path: '/login', component: login },
                { path: '/register', component: register },
                { path: '/retrievePwd', component: retrievePwd },
                { path: '/charity', component: charity },
                { path: '/anniversary', component: anniversary },   //两周年活动-品牌
                { path: '/doubleEleven/main', component: elevenPcGuide },   // 钱包满血计划引导页
                { path: '/supervise/enrol', component: enrol },   // 监督委员会报名阶段
                {
                    path: '/myAccount',
                    component: myAccount,
                    children: [
                        { path: '/myAccount', redirect: '/myAccount/accountHome' },   // 路由重定向
                        { path: '/myAccount/charge', component: accountCharge },
                        { path: '/myAccount', component: accountHome },
                        { path: '/myAccount/accountHome', component: accountHome },
                        { path: '/myAccount/accountAsset', component: accountAsset },
                        { path: '/myAccount/accountDetail', component: accountDetail },
                        { path: '/myAccount/investRecord', component: investRecord },
                        { path: '/myAccount/investRecord/detail', component: investDetails },
                        { path: '/myAccount/accountCard', component: accountCard },
                        { path: '/myAccount/mySetting', component: mySetting },
                        { path: '/myAccount/myCoupon', component: myCoupon },
                        { path: '/myAccount/VipBenefits', component: VipBenefits },
                        { path: '/myAccount/myMessage', component: myMessage },
                        { path: '/myAccount/myInvatation', component: myInvatation },
                        { path: '/myAccount/myNewInvatation', component: myNewInvatation },
                        { path: '/myAccount/activityArea', component: activityArea },
                        { path: '/myAccount/myBackPlan', component: myBackPlan }
                    ]
                },
                {
                    name: 'aboutUs',
                    path: '/info',
                    component: aboutUs,
                    children: [{
                            path: '/info/about',
                            component: introduction,
                            children: [
                                { path: '/info', redirect: '/info/disclosure' },
                                { path: '/info/about', redirect: '/info/about/information' },
                                { path: '/info/about/abstract', component: abstract },
                                { path: '/info/about/information', component: information },
                                { path: '/info/about/team', component: team },
                                { path: '/info/about/teamMien', component: teamMien },
                                { path: '/info/about/certificate', component: certificate },
                                { path: '/info/about/commitment', component: commitment },
                            ]
                        },

                        { path: '/info/registrationProcess', component: registrationProcess },//备案进程
                        { path: '/info/riskEducation', component: riskEducation },//风险教育

                        { path: '/info/dynamic/coverage/notice', component: notice }, // 公司动态 > 媒体报道 
                        { path: '/info/notice/announcement/notice', component: notice }, // 对外公告 > 网站公告
                        { path: '/info/data/commonProblem/notice', component: notice }, // 运营数据 > 运营报告
                        { path: '/info/dynamic/Emeeting/notice', component: notice }, // 公司动态 > E友见面会
                        { path: '/about/notice', component: notice },

                        { path: '/info/dynamic', redirect: '/info/dynamic/coverage' },
                        { path: '/info/dynamic/coverage', component: coverage },
                        { path: '/info/dynamic/history', component: history },
                        { path: '/info/dynamic/Emeeting', component: Emeeting },
                        { path: '/info/dynamic/matter', component: matter },

                        { path: '/info/notice', redirect: '/info/notice/announcement' },
                        { path: '/info/notice/announcement', component: announcement },
                        { path: '/info/notice/laws', component: laws },

                        { path: '/info/data', redirect: '/info/data/makePublic' },
                        { path: '/info/data/commonProblem', component: commonProblem },
                        { path: '/info/data/makePublic', component: makePublic },

                        { path: '/info/security', redirect: '/info/security/custody' },
                        { path: '/info/security/custody', component: security },
                        { path: '/info/security/control', component: control },

                        { path: '/info/contactUs', component: contactUs },

                        { path: '/info/disclosure', component: disclosure },
                    ]
                },
                { path: '/activity/thanksgiving', component: thanksgiving }, // 感恩有礼
                { path: '/wdzjAuthorized', component: wdzjAuthorized }, // 网贷之家授权页
            ]
        },
        { path: '/info/newReportDetails', component: newReportDetails },
        { path: '*', redirect: '/404' } // 重定向路由
    ]
})