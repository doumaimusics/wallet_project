<template>
    <div id="main">
        <div v-title>钱包满血计划</div>
        <div class="mainTop">
            <div class="head"></div>
            <div class="entrance" :class="[{time1:start==2,time2:start==3,time3:start==5}]">
                <div class="toLink top" @click="toMeeting(1)">
                    <div class="btn" v-if="start!=5"></div>
                </div>
                <div class="toLink L" @click="toMeeting(2)">
                    <!-- <div class="btn" v-if="start==2 && start==3"></div> -->
                </div>
                <div class="toLink R" @click="toMeeting(3)">
                    <!-- <div class="btn" v-if="start==3"></div> -->
                </div>
            </div>
            <div class="userTop">
                <div class="myUserTop" v-if="loginStatus == 1">我的排名：<em>{{userTop == 0 ? '未上榜单' : '第'+userTop+'名'}}</em></div>
                <div class="myUserTop" v-else>我的排名：<em>第**名</em></div>
                <div class="center">
                    <div class="info" v-if="loginStatus == 1">
                        <div class="defaultMoney">
                            <div class="money">{{defaultMoney}}</div>
                            <div class="describe">初始待收本金（元）</div>
                        </div>
                        <div class="newMoney">
                            <div class="money">{{newMoney}}</div>
                            <div class="describe">当前待收本金（元）</div>
                        </div>
                        <div class="isTopMoney" v-if="userTop == 0">距离上榜需出借：<em>{{isTopMoney ? isTopMoney : 0}}元</em></div>
                    </div>
                    <div class="toLogin" v-else @click="toLogin"></div>
                </div>
            </div>
            <div class="poster-main carousel" id="carousel" data-setting="{
				&quot;width&quot;:266,
                &quot;height&quot;:153,
                &quot;posterWidth&quot;:125,
                &quot;posterHeight&quot;:153,
                &quot;scale&quot;:0.8,
                &quot;speed&quot;:1000,
                &quot;autoPlay&quot;:true,
                &quot;delay&quot;:3000,
                &quot;verticalAlign&quot;:&quot;middle&quot;
				}"> 
			    <ul class="poster-list"> 
                    <li class="poster-item" :id="'item'+v" v-for="(v, i) in 5"  :style="[{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/ranking'+v+'.png)', backgroundSize: '100%'}]">
                        <div class="data" :class="'A'+XIndex1" v-if="resCode&&v==1">
                            <p>{{resData.list1[i].mobilePhone ? resData.list1[i].mobilePhone : '虚位以待'}}<em v-if="resData.list1[i].top == userTop">(我)</em></p>
                            <p>待收增长本金：</p>
                            <p class="money">{{resData.list1[i].collectedMoney ? resData.list1[i].collectedMoney : '--'}}</p> 
                        </div>
                        <div class="data" :class="'B'+XIndex2" v-if="resCode&&v==2">
                            <p>{{resData.list1[i].mobilePhone ? resData.list1[i].mobilePhone : '虚位以待'}}<em v-if="resData.list1[i].top == userTop">(我)</em></p>
                            <p>待收增长本金：</p>
                            <p class="money">{{resData.list1[i].collectedMoney ? resData.list1[i].collectedMoney : '--'}}</p> 
                        </div>
                        <div class="data" :class="'C'+XIndex3" v-if="resCode&&v==3">
                            <p>{{resData.list1[i].mobilePhone ? resData.list1[i].mobilePhone : '虚位以待'}}<em v-if="resData.list1[i].top == userTop">(我)</em></p>
                            <p>待收增长本金：</p>
                            <p class="money">{{resData.list1[i].collectedMoney ? resData.list1[i].collectedMoney : '--'}}</p> 
                        </div>
                        <div class="data" :class="'D'+XIndex4" v-if="resCode&&v==4">
                            <p>{{resData.list1[i].mobilePhone ? resData.list1[i].mobilePhone : '虚位以待'}}<em v-if="resData.list1[i].top == userTop">(我)</em></p>
                            <p>待收增长本金：</p>
                            <p class="money">{{resData.list1[i].collectedMoney ? resData.list1[i].collectedMoney : '--'}}</p> 
                        </div>
                        <div class="data" :class="'E'+XIndex5" v-if="resCode&&v==5">
                            <p>{{resData.list1[i].mobilePhone ? resData.list1[i].mobilePhone : '虚位以待'}}<em v-if="resData.list1[i].top == userTop">(我)</em></p>
                            <p>待收增长本金：</p>
                            <p class="money">{{resData.list1[i].collectedMoney ? resData.list1[i].collectedMoney : '--'}}</p> 
                        </div>
                    </li>
			    </ul> 

			    <div class="poster-btn poster-prev-btn" style="width: 50%; height: 100%; z-index: 3;"></div> 
			    <div class="poster-btn poster-next-btn" style="width: 50%; height: 100%; z-index: 3;"></div> 
		   </div>
        </div>
        <div class="ranking">
            <div class="tab">
                <div class="tabList" v-for="(v, i) in tabList" :class="[{active: i == tabIndex}]" @click="tabIndex = i">
                    <div class="No">第{{v[0]}}-{{v[1]}}名</div>
                    <div class="reward">奖励{{v[2]}}元</div>
                    <div class="line" v-if="i != 4 && tabIndex != i+1"></div>
                </div>
            </div>
            <div class="tabCenter" v-if="resCode">
                <div v-for=" (item, index) in [resData.list2, resData.list3, resData.list4, resData.list5, resData.list6]">
                    <div class="list" v-if="tabIndex == index" v-for="(v, i) in item">
                        <div class="name" :class="[{active:v.mobilePhone!=''}]">{{v.mobilePhone=='' ? '虚位以待' : v.mobilePhone}}<em v-if="v.top == userTop">(我)</em></div>
                        <div class="money" :class="[{active:v.collectedMoney > 0}]">{{v.collectedMoney == 0 ? '--' : v.collectedMoney}}</div>
                    </div>
                </div>
                <!-- <div class="list" v-if="tabIndex == 1" v-for="(v, i) in resData.list3">
                    <div class="name" :class="[{active:v.mobilePhone!=''}]">{{v.mobilePhone=='' ? '虚位以待' : v.mobilePhone}}<em v-if="v.top == userTop">(我)</em></div>
                    <div class="money" :class="[{active:v.collectedMoney > 0}]">{{v.collectedMoney == 0 ? '-' : v.collectedMoney}}</div>
                </div>
                <div class="list" v-if="tabIndex == 2" v-for="(v, i) in resData.list4">
                    <div class="name" :class="[{active:v.mobilePhone!=''}]">{{v.mobilePhone=='' ? '虚位以待' : v.mobilePhone}}<em v-if="v.top == userTop">(我)</em></div>
                    <div class="money" :class="[{active:v.collectedMoney > 0}]">{{v.collectedMoney == 0 ? '-' : v.collectedMoney}}</div>
                </div>
                <div class="list" v-if="tabIndex == 3" v-for="(v, i) in resData.list5">
                    <div class="name" :class="[{active:v.mobilePhone!=''}]">{{v.mobilePhone=='' ? '虚位以待' : v.mobilePhone}}<em v-if="v.top == userTop">(我)</em></div>
                    <div class="money" :class="[{active:v.collectedMoney > 0}]">{{v.collectedMoney == 0 ? '-' : v.collectedMoney}}</div>
                </div>
                <div class="list" v-if="tabIndex == 4" v-for="(v, i) in resData.list6">
                    <div class="name" :class="[{active:v.mobilePhone!=''}]">{{v.mobilePhone=='' ? '虚位以待' : v.mobilePhone}}<em v-if="v.top == userTop">(我)</em></div>
                    <div class="money" :class="[{active:v.collectedMoney > 0}]">{{v.collectedMoney == 0 ? '-' : v.collectedMoney}}</div>
                </div> -->

            </div>
        </div>
        <div class="foot"></div>
        <div class="rule" @click="popUp = 1"></div>
        <div class="share" @click="toShare"></div>
        <!-- 规则 -->
        <div class="ruleBox" v-if="popUp == 1">
            <div class="limit">
                <div class="center">
                    <p><em>1.</em>活动时间：2018年10月26日至12月5日；</p>
                    <p><em>2.</em>渠道用户首笔出借不计入排行榜单；</p>
                    <p><em>3.</em><i>待收增长本金=当前待收本金-初始待收本金；</i></p>
                    <p>(初始待收本金：以活动开始时(2018年10月26日0点)的待收本金为个人初始待收本金)；</p>
                    <p><em>4.</em>活动结束后，最终的待收增长本金达到相应榜单排名即可获得对应奖励，相同金额下，以最后一笔出借时间先后顺序排名；</p>
                    <p><em>5.</em><i>上榜条件：</i></br>第1-3名：<span>&nbsp;&nbsp;&nbsp;待收增长本金≥50万元</span></br>第4-10名：<span>&nbsp;待收增长本金≥30万元</span></br>第11-50名：<span>待收增长本金≥10万元</span></p>
                    <p><em>6.</em>现金奖励将在活动结束后5个工作日内发放至账户，可在<span>“我的-可用余额”</span>中查看，实物奖励将在活动结束后15个工作日内由理财顾问联系发放，届时请注意查收；</p>
                    <p><em>7.</em>本活动可与平台其它活动奖励叠加获得。</p>
                    <p class="copy">本活动在法律允许范围内最终解释权归E都市钱包所有，如有疑问可致电官方客服电话:<a href="tel:400-135-3388">400-135-3388</a></p>
                    <p class="IOS" v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
                </div>
            </div>
            <div class="close" @click.stop="popUp = 0"></div>
        </div>
        <!--点击分享的弹框-->
		<div :class="{layer:popUp == 2}" @click.stop="popUp = 0" v-if="popUp == 2"></div>
        <!--活动结束的弹框-->
		<div class="timeOver" v-if="popUp == 3">
            <div class="close" @click.stop="popUp = 0"></div>
        </div>
         <!-- 遮罩 -->
		<div v-if="popUp" class="zIndex" v-layer @click="popUp = 0"></div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    import { MessageBox } from 'mint-ui';
    export default{
        mixins:[ wxShare ],
        data() {
            return {
                loginStatus: 0, // 0未登录，1已登录
                popUp:0,   // 弹窗  1、规则弹框  2、分享引导图   3、活动结束弹框
                start: 3,    // 活动时间 1,2,3,活动中 5,活动未开始&活动已结束
                isGetClub: true,
                tabIndex: 0,
                tabList: [[6, 10, 3000],[11, 20, 1000],[21, 30, 500],[31, 40, 200],[41, 50, 100]],
                defaultMoney: '',
                isTopMoney: '',
                newMoney: '',
                userTop: '',
                resData: '',
                resCode:false,
                shareObj: { //分享标题内容配置
					title: "别人只想掏空你的钱包，而我·····", //标题
				    desc: "给你的钱包贴秋膘，11.11 E起边花边赚，狂欢一整月，你要的都给你，还不速来···", // 内容
					link: global.host + "doubleEleven/main", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/shareIcon.png" //图片链接
                },
                zIndex1: 2,
                zIndex2: 1,
                zIndex3: 0,
                zIndex4: 1,
                zIndex5: 2,
                XIndex1: 2,
                XIndex2: 1,
                XIndex3: 0,
                XIndex4: 1,
                XIndex5: 2,
            }
        },
        methods: {
            initData(){
                // 获取数据
                this.getNotlogData('/activity/november/getNovemberActivityList', (data) => {
                    if(data.resCode == 1){
                        this.defaultMoney = data.resData.defaultMoney;
                        this.isTopMoney = data.resData.isTopMoney;
                        this.loginStatus = data.resData.loginStatus;
                        this.newMoney = data.resData.newMoney;
                        this.userTop = data.resData.userTop;
                        this.resData = data.resData;
                        this.resCode = true;
                        this.start = data.resData.activityStage;
                         if(data.resData.activityStage == 5){
                            this.popUp = 3;
                        }
                        if(data.resData.userTop < 11){
                            this.tabIndex = 0;
                        } else if(data.resData.userTop > 10 && data.resData.userTop < 21){
                            this.tabIndex = 1;
                        } else if(data.resData.userTop > 20 && data.resData.userTop < 31){
                            this.tabIndex = 2;
                        } else if(data.resData.userTop > 30 && data.resData.userTop < 41){
                            this.tabIndex = 3;
                        } else if(data.resData.userTop > 40){
                            this.tabIndex = 4;
                        }
                    }
                }, {},1)
            },
            toShare(){    //分享事件
                if(this.start != 5){
                    if(this.loginStatus == 0){
                            this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    } else {
                        if(this.osType){
                            this.isLogPassValue(this.appShare);
                        } else {
                            this.popUp = 2;
                        }
                    }
                }else{
                    this.popUp = 3;
                }
            },

            toLogin(){   // 跳转到登录页面
                // if(this.start != 5){
                    if (this.osType) {
                        this.PassValue('LG')
                    }else{
                        this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });
                    }
                // }else{
                //     this.popUp = 3;
                // }
            },
            toMeeting(n){
                if(this.start == 1){
                    n == 1 ? this.appRouter('/doubleEleven/meetingOne') : '';
                    n == 1 ? window._czc.push(["_trackEvent", "双十一活动", "会场一按钮"]) : '';
                } else if (this.start == 2){
                    n == 1 ? this.appRouter('/doubleEleven/meetingTwo') : n == 2 ? this.appRouter('/doubleEleven/meetingOne') : '';
                    n == 1 ? window._czc.push(["_trackEvent", "双十一活动", "会场二按钮"]) : n == 2 ? window._czc.push(["_trackEvent", "双十一活动", "会场一按钮"]) : '';
                } else if (this.start == 3){
                    n == 1 ? this.appRouter('/doubleEleven/meetingThree') : n == 2 ? this.appRouter('/doubleEleven/meetingOne') : n == 3 ? this.appRouter('/doubleEleven/meetingTwo') : '';
                    n == 1 ? window._czc.push(["_trackEvent", "双十一活动", "会场三按钮"]) : n == 2 ? window._czc.push(["_trackEvent", "双十一活动", "会场一按钮"]) : n == 3 ? window._czc.push(["_trackEvent", "双十一活动", "会场二按钮"]) : '';
                } else if (this.start == 5){
                    n == 1 ? this.appRouter('/doubleEleven/meetingOne') : n == 2 ? this.appRouter('/doubleEleven/meetingTwo') : n == 3 ? this.appRouter('/doubleEleven/meetingThree') : '';
                    n == 1 ? window._czc.push(["_trackEvent", "双十一活动", "会场一按钮"]) : n == 2 ? window._czc.push(["_trackEvent", "双十一活动", "会场二按钮"]) : n == 3 ? window._czc.push(["_trackEvent", "双十一活动", "会场三按钮"]) : '';
                }
            },
        },
        created: function() {
            let that = this
            this.hasLogin ? this.loginStatus = 1 : this.loginStatus = 0;
            let CW = document.documentElement.clientWidth;
            let S = CW/375;  // 兼容不同的屏幕宽度
            //给app传值标题名
            this.PassValue('NavWhite_钱包满血计划');
            this.getWxShareData(this.shareObj); //分享调用
            this.initData();
            const script1 = document.createElement('script');
            script1.src = 'https://aliyunsso.edspay.com/web/js/jquery.js';
            script1.language = 'JavaScript';
            document.body.appendChild(script1);
            
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275126844&web_id=1275126844';
            script.language = 'JavaScript';
            document.body.appendChild(script);

            setTimeout(() => {
                $('#carousel').attr('data-le', S);
                const script = document.createElement('script');
                script.src = 'https://aliyunsso.edspay.com/web/js/carousel.js';
                script.language = 'JavaScript';
                script.async = 'async';
                document.body.appendChild(script);
            }, 300);
        },
        mounted: function() {
            setInterval(() => {
                this.zIndex1 = $("#item1").css('z-index');
                this.zIndex2 = $("#item2").css('z-index');
                this.zIndex3 = $("#item3").css('z-index');
                this.zIndex4 = $("#item4").css('z-index');
                this.zIndex5 = $("#item5").css('z-index');
            },800);
        },
        components: {

        },
        watch: {
            zIndex1(val){
                this.XIndex1 = val;
            },
            zIndex2(val){
                this.XIndex2 = val;
            },
            zIndex3(val){
                this.XIndex3 = val;
            },
            zIndex4(val){
                this.XIndex4 = val;
            },
            zIndex5(val){
                this.XIndex5 = val;
            },
            '$route' () {
				if(window._czc) { // 友盟数据统计监听
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
        }
   }
</script>

<style lang="scss" scoped>
    #main{
        .mainTop{
            width: 100%;
            height: 32.08rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/main.png) no-repeat;
            background-size: 100% 100%; 
            .head{
                width: 100%;
                height: 10.666667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/head.gif) no-repeat;
                background-size: 100% 100%;
            }
            .entrance{
                width: 9.106667rem;
                height: 4.893333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/toMeeting1.png) no-repeat;
                background-size: 100% 100%;
                position: relative;
                margin: .213333rem auto 0;
                .toLink{
                    width: 4.306667rem;
                    height: 2.066667rem;
                    position: absolute;
                    top: 2.4rem;
                    left: 2%;
                    .btn{
                        width: 1.666667rem;
                        height: .493333rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/toMeetingIcon.png) no-repeat;
                        background-size: 100% 100%;
                        position: absolute;
                        top: 1.626667rem;
                        left: 3rem;
                        animation:myBtn 2s infinite linear;
                        -moz-animation:myBtn 2s infinite linear;
                        -webkit-animation:myBtn 2s infinite linear;
                        -o-animation:myBtn 2s infinite linear;
                    }
                    @-webkit-keyframes myBtn {
                        0%{
                            -webkit-transform: scale(1);
                        }
                        50%{
                            -webkit-transform: scale(0.8);
                        }
                        100%{
                            -webkit-transform: scale(1);
                        }
                    }
                    @-moz-keyframes myBtn {
                        0%{
                            -moz-transform: scale(1);
                        }
                        50%{
                            -moz-transform: scale(0.8);
                        }
                        100%{
                            -moz-transform: scale(1);
                        }
                    }
                    @-o-keyframes myBtn {
                        0%{
                            -o-transform: scale(1);
                        }
                        50%{
                            -o-transform: scale(0.8);
                        }
                        100%{
                            -o-transform: scale(1);
                        }
                    }
                    @keyframes myBtn {
                        0%{
                            transform: scale(1);
                        }
                        50%{
                            transform: scale(0.8);
                        }
                        100%{
                            transform: scale(1);
                        }
                    }
                }
                .toLink.top{
                    width: 5.4rem;
                    height: 2.24rem;
                    left: 21%;
                    top: 0;
                }
                .toLink.R{
                    left: 52%;
                }
            }
            .entrance.time1{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/toMeeting2.png) no-repeat;
                background-size: 100% 100%;
            }
            .entrance.time2{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/toMeeting3.png) no-repeat;
                background-size: 100% 100%;
            }
            .entrance.time3{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/toMeeting4.png) no-repeat;
                background-size: 100% 100%;
            }
            .userTop{
                width: 7.786667rem;
                height: 3.093333rem;
                position: absolute;
                top: 19.293333rem;
                left: 1.12rem;
                .myUserTop{
                    height: .933333rem;
                    line-height: .933333rem;
                    text-align: center;
                    font-family: PingFang-SC-Bold;
                    font-size: .373333rem;
                    color: #FFFFFF;
                    margin-bottom: .013333rem;
                    em{
                        font-size: .373333rem;
                        color: #F8E0BD;
                    }
                }
                .center{
                    height: 2.133333rem;
                    .toLogin{
                        width: 2.52rem;
                        height: .706667rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/toLongin.png) no-repeat;
                        background-size: 100% 100%;
                        margin: .613333rem auto 0;
                    }
                    .info{
                        width: 100%;
                        height: 100%;
                        padding-top: .106667rem;
                        text-align: center;
                        .newMoney, .defaultMoney{
                            width: 50%;
                            float: left;
                            margin-bottom: .213333rem;
                            .money{
                                line-height: .48rem;
                                height: .48rem;
                                margin-bottom: .053333rem;
                                font-family: DIN-Bold;
                                font-size: .4rem;
                                color: #F0CA9B;
                            }
                            .describe{
                                line-height: .4rem;
                                height: .4rem;
                                font-family: PingFang-SC-Medium;
                                font-size: .293333rem;
                                color: #FFFFFF;
                            }
                        }
                        .isTopMoney{
                            width: 4.746667rem;
                            height: .706667rem;
                            border-radius: .36rem;
                            background: #7C5D57;
                            box-shadow: inset 0 .026667rem .08rem 0 #42241E;
                            font-family: PingFang-SC-Bold;
                            font-size: .32rem;
                            color: #FFFFFF;
                            line-height: .706667rem;
                            margin: 1.146667rem auto 0;

                            em{
                                font-family: DIN-Bold;
                                font-size: .4rem;
                                color: #FFBB63;
                            }
                        }
                    }
                }
            }   
        }
        .ranking{
            width: 100%;
            min-height: 6.133333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/line.png);
            background-size: 100% 100%;
            position: relative;
            text-align: center;
            .tab{
                
                width: 2.4rem;
                position: absolute;
                left: .573333rem;
                .tabList{
                    width: 100%;
                    height: 1.2rem;
                    font-family: PingFang-SC-Bold;
                    padding-top: .133333rem;
                    .No{
                        font-size: .373333rem;
                        color: #F8E0BD;
                        line-height: .533333rem;
                    }
                    .reward{
                        width: 1.8rem;
                        height: .4rem;
                        border-radius: .2rem;
                        background: #7B4842;
                        line-height: .4rem;
                        font-size: .293333rem;
                        color: #FFFFFF;
                        margin-left: .213333rem;
                        margin-bottom: .133333rem;
                    }
                    .line{
                        width: 1.92rem;
                        height: .026667rem;
                        background: #F8E0BD;
                        margin-left: .346667rem;
                    }
                }
                .tabList.active{
                    background: #FEF7E9;
                    border-radius: .106667rem 0 0 .106667rem;
                    .No{
                        color: #5F3732;
                    }
                } 
            }
            .tabCenter{
                width: 6.44rem;
                min-height: 5.866667rem;
                position: relative;
                left: 2.973333rem;
                background: #FEF7E9;
                border-radius: 0 .106667rem .106667rem .106667rem;
                padding-bottom: .533333rem;
                padding-top: .186667rem;
                .list{
                    width: 6.133333rem;
                    height: .666667rem;
                    border-radius: .333333rem;
                    margin: .186667rem auto;
                    line-height: .666667rem;
                    text-align: center;
                    .name, .money{
                        width: 50%;
                        float: left;
                        font-family: PingFang-SC-Regular;
                        font-size: .346667rem;
                        color: #61331A;
                    }
                    .name.active{
                        font-family: DIN-Medium;
                    }
                    .money.active{
                        font-family: DIN-Medium;
                        color: #EA3F1B;
                    }
                }
                .list:nth-child(2n){
                    background: #FDFBF4;
                    margin: 0 auto;
                }
            }
        }
        .foot{
            width: 100%;
            height: 2.08rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/foot.png);
            background-size: 100% 100%;
        }
        .rule{
            width: 1.066667rem;
            height: .933333rem;
            position: absolute;
            left: 7.733333rem;
            top: 29.733333rem;
            z-index: 999;
        }
        .share{
            width: 1.426667rem;
            height: 1.346667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/shareBtn.png);
            background-size: 100% 100%;
            position: fixed;
            right: 0;
            top: 11.466667rem;
        }
        .layer {
            width: 10rem;
            height: 4.88rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/shareBg.png) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
        }
        .ruleBox{
            width: 10rem;
            height: 11.226667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/homeRule.png) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .limit{
                width: 6.826667rem;
                height: 7.733333rem;
                margin-left: 1.586667rem;
                margin-top: 1.6rem;
                border-radius: .146667rem;
                background: #FFFFFF;
                box-shadow: inset 0 1px 10px 0 #CB9C4D;
                overflow: hidden;
                overflow-y: auto;
                .center{
                    width: 6.826667rem;
                    height: 13.5rem;
                    border-radius: .146667rem;
                    font-family: PingFangSC-Regular;
                    padding: .48rem .226667rem;
                    text-align: justify;
                    p{
                        font-size: .32rem;
                        color: #666666;
                        line-height: .506667rem;
                        margin-bottom:.186667rem;
                        em{
                            font-family: DIN-Medium;
                            color: #8A4B29;
                        }
                        i{
                          font-family: PingFang-SC-Bold;  
                          color: #8A4B29;
                        }
                        span{
                            font-family: PingFang-SC-Bold;
                            color: #EB3C18;
                        }
                        a{
                            color: #3A8BFF;
                        }
                    }
                    p.copy{
                        padding: 0 .133333rem;
                    }
                    p.IOS{
                        font-size: .293333rem;
                        color: #999999;
                        text-align: center;
                    }
                }
            }
            .close{
                position: absolute;
                bottom: 0rem;
                width: 1rem;
                height: 1rem;
                left: 50%;
                margin-left: -.5rem;
            }
        }
        .timeOver{
            width: 8.106667rem;
            height: 4.946667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/homeOver.png) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .close{
                position: absolute;
                bottom: 0.3rem;
                width: 3rem;
                height: 1.3rem;
                left: 30%;;
            }
        }
        .zIndex{
            z-index: 99!important;
        }
        // 3D轮播开始
        .poster-main{
            position: relative;
            margin: 0 auto;
            top: 9.75rem;
            .poster-list {
                width: 3.546667rem; 
                height: 2.04rem;
                .poster-item{
                    position: absolute;
                    left: 0;
                    top: 0;
                    .data{
                        width: 100%;
                        height: 1.066667rem;
                        margin-top: 2.5rem;
                        p{
                            font-family: DIN-Regular;
                            font-size: .266667rem;
                            color: #422212;
                            width: 100%;
                            padding-left: .48rem;
                            height: .4rem;

                        }
                        p.money{
                            font-family: DIN-Bold;
                            color: #EB3C18;
                        }
                    }
                    .data.A0, .data.B0, .data.C0, .data.D0, .data.E0{
                        width: 100%;
                        height: 1.066667rem;
                        margin-top: 1.45rem;
                        transform:scale(0.75);
                        p{
                            padding-left: 0rem;
                            letter-spacing: -0.02rem;
                        }
                    }
                    
                    .data.A1, .data.B1, .data.C1, .data.D1, .data.E1{
                        width: 100%;
                        height: 1.066667rem;
                        margin-top: 1.9rem;
                        transform:scale(0.8);
                        p{
                            padding-left: 0.2rem;
                            letter-spacing: -0.01rem;
                        }
                    }
                    .data.A2, .data.B2, .data.C2, .data.D2, .data.E2{
                        width: 100%;
                        height: 1.066667rem;
                        margin-top: 2.5rem;
                        transform: scale(1);
                        p{
                            padding-left: .48rem;
                            letter-spacing: 0rem;
                        }
                    }

                }
                .poster-item:nth-child(1){ 
                    z-index: 0;
                    width: 2.68rem; 
                    height: 3.186667rem; 
                    left: 4.706667rem; 
                    top: 0;
                }
                .poster-item:nth-child(2){
                    z-index: 0; 
                    width: 2.68rem; 
                    height: 3.186667rem; 
                    left: 0; 
                    top: .533334rem;
                }
                .poster-item:nth-child(3){
                    z-index: 1; 
                    width: 2.986667rem; 
                    height: 3.013333rem; 
                    left: .773333rem;
                    top: .266667rem;
                }
                .poster-item:nth-child(4){
                    z-index: 2; 
                    width: 3.333333rem; 
                    height: 4.08rem; 
                    left: 1.866667rem; 
                    top: 0;
                }
                .poster-item:nth-child(5){
                    z-index: 1; 
                    width: 2.986667rem; 
                    height: 3.013333rem; 
                    left: .773333rem; 
                    top: .266667rem;
                }
            }
            .poster-btn{
				position: absolute;
				top: 0;
				cursor: pointer;
            }
            .poster-prev-btn{
				left: -0.6rem;
            }
            .poster-next-btn{
				right: -0.6rem;
			}
        }
        // 3D轮播结束
    }
</style>
