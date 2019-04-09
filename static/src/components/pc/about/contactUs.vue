<template>
  <div class="contact">
    <!-- <div class="introduceBanner"></div> -->
    <!-- 顶部导航 -->
      <!-- <ul class="nva_box clear">
          <li v-for="(val,index) in list" @click="tabFun(index)" :class="{active:num == index}">{{val}}</li>
      </ul> -->
      <contactUs v-if="num == 0"></contactUs>
  </div>
</template>

<script>
import contactUs from './platform/contactUs.vue';
export default {
  name: 'contact',
  data() {
    return {
          num:'0',
          list:['联系我们']    // 联系我们
    }
  },
  methods: {
       tabFun(n){this.num = n;},
       linkFun(){
         this.$route.query.num ? this.num = this.$route.query.num : this.num = 0;
       }
  },
  components:{
       'contactUs':contactUs,
  },
  created(){
      this.linkFun();
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