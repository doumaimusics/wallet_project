<template>
    <div class="goods-div">
        <img class="goods-pic" :src="img ? imgDomainName + img:'https://aliyunsso.edspay.com/web/wx/whiteStore/unsign.png'" alt="">
        <p>{{title}}</p>
        <p>市场参考价{{price}}元</p>
        <p>最低出借{{minPrice}}元可享</p>
        <div class="apr-div">
            <span class="p1">最高享{{apr}}%年化</span>
            <span class="p2">享白拿</span>
            </div>
    </div>
</template>
<script>
export default {
    data () {
        return {}
    },
    props: {
        id: Number,
        img: String,
        title: String,
        price: Number,
        minPrice: Number,
        apr: Number
    }
}
</script>
<style lang="scss" scoped>
    .goods-div {
        margin-left: 12px;
        width: 228px;
        height: 300px;
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        .goods-pic {
            width: 150px;
            height: 150px;
            margin-top: 10px;
        }
        p:nth-of-type(1){
            font-size: 16px;
            color: #333333;
            margin-top: 19px;
            font-weight: 600;
            line-height: 22px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            max-width: 220px;
        }
        p:nth-of-type(2){
            font-size: 12px;
            color: #999999;
            margin-top: 3px;
            line-height: 17px;
        }
        p:nth-of-type(3){
            font-size: 12px;
            color: #e23a36;
            margin-top: 5px;
            line-height: 17px;
        }
        .apr-div {
            height: 20px;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            font-size: 12px;
            margin-top: 14px;
            .p1 {
                padding: 2px 12px;
                color: #E23A36;
                border:1px solid #E23A36;
            }
            .p2 {
                padding: 2px 6px;
                color:#33A8FF;
                border: 1px solid #33A8FF;
                margin-left: 7px;
            }
        }
    }
    .goods-div:hover {
        cursor: pointer;
        box-shadow: 0 2px 12px 0 rgba(109, 109, 109, 0.21);
    }
</style>

</style>
