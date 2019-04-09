<template>
  <div class="coverage">
    <div v-title>E都市钱包官网 [浙商银行存管] 好资产 更分散</div>
    <div v-keywords>E都市钱包、投资理财、个人理财、P2P理财、互联网金融</div>
    <ul class="list">
      <li v-for="(item, index) in siteNotice" class="clear">
        <router-link :to="{ path: '/info/dynamic/coverage/notice', query: { news:item.id }}" target="_blank">
          <img :src="item.picPath">
          <div class="picRight">
            <h3>{{item.title}}</h3>
            <div class="introduction">{{item.introduction}}</div>
            <span>{{item.startTime}}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <!-- 分页 -->
    <div class="fenye" v-if="siteNotice.length">
      <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="parseInt(total)" :page-size='6'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'coverage',
  data() {
    return {
      siteNotice: '',            // 媒体报告数据
      total: '',                 // 数据总记录数
    }
  },
  methods: {
    handleCurrentChange(val) {
      var i = `${val}`
      this.initData(i)
    },
    initData(n) {        // 网站公告
      let _this = this
      _this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/newsReport", { pageNum: n, pageSize: 6 }).then((res) => {
        if (res.body.resCode == 1) {
          _this.siteNotice = res.body.resData.data.list
          _this.total = res.body.resData.data.total
        }
      })
    }
  },
  created: function() {
    this.initData(1)
  },
}  
</script>

<style lang="scss">
.coverage {
  width: 100%;
  height: auto;
  padding: 0 0px 40px 30px;
  ul.list {
    margin-top: 10px;
    width: 100%;
    li {
      padding: 40px 0;
      border-bottom: 1px dashed #e5e5e5;
      img {
        width: 210px;
        height: 118px;
        margin-right: 20px;
        float: left;
        border: 1px solid #e5e5e5;
      }
      .picRight {
        float: left;
        h3 {
          font-weight: 600;
          width: 500px;
          font-size: 16px;
          color: #333333;
          line-height: 20px;
          display: block;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
         line-height: 30px;
        }
        .introduction{
          margin-top: 10px;
          width: 625px;
          height: 48px;
          line-height: 24px;
          font-size: 14px;
          color: #888787;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          text-overflow: ellipsis;
          overflow: hidden;
          //下面注释不要删除 否则 -webkit-box-orient: vertical;默认编译的时候，会过滤 
            /* autoprefixer: off */
          -webkit-box-orient: vertical;
          /* autoprefixer: on */
        }
        span {
          margin-top: 8px;
          font-size: 14px;
          color: #A5A4A4;
          display: block;
        }
      }
    }
    li:last-child{
      border-bottom: none;
    }
  }
  .fenye {
    margin-top: 20px;
    margin-bottom: 20px;
  }
}



</style>