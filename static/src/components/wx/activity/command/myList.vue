<template>
    <div id="command-list">
        <mt-loadmore class="command-load"  :bottom-method="loadBottom" :bottomPullText="''" :bottom-all-loaded="isover" ref="loadmore" :auto-fill="autoFill">
            <account-null  v-if="rewardList.total==0"  :img="'https://aliyunsso.edspay.com/web/wxUpdate/liebiao_null.png'" :text="'暂无福袋记录！'"></account-null>
            <ul v-else class="command-ul">
                <li @click="appRouter('/command/myRecordDetail',{orderId:item.id})" v-for="item in rewardList.list">
                    <!-- 头像 -->
                    <img  class="li-left fl" :src="getImg(item.type,item.picPath)"/>
                    <!-- 描述 -->
                    <div class="li-right fl">
                        <p>
                            {{item.rewardName}}
                            <span class="fr">{{item.addTime}}</span>
                        </p>
                        <p>
                            <span>福袋口令</span>
                            <span>{{item.fudaiName}}</span>
                            <span class="fr add-addr" v-if="item.isAddress == 0" @click.stop="addAddr(item.id)">添加地址<i></i></span>
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
import wxToapp from '../../../../common/wx/wxToapp'
export default {
        mixins: [wxToapp],
        data () {
            return {
                isover:false,
                dataList:[],
                autoFill:false,
                pageNumer: 1,
                itemImg: '',
            }
        },
        props: ['rewardList','add','pages','pageNum'],
        methods: {
            // 添加地址
            addAddr (id) {
                if (this.add == 1) {
                    this.appRouter('/intAddressList',{_type:3,orderId:id})
                } else {
                    this.appRouter('/intAddress',{_type:3,orderId:id})
                }
            },
			loadBottom(){
				this.pageNumer ++ ;
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
            // 判断类型图片
            getImg (type,img) {
                switch (type) {
                    case -1:
                        return img
                        break;
                    case 0:
                        return 'https://aliyunsso.edspay.com/web/activity/command/hb.png'
                        break;
                    case 1:
                        return 'https://aliyunsso.edspay.com/web/activity/command/jxq.png'
                        break;
                    case 2:
                        return 'https://aliyunsso.edspay.com/web/activity/command/jfq.png'
                        break;
                }
            }
        },
        created () {
            this.pageNumer = this.pageNum
        },
        components: {
            accountNull,
        },
}
</script>
<style lang="scss" scoped>
    #command-list{
        width: 100%;
        .command-load {
            .command-ul {
                width: 100%;
                height: 12rem;
                li {
                    border-radius: .08rem;
                    height: 1.706667rem;
                    padding: .266667rem .4rem .266667rem .4rem;
                    border-bottom:.013333rem solid #E5E5E5;
                    background: white;
                    .li-left {
                        width: 1.2rem;
                        height: 1.2rem;
                        background: white;
                    }
                    .li-right {
                        width: 7.733333rem;
                        margin-left: .266667rem;
                        p {
                            span:nth-of-type(1) {
                                font-size: .32rem;
                                color: #8E8E8E;
                            }
                        }
                        p:nth-of-type(1) {
                            font-size: .373333rem;
                            line-height: .533333rem;
                            margin-top: .08rem;
                            color: #494743;
                        }
                        p:nth-of-type(2) {
                            font-size: .32rem;
                            margin-top: .096667rem;
                            line-height: .44rem;
                            color: #666666;
                            overflow: hidden;
                                span:nth-of-type(2) {
                                    color: #666666;
                                    margin-left: .133333rem;
                                }
                                .add-addr {
                                    color: #608DFF;
                                    i {
                                        display: inline-block;
                                        width: .346667rem;
                                        height: .346667rem;
                                        background: url(https://aliyunsso.edspay.com/web/activity/command/lansanjiao.png);
                                        background-size: cover;
                                        vertical-align: sub;
                                    }
                                }
                        }
                        .added-btn {
                            width: 1.933333rem;
                            height: .533333rem;
                            line-height: .53333rem;
                            border: .023333rem solid rgba(252,76,79,0.5);
                            border-radius: .08rem;
                            text-align: center;
                            font-size: .32rem;
                            color: rgba(252,76,79,0.5);
                        }
                    }
                }
            }
        }
    }
</style>


