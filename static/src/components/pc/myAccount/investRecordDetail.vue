<template>
   <div id="investRecordDetail">
       <div class="title">出借详情</div>
       <div class="invest_content_box">
           <div class="invest_content">
                <div class="investName clear">
                    <div class="investName_left">
                        {{tenderDetails.borrowName}}
                        <!-- <i v-if="tenderDetails.borrowTimeType==0">{{tenderDetails.timeLimit}}个月</i>
                        <i v-else>{{tenderDetails.timeLimit}}天</i> -->
                        <em class="ic_2">{{bottomBtnText[turnStatus]}}</em>
                    </div>
                    
                     <div class="investName_right">
                         <span>
                            <router-link :to="'/agree/services?planId='+tenderDetails.planId+'&tenderId='+tenderDetails.id" target="_blank">《用户出借服务协议》</router-link>
                        </span>
                        <span>
                            <router-link to="/agree/authorizedAgree" target="_blank">《授权委托书》</router-link>
                        </span>
                        <span>
                            <router-link to="/agree/riskNote" target="_blank">《风险提示书》</router-link>
                        </span>
                     </div>
                        
                </div>
                <div class="detail">
                    <div class="list left">
                        <p class="p1">出借金额(元)</p>
                        <p class="money p2">{{tenderDetails.money | moneyFormat}}<em></em></p>
                        <p class="p3">出借时间：<em>{{tenderDetails.trenderSuccessTime+'' | transFormatDate(1)}}</em></p>
                    </div>
                    <div class="line_1"></div>
                    <div class="list cen">
                        <p>参考年化：<em class="money">{{tenderDetails.apr}}%</em><em class="money" v-if="tenderDetails.addApr">+{{tenderDetails.addApr}}%</em></p>
                        <p>参考年化收益：<em class="money">{{tenderDetails.expectInterest}}元</em></p>
                        <p>还款方式：<em class="col">{{tenderDetails.styleStr}}</em></p>
                    </div>
                    <div class="line_2"></div>
                    <div class="list right">
                        <p>使用红包：<em>{{tenderDetails.redEnvelopeAmount | moneyFormat}}元</em></p>
                        <p>起息时间：<em>{{tenderDetails.startDate+'' | transFormatDate(1)}}</em></p>
                        <p>预计回款时间：<em>{{tenderDetails.endDate+'' | transFormatDate(1)}}</em></p>
                    </div>
                </div>
            </div>
        </div>
       
       <div class="tab_box">
            <div class="tabTitle">匹配借款人信息</div>
            <div class="btn_list" v-if="isStart == 1">
                <ul class="clear">
                    <li v-for="(item,index) in btnList" @click="selectFun(index)" :class="{active:index+1 == tabIndex}">{{item}}</li>
                </ul>
            </div>
            <div class="invest-table" v-loading.body="loading">
                    <!--表格-->
                    <el-table :data="tableList" class="home-el-table">
                        <div slot="empty" class="table-empty null_state_04">
                            <img src="https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/null_state_04.png" />
                            <p v-if="isStart == 0">匹配中…请稍后查看</p>
                            <p v-else-if="tableList.length == 0 && isStart == 1">暂无记录</p>
                        </div>
                        
                        <el-table-column prop="orderNo" align="center" label="借款编号"></el-table-column>
                        <el-table-column prop="name" align="center" label="借款人" ></el-table-column>
                        <el-table-column prop="money" align="center" label="匹配金额">
                             <template scope="scope">{{scope.row.money | moneyFormat}}</template>
                        </el-table-column>
                        <el-table-column prop="agreementType" align="center" label="合同情况">
                        <template scope="scope">
                            <router-link :to='"/agree/loanProtocol?xy=1&matchId="+scope.row.matchId' target="_blank">借款协议</router-link>
                            <router-link :to='"/agree/protocol?xy=2&matchId="+scope.row.matchId' v-if="scope.row.agreementType==2" target="_blank">债权转让协议</router-link>
                        </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页 -->
                    <div class="fenye" v-if="tableList.length">
                        <el-pagination
                        layout="prev, pager, next"
                        :total="curPage"
                        :page-size=pageSize
                        @current-change="changePage">
                        </el-pagination>
                    </div>
                </div>
        
        </div>
   </div>
</template>

<script>
    export default {
        data() {
            return {
                tenderDetails:{},
                loading: false,
                id:'',
                tableList: [
                    {
                        orderNo:0,
                        name:" ",
                        money:'0',
                        agreementType:1
                    }
                ],
                curPage: 0,
                pageSize: 6,
                bottomBtnText:['服务期结束发起转让','出借结束','转让中'],
                turnStatus:0,
                btnList:["进行中","已结束"],
                matchStatus:0,
                tabIndex:1,
                isStart:0,
            }
        },
        methods: {
            // 分页
            changePage (val) {
                this.getSelect(val)       // 获取数据的函数
            },
            getSelect(n){                // 借款列表
                let _this = this
                global.http.post_(this,"/planTender/getUserDebtList",{pageNum:n,pageSize:this.pageSize,tenderId:this.$route.query.tenderId,matchStatus:this.matchStatus},data => {
                    if (data.body.resCode == 1) {
                        this.isStart = data.body.resData.isStart;
                        let list = data.body.resData.pageInfo.list
                        if (list) this.tableList = list
                        this.curPage = data.body.resData.pageInfo.total
                    } else {
                        this.$message({ message: data.body.resMsg, type: "error" });
                    }
                });
            },
            selectFun(n){
                this.tabIndex = n+1;
                this.matchStatus = n;
                this.getSelect(1)
            },
            initdata(){
                let _this = this
                global.http.post(this,"/planTender/getUserPlanTenderDetails",{tenderId:this.$route.query.tenderId},data => {
                    if (data.body.resCode == 1) {
                        this.tenderDetails = data.body.resData;
                        this.turnStatus = data.body.resData.turnStatus;
                    } else {
                        this.$message({ message: data.body.resMsg, type: "error" });
                    }
                });
            }
        },
        created: function() {
            this.id = this.$route.query.tenderId
            this.getSelect(1)
            this.initdata()
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss">
    #investRecordDetail{
        width: 960px;
        padding: 0;
        background: #F8F8F8;
        .title{
            background: #fff;
            padding: 30px;
            font-family: PingFangSC-Medium;
            font-size: 24px;
            color: #333333;
        }
        .invest_content_box{
            background: #fff;
            padding: 0 20px 30px;
            margin-bottom: 20px;
            .invest_content{
                border: 1px solid #E5E5E5;
            }
        }
        .investName{
               padding: 20px 20px;
               border-bottom: 1px solid #e5e5e5;
               .investName_left,.investName_right{
                    width: 50%;
                    float: left;
                    font-size: 18px;
                    color: #333;
                    font-family: PingFangSC-Medium;
                    em{
                        padding-left: 10px;
                        font-size:16px;
                        color:#808080;
                    }
               }
                .investName_left i{
                        margin: 0 10px;
                    }
               .investName_right{
                   text-align: right;
                    span{
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #508cee;
                        margin-right: 16px;
                    }
                    span:last-child{
                        margin-right: 0;
                    }
               }
            
        }
        .detail{
            background: #fff;
            width: 100%;
            height: 160px;
            padding-top: 30px;
            position: relative;
            .list{
                width: 33.33%;
                height: 100px;
                float: left;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #808080;
            }
            .list.left{
                padding-left: 20px;
                p{
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #333333;
                    line-height: 22px;
                    width: 100%;
                     margin-bottom: 16px;
                }
                p.money{
                    line-height: 33px;
                    font-family: PingFangSC-Medium;
                    font-size: 24px;
                    color: #FF5B4C;
                }
                p.p3{
                    color: #737373;
                }
            }
            .list.cen{
                padding-left: 22px;
                p{
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #808080;
                    line-height: 22px;
                    width: 100%;
                    margin-bottom: 12px;
                    em.money{
                        font-family: PingFangSC-Medium;
                        font-size: 20px;
                        color: #FF5B4C;
                    }
                    em.col{
                        color: #333;
                    }
                }
            }
            .list.right{
                border: none;
                padding-top:3px;
                padding-left: 24px;
                p{
                    line-height: 20px;
                    width: 100%;
                    margin-bottom: 16px;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    line-height: 22px;
                    color: #808080;
                    em{
                        margin-bottom: 15px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333;
                    }
                }
                p.last{
                    margin-bottom: 0;
                }
            }
            .line_1,.line_2{
                  width: 1px;
                  height: 70px;
                  background: #e5e5e5;
                  position: absolute;
                  top: 46px;
            }
            .line_1{
                left: 256px;
            }
            .line_2{
                left: 554px;
            }
        }


        .tab_box{
            background: #fff;
            padding: 0 20px 30px;
            .tabTitle{
                padding: 30px 10px 20px 10px;
                width: 100%;
                line-height: 33px;
                font-family: PingFangSC-Medium;
                font-size: 24px;
                color: #333333;
            }
            .btn_list{
                width: 100%;
                margin-bottom: 30px;
                padding-left: 10px;
                ul{
                    li{
                        float: left;
                        margin-right: 20px;
                        font-family: PingFangSC-Regular;
                        font-size: 12px;
                        color: #333333;
                        position: relative;
                        cursor: pointer;
                        padding:2px 10px;
                    }
                    .active{
                        background: #EDEFF1;
                        border-radius: 2px;
                    }
                }
            }
        }
        .invest-table .el-table th{
            background: #F5FAFF;
        }
        .invest-table .el-table th>.cell{
            font-family: PingFangSC-Regular;
            font-size: 14px;
            color: #333333;
            background: #F5FAFF;
        }
        .home-el-table{
             border: 1px solid #e5e5e5;
            border-bottom: none;
        }
        .el-table .cell a{
            color: #7ac5ff;
            padding: 0 3px;
        }
        .el-table .cell a:nth-child(2){
            border-left: 1px solid #7ac5ff;
            padding-left: 6px;
        }
    }
</style>
