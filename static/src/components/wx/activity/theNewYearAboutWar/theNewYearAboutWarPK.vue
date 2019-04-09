<template>
  <div id="theNewYearAboutWarPK">
      <wx-header v-if="!osType" :logo="'约战新年'"></wx-header>
      <div class="main">
          <!-- 规则按钮 -->
          <div class="rule_btn" @click="popUp = 1"></div>
          <!-- 规则弹框 -->
          <div class="rule_box" v-if="popUp == 1">
              <div class="close_btn" @click="popUp = 0"></div>
              <a href="tel:400-135-3388">400-135-3388(立即拨打)</a>  
              <p v-if="osType == 'IOS'">8、本活动奖励与苹果公司无关</p>
          </div>

          <!-- 灯笼 -->
          <div class="lanternL"></div>
          <div class="lanternR"></div>

          <!-- 队名 -->
          <!-- 当有yet_bg类名换成已加入背景图片 -->
          <div class="teamL" :class="{yet_bg:teamId == 1}"></div>
          <div class="teamR" :class="{yet_bg:teamId==2}"></div>
          
          <!-- 获胜队伍显示 -->
          <div class="victory_box" v-if="activityTime == 3" :style="{background:'url('+winTeamBg+')'}"></div>
          <!-- 加入队按钮和进度条显示 -->
          <div class="show_box">
              <!-- 按钮 -->
              <div class="join_box" v-if="jionTeam == 2">
                  <div class="join_btn_L" @click="joinZD(1)"></div>
                  <div class="join_btn_R" @click="joinZD(2)"></div>
              </div>
              <!-- 进度条 -->
              <div class="progress_box" v-else-if="jionTeam == 1">
                  <div class="progress_L">
                      <h3>年化总金额:{{teamOne}}</h3>
                      <div class="plan_box">
                          <div class="plan" :style="{width:widthTyle1+'%'}"></div>
                      </div>
                  </div>
                  <div class="progress_R">
                      <h3 style="padding:0;">年化总金额:{{teamTwo}}</h3>
                      <div class="plan_box">
                          <div class="plan" :style="{width:widthTyle2+'%'}"></div>
                      </div>
                  </div>
              </div>
          </div>
          
          <!-- 我的年华出借额 -->
          <div class="investment_box">{{MyInvestmentStr}}</div>

          <!-- 获得京东卡 -->
          <div class="jdk_box">{{jdBonus}}</div>

          <!-- 页面底部 -->
          <div class="bottom_box"></div>
          <!-- 底部按钮 -->
          <div class="bottom_btn" @click="toFd"></div>
      </div>
          <!-- 遮罩 -->
          <div class="mark_box" v-if="popUp"></div>
  </div>
</template>

<script>
    import wxHeader from '../../../wxHeader';
    import wxToapp from '../../../../common/wx/wxToapp';
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                popUp:0,   // 0、遮罩   1、规则
                activityTime:0, // 活动时间
                isLogin:0,  // 是否登录  1、登录  2、没登录
                jionTeam:2, // 是否加入战队 1、已加入  2、未加入
                teamId:0,  // 战队id  1、新年鸿运  2、财源广进
                teamOne:'',  // 战队1年化额度
                teamTwo:'',  // 战队2年化额度
                MyInvestmentStr:'0', // 个人年化额度
                jdBonus:'0', // 京东钱
                joinName:'',  // 队名
                winTeam:null,  // 战队PK结果
                winTeamBg:'',  // 战队pk结果显示
                widthTyle1:0,   // 1队进度条
                widthTyle2:0,  // 2队进度条
            }
        },
        methods:{
            timeLimit(){   // 活动时间
                this.notLogPost('/activity/newYearPK/judgeInActivityPeriod', (data) => {
                     if(data.resCode == 1){
                        this.activityTime = data.resData.active;  // 2未开始  3已结束
                        if(data.resData.active == 2){
                          MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                            confirmButtonClass:'confirmButtonClass'
                          })
                        } else if(data.resData.active == 3) {
                           MessageBox.alert('亲，活动已经结束啦!', '提示', {
							confirmButtonClass:'confirmButtonClass'
                           }) 
                        }
                     }
                }, {}, 1)
            },

            initData(){   // 初始化接口
                this.notLogPost('/activity/newYearPK/showNewYearTeamPK', (data) => {
                    console.log(data);
                    this.isLogin = data.resData.isLogin;  // 是否登录
                    if(data.resCode == 1){
                      this.jionTeam = data.resData.jionTeamState;   // 是否加入队伍状态  1、已加入  2、未加入
                      this.teamOne = data.resData.teamOneStr;  // 战队1年化额度
                      this.teamTwo = data.resData.teamTwoStr; // 战队2年化额度
                      this.teamId = data.resData.teamId;  // 战队ID
                      this.MyInvestmentStr = data.resData.userAnnualInvestmentStr; //个人年化额度
                      this.jdBonus = data.resData.jdBonus;  // 京东钱
                      this.winTeam = data.resData.winTeam;  // 战队PK结果 0平局1战队1获胜2战队2获胜
                        if(this.winTeam == 0){   // 战队PK结果图片展示 0平局1战队1获胜2战队2获胜
                                this.winTeamBg = 'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/winbg1.png?v=1.0';
                        } else if(this.winTeam == 1) {
                                this.winTeamBg = 'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/winbg2.png?v=1.0';
                        } else if(this.winTeam == 2) {
                                this.winTeamBg = 'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/winbg3.png?v=1.0';
                        } 
                      this.widthTyle1 = (parseFloat(this.teamOne) / (parseFloat(this.teamOne) + parseFloat(this.teamTwo)))*100;  // 1队进度条
                      this.widthTyle2 = (parseFloat(this.teamTwo) / (parseFloat(this.teamOne) + parseFloat(this.teamTwo)))*100;  // 2队进度条
                    }
                },(this.osType ? {
                    oauthToken:this.token
                } : {}),1)
            },

            joinZD(i){  // 加入战队按钮事件
                if (this.activityTime == 2) {
                    MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                } else if(this.activityTime == 3){
                    MessageBox.alert('亲，活动已经结束啦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                } else {
                    if (this.isLogin == 1) {
                        if( i == 1){
                           this.joinName = "新年鸿运队";
                        } else if(i == 2){
                            this.joinName = "财源广进队";
                        }
                        if(this.jionTeam == 2){   // 未加入战队
                            MessageBox.confirm('是否加入'+this.joinName+'?', {
                                confirmButtonText: '加入',
                                confirmButtonClass: 'confirmButton',
                                cancelButtonClass: 'cancelButton',
                            }).then(action => {
                                this.getAppData('/activity/newYearPK/joinTeam', (data) => {
                                    console.log(data)
                                    this.jionTeam = data.resData.jionTeamState;   // 加入战队状态
                                    this.teamId = data.resData.teamId;  // 战队ID
                                    this.jdBonus = data.resData.jdBonus;  // 京东钱显示
                                    this.teamOne = data.resData.teamOneStr;  // 战队1年化额度
                                    this.teamTwo = data.resData.teamTwoStr; // 战队2年化额度
                                    this.widthTyle1 = (parseFloat(this.teamOne) / (parseFloat(this.teamOne) + parseFloat(this.teamTwo)))*100;  // 1队进度条
                                    this.widthTyle2 = (parseFloat(this.teamTwo) / (parseFloat(this.teamOne) + parseFloat(this.teamTwo)))*100;  // 2队进度条
                                },(this.osType ? {
                                    teamId:i
                                } : {
                                    teamId:i
                                }))
                            },action => {})
                        } 
                    } else if(this.isLogin == 2){
                        MessageBox.confirm('亲！您还未登录，请登录后参与活动。','提示', {
							confirmButtonText: '登录',
							confirmButtonClass: 'confirmButton',
							cancelButtonClass: 'cancelButton',
						}).then(action => {
							this.toApp('LG', {
								path: '/wxLogin',
								query: {
									thisUrl: this.$route.fullPath
								}
							})
						},action => {})
                    }
                }
            },

            toFd(){  // 跳转拆福袋页面
                if (!this.osType) {
                    $(document).scrollTop(0)
                }
                this.$router.push({
                    path:'/wx/theNewYearAboutWarLuckyBag',
                    query:this.$route.query
                })
            }
        },
        created:function(){
            this.timeLimit();  // 活动时间
            this.initData();  // 初始化接口
        },
        mounted(){
             $('html','body').css({'width':'100%','height':'100%'})
        },
        components:{
            wxHeader,
        }
    }
</script>

<style>
	.confirmButton,
	.cancelButton,.mint-msgbox-confirm {
		font-size: 0.48rem !important;
	}
</style>
<style lang="scss" scoped>
 html,body{
        width: 100%;
        height: 100%;
    }
// 灯笼动画
    @-webkit-keyframes bai{
        0%{
           -webkit-transform: rotate(5deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(5deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(5deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(5deg);
           -o-transform-origin: top center;
           transform: rotate(5deg);
           transform-origin:top center;
        }
        100%{
           -webkit-transform: rotate(-2deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(-2deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(-2deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(-2deg);
           -o-transform-origin: top center;
           transform: rotate(-2deg);
           transform-origin:top center;
        }
    }
    @-moz-keyframes bai{
        0%{
           -webkit-transform: rotate(5deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(5deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(5deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(5deg);
           -o-transform-origin: top center;
           transform: rotate(5deg);
           transform-origin:top center;
        }
        100%{
           -webkit-transform: rotate(-2deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(-2deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(-2deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(-2deg);
           -o-transform-origin: top center;
           transform: rotate(-2deg);
           transform-origin:top center;
        }
    }
    @-ms-keyframes bai{
        0%{
           -webkit-transform: rotate(5deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(5deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(5deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(5deg);
           -o-transform-origin: top center;
           transform: rotate(5deg);
           transform-origin:top center;
        }
        100%{
           -webkit-transform: rotate(-2deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(-2deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(-2deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(-2deg);
           -o-transform-origin: top center;
           transform: rotate(-2deg);
           transform-origin:top center;
        }
    }
    @-o-keyframes bai{
        0%{
           -webkit-transform: rotate(5deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(5deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(5deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(5deg);
           -o-transform-origin: top center;
           transform: rotate(5deg);
           transform-origin:top center;
        }
        100%{
           -webkit-transform: rotate(-2deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(-2deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(-2deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(-2deg);
           -o-transform-origin: top center;
           transform: rotate(-2deg);
           transform-origin:top center;
        }
    }
    @keyframes bai{
        0%{
           -webkit-transform: rotate(5deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(5deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(5deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(5deg);
           -o-transform-origin: top center;
           transform: rotate(5deg);
           transform-origin:top center;
        }
        100%{
           -webkit-transform: rotate(-2deg);
           -webkit-transform-origin: top center;
           -moz-transform: rotate(-2deg);
           -moz-transform-origin: top center;
           -ms-transform: rotate(-2deg);
           -ms-transform-origin:top center;
           -o-transform:rotate(-2deg);
           -o-transform-origin: top center;
           transform: rotate(-2deg);
           transform-origin:top center;
        }
    }

    // 加入战队按钮和页面底部动画
    @-webkit-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @-moz-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @-ms-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @-o-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }

    #theNewYearAboutWarPK{
          font-family: DIN-Medium;
          .main{
              width: 100%;
              height: 35.653333rem;
              background:url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_bg.png?v=1.4);
              background-size: cover; 
              overflow: hidden;
              position: relative;
              .rule_btn{
                    width: 1.386667rem;
                    height: 1.386667rem;
                    position:fixed;
                    right: 0;
                    top: 7.066667rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_rule_btn.png?v=1.0) no-repeat;
                    background-size: cover; 
                    z-index: 99;
              }
              .rule_box{
                width: 8.92rem;
                height: 14.146667rem;
                padding: 13rem 0 0 .78rem ;
                font-size: .32rem;
                color: #c81f0f;
                position: fixed;
                top: 0;left:0;
                right:0;bottom: 0;
                margin: auto;
                z-index: 100;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_rule_box.png?v=1.1) no-repeat;
                background-size: cover; 
                    a{
                        position: absolute;
                        bottom: 1.28rem;
                        right: 2.5rem;
                        font-family: "微软雅黑";
                        color: #48a4ff;
                     }
                .close_btn{
                    width: .8rem;
                    height: .8rem;
                    position: absolute;
                     right: 0.4rem;
                     top: 1.05rem;
                }
            }
              .lanternL,.lanternR{
                   width: 2rem;
                   height: 3.8rem;
                   position: absolute;
                   top: 0;
              }
              .lanternL{
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_lantern1.png?v=1.0) no-repeat;
                  background-size: cover;
                  left: 0;
                  -webkit-animation: bai 1s ease-in-out alternate infinite;
                  -moz-animation: bai 1s ease-in-out alternate infinite;
                  -ms-animation: bai 1s ease-in-out alternate infinite;
                  -o-animation: bai 1s ease-in-out alternate infinite;
                  animation:bai 1s ease-in-out alternate infinite;
              }.lanternR{
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_lantern2.png?v=1.0) no-repeat;
                  background-size: cover;
                  right: 0;
                  -webkit-animation: bai 1.2s ease-in-out alternate infinite;
                  -moz-animation: bai 1.2s ease-in-out alternate infinite;
                  -ms-animation: bai 1.2s ease-in-out alternate infinite;
                  -o-animation: bai 1.2s ease-in-out alternate infinite;
                  animation:bai 1.2s ease-in-out alternate infinite;
              }
              .teamL,.teamR{
                  width:2.653333rem;
                  height: 1.44rem;
                  position: absolute;
                  top: 10.293333rem;
              }
              .teamL{
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_team1.png?v=1.0) no-repeat;
                  background-size: cover; 
                  left:.826667rem;
              }
              .teamR{
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_team2.png?v=1.0) no-repeat;
                  background-size: cover; 
                  right: 1.013333rem;
              }
              .teamL.yet_bg{
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_team_yet1.png?v=1.0) no-repeat;
                  background-size: cover; 
              }
              .teamR.yet_bg{
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_team_yet2.png?v=1.0) no-repeat;
                  background-size: cover; 
              }
              .victory_box{
                  width: 2.906667rem;
                  height: .773333rem;
                  background-size: cover!important; 
                  position: absolute;
                  top:11.973333rem;
                  left: 0;right: 0;
                  margin: auto;
              }
              .show_box{
                  width:100%;
                  height: 1.133333rem;
                  position: absolute;
                  top: 15.466667rem; 
                  left: 0;
                  .join_box{
                      width: 100%;
                      height: 100%;
                      position: relative;
                      .join_btn_L,.join_btn_R{
                          width: 2.48rem;
                          height: 1.12rem;
                          position: absolute;
                          top:0;
                          -webkit-animation: sf 3s infinite;
                          -moz-animation: sf 3s infinite;
                          -ms-animation: sf 3s infinite;
                          -o-animation: sf 3s infinite;
                          animation: sf 3s infinite;
                      }
                      .join_btn_L{
                          background:url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_join_btn1.png?v=1.0) no-repeat;
                          background-size: cover;
                          left:1.253333rem;
                      }.join_btn_R{
                          background:url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_join_btn2.png?v=1.0) no-repeat;
                          background-size: cover;
                         right: 1.306667rem;
                      }
                  }
                  .progress_box{
                      width: 100%;
                      height: 100%;
                      .progress_L,.progress_R{
                          width: 50%;
                          height: 100%;
                          float: left;
                          h3{
                              width: 100%;
                              margin-bottom: .293333rem;
                              font-size: .293333rem;
                              color: #FF351E;
                              padding-left: .45rem;
                              text-align: center;
                          }
                          .plan_box{
                              width: 2.253333rem;
                              height: .266667rem;
                              background: #f6d67f;
                              border-top-right-radius: 1.333333rem;
                              border-bottom-right-radius: 1.333333rem;
                              margin: 0 auto;
                              position: relative;
                              .plan{
                                  width: 0%;
                                  height: 100%;
                                  position: absolute;
                                  top: 0;left: 0;
                                  background: #FF351E;
                                  border-top-right-radius: 1.333333rem;
                                  border-bottom-right-radius: 1.333333rem;
                                
                              }
                          }
                      }
                  }
              }
              .investment_box,.jdk_box{
                  width: 2.8rem;
                  height: .44rem;
                  position:absolute;
                  font-size: .32rem;
                  color: #D3282C;
                  line-height: .44rem;
              }
              .investment_box{
                  top: 16.75rem;
                  right: 1rem;
              }
              .jdk_box{
                  top: 17.4rem;
                   right: 1.68rem;
              }
              .bottom_box{
                  width: 100%;
                  height: 2.4rem;
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_bottom.png?v=1.0) no-repeat;
                 background-size: cover;
                 position: fixed;
                 bottom: 0;left: 0;
                 z-index: 99;
              }
              .bottom_btn{
                  width: 2.266667rem;
                    height: 2.266667rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/pk_bottom_btn.png?v=1.0) no-repeat;
                    background-size:cover; 
                    position: fixed;
                    bottom: .3rem;
                    left: 3.666667rem;
                    z-index: 99;
                    -webkit-animation: sf 1.5s infinite;
                    -moz-animation: sf 1.5s infinite;
                    -ms-animation: sf 1.5s infinite;
                    -o-animation: sf 1.5s infinite;
                    animation: sf 1.5s infinite;
              }
          }
          .mark_box{
                width: 100%;
                height: 100%;
                position: fixed;
                top: 0;right: 0;
                left: 0;bottom: 0;
                margin: auto;
                background: #000;
                opacity: .7;
                z-index: 99;
          }
    }
</style>
