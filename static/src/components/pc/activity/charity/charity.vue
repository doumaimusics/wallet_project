<template>
   <div id="charity">
       <div class="swiperBanner">
            <mt-swipe :auto="3000" :showIndicators="true">
                <mt-swipe-item v-for="item in bannerList">
                    <img :src="item">
                </mt-swipe-item>
            </mt-swipe>
       </div>
       <!-- 倒计时 -->
       <div class="time">
           <span>距离募集结束时间剩余 <em>{{data}}</em></span>
       </div>

       <!-- 显示信息框 -->
       <div class="lovebox">
           <div class="sum">{{sum}} <em>颗</em></div>
            <!-- 已登录 -->
            <div class="login today" v-if="login">
                <div class="iconLeft fl"><p>我的累计捐献</p> <p class="num">{{userSum}} <em>颗</em></p></div>
               <div class="iconRight fl"></div>
            </div>
            <!-- 未登录 -->
           <div class="today" v-else>
               <div class="iconLeft fl"><p>今日获得爱心</p> <p class="num">{{toDaySum}} <em>颗</em></p></div>
               <div class="iconRight fl"><p>今日捐献人数</p><p class="num">{{toDaySumUser}} <em>人</em></p></div>
           </div>
       </div>

       <div class="swiper">
            <swiper :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="item in list"><p class="fl mr-22">{{item.mobilePhone}}捐献{{item.loveNumber}}颗爱心</p><p class="fl">{{item.addTime}}</p></swiper-slide>
            </swiper>
       </div>

       <div class="link">
           <a href="http://gongyi.qq.com/succor/detail.htm?id=415" target="_blank"></a>
        </div>

        <div class="btnLeft" @click="btn(1)"></div>
        <div class="btnRight" @click="btn(2)"></div>
        <div class="tc" v-layer v-if="charityOver">
            <div class="img"> 
                <div class="close" @click.stop="charityOver = false"></div>
                <div class="btnClose" @click.stop="charityOver = false"></div>
            </div>
        </div>
        <div class="erweima tc" v-layer v-if="erweima">
            <div class="img">
                <div class="close" @click.stop="erweima = false"></div>
            </div>
        </div>
   </div>
</template>

<script>
    export default {
        data() {
            return {
                erweima:false,           // 引导下载APP二维码
                charityOver:false,       // 活动结束框
                start:1,                 // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                data:'',                 // 倒计时	
                login:false,             // 用户是否登录
                showLayer:false,         // 微信端邀请遮罩
                sum:'',                  // 累计爱心数量
                toDaySum: '',            // 今日捐献爱心
                toDaySumUser: '',        // 今日参与人次
                userSum: '',             // 我的累计捐献
                mobilePhoneToUser:'',    // 好友手机号
                inviteUserSum:'',        // 好友捐献爱心数量
                list:[],                 // 文字轮播列表
                swiperOption: {
                    pagination: '.swiper-pagination',
                    autoplay: 2000,//可选选项，自动滑动
                    direction : 'vertical',
                    loop : true,
                },
                bannerList: [
                    'https://aliyunsso.edspay.com/web/activity/charity/banner1.png',
                    'https://aliyunsso.edspay.com/web/activity/charity/banner2.png',
                    'https://aliyunsso.edspay.com/web/activity/charity/banner3.png',
                    'https://aliyunsso.edspay.com/web/activity/charity/banner4.png',
                    'https://aliyunsso.edspay.com/web/activity/charity/banner5.png'
                ]
            }
        },
        methods: {
            initdata(){
                this.getCookie('token')? this.login = true : this.login = false;
                global.http.investPost(this, "/activity/loveMeaningful/judgeToActivityDate", {}, data => {
                    if (data.data.resCode == 1) {
                        this.start = data.data.resData.active
                        this.data = data.data.resData.date
                    }
                })
                global.http.investPost(this, "/activity/loveMeaningful/loveMeaningfulToList", {}, data => {
                    if (data.data.resCode == 1) {
                        this.sum = data.data.resData.sum
                        this.toDaySum = data.data.resData.toDaySum
                        this.toDaySumUser = data.data.resData.toDaySumUser
                        this.userSum = data.data.resData.userSum
                        this.inviteUserSum = data.data.resData.inviteUserSum
                        this.mobilePhoneToUser = data.data.resData.mobilePhoneToUser
                        this.list = data.data.resData.list
                    }
                })
            },
            btn(n){
                if(this.start == 1){
                    n==1?this.erweima = true:this.$router.push('/invest')
                } else if(this.start == 3){
                    this.charityOver = true   // 活动结束
                }
            }
        },
        created: function() {

        },
        mounted: function() {
            this.initdata()
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #charity{
        position: relative;
        top: 30px;
        width: 1200px;
        height: 2120px;
        margin: 0 auto;
        margin-bottom: 40px;
        background: url(https://aliyunsso.edspay.com/web/activity/charity/bgPc.png) no-repeat top center;
        background-size:100% 2090px;
        .mr-22{
            margin-right: 22px;
        }
        .swiperBanner{
            width: 750px;
            height: 430px;
            position: absolute;
            top:176px;
            left: 50%;
            margin-left: -375px;
            z-index: -1;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .time{
            position: absolute;
            top:200px;
            left: 694px;
            span{
                opacity: 0.9;
                font-family: PingFang-SC-Regular;
                font-size: 14px;
                color: #FFFFFF;
                em{
                    font-family: DIN-Medium;
                    margin-left: 10px;
                }
            }
        }
        .lovebox{
            width: 890px;
            height: 290px;
            position: absolute;
            top: 743px;
            left:155px;
            padding-top: 63px;
            .sum{
                width: 100%;
                font-family: DIN-medium;
                font-size: 60px;
                color: #EA4241;
                text-align: center;
                margin-bottom: 10px;
                em{
                    font-family: PingFang-SC-Medium;
                    font-size: 26px;
                    color: #333333;
                }
            }
            .today{
                width: 100%;
                height: 144px;
                .iconLeft,.iconRight{
                    height: 100%;
                    width: 50%;
                    p{
                        padding:26px 0 0 42px;
                        font-family: PingFang-SC-Medium;
                        font-size: 24px;
                        color: #333333;
                        text-align: center;
                    }
                    p.num{
                        padding:14px 0 0 16px;
                        font-family: DIN-Medium;
                        font-size: 40px;
                        color: #333333;
                        em{
                            ont-family: PingFang-SC-Regular;
                            font-size: 26px;
                            color: #333333;
                        }
                    }
                }
                .iconLeft{
                    background:url(https://aliyunsso.edspay.com/web/activity/charity/iconLeftPc.png);
                    background-size:100% 100%;

                }
                .iconRight{
                    background:url(https://aliyunsso.edspay.com/web/activity/charity/iconRightPc.png);
                    background-size:100% 100%;
                }
            }
            .today.login{
                .iconRight{
                    background:url(https://aliyunsso.edspay.com/web/activity/charity/iconPc.png);
                    background-size:100% 100%;
                }
            }
        }
        .link{
            width: 145px;
            height:50px;
            position: absolute;
            top:1765px;
            left:185px;
            z-index: 5;
            cursor: pointer;
            a{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .swiper{
            position: absolute;
            top: 1035px;
            left:258px;
            width: 500px;
            height: 50px;
            line-height: 60px;
            font-family: PingFang-SC-Medium;
            font-size: 16px;
            opacity: 0.9;
            color: #FFFFFF;
            .swiper-container{
                height: 50px;
                
            }
        }
        .btnLeft,.btnRight{
            position: absolute;
            bottom: 115px;
            width: 370px;
            height: 74px;
            cursor: pointer;
        }
        .btnLeft{
            left: 160px;
        }
        .btnRight{
            right: 160px;
        }
        .tc{
            background-color: rgba(0, 0, 0, 0.6) !important;
            .img{
                width: 400px;
                height: 220px;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background: url(https://aliyunsso.edspay.com/web/activity/charity/timeOver.png);
                .close{
                    position: absolute;
                    top: 15px;
                    width: 25px;
                    height: 25px;
                    right: 15px;
                    cursor: pointer;
                }
                .btnClose{
                    cursor: pointer;
                    position: absolute;
                    top: 144px;
                    width: 191px;
                    height: 46px;
                    left: 105px;
                }
            }
        }
        .tc.erweima{
            .img{
                background: url(https://aliyunsso.edspay.com/web/activity/charity/app.png);
            }
        }
    }
</style>
<style lang="scss">
    #charity{
        .mint-swipe-indicators{
            line-height: 75px;
            bottom: 0;
        }
        .mint-swipe-indicator{
            opacity: 0.8;
            background: #FFFFFF;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            margin: 0 5px;
        }
        .mint-swipe-indicator.is-active{
            background: #EA4241;
            width: 14px;
            height: 8px;
            border-radius: 4px;
            opacity: 1;
        }
    }
</style>
