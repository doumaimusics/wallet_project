<template>
    <div id="transaction">
        <div class="dealData">
          <div class="title"><i></i>交易数据<i></i></div>
          <!-- 交易额 -->
          <div class="moneyData">
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
          <div class="data-line bdr-b"></div>
          <!-- 新增用户数 -->
          <div class="moneyData">
              <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                新增用户数
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
              </div>
              <div class="topTab clear">
                  <span @click="switchover(newTab,'day','month')" class="day" :class="{active:newTab.day}">近7日</span>
                  <span @click="switchover(newTab,'month','day')" class="month" :class="{active:newTab.month}">按月</span>
              </div>
              <div class="echarts">
                  <div id="newLine" class="line" :class="{isOpacity:!newTab.day}"></div>
                  <div id="newBar" class="bar" :class="{isOpacity:!newTab.month}"></div>
                  <div class="time">
                    <!-- <div class="box"></div> -->
                    <ul v-if="newTab.month">
                      <li @click="choose(newYear,0)" :class="{activeLi:newYear[0]}">2017</li>
                      <li @click="choose(newYear,1)" :class="{activeLi:newYear[1]}">2018</li>
                    </ul>
                  </div>
              </div>
          </div>
          <div class="data-line bdr-b"></div>
          <!-- 出借用户数 -->
          <div class="moneyData">
              <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                出借用户数
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
              </div>
              <div class="topTab clear">
                  <span @click="switchover(lendTab,'day','month')" class="day" :class="{active:lendTab.day}">近7日</span>
                  <span @click="switchover(lendTab,'month','day')" class="month" :class="{active:lendTab.month}">按月</span>
              </div>
              <div class="echarts">
                  <div id="lendLine" class="line" :class="{isOpacity:!lendTab.day}"></div>
                  <div id="lendBar" class="bar" :class="{isOpacity:!lendTab.month}"></div>
                  <div class="time">
                    <!-- <div class="box"></div> -->
                    <ul v-if="lendTab.month">
                      <li @click="choose(lendYear,0)" :class="{activeLi:lendYear[0]}">2017</li>
                      <li @click="choose(lendYear,1)" :class="{activeLi:lendYear[1]}">2018</li>
                    </ul>
                  </div>
              </div>
          </div>
          <div class="data-line bdr-b"></div>
          <!-- 投资笔数 -->
          <div class="moneyData">
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
          <div class="data-line bdr-b"></div>
          <!-- 为用户带来收益 -->
          <div class="moneyData echarts5">
            <div class="name">
              <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
              为用户带来收益
              <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
            <div class="redNum">{{pieSum | moneyFormat}}</div>
            <div class="echarts">
              <div id="investPie" class="pie fl"></div>
              <div class="content fl">
                <div class="hasMoney">
                  <div class="text"><i class="i1"></i>已赚取收益</div>
                  <h4>{{pieData[0].value | moneyFormat}}元</h4>
                </div>
                <div class="hasMoney">
                  <div class="text"><i class="i2"></i>待赚取收益</div> 
                  <h4>{{pieData[1].value | moneyFormat}}元</h4>
                </div>
              </div>
            </div>
            <div class="echarts-ti echarts-ti5"></div>
          </div>
        </div>
    </div>
    
</template>

<script>
    import wxHeader from '../../../wxHeader';
    import wxToapp from '../../../../common/wx/wxToapp';
    export default{
      mixins:[wxToapp],
      data(){
        return{
          tabList:['交易数据','资产端数据','风险数据','用户画像','运营报告'],
          moneyTab:{day:true,month:false},
          newTab:{day:true,month:false},
          lendTab:{day:true,month:false},
          investTab:{day:true,month:false},
          moneyYear:[false,true],
          newYear:[false,true],
          lendYear:[false,true],
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
        //7日与月份切换
        switchover(data,num1,num2){
          data[num1] = true;
          data[num2] = false;
        },
        //切换年份
        choose(data,num){
          var yearNum = 2017; //年份
          for(var i=0;i<data.length;i++){
            this.$set(data,i,false);
          }
          if(num == 1){
            yearNum = 2018;
          }else{
            yearNum = 2017;
          }
          this.$set(data,num,true);

          if(data == this.moneyYear){
            this.getYearData(this.moneyBarData,yearNum,'/borrow/tender/query/sum','moneyBar','交易额',0);
          }else if(data == this.newYear){
            this.getYearData(this.newBarData,yearNum,'/user/query/sum','newBar','新增用户数',1);
          }else if(data == this.lendYear){
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
        toTab(item,index){
          for(let i=0;i<this.activeLi.length;i++){
            this.$set(this.activeLi,i, false);
          }
          this.$set(this.activeLi, index, true);
          this.getTabContent(item.id)
        },
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
        getLine(id,lineData,name,yType){
          var that = this;
          var line = echarts.init(document.getElementById(id));

          var lineOption = {
              tooltip: {
                  trigger: 'axis',
                  confine:true,
                  triggerOn:'mousemove',
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
                    fontSize:10,
                  }
              },
              grid: {
                  left: '0%',
                  right: '0%',
                  bottom: '3%',
                  containLabel: true
              },
              legend:{
                  left:'2%',
                  right:0,
                  textStyle:{
                      color:'#FF5B4C'
                  }
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
              grid: {
                  left:'5%',
                  bottom: '3%',
                  containLabel: true
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
                                  color:'rgba(76,177,255,.55)'
                              }
                          }
                      },
                      lineStyle:{
                          color:'#4CB1FF',
                      }
                  },
              ]
          }
          line.setOption(lineOption);
        },
        getBar(id,barData,name,yType,yearNum){
          var that = this;
          var bar = echarts.init(document.getElementById(id));

          var barOption = {
                color: ['#4CB1FF'],
                tooltip : {
                    trigger: 'axis',
                    confine:true,
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
                    left:'5%',
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
                         fontSize:10,
                         color:'#aaa'
                        },
                        axisLine:{
                          show:true,
                          lineStyle:{
                            color:'#ccc'
                          }
                        },
                        axisLabel:{
                          textStyle:{fontSize:9,color:'#aaa'}
                        },
                    }
                ],
                yAxis : [
                    {
                        type : 'value',
                        axisLine:{show:false},
                        axisTick:{show:false},
                        splitLine: {show: false,},
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
            
            series: [
                {
                    name:name,
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    hoverAnimation:true,
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
                            show: false
                        }
                    },
                    data:pieData
                }
            ]
          }

          pie.setOption(pieOption);
        }
      },
      components:{
        wxHeader,
      },
      created(){
        
      },
      mounted(){
        // this.getLine('line1',this.moneyData); 
        // this.getBar('bar1',this.barData);
        // this.getLine('line2',this.moneyData); 
        // this.getBar('bar2',this.barData);
        // this.getLine('line3',this.moneyData); 
        // this.getBar('bar3',this.barData);
        // this.getLine('line4',this.moneyData); 
        // this.getBar('bar4',this.barData);
        // this.getPie('pie1',this.pieData);

        this.getLineData(this.moneyData,'/borrow/tender/query/sum',{chooseType:'day'},'moneyLine','交易额',0)
        this.getLineData(this.newData,'/user/query/sum',{chooseType:'day'},'newLine','新增用户数',1)
        this.getLineData(this.lendData,'/borrow/query/countLendUser',{chooseType:'day'},'lendLine','出借用户数',2)
        this.getLineData(this.investData,'/borrow/tender/query/InvistMentNum',{chooseType:'day'},'investLine','投资笔数',3)

        this.getPieData(this.pieData,'/query/getEarnForUser',{},'investPie')

        this.getBarData(this.moneyBarData,'/borrow/tender/query/sum',{chooseType:'year',yearParam:2018},'moneyBar','交易额',0)
        this.getBarData(this.newBarData,'/user/query/sum',{chooseType:'year',yearParam:2018},'newBar','新增用户数',1)
        this.getBarData(this.lendBarData,'/borrow/query/countLendUser',{chooseType:'year',yearParam:2018},'lendBar','出借用户数',2)
        this.getBarData(this.investBarData,'/borrow/tender/query/InvistMentNum',{chooseType:'year',yearParam:2018},'investBar','投资笔数',3)
      }
    }
</script>

<style lang="scss" scoped>
    #make-public{
      background:#fff;
      color:#333;
        .echarts5{
          height:7.466667rem;
        }
        .data-line{
          position: relative;
          height:1px;
          width:8.88rem;
          margin:0 auto;
          margin: 0.933333rem auto 0.266667rem;
        }
        .bdr-b{border-bottom:1px solid #ddd;}
        .title{
          padding:0.533333rem 0 0.2rem;
          text-align:center;
          color:#ccc;
          font-size:0.48rem;
          line-height:0.666667rem;
          i{
            display:inline-block;
            height:1px;
            width:0.8rem;
            background:#ccc;
            position:relative;
            margin:0 0.08rem;
            top:-0.133333rem;
          }
        }
        .dealData{
          padding:0 0;
          .name{
            font-family:DIN-Regular;
            font-size:0.426667rem;
            line-height:0.586667rem;
            padding:0.533333rem 0;
            text-align:center;
            img{
              height:0.133333rem;
              width:0.213333rem;
            }
          }
          .moneyData{
            .topTab{
              text-align:center;
              span{
                display:inline-block;
                height:0.746667rem;
                width:1.6rem;
                font-size:0.32rem;
                line-height:0.72rem;
                border:1px solid #4CB1FF;
                border-radius:0.08rem;
                margin: 0  0.266667rem;
                color:#4CB1FF;
              }
              .active{
                background:#4CB1FF;
                color:#fff;
              }
            }
            .redNum{
              font-size:0.56rem;
              line-height:0.8rem;
              font-family:PingFangSC-Regular;
              text-align:center;
              color: #FF4E44;
              margin:-0.266667rem 0 0.266667rem;
            }
            .echarts{
              position:relative;
              .time{
                padding-top:7rem;
                .box{
                    height:0.106667rem;
                    width:8.0rem;
                    margin:0 0.666667rem 0 1.333333rem;
                    border:1px solid rgba(76,177,255,0.35);
                    border-top: 0;
                }
                ul{
                  padding-top:0.266667rem;
                  text-align:center;
                  li{
                      display:inline-block;
                      width:1.333333rem;
                      height:0.533333rem;
                      border-radius:0.08rem;
                      border:1px solid #4CB1FF;
                      line-height:0.533333rem;
                      font-size:0.293333rem;  
                      color:#4CB1FF;
                  }
                  .activeLi{background:#4CB1FF;color:#fff;}
                }
              }
            }
            .echarts-ti{
              height:7rem;
            }
            .echarts-ti5{
              height:5.013333rem;
            }
            .line{height:7rem;width:100%;position:absolute;top:0;left:0;z-index: 5}
            .bar{height:7rem;width:100%;position:absolute;top:0;left:0;z-index: 5}
            .pie{height:5rem;width:56%;}
            .isOpacity{opacity:0;z-index:2}
            .content{
              padding:0.666667rem 0 0 0;
              .text{
                font-size:0.293333rem;
                line-height:0.426667rem;
                padding-top:0.3rem;
                color:#999;
                i{
                  height:0.16rem;
                  width:0.16rem;
                  float: left;
                  margin:0.16rem 0.053333rem 0;
                  background:#4CB1FF;
                  border-radius:50%;
                }
                .i1{background:#4CB1FF;}
                .i2{background:#9DD4FF;}
              }
              h4{font-size:0.4rem;line-height:0.8rem;color:#666;}
            }
          }
          .echarts5{
            height:7.466667rem;
          }
        }
    }
</style>