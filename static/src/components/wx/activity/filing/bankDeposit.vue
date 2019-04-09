<template>
    <div id="bankDeposit">
       <div v-title>银行存管</div>

    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'
    export default {
        mixins: [wxToapp],
        data() {
            return {

            }
        },
        methods: {

        },
        created: function() {
            this.PassValue('NavWhite_银行存管');
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #bankDeposit{
        width: 10rem;
        height: 35.746667rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/bankDeposit.png);
        background-size: 100%;
    }
</style>
