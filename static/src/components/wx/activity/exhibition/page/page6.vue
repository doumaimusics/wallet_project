<template>
    <div class="page6 page">
        <img class="textGif" src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/page6/page6text.gif" alt="">
        <div class="run"></div>
        <div @click="toApp('WIP','/wxInvest')" class="btn btn1">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/page6/brave.png" alt="">
        </div>
        <div @click="shareBrave" class="btn btn2">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/page6/share.png" alt="">
        </div>
        <img src="https://aliyunsso.edspay.com/web/wx/activity/exhibition/page6/logo.png" alt="" class="text">
        <p>市场有风险,出借需谨慎</p>
    </div>
    
</template>

<script>
    import wxShare from '../../../../../common/wx/wxShare'
    export default{
        mixins:[wxShare],
    	data(){
    		return{
                shareObj: { //分享标题内容配置
                    title: "不瞒你说，我真的不勇敢……", //标题
                    desc: "谁来帮帮我？",//内容
                    link: global.host+"exhibition", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/exhibition/fenxiang.png" //图片链接
                }
    		}
    	},
        props:['showLayer','swiper','swiperOption'],
    	methods:{
            shareBrave(){
                if (!this.osType) {
                    this.showLayer.show = true;
                } else {
                    this.PassValue(this.appShare)
                }
            }
    	},
    	created(){
    		
    	},
        mounted: function() {
            var that = this;
            console.log(global.host)
            this.getWxShareData(this.shareObj); //分享调用
            that.swiperOption.onlyExternal = false;
        },
    }
</script>

<style lang="scss" scoped>
    .page6{
        padding-top:0.15rem;
        .textGif{
            height:3.3rem;
            width:8.52rem;
            margin:0 auto;
            display: block;
        }
        .run{
            margin:-1.7rem auto 0;
            height:8.346667rem;
            width:7.253333rem;
            background:url(https://aliyunsso.edspay.com/web/wx/activity/exhibition/page6/run.gif);
            background-size:100% 100%;
        }
        .btn{
            height:2.4rem;
            width:5.6rem;
            margin:0 auto;
            img{
                height:100%;
                width:100%;
            }
        }
        .btn2{
            margin-top:-0.3rem;
        }
        .btn1{
            margin-top: -0.9rem;
        }
        .text{
            display:block;
            height:0.4rem;
            width:5rem;
            margin:-0.2rem auto 0;
        }
        p{
            font-size: 0.32rem;
            line-height: 0.533333rem;
            text-align: center;
            padding-top: 0.213333rem;
            color: #D8A023;
        }
    }
</style>