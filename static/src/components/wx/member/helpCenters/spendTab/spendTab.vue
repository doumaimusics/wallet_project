<template>
  <div id="wxHelpCenterTab">
    <div class="tab-title">
        <!-- class="bdr-b" -->
        <swiper :options="swiperOption" class="bdr-b" :class="{isMedia:num == 4}">
            <swiper-slide v-for="(item,index) in  titleList"  :class="{activeLi:index==num}">
                <p @click="num=index">{{item}}</p>
                <span v-if="index==num"></span>
            </swiper-slide>
        </swiper>
    </div>
    <wxHelpCenterTab1 v-for="(item,index) in tabList" v-if="num==index" :headerData="tabList[index]"></wxHelpCenterTab1>
  </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp';
    import wxHelpCenterTab1 from './wxHelpCenterTab1';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                titleList: ['分期','账单与还款','额度评估'],      // 标题内容
                num: 0,
				swiperOption: {
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					paginationClickable: true,
				},
                tabList:[
                    [
                        {
                           title:'分期的订单是否可以修改信息?',
                           text:'答：您好，目前下单成功后无法修改收件信息，您可联系客服中心进行修改。',
                           show: false
                       },
                       {
                           title:'分期的订单是否可以取消？',
                           text:'答：您好，订单在未发货之前，可以及时联系客服取消。（发货状态可第一时间联系客服获取相关动态）',
                           show: false
                       },
                       {
                           title:'分期的产品如何查询物流单号?',
                           text:'答：您好，发货后，物流信息会在订单详情中同步，进入订单详情即可查看。',
                           show: false
                       },
                       {
                           title:'如何退/换货?',
                           text:'答：您好，目前退换货需要联系客服中心进行退换。',
                           show: false
                       },
                       {
                           title:'发票随商品一起送吗?',
                           text:'答：一张订单只可以开具一张发票，发票统一确认收货后30天内发出。',
                           show: false
                       },
                       {
                           title:'退换货总则?',
                           text:'答：1.退换货基本规则 爱上街承诺若符合以下情况，客户收到商品之日起7日内可以联系客服申请退货，15日内可以申请换货，具体退换货标准如下： <br/>(1)国家法律所规定的功能性故障或商品质量问题，经由生产厂家指定或特约售后服务中心检测确认，并出具检测报告确认属于商品质量问题。可支持7天退货15天换货，爱上街为顾客报销运费。 <br/>(2)到货物流损、缺件或商品描述与网站不符原因，物流损指在运输过程中造成的损坏、漏液、破碎、性能故障，经售后人员核查情况属实。可支持7天退货15天换货，爱上街为顾客报销运费。 <br/>(3)除以上两种原因之外，如个人原因导致的退换货，未使用且不影响二次销售（商品原包装未拆封）。暂支持7天退货但不支持15天换货，运费由顾客承担。<br/> 注：已激活的3c数码产品，非质量问题不支持7天无理由退货，请确认需求后再激活使用！<br/> 2.不适用于7天无理由退货的商品依据《网络购买商品七日无理由退货暂行办法》第六条，以下商品不适用七日无理由退货规定： <br/>(1)消费者定作的商品； <br/>(2)逛逛生活场景鲜活易腐的商品； <br/>(3)在线下载或者消费者拆封的音像制品、计算机软件等数字化商品； <br/>(4)交付的报纸、期刊。 <br/>3.不适用7日无理由退货规定依据《网络购买商品七日无理由退货暂行办法》第七条，以下商品可以不适用七日无理由退货规定 <br/>(1)拆封后易影响人身安全或者生命健康的商品，或者拆封后易导致商品品质发生改变的商品； (2)一经激活或者试用后价值贬损较大的商品； <br/>(3)销售时已明示的临近保质期的商品、有瑕疵的商品。',
                           show: false
                       },
                       {
                           title:'账期、还款日能修改吗?',
                           text:'答：您好，每年每人有一次修改账期、还款日的机会。 您可以致电客服修改。 修改后的账单日、还款日，可能在本月，也可能在下个月生效，请关注消息通知。',
                           show: false
                       },
                    ],
                    [
                        {
                            title:'还款遇到问题怎么办?',
                            text:'答：您好，如您在操作还款过程中遇到无法还款事宜，请: (1)刷新页面; (2)退出账户重新登录 如一直显示还款处理中，建议您耐心等待2小时，期间有可能支付通道会存在延迟的情况，如2小时候后仍未更新状态，请及时联系客服进行处理。',
                            show: false
                        },
                        {
                            title:'如何查询账单?',
                            text:'答：您好，现金借款可以点击借钱，页面即可查看到需还金额和还款时间。消费分期可以点击分期，页面即可查看还款金额，以及你的分期账单。',
                            show: false
                        },
                        {
                            title:'还款方式有哪些?',
                            text:'答：您好，还款方式: (1)线上：银行卡主动还款; (2)线下：支付宝、银行卡转账(如您通过线下还款，请在还款后及时联系客服提供还款凭证及流水号，做账单同步处理)',
                            show: false
                        },
                        {
                            title:'是否可以提前还款?',
                            text:'答：您好，目前可以操作提前还款。',
                            show: false
                        },
                        {
                            title:'逾期会有什么结果，如何处理?',
                            text:'答：您好，如未在还款日前进行还款或恶意拖欠导致还款失败，即视为逾期，将会产生滞纳金，您的逾期情况也将对您后期的借款造成一定的影响，建议您保持良好的信用记录。如非个人原因导致的逾期，请第一时间联系客服进行处理。 (温馨提醒：如您在还款日前，资金紧缺，也可在还款日前1天，在借钱页面申请续期，可延长7天的还款日)',
                            show: false
                        },
                        {
                            title:'还款券该如何使用?',
                            text:'答：您好，还款券可在您还款的时候进行资金的抵扣。',
                            show: false
                        },
                        {
                            title:'什么是提前结清?',
                            text:'答：指提前还清该交易所产生的所有分期账单，且待还分期账单数是2个以上。提前结清未出账单，最多只收1期手续费，但不免除已出账单、逾期账单的手续费。退款中的交易不能提前结清。',
                            show: false
                        },
                    ],
                    [
                        {
                            title:'如何获取额度?',
                            text:'答：您好，您可以进入爱上街APP完成信用基本认证，获取相对应的额度。',
                            show: false
                        },
                        {
                            title:'如何提升额度?',
                            text:'答：您好，建议您可以完善补充认证并且保证您的资料填写真实，持续使用爱上街APP并且按时还款保持良好的信用，系统会对您的使用记录进行评估进行提额。',
                            show: false
                        },
                        {
                            title:'为什么额度为“0”?',
                            text:'答：您好，一般都是您所绑定的授权信息不满足要求，会判定您综合评分不足，系统会默认额度为0，建议您可以完善一下补充认证。',
                            show: false
                        },
                        {
                            title:'为什么我的额度会下降?',
                            text:'答：您好，系统会不定时的调整审核标准，对信息进行评估，不满足相关要求，则会降低额度。',
                            show: false
                        },
                    ]
                ]
            }
        },
        methods:{
           getQuert() {     //  从首页点击进来跳到对应的页面
				if(this.$route.query.num){
                    this.num = this.$route.query.num
                };
			}
        },
        mounted(){
            var heightStyle = document.documentElement.clientHeight;
            $('#wxHelpCenterTab').height(heightStyle);
             var widthStyle = $('.swiper-slide').outerWidth();  // 动态获取元素宽度
            if(this.num == 4 ){  // 当从外面点进来让当前的标题显示出来
                $('.swiper-wrapper').css('transform','translate3d('+-widthStyle+'px,0,0)')
            } else if(this.num == 5){
                $('.swiper-wrapper').css('transform','translate3d('+-widthStyle*1.4+'px,0,0)')
            }
        },
        created() { // 调用函数
             this.getQuert();
		},
        components:{
            wxHelpCenterTab1,
        }

    }
    
</script>
<style>
</style>

<style lang="scss" scoped>
    #wxHelpCenterTab{
		width: 100%;
        background: #fff;
        .swiper-container{
            position: fixed;
             background: #fff;
             z-index: 3;
             width: 100%;
        }
        .swiper-slide{
			padding: .266667rem .32rem;
			width: auto;
			font-size: .373333rem;
            color: #7A8898;
			p{
				line-height: .533333rem;
				letter-spacing: .013333rem;
			}
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
        .tab-title {
			padding: 0;
			height: 1.066667rem;
			width: 100%;
			z-index:10;
			margin:0 auto;
             background: #fff;
			.activeLi {
				color: #4C7DE9;
			}
		}
		.tabContent{
			margin-top: 1.066666rem;	
		}
    }
</style>

