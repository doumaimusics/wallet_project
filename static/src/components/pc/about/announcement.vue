<template>
    <div class="announcement">
        <!-- 顶部导航 -->
      <!-- <ul class="nva_box clear">
          <li v-for="(val,index) in list" @click="tabFun(index)" :class="{active:num == index}">{{val}}</li>
      </ul> -->
      <announ v-if="num == 0"></announ>
    </div>
</template>

<script>
    import announcement from './platform/announcement.vue';   // 媒体报道
    export default {
      //  name:'announcement',
       data(){
           return{
               num:0,
               list:['平台公告'],    // 对外公告
           }
       },
       methods:{
           tabFun(n){
             this.num = n;
           },
           linkFun(){
               this.$route.query.num ? this.num = this.$route.query.num : this.num;
           }
       },
       created(){
            this.linkFun();
       },
       components:{
           'announ':announcement,
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

