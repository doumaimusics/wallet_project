<template>
    <div id="record" :style="fullHeight">
        <div v-title>抽奖记录</div>
        <div class="item" v-if="drawList.length > 0">
            <div class="list bdr-b" v-for="(v, i) in drawList">
                <img :src="v.goodsUrl" alt="" class="imgs fl">
                <div class="content fl">
                    <div class="name fl">{{v.goodsName}}</div>
                    <div class="time fr">{{v.addTime}}</div>
                </div>
                <div class="bottom">
                    <div class="tips fl" v-if="v.goodsType == 0 || v.goodsType == 1">请在【我的-我的红包】中查看</div>
                    <div class="tips fl" v-else-if="v.goodsType == 2">请在【积分商城-积分明细】中查看</div>
                    <div class="tips fl" v-else-if="v.goodsType == 3">活动结束后15个工作日内由理财顾问联系发放！</div>
                    <div class="money fr" v-if="v.goodsType == 0 || v.goodsType == 3">¥{{v.marketPrice}}</div>
                </div>
            </div>
        </div>
        
        <wx-null v-else :text="'暂无抽奖记录'"></wx-null>
    </div>
</template>

<script>
    import wxNull from '../../open/IntegralStoreFolder/null';//空状态
    import wxToapp from '../../../../common/wx/wxToapp';
    export default {
        mixins:[wxToapp],
    	data(){
    		return{
    			drawList:[],
                hasAdd:false,
                fullHeight:{
					minHeight: document.documentElement.clientHeight+"px"  //获取手机可视区域的的高度
				}
    		}
    	},
    	methods:{
            getAwardData(){//获取翻牌列表
                this.getAppData('/NovemberTwo/getUserDrawList',(data) =>{
                    if(data.resCode){
                        this.drawList = data.resData.drawList;
                    }
                },{},1,1)
            },
    	},
    	components:{
            wxNull
    	},
    	created(){
    	   this.getAwardData()
    	},
        mounted(){
            //给app传值标题名
            this.PassValue('NavWhite_抽奖记录');
        }
    }
</script>

<style lang="scss" scoped>
    #record{
         background:#fff;
        .item{
            padding: 0 .533333rem;
        }
        .list{
            height:2.4rem;
            background:#fff;
            position: relative;
            .imgs{
                height: 1.866667rem;
                width: 1.866667rem;
                margin: .266667rem .4rem .266667rem 0;
                background-color: #F8F8F8;
            }
            .content{
                width: 6.6rem;
                .name{
                    font-size: .4rem;
                    color: #000000;
                    height:0.56rem;
                    line-height: .56rem;
                    margin: .36rem 0 .22rem;
                }
                .time{
                    font-size: .32rem;
                    line-height: .453333rem;
                    color:#999;
                    margin: .36rem 0 .42rem;
                }
            }
            .bottom{
                // width: 6.6rem;
                // overflow: hidden;
                .tips{
                    width: 3.5rem;
                    height: .69rem;
                    // line-height: .37rem;
                    font-size: .266667rem;
                    color: #808080;
                }
                .money{
                    font-size: .32rem;
                    color: #FF0000;
                }
            }
        }
    }
</style>