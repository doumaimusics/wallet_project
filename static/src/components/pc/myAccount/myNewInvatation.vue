<template>
  <div id="myInvite" v-loading.body="loading">
    <div class="top_box">
        <div class="title">累计奖励（含待发）<div class="title_content">{{userData.moneyTotal | returnFloat}}元</div></div>
        
        <ul class="user clear">
          <li class="fl">邀请人数：<span>{{userData.count}}人</span></li>
          <li class="fl">返现奖励(含待发)：<span>{{userData.newAward | returnFloat}}元</span></li>
        </ul>
        <!-- <div class="title">榜单奖励（上个月）
           <div class="title_content" v-if="userData.topNames.length == 0">无</div>
           <div class="title_content" v-else v-for="(item,index) in userData.topNames">{{item + (index == 0 ? '、':'')}}</div>
        </div> -->
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
        <div @click="changeTi(0)" :class="{activeTi:title[0]}" class="fl ti t1 activeTi">返现奖励<span v-if="userData.startTime">(12月1日之前邀请奖励，请登录APP查看)</span></div>
      </div>
        <div v-if="title[0]" class="from_box">
          <el-table :data="tableData1" class="home-el-table">
            <div slot="empty" class="table-empty"><img src="https://aliyunsso.edspay.com/web/myAccount/invatation/null-state_03.png"/></div>
              
              <div v-if="userData.list.length != 0">
                <el-table-column prop="inviteTime" align="center" label="注册时间"></el-table-column>
                <el-table-column prop="mobilePhone" align="center" label="好友"></el-table-column>
                <el-table-column prop="lendMoneySum" align="center" label="30天内累计出借金额（元）"></el-table-column>
                <el-table-column align="center" label="返现奖励（元）">
                    <template slot-scope="scope">
                      <new-invatation v-if="userData.list.length != 0" :scope="scope"></new-invatation>
                    </template>
                </el-table-column>
              </div>
              <div v-else>
                <el-table-column prop="inviteTime" align="center" label="注册时间"></el-table-column>
                <el-table-column prop="mobilePhone" align="center" label="好友"></el-table-column>
                <el-table-column prop="lendMoneySum" align="center" label="30天内累计出借金额（元）"></el-table-column>
                <el-table-column prop="remind" align="center" label="返现奖励（元）"></el-table-column>
              </div>
          </el-table>
          <!-- 分页 -->
          <div class="fenye" v-if="userData.list.length != 0">
            <el-pagination
              layout="prev, pager, next"
              @current-change="changePage1"
              :page-size="3" 
              :total="userData.list.length"
              :page-count="tab1.pages"
              :current-page="tab1.curpage">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import title from "../../public/account-title.vue"
    import getUrl from '../../../common/router/getUrl'           // 获取登录信息验证
    import newInvatation from './newInvatationList'           // 列表
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
            list:[]
          },
          userId:'',
          MobilePhone:'',
        }
      },
      components:{
        newInvatation
      },
      created () {
        this.getUI();
        this.getList();
      },
      methods: {
        toTips(row){
          global.http.post(this,"/activity/inviteNew/sendInviteMsg",{userId:row.userId},data => {
              if (data.data.resCode == 1) {
                  row.remind = 1;
                  this.$message({
                message: '已发送短信给您的好友',
                type: 'success'
              });
              }
          })
        },
        changePage1(val){
          this.tab1.curpage = val
          this.tableData1 = this.userData.list.slice(3*(val-1), 3*val)
        },
        changeTi(index){
          this.$set(this.title,0,0);
          this.$set(this.title,1,0);
          this.$set(this.title,index,1);
        },
        getList () {
          global.http.post(this,"/activity/inviteNew/getInviteDetails",{type:'detail'},data => {
            if (data.data.resCode == 1) {
              this.userData = data.data.resData;
              this.tableData1 = data.data.resData.list.slice(0, 3);
              this.tab1.pages = parseInt(this.tableData1/3);
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
              // this.userId = Base64.decode(data.data.resData.ui)

              this.MobilePhone = data.data.resData.realName ? data.data.resData.realName:data.data.resData.MobilePhone;
              this.MobilePhone = Base64.encode(this.MobilePhone);
              this.getImgUrl();
            }
          })
        },
        getImgUrl(){
            var that = this;
            var QRCode = require('qrcode');
            console.log(global.host+"invite/inviteRegister?ui="+this.userId + "&userName=" +this.MobilePhone);
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
      margin: 15px 0 2px 0;
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
        background: url('https://aliyunsso.edspay.com/web/myAccount/invatation/inviteActivity.png') no-repeat;
        background-size:  100% 100%;
        .yq_box,.byq_box{
          width: 306px;
          height: 100%;
          display: inline-block;
          // background: #ccc;
           // margin-right: -3px;   // 解决display: inline-block;间隙问题
        }
        .yq_box{
          margin-right: 15px;
          // background: url(https://aliyunsso.edspay.com/web/activity/newInvite/pcPageRevision/yq_bg.png?v=1.1) no-repeat;
          background-size: cover;
        }
        .byq_box{
          // background: url(https://aliyunsso.edspay.com/web/activity/newInvite/pcPageRevision/byq_bg.png) no-repeat;
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
        .ti{
          height:62px;
          font-size:16px;
          line-height:60px;
          margin:0 23px;
        }
        .activeTi{
          color:#333;
      font-size:20px;
      span{
        margin-left: 5px;
        color: #808080;
        font-size: 14px;
      }
        }
      }
      .from_box{
        margin-top: 5px;
        .home-el-table{
          border: 1px solid #E5E5E5;
          border-bottom: none;
        }
        .el-button{
          height:30px;
          width: 80px;
          border-radius: 4px;
          background:#FF5B4C;
          color: #fff;
        }
        .gray{
          background: #D0D0D0;
        }
        .moneyNum{
          background: rgba(0,0,0,0);
          color:#333;
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
