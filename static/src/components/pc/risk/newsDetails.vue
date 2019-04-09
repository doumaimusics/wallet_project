<template>
    <div id="newsDetails">
        <div class="news_item">
            <div class="details_left fl" v-if="flag">
                <div class="crumbs"><router-link to="/risk/news">行业新闻</router-link><em> &gt;&gt; </em>查看内容</div>
                <div class="title">{{tradeNews.nowArticle.title}}</div>
                <div class="time">{{tradeNews.nowArticle.startTime}}</div>
                <div class="line"></div>
                <div class="item" v-html="tradeNews.nowArticle.content"></div>
            </div>
            <div class="details_right fl" v-if="flag">
                <div class="tuijian">相关推荐</div>
                <div class="list" v-for="item in tradeNews.list">
                    <router-link :to="'/risk/newsDetails?id=' + item.id">
                        <div class="pic" :style="{ background:'url(' + item.picPath + ') no-repeat center center / 100% 100%'}"></div>
                        <div class="tips">{{item.title}}</div>
                    </router-link>
                </div>
                <div class="btn" @click="$router.push('/risk/news')">查看更多</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tradeNews: {},
                flag:false,
            }
        },
        methods: {
            gitData(){
                global.http._post(this,"/index/article.html",{nid: 'tradeNews', id: this.$route.query.id},data => {
                    if(data.body.resCode == 1){
                        this.tradeNews = data.body.resData.data
                        this.flag = true
                    }
                })
            }
        },
        created: function() {
            this.gitData()
        },
        mounted: function() {

        },
        components: {

        },
        watch: {
            $route: "gitData" // 监听路由发生变化的时候执行的函数
        }
   }
</script>

<style lang="scss" scoped>
    #newsDetails{
        width: 100%;
        overflow: hidden;
        background: #f5f5f5;
        .news_item{
            width: 1200px;
            height: auto;
            margin: 0 auto;
            padding: 40px 0 80px;
            // overflow: hidden;
            .details_left{
                width: 880px;
                background: #FFFFFF;
                box-shadow: 3px 1px 20px 0 rgba(204,204,204,0.26);
                margin-right: 20px;
                padding: 35px 40px 80px;
                .crumbs{
                    text-align: right;
                    width: 100%;
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #151515;
                    line-height: 20px;
                    margin-bottom: 40px;
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
                .title{
                    font-family: PingFangSC-Medium;
                    font-size: 26px;
                    color: #333333;
                    text-align: center;
                    margin-bottom: 12px;
                    line-height: 37px;
                }
                .time{
                    font-family: PingFangSC-Medium;
                    font-size: 12px;
                    color: #999999;
                    text-align: center;
                    line-height: 17px;
                    margin-bottom: 22px;
                }
                .line{
                    width: 100%;
                    height: 0px;
                    border-bottom: 1px dashed #e7e7e7;
                }
                .item {
                    line-height: 35px;
                    font-size: 14px;
                    height: auto;
                    overflow: hidden;
                    box-sizing: border-box;
                    margin: 34px 0 0 0;
                    p {
                        font-size: 14px;
                        color: #333;
                        width: 100%;
                        line-height: 28px;
                        margin-left: 0px;
                        margin-bottom: 20px;
                        display: inline-block;
                        img {
                        max-width: 100%;
                        margin-top: 30px;
                        }
                        video{
                            width: 100%;
                        }
                    }
                }
            }
            .details_right{
                width: 300px;
                padding: 20px;
                background: #FFFFFF;
                box-shadow: 3px 1px 20px 0 rgba(204,204,204,0.26);
                .tuijian{
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #333333;
                    line-height: 22px;
                    margin-bottom: 30px;
                }
                .list{
                    width: 100%;
                    height: auto;
                    a{
                        display: block;
                        width: 100%;
                        height: 210px;
                        .pic{
                            width: 100%;
                            height: 140px;
                            margin-bottom: 10px;
                        }
                        .tips{
                            width: 100%;
                            height: 40px;
                            line-height: 20px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                        }
                    }
                }
                .btn{
                    width: 260px;
                    height: 30px;
                    border: 1px solid #DBDBDB;
                    border-radius: 3px;
                    font-family: PingFangSC-Regular;
                    font-size: 12px;
                    color: #333333;
                    text-align: center;
                    line-height: 30px;
                    cursor: pointer;
                }
            } 
        }
        .news_item:after{
            width: 100%;
            content: '';
            height: 0;
            line-height: 0;
            display: block;
            visibility: hidden;
            clear: both;
        }
    }
</style>
<style lang="scss">
    #newsDetails{
        .details_left{
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
                margin-top: 30px;
                }
                video{
                    width: 100%;
                }
            }
        }
    }
</style>

