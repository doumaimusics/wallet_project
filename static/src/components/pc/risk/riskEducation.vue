<template>
    <div id="riskEducation">
        <div v-title>E都市钱包_风险教育</div>
    	<div v-keywords>E都市钱包、风险教育、投资理财知识、个人理财教育、P2P理财方法、互联网金融</div>
        <!-- <div class="banner">
            跳转测评介绍页
            <div class="margin-box">
                <router-link to="/riskAssessment/assessmentInfo" class="assessmentBtn" tag="div">开始风险测评
                    <div class="hand"></div>
                </router-link>
            </div>
        </div> -->
        <div class="item">
           <div class="item_content">
                <div class="title">
                    <i></i>网贷知识
                    <!-- >5 -->
                    <router-link v-if="p2pKnowledge.length" to="/risk/knowledge" style="right: 33px;">查看更多</router-link>
                </div>
                <div class="knowledge clear" v-if="p2pKnowledge.length > 0">
                    <!-- 1个视屏 -->
                    <div class="knowledge-item" v-if="p2pKnowledge.length == 1">
                        <div class="knowledge_left fl">
                            <a :href="'/#/risk/video?url='+p2pKnowledge[0].pcVideo" target="_blank">
                                <div class="pic" :style="{ background:'url(' + p2pKnowledge[0].picPath + ') no-repeat center center / 100% 100%'}">
                                    <span class="shadow"></span>
                                    <span class="icon-play"></span>
                                    <div class="time">{{p2pKnowledge[0].startTime ? p2pKnowledge[0].startTime:'0' | divisionTime }}发布</div>
                                </div>
                                <div class="lawRule_title fl">{{p2pKnowledge[0].title}}</div>
                            </a>
                        </div>
                        <div class="knowledge_right fl">
                            <!-- @@@@@@@@@@@@ -->
                            <div class="pic expect">
                                <span class="icon-play"></span>
                            </div>
                            <div class="lawRule_title">更多视频,敬请期待</div>
                        </div>
                    </div>
                    <!-- 2到3个视屏 -->
                    <div class="knowledge-item" :class="{active: p2pKnowledge.length >= 2 }" v-else-if="p2pKnowledge.length >= 2 ">
                        <div class="knowledge_left fl">
                            <a :href="'/#/risk/video?url='+p2pKnowledge[0].pcVideo" target="_blank">
                                <div class="pic" :style="{ background:'url(' + p2pKnowledge[0].picPath + ') no-repeat center center / 100% 100%'}">
                                    <span class="icon-play"></span>
                                    <div class="time">{{p2pKnowledge[0].startTime ? p2pKnowledge[0].startTime:'0' | divisionTime }}发布</div>
                                </div>
                                <div class="lawRule_title fl">{{p2pKnowledge[0].title}}</div>
                            </a>
                        </div>
                        <div class="knowledge_right know_list fl">
                            <div class="konwledge_right_list active">
                                <a :href="'/#/risk/video?url='+p2pKnowledge[1].pcVideo" target="_blank">
                                    <div class="pic" :style="{ background:'url(' + p2pKnowledge[1].picPath + ') no-repeat center center / 100% 100%'}">
                                        <span class="icon-play"></span>
                                    </div>
                                    <div class="lawRule_title">{{p2pKnowledge[1].title}}</div>
                                </a>
                            </div>
                            <div class="konwledge_right_list active" v-if="p2pKnowledge.length >= 3">
                                <a :href="'/#/risk/video?url='+p2pKnowledge[2].pcVideo" target="_blank">
                                    <div class="pic" :style="{ background:'url(' + p2pKnowledge[2].picPath + ') no-repeat center center / 100% 100%'}">
                                        <span class="icon-play"></span>
                                    </div>
                                    <div class="lawRule_title">{{p2pKnowledge[2].title}}</div>
                                </a>
                            </div>
                            <div class="konwledge_right_list" v-else>
                                <div class="pic expect">
                                    <span class="icon-play"></span>
                                </div>
                                <div class="lawRule_title">更多视频,敬请期待</div>
                            </div>
                        </div>
                    </div>
                    <!-- 4到5个视屏 -->
                    <!-- <div class="knowledge-item" :class="{active1: p2pKnowledge.length > 3}" v-else-if="p2pKnowledge.length > 3">
                        <div class="knowledge_left fl">
                            <a :href="'/#/risk/video?url='+p2pKnowledge[0].pcVideo" target="_blank">
                                <div class="pic" :style="{ background:'url(' + p2pKnowledge[0].picPath + ') no-repeat center center / 100% 100%'}">
                                    <span class="icon-play"></span>
                                    <div class="time">{{p2pKnowledge[0].startTime ? p2pKnowledge[0].startTime:'0' | divisionTime }}发布</div>
                                </div>
                                <div class="lawRule_title fl">{{p2pKnowledge[0].title}}</div>
                            </a>
                        </div>
                    
                        <div class="knowledge_right know_list fl">
                            <div class="konwledge_right_list active"  v-for="i in 3">
                                <a :href="'/#/risk/video?url='+p2pKnowledge[i].pcVideo" target="_blank">
                                    <div class="pic" :style="{ background:'url(' + p2pKnowledge[i].picPath + ') no-repeat center center / 100% 100%'}">
                                        <span class="icon-play"></span>
                                    </div>
                                    <div class="lawRule_title">{{p2pKnowledge[i].title}}</div>
                                </a>
                            </div>
                            <div class="konwledge_right_list active" v-if="p2pKnowledge.length > 4">
                                <a :href="'/#/risk/video?url='+p2pKnowledge[4].pcVideo" target="_blank">
                                    <div class="pic" :style="{ background:'url(' + p2pKnowledge[4].picPath + ') no-repeat center center / 100% 100%'}">
                                        <span class="icon-play"></span>
                                    </div>
                                    <div class="lawRule_title">{{p2pKnowledge[4].title}}</div>
                                </a>
                            </div>
                            <div class="konwledge_right_list" v-else>
                                <div class="pic expect">
                                    <span class="icon-play"></span>
                                </div>
                                <div class="lawRule_title">更多视频,敬请期待</div>
                            </div>
                        </div>
                    </div> -->
                </div>
           </div> 
           
           <div class="item_content_box clear">
                <div class="item_news_box">
                    <div class="title">
                        <i></i>行业新闻
                        <router-link to="/risk/news">查看更多</router-link>
                    </div>
                    <div class="news" v-if="tradeNews.length > 0">
                 <!--        <div class="news_left fl">
                            <div class="list fl" v-if="tradeNews.length == 1">
                                <router-link :to="'/risk/newsDetails?id='+tradeNews[0].id">  
                                    <div class="pic" :style="{ background:'url(' + tradeNews[0].picPath + ') no-repeat center center / 100% 100%'}"></div>
                                    <div class="news_title">{{tradeNews[0].title}}</div>
                                </router-link>
                            </div>
                            <div class="list fl" v-for="v in 2" v-else-if="tradeNews.length > 1">
                                <router-link :to="'/risk/newsDetails?id='+tradeNews[v-1].id">  
                                    <div class="pic" :style="{ background:'url(' + tradeNews[v-1].picPath + ') no-repeat center center / 100% 100%'}"></div>
                                    <div class="news_title">{{tradeNews[v-1].title}}</div>
                                </router-link>
                            </div>
                        </div>
                        <div class="line fl"></div> -->
                        <div class="news_right">
                            <ul>
                                <router-link v-for="item in tradeNews" tag="li" :to="'/risk/newsDetails?id='+item.id" class="clear">
                                    <div class="news_img fl">
                                        <img :src="item.picPath" alt="">
                                    </div>
                                    <div class="news_title fl">{{item.title}}</div>
                                    <div class="news_time">{{item.startTime ? item.startTime:'0' | divisionTime}}</div>
                                </router-link>
                            </ul>
                        </div>
                    </div>
                </div> 

               <div class="item_lawRule_box fl">
                    <div class="title">
                        <i></i>法律法规
                        <router-link to="/risk/legislation">查看更多</router-link>
                    </div>
                    <div class="lawRule">
                        <ul>
                            <li v-for="item in lawRule">
                                <a :href="item.content" target="_blank">
                                    <div class="lawRule_title fl">{{item.title}}</div>
                                    <div class="lawRule_time fr">{{item.startTime ? item.startTime:'0' | divisionTime}}</div>
                                </a>
                            </li>
                        </ul>
                    </div>
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
                p2pKnowledge: '',       // 网贷知识
                tradeNews: '',          // 行业新闻
                lawRule: '',            // 法律法规
            }
        },
        methods: {
            postFun(id, n){    // nid参数  返回条数  列表容器
                global.http._post(this,"/index/getArticlePager",{nid: id, pageNum: 1, pageSize: n},data => {
                    if (data.data.resCode == 1) {
                        if(id == 'p2pKnowledge'){
                            this.p2pKnowledge = data.data.resData.data.list
                        } else if(id == 'tradeNews'){
                            this.tradeNews = data.data.resData.data.list
                        } else if(id == 'lawRule'){
                            this.lawRule = data.data.resData.data.list
                        }
                    }
                })
            }
        },
        created: function() {
            this.postFun('p2pKnowledge', 6)      // 网贷知识
            this.postFun('tradeNews', 3)         // 行业新闻
            this.postFun('lawRule', 5)           // 法律法规
        },
        mounted: function() {
            
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #riskEducation{
        background: #f8f8f8;
        padding-bottom: 30px;
        .banner{
            width: 100%;
            height: 260px;
            background: url(https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/riskEducation_banner2.png) no-repeat center center / 1920px 260px;
            margin-bottom: 30px;
            position: relative;
            .assessmentBtn{
                height:40px;
                width: 166px;
                border: 1px solid #FFFFFF;
                font-size: 16px;
                padding-left: 10px;
                line-height: 38px;
                color: #fff;
                margin-left: 200px;
                position: absolute;
                top:171px;
                left: 50%;
                margin-left: -512px;
                .hand{
                    background: url('https://aliyunsso.edspay.com/web/riskEducation/pcPageRevision/riskEducation_banner_hand.png') no-repeat;
                    background-size: 100% 100%;
                    height:20px;
                    width: 20px;
                    position: absolute;
                    top:10px;
                    right: 28px;
                    -webkit-animation: slide 2s infinite;
                    -moz-animation: slide 2s infinite;
                    -ms-animation: slide 2s infinite;
                    animation: slide 2s infinite;
                }

            }
        }
        
        .item{
            width: 931px;
            height: auto;
            background: #f8f8f8;
            margin: 0px auto;
            .title {
                width: 100%;
                height: 34px;
                font-family: PingFangSC;
                line-height: 34px;
                font-size: 24px;
                font-weight: 500;
                text-align: left;
                color: #333333;
                margin-bottom: 25px;
                position: relative;
                i {
                display: inline-block;
                width: 4px;
                height: 24px;
                background: #fc4147;
                margin-top: 6px;
                margin-right: 10px;
                vertical-align: top;
                }
                a{
                    font-family: PingFangSC-Regular;
                    font-size: 14px;
                    color: #808080;
                    margin-left: 15px;
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    background: url(https://aliyunsso.edspay.com/web/more_icon.png) no-repeat;  
                    background-size:10px 10px;
                    background-position:right center;
                    padding-right: 13px;
                }
                a:hover{
                    color:#ff5b4c;
                    background: url(https://aliyunsso.edspay.com/web/more_icon_hover.png) no-repeat;  
                    background-size:10px 10px;
                    background-size:10px 10px;
                    background-position:right center;
                }
            }
                
        .item_content{   //网贷知识
            background: #fff;
            padding: 35px 0px 0px 30px;
            margin-bottom: 20px;
            .knowledge{
                width: 100%;
                position: relative;
                background: #fff;
                padding-bottom: 30px;
                .knowledge-item{
                    width: 100%;
                    .knowledge_left{
                        width: 604px;
                        background: #FFFFFF;
                        margin-right: 26px;
                        box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                            .pic{
                                width: 100%;
                                height: 340px;
                                position: relative;
                                -webkit-transition: all .05s ease-in;
                                -moz-transition: all .05s ease-in;
                                -ms-transition: all .05s ease-in;
                                transition: all .05s ease-in;
                                padding-top: 318px;
                                span.shadow{
                                    position: absolute;
                                    top: 0;
                                    left: 0;
                                    width: 100%;
                                    height: 100%;
                                    background: url(https://aliyunsso.edspay.com/web/riskEducation/shadow.png) ; 
                                }
                                span.icon-play{
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    width: 88px;
                                    height: 88px;
                                    margin: -44px 0 0 -44px;
                                    background: url(https://aliyunsso.edspay.com/web/riskEducation/play_max.png) no-repeat 50% 50%;
                                    opacity: 1;
                                    cursor: pointer;
                                    display: block;
                                    -webkit-transition: opacity .4s ease-in;
                                    -moz-transition: opacity .4s ease-in;
                                    -ms-transition: opacity .4s ease-in;
                                    transition: opacity .4s ease-in;
                                    z-index: 9;
                                }
                                .time{
                                    width: 147px;
                                    height: 30px;
                                    line-height: 30px;
                                    font-size: 16px;
                                    color: #fff;
                                    font-family: PingFangSC-Regular;
                                    background: rgba(0,0,0,0.50);
                                    border-radius: 16.85px;
                                    text-align: center;
                                    position: absolute;
                                    bottom: 20px;
                                    right: 18px;
                                }
                            }
                            .lawRule_title{
                                width: 100%;
                                height: 68px;
                                line-height: 68px;
                                padding: 0 20px;
                                font-family: PingFangSC-Regular;
                                font-size: 20px;
                                color: #333333;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                    .knowledge_right{
                        width: 240px;
                        // height: 198px;
                        background: #FFFFFF;
                        /* .konwledge_right_list{
                            margin-bottom: 50px;
                            box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
                        } */
                        .pic{
                            width: 100%;
                            height: 135px; 
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
                                z-index: 9;
                            }
                        }
                        .pic.expect{
                            background: url(https://aliyunsso.edspay.com/web/riskEducation/expect.png) no-repeat 50% 50%;
                            background-size: 100%;
                        }
                        .lawRule_title{
                            width: 100%;
                            height: 44px;
                            line-height: 44px;
                            padding: 0 20px;
                            font-family: PingFangSC-Regular;
                            font-size: 13px;
                            color: #333333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                // 2~3个视频
                .knowledge-item.active{
                    margin-right: 40px;
                    .knowledge_right{
                        width: 240px;
                        height: 100%;
                        margin-top: 0px;
                        box-shadow:none;
                        .konwledge_right_list{
                            background: #FFFFFF;
                            box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
                            width: 100%;
                            height: 179px;
                            .pic{
                                width: 100%;
                                height: 135px; 
                                position: relative;
                                -webkit-transition: all .05s ease-in;
                                -moz-transition: all .05s ease-in;
                                -ms-transition: all .05s ease-in;
                                transition: all .05s ease-in;
                            }
                        }
                        .konwledge_right_list:nth-child(1){
                           margin-bottom: 50px;
                        }
                        .lawRule_title{
                            width: 100%;
                            height: 44px;
                            line-height: 44px;
                            padding: 0 20px;
                            font-family: PingFangSC-Regular;
                            font-size: 16px;
                            color: #333333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                // 4~5个视频
                .knowledge-item.active1{
                    margin-left: 0;
                    .knowledge_left{
                        margin-right: 20px;
                        width: 604px;
                        
                        .pic{
                            height: 340px;
                        }
                        .lawRule_title{
                            height: 64px;
                        }
                    }
                    .knowledge_right{
                        width: 490px;
                        height: 100%;
                        margin-top: 0px;
                        box-shadow:none;
                        .konwledge_right_list{
                            float: left;
                            background: #FFFFFF;
                            box-shadow: 0 2px 4px 0 rgba(204,204,204,0.50);
                            width: 240px;
                            margin-right: 10px;
                            margin-bottom: 46px;
                           
                            .pic{
                                width: 100%;
                                height: 135px; 
                                position: relative;
                                -webkit-transition: all .05s ease-in;
                                -moz-transition: all .05s ease-in;
                                -ms-transition: all .05s ease-in;
                                transition: all .05s ease-in;
                            }
                        }
                        .konwledge_right_list:nth-child(2n){
                           margin-right: 0;
                        }
                        .konwledge_right_list:nth-child(3),.konwledge_right_list:nth-child(4){
                           margin-bottom: 0;
                        }
                        .lawRule_title{
                            width: 100%;
                            height: 44px;
                            line-height: 44px;
                            padding: 0 12px;
                            font-family: PingFangSC-Regular;
                            font-size: 14px;
                            color: #333333;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                    }
                }
                .knowledge_left:hover{
                    .pic{
                        background-size: 103% 103% !important;
                        span.icon-play{
                            opacity: 1;
                        }
                    }
                }
                .konwledge_right_list.active:hover{
                    .pic{
                        background-size: 103% 103% !important;
                        span.icon-play{
                            opacity: 1;
                        }
                    }
                }
            }
        }  
        .item_content_box{   // 行业新闻&&法律法规
            .item_news_box,.item_lawRule_box{
                background: #fff;
                padding: 30px 30px 20px 30px;
                height: 463px;
            }
            .item_news_box{
                width: 931px;
                margin-bottom: 20px;
                .news{
                    margin-bottom: 35px;
                    // .news_left{
                    //     width: 645px;
                    //     .list{
                    //         width: 299px;
                    //         margin-right: 24px; 
                    //         height: 210px;
                    //         transition: all 0.2s ease-in;
                    //         .pic{
                    //             width: 299px;
                    //             height: 169px;
                    //             margin-bottom: 15px;
                    //             transition: background .25s ease-in-out;
                    //         }
                    //         // .pic:hover{
                    //         //     background-size: 105% 105% !important;
                    //         // }
                    //         .news_title{
                    //             width: 100%;
                    //             font-family: PingFangSC-Regular;
                    //             font-size: 14px;
                    //             color: #666666;
                    //             overflow: hidden;
                    //             text-overflow: ellipsis;
                    //             white-space: nowrap;
                    //             padding-left: 5px;
                    //         }
                    //     }
                    //     .list:nth-child(2){
                    //         margin-right: 22px; 
                    //     }
                    //     .list:hover{
                    //         background: #fff;
                    //         -webkit-box-shadow: 0 0 30px rgba(0,0,0,0.1);
                    //         box-shadow: 0 0 30px rgba(0,0,0,0.15);
                    //         -webkit-transform: translate3d(0, 0px, -2px);
                    //         transform: translate3d(0, 1px, -2px);
                    //         .news_title{
                    //             color: #f75a31;
                    //         }
                    //     }
                    // }
                    // .line{
                    //     width: 1px;
                    //     height: 170px;
                    //     background: #ccc;
                    // }
                    .news_right{
                        height: auto;
                        li{
                            width: 100%;
                            color: #666666;
                            padding-top: 20px;
                            border-bottom: 1px dashed #F4F4F4;
                            padding-bottom: 20px;
                            position: relative;
                            // background: #F90;
                            cursor: pointer;
                            .news_img{
                                width: 160px;
                                height: 90px;
                                margin-right: 16px;
                                img{
                                    width: 100%;
                                    height: 100%;
                                }
                            }
                            .news_title{
                                font-family: PingFangSC-Regular;
                                font-size: 16px;
                                line-height: 20px;
                                width: 300px;
                                height: 52px;
                                line-height: 26px;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                text-overflow: ellipsis;
                                overflow: hidden;
                                //下面注释不要删除 否则 -webkit-box-orient: vertical;默认编译的时候，会过滤 
                                /* autoprefixer: off */
                                -webkit-box-orient: vertical;
                                /* autoprefixer: on */
                                color: #333;

                            }
                            .news_time{
                                position: absolute;
                                bottom: 20px;
                                right: 5px;
                                font-size: 14px;
                                color: #A5A4A4;
                            }
                        }
                        li:nth-child(1){
                            padding-top: 5px;
                        }
                        li:last-child{
                            border-bottom: none;
                        }
                         li:hover{
                            cursor: pointer;
                            color: #f75a31;
                            .news_time{
                                color: #f75a31;
                            }
                        } 
                    }
                }
            }
            .item_lawRule_box{
                width: 931px;
                .lawRule{
                    width: 100%;
                    // padding: 0 30px;
                    li{
                        width: 100%;
                        height: 64px;
                        font-size: 14px;
                        color: #333333;
                        padding: 20px 0 22px 0;
                        border-bottom: 1px dashed #F4F4F4;
                        .lawRule_title{
                            width: 60%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                        }
                        .lawRule_time{
                            width: 100px;
                            text-align: right;
                            color: #A5A4A4;
                        }
                    }
                    li:nth-child(1){
                            padding-top: 5px;
                        }
                        li:last-child{
                            border-bottom: none;
                        }
                    li:hover{
                        .lawRule_title,.lawRule_time{
                            color:#f75a31;
                        }
                    }
                }
            }
         }
        }
        @-moz-keyframes slide {
            0% {
                top:10px;
                right: 28px;
            }
            50% {
                top:28px;
                right: 10px;
            }
            100%{
                top: 10px;
                right: 28px;
            }
        }
        @-ms-keyframes slide {
            0% {
                top:10px;
                right: 28px;
            }
            50% {
                top:28px;
                right: 10px;
            }
            100%{
                top: 10px;
                right: 28px;
            }
        }
        @-webkit-keyframes slide {
           0% {
                top:10px;
                right: 28px;
            }
            50% {
                top:28px;
                right: 10px;
            }
            100%{
                top: 10px;
                right: 28px;
            }
        }
        @keyframes slide {
           0% {
                top:10px;
                right: 28px;
            }
            50% {
                top:28px;
                right: 10px;
            }
            100%{
                top: 10px;
                right: 28px;
            }
        }
    }
</style>
