<template>
    <div id="happySummer">
        <div v-title>HAPPY E 夏</div>
        <div class="share">
            <div @click="toShare" :class="{hasBtn:hasShare}" class="btn"></div>
            <div @click="appRouter('/happySummer/redList')" class="toRedList"><span v-if="redSum">{{redSum}}元红包已领取 >></span></div>
        </div>
        <div id="answerAward">
            <div v-if="!hasLogin" @click="judgeTimeLogin" class="topAnswerAward"></div>
            <div class="topic clear">
                <div :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/happySummer/leftTab'+activeTopic+'.png) no-repeat'}" class="listTab fl">
                    <div v-for="(item,index) in 5" @click="checkTopic(index)" :class="{activeLi:(index+1) == activeTopic}" class="li">
                        <div class="name"></div>
                        <div class="time"></div>
                    </div>
                </div>
                <div class="topicBanner fl">
                    <div class="rate clear">
                        <div v-for="item in 5" :class="{bgc:item <= userData.awardRate}" class="liBox fl"></div>
                        <div class="award1 award">
                            <img v-if="userData.awardRate < 2 && rateNum == 0" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/topicAward.png" alt="" class="img1"><!-- 默认 -->
                            <img @click="toConversion(2)" v-if="userData.awardRate >= 2 && (rateNum == 0 || rateNum == 2)" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/openAward.png" alt="" class="img2"><!-- 可领取 -->
                            <img v-else-if="rateNum >0" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/loseAward.png" alt="" class="img2"><!-- 失效 -->
                        </div>
                        <div class="award2 award">
                            <img v-if="userData.awardRate < 3  && rateNum == 0" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/topicAward.png" alt="" class="img1">
                            <img @click="toConversion(3)" v-if="userData.awardRate >= 3  && (rateNum == 0 || rateNum == 3)" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/openBaobao.png" alt="" class="img2">
                            <img v-else-if="rateNum >0" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/loseBaobao.png" alt="" class="img2">
                        </div>
                        <div class="award3 award">
                            <img v-if="userData.awardRate < 5  && rateNum == 0" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/topicAward.png" alt="" class="img1">
                            <img @click="toConversion(5)" v-if="userData.awardRate >= 5  && (rateNum == 0 || rateNum == 5)" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/openAward.png" alt="" class="img2">
                            <img v-else-if="rateNum > 0" src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/loseAward.png" alt="" class="img2">
                        </div>
                    </div>
                    <div class="answer">
                        <div v-if="toAnswer" class="banner">
                            <img src="https://aliyunsso.edspay.com/web/wx/activity/happySummer/award.png" alt="" class="award">
                            <div class="result">
                                <div v-if="(!hasLogin && activityStatus == 1) || (activeTopic == defaultTioic && userData.residueDegree>0 && activityStatus == 1 && this.answerCases[defaultTioic-1] != 1)" @click="countTime()" class="hand"></div>
                                <div v-if="activityStatus == 2" :style="{background:'url('+answerBtnImg[3]+') no-repeat'}" class="btn"></div>
                                <div v-else-if="hasLogin" @click="countTime()" :style="{background:'url('+activeAnserBtn+') no-repeat'}" class="btn"></div>
                                <div v-else-if="activityStatus ==3" :style="{background:'url('+answerBtnImg[0]+') no-repeat'}" class="btn"></div>
                                <div v-else :style="{background:'url('+answerBtnImg[4]+') no-repeat'}" class="btn"></div>
                                <div v-if="hasLogin && userData.residueDegree > 0 && answerCases[defaultTioic-1] != 1 && activeTopic == defaultTioic && activityStatus == 1" class="tips">本轮剩余次数：{{userData.residueDegree ? userData.residueDegree:3}}</div>
                            </div>
                        </div>
                        <div v-else class="topicBox">
                            <div class="djs">{{djsTime}}s</div>
                            <ul ref="topicUl" id="topicUl" class="clear">
                                <li v-for="(item,index) in randomList"  :style="{left:6.2*index + 'rem'}">
                                    <div class="titleNum">第{{topicListTit[index]}}题</div>
                                    <div class="title">{{index+1}}.{{topicListAct[item].title}}</div>
                                    <div class="xuanxiang">
                                        <div v-for="(keys,indexs) in topicListAct[item].key" :class="{keyBG:indexs<2}" @click="chooseLi(indexs,item,index)" class="key clear">
                                            <div class="status fl">
                                                <img v-if="keys.status == 0" src="" class="keyImg1" alt="">
                                                <img v-if="keys.status == 1" src="" class="keyImg2" alt="">
                                                <img v-if="keys.status == 2" src="" class="keyImg3" alt="">
                                            </div>
                                            <div class="letter fl">{{abcLetter[indexs]}}.</div>
                                            <div class="option align-center-vertical fl">{{keys.content}}</div>
                                        </div>
                                        
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="giftBag">
            <div v-if="hasLogin" class="myMoney">我的年化金额：{{userData.myYearMoney}}</div>
            <div @click="toGoodList" class="goodList"></div>
            <div @click="showCalculator = true;setYearMoney = null" class="calculatorbtn"></div>
            <div class="hotCake clear">
                <div v-if="userData.myYearMoney >= goodsList[0].yearMoney && hotStatuss[0] == 0" @click="conversion(5,goodsList[0])" class="btn fl"></div>
                <div v-else-if="hotStatuss[0] == 1" class="btn hasInvest hotInvest fl"></div>
                <div v-else @click="toInvest" class="btn hotInvest fl"></div>

                <div v-if="userData.myYearMoney >= goodsList[1].yearMoney && hotStatuss[1] == 0" @click="conversion(6,goodsList[1])" class="btn fl"></div>
                <div v-else-if="hotStatuss[1] == 1" class="btn hasInvest hotInvest fl"></div>
                <div v-else @click="toInvest" class="btn hotInvest fl"></div>
            </div>
            <div class="swiperBox">
                <swiper v-if="goodsList.length>2" :options="swiperOption" ref="mySwiper">
                    <swiper-slide v-for="item in 6">
                        <div class="goods clear">
                            <div class="good good1 fl">
                                <img :src="goodsList[item*2].imgUrl" alt="" class="goodImg">
                                <div v-if="userData.myYearMoney >= goodsList[item*2].yearMoney" @click="conversion(goodsList[item*2].id,goodsList[item*2])" class="goodBtn"></div>
                                <div v-else @click="toInvest" class="goodBtn toInvest"></div>
                            </div>
                            <div class="good fl">
                                <img :src="goodsList[item*2+1].imgUrl" alt="" class="goodImg">
                                <div v-if="userData.myYearMoney >= goodsList[item*2+1].yearMoney" @click="conversion(goodsList[item*2+1].id,goodsList[item*2+1])" class="goodBtn"></div>
                                <div v-else @click="toInvest" class="goodBtn toInvest"></div>
                            </div>
                        </div>
                    </swiper-slide>
                    <div @click="changeCardLe" class="swiper-button-prev" slot="button-prev"></div>
                    <div @click="changeCardRi" class="swiper-button-next" slot="button-next"></div>
                </swiper>
            </div>
            <div @click="toGoodDetail" class="goodsDetail"></div>
        </div>
        <div @click="showRult = true" class="rult"></div>
        <div v-if="showCountDown" v-layer class="countDown">
            <img :src="countDownImg" alt="" class="content">
        </div>
        <div v-if="showShare" @click="showShare = false;" v-layer class="sharebox">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/shareLayer.png" alt="">
        </div>
        <div v-if="showGoodSucc" v-layer class="goodSuccess">
            <div :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/happySummer/goodSucc/goodSucc'+goodSuccImgId+'.png) no-repeat'}" :class="{topicHeight: goodSuccImgId == 2 || goodSuccImgId == 3 || goodSuccImgId == 4}" class="content">
                <div @click="showGoodSucc = false;" class="close"></div>
            </div>
        </div>
        <div v-if="showRult" v-on:click.self="showRult = false;" v-layer class="rultBox">
            <div class="content">
                <div class="textBox">
                    <div class="imgbox">
                        <div class="img">
                            <a href="tel:400-135-3388"></a>
                            <p v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
                        </div>
                    </div>
                </div>
                <div @click="showRult = false" class="close"></div>
            </div>
        </div>
        <div v-if="showResult" v-layer class="topicResult">
            <div :style="{background:'url(https://aliyunsso.edspay.com/web/wx/activity/happySummer/tips/topicTips'+resultType+'.png) no-repeat'}" class="content">
                <div v-if="resultType == 2 || resultType == 4" @click="toTopic" class="btn"></div><!-- 重新开始 -->
                <div @click="showResult = false;toAnswer = true;" class="close"></div>

            </div>
        </div>
        <div v-if="showGetAward" v-layer class="GetAward">
            <div class="content">
                <div @click="conversionComm(awardNum)" class="btn"></div><!-- 重新开始 -->
                <div @click="showGetAward = false;" class="close"></div>
            </div>
        </div>
        <div v-if="showCalculator" v-layer class="calculator">
            <div class="bottom">
                <div class="title bdr-b">年化计算器<div @click="showCalculator = false;" class="close fr"></div></div>
                <div class="content">
                    <div class="li li1">
                        <div class="name fl">年化金额：</div>
                        <div class="input fl">
                            <input v-model="setYearMoney" v-on:input="getMoney"  type="number" placeholder="请输入年化金额">
                        </div>
                    </div>
                    <div class="li li2">
                        <div class="name fl">出借期限：</div>
                        <div class="input fl">
                            <span>{{selectValue}}天</span>
                            <div class="right fr"></div>
                            <el-select v-model="selectValue" @change="selectDay" placeholder="请选择">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="li li3">
                        <div class="name fl">需要出借：</div>
                        <div class="input fl">
                            <span>{{investMoney}}</span>元
                        </div>
                    </div>
                    <div class="tips">注：年化金额=出借金额÷360*出借期限（天）</div>
                </div>
            </div>
        </div>
        <!-- <div v-if="!hasLogin" @click="toApp('LG',{path:'/wxLogin',query:{thisUrl:$route.fullPath}})" v-layer class="notLogin"></div> -->
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare'; // app交互 
    import getActivityData from '../publicJS/getActivityData'; // app交互 
    import { Toast } from 'mint-ui';
    export default{
        mixins:[wxShare,getActivityData],
        data(){
            return{
                options: [{
                  value: 30,
                  label: '30天'
                }, {
                  value: 60,
                  label: '60天'
                }, {
                  value: 90,
                  label: '90天'
                }, {
                  value: 180,
                  label: '180天'
                }, {
                  value: 360,
                  label: '360天'
                }],
                answerStart:false,//答题开始
                setYearMoney:null,//年化金额
                selectValue: 30,
                showShare:false,
                showCountDown:false,//显示倒计时
                showRult:false,//显示规则
                showResult:false,//显示答题结果
                resultType:2,
                showGetAward:false,//领取答题福利提示弹框
                awardNum:0,//点击了第几个商品
                showCalculator: false,//显示计算器
                rateNum:0,//领取福利
                countDownImg:'https://aliyunsso.edspay.com/web/wx/activity/happySummer/count3.png',//倒计时图片
                answerBtnImg:[
                    'https://aliyunsso.edspay.com/web/wx/activity/happySummer/answerBtn0.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/happySummer/answerBtn1.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/happySummer/answerBtn2.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/happySummer/answerBtn3.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/happySummer/answerBtn4.png',
                ],
                activeAnserBtn:'',
                redSum:0,//红包总额
                abcLetter:['A','B','C'],
                activeTopic:1,//当前在第几轮
                defaultTioic:1,//默认在第几轮
                trueTopicNum:0,//一轮答对题目数
                userData:{awardRate:0},//用户基本信息
                answerCases:[1,2,0,0,0],//每轮结果
                randomList:[],//随机数数组
                hasChose:false,//是否答题
                toAnswer: true,//去答题
                goodsList:[{yearMoney:0},{yearMoney:0}],//商品列表
                hasShare:false,//是否已分享
                goodSuccImgId:'0',//兑换商品id
                showGoodSucc:false,//显示
                hotStatuss:[0,0],//爆款是否被领取
                isover:false,//答题是否结束
                swiperOption: {
                    prevButton:'.swiper-button-prev',
                    nextButton:'.swiper-button-next',
                },
                topicListTit:['一','二','三','四','五'],
                topicList:[
                    [
                        {
                            title:'2018年七夕是哪一天',
                            key:[
                                {
                                    content:'阳历8月17',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'阳历8月15',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'阳历8月16',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'七夕发源于哪个国家',
                            key:[
                                {
                                    content:'中国',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'希腊',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'韩国',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'古琴最初只有五根弦，代表着金 木 水 火 土。后来又增加了两根弦，这两根弦代表：',
                            key:[
                                {
                                    content:'文武',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'天地',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'阴阳',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包新手标的出借金额上限为？',
                            key:[
                                {
                                    content:'5000元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'10000元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'20000元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'新注册用户可获赠红包金额为？',
                            key:[
                                {
                                    content:'1168元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'1118元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'1128元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'邀请好友30日内累计出借满10万，邀请人可获得多少佣金奖励?',
                            key:[
                                {
                                    content:'850元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'860元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'870元',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'E都市钱包的风控体系名叫？',
                            key:[
                                {
                                    content:'E盾',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'蜂巢',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'金盾',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包专注于哪一类型的资产？',
                            key:[
                                {
                                    content:'供应链资产',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'车房贷资产',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'消费金融资产',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'E计划募集期最短的产品期限为？',
                            key:[
                                {
                                    content:'28天',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'30天',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'31天',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'钱宝宝身上的logo在什么位置？',
                            key:[
                                {
                                    content:'帽子上',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'衣服上',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'元宝上',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'钱宝宝的出生在哪天？',
                            key:[
                                {
                                    content:'2017年8月8日',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2017年8月18日',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2017年7月28日',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'公司官网是？',
                            key:[
                                {
                                    content:'edsboy.com',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'edsbay.com',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'edspay.com',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'小明拿出1万元投期限360天，年化12%，到期还本付息的产品，到期将收获多少本息？',
                            key:[
                                {
                                    content:'11000',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'11100',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'11200',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'出借人风险评测总共有几道题？',
                            key:[
                                {
                                    content:'8',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'10',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'12',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包截至目前进入网贷之家评级百强榜最高名次是多少名？',
                            key:[
                                {
                                    content:'89',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'84',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'82',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'我们的《E友课堂》是几月份上线的？',
                            key:[
                                {
                                    content:'6月份',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'5月份',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'7月份',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们的2周年庆典活动是什么时候上线的？',
                            key:[
                                {
                                    content:'2018年6月25日',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2018年7月1日',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2018年7月5日',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包有几重安全保障？',
                            key:[
                                {
                                    content:'8',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'6',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'9',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包没有获得以下哪项资质？',
                            key:[
                                {
                                    content:'浙江省电商促进会常务理事会',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'浙江省大数据科技协会理事单位',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'中国互联网金融协会常务理事单位',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'我们的平台宗旨是？',
                            key:[
                                {
                                    content:'为普通人提供安全专业的金融服务',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'为普通人提供便捷专业的金融服务',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'为普通人提供安全可靠的金融服务',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                    ],
                    [
                        {
                            title:'七夕节来源于那个传说？',
                            key:[
                                {
                                    content:'牛郎与织女',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'梁山伯与祝英台',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'白素贞与许仙',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'金簪划银河，隔岸对相望。不忍两分离，喜鹊把忙帮。（打一节日）',
                            key:[
                                {
                                    content:'七夕节',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'情人节',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'妇女节',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'中国现存最早用纸作画的作品是：',
                            key:[
                                {
                                    content:'《清明上河图》',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'《五牛图》',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'《历代帝王图》',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E计划的募集期分别为？',
                            key:[
                                {
                                    content:'30天、60天、180天、270天、360天',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'30天、60天、90天、180天、360天',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'30天、90天、180天、270天、360天',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'平台产品目前约定年化利率最高为？',
                            key:[
                                {
                                    content:'年化13.5%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'年化12%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'年化12.5%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E计划-60天产品对应的约定年化利率为？?',
                            key:[
                                {
                                    content:'8.0%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'8.5%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'8.6%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们公司注册资金实缴？',
                            key:[
                                {
                                    content:'1000万元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'10000万元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'100000万元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'钱宝宝手上捧的是？',
                            key:[
                                {
                                    content:'银子',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'铜币',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'黄金',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'E都市钱包最低起投金额为？',
                            key:[
                                {
                                    content:'200元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'100元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'1000元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包累计交易额已经突破？',
                            key:[
                                {
                                    content:'33亿',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'30亿',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'27亿',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们的客服热线是？',
                            key:[
                                {
                                    content:'400-135-3388',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'400-138-3355',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'400-135-3366',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们的VIP会员体系共分几个等级？',
                            key:[
                                {
                                    content:'VIP0-VIP6',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'VIP1-VIP6',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'VIP0-VIP7',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'新版的积分商城是何时正式上线的？',
                            key:[
                                {
                                    content:'2018年6月4日',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2018年6月5日',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2018年6月3日',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'2018年6月份，平台用户分布最多的是哪个地区？',
                            key:[
                                {
                                    content:'江苏省',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'山东省',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'湖北省',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们的银行存管是何时正式上线的？',
                            key:[
                                {
                                    content:'2017年10月',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2017年11月',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2017年12月',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包“免费午餐”公益助学活动是何时圆满结束的？',
                            key:[
                                {
                                    content:'2018年5月12日',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2018年5月15日',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2018年5月20日',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包“免费午餐”公益助学活动是何时上线的？',
                            key:[
                                {
                                    content:'2018年4月12日',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2018年4月15日',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2018年4月20日',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们平台的服务理念是什么？',
                            key:[
                                {
                                    content:'安全、专业、便捷、规范',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'安全、专业、简单、规范',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'安全、合规、便捷、规范',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包2018年4月份在网贷之家评级百强榜名次相对3月份有何变化？',
                            key:[
                                {
                                    content:'上升了',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'下降了',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'持平',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包2018年3月份在网贷之家评级百强榜名次相对2月份有何变化？',
                            key:[
                                {
                                    content:'上升了',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'下降了',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'持平',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                    ],
                    [
                        {
                            title:'金簪划银河，隔岸对相望。不忍两分离，喜鹊把忙帮。（打一节日）',
                            key:[
                                {
                                    content:'七夕节',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'情人节',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'妇女节',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'双双恋人红线牵（打一字）',
                            key:[
                                {
                                    content:'缀',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'叕',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'辍',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我国关于哈雷彗星的记载最早见于以下哪本著作？',
                            key:[
                                {
                                    content:'《春秋》',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'《论语》',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'《史记》',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E计划-180天产品对应的约定年化利率为？',
                            key:[
                                {
                                    content:'10.3%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'10.5%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'10.6%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E计划-90天产品的约定年化利率为？',
                            key:[
                                {
                                    content:'9.5%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'10.5%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'10.2%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'从E都市钱包平台提现最低可为多少元？',
                            key:[
                                {
                                    content:'2元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'1元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'10元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'小红将10000元投资于期限30日，年化12%的产品，到期后她将收获本息？',
                            key:[
                                {
                                    content:'10100',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'10200',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'10500',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包2周岁生日是在哪一天？',
                            key:[
                                {
                                    content:'2018年7月1日',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2018年6月25日',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2018年7月8日',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们的VIP体系中达到什么条件才能升级？',
                            key:[
                                {
                                    content:'只需用户的出借金额满足相应等级条件即可进行升级',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'只需用户的累计出借金额满足相应等级条件即可进行升级',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'用户的出借金额和累计出借金额同时满足相应等级条件，才能进行升级',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'我们平台的用户年龄层占比最多的是？',
                            key:[
                                {
                                    content:'22-34岁',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'35-44岁',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'45-54岁',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'积分商城中工作日签到可获得多少积分？',
                            key:[
                                {
                                    content:'10',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'20',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'15',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'以下哪项在积分商城进行签到不能获得翻牌机会？',
                            key:[
                                {
                                    content:'周一至周三连续签到三天',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'周一至周日连续签到七天',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'周二至周六连续签到五天',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'我们的新手专享标约定年化利率为多少？',
                            key:[
                                {
                                    content:'10.5%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'10%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'9.5%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'下面哪一项不属于VIP体系里的特权？',
                            key:[
                                {
                                    content:'E起闯天下',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'生日福利',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'年终福利',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'我们是以下哪个协会的理事单位？',
                            key:[
                                {
                                    content:'杭州互联网金融协会',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'浙江互联网金融协会',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'浙江投融资协会理事单位',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'我们的平台宗旨是？',
                            key:[
                                {
                                    content:'为普通人提供安全专业的金融服务',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'为用户提供安全专业的金融服务',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'为普通大众提供安全专业的金融服务',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包举办过几次投资人见面会？',
                            key:[
                                {
                                    content:'3次',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2次',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'4次',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'E都市钱包“免费午餐”公益助学活动共捐献了多少款项？',
                            key:[
                                {
                                    content:'8770元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'8870元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'8970元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包“免费午餐”公益助学活动用户捐献爱心最多的是几颗？',
                            key:[
                                {
                                    content:'37',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'35',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'39',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'以下哪项会议E都市钱包没有出席？',
                            key:[
                                {
                                    content:'2018年网贷之家518理财节',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2017互联网金融行业高峰论坛',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2017年网贷之家518理财节',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                    ],
                    [
                        {
                            title:'两人相依偎，青草底下栖。（打一字）',
                            key:[
                                {
                                    content:'芙',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'众',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'丛',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'心中有我（打一字）',
                            key:[
                                {
                                    content:'悟',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'俄',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'语',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'小张即将大学毕业，整天为找工作而发愁，他父亲说：“不患无位，患所以立。”他的意思是让小张：',
                            key:[
                                {
                                    content:'自我提高',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'坚持不懈 ',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'降低要求 ',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'积分商城中完成哪项任务送300积分？',
                            key:[
                                {
                                    content:'新用户完成注册',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'完成平台第一笔出借',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'注册60天内累计出借5笔',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们平台支持绑定几张银行卡？',
                            key:[
                                {
                                    content:'1',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'3',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'不限',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'P2P不是以下哪个的简写？',
                            key:[
                                {
                                    content:'peer-to-peer',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'person-to-person',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'People-to-people',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'积分商城中用户首次累计出借金额达到1万元奖励多少积分？',
                            key:[
                                {
                                    content:'100积分',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'200积分',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'300积分',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'8月1日起VIP体系中生日福利最高加息多少？',
                            key:[
                                {
                                    content:'4%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'4.5%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'3.5%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'8月1日起VIP体系中VIP3能享受专属加息多少？',
                            key:[
                                {
                                    content:'0.8%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'0.5%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'1.5%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'会员体系中达到VIP3需要满足什么条件？',
                            key:[
                                {
                                    content:'出借金额≥10万，累计出借金额≥20万',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'出借金额≥10万，累计出借金额≥15万',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'出借金额≥10万，累计出借金额≥30万',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'APP端数据披露里不包含下列哪项？',
                            key:[
                                {
                                    content:'运营报告',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'风险数据',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'财务数据',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'关于积分商城的积分下列描述有误的是？',
                            key:[
                                {
                                    content:'积分有效期为1年',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'个人所获得的积分不可转让',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'个人所获得的积分可以兑换现金',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'积分不可以兑换下列哪种奖励？',
                            key:[
                                {
                                    content:'加息券、红包',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'实物奖励',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'现金奖励',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'平台当前的邀请有礼活动，好人缘榜最高可拿多大面值京东卡？',
                            key:[
                                {
                                    content:'800元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'500元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'600元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们没有在以下哪座城市举办过投资人见面会？',
                            key:[
                                {
                                    content:'上海',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'宁波',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'杭州',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'在网贷之家2018年4月份的评级百强榜中，E都市钱包排名？',
                            key:[
                                {
                                    content:'87',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'89',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'84',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包的经营理念是什么——',
                            key:[
                                {
                                    content:'安全、透明、合规运营',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'安全、合规、高效运营',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'安全、分散、合规运营',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包加入浙江投融资协会是什么时候？',
                            key:[
                                {
                                    content:'2017年3月',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2017年4月',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2017年5月',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包获得的信息安全等保三级认证由哪个政府部门颁发的？',
                            key:[
                                {
                                    content:'公安部',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'工信部',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'国家安全部',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'平台于何时获批ICP经营许可证？',
                            key:[
                                {
                                    content:'2017年6月',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2017年5月',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2017年7月',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                    ],
                    [
                        {
                            title:'七夕一走雀飞散（打一成语）',
                            key:[
                                {
                                    content:'过河拆桥',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'人散曲终',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'一走了之',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'紧锁心门（打一字）',
                            key:[
                                {
                                    content:'闷',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'沁',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'鈊',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'孔子弟子中擅长做生意的是谁？',
                            key:[
                                {
                                    content:'子贡',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'子路 ',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'子张 ',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'VIP体系中VIP5能享受专属加息多少？',
                            key:[
                                {
                                    content:'1%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'1.5%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'1.7%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'VIP体系中VIP5能享受生日福利加息多少？',
                            key:[
                                {
                                    content:'3%',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'3.5%',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'4%',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'会员体系中达到VIP6需要满足什么条件？',
                            key:[
                                {
                                    content:'出借金额≥100万，累计出借金额≥500万',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'出借金额≥100万，累计出借金额≥300万',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'出借金额≥100万，累计出借金额≥200万',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'关于积分商城积分兑换规则，描述有误的是？',
                            key:[
                                {
                                    content:'积分兑换的加息券与红包实时发放',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'积分商城所有商品包邮',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'实物奖励将在成功兑换后7个工作日发放',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'平台累计用户已突破多少人？',
                            key:[
                                {
                                    content:'26万',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'28万',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'27万',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包资产端-51返呗品牌升级后叫什么？',
                            key:[
                                {
                                    content:'爱尚街',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'爱上街',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'爱丄街',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'我们的新手标期限多少天？',
                            key:[
                                {
                                    content:'30天',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'31天',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'28天',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E计划募集期最长的产品期限为？',
                            key:[
                                {
                                    content:'365天',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'360天',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'366天',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'2018年6月份的运营报告中，平台出借用户中男女比例怎样？',
                            key:[
                                {
                                    content:'男多',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'女多',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'持平',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'平台当前的邀请有礼活动，好人缘榜最高可拿多大面值京东卡？',
                            key:[
                                {
                                    content:'800元',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'500元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'600元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'平台当前的邀请有礼活动，壕朋友榜最高可拿多大面值京东卡？',
                            key:[
                                {
                                    content:'800元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'500元',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'300元',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'E都市钱包的吉祥物叫什么名字？',
                            key:[
                                {
                                    content:'钱贝贝',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'钱宝宝',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'钱宝贝',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包最终与哪家银行签订了资金存管？',
                            key:[
                                {
                                    content:'渤海银行',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'新网银行',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'浙商银行',
                                    status:0,
                                    active:1
                                },
                            ]
                        },
                        {
                            title:'E都市钱包于何时正式上线运营？',
                            key:[
                                {
                                    content:'2016年6月',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2016年7月',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2016年8月',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包是啥时获得的的公安部信息安全等保三级证明？',
                            key:[
                                {
                                    content:'2017年12月份',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2017年11月份',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2017年10月份',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包A轮融资额多少？',
                            key:[
                                {
                                    content:'8000万人民币',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'1亿人民币',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'3000万美元',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                        {
                            title:'E都市钱包累计交易额突破30亿是哪一天',
                            key:[
                                {
                                    content:'2018年5月1日',
                                    status:0,
                                    active:1
                                },
                                {
                                    content:'2018年4月30日',
                                    status:0,
                                    active:0
                                },
                                {
                                    content:'2018年5月2日',
                                    status:0,
                                    active:0
                                },
                            ]
                        },
                    ],
                ],
                djsTimer2:null,
                djsTimer:null,
                djsTime:180,
                topicListAct:[],//当前轮题目
                shareObj: { //分享标题内容配置
                    title: "E起去浪  Happy E 夏!", //标题
                    desc: "天天发红包，付出越多，回报越多，是初恋的味道！", //内容
                    link: global.host + "happySummer/happyInvite", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                }
            }
        },
        computed:{
            investMoney:{
                get:function(){
                    return Math.ceil((this.setYearMoney/this.selectValue) * 360);
                },
                set:function(value){ 
                }
            }
        },
        methods:{
            youmeng(id){
                // 友盟数据统计
                const script = document.createElement('script')
                script.src = 'https://s13.cnzz.com/z_stat.php?id='+id+'&web_id='+id+''
                script.language = 'JavaScript'
                document.body.appendChild(script)
            },
            toInvest(){
                if(this.judgeTimeLogin()){
                    return;
                }
                this.toApp('WIP','/wxInvest')
            },
            toGoodDetail(){
                if(this.judgeTimeLogin()){
                    return;
                }
                this.appRouter('/happySummer/goodDetail');
            },
            toGoodList(){
                if(this.activityStatus == 2 || this.activityStatus == 4){
                    this.ActivityPrompt();
                    return true;
                }else if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                    return true;
                }
                this.appRouter('/happySummer/goodList');
            },
            judgeTimeLogin(){//判断登录及活动时间
                if(this.activityStatus != 1){
                    this.ActivityPrompt();
                    return true;
                }else if(!this.hasLogin){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                    return true;
                }else{
                    return false;
                }
            },
            toTopic(){//重新答题
                this.showResult = false;
                this.countTime();
                this.createNum();
                [ ...this.topicListAct ] = this.topicList[this.defaultTioic - 1];

            },
            getMoney(){
                if(~~this.setYearMoney == 0){
                    this.setYearMoney = '';
                }
                this.setYearMoney=this.setYearMoney.replace(/[^\.\d]/g,'');
                this.setYearMoney=this.setYearMoney.replace('.','');
                // this.setYearMoney = ~~this.setYearMoney;

            },
            selectDay(selVal){
                console.log(this.selectValue)
            },
            countTime(){//321倒计时
                this.isover = false;
                this.trueTopicNum = 0;//清空答对题目次数
                if(this.judgeTimeLogin()){
                    return;
                }
                _czc.push(﻿["_trackEvent", "happy E夏", "立即答题按钮"]); //  友盟统计配置
                if(this.activeTopic == this.defaultTioic && this.userData.residueDegree && this.answerCases[this.defaultTioic-1] != 1){
                    this.showCountDown = true;
                    setTimeout(()=>{
                        this.countDownImg = 'https://aliyunsso.edspay.com/web/wx/activity/happySummer/count2.png';
                    },1000);
                    setTimeout(()=>{
                        this.countDownImg = 'https://aliyunsso.edspay.com/web/wx/activity/happySummer/count1.png';
                    },2000);
                    setTimeout(()=>{
                        this.countDownImg = 'https://aliyunsso.edspay.com/web/wx/activity/happySummer/countGo.png';
                    },3000);
                    setTimeout(()=>{
                        this.djsTimer2 =  setTimeout(()=>{//倒计时时间设置
                            this.answerStart = false;
                            if(this.isover){

                            }else{
                                this.toAnswer = true;
                                this.showResult = true;
                                this.hasChose = false;
                                if(this.userData.residueDegree > 0){
                                    this.resultType = 4;
                                }else{
                                    this.resultType = 5;
                                }
                                //恢复题目 和倒计时
                                clearInterval(this.djsTimer);
                                this.djsTime = 180;
                                for(var i=0;i<this.topicList[this.defaultTioic - 1].length;i++){
                                    for(var j=0;j<3;j++){
                                        this.topicList[this.defaultTioic - 1][i].key[j].status = 0;
                                    }
                                }
                            }
                        },180000)

                        this.djsTimer = setInterval(()=>{
                            if(this.djsTime <= 0){
                                clearInterval(this.djsTimer);
                            }
                            this.djsTime --;
                        },1000)

                        this.getAppData('/activity/happy/answer',(data)=>{
                            if(data.resCode){

                            }
                        },{always:1,type:1})
                        this.userData.residueDegree--;
                        this.toAnswer = false;
                        this.showCountDown = false;
                        this.countDownImg = 'https://aliyunsso.edspay.com/web/wx/activity/happySummer/count3.png';
                        this.checkTopic(this.defaultTioic-1);
                        this.answerStart = true;
                    },3500);
                    
                }
            },
            chooseLi(index,item,titNum){//选择选项
                if(this.hasChose){
                    return;
                }
                this.hasChose = true;
                var activeKey = this.topicListAct[item].key[index];
                
                if(this.topicListAct[item].key[index].active == 1){//答对
                    this.trueTopicNum ++;
                    activeKey.status = 1;
                    this.$set(this.topicListAct[item].key,index,activeKey);
                }else{//答错
                    activeKey.status = 2;
                    this.$set(this.topicListAct[item].key,index,activeKey);
                    var trueKey = {};
                    for(var i=0;i<3;i++){
                        if(this.topicListAct[item].key[i].active == 1){
                            trueKey = this.topicListAct[item].key[i];
                            trueKey.status =1;
                            this.$set(this.topicListAct[item].key,i,trueKey);
                        } 
                    }
                }
                console.log(titNum);
                if(titNum < 4){
                    setTimeout(()=>{
                        $('#topicUl').animate({left: -6.2 * (titNum+1) +'rem'}, 600, 
                        ()=> {
                            this.hasChose = false;  
                        });
                    },2000)
                }else{//答满五题
                    this.answerStart = false;
                    
                    this.isover = true;
                    clearTimeout(this.djsTimer2);
                    
                    setTimeout(()=>{
                        this.toAnswer = true;
                        this.showResult = true;
                        this.hasChose = false;  
                        if(this.trueTopicNum >= 5){
                            this.answerCases[this.defaultTioic-1] = 1;
                            if(this.rateNum <= 0){
                                this.userData.awardRate++;
                            }
                            this.answerCases[this.defaultTioic-1] = 1;
                            this.resultType = 1;
                            this.getAppData('/activity/happy/answer',(data)=>{
                                if(data.resCode){}
                            },{always:2,type:1})
                        }else{
                            this.getAppData('/activity/happy/answer',(data)=>{
                                if(data.resCode){}
                            },{always:2,type:2})
                            if(this.userData.residueDegree > 0){
                                this.resultType = 2;
                            }else{
                                this.resultType = 3;
                            }
                        }
                        this.checkTopic(this.defaultTioic-1);
                        this.createNum()//重新生成随机数
                        //恢复题目 和倒计时
                        clearInterval(this.djsTimer);
                        this.djsTime = 180;
                        for(var i=0;i<this.topicList[this.defaultTioic - 1].length;i++){
                            for(var j=0;j<3;j++){
                                this.topicList[this.defaultTioic - 1][i].key[j].status = 0;
                            }
                        }
                    },1000)
                }
            },
            createNum(){//生成随机数数组
                this.randomList = [];
                for(var i=0;i<5;i++){
                    this.randomList.push(this.judgeValue());
                }
                console.log(this.randomList);
            },
            judgeValue(){//判断是否在数组中
                var random = 0;
                var testStr=','+this.randomList.join(",")+",";
                do{
                    random = this.getRandom(0,20);

                }while(testStr.indexOf(","+random+",")!=-1)
                
                return random;
            },
            getRandom(start,end){//生成随机数
                var length = end - start;
                var num = parseInt(Math.random() * (length) + start);
                return num;
            },
            changeCardLe(){//轮播按钮
                this.cardIndex = this.$refs.mySwiper.swiper.activeIndex + 1;//当前位置
            },
            changeCardRi(){//轮播按钮
                this.cardIndex = this.$refs.mySwiper.swiper.activeIndex + 1;//当前位置
            },
            toShare(){//去分享
                if(this.judgeTimeLogin()){
                    return;
                }
                if(this.hasShare){
                    return;
                }
                _czc.push(﻿["_trackEvent", "happy E夏", "分享按钮"]); //  友盟统计配置
                if(this.osType){
                    this.PassValue(this.appShare);
                }else{
                    this.showShare = true;
                }
                this.getAppData('/activity/happy/share',(data)=>{
                    if(data.resCode){
                        setTimeout(()=>{
                            this.hasShare = true;
                            this.redSum = this.redSum + data.resData.redAmount;
                        },10000)
                    }
                },{})
            },
            toConversion(goodsId){//领取答题奖励
                if(this.rateNum > 0){
                    console.log(34434)
                        Toast({
                            message: '已领取',
                            position: 'center',
                            duration:  2000,
                            className: 'toastTip'
                        });
                    return;
                }
                this.showGetAward = true;
                this.awardNum = goodsId;
                
            },
            conversionComm(goodsId){//领取答题奖励

                this.getAppData('/activity/happy/answerAward',(data)=>{
                    if(data.resCode){
                        this.showGetAward = false;
                        this.showGoodSucc = true;
                        if(goodsId == 5){
                            this.goodSuccImgId = 4;
                        }else{
                            this.goodSuccImgId = goodsId
                        }
                        console.log(this.goodSuccImgId)
                        this.rateNum = goodsId;
                    }
                },{rateNum:goodsId})
            },
            conversion(goodsId,item){//领取商品
                if(this.judgeTimeLogin()){
                    return;
                }
                this.getAppData('/activity/happy/getComm',(data)=>{
                    if(data.resCode){
                        this.userData.myYearMoney -= item.yearMoney;
                        this.showGoodSucc = true;
                        this.goodSuccImgId = goodsId;
                        console.log(this.goodSuccImgId)
                    }
                },{commodityId:goodsId})
                if(goodsId == 5){
                    this.$set(this.hotStatuss,0,1);
                }else if(goodsId == 6){
                    this.$set(this.hotStatuss,1,1);
                }
            },
            checkTopic(index){//切换轮次
                if(this.answerStart){
                    return;
                }
                
                if((index + 1) < this.defaultTioic){//小于当前轮
                    this.activeAnserBtn = this.answerBtnImg[this.answerCases[index]];
                }else if((index + 1) == this.defaultTioic){//等于当前轮
                    if(this.answerCases[index] == 1){
                        this.activeAnserBtn = this.answerBtnImg[1];
                    }else if(this.userData.residueDegree > 0){
                        this.activeAnserBtn =  this.answerBtnImg[4];
                    }else{
                        this.activeAnserBtn = this.answerBtnImg[2];
                    }
                }else{//大于当前轮
                    this.activeAnserBtn = this.answerBtnImg[3];
                }
                if(this.activityStatus == 3){
                    if(this.answerCases[index] == 1){
                        this.activeAnserBtn = this.answerBtnImg[1];
                    }else if(this.answerCases[index] == 2){
                        this.activeAnserBtn =  this.answerBtnImg[2];
                    }else{
                        this.activeAnserBtn = this.answerBtnImg[0];
                    }
                }
                console.log('sdfsdf')
                this.activeTopic = (index + 1);
            },
            getUserData(){//初始化数据
                this.getAppData('/activity/happy/init',(data) =>{
                    if(data.resCode){
                        this.activeTopic = data.resData.round;
                        this.defaultTioic = data.resData.round;
                        this.userData = data.resData.happyUser;
                        this.answerCases = data.resData.answerCases;
                        this.goodsList = data.resData.happyCommodities;
                        this.redSum = data.resData.redSum;
                        this.hotStatuss = data.resData.hotStatuss;
                        this.rateNum = data.resData.rateNum;
                        this.hasShare = data.resData.happyUser.shareRed;

                        [ ...this.topicListAct ] = this.topicList[this.defaultTioic - 1];
                        console.log(132323232323232)
                        this.checkTopic((this.defaultTioic-1))
                    }
                },{})
            }
        },
        components:{
        },
        created(){
            if(this.hasLogin){
                this.getUserData();
            }else{
                this.getNotlogData('/activity/happy/init',(data) =>{
                    if(data.resCode){
                        this.activeTopic = data.resData.round;
                        this.defaultTioic = data.resData.round;
                        this.goodsList = data.resData.happyCommodities;
                        this.checkTopic((this.defaultTioic-1))
                    }
                },{})
            }

            this.createNum();
            this._getActivityTime('happy_e_activity');

        },
        mounted(){
            setTimeout(()=>{
                if(this.activityStatus != 1){
                    this.ActivityPrompt();
                    this.checkTopic((this.defaultTioic-1))
                }
            },360)
            this.PassValue('NavWhite_HAPPY E 夏');
            this.getWxShareData(this.shareObj);

            this.$route.query.ym ? this.youmeng(this.$route.query.ym) : this.youmeng('1274303184')
        },
        watch: { // 监听
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
    #happySummer{
        background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/happySummerBG.png') no-repeat;
        background-size: 100% 100%;
        height: 45.81333rem;
        font-family: PingFang-SC-Medium;
        .notLogin{
            background: rgba(0,0,0,0)!important;
        }
        .sharebox{
            img{
                height:4.8rem;
                width:100%;
                
            }
        }
        .GetAward{
            .content{
                background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/getAward.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .topicResult,.GetAward{
            padding-top: 3.133333rem;
            .content{
                height:7.2rem;
                width:7.973333rem;
                background-size: 100% 100%!important;
                margin: 0 auto;
                position: relative;
                padding: 4.533333rem 0 0 1.973333rem;
                .btn{
                    height:1.333333rem;
                    width:4.0rem;
                }
                .close{
                    height:1.333333rem;
                    width:1.333333rem;
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    margin-left: -0.666667rem;
                }
                
            }
        }
        .calculator{
            .bottom{
                height:6.346667rem;
                background:#fff;
                position: absolute;
                bottom:0;
                left:0;
                width:100%;
                .title{
                    font-family: PingFang-SC-Bold;
                    font-size:0.426667rem;
                    line-height:1.173333rem;
                    padding-left: 0.533333rem;
                    color:#333;
                    position: relative;
                    .close{
                        height:0.4rem;
                        width:0.4rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/calClose.png') no-repeat;
                        background-size: 100% 100%;
                        margin: 0.3rem 0.533333rem;
                    }
                }
                .content{
                    padding-top: 0.533333rem;
                    .li{
                        padding: 0 0 0 0.533333rem;
                        font-size:0.373333rem;
                        height:0.8rem;
                        margin-bottom: 0.4rem;
                        .name{
                            line-height:0.8rem;
                            color:#333;
                        }
                        .input{
                            margin-left: 0.266667rem;
                            height:0.8rem;
                            width:6.8rem;
                            background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/inputBorder.png') no-repeat;
                            background-size: 100% 100%;
                        }
                        
                    }
                    .li1{
                        .input{
                            height:0.8rem;
                            width:6.8rem;
                            background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/inputBorder.png') no-repeat;
                            background-size: 100% 100%;
                            padding: 0.133333rem 0.4rem;
                            input{
                                height:0.533333rem;
                                font-size:0.373333rem;
                                line-height:0.533333rem;
                            }
                        }
                    }
                    .li2{
                        .input{
                            padding-left: 0.4rem;
                            line-height:0.8rem;
                            color:#333;
                            position: relative;
                            .right{
                                height:0.8rem;
                                width:0.933333rem;
                                background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/cut.png') no-repeat;
                                background-size: 100% 100%;
                            }
                            .el-select{
                                position: absolute;
                                top:0;
                                left:0;
                                width:6.8rem;
                                opacity:0;
                            }
                        }
                    }
                    .li3{
                        .input{
                            background: rgba(0,0,0,0);
                            line-height:0.8rem;
                            font-size:0.373333rem;
                            padding-left: 0.266667rem;
                            span{
                                font-size:0.453333rem;
                                color:#FF2323;
                                font-family: PingFang-SC-Bold;
                                margin-right: 0.24rem;
                            }

                        }
                    }
                    .tips{

                    }
                    .tips{
                        color:#999;
                        font-size:0.32rem;
                        line-height:0.533333rem;
                        text-align:center;;
                    }
                }
            }
        }
        .rultBox{
            padding-top: 2.133333rem;
            .content{
                height:11.253333rem;
                width:8.146667rem;
                margin: 0 auto;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/rultBox.png') no-repeat;
                background-size: 100% 100%;
                padding-top: 1.6rem;
                position: relative;
                .textBox{
                    height:7.8rem;
                    width:7.253333rem;
                    margin: 0 auto;
                    border-radius: 0.16rem;
                    overflow: hidden;
                }
                .imgbox{
                    height:7.8rem;
                    width:7.253333rem;
                    margin: 0 auto;
                    border-radius: 0.16rem;
                    overflow-y: auto;
                    .img{
                        height:12.666667rem;
                        width:7.253333rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/rultContent.png') no-repeat;
                        background-size: 100% 100%;
                        position: relative;
                        a{
                            position: absolute;
                            bottom:0.76rem;
                            left:2.1rem;
                            height:0.533333rem;
                            width:2.8rem;
                        }
                        p{
                            position: absolute;
                            bottom:0.3rem;
                            left:0;
                            width:100%;
                            font-size:0.346667rem;
                            line-height:0.4rem;
                            text-align:center;
                            color:#808080;
                        }
                    }
                }
                .close{
                    height:1.333333rem;
                    width:1.333333rem;
                    position: absolute;
                    bottom:0;
                    left: 50%;
                    margin-left: -0.666667rem;
                }

            }
        }
        .goodSuccess{
            padding-top: 2.133333rem;
            .content{
                height:9.6rem;
                width:7.2rem;
                margin: 0 auto;
                background-size: 100% 100%!important;
                position: relative;
                .close{
                    position: absolute;
                    bottom:0;
                    left: 50%;
                    height:1.333333rem;
                    width:1.333333rem;
                    margin-left: -0.666667rem;
                }
            }
            .topicHeight{
                height:8.64rem;
            }
        }
        .countDown{
            background: rgba(0,0,0,.7)!important;
            .content{
                height:100%;
                width:100%;
                display:block;
            }
        }
        .rult{
            position: absolute;
            z-index:100;
            top:6.533333rem;
            right: 0;
            height:1.12rem;
            width:1.386667rem;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/rult.png') no-repeat;
            background-size:100% 100%;
        }
        .share{
            padding-top: 12.96rem;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/bigRed.gif') 0 11.18rem no-repeat;
            background-size: 100% ;
            height:17.16rem;
            .btn{
                height:1.706667rem;
                width:1.706667rem;
                margin-left: 5.533333rem;
                margin-bottom: 1.466667rem;
                background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/shareBtn.png') no-repeat;
                background-size:100% 100%!important;
            }
            .hasBtn{
                background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/hasShareBtn.png') no-repeat;
            }
            .toRedList{
                font-family: PingFang-SC-Bold;
                height:0.533333rem;
                line-height:0.533333rem;
                font-size: 0.373333rem;
                text-align:right;
                color: #FF6000;
                padding-right: 0.533333rem;

            }
        }
        #answerAward{
            padding-top: 2.3rem;
            position: relative;
            .topAnswerAward{
                position: absolute;
                z-index:99;
                top:0;
                left:0;
                height:100%;
                width:100%;
            }
            
            .topic{
                padding-left: 0.76rem;
                height:8.586667rem;
                .listTab{
                    margin-top: 0.16rem;
                    width:2.08rem;
                    height:7.173333rem;
                    text-align: center;
                    font-size: 0.346667rem;
                    line-height: 0.48rem;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/leftTab1.png') no-repeat;
                    background-size: 100% 100%!important;
                    .li{
                        height:1.333333rem;
                    }
                    .activeLi{
                        // background: #aaf;
                    }
                }
                .topicBanner{
                    padding-top: 1.212rem;
                    padding-left: 0.11rem;
                    .rate{
                        width:6.2rem;
                        height: 0.168rem;
                        position: relative;
                        margin-bottom: 0.48rem;
                        .liBox{
                            width: 1.12rem;
                            height:100%;
                            border-bottom-right-radius: 0.08rem;
                            border-top-right-radius: 0.08rem;
                            position: relative;
                            margin-right: 0.06rem;
                        }
                        .liBox:first-child{
                            width: 0.94rem;
                        }
                        .liBox:last-child{
                            border-bottom-right-radius: 0.333rem;
                            border-top-right-radius: 0.333rem;
                        }
                        .bgc{
                            background:#f94;
                        }
                        .award{
                            position: absolute;
                            top: -0.5rem;
                            height:0.96rem;
                            width:0.96rem;
                            z-index: 99;
                            img{
                                position: absolute;
                                top:0;
                                left: 0;
                                height:0.96rem;
                                width:0.96rem;
                            }
                        }
                        .award1{left: 1.6rem;}
                        .award2{left: 2.8rem;}
                        .award3{left: 5rem;}
                    }
                    .answer{
                        .banner{
                            padding-top: 0.96rem;
                            .award{
                                display: block;
                                margin-left: -0.1rem;
                                height: 2.506667rem;
                                width: 6.346667rem;
                            }
                            .result{
                                padding-top: 0.133333rem;
                                position: relative;
                                .hand{
                                    position: absolute;
                                    z-index:10;
                                    top:0;
                                    right:0;
                                    height:1.866667rem;
                                    width:2.666667rem;
                                    background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/hand.gif') no-repeat;
                                    background-size: 100% 100%;
                                }
                                .btn{
                                    width:2.88rem;
                                    height:1.12rem;
                                    margin: 0 auto;
                                    background-size: 100% 100%!important;
                                }
                                .tips{
                                    font-size: 0.346667rem;
                                    line-height:0.506667rem;
                                    text-align:center;
                                    color: #008BD3;
                                }
                            }
                        }
                    }
                    .topicBox{//题目样式
                        width:6.2rem;
                        height:5.333333rem;
                        overflow: hidden;
                        position: relative;
                        .djs{
                            position: absolute;
                            top:0.32rem;
                            right:0.266667rem;
                            height:0.533333rem;
                            width:1.306667rem;
                            border-radius:0.266667rem;
                            background:#fff;
                            font-size:0.346667rem;
                            line-height:0.533333rem;
                            text-align:center;
                            color:#FF7877;
                        }
                        ul{
                            position: relative;
                            width:31rem;
                            height:5.333333rem;
                            overflow: hidden;
                            li{
                                position: absolute;
                                top: 0;
                                left: 0;
                                color:#008FD8;
                                width:6.2rem;
                                padding: 0.373333rem 0.1rem 0 0;
                                .titleNum{
                                    width:5.8133rem;
                                    font-family: PingFang-SC-Bold;
                                    font-size:0.426667rem;
                                    line-height:0.426667rem;
                                    text-align:center;
                                    padding-bottom: 0.213333rem;
                                }
                                .title{
                                    width:5.8133rem;
                                    padding-left: 0.213333rem;
                                    font-family: PingFang-SC-Bold;
                                    height:1.28rem;
                                    font-size:0.346667rem;
                                    line-height:0.426667rem;
                                    text-align: justify;
                                }
                                .xuanxiang{
                                    position: absolute;
                                    width:100%;
                                    top:80px;
                                    left:0;
                                }
                                .key{
                                    font-size:0.32rem;
                                    line-height:0.36rem;
                                    height:1.0rem;
                                    padding-bottom: 0.266667rem;
                                    padding-left: 0.213333rem;
                                    .status{
                                        height:0.346667rem;
                                        width:0.346667rem;
                                        margin: 0.32rem 0.293333rem 0 0.373333rem;
                                        position: relative;
                                        img{
                                            position: absolute;
                                            top: 0;
                                            left: 0;
                                            height:100%;
                                            width:100%;
                                            background:#41BFFF;
                                            border-radius:0.08rem;
                                            background-size: 100% 100%!important;
                                        }
                                        .keyImg1{background:#41BFFF;}
                                        .keyImg2{background: #41BFFF url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/topicTrue.png') no-repeat;}
                                        .keyImg3{background: #FF711C url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/topicFalse.png') no-repeat;}
                                    }
                                    .letter{
                                        height:1rem;
                                        padding-right:0.16rem;
                                        padding-top: 0.32rem;
                                    }
                                    .option{
                                        width:3.94rem;
                                        height:1rem;
                                        text-align:justify;
                                    }
                                    .align-center-vertical{
                                        display: flex;
                                        align-items: baseline;
                                        justify-content: space-around;
                                        flex-direction: column;
                                        text-align:left;
                                    }
                                }
                                .keyBG{
                                    background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/heng.png') left bottom no-repeat;
                                    background-size:100% 0.586667rem;
                                }
                            }
                        }
                    }
                }
            }
        }
        .giftBag{
            padding-top: 9.36rem;
            position: relative;
            .myMoney{
                position: absolute;
                top:2.8rem;
                left:0;
                width:100%;
                text-align:center;
                font-size:0.32rem;
                line-height:0.373333rem;
                color:#FF701A;
                font-family: PingFang-SC-Bold;
            }
            .goodList{
                position: absolute;
                right:0;
                top:1.333333rem;
                padding: 10px 0 0 0.16rem;
            }
            .calculatorbtn{
                position: absolute;
                right:0.82rem;
                top:2.3rem;
                padding: 0.12rem 0 0 0.026667rem;
            }
            .goodList,.calculatorbtn{
                font-family: PingFang-SC-Bold;
                height:1.2rem;
                width:1.2rem;
                font-size:0.32rem;
                color:#FF5231;
                text-align:center;

            }
            .hotCake{
                padding-left: 1.466667rem;
                height:1.813333rem;
                .btn{
                    width: 2.8rem;
                    height: 1.12rem;
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/hotBtn1.png') no-repeat;
                    background-size: 100% 100%!important;
                    margin-right: 1.34rem;
                }
                .hotInvest{
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/hotBtn2.png') no-repeat;
                }
                .hasInvest{
                    background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/hotBtn3.png') no-repeat;
                }
            }
            .swiperBox{
                height:4.8rem;
                padding-top: 0.8rem;
                .swiper-button-next,.swiper-button-prev{
                    opacity: 0;
                }
                .swiper-container{
                    height:4rem;
                    width: 100%;
                    .swiper-slide{
                        padding: 0 1.146667rem 0 1.36rem;
                        .goods{
                            .good{
                                .goodImg{
                                    height:3.173333rem;
                                    width:3.466667rem;
                                }
                                .goodBtn{
                                    height:0.933333rem;
                                    width:2.506667rem;
                                    background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/getGoodBtn1.png') no-repeat;
                                    background-size: 100% 100%!important;
                                    margin: 0 auto;
                                }
                                .toInvest{
                                    background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/getGoodBtn2.png') no-repeat;
                                }
                                .canGet{
                                    background: url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/getGoodBtn2.png') no-repeat;
                                }
                            }
                            .good1{
                                margin-right: 0.506667rem;
                            }
                        }
                    }
                }
            }
            .goodsDetail{
                height:0.933333rem;
                font-size:0.346667rem;
                line-height:0.533333rem;
                text-align:right;
                padding-top: 0.4rem;
                padding-right: 0.266667rem;
                color:#FF6000;

            }
        }
    }
    
</style>