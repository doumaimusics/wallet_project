<template>
   <div id="moneyTransferApp">
       <!-- <div class="btn" v-btn @click="test">test</div> -->
   </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';    //引入表单验证
    export default {
        mixins:[wxToapp],
        data() {
            return {

            }
        },
        methods: {
            // test(){
            //     this.PassValue('FINISH')
            // }
        },
        created: function() {
            
            this.PassValue('FINISH')
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #moneyTransferApp{
        // .btn{
        //     margin-top: 5rem !important;
        // }
    }
</style>
