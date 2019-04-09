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
                       title:'什么是自动复投？',
                       text:'答：在项目期限内，借款人发起还款后，平台在用户授权下将本金进行循环出借，完成整个项目。',
                       show: false
                   },
                   {
                       title:'如何关闭浙商银行投标短信通知？',
                       text:'答：在您的手机短信里设置，即可关闭短信通知，无声提醒。<br/>IOS手机：短信列表中看到95527浙商银行，向左滑动，按下“隐藏提醒”；<br/>安卓手机：短信列表中看到95527浙商银行，点击左边银行图标进入，按下“加入黑名单”(以小米mix2为例，不同机型操作不同)。',
                       show: false
                   },
                   {
                       title:'平台有几种出借项目？',
                       text:'答：目前平台的出借项目：E计划，根据出借时间不同分为E计划-30天、E计划-60天、E计划-90天、E计划-180天与E计划-360天，对应资产均为消费分期类资产。',
                       show: false
                   },
                   {
                       title:'出借后多久计息，利息如何计算？',
                       text:'答：出借成功后次日计息，利息计算公式为：出借本金*参考年化/360*项目期限（天）。平台不承诺收益，以实际到账收益为准。',
                       show: false
                   },
                   {
                       title:'项目什么时候到期，如何查看到期时间？',
                       text:'答：出借成功后从第二天开始计息。<br/>APP端：出借成功后，可到“我的”-“出借记录”中查看。<br/>电脑端：出借成功后，可到“我的账户”-“出借记录”中查看。',
                       show: false
                   },
                   {
                       title:'项目什么时候回款？如何查看回款时间？',
                       text:'答：出借项目到期后1-3个工作日之内本息将回款到您的账户。<br/>APP端：出借成功后，可到“我的”-“回款计划”中查看<br/>电脑端：出借成功后，可到“我的账户”-“回款计划”中查看。',
                       show: false
                   },
                   {
                       title:'怎么查看电子合同？',
                       text:'答：APP端：可在“我的-出借记录-查看详情-借款人列表”中查看。<br/>电脑端：可在“我的账户-出借记录-查看详情”中查看。',
                       show: false
                   },
                   {
                       title:'借款人逾期了怎么办？',
                       text:'答：由于出借项目为多个借款人集合，个别借款人逾期不影响平台的正常回款。如果借款人出现逾期，将由资产端负责催收。',
                       show: false
                   },
                   {
                       title:'出借本金是什么？',
                       text:'答：出借本金是指在计算利息之前的原始金额，出借过程中使用的抵扣红包与现金红包也计算在内。',
                       show: false
                   },
                   {
                       title:'参考年化是什么？',
                       text:'答：参考年化收益率又称参考年化，是把当前收益率（日收益率、周收益率、月收益率）换算成年收益率来计算的，是一种理论收益率，并不是真正的已取得的收益率。',
                       show: false
                   },
                   {
                       title:'出借项目是怎么审核的？',
                       text:'答：平台所有出借项目都经过多重审核。资产方会对借款人资质进行审核，包括身份认证、通讯录认证、运营商认证、芝麻信用认证、生物指纹认证等，对借款人建立多维度的风控分析图，确保借款人信息真实；平台风控团队根据“蜂巢”风控体系对借款人进行二次审核，保证每一笔借款优质，借款人还款能力与还款意愿强。',
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