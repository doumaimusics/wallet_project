<template>
   <div id="wxInviteTravel">
        <div class="main">
            <!-- 规则按钮 -->
            <div class="rule_btn" @click.stop="popUp = 1"></div>
            <!-- 规则弹框 -->
            <div class="rule_box" v-if="popUp == 1">
                <div class="close_btn" @click.stop="popUp = 0"></div>
                <p class="timer_text">{{startTime}}-{{endTime}}</p>
                <a href="tel:400-135-3388">400-135-3388(立即拨打)</a>
            </div>

            <!-- 登录和进度信息按钮 -->
            <div class="login_btn" v-if="!userId && !getCookie('userToken')" @click.stop="toLogIn"></div>
            <div class="invite_info_btn" v-else @click.stop="getUserInvite"></div>
            <!-- 进度信息按钮 -->
            <div class="invite_info_box" v-if="popUp == 2">
                <div class="close_btn" @click.stop="popUp = 0"></div>
                <h3><span>{{phoneTel}}</span>用户您好：</h3>
                <p class="p1"><span>{{tenderCount}}</span>人</p>
                <p class="p2"><span>{{openzsCount}}</span>人</p>
            </div>

            <!-- 获奖名单按钮 -->
            <div class="get_award_btn" @click.stop="toPrizeList"></div>

            <!-- 剩余张数显示  -->
            <div class="nuber_box">{{remain}}</div>

            <!-- 免责声明按钮 -->
            <div class="statement_btn" @click.stop="popUp = 3"></div>
            <div class="statement_box" v-if="popUp == 3">
                <div class="close_btn" @click.stop="popUp = 0"></div>
                <div class="statement_text_box">
                   <div class="statement_text"></div>
                </div>
            </div>

            <!-- 底部邀请好友按钮 -->
            <div class="invite_btn" @click.stop="inviteShare"></div>

            <!--点击分享的-->
			<div :class="{layer:popUp == 4}" @click.stop="popUp = 0" v-if="popUp == 4" ></div>
            <!--背景-->
			<div v-if="popUp" @click.stop="popUp = 0" class="zIndex" v-layer></div>
        </div>
    </div>  
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    import { MessageBox } from 'mint-ui';
    export default {
        mixins: [ wxShare ],
        data(){
            return{
               popUp:0,   //弹窗   1、规则弹框  2、邀请信息弹框  3、免责申明弹框    4、引导图
               activityTime:0, // 活动时间 1活动进行中 2活动未开启 3活动已结束 4活动失效
               startTime:'',   // 活动开始时间
               endTime:'',     // 活动结束时间
               remain:null,    // 旅行券张数
               isLogin:0,      // 是否登录  1、已登录  2、未登录
               tenderCount:0,   // 出借人数
               openzsCount:0,   // 开户人数
               phoneTel:'',   // 电话号码
               shareObj: { //分享标题内容配置
					title: "快，去往云南的航班正在登机…", //标题
					desc: "我的3280元云南游还缺个伴，E起双飞吗？", //内容
                    link: global.host + "wx/wxInviteSharePage", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                },
                //  适配iPhoneX 添加的行内样式fullHeight imgBox
				// fullHeight:{
				// 	height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
				// }
            }
        },
        methods:{
            timeLimit(){    // 活动时间接口
               this.notLogPost('/activity/ynlxq/getActivityTime', (data) => {
                console.log(data)
                 if(data.resCode == 1){
                     this.activityTime = data.resData.active;
                     if(data.resData.active == 2) {
                         MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                     } else if(data.resData.active == 3){
                         MessageBox.alert('该活动已结束请参与平台其他优惠活动!', {confirmButtonClass:'confirmButtonClass'})
                     } else if(data.resData.active == 4){
                         MessageBox.alert('活动已失效!', {confirmButtonClass:'confirmButtonClass'})
                     }
                 }
               }, {} ,1)
            },

            initData(){    // 初始化接口
                this.notLogPost('/activity/ynlxq/init', (data) => {
                    console.log(data)
                    this.isLogin = data.resData.status;   // 是否登录
                    if(data.resCode == 1){
                       this.startTime = data.resData.startTime;   // 活动开始时间
                       this.endTime = data.resData.endTime;   // 活动结束时间
                       this.remain = data.resData.remain;   // 旅行券张数
                       if(data.resData.status == 1){   // 当登录后把电话号码和活动名称传过去，但是会把原来的分享页面参数覆盖掉，所有在下面直接调用分享
                           this.shareObj.link =  global.host + "wx/wxInviteSharePage?userPhone="+data.resData.mobilePhone+'&channel=yunnanticket'; //链接channel=yunnanticket  活动注册得活动来源名称
                           this.getWxShareData(this.shareObj); //分享调用
                       }
                    }
                }, {} ,1)
            },
            
            toLogIn(){    // 跳转登录页面
                this.toApp('LG', {
                    path: '/wxLogin',
                    query: {
                        thisUrl: this.$route.fullPath
                    }
                })
            },

            getUserInvite(){   // 查看进度事件
                if(this.activityTime == 2){
                    MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else if(this.activityTime == 3){
                    MessageBox.alert('该活动已结束请参与平台其他优惠活动!', {confirmButtonClass:'confirmButtonClass'})
                } else if(this.activityTime == 4){
                    MessageBox.alert('活动已失效!', {confirmButtonClass:'confirmButtonClass'})
                } else {
                  if( this.isLogin == 1 ){   // 已登录
                       this.getAppData('/activity/ynlxq/getUserInvite', (data) => {
                            console.log(data);
        　　　　　　　　　　　　if(data.resCode){
                                this.popUp = 2;
                                this.phoneTel = data.resData.mobilePhone;  // 电话号码
                                this.tenderCount = data.resData.tenderCount;   // 出借人数
                                this.openzsCount = data.resData.openzsCount; // 开户人数
                            }　　　
                        },(this.osType ? {}:{}))
                   } else if( this.isLogin == 2 ){
                        MessageBox.confirm('登录信息失效，请重新登录。', '提示', {
                            confirmButtonText: '登录',
                            confirmButtonClass: 'confirmButton',
                            cancelButtonClass: 'cancelButton',
                        }).then(action => {
                            this.toApp('LG', {
                                path: '/wxLogin',
                                query: {
                                    thisUrl: this.$route.fullPath
                                }
                            })
                    })
                   }
                }
            },
             

            toPrizeList(){   // 跳转获奖列表
                this.$router.push({
                     path:'/wx/wxPrizeList',
                     query:this.$route.query
                })
            },

             inviteShare(){    // 底部邀请分享按钮事件
                _czc.push(﻿["_trackEvent", "畅游云南", "邀请按钮"]); //  友盟统计配置
                if(this.activityTime == 2) {
                   MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'});
                } else if(this.activityTime == 3) {
                  MessageBox.alert('该活动已结束请参与平台其他优惠活动!', {confirmButtonClass:'confirmButtonClass'});
                } else if(this.activityTime == 4){
                  MessageBox.alert('活动已失效!', {confirmButtonClass:'confirmButtonClass'})
                } else {
                    if(this.isLogin == 1){
                        if(this.osType) {
                            this.isLogPassValue(this.appShare)
                        } else {
                            this.popUp = 4;
                        }
                    } else if(this.isLogin == 2){
                        this.toApp('LG', {
                            path:'/wxLogin',
                            query: {
                                thisUrl: this.$route.fullPath
                            }
                        })
                    }
                }
            },
        },

        mounted(){
            $('html','body').css({'width':'100%','height':'100%'});   // 固定定位底部是兼容iphoneX
            this.initData(); // 初始化
            // 友盟数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1273337759&web_id=1273337759 '
			script.language = 'JavaScript'
			document.body.appendChild(script)  
        },
        created(){
            this.timeLimit();  // 活动时间
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
        }

    }
</script>
<style>
.confirmButton,
	.cancelButton,.confirmButtonClass {
		font-size: 0.48rem !important;
    }
</style>

<style lang="scss" scoped>
    html,body{
        width: 100%;
        height: 100%;
    }
    .zIndex{
		z-index: 99 !important;
	}
   #wxInviteTravel{
       position: relative;
       font-family: PingFang-SC-Regular;
       .main{
           width: 100%;
           height: 20rem;
           background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/bg_wx.png?v=1.3') no-repeat;
           background-size: cover; 
           overflow: hidden;
           .rule_btn{
               width: 1.066667rem;
               height: .533333rem;
               margin: .4rem 0 0 .4rem;
           }
           .login_btn,.invite_info_btn{
               width: 1.333333rem;
               height: 1.333333rem;
               position: absolute;
               top: 0;
               right: 0;
           }
           .login_btn{
              background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/login_bg.png?v=1.0') no-repeat;
              background-size: cover;
           }
           .invite_info_btn{
               background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/jd_ng.png?v=1.0') no-repeat;
              background-size: cover;
           }
           .get_award_btn{
               width: 1.066667rem;
               height: 1.066667rem;
               background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/award_btn.png?v=1.0') no-repeat;
               background-size: cover;
               position:absolute;
               right: .133333rem;
               top: 7.706667rem;
           }
           .nuber_box{
              width: .466667rem;
              height: .533333rem;
              font-size: .346667rem;
              line-height: .533333rem;
              position: absolute;
              left: 6.004rem;
              top: 7.173333rem;
              color: #F44142;
           }
           .statement_btn{
               width: 1.28rem;
               height: .44rem;
               position: absolute;
               left: .973333rem;
               top: 14.813333rem;
               overflow: hidden;
           }
           .invite_btn{
               width: 8.266667rem;
               height: 1.826667rem;
               background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/invite_btn1.png?v=1.1') no-repeat;
               background-size: cover; 
               position: fixed;
               left: 0;right: 0;
               bottom: 0;
               margin: auto;
           }
           .rule_box,.invite_info_box,.statement_box{   // 弹框样式
                 position: fixed;
                 top: 0;left: 0;
                 bottom: 0;right: 0;
                 margin: auto;
                 z-index: 100;
                 .close_btn{
                     width: .533333rem;
                     height: .533333rem;
                     position: absolute;
                     top: 0;
                     right: 0;
                 }
           }
           .rule_box{
              width: 7.733333rem;
              height: 11.906667rem;
              background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/rule_box.png?v=1.1') no-repeat;
              background-size: cover;
              .timer_text{
                  color: #6C0900;
                  font-size: .346667rem;
                  position: absolute;
                  left: 2.4rem;
                  top: 2.1rem;
              }
              a{
                  position: absolute;
                  left: 1.7rem;
                  bottom: 0.42rem;
                  font-family: DIN-Bold;
                  font-size: .346667rem;
                  color: #0047CA ;
              }
           }
           .invite_info_box{
             width: 7.733333rem;
             height: 7.466667rem;
             background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/info_box.png?v=1.0') no-repeat;
             background-size: cover;
             padding-top: 2.4rem;
             h3{
                 padding-left: .5rem;  
                 font-family: DIN-Bold;
                 font-size: .373333rem;
                 color: #830000;
                 margin-bottom: 1.533333rem;
             }
             .p1,.p2{
                 width: 2.666667rem;
                 height: 2rem;
                 text-align: center;
                 line-height: 2rem;
                 font-family: PingFangSC-Semibold;
                 font-size: .266667rem;
                 color: #0c8701;
                 position: absolute;
                 top: 3.6rem;
                 span{
                     font-family: DIN-Bold;
                     font-size: .613333rem;
                 }
             }
             .p1{
                 left: .533333rem;
             }
             .p2{
                right: .533333rem;
             }
           }
           .statement_box{
            width: 7.733333rem;
            height: 11.906667rem;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/statement_bg.png?v=1.0') no-repeat;
            background-size: cover;
            padding: 2.08rem .4rem 0 .333333rem;
            overflow: hidden;
            .statement_text_box{
                   width: 100%;
                   height: 9.5rem;
                   overflow: auto;
                   .statement_text{
                       width: 100%;
                       height: 14.133333rem;
                       background: url('https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/statement_text.png?v=1.1') no-repeat;
                       background-size: cover;
                   }
               }
           }

           .layer {
                width: 10rem;
                height: 4.88rem;
				background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/fenxiang.png?v=1.0) no-repeat;
				background-size: cover;
                z-index: 100;
                position: relative;
			}
       }
   }
</style>

