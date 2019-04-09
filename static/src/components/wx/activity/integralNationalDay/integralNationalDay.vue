<template>
    <div id="integralNationalDay">
        <div v-title>积分商城 与爱同行</div>
        <!-- 测试跳转APP我的红包页面 -->
        <div class="myRed" @click="myRedPage">我的红包</div>
        <div class="time_box">{{startTime}}-{{endTime}}</div>
        <div class="list_title" @click.stop="goIntGoodList"></div>
        <!-- 商品列表 -->
        <div class="commodity_list_box">
            <ul class="clear">
                <li v-for="item in goodsList" @click="exchangeFun(item.goodsId)">
                    <div class="img">
                        <div class="goodsPath" :style="{background:'url('+item.picPath+') no-repeat center center / 100%'}"></div>
                    </div>
                    <p class="img_title">{{item.goodsName}}</p>
                    <div class="integral_box clear">
                        <span class="discount_text">{{item.discount}}折</span>
                        <span class="int_text">{{item.score | discountCount(item.discount,10)}}<em>积分</em></span>
                    </div>
                    <div class="list_btn" ></div>
                </li>
            </ul>
        </div>

        <!-- 规则提示 -->
        <div class="rule_text" v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</div>

        <!-- 底部 -->
        <div class="btn_box clear">
            <div class="btn fl" @click="goCharitable"></div>
            <div class="btn fl" @click="goIntGoodList"></div>
        </div>
    </div>
</template>

<script>
import wxToapp from "../../../../common/wx/wxToapp";
import wxShare from "../../../../common/wx/wxShare.js";
import { MessageBox } from 'mint-ui'
export default {
  mixins: [wxShare, wxToapp],
  data(){
      return{
        goodsList:[],   // 商品列表
        loginStatus:0,  // 是否登录 0、未登录  1、已登录
        activityCategoryId:0,   // 活动标识
        activityStatus:1,//活动状态
        startTime:'',
        endTime:'',
        shareObj:{  // 分享参数配置
            title: "积分商城，与爱同行", 
            desc: "嘘，偷偷告诉你个好消息，积分商城在打折，参与过积分公益献爱心，折扣更大哦~",
            link: global.host+"integral/integralNationalDay", 
            imgUrl: "https://aliyunsso.edspay.com/web/icon.png"
        }
      }
  },
  methods:{
      getActiveTime(activityId){   // 活动时间
          this.getNotlogData('/activity/two/getActivityTime', (data) => {
             if(data.resCode){            
                this.activityStatus = data.resData.active;  // 活动时间;
                this.startTime = data.resData.startTime.split(" ")[0].split("-").join("."); // 开始时间
                this.endTime = data.resData.endTime.split(" ")[0].split("-").join(".").substr(-5);  // 结束时间
                if(data.resData.active == 2){
                    MessageBox('温馨提示', '该活动尚未开始！');
                } else if(data.resData.active == 3){
                    MessageBox('温馨提示', '该活动已结束！');
                }
             }
          },{activityId:activityId})
      },

      goodsData(){     // 商品列表
          this.getNotlogData('/goods/activityGoods',(res) => {
              console.log(res)
            if(res.resCode){
                this.goodsList = res.resData.scoreGoosModels;
                this.loginStatus = res.resData.loginStatus;
                this.activityCategoryId = res.resData.activityCategoryId;
            }
          },{})
      },   
      // 测试跳转APP我的红包
      myRedPage(){  
         if(this.activityStatus == 2){
             MessageBox('温馨提示', '该活动尚未开始！');
         } else if(this.activityStatus == 3){
             MessageBox('温馨提示', '该活动已结束！');
         } else {
             if(this.loginStatus == 0){
                 this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
             } else {
                 this.toApp('RP',{path:'/wxMyAccount/wxRedPacket',query:{thisUrl:this.$route.fullPath}})
             }
         }
      },

      exchangeFun(id){    // 点击兑换事件
          if(this.activityStatus == 2){
                MessageBox('温馨提示', '该活动尚未开始！');
          } else if(this.activityStatus == 3){
                MessageBox('温馨提示', '该活动已结束！');
          } else {
                if(this.loginStatus == 0){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                } else {
                    this.appRouter('/intGoodDetail',{goodsId:id})
                    // this.$router.push({
                    //     path:'/intGoodDetail',
                    //     query:{goodsId:id}
                    // })
                }
          }
          
      },
      
      goIntGoodList(){   // 查看更多跳转
          _czc.push(﻿["_trackEvent", "查看更多", "跳转查看更多按钮"]); //  友盟统计配置
          if(this.activityStatus == 2){
                MessageBox('温馨提示', '该活动尚未开始！');
          } else if(this.activityStatus == 3){
                MessageBox('温馨提示', '该活动已结束！');
          } else {
                if(this.osType == 'IOS'){
                    this.PassValue('GoodsList_1');
                } else if(this.osType == 'Android'){
                    this.PassValue('GoodsList_1');
                } else {
                    this.$router.push({
                        path:'/intGoodList',
                        query:{classify:1}
                    })
                }
          }
          
          
      },

    //   goIntIndex(){   // 跳转积分商城
    //       _czc.push(﻿["_trackEvent", "积分商城", "跳转积分商城按钮"]); //  友盟统计配置
    //       this.toApp('PointsMall',{path:'/intIndex',query:this.$route.query});
    //   },
      goCharitable(){   // 跳转积分公益
          _czc.push(﻿["_trackEvent", "积分公益", "跳转积分公益按钮"]); //  友盟统计配置
           if(this.activityStatus == 2){
                MessageBox('温馨提示', '该活动尚未开始！');
          } else if(this.activityStatus == 3){
                MessageBox('温馨提示', '该活动已结束！');
          } else {
              this.$router.push({
                path:'/charitable',
                query:this.$route.query
              })
          }
          
      }
  },
  mounted() {
         // 友盟数据统计
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1274719798&web_id=1274719798 '
        script.language = 'JavaScript'
        document.body.appendChild(script);

        // 微信分享调用
        this.getWxShareData(this.shareObj);
        
        // app title跳转变化
        this.PassValue('NavWhite_积分商城 与爱同行');
  },
  created(){
      this.goodsData();   // 商品列表
      this.getActiveTime('sc_gq_activity');  // 活动时间
  },
  watch:{
      '$route'(){
          if(window._czc) { // 友盟数据统计监听
            let location = window.location
            let contentUrl = location.pathname + location.hash
            let refererUrl = '/'
            window._czc.push(['_trackPageview', contentUrl, refererUrl])
        }
      }
  }
};
</script>

<style lang="scss" scoped>
      #integralNationalDay{
          position: relative;
          overflow: hidden;
          width: 100%;
          height: 52.293333rem;
          background: url(https://aliyunsso.edspay.com//web/wx/integralStroe/integralNationalDay/wx_bg.png?v=1.3) no-repeat;
          background-size: cover;
          padding-top: 14.986667rem;
          .time_box{
              color: #fff;
              font-size: .373333rem;
              position: absolute;
              top: 7.3rem;
              left: .853333rem;
              font-family: PingFang-SC-Bold;
          }
          .list_title{
                 width: 2rem;
                 height: .8rem;
                 position: absolute;
                 top: 13.5rem;
                 right: .2rem;
                 z-index: 10;
            }
         .commodity_list_box{
             width: 100%;
             height: auto;
             padding:0 .533333rem;
             margin-bottom: .4rem;
             ul{
                 width: 100%;
                 overflow: hidden;
                 li{
                    width: 4.266667rem;
                    height: 6.533333rem;
                    float: left;
                    margin-bottom: .4rem;
                    background: url(https://aliyunsso.edspay.com//web/wx/integralStroe/integralNationalDay/list_bg.png) no-repeat;
                    background-size: 100% 100%;
                    position: relative;
                    .img{
                        width: 3.84rem;
						height: 3.453333rem;
						margin: .213333rem auto .466667rem;
						background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/goods_default_img.png) no-repeat;
						background-size: 100%;
                        .goodsPath{
							width: 100%;
							height: 100%;
						}
                    }
                    .img_title{
                        width: 100%;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        font-family: PingFangSC-Medium;
                        font-size: .373333rem;
                        line-height: .533333rem;
                        color: #333333;
                        padding:0 .373333rem;
                        margin-bottom:.24rem;
                    }
                     
                    .integral_box{
                        padding: 0 .4rem;
                        margin-bottom: .013333rem;
                        .discount_text{
                            width: 1.066667rem;
                            height: .453333rem;
                            line-height: .44rem;
                            float: left;
                            font-size: .32rem;
                            color: #FFFFFF;
                            text-align: center;
                            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/integralNationalDay/discount_bg.png) no-repeat;
                            background-size: cover;
                            display: inline-block;
                            margin-top: .05rem;
                        }
                        .int_text{
                            font-family: DIN-Bold;
                            font-size: .4rem;
                            color: #FF5B4C;
                            line-height: .48rem;
                            display: inline-block;
                            float: right;
                            em{
                                font-family: PingFangSC-Regular;
                                font-size: .293333rem;
                                color: #808080;
                                margin-left: 6px;
                            }
                        }
                    }
                    .list_btn{
                        width: 3.866667rem;
                        height: .88rem;
                        margin: 0 auto;
                        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/integralNationalDay/btn.png?v=1.2) no-repeat;
                        background-size: cover;
                        
                    }
                 }
                 li:nth-child(odd){
                     margin-right: .4rem;
                 }
             }
         }

          .btn_box{
              width: 100%;
              height: 1.333333rem;
              position: fixed;
              left: 0; bottom: 0;
              z-index: 1000;
              .btn{
                  width: 50%;
                  height: 100%;
              }
              .btn:nth-child(1){
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/integralNationalDay/btn1.png) no-repeat;
                background-size: cover;
              }
              .btn:nth-child(2){
                  background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/integralNationalDay/btn2.png) no-repeat;
                background-size: cover;
              }
          }
          .rule_text{
                font-family: PingFang-SC-Regular;
                font-size: .346667rem;
                margin-bottom: .533333rem;
                color: #FFFFFF;
                text-align: center;
          }
          .myRed{    // 测试跳转原生红包页面
               
               width: 2.666667rem;
               height: 1.333333rem;
               text-align: center;
               line-height: 1.333333rem;
               background: blue;
               color: #fff;
               position: absolute;
               top: .133333rem;
               right: .133333rem;
               font-size: .266667rem;
               border-radius: .266667rem;
          }
      }
</style>

