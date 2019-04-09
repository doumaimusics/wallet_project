<template>
    <div id="diceRecord">
		<title v-title>奖励记录</title>
        <div class="lists" v-if="listData.length">
			<mt-loadmore class="mtContent wrapper" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
                <div class="header bdr-b">
                    <div class="centr">
                        <p>开奖时间</p>
                        <p>下注类型</p>
                        <p>获得奖励</p>
                    </div>
                </div>
				<ul>
					<li class="bdr-b" v-for="(item,index) in listData">
						<p>{{item.timeStr}}</p>
                        <p>{{item.betsType | typeOf}}</p>
                        <p>{{item.reward}}积分</p>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		<wx-null v-else text="暂无记录"></wx-null>
    </div>
</template>

<script>
    import wxToapp from '../../../../../common/wx/wxToapp.js';    
	import wxNull from '../null.vue';//空状态
    export default {
        mixins:[wxToapp],
        data() {
            return {
                listData:[],
				allLoaded:false,
                autoFill:false,
                flag:true,
                pageNo: 1,
            }
        },
        filters:{
            typeOf(v) {
                return v == 1 ? '大' : v == 2 ? '围' : v == 0 ? '小' : "";
            }
        },
        methods: {
            getData(n){
                this.getAppData('/dice/getGameRewardList',(data) =>{
                    if(data.resCode){
                        this.flag = true;
                        n == data.resData.rewards.total ? this.allLoaded = true :  this.allLoaded = false
                        if(n == 1){
                           this.listData = data.resData.rewards.list;
                        }else{
                            this.listData = this.listData.concat(data.resData.rewards.list);
                        }
                    }
                },{pageNumber:n, pageSize:10},1)
            },

			loadBottom(){
                if(this.flag){
                    this.flag = false;
                    this.pageNo += 1;
                    setTimeout(() => {
                        this.getData(this.pageNo)
                        this.$refs.loadmore.onBottomLoaded();
                    },1500);
                }
            },
        },
        created: function() {
            this.getData(1);
            this.PassValue('NavWhite_奖励记录');
        },
        mounted: function() {

        },
        components:{
			wxNull
		},
   }
</script>

<style lang="scss" scoped>
    #diceRecord{
        .lists{
            .header{
                    height: 1.066667rem;
                    position: relative;
                    .centr{
                         padding: 0 .4rem;
                        p{
                            width: 33.3%;
                            text-align: center;
                            line-height: 1.066667rem;
                            font-size:.346667rem;
                            font-family:PingFangSC-Medium;
                            font-weight:500;
                            color:rgba(51,51,51,1);
                            float: left;
                        }
                    }
                }
            ul{
                padding: 0 .4rem;
                li{
                    width: 100%;
                    height: 1.28rem;
                    position: relative;
                    p{
                        float: left;
                        width: 33.3%;
                        text-align: center;
                        line-height: 1.28rem;
                        font-size: .346667rem;
                        font-family:PingFangSC-Regular;
                        font-weight:400;
                        color:rgba(51,51,51,1);
                    }
                }
            }
        }
    }
</style>
