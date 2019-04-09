<template>
   <div id="wxFeedIn">
       <div v-title>我的反馈</div>
       <!-- 空内容 -->
       <div class="null_box" v-if="userFeebacklist.length == 0">
           <img src="https://aliyunsso.edspay.com/web/wx/helpCenter/null_bg.png?v=1.0" alt="">
           <p>暂无反馈！</p>
       </div>

       <!-- 有内容 -->
       <ul v-else>
           <li v-for="val in userFeebacklist" @click="goFeedbContent(val.id)">
               <div class="text">
                   <span>{{val.feedType}}</span>
                   <div class="state_box" v-if="val.fbStatus == 0">处理中</div>
                   <div class="state_box state_one" v-else>已处理</div>
               </div>
               <p>{{val.addTime}}</p>
               <i></i>
           </li>
       </ul>
   </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import { MessageBox } from 'mint-ui';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                userFeebacklist:[],   //反馈列表 
                fbStatus:0,   // 反馈的状态
                feedbId:0
            }
        },
        methods:{
              feedbDataList(){
                  this.getAppData('/feedback/myFeeback',(data) => {
                       if(data.resCode == 1){
                           this.resData = data.resData;
                           this.userFeebacklist = data.resData.userFeebacklist;
                       }
                  },{},1)
              },
              goFeedbContent(n){
                  if(this.getCookie('userToken')){
                    this.$router.push({path:'/wxMyAccount/wxFeedbackContent', query:{id:n}})
                  } else {
                      MessageBox.confirm('登录信息失效，请重新登录。', {
                            confirmButtonText: '登录',
                            confirmButtonClass: 'confirmButton',
                            cancelButtonClass: 'cancelButton',
                        }).then(action => {
                            this.$router.push({
                                path:'/wxLogin',
                                query:{thisUrl:this.$route.fullPath}
                            })
                        })
                  }
                  
              }
        },
        mounted(){
           var heightStyle = document.documentElement.clientHeight;
           $('.null_box').height(heightStyle);
        },
        created(){
            this.feedbDataList();
        }
    }
</script>

<style lang="scss" scoped>
    #wxFeedIn{
        width: 100%;
        position: relative;
        overflow: hidden;
        font-family: PingFangSC-Regular;
        .null_box{
            width: 100%;
            background: #fff;
            text-align: center;
            padding-top: 4.2rem;
            img{
                width: 6.4rem;
                height: 4.533333rem;
                margin-bottom: .266667rem;
            }
            p{
                font-size: .346667rem;
                color: #808080;
            }
        }
        ul{
            width: 100%;
            li:first-child{margin-top: .266667rem;}
            li{
                width: 100%;
                height: 1.6rem;
                margin-bottom: .266667rem;
                background: #fff;
                padding: .266667rem .533333rem .266667rem .4rem;
                position: relative;
                .text{
                    margin-bottom: .066667rem;
                    overflow: hidden;
                    line-height: .533333rem;
                    span{
                       display: inline-block;
                       color: #494743;
                       font-size: .373333rem;
                    }
                    .state_box{
                        width: 1.093333rem;
                        height: .373333rem;
                        background: #F5A40F;
                        display: inline-block;
                        margin-left: .133333rem;
                        border-radius: .026667rem;
                        font-size: .293333rem;
                         color: #fff;
                         line-height: .373333rem;
                         text-align: center;
                    }
                    .state_box.state_one{
                        background: #D0D0D0;
                    }
                }
                
                p{
                    font-size: .32rem;
                    color: #8E8E8E;
                }
                i{
                    width: 0.213333rem;
                    height: .4rem;
                    background: url('https://aliyunsso.edspay.com/web/wxUpdate/arrow3.png?v=1.0') no-repeat;
                    background-size: 0.213333rem 0.4rem;
                    position: absolute;
                    top:0;bottom: 0;
                    right: .533333rem;
                    margin: auto;
                }
            }
        }
    }
</style>
