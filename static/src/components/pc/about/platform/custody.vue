  <!-- 银行存管 -->
<template>
    <div id="security">
        <div class="securiy_box">
            <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/blank_img.png" alt="">
        </div>
		<!-- <div v-title>银行存管_E都市钱包银行存管_E都市钱包_让您安心的出借理财平台</div>
    	<div v-keywords>E都市钱包，银行存管，E都市钱包官网，E都市钱包银行存管，浙商银行，浙商存管，出借理财,个人理财,互联网金融，出借，P2P理财</div>
        <div class="banner"></div>
        <div class="title">
            <i></i>E都市钱包银行存管系统正式上线</div>
        <p class="blank">为了响应监管政策要求，保障出借人的资金安全，E都市钱包已与浙商银行合作开发完成存管系统，采用银行直连模式，符合国家监管要求，是目前最安全的银行系统。E都市钱包用户可开通并拥有独立的浙商资金存管账户，账户资金由浙商银行全程监管，全面保证资金安全。
        </p>
        <div class="title bottom-20">
            <i></i>一张图看懂银行存管</div>
        <img src="https://aliyunsso.edspay.com/web/about/blank.png" alt="" class="blank">
        <div class="title">
            <i></i>接入存管系统的好处</div>
        <ul class="list1">
            <li v-for="item in gainlList">
                <div class="icon"><img :src="item.icon"></div>
                <h3>{{item.title}}</h3>
                <p>{{item.pre}}</p>
            </li>
        </ul>
        <div class="title t-0">
            <i></i>E都市钱包为什么选择浙商银行？</div>
        <ul class="QA">
            <li v-for="item in QA">
                <h3>{{item.Q}}</h3>
                <p>{{item.A}}</p>
            </li>
        </ul> -->
    </div>
</template>

<script>
export default {
    // metaInfo: {
    //     title: '银行存管_E都市钱包银行存管_E都市钱包_让您安心的出借理财平台', // set a title
    //     meta: [{                 // set meta
    //       name: 'keywords',
    //       content: 'E都市钱包，银行存管，E都市钱包官网，E都市钱包银行存管，浙商银行，浙商存管，出借理财,个人理财,互联网金融，出借，P2P理财'
    //     },{
    //         name: 'description',
    //         content: '为保障出借人的资金安全，E都市钱包已与浙商银行合作开发完成存管系统，采用银行直连模式，符合国家监管要求，是目前最安全的银行系统。'
    //     }]
    // },
    data() {
        return {
            gainlList: [{
                icon: 'https://aliyunsso.edspay.com/web/about/blankIcon1.png',
                title: '账户体系合规',
                pre: '平台自有资金账户和客户资金账户分离，为每个出借人开立存管账户，规避资金池风险'
            }, {
                icon: 'https://aliyunsso.edspay.com/web/about/blankIcon2.png',
                title: '支付通道多样',
                pre: '资金存管系统后端支付通道支持上百家银行资金结算，方便客户资金快速周转'
            }, {
                icon: 'https://aliyunsso.edspay.com/web/about/blankIcon3.png',
                title: '业务功能丰富',
                pre: '除基本的充值、出借、放款、还款、提现等功能外，还支持债权转让、自动放款、现金券、加息券等特色功能'
            }, {
                icon: 'https://aliyunsso.edspay.com/web/about/blankIcon4.png',
                title: '风险控制严谨',
                pre: '建立资金存管风险监控系统，当存管的项目、借款人、交易资金等出现异常情况时，及时进行风险监测和控制'
            }],
            QA: [{
                Q: '1.存管模式合规',
                A: '浙商银行资金存管系统符合网贷管理暂行办法等政策法规，是完全合规的银行存管模式'
            }, {
                Q: '2.符合监管标准',
                A: '浙商银行作为全国性股份制商业银行，总部设于杭州，有利于合作双方沟通交流'
            }, {
                Q: '3.存管系统成熟',
                A: '浙商银行拥有成熟的经验与技术优势，具备全面、多样、便利、安全等服务优势，有利于平台的创新发展，符合平台的既定发展方向'
            }, {
                Q: '4.开展深度化合作',
                A: '除资金存管外，E都市钱包将与浙商银行逐步在消费金融、资产管理等领域展开合作'
            }]
        }
    }
}
</script>

<style lang="scss" scoped>
#security {
    width: 100%;
    height: auto;
    padding:60px 0 40px 40px;
    // .title {
    //     width: 100%;
    //     height: 34px;
    //     font-family: PingFangSC;
    //     line-height: 34px;
    //     font-size: 24px;
    //     font-weight: 500;
    //     text-align: left;
    //     color: #333333;
    //     margin: 60px 0 30px 35px;
    //     i {
    //         display: inline-block;
    //         width: 4px;
    //         height: 24px;
    //         background: #fc4147;
    //         margin-top: 4px;
    //         margin-right: 10px;
    //         vertical-align: top;
    //     }
    // }
    // .title.bottom-20 {
    //     margin-bottom: 48px;
    // }
    // .title.t-0 {
    //     margin-top: 0px;
    // }
    // .banner {
    //     width: 900px;
    //     height: 218px;
    //     background: url(https://aliyunsso.edspay.com/web/about/credibility.png);
    //     background-size: 100% 100%;
    //     margin-left: -6px;
    // }
    // p.blank {
    //     width: 803px;
    //     height: 80px;
    //     font-family: PingFangSC;
    //     font-size: 14px;
    //     text-align: justify;
    //     color: #666666;
    //     text-indent: 2em;
    //     line-height: 27px;
    //     margin: 0 auto;
    // }
    // img.blank {
    //     display: block;
    //     width: 543px;
    //     height: 419px;
    //     margin: 0 auto;
    // }
    // ul.list1 {
    //     width: 100%;
    //     height: 280px;
    //     overflow: hidden;
    //     padding: 0 42px 0 16px;
    //     li {
    //         float: left;
    //         width: 213px;
    //         height: 100%;
    //         padding: 30px 25px 0;
    //         .icon {
    //             width: 65px;
    //             height: 65px;
    //             margin: 0 auto;
    //             margin-bottom: 33px;
    //             img {
    //                 width: 100%;
    //                 height: 100%;
    //             }
    //         }
    //         h3 {
    //             width: 100%;
    //             height: 24px;
    //             font-family: PingFangSC;
    //             font-size: 16px;
    //             text-align: center;
    //             color: #333333;
    //             margin-bottom: 8px;
    //         }
    //         p {
    //             width: 100%;
    //             height: auto;
    //             font-family: PingFangSC;
    //             font-size: 12px;
    //             line-height: 19px;
    //             letter-spacing: 0.2px;
    //             text-align: justify;
    //             color: #666666;
    //         }
    //     }
    // }
    // ul.QA {
    //     width: 100%;
    //     padding: 14px 170px 0 45px;
    //     li {
    //         width: 100%;
    //         h3 {
    //             width: 100%;
    //             height: 22px;
    //             font-family: PingFangSC;
    //             font-size: 16px;
    //             color: #333333;
    //             margin-bottom: 14px;
    //         }
    //         p {
    //             width: 100%;
    //             font-family: PingFangSC;
    //             font-size: 14px;
    //             line-height: 28px;
    //             text-align: left;
    //             color: #666666;
    //             margin-bottom: 33px;
    //         }
    //     }
    // }
}
</style>
