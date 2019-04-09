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
           <span>距离募集结束时间剩余</span>
           <p>{{data}}</p>
       </div>
       <!-- 显示信息框 -->
       <div class="lovebox">
           <div class="sum">{{sum}} <em>颗</em></div>
            <!-- 已登录 -->
            <div class="login today" v-if="login">
                <div class="iconLeft fl"><p>我的累计捐献</p> <p class="num">{{userSum}} <em>颗</em></p></div>
               <div class="iconRight fl"></div>
            </div>
            <!-- 邀请 -->
           <div class="invite" v-else-if="mobilePhoneToUser">您的好友{{mobilePhoneToUser}}已累计捐献 <em>{{inviteUserSum}}</em> 颗</div>
            <!-- 未登录 -->
           <div class="today" v-else>
               <div class="iconLeft fl"><p>今日获得爱心</p> <p class="num">{{toDaySum}} <em>颗</em></p></div>
               <div class="iconRight fl"><p>今日捐献人数</p><p class="num">{{toDaySumUser}} <em>人</em></p></div>
           </div>
       </div>

       <div class="swiper">
            <swiper :options="swiperOption">
                <swiper-slide v-for="item in list"><p class="fl">{{item.mobilePhone}}捐献{{item.loveNumber}}颗爱心</p><p class="fr">{{item.addTime}}</p></swiper-slide>
            </swiper>
       </div>
       <div class="link"><a href="http://gongyi.qq.com/succor/detail.htm?id=415"></a></div>
       <div class="btn">
           <div class="btnLeft" @click="btn(1)"></div>
           <div class="btnRight" @click="btn(2)"></div>
       </div>
       <div v-if="showLayer" @click.stop="showLayer = false" v-layer class="layer"></div>
       <div v-if="charityOver" v-layer class="charityOver"><div class="img"><div class="btnClose" @click.stop="charityOver = false"></div></div></div>
   </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';   // 分享组件
    export default {
        mixins: [wxShare],
        data() {
            return {
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
                swiperOption: {          // 文字轮播
                    autoplay: 2000,      // 可选选项，自动滑动
                    direction : 'vertical',
                    slidesPerView:2,
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
            invitation() {   // 邀请按钮
                if (!this.osType) {
                    this.showLayer = true;
                } else {
                    this.PassValue(this.appShare)
                }
            },
            goInvest(){     // 跳转到理财列表
				this.toApp('WIP',{path:'/wxInvest'});
			},
            initData(){
                if (this.$route.query.osType) this.osType = this.$route.query.osType;
                this.$route.query.token || this.getCookie('userToken')? this.login = true : this.login = false;
                
                this.notLogPost('/activity/loveMeaningful/judgeToActivityDate', (data) => {
                    if (data.resCode) {
                        this.start = data.resData.active
                        this.data = data.resData.date
                    }
                }, (this.osType ? {oauthToken:this.token}:{token:this.getCookie('userToken')}), 1)

                let json = {};
                this.$route.query.ui && this.$route.query.ui!= 'null' ? json = {inviteUserId : this.$route.query.ui} : '';
                this.osType ? json.oauthToken = this.token : json.token = this.getCookie('userToken')
                console.log(json)
                this.notLogPost('/activity/loveMeaningful/loveMeaningfulToList', (data) => {
                    if (data.resCode) {
                        this.sum = data.resData.sum
                        this.toDaySum = data.resData.toDaySum
                        this.toDaySumUser = data.resData.toDaySumUser
                        this.userSum = data.resData.userSum
                        this.inviteUserSum = data.resData.inviteUserSum
                        this.mobilePhoneToUser = data.resData.mobilePhoneToUser
                        this.list = data.resData.list
                        let shareObj= { //分享标题内容配置
                            title: "E都市钱包已募集了"+ data.resData.sum +"颗爱心", //标题
                            desc: "快来一起加入”免费午餐小善大爱“行动！",//内容
                            link: global.host+"charity", //链接
                            imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                        }
                        this.getWxShareData(shareObj); //分享调用
                    }
                }, json, 1)
            },
            btn(n){
                if(this.start == 1){
                    n==1?this.invitation():this.goInvest()
                } else if(this.start == 3){
                    this.charityOver = true
                }
            }
        },
        created: function() {
            
        },
        mounted: function() {
            this.initData()
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #charity{
        position: relative;
        top: 0;
        left: 0;
        width: 10rem;
        height: 30.666667rem;
        background: url(https://aliyunsso.edspay.com/web/activity/charity/bg.png);
        background-size:100% 100%;
        .layer {
            background-color: rgba(0, 0, 0, 0.6) !important;
            background: url(https://aliyunsso.edspay.com/web/activity/charity/share.png) no-repeat top center;
            background-size: 10rem 3.733333rem;
        }
        .charityOver{
            background-color: rgba(0, 0, 0, 0.6) !important;
            .img{
                width: 7.733333rem;
                height: 4.266667rem;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                background: url(https://aliyunsso.edspay.com/web/activity/charity/alertBox.png) no-repeat;
                background-size: 100% 100%;
                img{
                    position: absolute;
                    width: 100%;
                    height: 100%;
                }
                .btnClose{
                    position: absolute;
                    top: 2.2rem;
                    width: 100%;
                    height: 50%;
                }
            }
        }
        .swiperBanner{
            width: 100%;
            height: 5.733333rem;
            text-align: center;
            line-height: 5rem;
            border: 1px solid #999;
            position: absolute;
            top:1.866667rem;
            z-index: -1;
            img{
                width: 100%;
                height: 5.733333rem;
            }
        }

        .time{
            width: 100%;
            height: 3rem;
            text-align: right;
            position: absolute;
            top:1.933333rem;
            padding-right:.653333rem;
            span{
                opacity: 0.9;
                font-family: PingFang-SC-Regular;
                font-size: .266667rem;
                color: #FFFFFF;
            }
            p{
                font-family: PingFang-SC-Medium;
                font-size: .32rem;
                color: #FFFFFF;
            }
        }

        .lovebox{
            width: 100%;
            height: 4rem;
            position: absolute;
            z-index: 5;
            top:10.75rem;
            padding-top: .1rem;
            .sum{
                width: 100%;
                font-family: DIN-Medium;
                font-size: .8rem;
                color: #EA4241;
                text-align: center;
                line-height: .8rem;
                em{
                    font-family: PingFang-SC-Medium;
                    font-size: .346667rem;
                    color: #333333;
                }
            }
            .invite{
                width: 100%;
                text-align: center;
                font-family: PingFang-SC-Medium;
                font-size: .373333rem;
                color: #333333;
                margin-top:0.58rem;
                em{
                    font-family: DIN-Medium;
                    font-size: .533333rem;
                    color: #333333;
                }
            }
            .today{
                width: 100%;
                height: 1.946667rem;
                padding:0 .32rem;
                .iconLeft,.iconRight{
                    height: 100%;
                    width: 4.666667rem;
                    p{
                        padding:.32rem 0 0 .7rem;
                        font-family: PingFang-SC-Medium;
                        font-size: .373333rem;
                        color: #333333;
                        text-align: center;
                    }
                    p.num{
                        padding:.13rem 0 0 .2rem;
                        font-family: DIN-Medium;
                        font-size: .533333rem;
                        color: #333333;
                        em{
                            ont-family: PingFang-SC-Regular;
                            font-size: .346667rem;
                            color: #333333;
                        }
                    }
                }
                .iconLeft{
                    background:url(https://aliyunsso.edspay.com/web/activity/charity/iconLeft.png);
                    background-size:100% 100%;

                }
                .iconRight{
                    background:url(https://aliyunsso.edspay.com/web/activity/charity/iconRight.png);
                    background-size:100% 100%;
                }
            }
            .today.login{
                .iconRight{
                    background:url(https://aliyunsso.edspay.com/web/activity/charity/icon.png);
                    background-size:100% 100%;
                }
            }
        }


        .swiper{
            font-family: PingFang-SC-Medium;
            font-size:.346667rem;
            position: absolute;
            top: 13.8rem;
            left: 0;
            width: 100%;
            height: 1.4rem;
            line-height: 0.8rem;
            padding:0 .8rem 0 .6rem;
            color:#fff;
            .swiper-container{
                height: 1.4rem;
            }
        }
        .link{
            width: 2rem;
            height:1rem;
            position: absolute;
            top:26.7rem;
            left:.5rem;
            z-index: 5;
            a{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .btn{
            width: 10rem;
            height: 1.653333rem;
            position: fixed;
            bottom:0;
            background:url(https://aliyunsso.edspay.com/web/activity/charity/bottomBtn.png);
            background-size:100% 100%;
            z-index: 5;
            .btnLeft{
                width: 50%;
                height: 100%;
                float: left;
            }
            .btnRight{
                width: 50%;
                height: 100%;
                float: right;
            }
        }
    }
</style>
<style lang="scss">
    #charity{
        .mint-swipe-indicators{
            line-height: 1rem;
            bottom: 0;
        }
        .mint-swipe-indicator{
            opacity: 0.8;
            background: #FFFFFF;
            width: .106667rem;
            height: .106667rem;
            border-radius: .053333rem;
        }
        .mint-swipe-indicator.is-active{
            background: #EA4241;
            width: .266667rem;
            height: .106667rem;
            border-radius: .053333rem;
            opacity: 1;
        }
    }
</style>