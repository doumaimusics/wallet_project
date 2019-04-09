<template>
    <div class="single-mask">
      <div class="single-main">
        <p class="single-title">账户充值</p>
        <router-link to="/myAccount/accountDetail"><span class="single-rtitle">充值记录</span></router-link>
        <el-tabs v-model="activeName" class="redTab chargeTab">
          <el-tab-pane label="快捷充值" name="first">
            <account-zsCharge @sigeinfo="sigeinfo" :money='money'  @goTransfer="goTransfer"></account-zsCharge>
          </el-tab-pane>
          <el-tab-pane name="second">
            <span slot="label"> 转账充值<img src="https://aliyunsso.edspay.com/web/myAccount/dae.png"/></span>
            <account-zsCyber @sigeinfo="sigeinfo"></account-zsCyber>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>
<script>
    import Title from '../../public/account-title.vue'
    import zsCharge from './charge/zsChargeTab.vue'
    import zsCyber from './charge/zsCyberChargeTab.vue'
    export default {
        data () {
            return {
              sumNumber: '',
              isBlur: false,
              activeName: 'first',
              money: '',
          }
        },
        components : {
          'account-title': Title,
          'account-zsCharge': zsCharge,
          'account-zsCyber': zsCyber
        },
        methods: {
            confirmSum () {
                console.log('sum')
            },
            sigeinfo(val1,val2){
              this.$emit('sigeinfo',val1,val2)
            },
            goTransfer (val) {
              val ? this.activeName = 'second' : this.activeName = 'first'
            }
        },
        created () {
            this.$route.query.money ? this.money = this.$route.query.money : this.money = ''
        }
    }
</script>
<style lang="scss">
/*修改饿了么ui的tab样式*/
  .chargeTab {
      .el-tabs__item {
      position: relative;
      img {
        position: absolute;
        top: 10px;
      }
    }
  }
</style>

<style lang="scss" scoped>
    .redTab {
      margin-top: 40px;
      width:100%;
    }
    .single-title {
      font-size: 22px;
      color: #333333;
    }
    .single-rtitle {
      font-size: 16px;
      color: #7AC5FF;
    }
    .single-mask {
      background:#F9F9F9;
    }
    .single-main{
      padding:40px 60px 70px 60px;
      width: 1190px;
      justify-content:flex-start;
      align-items: flex-start;
      margin: 0 auto 40px auto;
      box-shadow:none;
    }

    .charge-allCard span {
      padding-top: 40px;
      font-size: 14px;
      color: #333333;
      margin-right: 10px;
    }
    .charge-show span{
      font-size:14px;
      color:#000;
      padding-right:3px;
    }
      /*tab*/
    .activeTab {
      border-bottom: 3px solid #fc4147;
    }
    .investTab {
      margin-top: 0px;
    }
    .investTab ul li {
      font-size: 22px !important;
      line-height: 22px;
      padding-bottom: 38px;
    }
    .investTab ul li:nth-of-type(1) {
      margin-left: 0px;
    }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
