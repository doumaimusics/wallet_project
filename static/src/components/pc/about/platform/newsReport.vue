<!-- 网站公告模板   废弃了-->
<template>
    <div id="newsReport">
        <div class="main">
            <div class="title">钱宝宝来了</div>
            <div class="pic"><img src="https://static.edspay.com/articleEditor/1708080483381941-89504E47/view.html" alt=""></div>
            <div class="back"><span @click='$router.go(-1)'>[&nbsp;返回&nbsp;]</span></div>
            <div class="guide">
                <div class="previousPage">上一篇：
                    <router-link :to="{ path: '/about/newsReport', query: { newsReport:888 }}">存管周报</router-link>
                </div>
                <div class="nextPage">
                    下一篇：
                    <router-link :to="{ path: '/about/newsReport', query: { newsReport:888 }}">E起赚加息预热</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
	name: 'newsReport',
	data(){
      return {
        
      }
    },
    methods:{
        
    },

  }  
</script>

<style lang="scss">
    #newsReport{
       width:100%;
       background:#f3f3f3;
       padding-top:20px;
       padding-bottom:40px; 
       .main{
          width: 1200px;
          height:auto;
          margin:0 auto;
          background:#fff;
          padding-top:40px;
          padding-bottom:50px;
          .title{
            width:100%;
            height:80px;
            text-align:center;
            font-size:28px;
            color:#333;
            line-height:80px;
          }
          .pic{
            width:750px;
            height:auto;
            margin:40px auto 0;
          }
          .back{
              width:100%;
              height:80px;
              text-align:center;
              font-size:16px;
              color:#333;
              line-height:80px;
              span{
                cursor: pointer;
              }
          span:hover{
              color:#f75a31;
          }
          }
          .guide{
              cursor: default;
              float: none;
              width:100%;
              height:80px;
              margin-top:40px;
              font-size:16px;
              color:#333;
              line-height:40px;
              padding:0 100px;
              a:hover{
                  color:#f75a31;
              }
          }
       }
    }
</style>