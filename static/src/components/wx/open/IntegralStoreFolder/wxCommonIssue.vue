<template>
   <div id="wxCommonIssue" >
       <!-- <div class="title-box "></div> -->
       <h3 class="title bdr-b"></h3 >
       <ul class="bdr-b">
           <!-- <i :style="{background:'url('+ listIcon +') no-repeat left center'}"></i>{{item}}</p> -->
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
                       title:'什么是银行存管？',
                       text:'答：银行存管是指用户在P2P平台上的交易资金交由银行进行管理，平台无法接触交易资金的一种资金管理模式。借款人、出借人和平台通过在银行开设的存管账户，来实现交易和资金结算。目前E都市钱包平台接入的是浙商银行存管系统',
                       show: false
                   },
                   {
                       title:'什么是E计划？',
                       text:'答：E计划是平台推出的对借款项目进行本金循环自动出借及项目期限届满时自动转让债权的出借工具。在项目期限内，系统智能分散匹配小额消费债权；项目到期后，系统协助出借人完成债权转让，本金和利息一次性回款到您的账户。',
                       show: false
                   },
                   {
                       title:'什么是债权转让？',
                       text:'答：债权转让是指原来的债权人通过与第三人订立合同将债权的全部或部分转移于第三人。在项目回款日，通过授权平台债权转让的方式，将用户所持的全部债权进行转让，转让成功后，方可退出回款。',
                       show: false
                   },
                   {
                       title:'项目什么时候回款？如何查看回款时间？',
                       text:'答：出借项目到期后1-3个工作日之内本息将回款到您的账户；<br/>APP端：出借成功后，可到“我的”-“回款计划”中查看；<br/>电脑端：出借成功后，可到“我的账户”-“回款计划”中查看。',
                       show: false
                   },
                   {
                       title:'什么是VIP会员？',
                       text:'答：VIP会员制度是平台为会员用户提供的福利体系，用户的每一次出借都可以按照固定的比例获得成长值。不同的成长值对应不同的会员等级，每个会员等级都有相应的等级要求，同时也会享受升级带来的固定福利，包括现金红包、加息力度等。您可通过电脑端与APP端“VIP会员”页面查看详情。',
                       show: false
                   },
                   {
                       title:'新手红包如何使用？',
                       text:'答：新手红包可用于平台所有出借项目，根据红包限制不同，可以使用的出借项目与出借金额也不同。每个出借项目只能使用一张红包，新手红包有效期不同，失效后将不能使用。',
                       show: false
                   }

               ],
               backgImg:'https://aliyunsso.edspay.com/web/wx/helpCenter/Rectangle.png?v=1.0'
               
           }
       },
       methods:{ 
          changeli(ind,item){    // 手风琴效果
              this.headerData.forEach( i => {
                if(i.show !== this.headerData[ind].show){
                    i.show = false;
                } 
              });
               item.show = !item.show;
          },
       },
       mounted(){
          
       }
   }
    
</script>

<style lang="scss" scoped>
    #wxCommonIssue{
        width: 100%;
        background: #fff;
        position: relative;
        overflow: hidden;
        font-family: PingFangSC-Regular;
        h3.title{
           width: 100%;
           height: 1.4rem;
           background:url('https://aliyunsso.edspay.com/web/wx/helpCenter/help_title.png?v=1.0') no-repeat center center;
           background-size: 5.973333rem .413333rem; 
           position: relative; 
        }
        ul{
            margin-bottom: .586667rem;
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
            li:last-child .headline-box h3.bdr-b:after{
                 border: none;
            }
        }
    }
</style>