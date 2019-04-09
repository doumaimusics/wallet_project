<template>
   <div id="picTpl">
       <div v-title>{{title}}</div>
       <img v-if="picUrl" :src="picUrl">
   </div>
</template>

<script>
    export default {
        data() {
            return {
                picUrl:'',       // 图片的地址
                title:'',        // 标题
            }
        },
        methods: {
            // stopScrolling(e){  // 阻止iOS设备阻尼效果 单页面才可以用
            //     e.preventDefault();
            // }
        },
        created: function() {
            this.$route.query.picUrl ? this.picUrl = this.$route.query.picUrl : this.picUrl = ''
            this.$route.query.title ? this.title = this.$route.query.title : this.title = ''
        },
        mounted: function() {
            // 阻止iOS设备阻尼效果 单页面才可以用
            // document.addEventListener( 'touchstart' , this.stopScrolling , false );    
            // document.addEventListener( 'touchmove' , this.stopScrolling , false );
        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #picTpl{
        width: 100%;
        height: auto;
        img{
            max-width:100% !important;
            min-width:100% !important;
            height:auto !important;
            pointer-events: none; 
        }
    }
</style>
