<template>
    <div id="risk">
        <div class="title"><i></i>风险数据<i></i></div>
        <ul>
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
                <div class="num"><i>0</i>元</div>
            </li>
            <li>
                <div class="top">出借项目逾期率</div>
                <div class="num"><i>0</i>%</div>
            </li>
            <li>
                <div class="top">累计逾期代偿金额</div>
                <div class="num"><i>0</i>元</div>
            </li>
        </ul>
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
                },{userId:7})
            }
    	},
    	created(){
    		this.getData();
    	}
    }
</script>

<style lang="scss" scoped>
    #risk{
        background:#FFF;
        .title{
            padding:0.533333rem 0 0.72rem;
            text-align:center;
            color:#ccc;
            font-size:0.48rem;
            line-height:0.666667rem;
            i{
              display:inline-block;
              height:1px;
              width:0.8rem;
              background:#ccc;
              position:relative;
              margin:0 0.08rem;
              top:-0.133333rem;
            }
        }
        ul{
            background:#fff;
            padding-bottom: 1.066667rem;
            li{
                width: 8.88rem;
                height: 2.026667rem;
                background:#F7F8F7;
                border-radius: 0.08rem;
                text-align:center;
                margin:0 auto 1.413333rem;
                .top{
                    font-size:0.346667rem;
                    height:0.8rem;
                    width:3.2rem;
                    background:#4CB1FF;
                    line-height:0.8rem;
                    color:#fff;
                    border-radius:0.08rem;
                    position: relative;
                    top:-0.133333rem;
                    margin:0 auto;
                }
                .top1{width:2.4rem;}
                .num{
                    font-size:0.32rem;  
                    i{
                        font-size:0.453333rem;
                    }
                }
            }
        }
    }
</style>