<template>
    <div id="guidance">
        <div @click.stop="isOpenTwo = true" class="main">
             <div class="first_btn" @click.stop="toEleven"></div>
        </div>
        <el-dialog title="温馨提示" :visible.sync="isOpenTwo" width="30%" custom-class="dialogclass" center>
                <div class="erMa"></div>
                <p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
        </el-dialog>
    </div>
</template>

<script>
    import { MessageBox } from 'element-ui';
    export default{
    	data(){
    		return{
                isOpenTwo: false, //  弹框
    		}
    	},
    	methods:{
            toEleven(){
                this.$router.push({
                    path:'/activityPC/guidance?imgUrl=https://aliyunsso.edspay.com/web/tpl/meetingThree1.jpg'
                })
            }
    	},
    	created(){
    	}
    }
</script>

<style lang="scss" scoped>
    #guidance{
        .main{
            width: 1200px;
            height: 4876px;
            background: url(https://aliyunsso.edspay.com/web/activity/activityPC/eleven_main_bg2.jpg?v=1.0) no-repeat;
            background-size: cover;
            margin: 0 auto;
            position: relative;
            .first_btn{
                width: 529px;
                height: 223px;
                position: absolute;
                top:1188px;
                left: 328px;
                cursor: pointer;
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