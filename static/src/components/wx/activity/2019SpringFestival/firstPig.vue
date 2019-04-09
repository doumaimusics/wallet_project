<template>
    <div id="pig">
        <!-- 碎片展示小图 -->
        <div class="debris_box">
            <!-- 未登录 -->
           <div class="debris_quan" v-if="isLogin == 0" @click="goLogin"></div>
           <!-- 已登录 -->
           <div v-else>
                <ul v-if="pigNums == 1">
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg1+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal < 2"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg5+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal >= 2"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg2+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal < 4"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg6+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal >= 4"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg3+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal < 6"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg7+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal >= 6"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg4+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal < 9"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg8+')',backgroundSize:'cover'}" v-if="pig1.pieceTotal == 9"></div>
                    </li>
                </ul> 
                <ul v-else-if="pigNums == 2">
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg1+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal < 2"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg5+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal >= 2"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg2+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal < 4"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg6+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal >= 4"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg3+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal < 6"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg7+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal >= 6"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg4+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal < 9"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg8+')',backgroundSize:'cover'}" v-if="pig2.pieceTotal == 9"></div>
                    </li>
                </ul>
                <ul v-else-if="pigNums == 3">
                   <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg1+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal < 2"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg5+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal >= 2"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg2+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal < 4"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg6+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal >= 4"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg3+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal < 6"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg7+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal >= 6"></div>
                    </li>
                    <li>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg4+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal < 9"></div>
                        <div :style="{background:'url('+DebrisListObj.debrisListBg8+')',backgroundSize:'cover'}" v-if="pig3.pieceTotal == 9"></div>
                    </li>
                </ul>
           </div>
           
        </div>

        <!-- 小猪icon -->
        <div class="pig_icon_box">
            <!-- 未登录 -->
            <div class="pig_icon_quan" v-if="isLogin == 0" @click="goLogin"></div>
            <!-- 已登录 -->
            <ul v-else>
               <li>
                   <div :style="{background:'url('+PigIconObj.pig1.img_l+')',backgroundSize:'cover'}" v-if="currentPig >= 1" @click="tabEvent(1)"></div>
               </li>
                <li>
                   <div :style="{background:'url('+PigIconObj.pig2.img_l+')',backgroundSize:'cover'}" v-if="currentPig >= 2" @click="tabEvent(2)"></div>
                   <div :style="{background:'url('+PigIconObj.pig2.img_a+')',backgroundSize:'cover'}" v-if="currentPig <= 1"></div>
               </li>
                <li>
                   <div :style="{background:'url('+PigIconObj.pig3.img_l+')',backgroundSize:'cover'}" v-if="currentPig == 3" @click="tabEvent(3)"></div>
                   <div :style="{background:'url('+PigIconObj.pig3.img_a+')',backgroundSize:'cover'}" v-if="currentPig <= 2"></div>
               </li>
            </ul>
        </div>

        <!-- 拼图部分 -->
        <div class="jigsaw_box">
            <!-- 未登录 -->
            <div class="jigsaw_quan" v-if="isLogin == 0" @click="goLogin"></div>
            <!-- 已登录 -->
            <div class="jigsaw_pig1" v-else>
                <ul v-if="pigNums == 1" :style="{background:'url('+(pig1.lockBtn ? JigsawQuan.jigsaw1 : JigsawQuan.jigsaw2)+')'}" class="ul1">
                    <li v-for="(item,index) in pig1.pieces" :key="index" @click="listEvent(index)">
                        <div :style="{background:'url('+PigJigsaw1.pigPian1+(index+1)+'.png?v=1.0)',backgroundSize:'cover'}" v-if="item == 1"></div>
                        <div :style="{background:'url('+PigJigsaw1.pigPian2+(index+1)+'.png?v=1.0)',backgroundSize:'cover'}" v-else-if="item ==4 "></div>
                    </li>
                </ul>
                <ul class="ul2" v-if="pigNums == 2" :style="{background:'url('+(pig2.lockBtn ? JigsawQuan.jigsaw1 : JigsawQuan.jigsaw2)+')'}">
                    <li v-for="(item,index) in pig2.pieces" :key="index"  @click="listEvent(index)">
                        <div :style="{background:'url('+PigJigsaw2.pigPian1+(index+1)+'.png?v=1.1)',backgroundSize:'cover'}" v-if="item == 1"></div>
                        <div :style="{background:'url('+PigJigsaw2.pigPian2+(index+1)+'.png?v=1.1)',backgroundSize:'cover'}" v-else-if="item ==4 "></div>
                    </li>
                </ul>
                <ul class="ul3" v-if="pigNums == 3" :style="{background:'url('+(pig3.lockBtn ? JigsawQuan.jigsaw1 : JigsawQuan.jigsaw2)+')'}">
                    <li v-for="(item,index) in pig3.pieces" :key="index"  @click="listEvent(index)">
                        <div :style="{background:'url('+PigJigsaw3.pigPian1+(index+1)+'.png?v=1.1)',backgroundSize:'cover'}" v-if="item == 1"></div>
                        <div :style="{background:'url('+PigJigsaw3.pigPian2+(index+1)+'.png?v=1.1)',backgroundSize:'cover'}" v-else-if="item ==4 "></div>
                    </li>
                </ul>
            </div>
        </div>

         <!-- 碎片提示弹框 -->
        <div class="debris_popUp"  v-if="popUp == 1" @click="popUp = 0" :style="{background:'url('+img_popUp+imgPopIndex+'.png?v=1.0)'}"></div>
        <div v-layer v-if="popUp != 0" @click="popUp = 0"></div>

        <!-- 每只猪解锁完九张时的弹框 -->
        <!--  -->
        <div class="complete_popUp" v-if="popUp == 2" @click="popUp = 0">
            <div class="popUpBg"></div>
            <div class="img_box">
                <img src="https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pigPopUp1.png?v=1.1" v-if=" resMsg == '9'"  alt="">
                <img src="https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pigPopUp2.png?v=1.1" alt="" v-if=" resMsg == '18'">
                <img src="https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pigPopUp3.png?v=1.1" alt="" v-if=" resMsg == '27'"> 
            </div>
            <p v-if=" resMsg == '9'">您已成功解锁1只金猪</p>
            <p v-if=" resMsg == '18'">您已成功解锁2只金猪</p>
            <p v-if=" resMsg == '27'">您已成功解锁3只金猪</p>
        </div>
    </div>
</template>

<script>
import { MessageBox } from 'mint-ui';
import wxToapp from '../../../../common/wx/wxToapp';   // 与app交互
export default {
    mixins:[wxToapp],
    data(){
        return {
            popUp:0,
            pop:0,
            DebrisListObj:{     // 碎片统计图片
                debrisListBg1:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_black1.png',  // 碎片暗背景
                debrisListBg2:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_black2.png',  // 碎片暗背景
                debrisListBg3:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_black3.png',  // 碎片暗背景
                debrisListBg4:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_black4.png',  // 碎片暗背景
                debrisListBg5:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_bright1.png',  // 碎片亮起背景
                debrisListBg6:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_bright2.png',  // 碎片亮起背景
                debrisListBg7:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_bright3.png',  // 碎片亮起背景
                debrisListBg8:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_bright4.png',  // 碎片亮起背景
            },

            PigIconObj:{   // 猪小icon图片
                pig1:{
                    img_l:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig_l_icon1.png",
                    img_a:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig_s_icon1.png",
                },
                pig2:{
                    img_l:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig_l_icon2.png",
                    img_a:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig_s_icon2.png",
                },
                pig3:{
                    img_l:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig_l_icon3.png",
                    img_a:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig_s_icon3.png",
                },
            },

            JigsawQuan:{    // 钱包log背景
               jigsaw1:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/jigsaw_a_quan.gif?v=1.2',
               jigsaw2:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/jigsaw_a_quan.png?v=1.1'
            },

            PigJigsaw1:{    // 第一只猪拼图图片
                pigPian1:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig1/pig1_l_pian',  // 第一只猪碎片亮起背景
                pigPian2:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig1/pig1_a_pian',  // 第一只猪碎片暗背景
            },
            PigJigsaw2:{    // 第二只猪拼图图片
                pigPian1:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig2/pig2_l_pian',  // 第一只猪碎片亮起背景
                pigPian2:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig2/pig2_a_pian',  // 第一只猪碎片暗背景
            },
            PigJigsaw3:{    // 第三只猪拼图图片
                pigPian1:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig3/pig3_l_pian',  // 第一只猪碎片亮起背景
                pigPian2:'https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig3/pig3_a_pian',  // 第一只猪碎片暗背景
            },
            img_popUp:"https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pop/debris_pop",
            imgPopIndex:0,    // 每个碎片提示框下标
            resMsg:'',     // 每只猪当兑换最后一个碎片后的提示参数
            pigNums:null,
            looks:true
        }
    },
    props:[ 'isLogin','goLogin', 'currentPig', 'pig1','pig2','pig3','activityTime'],   // isLogin：是否登录   toLogin：点击去登录  pig1:猪1，  pig2:猪2， pig3:猪3
    methods: {
        listEvent(index){    // 点击拼图
            let that = this;
            if(!that.looks){
            return;
            }
            that.looks = false;
            that.getAppData('/newPigYear/unLockPiece', (data) => {
                if(data.resCode){
                    that.imgPopIndex = index+1;
                    that.popUp = 1;
                    that.$emit('initData',false);
                    that.resMsg = data.resData.order; 
                    if( that.resMsg == '9' || that.resMsg == '18' || that.resMsg == '27'){
                        that.popUp = 2;
                    }
                    that.pigNums = data.resData.currentPig;
                    that.looks = true;
                } else {
                    that.looks = true;
                }
            },{pieceN:index,pigNum:that.pigNums})
        },
        tabEvent(n){
            if(n == 1){
                this.pigNums = 1;
            } else if(n == 2){
                this.pigNums = 2;
            } else {
                this.pigNums = 3;
            }
        }
    },
    mounted() {
        this.pigNums = this.currentPig;
    },
    created() {
        
    },
}
</script>

<style lang="scss" scoped>
@-webkit-keyframes circle{
    0%{ 
        -webkit-transform: rotate(0deg);
        -moz-transform:rotate(0deg);
        -o-transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
     }
    100%{ 
        -webkit-transform: rotate(-360deg);
        -moz-transform:rotate(-360deg);
        -o-transform:rotate(-360deg);
        -ms-transform:rotate(-360deg);
        transform:rotate(-360deg);
     }
}
@-moz-keyframes circle{
    0%{ 
        -webkit-transform: rotate(0deg);
        -moz-transform:rotate(0deg);
        -o-transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
     }
    100%{ 
        -webkit-transform: rotate(-360deg);
        -moz-transform:rotate(-360deg);
        -o-transform:rotate(-360deg);
        -ms-transform:rotate(-360deg);
        transform:rotate(-360deg);
     }
}
@-o-keyframes circle{
    0%{ 
       -webkit-transform: rotate(0deg);
        -moz-transform:rotate(0deg);
        -o-transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
     }
    100%{ 
        -webkit-transform: rotate(-360deg);
        -moz-transform:rotate(-360deg);
        -o-transform:rotate(-360deg);
        -ms-transform:rotate(-360deg);
        transform:rotate(-360deg);
     }
}
@-ms-keyframes circle{
    0%{ 
        -webkit-transform: rotate(0deg);
        -moz-transform:rotate(0deg);
        -o-transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
     }
    100%{ 
        -webkit-transform: rotate(-360deg);
        -moz-transform:rotate(-360deg);
        -o-transform:rotate(-360deg);
        -ms-transform:rotate(-360deg);
        transform:rotate(-360deg);
     }
}
@keyframes circle{
    0%{ 
        -webkit-transform: rotate(0deg);
        -moz-transform:rotate(0deg);
        -o-transform:rotate(0deg);
        -ms-transform:rotate(0deg);
        transform:rotate(0deg);
     }
    100%{ 
        -webkit-transform: rotate(-360deg);
        -moz-transform:rotate(-360deg);
        -o-transform:rotate(-360deg);
        -ms-transform:rotate(-360deg);
        transform:rotate(-360deg);
     }
}
    #pig{
        position: relative;
        overflow: hidden;
        width: 100%;
        .debris_box{
            height: 1.92rem;
            position: relative;
            margin-bottom: .613333rem;
            padding-left: .866667rem;
            .debris_quan{
                width: 8.08rem;
                height: 100%;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_quan.png?v=1.0) no-repeat;
                background-size: cover;
            }
            ul{
                height: 100%;
                li{
                    width: 1.92rem;
                    height: 1.92rem;
                    float: left;
                    margin-right: .133333rem;
                    div{
                        width: 100%;
                        height: 100%;
                        background-size: 100% 100%!important;
                    }
                }
            }
        }
        .pig_icon_box{
            position: relative;
            width: 4.2rem;
            height: 1.12rem;
            margin-left: .933333rem;
            margin-bottom: 1.688888rem;
            .pig_icon_quan{
                width: 3.813333rem;
                height: 100%;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/pig_icon_quan.png?v=1.0) no-repeat;
                background-size: cover;
            }
            ul{
                height: 100%;
                li{
                    width: 1.12rem;
                    height: 1.12rem;
                    float: left;
                    margin-right: .266667rem;
                    div{
                        width: 100%;
                        height: 100%;
                        background-size: 100% 100%!important;
                    } 
                }
            }
        }

        // 拼图部分
        .jigsaw_box{
            width: 6.64rem;
            height: 6.64rem;
            margin: 0 0 0 1.546667rem;
            .jigsaw_quan{
                width: 100%;
                height: 100%;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/jigsaw_a_quan.gif?v=1.2) no-repeat;
                background-size: 100% 100%;
            }
            .jigsaw_pig1{
                width: 100%;
                height: 100%;
                ul{
                    width: 100%;
                    height: 100%;
                    background-size: 100% 100%!important;
                    li{
                        width: 2.213333rem;
                        height: 2.213333rem;
                        float: left;
                        div{
                            width: 100%;
                            height: 100%;
                            background-size: 100% 100%!important;
                        }
                    }
                }
            }
        }
        .debris_popUp,.complete_popUp{
            position: fixed;
           top: 0;left: 0;
           right: 0;bottom: 0;
           margin: auto;
           z-index: 999;
        }
        .debris_popUp{
            
           width: 10rem;
           height: 10rem;
           background-size: 100% 100%!important;
       }
       .complete_popUp{
           width: 10rem;
               height: 10rem;
           overflow: hidden;
           .popUpBg{
               width: 10rem;
               height: 10rem;
               background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/pig/light.png?v=1.0);
               background-size: cover;
               -webkit-animation:circle 2s infinite linear;/*匀速 循环*/
               -moz-animation:circle 2s infinite linear;/*匀速 循环*/
               -o-animation:circle 2s infinite linear;/*匀速 循环*/
               -ms-animation:circle 2s infinite linear;/*匀速 循环*/
               animation:circle 2s infinite linear;/*匀速 循环*/
               position: absolute;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               margin: auto;
           }
           .img_box{
               width: 6.64rem;
               height: 6.64rem;
               position: absolute;
               top: 0;
               left: 0;
               right: 0;
               bottom: 0;
               margin: auto;
               img{
                   width: 100%;
                   height: 100%;
               }
           }
           p{
               font-family: PingFangSC-Regular;
                font-size: .4rem;
                color: #F8BD57;
                text-align: center;
                position: absolute;
                left: 0;
                right: 0;
                bottom: .866667rem;
                margin: auto;
           }
       }
    } 
</style>
