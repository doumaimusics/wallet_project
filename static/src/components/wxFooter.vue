<template>
  <div class="wxFooter">
    <ul class="navbar-fixed-bottom" style="padding-top:1px;">
      <li v-for="(item,index) in dataList" >
         <!-- v-if="index != 2" -->
        <router-link :to="{path:bottomList[index]}" active-class="footerActive" replace v-if="index != 2">
          <i :style="{background:'url('+(flagList[index] ? item.normalImage:item.selectedImage)+') no-repeat'}"></i>
          <p class="home_font text-color">{{item.title}}</p>
        </router-link>
        <a @click="goIntStore" active-class="footerActive" replace v-else-if="index == 2">
          <i :style="{background:'url('+(flagList[index] ? item.normalImage:item.selectedImage)+') no-repeat'}"></i>
          <p class="home_font text-color" :class="{activeP:!flagList[index]}">{{item.title}}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        // '/userVip',
        bottomList:['/wxIndex','/wxInvest','/intIndex','/wxMyAccount'],
        dataList:[],
        styleShow:false,
      }
    },
    computed:{
      flagList:{
        get(){
          var _flagList = [];
          // 4
          for(var i=0;i<4;i++){
            if(this.bottomList[i] == this.$route.path){
              _flagList.push(false);
            }else{
              _flagList.push(true);
            }
          }
          return _flagList;
          console.log(_flagList)
        },
        set(){}
      }
    },
    methods:{
      getData(){
        this.notLogPost('/index/navbar',(data) =>{
          if(data.resCode){
            global.wxFooterData = data.resData.data.wechatBottomIcon;
            this.dataList = data.resData.data.wechatBottomIcon;
            console.log(this.dataList.length)
            // this.dataList.splice(2,1)
          }
        },{})
      },
      goIntStore(){
        _czc.push(﻿["_trackEvent", "底部积分商城ico", "商城"]);
        this.$router.push({path:'/intIndex'})
      }

    },
    mounted() {
      var that = this;
      // 数据统计
      const script = document.createElement('script')
      script.src = 'https://s13.cnzz.com/z_stat.php?id=1273720998&web_id=1273720998 '
      script.language = 'JavaScript'
      document.body.appendChild(script)
    },
    watch: {
      '$route'() {
        if (window._czc) {
          let location = window.location
          let contentUrl = location.pathname + location.hash
          let refererUrl = '/'
          window._czc.push(['_trackPageview', contentUrl, refererUrl])
        }
      }
    },
    created(){
      console.log(global.wxFooterData)
      if( global.wxFooterData) {
        this.dataList = global.wxFooterData;
      }
      else this.getData();
    }
  }
</script>


<style lang="scss">
  /*声明常用变量*/
  $colRed:#ff5b55;



  .wxFooter{
    border-top: 1px solid #EBEBEB;
    position: fixed;
    bottom: 0;
    left: 0;
    height: 1.333333rem;
    width: 100%;
    text-align: center;
    font-size: 0.32rem;
    line-height: .32rem;
    color: #BCBCBC;
    margin-top: .02rem;
    background:#fff;
    z-index: 990;
    box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
  }
  .wxFooter .navbar-fixed-bottom{
    display: table;
    width: 100%;
  }
  .wxFooter .navbar-fixed-bottom li{
    padding-top: 0.133333rem;
    display: table-cell;
    // width: 33.3%;
    width: 25%;
  }
  .wxFooter .navbar-fixed-bottom li a{
    width:100%;
    display: inline-block;
    color: #BCBCBC;
    i{
      display: inline-block;
      height: 0.666667rem;
      width: 0.666667rem;
      background-size: 0.666667rem!important;
    }
  }
  
  .footerActive p{
    color:#FF5A54!important;
  
  }
  .activeP{
    color:#FF5A54!important;
  }


</style>