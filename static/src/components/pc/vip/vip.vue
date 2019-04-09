<template>
    <div id="vip">
        <div v-title>E都市钱包_VIP会员 特权福利</div>
    	<div v-keywords>E都市钱包、VIP会员、会员福利、投资理财、个人理财、P2P理财</div>
        <div class="header clear">
            <div v-if="getCookie('token')" class="top">
                <div class="content">
                    <div class="user clear">
                        <div class="data  clear">
                            <div class="phone">HI, {{userData.mobilePhone}}</div>
                            <img :src="userData.avatarPicPath ? userData.avatarPicPath:'https://aliyunsso.edspay.com/web/wx/vip/portrait.png'" alt="" class="img">
                             <div class="vip_bg_icon">{{userData.viplevel}}</div>
                             <div class="upgrade_upgrade" v-if="userData.remark">{{userData.remark}}</div>
                            <div class="money">
                                <div class="invest">
                                    <span class="my_invest">我的待收本金：<i>{{userData.userInvesting ? userData.userInvesting:0 | moneyFormat(1)}}</i>元</span>
                                    <span class="disVipInvest" v-if="userData.viplevel != 'VIP6'">
                                        再出借<i>{{investList.disVipInvest ? investList.disVipInvest:0 | moneyFormat(1)}}</i>元可获得V{{nextLevel}}特权
                                    </span>
                                </div>
                            </div>
                            <div class="tips" v-if='gift'>福利已经到啦！
                                <span class="btn" @click="$router.push('/myAccount/VipBenefits')">立即领取</span>
                            </div>
                            <div class="tips" v-else>进入
                                <router-link class="btns" to="/myAccount/VipBenefits">&lt;&lt;我的福利&gt;&gt;</router-link>查看所有领取记录
                            </div>
                        </div>
                    </div>
                    <div class="card_box">
                         <div class="xian_box"></div>
                         <ul class="card_list clear">
                             <li v-for="(item,index) in cardData" :class="{active:index == userData.level}" @click="vipChange(index)">
                                 <div class="card_icon">v{{item.level}}</div>
                                 <div class="card_text">{{item.vipInvesting | changeWan}}</div>
                                 <div class="san_icon" :class="{positTop:userData.remark}"></div>
                             </li>
                         </ul>
                    </div>
                </div>
            </div>
            <div v-else class="toLogin">
                <div class="vipText">vip会员，给您不一样的轻奢投资体验</div>
                <div @click="toLogin" class="btn">立即登录</div>
                <div class="tips">登录查看您的特权等级详细信息</div>
            </div>
        </div>
        <!-- 我的特权 -->
        <div class="my_privilege" v-if="getCookie('token')">
            <div class="title clear">
                <div class="red_line fl"></div>
                <h3 class="fl">{{myPrivilege}}</h3>
            </div>

            <div class="my_privilege_list">
                <ul class="clear">
                    <li v-for="list in privilegeData" @click="activeSimgle((list.valIndex-1),list.id)" class="fl">
                        <div  v-if="list.prerogativeName == '会员加息' && autoUpRate" class="upApr">+{{autoUpRate}}%</div>
                        <div  v-if="list.prerogativeName == '生日福利' && birthUpRate" class="upApr birthApr">+{{birthUpRate}}%</div>
                        <img v-if="list.valIndex <= privilegeNum" :src="list.vipPicUrl" alt="">
                        <img v-else :src="list.vipPicUrlQuench" alt="">
                        <p>{{list.prerogativeName}}</p>
                    </li>
                    <li class="fl">
                        <img src="https://aliyunsso.edspay.com/web/myAccount/jqqd2.png?v=1.0" alt="">
                        <p>敬请期待</p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 特权说明 -->
        <div id='single' class="vip-main clear">
            <div class="title clear">
                <div class="red_line fl"></div>
                <h3 class="fl">特权说明</h3>
            </div>
            <div class="content clear">
                <!--侧边栏-->
                <div class="privi-sidebar clear fl">
                    <ul>
                        <li v-for="(item,index) in privilegeData" @click="activeSimgle(index,item.id)" :class="{activeLi:activeIndex == index}">
                          <em>{{item.prerogativeName}}</em>
                          <span v-if="activeIndex == index">>></span>
                        </li>
                    </ul>
                </div>
                <!--右侧-->
                <div class="privi-right fl">
                    <div class="name">特权说明</div>
                    <p v-for="(item,index) in priviDetail.listTo">{{index+1}}.{{item}}</p>
                    <div class="table">
                        <ul>
                            <li class="li-top">
                                <div class="grade fl">VIP等级</div>
                                <div class="welfare fl">{{tableName}}</div>
                            </li>
                            <li v-for="item in priviDetail.list">
                                <div class="grade vip fl">{{item.vipLevel}}</div>
                                <div class="welfare vip fl">{{item.vipWealDetails ? item.vipWealDetails:'/'}}</div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- 特权说明 -->
        <div class="strategy clear">
            <div class="title clear">
                <div class="red_line fl"></div>
                <h3 class="fl">升级攻略</h3>
            </div>
            <div class="name">E都市钱包会员体系及说明<i></i></div>
            <div class="strategy-left fl">
                <ul class="table">
                    <li class="li-top">
                        <div class="grade fl">VIP等级</div>
                        <div class="invest fl">待收本金</div>
                        <!-- <div class="addUp fl">累计出借</div> -->
                    </li>
                    <li v-for="(item,index) in cardData">
                        <div class="grade fl">VIP{{index}}</div>
                        <div class="invest fl">待收本金≥{{item.vipInvesting | changeWan}}</div>
                        <!-- <div class="addUp fl">金额≥{{item.vipCumulativeInvestment | changeWan}}</div> -->
                    </li>
                </ul>
            </div>
            <div class="strategy-right fl">
                <ul>
                    <li>1、升级：用户待收本金满足相应等级条件后，即时进行升级；</li>
                    <li>2、降级：用户待收本金连续30天不满足对应等级条件，将在次日降级；</li>
                    <li>3、会员等级越高，享有的特权越丰富，优惠越大；</li>
                </ul>
                <p>注：当用户待收本金满足条件后即可升级；例如：小E待收本金达10万元，即可升级为V3等级会员。</p>
            </div>
        </div>
        <!--升级攻略 -->
        <div v-if="clubUrl.length >= clubData.length" class="club">
            <div class="title clear">
                <div class="red_line fl"></div>
                <h3 class="fl">E家俱乐部</h3>
            </div>
            <ul>
                <li v-for="(item,index) in clubData" v-if="index<3">
                    <router-link :to="{path:'/info/dynamic/Emeeting/notice',query:{eFriend:clubUrl[index].id}}">
                        <img :src="item.pic1Url" alt="">
                    </router-link>
                    <p>{{item.articleTitle}}</p>
                </li>
            </ul>
            <router-link class="more" :to="{path:'/info/dynamic/coverage',query:{num:2}}" tag="div">查看更多></router-link>
        </div>
        <vip-gift v-if="showtips.gift" :tipData="tipData" :showtips="showtips"></vip-gift><!-- 大礼包 -->

        <rank-change v-if="showtips.change" :tipData="tipData" :showtips="showtips"></rank-change><!-- 升级 -->
        <vip-demotion v-if="showtips.demotion" :tipData="tipData" :showtips="showtips"></vip-demotion><!-- 降級 -->
        <!-- <show-code v-if="showtips.qrCode" :tipData="tipData" :showtips="showtips"></show-code>  5.1.0删除分享  直接去福利页面手动领取 -->
    </div>
</template>

<script>
    import vCircle from '../../public/v-circle.vue';
    import vipGift from './vipGift.vue';
    import rankChange from './vipRankChange.vue';
    import vipDemotion from './vipDemotion.vue';
    import showCode from './showCode.vue';
    export default{
    	data(){
    		return{
                gift:false,   // 福利状态
                showtips:{
                    gift:false,//礼包
                    change:false,//升级
                    demotion:false, //降级
                    showLayer:false,
                    qrCode:false,
                    dialogType:0,   // 礼包类型
                },
                clubUrl:[],
                tipData:{},
                isGetUser:false,    //是否获取到用户信息
                ringFinish:false,   //默认加载环形是否完成
                tableName:'',   //特权详情页标题
                gradeData:[     //表格数据
                    {
                        name:'vip0',
                        wel:'30yuan + 3.5%'
                    },
                    {
                        name:'vip0',
                        wel:'30yuan + 3.5%'
                    },
                    {
                        name:'vip0',
                        wel:'30yuan + 3.5%'
                    },
                    {
                        name:'vip0',
                        wel:'30yuan + 3.5%'
                    },
                    {
                        name:'vip0',
                        wel:'30yuan + 3.5%'
                    },
                    {
                        name:'vip0',
                        wel:'30yuan + 3.5%'
                    },
                ],//等级数据
                activeIndex:0,//当前侧边栏位置
                userData:{},    //用户信息
                cardData:[],//卡信息
                privilegeNum:0,//当前等级对应的特权数
                vipTextColor:'',
                cardIndex:0,//当前卡片等级
                autoUpRate:0,
                birthUpRate:0,
                disposePrivilege:[],    //处理后的特权数组
                privilegeData:[],   //初始特权数组
                priviDetail:{},     //特权详情
                priviDetailIndex:'',    //当前特权ID
                clubData:{},    //俱乐部数据
                swiperPrivilege: {//俱乐部轮播图数据
                  privilege: {
                    el: '.swiper-privilege'
                  }
                },
                swiperOption: {//vip卡片数据
                    effect: 'coverflow',
                    notNextTick:true,
                    initialSlide:0  ,
                    grabCursor: true,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    simulateTouch : false,
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                    coverflowEffect: {
                      stretch: 0,
                      rotate: 30,
                      stretch:40,
                      depth: 200,
                      modifier: 1,
                      slideShadows : true
                    },
                    pagination: {
                      el: '.swiper-pagination'
                    },
                    onSlideChangeEnd(swiper){
                    }
                },
                investList:{},
                nextLevel:0,//距离下一等级
                myPrivilege:"我的特权",
                myVip:null
    		}
    	},
    	methods:{
            getCheck(){
                global.http.post_(this, "/vip/dialog/check", {
                    token: this.getCookie('token')
                }, data => {
                    data = data.body;
                    if(data.resCode == 1) {
                        var diaLength = data.resData.dialogs.length - 1;
                        this.tipData = data.resData.dialogs[diaLength];
                        if(diaLength>=0){
                            let dialogType = data.resData.dialogs[diaLength].dialogType;
                            this.showtips.dialogType = dialogType;
                            if(dialogType == 1){        //升级
                                this.showtips.change = true;
                            }else if(dialogType == 2){   //降级
                                this.showtips.demotion = true;
                            }else if(dialogType == 3 || dialogType == 4 || dialogType == 5){    //礼包
                                this.showtips.gift = true;
                            }


                        }
                    }
                })
            },
            toLogin(){//去登录
                 this.$router.push({path:'/login'})
            },
            vipChange(num){
                this.userData.level = num;
                this.privilegeNum = this.cardData[num].ids.length;//特权数
                this.autoUpRate = this.cardData[num].autoUpRate;//加息数
                this.birthUpRate = this.cardData[num].birthUpRate;//生日加息数
              
                if(this.cardIndex == num) {
                   this.myPrivilege = "我的特权"
                } else {
                    this.myPrivilege = 'v'+num+'特权';
                }
            },
            changeCard(num){    //滑动卡方法
                this.vipTextColor = this.cardData[num].cardFontColor;//vip卡片颜色
                this.privilegeNum = this.cardData[num].ids.length;//特权数
                this.autoUpRate = this.cardData[num].autoUpRate;//加息数
                this.birthUpRate = this.cardData[num].birthUpRate;//生日加息数
            },

            activeSimgle(index,id,type){
                if(type == 1){

                }else{
                    document.body.scrollTop = document.querySelector('#single').offsetTop;
                }
                this.activeIndex = index;
                this.tableName = this.privilegeData[index].prerogativeName;
                this.notLogPost('/vip/welfareShow',(data) =>{
                    if(data.resCode){
                        this.priviDetail = data.resData.data;
                    }
                },{id:id})
            },
            getCardData(){//获取卡信息
                this.notLogPost('/vip/cardInformation',(data) =>{
                    if(data.resCode){
                        this.cardData = data.resData.list;
                        this.privilegeNum = this.cardData[this.swiperOption.initialSlide].ids.length;
                        this.autoUpRate = this.cardData[this.swiperOption.initialSlide].autoUpRate;
                        this.birthUpRate = this.cardData[this.swiperOption.initialSlide].birthUpRate;
                    }
                },{})
            },
            getClubData(){
                this.notLogPost('/index/Efriend',(data) =>{
                    if(data.resCode){
                        this.clubUrl = data.resData.data.list;
                    }
                },{pageNum:1,pageSize:6})
                this.notLogPost('/vip/recreationClub',(data)=>{
                    if(data.resCode){
                        if(data.resCode){
                            this.clubData = data.resData.list;
                        }
                    }
                },{})
            },
            getUserData(){
                global.http.post_(this, "/vip/basic", {
                    token: this.getCookie('token')
                }, data => {
                    if(data.body.resCode == 1) {
                        this.userData =data.body.resData;
                        this.gift = data.data.resData.isNewGift;
                        this.swiperOption.initialSlide = this.userData.level;
                        this.cardIndex = this.userData.level;
                        this.isGetUser = true;
                        this.nextLevel = parseInt(this.userData.level)+1;
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
                })
            },
            getPrivilegeData(){
                this.notLogPost('/vip/welfarePrivileges',(data) =>{
                    if(data.resCode){
                        this.privilegeData = data.resData.list;
                        this.privilege(this.privilegeData);
                        this.priviDetailIndex = this.privilegeData[this.swiperOption.initialSlide].id;
                        this.activeSimgle(0,this.priviDetailIndex,1);
                    }
                },{});
                // 检查是否有可领取福利
                // global.http.post_(this, "/vip/gift/isNewGift", { mobileType:3}, data => {
                //     if (data.data.resCode == 1) {
                //         this.gift = data.data.resData.gift;
                //     }
                // })
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
                    if(i != 0 && (i+1)%10 == 0){
                        num++
                    }
                }
            },
            getInvestList () {
                global.http.post_(this, "/vip/investList/recommand", {
                    token:this.getCookie('userToken')
                }, data => {
                    this.investList = data.data.resData.pageInfo.list[0];
                })
            },
    	},
        components:{
            vCircle,
            vipGift,
            rankChange,
            vipDemotion,
            showCode,
        },
    	created(){
    		this.getPrivilegeData();
            this.getClubData();
            this.getCardData();
            if(this.getCookie('token')){
                this.getUserData();
                this.getInvestList();
            }
    	},
        mounted(){
        }
    }
</script>

<style lang="scss">
    #vip{
        .swiper-slide-shadow-left,.swiper-slide-shadow-right{
            height:0;
            width:0;
        }
        .swiper-button-prev,.swiper-button-next{
            background: none;
            top: 50px;
            height: 130px;
            width: 40px;
        }
        .swiper-button-prev img,.swiper-button-next img {
            width: 20px;
            height: 40px;
            margin: 40px 12px 0 10px;
            visibility: hidden;
        }
         .swiper-button-prev:hover, .swiper-button-next:hover{
             background: rgba(65,69,81,0.8);
             border-radius: 5px;
             img {
                 visibility: visible;
             }
         }
    }
</style>

<style lang="scss" scoped>
    #vip{
        background: #F4F4F4;
        padding-bottom: 30px;
        
        .header{
            background: url(https://aliyunsso.edspay.com/web/about/vip-top-bg.png) no-repeat;
            background-size:auto 100%; 
            height:450px;  
            margin-bottom: 20px;
            .top{
                width: 1200px;
                height:450px;
                margin:0 auto;
                .content{
                    padding-top:47px;
                    .user{
                        position: relative;
                        text-align: center;
                        margin-bottom: 40px;
                        .mark{
                            position: absolute;
                            width:32px;
                            height:16px;
                            top:92px;
                            left:92px;
                        }
                        .img{
                            margin:0 auto 20px auto;
                            width:100px;
                            height: 100px;
                            border-radius: 50%;
                        }
                        .data{
                            position: relative;
                            .phone{
                               font-family: DIN-Medium;
                                font-size: 24px;
                                color: #DCB54F;
                                text-align: center;
                                margin-bottom: 20px;
                            }
                             .vip_bg_icon{
                                width: 60px;
                                height: 20px;
                                background: #DCB54F;
                                border-radius: 14px;
                                position: absolute;
                                left: 0;right: 0;
                                top: 135px;
                                margin:auto;
                                font-family: DIN-Bold;
                                font-size: 16px;
                                color: #333333;
                                margin-bottom: 10px;
                            }
                            .upgrade_upgrade{
                                font-family: PingFangSC-Regular;
                                font-size: 12px;
                                color: #508CEE;
                               
                                text-decoration: underline;
                            }
                            .money{
                                margin-top: 20px;
                                .invest{
                                    span.my_invest{
                                        display: inline-block;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px;
                                        color: #FFFFFF;
                                        i{
                                            font-family: DIN-Bold;
                                            font-size: 16px;
                                            color: #FFFFFF;
                                        }
                                    }
                                    .disVipInvest{
                                        display: inline-block;
                                        font-family: PingFangSC-Regular;
                                        font-size: 14px;
                                        color: #333333;
                                        line-height: 20px;
                                        padding: 0 6px;
                                        background: #DCB54F;
                                        border-radius: 3px;
                                        margin-left: 10px;
                                        position: relative;
                                        i{
                                            font-family: DIN-Bold;
                                            font-size: 16px;
                                            color: #151515;
                                        }
                                    }
                                    .disVipInvest::before{
                                            content: ' ';
                                            width:0;
                                            height:0;
                                            border-width:7px 7px 7px 0;
                                            border-style:solid;
                                            border-color:transparent #DCB54F transparent transparent;/*透明 黄 透明 透明 */
                                            position:absolute;
                                            top:0px;
                                            bottom: 0;
                                            left: -6px;
                                            margin: auto;
                                    }
                                    p{
                                        font-size: 12px;
                                        line-height:18px;
                                        color:#AAABAF;
                                    }
                                }
                            }
                        }
                        .tips{
                            margin-top:30px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #FFFFFF;
                            .btn{
                                width:60px;
                                height:19px;
                                background:rgba(255,91,76,1);
                                border-radius:2px;
                                cursor: pointer;
                                font-size:12px;
                                display: inline-block;
                                vertical-align: text-top;
                                line-height: 19px;
                            }
                            .btns{
                                color: #DCB54F;
                                text-decoration: underline;
                            }
                        }
                    }
                    .card_box{
                        width: 100%;
                        position: relative;
                        .xian_box{
                            width: 1165px;
                            height: 6px;
                            background: #51565F;
                        }
                        .card_list {
                            li{
                                float: left;
                                margin-left:145px;
                                cursor: pointer;
                                margin-top: -24px;
                                position: relative;
                                .card_icon{
                                    width: 40px;
                                    height: 40px;
                                    background: #979DA5;
                                    border-radius: 50%;
                                    font-family: PingFangSC-Medium;
                                    font-size: 18px;
                                    color: #FFFFFF;
                                    text-align: center;
                                    line-height: 40px;
                                    margin-bottom: 16px;
                                }                                
                                .card_text{
                                    font-family: PingFangSC-Medium;
                                    font-size: 20px;
                                    color: #FFFFFF;
                                    text-align: center;
                                }
                                &:hover{
                                    .card_icon{
                                        background: #545E68; 
                                    }
                                }
                                .san_icon{
                                    width:0;
                                    height:0;
                                    border-width:0 14px 20px;
                                    border-style:solid;
                                    border-color:transparent transparent #F4F4F4;/*透明 透明  黄*/
                                    position:absolute;
                                    top:132px;
                                    left:11px;
                                    display: none;
                                }
                                .san_icon.positTop{
                                    top: 116px;
                                }
                            }
                            li:first-child{
                                margin-left: 0;
                            }
                            li:last-child{
                                margin-left: 145px;
                                float: right;
                            }
                            li.active{
                                margin-top: -30px;
                                .card_icon{
                                    width: 50px;
                                    height: 50px;
                                    font-size: 22px;
                                    text-align: center;
                                    line-height: 50px;
                                    background: #DCB54F;
                                }
                                .card_text{
                                    color: #DCB54F;
                                }
                              .san_icon{
                                  top:138px;
                                  display: block;
                              }     
                              .san_icon.positTop{
                                    top: 122px;
                                }   
                            }
                        }
                    }
                }
            }
        }
        .toLogin{
            text-align:center;
            color:#C8AC6C;
            .vipText{
                font-size:46px;
                line-height:66px;
                padding:130px 0 60px 0;
            }
            .btn{
                margin:0 auto;
                border-radius:25px;
                height:50px;
                width:222px;
                line-height:50px;
                font-size:18px;
                border: 1px solid #E4B443;
                cursor: pointer;
            }
            .tips{
                padding-top: 22px;
                font-size:14px;
                line-height:20px;
            }
        }
        .vip-main,.strategy,.club,.my_privilege{
            width:1200px;
            margin:0 auto;
            background: #fff;
            padding: 40px 38px 36px 40px;
            margin-bottom: 20px;
            .title{
                margin-bottom: 40px;
                .red_line{
                    margin-top: 3px;
                }
                h3{
                    margin-left: 16px;
                    font-family: PingFangSC-Medium;
                    font-size: 24px;
                    color: #333333;
                }
            }
        }
       .my_privilege{
           padding-left:0;
           padding-right: 0;
           padding-bottom: 0;
           .title{
               padding-left: 40px;
           }
           .my_privilege_list{
            width: 100%;
            position: relative;
            overflow: hidden;
            li{
                width: 200px;
                text-align: center;
                margin-bottom: 60px;
                position: relative;
                cursor: pointer;
                .upApr{
                    right: 48px;
                    top: 12px;
                    width: 40px;
                    height: 22px;
                    position: absolute;
                    background: url(https://aliyunsso.edspay.com/web/myAccount/jx.png) no-repeat;
                    background-size: 100% 100%;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    color: #fff;
                }
                .birthApr {
                    background: url(https://aliyunsso.edspay.com/web/myAccount/srlan.png) no-repeat;
                    background-size: 100% 100%;
                }
                img{
                    width: 96px;
                    height: 96px;
                }
                p{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #333333;
                }
            }
        }

       }
       
        .vip-main{
            .content{
                background:#FEFBF4;
            }
            .privi-sidebar{
                width:180px;
                ul{
                    li{
                        height:80px;
                        background:#D5C298;
                        em{
                            display:inline-block;
                            font-size:16px;
                            line-height:80px;
                            padding-left:35px;
                            color:#172336;
                        }
                    }
                    .activeLi{
                        background:#172336;
                        em{
                            color:#fff;
                        }
                        span{
                            float: right;
                            line-height:80px;
                            padding-right:10px;
                        }
                        color:#fff;
                    }
                }
            }
            .privi-right{
                padding:30px 0 0 70px;
                width:942px;
                .name{
                    font-size:14px;
                    line-height:20px;
                    padding-bottom:15px;
                    font-weight:600;
                }
                p{
                    font-size:14px;
                    line-height:20px;
                    padding-bottom:20px;
                }
                ul{
                    padding-top:60px;
                    li{
                        height:40px;
                        width:790px;
                        text-align:center;
                        line-height:40px;
                        color:#172336;
                        font-size:12px;
                        .grade{
                            width:280px;
                            border-right:1px solid #fff;
                        }
                        .welfare{
                            width:506px;
                        }
                    }
                    li:nth-child(odd){
                        background:#F1E7D1;
                    }
                    li:nth-child(even){
                        background:#FAF2E0;
                    }
                    li.li-top{
                        font-size:14px;
                        background:#D5C298;
                    }
                }
            }
        }
        .strategy{                
            .name{
                font-size:14px;
                line-height:20px;
                font-weight:600;
                padding-bottom:23px;
                i{
                    height:2px;
                    width:40px;
                    background:#C8AC6C;
                }
            }
            ul.table{
                li{
                    height:40px;
                    width:500px;
                    color:#333333;
                    line-height: 40px;
                    text-align:center;
                    font-size:12px;
                    .grade{
                        width:210px;
                        border-right:2px solid #FEFBF4
                    }
                    .invest{
                        width:290px;
                        border-right:2px solid #FEFBF4
                    }
                    .addUp{
                        width:208px;
                    }
                }
                li:nth-child(even){
                    background:#FAF2E0;
                }
                li.li-top{
                    background:#D5C298;
                }
                li.li-top{
                    font-size:14px;
                    background:#D5C298;
                }
            }
            .strategy-right{
                margin-left:39px;
                width:550px;
                ul{
                    li{
                        font-size:14px;
                        line-height:26px;
                        padding-bottom:10px;
                        color:#172336;
                    }
                }
                p{
                    padding-top:10px;
                    font-size:12px;
                    line-height:28px;
                    color:#AF914E;
                }
            }
        }
        .club{
            height:366px;
            position: relative;
            margin-bottom: 0;
            .more{
                position: absolute;
                top: 47px;
                right: 40px;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #808080;
                cursor: pointer;
                
            }
            ul{
                background: #fff;
                margin-bottom: 0.266667rem;
                display: -ms-flexbox;
                display: flex;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
                li{
                    display: block;
                    -ms-flex: 1;
                    flex: 1;
                    img{
                        display:block;
                        height:167px;
                        width:340px;
                        margin:0 auto;
                    }
                    p{
                        background:#FEFBF4;
                        padding:0 10px;
                        width:340px;
                        margin:0 auto;
                        font-size:16px;
                        color:#333;
                        line-height:32px;
                    }
                }
            }
        }
    }
</style>