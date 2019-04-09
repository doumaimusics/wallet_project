<!-- 团队风采 -->
<template>
    <div class="teamMien">
        <div class="title">
            <i></i>员工情况</div>
        <p class="pre">截止到2017年9月13日，公司总人数超过200人，主要以学识、激情和创造力均处最佳状态的80、90后为主力,推动着E都市钱包的快速成长。</p>
        <div class="datas">
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
        <p class="pre" style="margin:30px 0;">其中技术人员95人，具体人员分布情况如下：</p>
        <div class="datas">
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
        <div class="title">
            <i></i>工作环境</div>
        <div class="work">
            <ul>
                <li><img src="https://aliyunsso.edspay.com/web/about/work1.png" alt=""></li>
                <li><img src="https://aliyunsso.edspay.com/web/about/work2.png" alt=""></li>
                <li><img src="https://aliyunsso.edspay.com/web/about/work3.png" alt=""></li>
            </ul>
        </div>
        <div class="title">
            <i></i>团队建设</div>
        <div class="work">
            <ul>
                <li><img src="https://aliyunsso.edspay.com/web/about/teamActivity1.png" alt=""></li>
                <li><img src="https://aliyunsso.edspay.com/web/about/teamActivity2.png" alt=""></li>
                <li><img src="https://aliyunsso.edspay.com/web/about/teamActivity3.png" alt=""></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        myChart1(a, b, c, d, e) {
            let myChart = a;
            let option = {
                color: b,
                title: {
                    text: c,
                    x: '7%',
                    y: '85%',
                    textStyle: {
                        fontSize: '16',
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: '52%',
                    y: '30%',
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
                        center: [100, 130],
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
    mounted() {
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
        // let apr1 = '<div class="apr"style="position:absolute;top:30%;left:70%;line-height:24px;font-size:12px;color:#666;><p>26 %</p><p>47.5%</p><p>17.5%</p><p>9%</p></div>'
        // $("#echarts1").prepend(apr1)
    }
}
</script>

<style lang="scss" scoped>
.teamMien {
    padding: 0 53px 80px 30px;
    width: 100%;
    .title {
        width: 100%;
        height: 34px;
        font-family: PingFangSC;
        line-height: 34px;
        font-size: 24px;
        font-weight: 500;
        text-align: left;
        color: #333333;
        margin-bottom: 40px;
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
    p {
        text-indent: 2em;
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
            width: 50%;
            height: 290px;
            float: left;
        }
    }
    .work{
        height: 178px;
        width: 100%;
        ul{
            width: 100%;
            height: 100%;
            padding:0 0 0 10px;
            li{
                float: left;
                margin-right: 18px;
                img{
                    width: 261px;
                    height: 178px;
                }
            }
            li:nth-child(3){
                margin-right: 0;
            }
        }
    }
}
</style>


