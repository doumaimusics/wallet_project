<template>
  <div v-loading.body="loading" class="myCoupon">
    <ui-title title="我的红包"></ui-title>
    <div class="couponTab">
      <ul>
        <li :class="{active:1 === isActive}" @click="tabList(1)">红包</li>
        <li :class="{active:2 === isActive}" @click="tabList(2)">加息券</li>
        <!-- <li :class="{active:3 === isActive}" @click="tabList(3)">体验券</li> -->
      </ul>
      <span class="use-span" @click="openUse=true">使用说明</span>
    </div>
    <div class="couponTabDiv">
      <div class="coupon-selectDate" >
        <!-- <span>红包状态:</span> -->
        <ul class="coupon-list">
          <li v-for="item in useTypeArr" @click="selectType(item.id)" :class="{selectType:couponType === item.id}">
            {{item.name}}
          </li>
        </ul>
      </div>
      <div v-if="couponList.length == 0" class="empty-div">
        <img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png"/>
      </div>
      <div v-else class="all-coupon">
        <!--couponType 1.红包 2.加息券 3.体验券-->
        <!--useType -1.过期 0.未使用 1.已使用 2.无效-->
        <ui-coupon :useType="item.status" :couponType="isActive" @openDialog = "getDialog" :name="item.name"
                   :limitMoney="item.limitInvestAccount" :limitMonth="item.limitMouthTime" :endTime="item.expiredTime" :isExchange="item.canExcharge"
                   :amount="item.amount" :upApr="item.upApr" :remainDays="item.remainDays" :usedTime="item.usedTime"
                  :limitUptime="item.limitUptime" :limitUpMoney="item.limitUpMoney" :limitBorrowTime="item.limitBorrowTime"
                   v-for="item in couponList" :exchanging="exchanging" :id="item.id"></ui-coupon>
      </div>
      <!-- 分页 -->
      <div class="fenye" v-if="couponList.length">
        <el-pagination
          layout="prev, pager, next"
          @current-change="changePage"
          :page-count="pages"
          :current-page="curpage">
        </el-pagination>
      </div>
    </div>
    <!-- 使用说明 -->
    <div class="shade_box" v-show="openUse" @click="openUse=false"></div>
    <div class="use-dialog" v-if="openUse">
        <div class="close_btn" @click="openUse = false"></div>
        <img src="https://aliyunsso.edspay.com/web/myAccount/hbsysm.png"/>
    </div>
  </div>
</template>
<script>
  import title from "../../public/account-title.vue"
  import coupon from '../../public/coupon.vue'
  export default {
    data () {
      return {
        isActive: 1,
        couponType: 0,
        pages: 1,
        curpage: 1,
        goSina: sessionStorage.getItem("sina"),
        goZS: sessionStorage.getItem("zs"),
        isBindCard: sessionStorage.getItem("isBindCard"),
        isRealName: sessionStorage.getItem("isRealName"),
        couponList: [],
        ifZS: false,
        useTypeArr: [
          {
            name: '未使用',
            id: 0
          },
          {
            name: '已使用',
            id: 1
          },
          {
            name: '已失效',
            id: -1
          }],
        isExchange: false,
        exchanging: false,
        checkRepeat: false,
        loading: true,
        openUse:false,
      }
    },
    components: {
      'ui-title': title,
      'ui-coupon': coupon
    },
    created () {
      this.getCoupons()
    },
    methods: {
      tabList (val) {
        this.isActive = val
        this.couponType = 0
        this.curpage = 1
        this.loading = true
        if (val == 1) {
          this.getCoupons ()
        }else if (val == 2) {
          this.getRate ()
        } else if (val == 3) {
          this.getExperice()
        }
      },
      // 选择卡券类型
      selectType(type) {
        this.couponType = type
        // 初始化
        this.curpage = 1
        this.loading = true
        if (this.isActive == 1) {
          this.getCoupons ()
        } else if (this.isActive == 2){
          this.getRate ()
        } else if (this.isActive == 3) {
          this.getExperice()
        }
      },
      // 兑换红包
      confirmChange (id) {
          if (this.checkRepeat) {    // 是否重复点击
            return
          }
          this.checkRepeat = true
        global.http.post(this,"/red/envelope/exchangeMoney",{
          redEnvelopeId: id,
        },data => {
          if (data.data.resCode == 1) {
            this.$message({message:data.data.resMsg,type: 'success'});
            this.checkRepeat = false
            this.getCoupons ()
          } else {
            this.checkRepeat = false
            this.$message({message:data.body.resMsg,type: 'error'});
          }
        })
      },
      // 是否打开兑换弹窗
      getDialog (id) {
        if (this.goZS == 'false') {
            this.$confirm('您尚未开通存管，请开通存管', '提示', {
              confirmButtonText: '去开通',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$router.push('/myAccount/openAccount')
            }).catch(() => {
              });
        } else{
          this.confirmChange(id)
        }
      },
      // 获取所有红包
      getCoupons () {
        global.http.post(this,"/red/envelope/list",{
          pageNum: this.curpage,
          pageSize:　8,
          status: this.couponType
        },data => {
          if (data.data.resCode == 1) {
          let info = data.data.resData.pageInfo
          this.pages = info.pages
          this.couponList = info.list
          this.loading = false
        }
        })
      },
      // 获取所有加息券
      getRate () {
        global.http.post(this,"/uprate/list",{
          pageNum: this.curpage,
          pageSize:　8,
          status: this.couponType
        },data => {
          if (data.data.resCode == 1){
          let info = data.data.resData.pageInfo
          this.pages = info.pages
          this.couponList = info.list
          this.loading = false
        }
      })
      },
      // 获取所有体验券
      getExperice () {
        global.http.post(this,"/experience/list",{
          pageNum: this.curpage,
          pageSize:　8,
          status: this.couponType
        },data => {
          if (data.data.resCode == 1)
        {
          let info = data.data.resData.pageInfo
          this.pages = info.pages
          this.couponList = info.list
        }
        })
      },
      // 分页
      changePage (val) {
        this.curpage = val
        if (this.isActive == 1) {
          this.getCoupons ()
        } else if (this.isActive == 2){
          this.getRate ()
        } else if (this.isActive == 3) {
          this.getExperice()
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
.myCoupon.account-route{
     padding:40px 30px;
}
  .logo {
    background: url("https://aliyunsso.edspay.com/web/myAccount/icon-hongbao-normal.png") no-repeat;
    width: 217px;
    height: 145px;
  }
  .couponTab{
    margin-top: 27px;
    position: relative;
    .use-span {
      position: absolute;
      top: 0px;
      right: 0px;
      font-size: 16px;
      color: #333333;
      cursor: pointer;
    }
    .use-span:hover {
      color: #FF5D5F;
    }
  }
  .couponTab {
    border-bottom: 1px solid #e7e7e7;
  }
  .couponTab ul{
    overflow: hidden;
  }
  .couponTab ul li:nth-of-type(1){
    margin-left: 30px;
  }
  .couponTab ul li{
    float: left;
    margin-right: 46px;
    padding-bottom: 26px;
    font-size: 16px;
    line-height: 16px;
    color: #333333;
    cursor: pointer;
  }
  .couponTab ul li.active{
    color: #FF5B4C;
  }
  .active{
    border-bottom: 2px solid #FF5B4C;
    
  }
  /*选项卡*/
  .selectType{
    background: #EDEFF1;
    border-radius: 4px;
    color: #333333;
  }
  .coupon-selectDate {
    display: flex;
    flex-direction: row;
    align-items: center;
    // height: 80px;
    margin: 30px 0 50px 0;
    font-size: 14px;
    color: #333333;
  }
  .coupon-list {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .coupon-list li {
    cursor: pointer;
    // margin-left: 10px;
    margin-right: 10px;
    padding: 8px 10px;
    line-height: 14px;
    font-size: 16px;
  }
  .all-coupon .coupon-div:nth-child(2n){
    margin-right: 0px;
  }
  .dialog-h2 {
    font-size: 14px;
    color: #333333;
  }
  .confirm-btn {
    margin-top: 35px;
  }
  .empty-div {
    display:flex;
    flex-direction:row;
    justify-content:center;
    align-items:center;
    height: 200px;    
  }

  /*红包使用遮罩*/
  .shade_box {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.5);
  }
  .use-dialog {
    width: 552px;
    height: 540px;
    position: absolute;
    z-index: 1000;
    top: 15%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .close_btn{
    width: 20px;
    height: 20px;
    background-size: 100%;
    position: absolute;
    right: 0px;
    top: 12px;
    cursor: pointer;
  }
</style>
