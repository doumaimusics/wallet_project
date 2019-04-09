<template>
    <div id="authorized">
        <div class="agree">
            <router-link to="/home">
                <div class="a-header">
                <img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png" alt="">
                </div>
            </router-link>
            <div class="conter">
                <h1>授权委托书</h1>
                <p>委托人：{{userName ? userName : "【 】"}}</p>
                <p>身份证号：{{cardId ? cardId : "【 】"}}</p>
                <p> </p>
                <p>受托人：浙江楚橡信息科技有限公司</p>
                <p>地址：浙江省杭州市滨江区江陵路2028号星耀城1期</p>
                <p> </p>
                <p>鉴于委托人为浙江楚橡信息科技有限公司运营的 E都市钱包平台的实名注册的用户，现拟参与E都市钱包平台开发的{{productName ? productName : "【 】"}}定期出借计划，为优化委托人的用户体验，委托人就本期{{productName ? productName : "【 】"}}定期出借计划”的相关出借、资金划转、退出等相关事项向受托人做出如下不可撤销的授权:</p>
                <p>一、授权范围</p>
                <p>1.1代委托人在指定的{{productName ? productName : "【 】"}}定期出借计划的锁定期内点击确认出借、出借资金、借款协议、债权转让协议等循环自动出借过程中的全部协议。</p>
                <p>1.2代委托人在指定的{{productName ? productName : "【 】"}}定期出借计划的锁定期内进行划转出借资金、收回借款本息、收取债权转让款项等循环自动出借过程中涉及的全部资金管理。</p>
                <p>二、授权期限</p>
                <p>本授权期限自委托人与受托人间签署《授权委托书》之日起至完全退出{{productName ? productName : "【 】"}}定期出借计划之日止。</p>
                <p>三、本委托书经委托人在E都市钱包平台以线上点击确认的方式签署。</p>
                <p>委托人知悉、了解并不可撤销的同意循环自动出借和自动签署的相关借款协议、债权转让协议；且认同该等自动签署的借款协议、债权转让协议均视为本人真实意思的表示，并对该等法律文件的效力无任何异议，无条件接受授权范围内签署的借款协议、债权转让协议之约束。</p>
                <div class="Inscribe">
                    <p>委托人：{{userName ? userName : "【 】"}}</p>
                    <p>签署日期：{{date ? date : "【 】"}}</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                date:'',
                cardId:'',
                productName:'',
                userName:'',
                tokenS:''
            }
        },
        methods: {
            // 初始化信息
            getInfo () {
                this.getCookie('token') ? this.tokenS = this.getCookie('token') : this.tokenS = ''
                global.http.post_(this,"/protocol/p2p/userAuthorizedEntrustProtocol",{token:this.tokenS},data => {
                    this.date = data.body.resData.date
                    this.cardId = data.body.resData.cardId
                    this.productName = data.body.resData.productName
                    this.userName = data.body.resData.userName
                })
            },
        },
        created: function() {
            this.getInfo()
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #authorized{
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 99;
        .agree{
            width: 1200px;
            height: auto;
            margin: 0 auto;
            background: #fff;
            border-left: 1px solid #e2e2e2;
            border-right: 1px solid #e2e2e2; 
            padding: 0 40px 100px 40px; 
            text-align: justify;
            .a-header{
                position: relative;
                cursor: pointer;
                height: 83px;
                padding: 20px 0 0 30px;
                border-bottom: 1px solid #e2e2e2;
                img{
                    width: 210px;
                    height: 43px;
                }
            }  
            .conter{
                position: relative;
                font-size: 14px;
                line-height: 19px;
                padding: 0 80px;
                h1{
                    margin-bottom: 25px;
                    color: #555555;
                    font-size: 25px;
                    margin-top: 35px;
                    text-align: center;
                    font-weight: bold;
                }
                p, strong{
                    margin-bottom: 5px;
                    min-height: 19px;
                }
                strong{
                    font-size: 16px;
                }
                .Inscribe{
                    width: 500px;
                    line-height: 22px;
                    font-size: 16px;
                    margin: 80px 0px 40px 700px;
                    padding-right: 50px;
                    p{
                        margin-bottom: 20px;
                    }
                }
            }   
        }
    }
</style>
