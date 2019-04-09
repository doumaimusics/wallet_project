<template>
    <div id="moneyData">
		<div class="riskData">
			<div class="title">
				<div class="num_box">
                        <img src="https://aliyunsso.edspay.com/web/about/pcPageRevision/num_03.png" alt="">
                    </div>
                    <span>风险数据</span>
			</div>
			<ul class="clear">
				<li>
					<div class="top top1">待还金额</div>
					<div class="num">
						<em v-if="paidData[0]"><i>{{paidData[0]}}</i>亿</em>
						<em v-if="paidData[1]"><i>{{paidData[1]}}</i>万</em>
						<em v-if="paidData[2]"><i>{{paidData[2]}}</i>元</em>
					</div>
				</li>
				<li>
					<div class="top">关联关系借款金额</div>
					<div class="num">
						<!-- <i>25</i>亿<i>3652</i>万<i>2541</i>元 -->
						<i>0</i>元
					</div>
				</li>
				<li>
					<div class="top">出借项目逾期率</div>
					<div class="num">
						<!-- <i>25</i>亿<i>3652</i>万<i>2541</i>元 -->
						<i>0</i>%
					</div>
				</li>
				<li>
					<div class="top">累计逾期代偿金额</div>
					<div class="num">
						<!-- <i>25</i>亿<i>3652</i>万<i>2541</i>元 -->
						<i>0</i>元
					</div>
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
    			paidData:[]
    		}
    	},
    	methods:{
    		getNum(money,moneyArr){
    		    moneyArr.push(parseInt(money/100000000))
    		    moneyArr.push(parseInt((money%100000000)/10000))
    		    moneyArr.push(parseInt((money%10000)))
    		    console.log(moneyArr)
    		},
    		getData(){
    		    this.notLogPost('/borrow/query/getWaitToRepay',(data) =>{
    		        if(data.resCode){
    		            console.log(data.resData.data.waitToRepay)
    		            this.getNum(data.resData.data.waitToRepay,this.paidData);
    		        }
    		    },{})
    		}
    	},
    	created(){
    		this.getData();
    	}
    }
</script>

<style lang="scss" scoped>
    #moneyData{
    	.assetData{
    		height: 472px;
    	}
    	.riskData{
			.title{
				width: 100%;
				font-family: PingFangSC;
				line-height: 34px;
				font-size: 18px;
				text-align: left;
				color: #333333;
				margin-bottom: 55px;
				margin-top: 30px;
				span{
				padding-left: 8px;
				font-weight: 700;
				}
				.num_box{   //改版后
					width: 87px;
					height: 54px;
					margin-bottom: 5px;
					img{
						width: 100%;
						height: 100%;
						margin: 0;
					}
				}
			}
			ul{
				padding:0 50px 0 38px;
				li{
					float: left;
					margin:0 22px 50px ;
					width:333px;
					height:70px;
					background:#F7F8F7;
					text-align:center;
					.top{
						width:120px;
						height:30px;
						background:#4CB1FF;
						border-radius: 3px;
						line-height:30px;
						font-size:14px;
						margin:0 auto;
						position: relative;
						top:-5px;
						color:#fff;
					}
					.top1{width:90px;}
					.num{
						color:#222500;
						font-size:12px;
						line-height:24px;
						i{
							font-size:17px;
							color:#333;
						}
					}
				}
				li:nth-of-type(even){
					margin-right:0;
				}
			}
    	}
    }
</style>