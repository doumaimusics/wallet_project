<template>
  <div id="wxPrizeList">
      <div class="main">
        <!-- 列表 -->
        <div class="list_box">
          <!-- 无内容展示 -->
          <div class="null_box" v-if="getActivityRankList.length == 0">
             <img src="https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/null_bg.png?v=1.0" alt="">
             <p>亲！快去邀请好友赢得3280元云南双人游吧~</p>
          </div>

          <!-- 有内容展示 -->
          <ul class="list_conte_box" v-else>
              <li v-for="(val,index) in getActivityRankList">
                <span class="order">{{val.rank}}</span>
                <span class="timer">{{val.finishTimeStr}}</span>
                <span class="phone">{{val.mobilePhone}}</span>
                <span class="result" v-if="val.finishStatus == 1">完成开户30人</span>
                <span class="result" v-else-if="val.finishStatus == 2">完成出借15人</span>
              </li>
          </ul>
        </div>


        <!-- 底部 -->
        <div class="bottom_bg">
          <!-- 底部未登录 -->
          <div class="no_login_conte" v-if="!userId && !getCookie('userToken')" >
              <span>请登录后查看个人排名</span>
              <div class="login_btn" @click="toLogIn"></div>
          </div>
          <!-- 底部未有排名 -->
          <div class="login_conte" v-else-if="finishStatus == 0">
              <span>您当前尚未获得排名</span>
              <div class="Invite_btn" @click="inviteShare"></div>
          </div>
          <!-- 底部已经完成 -->
          <div class="accomplish_conte" v-else>
             <p><span>{{phoneTel}}</span>您的任务排名：<span class="text1">{{rank}}</span></p>
             <p>
               完成时间：<span class="text2">{{finishTime}}</span>完成方式：
               <span v-if="this.finishStatus == 1">完成开户30人</span>
               <span v-else-if="this.finishStatus == 2">完成出借15人</span>
               
             </p>
          </div>
        </div>

         <!--点击分享的-->
			  <div :class="{layer:popUp == 1}" v-if="popUp" @click="popUp = 0" class="zIndex" v-layer></div>
      </div>
  </div>
</template>

<script>
   import wxShare from '../../../../common/wx/wxShare';
   import { MessageBox } from 'mint-ui';
   export default {
     mixins:[ wxShare ],
     data(){
       return{
          popUp:0,   //弹窗   1、引导图
          activityTime:0, // 活动时间 1活动进行中 2活动未开启 3活动已结束 4活动失效
          getActivityRankList:[],  // 列表
          phoneTel:'',   // 个人电话号码
          finishStatus:0,  // 个人完成情况
          finishTime:'',  // 个人完成时间
          rank:0,  //   个人排名 
          // rankTwo:0,  // 所有人的排名
          shareObj: { //分享标题内容配置
            title: "快，去往云南的航班正在登机…", //标题
            desc: "我的3280元云南游还缺个伴，E起双飞吗？", //内容
            link: global.host + "wx/wxInviteSharePage", //链接
            imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
          },
          //  适配iPhoneX 添加的行内样式fullHeight imgBox
				// fullHeight:{
				// 	height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
				// }
       }
     },

     methods:{
        toLogIn(){   // 跳转登录页面
           this.toApp('LG',{
             path:'/wxLogin',
             query:{
               thisUrl:this.$route.fullPath
             }
           })
        },

        timeLimit(){   // 活动时间
          this.notLogPost('/activity/ynlxq/getActivityTime', (data) => {
            if(data.resCode == 1){
              this.activityTime = data.resData.active;
              if(data.resData.active == 2){
                MessageBox.alert('亲，活动尚未开始哦!', '提示', {confirmButtonClass:'confirmButtonClass'});
              } else if(data.resData.active == 3) {
                MessageBox.alert('该活动已结束请参与平台其他优惠活动!', '提示', {confirmButtonClass:'confirmButtonClass'});
              } else if(data.resData.active == 4){
                MessageBox.alert('活动已失效!', {confirmButtonClass:'confirmButtonClass'})
              }
            }
          },{},1)
        },

        getActivityRank(){  // 获得旅行券名单列表
           this.notLogPost('/activity/ynlxq/getActivityRankList', (data) => {
               console.log(data)
               if(data.resCode == 1){
                 this.getActivityRankList = data.resData.list;
               }
           }, {},1)
        },

        getUserInvite(){   // 底部个人获奖情况
          if(this.activityTime == 2){
              MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
          } else if(this.activityTime == 3){
              MessageBox.alert('该活动已结束请参与平台其他优惠活动!', {confirmButtonClass:'confirmButtonClass'})
          } else if(this.activityTime == 4){
              MessageBox.alert('活动已失效!', {confirmButtonClass:'confirmButtonClass'})
          } else {
              if( this.userId || this.getCookie('userToken') ){   // 已登录
                  this.getAppData('/activity/ynlxq/getUserInvite', (data) => {
                      console.log(data);
  　　　　　　　　　　　　if(data.resCode == 1){
                          this.phoneTel = data.resData.mobilePhone;  // 个人电话号码
                          this.finishStatus = data.resData.finishStatus; // 个人完成情况 1-开户30人 2-出借15人
                          this.finishTime = data.resData.finishTime;  // 个人完成时间
                          this.rank = data.resData.rank;   // 个人排名
                          this.shareObj.link = global.host + "wx/wxInviteSharePage?userPhone="+data.resData.mobilePhone+'&channel=yunnanticket';  // 分享连接带电话  channel=yunnanticket活动注册得活动来源名称
                          this.getWxShareData(this.shareObj); //分享调用
                      }　　　
                  },(this.osType ? {}:{}))
              } 
          }
      },
         
        inviteShare(){    // 底部邀请分享按钮事件
          _czc.push(﻿["_trackEvent", "畅游云南", "邀请按钮"]); //  友盟统计配置
          if(this.activityTime == 2) {
              MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'});
          } else if(this.activityTime == 3) {
              MessageBox.alert('该活动已结束请参与平台其他优惠活动!', {confirmButtonClass:'confirmButtonClass'});
          } else if(this.activityTime == 4){
              MessageBox.alert('活动已失效!', {confirmButtonClass:'confirmButtonClass'})
          } else {
              if(this.osType) {
                  this.isLogPassValue(this.appShare)
              } else {
                  this.popUp = 1;
              }
          }
        },
     },
     mounted(){
       $('html','body').css({'width':'100%','height':'100%'});   // 固定定位底部是兼容iphoneX
       this.getUserInvite();
       // 友盟数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1273337759&web_id=1273337759 '
			script.language = 'JavaScript'
			document.body.appendChild(script)
     },
     created(){
       this.timeLimit(); // 活动时间
       this.getActivityRank(); // 获得旅行券名单
     },
     watch:{
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

<style>
.confirmButton,
	.cancelButton,.confirmButtonClass {
		font-size: 0.48rem !important;
    }
</style>
<style lang="scss" scoped>
      html,body{
          width: 100%;
          height: 100%;
      }
    .zIndex{
      z-index: 99 !important;
      left:0 !important;
    }
  #wxPrizeList{
    overflow: hidden;
    font-family: PingFang-SC-Regular;
    position: relative;
    .main{
      width: 100%;
      height: 17.786667rem;
      background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/prize_bg.png?v=1.0') no-repeat;
      background-size: cover;
      position: relative;
      padding: 2.986667rem .4rem 0rem .4rem;
      .list_box{
        width: 9.2rem;
        height: 13.466667rem;
        overflow: hidden;
        .null_box{
          text-align: center;
          padding-top: 2rem;
          img{
            width: 3.906667rem;
            height: 3.346667rem;
            margin-bottom: .6rem;
          }
          p{
            font-size: .346667rem;
            color: #6c0900;
          }
        }
        .list_conte_box{
          width: 100%;
          height: 100%;
          overflow: auto;
          li{
            width: 100%;
            height: 1.066667rem;
            font-size: .346667rem;
            color: #6C0900;
            margin-bottom: .466667rem;
            span{
              text-align: center;
              float: left;
            }
            .order{
              width: 14%;
              font-size: .373333rem;
              font-family: DIN-Bold;
              line-height: 1rem;
            }
            .timer{
              width: 25%;
            }
            .phone{
              width: 30%;
              line-height: 1rem;
            }
            .result{
              width: 30%;
              padding-left: .3rem;
              line-height: 1rem;
            }
          }
        }
      }
      .bottom_bg{
        width: 100%;
        height: 1.6rem;
        position: fixed;
        bottom: 0;
        left: 0;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/prize_botton.png?v=1.0') no-repeat;
        background-size: cover;
        .no_login_conte,.login_conte,.accomplish_conte{
            width: 100%;
            height: 100%;
            position: relative;
        }
        .no_login_conte,.login_conte{
          .login_btn,.Invite_btn{
            width: 4rem;
            height: 1.053333rem;
            position: absolute;
            top: 0;right:.4rem;
            bottom: 0;
            margin: auto;
          }
          .login_btn{
             background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/login_btn.png?v=1.0') no-repeat;
             background-size: cover;
          }
          .Invite_btn{
            background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/invite_btn2.png?v=1.0') no-repeat;
             background-size: cover;
          }
          span{
            line-height: 1.6rem;
            margin-left: .666667rem;
            font-size: .346667rem;
            color: #FFFFFF;
          }
        }
        .accomplish_conte{
          padding: .266667rem 0 0 .666667rem;
          color: #fff;
          font-size: .346667rem;
          p{
            margin-bottom: .14rem;
            .text1{
              margin-left: .133333rem;
              font-size: .373333rem;
            }
            .text2{
              margin-right: .8rem;
            }
          }
        }
      }
      .layer {
				background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/fenxiang.png?v=1.0) no-repeat;
				background-size: 100%;
			}
    }
  }
</style>

