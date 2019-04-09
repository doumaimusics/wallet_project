<template>
    <div id="meetingTwo">
        <div v-title>狂欢进行时 返现由你定</div>
        <div class="toMain" @click="appRouter('/doubleEleven/main')"></div>
        <div class="title" ref="title" :class="'tab'+titleIndex">
            <div class="item" v-for="(v, i) in 3" @click.stop="change(i)"></div>
        </div>
        <!-- 福利一 -->
        <div id="tab1">
            <div class="dataBox">
                <div class="leftData fl" v-if="loginStatus == 0">--</div>
                <div class="leftData fl" v-else>{{totalYear | returnFloat}}</div>
                <div class="rightData fr" v-if="loginStatus == 0">--</div>
                <div class="rightData fr" v-else>{{totalMoney | returnFloat}}</div>
            </div>
            <div class="loginBtn" :class="'str'+btnOne" @click="Welfare1(btnOne)"></div>
            <div class="frequency" :class="[{active: useMoney==0}]">
                <p>活动期间仅限兑换1次</p>
                <p v-if="useMoney > 0">您已兑换{{useMoney | returnFloat}}元</p>
            </div>
            <div class="calculatorBtn" @click="Calculator = true"></div>
        </div>
        <!-- 福利二 -->
        <div id="tab2">
            <div class="Doubling">
                <div class="icon" v-for="v in 3" :class="'label'+v" v-if="Eleven == 1"></div>
            </div>
            <div class="invest">今日累计净出借金额：<em>{{loginStatus ? myCleanMoney : '--'}}</em><i>元</i></div>
            <div class="loginBtn" @click="toLogin" v-if="loginStatus == 0"></div>
            <div class="loginBtn isLongin" @click="Jump('WIP', '/wxInvest')" v-else></div>
            <div class="dataTime" @click="openPicker">{{pickerValue}}</div>
            <div class="drawList">
                <div class="list" v-for="(v, i) in list">
                    <p class="fl">{{v.phone}}{{v.isTodayTop == 1 ? '(我)' : ''}}</p>
                    <p class="fr">{{v.cleanMoney}}</p>
                </div>
            </div>
            <template>
                <mt-datetime-picker
                    ref="datepicker"
                    type="date"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    :startDate="startDateTime"
                    :endDate="new Date('2018-11-20')"
                    @confirm="handleConfirm"
                    @cancel="handelClose"
                    :closeOnClickModal="false"
                    v-model="nowDateStr">
                </mt-datetime-picker>
            </template>
        </div>
        <!-- 福利三 -->
        <div id="tab3">
            <!-- 抽奖记录 -->
            <div class="tipsNews" :class="[{active:folg}]">
                <p>{{text.phone}}抽中</p>
                <p class="red">{{text.goodsName}}</p>
            </div>
            <!-- 倒计时 -->
            <div class="time_box">
                <div class="content">
                    <p>{{Eleven == 2 ? '距开始:' : '距结束:'}}</p>
                    <p class="time_text" v-if="Eleven == 2">{{times.day}}</p>
                    <p class="text" v-if="Eleven == 2">天</p>
                    <p class="time_text">{{times.hr}}</p>
                    <p class="text">时</p>
                    <p class="time_text">{{times.min}}</p>
                    <p class="text">分</p>
                    <p class="time_text">{{times.sec}}</p>
                    <p class="text">秒</p>
                </div>
            </div>
            <div class="welfare3btn" :class="'str'+btnthree" @click="welfareThree(btnthree)">
                <p v-if="btnthree == 2">（剩余{{balanceTotal}}张）</p>
            </div>
            <div class="luckBg"></div>
            <div class="yuan" :class="[{active: sphericalJump}]">
                <div class="spherical" :class="'seat' + i" v-for="(v, i) in ballDrawList" :style="{background: 'url(' + v.ballUrl + ') no-repeat', backgroundSize: '100% 100%'}"></div>
            </div>

            <div class="redBanalce" @click="appRouter('/doubleEleven/activityRedRecord')" v-if="loginStatus">剩余{{redBanalce}}次抽奖机会</div>
            <div class="redBanalce" v-else>剩余*次抽奖机会</div>

            <div class="door"></div>
            <div class="luckDraw" :class="[{active: down}]" :style="{background: 'url('+ drawActivity.ballUrl +') no-repeat', backgroundSize: '100% 100%'}"></div>

            <div class="luckBtn" :class="[{click: luckState,over: loginStatus && (redBanalce == 0 || Eleven == 3)}]" @click="luckDraw"></div>
            <div class="winningRecord" @click="appRouter('/doubleEleven/meetingTwoDrawRecord')" v-if="loginStatus"></div>
            <div class="winningRecord" @click="toLogin" v-else></div>
        </div>
        <!-- 限时抢卷 -->
        <div class="timeLimit" @click="Jump('GoodsList', '/intGoodList')"></div>
        <!-- 规则按钮 -->
        <div class="ruleBtn" @click="popUp = 1"></div>
        <!-- 规则弹框 -->
        <div class="ruleBox" v-if="popUp == 1">
            <div class="limit">
                <div class="center">
                    <p><em>1.</em>活动时间2018年11月9日零点至11月20日</p>
                    <p><em>2.</em>渠道用户首笔出借不计入奖励兑换金额</p>
                    <p><em>3.</em>活动期间，用户完成出借，根据累计年化金额不同，可获得梯度返现，最高4%，返现奖励需用户在活动页面手动兑换，奖励将在兑换后3个工作日内发放到账户，可在<i>“我的-可用余额”</i>中查看</p>
                    <p><em>4.</em>获得VIP升级券的用户可体验比当前高一等级的VIP福利，体验期30天，体验期结束后用户未升级，等级将恢复成实际VIP等级</p>
                    <p><em>5.</em>VIP6用户得到VIP升级券时将不再升级</p>
                    <p><em>6.</em>活动期间按照用户累计净出借进行排名，若用户出借金额相同，则根据最先满足条件排名</p>
                    <p><em>7.</em>每日榜单以截止于当天23:59:59的排名信息为准，并于榜单公布后次日发放奖励，可在<i>“我的-我的红包”</i>中查看</p>
                    <p><em>8.</em>10月26日-11月8日使用定制红包获得的抽奖机会，可在双十一当天进行抽奖，抽奖时间为11月11日11点-11月11日23:59:59，逾期作废。</p>
                    <p class="copy">本活动在法律允许范围内最终解释权归E都市钱包所有，如有疑问可致电官方客服电话:<a href="tel:400-135-3388">400-135-3388</a></p>
                    <p class="IOS" v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
                </div>
            </div>
            <div class="close" @click.stop="popUp = 0"></div>
        </div>
        <!-- 活动结束 -->
        <div class="timeOver fixed" v-if="popUp == 2">
            <div class="close" @click.stop="popUp = 0"></div>
        </div>
        <!-- 兑换返现前的确认 -->
        <div class="exchangeBefore fixed" v-if="popUp == 3">
            <div class="confirm" @click.stop="exchange"></div>
            <div class="close" @click.stop="popUp = 0"></div>
        </div>
        <!-- 兑换返现成功 -->
        <div class="exchange fixed" v-if="popUp == 4">
            <div class="confirm" @click.stop="getData"></div>
        </div>
        <!-- 抢到升级卷 -->
        <div class="upgrade fixed" v-if="popUp == 5">
            <div class="succ">{{result}}</div>
            <div class="tips" v-if="vipStatus">已为您额外延长30天VIP6等级时间！</div>
            <div class="tips" v-else>升级福利详情，请去<em>vip会员</em>查看！</div>
            <div class="confirm" @click.stop="getData"></div>
        </div>
        <!-- 抽奖成功 -->
        <div class="dealUserDrawActivity fixed" v-if="popUp == 6">
            <h3>恭喜抽得{{drawActivity.goodsName}}</h3>
            <div class="iconBg" :style="{background: 'url(' + drawActivity.goodsUrl + ') no-repeat', backgroundSize: '100% 100%'}"></div>
            <div class="money">{{drawActivity.goodsType == 0 || drawActivity.goodsType == 3 ? '¥' + drawActivity.marketPrice : ''}}</div>
            <div class="tips" v-html="drawTips"></div>
            <div class="confirm" @click.stop="getData"></div>
        </div>
        <!-- 计算器 -->
        <mt-popup v-model="Calculator" position="bottom">
            <div class="CalculatorBox">
                <div class="tab">
                    <div class="tabLeft fl" :class="[{active: rebatesYears == 1}]" @click="rebatesYears = 1">年化计算器</div>
                    <div class="tabRight fr" :class="[{active: rebatesYears == 2}]" @click="rebatesYears = 2">返现计算器</div>
                </div>
                <div class="content" v-if="rebatesYears == 1">
                    <div class="li li1">
                        <div class="name fl">出借金额(元)：</div>
                        <div class="input fl">
                            <input v-model="setYearMoney" v-on:input="getMoney"  type="text" placeholder="输入出借金额">
                        </div>
                    </div>
                    <div class="li li2">
                        <div class="name fl">出借期限(天)：</div>
                        <div class="input fl">
                            <span>{{selectValue}}天</span>
                            <div class="right fr"></div>
                            <el-select v-model="selectValue" placeholder="请选择">
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
                        <div class="name fl">出借年化金额：</div>
                        <div class="input fl">
                            <span>{{investMoney | returnFloat}}</span>元
                        </div>
                    </div>
                    <div class="tips">年化金额=出借金额÷360*出借期限（天）</div>
                </div>
                <div class="content" v-else-if="rebatesYears == 2">
                    <div class="li li1">
                        <div class="name fl">累计年化金额：</div>
                        <div class="input fl">
                            <input v-model="totalYearMoney" v-on:input="backMoney"  type="text" placeholder="输入累计年化金额">
                        </div>
                    </div>
                    <div class="li li2">
                        <div class="name fl">返现金额比例：</div>
                        <div class="name bili">{{scale | returnFloat(1)}}%</div>
                    </div>
                    <div class="li li3">
                        <div class="name fl"><em>返现金额</em>：</div>
                        <div class="input fl">
                            <span>{{Reappearance | returnFloat}}</span>元
                        </div>
                    </div>
                    <div class="tips">返现金额（元）=累计年化金额（Y）*返现比例</div>
                </div>
            </div>
        </mt-popup>
        
        
        <!-- 遮罩 -->
		<div v-if="popUp" class="zIndex" v-layer @click="popUp = 0"></div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import {Toast, Popup, DatetimePicker} from 'mint-ui';
    export default{
        mixins:[ wxToapp ],
        data() {
            return {
                startDateTime: new Date('2018-10-09'),
                titleIndex: 0,
                loginStatus: 0, // 0未登录，1已登录
                Eleven: 1, // 是否双十一当天 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                start: 1,        // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                popUp: 0,        // 弹窗  1、规则弹框  2、活动结束弹框 3、兑换前确认 4、兑换完成 5、抢到升级卷 6、抽奖弹框
                btnOne: 1,        // 福利一按钮  1、未登录  2、登录但没有数据 3、登录有数据 4、已兑换
                btnthree: 1,        // 福利三按钮  1、未开始  2、马上抢 3、已抢光 4、已结束
                text: {},
                pickerValue: '',     
                Calculator: false, //计算器开关
                rebatesYears: 1,
                setYearMoney:null,//年化金额
                selectValue: 30,
                totalYearMoney: null,
                nowDateStr: '',  // 日历返回时间
                openDate:false, // 日期选择器开关
                isExchange:'',
                myCleanMoney:'',
                redBanalce:'',
                time:'',
                totalMoney:'',
                totalYear:'',
                useMoney:'',
                balanceTotal:'',
                drawList: [],
                ballDrawList: [],
                list: [],
                result: '',
                vipStatus: false,
                drawActivity: {},
                drawTips: '活动结束后15个工作日内由理财顾问联系发放！',
                down:false,
                folg: false,
                isRob: '',
                luckState: false,
                sphericalJump: false, 
                tips: null,
                interval:null,
                times:{day:0,hr:0,min:0,sec:0},
                options: [
                    {
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
                    }
                ],
            }
        },
        computed:{
            investMoney: {//年化金额
                get:function(){
                    return parseInt(this.setYearMoney / 360 * this.selectValue * 100)/100;
                },
                set:function(value){
                }
            },
            scale: {
                get:function(){
                    let n = 0.0;
                    if(this.totalYearMoney > 0 && this.totalYearMoney < 5000){
                        n = 2.0;
                    } else if(this.totalYearMoney > 4999 && this.totalYearMoney < 20000){
                        n = 2.2;
                    } else if(this.totalYearMoney > 19999 && this.totalYearMoney < 100000){
                        n = 2.5;
                    } else if(this.totalYearMoney > 99999 && this.totalYearMoney < 200000){
                        n = 3.0;
                    } else if(this.totalYearMoney > 199999 && this.totalYearMoney < 500000){
                        n = 3.8;
                    } else if(this.totalYearMoney > 499999){
                        n = 4.0;
                    };
                    return n;
                },
                set:function(value){
                }
            },
            Reappearance: {
                get:function(){
                    return parseInt(this.totalYearMoney * this.scale)/100;
                },
                set:function(value){
                }
            }
        },
        methods: {
            getData(){
                // 获取数据
                this.popUp = 0;
                 this.down = false;
                this.getNotlogData('/NovemberTwo/getElevenActivityList', (data) => {
                    if(data.resCode == 1){
                        clearInterval(this.interval);
                        this.loginStatus = data.resData.loginStatus;  // 登录状态
                        this.pickerValue = this.nowDateStr = data.resData.currentDate; //当前日期
                        this.start = data.resData.active;  //会场二时间状态
                        this.Eleven = data.resData.elevenActive;  //11.11时间判断
                        this.isExchange = data.resData.isExchange;  //是否兑换，0：未兑换，1：已兑换
                        this.isRob = data.resData.isRob;  //是否兑换，0：未兑换，1：已兑换
                        this.myCleanMoney = data.resData.myCleanMoney; // 我的今日累计净出借
                        this.redBanalce = data.resData.redBanalce;  //抽奖次数
                        this.time = data.resData.time;  // 倒计时
                        this.totalMoney = data.resData.totalMoney; // 可兑换返现
                        this.totalYear = data.resData.totalYear;  // 累计年化金额
                        this.useMoney = data.resData.useMoney;  // 已兑换金额
                        this.balanceTotal = data.resData.balanceTotal;  // vip升级券剩余数量
                        this.drawList = data.resData.drawList; // 福利三抽奖列表
                        this.ballDrawList = data.resData.ballDrawList; // 福利三奖品列表
                        this.getMoneyList(data.resData.currentDate);
                        // 抽奖列表动画
                        if(data.resData.drawList.length > 0){
                            clearInterval(this.tips);
                            this.folg = true;
                            this.text = data.resData.drawList[0];
                            let i = 0;
                            this.tips = setInterval(() => {
                                i += 1;
                                i == data.resData.drawList.length ? i = 0 : '';
                                this.text = data.resData.drawList[i];
                            },3000);
                        };
                        this.Eleven == 2 || this.Eleven == 1 ? this.startDate(data.resData.time) : '';
                        // 福利一按钮状态
                        data.resData.loginStatus == 0 ? this.btnOne = 1 : data.resData.isExchange == 1 ? this.btnOne = 4 : data.resData.totalYear == 0 ? this.btnOne = 2 : this.btnOne = 3;

                        // 福利三按钮状态
                        this.Eleven == 2 ? this.btnthree = 1 : this.Eleven == 3 ? this.btnthree = 4 : this.balanceTotal == 0 ? this.btnthree = 3 : this.btnthree = 2;

                        if(this.Eleven == 1){
                            setTimeout(() => {
                                let H = document.getElementById('tab3').offsetTop - this.$refs.title.offsetHeight;
                                this.titleIndex = 2;
                                document.body.scrollTop = H;
                                document.documentElement.scrollTop = H;
                            }, 500); 
                        };
                        if(data.resData.active != 1){
                            this.popUp = 2;
                        };
                       
                    }else{
                        Toast(data.resMsg)
                    }
                }, {},1)
            },
            getMoneyList(date){
                // 福利二榜单查询
                this.getNotlogData('/NovemberTwo/getMoneyList', (res) => {
                    if(res.resCode == 1){
                        this.list = res.resData.list;
                    }else{
                        Toast(res.resMsg)
                    }
                }, {date: date},1);
            },
            startDate(T){
                this.interval = setInterval(() => {   // 倒计时
                    if(T < 1000){
                        clearInterval(this.interval);
                        this.getData();
                    }
                    this.countDown(T);
                    T -= 1000;
                }, 1000);
            },
            Welfare1(n){    // 福利一登录按钮
                if(this.start != 1){
                    this.popUp = 2;
                    return;
                }
                n == 1 ? this.toLogin() : n == 2 ? this.Jump('WIP', '/wxInvest') : n == 3 ? this.popUp = 3 : ''
            },
            welfareThree(n){    // 福利三登录按钮
                if(!this.loginStatus && (n == 1 || n == 2)){
                    this.toLogin();
                    return;
                }
                if(this.isRob == 1 && n == 2){
                    Toast("您已抢过升级券啦！")
                    return;
                };
                if(n == 2){
                    this.getAppData('/NovemberTwo/dealUserVipUp',(data) =>{
                        if(data.resCode){
                            this.popUp = 5;
                            this.result = data.resData.message;
                            this.vipStatus = data.resData.status
                        }
                    },{},0,1);
                };
            },
            exchange(){   // 福利一兑换按钮逻辑
                this.getAppData('/NovemberTwo/exchange',(data) =>{
                    if(data.resCode){
                        this.popUp = 4;
                    }
                },{},1,1);
            },
            toLogin(){   // 跳转到登录页面
                if (this.osType) {
                    this.PassValue('LG')
                }else{
                    this.$router.push({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });
                }
            },
            // 跳转到抽奖记录页面
            toDrawRecord(){
                if(this.loginStatus == 0){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                }else{
                    this.appRouter('/doubleEleven/meetingTwoDrawRecord')
                }
            },

            // 跳转到出借列表 this.Jump('WIP', '/wxInvest');
            // 跳转到积分商城列表 this.Jump('GoodsList', '/intGoodList');

            Jump(name, url){
                if (this.osType) {
                    this.PassValue(name)
                }else{
                    this.appRouter(url)
                }
            },
            luckDraw(){
                if(this.loginStatus == 0){
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
                    return;
                }
                if(this.Eleven == 2){
                    Toast("抽奖时间尚未开始！")
                    return;
                }
                if(this.redBanalce == 0){
                    return;
                };
                if(this.Eleven == 3){
                    return;
                }
                this.luckState = true;
                setTimeout(() => {
                    this.luckState = false;
                    this.getAppData('/NovemberTwo/dealUserDrawActivity',(data) =>{
                        if(data.resCode){
                            this.sphericalJump = true;
                            this.drawActivity = data.resData;
                            if(data.resData.goodsType == 0 || data.resData.goodsType == 1){
                                this.drawTips = '请在<em>【我的-我的红包】</em>中查看';
                            } else if(data.resData.goodsType == 2){
                                this.drawTips = '请在<em>【积分商城-积分明细】</em>中查看';
                            } else if(data.resData.goodsType == 3){
                                this.drawTips = '活动结束后15个工作日内由理财顾问联系发放！';
                            }
                            setTimeout(() => {
                                this.sphericalJump = false;
                                this.down = true;
                                setTimeout(() => {
                                    this.popUp = 6;
                                }, 1000);
                            }, 3000);
                        }
                    },{},1,1)
                }, 300);
            },
            backMoney(){
                if(~~this.totalYearMoney == 0){
                    this.totalYearMoney = '';
                }
                if(this.totalYearMoney.length > 9){
                    this.totalYearMoney = this.totalYearMoney.substring(0,9);
                }
                this.$nextTick(() => {
                // 数字和小数点
                    let value =  this.totalYearMoney.replace(/[^\d.]/g,"");
                    // 只能有一个小数点
                    value = value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
                    // 小数最多2位
                    this.totalYearMoney = value.replace(/([0-9]\.[0-9]{2})[0-9]*/, "$1")
              })
            },
            getMoney(){   // 年化计算器
                if(~~this.setYearMoney == 0){
                    this.setYearMoney = '';
                }
                if(this.setYearMoney.length > 9){
                    this.setYearMoney = this.setYearMoney.substring(0,9);
                }
                this.setYearMoney=this.setYearMoney.replace(/\D/g,"");
                this.setYearMoney=this.setYearMoney.replace('.','');

            },
            openPicker() {
                this.openDate = true;
                this.$refs.datepicker.open();
                setTimeout(() => {  
                    this.startDateTime = new Date('2018-11-09')
                }, 200);
            },
            handleConfirm(data){
                this.pickerValue = this.getDateStr(data)
                this.getMoneyList(this.pickerValue);
                this.openDate = false;
            },
            handelClose(data){
                this.openDate = false;
            },
            // 获取当天日期字符串
            getDateStr (date) {
                var year=date.getFullYear();
                var month=((date.getMonth()+1)<10?'0':'')+(date.getMonth()+1);
                var day=(date.getDate()<10?'0':'')+date.getDate();
                return year+'-'+month+'-'+day
            },
            countDown(val){   // 倒计时
				let t = Math.floor(val / 1000);  // 毫秒 => 秒
				let d = Math.floor(t / 86400);   // 天
				let h = Math.floor(t % 86400 / 3600)  // 时
				let m = Math.floor(t % 86400 % 3600 / 60)  // 分
				let s = t % 60;  // 秒
				this.times.day = d;
				this.times.hr = h < 10 ? '0' + h : h;
				this.times.min = m < 10 ? '0' + m : m;				
				this.times.sec = s < 10 ? '0' + s : s;
            },
            change(i){ // 头部选项卡
                let h,
                tab1 = document.getElementById('tab1'),
                tab2 = document.getElementById('tab2'),
                tab3 = document.getElementById('tab3');
                let DH = this.$refs.title.offsetHeight;
                i == 0 ? h = tab1.offsetTop : i == 1 ? h = tab2.offsetTop : i == 2 ? h = tab3.offsetTop : '';
                h = h - DH;
                document.body.scrollTop = h;
                document.documentElement.scrollTop = h;
                this.titleIndex = i;
            },
            menu(){
                let scroll = document.documentElement.scrollTop || document.body.scrollTop;
                scroll = scroll + 200;
                let tab2 = document.getElementById('tab2'),
                    tab3 = document.getElementById('tab3'),
                    bodyH = document.body.offsetHeight,
                    CH = document.documentElement.clientHeight;
                if(scroll < tab2.offsetTop){
                    this.titleIndex = 0;
                }else if (scroll < tab3.offsetTop) {
                    this.titleIndex = 1;
                }else {
                    this.titleIndex = 2;
                }
            },
            isMove(e) {
                e.preventDefault();
            },
            closeTouch:function(){
                document.body.addEventListener('touchmove', this.isMove, { passive:false});
            },
            openTouch:function(){
                document.body.removeEventListener('touchmove', this.isMove,  { passive:false});
            },
        },
        created: function() {
            this.PassValue('NavWhite_狂欢进行时 返现由你定');
            this.hasLogin ? this.loginStatus = 1 : this.loginStatus = 0;
            this.hasLogin ? this.btnOne = 0 : this.btnOne = 1;
            this.getData();
            
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1275237316&web_id=1275237316';
            script.language = 'JavaScript';
            document.body.appendChild(script);

            
            window.addEventListener('scroll', this.menu)
        },
        mounted: function() {
            
        },
        beforeDestroy() {
			clearInterval(this.tips);
            clearInterval(this.interval);
            window.removeEventListener('scroll', this.menu)
        },
        watch: {
            rebatesYears(val){
                if(val == 1){
                    this.setYearMoney = '';
                    this.selectValue = 30;
                } else if (val == 2){
                    this.totalYearMoney = '';
                }
            },
            '$route' () {
				if(window._czc) { // 友盟数据统计监听
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
            },
            'openDate'(val) {
                if (val) {
                    this.closeTouch()
                    document.body.setAttribute("class","bodychannel");
                } else {
                    this.openTouch()
                    document.body.removeAttribute("class","bodychannel");
                }
            },
        }
   } 
</script>

<style lang="scss" scoped>
    #meetingTwo{
        width: 10rem;
        height: 64.333333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/meetingTwo.png);
        background-size: 100%;
        .toMain{
            width: 1.4rem;
            height: 1.786667rem;
            position: fixed;
            right: 0;
            bottom: 3rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/main.png);
            background-size: 100%;
            z-index: 99;
        }
        .title{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 1.706667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/titleBtn.png);
            background-size: 100% 5.16rem;
            background-position: 0 0;
            padding-left: 1.813333rem;
            .item{
                float: left;
                width: 2.44rem;
                height: 1.013333rem;
                margin-top: .213333rem;
                margin-right: .24rem;
            }
        }
        .title.tab1{
            background-position: 0 -1.706667rem;
        }
        .title.tab2{
            background-position: 0 -3.44rem;
        }
        #tab1{
            width: 100%;
            height: 23.12rem;
            position: relative;
            .dataBox{
                position: absolute;
                width: 68%;
                height: .52rem;
                font-size: .426667rem;
                font-family: DIN-Bold;
                color: #EDC887;
                text-align: center;
                top: 11.3rem;
                left: 16%;
                .leftData, .rightData{
                    width: 2.95rem;
                }
            }
            .loginBtn{
                width: 2.84rem;
                height: .786667rem;
                position: absolute;
                left: 3.586667rem;
                top: 12.893333rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/loginBtn.png);
                background-size: 100% 5.226667rem;
                background-position: 0 0;
            }
            .loginBtn.str1{  
                background-position: 0 0;
            }
            .loginBtn.str2{
                background-position: 0 -.893333rem;
            }
            .loginBtn.str3{
                background-position: 0 -1.786667rem;
            }
            .loginBtn.str4{
                background-position: 0 -2.68rem;
            }
            .frequency{
                width: 100%;
                text-align: center;
                height: .8rem;
                line-height: .4rem;
                font-family: PingFang-SC-Medium;
                font-size: .293333rem;
                color: #FFDF9C;
                position: absolute;
                left: 0;
                top: 13.88rem;
            }
            .frequency.active{
                padding-top: .2rem;
            }
            .calculatorBtn{
                width: 1.28rem;
                height: .85rem;
                position: absolute;
                top: 13.95rem;
                left: 7.626667rem;
            }
        }
        #tab2{
            width: 100%;
            height: 20.733333rem;
            position: relative;
            .Doubling{
                width: 100%;
                height: 2rem;
                position: absolute;
                top: 1.84rem;
                left: 0;
                .icon{
                    position: absolute;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/double.png);
                    background-size: 100%;
                    width: 1rem;
                    height: 1rem;
                }
                .label1, .label3{
                    width: .8rem;
                    height: .8rem;
                    top: .853333rem;
                    left: 2.64rem;
                }
                .label2{
                    left: 5.453333rem;
                    top: 0;
                }
                .label3{
                    left: 8.306667rem;
                }
            }
            .invest{
                font-family: PingFang-SC-Bold;
                font-size: .32rem;
                color: #646464;
                text-align: center;
                line-height: .72rem;
                width: 6.613333rem;
                height: .72rem;
                position: absolute;
                left: 1.693333rem;
                top: 8.35rem;
                em{
                    font-family: DIN-Bold;
                    font-size: .4rem;
                    color: #E03940;
                }
                i{
                    font-size: .293333rem;
                    color: #282828; 
                }
            }
            .loginBtn{
                width: 2.84rem;
                height: .786667rem;
                position: absolute;
                left: 3.586667rem;
                top: 9.26rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/loginBtn.png);
                background-size: 100% 5.226667rem;
                background-position: 0 -3.573333rem;
            }
            .loginBtn.isLongin{
                background-position: 0 -4.453333rem;
            }
            .dataTime{
                width: 2rem;
                height: .4rem;
                font-size: .293333rem;
                color: #E03940;
                position: absolute;
                top: 13.933333rem;
                right: .5rem;
                line-height: .4rem;
            }
            .drawList{
                width: 6.2rem;
                height: 2.48rem;
                position: absolute;
                top: 15.933333rem;
                left: 2.5rem;
                text-align: center;
                .list{
                    height: .613333rem;
                    width: 100%;
                    line-height: .613333rem;
                    margin-bottom: .32rem;
                    p{
                        width: 55%;
                        font-size: .346667rem;
                        color: #FFFFFF;
                    }
                    p.fr{
                        width: 45%;
                    }
                }
            }
        }
        #tab3{
            width: 100%;
            height: 20.48rem;
            position: relative;
            overflow: hidden;
            // 倒计时样式
            .time_box{
                font-family: PingFang-SC-Heavy;
                position: absolute;
                width: 5.306667rem;
                height: .72rem;
                line-height: .72rem;
                left: 2.253333rem;
                top: 2.45rem;
                text-align: center;
                font-size: .346667rem;
                color: #fff;
                overflow: hidden;
                .content{
                    overflow: hidden;
                    display: inline-block;
                    width: auto;
                    height: 100%;
                    p{
                        height: 100%;
                        float: left;
                    }
                    .time_text{
                        color: #F9474F;
                        width: .48rem;
                    }
                }
            }
            .welfare3btn{
                width: 4.16rem;
                height: .946667rem;
                position: absolute;
                left: 2.853333rem;
                top: 6.28rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/strBtn.png);
                background-size: 100% 4.12rem;
                background-position: 0 0;
                padding-top: .52rem;
                p{
                    width: 100%;
                    font-size: .266667rem;
                    color: #FFFFFF;
                    line-height: .373333rem;
                    text-align: center;
                }
            }
            .welfare3btn.str1{  
                background-position: 0 0;
            }
            .welfare3btn.str2{  
                background-position: 0 -1.066667rem;
            }
            .welfare3btn.str3{  
                background-position: 0 -2.12rem;
            }
            .welfare3btn.str4{  
                background-position: 0 -3.186667rem;
            }
            .luckBg{
                width: 8.586667rem;
                height: 8.2rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/luckBg.png);
                background-size: 100%;
                position: absolute;
                left: .386667rem;
                top: 8rem;
                z-index: 5;
            }
            .yuan{
                width: 7.76rem;
                height: 7.76rem;
                border-radius: 50%;
                position: absolute;
                left: 1.2rem;
                top: 8rem;
                z-index: 4;
                .spherical{
                    width: 1.573333rem;
                    height: 1.573333rem;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
                .seat0{
                    top: 5.4rem;
                    left: 1.8rem;
                    z-index: 13;
                }
                .seat1{
                    top: 5.4rem;
                    left: 4.5rem;
                }
                .seat2{
                    top: 3.4rem;
                    left: 6.4rem;
                }
                .seat3{
                    top: 4.3rem;
                    left: 6.1rem;
                    z-index: 10;
                }
                .seat4{
                    top: 5.2rem;
                    left: 5.6rem;
                }
                .seat5{
                    top: 5.2rem;
                    left: 0.8rem;
                }
                .seat6{
                    top: 5rem;
                    left: 3.15rem;
                    z-index: 5;
                }
                .seat7{
                    top: 4.3rem;
                    left: 4.2rem;
                    z-index: 10;
                }
                .seat8{
                    top: 3.6rem;
                    left: 1.4rem;
                    z-index: 4;
                }
                .seat9{
                    top: 4.2rem;
                    left: 0.3rem;
                    z-index: 5;
                }
                .seat10{
                    top: 4.4rem;
                    left: 5.1rem;
                    z-index: 10;
                }
                .seat11{
                    top: 3.5rem;
                    left: 5.1rem;
                }
                .seat12{
                    top: 4.5rem;
                    left: 2rem;
                    z-index: 5;
                }
                .seat13{
                    top: 3.8rem;
                    left: 3.1rem;
                }
            }
            .redBanalce{
                width: 5.546667rem;
                height: .666667rem;
                padding-left: .266667rem;
                line-height: .666667rem;
                font-size: .32rem;
                color: #FFFFFF;
                position: absolute;
                left: 3.666667rem;
                top: 16.55rem;
            }
            .door{
                width: 2.56rem;
                height: 3.466667rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/door.png);
                background-size: 100%;
                position: absolute;
                left: .813333rem;
                top: 15.325rem;
                z-index: 3;
            }
            .luckDraw{
                background-size: 100% 100%!important;
                width: 1.573333rem;
                height: 1.573333rem;
                position: absolute;
                top: 15.325rem;
                left: 1.313333rem;
                z-index: 2;
            }
            .luckDraw.active{
                transition: top 1s;
                -webkit-transition: top 1s;
                top: 17.6rem;
            }
            .winningRecord{
                width: 1.773333rem;
                height: 1.3rem;
                position: absolute;
                left: 7.76rem;
                top: 18.2rem;
            }
            .luckBtn{
                width: 3.733333rem;
                height: 2.5rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/luckBtn.png);
                background-size: 100% 7.52rem;
                background-position: 0 0;
                position: absolute;
                left: 3.44rem;
                top: 17.5rem;
            }
            .luckBtn.click{
                background-position: 0 -2.45rem;
            }
            .luckBtn.over{
                background-position: 0 -5rem;
            }
        }  
        .ruleBtn{
            width: 1.426667rem;
            height: .746667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/ruleBtn.png)no-repeat;
            background-size: 100%;
            position: fixed;
            top: 1.733333rem;
            right: 0;
        } 
        .ruleBox{
            width: 8.44rem;
            height: 11.986667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/rule.png) no-repeat;
            background-size: 100%;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            .limit{
                width: 7.28rem;
                height: 8.3rem;
                margin-left: .37rem;
                margin-top: 1.5rem;
                border-radius: .146667rem;
                background: #FFFFFF;
                box-shadow: inset 0 1px 10px 0 #CB9C4D;
                overflow: hidden;
                overflow-y: auto;
                .center{
                    width: 100%;
                    // height: 14rem;
                    overflow: hidden;
                    border-radius: .146667rem;
                    font-family: PingFangSC-Regular;
                    padding: .466667rem .413333rem 0;
                    text-align: justify;
                    p{
                        font-size: .346667rem;
                        color: #666666;
                        line-height: .493333rem;
                        margin-bottom: .186667rem;
                        em{
                            font-family: DIN-Medium;
                            color: #E6503C;
                        }
                        i{
                          font-family: PingFang-SC-Bold;  
                          color: #E6503C;
                        }
                        a{
                            color: #3A8BFF;
                        }
                    }
                    p.IOS{
                        font-size: .293333rem;
                        color: #666;
                        text-align: center;
                    }
                }
            }
            .close{
                position: absolute;
                bottom: 0rem;
                width: 1rem;
                height: 1rem;
                left: 50%;
                margin-left: -.7rem;
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
            z-index: 9999999999;
        }
        .timeOver{
            width: 8.293333rem;
            height: 10.533333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/timeOver.png) no-repeat;
            background-size: 100%;
            .close{
                position: absolute;
                bottom: 6rem;
                width: 4rem;
                height: 1.3rem;
                left: 28%;;
            }
        }
        .exchangeBefore{
            width: 8.293333rem;
            height: 10.533333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/exchangeBefore.png) no-repeat;
            background-size: 100%;
            .confirm, .close{
                position: absolute;
                bottom: 5.9rem;
                width: 2.9rem;
                height: 1rem;
                left: 1.2rem;
            }
            .confirm{
                left: 4.4rem;
            }
        }
        .exchange{
            width: 8.293333rem;
            height: 10.533333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/exchange.png) no-repeat;
            background-size: 100%;
            .confirm{
                position: absolute;
                bottom: 5.9rem;
                width: 4rem;
                height: 1.1rem;
                left: 28%;;
            }
        }
        .upgrade{
            width: 9.76rem;
            height: 8.16rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/upgrade.png?v=1.0) no-repeat;
            background-size: 100%;
            text-align: center;
            .succ{
                width: 100%;
                position: absolute;
                top: 4.6rem;
                padding: 0 2rem;
                font-size: .533333rem;
                color: #666666;
                letter-spacing: 0.87px;
            }
            .tips{
                width: 4.9rem;
                position: absolute;
                top: 5.8rem;
                display: inline-block;
                font-size: .293333rem;
                color: #656565;
                letter-spacing: -0.33px;
                background: #ECECEC;
                left: 0;
                right: 0;
                margin: 0 auto;
                em{
                   color: #F9474F; 
                }
            }
            .confirm{
                position: absolute;
                bottom: .1rem;
                width: 5rem;
                height: 1.1rem;
                left: 24%;;
            }
        }
        .dealUserDrawActivity{
            width: 10rem;
            height: 10.666667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/doubleEleven/meetingTwo/myDraw.png) no-repeat;
            background-size: 100%;
            text-align: center;
            padding-top: 2.6rem;
            h3{
                height: .493333rem;
                line-height: .493333rem;
                font-size: .346667rem;
                color: #F52D00;
                padding: 0 2.5rem;
                margin-bottom: .35rem;
            }
            .iconBg{
                width: 2.266667rem;
                height: 2.266667rem;
                margin: 0 auto .133333rem;
            }
            .money{
                height: .413333rem;
                line-height: .413333rem;
                margin-bottom: .133333rem;
                font-family: DIN-Bold;
                font-size: .266667rem;
                color: #FF4B09;
            }
            .tips{
                font-size: .266667rem;
                color: #DC993E;
                line-height: .346667rem;
                width: 3.6rem;
                text-align: left;
                margin: 0 auto;
                em{
                    color: #F52D00;
                }
            }
            .confirm{
                position: absolute;
                bottom: 1.77rem;
                width: 4rem;
                height: 1.1rem;
                left: 30%;;
            }
        }
        .mint-popup{
            background: transparent;
        }
        .mint-datetime{
            background: #fff;
        }
        .CalculatorBox{
            width: 10rem;
            height: 6.346667rem;
            .tab{
                width: 100%;
                height: 1.2rem;
                .tabLeft, .tabRight{
                    width: 4.96rem;
                    background: #C4C3C3;
                    text-align: center;
                    line-height: 1.2rem;
                    border-radius: .16rem .16rem 0 0;
                    border-bottom: 1px solid #E5E5E5;
                    font-size: .426667rem;
                    color: #fff;
                }
                .tabLeft.active, .tabRight.active{
                    color: #313131;
                    background: #fff;
                }
            }
            .content{
                width: 100%;
                height: 5.146667rem;
                background: #fff;
                padding-top: .533333rem;
                .li{
                    padding: 0 0 0 .533333rem;
                    font-size:0.373333rem;
                    height:.8rem;
                    margin-bottom: .4rem;
                    .name{
                        line-height:0.8rem;
                        color:#333;
                    }
                    .input{
                        // margin-left: 0.266667rem;
                        height:0.8rem;
                        width:6.346667rem;
                        background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/inputBorder.png') no-repeat;
                        background-size: 100% 100%;
                    }

                }
                .li1{
                    .input{
                        height:0.8rem;
                        width:6.346667rem;
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
                    .name.bili{
                        font-family: PingFang-SC-Bold;
                        color: #333333;
                    }
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
                    .name{
                        font-family: PingFang-SC-Bold;
                        color: #333;
                    }
                    .name em{
                        letter-spacing: .12rem;
                    }
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
                    color:#999;
                    font-size:0.32rem;
                    line-height:0.533333rem;
                    text-align:center;;
                }
            }
        }
        .zIndex{
            z-index: 99!important;
            background-color: rgba(0, 0, 0, 0.7)!important;
        }
        .fixed{
            z-index: 1000;
            position: fixed;
            top:0;left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    }
</style>

<style>
 @import '../../../../style/eleven.css';
</style>