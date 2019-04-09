<template>
    <div class="list_box">
          <div class="center_box" v-if="countList.length > 0">
            <div class="title_box clear">
                <div class="title">{{title1}}</div>
                <div class="title">{{title2}}</div>
            </div>
            <ul >
                <li class="clear" v-for="item in countList">
                    <div class="fl">{{item.regTimeStr}}</div>
                    <div class="fr">{{item.mobilePhone}}</div>
                </li>
            </ul>
        </div>
        <div class="list_null" v-else>
            <div class="null_icon"></div>
            <div class="invite_btn" @click="toRichPlan">立即邀请</div>
        </div>   
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import { MessageBox } from 'mint-ui'
    export default{
        mixins:[wxToapp],
        data(){
            return{

            }
        },
        props:['title1','title2','countList','activityTime'],
        methods:{
            toRichPlan(){
                if(this.activityTime == 2){
                   MessageBox('温馨提示', '该活动尚未开始！');
                } else if(this.activityTime == 3){
                   MessageBox('温馨提示', '该活动已结束！');
                } else {
                    this.appRouter('/wxInvitationIndex');
                }
            },

        },
            mounted() {
                 console.log(this.countList)
            },
    }
</script>
<style>
     .bdr-bt:after {
		    height: 1px;
            content: '';
            width: 100%;
            border-bottom: 1px dashed #626262;
            position: absolute;
            bottom: 0;
            right: 0;
            transform: scaleY(0.5);
            -webkit-transform: scaleY(0.5);
            z-index: 2;
		}
</style>

<style lang="scss" scoped>

                .list_box{
                .center_box{
                    overflow: hidden;
                    height: 10.666667rem;
                    .title_box{
                        height: 1.026667rem;
                        .title{
                            width: 50%;
                            height: 1.026667rem;
                            float: left;
                            text-align: center;
                            line-height: 1.026667rem;
                            font-size: .32rem;
                            color: #fff;
                        }
                    }
                    ul{
                        overflow-y: auto;
                        height: 100%;
                        li{
                            height: .96rem;
                            padding: 0 .32rem 0 .386667rem;
                            div{
                                width: 3.746667rem;
                                line-height: .96rem;
                                text-align: center;
                                font-size: .346667rem;
                                color: #626262;
                                position: relative;
                                background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/xian.png?v=1.1) no-repeat bottom;
                            }
                        }
                        li:last-child{
                            margin-bottom: 1.2rem;
                        }
                    }
                }
                
            }
            .list_null{
                margin: 3.466667rem auto 0;
                .null_icon{
                    width: 2.68rem;
                    height: 2.773333rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/null_bg.png?v=1.0) no-repeat;
                    background-size: cover;
                    margin: 0 auto .773333rem;
                }
                .invite_btn{
                    width: 3.84rem;
                    height: 1.2rem;
                    background: url(https://aliyunsso.edspay.com/web/wx/activity/richPlanActivity/btn_box.png?v=1.0) no-repeat;
                    background-size: cover;
                    text-align: center;
                    line-height: 1.2rem;
                    font-size: .4rem;
                    color: #5b2114;
                    margin: 0 auto;
                }
            }
</style>