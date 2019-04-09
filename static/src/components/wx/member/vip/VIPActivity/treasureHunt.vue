<template>
    <div id="treasureHunt">
        <div class="userData clear">
            <div class="name">我是海盗船长<span>{{userName}}</span></div>
            <div class="num">我已经航行{{$route.query.sailSum}}米，获得{{$route.query.exchangeCoin | returnFloat}}元财富。<br/>快来和我一起寻宝吧！</div>
        </div>
        <invite-register :activityCode="1" :channel="'lbhh01'" :toLink="'/vip/treasureIndex'" :inviterId="inviterId" :gouLists="gouList"></invite-register>
    </div>
</template>

<script>
    import getData from '../../../../../common/router/getData';     //引入发送请求
    import jiami from 'js-base64';
    import verify from '../../../../../common/wx/verification';    //引入表单验证
    import inviteRegister from '../../../activity/wxNewActivityRegisterLogIn';  //引入表单验证
    export default{
        mixins:[getData,verify],
    	data(){
    		return{
                inviterId:'',   //获取邀请人ID
                userName:'',
                gouList:[
                    'https://aliyunsso.edspay.com/web/wx/activity/myNewInvite/isGou.png',
                    'https://aliyunsso.edspay.com/web/wx/activity/myNewInvite/notGou.png'
                ]
    		}
    	},
        components:{
            inviteRegister
        },
    	methods:{
            toSea(){
                this.$router.push({path:'/vip/treasureIndex'});
            }
    	},
    	created(){
    		this.change();
            if(this.$route.query.ui){
                this.inviterId = Base64.encode(this.$route.query.ui);   //获取邀请人id;
                // this.inviterId = this.$route.query.ui;   //获取邀请人id;
            } 
            this.userName = this.$route.query.userName;
            
            this.userName = this.userName.replace(/\s+/g,"+")
            console.log(this.userName)
            this.userName = Base64.decode(this.userName);
    	},
        mounted(){

        }
    }
</script>

<style>
    #treasureHunt .from{
        padding-top: 0;
    }
    #treasureHunt .from .btn{
        margin-top: 0.2rem;
    }
    #treasureHunt .from .gou{
        margin: .43rem 0 0 .053333rem;
    }
    #treasureHunt .from .input input{
        font-size: 0.4rem;
    }
</style>

<style lang="scss" scoped>
    #treasureHunt{
        height: 24.506667rem;
        background:url('https://aliyunsso.edspay.com/web/wx/vip/treasure2/treasureHunt.png') no-repeat;
        background-size:100%;
        position: relative;
        font-family: PingFangSC-Regular;
        .userData{
            color: #802D1C;
            padding-left: 0.906667rem;
            padding-top:11.226667rem;
            height:14.533333rem;
            .name{
                font-size:0.426667rem;
                line-height: 0.6rem;
                padding-bottom:0.213333rem;
                span{
                    padding-left: 0.133333rem;
                    font-family: PingFangSC-Semibold;
                    font-size: 0.426667rem;
                    color: #802D1C;
                }
            }
            .num{
                font-family: PingFangSC-Regular;
                font-size:0.373333rem;
                line-height:0.533333rem;
                span{
                    font-size:0.4rem;
                    color:#FF2C00;
                }
            }
            
        }
    }
</style>