<template>
    <div id="command-list">
        <mt-loadmore class="command-load"  :bottom-method="loadBottom" :bottomPullText="''" :bottom-all-loaded="isover" ref="loadmore" :auto-fill="autoFill">
	     	<account-null  v-if="rewardList.total==0"  :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂无福袋记录！'"></account-null>
            <ul v-else class="command-ul">
                <li  v-for="(item,index) in rewardList.list" :class="{greyBack: index == 0 && isGet}">
                    <!-- 头像 -->
                    <img  class="li-left fl" :src="item.userImage ? item.userImage : 'https://aliyunsso.edspay.com/web/wx/account/head.png'"/>
                    <!-- 描述 -->
                    <div class="li-right fl">
                        <p>{{item.rewardName}}</p>
                        <p>{{item.userMobile}}
                            <span v-if="index == 0 && isGet">   (我自己)</span>
                            <span class="fr">{{item.addTime}}</span>
                        </p>
                    </div>
                </li>
            </ul>
	    </mt-loadmore>
    </div>
</template>
<script>
import { Loadmore } from 'mint-ui';
import accountNull from '../../member/account/wxNull';
export default {
        data () {
            return {
                isover:false,
                dataList:[],
                autoFill:false,
                headPic:'',
                pageNumer:1
            }
        },
        props: ['rewardList','pages','pageNum','isGet'],
        methods: {
			loadBottom(){
				this.pageNumer ++;
				this.isover = true;
				var timer = setTimeout(()=>{
					if(this.pages >= this.pageNumer){
						this.$emit('refreshInfo',this.pageNumer)
						this.isover = false;
					}
					this.$refs.loadmore.onBottomLoaded();
					clearTimeout(timer)
				},500)
            },
        },
        created () {
            this.pageNumer = this.pageNum
        },
        components: {
            accountNull,
        }
}
</script>
<style lang="scss" scoped>
    #command-list{
        .command-load {
            .command-ul {
                width: 100%;
                overflow: scroll;
                li {
                    height: 1.706667rem;
                    padding: .266667rem .4rem .266667rem .4rem;
                    background: white;
                    .li-left {
                        display: block;
                        width: 1.2rem;
                        height: 1.2rem;
                        background: #282828;
                    }
                    .li-right {
                        width: 7.733333rem;
                        margin-left: .266667rem;
                        p:nth-of-type(1) {
                            font-size: .373333rem;
                            line-height: .533333rem;
                            margin-top:  .08rem;
                            color: #494743;
                        }
                        p:nth-of-type(2) {
                            font-size: .32rem;
                            margin-top: .096667rem;
                            line-height: .44rem;
                            color: #666666;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
        .greyBack {
            background: #e1e1e1 !important;
            font-weight: bold;
        }
    }
</style>


