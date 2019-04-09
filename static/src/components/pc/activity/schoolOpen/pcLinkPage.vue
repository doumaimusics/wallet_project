<template>
    <div class="school-pc">
        <!-- 视频点击区域 -->
        <!-- <div class="school-click" @click="isVideo=true"></div> -->
        <video class="school-video"  src="https://aliyunsso.edspay.com/images/video/1000000638248657AA（成片）4期E友课堂-加字幕-中比特率AA.mp4" poster="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/poster.jpg" controls="controls">您的浏览器不支持 video 标签。</video>
        <!-- 动图 -->
        <div class="school-gif"></div>
        <!-- 去邀请 -->
        <img class="school-invite" @click="goInvite" src="https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_yaoqingyouli.gif"/>
        <!-- 二维码 -->
        <div class="school-code" @click="isOpen=true"></div>
        <el-dialog title="温馨提示" :visible.sync="isOpen" width="30%" custom-class="dialogclass" center>
				<div class="erMa"></div>
				<p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
		</el-dialog>
    </div>
</template>
<script>
import { MessageBox } from 'element-ui';
export default {
    data () {
        return {
            login:false,
            isOpen: false, //  弹框
            isVideo:false,
        }
    },
    methods: {
        goInvite () {
            if (this.login) {
                this.$router.push({path:'/myAccount/myInvatation'})
            } else {
                this.$router.push({path:'/login'})
            }
        }
    },
    created () {
        this.getCookie('userName')? this.login = true : this.login = false;
    },
    mounted () {
        const script = document.createElement('script')
        script.src = 'https://s13.cnzz.com/z_stat.php?id=1274563206&web_id=1274563206'
        script.language = 'JavaScript'
        document.body.appendChild(script)
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
    },
}
</script>
<style lang="scss" scoped>
    .school-pc {
        width: 1200px;
        height: 4658px;
        margin: 0 auto;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/pc_bg.png);
        background-size:100% 4658px;
        position: relative;
        .school-click {
            width: 100px;
            height: 100px;
            position: absolute;
            top: 905px;
            left: 550px;
        }
        .school-video {
             width: 620px;
            height: 340px;
            position: absolute;
            top: 807px;
            left: 290px;
        }
        .school-gif {
            width: 606px;
            height: 430px;
            position: absolute;
            top: 1303px;
            left: 297px;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_yaoqingdongtu.gif);
            background-size:606px 430px;
        }
        .school-invite {
            width: 260px;
            height:40px;
            position: absolute;
            top: 1885px;
            left: 620px;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/schoolOpen/1_yaoqingdongtu.gif);
            background-size:260px 40px;
        }
        .school-code {
            width: 1200px;
            height:100px;
            position: absolute;
            bottom: 0;
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
