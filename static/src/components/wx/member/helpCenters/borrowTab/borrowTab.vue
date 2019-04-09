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
                titleList: ['申请问题','额度问题','借款问题','还款问题'],      // 标题内容
                num: 0,
				swiperOption: {
					pagination: '.swiper-pagination',
					slidesPerView: 'auto',
					paginationClickable: true,
				},
                tabList:[
                    [
                        {
                           title:'借吧的申请条件是什么?',
                           text:'答：年龄要求：20-45岁之间。<br/>资料要求：申请过程中需提供您的二代身份证、本人实名手机号、本人借记卡。',
                           show: false
                       },
                       {
                           title:'为什么会授信失败?',
                           text:'答：额度申请的综合评分是系统判定的，受严密的风险控制等诸多因素影响。',
                           show: false
                       },
                       {
                           title:'填写申请信息需要注意哪些事项?',
                           text:'答：申请只支持借记卡。<br/>由于部分网络问题验证码会发送较慢，请不要频繁点击“发送验证码”，在获得验证码后请在30分钟内完成申请。本人身份信息需为二代身份证信息，不能使用临时身份证、过期身份证、一代身份证进行申请。',
                           show: false
                       },
                    ],
                    [
                        {
                            title:'额度是怎么给出的?',
                            text:'答：借吧额度是由系统按照多维度评估标准，进行综合评估后自动给出的。',
                            show: false
                        },
                        {
                            title:'额度有有效期吗?',
                            text:'答：额度是有有效期的，具体天数会根据您的信用进行评估。',
                            show: false
                        },
                        {
                            title:'额度会被取消吗?',
                            text:'答：如您经常发生逾期或者有其他信用不良的情况发生，我们可能取消或降低您的额度，请珍惜您的信用记录。',
                            show: false
                        },
                        {
                            title:'额度会提升吗?',
                            text:'答：系统会不定期更新您的个人评级，自动根据用户情况进行打分，若符合条件会自动提升额度，按时还款有助于您提高额度。',
                            show: false
                        },
                    ],
                    [
                        {
                            title:'为什么有额度但借款失败?',
                            text:'答：若借款失败，说明本次借款暂时没有达到借吧的审核标准，建议您后续保持良好的个人信用记录、还款习惯，系统将不定期更新您的个人评级。',
                            show: false
                        },
                        {
                            title:'借吧借款利率是多少?',
                            text:'答：借吧的借款利率是系统根据用户综合情况判定的，具体以额度申请成功后App首页显示为准。建议保持良好的信誉，系统会不定期根据用户的使用情况进行调整。',
                            show: false
                        },
                        {
                            title:'借款利息怎么计算?',
                            text:'答：采用等额本息算法，具体借款利息以APP显示为准。',
                            show: false
                        },
                        {
                            title:'借吧是如何收费的?',
                            text:'答：收费项包括利息、借款服务费（如有），逾期则收取罚息。具体收费标准以借款页面显示为准。建议按时还款，系统将不定期根据用户的使用情况进行调整。',
                            show: false
                        },
                    ],
                    [
                        {
                            title:'可以分期还款么?',
                            text:'答：借款后系统会根据用户综合情况给出不同的分期数，具体以借款页面显示期数为准。',
                            show: false
                        },
                        {
                            title:'如果没按时还款，会有什么影响?',
                            text:'答：逾期将收取罚息，自逾期之日起，每天对逾期金额收取罚息，直至逾期还清。您的逾期情况将会对您后期的借款造成一定的影响，建议您保持良好的信用记录。',
                            show: false
                        },
                        {
                            title:'是否可以提前还款和部分还款?',
                            text:'答：您可以随时发起提前还款或部分提前还款。',
                            show: false
                        },
                        {
                            title:'提前还款利息如何计算?',
                            text:'答：提前还款不影响利息计算。',
                            show: false
                        },
                        {
                            title:'什么是提前结清?',
                            text:'答：提前结清是指提前结清该借款所产生的多期未出账单，但不免除已出账单、逾期账单的利息手续费。具体已页面显示为准。',
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

