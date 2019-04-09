<template>
  <div>
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
          :picker-options="pickerOptions1"
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
          <!--新浪状态-->
          <el-option
            v-if="type=='1'"
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
          <!--浙商状态-->
          <el-option
            v-if="type=='2'"
            v-for="item in zs_option"
            :key="item.type"
            :label="item.value"
            :value="item.type">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="invest-table"  v-loading.body="loading">
      <!--表格-->
      <el-table :data="tableList" class="home-el-table">
        <div slot="empty" class="table-empty">
          <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
        </div>
        <el-table-column prop="typeName" align="center" label="类型"></el-table-column>
        <el-table-column prop="money" align="center" label="交易金额（元）" >
          <template scope="scope" >  
            <span :style="{color:scope.row.paymentsType == 1 || scope.row.paymentsType == 3 ? '#FF5B4C' : '#333333'}">
               {{checkIn(scope.row.paymentsType)}}{{scope.row.money | moneyFormat}}
            </span>
            
          </template>
        </el-table-column>
        <el-table-column prop="toUserName" align="center" label="交易对方"></el-table-column>
        <el-table-column prop="addTime" align="center" label="时间">
            <template scope="scope">
              <span class="time_color" style="color: #8E8E8E;">
                 {{scope.row.addTime.split(" ")[0]}}
              </span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" align="center" label="操作">
        <template scope="scope">
          <el-popover trigger="hover" placement="bottom" width="200">
            <div class="popDiv">
              <p class="pop detailPop" v-html="scope.row.remark"></p>
            </div>
            <div slot="reference" class="name-wrapper">
              <el-tag>
                <el-button type="text" size="small">查看详情</el-button>
              </el-tag>
            </div>
          </el-popover>
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
</template>
<script>
    export default {
      data () {
        let that = this
        return{
          date: [
            {
              value: '0',
              label: '全部'
            },{
              value: '7',
              label: '最近7天'
            },{
              value: '1',
              label: '一个月'
            },{
              value: '2',
              label: '二个月'
            },{
              value: '3',
              label: '三个月'
            }],
          duringTime:'0',
          startDate: '',
          endDate: '',
          isExactDate: true,
          curPage: 1,
          pageSize: 1,
          type: '2',
          options: [
            {
            value: '',
            label: '全部'
          }, {
            value: 'recharge_success_log',
            label: '充值成功'
          },{
            value: 'cash_success',
            label: '提现成功'
          }, {
            value: 'tender',
            label: '出借'
          }, {
            value: 'capital_collect',
            label: '本金回款'
          }, {
            value: 'interest_collect',
            label: '利息回款'
          }, {
            value: 'manage_fee',
            label: '利息管理费'
          }],
          zs_option: [],
          account: [{
              value: '2',
              label: '存管账户'
            }],
          tradeStatus: 'all',
          tableList: [],
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
          generalSw: sessionStorage.getItem("generalSw"),
          goSina: sessionStorage.getItem("sina"),
          sinaTotalMoney: sessionStorage.getItem("sinaTotalMoney"),
        }
      },
      created () {
        this.getSelect()
        this.getType()
        if (this.generalSw == '1'&&this.sinaTotalMoney!='0') {
          this.account.push({
                value: '1',
                label: '普通账户'
              })
        }
      },
      mounted(){
      },
      methods: {
        sigeinfo(val1,val2){
          this.$emit('sigeinfo',val1,val2)
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
        // 获取类型
        getType () {
          global.http.post(this,"/account/logType",{},data => {
            this.zs_option = data.data.resData.list
          })
        },
        // 查询信息
        getSelect () {
          global.http.post(this,"/account/logList",{
            assetManageType: this.type,
            page: this.curPage,
            pageSize:　10,
            endTime: this.endDate,
            startTime: this.startDate,
            type: this.tradeStatus,
            time: this.duringTime
          },data => {
            let info = data.data.resData.data;
            this.tableList = info.list;
            this.pageSize = info.pages;
            this.loading = false;
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
        // 判断收入支出
        checkIn (val) {
          let status = ''
          switch (val) {
            case 0:
              status = '';
              break;
            case 1:
              status = '+';
              break;
            case 2:
              status = '-';
              break;
            case 3:
              status = '+';
              break;
            case 4:
              status = '-';
              break;
          }
          return status
        }
      }
    }
    </script>
<style scoped>
  /****日期选择****/
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
    font-size: 12px;
color: #333333;
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
    color: #4A90E2;
    cursor: pointer;
  }
  .home-el-table{
    font-size: 14px;
    border: 1px solid #E5E5E5;
    border-bottom: none;
  }
  /*表格样式*/
  .el-table{
    color: #333333;
  }
  .el-button--text{
    color: #4A90E2;
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
  /*弹窗*/
  .popDiv{
    padding-left: 9px;
    padding-right: 9px;
  }
  .pop{
    font-size: 14px;
    line-height: 20px;
    color: #333333;
  }
  .iconpop{
    font-size: 14px;
    line-height: 14px;
    color: #333333;
    padding: 9px;
    line-height: 22px;
  }
</style>
