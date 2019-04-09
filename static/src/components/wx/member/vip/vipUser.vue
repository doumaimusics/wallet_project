<template>
    <div id="vipUser">
        <div class="header">
            <div v-title>会员中心</div>
            <!-- 出海寻宝入口 -->
            <a v-if="activityExit.sea == 1" :href="activityExit.url" class="active_ico">
                <img :src="activityExit.seaImage" alt="">
            </a>
            <div class="user clear">
                <img v-if="userData.levelLittleUrl" :src="userData.levelLittleUrl" alt="" class="vip-mark">
                
                <img :src="userData.avatarPicPath ? userData.avatarPicPath:'https://aliyunsso.edspay.com/web/wx/vip/portrait.png'" alt="" class="fl img">
                <div v-if="getCookie('userToken')" class="user-right1 fl">
                    <h5>{{userData.mobilePhone}}<router-link to="/wxMyAccount/wxUpgrade" class="ic_1" tag="i">升级攻略</router-link></h5>
                    <router-link to="/wxMyAccount/vipWelfare" :style="{color:'#'+upTextColor,background:'url('+levelTriangleUrl+')  1.386667rem 0.05rem no-repeat'}" class="tips" tag="span">我的福利</router-link>
                </div>
                <div v-else class="user-right fl">
                    <router-link :to="{path:'/wxLogin',query:{thisUrl:$route.fullPath}}" class="fl" tag="h4">立即登录</router-link>
                    <router-link to="/wxMyAccount/wxUpgrade" :style="{color:'#'+upTextColor,background:'url('+levelTriangleUrl+')  1.386667rem 0.42rem no-repeat'}" class="tips" tag="span">升级攻略</router-link>
                </div>
                <!-- <div class="vipActivity"></div> -->
            </div>
            <div @touchend="getRefs" class="vip-card">
                <swiper v-if="(getCookie('userToken') && isGetUser) || !getCookie('userToken')" :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item,index) in cardData" :style="{color:'#'+item.cardFontColor}">
                        <div :style="{background:'url('+(item.levelBgUrl ? item.levelBgUrl:'https://aliyunsso.edspay.com/web/wx/vip/cardTi.png')+')',backgroundSize:'100% 100%'}" class="content">
                            <a class="power_upgrade_icon" :href="userData.vipHelpLevelUrl ? userData.vipHelpLevelUrl : 'javascript'" v-if="getCookie('userToken') && index == userData.level && userData.remark">{{userData.remark}}</a>
                            <div :style="{color:'#'+vipTextColor}" class="require">
                                <em v-if="index == userData.level">我的待收本金:</em>
                                <em v-else>VIP{{index}}等级要求：</em>
                                <i v-if="index == userData.level" class="1">{{parseInt(userData.userInvesting) | moneyFormat(1)}}元 </i>
                                <i v-else class="2">待收本金 ≥ {{item.vipInvesting | changeWan}}</i>
                            </div>
                            <router-link v-if="getCookie('userToken') && index == userData.level && isGift > 0" to="/wxMyAccount/vipWelfare" class="getBtn" tag="div">领取福利</router-link>
                        </div>
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <div class="privilege">
            <div class="title bdr-b">
                <!-- <img class="ic_2" src="https://aliyunsso.edspay.com/web/wx/v3.3.5/crown.png" alt=""> -->
                <span>{{userData.level == cardIndex ? "我的":("VIP"+cardIndex)}}特权</span>
            </div>
            <swiper :options="swiperPrivi">
                <swiper-slide v-for="(item,index) in disposePrivilege">
                    <ul class="clear">
                        <li v-for="list in item" @click="toDetail(list)" class="fl">
                            <div  v-if="list.prerogativeName == '会员加息' && autoUpRate" class="upApr vipApr">+{{autoUpRate}}%</div>
                            <div  v-if="list.prerogativeName == '生日福利' && birthUpRate" class="upApr hapApr">+{{birthUpRate}}%</div>
                            <img v-if="list.valIndex <= privilegeNum" :src="list.vipPicUrl" alt="">
                            <img v-else :src="list.vipPicUrlQuench" alt="">
                            <p :class="{active:list.valIndex <= privilegeNum}">{{list.prerogativeName}}</p>
                        </li>
                    </ul>
                </swiper-slide>
                <div style="bottom:0.12rem;" class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <!-- 推荐标 -->
        <div class="unLogin-div">
            <div class="title bdr-b">
                <!-- <img class="ic_2" src="https://aliyunsso.edspay.com/web/wx/v3.3.5/level.png" alt=""> -->
                <span>升级推荐</span>
                <span v-if="getCookie('userToken') && swiperOption.initialSlide < 6" class="compare">(再出借{{investList.disVipInvest ? investList.disVipInvest:0 | moneyFormat(1)}}元可获得V{{nextLevel}}特权)</span>
            </div>
            <invest-item :item="investList" :showNew="investList.newbieOnly" :showAi="!investList.newbieOnly" :risk="risk" :typeNum="1" :linkNum="1" :cnzzFun="cnzz" :userStatusInfo="userStatusInfo"></invest-item>
        </div>
        
        <!-- E家俱乐部 -->
        <div class="club" ref="clubs">
            <router-link to="/wxMyAccount/Eclub" class="title bdr-b" tag="div">
                <span>E家俱乐部</span>
                <em class="tips" tag="em">更多></em>
            </router-link>
            <swiper :options="swiperClub" v-if="isGetClub">
                <swiper-slide v-for="item in clubData">
                    <a :href="item.skipUrl">
                        <img :src="item.pic1Url" alt="">
                    </a>
                </swiper-slide>
            </swiper>
        </div>
        <!-- 底部 -->
        <div class="vip-footer">
                <img src="https://aliyunsso.edspay.com/web/wxUpdate/vip_bottom.png"/>
                <p>给您一个有温度的出借体验</p>
        </div>
        <div class="nothing" v-if="topType == 1"></div>
        <div v-if="showtips.showLayer" @click="showtips.showLayer = false" v-layer class="layer"></div>
        <vip-gift v-if="showtips.gift" :tipData="tipData" :showtips="showtips"></vip-gift><!-- 大礼包 -->
        <rank-change v-if="showtips.change" :tipData="tipData" :showtips="showtips"></rank-change><!-- 升级 -->
        <vip-demotion v-if="showtips.demotion" :tipData="tipData" :showtips="showtips"></vip-demotion><!-- 降級 -->
        <wx-footer v-if="topType == 1"></wx-footer>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'
    import vCircle from '../../../public/wx/v-circle.vue'
    import vipGift from './vipGift.vue';
    import rankChange from './vipRankChange.vue';
    import vipDemotion from './vipDemotion.vue';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import wxFooter from '../../../wxFooter';
    import wxInvestItem from '../../../public/wx/wxInvestItem'; // 引入列表组件
    export default{
        mixins:[wxToapp],
    	data(){
    		return{
                showtips:{
                    gift:false,//礼包
                    change:false,//升级
                    demotion:false, //降级
                    showLayer:false,
                },
                ringFinish:false,
                isGetUser:false,
                tipData:{},//弹框信息
                headerImg:'https://aliyunsso.edspay.com/web/wx/vip/header-img.png',
                upTextColor:'D9DFE2',
                vipTextColor:'',
                autoUpRate:0,
                birthUpRate:0,//生日福利加息
                levelTriangleUrl:'https://aliyunsso.edspay.com/web/wx/vip/tips.png',
                imgUrl:'',
                userData:{},
                cardData:[],
                activeBg:'',
                cardIndex:0,
                nextLevel:0,//距离下一等级
                needInvest:0,//距离下一等级还需要投资金额
                privilegeNum:0,
                privilegeData:[],
                topType:'',//是否展示头部和底部
                risk: 0, // 用户是否通过风险评测
                investList: {},//标的
                tipShow:false,//是否登陆
                clubData:[  //e家俱乐部
                    {
                        img:'',
                        url:'',
                    },
                    {
                        img:'',
                        url:''
                    },
                    {
                        img:'',
                        url:''
                    }
                ],
                disposePrivilege:[],
                swiperOption: {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    initialSlide:0 ,
                    spaceBetween: 0,
                    onSlideChangeEnd(swiper){
                        this.page = swiper.realIndex+1;  
                        this.index = swiper.realIndex; 
                    },
                },
                swiperPrivi:{
                    pagination: '.swiper-pagination',
                },
                swiperClub:{
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    initialSlide:0,
                    spaceBetween: 0,
                },
                isGetClub:false,
                activityExit:{},//出海活动入口
                userStatusInfo:0,
    		}
    	},  
    	methods:{
            toDetail(list){
                if(list.prerogativeName == '敬请期待'){

                }else{
                    this.$router.push({path:'/wxMyAccount/privilegeDetails',query:{id:list.id,prerogativeName:list.prerogativeName}})
                }
            },
            getInvestList () {
                this.notLogPost('/vip/investList/recommand',(data) => {
                    console.log(data)
                    if(data.resCode == 1){
                       this.userStatusInfo = data.resData.userStatusInfo;
                       this.investList = data.resData.pageInfo.list[0];
                       this.risk =data.resData.risk
                       //遍历可用红包
                        var redUseNum = 0;
                        var redDataList = data.resData.redModel;
                        if(this.investList.isRedEnvelope == 0 && this.investList.isUpRate == 0){ //红包加息券都可用
                            if(this.investList.newbieOnly){//新手标
                                for(var i=0; i<redDataList.length; i++){
                                    //优惠券为无限制和只为新手标可用
                                    if(redDataList[i].category != 1 && redDataList[i].category != 2){
                                        if(redDataList[i].maxDayTime == 0 && redDataList[i].minDayTime <= this.investList.timeLimit){ //没有时间上限
                                            redUseNum++
                                        }else if(redDataList[i].maxDayTime != 0 && redDataList[i].minDayTime <= this.investList.timeLimit && this.investList.timeLimit <= redDataList[i].maxDayTime){
                                            redUseNum++
                                        }
                                    }
                                }
                            }else{//普通标
                                for(var i=0; i<redDataList.length; i++){
                                    //优惠券为无限制和只为普通标可用
                                    if(redDataList[i].category != 0 && redDataList[i].category != 2){
                                        if(redDataList[i].maxDayTime == 0 && redDataList[i].minDayTime <= this.investList.timeLimit){//没有时间上限
                                            redUseNum++
                                        }else if(redDataList[i].maxDayTime != 0 && redDataList[i].minDayTime <= this.investList.timeLimit && this.investList.timeLimit <= redDataList[i].maxDayTime){
                                            redUseNum++
                                        }
                                    }
                                }
                            }
                            this.investList.redUseNum = redUseNum
                        }else if(this.investList.isRedEnvelope == 0 && this.investList.isUpRate == 1){//红包可用、加息券不可用
                            if(this.investList.newbieOnly){
                                for(var i=0; i<redDataList.length; i++){
                                    if(redDataList[i].category != 1 && redDataList[i].type != 0 && redDataList[i].category != 2){
                                        if(redDataList[i].maxDayTime == 0 && redDataList[i].minDayTime <= this.investList.timeLimit){
                                            redUseNum++
                                        }else if(redDataList[i].maxDayTime != 0 && redDataList[i].minDayTime <= this.investList.timeLimit && this.investList.timeLimit <= redDataList[i].maxDayTime){
                                            redUseNum++
                                        }
                                    }
                                }
                            }else{
                                for(var i=0; i<redDataList.length; i++){
                                    if(redDataList[i].category != 0 && redDataList[i].type != 0 && redDataList[i].category != 2){
                                        if(redDataList[i].maxDayTime == 0 && redDataList[i].minDayTime <= this.investList.timeLimit){
                                            redUseNum++
                                        }else if(redDataList[i].maxDayTime != 0 && redDataList[i].minDayTime <= this.investList.timeLimit && this.investList.timeLimit <= redDataList[i].maxDayTime){
                                            redUseNum++
                                        }
                                    }
                                }
                            }
                            this.investList.redUseNum = redUseNum
                        }else if(this.investList.isRedEnvelope == 1 && this.investList.isUpRate == 0){//红包不可用、加息券可用
                            if(this.investList.newbieOnly){
                                for(var i=0; i<redDataList.length; i++){
                                    if(redDataList[i].category != 1 && redDataList[i].type == 0 && redDataList[i].category != 2){
                                        if(redDataList[i].maxDayTime == 0 && redDataList[i].minDayTime <= this.investList.timeLimit){
                                            redUseNum++
                                        }else if(redDataList[i].maxDayTime != 0 && redDataList[i].minDayTime <= this.investList.timeLimit && this.investList.timeLimit <= redDataList[i].maxDayTime){
                                            redUseNum++
                                        }
                                    }
                                }
                            }else{
                                for(var i=0; i<redDataList.length; i++){
                                    if(redDataList[i].category != 0 && redDataList[i].type == 0 && redDataList[i].category != 2){
                                        if(redDataList[i].maxDayTime == 0 && redDataList[i].minDayTime <= this.investList.timeLimit){
                                            redUseNum++
                                        }else if(redDataList[i].maxDayTime != 0 && redDataList[i].minDayTime <= this.investList.timeLimit && this.investList.timeLimit <= redDataList[i].maxDayTime){
                                            redUseNum++
                                        }
                                    }
                                }
                            }
                            this.investList.redUseNum = redUseNum
                        }
                    }
                },{pageNum:1,pageSize:10,token:this.getCookie('userToken')})
            },
            getRefs(){
                this.headerImg = this.cardData[this.$refs.mySwiper.swiper.activeIndex].vipCardBgUrl;//头部背景
                this.upTextColor = this.cardData[this.$refs.mySwiper.swiper.activeIndex].upStrategyColor;//升级攻略字体颜色
                this.vipTextColor = this.cardData[this.$refs.mySwiper.swiper.activeIndex].cardFontColor;//vip卡片颜色
                this.cardIndex = this.$refs.mySwiper.swiper.activeIndex;//当前位置
                this.privilegeNum = this.cardData[this.$refs.mySwiper.swiper.activeIndex].ids.length;//特权数
                this.autoUpRate = this.cardData[this.$refs.mySwiper.swiper.activeIndex].autoUpRate;//加息数
                this.birthUpRate = this.cardData[this.$refs.mySwiper.swiper.activeIndex].birthUpRate;//加息数
                this.levelTriangleUrl = this.cardData[this.$refs.mySwiper.swiper.activeIndex].levelTriangleUrl;//小三角
            },
            getShare(){//分享弹框
                this.postData('/vip/upgradeShare',(data) =>{

                },{})
            },
            getUserData(){
                this.postData('/vip/basic',(res,data)=>{
                    if(data.resCode){
                        this.userData = data.resData;
                        this.swiperOption.initialSlide = this.userData.level;
                        this.cardIndex = this.userData.level;

                        this.isGift = data.resData.isNewGift;
                        // 距离下一等级
                        this.nextLevel = parseInt(this.userData.level)+1;
                        //距离下一等级还需要投资金额
                        // this.needInvest = this.cardData[this.nextLevel].vipCumulativeInvestment - this.userData.userInvesting;
                        // this.needInvest = data.resData.pageInfo.list.disVipInvest

                        this.isGetUser = true;
                        if(!this.userData.userInvesting){
                            this.userData.userInvesting = 0
                        }
                        if(!this.userData.userSumInvestment){
                            this.userData.userSumInvestment = 0
                        }
                        if(this.cardData.length>0){
                            this.privilegeNum = this.cardData[this.userData.level].ids.length;
                            this.autoUpRate = this.cardData[this.swiperOption.initialSlide].autoUpRate;
                            this.birthUpRate = this.cardData[this.swiperOption.initialSlide].birthUpRate;
                        }

                        this.getCheck();
                    }
                },{})
            },

            getCheck(){
                this.postData('/vip/dialog/check',(res,data)=>{
                    if(data.resCode){
                        var diaLength = data.resData.dialogs.length - 1;
                        this.tipData = data.resData.dialogs[diaLength];
                        if(diaLength>=0){
                            if(data.resData.dialogs[diaLength].dialogType == 1){//升级
                                this.showtips.change = true;
                            }else if(data.resData.dialogs[diaLength].dialogType == 2){//降级
                                this.showtips.demotion = true;
                            }else if(data.resData.dialogs[diaLength].dialogType >= 3){//礼包
                                this.showtips.gift = true;
                            }
                        }
                    }
                },{})
            },
            getCardData(){//获取卡信息
                this.notLogPost('/vip/cardInformation',(data) =>{
                    if(data.resCode){
                        this.cardData = data.resData.list;
                        this.privilegeNum = this.cardData[this.swiperOption.initialSlide].ids.length;
                        this.autoUpRate = this.cardData[this.swiperOption.initialSlide].autoUpRate;
                        this.birthUpRate = this.cardData[this.swiperOption.initialSlide].birthUpRate;
                        this.vipTextColor = this.cardData[this.swiperOption.initialSlide].cardFontColor;
                    }
                },{})
            },

            // vip里面出海活动入口
            getActivityData(){//获取卡信息
                this.notLogPost('/sea/treasure',(data) =>{
                    if(data.resCode){
                        this.activityExit = data.resData;
                    }
                },{})
            },
            getClubData(){//俱乐部信息
                this.notLogPost('/vip/recreationClub',(data) =>{
                    if(data.resCode){
                        this.isGetClub = true;
                        this.clubData = data.resData.list
                        // 没有信息显示默认图
                        if (data.resData.list.length == 0) {
                            this.clubData =[{
                                pic1Url:'https://aliyunsso.edspay.com/web/wxUpdate/00.png',
                                url:'',
                            }]
                        }
                        // 超过两个 最新的要在中间显示
                       else if (data.resData.list.length >=2) {
                            this.swiperClub.initialSlide = 1;
                            let newItem = data.resData.list[1]
                            this.clubData[1] = this.clubData[0]
                            this.clubData[0] = newItem
                        }
                    }
                },{})
            },
            getPrivilegeData(){
                this.notLogPost('/vip/welfarePrivileges',(data) =>{
                    if(data.resCode){
                        this.privilegeData = data.resData.list;
                        this.privilegeData.push({
                            prerogativeName:'敬请期待',
                            vipPicUrl:'https://aliyunsso.edspay.com/web/wx/v3.3.5/expectation.png',
                            vipPicUrlQuench:'https://aliyunsso.edspay.com/web/wx/v3.3.5/expectation.png'
                        })
                        this.privilege(this.privilegeData)
                    }
                },{})
            },  
            rollback() {
                this.$router.go(-1) 
            },
            privilege(dataList){
                let num = 0;
                let num1 = 0
                for(var i = 0;i<dataList.length;i++){
                    dataList[i].valIndex = (i+1);
                    if((num == 0 && i ==0) || num != num1){
                        this.disposePrivilege.push([]);
                        if(num1 != num){
                            num1++
                        }
                    }
                    this.disposePrivilege[num].push(dataList[i]);
                    if(i != 0 && (i+1)%8 == 0){
                        num++
                    }
                }
            },
            cnzz(){
                _czc.push(["_trackEvent", "vip页面的理财计划", "vip页面的理财计划"]);
            }
    	},
        components:{
            vCircle,
            vipGift,
            rankChange,
            swiper,  
            swiperSlide,
            vipDemotion,
            wxFooter,
            'invest-item':wxInvestItem,
        },
    	created(){
            this.topType = this.$route.query.topType;
            this.getCardData();
            this.getClubData();
            this.getPrivilegeData();
            this.getInvestList();
            this.getActivityData();
            if(this.getCookie('userToken')){
                this.getUserData();
                this.getShare();
            }
    	},
        mounted(){
            var that =this;
            // 数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1273321929&web_id=1273321929 '
            script.language = 'JavaScript'
            document.body.appendChild(script)

            if(this.osType){
                this.PassValue('VIP');
            }
        },
        watch: {
            '$route'() {
                if (window._czc) {
                    let location = window.location
                    let contentUrl = location.pathname + location.hash
                    let refererUrl = '/'
                    window._czc.push(['_trackPageview', contentUrl, refererUrl])
                }
            }
        },
    }
</script>

<style lang="scss">
    #vipUser{
        .swiper-pagination{
            .swiper-pagination-bullet-active{
                background:#F2D38A;
            }
        }
    }
</style>

<style lang="scss" scoped>
    .layer {
        background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
        background-size: 100%;
    }
    #vipUser{
        color:#333;
        background:#f8f8f8;
        height: 100%;
        .header{
            position: relative;
            background: #ffffff;
            // background:rgba(255,0,0,.3);
            // background-size:100% 100%!important;
            .vipActivity{
                position: absolute;
                top:0.346667rem;
                right:0.96rem;
                height:1.6rem;
                width:1.173333rem;
                background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivityIcon.gif') no-repeat;
                background-size:100% 100%;
            }
            .badge{
                height:1.653333rem;
                width:1.2rem;
                position: absolute;
                top:1.466667rem;
                right: 0.533333rem;
                img{
                    width:1.2rem;
                    height:1.653333rem;
                }
            }
            .vip-mark{
                position: absolute;
                height:0.32rem;
                width:0.533333rem;
                color:#fff;
                text-align:center;
                top:0.9rem;
                left:1.1rem;
                border-radius:0.16rem;
            }
            .user{
                padding:0.266667rem 0 0.506667rem 0.533333rem;
                position: relative;
                .img{
                    height: 1.066667rem;
                    width: 1.066667rem;
                    border-radius:50%;
                }
                h4{
                    width:2.5rem;
                    font-size: 0.426667rem;
                    line-height:1.066667rem;
                    padding-left: 0.4rem;
                    color:#AAABAF;
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/grayRight.png') 2.293333rem 0.35rem no-repeat;
                    background-size:0.346667rem 0.346667rem;
                }
                .user-right1{
                    margin:0.133333rem 0 0 0.266667rem;
                    h5{
                        // font-size: 0.373333rem;
                        line-height:0.373333rem;
                        // color:#AAABAF;
                        font-size: 0.373333rem;
                        color: #333333;
                        padding-bottom: 0.133333rem;
                        i{
                            display:inline-block;
                            padding-left: 0.266667rem;
                            color: #4C7DE9;
                            font-size: 0.32rem;
                            line-height: 0.453333rem;
                            background: url("https://aliyunsso.edspay.com/web/v5.1.0/blueTriangle.png") 1.68rem 0.08rem no-repeat;
                            background-size: 0.11rem 0.25rem;
                            width:  1.866667rem;
                        }
                    }
                    span{
                        display:block;
                        line-height:0.373333rem;
                        margin:0;
                        width:2rem;
                        background:url('https://aliyunsso.edspay.com/web/wx/vip/yellowRight.png') 1.386667rem 0.05rem no-repeat;
                        background-size:0.24rem 0.24rem!important;
                        font-size:0.32rem;
                        color: #C8AC6C;
                    }
                }
                .user-right{
                    .tips{
                        display:inline-block;
                        color: #C8AC6C;
                        margin-left: 0.346667rem;
                        font-size:0.32rem;
                        line-height:1.066667rem;
                        width:1.733333rem;
                        background:url('https://aliyunsso.edspay.com/web/wx/vip/yellowRight.png') 1.386667rem 0.426667rem no-repeat;
                        background-size:0.24rem 0.24rem!important;
                    }
                }
            }
            .active_ico{
                position: absolute;
                width: 1.2rem;
                height: 1.653333rem;
                right: 0.92rem;
                top: .2rem;
                z-index: 99; 
                display: inline-block;
                img{
                    width: 1.2rem !important;
                    height: 1.3333rem !important;
                }
            }
            img{width:8.0rem;height:4.533333rem;}
            .vip-card{
                height:3.733333rem;
                width:100%;
                .swiper-wrapper{
                    margin: 0 auto;
                    .swiper-slide {
                        height:4.906667rem;
                        width:8.373333rem;
                        // background:#f00;
                        background-size:100% 100%!important;
                        .content{
                            position: relative;
                            padding:0.133333rem 0.16rem 0.213333rem;
                            width: 7.546667rem;
                            height:4.4rem;
                            margin:0.24rem auto;
                            .power_upgrade_icon{
                                width: 1.6rem;
                                height: .4rem;
                                background:url(https://aliyunsso.edspay.com/web/wx/vip/power_upgrade_icon.png?v=1.0) no-repeat;
                                background-size: .2rem .2rem;
                                background-position: 1.35rem center;
                                font-size: .293333rem;
                                color: #508cee;
                                line-height: .4rem;
                                margin: 1.5rem 0 0 2rem;
                                display:block;
                            }
                            /* .rigth-money{
                                padding-top: 0.533333rem;
                                .money-top{
                                    margin-right: -0.266667rem;
                                    .name{
                                        font-size: 0.32rem;
                                        line-height: 1.2rem;
                                    }
                                    .yuanHuan{
                                        height: 1.2rem;
                                        width:1.2rem;
                                        position: relative;
                                        overflow: hidden;
                                        margin-right: 0.4rem;
                                        .yuan{
                                            position: absolute;
                                            height:2.2rem;
                                            width:2.2rem;
                                            top:-0.5rem;
                                            left:-0.5rem;
                                        }
                                    }
                                }
                                .money-bottom{
                                    padding-top: 0.106667rem;
                                    padding-left: 1rem;
                                    font-size: 0.293333rem;
                                    line-height: 0.373333rem;
                                    .money-num{
                                        width:1.7rem;
                                        text-align: center;
                                    }
                                }
                            } */
                            .require{
                                font-size:0.346667rem;
                                color:#868C90;
                                line-height:0.56rem;
                                position: absolute;
                                top:3.226667rem;
                                left:0.533333rem;
                                span{
                                    font-size:0.4rem;
                                }
                            }
                            .getBtn{
                                position: absolute;
                                top:0.706667rem;
                                right: 0.533333rem;
                                width: 0.533333rem;
                                height: 0.693333rem;
                                width: 1.866667rem;
                                background: #FFF3E1;
                                border-radius: 0.373333rem;
                                font-family: PingFangSC-Regular;
                                font-size: 0.32rem;
                                line-height: 0.693rem;
                                text-align:center;
                                color: #806F56;
                            }
                        }
                    }
                    .swiper-slide-active{
                        transform: scale(1.1);
                        transition: all 0.7s;
                        .content{
                            padding:0.133333rem 0.186667rem 0.24rem;
                            /* width:8.373333rem;
                            height:4.906667rem;
                            .require{
                                top:3.6rem;
                                transition: all 0.7s;
                            } */
                        }
                    }
                }
            } 
        }
        .title{
            text-align:left;
            font-size:0.4rem;
            line-height:0.533333rem;
            // height:0.533333rem;
            margin-left: 0.666667rem;
            position: relative;
            // padding-bottom: 0.386667rem;
            height: 1rem;
            i{
                display:inline-block;
                height:0.026667rem;
                width:0.8rem;
                background:#DAC99F;
                position: relative;
                top:-0.133333rem;
                margin:0 0.133333rem;
            }
            span{
                // padding-left:0.106667rem;
            }
            img{
                width:0.533333rem;
                height:0.533333rem;
            }
        }
        .privilege{
            padding-top:1.3rem;
            background:#fff;
            margin-bottom:0.266667rem;
            .swiper-container{
                height:5.733333rem;
                ul{
                    padding: 0 0.666667rem;
                    li{
                        padding:0.533333rem 0.673333rem 0 0;
                        position: relative;
                        img{
                            display:block;
                            height:1.44rem;
                            width:1.573333rem;
                        }
                        .upApr{
                            left:0.6rem;
                            top:0.586667rem;
                            width:0.906667rem;
                            height:0.4rem;
                            position: absolute;
                            font-size:0.213333rem;
                            line-height:0.4rem;
                            text-align:center;
                            color: #fff;
                        }
                        .vipApr{
                            background:url('https://aliyunsso.edspay.com/web/wx/v3.3.5/vipApr.png') no-repeat;
                            background-size:100% 100%;
                            right:0rem;
                        }
                        .hapApr{
                            background:url('https://aliyunsso.edspay.com/web/wx/v3.3.5/hapApr.png') no-repeat;
                            background-size:100% 100%;
                        }
                        p{
                            font-size:0.32rem;
                            text-align: center;
                            color:#c5c5c5;
                        }
                        p.active{
                            color:#333;
                        }
                    }
                    li:nth-child(4n){
                        padding-right: 0;
                    }
                }
            }
        }
        .club{
            height:5.066667rem;
            background:#fff;
            padding-top:0.453333rem;
            em{
                display:inline-block;
                float:right;
                padding-right: 0.533333rem;
                font-size: 0.373333rem;
                color:#508CEE;
                width:2.933333rem;
                text-align:right;
                height:0.933333rem;
            }
            .club{
                padding-bottom:0.266667rem;
            }
            .swiper-container{ 
                padding-top:0.48rem;
                height:3.4rem;
                .swiper-slide{
                    margin:0.133333rem 0.4rem 0;
                    width:6.48rem;
                    height:2.533333rem;
                    img{
                        height:100%;
                        width:100%;
                        border-radius: 0.213333rem;
                    }
                }
                .swiper-slide-active{
                    margin:0;
                    width:7.2rem;
                    height:2.8rem;
                    transition: all 0.7s;
                }
            }
        }
        .nothing{
            height: 1.4rem;
        }
        .vip-footer {
            margin-top: .4rem;
            img {
                width:3.5rem;
                clear: both; 
                display: block; 
                margin:auto;
            }
            p {
                font-size: .266667rem;
                color: #C1C1C1;
                text-align:center;
                margin:.2rem 0 .533333rem 0;
            }
        }
        /*新手标*/
        .unLogin-div {
            background: white;
            margin-top: .266667rem;
            padding-top: 0.453333rem;
            .recom_title{
                text-align: center;
            }
            .compare{
                font-size: 0.32rem;
                color: #808080;
            }
            .in-eqz {
                width: 8.933333rem;
                height: .023333rem;
                margin: 0 auto;
                position: relative;
            }
            .li{
                margin-top: 0px;
                margin-bottom: 0.266667rem;
            }
            .registe-div {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                margin:0rem 0rem  0rem .533333rem;
                height: 3.013333rem;
                .registe-left {
                    display: flex;
                    flex-direction: column;
                    .registe-left-p {
                        font-size: .373333rem;
                        color: #333333;
                        margin-top: .666667rem;
                        font-family: DIN-Medium;
                        span {
                            font-size: .613333rem;
                            padding: 0rem .066667rem;
                            color: #FF5B4C;
                        }
                    }
                    .registe-left-img {
                        margin-top: .4rem;
                        background: #FFFFFF;
                        border: .026667rem solid #FF5B4C;
                        color: #FF5B4C;
                    }
                }
                .registe-right {
                    img {
                        width: 4rem;
                        height: 3.013333rem;
                    }
                }
            }
        }
    }
</style>