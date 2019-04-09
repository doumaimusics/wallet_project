<template>
   <div id="wxTotalAssets" :style="fullHeight">
       <div v-title>存管账户</div>
       <div class="fd-btn"></div>
       <div class="nav-box">
           <ul>
               <li :class="{active:this.isShow==1}" @click="isSwitch(1)">总资产</li>
               <li :class="{active:this.isShow==2}" @click="isSwitch(2)">累计收益</li>
           </ul>
       </div>
       <div class="chart-box">
            <!-- 饼图 -->
            <div class="chart" id="generalAssets"></div>
            <!-- 总数据 -->
            <div class="data-box">
                <h3>{{title}} <i @click="showThis.isShow = true"></i></h3>
                <p>{{propertyData}}</p>
            </div>
            
       </div>
       
       <!-- 数据 -->
       <div class="datas-box clear">
           <!-- 总资产数据 -->
           <dl v-if="isShow==1">
               <dt>
                   <i class="cl1"></i>
                   可用余额(元)
                </dt>
               <dd>{{account.useMoney ?  account.useMoney:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==1">
               <dt>
                   <i class="cl2"></i>
                   待回款本金(元)
                </dt>
               <dd>{{account.principal ?  account.principal:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==1">
               <dt>
                   <i class="cl3"></i>
                   待回款利息(元)
                </dt>
               <dd>{{account.waitInterest ?  account.waitInterest:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==1">
               <dt>
                   <i class="cl4"></i>
                   提现中(元)
                </dt>
               <dd>{{account.noUseMoney ?  account.noUseMoney:0 | moneyFormat}}</dd>
           </dl>
           
           <!-- 累计收益数据 -->
           <dl v-if="isShow==2">
               <dt>
                   <span class="cl5"></span>
                   项目基础收益(元)
                </dt>
               <dd>{{account.expectEarn ?  account.expectEarn:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==2">
               <dt>
                   <span class="cl6"></span>
                   项目加息收益(元)
                </dt>
               <dd>{{account.rateEarn ?  account.rateEarn:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==2">
               <dt>
                   <span class="cl7"></span>
                   加息券加息收益(元)
                </dt>
               <dd>{{account.rateCoEarn ?  account.rateCoEarn:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==2">
               <dt>
                   <span class="cl8"></span>
                   VIP加息收益(元)
                </dt>
               <dd>{{account.rateVipCoEarn ?  account.rateVipCoEarn:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==2">
               <dt>
                   <span class="cl9"></span>
                   抵扣红包收益(元)
                </dt>
               <dd>{{account.virRedEarn ?  account.virRedEarn:0 | moneyFormat}}</dd>
           </dl>
           <dl v-if="isShow==2">
               <dt>
                   <span class="cl10"></span>
                   现金红包收益(元)
                </dt>
               <dd>{{account.cashRedEarn ?  account.cashRedEarn:0 | moneyFormat}}</dd>
           </dl>
       </div>
       <!-- 总资产页面底部文字 isShow==1 && earnAmounts !=0-->
       <!-- <p class="text-bottom" v-if="sinaTotalMoney != 0 && isShow== 1">
           您的总资产是<span>{{totalMoneys}}</span>元，以上仅展示存管账户资产明细，普通账户请在<router-link class="tag-text" tag="span" :to="{path:'/wxMyAccount/wxCommonAccount',query:{flag:1}}">普通账户入口</router-link>查看
       </p> -->
       
       <!-- props:['showThis','text','btn','btnText','confirm'],//展示弹框，弹框文本，按钮类型 eg:1,2,按钮文本，方法 -->
       <wx-public-dialog v-if='showThis.isShow' :confirm="clickThis" :btn="0"  :text="openZcText" :btnText="btnText">
       </wx-public-dialog>
   </div>
</template>

<script>
   import wxHeader from '../../../wxHeader';
   import { MessageBox } from 'mint-ui'
   import { TabContainer, TabContainerItem } from 'mint-ui';
   import wxPublicDialog from '../../../public/wx/wxPublicDialog.vue' //弹框组件
   export default {
        data(){
            return{
                isShow:1,   //  1展示总资产数据  2.展示累计收益数据 
                fullHeight:{
                  minHeight: document.documentElement.clientHeight+2+"px"  //获取手机可视区域的的高度
                },
                totalMoneys:0,  // 总金额 新浪+存管
                earnAmounts:0,  // 累计收益
                bankOpenStatus:0,  // 是否开通存管
                sinaTotalMoney:0,  // 新浪资产
                account:{},  // 金额数据
                arrData:[],  // 饼状图数据
                title:'总资产（元）',
                propertyData:0,
                flags:0,  // 1有新浪无浙商, 2有浙商, 0都无
                showThis: {      // 全部转移确认框
					isShow: false,
                },
                btnText:'我知道了',
                openZcText:'总资产=可用余额+待回款本金+待回款利息+提现中;<br/><br/>其中待回款利息包括:项目基础收益+项目加息收益+加息券加息收益+VIP加息收益',

            }
        },
        mounted(){
            this.arrData = [
                {value:'0', name:'可用余额(元)'},
                {value:'0', name:'待回款本金(元)'},
                {value:'0', name:'待回款利息(元)'},
                {value:'0', name:'提现中(元)'},
            ]
            this.getDetail();  // 
            this.hintText();  // 饼状图上的提示文字调用
        },
        methods:{
            clickThis(){    // 弹框的方法
                this.showThis.isShow = false;
            },
             isSwitch(n){  // tab切换
                 if(n==1){
                     this.isShow = 1;
                     this.binData();// 饼状图数据调用
                     this.getDetail(); // echarts调用
                     this.hintText(); // 饼状图上的提示文字调用
                     
                 } else if(n==2){
                     this.isShow = 2;
                     this.binData();// 饼状图是数据调用
                     this.getDetail(); // echarts调用
                     this.hintText(); // 饼状图上的提示文字调用
                     
                 }
             },
             hintText(){   // 饼状图上的提示文字
                if(this.isShow == 1){
                   this.title = '总资产（元）'
                   this.openZcText = '总资产=可用余额+待回款本金+待回款利息+提现中;<br/><br/>其中待回款利息包括：项目基础收益+项目加息收益+加息券加息收益+VIP加息收益';
                } else if(this.isShow == 2){
                   this.title= '累计收益（元）';
                   this.openZcText = '累计收益=项目基础收益+项目加息收益+加息券加息收益+vip加息收益+现金红包收益+抵扣红包收益;<br/><br/>其中项目基础收益在回款时，会扣除3%的利息管理费'
                }
             },
            //  this.account.noUseMoney == null?0:this.account.noUseMoney
            binData(){   // 饼状图数据
                  if(this.isShow == 1){
                        this.arrData = [
                            {value:this.account.useMoney, name:'可用余额(元)'},
                            {value:this.account.principal, name:'待回款本金(元)'},
                            {value:this.account.waitInterest, name:'待回款利息(元)'},
                            {value:this.account.noUseMoney == null?0:this.account.noUseMoney, name:'提现中(元)'},
                        ]
                        this.propertyData = this.account.totalMoney;  // 存管账户总资产数据
                    } else if(this.isShow == 2){
                        this.arrData = [
                            {value:this.account.expectEarn, name:'项目预期收益(元)'},
                            {value:this.account.rateEarn, name:'项目加息收益(元)'},
                            {value:this.account.rateCoEarn, name:'加息券加息收益(元)'},
                            {value:this.account.rateVipCoEarn, name:'VIP加息收益(元)'},
                            {value:this.account.virRedEarn, name:'抵扣红包收益(元)'},
                            {value:this.account.cashRedEarn, name:'现金红包收益(元)'},
                        ]    
                        this.propertyData = this.earnAmounts;  // 累计收益金额
                    }
            },

            getData(){   // 数据接口
				this.postData('/account/detail/basic',(res,data) => {
                   console.log(data)
					if(data.resCode){
                        this.account = data.resData.basicModel;
                        this.binData(); // 饼状图是数据调用
                        this.getDetail(); // echarts调用
                    }	
                   
				},{assetManageType:this.flags},1)
            },
            getDetail(){    // echarts配置
                var detail = echarts.init(document.getElementById('generalAssets'));
                var pieOption = {
                    series:[{
                        name:'zichanzonglan',
			            type:'pie',
			            radius: ['60%', '100%'],
			            avoidLabelOverlap: true,
                        hoverAnimation:false,  // 开启 hover 在扇区上的放大动画效果
			            color:['#8380FF','#679DF5','#68BFF6','#F4B649','#F4A41A','#F4741A'],
			            hoverOffset:5,
			            label: {
			                normal: {
			                    show: false, // 指示器开关。
			                    position: 'center'
			                },
			                emphasis: {
			                    show: false,
			                    textStyle: {
			                        fontSize: '10',
			                        fontWeight: 'bold',
			                        color:'#4CB1FF'
			                    }
			                }
			            },
			            labelLine: { //  视觉引导线的样式
			                normal: {
                                show: false,
                                length:100,
                                length2:50
                            }
                        },
			            data:this.arrData
                    }]
                }
                 detail.setOption(pieOption);
            }
        },
        mounted(){
            
        },
        created(){
            this.isShow = this.$route.query.num;
            this.totalMoneys = this.getCookie('totalMoney');   // 总资产  新浪+存管
            this.earnAmounts = this.getCookie('earnAmount');   // 累计收益
            this.bankOpenStatus = this.getCookie('bkOpenStatus');   // 判断是否开通存管
            this.sinaTotalMoney = this.getCookie('sinaTotalMoney');  // 新浪资产
             if(this.bankOpenStatus == 2){    // bankOpenStatus==2  只开通存管
                this.flags = 2; // 1有新浪无浙商, 2有浙商, 0都无
             } else if(this.bankOpenStatus == 3){ // bankOpenStatus==3  两个都开通
                 this.flags = 2;
             } else {
                this.flags = 0;
             }
            this.getData();
            this.hintText();
        },
        components:{
            wxPublicDialog // 弹框组件
        }
   }
</script>

<style lang="scss" scoped>
  #wxTotalAssets{
      position: relative;
      overflow: hidden;
      width: 100%;
      font-family: PingFangSC-Regular;
      background: #fff;
      .fd-btn{
          width: 20%;
          height: .493333rem;
          margin: .533333rem 0 .306667rem 7.96rem;
      }
      .nav-box{
              z-index: 99;
            width: 100%;
            height: .666667rem;
            margin-bottom: 1.333333rem;
            ul{
                width: 4.533333rem;
                height: .666667rem;
                margin: 0 auto;
                background: url('https://aliyunsso.edspay.com/web/wx/account/title_bg.png?v=1.0') no-repeat;
                background-size: 4.533333rem .666667rem;
                li{
                    padding: 0.02rem;
                    width: 50%;
                    height: 100%;
                    color: #808080;
                    font-size: .373333rem;
                    float: left;
                    line-height: .666667rem;
                    text-align: center;
                }
                li.active{
                    color: #508CEE;
                }
            }
      }
      .chart-box{
          position: relative;
          .chart{
            width: 5.96rem;
            height: 5.96rem;
            margin: 0 auto;
            margin-bottom: 1.2rem;
        }
        .data-box{
            height: 1.066667rem;
            width: 100%;
            position: absolute;
            top:0;bottom: 0;
            margin: auto;
            text-align: center;
            h3{
                font-size:.32rem ;
                color: #808080;
                overflow: hidden;
                position: relative;
                i{
                    width: .4rem;
                    height: .4rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/account/hint_icon.png?v=1.0') no-repeat;
                    background-size:.4rem .4rem; 
                    display: inline-block;
                    border-radius: 50%;
                    position: absolute;
                    top:0;bottom:0;
                    margin: auto;
                }
            }
            p{
                font-size: .613333rem;
                color:#508CEE;
                font-family: DIN-Bold;
            }
        }
      }
      
      .datas-box{
          width: 100%;
          padding:0 .413333rem 0 1.573333rem;
          margin-bottom: .933333rem;
          dl{
              width: 50%;
              float: left;
              margin-bottom: .4rem;
              dt{
                font-size: .293333rem;
                color:#808080;
                i{
                    width: .266667rem;
                    height: .266667rem;
                    display: inline-block;
                    background: blue;
                }
                span{
                    display:inline-block;
                    width: .266667rem;
                    height: .266667rem;
                    background: #ccc;
                }
                .cl1,.cl5{background: #8380FF;}
                .cl2,.cl7{background: #679DF5;}
                .cl3{background: #68BFF6;}
                .cl4{background: #F4B649;}
                .cl6{background: #478af5;}
                .cl8{background: #F4C61A;}
                .cl9{background: #F4A41A;}
                .cl10{background: #F4741A;}
              }
              dd{
                font-size: .48rem;
                color: #333333;
                line-height: .48rem;
                padding-left: .266667rem;
              }
          }
      }
      .text-bottom{
        font-size: .346667rem;
        text-align: center;
        color:#333;
        line-height: .56rem;
        padding: 0 .666667rem;
        .tag-text{
            color: #6A9DF0;
        }
      }
      p.leftss{text-align: left;}
  }
</style>

