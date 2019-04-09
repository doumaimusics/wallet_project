<template>
    <div :style="[fullHeight]" id="myAward">
        <div class="userList">
            <ul ref="awardTitle" class="awardTitle clear bdr-b">
                <li @click="changeTab(0)" :class="{'active bdr-b':active[0]}" class="fl">现金奖励</li>
                <li @click="changeTab(1)" :class="{'active bdr-b':active[1]}" class="fl li">佣金奖励</li>
                <li @click="changeTab(2)" :class="{'active bdr-b':active[2]}" class="fl">榜单奖励</li>
            </ul>
            
            <div ref="content" class="content">
                <div class="contentBox">
                    <div class="title bdr-b">
                        <div v-if="active[2]" class="fl name">获奖时间</div>
                        <div v-else class="fl name">好友</div>
                        <div v-if="active[2]" class="fl time">奖励</div>
                        <div v-else class="fl time">注册时间</div>
                        <div v-if="active[0]" class="fl investMoney">30天内累计<br/>出借金额(元)</div>
                        <div v-if="active[1]" class="fl investMoney">180天内累计<br/>出借金额(元)</div>
                        <div v-if="active[2]" class="fl investMoney center">获奖榜单</div>
                        <div v-if="active[0]" class="fl getMoney">现金奖励(元)</div>
                        <div v-if="active[1]" class="fl getMoney">佣金奖励(元)</div>
                        <div v-if="active[2]" class="fl getMoney center">名次</div>
                    </div>
                    <mt-tab-container v-if="1" v-model="selected">
                        <mt-tab-container-item id="1">
                            <ul v-if="userData.listToMoney.length > 0" class="list">
                                <li v-for="item in userData.listToMoney" class="clear bdr-b li1">
                                    <div class="fl name">{{item.mobilePhone}}</div>
                                    <div class="fl time">{{item.inviteTime}}</div>
                                    <div class="fl investMoney">{{item.lendMoneySum}}</div>
                                    <div class="fl getMoney">{{item.cashMoney}}</div>
                                </li>
                            </ul>
                            <div v-else class="null">
                                <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/nullImg.png" alt="">
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="2">
                            <ul v-if="userData.listToCommission.length > 0" class="list">
                                <li v-for="item in userData.listToCommission" class="clear bdr-b li2 ">
                                    <div class="fl name">{{item.mobilePhone}}</div>
                                    <div class="fl time">{{item.inviteTime}}</div>
                                    <div class="fl investMoney">{{item.lendMoneySum}}</div>
                                    <div class="fl getMoney">{{item.commission}}</div>
                                </li>
                            </ul>
                            <div v-else class="null">
                                <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/nullImg.png" alt="">
                            </div>
                        </mt-tab-container-item>
                        <mt-tab-container-item id="3">
                            <ul v-if="userData.listToTopMoney.length > 0" class="list">
                                <li v-for="item in userData.listToTopMoney" class="clear bdr-b li3">
                                    <div class="fl name">{{item.bearTime}}</div>
                                    <div class="fl time">{{item.topPrize}}</div>
                                    <div class="fl investMoney">{{item.topName}}</div>
                                    <div class="fl getMoney">{{item.top}}</div>
                                </li>
                            </ul>
                            <div v-else class="null">
                                <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/nullImg.png" alt="">
                            </div>
                        </mt-tab-container-item>
                    </mt-tab-container>
                    
                </div>
            </div>
            
        </div>
        <div @click="showLayer = false" v-if="showLayer" v-layer class="layer">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/shareLayer.png" alt="">
        </div>
        
    </div>
    
</template>

<script>
    import { Navbar, TabItem } from 'mint-ui';
    import publicJs from './public';
    export default{
    	mixins:[publicJs],
    	data(){
    		return{
                selected:'1', 
                active:[1,0,0],
                userData:{
                    listToMoney:{},
                    listToCommission:{},
                    listToTopMoney:{}
                },
                cashList:[],
                showLayer:false,
                bgImg:[
                    'https://aliyunsso.edspay.com/web/wx/activity/newInvite/cash.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/newInvite/brokerage.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/newInvite/topList.png',
                ],
                //  适配iPhoneX 添加的行内样式fullHeight imgBox
                fullHeight:{
                  height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
                },
    		}
    	},
    	methods:{
            changeTab(item){
                this.selected = (item + 1).toString()
                for(var i=0;i<3;i++){
                    this.$set(this.active,i,0);
                }
                this.$set(this.active,item,1);
            },
            getUserData(){
                this.getAppData('/activity/inviteNew/getInviteToMoneyList',(data) =>{
                    this.userData = data.resData;
                },{})
            }
    	},
    	created(){
    		this.getUserData()
    	},
        mounted(){
            var height = document.documentElement.clientHeight; //获取设备的宽度
            this.$refs.content.style.height = height - this.$refs.awardTitle.offsetHeight + 'px';


            // 数据统计
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1273544037&web_id=1273544037'
            script.language = 'JavaScript'
            document.body.appendChild(script)
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

<style lang="scss" scoped>
    #myAward{
        // background:url(https://aliyunsso.edspay.com/web/wx/activity/newInvite/myAward.png) no-repeat;
        background-size: 100%;
        .awardTitle{
            height:1.066667rem;
            width:100%;
            background: #fff;

            li{
                width:33.3%;
                height:1.04rem;
                font-size:0.373333rem;
                line-height:1.04rem;
                text-align: center;
            }
            .active{
                font-size: 0.373333rem;
                line-height:1.013333rem;
                color: #FF5B4C;
                position: relative;
            }
            .bdr-b:after {
                height: 1px;
                content: '';
                width: 100%;
                border-bottom: 1px solid #FF5B4C;
                position: absolute;
                bottom: 0;
                right: 0;
                transform: scaleY(0.5);
                -webkit-transform: scaleY(0.5);
                z-index: 2;
            }
        }
        .gray{
            height:0.266667rem;
            background: rgb(248, 248, 248);
        }
        .title{
            height:1.44rem;
            padding: 0 0.266667rem;
            font-size:0.346667rem;
            line-height:1.44rem;
            color:#333;
            position: relative;
            .investMoney{
                line-height:0.493333rem;
                padding-top: 0.24rem;
            }
            .center{
                padding-top: 0;
                line-height: 1.4rem;
                text-align:center;
            }
        }
        .mint-tab-container{
            font-size: 0.346667rem;
            line-height:1.093333rem;
            .mint-tab-container-item{
                height: 9.733333rem;
                overflow-y: auto;
                .null{
                    padding-top: 1.3rem;
                    img{
                        display:block;
                        height:2.773333rem;
                        width: 2.666667rem;
                        margin: 0 auto;
                    }
                }
            }
            ul{
                
            }
            li{
                position: relative;
                margin: 0 0.266667rem;
                font-size:0.32rem;
                height:1.093333rem;
                .getMoney{
                    text-align:center;
                }
            }
        }
        .name{
            width: 2.05rem;
        }
        .time{
            width: 2.4rem;
            text-align:center;
        }
        .investMoney{
            width: 2.2rem;
            text-align: center;
        }
        .getMoney{
            width:2.1rem;
            text-align: right;
        }
        .content{
            background: url('https://aliyunsso.edspay.com/web/myAccount/invatation/oldInviteBG.png') no-repeat;
            background-size: 100%;
            position: relative;
            height:13.333333rem;
            padding-top: 3.733333rem;
            .contentBox{
                height:11.333333rem;
                width: 9.466667rem;
                background: #fff;
                border-radius: 0.1rem;
                margin: 0 auto;
            }

        }
    }
</style>