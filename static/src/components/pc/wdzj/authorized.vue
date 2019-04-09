<template>
    <div id="WDZJauthorizedPC">
        
    </div>
</template>

<script>
import { Notification } from 'element-ui';
export default {
    data() {
        return {
            userName: '',
            qiMo:false,//七陌
        }
    },
    methods: {
        initAjax() {
            let _this = this
            _this.$http.post(global.tzjAjaxUrl + "/wdzj/login_re", {uuid: this.$route.query.uuid}).then((res) => {
                console.log(res)
                if (res.body.resCode == 1) {
                    this.qiMo = true
                    _this.setCookie("token",res.body.resData.token,1000 * 60 * 20);
                    _this.setCookie("userName",res.body.resData.mobilePhone,1000 * 60 * 20);
                    _this.setCookie("userId",res.body.resData.userId,1000 * 60 * 20);
                    _this.setCookie("nickname",res.body.resData.userName,1000 * 60 * 20);//在线客服用户昵称
                    setTimeout(() => {
                        _this.$router.push(res.body.resData.targetUrl)
                    }, 1000);
                } else {
                    this.$alert(res.body.resMsg, '温馨提示：', {
                        confirmButtonText: '确定',
                        callback: action => {
                            _this.$router.go(-1);
                        }
                    });
                }
            })
        },
    },
    created: function() {
        this.initAjax()
    },
    mounted: function() {
        
    },
    components: {

    },
    watch: {
        'qiMo'(val){
            if(val){
                window.qimoClientId = {
                    userId: this.getCookie('userId'),
                    nickName:this.getCookie('nickname'),
                    customField: {"nickName":this.getCookie('nickname')}
                }

                const script = document.createElement('script')
                script.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=23776200-95f6-11e8-952f-17ffacefb5aa&autoShow=false&language=ZHCN'
                script.language = 'JavaScript'
                script.async='async'
                document.body.appendChild(script)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#WDZJauthorizedPC{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #fff;
    z-index: 999;
}
</style>
