<template>
  <div v-loading.body="loading" class="accountCard">
    <ui-title title="我的银行卡"></ui-title>
    <div class="investTab" v-if="generalSw == '1'&&sinaTotalMoney!='0'">
      <ul>
        <li :class="{activeTab:2 === isActive}" @click="tabList(2)">存管账户</li>
        <li :class="{activeTab:1 === isActive}" @click="tabList(1)">普通账户</li>
      </ul>
    </div>
    <!--新浪银行卡-->
    <div class="myCard" v-if="this.isActive == 1">
      <ui-card :type="1" :carNum="bank.hiddenCardNumber" :logo="bank.logoPicUrl" :bankFull="bank.cardNumber" bankType="xl"
               :canUnbind="bank.canBeDisabled" :bankName="bank.bankName" v-if="sinaList.length>0" v-for="bank in sinaList"></ui-card>
      <ui-card :type="2" :realName="ifRealName"></ui-card>
    </div>
    <!--浙商银行卡-->
    <div class="myCard" v-if="this.isActive == 2">
      <ui-card :type="3" :carNum="bank.hiddenCardNumber" :logo="bank.logoPicUrl" :bankFull="bank.cardNumber"
               bankType="zs" :bankName="bank.bankName" :realNames="bank.realName" v-if="zsList.length>0" v-for="bank in zsList"></ui-card>
      <ui-card :type="4" v-if="zsList.length==0"></ui-card>
    </div>
    <div class="myCard-tip">
      <h1>温馨提示</h1>
      <p>1.为保障资金安全，充值提现采用同卡进出的原则，即提现银行卡需与充值银行卡一致，只允许绑定一张银行卡。</p>
      <p>2.如有疑问，请联系客服：400-135-3388。</p>
    </div>
  </div>
</template>
<script>
    import title from '../../public/account-title.vue'
    import card from '../../public/bankCard.vue'
    export default {
      data () {
        return {
          isActive: 2,
          sinaList:[],
          zsList:[],
          goSina: sessionStorage.getItem("sina"),
          goZS: sessionStorage.getItem("zs"), 
          generalSw: sessionStorage.getItem("generalSw"),
          sinaTotalMoney: sessionStorage.getItem("sinaTotalMoney"),
          ifRealName: true,
          loading: true,
        }
      },
      created () {
          this.tabList(2)
          global.checkBank (this)
      },
      methods: {
        tabList (val) {
          this.isActive = val
          if (this.isActive == 2) {
            this.getZS()
          } else {
            this.$message({
              message: '新浪普通账户已停止使用。为响应合规备案登记要求，将全面迁移到浙商存管系统',
              type: 'warning'
            });
            this.getSina ()
          }
        },
        // 获取浙商银行卡
        getZS () {
          global.http.post(this,"/account/zsbanklist",{},data => {
            if (data.data.resCode == 1) {
              if (data.data.resData.bankNum == 0) {
                this.zsList = []
              } else {
                this.zsList = data.data.resData.bankCardlist
              }
               this.loading  = false
            }
          })
        },
        // 获取新浪银行卡
        getSina () {
          global.http.post(this,"/account/banklist",{},data => {
            if (data.data.resCode == 1) {
              data.data.resData.realNameStatus == 1 ? this.ifRealName = true : this.ifRealName = false
              if (data.data.resData.bankNum == 0) {
                this.sinaList = []
              } else {
                this.sinaList = data.data.resData.bankCardlist
              }
              this.loading  = false
            }
          })
        }
      },
      components: {
        'ui-title': title,
        'ui-card': card
      },
    }
</script>
<style scoped>
  .accountCard.account-route{
    padding: 30px 20px;
  }
  .investTab{
    margin-top: 30px;
  }
  .investTab ul li{
    padding-bottom: 20px;
  }
  .myCard{
    border-bottom: 1px dashed #e7e7e7;
    overflow: hidden;
    padding-bottom: 45px;
    padding-left: 10px;
  }
  .myCard-tip{
    font-size: 14px;
    padding: 30px 10px;
  }
  .myCard-tip h1 {
    line-height: 16px;
    color: #23232;
    padding-bottom: 15px;
  }
  .myCard-tip p {
    line-height: 16px;
    color: #A6A6A6;
    margin-bottom: 10px;
  }

</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
