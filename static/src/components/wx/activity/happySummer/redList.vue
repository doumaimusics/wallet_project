<template>
    <div id="redList">
        <div v-title>领取记录</div>
        <div ref="banner" class="top">
            <div class="banner">
                <div class="name">累计获得红包</div>
                <div class="num"><span class="ic_2">￥</span>{{redSum}}</div>
            </div>
            <div class="title bdr-b clear">
                <div class="titTime fl">领取时间</div>
                <div class="titNum fl">红包金额</div>
            </div>
        </div>
        <div ref="content" class="content">
            <ul>
                <li v-for="item in redList" class="bdr-b clear">
                    <div class="time fl">{{item.addTime}}</div>
                    <div class="num fl">{{item.amount}}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'; // app交互 
    export default{
        mixins:[wxToapp],
    	data(){
    		return{
                redList:[],
                redSum:0,
    		}
    	},
    	methods:{
            getRedData(){
                this.getAppData('/activity/happy/shareRecord',(data)=>{
                    if(data.resCode){
                        this.redList = data.resData.redEnvelopes;
                        this.redSum = data.resData.redSum;
                    }
                },{})
            }
    	},
    	created(){
            this.getRedData();
    		
    	},
        mounted(){
            this.PassValue('NavWhite_领取记录');
            var height = document.documentElement.clientHeight; //获取设备的宽度
            this.$refs.content.style.minHeight = height - this.$refs.banner.clientHeight + 'px';
        }
    }
</script>

<style lang="scss" scoped>
    #redList{
        .content{
            background:#fff;
        }
        .banner{
            height: 3.733333rem;
            background:url('https://aliyunsso.edspay.com/web/wx/activity/happySummer/redList.png') no-repeat;
            background-size: 100% 100%;
            color:#fff;
            text-align:center;
            padding-top: 0.773333rem;
            .name{
                font-size:0.48rem;
                line-height:0.666667rem;
                font-family: PingFang-SC-Bold;
                padding-bottom: 0.08rem;
            }
            .num{
                font-family: DIN-Medium;
                font-size: 1.333333rem;
                margin-left: -0.266667rem;
                span{
                    font-family: DIN-Black;
                    font-size: 0.666667rem;
                }
            }
        }
        .title{
            margin-top: 0.266667rem;
            height:1.173333rem;
            position: relative;
            .titTime,.titNum{
                font-family: PingFang-SC-Bold;
                width: 50%;
                text-align:center;
                line-height:1.173333rem;
                font-size:0.4rem;
                color:#333;
                background: #fff;
            }
        }
        ul{
            background:#fff;
            padding: 0 0.533333rem;
            li{
                // padding-left: 0.853333rem;
                height:1.12rem;
                line-height:1.1rem;
                position: relative;
                .time,.num{
                    width:50%;
                    text-align:center;
                    font-size:0.373333rem;
                    color:#666;
                }
                /* .time{
                    padding-left: 0.853333rem;
                }
                .num{
                    text-align:center;
                } */
            }
        }
    }
</style>