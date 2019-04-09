<template>
    <div id="gameList">
        <div v-title>游戏专区</div>
        <div class="list" v-for="v in gameList">
            <router-link v-if="v.link" :to="{ path: v.link, query: $route.query}" tag="a">
                <img :src="v.pic">
            </router-link>
            <img v-else :src="v.pic" alt="">
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    export default {
        mixins:[wxToapp],
        data() {
            return {
                gameList:[  // 活动列表
                    {
                        pic:'https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/LuckDraw.png',
                        link:'/LuckDraw'
                    },
                    {
                        pic:'https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/LuckyDice.png',
                        link:'/LuckyDice'
                    },
                    {
                        pic:'https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/expect.png',
                        link:''   // 尽情期待的图片链接为空即可
                    }
                ],
            }
        },
        methods: {

        },
        created: function() {
            this.PassValue('NavWhite_游戏专区');
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #gameList{
        width: 100%;
        padding-top: .533333rem;
        .list{
            margin: 0 auto 0.4rem;
            width: 9.2rem;
            height: 3.466667rem;
            border-radius: .106667rem;
            overflow: hidden;
            a, img{
                // border-radius: 0.106667rem;
                width: 100%;
                height: 100%;
                display: block;
            }
        }
        .list.expect{
            height: 2rem;
        }
    }
</style>
