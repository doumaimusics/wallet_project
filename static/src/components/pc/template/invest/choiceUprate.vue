<template>
    <div id="choiceRed">
    	<div class="bg"></div>
        <div class="xubox_layer">
             <div class="title">请选择
                 <div class="del reg" @click='choiceUprate'><i class="el-icon-close"></i></div>
            </div>
			<!-- 加息券 -->
			<div class="xubox_page">
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
					<i @click.stop="upDataIndex = 10001;" v-if="upDataIndex == 10000" class="el-icon-circle-check active"></i>
					<i v-else @click.stop="checklist"></i>
				</div>
				<div class="redPacketConfirm">
                	<a class="green-btn" @click='submit'>确定</a>
                </div>
				<p class="redPackerShowTxt" v-if="upDataIndex == 10000">不使用会员加息券</p>
                <p class="redPackerShowTxt" v-else >选中加息券: <span class="choiceRedPacketMoney">{{upRateApr}}</span>%&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;加息金额: <span class="investMoney">{{aprMoney}}</span>元</p>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
	name: '',
    props:['uuid','investAccount','timeLimit','VipaddAprId','vipIsApr'],
	data(){
      return {
		upDataIndex:999,
      	investMoney:0,
		upRateList:[],          // 加息券列表数组
		checkUpRateId:'',       // 保存已选中加息券id
		upRateApr:0,            // 保存已选加息比例
		aprMoney:0,             // 加息金额
		isUpRateIsAll: '',   // 加息不可选的提示
        limitUpMoneyNumb:0, // 所选加息限额。
      }
    },
    methods:{
        checklist(){
            this.checkUpRateId = '';
            this.upRateApr = 0;
            this.aprMoney = 0;
            this.upDataIndex = 10000;
            this.limitUpMoneyNumb = 0;
        },
        choiceUprate(){   // 关闭弹框按钮
                if(this.checkUpRateId != ''){
                    this.$emit('choiceUprate',false);
                }else{
                    this.$emit('choiceUprate',false,1);
                }
        },
      
        selectionUp(index,n){
            if( n == 1 ){
                this.checkUpRateId = ''
                this.upRateApr = 0
                this.aprMoney = 0
                if( this.upDataIndex == index){
                    this.upDataIndex = 10000
                }else{
                    this.upRateList.map((item, i) => {
                        if(index == i){
                            this.checkUpRateId = this.upRateList[index].id;
                            this.upRateApr = this.upRateList[index].upApr;
                            this.upDataIndex = index;
                            this.limitUpMoneyNumb = this.upRateList[index].limitUpMoneyNumb;
                            let upTime = 0;
                            let upMoney = 0;

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
            }
        },
      
        initAjax(){     // 弹框打开的数据请求
            let _this = this 
            this.investMoney=this.investAccount   // 打开弹窗初始化金额
            global.http.post(_this, '/vip/getUpRateList',{investAccount:_this.investAccount,planId:_this.uuid,assetManageType:3},function(data){
                if (data.body.resCode == 1) {
                    _this.upRateList = data.body.resData.upRateList
                    _this.isUpRateIsAll = data.body.resData.isUpRateIsAll
                    if(_this.VipaddAprId == 0){   // 首次进入未选取加息的
                        if(_this.vipIsApr){   // 用户选择不使用
                            _this.upDataIndex = 10000;
                            return
                        }
                        _this.checkUpRateId = ''
                        _this.upRateApr = _this.limitUpMoneyNumb = _this.aprMoney = 0;
                        _this.upDataIndex = 999;
                       

                        // if(_this.upRateList[0].useable == 1){
                        //     _this.checkUpRateId = _this.upRateList[0].id
                        //     _this.upRateApr = _this.upRateList[0].upApr
                        //     _this.limitUpMoneyNumb = _this.upRateList[0].limitUpMoneyNumb;
                        //     _this.upDataIndex = 0
                        //     let upTime = 0
                        //     let upMoney = 0

                        //     _this.upRateList[0].limitUpMoneyNumb == 0 ? upMoney = _this.investAccount : _this.upRateList[0].limitUpMoneyNumb > _this.investAccount ? upMoney = _this.investAccount : upMoney = _this.upRateList[0].limitUpMoneyNumb  // 加息金额

                        //     _this.upRateList[0].limitUptimeNumb == 0 ? upTime = _this.timeLimit : upTime = _this.upRateList[0].limitUptimeNumb

                        //     let addProfit = ((upMoney*_this.upRateApr/100)/360)*upTime
                        //     _this.aprMoney = Math.floor(addProfit * 100) / 100
                        // }					
                    }else if(_this.VipaddAprId != 0){   // 上次有选择加息的
                        _this.upRateList.map((item, index)=> {
                            if(item.id == _this.VipaddAprId){
                                _this.upDataIndex = index
                                _this.checkUpRateId = item.id
                                _this.upRateApr = item.upApr
                                _this.limitUpMoneyNumb = item.limitUpMoneyNumb;
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
            if(this.checkUpRateId != '') {
                this.$emit('VipSubmitUprate',this.checkUpRateId,this.upRateApr,this.aprMoney,this.limitUpMoneyNumb);
                this.$emit('choiceUprate',false,0);
            }else{
                this.$emit('choiceUprate',false,1);
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