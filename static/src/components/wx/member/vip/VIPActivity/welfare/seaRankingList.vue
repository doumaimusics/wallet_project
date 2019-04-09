<template>
    <div id="rankingList">
        <div v-title class="pageTitle">出海寻宝</div>
        <div class="content">
            <div v-if="sailSum" class="userData">你当前已航行<span>{{sailSum}}</span>米，已击败<span>{{beat}}%</span>冒险家！</div>
            <div v-else class="userData">波澜壮阔的大海等着你来冒险！</div>
            <ul>
                <li v-for="(item,index) in sailUserModels" v-if="index<10">
                    <div class="fl phone">{{item.mobilePhone}}</div>
                    <div class="fr rowNum">共航行{{item.sailSum}}米</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import wxToapp from '../../../../../../common/wx/wxToapp.js';
    export default{
        mixins:[wxToapp],
    	data(){
    		return{
                beat:0,
                sailSum:0,
                sailUserModels:[]
    		}
    	},
    	methods:{
            getRankingList(){
                this.getAppData('/sail/topList',(data)=>{
                    if(data.resCode){
                        this.beat = parseInt(data.resData.beat);
                        this.sailSum = data.resData.sailSum;
                        this.sailUserModels = data.resData.sailUserModels;
                    }
                },{})
            }
    	},
    	created(){
    		this.getRankingList();
    	},
        mounted(){
            setTimeout(()=>{
                document.body.scrollTop = 0;
                document.documentElement.scrollTop =0;
                window.pageYOffset =0;
            },100)
        }
    }
</script>

<style lang="scss">
    body,html{
        height:100%;
    }
</style>

<style lang="scss" scoped>
    #rankingList{
        font-family: PingFangSC-Regular;
        background:url('https://aliyunsso.edspay.com/web/wx/vip/vipActivity/rankingListBG.png') no-repeat;
        background-size:100% 100%;
        width:100%;
        height: 23.066667rem;
        .content{
            padding-top:8.6rem;
            .userData{
                font-size:0.346667rem;
                line-height:0.506667rem;
                color:#78372E;
                text-align:center;
                height:0.506667rem;
                span{
                    color: #FF1F00;
                }
            }
            ul{
                padding:0.48rem 1.52rem  0 1.946667rem;
                li{
                    margin-bottom: 0.62rem;
                    font-size:0.346667rem;
                    line-height:0.506667rem;
                    height:0.506667rem;
                    color:#612D17;
                }
            }
        }
    }
</style>