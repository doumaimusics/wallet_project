<template>
    <div id="success">
        <div class="content">
            <img src="https://aliyunsso.edspay.com/web/wx/account/amend/amendDef.png" alt="">
        </div>
        <p>申请绑定银行卡（{{$route.query.bankId | hideBankNo(1)}}）失败</p>
        <p>{{$route.query.cause}}</p>
        <div class="tip">线下审核失败，若您需要修改银行卡，请重新提交请求</div>
        <div @click="appRouter('/wxMyAccount/wxAmendCard')" class="btn" v-btn>修改银行卡</div>
    </div>
</template>

<script>
    import wxHeader from '../../../../wxHeader'
    import wxToapp from '../../../../../common/wx/wxToapp';    //引入表单验证
    export default {
        mixins:[wxToapp],
        data(){
            return {
                logoMsg:'出借',
                result:'',
                investStr:'',
                textTips:{
                    card:'恭喜您！成功修改存管账户的银行卡',
                    phone:'恭喜您，成功修改存管账户的预留手机号'
                }
            }
        },
        methods:{
            
        },
        components:{
            wxHeader
        },
        created(){
            this.result = this.$route.query.result;
        },
        mounted(){
            var height = document.documentElement.clientHeight; //获取设备的宽度

            //动态的为根元素设置字体的大小
            $('#success').height(height)
        }
    }
</script>

<style lang="scss" scoped>
    #success{
        background:#fff;
        color:#333;
        text-align:center;
        .finish{
            position:absolute;
            z-index:100;
            top:0;
            right:0.4rem;
            line-height:1.333333rem;
            font-size:0.373333rem;
            color:#fff;
        }
        .content{
            height:5.733333rem;
            padding-top:1.333rem;
            background:url(https://aliyunsso.edspay.com/web/wx/invest/investResult.png) no-repeat;
            background-size: 100%;
            img{
                display:block;
                width:2.773333rem;
                height:2.773333rem;
                margin: 0 auto;
            }
        }
        p{
            font-size:0.4rem;
            line-height:0.746667rem;
            text-align:center;
        }
        .btn{margin:0.4rem auto 0!important;}
        .tip{
            text-align:center;
            padding-top:1.013333rem;
            font-size:0.32rem;
        }
    }

</style>