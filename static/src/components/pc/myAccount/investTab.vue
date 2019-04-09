<template>
  <div >
    <div class="invest-date">
      <!--选择具体日期-->
      <div v-if="isExactDate" class="invest-selectDate" >
        <!-- <span>日期范围:</span> -->
        <ul class="invest-list">
          <!-- :class="{active:duringTime === day.value}" -->
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
      <!-- 没有余额智投 -->
      <div class="backPlan-status" v-if="showAutoTender == 0">
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
      <!-- 有余额智投 -->
      <div class="backPlan-status" v-else>
        类型:
        <el-select v-model="type" placeholder="请选择" class="backPlan-select" @change="changeStatus">
          <el-option
            v-for="item in accountYue"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="invest-status">
        出借状态:
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
    <div class="invest-table" v-loading.body="loading">
      <!--表格-->
      <el-table :data="tableList" class="home-el-table">
        <div slot="empty" class="table-empty">
          <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
        </div>
        <el-table-column prop="borrowName" align="center" label="项目名称"></el-table-column>
        <el-table-column prop="apr" align="center" label="年化利率" ></el-table-column>
        <el-table-column prop="addApr" align="center" label="标加息利率"></el-table-column>
        <el-table-column prop="money" align="center" label="出借金额(元)" width="100px">
          <template scope="scope">
            {{scope.row.money | moneyFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="interestTime" align="center" label="计息起始日" width="90">
          <template scope="scope">
            {{scope.row.interestTime | transFormatDate(1)}}
          </template>
        </el-table-column>
        <el-table-column prop="endDate" align="center" label="到期日" width="90">
          <template scope="scope">
            {{scope.row.endDate | transFormatDate(1)}}
          </template>
        </el-table-column>
        <el-table-column prop="repaymentYesInterest" align="center" label="已收利息(元)">
          <template scope="scope">
            {{scope.row.repaymentYesInterest | moneyFormat}}
          </template>
        </el-table-column>
        <el-table-column prop="collectionInterest" align="center" label="待收利息(元)">
          <template scope="scope">
            {{scope.row.collectionInterest | moneyFormat}}
          </template>
        </el-table-column>
        ]<el-table-column prop="status" align="center" label="出借状态" width="70">
          <template scope="scope">
            {{bottomBtnText[scope.row.status]}}
          </template>
        </el-table-column>
        <el-table-column prop="waitInterest" align="center" label="操作">
          <template scope="scope">
            <router-link :to="{ path: '/myAccount/investRecord/detail', query: { tenderId: scope.row.tenderId}}" v-if="scope.row.borrowSystem==3">查看详情</router-link>
            <div v-else>-</div>
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

          accountYue: [
            {
              value: '2',
              label: '存管账户-自选出借'
            },
            {
              value: '3',
              label: '存管账户-余额智投'
            }
          ],
          options: [
            {
            value: '',
            label: '全部'
          }, {
            value: '0',
            label: '出借中'
          }, {
            value: '1',
            label: '出借结束'
          }],
          bottomBtnText:['出借中','出借结束','转让中'],
          tradeStatus: '',
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
          duringTime: '0',
          info: {},
          loading: true,
          generalSw: sessionStorage.getItem("generalSw"),
          goSina: sessionStorage.getItem("sina"),
          sinaTotalMoney: sessionStorage.getItem("sinaTotalMoney"),
          showAutoTender: sessionStorage.getItem('showAutoTender')
        }
      },
      created () {
        this.getSelect()
        if (this.generalSw == '1' && this.sinaTotalMoney!='0') {
          this.account.push({
                value: '1',
                label: '普通账户'
              })
          this.accountYue.push({
                value: '1',
                label: '普通账户'
          })    
        }
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
        // 查询
        getSelect () {
          global.http.post(this,"/planTender/getUserPlanTenderList",{
            assetManageType: this.type,
            pageNum: this.curPage,
            pageSize:　10,
            endTime: this.endDate,
            startTime: this.startDate,
            status: this.tradeStatus,
            time: this.duringTime,
            userId:333,
            tenderType:this.type == 3 ? 1 : 0    // type = 3 是存管智投  给后台传1   其他都传0
          },data => {
            console.log(data)
            let info = data.body.resData.pageInfo
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
<style>
.backPlan-status .el-input__inner{
  width: 1.5rem;
  padding-right:.133333rem;
}
.backPlan-status .el-input .el-input__icon{
   right: -0.23rem;
}
</style>

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
    color: #608DFF;
    cursor: pointer;
  }
  .home-el-table{
    font-size: 14px;
    border: 1px solid #e5e5e5;
    border-bottom: none;
  }
  .el-table .cell a{
    width: 100%;
    height: 100%;
    display: block;
    color: #608DFF;
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
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
