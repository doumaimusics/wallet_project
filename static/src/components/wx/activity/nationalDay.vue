<template>
    <div id="nationalDay">
        <div v-title>国庆大狂欢</div>
        <div class="main">
            <!-- 规则按钮 -->
            <div class="rule_btn" @click="popUp = 1"></div>
            <!-- 文字轮播 -->
            <div class="swiperBg" v-if="roll.length"></div>
            <div class="swiper" v-if="roll.length">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="(item, i) in roll"><p>用户{{item.mobile_phone}}获得：{{item.amount}}元净值红包</p></swiper-slide>
                </swiper>
            </div>
            <!-- 通知 -->
            <div class="notice" v-if="getInfoList.yesterdayRed"><i></i><em>您昨日净出借额(元)：{{getInfoList.yesterdayClanMoney | returnFloat}}</em><em>获得{{getInfoList.yesterdayRed}}元净值红包</em></div>
            <!-- 当日净出借额 -->
            <div class="todayCleanMoney">
                <div class="login" v-if="!hasLogin" @click="jumpLogin"></div>
                <div class="money" v-else>{{getInfoList.todayCleanMoney | returnFloat}}</div>
            </div>
            <!-- tips -->
            <div class="tipsBtn" @click="popUp = 3"></div>
            <!-- 我的排名 -->
            <div class="mySort">
                <div class="login" v-if="!hasLogin">
                    <div class="cleanMoney">累计净出借额：</div>
                    <div class="mysort"> 我的排名：</div>
                    <div class="loginBtn" @click="jumpLogin"></div>
                </div>
                <div class="sort" v-else>
                    <div class="cleanMoney">累计净出借额：<em v-if="getInfoList">{{getInfoList.myCleanMoney | returnFloat}}元</em></div>
                    <div class="mysort" v-if="getInfoList.mySort == -1 && activityTime == 1">
                        距离上榜需出借：<em>{{getInfoList.myGap | returnFloat}}元</em>
                    </div>
                    <div class="mysort" v-else-if="getInfoList.mySort != -1">
                        我的排名：<em>第{{getInfoList.mySort}}名</em><em class="over sore">获得{{getInfoList.myBackMoney | returnFloat}}元返现</em>
                    </div>
                    <div class="mysort" v-else>
                        我的排名：<em class="over">您尚未上榜</em>
                    </div>
                </div>
            </div>
            <!-- 前5名排列 -->
            <ul class="frontFive">
                <li v-for="(item, i) in sortList" v-if="i < 5">
                    <div class="ifElse" v-if="item.mobilePhone != '虚位以待'">
                       <div class="phone" :class="{active: item.sort == getInfoList.mySort}">{{item.mobilePhone}}</div>
                        <div class="money">{{item.cleanMoney | returnFloat}}</div>
                        <div class="backMoney">当前可奖励{{item.backMoney | returnFloat}}元</div> 
                    </div>
                    <div class="phone" :style="{marginLeft: '0.453333rem'}" v-else>虚位以待</div>
                    
                </li>
            </ul>
            <!-- 排名切换卡 -->
            <div class="tab">
                <div class="item" v-for="i in 3" :style="{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/table' + i + '.png) no-repeat','backgroundSize': '100% 100%'}" :class="[{active: i == tab}, 'list'+i]"  @click="tab = i"></div>
            </div>  
        </div>
        <div class="sortList">
            <ul v-if="tab == 1">
                <li v-for="(item, i) in sortList" v-if="i > 4 && i < 10">
                    <div class="index">{{i+1}}</div>
                    <div class="lis" :class="{active: item.sort == getInfoList.mySort, over: i == 9}" v-if="item.mobilePhone != '虚位以待'">
                        <div class="name">{{item.mobilePhone}}</div>
                        <div class="money">{{item.cleanMoney | returnFloat}}</div>
                        <div class="backMoney">{{item.backMoney | returnFloat}}</div>
                    </div>
                    <div v-else class="lis" :class="{over: i == 9}" :style="{paddingLeft: '0.18rem'}">虚位以待</div>
                </li>
            </ul>
            <ul v-if="tab == 2">
                <li v-for="(item, i) in sortList" v-if="i > 9 && i < 20">
                    <div class="index">{{i+1}}</div>
                    <div class="lis" :class="{active: item.sort == getInfoList.mySort, over: i == 19}" v-if="item.mobilePhone != '虚位以待'">
                        <div class="name">{{item.mobilePhone}}</div>
                        <div class="money">{{item.cleanMoney | returnFloat}}</div>
                        <div class="backMoney">{{item.backMoney | returnFloat}}</div>
                    </div>
                    <div v-else class="lis" :class="{over: i == 19}" :style="{paddingLeft: '0.18rem'}">虚位以待</div>
                </li>
            </ul>
            <ul v-if="tab == 3">
                <li v-for="(item, i) in sortList" v-if="i > 19 && i < 30">
                    <div class="index">{{i+1}}</div>
                    <div class="lis" :class="{active: item.sort == getInfoList.mySort, over: i == 29}" v-if="item.mobilePhone != '虚位以待'">
                        <div class="name">{{item.mobilePhone}}</div>
                        <div class="money">{{item.cleanMoney | returnFloat}}</div>
                        <div class="backMoney">{{item.backMoney | returnFloat}}</div>
                    </div>
                    <div v-else class="lis" :class="{over: i == 29}" :style="{paddingLeft: '0.18rem'}">虚位以待</div>
                </li>
            </ul>
        </div>
        <div class="foot"></div>

        <!-- 立即邀请按钮&跳转理财列表页面 -->
        <div class="bottomBtn">
            <div class="invite_btn" @click="toShare"></div>
            <div class="go_invite" @click="goInvest"></div>
        </div>
        <!-- 规则弹框 -->
        <div class="rule_box" v-if="popUp==1">
            <div class="close_btn" @click="popUp = 0"></div>
            <div class="rule_center">
                <a href="tel:400-135-3388"></a>
                <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
            </div>    
        </div>
        <!--点击分享的-->
        <div :class="{layer:popUp == 2}" @click.stop="popUp = 0" v-if="popUp == 2" ></div>

        <!-- 提示弹框 -->
        <div class="hint_box" v-if="popUp == 3">
            <div class="affirm_btn" @click="popUp = 0"></div>
        </div>
        <!-- 遮罩 -->
        <div v-if="popUp" class="zIndex" v-layer @click="popUp=0"></div>
        <!-- 限时抢券ico -->
        <div class="limit_ico" @click="toGoogList"></div>
    </div>
</template>

<script>
    import wxShare from '../../../common/wx/wxShare';
    import { MessageBox } from 'mint-ui';
    export default {
        mixins:[ wxShare ],
        data() {
            return {
                tab: 1,
                popUp: 0,                // 弹窗  1、规则弹框  2、引导图  3、提示弹框
                activityTime: 0,         // 活动时间 1活动中 2活动未开始 3活动已结束
                shareObj: {              //分享标题内容配置
					title: "请收下你的过节费！", //标题
				    desc: "出行补贴天天有，万元现金拿到手", // 内容
					link: global.host + "nationalDay?channel=gqkh", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                },
                swiperOption: {          // 文字轮播
                    autoplay: 2000,      // 可选选项，自动滑动
                    direction : 'vertical',
                    speed:400,
                    autoplayDisableOnInteraction : false,    // 手指滑动以后轮播不会停止
                    loop : true,
                },
                roll: [],
                sortList : [],
                getInfoList: {},
            }
        },
        methods: {
            timeLimit(){    // 活动时间
                this.getNotlogData('/activity/getInfoList', (data) => {
                    if(data.resCode == 1){
                        this.activityTime = data.resData.time;
                        this.roll = data.resData.roll;
                        this.sortList = data.resData.sortList;
                        this.getInfoList = data.resData;
                         if(data.resData.time == 2){
                            MessageBox.alert('亲，活动尚未开始哦', '提示' , {confirmButtonClass:'confirmButtonClass'})
                        } else if(data.resData.time == 3){
                            MessageBox.alert('亲，活动已结束', '提示' , {confirmButtonClass:'confirmButtonClass'})
                        }
                    }
                }, {},1)
            },

            toShare(){    //去分享事件
                if(this.activityTime == 2){
                   MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else if(this.activityTime ==3){
                    MessageBox.alert('亲，活动已结束', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else {
                    !this.hasLogin ? this.jumpLogin() : this.osType ? this.isLogPassValue(this.appShare) : this.popUp = 2;
                }
            },

            goInvest(){     // 跳转到理财列表
                if(this.activityTime == 2){
                   MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else if(this.activityTime ==3){
                   MessageBox.alert('亲，活动已结束', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else {
                    !this.hasLogin ? this.jumpLogin() : this.toApp('WIP',{path:'/wxInvest'});
                }
            },
            jumpLogin(){
                let parameters = Object.assign(this.$route.query,{ thisUrl: this.$route.fullPath });
                let parametersReg = Object.assign(this.$route.query,{ fullPath: this.$route.fullPath });
                if(this.$route.query.ui){
                    this.osType ? this.PassValue('RE') : this.$router.push({ path: '/wxRegisterNew', query: parametersReg });
                }else{
                    this.osType ? this.PassValue('LG') : this.$router.push({ path: '/wxLogin', query: parameters });
                }
            },
            // 跳积分商城兑换列表页
            toGoogList(){
                this.osType ? this.PassValue('GoodsList') : this.$router.push({ path: '/intGoodList', query: {thisUrl:this.$route.fullPath}});
            },

        },
        created: function() {
            this.timeLimit()
            this.getWxShareData(this.shareObj); //分享调用
        },
        mounted: function() {
            this.PassValue('NavWhite_国庆大狂欢');
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274743479&web_id=1274743479';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        },
        components: {

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
    #nationalDay{
        .main{
            font-family: PingFangSC-Regular;
            width: 10rem;
            height: 40.106667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/nationalDayBg.png?v=1.0) no-repeat;
            background-size: 100% 100%;
            position: relative;
            padding-top: 11.933333rem;
            .swiperBg{
                position: absolute;
                top: .4rem;
                left: 1.626667rem;
                width: 6.733333rem;
                height: .546667rem;
                opacity: 0.27;
                background: #404040;
                border-radius: .28rem;
            }
            .swiper{
                font-family: DIN-Light;
                font-size: .32rem;
                position: absolute;
                top: .4rem;
                left: 1.626667rem;
                width: 6.733333rem;
                height: .546667rem;
                line-height: .6rem;
                color:#fff;
                text-align: center;
                .swiper-container{
                    height: .6rem;
                }
            }
            .notice{
                position: absolute;
                top: 10.666667rem;
                font-family: PingFang-SC-Regular;
                height: .666667rem;
                opacity: 0.6;
                background: #FFFFFF;
                border-bottom-right-radius: .333333rem;
                border-top-right-radius: .333333rem;
                overflow: hidden;
                padding-right: .133333rem;
                i{
                    width: .533333rem;
                    height: .666667rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/icon.png) no-repeat;
                    background-size: 100% 100%;
                    display: inline-block;
                    margin-right: .066667rem;
                }
                em{
                    height: .666667rem;
                    line-height: .7rem;
                    display: inline-block;
                    font-size: .293333rem;
                    color: #333333;
                    margin-right: .2rem;
                    vertical-align: top;
                }
            }
            .todayCleanMoney{
                width: 100%;
                height: .933333rem;
                line-height: .933333rem;
                text-align: center;
                .login{
                    width: 2.933333rem;
                    height: .933333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/toLongin.png) no-repeat;
                    background-size: 100% 100%;
                    margin: 0 auto;
                }
                .money{
                    font-family: DIN-Bold;
                    font-size: .666667rem;
                    color: #306DF5;
                    // margin-top: .12rem;
                }
            }
            .mySort{
                width: 8.293333rem;
                height: 3.2rem;
                margin: 11.2rem auto 0;
                padding-top: .76rem;
                padding-left: 1.453333rem;
                .login{
                    position: relative;
                    .cleanMoney{
                        height: .533333rem;
                        line-height: .533333rem;
                        margin-bottom: .293333rem;
                        font-size: .373333rem;
                        color: #8C5215;
                    }
                    .mysort{
                        height: .533333rem;
                        line-height: .533333rem;
                        font-size: .373333rem;
                        color: #8C5215;
                    }
                    .loginBtn{
                        width: 2.933333rem;
                        height: .933333rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/toLongin.png) no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        top: .186667rem;
                        right: 1.08rem;
                    }
                }
                .sort{
                    .cleanMoney{
                        height: .533333rem;
                        line-height: .533333rem;
                        margin-bottom: .293333rem;
                        font-size: .373333rem;
                        color: #8C5215;
                        em{
                            font-size: .373333rem;
                            color: #306DF5;
                        }
                    }
                    .mysort{
                        height: .533333rem;
                        line-height: .533333rem;
                        font-size: .373333rem;
                        color: #8C5215;

                        em{
                            font-size: .373333rem;
                            color: #306DF5;
                        }
                        em.over{
                            color: #666666;
                        }
                        em.over.sore{
                            margin-left: .133333rem;
                        }

                    }
                }
            }
            .tipsBtn{
                width: .666667rem;
                height: .666667rem;
                position: absolute;
                top: 12.906667rem;
                right: 2.853333rem;
            }
            .frontFive{
                margin-top: 3.293333rem;
                height: 7.466667rem;
                width: 100%;
                position: relative;
                li{
                    height: 1.226667rem;
                    width: 3rem;
                    position: absolute;
                    left: 4rem;
                    top: .173333rem;
                    .phone{
                        font-family: PingFangSC-Regular;
                        height: .44rem;
                        line-height: .44rem;
                        font-size: .32rem;
                        color: #B63C00;
                        margin-bottom: .04rem;
                    }
                    .phone.active{
                    font-family: PingFangSC-Medium; 
                    }
                    .money, .backMoney{
                        height: .373333rem;
                        line-height: .373333rem;
                        font-size: .266667rem;
                        color: #333;
                    }

                }
                li:nth-child(2){
                    left: .666667rem;
                    top: 1.626667rem;
                }
                li:nth-child(3){
                    left: 6.826667rem;
                    top: 1.626667rem;
                }
                li:nth-child(4){
                    left: 1.72rem;
                    top: 5.426667rem;
                }
                li:nth-child(5){
                    left: 5.906667rem;
                    top: 5.426667rem;
                }
            }
            .tab{
                width: 9.52rem;
                height: 1.24rem;
                margin: 0 auto;
                .item{
                    float: left;
                    width: 3.173333rem;
                    height: 100%;
                }
                .list1.active{
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/table1Active.png?v=1.0) no-repeat !important;
                    background-size: 100% 100% !important;
                }
                .list2.active{
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/table2Active.png) no-repeat !important;
                    background-size: 100% 100% !important;
                }
                .list3.active{
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/table3Active.png) no-repeat !important;
                    background-size: 100% 100% !important;
                }
            }   
        }
        .sortList{
            width: 10rem;
            background: #FDD4BA url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/line.png);
            background-size: 100% 100%;
            overflow: hidden;
            ul{
                overflow: hidden;
                width: 100%;
                padding: 0 .68rem 0 .346667rem;
                li{
                    height: .893333rem;
                    width: 100%;
                    .index{
                        width: .96rem;
                        line-height:.893333rem; 
                        font-size: .4rem;
                        font-family: DIN-Medium;
                        color: #6D350D;
                        float: left;
                        text-align: center;
                    }
                    .lis{
                        float: left;
                        width: 8rem;
                        height: 100%;
                        border-bottom: 1px solid #FFB997;
                        font-family: PingFangSC-Regular;
                        font-size: .346667rem;
                        color: #C45B2E;
                        line-height:.893333rem; 
                        .name{
                            width: 2.7rem;
                            margin-left: .15rem;
                            float: left;
                        }
                        .money{
                            float: left;
                            width: 2.64rem;
                            text-align: center;
                        }
                        .backMoney{
                            float: left;
                            width: 2.1rem;
                            text-align: center;
                            margin-left: .41rem;
                        }
                    }
                    .lis.active{
                        font-family: PingFangSC-Medium;
                        color: #893613;
                        letter-spacing: -0.013333rem;
                    }
                    .lis.over{
                        border: none;
                    }
                }
            }
        }
        .foot{
            width: 10rem;
            height: 3.2rem;
            background: #FDD4BA url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/footBg.png?v=1.0) no-repeat;
            background-size: 100% 100%;
        }
        .bottomBtn{
            width: 10rem;
            height: 1.333333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/shareOrInvest.png) no-repeat;
            background-size: 100% 100%;
            position: fixed;
            bottom: 0;
            .invite_btn{
                height: 100%;
                width: 3.466667rem;
                float: left;
            }
            .go_invite{
                height: 100%;
                width: 6.533333rem;
                float: left;
            }
        }
        .rule_btn{
            width: .933333rem;
            height: 1.013333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/rule.png) no-repeat;
            background-size: 100% 100%;
            position: fixed;
            top: 0;
            right: .266667rem;
            z-index: 9;
        }
        .rule_box{
            width: 8.4rem;
            height: 13.546667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/ruleCenter.png?v=1.0) no-repeat;
            background-size: 100% 100%;
            position:fixed;
            top:0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 100;
            overflow: hidden;
            .rule_center{
                width: 100%;
                height: 100%;
                overflow-y: auto;
                position: relative;
                a{
                    width: 3rem;
                    height: 1rem;
                    position: absolute;
                    left: 2.5rem;
                    top:11.75rem;
                }
                p{
                    width: 100%;
                    position: absolute;
                    left: 0;
                    bottom: 0.3rem;
                    font-size: .293333rem;
                    color: #468EE5 ;
                    margin-bottom: .2rem;
                    text-align: center;
                }
            }
            .close_btn{
                width: .7rem;
                height: .693333rem;
                position: absolute;
                top: 0;
                right: 0rem;
                z-index: 99;
            }
        }
        .hint_box{
            width: 8.4rem;
            height: 4.666667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/tips.png) no-repeat;
            background-size: 100% 100%;
            position: fixed;
            top: 0;left: 0;
            right: 0;bottom: 0;
            margin: auto;
            z-index: 100;
            .affirm_btn{
                width: 4.013333rem;
                height: 1.066667rem;
                position: absolute;
                left: 0;right: 0;
                bottom: 0.61rem;
                margin: auto;
            }
        }
        .layer {
                width: 10rem;
                height: 4.266667rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/shareBg.png?v=1.0) no-repeat;
				background-size: cover;
                z-index: 100;
                position: fixed;
                top:0;left: 0;
		}
    }
    .zIndex{
        z-index: 99!important;
    }
    .limit_ico{
        position: fixed;
        width: 1.48rem;
        height: 1.6rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/nationalDay/limitPacket.gif) no-repeat;
        background-size: cover;
        z-index: 10;
        top: 10.266667rem;
        right: 0.133333rem;
        
    }
</style>
<style>
    .confirmButton, .cancelButton,.confirmButtonClass {
		font-size: 0.48rem !important;
    }
</style>
