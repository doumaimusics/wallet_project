<template>
<div id="report">
    <div class="banner">
        <img :src="imgpath.bannerPath">
    </div>
    <div class="title No1" ></div>
    <div class="mode1">
        <div class="temp show" v-for="(item, index) in dataList" :class="{most:index ==0,fr:index == 2}">
            <div class="subTitle">{{item.title}}</div>
            <div class="datas" v-if="index==0">{{item.money | moneyFormat(1)}}元</div>
            <div class="datas" v-else>{{item.money}}</div>
        </div>
        <div class="temp show most mb-100">
            <div class="dataLeft wh">
                <p>{{month}}月交易金额</p>
                <p>{{data.month_count | moneyFormat(1)}}元</p>
            </div>
            <i></i>
            <div class="dataConter wh">
                <p>{{month}}月交易笔数</p>
                <p>{{data.transaction}}笔</p>
            </div>
            <i></i>
            <div class="dataRight wh">
                <p>{{month}}月发标数</p>
                <p>{{data.month_issue}}个</p>
            </div>
        </div>
    </div>
    <div class="title No2" ></div>
    <div class="mode1 mb-70">
        <div class="temp show" v-for="(item, index) in dataList3" :class="{fr:index%2 != 0}">
            <div class="subTitle" v-if="index<2">{{item.title}}</div>
            <div class="subTitle" v-else>{{month}}{{item.title}}</div>
            <div class="datas">{{item.money}}</div>
        </div>
    </div>
    <div class="title No3" ></div>
    <div class="mode1 mb-70">
        <div class="temp show" v-for="(item, index) in dataList4" :class="{fr:index%2 != 0,subBg:index==2}">
            <div class="subTitle" v-if="index==1">{{month}}{{item.title}}</div>
            <div class="subTitle" v-else>{{item.title}}</div>
            <div class="datas" v-if="index==3">{{item.money | moneyFormat(1)}}元</div>
            <div class="datas" v-else>{{item.money}}</div>
        </div>
    </div>
    <div class="title No4" ></div>
    <div class="mode1 mode2">
        <div id="pic" ref="pic"></div>
        <div class="temp datails show subBg">
            <div class="subTitle">平台出借用户性别占比</div>
            <div class="list1"><i></i><em>男性：</em>{{people[1].value}}人</div>
            <div class="list1"><i class="last"></i><em class="last">女性：</em>{{people[0].value}}人</div>
        </div>
    </div>
    <div class="title No5" ></div>
    <div class="mode3">
        <div id="reportDetails" ref="map"></div>
        <div class="table">
            <div class="tableTitle">
                <span>出借地区</span>
                <span>出借人数</span>
                <span>出借占比</span>
            </div>
            <div class="list">
                <ul>
                    <li v-for="(item, index) in mapList" :class="{active:index<3}">
                        <span>{{item.name}}</span>
                        <span>{{item.value}}</span>
                        <span>{{item.ccc}}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="title No6" ></div>
    <div class="mode4">
        <div class="subdata show">
            <p>平台出借用户最多的年龄段是</p>
            <p>{{maxBarName}}</p>
        </div>
        <div id="bar" ref="bar"></div>
    </div>
    <div class="title No7" ></div>
    <div class="mode5">
        <ul>
            <li>
                <div class="bgIcon active"></div>
                <div class="datas show">
                    <div class="sunTitle">当月累计出借笔数最多</div>
                    <div class="list1"><i></i><em>用户名：</em>{{data.activeUser2.phone}}</div>
                    <div class="list1 col"><i></i><em>出借笔数：</em>{{data.activeUser2.num}}笔</div>
                </div>
            </li>
            <li>
                <div class="bgIcon"></div>
                <div class="datas show">
                    <div class="sunTitle">当月累计出借额最高</div>
                    <div class="list1"><i></i><em>用户名：</em>{{data.activeUser1.phone}}</div>
                    <div class="list1 col"><i></i><em>出借金额：</em>{{data.activeUser1.money | moneyFormat(1)}}元</div>
                </div>
            </li>
            <li>
                <div class="bgIcon last"></div>
                <div class="datas show">
                    <div class="sunTitle">当月使用红包最多</div>
                    <div class="list1"><i></i><em class="w-150">用户名：</em>{{data.activeUser3.phone}}</div>
                    <div class="list1 col"><i></i><em class="w-150">使用红包数：</em>{{data.activeUser3.red}}个</div>
                </div>
            </li>
        </ul>
    </div>
    <div class="title No8" ></div>
      <div class="imgBox" ref="box" v-html="imgpath.assetData"></div>
    <div class="title No9" ></div>
    <div class="imgBox" ref="box" v-html="imgpath.monthActivit"></div>
    <div class="title No10" ></div>
    <div class="imgBox" ref="box" v-html="imgpath.monthEvent"></div>
</div> 
</template>

<script>
export default {
  data() {
    return {
      people:[
          {value:0},
          {value:0}
      ] , // 男女人数
      month:0, // 
      data: {
          month_count:0,
          transaction:0,
          month_issue:0,
          activeUser1:{
            name:'',
            money:0
          },
          activeUser2:{
              name:'',
              num:0
          },
          activeUser3:{
              name:'',
              red:0
          }
      }, // 返回的数据
      barData:[], // 柱状图数据
      maxBar:0,   // 柱状图最大数据
      maxBarName: '', // 找出用户量最多的年龄段
      barApr:[],       // 不同年龄段注册人数的百分比
      dataList: [
        {
          title: "累计交易金额",
          money:''
        },
        {
          title: "累计交易笔数",
          money:''
        },
        {
          title: "累计发标总数",
          money:''
        }
      ],
      dataList3: [
        // 第三屏数据
        {
          title: "累计注册用户数",
          money: ""
        },
        {
          title: "累计出借用户数",
          money: ""
        },
        {
          title: "月新增用户",
          money: ""
        },
        {
          title: "月出借用户数",
          money: ""
        }
      ],
      dataList4: [
        // 第四屏数据
        {
          title: "累计借款人数量",
          money: 0
        },
        {
          title: "月借款人数量",
          money: 0
        },
        {
          title: "关联关系借款余额及笔数",
          money: 0
        },
        {
          title: "待还金额",
          money: 0
        }
      ],
      mapList: [
        {
          name: " ",
          value: 0,
          ccc: " "
        },
        {
          name: " ",
          value: 0,
          ccc: " "
        },
        {
          name: " ",
          value: 0,
          ccc: " "
        },
        {
          name: " ",
          value: 0,
          ccc: " "
        },
        {
          name: " ",
          value: 0,
          ccc: " "
        },
        {
          name: " ",
          value: 0,
          ccc: " "
        },
        {
          name: "其他",
          value: 0,
          ccc: " "
        }
      ],
      imgpath:{
          bannerPath:'',
          assetData:'',
          monthActivit:'',
          monthEvent:''
      },
      mapNum:[],   // 用户区域占比
      maxMapNum:0  // 用户最多区域的值
    };
  },
  methods: {
    initData() {
      let _this = this;
      _this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/getOperation", { year_month:_this.$route.query.time,view_client:0,id:_this.$route.query.id }).then(res => {
          if (res.body.resCode == 1) {
            let barVal = 0   // 总的注册数
            let mapval = 0   // 出借总人数
            let mapval1 = 0   // 出借6名以后总人数
            let data1 = res.body.resData.data;
            _this.data = res.body.resData.data;
            _this.dataList[0].money = data1.amout                  // 累计交易金额
            _this.dataList[1].money = data1.count+'笔'             // 累计交易笔数
            _this.dataList[2].money = data1.issue_count+'个'       // 累计发标总数
            _this.dataList3[0].money = data1.register_count+'人'   // 累计注册用户数
            _this.dataList3[1].money = data1.tender_count+'人'     // 累计出借用户数
            _this.dataList3[2].money = data1.month_register+'人'   // 月新增用户
            _this.dataList3[3].money = data1.month_tender+'人'     // 月出借用户数
            _this.dataList4[0].money = data1.borrow_count+'人'     // 累计借款人数量
            _this.dataList4[1].money = data1.month_borrow+'人'     // 10月借款人数量
            _this.dataList4[3].money = data1.wait_count+'元'       // 待还金额
            // 男女比率
            data1.sex_tender.map((item, index) => {
              if(item.name === "0"){
                _this.people[0].name = "女性";
                _this.people[0].value = item.value
              }else if(item.name === "1"){
                _this.people[1].name = "男性"
                _this.people[1].value = item.value               
              }
            });
            data1.age_count.map(item => {                         // 把不同年龄的值push到同一个数组
                _this.barData.push(item.value)
                barVal = barVal+item.value                        // 获取总的注册数
            })
            _this.maxBar = Math.max.apply( null, _this.barData )  // 找出用户量最多的年龄段的值
            data1.age_count.map(item => { 
                item.value ==  _this.maxBar ? _this.maxBarName = item.name : ''  // 找出用户量最多的年龄段的阶段
                _this.barApr.push(Math.round(item.value/barVal*10000)/100+'%')
            })
            switch (_this.maxBarName) {
                case 'A':
                    _this.maxBarName = '22岁以下'  
                    break;
                case 'B':
                    _this.maxBarName = '22~34岁'  
                    break;
                case 'C':
                    _this.maxBarName = '35~44岁'  
                    break;
                case 'D':
                    _this.maxBarName = '45~55岁'  
                    break;
                case 'E':
                    _this.maxBarName = '55岁以上'  
                    break;
                case 'F':
                    _this.maxBarName = '其他'  
                    break;
                default:
                    break;
            } 
            _this.mapNum = data1.province_count
            data1.province_count.map((item, index)=> {
                mapval = mapval + item.value
                if(index < 6){
                    _this.mapList[index].name = item.name
                    _this.mapList[index].value = item.value
                }else{
                    mapval1 = mapval1 + item.value
                }
            })
            _this.maxMapNum = data1.province_count[0].value
            _this.mapList[6].value = mapval1
            _this.mapList.map(item => {
                item.ccc = Math.round(item.value/mapval*10000)/100+'%'
            })
            _this.imgpath.bannerPath = data1.operation.bannerPath
            _this.imgpath.assetData = data1.operation.assetData
            _this.imgpath.monthActivit = data1.operation.monthActivit
            _this.imgpath.monthEvent = data1.operation.monthEvent
          }
        });
    },
    bar() {
      let _this = this;
      let myChartBar = echarts.init(document.getElementById("bar"));
      let optionBar = {
        color: ["#81B5F3"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "22岁以下\n\n(" + _this.barApr[0] + ")",
              "22～34\n\n(" + _this.barApr[1] + ")",
              "35～44\n\n(" + _this.barApr[2] + ")",
              "45～54\n\n(" + _this.barApr[3] + ")",
              "55岁以上\n\n(" + _this.barApr[4] + ")"
            ],
            axisTick: {
              alignWithLabel: true
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: "#005DD1"
            },
            splitLine: {
              lineStyle: {
                color: "#81B5F3",
                type: "dashed"
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "(人)",
            min: 0,
            max: _this.maxBar,
            position: "left",
            axisLine: {
              lineStyle: {
                // color:'#3398DB'
              }
            },
            axisLabel: {
              formatter: "{value}",
              color: "#005DD1"
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              lineStyle: {
                color: "#81B5F3",
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "用户数量",
            type: "bar",
            barWidth: "35",
            // dimensions: ["date", "open", "close", "highest", "lowest"]
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}人",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#6BA6EE",
                backgroundColor: "rgba(255,255,255,0.50)",
                padding: [3, 13],
                fontSize: 16,
                color: "#005DD1"
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: [18, 18, 0, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#81B5F3" },
                  { offset: 1, color: "#5C9CEA" }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" }
                ])
              }
            },
            data: _this.barData
          }
        ]
      };
      myChartBar.setOption(optionBar);
    },
    myChartPic() {
      let _this = this
      let myChart1 = echarts.init(document.getElementById("pic"));
      let optionPic = {
        color: ["#FF8282", "#2880E9"],
        tooltip: {
          trigger: "item",
          formatter: "{b} : {c} <br/>占总比 ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          selectedMode: false,
          itemWidth: 20,
          itemHeight: 20,
          itemGap: 40,
          bottom: 60,
          left: "center",
          data: ["男性", "女性"]
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "40%"],
            clickable: false,
            label: {
              normal: {
                position: "inner",
                formatter: "{d}%",
                fontSize: 22
              }
            },
            data: _this.people
          }
        ]
      };
      myChart1.setOption(optionPic);
    },
    myChart() {
      let _this = this
      let myChart = echarts.init(document.getElementById("reportDetails"));
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}"
        },
        visualMap: {
          show: false,
          min: 0,
          max: _this.maxMapNum,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          color:['#2C89FF','#E6F2FF'],
          calculable: true
        },
        toolbox: {
          show: false,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: {
              readOnly: false
            },
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "出借人数",
            type: "map",
            mapType: "china",
            roam: false,
            left: "center",
            top: "center",
            label: {
              normal: {
                show: false,
                formatter: "{b}: {c}"
              },
              emphasis: {
                show: true,
                formatter: "{b}: {c}",
                color:'#666'
              }
            },
            data: _this.mapNum,
          }
        ]
      };
      myChart.setOption(option);
    },
    onScroll(){
        let _this = this
        let t = document.documentElement.scrollTop || document.body.scrollTop;
        let mapTop = _this.$refs.map.offsetTop
        let barTop = _this.$refs.bar.offsetTop
        let picTop = _this.$refs.pic.offsetTop
        let winHeight = 0
        if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
{
            winHeight = document.documentElement.clientHeight;
        }
        if (t+winHeight > barTop+600) { 
            _this.bar(); 
        } else if (t+winHeight > mapTop+550) { 
            _this.myChart(); 
        }else if (t+winHeight > picTop+400) { 
            _this.myChartPic(); 
        }
    }
  },
  created: function() {
   
  },
  mounted: function() {
    let _this = this
    this.initData();
    window.addEventListener("scroll",this.onScroll),
    this.month = this.$route.query.time.substr(4,7)
    setTimeout(function(){_this.myChart();}, 500);
  },
  beforeDestroy(){
    window.removeEventListener("scroll",this.onScroll)
  }
};
</script>

<style lang="scss">
#report {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  background: #fff;
  .banner {
    width: 100%;
    height: 450px;
    margin-bottom: 90px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    width: 100%;
    height: 70px;
    margin-bottom: 88px;
    margin-left: 115px;
  }
  .title.No1 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title1.png)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No2 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title2.png?v=1.0)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No3 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title3.png)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No4 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title4.png)no-repeat left center;
    background-size: auto 100%;
    margin-bottom: 58px;
  }
  .title.No5 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title5.png)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No6 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title6.png)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No7 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title7.png)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No8 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title8.png)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No9 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title9.png)no-repeat left center;
    background-size: auto 100%;
  }
  .title.No10 {
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title10.png)no-repeat left center;
    background-size: auto 100%;
  }
  .mode1 {
    width: 790px;
    height: auto;
    margin: 0 auto;
    overflow: hidden;
    padding: 30px 5px 0px;
    .temp {
      height: 160px;
      width: 380px;
      float: left;
      margin-bottom: 58px;
      position: relative;
      .subTitle {
        width: 248px;
        height: 60px;
        position: absolute;
        top: -30px;
        left: 50%;
        margin-left: -124px;
        background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title.png)no-repeat left center;
        background-size: 100% 100%;
        font-family: PingFangSC-Medium;
        font-size: 30px;
        color: #ffffff;
        letter-spacing: 0;
        text-align: center;
        line-height: 60px;
      }
      .datas {
        width: 100%;
        height: 84px;
        margin-top: 56px;
        text-align: center;
        line-height: 84px;
        font-family: PingFangSC-Medium;
        font-size: 50px;
        color: #333333;
      }
      .wh {
        float: left;
        p {
          width: 100%;
          height: 42px;
          margin: 19px 0 14px;
          line-height: 42px;
          text-align: center;
          font-family: PingFangSC-Regular;
          font-size: 30px;
          color: #333333;
        }
        p:nth-child(2) {
          margin: 0;
          font-family: PingFangSC-Medium;
          color: #004cc1;
        }
      }
      i {
        display: block;
        float: left;
        width: 1px;
        height: 90px;
        margin-top: 33px;
        background: #59c4fa;
      }
      .dataLeft {
        width: 300px;
      }
      .dataConter {
        width: 252px;
      }
      .dataRight {
        width: 226px;
      }
    }
    .temp.fr {
      float: right;
    }
    .temp.most {
      width: 780px;
    }
  }
  .mode2 {
    width: 1200px;
    padding-left: 150px;
    padding-top: 60px;
    #pic {
      width: 400px;
      height: 400px;
      float: left;
      position: relative;
      top: -50px;
    }
    .datails {
      width: 439px;
      height: 236px;
      float: left;
      margin-left: 100px;
      padding-top: 52px;
      .list1 {
        width: 100%;
        height: 62px;
        line-height: 62px;
        font-family: PingFangSC-Medium;
        font-size: 40px;
        color: #444444;
        letter-spacing: 0;
        line-height: 62px;
        text-align: left;
        i {
          display: inline-block;
          width: 20px;
          height: 20px;
          border-radius: 10px;
          background: #2880e9;
          vertical-align: middle;
          margin-top: 24px;
          margin-left: 80px;
          margin-right: 10px;
        }
        i.last {
          background: #ff8282;
        }
        em {
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #2880e9;
          letter-spacing: 0;
        }
        em.last {
          font-family: PingFangSC-Medium;
          font-size: 30px;
          color: #ff8282;
          letter-spacing: 0;
        }
      }
    }
  }
  .mode3 {
    width: 100%;
    padding-left: 100px;
    overflow: hidden;
    #reportDetails {
      width: 550px;
      height: 550px;
      float: left;
    }
    .table {
      float: left;
      width: 438px;
      height: 434px;
      margin-right: 80px;
      .tableTitle {
        width: 100%;
        height: 33px;
        margin-bottom: 6px;
        padding-left: 10%;
        span {
          display: block;
          float: left;
          width: 33.333%;
          height: 100%;
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #333;
          text-align: center;
          line-height: 33px;
        }
      }
      .list {
        width: 438px;
        height: 395px;
        background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/table.jpg);
        background-size: 100% 100%;
        li {
          width: 100%;
          height: 42px;
          margin-bottom: 17px;
          padding-left: 10%;
          span {
            display: block;
            float: left;
            width: 33.33%;
            height: 100%;
            font-family: PingFangSC-Medium;
            font-size: 22px;
            color: #154aad;
            text-align: center;
            line-height: 42px;
          }
        }
        li.active span {
          color: #fff;
        }
      }
    }
  }
  .mode4 {
    width: 100%;
    height: auto;
    margin-bottom: 100px;
    .subdata {
      width: 690px;
      height: 160px;
      margin: 0 auto;
      padding-top: 10px;
      p {
        width: 100%;
        height: 54px;
        line-height: 54px;
        text-align: center;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #333333;
      }
      p:nth-child(2) {
        height: 73px;
        line-height: 73px;
        font-size: 52px;
        color: #2c82e9;
      }
    }
    #bar {
      width: 1000px;
      height: 600px;
      margin: 0 auto;
    }
  }
  .mode5 {
    width: 100%;
    height: 540px;
    padding: 0 90px;
    overflow: hidden;
    li {
      width: 320px;
      height: 350px;
      float: left;
      margin-right: 30px;
      margin-top: 100px;
      .bgIcon {
        width: 180px;
        height: 160px;
        margin: 0 auto;
        background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/pageIcon.png)
          no-repeat center center;
        background-size: 190px;
        background-position: -5px -15px;
        margin-bottom: 40px;
      }
      .datas {
        width: 320px;
        height: 150px;
        position: relative;
        padding-top: 43px;
        .sunTitle {
          width: 296px;
          height: 50px;
          position: absolute;
          left: 50%;
          margin-left: -148px;
          top: -25px;
          text-align: center;
          line-height: 50px;
          background-image: linear-gradient(-81deg, #2d84eb 1%, #5c9eee 100%);
          box-shadow: 0 2px 7px 0 rgba(89, 156, 238, 0.3);
          border-radius: 5px;
          font-family: PingFangSC-Medium;
          font-size: 26px;
          color: #ffffff;
        }
        .list1 {
          width: 100%;
          height: 38px;
          line-height: 38px;
          font-family: PingFangSC-Regular;
          font-size: 20px;
          color: #378aec;
          i {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 4px;
            background: #2d84eb;
            vertical-align: middle;
            margin: 0 8px 0 30px;
          }
          em {
            display: inline-block;
            width: 110px;
            font-family: PingFangSC-Regular;
            font-size: 18px;
            color: #666666;
            letter-spacing: -0.59px;
          }
        }
        .list1.col {
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #2d84eb;
        }
      }
    }
    li:nth-child(2) {
      margin-top: 0;
      .bgIcon {
        background-position: -5px -205px;
      }
    }
    li:nth-child(3) {
      margin-right: 0px;
      .bgIcon {
        background-position: -5px -395px;
      }
    }
  }
  .imgBox {
    width: 1000px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 100px;
    overflow: hidden;
    p{
      width: 100%;
      height: auto; 
      img {
        width: 100%;
        height: auto;
      } 
    }
  }
  .temp.subBg .subTitle {
    width: 354px;
    margin-left: -177px;
    background: url(https://aliyunsso.edspay.com/web/activity/reportDetails/title_2.png)no-repeat left center;
    background-size: 100% 100%;
  }
  .show {
    background: #ffffff;
    box-shadow: 0 2px 10px 0 rgba(19, 163, 247, 0.2);
    border-radius: 5px;
  }
  .mb-100 {
    margin-bottom: 100px !important;
  }
  .mb-70 {
    margin-bottom: 70px !important;
  }
}
</style>
