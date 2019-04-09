<template>
   <div id="twoAnniversary">
        <div v-title>E都市钱包 二周年庆典</div>
        <div class="title">
            <div class="item" v-for="(v,i) in title" :class="{active: i == titleIndex}" @click.stop="change(i)">{{v}}</div>
        </div>
        <div class="rule" @click.stop="layer = 1"></div>
        <div class="bg">
            <!-- 福利一 -->
            <div class="welfare1" id="tab1">
                <div class="vip" v-for="(v, index) in vipRewardList" v-if="vipRewardList">
                    <div class="vipBtn" v-if="v.getStatus == 1" @click.stop="vipReward(v.id, index)">{{v.buttonName}}</div>
                    <div class="vipBtn over" v-else>{{v.buttonName}}</div>
                </div>
                <!-- 活动过期的时候默认按钮状态 -->
                <div class="vip" v-for="v in 3" v-if="!vipRewardList">
                    <div class="vipBtn" @click.stop="layer = 2">领取</div>
                </div>
                <div class="vipreceive" v-if="vipStatus == 1" @click.stop="closeVip" v-layer>
                    <div class="vipPic" :style="{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/vipReward' + vipIndex + '.png) no-repeat center center / 100% 100%'}"><div class="closebtn"></div></div>
                </div>
            </div>
            <!-- 福利二 -->
            <div class="welfare2" id="tab2">
                <div class="time">
                    <div class="timeSta" :class="{t10: sort == 1,t14: sort == 2, t18: sort == 3}"></div>
                </div>
                <div class="rush" v-if="secondRewardList && secondRewardList.buttonStatus == 1" @click="secondReward(secondRewardList.buttonStatus)">{{secondRewardList.buttonName}}</div>
                <div class="rush active" v-else-if="secondRewardList">{{secondRewardList.buttonName}}</div>
                <div class="rush active" v-if="!secondRewardList" @click="layer = 2">已抢完{{secondRewardList}}</div>
                <div class="rushreceive"  v-if="rushLayer == 1 || rushLayer == 2" v-layer>
                    <div class="success" v-if="rushLayer == 1">
                        <p>{{layertext}}</p>
                        <div class="closebtn" @click.stop="closeRush"></div>
                        <div class="confirm" @click.stop="toVIP"></div>
                    </div>
                    <div class="fail" v-if="rushLayer == 2">
                        <p>{{layertext}}</p>
                        <div class="closebtn" @click.stop="rushLayer = 0"></div>
                    </div>
                </div>
            </div>
            <!-- 福利三 -->
            <div class="welfare3" id="tab3">
                <!-- 商品详情 -->
                <div class="goodDetail" @click="$router.push({path: '/picTpl', query:{picUrl: 'https://aliyunsso.edspay.com/web/wx/activity/twoYeay/goodsDetail.png', title: '商品详情'}})"></div>
                <!-- 领取记录 -->
                <div class="goodsRecord" @click="$router.push({path: '/twoAnniversary/prizeRecord',query: $route.query})"></div>  
                <ul>
                    <li  v-for="(v, i) in goodList" v-if="goodList">
                        <div class="btn" v-if="v.status" @click.stop="isVeceive(v.list, v.id)"></div>
                        <div class="toInvestBtn" v-else @click.stop="popup(v.list, v.name)"></div>
                    </li>
                    <li  v-for="v in 11" v-if="!goodList">
                        <div class="toInvestBtn" @click.stop="layer = 2"></div>
                    </li>
                </ul>
                <mt-popup v-model="popupVisible" position="bottom">
                    <div class="pop">
                        <div class="goodName bdr-b">完成其中一项任务拿<em>{{popupName}}</em></div>
                        <div class="list bdr-b" v-for="v in popupList">
                            <div class="left">
                                <p>{{v.lockTime}}天项目累计出借{{v.lendMoney | moneyFormat(1)}}元</p>
                                <p>还需出借：<em>{{(v.taskMoney - v.lendMoney) | moneyFormat(1)}}元</em></p> 
                            </div>
                            <!-- <div class='toinvest' v-if="v.planId" @click.stop="toinvest(2, v.planId)">立即出借</div> -->
                            <div class='toinvest' @click.stop="toinvest(1)">立即出借</div>
                        </div>
                    </div>
                </mt-popup>
                <div class="receive" @click.stop="closeGoods" v-if="goodsStatus == 1" v-layer>
                    <div class="goodsPic" :style="{background: 'url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/receive' + popupId + '.png) no-repeat center center / 100% 100%'}"></div>
                </div>
                <div class="rushreceive"  v-if="rushLayer == 3" v-layer>
                    <div class="success">
                        <div class="closebtn" @click.stop="rushLayer=0"></div>
                        <div class="confirm" @click.stop="veceive"></div>
                    </div>
                </div>
            </div>
            <!-- 福利四 -->
            <div class="welfare4" id="tab4">
                <div class="toShopping" @click.stop="toGoodList"></div>
            </div>
        </div>
        <div class="layer" @click.stop="layer = 0" v-layer v-if="layer == 1 || layer == 2">
            <div class="rules" v-if="layer == 1">
                <div class="font">
                    <div class="font-item">
                        <p><span>1.</span>活动时间：2018年6月25日10：00-7月25日</p>
                        <p><span>2.</span>活动期间，所有用户可在活动页面领取两周年礼包，（每个礼包仅限领取一次）；</br>注：活动期间VIP等级升级可再领取下一档周年礼包。</p>
                        <p><span>3.</span>获得VIP升级券的用户可体验比当前高一等级的VIP福利，体验期30天，体验期结束后用户未升级，等级将恢复成实际VIP等级；</p>
                        <p><span>4.</span>VIP6用户得到VIP升级券时将不再升级；</p>
                        <p><span>5.</span>实物奖励需用户手动领取，满足条件可多次领取，实物奖励将在活动结束后15个工作日内由理财顾问联系发放，届时请注意查收；</p>
                        <p><span>6.</span>活动期间商城“周年特供”专区商品8折兑换；</p>
                        <p><span>7.</span>首次出借不计入福利三</p>
                        <p><span>8.</span>本活动在法律允许范围内最终解释权归E都市钱包所有，如有疑问，详情请咨询官方客服电话：<a href="tel:400-135-3388">400-135-3388</a></p>
                        <p class="isIos" v-if="osType == 'IOS'">本活动奖品与苹果公司无关！</p>
                    </div>
                </div>
            </div>
            <div class="timeOut" v-if="layer == 2">
            </div>
        </div>
   </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare.js';   // 分享
    import { MessageBox, Toast, Popup } from 'mint-ui';
    // import { Toast } from 'mint-ui'
    // import { Popup } from 'mint-ui';
    export default {
        mixins: [wxShare],
        data() {
            let _this = this
            return {
                btnFalg:true,         //  活动按钮开关
                login:false,
                title:['福利一','福利二','福利三','福利四'],
                titleIndex:0,
                start:1,                 // 活动时间状态 1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                layer:0,                // 1:活动规则弹框  2:活动过期弹框
                vipRewardList:'',       // vip奖励列表 福利一
                vipStatus:0,            // 1:
                vipIndex:0,             // 福利一保存领取的福利下标
                secondRewardList:'',    // 秒杀活动奖励列表 福利二
                sort:0,                // 时间状态的下标
                rushLayer: 0,         // 1   福利二成功的弹框 2:失败的弹框 3:福利三的领取确认
                layertext:'',           //  福利二弹框文案
                goodsStatus:0,          // 1:
                popupId: '',     // 保存选中去完成的商品id
                popupVisible: false,
                popupList: [],
                popupName: '',     // 保存选中去完成的商品名称
                goodList:'',            // 商品列表 福利三
                goodsInfo: {},          // 保存商品信息
                shareObj: { //分享标题内容配置
					title: "周年庆典 壕礼巨献", //标题
					desc: "巅峰盛会，周年礼包任性领，iPhone X、华为P20、平衡车、京东卡通通免费拿！快来E起狂欢吧！", //内容
                    link: global.host + "twoAnniversary", //链接
					imgUrl: "https://aliyunsso.edspay.com/web/icon.jpg" //图片链接
                },
            }
        },
        methods: {
            // 福利一开始@@@@@@@@@@@@@@@@@@@@@@@@@
            gitVipRewardList(){   // vip奖励列表 福利一
                this.notLogPost('/activity/2years/vipRewardList', (data) => {
                    if (data.resCode) {
                        this.vipRewardList = data.resData.rewardList
                    }
                }, (this.osType ? {oauthToken:this.token}:{token:this.getCookie('userToken')}), 1)
            },
            vipReward(id, i){     // 福利一领取VIP奖励
                if(!this.btnFalg){
                    return
                }
                this.btnFalg = false
                if(!this.login){
                    this.toLogin()
                    return
                }
                if(this.start != 1){
                    this.layer = 2;
                    return
                }
                this.vipIndex = i+1
                this.getAppData('/activity/2years/getVipReward', data => {
                    if(data.resCode == 1) {
                        this.vipStatus = 1
                    }
                    setTimeout(()=>{
                        this.btnFalg = true
                    },2000)
                }, {id: id},1);
            },
            closeVip(){   //关闭领取VIP成功礼品的弹框    福利一
                this.vipStatus = 0
                this.gitVipRewardList()
            },
            // 福利二开始@@@@@@@@@@@@@@@@@@@@@@@@@
            gitSecondRewardList(){   // 秒杀活动奖励列表 福利二
                this.notLogPost('/activity/2years/secondRewardList', (data) => {
                    if (data.resCode) {
                        this.secondRewardList = data.resData
                        let timeStr = data.resData.timeList
                        let newArr = []
                        newArr = timeStr.filter(v => v.showStatus == 1).map(item => {  // 获取第一个满足条件的ID
                            return {
                                sort: item.sort
                            }
                        })
                        newArr.length ? this.sort = newArr[0].sort : ''
                    }
                }, (this.osType ? {oauthToken:this.token}:{token:this.getCookie('userToken')}), 1)
            },
            secondReward(n){     // 福利二  领取升级券
                if(!this.btnFalg){
                    return
                }
                this.btnFalg = false
                if(!this.login){
                    this.toLogin()
                    return
                }
                if(this.start != 1){
                    this.layer = 2;
                    return
                }
                if(n != 1) return
                this.getAppData('/activity/2years/getSecondReward', data => {
                    if(data.resCode == 1) {  // 成功
                        this.rushLayer = 1;
                        this.layertext = data.resMsg
                    }else{     // 失败
                        this.rushLayer = 2;
                        this.layertext = data.resMsg
                    }
                    setTimeout(()=>{
                        this.btnFalg = true
                    },2000)
                }, {sort: this.sort},1);
            },
            toVIP(){     // 跳转到VIP页面
                if (this.osType) {
                        this.PassValue('VIP')
                    }else{
                        this.$router.push('/wxMyAccount/vipUser');
                    }
            },
            closeRush(){    // 关闭领取成功的弹框并刷新页面
                this.gitSecondRewardList()
                this.rushLayer = 0
            },
            // 福利三开始@@@@@@@@@@@@@@@@@@@@@@@@@
            gitGoodsList(){   // 商品列表 福利三
                this.notLogPost('/activity/2years/goodsList', (data) => {
                    if (data.resCode) {
                        this.goodList = data.resData.data
                    }
                }, (this.osType ? {oauthToken:this.token}:{token:this.getCookie('userToken')}), 1)
            },
            popup(v, name){        // 去完成按钮  福利三
                if(!this.login){
                    this.toLogin()
                    return
                }
                if(this.start != 1){
                    this.layer = 2;
                    return
                }
                this.popupVisible = true
                this.popupList = v
                this.popupName = name
            },
            isVeceive(v, id){     // 商品领取确认 福利三
                if(!this.btnFalg){
                    return
                }
                this.btnFalg = false
                if(!this.login){
                    this.toLogin()
                    return
                }
                if(this.start != 1){
                    this.layer = 2;
                    return
                }
                let newArr = v.filter(n => n.status === 1).map(item => {  // 获取第一个满足的条件
                    return {
                        lockTime: item.lockTime,
                        Money: item.taskMoney
                    }
                })
                console.log('标准金额', newArr[0].Money) 
                console.log('锁定期', newArr[0].lockTime) 
                console.log('商品ID', id) 
                this.goodsInfo = {
                    Money: newArr[0].Money,
                    lockTime: newArr[0].lockTime,
                    id: id
                }
                this.rushLayer = 3
                console.log(this.goodsInfo)
                setTimeout(()=>{
                    this.btnFalg = true
                },2000)
            },
            veceive(){       // 商品领取 福利三
                if(!this.btnFalg){
                    return
                }
                this.btnFalg = false
                if(!this.login){
                    this.toLogin()
                    return
                }
                if(this.start != 1){
                    this.layer = 2;
                    return
                }
                this.rushLayer = 0;
                this.popupId = this.goodsInfo.id;
                this.getAppData('/activity/2years/goodsReceive', data => {
                    if(data.resCode == 1) {
                        this.goodsStatus = 1
                    }
                    setTimeout(()=>{
                        this.btnFalg = true
                    },2000)
                }, {goodsId: this.goodsInfo.id, lockTime: this.goodsInfo.lockTime, money: this.goodsInfo.Money},1);
            },
            closeGoods(){    // 关闭领取商品成功的弹框    福利三
                this.goodsStatus = 0
                this.gitGoodsList()
            },
            toinvest(n, id){   // 去出借列表和详情 1 列表  2 详情
                if(n==1){    // 跳转到理财列表
				    this.toApp('WIP',{path:'/wxInvest'});
                }else{
                    this.toApp('WIP_'+id,{ path: '/wxDetailPoint', query: {uuid:id}})
                }
            },
            toGoodList(){    // 去积分商城列表指定类目  福利四
                if(!this.login){
                    this.toLogin()
                    return
                }
                if(this.start != 1){
                    this.layer = 2;
                    return
                }
                let query;
                if(this.$route.query){
                    query = this.$route.query
                    query.classify = 0
                }else{
                    query = {classify : 0}
                }
                this.$router.push({path: '/intGoodList', query: query})
            },
            getData(){
                this.$route.query.token || this.getCookie('userToken') ? this.login = true : this.login = false;
                // 活动时间请求
                this.notLogPost('/activity/two/getActivityTime', (data) => {
                    if (data.resCode) {
                        this.start = data.resData.active
                        this.start == 1 ? '' : this.layer = 2;
                        if(this.start == 1){
                            this.gitVipRewardList()
                            this.gitSecondRewardList()
                            this.gitGoodsList()
                        }
                    }
                }, (this.osType ? {oauthToken:this.token, activityId: 'con_two_activity'}:{token:this.getCookie('userToken'), activityId: 'con_two_activity'}), 1)
            },
            toLogin(){   // 跳转到登录页面
                if(this.start == 1){
                    if (this.osType) {
                        this.PassValue('LG')
                    }else{
                        this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });
                    }
                }else{
                    this.layer = 2;
                } 
            },
            change(i){
                let h,
                    tab1 = document.getElementById('tab1'),
                    tab2 = document.getElementById('tab2'),
                    tab3 = document.getElementById('tab3'),
                    tab4 = document.getElementById('tab4');
                i == 0 ? h = tab1.offsetTop : i == 1 ? h = tab2.offsetTop : i == 2 ? h = tab3.offsetTop : i == 3 ? h = tab4.offsetTop : ''
                document.body.scrollTop = h;
                document.documentElement.scrollTop = h;
                this.titleIndex = i
            },
            menu(){
                let scroll = document.documentElement.scrollTop || document.body.scrollTop;
                let tab2 = document.getElementById('tab2'),
                    tab3 = document.getElementById('tab3'),
                    tab4 = document.getElementById('tab4'),
                    bodyH = document.body.offsetHeight,
                    CH = document.documentElement.clientHeight
                if(scroll < tab2.offsetTop){
                    this.titleIndex = 0
                }else if (scroll < tab3.offsetTop) {
                    this.titleIndex = 1
                }else if (scroll < (bodyH - CH)) {
                    this.titleIndex = 2
                }else {
                    this.titleIndex = 3
                }
            },
        },
        created: function() {
            this.getData()
            this.PassValue('NavWhite_E都市钱包 二周年庆典');
        },
        mounted: function() {
            setTimeout(()=>{
                document.documentElement.scrollTop = 10;
                document.body.scrollTop = 10;
            },100)
            window.addEventListener('scroll', this.menu)
            this.getWxShareData(this.shareObj); //分享调用

            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1273987495&web_id=1273987495'
            script.language = 'JavaScript'
            document.body.appendChild(script)
        },
        beforeDestroy(){
			window.removeEventListener('scroll', this.menu)
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
            'layer'(val) {
				if (val) {
					document.body.setAttribute("class","bodychannel");
				} else {
					document.body.removeAttribute("class","bodychannel");
				}
			}
        }
   }
</script>

<style lang="scss" scoped>
    #twoAnniversary{
        width: 100%;
        height: auto;
        // position: relative;
        // overflow-y: auto;
        // z-index: 99;
        .title{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            height: 0.95rem;
            .item{
                font-family: PingFangSC;
                float: left;
                width: 25%;
                height: 100%;
                text-align: center;
                line-height: 0.95rem;
                font-size: .373333rem;
                color:#fff;
                background: rgba($color: #138AF2, $alpha: 0.75);
            }
            .item.active{
                background: rgba($color: #3B5FE7, $alpha: 1.0);
            }
        }
        .rule{
            position: fixed;
            top: 4rem;
            right: 0;
            z-index: 1;
            width: .666667rem;
            height: 2.133333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/ruleBtn.png)no-repeat 0 0 / 100% 100%;
        }
        .bg{
            width: 100%;
            height: 70.533333rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/twoyear.png)no-repeat 0 0 / 100% 100%;
            .welfare1{
                width: 100%;
                height: 18.666667rem;
                padding: 16.85rem 0 0 1.25rem;
                .vip{
                    width: 1.933333rem;
                    height: .706667rem;
                    float: left;
                    margin-right: .65rem;
                    .vipBtn{
                        width: 100%;
                        height: 100%;
                        line-height: .706667rem;
                        text-align: center;
                        color:#fff;
                        font-size: .4rem;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/vipBtn.png)no-repeat 0 0 / 100% 100%;
                    }
                    .vipBtn.over{
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/vipOver.png)no-repeat 0 0 / 100% 100%;
                    }
                }
                .vipPic{
                    position: fixed;
                    width: 7.866667rem;
                    height: 11.12rem;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    .closebtn{
                        position: absolute;
                        width: 100%;
                        height: 1rem;
                        bottom: 0;
                        left: 0;
                    }
                }
            }
            .welfare2{
                width: 100%;
                height: 11.2rem;
                padding: 4.4rem 0 0 .55rem;
                .time{
                    width: 2.533333rem;
                    height: 3.24rem;
                    .timeSta{
                        width: 100%;
                        height: 100%;
                        background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/time.png)no-repeat 0 0 / 100% 100%;
                    }
                    .timeSta.t10{
                         background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/time1.png)no-repeat 0 0 / 100% 100%;
                    }
                    .timeSta.t14{
                         background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/time2.png)no-repeat 0 0 / 100% 100%;
                    }
                    .timeSta.t18{
                         background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/time3.png)no-repeat 0 0 / 100% 100%;
                    }
                }
                .rush{
                    width: 3.066667rem;
                    height: .8rem;
                    line-height: .8rem;
                    text-align: center;
                    margin-top: 1.55rem;
                    margin-left: 3.75rem;
                    font-size: .48rem;
                    color: #fff;
                    text-shadow: 0 2px 1px #ff9a00;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/rush.png)no-repeat center center / 3.066667rem .8rem;
                }
                .rush.active{
                    text-shadow: none;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/rushOver.png)no-repeat center center / 3.066667rem .8rem;
                }
                .success{
                    position: fixed;
                    width: 7.733333rem;
                    height: 5.973333rem;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/success.png)no-repeat center center / 7.733333rem 5.973333rem;
                    padding-top: 1.8rem;
                    p{
                        font-family: PingFang-SC-Medium;
                        width: 100%;
                        height: .6rem;
                        line-height: .6rem;
                        text-align: center;
                        color: #ff6565;
                        font-size: .426667rem;
                    }
                    .closebtn{
                        position: absolute;
                        width: 50%;
                        height: 1.5rem;
                        bottom: 0.6rem;
                        left: 0;
                        float: left;
                    }
                    .confirm{
                        position: absolute;
                        width: 50%;
                        height: 1.5rem;
                        bottom: 0.6rem;
                        right: 0;
                        float: left;
                    }
                }
                .fail{
                    position: fixed;
                    width: 7.733333rem;
                    height: 5.04rem;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/fail.png)no-repeat center center / 7.733333rem 5.04rem;
                    padding-top: 1.333333rem;
                    p{
                        padding: 0 .6rem;
                        font-family: PingFang-SC-Heavy;
                        font-size: .533333rem;
                        color: #666666;
                        width: 100%;
                        line-height: .746667rem;
                        text-align: center;
                    }
                    .closebtn{
                        position: absolute;
                        width: 100%;
                        height: 1.5rem;
                        bottom: 0.4rem;
                        left: 0;
                        float: left;
                    }
                }
            }
            .welfare3{
                width: 100%;
                height: 30.9rem;
                position: relative;
                .goodDetail{
                    width: 1.7rem;
                    height: 1.7rem;
                    position: absolute;
                    right: .2rem;
                    top: 2.5rem;
                }
                .goodsRecord{
                    width: 1.7rem;
                    height: 1.7rem;
                    position: absolute;
                    right: .2rem;
                    top: 4.2rem;
                }
                ul{
                    width: 100%;
                    height: 100%;
                    li{
                        width: 1.75rem;
                        height: 0.63rem;
                        position: absolute;
                        .btn{
                            width: 100%;
                            height: 100%;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/dole.png)no-repeat 0 0 / 100% 100%;
                        }
                        .toInvestBtn{
                            width: 100%;
                            height: 100%;
                            background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/finish.png)no-repeat 0 0 / 100% 100%;
                        }
                    }
                    li:nth-child(1){
                        left: 3.8rem;
                        top: 5.35rem;
                    }
                    li:nth-child(2){
                        left: 2.66rem;
                        top: 8.87rem;
                    }
                    li:nth-child(3){
                        left: 7.38rem;
                        top: 9.86rem;
                    }
                    li:nth-child(4){
                        left: 2.36rem;
                        top: 13.03rem;
                    }
                    li:nth-child(5){
                        left: 7.24rem;
                        top: 13.27rem;
                    }
                    li:nth-child(6){
                        left: 4.74rem;
                        top: 16.84rem;
                    }
                    li:nth-child(7){
                        left: 2.5rem;
                        top: 20.18rem;
                    }
                    li:nth-child(8){
                        left: 7.16rem;
                        top: 21.11rem;
                    }
                    li:nth-child(9){
                        left: 2.4rem;
                        top: 24.23rem;
                    }li:nth-child(10){
                        left: 7rem;
                        top: 24.6rem;
                    }li:nth-child(11){
                        left: 3.86rem;
                        top: 28.18rem;
                    }
                }
                .mint-popup-bottom{
                    width: 10rem;
                    .pop{
                        padding: 0 0 .133333rem .533333rem;
                        .goodName{
                            width: 100%;
                            height: 1.173333rem;
                            line-height:  1.173333rem;
                            font-family: PingFang-SC-Medium;
                            font-size: .426667rem;
                            color: #333333;
                            border-bottom: 1px solid #e5e5e5; 
                            em{
                                color: #FF5B4C;;
                            }
                        }
                        .list{
                            font-family: PingFang-SC-Medium;
                            height: 1.906667rem;
                            padding: .4rem 0;
                            position: relative;
                            .left{
                                float: left;
                                width: 6.666667rem;
                                height: 100%;
                                p:nth-child(1){
                                    width: 100%;
                                    height: .533333rem;
                                    line-height: .533333rem;
                                    color: #333;
                                    font-size: .373333rem;
                                    margin-bottom: .133333rem;
                                }
                                p:nth-child(2){
                                    width: 100%;
                                    height: .44rem;
                                    line-height: .44rem;
                                    color: #808080;
                                    font-size: .32rem;
                                    em{
                                        color: #FF5B4C;;
                                    }
                                }
                            }
                            .toinvest{
                                width: 2.066667rem;
                                height: .8rem;
                                line-height: .8rem;
                                text-align: center;
                                float: right;
                                color: #fff;
                                font-size: .373333rem;
                                background: #FF5B4C;
                                border-radius: .4rem;
                                margin-top: .16rem;
                                margin-right: .4rem;
                            }
                        }
                        .list.bdr-b:last-child::after{
                            border-bottom: 0px solid #e5e5e5; 
                        }
                    }
                }
                .goodsPic{
                    position: fixed;
                    width: 7.093333rem;
                    height: 9.56rem;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    .closebtn{
                        position: absolute;
                        width: 100%;
                        height: 1rem;
                        bottom: 0;
                        left: 0;
                    }
                }
                .success{
                    position: fixed;
                    width: 7.733333rem;
                    height: 5.04rem;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/isReceive.png)no-repeat center center / 7.733333rem 5.04rem;
                    .closebtn{
                        position: absolute;
                        width: 50%;
                        height: 1.5rem;
                        bottom: 0.5rem;
                        left: 0;
                        float: left;
                    }
                    .confirm{
                        position: absolute;
                        width: 50%;
                        height: 1.5rem;
                        bottom: 0.5rem;
                        right: 0;
                        float: left;
                    }
                }
            }
            .welfare4{
                width: 100%;
                height: 9.8rem;
                padding-top: 5.6rem;
                .toShopping{
                    width: 3.2rem;
                    height: 2rem;
                    margin-left: 3rem;
                }
            }
        }
        .layer{
            .timeOut{
                width: 7.733333rem;
                height: 5.04rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/timeOver.png)no-repeat center center / 7.733333rem 5.04rem;
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                .closeLayer{
                    width: 100%;
                    height: 1rem;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
            .rules{
                width: 7.866667rem;
                height: 11.12rem;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/twoYeay/relu.png)no-repeat center center / 7.866667rem 11.12rem;
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                margin: auto;
                .font{
                    width: 7.253333rem;
                    height: 8.08rem;
                    background: #fff;
                    margin: 1.333333rem .306667rem .306667rem ;
                    overflow: hidden;
                    overflow-y: auto;
                    .font-item{
                        width: 100%;
                        height: auto;
                        padding: .28rem .52rem;
                        p{
                            font-family: PingFangSC-Regular;
                            font-size: .346667rem;
                            color: #666666;
                            text-align: justify;
                            margin-bottom: .133333rem;
                            line-height: .493333rem;
                            span{
                                font-family: DIN-Medium;
                                color: #FF7F7F;
                            }
                        }
                        p.isIos{
                            text-align: center
                        }
                    }
                }
                .closeLayer{
                    width: 100%;
                    height: 1rem;
                    position: absolute;
                    bottom: 0;
                    left: 0;
                }
            }
        }
    }
</style>
<style>
	body.bodychannel {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
		overflow: hidden;
	}
</style>
