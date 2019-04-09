<template>
    <div v-layer id="myLand">
        <div v-if="myMoney.myLand" class="content content1">
            <div @click="clickPop" class="close"></div>
            <div class="ul-content">
                <ul v-if="landData.length">
                    <li class="clear" v-for="item in landData">
                        <div class="fl time">{{item.addTime | divisionTime}}</div>
                        <div class="fl single">{{item.reservedDoubleOne}}</div>
                        <div class="fl sum">{{item.reservedDouble}}</div>
                    </li>
                </ul>
                <div v-else-if="isGet" class="kong">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/qianBaoBao.png" alt="">
                    <p>亲～立即出借，点亮美食， 冲击排行榜！</p>
                </div>
            </div>
        </div>
        <div v-if="myMoney.myInvite" class="content content2">
            <div @click="clickPop" class="close"></div>
            <div class="ul-content">
                <ul v-if="peopleData.length">
                    <li v-for="item in peopleData">
                        <div class="fl time">{{item.addTime  | divisionTime}}</div>
                        <div class="fl people">{{item.mobilePhone}}</div>
                    </li>
                </ul>
                <div v-else-if="isGet" class="kong">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/qianBaoBao.png" alt="">
                    <p>亲～赶快邀请好友，点亮美食，冲击排行榜！</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp';
    export default{
        mixins:[wxToapp],
    	data(){
    		return{
                landData:[],
                peopleData:[],
                isGet:false,
    		}
    	},
        props:['myMoney'],
    	methods:{
            getLandData(){
                if(this.myMoney.myLand){
                    this.getAppData('/activity/lantern/BorrowlistCate',(data) => {
                        if(data.resCode){
                            this.landData = data.resData.list
                            this.isGet = true;
                        }
                    },{})
                }else if(this.myMoney.myInvite){
                    this.getAppData('/activity/lantern/listSingleCate',(data) => {
                        if(data.resCode){
                            this.peopleData = data.resData.list
                            this.isGet = true;
                        }
                    },{})
                }
            },
            clickPop(){
                for(var item in this.myMoney){
                    this.myMoney[item] = false;
                }
            }
    	},
    	created(){
    		this.getLandData();
    	}
    }
</script>

<style lang="scss" scoped>
    #myLand{
        padding-top: 5.066667rem;
        .content{
            height: 6.0rem;
            width: 8.0rem;
            margin: 0 auto;
            background-size: 100% 100%!important;
            position: relative;
            .kong{
                padding-top:0.48rem;
                img{
                    display: block;
                    width: 2.48rem;
                    height: 2.426667rem;
                    margin: 0 auto;
                }
                    p{
                        font-size: 0.346667rem;
                        line-height: 0.506667rem;
                        color: #FFE3C0;
                        text-align: center;
                        padding-top: 0.373333rem;
                    }
            }
            .close{
                position: absolute;
                height: 0.666667rem;
                width: 0.666667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/close.png) no-repeat;
                background-size: 100% 100%;
                right: 0;
                top: -0.933333rem;
            }
            .ul-content{
                overflow: hidden;
                height: 3.946667rem;
                overflow-y: auto;
            }
        }
        .content1{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/pop-land.png) no-repeat;
            padding-top: 1.386667rem;
            .ul-content{
                overflow: hidden;
                height: 3.946667rem;
                overflow-y: auto;
            }
            ul{
                color: #fff;
                font-size: 0.32rem;
                padding: 0 0.6rem;
                width: 110%;
                line-height: 0.533333rem;
                li{
                    .time{
                        width: 2.26rem;
                        // padding-left: 0.2rem;
                    }
                    .single{
                        width: 2.5rem;
                        text-align: center;
                    }
                    .sum{
                        width: 2.1rem;
                        text-align: center;
                    }
                }
            }
        }
        .content2{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/pop-invite.png) no-repeat;
            padding-top: 1.386667rem;
            ul{
                color: #fff;
                font-size: 0.32rem;
                padding: 0 0.6rem;
                width: 110%;
                line-height: 0.533333rem;
                li{
                    .time{
                        width: 4rem;
                        padding-left: 0.2rem;                                              
                    }
                    .people{
                        width: 2.933333rem;
                        padding-left: 0.2rem;                                              
                    }
                }
            }
        }
    }
</style>