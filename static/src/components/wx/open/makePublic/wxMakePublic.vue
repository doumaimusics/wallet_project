<template>
    <div id="make-public">
      <div v-title>数据披露</div>
        <swiper :options="swiperOption" :style="(osType ? {top:'0'}:{top:'0'})" class="tab-title bdr-b">
          <swiper-slide v-for="(item,index) in  tabList" :class="{activeLi:activeLi[index]}">
            <p @click="toTab(item,index)">{{item}}</p>
            <span v-if="activeLi[index]"></span>
          </swiper-slide>
        </swiper>
        <div class="tiTab"></div>
        <wx-transaction :numFormat="numFormat" v-if="activeLi[0]"></wx-transaction>
        <!-- <common-problem :type="10" v-if="activeLi[1]"></common-problem> -->
        <div v-if="activeLi[1]" class="asset"><img src="https://aliyunsso.edspay.com/web/wx/makePublic/Asset-1.png" alt=""></div>
        <wx-risk :numFormat="numFormat" v-if="activeLi[2]"></wx-risk>
        <user-portrait :numFormat="numFormat" v-if="activeLi[3]"></user-portrait>
    </div>
    
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import wxTransaction from './wxTransaction';
    import userPortrait from './wxUserPortrait';
    import wxRisk from './wxRisk';
    export default{
      mixins:[wxToapp],
      data(){
        return{
          tabList:['交易数据','资产端数据','风险数据','用户画像'],
          activeLi:[true,false,false,false],
          swiperOption: {
            pagination: '.swiper-pagination',
            slidesPerView: 'auto',
            paginationClickable: true,
            // width :0,
          },

        }
      },
      methods:{
        toTab(item,index){
          for(let i=0;i<this.activeLi.length;i++){
            this.$set(this.activeLi,i, false);
          }
          this.$set(this.activeLi, index, true);
          document.body.scrollTop = 0;
        },
        //加逗号
        numFormat(money){
          if(money == 0){
              return money;
          }else{
              var n = 2;
              money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
              var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
              var t = "";
              for (var i = 0; i < l.length; i++) {
              t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
              }
              return  t.split("").reverse().join("");
          }
        },
      },
      components:{
        wxTransaction,
        userPortrait,
        wxRisk
      },
      created(){
          if(this.$route.query.tab){
            let n = this.$route.query.tab
            for(let i=0;i<this.activeLi.length;i++){
              this.$set(this.activeLi,i, false);
            }
            this.$set(this.activeLi, n, true);
          }
      },
      mounted(){
      }
    }
</script>

<style lang="scss" scoped>
    #make-public{
        background:#fff;
        //min-height: 17.786667rem;
        color:#333;
        .bdr-b:after{border-bottom: 1px solid #ddd;}
        .tab-title{
            position: relative;
            background:#fff;
            position:fixed;
            list-style-type: none;
            background: #fff;
            padding: 0;
            overflow-y: auto;
            height:1.066667rem;
            width:10.0rem;
            z-index:10;
            .swiper-slide{
              padding: 0 0.666667rem;
              width: auto;
              font-size:0.373333rem;
              line-height:1.013333rem;
              color: #7A8898;
              position: relative;
              p{line-height:1.026667rem;}
              span{
                height:0.053333rem;
                width:0.666667rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -0.306667rem;
                background: #4C7DE9;
              }
            }
            .activeLi p{
              color:#4C7DE9;  
              // border-bottom:1px solid #4CB1FF;
            }
        }
        .asset{
          width:100%;
          background:#fff;
          padding:0.533333rem 0;
          img{width:8.88rem;display:block;margin: 0 auto;}
        }
        .tiTab{
          height:1.066667rem;
          background:#fff;
        }
    }
</style>