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
                       title:'实现银行存管后，是如何保障用户资金安全的？',
                       text:'答：平台用户涉及资金的操作将直接通过由浙商银行为平台用户单独设立的小账户进行，包括存管账户的开立、绑卡、充值、提现等，平台本身不触碰资金，确保用户存管账户及资金的独立性。',
                       show: false
                   },
                   {
                       title:'可以不开通银行存管账户吗？',
                       text:'答：根据银监会下发的监管政策要求，从事网络借贷的平台与个人必须通过存管系统操作。出借人需要开通浙商银行存管账户后才能进行出借，不开通银行存管账户将无法正常使用。',
                       show: false
                   },
                   {
                       title:'如何开通银行存管账户？',
                       text:'答：新用户在注册完成后按照引导流程即可开通。存管账户开通需要用户输入实名信息并绑定银行卡等步骤。老用户可以通过登陆并在首页或者“我的”页面找到开通存管入口，并按照引导流程操作。',
                       show: false
                   },
                   {
                       title:'开通银行存管账户失败该怎么处理？',
                       text:'答：根据页面提示的报错信息重新补充填写。如若还是失败，可以联系在线客服或拨打客服电话：400-135-3388进行咨询。',
                       show: false
                   },
                   {
                       title:'绑定银行卡后能否修改？',
                       text:'答：若您需要修改绑定银行卡可通过微信端进行操作。点击用户头像进入“账户与安全”，在“银行卡”中进行操作。<br/>若您在浙商银行监管的所有P2P网贷平台存管账户余额均为0且无在投项目，系统将自动完成审核；<br/>若您在浙商银行监管的所有P2P网贷平台存管账户有任意一家余额不为0或有在投项目，申请修改银行卡将由浙商银行人工审核完成（审核完成前不允许再次修改）。',
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
               if(item.show == true && ind >= 7){
                    $('html,body').animate({
                       scrollTop:$(window).scrollTop()+scrollTops+'px'
                    },500)
               }
          },
       },
       mounted(){
          var heightStyle = document.documentElement.clientHeight;
          $('#wxCommonIssue').height(heightStyle);
          if (!this.osType) {
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
            li:last-child .headline-box h3.bdr-b:after{
                border: none;
            }
        }
    }
</style>