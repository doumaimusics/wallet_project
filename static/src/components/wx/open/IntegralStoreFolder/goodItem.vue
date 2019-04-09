<template>
    <li class="goodsLi" @click="toWxUrl('/intGoodDetail','goodsId',item.goodsId)"  tag="li">
        <div class="img">
            <div class="goodsPath" :style="{background: 'url('+ item.picPath +') no-repeat center center / 100% 4.266667rem'}">
            <!-- 角标 -->
            <div v-if="item.iconUrl" class="goodsIcon fr" :style="{'background-image':'url('+item.iconUrl+')'}"></div>
            </div>
        </div>
        <p class="img_title">{{item.goodsName}}</p>
        <p class="img_score">{{item.discount == 0 ? item.score : Math.round(item.score*(item.discount/10))}} <span>积分</span></p>
    </li>
</template>
<script>
import wxToapp from '../../../../common/wx/wxToapp';
export default {
    mixins:[wxToapp],
    data () {
        return{
            img:'https://aliyunsso.edspay.com/web/wx/Group%20Copy.png'
        }
    },
    props:['item']
}
</script>
<style lang="scss" scoped>
.goodsLi{
        width: 4.466667rem;
        height: 6.08rem;
        float: left;
        border: 1px solid #E5E5E5;
        margin-bottom: .266667rem;
        p{
            width: 100%;
            margin: 0 auto;
            font-size: 0.373333rem;
            color: #000;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            
            // margin-bottom: 0.093333rem;
        }
        .img_title{
            font-family: PingFangSC-Medium;
            font-size: 0.373333rem;
            color: #333333;
            padding-left: .4rem;
        }
        .img_score{
            font-family: DIN-Regular;
            font-size: 0.4rem;
            color: #FF5B4C;
            margin-bottom: 0.4rem;
            padding-left: .4rem;
            span{
                font-size: 0.32rem;
                color: #808080;
            }
        }
        .img{
            width: 100%;
            height: 4.266667rem;
            margin: 0 auto;
            background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/goods_default_img.png) no-repeat;
            background-size: 100%;
            margin-bottom: 0.4rem;
            .goodsPath{
                width: 100%;
                height: 100%;
            }
            .goodsIcon {
                width: 1.28rem;
                height: 1.28rem;
                background-size: 1.28rem 1.28rem;
            }
        }
    }
</style>
