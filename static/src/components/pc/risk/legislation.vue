<template>
    <div id="legislation">
        <!-- 法律法规 -->
        <div class="banner"></div>
        <div class="item">
            <div class="crumbs"><router-link to="/home">首页</router-link><em> &gt;&gt; </em><router-link to="/info/riskEducation">风险教育</router-link><em> &gt;&gt; </em>法律法规</div>
            <div class="title">
                <i></i>法律法规
            </div>
            <div class="content">
                <ul>
                    <li v-for="item in lawRule">
                        <a  target='_blank' :href="item.content" class="clear">
                            <div class="lawRule_title fl">{{item.title}}</div>
                            <div class="lawRule_time fr">{{item.startTime ? item.startTime:'0' | divisionTime}}</div>
                        </a>
                    </li>
                </ul>
                <div class="fenye" v-if="lawRule.length">
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
            return {
                lawRule: [],
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
                global.http._post(this,"/index/getArticlePager",{nid: 'lawRule', pageNum: n, pageSize: this.size },data => {
                    if (data.data.resCode == 1) {
                        this.lawRule = data.data.resData.data.list
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
    #legislation{
        background: #f8f8f8;
        padding-bottom: 20px;
        .banner{
            width: 100%;
            height: 260px;
            background: url(https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/legislation_banner.png?v=1.0) no-repeat center center / 1920px 260px;
            margin-bottom: 20px;
        }
        .item{
            width: 1200px;
            height: auto;
            min-height: 500px;
            margin: 30px auto 0px;
            background: #FFFFFF;
            box-shadow: 0 1px 20px 0 rgba(204,204,204,0.26);
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
                margin: 0 auto;
                li{
                    width: 100%;
                    padding: 15px 0;
                    border-bottom: 1px dashed #e8e8e8;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #333333;
                    .lawRule_title{
                        font-family: PingFangSC-Regular;
                        width: 80%;
                        font-size: 16px;
                        line-height: 60px;
                        padding-left: 0;
                    }
                    .lawRule_time{
                        width: 20%;
                        line-height: 60px;
                        text-align: right;
                    }
                }
                li:last-child{
                    border-bottom: none;
                }
                li:hover{
                    color:#f75a31;
                }
                .fenye{
                    margin-top: 30px;
                    margin-bottom: 60px;
                }
            }
        }
    }
</style>
