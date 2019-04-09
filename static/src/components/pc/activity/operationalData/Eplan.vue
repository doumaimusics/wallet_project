<template>
   <div id="Eplan">
       <img src="https://aliyunsso.edspay.com/web/wx/activity/operationalData/EplanPC.png" alt="">
       <div class="btn" @click="toInvest"></div>
   </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            toInvest(){
                this.$router.push('/invest')
            }
        },
        created: function() {

        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #Eplan{
        width: 1200px;
        height: 3846px;
        margin: 30px auto 40px;
        img{
            width: 100%;
            height: auto;
        }
        .btn{
            cursor: pointer;
            width: 81px;
            height: 242px;
            position: fixed;
            background: url(https://aliyunsso.edspay.com/web/wx/activity/operationalData/pcBtn.png);
            background-size:cover;
            bottom: 0px;
            right: 50%;
            margin-right: -600px;
            z-index: 999;
        }
    }
</style>
