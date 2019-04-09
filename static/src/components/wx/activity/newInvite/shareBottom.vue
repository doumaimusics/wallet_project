<template>
	<div>
        <p v-if="!showText" :style="{color:color}" class="text">平台总邀请人数{{terraceData.inviteUserSum}}人，累计发放奖励{{terraceData.moneySum}}元</p>
	    <div id="shareBottom">
	    	<div @click="toShare" class="btn btn1"></div>
	    	<div @click="showQcode" class="btn btn2"></div>
	    </div>
        <div @click="close" v-if="showLayer" v-layer class="layer">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/shareLayer.png" alt="">
        </div>
		<div v-if="Qcode" v-layer class="layer1">
            <div @click="close" class="guan"></div> 
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
    import getActivityData from '../publicJS/getActivityData';
    export default{
    	mixins:[wxShare,getActivityData],
    	data(){
    		return{
                qrcodeUrl:'https://aliyunsso.edspay.com/web/activity/newInvite/codeBG.png',
    			shareObj:{
    				title: '我在E都市钱包出借很久了，为你准备了500元奖励（可提现）！', //标题
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
        props:['color','showText','entrance'],
    	methods:{
    		toShare(){    //分享事件
                window._czc.push(﻿["_trackEvent",'发财计划2.0首页','分享按钮']);
                if(this.judgeTimeLogin()){
                    return;
                }
    			if(this.osType){
    				this.isLogPassValue(this.appShare);
    			}else{
    				if(this.getCookie('userToken')){
    					this.showLayer = true;
    				}else{
    					this.toWxLogin();
    				}
    			}
    		},
            getUI () {  //获取用户id(base64转码)
                this.getAppData("/user/friend/userInvite",(data) =>{
                    this.userId = data.resData.ui;
                    this.MobilePhone = data.resData.realName ?  data.resData.realName:data.resData.MobilePhone;
                    this.shareObj.link = global.host+"invite/inviteRegister?userName=" + Base64.encode(this.MobilePhone);
                    console.log(this.shareObj.link)
                    this.userId = data.resData.ui;
                    this.appShare = '1';
                    this.getWxShareData(this.shareObj)
                },{})
            },
            showQcode(){    //显示二维码事件
                window._czc.push(﻿["_trackEvent",'发财计划2.0首页','二维码按钮']);
                if(this.judgeTimeLogin()){
                    return;
                }
                if(this.vcode < '5.0.0' || !this.osType){
                    this.appRouter('/invite/showQcode');
                }else{
                    this.PassValue('2|invite_activity_2_0_id');
                }
                
            },
            getmyInviteSum(){   //获取平台数据
                this.notLogPost('/activity/inviteNew/myInviteSum',(data) =>{
                    this.terraceData = data.resData;
                },{})
            },
    		close(){
    			this.showLayer = false;
                this.Qcode = false;
    		},
    	},
    	created(){
    		this.getmyInviteSum();
            this._getActivityTime('invite_activity_2_0_id');
    	},
    	mounted(){
            if(this.hasLogin){
                this.getUI();
            }
			
        
		}
    }
</script>

<style lang="scss" scoped>
    #shareBottom{
    	// background:url(https://aliyunsso.edspay.com/web/wx/activity/newInvite/botBtn.png) no-repeat;
    	// background-size:100% 100%;
    	height:1.2rem;
    	width:100%;
    	position: fixed;
    	bottom:0;
        .btn{
            width:50%;
            float: left;
            height:1.2rem;
        }
        .btn1{
            background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/toShare.png') no-repeat;
            background-size: 100% 100%;
        }
        .btn2{
            background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/showQcodeThr.gif') no-repeat;
            background-size: 100% 100%;
        }
    }
    .text{
        text-align:center;
        font-size:0.32rem;
        line-height:0.453333rem;
    }
    .layer{
        img{
            display:block;
            height:5.4rem;
            width:5.426667rem;
            margin-left:3.0rem;
        }
    }
    .layer1{
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