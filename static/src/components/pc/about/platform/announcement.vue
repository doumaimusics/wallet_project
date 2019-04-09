<template>
  <div class="announcement">
    <ul class="list">
      <li v-for="(item, index) in siteNotice" class="information">
        <router-link :to="{ path: '/info/notice/announcement/notice', query: { notice:item.id }}" target="_blank">
          <div class="describe clear">
            <h3>{{item.title}}</h3>
            <span>{{item.startTime | divisionTime}}</span>
          </div>
        </router-link>
      </li>
    </ul>
    <!-- 分页 -->
    <div class="fenye" v-if="siteNotice.length">
      <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="parseInt(total)" :page-size='10'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'announcement',
  // metaInfo: {
  //     title: '网站公告_E都市钱包网站公告_E都市钱包_让您安心的出借理财平台', // set a title
  //     meta: [{                 // set meta
  //       name: 'keywords',
  //       content: 'E都市钱包，网站公告，E都市钱包官网，出借理财,个人理财,互联网金融，P2P理财'
  //     },{
  //       name: 'baidu-site-verification',
  //       content: 'ASl9m3ghF3'
  //     }]
  // },
  data() {
    return {
      siteNotice: '',            // 网站公告数据
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
      _this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/noticelist", { pageNum: n, pageSize: 10 }).then((res) => {
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
.announcement {
  padding-bottom:30px;
  ul.list {
    overflow: hidden;
    padding-right:12px;
    padding-left: 50px;
    margin-bottom: 50px;
    li.information {
      position: relative;
      width: 100%;
      padding: 30px 0;
      border-bottom: dashed  1px #e5e5e5;
      
      a {
        display: block;
        width: 100%;
        height: 100%;
      }
      .describe {
        width: 100%;
        background-color: #ffffff;
        h3 {
          float: left;
          width: 355px;
          font-size: 16px;
          text-align: left;
          color: #333;
          margin-left: 15px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        span {
          display: block;
          float: right;
          width: 50%;
          font-size: 14px;
color: #A5A4A4;
          text-align: right;
          margin-right: 20px;
        }
      }
    }
  }
  .fenye {
    margin-top: 0;
    margin-bottom: 20px;
  }
}
</style>