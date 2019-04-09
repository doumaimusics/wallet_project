<template>
    <div ref="strategy" id="strategy">
        <div v-title>出借攻略</div>
        <div class="content">
            <ul>
                <li @click="appRouter('/invite/strategyReg')"></li>
                <li @click="appRouter('/invite/strategyAcc')"></li>
                <li @click="appRouter('/invite/strategyLoan')"></li>
            </ul>
            <div @click="toShare" class="share"></div>
        </div>
        <div @click="showLayer = false" v-if="showLayer" v-layer class="layer">
            <img src="https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/shareLayer.png" alt="">
        </div>
    </div>
</template>

<script>
    import wxShare from '../../../../common/wx/wxShare';
    export default{
        mixins:[wxShare],
    	data(){
    		return{
                shareObj:{
                    title: '轻松3步，E起赚钱', //标题
                    desc: "我的财富秘籍在这里>",//内容
                    link: global.host+"invite/inviteStrategy", //链接
                    imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
                },
                showLayer:false,
    		}
    	},
    	methods:{
            toShare(){    //分享事件
                if(this.osType){
                    this.PassValue(this.appShare);
                }else{
                    this.showLayer = true;
                }
            },
    	},
    	created(){
    		
    	},
        mounted(){
            this.getWxShareData(this.shareObj);
            this.PassValue('NavWhite_出借攻略');

            var height = document.documentElement.clientHeight; //获取设备的宽度
            this.$refs.strategy.style.height = height+'px'
        }
    }
</script>

<style>
    html,body{
        height: 100%;
    }
</style>

<style lang="scss" scoped>
    #strategy{
        height: 100%;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/strategy.png') no-repeat;
        background-size: 100%;
        position: relative;
        .layer{
            img{
                display:block;
                height:5.4rem;
                width:5.426667rem;
                margin-left:3.0rem;
            }
        }
        .content{
            height:15.066667rem;
            width: 9.2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -4.6rem;
            margin-top: -7.533333rem;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/newInvite/fortune/strategyCon.png') no-repeat;
            background-size: 100% 100%;
            ul{
                padding-top: 6.346667rem;
                li{
                    height:1.6rem;
                    width:7.866667rem;
                    margin: 0 auto 0.8rem;
                }
            }
            .share{
                height:1.333333rem;
                width:100%;
            }
        }
    }
</style>