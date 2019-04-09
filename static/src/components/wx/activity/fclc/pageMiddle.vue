<template>
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

    },
    created: function() {
        let _this = this
        this.$http.post(global.tzjAjaxUrl + "/windmill/loginbind", { id: _this.$route.query.id }).then((res) => {
            if (res.body.resCode == 1) {
                _this.setCookie('userToken', res.body.resData.token, (1000 * 60 * 15))
                _this.setCookie('zsOpenStatus', res.body.resData.zsOpenStatus)
                _this.setCookie('userId', res.body.resData.userId)
                if (!res.body.resData.redirectFlag) {
                    _this.$router.push('/wxIndex')
                } else {
                    window.location.href = res.body.resData.redirectFlag;
                }
            } else {
                Toast({
            message: res.body.resMsg,
            position: 'bottom',
            duration: 3000
        });
            }
        })
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
