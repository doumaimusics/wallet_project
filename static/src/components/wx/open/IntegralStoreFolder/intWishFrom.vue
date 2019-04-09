<template>
   <div id="intWishFrom">
       <div v-title>心愿商品</div>
       <div class="top_title">我想要的商品</div>

       <!-- 兑换商品按钮 -->
       <div class="dh_box" @click.stop="goIntGoodList"></div>
       
       <!-- 表单 -->
       <div class="from_box">
           <div class="inpt_box">
               <p style="margin-bottom:0.32rem;">
                   <span>*</span>
                   心愿商品
               </p>
               <input type="text" placeholder="心愿商品名称" v-model="wishName">
           </div>

           <div class="inpt_box">
               <p><span>*</span>心愿商品价格</p>
               <input @input="checkNum"  placeholder="兑换心愿商品愿付出的积分"  v-model="wishPrice">
           </div>

           <div class="inpt_box">
               <p>商品详情</p>
               <textarea name="" id="" maxlength="500"  placeholder="请输入心愿商品的详细信息（限制500字）" v-model="wishDetails"></textarea>
           </div>
       </div>

       <!-- 规则 -->
       <div class="rule_box">
            <h3>规则说明：</h3>
            <p class="clear">
                <span class="sign">1.</span>
                <span class="text">用户可将积分商城没有的心仪商品填入心愿单，并确保后续自己有足够的积分来兑换该商品。</span>
            </p>
            <p class="clear">
                <span class="sign">2.</span>
                <span class="text">心愿商品需为京东自营或天猫超市等大型电商商品，方便我们单独为您采购。</span>
            </p>
            <p class="clear">
                <span class="sign">3.</span>
                <span class="text">每周将挑选十位用户实现其合理心愿。</span>
            </p>
       </div>

       <!-- 底部 -->
       <div class="bottom_box">
           <div class="btn" @click="submitFun">提交</div>
       </div>
   </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    import { Toast } from 'mint-ui';
    export default{
        mixins:[wxToapp],
        data(){
            return{
                wishName:'',  // 心愿商品 
                wishPrice:'', // 价格
                wishDetails:'',   // textarea的内容
            }
        },
        methods:{
            goIntGoodList(){   // 跳转兑换商品
                if(this.osType){
                    this.PassValue('GoodsList');
                } else {
                    this.$router.push({
                        path:'/intGoodList'
                    })
                }
            },

            checkNum (e) {           // input数字验证
                this.$nextTick(() => {
                    this.wishPrice =  e.target.value.replace(/[^\d]/g,'');
                    e.target.value < 1 ? this.wishPrice = '' : ''
                })
            },

            submitFun(){  // 点击提交
                if(this.wishName == ''){
                     Toast({message:'请输入心愿商品!',duration:2000});
                } else if(this.wishPrice == ''){
                     Toast({message:'请输入心愿积分!',duration:2000});
                } else {
                    this.getNotlogData('/wish/makeWish',(data) => {
                        if(data.resCode == 1){
                            Toast({message:'提交成功!',duration:2000});
                            this.wishName = '';   
                            this.wishPrice = '';
                            this.wishDetails = '';
                        } else {
                            Toast({message: data.resMsg,duration: 2000});
                        }
                    },{name:this.wishName,score:this.wishPrice,detail:this.wishDetails})
                }
            }
        },
        mounted() {
            // app title跳转变化
            this.PassValue('NavWhite_心愿商品');
        },
        created(){

        }
    }
</script>

<style lang="scss" scoped>
    #intWishFrom{
        position: relative;
        width: 100%;
        overflow: hidden;
        background: #fff;
        padding: 0 .533333rem;
        .top_title{
            padding: .533333rem 0 .64rem;
            font-family: PingFangSC-Medium;
            font-weight: 700;
            font-size: .48rem;
            color: #333333;
        }
        .dh_box{
            width: 1.92rem;
            height: .613333rem;
            background:url(https://aliyunsso.edspay.com/web/wx/integralStroe/intThree/dh_bg.png) no-repeat;
            background-size: 100% 100%;
            position: absolute;
            top: .56rem; right: .533333rem;
        }
        .from_box{
            font-family: PingFangSC-Regular;
            .inpt_box{
                margin-bottom: .533333rem;
                p{
                    font-size: .373333rem;
                    color: #333;
                    line-height: .533333rem;
                    margin-bottom: .426667rem;
                    span{
                        float: left;
                        padding-top: .08rem;
                        margin-right: .133333rem;
                        color: #FF5B4C;
                    }
                }
                input{
                    width: 100%;
                    height: 1.173333rem;
                    background: #F8F8F8;
                    padding-left: .4rem;
                    font-size: .373333rem;
                     border-radius: .053333rem;
                }
                textarea{
                    width: 100%;
                    height: 3.44rem;
                    border: none;
                    resize: none;
                    background: #F8F8F8;
                    font-size: .373333rem;
                    border-radius: .053333rem;
                    padding: .32rem .4rem;
                }
            }
        }
        .rule_box{
            padding-top: .266667rem;
            font-family: PingFangSC-Regular;
            font-size: .32rem;
            color: #9B9B9B;
            line-height: .533333rem;
            margin-bottom: 2.333333rem;
            h3,p{
                margin-bottom: .133333rem;
            }
            p{
                span{
                    float: left;
                }
                span.sign{
                    width: 5%;
                }
                span.text{
                    width: 95%;
                }
            }
        }
        .bottom_box{
            width: 100%;
            height: 1.6rem;
            background: #fff;
            position: fixed;
            bottom: 0;left: 0;
            box-shadow: 0 0 .16rem 0 rgba(0,0,0,0.12);
            .btn{
                width: 5.333333rem;
                height: 1.066667rem;
                border-radius: 1.333333rem;
                text-align: center;
                line-height: 1.066667rem;
                color: #fff;
                font-family: PingFangSC-Regular;
                font-size: .426667rem;
                margin: .266667rem auto;
                background: #F14B4B;
                border-radius: 0.533333rem;
                
            }
        }
    }
</style>

