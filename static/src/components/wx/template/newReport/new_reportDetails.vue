<template>
    <div id="reportDetails">
        <div v-title>运营报告</div>
        <!-- <div class="line"></div> -->
        <div id="swpirt">
            <!-- swiper -->
            <swiper :options="swiperOption" ref="mySwiper" :style="[fullHeight,{background: 'url(https://aliyunsso.edspay.com/web/wx/template/newPeport/reportBg.png) center center / 10rem 20.56rem'}]">
                <!--第一屏 首页 -->
                <swiper-slide>
                  <div class="imgBox" :style="[{background: 'url('+ reportData.operation.bannerPath +') center center / 10rem 20.56rem'},imgBox]">
                  </div>
                </swiper-slide>
                <!--第二屏 累计交易数据 -->
                <swiper-slide>
                    <div class="page2 page">
                        <div class="lendData lendDataSum">
                          <div class="num6">{{reportData.monthCountSum | moneyFormat}}<i>元</i></div>
                          <div class="textNum">累计借贷{{reportData.monthSumNumber}}笔</div>
                        </div>
                        <div class="lendData">
                          <div class="num6">{{reportData.debtOrderCountSum | moneyFormat}}<i>元</i></div>
                          <div class="textNum">未还{{reportData.debtOrderSumNumber}}笔</div>
                        </div>
                    </div> 
                </swiper-slide>
                <!-- 第三屏 累计交易数据 -->
                <swiper-slide>
                    <div class="page3 page">
                      <div class="num6">{{reportData.register_count | moneyFormat(1)}}<i>人</i></div>
                      <div class="num6">{{reportData.tender_count | moneyFormat(1)}}<i>人</i></div>
                      <div class="num6">{{reportData.borrow_count | moneyFormat(1)}}<i>人</i></div>
                    </div>
                </swiper-slide>
                <!-- 第四屏 累计交易数据 -->
                <swiper-slide>
                    <div :style="{background:'url('+ reportData.operation.borrowUrl+')'}" v-if="reportData.operation.borrowUrl" class="page"></div>
                    <div class="page4 page" v-else>
                        <div class="topArp">
                          <div class="num6">{{reportData.borrowCount_topTen}}%</div>
                          <div class="num6">{{reportData.borrowCount_topOne}}%</div>
                        </div>
                        <ul class="listNum">
                          <li v-for="itme in 4">
                            <div class="zero">0<i>元</i></div>
                            <div class="zero">0<i>笔</i></div>
                          </li>
                        </ul>
                    </div>
                </swiper-slide>
                <!-- 第五屏 当月交易数据 -->
                <swiper-slide>
                    <div class="page5 page">
                      <div class="monthSum">
                        <div class="num6">{{reportData.transaction}}<i>笔</i></div>
                        <div class="bidSum">{{reportData.month_issue}}个</div>
                      </div>
                      <div class="num5">{{reportData.month_register}}<i class="ic_2">人</i></div>
                      <div class="num5">{{reportData.month_tender}}<i class="ic_2">人</i></div>
                      <div class="num5">{{reportData.month_borrow}}<i class="ic_2">人</i></div>
                    </div>
                </swiper-slide>
                <!-- 第六屏 用户地区占比 -->
                <swiper-slide>
                    <div class="page6 page">
                        <div id='map1'></div>
                        <ul v-if="reportData.province_count.length" class="mapList">
                          <li v-for="(item,index) in reportData.province_count" v-if="index<6" class="clear">
                              <div  class="name fl"><span>{{index+1}}</span>{{item.name}}省</div>
                              <div class="pillar fr">
                                <div :style="{width:newMapList[index]+'%'}" class="ratio"></div>
                                <div class="numApr">
                                  <span class="span">{{newMapList[index]}}%</span>
                                  <span class="people">{{item.value}}人</span>
                                </div>
                              </div>
                          </li>
                          <li>
                              <div  class="name fl"><span> </span>其他</div>
                              <div class="pillar fr">
                                <div :style="{width:newMapList[6]+'%'}" class="ratio"></div>
                                <div class="numApr">
                                  <span class="span">{{newMapList[6]}}%</span>
                                  <span class="people">{{mapRests}}人</span>
                                </div>
                              </div>
                          </li>
                        </ul>
                    </div>
                </swiper-slide>
                <!-- 第七屏 性别比例 -->
                <swiper-slide>
                    <div class="page7 page">
                        <div class="peopleNum clear">
                          <span class="fl span1">{{reportData.sex_tender[0].value}}<i>人</i></span>
                          <span class="fl span2">{{reportData.sex_tender[1].value}}<i>人</i></span>
                        </div>
                        <div class="picBox">
                          <div :style="{top:'-0.07rem'}" id="pic"></div>
                          <div class="man"><span>{{(reportData.sex_tender[0].value*100)/(reportData.sex_tender[0].value + reportData.sex_tender[1].value) | moneyFormat}}%</span><i>男性</i></div>
                          <div class="wan"><span>{{(reportData.sex_tender[1].value*100)/(reportData.sex_tender[0].value + reportData.sex_tender[1].value) | moneyFormat}}%</span><i>女性</i></div>
                          <div class="huan"></div>
                        </div>
                    </div>
                </swiper-slide>
                <!-- 第八屏 用户年龄占比 -->
                <swiper-slide>
                    <div class="page8 page">
                        <div class="age">{{barXdata[ageType]}} 岁</div>
                        <div id="bar"></div>
                    </div>
                </swiper-slide>
                <!-- 第九屏 用户榜单 -->
                <swiper-slide>
                    <div class="page9 page">
                      <ul class="userTOP">
                        <li class="clear">
                          <div class="name fl">{{reportData.activeUser1.name}}</div>
                          <div class="num fl">{{reportData.activeUser1.money}}元</div>
                        </li>
                        <li class="clear">
                          <div class="name fl">{{reportData.activeUser2.name}}</div>
                          <div class="num fl">{{reportData.activeUser2.num}}笔</div>
                        </li>
                        <li class="clear">
                          <div class="name fl">{{reportData.activeUser3.name}}</div>
                          <div class="num fl">{{reportData.activeUser3.red}}个</div>
                        </li>
                        <li class="clear">
                          <div class="name fl">{{reportData.activeUser4.name}}</div>
                          <div class="num fl">{{reportData.activeUser4.money}}元</div>
                        </li>
                      </ul>
                    </div>
                </swiper-slide>
                <!-- 第十屏 资产端数据 -->
                <swiper-slide>
                  <div :style="{background:'url('+ reportData.operation.assetData +')'}" class="page10 page"></div>
                </swiper-slide>
                <!-- 第十一屏 当月主要活动 -->
                <swiper-slide>
                    <div :style="{background:'url('+ reportData.operation.monthActivit +')'}" class="page11 page">
                    </div>
                </swiper-slide>
                <!-- 第十二屏 当月大事间 -->
                <swiper-slide>
                    <div :style="{background:'url('+ reportData.operation.monthEvent +')'}" class="page12 page">
                    </div>
                </swiper-slide>
                <!-- 第十三屏 收费标准 -->
                <swiper-slide>
                    <div class="page13 page">
                    </div>
                </swiper-slide>
                <!-- 第十四屏 結果頁 -->
                <swiper-slide>
                    <div class="page14 page">
                      <div @click="share" class="btn"></div>
                    </div>
                </swiper-slide>
                
            </swiper>
        </div>
        <div v-layer v-if="showLayer" @click="showLayer = false" class="layer"></div>
        <div class="slide-icon" :class="{active:home,last:last}"></div>
    </div>
</template>

<script>
import wxShare from '../../../../common/wx/wxShare';   //  微信分享
import wxToapp from "../../../../common/wx/wxToapp"; // APP交互函数
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  mixins: [wxShare,wxToapp],
  data() {
    let that = this;
    return {
      month:'',//月份
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
        }
      },
      //  适配iPhoneX 添加的行内样式fullHeight imgBox
      fullHeight:{
        height: document.documentElement.clientHeight+6+"px"  //获取手机可视区域的的高度
      },
      imgBox: {
        width: "100%",
        height: "100%",
        backgroundSize: "10rem 20.56rem"   // 背景图片的大小以iPhoneX适配的尺寸为准  
      },
      reportData:{province_count:[],operation:{}},//后台返回数据
      newMapList:[],
      mapRests:0,//地图‘其他’
      barXdata:['22以下','22-34','35-44','45-54','55以上'],//年龄X轴
      ageData:[],//年龄数据
      ageType:'',

    };
  },
  methods: {
    share(){//分享
      if (this.osType) {
				this.isLogPassValue(this.appShare)
			} else {
        this.showLayer = true
      }
    },
    getnewMapList(mapData){  //获取地图前七排名
      let topSeven = 0;
      let sunPeople = 0;
      mapData.push({name:'南海诸岛',value:0})
      for(let i=0;i<this.reportData.province_count.length;i++){
        this.mapRests += this.reportData.province_count[i].value;
        sunPeople = sunPeople + this.reportData.province_count[i].value;
      }
      for(let i=0;i<6;i++){
        this.mapRests = this.mapRests - mapData[i].value;
        this.newMapList.push(((mapData[i].value/sunPeople)*100).toFixed(2))
        topSeven = topSeven + parseFloat(((mapData[i].value/sunPeople)*100).toFixed(2))
      }
      this.newMapList.push((100-topSeven).toFixed(2));
    },
    getAgeList(ageArr){//获取年龄段数据
      let ageSum = 0;//总人数
      let maxAge = 0;
      for(let i=0;i<ageArr.length;i++){ 
        ageSum += ageArr[i].value
        if(ageArr[i].value > maxAge){
          maxAge = ageArr[i].value;
          this.ageType = i;
        }
      }
      for(let i=0;i<ageArr.length;i++){
        this.ageData.push((ageArr[i].value*100/ageSum).toFixed(2))
      }
      this.ageData[4] = 100;
      for(let i=0;i<4;i++){
        this.ageData[4] = this.ageData[4] - this.ageData[i];
      }
      this.ageData[4] = this.ageData[4].toFixed(2);

    },
    getReportData(){//获取页面所需数据
      this.notLogPost('/index/getOperation',(data) => {
        if(data.resCode){
          this.reportData = data.resData.data;
          this.getnewMapList(this.reportData.province_count);
          this.getAgeList(this.reportData.age_count)
        }
      },{year_month: this.$route.query.time,view_client: 1,id:this.$route.query.id})
    },
    getMap() { //地图模块
      let _this = this;
      let myChart = echarts.init(document.getElementById("map1"));
      let option = {
        tooltip:{
          show:true,
          showContent:true,
          confine:true,
          triggerOn:'click',
          trigger:'item',
          padding:[5,6,5,10],
          textStyle:{
              fontSize:11,
          },
          extraCssText: "background-image: linear-gradient(-145deg, #FC8B80 6%, #FF534C 99%);border-radius: 100px;",
          formatter:function(datas){//浮窗显示内容
              return datas.name+' '+datas.value+'人'
          }
        },
        series:[{  
          type: 'map',  
          map: 'china',  
          roam: false,//允许缩放和平移  
          //初始化时的地图位置，可通过改变地图中心视角的经纬度来实现地图的平移  
          center: [100.97, 35.71],  
          zoom: 1.1, //地图缩放多少倍  
          silent:false,
          top:25,
          left:'7%', 
          emphasis:{
            itemStyle:{
              areaColor:"#FFf",
              color:"#ff0"
            }
          },
          scaleLimit:{
              min:0.5,max:2
          },
          itemStyle: {//地图区域的多边形图形样式  
              emphasis:{
                  areaColor:'#0077DF',//点击状态下的省份颜色
                  // borderColor:'#ff4e44' //边框颜色
              },
              normal: {  
                  areaColor: '#50A3FF',//地图区域颜色  
                  borderColor: '#fff',//图形的描边颜色  
                  borderWidth: 0.5,//描边线宽。为 0 时无描边  
                  borderType: 'solid',  
                  opacity: 1 
              }  
          },  
          data:_this.reportData.province_count
        }]
      };
      myChart.setOption(option);
    },
    getPie() {  //性别比例
      let _this = this;
      let pie = echarts.init(document.getElementById("pic"));
      let optionPic = {
          color:['#0757A8','#FE6D65'],
          tooltip : {
            show:false,
             trigger: 'item',
             confine:true,
          },
          series : [
              {
                  name: name,
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '60%'],
                  hoverOffset:3,
                  silent:false,
                  data:_this.reportData.sex_tender,
                  label:{
                    show:false,
                    normal:{
                      show:false,
                    },
                  },
                  itemStyle: {
                      normal:{
                          // borderColor:'#fff',
                          // borderWidth:2
                      },
                      emphasis: {
                          shadowBlur: 6,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      }
                  }
              }
          ]
      }
      pie.setOption(optionPic);
    },
    getBar() {  //年龄区域
      let _this = this;
      let myChartBar = echarts.init(document.getElementById("bar"));
      let optionBar = {
          color: ['#3398DB'],
              tooltip : {
                show:false,
                  trigger: 'axis',
              },
              grid: {
                  left: '3%',
                  right: '2%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis : [
                  {
                      show:true,
                      type : 'category',
                      data : _this.barXdata,
                      axisTick: {
                        show:false,
                          alignWithLabel: false
                      },
                      nameTextStyle:{
                       fontSize:10,
                       color:'#666'
                      },
                      splitLine: {show:false},
                      axisLine:{
                        show:false,
                      },
                      axisLabel:{
                        textStyle:{fontSize:9,color:'#666'}
                      }
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      axisLine:{show:false},
                      axisTick:{show:false},
                      splitLine: {
                        show: true,
                        lineStyle:{
                          type:'dashed'
                        }
                      },
                      axisLabel:{
                        formatter:'{value}% ',
                        textStyle:{fontSize:9,color:'#666'}
                      },
                  }
              ],
              series : [
                  {
                      name:'年龄占比',
                      type:'bar',
                      barWidth: '26%',
                      label:{
                        normal:{
                          show:true,
                          position:'top',
                          formatter: '{c}%',
                          textStyle:{
                            color:'#FE5E57',
                            fontSize:12,
                            fontFamily:'DIN-Medium'
                          }
                        }
                      },
                      itemStyle:{
                        normal:{
                          barBorderRadius:[10,10,0,0],
                          color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                {offset: 0, color: '#50A3FF'},
                                {offset: 1, color: '#1D5CC1'}
                            ]
                          )
                        },
                        emphasis: {
                          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#2378f7" },
                            { offset: 0.7, color: "#2378f7" },
                            { offset: 1, color: "#83bff6" }
                          ])
                        }
                      },
                      data:_this.ageData
                  }
              ]
      }
      myChartBar.setOption(optionBar);
    },
  },
  created(){
    this.getReportData();
  },
  mounted: function() {
    let _this = this;
    this.month = _this.$route.query.time.substr(4, 7);
    let url = 'https://'+ window.location.host
    let year = _this.$route.query.time.substr(0, 4)
    let shareObj= { //分享标题内容配置
          title: "E都市钱包"+ year + "年" + _this.month + "月份运营报" , //标题
          desc: _this.month+"月份运营报告新鲜出炉！想知道单月运营数据详情吗？快快点击查看吧>>", //内容
          link: url+'/?#info/newReportDetails?time='+ _this.$route.query.time +'&id=' + _this.$route.query.id+'', //链接
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
      this.swiperIndex == 13 ? (this.last = true) : (this.last = false);
      if (this.swiperIndex == 4) {
      } else if (this.swiperIndex == 5) {
        this.getMap();
      } else if (this.swiperIndex == 6) {
        this.getPie();
      } else if(this.swiperIndex == 7){
        this.getBar();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#reportDetails {
  width: 10rem;
  background: #fff;
  color:#333;
  width:100%;
  font-family:PingFang-SC-Medium;
  .layer{
    background: url(https://aliyunsso.edspay.com/web/wx/activity/invitation/fenxing.png) no-repeat;
    background-size: 100%;
  }
  .swiper-container {
    height: 16rem;
    .swiper-slide {
      width: 10rem;
      position: relative; // #map1 {
      #map1,
      img,
      .page {
        width: 100%;
        height: 100%;
      }
      .page{
        height: 14.4rem;
        width:100%;
        background-size:100% 100%!important;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto 0;
        text-align:center;
        padding:2.133333rem 0 0 0;
        .num5,.num6{
          font-size: 0.8rem;
          color: #FF5D4E;
          line-height: 0.933333rem;
          font-family:DIN-Medium;
          i{
            font-size: 0.4rem;
            padding-left:0.266667rem;
          }
        }
        .num5{
          font-size:0.666667rem;
        }
        .textNum{
          padding-top:0.133333rem;
          font-size: 0.4rem;
          font-family:DIN-Medium;
        }
        .lendDataSum{
          padding-top:3.013333rem;
          padding-bottom: 3.573333rem;
        }
      }
      .page3{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report3.png) no-repeat;
        padding-top:6.133333rem;
        .num6{
          padding-bottom:1.466667rem;
        }
        .num6:first-child{
          i{
            padding-left:0;
          }
        }
      }
      .page4{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report4.png) no-repeat;
        .topArp{
          padding-top:1.3rem;
          .num6:first-child{
            padding-bottom:1.36rem;
          }
        }
        .listNum{
          padding: 0.6rem 0.613333rem 0;
          li{
            padding-top:0.16rem;
            padding-bottom:0.22rem;
            text-align:right;
            padding-right: 3.013333rem;
            .zero{
              font-size:0.373333rem;
              height:0.506667rem;
              i{
                font-size:0.32rem;
                padding-left:0.133333rem;
                line-height:0.48rem;
              }
            }
          }
        }
      }
      .page5{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report5.png) no-repeat;
        .monthSum{
          padding:1.706667rem 0.613333rem 1.6rem;
          .num6{
            i{
              padding-left: 0.133333rem;
            }
          }
          .bidSum{
            font-size:0.373333rem;
            line-height:0.426667rem;
            color:#004E9B;
            padding-top:0.32rem;
            text-align:left;
            padding-left:5rem;
          }
          
        }
        .num5{
          padding-bottom:1.066667rem;
        }
      }
      .page6{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report6.png) no-repeat;
        padding: 2.133333rem 0.613333rem 0;
        #map1{
          height:6.266667rem;
          width:8.8rem;
        }
        .mapList{
          background:url(https://aliyunsso.edspay.com/web/wx/template/newPeport/mapList.png) 0.746667rem 0px no-repeat;
          background-size:1.146667rem 3.2rem;
          li{
            padding-bottom:0.16rem;
            padding-left:0.373333rem;
            .name{
              color:#1E5DC2;
              font-size:0.293333rem;
              line-height:0.48rem;
              span{
                font-size:0.346667rem;
                display:inline-block;
                padding-right: 0.266667rem;

              }
            }
            .pillar{
              margin-right:0.533333rem;
              width:6.133333rem;
              height:0.48rem;
              border-radius:0.24rem;
              background:#CFE7FF;
              position: relative;
              .ratio{
                position: absolute;
                left: 0;
                top:0;
                height:0.48rem;
                width:1.333333rem;
                border-radius:0.24rem;
                background:#1E5DC2;
              }
              .numApr{
                position: absolute;
                right:0;
                top:0;
                height:0.48rem;
                font-size:0.293333rem;
                line-height:0.48rem;
                padding-right: 0.213333rem;
                font-family:DIN-Light;
                .span{
                  color:#FF5B54;
                }
                .people{
                  text-align:right;
                  display:inline-block;
                  width:1.3rem;
                }
              }
            }
          }
        }
      }
      .page7{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report7.png) no-repeat;
        .peopleNum{
          padding-left:0.613rem;
          padding-right:0.613rem;
          padding-top:1.813333rem;
          span{
            font-size:0.533333rem;
            line-height:0.666667rem;
            font-family:DIN-Medium;
            i{
              padding-left:0.133333rem;
              font-size: 0.346667rem;
            }
          }
          .span1{
            color:#2465C9;
            padding-left:2.4rem;
          }
          .span2{
            color:#FE5952;
            padding-left:1.233333rem;
          }
        }
        .picBox{
          position: relative;
          -webkit-perspective: 1000;
          .huan{
            position: absolute;
            background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/wxHuan.png) no-repeat;
            background-size:100% 100%;
            height:3.013333rem;
            width:5.333333rem;
            top:3rem;
            left:2.32rem;
          }
          .man,.wan{
            position: absolute;
            z-index:999;
            top:0;
            height:0.426667rem;
            width:2.666667rem;
            background-size:100% 100%!important;
            font-size:0.4rem;
            font-family: DIN-Medium;
            span{
              position: relative;
              top:-0.52rem;
              font-size: 0.32rem;
            }
            i{
              position: absolute;
              font-size:0.266667rem;
              top:-0.86rem;
            }
          }
          .man{
            background:url(https://aliyunsso.edspay.com/web/wx/template/newPeport/manArrows.png) no-repeat;
            top:3.333333rem;
            left:6.4rem;
            text-align:right;
            color: #0757A8;
            i{
              right:0.48rem;
            }
          }
          .wan{
            background:url(https://aliyunsso.edspay.com/web/wx/template/newPeport/wanArrows.png) no-repeat;
            top:3.2rem;
            left:1.466667rem;
            text-align:left;
            color: #FE6D65;
            i{
              left:0;
            }
          }
        }
        #pic{
          position: relative;
          height:8rem;
          width:100%;
          -webkit-transform: scale(1.1) rotateX(58deg);
          transform: scale(1.1) rotateX(58deg);
        }
      }
      .page8{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report8.png) no-repeat;
        .age{
          font-size:0.533333rem;
          color: #FF6861;
          font-family:DIN-Bold;
          padding-top:1.866667rem;
          padding-bottom:0.48rem;
        }
        #bar{
          height:7.733333rem;
          width:8.8rem;
          margin:0 0.613333rem;
        }
      }
      .page9{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report9.png) no-repeat;
        .userTOP{
          padding:1.76rem 0.613333rem 0;
          li{
            font-size:0.4rem;
            line-height:0.48rem;
            color:#FE5E57;
            padding:0 0 2.026667rem 3.36rem;
            .name{
              width:1.333333rem;
            }
            .num{
              font-family:DIN-Medium;
            }
          }
        }
      }
      .page10{
        // background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report10.png) no-repeat;
      }
      .page11{
        // background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report11.png) no-repeat;
      }
      .page12{
        // background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report12.png) no-repeat;
      }
      .page13{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report13.png) no-repeat;
      }
      .page14{
        background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report14.png) no-repeat;
        .btn{
          height:1.333333rem;
          width:4.533333rem;
          position: absolute;
          top:10.08rem;
          left:2.7rem;
        }
      }
      .page2 {
        background:url(https://aliyunsso.edspay.com/web/wx/template/newPeport/report2.png) no-repeat;
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
    width: 1.066667rem;
    height: 0.533333rem;
    background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/icon.png) no-repeat;
    background-size: 100%;
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
    background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/icon.png) no-repeat;
    background-size: 100%;
  }
  .slide-icon.last {
    display: none;
  }
}
</style>
