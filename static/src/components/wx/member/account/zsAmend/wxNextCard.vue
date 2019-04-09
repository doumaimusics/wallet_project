<template>
    <div id="next">
        <wxHeader v-if="!osType" :logo="'修改存管银行卡'"></wxHeader>
        <ul>
            <li>
                <div class="title">系统自动审核</div>
                <div class="content">若您在浙商银行监管的所有P2P网贷平台存管账户，<span>余额均为0且无在投项目</span>。请求修改银行卡，系统自动完成审核，即可成功修改。</div>
                <div class="line bdr-b"></div>
            </li>
            <li>
                <div class="title">浙商银行人工审核</div>
                <div class="content">若您在浙商银行监管的所有P2P网贷平台存管账户，<span>有任意一家余额不为0或有在投项目</span>，申请修改银行卡将进入浙商银行人工审核（审核完成前，不允许再次修改）。</div>
            </li>
        </ul>
        <div @click="toWxUrl('/wxMyAccount/wxAmendCard')" class="btn"  v-btn>下一步</div>
        <div class="tips">
            <div class="name">温馨提示：</div>
            <p>1.若您对您的存管账户余额及在投项目有疑问，可联系客服查询。</p>
        </div>
    </div>
    
</template>

<script>
    import wxHeader from '../../../../wxHeader';   //引入头部
    import wxToapp from '../../../../../common/wx/wxToapp';    //引入表单验证
    export default{
        mixins:[wxToapp],
    	data(){
    		return{

    		}
    	},
    	methods:{

    	},
        components:{
            wxHeader
        },
    	created(){
    		
    	},
        mounted(){
            var height = document.documentElement.clientHeight; //获取设备的宽度
            //动态的为根元素设置字体的大小
            $('#next').height(height)
        }
    }
</script>

<style lang="scss" scoped>
    #next{
        background:#fff;
        .bdr-b:after{border-bottom:1px solid #e5e5e5;}
        ul{
            padding:0.666667rem 0.613333rem 0;
            li{
                .title{
                    font-size:0.373333rem;
                    line-height:0.373333rem;
                    padding-left: 0.266667rem;
                    border-left: 2px solid #FF5B4C;
                }
                .content{
                    text-align:justify;
                    padding:0.266667rem 0 0.4rem;
                    font-size:0.346667rem;
                    line-height:0.586667rem;
                    color:#8d8d8d;
                    span{
                        color:#151515;
                    }
                }
                .line{
                    position: relative;
                    margin-bottom: 0.48rem;
                }
            }
        }
        .btn{
            margin:1.066667rem auto 1.146667rem!important;
        }
        .tips{
            padding: 0 0.613333rem;
            font-size:0.32rem;
            line-height:0.453333rem;
            color:#9B9B9B;
            p{
                line-height:0.56rem;
                padding-left: 0.266667rem;
            }
        }
    }
    
</style>