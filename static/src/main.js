// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

//  PC端组件引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import $ from 'jquery'
import VueClipboard from 'vue-clipboard2' // 复制到剪切板组件
import myUpload from 'vue-image-crop-upload/upload-2.vue' // 头像上传剪切
import './common/router/comon'
import Http from './common/http'

// 移动端组件引入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
import wx from 'weixin-js-sdk'; //引入微信sdk


import wxRouter from './router/wxRouter' // 引入微信路由
import pcRouter from './router/pcRouter' // 引入pc端路由
import method from './libs/method' // PC端的全局方法

// 公用组件
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Global from 'components/public/Global.vue' // 引入请求头部
import directive from './libs/wxDirective'

// import MetaInfo from 'vue-meta-info'
// Vue.use(MetaInfo)
Vue.use(method)


import Fingerprint2 from 'fingerprintjs2' // 获取设备指纹


new Fingerprint2().get(function(result, components) {
    Vue.prototype.fingerprints = result // 设备指纹
})

// vue滑块
import 'swiper/dist/css/swiper.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(MintUI) // 使用MintUI
Vue.use(VueClipboard)
Vue.use(myUpload)


require('pageswitch')

require('./libs/util');
require('./libs/wxDirective');
require('./libs/wxPinyin');
require('./common/pubFilter/pubFilter'); // 引入公共过滤器

Vue.http.options.emulateJSON = true // 适配post请求
global.alertBox = "";
global.alertTable = "";
global.authCode = true;

//设置图片域名
Vue.prototype.imgDomainName = 'https://static.edspay.com';

// 设置cookie
function setCookie(c_name, value, expiredays) { // cookie名称,cookie值,保存时间
    var exdate = new Date();
    exdate.setTime(exdate.getTime() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
Vue.prototype.setCookie = setCookie;

// 获取cookie、
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}
Vue.prototype.getCookie = getCookie;

function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

// 删除cookie
Vue.prototype.delCookie = delCookie;

function versionfunegt(val,val1){   
    val = parseFloat(val.replace('.','').replace('.',''));
    val1 = parseFloat(val1.replace('.','').replace('.',''));
    console.log(val, val1)
    if(val < val1){
        return true 
    }else{
        return false
    }
};

//获取当前时间，格式YYYY-MM-DD coupled:连接符（可选）
Vue.prototype.getNowFormatDate = (coupled) => {
    coupled = coupled || '-';
    var date = new Date();
    var Y = date.getFullYear();
    var M = date.getMonth() + 1;
    var D = date.getDate();
    if (M >= 1 && M <= 9) {
        M = "0" + M;
    };
    if (D >= 0 && D <= 9) {
        D = "0" + D;
    };
    var currentdate = Y + coupled + M + coupled + D;
    return currentdate;
};

//截取地址栏参数值
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

Vue.prototype.versionfunegt = versionfunegt;  //  版本号比较val为用户使用的版本号 val1是做比较的版本号

Vue.prototype.getQueryString = getQueryString; // 截取url参数
Vue.prototype.ajaxUrl = Global; // 挂载url头部
Vue.prototype.tzjAjaxUrl = Global; // 挂载url头部(投之家专用  其他接口勿用)
Vue.prototype.host = Global; // 全局域名挂载

global.ajaxUrl = Global.getUrl(1);
global.tzjAjaxUrl = Global.getUrl(3);
global.host = Global.getUrl(4);


Vue.prototype._footerData = [];
// 微信端封装post请求
import { Indicator } from 'mint-ui';
Vue.prototype.postData = (dataUrl, sucFunction, transmitObj, isExecute, isInd) => { // 接口地址，成功执行函数，传递对象, 1执行失败方法
    let thisUrl = location.hash.substring(1,location.hash.length)
    if (!getCookie('userToken')) {
        MessageBox.alert('登录信息失效,请重新登录').then(action => {
            wxRouter.push({path: '/wxLogin', query: { thisUrl: thisUrl}});
        });
        return;
    }
    setCookie('userToken', getCookie('userToken'), 1000 * 60 * 10) //获取token传给后端
    if (!transmitObj.oauthToken) transmitObj.token = getCookie('userToken'); //默认传token
    
    if(!transmitObj.mobileType) transmitObj.mobileType = 3; //默认传wx端标识
    if (isInd != 1) {
        Indicator.open({ spinnerType: 'fading-circle' });
    }
    Vue.http.post((Global.getUrl(1) + dataUrl), transmitObj, { emulateJSON: true })
        .then((res) => {
            Indicator.close();
            var data = res.body;
            if (res.body.resCode == -1) { // 后端返回-1则去登陆
                delCookie('userToken');
                delCookie('zsOpenStatus');
                delCookie('userId');
                delCookie('nickname');
                wxRouter.push({path: '/wxLogin', query: { thisUrl: thisUrl}});
                return;
            }
            sucFunction(res, data);
            if (isExecute) {
                if (res.body.resCode != 1) {
                    Toast(res.body.resMsg);
                }
            }
        }, (response) => {
            Indicator.close();
        });
}

Vue.prototype.notLogPost = (dataUrl, sucFunction, transmitObj, isExecute) => { // 接口地址，成功执行函数，传递对象, 1执行失败方法
    if (getCookie('userToken')) {
        setCookie('userToken', getCookie('userToken'), 1000 * 60 * 10)
        setCookie('userId', getCookie('userId'), 1000 * 60 * 10)
        setCookie('nickname', getCookie('nickname'), 1000 * 60 * 10)
    }

    if (!transmitObj.oauthToken) transmitObj.token = getCookie('userToken'); //默认传token
    if(!transmitObj.mobileType) transmitObj.mobileType = 3; //默认传wx端标识
    Indicator.open({ spinnerType: 'fading-circle' });
    Vue.http.post((Global.getUrl(1) + dataUrl), transmitObj, { emulateJSON: true })
        .then((res) => {
            Indicator.close();
            var data = res.body;
            sucFunction(data);
            if (isExecute) {
                if (!res.body.resCode) {
                    Toast({
                        message: res.body.resMsg,
                        position: 'bottom',
                        duration: 2000,
                        className: 'toastTip'
                    });
                }
            }
        }, (response) => {
            Indicator.close();
        });
}

//活动需要登录情况下 请求方法
Vue.prototype.appPostData = (dataUrl, sucFunction, transmitObj, appData, appToLogin, thisUrl, isTip, history) => {
    function postLogin() {
        if (appData.osType) {
            if (!appData.userId) {
                appToLogin();
                return false;
            } else {
                return true;
            }
        } else {
            // if (!getCookie('userToken')) {
            //     MessageBox.confirm('您尚未登录,请登录！').then(action => {
            //         wxRouter.push({ path: '/wxLogin', query: { thisUrl: thisUrl } });
            //     }, action => {});
            //     return false;
            // } else {
            //     return true;
            // }
            if (!getCookie('userToken')) {
                history ? wxRouter.replace({ path: '/wxLogin', query: { thisUrl: thisUrl } }) : wxRouter.push({ path: '/wxLogin', query: { thisUrl: thisUrl } });
                return false;  
            }else{
                return true;
            }
        }
    }
    if (!postLogin()) { //判断是否有登录信息 没有则不发送请求
        return;
    }
    if (appData.osType) {
        transmitObj.oauthToken = appData.oauthToken;
    } else {
        transmitObj.token = getCookie('userToken') //默认传token
    }
    transmitObj.mobileType = 3; //默认传wx端标识
    Indicator.open({ spinnerType: 'fading-circle' });
    Vue.http.post((Global.getUrl(1) + dataUrl), transmitObj, { emulateJSON: true })
        .then((res) => {
            Indicator.close();
            var data = res.body;
            if (isTip == 1) {

            } else {
                if (res.body.resCode < 1) {
                    Toast({
                        message: res.body.resMsg,
                        duration: 1500,
                        className: 'toastTip'
                    });
                }
            }
            if (res.body.resCode == -1) { // 后端返回-1则去登陆
                appData.userId = null;
                delCookie('userToken');
                delCookie('zsOpenStatus');
                delCookie('userId');
                delCookie('nickname');
                postLogin();
                //wxRouter.push({path:'/wxLogin',query:{thisUrl:thisUrl}});
                return;
            }
            sucFunction(data);
        }, (response) => {
            Indicator.close();
        });
}

// 判断用户终端是PC还是移动端，移动端则跳到微信H5首页   
const ua = navigator.userAgent.toLowerCase();

var type;
if (/iphone|ipad|ipod/.test(ua) || /android/.test(ua)) {
    var router = wxRouter;
    type = 3;
    isLogin('/wxLogin', wxRouter);
    new Vue({
        router
    }).$mount('#start')
} else {
    const router = pcRouter;
    type = 4;
    PCSEO(router)
    new Vue({
        router
    }).$mount('#start')
}

// 余额转移开关请求(后台控制的)
Vue.http.post((Global.getUrl(1) + "/global/configSw"), {mobileType: type},{ emulateJSON: true }).then((data) => {
    if (data.body.resCode == 1) {
        let flag = true;
        data.body.resData.transferSw == '0' ? flag = false : flag = true
        sessionStorage.setItem("balance", flag);
        sessionStorage.setItem("showAutoTender", data.body.resData.showAutoTender);
        setCookie('showAutoTender', data.body.resData.showAutoTender);
        setCookie('generalSw',data.body.resData.generalSw);  // wx
        sessionStorage.setItem("generalSw",data.body.resData.generalSw);   // pc
    }
});

(function() {     // 同盾风控策略接口，全局共用的。 组件中直接this.fingerprint即可
    window._fmOpt = {
        partner: "alading",
        appName: "alading_web",
        token: "alading" + "-" + new Date().getTime() + "-"+ Math.random().toString(16).substr(2),
        fmb: true,
        getinfo: function(){
            return "e3Y6ICIyLjUuMCIsIG9zOiAid2ViIiwgczogMTk5LCBlOiAianMgbm90IGRvd25sb2FkIn0=";
        }                           
    };
    var cimg = new Image(1,1);
    cimg.onload = function() {
        window._fmOpt.imgLoaded = true;
    };
    cimg.src = "https://fp.fraudmetrix.cn/fp/clear.png?partnerCode=alading&appName=alading_web&tokenId=" + window._fmOpt.token;
    var fm = document.createElement('script'); fm.type = 'text/javascript'; fm.async = true;
    fm.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'static.fraudmetrix.cn/v2/fm.js?ver=0.1&t=' + (new Date().getTime()/3600000).toFixed(0);
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(fm, s);
    setTimeout(() => {
        window._fmOpt.getinfo();
        Vue.prototype.fingerprint = window._fmOpt.getinfo() // 设备指纹
    },4000)
})();

function isLogin(loginUrl, router) {
    router.beforeEach((to, from, next) => {
        if(to.name === 'filings'){
            document.body.scrollTop = parseInt(sessionStorage.getItem("scrollTop"));
            document.documentElement.scrollTop = parseInt(sessionStorage.getItem("scrollTop"));
            // window.pageYOffset = parseInt(sessionStorage.getItem("scrollTop"));
        }else if(to.name != 'filings'){  
            setTimeout(() => {
                document.body.scrollTop = 1;
                document.documentElement.scrollTop = 1;
                // window.pageYOffset = 1; 
            }, 50);
        };
        //w微信授权
        if((window.location.href.toString()).indexOf("osType") < 0){

            if(authCode && (window.location.href.toString()).indexOf("redirectUrL") >= 0){
               authCode = false;
               if((window.location.href.toString()).indexOf("code") < 0){
                
                   var redriUrl = (to.fullPath.toString()).split("?")[0];
                   setCookie('returnUrl',redriUrl)
                   window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx0910539ee8f2dec1&redirect_uri='+ encodeURIComponent(window.location.href) +'&response_type=code&scope=snsapi_base&state=123#wechat_redirect'
               }else{
                   //获得链接上的code值
                   var parm = (window.location.href.toString()).split("?")[1].split("&")[0];
                   var wxCode = (parm.toString()).split("=")[1];
                   //传给后台code
                   Vue.http.post(Global.getUrl(2)+'/app/user/getOpenId',{code:wxCode})
                   .then((res) => {
                     if(res.body.resCode == 1){
                       //保存openId
                       sessionStorage.setItem("openId", res.body.resMsg)

                       //自动授权登陆
                       Vue.http.post(Global.getUrl(2)+'/user/autoLogin',{openId:res.body.resMsg})
                       .then((res) => {
                         if(res.body.resCode == 1){
                           setCookie('userToken',res.body.resData.token,(1000 * 60 * 10))
                           setCookie('zsOpenStatus',res.body.resData.zsOpenStatus)
                           setCookie('userId',res.body.resData.user.userId)
                           setCookie('userName',(res.body.resData.user.userName).substring(0,3)+"****"+(res.body.resData.user.userName).substring(7,11));   
                           setCookie('nickname',res.body.resData.user.userName,(1000 * 60 * 10))//在线客服用户昵称
                           sessionStorage.setItem("awardTime", res.body.resData.awardTime);
                           // 设置cookie得手机号和用户名
                           localStorage.setItem('userPhone',res.body.resData.user.userName)
                           if(to.name === 'wxAuthorizeBind'){
                            next({
                              path: '/register/wxBindResult?awardTime='+ res.body.resData.awardTime
                            })
                           }else{
                            next({
                                path:getCookie('returnUrl')
                            });
                           }
                           
                           delCookie('returnUrl')
                        }else{
                          if(to.name === 'wxAuthorizeBind'){
                            next({
                              path: '/register/wxAuthorizeBind'
                            })
                          }else{
                            next({
                                path: '/wxLogin',
                                query: { thisUrl: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                            })
                          }
                         }
                      }, (response) => {   
                         // 响应错误回调
                      });
                    }else{
                       next()
                    }
                  }, (response) => {   
                     // 响应错误回调
                  });
               }
           }else{
                if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
                    if (getCookie('userToken')) { // 通过vuex state获取当前的token是否存在
                        setCookie('userToken', getCookie('userToken'), 1000 * 60 * 15);
                        next();
                    } else {
                        next({
                            path: loginUrl,
                            query: { thisUrl: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                        })
                    }
                } else {
                    if (getCookie('userToken')) setCookie('userToken', getCookie('userToken'), 1000 * 60 * 15);
                    next();
                }
           }
        }else{
            if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
                if (getCookie('userToken')) { // 通过vuex state获取当前的token是否存在
                    setCookie('userToken', getCookie('userToken'), 1000 * 60 * 15);
                    next();
                } else {
                    next({
                        path: loginUrl,
                        query: { thisUrl: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    })
                }
            } else {
                if (getCookie('userToken')) setCookie('userToken', getCookie('userToken'), 1000 * 60 * 15);
                next();
            }
        }
    })
}

// 获取ip
Vue.prototype.getUserIP= (onNewIP) => {
    var myPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
    var pc = new myPeerConnection({
     iceServers: []
   }),
   noop = function() {},
   localIPs = {},
   ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
   key;
   function iterateIP(ip) {
     if (!localIPs[ip]) onNewIP(ip);
     localIPs[ip] = true;
  }
   pc.createDataChannel("");
   pc.createOffer().then(function(sdp) {
     sdp.sdp.split('\n').forEach(function(line) {
       if (line.indexOf('candidate') < 0) return;
       line.match(ipRegex).forEach(iterateIP);
     });
     pc.setLocalDescription(sdp, noop, noop);
   }).catch(function(reason) {});
   pc.onicecandidate = function(ice) {
     if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return;
     ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
   };
}

// pc端seo
function PCSEO (rout) {
    rout.beforeEach((to, from, next) => {
        let metaList = document.getElementsByTagName("meta");
        for (let i = 0; i < metaList.length; i++) {
            if (metaList[i].getAttribute("name") == "keywords") {
                metaList[i].content = 'E都市钱包、投资理财、个人理财、P2P理财、互联网金融';
                document.title = 'E都市钱包官网 [浙商银行存管] 好资产 更分散'
            }
          }
        next();
    });
}

// 引入http
global.http = new Http()

// 账户全局变量
global.failText = ''
global.sucText = ''
