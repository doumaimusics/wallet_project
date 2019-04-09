
import wxShare from '../../../../common/wx/wxShare';
module.exports = {
	mixins:[wxShare],
	data(){
		return {
			shareObj:{
				title: '小E给你准备了丰厚见面礼  "友"钱大家一起赚', //标题
				desc: "送你1118元红包+1.8%加息券，完成首次出借还有10元现金哦！",//内容
				link: global.host+"invite/inviteRegister", //链接
				imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
			}
		}
	},
	methods:{
		toShare(show){
			_czc.push(﻿["_trackEvent",'邀请升级-我的奖励','分享按钮',]);
			if(this.osType){
				this.isLogPassValue(this.appShare);
			}else{
				this.showLayer = true;
			}
		},
		getUI () {  //获取用户id(base64转码)
            this.getAppData("/user/friend/userInvite",(data) =>{
                this.userId = data.resData.ui;
                this.MobilePhone = data.resData.MobilePhone;
                this.shareObj.link = global.host+"invite/inviteRegister?userName=" + this.MobilePhone;
                this.appShare = '1';
				this.getWxShareData(this.shareObj);
            },{})
        },
	},
	created(){
		
	},
	mounted(){
		this.getUI();
	}
		
}