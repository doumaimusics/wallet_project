
<template>
    <div id="services">
        <div class="agree">
            <div class="a-header">
               <img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png" alt="">
            </div>
            <div class="conter">
                <h1>电子签章风险提示</h1>
                <p>尊敬的客户</p>
                <p style="text-indent: 2em">您好：</p>
                <p>1、非常感谢您选择使用由杭州天谷信息科技有限公司（以下简称“e签宝”）提供的电子签名、实名认证、时间戳、电子数据存证及出证服务，您应知悉，依据《中华人民共和国电子签名法》（以下简称“电子签名法”）第三条的约定，以下文书不适用电子签名的方式签订电子合同：</p>
                <p class="p2">（1）涉及婚姻、收养、继承等人身关系的；</p>
                <p class="p2">（2）涉及土地、房屋等不动产权益转让的；</p>
                <p class="p2">（3）涉及停止供水、供热、供气、供电等公用事业服务的；</p>
                <p class="p2">（4）法律、行政法规规定的不适用电子文书的其他情形。</p>
                <p class="p2">2、您应知悉，依据电子签名法第十六条的约定，您应在您的系统页面对外展示并要求您的平台用户点击确认由e签宝提供的《数字证书服务协议》，确保您的平台用户委托e签宝平台向具有合法资质的第三方电子认证中心申请数字证书。</p>
                <p>3、您应知悉，您应在您的系统页面对外展示并告知您的平台用户使用电子签名签订电子合同的注意事项，您或者您的平台用户在签订的电子合同中需明确约定双方同意以电子签名的方式签订电子文件。</p>
                <p>4、您应知悉，您签订电子合同的过程数据，如数字证书服务协议确认数据、实名认证数据、数字证书发放数据、意愿认证数据等过程数据未采用本公司的产品或服务，您应在诉讼阶段自行提供相应的证据，或通过时间戳固化的方式存储在e签宝的电子数据存证系统，由e签宝根据您的申请为您提供证据报告。</p>
                <p>5、您应知悉，e签宝仅为您提供实名认证的技术服务，您应根据您的业务场景选择不同的实名认证的方式，您应告知您的用户按照业务流程规范、实际应用场景正确使用实名认证产品，e签宝不对您选择不同类型的实名认证的法律后果承担责任。</p>
                <p>6、您应知悉，您的用户在电子合同签署之前需使用您公司的系统完成注册及实名认证，获得属于您用户的唯一的注册账户、密码及数字证书，请提示您的用户妥善保管其在您公司平台获得的账户、密码等信息，因密码遗失等原因误签的风险与e签宝无关。</p>
                <p>7、您应知悉，e签宝对您提交至电子签名系统和数据存证系统的数据不会做实质内容审核，您应确保您通过技术接口传输的电子数据的合法性、真实性、完整性。</p>
                <p>8、您应知悉，e签宝对您存储在e签宝存证系统的电子数据具有保密义务，但如果该电子数据根据适用法律程序或行政强制性要求必须提供的，则e签宝有权向司法机构或行政机构等提供您存储在e签宝存证系统的电子数据。</p>
                <p>9、您应确保您的用户在进行签名或签章前已经通过意愿认证的方式就合同的签订达成了合意，在未经用户授权的前提下，您无权擅自调用用户的数字证书进行电子文件的签署，因您系统不稳定等原因导致的签章失败，e签宝不承担责任。</p>
                <p>10、为了出证的便捷性，您应确保您及您的用户均使用e签宝的电子签名完成同一份电子合同的签署，e签宝只对于使用e签宝电子签名/签章的部分承担证明责任。</p>
                <p>11、您应确保不以任何非法方式使用本电子签名/签章服务，也承诺不将本电子签名/签章的服务应用于任何非法目的。</p>
                <p style="text-indent: 2em"> 以上内容涉及电子签名法等在业务场景的实际应用中的风险，特此告知。</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data:{
                    amount:'',
                    lockTime:'',
                    mobilePhone:'',
                    planApr:'',
                    productName:'',
                    tenderNo:'',
                    userName:''
                },
                tokenS:''
            }
        },
        methods: {
            // 初始化信息
            getInfo () {
                let tenderId = ''
                let json={}
                this.getCookie('token') ? this.tokenS = this.getCookie('token') : this.tokenS = ''
                if(this.$route.query.tenderId){
                    json={
                        token:this.tokenS,
                        planId:this.$route.query.planId,
                        tenderId:this.$route.query.tenderId
                    }
                }else{
                    json={
                        token:this.tokenS,
                        planId:this.$route.query.planId
                    }  
                }
                global.http._post(this,"/protocol/p2p/serviceProtocol",json,data => {
                    this.data = data.body.resData
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
    #services{
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
                span{
                    display: block;
                    width: 100%;
                    height: 19px;
                    font-size: 14px;
                    text-align: right;
                    margin-bottom: 30px;
                }
                p, strong{
                    margin-bottom: 5px;
                    min-height: 19px;
                }
                strong{
                    font-size: 16px;
                    display: block;
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
