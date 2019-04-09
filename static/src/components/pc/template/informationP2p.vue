<template>
    <div class="informationP2p">
    	<div class="mationPre">
            <div class="title clear">
                <div class="red_line fl"></div> 
                <h3 class="fl">项目流程</h3>
            </div>
            <div class="schedule">
                <div class="span-div">
                    <span class="span1">{{detail.collectStartTime}}</span>
                    <span class="span2">{{detail.predStartInterestTime}}</span>
                    <span class="span3">{{detail.predEndInterestTime}}</span>
                    <span class="span4">回款到账</span>
                </div>
			</div>
            <div class="title clear">
                <div class="red_line fl"></div> 
                <h3 class="fl">项目详情</h3>
            </div>
            <div class="mation-intro">
                <p>E计划是E都市钱包新推出的一款高效、自动投标工具，通过系统为用户完成自动出借，在授权服务期内，系统智能分散匹配小额消费债权；授权服务期结束，系统协助出借人完成债权转让，满足了用户方便快捷的完成出借的需求，进而达到高效出借目的。<br/>项目借款人均来自真实的消费场景，由平台合作的优质资产推荐机构在消费场景对借款人进行了解，收集真实身份，工作状况，家庭状况，收入负债等情况，用以证明用户身份和消费行为，并经过E都市钱包风控系统+人工两道风险审核，方可获得借款资格，实际借款人收入稳定 ，具备较强还款能力。<br/>出借人资金在出借成功后处于冻结状态，待债权匹配完成后，出借人资金从其存管账户通过浙商银行存管系统转至借款人账户，整个资金流程在银行存管下完全透明。参考收益不代表实际收益，网贷有风险，出借需谨慎！</p>
            </div>
            <ul>
                <li v-for="(item, index) in table" >
                    <span v-if="index == 13">{{item}}</span>
                    <span v-else-if="index == 1">{{name}}</span>
                    <span v-else-if="index == 3">{{method}}</span>
                    <span v-else-if="index == 5">{{timeLimit}}(授权服务期结束可发起债权转让)</span>
                    <span v-else-if="index == 11">{{detail.publishTime}}</span>
                    <span v-else-if="index == 17">{{detail.availableBorrower}}</span>
                    <span v-else-if="index == 19"><img src="https://aliyunsso.edspay.com/web/wx/invest/star375.png" alt="" class="imgSter ic_2"><em>(内部评价，仅供参考)</em></span>
                    <span v-else-if="index == 21" style="line-height:24px">{{item}}</span>
                    <span v-else-if="index == 13">
                            <strong>1-3天</strong>
                            <el-popover trigger="hover" placement="bottom" width="200">
                              <div class="popDiv">
                                <!--待收利息没有-->
                                <p class="pop_p1">项目募集开始的1-3天内将完成本次资金的所有出借及划转。如3天未完成上述操作，则平台将相应资金退回至出借人的平台账户，资金加入至划转期间、资金加入至退回期间不计收益。</p>
                              </div>
                              <div slot="reference" class="name-wrapper">
                                <el-tag>
                                  <i class="iconfont question-ico" style="font-size: 17px;color:#508CEE">&#xe629;</i>
                                </el-tag>
                              </div>
                            </el-popover>
                        <!-- </template> -->
                    </span>
                    
                    <!-- <span v-else-if="index == 7" >{{minAmount}}元</span> -->
                    <span v-else-if="index == 29" >
                        <router-link style="color: #7AC5FF;" :to="'/agree/services?planId='+uuid" target="_blank">《用户出借服务协议》</router-link>
                    </span>
                    <span v-else>{{item}}</span>
                </li>
            </ul>
            <!-- <i>3</i><b>业务模式</b>
            <img src="https://aliyunsso.edspay.com/web/invest/informationP2p.png" alt=""> -->
        </div>
    </div>
</template>

<script>
  export default {
    name: 'information',
        props: ['minAmount','timeLimit','name','uuid','method','detail','collectStartTime'],
        data(){
            return {//'最低出借','100.00元',
                table:['产品名称','e计划-1期-001','还款方式','一次性还本付息','授权服务期','30天（授权服务期结束可发起债权转让）','项目特点','AI智能匹配分散出借','参考年化收益','以实际收益为准','发布日期','2017年8月15日','募集期','1-3天','起息日','出借成功后次日起息','适宜出借人','风险承受能力"保守型"及以上','安全等级','(内部评价，仅供参考)','退出方式','授权服务期结束后退出，未到期债权以债权转让的方式退出，当全部债权转让成功后，方可视为退出','回款时间','预计1-3天内到账，最快当天到账，具体时间视债权转让情况而定','复投方式','本金复投（该期计划持有债权在借款人还款时，将对还款的本金做自动复投处理）','利息管理费','计划到期利息的3%']
                // table:['产品名称','e计划-1期-001','还款方式','一次性还本付息','项目期限','12个月','预计收益','以实际收益为准','起息日','出借成功后次日起息','退出说明','锁定期结束后退出，未到期债权以债权转让的方式退出，当前全部债权转让成功后，方可视为退出','回款时间','锁定期满成功退出后预计1-3天内回款','复投方式','本金复投（该期计划持有债权在借款人还款时，将对还款的本金做自动复投处理）','利息管理费','项目到期基础收益的3%','协议','其它更多信息请查看《服务协议》']
            }
        },
        methods:{
            getDetail(){
                this.$http.post(this.ajaxUrl.getUrl(1) + "/p2p/getDebtOrderInfo", {  uuid: this.$route.query.uuid }).then((data) => {
                    if (data.body.resCode == 1) {
                        
                    }
                })
            }
        },
        mounted(){
            this.getDetail()
        }
  }  
</script>

<style lang="scss" scoped>
    .informationP2p{
    	width:100%;
    	height:auto;
        .name-wrapper {
          display: inline-block;
        }
        
        .el-tag{
            background-color: transparent;
        }
        strong{
            font-weight: 400;
        }
      .mationPre{
        padding:40px 0;
        .title{
            font-size: 20px;
            color: #333333;            
            .red_line{
                width: 4px;
                height: 16px;
                margin-right: 10px;
                margin-top: 6px;
            }
        }
        .schedule{
            width: 975px;
            height: 76px;
            background: url(https://aliyunsso.edspay.com/web/invest/scheduleTwo.png)no-repeat center center;
            background-size: 975px 76px;
            margin-bottom: 60px;
            margin-top: 40px;
            position: relative;
            .span-div {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 975px;
                
                span{
                    width: 25%;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #808080;
                    float: left;
                    padding-top: 40px;
                }
                span.span1{padding-left: 80px;}
                span.span2{padding-left: 107px;}
                span.span3{padding-left: 118px;}
                span.span4{padding-left: 155px;padding-top: 34px;}
            }
        }
        .mation-intro {
            font-size: 16px;
            color: #666666;
            line-height: 30px;
            width: 960px;
            margin-top: 30px;
        }
        ul{
            width: 960px;
            height: auto;
            overflow: hidden;
            padding-top: 48px;
            // margin: 0 auto;
            li{
                width: 320px;
                height: 50px;
                margin-right: 5px;
                margin-bottom: 5px;
                background: #F1F1F1;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #333333;
                float: left;
                padding: 0 23px;
                span{
                    margin: 0;
                    padding: 0;
                    line-height: 50px;
                    width: 100%;
                    height: 100%;
                    // margin: 0 23px;
                    img{
                        height: 17px;
                        width: 126px;
                    }
                    em{
                        color: #808080;
                    }
                }
            }
            li:nth-child(2n){
                width: 630px;
                background: #FAFAFA;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #333333;
            }
        }
        i{
          display: inline-block;
          width:30px;
          height:30px;
          font-size: 16px;
          line-height: 30px;
          text-align: center;
          color: #ffffff;
          margin-right:10px;
          background:url(https://aliyunsso.edspay.com/web/invest/serial.png) center center no-repeat;
          background-size:30px 30px;
        }
        b{
          font-size: 16px;
          line-height: 30px;
          color: #333333;
        }
        // img{
        //   width: 389px;
        //   height: 294px;
        //   display: block;
        //   margin-left: 40px;
        //   margin-top: 30px;
        // }
        .notes{
          width: 100%;
          padding-left: 40px;
          margin-top: 58px;
          span{
            display: block;
            width: 100%;
            font-size: 12px;
            color: #999;
            letter-spacing: 0px;
          }
          span.red{
            display: block;
            width: 100%;
            font-size: 14px;
            color: #fc4147;
            margin-bottom:10px;
          }
        }
      }
      .mationPre i.question-ico{
          background: none;
          cursor: pointer;
      }
    }
</style>