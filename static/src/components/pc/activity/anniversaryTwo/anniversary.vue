<template>
    <div id="anniversary">
        <div style="display: none" v-title>两周年庆典</div>
        <div class="anniverContent">
            <div class="banner"></div>
            <div ref="together" class="together">
                <div @click="playVideo" class="video">
                    
                </div>
                <div class="imgs">
                    <div class="img imgLeft">
                        <img id="left1"  class="left1" :src="activeImg[0].img1" alt="">
                        <img id="left2"  class="left2" :src="activeImg[1].img1" alt="">
                    </div>
                    <div class="img">
                        <img id="content1"  class="left1" :src="activeImg[0].img2" alt="">
                        <img id="content2"  class="left2" :src="activeImg[1].img2" alt="">
                    </div>
                    <div class="img imgLeft">
                        <img id="right1"  class="left1" :src="activeImg[0].img3" alt="">
                        <img id="right2"  class="left2" :src="activeImg[1].img3" alt="">
                    </div>
                </div>
            </div>
            <div ref="activity" class="activity">
                <div @click="toActivity" class="activityBtn"></div>
                <div class="activityTitle"></div>
            </div>
            <div ref="blessing" class="blessing">
                <input v-if="getCookie('token')" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"  name="file_head" id="file_head" @change="setImagePreview"/> 
                <div v-else @click="showTips" class="input"></div>
                <div @click="showRult2 = true" class="rult2"></div>
            </div>
            <div ref="praise" class="praise"></div>
            <div class="tipsText">已有<span> {{sumPeople}} </span>人正在瓜分10万积分</div>
            <div v-if="showTabBox" class="tabBox">
                <div class="tabLi1 tabLi">
                    <div @click="activeTab(0)" :style="{opacity:tabList[0],background:'url(' + tabImg[0].img2 + ') no-repeat'}" class="tab tab1"></div>
                    <div @click="activeTab(0)" :style="{background:'url(' + tabImg[0].img1 + ') no-repeat'}" class="tab tab2"></div>
                </div>
                <div class="tabli2 tabLi">
                    <div @click="activeTab(1)" :style="{opacity:tabList[1],background:'url(' + tabImg[1].img2 + ') no-repeat'}" class="tab tab1"></div>
                    <div @click="activeTab(1)" :style="{background:'url(' + tabImg[1].img1 + ') no-repeat'}" class="tab tab2"></div>
                </div>
                <div class="tabli3 tabLi">
                    <div @click="activeTab(2)" :style="{opacity:tabList[2],background:'url(' + tabImg[2].img2 + ') no-repeat'}" class="tab tab1"></div>
                    <div @click="activeTab(2)" :style="{background:'url(' + tabImg[2].img1 + ') no-repeat'}" class="tab tab2"></div>
                </div>
                <div class="tabli4 tabLi">
                    <div @click="activeTab(3)" :style="{opacity:tabList[3],background:'url(' + tabImg[3].img2 + ') no-repeat'}" class="tab tab1"></div>
                    <div @click="activeTab(3)" :style="{background:'url(' + tabImg[3].img1 + ') no-repeat'}" class="tab tab2"></div>
                </div>
            </div>
            
        </div>
        <div v-if="showVideo" @click.self="showVideo = false" class="videoBox videoClose">
            <div class="video">
            <div @click="showVideo = false" class="close"></div>
                <video autoplay="autoplay" x5-playsinline="" webkit-playsinline="true" webview.allowsInlineMediaPlayback = "YES" playsinline preload="preload" controls="controls" id="vid">
                    <source ref="source" src="https://aliyunsso.edspay.com/images/video/1000000545206970AAwxAnniversaryVideoAA.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div v-if="activityStatus != 1" @click.self="ActivityPrompt" class="timeBox videoBox">
            <div v-if="showTimeTips" class="content">
                <p class="p1">{{textTips}}</p>
                <div @click="showTimeTips = false" class="btn"></div>
            </div>
        </div>
        <div v-if="showSuccess" class="videoBox">
            <div class="content">
                <p class="p1">上传成功！</p>
                <div @click="showSuccess = false" class="btn"></div>
            </div>
        </div>
        <div v-if="showRult2" class="videoBox layerRult2">
            <div class="content">
                <div @click="showRult2 = false" class="btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import lrz from 'lrz';
    import getUrl from '../../../../common/router/getUrl'   // 获取登录信息验证
    export default{
        mixins:[getUrl],
    	data(){
    		return{
                boxHeight:[],//每个版块高度
                activeImg:[
                    {
                        img1:'',
                        img2:'',
                        img3:''
                    },
                    {
                        img1:'',
                        img2:'',
                        img3:''
                    }
                ],
                winSollY:0,
                imgList:[],
                showVideo:false,
                showSuccess:false,
                showTimeTips:false,
                showRult2:false,
                timer:null,
                sumPeople:0,//总人数
                activeImgNum:3,
                showTabBox:false,
                controlImg:[true,false],//图片轮换
                tabList:[1,0,0,0],
                activityStatus:1,//活动状态
                _activetyTime:{},
                timeText:'',//活动提示语

                tabImg:[
                    {
                        img1:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_1.png',
                        img2:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_liang1.png'
                    },
                    {
                        img1:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_2.png',
                        img2:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_liang2.png'
                    },
                    {
                        img1:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_3.png',
                        img2:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_liang3.png'
                    },
                    {
                        img1:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_4.png',
                        img2:'https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_liang4.png'
                    },
                ],
    		}
    	},
    	methods:{
            playVideo(){
                _czc.push(﻿["_trackEvent", "两周年主会场-PC", "视频播放按钮"]); //  友盟统计配置
                this.showVideo = true
            },
            toActivity(){
                this.$router.push({path:'/activityPC/guidance',query:{imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/twoYeay/twoYearPc.jpg'}});
            },
            _getActivityTime(activityId){
                this.notLogPost('/activity/two/getActivityTime',data => {
                    if(data.resCode){
                        this._activetyTime = data.resData;
                        this.activityStatus = data.resData.active;
                    }
                },{activityId:activityId})
            },
            ActivityPrompt(){
                if (this.activityStatus == 2) {
                    this.showTimeTips = true;
                    this.textTips = '亲，活动尚未开始哦!';
                } else if(this.activityStatus == 3){
                    this.showTimeTips = true;
                    this.textTips = '亲，活动已经结束啦!';
                } else if(this.activityStatus == 4){
                    this.showTimeTips = true;
                    this.textTips = '亲，活动已经失效啦!';
                }
            },
            palyVideo(){

            },
            activeTab(index){
                this.setTabImg(index);
                document.body.scrollTop = this.boxHeight[index]+10;
                document.documentElement.scrollTop = this.boxHeight[index]+10;
                window.pageYOffset = this.boxHeight[index]+10;
            },
            getBoxTop(refName){
                this.boxHeight.push(this.$refs[refName].offsetTop);
            },
            getPageData(){//获取数据
                this.notLogPost('/activity/two/getPicturePathList',(data) =>{
                    if(data.resCode){
                        this.sumPeople = data.resData.num;
                        this.swiperList = data.resData.list;
                        if(this.swiperList.length%3 == 0){

                        }else if(this.swiperList.length%3 == 1){
                            this.swiperList.push(this.swiperList[0])
                            this.swiperList.push(this.swiperList[1])
                        }else{
                            this.swiperList.push(this.swiperList[0])
                        }
                        if(this.swiperList.length == 3){
                            this.imgList.push({
                                img1:this.swiperList[0].path,
                                img2:this.swiperList[1].path,
                                img3:this.swiperList[2].path
                            })
                            this.imgList.push({
                                img1:this.swiperList[0].path,
                                img2:this.swiperList[1].path,
                                img3:this.swiperList[2].path
                            })
                            
                        }else{
                            for(var i=0;i<this.swiperList.length;i+=3){
                                this.imgList.push({
                                    img1:this.swiperList[i].path,
                                    img2:this.swiperList[(i+1)].path,
                                    img3:this.swiperList[(i+2)].path
                                })
                            }
                        }
                        this.$set(this.activeImg,0,this.imgList[0]);
                        this.$set(this.activeImg,1,this.imgList[1]);
                    }
                },{})
            },
            setImagePreview(e){
                _czc.push(﻿["_trackEvent", "两周年主会场-PC", "上传祝福按钮"]); //  友盟统计配置
                var files = e.target.files || e.dataTransfer.files;
                lrz(files[0], { width: 480 }).then((rst) => {
                    global.http.post(this, "/activity/two/savePicturePath", {
                        file: rst.base64,
                        type:0
                    }, data => {
                        if(data.body.resCode){
                            this.showSuccess = true;
                        }
                    })
                }).always(function() {
                    // 清空文件上传控件的值
                    e.target.value = null;
                });
            },
            showTips(){
                this.inspectCookin(1);   //  登录框调用
            },
            setImgShow(){//图片轮播
                this.timer =  setInterval(() =>{
                    if(this.controlImg[0]){
                        $('#left1').animate({opacity:0}, 800);
                        $('#content1').animate({opacity:0}, 800);
                        $('#right1').animate({opacity:0}, 800,() =>{
                            this.$set(this.controlImg,0,false);
                            this.$set(this.controlImg,1,true);
                            if(this.activeImgNum < this.imgList.length){
                                this.$set(this.activeImg,0,this.imgList[this.activeImgNum]);
                                this.activeImgNum++;
                            }else{
                                this.$set(this.activeImg,0,this.imgList[0]);
                                this.activeImgNum = 1;
                            }
                        });
                    }else{
                        $('#left1').animate({opacity:1}, 800);
                        $('#content1').animate({opacity:1}, 800);
                        $('#right1').animate({opacity:1}, 800,() =>{
                            this.$set(this.controlImg,0,true);
                            this.$set(this.controlImg,1,false);

                            if(this.activeImgNum < this.imgList.length){
                                this.$set(this.activeImg,1,this.imgList[this.activeImgNum]);
                                this.activeImgNum++;
                            }else{
                                this.$set(this.activeImg,1,this.imgList[0]);
                                this.activeImgNum = 1;
                            }
                        });
                    }
                },5000)
            },
            setTabImg(index){//修改头部icon图片
                for(var i=0;i<4;i++){
                    this.$set(this.tabList,i,0);
                }
                this.$set(this.tabList,index,1);
            },
            handleScroll () {//监听屏幕滚动
                this.setIconImg();
            },
            setIconImg(){
                if(navigator.userAgent.indexOf("Chrome") > -1){
                    this.winSollY = window.scrollY;
                }else{
                    this.winSollY = document.documentElement.scrollTop;
                }
                if(this.winSollY<600){
                    this.showTabBox = false;
                }else{
                    this.showTabBox = true;
                }
                if(this.winSollY >this.boxHeight[0] && this.winSollY <this.boxHeight[1]){
                    this.setTabImg(0);
                }else if(this.winSollY > this.boxHeight[1] && this.winSollY < this.boxHeight[2]){
                    this.setTabImg(1);
                }else if(this.winSollY > this.boxHeight[2] && this.winSollY < this.boxHeight[3]){
                    this.setTabImg(2);
                }else if(this.winSollY > this.boxHeight[3]){
                    this.setTabImg(3);
                }
            }
    	},
    	created(){
    		this.getPageData();
            this._getActivityTime('con_two_activity');
    	},
        mounted(){
            this.getBoxTop('together');
            this.getBoxTop('activity');
            this.getBoxTop('blessing');
            this.getBoxTop('praise');

            this.setImgShow();
            document.getElementsByClassName("onlineService")[0].style.display = "none";

            this.setIconImg();
            window.addEventListener('scroll', this.handleScroll);

            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=' + 1274032981 + '&web_id=' + 1274032981
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        destroyed(){
            document.getElementsByClassName("onlineService")[0].style.display = "block";
        }
    }
</script>

<style lang="scss" scoped>
    #anniversary{
        width:100%;
        height:4286px;
        margin:0 auto;
        position: relative;
        overflow: hidden;
        .timeBox{
            background:rgba(0,0,0,0)!important;
            // padding-top: 100px;
            .content{

            }
        }
        .videoClose{
            // position: relative;
            .close{
                position: absolute;
                right:-50px;
                top:0px;
                height:30px;
                width:30px;
                background:url('https://aliyunsso.edspay.com/web/activity/anniversary/closeIcon_pc.png') no-repeat;
                background-size:100% 100%;
            }
        }
        .videoBox{
            position: fixed;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            background: rgba(0,0,0,.7);
            z-index: 9999;
            .video{
                height:473px;
                width:842px;
                position: absolute;
                top: 130px;
                bottom: 50px;
                left: 50%;
                transform: translateX(-50%);
                text-align: center;
            }
            video{
                width:100%;
                height:100%;
            }
            .content{
                height:550px;
                width:348px;
                margin:0 auto;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/success.png') bottom no-repeat;
                background-size:100% 210px;
                text-align:center;
                color:#666;
                position: relative;
                .p1{
                    font-size:18px;
                    line-height:46px;
                    padding-top: 390px;

                }
                .btn{
                    position: absolute;
                    height:80px;
                    width:206px;
                    margin:0 auto;
                    left:88px;
                    bottom:20px;
                }
            }
        }
        .layerRult2{
            background:rgba(0,0,0,.5);
            padding-top: 140px;
            .content{
                height:348px;
                width:330px;
                background:url('https://aliyunsso.edspay.com/web/activity/anniversary/guize_pc.png') no-repeat;
                background-size:100% 100%;
                padding-top:268px;
                .btn{
                    height:100px;
                    width:100px;
                    margin:0 auto;
                    position: relative;
                    left:0;
                    bottom:0;
                }
            }
        }
        .anniverContent{
            background:url('https://aliyunsso.edspay.com/web/activity/anniversary/anniverBg.png') no-repeat;
            background-size:100% 100%;
            width:1920px;
            height:100%;
            margin-left: -960px;
            left:50%;
            position: absolute;
        }
        .tabBox{
            position: fixed;
            z-index:999;
            top:136px;
            right: 0;
            width:106px;
            height:475px;
            background:url('https://aliyunsso.edspay.com/web/activity/anniversary/iconbg.png') right no-repeat;
            background-size:82px 100%;
            padding-top: 46px;
            .tabLi{
                height:74px;
                width:74px;
                margin-bottom: 30px;
                margin-right: 40px;
                position: relative;
            }
            .tab{
                height:74px;
                width:74px;
                background:url('https://aliyunsso.edspay.com/web/activity/anniversary/pcicon_1.png') no-repeat;
                background-size: 100% 100%!important;
                position: absolute;
                top:0;
                left:0;
                cursor: pointer;
            }
            .tab1{
                z-index:100;
            }
            .tab2{
                z-index:60;
            }
        }
        .banner{
            height:996px;
            // background:#123456;
        }
        .together{
            height:838px;
            padding-top: 38px;
            .video{
                height:348px;
                width:842px;
                margin:0 auto;
            }
            .imgs{
                padding-top:89px;
                margin:0 auto;
                height:436px;
                width:880px;
                .img{
                    height:346px;
                    width:260px;
                    float: left;
                    position: relative;
                    img{
                        height:100%;
                        width:100%;
                        position: absolute;
                    }
                    .left1{z-index:100;}
                    .left2{z-index:60;}
                }
                .img:nth-child(2){
                    margin:0 50px;
                }
            }
        }
        .activity{
            height:694px;
            width:1200px;
            margin:0 auto;
            padding:220px 0 0 750px;
            .activityBtn{
                height:180px;
                width:186px;
                background:url('https://aliyunsso.edspay.com/web/activity/anniversary/activityBtn_pc.png') no-repeat;
                background-size:100% 100%;
                cursor: pointer;
            }
            .activityTitle{
                height:84px;
                width:458px;
                background:url('https://aliyunsso.edspay.com/web/wx/activity/anniversary/juxian.png') no-repeat;
                background-size:100% 100%;
                margin:184px 0 0 -384px;
            }
        }
        .blessing{
            height:703px;
            padding-top: 280px;
            width:1000px;
            margin:0 auto;
            input{
                height:70px;
                width:232px;
                margin-left: 120px;
                opacity:0;
            }
            .input{
                height:70px;
                width:232px;
                margin-left: 120px;
            }
            .rult2{
                height:100px;
                width: 100px;
                margin:58px 0 0 900px;
            }
        }
        .praise{
            height:510px;
        }
        .tipsText{
            font-size:30px;
            padding-top: 242px;
            line-height:32px;
            color:#666;
            text-align:center;
            span{
                font-family: DIN-Medium;
            }
        }
    }
</style>