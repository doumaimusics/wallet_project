<template>
  <div id="theNewYearAboutWarLuckyBag">
      <wx-header v-if="!osType" :logo="'约战新年'"></wx-header>
      <div class="main">
            <!-- 心愿滚动 -->
            <div class="list clear" id="list">
                <ul class="redList clear" ref="ulList">
                     <li v-for="item in redList" ref="redItem" class="fl">{{item}}</li> 
                </ul>
            </div>

            <!-- 规则按钮 -->
            <div class="rule_btn" @click="popUp = 1"></div>	
            <!-- 规则弹框 -->
            <div class="rule_box" v-if="popUp == 1">
                <div class="close_btn" @click="popUp = 0"></div>
                <a href="tel:400-135-3388">400-135-3388(立即拨打)</a>  
                <p v-if="osType == 'IOS'">8、本活动奖励与苹果公司无关</p>
            </div>

            <!-- 我的福袋按钮 -->
            <div class="my_fa_btn" @click="toFK"></div>

            <!-- 树 -->
            <div class="tree_img1"></div>
            <div class="tree_img2"></div>
            <div class="tree_img3"></div>
            
            <!-- 当日可领卡数 -->
            <div class="chance_box">{{surplus}}</div>

            <!-- 领卡区域 -->
            <div class="get_box">
            <!-- swiper -->
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(kaValue,index) in kaList" :style="{background:'url('+kaValue+')'}">
                        <div class="get_btn" @click="getRedPack(index+1)"></div>
                    </swiper-slide>
                </swiper>
            </div>

            <!-- 领卡弹框 -->
            <div class="get_popUp_box" v-if="popUp == 2">
                <div class="close_btn" @click="popUp = 0"></div>
                <h3>恭喜您成功领取福卡</h3>
                <p v-for="awards in awardsList">{{awards}}</p>	    
                <div class="go_btn" @click="toInvest"></div>
            </div>

            <!-- 心愿区域 -->
            <div class="wish_box">
                <!-- 未许愿 -->
                <div class="not_wish_box" v-if="wishState == 2">
                    <textarea name="" maxlength="30" @input="descInput" v-model="textValue"  id="textarea" placeholder="请输入您的心愿，30个字以内！"></textarea>
                    <p><span>{{remnant}}</span>/30</p>
                    <!-- 心愿提交按钮 -->
                    <div class="sub_btn" @click="submitEvent"></div>
                </div>
                <!-- 已经许愿 -->
                <div class="yes_wish_box" v-else-if="wishState == 1">
                    <p>{{wishText}}</p>
                </div>
                
            </div>
            <!-- 页面底部 -->
            <div class="bottom_box" id="bottomBox"></div>
            <!-- 底部按钮 -->
            <div class="bottom_btn" id="bottomBtn" @click="toPK"></div>
      </div>   
      <!-- 遮罩 -->
      <div class="mark_box" v-if="popUp"></div>       
  </div>
</template>

<script>
    import wxHeader from '../../../wxHeader';
    import wxToapp from '../../../../common/wx/wxToapp';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import { Toast } from 'mint-ui';
    import { MessageBox } from 'mint-ui';
    export default{
        mixins: [ wxToapp ],
        data(){
            return {
                popUp:0,   // 0、遮罩   1、规则  2、卡弹框
                textValue:'',   // textarea的内容
                remnant: 0,  // textarea统计字数
                kaList:[  // 卡列表
                    'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_ka1.png?v=1.0',
                    'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_ka2.png?v=1.0',
                    'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_ka3.png?v=1.0',
                    'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_ka4.png?v=1.0',
                    'https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_ka5.png?v=1.0'
                ], 
                swiperOption: {      // 轮播配置
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    initialSlide:0 ,
                    spaceBetween: 0
                },
                isIOS: false,
                redList: [  // 心愿假数据
                    '用户132****3241 ：希望新年挣大钱，有女朋友结婚生娃。',
                    '用户189****3349 ：今年结婚，祝我和女朋友幸福一生。',
                    '用户136****6723 ：狗年旺旺旺旺旺旺旺旺旺。',
                    '用户188****4564 ：新年新气象，祝我幸福。哈哈哈...',
                    '用户136****3367 ：又大一岁，香菇、蓝瘦。',
                    '用户156****7487 ：未来的媳妇儿，今年一定等着我噢。',
                    '用户156****9389 ：河南人民发来贺电，祝大家新年快乐。',
                    '用户153****0948 ：山东人民发来贺电，祝大家新年快乐',
                    '用户137****3562 ：2018年，祝福我国兴旺发达。',
                    '用户187****3523 ：大狗子，你又生一窝。新年要火。',
                    '用户188****4562 ：狗年行大运祝大家工作顺利。',
                    '用户134****8374 ：希望今年还来得及生个狗宝宝哈哈哈',
                    '用户131****8372 ：新年愿望：鹿晗你快和某彤分手吧！',
                    '用户156****7732 ：狗年我要上王者',
                    '用户130****2736 ：要发财，狗年要中500万，哈哈哈',
                    '用户188****3745 ：祝爸妈身体健康，阖家欢乐^_^',
                    '用户187****9364 ：要脱单要减肥，不要当一年单身狗。',
                    '用户136****7334 ：2018年，祝E都市钱包越来越好',
                    '用户136****7334 ：2018年，祝E都市钱包越来越好',
                    '用户180****2353 ：2018年，希望平台多发点红包！',
                    '用户152****9349 ：新的一年一定减肥成功。',
                    '用户183****9374 ：祝我回家不要被催，玉皇大帝保佑！',
                    '用户185****7382 ：新年大吉，大吉大利，利国利民。',
                    '用户136****8364 ：祝父母新年快乐身体健康。',
                    '用户152****7384 ：希望2018年是开挂的一年，顺顺顺。',
                    '用户186****0949 ：祝我大儿子，今年考一个好的大学。',
                    '用户189****3745 ：今年挣大钱！',
                    '用户188****8475 ：2018年我想要一布iPhoneX。',
                    '用户136****3745 ：工资涨涨涨，过万。'
                ],
                
                activityTime:0,  // 活动时间
                isLogin:0,  // 是否登录  1、登录  2、没登录
                surplus:'*',  // 领卡次数
                awardsList:[],  // 福袋奖励结合
                wishState:2,  // 心愿  1、已许愿  2、未许愿
                wishText:'',   // 后台返回心愿内容
                timer:null, // 滚动定时器
                fullHeight: document.documentElement.clientHeight  //定义页面的高度
           }
        },
        methods:{
            timeLimit(){   // 活动时间
               this.notLogPost('/activity/newYearPK/judgeInActivityPeriod', (data)=> {
                   if (data.resCode == 1) {
                       this.activityTime = data.resData.active;    //  1、活动进行中 2、未开始  3、已结束
                       if (data.resData.active == 2) {
                           MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                             confirmButtonClass:'confirmButtonClass'
                           })
                       } else if(data.resData.active == 3){
                           MessageBox.alert('亲，活动已经结束啦!', '提示', {
								confirmButtonClass:'confirmButtonClass'
							})
                       }
                   }
               }, {} ,1)
            },

            initData(){   // 初始化接口
                this.notLogPost('/activity/newYearPK/showNewYearLuckyBag', (data) => {
                    console.log(data)
                    this.isLogin = data.resData.isLogin;  // 是否登录  1、登录  2、没登录;
                    if(data.resCode == 1){
                        this.surplus = data.resData.surplus;  // 拆福袋剩余次数
                        this.wishState = data.resData.makeWishState;  // 心愿  1、已许愿  2、未许愿
                        this.wishText = data.resData.wishContent;  // 后台用户许下心愿内容	
                    }
                }, (this.osType ? {
                    oauthToken:this.token
                } : {}),1)
            },

            getRedPack(index){  // 点击立即领取红包事件
                if (this.activityTime == 2) {
                    MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                } else if(this.activityTime == 3){
                    MessageBox.alert('亲，活动已经结束啦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                } else {
                    if (this.isLogin == 1) {
                        if (this.surplus == 0) {   //  当领福卡次数==0提示
                            MessageBox.alert('当日领福卡次数已经用完', '提示', {
                                confirmButtonClass:'confirmButtonClass'
                            })
                        } else {
                            MessageBox.confirm('<p class="chai_p">您是否拆取福卡！<p><span class="span_text">“拆”得奖励在我的福卡或我的红包优惠中查看。</span>', {
                                confirmButtonText: '确定',
                                confirmButtonClass: 'confirmButton',
                                cancelButtonClass: 'cancelButton',
                            }).then(action => {
                                this.getAppData('/activity/newYearPK/openLuckyBag', (data) => {
                                    console.log(data)
                                    if(data.resCode == 1){
                                       this.surplus = data.resData.surplus;  // 领卡次数
                                       this.awardsList = data.resData.awards; // 奖励集合
                                       this.popUp = 2;  // 领卡弹框
                                    }                                     
                                }, (this.osType ? {
                                    luckyBagType : index   // 福袋下标
                                } : {
                                    luckyBagType : index   // 福袋下标
                                }))
                            },action => {})
                        }
                    } else if(this.isLogin == 2){
                        MessageBox.confirm('亲！您还未登录，请登录后参与活动。','提示', {
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
						},action => {})
                    }
                }
            },

            descInput(){   // textarea字数统计
               let txtValue = this.textValue.length;
               this.remnant = txtValue;
            },

            toPK(){  // 跳转pk活动页面
                if(!this.osType){
                  $(document).scrollTop(0)
                }
                this.$router.push({
                    path:'/wx/theNewYearAboutWarPK',
                    query:this.$route.query
                })
            },

            toFK() {  // 跳转我的福卡页面
                if(this.activityTime == 2){
                   MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                } else if(this.activityTime == 3){
                    MessageBox.alert('亲，活动已经结束啦!', '提示', {
						confirmButtonClass:'confirmButtonClass'
					})  
                } else{
                    if(this.isLogin == 1){
                        if (!this.osType) {
                            $(document).scrollTop(0);
                        }
                        this.$router.push({
                            path:'/wx/theNewYearAboutWarPKB',
                            query:this.$route.query
                        })
                    } else if(this.isLogin == 2){
                       MessageBox.confirm('亲！您还未登录，请登录后参与活动。','提示', { 
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
						},action => {})
                    }
                }
                
            },
 
            toInvest(){   // 去出借
                this.toApp('WIP', {
                    path: '/wxInvest',
                    query: {
                        thisUrl: this.$route.funllPath
                    }
                })
            },
            
            submitEvent(){    // 点击提交心愿按钮
                if (this.activityTime == 2) {
                    MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                } else if(this.activityTime == 3){
                    MessageBox.alert('亲，活动已经结束啦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                } else {
                    if(this.isLogin == 1){
                        if(this.textValue.replace(/(^\s*)|(\s*$)/g, "")==""){   // 内容不能是空或者全部是空格
                            Toast({
                                message: '亲，内容不能为空或者全部是空格哦!',
                                duration: 1000
                            })
                            this.textValue = '';
                            this.remnant = 0;
                        } else {
                            this.getAppData('/activity/newYearPK/makeWish', (data) => {
                                console.log(data);
                                if(data.resCode == 1){
                                    Toast({
                                        message: '提交成功!',
                                        duration: 1000
                                    })
                                    this.wishState = data.resData.makeWishState;  // 许愿状态	
                                    this.wishText = data.resData.wishContent;  // 后台用户许下心愿内容
                                }
                            }, (this.osType ? {
                                wishContent:this.textValue
                            } : {
                                wishContent:this.textValue
                            }))
                        }
                    } else if(this.isLogin == 2){
                        MessageBox.confirm('亲！您还未登录，请登录后参与活动。','提示', {
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
						},action => {})
                    }
                }
            }

        },
        created:function(){
            this.timeLimit();  // 活动时间
            this.initData(); // 初始化接口
        },
        mounted(){
           var that = this;
            var index = 0;
            var ulWidth = this.$refs.redItem[0].clientWidth * (this.redList.length - 1)
            this.$refs.ulList.style.width = (ulWidth + this.$refs.redItem[0].clientWidth) + 'px';
            this.timer = window.setInterval(function() {
                if (index >= ulWidth) {
                    index = 0
                } else {
                    that.$refs.ulList.style.left = -(ulWidth - (ulWidth - (index++))) + 'px';
                }
            }, 20)

            $('html','body').css({'width':'100%','height':'100%'});   // 固定定位底部是兼容iphoneX

            if(this.osType){   //  判断是否在APP里顶部滚动条的样式
                $('#list').css("top","0")
            } else {
                $('#list').css("top","1.3rem")
            }
  
            // 数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1272871784&web_id=1272871784 '
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        destroyed(){   // 实例销毁后调用
           clearInterval(this.timer);  // 销毁后清除时间函数
        },
        components:{
            wxHeader,
        },
        watch:{
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
<style>
	.confirmButton,
	.cancelButton,.confirmButtonClass {
		font-size: 0.48rem !important;
    }
    .mint-msgbox-message{
        line-height: .45rem;
    }
    .chai_p{
        color:#333;
        margin-bottom: .2rem;
    }
    .span_text{
        font-size: .373333rem;
        color: #FF0000;
        line-height: 0;
    }
    .mint-toast.hint_class{
        /* width: 90%!important; */
    }
</style>
<style lang="scss" scoped>
 html,body{
        width: 100%;
        height: 100%;
    }
// 树的动画
    @-webkit-keyframes moveLeft{
        0%{
            -webkit-transform: translateX(-2.066667rem);
            -moz-transform: translateX(-2.066667rem);
            -ms-transform: translateX(-2.066667rem);
            -o-transform: translateX(-2.066667rem);
            transform: translateX(-2.066667rem);
        }
        100%{
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @-moz-keyframes moveLeft{
        0%{
            -webkit-transform: translateX(-2.066667rem);
            -moz-transform: translateX(-2.066667rem);
            -ms-transform: translateX(-2.066667rem);
            -o-transform: translateX(-2.066667rem);
            transform: translateX(-2.066667rem);
        }
        100%{
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @-ms-keyframes moveLeft{
        0%{
            -webkit-transform: translateX(-2.066667rem);
            -moz-transform: translateX(-2.066667rem);
            -ms-transform: translateX(-2.066667rem);
            -o-transform: translateX(-2.066667rem);
            transform: translateX(-2.066667rem);
        }
        100%{
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @-o-keyframes moveLeft{
        0%{
            -webkit-transform: translateX(-2.066667rem);
            -moz-transform: translateX(-2.066667rem);
            -ms-transform: translateX(-2.066667rem);
            -o-transform: translateX(-2.066667rem);
            transform: translateX(-2.066667rem);
        }
        100%{
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
        }
    }
    @keyframes moveLeft{
        0%{
            -webkit-transform: translateX(-2.066667rem);
            -moz-transform: translateX(-2.066667rem);
            -ms-transform: translateX(-2.066667rem);
            -o-transform: translateX(-2.066667rem);
            transform: translateX(-2.066667rem);
        }
        100%{
            -webkit-transform: translateX(0);
            -moz-transform: translateX(0);
            -ms-transform: translateX(0);
            -o-transform: translateX(0);
            transform: translateX(0);
        }
    }

    @-webkit-keyframes moveRight{
        0%{
            -webkit-transform: translateX(11rem);
            -moz-transform: translateX(11rem);
            -ms-transform: translateX(11rem);
            -o-transform: translateX(11rem);
            transform: translateX(11rem);
        }
        100%{
            -webkit-transform: translateX(0rem);
            -moz-transform: translateX(0rem);
            -ms-transform: translateX(0rem);
            -o-transform: translateX(0rem);
            transform: translateX(0rem);
        }
    }
    @-moz-keyframes moveRight{
        0%{
            -webkit-transform: translateX(11rem);
            -moz-transform: translateX(11rem);
            -ms-transform: translateX(11rem);
            -o-transform: translateX(11rem);
            transform: translateX(11rem);
        }
        100%{
            -webkit-transform: translateX(0rem);
            -moz-transform: translateX(0rem);
            -ms-transform: translateX(0rem);
            -o-transform: translateX(0rem);
            transform: translateX(0rem);
        }
    }
    @-ms-keyframes moveRight{
        0%{
            -webkit-transform: translateX(11rem);
            -moz-transform: translateX(11rem);
            -ms-transform: translateX(11rem);
            -o-transform: translateX(11rem);
            transform: translateX(11rem);
        }
        100%{
            -webkit-transform: translateX(0rem);
            -moz-transform: translateX(0rem);
            -ms-transform: translateX(0rem);
            -o-transform: translateX(0rem);
            transform: translateX(0rem);
        }
    }
    @-o-keyframes moveRight{
        0%{
            -webkit-transform: translateX(11rem);
            -moz-transform: translateX(11rem);
            -ms-transform: translateX(11rem);
            -o-transform: translateX(11rem);
            transform: translateX(11rem);
        }
        100%{
            -webkit-transform: translateX(0rem);
            -moz-transform: translateX(0rem);
            -ms-transform: translateX(0rem);
            -o-transform: translateX(0rem);
            transform: translateX(0rem);
        }
    }
    @keyframes moveRight{
        0%{
            -webkit-transform: translateX(11rem);
            -moz-transform: translateX(11rem);
            -ms-transform: translateX(11rem);
            -o-transform: translateX(11rem);
            transform: translateX(11rem);
        }
        100%{
            -webkit-transform: translateX(0rem);
            -moz-transform: translateX(0rem);
            -ms-transform: translateX(0rem);
            -o-transform: translateX(0rem);
            transform: translateX(0rem);
        }
    }

    // 页面底部动画
    @-webkit-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @-moz-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @-ms-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @-o-keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }
    @keyframes sf {
        0%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
        50%{
            -webkit-transform: scale(.8);
            -moz-transform: scale(.8);
            -ms-transform: scale(.8);
            -o-transform: scale(.8);
            transform: scale(.8);
        }
        100%{
            -webkit-transform: scale(1);
            -moz-transform: scale(1);
            -ms-transform: scale(1);
            -o-transform: scale(1);
            transform: scale(1);
        }
    }

    // 立即领取动画样式
    @-webkit-keyframes go {
        0% {
            -webkit-transform: rotate(5deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(5deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(5deg);
			-o-transform: top center;
			-ms-transform: rotate(5deg);
			-ms-transform: top center;
            transform: rotate(5deg);
            transform-origin: top center;
        }
        100% {
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-moz-keyframes go {
        0% {
			 -moz-transform: rotate(5deg);
            -moz-transform-origin: top center;
            -webkit-transform: rotate(5deg);
            -webkit-transform-origin: top center;
			-o-transform: rotate(5deg);
			-o-transform: top center;
			-ms-transform: rotate(5deg);
			-ms-transform: top center;
            transform: rotate(5deg);
            transform-origin: top center;
        }
        100% {
			-moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-o-keyframes go {
        0% {
			-o-transform: rotate(5deg);
			-o-transform: top center;
            -webkit-transform: rotate(5deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(5deg);
            -moz-transform-origin: top center;
			-ms-transform: rotate(5deg);
			-ms-transform: top center;
            transform: rotate(5deg);
            transform-origin: top center;
        }
        100% {
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
	@-ms-keyframes go {
        0% {
			-ms-transform: rotate(5deg);
			-ms-transform: top center;
            -webkit-transform: rotate(5deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(5deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(5deg);
			-o-transform: top center;			
            transform: rotate(5deg);
            transform-origin: top center;
        }
        100% {
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
    @keyframes go {
        0% {
            -webkit-transform: rotate(5deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(5deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(5deg);
			-o-transform: top center;
			-ms-transform: rotate(5deg);
			-ms-transform: top center;
            transform: rotate(5deg);
            transform-origin: top center;
        }
        100% {
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
            -moz-transform: rotate(-3deg);
            -moz-transform-origin: top center;
			-o-transform: rotate(-3deg);
            -o-transform-origin: top center;
			-ms-transform: rotate(-3deg);
            -ms-transform-origin: top center;
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
    /*占位符文字颜色*/
    ::-webkit-input-placeholder { /* WebKit browsers */ 
        color: #666; 
         font-size: .34rem; 
    } 
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */ 
        color: #666; 
        font-size: .34rem; 
    } 
    ::-moz-placeholder { /* Mozilla Firefox 19+ */ 
        color: #666; 
        font-size: .34rem; 
    } 
    :-ms-input-placeholder { /* Internet Explorer 10+ */ 
        color: #666; 
        font-size: .34rem; 
    }  textarea::-webkit-input-placeholder { 
         color: #666; 
        font-size: .34rem; 
    } textarea:-moz-placeholder { 
        color: #666; 
        font-size: .34rem; 
    }
    #theNewYearAboutWarLuckyBag{
        font-family: DIN-Medium;
        .main{
            width:100%;
            height: 36.32rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_bg.png?v=1.6) no-repeat;
            background-size: cover; 
            position: relative;
            overflow: hidden;
            .list{
                width: 100%;
                height: .8rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/scroll_bg.png?v=1.0) no-repeat;
                background-size: cover; 
                color: #fff;
                font-size: .32rem;
                z-index: 99;
                overflow: hidden;
                position: fixed;
                left: 0;
                padding: 0 1rem;
                ul{
                    position: relative;
                    left: 0;top:0;
                    li{
                        width: 9rem;
                        height: .8rem;
                        overflow: hidden;
                        float: left;
                        text-align: center;
                        line-height: .8rem;
                    }
                }
            }
            .rule_btn,.my_fa_btn{
                width: 1.386667rem;
                height: 1.386667rem;
                position:fixed;
                right: 0;
                z-index: 99;
            }
            .rule_btn{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_rule_btn.png?v=1.0) no-repeat;
                background-size: cover; 
                top: 8.25rem;
            }
            .rule_box,.get_popUp_box{
                position: fixed;
                top: 0;left:0;
                right:0;bottom: 0;
                margin: auto;
                z-index: 100;
                .close_btn{
                    width: .8rem;
                    height: .8rem;
                    position: absolute;
                }
            }
            .rule_box{
                width: 8.92rem;
                height: 14.146667rem;
                padding: 13rem 0 0 .78rem ;
                font-size: .32rem;
                color: #c81f0f;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_rule_box.png?v=1.1) no-repeat;
                background-size: cover; 
                    a{
                        position: absolute;
                        bottom: 1.28rem;
                        right: 2.5rem;
                        font-family: "微软雅黑";
                        color: #48a4ff;
                     }
                .close_btn{
                     right: 0.4rem;
                     top: 1.05rem;
                }
            }
            .get_popUp_box{
                width:8.8rem;
                height: 9.88rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_get_box.png?v=1.0) no-repeat;
                background-size: cover; 
                padding-top: 3.333333rem;
                text-align: center;
                .close_btn{
                     right: 1.28rem;
                     top: 1.05rem;
                }
                h3{
                   color: #D21D0B;
                   text-align: center;
                   margin-bottom: .426667rem;
                   font-size: .42rem;
                }
                p{
                    color: #FF3B1C;
                    margin-bottom: .506667rem;
                }
                .go_btn{
                    width: 3.5rem;
                    height: 1.066667rem;
                    position: absolute;
                    bottom:1.1rem;
                    left:0;right:0;
                    margin: auto;
                }
            }
            .my_fa_btn{
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_myfa_btn.png?v=1.0) no-repeat;
                background-size: cover; 
                top: 9.7rem;
            }
            .tree_img1{
                width: 1.973333rem;
                height: 1.68rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_tree1.png?v=1.0) no-repeat;
                background-size: cover;
                position:absolute;
                top: .48rem;
                left: .466667rem;
                animation: moveLeft .5s linear forwards;
            }
            .tree_img2{
                width: 2.066667rem;
                height: 1.88rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_tree2.png?v=1.0) no-repeat;
                background-size: cover;
                position:absolute;
                top: 7.746667rem;
                left: 0;
                -webkit-animation: moveLeft .5s linear forwards;
                -moz-animation: moveLeft .5s linear forwards;
                -ms-animation: moveLeft .5s linear forwards;
                -o-animation: moveLeft .5s linear forwards;
                animation: moveLeft .5s linear forwards;
            }
            .tree_img3{
                width: 1.213333rem;
                height: 2.44rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_tree3.png?v=1.0) no-repeat;
                background-size: cover;
                position:absolute;
                top: 4.613333rem;
                right: .466667rem;
                -webkit-animation: moveRight .5s linear forwards;
                -moz-animation: moveRight .5s linear forwards;
                -ms-animation: moveRight .5s linear forwards;
                -o-animation: moveRight .5s linear forwards;
                animation: moveRight .5s linear forwards;
            }
            .chance_box{
                width: .506667rem;
                height: .68rem;
                position: absolute;
                top: 11.026667rem;
                left: 6.6rem;
                text-align: center;
                line-height: .68rem;
                font-size: .373333rem;
                color: #fff;
            }
            .get_box{
                width: 100%;
                height: 6.093333rem;
                margin-top: 13.2rem;
                .swiper-wrapper{
                    margin: 0 auto;
                    .swiper-slide{
                        width: 5.266667rem;
                        height: 6.093333rem;
                        transform: scale(.8);
                        background-size:100% 100%!important;
                        position: relative;
                        .get_btn{
                            width: 1.6rem;
                            height: 2.253333rem;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_get_btn.png?v=1.1) no-repeat;
                            background-size: cover;
                            position: absolute;
                            top: .48rem;
                            right: -.2rem;
                            -webkit-animation: go 1s ease-in-out alternate infinite;
                            -moz-animation: go 1s ease-in-out alternate infinite;
                            -ms-animation: go 1s ease-in-out alternate infinite;
                            -o-animation: go 1s ease-in-out alternate infinite;
                            animation: go 1s ease-in-out alternate infinite;
                        }
                    }
                    .swiper-slide.swiper-slide-active{
                        transform: scale(1);
                        transition: all 0.7s;
                    }

                } 
                .swiper-slide-active{
                        background-size:cover; 
                }               
            }
            .wish_box{
                width: 9rem;
                height: 5rem;
                position: absolute;
                top: 21.213333rem;
                left: 0;right: 0;
                margin: auto;
                padding: 1.893333rem 0 0 1.08rem;
                    .not_wish_box{
                        width: 6.8rem;
                        height: 3.17rem;
                        position: relative;
                        textarea{
                        width: 6.8rem;
                        height: 1.733333rem;
                        padding: .346667rem;
                        border: none;
                        resize: none;
                        font-size: .32rem;
                        color: #333;
                    }
                    p{
                        position: absolute;
                        bottom: 1.6rem;
                        right: .2rem;
                        font-size: .32rem;
                        color: #999;
                    }
                    .sub_btn{
                        width: 2.986667rem;
                        height: 1.253333rem;
                        position: absolute;
                        top: 2rem;
                        left: 0;right: 0;
                        margin: auto;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_sub_btn.png?v=1.0) no-repeat;
                        background-size: cover; 
                    }
                }
                .yes_wish_box{
                    width: 6.8rem;
                    height: 1.733333rem;
                    padding: .346667rem;
                    p{
                        color: #D03C21 ;
                        font-size: .4rem; 
                        font-weight: 700;
                    }
                }
            }
            
            .bottom_box{
                width: 100%;
                height: 2.506667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_bottom.png?v=1.1) no-repeat;
                background-size:cover; 
                position: fixed;
                bottom: 0;
                left: 0;
                z-index: 99;
            }
            .bottom_btn{
                width: 2.266667rem;
                height: 2.266667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/theNewYearAboutWar/fk_bottom_btn.png?v=1.0) no-repeat;
                background-size:cover; 
                position: fixed;
                bottom: .3rem;
                left: 0;right: 0;
                margin: auto;
                z-index: 99;
                -webkit-animation: sf 1.5s infinite;
                -moz-animation: sf 1.5s infinite;
                -ms-animation: sf 1.5s infinite;
                -o-animation: sf 1.5s infinite;
                animation: sf 1.5s infinite;
            }
        }
        .mark_box{
            width: 100%;
			height: 100%;
			position: fixed;
			top: 0;right: 0;
			left: 0;bottom: 0;
			margin: auto;
			background: #000;
			opacity: .7;
			z-index: 99;
        }
        
    }
</style>
