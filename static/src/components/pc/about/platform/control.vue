<template>
    <div id="control">
        <div class="theme">
            <div class="themeBg" v-for='v in theme'>
                <div class="theme_center clear">
                    <div class="left" :style="{background:'url('+ v.iconBg +') no-repeat center center',backgroundPositionY: 'center'}"></div>
                    <div class="right">
                        <h3>{{v.title}}</h3>
                        <p v-for='item in v.lis'>
                            <i :style="{background:'url('+ listIcon +') no-repeat left center'}"></i>{{item}}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    // metaInfo: {
    //     title: '保障措施_E都市钱包保障措施_E都市钱包_让您安心的出借理财平台', // set a title
    //     meta: [{                 // set meta
    //       name: 'keywords',
    //       content: 'E都市钱包，E都市钱包官网，E都市钱包安全吗？，E都市钱包怎么样？，E都市钱包出借，出借理财,个人理财,互联网金融，，P2P理财'
    //     },{
    //         name: 'description',
    //         content: 'E都市钱包平台结合世界顶级银行和阿里支付宝的先进风控理念，创新性的创造出基于大数据分析及先进安全技术水平的“蜂巢”风控体系，通过6重安全保障措施，保障出借人出借安全。'
    //     },{
    //         name: 'baidu-site-verification',
    //         content: 'ASl9m3ghF3'
    //     }]
    // },
    data() {
        return {
            theme: [{
                iconBg: 'https://aliyunsso.edspay.com/web/about/pcPageRevision/themeIcon_1.png',
                title: '业务模式保障',
                lis: ['专注于消费分期类优质金融资产', '四重风控审核保证资产低风险性', '提供专业、便捷的互联网金融服务']
            }, {
                iconBg: 'https://aliyunsso.edspay.com/web/about/pcPageRevision/themeIcon_2.png',
                title: '智能小额分散出借',
                lis: ['每一笔出借资金自动投向多个不同借款人', '资金流向及资金状态全场景全流程监控', '资金按约定用途使用，还款来源可控']
            }, {
                iconBg: 'https://aliyunsso.edspay.com/web/about/pcPageRevision/themeIcon_3.png',
                title: '技术与信息安全保障',
                lis: ['顶级信息安全技术SSL信息加密', '5A级IDC机房服务器', '专业的FORTINET防火墙', '严格按照隐私条款保障保护用户信息']
            }, {
                iconBg: 'https://aliyunsso.edspay.com/web/about/pcPageRevision/themeIcon_4.png',
                title: '“蜂巢”风险控制体系',
                lis: ['基于大数据与金融科技自主研发', '3个风控模型，多道风控筛选环节', '200多个风险数据维度全方位分析']
            }, {
                iconBg: 'https://aliyunsso.edspay.com/web/about/pcPageRevision/themeIcon_5.png',
                title: '信息披露透明',
                lis: ['平台信息全面展示，变动内容及时更新', '借款人资质审核彻底，信息真实透明', '出借人资金由银行存管，资金去向透明']
            }, {
                iconBg: 'https://aliyunsso.edspay.com/web/about/pcPageRevision/themeIcon_6.png',
                title: '双律所法务体系保障',
                lis: ['浙江融哲律师事务所、浙江康城律师事务所担任平台的常年法律顾问', '平台所有业务活动以及相关合同和协议均由律师事务所审核', '保证出借人的合法权益受国家法律保护']
            }],
            listIcon: 'https://aliyunsso.edspay.com/web/credibility/list_icon.png',
        }
    }
}
</script>

<style lang="scss" scoped>
#control {
    width: 100%;
    height: auto;
    padding: 60px 2px 0 40px;
    overflow: hidden;
    .theme {
        width: 850px;
        margin: 0 auto;
        .themeBg {
            width: 100%;
            background: #FFFCFA;
            margin-bottom: 20px;
            .theme_center {
                width: 100%;
                margin: 0 auto;
                padding: 66px 0;
                .left {
                    background-size: 200px 200px !important;
                    width: 50%;
                    height: 200px;
                    float: left;
                }
                .right {
                    width: 50%;
                    height: auto;
                    float: left;
                    padding-right: 110px;
                    h3 {
                        width: 100%;
                        height: 28px;
                        line-height: 28px;
                        font-size: 20px;
                        font-weight: 500;
                        text-align: left;
                        color: #333333;
                        margin-bottom: 30px;
                    }
                    p {
                        display: block;
                        width: 100%;
                        height: 20px;
                        line-height: 20px;
                        padding-left: 20px;
                        height: auto;
                        font-size: 18px;
                        text-align: left;
                        color: #808080;
                        position: relative;
                        margin-bottom: 20px;
                        i {
                            display: inline-block;
                            width: 20px;
                            height: 20px;
                            vertical-align: middle;
                            position: absolute;
                            left: 2px;
                        }
                    }
                }
            }
        }
    }
}
</style>
