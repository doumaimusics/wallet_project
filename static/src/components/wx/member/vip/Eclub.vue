<template>
    <div id="Eclub">
        <div v-title>E家俱乐部</div>
    	<mt-loadmore class="mtContent" :top-method="loadTop" :bottom-method="loadBottom" :bottomPullText="''" :bottom-all-loaded="allLoaded" ref="loadmore" :auto-fill="autoFill">
            <div v-for="item in clubList" @click="toDetail(item.skipUrl)" class="card1">
                <img :src="item.pic1Url" alt="" class="imgBanner">
                <div class="title">{{item.articleTitle}}</div>
                <div class="time">{{item.startTime}}</div>
            </div>
        </mt-loadmore>
        <div v-if="showBottomText" class="bottomText"><i class="bdr-t"></i>没有更多了<i class="bdr-t"></i></div>
    </div>
</template>

<script>
    import { Loadmore } from 'mint-ui';
    export default{
    	data(){
    		return{
                allLoaded:false,    //是否允许加载
                autoFill:false,     //是否默认加载
                botText:'',
                page:1,     //当前页
                pages:10,    //总页数
                clubList:[], //列表数组
                showBottomText:false,
    		}
    	},
    	methods:{
            toDetail(urlData){
                window.location.href = urlData;
            },
            getClubData(page){
                this.notLogPost('/vip/recreationClubNew',(data)=>{
                    if(data.resCode){
                        if(this.page == 1){
                            this.clubList = data.resData.data.list;
                            this.pages = data.resData.data.pages
                        }else{
                            this.clubList = this.clubList.concat(data.resData.data.list);
                        }
                    }
                },{page:this.page,rows:5})
            },
            loadTop(){
                var that = this;
                this.page = 1;
                this.showBottomText = false;
                setTimeout(function(){
                    that.getClubData(that.page);
                    that.$refs.loadmore.onTopLoaded();
                    that.allLoaded = false;
                },500)
            },
            loadBottom(){
                var that = this;
                this.allLoaded = true;
                if(this.pages<=this.page){
                    that.$refs.loadmore.onBottomLoaded();
                    this.showBottomText = true;
                    return;
                }

                this.page += 1;
                var timer = setTimeout(function(){
                    that.getClubData(that.page);
                    that.allLoaded = false;
                    that.$refs.loadmore.onBottomLoaded();
                    clearTimeout(timer)
                },500)
            },
    	},
    	created(){
    		this.getClubData();
    	}
    }
</script>

<style lang="scss" >
    #Eclub{
        font-family: PingFangSC-Regular;
        .card1{
            height: 5.733333rem;
            width:10.0rem;
            padding-top: 0.4rem;
            padding-left: 0.533333rem;
            background:#fff;
            margin-bottom: 0.266667rem;
            .imgBanner{
                display:block;
                height:3.466667rem;
                width:8.933333rem;
                border-radius: 0.213333rem;
                margin-bottom: 0.4rem;
            }
            .title{
                font-size:0.373333rem;
                line-height:0.533333rem;
                color:#333;
                margin-bottom: 0.106667rem;
            }
            .time{
                font-size:0.32rem;
                color:#808080;
                line-height:0.453333rem;
            }
        }
        .bottomText{
            padding-top: 0.266667rem;
            font-size: 0.293333rem;
            line-height:0.8rem;
            height:1.2rem;
            color: #C5C5C5;
            text-align:center;
            i{
                display:inline-block;
                width:0.32rem;
                height:1px;
                position: relative;
                top: -0.1rem;
                margin:0 0.133333rem;
            }
            .bdr-t:before{
                border-top:1px solid #C5C5C5;
            }
        }
    }
</style>