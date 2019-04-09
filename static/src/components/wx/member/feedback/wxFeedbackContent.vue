<template>
   <div id="wxFeedIn">
       <div class="main">
           <!-- 时间 -->
           <h3>{{userFeeback.addTime}}</h3>

           <!-- 反馈类型 -->
           <div class="feedb_type">
               <dl class="clear" v-if="userFeeback.feedType !=null && userFeeback.feedType !=''">
                   <dt>反馈类型：</dt>
                   <dd>{{userFeeback.feedType}}</dd>
               </dl>
           </div>

           <!--  问题描述 -->
           <div class="feedb_type" v-if="userFeeback.qsRemark != null && userFeeback.qsRemark != '' && userFeeback.qsRemark.replace(/(^\s*)|(\s*$)/g, '')!=''">
               <dl class="clear">
                   <dt>问题描述：</dt>
                   <dd>{{userFeeback.qsRemark}}</dd>
               </dl>
           </div>

           <!-- 上传图片 -->
           <div class="feedb_type" v-if="imgUrl != null && imgUrl != ''">
               <dl class="clear">
                   <dt>图片上传：</dt>
                   <dd>
                       <!-- <img :src="img" alt="" v-for="img in imgUrl"> -->
                       <ul class="clear">
                           <li v-for="img in imgUrl" @click="expand(img)">
                               <img :src="img" alt="">
                           </li>
                       </ul>
                   </dd>
               </dl>
           </div>

           <!-- 反馈状态 -->
           <div class="feedb_type">
               <dl v-if="userFeeback.fbStatus == '0'" class="clear">
                   <dt>反馈状态：</dt>
                   <dd style="color: #F5A40F;">处理中…</dd>
               </dl>
               <div v-else class="already">
                   
               </div>
           </div>

           <!-- 反馈回复 -->
           <div class="feedb_reply" v-if="userFeeback.fbStatus == '1' && userFeeback.handSug !=null && userFeeback.handSug !=''" >
               <dl class="clear">
                   <dt>反馈回复：</dt>
                   <dd>{{userFeeback.handSug}}</dd>
               </dl>
           </div>

       </div>

       <!--弹出框-->
        <div class="showPic" v-if="show" @click="show = false">
            <div class="imgBox">
                <img :src="showPic" alt="">
            </div>
        </div>
   </div>
</template>

<script>

    import wxToapp from '../../../../common/wx/wxToapp';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                show:false,
                showPic:'',
                userFeeback:{},
                imgUrl:null
            }
        },
        methods:{
            feedbackContent(){
                this.postData('/feedback/feedbackContent', (data) => {
                    console.log(data)
                    let imgData = '';
                    if(data.body.resCode == 1){
                        this.userFeeback = data.body.resData.userFeeback;
                        imgData = this.userFeeback.qsImgUrl;   // 图片地址
                        if(imgData != null && imgData != ''){
                           this.imgUrl = imgData.split(',');  // 分割图片
                        } else {
                           this.imgUrl = null;
                        }
                    }
                },{id:this.$route.query.id},1)
            },
            expand(src){
                this.showPic = src
                this.show = true
            }
        },
        created(){
            this.feedbackContent();
        },
        mounted(){
            var heightStyle = document.documentElement.clientHeight;
            $('.main').height(heightStyle);
        }
    }
</script>

<style lang="scss" scoped>
  #wxFeedIn{
      position: relative;
      width: 100%;
      background: #fff;
      font-family: PingFangSC-Regular;
      .main{
           padding: .4rem .6rem 0 .533333rem;
           position: relative;
           h3{
               font-size: .373333rem;
               color: #808080;
               margin-bottom: .266667rem;
           }
           .feedb_type{
               margin-bottom: .4rem;
           }
           dl dt{
               width: 20%;
               color: #808080;
               font-size: .346667rem;
               float: left;
           }
           dl dd{
               width: 80%;
               font-size: .373333rem;
               color: #333;
               float: left;
               
               ul{
                   width: 100%;
                   li{
                       width: 2rem;
                       height: 2rem;
                       float: left;
                       margin-right: .266667rem;
                       img{
                            width: 100%;
                            height: 100%;
                            // margin-right: .133333rem;
                        }
                   }
               }
           }
           .already{
               width: 2.413333rem;
               height: 2.413333rem;
               background: url('https://aliyunsso.edspay.com/web/wx/helpCenter/already_icon.png?v=1.0') no-repeat;
               background-size: cover;
               position: absolute;
               top:.826667rem;
               right: .373333rem;
           }
      }
      .showPic {
          overflow-x: auto;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.7);
        z-index: 9999;
        // padding-top: 3rem;
        //     padding-bottom:.666667rem;
        .imgBox {
            position: absolute;
            top: .666667rem;
            bottom:.666667rem;
            left:0;right: 0;
            margin: auto;
            text-align: center;
            // left: 50%;
            // transform: translateX(-50%);
            img {
                
                height: 100%;
            }
        }
    }
  }
</style>
