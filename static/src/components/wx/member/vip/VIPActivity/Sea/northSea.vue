<!-- 北海海域 -->
<template>
    <div id="northSea" class="activitySea">
        <div v-if="showUnlock" :class="{clundLock:showCloud}" ref="unlock" class="unlock">
            <div class="lockBox">
                <img :class="{activeImg:openLockImg}" class="img2" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/expect.png" alt="">
            </div>
            <div class="btn"></div>
            <img v-if="showCloud" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/moveCloud.gif" alt="" class="imgCloud">
        </div>
        <div ref="seaBox" class="seaBox">
            <div class="lock">
                <div v-if="userData.sailSum >= 48000" @click="deblocking" class="lockImg"></div>
                <div v-else class="lockImg grey"></div>
            </div>
            <div v-for="item in 180" :ref="'islet'+ (481 - item)" class="islet" :class="{greyIslet: userData.sailSum < (481-item)*100,'islet480':item == 1}">
                <div v-if="userData.sailSum >= (481 - item)*100" class="tips">{{item == 1 ? '北海海皇':(481-item +'00m')}}</div>
                <div v-else class="grey-tips tips">{{item == 1 ? '北海海皇':(481-item +'00m')}}</div>
            </div>
            <div ref="go" class="go"></div>
        </div>
        <div ref="boat" id="chuan" class="chuan">
            <img v-if="showBoat[0]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/boatLeft.png" alt="" class="img1">
            <img v-if="showBoat[1]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/boatLeftMove.gif" alt="" class="img2">
            <img v-if="showBoat[2]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/boatRight.png" alt="" class="img3">
            <img v-if="showBoat[3]" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/boatRightMove.gif" alt="" class="img4">
        </div>
        <div v-if="showShareLayer" @click="showShareLayer = false" v-layer class="shareLayer"></div>

        <div class="seaLogo"></div>

        <div v-if="showLayer.showLastIslet" v-layer class="lastIslet">
            <div class="content">
                <div @click="closeLast" class="btn"></div>
            </div>
        </div>
        
        <find-boss v-if="showLayer.findBoss" :showLayer="showLayer"  :lastLand="seaData.lastLand" :redSize="seaData.redSize"  :type="4"></find-boss>
        <!-- 出现生物弹框 -->
        <biology-popout v-if="showBiologyTip" :seaData="seaData" @changeTip="closePopout($event)"></biology-popout>
    </div>
</template>

<script>
    import findBoss from './findBoss.vue';
    import publicSea from './js/publicSea';
    import biologyPopout from './biologyPopout.vue';
    import wxShare from '../../../../../../common/wx/wxShare';
    export default{
        mixins:[publicSea,wxShare],
        data(){
            return{
                showLayer:{
                    findBoss:false,
                    showLastIslet:false,
                },
                isLetSize:{
                    height:0,
                    width:0,
                },
                boatLeft:['2.2rem','3.8933rem','4.9333rem'],
            }
        },
        props:['getUserData'],
        methods:{
            closeLast(){
                this.showLayer.showLastIslet = false;
                this.userData.sailSum = 0;
                this.userData.currentSea = 1;
                this.getAppData('/sailSea/openLastLand',(data)=>{
                    if(data.resCode){
                        this.getUserData();
                    }
                },{})
            }
        },
        components:{
            findBoss,
            biologyPopout
        }, 
        created(){

        },
        mounted(){

            var setHeight;
            if(this.userData.sailSum == 30000){
                setHeight = this.$refs.seaBox.clientHeight; 
                console.log(this.$refs.go.clientHeight);
            }else{
                setHeight = this.$refs['islet'+(this.userData.sailSum/100)][0].offsetTop;
            }

            setTimeout(() =>{
                this.isLetSize.height = this.$refs['islet'+(301)][0].clientHeight;
                this.isLetSize.width = this.$refs['islet'+(301)][0].clientWidth;

                document.body.scrollTop = (setHeight - this.pageHeight/2);
                document.documentElement.scrollTop = (setHeight - this.pageHeight/2);
                window.pageYOffset = (setHeight - this.pageHeight/2);
                this.getBoatLocation(this.boatLeft);
            },80)

            if(this.userData.sailSum % 48000 == 0){
                this.showLayer.showLastIslet = true;
            }

        }
    }
</script>

<style lang="scss" scoped>
    .activitySea{
        font-family: PingFangSC-Regular;
        position: relative;
        .lastIslet{
            padding-top: 3.866667rem;
            .content{
                height:9.28rem;
                width:7.68rem;
                margin: 0 auto;
                background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/lastIslet.png') no-repeat;
                background-size: 100% 100%;
                padding-top: 6.8rem;
                .btn{
                    height: 2.133333rem;
                    width:4.0rem;
                    margin: 0 auto;
                }
            }
        }
        .seaLogo{
            position: fixed;
            bottom:3.6rem;
            right:0;
            height: 1.6rem;
            width: 2.24rem;
            background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/seaLogo4.png') no-repeat;
            background-size: 100% 100%;
        }
        .shareLayer{
            background:rgba(0,0,0,.5) url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/shareLayer.png') top right no-repeat!important;
            background-size:100% 11.48rem!important;
        }
        .unlock{
            width:100%;
            position: fixed;
            top:0;
            left:0;
            z-index:999;
            background:#fff;
            background: #fff url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/findWestSea.png') no-repeat;
            background-size:100%;
            padding-top: 7.6rem;
            .lockBox{
                height:4.533333rem;
                width:100%;
                position: relative;
                margin:0 auto;
                img{
                    position: absolute;
                    height:100%;
                    width:100%;
                    top:0;
                    left:0;
                    z-index:10;
                }
                .img2{
                    z-index:9;
                }
                .activeImg{
                    z-index:100;
                }
            }
            .btn{
                height:1.1rem;
                width:3.6rem;
                margin:0.56rem auto 0;
            }
            .imgCloud{
                width:100%;
                position: absolute;
                z-index:10;
                top:0;
                left:0;
            }
        }
        .lock{
            height:2rem;
            width:100%;
            /* background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/eastSea/yun.png') no-repeat; */
            /* background-size:100% 100%; */
            /* margin-bottom:1.413333rem; */
            /* .lockImg{
                height:3.946667rem;
                width:8.0rem;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/expect.png') no-repeat;
                background-size:100% 100%!important;
                margin:0 auto;
            }
            .grey{
                background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/seas/expect.png') no-repeat;
            } */
        }
        .seaBox{
            background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/northSeaBG.png');
            background-size:100% 100%;
            width: 100%;
            background-size:100%;
            // padding-top: 1.413333rem;
            padding-bottom: 1rem;
            .islet{
                height:2.666667rem;
                width:3.813333rem;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/northSea/islet.png') no-repeat;
                background-size:100% 100%;
                margin-bottom:1.786667rem;
                position: relative;
                .tips{
                    position: absolute;
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/eastSea/tips.png') no-repeat;
                    height:0.746667rem;
                    width:1.28rem;
                    background-size:100% 100%!important;
                    left: 1.253333rem;
                    top:-1.013333rem;
                    font-size:0.266667rem;
                    line-height:0.32rem;
                    text-align: center;
                    color:#fff;
                    padding-top: 0.15rem;
                    font-family: DIN-Light;
                }
                .grey-tips{
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/eastSea/greyTips.png') no-repeat;

                }
            }
            .greyIslet{
                background: url(https://aliyunsso.edspay.com/web/wx/vip/treasure2/northLet.png) no-repeat;
                background-size: 100% 100%;
            }
            .islet480{
                height:5.333333rem;
                width:5.333333rem;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/northBoss.gif') no-repeat;
                background-size:100% 100%;
                .tips{
                    height:0.746667rem;
                    width:1.413333rem;
                    top: -0.2rem;
                    left:1.8rem;
                    background-size:100% 100%;
                    background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/tipsLast.png') no-repeat;
                }
            }
            .islet:nth-child(odd){
                margin-left: 5.68rem;
            }
            .islet:nth-child(6n-3){
                margin-left:4.32rem;
            }
            .islet:last-child{
                margin-bottom: 0;
            }
            .islet301{
                margin-bottom: -1.333333rem;
            }
            .go{
                height:3.146667rem;
                width:4.0rem;
                background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/eastSea/go.png') no-repeat;
                background-size:100% 100%;
            }
        }
        .chuan{
            position: absolute;
            top: 0px;
            left:0px;   
            height:1.866667rem;
            width:1.866667rem;
            // background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/chuan.png') no-repeat;
            background-size:100% 100%;
            img{
                position: absolute;
                height:1.866667rem;
                width:1.866667rem;
            }
            .img1{z-index:10;}
            .img1{z-index:11;}
            .img1{z-index:12;}
            .img1{z-index:13;}
        }
        .bottomTi{
            height:3.4rem;
        }
    }
</style>