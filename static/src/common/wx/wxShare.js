import wxToapp from './wxToapp';
import wx from 'weixin-js-sdk'; //引入微信sdk
import { Toast } from 'mint-ui'

module.exports = {
    mixins: [wxToapp],
    data() {
        return {
            shareData: {},
            shareObj: {},
            appShare: '1', //app分享文本
            shareResult: '',  // 用户分享成功渠道区别分享到朋友圈还是好友等
            appResult: ''   // app回掉的值
        }
    },
    methods: {
        initialize(shareObj) {
            var that = this;
            wx.config({
                debug: false,
                appId: 'wx0910539ee8f2dec1', // 必填，公众号的唯一标识
                timestamp: that.shareData.timestamp, // 必填，生成签名的时间戳
                nonceStr: that.shareData.nonceStr, // 必填，生成签名的随机串
                signature: that.shareData.signature, // 必填，签名
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ'] // 必填，需要使用的JS接口列表
            });
            wx.ready(function() {
                wx.onMenuShareTimeline({   // 分享到朋友圈
                    title: shareObj.title,
                    link: shareObj.link,
                    imgUrl: shareObj.imgUrl,
                    success: function () {
                        that.shareResult = 'Moments'
                    },
                    cancel: function () {
                        that.tips('取消分享到朋友圈')
                    },
                });
                wx.onMenuShareQQ({  // 分享到QQ
                    title: shareObj.title,
                    link: shareObj.link,
                    imgUrl: shareObj.imgUrl,
                    desc: shareObj.desc,
                    success: function () {
                        that.shareResult = 'QQ';
                    },
                    cancel: function () {
                        that.tips('取消分享QQ')
                    },
                });
                wx.onMenuShareAppMessage({ // 分享给朋友
                    title: shareObj.title,
                    link: shareObj.link,
                    imgUrl: shareObj.imgUrl,
                    desc: shareObj.desc,
                    success: function () {
                        that.shareResult = 'WX';
                    },
                    cancel: function () {
                        that.tips('取消分享给微信朋友')
                    },
                });

            });
        },
        getWxShareData(shareObj) {
            this.notLogPost('/wx/share', (data) => {
                if (data.resCode) {
                    this.shareData = data.resData.wx;
                    if (shareObj) {
                        this.shareObj = shareObj;
                    } else {
                        this.shareObj = {
                            title: this.shareData.title, //标题
                            desc: this.shareData.desc, //内容
                            link: this.shareData.link, //链接
                            imgUrl: this.shareData.imgUrl, //图片链接
                        };
                    }
                    
                    for (var item in this.shareObj) {
                        if (item == 'link') {
                            if (this.shareObj[item].indexOf('?') >= 0) {
                                this.shareObj[item] += ('&ui=' + (this.userId ? this.userId : this.getCookie('userId')));
                            } else {
                                this.shareObj[item] += ('?ui=' + (this.userId ? this.userId : this.getCookie('userId')));
                            }
                        }
                        this.appShare += ('|' + this.shareObj[item]);
                    }
                    this.initialize(this.shareObj);
                    console.log(this.appShare)
                }
            }, {}, 1)
        },
        shareSuccess(type, id, fun){    // 分享的结果 页面要配合watch监听使用详见：h5ToAppTest.vue type:分享的渠道  id: 活动ID  fun :回掉
            this.getAppData('/activity/addAcShare', (data) => {
                if(data.resCode){
                    fun(data)
                }
            }, {channel:type, activityId:id})
        },
        passValueResult(share, stat) {   // 接受移动端传回的回掉值
            this.appResult = stat 
            this.shareResult = share    // 分享专用
        },
        tips(text){    // 公用弹框
            Toast({
                message: text,
                duration: 2000
            });
        },
        closeWebPage(){
            wx.closeWindow();
        }
    },
    created(){
        window.passValueResult = this.passValueResult;   // 暴漏给APP调用的方法
    },
    mounted() {
        //this.getWxShareData();
    }

}