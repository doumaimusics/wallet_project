<template>
    <div id="rankChange">
        <div v-layer class="layer">
            <div class="content">
                <img :src="tipData.dialogUrl" alt="">
                <div @click="confirm" class="btn"></div>
                <div class="text">
                    <h4 :style="{color:'#'+tipData.fontColor}">恭喜你</h4>
                    {{tipData.dialogMsg}}
                </div>
            </div>
            <div @click="close" class="close">
                <img src="https://aliyunsso.edspay.com/web/wx/vip/close.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                imgData:'',
                shareData:{},
    		}
    	},
        props:['img','showtips','tipData'],
    	methods:{
            confirm(){
                this.showtips.change = false;
                this.$router.push('/myAccount/VipBenefits');
                // this.showtips.qrCode = true;
            },
            close(){
                this.showtips.change = false;
            }
    	},
    	created(){
            
        },
        mounted(){
    		
        }
    }
</script>

<style lang="scss" scoped>
    #rankChange{
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