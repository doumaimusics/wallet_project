<template>
  <div id="theNewYearAboutWarPKB">
      <wx-header v-if="!osType" :logo="'我的福卡'"></wx-header>
      <div class="main">
          <!-- 规则按钮 -->
          <div class="rule_btn" @click="popUp = 1"></div>
          <!-- 规则弹框 -->
          <div class="rule_box" v-if="popUp == 1">
              <div class="close_btn" @click="popUp = 0"></div>
          </div>

          <!-- 头部装饰 -->
          <div class="top_bg"></div>

          <!-- 中间弄然 -->
          <div class="center_box">
              <!-- 当没有内容的时候 -->
              <div class="kong_box" v-if="activityAward.length == 0"></div>
              <!-- 有内容的区域 -->
              <ul class="ka_list">
                  <li v-for="awardValue in activityAward">
                      <img :src="'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/zh_Group'+awardValue.luckyBagType+'.png'+'?v=1.1'" alt="">
                      <p class="red_pack">
                          <span v-for="textValue in awardValue.awards">{{textValue}}</span>
                      </p>
                      <p class="time">领取时间：{{awardValue.addTimeStr}}</p>
                  </li>
              </ul>
          </div>
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
        mixins:[ wxToapp ],
        data(){
            return{
                popUp:0,   // 0、遮罩  1、规则弹框
                activityAward:[],  // 活动奖励列表
            }
        },
        methods:{
            userLucky(){   // 奖励列表展示
                this.getAppData('/activity/newYearPK/userLuckyBag', (data) => {
                    if(data.resCode == 1){
                       this.activityAward = data.resData.activityAwardModels;
                    }
                }, (this.osType ? {
                   oauthToken:this.token
                } : {}),1)
            }
        },
        created:function(){
             this.userLucky();
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
    body{
    background: #FEE8AF!important;
}
</style>


<style lang="scss" scoped>
   
    #theNewYearAboutWarPKB{
        font-family: DIN-Medium;
        
        .main{
            width: 100%;
            
            padding: .64rem  .4rem 0 .4rem;
            position: relative;
            overflow:hidden;
            .rule_btn{
                    width: 1.386667rem;
                    height: 1.386667rem;
                    position:fixed;
                    right: 0;
                    top: 2rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/zh_rule_btn.png?v=1.0) no-repeat;
                    background-size: cover; 
                    z-index: 99;
              }
              .rule_box{
                  width: 8.92rem;
                  height: 12.546667rem;
                  background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/zh_rule_box.png?v=1.0) no-repeat;
                  background-size: cover;
                  position:fixed;
                  top:0;left:0;
                  right:0;bottom:0;
                  margin: auto;
                  z-index: 100;
                  .close_btn{
                      width: .8rem;
                    height: .8rem;
                      position: absolute;
                      right: .78rem;
                      top: 1.09rem;
                  }
              }
              .top_bg{
                  width: 5.373333rem;
                  height: .986667rem;
                  margin: 0 auto .533333rem auto;
                  background:url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/zh_top_bg.png?v=1.0) no-repeat;
                  background-size: cover; 
              }
              .center_box{
                  width: 100%;
                  position: relative;
                  .kong_box{
                      width: 6.72rem;
                      height: 4.64rem;
                      background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/zh_kong_bg.png?v=1.0) no-repeat;
                      background-size: cover; 
                      margin: 3.44rem auto 0;
                  }
                  .ka_list{
                      width: 100%;
                      li{
                          width: 9.2rem;
                          height: 3.706667rem; 
                          margin-bottom: .84rem;
                          position: relative;
                          color: #c61400;
                          img{
                              width: 100%;
                              height: 100%;
                          }
                          p{
                              padding-left: .45rem;
                          }
                          .red_pack{
                              position: absolute;
                              bottom: .8rem;
                              left: 0;
                             margin-bottom: .1rem;
                             font-size: .32rem;
                             font-weight: 700;
                          }
                          .time{
                              position: absolute;
                              bottom: .3rem;
                              left: 0;
                              font-size: .293333rem;
                          }
                      }
                  }
              }
        }
        .mark_box{
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;right: 0;
            left: 0;bottom: 0;
            margin: auto;
            background: #300707;
            opacity: .8;
            z-index: 99;
        }
    }
</style>

