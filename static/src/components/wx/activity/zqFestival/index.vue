<template>
    <div id="zqFestival">
        <div v-title>中秋献礼</div>
        <div @click="openRult" class="rult"></div>
        <div class="top">
            <div @click="playVideo" class="video"></div>
        </div>
        <div class="pageContent">
            <div class="fei"></div>
            <div v-if="!showGIF" class="material">
                <div class="mate mate1"></div>
                <div class="mate mate2"></div>
                <div class="mate mate3"></div>
            </div>
            <div @click="showCalculator.showCalculator = true" class="calculatorBtn"></div><!-- 显示计算器按钮 -->
            <div v-if="showGIF" class="makeGIF"></div>
            <div @click="makeCake" class="make">
                <div v-if="userData.canMoonSize" class="num">+{{userData.canMoonSize ? userData.canMoonSize:0}}</div>
            </div>
            <ul class="btnList">
                <li @click="toShare" class="btn"></li>
                <li @click="toShare" class="btn"></li>
                <li @click="toInvest" class="btn"></li>
            </ul>
            <div class="investMoney">可兑换年化{{userData.yearMoneyChange ? userData.yearMoneyChange:0}}</div>
            
        </div>
        <div class="userData">
            <div class="data clear">
                <div class="cake fl">{{userData.moonSize ? userData.moonSize:0}}个</div>
                <div class="money fl">{{userData.redSum ? userData.redSum:0}}元</div>
            </div>
            <div @click="toDetail" class="toDetail"></div>
        </div>
        <ul class="goodList">
            <li @click="conversion(item)" v-for="(item,index) in (moonCoupons.length == 0 ? 10:moonCoupons)" class="fl">
                <div v-if="index == 1 && userData.hotStatus == 1" class="btn"></div>
            </li>
        </ul>
        <!-- 制作月饼蒙层 -->
        <div v-if="showMake" v-layer class="makeTip">
            <div class="content">
                <div class="contentBox">
                    <div class="num">
                    <div id="allNum" class="allNum"></div>
                    <div v-if="showEndNum" class="endNum">+{{endCanMoon}}</div>
                </div>
                <div @click="showMake = false;showEndNum = false" class="close"></div>
                <div @click="showMake = false;showEndNum = false" class="ok"></div>
                </div>
            </div>
        </div>
        <div class="pageBottomBtns">
            <div @click="toShare" class="btn toShare fl"></div>
            <div class="btn toRegister fl">
                <a href="https://h5.51fanbei.com/h5/activity/201809/midAutumnReg.html"></a>
            </div>
        </div>
        <!-- 视频蒙层 -->
        <video-page :showVideo="showVideo" :videoUrl="'https://aliyunsso.edspay.com/images/video/1000001773958779AAzqFestivalAA.mp4'" :videoCover="'https://aliyunsso.edspay.com/web/wx/activity/zqFestival/zqVideoCover.png'"></video-page>
        <!-- 兑换商品弹框弹框提示 -->
        <div v-if="showExchange" v-layer class="tipBox">
            <div class="content">
                <div @click="showExchange = false" class="close"></div>
                <div v-if="showExContent == 1" class="topBox">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/notarizeCon.png" alt="" class="conImg">
                    <p class="tipText" v-html="exText"></p>
                </div>
                <div v-else class="topBox">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/successCon.png" alt="" class="allImg">
                </div>
                <div v-if="showExBottom == 1" class="bottomText">可在“我的--我的红包”中查看</div>
                <div v-if="showExBottom == 2" class="bottomText">可在“爱上街APP-我的--优惠券”中查看</div>
                <div v-if="showExBottom == 3" @click="getConverData(activeItem)" class="bottomBtn"></div>
            </div>
        </div>
        <!-- 月饼或制作机会不足弹框提示 -->
        <div v-if="showToInvest" v-layer class="toInvestTips tipBox">
            <div class="content">
                <div @click="showToInvest = false" class="close"></div>
                <div class="topBox">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/insufficientCon.png" alt="" class="conImg">
                    <p class="tipText" v-html="toInvestText"></p>
                </div>
                <div class="bottomBtns">
                    <div @click="showToInvest = false" class="btn btn1 fl"></div>
                    <div @click="toInvest" class="btn btn2 fl"></div>
                </div>

            </div>
        </div>
        <!-- 规则弹框 -->
        <div v-if="showRult" @click.self="closeRult" v-layer class="rultBox">
            <div class="content">
                <div @click="closeRult" class="close"></div>
                <div class="textBox">
                    <div class="text">
                        <div class="imgBox">
                            <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/rultContent.png" alt="">
                            <a class="rulephone" href="tel:400-135-3388"></a>
                            <p>{{osType == 'IOS' ?'本活动与苹果公司无关':''}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- wx显示分享蒙层 -->
        <div v-if="showShare" v-layer @click="showShare = false" class="showShare">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/zqFestival/fenxiangyindao.png" alt="" class="arrows">
        </div>
        <!--年化计算器-->
        <calculator :showCalculator="showCalculator"></calculator>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';     // APP交互函数
    import getActivityData from '../publicJS/getActivityData'; // 获取活动时间
    import videoPage from '../publicModule/videoPage'; // 播放视频组件
    import calculator from '../publicModule/calculator'; // 计算器
    export default {
        mixins:[wxShare,getActivityData],
        data() {
            return {
                sumCake:0,//月饼总数
                moonCoupons:[],//商品数组
                userData:{},//用户信息
                showCalculator:{
                    showCalculator:false
                },//显示计算器
                activeItem:{},//当前点击的商品
                shareObj: { //分享标题内容配置
                    title: "好基友 E起携手过中秋", //标题
                    desc: "奔走相告，快来定制你的专属月饼，更有100万件商品等你0元购！", //内容
                    link: global.host + "zqFestival/zqFestivalInvite", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                },
                showVideo:{
                    showVideo:false,//播放视频
                },
                showShare:false,//显示分享引导
                showToInvest: false,//显示去出借
                toInvestText:'',//去出借文案

                showGIF:false,//显示动图
                showMake:false,//显示制作月饼弹框

                showRult: false,//显示规则
                showEndNum: false,//显示最后数字
                endCanMoon:0,

                showExchange: false,//显示兑换弹框
                showExBottom:3, //显示弹框底部内容 1红包 2优惠券 3确定兑换按钮
                showExContent:1, //显示弹框中间内容 1兑换前 2兑换后
                exText:'爆款商品仅限兑换一次，您是否确认消耗<span>10</span>个月饼，兑换<span>500元优惠券</span>？',//提示弹框显示文案

            }
        },
        components:{
            videoPage,
            calculator
        },
        methods: {
            playVideo(){
                this.showVideo.showVideo = true;
                _czc.push(﻿["_trackEvent", "中秋节活动", "移动端视频"]); //  友盟统计配置
            },
            openRult(){
                this.showRult = true;
                $('body').css('overflow','hidden');//浮层出现时窗口不能滚动设置
            },
            closeRult(){
                this.showRult = false;
                $('body').css('overflow','auto');// 浮层关闭时滚动设置
            },
            /*跳转到详情页*/
            toDetail(){
                if(this.judgeTimeLogin(3)){
                    return;
                }
                this.appRouter('/zqFestival/festivalDetail');
            },
            toInvest(){
                this.toApp('WIP','/wxInvest')
            },
            /*制作月饼接口*/
            makeCake(){
                if(this.judgeTimeLogin()){
                    return;
                }
                if(this.userData.canMoonSize == 0){//显示去出借弹框
                    this.showToInvest = true;
                    this.toInvestText = '当前您的制作次数为0，<br/>您可通过出借获取次数，进行月饼制作';
                }else{
                    this.getAppData('/activity/moon/make',(data)=>{
                        if(data.resCode){
                            let actMoonSize = (data.resData.moonSize - 1) <= 20 ? (data.resData.moonSize - 1):20;
                            this.endCanMoon = data.resData.moonSize;

                            this.userData.moonSize += data.resData.moonSize;
                            this.userData.canMoonSize -= data.resData.moonSize;

                            this.showGIF = true;
                            setTimeout(()=>{
                                this.showGIF = false;
                                this.showMake = true;
                                setTimeout(()=>{
                                    $('#allNum').animate({top:-0.933333*(actMoonSize)+'rem' }, 130*(actMoonSize),()=>{
                                        if(data.resData.moonSize > 20){
                                            this.showEndNum = true;
                                        }
                                    });
                                },120)
                            },2700);
                            
                        }
                    },{})
                }
            },
            /*兑换商品*/
            conversion(item){
                if(this.judgeTimeLogin()){
                    return;
                }
                if(this.userData.hotStatus == 1 && item.isHot){
                    return;
                }
                if(item.moonSize > this.userData.moonSize){//显示去投资
                    this.showToInvest = true;
                    if(this.userData.moonSize == 0){
                        this.toInvestText = '当前您的可兑月饼为0，您可通过出借获取次数，进行月饼制作';
                    }else{
                        this.toInvestText = '当前您的可兑月饼数不足，您可通过出借获取次数，进行月饼制作';
                    }
                }else{
                    this.activeItem = item;

                    this.showExchange = true;
                    this.showExContent = 1;
                    this.showExBottom = 3;
                    if(item.isHot){//爆款
                        this.exText = '爆款商品仅限兑换一次，您是否确认消耗<span>10</span>个月饼，兑换<span>500元优惠券</span>？'
                    }
                    else{//普通
                        this.exText = '您是否确认消耗<span>'+item.moonSize+'</span>个月饼，兑换<span>'+item.name+'</span>？'
                    }
                    
                }
            },
            /*调用接口兑换*/
            getConverData(item){
                this.getAppData('/activity/moon/change',(data)=>{
                    if(data.resCode){
                        this.userData.moonSize -= item.moonSize;
                        this.userData.redSum += item.redAmount;
                        //显示成功弹框
                        this.showExchange = true;
                        this.showExContent = 2;
                        if(item.isHot){
                            this.userData.hotStatus = 1;
                        }
                        if(item.type == 1){//红包
                            this.showExBottom = 1;
                        }else{
                            this.showExBottom = 2;
                        }
                    }
                },{id:item.id})
            },
            /*初始化数据*/
            getFestivalData(){
                this.getAppData('/activity/moon/init',(data)=>{
                    if(data.resCode){
                        this.userData = data.resData.moonUser;
                        this.moonCoupons = data.resData.moonCoupons;
                        console.log(this.moonCoupons);
                    }
                },{})
            },
            toShare(){
                if(this.judgeTimeLogin()){
                    return;
                }
                if(this.osType){
                    this.PassValue(this.appShare);
                }else{
                    this.showShare = true;
                }

            }
        },
        created() {
            if(this.userId || this.getCookie('userToken')){
            console.log(this.userId + this.getCookie('userToken'))

                this.getFestivalData();
            }

            this._getActivityTime('ac_moon_festival');
        },
        mounted(){
            this.PassValue('NavWhite_中秋献礼');
            this.getWxShareData(this.shareObj);
            setTimeout(()=>{
                this.ActivityPrompt();
            },180);

            // 友盟数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274750098&web_id=1274750098'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        watch: {
            'shareResult' (val){
                if(val){
                    this.shareSuccess(val, this._activityId, (data) => {
                        if(this.shareResult == 'Moments'){//判断分享到朋友圈
                            if(this.userData.moments == 0){
                                this.getAppData('/activity/moon/share',(_data)=>{//分享成功调用接口
                                    if(_data.resCode){
                                        this.userData.canMoonSize ++;
                                        this.userData.moments = 1;
                                    }
                                },{})
                            }
                        }
                    })
                }
            }
        }
    }
</script>

<style>
    html,boay{
        height: 100%;
    }
</style>

<style lang="scss" scoped>
    #zqFestival{
        background: url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/festivalBG.png') no-repeat;
        background-size:100% 100%;
        height:58.4rem;
        position: relative;
        .rult{
            position: absolute;
            top:0;
            right:0.8rem;
            height:1.066667rem;
            width:1.066667rem;
            background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/rule.png') no-repeat;
            background-size: 100% 100%;
        }
        .rultBox{
            padding-top: 0.666667rem;
            .content{
                height:12.346667rem;
                width:8.666667rem;
                margin: 0 auto;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/rultBox.png') no-repeat;
                background-size: 100% 100%;
                padding-top: 2.48rem;
                position: relative;
                .close{
                    height:1.066667rem;
                    width:1.066667rem;
                    position: absolute;
                    top:0;
                    right:0;
                }
                .textBox{
                    height:9.2rem;
                    width:7.333333rem;
                    overflow: hidden;
                    margin: 0 auto;
                    .text{
                        width:100%;
                        height:100%;
                        overflow-y: auto;
                        .imgBox{
                            position: relative;
                        }
                        img{
                            height:16.133333rem;
                            width:100%;
                            display:block;
                        }
                        p{
                            padding-top: 0.266667rem;
                            text-align:center;
                            font-size:0.36rem;
                            line-height:0.4rem;
                            color:#391374;
                            height:0.66rem;
                        }
                        .rulephone{
                            height:0.666667rem;
                            width:4.0rem;
                            left:1.866667rem;
                            bottom:0.48rem;
                            position: absolute;
                        }
                    }
                }
            }
        }
        .pageBottomBtns{
            position: fixed;
            bottom:0;
            left:0;
            width:100%;
            height: 2.693333rem;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/bottomBtn.png') bottom no-repeat;
            background-size: 100% 2.693333rem;
            padding-top: 0.69rem;
            .btn{
                height:2.693333rem;
            }
            .toShare{
                width:4.0rem;
                height:2rem;
            }
            .toRegister{
                width:5.973333rem;
                height:2rem;
                a{
                    height:100%;
                    width:100%;
                    display:inline-block;
                }
            }
        }
        .makeTip{
            padding-top: 3.466667rem;
            .content{
                height:7.6rem;
                width:6.933333rem;
                margin: 0 auto;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/xuanzhuan.png') center 0.32rem no-repeat;
                background-size: 5.786667rem 5.786667rem;
                position: relative;
                .contentBox{
                    padding-top: 6.63rem;
                    height:7.6rem;
                    width:6.933333rem;
                    position: relative;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/yuebing.png') no-repeat;
                    background-size: 100% 100%;
                }
                .num{
                    height:1.04rem;
                    width:1.493333rem;
                    position: absolute;
                    top:1.333333rem;
                    right:0;
                    overflow: hidden;
                    .allNum{
                        height:18.666667rem;
                        width:1.493333rem;
                        position: absolute;
                        top:0;
                        left:0;
                        background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/num.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    .endNum{
                        width: 100%;
                        height: 100%;
                        font-size:0.586667rem;
                        line-height:0.906667rem;
                        top:0;
                        left:0;
                        color:#FEE712;
                        text-align:center;
                    }
                }
                .close{
                    height:1rem;
                    width:1.066667rem;
                    position:absolute;
                    top:0;
                    right:0.586667rem;
                }
                .ok{
                    height:0.933333rem;
                    width:2.933333rem;
                    margin:0 auto;

                }
            }
        }
        .showShare{
            img{
                height:4.266667rem;
                width:100%;
            }
        }
        .tipBox{
            padding-top: 3.466667rem;
            .content{
                height:7.253333rem;
                width:7.866667rem;
                margin: 0 auto;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/tipContent.png') no-repeat;
                background-size: 100% 100%;
                padding: 1.36rem 0.32rem 0;
                position: relative;
                .close{
                    position: absolute;
                    height:0.8rem;
                    width:1rem;
                    top:0;
                    right:0;
                }
                .topBox{
                    height:4.333333rem;
                    width:7.2rem;
                    .conImg{
                        height:2.933333rem;
                        width:2.933333rem;
                        display:block;
                        margin: 0.186667rem auto 0;
                    }
                    .allImg{
                        display:block;
                        margin: 0 auto;
                        height:4.333333rem;
                        width:6.266667rem;
                    }
                    .tipText{
                        padding: 0 0.08rem;
                        font-size:0.346667rem;
                        line-height:0.506667rem;
                        text-align:justify;
                        color:#666;
                        span{
                            color: #002424;
                        }
                    }
                }
                .bottomText{
                    color:#fff;
                    text-align:center;
                    font-size:0.346667rem;
                    padding-top: 0.346667rem;
                    line-height:0.506667rem;
                }
                .bottomBtn{
                    height:0.933333rem;
                    width:2.933333rem;
                    margin: 0.133333rem auto;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/exchange.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
        .toInvestTips{
            .topBox .tipText{
                padding: 0 0.6rem!important;
            }
            .bottomBtns{
                padding-top: 0.08rem;
                .btn{
                    height:0.933333rem;
                    background-size: 100% 100%!important;
                }
                .btn1{
                    width: 2.4rem;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/cancel.png') no-repeat;
                    margin: 0 0.586667rem 0 0.693333rem;
                }
                .btn2{
                    width: 2.933333rem;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/toInvestBtn.png') no-repeat;
                }
            }
        }
        .top{
            height:16.226667rem;
            padding-top: 10.706667rem;
            .video{
                height:3.76rem;
                width:6.666667rem;
                margin: 0 auto;
            }
        }
        .pageContent{
            height:14.613333rem;
            padding-top:6.04rem;
            position: relative;
            @-moz-keyframes slide {
                0% {
                  top: -0.9rem;
                }
                50% {
                  top: -0.46rem;
                }
                100% {
                  top: -0.9rem;
                }
            }
            @-ms-keyframes slide {
                0% {
                  top: -0.9rem;
                }
                50% {
                  top: -0.46rem;
                }
                100% {
                  top: -0.9rem;
                }
            }
            @-webkit-keyframes slide {
                0% {
                  top: -0.9rem;
                }
                50% {
                  top: -0.46rem;
                }
                100% {
                  top: -0.9rem;
                }
            }
            @keyframes slide {
                0% {
                  top: -0.9rem;
                }
                50% {
                  top: -0.46rem;
                }
                100% {
                  top: -0.9rem;
                }
            }
            @-moz-keyframes mateS_B {
               0% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                50% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                100% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
            }
            @-ms-keyframes mateS_B {
                0% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                50% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                100% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
            }
            @-webkit-keyframes mateS_B {
                0% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                50% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                100% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
            }
            @keyframes mateS_B {
                0% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                50% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                100% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
            }
            @-moz-keyframes mateB_S {
                0% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                50% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                100% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
            }
            @-ms-keyframes mateB_S {
                0% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                50% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                100% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
            }
            @-webkit-keyframes mateB_S {
                0% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                50% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                100% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
            }
            @keyframes mateB_S {
                0% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
                50% {
                    opacity:0.5;
                    transform: scale(0.8,0.8);
                    -ms-transform: scale(0.8,0.8);
                    -o-transform: scale(0.8,0.8);
                    -webkit-transform: scale(0.8,0.8);
                    -moz-transform: scale(0.8,0.8);
                }
                100% {
                    opacity:1;
                    transform: scale(1,1);
                    -ms-transform: scale(1,1);
                    -o-transform: scale(1,1);
                    -webkit-transform: scale(1,1);
                    -moz-transform: scale(1,1);
                }
            }
            .fei{
                height:2.0rem;
                width:1.52rem;
                background:url("https://aliyunsso.edspay.com/web/wx/activity/zqFestival/fei.png") no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top:0;
                left:0;
                -webkit-animation: slide 1.8s infinite;
                -moz-animation: slide 1.8s infinite;
                -ms-animation: slide 1.8s infinite;
                animation: slide 1.8s infinite;
            }
            .material{
                height:4.266667rem;
                width:100%;
                position: absolute;
                top:1.733333rem;
                left:0;
                .mate{
                    background-size: 100% 100%!important;
                    position: absolute;
                }
                .mate1{
                    height:0.986667rem;
                    width:1.653333rem;
                    background: url("https://aliyunsso.edspay.com/web/wx/activity/zqFestival/dousha.png") no-repeat;
                    top:1.546667rem;
                    left:2.933333rem;
                    -webkit-animation: mateS_B 3s infinite;
                    -moz-animation: mateS_B 3s infinite;
                    -ms-animation: mateS_B 3s infinite;
                    animation: mateS_B 3s infinite;
                }
                .mate2{
                    height:0.986667rem;
                    width:1.92rem;
                    background: url("https://aliyunsso.edspay.com/web/wx/activity/zqFestival/mian.png") no-repeat;
                    top:1.86rem;
                    left:5.386667rem;
                    -webkit-animation: mateS_B 3.4s infinite;
                    -moz-animation: mateS_B 3.4s infinite;
                    -ms-animation: mateS_B 3.4s infinite;
                    animation: mateS_B 3.4s infinite;
                }
                .mate3{
                    height:0.773333rem;
                    width:0.773333rem;
                    background: url("https://aliyunsso.edspay.com/web/wx/activity/zqFestival/danhuang.png") no-repeat;
                    top:3rem;
                    left:4.6rem;
                    -webkit-animation: mateB_S 3s infinite;
                    -moz-animation: mateB_S 3s infinite;
                    -ms-animation: mateB_S 3s infinite;
                    animation: mateB_S 3s infinite;
                }
            }
            .makeGIF{
                position: absolute;
                top:1.733333rem;
                left:0;
                width:100%;
                height:4.266667rem;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/makeCake.gif') no-repeat;
                background-size: 100% 100%;
            }
            .calculatorBtn{
                position: absolute;
                height:1.2rem;
                width:1.466667rem;
                top: 6.893333rem;
                right:0.96rem;
            }
            .make{
                height:1.466667rem;
                width:3.733333rem;
                margin: 0 auto;
                padding-top: 0.746667rem;
                .num{
                    text-align:center;
                    color: #FF4E00;
                    font-size: 0.346667rem;

                }
            }
            .btnList{
                padding-top: 1.146667rem;
                li{
                    height:0.933333rem;
                    width:2rem;
                    margin: 0 0 0.693333rem 7.2rem;
                }
            }
            .investMoney{
                font-size:0.293333rem;
                line-height:0.4rem;
                color:#1D00FF;
                text-align:right;
                padding-right: 0.92rem;
                margin-top: -0.266667rem;
            }
        }
        .userData{
            height:7.626667rem;
            padding-top: 1.013333rem;
            color: #fff;
            font-size:0.4rem;
            line-height:0.48rem;
            .fl{
                font-family: DIN-Medium;
                width:50%;
                text-align:center;
                padding-bottom: 0.533333rem;
            }
            .toDetail{
                height:0.9rem;
                width:2.133333rem;
                margin-left:7.733333rem;
            }
        }
        .goodList{
            padding: 1.08rem 0 0 0.4rem;
            li{
                height:2.933333rem;
                width:2.8rem;
                margin: 0 0.4rem 1.08rem 0;
                padding-top:2.08rem;
                .btn{
                    height:0.746667rem;
                    width:1.973333rem;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/zqFestival/hasExchange.png') no-repeat;
                    background-size: 100% 100%;
                    margin: 0 auto;
                }
            }
            li:first-child,li:nth-child(9){
                margin: 0 0.906667rem 0 1.386667rem;
            }
        }
        
    }
</style>