<template>
  <div >
    <div class="invest-date">
      <!--选择具体日期-->
      <div v-if="isExactDate" class="invest-selectDate" >
        <!-- <span>日期范围:</span> -->
        <ul class="invest-list">
          <li v-for="day in date" @click="selectDate(day.value)" :class="{active:duringTime === day.value}">{{day.label}}</li>
        </ul>
        <span class="invest-moreDate" @click="dateRange('detail')">具体日期 >></span>
      </div>
      <!--选择日期范围-->
      <div v-else class="invest-selectDate" >
        <span>起止日期:</span>
        <el-date-picker
          class="first-date"
          v-model="startDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
          @change="changeStartDate">
        </el-date-picker>
        <span style="padding: 0px 8px">-</span>
        <el-date-picker
          class="second-date"
          v-model="endDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions0"
          @change="changeEndDate">
        </el-date-picker>
        <span class="invest-moreDate" @click="dateRange('range')">日期范围 >></span>
      </div>
      <!--下拉框筛选-->
      <div class="backPlan-status">
        类型:
        <el-select v-model="type" placeholder="请选择" class="backPlan-select" @change="changeStatus">
          <el-option
            v-for="item in account"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="invest-status">
        交易状态:
        <el-select v-model="tradeStatus" placeholder="请选择" class="invest-select" @change="changeType">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="invest-table project-table" v-loading.body="loading">
      <!--表格-->
      <el-table :data="tableList" class="home-el-table">
        <div slot="empty" class="table-empty"><img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/></div>
        <el-table-column prop="borrowName" align="center" label="项目名称"></el-table-column>
        <el-table-column prop="scales" align="center" label="出借进度" >
          <template scope="scope">
            <ui-circle color="#fc4147" width=50 font-size=12 :pv="scope.row.scales" bold=2 text-color='#fc4147' border-color="#fc4147"></ui-circle>
          </template>
        </el-table-column>
        <el-table-column prop="totalTenderMoney" align="center" label="总出借金额(元)">
          <template scope="scope">
            {{scope.row.totalTenderMoney | moneyFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="totalInterest" align="center" label="已收款(元)" width="100px">
          <template scope="scope">
            {{scope.row.totalInterest | moneyFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="repaymentYesInterest  " align="center" label="待收款(元)">
          <template scope="scope">
            {{scope.row.repaymentYesInterest   | moneyFormat}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="查看">
          <template scope="scope">          
            <span @click="getDetail(scope.row.id, scope.row.borrowSystem)" class="check-get" v-if="scope.row.scales == 100">查看待收</span>
            <span class="check-get" v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="合同">
          <template scope="scope">
            <p v-if="scope.row.borrowSystem==3">--</p>
            <a :href="url+'/app/invest/tenderProtocol?tenderId='+scope.row.id" v-else>借款协议</a>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="fenye" v-if="tableList.length">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pageSize"
          :current-page="curPage"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="本项目待收记录"
      :visible.sync="isCollection"
      top="35%"
      size="tiny"
      class="projectGet">
      <div class="invest-table">
        <!--表格-->
        <el-table :data="tenderList" class="home-el-table" style="width: 100%">
          <div slot="empty" class="table-empty">
            <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
          </div>
          <el-table-column prop="trenderSuccessTime" align="center" label="出借时间">
            <template scope="scope">
              {{scope.row.trenderSuccessTime+'' | transFormatDate(1)}}
            </template>
          </el-table-column>
          <el-table-column prop="money" align="center" label="出借金额(元)" >
            <template scope="scope">
              {{scope.row.money | moneyFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="styleStr" align="center" label="还款方式" width="120"></el-table-column>
          <el-table-column prop="startDate" align="center" label="计息起始日">
            <template scope="scope">
              {{scope.row.startDate+'' | transFormatDate(1)}}
            </template>
          </el-table-column>
          <el-table-column prop="endDate" align="center" label="待收日">
            <template scope="scope">
              {{scope.row.endDate+'' | transFormatDate(1)}}
            </template>
          </el-table-column>
          <el-table-column prop="waitInterest" align="center" label="待收本息(元)">
            <template scope="scope">
              {{scope.row.waitInterest | moneyFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="statusStr" align="center" label="状态"></el-table-column>
          <el-table-column prop="periodStr" align="center" label="期数"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="fenye" style="margin-bottom: 20px" v-if="tenderList.length">
          <el-pagination
            layout="prev, pager, next"
            :page-count="tenderPage"
            :current-page="tenderCurPage"
            @current-change="changeTenderPage">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import circle from '../../public/v-circle.vue'
  export default {
    components: {
      'ui-circle': circle
    },
    data () {
      return{
        date: [
          {
            value: '0',
            label: '全部'
          },{
            value: '1',
            label: '最近7天'
          },{
            value: '2',
            label: '一个月'
          },{
            value: '3',
            label: '二个月'
          },{
            value: '4',
            label: '三个月'
          }],
        duringTime:'全部',
        url: global.ajaxUrl,
        startDate: '',
        endDate: '',
        isExactDate: true,
        isCollection: false,
        type:'2',
        account: [
          {
            value: '2',
            label: '存管账户'
          }
        ],
        options: [
          {
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '出借处理中'
          }, {
            value: '1',
            label: '出借成功'
          }, {
            value: '-1',
            label: '出借失败'
          }],
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()||
              time.getTime() < new Date(that.startDate).getTime() - 8.64e7;
          },
        },
        tradeStatus: '',
        curPage: 1,
        pageSize: 1,
        duringTime: '0',
        info: {},
        tableList: [],
        tenderId: '',
        borrowSystem: '',
        tenderList: [],
        tenderPage: '',
        tenderCurPage: 1,
        loading: true,
        generalSw: sessionStorage.getItem("generalSw"),
        goSina: sessionStorage.getItem("sina"),
        sinaTotalMoney: sessionStorage.getItem("sinaTotalMoney"),
      }
    },
    created () {
      this.getSelect ()
      if (this.generalSw == '1'&&this.sinaTotalMoney!='0') {
        this.account.push({
              value: '1',
              label: '普通账户'
            })
      }
    },
    methods: {
      sigeinfo(val1,val2){
        this.$emit('sigeinfo',val1,val2)
      },
      // 查看待收
      getDetail (id, sta) {
        this.tenderId = id
        this.borrowSystem = sta
        if(sta==3){   // 消费金融
          global.http.post(this,"/planTender/getWaitAmountList",{
            planId: id,
            pageNum: this.tenderCurPage,
            pageSize: 5
          },data => {
            let info = data.data.resData.pageInfo
            this.tenderList = info.list
            this.isCollection = true
            this.tenderPage = info.pages
          })
        }else{     // 存管and Sina
          global.http.post(this,"/app/invest/tenderInterestList",{
            tenderId: id,
            pageNum: this.tenderCurPage,
            pageSize: 5
          },data => {
            let info = data.data.resData.pageInfo
            this.tenderList = info.list
            this.isCollection = true
            this.tenderPage = info.pages
          })
        }
        
      },
      // 选择日期
      selectDate (day) {
        this.duringTime = day
        this.curPage = 1
        this.getSelect ()
      },
      // 切换
      changeType () {
        this.curPage = 1
        this.getSelect ()
      },
      // 切换类型
      changeStatus () {
        this.tradeStatus = ''
        this.changeType()
      },
      // 分页
      changePage (val) {
        this.curPage = val
        this.getSelect()
      },
      // 待收分页
      changeTenderPage (val) {
        this.tenderCurPage = val
        this.getDetail(this.tenderId, this.borrowSystem)
      },
      // 查询列表
      getSelect () {
        this.tableList = []
        global.http.post(this,"/planTender/getFinanceAndBorrowTenderList",{
          assetManageType: this.type,
          pageNum: this.curPage,
          pageSize:　10,
          endTime: this.endDate,
          startTime: this.startDate,
          status: this.tradeStatus,
          time: this.duringTime
        },data => {
           if (data.data.resCode == 1) {
            let info = data.data.resData.pageInfo
            this.tableList = info.list
            this.pageSize = info.pages
            this.loading =false
          }
        })
      },
      // 点击日期范围清空 range日期范围 detail实际日期
      dateRange (val) {
        if (val == 'range') {
          this.isExactDate = true;
          this.duringTime = '0'
          this.startDate = ''
          this.endDate = ''
          this.getSelect ()
        } else if (val == 'detail') {
          this.isExactDate = false;
          this.duringTime = '0'
          this.startDate = ''
          this.endDate = ''
        }
      },
      // 日期选择
      changeStartDate (val) {
        this.startDate = val
        this.curPage = 1
        this.getSelect ()
      },
      changeEndDate (val) {
        this.endDate = val
        this.curPage = 1
        this.getSelect ()
      },
    }
  }</script>
<style scoped>
  .invest-date {
    height:80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #333333;
  }
  .invest-date .backPlan-status{
      padding-left: 40px;
  }
  .invest-list .active{
     background: #EDEFF1;
    border-radius: 2px;
    padding: 2px 14px;
  }
  .invest-list {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .invest-list li {
    cursor: pointer;
    padding: 8px 15px;
    line-height: 14px;
  }
  .invest-list li:nth-of-type(1) {
    margin-left: 10px;
  }
  .invest-selectDate{
    display: flex;
    align-items: center;
  }
  .invest-moreDate{
    padding-left: 10px;
    color: #7dc6fd;
    cursor: pointer;
  }
  .home-el-table{
    font-size: 14px;
    border: 1px solid #e5e5e5;
    border-bottom: none;
  }
  /*分页*/
  .fenye{
    margin-top: 20px;
  }
  /*时间选择器*/
  .first-date {
    width:120px;
    margin-left: 30px;
  }
  .second-date {
    width:120px;
  }
  .v-circle{
    margin:0 auto;
  }
  /*查看待收*/
  .check-get {
    cursor: pointer;
  }
  .check-get:hover {
    color: #fc4147;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
