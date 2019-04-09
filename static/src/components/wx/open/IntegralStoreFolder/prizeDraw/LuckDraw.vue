<template>
    <!-- 积分抽奖转盘 -->
    <div id="drawRecord">
        <div v-title>积分抽奖</div>
        <div class="rule" @click="ruleLayer = true"></div>
        <div class="chance" v-if="(luckdrawList.drawNumber - drawNumber) > 0">您有 <em>{{luckdrawList.drawNumber - drawNumber}}次</em> 抽奖机会</div>
        <div class="chance p-30" v-else>
            <span v-if="hasLogin" class="fl">您目前积分不足</span>
            <span v-else class="fl">你目前尚未登录</span>
            <p @click="appRouter('/intEarn')" class="fr">赚取积分<i class="el-icon-caret-right"></i></p>
        </div>
        <div class="item" :class="{active: lamp}">
            <ul id="content">
                <li class="" v-for="(v, i) in luckdrawList.rewardList" :class="{current1:running}"  ref="list"><img :src="changeUrl(v.type, v.shopPath)" alt=""><p>{{v.rewardName ? v.rewardName : '谢谢参与'}}</p></li>
                <li id="begin" @click.stop="zhuan">
                    <p>抽奖</p>
                    <p>{{luckdrawList.scoreNumber}}积分/次</p>
                </li>
            </ul>
        </div>
        <!-- 我的抽奖记录 -->
        <div class="record" @click="records"></div>
        <!-- 文字轮播 -->
        <div class="swiper" v-if="luckdrawList.lbList">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in luckdrawList.lbList"><p>恭喜{{item.userName}}抽到{{item.rewardName}}</p></swiper-slide>
            </swiper>
        </div>
        <!-- 规则 -->
        <div class="ruleLayer" v-if="ruleLayer">
            <p>1. 用户抽奖每次消耗{{luckdrawList.scoreNumber}}积分，不限次数；</p>
            <p>2. 实物奖励将在15个工作日内进行发放，其他奖励将实时发放。</p>
            <p class="font-18" v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
            <div @click="ruleLayer = false" class="close btn"></div>
        </div>
        <!-- 抽奖成功的弹框 -->
        <div class="resultBg" v-layer v-if="resultLayer || ruleLayer"></div>
        <div class="center resultLayer" v-if="resultLayer">
            <!-- <div class="center"> -->
                <div class="rewardName">{{doLuckdraw.rewardName}}</div>
                <!-- <div class="rewardName">恭喜您抽到定制抱枕被</div> -->
                <div class="picBox">
                    <img :src="changeUrl(doLuckdraw.rewardType, doLuckdraw.shopPath)" alt="">
                    <div id="star1" class="star star1"></div>
                    <div id="star2" class="star star2"></div>
                    <div id="star3" class="star star3"></div>
                    <div id="star4" class="star star4"></div>
                </div>
                <div class="tipsText" @click="drawRecord(doLuckdraw.rewardType)" v-html="tipsText(doLuckdraw.rewardType)"></div>
                <i class="close iconfont" @click="closeBtn">&#xe630;</i>
            </div>
        <!-- </div> -->
    </div>
</template>

<script>
import wxToapp from '../../../../../common/wx/wxToapp';
import { Toast } from 'mint-ui';
export default {
    mixins:[wxToapp],
    data() {
        return {
            loginStatus: 0,
            lamp:false,
            lamp1:false,
            resultLayer: false,
            ruleLayer: false,
            drawNumber: 0,
            luckdrawList: '',
            doLuckdraw:'',   // 中奖结果
            remain: 0,       // 旋转时间
            running: false,  // 按钮开关
            interval: '',   //  定时器
            // timeOut: '',   //  定时器
            draw: 0,        // 后台返回的抽到的奖品下标
            resultText:[],
            swiperOption: {          // 文字轮播
                autoplay: 2000,      // 可选选项，自动滑动
                direction : 'vertical',
                slidesPerView:4,
                autoplayDisableOnInteraction : false,    // 手指滑动以后轮播不会停止
                loop : true,
            }  
        };
    },
    methods: {
        records(){
            if(!this.hasLogin){
                this.toLogin()
            }else{
                this.toWxUrl('/drawRecord','_type',3)
            }
        },
        closeBtn(){
            this.dataInfo();
            this.resultLayer = false;
            this.running = false;
        }, 
        dataInfo(){//获取订单详情
            // if(!this.hasLogin){
            //     this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
            //     return
            // }
            this.getNotlogData('/score/luckdrawList',(data) =>{
                if(data.resCode){
                    this.loginStatus = data.resData.loginStatus;
                    this.luckdrawList = data.resData;
                    if(data.resData.lbList.length == 0){
                        let rewardList = [];
                        this.luckdrawList.rewardList.map((item, index) => {
                            if(item.type != 4){
                                rewardList.push(item)
                            }
                        })    // 过滤掉谢谢参与奖
                        this.luckdrawList.lbList = [
                            {userName: '136****9473',rewardName: rewardList[0].rewardName},
                            {userName: '158****5546',rewardName: rewardList[1].rewardName},
                            {userName: '132****8392',rewardName: rewardList[2].rewardName},
                            {userName: '131****0749',rewardName: rewardList[3].rewardName},
                            {userName: '139****2846',rewardName: rewardList[4].rewardName}
                        ]
                    }
                    setTimeout(() => {
                        this.$refs.list[0].className = "current";
                    }, 5);
                }
            },{})
        },

        zhuan(){  //  点击旋转
            if(this.loginStatus == 0){
                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                return
            }
            if((this.luckdrawList.drawNumber - this.drawNumber) < 1){
                // Toast('您的积分不足！');
                Toast({
                    message: '您的积分不足！',
                    // position: 'middle',
                    duration: 3000
                });
                return
            }
            if(this.running)return;
            this.running = true;
            this.getAppData('/score/doLuckdraw',(data) =>{
                if(data.resCode){
                    this.doLuckdraw = data.resData
                    this.luckdrawList.rewardList.map((item, index) => {
                        if(item.id == data.resData.id){
                           this.draw = index
                        }
                    }) 
                    this.turned();
                    
                    setInterval(() =>{
                        $("#star1").animate({opacity:0.2},600).animate({opacity:1}, 600)
                    },1200);
                    setInterval(() =>{
                        $("#star2").animate({opacity:0.2},500).animate({opacity:1}, 600)
                    },1000);
                    setInterval(() =>{
                        $("#star3").animate({opacity:0.2},550).animate({opacity:1}, 450)
                    },1000);
                    setInterval(() =>{
                        $("#star4").animate({opacity:0.2},500).animate({opacity:1}, 450)
                    },1000);
                }
            },{})
        },
        turned(){   // 开始旋转
            let len= this.luckdrawList.rewardList.length;  // 奖品个数
            let index = 0;
            this.remain = 3000 + Math.random() * 5000;
            let zhuan = () => {
                if( this.remain < 200 && index == this.draw){
                    this.resultLayer = true
                    // this.drawNumber += 1;
                }else{
                    this.$refs.list[index].className = "current1";
                    this.$refs.list[(index+1) % len].className = "current";
                    index = ++index % len;
                    this.remain -= 100;
                    setTimeout(() => {
                        zhuan()
                    }, 80);
                }
            }
            zhuan()
        },
        drawRecord(i){
            if(i == -1){
                this.toWxUrl('/drawRecord','_type',3)
            }
            
        },
        tipsText(v){
            let text = '';
            switch (v) {
                case -1:
                    text = "该奖励为实物商品，请在<span>【抽奖记录】</span>查</br>看并添加收货地址"
                    break;
                case 0:
                    text = '抽奖奖励，请在<span>【抽奖记录】</span>查看或在</br>APP中，<span>【我的红包-红包】</span>查看'
                    break;
                case 1:
                    text = '抽奖奖励，请在<span>【抽奖记录】</span>查看或在</br>APP中，<span>【我的红包-加息券】</span>查看'
                    break;
                case 2:
                    text = '该奖励为平台积分，请在<span>【抽奖记录】</span></br>或<span>积分明细</span>中查看'
                    break;
                case 4:
                    text = '距离抽到奖还差一点点，请再接再厉！'
                    break;
                    
            }
            return text
        },
        changeUrl(t, src){
            let ImgSrc;
            switch (t) {
                case -1:
                    ImgSrc = src
                    break;
                case 0:
                    ImgSrc = 'https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/redBox.png'
                    break;
                case 1:
                    ImgSrc = 'https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/coupons.png'
                    break;
                case 2:
                    ImgSrc = 'https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/goldCoin.png'
                    break;
                case 3:
                    ImgSrc = ''
                    break;
                case 4:
                    ImgSrc = 'https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/noEntering.png'
                    break;
            }
            return ImgSrc
        }
    },
    created: function() {
        this.dataInfo()
        this.PassValue('NavWhite_积分抽奖');
    },
    mounted: function() {
        
    },
    components: {

    }
};
</script>

<style lang="scss" scoped>
#drawRecord{
    font-family: PingFangSC-Regular;
    width: 100%;
    height: 24.693333rem;
    background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/drawRecord.png);
    background-size: 100% 24.693333rem;
    .rule{
        width: 1.76rem;
        height: .76rem;
        position: fixed;
        top: .32rem;
        right: 0;
        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/rule.png);
        background-size: 100%;
        z-index: 9;
    }
    .ruleLayer{
        width: 10rem;
        height: 8.506667rem;
        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/rulePic.png) no-repeat center center;
        background-size: 100%;
        position: fixed;
        top: 0px;
        left: 0px;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 99999;
        padding: 2.9rem 2.3rem .4rem;
        p{
            font-size: .32rem;
            color: #fff;
            margin-bottom: .266667rem;
        }
        .close{
            width: 1.066667rem;
            height: 1.066667rem;
            margin: 2.666667rem auto 0;
        }
        .close.btn{
            position: absolute;
            bottom: 0;
            left: 50%;
            margin: 0;
            margin-left: -.53rem;
        }
    }
    .resultBg{
        background-color: rgba(0, 0, 0, 0.7) !important;
    } 
    .center{
        text-align: center;
        width: 100%;
        height: 10.266667rem;
        position: fixed;
        top: 0;
        bottom: 0;
        margin: auto;
        z-index: 9999;
        .rewardName{
            color: #FF9A58;
            font-size: .64rem;
            line-height: .866667rem;
            margin-bottom: 22px;
        }
        .picBox{
            width: 5.96rem;
            height: 3.453333rem;
            margin: 0 auto 1.333333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/rewardBg.png);
            background-size: 100%;
            display: flex;
            align-items: center;
            flex-direction: row;
            justify-content: center;
            position: relative;
            img{
                width: 3.12rem;
            }
            .star{
                position: absolute;
                background-size:100% 100%!important;
            }
            .star1{
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/Star3.png) no-repeat;
                height: .493333rem;
                width:.4rem;
                top: 1rem;
                right: 1.1rem;
            }
            .star2{
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/Star2.png) no-repeat;
                height:.64rem;
                width:.506667rem;
                left: .8rem;
                top: 2.5rem;
            }
            .star3{
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/Star1.png) no-repeat;
                height:.64rem;
                width:.506667rem;
                left: 1.4rem;
                top: .5rem;
            }
            .star4{
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/Star1.png) no-repeat;
                height: .44rem;
                width: .346667rem;
                left: 4.6rem;
                top: 3rem;
            }
        }
        .tipsText{
            color: #fff;
            font-size: .346667rem;
            line-height: .493333rem;
            margin-bottom: 2.266667rem;
            span{
                color: #FF9A58;
            }
        }
        i{
            font-size: 1.066667rem;
            color: #fff;
        }
    }
    .record{
        width: 100%;
        height: 1.146667rem;
        position: relative;
        left: 0;
        top: 6.4rem;
    }
    .chance{
        position: relative;
        top: 4.78rem;
        left: 0;
        right: 0;
        width: 7.066667rem;
        height: .9rem; 
        line-height: .9rem;
        text-align: center;
        margin: 0 auto;
        font-size: .346667rem;
        color: #fff;
        p{
            color: #FAF447;
            i{
                font-size: .24rem;
                vertical-align: middle;
            }
        }
    }
    .swiper{
        position: relative;
        top: 9.46rem;
        left: 0;
        right: 0;
        width: 6.4rem;
        height: 3.36rem;
        text-align: center;
        // padding: .4rem 0;
        margin: 0 auto;
        .swiper-container{
            // line-height: .84rem;
            height: 3.36rem;
        }
        .swiper-slide{
            p{
                font-size: .32rem;
                // line-height: .84rem;
                height: .84rem;
                color:#fff;
            }
        }
    }
    .item{
        position: relative;
        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/lamp1.gif
) no-repeat center center;
        background-size: 100%;
        width: 8.933333rem;
        height: 8.32rem;
        margin: 0 auto;
        top: 5.55rem;
    }
    .item.active{
        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/lamp2.png) no-repeat center center;
        background-size: 100%;
    }
    #content {
        position: absolute;
        width: 7.7rem;
        height: 7.7rem;
        margin: 0 auto;
        left: .61rem;
        top: .64rem;
       
        li,#begin {
            position: absolute;
            width: 2.55rem;
            height: 2.29rem;
            text-align: center;
            // border: 1px solid #f60;
            border-radius: .213333rem;
        }
        li{
            background: rgba($color: #000, $alpha: 0);
            img{
                width: 40%;
                margin: .266667rem auto .2rem;
            }
            p{
                font-size: .32rem;
                color: #333333;
            }
        }
        li.current1 {
            background: rgba($color: #000, $alpha: 0.5);
        }
        li.current {
            background: rgba($color: #000, $alpha: 0);
        }
        li:nth-child(1){
            left: 0;
            top: 0;
        }
        li:nth-child(2){
            left: 2.6rem;
            top: 0;
        }
        li:nth-child(3){
            left: 5.2rem;
            top: 0;
        }
        li:nth-child(4){
            left: 5.2rem;
            top: 2.375rem;
        }
        li:nth-child(5){
            left: 5.2rem;
            top: 4.773333rem;
        }
        li:nth-child(6){
            left: 2.6rem;
            top: 4.773333rem;
        }
        li:nth-child(7){
            left: 0;
            top: 4.773333rem;
        }
        li:nth-child(8){
            left: 0;
            top: 2.375rem;
        }
        #begin {
            left: 2.6rem;
            top: 2.36rem;
            border-radius: 50%;
            background: rgba($color: #000, $alpha: 0);
            text-align: center;
            padding-top: .5rem;
            p:nth-child(1){
                color: #fff;
                font-size: .64rem;
            }
            p:nth-child(2){
                color: #fff;
                font-size: .266667rem;
                letter-spacing: -0.013333rem;
            }
        }
    }
    .p-30{
        padding: 0 .4rem;
    }
    .font-18{
        font-size: .24rem !important; 
    }
}
</style>
<style>
.tipsText span{
    color: #FF9A58;
}
</style>
