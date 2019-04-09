<template>
    <div id="dationalDay">
        <div v-title>资产要分散 才有安全感</div>
    	<div class="about clear">
            <span class="fl" v-html="$options.filters.changeBillion(about.userRegister)"></span>
            <span class="fl" v-html="$options.filters.changeBillion(about.tradeAmount)"></span>
        </div>
    	<div class="top">
            <div @click="playVideo" class="video"></div>
        </div>
        <div class="uploadingImg">
            <swiper :options="swiperOption">
                <swiper-slide v-for="item in imgList">
                    <img :src="item" alt="">
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div @click="judgeTimeLogin" class="uploading">
                <input v-if="hasLogin && activityStatus == 1" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"  name="file_head" id="file_head" @change="setImageBlessing"/>
            </div>
            <div @click="showRult = true" class="rult">参与规则</div>
            <div  class="example"></div>
        </div>
        
        <div class="earnings">
            <div @click="appRouter('/wxInvitationIndex')" class="invest li"></div>
            <div @click="appRouter('/nationalDay')" class="invite li"></div>
        </div>
        <div class="run clear">
            <div @click="appRouter('/picTpl',{picUrl:'https://aliyunsso.edspay.com/web/tpl/understand.jpg',title:'了解我们'})" class="fl"></div>
            <div @click="appRouter('/filing')" class="fl" v-if="osType"></div>
            <a class="fl" href="https://www.edspay.com/#/filing" v-else></a>
        </div>
        <!-- 底部分享按钮 -->
        <div @click="toShare" class="botBtn">
            <div class="btn">立即分享</div>
        </div>
        <!-- 规则弹框 -->
        <div v-if="showRult" v-layer class="rultBox">
            <div class="content">
                <div @click="showRult = false" class="close"></div>
                <a class="phone" href="tel:400-135-3388"></a>
                <p>{{osType == 'IOS' ?'本活动与苹果公司无关':''}}</p>
            </div>
        </div>
        <!-- 视频播放 -->
        <video-page :showVideo="showVideo" :videoUrl="'https://aliyunsso.edspay.com/images/video/1000000273890684AApublicityVideoAA.mp4'" :videoCover="'https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/videoImg.png'"></video-page>
        <!-- wx显示分享蒙层 -->
        <div v-if="showShare" v-layer @click="showShare = false" class="showShare">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/toShare.png" alt="" class="arrows">
        </div>
    </div>
</template>

<script>
    import lrz from 'lrz';
    import wxToast from '../../../../common/wx/wxToast';   //引入toast提示
	import wxShare from '../../../../common/wx/wxShare'; // APP交互函数
    import videoPage from '../publicModule/videoPage'; // 播放视频组件
	import getActivityData from '../publicJS/getActivityData'; // 播放视频组件
    export default{
    	mixins:[wxShare,getActivityData,wxToast],
    	data(){
    		return{
    			about:{
                    userRegister:0,
                    tradeAmount:0

                },
    			showVideo:{
    				showVideo: false
    			},
                imgList:[
                    'https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/ndPublicity2.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/ndPublicity1.png',
                ],
                swiperOption: {
                  pagination : '.swiper-pagination',
                  loop: true,
                  autoplay:3000,
                },
                showShare:false,//分享蒙层
                showRult: false,//显示规则
                shareObj: { //分享标题内容配置
                    title: "Ta给不了你的安全感，我来！", //标题
                    desc: "放心吧，有我在", //内容
                    link: global.host + "activity/nationalDayPublicity", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/share.png" //图片链接
                },
    		}
    	},
    	components:{
    		videoPage
    	},
    	methods:{
    		getNumData(){
    			this.getNotlogData('/index/statistics',(data)=>{
    				if(data.resCode){
    					this.about = data.resData.data;
    				}
    			},{})
    		},
    		playVideo(){
    			this.showVideo.showVideo = true;

    		},
            toShare(){
                if(this.judgeTimeLogin()){
                    return;
                }
                if(this.osType){
                    this.PassValue(this.appShare);
                }else{
                    this.showShare = true;
                }
            },
    		setImageBlessing(e){ //上传合照
                window._czc.push(﻿["_trackEvent", "2018国庆宣传", "上传照片"]); //  友盟统计配置
	            var files = e.target.files || e.dataTransfer.files;
				lrz(files[0], { width: 480 }).then((rst) => {
				    this.getAppData('/activity/two/saveUserPicturePath',(data) =>{
				      if(data.resCode){
                        this.toast({text:'上传成功'});
                      }else{
                        this.toast({text:data.resMsg});
                      }
				    },{file:rst.base64})
				}).always(function() {
				    // 清空文件上传控件的值
				    e.target.value = null;
				});
    		},
    	},
    	created(){
    		this.getNumData();
            this._getActivityTime('con_ba_activity');
    	},
        mounted(){
            this.PassValue('NavWhite_资产要分散 才有安全感');
            this.getWxShareData(this.shareObj);
            setTimeout(()=>{
                document.body.scrollTop = '1px';
                document.documentElement.scrollTop = '1px';
                window.pageYOffset = '1px';
            },100)

            // 友盟数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274945957&web_id=1274945957'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        }
    }
</script>

<style lang="scss">
    body,html{
        height:100%;
    }
    .uploadingImg{
        .swiper-container{
            .swiper-pagination-bullet-active{
                background: #fff!important;
            }
            .swiper-pagination-bullet{
                background:rgba(255,255,255,0.99);
            }
        }
    }
</style>

<style lang="scss" scoped>
    #dationalDay{
        background:url('https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/publicityBG.png');
        background-size: 100%;
        height:40.32rem;
        .showShare{

            img{
                display:block;
                width:6.88rem;
                margin: 0 auto;
            }
        }
        .rultBox{
            padding-top: 1.333333rem;
            .content{
                height:12.84rem;
                width:8.56rem;
                margin-left:0.45rem;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/rult.png') no-repeat;
                background-size: 100% 100%;
                position: relative;
                .close{
                    height:1.333333rem;
                    width:1.333333rem;
                    position: absolute;
                    top:0;
                    right:0;
                }
                .phone{
                    width:2.4rem;
                    height:0.8rem;
                    position: absolute;
                    bottom:1.413333rem;
                    right:1.24rem;
                }
                p{
                    line-height:0.293333rem;
                    font-size:0.293333rem;
                    position: absolute;
                    bottom: 1.226667rem;
                    left:0.96rem;
                    color:#808080;
                }
            }
        }
        .about{
            padding: 4.4rem 0.4rem 0;
            span{
                width:50%;
                color: #FE6060;
                padding: 1.12rem 0 0 1.226667rem;
                font-size:0.32rem;
                line-height:0.453333rem;
                height:2.453333rem;
                font-family: PingFangSC-Semibold;
            }
        }
		.top{
            padding-top:0.64rem;
		    .video{
		        height:4.933333rem;
		        width:8.746667rem;
		        margin: 0 auto;
		    }
		}
        .uploading{
            height:0.853333rem;
            width:2.133333rem;
            position: relative;
            margin: 0.533333rem auto 0;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/uploading.png') no-repeat;
            background-size: 100% 100%;
            input{
                height:100%;
                width:100%;
                top:0;
                left:0;
                position: absolute;
                opacity: 0;
            }
        }
        .uploadingImg{
            padding-top:5.253333rem;
            height:14.773333rem;
            position: relative;
            .example{
                height:0.48rem;
                width:1.333333rem;
                top:5.6rem;
                left:1.026667rem;
                position: absolute;
                z-index: 99;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/ndPublicity/exampleImg.png') no-repeat;
                background-size: 100% 100%;
            }
            .rult{
                height:0.666667rem;
                width:1.706667rem;
                background: #FE5C5C;
                border-radius: 0.333333rem;
                font-size: 0.32rem;
                line-height:0.666667rem;
                position: absolute;
                top: 9rem;
                right:0.906667rem;
                z-index:99;
                text-align:center;
                color:#fff;
            }
            .swiper-container{
                height:4.933333rem;
                width:8.746667rem;
                margin: 0 auto;
                img{
                    height:100%;
                    width: 100%;
                }
            }
        }
        .earnings{
            .li{
                width:8.666667rem;
                height:2.666667rem;
                margin-bottom: 0.266667rem;
            }
        }
        .run{
            padding:1.733333rem 0 0 0.4rem;
            .fl{
                height:2.133333rem;
                width:4.466667rem;
                margin-right: 0.306667rem;
            }
            a{
                display: block;
            }
        }
        .botBtn{
            position: fixed;
            bottom: 0;
            left:0;
            height:1.6rem;
            width: 100%;
            box-shadow: 0 0 0.16rem 0 rgba(0,0,0,0.12);
            background: #fff;
            z-index: 777;
            padding-top: 0.266667rem;
            .btn{
                height:1.066667rem;
                width:5.333333rem;
                background-image: linear-gradient(-45deg, #FF5E4C 0%, #FF4640 100%);
                border-radius: 0.533333rem;
                margin: 0 auto;
                line-height:1.066667rem;
                text-align:center;
                color:#fff;
            }
        }
    }
</style>