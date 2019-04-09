<template>
  <div id="enroll">
    <div class="btn-red active" v-if="getCookie('token')"></div>
    <div class="btn-red" @click="enroll" v-else></div>
    <div class="btn-invest" @click="goInvest"></div>
  </div>
</template>

<script>
export default {
    name: 'enroll',
    data(){
        return {

        }
    },
    methods:{
        goInvest(){
            let _this = this
            _this.$http.post(_this.ajaxUrl.getUrl(1)+"/activity/newInvest").then((res) => {
    			if (res.body.resCode == 1) {
    				_this.$router.push({ path: '/invest/detail', query: { uuid:res.body.resData.data.uuid}})
    			}else{
                    _this.$message({message:res.body.resMsg,type: 'warning'});
                }
    		})
        },
        enroll(){
            this.$router.push("/activity/invitePc")
        }
    }
}
</script>

<style lang="scss" scoped>
    #enroll{
        width: 1200px;
        height: 3872px;
        margin: 30px auto;
        background: url(https://aliyunsso.edspay.com/web/activity/register/enrollPc.png)no-repeat center top;
        background-size: 100% 100%;
        position: relative;
        .btn-red{
            width: 536px;
            height: 120px;
            position: absolute;
            top:1315px;
            left:50%;
            margin-left: -268px;
            background: url(https://aliyunsso.edspay.com/web/activity/register/enrollBtn.png)no-repeat center top;
            background-size: 100% 100%;
        }
        .btn-red.active{
            background: url(https://aliyunsso.edspay.com/web/activity/register/enrollBtnOver.png)no-repeat center top;
            background-size: 100% 100%;
        }
        .btn-invest{
            width: 536px;
            height: 120px;
            position: absolute;
            top:1825px;
            left:50%;
            margin-left: -268px;
        }
    }
</style>

