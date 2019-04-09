<template>
  <div id="wxRegisterSucc">
      <div v-title>注册成功</div>
      <h3>恭喜您!注册成功</h3>
      <p class="p1">(<span>{{goTime}}</span>秒后自动返回)</p>
      <img src="https://aliyunsso.edspay.com/web/wx/v3.3.5/bigmoney.png" alt="" class="imgs">
      <p class="p2">注册红包已发放您账户中，请在<span @click="goRed">我的-我的红包</span>中查看！</p>
      <div @click="goCG()" class="btn">我要开通存管账户</div>
      <div class="get_red_pack" @click="goNewTask">领取68元现金红包</div>


  </div>
</template>

<script>
    export default{
        data(){
            return{
                goTime:5,  //倒计时
                fullPath:'', //入口页面的路由
                timer:null
            }
        },
        methods:{
            goTimeFn(){    // 自动跳转初始进入页面
                let that = this;
                that.timer = window.setInterval(function(){
                    if((that.goTime--) <= 0) {
                        that.goTime = 5;
                        that.$router.replace({path:that.fullPath})
                        window.clearInterval(that.timer);
                    }
                },1000)
            },
            goCG(){    // 跳转开通存管
                clearInterval(this.timer);
                this.$router.replace({
                    path:'/wxDepository'
                })
            },
            goRed(){   // 跳转我的红包优惠页面
                clearInterval(this.timer);
                this.$router.replace({
                    path:'/wxMyAccount/wxRedPacket'
                })
            },
            goNewTask(){   // 跳转新手任务
                clearInterval(this.timer);
                this.$router.replace({
                    path:'/newTask'
                })
            }  
        },
        created(){
            this.fullPath = this.$route.query.fullPath //入口页面的路由
            this.goTimeFn();  // 调用倒计时
        },
        mounted(){
            var height = document.documentElement.clientHeight;
            $("#wxRegisterSucc").height(height);
        },
        destroyed() {
            clearInterval(this.timer);
        },
    }
</script>
<style lang="scss" scoped>
    #wxRegisterSucc{
        background: #fff;
        font-family: PingFangSC-Regular;
        padding-top: 2.773333rem;
        text-align: center;
        h3{
            margin-bottom: .133333rem;
            font-size: .48rem;
            font-weight: 700;
            background: -webkit-linear-gradient(to left, #FF6B37, #FF3334);
            background: -o-linear-gradient(to right, #FF6B37, #FF3334);
            background: -moz-linear-gradient(to right, #FF6B37, #FF3334);
            background: linear-gradient(to right, #FF6B37, #FF3334);
            -webkit-background-clip: text;
            color: transparent;
        }
        .imgs{
            width: 4rem;
            height: 3.253333rem;
            margin-bottom: .4rem;
        }
        p.p1{
            font-size: .346667rem;
            color: #333;
            margin-bottom: .6rem;
        }
        p.p2{
            font-size: .346667rem;
            color: #333;
            margin-bottom: 1.493333rem;
            span{
                color: #FF6052;
            }
        }
        .btn{
                 background-color: rgb(255, 91, 76);
                background-image: linear-gradient(45deg, rgb(255, 101, 84), rgb(255, 62, 56));
                width: 7.866667rem;
                height: 1.2rem;
                color: rgb(255, 255, 255);
                margin: 0px auto;
                border-radius: 0.106667rem;
                line-height: 1.2rem;
                text-align: center;
                font-size: .426667rem;
                margin-bottom: .666667rem;
        }
        .get_red_pack{
            font-family: PingFangSC-Medium;
            width: 7.866667rem;
            height: 1.2rem;
            color: #FF5A4C;
            margin: 0 auto;
            line-height: 1.2rem;
            text-align: center; 
            font-size: .426667rem;
            border: 1px solid #FF5B4C;
        }
    }
</style>

