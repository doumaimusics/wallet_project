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
                       title:'抵扣红包是什么？',
                       text:'答：抵扣红包是平台为用户提供的出借福利，可以在出借时直接抵扣出借金额。例如：您出借5000元，使用了20元抵扣红包，实际只需要支付4980元，本息则按照5000元计算。',
                       show: false
                   },
                   {
                       title:'抵扣红包有什么限制？',
                       text:'答：平台抵扣红包会有三个方面的限制： 出借期限、出借金额与有效期。出借期限限制是指使用该红包必须出借对应的出借项目，如仅限E计划-90天使用等；出借金额限制是指使用该红包必须出借对应的出借金额，如满5000元可用等；有效期限制是指抵扣红包必须在指定期限之内使用，过期后红包将不能再使用。',
                       show: false
                   },
                   {
                       title:'现金红包是什么，有什么限制？',
                       text:'答：现金红包既可以在出借时直接抵扣，也可以直接兑换现金到您的账户。为了控制风险，现金红包每天只能兑换3次，如您当天已兑换3次，建议您第二天再进行操作。',
                       show: false
                   },
                   {
                       title:'加息券是什么，有什么限制？',
                       text:'答：加息券是指额外增加的年化利率。加息券的一些限制条件：<br/>1、x天以上：项目期限x天以上的出借项目才能使用。<br/>2、最高x元可享加息：最高x元的出借金额能够享受加息，超过x元的部分不参与加息。<br/>3、加息x天：只有x天可享受加息，例如项目的项目期限为30天，而加息券的加息天数为10天，则只有10天享受加息，其余20天不加息。',
                       show: false
                   },
                   {
                       title:'出借时可以使用多张优惠券吗？',
                       text:'答：当用户出借时，仅可使用红包或加息券，两者不可同时使用。',
                       show: false
                   },
                   {
                       title:'新手红包如何使用？',
                       text:'答：新手红包可用于平台所有出借项目。每个出借项目只能使用一张红包，新手红包有效期不同，失效后将不能使用。',
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
               if(item.show == true && ind>=7){
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
              $(document).scrollTop(0)
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