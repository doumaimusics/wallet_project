<template>
    <div id="matter">
        <div class="banner"></div>
        <div class="title">
            <i></i>重大事项</div>
        <ul>
            <li v-for="item in list">{{item}}</li>
            <li>持股5%以上的股东变更：</br>无</br>董事、监事变更：</br>无</br>高级管理人员变更：</br>无</li>
            <li>实际控制人与持股 5%以上的股东、董事、监事、高级管理人员涉及的重大诉讼、仲裁事项或者重大行政处罚</li>
            <li>无</li>
            <li style="height: 180px;line-height: 180px;">其他变更事项</li>
            <li style="height: 180px; line-height: 28px;padding-top:7px">2018年1月5日，注册地址由杭州市滨江区西兴街道江陵路2028号星耀城1幢2302室变更为浙江省杭州市萧山区湘湖金融小镇二期中区南岸3号楼492室</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: ['合并、分立、解散或者申请破产', '无', '从业机构受到刑事处罚', '无', '从业机构受到重大行政处罚', '无', '重大诉讼或者仲裁事项', '无', '实际控制人与5%以上的股东、董事、监视、高级管理人员的变更信息']
        }
    }
}
</script>

<style lang="scss" scoped>
#matter {
    padding-bottom: 70px;
    overflow: hidden;
    .title {
        width: 100%;
        height: 34px;
        font-family: PingFangSC;
        line-height: 34px;
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        margin-bottom: 45px;
        margin-top: 60px;
        i {
            display: inline-block;
            width: 4px;
            height: 24px;
            background: #fc4147;
            margin-top: 4px;
            margin-right: 10px;
            vertical-align: top;
        }
    }
    .banner {
        width: 900px;
        height: 218px;
        background: url(https://aliyunsso.edspay.com/web/about/dynamicBanner.png);
        background-size: 100% 100%;
        margin-left: -6px;
    }
    ul {
        width: 800px;
        height: auto;
        margin: 0 auto;
        li {
            width: 537px;
            height: 50px;
            background-color: #fffaf5;
            margin-right: 3px;
            margin-bottom: 3px;
            float: left;
            font-size: 16px;
            text-align: center;
            color: #333333;
            line-height: 50px;
            padding: 0 49px;
        }
        li:nth-child(2n) {
            width: 257px;
            padding: 0 30px;
        }
        li:nth-child(9),li:nth-child(10) {
            height: 180px;
            line-height: 26px;
            padding-top: 16px;
        }
        li:nth-child(9){
             padding-top: 68px;
        }
        li:nth-child(11),li:nth-child(12) {
            height: 90px;
            padding-top: 20px;
            line-height: 22px;
        }
        li:nth-child(12){
            line-height: 50px;
        }
    }
}
</style>
