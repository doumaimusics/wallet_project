<template>
    <div v-layer id="cateRule">
        <div class="content">
            <div class="rule-content">
                <div @click="showPopup.cateRule = false" class="close"></div>
                <div class="text">
                    <div class="img">
                        <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/care-rule-text.png" alt="">
                    </div>
                        <a href="tel:400-135-3388" style="color: #48a4ff;" class="phone">400-135-3388</a>
                    <p style="font-family: DIN-Medium;font-size:0.32rem;color:#fff;padding:0.106667rem 0.24rem;" v-if="osType == 'IOS'">本活动与苹果公司无关！</p>
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

    		}
    	},
        props:['showTips','showPopup'],
    	methods:{

    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #cateRule{
        padding-top: 3.2rem;
        .content{
            height: 9.333333rem;
            width: 8.0rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/catePop/catereGulation.png) no-repeat;
            background-size: 100% 100%;
            margin: 0 auto;
            position: relative;
            padding-top: 0.8rem;
            .rule-content{
                overflow: hidden;

            }
            .text{
                height: 8rem;
                width: 7rem;
                margin: 0 auto;
                overflow-y: auto;
                    .phone{
                        line-height: 0.52rem;
                        font-size: 0.373333rem;
                        padding-left:0.4rem;
                    }
                img{
                    display: block;
                    width: 6.8rem;
                    height: 14.32rem;
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
        }
    }
</style>