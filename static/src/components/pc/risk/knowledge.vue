<template>
    <div id="knowledge">
        <!-- 网贷知识 -->
        <div class="banner"></div>
        <div class="item">
            <div class="crumbs"><router-link to="/home">首页</router-link><em> &gt;&gt; </em><router-link to="/info/riskEducation">风险教育</router-link><em> &gt;&gt; </em>网贷知识</div>
            <div class="title">
                <i></i>网贷知识
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in p2pKnowledge" class="fl">
                        <a :href="'/#/risk/video?url='+item.pcVideo" target="_blank">
                            <div class="pic" :style="{ background:'url(' + item.picPath + ') no-repeat center center / 100% 100%'}">
                                <span class="icon-play"></span>
                            </div>
                            <div class="lawRule_title fl">{{item.title}}</div>
                            <div class="lawRule_time fr">{{item.startTime ? item.startTime:'0' | divisionTime}}发布</div>
                        </a>
                    </li>
                </ul>
                <div class="fenye" v-if="p2pKnowledge.length">
                    <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="parseInt(total)" :page-size='size'>
                    </el-pagination>
                </div>
            </div>
            <!-- <div class="eee">
                <video src="https://aliyunsso.edspay.com/edspayKefu.mp4" poster="https://static.edspay.com/article/1806012077488294-FFD8FF/view.html" width="320" height="240" controls="controls">
                Your browser does not support the video tag.
                </video>
            </div> -->
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            let _this = this
            return {
                p2pKnowledge: [],
                total:'',        // 总页数
                size: 10,        // 每页显示条数
            }
        },
        methods: {
            handleCurrentChange(val) {
                var i = `${val}`
                this.gitData(i)
            },
            gitData(n){
                global.http._post(this,"/index/getArticlePager",{nid: 'p2pKnowledge', pageNum: n, pageSize: this.size },data => {
                    if (data.data.resCode == 1) {
                        this.p2pKnowledge = data.data.resData.data.list
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
    #knowledge{
        #my-video{  
            object-fit: cover;  
            object-position: center center;  
        }  
        .banner{
            width: 100%;
            height: 260px;
            background: url(https://aliyunsso.edspay.com/web/riskEducation/knowledge_banner.png) no-repeat center center / 1920px 260px;
            margin-bottom: 40px;
        }
        .item{
            width: 1200px;
            height: auto;
            min-height: 500px;
            margin: 30px auto 87px;
            background: #FFFFFF;
            box-shadow: 0 1px 20px 0 rgba(204,204,204,0.26);
            padding: 35px 25px;
            .crumbs{
                padding-right: 15px;
                text-align: right;
                width: 100%;
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #151515;
                line-height: 20px;
                margin-bottom: 20px;
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
                margin-bottom: 28px;
                padding-left: 35px;
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
                width: 1120px;
                margin: 0 auto;
                ul{
                    width: 100%;
                    height: auto;
                    zoom: 1;
                }
                li{
                    width: 250px;
                    height: 205px;
                    background: #FFFFFF;
                    box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
                    margin: 0 40px 40px 0;
                    .pic{
                        width: 100%;
                        height: 140px;
                        margin-bottom: 10px;
                        position: relative;
                        -webkit-transition: all .05s ease-in;
                        -moz-transition: all .05s ease-in;
                        -ms-transition: all .05s ease-in;
                        transition: all .05s ease-in;
                        .icon-play{
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            width: 62px;
                            height: 62px;
                            margin: -31px 0 0 -31px;
                            background: url(https://aliyunsso.edspay.com/web/riskEducation/play_min.png) no-repeat 50% 50%;
                            opacity: 0;
                            cursor: pointer;
                            display: block;
                            -webkit-transition: opacity .4s ease-in;
                            -moz-transition: opacity .4s ease-in;
                            -ms-transition: opacity .4s ease-in;
                            transition: opacity .4s ease-in;
                        }
                    }
                    .lawRule_title{
                        width: 100%;
                        height: 20px;
                        font-family: PingFangSC-Regular;
                        font-size: 14px;
                        color: #333333;
                        line-height: 20px;
                        padding-left: 10px;
                        margin-bottom: 5px;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .lawRule_time{
                        width: 100%;
                        font-family: PingFangSC-Regular;
                        font-size: 13px;
                        color: #999999;
                        line-height: 18px;
                        padding-left: 10px;
                    }
                }
                li:nth-child(4n){
                    margin-right: 0;
                }
                ul:after{
                    width: 100%;
                    content: '';
                    height: 0;
                    line-height: 0;
                    display: block;
                    visibility: hidden;
                    clear: both;
                }
                li:hover{
                    .pic{
                        background-size: 103% 103% !important;
                        .icon-play{
                            opacity: 1;
                        }
                    }
                }
                .fenye{
                    margin-top: 30x;
                }
            }
            .eee{
                width: 100%;
                height: 300px;
            }
        }
    }
</style>
