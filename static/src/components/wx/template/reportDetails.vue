<template>
    <div id="reportDetails">
        <div class="line"></div>
        <div id="swpirt">
            <!-- swiper -->
            <swiper :options="swiperOption" ref="mySwiper" :style="fullHeight">
                <swiper-slide>
                  <div class="imgBox" :style="[{background: 'url('+ imgpath.bannerPath +') center center / 10rem 20.56rem'},imgBox]">
                  </div>
                </swiper-slide>
                <swiper-slide>
                    <!--第二屏  -->
                    <div class="page2 page">
                        <div class="title"></div>
                        <div class="mode1" v-for="(v, index) in dataList" :class="{mt:index==2}">
                            <div class="subTitle">{{v.title}}</div>
                            <div class="datas" v-if="index == 0">{{v.money | moneyFormat(1)}}元</div>
                            <div class="datas" v-else>{{v.money}}</div>
                        </div>
                        <div class="mode2">
                            <div class="dataLeft">
                                <p>{{month}}月交易金额</p>
                                <p>{{data.month_count | moneyFormat(1)}}元</p>
                            </div>
                            <i></i>
                            <div class="dataConter">
                                <p>{{month}}月交易笔数</p>
                                <p>{{data.transaction}}笔</p>
                            </div>
                            <i></i>
                            <div class="dataRight">
                                <p>{{month}}月发标数</p>
                                <p>{{data.month_issue}}个</p>
                            </div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <!-- 第三屏 -->
                    <div class="page2 page">
                        <div class="title title3"></div>
                        <div class="mode1" v-for="(v, index) in dataList3">
                            <div class="subTitle" v-if="index<2">{{v.title}}</div>
                            <div class="subTitle" v-else>{{month}}{{v.title}}</div>
                            <div class="datas">{{v.money}}</div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <!-- 第四屏 -->
                    <div class="page2 page">
                        <div class="title title4"></div>
                        <div class="mode1" v-for="(item, index) in dataList4" :class="{active:index==3}">
                            <div class="subTitle" v-if="index==1">{{month}}{{item.title}}</div>
                            <div class="subTitle" v-else>{{item.title}}</div>
                            <div class="datas" v-if="index==2">{{item.money | moneyFormat(1)}}元</div>
                            <div class="datas" v-else>{{item.money}}</div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <!-- 第五屏 -->
                    <div class="page2 page">
                        <div class="title title5"></div>
                        <div class="mode1">
                            <div class="subTitle1">平台出借用户性别占比</div>
                            <div class="leftDatails"><em>男性</em>
                            {{people[1].value}}人</div>
                            <div class="rightDatails"><em>女性</em>
                            {{people[0].value}}人</div>
                        </div>
                        <div id="pic">

                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <!-- 第六屏 -->
                    <div class="page2 page">
                        <div class="title title6"></div>
                        <div class="mode3">
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
                            <div id='swiper1'></div>
                        </div>
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <!-- 第七屏 -->
                    <div class="page2 page">
                        <div class="title title7"></div>
                        <div class="mode1 page8">
                            <div class="age">平台出借用户最多的年龄段是</div>
                            <div class="sgeNum">{{maxBarName}}</div>
                        </div>
                        <div id="bar">

                        </div>
                    </div>
                </swiper-slide>
                 <swiper-slide>
                    <!-- 第八屏 -->
                    <div class="page2 page">
                        <div class="title title8"></div>
                        <div class="page9">
                            <ul>
                                <li>
                                    <div class="bgIcon"></div>
                                    <div class="datas">
                                        <div class="sunTitle">当月累计出借额最高</div>
                                        <div class="list1"><i></i><em>用户名：</em>{{data.activeUser1.phone}}</div>
                                        <div class="list1"><i></i><em>出借金额：</em>{{data.activeUser1.money | moneyFormat(1)}}元</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="bgIcon active"></div>
                                    <div class="datas">
                                        <div class="sunTitle">当月累计出借笔数最多</div>
                                        <div class="list1"><i></i><em>用户名：</em>{{data.activeUser2.phone}}</div>
                                        <div class="list1"><i></i><em>出借笔数：</em>{{data.activeUser2.num}}笔</div>
                                    </div>
                                </li>
                                <li>
                                    <div class="bgIcon last"></div>
                                    <div class="datas">
                                        <div class="sunTitle">当月使用红包最多</div>
                                        <div class="list1"><i></i><em class="w-150">用户名：</em>{{data.activeUser3.phone}}</div>
                                        <div class="list1"><i></i><em class="w-150">使用红包数：</em>{{data.activeUser3.red}}个</div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </swiper-slide>
                 <swiper-slide>
                    <!-- 第九屏 -->
                    <!-- <div class="imgBox" ref="box" v-html="imgpath.assetData"></div> -->
                     <div class="imgBox" :style="[{background: 'url('+ imgpath.assetData +') center center / 10rem 20.56rem'},imgBox]"></div>                 
                </swiper-slide>
                <swiper-slide>
                    <!-- 第十屏 -->
                    <!-- <div class="imgBox" ref="box" v-html="imgpath.monthActivit"></div> -->
                    <div class="imgBox" :style="[{background: 'url('+ imgpath.monthActivit +') center center / 10rem 20.56rem'},imgBox]"></div>
                </swiper-slide>
                <swiper-slide>
                    <!-- 第十一屏 -->
                    <!-- <div class="imgBox" ref="box" v-html="imgpath.monthEvent"></div> -->
                    <div class="imgBox" :style="[{background: 'url('+ imgpath.monthEvent +') center center / 10rem 20.56rem'},imgBox]"></div>
                </swiper-slide>
                <swiper-slide>
                    <!-- 第十二屏 -->
                    <div class="page12">
                        <img src="https://aliyunsso.edspay.com/web/wx/reportDetails/erweima.png">
                        <div class="sun">
                            <p>客服电话：400-135-3388</p>
                            <p>客服工作时间：9:00-18:00</p>
                        </div>
                        <div class="shareBtn" @click="share"></div>
                        <div class="show" v-if="showLayer">
                          <div @click="showLayer = false" class="layer"></div>
                        </div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
        <div class="slide-icon" :class="{active:home,last:last}"></div>
    </div>
</template>

<script>
import wxShare from '../../../common/wx/wxShare';   //  微信分享
import wxToapp from "../../../common/wx/wxToapp"; // APP交互函数
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  mixins: [wxShare,wxToapp],
  data() {
    let that = this;
    return {
      showLayer: false,
      home: true, // 首屏的尖头样式
      last: true, // 最后一屏的尖头消失
      swiperIndex: 0, // swiperd的下标
      swiperOption: {
        pagination: ".swiper-pagination",
        notNextTick: true,
        paginationClickable: true,
        longSwipesRatio: 0.2,
        direction: "vertical",
        onSlideChangeEnd: function(swiper) {
          that.swiperIndex = swiper.activeIndex;
          document.getElementsByClassName("line")[0].style.width =
            (that.swiperIndex + 1) / 12 * 100 + "%";
        }
      },
      data: {
        month_count: 0,
        transaction: 0,
        month_issue: 0,
        activeUser1: {
          name: "",
          money: 0
        },
        activeUser2: {
          name: "",
          num: 0
        },
        activeUser3: {
          name: "",
          red: 0
        }
      }, // 返回的数据
      people: [{ value: 0 }, { value: 0 }], // 男女人数
      month: 0, //
      barData: [], // 柱状图数据
      maxBar: 0, // 柱状图最大数据
      maxBarName: "", // 找出用户量最多的年龄段
      barApr: [], // 不同年龄段注册人数的百分比
      mapNum: [], // 用户区域占比
      maxMapNum: 0, // 用户最多区域的值
      imgpath: {
        bannerPath: "",
        assetData: "",
        monthActivit: "",
        monthEvent: ""
      },
      dataList: [
        {
          title: "累计交易金额",
          money: 0
        },
        {
          title: "累计交易笔数",
          money: 0
        },
        {
          title: "累计发标总数",
          money: 0
        }
      ],
      dataList3: [
        // 第三屏数据
        {
          title: "累计注册用户数",
          money: 0
        },
        {
          title: "累计出借用户数",
          money: 0
        },
        {
          title: "月新增用户",
          money: 0
        },
        {
          title: "月出借用户数",
          money: 0
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
          title: "待还金额",
          money: 0
        },
        {
          title: "关联关系借款余额及笔数",
          money: "0元"
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
    //  适配iPhoneX 添加的行内样式fullHeight imgBox
      fullHeight:{
        height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
      },
      imgBox: {
        width: "100%",
        height: "100%",
        backgroundSize: "10rem 20.56rem"   // 背景图片的大小以iPhoneX适配的尺寸为准  
      }
    };
  },
  methods: {
    share(){
      if (this.osType) {
				this.isLogPassValue(this.appShare)
			} else {
        this.showLayer = true
      }
    },
    initData() {
      let _this = this;
      _this.$http
        .post(_this.ajaxUrl.getUrl(1) + "/index/getOperation", {
          year_month: _this.$route.query.time,
          view_client: 1,
          id:_this.$route.query.id
        })
        .then(res => {
          if (res.body.resCode == 1) {
            let barVal = 0; // 总的注册数
            let mapval = 0; // 出借总人数
            let mapval1 = 0; // 出借6名以后总人数
            let data1 = res.body.resData.data;
            _this.data = res.body.resData.data;
            _this.dataList[0].money = data1.amout; // 累计交易金额
            _this.dataList[1].money = data1.count + "笔"; // 累计交易笔数
            _this.dataList[2].money = data1.issue_count + "个"; // 累计发标总数
            _this.dataList3[0].money = data1.register_count + "人"; // 累计注册用户数
            _this.dataList3[1].money = data1.tender_count + "人"; // 累计出借用户数
            _this.dataList3[2].money = data1.month_register + "人"; // 月新增用户
            _this.dataList3[3].money = data1.month_tender + "人"; // 月出借用户数
            _this.dataList4[0].money = data1.borrow_count + "人"; // 累计借款人数量
            _this.dataList4[1].money = data1.month_borrow + "人"; // 10月借款人数量
            _this.dataList4[2].money = data1.wait_count + "元"; // 待还金额
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
            data1.age_count.map(item => {
              // 把不同年龄的值push到同一个数组
              _this.barData.push(item.value);
              barVal = barVal + item.value; // 获取总的注册数
            });
            _this.maxBar = Math.max.apply(null, _this.barData); // 找出用户量最多的年龄段的值
            data1.age_count.map(item => {
              item.value == _this.maxBar ? (_this.maxBarName = item.name) : ""; // 找出用户量最多的年龄段的阶段
              _this.barApr.push(
                Math.round(item.value / barVal * 10000) / 100 + "%"
              );
            });
            _this.maxBar = _this.maxBar * 1.25;
            switch (_this.maxBarName) {
              case "A":
                _this.maxBarName = "22岁以下";
                break;
              case "B":
                _this.maxBarName = "22~34岁";
                break;
              case "C":
                _this.maxBarName = "35~44岁";
                break;
              case "D":
                _this.maxBarName = "45~55岁";
                break;
              case "E":
                _this.maxBarName = "55岁以上";
                break;
              case "F":
                _this.maxBarName = "其他";
                break;
              default:
                _this.maxBarName = "错误";
                break;
            }
            _this.mapNum = data1.province_count;
            data1.province_count.map((item, index) => {
              mapval = mapval + item.value;
              if (index < 6) {
                _this.mapList[index].name = item.name;
                _this.mapList[index].value = item.value;
              }else{
                mapval1 = mapval1 + item.value
              }
            });
            _this.maxMapNum = data1.province_count[0].value;
            _this.mapList[6].value = mapval1;
            _this.mapList.map(item => {
              item.ccc = Math.round(item.value / mapval * 10000) / 100 + "%";
            });
            _this.imgpath.bannerPath = data1.operation.bannerPath;
            _this.imgpath.assetData = _this.strReplace(data1.operation.assetData);
            _this.imgpath.monthActivit = _this.strReplace(data1.operation.monthActivit);
            _this.imgpath.monthEvent = _this.strReplace(data1.operation.monthEvent);
          }
        });
    },
    myChart() {
      let _this = this;
      let myChart = echarts.init(document.getElementById("swiper1"));
      let option = {
        visualMap: {
          show: false,
          min: 0,
          max: _this.maxMapNum,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          color: ["#2C89FF", "#E6F2FF"],
          calculable: true
        },
        series: [
          {
            name: "iphone3",
            type: "map",
            mapType: "china",
            roam: false,
            left: "10%",
            top: "14%",
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: _this.mapNum
          }
        ]
      };
      myChart.setOption(option);
    },
    myChartPic() {
      let _this = this;
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
          bottom: 0,
          left: "center",
          data: ["男性", "女性"]
        },
        series: [
          {
            type: "pie",
            radius: "70%",
            center: ["50%", "48%"],
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
    bar() {
      let _this = this;
      let myChartBar = echarts.init(document.getElementById("bar"));
      let optionBar = {
        color: ["#5C9CEA", "#81B5F3"],
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
        yAxis: [
          {
            type: "category",
            data: [
              "22岁以下\n(" + _this.barApr[0] + ")",
              "22～34\n(" + _this.barApr[1] + ")",
              "35～44\n(" + _this.barApr[2] + ")",
              "45～54\n(" + _this.barApr[3] + ")",
              "55岁以上\n(" + _this.barApr[4] + ")"
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
        xAxis: [
          {
            type: "value",
            name: "(人)",
            min: 0,
            max: _this.maxBar,
            position: "right",
            axisLine: {
              lineStyle: {
                // color:'#3398DB'
              }
            },
            axisLabel: {
              show: false,
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
                color: "#CBE3FF",
                type: "dashed"
              }
            }
          }
        ],
        series: [
          {
            name: "用户数量",
            type: "bar",
            barWidth: "20",
            dimensions: ["date", "open", "close", "highest", "lowest"],
            label: {
              normal: {
                show: true,
                position: "right",
                // position: "insideTop",
                formatter: "{c}",
                borderRadius: 20,
                borderWidth: 1,
                borderColor: "#6BA6EE",
                backgroundColor: "rgba(255,255,255,0.20)",
                padding: [1, 5],
                // fontSize:12,
                color: "#2378f7"
              }
            },
            itemStyle: {
              normal: {
                barBorderRadius: [0, 10, 10, 0],
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [  // 0, 0, 0, 1,  为上下渐变 
                  { offset: 0, color: "#5C9CEA " },
                  { offset: 1, color: "#81B5F3 " }
                ])
              },
              emphasis: {
                color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
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
    strReplace(str){
      return str.replace(/\s|\xA0/g,"").match(/<imgsrc=\"*(\S*)html\"*_src=/)[1]+'html'
    }
  },
  created: function() {},
  mounted: function() {
    let _this = this;
    this.month = _this.$route.query.time.substr(4, 7);
    this.initData();
    let url = 'https://'+ window.location.host
    let year = _this.$route.query.time.substr(0, 4)
    let shareObj= { //分享标题内容配置
          title: "E都市钱包"+ year + "年" + _this.month + "月份运营报" , //标题
          desc: _this.month+"月份运营报告新鲜出炉！想知道单月运营数据详情吗？快快点击查看吧>>", //内容
          link: url+'/?#/info/reportDetails?time='+ _this.$route.query.time +'&id=' + _this.$route.query.id+'', //链接
          imgUrl: "https://aliyunsso.edspay.com/web/icon.png" //图片链接
        }
    this.getWxShareData(shareObj); //分享调用
  },
  components: {
    swiper,
    swiperSlide
  },
  watch: {
    swiperIndex() {
      this.swiperIndex == 0 ? (this.home = true) : (this.home = false);
      this.swiperIndex == 11 ? (this.last = true) : (this.last = false);
      if (this.swiperIndex == 4) {
        this.myChartPic();
      } else if (this.swiperIndex == 5) {
        this.myChart();
        //  this.myChart1.dispose()
      } else if (this.swiperIndex == 6) {
        this.bar();
      }
    }
  }
};
</script>

<style lang="scss">
#reportDetails {
  width: 10rem;
  background: #fff;
  .line {
    width: 8%;
    height: 0.066667rem;
    position: fixed;
    top: 0;
    left: 0;
    background: #408bf5;
    z-index: 999;
  }
  .swiper-container {
    height: 16rem;
    .swiper-slide {
      width: 10rem;
      position: relative; // #swiper1 {
      #swiper1,
      img,
      .page {
        width: 100%;
        height: 100%;
      }
      .page{
        height: 14.4rem;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
      }
      .page2 {
        // padding-top: 0.72rem;
        .title {
          width: 5.253333rem;
          height: 1.066667rem;
          margin: 0 auto;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/title2.png);
          background-size: 5.253333rem 1.066667rem;
          margin-bottom: 1.04rem;
        }
        .title.title3 {
          width: 4.48rem;
          height: 1.066667rem;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/title3.png);
          background-size: 4.48rem 1.066667rem;
        }
        .title.title4 {
          width: 4.6rem;
          height: 1.066667rem;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/title4.png);
          background-size: 4.6rem 1.066667rem;
        }
        .title.title5 {
          width: 5.186667rem;
          height: 1.066667rem;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/title5.png);
          background-size: 5.186667rem 1.066667rem;
        }
        .title.title6 {
          width: 5.2rem;
          height: 1.066667rem;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/title6.png);
          background-size: 5.2rem 1.066667rem;
          margin-bottom: 0.666667rem;
        }
        .title.title7 {
          width: 5.186667rem;
          height: 1.066667rem;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/title7.png);
          background-size: 5.186667rem 1.066667rem;
          margin-bottom: 0.666667rem;
        }
        .title.title8 {
          width: 5.2rem;
          height: 1.066667rem;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/title8.png?v=1.0);
          background-size: 5.2rem 1.066667rem;
          margin-bottom: 1.226667rem;
        }
        .mode1,
        .mode2 {
          width: 9.2rem;
          height: 2.133333rem;
          position: relative;
          left: 50%;
          margin-left: -4.6rem;
          background: #ffffff;
          box-shadow: 0 2px 10px 0 rgba(19, 163, 247, 0.2);
          border-radius: 5px;
          margin-bottom: 0.773333rem;
          padding-top: 0.4rem;
          .subTitle {
            width: 3.333333rem;
            height: 0.8rem;
            background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/subTitle.png);
            background-size: 3.333333rem 0.8rem;
            box-shadow: 0 1px 9px 0 #93d7ff;
            border-radius: 1.333333rem;
            position: absolute;
            top: -0.4rem;
            left: 50%;
            margin-left: -1.666667rem;
            font-family: PingFangSC-Medium;
            font-size: 0.373333rem;
            color: #ffffff;
            text-align: center;
            line-height: 0.8rem;
          }
          .subTitle1 {
            width: 4.533333rem;
            height: 0.8rem;
            background-image: linear-gradient(-90deg, #2d84eb 0%, #5c9eee 100%);
            border-radius: 1.333333rem;
            position: absolute;
            top: -0.4rem;
            left: 50%;
            margin-left: -2.266666rem;
            font-family: PingFangSC-Medium;
            font-size: 0.373333rem;
            color: #ffffff;
            letter-spacing: 0;
            text-shadow: 0 1px 4px #2d83ea;
            text-align: center;
            line-height: 0.8rem;
          }
          .leftDatails {
            width: 50%;
            height: 0.8rem;
            float: left;
            font-family: PingFangSC-Medium;
            font-size: 0.48rem;
            color: #444444;
            letter-spacing: 0;
            text-align: center;
            line-height: 0.8rem;
            margin-top: 0.506667rem;
            em {
              font-size: 0.533333rem;
              color: #2880e9;
            }
          }
          .rightDatails {
            width: 50%;
            height: 0.8rem;
            float: left;
            font-family: PingFangSC-Medium;
            font-size: 0.48rem;
            color: #444444;
            letter-spacing: 0;
            text-align: center;
            line-height: 0.8rem;
            margin-top: 0.506667rem;
            em {
              font-size: 0.533333rem;
              color: #ff8282;
            }
          }
          .datas {
            width: 100%;
            height: 2.133333rem;
            font-family: PingFangSC-Medium;
            font-size: 0.8rem;
            color: #333333;
            text-align: center;
            line-height: 1.733333rem;
          }
        }
        .mode1.mt {
          margin-bottom: 0.4rem;
        }
        .mode1.active {
          .subTitle {
            width: 4.666667rem;
            height: 0.8rem;
            background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/subTitle1.png);
            background-size: 4.666667rem 0.8rem;
            margin-left: -2.333333rem;
          }
        }
        .mode1.page8 {
          padding-top: 0.213333rem;
          background: #ffffff;
          box-shadow: 0 2px 10px 0 rgba(19, 163, 247, 0.2);
          border-radius: 5px;
          margin-bottom:0;
          .age {
            width: 100%;
            height: 0.56rem;
            font-family: PingFangSC-Regular;
            font-size: 0.4rem;
            color: #333333;
            line-height: 0.56rem;
            text-align: center;
            margin-bottom: 0.08rem;
          }
          .sgeNum {
            width: 100%;
            height: 0.973333rem;
            font-family: PingFangSC-Medium;
            font-size: 0.693333rem;
            color: #2c82e9;
            line-height: 0.973333rem;
            text-align: center;
          }
        }
        .mode2 {
          height: 2.08rem;
          padding: 0;
          .dataLeft,
          .dataConter,
          .dataRight {
            width: 3.8rem;
            height: 100%;
            float: left;
            p {
              width: 100%;
              font-family: PingFangSC-Regular;
              font-size: 0.4rem;
              color: #333333;
              text-align: center;
              line-height: 0.56rem;
              margin-top: 0.333333rem;
            }
            p:nth-child(2) {
              margin-top: 0.2rem;
              color: #004cc1;
            }
          }
          .dataConter {
            width: 2.89rem;
          }
          .dataRight {
            width: 2.41rem;
          }
          i {
            display: block;
            float: left;
            width: 1px;
            height: 1.2rem;
            margin-top: 0.44rem;
            background: #59c4fa;
          }
        }
        .mode3 {
          width: 8.8rem;
          height: 6.693333rem;
          margin: 0 auto;
          .tableTitle {
            width: 100%;
            height: 0.533333rem;
            margin-bottom: 0.053333rem;
            padding-left: 7%;
            span {
              display: block;
              float: left;
              width: 31%;
              height: 100%;
              font-family: PingFangSC-Medium;
              font-size: 0.373333rem;
              color: #444444;
              text-align: center;
              line-height: 0.533333rem;
            }
          }
          .list {
            width: 100%;
            height: 6.04rem;
            background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/mapList.jpg);
            background-size: 100% 6.04rem;
            li {
              width: 100%;
              height: 0.746667rem;
              margin-bottom: 0.133333rem;
              padding-left: 7%;
              span {
                display: block;
                float: left;
                width: 31%;
                height: 100%;
                font-family: PingFangSC-Medium;
                font-size: 0.346667rem;
                color: #154aad;
                text-align: center;
                line-height: 0.746667rem;
              }
            }
            li.active span {
              color: #fff;
            }
          }
        }
        #pic {
          width: 8rem;
          margin: 0 auto;
          height: 8rem;
        }
        #bar {
          width: 9.066667rem;
          height: 9.333333rem;
          margin: 0 auto;
        }
        .page9 {
          width: 100%;
          margin: 0 1.173333rem;
          li {
            position: relative;
            margin-bottom: 1.386667rem;
            width: 100%;
            height: 2rem;
            .bgIcon {
              position: absolute;
              top: -0.16rem;
              left: -0.066667rem;
              width: 2.4rem;
              height: 2.033333rem;
              background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/pageIcon.png)
                no-repeat center center;
              background-size: 2.4rem;
              background-position: 0 -2.533333rem;
            }
            .bgIcon.active {
              background-position: 0 -0.2rem;
            }
            .bgIcon.last {
              background-position: 0 -5.066667rem;
            }
            .datas {
              width: 5.2rem;
              height: 2rem;
              position: absolute;
              left: 2.706667rem;
              top: 0;
              background: #ffffff;
              box-shadow: 0 2px 10px 0 rgba(19, 163, 247, 0.2);
              border-radius: 0.066667rem;
              padding-top: 0.5rem;
              padding-left: 0.28rem;
              .sunTitle {
                width: 4.573333rem;
                height: 0.666667rem;
                position: absolute;
                top: -0.333333rem;
                left: 50%;
                margin-left: -2.3rem;
                background-image: linear-gradient(
                  -90deg,
                  #2d84eb 0%,
                  #5c9eee 100%
                );
                border-radius: 1.333333rem;
                z-index: 99;
                text-align: center;
                font-size: 0.4rem;
                color: #fff;
                line-height: 0.666667rem;
              }
              .list1 {
                width: 100%;
                height: 0.6rem;
                line-height: 0.6rem;
                font-family: PingFangSC-Regular;
                font-size: 0.373333rem;
                color: #378aec;
                i {
                  display: inline-block;
                  width: 0.106667rem;
                  height: 0.106667rem;
                  border-radius: 0.053333rem;
                  background: #2d84eb;
                  vertical-align: middle;
                }
                em {
                  display: inline-block;
                  width: 1.8rem;
                  font-family: PingFangSC-Regular;
                  font-size: 0.346667rem;
                  color: #666666;
                  letter-spacing: -0.59px;
                  margin-left: 0.093333rem;
                }
                em.w-150 {
                  width: 2.14rem;
                }
              }
              .list1:nth-child(2) {
                font-family: PingFangSC-Medium;
                font-size: 0.373333rem;
                color: #2d84eb;
              }
            }
          }
        }
      }

      .page12 {
        width: 100%;
        height: 100%;
        position: relative;
        img {
          width: 3.48rem;
          height: 4.16rem;
          position: relative;
          top: 4.266667rem;
          left: 3.293333rem;
        }
        .sun {
          width: 100%;
          height: 1.253333rem;
          position: relative;
          top: 4.733333rem;
          line-height: 0.493333rem;
          text-align: center;
          font-family: PingFangSC-Medium;
          font-size: 0.346667rem;
          color: #ff5541;
          letter-spacing: 0.006667rem;
          p {
            margin-bottom: 0.066667rem;
          }
        }
        .shareBtn{
          width: 4.266667rem;
          height: 1.2rem;
          background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/share.png);
          background-size: 100% 100%;
          position: relative;
          top: 5.733333rem;
          margin: 0 auto;

        }
        .show{
          background-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          z-index: 99999;
        }
        .layer {
          width: 100%;
          height: 100%;
          position: absolute;
          background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
          background-size: 100%;
          z-index: 999999;
        }
      }
      .imgBox {
        width: 100%;
        height: 100%;
        overflow: hidden;
        img {
            width: 100%;
            height: auto;
        }
        p {
          width: 100%;
          height: auto;
        }
      }
    }
  }
  @-moz-keyframes slide {
    0% {
      bottom: 0.9rem;
      opacity: 1;
    }
    50% {
      bottom: 1.4rem;
      opacity: 0.5;
    }
    100% {
      bottom: 0.9rem;
      opacity: 1;
    }
  }
  @-ms-keyframes slide {
    0% {
      bottom: 0.9rem;
      opacity: 1;
    }
    50% {
      bottom: 1.4rem;
      opacity: 0.5;
    }
    100% {
      bottom: 0.9rem;
      opacity: 1;
    }
  }
  @-webkit-keyframes slide {
    0% {
      bottom: 0.9rem;
      opacity: 1;
    }
    50% {
      bottom: 1.4rem;
      opacity: 0.5;
    }
    100% {
      bottom: 0.9rem;
      opacity: 1;
    }
  }
  @keyframes slide {
    0% {
      bottom: 0.9rem;
      opacity: 1;
    }
    50% {
      bottom: 1.4rem;
      opacity: 0.5;
    }
    100% {
      bottom: 0.9rem;
      opacity: 1;
    }
  }
  .slide-icon {
    width: 0.613333rem;
    height: 0.453333rem;
    background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/tip2.png)
      no-repeat;
    background-size: 0.613333rem 0.453333rem;
    position: absolute;
    bottom: 0.9rem;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 9;
    -webkit-animation: slide 1.5s infinite;
    -moz-animation: slide 1.5s infinite;
    -ms-animation: slide 1.5s infinite;
    animation: slide 1.5s infinite;
  }
  .slide-icon.active {
    background: url(https://aliyunsso.edspay.com/web/wx/reportDetails/tip1.png)
      no-repeat;
    background-size: 0.613333rem 0.453333rem;
  }
  .slide-icon.last {
    display: none;
  }
}
</style>
