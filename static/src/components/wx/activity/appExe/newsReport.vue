<template>
   <div id="newsReport">
        <h3 class="title">{{article.title}}</h3>
        <div class="pic" v-html="article.content"></div>
   </div>
</template>

<script>
    export default {
        watch: {
            data () {
                this.$nextTick(() => {
                    this.chart.update()
                })
            }
        },
        data() {
            return {
                article:"", 
            }
        },
        methods: {
            initData(){
                let _this = this
                _this.$http.post(_this.ajaxUrl.getUrl(1)+"/index/article.html",{nid:'news',id :_this.$route.query.news}).then((res) => {
                    if (res.body.resCode == 1) {
                        _this.article = res.body.resData.data.nowArticle
                    }
                })
            }
        },
        created: function() {
            this.initData()
        },
        mounted: function() {

        },
        components: {

        },
        watch:{
            '$route':'initData'   // 监听路由发生变化的时候执行的函数
        }
   }
</script>

<style lang="scss">
    #newsReport{
        padding: .533333rem .266667rem;
        .title{
            padding: 0 .533333rem;
            font-weight: bold;
            width:100%;
            text-align:center;
            font-size:.4rem;
            color:#333;
            line-height:.48rem;
          }
          .pic{
            line-height: .426667rem;
            font-size: .32rem;
            height: auto;
            overflow: hidden;
            box-sizing: border-box;
            margin: .266667rem 0 0 0;
            color: #666;
            p{
               width: 100%;
               line-height: .5rem;
               margin-left: 0px; 
               margin-bottom:.2rem;
               display: inline-block;
               img{
                   max-width: 100%;
                   margin-top: .4rem;
               }
            }
          }
    }
</style>
