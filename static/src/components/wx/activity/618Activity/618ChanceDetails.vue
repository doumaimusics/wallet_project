<template>
    <div id="chanceDetails">
        <div v-title>查看详情</div>
        <div class="main">
            <!-- 头部 -->
            <div class="cap_icom"></div>
            <div class="head_box">
                <img :src="account.avatarUrl?account.avatarUrl:'https://aliyunsso.edspay.com/web/wx/account/head.png'" alt="">
            </div>
            <div class="vip_icon">
                <img :src="osType?account.levelLittleUrl:account.levelLittleUrl" alt="">
            </div>
               <!-- 我得邀请信息 -->
            <div class="invite_mess_box clear">
                <!-- 邀请积分 -->
                <div class="invite_mess">
                    <h3>{{inviteTotalScore}}</h3>
                </div>
                <!-- 邀请人数 -->
                <div class="invite_mess">
                    <h3>{{inviteTotalNum}}</h3>
                </div>
            </div>

            <!-- 邀请列表 -->
            <div class="invite_list_box">
                    <!-- 空状态 v-if="listData.length == 0 || listData.length == ''"-->
                <div class="null_list" v-if="listData.length == 0 || listData.length == ''">
                    <div class="null_img">
                        <img src="https://aliyunsso.edspay.com/web/wx/activity/618Chance/null_icon.png" alt="">
                    </div>
                    <h3>尚未有邀请积分记录</h3>
                    <div class="invite_btn" @click="toShare"></div>
                </div>

                <div class="list_data" v-else>
                    <ul>
                        <li v-for="time in listData">
                            <div class="list_center_box clear">
                                <span>{{time.inviteUserName}}</span>
                                <span>{{time.takeName}}</span>
                                <span>{{time.score}}</span>
                            </div>
                            <p>{{time.addTime}}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <!--点击分享的-->
			<div :class="{layer:popUp == 1}" @click.stop="popUp = 0" v-if="popUp == 1" ></div>
            <!-- 活动结束弹框 -->
            <div class="hint_box" v-if="popUp == 3">
                <div class="affirm_btn" @click="popUp = 0"></div>
            </div>
        </div>
            <!-- 遮罩 -->
		<div v-if="popUp" class="zIndex" v-layer @click="popUp=0"></div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    import { MessageBox } from 'mint-ui';
    export default{
        mixins:[ wxShare ],
        data(){
            return{
                popUp:0,  // 1引导图    3、结束弹框
                loginStatus:0,   // 是否登录
                account:{},  // 我的头像
                inviteTotalScore:0,  // 我的积分
                inviteTotalNum:0,   // 我的邀请人数
                listData:[],  // 列表数据
                activityTime:0,   // 活动时间
                shareObj: { //分享标题内容配置
					title: "千山万水粽是情 端午E起行不行", //标题
					desc: "独乐乐，不如“粽”乐乐，商城百万积分献礼端午，邀友一起瓜分百万积分", //内容
                    link: global.host + "618ChanceShare", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                },
            }
        },
        methods:{
            timeLimit(){    // 活动时间
                this.notLogPost('/activity/scInvite/inDate', (data) => {
                    if(data.resCode == 1){
                        this.activityTime = data.resData.active;
                        // this.scorePondNum = data.resData.scorePondNum;  // 积分数据
                        // this.endTime = data.resData.endTime;
                         if(data.resData.active == 2){
                            MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                        } else if(data.resData.active == 3){
                            this.popUp = 3;
                        }
                    }
                }, {},1)
            },
            getAccount(){   // vip头像接口
               if(this.userId || this.getCookie('userToken')){
                   this.getAppData('/activity/scInvite/icon',(data) =>{
                        if(data.resCode == 1){
                            this.account = data.resData.iconModel;
                        }
                   },(this.osType ? {}:{}))
               }
            },
            getListData(){   // 列表接口
              this.getNotlogData('/activity/scInvite/details',(data) =>{
                  if(data.resCode == 1){
                      this.loginStatus = data.resData.loginStatus;
                      this.listData = data.resData.scInviteModels;
                  }
              },{})
            },
             getStatistics(){    // 用户积分统计
                if(this.userId || this.getCookie('userToken')){
                    this.getAppData('/activity/scInvite/statistics',(data) => {
                        if(data.resCode == 1){
                            this.inviteTotalScore = data.resData.inviteTotalScore;
                            this.inviteTotalNum = data.resData.inviteTotalNum;
                            this.shareObj.link =  global.host + "618ChanceShare?userName="+data.resData.mobilePhone+'&channel=liuyiba';
                            this.getWxShareData(this.shareObj); //分享调用
                        }
                    },(this.osType ? {}:{}))
                }
            },
            toShare(){
                if(this.activityTime == 2){
                   MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else if(this.activityTime ==3){
                   this.popUp = 3;
                } else {
                    if(this.loginStatus == 0){
                        this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    } else {
                        if(this.osType){
                           this.isLogPassValue(this.appShare);
                        } else {
                            this.popUp = 1;
                        }
                    }
                }
                
            }  
        },
        mounted(){
            this.getStatistics();
        },
        created(){
            this.getAccount();
            this.getListData();
            this.timeLimit();
        }
    }
</script>

<style lang="scss" scoped>
   .zIndex{
       z-index: 99!important;
   }
   #chanceDetails{
       position: relative;
       font-family: PingFang-SC-Regular;
       .main{
           width: 100%;
           height: 17.786667rem;
           background:url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/xq_bg.png?v=1.2) no-repeat;
           background-size: cover;
           overflow: hidden;
           position: relative;
           .cap_icom{
               width: 2.106667rem;
               height: 1.133333rem;
               background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/cap_img.png?v=1.0) no-repeat;
               background-size: cover;
               position: absolute;
               top: 2.026667rem;
               left: 0;right: 0;
               margin: auto;
               z-index: 9;
           }
               .head_box{
                   width: 1.733333rem;
                   height: 1.733333rem;
                   border-radius: 50%;
                   margin: 0 auto;
                   position: absolute;
                   top: 2.306667rem;
                   left: 0;right: 0;
                   margin: auto;
                   img{
                       width: 100%;
                       height: 100%;
                       border-radius: 50%;
                   }
                   
               }
               .vip_icon{
                       width: .533333rem;
                       height: .32rem;
                       display: block;
                       position: absolute;
                       top: 3.733333rem;
                       left: 5.333333rem;
                       img{
                           width: 100%;
                           height: 100%;
                           position: absolute;
                           left: 0;top: 0;
                           border: none;
                       }
                   }
           .invite_mess_box{
                width: 100%;
                text-align: center;
                margin: 4.453333rem 0 2.893333rem 0;
                padding: 0 .56rem;
                .invite_mess{
                     width: 50%;
                    float: left;
                    font-family: DIN-Bold;
                    font-size: .666667rem;
                    color: #F87817;
                }
           }
           .invite_list_box{
               width: 100%;
               .null_list{
                   width: 100%;
                   position: relative;
                   padding-top: 1.2rem;
                   .null_img{
                       width: 3.946667rem;
                       height: 2.573333rem;
                       margin: .3rem auto;
                       img{width: 100%;height: 100%;}
                       margin-bottom: .626667rem;
                   }
                   h3{
                        font-size: .426667rem;
                        color: #379876;
                        text-align: center;
                        margin-bottom: .413333rem;
                    }
                    .invite_btn{
                        width: 4.253333rem;
                        height: 1.12rem;
                        border-radius: 1rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/invite_btn.png?v=1.0) no-repeat;
                        background-size: cover;
                        margin: 0 auto;
                    }
               }
               .list_data{
                   width: 8.933333rem;
                   height: 8.333333rem;
                   overflow: hidden;
                   position: relative;
                   margin: 0 auto;
                   ul{
                       width: 100%;
                       height: 100%;
                       padding: 0 .533333rem;
                       overflow-y: auto;
                       li{
                           width: 100%;
                           margin: .2rem 0 0 0;
                           border-bottom: 1px solid #949494;
                           padding-bottom: .186667rem;
                           .list_center_box{
                               width: 100%;
                               margin-bottom: .053333rem;
                               span{
                                    // width: 33%;
                                    height: 100%;
                                    float: left;
                                    line-height: .5rem;
                                    font-size: .346667rem;
                                    color: #531515;
                                }
                                span:nth-child(2){
                                    margin-left: 1.1rem;
                                }
                                span:nth-child(3){
                                    margin-left: 1.2rem;
                                }
                           }
                           p{
                                  padding-left: 0rem;
                                  font-size: .266667rem;
                                  color: #575656;
                               } 
                       }
                   }
               }
           }
           .hint_box{
               width: 7.893333rem;
               height: 4.893333rem;
               background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/hint_box.png?v=1.0) no-repeat;
               background-size: 100% 100%;
               position: fixed;
               top: 0;left: 0;
               right: 0;bottom: 0;
               margin: auto;
               z-index: 100;
               .affirm_btn{
                   width: 4.013333rem;
                   height: 1.066667rem;
                   position: absolute;
                   left: 0;right: 0;
                   bottom: 1.03rem;
                   margin: auto;
               }
           }
       }
       .layer {
                width: 10rem;
                height: 4.88rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/fenxiang.png?v=1.0) no-repeat;
				background-size: cover;
                z-index: 100;
                position: absolute;
                top:0;left: 0;
		}
   }
</style>