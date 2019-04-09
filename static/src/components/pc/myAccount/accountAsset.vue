<template>
  <div class="accountAsset-box">
      <div class="investTab asset-tab" style="margin-top: 0px" v-if="generalSw == '1'&&sinaTotalMoney!='0'">
        <ul>
          <li :class="{activeTab:2 === isActive}" @click="tabList(2)">存管账户</li>
          <li :class="{activeTab:1 === isActive}" @click="tabList(1)">普通账户</li>
        </ul>
      </div>
       <!--普通账户-->
        <div class="tuoguan" v-if="isActive == 1 && info.fluxStatus!== 1">
            <!-- <p>已绑定新浪托管账户</p>  -->
            <p>已绑定新浪托管账户：{{info.tppUserCustId}}</p>
            <!-- <div class="cancel-btn"><a :href="redictUrl" target="_blank">进入托管账户</a></div> -->
        </div>
        <!--存管账户-->
        <div class="tuoguan zs-msg" v-if="isActive == 2">
            <p>浙商银行存管账号：{{info.ecardNo?info.ecardNo:''}}</p>
        </div>

      <div v-loading.body="loading" class="zc_content">
           
        <div class="asset-top clear">
          <div class="asset-canvas" id="dataList"></div>
             <div class="asset_right">
                <div class="cash_title_box">
                    <h1 class="cash-title">账户总资产(元)</h1>
                    <div class="all-cash">{{info.totalMoney| moneyFormat}}</div>
                </div>   
                
                <!--<p class="asset-canvas-text">99,99.00</p>-->
                <div class="asset-items">
                  <div class="asset-item darkyellow-item">
                    <i></i>
                    <span>可用余额：{{info.useMoney| moneyFormat}}元</span>
                  </div>
                  <!-- <div class="asset-item orange-item"  v-if="isActive == 1">
                    <i></i>
                    <span>E起赚：{{info.fluxUseMoney| moneyFormat}}元</span>
                    <router-link to="/myAccount/currentDetails">
                      <a style="font-size: 13px;margin-left: 10px;color: #7cc6ff;vertical-align: top;">详细信息</a>
                    </router-link>
                  </div> -->
                  <div class="asset-item orange-item">
                    <i></i>
                    <span>待回款本金 ：{{info.principal ? info.principal : 0| moneyFormat}}元</span>
                  </div>
                  <div class="asset-item yellow-item">
                    <i></i>
                    <span>待回款利息：{{info.waitInterest ? info.waitInterest : 0| moneyFormat}}元</span>
                  </div>
                  <div class="asset-item red-item">
                  <i></i>
                  <span>提现中：{{info.noUseMoney ? info.noUseMoney : 0| moneyFormat}}元</span>
                </div>
                <!-- <div class="asset-item red1-item" v-if="isActive==2">
                  <i></i>
                  <span>待匹配金额：{{info.waitMatchAmount ? info.waitMatchAmount : 0| moneyFormat}}元</span>
                </div> -->
                <div class="asset-item red1-item" v-if="balance && isActive==1">
                  <i></i>
                  <span>转移中金额：{{info.transferMoney ? info.transferMoney : 0 | moneyFormat}}元</span>
                </div>

                </div>
                <!--充值取现-->
                <div class="home-option" v-if="isActive==1">
                  <div class="home-option-button red-button cancel-btn" @click="charge (1)">充值</div>
                  <div v-if="balance" class="home-option-button white-button cancel-btn" @click="charge (2)" style="margin-bottom: 20px;">提现</div>
                  <div v-else class="home-option-button white-button confirm-btn" @click="charge (2)" >提现</div>
                  <!-- <div class="home-option-button red-button confirm-btn" @click="charge (3)" v-if="balance && sinaTotalMoney!='0'">余额转移</div> -->
                </div>
                <div class="home-option" v-if="isActive==2">
                  <div class="home-option-button red-button cancel-btn" @click="zsCharge(1)">充值</div>
                  <div class="home-option-button  white-button confirm-btn" @click="zsCharge(2)">提现</div>
                </div> 
              </div>
        </div>

        <div class="asset_bottom_box clear">
            <div class="asset-bottom">
              <div class="home-allCash">
                <h1>今日收益(元)</h1>
                <h2>{{info.todayEarnAmount| moneyFormat}}</h2>
                <div class="bottom-r">
                  
                  <h3 v-if="isActive == 1">存钱罐：{{info.cqgTodayEarnMoney ? info.cqgTodayEarnMoney : 0| moneyFormat}}元</h3>
                  <!-- <h3 v-if="isActive == 1">E起赚：{{info.fluxTodayEarnMoney| moneyFormat}}元</h3> -->
                  <h3>定期回款：{{info.collectionTodayEarnMoney| moneyFormat}}元</h3>
                </div>
              </div>
            </div>
            <div class="xian_line"></div>
            <div class="asset-bottom asset_right">
              <div class="home-allCash">
                <h1>累计收益(元)</h1>
                <h2>{{info.earnAmount| moneyFormat}}</h2>
                <div class="bottom-r">
                 
                      <h3 v-if="isActive == 1">存钱罐：{{info.cqgEarnMoney ? info.cqgEarnMoney : 0| moneyFormat}}元</h3>
                      <h3 v-if="isActive == 1 && info.fluxStatus==99">E起赚：{{info.fluxEarnMoney| moneyFormat}}元</h3>
                      <h3>定期回款：{{info.collectionEarnMoney| moneyFormat}}元</h3>
                   
                </div>
              </div>
            </div>
        </div>

         <!-- <div class="tip" v-if="info.fluxEarnMoney!== 0">注：因平台业务调整，E起赚业务将从2018年1月4日起正式下线！</div> -->
      </div>
  </div>
</template>
<script>
  import title from '../../public/account-title.vue'
  export default {
    data () {
      return {
        balance: sessionStorage.getItem("balance") == "true" ? true : false,       //  余额转移开关
        arrData:[],
        isActive: 2,
        goSina: sessionStorage.getItem("sina"),
        goZS: sessionStorage.getItem("zs"),
        url: global.ajaxUrl,
        loading : true,
        redictUrl: '',
        info: {
          collectionEarnMoney:  0,
          collectionTodayEarnMoney: 0,
          fluxUseMoney: 0,
          collection: 0,
          cqgEarnMoney: 0,
          cqgTodayEarnMoney: 0,
          fluxEarnMoney: 0,
          fluxTodayEarnMoney: 0,
          earnAmount: 0,
          useMoney: 0,
          totalMoney: 0,
          todayEarnAmount: 0,
          noUseMoney: 0,
        },
        generalSw: sessionStorage.getItem("generalSw"),
        sinaTotalMoney: sessionStorage.getItem("sinaTotalMoney"),
      }
    },
    components: {
      'asset-title': title
    },
    mounted:function(){
      this.initZSData()
      this.createCanvas ()
    },
    created () {
      if (this.goZS=='true') {
        this.getInfo()
      } else {
        this.loading = false;
      }
    },
    methods :{
      // 浙商默认饼图0
      initZSData () {
        this.arrData = [
          {value:'0', name:'可用余额(元)'},
          {value:'0', name:'待回款利息(元)'},
          {value:'0', name:'待回款本金(元)'},
          {value:'0', name:'提现中(元)'},
        ]
      },
      // 新浪默认饼图0
      initSinaData () {
        this.arrData = [
          {value:'0', name:'可用余额(元)'},
          {value:'0', name:'待回款利息(元)'},
          {value:'0', name:'待回款本金(元)'},
          {value:'0', name:'提现中(元)'},
          {value:'0', name:'转移中金额(元)'},
        ]
      },
      createCanvas () {
        var vm = this;
        var myChart = echarts.init(document.getElementById('dataList'));
        var option = {
          color:["#8380FF","#679DF5","#68BFF6",'#F4B649','#F44D4D'],
          series: [
            {
              // name:'访问来源',
              type:'pie',
              radius: ['55%', '75%'],
              hoverAnimation:false, // 开启 hover 在扇区上的放大动画效果。
              avoidLabelOverlap: true,
              legendHoverLink: false,
              center: [110, 110],    // 饼状图相对坐标的位置
              label: {
                normal: {
                  show: false,    // 指示器开关。
                  formatter: '{c}',
                  textStyle: {
                    fontSize: '20'
                  }
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    fontSize: '20'
                  }
                }
              },
              labelLine:{   //  视觉引导线的样式
                normal:{
                  show: false,
                  length:30,
                  length2:50
                }
              },
              data:vm.arrData
            }
          ]
        };
        myChart.setOption(option);
      },
      tabList (val) {
        this.isActive = val;
        if (this.goZS=='false'&&this.isActive== 2) {
            this.loading = false;
            this.initZSData ()
            this.info = {
                collectionEarnMoney:  0,
                collectionTodayEarnMoney: 0,
                fluxUseMoney: 0,
                collection: 0,
                cqgEarnMoney: 0,
                cqgTodayEarnMoney: 0,
                fluxEarnMoney: 0,
                fluxTodayEarnMoney: 0,
                earnAmount: 0,
                useMoney: 0,
                totalMoney: 0,
                todayEarnAmount: 0,
                noUseMoney: 0,
            }
          } else {
            this.getInfo()
            this.loading = true;
          }
      },
      getInfo (){
        global.http.post(this,"/account/detail/basic",{
          assetManageType: this.isActive
        },data => {
          if (data.data.resCode == 1) {
            this.info = data.data.resData.basicModel
            if(this.isActive == 1){
               this.arrData = [
                {value:this.info.useMoney+'', name:'可用余额(元)'},
                 {value:this.info.principal+'', name:'待回款本金(元)'},
                {value:this.info.waitInterest+'', name:'待回款利息(元)'},
                {value:this.info.noUseMoney+'', name:'提现中(元)'},
                {value:this.info.transferMoney+'', name:'转移中金额(元)'},
              ]
            } else if(this.isActive == 2){
              this.arrData = [
                {value:this.info.useMoney+'', name:'可用余额(元)'},
                {value:this.info.principal+'', name:'待回款本金(元)'},
                {value:this.info.waitInterest+'', name:'待回款利息(元)'},
                {value:this.info.noUseMoney+'', name:'提现中(元)'},
              ]
            }
            this.createCanvas()
            this.loading = false;
          }
        })
        global.http.post(this,"/member/tpp/apiLogin",{ },data => {
          if (data.data.resCode == 1) {
            this.redictUrl = data.data.resData.redirectUrl
          }
        })
      },
      // 浙商充值提现
      zsCharge (val) {
        if (this.goZS == 'true') {
            if (val == 1) {
               this.$router.push('/myAccount/accountCharge')
            } else{
              this.$router.push('/myAccount/accountWithdraw')
            }
        } else {
          this.$confirm('您尚未开通存管账户，请开通', '提示', {
              confirmButtonText: '去开通',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/myAccount/openAccount')
            }).catch(() => {
          });
        }
      },
      // 新浪充值提现
      charge (type) {     //1充值 2提现 3余额转移
        if(type == 3){
          this.$router.push('/moneyTransfer')
        }else{ 
          if (this.info.bankOpenStatus == 1) {    // 如果绑卡了
              if (type == 1) {
                this.$router.push('/myAccount/sinaCharge')
              } else {//跳转新浪提现
                global.http.post_(this, "/cash/sinaRecord", {}, data => {
                     
                })
                window.open("https://pay.sina.com.cn/website/login?partnerId=200043185450");
                // this.$router.push('/myAccount/sinaWithDraw')
              }
          } else if (type == 2){
              this.$confirm('您需要在新浪账户添加银行卡，才可以提现', '提示', {
              confirmButtonText: '去添加',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/myAccount/sinaBindCard')
            }).catch(() => {});
          } else if (type == 1) {
            this.$router.push('/myAccount/sinaCharge')
          }
        }
      },
    }
  }
</script>
<style scoped>
.account-route{
  padding-top: 30px;
  position: relative;
}
  .accountAsset-box{
    background: #fff;
  }
  .asset-top {
    /* padding:40px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px dotted #e7e7e7; */
  }
  .asset-canvas {
    width:180px;
    height: 180px;
    float: left;
    margin-right: 70px;
  }
  .asset_right{
    float: left;
    width: 60%;
  }
  .asset-items {
   /*  display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center; */
    width: 100%;
    height: 140px;
  }
  .asset-item:nth-of-type(1) {
    margin-top: 0px;
  }
  .asset-item{
    width: 40%;
    color: #666666;
    margin-top: 20px;
    /* display: flex;
    align-items: flex-start; */
    display: inline-block;
  }
  .asset-item i{
    width:12px;
    height: 12px;
    display: inline-block;
  }
  .asset-item span {
    font-size: 12px;
    padding-left: 10px;
    color: #333;
  }
  /* color:["#8380FF","#679DF5;","#68BFF6",'#F4B649','#F44D4D'],*/
  .darkyellow-item i{
    background: #8380FF;
  }
  .orange-item i{
    background: #679DF5;
  }
  .yellow-item i {
    background: #68BFF6;
  }
  .red-item i{
    background: #F4B649;
  }
  .red1-item i{
    background: #F44D4D;
  }
  .red-button{
    margin-top: 0px;
  }
  .home-option{
    position: absolute;
    top: 172px;
    right: 30px;
    display: inline;
  }
  .white-button{
    margin-bottom: 20px;
    margin-top: 0;
  }
  .asset_bottom_box{
        padding-left: 70px;
        font-size: 18px;
        position: relative;
  }
  .asset_bottom_box .xian_line{
       width: 1px;
       height: 88px;
       background: #e5e5e5;
       position: absolute;
       left: 45%;
       top: 50%;
       transform: translateY(-28%);
  }
  .asset-bottom {
    margin-top: 50px;
    float: left;
    width: 50%;
  }
  .asset-bottom.asset_right{
        padding-left: 150px;
        padding-right: 30px;

  }
  .home-allCash h1{
    font-size: 18px;
    color: #333333;
  }
  .home-allCash h2{
    font-size: 24px;
    color: #333333;
    margin-top: 12px;
  }
  
  .home-option-button{
    width: 77px;
    height: 33px;
    line-height: 33px;
    font-size: 18px;
    float: left;
    margin-right: 20px;
  }
  .home-allCash h3 {
    font-size: 18px;
    color: #737373;
    padding-top:0px;
  }
  .bottom-r {
    margin-top: 10px;
  }
  .bottom-r h3{
    margin-bottom: 15px;
  }
  .tip {
      font-size: 14px;
      margin-left: 70px;
      color: #ff3e41;
      margin-top: 35px;
  }
  .zc_content{
    padding-top: 68px;
  }
  .cash-title {
    margin-top: 15px;
    font-size: 18px;
    color: #333;
  }
  .all-cash {
    font-size: 24px;
color: #FC4147;
    text-align: left;
    margin-top: 12px;
    margin-bottom: 20px;
  }
  .tuoguan {
    /* display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: #666666;
    width: 837px;
    height: 89px;
    border: solid 1px #e7e7e7; */
    font-size: 16px;
    color: #9A9A9A;
    position: absolute;
    top: 30px;
    right: 30px;
  }
  .zs-msg {
    /* justify-content: flex-start; */
  }
  .zs-msg p {
    margin-left: 50px;
  }
  /*tab*/
  .asset-tab ul li {
    font-size: 16px;
    padding-bottom: 22px;
  }
</style>

<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
