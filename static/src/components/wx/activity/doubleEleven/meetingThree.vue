<template>
    <div id="meetingThree">
        <div v-title>收益躺着赚 大礼随手来</div>
        <div class="goodsPlay goods1"></div>
        <div class="goodsPlay goods2"></div>
        <div class="goodsPlay goods3"></div>
        <div class="goodsPlay goods4"></div>
        <div class="goodsPlay goods5"></div>
        <div class="toMain" @click="appRouter('/doubleEleven/main')"></div>
        <!-- 限时抢卷 -->
        <div class="timeLimit" @click="Jump('GoodsList', '/intGoodList')"></div>
        <div class="ruleBtn" @click="popUp = 1"></div>
        <div class="content">
            <!-- <div class="AddApr" @click="toInvest"></div> -->
            <!-- 文字轮播 -->
            <div class="swiper" v-if="records.length > 0">
                <swiper :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="item in records"><p>用户{{item.mobilePhone}}成功兑换{{item.name}}</p></swiper-slide>
                </swiper>
            </div>
            <div class="twoBtns"  @click="popUp = 4"></div>
            <div class="twoBtns" @click="appRouter('/doubleEleven/meetingThreeRecord')"></div>
            <div class="goods">
                <ul class="goods_list clear">
                    <li v-for="(item, i) in goodsList" :class="[{MT: i == 0 || i == 1}]">
                        <div class="doBtn toComplete" @click="toComplete(item)" v-if="item.btnStatus == 0"></div>
                        <div class="doBtn toChange" @click="toComplete(item)" v-else></div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- 去完成弹框  -->
		<task :getGoodList="goodList" :goodName="goodName" :amountSum="amountSum" v-if="taskBox.isShow" :taskBox="taskBox"></task>
        <!-- 去兑换弹框 -->
        <div class="rule_box" v-if="changeBox.isShow">
			<div class="task">
				<div class="goods_title txt2">确认领取<i @click="changeBox.isShow = false"></i></div>
				<div class="task_contain2 clear">
					<div class="box1">
						<p>领取商品</p>
						<p>领取方式</p>
					</div>
					<div class="box2">
						<p>{{goodName}}</p>
						<div class="dis red" v-for="(v, i) in qualifiedList" @click="checked(i)">消耗{{v.term}}项目 {{v.money | moneyFormat(1)}}元 
							<img :src="picIndex == i ? checkBg[1] : checkBg[0]">
						</div>
                        <div class="dis pad" v-for="(v, i) in unfinishedList">消耗{{v.term}}项目 {{v.money | moneyFormat(1)}}元</div>
					</div>
				</div>
				<div class="btns clear">
					<div class="btn_box change_btn_box" @click="doChange">确认领取</div>
				</div>
			</div>
		</div>
        <!-- 规则 -->
        <div class="ruleBox" v-if="popUp == 1">
            <a href="tel:400-135-3388"></a>
            <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
            <div class="close" @click.stop="popUp = 0"></div>
        </div>
        <!--点击分享的弹框-->
		<div :class="{layer:popUp == 2}" @click.stop="popUp = 0" v-if="popUp == 2"></div>
        <!--活动结束的弹框-->
		<div class="timeOver" v-if="popUp == 3">
            <div class="close" @click.stop="popUp = 0"></div>
        </div>
        <!-- 商品详情 -->
        <div class="goodDetails" v-show="popUp == 4">
			<div class="goods_title txt2">商品详情<i @click="popUp = 0"></i></div>
            <div class="detailsBox">
                <div class="details"></div>
            </div>
        </div>
        <!--领取成功的弹框-->
		<div class="receiveSucc" v-if="popUp == 5">
            <div class="close" @click.stop="getData"></div>
        </div>
        <!-- 遮罩 -->
		<div v-if="popUp" class="zIndex" v-layer @click="popUp = 0"></div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    import task from './task'; //任务弹框组件
    import {Toast} from 'mint-ui';
    export default {
        mixins: [ wxShare ],
        data() {
            return {
                loginStatus: 0, // 0未登录，1已登录
                activityId: 0,   // 活动ID
                state: 1,        // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                popUp: 0,   // 弹窗  1、规则弹框  2、分享引导图   3、活动结束弹框 4、活动详情 5、领取成功；
                amountSum:[],  //  以投资金额列表30、 60、 90、 180、 360。
                records:[],  // 兑换记录  
                goodsList: [], // 每个商品信息
                shareObj: { //分享标题内容配置
					title: "双十一没抢到？来这里，免费领！！！", //标题
				    desc: "收益赚不停，壕礼叠加拿，双重惊喜，乐享全年品质生活，还不速来！！！", // 内容
					link: global.host + "doubleEleven/meetingThree", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/shareIcon.png" //图片链接
                },
                swiperOption: {          // 文字轮播
                    autoplay: 2000,      // 可选选项，自动滑动
                    direction : 'vertical',
                    autoplayDisableOnInteraction : false,    // 手指滑动以后轮播不会停止
                    loop : true,
                },
                taskBox:{//去完成任务弹框
					isShow:false
                },
				changeBox:{//去兑换弹框
					isShow:false
				},
				checkBg:[
					'https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/uncheck.png',
					'https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/checked.png'
				],
                goodName: '',
                goodList: [],
                qualifiedList: [],
                unfinishedList: [],
                picIndex: 0, // 图片选中的下标
                goodsId: 0,  // 选中的商品id
                termNO: 0,  // 兑换期限的序列号  5、30天, 4、60天,1、90天, 2、180天   3、360天
            }
        },
        methods: {
            getActivityTime(){    // 活动时间
                this.getNotlogData('/activity/two/getActivityTime',data => {
					if(data.resCode){
                        this.state = data.resData.active;
                        this.activityId = data.resData.activityId;
                        this.state == 3 ? this.popUp = 3 : '';
					}
				},{activityId: 'con_november_activity_three'},1);
            },
			getData(){            // 初始化数据
                this.popUp = 0;
				this.getNotlogData('/activity/november/fest/init',(res) => {
					if(res.resCode == 1){
                        this.amountSum = [];
                        this.amountSum.push(res.resData.amountSum30);
                        this.amountSum.push(res.resData.amountSum60);
                        this.amountSum.push(res.resData.amountSum90);
                        this.amountSum.push(res.resData.amountSum180);
                        this.amountSum.push(res.resData.amountSum360);
                        this.records = res.resData.activityFestRecords;
                        this.goodsList = res.resData.threeCommodityList;
                        this.loginStatus = res.resData.loginStatus;
                        console.log(this.amountSum);
					}
				},{},1)
            },
            toComplete(item){    // 点击商品按钮
                if(this.state != 1){
                    this.popUp = 3;
                    return;
                }
                if(this.loginStatus == 0){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                    return;
                };
                this.goodsId = item.id;
                this.goodName = item.name;
                this.goodList = [{term: item.amount30}, {term: item.amount60}, {term: item.amount90}, {term: item.amount180}, {term: item.amount360}];
                this.picIndex = 0;

                console.log(item);
                if(item.btnStatus == 0){
                    this.taskBox.isShow = true;
                    window._czc.push(["_trackEvent", "双十一会场三", item.name])
                } else if(item.btnStatus == 1){
                    // 5、30天, 4、60天,1、90天, 2、180天   3、360天
                    let termNumber = [5, 4, 1, 2, 3]
                    let days = ['30天', '60天', '90天', '180天', '360天']
                    this.qualifiedList = [];
                    this.unfinishedList = [];
                    for (let i = 0; i < 5; i++) {
                        if((this.amountSum[i] > this.goodList[i].term || this.amountSum[i] == this.goodList[i].term) && this.goodList[i].term > 0){
                            this.qualifiedList.push({term: days[i], money: this.goodList[i].term, serial: termNumber[i]});
                        }else if(this.goodList[i].term > 0){
                            this.unfinishedList.push({term: days[i], money: this.goodList[i].term, serial: termNumber[i]});
                        }
                    }
                    this.termNO = this.qualifiedList[0].serial;
                    this.changeBox.isShow = true;
                    console.log("达标", this.qualifiedList, "未达标", this.unfinishedList);
                }
            },
			checked(n){       // 单选判断
                this.picIndex = n;
                this.termNO = this.qualifiedList[n].serial; // 保存期限编号
            },
            doChange(){       // 确认领取按钮
                this.changeBox.isShow = false;
				this.getAppData('/activity/november/fest/exchange',(data) => {
					if(data.resCode == 1){
                        this.popUp = 5;
					}
				},{commodityId: this.goodsId, exchangeType: this.termNO})
            },
            toInvest(){      // 跳理财列表
                if(this.state != 1){
                    this.popUp = 3;
                    return;
                }
                window._czc.push(["_trackEvent", "双十一会场三", "双十一全场限时加息"]);
				this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
            },
            Jump(name, url){
                if (this.osType) {
                    this.PassValue(name)
                }else{
                    this.appRouter(url)
                }
            },
        },
        created: function() {
            //给app传值标题名
            this.PassValue('NavWhite_收益躺着赚 大礼随手来');
            this.getWxShareData(this.shareObj); //分享调用
            this.hasLogin ? this.loginStatus = 1 : this.loginStatus = 0;
            this.getActivityTime();
            this.getData();

            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275227931&web_id=1275227931';
            script.language = 'JavaScript';
            document.body.appendChild(script);
        },
        mounted: function() {

        },
        components: {
            task
        },
        watch: {
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

<style lang="scss" scoped>
    #meetingThree{
        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/phase3.jpg?v=1.0) no-repeat;
        background-size: 100%;
        position: relative;
        width: 100%;
        height: 44.8rem;
        .toMain{
            width: 1.4rem;
            height: 1.786667rem;
            position: fixed;
            right: 0;
            bottom: 1rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/main.png);
            background-size: 100%;
            z-index: 99;
        }
        .ruleBtn{
            width: .84rem;
            height: 1.04rem;
            position: fixed;
            right: .333333rem;
            top: 0;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/ruleBtn.png);
            background-size: 100%;
            z-index: 99;
        }
        .content{
            width: 100%;
            height: 100%;
            padding-top: 16.19rem;
            .AddApr{
                width: 3.013333rem;
                height: .85rem;
                margin: 0 auto 6.906667rem;
            }
            .swiper{
                position: absolute;
                top: 14.95rem;
                left: .555rem;
                height: .693333rem;
                width: 8.933333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/notice.png) no-repeat;
                background-size: 100%;
                font-family: DIN-Light;
                font-size: .32rem;
                line-height: .693333rem;
                color:#fff;
                padding-left: 1rem;
                p{
                    width: 7.92rem;
                    height: .693333rem;
                    overflow: hidden;
                }
                .swiper-container{
                    height: .693333rem;
                }
            }
            .twoBtns{
                height: .95rem;
                width: 50%;
                float: left;
            }
            .goods{
                width: 100%;
                overflow: hidden;
                position: relative;
                li{
                    width: 50%;
                    height: .706667rem;
                    float: left;
                    position: relative;
                    margin-top: 4.413333rem;
                    .doBtn{
                        width: 2.146667rem;
                        height: .706667rem;
                        margin:0 auto; 
                    }
                    .doBtn.toComplete{
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/complete.png) no-repeat;
                        background-size: 100% 100%;
                    }
                    .doBtn.toChange{
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/receive.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
                li.MT{
                    margin-top: 4.226667rem;
                }
            }
        }
        .rule_box{
			width:100%;
			height:100%;
			background:rgba(0,0,0,.5);
			position:fixed;
			top:0;
			z-index:1000;
            padding-top: 2.666667rem;


            .task{
                position: absolute;
                width: 100%;
                bottom: 0;
                background: #fff;
                .goods_title{
                    width: 100%;
                    height: 1.173333rem;
                    background: #ffffff;
                    line-height: 1.173333rem;
                    border-bottom: 1px solid #E5E5E5;
                    position: relative;
                    
                    i{
                        width: 0.48rem;
                        height: 0.48rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/close_ico.png) no-repeat;
                        background-size: 0.48rem 0.48rem;
                        position: absolute;
                        top: 0.36rem;
                        right: 0.4rem;
                    }
                }
                .goods_title.txt2{
                    text-align: center;
                }
                
                .task_contain2{
                    font-family: PingFang-SC-Medium;
                    padding: 0.533333rem 0.666667rem;
                    .box1{
                        width: 2.666667rem;
                        float: left;
                        p{
                            font-size: 0.373333rem;
                            color: #333333;
                            margin-bottom: 0.533333rem;
                            text-align: left;
                        }
                    }
                    .box2{
                        text-align: right;
                        p{
                            font-size: 0.346667rem;
                            color: #666666;
                            margin-bottom: 0.533333rem;
                            text-align: right;
                        }
                        div{
                            font-size: 0.346667rem;
                            color: #C5C5C5;
                            img{
                                width: 0.293333rem;
                                height: 0.293333rem;
                                position: relative;
                                top: -.02rem;
                            }
                        }
                        div.pad{
                            padding-right: .36rem;
                        }
                        div.dis{
                            margin-bottom: 0.12rem;
                        }
                        div.red{
                            color: #FF5B4C;
                        }
                    }
                }
                .btns{
                    width: 100%;
                    padding-bottom: 0.653333rem;
                    .btn_box{
                        width:4.8rem;
                        height: .933333rem;
                        margin: 0 auto;
                        background: #FF5B4C;
                        border-radius: .466667rem;
                        line-height: .933333rem;
                        text-align: center;
                        color: #fff;
                        font-size: .373333rem;
                    }
                }
            }
        


        }
        .layer {
            width: 10rem;
            height: 4.88rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/home/shareBg.png) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
        }
        .ruleBox{
            width: 8.133333rem;
            height: 10.786667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/ruleBox.png?v=1.1) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            a{
                width: 2.5rem;
                height: .5rem;
                position: absolute;
                left: 1rem;
                top:7.38rem;
            }
            p{
                position: absolute;
                left: 2.1rem;
                top:8.1rem;
                font-size: .266667rem;
                color: #999;
                margin-bottom: .2rem;
            }
            .close{
                position: absolute;
                bottom: 0rem;
                width: 1rem;
                height: 1rem;
                left: 50%;
                margin-left: -.5rem;
            }
        }
        .timeOver{
            width: 7.44rem;
            height: 5.693333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/timeOver.png) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .close{
                position: absolute;
                bottom: 0.65rem;
                width: 5.5rem;
                height: 1.3rem;
                left: 13%;;
            }
        }
        .goodDetails{
            position: fixed;
            z-index: 1000;
            overflow: hidden;
            width: 100%;
            height: 12.253333rem;
            bottom: 0;
            background: #fff;
            border-radius: .533333rem .533333rem 0 0;
            .goods_title{
                width: 100%;
                height: 1.173333rem;
                line-height: 1.173333rem;
                border-bottom: 1px solid #E5E5E5;
                position: relative;
                padding-left: .8rem;
                color: #333;
                font-size: .453333rem;
                i{
                    width: 0.48rem;
                    height: 0.48rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/close_ico.png) no-repeat;
                    background-size: 0.48rem 0.48rem;
                    position: absolute;
                    top: 0.36rem;
                    right: .666667rem;
                }
            }
            .detailsBox{
                width: 100%;
                height: 11.053333rem;
                overflow: hidden;
                overflow-y: auto;
                padding: 0 .533333rem;
                margin-top: .266667rem;
                .details{
                    width: 8.933333rem;
                    height: 26.093333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/goodsDetails.png?v=1.0) no-repeat;
                    background-size: 100%;
                }
            }
        }
        .receiveSucc{
            width: 7.44rem;
            height: 5.693333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/receiveSucc.png) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .close{
                position: absolute;
                bottom: 0.65rem;
                width: 5.5rem;
                height: 1.3rem;
                left: 13%;;
            }
        }
        .timeLimit{
            width: 1.48rem;
            height: 1.6rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/timeLimit.gif) no-repeat;
            background-size: 100%;
            position: fixed;
            right: 0;
            top: 7rem;
            z-index: 98;
        }
        .zIndex{
            z-index: 99!important;
        }
        .goodsPlay{
            position: absolute;
            animation: sphere 2s linear infinite;
            -webkit-animation: sphere 2s linear infinite;
        }
        .goods1{
            width: 1.266667rem;
            height: 1.266667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/goods5.png) no-repeat;
            background-size: 100%;
            left: .52rem;
            top: 3.466667rem;
        }
        .goods2{
            width: .946667rem;
            height: .96rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/goods4.png) no-repeat;
            background-size: 100%;
            left: 5.466667rem;
            top: 5.026667rem;
        }
        .goods3{
            width: .853333rem;
            height: .866667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/goods3.png) no-repeat;
            background-size: 100%;
            left: 8.573333rem;
            top: 4.173333rem;
        }
        .goods4{
            width: .613333rem;
            height: .626667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/goods2.png) no-repeat;
            background-size: 100%;
            left: 2.04rem;
            top: 7.72rem;
        }
        .goods5{
            width: .613333rem;
            height: .626667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingThree/goods1.png) no-repeat;
            background-size: 100%;
            left: 6.213333rem;
            top: .64rem;
        }

        @-webkit-keyframes sphere {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(0.8);
            }
        }

        @keyframes sphere {
            0% {
                transform: scale(1);
            }
            50% {
                transform: scale(0.8);
            }
        }
    }
</style>
<style>
    body.bodychannel {
			overflow: hidden;
            height: 100%;
	}
</style>

