<template>
   <div id="leakage">
       <div class="center">
           <el-tabs v-model="activeName" @tab-click="handleClick">
               <!-- 债权信息 -->
                <el-tab-pane label="债权信息" name="first">
                    <right-detail :getDebtOrderInfo="getDebtOrderInfo" :debtOrderPeriods="debtOrderPeriods"></right-detail>
                </el-tab-pane>
                <!-- 还款情况
                <el-tab-pane label="还款情况" name="second">
                    <el-table :data="info" style="width: 100%" class="table-div blue-table">
                        <div slot="empty" class="table-empty">
                            <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png" />
                        </div>
                        <el-table-column prop="repaymentPeriod" label="还款期数" align='center' >
                            <template scope="scope">{{scope.row.repaymentPeriod?scope.row.repaymentPeriod : 0}}</template>
                        </el-table-column>
                        <el-table-column prop="repaymentAmount " label="还款本金" align='center' >
                            <template scope="scope">{{scope.row.repaymentAmount?scope.row.repaymentAmount : 0 | moneyFormat}}</template>
                        </el-table-column>
                        <el-table-column prop="repaymentInterest" label="还款利息" align='center' >
                            <template scope="scope">{{scope.row.repaymentInterest?scope.row.repaymentInterest : 0 | moneyFormat}}</template>
                        </el-table-column>
                        <el-table-column prop="repaymentStatus" label="还款状态" align='center'>
                            <template scope="scope">{{scope.row.repaymentStatus? '已还': '未还'}}</template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane> -->
            </el-tabs>
       </div>
   </div>
</template>

<script>
import rightDetail from '../template/invest/rightDetail.vue';                   // 债权信息
export default {
    data() {
        return {
            getDebtOrderInfo:{
                hideCardId:'',	      // 隐藏证件号	string	
                hideMobile:'',	      // 隐藏手机号	string	
                hideUserName:'',	  // 	隐藏姓名	string	
                loanStartDate:'',	  // 	借款时间	string	YYYY-MM-dd HH:mm:ss
                loanerType:'',	      // 	借款人性质	number	0:个人[Default],1:公司
                money:'',	          // 	借款金额	number	
                purpose:'',	          // 借款用途	string	
                repaymentSource:'',	  // 	还款来源	string	
                repaymentStatus:'',	  //    还款状态	number	0:未还[Default],1:已还
                timeLimit:'',	      // 借款期限	
                repaymentPeriod:'', //还款期数
                repaymentAmount:'', //还款本金
                repaymentInterest:'', //还款利息
                sex:'', // 性别
                age:'', // 年龄
                overdueTimes:'', // 平台逾期次数
                overdueAmount:'', // 平台逾期金额
                repaymentEnsure:'', // 还款保障措施
                incomeLiabilities: ''  // 借款人收入及负债情况
            },
            debtOrderPeriods:{
              orderNo:''
            },
            info:[],
            risk: ["公安部认证", "芝麻信用认证", "生物指纹认证", "身份证信息认证", "社保和公积金认证", "通讯录认证"],
            activeName: 'first',
        };
    },
    methods: {
        infoData() {
            let _this = this
            global.http._post(_this, "/p2p/getDebtOrderInfo", {orderNo:_this.$route.query.orderNo}, data => {
                if (data.data.resCode == 1) {
                    if(data.data.resData.data.length==0){
                        _this.$message({ message:'借款编号不正确！！！', type: "error" });
                        return
                    }
                    _this.getDebtOrderInfo = data.data.resData.data[0];
                    _this.debtOrderPeriods = data.data.resData.debtOrderPeriods[0];
                    this.info = data.data.resData.debtOrderPeriods
                } else {
                    _this.$message({ message: data.data.resMsg, type: "error" });
                }
            });
        },
        handleClick(tab, event) {  // 借款项目详情选项卡切换
			console.log(tab, event);
		},
    },
  created: function() {
      this.infoData()
  },
  mounted: function() {
      
  },
  components: {
       rightDetail
    },
};
</script>

<style lang="scss">
#leakage {
    .el-tabs__nav {
        width: 400px;
        .el-tabs__active-bar {
            background: #fc4147;
        }
        .el-tabs__item {
            height: 70px;
            line-height: 70px;
            font-size: 16px;
            color: #333;
        }
        .el-tabs__item.is-active {
            color: #fc4147;
        }
        .el-tabs__item:hover {
            color: #fc4147;
        }
    }
    .el-tabs__header {
        margin: 0px;
    }
}
</style>

<style lang="scss" scoped>
#leakage {
  width: 100%;
  height: auto;
  padding: 25px 0 43px;
  .center {
    width: 1200px;
    margin: auto;
    background: #fff;
    padding: 0 40px;
    border: 1px solid #F2F2F2;
    box-shadow: 0 2px 12px 0 rgba(150,150,150,0.23);
    .table-div {
        margin:30px 0px;
        min-height:300px;
    }
    .risk {
      width: 100%;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding-left: 58px;
      p {
        width: auto;
        float: left;
        background: #fafafa;
        height: 40px;
        margin-right: 22px;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        padding: 0 9px;
        i {
          width: 15px;
          height: 11px;
          background: url(https://aliyunsso.edspay.com/web/invest/risk.png)
          no-repeat center center;
          background-size: 15px 11px;
          display: inline-block;
          margin-left: 4px;
        }
      }
    }
  }
}
</style>
