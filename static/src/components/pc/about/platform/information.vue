<!-- 关于我们  基本信息 -->
<template>
    <div class="information">
        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_01.png" alt="">
            </div>
            <span>基本信息</span>
        </div>
        <div class="table1">
            <div class="picBtn" @click="showPic(1)">查看验资报告</div>
            <!-- <div class="picBtn1" @click="showPic(2)">查看营业执照</div> -->
            <ul class="clear">
                <li v-for="v in table1">{{v}}</li>
            </ul>
        </div>

        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_02.png" alt="">
            </div>
            <span>股东信息</span>
        </div>

        <div class="table2">
            <ul>
                <li v-for="v in table2">{{v}}</li>
            </ul>
        </div>

        <div class="table4">
            <ul>
                <li v-for="v in table3">{{v}}</li>
            </ul>
        </div>

        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_03.png" alt="">
            </div>
            <span>组织架构</span>
        </div>
        <div class="table3">
            <img src="https://aliyunsso.edspay.com/web/about/disclosure10.png" alt="">
        </div>

        <div class="title">
             <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_04.png" alt="">
            </div>
            <span>从业人员概况</span>
        </div>
        <div class="practitioners">
            <!-- <p class="pre">截止到2017年9月13日，公司总人数超过200人，主要以学识、激情和创造力均处最佳状态的80、90后为主力,推动着E都市钱包的快速成长。</p> -->
            <div class="datas clear">
                <div class="apr">
                    <p>26%</p>
                    <p>47.5%</p>
                    <p>17.5%</p>
                    <p>9%</p>
                </div>
                <div class="apr1">
                    <p>85.5%</p>
                    <p>6%</p>
                    <p>8.5%</p>
                </div>
                <div id="echarts1">

                </div>
                <div id="echarts2">

                </div>
            </div>
            <div class="datas clear">
                <div class="apr">
                    <p>26.31%</p>
                    <p>47.37%</p>
                    <p>18.95%</p>
                    <p>7.37%</p>
                </div>
                <div class="apr1">
                    <p>92.63%</p>
                    <p>4.21%</p>
                    <p>3.16%</p>
                </div>
                <div id="echarts3">

                </div>
                <div id="echarts4">

                </div>
            </div>
        </div>

        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_05.png" alt="">
            </div>
            <span>网站及平台信息</span>
        </div>
        <div class="table6">
            <ul>
                <li v-for="v in table4">{{v}}</li>
                <!-- <li class="click"><p @click="show1 = true">点击查看</p></li> -->
            </ul>
        </div>

        <div class="title">
            <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_06.png" alt="">
            </div>
            <span>重大事项信息</span>
        </div>
        <div class="table7">
            <ul>
                <li v-for="v in table5" v-html="v"></li>
            </ul>
        </div>

        <!--弹出框-->
        <div class="showPic" v-if="show" @click="show = false">
            <div class="imgBox">
                <img :src="pic">
            </div>
        </div>
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
            table1: ['公司名称及简称', 'E都市钱包运营主体为浙江楚橡信息科技有限公司（简称E都市钱包）','统一社会信用代码','91330100328203207W', '注册资本', '10000万元', '实缴资本', '10000万元', '注册地址', '浙江省杭州市萧山区湘湖金融小镇二期中区南岸3号楼492室', '成立时间', '2015-04-10', '经营期限', '2015年4月10日至2035年4月9日', '经营状态', '开业', '法定代表人', '吴宇青', '经营范围', '服务：电子商务、电子产品、通讯设备、动漫网络游戏、自动化控制系统的技术开发，投资咨询（除证券、期货），网页设计，动画设计（限计算机）；销售：玩具，日用百货，通讯设备，电子产品，计算机软硬件；其他无需报经审批的一切合法项目**（依法须经批准的项目，经相关部门批准后方可开展经营活动）'],
            table2: ['实际控制人及股东名单', '实际控制人', '吴宇青', '控股股东', '吴宇青', '20%', '浙江阿拉丁控股集团有限公司', '80%'],
            table3: ['董事、监事、高级管理人员名单', '执行董事', '刘涛', '监事', '赵超'],
            table4: ['官方网站', 'www.edspay.com', '手机APP应用', 'E都市钱包', '微信公众号', 'E都市钱包、E都市钱包服务号', '新浪微博', 'E都市钱包', '客服热线','4001353388'],
            table5: ['合并、分立、解散或者申请破产', '无','从业机构受到刑事处罚', '无', '从业机构受到重大行政处罚', '无', '重大诉讼或者仲裁事项', '无', '实际控制人与5%以上的股东、董事、监事、高级管理人员的变更信息', '<p>2018年2月26日，执行董事变更为刘涛，监事变更为赵超，总经理变更为吴宇青</p><p>2018年5月23日，原股东浙江阿拉丁电子商务股份有限公司、杭州阿拉丁数字技术有限公司变更为浙江阿拉丁控股集团有限公司</p>', '实际控制人与持股 5%以上的股东、董事、监事、高级管理人员涉及的重大诉讼、仲裁事项或者重大行政处罚', '无', '其他变更事项', '<p>2018年1月5日，注册地址由杭州市滨江区西兴街道江陵路2028号星耀城1幢2302室变更为浙江省杭州市萧山区湘湖金融小镇二期中区南岸3号楼492室</p><p>2018年2月26日，公司名称由“浙江楚橡信息科技股份有限公司”变更为“浙江楚橡信息科技有限公司”</p>'],
            picUrl:[
                'https://aliyunsso.edspay.com/web/about/alertPic1.png',
                'https://aliyunsso.edspay.com/web/about/alertPic2.png',
                'https://aliyunsso.edspay.com/web/about/alertPic3.png'
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
        myChart1(a, b, c, d, e) {
            let myChart = a;
            let option = {
                color: b,
                title: {
                    text: c,
                    x: '35%',  // 标题位置
                    y: '10%',
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold',
                        color:'#333'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: '60%',     // 备注位置
                    y: '35%',
                    data: d,
                    textStyle: {
                        height: '80',
                        fontSize: '12',
                        color: '#666'
                    }
                },
                series: [
                    {
                        name: ' ',
                        type: 'pie',
                        radius: ['30%', '50%'],
                        center: [120, 130],     // 圆位置
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '14',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: e,
                    }
                ]
            };
            myChart.setOption(option);
        }
    },
    mounted(){
        let id = echarts.init(document.getElementById('echarts1'))
        let id1 = echarts.init(document.getElementById('echarts2'))
        let id2 = echarts.init(document.getElementById('echarts3'))
        let id3 = echarts.init(document.getElementById('echarts4'))
        let color = ["#2c82be", "#76ddfb", "#48b0ff", "#dbecf8"]
        let color1 = ["#ffb368", "#ff7e4e", "#ffd565"]
        let title = '员工整体年龄结构'
        let title1 = '员工整体学历结构'
        let title2 = '技术人员年龄结构'
        let title3 = '技术人员学历结构'
        let legendData = ['25岁以下', '25～30岁', '31～35岁', '36岁以上']
        let legendData1 = ['大专及本科', '硕士及博士', '其他']
        let data = [
            { value: 52, name: '25岁以下' },
            { value: 95, name: '25～30岁' },
            { value: 35, name: '31～35岁' },
            { value: 18, name: '36岁以上' }
        ]
        let data1 = [
            { value: 171, name: '大专及本科' },
            { value: 12, name: '硕士及博士' },
            { value: 17, name: '其他' }
        ]
        let data2 = [
            { value: 25, name: '25岁以下' },
            { value: 45, name: '25～30岁' },
            { value: 18, name: '31～35岁' },
            { value: 7, name: '36岁以上' }
        ]
        let data3 = [
            { value: 88, name: '大专及本科' },
            { value: 4, name: '硕士及博士' },
            { value: 3, name: '其他' }
        ]
        this.myChart1(id, color, title, legendData, data)  // 封装一下  直接传参数调用话术函数
        this.myChart1(id1, color1, title1, legendData1, data1)
        this.myChart1(id2, color, title2, legendData, data2)
        this.myChart1(id3, color1, title3, legendData1, data3)
    }
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
    .table1 {
        padding: 0 0 0 30px;
        overflow: hidden;
        position: relative;
        margin-bottom: 60px;
        .picBtn,
        .picBtn1 {
            position: absolute;
            top: 178px;
            left: 645px;
            font-family: PingFangSC;
           font-size: 14px;
            color: #4E8CEE;
            z-index: 9;
        }
        li {
            float: left;
            width: 260px;
            height: 52px;
            margin-right: 2px;
            margin-bottom: 2px;
            background: #FFF9F6;
            font-family: PingFangSC-Regular;;
            font-size: 14px;
            font-weight: 400;
            text-align: center;
            color: #333333;
            line-height: 52px;
        }
        li:nth-child(2n){
            font-family: PingFang-SC-Medium;
            text-align: center;
            color: #666666;
            padding: 0 30px;
            margin-right: 0;
            width: 600px;
            font-size: 14px;
        }
        li:nth-child(1),
        li:nth-child(2) {
            font-size: 14px;
            background: #FF9769;
            color: #FFFFFF;
            font-weight: 300;
            opacity: 1;
        }
        li:nth-child(21) {
            height: 160px;
            line-height: 160px;
        }
        li:nth-child(22) {
            height: 160px;
            line-height: 26px;
            padding-top: 15px;
            text-align: justify;
        }
    }
    .table2 {
        padding-left: 40px;
        overflow: hidden;
        margin-bottom: 50px;
        li {
            float: left;
            width: 280px;
            height: 62px;
            margin-right: 2px;
            margin-bottom: 2px;
            background: #FFF9F6;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            text-align: center;
            color: #333333;
            line-height: 62px;
        }
        li:nth-child(3){
            width: 588px;
            text-align: center;
            color: #333;
            font-size: 14px;
            font-family: PingFang-SC-Regular;
        }
        li:nth-child(1){
            width: 850px;
            background: #FF9769 ;
            font-weight: 300;
            color: #FFFFFF; 
            opacity: 1;
        }
        li:nth-child(2){
            width: 260px;
            font-size: 14px;
        }
        li:nth-child(4) {
            width: 260px;
            height: 126px;
            font-size: 14px;
            line-height: 126px;
        }

        li:nth-child(5),
        li:nth-child(7),
        li:nth-child(9) {
            width: 360px;
            padding: 0 30px;
            font-family: PingFang-SC-Regular;
        }
        li:nth-child(6),
        li:nth-child(8),
        li:nth-child(10) {
            width: 226px;
            font-family: PingFang-SC-Regular;
        }
    }
    .table3 {
        width: 782px;
        height: 353px;
        margin: 0 auto;
        margin-bottom: 50px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .table4{
        padding-left: 40px;
        overflow: hidden;
        margin-bottom: 60px;
        li {
            float: left;
            width: 280px;
            height: 62px;
            margin-right: 2px;
            margin-bottom: 2px;
            background: #FFF9F6;
            font-family: PingFangSC-Regular;
            font-size: 14px;
            text-align: center;
            color: #333333;
            line-height: 62px;
        }
        li:nth-child(1){
            width: 850px;
            background: #FF9769;
            font-weight: 300;
            opacity: 1;
            color: #FFFFFF; 
        }
        li:nth-child(2),
        li:nth-child(4) {
            width: 260px;
            font-size: 14px;
            color: #333333;
        }
        li:nth-child(3),
        li:nth-child(5) {
            width: 588px;
            padding: 0 30px;
            font-size: 14px;
            font-family: PingFang-SC-Regular;
        }
    }
    .table5{
        padding-left: 40px;
        overflow: hidden;
        margin-bottom: 60px;
        li {
            color: #333;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            text-align: center;
            line-height: 62px;
            background: #FFF9F6;
        }
    }
    .table6{
        padding-left: 40px;
        overflow: hidden;
        margin-bottom: 60px;
        li{
            float: left;
            color: #333;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            line-height: 62px;
            background: #FFF9F6;
            margin: 0 2px 2px 0;
            width: 588px;
            padding-left: 60px;
            text-align: center;
        }
        li:nth-child(2n+1){
            width: 260px;
            padding-left: 0px;
            font-weight: 300;
            font-size: 14px;
        }
        li.click p{
            color: #4E8CEE;
            cursor: pointer;
        }
    }
    .table7{
         padding-left: 40px;
        overflow: hidden;
        margin-bottom: 60px;
        li{
            float: left;
            color: #333;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            height: 62px;
            background: #FFF9F6;
            margin: 0 2px 2px 0;
            width: 588px;
            line-height: 62px;
            padding: 0 10px;
             text-align: center;
        }
        li:nth-child(2n+1){
            width: 260px;
            font-size: 14px;
        }
        
        li:nth-child(9),
         li:nth-child(10){
            height: 135px;
            line-height: 26px;
            padding: 12px 26px 0;
            text-align: left;
        }
        li:nth-child(9){
            padding-top: 30px;
        }
        li:nth-child(10){
            padding-top: 26px;
        }
        li:nth-child(11),
         li:nth-child(12){
             height: 128px;
            line-height: 26px;
            text-align: left;
            padding: 12px 26px 0;
        }
        li:nth-child(12){
            line-height: 128x;
            text-align: center;
        }
        li:nth-child(13),
         li:nth-child(14){
            height: 150px;
            padding: 12px 26px 0;
             line-height: 150px;
        }
        li:nth-child(14){
             line-height: 22px;
             text-align: left;
        }
    }
    .practitioners{
        width: 100%;
        height: auto;
        padding-left: 40px;
        p {
            width: 797px;
            line-height: 25px;
            font-family: PingFangSC;
            font-size: 14px;
            text-align: left;
            color: #666666;
            padding: 0 8px;
        }
        .datas {
            width: 100%;
            height: 290px;
            position: relative;
            .apr,
            .apr1 {
                position: absolute;
                top: 30%;
                left: 34%;
                float: left;
                p {
                    font-size: 12px;
                }
            }
            .apr1 {
                left: 85%;
            }
            #echarts1,
            #echarts2,
            #echarts3,
            #echarts4 {
                width: 415px;
                height: 252px;
                float: left;
                background: #FFF9F6!important;
                padding-top: 20px;
            }
            #echarts1,#echarts3{
                 margin-right: 20px;
            }
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
        }
        label.label1{
            font-size: 14px;
            color: #333333;
            margin: 50px 0;
        }
        .risk-img {
            margin: 40px auto;
            width: 765px;
            height: 676px;;
        }
        span{
            display: inline-block;
            font-family: PingFang-SC-Regular;
            font-size: 14px;
            color: #151515;
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

