<template>
    <div id="WDZJauthorizedWx">
        
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data() {
        return {
            userName: ''
        }
    },
    methods: {
        initAjax() {
            let _this = this;
            _this.$http.post(global.tzjAjaxUrl + "/wdzj/login_re", {uuid: this.$route.query.uuid, mobileType:  3}).then((res) => {
                console.log(res);
                if (res.body.resCode == 1) {
                    _this.userName = res.body.resData.userName;
                    _this.setCookie('userToken', res.body.resData.token, (1000 * 60 * 15));
                    _this.setCookie('zsOpenStatus', res.body.resData.zsOpenStatus);
                    _this.setCookie('userId', res.body.resData.userId, (1000 * 60 * 15));
                    _this.setCookie('nickname',res.body.resData.userName,(1000 * 60 * 15));//在线客服用户昵称
                    _this.setCookie('userName',_this.userName.substring(0,3)+"****"+_this.userName.substring(7,11));   // 设置cookie得手机号和用户名
                    setTimeout(() => {
                        _this.$router.push(res.body.resData.targetUrl);
                    }, 1000);
                } else {
                    Toast(res.body.resMsg);
                    setTimeout(() => {
                        _this.$router.go(-1);
                    }, 3000);
                }
            })
        },
    },
    created: function() {
        this.initAjax();
    },
    mounted: function() {
        
    },
    components: {

    }
}
</script>

<style lang="scss" scoped>

</style>
