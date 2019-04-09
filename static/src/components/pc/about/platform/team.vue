<template>
  <div class="team">
    <!-- <div class="title">
    <i></i>管理团队
    </div> -->
    <div class="team-item" v-for="item in info">
      <img class="left-img" :src="item.img"/>
      <div class="right-div">
        <div class="team-name">
          <span style="font-weight:bold;">{{item.position}}:</span>
          <span>{{item.name}}</span>
        </div>
        <p>{{item.describe}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'team',
  // metaInfo: {
  //     title: '管理团队_E都市钱包管理团队_E都市钱包_ 让您安心的出借理财平台', // set a title
  //     meta: [{                 // set meta
  //       name: 'description',
  //       content: 'E都市钱包董事长吴宇青，E都市钱包CEO，E都市钱包技术总监，E都市钱包产品总监，E都市钱包运营总监，E都市钱包风控总监，E都市钱包，E都市钱包官网，出借理财,个人理财,互联网金融,出借'
  //     },{                 // set meta
  //       name: 'keywords',
  //       content: 'E都市钱包，管理团队，出借理财,个人理财,互联网金融，P2P理财'
  //     },{
  //       name: 'baidu-site-verification',
  //       content: 'ASl9m3ghF3'
  //     }]

  // },
  data() {
    return {
        info: [
          {
            img: 'https://aliyunsso.edspay.com/web/about/wuyuqing.png',
            position: '董事长',
            name: '吴宇青',
            describe: '拥有超过二十年的金融投资管理和企业运营经验，主导阿拉科技（股票代码：834171.OC）成功在新三板挂牌，任阿拉科技董事长。2004年创立阿拉科技，在互联网科技行业和资本市场有着20年以上的管理经验，投资并管理多个金融和互联网科技公司，在金融投资领域、行业投资分析判断、资源整合、各类企业上市兼并、重组等领域有着丰富的实战经验。'
          },
          // {
          //   img: 'https://aliyunsso.edspay.com/web/about/zhangjie.png',
          //   position: 'CEO',
          //   name: '张杰',
          //   describe: '历任于阿里巴巴、支付宝等国内领先的互联网平台，深度参与支付宝花呗、菜鸟网络等千万用户量级互联网创新项目, 在用户产品与运营、资产拓展与风控、支付结算管理等方面积累了丰富经验，对互联网、金融产业发展有着深刻的理解和富有远见的战略思维，擅长运用互联网的方法论和先进的技术优化重塑传统金融的业务模式和效率。'
          // },
          {
            img: 'https://aliyunsso.edspay.com/web/about/update/liutao.png',
            position: 'CEO',
            name: '刘涛',
            describe: '曾任职于多家互联网金融平台，拥有丰富的互联网金融从业经验，在战略制定、布局、实施方面拥有成熟的理论与实践经验，对网贷行业有深刻的见解。加入E都市钱包后，全权负责平台的运营分析、战略定位、业务架构、发展模式、竞争战略、实施规划等管理工作，统领团队实现业务快速增长。'
          },
          // {
          //   img: 'https://aliyunsso.edspay.com/web/about/zhumingmin.png',
          //   position: '网贷事业部总经理',
          //   name: '朱明敏',
          //   describe: '具备6年的互联网运营经验，曾任职多家知名互联网金融平台，拥有丰富的项目管理与执行经验。具备丰富的互联网项目管理、平台运营经验。对互联网金融行业具备深刻的认知及见解，对于互联网项目运营有独到的理解与看法，擅长数据分析与用户运营，对于数据有敏锐的感知，能够及时调整运营策略，构建快捷、高效的运营体系。'
          // },
          {
            img: 'https://aliyunsso.edspay.com/web/about/hujiye.png',
            position: 'CTO',
            name: '胡继业',
            describe: '多年技术开发经验，曾任职于海尔集团旗下互联网金融平台，对于金融科技应用有着深厚的理论基础，在大数据与人工智能方面拥有丰富的实践经验，快速实现平台金融科技基础搭建。主导开发多项技术产品并获得国家认证，在项目执行、体系优化方面有着丰富的管理经验，带领技术团队快速成长。'
          },
          {
            img: 'https://aliyunsso.edspay.com/web/about/chenlei.png',
            position: 'CRO',
            name: '陈雷',
            describe: '拥有八年以上风控管理及信贷业务从业经历，擅长消费信用金融、小微金融产品设计和全流程风险管理，曾担任知名互金公司风控总监，积累了丰富的风险管理和流程管理经验，并长期致力于适合中国国情的小微金融行业征信审批技术和量化风险管理的研究和创新。'
          },
          {
            img: 'https://aliyunsso.edspay.com/web/about/update/lishide.png',
            position: 'CPO',
            name: '李时德',
            describe: '十多年互联网金融从业经历和管理经验，拥有证券从业资格证书，曾就职于恒生电子和蚂蚁金服，对消费金融生态圈有深刻的认识及理论沉淀。曾主导多个互联网产品搭建，熟知包括互联网保险、消费金融、小额信用贷、P2P理财等领域产品，拥有丰富的互联网金融从业经验，在产品上注重用户体验，擅长用户行为分析，提升整体产品的用户满意度，实现产品系统的迭代更新。'
          }
        ]
    }
  },
  methods: {

  },
}  
</script>

<style lang="scss">
.team {
  width: 100%;
  height: auto;
  overflow: hidden;
  padding: 0  40px;
  .team-item {
    border-bottom: 1px dashed #e5e5e5;
    display: flex;
    flex-direction: row;
    padding: 40px 0;
    .left-img {
      width: 100px;
      height: 100px;
      border-radius:50%;
      border: 1px solid #e5e5e5;
    }
    .right-div {
      margin-left:30px;
      .team-name {
        font-size: 18px;
        color: #333333;
        line-height: 20px;
      }
      p {
        width: 690px;
        font-size: 16px;
        color: #333333;
        line-height: 32px;
        text-align:justify;
        margin-top:10px;
      }
    }
  }
  .team-item:last-child{
    border-bottom:none;
  }
}
</style>