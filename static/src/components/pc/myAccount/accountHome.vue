<template>
  <div v-loading.body="loading" class="accountHome">
    <!-- <div class="tips" v-if="balance && sinaTotalMoney!='0'">
          <i class="iconfont">&#xe67c;</i>
          余额转移功能上线，将普通账户可用余额转移到存管账户，可免手续费哦
          <div class="btn">
              <router-link to="/moneyTransfer" target="_blank">
                余额转移
              </router-link>
          </div>
      </div> -->
    <!--账户首页上部分-->
    <div class="home-top">
      
        <div>
          <!-- 标题 -->
              <div class="home-title">账户信息 <span v-if="gift" class="VipBenefitsBtn" @click="$router.push('/myAccount/VipBenefits')"></span></div>
              <!--总资产-->
              <div class="home-allCash">
                <h1>总资产(元)</h1>
                <i @click="hideCash" :class="{hideCash: isHide}"></i>
                <h2 v-if="isHide">*** ***
                  <router-link to="/myAccount/accountAsset">
                    <span>详情</span>
                  </router-link>
                </h2>
                <h2 v-else>{{info.totalMoney | moneyFormat}}
                  <router-link to="/myAccount/accountAsset">
                    <span>详情</span>
                  </router-link>
                </h2>
                <h3>在投金额(元)：{{info.investingAmount | moneyFormat}}</h3>
              </div>
              <!--昨日资产-->
              <div class="home-todayCash">
                <h1>累计收益(元)</h1>
                <el-popover trigger="hover" placement="bottom" width="250">
                  <p class="iconpop">累计收益=项目基础收益+项目加息收益+加息券加息收益+VIP加息收益+现金红包收益+抵扣红包收益，其中项目基础收益在回款时，扣除3%的利息管理费</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag style="background-color: white">
                      <img src="https://aliyunsso.edspay.com/web/myAccount/wenhao_03.png" />
                    </el-tag>
                  </div>
                </el-popover>
                <h2 v-if="isHide">*** ***</h2>
                <h2 v-else>{{info.earnAmount | moneyFormat}}</h2>
              </div>
              <div class="home-option">
                <div class="rest-account normal-account" v-if="generalSw == '1'&&sinaTotalMoney!='0'">
                  <!-- <i></i> -->
                  <p>普通账户：
                    <span>{{info.sinaTotalMoney ? info.sinaTotalMoney : 0 | moneyFormat}}</span>
                  </p>
                  <!-- confirm-btn -->
                  <div class="confirm-btn" @click="charge(1)">充值</div>
                  <div class="cancel-btn" @click="charge(2)">去提现</div>
                </div>

                <div class="rest-account zheshang-account" v-if="czbOpenStatus == 1">
                  <!-- <i></i> -->
                  <p>存管账户
                    <span class="cg_span">{{info.czbTotalMoney ? info.czbTotalMoney : 0| moneyFormat}}</span>
                  </p>
                  <div class="btn_box">
                      <router-link to="/myAccount/accountCharge">
                        <div class="confirm-btn">充值</div>
                      </router-link>
                      <span @click="userRed">
                        <div class="cancel-btn">提现</div>
                      </span>
                  </div>
                </div>
                <div class="rest-account zheshang-account" v-else>
                  <i></i>
                  <p>存管账户：
                    <span>{{info.czbTotalMoney ? info.czbTotalMoney : 0 | moneyFormat}}</span>
                  </p>
                  <router-link to="/myAccount/openAccount" v-if="czbShowFlag == 1">
                    <div class="confirm-btn open-btn">立即开通</div>
                  </router-link>
                  <a @click="openZs" v-else>
                    <div class="confirm-btn open-btn">立即开通</div>
                  </a>
                </div>
              </div>
        </div>  
    </div>
    <!--账户首页中部分-->
    <div class="home-center">
      <div class="home-remit">
        <h1 class="home-title">回款计划</h1>
        <p>
          <router-link to="/myAccount/myBackPlan" class="home-check">
            <span>查看全部回款计划</span>
            <i class="el-icon-arrow-right"></i>
          </router-link>
        </p>
        <!--tab-->
        <div class="investTab" v-if="generalSw == '1'&&sinaTotalMoney!='0'">
          <ul>
            <li :class="{activeTab:2 === isActive}" @click="tabList(2)">存管项目</li>
            <li :class="{activeTab:1 === isActive}" @click="tabList(1)" >普通项目</li>
          </ul>
        </div>
        <div class="home-table">
          <el-table :data="tableList" class="home-el-table">
            <div slot="empty" class="table-empty">
              <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png" />
            </div>
            <el-table-column prop="borrowName" align="center" label="项目名称"></el-table-column>
            <el-table-column prop="apr" align="center" label="年化利率" width=68>
              <template scope="scope">
                {{scope.row.apr}}%
              </template>
            </el-table-column>
            <el-table-column prop="borrowInterest" align="center" label="平台加息" width=68>
              <template scope="scope">
                {{scope.row.addApr}}%
              </template>
            </el-table-column>
            <el-table-column prop="borrowInterest" align="center" label="VIP加息" width=68>
              <template scope="scope">
                {{scope.row.vipUprateApr?scope.row.vipUprateApr: 0}}%
              </template>
            </el-table-column>
            <el-table-column prop="timeLimit" align="center" label="期数/总期数" width=80>
              <template scope="scope">
                {{scope.row.period}}/{{scope.row.timeLimit}}
              </template>
            </el-table-column>
            <el-table-column prop="repaymentTime" align="center" label="预计回款时间">
              <template scope="scope">
                {{scope.row.repaymentTime.split(" ")[0]}}
              </template>
            </el-table-column>
            <el-table-column prop="status" align="center" label="回款状态" width=68>
              <template scope="scope">
                {{getStatus(scope.row.status)}}
              </template>
            </el-table-column>
            <el-table-column prop="capital" align="center" label="应回款本金(元)" width=110>
              <template scope="scope">
                {{scope.row.capital | moneyFormat}}
              </template>
            </el-table-column>
            <el-table-column prop="interest" align="center" label="应回款利息(元)">
              <template scope="scope">
                {{scope.row.interest| moneyFormat }}
                <el-popover trigger="hover" placement="bottom">
                  <div class="popDiv" v-if="isActive==2">
                    <!--待收利息没有-->
                    <p class="pop pop_p1">项目基础收益: {{ scope.row.collectionInterest| moneyFormat }}(回款时扣<br>除3%利息管理费)</p>
                    <p class="pop">项目加息收益: {{ scope.row.borrowInterest| moneyFormat }}</p>
                    <p class="pop">加息券加息收益: {{ scope.row.upRateInterest| moneyFormat }}</p>
                    <p class="pop">VIP加息收益: {{ scope.row.vipInterest| moneyFormat }}</p>
                  </div>
                  <div class="popDiv" v-else-if="isActive==1">
                    <!--待收利息没有-->
                    <p class="pop">标待收利息: {{ scope.row.collectionInterest| moneyFormat }}</p>
                    <p class="pop">标加息利息: {{ scope.row.borrowInterest| moneyFormat }}</p>
                    <p class="pop">加息券加息利息: {{ scope.row.upRateInterest| moneyFormat }}</p>
                    <p class="pop">vip加息利息: {{ scope.row.vipInterest| moneyFormat }}</p>
                  </div>
                  <div slot="reference" class="name-wrapper">
                    <el-tag>
                      <i class="iconfont" style="font-size: 17px;color:#508CEE">&#xe629;</i>
                    </el-tag>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="ID" align="center" label="备注" width=50>
              <template scope="scope">
                <div class="popDivs">
                  <el-popover trigger="hover" placement="bottom">
                    <p class="pop">应收利息: {{ scope.row.interest| moneyFormat }}</p>
                    <p class="pop">逾期利息: {{ scope.row.lateInterest| moneyFormat }}</p>
                    <p class="pop">逾期天数: {{ scope.row.lateDays| moneyFormat }}</p>
                    <div slot="reference" class="name-wrapper">
                      <el-tag>
                        <i class="iconfont" style="font-size: 17px;color:#508CEE">&#xe629;</i>
                      </el-tag>
                    </div>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!--账户首页下部-->
    <div class="home-hot">
      <h1 class="home-title">热门出借</h1>
      <div class="home-hotInvest">
        <router-link :to="'/invest/detail?uuid='+item.uuid+'&assetManageType='+item.assetManageType" v-for="item in hotList" target="_blank">
          <div class="home-hotItemBig">
            <div class="home-hotItemS">
              <div class="home-hotItem">
                <div class="hot-title">
                  {{item.name}}
                </div>
                <div class="hot-icos">
                  <i class="addApr-icon" v-if="item.addApr">平台加息</i>
                  <i class="vipApr-icon" v-if="item.vipUprateApr>0">V{{item.vipLevel}}加息</i>
                  <i class="home-redUseNum" v-if="item.redUseNum>0">{{item.redUseNum}}张可用</i>
                </div>
                <!--数字-->
                <div class="home-hotNum">
                  <div class="home-hotYear">
                    <h1>
                      {{item.apr | returnFloat1}}%<em v-if="item.addApr  || item.vipUprateApr">+{{item | allApr}}%</em>
                    </h1>
                    <p>参考年化</p>
                  </div>
                  <div class="home-hotDay">
                    <h1>{{item.timeLimit}}</h1>
                    <p v-if="item.borrowTimeType==1">授权服务期(天)</p>
                    <p v-if="item.borrowTimeType==0">授权服务期(月)</p>
                  </div>
                </div>
                <!--进度条-->
                <div class="home-hotProgress">
                  <p :style="{ width:item.scales+'%' }"></p>
                </div>
                <div class="home-hotRest">剩余：{{item.account-item.accountYes | moneyFormat}}元</div>
              </div>
            </div>
            <div class="home-hotItemBtn">授权出借</div>
          </div>
        </router-link>
      </div>
    </div>
    <code-dialog v-if="showMessage.openClose" title="债转通知短信关闭验证" :phone="info.zsBankPhone" 
    :getCode="changePhone" :confirm="closeMessage" :code="code" @closeDialog="closeDialog" >
    </code-dialog>
  </div>
</template>
<script>
import getUrl from '../../../common/router/getUrl'   // 获取登录信息验证
import button from '../../public/button.vue'
import codeDialog from '../template/getCodeDialog.vue';            // 获取验证码弹框


export default {
  mixins: [getUrl],
  data() {
    return {
      gift:false,   // 是否有VIP福利
      balance: sessionStorage.getItem("balance") == "true" ? true : false,       //  余额转移开关
      czbOpenStatus:0,
      isActive: 2,
      isHide: false,
      info: {
        totalMoney: 0,
        investingAmount: 0,
        todayEarnAmount: 0,
        investedAmount: 0,
        useMoney: 0
      },
      tableList: [],
      hotList: 　[],
      isZheshang: true,
      czbShowFlag: '',   // 是否白名单用户
      isRealName: false, // 判断新浪是否实名
      isBindCard: false, // 判断新浪实名后是否绑卡 绑卡才可以充值
      goSina: '',
      goZS: '',
      generalSw: '',
      sinaTotalMoney: '',
      loading: false,
      showMessage:{openClose:false},// 显示弹出关闭债券弹窗
      code:{msgCode:''}, // 关闭债权验证码
      discounts:0,//红包加息券总数
      toDayDialog:null,
    }
  },
  components: {
    'home-button': button,
    'code-dialog': codeDialog
  },
  created() {
    this.getBackPlan()
    this.getHot()
  },
  methods: {
    getPresentTime(){
      var now = new Date().getTime();
      var val = Number(now);
      var d = new Date(val);
      var year=d.getFullYear();
      var month=((d.getMonth()+1)<10?'0':'')+(d.getMonth()+1);
      var day=(d.getDate()<10?'0':'')+d.getDate();
      var hour=d.getHours();
      return year+"-"+month+"-"+day+"-"+this.getCookie('userId');
    },
    userRed(){
      this.toDayDialog = this.getCookie('toDayDialog');
      global.http.post_(this, "/red/envelope/getRedAndUprCount", {},data => {
          if (data.data.resCode == 1) {
            this.discounts = data.data.resData.redNum + data.data.resData.uprNum;

            if(this.discounts>0 && this.toDayDialog != this.getPresentTime()){
              this.$confirm('您还有'+this.discounts+'张红包和加息券未使用，确认继续提现吗？', '温馨提示', {
                  confirmButtonText: '继续提现',
                  cancelButtonText: '我再想想',
                  type: 'warning'
                }).then(() => {
                  this.$router.push('/myAccount/accountWithdraw');
                }).catch(() => {
                });
              this.setCookie('toDayDialog',this.getPresentTime());
            }else{
              this.$router.push('/myAccount/accountWithdraw');
            }

            
          } 
      });

    },
    openZs() {    // 
      this.$confirm('为维护系统稳定，存管账户正在分批激活，请您耐心等待', '温馨提示', {
        confirmButtonText: '了解存管',
        cancelButtonText: '取消返回',
        type: 'warning'
      }).then(() => {
        this.$router.push("/info/census")
      })
    },
    hideCash() {
      this.isHide = !this.isHide
    },
    tabList(val) {
      this.isActive = val
      this.getBackPlan()
    },
    // 获取状态
    getStatus(val) {
      let status = ''
      switch (val) {
        case 0:
          status = '待回款'
          break;
        case 1:
          status = '已回款'
          break;
        case 2:
          status = '回款中'
          break;
      }
      return status
    },
    // 1542191548853300338
    // 全局配置开关
    normalSwitch() {
        global.http.post_(this, "/global/configSw", {mobileType: 4,},data => {
            if (data.data.resCode == 1) {
                sessionStorage.setItem("generalSw",data.data.resData.generalSw);
                sessionStorage.setItem("showAutoTender",data.data.resData.showAutoTender);
                this.generalSw = data.data.resData.generalSw
            } 
        });
    },
    getInfo() {
      this.loading = true;
      global.http.post_(this, "/account/basic", {}, data => {
        if (data.data.resCode == 1) {
          this.normalSwitch()
          if (data.data.resData.basicModel.notifyStatus) {
              this.$alert('为了避免您在债权转让的时候收到短信，造成困扰，请放心关闭债转短信并验证短信验证码，具体项目进度我们另有短信通知', '温馨提示', {
                confirmButtonText: '确定',
                showClose: false,
                callback: action => {
                    this.changePhone()
                }
            });
          }
          let info = data.data.resData.basicModel
          this.info = info
          this.isRealName = info.realNameStatus
          this.czbShowFlag = info.czbShowFlag
          this.sinaTotalMoney = info.sinaTotalMoney
          this.czbOpenStatus = info.czbOpenStatus
          info.sinaBankCardCount == 0 ? this.isBindCard = false : this.isBindCard = true
          sessionStorage.setItem("isRealName", this.isRealName);
          sessionStorage.setItem("isBindCard", this.isBindCard);
          sessionStorage.setItem("sinaTotalMoney", info.sinaTotalMoney);
          this.loading = false;
          // 判断开通存管
          if (info.bankOpenStatus == 1) {  // 只开通了新浪
            this.goSina = 'true'
            sessionStorage.setItem("sina", true);
            sessionStorage.setItem("zs", false);
          } else if (info.bankOpenStatus == 2) {  // 只开通了浙商
            // this.isZheshang = true
            this.goZS = 'true'
            sessionStorage.setItem("sina", false);
            sessionStorage.setItem("zs", true);
          } else if (info.bankOpenStatus == 3) {  // 都开通
            // this.isZheshang = true
            this.goZS = 'true'
            this.goSina = 'true'
            sessionStorage.setItem("sina", true);
            sessionStorage.setItem("zs", true);
          } else if (info.bankOpenStatus == 0) {  // 都没开通
            this.goZS = 'false'
            sessionStorage.setItem("sina", false);
            sessionStorage.setItem("zs", false);
          }
        }
      }),
      // 检查是否有可领取福利
			global.http.post_(this, "/vip/gift/isNewGift", { mobileType:3}, data => {
				if (data.data.resCode == 1) {
					this.gift = data.data.resData.gift;
				}
			})
    },
    // 查询回款计划
    getBackPlan() {
      global.http.post_(this, "/borrow/collection/list", {
        assetManageType: this.isActive,
        pageNum: 1,
        pageSize: 　5,
        endTime: '',
        startTime: '',
        status: '',
        time: '0'
      }, data => {
        if (data.data.resCode == 1) {
          let info = data.data.resData.data
          this.tableList = info.list
        }
      })
    },
    // 充值提现
    charge(type) {     //1充值 2提现
      if (this.isBindCard) {
        if (type == 1) {
          this.$router.push('/myAccount/sinaCharge')
        } else {//跳转新浪提现
          global.http.post_(this, "/cash/sinaRecord", {}, data => {
               
          })
          window.open("https://pay.sina.com.cn/website/login?partnerId=200043185450");
          // window.location.href = 'https://pay.sina.com.cn/website/login?partnerId=200043185450';
          // this.$router.push('/myAccount/sinaWithDraw')
        }
      } else if (!this.isRealName) { // 没实名
        this.$confirm('您尚未开通支付账户，请开通', '提示', {
          confirmButtonText: '去实名',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/myAccount/sinaRealName')
        }).catch(() => {
        });
      } else if (!this.isBindCard && this.isRealName) { // 已经实名没绑卡
        if(type==2) {
            this.$confirm('您需要在新浪账户添加银行卡，才可以提现', '提示', {
            confirmButtonText: '去添加',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push('/myAccount/sinaBindCard')
          }).catch(() => {});
        } else {
          this.$router.push('/myAccount/sinaCharge')
        }
      }
    },
    // 获取热门出借
    getHot() {
      global.http.post_(this, "/index/fixBorrow", {}, data => {
        let info = data.data.resData.data.borrow
        this.hotList = data.data.resData.data.borrow.slice(0, 3)
        //遍历可用红包
        var investDataList = data.data.resData.data.borrow; //项目列表数据
        var invesRedList = data.data.resData.data.redModel; //红包列表数据
        for(var j=0; j<investDataList.length; j++){
          var redUseNum = 0
          if(investDataList[j].isRedEnvelope == 0 && investDataList[j].isUpRate == 0){
            if(investDataList[j].type == 0){//筛选新手标
              for(var i=0; i<invesRedList.length; i++){
                if(invesRedList[i].category != 1 && invesRedList[i].category != 2){
                  if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                    redUseNum++
                  }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                    redUseNum++
                  }
                }
              }
            }else{//普通标
              for(var i=0; i<invesRedList.length; i++){
                if(invesRedList[i].category != 0 && invesRedList[i].category != 2){
                  if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                    redUseNum++
                  }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                    redUseNum++
                  }
                }
              }
            }
          }else if(investDataList[j].isRedEnvelope == 0 && investDataList[j].isUpRate == 1){
            if(investDataList[j].type == 0){//筛选新手标
              for(var i=0; i<invesRedList.length; i++){
                if(invesRedList[i].category != 1 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
                  if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                    redUseNum++
                  }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                    redUseNum++
                  }
                }
              }
            }else{//普通标
              for(var i=0; i<invesRedList.length; i++){
                if(invesRedList[i].category != 0 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
                  if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                    redUseNum++
                  }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                    redUseNum++
                  }
                }
              }
            }
          }else if(investDataList[j].isRedEnvelope == 1 && investDataList[j].isUpRate == 0){
            if(investDataList[j].type == 0){//筛选新手标
              for(var i=0; i<invesRedList.length; i++){
                if(invesRedList[i].category != 1 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
                  if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                    redUseNum++
                  }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                    redUseNum++
                  }
                }
              }
            }else{//普通标
              for(var i=0; i<invesRedList.length; i++){
                if(invesRedList[i].category != 0 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
                  if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                    redUseNum++
                  }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                    redUseNum++
                  }
                }
              }
            }  
          }
          
          //算好的红包数量，将字段插入理财列表数组
          investDataList[j].redUseNum = redUseNum
        }
        
      })
    },
			// 获取关闭债券验证码
			changePhone(){
         global.http.post_(this, "/getCloseMsgCode", {}, data => {
              if(data.data.resCode){
                  this.showMessage.openClose = true;
                  this.$message({
                    message: data.data.resMsg,
                    type: 'success'
                  });
              } else {
                this.$message.error(data.data.resMsg);
                this.showMessage.openClose = false;
              }
          })
			},
			// 关闭债权
			closeMessage () {
        global.http.post_(this, "/closeNotify", {mobileCode:this.code.msgCode}, data => {
          if(data.data.resCode){
                this.showMessage.openClose = false;
                this.$message({
                  message: data.data.resMsg,
                  type: 'success'
                });
              }else{
                this.showMessage.openClose = true;
              }
        })
      },
      // 关闭弹窗
      closeDialog (val) {
          this.showMessage.openClose = val;
      }
  },
  mounted() {
    this.inspectCookin(1);
    this.getInfo();
  },
}
</script>
<style lang="scss" scoped>
.accountHome.account-route{
  position: relative;
  padding-top: 0;
  padding-bottom: 0;
  background: #F8F8F8;
}
.tips{
  /* position: absolute;
  top: 0;
  left: 0; */
  width: 100%;
  height: 52px;
  background: #FFF7EA;
  text-align: center;
  line-height: 52px;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #FFB53F;
}
.tips .btn{
    width: 88px;
    height: 28px;
    border: 1px solid #FFB53F;
    border-radius: 2px;
    display: inline-block;
    margin-left: 26px;
    font-family: PingFangSC-Medium;
    border: 1px solid #FFB53F;
    border-radius: 2px;
    text-align: center;
    line-height: 28px;
    cursor: pointer;
  }
.el-table__body-wrapper {
  overflow: hidden;
}


.home-top {
  /* display: flex; */
  flex-direction: row;
  padding: 40px 40px 60px 30px;
  margin-bottom: 20px;
  background: #fff;
  position: relative;
}
.home-top .home-title{
  margin-bottom: 40px;
  .VipBenefitsBtn{
    width: 75px;
    height: 20px;
    margin-left: 5px;
    transition: all 1s ease;
    -webkit-animation: 2s rowup linear infinite normal;
    animation: 2s rowup linear infinite normal;
    cursor: pointer;
    vertical-align: middle;
    margin-top: -5px;
    display: inline-block;
    background: url(https://aliyunsso.edspay.com/web/myAccount/VipBenefits/VipBenefits.png);
    background-size: 100% 100%;
  }
}
@keyframes rowup {
  0% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
  }
  50% {
      -webkit-transform: scale(1);
      transform: scale(1);
  }
  100% {
      -webkit-transform: scale(0.8);
      transform: scale(0.8);
  }
}
.home-allCash {
  /* flex: 1.2; */
  padding-top: 15px;
  float: left;
  margin-right: 70px;
}

.home-allCash h1 {
  font-size: 18px;
  display: inline-block;
  color: #333;
}

.home-allCash i {
  display: inline-block;
  width: 20px;
  height: 15px;
  cursor: pointer;
  background: url("https://aliyunsso.edspay.com/web/login/longin.png");
  background-position: -9px 255px;
}

.home-allCash .hideCash {
  background-position: -9px 217px;
}

.home-allCash h2 {
  margin-top: 18px;
  font-size: 24px;
color: #FF5B4C;
  line-height: 21px;
  display: flex;
  align-items: center;
  font-weight: normal;
}

.home-allCash h2 span {
  font-size: 18px;
  color: #508CEE;
  padding-left: 16px;
  cursor: pointer;
}

.home-allCash h3 {
  font-size: 18px;
color: #737373;
  padding-top: 20px;
}

.home-todayCash {
  /*flex:1;*/
  margin-right: 55px;
  padding-top: 15px;
  float: left;
  padding-right: 40px;
  border-right: 1px solid #e5e5e5;
}

.home-todayCash .name-wrapper {
  display: inline-block;
}

.home-todayCash h1 {
  font-size: 18px;
  color: #333333;
  display: inline-block;
}

.home-todayCash .el-tag {
  vertical-align: bottom;
}

.home-todayCash h2 {
  font-size: 24px;
color: #333333;
  margin-top: 18px;
}

.home-todayCash h3 {
  font-size: 14px;
  line-height: 14px;
  color: #666666;
  margin-top: 20px;
}

.home-option {
  padding-top: 15px;
  padding-bottom: 15px;
  flex:0;
  align-items: stretch;
  flex-direction: row;
}

.rest-div {
  padding-top: 0px;
  padding-bottom: 0px;
}


/*中部*/

.home-remit {
  padding: 30px 30px;
  overflow: hidden;
  position: relative;
}
.home-remit .investTab{
      margin-top: 30px;
}
.home-remit .investTab ul li{
  padding-bottom: 20px;
}
.home-title {
  font-size: 24px;
  color: #333333;
}
.home-center{
  background: #fff;
  margin-bottom: 20px;
}
.home-remit p {
  position: absolute;
  top: 37px;
  right: 33px;
}

.home-check {
    font-size: 14px;
    color: #4A4A4A;
    cursor: pointer;
}
.home-check:hover{
    color:#fc4147;
}



.el-icon-arrow-right {
  font-size: 4px;
  line-height: 8px;
}

.home-el-table {
  width: 100%;
  border: none;
}

.home-table {
  clear: both;
  background-color: #ffffff;
  overflow: hidden;
  margin-top: 30px;
  border: 1px solid #F4F4F4;
  border-bottom: none; 
}

.home-table .el-table__empty-block {
  height: 160px;
}

.home-table th {
  padding: 0px;
  line-height: 40px;
}

.home-table .cell {
  padding: 0px;
  font-weight: 500;
}

.home-table .el-table {
  border: 0;
}

.home-table .el-table::after {
  background-color: #fff;
}

.home-table .el-table::before {
  background-color: #dfe6ec;
}

.home-table .el-table th>.cell {
  padding: 0px;
  font-size: 14px;
  line-height: 14px;
  background: white;
}

.home-el-table .el-tag {
  padding: 0px;
  background-color: transparent;
}

.home-el-table .cell span {
  display: inline-block;
}

.home-el-table .el-table__row td {
  padding: 0px;
  line-height: 40px;
}


/*首页下部*/

.home-hot {
  background: #fff;
  padding: 30px 30px;
}

.home-hotInvest {
  display: flex;
  flex-direction: row;
  margin-top: 19px;
}

.home-hotItem {
  width: 276px;
  height: 206px;
  padding: 20px;
  font-size: 14px;
  overflow: hidden;

  border: solid 1px rgba(0, 0, 0, 0.09); 
}

.home-hotItem .hot-title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 10px;
}
.home-hotItem .hot-icos{
  text-align: center;
}
.home-hotItem .hot-icos i {
    font-size:12px;
    padding: 0px 4px;
  }

.home-hotItemBig {
  position: relative;
}
.home-hotItemBig .home-hotItemBtn{
    position: absolute;
    bottom: 0;left: 0;
    right: 0;
    margin: auto;
    width: 276px;
    height: 35px;
    background: #ff5b4c;
    font-size: 14px;
    color: #FFFFFF;
    text-align: center;
    line-height: 35px;
    display: none;
}

.home-hotItemBig:hover .home-hotItemS .home-hotItem{
  border: none;
  box-shadow: 0 2px 9px 0 rgba(0,0,0,0.11);
}

.home-hotItemBig:hover .home-hotItemBtn{
  display: block; 
  
}

/* .home-hotItemBig:hover .home-hotItem {
  width: 284px;
  height: 194px;
} */

.home-hotItemS {
  margin: 7px;
}

.home-hotNum {
  margin-top: 23px;
  display: flex;
  justify-content: space-between;
}

.home-hotYear h1 {
  font-size: 23px;
  line-height: 23px;
  color: #fc4147;
}
.home-hotYear h1 em{
  font-size: 16px;
}

.home-hotYear p {
  font-size: 12px;
color: #818181;
  margin-top: 8px;
}

.home-hotDay h1 {
  font-size: 22px;
  line-height: 22px;
  color: #333333;
}

.home-hotDay p {
  font-size: 12px;
  line-height: 12px;
  color: #818181;
  margin-top: 8px;
}

.home-hotProgress {
  height: 2px;
  border-radius: 1px;
  background-color: #e7e7e7;
  margin-top: 16px;
  position: relative;
}

.home-hotProgress p {
  height: 2px;
  border-radius: 1px;
  background-color: #fc4147;
  position: absolute;
}

.home-hotRest {
  font-size: 12px;
  line-height: 12px;
  color: #818181;
  margin-top: 10px;
  float: right;
}

.zheshang-logo {
  background: url("https://aliyunsso.edspay.com/web/myAccount/zheshanglogo.png") no-repeat;
  width: 85px;
  height: 30px;
  background-size: contain;
}

.zheshang-option p {
  font-size: 16px;
  color: #333333;
  margin-top: 10px;
}

.white-button {
  margin-top: 30px !important;
}

.red-button {
  margin-top: 0px !important;
}


/*已开通浙商*/

.rest-div {
  /* display: flex; */
  flex-direction: column;
  /* flex: 2.6; */
  border-left: 1px solid #e7e7e7;
  margin-left: 10px;
}

.rest-account {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 72px;
  margin-left: 7px;
}

.rest-account p {
  font-size: 18px;
  color: #333333;
}

.rest-account p span {
  color: #666666;
}

.rest-account .confirm-btn {
  width: 80px;
  margin-right: 10px;
  margin-top: 0px !important;
}
.zheshang-account .confirm-btn{
       width: 67px;
       height: 32px;
       background: #FF5B4C;
       line-height: 32px;
       font-size: 18px;
      color: #FFFFFF;
}
.zheshang-account .btn_box{
    position: absolute;
    right: 40px;
    bottom:70px;
    span{
      display:inline-block;
    }
    
}
.zheshang-account .btn_box a{
      float: left;
    }
.rest-account.zheshang-account .cancel-btn{
width: 67px;
       height: 32px;
       line-height: 32px;
       font-size: 18px;
}
.normal-account{
  position: absolute;
  top: 20px;right: 15px;
}
.rest-account.normal-account .cancel-btn{
  width: 60px;
  font-size: 14px;
  color: #508CEE;
  border: none;
  margin-right: 15px;
}
.normal-account .confirm-btn{
  width: 60px;
  font-size: 14px;
  color: #508CEE;
  background: transparent;
  border: none;
  height: auto;
  line-height: 1em;
  border-right: 1px solid #e5e5e5;
}
.normal-account p{
  font-size: 14px;
color: #333333;
margin: 0;
}
.rest-account .cancel-btn {
  width: 80px;
  
}

.rest-account i {
  width: 30px;
  height: 30px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 10px;
}

.normal-account {
  /* border-bottom: 1px solid #e7e7e7; */
}

.normal-account i {
  background: url("https://aliyunsso.edspay.com/web/myAccount/icon_putong_normal.png") no-repeat;
  background-size: contain;
}

.zheshang-account i {
  background: url("https://aliyunsso.edspay.com/web/myAccount/icon-prompt-normal%281%29.png") no-repeat;
  background-size: contain;
}
.zheshang-account p span{
  font-size: 24px;
  color: #333333;
}
.zheshang-account p span.cg_span{
  display: block;
  margin-top: 18px;
}

.rest-account .open-btn {
  width: 103px;
  height: 40px;
  border-radius: 20px;
  line-height: 40px;
  font-size: 18px;
  margin-top: 15px;
  margin-right: 0;
  cursor: pointer;
  position: absolute;
   right: 40px;
    bottom:90px;
}

/*弹窗*/

.popDiv {
  padding-left: 9px;
  padding-right: 9px;
}
p.pop_p1{
  line-height: 25px;
}
.popDivs {
  padding-left: 9px;
  padding-right: 9px;
}

.pop {
  font-size: 14px;
  line-height: 40px;
  color: #333333;
  border-bottom: 1px dashed #e7e7e7;
}

.iconpop {
  font-size: 14px;
  line-height: 14px;
  color: #333333;
  padding: 9px;
  line-height: 22px;
}

.hotItem-tip {
  width: 60px;
  height: 32px;
  color: white;
  line-height: 32px;
  text-align: center;
  position: absolute;
  top: -15px;
  left: 20px;
  background-color: #7ac5ff;
}
</style>
<style>
.el-popover{
  border-radius: 8px;
}
</style>

<style rel="stylesheet/less">
@import "../../../style/account.less";
</style>
