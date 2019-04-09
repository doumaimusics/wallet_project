<template>
   <div id="wxCommonIssue" >       
       <ul class="bdr-b">
           <li v-for="(item,index) in headerData">
               <div class="headline-box">
                   <h3 class="bdr-b" :class="[{active:item.show}]" :style="{background:'url('+backgImg+') no-repeat 8.5rem center'}" @click="changeli(index,item)">
                       <i></i>
                       <span v-html="item.title"></span>   
                    </h3>
               </div>
               <p v-html="item.text" v-show="item.show"></p>
           </li>
       </ul>
   </div>
</template>

<script>
   export default{
       data(){
           return{
               headerData:[
                   {
                    title:'什么是积分？',
                    text:'答：积分是平台推出的一款福利，可用于在积分商城兑换平台提供的福利，如红包和某些实物等。',
                    show: false
                  },
                  {
                    title:'如何赚取积分？',
                    text:'答：用户可通过出借、新手成长任务、出借里程碑、签到等方式获取积分。',
                    show: false
                  },
                  {
                    title:'积分可转让、兑现吗？',
                    text:'答：个人用户所获取的积分不可转让，不可兑换现金，只能用来参与平台提供的福利兑换。',
                    show: false
                  },
                  {
                    title:'积分可无限使用吗？',
                    text:'答：积分有效期为一年，当月所获得的所有积分，于次年相同月份的最后一天23：59：59过期。',
                    show: false
                  },
                  {
                    title:'积分如何使用？',
                    text:'答：积分可用来兑换平台提供的福利，包括加息券红包、以及各种实物商品，以及参与指定活动等。',
                    show: false
                  },
                  {
                    title:'积分商城兑换规则',
                    text:'答：1、积分兑换的加息券与红包将会实时发放。<br />2、实物商品自兑换成功后的15个工作日内发货，如遇节假日与不可抗力因素顺延，且在积分商城-兑换记录-兑换详情中可以查询到该商品的物流单号。<br />3、视频会员类商品自兑换成功后的三个工作日内发放，请在积分商城-兑换记录-兑换详情中查看对应激活码。<br />4、积分商城所有兑换的商品均包邮（快递无法到达的偏远地区除外）且不提供发票，如有任何质量问题请于收货后的24小时内联系客服，客服电话400-135-3388',
                    show: false
                  }

               ],
               backgImg:'https://aliyunsso.edspay.com/web/wx/helpCenter/Rectangle.png?v=1.0'
               
           }
       },
       methods:{ 
          changeli(ind,item){    // 手风琴效果
          let scrollTops = $('#wxCommonIssue ul li p').outerHeight();
              this.headerData.forEach( i => {
                if(i.show !== this.headerData[ind].show){
                    i.show = false;
                } 
              });
               item.show = !item.show;
               if(item.shhow == true && ind>=7){
                   $('html,body').animate({
                      scrollTop:$(window).scrollTop()+scrollTops+'px'
                   },500)
               }
          },
       },
       mounted(){
          var heightStyle = document.documentElement.clientHeight;
          $('#wxCommonIssue').height(heightStyle);
          if(!this.osType){
              $(document).scrollTop(0);
          }
       },
       
   }
    
</script>

<style lang="scss" scoped>
    #wxCommonIssue{
        width: 100%;
        background: #fff;
        position: relative;
        font-family: PingFangSC-Regular;
        ul{
            background: #fff;
            position: relative;
            li{
                width: 100%;
                .headline-box{
                    width: 100%;
                    height: 1.466667rem;
                    line-height: 1.466667rem;
                    background: #fff;
                    padding-left: .533333rem;
                
                h3{
                    position: relative;
                    font-size: .373333rem;
                    color: #333;
                    overflow: hidden;
                    background-size: .4rem .4rem!important;
                    background-position: 8.5rem center;
                    height: 100%;
                    i{
                        width: .4rem;
                        height: .4rem;
                        display: inline-block;
                        background: url('https://aliyunsso.edspay.com/web/wx/helpCenter/issoe.png?v=1.0') no-repeat;
                        background-size: cover;
                        position: absolute;
                        top: 0;bottom: 0;
                        margin: auto;
                    }
                    span{
                        margin-left: .533333rem;
                    }
                }
                h3.active{
                    background: url('https://aliyunsso.edspay.com/web/wx/helpCenter/RectangleUp.png?v=1.1') no-repeat!important;
                    background-size: .4rem .4rem!important;
                    background-position: 8.5rem center !important;
                }
                }
                p{
                    background: #F8F8F8;
                    padding:.4rem .533333rem .666667rem .533333rem;
                    font-size: .346667rem;
                    color: #8d8d8d;
                    line-height: .666667rem;
                }
            }
            li:last-child .headline-box h3.bdr-b{
                border: none;
            }
        }
    }
</style>