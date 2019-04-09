<template>
    <div @click="appRouter('/awardDetails',listData)" class="list">
        <img :src="listData.shopPath" alt="" class="imgs fl">
        <div class="content fl">
            <div class="name"><i :class="{title1:title == '2'}" class="hidden fl">{{listData.goodsName}}</i><em class="fl" ref="borEm"><span v-if="title == '1'" class="ic2" ref="borSpan">{{listData.goodsCategoryName}}</span></em></div>
            <div class="time">{{listData.addTime | divisionTime}}</div>
        </div>
        <div class="right">
            <div v-if="!listData.isAddress && listData.goodsClass == -1" @click.stop="toAdd" class="address">
                <div class="fillIn">添加地址</div><i class="el-icon-caret-right"></i>
            </div>
            <div v-else class="arrows">
                <span v-if="listData.goodsClass == -1">{{listData.paymentsType == 1 ? '备货中':'已发货'}}</span>
                <span v-if="listData.goodsClass != -1">已发放</span>
            </div>
        </div>
        <div :class="{'bdr-b':index}" class="line"></div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp'
    export default{
        mixins:[wxToapp],
        data(){
            return{
                emWidth: 0,
                spanWidth:0
            }
        },
        props:['listData','hasAdd','title','index'],
        methods:{
            toAdd(){
                if(this.hasAdd){
                    this.appRouter('/intAddressList',{orderId:this.listData.id,_type:2});
                }else{
                    this.appRouter('/intAddress',{orderId:this.listData.id,_type:2});
                }
            }
        },
        created(){
            this.listData.hasAdd = this.hasAdd;
            this.listData.listType = 2;
            this.listData._title = this.title;
        },
        mounted(){
            if(this.title == 1){
                this.emWidth = this.$refs.borEm.offsetWidth;
                this.spanWidth = this.$refs.borSpan.offsetWidth;
                this.$refs.borSpan.style.left = -(this.emWidth)/4 + 'px'
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list{
        height:1.706667rem;
        background:#fff;
        position: relative;
        .imgs{
            height:1.2rem;
            width:1.2rem;
            margin:0.266667rem 0.266667rem 0 0.4rem;
        }
        .content{
            .name{
                height:0.933333rem;
                font-size: 0.373333rem;
                line-height:0.533333rem;
                padding:0.32rem 0 0.2rem;
                .hidden{
                    max-width:4.293333rem;
                    display:inline-block;
                }
                .title1{
                    max-width:5.2rem;
                }
                .borBox{
                    float: left;
                    height:0.346667rem;
                    overflow: hidden;
                    position: relative;
                }
                em{
                    height:0.346667rem;
                    position: absolute;
                    display:inline-block;
                    margin-left:0.213333rem;
                }
                span{
                    height:0.693333rem;
                    display:inline-block;
                    border: 1px solid #FF5B4C;
                    border-radius: 0.346667rem;
                    font-size:0.533333rem;
                    line-height:0.666667rem;
                    color:#FF5B4C;
                    padding:0 0.213333rem;
                    transform: scale(0.5);
                    -webkit-transform: scale(0.5);
                    position: relative;
                    left:-27px;
                    top:-0.08rem;
                }
            }
            .time{
                font-size:0.32rem;
                line-height:0.453333rem;
                color:#8E8E8E;
            }
        }
        .right{
            position: absolute;
            right:0;
            top:0;
            .arrows{
                position: relative;
                top:0.693333rem;
                right:0.373333rem;
                height:0.4rem;
                width: 1.6rem;
                background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/signIn/back.png) no-repeat 1.226667rem 0.026667rem;
                background-size: 0.4rem 0.4rem;
                font-size:0.346667rem;  
                line-height:0.4rem;
                color:#808080;
                span{
                    padding-left: 0.07rem;
                }
            }
            .address{
                padding-right: 0.373333rem;
                text-align:right;
                .tips{
                    font-size:0.266667rem;
                    line-height:0.266667rem;
                    padding:0.453333rem 0 0.266667rem;
                    letter-spacing: 0;
                    color:#808080;
                }
                .fillIn{
                    font-size:0.346667rem;
                    line-height:1.7066rem;
                    margin-right:.066667rem;
                    color: #608DFF;
                    display: inline-block;
                    img{
                        height:0.346667rem;
                        width:0.346667rem;
                    }
                }
                 i{
                    font-size: .32rem;
                    color: #608DFF;
                }
            }
        }
        .line{
            height:1px;
            position: relative;
            margin-left: 0.4rem;
        }
    }
</style>