<template>
  <div class="myBackPlan">
    <ui-title title="回款计划"></ui-title>
    <div>
      <div class="backPlan-date">
        <!--选择具体日期-->
        <div v-if="isExactDate" class="backPlan-selectDate" >
          <!-- <span>日期范围:</span> -->
          <ul class="backPlan-list">
            <li v-for="day in date" @click="selectDate(day.value)" :class="{active:duringTime === day.value}">{{day.label}}</li>
          </ul>
          <span class="backPlan-moreDate"  @click="dateRange('detail')">具体日期 >></span>
        </div>
        <!--选择日期范围-->
        <div v-else class="backPlan-selectDate" >
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
            :picker-options="pickerOptions1"
            @change="changeEndDate">
          </el-date-picker>
          <span class="backPlan-moreDate" @click="dateRange('range')">日期范围 >></span>
        </div>
        <!--下拉框筛选-->
        <div class="backPlan-status" style="padding-left: 80px;">
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
        <div class="backPlan-status">
          回款状态:
          <el-select v-model="tradeStatus" placeholder="请选择" class="backPlan-select" @change="changeType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="backPlan-table" v-loading.body="loading">
        <!--表格-->
        <el-table :data="tableList" class="home-el-table">
          <div slot="empty" class="table-empty">
            <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
          </div>
          <el-table-column prop="borrowName" align="center" label="项目名称"></el-table-column>
          <el-table-column prop="apr" align="center" label="年化利率" width=68>
            <template scope="scope">
              {{scope.row.apr}}%
            </template>
          </el-table-column>
          <el-table-column prop="borrowInterest" align="center" label="平台加息" width=68>
            <template scope="scope">
              {{scope.row.addApr}}%
            </template>
          </el-table-column>
          <el-table-column prop="borrowInterest" align="center" label="VIP加息" width=68>
            <template scope="scope">
              {{scope.row.vipUprateApr?scope.row.vipUprateApr: 0}}%
            </template>
          </el-table-column>
          <el-table-column prop="timeLimit" align="center" label="期数/总期数" width=95>
            <template scope="scope">
              {{scope.row.period}}/{{scope.row.timeLimit}}
            </template>
          </el-table-column>
          <el-table-column prop="repaymentTime" align="center" label="预计回款时间" width=90>
            <template scope="scope">
              {{scope.row.repaymentTime ? scope.row.repaymentTime.split(" ")[0] : '-'}}
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" label="回款状态" width=68>
            <template scope="scope">
              {{getStatus(scope.row.status)}}
            </template>
          </el-table-column>
          <el-table-column prop="capital" align="center" label="应回款本金(元)" width=110>
            <template scope="scope">
              {{scope.row.capital | moneyFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="interest" align="center" label="应回款利息(元)">
            <template scope="scope">
              {{scope.row.interest| moneyFormat }}
              <el-popover trigger="hover" placement="bottom">
                <div class="popDiv" v-if="type == 2">
                  <!--待收利息没有-->
                  <p class="pop pop_p1">项目基础收益: {{ scope.row.collectionInterest| moneyFormat }}(回款时扣<br>除3%利息管理费)</p>
                  <p class="pop">项目加息收益: {{ scope.row.borrowInterest| moneyFormat }}</p>
                  <p class="pop">加息券加息收益: {{ scope.row.upRateInterest| moneyFormat }}</p>
                  <p class="pop">VIP加息收益: {{ scope.row.vipInterest| moneyFormat }}</p>
                </div>
                <div class="popDiv" v-else-if="type == 1">
                  <!--待收利息没有-->
                  <p class="pop">标待收利息: {{ scope.row.collectionInterest| moneyFormat }}</p>
                  <p class="pop">标加息利息: {{ scope.row.borrowInterest| moneyFormat }}</p>
                  <p class="pop">加息券加息利息: {{ scope.row.upRateInterest| moneyFormat }}</p>
                  <p class="pop">vip加息利息: {{ scope.row.vipInterest| moneyFormat }}</p>
                </div>
                <div slot="reference" class="name-wrapper">
                  <el-tag>
                    <i class="iconfont" style="font-size: 17px;color:#508CEE;">&#xe629;</i>
                  </el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="ID" align="center" label="备注" width=50>
            <template scope="scope">
              <div class="popDivs">
                <el-popover trigger="hover" placement="bottom">
                  <p class="pop">应收利息: {{ scope.row.interest| moneyFormat }}</p>
                  <p class="pop">逾期利息: {{ scope.row.lateInterest| moneyFormat }}</p>
                  <p class="pop">逾期天数: {{ scope.row.lateDays| moneyFormat }}</p>
                  <div slot="reference" class="name-wrapper">
                    <el-tag>
                      <i class="iconfont" style="font-size: 17px;color:#508CEE">&#xe629;</i>
                    </el-tag>
                  </div>
                </el-popover>
              </div>
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
    </div>
  </div>
</template>
<script>
  import title from "../../public/account-title.vue"
  import record from "./investTab.vue"
  import project from "./investProjectTab.vue"
  export default {
    data () {
      let that = this
      return {
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
        duringTime:'0',
        startDate: '',
        endDate: '',
        isExactDate: true,
        type: '2',
        tableList: [],
        account: [
          {
            value: '2',
            label: '存管账户'
          }
        ],
        options: [{
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '待回款'
        }, {
          value: '1',
          label: '已回款'
        }],
        tradeStatus: '',
        loading: true,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now()||
              time.getTime() < new Date(that.startDate).getTime() - 8.64e7;
          }
        },
        curPage: 1,
        pageSize: 1,
        info: {},
        generalSw: sessionStorage.getItem("generalSw"),
        goSina: sessionStorage.getItem("sina"),
        sinaTotalMoney: sessionStorage.getItem("sinaTotalMoney"),
      }
    },
    components: {
      'ui-title': title
    },
    created () {
      this.getSelect()
      if (this.generalSw == '1'&&this.sinaTotalMoney!='0') {
        this.account.push({
              value: '1',
              label: '普通账户'
            })
      }
    },
    methods: {
      selectDate (day) {
        this.duringTime = day
        this.curPage = 1
        this.getSelect ()
      },
      // 获取状态
      getStatus (val) {
        let status = ''
        switch (val) {
          case 0:
            status = '待回款'
            break;
          case 1:
            status = '已回款'
            break;
          case 2:
            status = '回款中'
            break;
        }
        return status
      },
      // 切换类型
      changeStatus () {
        this.tradeStatus = ''
        this.changeType()
      },
      // 切换
      changeType () {
        this.curPage = 1
        this.getSelect ()
      },
      // 分页
      changePage (val) {
        this.curPage = val
        this.getSelect()
      },
      // 查询
      getSelect () {
        global.http.post(this,"/borrow/collection/list",{
          assetManageType: this.type,
          pageNum: this.curPage,
          pageSize:　10,
          endTime: this.endDate,
          startTime: this.startDate,
          status: this.tradeStatus,
          time: this.duringTime
        },data => {
          console.log(data);
          let info = data.body.resData.data;
          this.tableList = info.list
          this.pageSize = info.pages
          this.loading = false
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
  }
</script>
<style scoped>
.home-el-table{
  border: 1px solid #e5e5e5;
  border-bottom: none;
}
.myBackPlan{
  padding: 30px 20px 0;
}
  .backPlan-table{
    margin-top: 10px;
  }
  
  .backPlan-date {
    height:80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #333333;
  }

  .backPlan-selectDate{
    display: flex;
    align-items: center;
  }
  .backPlan-moreDate{
    padding-left: 10px;
    color: #608DFF;
    cursor: pointer;
  }
  .backPlan-list .active{
    background: #EDEFF1;
    border-radius: 2px;
    padding: 2px 14px;
  }
  .backPlan-list {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .backPlan-list li {
    cursor: pointer;
    padding: 8px 10px;
    line-height: 14px;
  }
  .backPlan-list li:nth-of-type(1) {
    margin-left: 7px;
  }
  /*弹窗*/
  .popDiv{
    padding-left: 9px;
    padding-right: 9px;
  }
  p.pop_p1{
    line-height: 25px;
  }
  .popDivs{
    padding-left: 9px;
    padding-right: 9px;
  }
  .pop{
    font-size: 14px;
    line-height: 40px;
    color: #333333;
    border-bottom: 1px dashed #e7e7e7;
  }
  .iconpop{
    font-size: 14px;
    line-height: 14px;
    color: #333333;
    padding: 9px;
    line-height: 22px;
  }
  /*时间选择器*/
  .first-date {
    width:120px;
    margin-left: 30px;
  }
  .second-date {
    width:120px;
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
