<template>
		<div class="li" :class="{'out-li':typeNum!=1&&item.progress==100}" @click="gotoDetail(item)">
			<div class="listTitle" :class="{outOver:item.progress==100}">
				<!-- 标题名 -->
				{{item.name}}
				<!-- 新手专享图标 -->
				<span v-if="showNew" class="ic_4 ic">新手专享</span>
				<!-- 智能推荐图标 -->
				<span v-if="showAi"  class="ic_3 ic" >智能推荐</span>
				<!-- 智能推荐弹窗 已登录且完成风险评估时显示 (暂时注释)-->
				<!-- <div class="pop" v-if="risk == 99">
					<span class="sig" alt="" @click="showPop=true"></span>
					<div class="pop-div" v-if="showPop" @click="showPop=false">
						<div class="pop-text">该债权标的由风险评测数据，智能为您推荐</div>
						<div class="pop-arrow"></div>
					</div>
				</div> -->
				<!-- 加息图标 -->
				<div class="icons" :class="{icons2:typeNum == 1}" v-if="item.assetManageType == 2 || item.newbieOnly || item.addApr || item.assetManageType == 3">
					<i class="ic_2 ic" :class="{ic_3_off:item.progress==100}" v-if="item.addApr && !showAi & !showNew && typeNum != 1">平台加息</i>
					 <!-- v-if="item.addApr && !showAi & !showNew" -->
					<i class="ic_22 ic" :class="{ic_3_off:item.progress==100}" v-else-if="item.addApr && typeNum == 1">平台加息</i>
					<!-- item.addApr && !showAi & !showNew &&  -->
				</div>
				<!-- VIP加息 -->
				<span class="ic_5 ic" v-if="typeNum == 1 && item.vipLevel>=1 && item.vipUprateApr">v{{item.vipLevel}}加息</span>
				<!-- <span class="ic_55 ic" :class="{ic_55_off:item.progress==100}" v-else-if="item.vipLevel>=2 && item.vipUprateApr && typeNum != 1">v{{item.vipLevel}}加息</span> -->
				<div class="icons icons52" v-else-if="item.vipLevel>=1 && item.vipUprateApr && typeNum != 1">
					<i class="ic_55 ic" :class="{ic_55_off:item.progress==100}">v{{item.vipLevel}}加息</i>
				</div>
				<span class="ic_8 ic" v-if="item.redUseNum && item.progress != 100">{{item.redUseNum}}张可用</span>
			</div>
			<div class="listInfo">
				<!-- 收益率 -->
				<div class="wraApr conter">
					<div class="wraPercent" :class="{outOver:item.progress==100}">
						<span :class="{outOver:item.progress==100}">{{item.apr?item.apr: 0 | returnFloat(1)}}</span>%
						<!-- <i v-if="item.addApr">+{{item.addApr?item.addApr: 0 | returnFloat(1)}}%</i> -->
						<i v-if="item.addApr && item.vipUprateApr">+{{(item.vipUprateApr + item.addApr) | returnFloat(1)}}%</i>
						<i v-else-if="item.addApr">+{{item.addApr | returnFloat(1)}}%</i>
						<i v-else-if="item.vipUprateApr">+{{item.vipUprateApr | returnFloat(1)}}%</i>
					</div>
					<div class="text" :class="{outText:item.progress==100}">参考年化</div>
				</div>
				<!-- 项目期限 -->
				<div class="condition conter">
					<div class="low" v-if="typeNum == 1">
						<p :class="{outText:item.progress==100}"><span :class="{outOver:item.progress==100}">{{item.remainAmount ? item.remainAmount:0 | moneyWan}}</span>元</p>
						<p :class="{outText:item.progress==100}">剩余金额</p>
					</div>
					<div class="low" v-else>
						<!-- <p :class="{outText:item.progress==100}"><span :class="{outOver:item.progress==100}">{{item.timeLimit}}</span>{{item.timeLimitTip}}</p>
						<p :class="{outText:item.progress==100}">项目期限</p> -->
						<p :class="{outText:item.progress==100}"><span :class="{outOver:item.progress==100}">{{item.remainAmount ? item.remainAmount:0 | moneyWan}}</span>元</p>
						<p :class="{outText:item.progress==100}">剩余金额</p>
					</div>
				</div>
				<!-- 出借按钮 -->


				
				<div @click.stop="goDetail(item)" class="invest-btn updateBtn" v-if="item.progress!=100">授权出借</div>
				<div @click.stop="goDetail(item)" class="invest-btn updateBtn invest_btn_over" v-else-if="item.progress == 100 && typeNum==1">授权出借</div>
			</div>
		</div>
</template>
<script>
export default {
    data () {
        return {
            showPop: false, // 是否显示pop智能提示
            borrowDetail:{},
            loginStr:0,
            progressLineNum:null,
			evaluationText1:null,
			evaluationText2:null,

        }
    },
    props: {
        item: Object, // 出借对象
        showNew: Boolean, // 是否显示新手专享图标
        showAi:Boolean, // 是否显示智能推荐图标
        showVip:Boolean, // 是否显示vip加息
        risk: Number, // 是否通过风险评测并且显示图片
        typeNum:Number,//满标是否显示按钮
		linkNum:Number,//跳转增加，埋点判断
		cnzzFun:Function,
		userStatusInfo:Number,//是否直接跳转投资页
    },
    methods: {
		// 去出借
        goDetail(item){
        	console.log(item)
        	if(this.userStatusInfo){
	            this.$router.push({path:'/wxInvestIn/wxInvestMoneyPoint',query:{uuid:item.uuid}})
        	}else{
	            if (item.assetManageType == 3 ) {
	            	if(this.linkNum == 1){
	            		this.cnzzFun()
	            	}
	            	this.$router.push({path: '/wxDetailPoint',query: { uuid: item.uuid}})
	            } else {
	                this.$router.push({path: '/wxDetail',query: { uuid: item.uuid}})
	            }
        		
        	}
        },
        gotoDetail(item){
        	if (item.assetManageType == 3 ) {
            	if(this.linkNum == 1){
            		this.cnzzFun()
            	}
            	this.$router.push({path: '/wxDetailPoint',query: { uuid: item.uuid}})
            } else {
                this.$router.push({path: '/wxDetail',query: { uuid: item.uuid}})
            }
        }
    },
    created(){
    	// this.getData();
    },
    mounted() {
		
    }
}
</script>
<style lang="scss" scoped>
    // 售罄li样式
	.out-li {
		background: url('https://aliyunsso.edspay.com/web/wxUpdate/shouqing.png') no-repeat white right bottom !important;
		background-size: 2.1rem 2.1rem !important;
	}
    .outOver{
		color: #c5c5c5 !important;
	}
	.outText {
		color: #d0d0d0 !important;
	}
	.icons2{
		margin-top: 0rem !important;
		background: #5CA9F1;
	}
    .icons{
        margin-left: .133333rem;
        // margin-top: 0.06rem;
        margin-top: .09rem;
        height: .45rem;
        line-height: .45rem;
        span{
            padding: 0rem 0.133333rem;
            font-size:0.293333rem;
        }
        .ic_2{
            background: rgba(92,169,241,0.20);
            border: 1px solid #5CA9F1;
            font-size: 0.293333rem;
            padding: 0rem 0.133333rem;
            color: #5CA9F1;
        }
        .ic_22{
            background: #5CA9F1;
            // font-size: .293333rem;
            padding: 0rem 0.133333rem;
            // color: #ffffff;
        }
        .ic_3_off{
            background: rgba(197,197,197,0.20);;
            border: .013333rem solid #c5c5c5;
            color: #c5c5c5;
        }
    }

    .ic {
        // width: 1.6rem;
		padding: 0 .026667rem;
        height: .45rem;
        line-height: .45rem;
        font-size: .293333rem;
        color: white;
        text-align: center;
    }
    .ic_3 {
        background: #50B5EE;
        border: .013333rem solid #50B5EE;
        position: relative;
        top:0;
    }
     .ic_5 {
        background: #D3BA81;
        width: 1.226667rem;
        height: 0.45rem;
        line-height: .45rem;
    }
    .icons52{
		margin-top: 0rem;
    }
    .ic_55 {
    	width: 1.3rem;
        background: rgba(211,186,129,0.20);
        border: 1px solid #D3BA81;
        font-size: .293333rem;
        padding: 0rem 0.133333rem;
        color: #D3BA81;
        margin-top: 0rem;
    }
    .ic_8{
    	border: .013333rem solid #ff5b4c;
    	color: #ff5b4c;
    }
    .ic_55_off{
        background: rgba(197,197,197,0.20);;
        border: .013333rem solid #c5c5c5;
        color: #c5c5c5;
    }
    .ic_4{
        background: #7ED321;
        border: .013333rem solid #7ED321;
    }
    	/*智能弹窗*/
	.pop {
		position: relative;
        .sig {
            background: url(https://aliyunsso.edspay.com/web/wxUpdate/sig_.png) no-repeat;
            background-size:cover;
            width: .4rem;
            height: .4rem;
        }
		.pop-div {
			.pop-arrow {
				position: absolute;
				top: -.133333rem;
				left: .336667rem;
				background: url('https://aliyunsso.edspay.com/web/wxUpdate/sanjiao.png') no-repeat;
				width: .186667rem;
				height: .133333rem;
				background-size: contain;
			}
			.pop-text {
				background: #000000;
				color: white;
				text-align: center;
				border-radius: 12px;
				font-size: .32rem;
				line-height:.666667rem;
				position: absolute;
				top: -.78333rem;
				left: -3.336667rem;
				width: 6.8rem;
				height: .666667rem;
				filter:alpha(opacity=70);
				opacity:0.7;
				 -moz-opacity:0.7;
				-khtml-opacity:0.7;
			}
		}
	}
	.text{
		font-size: .32rem;
		margin-top: .113333rem;
		color: #808080;
	}
    .invest-btn{
        background-image: linear-gradient(-45deg, #FF6554 0%, #FF3F38 100%);
        color: white;
    }
    .invest_btn_over{
    	background: #e4e4e4;
    }
    .updateBtn {
        border-radius: .106667rem;
        width: 2.133333rem;
        height: .8rem;
        font-size: .373333rem;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center
    }
		.li:last-child{
			border: 0;
		}
		.li{
			box-sizing: border-box;
			height: 3.706667rem;
			padding:  .533333rem .533333rem 0rem .533333rem;
			font-size: 0.293333rem;
			color: #808080;
			position: relative;
			background: white;
			margin-top: .266667rem;
			font-family: DIN-Medium;
			.listTitle{
				font-size: .373333rem;
				height: .533333rem;
				display: flex;
				flex-direction: row;
                align-items: center;
				color: #333;
			    span{
                    display: block;
			    	margin-left: .133333rem;
				}
			}
			.listInfo{
				height: 1.333333rem;
				margin-top: .64rem;
				display: flex;
				flex-direction: row;
				align-items: flex-end;
			}
			.condition{
				    width: 2.6rem;
					padding-top: 0.07rem;
					margin: .14rem 0.5rem 0rem .5rem;
				.wraTime{
					line-height: 0.666667rem;
					color:#808080;
					font-size: 0.35rem;
					span{
						font-size:0.48rem;
						color:#333;
					}
				}
				.low span{
					color: #333;
					font-size: 0.48rem;
				}
				.low p{
					color: #808080;
					font-size: .32rem;
				}
				.low p:nth-of-type(2) {
					margin-top: .133333rem;
				}
			}

			.yuanhuan{
				width:1.36rem;
				height:1.36rem;
				position:relative;
				top:-0.266667rem;
			}
			.over{
				background: url(https://aliyunsso.edspay.com/web/wx/loop.png);
				background-size:100% 100%;
				text-align:center;
				line-height:1.46rem
			}
			.wraApr {
				width: 3.066667rem;
			}
			.wraApr .wraPercent{
                    font-family: DIN-Medium;
				    font-size: .373333rem;
    				color: #ff5b4c;
				span{
					font-size: .8rem;
				}
			}
			.wraApr .sellOut{
				color:#cccccc;
			}
			.low p .sellOut{
				color:#cccccc;
			}
		}
</style>

