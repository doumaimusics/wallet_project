<template>
    <div class="mediaReport">
        <!-- 顶部导航 -->
      <ul class="nva_box clear">
          <li v-for="(val,index) in list" @click="tabFun(index)" :class="{active:num == index}">{{val}}</li>
      </ul>
      <covrage v-if="num == 0"></covrage>
      <history v-else-if="num == 1"></history>
      <Emeeting v-else-if="num == 2"></Emeeting>
    </div>
</template>

<script>
    import covrage from './platform/coverage.vue';   // 媒体报道
    import history from './platform/history.vue';  // 发展历程
    import Emeeting from './platform/Emeeting.vue';  // E友见面会
    export default{
       name:'mediaReport',
       data(){
           return{
               num:'0',
               list:['媒体报道','发展历程','E友见面会'],    // 公司动态
           }
       },
       methods:{
           tabFun(n){
             this.num = n;
           },
           linkFun(){   // 外部跳转进来
               this.$route.query.num ? this.num = this.$route.query.num : this.num = 0;
           }
       },
       created(){
           this.linkFun();
       },
       components:{
           'covrage':covrage,
           'history':history,
           'Emeeting':Emeeting
       },
       watch:{
           '$route'(){
               this.linkFun();
           }
       }


    }
</script>

<style lang="scss">

</style>

