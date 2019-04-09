<template>
  <div class="accountDetaill">
    <asset-title title="资金明细"></asset-title>
    <div class="investTab">
      <ul>
        <li :class="{activeTab:1 === isActive}" @click="tabList(1)">全部</li>
        <li :class="{activeTab:2 === isActive}" @click="tabList(2)">充值记录</li>
        <li :class="{activeTab:3 === isActive}" @click="tabList(3)">提现记录</li>
        <li :class="{activeTab:4 === isActive}" @click="tabList(4)" v-if="generalSw == '1'&&sinaTotalMoney!='0'">转移记录</li>
      </ul>
    </div>
    <div class="investTabDiv">
      <ui-detail v-if="isActive === 1" @sigeinfo="sigeinfo"></ui-detail>
      <ui-recharge v-if="isActive === 2" @sigeinfo="sigeinfo"></ui-recharge>
      <ui-cash v-if="isActive === 3" @sigeinfo="sigeinfo"></ui-cash>
      <ui-transfer v-if="isActive === 4" @sigeinfo="sigeinfo"></ui-transfer>
    </div>
  </div>
</template>
<script>
  import title from '../../public/account-title.vue'
  import detail from "./detailTab.vue"
  import recharge from "./rechargeTab.vue"
  import cash from "./cashTab.vue"
  import transfer from "./transferTab.vue"

  export default {
    components: {
      'asset-title': title,
      'ui-detail': detail,
      'ui-recharge': recharge,
      'ui-cash': cash,
      'ui-transfer': transfer
    },
    data() {
      return{
        isActive: 1,
        generalSw: sessionStorage.getItem("generalSw"),
        goSina: sessionStorage.getItem("sina"),
        sinaTotalMoney: sessionStorage.getItem("sinaTotalMoney"),
      }
    },
    created () {
      this.$route.query.id == 4 ? this.isActive = 4 : this.isActive = 1
    },
    methods: {
      tabList (val) {
        this.isActive = val
      },
      sigeinfo(val1,val2){
        this.$emit('sigeinfo',val1,val2)
      }
    }
  }
</script>
<style scoped>
.accountDetaill{
  background: #fff;
  padding: 43px 20px 0;
}

  .el-tabs__active-bar{
    background-color: #fc4147;
    height: 2px;
    width: 70px!important;
    left: 14px;
  }
  .el-tabs__item{
    padding: 31px 16px;
    height: 81px;
    font-size: 16px;
    margin-bottom: 15px;
    color: #333333;
  }
  .el-tabs__item.is-active{
    color: #fc4147;
  }
  .accountTabs .el-tabs__header {
    margin: 0px;
  }
  .accountTabs  .el-tabs__item  {
    margin-bottom: 6px;
  }
  .accountTabs .el-tabs__nav {
    margin-left: 15px;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
