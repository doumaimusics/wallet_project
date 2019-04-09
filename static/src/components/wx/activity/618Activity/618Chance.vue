<template>
    <div id="chance">
        <div v-title>邂逅618</div>
        <div class="main">
            <!-- 规则按钮 -->
            <div class="rule_btn" @click="popUp = 1"></div>
            <!-- 规则弹框 -->
            <div class="rule_box" v-if="popUp==1">
                <div class="close_btn" @click="popUp = 0"></div>
                <div class="rule_center">
                    <img src="https://aliyunsso.edspay.com/web/wx/activity/618Chance/rule_center.png?v=1.2" alt="">
                   <a href="tel:400-135-3388">400-135-3388</a>
                    <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
                </div>
                
            </div>

            <!-- 跳转积分商城按钮 -->
            <div class="go_shop_btn" @click="goIntIndex"></div>

            <!-- 积分数据 -->

            <div class="score_num">{{scorePondNum ? scorePondNum : ''}}</div>

            <!--结束时间  -->
             <div class="end_time" :class="{active:scorePondNum == 0}" v-if="scorePondNum == 0">活动于2018年6月30日23:59:59结束</div>

            <!-- 任务列表 -->
            <ul class="task_list clear">
                <li v-for="val in newPeopleData">
                    <div class="task_btn btn1" v-if="val.status == 0 || loginStatus == 0" @click="doSomething(val.jumpPage)"></div>
                    <div class="task_btn btn2" v-else-if="val.status == 1"></div>
                    <div class="task_btn btn3"  v-else-if="val.status == 2"></div>
                </li>
            </ul>

            <!-- 查看详情 -->
            <div class="go_details" v-if="loginStatus == 1" @click="goChanceDetails">查看详情>></div>

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

            <!-- 立即邀请按钮 -->
            <div class="invite_btn" @click="toShare"></div>



            <!-- 跳转邀请有礼页面 -->
            <div class="go_invite" @click="goInvite"></div>
            
            <!--点击分享的-->
			<div :class="{layer:popUp == 2}" @click.stop="popUp = 0" v-if="popUp == 2" ></div>

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
                popUp:0,   // 弹窗  1、规则弹框  2、引导图   3、活动结束弹框
                activityTime:0, // 活动时间 1活动中 2活动未开始 3活动已结束
                scorePondNum:0,  // 积分内容
                newPeopleData:[],  // 积分列表
                loginStatus:0,  // 是否登录 	0:未登录，1：已登录
                inviteTotalScore:0,  // 邀请积分
                inviteTotalNum:0,  // 邀请人数
                endTime:'',   // 活动结束时间
                shareObj: { //分享标题内容配置
					title: "千山万水粽是情 端午E起行不行", //标题
				    desc: "独乐乐，不如“粽”乐乐，商城百万积分献礼端午，邀友一起瓜分百万积分", // 内容
					link: global.host + "618ChanceShare", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                }
            }
        },
        methods:{
            timeLimit(){    // 活动时间
                this.notLogPost('/activity/scInvite/inDate', (data) => {
                    if(data.resCode == 1){
                        this.activityTime = data.resData.active;
                        this.scorePondNum = data.resData.scorePondNum;  // 积分数据
                        this.endTime = data.resData.endTime;
                         if(data.resData.active == 2){
                            MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                        } else if(data.resData.active == 3){
                            this.popUp = 3;
                        }
                    }
                }, {},1)
            },
           
			getAddressData(){   //赚积分
				this.getNotlogData('/task/getScore',(data) => {
					if(data.resCode == 1){
                        this.loginStatus = data.resData.data.loginStatus;
                        this.newPeopleData = data.resData.data.newList.slice(0,3);  // 取整个积分列表的前3个  		
                        console.log(this.newPeopleData)	
					}
				},{})
            },

            goIntIndex(){   // 跳转积分商城
                 _czc.push(﻿["_trackEvent", "618积分商城", "618积分商城按钮"]); //  友盟统计配置
                 this.$router.push({
                    path:'/intIndex',
                    query:this.$route.query
                  })
            },
            
            goChanceDetails(){   // 跳转查看详情
               
                this.$router.push({
                    path:'/618ChanceDetails',
                    query:this.$route.query
                })
            },

            doSomething(jumpPage){   // 任务按钮跳转
                if(this.activityTime == 2){
                   MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else if(this.activityTime ==3){
                   this.popUp = 3;
                } else {
                        if(this.loginStatus == 0){
                            this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                        }else{
                            if(jumpPage == 0){
                                //去注册
                                 _czc.push(﻿["_trackEvent", "618完成注册", "618完成注册按钮"]); //  友盟统计配置
                                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                        }else if(jumpPage == 1){
                                //开通存管
                                _czc.push(﻿["_trackEvent", "618完成开户", "618完成开户按钮"]); //  友盟统计配置
                                this.toApp('OpenDeposit',{path:'/wxDepository/wxOpenDepository',query:{thisUrl:this.$route.fullPath}})
                        }else if(jumpPage == 2){
                                //去投资列表页
                                _czc.push(﻿["_trackEvent", "618完成首投", "618完成首投按钮"]); //  友盟统计配置
                                this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
                        }
                    }
                }
            },
            
            getStatistics(){    // 用户积分统计
                if(this.userId || this.getCookie('userToken')){
                    this.getAppData('/activity/scInvite/statistics',(data) => {
                           console.log(data)
                        if(data.resCode == 1){
                            this.inviteTotalScore = data.resData.inviteTotalScore;
                            this.inviteTotalNum = data.resData.inviteTotalNum;
                            this.shareObj.link =  global.host + "618ChanceShare?userName="+data.resData.mobilePhone+'&channel=liuyiba'; 
                            console.log(this.shareObj.link)
                            this.getWxShareData(this.shareObj); //分享调用
                        }
                    },(this.osType?{}:{}))
                }
            },

            toShare(){    //分享事件
             _czc.push(﻿["_trackEvent", "618立即邀请", "618立即邀请按钮"]); //  友盟统计配置
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
                            this.popUp = 2;
                        }
                    }
                }
            },
            
            goInvite(){   // 跳转邀请有礼
                _czc.push(﻿["_trackEvent", "618开启我的发财计划", "618开启我的发财计划按钮"]); //  友盟统计配置
                if(this.activityTime == 2){
                   MessageBox.alert('亲，活动尚未开始哦!', '提示' , {confirmButtonClass:'confirmButtonClass'})
                } else if(this.activityTime ==3){
                   this.popUp = 3;
                } else {
                  this.$router.push({
                        path:'/wxInvitationIndex',
                        query:this.$route.query
                   })
                }
            },
            // 友盟数据统计
            init(id) {
                const script = document.createElement('script')
                script.src = 'https://s13.cnzz.com/z_stat.php?id=' + id + '&web_id=' + id
                script.language = 'JavaScript'
                document.body.appendChild(script)
			},
        },
        mounted(){
            //给app传值标题名
            this.PassValue('NavWhite_邂逅618');
            // 用户积分统计
            this.getStatistics();
            // 判断友盟
            if (this.$route.query.zncc == 'true') {
                this.init(1273939266)
            } else {
                this.init(1273885113)
            }
        },
        created(){
            this.timeLimit();  // 活动时间
            this.getAddressData();  // 赚积分
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
   .zIndex{
       z-index: 99!important;
   }
   #chance{
       position: relative;
       font-family: PingFang-SC-Regular;
       .main{
           width: 100%;
           height: 36.666667rem;
           background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/chance_bg.png?v=1.5) no-repeat;
           background-size: cover;
           overflow: hidden;
           .rule_btn{
               width: .666667rem;
               height: 1.066667rem;
               position: absolute;
               top: 1.55rem;
               right: .133333rem;
           }
           .rule_box{
                width: 7.88rem;
                height: 10.933333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/rule_box.png?v=1.2) no-repeat;
                background-size: 100% 100%;
                position:fixed;
                top:0;left: 0;
                right: 0;bottom: 0;
                margin: auto;
                z-index: 100;
                overflow: hidden;
                padding: 1.6rem .666667rem 0 .666667rem;
                .rule_center{
                   width: 100%;
                   height: 7.333333rem;
                   overflow-y: auto;
                   position: relative;
                   img{
                       width: 6.52rem;
                       height: 9.88rem;
                       margin-bottom: .293333rem;
                   }
                   a{
                       font-size: .32rem;
                       color: #1866C0;
                       position: absolute;
                       right: 0rem;top:9.5rem;
                   }
                   p{
                       font-size: .293333rem;
                       color: #356253 ;
                       margin-bottom: .2rem;
                       text-align: center;
                   }
                }
                .close_btn{
                    width: .7rem;
                    height: .693333rem;
                    position: absolute;
                    top: 9.95rem;
                    right: 0rem;
                    left: 0;
                    margin: auto;
                }
           }
           .score_num{
                margin:8.9rem auto 6.5rem auto;
                text-align: center;
                color: #502C10;
                font-family: DIN-Bold;
                font-size: 1.6rem;
                height: 1.946667rem;
           }
           .end_time{
               width: 100%;
               text-align: center;
               font-size: .346667rem;
               color: #502C10; 
               position: absolute;
               top:10.55rem;
               left: 0;
           }
           .end_time.active{
               top:10.3rem;
           }
           .task_list{
               width: 100%;
                margin-bottom: 2.84rem;
               li{
                   width: 2rem;
                   float: left;
                   margin-right: .2rem;
                   text-align:center;
                   font-size: .2rem;
                   .task_btn{
                      width: 2rem;
                      height: .666667rem;
                   }
                   .task_btn.btn1{
                       background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/btn1.png?v=1.0) no-repeat;
                       background-size: cover;
                   }
                   .task_btn.btn2{
                       background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/btn2.png?v=1.1) no-repeat;
                       background-size: cover;
                   }
                   .task_btn.btn3{
                       background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/btn3.png?v=1.2) no-repeat;
                       background-size: cover;
                   }
               }
               li:nth-child(1){
                    margin: 0 1.466667rem 0 .586667rem;
               }
               li:nth-child(2){
                    margin: 0  1.28rem 0 0;
               }
           }
           .go_details{
            //    width: 1.466667rem;
               height: .44rem;
               font-size: .32rem;
               color: #fff;
               position: absolute;
               top: 20.213333rem;
               right: .56rem;
           }
           .invite_mess_box{
                width: 100%;
                text-align: center;
                padding: 0 .56rem;
                margin-bottom: .75rem;
                .invite_mess{
                    width: 50%;
                    float: left;
                    font-family: DIN-Bold;
                    font-size: .666667rem;
                    color: #F87817;
                }
           }
           .invite_btn{
               width: 4.253333rem;
               height: 1.066667rem;
               position: absolute;
               top: 22.533333rem;
               left: 0;right: 0;
               margin: auto;
               background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/invite_btn.png?v=1.0) no-repeat;
               background-size: cover;
           }
           .animation_box{
               width: 100%;
               height: 5rem;
               background: #f90;
               margin-bottom: 1.5rem;
               position: relative;
               .baby{
                   width: 1rem;
                   height: 1rem;
                   background: blue;
                   position: absolute;
                   
               }
               .div1{
                   z-index: 2;
                 display: block;
               }
               .div2{
                   z-index: 1;
                   display: none;
               }
           }
           .go_invite{
                width: 6.653333rem;
               height: 1.2rem;
               position: absolute;
               top: 34.72rem;
               left: 0;right: 0;
               margin: auto;
           }
           .go_shop_btn{
               width: 1.4rem;
               height: 1.4rem;
               background: url(https://aliyunsso.edspay.com/web/wx/activity/618Chance/shop_btn.png?v=1.0) no-repeat;
               background-size: cover;
               position: fixed;
               top: 9.186667rem;
               right: 0;
               z-index: 10;
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
                position: fixed;
                top:0;left: 0;
		}
   }
</style>

