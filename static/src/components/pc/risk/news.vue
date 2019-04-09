<template>
   <div id="news">
       <!-- 行业新闻 -->
       <div class="banner"></div>
       <div class="item">
           <div class="crumbs"><router-link to="/home">首页</router-link><em> &gt;&gt; </em><router-link to="/info/riskEducation">风险教育</router-link><em> &gt;&gt; </em>行业新闻</div>
        <div class="title">
                <i></i>行业新闻
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in tradeNews">
                        <router-link :to="'/risk/newsDetails?id=' + item.id" class="clear">
                            <div class="pic fl" :style="{ background:'url(' + item.picPath + ') no-repeat center center / 100% 100%'}"></div>
                            <div class="details fl">
                                <div class="lawRule_title">{{item.title}}</div>
                                <div class="tips">{{item.introduction}}</div>
                                <div class="lawRule_time">{{item.startTime}}</div>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <div class="fenye" v-if="tradeNews.length">
                    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="parseInt(total)" :page-size='size'>
                    </el-pagination>
                </div>
            </div>
       </div>
   </div>
</template>

<script>
    export default {
        data() {
            let _this = this
            return {
                tradeNews: [],
                total:'',        // 总页数
                size: 5,        // 每页显示条数
            }
        },
        methods: {
            handleCurrentChange(val) {
                var i = `${val}`
                this.gitData(i)
            },
            gitData(n){
                global.http._post(this,"/index/getArticlePager",{nid: 'tradeNews', pageNum: n, pageSize: this.size },data => {
                    if (data.data.resCode == 1) {
                        this.tradeNews = data.data.resData.data.list
                        this.total =data.body.resData.data.total
                    }
                })
            }
        },
        created: function() {
            this.gitData(1)
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #news{
        background: #f8f8f8;
        padding-bottom: 30px;
        .banner{
            width: 100%;
            height: 260px;
            background: url(https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/news_banner.png?v=1.1) no-repeat center center / 1920px 260px;
            margin-bottom: 20px;
        }
        .item{
            width: 1200px;
            height: auto;
            min-height: 500px;
            margin: 30px auto 0px;
            background: #FFFFFF;
            box-shadow: 0 1px 20px 0 rgba(204,204,204,0.36);
            padding: 30px 40px;
            .crumbs{
                padding-right: 15px;
                text-align: right;
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #151515;
                line-height: 20px;
                margin-bottom: 8px;
                a,em{
                    color: #4A90E2;
                }
                em{
                    font-size: 16px;
                }
                a:hover{
                    color:#f75a31;
                }
            }
            .title {
                width: 100%;
                height: 34px;
                font-family: PingFangSC;
                line-height: 34px;
                font-size: 24px;
                font-weight: 500;
                text-align: left;
                color: #333333;
                i {
                display: inline-block;
                width: 4px;
                height: 24px;
                background: #fc4147;
                margin-top: 4px;
                margin-right: 10px;
                vertical-align: top;
                }
            }
            .content{
                width: 1110px;
                li{
                    width: 100%;
                    // height: 160px;
                    border-bottom: 1px dashed #E5E5E5;
                    padding: 40px 0px;
                    transition: all 0.2s ease-in;
                    .pic{
                        width: 210px;
                        height: 118px;
                        margin: 0 20px 0 0px;
                    }
                    .tips{
                        width: 100%;
                        height: 42px;
                        line-height: 24px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #888787;
                        margin-bottom: 8px;
                        overflow: hidden;
                    }
                    .details{
                        width: 855px;
                        .lawRule_title{
                            font-family: PingFangSC-Medium;
                            font-size: 14px;
                            line-height: 22px;
                            line-height: 30px;
                            margin-bottom: 10px;
                            padding-left: 0;
                            color: #333333;
                        }
                        .lawRule_time{
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #888787;
                            line-height: 17px;
                        }
                    }
                }
                li:last-child{
                    border-bottom: none;
                }
                li:hover{
                    background: #fff;
                    -webkit-box-shadow: 0 0 30px rgba(0,0,0,0.1);
                    box-shadow: 0 0 30px rgba(0,0,0,0.15);
                    -webkit-transform: translate3d(0, 0px, -2px);
                    transform: translate3d(0, 1px, -2px);
                }
                .fenye{
                    margin-top: 20px;
                    margin-bottom: 60px;
                }
            }
        }
    }
</style>
