<template>
    <div id="spring">
        <div v-title>天蓬迎春</div>
        <!-- 头部 -->
        <div class="lion_top"></div>
        <!-- 对联 -->
        <div class="couplet_left"></div>
        <div class="couplet_right"></div>
        <!-- 金币 -->
        <div class="gold1"></div>
        <div class="gold2"></div>
        <div class="gold3"></div>
        <div class="gold4"></div>

        <!-- banner猪 -->
        <div class="banner_box">
            <transition name="fade1" mode="out-in">
                <div class="banner banner1" v-if="selected == 1"></div>
            </transition>
             <transition name="fade2" mode="out-in">
                <div class="banner banner2"  v-if="selected == 2"></div>
            </transition>
        </div>
         
         <!-- 切换按钮 -->
         <div class="tab_btn_box">
             <div class="btn_left" @click="tabTag('oneTab',1)" :class="{activeBg:tabShow.oneTab}"></div>
             <div class="btn_right" @click="tabTag('twoTab',2)" :class="{activeBg:tabShow.twoTab}"></div>
         </div>

        <!-- 房子 一 -->
        <div class="content1_box" v-if="selected == 1">
            <div class="content">
                <!-- 领取记录按钮 -->
                <div class="get_record_btn" @click="toRed"></div>
                <!-- 查看按钮 -->
                <div class="look_btn" v-if="initIs.isLogin == 0" @click="toLogin">查看</div>
                <!-- 年化金额 -->
                <div class="money" v-else>{{ Math.floor(annulInitData.annuaAmount * 100) / 100  }}</div>
                <!-- 红包兑换区域 -->
                <div class="red_packet_box">
                    <ul class="clear"  v-if="initIs.isLogin == 0">
                         <li v-for="(item,index) in 10" :key="index" :style="{background:'url('+redBgImg1+(index+1)+'.png?v=1.1)',backgroundSize:'cover'}"  @click="toLogin"></li>
                    </ul>
                    <ul class="clear" v-else>                        
                        <li v-for="(item,index) in annulInitData.commodities" :key="index" >
                            <!-- 可兑换 -->
                            <div class="btnStatus" v-if="item.btnStatus == 0" :style="{background:'url('+redBgImg1+(index+1)+'.png?v=1.1)',backgroundSize:'cover'}" @click.stop="annulEvent(item.annualAmount,item.name,item.id)"></div>
                            <!-- 不可对换 -->
                            <div class="btnStatus" v-else :style="{background:'url('+redBgImg2+(index+1)+'.png?v=1.1)',backgroundSize:'cover'}"></div>
                        </li>
                    </ul>
                </div>
            </div> 
             <!-- 第一个页面的提示语 -->
            <div class="text1">
                活动期间出借年化金额达到相应额度可兑换相应奖励，兑换后减少相应金额，可重复出借获得奖励。
            </div>
        </div>
        <!-- 房子 二 -->
        <div class="content2_box" v-else-if="selected == 2">
            <div class="content">
                <!-- 解锁记录按钮 -->
                <div class="unlock_btn" @click="toRecordList"></div>
                <div class="hint_btn" @click="popUp = 3"></div>
                <first-pig 
                :isLogin="initIs.isLogin" 
                :goLogin="toLogin" 
                :currentPig="pigActivity.currentPig" 
                :pig1="pigActivity.pig1"
                :pig2="pigActivity.pig2"
                :pig3="pigActivity.pig3"
                @initData="jigsawPigData"
                :popUp="popUp"
                :activityTime="activityStatus"
                ></first-pig>   
            </div>
        </div>
       

        <!-- 底部 -->
        <div class="botton_box" v-if="initIs.isLogin == 1">
            <div class="activityStatus1" v-if="activityStatus == 1">
                <div class="bot_btn_left fl" @click="toShare"></div>
                <div class="bot_btn_right fr" @click="toInvest"></div>
            </div>
             <div class="activityStatus2" @click="getActivityTime" v-else></div>
        </div>

        <!-- 规则按钮 -->
        <div class="rule_btn" @click="popUp = 1"></div>
        <!-- 规则弹框 -->
        <div class="rule_box" v-show="popUp == 1">
            <div class="close_btn" @click="popUp = 0"></div>
            <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
            <a href="tel:400-135-3388"></a>
        </div>

        <!-- 计算器按钮 -->
        <div class="calculatorBtn" :class="{positTop:selected == 2}" @click="showCalculator.showCalculator = true"></div>
        <!-- 计算器 -->
        <calculator :showCalculator = "showCalculator"></calculator>

        <!-- 强制参与弹框 -->
        <div class="compel_popUp" v-if="initIs.isJoin == 0 && initIs.isLogin == 1 && activityStatus == 1">
            <div class="btn" @click="participationFun"></div>
        </div>

        <!-- 兑换弹框 -->
        <div class="conversion_box" v-if="popUp == 2">
            <div>
                <p class="p1">您是否消耗<span v-html="$options.filters.changeWan(annualAmount)"></span>年化金额兑换</p>
                <p class="p2">{{awardName}}</p>
            </div>
            <div class="btn_left" @click="popUp = 0"></div>
            <div class="btn_right" @click="getAnnul"></div>
        </div>

        <!-- 问号提示弹框 -->
        <div class="hint_box" v-show="popUp == 3" @click="popUp = 0"></div>

        <!-- 限时领取按钮 -->
        <div class="shopping_icon" @click="toShopping"></div>
     
        <!-- 遮罩 -->
        <div v-layer v-if="popUp != 0 || initIs.isJoin == 0 && initIs.isLogin == 1 && activityStatus == 1" @click="popUp = 0" :class="{layer:popUp == 5}"></div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import jiami from 'js-base64';
import { TabContainer, TabContainerItem } from 'mint-ui';
import wxShare from '../../../../common/wx/wxShare';     // APP交互函数
import wxToapp from '../../../../common/wx/wxToapp';   // 与app交互
import calculator from '../publicModule/calculator';  // 计算器
import firstPig from './firstPig';   // 猪碎片拼图
import getActivityData from '../publicJS/getActivityData';
export default {
    mixins:[ wxToapp,wxShare,getActivityData ],
    data() {
        return {
            popUp:0,   // 1、规则 2、兑换弹框 3、问号弹框  4、碎片兑换弹框   5、分享
            activityStatus:0,  // 活动时间
            showCalculator:{    // 计算器
                showCalculator:false
            },
            tabShow:{    // tab
                oneTab:true,
                twoTab:false
            },
            redBgImg1:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/bright",  // 红包背景亮起图片
            redBgImg2:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/dark",  // 红包背景没亮起图片
            selected:1,   // banner状态
            initIs:{
                isJoin:0,     // 0 为参与  1已经参与
                isLogin:0,    // 0 未登录  1已经登录
            },
            annulInitData:{    // 兑换列表数据
                annuaAmount:0,
                commodities:[]
            },
            annualAmount:0,   // 每个商品年化
            awardName:'',      // 每个商品的奖励名字
            commodityId:0,   // 兑换id
            pigActivity:{
                currentPig:1,
                pig1:{
                    lockBtn:0,
                    pieceTotal:0,
                    pieces:[]
                },
                pig2:{
                    lockBtn:0,
                    pieceTotal:0,
                    pieces:[]
                },
                pig3:{
                    lockBtn:0,
                    pieceTotal:0,
                    pieces:[]
                },
            },
            shareObj:{
                title: '集金猪 拿现金', //标题
                desc: "价值499元金猪图，就差你助力啦，现在出借还可得500元现金哦，还不速来一起抱金猪",//内容
                link: global.host+"sharePage", //链接
                imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
            },
            look:true,
            MobilePhone:''
        }
    },
    methods: {
        // 活动时间
        getActivityTime(){// 获取活动时间状态
            this.getNotlogData('/activity/two/getActivityTime',data => {
                if(data.resCode){
                    this.activityStatus = data.resData.active;
                    if (data.resData.active == 2) {   // 活动未开始
                        MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                            confirmButtonClass:'confirmButtonClass'
                        })
                    } else if(data.resData.active == 3){
                        MessageBox.alert('亲，活动已经结束啦!', '提示', {
                            confirmButtonClass:'confirmButtonClass'
                        })
                    }
                }
            },{activityId:'new_pig_year_activity'})
        },

        initPublic(){  // 是否登录和是否参与初始化接口
            this.getNotlogData('/newPigYear/initPublic', (data) => {
                if(data.resCode){
                     this.initIs = data.resData;
                     if(this.initIs.isLogin == 1){
                         this.annulInit();    // 活动1初始化
                         this.jigsawPigData();   // 活动二初始化
                          this.getUI()   // 在拿到登录信息后在调用分享的
                     }
                }
            },{})
        },
        participationFun(){    // 点击立即参与
            window._czc.push(﻿["_trackEvent", "新年活动", "立即参与按钮"]); //  友盟统计配置
            this.getAppData('/newPigYear/join', (data) => {
                if(data.resCode){
                   this.initPublic();
                }
            },{})
        },
        annulInit(){    // 兑换列表初始化数据
           this.getNotlogData('/newPigYear/annulInit', (data) => {
                if(data.resCode){
                    this.annulInitData = data.resData;
                }
            },{})
        },

        jigsawPigData(index){    // 拼图初始化数据
           this.getNotlogData('/newPigYear/pieceInit', (data) => {
                if(data.resCode){
                    this.pigActivity = data.resData;
                }
            },{})
        },

        annulEvent(amount,name,id){   // 点击兑换
           if (this.activityStatus == 2) {
                MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else if(this.activityStatus == 3){
                MessageBox.alert('亲，活动已经结束啦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else {
                 this.annualAmount = amount;
                 this.awardName = name;
                 this.commodityId = id;
                 this.popUp = 2;
            }
        },
        
        getAnnul(){    //  点击兑换确认按钮
            if(!this.look){
                return;
            }
            this.look = false;
            this.getAppData('/newPigYear/annualExchange', (data) => {
                if(data.resCode){
                     this.initPublic();
                     this.popUp = 0;
                     this.look = true;
                }
            },{commodityId:this.commodityId})
        },

        tabTag(at,n){     // tab切换
            for(var i in this.tabShow){
                this.tabShow[i] = false;
            }
            this.tabShow[at] = true;
            if(n == 1){
                this.selected = 1;
            } else {
                this.selected = 2;
            }
        },
        toRed(){    // 跳转红包页面
            if (this.activityStatus == 2) {
                MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else if(this.activityStatus == 3){
                MessageBox.alert('亲，活动已经结束啦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else {
                if(this.initIs.isLogin == 1){
                    this.toApp('RP',{path:'/wxMyAccount/wxRedPacket',query:{thisUrl:this.$route.fullPath}})
                } else {
                    this.toLogin();
                }
            }
        },
        toInvest(){     // 出借页面
            this.toApp('WIP', {path:'/wxInvest'});
        },
        toLogin(){    // 去登录
            this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
        },
        toRecordList(){   // 解锁记录
            if (this.activityStatus == 2) {
                MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else if(this.activityStatus == 3){
                MessageBox.alert('亲，活动已经结束啦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else {
                if(this.initIs.isLogin == 1){
                    this.appRouter('/2019SpringFestival/list')
                } else {
                    this.toLogin();
                }
                
            }
            
        },

        toShare(){    //分享事件
            if (this.activityStatus == 2) {
                MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else if(this.activityStatus == 3){
                MessageBox.alert('亲，活动已经结束啦!', '提示', {
                    confirmButtonClass:'confirmButtom'
                })
            } else {
                if(this.judgeTimeLogin()){
                    return;
                }
                if(this.osType){
                    this.isLogPassValue(this.appShare);
                }else{
                    if(this.getCookie('userToken')){
                        this.popUp = 5;
                    }else{
                        this.toWxLogin();
                    }
                }
            }
            
        },
        getUI () {  //获取用户id(base64转码)     分享需要ui值的时候
            this.getAppData("/user/friend/userInvite",(data) =>{
                this.userId = data.resData.ui;
                this.MobilePhone = data.resData.realName ?  data.resData.realName:data.resData.MobilePhone;
                this.shareObj.link = global.host+"sharePage?userName=" + Base64.encode(this.MobilePhone);
                this.userId = data.resData.ui;
                this.appShare = '1';
                this.getWxShareData(this.shareObj)
            },{})
        },

        toShopping(){   // 跳转积分商城
            if(this.osType){
                this.PassValue('GoodsList_6');
            } else {
                this.$router.push({path:'/intGoodList',query:{classify:6}})
            }
        }
    },
    components:{
        calculator,
        firstPig
    },
    created() {
        this.initPublic();   // 
        this.getActivityTime();
    },
    mounted() {
        this.PassValue('NavWhite_天蓬迎春');
        const script = document.createElement('script');
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1276025487&web_id=1276025487';
        script.language = 'JavaScript';
        document.body.appendChild(script);
       
    },
    watch:{
        '$route' () {
            if(window._czc) { // 友盟数据统计监听
                let location = window.location;
                let contentUrl = location.pathname + location.hash;
                let refererUrl = '/';
                window._czc.push(['_trackPageview', contentUrl, refererUrl]);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

    // tab按钮动画
	@-webkit-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-o-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-moz-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@-ms-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
	
	@keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.8);
			-moz-transform: scale(0.8);
			-ms-transform: scale(0.8);
			transform: scale(0.8);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}

// **************************************************
   // 红包动画
    @-webkit-keyframes go {
        0% {
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-moz-keyframes go {
        0% {
			 -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
			-moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-o-keyframes go {
        0% {
			-o-transform: rotate(2deg);
			-o-transform: top center;
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-ms-keyframes go {
        0% {
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;			
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
    @keyframes go {
        0% {
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(2deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(2deg);
			-o-transform: top center;
			-ms-transform: rotate(2deg);
			-ms-transform: top center;
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
// *************************************************

.fade1-enter-active,.fade1-leave-active{
    transition: all .5s;
}
.fade1-enter,.fade1-leave-to {
    -webkit-transform: translateX(-100%);
    -moz-transform: translateX(-100%);
    -ms-transform: translateX(-100%);
    -o-transform: translateX(-100%);
    transform: translateX(-100%);    
  }
.fade2-enter-active,.fade2-leave-active {
    transition: all .5s;
    
}
.fade2-enter,.fade2-leave-to {
    -webkit-transform: translateX(100%);
    -moz-transform: translateX(100%);
    -ms-transform: translateX(100%);
    -o-transform: translateX(100%);
    transform: translateX(100%);
  }
  #spring{
       width: 100%;
       height: 33.866667rem;
       position: relative;
       overflow: hidden;
       background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/wx_bg.png?v=1.1) no-repeat;
       background-size: cover;
       .lion_top{
           width: 100%;
           height: 4.133333rem;
           background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/lion_top.png?v=1.1) no-repeat;
           background-size: cover;
           position: absolute;
           left: 0;
           top: 0;
           z-index: 2;
       }
       .couplet_left,.couplet_right{
           width: 2.133333rem;
           height: 8.666667rem;
           position: absolute;
           top: 0;
           z-index: 885;
       }
       .banner_box{
           width: 100%;
           height: 9.466667rem;
           margin-bottom: 1.733333rem;
           .banner{
               width: 100%;
               height: 9.386667rem;
               position: absolute;
               left: 0;top: 1.811111rem;
           }
           .banner1{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/banner_pig1_new.png?v=1.0) no-repeat;
                background-size: cover;
           }
           .banner2{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/banner_pig2_new.png?v=1.1) no-repeat;
                background-size: cover;
           } 
       }
       .tab_btn_box{
           width: 100%;
           height: 1.333333rem;
           position: absolute;
           left: 0;
           top: 10.6rem;
           z-index: 10;
           padding: 0 .693333rem;
           div{
               float: left;
               width: 4.266667rem;
               height: 100%;
           }
           .btn_left{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/left_tab_btn1.png?v=1.0) no-repeat;
                background-size: 100% 100%;
                -webkit-animation: sf 3.5s infinite;
                -moz-animation: sf 3.5s infinite;
                -ms-animation: sf 3.5s infinite;
                animation: sf 3.5s infinite;
           }
           .btn_left.activeBg{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/left_tab_btn2.png?v=1.0) no-repeat;
                background-size: 100% 100%;
                -webkit-animation: none;
                -moz-animation: none;
                -ms-animation: none;
                animation: none;
           }
           .btn_right{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/right_tab_btn1.png?v=1.0) no-repeat;
                background-size: 100% 100%;
                -webkit-animation: sf 3.5s infinite;
                -moz-animation: sf 3.5s infinite;
                -ms-animation: sf 3.5s infinite;
                animation: sf 3.5s infinite;
           }
           .btn_right.activeBg{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/right_tab_btn2.png?v=1.0) no-repeat;
                background-size: 100% 100%;
                -webkit-animation: none;
                -moz-animation: none;
                -ms-animation: none;
                animation: none;
           }
       }
    //    中间样式 房子1
       .content1_box{
           .content{
                width: 100%;
                height: 19.2rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/fang_bg1.png?v=1.0) no-repeat;
                background-size: cover;
                position: relative;
                overflow: hidden;
                margin-bottom: .186667rem;
           
           .get_record_btn{
               width: 1.44rem;
               height: .493333rem;
               position: absolute;
               top: 1.877777rem;
               right: 1.6rem;
           }
           .look_btn{
               width: 1.066667rem;
               height: .493333rem;
               border-radius: .106667rem;
               background: #C63028;
               font-family: PingFangSC-Regular;
                font-size: .293333rem;
                color: #FFFFFF;
                line-height: .493333rem;
                text-align: center;
                position: absolute;
                top: 2.133333rem;
                left: 4.233333rem;
           }
           .money{
               height: .493333rem;
               font-family: DIN-Bold;
                font-size: .4rem;
                color: #C63028;
                position: absolute;
                top: 2.133333rem;
                left: 4.233333rem;
           }
           .red_packet_box{
               width: 100%;
               margin-top: 4.366666rem;
               padding-top: .4rem;
               padding-left: 1rem;
               ul{
                   position: relative;
                   li{
                     height: 3.8rem;
                     float: left;
                     background-repeat: no-repeat!important;
                     background-size:100%!important; 
                     .btnStatus{
                       width: 100%;
                       height: 100%;
                       background-repeat: no-repeat!important;
                       background-size:100%!important; 
                     }
                   }
                   	li:nth-child(1){
                        -webkit-animation: go 1.1s ease-in-out alternate infinite;
						-moz-animation: go 1.1s ease-in-out alternate infinite;
						-o-animation: go 1.1s ease-in-out alternate infinite;
						-ms-animation: go 1.1s ease-in-out alternate infinite;
						animation: go 1.1s ease-in-out alternate infinite;
					}
					li:nth-child(2){
						-webkit-animation: go 1.2s ease-in-out alternate infinite;
						-moz-animation: go 1.2s ease-in-out alternate infinite;
						-o-animation: go 1.2s ease-in-out alternate infinite;
						-ms-animation: go 1.2s ease-in-out alternate infinite;
						animation: go 1.2s ease-in-out alternate infinite;
					}
					li:nth-child(3){
						-webkit-animation: go 1.3s ease-in-out alternate infinite;
						-moz-animation: go 1.3s ease-in-out alternate infinite;
						-o-animation: go 1.3s ease-in-out alternate infinite;
						-ms-animation: go 1.3s ease-in-out alternate infinite;
						animation: go 1.3s ease-in-out alternate infinite;
					}
					li:nth-child(4){
						-webkit-animation: go 1.4s ease-in-out alternate infinite;
						-moz-animation: go 1.4s ease-in-out alternate infinite;
						-o-animation: go 1.4s ease-in-out alternate infinite;
						-ms-animation: go 1.4s ease-in-out alternate infinite;
						animation: go 1.4s ease-in-out alternate infinite;
					}
					li:nth-child(5){
						-webkit-animation: go 1.1s ease-in-out alternate infinite;
						-moz-animation: go 1.1s ease-in-out alternate infinite;
						-o-animation: go 1.1s ease-in-out alternate infinite;
						-ms-animation: go 1.1s ease-in-out alternate infinite;
						animation: go 1.1s ease-in-out alternate infinite;
					}
					li:nth-child(6){
						-webkit-animation: go 1.3s ease-in-out alternate infinite;
						-moz-animation: go 1.3s ease-in-out alternate infinite;
						-o-animation: go 1.3s ease-in-out alternate infinite;
						-ms-animation: go 1.3s ease-in-out alternate infinite;
						animation: go 1.3s ease-in-out alternate infinite;
					}

					li:nth-child(7){
						-webkit-animation: go 1.2s ease-in-out alternate infinite;
						-moz-animation: go 1.2s ease-in-out alternate infinite;
						-o-animation: go 1.2s ease-in-out alternate infinite;
						-ms-animation: go 1.2s ease-in-out alternate infinite;
						animation: go 1.2s ease-in-out alternate infinite;
					}
					li:nth-child(8){
						-webkit-animation: go 1s ease-in-out alternate infinite;
						-moz-animation: go 1s ease-in-out alternate infinite;
						-o-animation: go 1s ease-in-out alternate infinite;
						-ms-animation: go 1s ease-in-out alternate infinite;
						animation: go 1s ease-in-out alternate infinite;
					}
					li:nth-child(9){
						-webkit-animation: go 1s ease-in-out alternate infinite;
						-moz-animation: go 1s ease-in-out alternate infinite;
						-o-animation: go 1s ease-in-out alternate infinite;
						-ms-animation: go 1s ease-in-out alternate infinite;
						animation: go 1s ease-in-out alternate infinite;
					}
					li:nth-child(10){
						-webkit-animation: go 1.1s ease-in-out alternate infinite;
						-moz-animation: go 1.1s ease-in-out alternate infinite;
						-o-animation: go 1.1s ease-in-out alternate infinite;
						-ms-animation: go 1.1s ease-in-out alternate infinite;
						animation: go 1.1s ease-in-out alternate infinite;
					}
                   li:nth-child(1),li:nth-child(2),li:nth-child(3){
                       width: 2.133333rem;
                       margin-right: .506667rem;
                       margin-bottom: 1rem;
                   }
                   li:nth-child(4),li:nth-child(5),li:nth-child(6){
                       width: 2rem;
                       margin-right: .733333rem;
                       margin-bottom: 0.7rem;
                   }
                   li:nth-child(7),li:nth-child(8),li:nth-child(9),li:nth-child(10){
                       width: 1.813333rem;
                       margin-right: .186667rem;
                   }
               }
           }
           }
           .text1{
                padding: 0 .266667rem;
                font-family: PingFangSC-Regular;
                font-size: .32rem;
                color: #680805;
                line-height: .546667rem;
            }
            
       }
        // 房子 2
       .content2_box{
           position: relative;
           .content{
               width: 100%;
               height: 19.986667rem;
               background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/fang_bg2.png?v=1.5) no-repeat;
               background-size: cover;
               padding-top: 1.546667rem;
               position: relative;
               .unlock_btn{
                   width: 1.28rem;
                   height: 1.093333rem;
                   position: absolute;
                   right: 2.333333rem;
                   top: 4.07rem;
                   z-index: 10;
               }
               .hint_btn{
                   width: .4rem;
                   height: .4rem;
                   position: absolute;
                   right: 1.5rem;
                   bottom: 5.4rem;
               }
           }
       }
       
       .botton_box{
           width: 9.466667rem;
           height: 1.4rem;
           background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/botton_btn.png?v=1.0) no-repeat;
           background-size: cover;
           position: fixed;
           left: 0;right: 0;
           bottom: .266667rem;
           margin: auto;
           z-index: 1;
           .activityStatus1{
               width: 100%;
               height: 100%;
            .bot_btn_left,.bot_btn_right{
                width: 4.6rem;
                height: 100%;
            }
           }
           .activityStatus2{
               width: 9.466667rem;
               height: 1.4rem;
           }
           
       }

       .couplet_left{
          background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/couplet_left.png?v=1.0) no-repeat;
          background-size: cover;
          left: 0;
       }.couplet_right{
          background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/couplet_right.png?v=1.0) no-repeat;
          background-size: cover;
          right: 0;
       }
       .rule_btn{
           width: .68rem;
           height: 1.853333rem;
           background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/rule_btn.png?v=1.0) no-repeat;
           background-size: cover;
           position: fixed;
           top: 8.666667rem;
           right: 0;
       }
       .rule_box,.compel_popUp,.conversion_box,.hint_box,.debris_popUp{
           position: fixed;
           top: 0;left: 0;
           right: 0;bottom: 0;
           margin: auto;
           z-index: 999;
       }
       .rule_box{
           width: 9.32rem;
           height: 14.546667rem;
           background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/rule_box.png?v=1.2) no-repeat;
           background-size: cover;
           .close_btn{
               width: .866667rem;
               height: .866667rem;
               position: absolute;
               bottom: 0;
               right: 0;
               left: 0;
               margin: auto;
           }
           p{
            position: absolute;
            left: 1rem;
            top: 12.155555rem;
            font-family: PingFangSC-Medium;
            font-size: .293333rem;
            color: #750D00;
           }
           a{
                width: 4rem;
                height: .6rem;
                position: absolute;
                bottom: 2.422222rem;
                right: .4rem;
           }
       }
       .calculatorBtn{
           width: 1.333333rem;
           height: 1.333333rem;
           position: absolute;
           top: 14.222222rem;
           right:.866667rem;
       }
       .calculatorBtn.positTop{
           top: 15.222222rem;
       }
       .compel_popUp{
           width: 8.026667rem;
           height: 10.8rem;
           background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/compel_box.png?v=1.0) no-repeat;
           background-size: cover;
           .btn{
              width: 4.6rem;
              height: 1.2rem;
              background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/compel_btn.png?v=1.0) no-repeat;
              background-size: cover;
              position: absolute;
              left: 0;right: 0;
              bottom: 1.2rem;
              margin: auto;
              -webkit-animation: sf 3.5s infinite;
              -moz-animation: sf 3.5s infinite;
              -ms-animation: sf 3.5s infinite;
              animation: sf 3.5s infinite;
           }
       }
       .conversion_box{
           width: 10rem;
           height: 11.813333rem;
           background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/conversion_box.png?v=1.0) no-repeat;
           background-size: cover;
           text-align: center;
           padding-top: 4.855555rem;
           p{
            font-family: PingFangSC-Medium;
            font-size: .4rem;
            color: #D42917;
           }
           p.p2{
               font-size: .533333rem;
               margin-top: .2rem;
           }
           .btn_left,.btn_right{
               width: 3.333333rem;
               height: 1.2rem;
               position: absolute;
               bottom: 3.2999999rem;
           }
           .btn_left{
               left: 1.555555rem;
           }  
           .btn_right{
               right: 1.555555rem;
           }
       }
       .hint_box{
           width: 100%;
           height: 11.813333rem;
           background:url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/hint_box.png?v=1.0) no-repeat;
           background-size: cover;
       }
       .gold1,.gold2,.gold3,.gold4{
           position: absolute;
           z-index: 886;
       }
       .gold1{
           width: 1.213333rem;
           height: 1.24rem;
           background:url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/gold1.png?v=1.0) no-repeat;
           background-size: cover;
           left: 1.333333rem;
           top: 4.293333rem;
           -webkit-animation: go 1.1s ease-in-out alternate infinite;
            -moz-animation: go 1.1s ease-in-out alternate infinite;
            -o-animation: go 1.1s ease-in-out alternate infinite;
            -ms-animation: go 1.1s ease-in-out alternate infinite;
            animation: go 1.1s ease-in-out alternate infinite;
       }
       .gold2{
           width: 1.92rem;
           height: 1.933333rem;
           background:url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/gold2.png?v=1.0) no-repeat;
           background-size: cover;
           left: 1.533333rem;
           top: 6.666667rem;
           -webkit-animation: go 1s ease-in-out alternate infinite;
            -moz-animation: go 1s ease-in-out alternate infinite;
            -o-animation: go 1s ease-in-out alternate infinite;
            -ms-animation: go 1s ease-in-out alternate infinite;
            animation: go 1s ease-in-out alternate infinite;
       }
       .gold3{
          width: 1.6rem;
          height: 1.613333rem;
          background:url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/gold3.png?v=1.0) no-repeat;
           background-size: cover;
          top: 5.506667rem;
          right: 2rem;
          -webkit-animation: go 1.2s ease-in-out alternate infinite;
            -moz-animation: go 1.2s ease-in-out alternate infinite;
            -o-animation: go 1.2s ease-in-out alternate infinite;
            -ms-animation: go 1.2s ease-in-out alternate infinite;
            animation: go 1.2s ease-in-out alternate infinite;
       }
       .gold4{
          width: 1.92rem;
          height: 1.933333rem;
          background:url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/gold4.png?v=1.0) no-repeat;
          background-size: cover;
          top: 2.1rem;
          right: 3rem;
          z-index: 1;
          -webkit-animation: go 1.3s ease-in-out alternate infinite;
            -moz-animation: go 1.3s ease-in-out alternate infinite;
            -o-animation: go 1.3s ease-in-out alternate infinite;
            -ms-animation: go 1.3s ease-in-out alternate infinite;
            animation: go 1.3s ease-in-out alternate infinite;
       }

       .layer {
				background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/share_box.png?v=1.0) no-repeat;
				background-size: 100% 5.44rem;
		}
       .shopping_icon{
            width: 1.48rem;
            height: 1.6rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/icon2.gif?v=1.0) no-repeat;
            background-size: 100%;
            position: fixed;
            top: 11.266667rem;
            right: 0;
        }
  }    
</style>