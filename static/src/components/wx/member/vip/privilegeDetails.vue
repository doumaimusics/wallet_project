<template>
    <div id="particulars">
        <div v-title>{{$route.query.prerogativeName}}</div>
        <div class="common_box" v-if="privilegeData.imgFullScreen == 0">
            <img :src="privilegeData.prerogativePicUrl" alt="" class="top-img">
            <div class="content">
                <div class="explain">
                    <div @click="toVipWelfare" v-if="hasLogin && showText" class="tips"><img class="ic_2" src="https://aliyunsso.edspay.com/web/v5.1.0/diamond.png" alt=""><i v-html="activeText"></i></div>
                    <img class="title" src="https://aliyunsso.edspay.com/web/wx/vip/details.png" alt="">
                    <ul>
                        <li v-for="(item,index) in privilegeData.listTo" class="clear">
                            <div class="num fl">{{index+1}}</div>
                            <div class="text fl">{{item}}</div>
                        </li>
                    </ul>
                </div>
                <div v-if="privilegeData.list.length != 0" class="details">
                    <img class="title" src="https://aliyunsso.edspay.com/web/wx/vip/giftDetail.png" alt="">
                    <ul class="clear">
                        <li class="li-top clear">
                            <div class="vip fl">VIP</div>
                            <div class="gift fl">{{$route.query.prerogativeName}}</div>
                        </li>
                        <li v-for="item in privilegeData.list" class="clear">
                            <div class="vip fl">{{item.vipLevel}}</div>
                            <div class="gift fl">{{item.vipWealDetails ? item.vipWealDetails:'/'}}</div>
                        </li>
                    </ul>
                </div>
                <p v-if="privilegeData.remark != '无'">注：{{privilegeData.remark}}</p>
                <div class="bottom">
                    <img src="https://aliyunsso.edspay.com/web/wx/vip/bottom.png" alt="">
                    
                </div>
            </div>
        </div>
        <div class="full_screen" v-else-if="hasGetData">
            <img :src="privilegeData.prerogativePicUrl" alt="" class="top-img">
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp.js'
    export default{
        mixins:[wxToapp],
    	data(){
            let that = this;
    		return{
                privilegeData:{},
                hasGetData:false,
                dayNum:0,
                memberDay:[//会员日
                    '进入<span>我的福利</span>，查看所有领取记录',
                    '会员日福利已经到啦！<span>立即领取</span>'
                ],
                memberUpapr:[//会员加息
                    '进入<span>我的福利</span>，查看所有领取记录',
                    '每月会员加息福利已经到啦！<span>立即领取</span>'
                ],
                upgrade:[//升级福利
                    '进入<span>我的福利</span>，查看所有领取记录',
                    ''
                ],
                activeText:'',
                activeIndex: [0,0,0],
                showText: false,
    		}
    	}, 

    	methods:{
            getPrivilege(){
                this.notLogPost('/vip/welfareShow',(data) => {
                    console.log(data)
                    this.hasGetData = true;
                    if(data.resCode){
                        this.privilegeData = data.resData.data;
                        if(this.hasLogin){
                            this.getAppData('/vip/gift/isNewGift',(giftData)=>{
                                if(giftData.resCode){       //type 1升级好礼，2会员加息，3会员日

                                    for(var i=0;i<giftData.resData.models.length;i++){
                                        if(giftData.resData.models[i].type == 1 && giftData.resData.models[i].isGift == 1){
                                            this.dayNum = giftData.resData.models[i].invalid;
                                            this.$set(this.activeIndex,0,1);
                                            this.upgrade[1] = '升级福利'+ (this.dayNum == 1 ? '即将':('于'+ (this.dayNum) +'天后')) +'过期，请<span>立即领取</span>'
                                        }else if(giftData.resData.models[i].type == 2  && giftData.resData.models[i].isGift == 1){
                                            this.$set(this.activeIndex,1,1);
                                        }else if(giftData.resData.models[i].type == 3  && giftData.resData.models[i].isGift == 1){
                                            this.$set(this.activeIndex,2,1);
                                        }
                                    }

                                    console.log(data.resData.data.name);
                                    if(data.resData.data.name == '升级好礼'){
                                        this.showText = true;
                                        this.activeText = this.upgrade[this.activeIndex[0]];
                                    }else if(data.resData.data.name == '会员加息'){
                                        this.showText = true;
                                        this.activeText = this.memberUpapr[this.activeIndex[1]];
                                    }else if(data.resData.data.name == '会员日'){
                                        this.showText = true;
                                        this.activeText = this.memberDay[this.activeIndex[2]];
                                    }
                                }
                            },{})
                        }
                        if(this.privilegeData.h5Url){
                            this.appRouter(this.privilegeData.h5Url,{},1);
                        }
                    }
                },{id:this.$route.query.id})
            },
            toVipWelfare(){
                if(this.osType){
                    this.PassValue('VipBoon');
                }else{
                    this.$router.push('/wxMyAccount/vipWelfare');
                }
            },
            getGift(){
                
            }
    	},
        components:{
            
        },
    	created(){
    		this.getPrivilege();
    	},
        mounted(){
            if(this.$route.query.prerogativeName == '升级好礼'){
                this.activeText = this.upgrade[0];
            }
        }
    }
</script>

<style lang="scss">
    #particulars{
        .tips{
            span{
                display:inline-block;
                font-size: 0.346667rem;
                color: #CB9949;
                border-bottom: 1px solid #CB9949;
            }
        }
        
    }
</style>

<style lang="scss" scoped>
    #particulars{
        color: #333;
        font-family: PingFang-SC-Medium;
        .common_box{
            .top-img{
                height: 4.933333rem;
                width: 100%;
            }
            .title{
                display:block;
                height:0.933333rem;
                width:2.933333rem;
                margin:0 auto 0.4rem;
            }
            .content{
                width:100%;
                padding:0 0.533333rem 1.36rem;
                background:#E7C68F;
                .explain{
                    border-top-right-radius: 0.213333rem;
                    border-top-left-radius: 0.213333rem;  
                    background:#fff;
                    padding:0.533333rem 0.533333rem;
                    .tips{
                        padding-bottom: 0.533333rem;
                        line-height:0.453333rem;
                        font-size: 0.346667rem;
                        font-size: 0.346667rem;
                        color: #333333;
                        text-align:center;
                        img{
                            height: 0.32rem;
                            width: 0.386667rem;
                            margin-right: 0.08rem;
                        }
                        span{
                            display:inline-block;
                            font-size: 0.346667rem;
                            color: #CB9949;
                            border-bottom: 1px solid #CB9949;
                        }
                    }
                    ul{
                        padding-bottom:0.666667rem;
                        li{
                            font-size:0.373333rem;
                            line-height:0.586667rem;
                            padding-bottom:0.266667rem;
                            .num{
                                height:0.533333rem;
                                width:0.533333rem;
                                border-radius: 50%;
                                background:#FFCB35;
                                color:#fff;
                                text-align: center;
                                line-height:0.533333rem;
                                margin-right:0.24rem;
                            }
                            .text{
                                width:7.066667rem;
                                text-align:justify;
                            }
                        }
                    }
                }
                .details{
                    background:#fff;
                    padding:0 0.533333rem;
                    ul{
                        padding-bottom:0.666667rem;
                        li{
                            height:0.933333rem;
                            line-height:0.933333rem;
                            font-size:0.373333rem;
                            color:#935E00;
                            text-align:center;
                            .vip{
                                width:2.4rem;
                            }
                            .gift{
                                width:4.426667rem;
                            }
                        }
                        li:nth-child(odd){
                            background:#FFFBEA;
                        }
                    }
                    .vip{

                    }
                }
                p{
                    background:#fff;
                    font-size:0.32rem;
                    line-height:0.48rem;
                    text-align:justify;
                    padding:0 0.8rem 0.293333rem 1.32rem;
                }
                .bottom{
                    width:100%;
                    background:#fff;
                    height:2.213333rem;
                    display:block;
                    padding:0.293333rem 0.8rem 0rem;
                    border-bottom-left-radius: 0.213333rem;
                    border-bottom-right-radius: 0.213333rem;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
            }
        }
        .full_screen{
            img{
                width: 100%;
            }
        }
    }
</style>