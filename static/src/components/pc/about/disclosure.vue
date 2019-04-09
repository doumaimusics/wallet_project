<template>
  <div class="introduction">
    <div v-title>信息披露_E都市钱包_让您安心的出借理财平台</div>
    <div v-keywords>E都市钱包、信息披露、出借理财、个人理财、P2P理财、互联网金融</div>
    <!-- <div class="introduceBanner"></div> -->
    <!-- 顶部导航 -->
      <ul class="nva_box clear">
          <li v-for="(val,index) in list" @click="tabFun(index)" :class="{active:num == index}">{{val}}</li>
      </ul>
      <commitment v-if="num == 0"></commitment>
      <approve v-else-if="num == 1"></approve>
      <information v-else-if="num == 2"></information>
      <reviewed v-else-if="num == 3"></reviewed>
      <commonProblem v-else-if="num == 4"></commonProblem>
  </div>
</template>

<script>
import commitment from './platform/commitment.vue';   // 法人承诺函
import abstract from './platform/abstract'  // 平台简介
import approve from './platform/approve'  // 备案信息
import reviewed from './platform/reviewed'  // 审核信息
import commonProblem from './commonProblem.vue'; // 经营信息
import information from './platform/information.vue';  // 组织信息
import team from './platform/team'; // 管理团队
import certificate from './platform/certificate';  // 资质证书
export default {
  name: 'introduction',
  data() {
    return {
          num:'2',
          list:['法人承诺函','备案信息','组织信息','审核信息','经营信息'],    
    }
  },
  methods: {
       tabFun(n){this.num = n;},
       linkFun(){
         this.$route.query.num ? this.num = this.$route.query.num : '';
       }
  },
  components:{
         'commitment':commitment,  // 法人承诺
         'approve':approve,  // 备案信息
         'abstract':abstract, // 平台简介
         'information':information,  // 机构信息
         'reviewed':reviewed, // 审核信息
         'commonProblem':commonProblem, // 经营信息
         'team':team,    // 管理团队
         'certificate':certificate  // 资质证书
  },
  mounted() {
    let id = "1264318660"
    const script = document.createElement('script')
    script.src = 'https://s13.cnzz.com/z_stat.php?id=' + id + '&web_id=' + id
    script.language = 'JavaScript'
    document.body.appendChild(script)
  },
  created(){
     this.linkFun();
  },
  watch: {
    '$route'() {
      if (window._czc) {
        let location = window.location
        let contentUrl = location.pathname + location.hash
        let refererUrl = '/'
        window._czc.push(['_trackPageview', contentUrl, refererUrl])
      }
      this.linkFun();
    }
  }
}  
</script>

<style lang="scss">
.introduction {
  width: 100%;
  height: auto;
  .introduceBanner {
    width: 890px;
    height: 220px;
    background: url(https://aliyunsso.edspay.com/web/about/introduceBanner2.png);
    background-size: 100% 100%;
  }
}
</style> 