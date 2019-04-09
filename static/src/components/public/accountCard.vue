<template>
    <div class="charge-carDiv">
        <!-- 银行图标 -->
        <div class="card-left">
          <div class="charge-carPic">
            <img :src="logo"/>
          </div>
        </div>
        <!-- 银行名 -->
          <div class="card-name">
              <p>{{name}}</p>
              <p>储蓄卡</p>
          </div>
        <div class="charge-cardNo">
            <span>****</span>
            <span>****</span>
            <span>****</span>
            <span>{{hideNo}}</span>
        </div>
    </div>
</template>
<script>
  export default {
    props: {
      name: String,
      hideNo: String,
      singleLimit: Number,
      dayLimit: Number,
      logo: String
    },
    methods:{
    }
  }
</script>
<style lang="scss" scoped>
     /* 银行卡 */
    .charge-carDiv{
        position:relative;
        background:url('https://aliyunsso.edspay.com/web/myAccount/defaultCard.png') no-repeat;
        background-size: cover;
        background-position: -6px 0px;
        width:335px;
        height:134px;
    }
   .charge-carPic img {
        width:30px;
        height:30px;
   }
  .card-left {
    position:absolute;
    top: 24px;
    left:22px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .card-name {
    position:absolute;
    top: 21px;
    left:65px;
    color: #FFFFFF;
    p:nth-of-type(1) {
            font-size: 14px;
    }
        p:nth-of-type(2) {
            font-size: 12px;
    }
  }
  .charge-cardNo {
    font-size: 18px;
    color: #FFFFFF;
    position: absolute;
    left: 64px;
    bottom: 20px;
    span {
        line-height: 30px;
        padding-left: 20px;
    }
  }
</style>
