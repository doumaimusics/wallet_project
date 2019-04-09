<template>
    <div id="Investment">
        <div class="bg"></div>
        <div class="xubox_layer">
            <div class="title">浙商银行委托扣款业务服务协议
                <div class="del reg" @click='InvestmentFalg'>
                    <i class="el-icon-close"></i>
                </div>
            </div>
            <div class="xubox_page">
                <div class="content">
                    <div style="margin:40px">
                        <!-- 表格 -->
                        <table class='regTable'>
                            <tr>
                                <td>证件类型</td>
                                <td>身份证</td>
                                <td>证件号码</td>
                                <td>{{id}}</td>
                            </tr>
                            <tr>
                                <td>客户名称 </td>
                                <td>{{name}} </td>
                                <td>手机号码 </td>
                                <td>{{tel}} </td>
                            </tr>
                            <tr>
                                <td>扣款账户户名 </td>
                                <td>{{name}} </td>
                                <td>账号 </td>
                                <td>{{account}} </td>
                            </tr>
                            <tr>
                                <td>账户开户网点</td>
                                <td>{{branch}}</td>
                                <td>合同号/协议编号/会员号</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>委托内容</td>
                                <td colspan="4">委托浙商银行接收E都市钱包平台指令后扣款。</td>
                            </tr>
                            <tr>
                                <td>申请种类</td>
                                <td colspan="4">√开办　　□变更__________　  □终止</td>
                            </tr>
                        </table>
                    </div>
                    <p>本人自愿授权浙商银行有限公司（以下简称“贵行”）按上表授权委托内容中的平台
                        （以下简称“该平台”）提供的金额，从上表所列扣款账户(以下简称“指定账户”)中以无卡
                        （折）方式转账支付相关款项。</p>
                    <p>授权声明：</p>
                    <p>一、本人理解并同意开通贵行委托扣款业务，即授权贵行在本人向该平台提交充值出借
                        等交易后，即可通过贵行或第三方支付机构等渠道，向指定账户发起扣款指令，并从该指
                        定账户扣取对应的款项至本人在贵行开立的账户;同一账户同时发生授权支付多笔款项时，
                        贵行有权决定支付先后次序。</p>
                    <p>二、指定账户在本人支付对应款项时应有足够的资金，若因存款不足导致扣款不成功，
                        本人愿承担由此产生的责任，并授权贵行自动从指定账户中扣取该平台规定的滞纳金。</p>
                    <p>三、若该平台与贵行终止委托扣款项目，本授权书自动失效。</p>
                    <p>四、本人若对委托扣款项目的用户资料进行变更或终止授权，须由本人持有效证件到贵
                        行指定网点（或电子银行渠道）办理变更或终止授权手续，贵行收到并受理变更或终止授
                        权书（或数据报文）后生效。</p>
                    <p>五、若因指定账户被挂失、冻结、止付、过期、超额度、销户、作废、余额不足及该平
                        台的资料与本人在贵行的委托资料不符等导致扣款不成功，或因监管政策变化造成委托扣
                        款不成功或项目终止，由此产生的责任由本人承担。</p>
                    <p> 六、本人如对委托扣款的金额有疑问，将直接与该平台联系，联系方式为：400-135-3388。</p>
                    <p>七、授权贵行在本人使用委托扣款相关服务期间及服务终止后，有权保留本人在使用服
                        务期间所形成的相关数据信息，该授权不可撤销。</p>
                    <p>八、贵行可根据有关法律法规向政府部门、司法机关、征信机构等第三方提供所获得的
                        本人全部数据信息；并可用于贵行市场分析、案例分享及产品推广等活动。</p>
                    <p>本人对所填资料的真实性、准确性负责，并知悉本授权书所列所有授权声明事项。</p>
                    <p>本授权书通过电子银行渠道签订时：本授权书在客户通过校验手机动态码等方式确认后生效。</p>
                    <p style="margin:60px 0;padding-left:30px;">授权日期&nbsp;&nbsp;
                        <span>{{year}}</span> 年
                        <span>{{month}}</span> 月
                        <span>{{day}}</span> 日
                        </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Investment',    // 登录框状态 
    data() {
        return {
            date: '',                // 当前的时间
            year: '',                // 当前的年份
            month: '',               // 当前的月份
            day: '',
        }
    },
    props: {
        name: String,
        id : String,
        tel: String,
        account: String,
        branch: String
    },
    methods: {
        InvestmentFalg() {
            this.$emit('close', false);
        },
        initData() {
            this.date = new Date()
            this.year = this.date.getFullYear()
            this.month = this.date.getMonth() + 1
            this.day = this.date.getDate()
            if (this.month < 10) this.month = "0" + this.month
            if (this.day < 10) this.day = "0" + this.day
        }
    },
    mounted: function() {
        this.initData()
    },
}  
</script>

<style lang="scss">
#Investment {
    .bg {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        opacity: 0.6;
        background: #000;
        z-index: 100;
    }
    .xubox_layer {
        position: absolute;
        width: 820px;
        height: 600px;
        background-color: #fff;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        z-index: 200;
        border-radius: 5px;
        .title {
            width: 100%;
            height: 50px;
            border-radius: 5px;
            border-bottom: 1px solid #f2f2f2;
            background: #e7e7e7;
            font-size: 18px;
            line-height: 50px;
            padding-left: 20px;
            color: #ff6600;
            cursor: move;
            .del.reg {
                width: 50px;
                height: 50px;
                position: absolute;
                right: 0;
                top: 0;
                line-height: 50px;
                margin-right: 10px;
                cursor: pointer;
                text-align: center;
                color: #999;
                i.el-icon-close {
                    transition: transform .3s;
                }
            }
            .del:hover i.el-icon-close {
                transform: rotate(90deg);
            }
        }
        .xubox_page {
            padding: 10px;
            width: 100%;
            height: 550px;
            .content {
                padding: 0;
                overflow: hidden;
                overflow-y: auto;
                width: 100%;
                height: 530px;
                font-family: "Microsoft YaHei", "arial";
                line-height: 23px;
                color: #666;
                font-size: 14px;
                span {
                    margin-left: 10px;
                }
                h3 {
                    font-size: 14px;
                    color: #666;
                    padding: 8px 10px 2px 10px;
                    line-height: 29px;
                }
                .bold {
                    font-weight: bold;
                }
                .center {
                    text-align: center
                }
                .regTable {
                    width: 100%;
                    border: 1px solid #999;
                    td {
                        border: 1px solid #999;
                        padding: 5px;
                    }
                }
            }
        }
    }
}
</style>