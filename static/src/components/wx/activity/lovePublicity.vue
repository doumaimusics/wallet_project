<template>
   <div id="lovePublicity">
       <div v-title>E公益 新征程</div>
       
       <div class="linkBox">
           <ul>
               <li v-for="v in linkList"><a :href="v"></a></li>
           </ul>
       </div>
   </div>
</template>

<script>
    export default {
        data() {
            let _this = this
            return {
                linkList:[
                    'http://vr.sina.com.cn/news/hz/2018-05-16/doc-iharvfht7739152.shtml',
                    'http://industry.caijing.com.cn/20180516/4453759.shtml',
                    'http://if.stockstar.com/CP2018051700000776.shtml',
                    'http://tech.china.com/article/20180515/kejiyuan0326137388.html',
                    'http://www.chinahightech.com/html/2018/xinxi_0517/467436.html',
                    'http://hy.stock.cnfol.com/bankuaijujiao/20180516/26432145.shtml'
                ]
            }
        },
        methods: {

        },
        created: function() {

        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #lovePublicity{
        position: relative;
        top: 0;
        left: 0;
        width: 100%;
        height: 59.546667rem;
        background: url(https://aliyunsso.edspay.com/web/tpl/lovePublicity.png)no-repeat left top / 100% 100%;
        .linkBox{
            width: 100%;
            height: 3rem;
            position: absolute;
            left: 0;
            top: 46rem;
            padding: .4rem .3rem;
            ul{
                li{
                    width: 33.33%;
                    height: .85rem;
                    float: left;
                    margin-bottom: .42rem;
                    a{
                        display: block;
                        width: 100%;
                        height: 100%;
                    }
                }
            } 
        }
    }
</style>
