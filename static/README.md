关于活动（微信、app公用页面）中与app交换方法 :
wxToapp.js 清单

osType：app所在平台操作系统（可区分IOS、Android）
userId：获取app传来的用户ID
vcode：app的版本号
token：app传来的登录信息（token）

1：getAppData（‘接口地址’，‘需要执行的方法’，‘传给后台的参数’，‘是否展示失败信息（1不展示失败提示）’）
	用途：活动中已登录的接口请求  

2：toWxUrl（‘跳转地址’，‘需要传给下个页面的属性名1’，‘属性值1’，‘属性名2’，‘属性值2’）
	用途：页面间跳转 	

3：toApp（‘向app传的值’，‘要跳转的地址’，‘是否需要登录（1为需要登录）’，‘是否需要无痕跳转’）
	用途：需要同时跳转两端页面

4：toAppLogin（）
	用途：app显示提示登录弹框

5：toWxLogin（）
	用途：wx显示提示登录弹框

6：PassValue（e）
	用途：向app传值

7：getNotlogData（‘接口地址’，‘需要执行的方法’，‘传给后台的参数’，‘是否展示失败信息（1不展示失败提示）’）
	用途：默认传递登录信息，是否登录均可使用。


<h3>与app交换方法及字段</h3>

WIP //理财列表

WIP_uid	//跳转标的详情 uid--标的ID

RNA	//实名认证

VIP	//vip页面

LG	//登录

RE	//注册

RP  // 我的红包

GoodsList_n  // 积分商城的商品列表业 n是商品的类目下标 非必传

PointsMall   // H5页面跳转APP积分商城，以参数形式传值给APP  类似于登录页传‘LG’ 使用这个字段

toNativePointsMall  // 链接跳转APP积分商城  使用这个字段 例：https://www.edspay.com/#/intIndex?toNativePointsMall=1 

SinaPay	//绑定银行卡

RC	//充值

WIM	//出借记录

MI	//我的界面

OpenDeposit //开通存管

NavWhite  //导航栏是白色的

NavRed   //导航栏是红色的

webTitle_'app获取的标题'  //给app传值

operate_功能键名字_跳转的地址 // 导航功能键

playVideo 自动播放视频
playVideo_1 自动播放第一个视频，数字为变量，传几就播放第几个视频
playAudio 自动播放音频
playAudio_1 自动播放第一个音频，数字为变量，传几就播放第几个音频

showAddr     //显示地址图标
hideAddr     //隐藏地址图标
showAddr_    //加标题名
hideAddr_    //加标题名

<h4>唤醒app,打开其他app,app唤醒小程序</h4>
	爱上街对接：
		IOS： H5打开爱上街aishangjie://fanbei.app?type=router
		安卓：H5打开爱上街 myapp://jp.app/openwith

	爱上头条对接：
		IOS： H5打开爱上头条 aldnews://news
		安卓：H5打开爱上头条 aldnews://news

	冒泡对接：
		IOS：  maopp://mapgo.app?Source=Web&Act=n
		安卓： maopp://mapgo.app?Source=Web&Act=n

	E都市钱包对接：
		IOS：  edspay://edspay?Id=XX&link=YY
		安卓： edspay://edspay?Id=XX&link=YY 

		注：XX如果为WebView，YY就是要跳转的链接，XX如果为其他，则跳钱包指定的原生界面。
	
	唤醒app代码：\src\components\wx\activity\newInvite/openApp.vue

	app内唤醒微信小程序： wxApp_小程序ID

	app内部打开其他app:
		Android: 与唤醒方法相同,删除setTimeout
		IOS: Schemes_要唤醒app对应代码_对应AppStore地址
			eg：this.PassValue('Schemes_aldnews://news');

全局方法：
versionfunegt(code, code1)  // 用于版本号比较 code：用户使用的版本号 code1：用作比较的版本号


Service //h5跳app客服

Feedback  // h5跳app意见反馈

passValueResult(share, stat)  // 接受移动端传回的回掉值

shareSuccess(type, id, fun)  // 分享的结果 页面要配合watch监听使用详见：h5ToAppTest.vue

getUserIP // 获取IP

<h3>wxShare.js 介绍</h3>

this.toApp('toWeb|'+title+'|https://'+ window.location.host + appurl +param,{path:wxUrl,query:{[paramName]:param}}) 
//标题、链接、是否登陆、轮播跳转、参数 ------ h5页面放在app一级页面  h5给app传值 app自己跳转

1：getWxShareData（{title:'标题',desc:'内容',link:'链接',imgUrl:'图片链接'}）
	用途：设置分享的内容，在mounted()方法中使用



wx端表单验证verification.js方法使用

isEmpty（‘要验证的参数’，‘提示语’，‘num’）
	num=1:屏幕下方黑色浮框提示
		默认用法：声明变量 tipShow（用于控制提示语显示隐藏）、errorMsg（提示语）

isFormat（‘要验证的参数’，‘提示语’，‘正则规则’，‘num’）
	num:同上
	正则规则：根据需求自行添加（慎重修改）
		路径：libs/uitl.js




<h3>过滤器目录</h3>

moneyFormat：默认数字加逗号及两位小数，
{{200.21 | moneyFormat(1)}} 参数传1：取整加逗号

transFormatDate：将时间戳毫秒数转换
{{78945641324582658 | transFormatDate(num)}}
num=1:2018-01-01
	2:2018年01月01日
	默认:2014-09-04 15:25:58

divisionTime:默认2017—07—05 12:37:28 转换成 2017—07—05
{{‘2017—07—05 12:37:28’ | divisionTime（num）}}
num = 1:2017—07—05 12:37:28 转换成 07—05


phoneNumber:手机号中间四位加密

hideBankNo：处理银行卡
{{‘32157898765456’ | hideBankNo（num）}}
num = 1:前三后四
	  2:前四后四
	  默认:保留后四

lastFour：取字符串后四位

moneyWan:金额以‘万’为单位输出且保留两位小数，不足1万按加逗号规则输出

allApr: 计算平台加息和vip加息总加息

delHost: www.edspay.com/home 转换成 /home



<h3>公共组件目录</h3>

微信提示弹框组件
路径：components/public/wx/wxPublicDialog.vue

微信出借项目组件
路径：components/public/wx/wxInvestItem.vue

PC获取手机验证码弹窗
路径： /template/getCodeDialog.

PC移动视频播放组件
pc:pc/activity/publicModule/videoPage.vue
移动:wx/activity/publicModule/videoPage.vue
需传递控制组件显示隐藏变量（对象形式），视频地址，封面图片地址

移动端年化计算器组件
路径：wx/activity/publicModule/calculator.vue
需传递控制组件显示隐藏变量（对象形式）

微信端渠道模板
老模板路径：wx/activity/wxActivityRegister
新模板路径（图形验证码）：wx/activity/wxChannelsRegister


<h3>关于活动</h3>
pc端活动展示页链接/activityPC/guidance?imgUrl='活动图片'&cnzzId='数据统计id号'
WX微信端活动全屏展示页链接/picTpl?picUrl='活动图片'&title='页面title'





<h3>PC公共样式</h3>
	base.css 
	新增...
	.redTab 红色Tab
	.bang 惊叹号
	.blue-table 浅蓝色表头的表格


pc端提示语  notify  用法： this.notify(内容, 状态)  // 状态  不传为警告 1 成功 2错误 3提示消息
本地判断  判断是否为空 checkEmpty 用发 ： if(this.checkEmpty(要验证的参数, 提示语)) return false
判断格式是否正确 regCheck 用发 ： if(this.regCheck(要验证的参数, 提示语, 正则名 )) return false

微信授权
链接后面加上参数 redirectUrL 如：https://www.edspay.com/#/wxInvest?redirectUrL=/wxInvest
微信授权涉及的参数还有 code  
所以在微信开发中链接上不要跟参数名为 code 和 redirectUrL

服务号授权登录中间页面  https://www.edspay.com/#/authorization?sOpenId=openId&allowLogin=/index  allowLogin 为将要跳转的相对地址 即地址栏#以后的部分  openId 后台会传过来的   这个方法仅仅用于后台代码中 不对外开放的
https://www.edspay.com/#/wxLogin?authorization=1&sOpenId=openId  服务号授权登录authorization为服务号授权登录的识别码必须传1 openId 后台会传过来的  这个方法仅仅用于后台代码中 不对外开放的

活动时间的接口统一用 /activity/two/getActivityTime 这个接口   后台接受 activityId：参数;  参数根据不同的活动传不同的值
<em>注：添加及修改功能后在请及时更新此文件</em>

翻书效果： turn.js 插件 在年度账单中用过
