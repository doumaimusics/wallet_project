<template>
  <div class="history">
    <div v-title>发展历程_E都市钱包发展历程_E都市钱包_ 让您安心的出借理财平台</div>
    <div v-keywords>E都市钱包，发展历程，ICP经营许可证，银行存管，出借理财,个人理财,互联网金融，P2P理财</div>
    <div class="main">
      <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/history3.png" alt="">
      <!--<div class="point"></div>
        <div class="wrap" v-for="item in datas">
          <div :class="item.dire">
            <p class="date">{{ item.date }}</p>
            <p class="intr">{{ item.intr }}</p>
          </div>
        </div>
        <div class="point"></div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'history',
  // metaInfo: {
  //     title: '发展历程_E都市钱包发展历程_E都市钱包_ 让您安心的出借理财平台', // set a title
  //     meta: [{                 // set meta
  //       name: 'keywords',
  //       content: 'E都市钱包，发展历程，ICP经营许可证，银行存管，出借理财,个人理财,互联网金融，P2P理财'
  //     },{
  //       name: 'baidu-site-verification',
  //       content: 'ASl9m3ghF3'
  //     }]
  // },
  data() {
    return {
      // datas: [
      //   {
      //     dire: "right",
      //     date: "2016年5月",
      //     intr: "与第三方支付平台的汇付天下达成战略合作协议"
      //   },

      //   {
      //     dire: "left",
      //     date: "2016年7月",
      //     intr: "E都市钱包平台正式上线运营，PC端和APP端同时发布"
      //   },

      //   {
      //     dire: "right",
      //     date: "2016年10月",
      //     intr: "浙江楚橡控股知名房产平台房途网"
      //   },

      //   {
      //     dire: "left",
      //     date: "2016年11月",
      //     intr: "对接知名风控平台有盾数据和同盾数据的风控体系"
      //   },

      //   {
      //     dire: "right",
      //     date: "2017年1月",
      //     intr: "与新浪支付签订资金托管协议"
      //   },

      //   {
      //     dire: "left",
      //     date: "2017年1月",
      //     intr: "获上市公司阿拉科技领投的2000万美元A轮融资"
      //   },

      //   {
      //     dire: "right",
      //     date: "2017年3月",
      //     intr: "E都市钱包成为浙江投融资协会理事单位"
      //   },

      //   {
      //     dire: "left",
      //     date: "2017年4月",
      //     intr: "与浙商银行达成银行资金存管协议"
      //   }
      // ]
    }
  },
  methods: {

  },
}

</script>

<style scoped>
.history {
  padding-top: 60px;
  padding-bottom: 90px;
}

.history .point {
  width: 4px;
  margin: 0 auto;
  height: 4px;
  background-color: #e7e7e7;
}

.history .point:first-child {
  border-top-left-radius: 50%;
  border-top-right-radius: 50%;
}

.history .point:last-child {
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
}

.history .main {
  width: 662px;
  overflow: hidden;
  object-fit: contain;
  margin: 0 auto;
}
.history .main img{
    width: 100%;
  }
/*.history .main .wrap {
  width: 100%;
  overflow: hidden;
  height: 71px;
}

.history .main .left,
.history .main .right {
  width: 50%;
  height: 100%;
  color: #fff;
}

div.right {
  background: url("https://aliyunsso.edspay.com/web/about/right.png") no-repeat right top;
  background-size: 379px 60px;
  float: right;
}

div.right p {
  padding-left: 85px;
}

div.left p {
  text-align: right;
  padding-right: 85px;
}

p.date {
  font: 16px/26px "";
  padding-top: 7px;
}

p.intr {
  font-size: 14px;
  font: 14px/20px '';
  padding-bottom: 7px;
}

div.left {
  background: url("https://aliyunsso.edspay.com/web/about/left.png") no-repeat left top;
  background-size: 379px 60px;
  float: left;
}*/
</style>