<template>
	<div>
        <mt-loadmore class="mtContent" :top-method="loadTop" :bottom-method="loadBottom" :bottomPullText="''" :bottomDropText="''" :bottomLoadingText="''" ref="loadmore" :auto-fill="false">
            <ul class="logChild" v-if="dataList.length">
                <li v-for="(list,index) in dataList" class="clear">
                    <div v-if="index != 0" class="line"></div>
                    <div class="content fl">
                        <div class="name">余额转移<em v-if="list.status == 1">成功</em><em v-else>处理中</em></div>
                        <div class="time">{{list.addTime }}</div>
                    </div>
                    <div class="money fr">-{{list.money | moneyFormat}}元</div>
                </li>
            </ul>
            <account-null v-else :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂时没有账单'"></account-null>
        </mt-loadmore>
	</div>
</template>

<script>
	import { Loadmore } from 'mint-ui';
	import { Toast } from 'mint-ui';
	import accountNull from './account/wxNull'
    import wxLoading from './../../public/wx/wxLoading';
	export default {
		data(){
			return{
				isover:true,
				pageNum:1,
				pages:1,
				dataList:[],
			}
		},
		methods:{
			loadTop(){
                var that = this;
                if(!this.isover)return false
				this.pageNum = 1;
				setTimeout(function(){
					that.getData(that.pageNum);
					that.$refs.loadmore.onTopLoaded();
					that.isover = true;
				},800)
			},
			loadBottom(){
                var that = this;
                if(!this.isover)return false
                this.isover = false;
				this.pageNum += 1;
				var timer = setTimeout(function(){
					that.$refs.loadmore.onBottomLoaded();
					if(that.pages >= that.pageNum){
						that.getData(that.pageNum);
						that.isover = true;
					}else{
                         Toast({
                            message: '没有更多信息',
                            position: 'bottom',
                            duration: 2000
                        });
                    }
					clearTimeout(timer)
				},500)
			},
			getData(num){
				this.postData('/balanceRemoveList',(res,data) => {
					if(data.resCode && data.resData.pageInfo.list){
						this.pages = data.resData.pageInfo.pages;
						var getList = data.resData.pageInfo.list;
						if(num ==1){
                            this.dataList = [];
                            this.dataList = getList
                        }else{
                            for(var i=0;i<getList.length;i++){
                                this.dataList.push(getList[i])  
                            }
                        }
					}
				},{page:this.pageNum,pageSize:10})
			}
		},
		components:{
			wxLoading,
            accountNull
		},
		created(){
			this.getData(this.pageNum);
		}
	}
	
</script>

<style lang="scss">
	.mtContent{
        margin-top: .4rem;
		min-height:16.453333rem;
	}
	.logChild{
		.title{
			height:0.72rem;
			line-height:0.72rem;
			font-size:0.346667rem;
			color:#808080;
			padding-left:0.426667rem;
		} 
        li{
            background:#fff;
            height:1.573333rem;
            padding-left: .4rem;
            .name{
                padding: .266667rem 0 .066667rem;
                color:#333;
                font-family: PingFangSC-Regular;
                font-size: .373333rem;
                color: #494743;
                line-height: .533333rem;
            }
            .time{
                line-height:0.44rem;
                font-family: PingFangSC-Regular;
                font-size: .32rem;
                color: #8E8E8E;
            }
            .money{
                line-height:1.573333rem;
                padding-right: 0.4rem;
                font-family: PingFangSC-Regular;
                font-size: .346667rem;
                color: #808080;
            }
            .line{
                height:1px;
                background:#e5e5e5;
            }
        }
	}
		
</style>