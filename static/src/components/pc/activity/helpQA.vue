<template>
  <div class='single-mask'>
    <div class="help-title">
      <div class="help-left"></div>
      帮助中心
    </div>
    <div class="single-main">
      <!--侧边栏-->
      <div class="help-sidebar">
        <ul>
          <li
            @click="selected(item.type)"
            :class="{active: activeName == item.type}"
            v-for="item in sideBar" class="iconfont">
            {{item.name}}
            <span >&#xe66d;</span>
          </li>
        </ul>
      </div>
      <!--右侧-->
      <div class="help-right">
        <el-collapse v-model="activeNames" accordion v-for="(item,index) in tableList" @change="toggle(index,item.type)">
          <el-collapse-item  :name="item.type">
            <template slot="title">
                <i class="q-icon icon"></i>
                {{item.q}}
              <!--两个type相等是减号，展开-->
                <i class="icon q-plus" :class="{plusActive: activeNames == item.type}"></i>
            </template>
            <!--回答-->
            <div class="help-a">
            <i class="a-icon icon"></i>
            <span v-html="item.a">{{item.a}}</span>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
        data () {
          return {
            activeName: '1',   // 侧边栏
            activeNames: '0', //折叠name属性
            plusType: '0',
            sideBar: [
              {
                name: '银行存管',
                type: '1'
              },
              {
                name: '资金管理',
                type: '2'
              },
              {
                name: '产品介绍',
                type: '3'
              },
              {
                name: '会员帮助',
                type: '4'
              },
              {
                name: '红包优惠',
                type: '5'
              },
              {
                name: '积分商城',
                type: '6'
              },
            ],
            account:[
              {
                q: '实现银行存管后，是如何保障用户资金安全的？',
                a: '平台用户涉及资金的操作将直接通过由浙商银行为平台用户单独设立的小账户进行，包括存管账户的开立、绑卡、充值、提现等，平台本身不触碰资金，确保用户存管账户及资金的独立性。',
                type: '1'
              },
              {
                q: '可以不开通银行存管账户吗？',
                a: '根据银监会下发的监管政策要求，从事网络借贷的平台与个人必须通过存管系统操作。出借人需要开通浙商银行存管账户后才能进行出借，不开通银行存管账户将无法正常使用。',
                type: '2'
              },
              {
                q: '如何开通银行存管账户？',
                a: '新用户在注册完成后按照引导流程即可开通。存管账户开通需要用户输入实名信息并绑定银行卡等步骤。<br/>老用户可以通过登陆并在首页或者“我的”页面找到开通存管入口，并按照引导流程操作。',
                type: '3'
              },
              {
                q: '开通银行存管账户失败该怎么处理？',
                a: '根据页面提示的报错信息重新补充填写。如若还是失败，可以联系在线客服或拨打客服电话：400-135-3388进行咨询',
                type: '4'
              },
              {
                q: '绑定银行卡后能否修改？',
                a: '若您需要修改绑定银行卡可通过微信端进行操作。点击用户头像进入“账户与安全”，在“银行卡”中进行操作。若您在浙商银行监管的所有P2P网贷平台存管账户余额均为0且无在投项目，系统将自动完成审核；若您在浙商银行监管的所有P2P网贷平台存管账户有任意一家余额不为0或有在投项目，申请修改银行卡将由浙商银行人工审核完成（审核完成前不允许再次修改）。',
                type: '5'
              },
            ],
            asset: [
              {
                q: '注册成功后如何充值？',
                a: '确认登录之后打开“我的”-“充值”，按照页面流程进行操作（由于各银行充值限额不同，请在充值之前查看“限额说明”）。<br/>* 存管账户充值成功后可立即出借，但需要等T+1天（T为工作日）银行清算完成后才能提现',
                type: '1'
              },
              {
                q: '线上充值的金额是实时到账的吗？',
                a: '在网络等条件都正常的情况下，线上充值的金额是实时到账的',
                type: '2'
              },
               {
                q: '什么是大额充值，怎么操作？',
                a: '大额充值是指超过了银行卡单日或单笔的最大限额，不能使用快捷支付，需登录电脑端使用网银进行支付（各银行对银行卡的限额有差异，以具体的银行限额为准）。<br/>电脑端：“我的账户-我的资产-存管账户”，可查看您的浙商银行存管账号。<br/>APP端：打开“我的”-“充值”，点击转账充值，并根据页面引导进行操作。',
                type: '3'
              },
              {
                q: '银行卡扣款却显示充值失败，怎么办？',
                a: '浙商银行清算对账时，如果发现出借人充值失败，会将充值金额原路退回到出借人在平台绑定的银行卡中。您也可以联系客服：400-135-3388寻求帮助。',
                type: '4'
              },
              {
                q: '充值失败时该如何解决？',
                a: '充值失败情况以及对应的解决方法：<br/>1、您输入的验证码错误：请输入正确的验证码；<br/>2、银行卡余额不足：请您充值前确认余额或更换银行卡充值；<br/>3、充值超出限额：请更改充值金额或使用大额充值；<br/>4、页面提示超时或网络不稳定：请您切换网络或稍后重试；<br/>5、验证码接收不到：请您检查手机短信屏蔽设置；<br/>如您有遇到其他问题或以上方法未能解决问题，请联系人工客服：400-135-3388。',
                type: '5'
              },
              {
                q: '如何提现，是否有限额与次数限制？',
                a: '打开“我的”-“提现”，按照引导流程操作即可。<br/>提现金额最低2元，最高额度以各家银行的实际限额为准，次数无限制。',
                type: '6'
              },
              {
                q: '提现什么时候到账，手续费怎么收取？',
                a: '浙商银行卡额度不限，当天到账；<br/>其他银行卡：5万及以下（含5万）提现当天到账；<br/>5万以上：非工作日不受理，工作日工作时间提现当天到账。<br/>平台提现无手续费。',
                type: '7'
              },
              {
                q: '提现失败怎么办？',
                a: 'PC端:如果您提现的资金为当日充值的资金，则需要T+1天（T为工作日）浙商银行清算完成后才能提现；若您因为其他原因出现了无法提现的问题，请联系客服400-135-3388为您服务。',
                type: '8'
              },
              {
                q: '提现还未处理能否撤销？',
                a: '提现申请一旦提交一律无法撤销，请您在提现之前再次确认。',
                type: '9'
              },
              {
                q: '为什么会出现提现失败？',
                a: '银行卡出现挂失、注销或信息变更或银行卡信息有误。<br/>若出现提现失败的情况，请联系在线客服，或拨打400-135-3388人工客服电话咨询解决。',
                type: '10'
              },
              {
                q: '出借过程中有手续费吗？',
                a: '您在充值、出借、提现过程中都没有手续费，即使有费用，也是由平台全部垫付。平台目前唯一的费用为利息管理费，按照项目基础收益的3%的标准收取。',
                type: '11'
              },
              {
                q: '用户出借之后的资金去哪里了？',
                a: '平台所有用户的出借资金均由浙商银行存管系统统一交易划拨，最终到达借款人的银行卡中。',
                type: '12'
              }
            ],
            eqz: [
              {
                q: '什么是E计划？',
                a: 'E计划是平台推出的对借款项目进行本金循环自动出借及项目期限届满时自动转让债权的出借工具。在项目期限内，系统智能分散匹配小额消费债权；项目到期后，系统协助出借人完成债权转让，本金和利息一次性回款到您的账户。',
                type: '1'
              },
              {
                q: '什么是债权转让？',
                a: '债权转让是指原来的债权人通过与第三人订立合同将债权的全部或部分转移于第三人。在项目回款日，通过授权平台债权转让的方式，将用户所持的全部债权进行转让，转让成功后，方可退出回款。',
                type: '2'
              },
              {
                q: '什么是自动复投？',
                a: '在项目期限内，借款人发起还款后，平台在用户授权下将本金进行循环出借，完成整个项目。',
                type: '3'
              },
              {
                q:'如何关闭浙商银行投标短信通知？',
                a:'在您的手机短信里设置，即可关闭短信通知，无声提醒。<br/>IOS手机：短信列表中看到95527浙商银行，向左滑动，按下“隐藏提醒”；<br/>安卓手机：短信列表中看到95527浙商银行，点击左边银行图标进入，按下“加入黑名单”(以小米mix2为例，不同机型操作不同)。',
                type: '4'
              },
              {
                q: '平台有几种出借项目？',
                a: '目前平台的出借项目：E计划，根据出借时间不同分为E计划-30天、E计划-60天、E计划-90天、E计划-180天与E计划-360天，对应资产均为消费分期类资产。',
                type: '5'
              },
              {
                q: '出借后多久计息，利息如何计算？',
                a: '出借成功后次日计息，利息计算公式为：出借本金*参考年化/360*项目期限（天）。平台不承诺收益，以实际到账收益为准。',
                type: '6'
              },
              {
                q: '项目什么时候到期，如何查看到期时间？',
                a: '出借成功后从第二天开始计息。<br/>APP端：出借成功后，可到“我的”-“出借记录”中查看。<br/>电脑端：出借成功后，可到“我的账户”-“出借记录”中查看。',
                type: '7'
              },
              {
                q: '项目什么时候回款？如何查看回款时间？',
                a: '出借项目到期后1-3个工作日之内本息将回款到您的账户。<br/>APP端：出借成功后，可到“我的”-“回款计划”中查看。<br/>电脑端：出借成功后，可到“我的账户”-“回款计划”中查看。',
                type: '8'
              },
              {
                q: '怎么查看电子合同？',
                a: 'APP端：可在“我的-出借记录-查看详情-借款人列表”中查看<br/>电脑端：可在“我的账户-出借记录-查看详情”中查看',
                type: '9'
              },
              {
                q: '借款人逾期了怎么办？',
                a: '由于出借项目为多个借款人集合，个别借款人逾期不影响平台的正常回款。如果借款人出现逾期，将由资产端负责催收。',
                type: '10'
              },
              {
                q: '出借本金是什么？',
                a: '出借本金是指在计算利息之前的原始金额，出借过程中使用的抵扣红包与现金红包也计算在内。',
                type: '11'
              },
              {
                q: '参考年化是什么？',
                a: '参考年化收益率又称参考年化，是把当前收益率（日收益率、周收益率、月收益率）换算成年收益率来计算的，是一种理论收益率，并不是真正的已取得的收益率。',
                type: '12'
              },
              {
                q: '出借项目是怎么审核的？',
                a: '平台所有出借项目都经过多重审核。资产方会对借款人资质进行审核，包括身份认证、通讯录认证、运营商认证、芝麻信用认证、生物指纹认证等，对借款人建立多维度的风控分析图，确保借款人信息真实；平台风控团队根据“蜂巢”风控体系对借款人进行二次审核，保证每一笔借款优质，借款人还款能力与还款意愿强。',
                type: '13'
              }
            ],
            money: [
              {
                q: '如何注册会员？',
                a: '电脑端：在浏览器页面输入平台链接www.edspay.com进入官网首页，点击网站首页右上角“注册”进入注册页面，按照提示输入手机号码、 验证码、密码即可完成注册。<br/>APP端：下载E都市钱包APP最新版，点击首页右下角“我的”进入新页面，点击“注册/登录“，按照提示输入手机号码与验证码等信息，即可完成注册。',
                type: '1'
              },
              {
                q: '一个手机号或一个身份证号能够认证几个账号？',
                a: '一个手机号或身份证号只能认证一个账号，不能重复认证。',
                type: '2'
              },
              {
                q: '注册过程中收不到验证码怎么办？',
                a: '请您确认手机是否安装短信拦截或者过滤软件、手机是否能正常接收短信（处于停机、欠费、信号弱等非正常状态）以及手机接收短信是否出现延迟等等。如果个人手机无任何非正常状态，请直接联系在线客服或拨打400-135-3388电话咨询人工客服。',
                type: '3'
              },
              {
                q: '可以绑定多张银行卡吗？',
                a: '目前平台存管账户仅支持绑定一张银行卡，建议您在绑卡过程中选择常用银行卡。',
                type: '4'
              },
              {
                q: '银行卡丢失或银行卡信息填写错误怎么办？',
                a: '您可以通过微信端修改当前所绑定的银行卡。点击用户头像进入“账户与安全”，在“银行卡”中进行操作。若您在浙商银行监管的所有P2P网贷平台存管账户余额均为0且无在投项目，系统将自动完成审核；若您在浙商银行监管的所有P2P网贷平台存管账户有任意一家余额不为0或有在投项目，申请修改银行卡将由浙商银行人工审核完成（审核完成前不允许再次修改）。',
                type: '5'
              },
              {
                q: '忘记登录密码怎么办？如何修改登录密码？',
                a: '在电脑端与APP端登录页面点击忘记密码，根据提示信息进行操作即可重新找回。<br/>电脑端：登录成功后点击“我的账户”-“账户设置”，在登录密码位置进行修改。<br/>APP端：登陆成功后在“我的”页面点击用户头像进入“账户与安全”，在“密码管理”中即可修改登录密码。',
                type: '6'
              },
              {
                q: '如何设置交易密码？',
                a: 'App端：“我的-账户与安全-密码管理”中查看。<br/>电脑端：“我的账户-账户设置”中查看。',
                type: '7'
              },
              {
                q: '账户被锁了怎么办？',
                a: '登录时密码错误多次会导致账户被自动锁定，账户被锁定后不会自动解锁。请联系在线客服或拨打400-135-3388电话咨询人工客服，客服核实后可解锁账户。',
                type: '8'
              },
              {
                q: '什么是VIP会员？',
                a: 'VIP会员制度是平台为会员用户提供的福利体系，用户的每一次出借都可以按照固定的比例获得成长值。不同的成长值对应不同的会员等级，每个会员等级都有相应的等级要求，同时也会享受升级带来的固定福利，包括红包福利、加息福利等。您可通过电脑端与APP端“VIP会员”页面查看详情。',
                type: '9'
              },
              {
                q: 'VIP会员等级是固定不变的吗？',
                a: '平台的会员等级会根据用户当前的等级要求进行变动。如果您不满足当前的会员等级要求，系统将自动降级；如果您满足了高一级的会员要求，系统将自动为您升级。目前平台最高的会员等级是VIP6级。',
                type: '10'
              },
              {
                q: '成为VIP会员有什么好处？',
                a: '您可以享受以下福利：固定的升级礼包（降级再升级不可享受，等级越高力度越大）、生日福利、节日福利、每月福利、会员加息（会员等级不同，加息力度也不同，最高1.8%）等。您可以在“VIP会员”页面查看详情。',
                type: '11'
              },
              {
                q: '风险测评是什么？必须要做吗？',
                a: '平台风险测评是根据自建风控体系与银行用户风险评估体系结合，根据最终的测评结果，为出借人提供智能投顾服务。风险测评是国家监管政策明令要求完成的项目，如果用户风险测评未完成，将不能正常出借。',
                type: '12'
              },
              {
                q: '风险测评的规则是什么？',
                a: '根据用户财务状况、投资经验、风险偏好、风险承受能力的不同，平台将用户分为保守型、稳健型、激进型。根据等级不同，平台会对用户在出借过程中的出借金额与出借项目进行限制，具体限制请在完成风险测评后查看。',
                type: '13'
              }
            ],
            invest: [
              {
                q: '抵扣红包是什么？',
                a: '抵扣红包是平台为用户提供的出借福利，可以在出借时直接抵扣出借金额。例如：您出借5000元，使用了20元抵扣红包，实际只需要支付4980元，本息则按照5000元计算。',
                type: '1'
              },
              {
                q: '抵扣红包有什么限制？',
                a: '平台抵扣红包会有三个方面的限制： 出借期限、出借金额与有效期。出借期限限制是指使用该红包必须出借对应的出借项目，如仅限E计划-90天使用等；出借金额限制是指使用该红包必须出借对应的出借金额，如满5000元可用等；有效期限制是指抵扣红包必须在指定期限之内使用，过期后红包将不能再使用。',
                type: '2'
              },
              {
                q: '现金红包是什么，有什么限制？',
                a: '现金红包既可以在出借时直接抵扣，也可以直接兑换现金到您的账户。为了控制风险，现金红包每天只能兑换3次，如您当天已兑换3次，建议您第二天再进行操作。',
                type: '3'
              },
              {
                q: '加息券是什么，有什么限制？',
                a: '加息券是指额外增加的年化利率。<br/>加息券的一些限制条件：<br/>1、x天以上：项目期限x天以上的出借项目才能使用。<br/>2、最高x元可享加息：最高x元的出借金额能够享受加息，超过x元的部分不参与加息<br/>3、加息x天：只有x天可享受加息，例如项目的项目期限为30天，而加息券的加息天数为10天，则只有10天享受加息，其余20天不加息。',
                type: '4'
              },
              {
                q: '出借时可以使用多张优惠券吗？',
                a: '当用户出借时，仅可使用红包或加息券，两者不可同时使用。',
                type: '5'
              },
              {
                q: '新手红包如何使用？',
                a: '新手红包可用于平台所有出借项目。每个出借项目只能使用一张红包，新手红包有效期不同，失效后将不能使用。',
                type: '6'
              }
            ],
            backplan: [
              {
                q: '什么是积分？',
                a: '积分是平台推出的一款福利，可用于在积分商城兑换平台提供的福利，如红包和某些实物等。',
                type: '1'
              },
              {
                q: '如何赚取积分？',
                a: '用户可通过出借、新手成长任务、出借里程碑、签到等方式获取积分。',
                type: '2'
              },
              {
                q: '积分可转让、兑现吗？',
                a: '个人用户所获取的积分不可转让，不可兑换现金，只能用来参与平台提供的福利兑换。',
                type: '3'
              },
              {
                q: '积分可无限使用吗？',
                a: '积分有效期为一年，当月所获得的所有积分，于次年相同月份的最后一天23：59：59过期。',
                type: '4'
              },
              {
                q: '积分如何使用？',
                a: '积分可用来兑换平台提供的福利，包括加息券红包、以及各种实物商品，以及参与指定活动等。',
                type: '5'
              },
              {
                q: '积分商城兑换规则',
                a: '1、积分兑换的加息券与红包将会实时发放。<br />2、实物商品自兑换成功后的15个工作日内发货，如遇节假日与不可抗力因素顺延，且在积分商城-兑换记录-兑换详情中可以查询到该商品的物流单号。<br />3、视频会员类商品自兑换成功后的三个工作日内发放，请在积分商城-兑换记录-兑换详情中查看对应激活码。<br />4、积分商城所有兑换的商品均不提供发票，如有任何质量问题请于收货后的24小时内联系客服，客服电话 400-135-3388。',
                type: '6'
              }
            ],
            tableList: [],
            isPlus: true,
            isOpen:  false,
          }
        },
        created () {
          this.tableList = this.account
        },
        methods: {
          selected (type) {
            this.activeNames = '0'
            this.activeName = type
            this.plusType = 0
            switch (type) {
              case '1':
                this.tableList = this.account
                break;
              case '2':
                this.tableList = this.asset
                break;
              case '3':
                this.tableList = this.eqz
                break;
              case '4':
                this.tableList = this.money
                break;
              case '5':
                this.tableList = this.invest
                break;
              case '6':
                this.tableList = this.backplan
                break;
            }
          },
          toggle (index,val){
            if (this.plusType == val) {  // 重复点击
              this.isOpen = !this.isOpen
              this.isOpen ?  this.activeNames = val :this.activeNames = 0
            } else { // 点击其他item
              this.plusType = val
              this.isOpen = true
            }
          }
        },
        mounted(){
          if(this.$route.query.sideBarType){
            this.selected(this.$route.query.sideBarType);
          }
        }
    }
</script>
<style scoped>
  .single-mask {
    overflow: hidden;
    background: #F8F8F8;
  }
  .single-main {
    width:1200px;
    min-height: 760px;
    margin:0 auto;
    color: #333333;
    background: #f8f8f8;
    box-shadow: none;
    border: none;
    display: block;
    align-items: stretch;
    justify-content:flex-start;
  }
  .help-title {
    width:1200px;
    margin: 34px auto 30px;
    font-size: 20px;
    line-height: 25px;
    font-weight: bold;
  }
  .help-left {
    width: 4px;
    height: 25px;
    background-color: #fc4d4f;
    float: left;
    margin-right: 14px;
  }
  /*侧边栏*/
  .help-sidebar{
    width: 250px;
    float: left;
    margin-right: 20px;
    padding: 0 30px;
    background: #fff;
  }
  .help-sidebar li{
    padding: 29px 0;
    /* text-align: center; */
    font-size: 20px;
    color: #333333;
    background-color: #ffffff;
    border-bottom: solid 1px #e5e5e5;
    cursor: pointer;
    position: relative;
    padding-left: 30px;
  }
  .help-sidebar li:last-child{
    border: none;
  }
  .help-sidebar li span{
    font-size: 12px;
    line-height: 85px;
    position: absolute;
   top: 0;bottom: 0;
   right: 30px;
   margin: auto; 
  }
  /*右侧*/
  .help-right {
    /* padding: 10px 77px 30px 25px; */
    width: 930px;
    float: right;
    padding:22px 30px 30px 30px;
    background: #fff;
  }
  .help-item {
    padding:20px 30px;
  }
  .help-q {
    font-size: 14px;
  }
  .help-a {
    font-size: 13px;
    margin-top: 10px;
    color: #999999;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .help-a span {
    margin-left: 3px;
    line-height: 25px;
  }
  /*高亮*/
  .help-sidebar li.active {
    font-size: 20px;
    color: #FF5B4C;
  }
  /*图标*/
  .icon {
    display: inline-block;
    min-width: 25px;
    height: 25px;
    line-height: 25px;
    color: white;
    text-align: center;
    margin-right: 8px;
  }
  .q-icon {
    background: url(https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon_ask.png) no-repeat;
    background-size: cover;
    border-radius: 3px;
    position: absolute;
    top:20px;left: 0;
  }
  .a-icon {
     background: url(https://aliyunsso.edspay.com/web/pcUpdate/pcPageRevision/icon_reply.png) no-repeat;
     background-size: cover;
  }
  .q-plus {
    width: 18px;
    height: 18px;
    background: url("https://aliyunsso.edspay.com/web/help/icon_zhangkai_normal%40x2.png") no-repeat;
    background-size: contain;
    float: right;
    margin-top: 22px;
  }
  .plusActive {
    width: 18px;
    height: 18px;
    background: url("https://aliyunsso.edspay.com/web/help/icon_shouqi_normal%40x2.png") no-repeat;
    background-size: contain;
    float: right;
    margin-top: 10px;
  }
  pre {
    margin: 0;
    font-family: 'Microsoft Yahei', '\5FAE\8F6F\96C5\9ED1', arial, 'Hiragino Sans GB', Tahoma, Arial, Helvetica, '\5B8B\4F53';
  }
</style>
<style rel="stylesheet/less">
  @import "../../../style/account.less";
</style>
