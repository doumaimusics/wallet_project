<template>
    <div id="Carnival">
        <div v-title>518 财富嘉年华</div>
        <!-- 主图背景 -->
        <div class="carnivalBg"> 
            <!-- 中间部分的气泡动画 -->
            <div class="animatedBox">
                <div v-for="v in 6" class="animated" :class="'bubble'+v" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/prize'+v+'.png) center center / 100% 100%'}"></div>
            </div>
            <!-- 文字轮播 -->
            <div class="swiper" v-if="data.headList">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="item in data.headList"><p>用户{{item.mobilePhone}}获得：{{item.redPacket}}元净值红包</p></swiper-slide>
                </swiper>
            </div>
            <!-- 活动规则按钮 -->
            <div class="ruleBtn" @click.stop="rule = true"></div>
            <!-- 未登录 -->
            <div class="notLogin" v-if="!login" @click.stop="toLogin"></div>
            <!-- 已登陆 -->
            <div class="login" v-else>{{data.moneyDay ? data.moneyDay : 0}}元</div>
            <!-- 我的排行 -->
            <div class="myRanking" v-if="login">
                <p>我的累计净出借：{{data.moneySum ? data.moneySum : 0}}元</p>
                <p v-if="!data.userTop">我的排行榜名次：您尚未进入50名排行榜单</p>
                <p v-else>我的排行榜名次：第{{data.userTop}}名</p>
            </div>
            <!-- 活动排行榜奖励 -->
            <div class="scrooll">
                <div class="activityRanking" :class="{active:login}">
                    <div class="activityRankingBg">
                        <ul>
                            <li v-for="(v ,index) in dataList">
                                <div v-if="v.mobilePhone">
                                    <p class="fl"> <span v-if="index > 2" class="bold">{{v.top}}</span><span>{{v.mobilePhone}}</span></p><p class="fr"> <span v-if="index > 2">累计净出借：</span> <span class="font" v-else></span><span>{{v.netLending}}元</span></p>
                                </div>
                                <div v-else>
                                    <span v-if="index > 2" class="bold">{{v.top}}</span>
                                    <span v-if="index > 2">虚位以待</span>
                                    <span class="icon" :class="'icon'+(index+1)" v-else></span>
                                </div>
                                <div class="icon1 fl rankingPic" v-if="index == 4" ></div>
                                <div class="icon2 fl rankingPic" v-if="index == 9" ></div>
                                <div class="icon3 fl rankingPic" v-if="index == 19" ></div>
                                <div class="icon4 fl rankingPic" v-if="index == 29" ></div>
                                <div class="icon5 fl rankingPic" v-if="index == 39" ></div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- 活动规则 -->
            <div v-if="rule" class="rule" v-layer>
                <div class="textBox">
                    <div class="text">
                        <table border=1 frame=void rules=none>
                            <tr>
                                <td>1.</td>
                                <td>活动时间:{{time.startTime}}至{{time.endTime}}</td>
                            </tr>
                            <tr>
                                <td>2.</td>
                                <td>新用户首笔出借不计入本活动，仅限E计划30天及以上项目参与，新手专享项目不参与；</td>
                            </tr>
                            <tr>
                                <td>3.</td>
                                <td><em>当日净出借=当日出借额-当日提现额</em> </br>根据用户当日净出借额不同获得不同档奖励，限获得一档奖励，当日净出借额每日0点清零；</td>
                            </tr>
                            <tr>
                                <td>4.</td>
                                <td>截止当日23:59:59计算累计净出借额并于次日发放净值红包，限E计划-30天及以上项目满500元可用，有效期30天；</td>
                            </tr>
                            <tr>
                                <td>5.</td>
                                <td><em>榜单说明:</em></br>前三名需累计净出借额满50万及以上方可进入排行榜;</br>前十名需累计净出借额满20万及以上方可进入排行榜;</br>前五十名需累计净出借额满10万及以上方可进入排行榜;</td>
                            </tr>
                            <tr>
                                <td>6.</td>
                                <td>活动期间用户累计净出借金额满足门槛将进入排行，赢上榜大奖，排行榜实时更新；</td>
                            </tr>
                            <tr>
                                <td>7.</td>
                                <td>排序规则：相同金额下，以最后一笔出借时间先后顺序排名；</td>
                            </tr>
                            <tr>
                                <td>8.</td>
                                <td>实物奖励将在活动结束后15个工作日内由理财顾问联系发放，届时请注意查收；</td>
                            </tr>
                            <tr>
                                <td>9.</td>
                                <td>活动期间净出借金额取整；</td>
                            </tr>
                            <tr>
                                <td>10.</td>
                                <td>本活动在法律允许范围内最终解释权归E都市钱包所有，如有疑问，详情请咨询官方客服电话：<a href="tel:400-135-3388" style="color: -webkit-link;">400-135-3388</a></td>
                            </tr>
                        </table>
                        <p class="tips">本活动奖品与苹果公司无关!</p>
                    </div>
                </div>
                <div class="closeBtn" @click.stop="rule = false"></div>
            </div>
            <!-- 排行榜奖励按钮 -->
            <router-link class="rankingLink" to="/ranking"></router-link>
            <!-- 去投资列表按钮 -->
            <div class="goInvest" @click="goInvest"></div>
            <!-- 昨日现金券奖励发放 -->
            <div v-if="isShowAlert" v-layer class="isShowAlert">
                <div class="center">
                    <p>昨日获得 <em>{{data.upDescribe}}元净值红包</em> 已发放</p>
                    <p>请在 （我的-我的红包） 中查看！</p>
                    <div class="close" @click.stop="isShowAlert = false"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';   // 与app交互
    import { MessageBox } from 'mint-ui';
    export default {
        mixins: [wxToapp],
        data() {
            return {
                dataList:[],
                time:{},                 // 活动时间
                start:1,                 // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                login:false,             // 用户是否登录
                isShowAlert:false,       // 当日是否显示昨日现金券奖励弹框 false:当日显示过了
                rule:false,              // 活动规则
                data:{},                 // 后台返回数据
                swiperOption: {          // 文字轮播
                    autoplay: 2000,      // 可选选项，自动滑动
                    direction : 'vertical',
                    autoplayDisableOnInteraction : false,    // 手指滑动以后轮播不会停止
                    loop : true,
                }   
            }
        },
        methods: {
            getData(){
                this.$route.query.token || this.getCookie('userToken')? this.login = true : this.login = false;
                // 活动时间请求
                this.notLogPost('/activity/treasureTreasure/getActivityDate', (data) => {
                    if (data.resCode) {
                        this.start = data.resData.active
                        this.time = data.resData
                        this.start == 1 ? '' : MessageBox('温馨提示', '亲！该活动已过期，请参与平台其他活动！');
                    }
                }, (this.osType ? {oauthToken:this.token}:{token:this.getCookie('userToken')}), 1)
                // 排行榜请求
                this.notLogPost('/activity/treasureTreasure/getList', (data) => {
                    if (data.resCode) {
                        this.data = data.resData
                        this.dataList = data.resData.topList
                        let str = this.dataList.splice(1,1);
                        this.dataList.unshift(str[0]);
                        console.log(data.isPopUp)
                        data.resData.isPopUp ? this.showAlert() : this.isShowAlert = false;   
                        //     this.swiper.startAutoplay();  事件播放轮播
                    }
                }, (this.osType ? {oauthToken:this.token}:{token:this.getCookie('userToken')}), 1)
            },
            // 判断是否显示昨日现金券奖励弹框
			showAlert(){
				if(this.getCookie('prize') == null) {
                    var date = new Date().getTime();	
                    var today = new Date().setHours(0, 0, 0, 0)+86400000-date //当前时间到当日24点的差值毫秒数
                    this.isShowAlert = true;
                    this.setCookie('prize',true, today)
				} else {
					this.isShowAlert = false;
				}
            },
            goInvest(){     // 跳转到理财列表
				this.toApp('WIP',{path:'/wxInvest'});
			},
            toLogin(){   // 跳转到登录页面
                if(this.start == 1){
                    if (this.osType) {
                        this.PassValue('LG')
                    }else{
                        this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });
                    }
                }else{
                    MessageBox('温馨提示', '亲！该活动已过期，请参与平台其他活动！');
                } 
            }
        },
        created: function() {
            this.getData()
        },
        // computed: {      // 定义这个sweiper对象  
        //     swiper() {  
        //       return this.$refs.mySwiper.swiper;  
        //     }  
        // }, 
        mounted: function() {
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1273668065&web_id=1273668065'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        watch: {
            '$route'() {
                if (window._czc) {
                    let location = window.location
                    let contentUrl = location.pathname + location.hash
                    let refererUrl = '/'
                    window._czc.push(['_trackPageview', contentUrl, refererUrl])
                }
			},
            'rule'(val) {
				if (val) {
					document.body.setAttribute("class","bodychannel");
				} else {
					document.body.removeAttribute("class","bodychannel");
				}
			}
        }
   }
</script>

<style lang="scss" scoped>
    #Carnival{
        .carnivalBg{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/518Carnival.png) no-repeat top left / 10rem 43.333333rem;
            width: 10rem;
            height: 43.333333rem;
            .swiper{
                font-family: DIN-Light;
                font-size: .32rem;
                position: absolute;
                top: 17.1rem;
                left: 0;
                width: 100%;
                height: .666667rem;
                line-height: .666667rem;
                color:#fff;
                text-align: center;
                .swiper-container{
                    height: .666667rem;
                }
            }
            .notLogin{
                position: absolute;
                top: 13rem;
                left: 50%;
                margin-left: -1.333333rem;
                width: 2.666667rem;
                height: .853333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/loginBtn.png) no-repeat top left / 2.666667rem 0.853333rem;
                border-radius: .106667rem;
            }
            .goInvest{
                position: fixed;
                z-index:99;
                bottom: 0;
                width: 100%;
                height: 1.2rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/toInvestBtn.png) no-repeat top left / 100% 100%;
            }
            .login{
                position: relative;
                top: 13rem;
                width: 100%;
                height: .746667rem;
                text-align: center;
                font-family: DIN-Medium;
                font-size: .533333rem;
                color: #00C1D1;
                letter-spacing: -1px;
            }
            .rule{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/rule.png) no-repeat center center / 8.426667rem 9.866667rem;
                .textBox{
                    position: absolute;
                    width: 7.2rem;
                    height: 7.95rem;
                    top: 50%;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    margin-top: -3.65rem;
                    border-radius: 8px;
                    overflow: hidden;
                    .text{
                        width: 7.4rem;
                        height: 100%;
                        overflow-y: auto;
                        overflow-x: hidden;
                        padding: .2rem;
                        table{
                            width: 6.8rem;
                            tr{
                                font-size: .346667rem;
                                margin-bottom: .15rem;
                                display: block;
                                td{
                                    font-family: PingFangSC-Regular;
                                    vertical-align: top;
                                    color: #666;
                                    text-align: justify;
                                    line-height: .54rem;
                                    em{
                                        font-family: DIN-Medium;
                                        font-weight: 600;
                                        color: #000;
                                    }
                                }
                                td:nth-child(1){
                                    font-family: DINAlternate-Bold;
                                    color: #442A7A;
                                    line-height: .57rem;
                                    width:.4rem;
                                }
                                td:nth-child(2){
                                    opacity: 0.8;
                                }
                            }
                        }
                        p.tips{
                            width: 100%;
                            font-family: PingFangSC-Regular;
                            vertical-align: top;
                            color: #666;
                            text-align: center;
                            line-height: .54rem;
                            font-size: .346667rem;
                            margin-top: .05rem;
                            margin-bottom: .1rem;
                        }
                    }
                }
            }
            .animatedBox{
                width: 100%;
                height: 2.666667rem;
                position: absolute;
                top: 25rem;
                .animated{ 
                    border-radius: 50%;
                    position:absolute;
                }
                .animated.bubble1{
                    left: 1.093333rem;
                    top: .533333rem;
                    width: 1.293333rem;
                    height: 1.293333rem;
                    animation:myfirst1 4s infinite;
                    -moz-animation:myfirst1 4s infinite;
                    -webkit-animation:myfirst1 4s infinite;
                    -o-animation:myfirst1 4s infinite;
                }
                .animated.bubble2{
                    left: 2.533333rem;
                    top: .693333rem;
                    width: .653333rem;
                    height: .653333rem;
                    animation:myfirst 4s infinite;
                    -moz-animation:myfirst 4s infinite;
                    -webkit-animation:myfirst 4s infinite;
                    -o-animation:myfirst 4s infinite;
                }
                .animated.bubble3{
                    left: 2.986667rem;
                    top: 1.333333rem;
                    width: .786667rem;
                    height: .786667rem;
                    animation:myfirst1 4s infinite;
                    -moz-animation:myfirst1 4s infinite;
                    -webkit-animation:myfirst1 4s infinite;
                    -o-animation:myfirst1 4s infinite;
                }
                .animated.bubble4{
                    width: 2.146667rem; 
                    height: 2.146667rem; 
                    left: 4.24rem;
                    top: .3rem;
                    animation:myfirst 4s infinite;
                    -moz-animation:myfirst 4s infinite;
                    -webkit-animation:myfirst 4s infinite;
                    -o-animation:myfirst 4s infinite;
                }
                .animated.bubble5{
                    width: 1.293333rem; 
                    height: 1.293333rem; 
                    left: 6.693333rem;
                    top: .3rem;
                    animation:myfirst1 4s infinite;
                    -moz-animation:myfirst1 4s infinite;
                    -webkit-animation:myfirst1 4s infinite;
                    -o-animation:myfirst1 4s infinite;
                }
                .animated.bubble6{
                    width: 1.04rem; 
                    height: 1.04rem; 
                    left: 8.466667rem;
                    top: .826667rem;
                    animation:myfirst 4s infinite;
                    -moz-animation:myfirst 4s infinite;
                    -webkit-animation:myfirst 4s infinite;
                    -o-animation:myfirst 4s infinite;
                }
            }
            .ruleBtn{
                position: fixed;
                top: 4.466667rem;
                right: 0;
                width: .666667rem;
                height: 1.88rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/ruleBtn.png) no-repeat top left / .666667rem 1.88rem;
            }
            .isShowAlert{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/yesterday.png) no-repeat center center / 8.426667rem 5.466667rem;
                .center{
                    width: 8rem;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-left: -4rem;
                    margin-top: -1.55rem;
                    p{
                        width: 100%;
                        font-family: PingFang-SC-Regular;
                        font-size: .346667rem;
                        color: #000000;
                        text-align: center;
                        letter-spacing: 1.04px;
                        margin-bottom: .266667rem;
                        em{
                            color: #FF3030;
                        }
                    }
                    .close{
                        width: 2.7rem;
                        height: .9rem;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-left: -1.35rem;
                        margin-top: 1.3rem;
                    }
                }
            }
            .closeBtn{
                position: absolute;
                top: 50%;
                left: 50%;
                margin-left: -.346667rem;
                margin-top: 5.3rem;
                width: .693333rem;
                height: .693333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/closeBtn.png) no-repeat top left / 100% 100%;
                z-index: 99;
            }
            .myRanking{
                position: absolute;
                top: 29.05rem;
                width: 7.5rem;
                height: .986667rem;
                left: 50%;
                margin-left: -3.75rem;
                opacity: 0.64;
                p{
                    font-family: DIN-Light;
                    font-size: .346667rem;
                    color: #FFFFFF;
                    letter-spacing: .026rem;
                }
            }
            .rankingLink{
                position: absolute;
                top: 27.3rem;
                right: .88rem;
                width: 2.2rem;
                height: .8rem;
                z-index: 999;
            }
            .scrooll{
                width: 8.266667rem;
                overflow: hidden;
                position: absolute;
                top: 29.5rem;
                height: 11.6rem;
                left: 50%;
                margin-left: -4.1333335rem;
                border-radius: .106667rem;
                .activityRanking{
                    position: absolute;
                    top: 0;
                    width: 8.466667rem;
                    height: 11.6rem;
                    left: 0;
                    overflow-y: auto;
                    overflow-x: hidden;
                    .activityRankingBg{
                        width: 8.266667rem;
                        overflow: hidden;
                        // padding-bottom: .3rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/rankingTop.png) no-repeat top left / 8.266667rem 56.7rem;
                        padding-top: 2.133333rem;
                        li{
                            float: left;
                            width: 100%;
                            height: .8rem;
                            line-height: .8rem;
                            padding: 0 0 0 .466667rem;
                            overflow: hidden;
                            p:nth-child(2){
                                width: 4.066667rem;
                            }
                            span{
                                font-family: PingFangSC-Regular;
                                font-size: .32rem;
                                color: #333333;
                            }
                            span.bold{
                                display: inline-block;
                                width: .56rem;
                                font-family: DIN-Bold;
                                color: #433282;
                            }
                            span.font{
                                width: 1.466667rem;
                                height: .333333rem;
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/font.png) no-repeat top left / 100% 100%;
                            }
                            div.rankingPic{
                                width: 8.266667rem;
                                height: 2.4rem;
                                margin-left: -.466667rem;
                            }
                            div.icon1{
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/rankingIcon.png) no-repeat 0 -6.586667rem / 100% 18.586667rem;
                            }
                            div.icon2{
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/rankingIcon.png) no-repeat 0 -8.986667rem / 100% 18.586667rem;
                            }
                            div.icon3{
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/rankingIcon.png) no-repeat 0 -11.386667rem / 100% 18.586667rem;
                            }
                            div.icon4{
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/rankingIcon.png) no-repeat 0 -13.786667rem / 100% 18.586667rem;
                            }
                            div.icon5{
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/rankingIcon.png) no-repeat 0 -16.186667rem / 100% 18.586667rem;
                            }
                        }
                        li:nth-child(2n){
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/listBg.png) no-repeat 0 0 / 100% 0.8rem;
                        }
                        li:nth-child(1),li:nth-child(2),li:nth-child(3){
                            background: none;
                            width: 2.74rem;
                            height: 2.173333rem;
                            padding: .7rem 0 0 .65rem;
                            margin-bottom: 2.5rem;
                            span{
                                color:#fff;
                                line-height: .453333rem;
                            }
                            p{
                                height: .44rem;
                                line-height: .44px;
                            }
                            p:nth-child(2){
                                width: 100%;
                                height: .866667rem;
                                span{
                                    display: inline-block;
                                }
                                span:nth-child(2){
                                    font-size: .373333rem;
                                    line-height: .533333rem;
                                }
                            }
                            p:nth-child(1){
                                margin-bottom: .066667rem;
                            }
                        }
                        li:nth-child(1),li:nth-child(3){

                            span.icon{
                                width: 2rem;
                                height: 1.386667rem;
                                margin-left: -.1rem;
                                display: block;
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/icon2.png) no-repeat top left / 100% 100%;
                            }
                        }
                        li:nth-child(2){
                            padding: 0.15rem 0 0 .38rem;
                            p:nth-child(1){
                                padding-left: .22rem;
                                margin-bottom: .3rem;
                            }
                            span.icon{
                                width: 2rem;
                                height: 2rem;
                                display: block;
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/518Carnival/icon1.png) no-repeat top left / 100% 100%;
                            }
                        }
                        li:nth-child(3){
                            padding: .7rem 0 0 .6rem;
                        }
                        li:nth-child(5),li:nth-child(10),li:nth-child(20),li:nth-child(30),li:nth-child(40){
                            height: 3.2rem;
                        }
                    } 
                }
                .activityRanking.active{
                    top: .6rem;
                    height: 11rem;
                }
            }
        }
        @keyframes  myfirst{        
            0%   {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            50% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
        }
        @-o-keyframes myfirst{ 
            0%   {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            50% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
        }
        @-moz-keyframes myfirst{
            0%   {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            50% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
        }
        @-webkit-keyframes myfirst{
            0%   {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            50% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
        }
        @-ms-keyframes myfirst{
            0%   {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            50% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            100% {
                opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
        }
        @keyframes  myfirst1{        
            0%   {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            50% {
                 opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            100% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
        }
        @-o-keyframes myfirst1{ 
           0%   {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            50% {
                 opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            100% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
        }
        @-moz-keyframes myfirst1{
            0%   {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            50% {
                 opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            100% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
        }
        @-webkit-keyframes myfirst1{
            0%   {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            50% {
                 opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            100% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
        }
        @-ms-keyframes myfirst1{
            0%   {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
            50% {
                 opacity: 1;
                transform: scale(1,1);
                -ms-transform: scale(1,1);
                -o-transform: scale(1,1);
                -webkit-transform: scale(1,1);
                -moz-transform: scale(1,1);
            }
            100% {
                opacity: 0.3;
                transform: scale(0.8,0.8);
                -ms-transform: scale(0.8,0.8);
                -o-transform: scale(0.8,0.8);
                -webkit-transform: scale(0.8,0.8);
                -moz-transform: scale(0.8,0.8);
            }
        }
    }
</style>
<style>
    html,body{
        height: 100%;
    }
	body.bodychannel {
		overflow: hidden;
	}
</style>