<template>
  <div class="invest-main" >
		<div v-title>优质资产_存管项目_E都市钱包_让您安心的出借理财平台</div>
    <div v-keywords>E都市钱包、出借理财、理财计划、个人理财、P2P理财、互联网金融</div>
    <!-- banner -->
    <div class="invest-banner"></div>
    <div v-loading.body="loading">
      <!-- 推荐标 -->
      <!-- :class="{aiBack:!comItem.newbieOnly}"  -->
      <div class="invest-com">
          <div class="com-div">

            <router-link :to="{ path: '/invest/detail', query: { uuid:comItem.uuid,assetManageType:comItem.assetManageType}}">
            <div class="com-header clear" v-if="!comItem.newbieOnly">
                <div class="red_line fl"></div>
                <h3 class="fl">智能推荐</h3>
                智能推荐算法 专属高收益
            </div>
            <div class="com-header clear" v-else>
                <div class="red_line fl"></div>
                <h3 class="fl">新手专享</h3>
                注册送1118元红包
            </div>
            <div class="com-title">
              {{comItem.name}}
              <i class="new-icon icon" v-if="comItem.newbieOnly"></i>
              <i class="ai-icon icon" v-else>智能推荐</i>
              <i  class="addApr-icon" v-if='comItem.addApr'>平台加息</i>
              <i  class="vipApr-icon" v-if='comItem.vipUprateApr>0'>V{{comItem.vipLevel}}加息</i>
              <i  class="redUseNum-ico" v-if='comItem.redUseNum'>{{comItem.redUseNum}}张可用</i>
            </div>
            <div class="com-bottom">
              <div class="com-year w25">
                <div class="apr">
                  {{comItem.apr?comItem.apr:0 | returnFloat1}}<em>%</em><em v-show='comItem.addApr||comItem.vipUprateApr'>+{{comItem | allApr}}%</em>
                </div>
                <div class="buttomName">参考年化</div>
              </div>
              <div class="com-limit w25">
                <div class="topNumber">{{comItem.timeLimit?comItem.timeLimit:0}}<i class="day">天</i></div>
                <div class="buttomName">授权服务期</div>
              </div>
              <div class="com-rest w25">
                <div class="topNumber">{{comItem.remainAmount?comItem.remainAmount:0 | changeWan}}<i class="day">元</i></div>
                <div class="buttomName">剩余金额</div>
              </div>
              <div class="com-btn-box w25">
                <div class="com-btn" v-if="comItem.progress!== 100">授权出借</div>
                <div class="com-btn" v-else>查看详情</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <!-- 出借列表 -->
      <div class="invest-list" >
        <div class="com-header clear" v-if="!comItem.newbieOnly">
                <div class="red_line fl"></div>
                <h3 class="fl">E计划</h3>
        </div>
        <invest-item :info="item"  v-for="(item,index) in info"></invest-item>
      </div>
    </div>
  </div>
</template>

<script>
import investItem from '../template/investItem';
 export default{
  //  metaInfo: {
  //     title: '新手攻略 出借引导 存管项目  E都市钱包  让您安心的出借理财平台', // set a title
  //     meta: [{                 // set meta
  //       name: 'keywords',
  //       content: 'E都市钱包,E都市钱包理财,出借理财,个人理财,互联网金融,出借，出借服务，P2P理财'
  //     },{
  //       name: 'baidu-site-verification',
  //       content: 'ASl9m3ghF3'
  //     }],
  //   },
   name:'invest',
    data() {
    return {
      info: {}, // 标的列表
      comItem: {
        newbieOnly: 1
      }, //推荐标
      loading:true,
    }
  },
  methods:{
    getInfo () {
      global.http.investPost(this, "/borrow/investList", {
        status:'',
        pageSize:100,
        pageNum: 1,
      }, data => {
        if (data.data.resCode == 1) {
          this.loading = false
          
          //遍历可用红包
          var investDataList = data.data.resData.pageInfo.list;  //项目列表数据
          var invesRedList = data.data.resData.redModel; //红包列表数据
          for(var j=0; j<investDataList.length; j++){
            var redUseNum = 0
            if(investDataList[j].isRedEnvelope == 0 && investDataList[j].isUpRate == 0){
              if(investDataList[j].newbieOnly){//筛选新手标
                for(var i=0; i<invesRedList.length; i++){
                  if(invesRedList[i].category != 1 && invesRedList[i].category != 2){
                    if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                      redUseNum++
                    }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                      redUseNum++
                    }
                  }
                }
              }else{//普通标
                for(var i=0; i<invesRedList.length; i++){
                  if(invesRedList[i].category != 0 && invesRedList[i].category != 2){
                    if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                      redUseNum++
                    }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                      redUseNum++
                    }
                  }
                }
              }
            }else if(investDataList[j].isRedEnvelope == 0 && investDataList[j].isUpRate == 1){
              if(investDataList[j].newbieOnly){//筛选新手标
                for(var i=0; i<invesRedList.length; i++){
                  if(invesRedList[i].category != 1 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
                    if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                      redUseNum++
                    }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                      redUseNum++
                    }
                  }
                }
              }else{//普通标
                for(var i=0; i<invesRedList.length; i++){
                  if(invesRedList[i].category != 0 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
                    if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                      redUseNum++
                    }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                      redUseNum++
                    }
                  }
                }
              }
            }else if(investDataList[j].isRedEnvelope == 1 && investDataList[j].isUpRate == 0){
              if(investDataList[j].newbieOnly){//筛选新手标
                for(var i=0; i<invesRedList.length; i++){
                  if(invesRedList[i].category != 1 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
                    if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                      redUseNum++
                    }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                      redUseNum++
                    }
                  }
                }
              }else{//普通标
                for(var i=0; i<invesRedList.length; i++){
                  if(invesRedList[i].category != 0 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
                    if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
                      redUseNum++
                    }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
                      redUseNum++
                    }
                  }
                }
              }  
            }
            
            //算好的红包数量，将字段插入理财列表数组
            investDataList[j].redUseNum = redUseNum
          }

          //项目列表数据
          let listInfo = data.data.resData.pageInfo.list
          this.comItem = data.data.resData.pageInfo.list[0]
          listInfo.shift()
          this.info = listInfo
        }
      })
    },
    // allApr (item) {
    //     let sum = item.addApr + item.vipUprateApr	
    //     return sum
    // }
  },
  created() {
    this.getInfo()
  },
  components: {
    investItem
   }
    }
</script>

<style>
.invest-list a:last-child .investItem dl{
        border-bottom:none; 
      }
</style>

<style lang="scss" scoped>

  i {
    display: inline-block
  }
  .invest-main {
    padding-bottom: 5px;
    background: #F8F8F8;
    /*banner*/
    .invest-banner {
      width: 100%;
      height: 260px;
      background: url('https://aliyunsso.edspay.com/web/invest/pcPageRevision/investBanner.png?v=1.1') no-repeat center center;
      background-size: cover;
    }
    .com-header{
             padding-top: 34px;
            padding-left: 30px;
            margin-bottom: 32px;
             font-size: 16px;
            color: #999999;
            line-height: 32px;
             h3{
               padding: 0 10px 0 16px;
               font-size: 24px;
                color: #333333;
             }
        }
    /*推荐标*/
    .invest-com {
      width: 1200px;
      height: 260px;
      margin:20px auto;
      background: #fff;
      /* background: url('https://aliyunsso.edspay.com/web/1118/command1118.png') no-repeat center center;
      background-size: cover; */
      overflow: hidden;
      .com-div {
        // width: 855px;
        // margin: 24px 0px 0px 296px;
        overflow: hidden;
        .red_line{
          margin-top: 5px;
        }
        .com-title {
          // margin: 22px 0px 0px 57px;
          font-size: 18px;
          color: #333333;
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 30px;
          padding-left: 30px;
          i {
            font-size: 12px;
            padding:0px 9px;
            height: 20px;
            border-radius: 2px;
            line-height: 18px;
            margin-left: 10px;
          }
          .new-icon{
                width: 74px;
                height: 24px;
                border: none;
                background: url(https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/newIcon.png?v=1.1) no-repeat;
                background-size: cover;
            }
        }
        .com-bottom {
          // margin:14px 0px 0px 57px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          padding-left: 30px;
          .apr {
            font-size: 36px;
            color: #F31B23;
            em {
              font-size: 20px;
            }
          }
          .buttomName {
           font-size: 18px;
            color: #9F9F9F;
          }
          .topNumber {
            font-size: 36px;
            color: #333333;
          }
          .day {
            font-size: 24px;
          }
          .com-btn {
            width: 130px;
            height: 40px;
            font-size: 16px;
            color: white;
            background: #FF5B4C;
            text-align: center;
            line-height: 38px;
            // border: 1px solid #f31b23;
            border-radius: 2px;
            margin-bottom: 10px;
            margin-left: 120px;
            cursor: pointer;
          }
          .com-btn:hover {
            color: white;
            background: #f31b23;
          }
          .w25{
            width: 25%;
          }
        }
      }
    }
    .aiBack {
      background: url('https://aliyunsso.edspay.com/web/invest/aiBack.png') no-repeat center center !important;
      background-size: cover !important;
    }
    /*出借列表*/
    .invest-list {
      margin:0 auto;
      width: 1200px;
      background: #fff;
      margin-bottom: 30px;
      // padding:0 30px;
      .com-header{
        margin-bottom: 0;
        .red_line{
           margin-top: 5px;
        }
      }
    }
    
  }
</style>
