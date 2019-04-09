<template>
   <div id="pageMiddleWx">

   </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {

        },
        created: function() {
            this.$http.post(global.tzjAjaxUrl+"/tzjapi/getLoginUserInfo", { random : this.$route.query.random }).then((res) => {
                if(res.body.resCode == 1){
                    this.setCookie('userToken', res.body.resData.userToken, (1000 * 60 * 15))
                    this.setCookie('zsOpenStatus',res.body.resData.zsOpenStatus)
                    this.setCookie('userId',res.body.resData.userId)
                    console.log(res.body.resData.redirectFlag)
                    if(res.body.resData.redirectFlag == 'home'){
                        this.$router.push('/wxIndex')
                    }else if(res.body.resData.redirectFlag == 'account'){
                        this.$router.push('/wxMyAccount')
                    }else{
                        this.$router.push({path:'/wxDetail',query:{uuid:res.body.resData.redirectFlag}})
                    }
                    
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
    #pageMiddleWx{

    }
</style>
