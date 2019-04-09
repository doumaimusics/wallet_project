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
                       title:'注册成功后如何充值？',
                       text:'答：确认登录之后打开“我的”-“充值”，按照页面流程进行操作（由于各银行充值限额不同，请在充值之前查看“限额说明”）。<br/>* 存管账户充值成功后可立即出借，但需要等T+1天（T为工作日）银行清算完成后才能提现。',
                       show: false
                   },
                   {
                       title:'线上充值的金额是实时到账的吗？',
                       text:'答：在网络等条件都正常的情况下，线上充值的金额是实时到账的。',
                       show: false
                   },
                   {
                       title:'什么是大额充值，怎么操作？',
                       text:'答：大额充值是指超过了银行卡单日或单笔的最大限额，不能使用快捷支付，需登录电脑端使用网银进行支付（各银行对银行卡的限额有差异，以具体的银行限额为准）。<br/>电脑端：“我的账户-我的资产-存管账户”，可查看您的浙商银行存管账号。<br/>APP端：打开“我的”-“充值”，点击转账充值，并根据页面引导进行操作。',
                       show: false
                   },
                   {
                       title:'银行卡扣款却显示充值失败，怎么办？',
                       text:'答：浙商银行清算对账时，如果发现出借人充值失败，会将充值金额原路退回到出借人在平台绑定的银行卡中。您也可以联系客服：400-135-3388寻求帮助。',
                       show: false
                   },
                   {
                       title:'充值失败时该如何解决？',
                       text:'答：充值失败情况以及对应的解决方法：<br/>1、您输入的验证码错误：请输入正确的验证码；<br/>2、银行卡余额不足：请您充值前确认余额或更换银行卡充值；<br/>3、充值超出限额：请更改充值金额或使用大额充值；<br/>4、页面提示超时或网络不稳定：请您切换网络或稍后重试；<br/>5、验证码接收不到：请您检查手机短信屏蔽设置；<br/>如您有遇到其他问题或以上方法未能解决问题，请联系人工客服：400-135-3388。',
                       show: false
                   },
                   {
                       title:'如何提现，是否有限额与次数限制？',
                       text:'答：打开“我的”-“提现”，按照引导流程操作即可。<br/>提现金额最低2元，最高额度以各家银行的实际限额为准，次数无限制。',
                       show: false
                   },
                   {
                       title:'提现什么时候到账，手续费怎么收取？',
                       text:'答：浙商银行卡额度不限，当天到账；<br/>其他银行卡：5万及以下（含5万）提现当天到账；<br/>5万以上：非工作日不受理，工作日工作时间提现当天到账。<br/>平台提现无手续费。',
                       show: false
                   },
                   {
                       title:'提现失败怎么办？',
                       text:'答：如果您提现的资金为当日充值的资金，则需要T+1天（T为工作日）浙商银行清算完成后才能提现；若您因为其他原因出现了无法提现的问题，请联系客服400-135-3388为您服务。',
                       show: false
                   },
                   {
                       title:'提现还未处理能否撤销？',
                       text:'答：提现申请一旦提交一律无法撤销，请您在提现之前再次确认。',
                       show: false
                   },
                   {
                       title:'为什么会出现提现失败？',
                       text:'答：银行卡出现挂失、注销或信息变更或银行卡信息有误。<br/>若出现提现失败的情况，请联系在线客服，或拨打400-135-3388人工客服电话咨询解决。',
                       show: false
                   },
                   {
                       title:'出借过程中有手续费吗？',
                       text:'答：您在充值、出借、提现过程中都没有手续费，即使有费用，也是由平台全部垫付。平台目前唯一的费用为利息管理费，按照项目基础收益的3%的标准收取。',
                       show: false
                   },
                   {
                       title:'用户出借之后的资金去哪里了？',
                       text:'答：平台所有用户的出借资金均由浙商银行存管系统统一交易划拨，最终到达借款人的银行卡中。',
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
        height: auto;
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