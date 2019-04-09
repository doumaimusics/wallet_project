<!-- 关于我们  平台简介 -->
<template>
  <div class="abstract">
    <div class="title">
      <div class="num_box">
          <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_01.png" alt="">
      </div>
      <span> 平台简介</span>
    </div>
    <div class="nav">
      <div class="nav_content">
          <p>E都市钱包（www.edspay.com），浙江阿拉丁控股集团有限公司旗下控股子公司，是浙江领先的互联网金融服务平台。</p>
          <p>E都市钱包，专注消费金融小额分散债权，坚持互联网技术与人工智能相结合，为用户提供消费分期类金融资产信息和借贷信息的撮合。</p>
          <p>我们坚信，只有真正优质的资产才能为用户带来更高的收益，也只有“好资产”才能让出借更稳健。秉承安全、专业、便捷、规范的服务理念，钱包为广大中产及白领用户提供出借，借款及分期等全方位的互联网金融服务，让更多人享受普惠金融发展带来的时代红利。</p>
          <p>E份初心，笃行致远。现在，未来，E都市钱包都将全心全意给用户产品及合规的信赖。</p>
      </div>
    </div>
    <div class="title">
      <div class="num_box">
        <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_02.png" alt="">
      </div>
        <span>平台文化</span>
    </div>
    <div class="culture">
        <ul class="clear">
            <li v-for="val in cultureList">
                <img :src="val.imgs" alt="">
                <h3>{{val.title}}</h3>
                <p v-html="val.pText"></p>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'abstract',
  data() {
    return {
        cultureList:[
          {
            imgs:'https://aliyunsso.edspay.com/web/about/pcPageRevision/jj_icon1.png',
            title:'平台宗旨' ,
            pText:'为普通人提供安全专业的金融服务'
          },
          {
            imgs:'https://aliyunsso.edspay.com/web/about/pcPageRevision/jj_icon2.png',
            title:'经营理念' ,
            pText:'安全、透明、合规运营'
          },
          {
            imgs:'https://aliyunsso.edspay.com/web/about/pcPageRevision/jj_icon3.png',
            title:'服务理念' ,
            pText:'安全、专业、便捷、规范'
          },
          {
            imgs:'https://aliyunsso.edspay.com/web/about/pcPageRevision/jj_icon4.png',
            title:'平台愿景' ,
            pText:'让每一位普通出借人都能获得安全、简单的<br/>出借渠道'
          }
        ]
    }
  },
  methods: {

  },
}
</script>
<style lang="scss">
.abstract {
  width: 100%;
  .title {
    width: 100%;
    font-family: PingFangSC;
    line-height: 34px;
    font-size: 18px;
    text-align: left;
    color: #333333;
    margin-bottom: 34px;
    margin-top: 30px;
    padding-left: 44px;
    span{
      padding-left: 8px;
      font-weight: 700;
    }
    .num_box{   //改版后
          width: 87px;
          height: 54px;
          margin-bottom: 5px;
          img{
            width: 100%;
            height: 100%;
          }
    }
    i {  // 改版前
      display: inline-block;
      width: 4px;
      height: 24px;
      background: #fc4147;
      margin-top: 4px;
      margin-right: 10px;
      vertical-align: top;
    }
  }
  .nav {
    width: 100%;
    padding-left: 42px;
    margin-bottom: 60px;
    .nav_content{
        background: #FDFBFA;
        padding: 30px 40px;
         p {
          font-size: 16px;
          color: #333333;
          line-height: 32px;
          font-family: PingFangSC;
          margin-bottom: 40px;
        }
        p:last-child{
          margin-bottom: 0;
        }
    }
   
  }
  .culture {
    background-color: #ffffff;
    padding-left: 40px;
    padding-bottom: 12px;
    ul{
        li{
          width: 416px;
          float: left;
          background: #FFFFFF;
          box-shadow: 1px 1px 16px 0 #F3F3F3;
          text-align: center;
          margin-bottom: 28px;
          height: 247px;
          padding-top: 20px;
          img{
            margin-bottom: 30px;
            width: 82px;
            height: 82px;
          }
          h3{
            font-size: 24px;
            color: #333333;
            margin-bottom: 12px;
          }
          p{
            font-size: 18px;
            color: #9A9696;
          }
      }
      li:nth-child(2n){
        margin-left: 20px;
      }
    }
    
  }
}
</style>