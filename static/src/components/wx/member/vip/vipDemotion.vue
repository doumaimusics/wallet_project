<template>
    <div id="demotion">
        <div v-layer class="layer">
            <div class="content">
                <img :src="tipData.dialogUrl" alt="">
                <div class="text"></div>
                <div class="text">{{tipData.dialogMsg}}</div>
                <div @click="confirm" class="btn"></div>
                <div @click="close" class="close">
                    <img src="https://aliyunsso.edspay.com/web/wx/vip/close.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{

    		}
    	},
        props:['tipData','showtips'],
    	methods:{
            confirm(){
                this.showtips.demotion = false;
                this.$router.push('/wxInvest')
            },
            close(){
                this.showtips.demotion = false;
            }
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    #demotion{
        .content{
            margin:2.693333rem auto 0;
            position: relative;
            img{
                margin:0 1.253333rem;
                display:inline-block;
                width: 7.493333rem;
                height: 9.706667rem;
            }
            .text{
                font-size:0.346667rem;
                line-height: 0.56rem;
                position: absolute;
                top:6.1rem;
                left:1.92rem;
                width:6.133333rem;
                color:#fff;
                text-align:center;
            }
            .btn{
                position: absolute;
                top: 8.426667rem;
                left:2.5rem;
                height:1.253333rem;
                width:5.066667rem;
            }
            .close{
                padding-top:2rem;
                img{
                    height:0.933333rem;
                    width:0.933333rem;
                    display:block;
                    margin:0 auto;
                }
            }
        }
    }
</style>