<template>
    <div id="cateIndex">
        <img @click="showPopup.cateRule = true" src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/food-rule.png" alt="" class="rule">
        <ul class="prize between clear">
            <li>
                <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/foodIcon1.png" alt="">
                <div v-if="hasid.length < 2" class="grey"></div>
            </li>
            <li>
                <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/foodIcon2.png" alt="">
                <div v-if="hasid.length < 4"  class="grey"></div>
            </li>
            <li>
                <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/foodIcon3.png" alt="">
                <div v-if="hasid.length < 6" class="grey"></div>
            </li>
            <li>
                <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/foodIcon4.png" alt="">
                <div v-if="hasid.length < 9" class="grey"></div>
            </li>
        </ul>
        <div class="tips">
            <div class="back-color"></div>
            <ul ref="ulList">
                <li class="fl" ref="list">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/qqR.png" alt="">
                    <p>您有{{lightenNumber}}种美食可点亮</p> 
                </li>
                <li class="fl">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/qqR.png" alt="">
                    <p>您有{{lightenNumber}}种美食可点亮</p> 
                </li>
            </ul>
        </div>
        <ul class="cate-list clear">
            <li v-for="item in food" class="fl">
                <img v-if="hasCate(item.id)<0" :src="item.imgUrl" alt="">
                <img v-else :src="item.actUrl" alt="">
                <div v-if="hasCate(item.id)<0" @click="addId(item.id)" class="btn"></div>
            </li>
        </ul>
        <pop-tips v-if="showTips.tips1 || showTips.tips2 || showTips.tips3" :showPopup="catePopup" :showTips="showTips"></pop-tips>
        <div v-if="showTips.invite" @click="showTips.invite = false" v-layer class="layer"></div>
        <div @click="toLogin" v-if="!userId && !getCookie('userToken')" v-layer class="toLogin"></div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import popTips from './popUp/tips.vue';
    
    import { MessageBox } from 'mint-ui';
    export default{
        mixins:[wxToapp],
    	data(){
    		return{
                food:[
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food1.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food1.png',
                        id:'1'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food2.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food2.png',
                        id:'2'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food3.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food3.png',
                        id:'3'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food4.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food4.png',
                        id:'4'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food5.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food5.png',
                        id:'5'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food6.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food6.png',
                        id:'6'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food7.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food7.png',
                        id:'7'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food8.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food8.png',
                        id:'8'
                    },
                    {
                        imgUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/greyFood/food9.png',
                        actUrl:'https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/brightFood/food9.png',
                        id:'9'
                    },
                ],
                showTips:{
                    tips1:false,
                    tips2:false,
                    tips3:false,
                    invite:false,
                    cateRule:false,
                },
                hasid:[],
                catePopup:{},
                lightenNumber:'0',
                isLighten:true,
                userData:{},
    		}
    	},
        props:['showPopup'],
    	methods:{
            toLogin(){
                if(this.osType){
                    this.PassValue('LG|亲，请登录后参与福利活动！|登录')
                }else{
                    MessageBox.confirm('亲，请登录后参与福利活动！').then(action => {
                        this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });   //路由
                    }, action => { });
                }
            },
            addId(id){
                if(this.lightenNumber <= 0){
                    if(this.isLighten){
                        this.showTips.tips2 = true;
                    }else{
                        this.showTips.tips3 = true;
                    }
                }else{
                    this.getAppData('/activity/lantern/listCateRule',(data) => {
                        if(data.resCode){
                            this.hasid.push(id);
                            this.lightenNumber = data.resData.lightenNumber;
                            this.showTips.tips1 = true;
                        }
                    },{id:id})
                }
            },
            hasCate(id){
                return this.hasid.indexOf(id);
            },
            getUserData(){
                this.getAppData('/activity/lantern/listCate', data => {
                    if(data.resCode){
                        this.hasid = data.resData.list;
                        this.lightenNumber = data.resData.lightenNumber;
                        this.isLighten = data.resData.isLighten;
                    }
                },{})
            }
    	},
        components:{
            popTips,
        },
    	created(){
            this.catePopup = this.showPopup;
    		if(this.userId || this.getCookie('userToken')){
                this.getUserData(); 
            }
    	},
        mounted(){
            var that = this;
            var index = 0;
            var ulWidth = this.$refs.list.clientWidth
            this.timer = window.setInterval(function() {
                if (index >= ulWidth) {
                    index = 0
                }
                that.$refs.ulList.style.left = -(ulWidth - (ulWidth - (index++))) + 'px';
            }, 20)
        },
        destroyed(){
            clearInterval(this.timer)
        }
    }
</script>

<style lang="scss" scoped>
    #cateIndex{
        width: 9.466667rem;
        height: 18.4rem;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/foodBg.png');
        background-size:100% 100%;
        position: relative;
        .toLogin{
            width: 9.466667rem!important;
            height: 18.4rem!important;
            background: rgba(0,0,0,0)!important;
            z-index: 666!important;

            position: absolute!important;
        }
        .rule{
            position: absolute; 
            width: 1.013333rem;
            height: 1.493333rem;
            top:2.68rem;
            right: 0.133333rem;
            z-index: 777;
        }
        .layer {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
            background-size: 100%;
        }
        .prize{
            padding: 0.6rem 0.08rem 0.36rem 0.053333rem;
            li{
                height: 2.32rem;
                width: 2.32rem;
                float: left;
                position: relative;
                img{
                    width:100%;
                    height: 100%;
                }
                .grey{
                    position: absolute;
                    top:0;
                    left:0;
                    height: 2.1rem;
                    width: 2.4rem;
                    background: rgba(0,0,0,.3);
                }
            }
        }
        .tips{
            width: 5.013333rem;
            height: 1.12rem;
            margin: 0 auto;
            position: relative;
            overflow: hidden;
            left:0.106667rem;
            .back-color{
                position: absolute;
                top: 0.56rem;
                left:0;
                height: 0.613333rem;
                width: 5.013333rem;
                z-index: 6;
                background: rgba(255,255,255,.6);
                border-radius: 0.32rem;
            }
            ul{
                position: absolute;
                width: 10.1rem;
                top:0;
                left:0;
                z-index: 8;
                li{
                    img{
                        height: 1.12rem;
                        width: 0.66rem;
                        float: left;
                    }
                    p{
                        float: left;
                        font-size: 0.4rem;
                        line-height: 0.4rem;
                        color: #BE0E00;
                        padding: 0.666667rem 0.533333rem 0 0.266667rem;
                    }
                }
            }
        }
        .cate-list{
            padding: 0.1rem 0.133333rem 0;
            position: relative;
            li{
                padding-bottom: 0.16rem;
                position: relative;
                img{
                    display:block;
                    height: 3.2rem;
                    width: 2.666667rem;
                }
                .btn{
                    position: absolute;
                    height: 0.72rem;
                    width:1.626667rem;
                    bottom: -0.3rem;
                    left:0.506667rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/illume.png') no-repeat;
                    background-size:100% 100%;
                }
            }
            li:nth-child(3n-1){
                margin: 0 0.58rem;
            }
            li:nth-child(4),li:nth-child(5),li:nth-child(6){
                margin-top:0.4rem;
                margin-bottom: 0.35rem;
            }
        }
    }
</style>