<template>
    <div id="pageMiddle">

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        init() {
            let _this = this
            _this.$http.post(global.tzjAjaxUrl+"/tzjapi/getLoginUserInfo", { random: this.$route.query.random }).then((res) => {
                if (res.body.resCode == 1) {
                    _this.setCookie('token', res.body.resData.token, (1000 * 60 * 15))
                    _this.setCookie('userName', res.body.resData.userName, (1000 * 60 * 15))
                    if (res.body.resData.redirectFlag == 'home') {
                        _this.$router.push("/home")
                    } else if (res.body.resData.redirectFlag == 'account') {
                        _this.$router.push("/myAccount")
                    } else {
                        _this.$router.push({ path: '/invest/detail', query: { uuid: res.body.resData.redirectFlag } })
                    }
                } else {
                    _this.$message({ message: res.body.resMsg, type: 'warning' });
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
#pageMiddle {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 2000;
    background: #fff;
    overflow: hidden;
}
</style>
