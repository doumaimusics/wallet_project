<template>
    <div id="success">
        <wx-header v-if="!osType" :type="$route.query.type ? $route.query.type:0" :redType="1" :logo="'修改存管银行卡'"></wx-header>
        <div v-if="$route.query.type != 5" @click="finish"  class="finish">完成</div> 
        <div class="content">
            <img src="https://aliyunsso.edspay.com/web/wx/account/amend/amendCheck.png" alt="">
        </div>
        <p>申请绑定银行卡（{{this.$route.query.bankNo | hideBankNo(1)}}）</p>
        <div class="text">由于您在浙商银行监管的p2p网贷平台仍有余额或在投金额，<span>您的申请已进入浙商银行线下人工审核流程，请提供如下材料：</span></div>
        <ul>
            <li>1、申请人身份证正反面扫描件（电子版）</li>
            <li>2、新银行卡正反面扫描件（电子版）</li>
            <li>3、申请人手持身份证正面照片</li>
            <li>4、申请人手持新银行卡正面照片</li>
            <li>5、银行卡信息变更申请表</li>
        </ul>
        <div class="text">请将上述材料打包提交至您的专属顾问或客服邮箱：<span>edskf@edspay.com</span> 。预计<span>5-10</span>个工作日修改完毕（实际处理时间，以浙商处理速度为准）。</div>
        <div class="btn" @click="toWxUrl('/wxMyAccount/wxAmendExample')"  v-btn>查看材料示例</div>
        <div class="tip">如需帮助请联系客服：<span>400-135-3388</span></div>
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
            finish(){
                // 移动端关闭 微信端回到入口页
				if (this.osType) {
					this.PassValue('FINISH');
				} else {
					this.$router.go(-this.$route.query.goNum);
				}
            }
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
        text-align:justify;
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
            padding-top:0.666667rem;
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
            line-height:0.56rem;
            padding-bottom: 0.266667rem;
            text-align:center;
        }
        ul{
            padding:0.3rem 0.613333rem;
            li{
                font-size:0.346667rem;
                line-height:0.64rem;
            }
        }
        .text{
            padding:0 0.613333rem;
            font-size:0.346667rem;
            line-height:0.613333rem;
            span{
                color:#FF3F38;
            }
        }
        .btn{margin:0.4rem auto 0!important;}
        .tip{
            text-align:center;
            padding-top:0.4rem;
            font-size:0.32rem;
            span{color: #508CEE;}
        }
    }

</style>