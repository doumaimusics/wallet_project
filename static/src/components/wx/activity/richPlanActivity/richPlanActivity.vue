<template>
    <div id="richPlanIndex">
        <div v-title>888元现金人缘爆棚奖</div>
        <!-- 规则按钮 -->
        <div class="rule_btn" @click="popUp = 1"></div>
        <!-- 规则弹框 -->
        <div class="rule_box" v-show="popUp == 1">
            <div class="close_btn" @click="popUp = 0"></div>
            <div class="time_box">{{startTime}} - {{endTime}}；</div>
            <a href="tel:400-135-3388"></a>
            <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
        </div>
        <!-- 机会次数 -->
        <div class="chance_number">{{InviteDataInit.remain}}</div>
        <!-- 中间卡片区域 -->
        <div class="draw_box">
            <ul class="clear">
                <li>
                    <img :src="img.img1" alt="" v-if="loginStatus == 0" @click="toLogin">
                    <img :src="img.img4" alt="" v-if="loginStatus == 1 && InviteDataInit.remain == 0" @click="nullJh()">
                    <img :src="img.img7" alt="" v-if="loginStatus == 1 && InviteDataInit.remain != 0" @click="guessAward(1)">
                </li>
                <li>
                    <img :src="img.img2" alt="" v-if="loginStatus == 0" @click="toLogin">
                    <img :src="img.img5" alt="" v-if="loginStatus == 1 && InviteDataInit.remain == 0" @click="nullJh()">
                    <img :src="img.img8" alt="" v-if="loginStatus == 1 && InviteDataInit.remain != 0" @click="guessAward(2)">
                </li>
                <li>
                    <img :src="img.img3" alt="" v-if="loginStatus == 0" @click="toLogin">
                    <img :src="img.img6" alt="" v-if="loginStatus == 1 && InviteDataInit.remain == 0" @click="nullJh()">
                    <img :src="img.img9" alt="" v-if="loginStatus == 1 && InviteDataInit.remain != 0" @click="guessAward(3)">
                </li>
            </ul>
        </div>
        <!-- 中间记录按钮 -->
        <div class="record_btn" v-if="loginStatus == 1" @click="toRichPlanList">中奖记录 >></div>
        <!-- 累计翻牌次数 -->
        <div class="add_up_number">{{InviteDataInit.total}}</div>
        <!-- 邀请人数和出借金额按钮 -->
        <div class="mess_btn_box clear">
            <div class="btn" @click="tabTag('tabOne')" :class="{activeColor:tabShow.tabOne}">邀请人数 <i v-show="tabShow.tabOne"></i></div>
            <div class="btn" @click="tabTag('tabTwo')" :class="{activeColor:tabShow.tabTwo}">出借金额 <i v-show="tabShow.tabTwo"></i></div>
        </div>
        <!-- 列表 -->
        <div v-if="loginStatus == 1" class="tab_box"> 
            <!-- 邀请人数 tabCenttab-->
            <tab-cent1 :title1 = "title.title1" :title2 = "title.title2" :countList="InviteDataInit.countList" v-if="tabShow.tabOne" :activityTime="activityStatus"></tab-cent1>
            <!-- 出借金额 -->
            <tab-cent2 :title1 = "title.title2" :title2 = "title.title3" :tenderList="InviteDataInit.tenderList" v-if="tabShow.tabTwo" :activityTime="activityStatus"></tab-cent2>
        </div>
        <!-- 未登录按钮 -->
        <div class="logo_btn" v-else @click="toLogin">登录查看</div>
        <!-- 奖励弹窗 -->
        <div class="award_popUp" v-if="popUp == 2" :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_pop'+award+'.png?v=1.0)'}">
            <div class="close_btn" @click="closeFun"></div>
            <div class="btn" @click="popUpBtnShare"></div>
        </div>
        
        
        <!-- 遮罩 -->
        <div v-layer v-if="popUp" @click="popUp = 0"></div>
        <!--   -->
        <div v-layer v-if="shareShow" style="z-index:1001" @click="closeFun">
             <div class="share_div"></div>
        </div>
    </div>
</template>

<script>
    import tabCent1 from './tabCenter1.vue';
    import tabCent2 from './tabCenter2.vue';
    import wxToapp from '../../../../common/wx/wxToapp';
    import wxShare from '../../../../common/wx/wxShare';
    import jiami from 'js-base64';
    import { MessageBox } from 'mint-ui';
    import {Toast} from 'mint-ui';
    export default {
        mixins:[ wxToapp,wxShare ],
        data(){
            return{
               popUp:0,  // 0、遮罩  1、规则弹框  2、奖励弹窗   
               shareShow:false, //分享
               tabShow:{   // 选项卡切换
                  tabOne:true,
                  tabTwo:false
               },
               InviteDataInit:{
                   countList:[],
                   tenderList:[],
                   remain:'-',
                   total:'-'
               },
               title:{
                   title1:'注册时间',
                   title2:'好友',
                   title3:'30天内累计出借（元）'
               },
               img:{
                   img1:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page1.png?v=1.1',
                   img2:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page2.png?v=1.1',
                   img3:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page3.png?v=1.1',
                   img4:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page1.png?v=1.1',
                   img5:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page2.png?v=1.1',
                   img6:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page3.png?v=1.1',
                   img7:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/ka_bg.png?v=1.1',
                   img8:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/ka_bg.png?v=1.1',
                   img9:'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/ka_bg.png?v=1.1',
               },
               shareObj: { // 分享初始化
					title: "邀友得5%加息劵+1000元现金", //标题
					desc: "多邀可无限抽888元人缘奖，去领取>", //内容
                    link: global.host + "wx/richPlanActivity", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                },
                award:null,  // 奖励弹框数据
                awardData:{},
                setTime1:null,
                setTime2:null,
                look:true,
                activityStatus:1,//活动状态
                startTime:'',   // 开始时间  
                endTime:'',    // 结束时间
                MobilePhone:'',  // 用户名
                loginStatus:0  // 登录信息
            }
        },
        computed:{
		},
        methods:{
            getActivityTime(){
                this.getNotlogData('/activity/two/getActivityTime', (data) => {
                     if(data.resCode){
                         this.activityStatus = data.resData.active;   // 2 未开始 3已结束
                         this.startTime = data.resData.startTime.split(' ')[0].split('-').join('.');
                         this.endTime = data.resData.endTime.split(' ')[0].split('-').join('.').substr(-5);
                         if(data.resData.active == 2){
                            MessageBox('温馨提示', '该活动尚未开始！');
                         } else if(data.resData.active == 3){
                            MessageBox('温馨提示', '该活动已结束！');
                         }
                     }
                },{activityId :'invite_888_activity'})
            },
            toLogin(){   // 去登录
                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
            },
            tabTag(at){   // tab切换
                for(var i in this.tabShow){
                    this.tabShow[i] = false;
                }
                this.tabShow[at] = true;
            },
            toRichPlanList(){   // 红包列表
                this.appRouter('/wx/richPlanList');
            },
            initData(){  // 初始化数据
               this.getNotlogData('/activity/inviteNew/invite888init', (data) => {
                   this.InviteDataInit = data.resData;
                   this.loginStatus = data.resData.loginStatus;
               }, {})
            },
            guessAward(n){   // 抽奖
               if(this.loginStatus == 0){
                   this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
               } else {
                if(this.activityStatus == 2){
                   MessageBox('温馨提示', '该活动尚未开始！');
                } else if(this.activityStatus == 3){
                   MessageBox('温馨提示', '该活动已结束！');
                } else {
                    if(this.InviteDataInit.remain == 0){
                           return false;
                    } else {
                        if(!this.look){
                            return;
                        }
                        this.look = false;
                        this.getAppData('/activity/inviteNew/invite888draw', (data) => {
                            if(data.resCode == 1){
                                this.awardData = data.resData;                             
                                this.setTime1 = setTimeout(() => {
                                    $('.draw_box ul li img').css({"transform":"rotateY(360deg)"});
                                    if(n == 1){   // 点击第一个
                                        if(this.awardData.id == 1){
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page1.png?v=1.1';
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page2.png?v=1.1'
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page3.png?v=1.1'

                                        } else if(this.awardData.id == 2) {
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page2.png?v=1.1';
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page1.png?v=1.1'
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page3.png?v=1.1'
                                        } else if(this.awardData.id == 3) {
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page3.png?v=1.1';
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page1.png?v=1.1'
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page2.png?v=1.1'
                                        }
                                    } else if(n == 2){  // 点击第二个
                                        if(this.awardData.id == 1){
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page1.png?v=1.1';
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page2.png?v=1.1';
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page3.png?v=1.1';
                                        } else if(this.awardData.id == 2) {
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page2.png?v=1.1';
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page1.png?v=1.1';
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page3.png?v=1.1'
                                        } else if(this.awardData.id == 3) {
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page3.png?v=1.1';
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page1.png?v=1.1';
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page2.png?v=1.1'
                                        }
                                    } else if(n == 3){  // 点击第三个
                                        if(this.awardData.id == 1){
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page1.png?v=1.1';
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page2.png?v=1.1';
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page3.png?v=1.1'
                                        } else if(this.awardData.id == 2) {
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page2.png?v=1.1';
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page1.png?v=1.1';
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page3.png?v=1.1'
                                        } else if(this.awardData.id == 3) {
                                            this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/red_page3.png?v=1.1';
                                            this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page1.png?v=1.1';
                                            this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/not_red_page2.png?v=1.1'
                                        }
                                    }
                                    // this.initData();
                                }, 500);
                                
                                this.setTime2 = setTimeout (() => {
                                this.award = data.resData.id;
                                this.popUp = 2;
                                },2000)  
                            } else {
                                this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                                this.look = true;
                            }
                        },{})
                    }
                }        
                   
               }
               
            },
            closeFun(){  // 点击关闭
                $('.draw_box ul li img').css({"transform":"rotateY(0deg)"});
                this.look = true;
                this.initData();
                if(this.InviteDataInit.remain != 0){
                    this.img.img7 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/ka_bg.png?v=1.1';
                    this.img.img8 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/ka_bg.png?v=1.1';
                    this.img.img9 = 'https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/ka_bg.png?v=1.1';
                }
                clearTimeout(this.setTime1);
                clearTimeout(this.setTime2);
                this.popUp = 0;
                this.shareShow = false;
            },
            popUpBtnShare(){    // 分享重新赋值
                this.getUI()
                this.shareObj = { 
					title: "太棒了，我抽中了"+this.awardData.amount+"元现金奖励！", //标题
					desc: "送你500元现金，我们E起去赚钱>", //内容
                    link: global.host+"invite/inviteRegister?userName=" + Base64.encode(this.MobilePhone), //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                }
                this.getWxShareData(this.shareObj);                
                if(this.osType){
                    setTimeout(() => {
                        this.isLogPassValue(this.appShare);    // APP调用h5分享的方法
                    },800)
                } else {
                    this.shareShow = true;
                }
            },
            getUI () {  //获取用户id(base64转码)
                this.getAppData("/user/friend/userInvite",(data) =>{
                    this.userId = data.resData.ui;
                    this.MobilePhone = data.resData.realName ?  data.resData.realName:data.resData.MobilePhone;
                    this.shareObj.link = global.host+"invite/inviteRegister?userName=" + Base64.encode(this.MobilePhone);
                    this.userId = data.resData.ui;
                    this.appShare = '1';
                    this.getWxShareData(this.shareObj)
                },{})
            },
            nullJh(){
                if(this.loginStatus == 0){
                    Toast({ //    小黑快
                        message: '登录信息失效',
                        iconClass: 'icon icon-success',
                        duration: 1000
                    });
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                } else {   
                    if(this.activityStatus == 2){
                       MessageBox('温馨提示', '该活动尚未开始！');
                    } else if(this.activityStatus == 3){
                       MessageBox('温馨提示', '该活动已结束！');
                    } else {  
                        Toast({ //    小黑快
                            message: '您暂无翻牌机会',
                            iconClass: 'icon icon-success',
                            duration: 1000
                        });
                    }             
                    
                }
                
            }
        },
        destroyed() {
            clearTimeout(this.setTime1);
            clearTimeout(this.setTime2);
        },
        created() {            
            this.getActivityTime(); // 活动时间
            this.initData();  // 初始化
        },
        mounted() {
            this.getWxShareData(this.shareObj);   // wx分享方法
            // 数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1275431727&web_id=1275431727 '
			script.language = 'JavaScript'
            document.body.appendChild(script);
            this.PassValue('NavWhite_888元现金人缘爆棚奖');
        },
        components:{
            tabCent1,
            tabCent2
        },
        watch: {
			'$route'() {
				if (window._czc) {
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
		}
    }
</script>

<style lang="scss" scoped>
    #richPlanIndex{
        width: 100%;
        height: 27.746667rem;
        overflow: hidden;
        position: relative;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/wx_bg.png?v=1.2) no-repeat;
        background-size: cover;
        padding-top: 7.546667rem;
        .rule_btn{
            width: 1.186667rem;
            height: .573333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/rule_btn.png?v=1.1) no-repeat;
            background-size: cover;
            position: fixed;
            right: 0;
            top: .96rem;
            z-index: 887;
        }
        .rule_box{
            width: 8.133333rem;
            height: 13.026667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/rule_box.png?v=1.0) no-repeat;
            background-size: cover;
            position: fixed;
            top: 0;left: 0;
            bottom: 0;right: 0;
            margin: auto;
            z-index: 1000;
            .close_btn{
                width: .986667rem;
                height: .986667rem;
                position: absolute;
                top: 0;
                right: 0;
            }
            .time_box{
                font-size: .32rem;
                color: #19387f;
                position: absolute;
                top: 3.333333rem;
                left: 3rem;
            }
            a{
                width: 2rem;
                height: .4rem;
                position: absolute;
                top: 11.5rem;
                right: 1.5rem;
            }
            p{
                position: absolute;
                bottom: 0.6rem;
                left: 1.133333rem;
                font-size: .24rem;
                color:#19387f;
            }
        }
        .chance_number{
            width: .893333rem;
            height: .426667rem;
            position: absolute;
            top: 6.373333rem;
            left: 4.386667rem;
            text-align: center;
            line-height: .426667rem;
            font-size: .48rem;
            color: #DF539A;
        }
        .draw_box{
           position: relative;
           overflow: hidden;
           width: 100%;
           padding-left: .906667rem;
           margin-bottom: 4.25rem;
           ul{
               li{
                  width: 2.8rem;
                  height: 3.293333rem;
                  float: left;
                  img{
                      width: 100%;
                      -webkit-transition: all .5s ease;
                      -moz-transition: all .5s ease;
                      transition: all .5s ease;
                  }
               }
           }
        }
        .record_btn{
           width: 3rem;
           height: .666667rem;
           position: absolute;
           top: 11.666667rem;
           left: 0;right: 0;
           margin: auto;
           font-size: .4rem;
           color: #fff;
           text-align: center;
           line-height: .666667rem;
        }
        .add_up_number{
            width: .986667rem;
            height: .426667rem;
            position: absolute;
            top: 13.5rem;
            left: 4.333333rem;
            color: #DF539A;
            font-size: .48rem;
            line-height: .426667rem;
            text-align: center;
        }
        .mess_btn_box{
            padding:0 .546667rem 0 .56rem;
            .btn{
                width: 50%;
                height: 1.28rem;
                float: left;
                text-align: center;
                line-height: 1.28rem;
                color: #FAD362;
                background: -moz-linear-gradient(#4f2997,#7439bf);
                background: -webkit-linear-gradient(#4f2997,#7439bf);
                background: -ms-linear-gradient(#4f2997,#7439bf);
                background: linear-gradient(#4f2997,#7439bf);
                position: relative;
                i{
                    display: block;
                    width: .68rem;
                    height: .2rem;
                    position: absolute;
                    bottom: 0;
                    left: 0;right: 0;
                    margin: auto;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/triangle_icon.png?v=1.0) no-repeat;
                    background-size: cover;
                }
            }
            .btn:first-child{
                border-top-left-radius: .205rem;
            }
            .btn:last-child{
                border-top-right-radius: .205rem;
            }
            .activeColor{
                color: #835513;
                background: -moz-linear-gradient(#efb642,#fbd666);
                background: -webkit-linear-gradient(#efb642,#fbd666);
                background: -ms-linear-gradient(#efb642,#fbd666);
                background: linear-gradient(#efb642,#fbd666);
            }
        }
        .logo_btn{
            width: 3.84rem;
            height: 1.2rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/btn_box.png?v=1.0) no-repeat;
            background-size: cover;
            text-align: center;
            line-height: 1.2rem;
            font-size: .4rem;
            color: #5b2114;
            margin: 5.106667rem auto 0;
        }
        .tab_box{
            padding: 0 .546667rem 0 .56rem;
        }
        .award_popUp{
            width: 8.133333rem;
            height: 11.853333rem;
            position: fixed;
            top: 0;left: 0;
            right: 0;bottom: 0;
            margin: auto;
            background-size: cover!important;
            z-index: 1000;
            .close_btn{
                width: .986667rem;
                height: .986667rem;
                position: absolute;
                top: 0;
                right: 0;
            }
            .btn{
                width: 4.653333rem;
                height: 1.2rem;
                position: absolute;
                top: 9.226667rem;
                left: 0;right: 0;
                margin: auto;
            }
        }
        .share_div {
            width: 100%;
            height: 2.666667rem;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/fxyd.png?v=1.0') no-repeat;
            background-size: 100%;
            overflow: hidden;
            position: absolute;
            top: 0;left: 0;
            z-index: 19999;
        }
    }
</style>