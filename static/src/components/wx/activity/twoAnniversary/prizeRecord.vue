<template>
    <div id="prizeRecord" :style="fullHeight">
        <div v-title>领取记录</div>
        <ul v-if="goodsRecord.length > 0">
            <li class="bdr-b" v-for="v in goodsRecord">
                <div class="pic fl" :style="{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/record'+ v.goodsId +'.png) no-repeat center center / 100% 100%'}"></div>
                <div class="desc">
                    <p>{{v.name}}</p>
                    <span>{{v.addTime}}</span>
                </div>
            </li>  
        </ul>
        <div class="null" :style="fullHeight" v-else>
            <div class="nullPic"></div>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp.js';   // 分享
    export default {
        mixins: [wxToapp],
        data() {
            let _this = this
            return {
                goodsRecord:[],
                fullHeight:{
					minHeight: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
				},
            }
        },
        methods: {
            gitData(){
                this.getAppData('/activity/2years/goodsRecord', data => {
                    if(data.resCode == 1) {
                        this.goodsRecord = data.resData.data;
                    }
                }, {},1);
            }
        },
        created: function() {
            this.gitData()
            this.PassValue('NavWhite_领取记录');
        },
        mounted: function() {

        },
        deactivate(){
            
        },

   }
</script>

<style lang="scss" scoped>
    #prizeRecord {
        width: 100%;
        background: #fff;
        padding: 0 .533333rem;
        height: 100%;
        li{
            width: 100%;
            height: 2.4rem;
            padding: .266667rem 0;
            position: relative;
            .pic{
                width: 1.866667rem;
                height: 1.866667rem;
                margin-right: .4rem;
            }
            p{
                height: .613333rem;
                margin-top: .35rem;
                font-family: PingFangSC-Regular;
                font-size: .4rem;
                color: #000000;
                letter-spacing: .0132rem;
                line-height: .613333rem;
            }
            span{
                font-family: PingFangSC-Regular;
                font-size: .32rem;
                color: #808080;
                height: .586667rem;
                line-height: .586667rem;
            }
        }
        .null{
            background: #fff;
            position: relative;
            .nullPic{
                width: 5.2rem;
                height: 4.306667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/null.png)no-repeat center center / 5.2rem 4.306667rem;
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                margin: auto;
            }
        }
    }
</style>
