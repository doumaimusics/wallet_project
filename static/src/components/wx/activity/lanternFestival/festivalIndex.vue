<template>
    <div id="festivalIndex">
        <div @click="lantern(1)" class="my my-land"></div>
        <div @click="lantern(2)" class="my my-invest"></div>
        <div class="tabbar clear">
            <div @click="activeIndex(0)" :class="{activeLeft:activeBar[0]}" class="food cate fl"></div>
            <div @click="activeIndex(1)" :class="{activeRight:activeBar[1]}" class="hero festival fl"></div>
        </div>
        <div :class="{heroCOntent:activeBar[1]}" class="content clear">
            <div :class="{activeHero:activeBar[1]}" class="allIndex activeCate clear">
                <cate-index :showPopup="showPopup" class="fl"></cate-index>
                <hero-index :showPopup="showPopup" class="fl"></hero-index>
            </div>
        </div>
        <div class="bottom">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/bottom.png" alt="">
        </div>
        <!-- <div @click="toLogin" v-if="!userId && !getCookie('userToken')" v-layer class="layer"></div> -->
        <div @click="showTips(timeLogin)" v-if="timeLogin != 1" v-layer class="layer layer-act"></div>
        <my-land v-if="myMoney.myLand || myMoney.myInvite" :myMoney="myMoney"></my-land>
        <div v-if="showPopup.layer" @click="showPopup.layer = false" v-layer class="invitation-layer"></div>
        <hero-rule :showPopup="showPopup" v-if="showPopup.heroRule"></hero-rule>
        <cate-rule :showPopup="showPopup" v-if="showPopup.cateRule"></cate-rule>
    </div>
</template>

<script>
    import cateIndex from './cateIndex';
    import heroIndex from './heroIndex';
    import wxToapp from '../../../../common/wx/wxToapp';
    import { MessageBox } from 'mint-ui';
    import myLand from './popUp/myLand.vue';
    import heroRule from './popUp/heroRule.vue';
    import cateRule from './popUp/cateRule.vue';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                timeLogin:1,
                activeBar:[true,false],
                showPopup:{
                    layer:false,
                    heroRule:false,
                    cateRule:false,
                },
                myMoney:{
                    myLand:false,
                    myInvite:false,
                }
            }
        },
        methods:{
            lantern(type){
                if(!this.userId && !this.getCookie('userToken')){
                    this.toLogin()
                }else if(type == 1){
                    this.myMoney.myLand = true;
                }else if(type == 2){
                    this.myMoney.myInvite = true;
                }
            },
            toLogin(){
                if(this.osType){
                    this.PassValue('LG|亲，请登录后参与福利活动！|登录')
                }else{
                    MessageBox.confirm('亲，请登录后参与福利活动！').then(action => {
                        this.$router.replace({ path: '/wxLogin', query: { thisUrl: this.$route.fullPath } });   //路由
                    }, action => { });
                }
            },
            getActivityTime(){//1:活动开启 2:活动未开启 3:活动已经结束 4:活动已失效
                this.notLogPost('/activity/lantern/getTime',(data) => {
                    if(data.resCode){
                        this.timeLogin = data.resData.active;
                        this.showTips(this.timeLogin)
                    }
                },{})
            },
            showTips(id){
                if(id == 2){
                    MessageBox.alert('活动未开始', '提示', {
                        confirmButtonClass: 'confirmButton'
                    }, );
                }else if(id == 3){
                    MessageBox.alert('活动已结束', '提示', {
                        confirmButtonClass: 'confirmButton'
                    }, );
                }else if(id == 4){
                    MessageBox.alert('活动已经失效', '提示', {
                        confirmButtonClass: 'confirmButton'
                    }, );
                }
            }, 
            activeIndex(index){
                this.$set(this.activeBar,0,false)
                this.$set(this.activeBar,1,false)
                this.$set(this.activeBar,index,true)
            }
        },
        components:{
            cateIndex,
            heroIndex,
            myLand,
            heroRule,
            cateRule,
        },
        created(){
            this.getActivityTime();
        }
    }
</script>

<style lang="scss" scoped>
    #festivalIndex{
        .invitation-layer {
            background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
            background-size: 100%;
        }
        padding-top: 12.266667rem;
        background: #862522 url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/yuanxiaoBg.png) no-repeat;
        background-size: 100%;
        position: relative;
        .my-land{
            position: fixed;
            z-index: 888;
            top: 6.666667rem;
            left:0;
            height: 1.973333rem;
            width: 2.0rem;
            float: left;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/my-lend.png) no-repeat;
            background-size: 100% 100%;
        }
        .my-invest{
            position: fixed;
            z-index: 888;
            top: 6.666667rem;
            right:0;
            height: 1.973333rem;
            width: 2.0rem;
            float: right;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/my-invite.png) no-repeat;
            background-size: 100% 100%;
        }
        .layer{
            background: rgba(0,0,0,0)!important;
            height:100%!important;
            z-index: 10;
        }
        .layer-act{
            z-index: 99;
        }
        .tabbar{
            width: 100%;
            padding: 0 0.56rem;
            .fl{
                width: 50%;
                height: 1.066667rem;
                width: 4.0rem;
                text-align: center;
                margin: 0 0.213333rem 0;
                font-size: 0.48rem;
                line-height: 0.8rem;
            }
            .food{
                background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/commonFood.png') no-repeat;
                background-size:100% 100%;
            }
            .hero{
                background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/commonHero.png') no-repeat;
                background-size:100% 100%;
            }
            .activeLeft{
                background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/activeFood.png') no-repeat;
                background-size: 100% 100%;
            }
            .activeRight{
                background: url('https://aliyunsso.edspay.com/web/wx/activity/lanternFestival/activeHero.png') no-repeat;
                background-size: 100% 100%;
            }
        }
        .content{
            width: 9.466667rem;
            position: relative;
            overflow: hidden;
            height: 18.4rem;
            margin: 0 0.266667rem;
            .allIndex{
                width: 200%;
                position: absolute;
                top:0;
                left: 0;

            }
            .activeCate{
                transition: all 0.4s;
                left: 0;
            }
            .activeHero{
                transition: all 0.4s;
                left: -9.466667rem;
            }
        }
        .heroCOntent{
            height: 16.24rem;
        }
        .bottom{
            padding-top: 0.213333rem;
            img{
                height: 0.533333rem;
                width:100%;
            }
        }
    }
</style>