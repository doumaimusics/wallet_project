<template>
    <div class="makePublic">
        <!-- 顶部导航 -->
        <ul class="nva_box clear">
            <li v-for="(val,index) in list" @click="tabFun(index)" :class="{active:num == index}">{{val}}</li>
        </ul>
        <makePublic  :nums="num"></makePublic>
    </div>
</template>

<script>
    import makePublic from '.././platform/makePublic.vue';
    export default {
       data(){
           return{
               num:0,
               list:['交易数据','资产端数据','风险数据','用户画像'],    
           }
       },
       methods:{
           tabFun(num){
             this.num = num;
           },
           linkFun(){
               this.$route.query.num ? this.num = this.$route.query.num : this.num = 0;
           }
       },
       created(){
         this.linkFun();
       },
       components:{
        'makePublic':makePublic
       },
       watch:{
           '$route'(){
               this.linkFun();
           }
       }


    }
</script>

<style lang="scss">
 // 行政检查关闭
// .hide{
//     position: fixed;
//     top: 0;
//     bottom: 0;
//     left: 0;
//     right: 0;
//     margin: auto;
//     background: #fff;
//     z-index: 9999;
// }
</style>

