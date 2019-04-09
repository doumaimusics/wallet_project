<template>
  <div class="security">
    <div v-title>安全保障_E都市钱包_让您安心的出借理财平台</div>
    <div v-keywords>E都市钱包、安全保障、个人理财、P2P理财、互联网金融</div>
    <!-- <div class="introduceBanner"></div> -->
    <!-- 顶部导航 -->
      <ul class="nva_box clear">
          <li v-for="(val,index) in list" @click="tabFun(index)" :class="{active:num == index}">{{val}}</li>
      </ul>
      <custody v-if="num == 0"></custody>
      <control v-else-if="num == 1"></control>
  </div>
</template>

<script>
import custody from './custody.vue';
import control from './control.vue';
export default {
  name: 'security',
  data() {
    return {
          num:'0',
          list:['银行存管','保障措施'],    // 安全保障
    }
  },
  methods: {
       tabFun(n){this.num = n;},
       linkFun(){
         this.$route.query.num ? this.num = this.$route.query.num : this.num = 0;
       }
       
  },
  created(){
      this.linkFun();
  },
  components:{
       'custody':custody,
       'control':control
  },
  mounted() {
  },
  watch: {
    '$route'(){
       this.linkFun();
    }
  }
}  
</script>

<style lang="scss">
</style> 