<template>
   <div id="riskNote">
       <div class="agree">
           <router-link to="/home">
            <div class="a-header">
                <img src="https://aliyunsso.edspay.com/web/newIndex/logo_pc.png" alt="">
            </div>
           </router-link>
           <div class="conter">
               <img :src="item" v-for="item in xieyiPic">
           </div>
       </div>
   </div>
</template>

<script>
    export default {
        data() {
            return {
                xieyiPic:[]
            }
        },
        methods: {
            // 初始化信息  1：借款协议  2:债券转让
            getInfo () {
                let initData = ''
                this.$route.query.xy==1 ? initData = "/protocol/p2p/loanProtocol" : initData = "/protocol/p2p/debtTransferProtocol" 
                global.http.post(this, initData, {matchId:this.$route.query.matchId}, data => {
                    if(data.body.resCode == 1){
                        this.xieyiPic = data.body.resData.base64Images
                    }else{
                        this.$alert(data.body.resMsg, '温馨提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                
                            }
                        });
                    } 
                })
            },
        },
        created: function() {
            this.getInfo()
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #riskNote{
        background: #fff;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        z-index: 99;
        .agree{
            width: 1200px;
            height: auto;
            margin: 0 auto;
            background: #fff;
            border-left: 1px solid #e2e2e2;
            border-right: 1px solid #e2e2e2; 
            padding: 0 40px 100px 40px; 
            text-align: justify;
            .a-header{
                position: relative;
                cursor: pointer;
                height: 83px;
                padding: 20px 0 0 30px;
                border-bottom: 1px solid #e2e2e2;
                img{
                    width: 210px;
                    height: 43px;
                }
            }  
            .conter{
                position: relative;
                font-size: 14px;
                line-height: 19px;
                padding: 0 80px;
                img{
                    width: 100%;
                    height: auto;
                    border: 1px solid #e2e2e2;
                    margin-top: 10px;
                }
            }   
        }
    }
</style>
