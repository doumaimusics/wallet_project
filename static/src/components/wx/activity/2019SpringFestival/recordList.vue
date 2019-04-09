<template>
<!--  -->
    <div class="list">
        <div v-title>碎片记录</div>
        <div class="title_box bdr-b">
            <div class="left" @click="tabEvent('oneTab',0)" :class="{colorActive:tabShow.oneTab}">邀请解锁</div>
            <div class="right" @click="tabEvent('twoTab',1)" :class="{colorActive:tabShow.twoTab}">出借解锁</div>
        </div>
        <div class="content" v-if="isShow == 0" :style="{height: fullHeight.height}">
             <div class="cont_title1 bdr-b">
                 <span>好友</span>
                 <span>注册时间</span>
                 <span>累计年化金额</span>
                 <span>奖励碎片</span>
             </div>
              <ul class="ul1" v-if="listDataObj.listData1.length != 0">
                    <li class="bdr-b" v-for="(item,index) in listDataObj.listData1" :key="index">
                        <span>{{item.mobilePhone}}</span>
                        <span>{{item.addTime}}</span>
                        <span>{{Math.floor(item.anual * 100) / 100}}</span>
                        <span class="icon" v-if="item.status == 1"></span>
                         <span v-else>{{item.status}}</span>
                    </li>
                </ul>
             <div class="null" v-else >
                  <p>暂无记录</p>
             </div>
        </div>
        <div class="content" v-else :style="{height: fullHeight.height}">
             <div class="cont_title2 bdr-b">
                 <span>出借时间</span>
                 <span>每单笔年化金额</span>
                 <span>奖励碎片</span>
             </div>
             <ul class="ul2" v-if="listDataObj.listData2.length != 0">
                 <li class="bdr-b" v-for="(item,index) in listDataObj.listData2" :key="index">
                     <span>{{item.addTime}}</span>
                     <span>{{Math.floor(item.anual * 100) / 100}}</span>
                     <span class="icon"></span>
                 </li>
             </ul>
             <div class="null" v-else >
                 <p>暂无记录</p>
             </div>
        </div>
    </div>
</template>

<script>
import wxToapp from '../../../../common/wx/wxToapp';   // 与app交互
export default {
    mixins: [wxToapp],
    data(){
        return{
            isShow:0,
            tabShow:{    // tab
                oneTab:true,
                twoTab:false
            },
            listDataObj:{
               listData1:[],   // 邀请列表
               listData2:[],   // 出借列表
            },
            fullHeight:{
                height:''
            }
            
        }
    },
    methods: {
        tabEvent(tab,n){
            for(var i in this.tabShow){
                this.tabShow[i] = false;
            }
            this.tabShow[tab] = true;
            if(n == 0){
               this.isShow = 0;
            } else {
               this.isShow = 1;
            }
        },
        listData(){
           this.getNotlogData('/newPigYear/pieceInit', (data) => {
                if(data.resCode){
                    this.listDataObj.listData1 = data.resData.inviteList;
                    this.listDataObj.listData2 = data.resData.tenderList;
                }
            },{})
        },
    },
    mounted() {
        this.PassValue('NavWhite_碎片记录');
        if(this.osType == "Android"){
            this.fullHeight.height = (document.documentElement.clientHeight+10)+"px"  //获取手机可视区域的的高度
        }else{
            this.fullHeight.height =  document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度	
        }
    },
    created() {
         this.listData();
    },
    components:{
    }
}
</script>

<style lang="scss" scoped>
body{
    background: #fff!important;
}
    .list{
        width: 100%;
        height: 100%;
        background: #fff;
        position: relative;
        // overflow: hidden;
        padding-top: 1.066667rem;
        .title_box{
            width: 100%;
            height: 1.066667rem;
            position: fixed;
            left: 0;top: 0;
            color: #7A8898;
            z-index: 100;
            background: #fff;
            div{
                width: 50%;
                height: 100%;
                float: left;
                text-align: center;
                line-height: 1.066667rem;
                font-size: .4rem;
            }
            .colorActive{
                width: 50%;
                height: 100%;
                border-bottom: 1px solid red;
                color: #E53219;
            }
        } 
        .content{
            width: 100%;
            position: relative;
            .cont_title1,.cont_title2{
                height: 1.413333rem;
                position: relative;
                line-height: 1.333333rem;
                font-family: PingFangSC-Regular;
                font-size: .346667rem;
                color: #333333;
                text-align: center;
             }
             .cont_title1{
                span{
                    width: 25%;
                    float: left;
                }
             }
            .ul1{
                padding: 0 .4rem;
                background: #fff;
                li{
                    height: 1.333333rem;
                    position: relative;
                    line-height: 1.333333rem;
                    span{
                        float: left;
                        width: 25%;
                        height: 100%;
                        font-family: PingFangSC-Regular;
                        font-size: .346667rem;
                        color: #333333;
                        text-align: center;
                    }
                    span.icon{
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_list_icon.png?v=1.1) no-repeat;
                        background-size: .8rem .8rem;
                        background-position: center center;
                    }
                }
                // li:last-child.bdr-b:after{
                //    border-bottom: none;
                // }
             }
             .cont_title2{
                span{
                    width: 33%;
                    float: left;
                }
             }
            .ul2{
                padding: 0 .4rem;
                background: #fff;
                li{
                    height: 1.333333rem;
                    position: relative;
                    line-height: 1.333333rem;
                    span{
                        float: left;
                        width: 33%;
                        height: 100%;
                        font-family: PingFangSC-Regular;
                        font-size: .346667rem;
                        color: #333333;
                        text-align: center;
                    }
                    span.icon{
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/2019springFestivalActivity/debris_list_icon.png?v=1.1) no-repeat;
                        background-size: .8rem .8rem;
                        background-position: center center;
                    }
                }
                // li:last-child.bdr-b:after{
                //    border-bottom: none;
                // }
             } 
             .null{
                 background: url(https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png) no-repeat;
                 background-size: 6.4rem 4.533333rem;
                 background-position: center 1.333333rem;
                 overflow: hidden;
                 p{
                     color: #bebebe;
                    font-size: 0.373333rem;
                    line-height: 1.066667rem;
                    text-align: center;
                    margin: 6rem 0 0 0;
                 }
             }
        }
    }
</style>