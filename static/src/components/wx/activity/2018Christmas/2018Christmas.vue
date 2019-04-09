<template>
    <div id="main">
        <div v-title>奇幻圣诞夜 有你 有礼</div>
        <!-- 立即参与按钮部分 -->
        <div class="participation_btn" v-if="loginStatus == 0 || avtivityData.isJoin == 0" @click="clickFun"></div>
        <!-- 参与后红包展示部分 -->
        <div class="already_box" v-if="loginStatus == 1 && avtivityData.yesterdayList.length != 0">
            <!-- 一个红包样式 -->
            <div class="one_red_box" v-if="avtivityData.yesterdayList.length == 1">
                <div  v-for="item in avtivityData.yesterdayList">
                    <h3>{{item.yesterdayReward1}}</h3>
                    <p class="p1">获得暖心红包</p>
                    <p class="p2">您昨日出借额(元)</p>
                    <p class="p3">{{item.yesterdayMoney1}}<span>{{item.type}}</span></p>
                </div>
                
            </div>
            <!-- 两个红包样式 -->
            <div class="two_red_box" v-else>
                <ul>
                    <li v-for="item in avtivityData.yesterdayList">
                        <h3>{{item.yesterdayReward1}}</h3>
                        <p class="p1">获得暖心红包</p>
                        <p class="p2">您昨日出借额(元)</p>
                        <p class="p3">{{item.yesterdayMoney1}}<span>{{item.type}}</span></p>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 提示文字 -->
        <div class="text_bg" v-if="loginStatus == 0 || avtivityData.isJoin == 0">点击【立即参与】后，方可获得圣诞活动奖励!</div>
        <div class="text_bg" v-else>您已参与圣诞活动，可获得圣诞奖励!</div>
        

        <!-- 天天有礼 暖心圣诞部分 -->
        <div class="ardent_box">
            <!-- 登录按钮 -->
            <div class="login_btn" v-if="loginStatus == 0" @click="toLogin"></div>
            <!-- 登录后当日出借数据 -->
            <div class="at_present_box" v-else>
                <div class="left fl">
                    <div class="money">{{avtivityData.money1}}元</div>
                    <p>（60-90）出借金额</p>
                </div>
                <div class="right fl">
                    <div class="money">{{avtivityData.money2}}元</div>
                    <p>（180-360）出借金额</p>
                </div>
            </div>
        </div>
        <!-- 出借金额 -->
        <div class="lend_money">
            <ul>
                <li v-for="(item,index) in lendMoney">{{item}}</li>
            </ul>
        </div>
        <!-- 60-90暖心红包 activeColor-->
        <div class="red_list1">
            <ul>
                <li v-for="(item,index) in listRed1" :class="{activeColor:index == avtivityData.money1Index}">{{item}}元</li>
            </ul>
        </div>
        <!-- 180-360暖心红包 -->
        <div class="red_list2">
            <ul>
                <li v-for="(item,index) in listRed2" :class="{activeColor:index == avtivityData.money2Index}">{{item}}元</li>
            </ul>
        </div>

        <!-- 12月25日限时狂欢部分 -->
        <div class="tab_box">
             <div class="fl" @click="tabTag('oneTab')" :class="{activeBg:tabShow.oneTab}">
                 11点-12点
                 <span v-if="avtivityData.active == 1">(进行中)</span>
                 <span v-else-if="avtivityData.active == 2">(未开始)</span>                 
                 <span v-else-if="avtivityData.active == 3">(已结束)</span>
                 <span v-else>(无效)</span>
             </div>
             <div class="fr" @click="tabTag('twoTab')" :class="{activeBg:tabShow.twoTab}">
                 15点-16点
                 <span v-if="avtivityData.active1 == 1">(进行中)</span>
                 <span v-else-if="avtivityData.active1 == 2">(未开始)</span>                 
                 <span v-else-if="avtivityData.active1 == 3">(已结束)</span>
                 <span v-else>(无效)</span>
            </div>
        </div>
        <!-- tab内容-->
        <div class="tab_conte1" v-if="tabShow.oneTab">
            <ul>
                <li v-for="(item,i) in avtivityData.listOne" :class="{fontColor:avtivityData.isJoin == 1}">
                    {{item}}<span v-if="avtivityData.isJoin == 1">次</span>
                </li>
            </ul>
        </div>    
        <div class="tab_conte2" v-if="tabShow.twoTab">
            <ul>
                <li v-for="(item,i) in avtivityData.listTwo" :class="{fontColor:avtivityData.isJoin == 1}">
                    {{item}}<span v-if="avtivityData.isJoin == 1">次</span></li>
            </ul>
        </div>    

        <!-- 2018收官之战 -->
        <div class="finally_data_box" :class="{margTop:avtivityData.isJoin == 1 && avtivityData.yesterdayList.length == 0}">
            <div class="login_box" v-if="loginStatus == 0">
                累计净出借额:
                <div class="login_btn" @click="toLogin"></div>
            </div>
            <div class="data_box" v-else>
                <h3>累计净出借额：<span>{{rankingListObj.newMoney}}</span>元 <i @click.stop="popUp = 2"></i></h3>
                <div v-if="avtivityData.isJoin == 1">
                        <p v-if="rankingListObj.userTop == '-1' && activityStatus == 1"><span>距离上榜还需出借：{{rankingListObj.isTopMoney}}元</span></p>
                        <p v-if="rankingListObj.userTop == '-1' && activityStatus == 3"><span>我的排名：您尚未上榜</span></p>
                        <p v-if="rankingListObj.userTop != '-1'"><span>我的排名<i>第{{rankingListObj.userTop}}名</i>      获得<i>{{rankingListObj.userAwardMoney}}</i>元返现</span></p>                        
                </div>                
            </div>
        </div>

        <!-- 收官之战排名列表前三名 -->
        <div class="threeSort">
            <ul>
                <li v-for="(item,i) in rankingListObj.list" v-if="i < 3">
                    <div class="content" v-if="item.mobilePhone != '虚位以待'">
                        <p class="p1">当前可获奖励</p>
                        <p class="p2">{{item.presentAwardMoneyStr}}</p>
                        <p class="p3" :class="{myColor:(i+1) == rankingListObj.userTop}">{{item.mobilePhone}}<span v-if="(i+1) == rankingListObj.userTop">-我</span></p>
                        <p class="p4">{{item.sumLendMoneyStr}}</p>
                    </div>
                    <div class="null_text" v-else>虚位以待</div>
                </li>
            </ul>
        </div>
        <!-- 收官之战排名列表4-10名 -->
        <div class="four_ten_list">
            <ul>
                  <li v-for="(item,i) in rankingListObj.list" v-if="i > 2 && i < 10" :class="{activeBg:(i+1) == rankingListObj.userTop}">
                        <p class="p1">{{item.top}}</p>
                        <p class="p2">{{item.mobilePhone}}<span :class="{myColor:(i+1) == rankingListObj.userTop}" v-if="(i+1) == rankingListObj.userTop">-我</span></p>
                        <p class="p3">{{item.sumLendMoneyStr}}</p>
                        <p class="p4">{{item.presentAwardMoneyStr}}</p>
                  </li>
            </ul>
        </div>

        <!-- 底部部分 -->
        <div class="footer_box">
            <div class="btn1" @click="shareFun"></div>
            <div class="btn2" @click="goInvest"></div>
        </div>       

        <!-- 规则 -->
        <div class="rule_btn" @click="popUp = 1"></div>
        <!-- 规则弹框 -->
        <div class="rule_box" v-if="popUp == 1">
            <div class="close_btn" @click="popUp = 0"></div>
            <div class="img_box">
                <div class="img">
                    <div class="img_bg">
                        <a href="tel:400-135-3388"></a>
                        <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
                    </div>
                </div>
            </div>            
        </div>

        <!-- 点击问号提示框 -->
        <div class="query_box" @click="popUp = 0" v-show="popUp == 2"></div>
        <!-- 活动结束弹框 -->
        <div class="finish_box" @click="popUp = 0" v-show="popUp == 3"></div>

        <!-- 遮罩 -->
        <div v-layer class="zIndex" v-if="popUp" @click="popUp = 0" :class="{layer:popUp == 4}"></div>

        <!-- 跳转商城按钮 -->
        <div class="shopping_icon" @click="toShopping"></div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    import { MessageBox } from 'mint-ui';
    import {Toast} from 'mint-ui';
    export default{
        mixins: [ wxShare ],
        data(){
            return{
               activityStatus:1,  // 活动时间  1、开始 2、未开始 3、已结束 
               popUp:0,  // 1、规则弹框 2、问号弹框 3、活动结束弹框 4、f分享
               lendMoney:[
                   '5000≤Y＜10000',
                   '10000≤Y＜30000',
                   '30000≤Y＜50000',
                   '50000≤Y＜100000',
                   '100000≤Y＜200000',
                   'Y≥200000'
               ],
               listRed1:[
                   15,35,128,228,500,1188
               ],
               listRed2:[66,158,528,888,1888,4000],
               loginStatus:0,  // 是否登录
               avtivityData:{
                   isJoin:0,  // 是否参加活动
                   listOne:[],   // 狂欢11-12点数据
                   active:0,     //  狂欢11-12点状态 1：正在进行，2：未开启，3：已结束，4：无效                    
                   listTwo:[],   // 狂欢15-16点数据
                   active1:0,   //  狂欢11-12点状态 1：正在进行，2：未开启，3：已结束，4：无效 
                   yesterdayList:[], // 昨日是否获得奖励数据	
               },
               rankingListObj:{
                   list:[],  // 收官部分列表
               },
               tabShow:{
                  oneTab:true,
                  twoTab:false
               },
               shareObj: {              //分享标题内容配置
                    title: "糖衣炮“诞 ”奇幻来袭", //标题
                    desc: "收入账单有多长 这个圣诞就有多爽，千元红包天天享，0.5%返现叠加拿！", // 内容
                    link: global.host + "wx/christmas2018", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
               },
               setTiem:null
            }
        },
        methods:{
             getActivityTime(){   // 活动时间
                 this.getNotlogData('/activity/two/getActivityTime', (data) => {
                     if(data.resCode){
                         this.activityStatus = data.resData.active;
                         if(data.resData.active == 2){
                             MessageBox('温馨提示', '该活动尚未开始！');
                         } else if(data.resData.active == 3){
                             this.popUp = 3;   // 活动结束弹窗
                         }
                     }

                 },{activityId:'christmas_2018_activity'})
             },
             
             activityGetWarmHeart(){    // 活动一，二接口
                this.getNotlogData('/activity/christmas/getWarmHeart', (data) => {
                    if(data.resCode){
                       this.loginStatus = data.resData.loginStatus;  // 是否登录
                       this.avtivityData = data.resData;
                       if(data.resData.active1 == 1){
                           this.tabShow = {
                                oneTab:false,
                                twoTab:true
                            }
                       }
                    }
                },{})
             },

             activityList(){   // 收官列表
                this.getNotlogData('/activity/christmas/getNovemberActivityList', (data) => {
                      if(data.resCode){
                        this.rankingListObj = data.resData;
                      }
                },{})
             },

             clickFun(){   // 点击立即参与
                window._czc.push(﻿["_trackEvent", "圣诞节活动", "圣诞立即参与按钮"]); //  友盟统计配置
                if(this.activityStatus == 2){
                   MessageBox('温馨提示', '该活动尚未开始！');
                } else if(this.activityStatus == 3){
                   this.popUp = 3;   // 活动结束弹窗
                } else {
                  if(this.loginStatus == 0){  // 未登录
                     this.toLogin();
                  } else {
                      this.getAppData('/activity/christmas/join', (data) => {
                          if(data.resCode){
                               Toast({ //    小黑快
                                message: '参与成功',
                                duration: 1000
                              });
                              this.activityGetWarmHeart();
                              this.activityList(); // 收官列表
                             
                          }
                      },{})
                  }
                }               
             },

             toLogin(){   // 去登录
                if(this.activityStatus == 2){
                   MessageBox('温馨提示', '该活动尚未开始！');
                } else if(this.activityStatus == 3){
                   this.popUp = 3;   // 活动结束弹窗
                } else {
                   this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                }   
             },

             goInvest(){   // 出借列表
                window._czc.push(﻿["_trackEvent", "圣诞节活动", "圣诞立即出借按钮"]); //  友盟统计配置
                if(this.activityStatus == 2){
                   MessageBox('温馨提示', '该活动尚未开始！');
                } else if(this.activityStatus == 3){
                   this.popUp = 3;   // 活动结束弹窗
                } else {
                    this.toApp('WIP',{path:'/wxInvest'})
                }  
             },

             tabTag(at){
                 for(var i in this.tabShow){
                     this.tabShow[i] = false;
                 }
                 this.tabShow[at] = true;
             },

             shareFun(){
                window._czc.push(﻿["_trackEvent", "圣诞节活动", "圣诞分享按钮"]); //  友盟统计配置
                if(this.activityStatus == 2){
                   MessageBox('温馨提示', '该活动尚未开始！');
                } else if(this.activityStatus == 3){
                   this.popUp = 3;   // 活动结束弹窗
                } else {
                    if(this.osType){
                       this.isLogPassValue(this.appShare)
                    } else {
                       this.popUp = 4;
                    }
                }             
             },

             toShopping(){   // 跳转积分商城
                 if(this.osType){
                    this.PassValue('GoodsList');
                } else {
                    // ,query:{classify:}
                    this.$router.push({path:'/intGoodList'})
                }
             }
        },
        created(){
              this.getActivityTime();  // 活动时间
              this.activityGetWarmHeart(); // 活动
              this.activityList(); // 收官列表
        },
        mounted() {         
            this.PassValue('NavWhite_奇幻圣诞夜 有你 有礼');
            this.getWxShareData(this.shareObj);   // wx分享方法
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275562639&web_id=1275562639';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        },
        destroyed() {
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
	@-webkit-keyframes sf {
		0% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
		50% {
			-webkit-transform: scale(0.9);
			-moz-transform: scale(0.9);
			-ms-transform: scale(0.9);
			transform: scale(0.9);
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
			-webkit-transform: scale(0.9);
			-moz-transform: scale(0.9);
			-ms-transform: scale(0.9);
			transform: scale(0.9);
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
			-webkit-transform: scale(0.9);
			-moz-transform: scale(0.9);
			-ms-transform: scale(0.9);
			transform: scale(0.9);
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
			-webkit-transform: scale(0.9);
			-moz-transform: scale(0.9);
			-ms-transform: scale(0.9);
			transform: scale(0.9);
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
			-webkit-transform: scale(0.9);
			-moz-transform: scale(0.9);
			-ms-transform: scale(0.9);
			transform: scale(0.9);
		}
		100% {
			-webkit-transform: scale(1);
			-moz-transform: scale(1);
			-ms-transform: scale(1);
			transform: scale(1);
		}
	}
    #main{
        width: 100%;
        height: 62.506667rem;
        overflow: hidden;
        position: relative;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/wx_bg.png?v=2.2) no-repeat;
        background-size: cover;
        .rule_btn{
            width: 1.333333rem;
            height: 1.333333rem;
            background:url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/rule_btn.png?v=1.0) no-repeat;
            background-size: cover;
            position: fixed;
            top: 8.133333rem;
            right: 0;
        }
        .rule_box{
            width: 9.52rem;
            height: 12.453333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/rule_bg.png?v=1.1) no-repeat;
            background-size: 100% 100%;
            position: fixed;
            top: 0;left: 0;
            bottom: 0;right: 0;
            margin: auto;
            z-index: 100;
            padding-top: 3.973333rem;
            overflow: hidden;
            .close_btn{
                width: .933333rem;
                height: .933333rem;
                position: absolute;
                top: .45rem;right: .213333rem;
            }
            .img_box{
                height: 8.4rem;
                .img{
                    margin: 0 auto;
                    width: 8.155555rem;
                    height: 100%;
                    overflow-y:auto;
                    .img_bg{
                        width: 100%;
                        height: 16.613333rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/rule_img.png?v=1.1) no-repeat;
                        background-size: cover;
                        position: relative;
                        a{
                            width: 3.333333rem;
                            height: 0.5rem;
                            display: block;
                            position: absolute;
                            top: 15rem;
                            right: .266667rem;
                        }
                        p{
                           font-size: .32rem;
                           color: #c29e61;
                           text-align: center;
                           position: absolute;
                           bottom: .6rem;
                           left: 0;right: 0;
                           margin: auto;
                        }
                    }
                }
            }
        }
        .zIndex{
            z-index: 99!important;
        }
        .participation_btn{
            width: 4.826667rem;
            height: 2.213333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/participation_btn.png?v=1.0) no-repeat;
            background-size: cover;
            margin: 9.75rem 0 31.1rem 2.666667rem;
            -webkit-animation: sf 2s infinite;
            -moz-animation: sf 2s infinite;
            -ms-animation: sf 2s infinite;
            animation: sf 2s infinite;
        }
        .already_box{
            width: 100%;
            position: relative;
            .one_red_box{
                width: 4.56rem;
                height: 4.053333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/red_bg1.png?v=1.1) no-repeat;
                background-size: cover;
                margin: 8.23rem auto 30.79rem;
                text-align: center;
                padding-top: .38rem;
                h3{
                    font-size: .693333rem;
                    color: #FD553C;
                    font-family: PingFang-SC-Medium;
                }
                .p1{
                    font-size: .32rem;
                    color: #C7A246;
                    margin-bottom: 1.155555rem;
                }
                .p2{
                    font-size: .32rem;
                    color: #fff;
                }
                .p3{
                    font-size: .373333rem;
                    color: #fff;
                    span{
                        font-size: .32rem;
                        color: #FFC6C6;
                    }
                }
            }
            .two_red_box{
                width: 100%;
                height: 4.026667rem;
                margin: 8.65rem auto 0;
                ul{
                    width: 7.36rem;
                    height: 100%;
                    margin: 0 auto;
                    li{
                        width: 3.68rem;
                        height: 100%;
                        float: left;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/red_bg2.png?v=1.1) no-repeat;
                        background-size: cover;
                        text-align: center;
                        padding-top: .4rem;
                        h3{
                            color: #FD553C;
                            font-size: .45rem;
                            font-family: PingFang-SC-Medium;

                        }
                        .p1{
                            font-size: .266667rem;
                            color: #C7A246;
                            margin-bottom: 1.013333rem;
                        }
                        .p2{
                             font-size: .32rem;
                             color: #fff;
                        }
                        .p3{
                            color: #fff;
                            font-size: .373333rem;
                            span{
                                font-size: .32rem;
                                color: #FFC6C6;
                            }
                        }
                    }
                }
            }
        }
        .text_bg{
            width: 7.52rem;
            height: .666667rem;
            background: #1E2A4C;
            border-radius: .213333rem;
            position: absolute;
            top: 12.15rem;
            left: 0;right: 0;
            margin: auto;
            color: #BE5E38;
            font-size: .32rem;
            text-align: center;
            line-height: .666667rem;
        }
        .ardent_box{
           width: 100%;
           position: absolute;
           top: 16.1rem;
           left: 0;
           padding-top: .24rem;
           .login_btn{
               width: 3.12rem;
               height: 1.146667rem;
               background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/login_btn.png?v=1.0) no-repeat;
               background-size: cover;
               margin: 0 auto;
           }
           .at_present_box{
               width: 100%;
               .left,.right{
                   width: 50%;
                   text-align: center;
                   .money{
                       color: #F60000;
                       font-size: .533333rem;
                       font-family: PingFang-SC-Medium;
                   }
                   p{
                       color: #333;
                       font-size: .32rem;
                   }
               }
           }
        }
        .lend_money{
            width: 5.099999rem;
            position: absolute;
            top: 19.05rem;
            left: .849999rem;
            padding-top: .53rem;
            padding-left: .299999rem;
            ul{
                li{
                    margin-bottom: .48rem;
                    color: #333;
                    font-size: .373333rem;
                    font-family: PingFang-SC-Medium;
                }
            }
        }
        .red_list1,.red_list2{
            width: 2.106667rem;
            position: absolute;
            text-align: center;
            padding-top: .53rem;
            ul{
                li{
                    margin-bottom: .48rem;
                    color: #333;
                    font-size: .373333rem;
                    font-family: PingFang-SC-Medium;
                }
                li.activeColor{
                    color: #F60000;
                }
            }
        }
        .red_list1{
            top: 19.05rem;
            left: 4.95rem;
        }
        .red_list2{
            top: 19.05rem;
            left: 7.1rem;
        }
        .tab_box{
            width: 100%;
            position: absolute;
            top: 29.7rem;
            left: 0;
            padding: 0 1.066667rem;
            div{
                width: 3.786667rem;
                height: 1.573333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/btn1.png?v=1.1) no-repeat;
                background-size: 100%;
                color: #D8A142;
                font-size: .373333rem;
                line-height: 1.36rem;
                text-align: center;
            }
            .activeBg{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/btn2.png?v=1.1) no-repeat;
                background-size: 100%;
                color: #A36800;
            }
        }
        .tab_conte1,.tab_conte2{
            width: 8.586667rem;
            height: 8.586667rem;
            position: absolute;
            top: 31.5rem;
            left: 0;right: 0;
            margin: auto;
            ul {
                padding-left: 6.5rem;
                padding-top: 1.146667rem;
                li{
                   text-align: center;
                   margin-bottom: .426667rem;
                   color: #333;
                   font-size: .373333rem;
                   line-height: .533333rem;
                   font-family: PingFang-SC-Medium;
                }
                li:nth-child(1){
                    margin-bottom: .49rem;
                }
                li:nth-child(3){
                    margin-bottom: 2rem;
                }
                li:nth-child(4){
                    margin-bottom: .49rem;
                }
                li:nth-child(5){
                    margin-bottom: .49rem;
                }
                .fontColor{
                    color: #F60000;
                }
            }
        }
        .tab_conte1{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/tab1_bg.png?v=1.0) no-repeat;
            background-size: 100%;
        }.tab_conte2{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/tab2_bg.png?v=1.0) no-repeat;
            background-size: 100%;
        }
        .finally_data_box{
            width: 100%;
            height: 2.05rem;
            margin-top: 30.4rem;
            padding-top: .7rem;
            .login_box{
                height: 1.146667rem;
                line-height: 1.146667rem;
                position: relative;
                padding-left: 1.84rem;
                color: #333;
                font-size: .48rem;
                font-family: PingFang-SC-Medium;
                .login_btn{
                    width: 3.12rem;
                    height: 1.146667rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/login_btn.png?v=1.0) no-repeat;
                    background-size: cover;
                    position: absolute;
                    left: 5.066667rem;
                    top:0;
                }
            }
            .data_box{
                text-align: center;
                h3{
                    font-size: .48rem;
                    font-family: PingFang-SC-Medium;
                    color: #333;
                    span{
                        color: #F60000;
                    }
                    i{
                        display: inline-block;
                        width: .426667rem;
                        height: .426667rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/query_icon.png?v=1.0) no-repeat;
                        background-size:100% ;
                        margin-top: 10px;
                    }
                } 
                p{
                    span{
                        background: #FDE3BC;
                        border-radius: .053333rem;
                        padding: .053333rem .213333rem;
                        font-family: PingFangSC-Medium;
                        font-size: .32rem;
                        color: #B88F54;
                        letter-spacing: 0;
                    }
                    i{
                        color: #F60000;
                    }
                }  
            }
        }
        .margTop{
               margin-top: 43rem;
        }
        .threeSort{
            height: 5.5rem;
            position: relative;
            ul{
                 width: 100%;
                 height: 100%;
                 position: relative;
                 li{
                     text-align: center;
                     position: absolute;
                    //  background: red;
                    //  opacity: .6;

                     .p1,.p2,.p4{
                        color: #E08F3D;
                        font-size: .32rem;
                     }
                     .p2{
                         margin-bottom: .35rem;
                     }
                     .p3{
                         font-family: PingFangSC-Medium;
                        font-size: .32rem;
                        color: #333333;
                     }
                     .null_text{
                         font-size: .373333rem;
                         color: #955F07;
                         line-height:1rem;
                         text-align: center;
                     }
                     .myColor{
                      color: #f60000;
                    }
                 }
                 li:nth-child(1){
                       width: 2.9rem;
                        top: 2.69rem;
                        left: 3.6rem;
                 }
                 li:nth-child(2){
                     width: 2.84rem;
                    top: 2.3rem;
                    left: 0.55rem;
                 }
                 li:nth-child(3){
                     width: 2.84rem;
                     top: 2.3rem;
                     left: 6.6rem;
                 }
            }
        }
        .four_ten_list{
            width: 9.093333rem;
            margin: 2.9rem auto 0;
            ul{
                // 48:90:104:99
                li{
                   width: 100%;
                   height: .96rem;
                   line-height: .96rem;
                   p{
                       float: left;
                       font-size: .32rem;
                       text-align: center;
                   }
                   .p1{
                       width: .6rem;
                       font-size: .373333rem;
                       text-align: right;
                       font-family: PingFangSC-Semibold;
                   }
                   .p2{
                       width: 3rem;
                   }
                   

                   .p3{
                       width: 3rem;
                   }
                   .p4{
                       width: 2.399999rem;
                   }
                   .myColor{
                      color: #f60000;
                    }
                }
                li.activeBg{
                    background: #FFD6AC;
                }
            }
        }
        .footer_box{
            width: 9.946667rem;
            height: 1.386667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/footer_bg.png?v=1.0) no-repeat;
            background-size: cover;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            margin: auto;
            div{
               
                height: 100%;
            }
            .btn1{
                 float: left;
               width: 38%;
            }
            .btn2{
                 float: right;
                width: 62%;
            }
        }
        .query_box{
            width: 9.573333rem;
            height: 8.106667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/hint_box.png?v=1.0) no-repeat;
            background-size: cover;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 100;
        }
        .finish_box{
            width: 9.573333rem;
            height: 6.346667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/finish_box.png?v=1.0) no-repeat;
            background-size: cover;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            z-index: 100;
        }
        .layer {
				background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/share_bg.png?v=1.0) no-repeat;
				background-size: 100% 3.733333rem;
                
		}
        .shopping_icon{
            width: 1.48rem;
            height: 1.6rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasActivity/shop_icon.gif?v=1.0) no-repeat;
            background-size: 100%;
            position: fixed;
            top: 11.266667rem;
            right: 0;
        }
    }
</style>