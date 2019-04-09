<template>
    <div id="choiceRed">
    	<div class="bg"></div>
        <div class="xubox_layer">
             <div class="title">请选择
                 <div class="del reg" @click='choiceRed'><i class="el-icon-close"></i></div>
            </div>
			<div class="table">
				<div class="item fl" :class="{active: tab == 1}"><span @click.stop="tab=1">红包</span></div>
				<div class="item fr" :class="{active: tab == 2}"><span @click.stop="tab=2">加息券</span></div>
			</div>
			<!-- 红包 -->
            <div class="xubox_page" v-if="tab == 1">
                <div class="redBox">
                    <ul>
                    	<li class="red" ref='check' v-for='(item,index) in redlist'  :class="{ overdue: item.useable == 0}" @click.stop='selectionRed(index,item.useable)' >
							<div class="left">
								<span class="red-title">
									<i v-if="checkIndex == index" class="el-icon-circle-check active"></i>
									<i v-else></i>
								{{item.name}}</span>
								<span class="red-amount">{{item.limitMouthTime}}</span>
								 <span class="period">有效期至：{{item.expiredTime}}</span>
							</div>
							<div class="right">
								<span class="InvertMoney">{{item.limitInvertMoney}}</span>
								<div class="money"><i class="moneyIcon">￥</i>{{item.amount}}</div>
							</div>
                    		 
                    	</li>
						<div class="empty" v-if='redlist.length == 0'>
							<img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png" />
						</div>
                    </ul>
                </div>
				<div class="checkout">
					不使用我的红包
					<i @click.stop="cancel(0)" v-if="upDataIndex == 10000 && checkIndex == 20000" class="el-icon-circle-check active"></i>
					<i v-else @click.stop="Select(0)"></i>
				</div>
				<div class="redPacketConfirm">
                	<a class="green-btn" @click='submit(1)'>确定</a>
                </div>
				<p class="redPackerShowTxt" v-if="upDataIndex == 10000 && checkIndex == 20000">确定不使用我的红包？</p>
                <p class="redPackerShowTxt" v-else-if="checkUpRateId" >选中加息券: <span class="choiceRedPacketMoney">{{upRateApr}}</span>%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加息金额: <span class="investMoney">{{aprMoney}}</span>元</p>
				<p class="redPackerShowTxt" v-else-if="checkRedId">选中红包总额：<span class="choiceRedPacketMoney">{{checkRed}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付金额：<span class="investMoney">{{investMoney}}</span>元</p>
            </div>
			<!-- 加息券 -->
			<div class="xubox_page" v-else-if="tab == 2">
                <div class="redBox">
                    <ul>
                    	<li class="upData" ref='upCheck' v-for='(item,index) in upRateList'  :class="{ overdue: item.useable == 0}" @click.stop='selectionUp(index,item.useable)' >
							<div class="left">
								<span class="red-title">
									<i v-if="upDataIndex == index" class="el-icon-circle-check active"></i>
									<i v-else></i>
								{{item.name}}</span>
								<span class="red-amount">{{item.limitBorrowTime}}</span>
								<span class="red-amount">{{item.limitUpMoney}}</span>
								 <span class="period">有效期至：{{item.expiredTime}}</span>
							</div>
							<div class="right">
								<span class="InvertMoney">{{item.limitInvestAccount}}</span>
								<div class="money">{{item.upApr}}<i class="moneyIcon">%</i></div>
								<div class="upAprData">{{item.limitUptime}}</div>
							</div>
                    		 
                    	</li>
						<div class="empty" v-if='upRateList.length == 0'>
							<img src="https://aliyunsso.edspay.com/web/myAccount/null-state_03.png" />
						</div>
                    </ul>
                </div>
               <div class="checkout">
					不使用我的红包
					<i @click.stop="cancel(1)" v-if="upDataIndex == 10000 && checkIndex == 20000" class="el-icon-circle-check active"></i>
					<i v-else @click.stop="Select(1)"></i>
				</div>
				<div class="redPacketConfirm">
                	<a class="green-btn" @click='submit(2)'>确定</a>
                </div>
				<p class="redPackerShowTxt" v-if="upDataIndex == 10000 && checkIndex == 20000">确定不使用我的红包？</p>
                <p class="redPackerShowTxt" v-else-if="checkUpRateId" >选中加息券: <span class="choiceRedPacketMoney">{{upRateApr}}</span>%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加息金额: <span class="investMoney">{{aprMoney}}</span>元</p>
				<p class="redPackerShowTxt" v-else-if="checkRedId">选中红包总额：<span class="choiceRedPacketMoney">{{checkRed}}</span>元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付金额：<span class="investMoney">{{investMoney}}</span>元</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
	name: '',
    props:['uuid','investAccount','timeLimit','redId','addAprId','isRed'],
	data(){
      return {
		checkIndex:999,
		upDataIndex:999,
		tab:1,
      	checkRed:0,
      	investMoney:0,
      	checkRedId:'',          // 保存已选中红包id
      	investMoneys:0,         // 保存出借额
		redlist:[],             // 红包列表数组
		upRateList:[],          // 加息券列表数组
		checkUpRateId:'',       // 保存已选中加息券id
		upRateApr:0,            // 保存已选加息比例
		aprMoney:0,             // 加息金额
		redType:0,              // 类型，1现金红包，2抵扣红包
		isRedIsAll: '',
		isUpRateIsAll: '',
      }
    },
    methods:{
      choiceRed(){   // 关闭弹框按钮
	  		if(this.checkRedId != '' || this.checkUpRateId != ''){
				this.$emit('choiceRed',false);
			}else{
            	this.$emit('choiceRed',false,1);
			}
      },
	  Select(n){
		//   if(n == 1){
			  this.checkUpRateId = ''
			  this.upRateApr = 0
			  this.aprMoney = 0
			  this.upDataIndex = 10000
		//   }else{
			this.checkRed = 0
			this.investMoney = this.investMoneys
			this.checkRedId = ""
			this.checkIndex = 20000
		//   } 	
	  },
	  cancel(n){
		  this.upDataIndex = 10001;
		  this.checkIndex = 20001;
	  },
      selectionRed(index,n){    // 红包选取规则
	  	if(this.checkUpRateId != ''){
			this.$message({message: '红包与加息券不可同时使用！',type: 'warning'});
			return
		}
      	if( n == 1 ){
			if(this.investAccount < this.redlist[index].amount){
				this.$message({message: '红包不可用！',type: 'warning'});
				return
			}
			this.checkRed = 0
			this.investMoney = this.investMoneys
			this.checkRedId = ""
			this.redType = 0
			if( this.checkIndex == index){
				this.checkUpRateId == '' ? this.upDataIndex = 10000 : ''
				this.checkIndex = 20000
			}else{
				this.redlist.map((item, i) => {
					if(index == i){
						this.checkRedId = this.redlist[index].id
						this.checkRed = this.redlist[index].amount
						this.investMoney = this.investMoney - this.checkRed
						this.checkIndex = index
						this.redType = this.redlist[index].type
					}else{
					}
				})
			}	
      	} else{
			  if(this.isRedIsAll != ''){
				  this.$message({message: this.isRedIsAll,type: 'warning'});
			  }else{
				  this.$message({message: this.redlist[index].useWarn,type: 'warning'});
			  }
      	}
      },
	  selectionUp(index,n){
		  if(this.checkRedId != ''){
			  this.$message({message: '红包与加息券不可同时使用！',type: 'warning'});
			  return
		  }
		  if( n == 1 ){
			  this.checkUpRateId = ''
			  this.upRateApr = 0
			  this.aprMoney = 0
			if( this.upDataIndex == index){
				this.checkRedId == '' ? this.checkIndex = 20000 : ''
				this.upDataIndex = 10000
			}else{
				this.upRateList.map((item, i) => {
					if(index == i){
						this.checkUpRateId = this.upRateList[index].id
						this.upRateApr = this.upRateList[index].upApr
						this.upDataIndex = index
						let upTime = 0
						let upMoney = 0

						this.upRateList[index].limitUpMoneyNumb == 0 ? upMoney = this.investAccount : this.upRateList[index].limitUpMoneyNumb > this.investAccount ? upMoney = this.investAccount : upMoney = this.upRateList[index].limitUpMoneyNumb  // 加息金额

						this.upRateList[index].limitUptimeNumb == 0 ? upTime = this.timeLimit : upTime = this.upRateList[index].limitUptimeNumb    // 加息时间
						let addProfit = ((upMoney*this.upRateApr/100)/360)*upTime
						this.aprMoney = Math.floor(addProfit * 100) / 100
						
					}else{

					}
				})
			}	
      	} else{
			if(this.isUpRateIsAll != ''){
				this.$message({message: this.isUpRateIsAll,type: 'warning'});
			}else{
				this.$message({message: this.upRateList[index].useWarn,type: 'warning'});
			}
      		// this.$message({message: '亲！当前优惠券无法使用',type: 'warning'});
      	}
	  },
      initAjax(){     // 弹框打开的数据请求
	    let _this = this 
        this.investMoney=this.investAccount   // 打开弹窗初始化金额
        this.investMoneys=this.investAccount
        global.http.post(_this,'/financePlan/checkRedAndUprate',{investAccount:_this.investAccount,planId:_this.uuid,assetManageType:3},function(data){
            if (data.body.resCode == 1) {
				_this.redlist = data.body.resData.redList
				_this.upRateList = data.body.resData.upRateList
				_this.isRedIsAll = data.body.resData.isRedIsAll
				_this.isUpRateIsAll = data.body.resData.isUpRateIsAll
				if(_this.redId == 0 && _this.addAprId == 0){
					if(_this.isRed){
						_this.tab = 1
						_this.upDataIndex = 10000;
		  				_this.checkIndex = 20000;
						return
					}
					if(data.body.resData.isRedOrUpRate == 1){
						_this.tab = 1
						_this.checkIndex = 0
						_this.checkRedId = _this.redlist[0].id
						_this.checkRed = _this.redlist[0].amount
						_this.investMoney = _this.investMoney - _this.checkRed
						_this.redType = _this.redlist[0].type
					} else if(data.body.resData.isRedOrUpRate == 2){
						_this.tab = 2
						_this.checkUpRateId = _this.upRateList[0].id
						_this.upRateApr = _this.upRateList[0].upApr
						_this.upDataIndex = 0
						let upTime = 0
						let upMoney = 0

						_this.upRateList[0].limitUpMoneyNumb == 0 ? upMoney = _this.investAccount : _this.upRateList[0].limitUpMoneyNumb > _this.investAccount ? upMoney = _this.investAccount : upMoney = _this.upRateList[0].limitUpMoneyNumb  // 加息金额

						_this.upRateList[0].limitUptimeNumb == 0 ? upTime = _this.timeLimit : upTime = _this.upRateList[0].limitUptimeNumb

						let addProfit = ((upMoney*_this.upRateApr/100)/360)*upTime
						_this.aprMoney = Math.floor(addProfit * 100) / 100
					}  else{
						_this.tab = 1
					}
				}else if(_this.redId != 0){
					_this.tab = 1
					_this.redlist.map((item, index)=> {
						if(item.id == _this.redId){
							_this.checkIndex = index
							_this.checkRedId = item.id
							_this.checkRed = item.amount
							_this.redType = item.type
						}
					})
					_this.investMoney = _this.investMoney - _this.checkRed
				}else if(_this.addAprId != 0){
					_this.tab = 2
					_this.upRateList.map((item, index)=> {
						if(item.id == _this.addAprId){
							_this.upDataIndex = index
							_this.checkUpRateId = item.id
							_this.upRateApr = item.upApr
							let upTime = 0
							let upMoney = 0

							item.limitUpMoneyNumb == 0 ? upMoney = _this.investAccount : item.limitUpMoneyNumb > _this.investAccount ? upMoney = _this.investAccount : upMoney = item.limitUpMoneyNumb  // 加息金额

							item.limitUptimeNumb == 0 ? upTime = _this.timeLimit : upTime = item.limitUptimeNumb
							let addProfit = ((upMoney*_this.upRateApr/100)/360)*upTime
							_this.aprMoney = Math.floor(addProfit * 100) / 100
						}
					})
				}
				
            }else{
                _this.$message({message: data.body.resMsg,type: 'warning'});
            } 
        })
      },
      submit(){   // 确定按钮  1 红包  2 加息券
	  	if(this.checkRedId != ''){
			this.$emit('submitRed',this.checkRedId,this.checkRed, this.redType);
        	this.$emit('choiceRed',false,0);
		} else if(this.checkUpRateId != '') {
			this.$emit('submitUprate',this.checkUpRateId,this.upRateApr,this.aprMoney);
        	this.$emit('choiceRed',false,0);
		}else{
			this.$emit('choiceRed',false,1);
		}

	  },
	  sigeinfo(val1,val2){
        this.$emit('sigeinfo',val1,val2)
      },
    },
    mounted:function(){
		this.initAjax()
    }
  }  
</script>

<style lang="scss">
    #choiceRed{
    	.bg{
	        position: fixed;
	        top: 0;
	        right: 0;
	        bottom: 0;
	        left: 0;
	        margin: auto;
	        opacity: 0.6;
	        background: #000;
	        z-index: 100;
	    }
	    .xubox_layer{
	        position: fixed;
	        width: 880px;
	        height: 580px;
	        background-color: #fff;
	        top: 0;
	        left: 0;
	        right: 0;
	        bottom: 0;
	        margin: auto;
	        z-index: 200;
	        border-radius: 5px;
            .title{
                width:100%;
                height:58px;
                border-top-left-radius: 5px;
    			border-top-right-radius: 5px;
                border-bottom: 2px solid #ddd;
                background:#fff;
                font-size:18px;
                line-height:58px;
                padding-left:20px;
                text-align: center;
                color:#333;
                cursor: move;
                .del.reg{
                    width:50px;
                    height:50px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    line-height: 50px;
                    margin-right:0px;
                    cursor: pointer;
                    text-align: center;
                    color: #999;
                    i.el-icon-close {
                        transition: transform .3s;
						font-size: 14px;
                    }
                }
                .del:hover i.el-icon-close {
                    transform: rotate(90deg);
                }
            }
			.table{
				width: 100%;
				height: 44px;
				.item{
					width: 50%;
					height: 100%;
					text-align: center;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #666666;
					span{
						height: 44px;
						line-height: 44px;
						cursor: pointer;
						padding: 0 30px;
						display: inline-block;
					}
				}
				.item.active{
					color: #FF3E41;
					span{
						border-bottom: 2px solid #FF3E41;
					}
				}
			}
            .xubox_page{
                width:800px;
                height:543px;
                box-sizing: border-box;
				margin: 0 auto;
                overflow: hidden;
                .redBox{
                    width:810px;
                	height:343px;
                	overflow: hidden;
                    overflow-y: auto;
                    box-sizing: border-box;
					background: #F8F8F8;
					border: 1px solid #ECECEC;
					padding: 10px;
					margin-bottom: 20px;
                    ul{
                      width: 800px;
                      height: auto;
                      overflow: hidden;
					  .empty{
						  width:100px;
						  height:126px;
						  margin: auto;
						  margin-top: 90px;
					  }
                      li{
                       width: 380px;
                       height: 123px;
                       background:url(https://aliyunsso.edspay.com/web/invest/red.png) top center no-repeat;
                       background-size: 380px 123px;
                       float:left;
					   margin-right: 20px;
					   margin-bottom: 20px;
					   cursor: pointer;
					   .left{
						   font-family: PingFangSC-Regular;
						   width: 260px;
						   height: 100%;
						   float: left;
						   padding: 10px 0 0 10px;
						   .red-title{
							   width: 100%;
							   height: 28px;
							   line-height: 28px;
							   color: #333;
							   font-size: 16px;
							   vertical-align: top;
							   display: block;
								i{
									width: 28px;
									height: 28px;
									background: #fff;
									border: 1px solid #d7d7d7;
									border-radius: 14px;	
									display: inline-block;	
									margin-right: 5px;
									vertical-align: top;			
								}
								i.active{
									font-size: 28px;
									color: #42D32F;	
									display: inline-block;
								}
						   }
						   .red-amount{
							   width: 100%;
							   height: 34px;
							   line-height: 34px;
							   padding-left: 6px;
							   font-size: 14px;
							   color: #808080;
							   margin-bottom: 15px;
							   display: block;
						   }
						   .period{
							   width: 100%;
							   height: 32px;
							   line-height: 32px;
							   padding-left: 6px;
							   font-size: 12px;
							   color: #808080;
							   display: block;
						   }
					   }
					   .right{
						    width: 120px;
							height: 123px;
							font-family: PingFangSC-Regular;
							float: left;
							padding: 18px 0;
							.InvertMoney{
								width: 100%;
								display: block;
								font-size: 14px;
								color: #FFFFFF;
								text-align: center;
								margin-bottom: 10px;
							}
							.money{
								font-family: PingFangSC-Medium;
								width: 100%;
								font-weight: 500;
								font-size: 38px;
								text-align: center;
								color: #fff;
								i{
									font-size: 16px;
								}
							}
					   }
                       .money{
                        width: 100%;
                        font-weight: 500;
                        font-size: 30px;
                        text-align: center;
                        color: #eac797;
                        i.moneyIcon{
                         font-size: 18px;
								}
							}
							p{
								width: 100%;
								font-size: 12px;
								height: 19px;
								line-height: 19px;
								font-weight: 500;
								text-align: center;
							}
							p.amount{
								color: #fee771;
								margin-top: 20px;
							}
							p.subject{
								color: #333333;
								margin-top: 15px;

							}
							p{
								color: #999;
							}
						}
						li.upData{
							.red-title{
								margin-bottom: 4px;
							}
							.red-amount{
								height: 20px;
								line-height: 20px;
								margin-bottom: 3px;
							}
							.InvertMoney{
								margin-bottom: 0px;
							}
							.right{
								text-align: center;
							}
							.upAprData{
								width: auto;
								height: 20px;
								border-radius: 10px;
								border: 1px solid #fff;
								font-size: 12px;
								color: #fff;
								line-height: 20px;
								text-align: center;
								display: inline-block;
								padding: 0 3px;
							}
						}
						li:nth-child(2n){
							margin-right: 0;
						}
						li.overdue{
							background:url(https://aliyunsso.edspay.com/web/invest/over.png) top center no-repeat;
							background-size: 380px 123px;
							cursor: default;
							.money{
								color: #999999;
							}
							p.amount{
								color: #e3e3e3;
							}
                    	}
                    	li.check{
							background:url(https://aliyunsso.edspay.com/web/invest/voucher/redCheck.png) top center no-repeat;
							background-size: 120px 116px;
							.money{
								color: #8E7859;
							}
							p.amount{
								color: #998D3C;
							}
                    	}
                    }
	            }
				.checkout{
					width: 780px;
					height: 45px;
					border: 1px solid #d0d0d0;
					padding: 0 10px;
					line-height: 45px;
					margin: 0 auto;
					font-family: PingFangSC-Regular;
					font-size: 16px;
					color: #666666;
					margin-bottom: 9px;
					i{
						float: right;
						width: 28px;
						height: 28px;
						background: #fff;
						border: 1px solid #d7d7d7;
						border-radius: 14px;	
						display: block;	
						margin-top: 7px;
						cursor: pointer;			
					}
					i.active{
						font-size: 28px;
						color: #42D32F;	
						display: block;	
						margin-top: 7px;
					}
				}
	            p.redPackerShowTxt {
					font-family: PingFangSC-Regular;
				    height: 40px;
				    line-height: 40px;
				    font-size: 16px;
					color: 333;
					float: right;
				}
				.redPacketConfirm{
					text-align: center;
					a{
						width: 78px;
					    height: 40px;
					    float: right;
					    border-radius: 4px;
					    text-align: center;
					    font-size: 16px;
					    color: #fff;
					    background: #FF3E41;
					    border: none;
					    line-height: 40px;
						margin-left: 33px;
						cursor: pointer;
					}
				}
	        }
	    }
    }
</style>