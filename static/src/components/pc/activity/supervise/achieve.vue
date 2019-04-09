<template>
    <div id="achieve">
        <div class="main">
            <div class="btn" @click="isOpenTwo = true"></div>
        </div>
         <el-dialog title="E委会章程" :visible.sync="isOpenTwo" width="30%" center>
                <div class="img_box">
                    <div class="img"></div>
                </div>
           </el-dialog>
    </div>
</template>

<script>
import { MessageBox } from 'element-ui';
export default {
    data(){
        return{
            isOpenTwo: false, //  弹框
        }
    }
}
</script>

<style lang="scss" scoped>
    #achieve{
        width: 100%;
        .main{
            height: 2736px;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/pc_achieve.png?v=1.2) no-repeat;
            background-size: cover;
            position: relative;
            overflow: hidden;
            .btn{
                width: 495px;
                height: 88px;
                position: absolute;
                top: 2410px;
                left: 0;
                right: 0;
                margin: auto;
                cursor: pointer;
            }
        }
        .img_box{
            width: 100%;
            height: 500px;
             overflow: hidden;
            overflow-y: auto;
            .img{
                width: 100%;
                height: 6052px;
                background: url(https://aliyunsso.edspay.com/web/wx/activity/supervise/pc_constitution.png?v=1.2) no-repeat;
                background-size: 100% 100%;
            }
        }
    }
</style>