<template>
    <div v-layer id="findBoss">
        <div v-if="lastLand == 0" class="first">
            <div v-if="showFind" class="content">
                <img :src="findBoss[type-1]" alt="" class="img">
                <!-- <div class="img"></div> -->
                <div @click="exhibition" class="btn"></div>
            </div>
            <div v-if="showAward" class="award">
                <div class="awardImg">
                    <img :src="awardImg[type-1]" alt="">
                    <div @click="close" class="close"></div>
                </div>
            </div>
        </div>
        <div v-else="lastLand == 1" class="lastLand">
            <div v-if="showFind" class="content">
                <img :src="findBoss1[type-1]" alt="" class="img">
                <!-- <div class="img"></div> -->
                <div @click="exhibition" class="btn"></div>
            </div>
            <div v-if="showAward" class="award">
                <div class="findRed">
                    <img :src="(redSize=='升级卡' ? awardImg1[5] : (redSize=='免降级卡' ? awardImg1[4] : awardImg1[type-1]))" :class="{'excludeRed':redSize=='免降级卡'||redSize=='升级卡'}" alt="">
                    <div class="redNum" v-if="redSize!='免降级卡'&&redSize!='升级卡'">{{redSize}}元出借红包</div>
                    <div @click="close" class="close"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                showFind:true,
                showAward:false,
                findBoss:[
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findEastBoss.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findSouthBoss.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findWestBoss.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findNorthBoss.png',
                ],
                awardImg:[
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/eastAward.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/southAward.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/westAward.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/northAward.png',
                ],
                findBoss1:[
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findEastBoss1.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findEastBoss2.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findEastBoss3.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findEastBoss4.png',
                ],
                awardImg1:[
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findRed1.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findRed1.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findRed1.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/treasure2/findRed1.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/eastAward.png',
                    'https://aliyunsso.edspay.com/web/wx/vip/vipActivity/westAward.png',
                ]
    		}
    	},
        props:['type','showLayer','lastLand','redSize'],
    	methods:{
            exhibition(){
                this.showFind = false;
                this.showAward = true;
                setTimeout(()=>{
                    this.showAward = false;
                    this.showLayer.findBoss = false;
                    if(this.type == 4){
                        this.showLayer.showLastIslet = true;
                    }
                },3000)
            },
            close(){
                this.showAward = false;
                this.showLayer.findBoss = false;
                if(this.type == 4){
                    this.showLayer.showLastIslet = true;
                }
            }
    	},
    	created(){
    		
    	},
        mounted(){

        }
    }
</script>

<style lang="scss" scoped>
    #findBoss{
        font-family: PingFangSC-Regular;
        .content{
            padding-top: 3.2rem;
            position: relative;
            background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/length.png') center 1.333333rem no-repeat;
            background-size: 10.0rem 10rem;
            .img{
                height: 9.786667rem;
                width: 9.08rem;
                display:block;
                margin:0 auto;
            }
            .btn{
                position: absolute;
                height:1.066667rem;
                width:3.866667rem;
                bottom:0;
                left: 50%;
                margin:0 -2rem;
            }
        }
        .award{
            padding-top:2.0rem;
            .awardImg{
                // height:7.066667rem;
                width:7.24rem;
                margin:0 auto;
                background:url(https://aliyunsso.edspay.com/web/wx/vip/vipActivity/eastSea/lightBg.png) no-repeat;
                background-size:100% 7.066667rem;
                padding-top: 0.986667rem;
                position: relative;
                img{
                    display:block;
                    height:10.88rem;
                    width:6.72rem;
                    margin:0 auto;
                    
                }
                .close{
                    height:1.333333rem;
                    width:1.333333rem;
                    position: absolute;
                    bottom:0;
                    left:50%;
                    margin-left: -0.666667rem;
                }
            }
            .findRed{
                padding-top: 1.333333rem;
                position: relative;
                .redNum{
                    font-size: 0.373333rem;
                    line-height:0.533333rem;
                    color:#EC4B58;
                    text-align: center;
                    width: 100%;
                    position: absolute;
                    top:2.72rem;
                    left:0;
                }
                img{
                    height:8.866667rem;
                    width:6.693333rem;
                    display:block;
                    margin: 0 auto;
                }
                .close{
                    height:1.333333rem;
                    width:1.333333rem;
                    position: absolute;
                    bottom:0;
                    left:50%;
                    margin-left: -0.666667rem;
                }
                .excludeRed {
                    display:block;
                    height:10.88rem;
                    width:6.72rem;
                    margin:0 auto;
                }
            }
        }
    }
</style>