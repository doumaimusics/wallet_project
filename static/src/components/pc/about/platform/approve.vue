<!-- 关于我们  基本信息 -->
<template>
    <div class="information">
        <!-- 备案信息 -->
        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_01.png" alt="">
            </div>
            <span>备案信息</span>
        </div>
        <div class="table">
            <router-link to="/info/registrationProcess" tag=div class="checkInfo">点击查看备案信息</router-link>
            <div class="picBtn" @click="show1=true">存管合同</div>
            <ul class="clear">
                <li v-for="v in table1">{{v}}</li>
            </ul>
        </div>
        <!-- 风险管理信息 -->
        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_02.png" alt="">
            </div>
            <span>风险管理信息</span>
        </div>
        <div class="table">
            <img src="https://aliyunsso.edspay.com/web/about/disclosure6.png" alt="" style="width:886px;height:350px">
        </div>
        <div class="tips">
            <label class="label1">风险评估流程：</label>
            <img src="https://aliyunsso.edspay.com/web/about/disclosure7.png" class="risk-img"/>
            <br/>
            <label>风险预警管理：</label><span>E都市钱包建立了完善的监督体系，对资产等方面进行严格审核，确保业务稳健合规；E都市钱包建立了严密的数据监控体系，通过实时数据监测等方式确保风险可控。</span></br>
            <label>催收方式：</label><span>E都市钱包委托资产方对逾期项目进行催收，自身不存在催收业务及行为。</span>
        </div>
        <!--弹出框-->
        <div class="showPic" v-if="show1">
            <div class="leftArrow arrow" v-if="picUrlIndex != 0" @click="picUrlIndex = picUrlIndex-1"></div>
            <div class="rightArrow arrow" v-if="picUrlIndex != picUrl.length-1" @click="picUrlIndex = picUrlIndex+1"></div>
            <div class="imgBox">
                <img :src="picUrl[picUrlIndex]">
                <div class="del" @click="show1 = !show1"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            show1: false,
            pic: '',
            table1: ['备案登记信息', '备案进行中','电信业务经营许可证','浙B2-20170412', '资金存管信息', '接入浙商银行存管系统', '网站备案图标及编号', '浙公网安备 33010502002733号'],
            picUrl:[
                'https://aliyunsso.edspay.com/web/about/disclosure1.png',
                'https://aliyunsso.edspay.com/web/about/disclosure2.png',
                'https://aliyunsso.edspay.com/web/about/disclosure3.png'
            ],
            picUrlIndex: 0
        }
    },
    methods: {
        arrowL(){
             this.picUrlIndex = this.picUrlIndex-1
        },
        arrowR(){
            this.picUrlIndex = this.picUrlIndex+1
        },
        showPic(n) {
            this.show = true
            n == 1 ? this.pic = 'https://aliyunsso.edspay.com/web/about/certificate2.jpg?v=1.0' : this.pic = 'https://aliyunsso.edspay.com/web/about/license1-1.png'
        },
    },
}
</script>
<style>
.information .table7 li p{
    margin-bottom: 12px;
}
</style>

<style lang="scss" scoped>
.information {
    width: 100%;
    padding-bottom: 20px;
    .title {
         width: 100%;
        font-family: PingFangSC;
        line-height: 34px;
        font-size: 18px;
        text-align: left;
        color: #333333;
        margin-bottom: 40px;
        margin-top: 30px;
        padding-left: 44px;
        span{
        padding-left: 8px;
        font-weight: 700;
        }
        .num_box{   //改版后
            width: 87px;
            height: 54px;
            margin-bottom: 5px;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
    .table {
        padding: 0 0 0 30px;
        overflow: hidden;
        position: relative;
        margin-bottom: 20px;
        .picBtn,
        .picBtn1 {
            position: absolute;
            top: 124px;
            left: 677px;
            font-family: PingFangSC;
           font-size: 14px;
            color: #4E8CEE;
            z-index: 9;
            cursor:pointer;
        }
        .checkInfo{
            position: absolute;
            left: 633px;
            top: 17px;
            font-family: PingFangSC;
            font-size: 14px;
            color: #4E8CEE;
            z-index: 9;
            cursor:pointer;
        }
        li {
            float: left;
            width: 260px;
            height: 52px;
            font-size: 14px;
            color: #333333;
            margin-right: 2px;
            margin-bottom: 2px;
            background: #FFF9F6;
            font-family: PingFangSC-Regular;
            font-weight: 500;
            text-align: center;
            line-height: 52px;
        }
        li:nth-child(2n){
            font-family: PingFang-SC-Medium;
            text-align: center;
            font-size: 14px;
            color: #666666;
            width: 588px;
        }
        img {
            width: 100%;
            height: 100%;
            padding: 0 40px;
        }
    }
    .tips{
        width: 800px;
        margin: 0 auto;
        label{
            font-family: PingFang-SC-Medium;
            width: 122px;
            display: inline-block;
            vertical-align: top;
            font-size: 16px;
            color: #333333;
        }
        label.label1{
            font-size: 16px;
            color: #333333;
            margin-top: 77px;
        }
        .risk-img {
            margin: 0px 20px 54px 30px;
            width: 765px;
            height: 676px;
        }
        span{
            display: inline-block;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            color: #666666;
            width: 635px;
            margin-bottom: 20px;
            letter-spacing: 0;
        }
    }
    .showPic {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        background: rgba(0, 0, 0, 0.6);
        z-index: 9999999;
        // min-width: 1200px;
        .imgBox {
            position: absolute;
            top: 50px;
            bottom: 50px;
            left: 50%;
            transform: translateX(-50%);
            text-align: center;
            img {
                height: 100%;
            }
            .del{
                width: 24px;
                height: 24px;
                background: url(https://aliyunsso.edspay.com/web/about/del.png);
                position: absolute;
                top: 15px;
                right: 15px;
                cursor: pointer;
            }
        }
        .arrow{
            width: 36px;
            height: 66px;
            position: fixed;
            top: 50%;
            z-index: 99;
            cursor: pointer;
        }
        .leftArrow{
            background: url(https://aliyunsso.edspay.com/web/about/leftArrow.png);
            left: 20%;
        }
        .rightArrow{
            background: url(https://aliyunsso.edspay.com/web/about/rightArrow.png);
            right: 20%;
        }
        // .rightArrow:hover, .leftArrow:hover{
        //     border: 1px solid #777;
        // }
    }
}
</style>

