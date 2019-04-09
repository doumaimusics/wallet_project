<template>
    <div class="operate">
    	<div class="operateTitle"><i></i>出借数据<span>INVESTMENT DATA</span></div>
      <div class="operateData">
        <el-row :gutter="0">
          <el-col :span="6"><div class="numberVal">33,991.00</div><div class="key">累计出借额(万元)</div></el-col>
          <el-col :span="6"><div class="numberVal">4.82</div><div class="key">累计成交笔数(万笔）</div></el-col>
          <el-col :span="6"><div class="numberVal">10.79</div><div class="key">注册用户数(万人)</div></el-col>
          <el-col :span="6"><div class="numberVal borNo">149.00</div><div class="key">为用户带来的收益(万元)</div></el-col>
        </el-row>
      </div>
      <div class="operateTitle"><i></i>出借榜单<span>INVESTMENT LIST</span></div>
      <div id="dataList">

      </div>
    </div>
</template>

<script>
  export default {
	name: 'operate',
	data(){
      return {
        
      }
    },
    methods:{
      drawGraph: function() {
          var vm = this;
          var myChart = echarts.init(document.getElementById('dataList'));
         var option = {
            title: {
                text: '60s',
                subtext: '最快满标时间',
                x: 'center',
                y: '180',
                itemGap:10,  // 主副标题纵向间隔
                textStyle:{   //主标题字体样式
                  fontSize:40,
                  color:"#2a9ffc",
                  lineHeight:50
                },
                subtextStyle:{  // 副标题字体样式
                  color: "#2a9ffc",
                  fontSize: 16
                }
          },
          color:["#8ccdfd","#2a9ffc","#137cd3"],
            tooltip: {
                trigger: 'item',
                formatter: "{b}: {c}"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                y: 'bottom',
                data:['直接访问','邮件营销','联盟广告','视频广告']
            },
            series: [
                {
                   // name:'访问来源',
                    type:'pie',
                    radius: ['40%', '55%'],
                    hoverAnimation:true, // 开启 hover 在扇区上的放大动画效果。
                    avoidLabelOverlap: true,
                   // center: [400, 300],    // 饼状图相对坐标的位置
                    label: {
                      normal: {
                          show: true,    // 指示器开关。
                          formatter: '{c}',
                          textStyle: {
                            fontSize: '20'
                          }
                      },
                      emphasis: {
                            show: true,    
                            textStyle: {
                                fontSize: '20'
                                // fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine:{   //  视觉引导线的样式
                      normal:{
                          show: true, 
                          length:30,
                          length2:50
                      }
                    },
                    data:[
                        {value:'600.00', name:'单笔最高出借(元)'},
                        {value:310, name:'单日最高成交额(元)'},
                        {value:234, name:'每月最高累计成交额(元)'}
                    ]
                }
            ]
        };
          myChart.setOption(option);
      }

    },
    mounted:function(){
      this.drawGraph()
    }
  }  
</script>

<style lang="scss">
.operate{
  width: 100%;
  height:auto;
  margin: 0 auto;
  padding-bottom: 40px;
  .operateTitle{
    width: 100%;
    height: 44px;
    font-size:22px;
    color:#333;
    font-weight: 600;
    span{
      font-weight: 300;
      width: 115px;
      font-size:14px;
      margin-left: 10px;
    }
    i{
      display:inline-block;
      width: 4px;
      height: 24px;
      background:#fc4147;
      margin-top: 10px;
      margin-right: 15px;
      vertical-align: sub;
    }
  }
  .operateData{
    width: 100%;
    height: 160px;
    background-color: #ffffff;
    box-shadow: 0px 6px 20px 0 rgba(204, 204, 204, 0.26);
    border: solid 1px rgba(0, 0, 0, 0.05);
     padding-top:30px;
     margin-bottom:30px;
    .el-col{
        height:100px;
        text-align: center;
        border-right: solid 1px rgba(0, 0, 0, 0.05);
        .numberVal{
          width: 100%;
          height: 36px;
          font-size: 26px;
          line-height: 36px;
          text-align: center;
          color: #333333;
          margin-top:14px;
          font-family:"微软雅黑";
          font-weight:bold;
        }
        .numberVal.borNo{
          border:0;
        }
        .key{
          width: 100%;
          height: 26px;
          font-size: 16px;
          line-height: 26px;
          text-align: center;
          color: #333333;
          margin-top:8px;
        }
    }
  }
  #dataList{
    width: 100%;
    height: 440px;
    background-color: #ffffff;
    box-shadow: 0px 6px 20px 0 rgba(204, 204, 204, 0.26);
    border: solid 1px rgba(0, 0, 0, 0.05);
  }
}  
</style>