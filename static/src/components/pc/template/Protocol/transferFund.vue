<template>
    <div id="transferFund">
        <div class="agree">
            <div class="a-header">
               <img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png" alt="">
            </div>
            <div class="conter">
                <h1>余额转移授权委托书</h1>
                <p>委托人：<em>{{name}}</em></p>
                <p></p>
                <p>受托人：浙江楚橡信息科技有限公司</p>
                <p>地址：浙江省杭州市滨江区江陵路2028号星耀城1期</p>
                <p></p>
                <p>根据《关于促进互联网金融健康发展的指导意见》、《网络借贷信息中介机构业务活动管理暂行办法》、《网络借贷资金存管业务指引》及其他有关法律法规对网络借贷信息中介机构银行资金存管的要求。鉴于委托人为浙江楚橡信息科技有限公司运营的 E都市钱包平台的实名注册的用户，现拟通过E都市钱包平台对借款人进行银行存管系统内的资金出借，为优化用户体验，委托人就本次账户资金余额转移行为及相关事项向受托人做出如下不可撤销的授权：</p>
                <p>一、授权范围 </p>
                <p class="text">代委托人在本次账户资金余额转移过程中进行普通账户资金余额转出、存管账户资金余额转入及其他资金划转等转移过程中涉及的全部资金操作。</p>
                <p>二、授权期限</p>
                <p class="text">本授权期限自委托人与受托人间签署《余额转移授权委托书》之日起至委托人E都市钱包平台普通帐户资金余额转移至存管账户资金余额之日止。</p>
                <p>三、本委托书经委托人在E都市钱包平台以线上点击确认的方式签署。</p>
                <p class="text">委托人知悉、了解并不可撤销的同意E都市钱包平台账户资金余额转移行为，且认同该转移行为为本人真实意思的表示，并对该等转移行为的效力无任何异议，无条件接受授权范围内签署的相关文件之约束。</p>
               <div class="Inscribe mb5">委托人：<em>{{name}}</em></div>
               <div class="Inscribe mt0">签署日期：<em>{{time}}</em></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                time:'',
                name:''
            }
        },
        methods: {
            // 初始化信息
            getInfo () {
                let _this = this 
                global.http.post(_this,"/account/getNameAndTime",{},data => {
                    if (data.body.resCode == 1) {
                        _this.name = data.body.resData.name
                        _this.time = data.body.resData.time
                    }else{
                        _this.$message({ message: data.body.resMsg, type: "warning" });
                    } 
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
    #transferFund{
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
                p.text{
                    text-indent:2em;
                }
                strong{
                    font-size: 16px;
                }
                .Inscribe{
                    width: 100%;
                    height: 22px;
                    font-size: 16px;
                    text-align: right;
                    margin: 60px 0px 40px 0;
                    padding-right: 30px;
                }
                .Inscribe em{
                    display: inline-block;
                    width: 135px;
                    text-align: center;
                }
                .mt0{
                    margin-top: 0px;
                }
                .mb5{
                    margin-bottom: 5px;
                }
            }   
        }
    }
</style>
