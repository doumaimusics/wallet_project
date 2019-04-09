<template>
    <!-- 积分慈善活动 -->
   <div id="charitable">
       <div v-title v-if="$route.query.projectId">项目详情</div>
       <div v-title v-else>积分公益</div>
       <div class="RightTab" v-if="(!osType || versionfunegt(vcode,'3.6.3')) && !$route.query.projectId" @click="appRouter('/charitable/myCharity')"></div>
       <div class="setTop" v-if="setTop" @click="goTop"></div>
       <div class="swipe">
            <mt-swipe :auto="4000" :showIndicators="true">
                <mt-swipe-item v-for="(item,index) in commonweal.picList">
                    <div @click="bannerImgShow(index)">
                       <img :src="item" alt="">  
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>

        <div class="speed">
            <div class="introduce">
                <div class="received">已集公益积分
                    <em>{{commonweal.yesRaiseScore | moneyFormat(1)}}</em></div>
                <div class="raiseScore">目标积分 <em>{{commonweal.raiseScore}}</em></div>
            </div>
            <div class="percentage"><div class="recei" :style="{width:(commonweal.yesRaiseScore/commonweal.raiseScore)*100+'%' }"></div></div>
            <div class="tips">公益以平台捐增的积分兑换成公益金(人民币)进行公益捐赠，100积分=1元！</div>
        </div>
        <!-- 项目简介 -->
        <div class="profiles" v-if="commonweal.introduction">
            <div class="title">项目简介</div>
            <div class="conter" v-html="commonweal.introduction"></div>
        </div>
        <!-- 发起与善款接收机构 -->
        <div class="receiving" v-if="commonweal.receivingInstitution">
            <div class="title">发起与善款接收机构</div>
            <div class="conter" v-html="commonweal.receivingInstitution"></div>
        </div>
        <!-- 项目进展 -->
        <div class="debriefing receiving">
            <div class="title" v-if="$route.query.projectId">项目记录</div>
            <div class="title" v-else>项目进展</div>
            <ul class="item" v-if="commonweal.commonwealList.length">
                <li class="" v-for="(v, i) in commonweal.commonwealList">
                    <div class="itemBox">
                        <div class="title">【第{{v.period}}期】{{v.commonwealName}}</div>
                        <div class="time">{{v.addTime}}</div>
                        <a class="comment" v-html="v.projectRecord" :href="v.recordUrl != '' ? v.recordUrl : 'javascript:;'"></a>
                        <div class="imgBox" v-if="v.picPaths.length">
                            <div v-if="j < 3" v-for="(item,j) in v.picPaths" @click="debriefingImgShow(v.picPaths,j)">
                                <img :src="item">
                                <div class="more_box" v-if="v.picPaths.length>3">
                                    <div class="more_img"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="null" v-else>
                <img src="https://aliyunsso.edspay.com/web/wx/integralStroe/groups.png" alt="">
                <p v-if="$route.query.projectId">暂无项目详情</p>
                <p v-else>暂无项目进展</p>
            </div>
        </div>
        <!-- 底部按钮 -->
        <div class="donate">
            <div class="intWishList_btn" @click="goWishList"></div>
            <div v-if="commonweal.status == 1" class="btn" @click="myCalculator">我要捐赠</div>
            <div v-else class="btn over">已完成</div>
        </div>

        <!--  -->
        <mt-popup
		v-model="calculator"
		position="bottom"
		:closeOnClickModal="false">
			<div class="calculatorBox">
				<div class="title">
					<div class="name fl">我要捐赠
						<div class="jifen">可用积分:<em>{{commonweal.useScore ? commonweal.useScore : 0}}分</em></div>
					</div>
					<div class="del">
						<i @click="calculator = false" class="del el-icon-close"></i>
					</div>
				</div>
				<div class="investList">
					<div class="list" @click="computing(i)" v-for="(item, i) in investList" :class="{active: i == investIndex}">{{item}}积分<i></i></div>
                    <div class="inputBox">
                        <input @input='checkNum' placeholder="自定义积分" v-model="integral">
                        <div v-if="integral" @click="integral = ''" class="dels"></div>
                    </div>
					<div class="result" @click="submitForm">确认捐赠</div>
				</div>
			</div>
		</mt-popup>
        <!-- 确认捐赠的弹框 -->
        <dia-logs v-if="showThis.isShow" :showThis="showThis" :text="diaLogText" :btn="1" :btnText="btnText" :confirm="confirmSubmit"></dia-logs>
        <!-- 捐赠成功的弹框 -->
        <div class="Layer" v-if="showSuccess" v-layer></div>
        <div v-if="showSuccess" class="successLayer">
			<div id="star1" class="star star1"></div>
			<div id="star2" class="star star2"></div>
			<div id="star3" class="star star3"></div>
			<div id="star4" class="star star4"></div>
            <div class="title" v-if="!flag">恭喜您捐赠成功</div>
            <div class="title" v-else>恭喜您捐赠{{score}}积分！</div>
            <div class="tip" v-if="!flag">请在我的公益中查看我的【捐赠记录】</div>
            <div class="tip" v-else>该项目已募集完成！</div>
			<div class="closeBtn" @click="hideSuccess"></div>
		</div>
        <!-- banner点击图片放大弹窗 -->
        <div class="proveBox" v-if="proveVisibleTow == 1" @click="proveVisibleTow = 0">
            <div class="swipe_box">
                <swiper :options="swiperOptionBanner">
                   <swiper-slide v-for="item in commonweal.picList">
                       <img :src="item" alt="">
                   </swiper-slide>
                   <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>

        <!-- 项目进展点击图片放大弹窗 -->
        <div class="proveBox" v-if="proveVisibleTow == 2" @click="proveVisibleTow = 0">
            <div class="swipe_box">
                <swiper :options="swiperOptionDebriefing">
                    <swiper-slide v-for="(v, i) in debriefingArr">
                       <img :src="v" alt="">
                   </swiper-slide>
                   <div class="swiper-pagination" slot="pagination"></div>
                </swiper>
            </div>
        </div>
   </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp';
    import diaLogs from '../../../../public/wx/wxPublicDialog';
    import { swiper, swiperSlide } from 'vue-awesome-swiper';
    import { Popup, Toast } from 'mint-ui';
    export default {
        mixins:[wxToapp],
        data() {
            return {
                flag: false,
                score: 0,
                setTop: false,
                showSuccess: false,
                showThis:{
                    isShow: false
                },
                diaLogText: '',
                btnText: ['取消','确定'],
                isCan: 1,
                integral: '',
                integralCopy: '',
                investList: [10, 20, 50, 100],
                investIndex: 0,
                calculator: false,
                commonweal: {
                    commonwealList: []
                },
                fullHeight: {
                  minHeight: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
                },
                proveVisibleTow:0,  // 点击图片放大 1、banner的图片   2、项目进展图片
                swiperOptionBanner: {   // banner图片放大轮播的配置
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    initialSlide:0 ,
                    spaceBetween: 0,
                    pagination : '.swiper-pagination',
                    paginationClickable :true
                },
                swiperOptionDebriefing: {   // 项目进展图片放大轮播的配置
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    initialSlide:0 ,
                    spaceBetween: 0,
                    pagination : '.swiper-pagination',
                    paginationClickable :true
                },
                debriefingArr:[],  // 项目进展下标
            }
        },
        watch: {
            integral:function () {
                if(this.integral == ''){
                    this.investIndex = 0;
                }
            } 
        },
        methods: {
            checkNum (e) {           // input数字验证
                this.$nextTick(() => {
                    this.integral =  e.target.value.replace(/[^\d]/g,'');
                    e.target.value < 1 ? this.integral = '' : ''
                    this.integral == '' ? this.investIndex = 0 : this.investIndex = -1
                })
            },

            goWishList(){   //跳转排行榜
                this.appRouter('/intWishList',{projectId: this.commonweal.id,period:this.commonweal.period,name:this.commonweal.name});
            },
            myCalculator(){
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                this.calculator = true
            },
            hideSuccess(){
                this.flag = false
                this.showSuccess = false
            },
            submitForm(){
                if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    return
                }
                let val = this.integral
                this.integral == '' ? val = parseInt(this.investList[this.investIndex]) : val = parseInt(this.integral);
                this.integral == '' ? this.score = parseInt(this.investList[this.investIndex]) : this.score = parseInt(this.integral);
                if((this.score + this.commonweal.yesRaiseScore) > this.commonweal.raiseScore){
                    this.flag = true
                    this.score = this.commonweal.raiseScore - this.commonweal.yesRaiseScore
                }else{
                    this.flag = false
                }
                this.showThis.isShow = true
                this.calculator = false
                if(this.score < this.commonweal.useScore || this.score == this.commonweal.useScore){
                    this.diaLogText = '您是否确定捐赠' + parseInt(val) +'积分？';
                    this.btnText = ['取消','确定'];
                    this.isCan = 1;
                }else{
                    this.diaLogText = '您当前积分不足！';
                    this.btnText = ['取消','赚取积分'];
                    this.isCan = 2;
                }
            },
            confirmSubmit(){
                this.showThis.isShow = false
                if(this.isCan == 1){
                    this.integral = ''
                    this.investIndex = 0
                    this.getAppData('/commonweal/donation',(data) =>{
                        if(data.resCode == 1){
                            this.showSuccess = true
                            this.calculator = false
                            this.xinxin()
                            this.initData()
                        }
                    },{id: this.commonweal.id,score:this.score})
                }else{
                    this.appRouter('/intEarn')
                }
            },
            computing(n){
                this.investIndex = n
                this.integral = ''
            },
            xinxin(){
                setInterval(() =>{
                    $("#star1").animate({opacity:0},600).animate({opacity:1}, 600)
                },1200);
                setInterval(() =>{
                    $("#star2").animate({opacity:0},500).animate({opacity:1}, 600)
                },1000);
                setInterval(() =>{
                    $("#star3").animate({opacity:0},550).animate({opacity:1}, 450)
                },1000);
                setInterval(() =>{
                    $("#star4").animate({opacity:0},500).animate({opacity:1}, 450)
                },1000);
            },
            initData(){
                let json= {};
                this.$route.query.projectId ? json.id = this.$route.query.projectId : ''
                this.getNotlogData('/commonweal/index',(data) =>{
                    console.log(data)
                    if(data.resCode == 1){
                        this.commonweal = data.resData
                    }
                },json)
            },
            menu(){
                let scroll = document.documentElement.scrollTop || document.body.scrollTop;
                let KH = document.documentElement.clientHeight
                if(scroll > KH){
                    this.setTop = true
                }else{
                    this.setTop = false
                }
            },
            goTop(){
                $('body,html').animate({ scrollTop: 0 }, 800);
            },
            bannerImgShow(sub){  // banner图片点击事件
                this.proveVisibleTow = 1;
                this.swiperOptionBanner.initialSlide = sub;
            },
            debriefingImgShow(arr,sub){  // 项目进展图片点击事件
                 this.proveVisibleTow = 2;
                 this.debriefingArr = arr;  // 项目进展图片集合
                 this.swiperOptionDebriefing.initialSlide = sub;
            }

        },
        created: function() {
            this.initData()
            if(this.$route.query.projectId){
                this.PassValue('NavWhite_项目详情');
            }else{
                this.PassValue('NavWhite_积分公益');
                this.PassValue('showDonation');
            }
        },
        mounted: function() {
            window.addEventListener('scroll', this.menu)
        },
        beforeDestroy(){
            window.removeEventListener('scroll', this.menu)
            this.PassValue('hideDonation');
        },
        components: {
            swiper,
            swiperSlide,
            diaLogs
        }
   }
</script>

<style lang="scss" scoped>
    #charitable{
        font-family: PingFangSC-Regular;
        text-align: center;
        .RightTab{
            width: 2.24rem;
			height: 2.24rem;
			position: fixed;
			right: .133333rem;
			bottom: 1.466667rem;
			z-index: 99;
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/charitable.png) no-repeat ;
			background-size: 100%;
        }
        .setTop{
            width: 2.24rem;
			height: 2.24rem;
			position: fixed;
			right: .133333rem;
			bottom: 3.7rem;
			z-index: 99;
			background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/setTop.png) no-repeat ;
			background-size: 100%;
        }
        .swipe{
			height: 5rem;
			width: 100%;
			position: relative;
			clear: both;
			background:#ffffff;
            img{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: flex-end;
                pointer-events: none; 
			}
        }
        .speed{
            background: #FFFFFF;
            width: 9.2rem;
            height: 2.56rem;
            padding: .28rem .4rem 0;
            margin: 0 auto;
            position: relative;
            top: -1.386667rem;
            background: #FFFFFF;
            z-index: 9;
            box-shadow: 0 2px 14px 0 rgba(0,0,0,0.17);
            .introduce{
                height: .64rem;
                line-height: .64rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: .293333rem;
                margin-bottom: .2rem;
                .received{
                    color: #666;
                    em{
                        font-family: DIN-Medium;
                        font-size: .533333rem;
                        color: #FF0C0C;
                    }
                }
                .raiseScore{
                    margin-top: .186667rem;
                    height: .48rem;
                    line-height: .48rem;
                    color: #808080;
                    em{
                        font-size: .346667rem;
                        vertical-align: bottom;
                        color: #333;
                    }
                }
            }
            .percentage{
                width: 100%;
                height: .186667rem;
                margin-bottom: .2rem;
                background: #FFE4E3;
                border-radius: .093333rem;
                position: relative;
                .recei{
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 100%;
                    width: 50%;
                    background-image: linear-gradient(90deg, #FF6554 0%, #FF3F38 100%);
                    z-index: 10;
                    border-radius: .093333rem;
                }
            }
            .tips{
                font-size: .293333rem;
                color: #999999;
                line-height: .426667rem;
                text-align: left;
            } 
        }
        .profiles{
            width: 100%;
            position: relative;
            background: #fff;
            top: 0;
            padding: 1.92rem .533333rem .4rem;
            margin-bottom: .266667rem;
            margin-top: -2.56rem;
            z-index: 8;
            .title{
                font-size: .4rem;
                color: #333;
                text-align: left;
                line-height: .56rem;
                font-weight: 600;
                margin-bottom: .266667rem;
            }
            .conter{
                font-size: .346667rem;
                color: #808080;
                text-align: justify;
                line-height: .586667rem;
            }
        }
        .receiving{
            width: 100%;
            background: #fff;
            padding: .4rem .533333rem;
            margin-bottom: .266667rem;
            .title{
                font-size: .4rem;
                color: #333;
                text-align: left;
                line-height: .56rem;
                font-weight: 600;
                margin-bottom: .133333rem;
            }
            .conter{
                font-size: .346667rem;
                color: #808080;
                text-align: justify;
                line-height: .586667rem;
            }
        }
        .debriefing{
            margin-bottom: 2rem;
            position: relative;
            padding: .4rem .533333rem 0;
            .title{
                margin-bottom: .56rem;
            }
            .item{
                // padding-bottom: 1.6rem;
                li{
                    // position: relative;
                    padding-left: .466667rem;
                     border-left: 1px solid #e5e5e5;
                     padding-bottom: .533333rem;
                    .itemBox{
                        position: relative;
                        top: -.15rem;
                        .title{
                            font-size: .346667rem;
                            color: #000;
                            line-height: .493333rem;
                            margin-bottom: .066667rem;
                        }
                        .title:before {
                            content: '';
                            background: #FF433B;
                            display: inline-block;
                            width: .186667rem;
                            height: .186667rem;
                            border-radius: .093333rem;
                            margin-left: -.57rem;
                            margin-right: .433333rem;
                            position: absolute;
                            top: .146667rem;
                        }
                        .time{
                            font-size: .32rem;
                            color: #9b9b9b;
                            line-height: .44rem;
                            margin-bottom: .133333rem;
                            text-align: left;
                        }
                        .comment{
                           color: #737373;
                           font-size: .346667rem;
                           text-align: justify;
                           line-height: .533333rem; 
                           margin-bottom: .266667rem;
                        }
                        .imgBox{
                            width: 100%;
                            height: 1.866667rem;
                            // margin-bottom: .533333rem;
                            display: flex;
                            justify-content: flex-start;
                            position: relative;
                            img{
                                margin-right: .146667rem;
                                width: 2.733333rem;
                                height: 1.866667rem;
                                pointer-events: none; 
                            }
                            .more_box{
                                width: 2.733333rem;
                                height: 1.866667rem;
                                position: absolute;
                                top:0;
                                right: 0;                              
                                background: rgba(51, 51, 51, 0.3);
                                .more_img{
                                    width: .613333rem;
                                    height: .133333rem;
                                    background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/more.png?v=1.1) no-repeat;
                                    background-size:100% 100%; 
                                    position: absolute;
                                    bottom: 0.85rem;
                                    right: 1.1rem; 
                                }
                                
                            }
                        }
                        
                    }
                }
                li:last-child{
                    padding-bottom: .2rem;
                }
            }
            .null{
                width: 6.4rem;
                height: 6.8rem;
                margin: auto;
                p{
                    font-size: 0.346667rem;
                    color: #808080;
                    margin-bottom: 0.266667rem;
                }
                img{
                    width: 6.4rem;
                    height: 4.533333rem;
                    margin-bottom: 0.4rem;
                }
            }
        }
        .donate{
            width: 100%;
            height: 1.6rem;
            position: fixed;
            left: 0;
            bottom: 0;
            background: #FFFFFF;
            box-shadow: 0 0 12px 0 rgba(0,0,0,0.12);
            z-index: 99;
            padding: 0 .533333rem;
            .intWishList_btn,.btn{
                width: 4.266667rem;
                height: 1.066667rem;
                float: left;
                margin: .266667rem auto;
            }
            .intWishList_btn{
                 margin-right: .4rem;
                 background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/intWishList_btn.png?v=1.1) no-repeat;
                 background-size: 100% 100%;
            }
            .btn{
                background: #F14B4B;
                border-radius: 100px;
                line-height: 1.066667rem;
                font-size: .426667rem;
                color: #fff;
                letter-spacing: .004267rem;
                
            }
            .btn.over{
                background-image: linear-gradient(-45deg, #FFD1CC 0%, #FFCECC 100%);
            }
        }
        .calculatorBox{
			width: 10rem;
			height: 5.546667rem;
			background: #fff;
			padding: .666667rem .4rem 0;
			.title{
				margin-bottom: .533333rem;
				.name{
					font-size: .426667rem;
					color: #333333;
					letter-spacing: 0.32;
					.jifen{
						font-size: .32rem;
						color: #808080;
						margin-left: .066667rem;
						display: inline-block;
						em{
							color: #151515;
						}
					}
				}
				.del{
					width: .666667rem;
					height: .666667rem;
					float: right;
					margin-top: -.2rem;
					i{
						text-align: center;
						line-height: .666667rem;
						font-size: .32rem;
						color: #979797;
					}
				}
			}
			.investList{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.list{
					width: 2.133333rem;
					height: .853333rem;
					line-height: .853333rem; 
					border: 1px solid #808080;
					text-align: center;
					color: #333333;
					font-size: .373333rem;
					margin-top: .533333rem;
					margin-bottom: .333333rem;
					position: relative;
				}
				.list.active{
					border: 1px solid #FF5B4C;
					color: #FF5B4C;
					i{
						display: block;
						width: .413333rem;
						height: .413333rem;
						background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/checkIcon.png) center center no-repeat;
						background-size: 100%;
						position: absolute;
						top: -1px;
						right: -1px;
					}
                }
                .inputBox{
                    position: relative;
                    width: 4.493333rem;
                    height: .853333rem;
                    input{
                        width: 4.493333rem;
                        height: .853333rem;
                        border: 1px solid #808080;
                        padding: .16rem .266667rem;
                        // margin-bottom: .54rem;
                        font-size: .373333rem;
                        color: #333;
                        border-radius: 0;
                        -webkit-appearance: none;
                    }
                    .dels{
                        width: .933333rem;
                        height: .853333rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/del.png) center center no-repeat;
                        background-size: .4rem .4rem;
                        position: absolute;
                        right: 0;
                        top: 0;
                    }
                }
                
				.result{
                    position: absolute;
                    bottom: 0;
                    left: 0;
					width: 10rem;
					height: 1.173333rem;
					font-size: .426667rem;
                    color: #fff;
                    line-height:  1.173333rem;
                    // background-image: linear-gradient(-45deg, #FF5E4C 0%, #FF4640 100%);
                    background: #F14B4B;
				}
			}
        }
        .successLayer{
            position: fixed;
            width: 7.093333rem;
            height: 9.666667rem;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 9999;
            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/drawRecord/charitableLayer.png)no-repeat center center / 7.093333rem 9.666667rem;
            .title{
                font-size: .48rem;
                line-height: .533333rem;
                color: #333;
                margin-top: 4.626667rem;
                margin-bottom: .333333rem;
            }
            .tip{
                font-size: .32rem;
                color: #808080;
                line-height: .44rem;
                margin-bottom: .266667rem;
            }
            // .tips{
            //     width: 100%;
            //     font-size: .4rem;
            //     color: #999;
            //     position: absolute;
            //     top: 50%;
            //     margin-top: 1.2rem;
            // }
            .star{
				position: absolute;
				background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/smallStars.png) no-repeat;
				background-size:100% 100%!important;
			}
			.star1{
				height:.4rem;
				width:.493333rem;
				top:0;
				left: 0;
				margin: .133333rem 0 0 2rem;
			}
			.star2{
				height:.64rem;
				width:.506667rem;
				top:0;
				right: 0;
				margin: 0 1.933333rem 0 0;
			}
			.star3{
				height:.64rem;
				width:.506667rem;
				top:0;
				left: 0;
				margin: 2.066667rem 0 0 1.506667rem;
			}
			.star4{
				height:.346667rem;
				width:.44rem;
				top:0;
				right: 0;
				margin: 2.066667rem 1.586667rem 0 0;
            }
            .closeBtn{
                width: 1.066667rem;
                height: 1.066667rem;
                position: absolute;
                bottom: 0;
                left: 50%;
                margin-left: -0.533333rem;
            }
        }
        // banner点击放大的样式
        .proveBox{
            background-color: rgba(0, 0, 0, 1); 
            height: 100%;
             width: 100%;
              position: fixed; top: 0px; left: 0px;
               z-index: 99999;
              .swipe_box{
                  width: 100%;
                 height: 100%;
                  .swiper-container{
                      width: 100%;
                       height: 100%;
                      overflow: visible;
                      img{
                        width: 100%;
                        position: absolute;
                        left: 0;
                        top:0;
                        bottom: 0;
                        right: 0;
                        margin: auto;
                    }
                  }
                  .swiper-container-horizontal > .swiper-pagination-bullets{
                      bottom: .666667rem;
                  }
                  
              }
        }
    }
</style>
<style lang="scss">
    #charitable{
        .mint-swipe-indicator{
            background: #fff;
            border-radius: 0.053333rem;
            width: .106667rem;
            height: 0.106667rem;
            opacity: 0.5;
        }
        .mint-swipe-indicator.is-active{
            width: 0.32rem;
            height: 0.106667rem;
            opacity: 1;
            border-radius: 0.053333rem;
        }
        .mint-indicator-wrapper{
            z-index: 9999;
            
        }
        .mint-swipe-indicators{
            bottom:1.653333rem;
            width: 50%;
            -webkit-transform: translateX(0);
            transform: translateX(0);
            display: flex;
            justify-content: flex-end;
            padding-right:.4rem;
        } 
        .swiper-pagination-bullet{
            opacity: 0.3;
            background: #FFFFFF;
        }
        .swiper-pagination-bullet.swiper-pagination-bullet-active{
            opacity: 1;
            background:#fff;
        }
    }
</style>