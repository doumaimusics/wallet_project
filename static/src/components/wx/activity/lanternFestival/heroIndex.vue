<template>
    <div id="heroIndex">
        <div @click="showPopup.heroRule = true" class="rule"></div>
        <div class="hero-content">
            <swiper :options="swiperOption">
                <swiper-slide >
                    <div class="content swiper1">
                        <div v-for="(item,index) in listData.list1" :class="'userData first'+(index+1)">
                            <div v-if="item.mobilePhone">
                                <div class="name">{{item.mobilePhone}}</div>
                                <div class="sumMoney">{{item.reservedDouble | moneyFormat(1)}}</div>
                            </div>
                            <div v-else class="text">{{item.text}}</div>
                        </div>          
                    </div>
                </swiper-slide>
                <swiper-slide >
                    <div class="content swiper2">
                        <div v-for="(item,index) in listData.list3" :class="'userData first'+(index+1)">
                            <div  v-if="item.mobilePhone">
                                <div class="name">{{item.mobilePhone}}</div>
                                <div class="sumMoney">{{item.inviteUserNumber}}人</div>
                            </div>
                            <div v-else class="text">{{item.text}}</div>
                        </div>          
                    </div>
                </swiper-slide>
                <swiper-slide >
                    <div class="content swiper3">
                        <div v-for="(item,index) in listData.list2" :class="'userData first'+(index+1)">
                            <div v-if="item.mobilePhone">
                                <div class="name">{{item.mobilePhone}}</div>
                                <div class="sumMoney">{{item.reservedDoubleOne | moneyFormat(1)}}</div>
                            </div>
                            <div v-else class="text">{{item.text}}</div>
                        </div>          
                    </div>
                </swiper-slide>
                <div  class="swiper-pagination" slot="pagination"></div>
            </swiper>
            <div class="bottom clear">
                <div @click="toApp('WIP','/wxInvest')" class="btn fl btn-left"></div>
                <div @click="toUrl" class="btn fl btn-right"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    export default{
        mixins:[wxShare],
        data(){
            return{
                swiperOption: {
                    pagination: '.swiper-pagination',
                },
                showRule:false,
                listData:{},
                yuanxiao: { //分享标题内容配置
                    title: "欢乐闹元宵", //标题
                    desc: "畅想美食宴，奖励叠加拿", // 内容
                    link: global.host+"wx/yxInvitation", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                }
            }
        },
        props:['showPopup'],
        methods:{
            getListData(){
                this.notLogPost('/activity/ranking/listTwoCate',(data) =>{
                    if(data.resCode){
                        this.listData = data.resData;
                        this.topThree(this.listData.list1)
                        this.topThree(this.listData.list2)
                        this.topThree(this.listData.list3)
                    }
                },{})
            },
            toUrl(){
                if (this.osType) {
                    this.isLogPassValue(this.appShare)
                } else {
                    if(this.getCookie('userToken')){
                        this.showPopup.layer = true;
                    }else{
                        this.toWxLogin();
                    }
                    //this.showPopup.heroRule = true;
                }
            },
            topThree(list){
                if(list.length == 0){
                    list.push({text:'虚位以待'})
                    list.push({text:'虚位以待'})
                    list.push({text:'虚位以待'})
                }else if(list.length == 1){
                    list.push({text:'虚位以待'})
                    list.push({text:'虚位以待'})
                }else if(list.length == 2){
                    list.push({text:'虚位以待'})
                }
                console.log(this.listData)
            }
        },
        created(){
            this.getListData();
        },
        mounted(){
            this.getWxShareData(this.yuanxiao);
        }   
    }
</script>

<style lang="scss">
    #heroIndex{
        position: relative;
        .rule{
            height: 1.04rem;
            width: 1.04rem;
            position: absolute;
            right:0.266667rem;
            top: 0.48rem;
            z-index: 66;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/heroRule.png) no-repeat;
            background-size: 100% 100%;
        }
        .swiper-pagination{
            bottom:0px;
            .swiper-pagination-bullet{
                height: 0.266667rem;
                width: 0.266667rem;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/swiper1.png') no-repeat;
                background-size: 100% 100%;
                opacity: 1;
            }
            .swiper-pagination-bullet-active{
                background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/swiper2.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>

<style lang="scss" scoped>
    #heroIndex{
        width: 9.466667rem;
        height: 16.24rem;
        background: #f00;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/heroBg.png') no-repeat;
        background-size: 100% 100%;
        .hero-content{
            height: 11rem;
            width: 100%;
            .swiper-container{
                height: 100%;
                width: 9.2rem;
                margin: 0.5rem auto 0;
                .swiper-slide{
                    width: 100%;
                    .content{
                        height: 10.666667rem;
                        width: 8.453333rem;
                        margin: 0 auto;
                        background-size: 100% 100%!important;
                        position: relative;
                        .text{
                            line-height: 0.72rem;
                            padding-left: 0.2rem;
                        }
                        .userData{
                            position: absolute;
                            color: #923311;
                            font-size: 0.32rem;
                            line-height: 0.453333rem;
                            .name{
                                padding-bottom: 0.08rem;
                            }
                        }
                        .first1{
                            top:4.26rem;
                            left:4.0rem;
                        }
                        .first2{
                            top:8.16rem;
                            left:2.026667rem;
                        }
                        .first3{
                            top:8.16rem;
                            left:5.866667rem;
                        }
                    }
                    .swiper1{
                         background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/accumulativeList.png') no-repeat;
                    }
                    .swiper2{
                         background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/peopleList.png') no-repeat;
                    }
                    .swiper3{
                         background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/singleList.png') no-repeat;
                    }
                }
            }
            .bottom{
                padding: 0.3rem 0.133333rem 0;
                .btn{
                    height: 1.44rem;
                    width: 3.786667rem;
                    margin: 0 0.4rem;
                    background-size: 100% 100%!important;
                }
                .btn-left{
                    background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/btn-left.png') no-repeat;
                }
                .btn-right{
                    background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/btn-right.png') no-repeat;
                }
            }
        }
    }
</style>

