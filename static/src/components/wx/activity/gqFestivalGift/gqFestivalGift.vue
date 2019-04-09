<template>
    <div class="mid_main">
        <div v-title>每逢佳节(一)</div>
        <div class="rule_btn" @click="isRule = true"></div>
        <div v-layer v-if="isRule">
            <div class="rule_box">
                <div class="close_btn" @click="isRule = false"></div>
                <p v-if="osType == 'IOS'">4、本活动与苹果公司无关。</p>
            </div>
        </div>
        <!-- 按钮 -->
        <div class="list_box">
            <ul>
                <li v-for="index in 6">
                    <div class="list_btn" @click="showPop(index)"></div>
                </li>
            </ul>
        </div>

        <!-- 活动结束弹框 -->
        <div v-layer v-if="isOpenEnd">
            <div class="mid-end" >
                <div class="endBtn" @click="isOpenEnd=false"></div>
            </div>
        </div>

        <!-- 投资框-->
        <gqPop :isUp="isUp" :id="id" :isEnd="isEnd" @close="close" @showEnd="isOpenEnd = true"></gqPop>
    </div>
</template>
<script>
   import gqPop from './gqPop';
   import wxToapp from '../../../../common/wx/wxToapp';
   export default{
       mixins:[wxToapp],
       data(){
           return{
               isRule:false,
               isUp:false,
               id:1,
               isOpenEnd:false,
               isEnd:false,
           }
       },
       methods:{
          // 弹出pop
            showPop (val) {
                this.isUp = true
                this.id = val - 1
            },
            // 关闭pop
            close () {
                this.isUp = false
            },
            // 判断活动时间
            getTime () {
                this.notLogPost('/activity/two/getActivityTime',(data) =>{
                    console.log(data)
                    if(data.resCode == 1){
                        if (data.resData.active == 3) {
                            this.isOpenEnd = true
                            this.isEnd = true
                        }
                    }
                },{activityId:'con_gqGift_activity'})
            },

            init(id) {
                const script = document.createElement('script')
                script.src = 'https://s13.cnzz.com/z_stat.php?id=' + id + '&web_id=' + id
                script.language = 'JavaScript'
                document.body.appendChild(script)
            },
       },
       created(){
           this.getTime();
       },
       mounted() {
           this.init(1274864347);
       },
       components: {
        gqPop
       },
       watch:{
        '$route' () {
            if(window._czc) { // 友盟数据统计监听
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        }
    },
   }
</script>
<style lang="scss" scoped>
  .mid_main{
      width: 100%;
      height: 33.306667rem;
      background: url(https://aliyunsso.edspay.com/web/wx/activity/gqFestivalGift/wx_bg.png) no-repeat;
        background-size: 100% 100%;
        position: relative;
        padding-top: 15.626667rem;
    .rule_btn{
        width: 2.04rem;
        height: .68rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/gqFestivalGift/rule_btn.png) no-repeat;
        background-size: 100% 100%;
        position: fixed;
        right: 0;
        top: .76rem;
    }    
    .rule_box{
         width: 8.133333rem;
         height: 9.173333rem;
         background: url(https://aliyunsso.edspay.com/web/wx/activity/gqFestivalGift/rule_box.png?v=1.3) no-repeat;
         background-size: 100% 100%;
         position: absolute;
         top:0;bottom: 0;
         left: 0;right: 0;
         margin: auto;
         padding: 7.2rem 0 0 1.266667rem;
         .close_btn{
             width: .826667rem;
             height: .826667rem;
             position: absolute;
             top: 0;
             right: 0;
         }
         p{
            font-size: .32rem;
            color: #da441d;
         }
    }
    .list_box{
        width: 100%;
        overflow: hidden;
        ul{
            padding: 0 1.066667rem 0 1.12rem;
           li{
                width: 3.733333rem;
                height: 4.826667rem;
                float: left;
                margin-bottom: .92rem;
                padding-top: 4.01rem;
                position: relative;
                .list_btn{
                    width: 2.56rem;
                    height: .653333rem;
                    margin: 0 auto;
                }
            } 
            li:nth-child(odd){
                margin-right: .306667rem;
            }
        }
         
    }
    .mid-end {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        width: 8.133333rem;
        height: 6.066667rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/gqFestivalGift/end_box.png) no-repeat;
        background-size: 100% 100%;
        .endBtn {
            width: 4.4rem;
            height: 1.15rem;
            margin: 4.285555rem 1.9rem 0;
        }
    }
  }
</style>

