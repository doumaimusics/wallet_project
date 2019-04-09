<!-- 网站公告模板 -->
<template>
    <div id="notice">
        <div v-title v-if="article.title">{{article.title}}</div>
        <div v-keywords>E都市钱包、投资理财、个人理财、P2P理财、互联网金融</div>
        <div class="crumbs" v-if="this.$route.query.notice">对外公告 > 网站公告 > 查看内容</div>
        <div class="crumbs" v-if="this.$route.query.eFriend">公司动态 > E友见面会 > 查看内容</div>
        <div class="crumbs" v-else-if="this.$route.query.news">公司动态 > 媒体报道 > 查看内容</div>
        <div class="crumbs" v-else-if="this.$route.query.report">运营数据 > 运营报告 > 查看内容</div>
        <div class="crumbs" v-else-if="this.$route.query.tradeNews">行业新闻 > 查看内容</div>
        <div class="main">
            <div class="top">
                <div class="title">{{article.title}}</div>
                <div class="addTime">{{article.startTime}}</div>
            </div>
            
            <div class="pic" v-html="article.content"></div>
            <!-- <div class="back"><span @click='$router.go(-1)'>[&nbsp;返回&nbsp;]</span></div> --> 
            <div class="guide">
                <div class="previousPage" v-if="preArticle.title">上一篇：
                    <router-link :to="{ path: '/info/notice/announcement/notice', query: { notice:preArticle.id }}" v-if="this.$route.query.notice">{{preArticle.title}}</router-link>
                    <router-link :to="{ path: '/info/dynamic/coverage/notice', query: { news:preArticle.id }}" v-else-if="this.$route.query.news">{{preArticle.title}}</router-link>
                    <router-link :to="{ path: '/info/data/commonProblem/notice', query: { report:preArticle.id }}" v-else-if="this.$route.query.report">{{preArticle.title}}</router-link>
                    <router-link :to="{ path: '/info/dynamic/Emeeting/notice', query: { eFriend:preArticle.id }}" v-else-if="this.$route.query.eFriend">{{preArticle.title}}</router-link>
                    <router-link :to="{ path: '/risk/education/tradeNews/notice', query: { tradeNews:preArticle.id }}" v-else-if="this.$route.query.tradeNews">{{preArticle.title}}</router-link>

                </div>
                <div class="previousPage" v-else>上一篇：无</div>

                <div class="nextPage" v-if="nextArticle.title">
                    下一篇：
                    <router-link :to="{ path: '/info/notice/announcement/notice', query: { notice:nextArticle.id }}" v-if="this.$route.query.notice">{{nextArticle.title}}</router-link>
                    <router-link :to="{ path: '/info/dynamic/coverage/notice', query: { news:nextArticle.id }}" v-else-if="this.$route.query.news">{{nextArticle.title}}</router-link>
                    <router-link :to="{ path: '/info/data/commonProblem/notice', query: { report:nextArticle.id }}" v-else-if="this.$route.query.report">{{nextArticle.title}}</router-link>
                    <router-link :to="{ path: '/info/dynamic/Emeeting/notice', query: { eFriend:nextArticle.id }}" v-else-if="this.$route.query.eFriend">{{nextArticle.title}}</router-link>
                    <router-link :to="{ path: '/risk/education/tradeNews/notice', query: { tradeNews:nextArticle.id }}" v-else-if="this.$route.query.tradeNews">{{nextArticle.title}}</router-link>
                </div>
                <div class="nextPage" v-else>下一篇：无</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "notice",
  watch: {
    data() {
      this.$nextTick(() => {
        this.chart.update();
      });
    }
  },
  data() {
    return {
      article: "", // 当前页面
      nextArticle: "", // 下一篇文章
      preArticle: "" // 上一篇文章
    };
  },
  methods: {
    initData() {
      // 网站公告
      let jsonData = {};
      if (this.$route.query.notice) {
        jsonData.nid = "notice";
        jsonData.id = this.$route.query.notice;
      } else if (this.$route.query.news) {
        jsonData.nid = "news";
        jsonData.id = this.$route.query.news;
      } else if (this.$route.query.report) {
        jsonData.nid = "report";
        jsonData.id = this.$route.query.report;
      } else if (this.$route.query.eFriend) {
        jsonData.nid = "e_friend";
        jsonData.id = this.$route.query.eFriend;
      } else if (this.$route.query.tradeNews) {
        jsonData.nid = "tradeNews";
        jsonData.id = this.$route.query.tradeNews;
      }
      let _this = this;
      _this.$http
        .post(_this.ajaxUrl.getUrl(1) + "/index/article.html", jsonData)
        .then(res => {
          console.log(res)
          if (res.body.resCode == 1) {
            _this.article = res.body.resData.data.nowArticle;
            _this.nextArticle = res.body.resData.data.nextArticle;
            _this.preArticle = res.body.resData.data.preArticle;
          }
        });
    }
  },
  created: function() {
    this.initData();
  },
  watch: {
    $route: "initData" // 监听路由发生变化的时候执行的函数
  }
};
</script>

<style lang="scss">
#notice {
  width: 100%;
  padding: 30px 0px 40px 30px;
  .crumbs {
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
    letter-spacing: 0;
    background: #fff;
    margin-bottom: 40px;
  }
  .main {
    height: auto;
    margin: 0 auto;
    background: #fff;
    padding-top: 40px;
    padding: 12px 60px 0;
    .top {
      border-bottom: 1px solid #e5e5e5;
      .title {
        font-family: PingFangSC-Regular;
        width: 100%;
        text-align: center;
        font-size: 22px;
        color: #333;
        line-height: 30px;
        margin-bottom: 16px;
      }
      .addTime {
        width: 100%;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #808080;
        letter-spacing: 0;
        margin-bottom: 30px;
      }
    }
    .pic {
      line-height: 35px;
      font-size: 14px;
      height: auto;
      box-sizing: border-box;
      margin: 30px 0 0 0;
      p {
        font-size: 14px;
        color: #333;
        width: 100%;
        line-height: 28px;
        margin-left: 0px;
        margin-bottom: 20px;
        display: inline-block;
        text-indent: 2em;
        img {
          max-width: 100%;
          margin: 30px 0;
          display: block;
        }
      }
      img {
          max-width: 100%;
        }
    }
    .back {
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: #333;
      margin-top: 40px;
      margin-bottom: 11px;
      span {
        cursor: pointer;
      }
      span:hover {
        color: #f75a31;
      }
    }
    .guide {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0;
      cursor: default;
      float: none;
      width: 100%;
      height: 80px;
      a:hover {
        color: #f75a31;
      }
      .previousPage{
         margin-bottom: 20px;
      }
    }
  }
}
</style>