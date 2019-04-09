<template>
    <!-- 车轮理财渠道 -->
    <div id="pageMiddleWx">
        
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {

        }
    },
    methods: {
        init(){
            let _this = this
            this.$http.post(global.tzjAjaxUrl + "/cllc/wrb_interface/login", { uid: _this.$route.query.uid }).then((res) => {
                if(res.body.resCode == 1){							
                    _this.setCookie('userToken',res.body.resData.token,(1000 * 60 * 20))
                    _this.setCookie('zsOpenStatus',res.body.resData.zsOpenStatus)
                    _this.setCookie('userId',res.body.resData.userId)
                    let userName = res.body.resData.userName
                    _this.setCookie('userName',userName.substring(0,3)+"****"+userName.substring(7,11));
                    // 登录成功跳转的页面
                    if (res.body.resData.targetUrl) {
                        setTimeout(function() {
                            window.location.href = res.body.resData.targetUrl;
                        }, 500)
                    } else {
                        setTimeout(function() {
                            _this.$router.push("/wxIndex")
                        }, 500)
                    }
                } else {
                    // 登录失败的提示
                    Toast({
                        message: res.body.resMsg,
                        position: 'bottom',
                        duration: 3000
                    });
                }
            })
        }
    },
    created: function() {
        this.init()
    },
    mounted: function() {
        
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
#pageMiddleWx {}
</style>
