<template>
    <div id="spendIndex">
        <div v-keywords>E都市钱包、消费分期、分期付款、花吧购物分期</div>
        <div v-title>花吧_E都市钱包_消费分期</div>
        <div class="banner"></div>
        <div class="info">
            <div class="content"></div>
        </div>
        <div class="goodsList">
            <ul>
                <li v-for="(item,index) in goodsList" v-if="index < 8" :style="{background: 'url('+goodsList[index].picPath+') center no-repeat'}" class="fl">
                    <div class="Qcode">
                        <img src="https://aliyunsso.edspay.com/web/activity/drainage/Qcode.png" alt="" class="code">
                        <div class="btn">扫码立即分期</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                goodsList:{},
    		}
    	},
    	methods:{
            getGoodsData(){ 
                this.notLogPost('/index/app/goods',(data)=>{
                    if(data.resCode){
                        this.goodsList = data.resData.goods;
                    }
                },{})
            }
    	},
    	created(){
    		this.getGoodsData();
    	}
    }
</script>

<style lang="scss" scoped>
    #spendIndex{
        .banner{
            height: 460px;
            width: 100%;
            min-width: 1200px;
            background: url('https://aliyunsso.edspay.com/web/activity/drainage/spendBanner.png') center  no-repeat;
        }
        .info{
            width:1200px;
            height:925px;
            margin: 0 auto;
            padding-top: 82px;
            .content{
                height:749px;
                width: 1180px;
                margin: 0 auto;
                background: url('https://aliyunsso.edspay.com/web/activity/drainage/spendInfo.png') no-repeat;
                background-size: 100% 100%!important;
            }
        }
        .goodsList{
            height:772px;
            width:100%;
            min-width:1200px;
            background: url('https://aliyunsso.edspay.com/web/activity/drainage/spendGoods.png') center  no-repeat;
            padding-top: 147px;
            ul{
                width: 1200px;
                margin: 0 auto;
                li{
                    height: 278px;
                    width: 278px;
                    position: relative;
                    margin: 0 22px 32px 0;
                    overflow: hidden;
                    background: url('https://aliyunsso.edspay.com/web/activity/drainage/good1.png') center no-repeat;
                    background-size: 100% 100%!important;
                    .Qcode{
                        height: 100%;
                        width: 100%;
                        position: absolute;
                        top: 278px;
                        left: 0;
                        transition: all 0.4s;
                        background: rgba(0,0,0,.8);
                        .code{
                            height: 107px;
                            width: 106px;
                            display: block;
                            margin: 64px auto 55px;
                        }
                        .btn{
                            height:52px;
                            width:100%;
                            background: #FF5B4C;
                            font-size: 0.213333rem;
                            line-height: 52px;
                            text-align: center;
                            color: #fff;
                        }
                    }
                    .moveOut{
                        top:278px;
                        transition: all 0.2s;
                    }
                }
                li:hover{
                    .Qcode{
                        top:0;
                        transition: all 0.4s;
                    }

                }
            }
        }
    }
</style>