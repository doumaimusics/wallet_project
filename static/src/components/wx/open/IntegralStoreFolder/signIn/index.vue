<template>
    <div id="signIn">
        <div v-title>签到日历</div>
        <!-- <div @click="showRule = true" class="rule" v-if="!osType || versionfunegt(vcode,'3.6.3')"></div> -->
        <div class="topBox">
            <div @click="toSignIn(1)" v-if="!signData.ifSignIn" class="btn"></div>
            <div v-else class="btn hasBtn">
            </div>
            <div @click="showRule = true" class="rule">规则</div>
            <div class="week">{{weekName[signData.week]}}</div>
            <div class="toDay">今天{{nowTime | divisionTime}}</div>
            <sign-in v-if="signIn" :lineWidth="8.186667" :signData="signData" :loginStatus="hasLogin" :supplement="supplement" :signData1="signData1"></sign-in>
            <div class="line1"></div>
            <div class="careNo">可用补签卡:
                <em  v-if="signData.cardAmount != 0"><i>共</i>{{signData.cardAmount ? signData.cardAmount : 0}}<i>张</i></em>
                <em class="NocardAmount" v-else>暂无补签卡，请兑换</em>
            </div>
            <div class="signBtn fr" @click="toGoodList">去兑换</div>
        </div>
        <div class="award">
            <div class="title clear"><i class="bdr-b"></i><span class="fl">翻牌奖励</span><i class="bdr-b"></i></div>
            <div class="cards clear">
                <div @click="threeCard" :class="{cardHui1:signData.wednesdayIfPrizeDraw}" class="card card1"></div>
                <div @click="fiveCard" :class="{cardHui2:signData.sundayIfPrizeDraw}" class="card card2"></div>
            </div>
            <div @click="record" class="log">翻牌记录<img class="ic_1" src="https://aliyunsso.edspay.com/web/wx/integralStroe/blueNext.png" alt=""></div>
            <div class="text">（翻牌福利机会当周有效，过期作废！）</div>
        </div>
        <!-- 翻牌提示框 -->
        <dia-logs v-if="showThis.isShow" :showThis="showThis" :text="popNum" :btn="1" :btnText="['取消','立即翻牌']" :confirm="popConfirm"></dia-logs>
        <!-- 兑换补签卡弹框 -->
        <dia-logs v-if="showThis1.isShow" :showThis="showThis1" text="请兑换补签卡后，在进行补签" :btn="1" :btnText="['取消','去兑换']" :confirm="toGoodList"></dia-logs>
        <!-- 兑换补签卡弹框 -->
        <dia-logs v-if="showThis2.isShow" :showThis="showThis2" text="您是否确定使用补签卡" :btn="1" :btnText="['取消','确定']" :confirm="toSignIn"></dia-logs>
        <!-- 签到成功提示框 -->
        <div v-if="showSuccess" v-layer class="successLayer">
            <div class="content">{{popNum}}
                <div class="messagePrizeDraw">{{drawText}}</div>
                <div class="closeBtn iconfont" @click="showSuccess = false">&#xe630;</div>
            </div>
        </div>
        <!-- 规则弹框 -->
        <div v-if="showRule" v-layer class="layerRule">
            <div class="content">
                <div class="title">签到规则</div>
                <div class="bottom" :class="{H: osType == 'IOS'}">
                    <div class="text">
                        <p>1、周一至周五签到每次可获得10积分；</p>
                        <p>2、周六和周日签到每次可获得20积分；</p>
                        <p>3、周一至周三连续签到三天可参与周三福利翻牌；</p>
                        <p>4、周一至周日连续签到七天可参与周日福利翻牌；</p>
                        <p>5、翻牌所获得的实物福利将在15个工作日内寄出，其他福利将实时发放；</p>
                        <p>6、积分商城可以兑换补签卡（30积分/张），补签卡仅限当周补签；</p>
                        <p>7、翻牌福利机会当周有效，过期作废！</p>
                        <p v-if="osType == 'IOS'">8、本活动与苹果公司无关。</p>
                    </div>
                    <div @click="showRule = false" class="btn">我知道了</div>
                </div>
            </div>
        </div>
        <!-- 奖品弹框 -->
        <div v-if="showAward" v-layer class="reversalAward">
            <div class="title">恭喜您抽到</div>
            <div class="goodName hidden">{{awardData.rewardName}}</div>

            <div :style="{background:'url('+awardImg+') no-repeat'}" class="content">
                <div v-if="awardData.type == -1" :style="{background:'url('+awardData.shopPath+')'}" class="imgs"></div>
                <div v-else-if="awardData.type == 2" class="jifenimgs imgs">
                    <div class="conten"><em>{{awardData.amount}}</em>积分</div>
                </div>
                <div v-else :style="{background:'url(https://aliyunsso.edspay.com/web/wx/integralStroe/bigmoney.png) 0.266667rem 0.266667rem no-repeat'}" class="imgs xuni">
                    <div class="num"><span v-if="awardData.type == 0">￥</span>{{awardData.amount}}<span v-if="awardData.type != 0">{{awardList[awardData.type].unit}}</span></div>
                    <div class="type">{{awardList[awardData.type].type}}</div>
                </div>
                <div id="star1" class="star star1"></div>
                <div id="star2" class="star star2"></div>
                <div id="star3" class="star star3"></div>
            </div>
            <p v-html="activeTipText" class="text"></p>
            <p v-if="awardData.type == -1" class="tips">（为保障奖励及时送到您手中，请填写有效收货信息）</p>
            <div @click="showAward = false" class="close"></div>
        </div>
        <div v-if="showThree.show || showFive.show" class="bag" v-layer></div>
        <div v-if="showThree.show" id="sumCards" class="threeLayer">
            <div @click="toReversal('#card1',3,0)" ref="card1" id="card1" class="card">
                <img v-if="threeImg[0]" :src="awardImgIns[0]" id="imgs1" alt="">
            </div>
            <div @click="toReversal('#card2',3,1)" ref="card2" id="card2" class="card">
                <img v-if="threeImg[1]" :src="awardImgIns[1]" id="imgs2" alt="">
            </div>
            <div @click="toReversal('#card3',3,2)" ref="card3" id="card3" class="card">
                <img v-if="threeImg[2]" :src="awardImgIns[2]" id="imgs3" alt="">
            </div>
        </div>
        <div v-if="showFive.show" id="sumCards" class="fiveLayer">
            <div @click="toReversal('#five1',7,0)" ref="five1" id="five1" class="card">
                <img v-if="fiveImg[0]" :src="awardImgIns[0]" id="imgs1" alt="">
            </div>
            <div @click="toReversal('#five2',7,1)" ref="five2" id="five2" class="card">
                <img v-if="fiveImg[1]" :src="awardImgIns[1]" id="imgs2" alt="">
            </div>
            <div @click="toReversal('#five3',7,2)" ref="five3" id="five3" class="card">
                <img v-if="fiveImg[2]" :src="awardImgIns[2]" id="imgs3" alt="">
            </div>
            <div @click="toReversal('#five4',7,3)" ref="five4" id="five4" class="card">
                <img v-if="fiveImg[3]" :src="awardImgIns[3]" id="imgs4" alt="">
            </div>
            <div @click="toReversal('#five5',7,4)" ref="five5" id="five5" class="card">
                <img v-if="fiveImg[4]" :src="awardImgIns[4]" id="imgs5" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp';
    import signIn from '../../../../public/wx/signIn';
    import diaLogs from '../../../../public/wx/wxPublicDialog';
    export default {
        mixins:[wxToapp],
    	data() {
    		return {
                signIn:false,
                signData1:[1,1,1,1,1,1,1,],
                drawText: '',
                threeCardIds: ['#card1','#card2','#card3'],
                fiveCardId: ['#five1','#five2','#five3','#five4','#five5','#five6','#five7'],
                threeTrue: true,
                fiveTrue: true,
                nowTime:0,
                signData:{
                    week:1,
                    signLog:[],
                    sundayIfPrizeDraw:1,
                    wednesdayIfPrizeDraw:1,
                },
                popNum:'',
                weekName:['星期一','星期二','星期三','星期四','星期五','星期六','星期日'],
                awardData:{
                    type:1
                },
                threeImg:[0,0,0],
                fiveImg:[0,0,0,0,0],
                showThis:{
                    isShow:false
                },
                showThis1:{     // 补签卡兑换
                    isShow:false
                },
                showThis2:{     // 确认补签
                    isShow:false
                },
                supplementIndex: 0,  //补签下标
                awardList:[{unit:'￥',type:'红包'},{unit:'%',type:'加息券'},{unit:'积分',type:'积分券'}],
                awardImgIn:'',//奖品图片
                awardImgIns: [],//奖品图片
                showSuccess:false,//展示签到成功
                showAward:false,//展示翻牌奖品
                showRule:false,//显示规则
                tipText:[
                    '翻牌奖励，请在<span>【翻牌记录】</span>查看或在APP中，<span>【我的红包-红包】</span>查看',
                    '翻牌奖励，请在<span>【翻牌记录】</span>查看或在APP中，<span>【我的红包-加息券】</span>查看',
                    '该奖励为平台积分，请在<span>【翻牌记录】</span>或积分明细中查看。',
                    '该奖励为实物商品，请在<span>【翻牌记录】</span>查看。'
                ],
                activeTipText:'',
                awardImg:'https://aliyunsso.edspay.com/web/wx/integralStroe/fanpai1.png',
                canClick:false,
                showThree:{
                    show:false,
                    card1:{
                        top:'4.586667rem',
                        left:'3.68rem'
                    },
                    card2:{
                        top:'8.32rem',
                        left:'2.24rem'
                    },
                    card3:{
                        top:'8.32rem',
                        left:'5.146667rem'
                    }
                },
                showFive:{
                    show:false,
                    card1:{
                        top:'4.586667rem',
                        left:'2.24rem'
                    },
                    card2:{
                        top:'4.586667rem',
                        left:'5.146667rem'
                    },
                    card3:{
                        top:'8.32rem',
                        left:'0.773333rem'
                    },
                    card4:{
                        top:'8.32rem',
                        left:'3.68rem'
                    },
                    card5:{
                        top:'8.32rem',
                        left:'6.586667rem'
                    }
                }
    		}
    	},
        methods:{
            record(){
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                this.toWxUrl('/drawRecord', '_type', 2)
            },
            toGoodList(){
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                let query = this.$route.query
                if(this.signData.goodsId == ''){
                    this.appRouter('/intGoodList', query)
                }else{
                    query.goodsId = this.signData.goodsId
                    this.appRouter('/intGoodDetail', query)
                }
            },
            threeCard(){//三张牌动画
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                if(this.signData.wednesdayIfPrizeDraw){
                    this.showThree.show = true;
                    this.toCentre('#card1',this.showThree.card1);
                    this.toCentre('#card2',this.showThree.card2);
                    this.toCentre('#card3',this.showThree.card3);
                }
            },
            fiveCard(){//五张牌动画
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                if(this.signData.sundayIfPrizeDraw){
                    this.showFive.show = true;
                    this.toCentre('#five1',this.showFive.card1);
                    this.toCentre('#five2',this.showFive.card2);
                    this.toCentre('#five3',this.showFive.card3);
                    this.toCentre('#five4',this.showFive.card4);
                    this.toCentre('#five5',this.showFive.card5);
                }
            },
            popConfirm(){
                this.showThis.isShow = false;
            },
            supplement(n){  // 补签验证
                if(this.signData.cardAmount == 0){
                    this.showThis1.isShow = true
                    return
                }else{
                    this.showThis2.isShow = true
                    this.supplementIndex = n
                    return
                }
            },
            toSignIn(n){ //签到方法 
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                let week;
                let type = 0
                if(n == 1){    // 1 签到
                   week = this.signData.week
                    type = 0
                }else{     //  补签
                    this.showThis2.isShow = false
                    week = this.supplementIndex
                    type = 1
                }
                this.getAppData('/score/userSignIn',(data) => {
                    if(data.resCode){
                        this.supplementIndex = 0
                        if(this.osType){
                            this.PassValue('signIn');
                        }
                        this.signData.sundayIfPrizeDraw = data.resData.sundayIfPrizeDraw;
                        this.signData.wednesdayIfPrizeDraw = data.resData.wednesdayIfPrizeDraw;
                        this.signData.ifSignIn = true;
                        this.drawText = data.resData.messagePrizeDraw;
                        this.popNum = data.resData.message;
                        this.showSuccess = true;
                        setTimeout(() =>{
                            this.showSuccess = false;
                        },8000)
                        this.getUserData();
                    }
                },{signInNumber:week,type: type})
            },
            toCentre(id,value){ //点击出现牌，固定位置
                var timer = null;
                var that = this;
                timer = setTimeout(function(){
                    console.log(id,value)
                    $(id).animate({top:'6.6rem',left:'3.68rem',height:'3.466667rem',width:'2.64rem'},500).animate(value,800,() =>{
                        that.canClick = true;
                    });
                    clearTimeout(timer)
                },100)

            },
            getAwardData(id,index,ind){
                var that = this;
                this.getAppData('/score/userDrawLottery',(data) => {//翻牌请求
                    if(data.resCode){
                        this.PassValue('signIn');
                        this.awardData = data.resData;

                        if(this.awardData.type == 0){
                            this.awardImgIn = 'https://aliyunsso.edspay.com/web/wx/integralStroe/smallmoney.png'
                            this.activeTipText = this.tipText[0]
                        }else if(this.awardData.type == 1){
                            this.awardImgIn = 'https://aliyunsso.edspay.com/web/wx/integralStroe/smalljiaxi.png'
                            this.activeTipText = this.tipText[1]
                        }else if(this.awardData.type == 2){
                            this.awardImgIn = 'https://aliyunsso.edspay.com/web/wx/integralStroe/smalljifen.png'
                            this.activeTipText = this.tipText[2]
                        }else if(this.awardData.type == -1){
                            this.awardImgIn = this.awardData.shopPath;
                            this.activeTipText = this.tipText[3]
                        }else{
                            this.awardImgIn = this.awardData.shopPath;
                            this.activeTipText = this.tipText[3]
                        }
                        console.log(this.awardData.balanceList)
                        this.awardData.balanceList.map((v, i) => {
                            if(v.type == 0){
                                this.awardImgIns[i] = 'https://aliyunsso.edspay.com/web/wx/integralStroe/smallmoney.png'
                            }else if(v.type == 1){
                                this.awardImgIns[i] = 'https://aliyunsso.edspay.com/web/wx/integralStroe/smalljiaxi.png'
                            }else if(v.type == 2){
                                this.awardImgIns[i] = 'https://aliyunsso.edspay.com/web/wx/integralStroe/smalljifen.png'
                            }else if(v.type == -1){
                                this.awardImgIns[i] = v.shopPath;
                            }else{
                                this.awardImgIns[i] = v.shopPath;
                            }
                        })
                        this.awardImgIns.splice(ind, 0, this.awardImgIn)
                        console.dir(this.awardImgIns)
                        let ids = [];
                        index == 3 ? ids = this.threeCardIds : ids = this.fiveCardId
                        ids.map( (item, j) => {
                            j == ind ? $(item).removeClass("active") : $(item).addClass("active");
                            $(item).animate({//卡片翻转
                                du:"180" //目的就是取一个属性值180
                            },{
                                step:(now,fx) =>{
                                    if(now >= 90){
                                        index == 3 ? this.$set(this.threeImg,j,1) : this.$set(this.fiveImg,j,1);
                                    }
                                    $(item).css({"transform":"rotateY("+now+"deg)"});
                                    $(item).css({'background':'url('+this.awardImg +') no-repeat'});
                                    for (let i = 0; i < index; i++) {
                                        let idName = '#imgs'+ (i+1)
                                        $(idName).css({"transform":"rotateY(180deg)"});
                                    }
                                    
                                },
                                duration:800
                            });
                        })
                        setTimeout(() =>{//关闭翻牌
                            this.showThree.show = false;
                            this.showFive.show = false;
                        },2900)
                        setTimeout(() => {//星星闪闪
                            this.showAward = true;//打开奖品弹框
                            setInterval(() =>{
                                $("#star1").animate({opacity:0},600).animate({opacity:1}, 600)
                            },1200);
                            setInterval(() =>{
                                $("#star2").animate({opacity:0},500).animate({opacity:1}, 600)
                            },1000);
                            setInterval(() =>{
                                $("#star3").animate({opacity:0},550).animate({opacity:1}, 450)
                            },1000);
                        },3000)
                    }
                },{drawLottery:index})
            },
            toReversal(id,index,ind){   //点击翻转牌
                if(this.canClick){
                    this.canClick = false;
                    var thata = this;
                    var istrue = true;
                    if(index == 3){//修改背景图
                        this.awardImg = 'https://aliyunsso.edspay.com/web/wx/integralStroe/fanpai1.png'
                        this.signData.wednesdayIfPrizeDraw = false;
                        if(this.threeTrue){
                            this.threeTrue = false;
                            this.getAwardData(id,index,ind);
                        }
                    }else{
                        this.awardImg = 'https://aliyunsso.edspay.com/web/wx/integralStroe/fanpai2.png'
                        this.signData.sundayIfPrizeDraw = false;
                        if(this.fiveTrue){
                            this.fiveTrue = false;
                            this.getAwardData(id,index,ind);
                        }
                    }
                    
                }
            },
            getUserData(){//获取用户信息
                if(!this.hasLogin){
                    this.signIn =true
                }
                this.getAppData('/score/getUserSignList',(data) => {
                    console.log(data.resData)
                    this.signData = data.resData;
                    this.signData1 = data.resData.signLog;
                    for (let i = 0; i < 7; i++) {
                        if(this.signData1.length < 7){
                            this.signData1 = this.signData1.concat([1])
                        }else{
                            break;
                        }		
                    }
                    this.signIn =true
                },{},1,1)
            },

    	},
        components:{
            signIn,
            diaLogs
        },
    	created(){
    		this.getUserData();
            this.nowTime = (new Date()).toLocaleString();
    	},
        mounted(){
            //给app传值标题名
            this.PassValue('NavWhite_签到日历');
            // this.PassValue('operate_兑换记录啦_https://' + window.location.host + '/#/charitable');
        },
        beforeDestroy(){
            // this.PassValue('operate');
        }, 
    }
</script>

<style lang="scss" scoped>
$redColor: #F14B4B!global;
    #signIn{
        width: 100%;
        color: #333;
        background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/signIn/signBG1.png) no-repeat;
        background-size: 100%;
        padding-top:1.226667rem;
        .successLayer{
            background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/signIn/goids.png) no-repeat center center;
            background-size: 6.72rem 5.693333rem;
            background-color: rgba(0, 0, 0, 0.5) !important;
            .content{
                position: absolute;
                top: 50%;
                left: 0;
                right: 0;
                // height:1.226667rem;
                width:4.333333rem;
                margin:1.4rem auto 0;
                font-size:.426667rem;
                line-height:1.226667rem;
                text-align:center;
                color:#fff;
                border-radius: 0.266667rem;
                .messagePrizeDraw{
                    font-size: .426667rem;
                    color: #FFFFFF;
                    height: .6rem;
                    line-height: .6rem;
                    margin-top: .933333rem;
                    width: 150%;
                    margin-left: -25%;
                }
                .closeBtn{
                    font-size: 1.066667rem;
                    margin-top: 1rem;
                }
            }
        }
        .card{
            height:3.146667rem;
            width:2.4rem;
            background-size:100% 100%!important;
        }
        .bag{
            background:rgba(0,0,0,.7)!important;
        }
        .threeLayer{
            z-index: 9999!important;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .card{
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/zhousan.gif) no-repeat;
                position: absolute;
                top:10.586667rem;
                left:1.6rem;
                img{
                    width:2.48rem;
                    height:2.586667rem;
                    display:block;
                    margin:0.453333rem auto;
                    transform:rotateY(180deg);
                }
            }
            .card.active:before{
                content: '';
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 99999;
                position: absolute;
                border-radius: 5px;
            }
        }
        .fiveLayer{
            z-index: 9999!important;
            // background:rgba(0,0,0,.5)!important;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .card{
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/zhouwu.gif) no-repeat;
                position: absolute;
                top:10.586667rem;
                left:6.0rem;
                img{
                    width:2.48rem;
                    height:2.586667rem;
                    display:block;
                    margin:0.453333rem auto;
                    transform:rotateY(180deg);
                }
            }
            .card.active:before{
                content: '';
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 99999;
                position: absolute;
                border-radius: 5px;
            }
        }
        .layerRule{
            .content{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                width:7.493333rem;
                height:11.493333rem;
                margin:auto;
                .bottom{
                    background:#fff;
                    height:9.333333rem;
                    border-bottom-right-radius: 0.266667rem;
                    border-bottom-left-radius: 0.266667rem;
                }
                .bottom.H{
                    height:9.92rem;
                }
                .title{
                    height: 1.373333rem;
                    font-size:0.4rem;
                    line-height:1.373333rem;
                    background:#f3f3f3;
                    border-top-right-radius: 0.266667rem;
                    border-top-left-radius: 0.266667rem;
                    text-align:center;
                }
                .text{
                    background:#fff;
                    padding:0.32rem 0.4rem 0;
                    p{
                        font-size:.346667rem;
                        line-height:.586667rem;
                        margin-bottom: .066667rem;
                        text-align: justify;
                    }
                }
                .btn{
                    width:6.666667rem;
                    height:0.96rem;
                    border-radius:0.58rem;
                    line-height:0.96rem;
                    text-align:center;
                    color:#fff;
                    font-size:0.426667rem;
                    margin: 0.6rem auto 0;
                    // background:#F14B4B;
                    background: $redColor;
                }
                
            }
        }
        .reversalAward{
            text-align:center;
            background:rgba(0,0,0,.7)!important;
            .title{
                padding:2.966667rem 0 0.133333rem;
                font-size:0.613333rem;
                line-height:0.88rem;
                color:#FF9A58;
            }
            .goodName{
                margin:0 auto 0.613333rem;
                width:80%;
                height:0.56rem;
                line-height:0.56rem;
                font-size:0.4rem;
                color:#FF9A58;
                text-align:center;
            }
            .content{
                height:4.853333rem;
                width:3.706667rem;
                background-size:100% 100%!important;
                margin:0 auto 0.533333rem;
                padding-top:0.693333rem;
                position: relative;
                .imgs{
                    height:3.466667rem;
                    width:3.466667rem;
                    margin:0 auto;
                    background-size:100% 100%!important;
                    text-align:center;
                    .num{
                        padding-top:0.6rem;
                        line-height:0.56rem;
                        font-size:0.48rem;
                        color:#FC5658;
                        height:1.333333rem;
                        span{
                            font-size:0.32rem;
                        }
                    }
                    .type{
                        font-size:0.6rem;
                        line-height:0.986667rem;
                        color:#fff;
                        padding-top:0.32rem;
                    }
                }
                .jifenimgs{
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/signIn/jifen.png) no-repeat 0.32rem 0.933333rem;
                    background-size:3.04rem 1.813333rem!important;
                    .conten{
                        padding-top:0.9333rem;
                        text-align:center;
                        color:#fff;
                        line-height:1.613333rem;
                        font-size:0.346667rem;
                        em{
                            font-size: 0.586667rem;
                            font-family: DIN-Medium;
                        }
                    }
                }
                .xuni{
                    background-size:2.906667rem 2.826667rem!important;
                }
                .star{
                    position: absolute;
                    background-size:100% 100%!important;
                }
                .star1{
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/Star1.png) no-repeat;
                    height:0.8rem;
                    width:0.8rem;
                    top:-0.7rem;
                    right:-0.9rem;
                }
                .star2{
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/Star2.png) no-repeat;
                    height:0.4rem;
                    width:0.4rem;
                    left:-0.6rem;
                    top:2.8rem;
                }
                .star3{
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/Star3.png) no-repeat;
                    height:0.506667rem;
                    width:0.506667rem;
                    left:-1.2rem;
                    top:1.1rem;
                }
                
            }
            .text{
                font-size:0.346667rem;
                line-height:0.506667rem;
                width:7.16rem;
                color:#fff;
                margin:0 auto;
                span{
                    color: #FF9A58;
                }
            }
            .tips{
                font-size:0.32rem;
                line-height: 0.32rem;
                padding-top: 0.186667rem;
                color:#fff;
            }
            .close{
                height:1.066667rem;
                width:1.066667rem;
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/chacha.png) no-repeat;
                background-size:100% 100%;
                margin: 2.266667rem auto 0;
            }
        }
        .topBox{
            height:7.893333rem;
            width:9.2rem;
            margin: 0 auto .266667rem;
            text-align: center;
            position: relative;
            padding: 0 .506667rem;
            .rule{
                position: absolute;
                z-index: 99;
                font-size: .373333rem;
                right: .533333rem;
                top: 1.093333rem;
                color: #333;
            }
            .week{  
                font-size: .64rem;
                line-height: .88rem;
                font-weight:600;
                color: #333;
                text-align: center;
                margin-bottom: .066667rem;
            }
            .toDay{
                font-size: .373333rem;
                line-height: .533333rem;
                color: #333;
                text-align: center;
                margin-bottom: .4rem
            }
            .btn{
                height:1.44rem;
                width:3.253333rem;
                margin: -.693333rem auto .4rem;
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/newIntEarn/newSignBtn1.png) no-repeat;
                background-size: 100% 100%;
            }
            .hasBtn{
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/newIntEarn/newSignBtn2.png) no-repeat;
                background-size: 100% 100%;
            }
            .line1{
                width: 7.866667rem;
                height: 1px;
                background: #e5e5e5;
                margin: .533333rem auto .373333rem;
                transform: scaleY(0.5);
                -webkit-transform: scaleY(0.5);
            }
            .careNo{
                height: .6rem;
                width: 75%;
                font-size: .346667rem;
                color: #333;
                float: left;
                text-align: left;
                padding-left: .16rem;
                em{
                    color: #FF423A;
                    margin-left: .2rem;
                    i{
                        color: #333;
                    }
                }
                em.NocardAmount{
                    color: #808080;
                }
            }
            .signBtn{
                width: 1.6rem;
                height: .6rem;
                background: #F14B4B;
                border-radius: 0.293333rem;
                font-size: .346667rem;
                color: #FFFFFF;
                line-height: .6rem;
                margin-right: .16rem;
            }
        }
        .award{
            height:7.4rem;
            width:9.466667rem;
            margin:0 auto;
            text-align: center;
            .title{
                padding-top: .533333rem;
                font-size:0.426667rem;
                line-height:0.613333rem;
                text-align:center;
                width:6.133333rem;
                margin:0 auto;
                i{
                    position: relative;
                    display:inline-block;
                    height:1px;
                    width:1.6rem;
                    float: left;
                    margin:10px 0;
                    // background:#f00;
                }
                span{
                    padding:0 0.533333rem;
                    font-weight:600;
                }
            }
            .cards{
                padding:0.8rem 1.333333rem 0;
                .card{
                    height:3.146667rem;
                    width:2.4rem;
                    float: left;
                    background-size: 100% 100%!important;
                }
                .card1{
                    margin-right: 2.0rem;
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/zhousanhui.png) no-repeat;
                }
                .cardHui1{
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/zhousan.gif) no-repeat;
                }
                .card2{
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/zhouwuhui.png) no-repeat;
                }
                .cardHui2{
                    background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/zhouwu.gif) no-repeat;
                }
            }
            .log{
                padding:0.4rem 0;
                font-size:0.34rem;
                line-height:0.346667rem;
                color:#608DFF;
                img{
                    height:0.346667rem;
                    width:0.346667rem;
                }
            }
            .text{
                font-size: 0.293333rem;
                line-height:0.32rem;
                color:#808080;
            }
        }
    }
</style>

<style lang="scss">
    #signIn{
        .reversalAward{
            .text{
                span{
                    color:#FF9A58;
                }
            }
        }
    }
</style>
