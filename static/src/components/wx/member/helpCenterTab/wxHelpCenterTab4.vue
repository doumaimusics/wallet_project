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
                       title:'如何注册会员？',
                       text:'答：电脑端：在浏览器页面输入平台链接www.edspay.com进入官网首页，点击网站首页右上角“注册”进入注册页面，按照提示输入手机号码、 验证码、密码即可完成注册。<br/>APP端：下载E都市钱包APP最新版，点击首页右下角“我的”进入新页面，点击“注册/登录“，按照提示输入手机号码与验证码等信息，即可完成注册。',
                       show: false
                   },
                   {
                       title:'一个手机号或一个身份证号能够认证几个账号？',
                       text:'答：一个手机号或身份证号只能认证一个账号，不能重复认证。',
                       show: false
                   },
                   {
                       title:'注册过程中收不到验证码怎么办？',
                       text:'答：请您确认手机是否安装短信拦截或者过滤软件、手机是否能正常接收短信（处于停机、欠费、信号弱等非正常状态）以及手机接收短信是否出现延迟等等。如果个人手机无任何非正常状态，请直接联系在线客服或拨打400-135-3388电话咨询人工客服。',
                       show: false
                   },
                   {
                       title:'可以绑定多张银行卡吗？',
                       text:'答：目前平台存管账户仅支持绑定一张银行卡，建议您在绑卡过程中选择常用银行卡。',
                       show: false
                   },
                   {
                       title:'银行卡丢失或银行卡信息填写错误怎么办？',
                       text:'答：您可以通过微信端修改当前所绑定的银行卡。点击用户头像进入“账户与安全”，在“银行卡”中进行操作；<br/>若您在浙商银行监管的所有P2P网贷平台存管账户余额均为0且无在投项目，系统将自动完成审核；<br/>若您在浙商银行监管的所有P2P网贷平台存管账户有任意一家余额不为0或有在投项目，申请修改银行卡将由浙商银行人工审核完成（审核完成前不允许再次修改）。',
                       show: false
                   },
                   {
                       title:'忘记登录密码怎么办？如何修改登录密码？',
                       text:'答：在电脑端与APP端登录页面点击忘记密码，根据提示信息进行操作即可重新找回。<br/>电脑端：登录成功后点击“我的账户”-“账户设置”，在登录密码位置进行修改。<br/>APP端：登陆成功后在“我的”页面点击用户头像进入“账户与安全”，在“密码管理”中即可修改登录密码。',
                       show: false
                   },
                   {
                       title:'如何设置交易密码？',
                       text:'答：App端：“我的-账户与安全-密码管理”中查看。<br/>电脑端：“我的账户-账户设置”中查看。',
                       show: false
                   },
                   {
                       title:'账户被锁了怎么办？',
                       text:'答：登录时密码错误多次会导致账户被自动锁定，账户被锁定后不会自动解锁。请联系在线客服或拨打400-135-3388电话咨询人工客服，客服核实后可解锁账户。',
                       show: false
                   },
                   {
                       title:'什么是VIP会员？',
                       text:'答：VIP会员制度是平台为会员用户提供的福利体系，用户的每一次出借都可以按照固定的比例获得成长值。不同的成长值对应不同的会员等级，每个会员等级都有相应的等级要求，同时也会享受升级带来的固定福利，包括红包福利、加息福利等。您可通过电脑端与APP端“VIP会员”页面查看详情。',
                       show: false
                   },
                   {
                       title:'VIP会员等级是固定不变的吗？',
                       text:'答：平台的会员等级会根据用户当前的等级要求进行变动。如果您不满足当前的会员等级要求，系统将自动降级；如果您满足了高一级的会员要求，系统将自动为您升级。目前平台最高的会员等级是VIP6级。',
                       show: false
                   },
                   {
                       title:'成为VIP会员有什么好处？',
                       text:'答：您可以享受以下福利：固定的升级礼包（降级再升级不可享受，等级越高力度越大）、生日福利、节日福利、每月福利、会员加息（会员等级不同，加息力度也不同，最高1.8%）等。您可以在“VIP会员”页面查看详情。',
                       show: false
                   },
                   {
                       title:'风险测评是什么？必须要做吗？',
                       text:'答：平台风险测评是根据自建风控体系与银行用户风险评估体系结合，根据最终的测评结果，为出借人提供智能投顾服务。风险测评是国家监管政策明令要求完成的项目，如果用户风险测评未完成，将不能正常出借。',
                       show: false
                   },
                   {
                       title:'风险测评的规则是什么？',
                       text:'答：根据用户财务状况、投资经验、风险偏好、风险承受能力的不同，平台将用户分为保守型、稳健型、激进型。根据等级不同，平台会对用户在出借过程中的出借金额与出借项目进行限制，具体限制请在完成风险测评后查看。',
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
               if(item.show == true && ind >= 7){    // 当时展开的时候index>=7得时候 滚动条滚动在底部 显示内容
                    $('html,body').animate({  
                        scrollTop: $(window).scrollTop()+scrollTops+'px'  
                    }, 500); 
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