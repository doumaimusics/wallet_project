<template>
    <div id="guidance">
        <div @click="isOpenTwo = true" class="main">
            <img :src="imgUrl" alt="">
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
                imgUrl:'',  //活动图片
                cnzzId:'',//友盟id号
    		}
    	},
    	methods:{

    	},
    	created(){
            this.imgUrl = this.$route.query.imgUrl;
    	},
        mounted(){
            // 数据统计
            if(this.$route.query.cnzzId){
                const script = document.createElement('script')
                script.src = 'https://s13.cnzz.com/z_stat.php?id='+ this.$route.query.cnzzId +'&web_id='+ this.$route.query.cnzzId
                script.language = 'JavaScript'
                document.body.appendChild(script)
            }
        },
        watch: {
            '$route'() {
                if (window._czc) {
                    let location = window.location
                    let contentUrl = location.pathname + location.hash
                    let refererUrl = '/'
                    window._czc.push(['_trackPageview', contentUrl, refererUrl])
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    #guidance{
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