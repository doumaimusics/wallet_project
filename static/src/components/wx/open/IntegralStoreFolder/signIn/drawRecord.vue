<template>
    <div id="record">
        <div v-title v-if="$route.query._type == 3">抽奖记录</div>
        <div v-title v-else-if="$route.query._type == 2">翻牌记录</div>
        <mt-loadmore v-if="oldList.length != 0 || weekList.length != 0" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="true" ref="loadmore">
        	<div v-if="weekList.length != 0" class="title">本周奖励</div>
        	<record-list v-for="(item,index) in weekList" :listData="item" :hasAdd="hasAdd" :title="$route.query._type" :index="index"></record-list>
        	<div v-if="oldList.length != 0 && $route.query._type == 2" class="title">往期奖励</div>
        	<record-list v-for="(item,index) in oldList" :listData="item"  :hasAdd="hasAdd" :title="$route.query._type" :index="index"></record-list>
        </mt-loadmore>
        <wx-null v-else-if="hasGetData" :text="nulltext"></wx-null>
    </div>
</template>

<script>
    import wxNull from '../null';//空状态
	import recordList from '../public/recordList';
    import wxToapp from '../../../../../common/wx/wxToapp';
    export default {
        mixins:[wxToapp],
    	data(){
    		return{
                nulltext: '目前暂无记录！',
    			oldList:[],
    			weekList:[],
                pageSize:8,
                pageNum:1,
                pages:1,
                allLoaded:false,
                hasAdd:false,
                hasGetData:false,
    		}
    	},
    	methods:{
            getAwardData(){//获取翻牌列表
                let json={pageSize:this.pageSize,pageNum:this.pageNum,}
                if(this.$route.query._type == 3){   // _type 2 翻牌   3 抽奖
                    json.orderType = 2;
                    // json.type = 0;
                    this.nulltext = '目前暂无抽奖记录！'
                }else{
                    json.orderType = 1;
                    this.nulltext = '目前暂无翻牌记录！'
                }
                this.getAppData('/reward/exchangeList',(data) =>{
                    if(data.resCode){
                        if(!this.hasGetData){
                            this.hasGetData = true;
                        }
                        if (this.pageNum == 1){
                            this.hasAdd = data.resData.data.add;
                            this.oldList = data.resData.data.oldList.list;
                            data.resData.data.weekList ? this.weekList = data.resData.data.weekList.list : '';
                            this.pages = data.resData.data.oldList.pages;
                        } else {
                            this.oldList = this.oldList.concat(data.resData.data.oldList.list);
                        }
                        /*this.hasAdd = data.resData.data.add;
                        this.oldList = data.resData.data.oldList.list;
                        this.weekList = data.resData.data.weekList;
                        this.pages = data.resData.data.oldList.pages;*/
                    }
                },json,1,1)
            },
            loadTop(){
                this.pageNum = 1;
                this.getAwardData();
                this.$refs.loadmore.onTopLoaded();
            },
            loadBottom(){//上拉加载
                this.pageNum++;
                if(this.pageNum <= this.pages){
                    var timer = setTimeout(() =>{
                            this.getAwardData();
                        clearTimeout(timer)
                        this.$refs.loadmore.onBottomLoaded();
                        
                    },300);
                    
                }else{
                    this.allLoaded = true;
                        this.$refs.loadmore.onBottomLoaded(); 
                }
                
            }
    	},
    	components:{
    		recordList,
            wxNull
    	},
    	created(){
    	   this.getAwardData()
    	},
        mounted(){
            //给app传值标题名
            this.PassValue('NavWhite_'+(this.$route.query._type == 3 ? '抽奖记录' : '翻牌记录'));
        }
    }
</script>

<style lang="scss" scoped>
    #record{
		.title{
			height:0.986667rem;
			line-height:0.72rem;
			padding-top:0.266667rem;
			padding-left: 0.4rem;
			font-size: 0.32rem;
			color:#808080;
		}
    }
</style>