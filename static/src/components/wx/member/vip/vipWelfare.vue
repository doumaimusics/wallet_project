<template>
    <div id="welfare">
        <div v-title>会员福利</div>
    	<ul ref="titleList" class="titleList bdr-b">
    		<li @click="actList(0)" :class="{activeLi:activeLi[0]}">未领取<span></span></li>
    		<li @click="actList(1)" :class="{activeLi:activeLi[1]}">已领取<span></span></li>
    		<li @click="actList(2)" :class="{activeLi:activeLi[2]}">已失效<span></span></li>
    	</ul>
    	<div ref="content" class="content">
    		<div :class="{toList2:activeLi[1],toList3:activeLi[2]}" class="contentBox">
	    		<div v-for="(i,index) in 3" class="welfareList fl">
	    			<ul v-if="listData['list' + index].length != 0">
	    				<li v-for="(item,ind) in listData['list' + index]">
                            <img v-if="index == 1" src="https://aliyunsso.edspay.com/web/v5.1.0/received.png" alt="" class="imgLogo">
                            <img v-if="index == 2" src="https://aliyunsso.edspay.com/web/v5.1.0/brace.png" alt="" class="imgLogo">
	    					<div class="top">
                                <img v-if="index == 0" src="https://aliyunsso.edspay.com/web/v5.1.0/welfareRed.png" alt="" class="fl">
	    						<img v-else src="https://aliyunsso.edspay.com/web/v5.1.0/welfareGray.png" alt="" class="fl">
	    						<div v-if="item.vipWealDetails" class="detail fl">
	    							<div class="upName">{{item.ruleName}}</div>
	    							<div class="money">{{item.vipWealDetails}}</div>
	    						</div>
                                <div v-else class="name fl">{{item.ruleName}}</div>

	    						<div v-if="index == 0" @click="getGiftTip(item,ind)" class="red btn fr">立即领取</div>
	    						<div v-else class="btn fr">{{index == 1 ? '已领取':'已失效'}}</div>
	    					</div>
                            <div v-if="index == 2" class="time">{{typeTime[index]}}：{{item.invalidTime }}</div>
	    					<div v-else class="time">{{typeTime[index]}}：{{index == 0 ? item.deadTime:item.getTime }}</div>
	    				</li>
	    			</ul>
	    			<div v-else-if="hasGetList[index]" class="null">
	    				<img src="https://aliyunsso.edspay.com/web/v5.1.0/welfareNull.png" alt="">
	    				<p>暂无数据</p>
	    			</div>
	    		</div>
    			
    		</div>
    	</div>
        <div v-if="showTips" v-layer class="giftTip">
            <div class="imgBox">
                <div class="btns clear">
                    <div @click="showTips = false;" class="btn fl"></div>
                    <div @click="getGift(activeItem,activeIndex)" class="btn fl"></div>
                </div>
            </div>
        </div>
        <div v-if="showGift" v-layer class="myGift">
            <div class="giftList">
                <div @click="showGift = false;myGift = [];" class="close"></div>
                <ul>
                    <li v-for="item in myGift">
                        <div class="leftText fl">
                            <div v-if="item.type == 1" class="money">
                                <div class="tip1">可兑换现金</div>
                                <div class="tip2">任意金额可用</div>
                            </div>
                            <div v-else class="red">{{item.limitInvertMoney}}</div>
                        </div>
                        <div class="rightText fl">
                            <div class="num"><span>{{item.amount}}</span>{{item.type == 3 ? '%':'元'}}</div>
                            <div class="type">{{typeName[item.type]}}</div>
                        </div>
                    </li>
                </ul>
                <router-link to="/wxMyAccount/wxRedPacket?bankOpenStatus=3&sinaBankCardCount=2" class="bottom" tag="div"></router-link>
            </div>
        </div>
    </div>
</template>

<script>
	import wxToapp from '../../../../common/wx/wxToapp'
    export default{
    	mixins:[wxToapp],
    	data(){
    		return{
    			activeLi:[1,0,0],
    			hasGetList:[0,0,0,],
    			listData:{
    				list0:[],
    				list1:[],
    				list2:[]
    			},
                activeItem:{},//当前选择的福利
                activeIndex:0,
                showTips:false,
                showGift:false,
                myGift:[],
                typeName:['','现金红包','抵扣红包','加息券'],
                typeTime:['领取截至','领取时间','失效时间']
    		}
    	},
    	methods:{
            getGiftTip(item, index){
                this.showTips = true;
                this.activeItem = item;
                this.activeIndex = index;
            },
    		actList(index){//切换
    			for(var i=0;i<3;i++){
    				this.$set(this.activeLi,i,0);
    			}
    			if(!this.hasGetList[index]){
    				this.getList(index);
    				this.hasGetList[index] = 1;
    			}
    			this.$set(this.activeLi,index,1);
    		},
    		getList(index){//获取福利列表
    			this.getAppData('/vip/gift/giftList',(data)=>{
    				if(data.resCode == 1){
    					this.listData['list' + index] = data.resData.giftList;
    				}
    			},{status: index == 2 ? -1:index})
    		},
            getGift(item,index){//领取福利
                this.getAppData('/vip/gift/getGift',(data)=>{
                    if(data.resCode){
                        this.listData.list0.splice(index,1);
                        this.myGift = data.resData.pageInfo;
                        this.showTips = false;
                        this.showGift = true;
                        this.hasGetList[1] = 0;
                    }
                },{id:item.id})
            }
    	},
    	created(){
    		this.actList(0);
    	},
    	mounted(){
    		this.$refs.content.style.height = this._fullHeight - this.$refs.titleList.offsetHeight + 'px';
    	}
    }
</script>

<style lang="scss" scoped>
    #welfare{
    	.titleList{
    		position: relative;
    		height: 1.066667rem;
    		li{
    			width: 33.3%;
    			height: 1.066667rem;
    			color: #7A8898;
    			float: left;
    			font-size: 0.453333rem;
    			line-height: 1.053333rem;
    			text-align: center;
    			position: relative;
    		}
    		.activeLi{
    			color: #4C7DE9;
    			span{
    				position: absolute;
    				height: 0.053333rem;
    				width: 0.666667rem;
    				background: #4C7DE9;
					border-radius: 2px;
					bottom: 0;
					left: 50%;
					margin-left: -0.333333rem;
    			}
    		}
    	}
    	.content{
    		width: 100%;
    		overflow: hidden;
    		position: relative;
    		.contentBox{
    			width: 30.5rem;
    			height: 100%;
    			position: absolute;
    			top:0;
    			left: 0;
    			transition: all 0.8s ease;
    			.welfareList{
    				width: 10rem;
                    min-height: 0.266667rem;
    				ul{
    					padding-top: 0.426667rem;
    					overflow-y: auto;
    					li{
    						height: 3.0rem;
    						width: 9.2rem;
    						margin: 0 auto;
    						background: url('https://aliyunsso.edspay.com/web/v5.1.0/vipWelfareBg.png') no-repeat;
    						background-size: 100% 100%;
    						margin-bottom: 0.266667rem;
                            position: relative;
                            .imgLogo{
                                height: 2.346667rem;
                                width: 2.346667rem;
                                position: absolute;
                                top: 0.266667rem;
                                left: 4.613333rem;
                            }
    						.top{
    							padding: 0.373333rem 0 0 0.373333rem;
    							height: 2.066667rem;
    							img{
    								height: 1.12rem;
    								width: 1.12rem;
    								margin-right: 0.266667rem;
    							}
    							.name{
    								line-height:1.12rem;
    								font-family: PingFangSC-Regular;
    								font-size: 0.4rem;
    								color: #333;
    							}
    							.detail{
    								.upName{
    									font-size: 0.4rem;
    									line-height: 0.506667rem;
                                        height: 0.506667rem;
										color: #333;
    								}
    								.money{
    									padding-top: 0.16rem;
    									font-family: PingFangSC-Regular;
    									font-size: 0.32rem;
    									color: #808080;
    								}
    							}
    							.btn{
    								height: 0.693333rem;
    								width: 2.08rem;
    								background: #D0D0D0;
    								border-radius: 0.346667rem;
    								font-size: 0.32rem;
    								color: #FFFFFF;
    								line-height: 0.693rem;
    								text-align: center;
    								margin-right: 0.533333rem;
    							}
    							.red{
    								background: #FF5B4C;
    							}
    						}
    						.time{
    							font-family: PingFangSC-Regular;
    							font-size: 0.266667rem;
    							color: #808080;
    							padding: 0.24rem 0 0 0.373333rem;
    						}
    					}
    				}
    				.null{
    					padding-top: 3.4rem;
						img{
							height: 3.266667rem;
							width: 4.733333rem;
							display: block;
							margin: 0 auto;
						}
						p{
							padding-top: 0.266667rem;
							text-align: center;
							font-family: PingFangSC-Regular;
							font-size: 0.346667rem;
							line-height: 0.373333rem;
							color: #808080;
						}
    				}
    			}
    		}
    		.toList2{
    			transition: all 0.6s ease;
				left: -10rem;
    		}
    		.toList3{
    			transition: all 0.6s ease;
				left: -20rem;
    		}
    	}
        .giftTip{
            .imgBox{
                height: 9.04rem;
                width: 7.493333rem;
                background: url('https://aliyunsso.edspay.com/web/v5.1.0/getGiftTip.png') no-repeat;
                background-size: 100%;
                margin: 2.666667rem auto 0;
                .btns{
                    padding-top: 6.8rem;
                    .btn{
                        height:1.066667rem;
                        width: 50%;
                        height: 1.066667rem;
                    }
                }
            }
        }
        .myGift{
            .giftList{
                position: relative;
                margin: 4.0rem auto 0;
                height: 9.173333rem;
                width: 7.2rem;
                border-radius: 0.16rem;
                background: #FBE7C7 url('https://aliyunsso.edspay.com/web/v5.1.0/myGiftBG.png') no-repeat;
                background-size: 100%;
                padding-top: 1.893333rem;
                .close{
                    height: 0.8rem;
                    width: 0.8rem;
                    background: url('https://aliyunsso.edspay.com/web/wx/vip/close.png') no-repeat;
                    background-size: 100% 100%;
                    position: absolute;
                    top: -1.066667rem;
                    right: -0.266667rem;
                }
                ul{
                    width: 6.426667rem;
                    height: 5.386667rem;
                    margin: 0 auto;
                    overflow-y: auto;
                    li{
                        height: 1.666667rem;
                        width: 6.426667rem;
                        margin-bottom: 0.4rem;
                        background: url(https://aliyunsso.edspay.com/web/v5.1.0/giftRedBg.png) no-repeat;
                        background-size: 100% 100%;
                        .leftText{
                            width: 4.0rem;
                            padding-left: 0.4rem;
                            font-family: PingFangSC-Regular;
                            font-size: 0.373333rem;
                            color: #898989;
                            .money{
                                .tip1{
                                    padding-top: 0.346667rem;
                                    line-height: 0.533333rem;
                                    font-family: PingFangSC-Medium;
                                    color: #333333;
                                }
                                .tip2{
                                    font-family: PingFangSC-Regular;
                                    font-size: 0.346667rem;
                                    color: #808080;
                                }
                            }
                            .red{
                                line-height: 1.666667rem;
                                span{
                                    color: #FF5D5F;
                                }
                            }
                        }
                        .rightText{
                            width:  2.413333rem;
                            text-align: center;
                            color: #fff;
                            .num{
                                font-size: 0.4rem;
                                span{
                                    line-height: 1rem;
                                    font-size: 0.8rem;
                                }
                            }
                            .type{
                                line-height:0.51rem;
                                font-size: 0.32rem;
                            }
                        }
                    }
                }
                .bottom{
                    height: 1.906667rem;
                    background: url('https://aliyunsso.edspay.com/web/v5.1.0/myGiftBottom.png') no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>