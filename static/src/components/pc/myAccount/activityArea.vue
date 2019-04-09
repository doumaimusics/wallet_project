<template>
  <div v-loading.body="loading">
    <ui-title title="活动专区"></ui-title>
    <div class="invatation-table">
      <!--表格-->
        <ul>
            <li v-for="item in tableData">
                <img :src="item.picPath" :title="item.title" @click="open(item.pcUrl,item.id)">
                <div class="time">{{item.startTime}}</div>
            </li>
        </ul>
      <!-- 分页 -->
      <div class="fenye" v-if="tableData.length">
        <el-pagination
          layout="prev, pager, next"
          @current-change="changePage"
          :total="parseInt(total)"
          :page-size="pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import title from "../../public/account-title.vue";
export default {
  components: {
    "ui-title": title
  },
  data() {
    return {
      tableData: [],
      total:'',                //  活动总条数
      pageSize:6,             //   活动显示条数
      loading: true
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    open(url,id){
      let href = global.host+"myAccount/activeArea?activityArea="+id
      if(url){
        window.open(url)
      }else{
        window.open(href)
      }
    },
    getList(n) {
      global.http.post(
        this,
        "/index/activeArea",
        {
          pageNum: n,
          pageSize: this.pageSize
        },
        data => {
          if (data.data.resCode == 1) {
            this.tableData = data.data.resData.data.list;
            this.total = data.data.resData.data.total;
            this.loading = false;
          }
        }
      );
    },
    // 分页
    changePage(val) {
      this.getList(val);
    }
  }
};
</script>
<style lang="scss" scoped>
.invatation-table {
  width: 835px;
  margin-top: 70px;
  ul {
    width: 100%;
    overflow: hidden;
    li {
      float: left;
      width: 405px;
      height: auto;
      overflow: hidden;
      border-radius: 8px;
      margin-right: 25px;
      img {
        display: block;
        border-radius: 8px;
        width: 100%;
        height: 134px;
        // background: red;
        margin-bottom: 10px;
      }
      .time {
        margin-bottom: 25px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        padding-left: 10px;
      }
    }
    li:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
<style rel="stylesheet/less">
@import "../../../style/account.less";
</style>
