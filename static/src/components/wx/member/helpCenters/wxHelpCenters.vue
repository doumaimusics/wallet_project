<template>
    <div id="wxHelpCenter">
        <div v-title>帮助中心</div>
        <div v-if="configSw.showAsset == 1" ref="titleList">
			<ul class="titleList">
				<li v-for="(item,index) in titleList" @click="cutList(index)" :class="{activeList:activeList == index}" class="list fl"><span>{{item}}</span></li>
            </ul>
        </div>
        <div v-else-if="hasGetData" ref="topBox" class="top">
        </div>
        <div ref="contentBox" class="contentBox">
            <div class="content">
			<div class="titleBottom"></div>
        		<div v-if="activeList == 0" class="earnList list fl">
        			<!-- 问题分类 -->
        			<wx-issue-classify :issueClassify="earnList.issueClassify"></wx-issue-classify>
        			<!-- 常见问题 -->
        			<wxCommonIssue :issue="earnList.issue"></wxCommonIssue>
        			<div class="bottomTi"></div>
        		</div>
        		<div v-if="activeList == 1" class="borrowList list fl">
        			<!-- 问题分类 -->
        			<wx-issue-classify :issueClassify="borrowList.issueClassify"></wx-issue-classify>
        			<!-- 常见问题 -->
        			<wxCommonIssue :issue="borrowList.issue"></wxCommonIssue>
              <div class="bottomTi"></div>
            </div>
            <div v-if="activeList == 2" class="earnList list fl">
              <!-- 问题分类 -->
              <wx-issue-classify :issueClassify="spendList.issueClassify"></wx-issue-classify>
              <!-- 常见问题 -->
              <wxCommonIssue :issue="spendList.issue"></wxCommonIssue>
              <!-- <div class="bottomTi"></div> -->
        			<div class="bottomTi"></div>
        		</div>
        	</div>
        </div>
        
        <div class="bottomTab">
            <div class="feedback" @click="goLogIn"><img src="https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/feedback.png" alt=""> 意见反馈</div>
            <div class="advisory">
                <p @click="goAppFun" v-if="osType"><img src="https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/advisory.png" alt=""> 在线客服</p>
                <a :href="hrers" v-else><img src="https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/advisory.png" alt=""> 在线客服</a>
            </div>
            <div class="advisoryPhone"><a href="tel:400-135-3388"><img src="https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/advisoryPhone.png" alt=""> 电话客服</a></div>
        </div>
        <!-- <suspension :imgUrl="'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/advisoryPhone.png'" :pageUrl="'www.edspay.com'" :jumpType="1"></suspension> -->
    </div>
</template>

<script>
   import wxToapp from '../../../../common/wx/wxToapp';
   import suspension from '../../../public/wx/suspension.vue';
   import wx from 'weixin-js-sdk'; //引入微信sdkwxIssueClassify
   import wxIssueClassify from './wxIssueClassify.vue';   // 问题分类组件
   import wxCommonIssue from './wxCommonIssue.vue';  // 常见问题组件
   export default{
       mixins:[wxToapp],
       	data(){
           	return{
           		activeList:0,
           		titleList:['赚吧','借吧','花吧'],
               	officialAccountsData: {},
               	hrers:'',
                configSw:{}, //是否显示花吧借吧
               	earnList:{
               		issueClassify:[
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newIcon1.png?v=1.0',
	                        text:'存管账户',
	                        url:'/wxMyAccount/wxHelpCenterTab?num=0'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newIcon2.png?v=1.0',
	                        text:'资金管理',
	                        url:'/wxMyAccount/wxHelpCenterTab?num=1'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newIcon3.png?v=1.0',
	                        text:'产品介绍',
	                        url:'/wxMyAccount/wxHelpCenterTab?num=2'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newIcon4.png?v=1.0',
	                        text:'会员帮助',
	                        url:'/wxMyAccount/wxHelpCenterTab?num=3'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newIcon5.png?v=1.0',
	                        text:'红包优惠',
	                        url:'/wxMyAccount/wxHelpCenterTab?num=4'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newIcon6.png?v=1.0',
	                        text:'积分商城',
	                        url:'/wxMyAccount/wxHelpCenterTab?num=5'
	                    }
	               	],
	               	issue:[
	                   	{
	                       	title:'什么是银行存管？',
	                      	text:'答：银行存管是指用户在P2P平台上的交易资金交由银行进行管理，平台无法接触交易资金的一种资金管理模式。借款人、出借人和平台通过在银行开设的存管账户，来实现交易和资金结算。目前E都市钱包平台接入的是浙商银行存管系统。',
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
	                       	text:'答：出借项目到期后1-3个工作日之内本息将回款到您的账户。<br/>APP端：出借成功后，可到“我的”-“回款计划”中查看；<br/>电脑端：出借成功后，可到“我的账户”-“回款计划”中查看。',
	                       	show: false
	                   	},
	                   	{
	                      	title:'什么是VIP会员？',
	                       	text:'答：VIP会员制度是平台为会员用户提供的福利体系，用户的每一次出借都可以按照固定的比例获得成长值。不同的成长值对应不同的会员等级，每个会员等级都有相应的等级要求，同时也会享受升级带来的固定福利，包括红包福利、加息福利等。您可通过电脑端与APP端“VIP会员”页面查看详情。',
	                       	show: false
	                   	},
	                   	{
	                       	title:'新手红包如何使用？',
	                       	text:'答：新手红包可用于平台所有出借项目。每个出借项目只能使用一张红包，新手红包有效期不同，失效后将不能使用。',
	                       	show: false
	                   	}
	               	],
               	},
               	borrowList:{
               		issueClassify:[
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/lendIcon1.png',
	                        text:'申请问题',
	                        url:'/wxMyAccount/wxHelpBorrowTab?num=0'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/lendIcon2.png',
	                        text:'额度问题',
	                        url:'/wxMyAccount/wxHelpBorrowTab?num=1'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/lendIcon3.png',
	                        text:'借款问题',
	                        url:'/wxMyAccount/wxHelpBorrowTab?num=2'
	                    },
	                    {
	                        img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/lendIcon4.png',
	                        text:'还款问题',
	                        url:'/wxMyAccount/wxHelpBorrowTab?num=3'
	                    }
	               	],
	               	issue:[
	                   	{
	                       	title:'什么是借吧?',
	                      	text:'答：借吧是由E都市钱包提供，满足您日常消费周转的资金需求，为您量身定制的现金贷服务。',
	                       	show: false
	                   	},
	                   	{
	                       	title:'借吧有哪些特色?',
	                       	text:'答：纯线上申请，无需抵押，操作简单，最快30秒审批，3分钟放款。可提前还款，还款后恢复额度可循环借款。',
	                       	show: false
	                  	},
	                   	{
	                       	title:'是向E都市钱包借款吗?',
	                       	text:'答：实际出借人为E都市钱包的投资人，具体以您借款成功后显示的信息为准。',
	                       	show: false
	                   	},
	                   	{
	                       	title:'使用借吧借款是否安全?',
	                       	text:'答：借吧每次放款，需要审核密码等验证项，且款项只能放款到借款人实名下的银行卡，全流程监控保护，请您放心使用。',
	                       	show: false
	                   	}
	               	],
               	},
                spendList:{
                    issueClassify:[
                        {
                            img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/spendIcon1.png',
                            text:'分期',
                            url:'/wxMyAccount/wxHelpSpendTab?num=0'
                        },
                        {
                            img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/spendIcon2.png',
                            text:'账单与还款',
                            url:'/wxMyAccount/wxHelpSpendTab?num=1'
                        },
                        {
                            img:'https://aliyunsso.edspay.com/web/wx/helpCenter/newHelp/spendIcon3.png',
                            text:'额度评估',
                            url:'/wxMyAccount/wxHelpSpendTab?num=2'
                        }
                    ],
                    issue:[
                        {
                            title:'如何退/换货？',
                            text:'答：请在“我的-全部订单”里找到需要退/换货的订单，申请售后提交相应原因，部分品类不支持7天无理由退/换货，详情查看“退换货总则”。',
                            show: false
                        },
                        {
                            title:'账期、还款日能修改吗？',
                            text:'答：您好，每年每人有一次修改账期、还款日的机会。 您可以致电客服修改。 修改后的账单日、还款日，可能在本月，也可能在下个月生效，请关注消息通知。',
                            show: false
                        },
                        {
                            title:'如何查询账单？',
                            text:'答：您好，现金借款可以点击借钱，页面即可查看到需还金额和还款时间。消费分期可以点击分期，页面即可查看还款金额，以及你的分期账单。',
                            show: false
                        },
                        {
                            title:'还款遇到问题怎么办?',
                            text:'答：您好，如您在操作还款过程中遇到无法还款事宜，请: (1)刷新页面; (2)退出账户重新登录 如一直显示还款处理中，建议您耐心等待2小时，期间有可能支付通道会存在延迟的情况，如2小时候后仍未更新状态，请及时联系客服进行处理。',
                            show: false
                        },
                        {
                            title:'如何获取额度?',
                            text:'答：您好，您可以进入爱上街APP完成信用基本认证，获取相对应的额度。',
                            show: false
                        }
                    ]
                },
                hasGetData:false,
           	}
       	},
       	methods:{
       		cutList(index){
       			this.activeList = index;
       		},
            goAppFun(){
                if(this.osType){ // 移动端原生客服
                    this.PassValue('Service');
                } 
            },
            goLogIn(){
                if(!this.hasLogin){
                    this.toLogin()
                    return
                }
                if(this.osType){
                    this.PassValue('Feedback')
                }else{
                    this.$router.push({
                        path:'/wxMyAccount/wxFeedbackIndex'
                    })
                }
            },
            setContentHeight(){//判断是否隐藏花吧借吧后设置高度
                this.$nextTick(function () {
                    var height = document.documentElement.clientHeight; //获取设备的宽度
                    if(this.configSw.showAsset){
                        this.$refs.contentBox.style.height = height - this.$refs.titleList.offsetHeight + 'px';
                    }else{
                        this.$refs.contentBox.style.height = height - this.$refs.topBox.offsetHeight + 'px';
                    }
                })
            },
            getConfigSw(){
                if(this.osType){//app内部
                    this.hasGetData = true;

                    if(this.$route.query.hideHBJB == 1){// app传hideHBJB参数 1：隐藏借吧换吧内容 0： 显示
                      this.configSw.showAsset = 0;
                    }else{
                        this.configSw.showAsset = 1;
                    }
                    this.setContentHeight();
                }else{//微信
                    this.hasGetData = true;
                    this.configSw.showAsset = 0;
                    this.setContentHeight();
                }
            }
        },
        components:{
            suspension,
            wxIssueClassify, // 问题分类组件
            wxCommonIssue  // 常见问题组件
        },
        created(){
            // this.hrers = 'http://downt.ntalker.com/t2d/chat.php?siteid=kf_9511&settingid=kf_9511_1509419849144&baseuri=http%3A%2F%2Fdl.ntalker.com%2Fjs%2Fxn6%2F&mobile=1&lan=&ref=wx';
            var timeamp = new Date().getTime()
            if(this.getCookie('nickname')){
              var qiMoName = this.getCookie('nickname') ? this.getCookie('nickname') : "游客"
              var qiMoId = this.getCookie('userId') ? this.getCookie('userId') : timeamp;
              this.hrers = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":'+qiMoName +'}&customField={"nickName":'+ qiMoName +'}&clientId='+ qiMoId;
            }else{
              this.hrers = 'https://webchat.7moor.com/wapchat.html?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&fromUrl=www.edspay.com&urlTitle=E%E9%83%BD%E5%B8%82%E9%92%B1%E5%8C%85&otherParams={"nickName":"游客"}&customField={"nickName":"游客"}&clientId='+timeamp;
            }
           
        },
        mounted(){
            this.getConfigSw();
           	if(!this.osType){
           		$(document).scrollTop(0);
           	}

       }

   }
</script>

<style lang="scss" scoped>
   #wxHelpCenter{        
   		position: relative;
       width: 100%;
       // padd-bottom: 1.333333rem;
       	.titleList{
       		height:1.066667rem;
       		font-size:0.4rem;
       		line-height: 1.04rem;
       		background: #fff;
			.list{
				width: 33.3%;
				text-align:center;
				span{
					display:inline-block;
					// width:1.333333rem;
					color:  #7A8898;
				}
			}
			.activeList{
				span{
					color: #4C7DE9;
					border-bottom: 0.053333rem solid #4C7DE9;
				}
			}
       	}
       	.titleBottom{
       		height:0.333333rem;
       	}
       	.contentBox{
       		width: 10.0rem;
       		position: relative;
       		overflow: hidden;
       		.content{
       			width: 10rem;
       			height:100%;
       			overflow-y: auto;
       			position: absolute;
       			top:0;
       			left:0;
       			.list{
       				width:10rem;
       				.bottomTi{
       					height: 1.333rem;
       				}
       			}
       		}
       	}
       	.top{
           width: 100%;
           height: 3.733333rem;
           background: url('https://aliyunsso.edspay.com/web/wx/helpCenter/banner1.png?v=1.0') no-repeat;
           background-size: cover; 
           position: relative;
           .feedback-btn{
               width: .666667rem;
               height: .666667rem;
               background: url('https://aliyunsso.edspay.com/web/wx/helpCenter/coupleBack.png?v=1.1') no-repeat;
               background-size: cover;
               position: absolute;
               top: .133333rem;right: .133333rem;
           }
           .advisory-btn{
               width: 2.533333rem;
               height: .613333rem;
               position: absolute;
                bottom: .38rem;
                left: .54rem;
                a,.goApp{
                    width: 100%;
                    height: 100%;
                    display: inline-block;
                }
           }
       }
       .bottomTab{
           width: 100%;
           height: 1.333333rem;
           background: #fff;
           box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
           position: fixed;
           bottom: 0;
           left: 0;
           z-index: 9;
           display: flex;
           flex-grow:1;
           justify-content: space-between;
           div{
               width: 33.3333%;
               flex-basis:auto;
               position: relative;
               text-align: center;
               line-height: 1.333333rem;
               font-size: .346667rem;
               color: #333;
               a{
                   width: 100%;
                   height: 100%;
                   display: block;
               }
               img{
                   width: .56rem;
                   height: .56rem;
               }
           }
       }
   }
</style>

