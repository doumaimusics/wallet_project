<template>
    <div id="transaction">
      <div class="title">
         <div class="num_box">
                <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_01.png" alt="">
          </div>
          <span>交易数据</span>
      </div>
      <div class="detail clear">
      <!-- 交易额 -->
        <div class="moneyData echar-box fl">
            <div class="name">
              <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
              交易额
              <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
            <div class="topTab clear">
                <span @click="switchover(moneyTab,'day','month')" class="day" :class="{active:moneyTab.day}">近7日</span>
                <span @click="switchover(moneyTab,'month','day')" class="month" :class="{active:moneyTab.month}">按月</span>
            </div>
            <div class="echarts">
                <div id="moneyLine" class="line" :class="{isOpacity:!moneyTab.day}"></div>
                <div id="moneyBar" class="bar" :class="{isOpacity:!moneyTab.month}"></div>
                <div class="time">
                    <!-- <div class="box"></div> -->
                    <ul v-if="moneyTab.month">
                        <li @click="choose(moneyYear,0)" :class="{activeLi:moneyYear[0]}">2017</li>
                        <li @click="choose(moneyYear,1)" :class="{activeLi:moneyYear[1]}">2018</li>
                    </ul>
                </div>
            </div>
        </div>
      <!-- 新增用户数 -->
      <div class="moneyData echar-box fl">
          <div class="name">
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
            新增用户数
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
          </div>
          <div class="topTab clear">
              <span @click="switchover(peopleTab,'day','month')" class="day" :class="{active:peopleTab.day}">近7日</span>
              <span @click="switchover(peopleTab,'month','day')" class="month" :class="{active:peopleTab.month}">按月</span>
          </div>
          <div class="echarts">
              <div id="newLine" class="line" :class="{isOpacity:!peopleTab.day}"></div>
              <div id="newBar" class="bar" :class="{isOpacity:!peopleTab.month}"></div>
              <div class="time">
                  <!-- <div class="box"></div> -->
                  <ul v-if="peopleTab.month">
                      <li @click="choose(peopleYear,0)" :class="{activeLi:peopleYear[0]}">2017</li>
                      <li @click="choose(peopleYear,1)" :class="{activeLi:peopleYear[1]}">2018</li>
                  </ul>
              </div>
          </div>
      </div>

      <div class="div-line fl"></div>

      <!-- 出借用户数 -->
      <div class="moneyData echar-box fl">
          <div class="name">
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
            出借用户数
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
          </div>
          <div class="topTab clear">
              <span @click="switchover(loanTab,'day','month')" class="day" :class="{active:loanTab.day}">近7日</span>
              <span @click="switchover(loanTab,'month','day')" class="month" :class="{active:loanTab.month}">按月</span>
          </div>
          <div class="echarts">
              <div id="lendLine" class="line" :class="{isOpacity:!loanTab.day}"></div>
              <div id="lendBar" class="bar" :class="{isOpacity:!loanTab.month}"></div>
              <div class="time">
                  <!-- <div class="box"></div> -->
                  <ul v-if="loanTab.month">
                      <li @click="choose(loanYear,0)" :class="{activeLi:loanYear[0]}">2017</li>
                      <li @click="choose(loanYear,1)" :class="{activeLi:loanYear[1]}">2018</li>
                  </ul>
              </div>
          </div>
      </div>
      <!-- 投资笔数 -->
      <div class="moneyData echar-box fl">
          <div class="name">
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
            投资笔数
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
          </div>
          <div class="topTab clear">
              <span @click="switchover(investTab,'day','month')" class="day" :class="{active:investTab.day}">近7日</span>
              <span @click="switchover(investTab,'month','day')" class="month" :class="{active:investTab.month}">按月</span>
          </div>
          <div class="echarts">
              <div id="investLine" class="line" :class="{isOpacity:!investTab.day}"></div>
              <div id="investBar" class="bar" :class="{isOpacity:!investTab.month}"></div>
              <div class="time">
                  <!-- <div class="box"></div> -->
                  <ul v-if="investTab.month">
                      <li @click="choose(investYear,0)" :class="{activeLi:investYear[0]}">2017</li>
                      <li @click="choose(investYear,1)" :class="{activeLi:investYear[1]}">2018</li>
                  </ul>
              </div>
          </div>
      </div>


      <!-- 投资笔数 -->
      <div class="moneyData echar-box echar-box5 fl">
          <div class="name">
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
            为用户带来收益
            <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
          </div>
          <div class="redNum">{{pieSum | moneyFormat}}</div>
          <div class="echarts echarts5">
              <div id="investPie" class="pie fl"></div>
              <div class="content fl">
                  <div class="hasMoney">
                      <div class="text"><i class="i1"></i>已赚取收益</div>
                      <h4>{{pieData[0].value ? pieData[0].value:0 | moneyFormat}}元</h4>
                  </div>
                  <div class="hasMoney">
                      <div class="text"><i class="i2"></i>待赚取收益</div> 
                      <h4>{{pieData[1].value ? pieData[1].value:0 | moneyFormat}}元</h4>
                  </div>
              </div>
          </div>
      </div>
      </div>
    </div>
</template>

<script>
    export default{
      data(){
        return{
          tabList:['交易数据','资产端数据','风险数据','用户画像','运营报告'],
          moneyTab:{day:true,month:false},
          peopleTab:{day:true,month:false},
          loanTab:{day:true,month:false},
          investTab:{day:true,month:false},
          moneyYear:[false,true],
          peopleYear:[false,true],
          loanYear:[false,true],
          investYear:[false,true],

          unit:['元','人','人','笔'],

          moneyData:{day:[],data:[]},//交易额
          newData:{day:[],data:[]},//新增用户量
          lendData:{day:[],data:[]},//出借用户
          investData:{day:[],data:[]},//投资笔数

          moneyBarData:{//交易额
            day:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            data:[]
          },
          newBarData:{//新增用户量
            day:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            data:[]
          },
          lendBarData:{//出借用户
            day:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            data:[]
          },
          investBarData:{//投资笔数
            day:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            data:[]
          },
          pieData:[
            {value:0,name:'已赚取收益'},
            {value:0,name:'待赚取收益'}
          ],
          pieSum:0,
        }
      },
      props:['numFormat'],
      methods:{
        getLineData(echarData,url,dataObj,id,name,yType){
          this.notLogPost(url,(data) =>{
            if(data.resCode){
              for(var i=0;i<data.resData.data.length;i++){
                echarData.day.push(data.resData.data[i].add_time.substr(-5));
                echarData.data.push(data.resData.data[i].sumMoney ? data.resData.data[i].sumMoney:data.resData.data[i].num);
              }
            }
            console.log(echarData);
            console.log(id);
            this.getLine(id,echarData,name,yType); 
          },dataObj)
        },
        getBarData(echarData,url,dataObj,id,name,yType){
          this.notLogPost(url,(data) =>{
            if(data.resCode){
              for(var i=0;i<data.resData.data.length;i++){
                echarData.data.push(data.resData.data[i].sumMoney ? data.resData.data[i].sumMoney:data.resData.data[i].num);
              }
              this.getBar(id,echarData,name,yType,dataObj.yearParam); 
            }
          },dataObj)
        },
        getPieData(echarData,url,dataObj,id,name){
          this.notLogPost(url,(data) =>{
            if(data.resCode){
              this.$set(echarData,0,{value:data.resData.data.haveToEarn.toFixed(2),name:'已赚取收益'})
              this.$set(echarData,1,{value:data.resData.data.waitToEarn,name:'待赚取收益'})
              this.pieSum = data.resData.data.allEarnings;
              
              this.getPie(id,echarData,name);
            }
          },dataObj)
        },
        choose(data,num){
          var yearNum = 2018; //年份
          for(var i=0;i<data.length;i++){
            this.$set(data,i,false);
          }
          if(num == 0){
            yearNum = 2017;
          }else{
            yearNum = 2018
          }
          this.$set(data,num,true);

          if(data == this.moneyYear){
            this.getYearData(this.moneyBarData,yearNum,'/borrow/tender/query/sum','moneyBar','交易额',0);
          }else if(data == this.peopleYear){
            this.getYearData(this.newBarData,yearNum,'/user/query/sum','newBar','新增用户数',1);
          }else if(data == this.loanYear){
            this.getYearData(this.lendBarData,yearNum,'/borrow/query/countLendUser','lendBar','出借用户数',2);
          }else if(data == this.investYear){
            this.getYearData(this.investBarData,yearNum,'/borrow/tender/query/InvistMentNum','investBar','投资笔数',3);
          }
        },
        getYearData(data,yearNum,dataUrl,bar,name,yType){
          data = {
              day:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              data:[]
          }
          this.getBarData(data,dataUrl,{chooseType:'year',yearParam:yearNum},bar,name,yType)

        },
        switchover(data,num1,num2){
          data[num1] = true;
          data[num2] = false;
        },
        
        toTab(item,index){
          for(let i=0;i<this.activeLi.length;i++){
            this.$set(this.activeLi,i, false);
          }
          this.$set(this.activeLi, index, true);
          this.getTabContent(item.id)
        },
        getLine(id,lineData,name,yType){
          var that = this;
          var line = echarts.init(document.getElementById(id));

          var lineOption = {
              tooltip: {
                  show:true,
                  trigger: 'axis',
                  triggerOn:'mousemove|click',
                  formatter: function(datas){
                      var res = datas[0].name + '<br/>', val;
                      for(var i = 0, length = datas.length; i < length; i++) {
                        if(yType == 0){
                          val = that.numFormat((datas[i].value))+'.00'  + that.unit[yType];
                        }else{
                          val = that.numFormat((datas[i].value))  + that.unit[yType];
                        }
                        res += datas[i].seriesName + '：' + val + '<br/>';
                      }
                      return res;
                  },
                  textStyle:{
                    fontSize:12,
                  }
              },
              legend:{
                  left:'2%',
                  right:0,
                  textStyle:{
                      color:'#FF5B4C'
                  }
              },
              grid: {
                  left: '5%',
                  right: '9%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis:  {
                  show:true,
                  type: 'category',
                  boundaryGap: false,
                  data: lineData.day,
                  axisLine:{
                      show:true,
                      lineStyle:{
                        color:'#ccc'
                      }
                  },
                  axisTick:{
                      show:true,
                  },
                  splitLine:{
                      show:false,
                      lineStyle:{
                          color:'#aaa',
                          type:'dashed',
                      },
                  },
                  nameTextStyle:{
                      color:'#aaa',
                      fontSize:13
                  }
              },
              yAxis: {
                  type:'value',
                  offset:0,
                  axisLabel:{
                    formatter:function(value){
                      if(yType == 0){
                        return value/10000 +'万'
                      }else{
                        return value;
                      }
                    },
                    textStyle:{fontSize:9,color:'#aaa'}
                  },
                  boundaryGap:['0%','0%'],
                  axisLine:{show:false},
                  axisTick:{show:false},
                  splitLine: {show: false,},
              },
              series: [
                  {
                      symbolSize:4,
                      name:name,
                      type:'line',
                      data:lineData.data,
                      itemStyle:{
                          normal:{
                              color:'#4CB1FF',
                              label:{
                                  show:false,
                              },
                              lineStyle:{
                                  color:'#4CB1FF',
                              },
                              areaStyle: {
                                  type: 'default',
                                  color:'#4CB1FF'
                              }
                          }
                      },
                      lineStyle:{
                          color:'#4CB1FF',
                      }
                  },
              ]
          };
          line.setOption(lineOption);
        },
        getBar(id,barData,name,yType,yearNum){
          var that = this;
          var bar = echarts.init(document.getElementById(id));

          var barOption = {
                color: ['#4CB1FF'],
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function(datas){
                        var res = yearNum+'-'+datas[0].name + '<br/>', val;
                        for(var i = 0, length = datas.length; i < length; i++) {
                              if(yType == 0){
                                val = that.numFormat((datas[i].value))+'.00'  + that.unit[yType];
                              }else{
                                val = that.numFormat((datas[i].value))  + that.unit[yType];
                              }
                              //val = that.numFormat((datas[i].value))   + that.unit[yType];
                              res += datas[i].seriesName + '：' + val + '<br/>';
                          }
                          return res;
                    },
                },
                grid: {
                    left: '5%',
                    right: '9%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : barData.day,
                        axisTick: {
                            alignWithLabel: true
                        },
                        nameTextStyle:{
                         fontSize:10
                        },
                        axisLabel:{
                          textStyle:{fontSize:9,color:'#aaa'}
                        },
                        axisLine:{
                          show:true,
                          lineStyle:{
                            color:'#ccc'
                          }
                        }
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine:{show:false},
                        axisTick:{show:false},

                        axisLabel:{
                          formatter:function(value,index){
                            if(yType == 0){
                              return value/100000000+'亿'
                            }else{
                              return value
                            }
                          },
                          textStyle:{fontSize:9,color:'#aaa'}
                        },
                    }
                ],
                series : [
                    {
                        name:name,
                        type:'bar',
                        barWidth: '40%',
                        data:barData.data,
                        itemStyle:{
                             normal:{
                                 barBorderRadius:[2,2,0,0]
                             }
                        }
                    }
                ]
          }

          bar.setOption(barOption);
        },
        getPie(id,pieData,name){
          var pie = echarts.init(document.getElementById(id));

          var pieOption = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:name,
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    color:['#4CB1FF','#9DD4FF'],
                    hoverOffset:5,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '10',
                                fontWeight: 'bold',
                                color:'#4CB1FF'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false,

                        }
                    },
                    data:pieData
                }
            ]
          }

          pie.setOption(pieOption);
        }
      },
      created(){
        
      },
      mounted(){
        var that =this;

        this.getLineData(this.moneyData,'/borrow/tender/query/sum',{chooseType:'day'},'moneyLine','交易额',0)
        this.getLineData(this.newData,'/user/query/sum',{chooseType:'day'},'newLine','新增用户数',1)
        this.getLineData(this.lendData,'/borrow/query/countLendUser',{chooseType:'day'},'lendLine','出借用户数',2)
        this.getLineData(this.investData,'/borrow/tender/query/InvistMentNum',{chooseType:'day'},'investLine','投资笔数',3)

        this.getPieData(this.pieData,'/query/getEarnForUser',{},'investPie','收益')

        this.getBarData(this.moneyBarData,'/borrow/tender/query/sum',{chooseType:'year',yearParam:2018},'moneyBar','交易额',0)
        this.getBarData(this.newBarData,'/user/query/sum',{chooseType:'year',yearParam:2018},'newBar','新增用户数',1)
        this.getBarData(this.lendBarData,'/borrow/query/countLendUser',{chooseType:'year',yearParam:2018},'lendBar','出借用户数',2)
        this.getBarData(this.investBarData,'/borrow/tender/query/InvistMentNum',{chooseType:'year',yearParam:2018},'investBar','投资笔数',3)

      }
    }
</script>

<style lang="scss" scoped>
    #transaction{
    .title{
      width: 100%;
        font-family: PingFangSC;
        line-height: 34px;
        font-size: 18px;
        text-align: left;
        color: #333333;
        margin-bottom: 40px;
        margin-top: 30px;
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
    .detail{
      padding:0 0 0 0px;
      .name{
        font-family:DIN-Regular;
        font-size:16px;
        line-height:22px;
        padding-bottom:23px;
        padding-top:30px;
        text-align:center; 
        img{
          height:5px;
          width:8px;
          margin:0 3px;
        }
      }
      .echar-box{width:380px;margin-right:40px;}
      .echar-box5{height:310px;margin-right:40px;width:100%;}

      .moneyData{
        .topTab{
          text-align:center;
          span{
            display:inline-block;
            height:28px;
            width:60px;
            font-size:12px;
            line-height:26px;
            border:1px solid #4CB1FF;
            border-radius:4px;
            margin: 0  10px;
            color:#333;
          }
          .active{
            background:#4CB1FF;
            color:#fff;
          }
        }
        .redNum{
          margin-top:-10px;
          font-size:21px;
          line-height:30px;
          font-family:PingFangSC-Regular;
          text-align:center;
          color: #333;
          padding-bottom:10px;
        }
        .echarts{
            height:350px;
            position:relative;
            .time{
                padding-top:300px; 
                .box{
                    height:4px;
                    width:300px;
                    margin:0 auto;
                    border:1px solid rgba(76,177,255,0.35);
                    border-top: 0;
                }
                ul{
                  text-align:center;
                  padding-top:10px;
                  li{
                    display:inline-block;
                    height:20px;
                    width:50px;
                    border:1px solid #4CB1FF;
                    border-radius:3px;
                    color: #4CB1FF;
                    line-height:18px;
                    font-size:12px;
                  }
                  .activeLi{
                    background:#4CB1FF;
                    color:#fff;
                  }
                }
      
            }
        }
        .echarts5{height:300px;width:46%;margin:0 auto;}
        .line{height:300px;width:100%;position:absolute;top:0;left:0;z-index:5}
        .bar{height:300px;width:100%;position:absolute;top:0;left:0;z-index:5}
        .pie{height:200px;width:56%;}
        .isOpacity{opacity:0; z-index: 1;}
        .content{
            padding:20px 0 0 0;
            .text{
                font-size:12px;
                line-height:20px;
                padding-top:26px;
                color:#999;
                i{
                  height:6px;
                  width:6px;
                  float: left;
                  margin:6px 3px 0;
                  background:#4CB1FF;
                  border-radius:50%;
                }
                .i1{background:#4CB1FF;}
                .i2{background:#9DD4FF;}
            }
            h4{font-size:16px;line-height:22px;color:#666;}
        }
      }
      .div-line{
        height:1px;
        width:823px;
        border: 1px dashed #E5E5E5;
      }
    }
    }
</style>