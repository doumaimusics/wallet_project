<template>
   <div id="nawChristmasInvitation">
       <wx-header v-if="!osType" :logo="'新用户礼物'"></wx-header>
       <div class="activity">
           <div class="invitation" @click="invitation"></div>
           <div class="myReward" @click="myReward"></div>
       </div>
       <!--我的话费奖励弹框-->
        <div class="my_hf_box" v-if="hfBox">
            <div class="close_btn" @click="[hfBox=false,markBox=false]"></div>
            <div class="my_award_list">
                <div class="null_show" v-if="myAwardList.length == 0">
                    <p>您还未获得话费奖励，赶快分享邀请好友吧！</p>
                </div>
                <ul>
                    <li class="clear" v-for="award in myAwardList">
                        <span>{{award.inviteTimeStr}}</span>
                        <span>{{award.userName}}</span>
                        <span>10元话费</span>
                    </li>
                </ul>

            </div>
        </div>
       <div v-layer v-if="markBox"></div>
       <div v-if="showLayer" @click="showLayer = false" v-layer class="layer"></div>
   </div>
</template>

<script>
    import wxHeader from '../../../wxHeader';	//引入头部
    import wxShare from '../../../../common/wx/wxShare';
    import wxToapp from '../../../../common/wx/wxToapp'
    import { Toast } from 'mint-ui';
    export default {
        mixins: [wxShare,wxToapp],
        data() {
            return {
                hfBox: false, // 话费弹窗
                markBox: false, // 遮罩
                myAwardList: [], // 我的话费奖励列表
                showLayer: false,
                shareObj: { //分享标题内容配置
                    title: "推荐你使用E都市钱包，安全靠谱！快来和我一起赚钱吧", //标题
                    desc: "【E都市钱包】安全靠谱，收益稳定。现平台送你1118元新手礼包，高息新手标10%，现有话费奖励等你拿!",//内容
                    link: global.host+"activity/christmasRegister", //链接
                    //link: "https://test2static.edspay.com/#/activity/christmasRegister", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                }
            }
        },
        methods: {
            invitation() {   // 邀请按钮
                let _this = this
                _this.islogin(isInvitation)
                function isInvitation() {
                    if (!_this.osType) {
                        _this.showLayer = true;
                    } else {
                        _this.isLogPassValue(_this.appShare)
                    }
                } 
            },
            myReward(){
                let _this = this
                _this.islogin(() => {
                    _this.hfBox = true
                    _this.markBox = true
                 })
            },
            initData(){
                let _this = this
                _this.notLogPost('/activity/towEgg/inviteRewards', (data) => {
                    if(data.resCode == 1) {
                        _this.myAwardList = data.resData.inviteUserModels;
                    } else if(data.resCode == 0) {
                        Toast({
                            message: '请求失败',
                            position: 'bottom',
                            duration: 3000
                        });
                    } else if(data.resCode == -1) {
                        _this.myAwardList = []
                    } 
                }, (_this.osType ? { oauthToken: _this.token } : { }));
            }
        },
        created: function() {
            this.initData()
        },
        mounted: function() {
            this.getWxShareData(this.shareObj); //分享调用
        },
        components: {
            wxHeader,
        }
   }
</script>

<style lang="scss" scoped>
    #nawChristmasInvitation{
        .layer {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
            background-size: 100%;
        }
        .my_hf_box {
            width: 7.066666rem;
            height: 8.44rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/lookHuafeiBox.png?v=1.1) no-repeat;
            background-size: cover;
            padding-top: 3.466666rem;
            overflow: hidden;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: 9999;
            .close_btn {
                width: 0.613333rem;
                height: 0.613333rem;
                position: absolute;
                right: 0.2rem;
                top: 0;
            }
            .my_award_list {
                width: 100%;
                height: 5.066666rem;
                overflow: auto;
                li {
                    margin-bottom: 0.266666rem;
                    span {
                        width: 33.33%;
                        height: 0.4rem;
                        display: inline-block;
                        float: left;
                        font-size: 0.293333rem;
                        color: #1A6A4C;
                        text-align: center;
                    }
                }
                .null_show {
                    width: 100%;
                    height: 100%;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/christmasAanNewYear/null_icon.png?v=1.0) no-repeat;
                    background-size: 2.08rem 2.08rem;
                    background-position: center 0.5rem;
                    padding-top: 3rem;
                    p {
                        font-size: 0.32rem;
                        color: #1A6A4C;
                        text-align: center;
                    }
                }
            }
        }
        .activity{
            background: url('https://aliyunsso.edspay.com/web/changeChannel/nawChristmasInvitation.png') no-repeat;
            background-size: 100%;
            height: 41.733333rem;
            position: relative;
            top: 0;
            left: 0;
            .invitation{
                position: absolute;
                top: 30.2rem;
                left: 2.93rem;
                width: 4.16rem;
                height: 0.87rem;
            }
            .myReward{
                position: absolute;
                top: 31.3rem;
                left: 2.93rem;
                width: 4.16rem;
                height: 0.6rem;
            }
        }
    }
</style>
