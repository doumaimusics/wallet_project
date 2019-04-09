<template>
  <div class="investRecord">
    <ui-title title="出借记录"></ui-title>
    <div class="investTab">
      <ul>
        <li :class="{activeTab:1 === isActive}" @click="tabList(1)">出借记录</li>
        <li :class="{activeTab:2 === isActive}" @click="tabList(2)">出借项目</li>
      </ul>
    </div>
    <div class="investTabDiv">
      <ui-record v-if="isActive === 1" @sigeinfo="sigeinfo"></ui-record>
      <ui-project v-if="isActive === 2" @sigeinfo="sigeinfo"></ui-project>
    </div>
  </div>
</template>
<script>
  import title from "../../public/account-title.vue"
  import record from "./investTab.vue"
  import project from "./investProjectTab.vue"
    export default {
      data () {
        return {
          isActive: 1,
        }
      },
      components: {
        'ui-title': title,
        'ui-record': record,
        'ui-project': project
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
   .investRecord{
     background: #fff;
         padding: 43px 20px 0;
   }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
