<template>
    <div ref="recuitSeaman" id="recuitSeaman">
        <div v-title>招募船员</div>
        <div class="content">
            <div class="userData">
                <div class="num">{{coinSum}}</div>
                <div @click="toShare(2)" class="toRecruit"></div>
                <div @click="showTips = true" class="tips"></div>
            </div>
            <div class="seamanList">
                <ul v-if="seamanList.length != 0">
                    <li v-for="item in seamanList" class="clear">
                        <div class="phoen fl">{{item.mobilePhone}}</div>
                        <div class="name fl">{{item.realName}}</div>
                        <div class="time fl">{{item.openZsTime}}</div>
                    </li>
                </ul>
                <div v-else class="null">
                    <img src="https://aliyunsso.edspay.com/web/wx/vip/treasure2/exchange/seamanKong.png" alt="" class="imgNull">
                    <p>真遗憾，你还没有招募到船员哦！</p>
                </div>
            </div>
        </div>
        <div v-if="showTips" v-layer class="tipsBox">
            <div class="tipContent">
                <div @click="showTips = false" class="close"></div>
            </div>
        </div>
        <div v-if="showShare" @click="showShare = false" v-layer class="shareLayer"></div>
    </div>
</template>

<script>
    import wxShare from '../../../../../../common/wx/wxShare';
    import getActivityData from '../../../../activity/publicJS/getActivityData'; // 获取活动时间
    import inviteSeaman from './inviteSeaman'; // 航海分享
    export default{
        mixins:[wxShare,inviteSeaman,getActivityData],
    	data(){
    		return{
                seamanList:[],
                coinSum:0,
                pageHeight:0,
                showTips:false,
                showShareLayer:false,
    		}
    	},
    	methods:{
            getSeaman(){
                this.getAppData('/sail/recruit',(data)=>{
                    if(data.resCode){
                        this.seamanList = data.resData.users;
                        this.coinSum = data.resData.coinSum;
                    }
                },{})
            },
            getUserData(){

            }
    	},
    	created(){
    		this.getSeaman();
            this._getActivityTime('activity_vip_sail');//获取活动id
    	},
        mounted(){
            this.PassValue('NavWhite_招募船员');
            this.pageHeight = document.documentElement.clientHeight;
            this.$refs.recuitSeaman.style.height = this.pageHeight + 'px';

            this.setShareData();

            // 数据统计
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275251649&web_id=1275251649';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        }
    }
</script>

<style>
    html,body{
        height: 100%;
    }
</style>

<style lang="scss" scoped>
    #recuitSeaman{
        height:100%;
        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/seamanBG.png') no-repeat;
        background-size: 100%;
         position: relative;
         .shareLayer{
            background:rgba(0,0,0,.5) url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/shareLayer.png') top right no-repeat!important;
            background-size:100% 11.48rem!important;
        }
        .tipsBox{
            padding-top: 4.3rem;
            .tipContent{
                background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/tipsImg.png') no-repeat;
                background-size: 100% 100%;
                height:6.72rem;
                width:6.72rem;
                margin: 0 auto;
                position: relative;
                .close{
                    height:1.333333rem;
                    width: 1.333333rem;
                    position: absolute;
                    bottom:0;
                    left:2.693333rem;
                }
            }
        }
        .null{
            .imgNull{
                height:2.666667rem;
                width: 2.666667rem;
                margin: 0 auto;
                display:block;
            }
            p{
                padding-top: 0.106667rem;
                font-size:0.373333rem;
                line-height:0.533333rem;
                color:#753122;
                text-align:center;
            }
        }
        .shareLayer{
            background: rgba(0,0,0,.5) url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/shareLayer.png') top right no-repeat!important;
            background-size:100% 11.48rem!important;
        }
        .content{
            width:100%;
            height:12.0rem;
            position: absolute;
            top: 60%;
            margin-top: -6.2rem;
            background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/seamanContent2.png') no-repeat;
            background-size: 100% 100%;
            .userData{
                height:4.68rem;
                position: relative;
                .num{
                    padding-top: 0.75rem;
                    padding-bottom: 0.853333rem;
                    margin-left: 3.56rem;
                    font-family: DIN-Medium;
                    font-size: 0.8rem;
                    color: #7F3125;
                    letter-spacing: 0;
                    text-align: justify;
                    width:1.5rem;
                    text-align:center;
                }
                .toRecruit{
                    height:1.36rem;
                    width:4.0rem;
                    margin: 0 auto;
                }
                .tips{
                    height:0.9rem;
                    width:0.9rem;
                    position: absolute;
                    top:0.9rem;
                    right: 2.4rem;
                }
            }
            .seamanList{
                padding: 2.2rem 1.12rem 0;
                position: relative;
                ul{
                    height:3.333333rem;
                    overflow-y: auto;
                    padding: 0 0.133333rem;
                    li{
                        height:0.506667rem;
                        margin-bottom: 0.2rem;
                        font-size: 0.346667rem;
                        line-height: 0.506667rem;
                        color: #753122;
                        .fl{
                            width:33.3%;
                        }
                        .name{
                            text-align:center;
                        }
                        .time{
                            text-align:right;
                        }
                    }
                }

            }
        }
    }
</style>