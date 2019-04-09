<template>
  <div class="bank-main">
    <!--已绑定的雁行卡-->
    <div class="cardDiv" v-if="type == 1">
      <div class="cardItem haveCardItem">
        <!--所属银行-->
        <div class="cardBank">
          <div class="bank_log_box">
             <img :src="logo"/>
          </div>
          <span>{{bankName}}</span>
        </div>
        <!--卡类型-->
        <div class="cardType">储蓄卡</div>
        <!--卡号-->
        <p class="cardNum">{{carNum}}</p>
      </div>
      <div class="cancel-btn" @click="unbind" v-if="canUnbind">解除绑定</div>
    </div>
    <!--没有解除绑定-->
    <div class="cardDiv nobind" v-if="type == 3">
      <div class="cardItem nobindItem">
        <!--所属银行-->
        <div class="cardBank1">
          <div class="bank_log_box1">
             <img :src="logo"/>
          </div>
          <span>{{bankName}}</span>
        </div>
        <div class="card-detail"><span>姓名</span>{{realNames}}</div>
        <div class="card-detail exp-fm"><span>银行账号</span>{{carNum}}</div>
        <!-- <router-link to="/home" class="limitMoney" tag="div">限额说明</router-link> -->
        <el-popover popper-class="realNamePopover"  placement="right-start"  trigger="hover"
          width="340" height="190" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <el-table :data="bankList" class="realName-table" height="190" width="340">
            <el-table-column width="100" prop="bankName" label="支持银行">
              <template scope="scope">
                {{ scope.row.bankName }}
              </template>
            </el-table-column>
            <el-table-column width="100" prop="singleLimit" label="单笔限额">
              <template scope="scope">
                {{scope.row.singleLimit |changeWan}}
              </template>
            </el-table-column>
            <el-table-column width="100" prop="dailyLimit" label="单日限额">
              <template scope="scope">
                {{scope.row.dailyLimit |changeWan}}
              </template>
            </el-table-column>
          </el-table>
          <div slot="reference" class="name-wrapper fr limitMoney">
            <el-tag>
              <span>限额说明<i></i></span>
            </el-tag>
          </div>
        </el-popover>
      </div>
      <p class="card-tips">注：如需修改银行卡请登录E都市钱包APP或微信公众号</p>
    </div>
    <!--添加银行卡-->
    <div class="cardItem addCardItem" @click="addCard(type)" v-if="type == 2 || type == 4">
      <div class="addCardIcon"></div>
      <h1>添加银行卡</h1>
    </div>
  </div>
</template>
<script>
    export default {
        props: {
          type: Number, // 1：绑定的银行卡 2.添加新浪银行卡 3.没有解绑的样式 4.添加浙商银行卡
          carNum: String,
          logo: String,
          bankFull: String,
          bankType: String,
          canUnbind: Boolean,
          realNames:String,
          realName:{
            type:Boolean,
            default: true
          },
          bankName:String
        },
        data () {
          return{
            bankList:[]
          }
        },
        methods: {
          addCard (val) {
            if (val == 2) {
                if (this.realName) {
                  this.$router.push('/myAccount/sinaBindCard')
                } else {
                  this.$confirm('您尚未开通支付账户，请开通', '提示', {
                    confirmButtonText: '去实名',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$router.push('/myAccount/sinaRealName')
                  }).catch(() => {});
                }
            } else {
                this.$confirm('您尚未开通存管账户，请开通', '提示', {
                    confirmButtonText: '去开通',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    this.$router.push('/myAccount/openAccount')
                }).catch(() => {});
            }
          },
          unbind () {
              this.$router.push('/myAccount/unbindCard/'+this.bankType+this.bankFull)
          },
          // 获取银行
          getBank () {
            global.http.post(this,"/account/zsbank/list",{},data => {
              this.bankList = data.data.resData.bankList
            })
          },
        },
        created(){
          this.getBank()
        }
    }
  </script>
<style scoped>
  .cardItem{
    width: 288px;
    height: 144px;
  }
  .cardDiv {
    overflow: hidden;
    /* width:330px;
    height:300px; */
    float: left;
  }
  .nobind {
    overflow: hidden;
    width:330px;
    height:230px;
    float: left;
  }
  .haveCardItem {
    overflow: hidden;
    margin-top: 40px;
    background:url(https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/ka_bg.png) no-repeat;
    background-size:100% 100%;
    background-position: 0px 0px;
    position:relative;
  }
  .nobindItem {
    margin-top: 0px;
    overflow: hidden;
    margin-top: 40px;
    position:relative;
    width: 288px;
    height: 144px;
    border-radius: 4px;
    background:url(https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/ka_bg.png) no-repeat;
    background-size: cover;
    padding-left: 20px;
    padding-top: 20px;
    margin-bottom: 18px;
  }
  .card-tips{
    font-size: 12px;
    color: #333333;
  }
  .addCardItem {
    float: left;
    width: 288px;
    height: 144px;
    border-radius: 4px;
    margin-top: 40px;
    background-color: #ffffff;
    border: solid 1px #d7d7d7;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
  }
  .addCardItem h1 {
    font-size: 14px;
    color: #808080;
    margin-top: 2px;
  }
  .addCardIcon {
    background:url('https://aliyunsso.edspay.com/web/myAccount/pcPageRevision/icon-add-normal.png') no-repeat;
    background-size: cover;
    width: 68px;
    height: 68px;
    margin-top: 5px;
  }

  .cardBank {
    height:40px;
    position: absolute;
    top: 20px;
    left: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cardBank span {
    font-size: 12px;
    color: #fff;
    padding-left: 8px;
    padding-bottom: 12px;
  }
  .cardBank .bank_log_box {
     width: 34px;
     height: 34px;
     background: #fff;
     text-align: center;
     padding-top: 2px;
     border-radius: 50%;
  }
  .zsCardBank{
    position: relative;
  }
  .cardBank1{
    width: 100%;
    height: 30px;
    position: relative;
    margin-bottom: 26px;
  }
  .limitMoney{
    position: relative;
    top: -111px;
    right: 20px;
    font-size: 10px;
    display: inline-block;
    width: 60px;
    height: 20px;
    line-height: 20px;
    background: rgba(255,255,255,.2);
    text-align: center;
    border-radius: 11px;
    cursor: pointer;
  }
  .cardBank1 span{
    font-size: 12px;
    color: #FFFFFF;
    position: relative;
    top: 7px;
    float: left;
  }
  .cardBank1 .bank_log_box1 {
     width: 30px;
     height: 30px;
     background: #fff;
     text-align: center;
     padding-top: 2px;
     border-radius: 50%;
     float: left;
     margin-right: 10px;
  }
  .cardBank1 .bank_log_box1 img{
    width: 26px;
    height: 26px;
  }
  .card-detail{
    font-size: 16px;
    color: #FFFFFF;
    line-height: 0.213333rem;
    margin-bottom: 10px;
  }
  .card-detail span{
    font-size: 14px;
    margin-right: 10px;
    font-family: PingFangSC-Regular;
  }
  .card-detail.exp-fm{
    font-family: DIN-Medium;
  }
  .cardBank .bank_log_box img {
    width:30px;
    height:30px;
    
  }
  .cardType {
    font-size: 12px;
    color: #ffffff;
    position: absolute;
    top: 42px;
    left: 63px;
  }
  .cardNum {
    position: absolute;
    bottom: 21px;
    right: 20px;
    font-size: 14px;
    line-height: 14px;
    color: #fff;
  }
  .myCard-tip{
    font-size: 14px;
    padding: 15px 10px;
  }
  .myCard-tip h1 {
    line-height: 14px;
    color: #333333;
    padding-bottom: 15px;
  }
  .myCard-tip p {
    line-height: 14px;
    color: #666666;
    margin-bottom: 10px;
  }
  /*按钮*/
  .cancel-btn {
    font-size: 16px;
    margin: 15px auto 0 auto;
    cursor: pointer;
  }
  .clear{zoom:1;}
  .clear:after{content:"";display:block;clear:both;}
</style>
