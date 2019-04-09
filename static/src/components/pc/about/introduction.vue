<template>
  <div class="introduction">
    <!-- <div class="introduceBanner"></div> -->
    <!-- 顶部导航 -->
      <ul class="nva_box clear">
          <li v-for="(val,index) in list" @click="tabFun(index)" :class="{active:num == index}">{{val}}</li>
      </ul>
      <abstract v-if="num == 0"></abstract>
      <team v-else-if="num == 1"></team>
      <certificate v-else-if="num == 2"></certificate>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script>
import abstract from './platform/abstract'  // 平台简介
import team from './platform/team'; // 管理团队
import certificate from './platform/certificate';  // 资质证书
export default {
  name: 'introduction',
  data() {
    return {
          num:'0',
          list:['平台简介','管理团队','资质证书'],    // 关于我们
    }
  },
  methods: {
       tabFun(n){this.num = n;},
       linkFun(){
         this.$route.query.num ? this.num = this.$route.query.num : '';
       }
  },
  components:{
         'abstract':abstract, // 平台简介
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