<template>
    <div id="VIPActivity">
        <div v-title class="pageTitle">出海寻宝</div>
        <div ref="seaContent" id="seaContent" class="seaContent">
            <div id="eastSeaBox" ref="eastSeaBox" class="eastSeaBox">
                <east-sea v-if="hasGetUserData && userData.currentSea == 1" :showQuantTips="showQuantTips" :tipTextList="tipTextList" :avatarPicPath="avatarPicPath" :userData="userData" :pageHeight="pageHeight" :seaData="seaData" ref="east"></east-sea>
                <south-sea v-else-if="hasGetUserData && userData.currentSea == 2" :showQuantTips="showQuantTips" :tipTextList="tipTextList" :avatarPicPath="avatarPicPath" :userData="userData" :pageHeight="pageHeight" :seaData="seaData" ref="south"></south-sea>
                <west-sea v-else-if="hasGetUserData && userData.currentSea == 3" :showQuantTips="showQuantTips" :tipTextList="tipTextList" :avatarPicPath="avatarPicPath" :userData="userData" :pageHeight="pageHeight" :seaData="seaData" ref="west"></west-sea>
                <north-sea v-else-if="hasGetUserData && userData.currentSea == 4" :showQuantTips="showQuantTips" :tipTextList="tipTextList" :avatarPicPath="avatarPicPath" :userData="userData" :pageHeight="pageHeight" :seaData="seaData" :getUserData="getUserData" ref="north"></north-sea>
            </div>
        </div>
        <div v-if="hasGetUserData" ref="seaBottom" class="seaBottom">
            <div :class="{leftBox:showLeft}" class="rightBtns">
                <div @click="clickRight('/vip/treasureRult',{},'规则按钮')" class="list rule"></div>
                <div @click="clickRight('/vip/seaRankingList',{},'排行榜按钮')" class="list top10"></div>
                <div @click="clickRight('/vip/myPrecious',{},'我的宝藏按钮')" class="list myPrecious"></div>
                <div @click="clickRight('/vip/shareGift',{userName:userName,sailSum:userData.sailSum + seaData.lastLand*48000,exchangeCoin:exchangeCoin + canCoin,_activityId:_activityId},'分享有礼按钮')" class="list myPrecious"></div>
                <div @click="clickRight('/vip/recruitSeaman',{userName:userName,sailSum:userData.sailSum + seaData.lastLand*48000,exchangeCoin:exchangeCoin + canCoin,_activityId:_activityId},'招募船员按钮')" class="list myPrecious"></div>
                <div @click="showLeft = false" class="closeBtn"></div>
            </div>
            <div v-if="!showLeft" @click="showLeft = true" class="toLeft"></div>
            <div class="bottomContent">
                <div @click="toShowShare" class="boatBox">
                    <div v-if="showShare" @click.stop="toShare" class="boatTip">{{tipTextList[randomNum]}}<span>点击分享</span></div>
                </div>
                <div class="text"><div :class="{'light-dong':showLight}" class="light"><img src="https://aliyunsso.edspay.com/web/wx/vip/treasure2/indexCoin.png" alt=""></div>可用海盗币：<span><span id="canCoin">{{canCoin | returnFloat}}</span>元</span><div @click="toWxUrl('/vip/exchangeRed')" class="btn"></div></div>
                <div class="quants clear">
                    <div 
                        v-for="(item,index) in quantData" 
                        :class="{advanced:item.createType == 2}"
                        @click="useQuant(item.id,item.createType,index)"
                        class="quantslist li1 fl">
                        <div v-if="countDown[index].last > 0" :class="{produceBG:waitNum != index}" class="produce">{{waitNum == index ? '生成中':''}}</div>
                        <div v-if="countDown[index].last > 0 && countDown[index].parting >= 0" :id="'count'+(index+1)" :class="{countBg:waitNum == index}" class="count"></div>
                        <div v-if="countDown[index].last > 0 && (waitNum == index)" class="quantImg">{{countDown[index].last | countDownTime(1)}}</div>
                        <div @click="toLock(index)" v-if="showQuantTips[index]" :class="'quantTip quantTip'+index">亲，你还没有解锁新海域哦！<span>点我去解锁</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showHeightQuant" v-layer class="heightQuant">
            <div class="content">
                <div @click="toApp('WIP','/wxInvest');" class="invetBtn"></div>
                <div @click="showHeightQuant = false" class="btn"></div>
            </div>
        </div>
        <div v-if='(hasGetUserData && openFlag == 0) || !hasLogin' v-layer class="firstBox firstBoxImg">
            <div v-if="showStartImg" id="startImg" class="imgBox">
                <div @click="hideImgBox(10)" class="hideImg"></div>
                <ul>
                    <li>
                        <img id="imgBox1" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/startImg1.png" alt="">
                    </li>
                    <li>
                        <img id="imgBox2" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/startImg2.png" alt="">
                    </li>
                    <li>
                        <img id="imgBox3" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/startImg3.png" alt="">
                    </li>
                    <li>
                        <img id="imgBox4" src="https://aliyunsso.edspay.com/web/wx/vip/vipActivity/startImg4.png" alt="">
                    </li>
                </ul>
            </div>
            <div v-if="showActivity" @click="intoSea" class="btn"></div>
        </div>
        <div v-if="!showActivity" @click="stopTips" v-layer class="stopActivity"></div>
        <gesture-guidance v-if="showGesture.showThis && openFlag == 1" :showLeft="showLeft" :showGesture="showGesture" :openFlag="openFlag" @changeLeft="closeLeftBox($event)"></gesture-guidance>
        <!-- 分享蒙层 -->
        <div v-if="showShareLayer" @click="showShareLayer = false" v-layer class="shareLayer"></div>

    </div>
</template>

<script>
    import eastSea from './Sea/eastSea.vue';
    import southSea from './Sea/southSea.vue';
    import westSea from './Sea/westSea.vue';
    import northSea from './Sea/northSea.vue';
    import gestureGuidance from './Sea/gesture.vue';//手势引导
    import wxShare from '../../../../../common/wx/wxShare';
    import jiami from 'js-base64';
    export default{
        mixins:[wxShare],
    	data(){
    		return{
                showActivity:true,
                showActivityTips:false,
                showTipsText:[false,false,false,false],
                currentSea:0,
                imgRandom:0,
                avatarPicPath:'',
                pageHeight:0,//页面高度
                openFlag:0,
                waitNum:3,
                boxHeight:0,
                showHeightQuant:false,//高级船桨弹框
                showStartImg:true,
                timer:[null,null,null],
                hasGetUserData:false,//是否获取用户信息
                quantData:[],//船桨信息
                userData:[],//用户基本信息
                tipTextList:[],//提示语数组
                showQuantTips:[false,false,false],
                canExchange:0,
                canCoin:0,
                seaTerminus:[0,5000,15000,30000,48000],//每个海域的终点
                firstUseQuant:false,//第一次使用船桨
                countDown:[//三个船桨倒计时数据
                    {
                        last:10000,
                        parting:80
                    },
                    {
                        last:4000,
                        parting:0
                    },
                    {
                        last:800,
                        parting:0
                    } 
                ],
                //treasure2
                useQuantFlag:true,
                seaData:{
                    seaLife:0,
                    lastLand:0,//   是否到达最后一个岛屿
                    redSize:0, //海皇红包
                },
                showGesture:{
                    showThis:false
                },
                showLeft:false,//展示右侧列表
                exchangeCoin:'',//获取金额
                randomNum:0,
                showShare:false,
                showShareLayer: false,
                shareObj:{
                    title: "划船还能赚钱？每日最高可兑55元现金！", //标题
                    desc: "【E都市钱包】祝您猪年快乐，诸事顺利，去赚钱>>", //内容
                    link: global.host + "vip/treasureHunt", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                },
                userId:'',
                _activityId:0,
                showLight:false,
    		}
    	},
    	methods:{
            clickRight(urlData,queryData,text){
                window._czc.push(['_trackPageview', '出海寻宝', text]);
                this.appRouter(urlData,queryData);
            },
            toShowShare(){
                this.randomNum = this.getRandom(0,this.tipTextList.length);//获取随机数
                this.showShare = !this.showShare;
            },
            closeLeftBox(showLeft){//手势 打开右侧开关
                this.showLeft = showLeft;
            },
            setShareData(){//设置分享文案
                this.appShare = '1';
                this.shareObj.link = global.host+'vip/treasureHunt?sailSum=' + (this.userData.sailSum + this.seaData.lastLand*48000) + '&exchangeCoin=' + (this.exchangeCoin + this.canCoin) + '&userName=' + Base64.encode(this.userName);
                this.getWxShareData(this.shareObj);
            },
            stopTips(){//显示活动暂停窗口
                MessageBox.alert('亲，活动已经结束啦!', '提示', {
                    confirmButtonClass:'confirmButtonClass'
                })
            },
            getRandom(start,end){//获取随机数
                var length = end - start;
                var num = parseInt(Math.random() * (length) + start);
                return num;
            },
            toShare(){
                if(this.osType){
                    this.PassValue(this.appShare);
                }else{
                    this.showShareLayer = true;
                }
                setTimeout(()=>{
                    this.showShare = false;
                },60)
            },
            _getActivityTime(activityId){// 获取活动时间状态
                this.notLogPost('/activity/two/getActivityTime',data => {
                    if(data.resCode){
                        this._activetyTime = data.resData;
                        this._activityId = data.resData.activityId;
                    }
                },{activityId:activityId})
            },
            stopMove(e){//设置弹框样式问题
                e.preventDefault();
            },
            heightQuant(){
                this.showHeightQuant = true;
                
            },
            intoSea(){//立即开启
                if(!this.hasLogin){
                    if(this.osType){
                        this.PassValue('LG');
                    }else{
                        this.$router.push({path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                    }
                    return;
                }
                this.openFlag = 1;
            },
            setScrollTop(value){
                document.body.scrollTop = value;
                document.documentElement.scrollTop = value;
            },
            toLock(index){//到达顶部
                setTimeout(()=>{
                    this.$set(this.showQuantTips,index,false);

                },50)
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                window.pageYOffset = 0;
            },
            useSeaQuant(refName,quantId,createType){//调用使用船桨的接口执行动画 (type=1普通船桨 2使用高级船桨滑行200米)
                var timeOut = null;
                this.showLight = false;
                clearTimeout(timeOut)
                this.getAppData('/sailSea/usePaddles',(data)=>{
                    if(data.resCode){
                        this.seaData.redSize = data.resData.redSize;
                        this.quantData = data.resData.noUseQuantList;//船桨信息
                        this.seaData.seaLife = data.resData.seaLife;//获取生物类型
                        this.canCoin = data.resData.canCoin;
                        
                        if(createType == 1){
                            this.$refs[refName].rowing(createType);
                            this.setQuantTime();
                            this.canExchange += 100;
                        }else{
                            this.$refs[refName].rowing(createType);
                            this.setQuantTime();
                            if(this.userData.sailSum == (this.seaTerminus[this.userData.currentSea]-100)){
                                this.canExchange += 100;
                            }else{
                                this.canExchange += 200;
                            }
                        }
                        timeOut = setTimeout(()=>{
                            setTimeout(()=>{
                                this.showLight = true;
                                this.CountUp('canCoin',this.canCoin);
                                setTimeout(()=>{
                                    this.showLight = false;
                                },2100)
                            },this.$refs.east.distance*2100)

                        },(this.seaData.seaLife ? 1000:100));
                    }
                },{id:quantId})
            },
            setPageTop(index){//设置页面到顶部
                for(var i=0;i<3;i++){
                    if(this.showQuantTips[i] == true){
                        return;
                    }
                }
                if(this.userData.currentSea == 4){
                    this.$north.showLayer.showLastIslet = true;
                }else{
                    this.$set(this.showQuantTips,index,true);
                }
                
            },
            useQuant(quantId,createType,index){//判断海域 使用船桨
                this.firstUseQuant = true;
                if(!this.useQuantFlag){//防止过快点击
                    return;
                }
                switch(this.userData.currentSea){
                    case 1:
                        if(this.userData.sailSum >= 5000){
                            this.setPageTop(index);
                            return;
                        }
                        this.useSeaQuant('east',quantId,createType);
                        break;
                    case 2:
                        if(this.userData.sailSum >= 15000){
                            this.setPageTop(index);
                            return;
                        }
                        this.useSeaQuant('south',quantId,createType);
                        break;
                    case 3:
                        if(this.userData.sailSum >= 30000){
                            this.setPageTop(index);
                            return;
                        }
                        this.useSeaQuant('west',quantId,createType);
                        break;
                    case 4:
                        if(this.userData.sailSum >= 48000){
                            this.setPageTop(index);
                            return;
                        }
                        this.useSeaQuant('north',quantId,createType);
                        break;
                }
            },
            getUserData(){//获取初始化数据
                if(!this.hasLogin){
                    return;
                }
                this.getAppData('/sailSea/openSail',(data) =>{
                    if(data.resCode){
                        this.hasGetUserData = true;

                        this.exchangeCoin = data.resData.exchangeCoin;
                        this.userName = data.resData.userName;
                        this.userId = data.resData.userId;
                        if(!data.resData.handGuide){
                            this.showGesture.showThis = true;
                        }

                        this.openFlag = data.resData.openFlag;
                        this.avatarPicPath = data.resData.avatarPicPath;
                        this.avatarPicPath = this.avatarPicPath ? this.avatarPicPath:'https://aliyunsso.edspay.com/web/wx/account/head.png';
                        this.quantData = data.resData.noUserQuant;
                        this.userData = data.resData.sailUser;
                        this.tipTextList =  data.resData.words;
                        this.canExchange = data.resData.sailUser.canExchange;
                        this.canCoin = data.resData.sailUser.canCoin;
                        this.seaData.lastLand = data.resData.lastLand; //   是否到达最后一个岛屿 0 未到达 1已到达

                        this.setQuantTime();
                        this.setShareData();//设置分享链接

                        this.randomNum = this.getRandom(0,this.tipTextList.length);//获取随机数
                    }
                },{})
            },
            setQuantTime(){ //设置倒计时
                var sunTime = 0;
                this.waitNum = 3;
                var firstQuant = true;//获取第一个倒计时
                for(var i=0;i<3;i++){
                    // this.quantslist[i].showTips = false;//添加控制船桨提示语
                    sunTime = this.quantData[i].longCanUseTime - this.quantData[i].longStartTime;
                    this.$set(this.countDown,i,{last:this.quantData[i].countDownTime,parting: (sunTime/1000 - this.quantData[i].countDownTime)});
                    if(this.quantData[i].countDownTime > 0){
                        if(firstQuant){
                            this.setCountDown(i);
                            firstQuant = false;
                        }
                        this.waitNum--;
                    }
                }
            },
            setPie(idName,pieData){//生成圆环
                var that = this;
                var line = echarts.init(document.getElementById(idName));
                var option = {
                    series: [
                        {
                            name:'圆环',
                            type:'pie',
                            radius: ['90%', '100%'],
                            color:['#fff','#00A8FF'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                            },
                            silent:true,
                            animation:false,

                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:pieData
                        }
                    ]
                };
                line.setOption(option);
            },
            setCountDown(index){
                clearInterval(this.timer[index]);
                this.timer[index] = setInterval(() =>{
                    this.countDown[index].last--;
                    this.countDown[index].parting++;
                    this.$set(this.countDown,index,{last:this.countDown[index].last,parting:this.countDown[index].parting});
                    if(this.countDown[index].last%2 == 0){
                        this.setPie('count'+(index+1),[{value:this.countDown[index].last},{value:this.countDown[index].parting}]);
                    }
                    if(this.countDown[index].last <= 0 || this.countDown[index].parting <= 0){
                        clearInterval(this.timer[index]);
                        this.getAppData('/sailSea/getQuants',(data)=>{
                            this.quantData = data.resData.noUserQuant;
                            this.setQuantTime();
                        },{})
                    }
                },1000)
            },
            boating(){
                this.$refs.esat.rowing(); // 方法2
            },
            getRandom(start,end){
                var length = end - start;
                var num = parseInt(Math.random() * (length) + start);
                return num;
            },
            hideImgBox(timeNum){
                setTimeout(()=>{
                    if((this.hasGetUserData && this.openFlag == 0) || !this.hasLogin){
                        $('#startImg').animate({opacity:0}, 600,()=>{
                            this.showStartImg = false;
                        })
                    }
                },timeNum)
            },
            CountUp(id, num){   // 数字滚动
                this.$nextTick(() => {
                    let demo = new CountUp(id, 0, num, 2, 1.5, this.options) // id qish
                    if (!demo.error) {
                        demo.start();
                    } else {
                        console.error(demo.error);
                    }
                })
            },
        },
        components:{
            eastSea,
            southSea,
            westSea,
            northSea,
            gestureGuidance
        },
        created(){
            this.imgRandom = this.getRandom(0,50);

        },
        mounted(){
            this.PassValue('NavWhite_出海寻宝');
            this.getUserData();

            this.getNotlogData('/sailSea/switch',(data)=>{
                if(data.resData.sailSwitch === 0){
                    this.showActivity = false;
                    MessageBox.alert('亲，活动已经结束啦!', '提示', {
                        confirmButtonClass:'confirmButtonClass'
                    })
                }else{
                    this.showActivity = true;
                }
            },{})

            this.pageHeight = document.documentElement.clientHeight;
            var seaConHeight = this.$refs.seaContent.clientHeight;


            setTimeout(()=>{
                document.body.scrollTop = (seaConHeight);
                document.documentElement.scrollTop =(seaConHeight);
                window.pageYOffset =(seaConHeight);
            },100)

            //启动动画
            setTimeout(()=>{ $('#imgBox1').animate({opacity:1}, 800) },800);
            setTimeout(()=>{ $('#imgBox2').animate({opacity:1}, 800) },2300);
            setTimeout(()=>{ $('#imgBox3').animate({opacity:1}, 800) },3600);
            setTimeout(()=>{ $('#imgBox4').animate({opacity:1}, 800) },4800);

            this.hideImgBox(8000);

            //treasure2
            this._getActivityTime('activity_vip_sail');

            // 数据统计
            const script = document.createElement('script');
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274228213&web_id=1274228213';
            script.language = 'JavaScript';
            document.body.appendChild(script);

        },
        watch: {
            shareResult(val){
                if(val){
                    this.shareSuccess(val, this._activityId, (data) => {
                        this.getAppData('/sail/share',(_data)=>{//分享成功调用接口
                            if(_data.resCode){

                            }
                        },{})
                    })
                }
            }
        },
        destroyed(){
            for(var i=0;i<3;i++){
                clearInterval(this.timer[i]);
            }
        }
    }
</script>

<style lang="scss">
    body,html{
        height:100%;
    }
</style>

<style lang="scss" scoped>
    #VIPActivity{
        font-family: PingFangSC-Regular;
        .stopActivity{
            background: rgba(0,0,0,.7)!important;
        }
        .shareLayer{
            background: rgba(0,0,0,.5) url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/shareLayer.png') top right no-repeat!important;
            background-size:100% 11.48rem!important;
        }
        .heightQuant{
            padding-top: 4.0rem;
            .content{
                height:8.88rem;
                width:7.253333rem;
                background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/heightQuant.png') no-repeat;
                background-size:100% 100%;
                margin:0 auto;
                position: relative;
                padding-top: 5.6rem;
                .invetBtn{
                    height:1.333333rem;
                    width:4.0rem;
                    margin:0 auto;
                }
                .btn{
                    position: absolute;
                    bottom:0;
                    left:50%;
                    margin-left: -0.666667rem;
                    height:1.333333rem;
                    width:1.333333rem;
                }
            }

        }
        .firstBox{
            color:#fff;
            text-align: center;
            line-height:6.666667rem;
            position: relative;
            .imgBox{
                width:100%;
                height:100%;
                background: #fff url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/start1.png') no-repeat;
                background-size:100%;
                position: relative;
                .hideImg{
                    position: absolute;
                    top:0.4rem;
                    right:0.4rem;
                    height:0.8rem;
                    width:1.813333rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/hideImg.png') no-repeat;
                    background-size:100% 100%;
                }
                ul{
                    padding-top: 8.0rem;
                    li{
                        width:100%;
                        height:0.666667rem;
                        margin-bottom: 0.133333rem;
                        img{
                            height:100%;
                            width:100%;
                            opacity:0;
                        }
                    }
                    li:nth-child(2){
                        margin-bottom: 0.4rem;
                    }
                }
            }
            img{
                display: block;
                width:100%;
            }
            .btn{
                position: absolute;
                top:11.666667rem;
                left:50%;
                margin-left: -2.5rem;
                height:1.6rem;
                width:5.333333rem;
                color: #fff;
            }
        }
        .firstBoxImg{
            background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/start2.gif') no-repeat!important;
            background-size:100% !important;
        }
        .seaBottom{
            height:3rem;
            position: relative;
            .rightBtns{
                position: fixed;
                right: -2.6rem;
                top: 0.8rem;
                background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/rightBtns.png') no-repeat;
                background-size:100% 100%;
                height:10.933333rem;
                width:2.533333rem;
                transition: all 0.4s;
                padding-top: 0.586667rem;
                .list{
                    height:1.866667rem;
                    width:1.866667rem;
                    margin-bottom: 0.106667rem;
                    margin-left: 0.413333rem;
                }
                .closeBtn{
                    height:2rem;
                    width:1.2rem;
                    position: absolute;
                    top:4.5rem;
                    left:-0.4rem;
                    z-index:99;
                }
            }
            .leftBox{
                transition: all 0.3s;
                right: 0;
            }
            .toLeft{
                position: fixed;
                top:5.5rem;
                right:0;
                height:1.946667rem;
                width:1.226667rem;
                background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/toLeftBtn.png') no-repeat;
                background-size: 100% 100%;
            }
            .bottomContent{
                position: fixed;
                bottom: -1px;
                left: 0;
                width: 100.2%;
                z-index:19;
                height: 4rem;
                background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/indexBottom.png') 0 bottom no-repeat;
                background-size: 100%;
                .boatBox{
                    position: absolute;
                    top:-0.8rem;
                    left:0.266667rem;
                    height:4.4rem;
                    width:3.6rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/boat.gif') no-repeat;
                    background-size:100% 100%;
                    z-index:99;
                    .boatTip{
                        position: absolute;
                        height:1.253333rem;
                        width:3.733333rem;
                        padding:0.106667rem 0.24rem 0;
                        top: -1.28rem;
                        right: -1.56rem;
                        font-size:0.32rem;
                        line-height:0.453333rem;
                        color:#666;
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/boatShowTips.png') no-repeat;
                        background-size:100% 100%;
                        span{
                            color:#00B1FF;
                        }
                    }
                }
                .text{
                    padding-top: 0.8rem;
                    padding-left: 3.5rem;
                    font-family: PingFangSC-Regular;
                    font-size: 0.373333rem;
                    line-height: 0.666667rem;
                    color: #875400;
                    padding-left: 4.35rem;
                    .light{
                        display: inline-block;
                        height:1.066667rem;
                        width: 1.066667rem;
                        position: absolute;
                        top: 0.6rem;
                        left:3.2rem;
                        margin-right: 0.08rem;
                        padding-top: 0.3rem;
                    }
                    .light-dong{
                        -webkit-animation: slide 1s infinite;
                        -moz-animation: slide 1s infinite;
                        -ms-animation: slide 1s infinite;
                        animation: slide 1s infinite;
                        background-size: 100% 100%!important;
                    }
                    img{
                        height:0.453333rem;
                        width:0.8rem;
                        display: block;
                        margin:  0 auto;
                    }
                    span{
                        font-family: DIN-Bold;
                        color: #392400;
                        font-size:0.346667rem;
                    }
                    .btn{
                        float: right;
                        height:0.8rem;
                        width:1.76rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/bottomBtn.png') no-repeat;
                        background-size:100% 100%;
                        margin-right: 0.1rem;
                    }
                }
                .quants{
                    padding-left: 4.15rem;
                    padding-top:0.28rem;
                    position: relative;
                    .quantslist{
                        height:1.333333rem;
                        width:1.333333rem;
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/quant.png') center center no-repeat;
                        background-size:1.413333rem 0.986667rem!important;
                        margin-right: 0.46rem;
                        position: relative;
                        .produce{
                            text-align:center;
                            line-height:1.68rem;
                            font-size:0.266667rem;
                            color:#fff;
                            border-radius: 0.67rem;
                            height:1.68rem;
                            width:1.68rem;
                            margin:-0.186667rem -0.186667rem 0;
                            border-radius:50%;
                            background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/scz.png')  center center no-repeat;
                            background-size:1.6rem 1.6rem;
                        }
                        .produceBG{
                            position: absolute;
                            z-index:99;
                            height:1.68rem;
                            width:1.68rem;
                            margin:-0.186667rem -0.186667rem 0;
                            border-radius:50%;
                            background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/loading.png')  center center no-repeat;
                            background-size:1.68rem 1.68rem;
                        }
                        .count{
                            position: absolute;
                            top:0;
                            left:0;
                            z-index:10;
                            height:1.333333rem;
                            width:1.333333rem;
                        }
                        .countBg{
                            /* background: rgba(0, 0, 0, 0.5)!important;
                            border-radius: 50%; */
                        }
                        .quantImg{
                            // margin-top: 0.173333rem;
                            font-size:0.266667rem;
                            line-height:0.346667rem;
                            color: #9A4100;
                            text-align:center;
                        }
                        .quantTip{
                            position: absolute;
                            height:1.253333rem;
                            width:3.7rem;
                            padding:0.106667rem 0.24rem 0;
                            top:-1.066667rem;
                            right:-2.053333rem;
                            font-size:0.32rem;
                            line-height:0.453333rem;
                            color:#666;
                            background: url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/tips.png') no-repeat;
                            background-size:100% 100%;
                            span{
                                color:#00B1FF;
                            }
                        }
                        .quantTip2{
                            right:-1.2rem;
                        }
                    }
                    .advanced{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/height-quant.png') center center no-repeat;
                    }
                }
                @-moz-keyframes slide {
                    0% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;

                    }
                    25% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    50% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight2.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    75%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    100%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight4.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                @-ms-keyframes slide {
                    0% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    25% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    50% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight2.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    75%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    100%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight4.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                @-webkit-keyframes slide {
                   0% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    25% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    50% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight2.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    75%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    100%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight4.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
                @keyframes slide {
                   0% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    25% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight1.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    50% {
                      background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight2.png') no-repeat;
                      background-size: 100% 100%;
                    }
                    75%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight3.png') no-repeat;
                        background-size: 100% 100%;
                    }
                    100%{
                        background: url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/coinLight4.png') no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
</style>