<template>
    <div id="census">
        <div class="center">
            <div class="btn" @click="count"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            id:''
        }
    },
    methods: {
        count(){
            let _this = this 
             global.http.post(_this, '/czb/applyLog/apply', {visitId:_this.id}, function(data) {
                 _this.$message({ message: data.body.resMsg, type: 'warning' });
             })
        },
        initcount(){
            let _this = this
            global.http.post(_this, '/czb/applyLog/visit', {}, function(data) {
                if (data.body.resCode == 1) {
                    _this.id = data.body.resData.model.id
                }else{
                    _this.$message({ message: data.body.resMsg, type: 'warning' });
                }
             })
        }
    },
    created: function() {
        this.initcount()
    },
    mounted: function() {

    },
    components: {

    }
}
</script>

<style lang="scss" scoped>
#census {
    width: 100%;
    height: 3093px;
    min-width: 1200px;
    margin: 0 auto;
    background: url(https://aliyunsso.edspay.com/web/activity/census/censusBanner.png) no-repeat top center;
    background-size: 1920px 400px;
    .center {
        width: 1200px;
        height: 3093px;
        margin: 0 auto;
        background: url(https://aliyunsso.edspay.com/web/activity/census/censusBg.png) no-repeat top center;
        background-size: 100% 100%;
        position: relative;
        .btn {
            position: absolute;
            width: 290px;
            height: 65px;
            top: 255px;
            left:40px;
        }
    }
}
</style>
