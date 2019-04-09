<template>
   <div id="riskKnowledge">
       <div v-title>E友课堂</div>
       <!-- 风险教育E友课堂 -->
        <mt-loadmore class="mtContent" :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore">
            <ul class="logChild" v-if="p2pKnowledge.length">
                <li class="video" v-for="(item,index) in p2pKnowledge">
                    <video  ref="myVideo" @click="pause(index)" :src="item.appVideo" @pause="onPlay(index)" :poster="item.picPath">
                    Your browser does not support the video tag.
                    </video>
                    <div ref="Vplay" class="play" @click="play(index)"></div>
                    <div ref="videoTitle" class="video_title">{{item.title}}</div>
                    <div ref="videoTime" class="video_time">{{item.startTime ? item.startTime:'0' | divisionTime}}发布</div>
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
                p2pKnowledge: [],
                allLoaded: false,
                pageNo: 1,
            }
        },
        methods: {
            play(i){
                this.$refs.myVideo.map((item, index) => {
                    if(index == i){
                        item.play()
                        this.$refs.Vplay[i].style.display ="none"; 
                        this.$refs.videoTitle[i].classList.add("playFont"); 
                        this.$refs.videoTime[i].classList.add("playFont"); 
                    }else{
                        item.pause()
                        this.$refs.Vplay[index].style.display ="block"; 
                        this.$refs.videoTitle[index].classList.remove("playFont");
                        this.$refs.videoTime[index].classList.remove("playFont");
                    }
                })
                
            },
            pause(i){
                this.$refs.myVideo[i].pause()
                this.$refs.Vplay[i].style.display ="block"; 
                this.$refs.videoTitle[i].classList.remove("playFont");
                this.$refs.videoTime[i].classList.remove("playFont");
            },
            onPlay(i){
                this.$refs.Vplay[i].style.display ="block"; 
                this.$refs.videoTitle[i].classList.remove("playFont");
                this.$refs.videoTime[i].classList.remove("playFont");
            },
            gitData(n){
                this.notLogPost('/index/getArticlePager',(data) =>{
					if(data.resCode){
                        if(n == 1){
                           this.p2pKnowledge = data.resData.data.list
                        }else{
                            this.p2pKnowledge = this.p2pKnowledge.concat(data.resData.data.list)
                        }
                        n == data.resData.data.pages ? this.allLoaded = true :  this.allLoaded = false
					}
				},(this.osType ? {oauthToken:this.token, nid: 'p2pKnowledge', pageNum: n, pageSize: 10}:{nid: 'p2pKnowledge', pageNum: n, pageSize: 10}),1)    
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
            // videoScroll(){
            //     let scroll = document.documentElement.scrollTop || document.body.scrollTop;
            //     let CH = document.documentElement.clientHeight+"px";
            //     this.$refs.myVideo.map((item, index) => {
            //         let VCH = item.scrollTop;
            //         let videoH = item.offsetHeight;
            //         if(scroll > VCH + videoH){
            //             this.$refs.myVideo[index].pause()
            //             this.$refs.Vplay[index].style.display ="block"; 
            //             this.$refs.videoTitle[index].classList.remove("playFont");
            //             this.$refs.videoTime[index].classList.remove("playFont");
            //         }
            //     })
            // }
        },
        created: function() {
            this.gitData(1)
            this.PassValue('NavWhite_E友课堂');
        },
        mounted: function() {
            // window.addEventListener('scroll', this.videoScroll)
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #riskKnowledge{
        width: 100%;
        height: auto;
        background: #fff;
        ul{
            width: 100%;
            height: auto;
            .video{
                width: 100%;
                height: 5.64rem;
                position: relative;
                margin-bottom: .666667rem;
                video{
                    width: 100%;
                    height: 100%;
                }
                .video_title{
                    width: 9.2rem;
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
