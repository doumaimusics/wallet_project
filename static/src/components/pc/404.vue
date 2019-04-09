<template>
  <div class="fail">
    <div class="content">
      <router-link to="/home" class="toIndex" tag='div'></router-link>
      <div @click="toF" class="f5"></div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'fail',
	data(){
      return {
        
      }
    },
    methods:{
      toF(){
        
        this.$router.push('404')
      }
    },
  }  
</script>

<style scoped lang="scss">
    div.fail{
        width:100%;
        height:540px;
        line-height:800px;
        color:#999;
        text-align: center;
        font-size: 150px;
        background: #F5F5F5;
        padding-top: 127px;
    }
    .content{
      height: 250px;
      width: 540px;
      margin: 0 auto;
      background: url('https://aliyunsso.edspay.com/web/websiteMap/web404.png') no-repeat;
      background-size:100% 100%;
      position: relative;
      .toIndex{
        cursor: pointer;
        position: absolute;
        bottom:0;
        left:50%;
        margin-left:3px;
        height:30px;
        width:80px;
        z-index:10;
      }
      .f5{
        width:60px;
        height:30px;
        position: absolute;
        right:0;
        top:128px;
        cursor: pointer;
      }
    }
</style>