<template>
    <div id="main">
        <div v-title>余额智投</div>
        <!-- banner -->
        <div class="banner_box">
            <!-- <router-link tag="div" :to="{path:'/wxMyAccount/wxInvestListIn/wxInvestManage',query:{choose:1}}" class="zt_btn" ></router-link> -->
            <div class="zt_btn" @click="towxInvestManage"></div>
        </div>

        <!-- 开通提示 -->
        <div class="hint_box">
            已有<span>{{initShowData.autoCount}}</span>用户开启余额智投服务
        </div>

        <!-- 条件部分 -->
        <div class="loan_part">
            <!-- 出借方式 -->
            <div class="loan_box bdr-b">
                <div class="left_text">出借方式</div>
                <div class="right_text">单次出借</div>
                <div class="hint_icon" @click="invest.isShow = true"></div>
            </div>

            <!-- 出借金额 -->
            <div class="loan_box bdr-b">
                <div class="left_text">出借金额(元)</div>
                <div class="right_text">
                    <input type="number" v-model="investMoney" placeholder="100元起" v-if="initShowData.openStatus == 0 || pageStatus == 2">
                    <span v-else>{{initShowData.money}}</span>
                    <div class="clear_icon" v-if="investMoney && pageStatus == 2" @click="investMoney = ''"></div>
                </div>
            </div>

            <!-- 出借项目 -->
            <div class="loan_box bdr-b" @click="investPop">
                <div class="left_text">出借项目</div>
                <div class="right_text">
                      <span v-if="initShowData.openStatus == 0 || pageStatus == 2">
                          {{investTime}}
                          <i class="arrows_icon" v-if="investTime == '请选择' || this.pageStatus == 2"></i>
                      </span>
                      <span v-else>E计划-{{initShowData.timeLimit}}天</span>

                </div>
            </div>

            <!-- 是否使用红包 -->
            <div class="loan_box" :class="{bdr_b:initShowData.openStatus == 1 && pageStatus == 1}">
                <div class="left_text">使用红包</div>
                <div class="hint_icon" @click="redPacket.isShow = true"></div>
                <div class="right_text">
                     <div class="switch_box" v-if="initShowData.openStatus == 0 || pageStatus == 2" :class="{hidden:isOnOff == false}" @click="isOnOff = !isOnOff">
                         <div class="switch"></div>
                     </div>
                     <span v-else>{{initShowData.redStatus == 0 ? '不使用' : '使用'}}</span>
                </div>
            </div>

            <!-- 已开启协议展示位置 -->
            <div class="loan_box" v-if="initShowData.openStatus == 1 && pageStatus == 1">
                <div class="left_text">协议</div>
                <div class="right_text">
                    <router-link tag="span" to="/wxMyAccount/wxRemainingInvest/agreement"  class="xieyi_text">《余额智投服务协议》</router-link>  
                </div> 
            </div>
        </div>

        <!-- 开启按钮 && 保存修改按钮 -->
        <div class="open_btn_box" v-if="initShowData.openStatus == 0 || pageStatus == 2">
            <!-- 协议 -->
            <div class="protocol_box">
                 <img :src="isCheak == true ? 'https://aliyunsso.edspay.com/web/wx/pointToPoint/check.png' : 'https://aliyunsso.edspay.com/web/wx/pointToPoint/uncheck.png'" alt="" @click="isCheak = !isCheak">我已同意<router-link to="/wxMyAccount/wxRemainingInvest/agreement"  tag="i">《余额智投服务协议》</router-link>
            </div>
            <!-- 开启按钮 -->
            <div class="btn" :class="{openColor:investMoney && investTime !== '请选择' && isCheak}" @click="openServe" v-if="pageStatus == 1">开启服务</div>
            <!-- 保存按钮 -->
            <div class="btn" :class="{openColor: (investMoney && isCheak && investMoney != compareMoney) || (investMoney && isCheak && investTime != investTimeBj) || (investMoney && isCheak && isOnOff == !initShowData.redStatus)}"  @click="preserveBnt" v-else-if="pageStatus == 2">保存修改</div>
            <router-link tag="div" to="/wxMyAccount/wxRemainingInvestExplain" class="remaining_explain">什么是余额智投？</router-link>
        </div>
        <!-- 底部按钮 -->
        <div class="bottom_btn_box" v-else>
            <div class="left_btn" @click="closePop.isShow = true">关闭服务</div>
            <div class="right_btn" @click="modification">修改</div>
        </div>

        <!-- 未开启弹框 -->
        <address-diallog v-if="initShowData.tenderStatus == 0" :showThis="openPop" :textShow="3" :btnText="openPop.btn"  :btn="1" :btnCli="1" :doOther="toMyAccount" :confirmBtn="toInvest"  :text="openPop.txt"></address-diallog>

        <!-- 出借方式弹框 -->
        <address-diallog v-show="invest.isShow" :showThis="invest" :textShow="3" :btnText="invest.btn" :btn="2" :confirmBtn="investHide" :text="invest.txt"></address-diallog>

        <!-- 红包弹框 -->
        <address-diallog v-show="redPacket.isShow" :showThis="redPacket" :textShow="3" :btnText="redPacket.btn" :btn="2" :confirmBtn="redPacketHide" :text="redPacket.txt"></address-diallog>

        <!-- 关闭原因弹框 -->
        <div v-layer v-if="closePop.isShow">
            <div class="close_cause_box" >
                <h3 class="top_title">请选择关闭原因</h3>
                <p class="top_txt">关闭后，您的资金容易站岗哦</p>
                <ul>
                    <li v-for="(item,index) in closeCause" class="clear bdr-b" @click="selectCause(index,item,closeCause,1)">
                      <div>
                        <p class="p_text">{{item.text}}</p>
                        <div class="select_box" :style="{background:item.selet === true ? 'url(https://aliyunsso.edspay.com/web/wx/remainingInvest/select_icon2.png?v=1.0) no-repeat' : 'url(https://aliyunsso.edspay.com/web/wx/remainingInvest/select_icon1.png?v=1.0) no-repeat'}"></div>
                      </div>
                    </li>
                </ul>
                <div class="close_cause_btn clear">
                    <div class="left_btn" @click="affirmClose">确认关闭</div>
                    <div class="right_btn" @click="considerBtn">考虑一下</div>
                </div>
            </div>
            
        </div>

        <!-- 出借项目弹框 -->
         <mt-popup v-model="isUp" position="bottom" :closeOnClickModal="false" style="width:100%">
             <div class="invest_box">
                 <div class="title">选择出借项目</div>
                 <div class="close_icon" @click="isUp = false"></div>
                 <ul>
                     <li class="clear bdr-b" v-for="(val,index) in investList">
                         <div v-if="chooseData.maxTime >= val.numbers "  @click="selectCause(index,val,investList,2)">
                              <p class="p_text">{{val.text}}</p>
                              <div class="select_box" :style="{background:val.selet == true ? 'url(https://aliyunsso.edspay.com/web/wx/remainingInvest/select_icon2.png?v=1.0) no-repeat' : 'url(https://aliyunsso.edspay.com/web/wx/remainingInvest/select_icon1.png?v=1.0) no-repeat'}"></div>
                         </div>
                         <div v-else>
                              <p class="p_text" style="color: #808080;">{{val.text}}<i>（超出风险承受，<router-link to="/wxRiskAssessment" tag="span" style="color: #689CF0;">重新测评</router-link>）</i></p>  
                         </div>
                          
                    </li>
                 </ul>
             </div>
         </mt-popup>
    </div>
</template>

<script>
import wxToapp from "../../../../common/wx/wxToapp";
import addressDiallog from "../../member/invest/wxPublicDialog";
import verify from '../../../../common/wx/verification';	//引入表单验证
import { Toast, Popup } from "mint-ui";
export default {
  mixins: [wxToapp,verify],
  data() {
    return {
      initShowData:{},  // 初始化展示数据

      investMoney:null,    // 出借金额

      compareMoney:0,   // 金额比较值

      openPop: {     // 开启服务弹框
        btn: ["知道了", "去出借"],
        txt: "余额智投只针对出借过E计划的用户哦，出借完成后可开启服务。"
      },

      invest: {    // 出借方式弹窗
        isShow: false,
        btn: "确定",
        txt:
          "开启服务后，系统只会按照出借金额自动出借一次，出借完成后系统自动为您关闭此功能。"
      },

      redPacket: {  // 红包弹框
        isShow: false,
        btn: "确认",
        txt:
          "系统根据您账户中可用的红包情况自动筛选收益最高的红包或加息券进行使用。若关闭则不会使用红包。"
      },
      
      closePop: {   // 关闭原因弹框
        isShow: false
      },

      closeCause: [   // 关闭原因数据
        {
          text: "速度太慢，抢不到",
          selet: false
        },
        {
          text: "没兴趣",
          selet: false
        },
        {
          text: "体验不太好",
          selet: false
        },
        {
          text: "资金另有用处",
          selet: false
        },
        {
          text: "其他",
          selet: false
        }
      ],

      closeCauseText: "", // 关闭原因传给后台

      investTime:"请选择",  

      investTimeBj:'',

      timeLimit:'',  // 出借项目期限传给后台

      isUp: false, // 出借项目弹框

      investList: [    // 投资计划数据
           {
              text:'E计划-30天',
              selet:false,
              numbers:30
          },
          {
              text:'E计划-60天',
              selet:false,
              numbers:60
          },
          {
              text:'E计划-90天',
              selet:false,
              numbers:90
          },
          {
              text:'E计划-180天',
              selet:false,
              numbers:180
          },
          {
              text:'E计划-360天',
              selet:false,
              numbers:360
          }

      ],

      isOnOff:true,   // 按钮开关

      isCheak:true,   // 协议开关

      pageStatus:1,   //   1开启、  2修改

      chooseData:{},  // 选择借期限数据

     
    };
  },
  computed:{
			isLogin:{
				get(){
					if(this.getCookie('userToken')) return true;
					else return false;
				},
				set(){}
			}
		},
  methods: {

    initData(){    // 初始化数据
      this.getNotlogData('/autoPlanTender/show' ,(data) => {
        console.log(data)
        if(data.resCode == 1){
            this.initShowData = data.resData;
            // this.investMoney = this.initShowData.money == 0 ? '100元起' : this.initShowData.money;
            // this.investTime = this.initShowData.timeLimit == '0' ? '请选择' : 'E计划-'+this.initShowData.timeLimit+'天';
            // this.isOnOff = this.initShowData.redStatus == 1 ? true : false;
            this.timeLimit = this.initShowData.timeLimit;            
            this.setCookie('bkOpenStatus',data.resData.bankOpenStatus)   // 判断是否开通存管  0表示都未开通，1表示开通新浪，2表示开通浙商，3表示都开通
            console.log(this.initShowData)
        }

      },{})
    },

    openServe(){   // 点击开启服务
       if(!this.investMoney || !this.isCheak || this.investTime == '请选择'){
          return false;
       } else {
         if(this.isFormat(this.investMoney,'输入金额格式错误！','positiveReg',1)) return;
          this.getNotlogData('/autoPlanTender/open', (data) => {
            console.log(data)
            if(data.resCode == 1){
               if(Number(this.investMoney) < 100){
                    Toast({message: "出借金额小于100元",duration: 2000});
               } else {
                    Toast({message: "余额智投服务开启成功",duration: 2000});
                    this.pageStatus = 1;
                    this.initData();
               }
            }
          },{
             money:this.investMoney,
             redStatus: this.isOnOff == true ? 1 : 0,
             timeLimit: this.timeLimit,
             type:0    // 这次需求只做了单次出借功能，所以写死。以后有其他出借方式在做修改
          })
       }
    },

    modification(){   // 点击修改
        this.pageStatus = 2;
        this.investMoney = this.initShowData.money;  // 出借金额
        this.compareMoney = this.initShowData.money;
        this.investTime = 'E计划-'+this.initShowData.timeLimit+'天';  // 出借项目
        this.investTimeBj = 'E计划-'+this.initShowData.timeLimit+'天';
        this.isOnOff = this.initShowData.redStatus;   // 红包使用状态
    },

    preserveBnt(){   // 点击保存按钮
        if((this.investMoney == this.compareMoney || !this.investMoney || !this.isCheak) && (this.investTime == this.investTimeBj || !this.isCheak) && (this.isOnOff == this.initShowData.redStatus || !this.isCheak)){
             return false;
        } else {
          if(this.isFormat(this.investMoney,'输入金额格式错误！','positiveReg',1)) return;
            this.getNotlogData('/autoPlanTender/modifier', (data) => {
                console.log(data)
                if(data.resCode == 1){
                    if(Number(this.investMoney) < 100){
                      Toast({message: "出借金额小于100元",duration: 2000});
                    } else {
                      Toast({message: "修改成功。",duration: 2000});
                      this.pageStatus = 1;
                      this.initData();
                    }
                }
            },{
                money:this.investMoney,
                redStatus: this.isOnOff == true ? 1 : 0,
                timeLimit: this.timeLimit,
                type:0    // 这次需求只做了单次出借功能，所以写死。以后有其他出借方式在做修改
            }) 
        }
    },

    investPop(){    //出借项目点击事件
      if(this.initShowData.openStatus == 0 || this.pageStatus == 2){
         this.getNotlogData('/autoPlanTender/choose', (data) => {
           if(data.resCode == 1){
              this.chooseData = data.resData.model;
              this.isUp = true;
           }
         },{})
         
      } else {
         return false;
      }
    },

    toMyAccount() {   // 跳转我的页面
      if(this.$route.query.sourceUrl == 1){
        this.$router.push({
          path: "/wxInvest",
          query: this.$route.query
        });
      } else {
        this.$router.push({
          path: "/wxMyAccount",
          query: this.$route.query
        });
      }
    },

    toInvest() {    // 跳转出借页面
      this.$router.push({
        path: "/wxInvest",
        query: this.$route.query
      });
    },

    investHide() {
      this.invest.isShow = false;
    }, // 关闭出借方式弹框

    redPacketHide() {
      this.redPacket.isShow = false;
    }, //关闭红包弹框

    selectCause(index, item, arr, n) {   // 关闭原因选择  和  出借项目的选择事件
      arr.forEach( i => {
        if (i.selet !== arr[index].selet) {
          i.selet = false;
        }
      });
      item.selet = !item.selet;
      if (item.selet == false) {
          if(n == 1){
            this.closeCauseText = "";
          } else if(n == 2){
            this.investTime = "请选择";
          }
      } else {
          if(n == 1){
            this.closeCauseText = arr[index].text;
          } else if(n == 2){
            this.investTime = arr[index].text;
            this.timeLimit = arr[index].numbers;
            this.isUp = false;
          }
         
      }
    },

    affirmClose() {    // 点击确认关闭
      if (this.closeCauseText == "") {
        Toast({
          message: "请选择关闭原因",
          duration: 2000
        });
      } else {
        this.getNotlogData('/autoPlanTender/close', (data) => {
            if(data.resCode == 1){
               Toast({message:'关闭成功。',duration:200});
               this.pageStatus = 1;
               this.investMoney = null;  // 出借金额
               this.investTime = '请选择';  // 出借项目
               this.isOnOff = true;
               this.investList.forEach(val => {   // 清空出借选择
                  if (val.selet == true) {
                    val.selet = false;
                  }
               });
               this.initData();  // 初始化
               this.investPop();
            }
        },{reason:this.closeCauseText})
        this.considerBtn();
      }
    },

    considerBtn() {     // 点击考虑一下
      this.closePop.isShow = false;
      this.closeCause.forEach(val => {
        if (val.selet == true) {
          val.selet = false;
        }
      });
    },

    towxInvestManage(){   // 跳转出借记录
         if(!this.isLogin) {
            this.$router.push({
              path:'/wxLogin',
						  query:{thisUrl:'/wxMyAccount/wxRemainingInvest'}
            })
         } else {
            this.$router.push({
              path:'/wxMyAccount/wxInvestListIn/wxInvestManage',
              query:{choose:1}
            })
         }
    }

  },
  created() {
    this.initData();  // 初始化
  },
  mounted() {
    if(!this.isLogin){
        this.$router.push({
          path:'/wxLogin',
          query:{thisUrl:'/wxMyAccount/wxRemainingInvest'}
        })
    }
  },
  components: {
    addressDiallog
  },
  watch:{
  }
};
</script>

<style lang="scss" scoped>
#main {
  width: 100%;
  overflow: hidden;
  .banner_box {
    width: 100%;
    height: 2.266667rem;
    background: url(https://aliyunsso.edspay.com/web/wx/remainingInvest/banner.png?v=1.0)
      no-repeat;
    background-size: 100% 100%;
    position: relative;
    .zt_btn{
      width: 1.866667rem;
      height: .6rem;
      position: absolute;
      top: .266667rem;
      right: .4rem;
      background: url(https://aliyunsso.edspay.com/web/wx/remainingInvest/investBtn.png?v=1.0) no-repeat;
      background-size: cover;
    }
  }
  .hint_box {
    width: 100%;
    height: 0.866667rem;
    background: #fff;
    margin-bottom: 0.28rem;
    font-size: 0.346667rem;
    color: #333;
    padding-left: 0.4rem;
    line-height: 0.866667rem;
    span {
      color: #ff5f50;
    }
  }
  .hint_box::before {
    content: "";
    width: 0.373333rem;
    height: 0.373333rem;
    display: inline-block;
    margin-right: 0.266667rem;
    background: url(https://aliyunsso.edspay.com/web/wx/remainingInvest/horm_icon.png?v=1.0)
      no-repeat;
    background-size: cover;
    vertical-align: text-bottom;
    margin-bottom: 0.015rem;
  }
  .loan_part {
    background: #fff;
    width: 100%;
    margin-bottom: 1.053333rem;
    padding-left: 30px;
    .loan_box {
      width: 100%;
      height: 1.466667rem;
      position: relative;
      line-height: 1.466667rem;
      padding-right: 0.4rem;
      .left_text {
        width: 40%;
        color: #333;
        float: left;
      }
      .right_text {
        width: 60%;
        height: 100%;
        float: right;
        text-align: right;
        color: #808080;
        position: relative;
        font-size: 0.346667rem;
        input {
          width: 80%;
          height: 100%;
          text-align: right;
          color: #808080;
          
        }
        .clear_icon{
          width: .533333rem;
          height: .533333rem;
          background: url(https://aliyunsso.edspay.com/web/wx/login/login_1/delete.png?v=1.0) no-repeat;
          background-size: cover; 
          float: right;
          margin-top: .47rem;
          margin-left: .293333rem;
        }
        .arrows_icon {
          width: 0.373333rem;
          height: 0.373333rem;
          display: inline-block;
          background: url(https://aliyunsso.edspay.com/web/wx/remainingInvest/more_icon.png?v=1.0)
            no-repeat;
          background-size: cover;
          vertical-align: baseline;
          margin-bottom: -0.05rem;
        }
        .switch_box {
          width: 1.36rem;
          height: 0.826667rem;
          border-radius: 1.066667rem;
          background: #4cd964;
          position: relative;
          float: right;
          margin-top: 0.333333rem;
          .switch {
            width: 0.746667rem;
            height: 0.746667rem;
            background: #fff;
            border-radius: 50%;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0.04rem;
            margin: auto;
            transition: all .2s linear;
          }
        }
        .switch_box.hidden {
          background: #e5e5e5;
          .switch {
            right: 0.573333rem;
            transition: all .2s linear;
          }
        }
        .xieyi_text {
          font-size: 0.32rem;
          color: #508cee;
        }
      }
      .hint_icon {
        width: 0.4rem;
        height: 0.4rem;
        background: url(https://aliyunsso.edspay.com/web/wx/remainingInvest/yiwen.png?v=1.0)
          no-repeat;
        background-size: cover;
        position: absolute;
        left: 2rem;
        top: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }

  .open_btn_box {
    padding: 0 0.613333rem;
    .protocol_box {
      text-align: center;
      font-size: 0.293333rem;
      color: #a3a3a4;
      margin-bottom: 0.253333rem;
      img {
        width: 0.32rem;
        height: 0.32rem;
        margin-right: 0.146667rem;
        vertical-align: middle;
        margin-bottom: 0.1rem;
      }
      i {
        color: #538dee;
      }
    }
    .btn {
      width: 100%;
      height: 1.066667rem;
      background: #ffcecc;
      font-size: 0.426667rem;
      color: #ffffff;
      text-align: center;
      line-height: 1.066667rem;
      margin-bottom: 0.4rem;
      border-radius: 0.106667rem;
    }
    .btn.openColor {
      background: #ff5b4c;
    }
    .remaining_explain {
      color: #508cee;
      font-size: 0.32rem;
      text-align: center;
    }
  }
  .bottom_btn_box {
    width: 100%;
    height: 1.306667rem;
    box-shadow: 0 0 0.16rem 0 rgba(0, 0, 0, 0.12);
    position: fixed;
    bottom: 0;
    left: 0;
    .left_btn,
    .right_btn {
      width: 50%;
      height: 100%;
      float: left;
      text-align: center;
      line-height: 1.306667rem;
      font-size: 0.426667rem;
    }
    .left_btn {
      color: #333;
      background: #fff;
    }
    .right_btn {
      color: #fff;
      background: #ff5b4c;
    }
  }

//   关闭原因弹窗列表  &&  出借项目列表  样式
  .close_cause_box ul,
  .invest_box ul {
    li {
      position: relative;
     
      font-size: 0.373333rem;
      color: #333333;
      div{
          padding: 0.293333rem 0 0.32rem;
          .p_text {
            width: 85%;
          }
          .select_box {
            width: 0.533333rem;
            height: 0.533333rem;
            background-size: 100% !important;
            position: absolute;
            right: 0;
            top: 0.293333rem;
          }
      }
      
    }
    li:last-child.bdr-b:after {
      border: none;
    }
  }

  //   关闭原因弹窗样式
  .close_cause_box {
    width: 7.333333rem;
    height: 9.746667rem;
    background: #fff;
    border-radius: 0.266667rem;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    padding: 0.4rem 0.4rem 0.506667rem;
    .top_title {
      font-size: 0.453333rem;
      color: #333333;
      text-align: center;
      margin-bottom: 0.133333rem;
    }
    .top_txt {
      font-size: 0.346667rem;
      color: #808080;
      text-align: center;
      margin-bottom: 0.426667rem;
    }
    ul {
      margin-bottom: 0.346667rem;
    }
    .close_cause_btn {
      width: 100%;
      overflow: hidden;
      .left_btn,
      .right_btn {
        width: 2.986667rem;
        height: 0.96rem;
        line-height: 0.96rem;
        text-align: center;
        border-radius: 0.106667rem;
        font-size: 0.426667rem;
      }
      .left_btn {
        float: left;
        border: 1px solid #ff5b4c;
        color: #ff5b4c;
      }
      .right_btn {
        float: right;
        background: #ff5b4c;
        color: #fff;
      }
    }
  }

  //   出借项目弹框
  .invest_box {
    width: 100%;
    position: relative;
    padding: .666667rem .533333rem 0;
    .title{
        font-size: .426667rem;
        color: #333333;  
        text-align: center;
        margin-bottom: .373333rem;
    }
    .close_icon{
        width: .36rem;
        height: .36rem;
        position: absolute;
        top: .533333rem;
        right: .533333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/remainingInvest/guanbi.png?v=1.0) no-repeat;
        background-size: 100% 100%;
    }
  }

  .bdr_b:after {
    height: 1px;
    content: '';
    width: 100%;
    border-bottom: 1px solid #e5e5e5;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: scaleY(0.5);
    -webkit-transform: scaleY(0.5);
    z-index: 2;
}
}
</style>

