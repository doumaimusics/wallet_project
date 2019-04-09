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
                this.$router.push('/invest')
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
            margin:200px auto 0;
            position: relative;
            width: 300px;
            height: 363px;
            img{
                margin:0 auto;
                display:block;
                width: 300px;
                height: 363px;
            }
            .btn{
                position: absolute;
                bottom: 0;
                left:46px;
                height:50px;
                width:205px;
                cursor: pointer;
            }
            .text{
                position: absolute;
                margin:0 auto;
                width: 100%;
                text-align: center;
                top:220px;
                color:#fff;
                text-align:center;
                font-size: 16px;
                line-height: 20px;
                padding: 0 30px;
                h4{
                    font-size: 18px;
                    line-height: 24px;
                    padding-bottom: 6px;
                }
            }
        }
        .close{
            padding-top:100px;
            cursor: pointer;
            img{
                height:40px;
                width:40px;
                display:block;
                margin:0 auto;
            }
        }
    }
</style>