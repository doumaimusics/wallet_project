<template>
    <div :style="{height:fullHeight + 'px'}" id="newReport">
        <swiper :style="{transform:'scale('+ (fullHeight<660 ? (660/900):(fullHeight/900)) +')'}" :options="swiperOption">
            <!-- 第一屏 报告封面 -->
            <swiper-slide>
                <div :style="{background:'url('+ reportData.operation.bannerPath +')',backgroundSize:'100% 100%'}" class="page1 page"></div>
            </swiper-slide>
            <!-- 第二屏 累计交易数据 -->
            <swiper-slide>
                <div class="page2 page">
                    <div class="dealMoney clear">
                        <div class="fl lendData lendDataSum">
                            <div class="num6">{{reportData.monthCountSum | moneyFormat}}<i>元</i></div>
                            <div class="textNum">累计借贷{{reportData.monthSumNumber}}笔</div>
                        </div>
                        <div class="fl lendData">
                            <div class="num6">{{reportData.debtOrderCountSum | moneyFormat}}<i>元</i></div>
                            <div class="textNum">未还{{reportData.debtOrderSumNumber}}笔</div>
                        </div>
                    </div>
                    <div class="peopleNum clear">
                        <span class="fl num3">{{reportData.tender_count | moneyFormat(1)}}</span>
                        <span class="fl num3">{{reportData.register_count | moneyFormat(1)}}</span>
                        <span class="fl num3">{{reportData.borrow_count | moneyFormat(1)}}</span>
                    </div>
                </div>
            </swiper-slide>
            <!-- 第三屏 累计交易数据 -->
            <swiper-slide>
                <div :style="{background:'url('+ reportData.operation.borrowUrl +') no-repeat',backgroundSize:'100% 100%'}" v-if="reportData.operation.borrowUrl" class=" page"></div>
                <div class="page3 page" v-else>
                    <div class="numApr">
                        <div class="num6">{{reportData.borrowCount_topTen}}%</div>
                        <div class="num6">{{reportData.borrowCount_topOne}}%</div>
                    </div>
                    <ul class="dataZero">
                        <li v-for="item in 4" class="fl">
                            <div class="zero">0<i class="ic_1">元</i></div>
                            <div class="zero">0<i class="ic_1">笔</i></div>
                        </li>
                    </ul>
                </div>
            </swiper-slide>
            <!-- 第四屏 当月交易数据 -->
            <swiper-slide>
                <div class="page4 page">
                    <div class="monthNum">
                        <div class="num6">{{reportData.transaction | moneyFormat(1)}}<i>笔</i></div>
                        <div class="textNum">{{reportData.month_issue}}个</div>
                    </div>
                    <div class="peopleNum">
                        <span class="fl num5">{{reportData.month_register | moneyFormat(1)}}<i>人</i></span>
                        <span class="fl num5">{{reportData.month_tender | moneyFormat(1)}}<i>人</i></span>
                        <span class="fl num5">{{reportData.month_borrow | moneyFormat(1)}}<i>人</i></span>
                    </div>
                </div>
            </swiper-slide>
            <!-- 第五屏 用户区域地图 -->
            <swiper-slide>
                <div class="page5 page">
                    <div id="map" class="fl"></div>
                    <ul v-if="reportData.province_count.length" class="mapList fl">
                        <li v-for="(item,index) in reportData.province_count" v-if="index<6" class="clear">
                            <div  class="name fl"><span class="ic-2">{{index+1}}</span>{{item.name}}省</div>
                            <div class="pillar fr ic-2">
                              <div :style="{width:newMapList[index]+'%',background:mapColor[index]}" class="ratio"></div>
                              <div class="numApr">
                                <span class="span">{{newMapList[index]}}%</span>
                                <!-- <span>{{item.value}}人</span> -->
                              </div>
                            </div>
                        </li>
                        <li>
                            <div  class="name fl"><span> </span>其他</div>
                            <div class="pillar fr">
                              <div :style="{width:newMapList[6]+'%',background:mapColor[6]}" class="ratio"></div>
                              <div class="numApr">
                                <span class="span">{{newMapList[6]}}%</span>
                                <!-- <span>2541人</span> -->
                              </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </swiper-slide>
            <!-- 第六屏 用户性别年龄占比 -->
            <swiper-slide>
                <div class="page6 page clear">
                    <div class="picbox fl">
                        <div id="pic"></div>
                        <div class="man"><span>{{(reportData.sex_tender[0].value*100)/(reportData.sex_tender[0].value + reportData.sex_tender[1].value) | moneyFormat}}%</span><i>男性</i></div>
                        <div class="wan"><span>{{(reportData.sex_tender[1].value*100)/(reportData.sex_tender[0].value + reportData.sex_tender[1].value) | moneyFormat}}%</span><i>女性</i></div>
                        <div class="huan"></div>
                    </div>
                    <div class="fl" id="bar"></div>
                </div>
            </swiper-slide>
            <!-- 第七屏 用户榜单 -->
            <swiper-slide>
                <div class="page7 page">
                    <div class="maxMoney">
                        <span class="name">{{reportData.activeUser1.name}}</span>
                        <span class="money">{{reportData.activeUser1.money | moneyFormat(1)}}元</span>
                    </div>
                    <ul class="moneyList">
                        <li class="fl">
                            <span class="name">{{reportData.activeUser2.name}}</span>
                            <span class="money">{{reportData.activeUser2.num | moneyFormat(1)}}笔</span>
                        </li>
                        <li class="fl">
                            <span class="name">{{reportData.activeUser4.name}}</span>
                            <span class="money">{{reportData.activeUser4.money | moneyFormat}}元</span>
                        </li>
                        <li class="fl">
                            <span class="name">{{reportData.activeUser3.name}}</span>
                            <span class="money">{{reportData.activeUser3.red | moneyFormat(1)}}个</span>
                        </li>
                    </ul>
                </div>
            </swiper-slide>
            <!-- 第八屏 资产端数据 -->
            <swiper-slide>
                <div :style="{background:'url('+ reportData.operation.assetData +') no-repeat',backgroundSize:'100% 100%'}" class="page8 page"></div>
            </swiper-slide>
            <!-- 第九屏 当月主要活动 -->
            <swiper-slide>
                <div :style="{background:'url('+ reportData.operation.monthActivit +') no-repeat',backgroundSize:'100% 100%'}" class="page9 page"></div>
            </swiper-slide>
            <!-- 第十屏 当月大事记 -->
            <swiper-slide>
                <div :style="{background:'url('+ reportData.operation.monthEvent +') no-repeat',backgroundSize:'100% 100%'}" class="page10 page"></div>
            </swiper-slide>
            <!-- 第十一屏 收费标准 -->
            <swiper-slide>
                <div class="page11 page"></div>
            </swiper-slide>
            <!-- 第十二屏 结束页 -->
            <swiper-slide>
                <div class="page12 page"></div>
            </swiper-slide>
            <div style="bottom:20px;top:560px;" class="swiper-pagination" slot="pagination"></div>
        </swiper>        
        <div v-if="swiperIndex != 12" class="slide-icon"></div>
    </div>
</template>

<script>
    export default{
    	data(){
            let that = this;
    		return{
                swiperIndex:0,
                swiperOption: {
                    direction: 'vertical',
                    pagination: '.swiper-pagination',
                    paginationClickable :true,
                    mousewheelControl : true,
                    onSlideChangeEnd: function(swiper) {
                      that.swiperIndex = swiper.activeIndex;
                    }
                },
                fullHeight:window.innerHeight,//当前屏幕高度

                reportData:{province_count:[]},//后台返回数据
                newMapList:[],
                mapColor:['#004BC3','#0062FF','#2B7DFF','#3F9AFF','#61ACFF','#8DC3FF','#50A3FF'],
                pieData:[
                  {value:'524',name:'男性用户'},
                  {value:'596',name:'女性用户'}
                ],
                barXdata:['22以下','22-34','35-44','45-54','55以上'],//年龄X轴
                ageData:[],//年龄数据
                ageType:'',
    		}
    	},
    	methods:{
            getnewMapList(mapData){  //获取地图前七排名
                let topSeven = 0;
                let sunPeople = 0;
                mapData.push({name:'南海诸岛',value:0})
                
                this.reportData.province_count.map((item,index) => {
                    sunPeople = sunPeople + item.value;
                    if(index < 6){
                        item.itemStyle = {
                            normal:{areaColor:this.mapColor[index]},
                            emphasis:{areaColor:this.mapColor[index]}
                        }
                    }else{
                        item.itemStyle = {
                            normal:{areaColor:'#50A3FF'},
                            emphasis:{areaColor:'#50A3FF'}
                        }
                    }
                })
                for(let i=0;i<6;i++){
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
              console.log(this.ageData[4])
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
              let myChart = echarts.init(document.getElementById("map"));
              let option = {
                tooltip:{
                  show:true,
                  showContent:true,
                  confine:true,
                  triggerOn:'mousemove',
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
                          borderColor:'#fff' //边框颜色
                      },
                      normal: {  
                          areaColor: '#50A3FF',//地图区域颜色  
                          borderColor: '#004BC3',//图形的描边颜色  
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
                  color:['#4EDAFE','#FDA26A'],
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
                          left: '5%',
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
                                textStyle:{fontSize:14,color:'#fff'}
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
                                textStyle:{fontSize:14,color:'#fff'}
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
                                    color:'#fff',
                                    fontSize:13,
                                    fontFamily:'DIN-Medium'
                                  }
                                }
                              },
                              itemStyle:{
                                normal:{
                                  barBorderRadius:[26,26,0,0],
                                  color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1,
                                    [
                                        {offset: 0, color: '#4CF9FE'},
                                        {offset: 1, color: '#0345A6'}
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
        mounted(){
            const that = this
            window.onresize = () => {
                return (() => {
                  window.fullHeight = document.documentElement.clientHeight
                  that.fullHeight = window.fullHeight
                })()
            }
        },
        watch: {
            swiperIndex() {
                if (this.swiperIndex == 4) {
                  this.getMap();
                } else if (this.swiperIndex == 5) {
                  this.getPie();
                  this.getBar();
                }
            }
        }
    }
</script>

<style lang="scss">
#newReport{
    .swiper-pagination{
        .swiper-pagination-bullet{
            margin:10px 0;
            border:1px solid #fff;
            background:rgba(255,255,255,0);
        }
        .swiper-pagination-bullet-active{
            background:#fff;
        }
    }
}
</style>

<style lang="scss" scoped>
    #newReport{
        overflow: hidden;
        position: absolute;
        width:100%;
        font-family:PingFang-SC-Medium;
        background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/reportPCBg.png) no-repeat center;
        .swiper-container{
            height:900px;
            width:1200px;
            position: absolute;
            left:50%;
            top:50%;
            margin-top:-450px;
            margin-left:-600px;
            .swiper-slide{
                position: relative;
                .page{
                    color:#fff;
                    width:100%;
                    height:100%;
                    background-size: 100% 100%;
                    text-align:center;
                    padding:155px 50px 0 49px;
                    .num6{
                        font-size: 60px;
                        line-height:77px;
                        font-family:DIN-Medium;
                        i{
                            font-size:30px;
                            line-height:50px;
                        }
                    }
                    .num5{
                        font-size:50px;
                        font-family:DIN-Medium;
                        i{
                            font-size:30px;
                            line-height:42px;
                        }
                    }
                    .num3{
                        font-size:0.4rem;
                        font-family:DIN-Medium;
                    }
                }
                .page1{
                    // background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report1.png) no-repeat center;
                }
                .page2{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report2.png) no-repeat center;
                    .dealMoney{
                        padding-top:245px;
                        .lendData{
                            width:50%;
                            .num6{
                                font-size:46px;
                                line-height:77px;
                                height:77px;
                            }
                            .textNum{
                                padding-top:20px;
                                font-size:26px;
                                font-family:DIN-Regular;
                            }
                        }
                    }
                    .peopleNum{
                        padding-top:160px;
                        span{
                            width:33.3%;
                        }
                    }
                }
                .page3{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report3.png) no-repeat center;
                    .numApr{
                        padding-top:110px;
                        .num6{
                            padding-bottom:80px;
                        }
                    }
                    .dataZero{
                        margin-top:-24px;
                        li{
                            height:90px;
                            width:420px;
                            margin:0 80px 16px 50px;
                            padding-top:10px;
                            .zero{
                                text-align:left;
                                padding-left:310px;
                                font-size:28px;
                                line-height:34px;
                                font-family:DIN-Light;
                            }
                            i{
                                padding-left:16px;
                                font-size:24px;
                            }
                            
                        }
                        li:nth-child(2n){
                            margin:0 50px 16px 80px;
                        }
                    }
                }
                .page4{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report4.png) no-repeat center;
                    .monthNum{
                        text-align:left;
                        padding-left: 470px;
                        padding-top:170px;
                        .textNum{
                            font-size:25px;
                            padding-left:170px;
                            padding-top:8px;
                        }
                    }
                    .peopleNum{
                        padding:166px 60px 0;
                        span{
                            width:33.3%;
                        }
                    }
                }
                .page5{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report5.png) no-repeat center;
                    #map{
                        width:580px;
                        height:620px;
                        padding:80px 0;
                    }
                    .mapList{
                        padding:128px 0 0 20px;
                        background:url(https://aliyunsso.edspay.com/web/wx/template/newPeport/mapList.png) 50px 128px no-repeat;
                        background-size:86px 240px;
                        li{
                            padding-bottom:18px;
                            .name{
                                font-size:22px;
                                line-height:30px;
                                span{
                                    display:inline-block;
                                    width:40px;
                                    font-size:25px;
                                    padding-right: 26px;
                                }
                            }
                            .pillar{
                                height:30px;
                                width:340px;
                                border-radius: 15px;
                                background:#EEF6FF ;
                                margin-left:30px;
                                position: relative;
                                .ratio{
                                    height:30px;
                                    border-radius:15px;
                                    position: absolute;
                                    top:0;
                                    left:0;
                                }
                            }
                            .numApr{
                                position: absolute;
                                right:0;
                                top:0;
                                line-height:30px;
                                color:#333;
                                font-size:18px;
                                font-family:DIN-Regular;
                                padding-right:15px;
                            }
                        }
                    }
                }
                .page6{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report6.png) no-repeat center;
                    .fl{
                        width:50%;
                        height:460px;
                    }
                    .picbox{
                        padding-top:50px;
                        height:460px;
                        position: relative;
                        .huan{
                            position: absolute;
                            z-index:99;
                            top:180px;
                            left:74px;
                            height:226px;
                            width:400px;
                            background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/pcHuan.png) no-repeat;
                            background-size:100% 100%;
                        }
                        .man,.wan{
                            position: absolute;
                            top:198px;
                            z-index:199;
                            font-family:DIN-Medium;
                            span{
                                font-size:30px;
                                position: absolute;
                                top:-40px;   
                            }
                            i{
                                position: absolute;
                                top:-66px;
                                font-size: 20px;
                            }
                        }
                        .man{
                            background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/pcRight.png) no-repeat;
                            right:60px;
                            width:156px;
                            height:41px;
                            i{
                                right:34px;
                            }
                        }
                        .wan{
                            background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/pcLeft.png);
                            left:50px;
                            top:195px;
                            height:25px;
                            width:165px;
                            text-align:left;
                            i{
                                left:0;
                            }
                        }
                    }
                    #pic{
                        width:100%;
                        height:410px;
                        transform:scale(1.6) rotateX(58deg); 
                    }
                }
                .page7{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report7.png) no-repeat center;
                    .maxMoney{
                        padding-top:235px;
                        line-height:30px;
                        .name{
                            font-size:24px;
                            padding-right:32px;
                        }
                        .money{
                            font-size:22px;
                        }
                    }
                    .moneyList{
                        padding-top:240px;
                        li{
                            font-family:DIN-Regular;
                            float: left;
                            width:33.3%;
                            font-size:24px;
                            .name{
                                padding-right:30px;
                            }
                        }
                    }
                }
                .page8{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report8.png) no-repeat center;
                }
                .page9{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report9.png) no-repeat center;
                }
                .page10{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report10.png) no-repeat center;
                }
                .page11{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report11.png) no-repeat center;
                }
                .page12{
                    background:url(https://aliyunsso.edspay.com/web/pcImg/template/newReport/report12.png) no-repeat center;
                }
                
                
            }
        }
        @-moz-keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        @-ms-keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        @-webkit-keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        @keyframes slide {
          0% {
            bottom: 30px;
            opacity: 1;
          }
          50% {
            bottom: 60px;
            opacity: 0.5;
          }
          100% {
            bottom: 30px;
            opacity: 1;
          }
        }
        .slide-icon {
            width: 80px;
            height: 40px;
            background: url(https://aliyunsso.edspay.com/web/wx/template/newPeport/icon.png) no-repeat;
            background-size: 100%;
            position: absolute;
            bottom: 10px;
            left: 0;
            right: 0;
            margin: auto;
            z-index: 999;
            -webkit-animation: slide 1.5s infinite;
            -moz-animation: slide 1.5s infinite;
            -ms-animation: slide 1.5s infinite;
            animation: slide 1.5s infinite;
        }
    }
</style>