<template>
     <div class="wxPlan">   
     	<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
               <div v-if="dataList.length">
                    <div class="header">
                        <div class="sum fl">
                             <p>{{topText[status]}}本息(元):</p>
                             <div class="money">{{sumMoney | moneyFormat}}</div>
                        </div>
                        <div class="num fl">
                             <div class="capital text">{{topText[status]}}本金(元):<span>{{capital | moneyFormat}}</span></div>
                             <div class="profit text">{{topText[status]}}利息(元):<span>{{interest | moneyFormat}}</span></div>
                        </div>
                   </div>
                    <ul>
                         <li v-for="(item,index,list) in dataList" class="list">
                              <div class="time" v-if="flag == 1">回款时间：{{item.title}}</div>
                              <div class="time" v-else-if="flag == 2 && checkTitle=='待回款'">预计回款时间：{{item.title}}</div>
                              <div class="time" v-else-if="flag == 2 && checkTitle=='已回款'">实际回款时间：{{item.title}}</div>

                              <div v-for="(list,ind) in item.list">
                                   <div class="name hidden">{{list.borrowName}} 
                                        <!-- ({{list.schedule}}) -->
                                        <span v-if="list.status==0" class="status_ico_stay">待回款</span>
                                        <span v-else-if="list.status==2" class="status_ico_is">回款中-银行处理中</span>
                                        <span v-else class="status_ico_hased">已回款</span>
                                   </div>
                                   <div class="principal clear">
                                        <h4 class="fl">回款本金(元)</h4>
                                        <h6 class="fr">{{list.capital}}</h6>
                                   </div>
                                   <div  @click="aaaa(index,ind,list)" class="principal clear" ref="aaa">
                                        <h4 class="fl">回款利息(元)</h4>
                                        <h6 class="fr" ref="redIitm"><img src="https://aliyunsso.edspay.com/web/wxUpdate/for_popwindow.png" alt="">{{list.interest}}</h6>
                                        <div class="tips" :ref="'tipItem'+index+ind">
                                             <ul>
                                                  <li v-for="itemList in list.earnings" v-if="itemList.money">{{itemList.text}}{{itemList.money}}</li>
                                             </ul>
                                        </div>
                                   </div>
                              </div>
                         </li>
                    </ul>
               </div>
               <accountNull v-else-if="isgetData" :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂无记录'"></accountNull>
          </mt-loadmore>
          <earnings-tips :earnings="thisEarnings" v-if="showEar.isShow" :showThis="showEar"></earnings-tips>
     </div>
</template>

<script>
     import { TabContainer, TabContainerItem } from 'mint-ui';
     import accountNull from './wxNull'
     import earningsTips from '../invest/earningsTips';     //引入弹框
	export default {
		data(){
			return{
                    autoFill:false,
                    isover:true,
                    pages:1,
                    pageNum:1,
                    dataList:[],
                    sumMoney:0,
                    capital:0,
                    interest:0,
                    isgetData:false,    //是否获取到数据
                    topText:['待回款','已回款'],
                    showEar:{
                         isShow:false   //显示预期收益
                    },
                    thisEarnings:[],    //当前点击项目
                    msgText:'您还没有已回款记录呦', 
                    earnings:[
                         {
                              text:'项目预期基础收益：',
                              money:0.89+'(回款时扣除3%利息管理费)',
                         },
                         {
                              text:'项目加息预期收益：',
                              money:0.89,
                         },
                         {
                              text:'加息券预期收益：',
                              money:0.89,
                         },
                         {
                              text:'vip预期收益：',
                              money:0.89,
                         }
                    ]
			}
		},
		props:['resData','flag','titleList','status','checkTitle'],
          watch:{
               status(curVal,oldVal){
                    if(curVal != oldVal){
                         this.pageNum =  1
                         console.log(this.pageNum+'====='+this.flag)
                         this.getData(this.pageNum);
                    }
               }
          },
          computed:{
               allLoaded:{
                    get(){
                         if(this.flag ==2 && this.titleList.selected == 'tab-container1' && this.isover) return false  
                         else if(this.flag ==1 && this.titleList.selected == 'tab-container2' && this.isover) return false;   
                         else return true;
                    },
                    set(){}
               }
          },
          methods:{
               aaaa(index,ind,list){
                    if(list.showTips == false) {
                         this.$refs['tipItem'+index+ind][0].style.display = "block";
                         list.showTips = true
                    }else{
                         this.$refs['tipItem'+index+ind][0].style.display = "none";
                         list.showTips = false;
                    }
               },
               activeMoney(item){
                    this.thisEarnings = item.earnings;
                    this.showEar.isShow = true;
               },
               loadTop(){
                    var that = this;
                    this.pageNum = 1;
                    setTimeout(function(){
                         that.isover = true;
                         that.getData(that.pageNum);
                         that.$router.push('/wxMyAccount/wxRepayPlan')
                         that.$refs.loadmore.onTopLoaded();
                    },1500)
               },
               loadBottom(){
                    var that = this;
                    this.pageNum += 1;
                    this.isover = false;
                    var timer = setTimeout(function(){
                         that.$refs.loadmore.onBottomLoaded();
                         if(that.pages >= that.pageNum){
                              that.getData(that.pageNum);
                              that.isover = true;
                         }
                         clearTimeout(timer)
                    },500)
               },
               getData(num){
                    this.isover = true;
                    this.postData('/borrow/collection/list',(res,data) => {
                         if(data.resCode && data.resData.data){
                              this.isgetData = true;
                              this.pages = data.resData.data.pages
                              var getList = data.resData.data.list;
                              if(num ==1){
                                   document.body.scrollTop = 0;
                                   this.sumMoney = data.resData.collections;
                                   this.capital = data.resData.capital;
                                   this.interest = data.resData.interest;
                                   this.dataList = [];
                              }
                              for(var i=0;i<getList.length;i++){
                                   var lenStr = this.dataList.length;
                                   getList[i].showTips = false;
                                   getList[i].earnings=[
                                        {
                                             text:'项目基础收益：',
                                             money:getList[i].collectionInterest+'(回款时扣除3%利息管理费)',
                                        },
                                        {
                                             text:'项目加息收益：',
                                             money:getList[i].borrowInterest,
                                        },
                                        {
                                             text:'加息券加息收益：',
                                             money:getList[i].upRateInterest,
                                        },
                                        {
                                             text:'VIP加息收益：',
                                             money:getList[i].vipInterest,
                                        }
                                   ];
                                   if(!(i == 0)){
                                        if(this.dataList[lenStr-1].list[(this.dataList[lenStr-1].list.length)-1].daiLy != getList[i].daiLy){
                                             this.dataList.push({});
                                             this.dataList[lenStr].title = getList[i].daiLy;
                                             this.dataList[lenStr].list = []
                                             this.dataList[lenStr].list.push(getList[i]);
                                        }else{
                                             this.dataList[lenStr-1].list.push(getList[i]);
                                        }
                                   }else{
                                        this.dataList.push({});
                                        this.dataList[lenStr].title = getList[i].daiLy;
                                        this.dataList[lenStr].list = [];
                                        this.dataList[lenStr].list.push(getList[i]);
                                   }
                              }
                         }
                    },{assetManageType:this.flag,pageNum:num,pageSize:8,status:this.status})
               }
          },
          components:{
               earningsTips,
               accountNull,
          },
          created(){
               this.getData(this.pageNum)
          },
	}
</script>

<style lang="scss" scoped>
     .top{
          color:#333;
          height:3.333333rem;
          text-align:center;
          background:#fff;
          .title{
               font-size: 0.346667rem;
               line-height:0.346667rem;
               padding:0.666667rem 0 0.133333rem 0;
          }
          .money{
               font-size:0.8rem;
               line-height:1.12rem;
          }
     }
     .header{
          height:3.333333rem;
          font-size:0.32rem;
          color:#333;
          padding:0.8rem 0.4rem 0;
          background:#fff;
          .sum{width:50%;}
          .num{
               margin-top:0.266667rem;
               width:49.5%;
               padding-left:0.266667rem;
               border-left: 1px solid #E5E5E5;
               span{
                    color:#ff5b4c;
               }
               .capital{padding-bottom:0.266667rem;}
               .text{line-height:0.506667rem;}
          }
          p{
               font-size:0.346667rem;
               padding-bottom:0.133333rem;
          }
          .money{
               color:#ff5b4c;
               font-size:0.7rem;
               line-height:1.12rem;
               font-family: DIN-Medium;
          }

     }
     li.list{
          background:#fff;
          font-size:0.373333rem;
          line-height:0.533333rem;
          color:#8e8e8e; 
          .time{
               padding-left:0.4rem;
               height:0.853333rem;
               line-height:0.853333rem;
               font-size:0.32rem;
               color:#808080;
               background:#eee;
          }
          .name{
               padding-left:0.4rem;
               height:1.333333rem;
               font-size:0.373333rem;
               line-height:1.333333rem;
               color:#333;
               span{
                    // color:#8e8e8e;
                    font-size: 0.293333rem;
                    color: #FFFFFF;
                    padding: 0 0.12rem;
                    height: 0.373333rem;
                    line-height: 0.373333rem;
                    border-radius: 0.026667rem;
               }
               .status_ico_stay{
                    background: #FFBB33;
               }
               .status_ico_hased{
                    background: #D0D0D0;
               }
               .status_ico_is{
                    background: #80AAFF;
               }
          }
          .principal{
               margin: 0 0.4rem;
               padding-bottom:0.133333rem;
               font-size:0.373333rem;
               line-height:0.666667rem;
               position: relative;
               img{
                    height:0.4rem;
                    width:0.4rem;
                    margin: -0.08rem 0.133333rem 0 0;
               }
               .tips{
                    position:absolute;
                    width:5.6rem;
                    background:rgba(0,0,0,.6);
                    padding:0.266667rem 0 0.266667rem 0.4rem;
                    border-radius:0.16rem;
                    bottom:0.133333rem;
                    right:2.0rem;
                    display:none;
                    li{
                         padding-bottom:0.133333rem;
                         font-size:0.32rem;
                         line-height:0.453333rem;
                         color:#fff;
                    }
               }
          }
          .principal:last-child{
               padding-bottom:0.266667rem;
               border-bottom:1px solid #e5e5e5;
          }
     }
</style>