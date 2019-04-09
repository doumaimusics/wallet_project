<template>
    <div id="myCharity">
        <div v-title>我的公益</div>
        <div class="banner">
            <p>已累计捐赠积分</p>
            <span>{{myCommonweal.commonwealScore ? myCommonweal.commonwealScore : 0 | moneyFormat(1)}}</span>
        </div>
        <div class="receiving">
            <div class="title">捐赠记录</div>
            <ul class="item" v-if="myCommonweal.commonwealList.list.length">
                <li class="" v-for="(v, i) in myCommonweal.commonwealList.list">
                    <div class="itemBox">
                        <div class="title">【第{{v.period}}期】{{v.commonwealName}}</div>
                        <div class="time">{{v.addTime}}</div>
                        <div class="imgBox" @click="appRouter('/charitable', {projectId: v.projectId})" :style="{background: 'url('+ v.picPath +')no-repeat center center / 100%'}">
                           <div class="describe">
                               <div class="score">
                                   <p>我的捐赠</p>
                                   <p>{{v.score}}<em>积分</em></p>
                               </div>
                               <div class="yesRaisescore">
                                    <p>已累计捐赠</p>
                                    <p>{{v.yesRaisescore}}<em>积分</em></p>
                               </div>
                               <div class="btn" v-if="v.status == 1">参与捐赠</div>
                               <div class="btn" v-else-if="v.status == 2">已完成</div>
                           </div>
                        </div>

                    </div>
                    <div class="intWishList_btn" @click="appRouter('/intWishList', {projectId: v.projectId,period:v.period,name:v.commonwealName})">爱心榜</div>
                </li>
            </ul>
            <div class="null" v-else>
                <img src="https://aliyunsso.edspay.com/web/wx/integralStroe/groups.png" alt="">
                <p>暂无捐赠记录</p>
            </div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp';
    export default {
        mixins: [wxToapp],
        data() {
            return {
                myCommonweal:{
                    commonwealScore1:0,
                    commonwealList:{
                        list:[]
                    }
                },
            }
        },
        methods: {
            initData(){
                // if(this.hasLogin){
                    this.getAppData('/commonweal/myCommonweal',(data) =>{
                        if(data.resCode){
                            this.myCommonweal = data.resData
                            // console.dir(data.resData)
                        }
                    },{},1,1)  
                // }else{
                    // this.toLogin()
                // }
            }
        },
        created: function() {
            this.PassValue('NavWhite_我的公益');
            this.initData()
        },
        mounted: function() {

        },
        components: {
            
        }
   }
</script>

<style lang="scss" scoped>
    #myCharity{
        font-family: PingFangSC-Regular;
        .banner{
            width: 100%;
            height: 2.8rem;
            background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/myCharity.png) no-repeat ;
            background-size: 100%;
            text-align: center;
            color: #fff; 
            padding-top: .666667rem;
            p{
               font-size: .373333rem;
               margin-bottom: .066667rem;
            }
            span{
                font-family: DIN-Medium;
                font-size: .666667rem;
                letter-spacing: .010267rem;
            }
        }
        .receiving{
            width: 100%;
            padding: .4rem .4rem 0;
            background: #fff;
            .title{
                font-family: PingFangSC-Medium;
                font-size: .373333rem;
                color: #000000;
                margin-bottom: .4rem;
            }
            .item{
                li{
                    padding-left: .48rem;
                    border-left: 1px solid #d8d8d8;
                    padding-bottom: .533333rem;
                    position: relative;
                    .itemBox{
                        position: relative;
                        top: -.15rem;
                        .title{
                            font-size: .346667rem;
                            color: #333;
                            line-height: .493333rem;
                            margin-bottom: .066667rem;
                        }
                        .title:before {
                            content: '';
                            background: #FF433B;
                            display: inline-block;
                            width: .186667rem;
                            height: .186667rem;
                            border-radius: .093333rem;
                            margin-left: -.57rem;
                            margin-right: .433333rem;
                            position: absolute;
                            top: .146667rem;
                        }
                        .time{
                            font-size: .293333rem;
                            color: #9b9b9b;
                            line-height: .44rem;
                            margin-bottom: .266667rem;
                            text-align: left;
                        }
                        .imgBox{
                            width: 8.613333rem;
                            height: 4.306667rem;
                            padding-top: 2.16rem;
                            .describe{
                                width: 8.613333rem;
                                height: 2.16rem;
                                background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, #000000 100%);
                                padding: .666667rem .4rem 0;
                                display: flex;
                                justify-content: space-between;
                            }
                            div{
                                color: #FFFFFF;
                                p:nth-child(1){
                                    font-size: .293333rem;
                                    line-height: .4rem;
                                    margin-bottom: .106667rem;
                                }
                                p:nth-child(2){
                                    font-family: PingFangSC-Medium;
                                    font-size: .4rem;
                                    line-height: .56rem;
                                    em{
                                        font-family: PingFangSC-Regular;
                                        font-size: .266667rem;
                                    }
                                }
                            }
                            div.btn{
                                width: 1.866667rem;
                                height: .666667rem;
                                border: 1px solid #FFFFFF;
                                border-radius: .333333rem;
                                font-size: .293333rem;
                                text-align: center;
                                line-height: .64rem;
                                margin-top: .2rem;
                            }
                        }
                    }
                    .intWishList_btn{
                        width: 1.386667rem;
                        height: .6rem;
                        border-radius: .306667rem;
                        background: #F14B4B;
                        font-family: PingFangSC-Regular;
                        font-size: .32rem;
                        color: #FFFFFF;
                        text-align: center;
                        line-height: .6rem;
                        position: absolute;
                        top: -0.05rem;right: 0rem;
                    }
                }
                li:last-child{
                    padding-bottom: .133333rem;
                }
            }
        }
        .null{
            width: 100%;
            padding:  1.333333rem 0 3.333333rem;
            text-align: center;
            img{
                width: 6.4rem;
                height: 4.533333rem;
                margin: 0 auto;
                margin-bottom: 0.4rem;
            }
            p{
                font-size: 0.346667rem;
                color: #808080;
                margin-bottom: 0.266667rem;
                text-align: center;
            }
        }
    }
</style>
