<template>
   <div id="riskLaws">
       <div v-title>法律法规</div>
       <!-- 风险教育法律法规 -->
       <mt-loadmore class="mtContent" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul class="logChild" v-if="lawRule.length">
                <li v-for="item in lawRule" class="list bdr-b">
                    <a :href="item.content">
                        <div class="title fl">{{item.title}}</div>
                        <div class="time fr">{{item.startTime ? item.startTime:'0' | divisionTime}}</div>
                    </a>
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
                lawRule: [],
                allLoaded: false,
                pageNo: 1,
            }
        },
        methods: {
            gitData(n){
                this.notLogPost('/index/getArticlePager',(data) =>{
					if(data.resCode){
                        if(n == 1){
                           this.lawRule = data.resData.data.list
                        }else{
                            this.lawRule = this.lawRule.concat(data.resData.data.list)
                        }
                        n == data.resData.data.pages ? this.allLoaded = true :  this.allLoaded = false
					}
				},(this.osType ? {oauthToken:this.token, nid: 'lawRule', pageNum: n, pageSize: 10}:{nid: 'lawRule', pageNum: n, pageSize: 10}),1)    
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
            this.PassValue('NavWhite_法律法规');
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #riskLaws{
        width: 100%;
        height: auto;
        min-height: 100%;
        padding: 0 .533333rem;
        background: #fff;
        ul{
            width: 100%;
            height: auto;
            li{
                width: 100%;
                position: relative;
                overflow: hidden;
                a{
                    width: 100%;
                    height: 100%;
                    display: block;
                }
                .title{
                    width: 6.466667rem;
                    max-height: .933333rem;
                    min-height: .466667rem;
                    line-height: .466667rem;
                    font-family: PingFangSC-Regular;
                    font-size: .346667rem;
                    color: #000000;
                    overflow:hidden; 
                    text-overflow:ellipsis;
                    display:-webkit-box; 
                    -webkit-box-orient:vertical;
                    -webkit-line-clamp:2; 
                    margin: .533333rem 0;
                }
                .time{
                    margin-top: .453333rem;
                    width: 2rem;
                    height: .586667rem;
                    line-height: .586667rem;
                    font-family: PingFangSC-Regular;
                    font-size: .32rem;
                    text-align: right;
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
