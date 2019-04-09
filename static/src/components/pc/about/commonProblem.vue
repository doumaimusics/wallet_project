<template>
  <div class="commonProblem">
    <ul>
      <li v-for="(item, index) in question" class="information">
        <router-link v-if="item.oldAndNew" :to="{ path: '/info/newReportDetails', query: { time:timeArr[index],id:item.id}}" target="_blank">
          <div class="picBox">
            <img :src="item.picPath">
          </div>
          <span>{{item.title}}</span>
          <span class="time">发布时间：{{item.releaseTime | divisionTime}}</span>
        </router-link>
        <a :href="item.picUrl" v-else-if="item.picUrl" target="_blank">
          <div class="picBox">
            <img :src="item.picPath">
          </div>
          <span>{{item.title}}</span>
          <span class="time">发布时间：{{item.releaseTime | divisionTime}}</span>
        </a>

        <router-link :to="{ path: '/info/reportDetails', query: { time:timeArr[index],id:item.id}}" target="_blank" v-else>
          <div class="picBox">
            <img :src="item.picPath">
          </div>
          <span>{{item.title}}</span>
          <span class="time">发布时间：{{item.releaseTime | divisionTime}}</span>
        </router-link>
 
      </li>
    </ul>
    <!-- 分页 -->
    <div class="fenye" v-if="question.length">
      <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="parseInt(total)" :page-size='6'>
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'commonProblem',
  // metaInfo: {
  //     title: '运营报告_E都市钱包运营报告_E都市钱包_ 让您安心的出借理财平台', // set a title
  //     meta: [{                 // set meta
  //       name: 'keywords',
  //       content: 'E都市钱包，运营报告，出借理财,个人理财,互联网金融，P2P理财'
  //     },{
  //       name: 'baidu-site-verification',
  //       content: 'ASl9m3ghF3'
  //     }]

  // },
  data() {
    return {
      question: '',            // 运营报告数据
      total: '',               // 数据总记录数
      timeArr:[],              // 新生成的时间数组用于详情页的查询依据
    }
  },
  methods: {
    queryTime(time){
      var time1 = time.substr(0,7)
      var time2 = time1.replace("-","")
      return time2
    },
    handleCurrentChange(val) {
      var i = `${val}`
      this.initData(i)
    },
    initData(n) {        // 运营报告
      let _this = this
      _this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/getOperationList", { num: n, size: 6,view_client	:0 }).then((res) => {
        if (res.body.resCode == 1) {
          _this.timeArr = []
          _this.question = res.body.resData.data.operationList.list
          _this.question.map(item => {_this.timeArr.push(_this.queryTime(item.addTime))})
          _this.total = res.body.resData.data.operationList.total
        }
      })
    }
  },
  created: function() {
    this.initData(1)
  },
}  
</script>

<style lang="scss" scoped>
.commonProblem {
  width: 100%;
  height: auto;
  padding: 40px 12px 40px 50px;
  ul {
    overflow: hidden;
    li.information {
      width: 390px;
      height: 240px;
      float: left;
      margin-bottom: 40px;
      box-shadow: 0px 6px 20px 0 rgba(204, 204, 204, 0.26);
      cursor: pointer;
      overflow: hidden;
      .picBox {
        width: 100%;
        height: 190px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        width: 50%;
        height: 49px;
        float: left;
        font-size: 14px;
        color: #333333;
        line-height: 49px;
        padding-left: 12px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      span.time {
        float: right;
        padding: 0 12px 0 0;
        text-align: right;
      }
    }
    li.information:nth-child(2n) {
      float: right;
      margin-right: 0;
    }
  }
  .fenye {
    margin-top: 0;
    margin-bottom: 20px;
  }
}
</style>