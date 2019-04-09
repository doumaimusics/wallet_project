<template>
    <div id="newAward">
        <div v-title>我的奖励</div>
        <div class="userData">
            <div class="sumMoney">
                <div class="money">{{userData.moneyTotal}}</div>
                <div class="text">累计奖励(元)</div>
            </div>
            <div class="nums clear">
                <div class="data fl">
                    <div class="num">{{userData.count}}</div>
                    <div class="text">成功邀请(人)</div>
                </div>
                <div class="fl shu bdr-l"></div>
                <div class="data fl">
                    <div class="num">{{userData.newAward}}</div>
                    <div class="text">返现奖励含待发(元)</div>
                </div>
            </div>
            <div class="tips text">注：返现奖励请在“我的-我的红包”中兑换；</div>
            <div v-if="userData.startTime" class="tips text">12月1日之前邀请奖励，请点击 <div @click="toMyAward" class="span">历史奖励</div> 查看</div>
        </div>
        <div  v-if="userList.length > 0" class="userList">
            <div class="title bdr-b">
                <div class="fl name">好友</div>
                <div class="fl time">注册时间</div>
                <div class="fl investMoney">30内累计<br/>出借金额(元)</div>
                <div class="fl getMoney">返现奖励(元)</div>
            </div>
            <ul>
                <li v-for="item in userList" class="bdr-b">
                    <div class="fl name">{{item.mobilePhone}}</div>
                    <div class="fl time">{{item.inviteTime}}</div>
                    <div class="fl investMoney">{{item.lendMoneySum}}</div>
                    <div class="fl getMoney">
                        <span v-if="item.remind == 2">{{item.cashMoney}}</span>
                        <div @click="toTips(item)" v-if="item.remind == 0" class="btn">提醒出借</div>
                        <div v-if="item.remind == 1" class="btn gray">已提醒</div>
                    </div>
                </li>
                
            </ul>
        </div>
        <div v-else class="null">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/null.png" alt="">
            <div class="tips">12月1日后暂无记录</div>
            <div @click="toShare" class="btn">立即邀请</div>
        </div>
        <div @click="showLayer = false" v-if="showLayer" v-layer class="layer">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/shareLayer.png" alt="">
        </div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    import { Toast } from 'mint-ui';
    import jiami from 'js-base64';
    import getActivityData from '../publicJS/getActivityData';
    export default{
        mixins:[wxShare,getActivityData],
    	data(){
    		return{
                userData:{},
                userList:[],
                showLayer:false,
                shareObj:{
                    title: '我在E都市钱包出借很久了，为你准备了500元奖励（可提现）！', //标题
                    desc: "网贷50强平台，超27万用户的选择，新人专享10%参考回报。",//内容
                    link: global.host+"invite/inviteRegister", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                },
    		}
    	},
    	methods:{
            toMyAward(){
                window._czc.push(﻿["_trackEvent",'发财2.0奖励','历史记录']);
                this.appRouter('/invite/myAward');
            },
            getUserData(){
                this.getAppData('/activity/inviteNew/getInviteDetails',(data)=>{
                    if(data.resCode){
                        this.userData = data.resData;
                        this.userList = data.resData.list;
                        console.log(data)
                    }
                },{type:'detail'})
            },
            toTips(item){
                window._czc.push(﻿["_trackEvent",'发财2.0奖励','提醒出借']);
                this.getAppData('/activity/inviteNew/sendInviteMsg',(data)=>{
                    if(data.resCode){
                        Toast('已发送短信给您的好友');
                        item.remind = 1
                    }
                },{userId: item.userId});
            },
            toShare(){    //分享事件
                window._czc.push(﻿["_trackEvent",'发财2.0奖励','分享按钮']);
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
                    this.userId = data.resData.ui;
                    this.appShare = '1';
                    this.getWxShareData(this.shareObj)
                },{})
            },
    	},
    	created(){
    		this.getUserData();
            this.getUI();
            this._getActivityTime('invite_activity_2_0_id');
    	},
        mounted(){
            this.PassValue('NavWhite_我的奖励');
            // 数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275517608&web_id=1275517608'
            script.language = 'JavaScript'
            document.body.appendChild(script);
        }
    }
</script>

<style>
    body,html{
        height:  100%;
        background:  #fff!important;
    }
</style>

<style lang="scss" scoped>
    #newAward{
        font-family: PingFangSC-Regular;
        .layer{
            img{
                display:block;
                height:5.4rem;
                width:5.426667rem;
                margin-left:3.0rem;
            }
        }
        .userData{
            height: 4.88rem;
            color: #fff;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/newAwardBG.png') no-repeat;
            background-size: 100% 100%;
            text-align: center;
            .text{
                font-size: 0.293333rem;
                line-height: 0.4rem;
            }
            .sumMoney{
                padding-top: 0.32rem;
                padding-bottom: 0.213333rem;
                .money{
                    font-size: 0.64rem;
                    line-height:0.773333rem;
                    font-family: DIN-Medium;
                }
            }
            .nums{
                padding-bottom: 0.533333rem;
                .data{
                    width: 4.973333rem;
                    .num{
                        font-family: DIN-Medium;
                        font-size: 0.64rem;
                        line-height:0.773333rem;
                    }

                }
                .shu{
                    height:0.666667rem;
                    width:1px;
                    position: relative;
                    margin-top: 0.2rem;
                }
            }
            .tips{
                text-align: left;
                padding-left: 2.026667rem;
                padding-bottom: 0.133333rem;
                .span{
                    display:inline-block;
                    font-size:0.32rem;
                    color:#FDF090;
                    border-bottom: 1px solid #FDF090;
                }
            }
        }
        .userList{
            background:#fff;
            .name{
                width: 2.373333rem;
            }
            .time{
                width: 2.213333rem;
                text-align:center;
            }
            .investMoney{
                width: 2.773333rem;
                text-align: center;
            }
            .getMoney{
                width:2.106667rem;
                text-align: right;
                .btn{
                    height:0.666667rem;
                    width:1.6rem;
                    background: #FF5B4C;
                    color:#fff;
                    border-radius: 0.053333rem;
                    margin:0.333333rem auto 0;
                    font-size:0.32rem;
                    line-height:0.666rem;
                    text-align:center;
                }
                .gray{
                    background: #D0D0D0;
                }
            }
            .title{
                height:1.44rem;
                padding: 0 0.266667rem;
                font-size:0.346667rem;
                line-height:1.44rem;
                color:#333;
                position: relative;
                .investMoney{
                    line-height:0.493333rem;
                    padding-top: 0.24rem;
                }
            }
            ul{
                padding: 0 0.266667rem;
                li{
                    height:1.36rem;
                    font-size: 0.346667rem;
                    line-height:1.333333rem;
                    position: relative;
                    .getMoney{
                        text-align:center;
                    }

                }
            }
        }
        .null{
            text-align: center;
            font-size: 0.346667rem;
            line-height: 0.493333rem;
            color: #808080;
            img{
                display:block;
                width: 5.2rem;
                height: 3.626667rem;
                margin: 1.6rem auto 0.266667rem;
            }
            .btn{
                height:0.8rem;
                width: 3.466667rem;
                margin: 0.533333rem auto 0;
                background: #FF5B4C;
                border-radius: 0.533333rem;
                line-height: 0.8rem;
                color: #fff;
            }
        }
    }
</style>