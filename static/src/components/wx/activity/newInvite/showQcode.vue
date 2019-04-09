<template>
    <div ref="codeBox" class="codeBox">
        <div ref="qCode" id="qCode">
            <div class="img">
                <img id="imgSrc" :src="imgURL" alt="">
                <img class="logo" src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/logo.png" alt="">
            </div>
        </div>
        
    </div>
</template>

<script>
	import wxShare from '../../../../common/wx/wxShare';
	import jiami from 'js-base64';
    export default{
    	mixins:[wxShare],
    	data(){
    		return{
	            qrcodeUrl:'https://aliyunsso.edspay.com/web/activity/newInvite/codeBG.png',
				shareObj:{
					title: '我在E都市钱包出借很久了，为你准备了500元奖励（可提现）！ ', //标题
	                desc: "网贷50强平台，超27万用户的选择，新人专享10%参考回报。",//内容
					link: global.host+"invite/inviteRegister", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
				},
				showLayer:false,
	            Qcode:false,
	            imgURL:'',
	            userId:'',
	            terraceData:{},
	            MobilePhone:''
    		}
    	},
    	methods:{
    		getUI () {  //获取用户id(base64转码)
                this.getAppData("/user/friend/userInvite",(data) =>{
                    this.userId = data.resData.ui;
                    this.MobilePhone = data.resData.realName ?  data.resData.realName:data.resData.MobilePhone;
                    this.shareObj.link = global.host+"invite/inviteRegister?userName=" + Base64.encode(this.MobilePhone);
                    console.log(this.shareObj.link)
                    this.getImgUrl();
                    this.appShare = '1';
                    this.getWxShareData(this.shareObj)
                },{})
            },
            getImgUrl(){    //生成二维码图片
                var that = this;
                var QRCode = require('qrcode');
                QRCode.toDataURL(global.host+"invite/inviteRegister?ui="+this.userId + "&userName=" +Base64.encode(this.MobilePhone), {errorCorrectionLevel: 'H'}, function (err, url) {
                    that.imgURL = url;
                })
            }
    	},
    	created(){
    		this.getUI();
    	},
        mounted(){
            var height = document.documentElement.clientHeight; //获取设备的宽度
            this.$refs.qCode.style.height = height + 'px';
            this.$refs.codeBox.style.height = height + 'px';
        }
    }
</script>

<style lang="scss" scoped>
    .codeBox{
        background:url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/erweimBoxBG.png') no-repeat;
        background-size:100%;
    }
    #qCode{
        background:url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/erweimbg.png') no-repeat;
        background-size:100%;
        position: relative;
        .guan{
            height:3.0rem;
            width:3.0rem;
            position: absolute;
            right:0;
            top:0;
        }
        .img{
            position: absolute;
            height:4.4rem;
            width:4.4rem;
            top:9.5rem;
            left:2.8rem;
            #imgSrc{
                height:100%;
                width:100%;
            }
            .logo{
                height:1.0rem;
                width:1.0rem;
                position: absolute;
                top:1.6rem;
                left:1.6rem;
                border-radius: 0.3rem;
            }
        }
    }
</style>