<template>
 <div id="wxIssueClassift">
     <h3>问题分类</h3>
     <ul>
         <li v-for="val in issueClassify" @click="goHelp(val.url)">
             <img :src="val.img" alt="">
             <p v-html="val.text"></p>
         </li>
     </ul>
 </div>
</template>

<script>
    export default {
       data(){
           return{
               issueList: [
                   
               ]
           }
       },
       props:['issueClassify'],
       methods:{
           goHelp(val){
               this.$router.push({path:val})
           }
       }
    }
</script>

<style lang="scss" scoped>
    #wxIssueClassift{
        width: 100%;
        background: #fff;
        position: relative;
        overflow: hidden;
        margin-bottom: .266667rem;
        padding-bottom: 0.133333rem;
        font-family: PingFangSC-Regular;
        h3{
            font-family: PingFangSC-Medium;
            font-size: 0.426667rem;
            color: #333333;
            width: 100%;
            height: .6rem; 
            margin: .4rem 0 .533333rem .533333rem;
            line-height: .6rem;
        }
        ul{
            // padding: 0 1.066667rem;
            li{
                width: 33.33%;
                float: left;
                text-align: center;
                margin-bottom: .533333rem;
                img{
                    width: 1.173333rem;
                    height: 1.173333rem;
                    margin-bottom: .266667rem;
                }
                p{
                   font-size: .32rem;
                   color: #333;
                   line-height: .44rem;
                }
            }
        }
    }
</style>

