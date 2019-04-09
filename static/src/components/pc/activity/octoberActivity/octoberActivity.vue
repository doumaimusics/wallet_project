<template>
    <div class="october-root">
        <!-- 参加按钮 -->
        <div class="join-btn" @click="isOpen = true"></div>
        <!-- 二维码 -->
        <el-dialog title="温馨提示" :visible.sync="isOpen" width="30%" custom-class="dialogclass" center>
				<div class="erMa"></div>
				<p class="inioP">亲，参与此活动请扫描二维码去E都市钱包APP<br/>查看详情</p>
		</el-dialog>
    </div>
</template>
<script>
export default {
        data () {
            return {
                isOpen:false,
            }
        },
        mounted () {
            const script = document.createElement('script')
            script.src = 'https://s13.cnzz.com/z_stat.php?id=1274952864&web_id=1274952864'
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
    .october-root {
        width: 1200px;
        height: 3554px;
        margin: 0 auto;
        position: relative;
        background: url('https://aliyunsso.edspay.com/web/wx/activity/octoberActivity/pcMain.png') no-repeat;
        background-size: 100% 100%;
        overflow: hidden;
        .join-btn {
            width: 416px;
            height: 88px;
            margin:3370px auto 0 auto;
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

