<template>
    <div id="upgrade">
        <div v-title>升级攻略</div>
        <div v-if="getCookie('userToken') || userId" class="top1" :style="{height:(osType ? '3.666667rem':'3.6rem')}">
            <img :src="vipData.myLevelBadge" alt="" class="badge">
            <div class="top">
                <div class="money clear">
                    <div class="name fl">我的待收本金：</div>
                    <div class="num fl">{{vipData.myInvesting ? vipData.myInvesting:0 | moneyFormat(1)}}元</div>
                </div>
                <!-- 3.8.0去掉 -->
                <!-- <div class="money">
                    <div class="name fl">累计出借：</div>
                    <div class="num fl">{{vipData.mySumInvestment ? vipData.mySumInvestment:0 | moneyFormat(1)}}元</div>
                </div> -->
            </div>
        </div>

        <img src="https://aliyunsso.edspay.com/web/wx/vip/vipCententTwo.png?v=1.5" alt="" class="img">
        <div class="tiBtn"></div>
        <div @click="toInvest" class="btn"></div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp.js';
    export default{
        mixins:[wxToapp],
    	data(){
    		return{
                vipData:{},
                height:0,
                showTop:true,
                isLogin:true,
    		}
    	},
    	methods:{
            getGradeData(){
                if(this.getCookie('userToken') || this.userId){
                    this.getAppData('/vip/getUpStrategy',(data) =>{
                        if(data.resCode){
                            this.vipData = data.resData;
                        }
                    },{})
                }
            },
            handleScroll(){
                this.height = document.documentElement.scrollTop || document.body.scrollTop; 
                // console.log(this.height)
                if(this.height === 0){
                    this.showTop = true;
                }else{
                    this.showTop = false;
                }
            },
            toInvest(){
                if(this.getCookie('userToken') || this.userId){
                    this.toApp('WIP',{path:'/wxInvest'})
                } else {
                    this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}})
                }
            }
    	},
        components:{
            
        },
    	created(){
            if(this.userId || this.getCookie('userToken')){
                this.isLogin = true;
            }else{
                this.isLogin = false;
            }
            this.isLogin
            this.getGradeData();
    	},
        mounted(){
            window.addEventListener('scroll', this.handleScroll);
        }
    }
</script>

<style lang="scss" scoped>
    #upgrade{
        color:#333;
        .top1{
            position: relative;
            height: 3.6rem;
            background: url("https://aliyunsso.edspay.com/web/wx/v3.3.5/bg.jpg") bottom no-repeat;
            background-size:100% 4.746667rem;
            .badge{
                // height:1.653333rem;
                // width:1.2rem;
                width: 1.92rem;
                height: 2.333333rem;
                position: absolute;
                bottom:.613333rem;
                left:.693333rem;
            }
            .top{
                position: absolute;
                bottom:1.226667rem;
                left:4.08rem;
                .money{
                    font-size:0.32rem;
                    line-height:0.32rem;
                    color:#fff;
                    padding-bottom: 0.346667rem;
                    .name{
                        padding-right:0.266667rem;
                    }
                }
            }
        }
        
        .img{
            width:100%;
        }
        .tiBtn{
            height:1.333333rem;
        }
        .btn{
            background: url(https://aliyunsso.edspay.com/web/wx/vip/bottomBtn.png) no-repeat;
            background-size:100% 100%;
            text-align:center;
            color:#fff;
            position: fixed;
            bottom:0;
            width:100%;
            height:1.333333rem;
            font-size:0.506667rem;
            line-height:1.333333rem;
        }
    }
</style> 