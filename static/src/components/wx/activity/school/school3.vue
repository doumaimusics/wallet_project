<template>
    <div class="school-div3" ref="school3">
        <div class="school3-top">
            <!-- 未登录 -->
            <img class="top-img" v-if="!login" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3-weidenglu.png"/>
            <!-- 已登录上榜 -->
            <div class="top-div" v-else-if="login&&info.isTop==1">
                <img class="top-btn" @click="goInvest" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3-ljcj2.png"/>
                <p>今日累计净出借金额：<span>{{info.myCleanMoney | moneyFormat}}元</span></p>
                <p>昨天荣登出借榜单第<span>{{info.sort}}</span>名，获得{{info.myReward}}。</p>
            </div>
            <!-- 已登录未上榜 -->
            <div class="top-div" v-else>
                <img class="top-btn top-btn2" @click="goInvest" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3_ljcj.png"/>
                <p class="top-out">今日累计净出借金额：<span>{{info.myCleanMoney | moneyFormat}}元</span></p>
            </div>
        </div>
        <!-- 筛选日期 -->
        <div class="select-div" @click="openPicker">
            {{nowDateStr}}
        </div>
        <mt-datetime-picker
                ref="datetimepicker"
                type="date"
                v-model="nowDate"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @confirm="handleConfirm"
                @cancel="handelClose"
                :closeOnClickModal="false"
                :startDate="startDate"
                :endDate="endDate">
        </mt-datetime-picker>
        <!-- 排行榜 -->
        <div class="bottom-div" ref="table">
            <i v-if="list.length==0">暂无数据</i>
            <ul v-else>
                <li v-for="item in list">
                    <span>{{item.phone}}<em v-if="item.isTodayTop">(我)</em></span>
                    <span>{{item.cleanMoney}}</span>
                    <span>{{item.reward}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
import { DatetimePicker } from 'mint-ui';
import { MessageBox } from 'mint-ui';
export default {
        mixins: [wxToapp],
        props:['login','isOver'],
        data() {
            return {
                dateTime: '',
                startDate: new Date('2018-08-01'),
                endDate:  new Date('2018-09-30'),
                nowDate:'',
                nowDateStr:'',
                fullHeight:{
                    height: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
                },
                info:{
                    myCleanMoney:0,
                    sort:0,
                    myReward:0,
                },
                list:[],
                isOpen:false,
            }
        },
        methods: {
            // 获取信息
            getInfo () {
                this.getNotlogData('/kxj/getMoneyList',(data) => {
                    if(data.resCode == 1){
                        this.info = data.resData
                        this.list = data.resData.list
                        if (data.resData.list.length == 0) {
                            this.$refs.table.style.backgroundImage = 'url()'
                        } else {
                            this.$refs.table.style.backgroundImage = "url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3-phbbg.png)"
                        }
                    }
                },{date:this.nowDateStr},)
            },
            // 获取当天日期字符串
            getDateStr (date,type) {
                var year=date.getFullYear();
                var month=((date.getMonth()+1)<10?'0':'')+(date.getMonth()+1);
                var day=(date.getDate()<10?'0':'')+date.getDate();
                if (type == 'ios') {
                    return year+'/'+month+'/'+day
                } else {
                    return year+'-'+month+'-'+day
                }
            },
            // 打开日期选择器
            openPicker () {
                let check = false
                this.isOpen = true
                if (this.nowDate!=='') {
                    if (this.nowDate.getTime() ==1533052800000) {
                        check = true
                    }
                } else {}
                if (check||!this.nowDate) {
                    setTimeout(()=> {
                        this.$nextTick(function () {
                            this.$refs.datetimepicker.currentValue = new Date()
                        })
                    },200)
                }
                this.$refs.datetimepicker.open()
            },
            handelClose () {
                this.isOpen = false
            },
            // 日期选择器确认
            handleConfirm (data) {
                this.nowDate = data
                this.nowDateStr = this.getDateStr(data)
                this.isOpen = false
                this.getInfo()
            },
            // 去投资页面
            goInvest () {
                if (this.isOver) {
                    MessageBox('温馨提示', '该活动已结束！');
                    return
                }
                this.toApp('WIP',{path:'/wxInvest',query:{thisUrl:this.$route.fullPath}})
            },
            isMove(e) {
                e.preventDefault();
            },
            closeTouch:function(){
                document.body.addEventListener('touchmove', this.isMove, { passive:false});
            },
            openTouch:function(){
               document.body.removeEventListener('touchmove', this.isMove,  { passive:false});
            },
        },
        created () {
            // this.nowDate = new Date()
            // this.osType =='IOS'?this.nowDate = new Date(this.getDateStr(new Date(),'ios')) : this.nowDate = new Date()
            // this.nowDate = new Date('2018/08/24')
            this.nowDateStr = this.getDateStr(new Date())
            this.getInfo()
        },
       watch: {
			'isOpen'(val) {
				if (val) {
                    this.closeTouch()
                    document.body.setAttribute("class","bodychannel");
				} else {
                    this.openTouch()
					document.body.removeAttribute("class","bodychannel");
				}
			}
		}
}
</script>
<style>
	body.bodychannel {
			overflow: hidden;
            height: 100%;
	}
</style>
<style lang="scss" scoped>
     .school-div3 {
        width:100%;
        height:21.973333rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3-bg.png);
        background-size:100% 21.973333rem;
        position: relative;
        .school3-top {
            position: absolute;
            width: 8rem;
            height: 2.133333rem;
            top: 5.266667rem;
            left: .993333rem;
            .top-img {
                width: 8rem;
                height: 1.6rem;
                margin-top: .533333rem;
            }
        }
        .top-div {
            width: 8rem;
            height: 2.133333rem;
            padding: .106667rem .233333rem .23333rem .45333rem;
            position: relative;
            p {
                font-size: .32rem;
                color: #653830;
                line-height: .44rem;
                margin-top: .206667rem;
                span {
                    color: #FD5C59;
                }
            }
            .top-btn {
                position: absolute;
                width: 1.813333rem;
                height: .773333rem;
                top: 0;
                right: .433333rem;
            }
            .top-btn2 {
                height: 1.226667rem;
            }
            .top-out {
                margin-top: .703333rem;
            }
        }
        .select-div {
            position: absolute;
            top: 9.1583333rem;
            left: 7rem;
            font-family: PingFang-SC-Medium;
            font-size: .32rem;
            color: #333333;
        }
        .bottom-div {
            position: absolute;
            width: 8.666667rem;
            height: 4.186667rem;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/3-phbbg.png);
            background-size:100% 4.186667rem;
            top: 10.933333rem;
            left: .666667rem;
            i {
                font-size: .48rem;
                color: #763E01;
                display: inline-block;
                width: 100%;
                text-align: center;
                line-height: 4.186667rem;
            }
            ul {
                margin-left: .95rem;
                li {
                    height: .666667rem;
                    line-height: .666667rem;
                    width: 7.6rem;
                    margin-bottom: .213333rem;
                    font-size: .32rem;
                    color: #753D00;
                    span {
                        text-align: center;
                        display: inline-block;
                    }
                    span:nth-of-type(1) {
                        width: 2.666667rem;
                    }
                    span:nth-of-type(2) {
                        width: 2.333333rem;
                    }
                    span:nth-of-type(3) {
                        width: 2.266667rem;
                    }
                    em {
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>
