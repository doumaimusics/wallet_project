<template>
  <div class="help-main">
    <div v-title>帮助中心_E都市钱包让您安心的出借理财平台</div>
    <div v-keywords>E都市钱包、帮助中心、投资理财、个人理财、P2P理财、互联网金融</div>
    <!-- banner -->
    <div class="help-banner"></div>
    <div class="help-item">
      <!-- 帮助分类 -->
      <div class="help-cate">
        <h1 class="help-title"><i></i>问题分类</h1>
        <div class="cate-main">
          <router-link v-for="item in helpCate"  :to="item.link" class="cate-item">
              <img :src="item.img"/>
              <p class="cate-title">{{item.title}}</p>
              <p class="cate-tip">{{item.tip}}</p>
          </router-link>
        </div>
      </div>
      <!-- 常见问题 -->
      <div class="help-qa">
        <h1 class="help-title"><i></i>常见问题</h1>
        <div class="qa-main">
          <div class="qa-for" v-for="(item,index) in qa" :class="{noBorder:index==5}">
            <div class="icon_ask_box clear">
                 <i></i>
                 <p class="qa-q">{{item.q}}</p>
            </div>
            
            <div class="icon_reply_box clear">
              <i class="icon_reply"></i>
              <p class="qa-a" v-html="item.a" ></p>
            </div>
            
          </div>
        </div>
      </div>
      <!-- 联系我们 -->
       <div class="help-contact">
         <div class="help-btn" @click="ifOpenFeed"></div>
       <!--  <h1 class="help-title"><i></i>联系我们</h1>
        <div class="contact-main">
          <div class="contact-item fl">
            <img src="https://aliyunsso.edspay.com/web/pcUpdate/v3.4/icon7.png" class="fl"/>
            <div class="contact-item-r fl">
              <p>在线为您解答疑惑</p>
              <div class="help-btn" @click="kefu">在线咨询</div>
            </div>
          </div>
          <div class="contact-item fl">
            <img src="https://aliyunsso.edspay.com/web/pcUpdate/v3.4/icon8.png" class="fl"/>
            <div class="contact-item-r fl">
              <p>专线为您服务</p>
              <div class="service-r">
                <h1>客服热线：400-135-3388</h1>
                <h1>工作日：9:00-21:00</h1>
                <h1>法定节假日：9:00-18:00</h1>
              </div>
            </div>
          </div>
          <div class="contact-item fl">
            <img src="https://aliyunsso.edspay.com/web/pcUpdate/v3.4/icon9.png" class="fl"/>
            <div class="contact-item-r fl">
              <p>请为我们留下宝贵的意见</p>
              
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <feeback-d :ifOpen="ifOpen" @closeDialog="closeDialog" v-if="ifOpen"></feeback-d>
  </div>
</template>
<script>
    import feedBack from '../../public/feeback-dialog'  // 反馈弹窗
    export default {
        data () {
          return {
            ifOpen:false,
            helpCate:[
              {
                title:'银行存管',
                tip:'存管介绍/存管开户/银行卡修改',
                img:'https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon1.png',
                link:'/help/qa?sideBarType=1'
              },
              {
                title:'资金管理',
                tip:'提现/充值/资金疑问',
                img:'https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon2.png',
                link:'/help/qa?sideBarType=2'
              },
              {
                title:'产品介绍',
                tip:'E计划/债权转让/复投',
                img:'https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon3.png',
                link:'/help/qa?sideBarType=3'
              },
              {
                title:'会员帮助',
                tip:'登陆注册/VIP会员',
                img:'https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon4.png',
                link:'/help/qa?sideBarType=4'
              },
              {
                title:'红包优惠',
                tip:'加息券/现金红包/普通红包',
                img:'https://aliyunsso.edspay.com/web/pcUpdate/v3.4/icon5.png',
                link:'/help/qa?sideBarType=5'
              },
              {
                title:'积分商城',
                tip:'获取积分/积分兑换',
                img:'https://aliyunsso.edspay.com/web/pcUpdate/v3.4/icon6.png',
                link:'/help/qa?sideBarType=6'
              },
            ],
            qa:[
              {
                q:'什么是银行存管？',
                a:'银行存管是指用户在P2P平台上的交易资金交由银行进行管理，平台无法接触交易资金的一种资金管理模式。借款人、出借人和平台通过在银行开设的存管账户，来实现交易和资金结算。目前E都市钱包平台接入的是浙商银行存管系统。'
              },
              {
                q:'什么是E计划？',
                a:'E计划是平台推出的对借款项目进行本金循环自动出借及项目期限届满时自动转让债权的出借工具。在项目期限内，系统智能分散匹配小额消费债权；项目到期后，系统协助出借人完成债权转让，本金和利息一次性回款到您的账户。'
              },
              {
                q:'什么是债权转让？',
                a:'债权转让是指原来的债权人通过与第三人订立合同将债权的全部或部分转移于第三人。在项目回款日，通过授权平台债权转让的方式，将用户所持的全部债权进行转让，转让成功后，方可退出回款。'
              },
              {
                q:'项目什么时候回款？如何查看回款时间？',
                a:'出借项目到期后1-3个工作日之内本息将回款到您的账户。<br/>APP端：出借成功后，可到“我的”-“回款计划”中查看<br/> 电脑端：出借成功后，可到“我的账户”-“回款计划”中查看。'
              },
              {
                q:'什么是VIP会员？',
                a:'VIP会员制度是平台为会员用户提供的福利体系，用户的每一次出借都可以按照固定的比例获得成长值。不同的成长值对应不同的会员等级，每个会员等级都有相应的等级要求，同时也会享受升级带来的固定福利，包括红包福利、加息福利等。您可通过电脑端与APP端“VIP会员”页面查看详情。'
              },
              {
                q:'新手红包如何使用？',
                a:'新手红包可用于平台所有出借项目。每个出借项目只能使用一张红包，新手红包有效期不同，失效后将不能使用。'
              },
            ]
          }
        },
        created () {
        },
        methods: {
          // 客服
          kefu () {
            NTKF.im_openInPageChat('kf_9511_1488165613968');
          },
          // 关闭弹窗回调
          closeDialog (val) {
            this.ifOpen = val
          },
          // 打开意见弹窗
          ifOpenFeed () {
            this.ifOpen=true
          }
        },
        components: {
          'feeback-d':feedBack
        }
    }
</script>
<style lang="scss" scoped>
  .help-main {
    background: #f8f8f8;
    .help-banner {
      width: 100%;
      height: 260px;
      background: url(https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/banner.png) no-repeat center center;
      background-size: cover;
    }
    .help-title {
      line-height: 24px;
      font-size: 20px;
      color: #333333;
      margin-bottom: 30px;
      i {
        display: inline-block;
        width: 4px;
        height: 24px;
        vertical-align: bottom;
        background: #FC4D4F;
        margin-right: 16px;
      }
    }
    .help-item {
      margin: 20px auto 0;
      padding-bottom: 20px;
      width: 1200px;
      /*问题分类*/
      .help-cate {
        background: #fff;
        padding: 35px 30px 20px;
        .cate-main {
          overflow: hidden;
            .cate-item {
              box-sizing: border-box;
              width: 366px;
              height: 210px;
              margin: 0px 0px 20px 20px;
              border: 1px solid #E5E5E5;
              text-align: center;
              float: left;
              img {
                margin-top:30px;
              }
              .cate-title {
                font-size: 20px;
                color: #333333;
                margin-top: 20px;
                line-height: 28px;
              }
              .cate-tip {
                font-size: 16px;
                color: #959595;
                margin-top: 10px;
              }
              &:hover{
                border:none;
                box-shadow: 1px 1px 16px 0 #F3F3F3;
              }
            }
            .cate-item:nth-child(1), .cate-item:nth-child(4),{
              margin: 0px 0px 20px 0px;
            }
        }
      }
      /*常见问题*/
      .help-qa {
        background: #fff;
        margin-top: 20px;
        padding: 34px 30px 2px;
        .help-title{
          margin-bottom: 0;
        }
        .qa-main {
          padding-top: 2px;
          .noBorder {
            border-bottom: none !important;
          }
          .qa-for {
            border-bottom: 1px dashed #e5e5e5;
            line-height: 22px;
            padding: 28px 0 30px;
            .icon_ask_box{
              margin-bottom: 17px;
              i {
                float: left;
                width: 22px;
                height: 22px;
                margin-right: 10px;
                text-align: center;
                background: url(https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon_ask.png) no-repeat;
                background-size: cover;
                border-radius: 3px;
                font-size: 14px;
                color: #FFFFFF;
              }
              .qa-q {
              font-size: 16px;
              color: #333333;
              float: left;
            }
            }
            
            .icon_reply_box{
              i {
                float: left;
                width: 22px;
                height: 22px;
                margin-right: 10px;
                text-align: center;
                background: url(https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon_reply.png) no-repeat;
                background-size: cover;
                border-radius: 3px;
                font-size: 14px;
                color: #FFFFFF;
              }
              .qa-a {
                width: 95%;
              font-size: 14px;
              color: #666666;
              float: left;
            }
            
            }
            
          }
        }
      }
      /*联系我们*/
      .help-contact {
        margin-top: 20px;
        width: 100%;
        height: 200px;
        background:url(https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/feedback_bg.png) no-repeat blue;
        background-size: cover;
        position: relative;
        .help-btn{
          width: 152px;
          height: 46px;
          border: none;
          position: absolute;
          top: 110px;
          left: 167px;
           &:hover{
             background: none;
           }
        }
/*         .contact-main {
          box-shadow: 0 0 4px 2px #EFEFEF;
          border-radius: 2px;
          padding: 50px 50px 60px 40px;
          overflow: hidden;
          .c3 {
            width: 33.3%;
          }
          .help-btn {
              margin-top: 34px;
            }
          .contact-item {
            width: 33.3%;
            border-right:2px solid rgba(151,151,151,0.2);
            .contact-item-r {
              margin-left: 14px;
              p {
                font-size: 18px;
                color: #333333;
                line-height: 25px;
              }
              .service-r {
                font-size: 14px;
                color: #666666;
                line-height: 20px;
                margin-top: 10px;
                h1 {
                  margin-bottom: 2px;
                }
              }
            }
          }
          .contact-item:nth-of-type(3) {
            border-right:none;
          }
        } */
      }
    }
  }
</style>

