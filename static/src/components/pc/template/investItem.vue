<template>
    <router-link :to="{ path: '/invest/detail', query: { uuid:info.uuid,assetManageType:info.assetManageType}}">
        <div class="investItem">
            <dl class="clear">
                <dt>
                <router-link :to="{ path: '/invest/detail', query: { uuid: info.uuid,assetManageType:info.assetManageType}}" :title="info.name">{{info.name}}</router-link>
                <i v-show='info.addApr' class="addApr-icon">平台加息</i>
                <i v-show='info.vipUprateApr>0' class="vipApr-icon">V{{info.vipLevel}}加息</i>
                <i v-show='info.redUseNum>0 && info.progress != 100' class="redUseNum-ico">{{info.redUseNum}}张可用</i>
                </dt>
                <dd>
                <span>
                    <div class="apr">{{info.apr | returnFloat1}}<em>%</em><em v-show='info.addApr||info.vipUprateApr'>+{{info | allApr}}%</em></div>
                    <div class="aprname">参考年化</div>
                </span>
                <span class="number_padd">
                    <div class="topNumber mg16"><i class="num">{{info.timeLimit}}</i>天</div>
                    <div class="buttomName">授权服务期</div>
                </span>
                <span>
                    <div class="topNumber"><i class="num">{{info.remainAmount | moneyWan}}</i>元</div>
                    <div class="buttomName">剩余金额</div>
                </span>
                <!-- 进度 -->
                <span>
                    <div class="invest-pro topNumber">
                        <div :style="{ width:info.progress+'%' }"></div>
                    </div>
                    <p class="pro-text">进度:  {{info.progress}}%</p>
                </span>
                <!-- 出借按钮 -->
                <span>
                    <div class="clear">
                        <div class="rightBtn clear" :class="{active:info.progress==100}">
                            <div class="btn" v-if="info.progress<100" >
                                <router-link :to="{ path: '/invest/detail', query: { uuid:info.uuid,assetManageType:info.assetManageType}}">授权出借</router-link>
                            </div>
                            <div class="over" v-else><router-link :to="{ path: '/invest/detail', query: { uuid:info.uuid,assetManageType:info.assetManageType}}">已售罄</router-link></div>
                        </div>
                    </div>
                </span>
                </dd>
            </dl>
        </div>
    </router-link>
</template>
<script>
export default {
    data () {
        return{}
    },
    props:{
        info:Object
    }
  
}
</script>
<style lang="scss" scoped>
    .investItem{
      padding: 0 30px;
      cursor: pointer;
      .mg16 {
          margin-top: 16px !important;
      }
      dl{
           border-bottom: 1px solid #E5E5E5;
      }
      
      dt {
        width: 50%;
        padding-top: 39px;
        float: left;
        a{
          height: 20px;
          font-size: 18px;
          font-weight: 400;
          text-align: left;
          color: #333333;
          // margin-right: 10px;
          line-height:22px;
        }
        i{
          display: inline-block;
          padding: 0px 5px;
          height: 20px;
          font-size: 12px;
          text-align: center;
          line-height:18px;
          margin-left: 2px;
        }
      }
      dd{
        width:100%;
        height: 100px;
        float: left;
        span{
          float: left;
          display: block;
          height: 100%;
          .apr{
            margin-top: 12px;
            width: 210px;
            height: 33px;
            font-size: 24px;
            font-weight: 500;
            text-align: left;
            color: #fc4147;
            line-height:30px;
            em{
              font-size: 14px;
              color: #fc4147;
            }
          }
          .aprname{
            margin-top: 6px;
            width: 210px;
            font-size: 14px;
            text-align: left;
            color: #999;
          }
          
          .topNumber{
            width: 265px;
            font-size:16px;
            color:#333;
            margin-top: 22px;
            .num {
                font-size: 24px;
            }
          }
          .buttomName{
            width: 265px;
            font-size:14px;
            color:#999;
            margin-top: 6px;
          }
          /*进度条*/
          .invest-pro {
              width: 190px;
              height: 5px;
              margin-top: 35px;
              background:  #EEEEEE;
              border-radius: 100px;
              position: relative;
              div {
                  position: absolute;
                  left: 0;
                  border-radius: 100px;
                  height: 5px;
                  background:  #F42B32;
              }
          }
          .pro-text {
                width: 190px;
                font-size: 14px;
                color: #999;
                margin:9px 0px 0px 0px;;
          }
        }
        .number_padd{
              padding-left: 30px;
          }
      }
      .rightBtn{
        // float: right;
        .speed{
          margin-top: 22px;
          text-align: center;
          color:#999;
          font-size:14px;
          float: left;
          
          i{
            display: block;
            width: 90px;
            height: 90px;
            p{
              margin-top: 5px;
            }
          }
        }
        .btn{
          height: 40px;
          width: 90px;
          color:#fc4147;
          font-size:16px;
          border-radius: 2px;
          margin-top: 20px;
          margin-left: 90px;
          float: left;
          line-height:38px;
          text-align: center;
          border: 1px solid #f31b23;
          border-radius: 4px;
          a{
           display: block;
           width: 90px;
           height: 40px;
           color:#fc4147;
         }
       }
       .btn:hover{
        background-color: #fc4147;
      }
      .over{
        height: 40px;
        width: 90px;
        color:#999;
        font-size:16px;
        margin-top: 23px;
        margin-left: 54px;
        float: left;
        line-height:30px;
        text-align: center;
      }
      .btn:hover a{
        color:#fff;
      }
    }
}
    .investItem:hover {
        box-shadow: 0 2px 10px 0 rgba(38,139,232,0.21);
        dl{
           border-bottom:none; 
        }
    }
</style>

