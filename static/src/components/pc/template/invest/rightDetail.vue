<template>
    <div class="rightDetail">
        <!-- 风控 -->
        <div class="investData">
            <ul class="clear">
                <li class="fl">
                    <span class="name ic_2 ">借款总额（元）:</span>
                    <span class="value fw">{{getDebtOrderInfo.money}}</span>
                </li>
                <li class="fl">
                    <span class="name">还款方式：</span>
                    <span class="value">还本付息</span>
                </li>
                <li class="fl">
                    <span class="name">还款状态：</span>
                    <span class="value"><span v-if="getDebtOrderInfo.repaymentStatus == 0">还款中</span><span v-else-if="getDebtOrderInfo.repaymentStatus == 1">已还款</span><span v-else-if="getDebtOrderInfo.repaymentStatus == 2">匹配中</span></span>
                </li>
            </ul>
        </div>
        <div class="investTitle mt20">
				<i></i>风控信息
        </div>
        <img src="https://aliyunsso.edspay.com/web/invest/investinfo1.png"/>
        <!-- 借款人 -->
          <div class="investTitle">
				<i></i>借款人信息
			</div>
            <div class="table">
                <ul>
                    <li>姓名</li>
                    <li>{{getDebtOrderInfo.hideUserName}}</li>
                    <li>性别</li>
                    <li>{{getDebtOrderInfo.sex}}</li>
                    <li>年龄</li>
                    <li>{{getDebtOrderInfo.age}}</li>
                    <li>证件号码</li>
                    <li>{{getDebtOrderInfo.hideCardId}}</li>
                    <li>手机号码</li>
                    <li>{{getDebtOrderInfo.hideMobile}}</li>
                    <li>主体性质</li>
                    <li v-if="getDebtOrderInfo.loanerType==1">公司</li>
                    <li v-else>个人</li>
                    <li>收入情况</li>
                    <li>工资收入</li>
                    <li>所属职业/行业</li>
                    <li>{{getDebtOrderInfo.loanerType == 0 ? '个体':'公司'}}</li>
                    <li>负债情况</li>
                    <li>无</li>
                    <li>征信情况</li>
                    <li>借款人承诺近一年在金融机构无不良信用记录</li>
                    <li>其他借款情况</li>
                    <li style="line-height: 20px">借款人承诺在本平台和其他网贷平台借款总额不超过人民币100万元，在其他平台借款无不良还款记录</li>

                </ul>
            </div>
            <!-- 借款信息 -->
            <div class="investTitle">
				<i></i>基本信息
			</div>
            <div class="table">
                <ul>
                    <li>项目名称</li>
                    <li>{{getDebtOrderInfo.orderNo}}</li>
                    <li>项目简介</li>
                    <li style="line-height: 20px">借款人出于资金周转需要平台出借人进行融资，还款来源为借款人日常收入以及持有资产的权益变现收入，经考察借款人收入稳定，具备还款能力，风险可控。</li>
                    <li>借款金额(元)</li>
                    <li>{{getDebtOrderInfo.money}}</li>
                    <li>借款用途</li>
                    <li>个人消费</li>
                    <li>年化利率</li>
                    <li>{{getDebtOrderInfo.apr}}%</li>
                    <li>起息日</li>
                    <li>放款成功后起息</li>
                    <li>还款来源</li>
                    <li>工资收入</li>
                    <li>还款方式</li>
                    <li>{{getDebtOrderInfo.debtTypeStr}}（可提前还款）</li>
                    <li>还款日期</li>
                    <li>{{getDebtOrderInfo.repayEndDateStr}}{{getDebtOrderInfo.repaymentStatus == 2 ? '(预计)':''}}</li>
                    <li>还款保障措施</li>
                    <li style="line-height: 20px">我司风控人员会定期进行贷后检查，核实资金使用情况，根据具体情况制定贷后监管的实施方案，及时披露项目最新情况。</li>
                </ul>
            </div>
            <!-- 风险评估 -->
            <div class="investTitle">
                <i></i>风险评估
            </div>
            <div class="table">
                <p class="text">根据借款人当前情况进行评估,借款人具有偿还贷款的能力;但不排除未来因借款人收入下降、过度举债等因素导致借款人财务状况恶化，从而发生逾期的可能</p>
                <div class="tips">网贷有风险，出借需谨慎</div>
            </div>
            <!-- 其他信息 -->
            <div class="investTitle">
                <i></i>其他信息
            </div>
            <div class="table">
                <ul>
                    <li>借款资金运用情况</li>
                    <li>个人消费</li>
                    <li>借款人经营及财务情况</li>
                    <li>良好</li>
                    <li>借款人还款能力变化</li>
                    <li>暂无变化</li>
                    <li>借款人是否逾期</li>
                    <li>否</li>
                    <li>借款人是否涉诉</li>
                    <li>无诉讼记录</li>
                    <li>借款人是否受行政处罚</li>
                    <li>否</li>
                </ul>
            </div>
            <!-- 身份信息 -->
            <div class="investTitle" v-if="getDebtOrderInfo.behindCardUrl !== '' && getDebtOrderInfo.frontCardUrl !== ''">
                <i></i>图片材料
            </div>
            <div class="borrow-idCard" v-if="getDebtOrderInfo.behindCardUrl !== '' && getDebtOrderInfo.frontCardUrl !== ''">
                <div class="borrow-cardItem">
                    <div class="cardPic" @click="enlarge('font')">
                        <img :src="getDebtOrderInfo.frontCardUrl"/>
                    </div>
                    <p>身份证 (正面)</p>
                </div>
                <div class="borrow-cardItem">
                    <div class="cardPic"  @click="enlarge('back')">
                        <img :src="getDebtOrderInfo.behindCardUrl"/>
                    </div>
                    <p>身份证 (反面)</p>
                </div>
            </div>
            <!-- 身份证放大弹框 -->
            <div class="showPic" v-if="ifIdCard" @click="ifIdCard = false">
                <img class="imgBox" :src="enLargeImg"/>
            </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            ifIdCard:false,
            enLargeImg:''
        }
    },
    props:['getDebtOrderInfo','debtOrderPeriods'],
    methods: {
        enlarge (val) {
            this.ifIdCard = true
            if (val == 'font') {
                this.enLargeImg = this.getDebtOrderInfo.frontCardUrl
            } else {
                this.enLargeImg = this.getDebtOrderInfo.behindCardUrl
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .rightDetail {
        width: 100%;
        .investData{
            height:110px;
            line-height:110px;
            li{
                width:33%;
                .name{
                    font-size: 18px;
                    color: #808080;
                    padding-right: 18px;
                }
                .fw{
                    font-family: DIN-Medium;
                }
                .ic_2{
                    color:#333;
                }
                .value{
                    font-size: 20px;
                    color: #333333;
                }
            }
        }
        .mt20 {
            margin-top: 20px;
        }
        .investTitle {
            width: 100%;
            font-size: 18px;
            color: #333;
            font-weight: 600;
            i {
                display: inline-block;
                width: 4px;
                height: 24px;
                background: #fc4147;
                margin-right: 15px;
                vertical-align: sub;
            }
         }
         img {
            margin:  50px 0 50px 2%;
        }
        .table {
            width: 1130px;
            height: auto;
            margin: 30px 0px 30px 0px;
            overflow: hidden;
            .text{
                font-size:16px;
                line-height:42px;
                letter-spacing: 0;
            }
            .tips{
                font-size:16px;
                line-height:30px;
                color:#C5C5C5;
                text-align:center;
            }
            ul li {
                width: 315px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #333;
                background: #f1f1f1;
                font-size: 14px;
                float: left;
                margin: 0 5px 5px 0;
                text-align:center;
            }
            ul li:nth-child(2n) {
                width: 650px;
                background: #fafafa;
                padding: 0 60px;
            }
        }
        .borrow-idCard{
            margin: 33px 0px;
            overflow: hidden;
			.borrow-cardItem {
				float: left;
				margin-right: 20px;
				.cardPic {
					width: 274px;
					height: 168px;
                    padding: 14px 12px;
                    border-radius: 8px;
                    background: #F7F8FA;
                    img {
                        margin: 0;
                        width: 248px;
                        height: 140px;
                    }
				}
				p {
					font-size: 16px;
                    color: #808080;
					text-align: center;
					margin-top: 13px;
				}
			}
		}
        .showPic {
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background: rgba(0, 0, 0, 0.6);
            z-index: 9999999;
             .imgBox {
                width: 744px;
                height: 420px;
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                margin: auto;
             }
        }
    }
    
</style>
