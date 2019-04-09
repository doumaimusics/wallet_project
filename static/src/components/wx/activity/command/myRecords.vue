<template>
    <div class="command-root">
        <div v-title>我的福袋记录</div>
        <!-- 头部 -->
        <div class="command-top">
            <!-- 选择时间 -->
            <span @click="openPop" class="select-time" v-if="timeData.length!=0">{{timeStr}}<i></i></span>
            <!-- 头像 -->
            <img :src="info.userImage?info.userImage:'https://aliyunsso.edspay.com/web/wx/account/head.png'"/>
            <p class="command-count">共获得{{rewardList.total}}个福袋奖励</p>
        </div>
        <div class="fic-div"></div>
        <!-- 列表 -->
        <command-list v-if="open" :rewardList = 'rewardList'  :add="add" @refreshInfo = "getInfo" :pageNum="pageNum" :pages="pages"></command-list>
        <!-- popup -->
        <mt-popup v-model="ifSelectTime"  position="bottom" :closeOnClickModal="false">
            <div class="licenseBox">
                <div class="close-box fl" @click="closePop"></div>
                <p class="fr" @click="selectTime">完成</p>
            </div>
            <div class="picker-div">
                <mt-picker style="width:45%;float:left;margin-top: .5rem;"  :slots="yearValue" @change="yearChange" ref="yearPicker"   valueKey="name" :visible-item-count="3"></mt-picker>
                <p style="width:8%;float:left;text-align:center;margin-top:1.5rem">-</p>
                <mt-picker style="width:45%;float:right; margin-top: .5rem;"   :slots="monthValue" @change="monthChange" ref="monthPicker"   valueKey="name" :visible-item-count="3"></mt-picker>
            </div>
        </mt-popup>
    </div>
</template>
<script>
    import list from './myList.vue'
    import { Popup } from 'mint-ui';
    import { Picker } from 'mint-ui';
    import wxToapp from '../../../../common/wx/wxToapp'
    import VDistpicker from 'v-distpicker';//省市区组件
    export default {
        mixins: [wxToapp],
        data() {
            return{
                yearMonth: '', // 拼接给后台的年月
                ifSelectTime: false,  // 控制popup
                timeStr: '', // 显示在页面的年月
                yearInit:[], // 初始年份
                timeInit:false, //获取年份标志 避免没获取到年份加载组件报错
                timeData:[], // 日期数组
                rewardList: [], 
                add: '', // 是否有添加地址
                yearValue: [{
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }],
                monthValue: [{
                    flex: 1,
                    values: [],
                    className: 'slot1',
                    textAlign: 'center'
                }],
                pages:1, // 总页数
                pageNum:1, // 当前页
                info:{},
                showMonth:false,
                selectYear:{}, // 选中的年份对象
                selectMonth: {}, // 选中的月份对象
                open:true, // 控制列表显示，避免翻页位置固定
            }
        },
        methods: {
            // 获取信息
            getInfo (now) {
                this.pageNum = now
                this.getAppData('/fudai/rewardList',(data) =>{
                    if(data.resCode){
                        this.info = data.resData
                        this.add = data.resData.add
                        if (now == 1) {
                            this.rewardList = data.resData.rewardList
                            this.pages = data.resData.rewardList.pages;
                        } else {
                            this.rewardList.list = this.rewardList.list.concat(data.resData.rewardList.list)
                        }
                        setTimeout(()=> {
                            this.open = true
                        },200)
                    }
                },{yearMonth:this.yearMonth,pageSize:7,pageNum:now})
            },
            // 获取记录年月
            getRecordTime () {
                this.postData('/fudai/getTimeList',(res,data) => {
					if(data.resCode){
                        this.timeData = data.resData.data
                        if (data.resData.data.length!=0) {
                            this.getYear()  // 有记录picker组件赋值
                        } else {
                            this.getInfo(1)  // 没有记录直接获取信息
                        }
					}
				},{})
            },
            // picker的change事件
            yearChange (picker, values) {
                // 避免初始化空值
                this.$nextTick(()=>{
                    setTimeout(()=> {
                        // 避免月份报错
                        this.monthValue[0].values = []
                        if (this.timeInit) {
                                setTimeout(()=>{
                                    this.monthValue[0].values = this.getMonth(values[0])
                                },200)
                            this.selectYear = values[0]
                        }
                    })
                })
            },
            monthChange (picker, values) {
                // 避免初始化空值
                this.$nextTick(()=>{
                    setTimeout(()=> {
                            this.selectMonth = values[0]
                    })
                })
            },
            // 获取年份
            getYear () {
                let yearArr = [];  
                this.timeData.forEach((item)=> {
                    let obj = {};  
                    obj.name = item.year+'年';  
                    obj.id = item.year;  
                    yearArr.push(obj);  
                }); 
                this.yearInit = yearArr[yearArr.length-1]
                // 给slot年份赋值
                this.yearValue[0].values = yearArr;  
                this.yearValue[0].defaultIndex = yearArr.length-1
                setTimeout(()=>{
                    this.monthValue[0].defaultIndex = this.getMonth(this.yearInit).length-1 
                },100)  
                // 避免picker组件lenth为1的bug
                // if (this.getMonth(this.yearInit).length != 1) {
                // }
                // 拼接给后台传的年月
                this.yearMonth = yearArr[yearArr.length-1].id + this.getMonth(this.yearInit,'first').id
                this.timeStr = yearArr[yearArr.length-1].name + this.getMonth(this.yearInit,'first').name
                this.timeInit = true
                // 请求信息
                this.getInfo(1)
            },
            // 获取月份
            getMonth (year,init) {
                console.log(year)
                let monthArr = [];  
                this.timeData.forEach((item) => {
                    if (year.id == item.year) {
                         item.month.forEach((month)=> {
                             let obj = {};  
                            obj.name = month.name+'月'; 
                            obj.id = month.id; 
                            monthArr.push(obj);
                         })
                    }
                }); 
                if (init =='first') {
                    monthArr = monthArr[monthArr.length-1]
                } 
                return monthArr;
            },
            // 筛选时间
            selectTime () {
                // 延迟处理
                this.$nextTick(()=>{
                    // 关闭
                    this.ifSelectTime = false
                    this.timeStr =this.selectYear.name  +this.selectMonth.name
                    this.yearMonth = this.selectYear.id +this.selectMonth.id
                     this.open = false
                     this.getInfo(1)
                })
            },
            openPop () {
                this.ifSelectTime=true
            },
            closePop () {
                this.ifSelectTime=false
            }
        },
        created () {
            this.getRecordTime()
        },
        components: {
            'command-list': list,
            VDistpicker
        }
    }
</script>
<style lang="scss" scoped>
    .command-root {
        width: 100%;
        height: 100vh;
        background: #F8F8F8;
        overflow: scroll;
        .fic-div {
            height: 5.12rem;
            width: 100%;
        }
        .command-top {
            height: 5.12rem;
            width: 100%;
            background: url(https://aliyunsso.edspay.com/web/activity/command/fdlqxq_bg.png) top center no-repeat;
            background-size: cover;
            overflow: hidden;
            position: fixed;
            z-index: 99;
            img {
                width: 2rem;
                height: 2rem;
                display: block;
                box-shadow: 0 .04rem .08rem 0 rgba(0,0,0,0.50);
                border-radius: 50%;
                margin:.76rem auto 0 auto;
            }
            .command-count {
                margin-top: .733333rem;
                font-size: .373333rem;
                text-align: center;
                color: #FFFFFF;
            }
            .select-time {
                position: absolute;
                top: .666667rem;
                right: .466667rem;
                color: #FFFFFF;
                font-size: .373333rem;
                i {
                    width: .346667rem;
                    height: .346667rem;
                    display: inline-block;
                    background: url(https://aliyunsso.edspay.com/web/activity/command/sanjiao.png);
                    background-size: cover;
                    vertical-align: middle;
                    margin-left: .066667rem;
                }
            }
        }
        .mint-popup {
            width: 100%;
        }
    }
    .licenseBox {
        width: 100%;
        height: 1.2rem;
        padding: .28rem .4rem;
        border-bottom: .023333rem solid #E5E5E5;
        .close-box {
            width: .426667rem;
            height: .453333rem;
            background: url(https://aliyunsso.edspay.com/web/activity/command/XX.png);
            background-size: cover;
            margin-top: .076667rem;
        }
        p{
            font-size: .453333rem;
            color: #508CEE;
        }
    }
    .yearDiv {
        height: 1rem;
        overflow:hidden;
        width: 100%;
        padding: .28rem .4rem;
        font-size: .373333rem;
    }
    .picker-div {
        overflow: hidden;
        height: 4rem;;
    }
</style>
