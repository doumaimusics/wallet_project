<template>
<!-- *******理财计划路由中_this.$route.query.assetManageType == 1 ******-->
    <div id="result">
        <div class="topTitle" v-if="data">
            <i class="el-icon-circle-check"></i>
            <span>支付成功<em>{{data.money}}元</em></span>
        </div>
        <div class="Result" v-if="data">
            <div class="steps">
                <div class="step"></div>
                <div class="step line"></div>
                <div class="step"></div>
                <div class="step line"></div>
                <div class="step"></div>
            </div>
            <div class="items">
                <div class="item">
                    <div class="name">成功购买{{data.planName}}</div>
                    <div class="time">{{data.addTime}}</div>
                </div>
                <div class="item">
                    <div class="name">开始计息</div>
                    <div class="time">{{data.upRateTime}}</div>
                </div>
                <div class="item">
                    <div class="name">发起债权转让</div>
                    <div class="time">{{data.repaymentTime}}</div>
                </div>
            </div>
            <div class="btnLeft btn" @click="$router.push('/myAccount/investRecord')">查看出借记录</div>
            <div class="btnRight btn" @click="$router.push('/invest')">继续出借</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data:'',
        }
    },
    methods: {
        initData() {
            let _this = this;
            let radomStr = this.$route.query.radomStr
            this.uuid = "/invest/detail?uuid=" + this.$route.query.uuid
            global.http.post(_this, '/zs/invest/qryTenderRes', { radomStr: radomStr,type:1}, data => {
                if (data.body.resCode == 1) {
                    _this.data = data.body.resData
                } else {
                    _this.$message({ message: data.body.resMsg, type: 'warning' });
                }
            })
        }
    },
    created: function() {

    },
    mounted: function() {
        this.initData()
    },
    components: {
        
    }
}
</script>

<style lang="scss" scoped>
    #result{
        width: 1200px;
        height: 600px;
        margin: 37px auto 50px;
        background: #FFFFFF;
        border: 1px solid #F2F2F2;
        box-shadow: 0 2px 12px 0 rgba(150,150,150,0.23);
        border-radius: 2px;
        .topTitle{
            width: 100%;
            height: 140px;
            background: #F8F8F8;
            padding: 50px 100px;
            i{
                width: 40px;
                height: 40px;
                font-size: 40px;
                color: #76D057;
                margin-right: 20px;
            }
            span{
                display: inline-block;
                font-family: PingFangSC-Medium;
                font-size: 22px;
                color: #333333;
                height: 40px;
                line-height: 40px;
                vertical-align: bottom;
                em{
                    font-family: DIN-Bold;
                    margin-left: 20px;
                }
            }
        }
        .Result{
            height: 460px;
            width: 100%;
            padding: 40px 100px 50px;
            position: relative;
            .steps{
                margin-top: 10px;
                width: 16px;
                height: 260px;
                float: left;
                margin-right: 15px;
                .step{
                    width: 16px;
                    height: 16px;
                    border-radius: 8px;
                    background: #ddd;
                    margin: 10px 0;
                }
                .step:nth-child(1){
                    background: #EF4B31;
                }
                .step.line{
                    width: 2px;
                    height: 86px;
                    background: #ddd;
                    margin: 0px 7px;
                }
            }
            .items{
                width: auto;
                height: auto;
                float: left;
                padding-top: 10px;
                margin-bottom: 40px;
                .name{
                    height: 26px;
                    line-height: 26px;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #333333;
                }
                .item{
                   margin-bottom: 70px; 
                }
                .item:nth-child(3){
                   margin-bottom: 0px; 
                }
                .time{
                    height: 26px;
                    line-height: 26px;
                    font-family: PingFangSC-Regular;
                    font-size: 16px;
                    color: #999;
                }
            }
            .btn{
                float: left;
                border: 1px solid #F31B23;
                border-radius: 4px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                font-family: PingFangSC-Regular;
                font-size: 16px;
                color: #F31B23;
                position: absolute;
                bottom: 50px;
                cursor: pointer;
            }
            .btnLeft{
                width: 122px;
                left: 100px;
            }
            .btnRight{
                width: 90px;
                left: 267px;
            }
            .btn:hover{
                background: #f31b23;
                color: #fff;
            }
        }
    }
</style>