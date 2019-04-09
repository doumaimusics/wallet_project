import jiami from 'js-base64';
module.exports = {
    data() {
        return {
            shareObj: { //分享标题内容配置
                title: "划船还能赚钱？每日最高可兑55元现金！", //标题
                desc: "【E都市钱包】祝您猪年快乐，诸事顺利，去赚钱>>", //内容
                link: global.host + "vip/treasureHunt", //链接
                imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
            },
            showShare:false,
        }
    },
    methods: {
    	toShare(type){
            if(type == 1){
                window._czc.push(['_trackPageview', '出海2-分享有礼页面', '点击分享按钮'])
            }else{
                window._czc.push(['_trackPageview', '出海2-招募船员', '点击分享按钮'])
            }
    	    if(this.osType){
    	        this.PassValue(this.appShare);
    	    }else{
    	        this.showShare = true;
    	    }
    	},
        setShareData(){//设置分享文案
            this.appShare = '1';
            this.shareObj.link = global.host+"vip/treasureHunt" + '?sailSum=' + this.$route.query.sailSum + '&exchangeCoin=' + this.$route.query.exchangeCoin + '&userName=' + Base64.encode(this.$route.query.userName);

        },
    },
    created(){

    },
    mounted() {
        this.setShareData();
        this.getWxShareData(this.shareObj);
    },
    watch: {
        'shareResult' (val){
            if(val){
                this.shareSuccess(val, this.$route.query._activityId, (data) => {
                    if(this.shareResult != 'WX'){
                            this.getAppData('/sail/share',(_data)=>{//分享成功调用接口
                            if(_data.resCode){
                                this.getUserData();
                            }
                        },{})
                    }
                })
            }
        }
    }

}