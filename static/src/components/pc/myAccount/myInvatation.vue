<template>
  <!-- 发财1.0 -->
  <div v-if="activityStatus ==2" id="myInvite" v-loading.body="loading">
    <div class="top_box">
        <div class="title">累计奖励（含待发）<div class="title_content">{{(userData.userByCommission + userData.awardSum) | returnFloat}}元</div></div>
        
        <ul class="user clear">
          <li class="fl">邀请人数（人）：<span>{{userData.inviteCount}}</span></li>
          <li class="fl">现金奖励（元）：<span>{{userData.awardSum | returnFloat}}</span></li>
          <li class="fl">佣金奖励（元）：<span>{{userData.userByCommission | returnFloat}}</span></li>
        </ul>
        <div class="title">榜单奖励（上个月）
           <div class="title_content" v-if="userData.topNames.length == 0">无</div>
           <div class="title_content" v-else v-for="(item,index) in userData.topNames">{{item + (index == 0 ? '、':'')}}</div>
        </div>
    </div>
    
    <router-link to="/inviteIndex"  class="content" tag="div">
      <div class="toActivity">
         <div class="yq_box"></div>
         <div class="byq_box"></div>
      </div>
      <div class="qCode" >
        <h3>活动详情</h3>
        <img id="imgSrc" :src="imgURL" alt="">
        <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/logo.png" alt="" class="logo">
        <p>感情好 扫一扫</p>
      </div>
    </router-link>
    <div class="fuzhi">
      <div class="manner">开通方式  复制以下链接，邀请好友点击链接，进行注册</div>
      <div class="invatation-link">
        <span>邀请链接:</span>
        <el-input v-model="linkInput" class="link-input aaa"></el-input>
        <div class="confirm-btn" v-clipboard:copy="linkInput" v-clipboard:success="onCopy">复制</div>
      </div>
      <h1 class="copy" v-show="copySuc">复制成功!</h1>
    </div>
    <div class="listBox">
      <div class="listTitle clear">
        <div @click="changeTi(0)" :class="{activeTi:title[0]}" class="fl ti t1">累计奖励</div>
        <div @click="changeTi(1)" :class="{activeTi:title[1]}" class="fl ti t2">榜单奖励</div>
      </div>
        <div v-if="title[0]" class="from_box">
          <el-table :data="tableData1" class="home-el-table">
            <div slot="empty" class="table-empty"><img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/></div>
            <el-table-column prop="mobilePhone" align="center" label="被邀请人"></el-table-column>
            <el-table-column prop="inviteTime" align="center" label="注册时间"></el-table-column>
            <el-table-column prop="cashMoney" align="center" label="现金奖励（元）"></el-table-column>
            <el-table-column prop="commission" align="center" label="所获佣金（元）"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="fenye" v-if="userData.listToCommission.length != 0">
            <el-pagination
              layout="prev, pager, next"
              @current-change="changePage1"
              :page-size="3" 
              :total="userData.listToCommission.length"
              :page-count="tab1.pages"
              :current-page="tab1.curpage">
            </el-pagination>
          </div>
        </div>
        <div v-else-if="title[1]" class="from_box">
          <el-table :data="tableData2" class="home-el-table">
            <div slot="empty" class="table-empty"><img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/></div>
            <el-table-column prop="bearTime" align="center" label="获奖时间"></el-table-column>
            <el-table-column prop="topPrize" align="center" label="奖励"></el-table-column>
            <el-table-column prop="topName" align="center" label="获奖榜单"></el-table-column>
            <el-table-column prop="top" align="center" label="名次"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="fenye" v-if="userData.listToTopMoney.length != 0">
            <el-pagination
              layout="prev, pager, next"
              @current-change="changePage2"
              :page-size="3" 
              :total="userData.listToTopMoney.length"
              :page-count="tab2.pages"
              :current-page="tab2.curpage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
  <new-invatation v-else></new-invatation>
</template>
<script>
    import title from "../../public/account-title.vue"
    import newInvatation from "./myNewInvatation.vue"
    import getUrl from '../../../common/router/getUrl'           // 获取登录信息验证
    import jiami from 'js-base64';
//    import clipboard from './clipboard.min'
    export default {
      mixins:[getUrl],
      components: {
        'ui-title': title
      },
      data () {
        return {
          title:[1,0],
          copySuc: false,
          imgURL:'',
          linkInput: '',
          tableData1:[],
          tableData2:[],
          tab1:{
            pages: 1,
            curpage: 1,
          },
          tab2:{
            pages: 1,
            curpage: 1,
          },
          loading:false,
          shadeBox:false,
          userData:{
            listToTopMoney:[],
            listToCommission:[]
          },
          userId:'',
          MobilePhone:'',
          activityStatus:1,
        }
      },
      created () {
        this.getUI();
        this.getList();
        this._getActivityTime('invite_activity_2_0_id');
      },
      components:{
        newInvatation,
      },
      methods: {
        _getActivityTime(activityId){// 获取活动时间状态
          this.notLogPost('/activity/two/getActivityTime',data => {
            if(data.resCode){
              this.activityStatus = data.resData.active;
              // this.activityStatus = 2;
            }
          },{activityId:activityId})
        },

        changePage1(val){
          this.tab1.curpage = val
          this.tableData1 = this.userData.listToCommission.slice(3*(val-1), 3*val)
        },
        changePage2(val){
          this.tab1.curpage = val
          this.tableData2 = this.userData.listToTopMoney.slice(3*(val-1), 3*val)
        },
        changeTi(index){
          this.$set(this.title,0,0);
          this.$set(this.title,1,0);
          this.$set(this.title,index,1);
        },
        getList () {
          global.http.post(this,"/invite/getNewPCInviteDetail",{},data => {
            if (data.data.resCode == 1) {
              this.userData = data.data.resData;
              this.tableData2 = data.data.resData.listToTopMoney.slice(0, 3);
              this.tableData1 = data.data.resData.listToCommission.slice(0, 3);
              this.tab1.pages = parseInt(this.tableData1/3)
              this.tab2.pages = parseInt(this.tableData2/3)
              console.log(this.userData)
            }
          })
        },
        getUI () {
          global.http.post(this,"/user/friend/userInvite",{},data => {
            if (data.data.resCode == 1) {
              let ui = data.data.resData.ui
              this.linkInput = 'https://'+window.location.host+'/#/activity/invitePc?ui='+ ui
              this.userId = data.data.resData.ui;
              this.MobilePhone = data.data.resData.MobilePhone;
              this.userId = Base64.decode(data.data.resData.ui)
              this.getImgUrl();
            }
          })
        },
        getImgUrl(){
            var that = this;
            var QRCode = require('qrcode');
            console.log(global.host+"invite/inviteRegister?ui="+this.userId);
            QRCode.toDataURL(global.host+"invite/inviteRegister?ui="+this.userId + "&userName=" +this.MobilePhone, {errorCorrectionLevel: 'H'}, function (err, url) {
                that.imgURL = url;
                // document.getElementById('imgSrc').src = url;
            })
        },
        onCopy (e) {
          this.copySuc = true
        },
      }
    }
</script>
<style lang="scss" scoped>
#myInvite.account-route{
  padding: 0;
  background: #F8F8F8;
}
  #myInvite{
    color:#333;
    .top_box{
      background: #fff;
      padding: 30px 0 35px 30px;
    }
    .title{
     font-size: 18px;
      color: #333333;
      .title_content{
        font-size: 24px;
        color: #FC4147;
        margin-top: 10px;
      }
    }
    .user{
      margin: 15px 0 42px 0;
      li{
        width:33.3%;
        font-size:16px;
        line-height:22px;
        color: #808080;
        span{
          color: #353535;
        }
      }
    }
    .content{
      margin:20px 0;
      /* background:url(https://aliyunsso.edspay.com/web/activity/newInvite/redBG.png) no-repeat;
      background-size:100% 100%;
      height:220px;
      width:830px; */
      height: 310px;
      position: relative;
      cursor: pointer;
      .toActivity{
        height:100%;
        width: 632px;
        float: left;
        font-size: 0; // 解决display: inline-block;间隙问题
        -webkit-text-size-adjust:none; // 解决display: inline-block;间隙问题
        .yq_box,.byq_box{
          width: 306px;
          height: 100%;
          display: inline-block;
          background: #ccc;
           margin-right: -3px;   // 解决display: inline-block;间隙问题
        }
        .yq_box{
          margin-right: 20px;
          background: url(https://aliyunsso.edspay.com/web/activity/newInvite/pcPageRevision/yq_bg.png?v=1.1) no-repeat;
          background-size: cover;
        }
        .byq_box{
          background: url(https://aliyunsso.edspay.com/web/activity/newInvite/pcPageRevision/byq_bg.png) no-repeat;
          background-size: cover;
        }
      }
      .qCode{
        height:100%;
        width:276px;
        float: right;
        background: #fff;
        text-align: center;
        
        h3{
          font-size: 20px;
          color: #333333;
          text-align: center;
          margin: 42px auto 24px;
        }
        #imgSrc{
          height:124px;
          width:124px;
          margin-bottom: 23px;
        }
        .logo{
          height:26px;
          width:26px;
          position: absolute;
          top:45%;
          left:84%;
        }
        p{
          font-size: 14px;
color: #333333;
        }
      }
    }
    .manner{
      font-size: 20px;
      color: #333333;
      padding:0 0 20px 0;
      font-family: DIN-Medium;
    }
    .fuzhi{
      background: #fff;
      margin-bottom: 20px;
      padding: 30px;
      .invatation-link {
       /*  display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center; */
        position: relative;
      }
      .invatation-link span {
        font-size: 20px;
        color: #333333;
        padding-right: 14px;
      }
      
      .confirm-btn{
        margin-top: 0;
        background: #fff;
        font-size: 18px;
        color: #FF3A40;
        width: 137px;
        height: 54px;
        line-height: 54px;
        border: 1px solid #FF3A40;
        border-radius: 2px;
        position: absolute;
        top: 0;
        right: 0;
      }
      .copy {
        font-size: 14px;
        color: #7dc6fd;
        padding-left: 90px;
        /*padding-bottom: 20px;*/
      }
    }
    
    .listBox{
      background: #fff;
      padding: 0 20px 30px;
      .listTitle{
        border-bottom: 1px solid #E5E5E5;
        .ti{
          height:62px;
          font-size:16px;
          line-height:60px;
          margin:0 23px;
        }
        .activeTi{
          color:#FC4147;
          border-bottom:2px solid #FF3E41;
        }
      }
      .from_box{
        margin-top: 30px;
        .home-el-table{
          border: 1px solid #E5E5E5;
          border-bottom: none;
        }
        .fenye{
            margin-bottom:0;
        }
      }
    }
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
