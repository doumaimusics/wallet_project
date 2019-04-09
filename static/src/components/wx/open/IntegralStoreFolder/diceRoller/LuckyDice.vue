<template>
    <div id="LuckyDice">
        <div v-title>幸运骰子</div>
        <div class="wrap" v-show="guide == 0">
            <div class="rulesBtn" @click="popUp = 1"></div>
            <div class="inviteBtn" @click="toShare"></div>
            <!-- 骰子 -->
            <div class="dice one">
                <img :src="'https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/dice'+ dice1 +'.png'" alt="">
            </div>
            <div class="dice two">
                <img :src="'https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/dice'+ dice2 +'.png'" alt="">
            </div>
            <div class="dice three">
                <img :src="'https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/dice'+ dice3 +'.png'" alt="">
            </div>
            <!-- 剩余次数 -->
            <div class="chance">{{diceData.count}}</div>
            <!-- 赔率 -->
            <div class="big" :class="[{active:multiple == 0}]" @click="multiple = 0">X{{bigData.odds}}倍</div>
            <div class="same" :class="[{active:multiple == 1}]" @click="multiple = 1">X{{sameData.odds}}倍</div>
            <div class="small" :class="[{active:multiple == 2}]" @click="multiple = 2">X{{smallData.odds}}倍</div>
            <!-- price -->
            <div class="scoreBtn score-300" :class="[{active:price == 300}]" @click="selectScore(300)"></div>
            <div class="scoreBtn score-500" :class="[{active:price == 500}]" @click="selectScore(500)"></div>
            <div class="scoreBtn score-1000" :class="[{active:price == 1000}]" @click="selectScore(1000)"></div>
            <!-- 买定离手 -->
            <div class="intEarnBtn" v-if="loginStatus && lack" @click="intEarnBtn"></div>
            <div v-else class="throwBtn" @click="playGame"></div>
            <!-- 我的积分 -->
            <div class="myScore">我的积分：
                <em v-if='loginStatus'>{{diceData.myScore}}</em>
                <em v-else class='look' @click="ToWxLogin"></em>
                <div class="integralBtn" @click="diceRecord">奖励记录</div>
            </div>
        </div>
        <!-- 新手指引 -->
        <div class="guide" :class="['step'+guide]" v-show="guide > 0" @click="guide==3?guide=0:guide=guide+1"></div>
        <!-- 规则弹框 -->
        <div class="rule_box" v-if="popUp==1">
            <div class="close_btn" @click="popUp = 0"></div>
            <div class="rule_center">
                <p>1、三颗骰子，4-10点为“小”，11-17点为“大”，三颗点数相同为“围”，用户选择一种开奖结果下注，如若开奖结果跟买定结果相同，即为中奖，则可获得相应倍数的积分奖励；</p>
                <p>例：小明下注【围】1000积分，下注获得骰子点数为【3】【3】【3】则小明中奖，获得6倍积分赔率：6000积分。</p>
                <p>2、每次下注消耗一定的积分，每个用户每天有8次机会，每天首次分享好友，可增加一次下注机会。</p>
                <p class="font-20">本活动在法律允许范围内最终解释权归E都市钱包所有，</p>
                <p class="font-18">如有疑问可致电官方客服电话:<a href="tel:400-135-3388">400-135-3388</a></p>
                <p class="font-18" v-if="osType == 'IOS'">本活动奖品与苹果公司无关</p>
            </div>
        </div>
        <!-- 点击下注按钮 3、下注机会用完 4、下注未压中时 5、下注压中时 -->
        <div class="bets"  v-if="popUp > 2">
            <div class="succ" v-if="popUp ==5">
                <p class="title">恭喜获得<em>{{result.reward}}积分</em></p>
                <p class="tips">下注【{{stake.type | typeOf}}】{{price}}积分，</p>
                <p class="tips">享x{{stake.odds}}赔率</p>
            </div>
            <div class="succ" v-else-if="popUp ==4">
                <p class="title">本次开奖为【{{result.result}}】</p>
                <p class="tips">您下注【{{stake.type | typeOf}}】{{price}}积分，</p>
                <p class="tips">未获得积分奖励！</p>
            </div>
            <div class="over" v-else-if="popUp ==3">今天下注机会已用完</div>
            <div class="closeBtn" @click="closeSucc"></div>
        </div>
        <!--点击分享的弹框-->
		<div :class="{layer:popUp == 2}" @click.stop="popUp = 0" v-if="popUp == 2" ></div>
        <!-- 遮罩 -->
		<div v-if="popUp" class="zIndex" v-layer></div>
    </div>
</template>

<script>
import wxShare from '../../../../../common/wx/wxShare';
export default {
    mixins:[wxShare],
    data() {
        return {
            dice1:6,
            dice2:6,
            dice3:6,
            multiple:1,   // 赔率选择
            price:500,      // 积分选择
            lack: true,     // 积分是否达标
            popUp:0,   // 弹窗 1、规则 2、引导图 3、下注机会用完 4、下注未压中时 5、下注压中时
            guide: 0,   // 新手引导  1、2、3、
            loginStatus: 0,     // 登陆状态
            diceData:{},
            bigData: [],   // 倍率为大的数据
            sameData: [],   // 倍率为围的数据
            smallData: [],   // 倍率为小的数据
            stake:{},   // 选中的倍率
            result:{},    // 开奖结果
            flag:true,    // 按钮快关
            shareObj: { //分享标题内容配置
                title: "这个游戏太太太好玩了，快来跟我一起玩！", //标题
                desc: "快来积分竞猜，以小博大，肾x在招手！>>", // 内容
                link: global.host + "LuckyDice", //链接
                imgUrl: "https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/shareIcon.png" //图片链接
            }
        }
    },
    filters:{
        typeOf(v) {
            return v == 1 ? '大' : v == 2 ? '围' : v == 0 ? '小' : "";
        }
    },
    methods: {
        toShare(){    //分享事件
            if(this.ToWxLogin()){
                return;
            };
            // this.diceData.isShare == 0    首次分享
            if(this.osType){
                this.isLogPassValue(this.appShare);
            } else {
                this.popUp = 2;
            };
        },

        toDownloadApp(){   // 去应用市场下载APP
            
        },

        getData(){  // 初始化接口
            this.getNotlogData('/dice/index',(data) =>{
                if(data.resCode){
                    let datas = data.resData;
                    this.diceData = datas;
                    this.loginStatus = datas.loginStatus;
                    if(datas.loginStatus && datas.isGuide == 0){ // 0：未引导，1：已引导
                        this.guide = 1;
                    };
                    datas.scDiceGames.map((v, i) => {
                        v.type == 0 ? this.smallData = v : v.type == 1 ? this.bigData = v : v.type == 2 ? this.sameData = v : '';    // 0 小，1 大 ，2 围
                    });
                    datas.myScore < this.price ? this.lack = true : this.lack = false;  // 判断积分是否够押注
                }
            },{},1)
        },
        
        playGame(){   // 开始游戏
            let that = this;
            if(this.ToWxLogin()){
                return;
            };
            if(this.diceData.count > 0){
                if(!this.flag){
                    return;
                }
                this.flag = false;
                // 骰子开始滚动
                let times;
                let num = 7;    // 图片序列号
                let time = 0;   // 循环的次数
                let T = [60,60,60];      // 保存动画开始到接口返回所用的时间骰子循环的次数
                let tt = function(){
                    time +=1;
                    for (var i=0;i<3;i++) {
                        num += 1;
                        num == 11 ? num = 7 : '';
                        i==0 ? that.dice1 = num : i==1 ? that.dice2 = num : i==2 ? that.dice3 = num : '' ;
                        time > T[0] ? that.dice3 = that.result.dice3 : '';
                        time > T[1] ? that.dice2 = that.result.dice2 : '';
                        time > T[2] ? that.dice1 = that.result.dice1 : '';
                    }
                    times=setTimeout(tt,100);
                }
                tt();

                this.multiple == 0 ? this.stake = this.bigData : this.multiple == 1 ? this.stake = this.sameData : this.multiple == 2 ? this.stake = this.smallData : '';
                this.getAppData('/dice/playGame',(data) =>{
                    if(data.resCode){
                        T = [time+29, time+24, time+19,]; 
                        this.result = data.resData;
                        setTimeout(()=>{
                            clearTimeout(times);
                            this.getData();
                            if(data.resData.isHit){ // 中奖
                                this.popUp = 5;
                            }else{  // 未中奖
                                this.popUp = 4;
                            };
                        },3500);
                    }else{
                        clearTimeout(times);
                    }
                },{id: this.stake.id, score: this.price},1)
            }else{  // 今天下注机会已用完
                this.popUp = 3;
            }
        },

        ToWxLogin(){   // 登录判断
            let flag = true;
            if(this.loginStatus == 0){
                if(this.$route.query.ui){
                    window.location="http://android.myapp.com/myapp/detail.htm?apkName=com.rd.chux&ADTAG=mobile";
                }else{
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}}); 
                }
                flag = true;
            } else {
                flag = false;
            }
            return flag;
        },

        selectScore(n){  // 下注积分选择
            this.price = n;
            this.diceData.myScore < n ? this.lack = true : this.lack = false;
        },

        intEarnBtn(){   // 赚取积分
            if(this.ToWxLogin()){
                return;
            };
            this.$router.push({path:'/intEarn',query:this.$route.query});
        },

        diceRecord(){   // 奖励记录
            if(this.ToWxLogin()){
                return;
            };
            this.$router.push({path:'/LuckyDice/diceRecord',query: this.$route.query})
        },

        closeSucc(){ // 关闭掷骰子结果弹框
            this.popUp = 0;
            this.flag = true;
            this.dice3 = this.dice2 = this.dice1 = 6;
            this.multiple = 1;
            this.price = 500;
        }
    },
    created: function() {
        this.getData();
        this.hasLogin ? this.loginStatus = 1 : this.loginStatus = 0;
        this.PassValue('NavWhite_幸运骰子');
        this.getWxShareData(this.shareObj); //分享调用   
    },
    mounted: function() {
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1276149238&web_id=1276149238'
        script.language = 'JavaScript'
        document.body.appendChild(script)
    },
    components: {

    },
    watch: {
        '$route'() {
            if (window._czc) {
                let location = window.location
                let contentUrl = location.pathname + location.hash
                let refererUrl = '/'
                window._czc.push(['_trackPageview', contentUrl, refererUrl])
            }
        },
        'shareResult' (val){
            if(val && this.diceData.isShare == 0){
                this.getAppData('/dice/dealShare',(data) =>{
                    if(data.resCode){
                        this.getData();
                    }
                },{},1)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    #LuckyDice{
        font-family:PingFangSC-Regular;
        .wrap{
            width: 10rem;
            height: 21.653333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/LuckyDice.jpg) no-repeat;
            background-size: 100% 100%;
            position: relative;
            top: 0;
            left: 0;
            .rulesBtn, .inviteBtn{
                width: .906667rem;
                height: 3.04rem;
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/ruleBtn.png) no-repeat;
                background-size: 100% 100%;
                position: absolute;
                top: 1.12rem;
            }
            .rulesBtn{
                left: .533333rem;
                animation: drift 1.3s ease-in-out alternate infinite;
				-webkit-animation: drift 1.3s ease-in-out alternate infinite;
            }
            .inviteBtn{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/shareBtn.png) no-repeat;
                background-size: 100% 100%;
                right: .533333rem;
                animation: drift 1.1s ease-in-out alternate infinite;
				-webkit-animation: drift 1.1s ease-in-out alternate infinite;
            }
            .dice{
                width: 1.866667rem;
                height: 1.666667rem; 
                position: absolute;
                top: 6.17rem;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .dice.one{
                left: 1.666667rem;
            }
            .dice.two{
                left: 4.066667rem;
            }
            .dice.three{
                left: 6.466667rem;
            }
            .chance{
                color: #f8e2c1;
                font-size: .493333rem;
                font-family:"微软雅黑";
                font-weight: bold;
                position: absolute;
                top: 9.96rem;
                left: 4.56rem;
            }
            .big, .same, .small{
                width: 2.28rem;
                height: 3.653333rem;
                position: absolute;
                text-align: center;
                color: #f7d793;
                font-size: .293333rem;
                font-family:"微软雅黑";
                padding-top: 2.43rem;
            }
            .big{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/big.png) no-repeat;
                background-size: 100% 100%;
                top: 11.6rem;
                left: 0.98rem;
                animation: drift 1.3s ease-in-out alternate infinite;
				-webkit-animation: drift 1.3s ease-in-out alternate infinite;
            }
            .same{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/same.png) no-repeat;
                background-size: 100% 100%;
                top: 11.46rem;
                left: 3.88rem;
                animation: drift 1.3s ease-in-out alternate infinite;
				-webkit-animation: drift 1.3s ease-in-out alternate infinite;
            }
            .small{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/small.png) no-repeat;
                background-size: 100% 100%;
                top: 11.25rem;
                left: 6.71rem;
                animation: drift 1.3s ease-in-out alternate infinite;
				-webkit-animation: drift 1.3s ease-in-out alternate infinite;
            }
            .big.active{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/bigActive.png) no-repeat;
                background-size: 100% 100%;
                top: 11.6rem;
                left: 0.98rem;
                padding-top: 2.93rem;
            }
            .same.active{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/sameActive.png) no-repeat;
                background-size: 100% 100%;
                top: 11.46rem;
                left: 3.88rem;
                padding-top: 2.93rem;
            }
            .small.active{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/smallActive.png) no-repeat;
                background-size: 100% 100%;
                top: 11.25rem;
                left: 6.71rem;
                padding-top: 2.93rem;
            }
            .scoreBtn{
                width: 1.586667rem;
                height: 1.586667rem;
                position: absolute;
                top: 16rem;
            }
            .score-300{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/300.png) no-repeat;
                background-size: 100% 100%;
                left: .866667rem;
            }
            .score-500{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/500.png) no-repeat;
                background-size: 100% 100%;
                left: 2.64rem;
            }
            .score-1000{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/1000.png) no-repeat;
                background-size: 100% 100%;
                left: 4.413333rem;
            }
            .score-300.active{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/300Active.png) no-repeat;
                background-size: 100% 100%;
            }
            .score-500.active{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/500Active.png) no-repeat;
                background-size: 100% 100%;
            }
            .score-1000.active{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/1000Active.png) no-repeat;
                background-size: 100% 100%;
            }
            .throwBtn, .intEarnBtn{
                width: 2.88rem;
                height: 1.253333rem;
                animation: 2s rowup linear infinite normal;
                position: absolute;
                top: 16.4rem;
                right: 1rem;
            }
            .throwBtn{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/throwBtn.png) no-repeat;
                background-size: 100% 100%;
            }
            .intEarnBtn{
                background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/intEarnBtn.png) no-repeat;
                background-size: 100% 100%;
            }
            .myScore{
                width: 100%;
                font-size: .346667rem;
                padding: 0 1.2rem;
                position: absolute;
                color: #caa16c;
                top: 18.4rem;
                .look{
                    width: 1.24rem;
                    height: .453333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/look.png)no-repeat;
                    background-size: 100% 100%;
                    display: inline-block;
                    vertical-align: bottom;
                }
                .integralBtn{
                    float: right;
                    text-decoration: underline;
                }
            }
        }
        .rule_box{
            width: 7.733333rem;
            height: 10.666667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/ruleBox.png) no-repeat;
            background-size: 100% 100%;
            position:fixed;
            top:0;left: 0;
            right: 0;bottom: 0;
            margin: auto;
            z-index: 100;
            padding: 2.45rem 1.35rem 0;
            .rule_center{
                width: 100%;
                position: relative;
                p{
                    font-size: .293333rem;
                    color: #2d0a00;
                    line-height: .453333rem;
                    text-align: justify;
                    a{
                        color: #0071e4;
                    }
                }
                .font-20{
                    font-size: .266667rem;
                }
                .font-18{
                   font-size: .24rem; 
                }
            }
            .close_btn{
                width: 1rem;
                height: 1.1rem;
                position: absolute;
                top: 0rem;
                right: 0rem;
                margin: auto;
            }
        }
        .bets{
            width: 7.733333rem;
            height: 6.466667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/success.png) no-repeat;
            background-size: 100% 100%;
            position:fixed;
            top:0;left: 0;
            right: 0;bottom: 0;
            margin: auto;
            z-index: 100;
            font-family:"微软雅黑";
            font-weight: bold;
            color: #6c351a;
            text-align: center;
            .over{
                font-size: .506667rem;
                margin-top: 2.4rem;
            }
            .succ{
                font-size: .506667rem;
                margin-top: 1.7rem;
                .title{
                    margin-bottom: .1rem;
                    em{
                        font-weight: bold;
                        color: #a9141c;
                    }
                }
                .tips{
                    font-size: .373333rem;
                    font-weight: initial;
                }
            }
            .closeBtn{
                position: absolute;
                top: 4.2rem;
                left: 50%;
                width: 2.6rem;
                height: 1rem;
                margin-left: -1.3rem;
                z-index: 100;
            }
        }
        .layer {
            width: 10rem;
            height: 5.44rem;
            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/shareBg.png) no-repeat;
            background-size: cover;
            z-index: 100;
            position: fixed;
            top:0;left: 0;
		}
        .zIndex{
            z-index: 99!important;
        }
        .guide{
            position: fixed;
            top:0;left: 0;
            right: 0;bottom: 0;
            margin: auto;
            z-index: 100000;
            background: url(https://aliyunsso.edspay.com/web/wx/integralStroe/luckyDice/guide.jpg) no-repeat;
            background-size: 30rem 21.653333rem;
        }
        .step1{
            background-position: 0 bottom;
        }
        .step2{
            background-position: -10rem bottom;
        }
        .step3{
            background-position: -20rem bottom;
        }
    }

    @-webkit-keyframes drift {
        0% {
            -webkit-transform: rotate(2deg);
            -webkit-transform-origin: top center;
        }
        100% {
            -webkit-transform: rotate(-3deg);
            -webkit-transform-origin: top center;
        }
	}
    @keyframes drift {
        0% {
            transform: rotate(2deg);
            transform-origin: top center;
        }
        100% {
            transform: rotate(-3deg);
            transform-origin: top center;
        }
	}
    @keyframes rowup{
        0% {
            transform: scale(.85);
        }
        50% {
            transform: scale(1);
        }
        100% {
            transform: scale(.85);
        }
    }
</style>
