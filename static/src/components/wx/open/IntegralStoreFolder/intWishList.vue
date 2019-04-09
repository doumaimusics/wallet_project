<template>
   <div id="intWishList">
       <div v-title>心愿排行榜</div>
       <!-- 规则按钮 -->
       <div class="rule_btn" @click.stop="rulePop = true"></div>

       <!-- 规则弹框 -->
       <div v-layer v-if="rulePop">
           <div class="rule_box">
               <div class="close_btn" @click.stop="rulePop = false"></div>
           </div>
       </div>
       

       <!-- 顶部 -->
       <div class="top_box">第{{$route.query.period}}期 {{$route.query.name}}</div>

       <!-- 1-3排名 -->
       <div class="top_three_box">
           <ul class="clear">
               <li v-for="(item,index) in topThreeList">
                   <div class="wish_icon"></div>
                   <p class="phone">{{item.phone}}</p>
                   <div class="text">
                       <span>{{item.score}}</span>积分
                   </div>
               </li>
           </ul>
       </div>

       <!-- 4-10排名 -->
       <div class="ranking_list_box">
           <ul>
               <li v-for="item in afterSevenList" class="bdr-b">
                   <span class="sign">{{item.sort < 10 ? '0'+item.sort : item.sort}}</span>
                   <span class="phone">{{item.phone}}</span>
                   <span class="number_text">{{item.score}}<em>积分</em></span>
               </li>
           </ul>
       </div>

       <!-- 底部 -->
       <div class="botton_box clear">
           <div class="mess_left_box" v-if="rankingData.loginStatus == '1'">
                   <i>我的排名</i>
                   <span>{{rankingData.sort}}</span>
                   <em v-if="rankingData.score != '0'">名</em>
           </div>
           <!-- {background:'url('+ v.iconBg +') no-repeat center center',backgroundPositionY: 'center'} -->
           <div class="mess_left_box" v-else style="background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/pm_bg.png) no-repeat 0 center;backgroundSize:3.813333rem 0.493333rem;width:3.813333rem"></div>
           <div class="mess_right_box" v-if="rankingData.loginStatus == '1'"> 
                   <span>{{rankingData.score}}</span>
                   <em>积分</em>
           </div>
           <div class="login_btn" @click="toLogIn" v-else>去登录</div>
       </div>
   </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    export default{
        mixins:[ wxToapp ],
        data(){
            return{
                rulePop:false,
                rankingData:{},
                topThreeList:[],  // 前三名数据
                afterSevenList:[],  // 后七名数据
            }
        },
        computed:{
        },
        methods:{
            toLogIn(){   // 去登录
                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
            },

            initData(){   // 积分商城初始化
                this.getNotlogData('/commonweal/loveList', (data) => {
                    console.log(data)
                    let sortData = null;
                    if(data.resCode == 1){
                        this.rankingData = data.resData;
                        sortData = this.rankingData.list.slice(0,3);  // 截取前三名
                        this.topThreeList = [sortData[0],sortData[1],sortData[2]] = [sortData[1],sortData[0],sortData[2]]; // 调换第一和第二名位置
                        this.afterSevenList = this.rankingData.list.slice(3)  // 截取后七名
                    }
                },{id:this.$route.query.projectId},1) 
            },
        },
        mounted() {
            // app title跳转变化
            this.PassValue('NavWhite_爱心榜');
        },
        created() {
            this.initData();
        },
    }
</script>

<style lang="scss" scoped>
   #intWishList{
         width: 100%;
         height: 18.5rem;
         background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/list_bg.png) no-repeat;
         background-size: 100% 100%;
         position: relative;
         overflow: hidden;
         .rule_btn{
             width: 2.093333rem;
             height: .493333rem;
             background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/rule_btn.png?v=1.0) no-repeat;
             background-size: 100% 100%;
             position: absolute;
             top: .493333rem;
             right: .386667rem;
         }
         .rule_box{
             width: 8.306667rem;
             height: 9.96rem;
             background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/rule_box.png?v=1.0) no-repeat;
             background-size:100% 100%; 
             position: absolute;
             top: 0;
             left: .426667rem;
             bottom: 0;
            //  right: 0;
             margin: auto;
             padding-top: 8.893333rem;
             .close_btn{
                  width: 1.066667rem;
                  height: 1.066667rem;
                  margin: 0 auto 0 4.04rem;
             }
         }
         .top_box{
             padding: .453333rem .4rem .533333rem;
             font-family: PingFangSC-Medium;
            font-size: .4rem;
            color: #FFFFFF;
         }

         .top_three_box{    // 前三名样式
             margin-bottom: .48rem;
             ul{
                 li{
                    width: 33.33%;
                    float: left;
                     color: #FFFFFF;
                     text-align: center;
                    .wish_icon{
                        width: 1.333333rem;
                        height: 1.333333rem;
                        margin: 0 auto .266667rem;
                    }
                    p.phone{
                        font-family: PingFangSC-Regular;
                        font-size: .346667rem;
                        margin-bottom: .08rem;
                    }
                    .text{
                        font-size: .293333rem;
                        span{
                            font-family: DIN-Medium;
                            font-size: .48rem;
                            margin-right: .026667rem;
                        }
                    }
                 }
                 li:nth-child(1),li:nth-child(3){
                     margin-top: .133333rem;
                 }
                 li:nth-child(1){
                    .wish_icon{
                        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/icon2.png?v=1.0) no-repeat;
                        background-size:100% 100% ;
                    }
                 }
                li:nth-child(3){
                    .wish_icon{
                        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/icon3.png?v=1.0) no-repeat;
                        background-size:100% 100% ;
                    }
                }
                 li:nth-child(2){
                     .wish_icon{
                        width: 1.466667rem;
                        height: 1.466667rem;
                        background: #999;
                        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/icon1.png?v=1.0) no-repeat;
                        background-size:100% 100% ;
                    }
                 }
             }
         }
         .ranking_list_box{
             width: 9.466667rem;
             height: 9.6rem;
             margin: 0 auto;
             background: #fff;
             border-radius:.266667rem;
             padding: 0rem .533333rem;
             ul {
                 li{
                      height: 1.346667rem;
                      line-height: 1.346667rem;
                      position: relative;
                     .sign{
                         font-family: DIN-Medium;
                         font-size: .4rem;
                         color: #C5C5C5;
                         padding-left: .026667rem;
                         margin-right: .56rem;
                     }
                     .phone{
                         font-family: PingFangSC-Regular;
                         font-size: .346667rem;
                         color: #333333;
                     }
                     .number_text{
                         height: 100%;
                            font-family: DIN-Medium;
                            font-size: .453333rem;
                            color: #333333;
                            float: right;
                         em{
                             font-family: PingFangSC-Regular;
                                font-size: .293333rem;
                                color: #808080;
                                line-height: .4rem;
                                margin-left: .026667rem;
                         }
                     }
                 }
                 li:last-child.bdr-b:after{
                     border: none;
                 }
             }
         }
         .botton_box{
             width: 100%;
             height: 1.573333rem;
             background: #fff;
             position: fixed;
             bottom: 0;left: 0;
             box-shadow: 0 0 .16rem 0 rgba(0,0,0,0.12);
             padding:0 .666667rem 0;
             .login_btn{
                 width: 1.653333rem;
                 height: .746667rem;
                 background: #F14B4B;
                 border-radius: .373333rem;
                 position: absolute;
                 top: .413333rem;
                 right: .666667rem;
                 font-family: PingFangSC-Regular;
                 font-size: .373333rem;
                 line-height: .746667rem;
                 color: #FFFFFF;
                 text-align: center;
             }
             .mess_left_box{
                font-family: PingFangSC-Regular;
                font-size: .346667rem;
                color: #333333;
               overflow: hidden;
                height: 1.573333rem;
                 line-height: 1.573333rem;
                float: left;
                span{
                    font-family: DIN-Medium;
                    font-size: .64rem;
                    color: #FF5B4C;
                    margin: 0 .08rem 0 .133333rem;
                    line-height: .72rem;
                    em{
                        font-family: PingFangSC-Regular;
                        font-size: .32rem;
                        color: #333333;
                    }
                }
             }
             .mess_right_box{
                 float: right;
                 height: 1.573333rem;
                 line-height: 1.573333rem;
                 text-align: right;
                 font-family: PingFangSC-Regular;
                font-size: .32rem;
                color: #808080;
                 span{
                     font-family: DIN-Medium;
                    font-size: .533333rem;
                    color: #FF5B4C;
                    letter-spacing: 0;
                 }
             }
         }
   }
</style>
