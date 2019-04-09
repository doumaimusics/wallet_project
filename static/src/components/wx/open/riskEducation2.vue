<template>
   <div id="riskEducation">
       <div v-title>E友学院</div>
       <div class="tab bdr-b">
           <div class="list" v-for="(v, i) in tabList" :class="{active: i == tabIndex}" @click="change(i)"><span :class="{active: i == tabIndex}">{{v}}</span></div>
       </div>
       <div class="item">
           <!-- E友课堂 -->
           <div class="knowledge tabs" id="tab1">
                 <div class="nav bdr-b">
                    <div class="title">E友课堂</div>
                    <router-link class="more" v-if="p2pKnowledge.length > 1" :to="{ path:'/risk/riskKnowledge',query:$route.query}">更多<em>&gt;</em></router-link>
                </div>
                <div class="video" v-if="p2pKnowledge.length > 0">
                    <video ref="myVideo" @click="pause" :src="p2pKnowledge[0].appVideo" @play="isPause" @pause="Vplay = true" :poster="p2pKnowledge[0].picPath">
                    Your browser does not support the video tag.
                    </video>
                    <div v-if="Vplay" class="play" @click="play"></div>
                    <div class="video_title" :class="{playFont: !Vplay}">{{p2pKnowledge[0].title}}</div>
                    <div class="video_time" :class="{playFont: !Vplay}">{{p2pKnowledge[0].startTime ? p2pKnowledge[0].startTime:'0' | divisionTime}}发布</div>
                </div>
           </div>
           <!-- 行业新闻 -->
           <div class="news tabs" id="tab2">
               <div class="nav bdr-b">
                   <div class="title">行业新闻</div>
                   <router-link class="more" :to="{ path:'/risk/riskNews',query:$route.query}">更多<em>&gt;</em></router-link>
               </div>
               <ul>
                   <li v-for="(item, index) in tradeNews" :class="{bdrB: index == 0}">
                       <router-link :to="'/wxAnnouncement?id=' + item.id + '&nid=tradeNews'">
                            <div class="newsLeft fl">
                                <div class="title">{{item.title}}</div>
                                <div class="time">{{item.startTime}}</div>
                            </div>
                            <div class="newsRight fl" :style="{background: 'url(' + item.picPath + ') no-repeat center center / 100% 100%'}"></div>
                       </router-link>
                   </li>
               </ul>
           </div>
           <!-- 法律法规 -->
           <div class="legislation tabs" id="tab3">
               <div class="nav bdr-b">
                   <div class="title">法律法规</div>
                   <router-link class="more" :to="{ path:'/risk/riskLaws',query:$route.query}">更多<em>&gt;</em></router-link>
               </div>
               <ul>
                   <li v-for="(item, index) in lawRule" :class="{bdrB: index != lawRule.length-1}">
                       <a :href="item.content">
                            <div class="title">{{item.title}}</div>
                            <div class="time">{{item.startTime ? item.startTime:'0' | divisionTime }}</div>
                       </a>
                   </li>
               </ul>
           </div>
       </div>
   </div>
</template>

<script>
    import wxToapp from '../../../common/wx/wxToapp.js';   // 与app交互
    export default {
        mixins: [wxToapp],
        data() {
            return {
                tabList: ['E友课堂','行业新闻','法律法规'],
                tabIndex: 0,
                p2pKnowledge: '',       // E友课堂
                tradeNews: '',          // 行业新闻
                lawRule: '',            // 法律法规
                Vplay: true,
                No: true,
            }
        },
        methods: {
            play(){
                this.$refs.myVideo.play()
                this.Vplay = false
            },
            pause(){
                this.$refs.myVideo.pause()
                this.Vplay = true
            },
            // change(i){
            //     if(this.tabIndex == i){
            //         return
            //     }
            //     let h,
            //         tab1 = document.getElementById('tab1'),
            //         tab2 = document.getElementById('tab2'),
            //         tab3 = document.getElementById('tab3');
            //     i == 0 ? h = tab1.offsetTop : i == 1 ? h = tab2.offsetTop : i == 2 ? h = tab3.offsetTop : ''
            //     i == 0 ? '' : this.pause();
            //     this.tabIndex = i
            //     document.body.scrollTop = h;
            //     document.documentElement.scrollTop = h;
            // },
            // menu(){
            //     let scroll = document.documentElement.scrollTop || document.body.scrollTop;
            //     let tab2 = document.getElementById('tab2'),
            //         tab3 = document.getElementById('tab3');
            //     if(scroll < tab2.offsetTop){
            //         this.tabIndex = 0
            //     }else if (scroll < tab3.offsetTop) {
            //         this.tabIndex = 1
            //          this.pause()
            //     }else {
            //         this.tabIndex = 2
            //     }
            // },
            isPause(){    // 适配三星手机
                if(this.No){
                    // this.No = false
                    // this.pause()
                    this.Vplay = false
                } 
            },
            postFun(id, n){    // nid参数  返回条数
                this.notLogPost('/index/getArticlePager',(data) =>{
					if(data.resCode){
						if(id == 'p2pKnowledge'){
                            this.p2pKnowledge = data.resData.data.list
                        } else if(id == 'tradeNews'){
                            this.tradeNews = data.resData.data.list
                        } else if(id == 'lawRule'){
                            this.lawRule = data.resData.data.list
                        }
					}
				},(this.osType ? {oauthToken:this.token, nid: id, pageNum: 1, pageSize: n}:{nid: id, pageNum: 1, pageSize: n}),1)
            }
        },
        created: function() {
            this.postFun('p2pKnowledge', 2)
            this.postFun('tradeNews', 2)
            this.postFun('lawRule', 13)
            this.PassValue('NavWhite_E友学院');
        },
   //      mounted: function() {
   //          window.addEventListener('scroll', this.menu)
   //      },
   //      watch: {
   //          'tabIndex'(val){
   //              document.title = this.tabList[val]
   //          }
   //      },
   //      beforeDestroy(){
			// window.removeEventListener('scroll', this.menu)
   //      },
   }
</script>

<style lang="scss" scoped>
    #riskEducation{
        .tab{
            width: 100%;
            height: 1.066667rem;
            position: fixed;
            z-index: 99;
            background: #fff;
            .list{
                width: 33.33333%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 1.066667rem;
                span{
                    font-size: .373333rem;
                    color: #333;
                    display: block;
                    margin: 0 auto;
                    width: 1.933333rem;
                    position: relative;
                }
                span.active:after {
                    height: 1px;
                    content: '';
                    width: 100%;
                    border-bottom: 1px solid #FF5B4C;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    transform: scaleY(0.5);
                    -webkit-transform: scaleY(0.5);
                    z-index: 3;
                }
            }
            .list.active{
                span{
                    color: #FF5B4C;
                }
            }
        }
        .item{
            width: 100%;
            height: auto;
            position: relative;
            top: 1.066667rem;
            .tabs{
                .nav{
                    position: relative;
                    width: 100%;
                    height: 1.066667rem;
                    padding: 0 .533333rem;
                    background: #fff;
                    .title,.more{
                        height: 100%;
                        font-family: PingFangSC-Medium;
                        font-size: .373333rem;
                        color: #333333;
                        letter-spacing: .021333rem;
                        line-height: 1.066667rem;
                        float: left;
                    }
                    .more{
                        float: right;
                        font-family: PingFangSC-Regular;
                        font-size: .346667rem;
                        color: #999999;
                        em{
                            font-size: .373333rem;
                            margin-left: .066667rem;
                        }
                    }
                }
            }
            .knowledge{
                width: 100%;
                margin-bottom: .386667rem;
                .video{
                    width: 100%;
                    height: 5.64rem;
                    position: relative;
                    video{
                        width: 100%;
                        height: 100%;
                    }
                    .video_title{
                        width: 9.106667rem;
                        height: .933333rem;
                        position: absolute;
                        top: .133333rem;
                        left: .293333rem;
                        line-height: .466667rem;
                        font-family: PingFangSC-Medium;
                        font-size: .373333rem;
                        color: #FFFFFF;
                        letter-spacing: .021333rem;
                        overflow:hidden; 
                        text-overflow:ellipsis;
                        display:-webkit-box; 
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:2; 
                        z-index: 2;
                        opacity: 1;
                        -webkit-transition: opacity 1s ease-in;
                        -moz-transition: opacity 1s ease-in;
                        -ms-transition: opacity 1s ease-in;
                        transition: opacity 1s ease-in;
                    }
                    .video_time{
                        height: .8rem;
                        line-height: .8rem; 
                        position: absolute;
                        top: 4.84rem;
                        left: .293333rem;
                        color: #fff;
                        font-family: PingFangSC-Regular;
                        font-size: .266667rem;
                        letter-spacing: .0032rem;
                        z-index: 2;
                        opacity: 1;
                        -webkit-transition: opacity 1s ease-in;
                        -moz-transition: opacity 1s ease-in;
                        -ms-transition: opacity 1s ease-in;
                        transition: opacity 1s ease-in;
                    }
                    .playFont{
                        opacity: 0;
                    }
                    .play{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;
                        left: 0;
                        z-index: 9;
                        background: url(https://aliyunsso.edspay.com/web/riskEducation/moble_play.png) no-repeat center center / 1.24rem 1.24rem;
                    }
                }
            }
            .news{
                width: 100%;
                height: auto;
                margin-bottom: .266667rem;
                background: #fff;
                ul{
                    // height: 4.8rem;
                    width: 100%;
                    padding: 0 .533333rem;
                    li{
                        width: 100%;
                        height: 2.4rem;
                        position: relative;
                        a{
                            width: 100%;
                            height: 100%;
                            display: block;
                            .newsLeft{
                                height: 100%;
                                width: 5.6rem;
                                padding-top: .466667rem;
                                margin-right: .666667rem;
                                .title{
                                    width: 100%;
                                    height: .9rem;
                                    font-family: PingFangSC-Regular;
                                    font-size: .346667rem;
                                    color: #000000;
                                    letter-spacing: .0124rem;
                                    line-height: .46rem;
                                    overflow: hidden;
                                    text-overflow:ellipsis;
                                    display:-webkit-box; 
                                    -webkit-box-orient:vertical;
                                    -webkit-line-clamp:2;
                                }
                                .time{
                                    width: 100%;
                                    height: .72rem;
                                    font-family: PingFangSC-Regular;
                                    font-size: .32rem;
                                    color: #808080;
                                    line-height: .72rem;
                                    overflow: hidden;
                                }
                            }
                            .newsRight{
                                width: 2.666667rem;
                                height: 1.466667rem;
                                margin-top: .426667rem;
                            }
                        }
                    }
                    
                }
            }
            .legislation{
                width: 100%;
                height: auto;
                background: #fff;
                ul{
                    height: auto;
                    width: 100%;
                    padding: 0 .533333rem; 
                    li{
                        width: 100%;
                        height: 1.333333rem;
                        position: relative;
                        a{
                            display: block;
                            width: 100%;
                            height: 100%;
                        }
                        .title{
                            font-family: PingFangSC-Regular;
                            font-size: .346667rem;
                            color: #000000;
                            letter-spacing: .0124rem; 
                            line-height: 1.333333rem;
                            width: 5.706667rem;
                            height: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            float: left;
                        }
                        .time{
                            float: right;
                            font-family: PingFangSC-Regular;
                            font-size: .32rem;
                            color: #808080;
                            line-height: 1.333333rem;
                        }
                    }
                }
                
            }
        }
        li.bdrB::after{
            height: 1px;
            content: '';
            width: 100%;
            border-bottom: 1px solid #e5e5e5;
            position: absolute;
            bottom: 0;
            right: 0;
            transform: scaleY(0.5);
            -webkit-transform: scaleY(0.5);
            z-index: 2;
        }
    }
</style>
