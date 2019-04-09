<template>
    <div class="holiday" :class="{'six-holiday' : info.quantity == 6}" ref="holiday">
        <div v-title>{{activityName}}</div>
        <!-- 规则按钮 -->
        <div class="rule" @click="ruleShow"></div>
        <!-- 滚动信息 -->
        <div class="k_scroll_box">
            <div class="scroll_box clear" v-if="isShowNotice">
                <div class="scroll-div fl">
                    <ul>
                        <li v-for="item in scrollInfo" ref="messageList">用户{{item.mobilePhone}}成功兑换{{item.name}}</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- 我的投资金额 -->
        <div class="investMoney">
            <div class="change_rule" @click="layerBoxTip = true"></div>
            <div class="inner clear">
                <div class="fl">
                {{amountNine}}元
            </div>
                <div class="fl">
                {{amountEight}}元
            </div>
                <div class="fl">
                {{amountSix}}元
            </div>
            </div>
            <div class="btn" v-if="userId || getCookie('userToken')" @click="toWxUrl('/festMain/record','activityId',activityIds)">我的兑换</div>
            <div class="btn" v-else @click="toLogin">立即登录</div>
        </div>

        <!-- 商品列表 -->
        <ul class="goods_list clear">
            <li v-for="item in goodsList">
                <div class="subscript" v-if="item.times !== 999999">
                    <span>限兑{{item.times}}次</span>
                </div>
                <div class="doBtn toComplete" @click="toComplete(item)" v-if="item.btnStatus == 0"></div>
                <div class="doBtn toChange" @click="toComplete(item)" v-else-if="item.btnStatus == 1"></div>
                <div class="doBtn greyBtn"  v-else></div>
            </li>
        </ul>
        
        <!-- 任务完成情况 -->
        <task :getGoodList="goodList" :goodName="goodName" :amountSum="amountSum" v-if="taskBox.isShow" :taskBox="taskBox"></task>
        <!-- 可兑换弹框 -->
        <div class="rule_box" v-if="changeBox.isShow">
            <div class="task">
                <div class="goods_title txt2">确认兑换<i @click="changeBox.isShow = false"></i></div>
                <div class="task_contain2 clear">
                    <div class="box1">
                        <p>兑换商品</p>
                        <p>兑换方式</p>
                    </div>
                    <div class="box2">
                        <p>{{goodName}}</p>
                        <div class="dis red" v-for="(v, i) in qualifiedList" @click="checked(i)">消耗{{v.term}}项目 {{v.money | moneyFormat(1)}}元 
                            <img :src="picIndex == i ? checkBg[1] : checkBg[0]">
                        </div>
                        <div class="dis pad" v-for="(v, i) in unfinishedList">消耗{{v.term}}项目 {{v.money | moneyFormat(1)}}元</div>
                    </div>
                </div>
                <div class="btns">
                    <div class="btn_box invest_btn_box" @click="toInvestBtn"></div>
                    <div class="btn_box change_btn_box" @click="doChange(checkList.id)"></div>
                </div>
            </div>
        </div>

        <!-- 规则 -->
        <div class="rule_box" v-if="layerBoxRule">
            <div class="dialog_commom rule_wrap common_rule">
                <div class="close_btn"  @click="layerBoxRule = false"></div>
                <a href="tel:4001353388" class="tele"></a>
                <div class="content" v-if="osType == 'IOS'">本活动与苹果公司无关！</div><br/>
            </div>
        </div>

        <!-- 渠道规则 -->
        <div class="rule_box" v-if="channelRule">
            <div class="dialog_commom rule_wrap channel_rule">
                <div class="close_btn"  @click="channelRule = false"></div>
                <a href="tel:4001353388"></a>
                <div class="content" v-if="osType == 'IOS'">本活动与苹果公司无关！</div><br/>
            </div>
        </div>

        <!-- 提示规则 -->
        <div class="rule_box" v-if="layerBoxTip">
            <div class="dialog_commom tip_box">
                <div class="know_btn" @click="layerBoxTip = false"></div>
            </div>
        </div>

        <!-- 活动未开始 -->
        <div class="rule_box" v-if="gameUnstart">
            <div class="dialog_commom game_box unOPen">
                <div class="game_btn" @click="gameUnstart = false"></div>
            </div>
        </div>

        <!-- 活动以结束 -->
        <div class="rule_box" v-if="gameover">
            <div class="dialog_commom game_box over">
                <div class="game_btn" @click="gameover = false"></div>
            </div>
        </div>

        <!-- 兑换成功弹框 -->
        <div class="rule_box" v-if="hasChange.isShow">
            <div class="dialog_commom hasChange_box" :class="{'redChange-box' : type == 2}">
                <div class="close_change_btn" @click="hasChange.isShow = false"></div>
                <div class="game_btn top2" @click="toWxUrl('/festMain/record','activityId',activityIds)"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import task from './task'; //任务弹框组件
    export default {
        mixins:[wxToapp],
        data() {
            return {
                activityName:'',
                goodsList:[],//商品列表
                goodType:'',
                info:{},
                scrollInfo:[],//用户兑换记录
                amountNine:'',//用户投资90天金额
                amountEight:'',//用户投资180天金额
                amountSix:'',//用户投资360天金额
                datainfo:{},//页面信息
                checkList:{},//去兑换弹框
                loginStatus:false,//登陆状态
                isShowNotice:false,//是否显示用户兑换记录

                layerBoxRule:false,//规则弹框
                layerBoxTip:false,//兑换规则弹框

                taskBox:{//去完成任务弹框
                    isShow:false
                },
                changeBox:{//去兑换弹框
                    isShow:false
                },
                gameTimeBox:false,//活动未开始和已结束蒙层
                gameUnstart:false,//活动未开始
                gameover:false,//活动已结束
                activityStatus:'',//活动状态
                hasChange:{//兑换成功弹框
                    isShow:false
                },
                checkStatus:{//选择兑换 1,消耗90天 2,消耗180天
                    status:''
                },
                indexOne:0,
                indexTwo:0,
                indexThree:0,
                checkBg:[
                    'https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/uncheck.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/checked.png'
                ],
                activityIds:'',//活动ID
                redText1:0,
                timer:null,
                checkLists:[],
                channelRule:false,//渠道规则
                showRuleCheck:'',
                type:'',//1为食物 2为红包
                amountSum:[],  //  以投资金额列表30、 60、 90、 180、 360。
                picIndex: 0, // 图片选中的下标
                goodsId: 0,  // 选中的商品id
                qualifiedList:[],
                unfinishedList:[],
                termNO: 0,  // 兑换期限的序列号  5、30天, 4、60天,1、90天, 2、180天   3、360天
                goodName: '',
                goodList: [],
                type:'',//1为食物 2为红包
                flag:true,
            }
        },
        methods:{
            // 活动时间
            _getActivityTime(){// 获取活动时间状态
                this.notLogPost('/activity/two/getActivityTime',data => {
                    if(data.resCode){
                        this.activityStatus = data.resData.active;
                        this.ActivityPrompt()
                    }
                },{activityId:this.activityIds})
            },
            ActivityPrompt() { //显示弹框方法,判断活动结束
                if (this.activityStatus == 2) {
                    this.gameUnstart = true;
                } else if (this.activityStatus == 3) {
                    this.gameover = true;
                  }
            },
            
            // 点击去完成按钮显示弹框
            toComplete(item){
                if(this.userId || this.getCookie('userToken')){
                    if (this.activityStatus !== 1) {
                        this.ActivityPrompt()
                        return
                    }
                    this.goodsId = item.id;
                    this.goodName = item.name;
                    this.goodList = [];
                    this.goodList = [{term: item.amount30}, {term: item.amount60}, {term: item.amount90}, {term: item.amount180}, {term: item.amount360}];
                    this.picIndex = 0;

                    if(item.btnStatus == 0){
                        this.taskBox.isShow = true;
                    } else if(item.btnStatus == 1){
                        this.type = item.type;
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
                    }
                }else{
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                }
                
            },
            toInvestBtn () {
                if(this.userId || this.getCookie('userToken')){
                    this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}});
                }else{
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                }
            },
            // 单选判断
            checked(n){       // 单选判断
                this.picIndex = n;
                this.termNO = this.qualifiedList[n].serial; // 保存期限编号
            },
            
            // 确认兑换
            doChange(){
                if(this.flag){
                    this.flag = false;
                    this.changeBox.isShow = false;
                    this.getAppData('/activity/fest/exchange',(data) => {
                        this.flag = true;
                        if(data.resCode == 1){
                            this.hasChange.isShow = true;
                            this.getData();
                        }
                    },{commodityId:this.goodsId,exchangeType:this.termNO,activityId:this.activityIds})
                }
            },

            //活动规则弹框
            ruleShow(){
                if ( this.showRuleCheck == 1 ){
                    this.channelRule = true
                }else{
                    this.layerBoxRule = true
                }
            },

            // 初始化数据
            getData(){
                this.getNotlogData('/activity/fest/init',(res) => {
                    if(res.resCode == 1){
                        this.$refs.holiday.style.backgroundImage = "url("+"'"+ (res.resData.headerImg.toString()).split(',')[0]+"'"+")"
                        this.amountSum = [];
                        this.amountSum.push(res.resData.amountSum30);
                        this.amountSum.push(res.resData.amountSum60);
                        this.amountSum.push(res.resData.amountSum90);
                        this.amountSum.push(res.resData.amountSum180);
                        this.amountSum.push(res.resData.amountSum360);
                        this.amountNine = res.resData.amountSum90;
                        this.amountEight = res.resData.amountSum180;
                        this.amountSix = res.resData.amountSum360;

                        this.goodsList = res.resData.commodities;
                        this.scrollInfo = res.resData.records;
                        this.info = res.resData;
                        this.showRuleCheck = res.resData.channelShow;

                        if (res.resData.records.length ==0) {
                            this.isShowNotice = false
                        } else {
                            this.isShowNotice = true
                            let that  = this
                            if (this.isShowNotice){
                                $(document).ready(function(){
                                    clearInterval(that.timer)
                                    that.timer = window.setInterval(function(){
                                        if (that.isShowNotice){
                                            $('.scroll-div').find("ul:first").animate({
                                                marginTop: -that.$refs.messageList[0].offsetHeight + 'px'
                                            },500,function(){
                                                $(this).css({marginTop:"0"}).find("li:first").appendTo(this);
                                            });
                                        }else{
                                            clearInterval(that.timer)
                                        }
                                    },3000);
                                });
                            }
                        }
                    }
                },{activityId:this.activityIds})
            },
        },
        components:{
            task
        },
        created(){
            if(this.$route.query.activityId){
                this.activityIds = this.$route.query.activityId;
                if(this.$route.query.activityId == 'activity_fest2'){
                    this.activityName = '每逢佳节（二）';
                }else if(this.$route.query.activityId == 'activity_fest3'){
                    this.activityName = '每逢佳节（三）';
                }
            }
            this.getCookie('userToken') || this.userId ? this.loginStatus = true : this.loginStatus = false;
            this._getActivityTime();
            this.getData();
        },
        mounted(){
            setTimeout(() =>{
                document.body.scrollTop = 1+'px'
            },500)

            if(this.$route.query.activityId){
                if(this.$route.query.activityId == 'activity_fest2'){
                    this.PassValue('NavWhite_每逢佳节（二）');
                }else if(this.$route.query.activityId == 'activity_fest3'){
                    this.PassValue('NavWhite_每逢佳节（三）');
                }
            }
        },
        destroyed(){
            clearInterval(this.timer);
        }
    }
</script>
<style lang="scss" scoped>
    .holiday{
        position: relative;
        /*3053px*/
        height: 40.7rem;
        // background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/holiday_bag.png) no-repeat;
        background-size: 100% 40.7rem;
        background-repeat: no-repeat;
        overflow: hidden;
        .k_scroll_box{
            position: relative;
            height: 0.773333rem;
            margin-top: 9.813333rem;
        }
        .scroll_box{
            position: relative;
            height: .693333rem;
            width: 8.266667rem;
            margin: 0 auto;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/notice.png) no-repeat;
            background-size: 8.266667rem .693333rem;
            padding-top: .03rem;
        }
        .scroll-div{
            position: relative;
            width: 8rem;
            height: .613333rem;
            padding: .1rem .213333rem 0  1.4rem;
            font-family: SourceHanSansCN-Normal;
            font-size: 0.32rem;
            color: #ffffff;
            overflow: hidden;
            li{
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                height: .613333rem;
                text-overflow: ellipsis;
            }
        }
        .investMoney{
            height: 3.733333rem;
            width: 9.066667rem;
            margin: .2rem auto 1.61rem auto;
            position: relative;
            overflow: hidden;
            .change_rule{
                position: absolute;
                width: .6rem;
                height: .6rem;
                top: 0;
                right: 0;
            }
            .inner{
                width: 8.72rem;
                height: .6rem;
                line-height: .6rem;
                margin: 0 auto;
                margin: .853333rem auto 0.413333rem auto;
                div{
                    width: 33.3%;
                    text-align: center;
                    font-family: SourceHanSansCN-Medium;
                    font-size: 0.4rem;
                    color: #2f2f2f;
                }
            }
            .btn{
                width: 2.853333rem;
                height: .866667rem;
                line-height: .866667rem;
                font-size: .346667rem;
                color: #FFFFFF;
                text-align: center;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/loginBtn.png) no-repeat;
                background-size: 2.853333rem .866667rem;
                margin: 1.083333rem auto 0 auto;
            }
        }
        ul.goods_list{
            position: relative;
            margin-left: 1.12rem;
            li{
                width: 3.72rem;
                height: 4.866667rem;
                float: left;
                margin-right: 0.306667rem;
                float: left;
                position: relative;
                margin-bottom: 1rem;
                .subscript {
                    width: 1.56rem;
                    height: 1.56rem;
                    position: absolute;
                    right: -0.1rem;
                    top:-0.1rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/subscript.png) no-repeat;
                    background-size: 1.56rem 1.56rem;
                    span {
                        display: inline-block;
                        transform: rotate(44deg);
                        font-size: .293333rem;
                        color: #FFFFFF;
                        position: absolute;
                        right: 0rem;
                        top: .35rem;
                    }
                }
                .doBtn{
                    width: 2.826667rem;
                    height: .88rem;
                    position: relative;
                    top: 3.9rem;
                    margin:0 auto; 
                }
                .doBtn.toComplete{
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/completeBtn.png) no-repeat;
                    background-size: 2.826667rem .88rem;
                }
                .doBtn.toChange{
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/exchangeBtn.png) no-repeat;
                    background-size: 2.826667rem .88rem;
                }
                .greyBtn {
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/comBtn.png) no-repeat;
                    background-size: 2.826667rem .88rem;
                }
            }
        }
        .rule{
            position: fixed;
            right: 0;
            top: 1.1rem;
            width: 1.0rem;
            height: 0.8rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/finalYearsAdd/rule_btn.png) no-repeat;
            background-size: 1.0rem 0.8rem;
            z-index: 11;
        }
        .dialog_commom{
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            margin: auto;
            text-align: center;
            z-index: 1000;
        }
        .rule_box{
            width:100%;
            height:100%;
            background:rgba(0,0,0,.5);
            position:fixed;
            top:0;
            z-index:100;
            padding-top: 2.666667rem;
        }
        .rule_wrap{
            a {
                display: inline-block;
                width: 2.2rem;
                height: .606667rem;
                position: absolute;
                top: 5.556667rem;
                left: 1.05rem;
            }
            a.tele{
                top: 5.756667rem;
            }
        }
        .common_rule{
            width: 8.133333rem;
            height: 10.253333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/11warmUp/rulePic.png) no-repeat;
            background-size: 8.133333rem 10.253333rem;
        }
        .channel_rule{
            width: 7.866667rem;
            height: 9.68rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/finalYearsAdd/rule_info2.png?v=1.0) no-repeat;
            background-size: 7.866667rem 9.68rem;
        }
        .close_btn{
            width:1.566667rem;
            height: 1.066667rem;
            position: absolute;
            bottom: 0;
            left: 3.3rem;
        }
        .content{
            width:100%;
            position: absolute;
            font-size: .32rem;
            color: #999999;
            text-align: center;
            top: 6.966667rem;
        }
        .tip_box{
            width: 7.213333rem;
            height: 4.72rem ;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/finalYearsAdd/tips.png) no-repeat;
            background-size: 7.213333rem 4.72rem;
            .know_btn{
                width: 100%;
                height: 1.52rem;
                position: relative;
                top: 2.86667rem;
            }
        }
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
                margin-bottom: 0.653333rem;
                height: 1rem;
                overflow: hidden;
                .btn_box{
                    width:3.466667rem;
                    height: 0.933333rem;
                    float: left;
                }
                .invest_btn_box{
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/toInvest.png) no-repeat;
                    background-size: 3.466667rem 0.933333rem;
                    margin-left: 1.2rem;
                    margin-right: 0.666667rem;
                }
                .change_btn_box{
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/comfirm.png) no-repeat;
                    background-size: 3.466667rem 0.933333rem;
                }
            }
        }
        .game_box{
            width: 7.213333rem;
            height: 3.653333rem;
        }
        .game_btn{
            width: 100%;
            height: 1.333333rem;
            position: relative;
            top: 2rem;
        }
        .game_box.unOPen{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/finalYearsAdd/unBegin.png) no-repeat;
            background-size: 7.213333rem 3.653333rem;
        }
        .game_box.over{
            background: url(https://aliyunsso.edspay.com/web/wx/activity/finalYearsAdd/over.png) no-repeat;
            background-size: 7.213333rem 3.653333rem;
        }
        .hasChange_box{
            width: 7.213333rem;
            height: 6.32rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/finalYearsAdd/change_sucess.png) no-repeat;
            background-size: 7.213333rem 6.32rem;
            .close_change_btn{
                width: 1rem;
                height: 1rem;
                position: absolute;
                bottom: 0;
                left: 3.2rem;
            }
            .top2{
                top: 3.133333rem;
            }
        }
        .redChange-box {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/finalYearsAdd/change_sucess_money.png) no-repeat;
            background-size: 7.213333rem 6.32rem;
        }
    }
    .six-holiday {
        /*2580px*/
        // 3053 40.7
        height: 34.4rem;
        background-size: 100% 34.4rem;
        background-repeat: no-repeat;
    }
</style>
