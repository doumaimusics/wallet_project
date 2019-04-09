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
        <el-select v-model="type" placeholder="请选择" class="backPlan-select" @change="changeType">
          <el-option
            v-for="item in account"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!--新浪交易状态-->
      <div class="invest-status" v-if="type=='sina'">
        交易状态:
        <el-select v-model="tradeStatus" placeholder="请选择" class="invest-select" @change="getSelect">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <!--浙商交易状态-->
      <div class="invest-status" v-if="type=='zs'">
        交易状态:
        <el-select v-model="tradeStatus" placeholder="请选择" class="invest-select" @change="getSelect">
          <el-option
            v-for="item in zsOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="invest-table" v-loading.body="loading">
      <!--新浪表格-->
      <el-table :data="tableList" class="home-el-table" v-if="type=='sina'">
        <div slot="empty" class="table-empty">
          <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
        </div>
        <el-table-column prop="addTime" align="center" label="时间"></el-table-column>
        <el-table-column prop="payment" align="center" label="充值方式"></el-table-column>
        <el-table-column prop="money" align="center" label="充值金额（元）">
          <template scope="scope">
            {{scope.row.money |moneyFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="tradeNo" align="center" label="充值流水号"></el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template scope="scope">
            {{getStatus(scope.row.status)}}
          </template>
        </el-table-column>
      </el-table>
      <!--浙商表格-->
      <el-table :data="tableList" class="home-el-table" v-if="type=='zs'">
        <div slot="empty" class="table-empty">
          <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
        </div>
        <el-table-column prop="addTime" align="center" label="时间"></el-table-column>
        <el-table-column prop="type" align="center" label="充值方式"></el-table-column>
        <el-table-column prop="money" align="center" label="充值金额（元）">
          <template scope="scope">
            {{scope.row.money |moneyFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="orderNo" align="center" label="充值流水号"></el-table-column>
        <el-table-column prop="status" align="center" label="状态">
          <template scope="scope">
            {{getStatus(scope.row.status)}}
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="fenye" v-if="tableList.length">
        <el-pagination
          layout="prev, pager, next"
          :page-count="pageSize"
          :current-page="parseInt(curPage)"
          @current-change="changePage">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      var that = this
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
        account: [
          {
            value: 'zs',
            label: '存管账户'
          }
        ],
        type: 'zs',
        duringTime:'0',
        startDate: '',
        endDate: '',
        isExactDate: true,
        tableList: [],
        pageSize: 1,
        curPage: 1,
        options: [{
          value: '99',
          label: '全部'
        }, {
          value: '1',
          label: '充值成功'
        }, {
          value: '2',
          label: '充值失败'
        },  {
          value: '0',
          label: '充值处理中'
        },{
          value: '3',
          label: '充值取消'
        }],
        zsOptions: [{
          value: '99',
          label: '全部'
        },  {
          value: '1',
          label: '充值成功'
        }, {
          value: '2',
          label: '充值失败'
        },  {
          value: '0',
          label: '充值处理中'
        }],
        tradeStatus: '99',
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
      this.getSelect ()
      if (this.generalSw == '1'&&this.sinaTotalMoney!='0') {
          this.account.push({
              value: 'sina',
              label: '普通账户'
            })
        }
    },
    methods: {
      sigeinfo(val1,val2){
        this.$emit('sigeinfo',val1,val2)
      },
      //选择日期
      selectDate (day) {
        this.duringTime = day
        this.curPage = '1'
        this.getSelect ()
      },
      // 查询信息
      getSelect () {
        if (this.type == 'sina') {
          this.getSina()
        } else if (this.type == 'zs') {
          this.getZS()
        }
      },
      // 查询新浪
      getSina () {
        global.http.post(this,"/recharge/rechargeList",{
          pageNum: this.curPage,
          pageSize:　10,
          endTime: this.endDate,
          startTime: this.startDate,
          status: this.tradeStatus,
          time: this.duringTime
        },data => {
          let info = data.data.resData.pageInfo
          this.tableList = info.list
          this.pageSize = info.pages
          this.loading = false
        })
      },
      // 查询浙商
      getZS () {
        global.http.post(this,"/recharge/rechargeListCzb",{
          pageNum: this.curPage,
          pageSize:　10,
          endTime: this.endDate,
          startTime: this.startDate,
          status: this.tradeStatus,
          time: this.duringTime
        },data => {
          let info = data.data.resData.pageInfo
          this.tableList = info.list
          for (var i = 0;i<this.tableList.length; i++) {
            this.tableList[i].type == 1 ? this.tableList[i].type = '快捷充值' : this.tableList[i].type = '网银充值'
          }
          this.pageSize = info.pages
          this.loading = false
        })
      },
      // 点击日期范围清空 range日期范围 detail实际日期
      dateRange (val) {
        if (val == 'range') {
          this.isExactDate = true;
          this.reset ()
          this.getSelect ()
        } else if (val == 'detail') {
          this.isExactDate = false;
          this.endDate = ''
          this.startDate = ''
          this.tradeStatus = '99'
          this.duringTime = '0'
        }
      },
      // 日期选择
      changeStartDate (val) {
        this.startDate = val
        this.getSelect ()
      },
      changeEndDate (val) {
        this.endDate = val
        this.getSelect ()
      },
      // 切换
      changeType () {
        this.tradeStatus = '99'
        this.getSelect()
      },
      // 重置
      reset () {
        this.endDate = ''
        this.startDate = ''
        this.tradeStatus = '99'
        this.duringTime = '0'
        this.curPage = '1'
      },
      // 分页
      changePage (val) {
        this.curPage = val
        this.getSelect()
      },
      // 判断状态
      getStatus (val) {
        let status = ''
        switch (val) {
          case 0:
            status = '处理中'
            break;
          case 1:
            status = '充值成功'
            break;
          case 2:
            status = '充值失败'
            break;
          case 3:
            status = '充值取消'
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
    color: #7dc6fd;
    cursor: pointer;
    margin-left: 10px;
  }
  .home-el-table{
    font-size: 14px;
    border: 1px solid #e5e5e5;
    border-bottom: none;
  }
  /*表格样式*/
  .el-table{
    color: #333333;
  }
  .el-button--text{
    color: #7dc6fd;
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
</style>

