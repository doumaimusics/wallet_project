<template>
   <div id="riskNews">
       <div v-title>行业新闻</div>
       <!-- 风险教育行业新闻 -->
        <mt-loadmore class="mtContent" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul class="logChild" v-if="tradeNews.length">
                <li v-for="item in tradeNews" class="list bdr-b">
                    <router-link :to="'/wxAnnouncement?id=' + item.id + '&nid=tradeNews'">
                        <div class="title">{{item.title}}</div>
                        <div class="time">{{item.startTime }}</div>
                    </router-link>
                </li>
            </ul>
            <div class="nav" v-if="allLoaded">
                <div class="navBox">
                    <div class="navLeft fl"></div>
                    <div class="navFont fl">没有更多了</div>
                    <div class="navRight fl"></div>
                </div>
            </div>
        </mt-loadmore>
    </div>
</template>

<script>
    import wxToapp from '../../../common/wx/wxToapp.js';   // 与app交互
    import { Loadmore } from 'mint-ui';
    export default {
        mixins: [wxToapp],
        data() {
            return {
                tradeNews: [],
                allLoaded: false,
                pageNo: 1,
            }
        },
        methods: {
            gitData(n){
                this.notLogPost('/index/getArticlePager',(data) =>{
					if(data.resCode){
                        if(n == 1){
                           this.tradeNews = data.resData.data.list
                        }else{
                            this.tradeNews = this.tradeNews.concat(data.resData.data.list)
                        }
                        n == data.resData.data.pages ? this.allLoaded = true :  this.allLoaded = false
					}
				},(this.osType ? {oauthToken:this.token, nid: 'tradeNews', pageNum: n, pageSize: 10}:{nid: 'tradeNews', pageNum: n, pageSize: 10}),1)    
            },
            loadTop(){
                this.pageNo = 1
                setTimeout(() => {
					this.gitData(this.pageNo)
					this.$refs.loadmore.onTopLoaded()
				},1500)
            },
            loadBottom(){
                this.pageNo += 1;
                setTimeout(() => {
					this.gitData(this.pageNo)
					this.$refs.loadmore.onBottomLoaded();
				},1500)
            },

        },
        created: function() {
            this.gitData(1)
            this.PassValue('NavWhite_行业新闻');
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #riskNews{
        width: 100%;
        height: auto;
        padding: 0 .533333rem;
        background: #fff;
        ul{
            width: 100%;
            height: auto;
            li{
                width: 100%;
                height: 2.266667rem; 
                position: relative;
                padding-top: .466667rem;
                a{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .title{
                    width: 100%;
                    height: .746667rem;
                    line-height: .746667rem;
                    font-family: PingFangSC-Regular;
                    font-size: .346667rem;
                    color: #000000;
                    letter-spacing: .0124rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .time{
                    width: 100%;
                    height: .586667rem;
                    line-height: .586667rem;
                    font-family: PingFangSC-Regular;
                    font-size: .32rem;
                    color: #808080;
                }
            }
        }
        .nav{
            width: 100%;
            height: 1.706667rem;
            text-align: center;
            .navBox{
                height: 1010%;
                margin: 0 auto;
                display: inline-block;
                .navLeft,.navRight{
                    width: 1.066667rem;
                    height: .026667rem;
                    background: #c1c1c1;
                    margin-top: .84rem;
                    opacity: .8;
                }
                .navFont{
                    font-family: PingFangSC-Regular;
                    font-size: .266667rem;
                    color: #C1C1C1;
                    line-height: 1.706667rem;
                    margin: 0 .266667rem;
                }
            }
        }
    }
</style>
