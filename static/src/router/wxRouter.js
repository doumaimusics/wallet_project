import Vue from 'vue';
import VueRouter from 'vue-router';

import wxEntrance from '../../src/wx.vue'

const wxIndex = r => require.ensure([], () => r(require('../components/wx/open/wxIndex.vue')), 'indexTab') //首页
const wxInvest = r => require.ensure([], () => r(require('../components/wx/open/wxInvest.vue')), 'wxInvest') //标的列表组件
const wxFind = r => require.ensure([], () => r(require('../components/wx/open/wxFind.vue')), 'wxFind') //发现组件
const wxFindChild = r => require.ensure([], () => r(require('../components/wx/open/wxFindChild.vue')), 'wxFind') //活动专区-精彩活动组件
const wxLogin = r => require.ensure([], () => r(require('../components/wx/open/wxLogin.vue')), 'indexTab') //登录组件
const wxRegister = r => require.ensure([], () => r(require('../components/wx/open/wxRegister.vue')), 'indexTab') //注册组件
const wxRegisterNew = r => require.ensure([], () => r(require('../components/wx/open/wxRegisterNew.vue')), 'register') //注册组件新
const wxRegisterSet = r => require.ensure([], () => r(require('../components/wx/open/wxRegisterSet.vue')), 'register') //注册设置密码
const wxRegisterSucc = r => require.ensure([], () => r(require('../components/wx/open/wxRegisterSucc.vue')), 'register') //注册设置成功

const wxAnnouncement = r => require.ensure([], () => r(require('../components/wx/open/wxAnnouncement.vue')), 'indexTab') //网站公告
const wxNotice = r => require.ensure([], () => r(require('../components/wx/open/wxNotice.vue')), 'wxNotice') //常见问题
const newTask = r => require.ensure([], () => r(require('../components/wx/open/newTask.vue')), 'newTask') //新手任务
const wxNeedBorrow = r => require.ensure([], () => r(require('../components/wx/open/wxNeedBorrow.vue')), 'wxNeedBorrow') //我要借款


const wxInvestAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxInvestAgreement.vue')), 'agreement') //出借服务协议
const wxValueAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxValueAgreement.vue')), 'agreement') //增值服务协议
const wxFinancing = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxFinancing.vue')), 'agreement') //增值服务协议

const wxBorrowAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxBorrowAgreement.vue')), 'agreement') //借款协议
const wxBondsTransferAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxBondsTransferAgreement.vue')), 'agreement') //债权转让协议
const wxDcPlanServiceAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxDcPlanServiceAgreement.vue')), 'agreement') //定存计划服务协议
const wxRegisterAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxRegisterAgreement.vue')), 'agreement') //注册协议
const wxZSdealAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxZSdealAgreement.vue')), 'agreement') //浙商交易协议
const wxZSentrustAgreement = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxZSentrustAgreement.vue')), 'agreement') //浙商委托协议
const wxRiskDisclosureBook = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxRiskDisclosureBook.vue')), 'agreement') //风险揭示书
const wxUserAuthorizeProxy = r => require.ensure([], () => r(require('../components/wx/open/agreement/wxUserAuthorizeProxy.vue')), 'agreement') //用户授权委托书
const transferFund = r => require.ensure([], () => r(require('../components/wx/open/agreement/transferFund.vue')), 'agreement') // 余额转移授权委托书
const electronicSeal = r => require.ensure([], () => r(require('../components/wx/open/agreement/electronicSeal.vue')), 'electronicSeal') // 电子签章风险提示
const digitalCertificate = r => require.ensure([], () => r(require('../components/wx/open/agreement/digitalCertificate.vue')), 'digitalCertificate') // 数字证书服务协议

const wxShortcutCard = r => require.ensure([], () => r(require('../components/wx/open/aboutCard/wxShortcutCard.vue')), 'aboutCard') //快捷充值
const wxKnowCard = r => require.ensure([], () => r(require('../components/wx/open/aboutCard/wxKnowCard.vue')), 'aboutCard') //快捷充值
const wxThreeCard = r => require.ensure([], () => r(require('../components/wx/open/wxThreeCard.vue')), 'aboutCard') //了解三类卡

const wxAppreciationResult = r => require.ensure([], () => r(require('../components/wx/member/result/wxAppreciationResult.vue')), 'Eqz') //开通委托付款结果页
const security = r => require.ensure([], () => r(require('../components/wx/open/security.vue')), 'security') //安全保障

const wxGetPwd = resolve => require(['../components/wx/open/getPwd/wxGetPwd.vue'], resolve); //忘记密码
const wxGetMessage = resolve => require(['../components/wx/open/getPwd/wxGetMessage.vue'], resolve); //获取验证码
const wxSetPwd = resolve => require(['../components/wx/open/getPwd/wxSetPwd.vue'], resolve); //设置密码

const wxDredgeSuccess = resolve => require(['../components/wx/open/wxDredgeSuccess.vue'], resolve);
const wxDredgeDefeat = resolve => require(['../components/wx/open/wxDredgeDefeat.vue'], resolve);

const wxDrawings = r => require.ensure([], () => r(require('../components/wx/member/wxDrawings.vue')), 'sinaMoney') //提现组件
const wxNewrecharge = r => require.ensure([], () => r(require('../components/wx/member/wxNewrecharge.vue')), 'sinaMoney') //充值组件
const wxMoneyRecord = r => require.ensure([], () => r(require('../components/wx/member/wxMoneyRecord.vue')), 'sinaMoney') //充值提现记录
const wxSinaMoneyRecord = r => require.ensure([], () => r(require('../components/wx/member/wxSinaMoneyRecord.vue')), 'sinaMoney') //新浪充值提现记录
const wxRechargeResult = r => require.ensure([], () => r(require('../components/wx/member/result/wxRechargeResult.vue')), 'sinaMoney') //充值结果页
const wxExtractResult = r => require.ensure([], () => r(require('../components/wx/member/result/wxExtractResult.vue')), 'sinaMoney') //提现结果页
const moneyTransferApp = r => require.ensure([], () => r(require('../components/wx/member/result/moneyTransferApp.vue')), 'moneyTransferApp') // APP余额转移结果（页空白页）

// wxZsNewrechargeChild
const wxZsNewrechargeChild = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxZsNewrechargeChild.vue')), 'zsMoney') //浙商充值入口
const wxZsNewrecharge = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxZsNewrecharge.vue')), 'zsMoney') //浙商充值
const wxZsDrawings = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxZsDrawings.vue')), 'zsMoney') //浙商提现
const wxZsMoneyRecord = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxZsMoneyRecord.vue')), 'zsMoney') //浙商记录
const wxZsNewRechargeRecord = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxZsNewRechargeRecord.vue')), 'zsMoney') //浙商充值记录
const wxZsNewDrawingsRecord = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxZsNewDrawingsRecord.vue')), 'zsMoney') //浙商充值记录
const wxZsMoneyResult = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxZsMoneyResult.vue')), 'zsMoney') //浙商记录
const wxOpenBank = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxOpenBank.vue')), 'zsMoney') //浙商开户银行
const wxBigMoney = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/wxBigMoney.vue')), 'zsMoney') //大额支付
const transferRecharge = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/transferRecharge.vue')), 'zsMoney') //转账充值
const TransferProcess = r => require.ensure([], () => r(require('../components/wx/member/zsChangeMoney/TransferProcess.vue')), 'zsMoney') //银行转账流程

const wxInvestIn = r => require.ensure([], () => r(require('../components/wx/member/invest/wxInvestIn.vue')), 'invest') //出借入口
const wxInvestDescribe = r => require.ensure([], () => r(require('../components/wx/member/wxInvestDescribe.vue')), 'invest') //了解标的
const wxBorrower = r => require.ensure([], () => r(require('../components/wx/member/wxBorrower.vue')), 'invest') //借款人列表
const wxBorrowerDetail = r => require.ensure([], () => r(require('../components/wx/open/wxBorrowerDetail.vue')), 'invest') //标的借款人详情
const wxBorrowerDetail2 = r => require.ensure([], () => r(require('../components/wx/open/wxBorrowerDetail2.vue')), 'invest') //标的借款人详情3.3.3
const wxDetail = r => require.ensure([], () => r(require('../components/wx/member/wxDetail.vue')), 'invest') //标的详情
const wxInvestMoney = r => require.ensure([], () => r(require('../components/wx/member/wxInvestMoney.vue')), 'invest') //出借组件
const popupTips = r => require.ensure([], () => r(require('../components/wx/member/invest/popupTips.vue')), 'invest') //出借组件	
const popupMessage = r => require.ensure([], () => r(require('../components/wx/member/invest/popupMessage.vue')), 'invest') //充值弹框	
const wxInvestResult = r => require.ensure([], () => r(require('../components/wx/member/result/wxInvestResult.vue')), 'invest') //出借结果	
const wxZsInvestResult = r => require.ensure([], () => r(require('../components/wx/member/invest/wxZsInvestResult.vue')), 'invest') //浙商出借结果	
const wxInvestRed = r => require.ensure([], () => r(require('../components/wx/member/invest/wxInvestRed.vue')), 'invest') //出借选择红包
const wxInvestUpApr = r => require.ensure([], () => r(require('../components/wx/member/invest/wxInvestUpApr.vue')), 'invest') //出借选择加息券
const wxInvestExper = r => require.ensure([], () => r(require('../components/wx/member/invest/wxInvestExper.vue')), 'invest') //出借选择体验券
const wxNewInvestRed = r => require.ensure([], () => r(require('../components/wx/member/invest/wxNewInvestRed.vue')), 'invest') //出借优惠券
const wxNewInvestRedPacket = r => require.ensure([], () => r(require('../components/wx/member/invest/wxNewInvestRedPacket.vue')), 'invest') //出借优惠券
const wxNewInvestUpApr = r => require.ensure([], () => r(require('../components/wx/member/invest/wxNewInvestUpApr.vue')), 'invest') //出借优惠券
const wxVipTicket = r => require.ensure([], () => r(require('../components/wx/member/invest/wxVipTicket.vue')), 'invest') //出借优惠券

//‘我的’组件
const wxMyAccount = r => require.ensure([], () => r(require('../components/wx/member/account/wxMyAccount.vue')), 'account') //我的
const wxAccount = r => require.ensure([], () => r(require('../components/wx/member/wxAccount.vue')), 'account') //我的
const wxCommonAccount = r => require.ensure([], () => r(require('../components/wx/member/account/wxCommonAccount.vue')), 'account') //普通账户
const wxZsAccount = r => require.ensure([], () => r(require('../components/wx/member/account/wxZsAccount.vue')), 'account') //浙商账户
const wxLog = r => require.ensure([], () => r(require('../components/wx/member/account/wxLog.vue')), 'account') //账单明细
const wxRepayPlan = r => require.ensure([], () => r(require('../components/wx/member/account/wxRepayPlan.vue')), 'account') //回款计划
const wxInvestListIn = r => require.ensure([], () => r(require('../components/wx/member/account/wxInvestListIn.vue')), 'account') //出借管理
const wxInvestManage = r => require.ensure([], () => r(require('../components/wx/member/account/wxInvestManage.vue')), 'account') //出借管理
const wxInvestMaDetail = r => require.ensure([], () => r(require('../components/wx/member/account/wxInvestMaDetail.vue')), 'account') //出借记录详情
const wxRedPacket = r => require.ensure([], () => r(require('../components/wx/member/account/discounts/wxRedPacket.vue')), 'account') //红包优惠
const redpacketUseInstruction = r => require.ensure([], () => r(require('../components/wx/member/account/discounts/redpacketUseInstruction.vue')), 'account') //红包优惠使用说明
const wxSafe = r => require.ensure([], () => r(require('../components/wx/member/account/wxSafe.vue')), 'account') //我的设置
const wxSetting = r => require.ensure([], () => r(require('../components/wx/member/account/wxSetting.vue')), 'account') //我的里面的设置
const wxAlterPwd = r => require.ensure([], () => r(require('../components/wx/member/account/wxAlterPwd.vue')), 'account') //修改密码
const wxMessage = r => require.ensure([], () => r(require('../components/wx/member/account/wxMessage.vue')), 'account') //消息中心
const wxMessageChild = r => require.ensure([], () => r(require('../components/wx/member/account/wxMessageChild.vue')), 'account') //修改密码    
const wxPwdIndex = r => require.ensure([], () => r(require('../components/wx/member/account/wxPwdIndex.vue')), 'account') //密码管理
const wxTradePwd = r => require.ensure([], () => r(require('../components/wx/member/account/wxTradePwd.vue')), 'account') //设置交易密码
const wxTradePwdNew = r => require.ensure([], () => r(require('../components/wx/member/account/wxTradePwdNew.vue')), 'account') //设置交易密码新1
const wxTradeSetPwdNew = r => require.ensure([], () => r(require('../components/wx/member/account/wxTradeSetPwdNew.vue')), 'account') //设置交易密码新2
const wxTradeSetPwdNewTow = r => require.ensure([], () => r(require('../components/wx/member/account/wxTradeSetPwdNewTow.vue')), 'account') //设置交易密码新3
const wxForgetPwd = r => require.ensure([], () => r(require('../components/wx/member/account/wxForgetPwd.vue')), 'account') //忘记交易密码
const wxMyCard = r => require.ensure([], () => r(require('../components/wx/member/account/wxMyCard.vue')), 'account') //我的银行卡    
const wxRealname = r => require.ensure([], () => r(require('../components/wx/member/account/wxRealname.vue')), 'account') //新浪实名认证
const wxRealMsg = r => require.ensure([], () => r(require('../components/wx/member/account/wxRealMsg.vue')), 'account'); //实名信息
const wxAccountAddressList = r => require.ensure([], () => r(require('../components/wx/member/account/wxAccountAddressList.vue')), 'account'); //设置里面的地址列表
const wxRealnameSucc = r => require.ensure([], () => r(require('../components/wx/member/account/realName/wxRealnameSucc.vue')), 'account'); //实名结果页
const wxRemainingInvest = r => require.ensure([], () => r(require('../components/wx/member/account/wxRemainingInvest.vue')), 'account'); //余额智投
const wxRemainingInvestExplain = r => require.ensure([], () => r(require('../components/wx/member/account/wxRemainingInvestExplain.vue')), 'account'); //关于余额智投解释
const wxRemainInvestAgreement = r => require.ensure([], () => r(require('../components/wx/member/account/wxRemainInvestAgreement.vue')), 'account'); // 余额智投协议

const vipUser = r => require.ensure([], () => r(require('../components/wx/member/vip/vipUser.vue')), 'vipAccount') //新版VIP
const Eclub = r => require.ensure([], () => r(require('../components/wx/member/vip/Eclub.vue')), 'account') //E家俱乐部
const wxUpgrade = r => require.ensure([], () => r(require('../components/wx/member/vip/wxUpgrade.vue')), 'account') //新版升级攻略
const privilegeDetails = r => require.ensure([], () => r(require('../components/wx/member/vip/privilegeDetails.vue')), 'vip') //新版升级攻略
const vipFlaunt = r => require.ensure([], () => r(require('../components/wx/member/vip/vipFlaunt.vue')), 'vip') //vip分享页面
const vipWelfare = r => require.ensure([], () => r(require('../components/wx/member/vip/vipWelfare.vue')), 'vipWelfare') //vip我的福利页面

const wxBindingCard = r => require.ensure([], () => r(require('../components/wx/member/account/wxBindingCard.vue')), 'account') //新浪绑卡入口
const wxSinaCard = r => require.ensure([], () => r(require('../components/wx/member/account/wxSinaCard.vue')), 'account') //新浪绑卡
const wxBindingSucc = r => require.ensure([], () => r(require('../components/wx/member/account/wxBindingSucc.vue')), 'account') //新浪绑卡成功页
const wxRiskAssessment = r => require.ensure([], () => r(require('../components/wx/member/wxRiskAssessment.vue')), 'account') //风险测评

const wxZSwait = r => require.ensure([], () => r(require('../components/wx/member/account/wxZSwait.vue')), 'account'); //存管账户
const wxIdpoint = r => require.ensure([], () => r(require('../components/wx/open/wxIdpoint.vue')), 'pointToPoint') //了解标的
const wxIdpoint2 = r => require.ensure([], () => r(require('../components/wx/open/wxIdpoint2.vue')), 'pointToPoint') //了解标的3.3.3

const wxNextCard = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxNextCard.vue')), 'wxNextCard'); //下一步
const wxAmendCard = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxAmendCard.vue')), 'wxAmendCard') //修改卡入口
const wxToAmendCard = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxToAmendCard.vue')), 'wxToAmendCard') //下一步
const wxAmendPhone = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxAmendPhone.vue')), 'wxAmendPhone') //下一步
const wxAmendSuccess = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxAmendSuccess.vue')), 'wxAmendSuccess') //修改结果页
const transferResult = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/transferResult.vue')), 'transferResult') //余额转移结果页面
const wxAmendCheck = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxAmendCheck.vue')), 'wxAmendCheck') //审核页
const wxFailureAudit = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxFailureAudit.vue')), 'wxFailureAudit') //线下失败页
const wxAmendExample = r => require.ensure([], () => r(require('../components/wx/member/account/zsAmend/wxAmendExample.vue')), 'wxAmendExample') //示例
const wxTotalAssets = r => require.ensure([], () => r(require('../components/wx/member/account/wxTotalAssets.vue')), 'account') //资产总览页面
const wxHelpCenters = r => require.ensure([], () => r(require('../components/wx/member/helpCenters/wxHelpCenters.vue')), 'help') //微信帮助中心首页
const wxHelpCenterTab = r => require.ensure([], () => r(require('../components/wx/member/helpCenterTab/wxHelpCenterTab.vue')), 'help') //微信赚吧帮助中心列表
const wxHelpBorrowTab = r => require.ensure([], () => r(require('../components/wx/member/helpCenters/borrowTab/borrowTab.vue')), 'help')//微信花吧帮助中心列表
const wxHelpSpendTab = r => require.ensure([], () => r(require('../components/wx/member/helpCenters/spendTab/spendTab.vue')), 'help')//微信花吧帮助中心列表
const wxFeedbackIndex = r => require.ensure([], () => r(require('../components/wx/member/feedback/wxFeedbackIndex.vue')), 'help') //微信反馈列表页
const wxFeedbackContent = r => require.ensure([], () => r(require('../components/wx/member/feedback/wxFeedbackContent.vue')), 'help') //微信反馈内容页


//存管组件
const wxDepository = r => require.ensure([], () => r(require('../components/wx/member/depository/wxDepository.vue')), 'depository') //存管入口     
const wxOpenDepository = r => require.ensure([], () => r(require('../components/wx/member/depository/wxOpenDepository.vue')), 'depository'); //开通存管  
const wxAddBank = r => require.ensure([], () => r(require('../components/wx/member/depository/wxAddBank.vue')), 'depository') //选择银行  
const wxGetCity = r => require.ensure([], () => r(require('../components/wx/member/depository/wxGetCity.vue')), 'depository') //选择银行  
const wxSearch = r => require.ensure([], () => r(require('../components/wx/member/depository/wxSearch.vue')), 'depository') //搜索支行  
const wxDepositorySucc = r => require.ensure([], () => r(require('../components/wx/member/depository/wxDepositorySucc.vue')), 'depository') //开通失败 

//点对点
const wxDetailPoint = r => require.ensure([], () => r(require('../components/wx/open/wxDetailPoint.vue')), 'pointToPoint') //点对点出借详情页
const wxFinaPlanBorrowers = r => require.ensure([], () => r(require('../components/wx/open/wxFinaPlanBorrowers.vue')), 'pointToPoint') //点对点出借记录
const wxFinaPlanBorrowers2 = r => require.ensure([], () => r(require('../components/wx/open/wxFinaPlanBorrowers2.vue')), 'pointToPoint') //点对点出借记录3.3.3
const wxInvestRecordPoint = r => require.ensure([], () => r(require('../components/wx/open/wxInvestRecordPoint.vue')), 'pointToPoint') //点对点债权组成
const wxInvestRecordPoint2 = r => require.ensure([], () => r(require('../components/wx/open/wxInvestRecordPoint2.vue')), 'pointToPoint') //点对点债权组成3.3.3
const wxInvestDetailBorrower = r => require.ensure([], () => r(require('../components/wx/member/account/wxInvestDetailBorrower.vue')), 'pointToPoint') //出借记录详情
const wxInvestMoneyPoint = r => require.ensure([], () => r(require('../components/wx/member/wxInvestMoneyPoint.vue')), 'pointToPoint') //出借组件点对点
    // wxInvestDetailBorrower
    // wxFinaPlanBorrowers  wxInvestRecordPoint
    //活动组件
const authorized = r => require.ensure([], () => r(require('../components/wx/activity/invitation/authorized.vue')), 'tzj') // 投之家授权页
const pageMiddle = r => require.ensure([], () => r(require('../components/wx/activity/invitation/pageMiddle.vue')), 'tzj') // 网贷天眼点对点跳转页面
const wdtyAuthorized = r => require.ensure([], () => r(require('../components/wx/activity/wdty/authorized.vue')), 'wdty') // 网贷天眼授权页
const wdtyPageMiddle = r => require.ensure([], () => r(require('../components/wx/activity/wdty/pageMiddle.vue')), 'wdty') // 网贷天眼点对点跳转页面
const fclcAuthorized = r => require.ensure([], () => r(require('../components/wx/activity/fclc/authorized.vue')), 'fclc') // 风车理财授权页
const fclcPageMiddle = r => require.ensure([], () => r(require('../components/wx/activity/fclc/pageMiddle.vue')), 'fclc') // 风车理财点对点跳转页面
const cllcPageMiddle = r => require.ensure([], () => r(require('../components/wx/activity/cllc/pageMiddle.vue')), 'cllc') // 车轮理财自动登录跳转页面

const wxNewPeople = r => require.ensure([], () => r(require('../components/wx/activity/newPeople/wxNewPeople.vue')), 'newPeople') //新手专享
const wxNewOnly = r => require.ensure([], () => r(require('../components/wx/activity/newPeople/wxNewPeople2.vue')), 'newPeople') //新手专享12点替换

const wxInvestRecord = r => require.ensure([], () => r(require('../components/wx/member/wxInvestRecord.vue')), 'wxInvestRecord');

// const wxTernary = r => require.ensure([], () => r(require('../components/wx/open/wxTernary.vue')), 'wxTernary'); //三重礼

// const takePacket = r => require.ensure([], () => r(require('../components/wx/activity/redPacket/takePacket.vue')), 'takePacket') //存管上线领红包活动
const wxTwoBillion = r => require.ensure([], () => r(require('../components/wx/activity/twoBillion/wxTwoBillion.vue')), 'wxTwoBillion'); //突破20亿
const wxGetValue = r => require.ensure([], () => r(require('../components/wx/activity/twoBillion/wxGetValue.vue')), 'wxTwoBillion') //突破20亿
const wxUseValue = r => require.ensure([], () => r(require('../components/wx/activity/twoBillion/wxUseValue.vue')), 'wxTwoBillion') //突破20亿
const wxHasGoods = r => require.ensure([], () => r(require('../components/wx/activity/twoBillion/wxHasGoods.vue')), 'wxTwoBillion') //突破20亿兑换福利1连接
const wxHasGoods2 = r => require.ensure([], () => r(require('../components/wx/activity/twoBillion/wxHasGoods2.vue')), 'wxTwoBillion') //突破20亿兑换福利1连接
const mainVenue = r => require.ensure([], () => r(require('../components/wx/activity/mainVenue/mainVenue.vue')), 'mainVenue') //主会场
const mainVenue2 = r => require.ensure([], () => r(require('../components/wx/activity/mainVenue/mainVenue2.vue')), 'mainVenue') //主会场2
const mainVenue3 = r => require.ensure([], () => r(require('../components/wx/activity/mainVenue/mainVenue3.vue')), 'mainVenue') //主会场2
const welcomeBank = r => require.ensure([], () => r(require('../components/wx/activity/welcomeBank/welcomeBank.vue')), 'welcomeBank'); // 迎存管送现金福利
const refactoringGuide = r => require.ensure([], () => r(require('../components/wx/activity/depository/refactoringGuide.vue')), 'refactoringGuide') // 存管开通流程
const operationalData = r => require.ensure([], () => r(require('../components/wx/activity/operationalData/operationalData.vue')), 'operationalData') // E都市钱包2017年9月份运营报告
const Eplan = r => require.ensure([], () => r(require('../components/wx/activity/operationalData/Eplan.vue')), 'Eplan') // E计划推广
const YearData = r => require.ensure([], () => r(require('../components/wx/activity/operationalData/2017YearData.vue')), '2017YearData') // 2017 年度运营报告
const newsReport = r => require.ensure([], () => r(require('../components/wx/activity/appExe/newsReport.vue')), 'newsReport') // APP马甲包专用
const toAppStore = r => require.ensure([], () => r(require('../components/wx/activity/appExe/toAppStore.vue')), 'toAppStore') // APP强制下载中间页
const customRedEnvelope = r => require.ensure([], () => r(require('../components/wx/activity/customRedEnvelope/customRedEnvelope.vue')), 'customRedEnvelope') // 自定义领红包
const customRedShare = r => require.ensure([], () => r(require('../components/wx/activity/customRedEnvelope/customRedShare.vue')), 'customRedShare') // 自定义领红包分享页面
const pickWelfare = r => require.ensure([], () => r(require('../components/wx/activity/pickWelfare/pickWelfare.vue')), 'pickWelfare') // 摘福利冲榜大赛
const rankingList = r => require.ensure([], () => r(require('../components/wx/activity/pickWelfare/rankingList.vue')), 'rankingList') // 摘福利出借排行榜
const tenMonthData = r => require.ensure([], () => r(require('../components/wx/activity/tenMonthData/tenMonthData.vue')), 'tenMonthData') // E都市钱包2017年10月份运营报告
const wxComplianceDisclosure = r => require.ensure([], () => r(require('../components/wx/activity/complianceDisclosure/wxComplianceDisclosure.vue')), 'wxComplianceDisclosure') // 合规进程披露
const thanksgivingDayHome = r => require.ensure([], () => r(require('../components/wx/activity/thanksgivingDay/thanksgivingDayHome.vue')), 'thanksgivingDayHome'); // 感恩节活动首页
const thanksgivingDayPage = r => require.ensure([], () => r(require('../components/wx/activity/thanksgivingDay/thanksgivingDayPage.vue')), 'thanksgivingDayPage') // 感恩节活动滑动页
const thanksgivingDayLastPage = r => require.ensure([], () => r(require('../components/wx/activity/thanksgivingDay/thanksgivingDayLastPage.vue')), 'thanksgivingDayLastPage') // 感恩节活动最后页
const tabTemplate = r => require.ensure([], () => r(require('../components/wx/activity/tabTemplate/tabTemplate.vue')), 'tabTemplate'); // tab平台介绍
const christmasAanNewYear = r => require.ensure([], () => r(require('../components/wx/activity/christmasAanNewYear/christmasAanNewYear.vue')), 'christmasAanNewYear') // 圣诞、元旦（两蛋）活动
const christmasRegister = r => require.ensure([], () => r(require('../components/wx/activity/christmasInvitation/christmasRegister.vue')), 'christmasRegister') // 双蛋新用户活动注册页
const nawChristmasInvitation = r => require.ensure([], () => r(require('../components/wx/activity/christmasInvitation/nawChristmasInvitation.vue')), 'nawChristmasInvitation') // 双蛋新用户活动页
const newYearDay = r => require.ensure([], () => r(require('../components/wx/activity/newYearDay/newYearDay.vue')), 'newYearDay') // 红包机元旦（两蛋）活动
const nianyKind = r => require.ensure([], () => r(require('../components/wx/activity/nianyKind/nianyKind.vue')), 'nianyKind') //红包机，年货盛宴，约战新年活动
const iceSnowCarnival = r => require.ensure([], () => r(require('../components/wx/activity/iceSnowCarnival/iceSnowCarnival.vue')), 'iceSnowCarnival') //冰雪嘉年华活动页
const iceSnowCarnivalInvitation = r => require.ensure([], () => r(require('../components/wx/activity/iceSnowCarnival/iceSnowCarnivalInvitation.vue')), 'iceSnowCarnivalInvitation') //冰雪嘉年华邀请页
const goodLuckInAYear = r => require.ensure([], () => r(require('../components/wx/activity/goodLuckInAYear/goodLuckInAYear.vue')), 'goodLuckInAYear') //开年赢鸿运活动
const theNewYearAboutWar = r => require.ensure([], () => r(require('../components/wx/activity/theNewYearAboutWar/theNewYearAboutWarLuckyBag.vue')), 'theNewYearAboutWar') //约战新年拆福袋
const theNewYearAboutWarPK = r => require.ensure([], () => r(require('../components/wx/activity/theNewYearAboutWar/theNewYearAboutWarPK.vue')), 'theNewYearAboutWar') //约战新年战队PK
const theNewYearAboutWarPKB = r => require.ensure([], () => r(require('../components/wx/activity/theNewYearAboutWar/theNewYearAboutWarPKB.vue')), 'theNewYearAboutWar') //约战新年福袋展示页
const receiveRed = r => require.ensure([], () => r(require('../components/wx/activity/receiveRed/getRed.vue')), 'theNewYearAboutWar') //领红包活动
const wxVipLandPage = r => require.ensure([], () => r(require('../components/wx/activity/vipLandPage/wxVipLandPage.vue')), 'vipLandPage'); //vip落地页
const inviteLandPage = r => require.ensure([], () => r(require('../components/wx/activity/inviteLandPage/inviteLandPage.vue')), 'inviteLandPage'); //邀请落地页
const wxInviteTravel = r => require.ensure([], () => r(require('../components/wx/activity/wxInviteTravel/wxInviteTravel.vue')), 'travel') //wx邀请旅行
const wxPrizeList = r => require.ensure([], () => r(require('../components/wx/activity/wxInviteTravel/wxPrizeList.vue')), 'travel') //wx邀请旅行奖励列表
const wxInviteSharePage = r => require.ensure([], () => r(require('../components/wx/activity/wxInviteTravel/wxInviteSharePage.vue')), 'travel') //wx邀请旅行分享页
const appGuide = r => require.ensure([], () => r(require('../components/wx/activity/wxInviteTravel/appGuide.vue')), 'travel') //wx邀请旅行APP引导页
const chance = r => require.ensure([], () => r(require('../components/wx/activity/618Activity/618Chance.vue')), '618Chance')   // 邂逅618首页
const chanceDetails = r => require.ensure([], () => r(require('../components/wx/activity/618Activity/618ChanceDetails.vue')), '618Chance')  // 邂逅618详情页
const chanceShare = r => require.ensure([], () => r(require('../components/wx/activity/618Activity/618ChanceShare.vue')), '618Chance')  // 邂逅618分享页
const twoAnniversary = r => require.ensure([], () => r(require('../components/wx/activity/twoAnniversary/twoAnniversary.vue')), 'twoAnniversary')  // 二周年庆典
const prizeRecord = r => require.ensure([], () => r(require('../components/wx/activity/twoAnniversary/prizeRecord.vue')), 'prizeRecord')  // 领二周年庆典取记录
const videoShare = r => require.ensure([], () => r(require('../components/wx/activity/twoAnniversary/videoShare.vue')), 'videoShare')  // 二周年庆典视频分享叶

const festivalIndex = r => require.ensure([], () => r(require('../components/wx/activity/lanternFestival/festivalIndex.vue')), 'festivalIndex') //元宵节活动
const yxInvitation = r => require.ensure([], () => r(require('../components/wx/activity/lanternFestival/yxInvitation.vue')), 'yxInvitation') //元宵节活动

const wxMakePublic = r => require.ensure([], () => r(require('../components/wx/open/makePublic/wxMakePublic.vue')), 'store'); //实时数据
const wxDisclosure = r => require.ensure([], () => r(require('../components/wx/open/wxDisclosure/wxDisclosure.vue')), 'store'); //信息披露
const exhibition = r => require.ensure([], () => r(require('../components/wx/activity/exhibition/exhibition.vue')), 'wxhibition'); //品宣活动
const fortuneIndex = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/fortuneIndex.vue')), 'fortuneIndex'); //发财计划2.0
const myAward = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/myAward.vue')), 'myAward'); //我的奖励
const newAward = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/newAward.vue')), 'newAward'); //2.0奖励
const showQcode = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/showQcode.vue')), 'showQcode'); //显示二维码
const inviteRegister = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/inviteRegister.vue')), 'inviteRegister'); //邀请升级注册
const wxAuthorizeRegister = r => require.ensure([], () => r(require('../components/wx/activity/wxAuthorizeRegister/wxAuthorizeRegister.vue')), 'wxAuthorizeRegister'); //授权时未注册跳转的注册页
const wxBindResult = r => require.ensure([], () => r(require('../components/wx/activity/wxAuthorizeRegister/wxBindResult.vue')), 'wxAuthorizeRegister'); //授权时未注册跳转的注册页结果页
const wxAuthorizeBind = r => require.ensure([], () => r(require('../components/wx/activity/wxAuthorizeRegister/wxAuthorizeBind.vue')), 'wxAuthorizeRegister'); //授权绑定页面
const wxAuthorizeIntroduction = r => require.ensure([], () => r(require('../components/wx/activity/wxAuthorizeRegister/wxAuthorizeIntroduction.vue')), 'wxAuthorizeRegister'); //授权绑定页面
const inviteResult = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/inviteResult.vue')), 'inviteResult'); //邀请升级注册结果页
const inviteStrategy = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/inviteStrategy.vue')), 'inviteStrategy'); //邀请教程
const strategyReg = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/strategy/register.vue')), 'strategyReg'); //注册教程
const strategyAcc = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/strategy/account.vue')), 'strategyAcc'); //开户教程
const strategyLoan = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/strategy/loan.vue')), 'strategyLoan'); //出借教程
const openApp = r => require.ensure([], () => r(require('../components/wx/activity/newInvite/openApp.vue')), 'openApp'); //短信唤醒app

//积分商城
const intIndex = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intIndex.vue')), 'intIndex'); //积分商城首页
const intAddress = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intAddress.vue')), 'intAddress'); //积分商城-添加地址
const intGoodDetail = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intGoodDetail.vue')), 'intGoodDetail'); //积分商城-商品详情
const intImgDetail = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intImgDetail.vue')), 'intImgDetail'); //积分商城-商品详情的图文详情
const intGoodList = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intGoodList.vue')), 'intGoodList'); //积分商城-商品列表
const intRecordDetail = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intRecordDetail.vue')), 'intRecordDetail'); //积分商城-积分明细
const intExchRecords = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intExchRecords.vue')), 'intExchRecords'); //积分商城-兑换记录
const intEarn = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intEarn.vue')), 'intEarn'); //积分商城-赚取积分
const intAddressList = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intAddressList.vue')), 'intAddressList'); //积分商城-地址列表
const intEditAddress = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intEditAddress.vue')), 'intEditAddress'); //积分商城-编辑地址
// const commonQuestions = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/commonQuestions.vue')), 'IntegralStoreFolder'); //积分商城-常见问题
const province = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/province.vue')), 'province'); //积分商城-省市区
const intWishFrom = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intWishFrom.vue')), 'intWishFrom'); //积分商城心愿
const intWishList = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/intWishList.vue')), 'intWishList'); //积分商城爱心榜

const signIn = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/signIn/index.vue')), 'signIn'); //签到日历
const awardDetails = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/signIn/awardDetails.vue')), 'awardDetails'); //兑换详情
const drawRecord = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/signIn/drawRecord.vue')), 'drawRecord'); //兑换记录
const logistics = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/prizeDraw/logistics.vue')), 'luckDraw'); // 物流详情
const LuckDraw = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/prizeDraw/LuckDraw.vue')), 'luckDraw'); // 积分抽奖游戏
const charitable = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/prizeDraw/charitable.vue')), 'luckDraw'); // 积分慈善公益活动模板
const myCharity = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/prizeDraw/myCharity.vue')), 'luckDraw'); // 我的慈善公益
const gameList = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/gameList.vue')), 'gameList'); //积分商城游戏列表页面
const LuckyDice = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/diceRoller/LuckyDice.vue')), 'LuckyDice'); // 幸运骰子游戏
const diceRecord = r => require.ensure([], () => r(require('../components/wx/open/IntegralStoreFolder/diceRoller/diceRecord.vue')), 'LuckyDice'); // 幸运骰子游戏获奖记录
//出海寻宝
const treasureIndex = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/index.vue')), 'treasureIndex'); //出海寻宝首页
const treasureRult = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/welfare/rult.vue')), 'treasureRult'); //出海寻宝规则
const exchangeRed = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/welfare/exchangeRed.vue')), 'exchangeRed'); //兑换红包
const redRecord = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/welfare/redRecord.vue')), 'redRecord'); //兑换红包记录
const seaRankingList = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/welfare/seaRankingList.vue')), 'seaRankingList'); //排行榜
const myPrecious = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/welfare/myPrecious.vue')), 'myPrecious'); //我的宝藏
const shareGift = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/welfare/shareGift.vue')), 'shareGift'); //出海分享有礼
const recruitSeaman = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/welfare/recruitSeaman.vue')), 'recruitSeaman'); //招募船员
const treasureHunt = r => require.ensure([], () => r(require('../components/wx/member/vip/VIPActivity/treasureHunt.vue')), 'treasureHunt'); //出海寻宝分享
const commonTemp = r => require.ensure([], () => r(require('../components/wx/channel/commonTemp.vue')), 'commonTemp'); //渠道通用模板
const commonTempTouTiao = r => require.ensure([], () => r(require('../components/wx/channel/commonTempTouTiao.vue')), 'commonTempTouTiao'); //渠道通用模板爱上头条
const reportDetails = r => require.ensure([], () => r(require('../components/wx/template/reportDetails.vue')), 'reportDetails'); // 数据报告模板
const newReportDetails = r => require.ensure([], () => r(require('../components/wx/template/newReport/new_reportDetails.vue')), 'newReportDetails'); // 新的数据报告模板
const commonProblem = r => require.ensure([], () => r(require('../components/wx/open/wxDisclosure/commonProblem.vue')), 'reportDetails') // 经营信息
const luckyDraw = r => require.ensure([], () => r(require('../components/wx/activity/luckyDraw/luckyDraw.vue')), 'reportDetails') // 20亿站内抽奖
const luckyDrawForeign = r => require.ensure([], () => r(require('../components/wx/activity/luckyDraw/luckyDrawForeign.vue')), 'reportDetails') // 20亿站外抽奖
const moneyTransfer = r => require.ensure([], () => r(require('../components/wx/member/moneyTransfer.vue')), 'moneyTransfer') //余额转移
const moneyTransferList = r => require.ensure([], () => r(require('../components/wx/member/moneyTransferList.vue')), 'moneyTransfer') //余额转移列表
const charity = r => require.ensure([], () => r(require('../components/wx/activity/charity/charity.vue')), 'charity') //爱心公益活动
const Carnival = r => require.ensure([], () => r(require('../components/wx/activity/518Carnival/518Carnival.vue')), '518Carnival') // 518财富嘉年华
const carnivalRanking = r => require.ensure([], () => r(require('../components/wx/activity/518Carnival/ranking.vue')), 'ranking') // 518财富嘉年华排行榜
const lovePublicity = r => require.ensure([], () => r(require('../components/wx/activity/lovePublicity.vue')), 'lovePublicity') // 爱心公益公示
const wxClassIn = r => require.ensure([], () => r(require('../components/wx/open/educationChild/wxClassIn.vue')), 'wxClassIn') // 爱心公益公示
const riskEducation = r => require.ensure([], () => r(require('../components/wx/open/riskEducation.vue')), 'riskEducation') // 新风险教育
const riskEducation2 = r => require.ensure([], () => r(require('../components/wx/open/riskEducation2.vue')), 'riskEducation2') // 第一期风险教育备份
const shareVedio = r => require.ensure([], () => r(require('../components/wx/open/educationChild/shareVedio.vue')), 'shareVedio') // 视频分享
const toVedioPage = r => require.ensure([], () => r(require('../components/wx/open/educationChild/toVedioPage.vue')), 'toVedioPage') // 视频分享
const EFriendClass = r => require.ensure([], () => r(require('../components/wx/open/educationChild/EFriendClass.vue')), 'EFriendClass') // 视频分享
const riskLaws = r => require.ensure([], () => r(require('../components/wx/open/riskLaws.vue')), 'riskLaws') //风险教育法律法规
const riskKnowledge = r => require.ensure([], () => r(require('../components/wx/open/riskKnowledge.vue')), 'riskLaws') //风险教育E友课堂
const fiskVideo = r => require.ensure([], () => r(require('../components/wx/open/fiskVideo.vue')), 'riskLaws') // 风险教育视屏专用页面
const fiskVideo1 = r => require.ensure([], () => r(require('../components/wx/open/fiskVideo1.vue')), 'riskLaws') // 风险教育视屏专用页面第二期
const riskNews = r => require.ensure([], () => r(require('../components/wx/open/riskNews.vue')), 'riskLaws') // 风险教育行业新闻
const anniversary = r => require.ensure([], () => r(require('../components/wx/activity/anniversaryTwo/anniversary.vue')), 'anniversary') // 两周年活动
const picTpl = r => require.ensure([], () => r(require('../components/wx/template/picTpl')), 'picTpl') //纯图片页面模板
const fail = r => require.ensure([], () => r(require('../components/wx/template/404.vue')), 'reportDetails') // 404
const commandMain = r => require.ensure([], () => r(require('../components/wx/activity/command/commandMain.vue')), 'command') // 红包口令首页
const allRecord = r => require.ensure([], () => r(require('../components/wx/activity/command/allRecord.vue')), 'command') // 红包口令-所有记录
const myRecords = r => require.ensure([], () => r(require('../components/wx/activity/command/myRecords.vue')), 'command') // 红包口令-我的记录
const myRecordDetail = r => require.ensure([], () => r(require('../components/wx/activity/command/myRecordDetail.vue')), 'command') // 红包口令-我的记录详情
const commandApp = r => require.ensure([], () => r(require('../components/wx/activity/command/appLinkPage.vue')), 'command') // 红包口令-app引导页
const happySummer = r => require.ensure([], () => r(require('../components/wx/activity/happySummer/index.vue')), 'happySummer') //  happy E夏
const happyRedList = r => require.ensure([], () => r(require('../components/wx/activity/happySummer/redList.vue')), 'happyRedList') //  happy 红包列表
const happyGoodList = r => require.ensure([], () => r(require('../components/wx/activity/happySummer/goodList.vue')), 'happyGoodList') //  happy 商品兑换列表
const happyGoodDetail = r => require.ensure([], () => r(require('../components/wx/activity/happySummer/goodDetail.vue')), 'happyGoodDetail') //  happy 商品列表
const happyInvite = r => require.ensure([], () => r(require('../components/wx/activity/happySummer/happyInvite.vue')), 'happyInvite') //  happy 注册页
const happyInviteResult = r => require.ensure([], () => r(require('../components/wx/activity/happySummer/happyInviteResult.vue')), 'happyInviteResult') //  happy 注册页结果页
const signMain = r => require.ensure([], () => r(require('../components/wx/activity/sign/signMain.vue')), 'sign') //  签到有礼
const signApp = r => require.ensure([], () => r(require('../components/wx/activity/sign/appShare.vue')), 'sign') //  签到有礼分享页
const supervise = r => require.ensure([], () => r(require('../components/wx/activity/supervise/index.vue')), 'enrol')   // 监督委员会
const enrol = r => require.ensure([], () => r(require('../components/wx/activity/supervise/enrol.vue')), 'enrol')   // 监督委员会报名阶段
const info = r => require.ensure([], () => r(require('../components/wx/activity/supervise/info.vue')), 'enrol')   // 监督委员会报名阶段报名阶段
const constitution = r => require.ensure([], () => r(require('../components/wx/activity/supervise/constitution.vue')), 'enrol')   // 监督委员会章程
const schoolMain = r => require.ensure([], () => r(require('../components/wx/activity/school/schoolMain.vue')), 'schoolOpen') //  开学季活动
const schoolDetail = r => require.ensure([], () => r(require('../components/wx/activity/school/schoolDetail.vue')), 'schoolDetail') //  开学季详情页
const schoolApp = r => require.ensure([], () => r(require('../components/wx/activity/school/appShare.vue')), 'schoolApp') //  开学季分享页

const zqFestival = r => require.ensure([], () => r(require('../components/wx/activity/zqFestival/index.vue')), 'zqFestival'); //  中秋节活动
const festivalDetail = r => require.ensure([], () => r(require('../components/wx/activity/zqFestival/festivalDetail.vue')), 'festivalDetail'); // 中秋节详情
const zqFestivalInvite = r => require.ensure([], () => r(require('../components/wx/activity/zqFestival/festivalInvitation.vue')), 'festivalInvitation'); // 中秋节邀请
const midAdd = r => require.ensure([], () => r(require('../components/wx/activity/zqFestival/midAdd.vue')), 'midAdd'); // 中秋节加场
const gqFestivalGift = r => require.ensure([], () => r(require('../components/wx/activity/gqFestivalGift/gqFestivalGift.vue')), 'gqFestivalGift'); // 2018国庆送礼
const nationalDayPublicity = r => require.ensure([], () => r(require('../components/wx/activity/nationalDay/index.vue')), 'nationalDayPublicity'); //国庆宣传
const securityPublicity = r => require.ensure([], () => r(require('../components/wx/activity/nationalDay/security.vue')), 'securityPublicity'); //资产分散
const filing = r => require.ensure([], () => r(require('../components/wx/activity/filing/index.vue')), 'filing')  //  备案进程
const bankDeposit = r => require.ensure([], () => r(require('../components/wx/activity/filing/bankDeposit.vue')), 'filing')  //  银行存管
const commitment = r => require.ensure([], () => r(require('../components/wx/activity/filing/commitment.vue')), 'filing')  //  银行存管的合规经营承诺函
const filingFile = r => require.ensure([], () => r(require('../components/wx/activity/filing/filingFile.vue')), 'filing')  //  银行存管的16张图
const electronicSignature = r => require.ensure([], () => r(require('../components/wx/activity/filing/electronicSignature.vue')), 'filing')  //  备案进程的电子签章
const nationalDay = r => require.ensure([], () => r(require('../components/wx/activity/nationalDay.vue')), 'nationalDay')  //  国庆节活动
const octoberActivity = r => require.ensure([], () => r(require('../components/wx/activity/octoberActivity/octoberActivity.vue')), 'octoberActivity')  //  十月活动
const festMain = r => require.ensure([], () => r(require('../components/wx/activity/festTemplate1/festMain.vue')), 'festTemplate1')  //  双十一预热
const festRecord = r => require.ensure([], () => r(require('../components/wx/activity/festTemplate1/festRecord.vue')), 'festTemplate1')  //  双十一预热记录
const festMain2 = r => require.ensure([], () => r(require('../components/wx/activity/festTemplate2/festMain.vue')), 'festTemplate2')  //  双十一助力
const festRecord2 = r => require.ensure([], () => r(require('../components/wx/activity/festTemplate2/festRecord.vue')), 'festTemplate2')  //  双十一助力记录
const festDetail = r => require.ensure([], () => r(require('../components/wx/activity/festTemplate2/festDetail.vue')), 'festTemplate2')  //  双十一助力详情
const vipUpdate = r => require.ensure([], () => r(require('../components/wx/activity/vipUpdate/vipUpdate.vue')), 'vipUpdate')  //  Vip专属活动
const festMain3 = r => require.ensure([], () => r(require('../components/wx/activity/festTemplate3/festMain.vue')), 'festTemplate3')  //  活动模版3
const festRecord3 = r => require.ensure([], () => r(require('../components/wx/activity/festTemplate3/festRecord.vue')), 'festTemplate3')  // 活动模版3兑奖记录

const game2048 = r => require.ensure([], () => r(require('../components/blockchain/game2048.vue')), 'blockchain') //2048游戏


const h5ToAppTest = r => require.ensure([], () => r(require('../components/wx/open/h5ToAppTest.vue')), 'h5ToAppTest') //h5跳转app积分商城首页demo
const authorization = r => require.ensure([], () => r(require('../components/wx/open/authorization.vue')), 'authorization') //授权空页面
const integralNationalDay = r => require.ensure([], () => r(require('../components/wx/activity/integralNationalDay/integralNationalDay.vue')), 'integralNationalDay')  // 积分商城2018国庆活动

const holidayIndex = r => require.ensure([], () => r(require('../components/wx/activity/everyHoliday/index.vue')), 'everyHoliday')  //每逢佳节
const changeRecord = r => require.ensure([], () => r(require('../components/wx/activity/everyHoliday/changeRecord.vue')), 'everyHoliday')  //每逢佳节
const main = r => require.ensure([], () => r(require('../components/wx/activity/doubleEleven/main.vue')), 'doubleEleven')  // 双十一活动主会场
const meetingOne = r => require.ensure([], () => r(require('../components/wx/activity/doubleEleven/meetingOne.vue')), 'doubleEleven')  // 双十一活动分会场一
const activityRedRecord = r => require.ensure([], () => r(require('../components/wx/activity/doubleEleven/redRecord.vue')), 'doubleEleven')  // 双十一活动分会场一红包记录
const meetingTwo = r => require.ensure([], () => r(require('../components/wx/activity/doubleEleven/meetingTwo.vue')), 'doubleEleven')  // 双十一活动分会场二
const meetingTwoDrawRecord = r => require.ensure([], () => r(require('../components/wx/activity/doubleEleven/drawRecord.vue')), 'doubleEleven')  // 双十一活动分会场二抽奖记录
const meetingThree = r => require.ensure([], () => r(require('../components/wx/activity/doubleEleven/meetingThree.vue')), 'doubleEleven')  // 双十一活动分会场三
const meetingThreeRecord = r => require.ensure([], () => r(require('../components/wx/activity/doubleEleven/changeRecord.vue')), 'doubleEleven')  // 双十一活动分会场三兑换记录
const thanksgiving = r => require.ensure([], () => r(require('../components/wx/activity/thanksgiving/thanksgiving.vue')), 'doubleEleven')  // 感恩有礼活动

const wdzjAuthorized = r => require.ensure([], () => r(require('../components/wx/activity/wdzj/authorized.vue')), 'wdtzj') // 网贷之家授权页
const cutRedEnvelope = r => require.ensure([], () => r(require('../components/wx/activity/cutRedEnvelope/index.vue')), 'cutRedEnvelope')  // 砍红包
const cutHelp = r => require.ensure([], () => r(require('../components/wx/activity/cutRedEnvelope/cutHelp.vue')), 'cutRedEnvelope')  // 邀请砍红包

const richPlanActivity = r => require.ensure([], () => r(require('../components/wx/activity/richPlanActivity/richPlanActivity.vue')), 'richPlanActivity')  // 发财计划活动页
const richPlanList = r => require.ensure([], () => r(require('../components/wx/activity/richPlanActivity/richPlanList.vue')), 'richPlanActivity')  // 发财计划活动获奖列表
const christmas2018 = r => require.ensure([], () => r(require('../components/wx/activity/2018Christmas/2018Christmas.vue')), 'christmas')  // 2018年圣诞活动
const bill = r => require.ensure([], () => r(require('../components/wx/activity/annualBill/bill.vue')), 'annualBill')  // 年度账单
const shareBill = r => require.ensure([], () => r(require('../components/wx/activity/annualBill/shareBill.vue')), 'annualBill')  // 年度账单app分享
const sendRedIndex = r => require.ensure([], () => r(require('../components/wx/activity/hbttfPigYear/index.vue')), 'hbttfPigYear')  // 猪年红包天天发
const shareFriends = r => require.ensure([], () => r(require('../components/wx/activity/hbttfPigYear/shareFriends.vue')), 'hbttfPigYear')  // 送亲友，分享出去页面
const friendTask = r => require.ensure([], () => r(require('../components/wx/activity/hbttfPigYear/friendTask.vue')), 'hbttfPigYear')  // 送亲友，分享出去页面
const openAppLink = r => require.ensure([], () => r(require('../components/wx/activity/hbttfPigYear/openAppLink.vue')), 'hbttfPigYear')  // 唤醒app
const openRed = r => require.ensure([], () => r(require('../components/wx/activity/hbttfPigYear/openRed.vue')), 'hbttfPigYear')  // 好友拆红包
const spendIndex = r => require.ensure([], () => r(require('../components/wx/activity/drainage/spendIndex.vue')), 'spendIndex')  // 花吧宣传页面
const lendIndex = r => require.ensure([], () => r(require('../components/wx/activity/drainage/lendIndex.vue')), 'lendIndex')  // 借吧宣传页面
const springFestival = r => require.ensure([], () => r(require('../components/wx/activity/2019SpringFestival/2019SpringFestival.vue')), 'spring')  // 2019春节活动
const recordList = r => require.ensure([], () => r(require('../components/wx/activity/2019SpringFestival/recordList.vue')), 'spring')  // 2019春节活动列表页
const sharePage = r => require.ensure([], () => r(require('../components/wx/activity/2019SpringFestival/sharePage.vue')), 'spring')  // 2019春节活动列表页

Vue.use(VueRouter);


export default new VueRouter({
    history: false,
    base: __dirname,
    linkActiveClass: 'link-active',
    routes: [{
            path: '/',
            component: wxEntrance,
            children: [
                { path: '/', redirect: '/wxIndex' },
                { name: 'wxIndex', path: '/wxIndex', component: wxIndex, meta: { requireAuth: false } },
                { name: 'wxInvest', path: '/wxInvest', component: wxInvest, meta: { requireAuth: false } }, //标的列表
                { name: 'wxDetailPoint', path: '/wxDetailPoint', component: wxDetailPoint, meta: { requireAuth: false } }, //点对点标的出借详情页
                { name: 'wxFinaPlanBorrowers', path: '/wxFinaPlanBorrowers', component: wxFinaPlanBorrowers, meta: { requireAuth: false } }, //点对点标的出借详情页
                { name: 'wxFinaPlanBorrowers2', path: '/wxFinaPlanBorrowers2', component: wxFinaPlanBorrowers2, meta: { requireAuth: false } }, //点对点标的出借详情页3.3.3
                { name: 'wxInvestRecordPoint', path: '/wxInvestRecordPoint', component: wxInvestRecordPoint, meta: { requireAuth: false } }, //点对点标的出借详情页
                { name: 'wxInvestRecordPoint2', path: '/wxInvestRecordPoint2', component: wxInvestRecordPoint2, meta: { requireAuth: false } }, //点对点标的出借详情页3.3.3
                { name: 'wxIdpoint', path: '/wxIdpoint', component: wxIdpoint, meta: { requireAuth: false } }, //点对点标的出借详情页
                { name: 'wxIdpoint2', path: '/wxIdpoint2', component: wxIdpoint2, meta: { requireAuth: false } }, //点对点标的出借详情页3.3.3
                { name: 'wxInvestDescribe', path: '/wxInvestDescribe', component: wxInvestDescribe, meta: { requireAuth: false } }, //了解项目
                { name: 'wxFind', path: '/wxFind', component: wxFind, meta: { requireAuth: false } },//发现页面
                { name: 'wxFindChild', path: '/wxFindChild', component: wxFindChild, meta: { requireAuth: false } },
                { name: 'wxThreeCard', path: '/wxThreeCard', component: wxThreeCard, meta: { requireAuth: false } }, //了解三类卡
                { name: 'wxAppreciationResult', path: '/wxAppreciationResult', component: wxAppreciationResult, meta: { requireAuth: false } }, //开通委托付款结果页
                { name: 'wxInvestAgreement', path: '/wxInvestAgreement', component: wxInvestAgreement, meta: { requireAuth: false } }, //出借服务协议
                { name: 'wxValueAgreement', path: '/wxValueAgreement', component: wxValueAgreement, meta: { requireAuth: false } }, //增值服务协议
                { name: 'wxDcPlanServiceAgreement', path: '/wxDcPlanServiceAgreement', component: wxDcPlanServiceAgreement, meta: { requireAuth: false } }, //定存计划服务协议
                { name: 'wxFinancing', path: '/wxFinancing', component: wxFinancing, meta: { requireAuth: false } }, //融资服务协议
                { name: 'wxBorrowAgreement', path: '/wxBorrowAgreement', component: wxBorrowAgreement, meta: { requireAuth: false } }, //借款协议
                { name: 'wxBondsTransferAgreement', path: '/wxBondsTransferAgreement', component: wxBondsTransferAgreement, meta: { requireAuth: false } }, //债权转让协议
                { name: 'wxRegisterAgreement', path: '/wxRegisterAgreement', component: wxRegisterAgreement, meta: { requireAuth: false } }, //服务协议
                { name: 'wxZSdealAgreement', path: '/wxZSdealAgreement', component: wxZSdealAgreement, meta: { requireAuth: false } }, //服务协议
                { name: 'wxRiskDisclosureBook', path: '/wxRiskDisclosureBook', component: wxRiskDisclosureBook, meta: { requireAuth: false } }, //风险揭示书
                { name: 'wxUserAuthorizeProxy', path: '/wxUserAuthorizeProxy', component: wxUserAuthorizeProxy, meta: { requireAuth: false } }, //用户授权委托书
                { name: 'transferFund', path: '/transferFund', component: transferFund, meta: { requireAuth: false } }, // 余额转移授权委托书
                { name: 'electronicSeal', path: '/electronicSeal', component: electronicSeal, meta: { requireAuth: false } }, // 电子签章风险提示
                { name: 'digitalCertificate', path: '/digitalCertificate', component: digitalCertificate, meta: { requireAuth: false } }, // 数字证书服务协议
                { name: 'wxZSentrustAgreement', path: '/wxZSentrustAgreement', component: wxZSentrustAgreement, meta: { requireAuth: false } }, //服务协议
                { name: 'wxShortcutCard', path: '/wxShortcutCard', component: wxShortcutCard, meta: { requireAuth: false } }, //快捷充值

                { name: 'wxKnowCard', path: '/wx/open/threeCard.html', component: wxKnowCard, meta: { requireAuth: false } }, //了解三类卡线上重定向
                { name: 'reportDetails', path: '/info/reportDetails', component: reportDetails, meta: { requireAuth: false } }, // 数据报告模板详情页
                { name: 'newReportDetails', path: '/info/newReportDetails', component: newReportDetails, meta: { requireAuth: false } }, // 新的数据报告模板详情页
                { name: 'commonProblem', path: '/info/commonProblem', component: commonProblem, meta: { requireAuth: false } }, // 数据报告模板列表页
                { name: 'luckyDraw', path: '/wx/luckyDraw', component: luckyDraw, meta: { requireAuth: false } }, // 20亿站内
                { name: 'luckyDrawForeign', path: '/wx/luckyDrawForeign', component: luckyDrawForeign, meta: { requireAuth: false } }, // 20亿站外
                { name: 'wxMakePublic', path: '/makePublic', component: wxMakePublic, meta: { requireAuth: false } }, // 实时数据
                { name: 'wxDisclosure', path: '/wxDisclosure', component: wxDisclosure, meta: { requireAuth: false } }, // 信息披露

                { name: 'h5ToAppTest', path: '/h5ToAppTest', component: h5ToAppTest, meta: { requireAuth: false } },
                { name: 'authorization', path: '/authorization', component: authorization, meta: { requireAuth: false } },
                
                {
                    name: 'wxMyAccount',
                    path: '/wxMyAccount',
                    component: wxMyAccount,
                    children: [
                        { path: '/wxMyAccount', component: wxAccount, meta: { requireAuth: false } },
                        { name: 'wxAccount', path: '/wxMyAccount/wxAccount', component: wxAccount, meta: { requireAuth: false } },
                        { name: 'wxCommonAccount', path: '/wxMyAccount/wxCommonAccount', component: wxCommonAccount, meta: { requireAuth: true } }, //普通账户
                        { name: 'wxZsAccount', path: '/wxMyAccount/wxZsAccount', component: wxZsAccount, meta: { requireAuth: true } }, //浙商账户
                        { name: 'wxLog', path: '/wxMyAccount/wxLog', component: wxLog, meta: { requireAuth: true } }, //资金流水

                        { name: 'wxRepayPlan', path: '/wxMyAccount/wxRepayPlan', component: wxRepayPlan, meta: { requireAuth: true } },
                        { name: 'wxTotalAssets', path: '/wxMyAccount/wxTotalAssets', component: wxTotalAssets, meta: { requireAuth: true } }, //资产总览页面
                        { name: 'wxHelpCenters', path: '/wxMyAccount/wxHelpCenters', component: wxHelpCenters, meta: { requireAuth: false } }, //微信帮助中心首页
                        { name: 'wxHelpCenterTab', path: '/wxMyAccount/wxHelpCenterTab', component: wxHelpCenterTab, meta: { requireAuth: false } }, //微信赚吧帮助中心列表
                        { name: 'wxHelpBorrowTab', path: '/wxMyAccount/wxHelpBorrowTab', component: wxHelpBorrowTab, meta: { requireAuth: false } }, //微信花吧帮助中心列表
                        { name: 'wxHelpSpendTab', path: '/wxMyAccount/wxHelpSpendTab', component: wxHelpSpendTab, meta: { requireAuth: false } }, //微信花吧帮助中心列表
                        { name: 'wxFeedbackIndex', path: '/wxMyAccount/wxFeedbackIndex', component: wxFeedbackIndex, meta: { requireAuth: false } }, //微信反馈列表页
                        { name: 'wxFeedbackContent', path: '/wxMyAccount/wxFeedbackContent', component: wxFeedbackContent, meta: { requireAuth: false } }, //微信反馈内容页
                        {
                            name: 'wxInvestListIn',
                            path: '/wxMyAccount/wxInvestListIn',
                            component: wxInvestListIn,
                            children: [
                                { name: 'wxInvestManage', path: '/wxMyAccount/wxInvestListIn/wxInvestManage', component: wxInvestManage, meta: { requireAuth: true } },
                                { name: 'wxInvestMaDetail', path: '/wxMyAccount/wxInvestListIn/wxInvestMaDetail', component: wxInvestMaDetail, meta: { requireAuth: true } }, //出借记录详情
                                { name: 'wxInvestDetailBorrower', path: '/wxMyAccount/wxInvestListIn/wxInvestDetailBorrower', component: wxInvestDetailBorrower, meta: { requireAuth: true } }, //出借记录详情里的借款人列表

                            ],
                            meta: { requireAuth: true }
                        },
                        { name: 'wxRedPacket', path: '/wxMyAccount/wxRedPacket', component: wxRedPacket, meta: { requireAuth: true } },
                        { name: 'redpacketUseInstruction', path: '/wxMyAccount/redpacketUseInstruction', component: redpacketUseInstruction, meta: { requireAuth: false } },
                        { name: 'wxSafe', path: '/wxMyAccount/wxSafe', component: wxSafe, meta: { requireAuth: true } },
                        { name: 'wxSetting', path: '/wxMyAccount/wxSetting', component: wxSetting, meta: { requireAuth: true } },
                        { name: 'wxAlterPwd', path: '/wxMyAccount/wxAlterPwd', component: wxAlterPwd, meta: { requireAuth: true } }, //修改密码
                        { name: 'wxMessage', path: '/wxMyAccount/wxMessage', component: wxMessage, meta: { requireAuth: true } }, //消息中心
                        { name: 'wxMessageChild', path: '/wxMyAccount/wxMessageChild', component: wxMessageChild, meta: { requireAuth: true } }, //消息中心
                        { name: 'wxPwdIndex', path: '/wxMyAccount/wxPwdIndex', component: wxPwdIndex, meta: { requireAuth: true } }, //密码管理
                        { name: 'wxTradePwd', path: '/wxMyAccount/wxTradePwd', component: wxTradePwd, meta: { requireAuth: true } }, //设置交易密码
                        { name: 'wxTradePwdNew', path: '/wxMyAccount/wxTradePwdNew', component: wxTradePwdNew, meta: { requireAuth: true } }, //设置交易密码新1
                        { name: 'wxTradeSetPwdNew', path: '/wxMyAccount/wxTradeSetPwdNew', component: wxTradeSetPwdNew, meta: { requireAuth: true } }, //设置交易密码新2
                        { name: 'wxTradeSetPwdNewTow', path: '/wxMyAccount/wxTradeSetPwdNewTow', component: wxTradeSetPwdNewTow, meta: { requireAuth: true } }, //设置交易密码新3
                        { name: 'wxForgetPwd', path: '/wxMyAccount/wxForgetPwd', component: wxForgetPwd, meta: { requireAuth: true } }, //忘记交易密码
                        { name: 'wxRealname', path: '/wxMyAccount/wxRealname', component: wxRealname, meta: { requireAuth: true } }, //实名认证
                        { name: 'wxRealMsg', path: '/wxMyAccount/wxRealMsg', component: wxRealMsg, meta: { requireAuth: true } }, //实名信息
                        { name: 'wxAccountAddressList', path: '/wxMyAccount/wxAccountAddressList', component: wxAccountAddressList, meta: { requireAuth: false } }, //设置里面地址列表
                        { name: 'wxRealnameSucc', path: '/wxMyAccount/wxRealnameSucc', component: wxRealnameSucc, meta: { requireAuth: true } }, //实名结果
                        { name: 'vipUser', path: '/wxMyAccount/vipUser', component: vipUser, meta: { requireAuth: false } }, //新版VIP
                        { name: 'Eclub', path: '/wxMyAccount/Eclub', component: Eclub, meta: { requireAuth: false } }, //E家俱乐部
                        { name: 'userVip', path: '/userVip', component: vipUser, meta: { requireAuth: false } }, //新版VIP footer上的tab
                        { name: 'wxUpgrade', path: '/wxMyAccount/wxUpgrade', component: wxUpgrade, meta: { requireAuth: false } }, //新版升级攻略
                        { name: 'privilegeDetails', path: '/wxMyAccount/privilegeDetails', component: privilegeDetails, meta: { requireAuth: false } }, //新版特权攻略
                        { name: 'vipFlaunt', path: '/wxMyAccount/vipFlaunt', component: vipFlaunt, meta: { requireAuth: false } }, //新版特权攻略
                        { name: 'vipWelfare', path: '/wxMyAccount/vipWelfare', component: vipWelfare, meta: { requireAuth: false } }, //新版特权攻略
                        
                        { name: 'wxZSwait', path: '/wxMyAccount/wxZSwait', component: wxZSwait, meta: { requireAuth: false } }, //存管账户
                        { name: 'wxNextCard', path: '/wxMyAccount/wxNextCard', component: wxNextCard, meta: { requireAuth: false } }, //改卡下一步
                        { name: 'wxAmendPhone', path: '/wxMyAccount/wxAmendPhone', component: wxAmendPhone, meta: { requireAuth: false } }, //修改手机号
                        { name: 'wxAmendSuccess', path: '/wxMyAccount/wxAmendSuccess', component: wxAmendSuccess, meta: { requireAuth: false } }, //修改结果页
                        { name: 'transferResult', path: '/transferResult', component: transferResult, meta: { requireAuth: false } }, //余额转移结果页面
                        { name: 'wxAmendCheck', path: '/wxMyAccount/wxAmendCheck', component: wxAmendCheck, meta: { requireAuth: false } }, //审核页
                        { name: 'wxFailureAudit', path: '/wxMyAccount/wxFailureAudit', component: wxFailureAudit, meta: { requireAuth: false } }, //线下失败
                        { name: 'wxAmendExample', path: '/wxMyAccount/wxAmendExample', component: wxAmendExample, meta: { requireAuth: false } }, //线下示例
                        {
                            name: 'wxAmendCard',
                            path: '/wxMyAccount/wxAmendCard',
                            component: wxAmendCard,
                            children: [
                                { path: '/wxMyAccount/wxAmendCard', component: wxToAmendCard, meta: { requireAuth: false } },
                                { name: 'wxAmendBank', path: '/wxMyAccount/wxAmendCard/wxAddBank', component: wxAddBank, meta: { requireAuth: false } },
                                { name: 'wxAmendGetCity', path: '/wxMyAccount/wxAmendCard/wxGetCity', component: wxGetCity, meta: { requireAuth: false } }, //选择城市
                                { name: 'wxAmendSearch', path: '/wxMyAccount/wxAmendCard/wxSearch', component: wxSearch, meta: { requireAuth: false } }, //搜索支行
                            ],
                            meta: { requireAuth: false }
                        }, //修改存管卡
                        { name: 'wxMyCard', path: '/wxMyAccount/wxMyCard', component: wxMyCard, meta: { requireAuth: true } }, //我的银行卡
                        {
                            name: 'wxBindingCard',
                            path: '/wxMyAccount/wxBindingCard',
                            component: wxBindingCard,
                            children: [
                                { path: '/wxMyAccount/wxBindingCard', component: wxSinaCard, meta: { requireAuth: true } }, //新浪绑卡
                                { name: 'wxSinaBank', path: '/wxMyAccount/wxBindingCard/wxAddBank', component: wxAddBank, meta: { requireAuth: true } }, //选择银行
                                { name: 'wxSinaGetCity', path: '/wxMyAccount/wxBindingCard/wxGetCity', component: wxGetCity, meta: { requireAuth: true } }, //选择城市
                                { name: 'wxBindingSucc', path: '/wxMyAccount/wxBindingCard/wxBindingSucc', component: wxBindingSucc, meta: { requireAuth: true } }, //选择城市
                                { name: 'wxThreeCard', path: '/wxMyAccount/wxThreeCard', component: wxThreeCard, meta: { requireAuth: false } }, //了解三类卡
                                { name: 'wxKnowCard', path: '/wxMyAccount/wxKnowCard', component: wxKnowCard, meta: { requireAuth: false } }, //了解三类卡
                            ],
                            meta: { requireAuth: false }
                        }, //新浪绑卡
                        { name: 'wxRemainingInvest', path: '/wxMyAccount/wxRemainingInvest', component: wxRemainingInvest, meta: { requireAuth: false } }, //余额智投
                        { name: 'wxRemainingInvestExplain', path: '/wxMyAccount/wxRemainingInvestExplain', component: wxRemainingInvestExplain, meta: { requireAuth: false } }, //关于余额智投解释
                        { name: 'wxRemainInvestAgreement', path: '/wxMyAccount/wxRemainingInvest/agreement', component: wxRemainInvestAgreement, meta: { requireAuth: false } }, //关于余额智投解释
                    ],
                    meta: { requireAuth: false }
                }, //我的
                { name: 'wxDetail', path: '/wxDetail', component: wxDetail, meta: { requireAuth: true } }, //标的详情
                { name: 'detail', path: '/invest/detail', component: wxDetail, meta: { requireAuth: true } }, //标的详情做投之家授权登录专用
                { name: 'wxLogin', path: '/wxLogin', component: wxLogin, meta: { requireAuth: false } },
                { name: 'wxRegister', path: '/wxRegister', component: wxRegister, meta: { requireAuth: false } }, //注册
                { name: 'wxRegisterNew', path: '/wxRegisterNew', component: wxRegisterNew, meta: { requireAuth: false } }, //注册新
                { name: 'wxRegisterSet', path: '/wxRegisterSet', component: wxRegisterSet, meta: { requireAuth: false } }, //注册新设置密码
                { name: 'wxRegisterSucc', path: '/wxRegisterSucc', component: wxRegisterSucc, meta: { requireAuth: false } }, //注册新设置密码

                { name: 'wxAnnouncement', path: '/wxAnnouncement', component: wxAnnouncement, meta: { requireAuth: false } }, //网站公告
                { name: 'wxNotice', path: '/wxNotice', component: wxNotice, meta: { requireAuth: false } }, //常见问题
                { name: 'newTask', path: '/newTask', component: newTask, meta: { requireAuth: false } }, //新手任务
                { name: 'wxNeedBorrow', path: '/wxNeedBorrow', component: wxNeedBorrow, meta: { requireAuth: false } }, //我要借款
                { name: 'wxDredgeSuccess', path: '/wxDredgeSuccess', component: wxDredgeSuccess, meta: { requireAuth: false } },
                { name: 'wxDredgeDefeat', path: '/wxDredgeDefeat', component: wxDredgeDefeat, meta: { requireAuth: false } },
                { name: 'wxGetPwd', path: '/wxGetPwd', component: wxGetPwd, meta: { requireAuth: false } }, //忘记密码
                { name: 'wxGetMessage', path: '/wxGetMessage', component: wxGetMessage, meta: { requireAuth: false } }, //获取短信
                { name: 'wxSetPwd', path: '/wxSetPwd', component: wxSetPwd, meta: { requireAuth: false } }, //重置密码

                { name: 'wxBorrower', path: '/wxBorrower', component: wxBorrower, meta: { requireAuth: false } },
                { name: 'wxBorrowerDetail', path: '/wxBorrowerDetail', component: wxBorrowerDetail, meta: { requireAuth: false } },
                { name: 'wxBorrowerDetail2', path: '/wxBorrowerDetail2', component: wxBorrowerDetail2, meta: { requireAuth: false } }, //3.3.3
                { name: 'wxInvestRecord', path: '/wxInvestRecord', component: wxInvestRecord, meta: { requireAuth: false } },

                { name: 'wxDrawings', path: '/wxDrawings', component: wxDrawings, meta: { requireAuth: false } }, //提现路由
                { name: 'wxNewrecharge', path: '/wxNewrecharge', component: wxNewrecharge, meta: { requireAuth: false } }, //充值路由
                { name: 'wxMoneyRecord', path: '/wxMoneyRecord', component: wxMoneyRecord, meta: { requireAuth: false } }, //充值提现记录
                { name: 'wxSinaMoneyRecord', path: '/wxSinaMoneyRecord', component: wxSinaMoneyRecord, meta: { requireAuth: false } }, //新浪充值提现记录
                { name: 'wxRechargeResult', path: '/wxRechargeResult', component: wxRechargeResult, meta: { requireAuth: false } }, //充值结果页
                { name: 'wxExtractResult', path: '/wxExtractResult', component: wxExtractResult, meta: { requireAuth: false } }, //提现结果页
                { name: 'moneyTransferApp', path: '/moneyTransferApp', component: moneyTransferApp, meta: { requireAuth: false } }, // APP余额转移结果（页空白页）
                { name: 'wxZsDrawings', path: '/wxZsDrawings', component: wxZsDrawings, meta: { requireAuth: false } }, //浙商提现
                { name: 'wxZsNewrechargeChild', path: '/wxZsNewrechargeChild', component: wxZsNewrechargeChild, meta: { requireAuth: false } }, //浙商充值
                { name: 'wxZsNewrecharge', path: '/wxZsNewrecharge', component: wxZsNewrecharge, meta: { requireAuth: false } }, //浙商充值总页面
                { name: 'wxZsMoneyRecord', path: '/wxZsMoneyRecord', component: wxZsMoneyRecord, meta: { requireAuth: false } }, //浙商充值提现结果页
                { name: 'wxZsNewRechargeRecord', path: '/wxZsNewRechargeRecord', component: wxZsNewRechargeRecord, meta: { requireAuth: false } }, //充值记录
                { name: 'wxZsNewDrawingsRecord', path: '/wxZsNewDrawingsRecord', component: wxZsNewDrawingsRecord, meta: { requireAuth: false } }, //充值记录
                { name: 'wxZsMoneyResult', path: '/wxZsMoneyResult', component: wxZsMoneyResult, meta: { requireAuth: false } }, //充值提现记录
                { name: 'wxOpenBank', path: '/wxOpenBank', component: wxOpenBank, meta: { requireAuth: false } }, //开户银行
                { name: 'wxBigMoney', path: '/wxBigMoney', component: wxBigMoney, meta: { requireAuth: false } }, //开户银行
                { name: 'transferRecharge', path: '/transferRecharge', component: transferRecharge, meta: { requireAuth: false } }, //转账充值
                { name: 'TransferProcess', path: '/TransferProcess', component: TransferProcess, meta: { requireAuth: false } }, //银行转账流程
                { name: 'wxRiskAssessment', path: '/wxRiskAssessment', component: wxRiskAssessment, meta: { requireAuth: false } },
                {
                    name: 'wxinvestIn',
                    path: '/wxinvestIn',
                    component: wxInvestIn,
                    children: [
                        { path: '/wxinvestIn', component: wxInvestMoney, meta: { requireAuth: true } },
                        { name: 'wxInvestMoney', path: '/wxInvestIn/wxInvestMoney', component: wxInvestMoney, meta: { requireAuth: true } },
                        { name: 'wxInvestMoneyPoint', path: '/wxInvestIn/wxInvestMoneyPoint', component: wxInvestMoneyPoint, meta: { requireAuth: true } },
                        { name: 'wxInvestRed', path: '/wxInvestIn/wxInvestRed', component: wxInvestRed, meta: { requireAuth: false } }, //使用红包
                        { name: 'wxInvestUpApr', path: '/wxInvestIn/wxInvestUpApr', component: wxInvestUpApr, meta: { requireAuth: false } }, //使用加息
                        { name: 'wxInvestExper', path: '/wxInvestIn/wxInvestExper', component: wxInvestExper, meta: { requireAuth: false } }, //使用体验
                        { name: 'wxInvestResult', path: '/wxInvestIn/wxInvestResult', component: wxInvestResult, meta: { requireAuth: false } }, //出借结果-成功
                        { name: 'wxZsInvestResult', path: '/wxInvestIn/wxZsInvestResult', component: wxZsInvestResult, meta: { requireAuth: false } }, //出借结果-成功
                        { name: 'wxNewInvestRed', path: '/wxInvestIn/wxNewInvestRed', component: wxNewInvestRed, meta: { requireAuth: false } }, //出借优惠券
                        { name: 'wxNewInvestRedPacket', path: '/wxInvestIn/wxNewInvestRedPacket', component: wxNewInvestRedPacket, meta: { requireAuth: false } }, //出借优惠券
                        { name: 'wxVipTicket', path: '/wxInvestIn/wxVipTicket', component: wxVipTicket, meta: { requireAuth: false } }, //出借优惠券
                        { name: 'wxNewInvestUpApr', path: '/wxInvestIn/wxNewInvestUpApr', component: wxNewInvestUpApr, meta: { requireAuth: false } }, //出借优惠券
                    ],
                    meta: { requireAuth: true }
                }, //出借路由
                {
                    name: 'wxDepository',
                    path: '/wxDepository',
                    component: wxDepository,
                    children: [
                        { path: '/wxDepository', component: wxOpenDepository, meta: { requireAuth: true } },
                        { name: 'wxOpenDepository', path: '/wxDepository/wxOpenDepository', component: wxOpenDepository, meta: { requireAuth: false } }, //选择银行
                        { name: 'wxAddBank', path: '/wxDepository/wxAddBank', component: wxAddBank, meta: { requireAuth: false } }, //选择银行
                        { name: 'wxSearch', path: '/wxDepository/wxSearch', component: wxSearch, meta: { requireAuth: false } }, //搜索支行
                        { name: 'wxGetCity', path: '/wxDepository/wxGetCity', component: wxGetCity, meta: { requireAuth: false } }, //选择城市
                        { name: 'wxDepositorySucc', path: '/wxDepository/wxDepositorySucc', component: wxDepositorySucc, meta: { requireAuth: false } }, //开户失败
                        { name: 'wxZSdealAgreement', path: '/wxDepository/wxZSdealAgreement', component: wxZSdealAgreement, meta: { requireAuth: false } }, //服务协议
                        { name: 'wxZSentrustAgreement', path: '/wxDepository/wxZSentrustAgreement', component: wxZSentrustAgreement, meta: { requireAuth: false } }, //服务协议
                    ],
                    meta: { requireAuth: false }
                }, //存管入口
                { name: 'wxInvitationIndex', path: '/wxInvitationIndex', component: fortuneIndex, meta: { requireAuth: false } }, //邀请首页改版
                { name: 'authorized', path: '/wx/authorized', component: authorized, meta: { requireAuth: false } }, // 投之家授权页
                { name: 'pageMiddle', path: '/tzj/pageMiddle', component: pageMiddle, meta: { requireAuth: false } }, // 投之家点对点跳转页面
                { name: 'fclcAuthorized', path: '/fclc/authorized', component: fclcAuthorized, meta: { requireAuth: false } }, // 风车理财授权页
                { name: 'fclcPageMiddle', path: '/fclc/pageMiddle', component: fclcPageMiddle, meta: { requireAuth: false } }, // 风车理财点对点跳转页面
                { name: 'wdtyAuthorized', path: '/wdty/authorized', component: wdtyAuthorized, meta: { requireAuth: false } }, // 网贷天眼授权页
                { name: 'wdtyPageMiddle', path: '/wdty/pageMiddle', component: wdtyPageMiddle, meta: { requireAuth: false } }, // 网贷天眼点对点跳转页面
                { name: 'cllcPageMiddle', path: '/cllc/pageMiddle', component: cllcPageMiddle, meta: { requireAuth: false } }, // 车轮理财自动登录跳转页面
                { name: 'wxNewPeople', path: '/wxNewPeople', component: wxNewPeople, meta: { requireAuth: false } }, //新手专享
                { name: 'wxNewOnly', path: '/wxNewOnly', component: wxNewOnly, meta: { requireAuth: false } }, //新手专享1214,12点替换链接
                { name: 'wxTwoBillion', path: '/wxTwoBillion', component: wxTwoBillion, meta: { requireAuth: false } }, //跨越20亿 开启新征程
                { name: 'wxGetValue', path: '/wxGetValue', component: wxGetValue, meta: { requireAuth: false } }, //获取贡献值
                { name: 'wxUseValue', path: '/wxUseValue', component: wxUseValue, meta: { requireAuth: false } }, //消耗贡献值
                { name: 'wxHasGoods', path: '/wxHasGoods', component: wxHasGoods, meta: { requireAuth: false } }, //兑换福利1
                { name: 'wxHasGoods2', path: '/wxHasGoods2', component: wxHasGoods2, meta: { requireAuth: false } }, //兑换福利2
                { name: 'mainVenue', path: '/mainVenue', component: mainVenue, meta: { requireAuth: false } }, //主会场1
                { name: 'mainVenue2', path: '/mainVenue2', component: mainVenue2, meta: { requireAuth: false } }, //主会场2
                { name: 'mainVenue3', path: '/mainVenue3', component: mainVenue3, meta: { requireAuth: false } }, //主会场2
                { name: 'welcomeBank', path: '/welcomeBank', component: welcomeBank, meta: { requireAuth: false } }, //存管上线领红包活动
                { name: 'refactoringGuide', path: '/refactoringGuide', component: refactoringGuide, meta: { requireAuth: false } }, //存管开通流程
                { name: 'operationalData', path: '/data/operationalData', component: operationalData, meta: { requireAuth: false } }, // E都市钱包2017年9月份运营报告
                { name: 'Eplan', path: '/data/Eplan', component: Eplan, meta: { requireAuth: false } }, // E计划活动
                { name: '2017YearData', path: '/data/2017YearData', component: YearData, meta: { requireAuth: false } }, // 2017 年度运营报告
                { name: 'toAppStore', path: '/data/toAppStore', component: toAppStore, meta: { requireAuth: false } }, // APP强制下载中间页
                { name: 'newsReport', path: '/data/newsReport', component: newsReport, meta: { requireAuth: false } }, // APP马甲包页面
                { name: 'customRedEnvelope', path: '/customRedEnvelope', component: customRedEnvelope, meta: { requireAuth: false } }, // 自定义领红包
                { name: 'customRedShare', path: '/customRedShare', component: customRedShare, meta: { requireAuth: false } }, // 自定义领红包分享页面
                { name: 'pickWelfare', path: '/ranking/pickWelfare', component: pickWelfare, meta: { requireAuth: false } }, // 摘福利冲榜大赛
                { name: 'rankingList', path: '/ranking/rankingList', component: rankingList, meta: { requireAuth: false } }, // 摘福利出借排行榜
                { name: 'tenMonthData', path: '/data/tenMonthData', component: tenMonthData, meta: { requireAuth: false } }, // E都市钱包2017年10月份运营报告				
                { name: 'wxComplianceDisclosure', path: '/data/wxComplianceDisclosure', component: wxComplianceDisclosure, meta: { requireAuth: false } }, // 合规进程披露
                { name: 'thanksgivingDayHome', path: '/thanksgiving/thanksgivingDayHome', component: thanksgivingDayHome, meta: { requireAuth: false } }, // 感恩节活动首页
                { name: 'thanksgivingDayPage', path: '/thanksgiving/thanksgivingDayPage', component: thanksgivingDayPage, meta: { requireAuth: false } }, // 感恩节活动滑动页
                { name: 'thanksgivingDayLastPage', path: '/thanksgiving/thanksgivingDayLastPage', component: thanksgivingDayLastPage, meta: { requireAuth: false } }, // 感恩节活动最后页		
                { name: 'tabTemplate', path: '/tab/tabTemplate', component: tabTemplate, meta: { requireAuth: false } }, // tab平台介绍
                { name: 'christmasRegister', path: '/activity/christmasRegister', component: christmasRegister, meta: { requireAuth: false } }, // 双蛋新用户活动注册页
                { name: 'nawChristmasInvitation', path: '/activity/nawChristmasInvitation', component: nawChristmasInvitation, meta: { requireAuth: false } }, // 双蛋新用户活动页
                { name: 'christmasAanNewYear', path: '/eggs/christmasAanNewYear', component: christmasAanNewYear, meta: { requireAuth: false } }, // 红包机圣诞活动
                { name: 'newYearDay', path: '/yd/newYearDay', component: newYearDay, meta: { requireAuth: false } }, // 红包机元旦活动
                { name: 'nianyKind', path: '/wx/nianyKind', component: nianyKind, meta: { requireAuth: false } }, // 红包机，年货盛宴，约战新年活动
                { name: 'iceSnowCarnival', path: '/wx/iceSnowCarnival', component: iceSnowCarnival, meta: { requireAuth: false } }, // 冰雪嘉年华活动页
                { name: 'iceSnowCarnivalInvitation', path: '/wx/iceSnowCarnivalInvitation', component: iceSnowCarnivalInvitation, meta: { requireAuth: false } }, // 冰雪嘉年华邀请页
                { name: 'festivalIndex', path: '/wx/festivalIndex', component: festivalIndex, meta: { requireAuth: false } }, // 元宵节活动
                { name: 'yxInvitation', path: '/wx/yxInvitation', component: yxInvitation, meta: { requireAuth: false } }, // 元宵节活动
                { name: 'goodLuckInAYear', path: '/wx/goodLuckInAYear', component: goodLuckInAYear, meta: { requireAuth: false } }, // 开年赢鸿运
                { name: 'theNewYearAboutWar', path: '/wx/theNewYearAboutWarLuckyBag', component: theNewYearAboutWar, meta: { requireAuth: false } }, // 约战新年拆福袋
                { name: 'theNewYearAboutWarPK', path: '/wx/theNewYearAboutWarPK', component: theNewYearAboutWarPK, meta: { requireAuth: false } }, // 约战新年战队
                { name: 'theNewYearAboutWarPKB', path: '/wx/theNewYearAboutWarPKB', component: theNewYearAboutWarPKB, meta: { requireAuth: false } }, // 约战新年福袋展示页
                { name: 'receiveRed', path: '/wx/receiveRed', component: receiveRed, meta: { requireAuth: false } }, // 领红包
                { name: 'wxVipLandPage', path: '/vipLandPage/wxVipLandPage', component: wxVipLandPage, meta: { requireAuth: false } }, // vip落地页
                { name: 'inviteLandPage', path: '/inviteLandPage', component: inviteLandPage, meta: { requireAuth: false } }, // 邀请落地页
                { name: 'exhibition', path: '/exhibition', component: exhibition, meta: { requireAuth: false } }, // 品宣活动
                { name: 'myAward', path: '/invite/myAward', component: myAward, meta: { requireAuth: false } }, // 我的奖励
                { name: 'newAward', path: '/invite/newAward', component: newAward, meta: { requireAuth: false } }, // 2.0奖励
                { name: 'showQcode', path: '/invite/showQcode', component: showQcode, meta: { requireAuth: false } }, // 二维码
                { name: 'inviteRegister', path: '/invite/inviteRegister', component: inviteRegister, meta: { requireAuth: false } }, // 邀请注册
                { name: 'wxAuthorizeRegister', path: '/register/wxAuthorizeRegister', component: wxAuthorizeRegister, meta: { requireAuth: false } }, // 微信授权时未注册跳转的注册页
                { name: 'wxBindResult', path: '/register/wxBindResult', component: wxBindResult, meta: { requireAuth: false } }, // 微信授权时已注册跳转的结果页
                { name: 'wxAuthorizeBind', path: '/register/wxAuthorizeBind', component: wxAuthorizeBind, meta: { requireAuth: false } }, // 微信授权绑定页面
                { name: 'wxAuthorizeIntroduction', path: '/wxAuthorizeIntroduction', component: wxAuthorizeIntroduction, meta: { requireAuth: false } }, // 微信授权介绍页
                // { name: 'inviteResult', path: '/invite/inviteResult', component: inviteResult, meta: { requireAuth: false } }, // 微信授权绑定注册结果页
                { name: 'inviteResult', path: '/invite/inviteResult', component: inviteResult, meta: { requireAuth: false } }, // 邀请注册结果页
                { name: 'inviteStrategy', path: '/invite/inviteStrategy', component: inviteStrategy, meta: { requireAuth: false } }, // 邀请教程
                { name: 'strategyReg', path: '/invite/strategyReg', component: strategyReg, meta: { requireAuth: false } }, // 注册教程
                { name: 'strategyAcc', path: '/invite/strategyAcc', component: strategyAcc, meta: { requireAuth: false } }, // 开户教程
                { name: 'strategyLoan', path: '/invite/strategyLoan', component: strategyLoan, meta: { requireAuth: false } }, // 出借教程
                { name: 'openApp', path: '/invite/openApp', component: openApp, meta: { requireAuth: false } }, // 唤醒
                { name: 'wxInviteTravel', path: '/wx/wxInviteTravel', component: wxInviteTravel, meta: { requireAuth: false } }, // wx邀请旅行
                { name: 'wxPrizeList', path: '/wx/wxPrizeList', component: wxPrizeList, meta: { requireAuth: false } }, // wx邀请旅行列表
                { name: 'wxInviteSharePage', path: '/wx/wxInviteSharePage', component: wxInviteSharePage, meta: { requireAuth: false } }, //wx邀请旅行分享页
                { name: 'appGuide', path: '/wx/appGuide', component: appGuide, meta: { requireAuth: false } }, //wx邀请旅行分享页
                { name: '618Chance', path: '/618Chance', component: chance, meta: { requireAuth: false } }, //邂逅618首页
                { name: '618ChanceDetails', path: '/618ChanceDetails', component: chanceDetails, meta: { requireAuth: false } }, //邂逅618详情页
                { name: '618ChanceShare', path: '/618ChanceShare', component: chanceShare, meta: { requireAuth: false } }, //邂逅618分享页
                { name: 'twoAnniversary', path: '/twoAnniversary', component: twoAnniversary, meta: { requireAuth: false } }, // 二周年庆典
                { name: 'prizeRecord', path: '/twoAnniversary/prizeRecord', component: prizeRecord, meta: { requireAuth: false } }, // 领二周年庆典取记录
                { name: 'videoShare', path: '/videoShare', component: videoShare, meta: { requireAuth: false } }, // 二周年庆典视频分享叶
                { name: 'security', path: 'security', component: security, meta: { requireAuth: false } }, //安全保障 
                // 渠道
                { name: 'channels', path: '/channels/:id', component: commonTemp, meta: { requireAuth: false } },
                { name: 'commonTempTouTiao', path: '/commonTempTouTiao', component: commonTempTouTiao, meta: { requireAuth: false } },   // 渠道爱上头条
                { path: '/channel/money', redirect: '/channels/money' }, // 菜鸟理财重定向路由
                //积分商城
	            { name: 'intIndex', path: '/intIndex', component: intIndex, meta: { requireAuth: false } }, //积分商城首页
	            { name: 'intAddress', path: '/intAddress', component: intAddress, meta: { requireAuth: false } }, //积分商城-添加地址
	            { name: 'intGoodDetail', path: '/intGoodDetail', component: intGoodDetail, meta: { requireAuth: false } }, //积分商城-商品详情
	            { name: 'intImgDetail', path: '/intImgDetail', component: intImgDetail, meta: { requireAuth: false } }, //积分商城-商品详情的图文详情
	            { name: 'intGoodList', path: '/intGoodList', component: intGoodList, meta: { requireAuth: false } }, //积分商城-商品列表
	            { name: 'intRecordDetail', path: '/intRecordDetail', component: intRecordDetail, meta: { requireAuth: false } }, //积分商城-积分明细
	            { name: 'intExchRecords', path: '/intExchRecords', component: intExchRecords, meta: { requireAuth: false } }, //积分商城-兑换记录
	            { name: 'intEarn', path: '/intEarn', component: intEarn, meta: { requireAuth: false } }, //积分商城-赚取积分
	            { name: 'intAddressList', path: '/intAddressList', component: intAddressList, meta: { requireAuth: false } }, //积分商城-地址列表
	            { name: 'intEditAddress', path: '/intEditAddress', component: intEditAddress, meta: { requireAuth: false } }, //积分商城-编辑地址
	            { name: 'signIn', path: '/signIn', component: signIn, meta: { requireAuth: false } }, //签到日历
	            { name: 'awardDetails', path: '/awardDetails', component: awardDetails, meta: { requireAuth: false } }, //兑换详情
	            { name: 'drawRecord', path: '/drawRecord', component: drawRecord, meta: { requireAuth: false } }, //兑换记录
	            { name: 'logistics', path: '/logistics', component: logistics, meta: { requireAuth: false } }, // 物流详情
	            { name: 'LuckDraw', path: '/LuckDraw', component: LuckDraw, meta: { requireAuth: false } }, // 积分抽奖游戏
	            { name: 'charitable', path: '/charitable', component: charitable, meta: { requireAuth: false } }, // 积分慈善公益活动模板
                { name: 'myCharity', path: '/charitable/myCharity', component: myCharity, meta: { requireAuth: false } }, // 我的慈善公益
                { name: 'gameList', path: '/gameList', component: gameList, meta: { requireAuth: false } }, // 积分商城游戏列表页面
                { name: 'LuckyDice', path: '/LuckyDice', component: LuckyDice, meta: { requireAuth: false } }, // 幸运骰子游戏
	            { name: 'diceRecord', path: '/LuckyDice/diceRecord', component: diceRecord, meta: { requireAuth: false } }, // 幸运骰子游戏获奖记录
	            //出海寻宝
	            { name: 'treasureIndex', path: '/vip/treasureIndex', component: treasureIndex, meta: { requireAuth: false } }, //寻宝首页
	            { name: 'treasureRult', path: '/vip/treasureRult', component: treasureRult, meta: { requireAuth: false } }, //寻宝规则
	            { name: 'exchangeRed', path: '/vip/exchangeRed', component: exchangeRed, meta: { requireAuth: false } }, //兑换红包
	            { name: 'redRecord', path: '/vip/redRecord', component: redRecord, meta: { requireAuth: false } }, //兑换红包记录
	            { name: 'seaRankingList', path: '/vip/seaRankingList', component: seaRankingList, meta: { requireAuth: false } }, //排行榜
	            { name: 'myPrecious', path: '/vip/myPrecious', component: myPrecious, meta: { requireAuth: false } }, //我的宝藏
	            { name: 'shareGift', path: '/vip/shareGift', component: shareGift, meta: { requireAuth: false } }, //出海分享有礼
	            { name: 'recruitSeaman', path: '/vip/recruitSeaman', component: recruitSeaman, meta: { requireAuth: false } }, //招募船员
	            { name: 'treasureHunt', path: '/vip/treasureHunt', component: treasureHunt, meta: { requireAuth: false } }, //出海寻宝分享
				// { name: 'commonQuestions', path: '/commonQuestions', component: commonQuestions, meta: { requireAuth: false } }, //常见问题           
				{ name: 'province', path: '/province', component: province, meta: { requireAuth: false } }, //省市区
                { name: 'moneyTransfer', path: '/moneyTransfer', component: moneyTransfer, meta: { requireAuth: false } }, // 余额转移
                { name: 'moneyTransferList', path: '/moneyTransferList', component: moneyTransferList, meta: { requireAuth: false } }, // 余额转移列表
                { name: 'charity', path: '/charity', component: charity, meta: { requireAuth: false } }, // 爱心公益活动
                { name: '518Carnival', path: '/518Carnival', component: Carnival, meta: { requireAuth: false } }, // 518财富嘉年华
                { name: 'carnivalRanking', path: '/ranking', component: carnivalRanking, meta: { requireAuth: false } }, // 518财富嘉年华排行榜
                { name: 'lovePublicity', path: '/lovePublicity', component: lovePublicity, meta: { requireAuth: false } }, // 爱心公益公示
                { name: 'intWishFrom', path: '/intWishFrom', component: intWishFrom, meta: { requireAuth: false } }, // 积分商城心愿
                { name: 'intWishList', path: '/intWishList', component: intWishList, meta: { requireAuth: false } }, // 积分商城爱心榜
                // wxClassIn
                { 
                	name: 'wxClassIn', 
                	path: '/wxClassIn', 
                	component: wxClassIn, children: [
                	{ name: 'riskEducation', path: '/risk/riskEducation', component: riskEducation, meta: { requireAuth: false } }, // 风险教育
                	{ name: 'wxAnnouncement', path: '/risk/wxAnnouncement', component: wxAnnouncement, meta: { requireAuth: false } }, //网站公告
                ]}, // 风险教育
                // { name: 'riskEducation', path: '/risk/riskEducation', component: riskEducation, meta: { requireAuth: false } }, // 风险教育
                { name: 'riskEducation2', path: '/risk/riskEducation2', component: riskEducation2, meta: { requireAuth: false } }, // 风险教育
                { name: 'shareVedio', path: '/risk/shareVedio', component: shareVedio, meta: { requireAuth: false } }, // 视频分享
                { name: 'toVedioPage', path: '/risk/toVedioPage', component: toVedioPage, meta: { requireAuth: false } }, // 视频分享
                { name: 'EFriendClass', path: '/risk/EFriendClass', component: EFriendClass, meta: { requireAuth: false } }, // 视频分享
                { name: 'riskLaws', path: '/risk/riskLaws', component: riskLaws, meta: { requireAuth: false } }, // 风险教育法律法规
                { name: 'riskKnowledge', path: '/risk/riskKnowledge', component: riskKnowledge, meta: { requireAuth: false } }, // 风险教育E友课堂
                { name: 'fiskVideo', path: '/risk/fiskVideo', component: fiskVideo, meta: { requireAuth: false } }, // 风险教育视屏专用页面
                { name: 'fiskVideo1', path: '/risk/fiskVideoTwo', component: fiskVideo1, meta: { requireAuth: false } }, // 风险教育视屏专用页面
                { name: 'riskNews', path: '/risk/riskNews', component: riskNews, meta: { requireAuth: false } }, // 风险教育行业新闻
                { name: 'anniversary', path: '/anniversary', component: anniversary, meta: { requireAuth: false } }, //两周年活动
                { name: 'picTpl', path: '/picTpl', component: picTpl, meta: { requireAuth: false } }, //纯图片页面模板
                { name: 'commandMain', path: 'command/commandMain', component: commandMain, meta: { requireAuth: false } }, // 红包口令首页
                { name: 'allRecord', path: 'command/allRecord', component: allRecord, meta: { requireAuth: true } }, // 红包口令-所有记录
                { name: 'myRecords', path: 'command/myRecords', component: myRecords, meta: { requireAuth: true } }, // 红包口令-我的记录
                { name: 'myRecordDetail', path: 'command/myRecordDetail', component: myRecordDetail, meta: { requireAuth: false } }, // 红包口令=我的详情
                { name: 'commandApp', path: 'command/appLinkPage', component: commandApp, meta: { requireAuth: false } }, // 红包口令-app引导页
                { name: 'happySummer', path: '/happySummer', component: happySummer, meta: { requireAuth: false } }, // happy E夏
                { name: 'happyRedList', path: '/happySummer/redList', component: happyRedList, meta: { requireAuth: false } }, // happy 红包列表
                { name: 'happyGoodList', path: '/happySummer/goodList', component: happyGoodList, meta: { requireAuth: false } }, // happy 商品兑换列表
                { name: 'happyGoodDetail', path: '/happySummer/goodDetail', component: happyGoodDetail, meta: { requireAuth: false } }, // happy 商品列表
                { name: 'happyInvite', path: '/happySummer/happyInvite', component: happyInvite, meta: { requireAuth: false } }, // happy 注册页
                { name: 'happyInviteResult', path: '/happySummer/happyInviteResult', component: happyInviteResult, meta: { requireAuth: false } }, // happy 注册页结果页
                { name: 'signMain', path: '/sign/signMain', component: signMain, meta: { requireAuth: false } }, // 签到有礼
                { name: 'supervise', path: '/supervise', component: supervise, children: [
                    { name: 'info', path: '/supervise/enrol', component: enrol, meta: { requireAuth: false } }, // 监督委员会报名阶段报名阶段
                    { name: 'info', path: '/supervise/enrol/info', component: info, meta: { requireAuth: false } }, // 监督委员会报名阶段报名阶段
                ] }, // 监督委员会  
                { name: 'constitution', path: '/supervise/constitution', component: constitution, meta: {requireAuth: false}},  // 监督委员会章程
                { name: 'signApp', path: '/sign/appShare', component: signApp, meta: { requireAuth: false } }, // 签到有礼分享页
                { name: 'schoolMain', path: '/school/schoolMain', component: schoolMain, meta: { requireAuth: false } }, // 开学季活动
                { name: 'schoolDetail', path: '/school/schoolDetail', component: schoolDetail, meta: { requireAuth: false } }, // 开学季详情页
                { name: 'zqFestival', path: '/activity/zqFestival', component: zqFestival, meta: { requireAuth: false } }, // 中秋节活动
                { name: 'festivalDetail', path: '/zqFestival/festivalDetail', component: festivalDetail, meta: { requireAuth: false } }, // 中秋节详情
                { name: 'zqFestivalInvite', path: '/zqFestival/zqFestivalInvite', component: zqFestivalInvite, meta: { requireAuth: false } }, // 中秋节邀请
                { name: 'midAdd', path: '/zqFestival/add', component: midAdd, meta: { requireAuth: false } }, // 中秋加场
                { name: 'gqFestivalGift', path: '/gq/gqFestivalGift', component: gqFestivalGift, meta: { requireAuth: false } }, // 国庆送礼活动
                { name: 'nationalDayPublicity', path: '/activity/nationalDayPublicity', component: nationalDayPublicity, meta: { requireAuth: false } }, // 国庆宣传
                { name: 'securityPublicity', path: '/activity/securityPublicity', component: securityPublicity, meta: { requireAuth: false } }, // 资产分散
                { name: 'schoolApp', path: '/school/appShare', component: schoolApp, meta: { requireAuth: false } }, // 开学季分享页
                { name: 'integralNationalDay', path: '/integral/integralNationalDay', component: integralNationalDay, meta: { requireAuth: false } }, // 积分商城2018国庆活动

                { name: 'filings', path: '/filing', component: filing, meta: { requireAuth: false } }, // 备案进程
                { name: 'bankDeposit', path: '/filing/bankDeposit', component: bankDeposit, meta: { requireAuth: false } }, // 备案进程的银行存管
                { name: 'electronicSignature', path: '/filing/electronicSignature', component: electronicSignature, meta: { requireAuth: false } }, // 备案进程的电子签章
                { name: 'commitment', path: '/filing/commitment', component: commitment, meta: { requireAuth: false } }, //  银行存管的合规经营承诺函
                { name: 'filingFile', path: '/filing/filingFile', component: filingFile, meta: { requireAuth: false } }, //  银行存管的16张图
                { name: 'nationalDay', path: '/nationalDay', component: nationalDay, meta: { requireAuth: false } },     //  国庆节活动
                { name: 'octoberActivity', path: '/activity/october', component: octoberActivity, meta: { requireAuth: false } },     //  十月活动
                { name: 'holidayIndex', path: '/everyHoliday/holidayIndex', component: holidayIndex, meta: { requireAuth: false } }, //每逢佳节
                { name: 'changeRecord', path: '/everyHoliday/changeRecord', component: changeRecord, meta: { requireAuth: false } }, //每逢佳节-我的兑换
                { name: 'main', path: '/doubleEleven/main', component: main, meta: { requireAuth: false } }, // 双十一活动主会场
                { name: 'meetingOne', path: '/doubleEleven/meetingOne', component: meetingOne, meta: { requireAuth: false } }, // 双十一活动会场一
                { name: 'activityRedRecord', path: '/doubleEleven/activityRedRecord', component: activityRedRecord, meta: { requireAuth: false } }, // 双十一活动会场一红包记录
                { name: 'meetingTwo', path: '/doubleEleven/meetingTwo', component: meetingTwo, meta: { requireAuth: false } }, // 双十一活动会场二
                { name: 'meetingTwoDrawRecord', path: '/doubleEleven/meetingTwoDrawRecord', component: meetingTwoDrawRecord, meta: { requireAuth: false } }, // 双十一活动会场二抽奖记录
                { name: 'meetingThree', path: '/doubleEleven/meetingThree', component: meetingThree, meta: { requireAuth: false } }, // 双十一活动会场三
                { name: 'meetingThreeRecord', path: '/doubleEleven/meetingThreeRecord', component: meetingThreeRecord, meta: { requireAuth: false } }, // 双十一活动分会场三兑换记录
                { name: 'festTemplate1', path: '/festMain/index', component: festMain, meta: { requireAuth: false } }, //双十一预热
                { name: 'festTemplate1', path: '/festMain/record', component: festRecord, meta: { requireAuth: false } }, //双十一预热记录
                { name: 'thanksgiving', path: '/activity/thanksgiving', component: thanksgiving, meta: { requireAuth: false } }, // 感恩有礼活动
                { name: 'festTemplate2', path: '/festMain2/index', component: festMain2, meta: { requireAuth: false } }, //双十一助力
                { name: 'festTemplate2', path: '/festMain2/record', component: festRecord2, meta: { requireAuth: false } }, //双十一助力记录
                { name: 'festTemplate2', path: '/festMain2/detail', component: festDetail, meta: { requireAuth: false } }, //双十一助力详情
                { name: 'wdzjAuthorized', path: '/wdzjAuthorized', component: wdzjAuthorized, meta: { requireAuth: false } }, //网贷之家一键登录授权页面
                { name: 'cutRedEnvelope', path: '/cutRedEnvelope/index', component: cutRedEnvelope, meta: { requireAuth: false } }, //砍红包 
                { name: 'cutHelp', path: '/cutRedEnvelope/cutHelp', component: cutHelp, meta: { requireAuth: false } }, //邀请砍红包
                { name: 'vipUpdate', path: '/activity/vipUpdate', component: vipUpdate, meta: { requireAuth: false } }, //Vip专属活动
                { name: 'richPlanActivity', path: '/wx/richPlanActivity', component: richPlanActivity, meta: { requireAuth: false } }, //发财计划活动页
                { name: 'richPlanList', path: '/wx/richPlanList', component: richPlanList, meta: { requireAuth: false } }, //发财计划活动获奖列表
                { name: 'christmas2018', path: '/wx/christmas2018', component: christmas2018, meta: { requireAuth: false } }, //2018年圣诞活动
                { name: 'bill', path: '/wx/bill', component: bill, meta: { requireAuth: false } }, //年度账单
                { name: 'shareBill', path: '/wx/shareBill', component: shareBill, meta: { requireAuth: false } }, //年度账单APP分享
                { name: 'festTemplate3', path: '/festMai3/index', component: festMain3, meta: { requireAuth: false } }, //活动模版3
                { name: 'festTemplate3', path: '/festMai3/record', component: festRecord3, meta: { requireAuth: false } }, //活动模版3兑换记录
                { name: 'sendRedIndex', path: '/wx/sendRedIndex', component: sendRedIndex, meta: { requireAuth: false } }, //猪年红包天天发
                { name: 'shareFriends', path: '/wx/shareFriends', component: shareFriends, meta: { requireAuth: false } }, //发好友，分享出去的页面
                { name: 'friendTask', path: '/wx/friendTask', component: friendTask, meta: { requireAuth: false } }, //发好友，好友任务的页面
                { name: 'openAppLink', path: '/wx/openAppLink', component: openAppLink, meta: { requireAuth: false } }, //发好友，好友任务的页面
                { name: 'openRed', path: '/wx/openRed', component: openRed, meta: { requireAuth: false } }, //好友拆红包
                { name: 'spendIndex', path: '/drainage/spendIndex', component: spendIndex, meta: { requireAuth: false } }, //花吧宣传页面
                { name: 'lendIndex', path: '/drainage/lendIndex', component: lendIndex, meta: { requireAuth: false } }, //借吧宣传页面
                { name: 'springFestival', path: '/2019SpringFestival', component: springFestival, meta: { requireAuth: false } }, // 2019春节活动
                { name: 'recordList', path: '/2019SpringFestival/list', component: recordList, meta: {requireAuth:false } }, // 2019春节活动列表页
                { name: 'sharePage', path: '/sharePage', component: sharePage, meat: { requireAuth: false } }, // 2019春节活动分享页面
                // 404
                { name: 'fail', path: '/404', component: fail, meta: { requireAuth: false } }, //404页面
                { name: 'game2048', path: '/chain/game2048', component: game2048, meta: { requireAuth: false } }, // 2048游戏  
            ]
        },
        { path: '*', redirect: '/404' } // 重定向路由
    ]
})