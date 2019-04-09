<template>
    <div id="zqFestival" :style="{background: 'url('+ bgSrc +') no-repeat center center / 1200px 2598px'}">
        <div @click="isOpenTwo = true" class="contentBottom"></div>
        <el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" top="30%" custom-class="dialogclass" center>
            <div class="erMa"></div>
            <p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isOpenTwo: false, //  弹框
                showVideo: {
                    showVideo: false
                },
                bgSrc:'',//pc背景图
                activityIds:'',//活动ID
            }
        },
        methods: {
            showQRcode(){//显示二维码方法
                this.isOpenTwo = true;
            },
            getData(){
                this.notLogPost('/activity/fest/init',data => {
                    if(data.resCode == 1){
                        this.bgSrc = (data.resData.headerImg.toString()).split(',')[1];
                    }
                },{activityId:this.activityIds})
            },
        },
        created() {
            if(this.$route.query.activityId){
                this.activityIds = this.$route.query.activityId;
            }
            this.getData()
        },
    }
</script>

<style lang="scss" scoped>
    #zqFestival{
        // background:url('https://aliyunsso.edspay.com/web/wx/activity/everyHoliday/PC.png') no-repeat;
        // background-size: 100% 100%;
        height:2598px;
        width:1200px;
        margin:20px auto;
        .contentBottom{
            height:2598px;
        }
        
        .main{
            width: 1200px;
            margin: 0 auto;
            img{
                display: block;
                width: 100%;
                margin:30px 0 40px 0;
            }
        }
        .erMa {
            width: 230px;
            height: 230px;
            margin: 0 auto;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/iceSnowCarnival/erweimaxin.png?v=1.1) no-repeat;
            background-size: cover;
            margin-bottom: 20px;
        }

        .inioP {
            text-align: center;
        }
        .el-message-box__content .el-message-box__message p{
            text-align: center;
        }
    }
</style>