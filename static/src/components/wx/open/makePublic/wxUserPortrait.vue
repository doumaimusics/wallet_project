<template>
    <div id="user-portrait">
        <div class="title"><i></i>用户画像<i></i></div>

        <div class="ageData">
            <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                平台用户年龄分层
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
                <div id="bar1" class="bar"></div>
        </div>
        
        <div class="data-line bdr-b"></div>
        
        <div class="ageData">
            <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                平台用户性别比例
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
            <div class="pie-box clear">
                <div id="pie1" class="pie fl"></div>
                <div class="content fl">
                    <div class="num"><i  class="i1"></i>男性用户<span>{{pieData[0].value}}%</span></div>
                    <div class="num"><i  class="i2"></i>女性用户<span>{{pieData[1].value}}%</span></div>
                </div>
            </div>
        </div>

        <div class="data-line bdr-b"></div>
        
        <div class="mapData">
            <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                平台用户地域分布
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
            <div class="map-box">
                <div id="map1" class="map"></div>
            </div>
        </div>

        <div class="data-line bdr-b"></div>
        
        <div class="ageData">
            <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                资产端用户年龄分层
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
                <div id="bar2" class="bar"></div>
        </div>

        <div class="data-line bdr-b"></div>
        
        <div class="ageData">
            <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                资产端用户性别比例
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
            <div class="pie-box clear">
                <div id="pie2" class="pie fl"></div>
                <div class="content fl">
                    <div class="num"><i  class="i1"></i>男性用户<span>{{assetPieData[0].value}}%</span></div>
                    <div class="num"><i  class="i2"></i>女性用户<span>{{assetPieData[1].value}}%</span></div>
                </div>
            </div>
        </div>

        <div class="data-line bdr-b"></div>
        
        <div class="mapData">
            <div class="name">
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameLeft.png" alt="">
                资产端用户地域分布
                <img src="https://aliyunsso.edspay.com/web/wx/makePublic/nameRight.png" alt="">
            </div>
            <div class="map-box">
                <div id="map2" class="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                pingTotalUser:0,
                sexTotal:[],
                barData:{
                    age:['22以下','22-34','35-44','45-54','55以上'],
                    data:[]
                },
                pieData:[
                    {value:'0',name:'男性用户'},
                    {value:'0',name:'女性用户'}
                ],
                colorList:['#0A4897','#256ECC','#2E80E9',' rgba(46,128,233,0.80)','rgba(46,128,233,0.6)','rgba(46,128,233,0.55)','rgba(46,128,233,0.45)','rgba(189,221,255,1)','rgba(189,221,255,0.7)','rgba(189,221,255,0.55)'],
                mapData:[
                            {
                                name:'',
                                value:10,
                                selected:false ,
                                itemStyle:{
                                    normal:{areaColor:'#0A4897'},
                                    emphasis:{
                                        areaColor:'#0A4897',
                                        borderColor:'#ff4e44'
                                    }
                                },
                                label: { 
                                    normal: {  
                                        show: false,    
                                    }  
                                }, 
                            },
                        ],
                assetBarData:{
                    age:['18-25','26-35','36-50','50以上',],
                    data:[26,55,24,1]
                },
                assetPieData:[
                    {value:'81',name:'男性用户'},
                    {value:'19',name:'女性用户'}
                ],
                assetMapData:[
                            {
                                name:'广东',
                                value:9.5,
                                selected:false ,
                                itemStyle:{
                                    normal:{areaColor:'#0A4897'},
                                    emphasis:{
                                        areaColor:'#0A4897',
                                        borderColor:'#ff4e44'
                                    }
                                },
                                label: { 
                                    normal: {  
                                        show: false,    
                                    }  
                                }, 
                            },
                        ],
                mapCity:[
                    {name:'上海',value:0.7},
                    {name:'云南',value:3.8},
                    {name:'内蒙古',value:1.7},
                    {name:'北京',value:0.5},
                    {name:'吉林',value:1.5},
                    {name:'四川',value:7.7},
                    {name:'天津',value:0.5},
                    {name:'宁夏',value:0.4},
                    {name:'安徽',value:4.9},
                    {name:'山东',value:4.6},
                    {name:'山西',value:2.6},
                    {name:'广东',value:9.5},
                    {name:'广西',value:4.8},
                    {name:'新疆',value:0.7},
                    {name:'江苏',value:6.1},
                    {name:'江西',value:3.9},
                    {name:'河北',value:3.6},
                    {name:'河南',value:6.2},
                    {name:'浙江',value:5.2},
                    {name:'海南',value:1.0},
                    {name:'湖北',value:5.7},
                    {name:'湖南',value:5.6},
                    {name:'甘肃',value:1.8},
                    {name:'福建',value:4.8},
                    {name:'西藏',value:0.0},
                    {name:'贵州',value:2.7},
                    {name:'辽宁',value:2.1},
                    {name:'重庆',value:2.1},
                    {name:'陕西',value:2.7},
                    {name:'青海',value:0.3},
                    {name:'黑龙江',value:2.2},
                ],
    		}
    	},
        props:['numFormat'],
    	methods:{
            getBarData(id,barData,name){
                this.notLogPost('/user/query/getUserAgeRate',(data) =>{
                    if(data.resData){
                        barData.data = [];
                        this.pingTotalUser = data.resData.data.totalUser;
                        for(var val in data.resData.data){
                            if(val != 'totalUser'){
                                barData.data.push(((data.resData.data[val]/data.resData.data.totalUser)*100).toFixed(3));
                            }
                        }
                        this.getBar(id,barData,name);
                    }
                },{})
            },
            getpieData(id,pieData,name){
                this.notLogPost('/user/query/getUserSexRate',(data) =>{
                    if(data.resData){
                        var i = 0;
                        var sexList = data.resData.data;
                        for(var val in sexList){
                            if(val != 'totalUser'){
                                this.$set(pieData[i],'value',((sexList[val]/sexList.totalUser)*100).toFixed(0))
                                this.sexTotal[i] = sexList[val]
                                i++;
                            }
                        }
                        console.log(this.sexTotal)
                        this.getPie(id,pieData,name,1);
                    }
                },{})
            },
            getMapData(id,mapData,name){
                this.notLogPost('/user/query/getUserAreaRate',(data) =>{
                    if(data.resData){
                        data.resData.data.sort(function(a,b){
                            return b.areaNum - a.areaNum;
                        })
                        this.$set(mapData[0],'name',data.resData.data[1].province)
                        this.$set(mapData[0],'itemStyle[normal][areaColor]',this.colorList[0])
                        this.$set(mapData[0],'itemStyle[emphasis][areaColor]',this.colorList[0])
                        this.$set(mapData[0],'value',data.resData.data[1].areaNum)
                        for(var i=1;i<31;i++){
                            mapData[i] = this.deepCopy(mapData[i-1]);
                            this.$set(mapData[i],'name',data.resData.data[i+1].province)
                            this.$set(mapData[i].itemStyle.normal,'areaColor',this.colorList[i] ? this.colorList[i]:'rgba(189,221,255,0.55)')
                            this.$set(mapData[i].itemStyle.emphasis,'areaColor',this.colorList[i] ? this.colorList[i]:'rgba(189,221,255,0.55)')
                            this.$set(mapData[i],'value',data.resData.data[i+1].areaNum)
                        }
                        mapData[31] = this.deepCopy(mapData[30]);
                        this.$set(mapData[31],'name','台湾')
                        this.$set(mapData[31],'itemStyle[normal][areaColor]','rgba(189,221,255,0.55)')
                        this.$set(mapData[31],'itemStyle[emphasis][areaColor]','rgba(189,221,255,0.55)')
                        this.$set(mapData[31],'value',0)

                        mapData[32] = this.deepCopy(mapData[31]);
                        this.$set(mapData[32],'name','南海诸岛')
                        this.$set(mapData[32],'itemStyle[normal][areaColor]','rgba(189,221,255,0.55)')
                        this.$set(mapData[32],'itemStyle[emphasis][areaColor]','rgba(189,221,255,0.55)')
                        this.$set(mapData[32],'value',0)
                        console.log(mapData)
                        this.getMap(id,mapData,'地图',1);
                    }
                },{})
            },
            getAssetMapData(mapData){
                this.mapCity.sort(function(a,b){
                    return b.value - a.value;
                })
                for(var i=1;i<31;i++){
                    mapData[i] = this.deepCopy(mapData[i-1]);
                    this.$set(mapData[i],'name',this.mapCity[i].name)
                    this.$set(mapData[i].itemStyle.normal,'areaColor',this.colorList[i] ? this.colorList[i]:'rgba(189,221,255,0.55)')
                    this.$set(mapData[i].itemStyle.emphasis,'areaColor',this.colorList[i] ? this.colorList[i]:'rgba(189,221,255,0.55)')
                    this.$set(mapData[i],'value',this.mapCity[i].value)
                }

                mapData[31] = this.deepCopy(mapData[30]);
                this.$set(mapData[31],'name','台湾')
                this.$set(mapData[31],'itemStyle[normal][areaColor]','rgba(189,221,255,0.55)')
                this.$set(mapData[31],'itemStyle[emphasis][areaColor]','rgba(189,221,255,0.55)')
                this.$set(mapData[31],'value',0)

                mapData[32] = this.deepCopy(mapData[31]);
                this.$set(mapData[32],'name','南海诸岛')
                this.$set(mapData[32],'itemStyle[normal][areaColor]','rgba(189,221,255,0.55)')
                this.$set(mapData[32],'itemStyle[emphasis][areaColor]','rgba(189,221,255,0.55)')
                this.$set(mapData[32],'value',0)

                this.getMap('map2',mapData,'地图',0);
            },
            deepCopy(p, c) {
        　　　　var c = c || {};
        　　　　for (var i in p) {
        　　　　　　if (typeof p[i] === 'object') {
        　　　　　　　　c[i] = (p[i].constructor === Array) ? [] : {};
        　　　　　　　　this.deepCopy(p[i], c[i]);
        　　　　　　} else {
        　　　　　　　　　c[i] = p[i];
        　　　　　　}
        　　　　}
        　　　　return c;
            },
            getBar(id,barData,name,barType){
                var bar = echarts.init(document.getElementById(id));
                var that = this;
                var barOption = {
                    color: ['#4CB1FF'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                        },
                        formatter: function(datas){
                            var res = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#4CB1FF"></span>', val;
                            for(var i = 0, length = datas.length; i < length; i++) {
                                if(barType == 1){
                                    val = that.numFormat(datas[i].value) + '%';
                                }else{
                                    val = that.numFormat((datas[i].value* that.pingTotalUser)/100) + '人';
                                }
                                res += datas[i].seriesName + '：' + val + '<br/>';
                              }
                              return res;
                        },
                    },
                    grid: {
                        left: '10%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : barData.age,
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
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            axisLine:{show:false},
                            axisTick:{show:false},
                            splitLine: {show: false,},
                            axisLabel:{
                              formatter:'{value}% ',
                              textStyle:{fontSize:9,color:'#aaa'}
                            },
                        }
                    ],
                    series : [
                        {
                            name:name,
                            type:'bar',
                            barWidth: '20%',
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
            getPie(id,pieData,name,yType){
                var pie = echarts.init(document.getElementById(id));
                var that = this;
                var pieOption = {
                    color:['#4CB1FF','#9DD4FF'],
                    tooltip : {
                       trigger: 'item',
                       confine:true,
                       formatter: function(datas,index){
                            if(yType == 1){
                                return '性别比例<br/> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+datas.color+'"></span>'+datas.name+':' + that.sexTotal[parseInt(index.substr(-1))];
                            }else{
                                return '性别比例<br/> <span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:'+datas.color+'"></span> 人数比例:'+datas.name+':' +datas.value+'%';
                            }
                       }
                    },
                    series : [
                        {
                            name: name,
                            type: 'pie',
                            radius : '55%',
                            //labelLine:{normal:{show:false}},
                            center: ['50%', '60%'],
                            //hoverAnimation:false,
                            hoverOffset:3,
                            silent:false,
                            data:pieData,
                            label:{
                                normal:{
                                    show:false
                                },
                                // emphasis:{
                                //     show:true
                                // }
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

                pie.setOption(pieOption);
            },
            getMap(id,mapData,name,yType){
                var map = echarts.init(document.getElementById(id));

                var mapOption = {
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
                        formatter:function(datas){
                            if(yType == 1){
                                return '地区：'+datas.name+'<br/> 占比：'+datas.value+'人'
                            }else{
                                return datas.name+'<br/> 占比：'+datas.value+'%'
                            }
                        }
                    },
                    series:[{  
                        type: 'map',  
                        map: 'china',  
                        roam: false,//允许缩放和平移  
                        //初始化时的地图位置，可通过改变地图中心视角的经纬度来实现地图的平移  
                        center: [100.97, 35.71],  
                        zoom: 1.2, //地图缩放多少倍  
                        silent:false,
                        top:25,
                        left:'3%',
                        // label: {//设置地图区域名的文本样式，例如地名的字体大小等  
                        //     normal: {  
                        //         show: false, //显示地区的文本名称,默认是不显示的，默认状态是hoverORclick才显示   
                        //     }  
                        // },  
                        scaleLimit:{
                            min:0.5,max:2
                        },
                        itemStyle: {//地图区域的多边形图形样式  
                            normal: {  
                                areaColor: 'rgba(202,228,255,.49)',//地图区域颜色  
                                borderColor: '#fff',//图形的描边颜色  
                                borderWidth: 1,//描边线宽。为 0 时无描边  
                                borderType: 'solid',  
                                opacity: 0.8  
                            }  
                        },  
                        data:mapData
                    }]
                }  
                map.setOption(mapOption);
            }
    	},
    	mounted(){
            this.getBarData('bar1',this.barData,'用户数');
            this.getpieData('pie1',this.pieData,'比例');
            this.getMapData('map1',this.mapData);

            this.getBar('bar2',this.assetBarData,'用户比例',1);
            this.getPie('pie2',this.assetPieData,'比例');
            this.getAssetMapData(this.assetMapData);
            //this.getMapData('map2',this.assetMapData);

    	}
    }
</script>

<style lang="scss" scoped>
    #user-portrait{
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
        .data-line{
          position: relative;
          height:1px;
          width:8.88rem;
          margin:0 auto;
          margin: 0.933333rem auto 0.266667rem;
        }
        .bdr-b{border-bottom:1px solid #ddd;}
        .name{
            font-family:DIN-Regular;
            font-size:0.426667rem;
            line-height:0.586667rem;
            padding:0.533333rem 0;
            text-align:center;
            img{
                width:0.213333rem;
                height:0.133333rem;
            }
        }
        .ageData{
        }
        .bar{height: 7rem;width: 100%;}
        .pie-box{
            .pie{height: 6rem;width:60%;margin-top: -1.3rem;}
            .content{
                padding-top:1.2rem;
                .num{
                    color:#999;
                    font-size:0.293333rem;
                    line-height:0.426667rem;
                    padding-bottom: 0.8rem;
                    i{
                        float: left;
                        margin:0.19rem 0.133333rem 0 0;
                        height:0.16rem;
                        width:0.16rem;
                        border-radius: 50%;
                        background:#4CB1FF;
                    }
                    .i1{background:#4CB1FF;}
                    .i2{background:#9DD4FF;}
                    span{
                        display:inline-block;
                        color:#FF4E44;
                        font-size:0.373333rem;
                        line-height:0.533333rem;
                        padding: 0 0.133333rem;
                        font-family:DIN-Regular;
                    }
                }
            }
        }  
        .map-box{
            height:7rem;width:100%;
            position:relative;
            .map{
                height: 7rem;
                width:100%;
                left:5%;
            }
        }
    }
</style>